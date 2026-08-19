"""
LifeConnect - API Routes
RESTful endpoints for the LifeConnect application.
All routes use /api prefix.
"""

import hashlib
import json
from flask import Blueprint, request, jsonify, session
from database import get_connection

api = Blueprint("api", __name__, url_prefix="/api")


def hash_password(password: str) -> str:
    """Simple SHA-256 hash. Replace with bcrypt in production."""
    return hashlib.sha256(password.encode()).hexdigest()


# ---------------------------------------------------------------------------
# Auth Routes
# ---------------------------------------------------------------------------

@api.route("/auth/signup", methods=["POST"])
def signup():
    data = request.get_json()
    required = ["full_name", "email", "password"]
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"'{field}' is required"}), 400

    conn = get_connection()
    try:
        conn.execute(
            """
            INSERT INTO users (full_name, email, mobile, password_hash, age, city, interests, decade)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                data["full_name"],
                data["email"],
                data.get("mobile", ""),
                hash_password(data["password"]),
                data.get("age"),
                data.get("city", ""),
                json.dumps(data.get("interests", [])),
                data.get("decade", ""),
            ),
        )
        conn.commit()
        return jsonify({"message": "Account created successfully"}), 201
    except Exception as e:
        return jsonify({"error": "Email already exists"}), 409
    finally:
        conn.close()


@api.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "")
    password = data.get("password", "")

    conn = get_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE email = ? AND password_hash = ?",
        (email, hash_password(password)),
    ).fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    session["user_id"] = user["id"]
    return jsonify({"message": "Login successful", "user": {"id": user["id"], "name": user["full_name"], "email": user["email"]}}), 200


@api.route("/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"}), 200


# ---------------------------------------------------------------------------
# Profile Routes
# ---------------------------------------------------------------------------

@api.route("/profile", methods=["GET"])
def get_profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    conn = get_connection()
    user = conn.execute("SELECT id, full_name, email, mobile, age, city, interests, decade FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(dict(user)), 200


# ---------------------------------------------------------------------------
# Memories Routes
# ---------------------------------------------------------------------------

@api.route("/memories", methods=["GET"])
def get_memories():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    conn = get_connection()
    memories = conn.execute("SELECT * FROM memories WHERE user_id = ? ORDER BY year ASC", (user_id,)).fetchall()
    conn.close()
    return jsonify([dict(m) for m in memories]), 200


@api.route("/memories", methods=["POST"])
def save_memory():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    data = request.get_json()
    conn = get_connection()
    conn.execute(
        "INSERT INTO memories (user_id, year, title, content, media_type) VALUES (?, ?, ?, ?, ?)",
        (user_id, data.get("year"), data["title"], data.get("content", ""), data.get("media_type", "story")),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Memory saved"}), 201


# ---------------------------------------------------------------------------
# Communities Routes
# ---------------------------------------------------------------------------

@api.route("/communities", methods=["GET"])
def get_communities():
    conn = get_connection()
    communities = conn.execute("SELECT * FROM communities ORDER BY member_count DESC").fetchall()
    conn.close()
    return jsonify([dict(c) for c in communities]), 200


# ---------------------------------------------------------------------------
# Wellness Routes
# ---------------------------------------------------------------------------

@api.route("/wellness", methods=["GET"])
def get_wellness():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    conn = get_connection()
    activities = conn.execute(
        "SELECT * FROM wellness_activities WHERE user_id = ? AND date = CURRENT_DATE",
        (user_id,),
    ).fetchall()
    conn.close()
    return jsonify([dict(a) for a in activities]), 200


@api.route("/wellness/complete", methods=["POST"])
def complete_wellness():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not authenticated"}), 401
    data = request.get_json()
    conn = get_connection()
    conn.execute(
        "UPDATE wellness_activities SET completed = 1 WHERE id = ? AND user_id = ?",
        (data["activity_id"], user_id),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Activity marked complete"}), 200

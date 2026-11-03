"""
LifeConnect — Database Module
Handles SQLite database initialization and async connection management.
"""

import sqlite3
import os
import shutil

LOCAL_DB_PATH = os.path.join(os.path.dirname(__file__), "lifeconnect.db")

# In Vercel serverless environment, the source filesystem is read-only.
# Copy database to /tmp so SQLite can perform WAL and write operations without errors.
if os.environ.get("VERCEL"):
    DB_PATH = "/tmp/lifeconnect.db"
    if not os.path.exists(DB_PATH) and os.path.exists(LOCAL_DB_PATH):
        try:
            shutil.copyfile(LOCAL_DB_PATH, DB_PATH)
        except Exception as e:
            print(f"[LifeConnect] Warning: Could not copy bundled DB to /tmp: {e}")
else:
    DB_PATH = LOCAL_DB_PATH


def get_connection() -> sqlite3.Connection:
    """Return a synchronous SQLite connection with row factory enabled."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        conn.execute("PRAGMA journal_mode=WAL")
    except Exception:
        pass
    try:
        conn.execute("PRAGMA foreign_keys=ON")
    except Exception:
        pass
    return conn


def init_db():
    """Initialize the database schema (called once on startup)."""
    conn = get_connection()
    cursor = conn.cursor()

    # ── Users ──────────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name     TEXT    NOT NULL,
            email         TEXT    UNIQUE NOT NULL,
            mobile        TEXT,
            password_hash TEXT    NOT NULL,
            age           INTEGER,
            city          TEXT,
            interests     TEXT,
            decade        TEXT,
            avatar        TEXT,
            created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # ── Memories ───────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memories (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id    INTEGER NOT NULL,
            year       INTEGER,
            title      TEXT    NOT NULL,
            content    TEXT,
            media_type TEXT    DEFAULT 'story',
            emoji      TEXT    DEFAULT '📖',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # ── Connections / Friends ──────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS connections (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id    INTEGER NOT NULL,
            friend_id  INTEGER NOT NULL,
            status     TEXT    DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id)   REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(user_id, friend_id)
        )
    """)

    # ── Communities ────────────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS communities (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            name         TEXT    NOT NULL,
            description  TEXT,
            category     TEXT,
            emoji        TEXT    DEFAULT '🌐',
            member_count INTEGER DEFAULT 0,
            created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # ── Community Memberships ──────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS community_members (
            user_id      INTEGER NOT NULL,
            community_id INTEGER NOT NULL,
            joined_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, community_id),
            FOREIGN KEY (user_id)      REFERENCES users(id)       ON DELETE CASCADE,
            FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE
        )
    """)

    # ── Wellness Activities ────────────────────────────────────────
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS wellness_activities (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id   INTEGER NOT NULL,
            activity  TEXT    NOT NULL,
            completed INTEGER DEFAULT 0,
            date      DATE    DEFAULT CURRENT_DATE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    conn.commit()
    conn.close()
    print("[LifeConnect] Database initialized successfully.")


if __name__ == "__main__":
    init_db()

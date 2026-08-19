"""
LifeConnect - Main Application Entry Point
Run with: python main.py
"""

import os
from flask import Flask, send_from_directory
from database import init_db
from routes import api

app = Flask(__name__, static_folder="../frontend", static_url_path="")

# Secret key for session management. Set a real random key in production via environment variable.
app.secret_key = os.environ.get("LIFECONNECT_SECRET", "dev-secret-change-in-production")

# Register API blueprint
app.register_blueprint(api)


@app.route("/")
def index():
    """Serve the frontend application."""
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def static_files(path):
    """Serve static files or fall back to index.html for SPA routing."""
    full_path = os.path.join(app.static_folder, path)
    if os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "true").lower() == "true"
    print(f"[LifeConnect] Server starting on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=debug)

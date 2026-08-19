"""
LifeConnect - Database Module
Handles SQLite database initialization and connection management.
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "lifeconnect.db")


def get_connection():
    """Return a SQLite connection with row factory enabled."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize the database schema."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name   TEXT    NOT NULL,
            email       TEXT    UNIQUE NOT NULL,
            mobile      TEXT,
            password_hash TEXT  NOT NULL,
            age         INTEGER,
            city        TEXT,
            interests   TEXT,
            decade      TEXT,
            created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memories (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     INTEGER NOT NULL,
            year        INTEGER,
            title       TEXT    NOT NULL,
            content     TEXT,
            media_type  TEXT,
            created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS connections (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     INTEGER NOT NULL,
            friend_id   INTEGER NOT NULL,
            status      TEXT    DEFAULT 'pending',
            created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id)   REFERENCES users(id),
            FOREIGN KEY (friend_id) REFERENCES users(id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS communities (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            description TEXT,
            category    TEXT,
            member_count INTEGER DEFAULT 0,
            created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS wellness_activities (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id     INTEGER NOT NULL,
            activity    TEXT    NOT NULL,
            completed   INTEGER DEFAULT 0,
            date        DATE    DEFAULT CURRENT_DATE,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    conn.commit()
    conn.close()
    print("[LifeConnect] Database initialized successfully.")


if __name__ == "__main__":
    init_db()

"""
LifeConnect — Vercel Serverless Entrypoint (Repository Root)
Enables seamless Vercel deployment when Root Directory is set to repo root.
"""
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
PROJECT_DIR = ROOT_DIR / "P3---LIFE-CONNECT"
BACKEND_DIR = PROJECT_DIR / "backend"

for p in [str(PROJECT_DIR), str(BACKEND_DIR)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from backend.main import app

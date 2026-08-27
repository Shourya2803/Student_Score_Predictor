# Fallback import proxy for Render / deployment compatibility
from main import app, read_root, predict

__all__ = ["app", "read_root", "predict"]

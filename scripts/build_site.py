#!/usr/bin/env python3
"""Compatibility entry point for the resource synchronizer.

Prefer ``scripts/sync.py``; this command remains available for existing workflows.
"""

from sync import main


if __name__ == "__main__":
    raise SystemExit(main())

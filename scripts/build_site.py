#!/usr/bin/env python3
"""Compatibility entry point for the canonical resource synchronizer.

This now updates the site, CSV, and README together. Prefer ``scripts/sync.py``
in new automation; the old command remains supported for contributors.
"""

from sync import main


if __name__ == "__main__":
    raise SystemExit(main())

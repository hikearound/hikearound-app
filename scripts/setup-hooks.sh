#!/bin/bash

# Setup script for git hooks.
# Configures git to use the local .githooks directory.

echo "[setup-hooks] Configuring git to use .githooks/"

git config core.hooksPath .githooks

echo "[setup-hooks] Done. Pre-commit hook will now run on every commit."
echo "[setup-hooks] To bypass the hook (not recommended), use: git commit --no-verify"

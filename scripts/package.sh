#!/usr/bin/env bash
# Builds the frontend and packages the plugin in the layout Decky Loader expects:
#   decky-pip/
#     dist/index.js
#     plugin.json
#     package.json
#     LICENSE
#     README.md
set -euo pipefail

cd "$(dirname "$0")/.."

NAME="decky-pip"
OUT_DIR="release"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

pnpm install --frozen-lockfile
pnpm run build

mkdir -p "$STAGE/$NAME/dist" "$OUT_DIR"
cp dist/index.js "$STAGE/$NAME/dist/"
cp plugin.json package.json LICENSE README.md "$STAGE/$NAME/"
[ -f main.py ] && cp main.py "$STAGE/$NAME/"

rm -f "$OUT_DIR/$NAME.zip"
(cd "$STAGE" && zip -rX "$OLDPWD/$OUT_DIR/$NAME.zip" "$NAME")
echo "Created $OUT_DIR/$NAME.zip"

#!/bin/zsh

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DERIVED_DATA_ROOT="$HOME/Library/Developer/Xcode/DerivedData"

cleanup_stale_builds() {
  pkill -f "xcodebuild.*${PROJECT_ROOT}/ios/liteledger.xcworkspace" >/dev/null 2>&1 || true
  pkill -f "expo run:ios" >/dev/null 2>&1 || true
  pkill -f "Metro.*lite-ledger" >/dev/null 2>&1 || true

  find "$DERIVED_DATA_ROOT" -maxdepth 1 -type d -name 'liteledger-*' -prune -exec rm -rf {} +
  rm -rf "$PROJECT_ROOT/ios/build"
}

cleanup_stale_builds

export DEVELOPER_DIR="/Applications/Xcode-26.4.0.app/Contents/Developer"

cd "$PROJECT_ROOT"
exec npx expo run:ios --device "iPhone 17 Pro"

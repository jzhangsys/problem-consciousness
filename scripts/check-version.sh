#!/usr/bin/env bash
# Guard against version-string drift.
#
# The canonical version is problem-consciousness/.claude-plugin/plugin.json.
# Every other place that pins a version must agree with it, or CI fails.
#
# Usage: scripts/check-version.sh
set -euo pipefail

cd "$(dirname "$0")/.."

plugin_json="problem-consciousness/.claude-plugin/plugin.json"
marketplace_json=".claude-plugin/marketplace.json"
submission_md="SUBMISSION.md"

# Canonical version: the "version" field in plugin.json.
canonical="$(grep -oE '"version"[[:space:]]*:[[:space:]]*"[^"]+"' "$plugin_json" \
  | head -1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')"

if [ -z "$canonical" ]; then
  echo "FAIL: could not read canonical version from $plugin_json" >&2
  exit 1
fi
echo "Canonical version: $canonical (from $plugin_json)"

fail=0

# marketplace.json "version"
mk="$(grep -oE '"version"[[:space:]]*:[[:space:]]*"[^"]+"' "$marketplace_json" \
  | head -1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' || true)"
if [ "$mk" != "$canonical" ]; then
  echo "FAIL: $marketplace_json version '$mk' != '$canonical'" >&2
  fail=1
else
  echo "  ok: $marketplace_json = $mk"
fi

# SUBMISSION.md "| Version | \`x.y.z\` |"
sub="$(grep -oE '\| Version \| \`[0-9]+\.[0-9]+\.[0-9]+\`' "$submission_md" \
  | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' || true)"
if [ "$sub" != "$canonical" ]; then
  echo "FAIL: $submission_md version '$sub' != '$canonical'" >&2
  fail=1
else
  echo "  ok: $submission_md = $sub"
fi

if [ "$fail" -ne 0 ]; then
  echo "Version consistency check FAILED." >&2
  exit 1
fi
echo "Version consistency check passed."

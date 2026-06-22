#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$HERE"
node scripts/generate-data.js
rm -rf out
mkdir -p out
find src -name '*.java' > sources.txt
javac -d out @sources.txt
rm -f sources.txt
java -cp out com.peruspatial.Runner

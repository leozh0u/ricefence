#!/bin/sh
# Cut a scroll-scrubbed image sequence from a clip, graded to black.
# usage: scripts/sequence.sh <video> <name> <start> <duration> <crop> <width> [fps]
#   crop is an ffmpeg crop (w:h:x:y) on the source, or "none".
# Writes assets/seq/<name>/NNN.webp and prints the frame count for script.js.
set -e
IN="$1"; NAME="$2"; SS="$3"; T="$4"; CROP="$5"; W="$6"; FPS="${7:-30}"
[ -f "$IN" ] || { echo "usage: $0 <video> <name> <start> <dur> <crop|none> <width> [fps]"; exit 1; }
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)
GRADE="${GRADE:-curves=all='0/0 0.18/0.01 0.3/0.04 0.5/0.3 0.75/0.75 1/1',eq=saturation=0.12,colorbalance=bs=0.04:bm=0.02,vignette=angle=PI/3.4}"
VF=""
[ "$CROP" != "none" ] && VF="crop=$CROP,"
ffmpeg -v error -y -ss "$SS" -t "$T" -i "$IN" \
  -vf "${VF}scale=$W:-2:flags=lanczos,minterpolate=fps=$FPS:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,$GRADE" \
  "$TMP/%03d.png"
rm -rf "assets/seq/$NAME"; mkdir -p "assets/seq/$NAME"
n=0
for f in "$TMP"/*.png; do
  cwebp -quiet -q 72 "$f" -o "assets/seq/$NAME/$(printf %03d $n).webp"; n=$((n+1))
done
rm -rf "$TMP"
echo "$NAME: $n frames, $(du -sh assets/seq/$NAME | cut -f1)"

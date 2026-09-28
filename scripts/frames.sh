#!/bin/sh
# Turn a clip into the hero frame sequence.
# usage: scripts/frames.sh <video> [start_seconds] [duration_seconds]
# Writes assets/hero/{desktop,mobile}/NNN.webp and assets/hero/poster.webp,
# then prints the frame count to put in HERO_FRAMES in script.js.
set -e
IN="$1"; SS="${2:-0}"; T="${3:-2.4}"
[ -f "$IN" ] || { echo "usage: $0 <video> [start] [duration]"; exit 1; }
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)

# Dark grade: crush the grey haze, keep the whites, cool the shadows.
GRADE="curves=all='0/0 0.3/0.02 0.42/0.05 0.48/0.1 0.54/0.44 0.62/0.8 1/1',eq=saturation=0.15,colorbalance=bs=0.05:bm=0.02,vignette=angle=PI/3"
# 25fps stock is too coarse to scrub, so interpolate to 75fps.
INTERP="minterpolate=fps=75:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"

ffmpeg -v error -y -ss "$SS" -t "$T" -i "$IN" \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,$INTERP,$GRADE" \
  -q:v 2 "$TMP/%03d.png"

rm -rf assets/hero/desktop assets/hero/mobile
mkdir -p assets/hero/desktop assets/hero/mobile
n=0
for f in "$TMP"/*.png; do
  i=$(printf %03d $n)
  cwebp -quiet -q 72 "$f" -o "assets/hero/desktop/$i.webp"
  cwebp -quiet -q 68 -resize 540 960 "$f" -o "assets/hero/mobile/$i.webp"
  n=$((n+1))
done
cwebp -quiet -q 80 "$TMP/001.png" -o assets/hero/poster.webp
rm -rf "$TMP"
echo "HERO_FRAMES = $n"
du -sh assets/hero/desktop assets/hero/mobile

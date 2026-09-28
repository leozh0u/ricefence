#!/bin/sh
# Turn a landscape clip into the intro frame sequence.
# usage: scripts/frames.sh <video> [start_seconds] [duration_seconds] [fps]
# Writes assets/hero/desktop (full frame) and assets/hero/mobile (centre 9:16 crop),
# then prints the frame count to put in HERO_FRAMES in script.js.
set -e
IN="$1"; SS="${2:-0.6}"; T="${3:-2.7}"; FPS="${4:-65}"
[ -f "$IN" ] || { echo "usage: $0 <video> [start] [duration] [fps]"; exit 1; }
cd "$(dirname "$0")/.."
TMP=$(mktemp -d)

# Grade to black and white on true black. The floor is clamped to the page
# background so there is no visible edge around the frame.
GRADE="curves=all='0/0 0.2/0 0.32/0.03 0.5/0.35 0.7/0.85 1/1',eq=saturation=0.1,lutrgb=r='max(val\,8)':g='max(val\,9)':b='max(val\,13)'"
# 25fps stock is too coarse to scrub, so interpolate.
INTERP="minterpolate=fps=$FPS:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"

ffmpeg -v error -y -ss "$SS" -t "$T" -i "$IN" -vf "scale=1920:-2:flags=lanczos,$INTERP,$GRADE" "$TMP/%03d.png"

rm -rf assets/hero/desktop assets/hero/mobile
mkdir -p assets/hero/desktop assets/hero/mobile
n=0
for f in "$TMP"/*.png; do
  i=$(printf %03d $n)
  cwebp -quiet -q 74 "$f" -o "assets/hero/desktop/$i.webp"
  # 9:16 crop for phones, centred on the fencer (x ≈ 1105 of 1920).
  cwebp -quiet -q 60 -crop 835 0 540 1012 -resize 540 1012 "$f" -o "assets/hero/mobile/$i.webp"
  n=$((n+1))
done
rm -rf "$TMP"
echo "HERO_FRAMES = $n"
du -sh assets/hero/desktop assets/hero/mobile

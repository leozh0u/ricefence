# Rice Fencing Club website

The site for Rice Fencing Club, planned for ricefence.com. Static HTML, CSS and JS with no build step.

## Run locally

```sh
python3 -m http.server 8766
# open http://localhost:8766
```

## How it works

- `index.html` holds all the content. One page, anchored sections: intro, Practice, Join, LPAP, Weapons, Compete, Photos, Demos, Questions, Contact.
- `script.js` runs the intro. The lunge is a sequence of still frames drawn to a canvas, and scroll position picks the frame (GSAP ScrollTrigger, with Lenis for smooth wheel scrolling). Phones load a smaller frame set. With reduced motion turned on, the intro is a still image.
- `style.css` has the theme. Colours are variables at the top.
- `assets/owl.svg` is the logo (traced from source/logo/), with `owl-white.svg`, `favicon.svg`, `apple-touch-icon.png` and the share card `og.jpg`.
- `assets/hero/` has the frame sequences, `assets/video/` has the two background loops, and `assets/img/` has the photo strip.

## Common edits

- **Sign-up form:** paste the Google Form link into `FORM_URL` at the top of `script.js`. Until then the button opens an email to rfc@rice.edu.
- **Practice time or place:** the `schedule` list in the Practice section of `index.html`, plus step 3 of Join.
- **Photos:** drop a `.webp` into `assets/img/` and copy a `<figure class="shot">` line in `index.html`. Use `tall` for portrait photos and `wide` for landscape.
- **New intro footage:** `scripts/frames.sh path/to/clip.mp4 <start> <duration>`, then set `HERO_FRAMES` in `script.js` to the number it prints. Portrait video works best.
- Bump the `?v=` number on `style.css` and `script.js` in `index.html` after changing them, so browsers don't serve the old copy.

All footage and photos are currently placeholders from Pexels (free licence). They get replaced after the club photoshoot.

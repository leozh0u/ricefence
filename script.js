// Rice Fencing Club. Scroll-scrubbed footage plus a few small scroll moments.

// Paste the Google Form link here once it exists. Until then the sign-up
// button opens an email to the club.
const FORM_URL = '';

// Frame counts must match what scripts/frames.sh and scripts/sequence.sh print.
const HERO_FRAMES = 172;
// Last sharp frame of the lunge, where the title rests.
const RECOVER_FRAME = 110;
const SALUTE_FRAMES = 70;
const EXTEND_FRAMES = 62;

const BG = '#08090d';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = matchMedia('(max-width: 700px)').matches;
const hasGsap = window.gsap && window.ScrollTrigger;

if (FORM_URL) {
  const s = document.getElementById('signup');
  s.href = FORM_URL;
  s.target = '_blank';
  s.rel = 'noopener';
}

// A sequence of still frames drawn to a canvas. Frame 0 loads first, then a
// coarse pass so scrubbing works early, then the gaps fill in.
function sequence(canvas, dir, count, place) {
  const ctx = canvas.getContext('2d');
  const frames = new Array(count);
  const loaded = new Uint8Array(count);
  const view = { frame: 0, zoom: 1, shift: 0 };
  let drawn = -1;
  const src = i => `${dir}/${String(i).padStart(3, '0')}.webp`;

  function load(i) {
    if (frames[i]) return Promise.resolve();
    const img = new Image();
    img.decoding = 'async';
    img.src = src(i);
    frames[i] = img;
    return img.decode().then(() => {
      loaded[i] = 1;
      if (Math.abs(i - Math.round(view.frame)) < 8) draw(true);
    }).catch(() => {});
  }

  // With only = true, load just the frame the view is on (the reduced-motion still).
  function start(only) {
    if (only) return load(Math.round(view.frame));
    load(0).then(async () => {
      for (const step of [16, 8, 4, 2, 1]) {
        const batch = [];
        for (let i = 0; i < count; i += step) batch.push(load(i));
        await Promise.all(batch);
      }
    });
  }

  function nearest(i) {
    for (let d = 0; d < count; d++) {
      if (i - d >= 0 && loaded[i - d]) return i - d;
      if (i + d < count && loaded[i + d]) return i + d;
    }
    return -1;
  }

  function draw(force) {
    const i = nearest(Math.min(count - 1, Math.round(view.frame)));
    if (i < 0 || (i === drawn && !force)) return;
    drawn = i;
    const img = frames[i];
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    place(ctx, img, W, H, view);
  }

  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    draw(true);
  }

  addEventListener('resize', size);
  size();
  return { view, draw, start, last: count - 1 };
}

// Scale an image to cover the box, anchored at (ax, ay) from 0 to 1.
function cover(ctx, img, W, H, ax = 0.5, ay = 0.5) {
  const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
  const w = img.naturalWidth * s, h = img.naturalHeight * s;
  ctx.drawImage(img, (W - w) * ax, (H - h) * ay, w, h);
}

// The arm and blade: bottom-right on desktop so the blade passes over the
// text instead of through it, full width on phones where the text sits below.
function placeExtend(ctx, img, W, H) {
  if (mobile) return cover(ctx, img, W, H);
  const s = Math.max(W / img.naturalWidth, H / img.naturalHeight) * 0.8;
  const w = img.naturalWidth * s, h = img.naturalHeight * s;
  const x = W - w, y = H - h;
  ctx.drawImage(img, x, y, w, h);
  const fl = ctx.createLinearGradient(x, 0, x + w * 0.28, 0);
  fl.addColorStop(0, BG); fl.addColorStop(1, 'rgba(8,9,13,0)');
  ctx.fillStyle = fl; ctx.fillRect(x - 1, y, w * 0.28 + 1, h);
  const ft = ctx.createLinearGradient(0, y, 0, y + h * 0.3);
  ft.addColorStop(0, BG); ft.addColorStop(1, 'rgba(8,9,13,0)');
  ctx.fillStyle = ft; ctx.fillRect(x, y - 1, w, h * 0.3 + 1);
}

// The intro fencer fills the screen. Zoom pushes in on the lunge, shift slides
// the fencer right to make room for the title.
function placeHero(ctx, img, W, H, v) {
  const s = Math.max(W / img.naturalWidth, H / img.naturalHeight) * v.zoom;
  const w = img.naturalWidth * s, h = img.naturalHeight * s;
  ctx.drawImage(img, (W - w) / 2 + v.shift * W, (H - h) / 2, w, h);
}

const hero = sequence(document.getElementById('hero'), `assets/hero/${mobile ? 'mobile' : 'desktop'}`, HERO_FRAMES, placeHero);
const salute = sequence(document.getElementById('salute'), 'assets/seq/salute', SALUTE_FRAMES, (ctx, img, W, H) => cover(ctx, img, W, H));
const extend = sequence(document.getElementById('extend'), 'assets/seq/extend', EXTEND_FRAMES, placeExtend);
if (hasGsap && !reduced) hero.start();

// The two later sequences load when they get close.
if ('IntersectionObserver' in window) {
  const near = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    (e.target.id === 'salute' ? salute : extend).start(reduced || !hasGsap);
    near.unobserve(e.target);
  }), { rootMargin: '100% 0px' });
  near.observe(document.getElementById('salute'));
  near.observe(document.getElementById('extend'));
} else {
  salute.start(reduced || !hasGsap); extend.start(reduced || !hasGsap);
}

// Smooth scroll. Wheel only; touch keeps native scrolling.
let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new Lenis({ lerp: 0.1 });
  if (hasGsap) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  // In-page links go through Lenis so they don't fight the smoothing.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const el = id === '#top' ? 0 : document.querySelector(id);
      if (el === null) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: id === '#top' ? 0 : -56, duration: 1.2 });
      if (el && el.focus) { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }
    });
  });
}

// Nav background and the piste marker.
const nav = document.getElementById('nav');
const intro = document.querySelector('.intro');
const piste = document.getElementById('pisteFencer');
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  piste.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
  nav.classList.toggle('solid', y > intro.offsetHeight - innerHeight * 1.2);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// The practice loop plays only while on screen.
const videos = document.querySelectorAll('video');
if (!reduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { target.preload = 'auto'; target.play().catch(() => {}); }
      else target.pause();
    });
  }, { rootMargin: '200px' });
  videos.forEach(v => io.observe(v));
}

const weapons = document.querySelectorAll('.weapon');

if (!hasGsap || reduced) {
  // Still versions: the intro poster, and the salute and extension at their end pose.
  document.documentElement.classList.add('no-canvas');
  const title = document.querySelector('.title');
  title.style.opacity = 1;
  title.style.visibility = 'visible';
  weapons.forEach(w => w.classList.add('lit'));
  salute.view.frame = salute.last;
  extend.view.frame = extend.last;
} else {
  gsap.registerPlugin(ScrollTrigger);
  introTimeline();

  // The blade comes up to salute as the Join section arrives.
  gsap.to(salute.view, {
    frame: salute.last, ease: 'none', onUpdate: () => salute.draw(),
    scrollTrigger: { trigger: '.salute', start: 'top 90%', end: 'center 45%', scrub: 0.4 },
  });

  // The arm and blade reach across the Compete section.
  gsap.to(extend.view, {
    frame: extend.last, ease: 'none', onUpdate: () => extend.draw(),
    scrollTrigger: { trigger: '#compete', start: 'top 85%', end: mobile ? 'bottom 60%' : 'center 40%', scrub: 0.4 },
  });

  ScrollTrigger.batch(weapons, {
    start: 'top 75%',
    onEnter: batch => batch.forEach((w, i) => setTimeout(() => w.classList.add('lit'), i * 220)),
  });

  // Photos: vertical scroll drives the strip sideways on wide screens.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const strip = document.getElementById('strip');
    const distance = () => Math.max(0, strip.scrollWidth - innerWidth);
    gsap.to(strip, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '#photos',
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}

function introTimeline() {
  const v = hero.view;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: '.intro', start: 'top top', end: 'bottom bottom', scrub: true },
  });

  // The timeline runs 0 to 1 over the whole intro scroll.
  tl.to(v, { frame: hero.last, duration: 0.66, onUpdate: () => hero.draw() }, 0)
    .to(v, { zoom: 1.16, duration: 0.3, ease: 'power2.in', onUpdate: () => hero.draw(true) }, 0.4)
    .to('.cue', { opacity: 0, duration: 0.04 }, 0.02)
    .fromTo('.cmd-1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.02)
    .to('.cmd-1', { opacity: 0, y: -30, duration: 0.05 }, 0.14)
    .fromTo('.cmd-2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.19)
    .to('.cmd-2', { opacity: 0, y: -30, duration: 0.05 }, 0.3)
    .fromTo('.cmd-3', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.03 }, 0.35)
    .to('.cmd-3', { opacity: 0, duration: 0.05 }, 0.47)
    // The touch: the green lamp on the scoring box.
    .to('.lamp', { opacity: 1, duration: 0.01 }, 0.6)
    .to('.lamp', { opacity: 0, duration: 0.08 }, 0.65)
    .to('#hero', { opacity: mobile ? 0.35 : 0.6, duration: 0.1 }, 0.72)
    // Recover to en garde behind the title. The end of the lunge is out of focus
    // in the source, and this is what a fencer does after a lunge anyway.
    .to(v, { frame: RECOVER_FRAME, duration: 0.12, ease: 'power1.out', onUpdate: () => hero.draw() }, 0.72)
    .to(v, { shift: mobile ? 0 : 0.2, zoom: 1.02, duration: 0.12, ease: 'power2.inOut', onUpdate: () => hero.draw(true) }, 0.72)
    .to('.skip-intro', { autoAlpha: 0, duration: 0.05 }, 0.74)
    .fromTo('.title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.76)
    .to({}, { duration: 0.14 }, 0.86);
}

// Rice Fencing Club. Scroll-scrubbed intro plus a few small scroll moments.

// Paste the Google Form link here once it exists. Until then the sign-up
// button opens an email to the club.
const FORM_URL = '';

// Must match the count printed by scripts/frames.sh.
const HERO_FRAMES = 175;

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = matchMedia('(max-width: 700px)').matches;
const hasGsap = window.gsap && window.ScrollTrigger;

if (FORM_URL) {
  const s = document.getElementById('signup');
  s.href = FORM_URL;
  s.target = '_blank';
  s.rel = 'noopener';
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

// Ambient videos play only while on screen.
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

// Weapons light up as they come into view.
const weapons = document.querySelectorAll('.weapon');
if (reduced || !hasGsap) {
  weapons.forEach(w => w.classList.add('lit'));
}

if (!hasGsap || reduced) {
  document.documentElement.classList.add('no-canvas');
  const title = document.querySelector('.title');
  title.style.opacity = 1;
  title.style.visibility = 'visible';
} else {
  gsap.registerPlugin(ScrollTrigger);
  initHero();

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

function initHero() {
  const canvas = document.getElementById('hero');
  const ctx = canvas.getContext('2d');
  const dir = mobile ? 'mobile' : 'desktop';
  const frames = new Array(HERO_FRAMES);
  const loaded = new Uint8Array(HERO_FRAMES);
  const state = { frame: 0, zoom: 1, shift: 0 };
  let drawn = -1;

  const src = i => `assets/hero/${dir}/${String(i).padStart(3, '0')}.webp`;

  function load(i) {
    if (frames[i]) return Promise.resolve();
    const img = new Image();
    img.decoding = 'async';
    img.src = src(i);
    frames[i] = img;
    return img.decode().then(() => {
      loaded[i] = 1;
      if (Math.abs(i - Math.round(state.frame)) < 8) draw(true);
    }).catch(() => {});
  }

  // First frame, then a coarse pass so scrubbing works early, then fill in.
  load(0).then(async () => {
    for (const step of [16, 8, 4, 2, 1]) {
      const batch = [];
      for (let i = 0; i < HERO_FRAMES; i += step) batch.push(load(i));
      await Promise.all(batch);
    }
  });

  function nearest(i) {
    for (let d = 0; d < HERO_FRAMES; d++) {
      if (i - d >= 0 && loaded[i - d]) return i - d;
      if (i + d < HERO_FRAMES && loaded[i + d]) return i + d;
    }
    return -1;
  }

  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    draw(true);
  }

  function draw(force) {
    const i = nearest(Math.round(state.frame));
    if (i < 0 || (i === drawn && !force)) return;
    drawn = i;
    const img = frames[i];
    const W = canvas.width, H = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    // Portrait footage: cover the screen on phones, fit the height on desktop
    // and let the dark edges fade into the room.
    let h = mobile ? Math.max(H, W / ir) : H * 1.04;
    h *= state.zoom;
    const w = h * ir;
    const x = (W - w) / 2 + state.shift * W, y = (H - h) / 2 + (mobile ? 0 : H * 0.02);
    ctx.fillStyle = '#07090d';
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(img, x, y, w, h);
    if (!mobile) {
      const fade = w * 0.22;
      const l = ctx.createLinearGradient(x, 0, x + fade, 0);
      l.addColorStop(0, '#07090d'); l.addColorStop(1, 'rgba(7,9,13,0)');
      ctx.fillStyle = l; ctx.fillRect(x - 1, 0, fade + 1, H);
      const r = ctx.createLinearGradient(x + w - fade, 0, x + w, 0);
      r.addColorStop(0, 'rgba(7,9,13,0)'); r.addColorStop(1, '#07090d');
      ctx.fillStyle = r; ctx.fillRect(x + w - fade, 0, fade + 1, H);
    }
  }

  addEventListener('resize', size);
  size();

  const last = HERO_FRAMES - 1;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: '.intro', start: 'top top', end: 'bottom bottom', scrub: true },
  });

  // Timeline runs 0 to 1 over the whole intro scroll.
  tl.to(state, { frame: last, duration: 0.7, onUpdate: () => draw() }, 0)
    .to(state, { zoom: 1.16, duration: 0.3, ease: 'power2.in', onUpdate: () => draw(true) }, 0.4)
    .to('.cue', { opacity: 0, duration: 0.04 }, 0.02)
    .fromTo('.cmd-1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.02)
    .to('.cmd-1', { opacity: 0, y: -30, duration: 0.05 }, 0.14)
    .fromTo('.cmd-2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.19)
    .to('.cmd-2', { opacity: 0, y: -30, duration: 0.05 }, 0.3)
    .fromTo('.cmd-3', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.03 }, 0.35)
    .to('.cmd-3', { opacity: 0, duration: 0.05 }, 0.47)
    // The touch: the green lamp on the scoring box.
    .to('.lamp', { opacity: 1, duration: 0.015 }, 0.6)
    .to('.lamp', { opacity: 0, duration: 0.08 }, 0.64)
    .to('#hero', { opacity: mobile ? 0.35 : 0.6, duration: 0.1 }, 0.72)
    .to(state, { shift: mobile ? 0 : 0.2, zoom: 1.02, duration: 0.12, ease: 'power2.inOut', onUpdate: () => draw(true) }, 0.72)
    .to('.skip-intro', { opacity: 0, duration: 0.05 }, 0.74)
    .fromTo('.title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.76)
    .to({}, { duration: 0.14 }, 0.86);
}

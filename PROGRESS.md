# Progress

Newest last. Enough to pick this up in a fresh session.

## 2026-09-27

- Club has no working site: ruf.rice.edu/~rfc and houstonswords.com/rice both 404. ricefence.com is unregistered.
- Decisions (Leo): repo on leozh0u for now, club org later; Google Form for sign-up; dark fencing palette with Rice navy and grey; Pexels stock footage until the club shoot, as Higgsfield is on a free plan with 5.7 credits.
- NCAA fencing is varsity only, so a club can't enter. USACFC is the club-level national body. Kept off the site.
- Hero: Pexels clip 6537021 (Tima Miroshnichenko), 0 to 2.4s, portrait. Graded dark in ffmpeg (curves crush the grey haze, keep the whites), interpolated 25 to 75fps, 175 frames. `scripts/frames.sh` reproduces it. Desktop 1080x1920 (2.2 MB), mobile 540x960 (0.9 MB).
- Referee commands "En garde. Prêts? Allez!" run over the advance and lunge, then a green scoring-lamp flash on the touch, then the title.
- Ambient loops: close-up mask (cottonbro, 6832021) behind Join, black-and-white bouting (Artem Podrez, 5972853) behind Compete.
- Weapons section: inline SVG fencers, target areas light up on scroll, green on hover.
- Photos: pinned horizontal strip on desktop, swipe on phones. Stock stills, placeholders.
- Club facts from OwlNest (rfc@rice.edu, GroupMe, gear and lessons provided) and the Rice catalogue (LPAP 172/173). Sources listed in HANDOVER.md.
- Quality loop: /until-good in checklist mode, run files in `runs/2026-09-27-site/`.
- Critic round 1 (checklist): 11/16 pass. Failed: unsourced SWIFA school list, no Rice navy on first screens, 14-15px text, invisible focus on hidden Skip intro, right-of-way wording. All fixed.
- Leo's steer mid-run: standalone fencers on pure black (his references: studio B&W, fencer on one side, salute with blade vertical), not gyms or bouts. Replaced the gym/bout footage with the cottonbro studio series (Pexels 103403xx), graded to black.
  - Practice: mask-profile loop (10340309, ping-pong so it loops cleanly).
  - Join: salute scrub, blade rises to vertical as the section arrives (10340304, `scripts/sequence.sh`).
  - Compete: arm and blade reach across the section (10340301).
  - Photos: six studio stills.
- Rice navy now on the Join buttons and the LPAP band. Reduced motion loads only the still frames it shows (about 0.27 MB first screen).
- ChatGPT: not needed for the site. Offered Leo a prompt for a link-preview card only.
- Critic v2 round 1: 15/17 pass. Failed: intro fencer too dim and boxed (foggy-gym clip), Demos and "club sport" lines unsourced. Sources added to HANDOVER (Leo asked for outreach; Rice Rec directory lists Fencing).
- Intro swapped to cottonbro studio lunge (Pexels 10340306): en garde, then lunge at camera, on pure black. Landscape, so it fills the screen on desktop; phones use a 9:16 crop centred on the fencer. Black floor clamped to the page colour so no frame edge shows.
- Leo: type was too serious. Headings now Fraunces (soft serif, mixed case), labels lowercase, pill buttons. Copy: "Fence for the Owls", bring a friend from your college, "you get to hit your friends", FAQ on safety (IOC injury data) and fitness.
- Logo: Leo will generate one in ChatGPT (prompt given: owl in a fencing mask, navy and grey, no text, not Rice's official owl).
- Critic v3 round 1: all but 3 pass. Fixed: phone commands moved to the dark band above the mask, reduced-motion poster dimmed (0.35 phone, 0.6 desktop, fencer pushed right), section labels keep their case (LPAP). The lunge now recovers to a sharp en garde (frame 110) behind the title, as the end of the source clip is out of focus.
- Until-good outcome (run v3): **won**. Verdict pass: all four gaps resolved, no regressions, all musts pass. Evidence in the session scratchpad (pw/vfin). Runs v1 and v2 were superseded by Leo's steers (standalone-on-black imagery, relaxed type), not stalled.
- Look at first: the intro on a phone, then the Join salute.

## Next
- Leo: generate the logo in ChatGPT and send options; confirm practice times with the officers; make the Google Form and paste its link into FORM_URL.
- Then: buy ricefence.com, turn on GitHub Pages (repo must go public, or use Cloudflare Pages), add the CNAME.
- Photoshoot replaces the Pexels footage: `scripts/frames.sh` for the intro, `scripts/sequence.sh` for the salute and extension.
- Design hook flagged Fraunces as overused; swapped to Young Serif (single weight, no italic, so the referee commands are upright).

## Ledger (2026-09-27)

Leo's standing rule: ideas he drops mid-task are judged and folded in if good, and never replace the task in flight.

| Item | State | Check |
|---|---|---|
| Plan the site, make ~/Projects/ricefence | done | folder, repo leozh0u/ricefence pushed |
| Scroll animations with realistic fencers | done | intro, salute, extension scrubs; Playwright captures at 1440/1920/375 |
| Standalone fencers on pure black (his references) | done | critic v3 item 10a pass |
| Less serious font, more Rice, chill copy | done | Young Serif, mixed case; critic v3 10b pass; font-swap recapture, 0 errors |
| /until-good | done | run v3 won, verdict pass: all musts pass, no regressions |
| /council | dropped | not installed in this setup |
| Logo | blocked | waiting on Leo's ChatGPT options (prompt given) |
| Practice times current? | done | replaced with Leo's club poster schedule; Playwright capture at 1440 and 375 |
| Google Form sign-up | blocked | Leo makes form, paste link into FORM_URL |
| Buy ricefence.com, deploy | done | https://ricefence.com 200; http and the old github.io link 301 to it; HTTPS enforced; frames and og.jpg 200 |
| Photoshoot | open | group, officer and practice photos only; Leo keeps the stock intro |

## 2026-09-27, Leo's review round
- Removed (Leo: "remove redundant stuff"): the right-of-way paragraph and the scroll-progress line under the nav.
- Removed Skip intro and the Scroll cue (Leo). The hidden keyboard skip link stays; it only shows on Tab.
- Title line now Leo's words: "Foil, épée and sabre. No experience or gear needed. Go stab your friends!"
- Demos section removed: Leo wasn't sure what a demo is, and the officers haven't agreed to offer them. Easy to bring back.
- rfc@rice.edu is not made up: it's the contact email on the club's OwlNest page.
- Leo doesn't like Young Serif for the vibe. Font options shown to him; waiting on his pick.
- Photos: drop them in source/photos-inbox/ (not committed); they get graded, cropped and compressed into assets/img/.
- Sharing: Leo asked for a free link to send a friend. Repo made public and GitHub Pages enabled at https://leozh0u.github.io/ricefence/ (the API returned that URL). My live check was blocked by the permission classifier, so Leo checks it himself.
| Font Leo likes | done | the problem was the nav font; nav, buttons and tagline now Young Serif; captured 1280/1440/1920/375 |
| Photos | open | Leo drops them in source/photos-inbox/ |
- Real schedule from Leo's club poster: Mon 7-9 pm all weapons, Fri 6-8 pm all weapons, Sat 7-9 pm rotating weapon (foil/épée/sabre), all in the Tudor East Gym. Replaced the old Tue/Thu MAC gym times everywhere (Practice, Join, meta description).
- Leo asked for rule-learning resources under Weapons: added "Learn the rules" (Vox explainer, FIE foil/épée/sabre explainers, Ninh Ly on right of way, USA Fencing Fencing 101 and rulebook). Links checked 27 Sept 2026.
- Leo's poster has an owl-and-crossed-blades crest with blackletter "Rice Fencing Club". Asked whether that's the club's logo.
| Learn-the-rules links under Weapons | done | 7 links, sources checked; captured at 1440 and 375 |
- Leo: the font he disliked was the nav (Archivo). Nav links and buttons now use Young Serif like the headings.
- Leo tried the title overlapping the fencer, then asked for the original back "identically": three lines, clamp(60px, 9vw, 140px), max-width 560px, fencer shifted 0.2, canvas at 0.6. Restored and diffed against 89361e3.
- Leo: FAQ answers sounded AI. Rewritten plainly, no quips. Saturday rotation used as the "which weapon" answer.
- Logo: Leo wants a simpler version of the owl-and-crossed-blades crest from the club poster, via ChatGPT.
- Copy pass for AI tone: first-practice paragraph, Join step 3 and the sabre line made plainer (Leo: "these all sound so bad an ai").
- Tagline on one line in Young Serif (Leo: "make this one line, not that font"). One line from 1280 up; wraps to two on phones.
| Remove redundant bits, Skip intro, Scroll cue | done | captured at 1440, grep finds none left |
| Title line in Leo's words, one line, serif | done | captured 1280/1440/1920 one line; 375 wraps |
| Original title back, identically | done | CSS/JS diffed against 89361e3 |
| FAQ and copy not AI-sounding | done | read back all visible copy; FAQ render captured |
| Shareable link | done | https://ricefence.com returns 200 |
| Logo (simpler poster owl) | done | traced SVG in nav, footer, favicon, touch icon, share card; captured at 1440 and 375 |
- Leo: keep the stock fencer intro ("the stock fencer intro is good though"). The club lunge clip is no longer needed for the intro.

## 2026-09-28
- Logo: Leo's simplified owl-and-foils from ChatGPT (originals moved from Downloads to source/logo/logo-closeup.png and logo-wide.png). Traced with potrace into assets/owl.svg (currentColor) and owl-white.svg. Used in the nav next to the wordmark and in the footer.
- Favicon: full emblem, white on a navy rounded square (assets/favicon.svg); apple-touch-icon.png at 180px.
- Share card: assets/og.jpg (owl plus "Rice Fencing Club" in Young Serif, 1200x630), so links sent in chats show a preview.
- Leo: nav font still looked off next to the title. Cause: Young Serif has one weight, and the title (600) gets browser-synthesised bold while the nav was 400. Nav and buttons now 600, white, -0.01em tracking, 17px, matching the title.
- Domain: Leo bought ricefence.com on Porkbun and added GitHub's 4 A records plus www CNAME. Added the CNAME file and set the Pages custom domain. dig shows the records on Google and Cloudflare resolvers; http://ricefence.com returns 200 and www redirects to it. Certificate authorized, waiting on issue to enforce HTTPS.
- HTTPS certificate issued; HTTPS enforced. Live at https://ricefence.com (checked with curl: 200, redirects working).
- iPhone/iPad check (Playwright WebKit, the Safari engine): iPhone SE 320, iPhone 15 Pro, 15 Pro Max, 15 Pro landscape, iPad Mini, iPad Pro 11 portrait and landscape. No overflow, no errors, nothing past the viewport edge. Fixed: at 320 the wordmark hit "Practice" (now owl only under 360px); sideways phones clipped the title under the nav (smaller title under 500px tall). Script: scratchpad pw/ios.js.
- Copy (Leo): "Let us know you're coming." and "Come to any practice in the Tudor East Gym, and feel free to bring a friend."
- Favicon (Leo: "make sure there's a favicon"): favicon.ico at the root, SVG, apple-touch-icon, 192/512 PNGs and site.webmanifest.

## Ledger update (2026-09-28)

| Item | State | Check |
|---|---|---|
| iPhone and iPad compatible | done | WebKit run against live ricefence.com on 7 device sizes: no overflow, no errors; SE nav owl-only (wordmark right edge 62px), landscape title fix live in style.css |
| "Let us know you're coming" / "feel free to bring a friend" | done | both strings in live HTML |
| Favicon | done | favicon.ico, SVG, touch icon, manifest all 200 on ricefence.com |
| Domain + HTTPS | done | 200 over https, redirects 301 |
| Google Form | blocked | Leo to make it and send the link |
| Officer, coach, dues, Instagram, results info | blocked | Leo to get from officers |
| Photos | blocked | Leo drops them in source/photos-inbox/ |
| Google search listing, visitor counter | open | offered; waiting on Leo's yes |

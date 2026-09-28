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

# Atomic Events

Marketing site for Atomic Events, an event decor and photo studio in Mexicali.
Spanish copy, static build, no backend.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the built site
npm run typecheck
npm run shotlist   # regenerate FOTOS.md from the data files
```

Vite + React 19 + TypeScript + Tailwind v4. React Router for the pages,
Phosphor for icons, self-hosted Lora and Mulish. No animation library: the
three effects the site needs are an IntersectionObserver and two CSS keyframes.

## The one rule

**Never put `Paquete*.jpg` or `PhotoBoot360.jpg` on the site.** Those files in
the project root are Instagram promo flyers. Their text is already transcribed
into `src/data/occasions.ts`; everywhere they showed a photograph there is a
labelled placeholder waiting for real photography.

## Where things live

Everything editable is in `src/data`. Nothing in `src/components` or
`src/pages` hardcodes copy, a phone number or an image path.

| File | What it holds |
| --- | --- |
| `data/site.ts` | Brand, phone numbers, WhatsApp, nav, socials, CTA labels, page hero photos |
| `data/occasions.ts` | Every package: name, tier stars, features, duration, notes, photos |
| `data/services.ts` | The six services on the services grid |
| `data/gallery.ts` | Gallery tiles and their categories |
| `data/testimonials.ts` | Client quotes. **Currently placeholder, see below** |
| `data/about.ts` | The Nosotros copy and the three promises |

Adding an occasion to `OCCASIONS` gives it a working page at
`/paquetes/<slug>`, a card on the hub, a slot in the home rail and a footer
link. No route or markup change.

## Adding real photos

Drop the file into `public/` at the exact path the placeholder shows, with that
name. The image appears on reload; nothing in the code changes.

`FOTOS.md` is the full shot list with the intended framing for all 49 slots.
Regenerate it with `npm run shotlist` after editing any photo entry. In dev
mode each placeholder also prints its own path on the page.

Photos are cropped to fill, so leave room around the subject.

## Before this goes live

Three things are deliberately unfinished, each marked in the code:

1. **Testimonials are invented.** `src/data/testimonials.ts` holds placeholder
   quotes so the section has the right shape. Replace them with real client
   quotes and set `PLACEHOLDER_TESTIMONIALS` to `false`. A warning banner shows
   over the section in `npm run dev` until you do. It does not render in a
   production build, so do not rely on it to catch this.
2. **Instagram and Facebook have no URL.** In `SOCIALS` in `src/data/site.ts`
   they are empty strings, which renders a dimmed non-clickable chip rather
   than a dead link. Paste the real profile URLs in and they become links.
3. **No prices anywhere.** Every package says "Precio a cotizar" and sends the
   reader to the form. Nothing invents a number.

## The contact form

There is no server. On submit the form validates, composes the message and
opens WhatsApp with it already written, which is where Atomic answers clients
anyway. Package cards deep-link to `/contacto?ocasion=&paquete=`, which
preselects the occasion and names the package in the message.

If you later want the form to email instead, that is the only place to change.

## Design system

Structure, spacing and chrome are measured off
[lesaintgeorges.ch](https://lesaintgeorges.ch/en/) with a headless browser, not
described from memory. Its computed values are the spec:

| | Reference | Here |
| --- | --- | --- |
| Page | `#ffffff` | same |
| Headings | Lora 36px / 500 / line-height 1.2 | same |
| Card headings | Lora 28px | same |
| Body | 18px | same, Mulish |
| Buttons | 40px tall, `12px 24px 10px`, 13px, uppercase, 2px tracking, radius 0 | same |
| Nav | 13px, sentence case | same |
| Photographs | bare rectangles, radius 0, large, often portrait | same |

**Everything is square.** Zero border-radius sitewide except the circular badge
seal. **Photographs carry no chrome** and deliberately bleed past the container
edge in the alternating rows. **"VER MÁS ->"** is a small underlined uppercase
link, never a button. The `.band` utility owns the very large gaps between
sections; that emptiness is most of what makes the reference feel expensive.

There are no kickers or eyebrows anywhere. Headings carry their own weight.

### One text colour

The reference paints essentially the whole page in a single dark brown, and
that restraint is most of why it reads as expensive. A three-tone grey-blue
ramp is what made an earlier version of this page read as generic.

- **Ink** `#00303f`, the navy from the badge. Headings *and* body. 14:1 on white.
- **Ink-soft** `#55686f` for genuinely tertiary meta only. 5.8:1. Rationed.
- **Pink** `#e0195f`, from the shooting star. The primary button fill and
  nothing else, so every pink thing on the page is something you can press.
- **Gold** lives inside the badge artwork and over photographs. It is 1.5:1 on
  white, so it is never a UI colour here.

Tokens and the full reasoning are at the top of `src/styles/index.css`.

### Motion

One authored idea: the photographs arrive. Images rise and settle as they enter
the viewport; text is already there. Nothing else animates on scroll, so the
movement reads as a decision rather than a template. The hero video and a
single scroll-driven drift are the only other motion, and all of it collapses
under `prefers-reduced-motion`.

### Brand assets

`public/assets/brand/` is derived from `Logo.png` (badge) and `Logo2.png`
(wordmark). `atomic-wordmark-navy.png` is the same artwork with the white
script recoloured to navy for the white page; the star and shutter keep their
colours. Recoloured, never redrawn.

## The hero video

`public/assets/images/hero/Hero.mp4` plays in the home hero, muted and
looping, with the lead occasion photograph as its poster. Swap the file to
change it, or set `HERO_VIDEO` to `null` in `src/data/site.ts` to fall back to
the photograph. It is never downloaded when the visitor prefers reduced
motion.

Keep it short and small: it competes with the first paint.

## Deploying

`npm run build` emits a static `dist/`. Because routes are client-side, the
host has to rewrite unknown paths to `index.html` or `/paquetes/propuestas`
will 404 on refresh. `public/_redirects` covers Netlify and `vercel.json`
covers Vercel. On Apache or nginx you will need the equivalent rewrite.
# AtomicEventsMxl

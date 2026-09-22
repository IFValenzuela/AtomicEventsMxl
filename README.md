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
Phosphor for icons, self-hosted Lora and Mulish. No animation library: every
effect on the site is an IntersectionObserver, three CSS keyframes and one
pointer handler that writes two custom properties.

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
| Nav | 13px, sentence case | same |
| Photographs | bare rectangles, radius 0, large, often portrait | same |
| Buttons | 40px tall, radius 0 | **48px capsule** — see below |

**Photographs carry no chrome** and deliberately bleed past the container edge
in the alternating rows. **"VER MÁS ->"** is a small uppercase link with a
hairline that wipes in on hover, never a button. The `.band` utility owns the
very large gaps between sections; that emptiness is most of what makes the
reference feel expensive.

There are no kickers or eyebrows anywhere. Headings carry their own weight.

### One geometry rule: square for content, capsule for controls

This is the one place the page deliberately leaves the reference behind.
Square buttons are right for a Swiss hotel and wrong here: at 13px uppercase
they read as a form control rather than an invitation.

So radius now carries meaning instead of being uniformly zero:

- **Square — anything that *is* content.** Every photograph, every band, every
  hairline rule. Still bare rectangles on white.
- **Capsule — anything you can *operate*.** Buttons, inputs, the select, the
  filter chips, the menu toggle. Full-round ends, 48px tall (52px for fields).

A reader can tell what is pressable from across the room without a single
extra colour being spent on saying so. Which is exactly why **a photograph
must never pick up a radius**: round one picture and the signal stops meaning
anything.

Type tracking is size-specific, not one value for the whole scale: `h1` at
`-0.022em` down to `h4` at `0`, because letterforms read further apart as they
grow. Tokens and the full reasoning are at the top of `src/styles/index.css`.

### Chrome and materials

The header is a translucent layer (`backdrop-filter`), not an opaque bar, so
content passes underneath it; its lower edge is a fading shadow rather than a
1px line. `onPhoto` buttons blur the photograph behind them for the same
reason. Both fall back to solid surfaces under `prefers-reduced-transparency`
and `prefers-contrast: more`, and the header goes solid whenever the mobile
menu is open, because a modal surface you can see through reads as a mistake.

The closing band is the one dark surface on the site: navy, with the badge
seal and the pink button on it. It used to be a pale tint. A tint is the right
call for a hotel with two hundred photographs to protect; this page needs its
last screen to be the one a reader remembers.

### One text colour

The reference paints essentially the whole page in a single dark brown, and
that restraint is most of why it reads as expensive. A three-tone grey-blue
ramp is what made an earlier version of this page read as generic.

- **Ink** `#00303f`, the navy from the badge. Headings *and* body. 14:1 on white.
- **Ink-soft** `#55686f` for genuinely tertiary meta only. 5.8:1. Rationed.
- **Pink** `#e0195f`, from the shooting star. The primary button fill and
  nothing else, so every pink thing on the page is something you can press.
- **Gold** lives inside the badge artwork, over photographs, and as the one
  decorative wash behind the seal on the navy closing band. It is 1.5:1 on
  white, so it is never a text or UI colour and nothing is ever read off it.

Tokens and the full reasoning are at the top of `src/styles/index.css`.

### Motion

One authored idea on scroll: the photographs arrive. Images rise and settle as
they enter the viewport, fading in while the last 5% of scale comes off them;
text is already there. Nothing else animates on scroll, so the movement reads
as a decision rather than a template.

Everything you can touch follows Apple's fluid-interface rules instead:

- **Feedback lands on the press, not the release.** `:active` shrinks the
  capsule by 3%, using the independent `scale` property so it composes with
  the magnetic translate rather than fighting it.
- **Hover is a fill that rises from the bottom edge**, not a colour swap.
  Motion in the direction of the gesture says the control is arming itself.
- **The pointer pulls a button toward it**, up to six pixels, tracked 1:1 with
  no easing and released onto a 700ms expo curve from wherever it is. Fine
  pointers only; there is no hover on a phone.
- **Route changes cross-fade.** Opacity only — a transform on `<main>` would
  become the containing block for the fixed curtain scene inside it and unpin
  the opening photograph mid-fade.

There are three durations in the whole system (`--dur-press`, `--dur-ui`,
`--dur-scene`) and all of it collapses under `prefers-reduced-motion`.

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

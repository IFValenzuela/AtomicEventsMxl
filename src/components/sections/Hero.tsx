import { useEffect, useRef, useState } from 'react'
import { CONTACT, HERO_VIDEO, HERO_VIDEO_POSTER, HOME_HERO } from '../../data/site'
import { Phone, WhatsappLogo } from '../ui/icons'
import { Button } from '../ui/Button'
import { Photo } from '../ui/Photo'

/**
 * Home hero.
 *
 * One picture, one button, and a line you can call. No headline, no subtext,
 * no scroll cue.
 *
 * Still no display type, and that part is deliberate: the reference sets no
 * headline over its opening photograph either, and a slab of serif over a
 * picture is the thing that makes a page read as a template. The image
 * carries the first screen and the argument starts in the section below it.
 *
 * What the reference does have down there, and what this was missing, is a
 * contact line under the button. See the block comment further down for the
 * measurements.
 *
 * The picture is a curtain scene: pinned to the viewport and never moving,
 * while the page below scrolls up and closes over it. See `.curtain` in
 * index.css for why.
 *
 * The picture is HOME_HERO, its own slot in src/data/site.ts rather than the
 * lead occasion's photograph, so the opening shot can be chosen without
 * touching the propuestas page.
 *
 * A video plays over the photograph on phones, muted, looping and inline. It
 * is vertical footage, which is the right crop for a handheld and the wrong
 * one for a desktop, so it is gated on a media query in JS rather than CSS:
 * a desktop never requests the file, and neither does anyone who prefers
 * reduced motion. Both of those fall back to the photograph.
 */
export function Hero() {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`
  const [playVideo, setPlayVideo] = useState(false)
  const [covered, setCovered] = useState(false)
  const gap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  /* Phones only, and decided here rather than in CSS so a desktop never
     requests the file at all. Both queries are watched, so rotating a tablet
     or turning Reduce Motion on mid-visit lands in the right state instead of
     keeping whatever happened to be true at mount. */
  useEffect(() => {
    if (!HERO_VIDEO) return

    const handheld = window.matchMedia('(max-width: 1023px)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const decide = () => setPlayVideo(handheld.matches && !still.matches)

    decide()
    handheld.addEventListener('change', decide)
    still.addEventListener('change', decide)
    return () => {
      handheld.removeEventListener('change', decide)
      still.removeEventListener('change', decide)
    }
  }, [])

  /* Once the page has closed over the scene there is nothing left to show, so
     the layer stops painting and the video stops decoding frames. The spacer
     is the thing being watched, because its top edge leaving the viewport is
     exactly the moment the picture is fully covered. An observer, never a
     scroll listener. */
  useEffect(() => {
    const el = gap.current
    if (!el) return

    const io = new IntersectionObserver(([entry]) => setCovered(!entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* `playVideo` is in the deps, not just `covered`. The video mounts on the
     render AFTER the media query resolves, so with `[covered]` alone this
     effect had already run against a null ref and never ran again: play() was
     never called on the element that actually exists. The autoplay attribute
     was covering for it. */
  useEffect(() => {
    const el = video.current
    if (!el) return

    if (covered) el.pause()
    else void el.play().catch(() => {})
  }, [covered, playVideo])

  return (
    <div className="curtain">
      <section
        className="curtain-scene overflow-hidden bg-ink"
        /* Hidden rather than unmounted: it keeps the video's buffer and its
           position, and it takes the button out of the tab order while there
           is nothing to press. */
        style={covered ? { visibility: 'hidden' } : undefined}
      >
        <div className="absolute inset-0">
          <Photo {...HOME_HERO} fill overlay priority />

          {playVideo && HERO_VIDEO && (
            <video
              ref={video}
              src={HERO_VIDEO}
              poster={HERO_VIDEO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>

        {/* A soft floor under the button, and enough veil at the top for the
            white nav to stay legible over a bright frame. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ink/80 via-ink/35 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink/60 to-transparent"
        />

        {/* What the reference actually puts on its opening screen, measured at
            a 1920x976 viewport: a ghost button at 79% of the way down, and a
            contact line 24px under it — phone and email, 15px, semibold,
            white, each behind a small glyph. The two are centred on a shared
            axis and the whole block sits in the left third.

            That line is the piece this hero was missing. It is also the one
            thing a person looking for a quinceañera in three weeks actually
            wants on the first screen: a number they can press. */}
        {/* 100svh, not the scene's full height. The scene is 100lvh so no
            strip of page shows when a phone's browser bars retract, but on
            first load those bars are showing and cover the bottom of an lvh
            box: pinned to it, the contact line sat half under the address
            bar on Android Chrome. The small viewport is the height that is
            actually on screen when the page opens, so the block ends there.
            On desktop the two are the same. */}
        <div className="shell rise relative flex h-[100svh] items-end justify-center pb-10 lg:justify-start lg:pb-24">
          <div className="relative isolate flex flex-col items-center">
            {/* A pool of shade behind this block only. The hero is a night
                shot whose lit letters reflect off the wet pier in bright
                streaks exactly where the contact line sits, and the page-wide
                bottom gradient is too faint to hold white type over them.
                Darkening the whole floor would dull the petals; this fades to
                nothing well before the edge of the block's neighbourhood. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-24 -inset-y-12 -z-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-ink)_75%,transparent),transparent)]"
            />

            <Button to="/paquetes" variant="onPhoto">
              Ver paquetes
            </Button>

            <div className="mt-3 flex items-center gap-x-8 text-[0.9375rem] font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.7)] sm:gap-x-10">
              <a
                href={`tel:${CONTACT.phones[0].tel}`}
                className="inline-flex min-h-11 items-center gap-2 transition-opacity duration-200 hover:opacity-75"
              >
                <Phone size={16} weight="fill" aria-hidden="true" />
                {CONTACT.phones[0].display}
              </a>

              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 transition-opacity duration-200 hover:opacity-75"
              >
                <WhatsappLogo size={16} weight="fill" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div ref={gap} className="curtain-gap" aria-hidden="true" />
    </div>
  )
}

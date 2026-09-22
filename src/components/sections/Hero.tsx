import { useEffect, useRef, useState } from 'react'
import { CONTACT, HERO_VIDEO, HOME_HERO } from '../../data/site'
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
 * A video is optional. When HERO_VIDEO is set it plays over the photograph,
 * muted, looping and inline, with that photograph as its poster so the first
 * paint is an image rather than a black rectangle; it is never downloaded at
 * all when the visitor prefers reduced motion. HERO_VIDEO is null today, so
 * the hero is the photograph on its own.
 */
export function Hero() {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`
  const [playVideo, setPlayVideo] = useState(false)
  const [covered, setCovered] = useState(false)
  const gap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!HERO_VIDEO) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPlayVideo(true)
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

  useEffect(() => {
    const el = video.current
    if (!el) return

    if (covered) el.pause()
    else void el.play().catch(() => {})
  }, [covered])

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
              poster={HOME_HERO.src}
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
        <div className="shell rise relative flex h-full items-end pb-16 lg:pb-24">
          <div className="flex flex-col items-center">
            <Button to="/paquetes" variant="onPhoto">
              Ver paquetes
            </Button>

            <div className="mt-6 flex flex-col items-center gap-x-10 gap-y-3 text-[0.9375rem] font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] sm:flex-row">
              <a
                href={`tel:${CONTACT.phones[0].tel}`}
                className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-75"
              >
                <Phone size={16} weight="fill" aria-hidden="true" />
                {CONTACT.phones[0].display}
              </a>

              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-75"
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

import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEO } from '../../data/site'
import { byslug, LEAD_OCCASION } from '../../data/occasions'
import { Button } from '../ui/Button'
import { Photo } from '../ui/Photo'

/**
 * Home hero.
 *
 * A moving picture and one button. No headline, no subtext, no scroll cue.
 *
 * That emptiness is deliberate and it is the reference's opening move: the
 * image carries the whole first screen and the argument starts in the section
 * below it. A slab of display type over the picture is the thing that makes a
 * page read as a template, so there is none here.
 *
 * The picture is a curtain scene: pinned to the viewport and never moving,
 * while the page below scrolls up and closes over it. See `.curtain` in
 * index.css for why. The video is muted, looping and inline, with the lead
 * photograph as its poster so the first paint is an image rather than a black
 * rectangle. It is never loaded at all when the visitor prefers reduced
 * motion, or when no video is configured.
 */
export function Hero() {
  const lead = byslug(LEAD_OCCASION)
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
          {lead && <Photo {...lead.hero} fill overlay priority />}

          {playVideo && HERO_VIDEO && (
            <video
              ref={video}
              src={HERO_VIDEO}
              poster={lead?.hero.src}
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

        <div className="shell rise relative flex h-full items-end pb-16 lg:pb-24">
          <Button to="/paquetes" variant="onPhoto">
            Ver paquetes
          </Button>
        </div>
      </section>

      <div ref={gap} className="curtain-gap" aria-hidden="true" />
    </div>
  )
}

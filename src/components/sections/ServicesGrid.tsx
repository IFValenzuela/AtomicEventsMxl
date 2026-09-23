import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CaretLeft, CaretRight } from '../ui/icons'
import { SERVICES, type Service } from '../../data/services'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

/**
 * The services.
 *
 * A photograph, then a short centred stack under it: the name in the serif,
 * one sentence of body. That is the reference's grouping rule, the same stack
 * the feature rows, the pedida card and the closing ask use.
 *
 * Each photograph sits in the shared hairline frame (see .frame in
 * index.css). Square corners: the photographs are prints, not cards.
 *
 * Two layouts share the tile. ServicesGrid is /servicios, where the six are
 * the content and get a grid. ServicesCarousel is the home page, where they
 * are a preview and get one row.
 */
export function ServicesGrid() {
  return (
    <div className="mx-auto grid max-w-[64rem] grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
      {SERVICES.map((service, i) => (
        <Reveal key={service.id} index={i % 3}>
          <ServiceTile service={service} />
        </Reveal>
      ))}
    </div>
  )
}

/**
 * One row of services that slides, the reference's offers carousel.
 *
 * Laid out like the Instagram strip: full-bleed, 24px in from the viewport
 * edge (32px on desktop), tight gaps, five tiles across on desktop with the
 * sixth a step away, three on a tablet, one and a bit on a phone. Held in the
 * content column it read as four heavy frames boxed into the middle of the
 * page; run edge to edge it reads as a strip of pictures.
 * No library: the track is native horizontal scroll with snap points, so
 * touch, trackpad, shift-wheel and focus-into-view all work for free and
 * nothing has to be kept in sync with a JS position.
 *
 * The arrows are the reference's: round white buttons with a chevron (the
 * only circles in its whole vocabulary, and the only ones here), sitting on
 * the row's two edges, centred on the photographs and half over them, with
 * a soft shadow to lift them off the picture. Each one leaves when there is nothing
 * further that way, so the row never shows a dead control. The chevron goes
 * pink on hover, the site's sign for pressable.
 *
 * Hidden below md. On a phone the next tile already shows at the edge and a
 * swipe is the native gesture; two buttons over a 72%-wide photograph would
 * only cover it.
 */
export function ServicesCarousel() {
  const track = useRef<HTMLUListElement>(null)
  const [pos, setPos] = useState({ start: true, end: false, mid: 0 })

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const photo = el.querySelector('figure')
    const max = el.scrollWidth - el.clientWidth
    setPos({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
      /* Centre of the photographs, from the top of the row. Built from the
         track's own padding and the photo's height rather than offsetTop:
         the Reveal around each tile starts 24px low, and a position read
         mid-entrance would leave the arrows sitting above centre. */
      mid: photo
        ? el.offsetTop + parseFloat(getComputedStyle(el).paddingTop) + photo.offsetHeight / 2
        : 0,
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const step = (dir: 1 | -1) => {
    const el = track.current
    const tile = el?.firstElementChild as HTMLElement | null
    if (!el || !tile) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * (tile.offsetWidth + gap), behavior: still ? 'auto' : 'smooth' })
  }

  return (
    <div role="region" aria-roledescription="carrusel" aria-label="Servicios" className="relative">
      {/* The padding is the strip's inset from the viewport edge, and
          scroll-px keeps the snap point on it. The bottom padding is room for
          the text under the tiles inside the clipped scroll container. */}
      <ul
        ref={track}
        onScroll={measure}
        className="flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto overflow-y-hidden px-6 pt-2 pb-12 lg:scroll-px-8 lg:gap-5 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SERVICES.map((service, i) => (
          <Reveal
            key={service.id}
            as="li"
            index={i}
            className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2.4)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-5rem)/5)]"
          >
            <ServiceTile service={service} />
          </Reveal>
        ))}
      </ul>

      {pos.mid > 0 && (
        <>
          <CarouselButton
            label="Anterior"
            hidden={pos.start}
            onClick={() => step(-1)}
            style={{ top: pos.mid }}
            className="left-6 -translate-x-1/2 lg:left-8"
          >
            <CaretLeft size={20} weight="regular" aria-hidden="true" />
          </CarouselButton>

          <CarouselButton
            label="Siguiente"
            hidden={pos.end}
            onClick={() => step(1)}
            style={{ top: pos.mid }}
            className="right-6 translate-x-1/2 lg:right-8"
          >
            <CaretRight size={20} weight="regular" aria-hidden="true" />
          </CarouselButton>
        </>
      )}
    </div>
  )
}

function CarouselButton({
  label,
  hidden,
  onClick,
  style,
  className,
  children,
}: {
  label: string
  hidden: boolean
  onClick: () => void
  style: CSSProperties
  className: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={hidden}
      onClick={onClick}
      style={style}
      className={`absolute z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-[0_10px_28px_-10px_rgb(0_48_63/0.45),0_1px_3px_rgb(0_48_63/0.1)] transition-[opacity,color] duration-200 hover:text-pink md:inline-flex disabled:pointer-events-none disabled:opacity-0 ${className}`}
    >
      {children}
    </button>
  )
}

function ServiceTile({ service }: { service: Service }) {
  const body = (
    <>
      {/* No hover zoom, no veil. Photographs never move or dim here. */}
      <Photo
        {...service.photo}
        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 42vw, 72vw"
        className="frame"
      />

      <h3
        className={`mt-7 text-2xl ${
          service.href ? 'transition-colors duration-200 group-hover:text-ink-soft' : ''
        }`}
      >
        {service.name}
      </h3>

      <p className="mx-auto mt-3 max-w-[34ch] text-[1rem] text-ink">
        {service.blurb}
      </p>
    </>
  )

  if (service.href) {
    return (
      <Link to={service.href} className="group block text-center">
        {body}
      </Link>
    )
  }

  return <article className="text-center">{body}</article>
}

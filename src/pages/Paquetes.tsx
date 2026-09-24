import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/ui/icons'
import { OCCASIONS } from '../data/occasions'
import { PAGE_HEROES } from '../data/site'
import { useMeta } from '../lib/useMeta'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { StarTier } from '../components/ui/StarTier'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/sections/PageHero'

/**
 * Packages hub.
 *
 * The five occasions as bare photographs with the title and detail set
 * beneath, two across so the frames stay large. No boxes; the only stroke
 * is the frame's hairline edge.
 * The last one, when the count is odd, runs full width.
 */
export default function Paquetes() {
  useMeta(
    'Paquetes',
    'Paquetes de Atomic Events para pedidas de mano, cabina 360°, baby shower y revelación de género, bodas y XV años en Mexicali. Precio a cotizar.',
  )

  return (
    <>
      <PageHero
        title="Paquetes"
        lead="Cada ocasión tiene los suyos, con los niveles tal como vienen en nuestros paquetes. El montaje y la logística van incluidos en todos."
        photo={PAGE_HEROES.paquetes}
      />

      <section className="band">
        <div className="shell grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:gap-x-10">
          {OCCASIONS.map((occasion, i) => {
            const last = i === OCCASIONS.length - 1
            const odd = OCCASIONS.length % 2 === 1
            return (
              <Reveal
                key={occasion.slug}
                index={i % 2}
                className={last && odd ? 'md:col-span-2' : ''}
              >
                <OccasionCard occasion={occasion} wide={last && odd} />
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaBand
        title="¿No sabes cuál te conviene?"
        body="Mándanos la fecha, el lugar y cuántos invitados esperas. Te decimos qué paquete cuadra y qué le podemos quitar o agregar."
      />
    </>
  )
}

function OccasionCard({
  occasion,
  wide,
}: {
  occasion: (typeof OCCASIONS)[number]
  wide: boolean
}) {
  /** The highest tier available in this occasion, for the card's rating. */
  const top = occasion.packages.reduce(
    (best, pkg) =>
      (pkg.stars ?? 0) / (pkg.starsOf ?? 1) > (best.stars ?? 0) / (best.starsOf ?? 1)
        ? pkg
        : best,
    occasion.packages[0],
  )

  return (
    <Link
      to={`/paquetes/${occasion.slug}`}
      className={`group block ${wide ? 'md:grid md:grid-cols-2 md:items-center md:gap-12' : ''}`}
    >
      {/* No hover zoom. The reference declares its transitions on
          background-color, color, fill and border-color only, which is an
          explicit decision to keep photographs out of hover motion. The
          title below carries the affordance, with the frame's hairline
          darkening under it (see .frame in index.css). */}
      <Photo
        {...occasion.photo}
        sizes="(min-width: 768px) 46vw, 100vw"
        className="frame"
      />

      <div className={wide ? 'mt-7 md:mt-0' : 'mt-7'}>
        {top?.stars != null && top.starsOf != null && (
          <StarTier stars={top.stars} of={top.starsOf} name={top.name} />
        )}

        <h2 className="mt-4 text-[1.75rem] transition-colors duration-300 group-hover:text-ink-soft lg:text-3xl">
          {occasion.title}
        </h2>

        <p className="mt-4 max-w-[48ch] text-ink">{occasion.blurb}</p>

        <p className="mt-6 text-[0.8125rem] tracking-[0.1em] text-ink-soft uppercase">
          {occasion.packages.length}{' '}
          {occasion.packages.length === 1 ? 'paquete' : 'paquetes'} · Precio a
          cotizar
        </p>

        <span className="morelink mt-7">
          Ver paquete
          <ArrowRight
            size={16}
            weight="regular"
            aria-hidden="true"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  )
}

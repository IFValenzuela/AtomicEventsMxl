import { Navigate, useParams } from 'react-router-dom'
import { CheckCircle } from '../components/ui/icons'
import { byslug } from '../data/occasions'
import { useMeta } from '../lib/useMeta'
import {
  DurationCard,
  FeaturedPackage,
  PackageCard,
} from '../components/ui/PackageCard'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/sections/PageHero'

/**
 * One page per occasion, rendered from the data alone. Adding an occasion to
 * src/data/occasions.ts gives it a working page with no new markup.
 *
 * The flagship, if the occasion has one, runs full width above the grid.
 * Occasions whose packages differ only by duration (the cabina 360° tiers)
 * use the duration layout, so the shared inclusions are stated once in their
 * own panel rather than three times over.
 */
export default function Ocasion() {
  const { slug } = useParams()
  const occasion = byslug(slug)

  useMeta(
    occasion ? occasion.title : 'Paquetes',
    occasion
      ? `${occasion.blurb} Paquetes de Atomic Events en Mexicali. Precio a cotizar.`
      : 'Paquetes de Atomic Events en Mexicali.',
  )

  if (!occasion) return <Navigate to="/paquetes" replace />

  const durationOnly = occasion.packages.every((p) => p.features.length === 0)
  const featured = occasion.packages.find((p) => p.featured)
  const rest = occasion.packages.filter((p) => !p.featured)

  const cols =
    rest.length === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : rest.length >= 2
        ? 'sm:grid-cols-2'
        : 'grid-cols-1'

  return (
    <>
      <PageHero
        title={occasion.title}
        lead={occasion.lead}
        photo={occasion.hero}
      />

      {(occasion.includes || occasion.promos) && (
        <section className="band pb-0">
          <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {occasion.includes && (
              <Reveal className="lg:col-span-7">
                <h2 className="border-t border-ink pt-8 text-2xl">
                  {occasion.includes.title}
                </h2>

                <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {occasion.includes.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-ink-soft"
                      />
                      <span className="text-[1.0625rem] leading-snug text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {occasion.promos && (
              <Reveal index={1} className="lg:col-span-4 lg:col-start-9">
                <div className="border-t border-pink pt-8">
                  {occasion.promos.map((promo) => (
                    <p
                      key={promo}
                      className="font-display mt-0 mb-6 text-xl text-ink italic last:mb-0"
                    >
                      {promo}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="band">
        <div className="shell">
          <SectionHeader
            title={
              occasion.packages.length === 1
                ? 'El paquete'
                : `${occasion.packages.length} paquetes para elegir`
            }
            body="Todos los precios se cotizan según la fecha, el lugar y lo que quieras agregar. Escríbenos y te mandamos el número."
          />

          {featured && (
            <div className="mt-20">
              <Reveal>
                <FeaturedPackage pkg={featured} occasion={occasion} />
              </Reveal>
            </div>
          )}

          {rest.length > 0 && (
            <div
              className={`grid grid-cols-1 gap-x-8 gap-y-16 lg:gap-x-10 ${cols} ${
                featured ? 'mt-24' : 'mt-20'
              }`}
            >
              {rest.map((pkg, i) => (
                <Reveal key={pkg.id} index={i}>
                  {durationOnly ? (
                    <DurationCard pkg={pkg} occasion={occasion} />
                  ) : (
                    <PackageCard pkg={pkg} occasion={occasion} />
                  )}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={`¿Vamos con ${occasion.nav.toLowerCase()}?`}
        body="Mándanos la fecha y el lugar. Te regresamos la cotización con montaje, logística y tiempo de servicio incluidos."
      />
    </>
  )
}

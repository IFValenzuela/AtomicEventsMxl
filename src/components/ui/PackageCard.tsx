import { CheckCircle, Info } from './icons'
import { CTA } from '../../data/site'
import type { Occasion, Pkg } from '../../data/occasions'
import { Button } from './Button'
import { Photo } from './Photo'
import { StarTier } from './StarTier'

type Props = {
  pkg: Pkg
  occasion: Occasion
}

/** Deep-links to the contact form with this package already chosen. */
export const quoteHref = (occasion: Occasion, pkg: Pkg) =>
  `/contacto?ocasion=${occasion.slug}&paquete=${pkg.id}`

/**
 * One package from a flyer, rebuilt as a real component.
 *
 * No card: no background fill, no border box, no rounded corners. A bare
 * photograph, then the text under it, with a single hairline separating the
 * detail from the action. That is how the reference presents a room or an
 * offer, and it is what keeps a page of four packages from looking like a
 * pricing table.
 *
 * Feature lists run two-up from 640px and stack on phones, the way the
 * flyers' two columns should behave.
 *
 * No package shows a price. Until Atomic supplies figures, every one says
 * "Precio a cotizar" and sends the reader to the form.
 */
export function PackageCard({ pkg, occasion }: Props) {
  const twoUp = pkg.features.length > 4

  return (
    <article className="flex h-full flex-col">
      <Photo {...pkg.photo} sizes="(min-width: 640px) 46vw, 100vw" />

      <div className="flex flex-1 flex-col pt-7">
        {pkg.stars != null && pkg.starsOf != null && (
          <StarTier stars={pkg.stars} of={pkg.starsOf} />
        )}

        <h3 className="mt-4 text-2xl">{pkg.name}</h3>

        {pkg.subtitle && (
          <p className="font-display mt-1 text-lg text-ink-soft italic">
            {pkg.subtitle}
          </p>
        )}

        <ul
          className={`mt-6 gap-x-7 gap-y-3 ${
            twoUp ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'
          }`}
        >
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckCircle
                size={17}
                weight="regular"
                aria-hidden="true"
                className="mt-1 shrink-0 text-ink-soft"
              />
              <span className="text-[1.0625rem] leading-snug text-ink">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {pkg.note && (
          <p className="mt-6 flex items-start gap-3 border-l border-rule pl-4 text-[0.9375rem] leading-snug text-ink-soft">
            <Info size={16} weight="regular" aria-hidden="true" className="mt-1 shrink-0" />
            {pkg.note}
          </p>
        )}

        <div className="mt-auto pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-t border-rule pt-5 text-[0.8125rem] tracking-[0.08em] uppercase">
            <span className="text-ink">{pkg.duration}</span>
            <span className="text-ink-soft">{CTA.price}</span>
          </div>

          <Button to={quoteHref(occasion, pkg)} className="mt-6 w-full">
            {CTA.package}
          </Button>
        </div>
      </div>
    </article>
  )
}

/**
 * The flagship of an occasion, and the layout used when an occasion sells a
 * single package. Full width with the photograph beside the copy, so it reads
 * as the headline offer rather than one more item in the grid.
 */
export function FeaturedPackage({ pkg, occasion }: Props) {
  return (
    <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="relative min-h-[18rem] lg:col-span-6 lg:min-h-[32rem]">
        <Photo {...pkg.photo} fill sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        {pkg.stars != null && pkg.starsOf != null && (
          <StarTier stars={pkg.stars} of={pkg.starsOf} size={17} />
        )}

        <h3 className="mt-4 text-[1.75rem] lg:text-4xl">{pkg.name}</h3>

        {pkg.subtitle && (
          <p className="font-display mt-2 text-xl text-ink-soft italic">
            {pkg.subtitle}
          </p>
        )}

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckCircle
                size={18}
                weight="regular"
                aria-hidden="true"
                className="mt-1 shrink-0 text-ink-soft"
              />
              <span className="text-[1.0625rem] leading-snug text-ink">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {pkg.note && (
          <p className="mt-7 flex items-start gap-3 border-l border-rule pl-4 text-[0.9375rem] leading-snug text-ink-soft">
            <Info size={17} weight="regular" aria-hidden="true" className="mt-1 shrink-0" />
            {pkg.note}
          </p>
        )}

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5 border-t border-rule pt-7">
          <span className="text-[0.8125rem] tracking-[0.08em] text-ink uppercase">
            {pkg.duration}
          </span>
          <span className="text-[0.8125rem] tracking-[0.08em] text-ink-soft uppercase">
            {CTA.price}
          </span>

          <Button
            to={quoteHref(occasion, pkg)}
            className="w-full sm:ml-auto sm:w-auto"
          >
            {CTA.package}
          </Button>
        </div>
      </div>
    </article>
  )
}

/**
 * The cabina 360° tiers, where the only difference between packages is how
 * long the booth stays. A full feature list on each would repeat the shared
 * inclusions three times, so the duration is the whole thing.
 */
export function DurationCard({ pkg, occasion }: Props) {
  return (
    <article className="flex h-full flex-col border-t-2 border-ink pt-8">
      {pkg.stars != null && pkg.starsOf != null && (
        <StarTier stars={pkg.stars} of={pkg.starsOf} />
      )}

      <h3 className="mt-4 text-2xl">{pkg.name}</h3>

      <p className="font-display mt-8 text-[3.5rem] leading-none text-ink lg:text-[4rem]">
        {pkg.duration}
      </p>

      <p className="mt-4 text-[1.0625rem] text-ink">
        de cabina 360°, más los 30 min de regalo
      </p>

      <div className="mt-auto pt-10">
        <div className="border-t border-rule pt-5 text-[0.8125rem] tracking-[0.08em] text-ink-soft uppercase">
          {CTA.price}
        </div>

        <Button to={quoteHref(occasion, pkg)} className="mt-6 w-full">
          {CTA.package}
        </Button>
      </div>
    </article>
  )
}

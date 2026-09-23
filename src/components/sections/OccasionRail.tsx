import { Link } from 'react-router-dom'
import { OCCASIONS } from '../../data/occasions'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

/**
 * The five occasions as a strip of tall portraits.
 *
 * Modelled on the reference's five-square Instagram row: equal frames, tight
 * gaps, running almost the full width of the viewport, with the label set
 * quietly beneath each one rather than inside a card.
 *
 * It scrolls sideways on a phone and sits as five columns from 1024px.
 */
export function OccasionRail() {
  return (
    <div
      className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="list"
    >
      {OCCASIONS.map((occasion, i) => (
        <Reveal
          key={occasion.slug}
          index={i}
          className="w-[62vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-auto"
        >
          <div role="listitem">
            <Link to={`/paquetes/${occasion.slug}`} className="group block">
              <div className="overflow-hidden">
                {/* No hover zoom — see Paquetes.tsx. Photographs never
                    move under the pointer on the reference. */}
                <Photo
                  {...occasion.photo}
                  sizes="(min-width: 1024px) 270px, (min-width: 768px) 30vw, (min-width: 640px) 42vw, 62vw"
                />
              </div>

              <h3 className="mt-5 text-2xl transition-colors duration-300 group-hover:text-ink-soft">
                {occasion.nav}
              </h3>

              <p className="mt-2 text-[0.8125rem] tracking-[0.08em] text-ink-soft uppercase">
                {occasion.packages.length}{' '}
                {occasion.packages.length === 1 ? 'paquete' : 'paquetes'}
              </p>
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

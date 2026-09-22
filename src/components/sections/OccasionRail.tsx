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
      className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 [scrollbar-width:thin]"
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
                <Photo
                  {...occasion.photo}
                  className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>

              <h3 className="mt-5 text-2xl transition-colors duration-300 group-hover:text-pink">
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

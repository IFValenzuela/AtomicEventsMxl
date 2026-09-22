import { Link } from 'react-router-dom'
import { ArrowRight } from '../ui/icons'
import { SERVICES, type Service } from '../../data/services'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

/**
 * The six services.
 *
 * Built on the reference's offer-card treatment: a bare photograph with the
 * name set directly on it in white at the top, no container, no border, no
 * radius. Nothing here is a card with a background and a stroke.
 *
 * Three across at desktop, two at tablet, one on a phone.
 */
export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
      {SERVICES.map((service, i) => (
        <Reveal key={service.id} index={i % 3}>
          <ServiceTile service={service} />
        </Reveal>
      ))}
    </div>
  )
}

function ServiceTile({ service }: { service: Service }) {
  const body = (
    <>
      <div className="relative overflow-hidden">
        <Photo {...service.photo} />

        {/* The veil is only as tall as the text needs, so the photograph is
            not dimmed across its whole face. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/85 via-ink/40 to-transparent"
        />

        <h3 className="absolute top-6 right-6 left-6 text-2xl text-white lg:text-[1.75rem]">
          {service.name}
        </h3>
      </div>

      <p className="mt-5 text-[1.0625rem] text-ink">{service.blurb}</p>

      {/* `self-start` matters: .morelink is inline-flex, and inside this
          flex column it would otherwise stretch its underline the full
          width of the tile. */}
      {service.href && (
        <span className="morelink mt-6 self-start group-hover:text-pink">
          Ver más
          <ArrowRight
            size={16}
            weight="regular"
            aria-hidden="true"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
          />
        </span>
      )}
    </>
  )

  if (service.href) {
    return (
      <Link to={service.href} className="group flex flex-col">
        {body}
      </Link>
    )
  }

  return <article className="flex flex-col">{body}</article>
}

import type { CSSProperties, ReactNode } from 'react'
import type { Photo as PhotoData } from '../../data/site'
import { Photo } from '../ui/Photo'

type Props = {
  title: string
  lead: string
  photo: PhotoData
  children?: ReactNode
}

/**
 * Inner-page header.
 *
 * A full-bleed photograph on its own, then the title and lead centred on
 * white below it. The reference never sets display type over a photograph,
 * and following that keeps the images doing the work.
 *
 * The photograph is a curtain scene, the same as the home hero: pinned to the
 * viewport, never moving, with the white title block scrolling up and closing
 * over it. Shorter than the home hero, because an inner page has to get to
 * its heading quickly.
 */
export function PageHero({ title, lead, photo, children }: Props) {
  return (
    <>
      <div
        className="curtain"
        style={{ '--curtain-h': 'min(72lvh, 46rem)' } as CSSProperties}
      >
        <section className="curtain-scene overflow-hidden">
          <Photo {...photo} fill overlay priority />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ink/80 via-ink/35 to-transparent"
          />
        </section>

        <div className="curtain-gap" aria-hidden="true" />
      </div>

      {/* Full-bleed, with the shell inside it. The curtain's opaque floor is
          this element's background, so it has to span the whole viewport or
          the photograph shows down both sides and the block reads as a card
          floating over the picture instead of the page closing over it. */}
      <section className="rise pt-20 text-center lg:pt-28">
        <div className="shell">
          {/* 36px, not 44px. The reference has exactly one heading size for
              its entire site and no display tier above it, so a page title
              is the same size as a section title and the hierarchy is carried
              by the whitespace around it instead. */}
          <h1 className="mx-auto max-w-[18ch] text-[1.75rem] lg:text-4xl">
            {title}
          </h1>

          <p className="mx-auto mt-7 max-w-[58ch] text-ink">{lead}</p>

          {children && (
            <div className="mt-10 flex justify-center">{children}</div>
          )}
        </div>
      </section>
    </>
  )
}

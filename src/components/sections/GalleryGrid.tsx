import { useMemo, useState } from 'react'
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from '../../data/gallery'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

type Filter = GalleryCategory | 'Todas'

type Props = {
  /** Show the category filter. Off for the home page preview. */
  filterable?: boolean
  /** Cap the number of tiles. Used by the home page preview. */
  limit?: number
}

/**
 * Gallery.
 *
 * CSS columns rather than a grid, because the tiles mix 4:3 and 4:5 and a
 * strict grid would either crop them or leave gaps. Bare frames, square
 * corners, tight gaps.
 *
 * The filter is a row of capsules, because the site's geometry rule is that
 * anything you can operate is a capsule and anything that is content is
 * square. The one in effect fills with ink rather than announcing itself in
 * pink; the page has one ink and no accent hue.
 */
export function GalleryGrid({ filterable = false, limit }: Props) {
  const [filter, setFilter] = useState<Filter>('Todas')

  const items = useMemo(() => {
    const filtered =
      filter === 'Todas' ? GALLERY : GALLERY.filter((g) => g.category === filter)
    return limit ? filtered.slice(0, limit) : filtered
  }, [filter, limit])

  return (
    <div>
      {filterable && (
        <div className="mb-14 flex flex-wrap justify-center gap-2.5">
          {(['Todas', ...GALLERY_CATEGORIES] as Filter[]).map((category) => {
            const active = filter === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={active}
                className="chip"
              >
                {category}
              </button>
            )
          })}
        </div>
      )}

      {items.length === 0 ? (
        <div className="mx-auto max-w-[46ch] border-t border-rule pt-12 text-center">
          <h3 className="text-2xl">Todavía no hay fotos aquí</h3>
          <p className="mt-4 text-ink">
            Estamos preparando esta galería. Mientras tanto, escríbenos y te
            mandamos material de eventos parecidos.
          </p>
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
          {items.map((item, i) => (
            <Reveal
              key={item.src}
              index={i % 3}
              className="mb-4 block break-inside-avoid lg:mb-5"
            >
              <Photo {...item} sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

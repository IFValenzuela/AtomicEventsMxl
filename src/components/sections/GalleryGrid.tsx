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
 * corners, tight gaps. Two columns even on a phone: a gallery is looked at,
 * not read, and one column of full-width photographs made twelve pictures
 * six screens long.
 *
 * The filter is set like the "Ver más" link (see .chip in index.css): small
 * caps, the one in effect underlined in ink. On a phone it is a single row
 * that scrolls sideways instead of wrapping one word onto a second line.
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
        <div className="-mx-6 mb-10 flex gap-7 overflow-x-auto px-6 [scrollbar-width:none] sm:mx-0 sm:mb-14 sm:flex-wrap sm:justify-center sm:gap-x-9 sm:gap-y-1 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
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
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-5">
          {items.map((item, i) => (
            <Reveal
              key={item.src}
              index={i % 3}
              className="mb-3 block break-inside-avoid sm:mb-4 lg:mb-5"
            >
              <Photo {...item} sizes="(min-width: 1024px) 460px, 50vw" />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

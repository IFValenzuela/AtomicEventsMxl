import { useEffect, useMemo, useState } from 'react'
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
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

/** Tile height per unit of column width, plus a little for the gap under it. */
const heightOf = (item: GalleryItem) => {
  const [w, h] = item.ratio.split('/').map(Number)
  return h / w + 0.04
}

/**
 * How much the tiles in the worst column must stretch, each, for that column
 * to reach the tallest one. This is what the split minimises: a shortfall
 * shared by four tiles is barely a crop, one carried by two is visible.
 */
function stretch(assignment: number[], hs: number[], count: number) {
  const heights = new Array<number>(count).fill(0)
  const sizes = new Array<number>(count).fill(0)
  assignment.forEach((c, i) => {
    heights[c] += hs[i]
    sizes[c] += 1
  })
  /* An empty column is a hole in the grid, never an even split. */
  if (sizes.some((s) => s === 0) && assignment.length >= count) return Infinity
  const tallest = Math.max(...heights)
  return Math.max(...heights.map((h, c) => (sizes[c] ? (tallest - h) / sizes[c] : 0)))
}

/**
 * Split the tiles into columns so the columns come out as nearly the same
 * height as the photographs allow. Each column keeps the tiles in their
 * listed order.
 *
 * With a dozen tiles, trying every split is instant, so it does that. Past
 * thirteen, where that stops being instant, it deals each tile onto
 * whichever column is shortest so far, which is within a tile of even.
 */
function distribute(items: GalleryItem[], count: number) {
  const hs = items.map(heightOf)
  let best: number[] = []

  if (items.length <= 13) {
    let bestScore = Infinity
    const current: number[] = []
    const walk = (i: number, used: number) => {
      if (i === items.length) {
        const score = stretch(current, hs, count)
        if (score < bestScore - 1e-9) {
          bestScore = score
          best = [...current]
        }
        return
      }
      /* Columns are interchangeable, so a tile may open at most one new
         column; that removes every mirror image of a split already tried. */
      for (let c = 0; c < Math.min(used + 1, count); c++) {
        current[i] = c
        walk(i + 1, Math.max(used, c + 1))
      }
    }
    walk(0, 0)
  } else {
    const heights = new Array<number>(count).fill(0)
    best = hs.map((h) => {
      const shortest = heights.indexOf(Math.min(...heights))
      heights[shortest] += h
      return shortest
    })
  }

  const columns: GalleryItem[][] = Array.from({ length: count }, () => [])
  best.forEach((c, i) => columns[c].push(items[i]))
  return columns
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = () => setMatches(list.matches)
    onChange()
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/**
 * Gallery.
 *
 * Masonry, because the tiles mix 4:3 and 4:5 and a strict grid would either
 * crop them or leave gaps. The tiles are dealt into columns in code (see
 * distribute), and every tile may grow a little past its ratio, so the
 * shorter columns stretch to meet the tallest and the gallery ends on one
 * straight line instead of a ragged edge. The stretch is shared by every tile
 * in the column, so each is cropped by only a sliver. Bare frames, square
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

  const wide = useMediaQuery('(min-width: 1024px)')
  const columns = useMemo(() => distribute(items, wide ? 3 : 2), [items, wide])

  return (
    <div>
      {filterable && (
        <div className="-mx-6 mb-10 flex gap-7 overflow-x-auto overflow-y-hidden px-6 [scrollbar-width:none] sm:mx-0 sm:mb-14 sm:flex-wrap sm:justify-center sm:gap-x-9 sm:gap-y-1 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
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
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {columns.map((column, c) => (
            <div key={c} className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
              {column.map((item) => (
                <Reveal key={item.src} index={c} className="flex grow flex-col">
                  <div
                    className="relative grow"
                    style={{ aspectRatio: item.ratio.replace('/', ' / ') }}
                  >
                    <Photo
                      {...item}
                      fill
                      sizes="(min-width: 1024px) 460px, 50vw"
                      className="frame"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

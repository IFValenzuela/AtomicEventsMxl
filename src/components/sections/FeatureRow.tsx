import type { Photo as PhotoData } from '../../data/site'
import { MoreLink } from '../ui/MoreLink'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

type Props = {
  title: string
  body: string
  more: { to: string; label?: string }
  /** Which side the photographs sit on at desktop. Rows alternate. */
  media: 'left' | 'right'
  /** One frame, an offset pair, or a trio. */
  photos: PhotoData[]
  /**
   * Heading level. The home page has no display type over its hero, so its
   * first content row carries the document's h1, exactly as the reference
   * does.
   */
  as?: 'h1' | 'h2'
}

/**
 * The alternating photograph-and-text row.
 *
 * Two things here come straight from the reference and are what the section
 * lives on:
 *
 *   1. The photographs run past the edge of the container, off the side of
 *      the viewport. They are not tucked inside a padded column, which is why
 *      they read as photography rather than as content tiles.
 *   2. The text is centred inside its own column, not left-aligned, and held
 *      to about 46 characters so it breaks into short lines.
 *
 * Below 1024px everything stacks, copy first, and the bleed is removed.
 */
export function FeatureRow({ title, body, more, media, photos, as = 'h2' }: Props) {
  const mediaLeft = media === 'left'
  const Heading = as

  return (
    <section className="band overflow-hidden">
      <div className="shell grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Text does not animate in. Only the photographs do, so the motion
            reads as one idea rather than an entrance on every block. */}
        <div
          className={`text-center lg:col-span-5 ${
            mediaLeft ? 'lg:order-2 lg:col-start-8' : 'lg:order-1 lg:col-start-1'
          }`}
        >
          <Heading className="mx-auto max-w-[16ch] text-[1.75rem] lg:text-4xl">
            {title}
          </Heading>

          <p className="mx-auto mt-6 max-w-[46ch] text-ink">{body}</p>

          <div className="mt-10 flex justify-center">
            <MoreLink to={more.to} label={more.label} />
          </div>
        </div>

        <div
          className={`lg:col-span-6 ${
            mediaLeft
              ? 'lg:order-1 lg:col-start-1 lg:-ml-[max(0px,calc((100vw-1440px)/2+2rem))]'
              : 'lg:order-2 lg:col-start-7 lg:-mr-[max(0px,calc((100vw-1440px)/2+2rem))]'
          }`}
        >
          <Media photos={photos} mediaLeft={mediaLeft} />
        </div>
      </div>
    </section>
  )
}

function Media({
  photos,
  mediaLeft,
}: {
  photos: PhotoData[]
  mediaLeft: boolean
}) {
  if (photos.length >= 3) {
    return (
      <div className="grid grid-cols-5 gap-4 lg:gap-6">
        <Reveal className="col-span-3">
          <Photo {...photos[0]} />
        </Reveal>
        <Reveal index={1} className="col-span-2 self-end">
          <Photo {...photos[1]} />
        </Reveal>
        <Reveal
          index={2}
          className={`col-span-3 ${mediaLeft ? 'col-start-2' : 'col-start-1'}`}
        >
          <Photo {...photos[2]} />
        </Reveal>
      </div>
    )
  }

  if (photos.length === 2) {
    // The pair the reference uses: a wide frame, and a narrower one dropped
    // below its baseline and overlapping into it.
    return (
      <div className="relative">
        <Reveal className="w-[82%]">
          <Photo {...photos[0]} />
        </Reveal>
        <Reveal
          index={1}
          className={`relative -mt-[18%] w-[46%] ${mediaLeft ? 'ml-auto' : 'ml-auto'}`}
        >
          <Photo {...photos[1]} />
        </Reveal>
      </div>
    )
  }

  return (
    <Reveal>
      <Photo {...photos[0]} />
    </Reveal>
  )
}

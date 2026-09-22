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
          <Photo {...photos[0]} sizes="(min-width: 1024px) 40vw, 86vw" />
        </Reveal>
        <Reveal index={1} className="col-span-2 self-end">
          <Photo {...photos[1]} sizes="(min-width: 1024px) 22vw, 52vw" />
        </Reveal>
        <Reveal
          index={2}
          className={`col-span-3 ${mediaLeft ? 'col-start-2' : 'col-start-1'}`}
        >
          <Photo {...photos[2]} sizes="(min-width: 1024px) 30vw, 60vw" />
        </Reveal>
      </div>
    )
  }

  if (photos.length === 2) {
    /* The pair, at the reference's proportions rather than a rough imitation
       of them. Measured off its "Rooms & Suites" row: the small frame starts
       about 17% down the big one and runs a little past its bottom edge, so
       the two overlap by roughly 83% of their height and the pair is only
       ~15% taller than the big photo alone.

       Ours used to drop the small frame to 71% down, overlapping by 29%. That
       is not a pair, it is a column: it made the media 45% taller than the big
       photo, and since the row centres its two columns, every pixel of that
       extra height became dead white above and below the text. The text ended
       up marooned in the middle of a tall empty gutter, which is what made the
       section read as plain.

       Absolute placement from lg up, so the small frame's position is stated
       rather than derived from a negative margin against the big frame's
       height. Below lg the two stack in flow with a shallower pull, because
       there is no width for a side-by-side overlap on a phone. */
    return (
      <div className="relative lg:pb-[7%]">
        <Reveal className="w-[86%] lg:w-[78%]">
          <Photo {...photos[0]} sizes="(min-width: 1024px) 40vw, 86vw" />
        </Reveal>
        <Reveal
          index={1}
          className={`relative -mt-[22%] ml-auto w-[52%] lg:absolute lg:top-[32%] lg:mt-0 lg:w-[44%] ${
            mediaLeft ? 'lg:left-0' : 'lg:right-0'
          }`}
        >
          <Photo {...photos[1]} sizes="(min-width: 1024px) 22vw, 52vw" />
        </Reveal>
      </div>
    )
  }

  return (
    <Reveal>
      <Photo {...photos[0]} sizes="(min-width: 1024px) 40vw, 86vw" />
    </Reveal>
  )
}

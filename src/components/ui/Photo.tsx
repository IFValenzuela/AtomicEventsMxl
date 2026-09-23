import { useState } from 'react'
import { Camera } from './icons'
import type { Photo as PhotoData } from '../../data/site'
import VARIANTS from '../../data/imageVariants.json'

/**
 * Widths that `npm run images` actually produced for this file, or nothing.
 *
 * Nothing is the important case. A photograph dropped in without running the
 * script is absent from the manifest and renders from its plain `src`, so a
 * missing rung can never 404 inside a srcset and blank the image.
 */
const rungs = (src: string): { w: number; src: string }[] | undefined =>
  (VARIANTS as Record<string, { w: number; src: string }[]>)[src]

type Props = PhotoData & {
  className?: string
  /** Above the fold. Loads eagerly and skips lazy decoding. */
  priority?: boolean
  /**
   * Fill the parent instead of sizing by aspect ratio. The parent must be
   * positioned and must have its own height. Use it for full-bleed
   * backgrounds and for any cell that must match a sibling's height: an
   * aspect ratio plus `h-full` makes the element compute its own width and
   * overflow the column.
   */
  fill?: boolean
  /**
   * This slot is a background with page copy over it. Pins the placeholder
   * note near the top so it does not sit under a headline.
   */
  overlay?: boolean
  /**
   * What width this photograph occupies, as a `sizes` list. Getting it wrong
   * is the whole ballgame: the default of `100vw` is honest for a full-bleed
   * hero and wasteful for a tile in a five-column strip, where the browser
   * would fetch five times the pixels it can show.
   */
  sizes?: string
}

/**
 * A photograph.
 *
 * Square corners, no border, no card. On the reference site a photograph is
 * simply a rectangle of image placed on white, and that bareness is most of
 * why the page looks like a studio rather than a template.
 *
 * While a photograph downloads, the frame is just the quiet tint at the right
 * aspect ratio. The labelled placeholder (camera, caption, path) appears only
 * when the file genuinely is not there, and only in development, so it is a
 * shot list for whoever is adding photographs rather than something visitors
 * see. It used to show until the image finished loading, which flashed every
 * caption on every page load before the real pictures arrived. On the live
 * site a missing photograph is the plain tinted frame.
 *
 * Drop a real JPG at `src` under `public/` and it appears; there is nothing
 * to change in code. Run `npm run images` afterwards and it also gets a
 * responsive ladder.
 */
export function Photo({
  src,
  alt,
  caption,
  ratio,
  className = '',
  priority = false,
  fill = false,
  overlay = false,
  sizes = '100vw',
}: Props) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'missing'>('loading')
  const loaded = status === 'loaded'
  const ladder = rungs(src)

  return (
    <figure
      /* When filling, the figure is absolute rather than `h-full`. A parent
         that only sets `min-height` has `height: auto`, so a percentage height
         resolves to auto and the figure collapses to nothing. */
      className={`overflow-hidden bg-paper-tint ${fill ? 'absolute inset-0' : 'relative'} ${className}`}
      style={fill ? undefined : { aspectRatio: ratio.replace('/', ' / ') }}
    >
      <img
        src={src}
        srcSet={ladder?.map((r) => `${r.src} ${r.w}w`).join(', ')}
        sizes={ladder ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('missing')}
        data-loaded={loaded}
        /* `.photo-img` in index.css holds the arrival: the frame fades in
           while the last 5% of scale settles out of it, so the picture reads
           as being placed rather than switched on. */
        className="photo-img absolute inset-0 h-full w-full object-cover"
      />

      {status === 'missing' && import.meta.env.DEV && (
        <Pending caption={caption} src={src} overlay={overlay} />
      )}
    </figure>
  )
}

/** Development only: marks a slot whose photograph does not exist yet. */
function Pending({
  caption,
  src,
  overlay,
}: {
  caption: string
  src: string
  overlay: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex flex-col items-center gap-4 border border-dashed border-ink/15 p-6 text-center ${
        overlay ? 'justify-start pt-40' : 'justify-center'
      }`}
    >
      <Camera size={24} weight="thin" className="shrink-0 text-ink-soft" />

      <p
        className={`max-w-[30ch] text-[0.8125rem] leading-snug tracking-[0.08em] uppercase ${
          overlay
            ? 'bg-ink/70 px-4 py-2 text-white/90'
            : 'text-ink-soft'
        }`}
      >
        {caption}
      </p>

      {import.meta.env.DEV && (
        <code
          className={`max-w-full truncate px-2 py-1 font-mono text-[0.625rem] ${
            overlay ? 'bg-ink/70 text-white/70' : 'bg-ink/5 text-ink-soft'
          }`}
        >
          {src}
        </code>
      )}
    </div>
  )
}

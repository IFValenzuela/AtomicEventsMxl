import { Heart, InstagramLogo } from '../ui/icons'
import { BRAND, SOCIALS } from '../../data/site'
import { INSTAGRAM } from '../../data/instagram'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'

const PROFILE =
  SOCIALS.find((s) => s.name === 'Instagram')?.url ??
  'https://www.instagram.com/'

/** "https://www.instagram.com/atomic.eventsmxli/" -> "@atomic.eventsmxli" */
const HANDLE = `@${PROFILE.replace(/\/+$/, '').split('/').pop()}`

/**
 * The Instagram strip, sitting directly above the pre-footer frieze.
 *
 * Measured off lesaintgeorges.ch at a 1920 viewport:
 *
 *   lockup      the wordmark, centred, above the heading
 *   heading     <h2> "Follow us on Instagram", Lora 36px / 500, centred
 *   strip       5 tiles, full-bleed with a 32px inset either side, ~350px
 *               wide and ~20px apart, starting ~44px under the heading
 *   tiles       4:5 portrait, square corners, no shadow, a small glyph in
 *               the top-right, and nothing else: no header, no caption, no
 *               buttons. The photograph is the link.
 *
 * Each tile is one of the account's reels: its cover (saved locally, see
 * src/data/instagram.ts), opening the reel in a new tab.
 *
 * Hover is the reference's: the whole tile fills with the brand colour, and
 * the like count and the post's own caption appear centred on it in white.
 * The reference fills with its brown; this fills with the ink navy at 90%,
 * so a trace of the photograph still shows through the way it does there.
 * 0.2s, a fade and nothing else, the reference's hover timing everywhere.
 * Keyboard focus shows the same panel.
 *
 * On a pointer screen the tile at rest is bare but for the glyph, as on the
 * reference, since the count arrives on hover. A touch screen has no hover,
 * so there the count stays in the bottom-left corner at all times, white,
 * lifted off the picture by a drop-shadow rather than a scrim.
 *
 * These used to be Instagram's own embeds. Those are an iframe from Meta's
 * domain that brings its own header, buttons, fonts and comment box, and
 * none of it can be restyled; five of them read as someone else's page
 * dropped into this one.
 *
 * The handle under the heading is also an addition: "Follow us on Instagram"
 * with no visible account name makes people click a photograph to find out
 * where they are going.
 */
export function InstagramStrip() {
  return (
    <section
      aria-labelledby="instagram-heading"
      className="relative z-[1] bg-paper pt-20 lg:pt-28"
    >
      <div className="shell text-center">
        <img
          src={BRAND.wordmarkNavy}
          srcSet={`${BRAND.wordmarkNavy} 1x, ${BRAND.wordmarkNavy2x} 2x`}
          alt=""
          width={150}
          height={79}
          aria-hidden="true"
          loading="lazy"
          className="mx-auto h-auto w-[168px]"
        />

        <h2 id="instagram-heading" className="mt-8 text-[1.75rem] lg:text-4xl">
          Síguenos en Instagram
        </h2>

        <a
          href={PROFILE}
          target="_blank"
          rel="noreferrer"
          className="inkwipe mt-2 inline-block py-3 text-[0.9375rem] text-ink-soft [--wipe-from:var(--color-ink-soft)]"
        >
          {HANDLE}
        </a>
      </div>

      {/* Full-bleed, inset 32px either side, not held inside the content
          column, which is what lets five portraits read as a run of
          photographs rather than a card grid. Slides sideways below the
          desktop breakpoint, where five tiles would be thumbnails. */}
      <ul className="mt-9 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {INSTAGRAM.map((post, i) => (
          <Reveal
            key={post.url}
            as="li"
            index={i}
            className="w-[62vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-auto"
          >
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group relative block"
            >
              <Photo
                {...post}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, (min-width: 640px) 42vw, 62vw"
              />

              <InstagramLogo
                size={20}
                weight="regular"
                aria-hidden="true"
                className="absolute top-3 right-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]"
              />

              <span
                aria-hidden="true"
                className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] [@media(hover:hover)]:hidden"
              >
                <Heart size={15} weight="fill" aria-hidden="true" />
                {post.likes}
              </span>

              <div
                aria-hidden="true"
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ink/90 p-7 text-center text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span className="inline-flex items-center gap-2 text-[1.0625rem]">
                  <Heart size={24} weight="regular" aria-hidden="true" />
                  {post.likes}
                </span>
                <p className="line-clamp-5 max-w-[30ch] text-[0.9375rem] leading-relaxed">
                  {post.text}
                </p>
              </div>

              <span className="sr-only">
                {post.text} {post.likes} me gusta. Ver en Instagram, se abre en
                una pestaña nueva.
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

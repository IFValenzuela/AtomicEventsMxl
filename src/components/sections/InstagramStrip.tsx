import { InstagramLogo } from '../ui/icons'
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
 *   lockup      the wordmark, centred, 240x48, at y 6823
 *   heading     <h2> "Follow us on Instagram" — Lora 36px / 500, brand ink,
 *               sentence case, centred, 32px under the lockup
 *   strip       5 tiles, full-bleed with a 32px inset either side, ~353px
 *               wide and ~20px apart, starting 44px under the heading
 *   tiles       4:5 portrait — Instagram's own portrait crop — square
 *               corners, no shadow, with a small glyph in the top-right
 *
 * Note it is the wordmark above the heading, not the circular crest: the
 * reference signs off with the same flat lockup it uses in its footer. The
 * crest belongs to the header.
 *
 * This is a curated strip rather than a live feed. See src/data/instagram.ts
 * for why, and for the five paths to drop photographs into.
 *
 * One addition the reference does not have: the handle, set small under the
 * heading. "Follow us on Instagram" with no visible account name asks people
 * to click a photograph to find out where they are going, and the account
 * name is the one piece of information the section exists to deliver.
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

      {/* Full-bleed, inset 32px either side — the strip is not held inside the
          content column, which is what lets five portraits read as a run of
          photographs rather than as a card grid. Scrolls sideways below the
          desktop breakpoint, where five tiles would be thumbnails. */}
      <ul
        className="mt-11 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {INSTAGRAM.map((post, i) => (
          <Reveal
            key={post.src}
            as="li"
            index={i}
            className="w-[62vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-auto"
          >
            <a
              href={post.url ?? PROFILE}
              target="_blank"
              rel="noreferrer"
              className="group relative block"
            >
              <Photo
                {...post}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, (min-width: 640px) 42vw, 62vw"
              />

              {/* The glyph the reference puts in the corner of each tile. A
                  drop-shadow rather than a scrim, so it stays legible over a
                  bright photograph without dimming the picture. */}
              <InstagramLogo
                size={20}
                weight="regular"
                aria-hidden="true"
                className="absolute top-3 right-3 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]"
              />

              <span className="sr-only">
                {post.caption}. Ver en Instagram, se abre en una pestaña nueva.
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

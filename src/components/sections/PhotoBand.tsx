import type { ReactNode } from 'react'
import type { Photo as PhotoData } from '../../data/site'
import { MoreLink } from '../ui/MoreLink'
import { Reveal } from '../ui/Reveal'

type Props = {
  title: ReactNode
  body: string
  more?: { to: string; label?: string }
  /** The photograph the band is cut from. Only `src` and `alt` are used. */
  photo: Pick<PhotoData, 'src' | 'alt'>
  /** Which side the card sits on at desktop. Alternate it between bands. */
  card?: 'left' | 'right'
  className?: string
}

/**
 * The held band.
 *
 * This is the reference's strongest device and the one thing it does that
 * this site did not: a photograph that runs the full width of the viewport,
 * stays put while the page scrolls over it, and has an opaque white card
 * crossing it carrying the copy.
 *
 * Three rules, all of them from the reference and all of them load-bearing:
 *
 *   - The card is solid white. Not frosted, not tinted, not translucent.
 *     Glass over a photograph is the 2020s app move; opaque white over a
 *     photograph is the print move, and it is the reason the reference reads
 *     as a brochure rather than as an interface.
 *   - Nothing casts a shadow. The card is legible because it occludes the
 *     picture, and occlusion is the only depth cue in the whole design system.
 *   - No corner is rounded, on the card or on the band.
 *
 * The parallax itself is `.photoband` in index.css, which is the same CSS
 * mode the reference uses on five of its own bands. It is opted into only
 * where it is smooth; elsewhere the photograph simply covers and the
 * composition is unchanged.
 *
 * The photograph is decorative here: the card carries every word in the
 * section, so an alt text on the background would be read out as a duplicate.
 * `photo.alt` is kept in the signature so the shot list in src/data still
 * describes this slot.
 */
export function PhotoBand({ title, body, more, photo, card = 'right', className = '' }: Props) {
  return (
    <section
      className={`photoband ${className}`}
      style={{ backgroundImage: `url(${photo.src})` }}
    >
      {/* A floor under the card on phones, where the card is full width and
          sits directly on the picture. At desktop it does nothing visible. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/20 lg:bg-transparent" />

      {/* The card sits LOW and hard against the viewport edge, not centred and
          not inside the content column.

          The reference can float its card in the middle of a band because its
          photographs are wide interiors with no single subject — there is
          nothing in the centre to cover. Atomic's are the opposite: a pedida
          is shot straight down a walkway, so the letters, the couple and the
          fireworks all sit in a band roughly 30%-70% across, and the only dead
          space is the outer third on each side.

          A card held inside the 1440 shell lands at about 57%-93% of the
          viewport, which is exactly on top of the end of the phrase. Taking it
          out of the shell and pinning it to the edge puts it in that outer
          third instead. 28rem is the widest it can be and still fit there.

          Note this cannot be solved by position alone: `background-attachment:
          fixed` means the visible slice of the photograph shifts as the band
          scrolls, so there is no vertical position that is permanently clear.
          Getting it out of the horizontal centre is what actually works.

          Still centred on a phone, where the card is full width and there is
          no side to move it to. */}
      <div className="relative flex min-h-[70vh] items-center px-6 py-24 lg:min-h-[85vh] lg:items-end lg:px-8 lg:py-20">
        <Reveal
          y={0}
          className={`w-full max-w-[34rem] bg-paper p-10 text-center lg:max-w-[28rem] lg:p-12 ${
            card === 'right' ? 'lg:ml-auto' : 'lg:mr-auto'
          }`}
        >
          <h2 className="mx-auto max-w-[16ch] text-[1.75rem] lg:text-4xl">{title}</h2>

          <p className="mx-auto mt-6 max-w-[42ch] text-ink">{body}</p>

          {more && (
            <div className="mt-10 flex justify-center">
              <MoreLink to={more.to} label={more.label} />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

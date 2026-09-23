import { WhatsappLogo } from '../ui/icons'
import { CLOSING_PHOTO, CONTACT, CTA, type Photo } from '../../data/site'
import { Button } from '../ui/Button'

type Props = {
  title?: string
  body?: string
  /** Override the closing photograph on a page that would otherwise repeat it. */
  photo?: Photo
}

/**
 * The closing ask.
 *
 * A held photograph with nothing on it, then the ask on white directly under
 * it: the page-header pattern (see PageHero), played at the other end of the
 * page. The reference never sets display type over a photograph, and every
 * attempt to do it here traded one thing for another:
 *
 *   white type, no treatment   the picture is held, so the fireworks and the
 *                              lit letters travel behind the copy as the page
 *                              scrolls, and no drop-shadow survives them
 *   tint, then side shade      legible, but the photograph reads darker
 *   white card in the corner   legible and untouched, but the site's biggest
 *                              ask shrank to a box that looked like a cookie
 *                              notice, and it repeated the pedida band's card
 *
 * Splitting them costs nothing. The photograph is shown exactly as shot and
 * gets the whole band; the copy is ink on white at the site's one heading
 * size, with the only pink control on the screen.
 *
 * Text does not animate in, and the photograph is not wrapped in Reveal: a
 * transform on an ancestor turns `background-attachment: fixed` back into
 * plain scrolling.
 */
export function CtaBand({
  title = '¿Ya tienes fecha?',
  body = 'Cuéntanos qué vas a celebrar y te mandamos una cotización con todo incluido: montaje, logística y tiempo completo.',
  photo = CLOSING_PHOTO,
}: Props) {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`

  return (
    <section aria-labelledby="cierre-heading" className="cierre">
      {/* `photoband`: the same held photograph as the pedida band and the
          hero curtain. The picture stays put while the page moves over it, so
          the page closes the way it opened. Desktop pointers only; see
          .photoband in index.css.

          Height is the reference's, measured: its parallax bands are ~470px
          tall at 1920, a strip across the page rather than a second hero. An
          82vh band here filled the whole screen and read as too much. */}
      <div
        role="img"
        aria-label={photo.alt}
        className="photoband h-[40vh] min-h-64 lg:h-[30rem]"
        style={{ backgroundImage: `url(${photo.src})` }}
      />

      {/* Close under the photograph: the two are one unit, the picture and
          the question it asks, so they sit nearer each other than either
          does to the band above. */}
      <div className="shell pt-14 text-center lg:pt-16">
        <h2
          id="cierre-heading"
          className="mx-auto max-w-[18ch] text-[1.75rem] lg:text-4xl"
        >
          {title}
        </h2>

        <p className="mx-auto mt-7 max-w-[46ch] text-ink">{body}</p>

        <div className="mt-11 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10">
          <Button to="/contacto">{CTA.quote}</Button>

          <a href={wa} target="_blank" rel="noreferrer" className="morelink">
            <WhatsappLogo size={16} weight="regular" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

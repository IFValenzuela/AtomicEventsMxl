import { WhatsappLogo } from '../ui/icons'
import { CLOSING_PHOTO, CONTACT, CTA, type Photo } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

type Props = {
  title?: string
  body?: string
  /** Override the closing photograph on a page that would otherwise repeat it. */
  photo?: Photo
}

/**
 * The closing ask, on a full-bleed photograph.
 *
 * Nothing is laid over the picture: no tint, no scrim, no reduced opacity. An
 * earlier version had all three and they were what made this look muddy - the
 * photograph was fine, the treatment was not.
 *
 * Legibility lives on the type instead, which is the same thing the home hero
 * does with its contact line. Measured across the visible strip of this
 * photograph, white text scores about 20:1 over the dark pier at the edges and
 * 4.3:1 at worst over the lit letters in the middle. A drop-shadow on the copy
 * covers that last stretch without touching the picture.
 *
 * The button keeps its solid pink fill, so its own label contrast is
 * self-contained at 4.69:1 whatever is behind it.
 */
export function CtaBand({
  title = '¿Ya tienes fecha?',
  body = 'Cuéntanos qué vas a celebrar y te mandamos una cotización con todo incluido: montaje, logística y tiempo completo.',
  photo = CLOSING_PHOTO,
}: Props) {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`

  return (
    <section
      className="relative isolate bg-ink bg-cover bg-center"
      style={{ backgroundImage: `url(${photo.src})` }}
    >
      {/* Left, not centred, and that is what lets the picture stay untouched.
          Measured across the visible strip, white text scores about 20:1 over
          the dark pier at the left edge and 4.3:1 over the lit letters in the
          middle. Centring the copy put it on the one part of the photograph it
          could not survive; moving it to the dark third means the photo needs
          no veil at all. Still centred below lg, where the band is narrow
          enough that there is no dark third to move into. */}
      <Reveal className="band shell relative text-center [text-shadow:0_1px_14px_rgb(0_0_0/0.85)] lg:text-left">
        <h2 className="mx-auto max-w-[18ch] text-[1.75rem] text-white lg:mx-0 lg:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-7 max-w-[42ch] text-white lg:mx-0">{body}</p>

        <div className="mt-11 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10 lg:justify-start">
          <Button to="/contacto">{CTA.quote}</Button>

          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            /* White resting, and no ink-to-pink sweep here: the sweep's resting
               half is the page's ink, which would vanish against this. */
            className="inline-flex items-center gap-3 border-b border-white/70 pb-1.5 text-[0.8125rem] font-semibold tracking-[2px] text-white uppercase transition-colors duration-200 hover:border-white hover:text-white"
          >
            <WhatsappLogo size={16} weight="regular" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  )
}

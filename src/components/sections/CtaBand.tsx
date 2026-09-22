import { WhatsappLogo } from '../ui/icons'
import { CONTACT, CTA } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

type Props = {
  title?: string
  body?: string
}

/**
 * The closing ask.
 *
 * A tinted band, centred, with the same restraint as everything else: serif
 * heading, one short paragraph, two square buttons. This is the one place on
 * the page where the background is not white, exactly as the reference uses
 * its single tinted band.
 */
export function CtaBand({
  title = '¿Ya tienes fecha?',
  body = 'Cuéntanos qué vas a celebrar y te mandamos una cotización con todo incluido: montaje, logística y tiempo completo.',
}: Props) {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`

  return (
    <section className="band bg-sand">
      <Reveal className="shell text-center">
        <h2 className="mx-auto max-w-[18ch] text-[1.75rem] lg:text-4xl">{title}</h2>

        <p className="mx-auto mt-7 max-w-[54ch] text-ink">{body}</p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <Button to="/contacto" >
            {CTA.quote}
          </Button>

          <Button href={wa} variant="accent">
            <WhatsappLogo size={17} weight="regular" aria-hidden="true" />
            WhatsApp
          </Button>
        </div>
      </Reveal>
    </section>
  )
}

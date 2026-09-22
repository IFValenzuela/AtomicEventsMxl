import { CONTACT, PAGE_HEROES, BRAND } from '../data/site'
import { useMeta } from '../lib/useMeta'
import { Reveal } from '../components/ui/Reveal'
import { ContactForm } from '../components/sections/ContactForm'
import { PageHero } from '../components/sections/PageHero'

/**
 * No closing band on this page. The form is the call to action, and a second
 * "Cotiza tu evento" underneath it would be the same ask twice.
 */
export default function Contacto() {
  useMeta(
    'Contacto',
    'Cotiza tu evento con Atomic Events en Mexicali. Llámanos al (686) 143 6523 o al (686) 188 9205, o escríbenos por WhatsApp.',
  )

  return (
    <>
      <PageHero
        title="Cotiza tu evento"
        lead="Dinos qué vas a celebrar, cuándo y dónde. Te regresamos una cotización con montaje, logística y tiempo de servicio incluidos."
        photo={PAGE_HEROES.contacto}
      />

      <section className="band">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal index={1} className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-ink pt-10">
              <h2 className="text-2xl">O márcanos directo</h2>
              <ul className="mt-6 space-y-3">
                {CONTACT.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="font-display text-2xl text-ink transition-colors duration-300 hover:text-pink"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border-t border-rule pt-10">
              <h2 className="text-2xl">WhatsApp</h2>
              <p className="mt-4 text-[1.0625rem] text-ink">
                Es por donde contestamos más rápido, sobre todo en fin de
                semana.
              </p>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="morelink mt-7"
              >
                Abrir conversación
              </a>
            </div>

            <div className="mt-12 border-t border-rule pt-10">
              <h2 className="text-2xl">Dónde trabajamos</h2>
              <p className="mt-4 text-[1.0625rem] text-ink">
                {BRAND.city}, {BRAND.country}
                <br />
                Cubrimos {CONTACT.area}.
              </p>
              <p className="mt-4 text-[1.0625rem] text-ink">
                Apartamos por fecha. Entre más pronto nos escribas, más probable
                es que tengamos disponible tu día.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

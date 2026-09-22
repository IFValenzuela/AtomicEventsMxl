import { ABOUT } from '../data/about'
import { byslug } from '../data/occasions'
import { useMeta } from '../lib/useMeta'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CtaBand } from '../components/sections/CtaBand'
import { FeatureRow } from '../components/sections/FeatureRow'
import { Hero } from '../components/sections/Hero'
import { OccasionRail } from '../components/sections/OccasionRail'
import { PhotoBand } from '../components/sections/PhotoBand'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { Testimonials } from '../components/sections/Testimonials'

/**
 * Home.
 *
 *   hero          a photograph, one button, a number you can call
 *   nosotros      alternating row, photographs right, bleeding off the edge
 *   servicios     three-across photo tiles with the name set on the image
 *   pedidas       the held band: a pinned photograph with a white card on it
 *   paquetes      five portraits in a strip
 *   testimonios   three quotes in the display serif, no boxes
 *   cierre        the one tinted band
 *
 * Six sections, and that ceiling is deliberate. Two more used to sit here: a
 * second alternating row for the 360 booth, and a gallery preview. Both were
 * cut, for the same two reasons.
 *
 * The first is duplication. GalleryGrid is the component /galeria renders, and
 * the Instagram strip above the footer already says "look at our work".
 * Three photo walls on one page is one idea told three times. The 360 booth already
 * has a card in the rail directly above where its row used to be, plus its own
 * page.
 *
 * The second is rhythm, and it mattered more. Four of the eight sections were
 * the same unit: centred heading, centred paragraph, "VER MÁS", grid. A reader
 * does not experience that as eight sections, they experience it as one section
 * repeating, which is what made the page feel like a receipt. Three of those
 * units remain and they are separated by the held band, so the eye gets a
 * full-bleed reset between them.
 *
 * Before adding a section here, check it is not the fourth centred-header grid.
 */
export default function Home() {
  useMeta(
    'Decoración y cabina 360 para eventos en Mexicali',
    'Atomic Events crea pedidas de mano, revelaciones de género, XV años y bodas inolvidables en Mexicali. Cabina de fotos 360°, letras iluminadas, chisperos, pétalos y video con dron.',
  )

  const propuestas = byslug('propuestas')

  return (
    <>
      <Hero />

      <FeatureRow
        as="h1"
        title={ABOUT.title}
        body={ABOUT.lead}
        more={{ to: '/nosotros' }}
        media="right"
        photos={[ABOUT.photo, ABOUT.detail[0]]}
      />

      <section className="band">
        <div className="shell">
          <SectionHeader
            title="Todo lo que ponemos en tu evento"
            body="Seis servicios que se combinan según lo que estés celebrando. El montaje y la logística siempre van incluidos."
            more={{ to: '/servicios' }}
          />

          <div className="mt-20">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {propuestas && (
        <PhotoBand
          title={propuestas.kicker}
          body={propuestas.blurb}
          more={{ to: `/paquetes/${propuestas.slug}` }}
          photo={propuestas.hero}
          card="right"
        />
      )}

      <section className="band">
        <div className="shell">
          <SectionHeader
            title="Paquetes por ocasión"
            body="Cada celebración tiene los suyos, con niveles que van de lo esencial a nuestro paquete estrella."
            more={{ to: '/paquetes', label: 'Ver todos los paquetes' }}
          />

          <div className="mt-20">
            <OccasionRail />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <SectionHeader title="Lo que dicen nuestros clientes" />

          <div className="mt-20">
            <Testimonials />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

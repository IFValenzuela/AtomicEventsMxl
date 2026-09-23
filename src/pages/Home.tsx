import { ABOUT } from '../data/about'
import { byslug } from '../data/occasions'
import { useMeta } from '../lib/useMeta'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CtaBand } from '../components/sections/CtaBand'
import { FeatureRow } from '../components/sections/FeatureRow'
import { Hero } from '../components/sections/Hero'
import { OccasionRail } from '../components/sections/OccasionRail'
import { PhotoBand } from '../components/sections/PhotoBand'
import { ServicesCarousel } from '../components/sections/ServicesGrid'

/**
 * Home.
 *
 *   hero          a photograph, one button, a number you can call
 *   nosotros      alternating row, photographs right, bleeding off the edge
 *   servicios     all six services in one sliding row
 *   pedidas       the held band: a pinned photograph with a white card on it
 *   paquetes      five portraits in a strip
 *   cierre        the one tinted band
 *
 * Five sections, and that ceiling is deliberate. Four more used to sit here:
 * a second alternating row for the 360 booth, a gallery preview and a testimonial
 * block.
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

      {/* pt-0: the row above already closes with a full band of air. */}
      <section className="band pt-0">
        <div className="shell">
          <SectionHeader
            title="Todo lo que ponemos en tu evento"
            body="Seis servicios que se combinan según lo que estés celebrando. El montaje y la logística siempre van incluidos."
            more={{ to: '/servicios' }}
          />

        </div>

        {/* Outside the shell on purpose: the row runs full-bleed like the
            Instagram strip, inset from the viewport edge rather than held in
            the content column. */}
        <div className="mt-16 lg:mt-20">
          <ServicesCarousel />
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

      <CtaBand />
    </>
  )
}

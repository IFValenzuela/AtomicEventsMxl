import { ABOUT } from '../data/about'
import { byslug } from '../data/occasions'
import { useMeta } from '../lib/useMeta'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CtaBand } from '../components/sections/CtaBand'
import { FeatureRow } from '../components/sections/FeatureRow'
import { GalleryGrid } from '../components/sections/GalleryGrid'
import { Hero } from '../components/sections/Hero'
import { OccasionRail } from '../components/sections/OccasionRail'
import { ServicesGrid } from '../components/sections/ServicesGrid'
import { Testimonials } from '../components/sections/Testimonials'

/**
 * Home.
 *
 *   hero          a photograph and one button, nothing else
 *   nosotros      alternating row, photographs right, bleeding off the edge
 *   servicios     three-across photo tiles with the name set on the image
 *   paquetes      five portraits in a strip
 *   cabina 360    alternating row, photographs left
 *   galeria       masonry preview
 *   testimonios   three quotes in the display serif, no boxes
 *   cierre        the one tinted band
 *
 * Section headings are centred with a short centred paragraph and a small
 * "VER MÁS" underneath, which is the reference's repeating unit.
 */
export default function Home() {
  useMeta(
    'Decoración y cabina 360 para eventos en Mexicali',
    'Atomic Events crea pedidas de mano, revelaciones de género, XV años y bodas inolvidables en Mexicali. Cabina de fotos 360°, letras iluminadas, chisperos, pétalos y video con dron.',
  )

  const cabina = byslug('cabina-360')

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

      {cabina && (
        <FeatureRow
          title="La cabina 360° que no para en toda la noche"
          body={cabina.lead}
          more={{ to: '/paquetes/cabina-360' }}
          media="left"
          photos={cabina.packages.map((p) => p.photo)}
        />
      )}

      <section className="band">
        <div className="shell">
          <SectionHeader
            title="Eventos que ya montamos"
            body="Bodas, XV años, baby showers y pedidas en Mexicali y el valle."
            more={{ to: '/galeria', label: 'Ver la galería' }}
          />

          <div className="mt-20">
            <GalleryGrid limit={6} />
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

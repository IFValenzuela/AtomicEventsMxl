import { PAGE_HEROES } from '../data/site'
import { useMeta } from '../lib/useMeta'
import { CtaBand } from '../components/sections/CtaBand'
import { GalleryGrid } from '../components/sections/GalleryGrid'
import { PageHero } from '../components/sections/PageHero'

export default function Galeria() {
  useMeta(
    'Galería',
    'Fotos de bodas, XV años, baby showers y pedidas de mano montadas por Atomic Events en Mexicali y el valle.',
  )

  return (
    <>
      <PageHero
        title="Galería"
        lead="Bodas, XV años, baby showers y pedidas que ya montamos en Mexicali y el valle. Filtra por el tipo de evento que estés planeando."
        photo={PAGE_HEROES.galeria}
      />

      <section className="band">
        <div className="shell">
          <GalleryGrid filterable />
        </div>
      </section>

      <CtaBand
        title="¿Quieres ver más de tu tipo de evento?"
        body="Tenemos material que todavía no subimos aquí. Dinos qué vas a celebrar y te lo mandamos por WhatsApp."
      />
    </>
  )
}

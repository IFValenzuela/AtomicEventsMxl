import { ABOUT } from '../data/about'
import { PAGE_HEROES } from '../data/site'
import { useMeta } from '../lib/useMeta'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/sections/PageHero'
import { ServicesGrid } from '../components/sections/ServicesGrid'

export default function Servicios() {
  useMeta(
    'Servicios',
    'Cabina de fotos 360°, letras gigantes iluminadas, chisperos, camino de pétalos y velas, video con dron y decoración con globos en Mexicali.',
  )

  return (
    <>
      <PageHero
        title="Servicios"
        lead="Seis cosas que llevamos a tu evento. Se combinan entre sí según lo que estés celebrando, y el montaje y la logística siempre van incluidos."
        photo={PAGE_HEROES.servicios}
      />

      <section className="band">
        <div className="shell">
          <ServicesGrid />
        </div>
      </section>

      {/* Three promises, grouped by hairlines rather than boxed into cards. */}
      <section className="band pt-0">
        <div className="shell">
          <SectionHeader title="Cómo trabajamos" />

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
            {ABOUT.promises.map((promise) => (
              <div key={promise.id} className="border-t border-rule pt-8 text-center">
                  <h3 className="text-2xl">{promise.title}</h3>
                  <p className="mx-auto mt-4 max-w-[38ch] text-[1.0625rem] text-ink">
                    {promise.body}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

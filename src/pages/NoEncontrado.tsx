import { CTA } from '../data/site'
import { useMeta } from '../lib/useMeta'
import { Button } from '../components/ui/Button'
import { MoreLink } from '../components/ui/MoreLink'

export default function NoEncontrado() {
  useMeta(
    'Página no encontrada',
    'Esta página no existe en el sitio de Atomic Events.',
  )

  return (
    /* Top padding clears the overlaid header; no bottom padding, because the
       frieze under it brings its own. This used to be py-40 around a 70vh
       centred box, which left ~250px of white above the heading and ~480px
       below the buttons. */
    <section className="pt-36 lg:pt-56">
      <div className="shell flex flex-col items-center text-center">
        <h1 className="max-w-[20ch] text-[2rem] lg:text-[2.75rem]">
          Esta página no existe
        </h1>

        <p className="mx-auto mt-7 max-w-[52ch] text-ink">
          Puede que hayamos movido la liga. Empieza por los paquetes o
          escríbenos y te decimos dónde está lo que buscas.
        </p>

        {/* One fill, one hairline link. Same rule as CtaBand: the reference
            never sets two solid buttons against each other. */}
        <div className="mt-11 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10">
          <Button to="/contacto">{CTA.quote}</Button>

          <MoreLink to="/paquetes" label="Ver paquetes" />
        </div>
      </div>
    </section>
  )
}

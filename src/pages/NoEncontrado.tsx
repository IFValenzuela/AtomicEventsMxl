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
    <section className="py-40">
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center text-center">
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

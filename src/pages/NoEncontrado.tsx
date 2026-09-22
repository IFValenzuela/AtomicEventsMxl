import { CTA } from '../data/site'
import { useMeta } from '../lib/useMeta'
import { Button } from '../components/ui/Button'

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

        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <Button to="/contacto">{CTA.quote}</Button>

          <Button to="/paquetes" variant="outline">
            Ver paquetes
          </Button>
        </div>
      </div>
    </section>
  )
}

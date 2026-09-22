import { ABOUT } from '../data/about'
import { BRAND, CONTACT } from '../data/site'
import { useMeta } from '../lib/useMeta'
import { Photo } from '../components/ui/Photo'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { CtaBand } from '../components/sections/CtaBand'
import { PageHero } from '../components/sections/PageHero'

export default function Nosotros() {
  useMeta(
    'Nosotros',
    'Atomic Events es un equipo de Mexicali dedicado a la decoración y la foto de eventos: pedidas, revelaciones de género, XV años y bodas.',
  )

  return (
    <>
      <PageHero title="Nosotros" lead={ABOUT.lead} photo={ABOUT.hero} />

      {/* The story, centred and narrow, with the seal beneath it. */}
      <section className="band">
        <div className="shell">
          <Reveal className="mx-auto max-w-[44rem] text-center">
            <h2 className="text-[1.75rem] lg:text-4xl">{ABOUT.title}</h2>
            <p className="mx-auto mt-7 max-w-[58ch] text-ink">
              {ABOUT.body}
            </p>
          </Reveal>

          {/* Two frames offset against each other, the reference's pairing. */}
          <div className="mt-20 grid grid-cols-1 items-start gap-6 sm:grid-cols-12 lg:gap-8">
            <Reveal className="sm:col-span-7">
              <Photo {...ABOUT.photo} />
            </Reveal>
            <Reveal index={1} className="sm:col-span-4 sm:col-start-9 sm:mt-24">
              <Photo {...ABOUT.detail[0]} />
            </Reveal>
          </div>
        </div>
      </section>

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

          <Reveal className="mt-20 flex flex-col items-center gap-6 text-center">
            <img
              src={BRAND.badge}
              alt=""
              width={72}
              height={72}
              loading="lazy"
              aria-hidden="true"
              className="h-18 w-18 rounded-full"
            />
            <p className="text-[1.0625rem] text-ink">
              {BRAND.name}
              <br />
              {BRAND.city}. Damos servicio en {CONTACT.area}.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

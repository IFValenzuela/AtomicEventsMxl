import { BRAND } from '../../data/site'
import { PLACEHOLDER_TESTIMONIALS, TESTIMONIALS } from '../../data/testimonials'
import { Reveal } from '../ui/Reveal'

/**
 * Client quotes.
 *
 * No boxes. The quotes are set in the display serif, separated from one
 * another by a hairline and a lot of air, the way the reference handles any
 * block of short text. The badge seal sits under the first one as a small
 * stamp.
 *
 * Every quote in the data file is placeholder copy. While
 * PLACEHOLDER_TESTIMONIALS is true a warning renders here in development so
 * invented quotes cannot ship as real reviews by accident. It is stripped
 * from the production bundle.
 */
export function Testimonials() {
  return (
    <div>
      {import.meta.env.DEV && PLACEHOLDER_TESTIMONIALS && (
        <p className="mx-auto mb-14 max-w-[70ch] border border-danger/40 px-5 py-3 text-center text-[0.875rem] text-danger">
          Solo en desarrollo: estos testimonios son de ejemplo. Reemplázalos en
          src/data/testimonials.ts y pon PLACEHOLDER_TESTIMONIALS en false.
        </p>
      )}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.id}>
            <figure className="flex h-full flex-col border-t border-rule pt-8 text-center">
              <blockquote className="font-display text-xl leading-snug text-ink italic lg:text-[1.375rem]">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="mt-7">
                <span className="block text-[0.8125rem] tracking-[0.125em] text-ink uppercase">
                  {testimonial.name}
                </span>
                <span className="mt-2 block text-[0.9375rem] text-ink-soft">
                  {testimonial.event}
                </span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <Reveal className="mt-16 flex justify-center">
        <img
          src={BRAND.badge}
          alt=""
          width={72}
          height={72}
          loading="lazy"
          aria-hidden="true"
          className="h-18 w-18 rounded-full"
        />
      </Reveal>
    </div>
  )
}

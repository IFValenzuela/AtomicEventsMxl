import { Link } from 'react-router-dom'
import { BRAND, CONTACT, SOCIALS, TRUST } from '../../data/site'
import { OCCASIONS } from '../../data/occasions'

/**
 * Footer, rebuilt to the reference's actual geometry rather than to a memory
 * of it. Every number below was read off lesaintgeorges.ch at a 1920 viewport:
 *
 *   columns          5 equal columns starting at the shell's left edge
 *                    (x = 233, 527, 821, 1116, 1410 — a 294px pitch)
 *   column heading   Lora 20px / 24px line-height, brand ink
 *   heading to list  44px
 *   links            15px / 24px line-height, and that line-height IS the
 *                    spacing — there is no margin between rows
 *   trust marks      a left-aligned row roughly 150px below the columns
 *   close            one hairline, then the copyright line
 *
 * Two things this footer used to get wrong, both of them structural:
 *
 *   1. It opened with a large centred badge, a large centred wordmark and a
 *      centred tagline — three stacked brand elements and about 400px of
 *      vertical space before any content. The reference has no centred block
 *      at all. Its brand is a single small wordmark sitting in column one,
 *      left-aligned, in the same grid as the link lists, with the address and
 *      phone directly beneath it. The circular crest never appears down here;
 *      it belongs to the header.
 *   2. The link lists were set at 17px with 12px of extra margin per row,
 *      about a 40px pitch. The reference runs a 24px pitch. That near-double
 *      spacing is what made our columns sprawl while the reference's read as
 *      a row of tight, quiet blocks.
 *
 * No rule along the top: the frieze above it is the divider, exactly as on
 * the reference, where the footer simply continues off the bottom of the
 * illustration. See Frieze.tsx.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-[1] bg-paper">
      {/* 80px of air under the frieze. Measured: the reference leaves 67px
          between the bottom of its illustration and the top of its footer
          columns, and every column starts on that same line. */}
      <div className="shell pt-16 pb-14 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-5 lg:gap-x-10">
          {/* Column one: the brand, then where we are and how to reach us.
              This is the reference's arrangement — the wordmark is a column
              heading's worth of weight, not a hero. */}
          <div className="col-span-2 lg:col-span-1">
            <img
              src={BRAND.wordmarkNavy}
              srcSet={`${BRAND.wordmarkNavy} 1x, ${BRAND.wordmarkNavy2x} 2x`}
              alt={BRAND.name}
              width={150}
              height={79}
              loading="lazy"
              className="h-auto w-[168px]"
            />

            <address className="mt-9 text-[0.9375rem] leading-6 text-ink not-italic">
              {BRAND.city}
              <br />
              {BRAND.country}

              <span className="mt-6 block text-ink-soft">
                Damos servicio en {CONTACT.area}
              </span>
            </address>
          </div>

          <FooterNav
            title="Paquetes"
            links={OCCASIONS.map((o) => ({
              label: o.nav,
              to: `/paquetes/${o.slug}`,
            }))}
          />

          <FooterNav
            title="El sitio"
            links={[
              { label: 'Inicio', to: '/' },
              { label: 'Servicios', to: '/servicios' },
              { label: 'Galería', to: '/galeria' },
              { label: 'Nosotros', to: '/nosotros' },
              { label: 'Contacto', to: '/contacto' },
            ]}
          />

          <div>
            <h2 className="text-xl">Contacto</h2>
            <ul className="mt-9 -my-2.5 text-[0.9375rem] leading-6 lg:mt-11 lg:my-0">
              {CONTACT.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="inkwipe block py-2.5 text-ink lg:py-0"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inkwipe block py-2.5 text-ink lg:py-0"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Plain text links, no glyphs. The reference's social column is
              four unadorned words, and an icon beside each one is the detail
              that makes a footer look assembled from a kit. */}
          <nav aria-label="Síguenos">
            <h2 className="text-xl">Síguenos</h2>
            <ul className="mt-9 -my-2.5 text-[0.9375rem] leading-6 lg:mt-11 lg:my-0">
              {SOCIALS.map((social) => (
                <li key={social.name}>
                  {social.url ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inkwipe block py-2.5 text-ink lg:py-0"
                    >
                      {social.name}
                    </a>
                  ) : (
                    <span
                      title={`${social.name}: perfil pendiente`}
                      className="block cursor-default py-2.5 text-ink-soft lg:py-0"
                    >
                      {social.name}
                      <span className="sr-only">, perfil pendiente</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Trust marks, in the slot where the reference runs its row of award
            logos: left-aligned, well below the columns, and quiet. These used
            to sit above the sitemap as a full-width banded row of 20px serif
            — which gave three self-made claims more weight than anything else
            on the page. They are claims, not certifications, so they are
            sized like a caption. */}
        <ul className="mt-16 flex flex-col gap-x-14 gap-y-5 text-[0.9375rem] leading-6 sm:flex-row lg:mt-24">
          {TRUST.map((item) => (
            <li key={item.value}>
              <span className="text-ink">{item.value}</span>{' '}
              <span className="text-ink-soft">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col justify-between gap-2 py-7 text-[0.8125rem] text-ink-soft sm:flex-row">
          <p>
            © {year} {BRAND.name}. Todos los derechos reservados.
          </p>
          <p>Hecho en {BRAND.city}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterNav({
  title,
  links,
}: {
  title: string
  links: { label: string; to: string }[]
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-xl">{title}</h2>

      {/* 44px under the heading, then a 24px pitch carried entirely by
          line-height. No per-row margin — that is the reference's list. */}
      <ul className="mt-9 -my-2.5 text-[0.9375rem] leading-6 lg:mt-11 lg:my-0">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="inkwipe block py-2.5 text-ink lg:py-0"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

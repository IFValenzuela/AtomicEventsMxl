import { Link } from 'react-router-dom'
import { FacebookLogo, InstagramLogo, WhatsappLogo } from '../ui/icons'
import { BRAND, CONTACT, SOCIALS, TRUST } from '../../data/site'
import { OCCASIONS } from '../../data/occasions'

const SOCIAL_ICONS = {
  WhatsApp: WhatsappLogo,
  Instagram: InstagramLogo,
  Facebook: FacebookLogo,
} as const

/**
 * Footer, following the reference's arrangement: the brand centred on its own
 * at the top with plenty of air, then the sitemap in left-aligned columns with
 * serif headings, a row of trust marks, and a single hairline above the
 * copyright line.
 *
 * Light, like the rest of the page. Nothing here is boxed.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-[1] border-t border-rule bg-paper">
      <div className="shell pt-20 pb-16 lg:pt-28 lg:pb-20">
        {/* Centred brand. */}
        <div className="flex flex-col items-center text-center">
          <img
            src={BRAND.badge}
            alt=""
            width={84}
            height={84}
            loading="lazy"
            aria-hidden="true"
            className="h-21 w-21 rounded-full"
          />

          <img
            src={BRAND.wordmarkNavy}
            srcSet={`${BRAND.wordmarkNavy} 1x, ${BRAND.wordmarkNavy2x} 2x`}
            alt={BRAND.name}
            width={150}
            height={79}
            loading="lazy"
            className="mt-7 h-14 w-auto"
          />

          <p className="mt-6 max-w-[42ch] text-[1.0625rem] text-ink">
            {BRAND.tagline}. Decoración y foto para eventos en {BRAND.city}.
          </p>
        </div>

        {/* Trust marks. Claims the flyers actually make, not certifications. */}
        <ul className="mt-16 grid grid-cols-1 gap-y-6 border-y border-rule py-8 sm:grid-cols-3">
          {TRUST.map((item) => (
            <li key={item.value} className="text-center">
              <span className="font-display block text-xl text-ink">
                {item.value}
              </span>
              <span className="mt-1 block text-[0.8125rem] tracking-[0.08em] text-ink-soft uppercase">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Sitemap. */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
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
            <ul className="mt-6 space-y-3 text-[1.0625rem]">
              {CONTACT.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="text-ink transition-colors duration-300 hover:text-pink"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              <li className="pt-2 text-ink">
                {BRAND.city}
                <br />
                {BRAND.country}
              </li>
              <li className="text-ink-soft">Damos servicio en {CONTACT.area}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl">Síguenos</h2>
            <ul className="mt-6 space-y-3 text-[1.0625rem]">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.name as keyof typeof SOCIAL_ICONS]
                return (
                  <li key={social.name}>
                    {social.url ? (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 text-ink transition-colors duration-300 hover:text-pink"
                      >
                        <Icon size={18} weight="regular" aria-hidden="true" />
                        {social.name}
                      </a>
                    ) : (
                      <span
                        title={`${social.name}: perfil pendiente`}
                        className="inline-flex cursor-default items-center gap-3 text-ink-soft"
                      >
                        <Icon size={18} weight="regular" aria-hidden="true" />
                        {social.name}
                        <span className="sr-only">, perfil pendiente</span>
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col items-center justify-between gap-2 py-7 text-center text-[0.8125rem] text-ink-soft sm:flex-row sm:text-left">
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
      <ul className="mt-6 space-y-3 text-[1.0625rem]">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-ink transition-colors duration-300 hover:text-pink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

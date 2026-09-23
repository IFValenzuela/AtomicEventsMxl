import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { List, Phone, WhatsappLogo, X } from '../ui/icons'
import { BRAND, CONTACT, CTA, NAV } from '../../data/site'
import { Button } from '../ui/Button'

/**
 * Header, rebuilt to the reference's measured geometry.
 *
 * Read off lesaintgeorges.ch at a 1920 viewport (1905 of content):
 *
 *   band            139px tall, fixed, 24px of padding at the top
 *   crest           91x91, at x=32 — thirty-two pixels from the VIEWPORT's
 *                   left edge, not from the content column
 *   wordmark        200x40, centred on the viewport, top-aligned at y=24
 *   BOOK            97x40 at x=1702, and the language switcher after it sits
 *                   flush 32px from the right edge
 *   rule            1px, y=84, x=400, w=1105 — 58% of the viewport, centred
 *   nav             13px, sentence case, no tracking, items padded 13px/12px,
 *                   the row starting at y=92
 *   on scroll       background fades to white over 0.2s, the ink goes from
 *                   white to brand brown, and the crest shrinks 91 -> 80
 *
 * Three things ours was getting wrong, all of them structural:
 *
 *   1. The crest and the button sat inside the content column. The reference
 *      pins them to the viewport's corners. That single decision is most of
 *      why its header reads as a masthead rather than as a navbar.
 *   2. The crest was 44-52px. The reference's is 91px — nearly twice the
 *      size, and tall enough to cross the rule below it into the nav row.
 *      It is the anchor of the whole composition.
 *   3. The rule ran the full width of the content column. The reference's
 *      runs 58% of the viewport, centred, and that width is not arbitrary:
 *      it is exactly what clears the crest on the left and the button on the
 *      right, so the line can pass behind neither and between both.
 *
 * Mobile and desktop are composed separately rather than as one responsive
 * tangle, because the desktop version is an absolutely-placed masthead and
 * the mobile version is an ordinary bar. They share the scroll state.
 */
export function Header() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = sentinel.current
    if (!node || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const dark = solid || menuOpen

  /* A link to the page you are already on does nothing, so on the home page
     the crest and the wordmark scroll back to the top instead. Smooth unless
     the visitor has asked for reduced motion. */
  const toTop = () => {
    if (pathname !== '/') return
    setMenuOpen(false)
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-10 w-px" />

      <header
        /* 0.2s on the reference, on background-color and colour only. Nothing
           here moves or resizes except the crest. */
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          dark ? 'border-ink/20 bg-paper' : 'border-transparent bg-transparent'
        }`}
      >
        {/* ---------------------------------------------------------------
            Desktop: a masthead, absolutely composed. Every position below is
            the reference's, scaled to this band.
            --------------------------------------------------------------- */}
        <div className="relative hidden h-[138px] lg:block">
          <Link
            to="/"
            aria-label={`${BRAND.name}, ir al inicio`}
            onClick={toTop}
            className="absolute top-6 left-8"
          >
            <img
              src={BRAND.badge}
              alt=""
              width={88}
              height={88}
              aria-hidden="true"
              /* 91 -> 80 on scroll, as a transform rather than a size change
                 so the surrounding layout never reflows. */
              className={`h-22 w-22 origin-top-left rounded-full transition-transform duration-300 ${
                dark ? 'scale-90' : 'scale-100'
              }`}
            />
          </Link>

          <Link
            to="/"
            aria-label={`${BRAND.name}, ir al inicio`}
            onClick={toTop}
            className="absolute top-6 left-1/2 -translate-x-1/2"
          >
            <img
              src={dark ? BRAND.wordmarkNavy : BRAND.wordmark}
              srcSet={
                dark
                  ? `${BRAND.wordmarkNavy} 1x, ${BRAND.wordmarkNavy2x} 2x`
                  : `${BRAND.wordmark} 1x, ${BRAND.wordmark2x} 2x`
              }
              alt={BRAND.name}
              width={132}
              height={70}
              className="h-12 w-auto"
            />
          </Link>

          <div className="absolute top-6 right-8">
            {/* Filled once scrolled, ghost over the hero. That is the
                reference's own pairing: a white hairline on the photograph,
                a solid fill on white. */}
            <Button to="/contacto" variant={dark ? 'solid' : 'onPhoto'}>
              {CTA.quote}
            </Button>
          </div>

          {/* The rule and the nav under it. 58% of the viewport, centred —
              wide enough to read as a masthead rule, narrow enough to clear
              the crest and the button on either side. */}
          <div
            className={`absolute top-[84px] left-1/2 w-[58%] -translate-x-1/2 border-t transition-colors duration-300 ${
              dark ? 'border-ink/30' : 'border-white/40'
            }`}
          >
            <nav aria-label="Principal">
              <ul className="flex items-center justify-center pt-2">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `block px-3 py-[11px] text-[0.8125rem] whitespace-nowrap transition-colors duration-300 ${
                          dark
                            ? isActive
                              ? 'text-ink'
                              : 'inkwipe text-ink/60 [--wipe-from:color-mix(in_oklab,var(--color-ink)_60%,transparent)]'
                            : isActive
                              ? 'text-white'
                              : 'text-white/80 hover:text-white'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            Mobile: an ordinary bar. The masthead composition needs width it
            does not have here.
            --------------------------------------------------------------- */}
        <div className="flex h-[72px] items-center justify-between px-6 lg:hidden">
          <Link
            to="/"
            aria-label={`${BRAND.name}, ir al inicio`}
            onClick={toTop}
          >
            <img
              src={BRAND.badge}
              alt=""
              width={44}
              height={44}
              aria-hidden="true"
              className="h-11 w-11 rounded-full"
            />
          </Link>

          <Link
            to="/"
            aria-label={`${BRAND.name}, ir al inicio`}
            onClick={toTop}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <img
              src={dark ? BRAND.wordmarkNavy : BRAND.wordmark}
              srcSet={
                dark
                  ? `${BRAND.wordmarkNavy} 1x, ${BRAND.wordmarkNavy2x} 2x`
                  : `${BRAND.wordmark} 1x, ${BRAND.wordmark2x} 2x`
              }
              alt={BRAND.name}
              width={132}
              height={70}
              className="h-10 w-auto"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            /* No box: the bare glyph, sized to sit with the badge and the
               wordmark. The button keeps its 44px tap target, pulled right
               so the glyph lines up with the edge of the bar's padding. */
            className={`-mr-2 inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 ${
              dark ? 'text-pink' : 'text-white'
            }`}
          >
            {menuOpen ? <X size={28} /> : <List size={30} />}
          </button>
        </div>

        {/* Mobile menu: a full sheet, not a dropdown.

            It used to open as a short panel under the bar with the page
            still showing beneath it, which read as unfinished. Now it takes
            the whole screen below the bar and is composed like a page of the
            site: the five places in the serif at the card step, the one pink
            button, a direct line to call or write, and the frieze along the
            foot, the same drawing that closes every page. The menu is the
            one screen a phone visitor always sees, so it carries the brand
            the way the masthead does on desktop.

            Every link closes the sheet on tap, including the page you are
            already on, which the route change alone would not. */}
        <div
          id="menu-movil"
          hidden={!menuOpen}
          className="fixed inset-x-0 top-[73px] bottom-0 overflow-y-auto overscroll-contain bg-paper lg:hidden"
        >
          <div className="flex min-h-full flex-col">
            <nav aria-label="Principal, móvil" className="shell pt-3">
              <ul>
                {NAV.map((item) => (
                  <li key={item.href} className="border-b border-rule">
                    <NavLink
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `font-display flex min-h-16 items-center text-[1.75rem] transition-colors duration-200 ${
                          isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-9" onClick={() => setMenuOpen(false)}>
                <Button to="/contacto" className="w-full">
                  {CTA.quote}
                </Button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-8 text-[0.9375rem] font-semibold text-ink">
                <a
                  href={`tel:${CONTACT.phones[0].tel}`}
                  className="inline-flex min-h-11 items-center gap-2"
                >
                  <Phone size={16} weight="regular" aria-hidden="true" />
                  {CONTACT.phones[0].display}
                </a>
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2"
                >
                  <WhatsappLogo size={16} weight="regular" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </nav>

            <div className="mt-auto pt-10 pb-[env(safe-area-inset-bottom)]">
              <img
                src="/assets/images/frieze/frieze-1280.png"
                alt=""
                aria-hidden="true"
                width={1280}
                height={173}
                loading="lazy"
                className="h-[92px] w-full max-w-none object-cover object-center"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { List, X } from '../ui/icons'
import { BRAND, CTA, NAV } from '../../data/site'
import { Button } from '../ui/Button'

/**
 * Header, built to the reference's architecture rather than the usual
 * logo-left / nav-right bar.
 *
 * Two stacked rows inside a fixed 139px band:
 *   row 1   circular badge seal at the left, the wordmark centred, the
 *           booking button at the right
 *   rule    a hairline spanning the middle
 *   row 2   the nav, centred under the rule
 *
 * It starts transparent so the hero photograph runs under it, with the white
 * wordmark and a white-hairline button. Once past the hero it turns solid
 * white and swaps to the navy wordmark and navy chrome. That is a genuine
 * light/dark swap, which is what the reference does and what the brief asked
 * for.
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

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-10 w-px" />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          dark ? 'border-b border-rule bg-paper' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell">
          {/* Row 1: seal, wordmark, action. */}
          <div className="flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
            <Link
              to="/"
              aria-label={`${BRAND.name}, ir al inicio`}
              className="flex shrink-0 items-center lg:w-[220px]"
            >
              <img
                src={BRAND.badge}
                alt=""
                width={52}
                height={52}
                aria-hidden="true"
                className="h-11 w-11 rounded-full lg:h-13 lg:w-13"
              />
            </Link>

            <Link
              to="/"
              aria-label={`${BRAND.name}, ir al inicio`}
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
                className="h-10 w-auto lg:h-12"
              />
            </Link>

            {/* The side columns are only pinned to a width at lg, where they
                balance the absolutely-centred wordmark. Fixing that width on a
                phone overflows the 390px viewport and clips the menu button. */}
            <div className="flex shrink-0 items-center justify-end lg:w-[220px]">
              <span className="hidden lg:block">
                <Button to="/contacto" variant={dark ? 'outline' : 'onPhoto'}>
                  {CTA.quote}
                </Button>
              </span>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="menu-movil"
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                className={`inline-flex h-11 w-11 items-center justify-center border transition-colors duration-300 lg:hidden ${
                  dark
                    ? 'border-ink/25 text-ink hover:border-pink hover:text-pink'
                    : 'border-white/60 text-white'
                }`}
              >
                {menuOpen ? <X size={19} /> : <List size={19} />}
              </button>
            </div>
          </div>

          {/* Row 2: the rule and the centred nav. */}
          <div
            className={`hidden border-t lg:block ${dark ? 'border-rule' : 'border-white/30'}`}
          >
            <nav aria-label="Principal">
              <ul className="flex items-center justify-center gap-10 py-4">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `text-[0.8125rem] whitespace-nowrap transition-colors duration-300 ${
                          dark
                            ? isActive
                              ? 'text-pink'
                              : 'text-ink hover:text-pink'
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

        {/* Mobile menu. */}
        <div
          id="menu-movil"
          hidden={!menuOpen}
          className="border-t border-rule bg-paper lg:hidden"
        >
          <nav aria-label="Principal, móvil" className="shell py-6">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-rule last:border-0">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `block py-4 font-display text-xl transition-colors duration-300 ${
                        isActive ? 'text-pink' : 'text-ink hover:text-pink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Button to="/contacto"  className="mt-8 w-full">
              {CTA.quote}
            </Button>
          </nav>
        </div>
      </header>
    </>
  )
}

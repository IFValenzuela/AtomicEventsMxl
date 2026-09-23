import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Frieze } from './Frieze'
import { InstagramStrip } from '../sections/InstagramStrip'

/** Start each route at the top, the way a real page load would. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}

export function Layout() {
  // The Instagram strip belongs to the home page only. On inner pages it sat
  // between the content and the footer as one more thing to scroll past.
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <ScrollToTop />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-pink focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Outlet />
      </main>

      {isHome && <InstagramStrip />}
      <Frieze tight={pathname === '/contacto'} />
      <Footer />
    </>
  )
}

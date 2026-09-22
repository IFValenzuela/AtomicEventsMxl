import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

/**
 * Routes.
 *
 * Home ships in the entry chunk because it is what almost everyone lands on.
 * Every other page is split out and fetched on navigation, which keeps the
 * first paint small on a phone.
 *
 * The five occasion pages all come from one component driven by
 * src/data/occasions.ts, so adding an occasion needs no route change.
 */
const Servicios = lazy(() => import('./pages/Servicios'))
const Paquetes = lazy(() => import('./pages/Paquetes'))
const Ocasion = lazy(() => import('./pages/Ocasion'))
const Galeria = lazy(() => import('./pages/Galeria'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const NoEncontrado = lazy(() => import('./pages/NoEncontrado'))

/**
 * Shown while a route chunk is in flight. It reserves the height of a page
 * header band so the layout does not jump when the real page arrives.
 */
function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[62vh] items-center justify-center"
    >
      <span className="sr-only">Cargando la página</span>
      <span
        aria-hidden="true"
        className="h-8 w-8 rounded-full border-2 border-rule border-t-ink motion-safe:animate-spin"
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="servicios"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Servicios />
              </Suspense>
            }
          />
          <Route
            path="paquetes"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Paquetes />
              </Suspense>
            }
          />
          <Route
            path="paquetes/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Ocasion />
              </Suspense>
            }
          />
          <Route
            path="galeria"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Galeria />
              </Suspense>
            }
          />
          <Route
            path="nosotros"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Nosotros />
              </Suspense>
            }
          />
          <Route
            path="contacto"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Contacto />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NoEncontrado />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

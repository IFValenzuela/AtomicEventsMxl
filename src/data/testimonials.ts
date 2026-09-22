/**
 * ============================================================================
 *  PLACEHOLDER CONTENT. THESE ARE NOT REAL CLIENT QUOTES.
 * ============================================================================
 *
 *  They exist so the section has the right shape and length while real
 *  testimonials are collected. Replace the `quote`, `name` and `event` of each
 *  entry with something a real client actually said, then set
 *  `PLACEHOLDER_TESTIMONIALS` to false.
 *
 *  While that flag is true, the site shows a warning banner over the section
 *  in development so these never ship as genuine reviews by accident. The
 *  banner does not render in a production build.
 *
 *  Keep each quote to three lines or fewer. A landing page quote is a
 *  snippet, not a full review.
 */

export const PLACEHOLDER_TESTIMONIALS = true

export type Testimonial = {
  id: string
  quote: string
  name: string
  event: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Llegamos y ya estaba todo puesto. Ella se soltó llorando antes de que yo dijera nada.',
    name: 'Abraham Valenzuela',
    event: 'Pedida de mano, Paquete Corazón Romance',
  },
  {
    id: 't2',
    quote:
      'La cabina no paró en toda la noche. Al día siguiente mis tías ya tenían su video subido.',
    name: 'Mariana Quintero',
    event: 'Boda, Paquete Amor Eterno',
  },
  {
    id: 't3',
    quote:
      'El humo azul salió justo cuando prendieron los chisperos. Esa foto la tenemos enmarcada.',
    name: 'Ivette Carrillo',
    event: 'Revelación de género, Paquete Hecho con Amor',
  },
]

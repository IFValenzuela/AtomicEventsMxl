/**
 * Atomic Events - global site data.
 *
 * Everything a non-developer might need to change lives in src/data. Phone
 * numbers, nav labels, social URLs and every photo path are here, not in JSX.
 */

/** A photograph the site expects but does not have yet.
 *
 *  `src` is where the real file goes. Drop a JPG at that exact path under
 *  `public/` and it replaces the placeholder automatically, with no code
 *  change (see src/components/ui/Photo.tsx).
 *
 *  `alt`     describes the real photograph, for screen readers.
 *  `caption` is shown inside the placeholder, so the shot list is visible
 *            on the page itself while the photos are pending.
 */
export type Photo = {
  src: string
  alt: string
  caption: string
  ratio: Ratio
}

export type Ratio = '21/9' | '16/9' | '3/2' | '4/3' | '1/1' | '3/4' | '4/5'

export const BRAND = {
  name: 'Atomic Events',
  tagline: 'Momentos que se cuentan durante años',
  city: 'Mexicali, Baja California',
  country: 'México',
  /** White script. Use over a photograph or on navy. */
  wordmark: '/assets/brand/atomic-wordmark.png',
  wordmark2x: '/assets/brand/atomic-wordmark-2x.png',
  /**
   * The same artwork with the white script recoloured to navy, for the white
   * page. The star and the shutter keep their colours. Regenerate it from
   * Logo2.png if the logo ever changes; it is not redrawn, only recoloured.
   */
  wordmarkNavy: '/assets/brand/atomic-wordmark-navy.png',
  wordmarkNavy2x: '/assets/brand/atomic-wordmark-navy-2x.png',
  /** The circular badge, used as the seal in the header and footer. */
  badge: '/assets/brand/atomic-badge-512.png',
} as const

export const CONTACT = {
  phones: [
    { display: '(686) 143 6523', tel: '+526861436523' },
    { display: '(686) 188 9205', tel: '+526861889205' },
  ],
  /** Built from the first number above. wa.me wants country code + 10 digits. */
  whatsapp: 'https://wa.me/526861436523',
  whatsappMessage:
    'Hola Atomic Events, me gustaría cotizar un evento.',
  area: 'Mexicali y valle de Mexicali',
} as const

/** Primary navigation. Kept to five items so the bar stays on one line. */
export const NAV = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Paquetes', href: '/paquetes' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
] as const

/**
 * Social profiles. Leave `url` empty and the footer renders a muted,
 * non-clickable chip instead of a dead link. Paste the real profile URL in
 * and it becomes a working link.
 */
export const SOCIALS: { name: string; url: string }[] = [
  { name: 'WhatsApp', url: CONTACT.whatsapp },
  { name: 'Instagram', url: 'https://www.instagram.com/atomic.eventsmxli/' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100076638574715' },
]

/**
 * Call-to-action labels. Two scopes, each used with total consistency:
 *   QUOTE   - the site-wide ask. Header, hero, closing band.
 *   PACKAGE - the package-scoped ask. Only ever on a package card, and it
 *             always carries the package name into the contact form.
 */
export const CTA = {
  quote: 'Cotiza tu evento',
  package: 'Solicitar cotización',
  more: 'Ver más',
  price: 'Precio a cotizar',
} as const

/**
 * The home hero photograph.
 *
 * Its own slot rather than the lead occasion's, so the opening shot of the
 * site can be chosen independently of what the propuestas page uses.
 *
 * It is displayed in the full viewport with object-cover, so the crop swings
 * from the whole frame on a wide desktop to roughly the middle quarter of the
 * width on a phone. Keep the subject centred, and keep anything that matters
 * clear of the top 256px and the bottom 288px, where the two gradients and the
 * button sit.
 */
export const HOME_HERO: Photo = {
  src: '/assets/images/hero/Hero.jpg',
  alt: 'Pedida de mano de noche sobre un muelle: el novio de rodillas frente a las letras iluminadas "CÁSATE CONMIGO", con chisperos encendidos detrás y un camino de pétalos de rosa al frente.',
  caption: 'Pedida de mano con letras "CÁSATE CONMIGO" y chisperos',
  ratio: '16/9',
}

/**
 * Optional video for the home hero.
 *
 * When a path is set the home hero plays it, muted and looping, over
 * HOME_HERO as the poster. If it is null, or the visitor prefers reduced
 * motion, the photograph is used on its own and nothing is downloaded.
 *
 * Currently off: the hero is the photograph. The clip that was here was
 * 2160x3840 at 47.8 Mbps — 99 MB, and vertical, so a desktop only ever saw
 * about a third of its height. If a video comes back, it wants to be
 * 1920x1080, H.264, no audio track, around 3 Mbps and 6 MB.
 */
export const HERO_VIDEO: string | null = null

/**
 * Header photographs for the pages that are not an occasion. Occasion pages
 * use their own `hero` from src/data/occasions.ts.
 */
export const PAGE_HEROES: Record<
  'servicios' | 'paquetes' | 'galeria' | 'contacto',
  Photo
> = {
  servicios: {
    src: '/assets/images/hero/servicios.jpg',
    alt: 'Salón montado por Atomic Events con letras iluminadas, arco de globos y la cabina 360° encendida antes de que lleguen los invitados.',
    caption: 'Montaje completo: letras, globos y cabina 360°',
    ratio: '21/9',
  },
  paquetes: {
    src: '/assets/images/hero/paquetes.jpg',
    alt: 'Chisperos encendidos a ambos lados de una alfombra roja que lleva hasta unas letras gigantes iluminadas.',
    caption: 'Chisperos y alfombra roja hacia las letras',
    ratio: '21/9',
  },
  galeria: {
    src: '/assets/images/hero/galeria.jpg',
    alt: 'Invitados riéndose dentro de la cabina 360° mientras las luces de colores giran a su alrededor.',
    caption: 'Invitados en la cabina, luces girando',
    ratio: '21/9',
  },
  contacto: {
    src: '/assets/images/hero/contacto.jpg',
    alt: 'Detalle nocturno de velas encendidas y pétalos de rosas sobre el piso, con las luces del montaje desenfocadas al fondo.',
    caption: 'Velas y pétalos, detalle nocturno',
    ratio: '21/9',
  },
}

export const TRUST = [
  { value: 'Mexicali', label: 'y todo el valle' },
  { value: 'Montaje', label: 'y logística incluidos' },
  { value: '30 min', label: 'de regalo en cabina 360°' },
] as const

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
  /**
   * Where the contact form's quote requests are emailed, through FormSubmit
   * (formsubmit.co). Empty for now: until an address is set here the form
   * says it cannot send and points to WhatsApp and the phones instead.
   *
   * After filling it in, send one test request from the live site. FormSubmit
   * emails this address a one-time confirmation link, and nothing is
   * delivered until it has been clicked.
   */
  formEmail: '',
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
 * The photograph behind the closing ask.
 *
 * It runs full-bleed with nothing laid over it: no tint, no scrim, no reduced
 * opacity. The picture is the band.
 *
 * Legibility is handled on the type instead. Measured across the visible strip
 * of this photograph, white text scores 20:1 over the dark pier at the edges
 * and 4.3:1 at worst over the lit letters in the middle, so the copy carries a
 * drop-shadow rather than the picture carrying a veil.
 */
export const CLOSING_PHOTO: Photo = {
  src: '/assets/images/hero/Hero.jpg',
  alt: '',
  caption: 'Pedida de mano de noche, letras iluminadas y chisperos',
  ratio: '16/9',
}

/**
 * The home hero video, and it is a PHONE video specifically.
 *
 * The footage is shot vertical, which is the wrong crop for a desktop: a 16:9
 * viewport shows about a third of a 9:16 frame's height, so you get a
 * horizontal slice of a vertical video. On a phone it is exactly the right
 * crop, so this plays below 1024px and a desktop never downloads it at all.
 *
 * The source was 2160x3840 at 47.8 Mbps, which is 99 MB and unplayable on
 * Mexicali cellular. Re-encoded to 1080x1920, H.264 high, CRF 28, no audio
 * track, faststart. Same 16.57 seconds, 3.9 MB. The original is kept in
 * assets-src/hero/ and the command that produced this is in README.
 *
 * Set to null to go back to the photograph alone.
 */
export const HERO_VIDEO: string | null = '/assets/images/hero/hero-portrait.mp4'

/**
 * A frame pulled from that video rather than a separate photograph, so the
 * poster and the first frame of playback are the same picture and the
 * hand-off is invisible.
 */
export const HERO_VIDEO_POSTER = '/assets/images/hero/hero-portrait.jpg'

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

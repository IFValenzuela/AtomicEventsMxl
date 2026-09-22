/**
 * The Instagram strip above the pre-footer frieze.
 *
 * Five slots, same contract as every other photo on the site: drop a real JPG
 * at the `src` path under `public/` and the tile switches from placeholder to
 * photograph on its own. Nothing in the markup needs to know.
 *
 * These are hand-picked stills, not a live feed. The reference runs a
 * third-party widget that pulls the real Instagram grid; doing that here would
 * mean a script from someone else's domain on every page, a Meta API token to
 * keep alive, and a block of the layout that can be empty or broken on a day
 * the API is down. Five curated files cost nothing and never break — and for
 * an events business the best five shots are a better shop window than the
 * most recent five anyway.
 *
 * `url` points at the specific post when you have it. Leave it out and the
 * tile links to the profile.
 */

import type { Photo } from './site'

export type InstagramPost = Photo & { url?: string }

export const INSTAGRAM: InstagramPost[] = [
  {
    src: '/assets/images/instagram/01.jpg',
    alt: 'Novios entrando al salón bajo una lluvia de chispas frías.',
    caption: 'Entrada de novios con chisperos',
    ratio: '4/5',
  },
  {
    src: '/assets/images/instagram/02.jpg',
    alt: 'Invitados posando dentro de la cabina 360° con accesorios de fiesta.',
    caption: 'Cabina 360° en plena fiesta',
    ratio: '4/5',
  },
  {
    src: '/assets/images/instagram/03.jpg',
    alt: 'Letras gigantes iluminadas montadas en la entrada de un salón de noche.',
    caption: 'Letras iluminadas en la entrada',
    ratio: '4/5',
  },
  {
    src: '/assets/images/instagram/04.jpg',
    alt: 'Corazón de pétalos de rosas con velas encendidas alrededor.',
    caption: 'Corazón de pétalos y velas',
    ratio: '4/5',
  },
  {
    src: '/assets/images/instagram/05.jpg',
    alt: 'Quinceañera posando frente a las letras "XV" iluminadas.',
    caption: 'Quinceañera frente a las letras "XV"',
    ratio: '4/5',
  },
]

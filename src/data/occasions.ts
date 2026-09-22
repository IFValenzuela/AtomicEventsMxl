/**
 * Every package Atomic Events sells, transcribed from the promo flyers.
 *
 * The flyer JPGs in the project root are Instagram artwork and are never
 * embedded on the site. Their text lives here; the photographs they showed
 * are `Photo` entries awaiting real files.
 *
 * No prices. Nothing on this site quotes a number until Atomic supplies one.
 */

import type { Photo } from './site'

export type Pkg = {
  id: string
  name: string
  /** Sits under the name, e.g. the flyer's "Tu gran día". */
  subtitle?: string
  /** Tier rating as printed on the flyer. Omit where the flyer had none. */
  stars?: number
  starsOf?: number
  /** The flagship. Exactly one per occasion, at most. */
  featured?: boolean
  duration: string
  features: string[]
  /** Small print from the flyer, e.g. which letters unlock the spray. */
  note?: string
  photo: Photo
}

export type Occasion = {
  slug: string
  /** Short label for cards and breadcrumbs. */
  nav: string
  /** Page H1. */
  title: string
  /** The phrase the flyers lead with, when there is one. */
  kicker?: string
  /** One sentence for hub cards and the home page teaser rows. */
  blurb: string
  /** Opening paragraph on the occasion page. */
  lead: string
  /** Inclusions shared by every package in the occasion. */
  includes?: { title: string; items: string[] }
  /** Promotional lines printed on the flyer. */
  promos?: string[]
  packages: Pkg[]
  hero: Photo
  /** Teaser image for the home page row and the packages hub. */
  photo: Photo
}

export const OCCASIONS: Occasion[] = [
  {
    slug: 'propuestas',
    nav: 'Pedidas de mano',
    title: 'Pedidas de mano',
    kicker: '¿Quieres ser mi novia?',
    blurb:
      'Corazón de pétalos, letrero de neón, chisperos y camino de velas. Montamos todo antes de que llegue.',
    lead: 'Abre la puerta y ya está todo puesto: el corazón de pétalos armado, las velas encendidas y el letrero de neón esperando la respuesta. Nosotros llegamos antes, montamos y nos hacemos a un lado. Tú solo preguntas.',
    packages: [
      {
        id: 'corazon-romance',
        name: 'Paquete Corazón Romance',
        subtitle: 'Nuestro paquete estrella',
        stars: 5,
        starsOf: 5,
        featured: true,
        duration: 'El tiempo que necesites',
        features: [
          'Corazón de pétalos de rosas',
          'Letrero de neón "¿Quieres ser mi novia?"',
          '2 máquinas chisperas',
          'Camino de velas',
          'Camino de pétalos',
          'Iluminación con luces RGB',
        ],
        note: 'Incluye las iniciales de los novios.',
        photo: {
          src: '/assets/images/packages/propuestas/corazon-romance.jpg',
          alt: 'Corazón de pétalos de rosas iluminado con luces RGB, con el letrero de neón "¿Quieres ser mi novia?" al centro y un camino de velas al frente.',
          caption: 'Corazón de pétalos con letrero de neón encendido',
          ratio: '4/3',
        },
      },
      {
        id: 'bronce',
        name: 'Paquete Bronce',
        stars: 1,
        starsOf: 3,
        duration: 'El tiempo que necesites',
        features: [
          'Camino de velas',
          'Las letras "Quieres ser mi novia"',
          'Montaje y logística',
        ],
        photo: {
          src: '/assets/images/packages/propuestas/bronce.jpg',
          alt: 'Camino de velas encendidas que lleva hasta las letras iluminadas "Quieres ser mi novia".',
          caption: 'Camino de velas hacia las letras iluminadas',
          ratio: '4/3',
        },
      },
      {
        id: 'plata',
        name: 'Paquete Plata',
        stars: 2,
        starsOf: 3,
        duration: 'El tiempo que necesites',
        features: [
          '3 chisperos',
          'Pétalos de rosas',
          'Camino de velas',
          'Montaje y logística',
        ],
        photo: {
          src: '/assets/images/packages/propuestas/plata.jpg',
          alt: 'Tres chisperos encendidos a los costados de un camino de velas y pétalos de rosas durante una pedida de mano.',
          caption: 'Chisperos encendidos sobre el camino de pétalos',
          ratio: '4/3',
        },
      },
      {
        id: 'oro',
        name: 'Paquete Oro',
        stars: 3,
        starsOf: 3,
        duration: 'El tiempo que necesites',
        features: [
          '6 chisperos',
          'Alfombra roja',
          'Camino de velas',
          'Camino de pétalos de rosas',
          'Corazón de pétalos de rosas',
          'Globos',
          'Montaje y logística',
        ],
        photo: {
          src: '/assets/images/packages/propuestas/oro.jpg',
          alt: 'Alfombra roja con camino de velas, globos y seis chisperos encendidos alrededor de un corazón de pétalos de rosas.',
          caption: 'Alfombra roja, globos y seis chisperos',
          ratio: '4/3',
        },
      },
    ],
    hero: {
      src: '/assets/images/hero/propuestas.jpg',
      alt: 'Pareja abrazándose dentro de un corazón de pétalos de rosas rodeado de velas, con chisperos encendidos al fondo.',
      caption: 'Pareja dentro del corazón de pétalos, chisperos al fondo',
      ratio: '21/9',
    },
    photo: {
      src: '/assets/images/packages/propuestas/teaser.jpg',
      alt: 'Montaje completo de una pedida de mano al aire libre: corazón de pétalos, velas y letrero de neón encendido de noche.',
      caption: 'Montaje completo de pedida, de noche',
      ratio: '4/5',
    },
  },

  {
    slug: 'cabina-360',
    nav: 'Cabina 360°',
    title: 'Cabina de fotos 360°',
    kicker: 'Servicio base para todo tipo de evento',
    blurb:
      'Plataforma motorizada, alfombra roja y accesorios. El video queda en su celular antes de que se bajen.',
    lead: 'La plataforma gira, las luces prenden y el video sale listo para subir. Tus invitados no esperan ni se van con las manos vacías: reciben su video en el momento. Funciona igual de bien en una boda, en unos XV o en un baby shower.',
    includes: {
      title: 'Todos los paquetes incluyen',
      items: [
        'Plataforma motorizada',
        'Calidad y estabilidad en video',
        'Alfombra roja tipo Hollywood',
        'Luces para iluminación profesional',
        'Accesorios: sombreros, máscaras, pistola de dinero, máquina de humo, letreros de fiesta y máquina de burbujas',
      ],
    },
    promos: [
      'Por promoción, en la contratación de cualquiera de nuestros paquetes llévate 30 min. completamente GRATIS.',
      'Tus invitados obtienen el video en el momento.',
    ],
    packages: [
      {
        id: 'bronce',
        name: 'Paquete Bronce',
        stars: 1,
        starsOf: 3,
        duration: '1 hora',
        features: [],
        photo: {
          src: '/assets/images/packages/cabina-360/bronce.jpg',
          alt: 'Invitados subidos a la plataforma giratoria de la cabina 360° mientras el brazo con la cámara gira alrededor.',
          caption: 'Invitados en la plataforma giratoria',
          ratio: '4/3',
        },
      },
      {
        id: 'plata',
        name: 'Paquete Plata',
        stars: 2,
        starsOf: 3,
        duration: '2 horas',
        features: [],
        photo: {
          src: '/assets/images/packages/cabina-360/plata.jpg',
          alt: 'Grupo de invitados posando con sombreros y letreros de fiesta sobre la alfombra roja de la cabina 360°.',
          caption: 'Accesorios de fiesta sobre la alfombra roja',
          ratio: '4/3',
        },
      },
      {
        id: 'oro',
        name: 'Paquete Oro',
        stars: 3,
        starsOf: 3,
        duration: '3 horas',
        features: [],
        photo: {
          src: '/assets/images/packages/cabina-360/oro.jpg',
          alt: 'Cabina 360° en plena fiesta, con máquina de humo encendida y luces de colores iluminando a los invitados.',
          caption: 'Cabina 360° con máquina de humo en la pista',
          ratio: '4/3',
        },
      },
    ],
    hero: {
      src: '/assets/images/hero/cabina-360.jpg',
      alt: 'Cabina de fotos 360° montada en un salón, con la plataforma iluminada y la alfombra roja extendida al frente.',
      caption: 'Cabina 360° montada y lista, alfombra roja al frente',
      ratio: '21/9',
    },
    photo: {
      src: '/assets/images/packages/cabina-360/teaser.jpg',
      alt: 'Vista cercana del brazo motorizado de la cabina 360° girando alrededor de dos invitados que levantan los brazos.',
      caption: 'Brazo motorizado girando sobre los invitados',
      ratio: '4/5',
    },
  },

  {
    slug: 'baby-shower',
    nav: 'Baby shower',
    title: 'Baby shower y revelación de género',
    kicker: 'Letras iluminadas "BABY" y "OH BABY"',
    blurb:
      'Letras iluminadas, chisperos, spray de revelación y video con dron para la toma desde arriba.',
    lead: 'El humo sale rosa o azul, los chisperos prenden al mismo tiempo y las letras iluminan la foto que van a enseñar toda la vida. Montamos desde antes y nos quedamos el evento completo.',
    packages: [
      {
        id: 'bienvenida-al-mundo',
        name: 'Paquete Bienvenida al Mundo',
        stars: 1,
        starsOf: 4,
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas "BABY" o "OH BABY"',
          '4 chisperos',
          '2 spray de revelación de género',
        ],
        note: 'El spray de revelación aplica solo en la compra de las letras "OH BABY".',
        photo: {
          src: '/assets/images/packages/baby-shower/bienvenida-al-mundo.jpg',
          alt: 'Letras gigantes iluminadas "OH BABY" encendidas de noche con cuatro chisperos prendidos al frente.',
          caption: 'Letras "OH BABY" encendidas con chisperos',
          ratio: '4/3',
        },
      },
      {
        id: 'explosion-de-amor',
        name: 'Paquete Explosión de Amor',
        stars: 2,
        starsOf: 4,
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas "BABY" o "OH BABY"',
          '4 chisperos',
          '2 spray de revelación de género',
          'Decoración incluida con globos',
        ],
        note: 'El spray de revelación aplica en la compra de las letras "BABY" y "OH BABY".',
        photo: {
          src: '/assets/images/packages/baby-shower/explosion-de-amor.jpg',
          alt: 'Arco de globos rosas y azules montado alrededor de las letras iluminadas "BABY" en un jardín.',
          caption: 'Arco de globos alrededor de las letras "BABY"',
          ratio: '4/3',
        },
      },
      {
        id: 'hecho-con-amor',
        name: 'Paquete Hecho con Amor',
        stars: 3,
        starsOf: 4,
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas "BABY" o "OH BABY"',
          '4 chisperos',
          '2 spray de revelación de género',
          '2 cohetes de 25 tiros',
          'Video con dron',
        ],
        photo: {
          src: '/assets/images/packages/baby-shower/hecho-con-amor.jpg',
          alt: 'Momento de la revelación de género con humo azul saliendo del spray mientras los cohetes estallan al fondo.',
          caption: 'Revelación con humo de color y cohetes',
          ratio: '4/3',
        },
      },
      {
        id: 'destellos-rosas-y-azules',
        name: 'Paquete Destellos Rosas y Azules',
        stars: 4,
        starsOf: 4,
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas "BABY" o "OH BABY"',
          '4 chisperos',
          '2 spray de revelación de género',
          '2 cohetes de 25 tiros',
          'Video con dron',
          'Decoración incluida',
        ],
        photo: {
          src: '/assets/images/packages/baby-shower/destellos-rosas-y-azules.jpg',
          alt: 'Toma aérea desde el dron de la familia reunida alrededor de las letras iluminadas mientras estallan los cohetes.',
          caption: 'Toma aérea del dron durante la revelación',
          ratio: '4/3',
        },
      },
    ],
    hero: {
      src: '/assets/images/hero/baby-shower.jpg',
      alt: 'Letras gigantes iluminadas "OH BABY" al centro de un jardín decorado con globos rosas y azules durante una revelación de género.',
      caption: 'Letras "OH BABY" y globos en la revelación',
      ratio: '21/9',
    },
    photo: {
      src: '/assets/images/packages/baby-shower/teaser.jpg',
      alt: 'Pareja de futuros papás frente a las letras iluminadas "OH BABY" con humo rosa alrededor.',
      caption: 'Futuros papás frente a las letras iluminadas',
      ratio: '4/5',
    },
  },

  {
    slug: 'bodas',
    nav: 'Bodas',
    title: 'Bodas',
    blurb:
      'Cabina 360°, 200 shots, chisperos, letras iluminadas y selfie espejo para la noche completa.',
    lead: 'Un solo paquete que cubre la pista de principio a fin: la cabina girando toda la noche, los chisperos listos para el vals y las letras encendidas para la foto de grupo. Ustedes bailan, nosotros nos encargamos del resto.',
    packages: [
      {
        id: 'amor-eterno',
        name: 'Paquete Amor Eterno',
        subtitle: 'Tu gran día',
        featured: true,
        duration: '2:30 horas de cabina 360°',
        features: [
          'Cabina de fotos 360° con duración de 2:30 horas',
          '200 shots',
          '4 chisperos',
          'Letras iluminadas "Iniciales" o "LOVE"',
          'Selfie espejo',
        ],
        photo: {
          src: '/assets/images/packages/bodas/amor-eterno.jpg',
          alt: 'Novios bailando el vals entre cuatro chisperos encendidos, con las letras iluminadas "LOVE" al fondo del salón.',
          caption: 'Vals de los novios entre chisperos, letras "LOVE" al fondo',
          ratio: '4/3',
        },
      },
    ],
    hero: {
      src: '/assets/images/hero/bodas.jpg',
      alt: 'Novios entrando al salón bajo una lluvia de chispas frías mientras los invitados aplauden.',
      caption: 'Entrada de los novios bajo los chisperos',
      ratio: '21/9',
    },
    photo: {
      src: '/assets/images/packages/bodas/teaser.jpg',
      alt: 'Invitados de una boda formados frente al selfie espejo, tomándose una foto con accesorios.',
      caption: 'Invitados en el selfie espejo',
      ratio: '4/5',
    },
  },

  {
    slug: 'xv-anos',
    nav: 'XV años',
    title: 'XV años',
    blurb:
      'Cabina 360°, 200 shots, chisperos, letras XV y selfie espejo. Las letras "XV" van de regalo.',
    lead: 'Del vals a la última canción. La cabina girando, los chisperos en la entrada y las letras encendidas para la foto que va a abrir el álbum. Al rentar tus letras, las "XV" van de regalo.',
    packages: [
      {
        id: 'quinceanera-de-gala',
        name: 'Paquete Quinceañera de Gala',
        featured: true,
        duration: '2:30 horas de cabina 360°',
        features: [
          'Cabina de fotos 360° con duración de 2:30 horas',
          '200 shots',
          '4 chisperos',
          'De 3 a 6 letras, con las letras "XV" de regalo',
          'De 6 a 10 letras, con las letras "XV" de regalo',
          'Selfie espejo',
        ],
        photo: {
          src: '/assets/images/packages/xv-anos/quinceanera-de-gala.jpg',
          alt: 'Quinceañera con vestido largo posando frente a las letras gigantes iluminadas "XV" mientras los chisperos encienden a los lados.',
          caption: 'Quinceañera frente a las letras "XV" iluminadas',
          ratio: '4/3',
        },
      },
    ],
    hero: {
      src: '/assets/images/hero/xv-anos.jpg',
      alt: 'Quinceañera bailando el vals rodeada de chisperos encendidos, con las letras iluminadas "XV" detrás.',
      caption: 'Vals de la quinceañera entre chisperos',
      ratio: '21/9',
    },
    photo: {
      src: '/assets/images/packages/xv-anos/teaser.jpg',
      alt: 'Letras gigantes iluminadas "XV" encendidas de noche en la entrada del salón.',
      caption: 'Letras "XV" iluminadas en la entrada',
      ratio: '4/5',
    },
  },
]

export const byslug = (slug?: string): Occasion | undefined =>
  OCCASIONS.find((o) => o.slug === slug)

/** The occasion the home page leads with. */
export const LEAD_OCCASION = 'propuestas'

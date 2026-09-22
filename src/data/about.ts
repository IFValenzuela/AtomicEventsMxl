import type { Photo } from './site'

export const ABOUT = {
  title: 'Somos de Mexicali y armamos la fiesta que nos gustaría que nos armaran',
  lead: 'Atomic Events empezó con una idea simple: que el día de tu evento no tengas que estar viendo si ya llegó la decoración, si prenden las luces o quién va a grabar. De eso nos encargamos nosotros.',
  body: 'Trabajamos pedidas de mano, revelaciones de género, XV años y bodas en Mexicali y el valle. Montamos desde temprano, operamos todo durante el evento y recogemos cuando termina. Tú llegas a celebrar.',

  /** Three promises, not three "stages". Each is something Atomic does. */
  promises: [
    {
      id: 'antes',
      title: 'Llegamos antes',
      body: 'Montamos, probamos las luces y dejamos todo listo antes de que llegue el primer invitado.',
    },
    {
      id: 'durante',
      title: 'Nos quedamos el evento completo',
      body: 'Alguien de nosotros opera la cabina, los chisperos y el dron mientras tú estás en la fiesta.',
    },
    {
      id: 'despues',
      title: 'Todos se van con su video',
      body: 'Tus invitados reciben el video en el momento, sin esperar a que se lo mandes después.',
    },
  ],

  photo: {
    src: '/assets/images/nosotros/equipo.jpg',
    alt: 'Equipo de Atomic Events montando la cabina 360° y las letras iluminadas en un salón antes de que empiece el evento.',
    caption: 'El equipo montando antes del evento',
    ratio: '4/3',
  } satisfies Photo,

  hero: {
    src: '/assets/images/hero/nosotros.jpg',
    alt: 'Vista general de un salón de Mexicali ya montado por Atomic Events, con letras iluminadas, globos y la cabina 360° lista.',
    caption: 'Salón montado y listo, antes de abrir puertas',
    ratio: '21/9',
  } satisfies Photo,

  detail: [
    {
      src: '/assets/images/nosotros/montaje.jpg',
      alt: 'Detalle de manos acomodando pétalos de rosas para formar un corazón sobre el piso de un jardín.',
      caption: 'Acomodando los pétalos a mano',
      ratio: '1/1',
    },
    {
      src: '/assets/images/nosotros/luces.jpg',
      alt: 'Prueba de las luces RGB sobre las letras iluminadas antes de que lleguen los invitados.',
      caption: 'Prueba de luces antes de abrir',
      ratio: '1/1',
    },
  ] satisfies Photo[],
} as const

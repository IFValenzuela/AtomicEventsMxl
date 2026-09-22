/** The six things Atomic Events brings to an event. */

import type { Photo } from './site'

/** Key into the icon map in src/components/ui/ServiceIcon.tsx. */
export type ServiceIconName =
  | 'camera'
  | 'letters'
  | 'sparks'
  | 'petals'
  | 'drone'
  | 'balloons'

export type Service = {
  id: string
  icon: ServiceIconName
  name: string
  blurb: string
  /** Where this service is sold, if it maps to an occasion page. */
  href?: string
  photo: Photo
}

export const SERVICES: Service[] = [
  {
    id: 'cabina-360',
    icon: 'camera',
    name: 'Cabina de fotos 360°',
    blurb:
      'Plataforma motorizada, alfombra roja y accesorios. El video llega a su celular en el momento.',
    href: '/paquetes/cabina-360',
    photo: {
      src: '/assets/images/servicios/cabina-360.jpg',
      alt: 'Cabina de fotos 360° con la plataforma encendida y el brazo de la cámara girando alrededor de dos invitados.',
      caption: 'Cabina 360° en uso',
      ratio: '3/4',
    },
  },
  {
    id: 'letras',
    icon: 'letters',
    name: 'Letras gigantes iluminadas',
    blurb:
      'Iniciales, "LOVE", "XV", "BABY" y "OH BABY". Encendidas todo el evento y listas para la foto de grupo.',
    photo: {
      src: '/assets/images/servicios/letras.jpg',
      alt: 'Letras gigantes iluminadas formando la palabra LOVE en la entrada de un salón de fiestas de noche.',
      caption: 'Letras iluminadas montadas en el salón',
      ratio: '3/4',
    },
  },
  {
    id: 'chisperos',
    icon: 'sparks',
    name: 'Chisperos',
    blurb:
      'Fuentes de chispas frías para la entrada, el vals o el brindis. Seguras en interiores.',
    photo: {
      src: '/assets/images/servicios/chisperos.jpg',
      alt: 'Cuatro fuentes de chispas frías encendidas al mismo tiempo mientras una pareja camina entre ellas.',
      caption: 'Fuentes de chispas frías encendidas',
      ratio: '3/4',
    },
  },
  {
    id: 'petalos',
    icon: 'petals',
    name: 'Camino de pétalos y velas',
    blurb:
      'Corazones, caminos y alfombra roja. Montamos antes de que llegue el primer invitado.',
    href: '/paquetes/propuestas',
    photo: {
      src: '/assets/images/servicios/petalos.jpg',
      alt: 'Camino de pétalos de rosas rojas flanqueado por velas encendidas que lleva hasta un corazón de pétalos.',
      caption: 'Camino de pétalos y velas encendidas',
      ratio: '3/4',
    },
  },
  {
    id: 'dron',
    icon: 'drone',
    name: 'Video con dron',
    blurb:
      'La toma desde arriba del momento clave, cuando todos están reunidos y estalla el color.',
    photo: {
      src: '/assets/images/servicios/dron.jpg',
      alt: 'Toma aérea captada con dron de un grupo de invitados reunidos en círculo durante una revelación de género.',
      caption: 'Toma aérea del dron sobre el evento',
      ratio: '3/4',
    },
  },
  {
    id: 'globos',
    icon: 'balloons',
    name: 'Decoración con globos',
    blurb:
      'Arcos, columnas y fondos armados en sitio, a juego con los colores de tu evento.',
    photo: {
      src: '/assets/images/servicios/globos.jpg',
      alt: 'Arco orgánico de globos en tonos rosa y azul montado como fondo de la mesa principal de un baby shower.',
      caption: 'Arco de globos montado en sitio',
      ratio: '3/4',
    },
  },
]

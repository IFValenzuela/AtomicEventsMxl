/**
 * Gallery tiles. Every entry is a slot waiting for real event photography.
 *
 * Drop a file at the `src` path under `public/` and the tile switches from
 * placeholder to photograph on its own. To add a tile, copy an entry and
 * change the number; nothing in the markup needs to know.
 */

import type { Photo } from './site'

export type GalleryCategory = 'Bodas' | 'XV años' | 'Baby shower' | 'Propuestas'

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Bodas',
  'XV años',
  'Baby shower',
  'Propuestas',
]

export type GalleryItem = Photo & { category: GalleryCategory }

export const GALLERY: GalleryItem[] = [
  {
    category: 'Propuestas',
    src: '/assets/images/gallery/01.jpg',
    alt: 'Corazón de pétalos de rosas iluminado de noche con el letrero de neón encendido al centro.',
    caption: 'Corazón de pétalos con neón',
    ratio: '4/5',
  },
  {
    category: 'Bodas',
    src: '/assets/images/gallery/02.jpg',
    alt: 'Novios entrando al salón bajo una lluvia de chispas frías mientras los invitados aplauden.',
    caption: 'Entrada de novios con chisperos',
    ratio: '4/3',
  },
  {
    category: 'XV años',
    src: '/assets/images/gallery/03.jpg',
    alt: 'Quinceañera posando frente a las letras gigantes iluminadas "XV" en la entrada del salón.',
    caption: 'Quinceañera y letras "XV"',
    ratio: '4/5',
  },
  {
    category: 'Baby shower',
    src: '/assets/images/gallery/04.jpg',
    alt: 'Letras iluminadas "OH BABY" rodeadas de globos rosas y azules durante una revelación de género.',
    caption: 'Letras "OH BABY" con globos',
    ratio: '4/3',
  },
  {
    category: 'Bodas',
    src: '/assets/images/gallery/05.jpg',
    alt: 'Invitados de una boda subidos a la plataforma de la cabina 360° con accesorios de fiesta.',
    caption: 'Cabina 360° en una boda',
    ratio: '4/3',
  },
  {
    category: 'Baby shower',
    src: '/assets/images/gallery/06.jpg',
    alt: 'Momento exacto de la revelación de género con humo azul saliendo del spray entre los papás.',
    caption: 'El momento de la revelación',
    ratio: '4/5',
  },
  {
    category: 'Propuestas',
    src: '/assets/images/gallery/07.jpg',
    alt: 'Camino de velas encendidas sobre alfombra roja que lleva hasta un arco de globos.',
    caption: 'Camino de velas y alfombra roja',
    ratio: '4/3',
  },
  {
    category: 'XV años',
    src: '/assets/images/gallery/08.jpg',
    alt: 'Quinceañera bailando el vals con su chambelán mientras cuatro chisperos encienden alrededor de la pista.',
    caption: 'Vals entre chisperos',
    ratio: '4/3',
  },
  {
    category: 'Bodas',
    src: '/assets/images/gallery/09.jpg',
    alt: 'Invitada tomándose una foto en el selfie espejo decorado con las iniciales iluminadas de los novios.',
    caption: 'Selfie espejo con iniciales',
    ratio: '4/5',
  },
  {
    category: 'Baby shower',
    src: '/assets/images/gallery/10.jpg',
    alt: 'Toma aérea con dron de la familia reunida alrededor de las letras iluminadas al final de la revelación.',
    caption: 'Toma aérea del dron',
    ratio: '4/3',
  },
  {
    category: 'Propuestas',
    src: '/assets/images/gallery/11.jpg',
    alt: 'Pareja abrazándose dentro del corazón de pétalos justo después de la pedida de mano.',
    caption: 'El sí, dentro del corazón',
    ratio: '4/3',
  },
  {
    category: 'XV años',
    src: '/assets/images/gallery/12.jpg',
    alt: 'Grupo de amigas de la quinceañera posando en la cabina 360° con sombreros y letreros de fiesta.',
    caption: 'Amigas en la cabina 360°',
    ratio: '4/5',
  },
  {
    category: 'Bodas',
    src: '/assets/images/gallery/13.jpg',
    alt: 'Novios bailando su primer baile en la pista con luces cálidas colgando sobre ellos.',
    caption: 'Primer baile bajo las luces',
    ratio: '4/5',
  },
  {
    category: 'Bodas',
    src: '/assets/images/gallery/14.jpg',
    alt: 'Letras gigantes "LOVE" iluminadas a un lado de la pista durante la fiesta de boda.',
    caption: 'Letras "LOVE" junto a la pista',
    ratio: '4/3',
  },
  {
    category: 'Bodas',
    src: '/assets/images/gallery/15.jpg',
    alt: 'Novios brindando con copas de champaña mientras dos chisperos encienden detrás de ellos.',
    caption: 'Brindis con chisperos',
    ratio: '4/5',
  },
  {
    category: 'XV años',
    src: '/assets/images/gallery/16.jpg',
    alt: 'Quinceañera entrando al salón con su vestido de gala entre luces y humo bajo.',
    caption: 'Entrada de la quinceañera',
    ratio: '4/5',
  },
  {
    category: 'XV años',
    src: '/assets/images/gallery/17.jpg',
    alt: 'Pista de baile iluminada con humo bajo y los invitados bailando alrededor de la quinceañera.',
    caption: 'Pista con humo bajo',
    ratio: '4/3',
  },
  {
    category: 'XV años',
    src: '/assets/images/gallery/18.jpg',
    alt: 'Quinceañera con su corte de honor posando juntos para la foto de grupo.',
    caption: 'La corte de honor',
    ratio: '4/5',
  },
  {
    category: 'Baby shower',
    src: '/assets/images/gallery/19.jpg',
    alt: 'Mesa de postres decorada con globos en tonos pastel para el baby shower.',
    caption: 'Mesa de postres y globos',
    ratio: '4/3',
  },
  {
    category: 'Baby shower',
    src: '/assets/images/gallery/20.jpg',
    alt: 'Futuros papás abrazados mientras sale el humo de color que revela si es niño o niña.',
    caption: 'Los papás en la revelación',
    ratio: '4/5',
  },
  {
    category: 'Baby shower',
    src: '/assets/images/gallery/21.jpg',
    alt: 'Arco de globos en rosa, azul y blanco enmarcando la zona de fotos del baby shower.',
    caption: 'Arco de globos pastel',
    ratio: '4/5',
  },
  {
    category: 'Propuestas',
    src: '/assets/images/gallery/22.jpg',
    alt: 'Anillo de compromiso en su estuche abierto sobre pétalos de rosa roja.',
    caption: 'El anillo sobre los pétalos',
    ratio: '4/5',
  },
  {
    category: 'Propuestas',
    src: '/assets/images/gallery/23.jpg',
    alt: 'Velas encendidas y pétalos de rosa sobre el pasto al atardecer, listos para la pedida.',
    caption: 'Velas y pétalos al atardecer',
    ratio: '4/3',
  },
  {
    category: 'Propuestas',
    src: '/assets/images/gallery/24.jpg',
    alt: 'Pareja recién comprometida brindando con champaña junto al letrero de neón.',
    caption: 'El brindis después del sí',
    ratio: '4/3',
  },
]

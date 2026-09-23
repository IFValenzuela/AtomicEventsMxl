/**
 * The Instagram strip above the pre-footer frieze: five reels, shown the
 * reference's way, as bare photographs that open the post.
 *
 * `src` is the reel's cover, saved locally rather than hot-linked, because
 * Instagram's image addresses expire. To swap a reel, save its cover from
 *
 *   https://www.instagram.com/p/<code>/media/?size=l
 *
 * over the matching file, run `npm run images`, and update `url`, `likes`
 * and `text` (the post's caption, shown when the tile is hovered).
 *
 * `likes` is a snapshot taken when the cover was saved. It does not update on
 * its own: a live count would mean Instagram's API, a Meta token to keep
 * alive, and a script from their domain on the page. Refresh it when you
 * refresh the reel.
 */

import type { Photo } from './site'

export type InstagramPost = Photo & { url: string; likes: number; text: string }

export const INSTAGRAM: InstagramPost[] = [
  {
    src: '/assets/images/instagram/01.jpg',
    alt: 'Letras iluminadas "OH BABY" con un arco de globos azules y blancos al atardecer.',
    caption: 'Letras OH BABY con globos azules',
    ratio: '4/5',
    url: 'https://www.instagram.com/reel/DcKC1axRwuS/',
    likes: 36,
    text: 'It’s a girl 🩷‼️‼️‼️ Éxito en esta nueva etapa ✨‼️ Decoración de globos: @eventospersonalizadoslolita',
  },
  {
    src: '/assets/images/instagram/02.jpg',
    alt: 'Invitada posando de noche junto a las letras iluminadas de una pedida de mano.',
    caption: 'Pedida de mano, de noche',
    ratio: '4/5',
    url: 'https://www.instagram.com/reel/Dby7Y-Shm_i/',
    likes: 32,
    text: '🤣 Gracias a esta pareja que cooperó para el TikTok ✨‼️🥰 #mexicali 📍 #reel #humor',
  },
  {
    src: '/assets/images/instagram/03.jpg',
    alt: 'Pareja frente al letrero "Quieres ser mi novia" entre chisperos y fuegos artificiales.',
    caption: 'Pedida con chisperos y fuegos artificiales',
    ratio: '4/5',
    url: 'https://www.instagram.com/reel/DT04TSTEpcx/',
    likes: 70,
    text: 'Una persona especial merece una pedida especial 😮‍💨🩷‼️',
  },
  {
    src: '/assets/images/instagram/04.jpg',
    alt: 'Letras iluminadas "OH BABY" con globos blancos y negros, de noche.',
    caption: 'Letras OH BABY de noche',
    ratio: '4/5',
    url: 'https://www.instagram.com/reel/DRFw7eWkgo9/',
    likes: 58,
    text: 'Amamos ser parte de estos momentos. Éxito en esta nueva etapa acompañados de una hermosa princesa 🩷🩷',
  },
  {
    src: '/assets/images/instagram/05.jpg',
    alt: 'Pareja abrazada en una revelación de género con humo morado y globos blancos.',
    caption: 'Revelación de género con humo morado',
    ratio: '4/5',
    url: 'https://www.instagram.com/reel/DMbIoVdhLw2/',
    likes: 38,
    text: 'Gracias por hacernos parte de este momento, y éxito en esta nueva etapa que viene 🩷🩷🩷🥳 En Atomic Events hacemos de tu evento un momento inolvidable 🥳🥳 Servicio: 4 chisperos y abanico de cohetes (25 disparos)',
  },
]

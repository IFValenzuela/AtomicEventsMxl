/**
 * Regenerates FOTOS.md from the photo slots declared in src/data.
 *
 *   npm run shotlist
 *
 * Run it after adding or renaming any `photo` entry, so the list handed to a
 * photographer always matches what the site actually asks for.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const DATA = [
  'site.ts',
  'occasions.ts',
  'services.ts',
  'gallery.ts',
  'about.ts',
  'instagram.ts',
]

const SLOT =
  /src:\s*'(\/assets\/images\/[^']+)',\s*\n\s*alt:\s*'((?:[^'\\]|\\.)*)',\s*\n\s*caption:\s*'((?:[^'\\]|\\.)*)',\s*\n\s*ratio:\s*'([^']+)'/g

const slots = []
for (const file of DATA) {
  const text = readFileSync(new URL(`../src/data/${file}`, import.meta.url), 'utf8')
  for (const m of text.matchAll(SLOT)) {
    slots.push({ src: m[1], alt: m[2], caption: m[3], ratio: m[4] })
  }
}

slots.sort((a, b) => a.src.localeCompare(b.src))

/** Group by the folder under /assets/images/. */
const groups = new Map()
for (const slot of slots) {
  const key = slot.src.split('/').slice(3, -1).join('/')
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(slot)
}

const TITLES = {
  hero: 'Portadas de página (banda ancha, arriba de cada página)',
  'packages/propuestas': 'Paquetes: pedidas de mano',
  'packages/cabina-360': 'Paquetes: cabina 360°',
  'packages/baby-shower': 'Paquetes: baby shower y revelación',
  'packages/bodas': 'Paquetes: bodas',
  'packages/xv-anos': 'Paquetes: XV años',
  servicios: 'Servicios',
  gallery: 'Galería',
  nosotros: 'Nosotros',
}

const done = slots.filter((s) =>
  existsSync(new URL(`../public${s.src}`, import.meta.url)),
).length

const lines = [
  '# Fotos que faltan',
  '',
  'Lista generada desde el código. No la edites a mano: corre `npm run shotlist`.',
  '',
  `**${done} de ${slots.length} listas.**`,
  '',
  'Para poner una foto: guárdala en `public/` + la ruta exacta de la columna',
  '"Archivo", con ese mismo nombre. No hay que tocar nada de código. Si el',
  'archivo no existe, el sitio muestra el recuadro punteado con la descripción.',
  '',
  'La proporción es una guía para encuadrar. La foto se recorta al centro, así',
  'que deja aire alrededor de lo importante.',
  '',
]

for (const [key, items] of groups) {
  lines.push(`## ${TITLES[key] ?? key}`, '')
  lines.push('| Archivo | Proporción | Qué debe salir |')
  lines.push('| --- | --- | --- |')
  for (const s of items) {
    const mark = existsSync(new URL(`../public${s.src}`, import.meta.url)) ? ' ✅' : ''
    lines.push(`| \`${s.src}\`${mark} | ${s.ratio} | ${s.caption} |`)
  }
  lines.push('')
}

writeFileSync(new URL('../FOTOS.md', import.meta.url), lines.join('\n'))
console.log(`FOTOS.md: ${slots.length} slots, ${done} ya con foto.`)

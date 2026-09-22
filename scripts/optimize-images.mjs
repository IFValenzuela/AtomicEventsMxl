/**
 * Re-encodes and resizes every photograph under public/assets/images.
 *
 *   npm run images
 *
 * Run it after dropping new photographs in. It is safe to run repeatedly.
 *
 * Why this exists: the photographs arrived straight off a camera roll, six of
 * them at 2752x1536 and quality ~95, which is 2-3.5 MB each. Fifteen megabytes
 * of hero imagery made the browser take thirty seconds to paint a page and
 * would have cost a visitor on Mexicali cellular real money. At quality 82 the
 * same pictures are a fraction of that with no difference you can see.
 *
 * How it works, and why it is safe to re-run:
 *
 *   - The first time it sees a file it copies the untouched original into
 *     `assets-src/` at the repo root. That folder is outside `public/`, so it
 *     never ships, and it is the permanent source of truth.
 *   - Every run afterwards optimises FROM that original, never from its own
 *     output. Running it ten times gives the same result as running it once;
 *     quality never compounds downward.
 *   - If you ever want a photograph back at full resolution, it is in
 *     `assets-src/` at the path it came from.
 *
 * It writes the canonical path at a capped width plus a set of narrower
 * siblings (`Hero-1024.jpg` next to `Hero.jpg`), and records which widths
 * exist in src/data/imageVariants.json. Photo.tsx reads that manifest to build
 * a srcset, and falls back to a plain src for any file the manifest does not
 * know about, so a photograph dropped in without running this still renders.
 */

import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync, copyFileSync, existsSync, writeFileSync, unlinkSync } from 'node:fs'
import { join, relative, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC_IMAGES = join(ROOT, 'public/assets/images')
const ORIGINALS = join(ROOT, 'assets-src')
const MANIFEST = join(ROOT, 'src/data/imageVariants.json')

/** Quality 82 is the point where mozjpeg stops being distinguishable by eye. */
const QUALITY = 82

/**
 * Caps and ladders by role, from what the layout actually asks for.
 *
 * `hero` covers the full viewport, so it needs to survive a 2560 desktop.
 * Everything else renders in a column: a service tile is ~450 CSS px wide, a
 * gallery tile less, so 1200 already covers those at 2x on a large screen.
 */
const ROLES = [
  { match: /^hero\//, cap: 2560, widths: [640, 1024, 1536, 2048, 2560] },
  { match: /.*/, cap: 1200, widths: [400, 800, 1200] },
]

/** Left alone: already optimised by hand, and a palette PNG is not a photo. */
const SKIP = /^frieze\//

/**
 * Every generated rung lives here, and nothing else does.
 *
 * The first version of this script told its own output apart from real
 * photographs by name, excluding anything ending `-<digits>`. That is not
 * knowable from a filename: `Hero-1024.jpg` is a rung and `cabina-360.jpg` is
 * a photograph of a 360 booth, and the pattern cannot tell them apart. It
 * deleted the booth.
 *
 * A directory can be known. Sources live where the data files point; rungs
 * live under this folder and are skipped on the way back in, so the question
 * never has to be guessed again.
 */
const VARIANT_DIR = '_responsive'

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  )

const kb = (p) => Math.round(statSync(p).size / 1024)

async function main() {
  if (!existsSync(PUBLIC_IMAGES)) {
    console.error('No public/assets/images directory.')
    process.exit(1)
  }

  const files = walk(PUBLIC_IMAGES)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .map((f) => relative(PUBLIC_IMAGES, f))
    .filter((rel) => !SKIP.test(rel) && !rel.split(/[\\/]/).includes(VARIANT_DIR))
    .sort()

  const manifest = {}
  let before = 0
  let after = 0

  for (const rel of files) {
    const live = join(PUBLIC_IMAGES, rel)
    const original = join(ORIGINALS, rel)

    // First sight of this file: preserve it before touching anything.
    if (!existsSync(original)) {
      mkdirSync(dirname(original), { recursive: true })
      copyFileSync(live, original)
    }

    before += kb(original)

    const role = ROLES.find((r) => r.match.test(rel))
    const meta = await sharp(original).metadata()
    const isPng = extname(rel).toLowerCase() === '.png'
    const encode = (pipe) =>
      isPng ? pipe.png({ compressionLevel: 9, palette: true }) : pipe.jpeg({ quality: QUALITY, mozjpeg: true })

    /* Write an encode only when it actually saves bytes at the same pixel
       dimensions. Several of these photographs arrived already compressed
       harder than quality 82, and re-encoding them made them LARGER; the
       right answer for those is to leave the original alone. */
    const writeBest = async (out, width) => {
      const tmp = out + '.tmp'
      await encode(sharp(original).resize({ width, withoutEnlargement: true })).toFile(tmp)
      const sameSize = width >= meta.width
      if (sameSize && statSync(tmp).size >= statSync(original).size) {
        copyFileSync(original, out)
        unlinkSync(tmp)
        return { bytes: statSync(out).size, kept: true }
      }
      copyFileSync(tmp, out)
      unlinkSync(tmp)
      return { bytes: statSync(out).size, kept: false }
    }

    // The canonical path, capped. Never upscaled past what was shot.
    const capped = Math.min(role.cap, meta.width)
    const canonical = await writeBest(live, capped)

    // The narrower rungs the browser can choose instead, kept apart from the
    // photographs so a later run cannot mistake one for the other.
    const ext = extname(rel)
    const rungDir = join(PUBLIC_IMAGES, VARIANT_DIR, dirname(rel))
    mkdirSync(rungDir, { recursive: true })
    const rungStem = join(rungDir, basename(rel, ext))
    const widths = role.widths.filter((w) => w < meta.width)
    for (const w of widths) {
      await writeBest(`${rungStem}-${w}${ext}`, w)
    }

    /* The manifest records the public URL of every rung plus the canonical
       file, so Photo.tsx never has to reconstruct a path. */
    const url = (p) => '/assets/images/' + p.split('\\').join('/')
    const stemUrl = url(join(VARIANT_DIR, dirname(rel), basename(rel, ext)).split('\\').join('/'))
    manifest[url(rel)] = [
      ...widths.map((w) => ({ w, src: `${stemUrl}-${w}${ext}` })),
      { w: capped, src: url(rel) },
    ]
    after += kb(live)

    console.log(
      `${rel.padEnd(34)} ${String(kb(original)).padStart(5)} KB -> ${String(kb(live)).padStart(4)} KB` +
        (canonical.kept ? '  (kept: already smaller)' : '') +
        (widths.length ? `  + ${widths.join('/')}` : ''),
    )
  }

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

  /* `after` counts the canonical files only, because a browser downloads one
     width per photograph, never the whole ladder. The variants cost disk, not
     bandwidth. */
  console.log(
    `\n${files.length} photographs: ${(before / 1024).toFixed(1)} MB of originals ` +
      `-> ${(after / 1024).toFixed(1)} MB at full width, and far less than that ` +
      `on a phone, which picks a narrower rung.`,
  )
  console.log(`Untouched originals kept in assets-src/. Manifest: ${relative(ROOT, MANIFEST)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

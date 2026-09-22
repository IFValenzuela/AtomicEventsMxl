/**
 * The pre-footer frieze.
 *
 * The reference runs an unornamented page from top to bottom and then, once,
 * immediately above the footer, lets a hand-drawn panorama of its valley run
 * the full width of the viewport in a single hairline of the brand ink. That
 * one burst of illustration is what stops the minimalism reading as cold, and
 * it is the most transferable idea on the site.
 *
 * This is Atomic's version of it: gazebo, floral arch, the proposal on one
 * knee, balloons, the quinceañera, the 360 booth, the bar cart, and the
 * sierra behind all of it. Drawn by hand, printed in ink, never animated —
 * the reference's is static and animating it would cheapen it immediately.
 *
 * Source of truth is Footer.png at the repo root, drawn on transparency at
 * 4096x554. Nothing here is recoloured: the artwork's own ink already sits on
 * the page's navy, so the production files are straight downscales and the
 * drawing on the page is the drawing as exported. Regenerate all three widths
 * from that file if it changes.
 *
 * Palettised PNG, not WebP. At this size the artwork is markedly smaller as
 * an 8-bit PNG than as WebP — line-work on transparency has few enough
 * distinct values that a palette beats a photographic codec, and the palette
 * shows no banding on the hairlines. Do not "optimise" this to WebP.
 */
export function Frieze() {
  return (
    <div
      aria-hidden="true"
      /* Real air above it. The band before this one is usually the tinted
         closing band, and butting the drawing straight up against that edge
         makes the two read as one crowded unit. */
      className="relative z-[1] overflow-hidden bg-paper pt-16 lg:pt-28"
    >
      <img
        src="/assets/images/frieze/frieze-2048.png"
        /* Width descriptors, not 1x/2x. This image is always exactly as wide
           as the viewport, so the browser should choose on real CSS width
           times pixel ratio — a 2560px desktop at 1x needs the same file a
           1280px laptop at 2x does, and a DPR pair cannot express that. */
        srcSet="/assets/images/frieze/frieze-1280.png 1280w, /assets/images/frieze/frieze-2048.png 2048w, /assets/images/frieze/frieze-4096.png 4096w"
        sizes="100vw"
        alt=""
        width={4096}
        height={554}
        loading="lazy"
        decoding="async"
        /* Full-bleed at its natural 7.39:1 from lg up. On a phone that ratio
           collapses to about 53px of height and the line-work turns to noise,
           so below lg it is held at a readable height and centred — you lose
           the ends of the panorama and keep the part worth seeing. */
        className="h-[92px] w-full max-w-none object-cover object-center sm:h-[132px] lg:h-auto"
      />
    </div>
  )
}

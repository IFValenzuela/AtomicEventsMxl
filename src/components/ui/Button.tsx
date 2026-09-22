import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'onPhoto'

type Props = {
  children: ReactNode
  to?: string
  href?: string
  variant?: Variant
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

/**
 * The only button on the site.
 *
 * Rebuilt to Apple's control conventions rather than the hotel reference's,
 * which set a 40px, hard-cornered, 13px all-caps button with 2px of tracking.
 * That is a luxury-print idiom; it is not what a well-made app control looks
 * like, and the corners were the part that read worst.
 *
 * Geometry
 *   height        44px — Apple's minimum comfortable touch target. The old
 *                 40px was under it.
 *   radius        12px. Deliberately NOT a capsule: a pill on a 44px control
 *                 needs a 22px radius, and that reads as a tag rather than a
 *                 button. 12px is the iOS prominent-button proportion — soft
 *                 enough to look made, square enough to still look serious.
 *                 Progressively enhanced to a true squircle in index.css
 *                 wherever the browser supports `corner-shape`.
 *   type          15px / 20px, weight 600, sentence case, -0.01em tracking.
 *                 Apple never sets a control in all-caps with wide tracking:
 *                 caps cost legibility at small sizes and the tracking is
 *                 there to rescue it. Sentence case needs neither.
 *
 * Feel — the press is the frame that matters
 *   Feedback fires on pointer-down through :active, never on click, and it is
 *   a 97% scale over 100ms: fast enough to read as contact rather than as an
 *   animation. The colour change rides a longer 200ms, so the press feels
 *   instant while the tint settles behind it. Under reduced motion the scale
 *   is dropped and the tint alone carries the state.
 *
 * Colour: blue, then pink
 *   Every two-button pair on the site runs primary blue, secondary pink, in
 *   that order. Pink is the brand's own, off the shooting star in the logo.
 *   It earns its place as the second action rather than the first, so it
 *   never has to carry a whole page by itself.
 *
 *   solid    brand blue fill, white label. The primary action.
 *   accent   pink fill, white label. The second action in a pair.
 *   outline  blue hairline on white. Tertiary — kept for a third action
 *            in a group; nothing uses it on the site today.
 *   onPhoto  a translucent white material over photography — backdrop blur
 *            rather than a flat wash, so it reads as glass catching the
 *            picture behind it instead of a faded box.
 */
const base =
  'btn inline-flex items-center justify-center gap-2 rounded-[12px] px-[22px] ' +
  'text-[0.9375rem] leading-5 font-semibold tracking-[-0.01em] whitespace-nowrap ' +
  'transition-[transform,background-color,border-color,color] duration-200 ease-out ' +
  'active:scale-[0.97] active:duration-100 ' +
  'motion-reduce:transition-[background-color,border-color,color] motion-reduce:active:scale-100 ' +
  'disabled:pointer-events-none disabled:opacity-40'

/* Both paddings land the control on exactly 44px: 12+20+12 filled,
   11+20+11+2 once a hairline border is inside the box. */
const FILLED = 'border-0 py-3'
const HAIRLINE = 'border py-[11px]'

const variants: Record<Variant, string> = {
  solid: `${FILLED} bg-pink text-white hover:bg-pink-deep`,
  outline: `${HAIRLINE} border-pink/40 bg-transparent text-pink hover:border-pink hover:bg-pink/5`,
  onPhoto:
    `${HAIRLINE} border-white/35 bg-white/15 text-white backdrop-blur-md backdrop-saturate-150 ` +
    'hover:border-white/60 hover:bg-white/25',
}

export function Button({
  children,
  to,
  href,
  variant = 'solid',
  className = '',
  type = 'button',
  disabled,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} disabled={disabled}>
      {children}
    </button>
  )
}

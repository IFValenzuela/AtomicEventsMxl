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
 * The only button on the site, at the reference's exact geometry: 40px tall,
 * 13px, uppercase, 2px letter-spacing, 1px border, zero radius, and padding
 * of 12px top against 10px bottom. That asymmetry is optical centring for
 * uppercase text, and it is why the reference's buttons sit correctly.
 *
 * There is deliberately one size. The reference uses the same 40px button in
 * its header and over its hero, and a "large" variant is the thing that makes
 * a page look like a component library rather than a designed page.
 *
 *   solid    pink fill, white label. 4.69:1, clears AA at 13px.
 *   outline  ink hairline on white.
 *   onPhoto  white hairline, white label. Only over a photograph.
 */
const base =
  'inline-flex items-center justify-center gap-2.5 border px-6 pt-3 pb-2.5 text-[0.8125rem] font-semibold ' +
  'uppercase leading-[1.2] tracking-[2px] whitespace-nowrap transition-colors duration-300 ' +
  'ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid: 'border-pink bg-pink text-white hover:border-pink-deep hover:bg-pink-deep',
  outline: 'border-ink bg-transparent text-ink hover:border-pink hover:bg-pink hover:text-white',
  onPhoto:
    'border-white/80 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink',
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

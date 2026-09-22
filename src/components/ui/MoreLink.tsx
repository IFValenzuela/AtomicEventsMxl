import { Link } from 'react-router-dom'
import { ArrowRight } from './icons'
import { CTA } from '../../data/site'

type Props = {
  to: string
  label?: string
  className?: string
  /** Over a photograph, where the label and its rule must be white. */
  onPhoto?: boolean
}

/**
 * "VER MÁS ->" exactly as the reference does it: small uppercase label with
 * wide tracking, a hairline underline, and an arrow that slides on hover.
 * This is the quiet affordance that sits under a section heading, and it is
 * deliberately not a button.
 */
export function MoreLink({ to, label = CTA.more, className = '', onPhoto }: Props) {
  return (
    <Link
      to={to}
      className={`morelink group ${onPhoto ? 'text-white hover:text-white/70' : ''} ${className}`}
    >
      {label}
      <ArrowRight
        size={16}
        weight="regular"
        aria-hidden="true"
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
      />
    </Link>
  )
}

import type { ReactNode } from 'react'
import { MoreLink } from './MoreLink'

type Props = {
  title: ReactNode
  body?: ReactNode
  more?: { to: string; label?: string }
  /**
   * Centred is the reference's default: heading, a narrow centred paragraph,
   * and a centred "VER MÁS" underneath. Left is used inside the tinted band
   * and anywhere the header shares a row with something else.
   */
  align?: 'center' | 'left'
  id?: string
  className?: string
}

/**
 * Section heading.
 *
 * Lora at 28px rising to 36px, weight 500, with a paragraph held to roughly
 * 58 characters so it breaks into the short centred lines the reference uses.
 * There is no eyebrow anywhere on this site.
 */
export function SectionHeader({
  title,
  body,
  more,
  align = 'center',
  id,
  className = '',
}: Props) {
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto max-w-[40rem] text-center' : 'max-w-[34rem]'} ${className}`}
    >
      <h2 id={id} className="text-[1.75rem] lg:text-4xl">
        {title}
      </h2>

      {body && (
        <p
          className={`mt-7 text-ink ${centered ? 'mx-auto max-w-[58ch]' : 'max-w-[46ch]'}`}
        >
          {body}
        </p>
      )}

      {more && (
        <div className={centered ? 'mt-10 flex justify-center' : 'mt-10'}>
          <MoreLink to={more.to} label={more.label} />
        </div>
      )}
    </div>
  )
}

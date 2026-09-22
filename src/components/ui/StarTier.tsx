import { Star } from './icons'

type Props = {
  /** Filled stars, exactly as the flyer printed them. */
  stars: number
  /** Total stars in this occasion's scale. Proposals use 3; baby shower uses 4. */
  of: number
  size?: number
}

/**
 * The tier rating from the flyers.
 *
 * Ink, not gold and not pink. The logo's gold is 1.5:1 on white, so it would
 * be invisible here, and pink is no longer a UI colour at all. Gold still lives in the
 * badge artwork and over photographs.
 */
export function StarTier({ stars, of, size = 15 }: Props) {
  return (
    <span
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`Nivel ${stars} de ${of}`}
    >
      {Array.from({ length: of }, (_, i) => (
        <Star
          key={i}
          size={size}
          weight={i < stars ? 'fill' : 'regular'}
          className={i < stars ? 'text-ink' : 'text-ink/20'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

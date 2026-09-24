import { useId } from 'react'

type Props = {
  /** Filled stars, exactly as the flyer printed them. */
  stars: number
  /** Total stars in this occasion's scale. Proposals use 3; baby shower uses 4. */
  of: number
  /**
   * The package's name. A package named after a metal ("Paquete Plata")
   * wears that metal whatever its star count, so the name and the stars
   * never disagree.
   */
  name?: string
  size?: number
}

type Metal = {
  label: string
  /** Gradient stops, light to dark, top-left to bottom-right. */
  light: string
  mid: string
  dark: string
  /** Outline. Dark enough to hold 3:1 against white on its own. */
  edge: string
}

/**
 * One metal per tier, climbing the way a medal table does: bronze, silver,
 * gold, then amethyst and diamond for the tiers above gold that the baby
 * shower and proposal flyers print.
 */
const METALS: Record<'bronce' | 'plata' | 'oro' | 'amatista' | 'diamante', Metal> = {
  bronce: { label: 'Bronce', light: '#f0b98a', mid: '#c27c45', dark: '#8a4b1f', edge: '#7a4118' },
  plata: { label: 'Plata', light: '#f4f6f8', mid: '#b9c1c9', dark: '#7c8792', edge: '#5f6a75' },
  oro: { label: 'Oro', light: '#ffe89a', mid: '#e3b23c', dark: '#a8780f', edge: '#8a6208' },
  amatista: { label: 'Amatista', light: '#e3c8ff', mid: '#9d5ee0', dark: '#5f2aa3', edge: '#4f2190' },
  diamante: { label: 'Diamante', light: '#f2fbff', mid: '#9fd8f2', dark: '#3f93bf', edge: '#2b7199' },
}

const BY_STARS = ['bronce', 'plata', 'oro', 'amatista', 'diamante'] as const

function metalFor(stars: number, name?: string): Metal {
  const named = name?.toLowerCase()
  if (named) {
    for (const key of ['bronce', 'plata', 'oro'] as const) {
      if (new RegExp(`\\b${key}\\b`).test(named)) return METALS[key]
    }
  }
  return METALS[BY_STARS[Math.min(Math.max(stars, 1), BY_STARS.length) - 1]]
}

/** A five-point star on a 24px grid, points slightly rounded by the stroke join. */
const STAR =
  'M12 2.6l2.83 5.74 6.33.92-4.58 4.46 1.08 6.3L12 17.04l-5.66 2.98 1.08-6.3-4.58-4.46 6.33-.92z'

/**
 * The tier rating from the flyers, set in metal.
 *
 * Each filled star is a small diagonal gradient, light to dark, the way a
 * struck medal catches light, with a darker outline of the same metal so
 * even pale silver holds its edge on white. Empty stars are a quiet ink
 * outline. Nothing moves: it is a mark, not a control.
 */
export function StarTier({ stars, of, name, size = 18 }: Props) {
  const metal = metalFor(stars, name)
  const gradient = `metal-${useId().replace(/:/g, '')}`

  return (
    <span
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`Nivel ${metal.label}, ${stars} de ${of} estrellas`}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={metal.light} />
            <stop offset="0.5" stopColor={metal.mid} />
            <stop offset="1" stopColor={metal.dark} />
          </linearGradient>
        </defs>
      </svg>

      {Array.from({ length: of }, (_, i) => {
        const filled = i < stars
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className={filled ? undefined : 'text-ink/25'}
          >
            <path
              d={STAR}
              fill={filled ? `url(#${gradient})` : 'none'}
              stroke={filled ? metal.edge : 'currentColor'}
              strokeWidth={filled ? 1.1 : 1.4}
              strokeLinejoin="round"
            />
          </svg>
        )
      })}
    </span>
  )
}

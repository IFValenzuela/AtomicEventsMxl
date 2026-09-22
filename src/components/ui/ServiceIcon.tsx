import {
  Balloon,
  Camera,
  Drone,
  Flower,
  Sparkle,
  TextAa,
} from './icons'
import type { ServiceIconName } from '../../data/services'

/** One icon family (Phosphor), one weight (duotone), one size scale. */
const MAP = {
  camera: Camera,
  letters: TextAa,
  sparks: Sparkle,
  petals: Flower,
  drone: Drone,
  balloons: Balloon,
} as const satisfies Record<ServiceIconName, unknown>

export function ServiceIcon({
  name,
  size = 28,
  className = '',
}: {
  name: ServiceIconName
  size?: number
  className?: string
}) {
  const Icon = MAP[name]
  return (
    <Icon size={size} weight="duotone" aria-hidden="true" className={className} />
  )
}

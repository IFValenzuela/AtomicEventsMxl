/**
 * Every icon on the site, in one place.
 *
 * One family (Phosphor), one import style, and deep imports rather than the
 * package barrel. Importing from '@phosphor-icons/react' pulls all ~9000 icon
 * modules into the graph and costs roughly 300 kB in the bundle; these paths
 * cost only the glyphs actually used.
 *
 * To add an icon: add a line here, then import it from this file. Do not
 * import from '@phosphor-icons/react' anywhere else, and do not add a second
 * icon library.
 */

export { ArrowRightIcon as ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
export { ArrowUpRightIcon as ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
export { BalloonIcon as Balloon } from '@phosphor-icons/react/dist/csr/Balloon'
export { CameraIcon as Camera } from '@phosphor-icons/react/dist/csr/Camera'
export { CaretLeftIcon as CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft'
export { CaretRightIcon as CaretRight } from '@phosphor-icons/react/dist/csr/CaretRight'
export { CheckCircleIcon as CheckCircle } from '@phosphor-icons/react/dist/csr/CheckCircle'
export { ClockIcon as Clock } from '@phosphor-icons/react/dist/csr/Clock'
export { DroneIcon as Drone } from '@phosphor-icons/react/dist/csr/Drone'
export { EnvelopeSimpleIcon as EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
export { FacebookLogoIcon as FacebookLogo } from '@phosphor-icons/react/dist/csr/FacebookLogo'
export { FlowerIcon as Flower } from '@phosphor-icons/react/dist/csr/Flower'
export { HeartIcon as Heart } from '@phosphor-icons/react/dist/csr/Heart'
export { ImageSquareIcon as ImageSquare } from '@phosphor-icons/react/dist/csr/ImageSquare'
export { InfoIcon as Info } from '@phosphor-icons/react/dist/csr/Info'
export { InstagramLogoIcon as InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
export { ListIcon as List } from '@phosphor-icons/react/dist/csr/List'
export { MapPinIcon as MapPin } from '@phosphor-icons/react/dist/csr/MapPin'
export { PaperPlaneTiltIcon as PaperPlaneTilt } from '@phosphor-icons/react/dist/csr/PaperPlaneTilt'
export { PhoneIcon as Phone } from '@phosphor-icons/react/dist/csr/Phone'
export { QuotesIcon as Quotes } from '@phosphor-icons/react/dist/csr/Quotes'
export { SparkleIcon as Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle'
export { StarIcon as Star } from '@phosphor-icons/react/dist/csr/Star'
export { TextAaIcon as TextAa } from '@phosphor-icons/react/dist/csr/TextAa'
export { WarningCircleIcon as WarningCircle } from '@phosphor-icons/react/dist/csr/WarningCircle'
export { WhatsappLogoIcon as WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
export { XIcon as X } from '@phosphor-icons/react/dist/csr/X'

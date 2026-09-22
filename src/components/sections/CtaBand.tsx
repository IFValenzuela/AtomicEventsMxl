import { WhatsappLogo } from '../ui/icons'
import { CLOSING_PHOTO, CONTACT, CTA, type Photo } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

type Props = {
  title?: string
  body?: string
  /** Override the closing photograph on a page that would otherwise repeat it. */
  photo?: Photo
}

/**
 * The closing ask.
 *
 * This was a flat sand rectangle, and it was the weakest surface on the site
 * for two reasons, both of them my error and both worth writing down.
 *
 * The colour was wrong. #ece0c6 came from taking the reference's sand and
 * re-deriving it from Atomic's logo gold, which is defensible arithmetic and
 * the wrong instinct. The reference's sand works because sand IS its brown
 * ink desaturated: the band is the page's own colour, turned down. Atomic's
 * ink is navy, so the same move never produced a cream. It produced the only
 * warm surface on a page of cool navy, hot pink and night photography, and it
 * read as somebody else's hotel brochure.
 *
 * The plainness was worse. The reference's tinted band is never a bare
 * rectangle: it carries the offers carousel beside its copy. A coloured
 * rectangle with centred text is that device with the content taken out.
 *
 * So the band is near-black now and it carries a photograph. Not the pinned
 * parallax of PhotoBand, which stays the home page's one signature, just a
 * full-bleed cover frame under a scrim. That is cheaper on a page already
 * heavy with fixed backgrounds, and it keeps the two bands distinct.
 *
 * Every event Atomic shoots is a night scene, so the dark is the subject
 * rather than a filter laid over it, and the pink control finally has a
 * ground it can sing against: pink on navy is the logo's own pairing.
 */
export function CtaBand({
  title = '¿Ya tienes fecha?',
  body = 'Cuéntanos qué vas a celebrar y te mandamos una cotización con todo incluido: montaje, logística y tiempo completo.',
  photo = CLOSING_PHOTO,
}: Props) {
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`

  return (
    <section className="relative isolate overflow-hidden bg-[#021015]">
      {/* The photograph, close to full strength. It can be, because the scrim
          below sits ON TOP of it: the floor under the copy is set by the
          gradient, not by how much picture is showing, so opening the photo up
          brightens the edges and leaves the measured centre untouched. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${photo.src})` }}
      />

      {/* A radial scrim, not a flat one, and the reason is contrast rather
          than taste. Pink cannot reach 3:1 against any navy - #e0195f manages
          2.99 on the ink itself - so a control sitting on this band needs a
          ground darker than the ink, and it needs it guaranteed rather than
          probable: CtaBand takes any photograph and runs on six pages, so a
          scrim tuned to one picture's dark corner is not a floor.

          Opaque out to 42%, then a long falloff to 92% so the dark gathers
          toward the middle rather than ending in a ring. Every control sits
          inside that opaque core, so the ground under them is #021015 whatever
          the photograph is doing: white text 19:1, the pink button 3.76:1
          against its own boundary, the lifted pink link 6.4:1. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#021015_0%,#021015_42%,rgba(2,16,21,0.72)_60%,transparent_92%)]"
      />

      <Reveal className="band shell relative text-center">
        <h2 className="mx-auto max-w-[18ch] text-[1.75rem] text-white lg:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-7 max-w-[54ch] text-white/85">{body}</p>

        <div className="mt-11 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10">
          <Button to="/contacto">{CTA.quote}</Button>

          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="morelink morelink-photo"
          >
            <WhatsappLogo size={16} weight="regular" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  )
}

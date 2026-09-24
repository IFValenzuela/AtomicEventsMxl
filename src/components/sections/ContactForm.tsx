import { useEffect, useId, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CheckCircle,
  EnvelopeSimple,
  PaperPlaneTilt,
  WarningCircle,
} from '../ui/icons'
import { CONTACT } from '../../data/site'
import { byslug, OCCASIONS } from '../../data/occasions'
import { Button } from '../ui/Button'

type Fields = {
  nombre: string
  telefono: string
  ocasion: string
  fecha: string
  mensaje: string
}

type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Fields = {
  nombre: '',
  telefono: '',
  ocasion: '',
  fecha: '',
  mensaje: '',
}

/**
 * Quote request form.
 *
 * A submit emails the request to CONTACT.formEmail through FormSubmit's
 * AJAX endpoint, since this is a static build with no backend of its own.
 * It deliberately does not open WhatsApp: the WhatsApp link and the phone
 * numbers sit beside the form for anyone who would rather write or call.
 * Nothing is stored in the browser.
 *
 * Until formEmail is set, or if the send fails, the form stays filled in and
 * says so plainly, pointing to WhatsApp and the phones. A hidden honeypot
 * field (_honey) turns away the simplest bots.
 *
 * Package cards deep-link here with ?ocasion=&paquete=, which preselects the
 * occasion and opens the message with the package already named.
 *
 * Every label sits above its input, helper text below it, and error text below
 * that. No placeholder is ever doing a label's job.
 */
export function ContactForm() {
  const [params] = useSearchParams()
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sendError, setSendError] = useState('')
  const uid = useId()

  // Preselect from a package card's deep link.
  useEffect(() => {
    const slug = params.get('ocasion')
    const pkgId = params.get('paquete')
    const occasion = byslug(slug ?? undefined)
    if (!occasion) return

    const pkg = occasion.packages.find((p) => p.id === pkgId)

    setFields((prev) => ({
      ...prev,
      ocasion: occasion.slug,
      mensaje: pkg
        ? `Me interesa el ${pkg.name} para ${occasion.nav.toLowerCase()}.`
        : `Me interesa un paquete de ${occasion.nav.toLowerCase()}.`,
    }))
  }, [params])

  const set = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const validate = (): Errors => {
    const next: Errors = {}

    if (fields.nombre.trim().length < 2) {
      next.nombre = 'Escribe tu nombre para saber cómo dirigirnos a ti.'
    }

    const digits = fields.telefono.replace(/\D/g, '')
    if (digits.length < 10) {
      next.telefono = 'Necesitamos 10 dígitos para poder regresarte la llamada.'
    }

    if (!fields.ocasion) {
      next.ocasion = 'Elige qué vas a celebrar.'
    }

    if (fields.fecha) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (new Date(`${fields.fecha}T00:00:00`) < today) {
        next.fecha = 'Esa fecha ya pasó. Revísala, por favor.'
      }
    }

    return next
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSendError('')

    const found = validate()
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus('error')
      return
    }

    const fallback = `Escríbenos por WhatsApp, a ${CONTACT.email} o márcanos al ${CONTACT.phones[0].display}.`

    if (!CONTACT.formEmail) {
      setStatus('error')
      setSendError(`Por ahora no pudimos enviar tu solicitud. ${fallback}`)
      return
    }

    // A bot filled the hidden field. Pretend it worked and send nothing.
    if (new FormData(event.currentTarget).get('_honey')) {
      setStatus('sent')
      return
    }

    setStatus('sending')

    const occasion = byslug(fields.ocasion)
    const celebra = occasion
      ? occasion.nav
      : fields.ocasion === 'otro'
        ? 'Otro evento'
        : fields.ocasion

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT.formEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nueva cotización: ${celebra} (${fields.nombre.trim()})`,
          _template: 'table',
          Nombre: fields.nombre.trim(),
          Teléfono: fields.telefono.trim(),
          'Qué celebra': celebra,
          'Fecha del evento': fields.fecha || 'Sin fecha todavía',
          Mensaje: fields.mensaje.trim() || '(sin mensaje)',
        }),
      })
      const result = (await response.json().catch(() => null)) as {
        success?: string | boolean
      } | null
      if (!response.ok || String(result?.success) !== 'true') {
        throw new Error('send failed')
      }
      setStatus('sent')
    } catch {
      // Say so plainly and leave the form filled in.
      setStatus('error')
      setSendError(
        `No se pudo enviar tu solicitud. Inténtalo de nuevo en un momento. ${fallback}`,
      )
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t border-ink pt-12 text-center">
        <CheckCircle
          size={40}
          weight="regular"
          aria-hidden="true"
          className="mx-auto text-ink"
        />

        <h3 className="mt-6 text-[1.75rem]">Recibimos tu solicitud</h3>

        <p className="mx-auto mt-4 max-w-[46ch] text-ink">
          Te contactamos pronto al número que nos dejaste con tu cotización.
          Si es urgente, márcanos al {CONTACT.phones[0].display}.
        </p>

        <button
          type="button"
          onClick={() => {
            setFields(EMPTY)
            setStatus('idle')
          }}
          className="morelink mt-9"
        >
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  const errorCount = Object.keys(errors).length

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      /* On desktop the form fills its column, which the page stretches to
         the sidebar's height; the message row takes up the slack. */
      className="border-t border-ink pt-10 lg:flex lg:flex-1 lg:flex-col"
    >
      {sendError && (
        <p
          role="alert"
          className="mb-8 flex items-start gap-3 border-l-2 border-danger pl-4 text-[0.9375rem] text-danger"
        >
          <WarningCircle
            size={18}
            weight="regular"
            aria-hidden="true"
            className="mt-0.5 shrink-0"
          />
          {sendError}
        </p>
      )}

      {/* Honeypot. Hidden from people and screen readers; bots fill it. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === 'error' && errorCount > 0 && (
        <p
          role="alert"
          className="mb-8 flex items-start gap-3 border-l-2 border-danger pl-4 text-[0.9375rem] text-danger"
        >
          <WarningCircle
            size={18}
            weight="regular"
            aria-hidden="true"
            className="mt-0.5 shrink-0"
          />
          Revisa los campos marcados abajo para poder mandar tu solicitud.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex-1 lg:grid-rows-[auto_auto_1fr]">
        <Field
          id={`${uid}-nombre`}
          label="Tu nombre"
          required
          error={errors.nombre}
          value={fields.nombre}
          onChange={set('nombre')}
          autoComplete="name"
          placeholder="Ana Rentería"
        />

        <Field
          id={`${uid}-telefono`}
          label="Teléfono"
          required
          type="tel"
          inputMode="tel"
          error={errors.telefono}
          value={fields.telefono}
          onChange={set('telefono')}
          autoComplete="tel"
          placeholder="686 123 4567"
          help="A este número te mandamos la cotización."
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${uid}-ocasion`}
            className="text-[0.8125rem] tracking-[0.1em] text-ink uppercase"
          >
            Qué vas a celebrar{' '}
            <span className="text-danger" aria-hidden="true">
              *
            </span>
          </label>

          <select
            id={`${uid}-ocasion`}
            value={fields.ocasion}
            onChange={(e) => set('ocasion')(e.target.value)}
            aria-invalid={Boolean(errors.ocasion)}
            aria-describedby={errors.ocasion ? `${uid}-ocasion-error` : undefined}
            className="field field-select"
          >
            <option value="">Elige una opción</option>
            {OCCASIONS.map((occasion) => (
              <option key={occasion.slug} value={occasion.slug}>
                {occasion.nav}
              </option>
            ))}
            <option value="otro">Otro evento</option>
          </select>

          {errors.ocasion && (
            <ErrorText id={`${uid}-ocasion-error`}>{errors.ocasion}</ErrorText>
          )}
        </div>

        <Field
          id={`${uid}-fecha`}
          label="Fecha del evento"
          type="date"
          error={errors.fecha}
          value={fields.fecha}
          onChange={set('fecha')}
          help="Si todavía no la tienes, déjala en blanco."
        />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor={`${uid}-mensaje`}
            className="text-[0.8125rem] tracking-[0.1em] text-ink uppercase"
          >
            Cuéntanos más
          </label>

          <textarea
            id={`${uid}-mensaje`}
            rows={5}
            value={fields.mensaje}
            onChange={(e) => set('mensaje')(e.target.value)}
            aria-invalid={Boolean(errors.mensaje)}
            aria-describedby={errors.mensaje ? `${uid}-mensaje-error` : undefined}
            placeholder="Cuántos invitados, en qué salón, a qué hora empieza."
            className="field field-area lg:flex-1"
          />

          {errors.mensaje && (
            <ErrorText id={`${uid}-mensaje-error`}>{errors.mensaje}</ErrorText>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit"  disabled={status === 'sending'}>
          {status === 'sending' ? (
            'Enviando…'
          ) : (
            <>
              <PaperPlaneTilt size={18} weight="regular" aria-hidden="true" />
              Enviar solicitud
            </>
          )}
        </Button>

        <p className="flex items-center gap-2.5 text-[0.9375rem] text-ink-soft">
          <EnvelopeSimple
            size={17}
            weight="regular"
            aria-hidden="true"
            className="shrink-0 text-ink-soft"
          />
          Te respondemos con tu cotización al número que nos dejes.
        </p>
      </div>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  error?: string
  help?: string
  placeholder?: string
  autoComplete?: string
  inputMode?: 'tel' | 'text' | 'numeric'
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required,
  error,
  help,
  placeholder,
  autoComplete,
  inputMode,
}: FieldProps) {
  const helpId = help ? `${id}-help` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.8125rem] tracking-[0.1em] text-ink uppercase">
        {label}{' '}
        {required && (
          <span className="text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={[helpId, errorId].filter(Boolean).join(' ') || undefined}
        className="field"
      />

      {help && !error && (
        <p id={helpId} className="text-[0.875rem] text-ink-soft">
          {help}
        </p>
      )}

      {error && <ErrorText id={errorId!}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-[0.875rem] text-danger">
      {children}
    </p>
  )
}

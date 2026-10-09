import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
} from 'react'
import {
  LIMITS,
  ROLES,
  looksAutomated,
  submitWaitlist,
  validateWaitlist,
  type FieldErrors,
  type Role,
  type WaitlistInput,
} from '../lib/waitlist'

type Status = 'idle' | 'submitting' | 'saved' | 'preview' | 'error'

interface GetInvolvedProps {
  role: Role | ''
  onRoleChange: (role: Role) => void
}

const EMPTY = { name: '', email: '', organization: '' }

export function GetInvolved({ role, onRoleChange }: GetInvolvedProps) {
  const [fields, setFields] = useState(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [firstName, setFirstName] = useState('')
  const startedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)

  const update = (key: keyof typeof EMPTY) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const input: WaitlistInput = { ...fields, role }
    const result = validateWaitlist(input)

    if (!result.ok) {
      setErrors(result.errors)
      setStatus('idle')
      // Move focus to the first field that needs attention.
      const order: (keyof WaitlistInput)[] = ['role', 'name', 'email', 'organization']
      const first = order.find((key) => result.errors[key])
      if (first) {
        const target = formRef.current?.querySelector<HTMLElement>(
          first === 'role' ? 'input[name="role"]' : `#wl-${first}`,
        )
        target?.focus()
      }
      return
    }

    setErrors({})

    // Likely bot: show the normal confirmation but send nothing.
    if (looksAutomated(honeypot.current?.value ?? '', startedAt.current)) {
      setStatus('saved')
      return
    }

    setStatus('submitting')
    const outcome = await submitWaitlist(result.entry)

    if (outcome.status === 'error') {
      setStatus('error')
      return
    }

    setFirstName(result.entry.name.split(' ')[0])
    setFields(EMPTY)
    setStatus(outcome.status)
  }

  const done = status === 'saved' || status === 'preview'

  // Announce and focus the confirmation once it appears.
  useEffect(() => {
    if (done) doneRef.current?.focus()
  }, [done])

  return (
    <section id="get-involved" className="section join" aria-labelledby="join-title">
      <div className="wrap join__inner">
        <div className="join__copy">
          <h2 id="join-title" className="section-title join__title">
            Be part of the Need for Good community.
          </h2>
          <p>
            Tell us who you are and we’ll reach out as Need for Good opens in your area. We only ask
            for what we need to contact you.
          </p>
          <ul className="join__promises">
            <li>No passwords, payment details, or ID numbers</li>
            <li>No advertising trackers on this site</li>
            <li>We use your email only to contact you about Need for Good</li>
          </ul>
        </div>

        <div className="join__card">
          {done ? (
            <div className="join__done" role="status" tabIndex={-1} ref={doneRef}>
              <h3 className="join__done-title">Thanks{firstName ? `, ${firstName}` : ''}.</h3>
              {status === 'saved' ? (
                <p>You’re on the list. We’ll be in touch by email as things get started.</p>
              ) : (
                <p>
                  Sign-ups aren’t open yet, so this preview didn’t save your details. Please check
                  back soon.
                </p>
              )}
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  startedAt.current = Date.now()
                  setStatus('idle')
                }}
              >
                Add another person
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              className="form"
              method="post"
              noValidate
              onSubmit={handleSubmit}
              aria-describedby="form-note"
            >
              <fieldset className="form__roles" aria-invalid={errors.role ? true : undefined} aria-describedby={errors.role ? 'wl-role-error' : undefined}>
                <legend className="form__legend">How would you like to get involved?</legend>
                <div className="role-options">
                  {ROLES.map((option) => (
                    <label key={option.value} className="role-option">
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={role === option.value}
                        onChange={() => onRoleChange(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.role && (
                  <p id="wl-role-error" className="form__error">
                    {errors.role}
                  </p>
                )}
              </fieldset>

              <div className="form__row">
                <Field
                  id="wl-name"
                  label="Name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={update('name')}
                  maxLength={LIMITS.name}
                  error={errors.name}
                  required
                />
                <Field
                  id="wl-email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={update('email')}
                  maxLength={LIMITS.email}
                  error={errors.email}
                  required
                />
              </div>
              <Field
                id="wl-organization"
                label="Organization"
                hint="optional"
                autoComplete="organization"
                value={fields.organization}
                onChange={update('organization')}
                maxLength={LIMITS.organization}
                error={errors.organization}
              />

              {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
              <div className="form__trap" aria-hidden="true">
                <label htmlFor="wl-website">Leave this field empty</label>
                <input id="wl-website" ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {status === 'error' && (
                <p className="form__alert" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}

              <button className="btn btn--primary btn--lg form__submit" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Joining…' : 'Join the community'}
              </button>
              <p id="form-note" className="form__note">
                Read how we handle your details in our <a href="/privacy.html">privacy notice</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  hint?: string
  error?: string
}

function Field({ id, label, hint, error, required, ...inputProps }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {hint && <span className="field__hint"> ({hint})</span>}
      </label>
      <input
        id={id}
        name={id.replace('wl-', '')}
        className="field__input"
        type="text"
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        spellCheck={false}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="form__error">
          {error}
        </p>
      )}
    </div>
  )
}

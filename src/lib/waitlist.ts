/**
 * Waitlist form: validation and submission.
 *
 * Validation here exists for usability. It is NOT a security boundary: anyone
 * can call a backend directly, so the same rules must also be enforced on the
 * server (see supabase/waitlist.sql for matching database constraints).
 */

export const ROLES = [
  { value: 'nonprofit', label: 'I represent a nonprofit' },
  { value: 'business', label: 'I represent a business' },
  { value: 'volunteer', label: 'I want to volunteer' },
  { value: 'updates', label: 'I want to stay updated' },
] as const

export type Role = (typeof ROLES)[number]['value']

const ROLE_VALUES: readonly string[] = ROLES.map((r) => r.value)

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && ROLE_VALUES.includes(value)
}

export const LIMITS = {
  name: 100,
  email: 254,
  organization: 150,
} as const

export interface WaitlistInput {
  name: string
  email: string
  organization: string
  role: Role | ''
}

export interface WaitlistEntry {
  name: string
  email: string
  organization: string | null
  role: Role
}

export type FieldErrors = Partial<Record<keyof WaitlistInput, string>>

// Control characters and angle brackets have no place in a name or
// organization and are a common sign of malformed or hostile input.
// eslint-disable-next-line no-control-regex
const DISALLOWED_TEXT = /[\u0000-\u001F\u007F<>]/

// Deliberately simple: one @, no spaces, a dot in the domain, a 2+ char TLD.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function collapseSpaces(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

export function validateWaitlist(
  input: WaitlistInput,
): { ok: true; entry: WaitlistEntry } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {}

  const name = typeof input.name === 'string' ? collapseSpaces(input.name) : ''
  const email = typeof input.email === 'string' ? input.email.trim() : ''
  const organization =
    typeof input.organization === 'string' ? collapseSpaces(input.organization) : ''

  if (!name) {
    errors.name = 'Enter your name.'
  } else if (name.length > LIMITS.name) {
    errors.name = `Use ${LIMITS.name} characters or fewer.`
  } else if (DISALLOWED_TEXT.test(name)) {
    errors.name = 'Remove the < > or special characters from your name.'
  }

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter an email address like name@example.org.'
  } else if (email.split('@')[0].length > 64) {
    errors.email = 'Enter an email address like name@example.org.'
  }

  if (organization.length > LIMITS.organization) {
    errors.organization = `Use ${LIMITS.organization} characters or fewer.`
  } else if (organization && DISALLOWED_TEXT.test(organization)) {
    errors.organization = 'Remove the < > or special characters from the organization name.'
  }

  if (!isRole(input.role)) {
    errors.role = 'Choose how you’d like to get involved.'
  }

  if (Object.keys(errors).length > 0 || !isRole(input.role)) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    entry: {
      name,
      email,
      organization: organization || null,
      role: input.role,
    },
  }
}

/* ------------------------------------------------------------------ */
/* Bot signals                                                         */
/* ------------------------------------------------------------------ */

/** Humans rarely complete the form in under this many milliseconds. */
export const MIN_FILL_TIME_MS = 2500

export function looksAutomated(honeypotValue: string, startedAt: number): boolean {
  return honeypotValue.trim() !== '' || Date.now() - startedAt < MIN_FILL_TIME_MS
}

/* ------------------------------------------------------------------ */
/* Submission                                                          */
/* ------------------------------------------------------------------ */

export type SubmitResult =
  | { status: 'saved' }
  | { status: 'preview' } // no backend configured: nothing was stored
  | { status: 'error' }

interface BackendConfig {
  url: string
  anonKey: string
}

/**
 * Reads the PUBLIC Supabase settings. VITE_ variables are bundled into the
 * browser, so only the project URL and anon/publishable key belong here.
 * Never the service_role key.
 */
function readBackendConfig(): BackendConfig | null {
  const rawUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
  const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()
  if (!rawUrl || !anonKey) return null

  try {
    const url = new URL(rawUrl)
    if (url.protocol !== 'https:') return null
    return { url: url.origin, anonKey }
  } catch {
    return null
  }
}

const REQUEST_TIMEOUT_MS = 10_000

/**
 * Sends a validated entry to the backend with a POST request.
 *
 * When no backend is configured this does not pretend to save anything; it
 * returns `preview` so the UI can say so honestly. Personal data is never
 * written to localStorage, the URL, or the console.
 */
export async function submitWaitlist(entry: WaitlistEntry): Promise<SubmitResult> {
  const config = readBackendConfig()
  if (!config) {
    return { status: 'preview' }
  }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${config.url}/rest/v1/waitlist_signups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        // Ask for no response body: the browser never reads data back.
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(entry),
      credentials: 'omit',
      referrerPolicy: 'strict-origin-when-cross-origin',
      signal: controller.signal,
    })

    // 409 = this email is already on the list. Treat it as success so the
    // form cannot be used to discover who has signed up.
    if (response.ok || response.status === 409) {
      return { status: 'saved' }
    }
    // Log only the status code: never the request body or headers.
    console.error(`Waitlist submission failed (HTTP ${response.status}).`)
    return { status: 'error' }
  } catch {
    console.error('Waitlist submission failed (network error or timeout).')
    return { status: 'error' }
  } finally {
    window.clearTimeout(timer)
  }
}

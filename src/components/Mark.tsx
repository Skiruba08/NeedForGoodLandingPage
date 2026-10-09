export type Audience = 'nonprofit' | 'business' | 'volunteer'

interface MarkProps {
  kind: Audience
  size?: number
  className?: string
}

/**
 * The three audience shapes used across the site:
 * nonprofits are circles, businesses are squares, volunteers are diamonds.
 * Decorative only; the text next to a mark always names the audience.
 */
export function Mark({ kind, size = 20, className }: MarkProps) {
  return (
    <svg
      className={['mark', `mark--${kind}`, className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'nonprofit' && <circle cx="10" cy="10" r="9" />}
      {kind === 'business' && <rect x="1.5" y="1.5" width="17" height="17" rx="3.5" />}
      {kind === 'volunteer' && <rect x="4" y="4" width="12" height="12" rx="2.2" transform="rotate(45 10 10)" />}
    </svg>
  )
}

export function Logo() {
  return (
    <svg className="logo-mark" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" focusable="false">
      <path className="logo-mark__link" d="M9 11 L24 9 L17 25 Z" />
      <circle className="logo-mark__np" cx="9" cy="11" r="6" />
      <rect className="logo-mark__biz" x="19" y="4" width="10" height="10" rx="2.4" />
      <rect className="logo-mark__vol" x="13" y="21" width="8" height="8" rx="1.6" transform="rotate(45 17 25)" />
    </svg>
  )
}

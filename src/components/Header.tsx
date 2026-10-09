import { useEffect, useRef, useState } from 'react'
import { Logo } from './Mark'

const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#nonprofits', label: 'For Nonprofits' },
  { href: '#businesses', label: 'For Businesses' },
  { href: '#volunteers', label: 'For Volunteers' },
  { href: '#about', label: 'About' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 60em)')
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${open ? ' is-open' : ''}`}>
      <div className="site-header__inner wrap">
        <a className="brand" href="#top" onClick={close}>
          <Logo />
          <span className="brand__name">Need for Good</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-toggle__bars" aria-hidden="true" />
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav id="primary-nav" className="primary-nav" aria-label="Primary">
          <ul className="primary-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary primary-nav__cta" href="#get-involved" onClick={close}>
            Get Involved
          </a>
        </nav>
      </div>
    </header>
  )
}

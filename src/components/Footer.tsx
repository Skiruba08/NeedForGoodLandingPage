import { Logo } from './Mark'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#get-involved', label: 'Contact' },
  { href: '/privacy.html', label: 'Privacy' },
  { href: '/terms.html', label: 'Terms' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="site-footer__brand">
          <a className="brand brand--footer" href="#top">
            <Logo />
            <span className="brand__name">Need for Good</span>
          </a>
          <p>Built for stronger communities.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="site-footer__links">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="site-footer__legal">© 2026 Need for Good. All rights reserved.</p>
      </div>
    </footer>
  )
}

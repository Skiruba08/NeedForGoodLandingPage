# Need for Good — landing page

React + Vite + TypeScript, plain CSS, no runtime dependencies beyond React.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run lint
npm audit
```

## Project layout

```
index.html              Title, meta description, Open Graph, canonical, favicons
vercel.json             Production security headers (CSP, HSTS, etc.)
public/                 Fonts (self-hosted), icons, og-image.png, robots.txt,
                        sitemap.xml, privacy.html, terms.html
src/App.tsx             Page composition
src/components/         One component per section
src/lib/waitlist.ts     Form validation + submission adapter
src/styles/             Design tokens (base.css) and section styles
supabase/waitlist.sql   Insert-only waitlist table with Row Level Security
.env.example            Variable names only — copy to .env.local
```

## Before launch

1. **Domain.** Replace `https://needforgood.example` in `index.html`,
   `public/robots.txt`, `public/sitemap.xml`, `public/privacy.html` and
   `public/terms.html` with your real domain.
2. **Waitlist.** Until Supabase is configured, the form runs in *preview mode*:
   it validates input and tells the visitor that nothing was saved. To store
   sign-ups:
   - Run `supabase/waitlist.sql` in the Supabase SQL editor.
   - In Vercel → Project → Settings → Environment Variables, set
     `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then redeploy.
   - In `vercel.json`, narrow `connect-src` from `https://*.supabase.co` to your
     exact project URL.
3. **Privacy and terms.** `public/privacy.html` and `public/terms.html` are plain
   starting drafts that match what this site actually does. Have them reviewed
   and add a contact email before collecting real sign-ups.

## Security notes

- `VITE_*` variables are compiled into the browser bundle and are **public**.
  Only the Supabase URL and anon/publishable key belong there.
- **Never** put the Supabase `service_role` key, database password, or any
  private API key in this project, in a `VITE_` variable, or in Git.
- The CSP in `vercel.json` allows scripts, styles, fonts and images from this
  site only, blocks framing (`frame-ancestors 'none'`), and allows network
  requests only to this site and Supabase. If you add a third-party service,
  update the CSP deliberately rather than loosening it with `*`.
- ESLint is configured to reject `eval`, `new Function`, `innerHTML`,
  `dangerouslySetInnerHTML`, `document.write` and inline `style` props.
- Client-side validation is for usability only. Supabase enforces the same
  rules through table constraints; add rate limiting (e.g. a Supabase Edge
  Function or Vercel Function in front of the insert, or Cloudflare Turnstile)
  before promoting the form widely.

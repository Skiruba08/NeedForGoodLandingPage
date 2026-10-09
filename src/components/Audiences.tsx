import type { ReactNode } from 'react'
import type { Role } from '../lib/waitlist'
import { Mark, type Audience } from './Mark'

interface Capability {
  title: string
  text: string
}

interface StakeholderInfo {
  id: string
  kind: Audience
  role: Role
  title: string
  lead: string
  summary: string
  capabilities: Capability[]
  cta: string
  visual: ReactNode
  flipped?: boolean
}

const STAKEHOLDERS: StakeholderInfo[] = [
  {
    id: 'nonprofits',
    kind: 'nonprofit',
    role: 'nonprofit',
    title: 'For nonprofits',
    lead: 'Spend less time searching for help, and more time on your mission.',
    summary:
      'Need for Good helps organizations find volunteers, partners, resources, and potential funding opportunities, without starting from scratch every time.',
    capabilities: [
      {
        title: 'Share what you need, in plain terms',
        text: 'Post a specific need, like drivers for Saturday deliveries or a venue for a fundraiser.',
      },
      {
        title: 'Reach people already looking to help',
        text: 'Your needs show up for nearby volunteers and businesses whose skills and resources fit.',
      },
      {
        title: 'Build relationships that last',
        text: 'Turn a one-time helper into a long-term partner you can call on again.',
      },
    ],
    cta: 'Join as a Nonprofit',
    visual: <NonprofitExample />,
  },
  {
    id: 'businesses',
    kind: 'business',
    role: 'business',
    title: 'For businesses',
    lead: 'Show up for your community in ways that actually help.',
    summary:
      'Need for Good helps companies discover meaningful ways to support local organizations and strengthen their community involvement.',
    capabilities: [
      {
        title: 'Give what you’re good at',
        text: 'Offer your team’s skills, your space, your products, or funding, whatever fits your business.',
      },
      {
        title: 'Find organizations that share your values',
        text: 'See which local groups are working on the causes your customers and team care about.',
      },
      {
        title: 'Give your team a clear way to get involved',
        text: 'Make volunteering and giving simple for employees who want to contribute.',
      },
    ],
    cta: 'Become a Community Partner',
    visual: <BusinessExample />,
    flipped: true,
  },
  {
    id: 'volunteers',
    kind: 'volunteer',
    role: 'volunteer',
    title: 'For volunteers',
    lead: 'Find the place where your time makes the biggest difference.',
    summary:
      'Need for Good helps people discover opportunities that match their interests, skills, availability, and location.',
    capabilities: [
      {
        title: 'See where help is needed near you',
        text: 'Browse real needs from organizations in your own neighborhood.',
      },
      {
        title: 'Match on what matters to you',
        text: 'Filter by cause, the skills you bring, and the hours you actually have free.',
      },
      {
        title: 'Help once, or stay for the long run',
        text: 'Pick up a single shift or become someone an organization relies on.',
      },
    ],
    cta: 'Find Opportunities',
    visual: <VolunteerExample />,
  },
]

interface AudiencesProps {
  onChooseRole: (role: Role) => void
}

export function Audiences({ onChooseRole }: AudiencesProps) {
  return (
    <>
      {STAKEHOLDERS.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className={`section stakeholder stakeholder--${s.kind}${s.flipped ? ' stakeholder--flipped' : ''}`}
          aria-labelledby={`${s.id}-label`}
        >
          <div className="wrap stakeholder__inner">
            <div className="stakeholder__copy">
              <p className="stakeholder__tag">
                <Mark kind={s.kind} size={16} />
                <span id={`${s.id}-label`}>{s.title}</span>
              </p>
              <h2 className="stakeholder__title">
                {s.lead}
              </h2>
              <p className="stakeholder__summary">{s.summary}</p>

              <a className="btn btn--dark btn--lg stakeholder__cta" href="#get-involved" onClick={() => onChooseRole(s.role)}>
                {s.cta}
              </a>
            </div>

            <figure className="stakeholder__visual">
              {s.visual}
              <figcaption className="stakeholder__caption">Example for illustration.</figcaption>
            </figure>

            <div className="stakeholder__more">
              <h3 className="stakeholder__list-title">What you’ll be able to do</h3>
              <ul className="stakeholder__caps">
                {s.capabilities.map((c) => (
                  <li key={c.title}>
                    <span className="stakeholder__cap-title">{c.title}</span>
                    <span className="stakeholder__cap-text">{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Example panels: illustrative only, no real organizations or data.  */
/* ------------------------------------------------------------------ */

function NonprofitExample() {
  return (
    <div className="example example--post">
      <p className="example__org">
        <Mark kind="nonprofit" size={14} /> Eastside Food Pantry
      </p>
      <p className="example__heading">Weekend delivery drivers</p>
      <p className="example__body">
        We deliver groceries to about a dozen homebound neighbors every Saturday morning and need
        two more drivers to keep up.
      </p>
      <ul className="chips" aria-label="Details">
        <li className="chip">Volunteers</li>
        <li className="chip">Saturdays, 9 to 11 am</li>
        <li className="chip">Eastside</li>
      </ul>
      <div className="example__also">
        <p className="example__also-label">Also open to</p>
        <p>A cargo van on loan from a local business</p>
      </div>
    </div>
  )
}

function BusinessExample() {
  const offers = [
    { title: 'Skills', text: 'Design, accounting, or legal help for a nonprofit project' },
    { title: 'Space', text: 'A meeting room or storefront for an evening event' },
    { title: 'Products', text: 'Supplies, printing, or food for a community drive' },
    { title: 'Funding', text: 'Sponsorship for a program your team believes in' },
  ]
  return (
    <div className="example example--offers">
      <p className="example__heading">Ways a business can help</p>
      <ul className="offers">
        {offers.map((o) => (
          <li key={o.title} className="offer">
            <Mark kind="business" size={12} />
            <span className="offer__title">{o.title}</span>
            <span className="offer__text">{o.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function VolunteerExample() {
  return (
    <div className="example example--match">
      <p className="example__heading">Your preferences</p>
      <dl className="prefs">
        <div>
          <dt>Cause</dt>
          <dd>Food access</dd>
        </div>
        <div>
          <dt>Skills</dt>
          <dd>Driving, Spanish</dd>
        </div>
        <div>
          <dt>Available</dt>
          <dd>Weekend mornings</dd>
        </div>
        <div>
          <dt>Distance</dt>
          <dd>Within 3 miles</dd>
        </div>
      </dl>
      <div className="match">
        <p className="match__label">A good fit</p>
        <p className="example__org">
          <Mark kind="nonprofit" size={14} /> Eastside Food Pantry
        </p>
        <p className="match__need">Weekend delivery drivers</p>
      </div>
    </div>
  )
}

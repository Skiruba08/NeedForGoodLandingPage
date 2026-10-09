import { Mark } from './Mark'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            Connecting people who want to help with the organizations that need it most.
          </h1>
          <p className="hero__lede">
            Need for Good helps nonprofits, businesses, and volunteers find one another, so a
            community’s needs turn into action close to home.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href="#get-involved">
              Get Involved
            </a>
            <a className="btn btn--ghost btn--lg" href="#how-it-works">
              Learn How It Works
            </a>
          </div>
          <ul className="legend" aria-label="Who Need for Good brings together">
            <li>
              <Mark kind="nonprofit" size={14} /> Nonprofits
            </li>
            <li>
              <Mark kind="business" size={14} /> Businesses
            </li>
            <li>
              <Mark kind="volunteer" size={14} /> Volunteers
            </li>
          </ul>
        </div>

        <figure className="hero__visual">
          <ConnectionMap />
          <figcaption className="hero__caption">
            <span className="visually-hidden">
              A map of a neighborhood where a food pantry that needs weekend delivery drivers is
              connected to a local print shop and a neighbor who is free on Saturdays.{' '}
            </span>
            Illustration. The organizations and needs shown are examples.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/**
 * Hero illustration: a neighborhood map where a nonprofit's need is linked
 * to a business and a volunteer nearby. Built from local SVG + HTML only,
 * no remote images.
 */
function ConnectionMap() {
  return (
    <div className="map" aria-hidden="true">
      <svg className="map__svg" viewBox="0 0 560 500" preserveAspectRatio="xMidYMid slice" focusable="false">
        {/* Street grid */}
        <g className="map__streets">
          <path d="M-20 92 C 140 84, 300 110, 580 96" />
          <path d="M-20 250 C 160 236, 360 262, 580 244" />
          <path d="M-20 410 C 180 420, 380 398, 580 414" />
          <path d="M96 -20 C 104 140, 88 330, 102 520" />
          <path d="M282 -20 C 274 160, 292 340, 280 520" />
          <path d="M466 -20 C 474 150, 458 350, 470 520" />
        </g>
        <g className="map__blocks">
          <rect x="118" y="112" width="140" height="112" rx="14" />
          <rect x="304" y="270" width="138" height="118" rx="14" />
          <rect x="304" y="112" width="138" height="112" rx="14" />
          <rect x="118" y="272" width="140" height="114" rx="14" />
        </g>

        {/* Other organizations and people in the area */}
        <g className="map__others">
          <circle cx="40" cy="176" r="6" />
          <circle cx="520" cy="330" r="6" />
          <rect x="226" y="438" width="12" height="12" rx="2.5" />
          <rect x="34" y="452" width="12" height="12" rx="2.5" />
          <rect x="514" y="36" width="9" height="9" rx="1.8" transform="rotate(45 518.5 40.5)" />
          <rect x="196" y="40" width="9" height="9" rx="1.8" transform="rotate(45 200.5 44.5)" />
          <circle cx="372" cy="460" r="5" />
        </g>

        {/* Connections */}
        <path pathLength={1} className="map__link map__link--a" d="M150 182 C 230 120, 330 96, 410 132" />
        <path pathLength={1} className="map__link map__link--b" d="M150 182 C 170 300, 280 372, 390 362" />

        {/* Main nodes */}
        <g className="map__node map__node--np">
          <circle className="map__halo" cx="150" cy="182" r="30" />
          <circle cx="150" cy="182" r="15" />
        </g>
        <g className="map__node map__node--biz">
          <rect className="map__halo" x="382" y="104" width="56" height="56" rx="14" />
          <rect x="396" y="118" width="28" height="28" rx="6" />
        </g>
        <g className="map__node map__node--vol">
          <rect className="map__halo" x="366" y="338" width="48" height="48" rx="10" transform="rotate(45 390 362)" />
          <rect x="378" y="350" width="24" height="24" rx="4" transform="rotate(45 390 362)" />
        </g>
      </svg>

      <div className="map__card map__card--np">
        <p className="map__card-org">
          <Mark kind="nonprofit" size={12} /> Eastside Food Pantry
        </p>
        <p className="map__card-text">Needs weekend delivery drivers</p>
      </div>
      <div className="map__card map__card--biz">
        <p className="map__card-org">
          <Mark kind="business" size={12} /> Corner Print Shop
        </p>
        <p className="map__card-text">Can print flyers for the food drive</p>
      </div>
      <div className="map__card map__card--vol">
        <p className="map__card-org">
          <Mark kind="volunteer" size={12} /> A neighbor nearby
        </p>
        <p className="map__card-text">Free on Saturdays, has a car</p>
      </div>
    </div>
  )
}

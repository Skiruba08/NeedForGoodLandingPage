const VALUES = [
  {
    title: 'Discover local needs',
    text: 'See what organizations near you are asking for, in plain terms.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="M15 15 L20.5 20.5" />
      </svg>
    ),
  },
  {
    title: 'Build meaningful partnerships',
    text: 'Find the people and businesses whose skills and resources fit.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <circle cx="8.5" cy="12" r="5" />
        <circle cx="15.5" cy="12" r="5" />
      </svg>
    ),
  },
  {
    title: 'Create measurable impact',
    text: 'Follow a need from the first request to the finished result.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <path d="M4 19 L4 13" />
        <path d="M10 19 L10 9" />
        <path d="M16 19 L16 5" />
        <path d="M3 21 L21 21" />
      </svg>
    ),
  },
]

export function MissionStrip() {
  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="wrap mission__inner">
        <h2 id="mission-title" className="mission__title">
          Built to make community impact easier, more visible, and more connected.
        </h2>
        <ul className="mission__values">
          {VALUES.map((value) => (
            <li key={value.title} className="mission__value">
              <span className="mission__icon">{value.icon}</span>
              <h3 className="mission__value-title">{value.title}</h3>
              <p>{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

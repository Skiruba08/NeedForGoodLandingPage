const GOALS = [
  'More organizations connected',
  'More volunteer hours unlocked',
  'More community partnerships created',
  'More resources directed where they are needed',
]

export function Vision() {
  return (
    <section className="vision" aria-labelledby="vision-title">
      <div className="wrap vision__inner">
        <h2 id="vision-title" className="visually-hidden">Our vision</h2>
        <blockquote className="vision__quote">
          <p>
            Imagine a city where organizations don’t struggle alone to find support, and where
            everyone can easily see how they can contribute.
          </p>
        </blockquote>
        <div className="vision__goals">
          <p className="vision__goals-lead">What we’re working toward</p>
          <ul>
            {GOALS.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

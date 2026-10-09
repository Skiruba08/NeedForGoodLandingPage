const UNKNOWNS = [
  'where help is needed',
  'which organizations to trust',
  'how their skills can be useful',
  'how to create long-term impact',
]

export function WhyNeedForGood() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="wrap why__inner">
        <div className="why__copy">
          <h2 id="why-title" className="section-title">Why Need for Good</h2>
          <p>
            Community organizations often need volunteers, funding, expertise, or partnerships. But
            finding the right people is fragmented and time-consuming: a post here, an email chain
            there, a contact who moved on.
          </p>
          <p>
            Meanwhile, plenty of people and businesses want to help. They just don’t have a clear
            way in.
          </p>
        </div>
        <div className="why__panel">
          <p className="why__panel-lead">People who want to help often don’t know</p>
          <ul className="why__list">
            {UNKNOWNS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="why__bridge">
            Need for Good is the bridge between community needs and the resources that already
            exist to meet them.
          </p>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  {
    title: 'Discover',
    text: 'Nonprofits share their needs, opportunities, and initiatives.',
  },
  {
    title: 'Connect',
    text: 'Volunteers and businesses find causes that align with their skills, resources, and goals.',
  },
  {
    title: 'Make an Impact',
    text: 'Communities collaborate to turn needs into real-world outcomes.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section how" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="how-title" className="section-title">How it works</h2>
          <p className="section-intro">
            Three steps from “we need help” to “it got done.”
          </p>
        </div>
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step__num" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="step__title">
                <span className="visually-hidden">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="step__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

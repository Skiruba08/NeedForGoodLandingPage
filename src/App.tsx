import { useState } from 'react'
import { About } from './components/About'
import { Audiences } from './components/Audiences'
import { Footer } from './components/Footer'
import { GetInvolved } from './components/GetInvolved'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { MissionStrip } from './components/MissionStrip'
import { Vision } from './components/Vision'
import { WhyNeedForGood } from './components/WhyNeedForGood'
import type { Role } from './lib/waitlist'

export default function App() {
  // Shared so the audience buttons can pre-select a role in the sign-up form.
  const [role, setRole] = useState<Role | ''>('')

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <MissionStrip />
        <HowItWorks />
        <Audiences onChooseRole={setRole} />
        <WhyNeedForGood />
        <Vision />
        <GetInvolved role={role} onRoleChange={setRole} />
        <About />
      </main>
      <Footer />
    </>
  )
}

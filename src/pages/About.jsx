import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  Compass,
  HeartHandshake,
  Info,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { faqs, howItWorks, stats, team } from '../data/site'
import Icon from '../components/Icon'
import { SectionHead } from '../components/ui'

const values = [
  {
    icon: Compass,
    title: 'Guidance, not hype',
    body: 'No “get a 40 LPA job in 30 days”. We show the real requirement list, an honest difficulty rating and a plan that fits the time you actually have.',
  },
  {
    icon: Target,
    title: 'Skills over certificates',
    body: 'A deployed project with a clear README beats another course certificate. Every roadmap ends in something you can build and show.',
  },
  {
    icon: Users,
    title: 'Built for every college',
    body: 'Students outside the top-tier campuses get the least career support and need it most. Tier-2 and tier-3 colleges are the default here, not an afterthought.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest about AI',
    body: 'If a feature runs on a real model, we say so. If it runs on rules in demo mode, we say that too. No static chatbot pretending to be intelligence.',
  },
  {
    icon: HeartHandshake,
    title: 'Free for students',
    body: 'Funded by college partnerships and hiring partners, not by charging students who cannot afford it.',
  },
  {
    icon: Sparkles,
    title: 'Measured progress',
    body: 'Every topic you complete is tracked. Progress you can see is what keeps a two-year plan alive in week three.',
  },
]

export default function About() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <section className="page-head" style={{ paddingBottom: 48 }}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span>
          </div>
          <span className="eyebrow">About SkillBridge</span>
          <h1>Career guidance that tells students the truth</h1>
          <p>
            Most students do not lack ambition — they lack a map. SkillBridge exists to turn “I should learn something in
            tech” into a specific role, a specific skill list and a specific thing to build this week.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 44 }}>
            <div>
              <span className="eyebrow">Why we built it</span>
              <h2 className="h2">The gap was never talent. It was information.</h2>
              <p className="section-sub">
                Ask ten second-year students what a data analyst does and you will get ten different answers. Meanwhile the
                job description is public, the required skills are public, and the free learning material is public. The
                missing piece is the translation layer between a syllabus and a hiring bar.
              </p>
              <p className="section-sub">
                SkillBridge is that layer: a career catalogue written from real job descriptions, roadmaps that assume no
                prior industry exposure, and projects designed to produce evidence rather than certificates.
              </p>
              <div className="row gap-12 mt-24 wrap">
                <Link to="/careers" className="btn btn-primary">
                  Explore career tracks <ArrowRight size={16} />
                </Link>
                <Link to="/register" className="btn btn-ghost">
                  Create a free account
                </Link>
              </div>
            </div>

            <div className="card card-pad" style={{ background: 'var(--forest)', color: 'var(--paper)', border: '1px solid var(--ink)' }}>
              <h3 className="h4" style={{ color: 'var(--paper)', marginBottom: 16, fontSize: '1.5rem' }}>
                What we will never do
              </h3>
              <ul className="opp-list dark">
                <li>
                  <Info size={14} style={{ color: 'var(--sage)' }} /> Promise a placement or a salary figure
                </li>
                <li>
                  <Info size={14} style={{ color: 'var(--sage)' }} /> Sell your data to recruiters without asking
                </li>
                <li>
                  <Info size={14} style={{ color: 'var(--sage)' }} /> Pretend a rule-based demo is a live AI model
                </li>
                <li>
                  <Info size={14} style={{ color: 'var(--sage)' }} /> Paywall the basics behind a “pro” tier
                </li>
              </ul>
              <div className="alert mt-24" style={{ background: 'rgba(246,242,233,0.07)', border: '1px solid rgba(246,242,233,0.16)', color: 'rgba(246,242,233,0.82)', fontSize: '0.78rem' }}>
                <Info size={14} style={{ flex: 'none', marginTop: 2 }} />
                <span>
                  This site is a demonstration product. Salary ranges are indicative averages, students in the testimonials are
                  illustrative, and the AI assistant runs in a labelled demo mode without an API key.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <SectionHead eyebrow="What we believe" title="Six principles we build against" />
          <div className="value-grid">
            {values.map((v) => (
              <div className="card value-card card-hover" key={v.title}>
                <span className="v-icon">
                  <v.icon size={20} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <SectionHead eyebrow="How it works" title="From unsure to interview-ready in five steps" />
          <div className="steps-grid">
            {howItWorks.map((s) => (
              <div className="step-card" key={s.step}>
                <div className="step-num">{s.step}</div>
                <div className="step-icon">
                  <Icon name={s.icon} size={19} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-block" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
                <em>{s.sub}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="container">
          <SectionHead
            eyebrow="The team"
            title="Small team, obsessive about student outcomes"
            sub="Illustrative profiles for this demonstration build."
          />
          <div className="team-grid">
            {team.map((m) => (
              <div className="card team-card card-hover" key={m.name}>
                <span className="avatar avatar-lg">{m.initials}</span>
                <strong>{m.name}</strong>
                <span>{m.role}</span>
                <em>{m.note}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-grey" id="faq">
        <div className="container" style={{ maxWidth: 880 }}>
          <SectionHead eyebrow="FAQ" title="Questions students actually ask" />
          <div>
            {faqs.map((f, i) => (
              <div className="faq-item" key={f.q}>
                <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  {f.q}
                  <ChevronDown size={18} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flex: 'none', color: 'var(--grey-400)' }} />
                </button>
                {openFaq === i && <p className="faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Start with one honest question</h2>
            <p>What does the role I want actually require? Answer that, and the next twelve weeks plan themselves.</p>
            <div className="ctas">
              <Link to="/skill-gap" className="btn btn-white btn-lg">
                Analyze my skills <ArrowRight size={17} />
              </Link>
              <Link to="/careers" className="btn btn-outline-white btn-lg">
                Browse career tracks
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

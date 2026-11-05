import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import { careers } from '../data/careers'
import { popularSkills } from '../data/skills'
import { howItWorks, stats, testimonials } from '../data/site'
import CareerCard from '../components/CareerCard'
import Icon from '../components/Icon'

const colleges = ['SPIT Mumbai', 'VIT Vellore', 'NIT Trichy', 'COEP Pune', 'IIIT Hyderabad', 'BITS Pilani']

function Intro({ n, label, title, sub, action }) {
  return (
    <div className="section-head left" style={{ maxWidth: 'none', marginBottom: 46 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 700 }}>
          <span className="eyebrow">
            {n} — {label}
          </span>
          <h2 className="h2">{title}</h2>
          {sub && <p className="section-sub" style={{ marginTop: 14 }}>{sub}</p>}
        </div>
        {action}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="hero-badge">
              <span className="pill">New</span>
              AI skill-gap analysis is live
            </span>

            <h1>
              Build Skills.
              <br />
              Discover Opportunities.
              <br />
              <span className="grad">Shape Your Future.</span>
            </h1>

            <p className="hero-sub">
              Your AI-powered companion for career growth, skill development and placement preparation.
            </p>

            <div className="hero-ctas">
              <Link to="/careers" className="btn btn-primary btn-lg">
                Explore Careers <ArrowRight size={17} />
              </Link>
              <Link to="/register" className="btn btn-ghost btn-lg">
                Get Started
              </Link>
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <strong>48,000+</strong>
                <span>Students</span>
              </div>
              <div className="hero-meta-item">
                <strong>07</strong>
                <span>Career tracks</span>
              </div>
              <div className="hero-meta-item">
                <strong>320</strong>
                <span>Colleges</span>
              </div>
              <div className="hero-meta-item">
                <strong>4.8</strong>
                <span>Rating / 5</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mock-window">
              <div className="mock-bar">
                <span className="mock-dot red" />
                <span className="mock-dot amber" />
                <span className="mock-dot green" />
                <span className="mock-title">skillbridge.in / dashboard</span>
              </div>

              <div className="mock-body">
                <div className="mock-row">
                  <span className="mock-label">Target role</span>
                  <span className="mock-value">Frontend Engineer</span>
                </div>

                <div className="mock-card">
                  <div className="mock-row">
                    <span className="mock-label">Skill readiness</span>
                    <span className="mock-value num">68%</span>
                  </div>
                  <div className="mock-progress">
                    <i style={{ width: '68%' }} />
                  </div>
                  <div className="mock-tags">
                    <span className="mock-tag">React ✓</span>
                    <span className="mock-tag">JavaScript ✓</span>
                    <span className="mock-tag dim">TypeScript</span>
                    <span className="mock-tag dim">Testing</span>
                  </div>
                </div>

                <div className="mock-card">
                  <div className="mock-row">
                    <span className="mock-label">This week</span>
                    <span className="mock-value num">3 / 4 topics</span>
                  </div>
                  <div className="mock-progress">
                    <i style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="mock-row">
                  <span className="mock-label">Next action</span>
                  <span className="mock-value" style={{ color: 'var(--accent-ink)' }}>Build a REST API →</span>
                </div>
              </div>
            </div>

            <div className="float-card one">
              <span className="fc-icon green">
                <BadgeCheck size={13} />
              </span>
              <div>
                <strong>Skill gap closed</strong>
                <span>SQL · 3 weeks</span>
              </div>
            </div>

            <div className="float-card two">
              <span className="fc-icon">
                <Sparkles size={13} />
              </span>
              <div>
                <strong>Roadmap ready</strong>
                <span>18 topics · 96 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------- logo strip */}
        <div className="logo-strip">
          <div className="container logo-strip-inner">
            <p>Students from</p>
            {colleges.map((c) => (
              <span className="logo-item" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- career paths */}
      <section className="section" style={{ paddingTop: 80 }}>
        <div className="container">
          <Intro
            n="01"
            label="Career paths"
            title="Pick a direction with real hiring behind it"
            sub="Every track lists the skills employers screen for, an indicative salary band and an honest difficulty rating — no inflated promises."
            action={
              <Link to="/careers" className="link-arrow">
                All 7 tracks <ArrowUpRight size={15} />
              </Link>
            }
          />

          <div className="career-grid">
            {careers.slice(0, 6).map((c, i) => (
              <CareerCard career={c} index={i + 1} key={c.id} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- skills */}
      <section className="section section-paper">
        <div className="container">
          <Intro
            n="02"
            label="In demand"
            title="The skills that are actually being hired for"
            sub="Opening counts are indicative across Indian job boards this quarter; the trend is year-on-year growth in postings."
          />

          <div className="skill-marquee">
            {popularSkills.map((s) => (
              <span className="skill-pill" key={s.id}>
                {s.name}
                <span className="trend">
                  <TrendingUp size={10} style={{ display: 'inline', marginRight: 3, verticalAlign: '-1px' }} />
                  {s.trend}
                </span>
                <span className="jobs">{s.jobs}</span>
              </span>
            ))}
          </div>

          <div className="mt-32">
            <Link to="/skill-gap" className="link-arrow">
              Check which of these you already have <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how it works */}
      <section className="section" id="how">
        <div className="container">
          <Intro
            n="03"
            label="Method"
            title="Five steps from unsure to interview-ready"
            sub="No entrance test, no paid unlock — just a structured plan that adapts to where you actually are."
          />

          <div className="steps-grid">
            {howItWorks.map((s) => (
              <div className="step-card" key={s.step}>
                <div className="step-num">{s.step}</div>
                <div className="step-icon">
                  <Icon name={s.icon} size={17} />
                </div>
                <div>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ AI feature */}
      <section className="section section-paper">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 64 }}>
            <div>
              <span className="eyebrow">04 — Skill gap analyzer</span>
              <h2 className="h2">Know exactly what stands between you and the role</h2>
              <p className="section-sub" style={{ maxWidth: 520 }}>
                Add your current skills and a target role. SkillBridge scores your coverage against that role's real
                requirements, ranks the missing skills by hiring weight, and builds a six-week plan around them.
              </p>

              <ul className="opp-list mt-24">
                <li>
                  <CheckCircle2 size={14} /> Weighted match score — core skills count more than bonus ones
                </li>
                <li>
                  <CheckCircle2 size={14} /> Missing skills ranked by how often recruiters screen for them
                </li>
                <li>
                  <CheckCircle2 size={14} /> Roadmap topics and free resources mapped to each gap
                </li>
                <li>
                  <CheckCircle2 size={14} /> Honest about limits: guidance, not a placement guarantee
                </li>
              </ul>

              <div className="row gap-12 mt-32 wrap">
                <Link to="/skill-gap" className="btn btn-primary">
                  Analyze my skills <ArrowRight size={16} />
                </Link>
                <Link to="/assistant" className="btn btn-ghost">
                  <Sparkles size={15} /> Ask the assistant
                </Link>
              </div>
            </div>

            <div className="score-card">
              <div className="row" style={{ justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <h3>AI / ML Engineer</h3>
                  <p className="sub">Target role · 7 requirements</p>
                </div>
                <span className="badge" style={{ borderColor: 'rgba(246,242,233,0.3)', color: 'rgba(246,242,233,0.7)' }}>
                  Building
                </span>
              </div>

              <div className="score-main">
                <div className="score-ring" style={{ width: 120, height: 120 }}>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(246,242,233,0.16)" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#c99a3f"
                      strokeWidth="8"
                      strokeLinecap="butt"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - 0.43)}
                    />
                  </svg>
                  <div className="ring-label">
                    <div>
                      <strong>43%</strong>
                      <span>match</span>
                    </div>
                  </div>
                </div>

                <div className="score-facts">
                  {[
                    ['#d1461c', 'PyTorch', '92% weight'],
                    ['#c99a3f', 'MLOps', '74% weight'],
                    ['#a9c3b1', 'Linear algebra', '61% weight'],
                  ].map(([color, name, weight]) => (
                    <div key={name}>
                      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: '0.84rem' }}>{name}</span>
                        <span className="mono" style={{ color: 'rgba(246,242,233,0.45)', fontSize: '9.5px' }}>
                          {weight}
                        </span>
                      </div>
                      <div style={{ height: 3, background: 'rgba(246,242,233,0.14)' }}>
                        <div style={{ height: '100%', width: weight, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mono" style={{ color: 'rgba(246,242,233,0.42)', marginTop: 24, fontSize: '9.5px', lineHeight: 1.7 }}>
                Demo illustration. Run the analyzer yourself — the score is calculated from your inputs, not sampled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- stats */}
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

      {/* ---------------------------------------------------- testimonials */}
      <section className="section">
        <div className="container">
          <Intro
            n="05"
            label="Student stories"
            title="What changed for students who stuck with the plan"
            sub="Names and colleges are illustrative of the kind of student SkillBridge is built for."
          />

          <div className="testimonial-grid">
            {testimonials.slice(0, 3).map((t) => (
              <article className="testimonial-card" key={t.id}>
                <div className="stars" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < t.rating ? 'currentColor' : 'none'} strokeWidth={1.5} />
                  ))}
                </div>
                <Quote size={16} style={{ color: 'var(--accent)', marginBottom: 12 }} />
                <blockquote>{t.quote}</blockquote>
                <div className="testimonial-person">
                  <span className="avatar" style={{ background: 'var(--ink)' }}>
                    {t.initials}
                  </span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.college}</span>
                    <em>{t.role}</em>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="row gap-24 mt-32 wrap">
            <span className="row gap-8 small muted">
              <Users size={14} /> 48,000+ students
            </span>
            <span className="row gap-8 small muted">
              <GraduationCap size={14} /> 320+ colleges
            </span>
            <span className="row gap-8 small muted">
              <TrendingUp size={14} /> 7 career tracks
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CTA band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <div>
              <span className="badge" style={{ borderColor: 'rgba(246,242,233,0.3)', color: 'rgba(246,242,233,0.7)' }}>
                <Sparkles size={10} /> Free for students
              </span>
              <h2>Your placement season starts earlier than you think</h2>
              <p>
                Two minutes to set up, one clear roadmap out. Start with a career track, or run the skill gap analyzer and
                let it decide what you should learn first.
              </p>
            </div>
            <div className="ctas">
              <Link to="/register" className="btn btn-white">
                Create account <ArrowRight size={16} />
              </Link>
              <Link to="/roadmaps" className="btn btn-outline-white">
                Browse roadmaps
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

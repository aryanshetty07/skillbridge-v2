import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Compass, Home as HomeIcon, MessageSquare } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="page" style={{ paddingTop: 'calc(var(--nav-h) + 60px)', paddingBottom: 100 }}>
      <div className="container center" style={{ maxWidth: 620 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 14vw, 9rem)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: 'var(--accent)',
            lineHeight: 1,
          }}
        >
          404
        </div>
        <h1 className="h2 mt-16">This page is not on the roadmap</h1>
        <p className="section-sub">
          The link may be outdated, or the page may have moved. Nothing is broken — you just took a wrong turn.
        </p>

        <div className="row gap-12 mt-32 wrap" style={{ justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <HomeIcon size={16} /> Back to home
          </Link>
          <Link to="/careers" className="btn btn-ghost">
            <Compass size={16} /> Explore careers
          </Link>
          <Link to="/assistant" className="btn btn-ghost">
            <MessageSquare size={16} /> Ask the assistant
          </Link>
        </div>

        <div className="grid-3 mt-48" style={{ textAlign: 'left' }}>
          {[
            { to: '/skill-gap', t: 'Skill Gap Analyzer', d: 'See what you are missing for a role' },
            { to: '/roadmaps', t: 'Learning Paths', d: 'Level-wise roadmaps with progress' },
            { to: '/projects', t: 'Project Hub', d: '36 briefs with build guides' },
          ].map((l) => (
            <Link to={l.to} className="card card-pad card-hover" key={l.to} style={{ display: 'block' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem' }}>{l.t}</strong>
              <span className="tiny muted" style={{ display: 'block', marginTop: 4, lineHeight: 1.5 }}>
                {l.d}
              </span>
              <span className="link-arrow mt-8" style={{ fontSize: '0.8rem' }}>
                Open <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>

        <Link to="/" className="link-arrow mt-32" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={14} /> Return to SkillBridge
        </Link>
      </div>
    </section>
  )
}

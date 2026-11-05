import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Info,
  Lightbulb,
  Route as RouteIcon,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { getCareer, salaryNote } from '../data/careers'
import { getRoadmap } from '../data/roadmaps'
import { requiredSkillsFor } from '../services/analyzer'
import Icon from '../components/Icon'
import { Badge, DifficultyMeter } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { useToast } from '../context/ToastContext'
import NotFound from './NotFound'

const levelTone = { core: 'purple', important: 'blue', bonus: 'default' }

export default function CareerDetail() {
  const { careerId } = useParams()
  const career = getCareer(careerId)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { setGoal, goal, addNotification } = useProgress()
  const toast = useToast()

  if (!career) return <NotFound />

  const roadmap = getRoadmap(career.id)
  const required = requiredSkillsFor(career.id)
  const totalTopics = roadmap.levels.reduce((n, l) => n + l.topics.length, 0)

  const handleSetGoal = () => {
    if (!isAuthenticated) {
      toast.info('Sign in to save this as your career goal')
      navigate('/login', { state: { from: `/careers/${career.id}` } })
      return
    }
    setGoal(career.id)
    addNotification('Career goal updated', `Your dashboard now tracks progress towards ${career.title}.`)
    toast.success(`${career.title} is now your career goal`)
  }

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <Link to="/careers">Careers</Link> <span>/</span> <span>{career.title}</span>
          </div>

          <div className="row gap-16 wrap" style={{ marginTop: 20 }}>
            <div className="career-icon" style={{ marginBottom: 0 }}>
              <Icon name={career.icon} size={24} />
            </div>
            <div>
              <Badge tone="purple">{career.category}</Badge>
              <h1>{career.title}</h1>
            </div>
          </div>

          <p className="lede">{career.description}</p>

          <div className="detail-badges">
            <span className="badge">
              <TrendingUp size={12} /> Demand: {career.demand}
            </span>
            <span className="badge">
              <BarChart3 size={12} /> {career.growth}
            </span>
            <span className="badge">
              <Clock size={12} /> {totalTopics} roadmap topics
            </span>
            <span className="badge">
              <BriefcaseBusiness size={12} /> Entry: {career.salary.entry}
            </span>
          </div>

          <div className="row gap-12 mt-32 wrap">
            <Link to={`/roadmaps?career=${career.id}`} className="btn btn-primary">
              <RouteIcon size={17} /> Start the learning path
            </Link>
            <Link to={`/skill-gap?role=${career.id}`} className="btn btn-ghost">
              <Sparkles size={16} /> Analyze my skill gap
            </Link>
            <button type="button" className="btn btn-ghost" onClick={handleSetGoal}>
              <Target size={16} /> {goal === career.id ? 'This is your goal' : 'Set as my goal'}
            </button>
          </div>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 40 }}>
        <div className="container">
          <Link to="/careers" className="link-arrow mb-24" style={{ display: 'inline-flex' }}>
            <ArrowLeft size={15} /> Back to all careers
          </Link>

          <div className="detail-grid">
            <div>
              <div className="card detail-section">
                <h2>
                  <Icon name="Target" size={19} /> Required skills
                </h2>
                <p style={{ marginBottom: 18 }}>
                  Ranked by how much each skill affects your shortlisting. Core skills are screened in almost every
                  interview; bonus skills make you stand out but rarely disqualify you.
                </p>
                <div className="skill-table">
                  {required.map((s) => (
                    <div className="skill-row" key={s.id}>
                      <span className="name">{s.name}</span>
                      <Badge tone={levelTone[s.level]}>{s.levelLabel}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card detail-section">
                <h2>
                  <Lightbulb size={19} /> A typical day
                </h2>
                <ul className="opp-list">
                  {career.dayInLife.map((d) => (
                    <li key={d}>
                      <CheckCircle2 size={16} /> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card detail-section">
                <h2>
                  <BriefcaseBusiness size={19} /> Career opportunities
                </h2>
                <p style={{ marginBottom: 16 }}>
                  Where this role leads in the Indian market, from first job to specialisation:
                </p>
                <ul className="opp-list">
                  {career.opportunities.map((o) => (
                    <li key={o}>
                      <CheckCircle2 size={16} /> {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card detail-section">
                <h2>
                  <Icon name="Wrench" size={19} /> Tools you will use
                </h2>
                <div className="tool-tags">
                  {career.tools.map((t) => (
                    <span className="career-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <div className="card side-card">
                <h3>At a glance</h3>

                <div className="salary-block">
                  <div className="salary-item">
                    <span>Entry level (0–2 yrs)</span>
                    <strong>{career.salary.entry}</strong>
                  </div>
                  <div className="salary-item">
                    <span>Mid level (3–5 yrs)</span>
                    <strong>{career.salary.mid}</strong>
                  </div>
                  <div className="salary-item">
                    <span>Senior (6+ yrs)</span>
                    <strong>{career.salary.senior}</strong>
                  </div>
                </div>

                <div className="alert alert-warn mt-16" style={{ fontSize: '0.76rem', padding: '10px 12px' }}>
                  <Info size={14} style={{ flex: 'none', marginTop: 1 }} />
                  <span>Indicative ranges, not offers. Actual pay depends on city, company and portfolio.</span>
                </div>

                <div className="divider" style={{ margin: '20px 0' }} />

                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className="small muted">Learning difficulty</span>
                  <span className="small strong">{career.difficulty}</span>
                </div>
                <DifficultyMeter score={career.difficultyScore} />

                <div className="divider" style={{ margin: '20px 0' }} />

                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="small muted">Hiring demand</span>
                  <Badge tone={career.demand === 'Very High' ? 'green' : 'blue'}>{career.demand}</Badge>
                </div>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="small muted">Growth</span>
                  <span className="small strong">{career.growth.replace(' (indicative)', '')}</span>
                </div>

                <Link to={`/roadmaps?career=${career.id}`} className="btn btn-dark btn-block mt-24">
                  View roadmap <ArrowRight size={16} />
                </Link>
              </div>

              <div className="card side-card mt-24" style={{ position: 'static' }}>
                <h3>Related roles</h3>
                {career.related.map((id) => {
                  const rel = getCareer(id)
                  if (!rel) return null
                  return (
                    <Link to={`/careers/${rel.id}`} className="mini-career" key={id} style={{ textDecoration: 'none' }}>
                      <span className="mc-icon">
                        <Icon name={rel.icon} size={16} />
                      </span>
                      <div style={{ flex: 1 }}>
                        <strong>{rel.title}</strong>
                        <span>{rel.salary.entry} · {rel.difficulty}</span>
                      </div>
                      <ArrowRight size={15} style={{ color: 'var(--grey-400)' }} />
                    </Link>
                  )
                })}
              </div>
            </aside>
          </div>

          <p className="tiny muted mt-32" style={{ maxWidth: 720, lineHeight: 1.6 }}>
            {salaryNote}
          </p>
        </div>
      </section>
    </>
  )
}

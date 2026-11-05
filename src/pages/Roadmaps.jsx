import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  ExternalLink,
  Info,
  Layers,
  Lock,
  Route as RouteIcon,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { careers } from '../data/careers'
import { getRoadmap } from '../data/roadmaps'
import Icon from '../components/Icon'
import { Badge, ProgressBar } from '../components/ui'
import { useProgress } from '../context/ProgressContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const typeIcon = {
  course: BookOpen,
  doc: BookOpen,
  video: BookOpen,
  practice: Sparkles,
  book: BookOpen,
  repo: BookOpen,
  blog: BookOpen,
}

export default function Roadmaps() {
  const [params, setParams] = useSearchParams()
  const { isAuthenticated, user } = useAuth()
  const { completedTopics, toggleTopic, goal } = useProgress()
  const toast = useToast()

  const initial = params.get('career') || goal || 'web-developer'
  const [careerId, setCareerId] = useState(initial)
  const [levelId, setLevelId] = useState('beginner')

  useEffect(() => {
    const q = params.get('career')
    if (q) setCareerId(q)
  }, [params])

  const roadmap = useMemo(() => getRoadmap(careerId), [careerId])
  const career = careers.find((c) => c.id === careerId)

  const total = roadmap.levels.reduce((n, l) => n + l.topics.length, 0)
  const done = roadmap.levels.reduce((n, l) => n + l.topics.filter((t) => completedTopics.includes(t.id)).length, 0)
  const overall = total ? Math.round((done / total) * 100) : 0

  const level = roadmap.levels.find((l) => l.id === levelId) || roadmap.levels[0]
  const levelDone = level.topics.filter((t) => completedTopics.includes(t.id)).length

  const chooseCareer = (id) => {
    setCareerId(id)
    setLevelId('beginner')
    setParams({ career: id }, { replace: true })
  }

  const handleToggle = (topic) => {
    toggleTopic(topic.id, topic.title)
    const wasDone = completedTopics.includes(topic.id)
    if (!wasDone) {
      const newCount = levelDone + 1
      if (newCount === level.topics.length) toast.success(`Level complete: ${level.label} — nice work.`)
      else toast.success('Topic marked complete')
    }
  }

  const totalHours = roadmap.levels.reduce((sum, l) => sum + l.topics.reduce((s, t) => s + t.hours, 0), 0)

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Learning Paths</span>
          </div>
          <span className="eyebrow">Learning roadmaps</span>
          <h1>Structured paths, not random tutorials</h1>
          <p>
            Three levels per career, with the topics, hours and free resources that actually matter. Tick topics off as you
            go — your progress is saved on this device.
          </p>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="roadmap-layout">
            {/* ------------------------------------------------- sidebar */}
            <aside className="card roadmap-side">
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <h3 className="h4">Career path</h3>
                <Badge tone="purple">{careers.length} tracks</Badge>
              </div>

              <div className="side-nav">
                {careers.map((c) => {
                  const r = getRoadmap(c.id)
                  const count = r.levels.reduce((n, l) => n + l.topics.length, 0)
                  const my = r.levels.reduce((n, l) => n + l.topics.filter((t) => completedTopics.includes(t.id)).length, 0)
                  return (
                    <button
                      type="button"
                      key={c.id}
                      className={`side-nav-item ${careerId === c.id ? 'active' : ''}`}
                      onClick={() => chooseCareer(c.id)}
                    >
                      <Icon name={c.icon} size={16} />
                      <span style={{ flex: 1 }}>{c.title}</span>
                      <span className="tiny muted" style={{ fontWeight: 500 }}>
                        {my}/{count}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="divider" style={{ margin: '16px 0' }} />

              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="small muted">Overall progress</span>
                <strong className="small">{overall}%</strong>
              </div>
              <ProgressBar value={overall} />

              <div className="alert alert-info mt-16" style={{ fontSize: '0.75rem', padding: '10px 12px' }}>
                <Info size={13} style={{ flex: 'none', marginTop: 2 }} />
                <span>
                  {isAuthenticated
                    ? `Saved to your account${user?.name ? `, ${user.name.split(' ')[0]}` : ''}. Progress is stored in this browser.`
                    : 'Progress is saved in this browser. Sign in to keep it tied to your account.'}
                </span>
              </div>

              {!isAuthenticated && (
                <Link to="/register" className="btn btn-dark btn-block btn-sm mt-16">
                  Save my progress
                </Link>
              )}
            </aside>

            {/* --------------------------------------------------- main */}
            <div>
              <div className="roadmap-head-card">
                <div className="row gap-12 wrap" style={{ position: 'relative', marginBottom: 12 }}>
                  <div className="career-icon" style={{ marginBottom: 0 }}>
                    <Icon name={career?.icon || 'Route'} size={22} />
                  </div>
                  <Badge tone="purple">{career?.category || 'Track'}</Badge>
                </div>
                <h1>{roadmap.title}</h1>
                <p>{roadmap.summary}</p>

                <div className="roadmap-progress-row">
                  <div className="progress">
                    <div className="progress-bar" style={{ width: `${overall}%` }} />
                  </div>
                  <strong>
                    {done}/{total} topics
                  </strong>
                  <span className="badge">
                    <Clock size={11} /> ~{totalHours} hrs
                  </span>
                </div>
              </div>

              <div className="level-tabs">
                {roadmap.levels.map((l, i) => {
                  const lDone = l.topics.filter((t) => completedTopics.includes(t.id)).length
                  const pct = Math.round((lDone / l.topics.length) * 100)
                  const locked = false
                  return (
                    <button
                      type="button"
                      key={l.id}
                      className={`level-tab ${levelId === l.id ? 'active' : ''}`}
                      onClick={() => setLevelId(l.id)}
                    >
                      <span className="lt-label">
                        {pct === 100 ? <Trophy size={14} style={{ color: 'var(--emerald-500)' }} /> : <Layers size={14} style={{ color: 'var(--purple-600)' }} />}
                        {l.label}
                        {locked && <Lock size={12} />}
                      </span>
                      <span className="lt-meta">
                        {l.weeks} · {lDone}/{l.topics.length} done
                      </span>
                      <span className="lt-bar">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="card card-pad mb-24" style={{ background: 'var(--card)', borderColor: 'var(--line)' }}>
                <div className="row gap-12">
                  <span className="career-icon" style={{ marginBottom: 0, width: 38, height: 38 }}>
                    <RouteIcon size={18} />
                  </span>
                  <div>
                    <div className="tiny" style={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--purple-700)' }}>
                      Goal for {level.label.toLowerCase()}
                    </div>
                    <p className="small" style={{ marginTop: 3, color: 'var(--grey-700)' }}>{level.goal}</p>
                  </div>
                </div>
              </div>

              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                <h2 className="h3">
                  {level.label} topics
                  <span className="small muted" style={{ fontWeight: 500, marginLeft: 8 }}>
                    {levelDone}/{level.topics.length} completed
                  </span>
                </h2>
                <Link to={`/projects`} className="link-arrow">
                  Pair this with a project <ArrowRight size={14} />
                </Link>
              </div>

              <div className="topic-list">
                {level.topics.map((topic) => {
                  const isDone = completedTopics.includes(topic.id)
                  return (
                    <article className={`topic-card ${isDone ? 'done' : ''}`} key={topic.id}>
                      <div className="topic-head">
                        <button
                          type="button"
                          className={`topic-check ${isDone ? 'on' : ''}`}
                          onClick={() => handleToggle(topic)}
                          aria-pressed={isDone}
                          aria-label={isDone ? `Mark ${topic.title} as not complete` : `Mark ${topic.title} as complete`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </button>

                        <div className="topic-main">
                          <h3>{topic.title}</h3>
                          <p>{topic.summary}</p>

                          <div className="topic-meta">
                            <span>
                              <Clock size={12} /> ~{topic.hours} hours
                            </span>
                            <span>
                              <BookOpen size={12} /> {topic.resources.length} resource{topic.resources.length > 1 ? 's' : ''}
                            </span>
                            {isDone && <span style={{ color: 'var(--emerald-500)', fontWeight: 600 }}>Completed</span>}
                          </div>
                        </div>
                      </div>

                      <div className="topic-resources">
                        {topic.resources.map((r) => {
                          const RIcon = typeIcon[r.type] || ExternalLink
                          return (
                            <a className="resource-link" href={r.url} target="_blank" rel="noreferrer" key={r.title}>
                              <RIcon size={12} /> {r.title} <ExternalLink size={10} />
                            </a>
                          )
                        })}
                      </div>
                    </article>
                  )
                })}
              </div>

              {levelDone === level.topics.length && (
                <div className="alert alert-success mt-24">
                  <Trophy size={16} style={{ flex: 'none', marginTop: 2 }} />
                  <span>
                    <strong>Level complete.</strong>{' '}
                    {roadmap.levels.findIndex((l) => l.id === level.id) < roadmap.levels.length - 1
                      ? 'Move to the next level when you can explain every topic here without notes.'
                      : 'You have finished this path. Time to build something with it and start applying.'}
                  </span>
                </div>
              )}

              <div className="row gap-12 mt-32 wrap">
                <Link to={`/skill-gap?role=${careerId}`} className="btn btn-primary">
                  <Sparkles size={16} /> Recheck my skill gap
                </Link>
                <Link to={`/careers/${careerId}`} className="btn btn-ghost">
                  Role details <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Compass,
  Flame,
  FolderGit2,
  Route as RouteIcon,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { getCareer } from '../data/careers'
import { getProject } from '../data/projects'
import { getRoadmap } from '../data/roadmaps'
import { prepTasks } from '../data/placement'
import { skillName } from '../data/skills'
import { requiredSkillsFor } from '../services/analyzer'
import { ProgressRing } from '../components/charts'
import Icon from '../components/Icon'
import { Badge, EmptyState, ProgressBar, StatCard } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { timeAgo, todayLabel } from '../utils/storage'

export default function Dashboard() {
  const { user } = useAuth()
  const {
    goal,
    gapReport,
    skills,
    completedTopics,
    savedProjects,
    prepTasks: donePrep,
    aptitude,
    activities,
    notifications,
    unreadCount,
    markNotificationsRead,
  } = useProgress()

  const career = goal ? getCareer(goal) : null
  const roadmap = career ? getRoadmap(career.id) : null
  const totalTopics = roadmap ? roadmap.levels.reduce((n, l) => n + l.topics.length, 0) : 0
  const doneTopics = roadmap
    ? roadmap.levels.reduce((n, l) => n + l.topics.filter((t) => completedTopics.includes(t.id)).length, 0)
    : 0
  const roadmapPct = totalTopics ? Math.round((doneTopics / totalTopics) * 100) : 0
  const prepPct = Math.round((donePrep.length / prepTasks.length) * 100)
  const match = gapReport?.match ?? null
  const owned = new Set(skills || [])
  const required = career ? requiredSkillsFor(career.id) : []

  const firstName = user?.name?.split(' ')[0] || 'there'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const recommended = (career?.related || ['web-developer', 'data-analyst', 'ai-ml-engineer'])
    .map(getCareer)
    .filter(Boolean)
    .slice(0, 3)

  const nextTopics = roadmap
    ? roadmap.levels
        .flatMap((l) => l.topics.map((t) => ({ ...t, level: l.label })))
        .filter((t) => !completedTopics.includes(t.id))
        .slice(0, 3)
    : []

  return (
    <div className="page dash-wrap">
      <div className="container">
        {/* ------------------------------------------------------- hero */}
        <div className="dash-hero">
          <div style={{ position: 'relative' }}>
            <span className="badge" style={{ marginBottom: 14 }}>
              <CalendarDays size={11} /> {todayLabel()}
            </span>
            <h1>
              {greeting}, {firstName}
            </h1>
            <p>
              {gapReport
                ? `You are ${match}% of the way to ${gapReport.targetRoleLabel} on paper. ${gapReport.missing.length ? `${gapReport.missing.length} skills left — start with ${gapReport.missing[0].name}.` : 'Now go prove it with a project.'}`
                : 'Run the skill gap analyzer to get a personalised plan, or pick a career track to start a roadmap.'}
            </p>
            <div className="row gap-12 wrap mt-16">
              <Link to="/skill-gap" className="btn btn-primary btn-sm">
                <Sparkles size={15} /> {gapReport ? 'Update my analysis' : 'Run skill gap analysis'}
              </Link>
              <Link to="/roadmaps" className="btn btn-ghost btn-sm">
                <RouteIcon size={15} /> Continue roadmap
              </Link>
            </div>
          </div>

          <div className="ring-sm" style={{ position: 'relative' }}>
            <svg width="92" height="92" viewBox="0 0 92 92">
              <circle cx="46" cy="46" r="38" fill="none" stroke="var(--line)" strokeWidth="6" />
              <circle
                cx="46"
                cy="46"
                r="38"
                fill="none"
                stroke="url(#dashRing)"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeDasharray={2 * Math.PI * 38}
                strokeDashoffset={2 * Math.PI * 38 * (1 - roadmapPct / 100)}
              />
              <defs>
                <linearGradient id="dashRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d1461c" />
                  <stop offset="100%" stopColor="#c99a3f" />
                </linearGradient>
              </defs>
            </svg>
            <div className="lbl">{roadmapPct}%</div>
          </div>
        </div>

        {/* -------------------------------------------------------- kpis */}
        <div className="kpi-row">
          <StatCard icon={<Target size={16} />} value={match !== null ? `${match}%` : '—'} label="Skill match" delta={match !== null ? (match >= 60 ? 'on track' : 'in progress') : null} />
          <StatCard icon={<RouteIcon size={16} />} tone="blue" value={totalTopics ? `${doneTopics}/${totalTopics}` : '—'} label="Roadmap topics" />
          <StatCard icon={<Bookmark size={16} />} tone="green" value={savedProjects.length} label="Saved projects" />
          <StatCard icon={<BriefcaseBusiness size={16} />} tone="amber" value={`${prepPct}%`} label="Placement prep" />
        </div>

        <div className="dash-grid">
          {/* --------------------------------------------------- left */}
          <div>
            {/* career goal */}
            <div className="card dash-card">
              <div className="dash-card-head">
                <h2>
                  <Target size={17} /> Current career goal
                </h2>
                {career && <Link to={`/careers/${career.id}`} className="link-arrow">Role details <ArrowRight size={13} /></Link>}
              </div>

              {career ? (
                <div className="goal-card">
                  <span className="career-icon" style={{ marginBottom: 0 }}>
                    <Icon name={career.icon} size={20} />
                  </span>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <strong style={{ display: 'block', fontSize: '1rem' }}>{career.title}</strong>
                    <span className="small muted">{career.tagline}</span>
                    <div className="row gap-8 mt-8 wrap">
                      <Badge tone="purple">{career.difficulty}</Badge>
                      <Badge tone="green">Demand: {career.demand}</Badge>
                      <Badge tone="default">Entry {career.salary.entry}</Badge>
                    </div>
                  </div>
                  <Link to={`/roadmaps?career=${career.id}`} className="btn btn-dark btn-sm">
                    Continue <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <EmptyState
                  icon={<Compass size={22} />}
                  title="No career goal set yet"
                  text="Pick a track and we will build your dashboard around it — roadmap progress, skill gaps and recommended projects."
                  action={
                    <Link to="/careers" className="btn btn-primary btn-sm">
                      Explore career tracks <ArrowRight size={14} />
                    </Link>
                  }
                />
              )}
            </div>

            {/* skill progress */}
            <div className="card dash-card mt-24">
              <div className="dash-card-head">
                <h2>
                  <TrendingUp size={17} /> Skill development
                </h2>
                <Link to="/skill-gap" className="link-arrow">Analyze <ArrowRight size={13} /></Link>
              </div>

              {career && required.length ? (
                <>
                  <p className="small muted mb-16">
                    Your coverage against the {required.length} skills {career.title} roles screen for.
                  </p>
                  {required.slice(0, 6).map((r) => (
                    <div key={r.id} style={{ marginBottom: 14 }}>
                      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 5 }}>
                        <span className="small" style={{ fontWeight: 500 }}>
                          {r.name}
                        </span>
                        {owned.has(r.id) ? (
                          <span className="tiny" style={{ color: 'var(--emerald-500)', fontWeight: 600 }}>
                            <CheckCircle2 size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> have it
                          </span>
                        ) : (
                          <span className="tiny muted">{r.levelLabel} gap</span>
                        )}
                      </div>
                      <ProgressBar value={owned.has(r.id) ? 100 : r.level === 'core' ? 18 : 10} tone={owned.has(r.id) ? 'green' : 'amber'} height={6} />
                    </div>
                  ))}
                  {skills.length > 0 && (
                    <p className="tiny muted mt-8">
                      You listed {skills.length} skills: {skills.slice(0, 5).map(skillName).join(', ')}
                      {skills.length > 5 ? ` +${skills.length - 5} more` : ''}
                    </p>
                  )}
                </>
              ) : (
                <EmptyState
                  icon={<Sparkles size={22} />}
                  title="No skill analysis yet"
                  text="Add your current skills once and this panel tracks every gap against your target role."
                  action={
                    <Link to="/skill-gap" className="btn btn-dark btn-sm">
                      Run the analyzer <ArrowRight size={14} />
                    </Link>
                  }
                />
              )}
            </div>

            {/* roadmap progress */}
            {roadmap && (
              <div className="card dash-card mt-24">
                <div className="dash-card-head">
                  <h2>
                    <RouteIcon size={17} /> Learning roadmap
                  </h2>
                  <Link to={`/roadmaps?career=${career.id}`} className="link-arrow">Open <ArrowRight size={13} /></Link>
                </div>

                <div className="row gap-24 wrap" style={{ alignItems: 'center' }}>
                  <ProgressRing value={roadmapPct} size={96} stroke={9} from="#d1461c" to="#c99a3f" track="var(--line)" sub="done" />
                  <div style={{ flex: 1, minWidth: 200 }}>
                    {roadmap.levels.map((l) => {
                      const lDone = l.topics.filter((t) => completedTopics.includes(t.id)).length
                      const pct = Math.round((lDone / l.topics.length) * 100)
                      return (
                        <div key={l.id} style={{ marginBottom: 10 }}>
                          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                            <span className="small">{l.label}</span>
                            <span className="tiny muted">
                              {lDone}/{l.topics.length}
                            </span>
                          </div>
                          <ProgressBar value={pct} height={5} tone={pct === 100 ? 'green' : ''} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {nextTopics.length > 0 && (
                  <>
                    <div className="divider" style={{ margin: '18px 0' }} />
                    <span className="tiny" style={{ fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-soft)' }}>
                      Up next
                    </span>
                    {nextTopics.map((t) => (
                      <div className="row gap-12" key={t.id} style={{ padding: '9px 0', borderBottom: '1px dashed var(--border)' }}>
                        <span className="activity-dot">
                          <RouteIcon size={13} />
                        </span>
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '0.86rem', display: 'block' }}>{t.title}</strong>
                          <span className="tiny muted">
                            {t.level} · ~{t.hours} hrs
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* saved projects */}
            <div className="card dash-card mt-24">
              <div className="dash-card-head">
                <h2>
                  <FolderGit2 size={17} /> Saved projects
                </h2>
                <Link to="/projects" className="link-arrow">Browse <ArrowRight size={13} /></Link>
              </div>

              {savedProjects.length === 0 ? (
                <EmptyState
                  icon={<FolderGit2 size={22} />}
                  title="Nothing saved yet"
                  text="Bookmark a project in the Project Hub and it will appear here with its build guide."
                  action={
                    <Link to="/projects" className="btn btn-dark btn-sm">
                      Find a project <ArrowRight size={14} />
                    </Link>
                  }
                />
              ) : (
                savedProjects.slice(0, 4).map((id) => {
                  const p = getProject(id)
                  if (!p) return null
                  return (
                    <div className="mini-career" key={id}>
                      <span className="mc-icon">
                        <FolderGit2 size={16} />
                      </span>
                      <div style={{ flex: 1 }}>
                        <strong>{p.title}</strong>
                        <span>
                          {p.category} · {p.difficulty} · {p.duration}
                        </span>
                      </div>
                      <Badge tone="purple">{p.tech[0]}</Badge>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* -------------------------------------------------- right */}
          <aside>
            {/* notifications */}
            <div className="card dash-card">
              <div className="dash-card-head">
                <h2>
                  <Bell size={17} /> Notifications
                  {unreadCount > 0 && <Badge tone="rose">{unreadCount}</Badge>}
                </h2>
                {unreadCount > 0 && (
                  <button type="button" className="link-arrow" style={{ background: 'none', border: 'none', fontSize: '0.78rem' }} onClick={markNotificationsRead}>
                    Mark read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className="small muted" style={{ lineHeight: 1.6 }}>
                  No notifications yet. Completing roadmap topics and mock interviews will show up here.
                </p>
              ) : (
                notifications.slice(0, 4).map((n) => (
                  <div className={`notif-item ${n.read ? '' : 'unread'}`} key={n.id}>
                    <span className="activity-dot" style={{ flex: 'none' }}>
                      <Bell size={12} />
                    </span>
                    <div>
                      <strong>{n.title}</strong>
                      <span>{n.body}</span>
                      <span className="tiny" style={{ color: 'var(--text-soft)', marginTop: 4, display: 'block' }}>
                        {timeAgo(n.at)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* recommended */}
            <div className="card dash-card mt-24">
              <div className="dash-card-head">
                <h2>
                  <Compass size={17} /> Recommended roles
                </h2>
              </div>
              {recommended.map((c) => (
                <Link to={`/careers/${c.id}`} className="mini-career" key={c.id} style={{ textDecoration: 'none' }}>
                  <span className="mc-icon">
                    <Icon name={c.icon} size={16} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <strong>{c.title}</strong>
                    <span>
                      {c.salary.entry} · {c.difficulty}
                    </span>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--faint)' }} />
                </Link>
              ))}
            </div>

            {/* activity */}
            <div className="card dash-card mt-24">
              <div className="dash-card-head">
                <h2>
                  <Flame size={17} /> Recent activity
                </h2>
              </div>
              {activities.length === 0 ? (
                <p className="small muted" style={{ lineHeight: 1.6 }}>
                  Your activity feed is empty. Tick a roadmap topic or save a project to get started.
                </p>
              ) : (
                <div className="activity-list">
                  {activities.slice(0, 6).map((a) => (
                    <div className="activity-item" key={a.id}>
                      <span className="activity-dot">
                        <CheckCircle2 size={13} />
                      </span>
                      <div className="act-body">
                        <strong>{a.text}</strong>
                        <span className="act-time">{timeAgo(a.at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {aptitude.attempted > 0 && (
              <div className="card dash-card mt-24">
                <div className="dash-card-head">
                  <h2>
                    <BriefcaseBusiness size={17} /> Aptitude
                  </h2>
                </div>
                <div className="row gap-16">
                  <ProgressRing
                    value={Math.round((aptitude.correct / aptitude.attempted) * 100)}
                    size={84}
                    stroke={8}
                    from="#2f6b4f"
                    to="#7fb28f"
                    track="var(--line)"
                    sub="accuracy"
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>{aptitude.attempted} attempted</strong>
                    <span className="tiny muted">{aptitude.correct} correct</span>
                    <Link to="/placement?tab=aptitude" className="link-arrow mt-8" style={{ display: 'flex', fontSize: '0.8rem' }}>
                      Practise more <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

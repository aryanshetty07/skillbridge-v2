import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  CircleSlash,
  Info,
  Layers,
  RotateCcw,
  Route as RouteIcon,
  Save,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react'
import { careers } from '../data/careers'
import { educationLevels, skillCatalog, skillGroups } from '../data/skills'
import { analyseSkillGap, requiredSkillsFor } from '../services/analyzer'
import { AI_MODE } from '../services/ai'
import { ProgressRing, RadarChart } from '../components/charts'
import { Badge, FieldError, ProgressBar } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { useToast } from '../context/ToastContext'

const interestOptions = ['Web Development', 'AI/ML', 'Data Science', 'Cloud', 'Cybersecurity', 'UI/UX Design', 'Competitive Programming']

export default function SkillGap() {
  const [params] = useSearchParams()
  const { isAuthenticated, user } = useAuth()
  const { skills: savedSkills, saveGapReport, gapReport, addNotification } = useProgress()
  const toast = useToast()

  const [selected, setSelected] = useState(() => (savedSkills?.length ? savedSkills : []))
  const [education, setEducation] = useState(user?.education || '')
  const [interests, setInterests] = useState(user?.interests || [])
  const [targetRole, setTargetRole] = useState(params.get('role') || gapReport?.careerId || '')
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(gapReport || null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const role = params.get('role')
    if (role) setTargetRole(role)
  }, [params])

  useEffect(() => {
    if (user?.education && !education) setEducation(user.education)
    if (user?.interests?.length && !interests.length) setInterests(user.interests)
  }, [user, education, interests.length])

  const grouped = useMemo(() => {
    const q = filter.trim().toLowerCase()
    return skillGroups
      .map((g) => ({
        group: g,
        items: skillCatalog.filter((s) => s.group === g && (!q || s.name.toLowerCase().includes(q))),
      }))
      .filter((g) => g.items.length)
  }, [filter])

  const toggleSkill = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const toggleInterest = (name) => {
    setInterests((prev) => (prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]))
  }

  const validate = () => {
    const next = {}
    if (!targetRole) next.targetRole = 'Choose the role you are aiming for'
    if (!education) next.education = 'Select your current education level'
    if (!selected.length) next.skills = 'Select at least one skill you already have — even a class you took counts'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const runAnalysis = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 900))
    const report = analyseSkillGap({ skills: selected, education, interests, targetRole })
    setResult(report)
    setBusy(false)
    if (isAuthenticated && report) {
      saveGapReport(report)
      addNotification(
        `Skill gap analysed: ${report.match}% match`,
        `${report.missing.length} skill${report.missing.length === 1 ? '' : 's'} left for ${report.targetRoleLabel}. Your six-week plan is ready.`,
      )
      toast.success('Analysis saved to your dashboard')
    }
    window.setTimeout(() => document.getElementById('analysis-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
  }

  const resetAll = () => {
    setSelected([])
    setEducation('')
    setInterests([])
    setTargetRole('')
    setErrors({})
    setResult(null)
  }

  const saveToDashboard = () => {
    if (!isAuthenticated) {
      toast.info('Create a free account to save this analysis')
      return
    }
    if (result) {
      saveGapReport(result)
      toast.success('Analysis saved to your dashboard')
    }
  }

  const radarData = useMemo(() => {
    if (!result) return []
    const owned = new Set(result.skills)
    return result.required.slice(0, 6).map((r) => ({ label: r.name, have: owned.has(r.id) ? 1 : 0.08, req: 1 }))
  }, [result])

  const requiredCount = targetRole ? requiredSkillsFor(targetRole).length : 0

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Skill Gap Analyzer</span>
          </div>
          <div className="row gap-12 wrap" style={{ alignItems: 'center' }}>
            <span className="eyebrow" style={{ marginBottom: 0 }}>AI skill gap analyzer</span>
            <Badge tone={AI_MODE === 'live' ? 'green' : 'amber'}>
              <Sparkles size={11} /> {AI_MODE === 'live' ? 'Live AI' : 'Demo mode — rule-based engine'}
            </Badge>
          </div>
          <h1>Find out exactly what you are missing</h1>
          <p>
            Tell us what you already know and the role you want. We score your coverage against that role's real
            requirements, rank the gaps by hiring weight, and build a six-week plan. The score is calculated from your
            inputs — not a random number.
          </p>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="analyzer-layout">
            {/* ------------------------------------------------------ form */}
            <form className="card form-card" onSubmit={runAnalysis} noValidate>
              <h2>Your profile</h2>
              <p className="sub">Takes about two minutes. Nothing is uploaded anywhere.</p>

              <div className="form-grid">
                <div className="field">
                  <label className="label" htmlFor="targetRole">
                    Target role <span className="req">*</span>
                  </label>
                  <select
                    id="targetRole"
                    className={`select ${errors.targetRole ? 'error' : ''}`}
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  >
                    <option value="">Select a career track…</option>
                    {careers.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  {errors.targetRole ? <FieldError>{errors.targetRole}</FieldError> : targetRole && (
                    <span className="field-hint">{requiredCount} required skills mapped for this role.</span>
                  )}
                </div>

                <div className="field">
                  <label className="label" htmlFor="education">
                    Education level <span className="req">*</span>
                  </label>
                  <select
                    id="education"
                    className={`select ${errors.education ? 'error' : ''}`}
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  >
                    <option value="">Select your level…</option>
                    {educationLevels.map((l) => (
                      <option value={l} key={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  {errors.education && <FieldError>{errors.education}</FieldError>}
                </div>

                <div className="field">
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <label className="label">
                      Skills you already have <span className="req">*</span>
                    </label>
                    <span className="selected-count">{selected.length} selected</span>
                  </div>

                  <input
                    className="input"
                    placeholder="Filter skills…"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    aria-label="Filter skill list"
                  />

                  <div className="skill-picker">
                    {grouped.length === 0 ? (
                      <p className="small muted" style={{ padding: 8 }}>No skills match “{filter}”.</p>
                    ) : (
                      grouped.map((g) => (
                        <div key={g.group}>
                          <div className="skill-group-label">{g.group}</div>
                          <div className="skill-pick-grid">
                            {g.items.map((s) => (
                              <button
                                type="button"
                                key={s.id}
                                className={`skill-toggle ${selected.includes(s.id) ? 'on' : ''}`}
                                onClick={() => toggleSkill(s.id)}
                                aria-pressed={selected.includes(s.id)}
                              >
                                {selected.includes(s.id) && <Check size={12} />}
                                {s.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {errors.skills && <FieldError>{errors.skills}</FieldError>}
                  <span className="field-hint">Be honest — overstating skills only produces a plan that skips what you need.</span>
                </div>

                <div className="field">
                  <label className="label">Interests</label>
                  <div className="row gap-8 wrap">
                    {interestOptions.map((i) => (
                      <button
                        type="button"
                        key={i}
                        className={`chip sm ${interests.includes(i) ? 'active' : ''}`}
                        onClick={() => toggleInterest(i)}
                        aria-pressed={interests.includes(i)}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                  <span className="field-hint">Used to shape project and focus recommendations.</span>
                </div>
              </div>

              <div className="row gap-12 mt-24 wrap">
                <button type="submit" className="btn btn-primary" disabled={busy}>
                  {busy ? (
                    <>
                      <span className="spinner" /> Analysing…
                    </>
                  ) : (
                    <>
                      <Sparkles size={17} /> Analyse my skill gap
                    </>
                  )}
                </button>
                <button type="button" className="btn btn-ghost" onClick={resetAll} disabled={busy}>
                  <RotateCcw size={15} /> Reset
                </button>
              </div>

              <div className="alert alert-info mt-16" style={{ fontSize: '0.78rem' }}>
                <Info size={14} style={{ flex: 'none', marginTop: 2 }} />
                <span>
                  {AI_MODE === 'live'
                    ? 'A live model writes the narrative. The match score itself is always computed from the career dataset.'
                    : 'Demo mode: the analysis below is produced by a deterministic rule engine over our career dataset — real calculations, not a language model. Configure VITE_AI_MODE=live with a backend key for AI-written narratives.'}
                </span>
              </div>
            </form>

            {/* --------------------------------------------------- results */}
            <div className="result-panel" id="analysis-result">
              {busy && (
                <div className="card card-pad">
                  <div className="row gap-12 mb-24">
                    <span className="spinner dark" />
                    <strong style={{ fontSize: '0.92rem' }}>Comparing your skills against the role…</strong>
                  </div>
                  {[100, 88, 72, 60].map((w, i) => (
                    <div className="skeleton" key={i} style={{ height: 14, width: `${w}%`, marginBottom: 12 }} />
                  ))}
                </div>
              )}

              {!busy && !result && (
                <div className="card card-pad">
                  <div className="row gap-12 mb-16">
                    <span className="career-icon" style={{ marginBottom: 0 }}>
                      <Target size={20} />
                    </span>
                    <div>
                      <h3 className="h4">Your report appears here</h3>
                      <p className="tiny muted">Weighted match · ranked gaps · six-week plan</p>
                    </div>
                  </div>
                  <p className="small muted" style={{ lineHeight: 1.65 }}>
                    Fill the form on the left. If you are not sure what you know yet, start with the basics you have used in
                    college — HTML, Python, SQL or Git are common starting points.
                  </p>
                  <div className="divider" style={{ margin: '18px 0' }} />
                  <div className="stack gap-12">
                    {[
                      'How your skills compare to the role',
                      'Which missing skills recruiters screen for first',
                      'Free resources mapped to each gap',
                      'A realistic six-week order of attack',
                    ].map((t) => (
                      <span className="row gap-8 small muted" key={t}>
                        <CheckCircle2 size={14} style={{ color: 'var(--emerald-500)', flex: 'none' }} /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!busy && result && (
                <>
                  <div className="score-card">
                    <div className="row" style={{ justifyContent: 'space-between', position: 'relative', gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <h3>{result.targetRoleLabel}</h3>
                        <p className="sub">
                          Analysed {new Date(result.analysedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <span className="badge" style={{ borderColor: 'rgba(246,242,233,0.3)', color: 'rgba(246,242,233,0.75)' }}>
                        {result.readiness}
                      </span>
                    </div>

                    <div className="score-main">
                      <ProgressRing value={result.match} size={138} stroke={10} from="#f6f2e9" to="#c99a3f" track="rgba(246,242,233,0.16)" sub="match" />
                      <div className="score-facts">
                        <span className="score-fact">
                          <i className="k" style={{ background: '#a9c3b1' }} /> {result.matched.length} skills you already have
                        </span>
                        <span className="score-fact">
                          <i className="k" style={{ background: '#d1461c' }} /> {result.missing.length} skills still missing
                        </span>
                        <span className="score-fact">
                          <i className="k" style={{ background: '#c99a3f' }} /> ~{result.totalHours || 0} hours of focused study
                        </span>
                        <span className="score-fact">
                          <i className="k" style={{ background: 'rgba(246,242,233,0.5)' }} /> {result.education}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card chart-card">
                    <h3>Skill coverage against the role</h3>
                    <p className="sub">Filled area is what you have; the dashed outline is what the role expects.</p>
                    <RadarChart data={radarData} />
                    <div className="legend">
                      <span className="legend-item">
                        <span className="legend-swatch" style={{ background: 'rgba(209,70,28,0.55)' }} /> Your coverage
                      </span>
                      <span className="legend-item">
                        <span className="legend-swatch" style={{ background: 'var(--line-strong)' }} /> Role requirement
                      </span>
                    </div>
                  </div>

                  <div className="card card-pad">
                    <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                      <h3 className="h4">Missing skills, ranked by impact</h3>
                      <Badge tone="amber">{result.missing.length} gaps</Badge>
                    </div>

                    {result.missing.length === 0 ? (
                      <div className="alert alert-success">
                        <CheckCircle2 size={16} style={{ flex: 'none', marginTop: 2 }} />
                        <span>
                          You cover every skill on this role's requirement list. Focus on proof now — a deployed project and
                          two mock interviews.
                        </span>
                      </div>
                    ) : (
                      <div className="gap-list">
                        {result.missing.map((m) => (
                          <div className={`gap-item priority-${m.priority}`} key={m.id}>
                            <span className="gap-rank">{m.rank}</span>
                            <div className="gap-body">
                              <strong>{m.name}</strong>
                              <span>
                                {m.levelLabel} requirement · start at {m.roadmapLevel} · {m.topicTitle}
                              </span>
                            </div>
                            {m.resource ? (
                              <a href={m.resource.url} target="_blank" rel="noreferrer" className="resource-link" title={m.resource.title}>
                                <BookOpen size={12} /> Resource
                              </a>
                            ) : (
                              <Badge tone={m.priority === 1 ? 'rose' : m.priority === 2 ? 'amber' : 'blue'}>{m.priorityLabel}</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {result.phases.length > 0 && (
                    <div className="card card-pad">
                      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                        <h3 className="h4">
                          <Layers size={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6, color: 'var(--purple-600)' }} />
                          Your six-week plan
                        </h3>
                        <span className="tiny muted">~{result.totalHours} hrs total</span>
                      </div>

                      {result.phases.map((phase, idx) => (
                        <div key={phase.title} style={{ marginBottom: idx === result.phases.length - 1 ? 0 : 20 }}>
                          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
                            <span className="strong" style={{ fontSize: '0.87rem' }}>{phase.title}</span>
                            <span className="tiny muted">{phase.hours} hrs</span>
                          </div>
                          <ProgressBar value={100 - idx * 18} tone={idx === 0 ? '' : idx === 1 ? 'blue' : 'amber'} height={6} />
                          <div className="row gap-8 wrap" style={{ marginTop: 10 }}>
                            {phase.items.map((item) => (
                              <span className="career-tag" key={item.name}>
                                {item.name} · {item.level}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="card card-pad">
                    <h3 className="h4 mb-16">How to improve your employability</h3>
                    <div className="rec-list">
                      {result.recommendations.map((r, i) => (
                        <div className="rec-item" key={i}>
                          <span className="num">{i + 1}</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row gap-12 wrap">
                    <Link to={`/roadmaps?career=${result.careerId}`} className="btn btn-primary">
                      <RouteIcon size={16} /> Open the roadmap
                    </Link>
                    <button type="button" className="btn btn-ghost" onClick={saveToDashboard}>
                      <Save size={16} /> Save to dashboard
                    </button>
                    <Link to="/assistant" className="btn btn-ghost">
                      <Sparkles size={16} /> Ask about this plan
                    </Link>
                  </div>

                  <p className="tiny muted" style={{ lineHeight: 1.6 }}>
                    This report is guidance based on our own career dataset. It is not a hiring prediction and it does not
                    guarantee interviews. Use it to decide what to learn next, then verify with people working in the role.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

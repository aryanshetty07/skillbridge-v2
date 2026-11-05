import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Code2,
  ExternalLink,
  FileText,
  Lightbulb,
  ListChecks,
  Play,
  RotateCcw,
  Target,
  Timer,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import {
  aptitudeQuestions,
  aptitudeTopics,
  codingResources,
  hrQuestions,
  mockRounds,
  prepTasks,
  resumeSections,
  technicalQuestions,
  technicalTracks,
} from '../data/placement'
import Icon from '../components/Icon'
import { Badge, ProgressBar } from '../components/ui'
import { useProgress } from '../context/ProgressContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const tabs = [
  { id: 'technical', label: 'Technical', icon: Code2 },
  { id: 'hr', label: 'HR round', icon: Users },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'aptitude', label: 'Aptitude', icon: ClipboardList },
  { id: 'coding', label: 'Coding practice', icon: BookOpen },
  { id: 'mock', label: 'Mock interview', icon: Play },
  { id: 'progress', label: 'My progress', icon: Target },
]

const diffTone = { Easy: 'green', Medium: 'amber', Hard: 'rose' }

export default function Placement() {
  const [params, setParams] = useSearchParams()
  const initialTab = tabs.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'technical'
  const [tab, setTab] = useState(initialTab)

  useEffect(() => {
    const q = params.get('tab')
    if (q && tabs.some((t) => t.id === q)) setTab(q)
  }, [params])

  const changeTab = (id) => {
    setTab(id)
    setParams({ tab: id }, { replace: true })
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Placement Prep</span>
          </div>
          <span className="eyebrow">Placement preparation</span>
          <h1>Everything between you and the offer letter</h1>
          <p>
            Technical and HR question banks with real answers, resume guidance, timed aptitude practice, curated coding
            resources and a mock interview you can run right now. Your progress is tracked as you go.
          </p>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="prep-tabs">
            {tabs.map((t) => (
              <button type="button" key={t.id} className={`prep-tab ${tab === t.id ? 'active' : ''}`} onClick={() => changeTab(t.id)}>
                <t.icon size={15} /> {t.label}
              </button>
            ))}
          </div>

          {tab === 'technical' && <Technical />}
          {tab === 'hr' && <Hr />}
          {tab === 'resume' && <Resume />}
          {tab === 'aptitude' && <Aptitude />}
          {tab === 'coding' && <Coding />}
          {tab === 'mock' && <MockInterview />}
          {tab === 'progress' && <ProgressTab onChangeTab={changeTab} />}
        </div>
      </section>
    </>
  )
}

/* --------------------------------------------------------- technical --- */

function Technical() {
  const [track, setTrack] = useState('All')
  const [open, setOpen] = useState(null)

  const list = useMemo(
    () => (track === 'All' ? technicalQuestions : technicalQuestions.filter((q) => q.track === track)),
    [track],
  )

  return (
    <div className="split-aside">
      <div>
        <div className="filter-row mb-24">
          <span className="filter-label">Track</span>
          {technicalTracks.map((t) => (
            <button type="button" key={t} className={`chip sm ${track === t ? 'active' : ''}`} onClick={() => setTrack(t)}>
              {t}
            </button>
          ))}
        </div>

        {list.map((q) => (
          <div className={`qa-item ${open === q.id ? 'open' : ''}`} key={q.id}>
            <button type="button" className="qa-q" onClick={() => setOpen(open === q.id ? null : q.id)} aria-expanded={open === q.id}>
              <span>{q.q}</span>
              <ChevronDown size={17} className="chev" />
            </button>
            {open === q.id && (
              <div className="qa-a">
                <div className="qa-meta">
                  <Badge tone={diffTone[q.difficulty]}>{q.difficulty}</Badge>
                  <Badge tone="default">{q.track}</Badge>
                </div>
                {q.a}
              </div>
            )}
          </div>
        ))}

        <p className="tiny muted mt-24" style={{ lineHeight: 1.6 }}>
          {list.length} questions in this view. Answers are written to be said out loud in an interview, not recited as a
          textbook definition.
        </p>
      </div>

      <aside>
        <div className="card card-pad">
          <h3 className="h4 mb-16" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lightbulb size={17} style={{ color: 'var(--amber-500)' }} /> How to use this bank
          </h3>
          <ul className="opp-list" style={{ fontSize: '0.85rem' }}>
            <li>
              <CheckCircle2 size={15} /> Read the question, answer out loud, then compare.
            </li>
            <li>
              <CheckCircle2 size={15} /> If you cannot explain it to a friend, you do not know it yet.
            </li>
            <li>
              <CheckCircle2 size={15} /> Prepare depth on 5 topics from your resume, not shallow coverage of 30.
            </li>
            <li>
              <CheckCircle2 size={15} /> Always state the trade-off — that is what separates candidates.
            </li>
          </ul>
        </div>

        <div className="card card-pad mt-24">
          <h3 className="h4 mb-16">Round structure</h3>
          {[
            { n: '1', t: 'Online assessment', d: 'Aptitude + 2 coding problems' },
            { n: '2', t: 'Technical round', d: 'DSA, projects, fundamentals' },
            { n: '3', t: 'System / domain', d: 'Design or role-specific depth' },
            { n: '4', t: 'HR round', d: 'Motivation, teamwork, fit' },
          ].map((r) => (
            <div className="row gap-12" key={r.n} style={{ padding: '9px 0', borderBottom: '1px dashed var(--border)' }}>
              <span className="gap-rank">{r.n}</span>
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block' }}>{r.t}</strong>
                <span className="tiny muted">{r.d}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

/* ---------------------------------------------------------------- hr --- */

function Hr() {
  const [open, setOpen] = useState(hrQuestions[0].id)

  return (
    <div className="split-aside">
      <div>
        {hrQuestions.map((q) => (
          <div className={`qa-item ${open === q.id ? 'open' : ''}`} key={q.id}>
            <button type="button" className="qa-q" onClick={() => setOpen(open === q.id ? null : q.id)} aria-expanded={open === q.id}>
              <span>{q.q}</span>
              <ChevronDown size={17} className="chev" />
            </button>
            {open === q.id && (
              <div className="qa-a">
                <p style={{ marginBottom: 12 }}>
                  <strong style={{ color: 'var(--accent-ink)' }}>What they are really testing:</strong> {q.hint}
                </p>
                <div style={{ padding: 16, background: 'var(--paper)', border: '1px solid var(--line)', borderLeft: '2px solid var(--accent)', fontSize: '0.86rem', lineHeight: 1.72, color: 'var(--ink-soft)' }}>
                  <span className="tiny" style={{ fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-soft)' }}>
                    Sample answer
                  </span>
                  <p style={{ marginTop: 6 }}>{q.sample}</p>
                </div>
                <p className="tiny muted mt-8">Sample only — rewrite it in your own words with your own details.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <aside>
        <div className="card card-pad">
          <h3 className="h4 mb-16">The STAR method</h3>
          <p className="small muted mb-16" style={{ lineHeight: 1.6 }}>
            For any behavioural question, structure the answer so it is easy to follow:
          </p>
          {[
            ['Situation', 'One line of context. Where, when, what was at stake.'],
            ['Task', 'What you specifically were responsible for.'],
            ['Action', 'What you did — decisions, not a team narrative.'],
            ['Result', 'What changed, with a number if possible.'],
          ].map(([k, v]) => (
            <div key={k} style={{ marginBottom: 12 }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--accent-ink)' }}>{k}</strong>
              <p className="tiny muted" style={{ marginTop: 2, lineHeight: 1.55 }}>{v}</p>
            </div>
          ))}
        </div>

        <div className="alert alert-warn mt-24">
          <Lightbulb size={16} style={{ flex: 'none', marginTop: 2 }} />
          <span className="small">
            Never say “I have no weaknesses” or “I’m a perfectionist”. Pick a real one and describe the system you built to
            manage it.
          </span>
        </div>
      </aside>
    </div>
  )
}

/* ------------------------------------------------------------ resume --- */

function Resume() {
  return (
    <div>
      <div className="grid-3">
        {resumeSections.map((s) => (
          <div className="card card-pad" key={s.title}>
            <div className="row gap-12 mb-16">
              <span className="career-icon" style={{ marginBottom: 0, width: 38, height: 38 }}>
                <Icon name={s.icon} size={18} />
              </span>
              <h3 className="h4">{s.title}</h3>
            </div>
            <ul className="opp-list" style={{ fontSize: '0.85rem' }}>
              {s.tips.map((t) => (
                <li key={t}>
                  <CheckCircle2 size={15} /> {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card card-pad mt-24" style={{ background: 'linear-gradient(120deg, rgba(124,58,237,0.05), rgba(37,99,235,0.04))', borderColor: 'rgba(124,58,237,0.16)' }}>
        <div className="row gap-16 wrap" style={{ justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 620 }}>
            <h3 className="h4 mb-8">The two-line test</h3>
            <p className="small muted" style={{ lineHeight: 1.65 }}>
              A recruiter should be able to answer “what can this person do?” from your top three lines alone. If they have
              to read the whole page to find out, the resume is ordered wrong.
            </p>
          </div>
          <Link to="/assistant" className="btn btn-dark btn-sm">
            Ask for a resume review <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------- aptitude --- */

function Aptitude() {
  const { recordAptitude, aptitude } = useProgress()
  const [topic, setTopic] = useState('All')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [finished, setFinished] = useState(false)

  const pool = useMemo(() => (topic === 'All' ? aptitudeQuestions : aptitudeQuestions.filter((q) => q.topic === topic)), [topic])
  const q = pool[index]

  const restart = (newTopic = topic) => {
    setTopic(newTopic)
    setIndex(0)
    setSelected(null)
    setRevealed(false)
    setScore(0)
    setAnswered(0)
    setFinished(false)
  }

  const choose = (i) => {
    if (revealed) return
    setSelected(i)
    setRevealed(true)
    const correct = i === q.answer
    setScore((s) => s + (correct ? 1 : 0))
    setAnswered((a) => a + 1)
    recordAptitude(correct)
  }

  const next = () => {
    if (index + 1 >= pool.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setRevealed(false)
  }

  const accuracy = answered ? Math.round((score / answered) * 100) : 0

  return (
    <div className="split-aside">
      <div className="card apt-card">
        {finished ? (
          <div className="center" style={{ padding: '20px 0' }}>
            <div className="empty-icon" style={{ margin: '0 auto 14px' }}>
              <Trophy size={22} />
            </div>
            <h2 className="h3">Practice set complete</h2>
            <p className="muted mt-8">
              You scored <strong>{score}</strong> out of {pool.length} — {Math.round((score / pool.length) * 100)}% accuracy.
            </p>
            <div className="row gap-12 mt-24" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary" onClick={() => restart()}>
                <RotateCcw size={15} /> Practise again
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => restart('Quantitative')}>
                Switch to quantitative
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="row gap-8 wrap mb-24">
              {['All', ...aptitudeTopics].map((t) => (
                <button type="button" key={t} className={`chip sm ${topic === t ? 'active' : ''}`} onClick={() => restart(t)}>
                  {t}
                </button>
              ))}
            </div>

            <div className="apt-progress-row">
              <span className="tiny muted" style={{ whiteSpace: 'nowrap' }}>
                Question {index + 1} of {pool.length}
              </span>
              <ProgressBar value={((index + (revealed ? 1 : 0)) / pool.length) * 100} />
              <Badge tone="purple">{score} correct</Badge>
            </div>

            <div className="row gap-8 mb-16">
              <Badge tone="default">{q.topic}</Badge>
              <Badge tone={diffTone[q.difficulty]}>{q.difficulty}</Badge>
            </div>

            <p className="apt-q">{q.q}</p>

            {q.options.map((opt, i) => {
              let cls = 'option'
              if (revealed) {
                if (i === q.answer) cls += ' correct'
                else if (i === selected) cls += ' wrong'
              }
              return (
                <button type="button" key={opt} className={cls} onClick={() => choose(i)} disabled={revealed}>
                  <span className="opt-key">{String.fromCharCode(65 + i)}</span>
                  <span style={{ flex: 1 }}>{opt}</span>
                  {revealed && i === q.answer && <Check size={16} />}
                  {revealed && i === selected && i !== q.answer && <X size={16} />}
                </button>
              )
            })}

            {revealed && (
              <>
                <div className="explanation">
                  <strong style={{ display: 'block', marginBottom: 4 }}>
                    {selected === q.answer ? 'Correct' : 'Not quite'} — explanation
                  </strong>
                  {q.explanation}
                </div>
                <button type="button" className="btn btn-primary mt-16" onClick={next}>
                  {index + 1 >= pool.length ? 'See results' : 'Next question'} <ArrowRight size={15} />
                </button>
              </>
            )}
          </>
        )}
      </div>

      <aside>
        <div className="card card-pad">
          <h3 className="h4 mb-16">Your practice so far</h3>
          <div className="row gap-16 mb-16">
            <div className="fact-box" style={{ flex: 1 }}>
              <span>Attempted</span>
              <strong>{aptitude.attempted}</strong>
            </div>
            <div className="fact-box" style={{ flex: 1 }}>
              <span>Accuracy</span>
              <strong>{aptitude.attempted ? Math.round((aptitude.correct / aptitude.attempted) * 100) : 0}%</strong>
            </div>
          </div>
          <ProgressBar value={aptitude.attempted ? (aptitude.correct / aptitude.attempted) * 100 : 0} tone="green" />
          <p className="tiny muted mt-16" style={{ lineHeight: 1.6 }}>
            {aptitude.attempted === 0
              ? 'Answer a few questions and your accuracy will start tracking here.'
              : accuracy >= 70
                ? 'Above 70% is a comfortable place to be. Push difficulty rather than volume now.'
                : 'Below 70%: work on speed last. Understand the method first, then time yourself.'}
          </p>
        </div>

        <div className="card card-pad mt-24">
          <h3 className="h4 mb-16">Exam tips</h3>
          <ul className="opp-list" style={{ fontSize: '0.84rem' }}>
            <li>
              <CheckCircle2 size={15} /> Skip and return — never spend 3 minutes on one question.
            </li>
            <li>
              <CheckCircle2 size={15} /> Learn to estimate. Most options are far apart.
            </li>
            <li>
              <CheckCircle2 size={15} /> Memorise the 5/18 km-h conversion; it appears constantly.
            </li>
            <li>
              <CheckCircle2 size={15} /> Practise with a timer — accuracy without speed fails the round.
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

/* ------------------------------------------------------------ coding --- */

function Coding() {
  return (
    <div>
      <div className="grid-3">
        {codingResources.map((r) => (
          <div className="card card-pad card-hover" key={r.name}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
              <Badge tone="purple">{r.type}</Badge>
              {r.free && <Badge tone="green">Free</Badge>}
            </div>
            <h3 className="h4 mb-8">{r.name}</h3>
            <p className="small muted" style={{ lineHeight: 1.6, minHeight: 44 }}>
              {r.desc}
            </p>
            <a href={r.url} target="_blank" rel="noreferrer" className="link-arrow mt-16" style={{ display: 'inline-flex' }}>
              Open resource <ExternalLink size={13} />
            </a>
          </div>
        ))}
      </div>

      <div className="card card-pad mt-24">
        <h3 className="h4 mb-16">A realistic 8-week DSA plan</h3>
        <div className="grid-4" style={{ gap: 14 }}>
          {[
            ['Weeks 1–2', 'Arrays, strings, hashing', '30 problems'],
            ['Weeks 3–4', 'Two pointers, sliding window, binary search', '30 problems'],
            ['Weeks 5–6', 'Linked lists, stacks, trees, heaps', '35 problems'],
            ['Weeks 7–8', 'Graphs, DP, revision + contests', '25 problems'],
          ].map(([w, t, c]) => (
            <div className="fact-box" key={w}>
              <span>{w}</span>
              <strong style={{ fontSize: '0.84rem', lineHeight: 1.4, marginTop: 4 }}>{t}</strong>
              <span style={{ marginTop: 6, textTransform: 'none', letterSpacing: 0 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- mock --- */

function MockInterview() {
  const { addActivity, addNotification } = useProgress()
  const { isAuthenticated } = useAuth()
  const toast = useToast()

  const [stage, setStage] = useState('idle')
  const [roundIndex, setRoundIndex] = useState(0)
  const [qIndex, setQIndex] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [ratings, setRatings] = useState([])
  const [currentRating, setCurrentRating] = useState(0)
  const [answer, setAnswer] = useState('')
  const timerRef = useRef(null)

  const round = mockRounds[roundIndex]
  const question = round?.questions[qIndex]

  useEffect(() => {
    if (stage !== 'running') return undefined
    timerRef.current = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [stage])

  useEffect(() => {
    if (stage === 'running' && seconds <= 0) {
      advance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, stage])

  const start = () => {
    setStage('running')
    setRoundIndex(0)
    setQIndex(0)
    setSeconds(mockRounds[0].minutes * 60)
    setRatings([])
    setCurrentRating(0)
    setAnswer('')
  }

  const advance = () => {
    if (currentRating) setRatings((r) => [...r, { round: round.label, question, rating: currentRating }])
    else setRatings((r) => [...r, { round: round.label, question, rating: 0 }])

    setCurrentRating(0)
    setAnswer('')

    if (qIndex + 1 < round.questions.length) {
      setQIndex((i) => i + 1)
      return
    }
    if (roundIndex + 1 < mockRounds.length) {
      const nextRound = mockRounds[roundIndex + 1]
      setRoundIndex((i) => i + 1)
      setQIndex(0)
      setSeconds(nextRound.minutes * 60)
      return
    }
    setStage('done')
    if (isAuthenticated) {
      addActivity('Completed a full mock interview', 'prep')
      addNotification('Mock interview complete', 'Review your self-ratings and repeat the weakest round.')
    }
  }

  const average = ratings.length ? (ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1) : '0.0'
  const mm = String(Math.max(0, Math.floor(seconds / 60))).padStart(2, '0')
  const ss = String(Math.max(0, seconds % 60)).padStart(2, '0')
  const timerClass = seconds <= 15 ? 'danger' : seconds <= 45 ? 'warning' : ''

  if (stage === 'idle') {
    return (
      <div className="split-aside">
        <div className="card mock-shell">
          <div className="row gap-12 mb-16">
            <span className="career-icon" style={{ marginBottom: 0 }}>
              <Play size={19} />
            </span>
            <div>
              <h2 className="h3">Run a full mock interview</h2>
              <p className="tiny muted">3 rounds · {mockRounds.reduce((n, r) => n + r.questions.length, 0)} questions · about 17 minutes</p>
            </div>
          </div>

          <p className="small muted" style={{ lineHeight: 1.7 }}>
            Answer each question out loud — typing is not the same skill as speaking under pressure. When the timer ends you
            will move on automatically, exactly like a real interview. Rate yourself honestly at the end of each answer.
          </p>

          <div className="divider" style={{ margin: '20px 0' }} />

          {mockRounds.map((r, i) => (
            <div className="row gap-12" key={r.id} style={{ padding: '10px 0', borderBottom: i === mockRounds.length - 1 ? 'none' : '1px dashed var(--border)' }}>
              <span className="gap-rank">{i + 1}</span>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '0.88rem', display: 'block' }}>{r.label}</strong>
                <span className="tiny muted">{r.questions.length} questions · {r.minutes} min</span>
              </div>
              <Badge tone="default">Round {i + 1}</Badge>
            </div>
          ))}

          <button type="button" className="btn btn-primary mt-24" onClick={start}>
            <Play size={16} /> Start mock interview
          </button>
        </div>

        <aside className="card card-pad">
          <h3 className="h4 mb-16">
            <BriefcaseBusiness size={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6, color: 'var(--purple-600)' }} />
            Before you start
          </h3>
          <ul className="opp-list" style={{ fontSize: '0.85rem' }}>
            <li>
              <CheckCircle2 size={15} /> Have your resume open — you will be asked about it.
            </li>
            <li>
              <CheckCircle2 size={15} /> Speak, do not type. Record yourself if you can.
            </li>
            <li>
              <CheckCircle2 size={15} /> Structure answers: context, action, result.
            </li>
            <li>
              <CheckCircle2 size={15} /> If you go blank, say what you are thinking — silence reads worse.
            </li>
          </ul>
          <div className="alert alert-info mt-16" style={{ fontSize: '0.78rem' }}>
            <Timer size={14} style={{ flex: 'none', marginTop: 2 }} />
            <span>This is a self-practice tool with a timer and self-rating. It is not an AI interviewer.</span>
          </div>
        </aside>
      </div>
    )
  }

  if (stage === 'done') {
    const weak = ratings.filter((r) => r.rating <= 2)
    return (
      <div className="card mock-shell" style={{ maxWidth: 780, margin: '0 auto' }}>
        <div className="center" style={{ marginBottom: 24 }}>
          <div className="empty-icon" style={{ margin: '0 auto 14px' }}>
            <Trophy size={22} />
          </div>
          <h2 className="h3">Interview complete</h2>
          <p className="muted mt-8">
            Average self-rating <strong>{average}</strong> / 5 across {ratings.length} answers.
          </p>
        </div>

        <div style={{ maxWidth: 460, margin: '0 auto 24px' }}>
          <ProgressBar value={(Number(average) / 5) * 100} tone={Number(average) >= 3.5 ? 'green' : 'amber'} height={10} />
        </div>

        {weak.length > 0 ? (
          <div className="alert alert-warn" style={{ marginBottom: 20 }}>
            <Lightbulb size={16} style={{ flex: 'none', marginTop: 2 }} />
            <span>
              {weak.length} answer{weak.length > 1 ? 's' : ''} scored 2 or below. Rework those first — write the structure, say
              it aloud twice, then run the round again.
            </span>
          </div>
        ) : (
          <div className="alert alert-success" style={{ marginBottom: 20 }}>
            <CheckCircle2 size={16} style={{ flex: 'none', marginTop: 2 }} />
            <span>Strong self-ratings across the board. Next step: run it with a friend or senior who will push back.</span>
          </div>
        )}

        <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 20 }}>
          {ratings.map((r, i) => (
            <div className="row gap-12" key={i} style={{ padding: '10px 0', borderBottom: '1px dashed var(--border)', alignItems: 'flex-start' }}>
              <Badge tone={r.rating >= 4 ? 'green' : r.rating >= 3 ? 'amber' : 'rose'}>{r.rating}/5</Badge>
              <div style={{ flex: 1 }}>
                <div className="tiny muted">{r.round}</div>
                <div className="small">{r.question}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row gap-12 wrap">
          <button type="button" className="btn btn-primary" onClick={start}>
            <RotateCcw size={15} /> Run it again
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setStage('idle')}>
            Back to overview
          </button>
          <Link to="/assistant" className="btn btn-ghost" onClick={() => toast.info('Ask the assistant for feedback on an answer')}>
            Ask for feedback
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="card mock-shell" style={{ maxWidth: 820, margin: '0 auto' }}>
      <div className="mock-topbar">
        <div>
          <div className="tiny muted" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            {round.label} · Round {roundIndex + 1} of {mockRounds.length}
          </div>
          <div className="small strong" style={{ marginTop: 3 }}>
            Question {qIndex + 1} of {round.questions.length}
          </div>
        </div>
        <div className={`timer ${timerClass}`}>
          <Timer size={15} /> {mm}:{ss}
        </div>
      </div>

      <div className="mock-stage">
        <div className="mock-question">
          <span className="qnum">Question {qIndex + 1}</span>
          <h2>{question}</h2>
        </div>

        <div>
          <label className="label" htmlFor="mock-answer" style={{ marginBottom: 7 }}>
            Notes (optional — the answer itself should be spoken)
          </label>
          <textarea
            id="mock-answer"
            className="textarea"
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Jot a structure: situation → action → result"
          />
        </div>

        <div>
          <span className="label">Rate your answer</span>
          <div className="rating-row">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                className={`rating-btn ${currentRating === n ? 'on' : ''}`}
                onClick={() => setCurrentRating(n)}
                aria-pressed={currentRating === n}
              >
                {n}
              </button>
            ))}
            <span className="tiny muted" style={{ marginLeft: 6 }}>
              1 = blank · 5 = confident and structured
            </span>
          </div>
        </div>

        <div className="mock-actions">
          <button type="button" className="btn btn-primary" onClick={advance}>
            {qIndex + 1 < round.questions.length || roundIndex + 1 < mockRounds.length ? 'Next question' : 'Finish interview'}
            <ArrowRight size={15} />
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setStage('idle')
              setSeconds(0)
            }}
          >
            End session
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------- progress --- */

function ProgressTab({ onChangeTab }) {
  const { prepTasks: done, togglePrepTask, aptitude, completedTopics, savedProjects, gapReport } = useProgress()
  const { isAuthenticated } = useAuth()
  const toast = useToast()

  const pct = Math.round((done.length / prepTasks.length) * 100)

  const handleToggle = (task) => {
    if (!isAuthenticated) {
      toast.info('Sign in to track placement preparation')
      return
    }
    togglePrepTask(task.id, task.label)
  }

  return (
    <div className="split-aside">
      <div>
        <div className="card card-pad mb-24">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 className="h3">Placement readiness checklist</h2>
              <p className="tiny muted" style={{ marginTop: 4 }}>
                {done.length} of {prepTasks.length} complete · saved automatically
              </p>
            </div>
            <span className="badge badge-purple" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{pct}%</span>
          </div>
          <ProgressBar value={pct} height={10} />
        </div>

        {prepTasks.map((task) => {
          const isDone = done.includes(task.id)
          return (
            <div className={`prep-task ${isDone ? 'done' : ''}`} key={task.id}>
              <button
                type="button"
                className={`topic-check ${isDone ? 'on' : ''}`}
                onClick={() => handleToggle(task)}
                aria-pressed={isDone}
                aria-label={isDone ? `Mark ${task.label} incomplete` : `Mark ${task.label} complete`}
              >
                <Check size={14} strokeWidth={3} />
              </button>
              <span className="pt-label">{task.label}</span>
              <Badge tone="default">{task.category}</Badge>
            </div>
          )
        })}
      </div>

      <aside>
        <div className="card card-pad">
          <h3 className="h4 mb-16">Your numbers</h3>
          <div className="grid-2" style={{ gap: 12 }}>
            <div className="fact-box">
              <span>Checklist</span>
              <strong>{pct}%</strong>
            </div>
            <div className="fact-box">
              <span>Aptitude</span>
              <strong>{aptitude.attempted ? `${Math.round((aptitude.correct / aptitude.attempted) * 100)}%` : '—'}</strong>
            </div>
            <div className="fact-box">
              <span>Topics done</span>
              <strong>{completedTopics.length}</strong>
            </div>
            <div className="fact-box">
              <span>Projects saved</span>
              <strong>{savedProjects.length}</strong>
            </div>
          </div>

          {gapReport && (
            <div className="alert alert-info mt-16" style={{ fontSize: '0.78rem' }}>
              <Target size={14} style={{ flex: 'none', marginTop: 2 }} />
              <span>
                Target role: <strong>{gapReport.targetRoleLabel}</strong> · {gapReport.match}% skill match
              </span>
            </div>
          )}

          <div className="divider" style={{ margin: '18px 0' }} />

          <div className="stack gap-8">
            <button type="button" className="btn btn-dark btn-block btn-sm" onClick={() => onChangeTab('mock')}>
              <Play size={14} /> Run a mock interview
            </button>
            <button type="button" className="btn btn-ghost btn-block btn-sm" onClick={() => onChangeTab('aptitude')}>
              <ClipboardList size={14} /> Practise aptitude
            </button>
            <Link to="/skill-gap" className="btn btn-ghost btn-block btn-sm">
              <ListChecks size={14} /> Recheck skill gaps
            </Link>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="alert alert-warn mt-24">
            <Lightbulb size={16} style={{ flex: 'none', marginTop: 2 }} />
            <span className="small">
              You are browsing as a guest — progress is stored in this browser only.{' '}
              <Link to="/register" style={{ fontWeight: 600, textDecoration: 'underline' }}>
                Create an account
              </Link>{' '}
              to keep it.
            </span>
          </div>
        )}
      </aside>
    </div>
  )
}

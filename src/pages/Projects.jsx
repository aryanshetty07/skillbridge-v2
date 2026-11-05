import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Filter,
  FolderGit2,
  Lightbulb,
  SearchX,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { projectCategories, projectDifficulties, projects } from '../data/projects'
import { Badge, EmptyState, Modal, SearchInput } from '../components/ui'
import { useProgress } from '../context/ProgressContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const diffTone = { Beginner: 'green', Intermediate: 'amber', Advanced: 'rose' }

export default function Projects() {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [savedOnly, setSavedOnly] = useState(false)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(null)

  const { savedProjects, toggleProject } = useProgress()
  const { isAuthenticated } = useAuth()
  const toast = useToast()

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setDebounced(query)
      setLoading(false)
    }, 200)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    return projects.filter((p) => {
      const inCat = category === 'All' || p.category === category
      const inDiff = difficulty === 'All' || p.difficulty === difficulty
      const inSaved = !savedOnly || savedProjects.includes(p.id)
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return inCat && inDiff && inSaved && inQuery
    })
  }, [debounced, category, difficulty, savedOnly, savedProjects])

  const handleSave = (project, e) => {
    e?.stopPropagation()
    if (!isAuthenticated) {
      toast.info('Sign in to save projects to your dashboard')
      return
    }
    const isSaved = savedProjects.includes(project.id)
    toggleProject(project.id, project.title)
    toast.success(isSaved ? `Removed “${project.title}” from saved projects` : `Saved “${project.title}”`)
  }

  const reset = () => {
    setQuery('')
    setCategory('All')
    setDifficulty('All')
    setSavedOnly(false)
  }

  const activeFilters = (category !== 'All' ? 1 : 0) + (difficulty !== 'All' ? 1 : 0) + (savedOnly ? 1 : 0) + (query ? 1 : 0)

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Project Hub</span>
          </div>
          <span className="eyebrow">Project hub</span>
          <h1>Projects that prove you can build</h1>
          <p>
            {projects.length} projects across six categories, each with a real brief, the exact tech stack, the expected
            outcome and a step-by-step build guide. Save the ones you want to attempt next.
          </p>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="toolbar">
            <div className="row gap-12 wrap">
              <SearchInput value={query} onChange={setQuery} placeholder="Search projects or tech — try “React”, “Kafka”, “ESP32”" />
              <button
                type="button"
                className={`btn ${savedOnly ? 'btn-dark' : 'btn-ghost'} btn-sm`}
                onClick={() => setSavedOnly((v) => !v)}
                style={{ height: 44 }}
              >
                <BookmarkCheck size={15} /> Saved ({savedProjects.length})
              </button>
            </div>

            <div className="filter-row">
              <span className="filter-label">Category</span>
              {projectCategories.map((c) => (
                <button type="button" key={c} className={`chip sm ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                  {c}
                </button>
              ))}
            </div>

            <div className="filter-row">
              <span className="filter-label">Level</span>
              {projectDifficulties.map((d) => (
                <button type="button" key={d} className={`chip sm ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>
                  {d}
                </button>
              ))}
            </div>

            <div className="toolbar-foot">
              <span>
                <Filter size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-2px' }} />
                {loading ? 'Filtering…' : `${results.length} project${results.length === 1 ? '' : 's'}`}
                {activeFilters > 0 && ` · ${activeFilters} filter${activeFilters > 1 ? 's' : ''}`}
              </span>
              {activeFilters > 0 && (
                <button type="button" className="link-arrow" onClick={reset} style={{ background: 'none', border: 'none' }}>
                  <X size={14} /> Clear filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="project-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="project-card" key={i} aria-hidden="true">
                  <div className="skeleton" style={{ height: 20, width: 90, marginBottom: 16 }} />
                  <div className="skeleton" style={{ height: 16, width: '75%', marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 11, width: '100%', marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 11, width: '88%', marginBottom: 18 }} />
                  <div className="skeleton" style={{ height: 26, width: '100%' }} />
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={<SearchX size={22} />}
              title={savedOnly ? 'No saved projects yet' : 'No projects match those filters'}
              text={
                savedOnly
                  ? 'Tap the bookmark icon on any project card to save it here for later.'
                  : 'Try a different category or clear the filters to see all 36 project briefs.'
              }
              action={
                <button type="button" className="btn btn-dark btn-sm" onClick={reset}>
                  {savedOnly ? 'Browse all projects' : 'Clear filters'}
                </button>
              }
            />
          ) : (
            <div className="project-grid">
              {results.map((p) => {
                const isSaved = savedProjects.includes(p.id)
                return (
                  <article
                    className="project-card"
                    key={p.id}
                    onClick={() => setActive(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActive(p)
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="project-top">
                      <span className="project-cat">{p.category}</span>
                      <button
                        type="button"
                        className={`save-btn ${isSaved ? 'on' : ''}`}
                        onClick={(e) => handleSave(p, e)}
                        aria-label={isSaved ? `Remove ${p.title} from saved` : `Save ${p.title}`}
                        aria-pressed={isSaved}
                      >
                        {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>
                    </div>

                    <h3>{p.title}</h3>
                    <p>{p.description}</p>

                    <div className="tech-tags">
                      {p.tech.slice(0, 4).map((t) => (
                        <span className="tech-tag" key={t}>
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 4 && <span className="tech-tag">+{p.tech.length - 4}</span>}
                    </div>

                    <div className="project-foot">
                      <Badge tone={diffTone[p.difficulty]}>{p.difficulty}</Badge>
                      <span className="tiny muted row gap-4">
                        <Clock size={11} /> {p.duration}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <div className="alert alert-info mt-32">
            <Lightbulb size={16} style={{ flex: 'none', marginTop: 2 }} />
            <span>
              <strong>How to use these well:</strong> finish one project end to end rather than starting five. Deploy it, write
              a README that explains your decisions, and add the live link to your resume.
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- modal */}
      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active ? active.title : ''}
        wide
        footer={
          active && (
            <>
              <button type="button" className="btn btn-ghost btn-sm" onClick={(e) => handleSave(active, e)}>
                {savedProjects.includes(active.id) ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                {savedProjects.includes(active.id) ? 'Saved' : 'Save project'}
              </button>
              <Link to="/assistant" className="btn btn-primary btn-sm" onClick={() => setActive(null)}>
                <Sparkles size={15} /> Ask how to start
              </Link>
            </>
          )
        }
      >
        {active && (
          <>
            <div className="project-detail-head">
              <div className="row gap-8 wrap">
                <span className="project-cat">{active.category}</span>
                <Badge tone={diffTone[active.difficulty]}>{active.difficulty}</Badge>
              </div>
              <p style={{ marginTop: 12 }}>{active.description}</p>
            </div>

            <div className="detail-facts">
              <div className="fact-box">
                <span>Duration</span>
                <strong>{active.duration}</strong>
              </div>
              <div className="fact-box">
                <span>Level</span>
                <strong>{active.difficulty}</strong>
              </div>
              <div className="fact-box">
                <span>Steps</span>
                <strong>{active.steps.length} steps</strong>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h4 className="h4 mb-8" style={{ fontSize: '0.9rem' }}>Technologies</h4>
              <div className="tech-tags" style={{ marginTop: 0 }}>
                {active.tech.map((t) => (
                  <span className="tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="alert alert-success" style={{ marginBottom: 22 }}>
              <Target size={16} style={{ flex: 'none', marginTop: 2 }} />
              <span>
                <strong>Expected outcome:</strong> {active.outcome}
              </span>
            </div>

            <h4 className="h4 mb-16" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 7 }}>
              <FolderGit2 size={16} style={{ color: 'var(--purple-600)' }} /> Step-by-step build guide
            </h4>
            <ol className="step-list">
              {active.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>

            <div className="row gap-8 wrap mt-16">
              {active.tags.map((t) => (
                <span className="career-tag" key={t}>
                  <CheckCircle2 size={10} style={{ display: 'inline', marginRight: 3, verticalAlign: '-1px' }} />
                  {t}
                </span>
              ))}
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

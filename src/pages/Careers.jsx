import { useEffect, useMemo, useState } from 'react'
import { Filter, LayoutGrid, List, SearchX, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { careers, careerCategories, difficultyFilters, salaryNote } from '../data/careers'
import CareerCard from '../components/CareerCard'
import { EmptyState, SearchInput } from '../components/ui'

const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'salary', label: 'Entry salary: high to low' },
  { id: 'easiest', label: 'Easiest to break into' },
  { id: 'demand', label: 'Most in demand' },
]

const demandRank = { 'Very High': 2, High: 1 }

const entrySalary = (range) => {
  const match = String(range).match(/(\d+(?:\.\d+)?)/)
  return match ? parseFloat(match[1]) : 0
}

export default function Careers() {
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [sort, setSort] = useState('recommended')
  const [view, setView] = useState('list')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setDebounced(query)
      setLoading(false)
    }, 220)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    let list = careers.filter((c) => {
      const inCategory = category === 'All' || c.category === category
      const inDifficulty = difficulty === 'All' || c.difficulty === difficulty
      const inQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.skills.some((s) => s.name.toLowerCase().includes(q)) ||
        c.tools.some((t) => t.toLowerCase().includes(q))
      return inCategory && inDifficulty && inQuery
    })

    if (sort === 'salary') list = [...list].sort((a, b) => entrySalary(b.salary.entry) - entrySalary(a.salary.entry))
    if (sort === 'easiest') list = [...list].sort((a, b) => a.difficultyScore - b.difficultyScore)
    if (sort === 'demand')
      list = [...list].sort((a, b) => (demandRank[b.demand] || 0) - (demandRank[a.demand] || 0))
    return list
  }, [debounced, category, difficulty, sort])

  const activeFilters = (category !== 'All' ? 1 : 0) + (difficulty !== 'All' ? 1 : 0) + (query ? 1 : 0)

  const reset = () => {
    setQuery('')
    setCategory('All')
    setDifficulty('All')
    setSort('recommended')
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Explore Careers</span>
          </div>
          <span className="eyebrow">Career explorer</span>
          <h1>Find the role that fits how you like to work</h1>
          <p>
            Seven tracks, each mapped to the skills employers screen for, an indicative salary band and an honest
            difficulty rating. Search by skill, filter by what you can commit to.
          </p>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="toolbar">
            <div className="row gap-12 wrap">
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Search roles, skills or tools — try “Python”, “Figma”, “AWS”"
              />
              <div className="row gap-8">
                <SlidersHorizontal size={15} style={{ color: 'var(--faint)' }} />
                <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort careers" style={{ minWidth: 170 }}>
                  {sortOptions.map((o) => (
                    <option value={o.id} key={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <div className="view-toggle" role="group" aria-label="Layout">
                  <button
                    type="button"
                    className={view === 'list' ? 'active' : ''}
                    onClick={() => setView('list')}
                    aria-pressed={view === 'list'}
                  >
                    <List size={12} /> List
                  </button>
                  <button
                    type="button"
                    className={view === 'grid' ? 'active' : ''}
                    onClick={() => setView('grid')}
                    aria-pressed={view === 'grid'}
                  >
                    <LayoutGrid size={12} /> Grid
                  </button>
                </div>
              </div>
            </div>

            <div className="filter-row">
              <span className="filter-label">Category</span>
              {careerCategories.map((c) => (
                <button type="button" key={c} className={`chip sm ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                  {c}
                </button>
              ))}
            </div>

            <div className="filter-row">
              <span className="filter-label">Difficulty</span>
              {difficultyFilters.map((d) => (
                <button type="button" key={d} className={`chip sm ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>
                  {d}
                </button>
              ))}
            </div>

            <div className="toolbar-foot">
              <span>
                <Filter size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-2px' }} />
                {loading ? 'Searching…' : `${results.length} of ${careers.length} career tracks`}
                {activeFilters > 0 && !loading && ` · ${activeFilters} filter${activeFilters > 1 ? 's' : ''} active`}
              </span>
              {activeFilters > 0 && (
                <button type="button" className="link-arrow" onClick={reset} style={{ background: 'none', border: 'none' }}>
                  <X size={14} /> Clear all filters
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className={`career-grid ${view === 'grid' ? 'as-grid' : ''}`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="career-card" key={i} aria-hidden="true">
                  <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 16 }} />
                  <div className="skeleton" style={{ height: 16, width: '60%', marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 11, width: '100%', marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 11, width: '84%', marginBottom: 18 }} />
                  <div className="skeleton" style={{ height: 30, width: '100%' }} />
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={<SearchX size={22} />}
              title="No career tracks match that search"
              text="Try a broader term like “developer”, “data” or “cloud”, or clear the filters to see all seven tracks."
              action={
                <button type="button" className="btn btn-dark btn-sm" onClick={reset}>
                  Reset search and filters
                </button>
              }
            />
          ) : (
            <div className={`career-grid ${view === 'grid' ? 'as-grid' : ''}`}>
              {results.map((c, i) => (
                <CareerCard career={c} index={i + 1} key={c.id} />
              ))}
            </div>
          )}

          <div className="row gap-16 mt-32 wrap" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p className="tiny muted" style={{ maxWidth: 640, lineHeight: 1.6 }}>
              {salaryNote} All figures on this page are labelled indicative for that reason.
            </p>
            <Link to="/skill-gap" className="btn btn-primary btn-sm">
              <Sparkles size={15} /> Not sure? Run the skill gap analyzer
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

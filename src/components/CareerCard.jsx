import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Icon from './Icon'

/**
 * One row in the career list (and a card in grid view).
 * Kept deliberately flat: index, role, skills, indicative salary, arrow.
 */
export default function CareerCard({ career, index }) {
  return (
    <Link to={`/careers/${career.id}`} className="career-card">
      <span className="career-index">{String(index ?? 1).padStart(2, '0')}</span>

      <div className="career-main">
        <div className="row gap-12" style={{ alignItems: 'center' }}>
          <span className="career-icon">
            <Icon name={career.icon} size={17} />
          </span>
          <div>
            <h3>{career.title}</h3>
            <p className="desc">{career.tagline}.</p>
          </div>
        </div>
      </div>

      <div className="career-tags">
        {career.skills.slice(0, 3).map((s) => (
          <span className="career-tag" key={s.name}>
            {s.name}
          </span>
        ))}
      </div>

      <div className="salary-mini">
        Entry
        <strong>{career.salary.entry}</strong>
      </div>

      <span className="link-arrow" aria-hidden="true">
        <ArrowUpRight size={16} />
      </span>
    </Link>
  )
}

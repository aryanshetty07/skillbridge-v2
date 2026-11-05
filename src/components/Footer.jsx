import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Youtube } from 'lucide-react'

const columns = [
  {
    title: 'Platform',
    links: [
      { to: '/careers', label: 'Explore Careers' },
      { to: '/roadmaps', label: 'Learning Paths' },
      { to: '/projects', label: 'Project Hub' },
      { to: '/skill-gap', label: 'Skill Gap Analyzer' },
      { to: '/assistant', label: 'AI Career Assistant' },
    ],
  },
  {
    title: 'For students',
    links: [
      { to: '/dashboard', label: 'Student Dashboard' },
      { to: '/placement', label: 'Placement Prep' },
      { to: '/placement?tab=resume', label: 'Resume Tips' },
      { to: '/placement?tab=mock', label: 'Mock Interview' },
      { to: '/register', label: 'Create account' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About SkillBridge' },
      { to: '/about#how', label: 'How it works' },
      { to: '/about#faq', label: 'FAQ' },
      { to: '/about#team', label: 'Team' },
      { to: 'mailto:hello@skillbridge.in', label: 'Contact us', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand">
              <span className="brand-mark" aria-hidden="true" />
              <span>Skill<span className="accent">Bridge</span></span>
            </Link>
            <p className="footer-about">
              An AI-powered career platform for college students and fresh graduates. Discover roles, close skill gaps, build
              real projects and walk into placements prepared.
            </p>
            <div className="footer-social">
              <a className="social-btn" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a className="social-btn" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a className="social-btn" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={16} />
              </a>
              <a className="social-btn" href="mailto:hello@skillbridge.in" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.to}>{l.label}</a>
                    ) : (
                      <Link to={l.to}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SkillBridge Technologies Pvt. Ltd. · Built for students in India.</span>
          <div className="links">
            <Link to="/about#faq">Privacy</Link>
            <Link to="/about#faq">Terms</Link>
            <span>Made with React + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Route as RouteIcon,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/careers', label: 'Careers' },
  { to: '/roadmaps', label: 'Roadmaps' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

const mobileExtra = [
  { to: '/assistant', label: 'AI Career Assistant', icon: MessageSquare },
  { to: '/skill-gap', label: 'Skill Gap Analyzer', icon: BarChart3 },
  { to: '/placement', label: 'Placement Prep', icon: BriefcaseBusiness },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const userRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setUserOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const initials = user?.name
    ? user.name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join('')
    : 'SB'

  const handleLogout = () => {
    logout()
    setUserOpen(false)
    toast.success('You have been logged out')
    navigate('/')
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="SkillBridge home">
            <span className="brand-mark" aria-hidden="true" />
            <span>
              Skill<span className="accent">Bridge</span>
            </span>
            <span className="brand-tag">Beta</span>
          </Link>

          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <Link to="/assistant" className="nav-ai">
              <Sparkles size={12} /> AI Assistant
            </Link>

            {isAuthenticated ? (
              <div className="user-menu" ref={userRef}>
                <button type="button" className="user-menu-btn" onClick={() => setUserOpen((v) => !v)} aria-expanded={userOpen} aria-haspopup="menu">
                  <span className="avatar">{initials}</span>
                  <span className="desktop-only" style={{ fontSize: '0.84rem', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={13} className="desktop-only" style={{ color: 'var(--faint)' }} />
                </button>

                {userOpen && (
                  <div className="user-dropdown" role="menu">
                    <div className="user-dropdown-head">
                      <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>{user.name}</div>
                      <div className="tiny muted" style={{ marginTop: 2 }}>{user.email}</div>
                    </div>
                    <Link to="/dashboard" className="dropdown-item" role="menuitem">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link to="/skill-gap" className="dropdown-item" role="menuitem">
                      <BarChart3 size={15} /> Skill gap analyzer
                    </Link>
                    <Link to="/roadmaps" className="dropdown-item" role="menuitem">
                      <RouteIcon size={15} /> My roadmaps
                    </Link>
                    <Link to="/placement" className="dropdown-item" role="menuitem">
                      <BriefcaseBusiness size={15} /> Placement prep
                    </Link>
                    <div className="divider" style={{ margin: '6px 0' }} />
                    <button type="button" className="dropdown-item danger" onClick={handleLogout} role="menuitem">
                      <LogOut size={15} /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-signin">
                  Sign in
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Start free
                </Link>
              </>
            )}

            <button
              type="button"
              className="nav-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
          {mobileExtra.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <l.icon size={15} /> {l.label}
              </span>
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <User size={15} /> Dashboard
              </span>
            </NavLink>
          )}

          <div className="mobile-menu-actions">
            {isAuthenticated ? (
              <button type="button" className="btn btn-ghost" onClick={handleLogout} style={{ gridColumn: '1 / -1' }}>
                <LogOut size={15} /> Log out
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign in
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Start free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

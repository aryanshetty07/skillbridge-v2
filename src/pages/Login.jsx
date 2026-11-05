import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2, Eye, EyeOff, Info, Lock, Mail, Sparkles } from 'lucide-react'
import { validateLogin } from '../utils/validation'
import { FieldError } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { demoAccount } from '../data/site'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  const { login, isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const submit = async (e) => {
    e.preventDefault()
    setFormError('')
    const next = validateLogin({ email, password })
    setErrors(next)
    if (Object.keys(next).length) return

    setBusy(true)
    await new Promise((r) => setTimeout(r, 420))
    const res = login(email, password)
    setBusy(false)

    if (!res.ok) {
      setFormError(res.error)
      return
    }
    toast.success(`Welcome back, ${res.user.name.split(' ')[0]}`)
    navigate(from, { replace: true })
  }

  const fillDemo = () => {
    setEmail(demoAccount.email)
    setPassword(demoAccount.password)
    setErrors({})
    setFormError('')
  }

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Skill<span className="accent">Bridge</span></span>
        </Link>

        <div className="auth-pitch">
          <h2>Your placement season, planned properly.</h2>
          <p>Pick up exactly where you left off — roadmap progress, skill analysis and saved projects are waiting.</p>

          <ul className="auth-points">
            <li>
              <CheckCircle2 size={16} /> Personalised skill gap reports
            </li>
            <li>
              <CheckCircle2 size={16} /> Level-wise roadmaps with progress tracking
            </li>
            <li>
              <CheckCircle2 size={16} /> 36 project briefs with build guides
            </li>
            <li>
              <CheckCircle2 size={16} /> Mock interviews and aptitude practice
            </li>
          </ul>
        </div>

        <span className="auth-aside-foot">Free for students · No card, no trial limit</span>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="auth-sub">Log in to continue your roadmap.</p>

          {location.state?.reason === 'auth-required' && (
            <div className="alert alert-info mt-16">
              <Info size={16} style={{ flex: 'none', marginTop: 2 }} />
              <span className="small">That page needs an account. Log in or create one in under a minute.</span>
            </div>
          )}

          {formError && (
            <div className="alert alert-error mt-16">
              <AlertTriangle size={16} style={{ flex: 'none', marginTop: 2 }} />
              <span className="small">{formError}</span>
            </div>
          )}

          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label className="label" htmlFor="email">
                  Email address <span className="req">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--grey-400)' }} />
                  <input
                    id="email"
                    type="email"
                    className={`input ${errors.email ? 'error' : ''}`}
                    style={{ paddingLeft: 40 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@college.edu"
                    autoComplete="email"
                  />
                </div>
                <FieldError>{errors.email}</FieldError>
              </div>

              <div className="field">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <label className="label" htmlFor="password">
                    Password <span className="req">*</span>
                  </label>
                  <button type="button" className="tiny" style={{ color: 'var(--purple-600)', background: 'none', border: 'none', fontWeight: 600 }} onClick={() => toast.info('Demo build: use the demo account below, or sign up.')}>
                    Forgot?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--grey-400)' }} />
                  <input
                    id="password"
                    type={show ? 'text' : 'password'}
                    className={`input ${errors.password ? 'error' : ''}`}
                    style={{ paddingLeft: 40, paddingRight: 44 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--grey-400)', display: 'grid', placeItems: 'center' }}
                  >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <FieldError>{errors.password}</FieldError>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
                {busy ? (
                  <>
                    <span className="spinner" /> Logging in…
                  </>
                ) : (
                  <>
                    Log in <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="demo-note">
            <strong>Demo account</strong>
            {demoAccount.email} · {demoAccount.password}
            <div className="mt-8">
              <button type="button" className="btn btn-ghost btn-sm" onClick={fillDemo}>
                <Sparkles size={13} /> Fill demo credentials
              </button>
            </div>
          </div>

          <p className="auth-switch">
            New to SkillBridge? <Link to="/register">Create a free account</Link>
          </p>

          <p className="tiny muted mt-16" style={{ lineHeight: 1.6, textAlign: 'center' }}>
            Demo authentication only: accounts are stored in your browser's localStorage, not on a server. Do not reuse a real
            password here.
          </p>
        </div>
      </main>
    </div>
  )
}

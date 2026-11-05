import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2, Eye, EyeOff, Sparkles } from 'lucide-react'
import { passwordIssues, passwordStrength, validateRegister } from '../utils/validation'
import { educationLevels } from '../data/skills'
import { careers } from '../data/careers'
import { FieldError } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const interestOptions = ['Web Development', 'AI/ML', 'Data Science', 'Cloud', 'Cybersecurity', 'UI/UX Design', 'Competitive Programming']

const strengthLabel = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    college: '',
    education: '',
    goal: '',
  })
  const [interests, setInterests] = useState([])
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  const { register, isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const toggleInterest = (name) => {
    setInterests((prev) => (prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]))
  }

  const strength = passwordStrength(form.password)
  const issues = form.password ? passwordIssues(form.password) : []

  const submit = async (e) => {
    e.preventDefault()
    setFormError('')
    const next = validateRegister(form)
    setErrors(next)
    if (Object.keys(next).length) {
      const first = document.querySelector('.input.error, .select.error')
      first?.focus()
      return
    }

    setBusy(true)
    await new Promise((r) => setTimeout(r, 520))
    const res = register({ ...form, interests })
    setBusy(false)

    if (!res.ok) {
      setFormError(res.error)
      return
    }
    toast.success(`Account created — welcome, ${res.user.name.split(' ')[0]}`)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Skill<span className="accent">Bridge</span></span>
        </Link>

        <div className="auth-pitch">
          <h2>Two minutes now, a plan for the next two years.</h2>
          <p>Tell us where you are studying and what interests you. We will map the shortest honest route to a role you want.</p>

          <ul className="auth-points">
            <li>
              <CheckCircle2 size={16} /> Free forever for students
            </li>
            <li>
              <CheckCircle2 size={16} /> No entrance test or uploads
            </li>
            <li>
              <CheckCircle2 size={16} /> Works on a phone, tablet or laptop
            </li>
            <li>
              <CheckCircle2 size={16} /> Your progress saved across visits
            </li>
          </ul>
        </div>

        <span className="auth-aside-foot">48,000+ students · 320+ colleges</span>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <h1>Create your account</h1>
          <p className="auth-sub">Free for students. Takes about two minutes.</p>

          {formError && (
            <div className="alert alert-error mt-16">
              <AlertTriangle size={16} style={{ flex: 'none', marginTop: 2 }} />
              <span className="small">{formError}</span>
            </div>
          )}

          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label className="label" htmlFor="name">
                  Full name <span className="req">*</span>
                </label>
                <input
                  id="name"
                  className={`input ${errors.name ? 'error' : ''}`}
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Aryan Shetty"
                  autoComplete="name"
                />
                <FieldError>{errors.name}</FieldError>
              </div>

              <div className="field">
                <label className="label" htmlFor="remail">
                  Email address <span className="req">*</span>
                </label>
                <input
                  id="remail"
                  type="email"
                  className={`input ${errors.email ? 'error' : ''}`}
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@college.edu"
                  autoComplete="email"
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div className="form-row">
                <div className="field">
                  <label className="label" htmlFor="rpassword">
                    Password <span className="req">*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="rpassword"
                      type={show ? 'text' : 'password'}
                      className={`input ${errors.password ? 'error' : ''}`}
                      value={form.password}
                      onChange={set('password')}
                      placeholder="Min 8 chars, 1 number"
                      autoComplete="new-password"
                      style={{ paddingRight: 44 }}
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

                <div className="field">
                  <label className="label" htmlFor="confirm">
                    Confirm password <span className="req">*</span>
                  </label>
                  <input
                    id="confirm"
                    type={show ? 'text' : 'password'}
                    className={`input ${errors.confirm ? 'error' : ''}`}
                    value={form.confirm}
                    onChange={set('confirm')}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                  />
                  <FieldError>{errors.confirm}</FieldError>
                </div>
              </div>

              {form.password && (
                <div>
                  <div className="row gap-8" style={{ marginBottom: 6 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        style={{
                          flex: 1,
                          height: 4,
                          borderRadius: 3,
                          background: i < strength ? (strength <= 1 ? 'var(--rose-500)' : strength === 2 ? 'var(--amber-500)' : 'var(--emerald-500)') : 'var(--grey-200)',
                          transition: 'background 0.2s',
                        }}
                      />
                    ))}
                    <span className="tiny muted" style={{ whiteSpace: 'nowrap' }}>
                      {strengthLabel[strength]}
                    </span>
                  </div>
                  {issues.length > 0 && (
                    <span className="field-hint">Still needs: {issues.join(', ')}</span>
                  )}
                </div>
              )}

              <div className="field">
                <label className="label" htmlFor="college">
                  College name <span className="req">*</span>
                </label>
                <input
                  id="college"
                  className={`input ${errors.college ? 'error' : ''}`}
                  value={form.college}
                  onChange={set('college')}
                  placeholder="Sardar Patel Institute of Technology, Mumbai"
                />
                <FieldError>{errors.college}</FieldError>
              </div>

              <div className="field">
                <label className="label" htmlFor="education">
                  Education level <span className="req">*</span>
                </label>
                <select id="education" className={`select ${errors.education ? 'error' : ''}`} value={form.education} onChange={set('education')}>
                  <option value="">Select your level…</option>
                  {educationLevels.map((l) => (
                    <option value={l} key={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <FieldError>{errors.education}</FieldError>
              </div>

              <div className="field">
                <label className="label">Career interests</label>
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
                <span className="field-hint">Optional, but it shapes your recommendations.</span>
              </div>

              <div className="field">
                <label className="label" htmlFor="goal">
                  First career goal
                </label>
                <select id="goal" className="select" value={form.goal} onChange={set('goal')}>
                  <option value="">Not sure yet — help me decide</option>
                  {careers.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <label className="check">
                <input type="checkbox" required defaultChecked />
                <span>
                  I agree to the demo terms. This build stores my account in this browser only.
                </span>
              </label>

              <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
                {busy ? (
                  <>
                    <span className="spinner" /> Creating account…
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Create my account
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

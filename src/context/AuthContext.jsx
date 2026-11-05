import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { read, write, remove } from '../utils/storage'
import { demoHash } from '../utils/validation'
import { demoAccount } from '../data/site'

const AuthContext = createContext(null)

const USERS_KEY = 'users'
const SESSION_KEY = 'session'

/**
 * Demo authentication.
 * Accounts live in localStorage and passwords are stored as a non-cryptographic
 * digest. This is a front-end demo of the flow only — a real deployment must
 * hash on a server (bcrypt/argon2) and never trust the client.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  const seedDemoAccount = useCallback(() => {
    const users = read(USERS_KEY, [])
    if (!users.some((u) => u.email === demoAccount.email)) {
      users.push({
        id: 'demo-user',
        name: demoAccount.name,
        email: demoAccount.email,
        password: demoHash(demoAccount.password),
        college: demoAccount.college,
        education: demoAccount.education,
        interests: demoAccount.interests,
        goal: demoAccount.goal,
        createdAt: new Date('2026-08-12').toISOString(),
        demo: true,
      })
      write(USERS_KEY, users)
    }
  }, [])

  useEffect(() => {
    seedDemoAccount()
    const session = read(SESSION_KEY, null)
    if (session?.email) {
      const users = read(USERS_KEY, [])
      const found = users.find((u) => u.email === session.email)
      if (found) setUser(publicUser(found))
    }
    setReady(true)
  }, [seedDemoAccount])

  const login = useCallback((email, password) => {
    const users = read(USERS_KEY, [])
    const normalised = email.trim().toLowerCase()
    const found = users.find((u) => u.email.toLowerCase() === normalised)
    if (!found) return { ok: false, error: 'No account found with this email. Try signing up first.' }
    if (found.password !== demoHash(password)) return { ok: false, error: 'Incorrect password. Please try again.' }
    write(SESSION_KEY, { email: found.email, at: new Date().toISOString() })
    setUser(publicUser(found))
    return { ok: true, user: publicUser(found) }
  }, [])

  const register = useCallback((payload) => {
    const users = read(USERS_KEY, [])
    const email = payload.email.trim().toLowerCase()
    if (users.some((u) => u.email.toLowerCase() === email)) {
      return { ok: false, error: 'An account with this email already exists. Try logging in instead.' }
    }
    const record = {
      id: `u_${Date.now()}`,
      name: payload.name.trim(),
      email,
      password: demoHash(payload.password),
      college: payload.college.trim(),
      education: payload.education,
      interests: payload.interests || [],
      goal: payload.goal || '',
      createdAt: new Date().toISOString(),
    }
    users.push(record)
    write(USERS_KEY, users)
    write(SESSION_KEY, { email, at: new Date().toISOString() })
    setUser(publicUser(record))
    return { ok: true, user: publicUser(record) }
  }, [])

  const logout = useCallback(() => {
    remove(SESSION_KEY)
    setUser(null)
  }, [])

  const updateProfile = useCallback(
    (patch) => {
      if (!user) return { ok: false }
      const users = read(USERS_KEY, [])
      const idx = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase())
      if (idx === -1) return { ok: false }
      users[idx] = { ...users[idx], ...patch }
      write(USERS_KEY, users)
      setUser(publicUser(users[idx]))
      return { ok: true }
    },
    [user],
  )

  const value = useMemo(
    () => ({ user, ready, login, register, logout, updateProfile, isAuthenticated: Boolean(user) }),
    [user, ready, login, register, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function publicUser(u) {
  const { password, ...rest } = u
  return rest
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

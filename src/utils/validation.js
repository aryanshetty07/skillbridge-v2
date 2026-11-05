/** Form validation helpers — shared by Login and Register. */

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(String(value).trim())

export const passwordIssues = (value) => {
  const issues = []
  if (!value) return ['Password is required']
  if (value.length < 8) issues.push('at least 8 characters')
  if (!/[A-Za-z]/.test(value)) issues.push('one letter')
  if (!/[0-9]/.test(value)) issues.push('one number')
  return issues
}

export const passwordStrength = (value) => {
  let score = 0
  if (value.length >= 8) score++
  if (value.length >= 12) score++
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  return Math.min(score, 4)
}

export function validateLogin({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = 'Email is required'
  else if (!isEmail(email)) errors.email = 'Enter a valid email address'
  if (!password) errors.password = 'Password is required'
  return errors
}

export function validateRegister({ name, email, password, confirm, college, education }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Your name is required'
  else if (name.trim().length < 3) errors.name = 'Name must be at least 3 characters'
  else if (!/^[A-Za-z][A-Za-z .'-]*$/.test(name.trim())) errors.name = 'Use letters, spaces, dots or hyphens only'

  if (!email.trim()) errors.email = 'Email is required'
  else if (!isEmail(email)) errors.email = 'Enter a valid email address'

  const pwIssues = passwordIssues(password)
  if (pwIssues.length) errors.password = `Password needs ${pwIssues.join(', ')}`

  if (!confirm) errors.confirm = 'Please confirm your password'
  else if (confirm !== password) errors.confirm = 'Passwords do not match'

  if (!college.trim()) errors.college = 'College name is required'
  else if (college.trim().length < 4) errors.college = 'Enter your full college name'

  if (!education) errors.education = 'Select your education level'

  return errors
}

/** Tiny non-cryptographic digest. Demo only — never use this for real credentials. */
export function demoHash(text) {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0')
}

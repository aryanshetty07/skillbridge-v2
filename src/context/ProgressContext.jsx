import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { read, write } from '../utils/storage'
import { useAuth } from './AuthContext'

const ProgressContext = createContext(null)

const KEY_FOR = (user) => `progress:${user ? user.email.toLowerCase() : 'guest'}`

const initialState = {
  goal: '',
  completedTopics: [],
  savedProjects: [],
  prepTasks: [],
  aptitude: { attempted: 0, correct: 0 },
  activities: [],
  notifications: [],
  gapReport: null,
  skills: [],
}

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const key = KEY_FOR(user)
  const [state, setState] = useState(() => ({ ...initialState, ...read(key, {}) }))

  // Re-hydrate when the signed-in identity changes.
  useEffect(() => {
    const stored = read(key, {})
    setState({ ...initialState, ...stored })
  }, [key])

  useEffect(() => {
    write(key, state)
  }, [key, state])

  const patch = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      return next
    })
  }, [])

  const addActivity = useCallback(
    (text, kind = 'general') => {
      patch((prev) => ({
        ...prev,
        activities: [
          { id: `a_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, text, kind, at: new Date().toISOString() },
          ...prev.activities,
        ].slice(0, 30),
      }))
    },
    [patch],
  )

  const addNotification = useCallback(
    (title, body) => {
      patch((prev) => ({
        ...prev,
        notifications: [
          { id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, title, body, at: new Date().toISOString(), read: false },
          ...prev.notifications,
        ].slice(0, 20),
      }))
    },
    [patch],
  )

  const toggleTopic = useCallback(
    (topicId, label) => {
      patch((prev) => {
        const has = prev.completedTopics.includes(topicId)
        return {
          ...prev,
          completedTopics: has
            ? prev.completedTopics.filter((t) => t !== topicId)
            : [...prev.completedTopics, topicId],
          activities: has
            ? prev.activities
            : [
                {
                  id: `a_${Date.now()}`,
                  text: `Completed “${label || 'a roadmap topic'}”`,
                  kind: 'roadmap',
                  at: new Date().toISOString(),
                },
                ...prev.activities,
              ].slice(0, 30),
        }
      })
    },
    [patch],
  )

  const toggleProject = useCallback(
    (projectId, title) => {
      patch((prev) => {
        const has = prev.savedProjects.includes(projectId)
        return {
          ...prev,
          savedProjects: has ? prev.savedProjects.filter((p) => p !== projectId) : [...prev.savedProjects, projectId],
          activities: has
            ? prev.activities
            : [
                { id: `a_${Date.now()}`, text: `Saved project “${title || 'project'}”`, kind: 'project', at: new Date().toISOString() },
                ...prev.activities,
              ].slice(0, 30),
        }
      })
    },
    [patch],
  )

  const togglePrepTask = useCallback(
    (taskId, label) => {
      patch((prev) => {
        const has = prev.prepTasks.includes(taskId)
        return {
          ...prev,
          prepTasks: has ? prev.prepTasks.filter((t) => t !== taskId) : [...prev.prepTasks, taskId],
          activities: has
            ? prev.activities
            : [
                { id: `a_${Date.now()}`, text: `Placement prep: ${label || 'task'} done`, kind: 'prep', at: new Date().toISOString() },
                ...prev.activities,
              ].slice(0, 30),
        }
      })
    },
    [patch],
  )

  const recordAptitude = useCallback(
    (correct) => {
      patch((prev) => ({
        ...prev,
        aptitude: {
          attempted: prev.aptitude.attempted + 1,
          correct: prev.aptitude.correct + (correct ? 1 : 0),
        },
      }))
    },
    [patch],
  )

  const setGoal = useCallback(
    (goal) => {
      patch((prev) => ({ ...prev, goal }))
    },
    [patch],
  )

  const saveGapReport = useCallback(
    (report) => {
      patch((prev) => ({
        ...prev,
        gapReport: report,
        skills: report?.skills || prev.skills,
        goal: report?.careerId || prev.goal,
        activities: [
          {
            id: `a_${Date.now()}`,
            text: `Ran skill gap analysis for ${report?.targetRoleLabel || 'a role'} — ${report?.match ?? 0}% match`,
            kind: 'analyzer',
            at: new Date().toISOString(),
          },
          ...prev.activities,
        ].slice(0, 30),
      }))
    },
    [patch],
  )

  const markNotificationsRead = useCallback(() => {
    patch((prev) => ({ ...prev, notifications: prev.notifications.map((n) => ({ ...n, read: true })) }))
  }, [patch])

  const resetProgress = useCallback(() => {
    setState({ ...initialState })
  }, [])

  const unreadCount = state.notifications.filter((n) => !n.read).length

  const value = useMemo(
    () => ({
      ...state,
      unreadCount,
      addActivity,
      addNotification,
      toggleTopic,
      toggleProject,
      togglePrepTask,
      recordAptitude,
      setGoal,
      saveGapReport,
      markNotificationsRead,
      resetProgress,
    }),
    [
      state,
      unreadCount,
      addActivity,
      addNotification,
      toggleTopic,
      toggleProject,
      togglePrepTask,
      recordAptitude,
      setGoal,
      saveGapReport,
      markNotificationsRead,
      resetProgress,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}

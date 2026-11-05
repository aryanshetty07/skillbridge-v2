/**
 * Skill gap analysis.
 *
 * The scoring is deterministic and computed here from the real career data, so
 * the numbers on screen are genuine — this is not a random or hard-coded demo.
 * When a live AI endpoint is configured the same payload is sent to it for a
 * written narrative, but the match score always comes from this module.
 */

import { getCareer } from '../data/careers'
import { careerSkillMap, skillCatalog, skillName } from '../data/skills'
import { getRoadmap } from '../data/roadmaps'

const LEVEL_WEIGHT = { core: 3, important: 2, bonus: 1 }
const LEVEL_LABEL = { core: 'Core', important: 'Important', bonus: 'Bonus' }

export function requiredSkillsFor(careerId) {
  const career = getCareer(careerId)
  if (!career) return []
  const ids = careerSkillMap[careerId] || []
  return ids.map((id, index) => {
    const entry = career.skills.find((s) => normalise(s.name) === normalise(skillName(id)))
    const level = entry?.level || (index < 3 ? 'core' : 'important')
    return {
      id,
      name: skillName(id),
      level,
      weight: LEVEL_WEIGHT[level],
      levelLabel: LEVEL_LABEL[level],
    }
  })
}

function normalise(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]/g, '')
}

/** Find the roadmap topics in a career path that cover a given skill. */
function topicsForSkill(careerId, skillId) {
  const roadmap = getRoadmap(careerId)
  const name = normalise(skillName(skillId))
  const hits = []
  roadmap.levels.forEach((level) => {
    level.topics.forEach((topic) => {
      const haystack = normalise(topic.title + ' ' + topic.summary)
      if (haystack.includes(name) || name.includes(normalise(topic.title).slice(0, 8))) {
        hits.push({ level: level.label, levelId: level.id, topic })
      }
    })
  })
  return hits
}

export function analyseSkillGap({ skills = [], education = '', interests = [], targetRole }) {
  const career = getCareer(targetRole)
  if (!career) return null

  const required = requiredSkillsFor(targetRole)
  const owned = new Set(skills)
  const matched = required.filter((r) => owned.has(r.id))
  const missing = required.filter((r) => !owned.has(r.id))

  const totalWeight = required.reduce((sum, r) => sum + r.weight, 0) || 1
  const earnedWeight = matched.reduce((sum, r) => sum + r.weight, 0)
  const match = Math.round((earnedWeight / totalWeight) * 100)

  const ranked = [...missing].sort((a, b) => b.weight - a.weight)

  const missingDetailed = ranked.map((skill, index) => {
    const topics = topicsForSkill(targetRole, skill.id)
    return {
      ...skill,
      priority: skill.weight === 3 ? 1 : skill.weight === 2 ? 2 : 3,
      priorityLabel: skill.weight === 3 ? 'High priority' : skill.weight === 2 ? 'Worth adding' : 'Nice to have',
      rank: index + 1,
      roadmapLevel: topics[0]?.level || (skill.weight === 3 ? 'Beginner' : 'Intermediate'),
      topicTitle: topics[0]?.topic?.title || `Fundamentals of ${skill.name}`,
      resource: topics[0]?.topic?.resources?.[0] || null,
    }
  })

  const phases = buildPhases(missingDetailed)
  const recommendations = buildRecommendations({ career, matched, missing: missingDetailed, match, education, interests })

  return {
    careerId: targetRole,
    targetRoleLabel: career.title,
    match,
    education,
    interests,
    skills,
    required,
    matched,
    missing: missingDetailed,
    phases,
    recommendations,
    readiness:
      match >= 75 ? 'Interview ready' : match >= 50 ? 'Nearly there' : match >= 25 ? 'Building foundations' : 'Just getting started',
    totalHours: missingDetailed.length ? phases.reduce((sum, p) => sum + p.hours, 0) : 0,
    analysedAt: new Date().toISOString(),
  }
}

function buildPhases(missing) {
  if (!missing.length) return []
  const chunkSize = Math.max(1, Math.ceil(missing.length / 3))
  const names = ['Weeks 1–2: close the core gaps', 'Weeks 3–4: build depth', 'Weeks 5–6: polish and prove it']
  const phases = []
  for (let i = 0; i < missing.length; i += chunkSize) {
    const slice = missing.slice(i, i + chunkSize)
    phases.push({
      title: names[phases.length] || `Phase ${phases.length + 1}`,
      items: slice.map((s) => ({ name: s.name, topic: s.topicTitle, level: s.roadmapLevel })),
      hours: slice.reduce((sum, s) => sum + (s.weight === 3 ? 14 : s.weight === 2 ? 9 : 6), 0),
    })
  }
  return phases
}

function buildRecommendations({ career, matched, missing, match, education, interests }) {
  const recs = []
  const top = missing.slice(0, 2)

  if (missing.length === 0) {
    recs.push(`You already cover every skill this role asks for on paper. Switch to proof: build ${career.recommendedProjects?.length ? 'a portfolio project' : 'two portfolio projects'} and start mock interviews.`)
  } else {
    recs.push(
      `Start with ${top.map((s) => s.name).join(' and ')} — ${top.length > 1 ? 'they are' : 'it is'} the highest-weight gap for ${career.title} roles.`,
    )
  }

  if (career.recommendedProjects?.length) {
    recs.push(`Build one project end to end to prove it. Recommended next: “${projectTitle(career.recommendedProjects[0])}”.`)
  }

  if (matched.length) {
    recs.push(
      `You already have ${matched.map((m) => m.name).join(', ')} — put these on your resume with a concrete outcome, not just a list.`,
    )
  }

  if (/1st year|2nd year/i.test(education)) {
    recs.push('You have time on your side: aim for one shipped project per semester and one internship by your third year.')
  } else if (/4th year|graduated/i.test(education)) {
    recs.push('You are close to hiring season — run the placement track in parallel: 50 DSA problems, resume review, and two mock interviews.')
  }

  if (interests?.length) {
    recs.push(`Your interest in ${interests.join(' and ')} is an asset: pick project ideas at the intersection so your portfolio tells one story.`)
  }

  recs.push(
    match >= 50
      ? 'At this level, referrals matter more than applications. Ask two seniors in the role for a 15-minute conversation about their day-to-day.'
      : 'Do not apply broadly yet — one strong project plus three skills beats ten unfinished tutorials on a resume.',
  )

  return recs
}

function projectTitle(id) {
  const map = {
    'p-expense-tracker': 'Expense Tracker with Charts',
    'p-portfolio': 'Developer Portfolio with Blog',
    'p-realtime-chat': 'Real-time Chat App',
    'p-sales-dashboard': 'Retail Sales Dashboard',
    'p-eda-notebook': 'Public Dataset EDA Notebook',
    'p-ab-test': 'A/B Test Analysis Toolkit',
    'p-rag-chatbot': 'RAG Chatbot over College Documents',
    'p-image-classifier': 'Image Classifier for Campus Waste',
    'p-recommender': 'Course Recommendation Engine',
    'p-cicd-pipeline': 'CI/CD Pipeline with Preview Deploys',
    'p-serverless-api': 'Serverless Notes API',
    'p-iot-monitor': 'Smart Room Monitor',
    'p-design-system': 'Component Library & Docs Site',
    'p-portfolio-design': 'Mobile App UI Redesign Case Study',
    'p-mobile-app-ui': 'Mobile App UI Redesign Case Study',
    'p-vuln-scanner': 'Web Vulnerability Scanner',
    'p-phishing-detector': 'Phishing Email Detector',
    'p-network-monitor': 'Home Network Intrusion Monitor',
    'p-url-shortener': 'URL Shortener with Analytics',
  }
  return map[id] || 'a portfolio project'
}

/** Skills a student can plausibly claim from a college background. */
export const suggestedStartingSkills = ['html-css', 'javascript', 'python', 'git', 'sql', 'excel']

export const skillCount = skillCatalog.length

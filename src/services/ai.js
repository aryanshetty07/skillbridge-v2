/**
 * AI client.
 *
 * Two modes, and the UI always states which one is active:
 *
 *  • live  — when VITE_AI_MODE=live and VITE_AI_ENDPOINT points at the bundled
 *            Node proxy (server/index.js). The proxy holds the model API key on
 *            the server; the browser never sees it.
 *  • demo  — no key configured. Answers come from a rule engine over
 *            SkillBridge's own career dataset. Real logic and real numbers,
 *            but NOT a language model. The UI labels it "Demo mode".
 */

import { careers, getCareer } from '../data/careers'
import { roadmaps, getRoadmap } from '../data/roadmaps'
import { projects } from '../data/projects'
import { technicalQuestions, hrQuestions } from '../data/placement'
import { requiredSkillsFor } from './analyzer'

export const AI_MODE = import.meta.env.VITE_AI_MODE === 'live' ? 'live' : 'demo'
const ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || '/api/assistant'

export const modeLabel = AI_MODE === 'live' ? 'Live AI' : 'Demo mode'

export const suggestedQuestions = [
  'Which career suits me if I like building websites?',
  'What skills am I missing for an AI/ML role?',
  'Give me a 6-week plan to learn React',
  'Suggest a good final-year project',
  'How do I prepare for a technical interview?',
  'How can I get an internship in my second year?',
  'What does a data analyst actually do all day?',
  'How should I write my resume as a fresher?',
]

/** Send a conversation to the model (live) or the rule engine (demo). */
export async function askAssistant({ messages, user }) {
  if (AI_MODE === 'live') {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(({ role, content }) => ({ role, content })),
          context: {
            name: user?.name || null,
            education: user?.education || null,
            interests: user?.interests || [],
          },
        }),
      })
      if (!res.ok) throw new Error(`Assistant responded with ${res.status}`)
      const data = await res.json()
      if (!data?.reply) throw new Error('Assistant returned an empty reply')
      return { ok: true, text: data.reply, mode: 'live' }
    } catch (err) {
      return {
        ok: false,
        mode: 'live',
        error: err.message || 'Could not reach the AI service.',
      }
    }
  }

  // Demo mode: a short delay so the typing indicator is honest about work happening.
  const last = messages.filter((m) => m.role === 'user').at(-1)?.content || ''
  await new Promise((resolve) => setTimeout(resolve, 550 + Math.random() * 450))
  return { ok: true, text: demoReply(last, user), mode: 'demo' }
}

/* ------------------------------------------------------------------------ */
/*                         demo rule engine                                  */
/* ------------------------------------------------------------------------ */

const has = (text, words) => words.some((w) => text.includes(w))

function findCareer(text) {
  const direct = careers.find((c) => {
    const t = c.title.toLowerCase()
    return text.includes(t) || text.includes(t.replace(' / ', ' ')) || text.includes(t.split(' ')[0] + ' ' + t.split(' ')[1])
  })
  if (direct) return direct
  const alias = [
    { id: 'web-developer', keys: ['web dev', 'frontend', 'front end', 'react', 'website', 'full stack', 'fullstack', 'web develop'] },
    { id: 'data-analyst', keys: ['data analyst', 'analytics', 'business analyst', 'power bi', 'tableau', 'excel'] },
    { id: 'ai-ml-engineer', keys: ['ai', 'ml', 'machine learning', 'data scientist', 'deep learning', 'llm', 'artificial intelligence'] },
    { id: 'cloud-engineer', keys: ['cloud', 'devops', 'aws', 'azure', 'kubernetes', 'sre', 'infrastructure'] },
    { id: 'ui-ux-designer', keys: ['design', 'ux', 'ui', 'figma', 'product design'] },
    { id: 'cybersecurity-analyst', keys: ['security', 'cyber', 'soc', 'penetration', 'pentest', 'hacking'] },
    { id: 'software-developer', keys: ['software develop', 'sde', 'backend', 'back end', 'java', 'dsa', 'coding role'] },
  ].find((a) => has(text, a.keys))
  return alias ? getCareer(alias.id) : null
}

function list(items) {
  return items.map((i) => `- ${i}`).join('\n')
}

function demoReply(raw, user) {
  const text = raw.toLowerCase().trim()
  const career = findCareer(text)
  const name = user?.name ? user.name.split(' ')[0] : 'there'

  if (!text) return `Ask me anything about careers, skills or placements.`

  if (has(text, ['hi', 'hello', 'hey', 'namaste']) && text.length < 20) {
    return `Hi ${name} 👋 I can help with three things:\n\n- **Choosing a direction** — compare the 7 career tracks\n- **Closing a gap** — what to learn next, in what order\n- **Getting hired** — projects, resumes and interview prep\n\nWhat are you deciding right now?`
  }

  // Salary
  if (has(text, ['salary', 'package', 'lpa', 'pay', 'ctc', 'stipend'])) {
    if (career) {
      return `### ${career.title} — indicative pay\n\n- **Entry (0–2 yrs):** ${career.salary.entry}\n- **Mid (3–5 yrs):** ${career.salary.mid}\n- **Senior (6+ yrs):** ${career.salary.senior}\n\nThese are averages from public Indian job-market data, not offers. Two things move your number more than anything else: a shipped project with real users, and being able to explain your decisions in an interview.\n\nWant me to show the skills that unlock the mid band?`
    }
    return `Pay varies by role and city more than most students expect. Rough entry ranges for Indian freshers:\n\n${list(careers.map((c) => `**${c.title}** — ${c.salary.entry}`))}\n\nThese are indicative averages, not guarantees. If you tell me a role I can go deeper.`
  }

  // Interview
  if (has(text, ['interview', 'mock', 'hr round', 'technical round', 'questions asked'])) {
    const sample = technicalQuestions.filter((q) => (career ? q.track.toLowerCase().includes(career.title.split(' ')[0].toLowerCase()) : true)).slice(0, 3)
    const hr = hrQuestions.slice(0, 2)
    return `### Preparing for interviews\n\n**Structure beats volume.** Four rounds to prepare for:\n\n1. **Online assessment** — DSA patterns, 45 minutes, 2 problems. Practise arrays, strings, hashing and binary search first.\n2. **Technical round** — your resume is the question paper. Anything on it is fair game.\n3. **HR round** — motivation, teamwork, failure. Have stories, not adjectives.\n4. **Manager round** — ambiguity and ownership. Show how you decide.\n\n**Questions you should be able to answer today:**\n${list([...sample.map((q) => q.q), ...hr.map((q) => q.q)].slice(0, 5))}\n\nUse the Mock Interview section to practise out loud with a timer — reading answers silently does not build the recall you need under pressure.`
  }

  // Internship
  if (has(text, ['internship', 'intern', 'job hunt', 'apply', 'referral'])) {
    return `### Getting your first internship\n\n**The honest order of leverage:**\n\n1. **Referrals first.** Cold applications convert at roughly 1–2%; a referral from a senior or alumni converts far better. Message 10 alumni on LinkedIn with one specific line about their work.\n2. **Have one thing worth clicking.** A deployed project with a README that explains the problem, your decisions and the result. Without this, referrals stall.\n3. **Apply where you are above the bar.** Second-year students should target startups and early-stage teams, not large-company campus programmes that filter on year of study.\n4. **Build in public.** Post what you shipped, weekly. Recruiters do check GitHub activity.\n\nA realistic timeline: 4–6 weeks of focused applications with a portfolio usually produces 2–4 interviews. If it produces none, the portfolio or resume is the problem — not the market.`
  }

  // Resume
  if (has(text, ['resume', 'cv', 'portfolio review', 'ats'])) {
    return `### Resume rules for freshers\n\n- **One page.** Recruiters spend about 7 seconds on the first pass.\n- **Projects above coursework.** Two projects with live links beat five college assignments.\n- **Quantify everything.** "Cut load time from 4.2s to 1.3s" beats "improved performance".\n- **Mirror the job description's keywords.** ATS matches strings, not synonyms.\n- **No photo, no CGPA badge, no skill progress bars.**\n\nBefore you send it: read every line and ask "would I be able to defend this for five minutes?" If not, cut it or learn it.\n\nThe Placement Prep page has a full checklist you can work through.`
  }

  // Projects
  if (has(text, ['project', 'build something', 'final year', 'side project', 'portfolio idea'])) {
    const category = has(text, ['ai', 'ml', 'machine learning']) ? 'AI/ML'
      : has(text, ['data', 'analytics']) ? 'Data Science'
      : has(text, ['iot', 'hardware', 'sensor']) ? 'IoT'
      : has(text, ['cloud', 'devops', 'aws']) ? 'Cloud'
      : has(text, ['security', 'cyber']) ? 'Cybersecurity'
      : null
    const pool = projects.filter((p) => (category ? p.category === category : true))
    const picks = [pool.find((p) => p.difficulty === 'Intermediate') || pool[0], pool.find((p) => p.difficulty === 'Advanced'), pool.find((p) => p.difficulty === 'Beginner')].filter(Boolean)
    return `### Project ideas that actually help you get hired\n\nWhat separates a portfolio project from a tutorial:\n\n- It solves a problem someone other than you has\n- It is deployed, with a link\n- It has a README explaining the decisions you rejected\n\n**Good options right now${category ? ` in ${category}` : ''}:**\n${list(picks.map((p) => `**${p.title}** (${p.difficulty}, ${p.duration}) — ${p.outcome}`))}\n\nOpen the Project Hub to see the full step-by-step build guide for any of these.`
  }

  // Skill gap / what to learn
  if (has(text, ['missing', 'skill gap', 'what should i learn', 'skills do i need', 'required skills', 'learn to become'])) {
    if (career) {
      const req = requiredSkillsFor(career.id)
      const core = req.filter((r) => r.level === 'core').map((r) => r.name)
      const imp = req.filter((r) => r.level === 'important').map((r) => r.name)
      return `### Skills for ${career.title}\n\n**Core (non-negotiable)**\n${list(core)}\n\n**Important (gets you shortlisted)**\n${list(imp)}\n\n**Difficulty:** ${career.difficulty} · **Demand:** ${career.demand}\n\nRather than guessing where you stand, run the **Skill Gap Analyzer** — it compares your actual skills against this list and gives you a weighted match score plus a six-week plan for whatever is missing.`
    }
    return `Tell me the role you are targeting and I will list exactly what it requires. For a quick reference:\n\n${list(careers.map((c) => `**${c.title}** — ${c.skills.filter((s) => s.level === 'core').slice(0, 3).map((s) => s.name).join(', ')}`))}\n\nThe Skill Gap Analyzer goes further: it scores you against a role and ranks what to learn first.`
  }

  // Learning plan / roadmap
  if (has(text, ['roadmap', 'learning path', 'how do i learn', 'learn react', 'study plan', 'weeks', 'start learning', 'beginner'])) {
    const target = career || getCareer('web-developer')
    const roadmap = getRoadmap(target.id)
    const beginner = roadmap.levels[0]
    return `### ${roadmap.title}\n\n${roadmap.summary}\n\n**Level 1 — ${beginner.label} (${beginner.weeks})**\n${list(beginner.topics.map((t) => `**${t.title}** — ${t.summary} (~${t.hours}h)`))}\n\nGoal for this level: ${beginner.goal}\n\nAfter that, level 2 covers ${roadmap.levels[1].topics.map((t) => t.title.toLowerCase()).slice(0, 3).join(', ')}.\n\nThe Learning Roadmaps page lets you tick topics off and keeps your progress, so you can see exactly where you stopped.`
  }

  // Career recommendation / which career
  if (has(text, ['which career', 'what career', 'should i choose', 'confused', 'suit me', 'recommend a career', 'good career', 'future scope', 'career option'])) {
    return `### Choosing a direction\n\nDo not choose by salary alone — choose by what you can stand doing for two years. A quick map:\n\n- **You like making things people can see** → Web Developer or UI/UX Designer\n- **You like patterns and puzzles** → Software Developer (DSA-heavy)\n- **You like explaining numbers to people** → Data Analyst\n- **You like maths and models** → AI/ML Engineer (hardest, highest ceiling)\n- **You like systems and reliability** → Cloud Engineer\n- **You like breaking things carefully** → Cybersecurity Analyst\n\n**A useful test:** pick one and build the smallest possible project in it this week. Two weekends of real work tells you more than two months of reading about it.\n\nIf you tell me your interests and current skills, I can narrow it to two options — or run the Skill Gap Analyzer, which scores you against any role.`
  }

  // Specific career description
  if (career && has(text, ['what does', 'what is', 'day', 'do all day', 'about', 'worth it', 'scope'])) {
    return `### ${career.title}\n\n${career.description}\n\n**A typical day**\n${list(career.dayInLife)}\n\n**Skills that matter:** ${career.skills.filter((s) => s.level === 'core').map((s) => s.name).join(', ')}\n\n**Indicative pay:** ${career.salary.entry} to start, ${career.salary.senior} at senior level.\n\n**Where it leads**\n${list(career.opportunities.slice(0, 4))}\n\nOpen the career page for the full skill table and a level-wise roadmap.`
  }

  if (career) {
    return `### ${career.title}\n\n${career.tagline}. ${career.description}\n\n**Core skills:** ${career.skills.filter((s) => s.level === 'core').map((s) => s.name).join(', ')}\n**Difficulty:** ${career.difficulty}\n**Indicative pay:** ${career.salary.entry} (entry)\n\nAsk me about the learning roadmap, the required skills, project ideas or interview prep for this role.`
  }

  // Aptitude / placement
  if (has(text, ['aptitude', 'quant', 'reasoning', 'placement prep', 'campus placement'])) {
    return `### Campus placement prep\n\nMost Indian campus processes follow the same four stages:\n\n1. **Aptitude / online test** — quant, logical reasoning, verbal. Speed matters more than depth; practise with a timer.\n2. **Coding round** — usually 2 problems in 45–60 minutes. Patterns, not obscure algorithms.\n3. **Technical interview** — DSA plus your projects plus CS fundamentals.\n4. **HR interview** — motivation and fit.\n\nThe Placement Prep page has aptitude questions with explanations, technical and HR question banks, and a mock interview with a timer. Start with aptitude if your test is within two weeks — it is the fastest score to move.`
  }

  // Fallback
  const sample = careers.slice(0, 3).map((c) => `**${c.title}** — ${c.tagline}`)
  return `I can help with careers, skills, projects, resumes and interview prep. I did not catch a specific question in that, so here is what I can do concretely:\n\n${list(sample)}\n\nTry asking something like:\n- "What skills do I need for a cloud engineer role?"\n- "Suggest a beginner project I can finish in two weeks"\n- "How do I answer 'tell me about yourself'?"\n\nFor a scored, personalised answer, the Skill Gap Analyzer is more useful than chat — it uses your actual skill list.`
}

export const assistantMeta = {
  mode: AI_MODE,
  endpoint: ENDPOINT,
  model: import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini (via server proxy)',
}

export { roadmaps }

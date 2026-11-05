/**
 * SkillBridge AI proxy — optional, only needed for live AI mode.
 *
 * Keeps the model API key on the server. The browser calls POST /api/assistant
 * and never sees a key. Works with any OpenAI-compatible chat completions API
 * (OpenAI, Groq, Together, Fireworks, a self-hosted gateway, ...).
 *
 *   AI_API_KEY=sk-...            (required to run in live mode)
 *   AI_BASE_URL=https://api.openai.com/v1   (default)
 *   AI_MODEL=gpt-4o-mini                    (default)
 *   PORT=8787                               (default)
 *
 * Run:  node server/index.js
 * Then point the frontend at it:
 *   VITE_AI_MODE=live
 *   VITE_AI_ENDPOINT=http://localhost:8787/api/assistant
 *
 * With no AI_API_KEY the route returns 503 and the UI keeps working in demo mode.
 */

import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, '..', 'dist')

const PORT = Number(process.env.PORT || 8787)
const API_KEY = process.env.AI_API_KEY || ''
const BASE_URL = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
const MODEL = process.env.AI_MODEL || 'gpt-4o-mini'
const MAX_BODY = 64 * 1024
const RATE_LIMIT = { windowMs: 60_000, max: 20 }

const buckets = new Map()

const SYSTEM_PROMPT = `You are the SkillBridge career assistant, helping Indian college students and fresh graduates with career choices, skills, projects, internships and placement preparation.

Rules:
- Be specific and practical. Prefer concrete next steps over motivational filler.
- Structure answers with a short "### Heading" and 3-6 bullet points. Keep answers under 220 words unless asked for a plan.
- Use Indian context: LPA salary ranges, campus placements, service vs product companies. Label salary figures as indicative.
- Never promise a job, an internship, a salary or an interview. Never invent statistics or company-specific hiring data.
- If asked something outside careers and education, say so briefly and redirect.
- If you are unsure, say you are unsure.`

function json(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  })
  res.end(body)
}

function rateLimited(ip) {
  const now = Date.now()
  const bucket = buckets.get(ip) || { count: 0, reset: now + RATE_LIMIT.windowMs }
  if (now > bucket.reset) {
    bucket.count = 0
    bucket.reset = now + RATE_LIMIT.windowMs
  }
  bucket.count += 1
  buckets.set(ip, bucket)
  return bucket.count > RATE_LIMIT.max
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('Request body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

async function handleAssistant(req, res) {
  if (!API_KEY) {
    json(res, 503, {
      error: 'Live AI is not configured on this server. Set AI_API_KEY to enable it, or use the frontend demo mode.',
    })
    return
  }

  const ip = req.socket.remoteAddress || 'unknown'
  if (rateLimited(ip)) {
    json(res, 429, { error: 'Too many requests. Wait a minute and try again.' })
    return
  }

  let body
  try {
    body = await readBody(req)
  } catch (err) {
    json(res, 400, { error: err.message })
    return
  }

  const messages = Array.isArray(body.messages) ? body.messages : []
  if (!messages.length) {
    json(res, 400, { error: 'messages[] is required' })
    return
  }

  // Keep the last 12 turns and strip anything unexpected.
  const history = messages
    .slice(-12)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }))

  const context = body.context || {}
  const contextLine = [
    context.name ? `Student name: ${context.name}.` : '',
    context.education ? `Education level: ${context.education}.` : '',
    context.interests?.length ? `Interests: ${context.interests.join(', ')}.` : '',
  ]
    .filter(Boolean)
    .join(' ')

  try {
    const upstream = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.6,
        max_tokens: 600,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + (contextLine ? `\n\nStudent context: ${contextLine}` : '') },
          ...history,
        ],
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('[ai] upstream error', upstream.status, detail.slice(0, 400))
      json(res, 502, { error: `The model provider returned ${upstream.status}.` })
      return
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      json(res, 502, { error: 'The model returned an empty response.' })
      return
    }
    json(res, 200, { reply, model: MODEL })
  } catch (err) {
    console.error('[ai] request failed', err)
    json(res, 502, { error: 'Could not reach the model provider.' })
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
}

async function serveStatic(req, res) {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '')
  let filePath = path.join(DIST, safePath === '/' ? 'index.html' : safePath)

  if (!filePath.startsWith(DIST)) {
    res.writeHead(403).end('Forbidden')
    return
  }

  try {
    const data = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' })
    res.end(data)
  } catch {
    try {
      const fallback = await readFile(path.join(DIST, 'index.html'))
      res.writeHead(200, { 'Content-Type': MIME['.html'] })
      res.end(fallback)
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found. Run `npm run build` first.')
    }
  }
}

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (req.method === 'OPTIONS') {
    json(res, 204, {})
    return
  }
  if (pathname === '/api/health') {
    json(res, 200, { ok: true, live: Boolean(API_KEY), model: API_KEY ? MODEL : null })
    return
  }
  if (pathname === '/api/assistant' && req.method === 'POST') {
    await handleAssistant(req, res)
    return
  }
  if (pathname.startsWith('/api/')) {
    json(res, 404, { error: 'Unknown API route' })
    return
  }
  await serveStatic(req, res)
})

server.listen(PORT, () => {
  console.log(`SkillBridge server on http://localhost:${PORT}`)
  console.log(`AI mode: ${API_KEY ? `live (${MODEL})` : 'demo only — set AI_API_KEY to enable live replies'}`)
})

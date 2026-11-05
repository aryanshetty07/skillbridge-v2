import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Clock,
  MessageSquarePlus,
  Send,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react'
import { AI_MODE, assistantMeta, askAssistant, modeLabel, suggestedQuestions } from '../services/ai'
import { Badge } from '../components/ui'
import { read, write } from '../utils/storage'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const SESSIONS_KEY = 'assistant:sessions'
const MAX_SESSIONS = 8

const welcome = {
  role: 'assistant',
  content:
    "Hi — I'm the SkillBridge career assistant. I can help you choose a direction, work out what to learn next, find a project worth building, or prepare for interviews.\n\nTell me where you are: your year, your current skills, and the role you are curious about.",
}

/* ------------------------------------------------------- rich text --- */

function inline(text, keyBase) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyBase}-${i}`}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={`${keyBase}-${i}`}>{part.slice(1, -1)}</code>
    }
    return <span key={`${keyBase}-${i}`}>{part}</span>
  })
}

function RichText({ text }) {
  const blocks = []
  let list = null
  let listType = null
  let idx = 0

  const flush = () => {
    if (!list) return
    const items = list
    blocks.push(
      listType === 'ol' ? (
        <ol key={`l-${idx++}`} style={{ paddingLeft: 20, margin: '6px 0 10px' }}>
          {items.map((it, i) => (
            <li key={i}>{inline(it, `li-${i}`)}</li>
          ))}
        </ol>
      ) : (
        <ul key={`l-${idx++}`} style={{ paddingLeft: 18, margin: '6px 0 10px', listStyle: 'disc' }}>
          {items.map((it, i) => (
            <li key={i}>{inline(it, `li-${i}`)}</li>
          ))}
        </ul>
      ),
    )
    list = null
    listType = null
  }

  text.split('\n').forEach((raw) => {
    const line = raw.trim()
    if (!line) {
      flush()
      return
    }
    if (line.startsWith('### ')) {
      flush()
      blocks.push(<h4 key={`h-${idx++}`}>{inline(line.slice(4), `h-${idx}`)}</h4>)
      return
    }
    if (/^[-*]\s/.test(line)) {
      if (listType !== 'ul') flush()
      listType = 'ul'
      list = list || []
      list.push(line.replace(/^[-*]\s/, ''))
      return
    }
    if (/^\d+\.\s/.test(line)) {
      if (listType !== 'ol') flush()
      listType = 'ol'
      list = list || []
      list.push(line.replace(/^\d+\.\s/, ''))
      return
    }
    flush()
    blocks.push(<p key={`p-${idx++}`}>{inline(line, `p-${idx}`)}</p>)
  })
  flush()

  return <>{blocks}</>
}

/* ------------------------------------------------------------ page --- */

export default function Assistant() {
  const { user } = useAuth()
  const toast = useToast()

  const [sessions, setSessions] = useState(() => read(SESSIONS_KEY, []))
  const [activeId, setActiveId] = useState(() => read(SESSIONS_KEY, [])[0]?.id || null)
  const [messages, setMessages] = useState(() => read(SESSIONS_KEY, [])[0]?.messages || [welcome])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [error, setError] = useState(null)
  const [lastPrompt, setLastPrompt] = useState('')
  const logRef = useRef(null)
  const taRef = useRef(null)
  const sessionIdRef = useRef(activeId)

  const activeSession = useMemo(() => sessions.find((s) => s.id === activeId), [sessions, activeId])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, typing])

  const persist = (nextMessages, sessionId) => {
    const id = sessionId || sessionIdRef.current || `s_${Date.now()}`
    sessionIdRef.current = id
    const title = nextMessages.find((m) => m.role === 'user')?.content?.slice(0, 48) || 'New conversation'
    setSessions((prev) => {
      const others = prev.filter((s) => s.id !== id)
      const next = [{ id, title, messages: nextMessages, at: new Date().toISOString() }, ...others].slice(0, MAX_SESSIONS)
      write(SESSIONS_KEY, next)
      return next
    })
    setActiveId(id)
  }

  const send = async (rawText) => {
    const text = (rawText ?? input).trim()
    if (!text || typing) return
    setError(null)
    setLastPrompt(text)
    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setTyping(true)
    persist(next)

    const res = await askAssistant({ messages: next, user })
    setTyping(false)

    if (!res.ok) {
      setError(res.error || 'The assistant is unavailable right now.')
      return
    }

    const withReply = [...next, { role: 'assistant', content: res.text }]
    setMessages(withReply)
    persist(withReply)
  }

  const newChat = () => {
    sessionIdRef.current = null
    setMessages([welcome])
    setActiveId(null)
    setError(null)
    setInput('')
    taRef.current?.focus()
  }

  const openSession = (s) => {
    sessionIdRef.current = s.id
    setActiveId(s.id)
    setMessages(s.messages)
    setError(null)
  }

  const clearAll = () => {
    write(SESSIONS_KEY, [])
    setSessions([])
    newChat()
    toast.info('Chat history cleared')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <section className="page-head" style={{ paddingBottom: 26 }}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>AI Career Assistant</span>
          </div>
          <div className="row gap-12 wrap" style={{ alignItems: 'center' }}>
            <span className="eyebrow" style={{ marginBottom: 0 }}>AI career assistant</span>
            <Badge tone={AI_MODE === 'live' ? 'green' : 'amber'}>
              <Sparkles size={11} /> {AI_MODE === 'live' ? 'Live AI model' : 'Demo mode — not a live model'}
            </Badge>
          </div>
          <h1>Ask anything about careers and placements</h1>
          <p>
            {AI_MODE === 'live'
              ? 'Connected to a language model through a secure server-side proxy — your API key never reaches the browser.'
              : 'This build has no model API key attached, so replies come from a rule-based engine over SkillBridge’s career data. It is clearly labelled and it never pretends to be a language model.'}
          </p>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 26, paddingBottom: 60 }}>
        <div className="container">
          <div className="chat-layout">
            {/* ---------------------------------------------- sidebar */}
            <aside className="chat-sidebar">
              <div className="side-block">
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <h4 style={{ margin: 0 }}>Conversations</h4>
                  <button type="button" className="icon-btn" style={{ width: 26, height: 26 }} onClick={newChat} aria-label="New conversation">
                    <MessageSquarePlus size={14} />
                  </button>
                </div>

                {sessions.length === 0 ? (
                  <p className="tiny muted">No saved conversations yet. Your chats stay in this browser.</p>
                ) : (
                  <>
                    {sessions.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        className={`history-item ${activeId === s.id ? 'active' : ''}`}
                        onClick={() => openSession(s)}
                      >
                        <Clock size={12} style={{ flex: 'none' }} />
                        <span>{s.title}</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      className="history-item"
                      onClick={clearAll}
                      style={{ color: 'var(--rose-500)', marginTop: 6 }}
                    >
                      <Trash2 size={12} /> Clear all history
                    </button>
                  </>
                )}
              </div>

              <div className="side-block">
                <h4>Try asking</h4>
                {suggestedQuestions.slice(0, 6).map((q) => (
                  <button type="button" className="suggest-btn" key={q} onClick={() => send(q)} disabled={typing}>
                    {q}
                  </button>
                ))}
              </div>

              <div className="side-block">
                <h4>How this works</h4>
                <p className="tiny muted" style={{ lineHeight: 1.6, marginBottom: 10 }}>
                  {AI_MODE === 'live'
                    ? 'Messages are sent to a server route that calls the model with your API key. Nothing is stored on a server.'
                    : 'Replies are generated locally from the same career dataset used across this site. No network call is made.'}
                </p>
                <Link to="/skill-gap" className="link-arrow" style={{ fontSize: '0.8rem' }}>
                  Prefer numbers? Run the analyzer <ArrowRight size={13} />
                </Link>
              </div>
            </aside>

            {/* ------------------------------------------------- panel */}
            <div className="chat-panel">
              <div className="chat-panel-head">
                <div className="bot-id">
                  <span className="bot-avatar">
                    <Bot size={19} />
                  </span>
                  <div>
                    <strong>SkillBridge Assistant</strong>
                    <span>
                      {typing ? 'Typing…' : `${modeLabel} · ${AI_MODE === 'live' ? assistantMeta.model : 'rule engine over career data'}`}
                    </span>
                  </div>
                </div>
                <div className="row gap-8">
                  <Badge tone={AI_MODE === 'live' ? 'green' : 'amber'}>{modeLabel}</Badge>
                  <button type="button" className="icon-btn" onClick={newChat} aria-label="Start a new chat" title="New chat">
                    <MessageSquarePlus size={16} />
                  </button>
                </div>
              </div>

              <div className="chat-log" ref={logRef}>
                {messages.map((m, i) => (
                  <div className={`msg ${m.role === 'user' ? 'user' : ''}`} key={i}>
                    <span className="msg-avatar">{m.role === 'user' ? <User size={15} /> : <Bot size={15} />}</span>
                    <div className="msg-bubble">
                      <RichText text={m.content} />
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="msg">
                    <span className="msg-avatar">
                      <Bot size={15} />
                    </span>
                    <div className="msg-bubble" style={{ padding: 0 }}>
                      <div className="typing" aria-label="Assistant is typing">
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-error">
                    <AlertTriangle size={16} style={{ flex: 'none', marginTop: 2 }} />
                    <div>
                      <strong style={{ display: 'block', marginBottom: 4 }}>Could not reach the assistant</strong>
                      {error} — check the server route or your network, then retry.
                      <div className="mt-8">
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => send(lastPrompt)}>
                          Retry
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="chat-input-area">
                <div className="chat-input-row">
                  <textarea
                    ref={taRef}
                    rows={1}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value)
                      e.target.style.height = 'auto'
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Ask about careers, skills, projects or interviews…"
                    aria-label="Message the assistant"
                  />
                  <button type="button" className="send-btn" onClick={() => send()} disabled={!input.trim() || typing} aria-label="Send message">
                    <Send size={16} />
                  </button>
                </div>
                <div className="chat-hint">
                  {AI_MODE === 'live'
                    ? 'Live model responses can be wrong — verify anything important.'
                    : 'Demo mode: responses are rule-based, generated from SkillBridge’s own career data.'}{' '}
                  Enter to send · Shift + Enter for a new line
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

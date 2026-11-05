# SkillBridge — v2 (Editorial)

**An AI-powered career development platform for college students and fresh graduates.**

> **Two designs exist.** v1 is the original navy/purple SaaS interface; this repository is **v2**, a
> different visual direction — paper, ink, a single vermilion accent and a serif display face. Same
> product, same data, same features; the interface language is completely rebuilt.
Discover careers → find your skill gaps → follow a roadmap → build projects → walk into placements prepared.

Built with **React 18 + Vite**, plain CSS, React Router and Lucide icons. No UI framework, no chart
library — the charts are hand-written SVG so the whole app stays small and themeable.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

Production build:

```bash
npm run build        # → dist/  (static, deploy anywhere)
npm run preview      # serve the production build locally
```

Optional single-file build (one self-contained HTML file, opens straight from disk):

```bash
npm run build:single # → dist-single/index.html
```

**Demo account** — email `demo@skillbridge.in`, password `demo1234`. Or sign up; new accounts are
stored in your browser.

---

## What is in the app

| Route | Page | What it does |
|---|---|---|
| `/` | Home | Hero, featured career paths, popular skills, how it works, stats, student stories, CTA |
| `/careers` | Career Explorer | 7 tracks with search, category + difficulty filters, 4 sort modes, list/grid switch, loading/empty states |
| `/careers/:id` | Career detail | Description, ranked skill table, salary bands, difficulty, opportunities, related roles, "set as my goal" |
| `/skill-gap` | AI Skill Gap Analyzer | Skill picker + target role → weighted match score, radar chart, ranked gaps, 6-week plan, recommendations |
| `/roadmaps` | Learning Roadmaps | 7 paths × 3 levels, 84 topics with hours + resources, per-topic completion, progress tracking |
| `/projects` | Project Hub | 36 briefs across 6 categories, filters, save/unsave, full step-by-step build guide in a modal |
| `/assistant` | AI Career Assistant | Chat UI with suggested questions, saved history, typing state, retry on error, honest mode labelling |
| `/placement` | Placement Prep | Technical + HR banks, resume guide, timed aptitude quiz, coding resources, mock interview, progress checklist |
| `/dashboard` | Student Dashboard | Greeting, career goal, skill + roadmap progress, saved projects, recommendations, activity, notifications |
| `/login`, `/register` | Auth | Validated forms, password strength, demo login, session persistence |
| `/about` | About | Mission, principles, team, FAQ, honest disclaimer |
| `*` | 404 | Useful recovery links |

Everything is functional: every button navigates, filters, saves, or computes something. There are no
dead links or placeholder actions.

---

## Project structure

```
skillbridge/
├── index.html
├── vite.config.js               # standard build
├── vite.single.config.js        # one-file build
├── server/
│   └── index.js                 # optional AI proxy + static host (no dependencies)
├── src/
│   ├── main.jsx
│   ├── App.jsx                  # router + providers
│   ├── components/
│   │   ├── Navbar.jsx  Footer.jsx  Layout.jsx  ProtectedRoute.jsx
│   │   ├── CareerCard.jsx  Icon.jsx
│   │   ├── ui.jsx               # Badge, ProgressBar, Modal, EmptyState, SearchInput, …
│   │   └── charts.jsx           # ProgressRing, RadarChart, SparkBars (pure SVG)
│   ├── context/
│   │   ├── AuthContext.jsx      # localStorage accounts + session
│   │   ├── ProgressContext.jsx  # per-user progress, activities, notifications
│   │   └── ToastContext.jsx
│   ├── data/
│   │   ├── careers.js           # 7 careers, skills, salary bands, difficulty
│   │   ├── skills.js            # 40-skill catalogue + per-career requirements
│   │   ├── roadmaps.js          # 84 topics with resources and hours
│   │   ├── projects.js          # 36 projects with build steps
│   │   ├── placement.js         # questions, aptitude, resume tips, mock rounds
│   │   └── site.js              # testimonials, stats, team, FAQ, demo account
│   ├── pages/                   # one file per route
│   ├── services/
│   │   ├── analyzer.js          # skill-gap scoring + roadmap generation
│   │   └── ai.js                # live client + demo rule engine
│   ├── styles/
│   │   ├── global.css           # tokens, base, layout, components
│   │   └── pages.css            # page-level styles
│   └── utils/                   # validation, storage helpers
└── README.md
```

---

## AI integration

The app supports two clearly separated modes, and **the UI always says which one is running**.

### Demo mode (default, no key required)

`VITE_AI_MODE` is unset, so `src/services/ai.js` uses a rule engine over the same career dataset that
powers the rest of the site. It is deterministic logic — not a language model — and every surface that
uses it carries a visible **“Demo mode”** badge. The Skill Gap Analyzer's score is real arithmetic on
your inputs (weighted by core/important/bonus skills), in both modes.

### Live mode (bring your own key)

Keys must never live in frontend code, so the repository ships a small server-side proxy:

```bash
cp .env.example .env          # add AI_API_KEY
node server/index.js          # http://localhost:8787

# in a second terminal, for the frontend:
VITE_AI_MODE=live
VITE_AI_ENDPOINT=http://localhost:8787/api/assistant npm run dev
```

`server/index.js` is dependency-free Node (`node:http`), works with any OpenAI-compatible endpoint
(`AI_BASE_URL`, `AI_MODEL`), rate-limits per IP, caps body size, and returns a clean 503 when no key is
configured — the frontend then stays in demo mode. In production it also serves `dist/` so one process
hosts both the API and the static app.

The system prompt is in `server/index.js`: concise, structured, Indian-context answers with an explicit
instruction never to promise outcomes or invent statistics.

---

## Design system (v2 — "Editorial")

| Token | Value | Use |
|---|---|---|
| Paper | `#F6F2E9` | Page background |
| Paper deep | `#EFE9DC` | Alternating sections |
| Card | `#FFFDF9` | Surfaces, panels |
| Ink | `#16150F` | Text, primary buttons, rules |
| Vermilion | `#D1461C` | The only accent: links, marks, active states |
| Forest | `#12201A` | Dark bands, score panels, footer |
| Sage / gold | `#A9C3B1` / `#C99A3F` | Secondary marks on dark surfaces |

- **Type**: Instrument Serif for display (headlines are large, tight and unfussy), Inter for UI,
  IBM Plex Mono for labels, numbers and metadata. Numbers are tabular everywhere.
- **Structure**: hairline rules instead of shadows and cards-on-grey. Sections are numbered
  (`01 — Career paths`), list views use real rows, and corners are near-square (2–8 px).
- **Interaction**: hover states move a rule or an arrow rather than lifting a box; the only gradients
  are gone entirely — colour comes from one accent used sparingly.
- **New UX in v2**: careers open as a scannable list (role, skills, indicative salary, arrow) with a
  List/Grid switch; the home page is an editorial narrative with numbered sections; roadmap, project
  and question banks are rule-separated rows; dashboard metrics are a bordered strip rather than
  floating cards.
- Responsive at 1180 / 980 / 760 px: the career list collapses to index + role + arrow, grids go
  single-column, the chat panel moves above its sidebar, and the navbar becomes a sheet.
- `prefers-reduced-motion` respected; focus rings are a 2 px accent outline.

## Data and honesty

- Salary ranges are **indicative averages** from public Indian job-market data and are labelled as such
  on the career pages. They are not offers or guarantees.
- Students in the testimonials, the team, and the college logos are **fictional/illustrative**.
- Authentication is a **demo**: accounts are stored in `localStorage` with a non-cryptographic digest.
  A real deployment must hash server-side (bcrypt/argon2) and never trust the client.
- The mock interview is a timer plus self-rating tool, not an AI interviewer — the UI says so.
- The site never claims a placement guarantee.

---

## Persistence keys

`localStorage`, all namespaced under `skillbridge:` — `users`, `session`, `progress:<email>`,
`assistant:sessions`. Clearing site data resets the demo. Guest progress is stored under
`progress:guest` and is not merged into an account on login.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run build:single` | One self-contained HTML file in `dist-single/` |
| `npm run server` | Optional AI proxy + static host on port 8787 |

---

## Browser support

Modern evergreen browsers (Chrome/Edge 100+, Firefox 100+, Safari 15+). Uses `backdrop-filter`,
CSS `mask-image`, and `Intl` date formatting; graceful degradation everywhere else.

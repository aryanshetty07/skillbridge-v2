/**
 * Learning roadmaps — 3 levels per career.
 * Resource links point to well-known free documentation / course sites.
 * `hours` is an estimated focused-study time for a student starting from zero.
 */

const R = (title, url, type) => ({ title, url, type })

export const roadmaps = {
  'web-developer': {
    careerId: 'web-developer',
    title: 'Web Developer Path',
    summary:
      'From your first HTML page to a deployed full-stack app. Front-load visible output so you have a portfolio by the end of level 2.',
    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        weeks: '4–6 weeks',
        goal: 'Build and publish three static pages without copying a tutorial end-to-end.',
        topics: [
          {
            id: 'web-html',
            title: 'HTML structure & semantics',
            summary: 'Elements, forms, accessibility basics and document structure.',
            hours: 8,
            resources: [R('MDN — HTML basics', 'https://developer.mozilla.org/en-US/docs/Learn/HTML', 'doc')],
          },
          {
            id: 'web-css',
            title: 'CSS layout: Flexbox & Grid',
            summary: 'Box model, responsive units, flexbox, grid and mobile-first breakpoints.',
            hours: 12,
            resources: [
              R('MDN — CSS layout', 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout', 'doc'),
              R('Flexbox Froggy (game)', 'https://flexboxfroggy.com/', 'practice'),
            ],
          },
          {
            id: 'web-js-basics',
            title: 'JavaScript fundamentals',
            summary: 'Variables, functions, arrays, objects, DOM events and fetch.',
            hours: 20,
            resources: [R('javascript.info', 'https://javascript.info/', 'course')],
          },
          {
            id: 'web-git',
            title: 'Git & GitHub workflow',
            summary: 'Commit, branch, merge, pull requests and hosting with GitHub Pages.',
            hours: 5,
            resources: [R('GitHub Skills', 'https://skills.github.com/', 'practice')],
          },
        ],
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        weeks: '8–10 weeks',
        goal: 'Ship a React app that talks to a real API and persists data.',
        topics: [
          {
            id: 'web-react',
            title: 'React fundamentals',
            summary: 'Components, props, state, hooks, lists, forms and conditional rendering.',
            hours: 24,
            resources: [R('React — official tutorial', 'https://react.dev/learn', 'doc')],
          },
          {
            id: 'web-router',
            title: 'Client-side routing & state',
            summary: 'React Router, context, and when to reach for a state library.',
            hours: 10,
            resources: [R('React Router docs', 'https://reactrouter.com/en/main', 'doc')],
          },
          {
            id: 'web-api',
            title: 'REST APIs with Node.js',
            summary: 'Express routes, validation, error handling, and connecting a database.',
            hours: 18,
            resources: [R('Express guide', 'https://expressjs.com/en/guide/routing.html', 'doc')],
          },
          {
            id: 'web-db',
            title: 'Databases: SQL vs MongoDB',
            summary: 'Schema design, queries, indexes and choosing the right store.',
            hours: 12,
            resources: [R('SQLBolt', 'https://sqlbolt.com/', 'practice')],
          },
          {
            id: 'web-deploy',
            title: 'Deploy & monitor',
            summary: 'Environment variables, build pipelines, custom domains and logs.',
            hours: 6,
            resources: [R('Vercel deployment docs', 'https://vercel.com/docs', 'doc')],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        weeks: '10–12 weeks',
        goal: 'Work like a junior engineer: typed code, tests, performance budgets, reviews.',
        topics: [
          {
            id: 'web-ts',
            title: 'TypeScript in production',
            summary: 'Generics, narrowing, typing API contracts and migrating a JS codebase.',
            hours: 20,
            resources: [R('TypeScript Handbook', 'https://www.typescriptlang.org/docs/handbook/intro.html', 'doc')],
          },
          {
            id: 'web-testing',
            title: 'Testing & quality gates',
            summary: 'Vitest unit tests, React Testing Library, Playwright smoke tests, CI.',
            hours: 16,
            resources: [R('Testing Library docs', 'https://testing-library.com/docs/', 'doc')],
          },
          {
            id: 'web-perf',
            title: 'Performance & accessibility',
            summary: 'Core Web Vitals, code splitting, Lighthouse audits, WCAG basics.',
            hours: 12,
            resources: [R('web.dev — Learn Performance', 'https://web.dev/learn/performance', 'course')],
          },
          {
            id: 'web-system',
            title: 'System design for the web',
            summary: 'Caching, CDNs, queues, rate limits and designing for 100k users.',
            hours: 14,
            resources: [R('System Design Primer', 'https://github.com/donnemartin/system-design-primer', 'repo')],
          },
        ],
      },
    ],
  },

  'data-analyst': {
    careerId: 'data-analyst',
    title: 'Data Analyst Path',
    summary:
      'SQL first — it is the single highest-return skill for analytics interviews. Build one dashboard that a real person would actually use.',
    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        weeks: '4–5 weeks',
        goal: 'Answer business questions in SQL and present findings in a clean dashboard.',
        topics: [
          {
            id: 'da-excel',
            title: 'Spreadsheet fluency',
            summary: 'Pivot tables, lookups, cleaning messy data, charts.',
            hours: 8,
            resources: [R('Google Sheets training', 'https://support.google.com/a/users/answer/9282959', 'doc')],
          },
          {
            id: 'da-sql-basics',
            title: 'SQL: SELECT to JOIN',
            summary: 'Filtering, aggregation, GROUP BY, joins and subqueries.',
            hours: 18,
            resources: [R('SQLBolt', 'https://sqlbolt.com/', 'practice'), R('Mode SQL tutorial', 'https://mode.com/sql-tutorial/', 'course')],
          },
          {
            id: 'da-stats-basics',
            title: 'Descriptive statistics',
            summary: 'Mean vs median, distributions, correlation and misleading charts.',
            hours: 8,
            resources: [R('Khan Academy — Statistics', 'https://www.khanacademy.org/math/statistics-probability', 'course')],
          },
          {
            id: 'da-viz',
            title: 'Visualisation principles',
            summary: 'Choosing chart types, colour, labelling and annotation.',
            hours: 6,
            resources: [R('Data-to-Viz', 'https://www.data-to-viz.com/', 'doc')],
          },
        ],
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        weeks: '6–8 weeks',
        goal: 'Own an end-to-end analysis in Python and publish a BI dashboard.',
        topics: [
          {
            id: 'da-pandas',
            title: 'Python for data analysis',
            summary: 'pandas DataFrames, joins, groupby, time series and cleaning.',
            hours: 20,
            resources: [R('Kaggle — Pandas course', 'https://www.kaggle.com/learn/pandas', 'course')],
          },
          {
            id: 'da-eda',
            title: 'Exploratory data analysis',
            summary: 'Matplotlib/Seaborn, outlier handling, feature intuition.',
            hours: 12,
            resources: [R('Kaggle — Data Visualisation', 'https://www.kaggle.com/learn/data-visualization', 'course')],
          },
          {
            id: 'da-bi',
            title: 'Power BI / Tableau',
            summary: 'Data models, DAX basics, drill-downs and publishing reports.',
            hours: 16,
            resources: [R('Microsoft Learn — Power BI', 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', 'course')],
          },
          {
            id: 'da-ab',
            title: 'A/B testing & experimentation',
            summary: 'Hypotheses, sample size, p-values, practical significance.',
            hours: 10,
            resources: [R('Trustworthy Online Experiments (book notes)', 'https://experimentguide.com/', 'book')],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        weeks: '8–10 weeks',
        goal: 'Be the analyst a product team trusts with ambiguous questions.',
        topics: [
          {
            id: 'da-window',
            title: 'Advanced SQL & warehousing',
            summary: 'Window functions, CTEs, query performance, star schemas.',
            hours: 16,
            resources: [R('PostgreSQL window functions', 'https://www.postgresql.org/docs/current/tutorial-window.html', 'doc')],
          },
          {
            id: 'da-causal',
            title: 'Causal inference essentials',
            summary: 'Confounders, cohort analysis, difference-in-differences.',
            hours: 14,
            resources: [R('Causal Inference: The Mixtape', 'https://mixtape.scunning.com/', 'book')],
          },
          {
            id: 'da-pipeline',
            title: 'Light data engineering',
            summary: 'Scheduled jobs, dbt-style transforms, data quality checks.',
            hours: 12,
            resources: [R('dbt — getting started', 'https://docs.getdbt.com/docs/introduction', 'doc')],
          },
          {
            id: 'da-story',
            title: 'Executive communication',
            summary: 'One-page memos, decision framing, presenting to non-technical stakeholders.',
            hours: 8,
            resources: [R('Storytelling with Data (blog)', 'https://www.storytellingwithdata.com/blog', 'blog')],
          },
        ],
      },
    ],
  },

  'ai-ml-engineer': {
    careerId: 'ai-ml-engineer',
    title: 'AI / ML Engineer Path',
    summary:
      'Maths and Python first, then one model you can defend line by line, then deployment. Depth in one project beats ten tutorials.',
    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        weeks: '6–8 weeks',
        goal: 'Train and evaluate a classical model on a dataset you cleaned yourself.',
        topics: [
          {
            id: 'ml-python',
            title: 'Python for ML',
            summary: 'NumPy, pandas, notebooks, virtual environments.',
            hours: 20,
            resources: [R('Kaggle — Python', 'https://www.kaggle.com/learn/python', 'course')],
          },
          {
            id: 'ml-maths',
            title: 'Maths that matters',
            summary: 'Vectors, matrices, derivatives, probability and gradients.',
            hours: 24,
            resources: [R('3Blue1Brown — Linear Algebra', 'https://www.3blue1brown.com/topics/linear-algebra', 'video')],
          },
          {
            id: 'ml-sklearn',
            title: 'Classical ML with scikit-learn',
            summary: 'Regression, trees, cross-validation, metrics and overfitting.',
            hours: 18,
            resources: [R('scikit-learn user guide', 'https://scikit-learn.org/stable/user_guide.html', 'doc')],
          },
          {
            id: 'ml-kaggle',
            title: 'Your first Kaggle competition',
            summary: 'Read a leaderboard, build a baseline, iterate on features.',
            hours: 10,
            resources: [R('Kaggle competitions', 'https://www.kaggle.com/competitions', 'practice')],
          },
        ],
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        weeks: '10–12 weeks',
        goal: 'Fine-tune or build a neural network and serve it behind an API.',
        topics: [
          {
            id: 'ml-dl',
            title: 'Deep learning with PyTorch',
            summary: 'Tensors, autograd, CNNs, training loops, regularisation.',
            hours: 30,
            resources: [R('PyTorch tutorials', 'https://pytorch.org/tutorials/', 'course')],
          },
          {
            id: 'ml-nlp',
            title: 'Transformers & NLP',
            summary: 'Tokenisation, attention, embeddings and fine-tuning a small model.',
            hours: 24,
            resources: [R('Hugging Face course', 'https://huggingface.co/learn/nlp-course', 'course')],
          },
          {
            id: 'ml-llm',
            title: 'LLM application engineering',
            summary: 'Prompting, RAG, evaluation and guardrails.',
            hours: 16,
            resources: [R('Prompt Engineering Guide', 'https://www.promptingguide.ai/', 'doc')],
          },
          {
            id: 'ml-serving',
            title: 'Model serving basics',
            summary: 'FastAPI endpoints, batching, latency budgets, Docker images.',
            hours: 12,
            resources: [R('FastAPI docs', 'https://fastapi.tiangolo.com/', 'doc')],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        weeks: '12 weeks',
        goal: 'Run an ML system in production with monitoring and reproducible training.',
        topics: [
          {
            id: 'ml-mlops',
            title: 'MLOps & experiment tracking',
            summary: 'Versioned data, experiment tracking, model registry, CI for models.',
            hours: 20,
            resources: [R('Made With ML — MLOps', 'https://madewithml.com/', 'course')],
          },
          {
            id: 'ml-scale',
            title: 'Scaling & optimisation',
            summary: 'Mixed precision, quantization, distributed training, inference cost.',
            hours: 18,
            resources: [R('Hugging Face — Efficient training', 'https://huggingface.co/docs/transformers/performance', 'doc')],
          },
          {
            id: 'ml-eval',
            title: 'Evaluation & safety',
            summary: 'Offline/online metrics, bias audits, hallucination measurement.',
            hours: 12,
            resources: [R('OpenAI evals guide', 'https://platform.openai.com/docs/guides/evals', 'doc')],
          },
          {
            id: 'ml-research',
            title: 'Reading papers',
            summary: 'Reproduce one result from a recent paper and write it up.',
            hours: 16,
            resources: [R('Papers with Code', 'https://paperswithcode.com/', 'doc')],
          },
        ],
      },
    ],
  },

  'cloud-engineer': {
    careerId: 'cloud-engineer',
    title: 'Cloud Engineer Path',
    summary:
      'Linux and networking underpin everything. Get one certification and one automated deployment you can demo end to end.',
    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        weeks: '4–6 weeks',
        goal: 'Deploy an app to a cloud VM and automate the setup with a script.',
        topics: [
          {
            id: 'cl-linux',
            title: 'Linux command line',
            summary: 'Files, permissions, processes, systemd, logs, SSH.',
            hours: 16,
            resources: [R('Linux Journey', 'https://linuxjourney.com/', 'course')],
          },
          {
            id: 'cl-net',
            title: 'Networking fundamentals',
            summary: 'IP, DNS, HTTP, ports, load balancers, firewalls.',
            hours: 14,
            resources: [R('Cloudflare Learning Center', 'https://www.cloudflare.com/learning/', 'doc')],
          },
          {
            id: 'cl-aws-core',
            title: 'AWS core services',
            summary: 'EC2, S3, IAM, VPC and billing alarms.',
            hours: 20,
            resources: [R('AWS Skill Builder', 'https://skillbuilder.aws/', 'course')],
          },
          {
            id: 'cl-git',
            title: 'Version control & scripting',
            summary: 'Git branching plus Bash/Python automation for repeatable setup.',
            hours: 8,
            resources: [R('Bash scripting guide', 'https://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html', 'doc')],
          },
        ],
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        weeks: '8 weeks',
        goal: 'Containerise an app and ship it through an automated pipeline.',
        topics: [
          {
            id: 'cl-docker',
            title: 'Docker & containers',
            summary: 'Images, volumes, multi-stage builds, compose.',
            hours: 16,
            resources: [R('Docker — get started', 'https://docs.docker.com/get-started/', 'doc')],
          },
          {
            id: 'cl-cicd',
            title: 'CI/CD pipelines',
            summary: 'GitHub Actions workflows, environments, secrets, rollbacks.',
            hours: 14,
            resources: [R('GitHub Actions docs', 'https://docs.github.com/en/actions', 'doc')],
          },
          {
            id: 'cl-iac',
            title: 'Terraform fundamentals',
            summary: 'Providers, state, modules, plan/apply and drift.',
            hours: 18,
            resources: [R('HashiCorp — Terraform tutorials', 'https://developer.hashicorp.com/terraform/tutorials', 'course')],
          },
          {
            id: 'cl-k8s',
            title: 'Kubernetes basics',
            summary: 'Pods, deployments, services, ingress and config maps.',
            hours: 20,
            resources: [R('Kubernetes tutorials', 'https://kubernetes.io/docs/tutorials/', 'doc')],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        weeks: '10 weeks',
        goal: 'Operate a production-grade system: reliable, observable and cheap.',
        topics: [
          {
            id: 'cl-sre',
            title: 'SRE practices',
            summary: 'SLOs, error budgets, on-call, incident command.',
            hours: 16,
            resources: [R('Google SRE Book', 'https://sre.google/sre-book/table-of-contents/', 'book')],
          },
          {
            id: 'cl-obs',
            title: 'Observability',
            summary: 'Metrics, structured logs, traces with Prometheus and Grafana.',
            hours: 14,
            resources: [R('Prometheus docs', 'https://prometheus.io/docs/introduction/overview/', 'doc')],
          },
          {
            id: 'cl-sec',
            title: 'Cloud security & cost',
            summary: 'Least-privilege IAM, secrets management, right-sizing, tagging.',
            hours: 14,
            resources: [R('AWS Well-Architected', 'https://aws.amazon.com/architecture/well-architected/', 'doc')],
          },
          {
            id: 'cl-cert',
            title: 'Certification sprint',
            summary: 'AWS Solutions Architect Associate or Azure AZ-104 practice exams.',
            hours: 24,
            resources: [R('AWS certification page', 'https://aws.amazon.com/certification/', 'doc')],
          },
        ],
      },
    ],
  },

  'ui-ux-designer': {
    careerId: 'ui-ux-designer',
    title: 'UI/UX Designer Path',
    summary:
      'Learn the tools, then build two case studies that show your thinking. Recruiters read the process, not the pretty pixels.',
    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        weeks: '4 weeks',
        goal: 'Redesign one real app screen and explain every decision.',
        topics: [
          {
            id: 'ux-principles',
            title: 'Design principles',
            summary: 'Hierarchy, spacing, contrast, typography and colour systems.',
            hours: 10,
            resources: [R('Refactoring UI (free chapter)', 'https://www.refactoringui.com/', 'book')],
          },
          {
            id: 'ux-figma',
            title: 'Figma fundamentals',
            summary: 'Frames, auto-layout, components, variants and prototyping.',
            hours: 14,
            resources: [R('Figma Learn', 'https://help.figma.com/hc/en-us/categories/360002051613', 'doc')],
          },
          {
            id: 'ux-research',
            title: 'User research basics',
            summary: 'Interview scripts, surveys, personas and journey maps.',
            hours: 8,
            resources: [R('Nielsen Norman — UX research', 'https://www.nngroup.com/articles/ux-research-cheat-sheet/', 'doc')],
          },
          {
            id: 'ux-a11y',
            title: 'Accessibility foundations',
            summary: 'Contrast ratios, focus states, screen-reader basics, WCAG AA.',
            hours: 6,
            resources: [R('W3C — WCAG quick reference', 'https://www.w3.org/WAI/WCAG22/quickref/', 'doc')],
          },
        ],
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        weeks: '6 weeks',
        goal: 'Complete one end-to-end case study with research and testing.',
        topics: [
          {
            id: 'ux-flows',
            title: 'Information architecture & flows',
            summary: 'Task flows, sitemaps, edge cases and empty states.',
            hours: 10,
            resources: [R('NN/g — IA basics', 'https://www.nngroup.com/articles/ia-study-guide/', 'doc')],
          },
          {
            id: 'ux-systems',
            title: 'Design systems',
            summary: 'Tokens, component libraries, documentation and handoff.',
            hours: 14,
            resources: [R('Material Design 3', 'https://m3.material.io/', 'doc')],
          },
          {
            id: 'ux-testing',
            title: 'Usability testing',
            summary: 'Moderated sessions, task success metrics, synthesising findings.',
            hours: 10,
            resources: [R('Maze — usability testing guide', 'https://maze.co/guides/usability-testing/', 'doc')],
          },
          {
            id: 'ux-portfolio',
            title: 'Case study writing',
            summary: 'Problem, process, decisions, outcomes — the four-part structure.',
            hours: 8,
            resources: [R('UX Portfolio tips (NN/g)', 'https://www.nngroup.com/articles/ux-portfolio/', 'doc')],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        weeks: '8 weeks',
        goal: 'Design at product speed, with metrics and engineering partnership.',
        topics: [
          {
            id: 'ux-motion',
            title: 'Interaction & motion design',
            summary: 'Micro-interactions, easing, loading states in Figma and Framer.',
            hours: 12,
            resources: [R('Framer — motion basics', 'https://www.framer.com/learn/', 'course')],
          },
          {
            id: 'ux-data',
            title: 'Designing with data',
            summary: 'Funnels, A/B variants, instrumentation and design metrics.',
            hours: 10,
            resources: [R('Amplitude — product analytics', 'https://amplitude.com/blog/product-analytics', 'blog')],
          },
          {
            id: 'ux-handoff',
            title: 'Engineering handoff',
            summary: 'Specs, tokens, QA passes and CSS literacy for designers.',
            hours: 8,
            resources: [R('MDN — CSS basics', 'https://developer.mozilla.org/en-US/docs/Learn/CSS', 'doc')],
          },
          {
            id: 'ux-lead',
            title: 'Design critique & leadership',
            summary: 'Running critiques, stakeholder alignment, design strategy.',
            hours: 8,
            resources: [R('NN/g — design critiques', 'https://www.nngroup.com/articles/design-critiques/', 'doc')],
          },
        ],
      },
    ],
  },

  'cybersecurity-analyst': {
    careerId: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst Path',
    summary:
      'Networking and Linux first, then hands-on labs. A home lab plus a certification is what gets you the first SOC interview.',
    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        weeks: '5–6 weeks',
        goal: 'Complete 20 beginner labs and explain an attack chain end to end.',
        topics: [
          {
            id: 'sec-net',
            title: 'Networking & protocols',
            summary: 'TCP/IP, DNS, HTTP, TLS, proxies and packet capture.',
            hours: 16,
            resources: [R('Professor Messer — Network+', 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/', 'video')],
          },
          {
            id: 'sec-linux',
            title: 'Linux & Windows hardening',
            summary: 'Users, permissions, services, logs and baseline hardening.',
            hours: 14,
            resources: [R('OverTheWire — Bandit', 'https://overthewire.org/wargames/bandit/', 'practice')],
          },
          {
            id: 'sec-owasp',
            title: 'OWASP Top 10',
            summary: 'Injection, broken auth, XSS, SSRF — with hands-on labs.',
            hours: 16,
            resources: [R('OWASP Top 10', 'https://owasp.org/www-project-top-ten/', 'doc'), R('PortSwigger Web Security Academy', 'https://portswigger.net/web-security', 'practice')],
          },
          {
            id: 'sec-labs',
            title: 'Home lab & CTFs',
            summary: 'Kali VM, TryHackMe rooms, basic forensics challenges.',
            hours: 14,
            resources: [R('TryHackMe', 'https://tryhackme.com/', 'practice')],
          },
        ],
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        weeks: '8 weeks',
        goal: 'Detect and triage a simulated intrusion using real tooling.',
        topics: [
          {
            id: 'sec-siem',
            title: 'SIEM & log analysis',
            summary: 'Splunk/ELK queries, detections, alert tuning.',
            hours: 18,
            resources: [R('Splunk free training', 'https://www.splunk.com/en_us/training/free-courses/overview.html', 'course')],
          },
          {
            id: 'sec-ir',
            title: 'Incident response',
            summary: 'Triage playbooks, containment, evidence handling, reporting.',
            hours: 14,
            resources: [R('NIST incident handling guide', 'https://csrc.nist.gov/pubs/sp/800/61/r2/final', 'doc')],
          },
          {
            id: 'sec-python',
            title: 'Security scripting in Python',
            summary: 'Log parsing, hashing, simple scanners and automation.',
            hours: 14,
            resources: [R('Automate the Boring Stuff', 'https://automatetheboringstuff.com/', 'book')],
          },
          {
            id: 'sec-cert',
            title: 'Certification prep',
            summary: 'CompTIA Security+ or CEH syllabus and practice exams.',
            hours: 20,
            resources: [R('CompTIA Security+ objectives', 'https://www.comptia.org/certifications/security', 'doc')],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        weeks: '10 weeks',
        goal: 'Break and defend a web application you built, and document it.',
        topics: [
          {
            id: 'sec-pentest',
            title: 'Penetration testing workflow',
            summary: 'Recon, scanning, exploitation, privilege escalation, reporting.',
            hours: 22,
            resources: [R('Hack The Box Academy', 'https://academy.hackthebox.com/', 'course')],
          },
          {
            id: 'sec-cloud',
            title: 'Cloud security',
            summary: 'IAM misconfigurations, S3 exposure, container escapes.',
            hours: 14,
            resources: [R('AWS security best practices', 'https://docs.aws.amazon.com/security/', 'doc')],
          },
          {
            id: 'sec-crypto',
            title: 'Applied cryptography',
            summary: 'Hashing, symmetric/asymmetric encryption, TLS and PKI failures.',
            hours: 12,
            resources: [R('Crypto101', 'https://www.crypto101.io/', 'book')],
          },
          {
            id: 'sec-bounty',
            title: 'Bug bounty practice',
            summary: 'Recon on public programmes, responsible disclosure, write-ups.',
            hours: 16,
            resources: [R('HackerOne — Hacktivity', 'https://www.hackerone.com/hacktivity', 'practice')],
          },
        ],
      },
    ],
  },

  'software-developer': {
    careerId: 'software-developer',
    title: 'Software Developer Path',
    summary:
      'DSA and one language deeply, then real systems. Placement tests reward patterns you have practised, not tricks you have read.',
    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        weeks: '6–8 weeks',
        goal: 'Solve 100 easy problems in one language and explain your complexity.',
        topics: [
          {
            id: 'sd-language',
            title: 'One language, deeply',
            summary: 'Java or Python: collections, memory model, standard library.',
            hours: 24,
            resources: [R('Java tutorial (Oracle)', 'https://dev.java/learn/', 'doc')],
          },
          {
            id: 'sd-dsa1',
            title: 'Arrays, strings, hashing',
            summary: 'Two pointers, sliding window, frequency maps.',
            hours: 24,
            resources: [R('NeetCode roadmap', 'https://neetcode.io/roadmap', 'practice')],
          },
          {
            id: 'sd-dsa2',
            title: 'Recursion & sorting',
            summary: 'Recursion trees, merge/quick sort, binary search.',
            hours: 18,
            resources: [R('VisuAlgo', 'https://visualgo.net/en', 'practice')],
          },
          {
            id: 'sd-oop',
            title: 'OOP & clean code',
            summary: 'Classes, interfaces, SOLID, naming and small functions.',
            hours: 10,
            resources: [R('Refactoring Guru — design patterns', 'https://refactoring.guru/design-patterns', 'doc')],
          },
        ],
      },
      {
        id: 'intermediate',
        label: 'Intermediate',
        weeks: '10 weeks',
        goal: 'Build a tested backend service with a real database.',
        topics: [
          {
            id: 'sd-dsa3',
            title: 'Trees, graphs, DP',
            summary: 'BFS/DFS, heaps, memoisation and tabulation patterns.',
            hours: 30,
            resources: [R('CP-Algorithms', 'https://cp-algorithms.com/', 'doc')],
          },
          {
            id: 'sd-db',
            title: 'Databases & transactions',
            summary: 'Normalisation, indexes, ACID, isolation levels.',
            hours: 14,
            resources: [R('Use The Index, Luke', 'https://use-the-index-luke.com/', 'book')],
          },
          {
            id: 'sd-api',
            title: 'Building services',
            summary: 'Spring Boot or FastAPI, validation, auth, tests.',
            hours: 20,
            resources: [R('Spring Guides', 'https://spring.io/guides', 'course')],
          },
          {
            id: 'sd-testing',
            title: 'Testing & debugging',
            summary: 'Unit tests, integration tests, reading stack traces, logging.',
            hours: 10,
            resources: [R('Google Testing Blog', 'https://testing.googleblog.com/', 'blog')],
          },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        weeks: '12 weeks',
        goal: 'Pass a system design round and contribute to a large codebase.',
        topics: [
          {
            id: 'sd-design',
            title: 'System design',
            summary: 'Scaling reads/writes, caching, queues, consistency trade-offs.',
            hours: 24,
            resources: [R('System Design Primer', 'https://github.com/donnemartin/system-design-primer', 'repo')],
          },
          {
            id: 'sd-concurrency',
            title: 'Concurrency & performance',
            summary: 'Threads, locks, async I/O, profiling and p99 latency.',
            hours: 16,
            resources: [R('Java Concurrency in Practice (notes)', 'https://jcip.net/', 'book')],
          },
          {
            id: 'sd-contest',
            title: 'Contest practice',
            summary: 'Weekly contests, editorials, up-solving hard problems.',
            hours: 20,
            resources: [R('Codeforces', 'https://codeforces.com/', 'practice')],
          },
          {
            id: 'sd-oss',
            title: 'Open source contribution',
            summary: 'Find a good-first-issue, get a PR merged, review others.',
            hours: 14,
            resources: [R('First Timers Only', 'https://www.firsttimersonly.com/', 'doc')],
          },
        ],
      },
    ],
  },
}

export const getRoadmap = (careerId) => roadmaps[careerId] || roadmaps['web-developer']

export const roadmapTopicCount = (careerId) =>
  getRoadmap(careerId).levels.reduce((n, l) => n + l.topics.length, 0)

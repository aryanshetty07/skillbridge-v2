/** Marketing content: testimonials, statistics, team, FAQs. All students are fictional. */

export const testimonials = [
  {
    id: 't1',
    name: 'Ananya Krishnan',
    college: 'VIT Vellore · B.Tech CSE, 2025',
    role: 'Frontend Engineer at a fintech startup',
    quote:
      'I had three half-finished tutorials and no portfolio. The skill gap report told me exactly what I was missing — testing and TypeScript — and the roadmap gave me a six-week plan. I shipped two real projects and got shortlisted at four companies.',
    rating: 5,
    initials: 'AK',
    accent: '#7C3AED',
  },
  {
    id: 't2',
    name: 'Rohit Deshmukh',
    college: 'COEP Pune · B.E. IT, 2025',
    role: 'Data Analyst at an e-commerce company',
    quote:
      'The project hub is the part that changed things for me. I built the retail dashboard with real data, wrote up the insights, and that single project carried my entire interview. Nobody asked about my CGPA.',
    rating: 5,
    initials: 'RD',
    accent: '#2563EB',
  },
  {
    id: 't3',
    name: 'Meera Nair',
    college: 'NIT Trichy · B.Tech ECE, 2024',
    role: 'Cloud Engineer at a consulting firm',
    quote:
      'Coming from ECE I did not know where to start. SkillBridge mapped my electronics background to cloud roles and showed that my networking knowledge was already half the job. I cleared the AWS associate exam in my final semester.',
    rating: 5,
    initials: 'MN',
    accent: '#0EA5E9',
  },
  {
    id: 't4',
    name: 'Aditya Verma',
    college: 'IIIT Hyderabad · B.Tech CSE, 2026',
    role: 'ML Intern at an AI startup',
    quote:
      'The mock interview round exposed that I could explain a model but not defend a metric choice. I practised the follow-ups for two weeks and that is precisely what the panel asked.',
    rating: 4,
    initials: 'AV',
    accent: '#8B5CF6',
  },
  {
    id: 't5',
    name: 'Sneha Patil',
    college: 'Government Engineering College, Nagpur · B.E., 2025',
    role: 'UI/UX Designer at a product studio',
    quote:
      'My college had no design placement support. The design roadmap and the case-study structure gave me a portfolio that stood up against students from much bigger cities.',
    rating: 5,
    initials: 'SP',
    accent: '#EC4899',
  },
]

export const stats = [
  { value: '48,000+', label: 'Students learning', sub: 'across 320+ colleges' },
  { value: '92%', label: 'Complete a roadmap level', sub: 'within the first month' },
  { value: '1,200+', label: 'Curated projects', sub: 'with build guides' },
  { value: '7', label: 'Career tracks', sub: 'mapped to real hiring' },
]

export const howItWorks = [
  {
    step: '01',
    icon: 'UserRoundSearch',
    title: 'Tell us where you are',
    body: 'Add your skills, education and interests. Two minutes, no tests, no uploads required.',
  },
  {
    step: '02',
    icon: 'Target',
    title: 'Pick a target role',
    body: 'Explore seven career tracks with real requirements, indicative salaries and difficulty levels.',
  },
  {
    step: '03',
    icon: 'GitCompareArrows',
    title: 'See your skill gap',
    body: 'We compare what you have against what the role needs and rank the missing skills by impact.',
  },
  {
    step: '04',
    icon: 'Route',
    title: 'Follow the roadmap',
    body: 'A level-wise plan with resources and hours, plus projects that prove each skill.',
  },
  {
    step: '05',
    icon: 'BriefcaseBusiness',
    title: 'Get placement ready',
    body: 'Mock interviews, aptitude drills and resume reviews until you are interview-ready.',
  },
]

export const faqs = [
  {
    q: 'Is SkillBridge free for students?',
    a: 'Yes. Every roadmap, project guide and practice set on the platform is free. We are funded by college partnerships, not student subscriptions.',
  },
  {
    q: 'Is the AI actually AI?',
    a: 'The assistant and analyzer are built on a real AI model when the deployment has an API key configured through the secure backend. In this demo build there is no key attached, so both run in a clearly labelled demo mode that uses rule-based logic over our own career data — real calculations, not a live language model. Nothing on this site pretends otherwise.',
  },
  {
    q: 'Do you guarantee a placement?',
    a: 'No, and nobody honestly can. We give you a structured plan, real projects and interview practice. Outcomes depend on your effort, your college’s opportunities and the market.',
  },
  {
    q: 'Which year should I start in?',
    a: 'Second year is ideal for depth, but first-year students who start early have the strongest portfolios. Final-year students can still use the placement track — it is designed for a 12-week sprint.',
  },
  {
    q: 'Do I need a laptop with high specifications?',
    a: 'No. Everything in the beginner and intermediate paths runs on a normal laptop or on free cloud tiers. The advanced ML path needs a free GPU notebook, which we link to.',
  },
]

export const team = [
  { name: 'Ishaan Mehta', role: 'Co-founder & CEO', note: 'Ex-product lead, 9 years in ed-tech', initials: 'IM' },
  { name: 'Divya Raghavan', role: 'Co-founder & CTO', note: 'Built hiring platforms for 4M users', initials: 'DR' },
  { name: 'Kabir Shah', role: 'Head of Curriculum', note: 'Former SDE-3, mentored 3,000+ students', initials: 'KS' },
  { name: 'Fatima Sheikh', role: 'Head of Design', note: 'Design systems for two unicorns', initials: 'FS' },
]

/** Seeded demo account + activity so the dashboard is not empty on first login. */
export const demoAccount = {
  name: 'Aryan Shetty',
  email: 'demo@skillbridge.in',
  password: 'demo1234',
  college: 'Sardar Patel Institute of Technology, Mumbai',
  education: '3rd year — Undergraduate',
  interests: ['Web Development', 'AI/ML'],
  goal: 'web-developer',
}

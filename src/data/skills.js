/**
 * Skill catalogue used by the Skill Gap Analyzer.
 * `id` values are the canonical keys stored in localStorage.
 */
export const skillCatalog = [
  { id: 'html-css', name: 'HTML & CSS', group: 'Web' },
  { id: 'javascript', name: 'JavaScript', group: 'Web' },
  { id: 'react', name: 'React', group: 'Web' },
  { id: 'nodejs', name: 'Node.js', group: 'Web' },
  { id: 'typescript', name: 'TypeScript', group: 'Web' },
  { id: 'rest-api', name: 'REST APIs', group: 'Web' },
  { id: 'python', name: 'Python', group: 'Programming' },
  { id: 'java', name: 'Java', group: 'Programming' },
  { id: 'cpp', name: 'C++', group: 'Programming' },
  { id: 'dsa', name: 'Data Structures & Algorithms', group: 'Programming' },
  { id: 'oop', name: 'OOP & Design Patterns', group: 'Programming' },
  { id: 'git', name: 'Git & GitHub', group: 'Programming' },
  { id: 'sql', name: 'SQL', group: 'Data' },
  { id: 'pandas', name: 'Python (pandas)', group: 'Data' },
  { id: 'statistics', name: 'Statistics', group: 'Data' },
  { id: 'dataviz', name: 'Data Visualisation', group: 'Data' },
  { id: 'excel', name: 'Excel / Sheets', group: 'Data' },
  { id: 'powerbi', name: 'Power BI / Tableau', group: 'Data' },
  { id: 'ml', name: 'Machine Learning', group: 'AI' },
  { id: 'pytorch', name: 'PyTorch / TensorFlow', group: 'AI' },
  { id: 'sklearn', name: 'scikit-learn', group: 'AI' },
  { id: 'llm', name: 'LLMs & Prompt Engineering', group: 'AI' },
  { id: 'maths', name: 'Linear Algebra & Probability', group: 'AI' },
  { id: 'mlops', name: 'MLOps', group: 'AI' },
  { id: 'aws', name: 'AWS / Azure / GCP', group: 'Cloud' },
  { id: 'linux', name: 'Linux', group: 'Cloud' },
  { id: 'docker', name: 'Docker', group: 'Cloud' },
  { id: 'kubernetes', name: 'Kubernetes', group: 'Cloud' },
  { id: 'terraform', name: 'Terraform', group: 'Cloud' },
  { id: 'cicd', name: 'CI/CD', group: 'Cloud' },
  { id: 'networking', name: 'Networking & TCP/IP', group: 'Security' },
  { id: 'owasp', name: 'OWASP Top 10', group: 'Security' },
  { id: 'siem', name: 'SIEM (Splunk / ELK)', group: 'Security' },
  { id: 'incident-response', name: 'Incident Response', group: 'Security' },
  { id: 'figma', name: 'Figma', group: 'Design' },
  { id: 'design-systems', name: 'Design Systems', group: 'Design' },
  { id: 'user-research', name: 'User Research', group: 'Design' },
  { id: 'prototyping', name: 'Prototyping', group: 'Design' },
  { id: 'testing', name: 'Testing (Jest / Vitest)', group: 'Programming' },
  { id: 'system-design', name: 'System Design', group: 'Programming' },
]

export const skillGroups = [...new Set(skillCatalog.map((s) => s.group))]

export const skillName = (id) => skillCatalog.find((s) => s.id === id)?.name || id

/** Required skills per career, expressed as catalogue ids. */
export const careerSkillMap = {
  'web-developer': ['html-css', 'javascript', 'react', 'git', 'nodejs', 'sql', 'typescript', 'testing'],
  'data-analyst': ['sql', 'excel', 'dataviz', 'statistics', 'pandas', 'powerbi'],
  'ai-ml-engineer': ['python', 'maths', 'pytorch', 'sklearn', 'sql', 'mlops', 'llm'],
  'cloud-engineer': ['linux', 'networking', 'aws', 'docker', 'kubernetes', 'terraform', 'cicd'],
  'ui-ux-designer': ['figma', 'design-systems', 'prototyping', 'user-research', 'html-css'],
  'cybersecurity-analyst': ['networking', 'linux', 'owasp', 'siem', 'python', 'incident-response'],
  'software-developer': ['dsa', 'java', 'oop', 'sql', 'git', 'system-design', 'testing'],
}

export const educationLevels = [
  '1st year — Undergraduate',
  '2nd year — Undergraduate',
  '3rd year — Undergraduate',
  '4th year — Undergraduate',
  'Recently graduated',
  'Postgraduate',
  'Working professional',
]

export const popularSkills = [
  { id: 'react', name: 'React', jobs: '12,400+ openings', trend: '+18%' },
  { id: 'python', name: 'Python', jobs: '18,900+ openings', trend: '+21%' },
  { id: 'sql', name: 'SQL', jobs: '15,200+ openings', trend: '+9%' },
  { id: 'aws', name: 'AWS', jobs: '9,800+ openings', trend: '+24%' },
  { id: 'ml', name: 'Machine Learning', jobs: '6,300+ openings', trend: '+31%' },
  { id: 'dsa', name: 'DSA', jobs: '11,100+ openings', trend: '+7%' },
  { id: 'figma', name: 'Figma', jobs: '4,100+ openings', trend: '+12%' },
  { id: 'docker', name: 'Docker', jobs: '7,600+ openings', trend: '+16%' },
]

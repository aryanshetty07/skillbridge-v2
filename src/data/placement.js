/** Placement preparation content: technical, HR, aptitude, resume and mock interview. */

export const technicalTracks = ['All', 'DSA', 'Web Development', 'Data & SQL', 'AI/ML', 'Cloud', 'Cybersecurity']

export const technicalQuestions = [
  {
    id: 't1', track: 'DSA', difficulty: 'Easy',
    q: 'What is the time complexity of binary search, and what must be true about the input?',
    a: 'O(log n). The array must be sorted (or otherwise monotonic) so that each comparison eliminates half the remaining search space. Space complexity is O(1) iteratively, O(log n) with recursion due to the call stack.',
  },
  {
    id: 't2', track: 'DSA', difficulty: 'Easy',
    q: 'Array vs linked list — when would you choose each?',
    a: 'Arrays give O(1) random access and better cache locality but O(n) insertion/deletion in the middle and fixed capacity. Linked lists give O(1) insert/delete given a node reference but O(n) access and extra memory per node. Choose arrays for read-heavy, index-based work; lists for frequent mid-sequence insertion with few reads.',
  },
  {
    id: 't3', track: 'DSA', difficulty: 'Medium',
    q: 'How would you detect a cycle in a linked list?',
    a: 'Floyd’s tortoise and hare: advance one pointer by one node and another by two. If they meet, a cycle exists. To find the cycle start, reset one pointer to the head and advance both one step at a time; the meeting point is the cycle entry. O(n) time, O(1) space.',
  },
  {
    id: 't4', track: 'DSA', difficulty: 'Medium',
    q: 'Explain dynamic programming using the coin change problem.',
    a: 'Define dp[amount] = minimum coins to make that amount. Base case dp[0] = 0, others infinity. For each amount, dp[a] = min(dp[a - coin] + 1) over all coins. Fill bottom-up. O(amount × coins) time. The key insight is overlapping subproblems and optimal substructure — the same sub-amount is reused across branches.',
  },
  {
    id: 't5', track: 'DSA', difficulty: 'Hard',
    q: 'Design a data structure supporting insert, delete and getRandom in O(1).',
    a: 'Combine a dynamic array with a hash map from value to index. Insert appends to the array and records the index. Delete swaps the target with the last element, updates the swapped element’s index, then pops. getRandom picks a random index in the array. All three are O(1) average.',
  },
  {
    id: 't6', track: 'Web Development', difficulty: 'Easy',
    q: 'What is the difference between == and === in JavaScript?',
    a: '== performs type coercion before comparing ("5" == 5 is true). === compares value and type without coercion ("5" === 5 is false). Use === by default; it avoids surprising coercions such as null == undefined being true.',
  },
  {
    id: 't7', track: 'Web Development', difficulty: 'Medium',
    q: 'How does the React virtual DOM improve performance?',
    a: 'React keeps a lightweight tree of elements in memory. On state change it re-renders that tree, diffs it against the previous one, and applies only the minimal set of real DOM mutations. Real DOM operations are expensive; batching and minimal patching reduce layout and paint work. Note it is not automatically faster than hand-written DOM code — it makes predictable updates cheap to write.',
  },
  {
    id: 't8', track: 'Web Development', difficulty: 'Medium',
    q: 'Explain the event loop, microtasks and macrotasks.',
    a: 'JavaScript runs on a single thread with a call stack. Async work is handed to the host (browser/Node). When the stack empties, the loop drains the microtask queue completely (promises, queueMicrotask), then takes one macrotask (timers, I/O callbacks), then repeats. That is why a resolved promise callback runs before a setTimeout(0).',
  },
  {
    id: 't9', track: 'Web Development', difficulty: 'Medium',
    q: 'What is CORS and why does it exist?',
    a: 'Cross-Origin Resource Sharing is a browser-enforced policy that blocks reading responses from a different origin unless the server explicitly allows it via Access-Control-Allow-* headers. It exists to stop a malicious site from reading authenticated data from another site using the user’s cookies. Preflight OPTIONS requests check non-simple requests first. CORS is not server-side security — it protects users in browsers.',
  },
  {
    id: 't10', track: 'Web Development', difficulty: 'Hard',
    q: 'How would you optimise a React app that feels slow?',
    a: 'Measure first with the React Profiler and Lighthouse. Then: split bundles by route, memoise expensive computations with useMemo, avoid recreating callbacks that break memo, virtualise long lists, move state down to reduce re-render scope, lazy-load images, and fix layout thrash from synchronous reads/writes. Verify the improvement with a before/after profile rather than assuming.',
  },
  {
    id: 't11', track: 'Data & SQL', difficulty: 'Easy',
    q: 'What is the difference between WHERE and HAVING?',
    a: 'WHERE filters rows before grouping; HAVING filters groups after aggregation. So WHERE cannot reference aggregate functions like COUNT(*), while HAVING can. WHERE also runs earlier and can use indexes, so it is usually cheaper.',
  },
  {
    id: 't12', track: 'Data & SQL', difficulty: 'Medium',
    q: 'Explain the difference between INNER, LEFT and FULL OUTER JOIN.',
    a: 'INNER returns rows with matches on both sides. LEFT returns all left rows plus matches, with NULLs where there is none. FULL OUTER returns all rows from both sides with NULLs where either side is missing. A common mistake is filtering the right table in WHERE after a LEFT JOIN, which silently turns it into an INNER JOIN.',
  },
  {
    id: 't13', track: 'Data & SQL', difficulty: 'Medium',
    q: 'How do indexes speed up queries, and what do they cost?',
    a: 'A B-tree index lets the engine find rows without a full scan, turning O(n) lookups into O(log n). Costs: extra storage, slower writes (every INSERT/UPDATE maintains the index), and planner overhead. Composite indexes only help when queries use the leading columns. Covering indexes can avoid table lookups entirely.',
  },
  {
    id: 't14', track: 'Data & SQL', difficulty: 'Medium',
    q: 'A metric dropped 20% overnight. How do you investigate?',
    a: 'First check it is real: is the pipeline fresh, did the definition change, is there a partial day? Then segment — by platform, geography, version, new vs returning users, channel — to localise it. Compare with a control metric that should have moved too. Then look at release history, third-party outages, and tracking breakage. Only after ruling those out consider a genuine behavioural cause.',
  },
  {
    id: 't15', track: 'AI/ML', difficulty: 'Easy',
    q: 'What is overfitting and how do you detect it?',
    a: 'The model learns noise specific to the training set and fails to generalise. Detect it when training loss keeps falling while validation loss rises, or when validation metrics are much worse than training metrics. Mitigate with more data, augmentation, regularisation (L2, dropout), early stopping, simpler models, or cross-validation.',
  },
  {
    id: 't16', track: 'AI/ML', difficulty: 'Medium',
    q: 'Precision vs recall — which matters more for fraud detection?',
    a: 'It depends on the cost of each error. For fraud, a false negative (missed fraud) is usually far costlier than a false positive (an extra manual review), so recall is prioritised — often at the expense of precision. In spam filtering the reverse can hold. Report the precision-recall curve and pick a threshold from the business cost, not a default 0.5.',
  },
  {
    id: 't17', track: 'AI/ML', difficulty: 'Medium',
    q: 'How does a RAG system reduce hallucinations?',
    a: 'Retrieval-Augmented Generation fetches relevant documents and puts them in the prompt, so the model conditions on real text instead of only its parameters. Hallucination drops but does not vanish — the model can still misread or ignore context. Grounding is strengthened by citation requirements, refusal instructions when context is insufficient, chunk quality, and an evaluation set that measures faithfulness.',
  },
  {
    id: 't18', track: 'AI/ML', difficulty: 'Hard',
    q: 'Your model has 95% accuracy on a dataset where 95% of rows are negative. Is it good?',
    a: 'No — a model predicting "negative" always scores 95%. This is the class-imbalance trap. Look at precision, recall, F1 and the confusion matrix, and compare against that trivial baseline. Use stratified splits, class weights or resampling, and choose metrics tied to the decision cost.',
  },
  {
    id: 't19', track: 'Cloud', difficulty: 'Easy',
    q: 'What is the difference between a security group and a network ACL in AWS?',
    a: 'Security groups are stateful, instance-level firewalls: return traffic is automatically allowed, and only allow rules exist. Network ACLs are stateless, subnet-level and support both allow and deny rules, so you must define inbound and outbound explicitly. Use security groups for most control; NACLs for coarse subnet-level blocking.',
  },
  {
    id: 't20', track: 'Cloud', difficulty: 'Medium',
    q: 'Explain horizontal vs vertical scaling with trade-offs.',
    a: 'Vertical scaling means a bigger machine — simple, no code change, but a hard ceiling and often downtime to resize. Horizontal scaling means more machines — near-limitless and resilient, but requires stateless services, load balancing and distributed data handling. Most cloud designs scale horizontally and treat vertical scaling as a stopgap.',
  },
  {
    id: 't21', track: 'Cloud', difficulty: 'Medium',
    q: 'What problem does a load balancer solve?',
    a: 'It distributes traffic across healthy instances, provides a single stable endpoint, performs health checks and removes failing nodes, and can terminate TLS. It enables horizontal scaling and rolling deployments without downtime. Beyond that it may add sticky sessions, path routing or WAF rules.',
  },
  {
    id: 't22', track: 'Cloud', difficulty: 'Hard',
    q: 'How would you design a highly available three-tier app on AWS?',
    a: 'Route 53 → ALB across at least two availability zones → auto-scaling EC2 or ECS tasks in private subnets → RDS Multi-AZ with read replicas → ElastiCache for sessions. Static assets on S3 + CloudFront. Secrets in Secrets Manager, IAM roles least-privilege, and observability with CloudWatch plus alarms. Define RTO/RPO and test failover rather than assuming it works.',
  },
  {
    id: 't23', track: 'Cybersecurity', difficulty: 'Easy',
    q: 'Difference between authentication and authorisation?',
    a: 'Authentication proves who you are (login, password, MFA). Authorisation decides what you may do once identified (roles, permissions, policies). A system can authenticate you successfully and still deny the action you requested — that is correct behaviour, not a bug.',
  },
  {
    id: 't24', track: 'Cybersecurity', difficulty: 'Medium',
    q: 'How does SQL injection work and how do you prevent it?',
    a: 'Untrusted input is concatenated into a query, so the input can change the query’s structure ("\' OR 1=1 --"). Prevent it with parameterised queries or prepared statements, which keep data separate from SQL. Add defence in depth: least-privilege database users, input validation, ORM use, and WAF rules. Escaping alone is fragile.',
  },
  {
    id: 't25', track: 'Cybersecurity', difficulty: 'Medium',
    q: 'Explain XSS: stored, reflected and DOM-based.',
    a: 'XSS runs attacker JavaScript in a victim’s browser. Stored XSS persists in the database (a comment field) and hits every viewer. Reflected XSS comes from the current request (a crafted URL parameter). DOM-based XSS happens entirely client-side when code writes untrusted data into the DOM. Defence: contextual output encoding, a strict Content-Security-Policy, avoiding innerHTML, and HttpOnly cookies.',
  },
  {
    id: 't26', track: 'Cybersecurity', difficulty: 'Hard',
    q: 'You suspect a server is compromised. What are your first five steps?',
    a: '1) Isolate it from the network without destroying evidence (security group change, not a wipe). 2) Preserve volatile evidence — memory, running processes, network connections, logs. 3) Identify scope: how it got in, what credentials or data were touched. 4) Eradicate and rebuild from a known-good image rather than cleaning in place. 5) Rotate credentials, notify per policy, then write the post-incident report and add detections.',
  },
]

export const hrQuestions = [
  { id: 'h1', q: 'Tell me about yourself.', hint: '90 seconds max: who you are, what you have built, why this role.', sample: 'I’m a final-year Computer Science student at NIT Surat. I’ve spent the last year building full-stack products — my most recent is a campus event platform used by about 600 students. I enjoy the part where a messy requirement becomes a working flow, and I want to do that at scale as a frontend engineer.' },
  { id: 'h2', q: 'Why should we hire you?', hint: 'Match three of their requirements to three things you have actually done.', sample: 'Your JD asks for React, API integration and someone who can own a feature end to end. I’ve shipped three React apps with Node APIs, one with real users, and I worked independently on the entire release cycle for my college fest portal.' },
  { id: 'h3', q: 'What is your biggest weakness?', hint: 'A real one, plus the system you built to manage it. Never "I’m a perfectionist".', sample: 'I used to over-scope projects and miss deadlines. Now I break work into one-week slices with a demo at the end of each, which forces me to cut scope early instead of discovering it late.' },
  { id: 'h4', q: 'Describe a project you are proud of.', hint: 'Problem → your specific contribution → hard decision → measurable outcome.', sample: 'Our mess-feedback app had 40 daily users on a bad form. I rebuilt the flow to three taps, added offline support, and daily submissions rose to about 250 within a month. The hard part was making it work on 2G in the hostel.' },
  { id: 'h5', q: 'Tell me about a time you disagreed with a teammate.', hint: 'Show the disagreement, how you listened, and how it was resolved — not that you were right.', sample: 'My teammate wanted to add a chat feature two weeks before submission. I thought it was risky. We listed what each feature cost in days and agreed to ship without chat but with a better search. We delivered on time and the search got used more than chat would have.' },
  { id: 'h6', q: 'Where do you see yourself in five years?', hint: 'Honest, ambitious, and consistent with the role you are applying for.', sample: 'In five years I want to be a strong product-minded engineer — someone who can own a service end to end and mentor juniors. That means going deep in backend and system design over the next two years, then taking on larger ownership.' },
  { id: 'h7', q: 'How do you handle pressure during deadlines?', hint: 'Describe a concrete method, not "I stay calm".', sample: 'I triage by what actually breaks if it slips. During my final project I cut a feature, shipped the core, and told my guide early. I keep a short list of what is blocked and who I need — that stops pressure turning into silence.' },
  { id: 'h8', q: 'Why do you want to work here?', hint: 'Specific product detail + something about how you work. Generic praise fails.', sample: 'I use your app for tracking expenses and I noticed you ship weekly and write public post-mortems. That matches how I like to work — small releases, honest retrospectives. I also want to work on a product with real Indian users.' },
  { id: 'h9', q: 'What do you do outside academics?', hint: 'Show a genuine interest with evidence of commitment.', sample: 'I play badminton four times a week and I run a small study group for data structures with six juniors. Both keep me consistent — I like things I have to show up for regularly.' },
  { id: 'h10', q: 'Do you have any questions for us?', hint: 'Always yes. Ask about the team, the work or growth — never only about salary.', sample: 'Two things: what does the first six months look like for someone in this role, and how does the team decide what to build next quarter?' },
]

export const resumeSections = [
  {
    title: 'Structure & length',
    icon: 'FileText',
    tips: [
      'One page for a fresher. Two only if you have 3+ years of experience.',
      'Order: header, education, skills, projects, experience/internships, achievements.',
      'Use a single-column layout — most ATS parsers mangle two-column designs.',
      'Export as PDF with a text-based name like Aryan_Shetty_Frontend.pdf.',
    ],
  },
  {
    title: 'Bullet points that work',
    icon: 'ListChecks',
    tips: [
      'Start with an action verb: Built, Reduced, Automated, Migrated.',
      'Quantify: "cut page load from 4.2s to 1.3s" beats "improved performance".',
      'One line per bullet, two at most. Cut adjectives, keep outcomes.',
      'Say what you specifically did — "I" is implied, teams dilute credit.',
    ],
  },
  {
    title: 'Projects that get read',
    icon: 'FolderGit2',
    tips: [
      'Two to three projects, each with a live link and a GitHub repo.',
      'Add the problem in one clause, then your contribution, then the result.',
      'List the actual stack you used, not every technology you have heard of.',
      'Include users or metrics if you have any — even "used by 40 classmates".',
    ],
  },
  {
    title: 'Skills section',
    icon: 'Wrench',
    tips: [
      'Group by category: Languages, Frameworks, Tools, Databases.',
      'Only list what you can defend in an interview for 5 minutes.',
      'Mirror the JD’s exact keywords — ATS matches strings, not synonyms.',
      'Skip soft-skill lists and progress bars; both waste space.',
    ],
  },
  {
    title: 'Common rejections',
    icon: 'AlertTriangle',
    tips: [
      'Typos in the company name or your own email.',
      'A photo, date of birth or marital status (not required in India, often filtered).',
      'Dense walls of text with no white space.',
      'A GitHub with no READMEs — reviewers do click through.',
    ],
  },
]

export const aptitudeTopics = ['Quantitative', 'Logical Reasoning', 'Verbal']

export const aptitudeQuestions = [
  {
    id: 'a1', topic: 'Quantitative', difficulty: 'Easy',
    q: 'A train 150 m long runs at 54 km/h. How long does it take to pass a pole?',
    options: ['8 seconds', '10 seconds', '12 seconds', '15 seconds'],
    answer: 1,
    explanation: '54 km/h = 54 × 5/18 = 15 m/s. Time = 150 / 15 = 10 seconds.',
  },
  {
    id: 'a2', topic: 'Quantitative', difficulty: 'Easy',
    q: 'If a shirt priced at ₹1,200 is sold at a 15% discount, what is the selling price?',
    options: ['₹960', '₹1,020', '₹1,050', '₹1,080'],
    answer: 1,
    explanation: 'Discount = 15% of 1200 = ₹180. Selling price = 1200 − 180 = ₹1,020.',
  },
  {
    id: 'a3', topic: 'Quantitative', difficulty: 'Medium',
    q: 'A can do a job in 12 days and B in 18 days. Working together, how many days will they take?',
    options: ['6.5 days', '7.2 days', '7.5 days', '8 days'],
    answer: 1,
    explanation: 'Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36 per day. Time = 36/5 = 7.2 days.',
  },
  {
    id: 'a4', topic: 'Quantitative', difficulty: 'Medium',
    q: 'The average of 5 numbers is 27. If one number is removed the average becomes 25. What was removed?',
    options: ['25', '30', '35', '37'],
    answer: 2,
    explanation: 'Total = 5 × 27 = 135. New total = 4 × 25 = 100. Removed = 135 − 100 = 35.',
  },
  {
    id: 'a5', topic: 'Quantitative', difficulty: 'Hard',
    q: 'A sum doubles in 8 years at simple interest. In how many years will it become four times?',
    options: ['16 years', '20 years', '24 years', '32 years'],
    answer: 2,
    explanation: 'Doubling means interest = principal in 8 years, so rate = 12.5% p.a. For 4×, interest must be 3× principal: 3 × 8 = 24 years.',
  },
  {
    id: 'a6', topic: 'Logical Reasoning', difficulty: 'Easy',
    q: 'Find the next number: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '44'],
    answer: 2,
    explanation: 'Differences are 4, 6, 8, 10 → next difference 12. 30 + 12 = 42. (Pattern is n(n+1).)',
  },
  {
    id: 'a7', topic: 'Logical Reasoning', difficulty: 'Medium',
    q: 'If in a code CAT = 24, then DOG = ?',
    options: ['26', '28', '30', '32'],
    answer: 0,
    explanation: 'C+A+T = 3+1+20 = 24. D+O+G = 4+15+7 = 26.',
  },
  {
    id: 'a8', topic: 'Logical Reasoning', difficulty: 'Medium',
    q: 'All engineers are graduates. Some graduates are managers. Which conclusion follows?',
    options: [
      'All managers are engineers',
      'Some engineers are managers',
      'No engineer is a manager',
      'None of these necessarily follows',
    ],
    answer: 3,
    explanation: 'The overlap between graduates and managers may exclude engineers entirely. Nothing about engineers and managers follows with certainty.',
  },
  {
    id: 'a9', topic: 'Logical Reasoning', difficulty: 'Hard',
    q: 'Five people sit in a row. A is left of B. C is at the extreme right. D is between A and B. E is not at an end. Who sits at the extreme left?',
    options: ['A', 'B', 'D', 'E'],
    answer: 0,
    explanation: 'With C at position 5, E not at an end, and D between A and B, the only arrangement satisfying all clues is A-D-B-E-C. A is at the extreme left.',
  },
  {
    id: 'a10', topic: 'Verbal', difficulty: 'Easy',
    q: 'Choose the correct sentence.',
    options: [
      'Each of the students have submitted their report.',
      'Each of the students has submitted his or her report.',
      'Each of the student have submitted the report.',
      'Each of students has submit the report.',
    ],
    answer: 1,
    explanation: '"Each" is singular, so it takes "has". The pronoun must agree in number: "his or her" (or "their" in modern usage, which is increasingly accepted).',
  },
  {
    id: 'a11', topic: 'Verbal', difficulty: 'Medium',
    q: 'Pick the word closest in meaning to "meticulous".',
    options: ['Careless', 'Extremely careful', 'Hurried', 'Doubtful'],
    answer: 1,
    explanation: 'Meticulous means showing great attention to detail — extremely careful and precise.',
  },
  {
    id: 'a12', topic: 'Verbal', difficulty: 'Medium',
    q: 'Identify the error: "He is one of the best player in the team."',
    options: ['He is', 'one of the best', 'player', 'in the team'],
    answer: 2,
    explanation: '"One of the best" is followed by a plural noun: "one of the best players in the team".',
  },
]

export const codingResources = [
  { name: 'NeetCode 150', url: 'https://neetcode.io/practice', desc: 'Curated 150 problems with video solutions — the best starting point for placement DSA.', type: 'DSA', free: true },
  { name: 'LeetCode', url: 'https://leetcode.com/problemset/', desc: 'The standard question bank for product-company interviews. Do the company-tagged lists.', type: 'DSA', free: true },
  { name: 'Codeforces', url: 'https://codeforces.com/', desc: 'Weekly contests that build speed and contest temperament.', type: 'Contests', free: true },
  { name: 'HackerRank', url: 'https://www.hackerrank.com/domains', desc: 'Good for company-specific campus tests and SQL practice.', type: 'Practice', free: true },
  { name: 'SQLBolt', url: 'https://sqlbolt.com/', desc: 'Interactive SQL lessons — finish this before any data interview.', type: 'SQL', free: true },
  { name: 'Striver’s A2Z DSA Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', desc: 'Structured 450-problem path with free explanations.', type: 'DSA', free: true },
  { name: 'GeeksforGeeks — Puzzles', url: 'https://www.geeksforgeeks.org/puzzles/', desc: 'Classic aptitude and puzzle rounds used by service companies.', type: 'Aptitude', free: true },
  { name: 'Pramp (peer mock interviews)', url: 'https://www.pramp.com/', desc: 'Free peer-to-peer mock interviews with real people.', type: 'Mock', free: true },
]

/** Mock interview question bank, grouped by round. */
export const mockRounds = [
  {
    id: 'mock-intro',
    label: 'Introduction round',
    minutes: 3,
    questions: [
      'Walk me through your resume in 90 seconds.',
      'Why this role, and why now?',
      'Which project on your resume are you most confident defending?',
    ],
  },
  {
    id: 'mock-tech',
    label: 'Technical round',
    minutes: 8,
    questions: [
      'Explain how you would design a URL shortener at a high level.',
      'What happens, step by step, when you type a URL into a browser?',
      'Given an array of integers, how would you find two numbers that sum to a target?',
      'How would you debug an API that intermittently returns 500 errors?',
      'What is the difference between a process and a thread?',
    ],
  },
  {
    id: 'mock-hr',
    label: 'HR round',
    minutes: 6,
    questions: [
      'Tell me about a time you failed and what you changed afterwards.',
      'How would you handle a manager who gives unclear requirements?',
      'Where do you see yourself in three years?',
      'Do you have any questions for us?',
    ],
  },
]

export const prepTasks = [
  { id: 'prep-resume', label: 'Resume reviewed by a senior or mentor', category: 'Resume' },
  { id: 'prep-dsa-50', label: 'Solve 50 DSA problems (arrays, strings, hashing)', category: 'Coding' },
  { id: 'prep-sql', label: 'Complete an SQL practice track', category: 'Coding' },
  { id: 'prep-aptitude', label: 'Attempt 30 aptitude questions with a timer', category: 'Aptitude' },
  { id: 'prep-mock-1', label: 'Complete one full mock interview', category: 'Interview' },
  { id: 'prep-hr-answers', label: 'Write answers to the top 10 HR questions', category: 'Interview' },
  { id: 'prep-project', label: 'Deploy one project with a live link on your resume', category: 'Portfolio' },
  { id: 'prep-github', label: 'Clean up GitHub: READMEs on all pinned repos', category: 'Portfolio' },
  { id: 'prep-linkedin', label: 'Update LinkedIn headline and about section', category: 'Resume' },
  { id: 'prep-company', label: 'Research 3 target companies and their interview process', category: 'Interview' },
]

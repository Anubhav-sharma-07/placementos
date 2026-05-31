export type TopicStatus = 'notstarted' | 'learning' | 'practicing' | 'revision' | 'ready';

export interface Topic {
  id: string;
  name: string;
  status: TopicStatus;
  subtopics?: { name: string; done: boolean }[];
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
  problemsSolved?: number;
  targetProblems?: number;
}

export interface Company {
  name: string;
  type: string;
  match: number;
  status: 'eligible' | 'almost' | 'gap';
  gap: string;
  roles: string[];
  package: string;
}

export interface DailyTask {
  id: string;
  title: string;
  dept: string;
  color: string;
  duration: number;
  done: boolean;
  type: 'dsa' | 'dev' | 'project' | 'mock' | 'revision' | 'softskill';
}

export const departments: Department[] = [
  {
    id: 'dsa', name: 'DSA', icon: '⬡', color: '#63b3ed',
    problemsSolved: 184, targetProblems: 400,
    topics: [
      { id: 'arrays', name: 'Arrays & Strings', status: 'ready', subtopics: [{ name: 'Sliding Window', done: true }, { name: 'Two Pointers', done: true }, { name: 'Prefix Sum', done: true }] },
      { id: 'hashing', name: 'Hashing', status: 'revision', subtopics: [{ name: 'HashMap patterns', done: true }, { name: 'Frequency count', done: true }] },
      { id: 'linkedlist', name: 'Linked List', status: 'revision', subtopics: [{ name: 'Reversal', done: true }, { name: 'Fast-slow pointer', done: false }] },
      { id: 'trees', name: 'Trees & BST', status: 'practicing', subtopics: [{ name: 'DFS traversals', done: true }, { name: 'BST operations', done: true }, { name: 'LCA', done: false }] },
      { id: 'graphs', name: 'Graphs', status: 'learning', subtopics: [{ name: 'BFS/DFS', done: false }, { name: 'Dijkstra', done: false }, { name: 'Union Find', done: false }] },
      { id: 'dp', name: 'Dynamic Programming', status: 'learning', subtopics: [{ name: '1D DP', done: true }, { name: 'Knapsack', done: false }, { name: 'LCS/LIS', done: false }] },
      { id: 'heap', name: 'Heap & Priority Queue', status: 'practicing', subtopics: [{ name: 'Min/Max heap', done: true }, { name: 'Top-K problems', done: false }] },
      { id: 'sorting', name: 'Sorting & Searching', status: 'revision', subtopics: [{ name: 'Merge sort', done: true }, { name: 'Binary search', done: true }] },
      { id: 'backtracking', name: 'Backtracking', status: 'learning', subtopics: [{ name: 'Permutations', done: false }, { name: 'N-Queens', done: false }] },
      { id: 'greedy', name: 'Greedy', status: 'practicing', subtopics: [{ name: 'Interval scheduling', done: true }, { name: 'Activity selection', done: false }] },
      { id: 'trie', name: 'Trie', status: 'notstarted', subtopics: [] },
      { id: 'segtree', name: 'Segment Tree', status: 'notstarted', subtopics: [] },
    ],
  },
  {
    id: 'frontend', name: 'Frontend', icon: '◈', color: '#a78bfa',
    topics: [
      { id: 'html', name: 'HTML — Semantic & A11y', status: 'ready' },
      { id: 'css', name: 'CSS — Flexbox, Grid, Animations', status: 'revision' },
      { id: 'js-core', name: 'JavaScript Core', status: 'revision' },
      { id: 'js-async', name: 'Async JS & Event Loop', status: 'practicing' },
      { id: 'react-basics', name: 'React — Components & State', status: 'ready' },
      { id: 'react-hooks', name: 'React — Hooks Deep Dive', status: 'practicing' },
      { id: 'react-perf', name: 'React — Performance', status: 'learning' },
      { id: 'typescript', name: 'TypeScript', status: 'learning' },
      { id: 'tailwind', name: 'Tailwind CSS', status: 'revision' },
      { id: 'testing', name: 'Testing (Jest + RTL)', status: 'notstarted' },
    ],
  },
  {
    id: 'backend', name: 'Backend', icon: '◉', color: '#4ade80',
    topics: [
      { id: 'nodejs', name: 'Node.js & Express', status: 'learning' },
      { id: 'apis', name: 'REST API Design', status: 'practicing' },
      { id: 'auth', name: 'Auth — JWT & OAuth', status: 'notstarted' },
      { id: 'db-design', name: 'Database Design', status: 'learning' },
      { id: 'caching', name: 'Caching & Redis', status: 'notstarted' },
      { id: 'security', name: 'Security Basics', status: 'notstarted' },
    ],
  },
  {
    id: 'sysdesign', name: 'System Design', icon: '⬢', color: '#fb923c',
    topics: [
      { id: 'hld', name: 'HLD Fundamentals', status: 'learning' },
      { id: 'lld', name: 'LLD & Design Patterns', status: 'notstarted' },
      { id: 'scalability', name: 'Scalability Concepts', status: 'notstarted' },
      { id: 'microservices', name: 'Microservices', status: 'notstarted' },
      { id: 'distributed', name: 'Distributed Systems', status: 'notstarted' },
    ],
  },
  {
    id: 'aiml', name: 'AI / ML', icon: '◎', color: '#fbbf24',
    topics: [
      { id: 'python', name: 'Python & NumPy', status: 'revision' },
      { id: 'ml-basics', name: 'ML Algorithms', status: 'learning' },
      { id: 'deeplearning', name: 'Deep Learning', status: 'learning' },
      { id: 'nlp', name: 'NLP & Transformers', status: 'learning' },
      { id: 'llm', name: 'LLMs & Prompt Eng.', status: 'learning' },
      { id: 'cv', name: 'Computer Vision', status: 'notstarted' },
    ],
  },
  {
    id: 'databases', name: 'Databases', icon: '⬟', color: '#2dd4bf',
    topics: [
      { id: 'sql', name: 'SQL Fundamentals', status: 'practicing' },
      { id: 'postgres', name: 'PostgreSQL', status: 'learning' },
      { id: 'mongodb', name: 'MongoDB', status: 'learning' },
      { id: 'redis-db', name: 'Redis', status: 'notstarted' },
    ],
  },
  {
    id: 'aptitude', name: 'Aptitude', icon: '△', color: '#4ade80',
    topics: [
      { id: 'quant', name: 'Quantitative', status: 'revision' },
      { id: 'logical', name: 'Logical Reasoning', status: 'practicing' },
      { id: 'verbal', name: 'Verbal Ability', status: 'learning' },
      { id: 'di', name: 'Data Interpretation', status: 'learning' },
    ],
  },
  {
    id: 'softskills', name: 'Soft Skills', icon: '○', color: '#f472b6',
    topics: [
      { id: 'hr', name: 'HR Interview Mastery', status: 'practicing' },
      { id: 'comm', name: 'Communication', status: 'revision' },
      { id: 'gd', name: 'Group Discussion', status: 'learning' },
      { id: 'presentation', name: 'Presentation Skills', status: 'notstarted' },
    ],
  },
  {
    id: 'resume', name: 'Resume', icon: '▣', color: '#a78bfa',
    topics: [
      { id: 'ats', name: 'ATS Optimization', status: 'revision' },
      { id: 'bullets', name: 'Project Bullet Points', status: 'practicing' },
      { id: 'keywords', name: 'Keyword Strategy', status: 'ready' },
      { id: 'versions', name: 'Role-specific Versions', status: 'learning' },
    ],
  },
  {
    id: 'portfolio', name: 'Portfolio', icon: '◫', color: '#fb923c',
    topics: [
      { id: 'github', name: 'GitHub (10+ repos)', status: 'practicing' },
      { id: 'linkedin', name: 'LinkedIn Optimization', status: 'revision' },
      { id: 'projects', name: 'Live Projects', status: 'practicing' },
      { id: 'website', name: 'Personal Website', status: 'learning' },
    ],
  },
];

export const companies: Company[] = [
  { name: 'Razorpay', type: 'Fintech Startup', match: 82, status: 'eligible', gap: 'Strong match — prioritize application', roles: ['SWE Intern', 'Frontend Intern'], package: '₹8–14 LPA' },
  { name: 'Zoho', type: 'Product (India)', match: 79, status: 'eligible', gap: 'Good fit — apply before July', roles: ['SWE Intern'], package: '₹6–10 LPA' },
  { name: 'TCS NQT', type: 'Service-based', match: 91, status: 'eligible', gap: 'Fully ready — schedule test', roles: ['Ninja', 'Digital'], package: '₹3.5–7 LPA' },
  { name: 'Startup (Series A)', type: 'Remote-first', match: 88, status: 'eligible', gap: 'Best fit — portfolio-based hiring', roles: ['Frontend', 'Full-stack'], package: '₹8–20 LPA' },
  { name: 'Atlassian', type: 'Product Company', match: 67, status: 'almost', gap: 'Need: System Design basics', roles: ['SWE Intern'], package: '₹15–25 LPA' },
  { name: 'Microsoft', type: 'FAANG', match: 54, status: 'almost', gap: 'Need: 50+ more DSA problems', roles: ['SWE Intern'], package: '₹25–45 LPA' },
  { name: 'Ciena Corp', type: 'Networking', match: 62, status: 'almost', gap: 'Need: C & networking depth', roles: ['SWE Intern'], package: '₹10–18 LPA' },
  { name: 'Flipkart', type: 'Product (India)', match: 61, status: 'almost', gap: 'Need: Backend + System Design', roles: ['SDE Intern'], package: '₹12–22 LPA' },
  { name: 'Google', type: 'FAANG', match: 42, status: 'gap', gap: 'Need: Hard DSA + System Design', roles: ['STEP Intern'], package: '₹35–65 LPA' },
  { name: 'Amazon', type: 'FAANG', match: 45, status: 'gap', gap: 'Need: Leadership Principles + DSA', roles: ['SDE Intern'], package: '₹30–55 LPA' },
];

export const todayTasks: DailyTask[] = [
  { id: 't1', title: 'Graph BFS — 3 LeetCode problems', dept: 'DSA', color: '#63b3ed', duration: 90, done: false, type: 'dsa' },
  { id: 't2', title: 'React useCallback & useMemo deep dive', dept: 'Frontend', color: '#a78bfa', duration: 60, done: true, type: 'dev' },
  { id: 't3', title: 'SpendLens — usage chart component', dept: 'Project', color: '#4ade80', duration: 75, done: false, type: 'project' },
  { id: 't4', title: 'HR Mock: "Tell me about yourself"', dept: 'Soft Skills', color: '#f472b6', duration: 30, done: false, type: 'mock' },
  { id: 't5', title: 'Arrays & Hashing flashcard revision', dept: 'DSA', color: '#63b3ed', duration: 30, done: true, type: 'revision' },
  { id: 't6', title: 'Resume — update SpendLens bullet', dept: 'Resume', color: '#a78bfa', duration: 20, done: false, type: 'revision' },
];

export const weeklyData = [
  { day: 'Mon', hours: 3.5, problems: 4, tasks: 5 },
  { day: 'Tue', hours: 4.0, problems: 6, tasks: 6 },
  { day: 'Wed', hours: 2.5, problems: 3, tasks: 4 },
  { day: 'Thu', hours: 5.0, problems: 7, tasks: 7 },
  { day: 'Fri', hours: 4.5, problems: 5, tasks: 6 },
  { day: 'Sat', hours: 6.0, problems: 8, tasks: 8 },
  { day: 'Sun', hours: 3.0, problems: 4, tasks: 5 },
];

export function getReadiness(dept: Department): number {
  const weights: Record<TopicStatus, number> = { notstarted: 0, learning: 25, practicing: 50, revision: 75, ready: 100 };
  const avg = dept.topics.reduce((s, t) => s + weights[t.status], 0) / dept.topics.length;
  return Math.round(avg);
}

export function getStatusLabel(s: TopicStatus): string {
  return { notstarted: 'Not Started', learning: 'Learning', practicing: 'Practicing', revision: 'Revision', ready: 'Interview Ready' }[s];
}

export function getStatusColor(s: TopicStatus): string {
  return { notstarted: '#4a4a6a', learning: '#fbbf24', practicing: '#63b3ed', revision: '#a78bfa', ready: '#4ade80' }[s];
}

export function getOverallScore(depts: Department[]): number {
  const weights: Record<string, number> = { dsa: 0.28, frontend: 0.22, backend: 0.12, sysdesign: 0.10, aiml: 0.10, aptitude: 0.08, softskills: 0.05, resume: 0.03, portfolio: 0.02 };
  return Math.round(depts.reduce((sum, d) => sum + (weights[d.id] || 0.01) * getReadiness(d), 0));
}

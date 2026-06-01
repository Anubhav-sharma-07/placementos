export function getLocalDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const KEYS = {
  topicStatus: 'pos_topic_status',
  dailyLogs: 'pos_daily_logs',
  goals: 'pos_goals',
  startDate: 'pos_start_date',
  problemCount: 'pos_problem_count',
};

export function getStartDate(): string {
  const stored = localStorage.getItem(KEYS.startDate);
  if (stored) return stored;
  const today = getLocalDateString();
  localStorage.setItem(KEYS.startDate, today);
  return today;
}

export function getDayNumber(): number {
  const start = new Date(getStartDate());
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

export function getTopicStatuses(): Record<string, string> {
  const stored = localStorage.getItem(KEYS.topicStatus);
  return stored ? JSON.parse(stored) : {};
}

export function saveTopicStatus(topicId: string, status: string): void {
  const all = getTopicStatuses();
  all[topicId] = status;
  localStorage.setItem(KEYS.topicStatus, JSON.stringify(all));
}

export interface DailyLog {
  date: string;
  day: number;
  studyHours: number;
  problemsSolved: number;
  tasksCompleted: number;
  notes: string;
  topics: string[];
}

export function getDailyLogs(): DailyLog[] {
  const stored = localStorage.getItem(KEYS.dailyLogs);
  return stored ? JSON.parse(stored) : [];
}

export function saveDailyLog(log: DailyLog): void {
  const logs = getDailyLogs();
  const existing = logs.findIndex(l => l.date === log.date);
  if (existing >= 0) {
    logs[existing] = log;
  } else {
    logs.push(log);
  }
  localStorage.setItem(KEYS.dailyLogs, JSON.stringify(logs));
}

export function getTodayLog(): DailyLog {
  const today = getLocalDateString();
  const logs = getDailyLogs();
  const existing = logs.find(l => l.date === today);
  if (existing) return existing;
  return {
    date: today,
    day: getDayNumber(),
    studyHours: 0,
    problemsSolved: 0,
    tasksCompleted: 0,
    notes: '',
    topics: [],
  };
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: string;
  color: string;
}

export function getGoals(): Goal[] {
  const stored = localStorage.getItem(KEYS.goals);
  if (stored) return JSON.parse(stored);
  return [
    { id: 'g1', title: 'Solve 400 DSA problems', target: 400, current: 0, unit: 'problems', deadline: 'Aug 2026', category: 'DSA', color: '#63b3ed' },
    { id: 'g2', title: 'Frontend interview ready', target: 100, current: 0, unit: '%', deadline: 'Jul 2026', category: 'Frontend', color: '#a78bfa' },
    { id: 'g3', title: 'Complete mock interviews', target: 10, current: 0, unit: 'mocks', deadline: 'Aug 2026', category: 'Soft Skills', color: '#f472b6' },
    { id: 'g4', title: 'Live projects on GitHub', target: 5, current: 0, unit: 'projects', deadline: 'Aug 2026', category: 'Portfolio', color: '#fb923c' },
  ];
}

export function saveGoals(goals: Goal[]): void {
  localStorage.setItem(KEYS.goals, JSON.stringify(goals));
}

export function getProblemCount(): { easy: number; medium: number; hard: number } {
  const stored = localStorage.getItem(KEYS.problemCount);
  return stored ? JSON.parse(stored) : { easy: 0, medium: 0, hard: 0 };
}

export function saveProblemCount(easy: number, medium: number, hard: number): void {
  localStorage.setItem(KEYS.problemCount, JSON.stringify({ easy, medium, hard }));
}

export function getWeeklyLogs(): DailyLog[] {
  const logs = getDailyLogs();
  const today = new Date();
  const week: DailyLog[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = getLocalDateString(d);
    const log = logs.find(l => l.date === dateStr);
    week.push(log || {
      date: dateStr,
      day: 0,
      studyHours: 0,
      problemsSolved: 0,
      tasksCompleted: 0,
      notes: '',
      topics: [],
    });
  }
  return week;
}
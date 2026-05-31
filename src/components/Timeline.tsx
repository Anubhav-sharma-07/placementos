import React, { useState } from 'react';
import { CalendarDays, Flag, Clock, CheckCircle2, Circle, Zap } from 'lucide-react';
import { SectionHeader, Card, Tag, ProgressBar } from './UI';

const WEEK_DAYS = [
  { date: 'Mon, May 26', tasks: [{ title: 'DP — Knapsack variants', color: '#63b3ed', done: true }, { title: 'React useCallback', color: '#a78bfa', done: true }] },
  { date: 'Tue, May 27', tasks: [{ title: 'Graph BFS/DFS', color: '#63b3ed', done: true }, { title: 'HR Mock Q', color: '#f472b6', done: false }] },
  { date: 'Wed, May 28', tasks: [{ title: 'System Design HLD', color: '#fb923c', done: false }, { title: 'Aptitude practice', color: '#4ade80', done: true }] },
  { date: 'Thu, May 29', tasks: [{ title: 'DP — LCS, LIS', color: '#63b3ed', done: true }, { title: 'TypeScript basics', color: '#a78bfa', done: false }] },
  { date: 'Fri, May 30', tasks: [{ title: 'Node.js REST API', color: '#4ade80', done: false }, { title: 'Resume SpendLens bullet', color: '#a78bfa', done: true }] },
  { date: 'Sat, May 31', isToday: true, tasks: [{ title: 'Graph — Dijkstra', color: '#63b3ed', done: false }, { title: 'ML revision', color: '#fbbf24', done: false }, { title: 'Mock interview 1hr', color: '#f472b6', done: false }] },
  { date: 'Sun, Jun 1', tasks: [{ title: 'Full topic revision', color: '#a78bfa', done: false }, { title: 'Contest prep', color: '#4ade80', done: false }] },
];

const MONTHLY = [
  {
    month: 'June 2026', current: true, progress: 8,
    goals: ['Complete all Graph topics (BFS, DFS, Dijkstra, Union Find)', 'Reach 250 DSA problems total', 'React Performance — interview ready', 'SpendLens v2 launch with team analytics'],
    milestones: ['TCS NQT registration', 'Ciena follow-up application', 'LinkedIn profile update'],
  },
  {
    month: 'July 2026', current: false, progress: 0,
    goals: ['Frontend completely interview ready (100%)', '2 new projects live on GitHub', 'System Design — 5 HLD sessions', 'Start Backend (Node + APIs)'],
    milestones: ['Off-campus startup applications begin', 'Resume v2 ATS scan', 'Aptitude mock test series'],
  },
  {
    month: 'August 2026', current: false, progress: 0,
    goals: ['10 mock interviews completed', 'All departments above 60%', 'Placement score target: 78%+', 'Lala AI beta launch'],
    milestones: ['Campus drive season opens', 'Referral outreach campaign', 'Finalize resume versions (SWE/AI-ML/Frontend)'],
  },
  {
    month: 'Sep–Oct 2026', current: false, progress: 0,
    goals: ['Actively applying — 20+ applications sent', 'Interview rounds preparation', 'System Design mock sessions', 'Full placement readiness'],
    milestones: ['Campus placement drives (BVCOE)', 'Off-campus applications', 'Target: 2+ interview offers'],
  },
];

const DEADLINES = [
  { title: 'TCS NQT Registration', date: 'Jun 10, 2026', type: 'placement', urgency: 'high', daysLeft: 10 },
  { title: 'Codeforces Round #950', date: 'Jun 7, 2026', type: 'contest', urgency: 'medium', daysLeft: 7 },
  { title: 'SpendLens v2 launch', date: 'Jun 20, 2026', type: 'project', urgency: 'medium', daysLeft: 20 },
  { title: 'LeetCode Biweekly 142', date: 'Jun 14, 2026', type: 'contest', urgency: 'low', daysLeft: 14 },
  { title: 'Resume — AI/ML version', date: 'Jun 25, 2026', type: 'resume', urgency: 'medium', daysLeft: 25 },
  { title: 'AWS Cloud Practitioner', date: 'Jul 15, 2026', type: 'cert', urgency: 'low', daysLeft: 45 },
];

const TYPE_COLORS: Record<string, string> = { placement: '#f472b6', contest: '#63b3ed', project: '#4ade80', resume: '#a78bfa', cert: '#fbbf24' };

export default function Timeline() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [taskStates, setTaskStates] = useState<Record<string, boolean>>({});

  const toggleTask = (key: string, init: boolean) => {
    setTaskStates(prev => ({ ...prev, [key]: !(key in prev ? prev[key] : init) }));
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeader title="Placement Timeline" sub="Weekly tasks, monthly milestones & deadline management" accent="var(--coral)" />

      {/* Countdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[['127', 'Days to placement season', 'var(--accent)'], ['14', 'Day streak', 'var(--green)'], ['8', 'Weeks to readiness', 'var(--amber)'], ['10', 'Upcoming deadlines', 'var(--coral)']].map(([v, l, c]) => (
          <div key={l as string} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${c}60, transparent)` }} />
            <div style={{ fontSize: 30, fontWeight: 800, fontFamily: 'var(--font-display)', color: c as string, lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* This week */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Week of May 26 – Jun 1, 2026
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {WEEK_DAYS.map((day, di) => {
            const completedCount = day.tasks.filter((t, ti) => {
              const key = `${di}-${ti}`;
              return key in taskStates ? taskStates[key] : t.done;
            }).length;
            return (
              <div
                key={day.date}
                style={{
                  background: day.isToday ? 'rgba(99,179,237,0.06)' : 'var(--bg-card)',
                  border: `1px solid ${day.isToday ? 'var(--border-accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)', padding: '12px 10px', minHeight: 140,
                }}
              >
                <div style={{ fontSize: 10, color: day.isToday ? 'var(--accent)' : 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', fontWeight: day.isToday ? 600 : 400 }}>
                  {day.isToday && '● '}{day.date.split(',')[0]}
                  <div style={{ fontWeight: 400, opacity: 0.7 }}>{day.date.split(', ')[1]}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {day.tasks.map((task, ti) => {
                    const key = `${di}-${ti}`;
                    const isDone = key in taskStates ? taskStates[key] : task.done;
                    return (
                      <button
                        key={ti}
                        onClick={() => toggleTask(key, task.done)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 5, padding: '4px 5px',
                          background: isDone ? 'var(--bg-elevated)' : 'transparent',
                          border: `1px solid ${isDone ? 'var(--border)' : `${task.color}25`}`,
                          borderRadius: 6, cursor: 'pointer', textAlign: 'left', opacity: isDone ? 0.5 : 1,
                          transition: 'all 0.15s',
                        }}
                      >
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: task.color, marginTop: 4, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: 'var(--text-primary)', lineHeight: 1.4, textDecoration: isDone ? 'line-through' : 'none' }}>{task.title}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 8, fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{completedCount}/{day.tasks.length} done</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly + Deadlines side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Monthly roadmap */}
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Monthly Roadmap</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {MONTHLY.map((m, i) => (
              <button
                key={m.month}
                onClick={() => setSelectedMonth(i)}
                style={{
                  padding: '6px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
                  background: selectedMonth === i ? 'var(--accent-dim)' : 'transparent',
                  color: selectedMonth === i ? 'var(--accent)' : 'var(--text-secondary)',
                  border: `1px solid ${selectedMonth === i ? 'var(--border-accent)' : 'var(--border)'}`,
                  fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
                }}
              >
                {m.month.split(' ')[0]}
              </button>
            ))}
          </div>

          {(() => {
            const m = MONTHLY[selectedMonth];
            return (
              <Card className="fade-in">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{m.month}</div>
                    {m.current && <div style={{ fontSize: 10, color: 'var(--green)', marginTop: 2 }}>● Current month</div>}
                  </div>
                  {m.current && (
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>{m.progress}% completed</div>
                      <ProgressBar value={m.progress} color="var(--green)" height={4} />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Goals</div>
                  {m.goals.map((g, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < m.goals.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <Zap size={12} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{g}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Milestones</div>
                  {m.milestones.map((ms, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 12, color: 'var(--text-secondary)', borderBottom: i < m.milestones.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <Flag size={11} color="var(--coral)" />
                      {ms}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })()}
        </div>

        {/* Deadlines */}
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Upcoming Deadlines</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DEADLINES.map(d => (
              <div
                key={d.title}
                style={{
                  background: 'var(--bg-card)', border: `1px solid ${d.urgency === 'high' ? 'var(--red)30' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)', padding: '10px 12px',
                  borderLeft: `3px solid ${TYPE_COLORS[d.type]}`,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>{d.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{d.date}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={9} color={d.daysLeft <= 10 ? 'var(--red)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: d.daysLeft <= 10 ? 'var(--red)' : 'var(--text-muted)', fontWeight: d.daysLeft <= 10 ? 600 : 400 }}>
                      {d.daysLeft}d left
                    </span>
                  </div>
                </div>
                <Tag label={d.type} color={TYPE_COLORS[d.type]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { Zap, Target, Clock, Flame, TrendingUp, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { departments, todayTasks, weeklyData, getReadiness, getOverallScore, DailyTask } from '../data';
import { StatCard, ProgressBar, SectionHeader, Card, ScoreRing, Tag } from './UI';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ color: p.color }}>{p.name}: {p.value}{p.name === 'hours' ? 'h' : ''}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<DailyTask[]>(todayTasks);
  const [animScore, setAnimScore] = useState(0);
  const score = getOverallScore(departments);
  const daysLeft = 127;

  useEffect(() => {
    const t = setTimeout(() => setAnimScore(score), 300);
    return () => clearTimeout(t);
  }, [score]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedTasks = tasks.filter(t => t.done).length;
  const totalMinutes = tasks.reduce((s, t) => s + t.duration, 0);
  const doneMinutes = tasks.filter(t => t.done).reduce((s, t) => s + t.duration, 0);

  const topDepts = [...departments].sort((a, b) => getReadiness(b) - getReadiness(a)).slice(0, 5);
  const weakDepts = [...departments].sort((a, b) => getReadiness(a) - getReadiness(b)).slice(0, 3);

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live · Placement Season in {daysLeft} days</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 4 }}>
          Mission Control
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Sunday, May 31 2026 · B.Tech CSE, BVCOE · Graduating 2027
        </p>
      </div>

      {/* Score + Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, marginBottom: 24 }}>
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px' }}>
          <ScoreRing score={animScore} size={90} color="var(--accent)" />
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 10, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Placement Score</div>
          <div style={{ fontSize: 10, color: 'var(--green)', marginTop: 4 }}>↑ +4% this week</div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          <StatCard label="DSA Problems" value="184" sub="Easy 82 · Med 84 · Hard 18" accent="var(--accent)" trend="up" trendLabel="+12 this week" delay={60} />
          <StatCard label="Study Streak" value="14" sub="days consecutive" accent="var(--coral)" trend="up" trendLabel="Personal best" delay={120} />
          <StatCard label="Projects Live" value="3" sub="SpendLens · Aria · XAI" accent="var(--green)" trend="neutral" trendLabel="Lala AI in dev" delay={180} />
        </div>
      </div>

      {/* 2-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, marginBottom: 24 }}>
        {/* Weekly Activity */}
        <Card>
          <SectionHeader title="This Week" sub="Study hours & problems solved" accent="var(--accent)" />
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="#63b3ed" radius={[4, 4, 0, 0]} name="hours" />
              <Bar dataKey="problems" fill="#a78bfa" radius={[4, 4, 0, 0]} name="problems" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: '#63b3ed' }} /> Study Hours
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: '#a78bfa' }} /> Problems Solved
            </div>
          </div>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <SectionHeader
            title="Today's Mission"
            accent="var(--green)"
            action={
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {completedTasks}/{tasks.length} done · {doneMinutes}m
              </div>
            }
          />
          <div style={{ marginBottom: 10 }}>
            <ProgressBar value={completedTasks} max={tasks.length} color="var(--green)" height={3} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                  borderRadius: 'var(--radius-md)',
                  background: task.done ? 'var(--bg-elevated)' : 'transparent',
                  border: `1px solid ${task.done ? 'var(--border)' : 'var(--border)'}`,
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  opacity: task.done ? 0.55 : 1,
                  transition: 'all 0.15s',
                }}
              >
                {task.done
                  ? <CheckCircle2 size={14} color="var(--green)" />
                  : <Circle size={14} color="var(--text-muted)" />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: task.done ? 'line-through' : 'none' }}>
                    {task.title}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{task.dept} · {task.duration}m</div>
                </div>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: task.color, flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Department Readiness */}
      <Card style={{ marginBottom: 24 }}>
        <SectionHeader title="Department Readiness" sub="Weighted placement score across all skill areas" accent="var(--purple)" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 40px' }}>
          {departments.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: d.color, minWidth: 16, textAlign: 'center' }}>{d.icon}</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 100 }}>{d.name}</span>
              <div style={{ flex: 1 }}>
                <ProgressBar value={getReadiness(d)} max={100} color={d.color} height={4} showLabel />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Insights + Gap Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card style={{ background: 'linear-gradient(135deg, #63b3ed08, #a78bfa08)', border: '1px solid var(--border-accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Zap size={14} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>AI Coach Insight</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            Your Frontend score is strong at <strong style={{ color: 'var(--text-primary)' }}>{getReadiness(departments.find(d => d.id === 'frontend')!)}%</strong>. Focus on <strong style={{ color: 'var(--amber)' }}>Graphs + DP</strong> this week to unlock 3 more eligible companies. At current velocity, you'll hit 80% overall by July 2026.
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Tag label="68% SWE Intern probability" color="var(--green)" />
            <Tag label="₹6–14 LPA expected" color="var(--accent)" />
            <Tag label="41% AI/ML probability" color="var(--amber)" />
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <AlertCircle size={14} color="var(--amber)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--amber)' }}>Priority Gaps</span>
          </div>
          {weakDepts.map(d => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: d.color }}>{d.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 }}>{d.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                  {d.topics.filter(t => t.status === 'notstarted').length} topics not started
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: getReadiness(d) < 30 ? 'var(--red)' : 'var(--amber)' }}>
                {getReadiness(d)}%
              </div>
            </div>
          ))}
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
            Addressing these 3 departments could add <span style={{ color: 'var(--green)' }}>+12%</span> to your placement score.
          </div>
        </Card>
      </div>
    </div>
  );
}

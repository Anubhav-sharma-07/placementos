import React from 'react';
import { AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis as RechartsPolarAngleAxis, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SectionHeader, Card, StatCard } from './UI';

const PolarAngleAxis = RechartsPolarAngleAxis as any;

const scoreHistory = [
  { week: 'W1 Apr', score: 52 }, { week: 'W2', score: 55 }, { week: 'W3', score: 57 }, { week: 'W4', score: 58 },
  { week: 'W1 May', score: 61 }, { week: 'W2', score: 63 }, { week: 'W3', score: 66 }, { week: 'W4', score: 68 },
  { week: 'W1 Jun', score: 72 },
];

const dsaByTopic = [
  { topic: 'Arrays', solved: 32 }, { topic: 'Strings', solved: 24 }, { topic: 'Hashing', solved: 18 },
  { topic: 'Trees', solved: 22 }, { topic: 'Graphs', solved: 8 }, { topic: 'DP', solved: 14 },
  { topic: 'Heap', solved: 12 }, { topic: 'Sorting', solved: 20 }, { topic: 'Others', solved: 34 },
];

const skillRadar = [
  { skill: 'DSA', score: 58 }, { skill: 'Frontend', score: 74 }, { skill: 'Backend', score: 32 },
  { skill: 'AI/ML', score: 41 }, { skill: 'System Design', score: 18 }, { skill: 'Aptitude', score: 62 },
  { skill: 'Soft Skills', score: 55 }, { skill: 'Resume', score: 80 },
];

const dailyHours = [
  { day: 'Mon', dsa: 1.5, dev: 1.0, project: 1.0 },
  { day: 'Tue', dsa: 2.0, dev: 1.5, project: 0.5 },
  { day: 'Wed', dsa: 1.0, dev: 1.0, project: 0.5 },
  { day: 'Thu', dsa: 2.5, dev: 1.5, project: 1.0 },
  { day: 'Fri', dsa: 1.5, dev: 1.5, project: 1.5 },
  { day: 'Sat', dsa: 3.0, dev: 1.5, project: 1.5 },
  { day: 'Sun', dsa: 1.0, dev: 1.0, project: 1.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 11 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</div>
      ))}
    </div>
  );
};

export default function Analytics() {
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeader title="Analytics" sub="Track your placement readiness growth over time" accent="var(--teal)" />

      {/* Key metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <StatCard label="Productivity Score" value="78%" sub="This week" accent="var(--accent)" trend="up" trendLabel="+6 from last week" />
        <StatCard label="Consistency Score" value="89%" sub="14-day streak" accent="var(--green)" trend="up" trendLabel="Personal best" />
        <StatCard label="Learning Velocity" value="2.4×" sub="vs baseline" accent="var(--amber)" trend="up" trendLabel="Accelerating" />
        <StatCard label="Focus Score" value="71%" sub="Deep work hrs" accent="var(--purple)" trend="neutral" trendLabel="Stable" />
      </div>

      {/* Score growth */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>
          Placement Score Growth · +20pts since April
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={scoreHistory}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#63b3ed" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#63b3ed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#4a4a6a', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: '#4a4a6a' }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="score" stroke="#63b3ed" strokeWidth={2} fill="url(#scoreGrad)" dot={{ r: 3, fill: '#63b3ed' }} name="score" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* DSA breakdown */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>
            DSA Problems by Topic
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dsaByTopic} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#4a4a6a' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="topic" type="category" tick={{ fontSize: 10, fill: '#8888aa', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={55} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="solved" fill="#63b3ed" radius={[0, 4, 4, 0]} name="solved" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Radar */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>
            Skill Spider Chart
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={skillRadar}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: '#8888aa', fontFamily: 'JetBrains Mono' } as any} />
              <Radar name="Score" dataKey="score" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Daily hours stacked */}
      <Card>
        <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>
          Time Allocation This Week (hours)
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={dailyHours}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#4a4a6a', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#4a4a6a' }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="dsa" stackId="a" fill="#63b3ed" name="DSA" radius={[0, 0, 0, 0]} />
            <Bar dataKey="dev" stackId="a" fill="#a78bfa" name="Dev/Frontend" />
            <Bar dataKey="project" stackId="a" fill="#4ade80" name="Projects" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          {[['DSA', '#63b3ed'], ['Dev/Frontend', '#a78bfa'], ['Projects', '#4ade80']].map(([l, c]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-muted)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} /> {l}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Zap, AlertCircle } from 'lucide-react';
import { departments, getReadiness, getOverallScore } from '../data';
import { getTodayLog, saveDailyLog, getWeeklyLogs, getDayNumber, getStartDate } from '../storage';
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
  const [animScore, setAnimScore] = useState(0);
  const [todayLog, setTodayLog] = useState(getTodayLog());
  const [saved, setSaved] = useState(false);

  const score = getOverallScore(departments);
  const dayNumber = getDayNumber();
  const startDate = getStartDate();

  const today = new Date();
  const placementDate = new Date('2026-08-01');
  const daysLeft = Math.ceil((placementDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const todayLabel = today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const weeklyLogs = getWeeklyLogs();
  const weeklyData = weeklyLogs.map(l => ({
    day: new Date(l.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short' }),
    hours: l.studyHours,
    problems: l.problemsSolved,
  }));

  const totalProblems = weeklyLogs.reduce((s, l) => s + l.problemsSolved, 0);
  const totalHours = weeklyLogs.reduce((s, l) => s + l.studyHours, 0);
  const activeDays = weeklyLogs.filter(l => l.studyHours > 0).length;

  const weakDepts = [...departments].sort((a, b) => getReadiness(a) - getReadiness(b)).slice(0, 3);

  useEffect(() => {
    const t = setTimeout(() => setAnimScore(score), 300);
    return () => clearTimeout(t);
  }, [score]);

  const updateLog = (field: string, value: number) => {
    setTodayLog(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveDailyLog(todayLog);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div className="fade-in" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Day {dayNumber} · Placement Season in {daysLeft} days
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 4 }}>
          Mission Control
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {todayLabel} · B.Tech CSE, BVCOE · Graduating 2027
        </p>
      </div>

      {/* Score + Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, marginBottom: 24 }}>
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px' }}>
          <ScoreRing score={animScore} size={90} color="var(--accent)" />
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 10, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Placement Score</div>
          <div style={{ fontSize: 10, color: 'var(--green)', marginTop: 4 }}>
            Started {new Date(startDate + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          <StatCard
            label="Problems This Week"
            value={totalProblems}
            sub={`${totalHours.toFixed(1)}h studied`}
            accent="var(--accent)"
            trend="up"
            trendLabel="Keep going!"
            delay={60}
          />
          <StatCard
            label="Active Days"
            value={`${activeDays}/7`}
            sub="this week"
            accent="var(--coral)"
            trend={activeDays >= 5 ? 'up' : 'neutral'}
            trendLabel={activeDays >= 5 ? 'On fire!' : 'Stay consistent'}
            delay={120}
          />
          <StatCard
            label="Journey Day"
            value={dayNumber}
            sub={`since ${new Date(startDate + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
            accent="var(--green)"
            trend="up"
            trendLabel="Keep the streak!"
            delay={180}
          />
        </div>
      </div>

      {/* Weekly chart + Today quick log */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, marginBottom: 24 }}>
        <Card>
          <SectionHeader title="This Week" sub="Your real study hours & problems solved" accent="var(--accent)" />
          {totalHours === 0 && totalProblems === 0 ? (
            <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>No data yet — log today's progress!</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Chart fills up as you log each day</div>
            </div>
          ) : (
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
          )}
          <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: '#63b3ed' }} /> Study Hours
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: '#a78bfa' }} /> Problems Solved
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeader title="Log Today" accent="var(--green)" action={
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Day {dayNumber}</div>
          } />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
            {[
              { label: 'Study Hours', field: 'studyHours', step: 0.5, max: 16, color: '#63b3ed' },
              { label: 'Problems Solved', field: 'problemsSolved', step: 1, max: 50, color: '#a78bfa' },
              { label: 'Tasks Completed', field: 'tasksCompleted', step: 1, max: 20, color: '#4ade80' },
            ].map(item => (
              <div key={item.field} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 110 }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => updateLog(item.field, Math.max(0, Number((todayLog as any)[item.field]) - item.step))}
                    style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer' }}>−
                  </button>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: item.color, minWidth: 32, textAlign: 'center' }}>
                    {(todayLog as any)[item.field]}
                  </span>
                  <button
                    onClick={() => updateLog(item.field, Math.min(item.max, Number((todayLog as any)[item.field]) + item.step))}
                    style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer' }}>+
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            style={{ width: '100%', padding: '10px', borderRadius: 10, background: saved ? '#4ade8020' : '#63b3ed20', color: saved ? '#4ade80' : '#63b3ed', border: `1px solid ${saved ? '#4ade8050' : '#63b3ed50'}`, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)', cursor: 'pointer', transition: 'all 0.2s' }}>
            {saved ? '✓ Saved to your log!' : "Save Today's Progress"}
          </button>
        </Card>
      </div>

      {/* Department Readiness */}
      <Card style={{ marginBottom: 24 }}>
        <SectionHeader title="Department Readiness" sub="Update topic statuses in Departments to see this grow" accent="var(--purple)" />
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
            You are on <strong style={{ color: 'var(--text-primary)' }}>Day {dayNumber}</strong> of your placement journey.
            Log your daily progress consistently — even 30 minutes a day compounds into massive results by August.
            Focus on your weakest departments first.
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Tag label={`Day ${dayNumber} of journey`} color="var(--green)" />
            <Tag label={`${daysLeft} days to season`} color="var(--accent)" />
            <Tag label="Start strong today" color="var(--amber)" />
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

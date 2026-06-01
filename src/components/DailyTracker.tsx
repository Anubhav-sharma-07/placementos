import React, { useState, useEffect } from 'react';
import { getTodayLog, saveDailyLog, getDayNumber, getStartDate, getWeeklyLogs, DailyLog } from '../storage';

export default function DailyTracker() {
  const [log, setLog] = useState<DailyLog>(getTodayLog());
  const [saved, setSaved] = useState(false);
  const dayNumber = getDayNumber();
  const startDate = getStartDate();
  const weeklyLogs = getWeeklyLogs();

  const handleSave = () => {
    saveDailyLog(log);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: keyof DailyLog, value: any) => {
    setLog(prev => ({ ...prev, [field]: value }));
  };

  const weekDays = weeklyLogs.map(l => {
    const d = new Date(l.date);
    return {
      ...l,
      label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      dateLabel: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      isToday: l.date === new Date().toISOString().split('T')[0],
    };
  });

  const totalHours = weeklyLogs.reduce((s, l) => s + l.studyHours, 0);
  const totalProblems = weeklyLogs.reduce((s, l) => s + l.problemsSolved, 0);
  const activeDays = weeklyLogs.filter(l => l.studyHours > 0).length;

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', animation: 'pulseDot 2s infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Day {dayNumber} · Started {new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Today's Log
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Weekly summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Hours this week', value: totalHours.toFixed(1) + 'h', color: '#63b3ed' },
          { label: 'Problems this week', value: totalProblems, color: '#a78bfa' },
          { label: 'Active days', value: activeDays + ' / 7', color: '#4ade80' },
        ].map(card => (
          <div key={card.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 18px', borderTop: `2px solid ${card.color}` }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{card.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>This Week — Study Hours</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
          {weekDays.map((d, i) => {
            const maxH = Math.max(...weekDays.map(x => x.studyHours), 1);
            const pct = (d.studyHours / maxH) * 100;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 10, color: d.isToday ? '#63b3ed' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {d.studyHours > 0 ? d.studyHours + 'h' : ''}
                </div>
                <div style={{ width: '100%', height: 56, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%',
                    height: `${Math.max(pct, d.isToday ? 8 : 4)}%`,
                    minHeight: d.isToday ? 8 : 4,
                    background: d.isToday ? '#63b3ed' : d.studyHours > 0 ? '#63b3ed60' : 'var(--bg-elevated)',
                    borderRadius: 4,
                    border: d.isToday ? '1px solid #63b3ed' : 'none',
                    transition: 'height 0.4s ease',
                  }} />
                </div>
                <div style={{ fontSize: 10, color: d.isToday ? '#63b3ed' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: d.isToday ? 600 : 400 }}>{d.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's input form */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 20 }}>
          Log Today's Progress
        </div>

        {/* Hours + Problems */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[
            { label: 'Study Hours', field: 'studyHours', step: 0.5, max: 16, color: '#63b3ed' },
            { label: 'Problems Solved', field: 'problemsSolved', step: 1, max: 50, color: '#a78bfa' },
            { label: 'Tasks Completed', field: 'tasksCompleted', step: 1, max: 20, color: '#4ade80' },
          ].map(item => (
            <div key={item.field}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{item.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => update(item.field as keyof DailyLog, Math.max(0, Number((log as any)[item.field]) - item.step))}
                  style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <div style={{ flex: 1, textAlign: 'center', fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: item.color }}>
                  {(log as any)[item.field]}
                </div>
                <button
                  onClick={() => update(item.field as keyof DailyLog, Math.min(item.max, Number((log as any)[item.field]) + item.step))}
                  style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Topics studied today */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Topics Studied Today</div>
          <input
            value={log.topics.join(', ')}
            onChange={e => update('topics', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
            placeholder="e.g. Graph BFS, React Hooks, DP Knapsack"
            style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, outline: 'none' }}
          />
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Notes / What I learned</div>
          <textarea
            value={log.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="What did you learn today? Any breakthroughs? Any struggles?"
            rows={3}
            style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'var(--font-body)' }}
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          style={{ width: '100%', padding: '12px', borderRadius: 10, background: saved ? '#4ade8020' : '#63b3ed20', color: saved ? '#4ade80' : '#63b3ed', border: `1px solid ${saved ? '#4ade8050' : '#63b3ed50'}`, fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em' }}>
          {saved ? '✓ Saved!' : 'Save Today\'s Log'}
        </button>
      </div>

      {/* Past logs */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>This Week's Logs</div>
        {weekDays.filter(d => d.studyHours > 0 || d.notes).length === 0 ? (
          <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>No logs yet this week — save today's log above to start tracking!</div>
        ) : (
          weekDays.filter(d => d.studyHours > 0 || d.notes).reverse().map((d, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: d.isToday ? '#63b3ed' : 'var(--text-primary)' }}>
                  {d.isToday ? 'Today' : d.label} · {d.dateLabel}
                  {d.day > 0 && <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 6 }}>Day {d.day}</span>}
                </span>
                <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: '#63b3ed' }}>{d.studyHours}h</span>
                  <span style={{ color: '#a78bfa' }}>{d.problemsSolved} problems</span>
                </div>
              </div>
              {d.topics.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                  {d.topics.map((t, ti) => (
                    <span key={ti} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#63b3ed15', color: '#63b3ed', border: '1px solid #63b3ed25' }}>{t}</span>
                  ))}
                </div>
              )}
              {d.notes && <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{d.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
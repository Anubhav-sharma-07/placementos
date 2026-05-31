import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Circle, Clock, Target } from 'lucide-react';
import { departments, Department, Topic, TopicStatus, getReadiness } from '../data';
import { SectionHeader, Card, ProgressBar, StatusBadge, ScoreRing, Tag } from './UI';

const ALL_STATUSES: TopicStatus[] = ['notstarted', 'learning', 'practicing', 'revision', 'ready'];
const STATUS_LABELS: Record<TopicStatus, string> = { notstarted: 'Not Started', learning: 'Learning', practicing: 'Practicing', revision: 'Revision', ready: 'Interview Ready' };
const STATUS_COLORS: Record<TopicStatus, string> = { notstarted: '#4a4a6a', learning: '#fbbf24', practicing: '#63b3ed', revision: '#a78bfa', ready: '#4ade80' };

interface TopicRowProps {
  topic: Topic;
  color: string;
  onStatusChange: (topicId: string, status: TopicStatus) => void;
}
function TopicRow({ topic, color, onStatusChange }: TopicRowProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}
      >
        <ChevronRight size={12} color="var(--text-muted)" style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: '0.15s', flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{topic.name}</span>
        <StatusBadge status={topic.status} small />
        {topic.subtopics && topic.subtopics.length > 0 && (
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {topic.subtopics.filter(s => s.done).length}/{topic.subtopics.length}
          </span>
        )}
      </div>

      {expanded && (
        <div className="slide-in" style={{ padding: '8px 36px 14px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}>
          {/* Status changer */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Update Status</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ALL_STATUSES.map(s => (
                <button
                  key={s}
                  onClick={(e) => { e.stopPropagation(); onStatusChange(topic.id, s); }}
                  style={{
                    fontSize: 11, padding: '4px 10px', borderRadius: 20, cursor: 'pointer',
                    background: topic.status === s ? `${STATUS_COLORS[s]}25` : 'var(--bg-card)',
                    color: topic.status === s ? STATUS_COLORS[s] : 'var(--text-muted)',
                    border: `1px solid ${topic.status === s ? STATUS_COLORS[s] + '50' : 'var(--border)'}`,
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.15s',
                  }}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Subtopics */}
          {topic.subtopics && topic.subtopics.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subtopics</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {topic.subtopics.map((sub, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: sub.done ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                    {sub.done
                      ? <CheckCircle2 size={12} color={color} />
                      : <Circle size={12} color="var(--text-muted)" />}
                    <span style={{ textDecoration: sub.done ? 'line-through' : 'none', opacity: sub.done ? 0.6 : 1 }}>{sub.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Micro-tasks hint */}
          <div style={{ marginTop: 12, padding: '8px 10px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: 11, color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--accent)' }}>→ Next step: </span>
            {topic.status === 'notstarted' && 'Watch one tutorial, take notes, try one easy problem'}
            {topic.status === 'learning' && 'Attempt 3 easy problems, build mental model'}
            {topic.status === 'practicing' && 'Solve 5 medium problems without hints'}
            {topic.status === 'revision' && 'Complete flashcard review, solve 2 timed problems'}
            {topic.status === 'ready' && 'Do one mock interview question on this topic'}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Departments() {
  const [selected, setSelected] = useState<string>('dsa');
  const [topicStates, setTopicStates] = useState<Record<string, TopicStatus>>(
    Object.fromEntries(departments.flatMap(d => d.topics.map(t => [t.id, t.status])))
  );

  const dept = departments.find(d => d.id === selected)!;
  const topicsWithState = dept.topics.map(t => ({ ...t, status: topicStates[t.id] as TopicStatus }));
  const readiness = Math.round(
    topicsWithState.reduce((s, t) => s + ({ notstarted: 0, learning: 25, practicing: 50, revision: 75, ready: 100 }[t.status]), 0) / topicsWithState.length
  );

  const handleStatusChange = (topicId: string, status: TopicStatus) => {
    setTopicStates(prev => ({ ...prev, [topicId]: status }));
  };

  const statusCounts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = topicsWithState.filter(t => t.status === s).length;
    return acc;
  }, {} as Record<TopicStatus, number>);

  return (
    <div style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
      {/* Dept list */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          10 Departments
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {departments.map(d => {
            const r = getReadiness(d);
            const isActive = selected === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelected(d.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? `${d.color}12` : 'transparent',
                  border: `1px solid ${isActive ? d.color + '40' : 'transparent'}`,
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 14, color: d.color }}>{d.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: isActive ? 600 : 400, color: isActive ? d.color : 'var(--text-secondary)', marginBottom: 3 }}>{d.name}</div>
                  <div style={{ height: 2, background: 'var(--bg-elevated)', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: `${r}%`, height: '100%', background: d.color, borderRadius: 1 }} />
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{r}%</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dept detail */}
      <div className="fade-in">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 22, color: dept.color }}>{dept.icon}</span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{dept.name}</h1>
              <div style={{ padding: '3px 10px', background: `${dept.color}18`, color: dept.color, border: `1px solid ${dept.color}30`, borderRadius: 20, fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {readiness}% ready
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {dept.topics.length} topics · {statusCounts.ready} interview ready · {statusCounts.notstarted} not started
            </div>
          </div>
          <ScoreRing score={readiness} size={68} color={dept.color} />
        </div>

        {/* Status summary pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {ALL_STATUSES.map(s => statusCounts[s] > 0 && (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: `${STATUS_COLORS[s]}12`, border: `1px solid ${STATUS_COLORS[s]}25`, fontSize: 11 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLORS[s], display: 'inline-block' }} />
              <span style={{ color: STATUS_COLORS[s], fontFamily: 'var(--font-mono)' }}>{statusCounts[s]} {STATUS_LABELS[s]}</span>
            </div>
          ))}
        </div>

        {/* DSA extra stats */}
        {dept.id === 'dsa' && dept.problemsSolved && (
          <Card style={{ marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Total Solved</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{dept.problemsSolved}</div>
                <ProgressBar value={dept.problemsSolved} max={dept.targetProblems!} color="var(--accent)" height={3} />
              </div>
              {[['Easy', 82, 'var(--green)'], ['Medium', 84, 'var(--amber)'], ['Hard', 18, 'var(--red)']].map(([label, val, color]) => (
                <div key={label as string}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: color as string }}>{val}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>of {label === 'Easy' ? 150 : label === 'Medium' ? 200 : 80} target</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Topics */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Topics — click to expand & update status
            </div>
          </div>
          {topicsWithState.map(topic => (
            <TopicRow key={topic.id} topic={topic} color={dept.color} onStatusChange={handleStatusChange} />
          ))}
        </Card>
      </div>
    </div>
  );
}

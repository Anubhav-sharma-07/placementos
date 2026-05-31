import React, { useState } from 'react';
import { FileText, Copy, CheckCircle2, Star, TrendingUp, Target, Plus, Circle } from 'lucide-react';
import { Card, SectionHeader, ProgressBar, Tag } from './UI';

// ── RESUME LAB ──────────────────────────────────────────────────────────────
const RESUME_VERSIONS = [
  { name: 'SWE Intern — General', atsScore: 82, lastUpdated: 'May 28, 2026', keywords: ['React', 'JavaScript', 'Node.js', 'REST API', 'Git', 'Problem Solving'], status: 'active' },
  { name: 'Frontend Specialist', atsScore: 88, lastUpdated: 'May 25, 2026', keywords: ['React', 'TypeScript', 'Tailwind', 'Performance', 'Accessibility', 'UI/UX'], status: 'active' },
  { name: 'AI/ML Intern', atsScore: 61, lastUpdated: 'May 10, 2026', keywords: ['Python', 'TensorFlow', 'NLP', 'Research', 'Data Analysis'], status: 'needs-update' },
];

const PROJECTS = [
  {
    name: 'SpendLens', tech: 'React · FastAPI · Claude API', live: true, liveUrl: 'credex-audit-eight.vercel.app',
    bullets: [
      'Built an AI-powered SaaS subscription auditor that analyzes team spend across Cursor, Copilot, Claude, and ChatGPT, identifying cost savings up to 40%',
      'Engineered React dashboard with real-time usage analytics and AI recommendations, achieving <2s load time',
      'Integrated Claude API for contextual spending insights and automated monthly reports'
    ]
  },
  {
    name: 'XAI Malware Detection', tech: 'Python · Random Forest · SHAP · LIME', live: false,
    bullets: [
      'Co-authored research paper achieving 98.85% detection accuracy on Drebin-215 dataset using Random Forest with SHAP and LIME explainability',
      'Applied DiCE counterfactual explanations to improve model interpretability for cybersecurity practitioners',
      'Mentored by Dr. Vishal Sharma at BVCOE; paper submitted to IEEE conference'
    ]
  },
  {
    name: 'Aria — AI Voice Agent', tech: 'Flask · Twilio · Claude API · Groq', live: false,
    bullets: [
      'Built autonomous AI sales agent that handles outbound voice calls using Twilio and real-time Groq inference',
      'Implemented Claude API for conversation management with persistent memory via JSONBin',
      'Reduced simulated lead response time by 85% compared to manual follow-up'
    ]
  },
];

export function ResumeLab() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyBullet = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeader title="Resume Lab" sub="ATS-optimized versions, project bullets, and keyword analysis" accent="var(--purple)" />

      {/* Versions */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Resume Versions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {RESUME_VERSIONS.map(v => (
            <Card key={v.name} style={{ borderTop: `2px solid ${v.status === 'active' ? 'var(--green)' : 'var(--amber)'}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{v.name}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 12 }}>Updated {v.lastUpdated}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>ATS Score</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: v.atsScore >= 80 ? 'var(--green)' : 'var(--amber)' }}>{v.atsScore}%</span>
              </div>
              <ProgressBar value={v.atsScore} color={v.atsScore >= 80 ? 'var(--green)' : 'var(--amber)'} height={4} />
              <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {v.keywords.slice(0, 4).map(k => <Tag key={k} label={k} color="var(--text-muted)" />)}
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                <button style={{ flex: 1, padding: '6px', borderRadius: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer' }}>View</button>
                <button style={{ flex: 1, padding: '6px', borderRadius: 8, background: 'var(--accent-dim)', border: '1px solid var(--border-accent)', color: 'var(--accent)', fontSize: 11, cursor: 'pointer' }}>Edit</button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project bullets */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Project Bullets — Click to copy</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PROJECTS.map(proj => (
            <Card key={proj.name}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <FileText size={14} color="var(--accent)" />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{proj.name}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '2px 8px', borderRadius: 10 }}>{proj.tech}</span>
                {proj.live && <Tag label="Live" color="var(--green)" />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {proj.bullets.map((bullet, bi) => {
                  const key = `${proj.name}-${bi}`;
                  const isCopied = copied === key;
                  return (
                    <div
                      key={bi}
                      onClick={() => copyBullet(bullet, key)}
                      style={{
                        display: 'flex', gap: 10, padding: '10px 12px',
                        background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)', cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>•</span>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, lineHeight: 1.5 }}>{bullet}</span>
                      <div style={{ flexShrink: 0, color: isCopied ? 'var(--green)' : 'var(--text-muted)' }}>
                        {isCopied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── GOALS ────────────────────────────────────────────────────────────────────
const GOALS_DATA = [
  { id: 'g1', title: 'Solve 400 DSA problems', current: 184, target: 400, unit: 'problems', color: 'var(--accent)', deadline: 'Aug 2026', category: 'DSA' },
  { id: 'g2', title: 'Frontend 100% interview ready', current: 74, target: 100, unit: '%', color: 'var(--purple)', deadline: 'Jul 2026', category: 'Frontend' },
  { id: 'g3', title: 'Placement score 80%', current: 72, target: 80, unit: '%', color: 'var(--green)', deadline: 'Jul 2026', category: 'Overall' },
  { id: 'g4', title: 'Complete 10 mock interviews', current: 2, target: 10, unit: 'mocks', color: 'var(--pink)', deadline: 'Aug 2026', category: 'Soft Skills' },
  { id: 'g5', title: '5 live projects on GitHub', current: 3, target: 5, unit: 'projects', color: 'var(--coral)', deadline: 'Aug 2026', category: 'Portfolio' },
  { id: 'g6', title: 'LinkedIn 500+ connections', current: 210, target: 500, unit: 'connections', color: 'var(--teal)', deadline: 'Sep 2026', category: 'Networking' },
];

export function Goals() {
  const [goals, setGoals] = useState(GOALS_DATA);
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeader
        title="Goals Tracker"
        sub="OKR-style placement goals with progress tracking"
        accent="var(--coral)"
        action={
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 'var(--radius-md)', background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--border-accent)', fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            <Plus size={12} /> Add Goal
          </button>
        }
      />

      {/* Goal cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {goals.map(g => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <Card key={g.id} hover style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <Tag label={g.category} color={g.color} />
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 6 }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Deadline: {g.deadline}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: g.color }}>{pct}%</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>of goal</div>
                </div>
              </div>
              <ProgressBar value={g.current} max={g.target} color={g.color} height={6} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>{g.current} {g.unit}</span>
                <span>target: {g.target} {g.unit}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

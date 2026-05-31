import React, { useState } from 'react';
import { BrainCircuit, Send, Sparkles, Clock, Target, TrendingUp, AlertCircle, Zap, ChevronRight } from 'lucide-react';
import { Card, SectionHeader, Tag, ProgressBar } from './UI';

const QUICK_PROMPTS = [
  { label: 'Plan 4-week DSA sprint', prompt: 'Generate a 4-week DSA study plan focused on Graphs and DP for SWE internship prep. Break it into daily tasks.' },
  { label: 'Which companies to target?', prompt: 'Based on my skills (Frontend React 74%, DSA 58%, 184 problems solved), which companies should I target first?' },
  { label: 'Mock interview Q: React', prompt: 'Give me 8 hard React interview questions for a product company frontend role, with what a strong answer includes.' },
  { label: 'Resume bullet for SpendLens', prompt: 'Write 3 strong ATS-optimized resume bullet points for SpendLens — an AI subscription spend auditor for SaaS teams built with React.' },
  { label: 'Skill gap for ₹20 LPA', prompt: 'What skills am I missing to get to ₹20+ LPA as a 2027 fresher from BVCOE? Give a specific gap analysis and 8-week plan.' },
  { label: '30-min HR mock', prompt: 'Run a 30-minute mock HR interview. Ask me questions one by one about my projects, weaknesses, and career goals. Start now.' },
];

const SCHEDULE = [
  { time: '9:00–11:00 AM', title: 'Graph BFS/DFS — 3 LeetCode problems', dept: 'DSA', color: '#63b3ed', priority: 'high' },
  { time: '11:00–12:00 PM', title: 'Arrays & Hashing flashcard revision', dept: 'Review', color: '#a78bfa', priority: 'medium' },
  { time: '2:00–3:30 PM', title: 'React useMemo + useCallback deep dive', dept: 'Frontend', color: '#a78bfa', priority: 'high' },
  { time: '3:30–4:00 PM', title: 'HR mock: Tell me about yourself', dept: 'Soft Skills', color: '#f472b6', priority: 'medium' },
  { time: '8:00–9:15 PM', title: 'SpendLens — usage chart component', dept: 'Project', color: '#4ade80', priority: 'high' },
  { time: '9:15–9:30 PM', title: 'Resume SpendLens bullet rewrite', dept: 'Resume', color: '#a78bfa', priority: 'low' },
];

const INSIGHTS = [
  { icon: TrendingUp, color: 'var(--green)', title: 'Strong momentum', body: 'You\'ve solved 12 problems this week — 140% of your target. Your Arrays & Strings is now interview-ready.' },
  { icon: AlertCircle, color: 'var(--amber)', title: 'Graph gap critical', body: 'Graphs is your biggest blocker. 8 of 10 eligible companies require Graph fundamentals. Prioritize BFS/DFS this week.' },
  { icon: Target, color: 'var(--accent)', title: 'Company unlock in 2 weeks', body: 'At current pace, Atlassian becomes eligible in ~14 days once you clear System Design HLD.' },
  { icon: Zap, color: 'var(--purple)', title: 'SpendLens boosts score', body: 'Publishing SpendLens on Product Hunt could add +8% to your portfolio score and unlock startup-type roles.' },
];

export default function AICoach() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    {
      role: 'ai',
      content: `Hey Anubhav! I've analyzed your placement profile.\n\n**Current status:** 72% overall readiness · 14-day streak · 184 DSA problems\n\n**Top priority this week:** Graph BFS/DFS — it's blocking 3 eligible companies. After that, push React Performance to "Interview Ready" to hit 80% Frontend score.\n\n**Placement probability:** 68% for SWE Intern roles, 41% for AI/ML roles. You're on track for ₹6–14 LPA range.\n\nWhat do you want to work on today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const systemPrompt = `You are PlacementOS AI Coach — a placement preparation expert for Anubhav Sharma, a pre-final year B.Tech CSE student at BVCOE New Delhi, graduating 2027. CGPA: 7.7. He is a Frontend Developer (React, JavaScript) learning AI/ML. Active projects: SpendLens (AI subscription auditor, live on Vercel), Aria (AI voice agent), XAI Malware Detection (research paper). Current skills: Frontend 74%, DSA 58% (184 problems), Backend 32%, System Design 18%, AI/ML 41%. Target: SWE Intern and AI/ML Intern roles, ₹6–14 LPA. Placement season: August 2026. Be specific, actionable, and encouraging. Use bullet points and structure for clarity. Keep responses focused and under 300 words.`;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
            { role: 'user', content: userMsg },
          ],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not process that. Please try again.';
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Connection error. Make sure you\'re running with a valid API key.' }]);
    }
    setLoading(false);
  };

  const formatMsg = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: i > 0 ? 8 : 0 }}>{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return <div key={i} style={{ paddingLeft: 12, position: 'relative', color: 'var(--text-secondary)' }}>
          <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>·</span>{line.slice(2)}
        </div>;
      }
      const bold = line.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong style="color:var(--text-primary)">${t}</strong>`);
      return <div key={i} dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} style={{ color: 'var(--text-secondary)' }} />;
    });
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
      {/* Chat */}
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
        <SectionHeader title="AI Coach" sub="Powered by Claude · Personalized placement guidance" accent="var(--purple)" />

        {/* Messages */}
        <Card style={{ flex: 1, overflow: 'auto', padding: '16px', marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }} className="fade-in">
              {msg.role === 'ai' && (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #63b3ed30, #a78bfa30)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <BrainCircuit size={13} color="var(--accent)" />
                </div>
              )}
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: msg.role === 'ai' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                background: msg.role === 'ai' ? 'var(--bg-elevated)' : 'var(--accent-dim)',
                border: `1px solid ${msg.role === 'ai' ? 'var(--border)' : 'var(--border-accent)'}`,
                fontSize: 13, lineHeight: 1.65,
              }}>
                {msg.role === 'ai' ? formatMsg(msg.content) : <span style={{ color: 'var(--text-primary)' }}>{msg.content}</span>}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit size={13} color="var(--accent)" />
              </div>
              <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px 14px 14px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'pulseDot 1.2s ease infinite', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Analyzing your profile...</span>
              </div>
            </div>
          )}
        </Card>

        {/* Quick prompts */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {QUICK_PROMPTS.slice(0, 3).map(q => (
            <button
              key={q.label}
              onClick={() => sendMessage(q.prompt)}
              style={{
                fontSize: 11, padding: '5px 10px', borderRadius: 20, cursor: 'pointer',
                background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
                border: '1px solid var(--border)', transition: 'all 0.15s',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {q.label} ↗
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={13} color="var(--accent)" style={{ flexShrink: 0 }} />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Ask your AI coach anything about placement prep..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 13,
              }}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            style={{
              padding: '10px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
              background: input.trim() ? 'var(--accent)' : 'var(--bg-elevated)',
              color: input.trim() ? '#0a0a0f' : 'var(--text-muted)',
              border: 'none', transition: 'all 0.15s', fontWeight: 600,
            }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Today's AI schedule */}
        <Card>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={13} color="var(--accent)" /> Today's Schedule
          </div>
          {SCHEDULE.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: i < SCHEDULE.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 88, paddingTop: 1 }}>{s.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--text-primary)', lineHeight: 1.4 }}>{s.title}</div>
                <div style={{ fontSize: 9, color: s.color, marginTop: 2 }}>{s.dept}</div>
              </div>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: s.priority === 'high' ? 'var(--red)' : s.priority === 'medium' ? 'var(--amber)' : 'var(--text-muted)', marginTop: 5, flexShrink: 0 }} />
            </div>
          ))}
        </Card>

        {/* Insights */}
        <Card>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={13} color="var(--purple)" /> AI Insights
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INSIGHTS.map((ins, i) => {
              const Icon = ins.icon;
              return (
                <div key={i} style={{ padding: '8px 10px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${ins.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Icon size={11} color={ins.color} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: ins.color }}>{ins.title}</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{ins.body}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* More prompts */}
        <Card>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>More Prompts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {QUICK_PROMPTS.slice(3).map(q => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.prompt)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s', color: 'var(--text-secondary)',
                }}
              >
                <Zap size={10} color="var(--accent)" />
                <span style={{ fontSize: 11 }}>{q.label}</span>
                <ChevronRight size={10} style={{ marginLeft: 'auto' }} />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

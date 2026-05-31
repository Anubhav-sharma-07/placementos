import React, { useState } from 'react';
import { Building2, TrendingUp, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { companies } from '../data';
import { SectionHeader, Card, ProgressBar, Tag } from './UI';

const STATUS_CONFIG = {
  eligible: { label: 'Eligible', color: 'var(--green)', icon: TrendingUp, bg: 'var(--green-dim)' },
  almost: { label: 'Almost', color: 'var(--amber)', icon: AlertTriangle, bg: 'var(--amber-dim)' },
  gap: { label: 'Skill Gap', color: 'var(--red)', icon: XCircle, bg: 'var(--red-dim)' },
};

export default function Companies() {
  const [filter, setFilter] = useState<'all' | 'eligible' | 'almost' | 'gap'>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === 'all' ? companies : companies.filter(c => c.status === filter);
  const selectedCo = companies.find(c => c.name === selected);

  const counts = { eligible: companies.filter(c => c.status === 'eligible').length, almost: companies.filter(c => c.status === 'almost').length, gap: companies.filter(c => c.status === 'gap').length };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      <SectionHeader title="Company Eligibility Matrix" sub="AI-powered match score based on your current skill profile" accent="var(--teal)" />

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {(['eligible', 'almost', 'gap'] as const).map(s => {
          const cfg = STATUS_CONFIG[s];
          const Icon = cfg.icon;
          return (
            <Card key={s} style={{ background: cfg.bg, border: `1px solid ${cfg.color}30`, cursor: 'pointer' }} onClick={() => setFilter(filter === s ? 'all' : s)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 11, color: cfg.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{cfg.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-display)', color: cfg.color }}>{counts[s]}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>companies</div>
                </div>
                <Icon size={28} color={cfg.color} opacity={0.4} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['all', 'eligible', 'almost', 'gap'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
              background: filter === f ? 'var(--accent-dim)' : 'transparent',
              color: filter === f ? 'var(--accent)' : 'var(--text-secondary)',
              border: `1px solid ${filter === f ? 'var(--border-accent)' : 'var(--border)'}`,
              transition: 'all 0.15s',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {f === 'all' ? 'All' : STATUS_CONFIG[f].label} {f === 'all' ? `(${companies.length})` : `(${counts[f]})`}
          </button>
        ))}
      </div>

      {/* 2-col: list + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(co => {
            const cfg = STATUS_CONFIG[co.status];
            const isSelected = selected === co.name;
            return (
              <div
                key={co.name}
                onClick={() => setSelected(isSelected ? null : co.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  background: isSelected ? `${cfg.color}0a` : 'var(--bg-card)',
                  border: `1px solid ${isSelected ? cfg.color + '40' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {/* Match ring */}
                <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
                  <svg width={52} height={52} style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
                    <circle cx={26} cy={26} r={22} fill="none" stroke="var(--bg-elevated)" strokeWidth={4} />
                    <circle cx={26} cy={26} r={22} fill="none" stroke={cfg.color} strokeWidth={4}
                      strokeDasharray={`${(co.match / 100) * 138} 138`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: cfg.color }}>{co.match}%</span>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{co.name}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '2px 7px', borderRadius: 10 }}>{co.type}</span>
                  </div>
                  <div style={{ fontSize: 11, color: cfg.color, marginBottom: 4 }}>{co.gap}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {co.roles.map(r => <Tag key={r} label={r} color="var(--text-muted)" />)}
                    <Tag label={co.package} color="var(--green)" />
                  </div>
                </div>

                <ChevronRight size={14} color="var(--text-muted)" style={{ transform: isSelected ? 'rotate(90deg)' : 'none', transition: '0.2s', flexShrink: 0 }} />
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div>
          {selectedCo ? (
            <Card className="fade-in" style={{ position: 'sticky', top: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <Building2 size={16} color={STATUS_CONFIG[selectedCo.status].color} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedCo.name}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selectedCo.type} · {selectedCo.package}</div>
              </div>

              {/* Big match */}
              <div style={{ textAlign: 'center', padding: '20px 0', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
                <div style={{ fontSize: 48, fontWeight: 800, fontFamily: 'var(--font-display)', color: STATUS_CONFIG[selectedCo.status].color, lineHeight: 1 }}>
                  {selectedCo.match}%
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>match score</div>
                <div style={{ marginTop: 10, padding: '0 20px' }}>
                  <ProgressBar value={selectedCo.match} color={STATUS_CONFIG[selectedCo.status].color} height={6} />
                </div>
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                {selectedCo.gap}
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Open Roles</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selectedCo.roles.map(r => <Tag key={r} label={r} color="var(--accent)" />)}
                </div>
              </div>

              <button style={{
                width: '100%', padding: '10px', borderRadius: 'var(--radius-md)',
                background: `${STATUS_CONFIG[selectedCo.status].color}18`,
                color: STATUS_CONFIG[selectedCo.status].color,
                border: `1px solid ${STATUS_CONFIG[selectedCo.status].color}40`,
                fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-display)',
                cursor: 'pointer', letterSpacing: '0.02em',
              }}>
                {selectedCo.status === 'eligible' ? 'Mark as Applied →' : 'Start Gap Training →'}
              </button>
            </Card>
          ) : (
            <Card style={{ padding: '32px 20px', textAlign: 'center' }}>
              <Building2 size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Select a company to see details and action plan</div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

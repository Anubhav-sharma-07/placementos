import React from 'react';
import { TopicStatus, getStatusLabel, getStatusColor } from '../data';

// ── Stat Card ───────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  delay?: number;
}
export function StatCard({ label, value, sub, accent = 'var(--accent)', trend, trendLabel, delay = 0 }: StatCardProps) {
  return (
    <div className="fade-in" style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px',
      animationDelay: `${delay}ms`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${accent}60, transparent)`,
      }} />
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 6 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</div>}
      {trendLabel && (
        <div style={{ fontSize: 11, color: trend === 'up' ? 'var(--green)' : trend === 'down' ? 'var(--red)' : 'var(--text-muted)', marginTop: 4 }}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendLabel}
        </div>
      )}
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}
export function ProgressBar({ value, max = 100, color = 'var(--accent)', height = 5, showLabel = false, label, animated = true }: ProgressBarProps) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {label && <span style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 120 }}>{label}</span>}
      <div style={{ flex: 1, background: 'var(--bg-elevated)', borderRadius: height, height, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          borderRadius: height,
          transition: animated ? 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          boxShadow: `0 0 8px ${color}40`,
        }} />
      </div>
      {showLabel && <span style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 30, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{pct}%</span>}
    </div>
  );
}

// ── Status Badge ─────────────────────────────────────────────────────────────
interface StatusBadgeProps { status: TopicStatus; small?: boolean; }
export function StatusBadge({ status, small = false }: StatusBadgeProps) {
  const color = getStatusColor(status);
  return (
    <span style={{
      fontSize: small ? 10 : 11,
      padding: small ? '2px 7px' : '3px 9px',
      borderRadius: 20,
      background: `${color}18`,
      color,
      border: `1px solid ${color}30`,
      fontFamily: 'var(--font-mono)',
      whiteSpace: 'nowrap',
      fontWeight: 500,
    }}>
      {getStatusLabel(status)}
    </span>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
interface SectionHeaderProps { title: string; sub?: string; accent?: string; action?: React.ReactNode; }
export function SectionHeader({ title, sub, accent = 'var(--accent)', action }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: sub ? 4 : 0 }}>
          <div style={{ width: 3, height: 18, background: accent, borderRadius: 2 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        {sub && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 13 }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
interface CardProps { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void; hover?: boolean; className?: string; }
export function Card({ children, style, onClick, hover = false, className }: CardProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Score Ring ─────────────────────────────────────────────────────────────
interface ScoreRingProps { score: number; size?: number; color?: string; label?: string; }
export function ScoreRing({ score, size = 80, color = 'var(--accent)', label }: ScoreRingProps) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth={5} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}80)`, transition: 'stroke-dasharray 1s ease' }}
        />
        <text x={size / 2} y={size / 2 + 6} textAnchor="middle" style={{ transform: 'rotate(90deg)', transformOrigin: `${size / 2}px ${size / 2}px` }}
          fill="var(--text-primary)" fontSize={size > 70 ? 18 : 13} fontWeight={700} fontFamily="var(--font-display)">
          {score}%
        </text>
      </svg>
      {label && <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>{label}</div>}
    </div>
  );
}

// ── Tag ───────────────────────────────────────────────────────────────────
interface TagProps { label: string; color?: string; }
export function Tag({ label, color = 'var(--accent)' }: TagProps) {
  return (
    <span style={{
      fontSize: 10, padding: '2px 8px', borderRadius: 20,
      background: `${color}15`, color, border: `1px solid ${color}25`,
      fontFamily: 'var(--font-mono)', fontWeight: 500,
    }}>{label}</span>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────
export function Divider({ style }: { style?: React.CSSProperties }) {
  return <div style={{ height: 1, background: 'var(--border)', margin: '12px 0', ...style }} />;
}

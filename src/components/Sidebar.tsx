import React from 'react';
import { LayoutDashboard, Code2, Building2, CalendarDays, BrainCircuit, BarChart3, FileText, Target, BookOpen } from 'lucide-react';

import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase';

interface SidebarProps {
  active: string;
  onNav: (page: string) => void;
  session: Session | null;
}

const navItems = [
  { id: 'dashboard', label: 'Mission Control', icon: LayoutDashboard },
  { id: 'daily', label: 'Daily Log', icon: BookOpen },
  { id: 'departments', label: 'Departments', icon: Code2 },
  { id: 'timeline', label: 'Timeline', icon: CalendarDays },
  { id: 'companies', label: 'Companies', icon: Building2 },
  { id: 'ai', label: 'AI Coach', icon: BrainCircuit },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'resume', label: 'Resume Lab', icon: FileText },
  { id: 'goals', label: 'Goals', icon: Target },
];

export default function Sidebar({ active, onNav, session }: SidebarProps) {
  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #63b3ed, #a78bfa)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff',
            fontFamily: 'var(--font-display)',
          }}>P</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              PlacementOS
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>
              v1.0 · BVCOE 2027
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                marginBottom: 2,
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Icon size={15} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
<div style={{ padding: '12px 10px', borderTop: '1px solid var(--border)' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', marginBottom: 6 }}>
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'linear-gradient(135deg, #63b3ed40, #a78bfa40)',
      border: '1px solid var(--border-accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 600, color: 'var(--accent)',
      fontFamily: 'var(--font-display)',
    }}>
      {session?.user?.email?.[0]?.toUpperCase() || 'A'}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {session?.user?.email?.split('@')[0] || 'Anubhav'}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>CSE · Pre-final year</div>
    </div>
  </div>
  <button
    onClick={() => supabase.auth.signOut()}
    style={{
      width: '100%', padding: '6px', borderRadius: 8,
      background: 'transparent', border: '1px solid var(--border)',
      color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer',
      fontFamily: 'var(--font-mono)', transition: 'all 0.15s',
    }}
  >
    Sign out
  </button>
</div>
      
    </aside>
  );
}

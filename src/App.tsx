import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Session } from '@supabase/supabase-js';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import Timeline from './components/Timeline';
import Companies from './components/Companies';
import AICoach from './components/AICoach';
import Analytics from './components/Analytics';
import DailyTracker from './components/DailyTracker';
import { ResumeLab, Goals } from './components/ResumeAndGoals';

type Page = 'dashboard' | 'daily' | 'departments' | 'timeline' | 'companies' | 'ai' | 'analytics' | 'resume' | 'goals';

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'dashboard': return <Dashboard />;
    case 'daily': return <DailyTracker />;
    case 'departments': return <Departments />;
    case 'timeline': return <Timeline />;
    case 'companies': return <Companies />;
    case 'ai': return <AICoach />;
    case 'analytics': return <Analytics />;
    case 'resume': return <ResumeLab />;
    case 'goals': return <Goals />;
    default: return <Dashboard />;
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg-base)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16,
      }}>
        <div style={{
          width: 40, height: 40,
          background: 'linear-gradient(135deg, #63b3ed, #a78bfa)',
          borderRadius: 10, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 18, fontWeight: 700,
          color: '#fff', fontFamily: 'var(--font-display)',
        }}>P</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Loading PlacementOS...
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Sidebar active={page} onNav={(p) => setPage(p as Page)} session={session} />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-base)' }} key={page}>
        <PageContent page={page} />
      </main>
    </div>
  );
}
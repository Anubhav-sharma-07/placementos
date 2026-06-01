import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Departments from './components/Departments';
import Timeline from './components/Timeline';
import Companies from './components/Companies';
import AICoach from './components/AICoach';
import Analytics from './components/Analytics';
import { ResumeLab, Goals } from './components/ResumeAndGoals';
import DailyTracker from './components/DailyTracker';

type Page = 'dashboard' | 'daily' |'departments' | 'timeline' | 'companies' | 'ai' | 'analytics' | 'resume' | 'goals';

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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Sidebar active={page} onNav={(p) => setPage(p as Page)} />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-base)' }} key={page}>
        <PageContent page={page} />
      </main>
    </div>
  );
}

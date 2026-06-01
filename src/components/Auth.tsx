import React, { useState } from 'react';
import { supabase } from '../supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage('Account created! You can now log in.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-base)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 380, background: 'var(--bg-card)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)',
        padding: '36px 32px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #63b3ed, #a78bfa)',
            borderRadius: 10, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 16, fontWeight: 700,
            color: '#fff', fontFamily: 'var(--font-display)',
          }}>P</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>PlacementOS</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>AI Placement Tracker</div>
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24 }}>
          {isLogin ? 'Log in to continue your placement journey' : 'Start tracking your placement preparation'}
        </p>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Email</div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="anubhav@email.com"
            style={{
              width: '100%', padding: '10px 14px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, outline: 'none',
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Password</div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="••••••••"
            style={{
              width: '100%', padding: '10px 14px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, outline: 'none',
            }}
          />
        </div>

        {/* Error / Message */}
        {error && (
          <div style={{ padding: '8px 12px', background: '#f8717115', border: '1px solid #f8717130', borderRadius: 8, fontSize: 12, color: '#f87171', marginBottom: 14 }}>
            {error}
          </div>
        )}
        {message && (
          <div style={{ padding: '8px 12px', background: '#4ade8015', border: '1px solid #4ade8030', borderRadius: 8, fontSize: 12, color: '#4ade80', marginBottom: 14 }}>
            {message}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', padding: '12px',
            borderRadius: 10, background: '#63b3ed20',
            color: '#63b3ed', border: '1px solid #63b3ed50',
            fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
            marginBottom: 14,
          }}
        >
          {loading ? 'Please wait...' : isLogin ? 'Log In →' : 'Create Account →'}
        </button>

        {/* Toggle */}
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
            style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
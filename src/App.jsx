import { useState, useEffect } from 'react';
import './index.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Directory from './components/Directory';
import Events from './components/Events';
import Jobs from './components/Jobs';
import Mentorship from './components/Mentorship';
import Stories from './components/Stories';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

function AppInner() {
  const [view, setView] = useState('home');
  const { user, profile, loading } = useAuth();

  // Redirect to profile after login if pending
  useEffect(() => {
    if (user && profile && (view === 'login' || view === 'signup')) {
      setView(profile.is_admin ? 'admin' : 'profile');
    }
  }, [user, profile]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <img src="/logo.png" alt="Let's Enterprise" style={{ height: 36, opacity: 0.7 }} />
          <div className="loader" />
        </div>
        <style>{`
          .loader {
            width: 32px; height: 32px; border-radius: 50%;
            border: 3px solid rgba(54,99,173,0.15);
            border-top-color: var(--blue);
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // Full-page views (no navbar/footer)
  if (view === 'login') return <AuthPage defaultTab="login" onSuccess={() => setView(profile?.is_admin ? 'admin' : 'profile')} />;
  if (view === 'signup') return <AuthPage defaultTab="signup" onSuccess={() => setView('profile')} />;
  if (view === 'admin') {
    if (!user || !profile?.is_admin) { setView('home'); return null; }
    return <AdminDashboard onBack={() => setView('home')} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeSection={view} onNav={setView} />
      <main style={{ flex: 1 }}>
        {view === 'home' && <><Hero onNav={setView} /><Stories /></>}
        {view === 'directory' && <Directory />}
        {view === 'events' && <Events />}
        {view === 'jobs' && <Jobs />}
        {view === 'mentorship' && <Mentorship />}
        {view === 'profile' && user && <ProfilePage onNav={setView} />}
        {view === 'profile' && !user && <AuthPage defaultTab="login" onSuccess={() => setView('profile')} />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

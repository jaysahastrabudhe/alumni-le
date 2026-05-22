import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAvatarProps } from '../supabaseClient';

export default function Navbar({ activeSection, onNav, darkHero = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Directory' },
    { id: 'events', label: 'Events' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'mentorship', label: 'Mentorship' },
  ];

  const handleNav = (id) => { onNav(id); setMobileOpen(false); setUserMenuOpen(false); };

  const avatarProps = profile?.full_name ? getAvatarProps(profile.full_name) : null;

  const isDark = darkHero && !scrolled;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isDark ? 'navbar--dark' : ''}`}>
        <div className="container navbar__inner">
          <button className="navbar__logo" onClick={() => handleNav('home')}>
            <img src="/logo.png" alt="Let's Enterprise" className="navbar__logo-img" />
          </button>

          <div className="navbar__links">
            {links.map(l => (
              <button
                key={l.id}
                className={`navbar__link ${activeSection === l.id ? 'navbar__link--active' : ''}`}
                onClick={() => handleNav(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="navbar__actions">
            {user ? (
              <div className="navbar__user" style={{ position: 'relative' }}>
                <button className="navbar__avatar-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <div
                    className="navbar__avatar"
                    style={{ background: avatarProps?.color || 'var(--blue)' }}
                  >
                    {avatarProps?.initials || '?'}
                  </div>
                  <div className="navbar__avatar-info">
                    <span className="navbar__avatar-name">{profile?.full_name?.split(' ')[0] || 'Alumni'}</span>
                    {profile?.status === 'pending' && <span className="navbar__status-pill">Pending</span>}
                    {profile?.status === 'approved' && <span className="navbar__status-pill navbar__status-pill--approved">Active</span>}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="navbar__user-menu">
                    <div className="navbar__user-menu-header">
                      <p className="navbar__user-menu-name">{profile?.full_name}</p>
                      <p className="navbar__user-menu-email">{user.email}</p>
                    </div>
                    {profile?.is_admin && (
                      <button className="navbar__user-menu-item" onClick={() => handleNav('admin')}>
                        <Shield size={14} /> Admin Dashboard
                      </button>
                    )}
                    <button className="navbar__user-menu-item" onClick={() => handleNav('profile')}>
                      <User size={14} /> My Profile
                    </button>
                    <div className="navbar__user-menu-divider" />
                    <button className="navbar__user-menu-item navbar__user-menu-item--danger" onClick={() => { signOut(); setUserMenuOpen(false); }}>
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="btn-secondary" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={() => handleNav('login')}>
                  Sign In
                </button>
                <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }} onClick={() => handleNav('signup')}>
                  Join Network
                </button>
              </>
            )}
          </div>

          <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {userMenuOpen && <div className="navbar__backdrop" onClick={() => setUserMenuOpen(false)} />}

      {mobileOpen && (
        <div className="mobile-menu">
          {links.map(l => (
            <button
              key={l.id}
              className={`mobile-menu__link ${activeSection === l.id ? 'mobile-menu__link--active' : ''}`}
              onClick={() => handleNav(l.id)}
            >
              {l.label}
            </button>
          ))}
          <div className="mobile-menu__actions">
            {user ? (
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { signOut(); setMobileOpen(false); }}>
                <LogOut size={15} /> Sign Out
              </button>
            ) : (
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleNav('signup')}>
                Join Network
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 16px 0; transition: all 0.35s ease;
          background: rgba(248, 250, 252, 0.72);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid rgba(22, 14, 68, 0.04);
        }
        /* Transparent on dark hero */
        .navbar--dark {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom-color: transparent !important;
          box-shadow: none !important;
        }
        .navbar--dark .navbar__link {
          color: rgba(255,255,255,0.55);
        }
        .navbar--dark .navbar__link:hover {
          color: white;
          background: rgba(255,255,255,0.07);
        }
        .navbar--dark .navbar__link--active {
          color: white;
        }
        .navbar--dark .navbar__link--active::after {
          background: var(--teal);
        }
        .navbar--dark .navbar__avatar-btn {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
          color: white;
        }
        .navbar--dark .navbar__avatar-btn:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.3);
        }
        .navbar--dark .navbar__avatar-name { color: white; }
        .navbar--dark .navbar__mobile-toggle { color: white; }
        .navbar--dark .btn-secondary {
          color: rgba(255,255,255,0.7);
          border-color: rgba(255,255,255,0.2);
          background: transparent;
        }
        .navbar--dark .btn-secondary:hover {
          color: white;
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.07);
        }
        .navbar--scrolled {
          background: rgba(248, 250, 252, 0.94);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          box-shadow: 0 1px 0 rgba(22, 14, 68, 0.08), 0 4px 24px rgba(22, 14, 68, 0.04);
          padding: 12px 0;
          border-bottom-color: rgba(22, 14, 68, 0.08);
        }
        .navbar__inner { display: flex; align-items: center; gap: 32px; }
        .navbar__logo { background: none; flex-shrink: 0; }
        .navbar__logo-img { height: 32px; width: auto; }
        .navbar__links { display: flex; align-items: center; gap: 4px; flex: 1; }
        .navbar__link {
          background: none; padding: 8px 14px; font-size: 14px; font-weight: 500;
          color: var(--text-muted); border-radius: 8px; transition: all 0.15s;
          position: relative;
        }
        .navbar__link:hover { color: var(--navy); background: rgba(22,14,68,0.04); }
        .navbar__link--active {
          color: var(--navy); font-weight: 700; background: none;
        }
        .navbar__link--active::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 14px; right: 14px;
          height: 2px;
          background: var(--teal);
          border-radius: 1px;
        }
        .navbar__actions { display: flex; align-items: center; gap: 8px; }
        .navbar__avatar-btn {
          display: flex; align-items: center; gap: 10px;
          background: white; border: 1px solid var(--border); border-radius: 100px;
          padding: 5px 14px 5px 5px; cursor: pointer; transition: all 0.15s;
        }
        .navbar__avatar-btn:hover { border-color: var(--blue); box-shadow: var(--shadow-sm); }
        .navbar__avatar {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800; color: white;
        }
        .navbar__avatar-info { display: flex; flex-direction: column; align-items: flex-start; }
        .navbar__avatar-name { font-size: 13px; font-weight: 600; color: var(--navy); line-height: 1.2; }
        .navbar__status-pill {
          font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px;
          background: rgba(245,158,11,0.1); color: #D97706;
        }
        .navbar__status-pill--approved { background: rgba(16,185,129,0.1); color: #059669; }
        .navbar__user-menu {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 14px;
          box-shadow: var(--shadow-lg), 0 0 0 1px rgba(22, 14, 68, 0.06);
          min-width: 220px; overflow: hidden; z-index: 200;
        }
        .navbar__user-menu-header {
          padding: 14px 16px; border-bottom: 1px solid var(--border);
        }
        .navbar__user-menu-name { font-size: 14px; font-weight: 700; color: var(--navy); }
        .navbar__user-menu-email { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .navbar__user-menu-item {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 11px 16px; font-size: 14px; font-weight: 500;
          color: var(--text-primary); background: none; text-align: left;
          transition: background 0.1s;
        }
        .navbar__user-menu-item:hover { background: var(--bg); }
        .navbar__user-menu-item--danger { color: #DC2626; }
        .navbar__user-menu-item--danger:hover { background: #FEF2F2; }
        .navbar__user-menu-divider { height: 1px; background: var(--border); margin: 4px 0; }
        .navbar__backdrop {
          position: fixed; inset: 0; z-index: 99; background: transparent;
        }
        .navbar__mobile-toggle { display: none; background: none; color: var(--navy); margin-left: auto; }
        .mobile-menu {
          position: fixed; top: 64px; left: 0; right: 0; z-index: 98;
          background: white; border-bottom: 1px solid var(--border);
          padding: 16px 24px 24px; display: flex; flex-direction: column; gap: 4px;
        }
        .mobile-menu__link {
          background: none; padding: 12px 16px; font-size: 16px; font-weight: 500;
          color: var(--text-primary); border-radius: 8px; text-align: left; transition: all 0.15s;
        }
        .mobile-menu__link:hover, .mobile-menu__link--active { color: var(--blue); background: var(--blue-light); }
        .mobile-menu__actions { margin-top: 12px; }
        @media (max-width: 768px) {
          .navbar__links, .navbar__actions { display: none; }
          .navbar__mobile-toggle { display: block; }
        }
      `}</style>
    </>
  );
}

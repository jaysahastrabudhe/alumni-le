import { Clock, CheckCircle, XCircle, Mail, MapPin, Briefcase, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAvatarProps } from '../supabaseClient';

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: '#D97706',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    title: 'Profile Under Review',
    desc: "The LE team will review your profile and approve it shortly. You'll be able to appear in the alumni directory once approved.",
  },
  approved: {
    icon: CheckCircle,
    color: '#059669',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    title: 'Profile Approved',
    desc: "You're live in the alumni directory. Welcome to the network.",
  },
  rejected: {
    icon: XCircle,
    color: '#DC2626',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
    title: 'Profile Not Approved',
    desc: 'Your profile was not approved. Please contact hi@letsenterprise.in for more information.',
  },
};

export default function ProfilePage({ onNav }) {
  const { user, profile } = useAuth();
  if (!user || !profile) return null;

  const status = profile.status || 'pending';
  const cfg = STATUS_CONFIG[status];
  const StatusIcon = cfg.icon;
  const { initials, color } = getAvatarProps(profile.full_name || 'A');

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          <div className="profile-card">
            <div className="profile-card-top">
              <div className="profile-avatar" style={{ background: profile.avatar_color || color }}>
                {initials}
              </div>
              <div>
                <h1 className="profile-name">{profile.full_name}</h1>
                <p className="profile-role">{profile.role || '—'} {profile.company ? `· ${profile.company}` : ''}</p>
              </div>
            </div>

            <div className="profile-meta">
              {profile.location && (
                <div className="profile-meta-item"><MapPin size={14} />{profile.location}</div>
              )}
              {user.email && (
                <div className="profile-meta-item"><Mail size={14} />{user.email}</div>
              )}
              <div className="profile-meta-item">
                <Briefcase size={14} />
                Batch '{(profile.batch || '').slice(2)} · {profile.specialization}
              </div>
            </div>

            {profile.bio && <p className="profile-bio">{profile.bio}</p>}

            {profile.tags?.length > 0 && (
              <div className="profile-tags">
                {profile.tags.map(t => <span key={t} className="tag tag-navy">{t}</span>)}
              </div>
            )}

            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="btn-secondary profile-linkedin" style={{ alignSelf: 'flex-start' }}>
                View LinkedIn
              </a>
            )}
          </div>

          <div className="profile-sidebar">
            <div
              className="profile-status-card"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
            >
              <StatusIcon size={24} style={{ color: cfg.color }} />
              <h3 style={{ color: cfg.color }}>{cfg.title}</h3>
              <p>{cfg.desc}</p>
              {status === 'rejected' && profile.rejection_reason && (
                <p className="profile-rejection-reason">Reason: {profile.rejection_reason}</p>
              )}
            </div>

            <div className="profile-info-card">
              <h4>Need to update something?</h4>
              <p>Contact <strong>hi@letsenterprise.in</strong> to request profile edits.</p>
            </div>

            {status === 'approved' && (
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNav('directory')}>
                View Alumni Directory
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .profile-page {
          padding: 48px 0 80px;
          min-height: 100vh;
        }
        .profile-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          align-items: start;
        }
        .profile-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: var(--radius-lg);
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: var(--glass-shadow), var(--shadow-sm);
        }
        .profile-card-top {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .profile-avatar {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 900;
          color: white;
          flex-shrink: 0;
        }
        .profile-name { font-size: 26px; font-weight: 900; color: var(--navy); margin-bottom: 4px; }
        .profile-role { font-size: 15px; color: var(--blue); font-weight: 500; }
        .profile-meta { display: flex; flex-direction: column; gap: 10px; }
        .profile-meta-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; color: var(--text-muted);
        }
        .profile-meta-item svg { color: var(--teal); flex-shrink: 0; }
        .profile-bio { font-size: 15px; line-height: 1.7; color: var(--text-muted); }
        .profile-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .profile-linkedin { margin-top: 4px; }
        .profile-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .profile-status-card {
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .profile-status-card h3 { font-size: 16px; font-weight: 800; }
        .profile-status-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
        .profile-rejection-reason {
          font-size: 13px;
          background: rgba(239,68,68,0.08);
          border-left: 3px solid #DC2626;
          padding: 8px 12px;
          border-radius: 4px;
          color: #DC2626 !important;
          font-style: italic;
        }
        .profile-info-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .profile-info-card h4 { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
        .profile-info-card p { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
        @media (max-width: 900px) {
          .profile-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

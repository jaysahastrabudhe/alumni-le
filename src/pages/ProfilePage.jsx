import { Clock, CheckCircle, XCircle, Mail, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAvatarProps } from '../supabaseClient';

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: '#D97706',
    bg: 'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.2)',
    title: 'Profile Under Review',
    desc: "The LE team will review your profile and approve it shortly. You'll be able to appear in the alumni directory once approved.",
  },
  approved: {
    icon: CheckCircle,
    color: '#059669',
    bg: 'rgba(16,185,129,0.07)',
    border: 'rgba(16,185,129,0.2)',
    title: 'Profile Approved',
    desc: "You're live in the alumni directory. Welcome to the network.",
  },
  rejected: {
    icon: XCircle,
    color: '#DC2626',
    bg: 'rgba(239,68,68,0.07)',
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
    <div className="pp-page">
      {/* ── Page Hero ── */}
      <div className="pp-hero">
        <div className="pp-hero__grid" aria-hidden="true" />
        <div className="container pp-hero__inner">
          <div className="pp-hero__eyebrow">
            <span className="pp-hero__dash" />
            <span>My Account</span>
          </div>
          <div className="pp-hero__profile">
            <div
              className="pp-hero__avatar"
              style={{ background: profile.avatar_color || color }}
            >
              {initials}
            </div>
            <div>
              <h1 className="pp-hero__name">
                {profile.full_name}
              </h1>
              <p className="pp-hero__role">
                {profile.role && profile.company
                  ? `${profile.role} · ${profile.company}`
                  : profile.role || profile.company || 'LE Alumnus'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="pp-body">
        <div className="container">
          <div className="pp-layout">

            {/* ── Main Card ── */}
            <div className="pp-card">

              <div className="pp-section">
                <h2 className="pp-section-title">Profile Details</h2>
                <div className="pp-meta">
                  {profile.location && (
                    <div className="pp-meta-item">
                      <MapPin size={15} className="pp-meta-icon" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className="pp-meta-item">
                      <Mail size={15} className="pp-meta-icon" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  <div className="pp-meta-item">
                    <Briefcase size={15} className="pp-meta-icon" />
                    <span>Batch '{(profile.batch || '').slice(2)} · {profile.specialization}</span>
                  </div>
                </div>
              </div>

              {profile.bio && (
                <div className="pp-section">
                  <h2 className="pp-section-title">About</h2>
                  <p className="pp-bio">{profile.bio}</p>
                </div>
              )}

              {profile.tags?.length > 0 && (
                <div className="pp-section">
                  <h2 className="pp-section-title">Tags</h2>
                  <div className="pp-tags">
                    {profile.tags.map(t => (
                      <span key={t} className="pp-tag">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {profile.linkedin_url && (
                <div className="pp-section">
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="pp-linkedin-btn"
                  >
                    View LinkedIn Profile
                    <ArrowRight size={15} />
                  </a>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="pp-sidebar">
              {/* Status card */}
              <div
                className="pp-status-card"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
              >
                <StatusIcon size={22} style={{ color: cfg.color }} />
                <h3 className="pp-status-title" style={{ color: cfg.color }}>{cfg.title}</h3>
                <p className="pp-status-desc">{cfg.desc}</p>
                {status === 'rejected' && profile.rejection_reason && (
                  <p className="pp-rejection-reason">Reason: {profile.rejection_reason}</p>
                )}
              </div>

              {/* Info card */}
              <div className="pp-info-card">
                <h4 className="pp-info-card__title">Need to update something?</h4>
                <p className="pp-info-card__text">
                  Contact <strong>hi@letsenterprise.in</strong> to request profile edits.
                </p>
              </div>

              {/* CTA for approved users */}
              {status === 'approved' && (
                <button
                  className="pp-dir-btn"
                  onClick={() => onNav('directory')}
                >
                  View Alumni Directory <ArrowRight size={15} />
                </button>
              )}
            </aside>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Page ── */
        .pp-page {
          background: #ffffff;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .pp-hero {
          position: relative;
          padding: 64px 0 56px;
          overflow: hidden;
          background: linear-gradient(160deg, #f0effe 0%, #fafafe 100%);
          border-bottom: 1px solid #e5e7eb;
        }
        .pp-hero__grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(22,14,68,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .pp-hero__inner { position: relative; z-index: 1; }
        .pp-hero__eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 24px;
        }
        .pp-hero__dash {
          display: inline-block; width: 28px; height: 1px;
          background: var(--teal); flex-shrink: 0;
        }
        .pp-hero__profile { display: flex; align-items: center; gap: 20px; }
        .pp-hero__avatar {
          width: 72px; height: 72px; border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 900; color: white; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .pp-hero__name {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900; color: var(--navy);
          letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 6px;
        }
        .pp-hero__role { font-size: 16px; color: var(--teal); font-weight: 600; }

        /* ── Body ── */
        .pp-body { padding: 48px 0 80px; }

        /* ── Layout ── */
        .pp-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px; align-items: start;
        }

        /* ── Main Card ── */
        .pp-card {
          background: #ffffff; border: 1px solid #e5e7eb;
          border-radius: var(--radius-lg); overflow: hidden;
        }
        .pp-section {
          padding: 28px 32px;
          border-bottom: 1px solid #f3f4f6;
        }
        .pp-section:last-child { border-bottom: none; }
        .pp-section-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #9ca3af; margin-bottom: 16px;
        }
        .pp-meta { display: flex; flex-direction: column; gap: 12px; }
        .pp-meta-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 15px; color: #374151;
        }
        .pp-meta-icon { color: var(--teal); flex-shrink: 0; }
        .pp-bio {
          font-size: 15px; line-height: 1.75; color: #374151;
        }
        .pp-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .pp-tag {
          padding: 5px 14px; border-radius: 100px;
          font-size: 13px; font-weight: 600;
          background: #f0effe; color: var(--navy);
          border: 1px solid rgba(22,14,68,0.1);
        }
        .pp-linkedin-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: var(--radius-sm);
          font-size: 14px; font-weight: 600;
          color: var(--teal);
          background: rgba(37,188,189,0.08);
          border: 1px solid rgba(37,188,189,0.25);
          transition: all 0.15s;
        }
        .pp-linkedin-btn:hover {
          background: var(--teal); color: white; border-color: var(--teal);
        }

        /* ── Sidebar ── */
        .pp-sidebar {
          display: flex; flex-direction: column; gap: 16px;
          position: sticky; top: 90px;
        }

        /* Status card */
        .pp-status-card {
          border-radius: var(--radius-md); padding: 24px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .pp-status-title { font-size: 16px; font-weight: 800; }
        .pp-status-desc {
          font-size: 14px; color: #6b7280; line-height: 1.6;
        }
        .pp-rejection-reason {
          font-size: 13px;
          background: rgba(239,68,68,0.06);
          border-left: 3px solid #DC2626;
          padding: 8px 12px; border-radius: 4px;
          color: #DC2626; font-style: italic;
        }

        /* Info card */
        .pp-info-card {
          background: #f9fafb; border: 1px solid #e5e7eb;
          border-radius: var(--radius-md); padding: 20px;
        }
        .pp-info-card__title {
          font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 6px;
        }
        .pp-info-card__text {
          font-size: 13px; color: #6b7280; line-height: 1.6;
        }
        .pp-info-card__text strong { color: var(--navy); }

        /* Directory button */
        .pp-dir-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 14px;
          font-size: 14px; font-weight: 700;
          background: var(--teal); color: white;
          border-radius: var(--radius-sm);
          transition: all 0.2s var(--ease);
        }
        .pp-dir-btn:hover {
          background: rgba(37,188,189,0.85);
          box-shadow: 0 8px 28px rgba(37,188,189,0.3);
          transform: translateY(-1px);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pp-layout { grid-template-columns: 1fr; }
          .pp-sidebar { position: static; }
          .pp-hero__name { font-size: clamp(24px, 6vw, 36px); }
        }
      `}</style>
    </div>
  );
}

import { ArrowRight, Users, Building2, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '400+', label: 'Alumni Strong' },
  { icon: Building2, value: '180+', label: 'Companies Built' },
  { icon: Globe, value: '14', label: 'Cities Active' },
];

export default function Hero({ onNav }) {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__bg-blob hero__bg-blob--1" />
        <div className="hero__bg-blob hero__bg-blob--2" />
        <div className="hero__bg-grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="tag">Alumni Network</span>
            <span className="hero__badge-text">Batch 2020 – 2025</span>
          </div>

          <h1 className="hero__headline">
            Where <span className="hero__headline-accent">doers</span><br />
            find each other.
          </h1>

          <p className="hero__sub">
            The Let's Enterprise alumni network — builders, founders, and leaders
            who skipped the theory and went straight to work. This is your community.
          </p>

          <div className="hero__actions">
            <button className="btn-primary" onClick={() => onNav('directory')}>
              Browse Alumni <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => onNav('mentorship')}>
              Find a Mentor
            </button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__avatar-grid">
            {['AM', 'PS', 'RD', 'AI', 'KB', 'SK', 'DP', 'NR', 'VT', 'MJ', 'RL', 'PK'].map((initials, i) => (
              <div
                key={i}
                className="hero__avatar"
                style={{
                  background: i % 3 === 0 ? 'var(--gradient)' : i % 3 === 1 ? 'var(--gradient-navy)' : 'linear-gradient(135deg, #25BCBD, #160E44)',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {initials}
              </div>
            ))}
          </div>

          <div className="hero__badge-floating hero__badge-floating--1">
            <span className="hero__badge-dot" style={{ background: '#25BCBD' }} />
            <span>3 new alumni this week</span>
          </div>
          <div className="hero__badge-floating hero__badge-floating--2">
            <span className="hero__badge-dot" style={{ background: '#3663AD' }} />
            <span>12 open opportunities</span>
          </div>
        </div>
      </div>

      <div className="hero__stats">
        <div className="container">
          <div className="hero__stats-inner">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="hero__stat">
                <div className="hero__stat-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="hero__stat-value">{value}</div>
                  <div className="hero__stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          padding: 140px 0 0;
          overflow: hidden;
        }
        .hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .hero__bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .hero__bg-blob--1 {
          width: 600px;
          height: 600px;
          top: -200px;
          right: -100px;
          background: radial-gradient(ellipse, rgba(37, 188, 189, 0.12), transparent 70%);
        }
        .hero__bg-blob--2 {
          width: 500px;
          height: 500px;
          bottom: 0;
          left: -150px;
          background: radial-gradient(ellipse, rgba(54, 99, 173, 0.10), transparent 70%);
        }
        .hero__bg-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(22,14,68,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22,14,68,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }
        .hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding-bottom: 80px;
        }
        .hero__badge {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .hero__badge-text {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
        }
        .hero__headline {
          font-size: 64px;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--navy);
          margin-bottom: 24px;
        }
        .hero__headline-accent {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero__sub {
          font-size: 17px;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 40px;
          max-width: 480px;
        }
        .hero__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero__visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero__avatar-grid {
          display: grid;
          grid-template-columns: repeat(4, 72px);
          gap: 12px;
        }
        .hero__avatar {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 800;
          color: white;
          letter-spacing: 0.05em;
          box-shadow: var(--shadow-md);
          animation: avatarFloat 3s ease-in-out infinite;
        }
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .hero__badge-floating {
          position: absolute;
          background: white;
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          color: var(--navy);
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: var(--shadow-md);
          white-space: nowrap;
        }
        .hero__badge-floating--1 {
          bottom: 20px;
          left: -20px;
        }
        .hero__badge-floating--2 {
          top: 20px;
          right: -20px;
        }
        .hero__badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .hero__stats {
          background: var(--navy);
          padding: 32px 0;
        }
        .hero__stats-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 80px;
        }
        .hero__stat {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hero__stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }
        .hero__stat-value {
          font-size: 28px;
          font-weight: 900;
          color: white;
          line-height: 1;
          margin-bottom: 2px;
        }
        .hero__stat-label {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .hero__inner {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .hero__headline { font-size: 44px; }
          .hero__sub { margin-left: auto; margin-right: auto; }
          .hero__actions { justify-content: center; }
          .hero__visual { display: none; }
          .hero__stats-inner { gap: 32px; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}

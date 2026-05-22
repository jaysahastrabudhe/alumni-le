import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '400+', label: 'Alumni Strong' },
  { value: '180+', label: 'Companies Built' },
  { value: '14', label: 'Cities Active' },
  { value: '6', label: 'Batches' },
];

export default function Hero({ onNav }) {
  return (
    <section className="hero-v2">
      <div className="hero-v2__bg" aria-hidden="true">
        <div className="hero-v2__blob hero-v2__blob--1" />
        <div className="hero-v2__blob hero-v2__blob--2" />
        <div className="hero-v2__grid" />
      </div>

      <div className="container hero-v2__inner">
        <div className="hero-v2__eyebrow">
          <span className="hero-v2__eyebrow-dash" />
          <span>Let's Enterprise — Alumni Network · Batch 2020–2025</span>
        </div>

        <h1 className="hero-v2__headline">
          <span className="hero-v2__line hero-v2__line--1">Built,</span>
          <span className="hero-v2__line hero-v2__line--2">
            not <em className="hero-v2__accent">born.</em>
          </span>
        </h1>

        <div className="hero-v2__divider" />

        <p className="hero-v2__sub">
          The LE alumni network — builders, founders, and leaders who skipped the theory
          and went straight to work. This is your community.
        </p>

        <div className="hero-v2__actions">
          <button className="hero-v2__cta-primary" onClick={() => onNav('directory')}>
            Browse Alumni <ArrowRight size={16} />
          </button>
          <button className="hero-v2__cta-ghost" onClick={() => onNav('mentorship')}>
            Find a Mentor
          </button>
        </div>
      </div>

      <div className="hero-v2__stats-bar">
        <div className="container">
          <div className="hero-v2__stats">
            {stats.map((s, i) => (
              <div key={s.label} className="hero-v2__stat">
                <span className="hero-v2__stat-value">{s.value}</span>
                <span className="hero-v2__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-v2 {
          position: relative;
          background: var(--navy);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .hero-v2__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .hero-v2__blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }
        .hero-v2__blob--1 {
          width: 700px; height: 700px;
          top: -200px; right: -100px;
          background: radial-gradient(ellipse, rgba(37,188,189,0.10), transparent 70%);
        }
        .hero-v2__blob--2 {
          width: 600px; height: 600px;
          bottom: -100px; left: -200px;
          background: radial-gradient(ellipse, rgba(54,99,173,0.12), transparent 70%);
        }
        .hero-v2__grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black, transparent);
        }
        .hero-v2__inner {
          position: relative;
          z-index: 1;
          flex: 1;
          padding-top: calc(65px + 72px);
          padding-bottom: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-v2__eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 48px;
          animation: fadeUp 0.7s 0s var(--ease) both;
        }
        .hero-v2__eyebrow-dash {
          display: inline-block;
          width: 36px; height: 1px;
          background: var(--teal);
          flex-shrink: 0;
          opacity: 0.8;
        }
        .hero-v2__headline {
          display: flex;
          flex-direction: column;
          font-size: clamp(72px, 10vw, 128px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.05em;
          color: white;
          margin-bottom: 0;
        }
        .hero-v2__line {
          display: block;
        }
        .hero-v2__line--1 {
          animation: fadeUp 0.7s 0.08s var(--ease) both;
        }
        .hero-v2__line--2 {
          animation: fadeUp 0.7s 0.18s var(--ease) both;
        }
        .hero-v2__accent {
          font-style: italic;
          color: var(--teal);
          text-shadow: 0 0 80px rgba(37,188,189,0.35);
        }
        .hero-v2__divider {
          width: 64px;
          height: 1px;
          background: rgba(255,255,255,0.15);
          margin: 48px 0;
          animation: fadeIn 0.6s 0.3s var(--ease) both;
        }
        .hero-v2__sub {
          font-size: 17px;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          max-width: 520px;
          margin-bottom: 48px;
          animation: fadeUp 0.6s 0.35s var(--ease) both;
        }
        .hero-v2__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s 0.45s var(--ease) both;
        }
        .hero-v2__cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: var(--teal);
          color: white;
          font-size: 15px;
          font-weight: 700;
          border-radius: 4px;
          letter-spacing: 0.01em;
          transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease), background 0.2s;
        }
        .hero-v2__cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(37,188,189,0.45);
          background: #1fa9aa;
        }
        .hero-v2__cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 31px;
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-size: 15px;
          font-weight: 600;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.2s var(--ease);
        }
        .hero-v2__cta-ghost:hover {
          color: white;
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.05);
        }

        /* Stats bar */
        .hero-v2__stats-bar {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 40px 0;
          animation: fadeIn 0.8s 0.6s var(--ease) both;
        }
        .hero-v2__stats {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .hero-v2__stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0 32px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .hero-v2__stat:first-child { padding-left: 0; }
        .hero-v2__stat:last-child { border-right: none; }
        .hero-v2__stat-value {
          font-size: 40px;
          font-weight: 900;
          color: white;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .hero-v2__stat-label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-v2__inner { padding-top: calc(65px + 48px); padding-bottom: 48px; }
          .hero-v2__eyebrow { margin-bottom: 32px; }
          .hero-v2__divider { margin: 36px 0; }
          .hero-v2__sub { font-size: 15px; }
          .hero-v2__stats { gap: 0; flex-wrap: wrap; }
          .hero-v2__stat {
            flex: 1 1 40%;
            padding: 16px 0;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .hero-v2__stat:nth-child(odd) { padding-right: 24px; }
          .hero-v2__stat-value { font-size: 32px; }
        }
        @media (max-width: 480px) {
          .hero-v2__actions { flex-direction: column; }
          .hero-v2__cta-primary, .hero-v2__cta-ghost { justify-content: center; }
          .hero-v2__stat { flex: 1 1 100%; border-bottom: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>
    </section>
  );
}

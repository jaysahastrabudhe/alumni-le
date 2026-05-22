import { ArrowRight } from 'lucide-react';

const STATS = [
  { num: 400, suffix: '+', label: 'Alumni Strong' },
  { num: 180, suffix: '+', label: 'Companies Built' },
  { num: 14,  suffix: '',  label: 'Cities Active'  },
  { num: 6,   suffix: '',  label: 'Batches'         },
];

export default function Hero({ onNav }) {
  return (
    <section className="hero">

      {/* ── Deep multi-layer background ── */}
      <div className="hero__bg" aria-hidden="true">
        {/* Dot grid */}
        <div className="hero__grid" />

        {/* Glow orbs — different z-depths for parallax */}
        <div className="hero__glow hero__glow--teal" />
        <div className="hero__glow hero__glow--blue" />
        <div className="hero__glow hero__glow--violet" />

        {/* Large spotlight behind the headline */}
        <div className="hero__spotlight" />
      </div>

      {/* ── Main content (parallax mid-layer) ── */}
      <div className="container hero__inner" data-parallax="text">
        <div className="hero__eyebrow" data-anim="eyebrow">
          <span className="hero__eyebrow-line" />
          <span>Let's Enterprise — Alumni Network · Batch 2020–2025</span>
        </div>

        <h1 className="hero__headline">
          <span className="hero__line-clip">
            <span className="hero__line-inner">Built,</span>
          </span>
          <span className="hero__line-clip">
            <span className="hero__line-inner">
              not <em className="hero__accent">born.</em>
              {/* Accent glow behind the word */}
              <span className="hero__accent-glow" aria-hidden="true" />
            </span>
          </span>
        </h1>

        <div className="hero__rule" data-anim="rule" />

        <p className="hero__sub" data-anim="sub">
          The LE alumni network — builders, founders, and leaders who skipped
          the theory and went straight to work. This is your community.
        </p>

        <div className="hero__btns" data-anim="btns">
          {/* Primary — teal fill with shimmer sweep */}
          <button
            className="hero__btn hero__btn--primary"
            onClick={() => onNav('directory')}
          >
            <span className="hero__btn-shimmer" aria-hidden="true" />
            <span>Browse Alumni</span>
            <ArrowRight size={16} />
          </button>

          {/* Ghost — white outline */}
          <button
            className="hero__btn hero__btn--ghost"
            onClick={() => onNav('mentorship')}
          >
            <span>Find a Mentor</span>
          </button>
        </div>
      </div>

      {/* ── Stats bar (bottom) ── */}
      <div className="hero__stats-bar" data-anim="stats">
        <div className="container">
          <div className="hero__stats">
            {STATS.map(s => (
              <div key={s.label} className="hero__stat">
                <span
                  className="hero__stat-num"
                  data-count={s.num}
                  data-suffix={s.suffix}
                >
                  {s.num}{s.suffix}
                </span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ─────────────────────────────────────────
           HERO — covers full first fold on every
           device (100dvh = dynamic viewport height,
           no browser-chrome overflow on mobile)
        ───────────────────────────────────────── */
        .hero {
          position: relative;
          min-height: 100dvh;
          min-height: 100vh; /* fallback for older browsers */
          display: flex;
          flex-direction: column;
          background: #0f0b2e;   /* slightly deeper than --navy for richer glow contrast */
          overflow: hidden;
          isolation: isolate;
        }

        /* ── Background layers ── */
        .hero__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle dot grid */
        .hero__grid {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 40%, black 40%, transparent 100%);
        }

        /* Glow orbs */
        .hero__glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }
        /* Teal — dominant glow, center-right */
        .hero__glow--teal {
          width: 900px; height: 900px;
          top: -20%; right: -10%;
          background: radial-gradient(circle,
            rgba(37,188,189,0.22) 0%,
            rgba(37,188,189,0.08) 45%,
            transparent 70%
          );
          filter: blur(60px);
        }
        /* Blue — secondary, bottom-left */
        .hero__glow--blue {
          width: 800px; height: 800px;
          bottom: -15%; left: -15%;
          background: radial-gradient(circle,
            rgba(54,99,173,0.25) 0%,
            rgba(54,99,173,0.08) 50%,
            transparent 72%
          );
          filter: blur(70px);
        }
        /* Violet — accent rim, top-center */
        .hero__glow--violet {
          width: 600px; height: 600px;
          top: -10%; left: 20%;
          background: radial-gradient(circle,
            rgba(111,66,193,0.15) 0%,
            rgba(111,66,193,0.04) 55%,
            transparent 72%
          );
          filter: blur(80px);
        }
        /* Central spotlight behind headline */
        .hero__spotlight {
          position: absolute;
          width: 700px; height: 700px;
          top: 50%; left: 15%;
          transform: translate(-10%, -55%);
          background: radial-gradient(circle,
            rgba(37,188,189,0.12) 0%,
            rgba(54,99,173,0.07) 40%,
            transparent 70%
          );
          filter: blur(50px);
          will-change: transform, opacity;
        }

        /* ── Content layer ── */
        .hero__inner {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: calc(65px + 64px);
          padding-bottom: 64px;
          will-change: transform;
        }

        /* Eyebrow */
        .hero__eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 44px;
          opacity: 0;
        }
        .hero__eyebrow-line {
          display: inline-block;
          width: 40px; height: 1px;
          background: linear-gradient(90deg, var(--teal), rgba(37,188,189,0.3));
          flex-shrink: 0;
        }

        /* Headline */
        .hero__headline {
          display: flex;
          flex-direction: column;
          font-size: clamp(72px, 10.5vw, 140px);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.05em;
          color: white;
          margin-bottom: 0;
        }
        /* Clip container for line reveal */
        .hero__line-clip {
          display: block;
          overflow: hidden;
          padding-bottom: 0.07em;
          margin-bottom: -0.07em;
        }
        .hero__line-inner {
          display: block;
          position: relative;
          will-change: transform;
        }

        /* Italic teal accent */
        .hero__accent {
          font-style: italic;
          color: var(--teal);
          text-shadow:
            0 0 40px rgba(37,188,189,0.5),
            0 0 80px rgba(37,188,189,0.25),
            0 0 120px rgba(37,188,189,0.12);
          position: relative;
        }
        /* Extra glow halo behind "born." */
        .hero__accent-glow {
          position: absolute;
          inset: -20px -30px;
          background: radial-gradient(ellipse,
            rgba(37,188,189,0.18) 0%,
            transparent 65%
          );
          filter: blur(20px);
          z-index: -1;
          pointer-events: none;
        }

        /* Rule */
        .hero__rule {
          width: 72px;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.3), transparent);
          margin: 48px 0;
          transform-origin: left center;
          transform: scaleX(0);
        }

        /* Sub */
        .hero__sub {
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.8;
          color: rgba(255,255,255,0.5);
          max-width: 520px;
          margin-bottom: 52px;
          opacity: 0;
        }

        /* ── Buttons ── */
        .hero__btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        /* Individual buttons hidden — GSAP fromTo stagger-pops them in */
        .hero__btn { opacity: 0; }
        .hero__btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 17px 36px;
          font-size: 15px;
          font-weight: 700;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
          letter-spacing: 0.01em;
        }
        /* Primary — teal fill */
        .hero__btn--primary {
          background: var(--teal);
          color: white;
          border: none;
          box-shadow: 0 0 0 rgba(37,188,189,0);
        }
        .hero__btn--primary:hover {
          transform: translateY(-3px);
          box-shadow:
            0 16px 40px rgba(37,188,189,0.5),
            0 0 60px rgba(37,188,189,0.2);
        }
        /* Shimmer sweep */
        .hero__btn-shimmer {
          position: absolute;
          top: 0; left: -80%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255,255,255,0.35) 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
          animation: hero-shimmer 3.5s ease-in-out infinite 2s;
          pointer-events: none;
        }
        @keyframes hero-shimmer {
          0%   { left: -80%; opacity: 0; }
          10%  { opacity: 1; }
          60%  { left: 130%; opacity: 1; }
          61%, 100% { left: 130%; opacity: 0; }
        }

        /* Ghost */
        .hero__btn--ghost {
          background: transparent;
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.22);
        }
        .hero__btn--ghost:hover {
          color: white;
          border-color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.06);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(255,255,255,0.07);
        }

        /* ── Stats bar ── */
        .hero__stats-bar {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 36px 0;
          opacity: 0;
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(4px);
        }
        .hero__stats {
          display: flex;
          align-items: stretch;
        }
        .hero__stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 0 36px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .hero__stat:first-child { padding-left: 0; }
        .hero__stat:last-child  { border-right: none; }
        .hero__stat-num {
          font-size: 42px;
          font-weight: 900;
          color: white;
          line-height: 1;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }
        .hero__stat-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero__inner {
            padding-top: calc(65px + 48px);
            padding-bottom: 48px;
          }
          .hero__eyebrow { margin-bottom: 32px; }
          .hero__rule    { margin: 36px 0; }
        }
        @media (max-width: 600px) {
          .hero__btns { flex-direction: column; }
          .hero__btn  { justify-content: center; }
          .hero__stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }
          .hero__stat {
            padding: 20px 16px;
            border-right: 1px solid rgba(255,255,255,0.07);
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .hero__stat:nth-child(2n) { border-right: none; }
          .hero__stat:nth-last-child(-n+2) { border-bottom: none; }
          .hero__stat-num { font-size: 32px; }
        }
      `}</style>
    </section>
  );
}

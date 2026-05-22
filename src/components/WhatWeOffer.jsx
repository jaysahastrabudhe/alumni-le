import { ArrowRight } from 'lucide-react';

const ITEMS = [
  {
    num: '01',
    label: 'Directory',
    title: 'Find your people.',
    desc: 'Connect with 400+ builders, founders, and operators from every LE batch.',
    view: 'directory',
  },
  {
    num: '02',
    label: 'Events',
    title: 'Stay in the room.',
    desc: 'Founder mixers, keynotes, and signature LE events — live and online.',
    view: 'events',
  },
  {
    num: '03',
    label: 'Jobs',
    title: 'Hire from trust.',
    desc: 'Opportunities posted by alumni, for alumni. No cold applications.',
    view: 'jobs',
  },
  {
    num: '04',
    label: 'Mentorship',
    title: 'Learn from someone who did it.',
    desc: "Get matched with an alumnus who's been exactly where you're going.",
    view: 'mentorship',
  },
];

export default function WhatWeOffer({ onNav }) {
  return (
    <section className="offer">
      <div className="container">
        <div className="offer__header">
          <div className="offer__header-label">
            <span className="offer__label-dash" />
            <span>What We Offer</span>
          </div>
          <h2 className="offer__title">
            <span className="line-clip"><span className="line-inner">The full network.</span></span>
            <span className="line-clip"><span className="line-inner">At your fingertips.</span></span>
          </h2>
        </div>

        <div className="offer__list" role="list">
          {ITEMS.map((item, i) => (
            <button
              key={item.num}
              className="offer__row"
              onClick={() => onNav(item.view)}
              role="listitem"
              aria-label={`Navigate to ${item.label}: ${item.title}`}
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
            >
              <span className="offer__num">{item.num}</span>
              <div className="offer__content">
                <span className="offer__row-label">{item.label}</span>
                <h3 className="offer__row-title">{item.title}</h3>
                <p className="offer__row-desc">{item.desc}</p>
              </div>
              <span className="offer__arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .offer {
          background: var(--bg);
          padding: 120px 0;
          border-top: 1px solid var(--border);
        }
        .offer__header {
          margin-bottom: 64px;
          animation: fadeUp 0.6s 0.05s var(--ease) both;
        }
        .offer__header-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 20px;
        }
        .offer__label-dash {
          display: inline-block;
          width: 28px; height: 1px;
          background: var(--teal);
          flex-shrink: 0;
        }
        .offer__title {
          font-size: clamp(36px, 4.5vw, 60px);
          font-weight: 900;
          color: var(--navy);
          letter-spacing: -0.04em;
          line-height: 1.05;
        }
        .offer__list {
          border-top: 1px solid var(--border);
        }
        .offer__row {
          width: 100%;
          display: grid;
          grid-template-columns: 80px 1fr 48px;
          align-items: center;
          gap: 32px;
          padding: 40px 0;
          background: transparent;
          border-bottom: 1px solid var(--border);
          text-align: left;
          transition: background 0.22s var(--ease), padding 0.22s var(--ease);
          cursor: pointer;
          /* GSAP handles entrance */
        }
        .offer__row:hover {
          background: white;
          padding-left: 28px;
          padding-right: 28px;
          margin-left: -28px;
          margin-right: -28px;
          width: calc(100% + 56px);
          border-radius: var(--radius-sm);
        }
        .offer__row:hover .offer__arrow {
          transform: translateX(4px);
          color: var(--teal);
        }
        .offer__row:hover .offer__num {
          color: var(--teal);
        }
        .offer__num {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: rgba(22,14,68,0.25);
          transition: color 0.2s;
          font-variant-numeric: tabular-nums;
        }
        .offer__content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .offer__row-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 4px;
        }
        .offer__row-title {
          font-size: clamp(18px, 2.5vw, 28px);
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .offer__row-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-top: 4px;
          max-width: 520px;
        }
        .offer__arrow {
          color: rgba(22,14,68,0.25);
          transition: transform 0.22s var(--ease), color 0.22s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .offer { padding: 80px 0; }
          .offer__row {
            grid-template-columns: 48px 1fr 32px;
            gap: 16px;
            padding: 28px 0;
          }
          .offer__row:hover {
            padding-left: 16px;
            padding-right: 16px;
            margin-left: -16px;
            margin-right: -16px;
            width: calc(100% + 32px);
          }
        }
        @media (max-width: 480px) {
          .offer__row { grid-template-columns: 40px 1fr 28px; gap: 12px; }
        }
      `}</style>
    </section>
  );
}

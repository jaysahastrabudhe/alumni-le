import { Target, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { alumniData } from '../data/alumni';

const areas = [
  'Venture Building',
  'Product & Growth',
  'Family Business',
  'Fundraising',
  'Operations at Scale',
  'Brand & Marketing',
  'Hiring & Team Building',
  'Career Pivots',
];

export default function Mentorship() {
  const mentors = alumniData.filter(a => a.featured);

  return (
    <div className="ms-page">
      {/* ── Page Header ── */}
      <div className="ms-hero">
        <div className="ms-hero__grid" aria-hidden="true" />
        <div className="container ms-hero__inner">
          <div className="ms-hero__eyebrow">
            <span className="ms-hero__dash" />
            <span>Alumni Mentors</span>
          </div>
          <h1 className="ms-hero__title">
            Learn from someone<br />
            who <em className="ms-hero__accent">did</em> it.
          </h1>
          <p className="ms-hero__sub">
            Not a professor. Not a panel. An actual LE alumnus who's been where
            you are — and went further.
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="ms-body">
        <div className="container">
          <div className="ms-layout">

            {/* ── Left: Info ── */}
            <div className="ms-left">
              <div className="ms-benefits-title">What you get</div>
              <ul className="ms-benefits">
                {[
                  '1:1 sessions with vetted alumni mentors',
                  'Match by track, industry, or challenge',
                  'Monthly group sessions open to all',
                  'Free for current students & alumni',
                ].map(b => (
                  <li key={b} className="ms-benefit">
                    <CheckCircle size={16} className="ms-benefit__icon" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="ms-areas">
                <p className="ms-areas__label">Areas of mentorship</p>
                <div className="ms-areas__tags">
                  {areas.map(a => (
                    <span key={a} className="ms-area-tag">{a}</span>
                  ))}
                </div>
              </div>

              <button className="ms-cta">
                Request a Mentor <ArrowRight size={16} />
              </button>
            </div>

            {/* ── Right: Cards ── */}
            <div className="ms-right">
              <div className="ms-cards">
                {mentors.map((mentor, i) => (
                  <div
                    key={mentor.id}
                    className="ms-mentor-card"
                    style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                  >
                    <div className="ms-mentor-card__top">
                      <div
                        className="ms-mentor-card__avatar"
                        style={{ background: `linear-gradient(135deg, ${mentor.color}, ${mentor.color}80)` }}
                      >
                        {mentor.avatar}
                      </div>
                      <div>
                        <p className="ms-mentor-card__name">{mentor.name}</p>
                        <p className="ms-mentor-card__role">{mentor.role}, {mentor.company}</p>
                        <p className="ms-mentor-card__batch">
                          Batch '{mentor.batch.slice(2)} · {mentor.specialization}
                        </p>
                      </div>
                    </div>
                    <p className="ms-mentor-card__bio">{mentor.bio}</p>
                    <div className="ms-mentor-card__tags">
                      {mentor.tags.slice(0, 2).map(t => (
                        <span key={t} className="ms-mentor-card__tag">{t}</span>
                      ))}
                    </div>
                    <button className="ms-mentor-card__btn">
                      <MessageCircle size={14} /> Book Session
                    </button>
                  </div>
                ))}
              </div>

              {/* Become a mentor */}
              <div className="ms-become">
                <Target size={20} className="ms-become__icon" />
                <div className="ms-become__info">
                  <p className="ms-become__title">Become a Mentor</p>
                  <p className="ms-become__desc">Alumni can give back by offering 2 sessions/month.</p>
                </div>
                <button className="ms-become__btn">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Page ── */
        .ms-page {
          background: #ffffff;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .ms-hero {
          position: relative;
          padding: 80px 0 72px;
          overflow: hidden;
          background: linear-gradient(160deg, #f0effe 0%, #fafafe 100%);
          border-bottom: 1px solid #e5e7eb;
        }
        .ms-hero__grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(22,14,68,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ms-hero__inner { position: relative; z-index: 1; }
        .ms-hero__eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 24px;
        }
        .ms-hero__dash {
          display: inline-block; width: 28px; height: 1px;
          background: var(--teal); flex-shrink: 0;
        }
        .ms-hero__title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900; color: var(--navy);
          letter-spacing: -0.04em; line-height: 1.0;
          margin-bottom: 20px;
        }
        .ms-hero__accent {
          font-style: italic; color: var(--teal);
        }
        .ms-hero__sub {
          font-size: clamp(15px, 1.4vw, 17px);
          color: #6b7280; line-height: 1.7; max-width: 520px;
        }

        /* ── Body ── */
        .ms-body { padding: 64px 0 96px; }

        /* ── Layout ── */
        .ms-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }

        /* ── Left ── */
        .ms-benefits-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #9ca3af; margin-bottom: 20px;
        }
        .ms-benefits {
          list-style: none;
          display: flex; flex-direction: column; gap: 14px; margin-bottom: 40px;
        }
        .ms-benefit {
          display: flex; align-items: center; gap: 12px;
          font-size: 15px; font-weight: 500; color: #374151; line-height: 1.5;
        }
        .ms-benefit__icon { color: var(--teal); flex-shrink: 0; }
        .ms-areas { margin-bottom: 40px; }
        .ms-areas__label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #9ca3af; margin-bottom: 14px;
        }
        .ms-areas__tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .ms-area-tag {
          padding: 6px 14px; border-radius: 100px;
          font-size: 12px; font-weight: 600;
          background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
          transition: all 0.15s; cursor: pointer;
        }
        .ms-area-tag:hover {
          background: rgba(37,188,189,0.08);
          color: var(--teal); border-color: rgba(37,188,189,0.3);
        }
        .ms-cta {
          display: flex; align-items: center; gap: 10px;
          padding: 17px 36px; font-size: 15px; font-weight: 700;
          background: var(--teal); color: white;
          border-radius: var(--radius-sm);
          transition: all 0.2s var(--ease);
        }
        .ms-cta:hover {
          background: rgba(37,188,189,0.85);
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(37,188,189,0.3);
        }

        /* ── Right: Mentor cards ── */
        .ms-cards {
          display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px;
        }
        .ms-mentor-card {
          background: #ffffff; border: 1px solid #e5e7eb;
          border-radius: var(--radius-md); padding: 22px;
          transition: all 0.22s var(--ease);
          animation: fadeUp 0.6s var(--ease) both;
        }
        .ms-mentor-card:hover {
          border-color: rgba(37,188,189,0.45);
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px rgba(37,188,189,0.1);
        }
        .ms-mentor-card__top {
          display: flex; gap: 14px; align-items: center; margin-bottom: 12px;
        }
        .ms-mentor-card__avatar {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: white; flex-shrink: 0;
        }
        .ms-mentor-card__name {
          font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 2px;
        }
        .ms-mentor-card__role {
          font-size: 13px; color: var(--teal); font-weight: 500; margin-bottom: 1px;
        }
        .ms-mentor-card__batch { font-size: 12px; color: #9ca3af; }
        .ms-mentor-card__bio {
          font-size: 13px; line-height: 1.65; color: #6b7280; margin-bottom: 12px;
        }
        .ms-mentor-card__tags { display: flex; gap: 6px; margin-bottom: 14px; }
        .ms-mentor-card__tag {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
        }
        .ms-mentor-card__btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 18px; font-size: 13px; font-weight: 600;
          color: var(--teal);
          background: rgba(37,188,189,0.08);
          border: 1px solid rgba(37,188,189,0.25);
          border-radius: 8px; transition: all 0.15s;
        }
        .ms-mentor-card__btn:hover {
          background: var(--teal); color: white; border-color: var(--teal);
        }

        /* Become a mentor banner */
        .ms-become {
          background: rgba(37,188,189,0.06);
          border: 1px solid rgba(37,188,189,0.2);
          border-radius: var(--radius-md); padding: 20px;
          display: flex; align-items: center; gap: 16px;
        }
        .ms-become__icon { color: var(--teal); flex-shrink: 0; }
        .ms-become__info { flex: 1; }
        .ms-become__title { font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 3px; }
        .ms-become__desc { font-size: 13px; color: #6b7280; }
        .ms-become__btn {
          background: var(--teal); color: white;
          padding: 8px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 700;
          white-space: nowrap; flex-shrink: 0; transition: all 0.15s;
        }
        .ms-become__btn:hover {
          background: rgba(37,188,189,0.85);
          box-shadow: 0 4px 16px rgba(37,188,189,0.25);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ms-layout { grid-template-columns: 1fr; gap: 48px; }
          .ms-hero__title { font-size: clamp(36px, 8vw, 56px); }
        }
      `}</style>
    </div>
  );
}

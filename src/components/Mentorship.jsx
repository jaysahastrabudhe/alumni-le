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
    <section className="mentorship section" style={{ background: 'var(--navy)' }}>
      <div className="container">
        <div className="mentorship__layout">
          <div className="mentorship__left">
            <span className="section-label">Alumni Mentors</span>
            <h2 className="mentorship__title">
              Learn from someone who <em>did</em> it.
            </h2>
            <p className="mentorship__desc">
              Not a professor. Not a panel. An actual LE alumnus who's been where you are —
              and went further. Book 1:1 sessions, get feedback on your build, or just have the conversation.
            </p>

            <ul className="mentorship__benefits">
              {[
                '1:1 sessions with vetted alumni mentors',
                'Match by track, industry, or challenge',
                'Monthly group sessions open to all',
                'Free for current students & alumni',
              ].map(b => (
                <li key={b} className="mentorship__benefit">
                  <CheckCircle size={16} className="mentorship__benefit-icon" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mentorship__areas">
              <p className="mentorship__areas-label">Areas of mentorship</p>
              <div className="mentorship__area-tags">
                {areas.map(a => (
                  <span key={a} className="mentorship__area-tag">{a}</span>
                ))}
              </div>
            </div>

            <button className="btn-teal mentorship__cta">
              Request a Mentor <ArrowRight size={16} />
            </button>
          </div>

          <div className="mentorship__right">
            <div className="mentorship__cards">
              {mentors.map(mentor => (
                <div key={mentor.id} className="mentor-card">
                  <div className="mentor-card__top">
                    <div
                      className="mentor-card__avatar"
                      style={{ background: `linear-gradient(135deg, ${mentor.color}, ${mentor.color}99)` }}
                    >
                      {mentor.avatar}
                    </div>
                    <div>
                      <p className="mentor-card__name">{mentor.name}</p>
                      <p className="mentor-card__role">{mentor.role}, {mentor.company}</p>
                      <p className="mentor-card__batch">Batch '{mentor.batch.slice(2)} · {mentor.specialization}</p>
                    </div>
                  </div>
                  <p className="mentor-card__bio">{mentor.bio}</p>
                  <div className="mentor-card__tags">
                    {mentor.tags.slice(0, 2).map(t => (
                      <span key={t} className="mentor-card__tag">{t}</span>
                    ))}
                  </div>
                  <button className="mentor-card__btn">
                    <MessageCircle size={14} /> Book Session
                  </button>
                </div>
              ))}
            </div>

            <div className="mentorship__become">
              <Target size={20} />
              <div>
                <p className="mentorship__become-title">Become a Mentor</p>
                <p className="mentorship__become-desc">Alumni can give back by offering 2 sessions/month.</p>
              </div>
              <button className="mentorship__become-btn">Apply</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mentorship__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .mentorship__title {
          font-size: 40px;
          font-weight: 900;
          color: white;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .mentorship__title em {
          color: var(--teal);
          font-style: normal;
        }
        .mentorship__desc {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
          margin-bottom: 32px;
        }
        .mentorship__benefits {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .mentorship__benefit {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }
        .mentorship__benefit-icon {
          color: var(--teal);
          flex-shrink: 0;
        }
        .mentorship__areas {
          margin-bottom: 32px;
        }
        .mentorship__areas-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }
        .mentorship__area-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .mentorship__area-tag {
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.15s;
          cursor: pointer;
        }
        .mentorship__area-tag:hover {
          background: var(--teal-light);
          color: var(--teal);
          border-color: var(--teal);
        }
        .mentorship__cta { margin-top: 8px; }
        .mentorship__cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 16px;
        }
        .mentor-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          padding: 20px;
          transition: all 0.2s;
        }
        .mentor-card:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(37,188,189,0.3);
        }
        .mentor-card__top {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 12px;
        }
        .mentor-card__avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }
        .mentor-card__name {
          font-size: 15px;
          font-weight: 700;
          color: white;
        }
        .mentor-card__role {
          font-size: 13px;
          color: var(--teal);
          font-weight: 500;
        }
        .mentor-card__batch {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }
        .mentor-card__bio {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,0.55);
          margin-bottom: 12px;
        }
        .mentor-card__tags {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
        }
        .mentor-card__tag {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
        }
        .mentor-card__btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          color: var(--teal);
          background: var(--teal-light);
          border-radius: 8px;
          transition: all 0.15s;
        }
        .mentor-card__btn:hover {
          background: var(--teal);
          color: white;
        }
        .mentorship__become {
          background: rgba(37,188,189,0.1);
          border: 1px solid rgba(37,188,189,0.25);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--teal);
        }
        .mentorship__become > svg { flex-shrink: 0; }
        .mentorship__become > div { flex: 1; }
        .mentorship__become-title {
          font-size: 15px;
          font-weight: 700;
          color: white;
        }
        .mentorship__become-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        .mentorship__become-btn {
          background: var(--teal);
          color: white;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .mentorship__become-btn:hover {
          background: rgba(37,188,189,0.8);
        }
        @media (max-width: 900px) {
          .mentorship__layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .mentorship__title { font-size: 30px; }
        }
      `}</style>
    </section>
  );
}

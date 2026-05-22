import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { eventsData } from '../data/events';

function EventCard({ event, index }) {
  const pct = Math.round((event.attendees / event.capacity) * 100);
  const almostFull = pct >= 80;

  return (
    <div className="ev-card" style={{ animationDelay: `${0.05 + index * 0.08}s` }}>
      {/* top accent line in event color */}
      <div className="ev-card__accent" style={{ background: event.color }} />

      <div className="ev-card__head">
        <div className="ev-card__type-row">
          <span className="ev-card__type-tag">{event.type}</span>
          {almostFull && (
            <span className="ev-card__full-tag">Almost Full</span>
          )}
        </div>
        <h3 className="ev-card__title">{event.title}</h3>
        <p className="ev-card__desc">{event.description}</p>
      </div>

      <div className="ev-card__details">
        <div className="ev-card__detail">
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
        <div className="ev-card__detail">
          <Clock size={14} />
          <span>{event.time}</span>
        </div>
        <div className="ev-card__detail">
          <MapPin size={14} />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="ev-card__attendance">
        <div className="ev-card__bar">
          <div
            className="ev-card__bar-fill"
            style={{ width: `${pct}%`, background: event.color }}
          />
        </div>
        <span className="ev-card__attendance-text">
          <Users size={12} /> {event.attendees} / {event.capacity} attending
        </span>
      </div>

      <div className="ev-card__tags">
        {event.tags.map(t => <span key={t} className="ev-card__tag">{t}</span>)}
      </div>

      <button className="ev-card__cta">
        Register Now <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default function Events() {
  return (
    <div className="ev-page">
      {/* ── Page Header ── */}
      <div className="ev-hero">
        <div className="ev-hero__grid" aria-hidden="true" />
        <div className="container ev-hero__inner">
          <div className="ev-hero__eyebrow">
            <span className="ev-hero__dash" />
            <span>What's On</span>
          </div>
          <h1 className="ev-hero__title">
            Alumni <em className="ev-hero__accent">Events.</em>
          </h1>
          <p className="ev-hero__sub">
            Founder mixers, keynotes, and signature LE events —<br />
            stay in the room where it happens.
          </p>
        </div>
      </div>

      {/* ── Events Grid ── */}
      <div className="ev-body">
        <div className="container">
          <div className="ev-grid">
            {eventsData.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          <div className="ev-bottom-cta">
            <div className="ev-bottom-cta__content">
              <p className="ev-bottom-cta__label">
                <span className="ev-bottom-cta__dash" />
                Have an idea?
              </p>
              <h3 className="ev-bottom-cta__text">
                Propose an event for the community.
              </h3>
            </div>
            <button className="ev-propose-btn">
              Propose an Event <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Page ── */
        .ev-page {
          background: #ffffff;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .ev-hero {
          position: relative;
          padding: 80px 0 64px;
          overflow: hidden;
          background: linear-gradient(160deg, #f0effe 0%, #fafafe 100%);
          border-bottom: 1px solid #e5e7eb;
        }
        .ev-hero__grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(22,14,68,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ev-hero__inner { position: relative; z-index: 1; }
        .ev-hero__eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 20px;
        }
        .ev-hero__dash {
          display: inline-block; width: 28px; height: 1px;
          background: var(--teal); flex-shrink: 0;
        }
        .ev-hero__title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900; color: var(--navy);
          letter-spacing: -0.04em; line-height: 1;
          margin-bottom: 16px;
        }
        .ev-hero__accent { font-style: italic; color: var(--teal); }
        .ev-hero__sub {
          font-size: clamp(15px, 1.4vw, 17px);
          color: #6b7280; line-height: 1.7;
        }

        /* ── Body ── */
        .ev-body { padding: 48px 0 96px; }

        /* ── Grid ── */
        .ev-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 64px;
        }

        /* ── Event Card ── */
        .ev-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: var(--radius-md);
          padding: 28px;
          position: relative; overflow: hidden;
          transition: all 0.22s var(--ease);
          display: flex; flex-direction: column; gap: 16px;
          animation: fadeUp 0.55s var(--ease) both;
        }
        .ev-card:hover {
          border-color: rgba(37,188,189,0.45);
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(37,188,189,0.1);
        }
        .ev-card__accent {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px; opacity: 1;
        }
        .ev-card__head { display: flex; flex-direction: column; gap: 8px; }
        .ev-card__type-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .ev-card__type-tag {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 700;
          background: rgba(54,99,173,0.08); color: var(--blue);
          border: 1px solid rgba(54,99,173,0.2);
        }
        .ev-card__full-tag {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 700;
          background: rgba(239,68,68,0.07); color: #dc2626;
          border: 1px solid rgba(239,68,68,0.18);
        }
        .ev-card__title {
          font-size: 20px; font-weight: 900;
          color: var(--navy); line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .ev-card__desc {
          font-size: 14px; line-height: 1.65; color: #6b7280;
        }
        .ev-card__details { display: flex; flex-direction: column; gap: 9px; }
        .ev-card__detail {
          display: flex; align-items: center; gap: 9px;
          font-size: 13px; color: #6b7280;
        }
        .ev-card__detail svg { color: var(--teal); flex-shrink: 0; }
        .ev-card__attendance { display: flex; flex-direction: column; gap: 7px; }
        .ev-card__bar {
          height: 3px; background: #f3f4f6;
          border-radius: 100px; overflow: hidden;
        }
        .ev-card__bar-fill {
          height: 100%; border-radius: 100px;
          transition: width 0.5s ease;
        }
        .ev-card__attendance-text {
          font-size: 12px; color: #9ca3af;
          display: flex; align-items: center; gap: 5px;
        }
        .ev-card__tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .ev-card__tag {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
        }
        .ev-card__cta {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; width: 100%;
          padding: 13px 24px;
          font-size: 14px; font-weight: 700;
          background: var(--teal); color: white;
          border-radius: var(--radius-sm);
          margin-top: auto;
          transition: all 0.2s var(--ease);
        }
        .ev-card__cta:hover {
          background: rgba(37,188,189,0.85);
          box-shadow: 0 8px 32px rgba(37,188,189,0.3);
          transform: translateY(-1px);
        }

        /* ── Bottom CTA ── */
        .ev-bottom-cta {
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: var(--radius-lg);
          padding: 36px 40px;
          flex-wrap: wrap;
        }
        .ev-bottom-cta__content { display: flex; flex-direction: column; gap: 8px; }
        .ev-bottom-cta__label {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--teal);
        }
        .ev-bottom-cta__dash {
          display: inline-block; width: 24px; height: 1px;
          background: var(--teal);
        }
        .ev-bottom-cta__text {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 800; color: var(--navy); letter-spacing: -0.02em;
        }
        .ev-propose-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 16px 32px;
          font-size: 15px; font-weight: 700;
          color: var(--navy);
          background: white;
          border: 1px solid #d1d5db;
          border-radius: var(--radius-sm);
          transition: all 0.2s var(--ease);
          white-space: nowrap; flex-shrink: 0;
        }
        .ev-propose-btn:hover {
          border-color: var(--teal); color: var(--teal);
          background: rgba(37,188,189,0.06);
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .ev-grid { grid-template-columns: 1fr; }
          .ev-bottom-cta { padding: 28px 24px; }
          .ev-propose-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}

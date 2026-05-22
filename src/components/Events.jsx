import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { eventsData } from '../data/events';

function EventCard({ event }) {
  const pct = Math.round((event.attendees / event.capacity) * 100);
  const almostFull = pct >= 80;

  return (
    <div className="event-card">
      <div className="event-card__accent" style={{ background: event.color }} />

      <div className="event-card__head">
        <div className="event-card__type-row">
          <span className="tag tag-blue">{event.type}</span>
          {almostFull && <span className="tag" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Almost Full</span>}
        </div>
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__desc">{event.description}</p>
      </div>

      <div className="event-card__details">
        <div className="event-card__detail">
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
        <div className="event-card__detail">
          <Clock size={14} />
          <span>{event.time}</span>
        </div>
        <div className="event-card__detail">
          <MapPin size={14} />
          <span>{event.location}</span>
        </div>
      </div>

      <div className="event-card__attendance">
        <div className="event-card__attendance-bar">
          <div
            className="event-card__attendance-fill"
            style={{ width: `${pct}%`, background: event.color }}
          />
        </div>
        <span className="event-card__attendance-text">
          <Users size={12} /> {event.attendees} / {event.capacity} attending
        </span>
      </div>

      <div className="event-card__tags">
        {event.tags.map(t => <span key={t} className="tag tag-navy">{t}</span>)}
      </div>

      <button className="btn-primary event-card__cta" style={{ width: '100%', justifyContent: 'center' }}>
        Register Now <ArrowRight size={15} />
      </button>

      <style>{`
        .event-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.2s var(--ease);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .event-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .event-card__accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }
        .event-card__head {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .event-card__type-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .event-card__title {
          font-size: 20px;
          font-weight: 800;
          color: var(--navy);
          line-height: 1.3;
        }
        .event-card__desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-muted);
        }
        .event-card__details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .event-card__detail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
        }
        .event-card__detail svg { color: var(--blue); flex-shrink: 0; }
        .event-card__attendance {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .event-card__attendance-bar {
          height: 4px;
          background: var(--bg);
          border-radius: 100px;
          overflow: hidden;
        }
        .event-card__attendance-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 0.5s ease;
        }
        .event-card__attendance-text {
          font-size: 12px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .event-card__tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .event-card__cta {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
}

export default function Events() {
  return (
    <section className="events section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">What's On</span>
          <h2 className="section-title">Alumni Events</h2>
          <p className="section-desc">
            From founder mixers to signature LE events — stay in the room where it happens.
          </p>
        </div>

        <div className="events__grid">
          {eventsData.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="events__cta">
          <p>Have an event idea for the alumni community?</p>
          <button className="btn-secondary">Propose an Event <ArrowRight size={15} /></button>
        </div>
      </div>

      <style>{`
        .events__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }
        .events__cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
          font-size: 15px;
        }
        @media (max-width: 600px) {
          .events__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

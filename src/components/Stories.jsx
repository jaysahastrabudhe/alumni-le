import { ArrowRight, Quote } from 'lucide-react';
import { alumniData } from '../data/alumni';

const quotes = [
  {
    id: 1,
    text: "LE didn't teach me what to do. It put me in situations where I had to figure it out. That's the whole game.",
    name: "Aryan Mehta",
    role: "Founder, GreenStack",
    batch: "2021",
    color: "#3663AD",
  },
  {
    id: 2,
    text: "I joined Swiggy not because I had a degree — because I had evidence. My LE portfolio was my resume.",
    name: "Priya Sharma",
    role: "Strategy Lead, Swiggy",
    batch: "2022",
    color: "#25BCBD",
  },
  {
    id: 3,
    text: "The most valuable thing LE gave me was a network of people who actually do things — not just talk about doing them.",
    name: "Ananya Iyer",
    role: "Founder, Karo Studio",
    batch: "2023",
    color: "#160E44",
  },
];

export default function Stories() {
  const featured = alumniData.filter(a => a.featured).slice(0, 3);

  return (
    <section className="stories section" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Alumni Stories</span>
          <h2 className="section-title">Proof, not promise.</h2>
          <p className="section-desc">
            Every LE alumnus has a body of work — not just a degree. Here are a few.
          </p>
        </div>

        <div className="stories__quotes">
          {quotes.map(q => (
            <div key={q.id} className="story-quote">
              <div className="story-quote__icon" style={{ color: q.color }}>
                <Quote size={28} />
              </div>
              <p className="story-quote__text">{q.text}</p>
              <div className="story-quote__author">
                <div className="story-quote__avatar" style={{ background: q.color }}>
                  {q.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="story-quote__name">{q.name}</p>
                  <p className="story-quote__role">{q.role} · Batch '{q.batch.slice(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="stories__cta">
          <button className="btn-primary">
            Read All Stories <ArrowRight size={15} />
          </button>
          <p className="stories__cta-sub">Your story deserves to be here too.</p>
        </div>
      </div>

      <style>{`
        .stories__quotes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 56px;
        }
        .story-quote {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.2s;
        }
        .story-quote:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .story-quote__icon { opacity: 0.4; }
        .story-quote__text {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-primary);
          font-weight: 500;
          flex: 1;
        }
        .story-quote__author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .story-quote__avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }
        .story-quote__name {
          font-size: 14px;
          font-weight: 700;
          color: var(--navy);
        }
        .story-quote__role {
          font-size: 12px;
          color: var(--text-muted);
        }
        .stories__cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .stories__cta-sub {
          font-size: 14px;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .stories__quotes { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

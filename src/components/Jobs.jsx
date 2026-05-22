import { MapPin, Clock, Briefcase, Zap, ArrowRight, Plus } from 'lucide-react';
import { jobsData } from '../data/events';

function JobCard({ job, index }) {
  return (
    <div className="job-card" style={{ animationDelay: `${0.05 + index * 0.07}s` }}>
      <div className="job-card__head">
        <div className="job-card__top">
          <div>
            <h3 className="job-card__title">{job.title}</h3>
            <p className="job-card__company">{job.company}</p>
          </div>
          <div className="job-card__badges">
            <span className={`job-card__badge ${job.type === 'Internship' ? 'job-card__badge--gray' : 'job-card__badge--blue'}`}>
              {job.type}
            </span>
            {job.equity && (
              <span className="job-card__badge job-card__badge--green">
                <Zap size={10} /> Equity
              </span>
            )}
          </div>
        </div>
        <p className="job-card__posted-by">Posted by {job.postedBy}</p>
      </div>

      <p className="job-card__desc">{job.description}</p>

      <div className="job-card__details">
        <span className="job-card__detail">
          <MapPin size={13} /> {job.location}
        </span>
        <span className="job-card__detail">
          <Clock size={13} /> {job.posted}
        </span>
      </div>

      <div className="job-card__skills">
        {job.skills.map(s => <span key={s} className="job-card__skill">{s}</span>)}
      </div>

      <button className="job-card__apply">
        Apply Now <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default function Jobs() {
  return (
    <div className="jobs-page">
      {/* ── Page Header ── */}
      <div className="jobs-hero">
        <div className="jobs-hero__grid" aria-hidden="true" />
        <div className="container jobs-hero__inner">
          <div className="jobs-hero__eyebrow">
            <span className="jobs-hero__dash" />
            <span>Opportunities</span>
          </div>
          <h1 className="jobs-hero__title">
            Jobs from the <em className="jobs-hero__accent">Network.</em>
          </h1>
          <p className="jobs-hero__sub">
            Roles posted by alumni — for alumni and current students.
            Built-in trust, no cold applications.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="jobs-body">
        <div className="container">
          <div className="jobs-layout">
            {/* Main feed */}
            <div className="jobs-main">
              {jobsData.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>

            {/* Sidebar */}
            <aside className="jobs-sidebar">
              {/* Post card */}
              <div className="jobs-post-card">
                <div className="jobs-post-card__icon">
                  <Plus size={22} />
                </div>
                <h3 className="jobs-post-card__title">Post a Role</h3>
                <p className="jobs-post-card__desc">
                  Hiring? Alumni get first access to post roles — and to apply.
                </p>
                <button className="jobs-post-card__btn">
                  Post a Job <ArrowRight size={15} />
                </button>
              </div>

              {/* Tip card */}
              <div className="jobs-tip-card">
                <div className="jobs-tip-card__label">
                  <span className="jobs-tip-dash" />
                  Pro Tip
                </div>
                <p className="jobs-tip-card__text">
                  Jobs from LE alumni come with a warm intro — message the poster
                  directly and reference your batch to break the ice.
                </p>
              </div>

              {/* Stats mini */}
              <div className="jobs-stats-card">
                <div className="jobs-stat">
                  <span className="jobs-stat__num">12</span>
                  <span className="jobs-stat__label">Open roles</span>
                </div>
                <div className="jobs-stat-div" />
                <div className="jobs-stat">
                  <span className="jobs-stat__num">86%</span>
                  <span className="jobs-stat__label">Response rate</span>
                </div>
                <div className="jobs-stat-div" />
                <div className="jobs-stat">
                  <span className="jobs-stat__num">48h</span>
                  <span className="jobs-stat__label">Avg reply time</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Page ── */
        .jobs-page {
          background: #ffffff;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .jobs-hero {
          position: relative;
          padding: 80px 0 64px;
          overflow: hidden;
          background: linear-gradient(160deg, #f0effe 0%, #fafafe 100%);
          border-bottom: 1px solid #e5e7eb;
        }
        .jobs-hero__grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(22,14,68,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .jobs-hero__inner { position: relative; z-index: 1; }
        .jobs-hero__eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal); margin-bottom: 20px;
        }
        .jobs-hero__dash {
          display: inline-block; width: 28px; height: 1px;
          background: var(--teal); flex-shrink: 0;
        }
        .jobs-hero__title {
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 900; color: var(--navy);
          letter-spacing: -0.04em; line-height: 1.05;
          margin-bottom: 16px;
        }
        .jobs-hero__accent { font-style: italic; color: var(--teal); }
        .jobs-hero__sub {
          font-size: clamp(15px, 1.4vw, 17px);
          color: #6b7280; line-height: 1.7; max-width: 520px;
        }

        /* ── Body ── */
        .jobs-body { padding: 48px 0 96px; }

        /* ── Layout ── */
        .jobs-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px; align-items: start;
        }
        .jobs-main { display: flex; flex-direction: column; gap: 16px; }

        /* ── Job Card ── */
        .job-card {
          background: #ffffff; border: 1px solid #e5e7eb;
          border-radius: var(--radius-md); padding: 28px;
          display: flex; flex-direction: column; gap: 14px;
          transition: all 0.22s var(--ease);
          animation: fadeUp 0.5s var(--ease) both;
        }
        .job-card:hover {
          border-color: rgba(37,188,189,0.45);
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(37,188,189,0.08);
        }
        .job-card__head { display: flex; flex-direction: column; gap: 4px; }
        .job-card__top {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 12px;
        }
        .job-card__title {
          font-size: 19px; font-weight: 800; color: var(--navy);
          letter-spacing: -0.02em; margin-bottom: 3px;
        }
        .job-card__company {
          font-size: 14px; font-weight: 600; color: var(--teal);
        }
        .job-card__badges {
          display: flex; gap: 6px; flex-shrink: 0;
          flex-wrap: wrap; justify-content: flex-end;
        }
        .job-card__badge {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; gap: 4px;
        }
        .job-card__badge--blue {
          background: rgba(54,99,173,0.08); color: var(--blue);
          border: 1px solid rgba(54,99,173,0.2);
        }
        .job-card__badge--gray {
          background: #f3f4f6; color: #374151;
          border: 1px solid #e5e7eb;
        }
        .job-card__badge--green {
          background: rgba(16,185,129,0.08); color: #059669;
          border: 1px solid rgba(16,185,129,0.2);
        }
        .job-card__posted-by {
          font-size: 12px; color: #9ca3af; font-style: italic;
        }
        .job-card__desc {
          font-size: 14px; line-height: 1.65; color: #6b7280;
        }
        .job-card__details { display: flex; gap: 16px; flex-wrap: wrap; }
        .job-card__detail {
          display: flex; align-items: center; gap: 5px;
          font-size: 13px; color: #9ca3af;
        }
        .job-card__detail svg { color: var(--teal); flex-shrink: 0; }
        .job-card__skills { display: flex; gap: 6px; flex-wrap: wrap; }
        .job-card__skill {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
        }
        .job-card__apply {
          display: flex; align-items: center; gap: 8px;
          align-self: flex-start; padding: 10px 22px;
          font-size: 14px; font-weight: 700;
          background: var(--teal); color: white;
          border-radius: var(--radius-sm);
          transition: all 0.2s var(--ease);
        }
        .job-card__apply:hover {
          background: rgba(37,188,189,0.85);
          box-shadow: 0 8px 28px rgba(37,188,189,0.3);
          transform: translateY(-1px);
        }

        /* ── Sidebar ── */
        .jobs-sidebar {
          display: flex; flex-direction: column; gap: 16px;
          position: sticky; top: 90px;
        }

        /* Post card */
        .jobs-post-card {
          background: linear-gradient(135deg, #eef2ff 0%, #f0effe 100%);
          border: 1px solid rgba(54,99,173,0.2);
          border-radius: var(--radius-md); padding: 28px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .jobs-post-card__icon {
          width: 48px; height: 48px;
          background: white; border: 1px solid #e5e7eb;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: var(--navy);
        }
        .jobs-post-card__title {
          font-size: 19px; font-weight: 800; color: var(--navy);
        }
        .jobs-post-card__desc {
          font-size: 14px; line-height: 1.6; color: #6b7280;
        }
        .jobs-post-card__btn {
          display: flex; align-items: center; gap: 8px; justify-content: center;
          padding: 13px 24px; font-size: 14px; font-weight: 700;
          background: var(--navy); color: white;
          border-radius: var(--radius-sm); transition: all 0.2s;
        }
        .jobs-post-card__btn:hover {
          background: var(--teal);
          box-shadow: 0 8px 28px rgba(37,188,189,0.3);
        }

        /* Tip card */
        .jobs-tip-card {
          background: rgba(37,188,189,0.06);
          border: 1px solid rgba(37,188,189,0.2);
          border-radius: var(--radius-md); padding: 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .jobs-tip-card__label {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--teal);
        }
        .jobs-tip-dash {
          display: inline-block; width: 20px; height: 1px;
          background: var(--teal); flex-shrink: 0;
        }
        .jobs-tip-card__text {
          font-size: 13px; line-height: 1.65; color: #6b7280;
        }

        /* Stats mini */
        .jobs-stats-card {
          background: #f9fafb; border: 1px solid #e5e7eb;
          border-radius: var(--radius-md); padding: 20px;
          display: flex; align-items: center; gap: 16px;
        }
        .jobs-stat {
          flex: 1; text-align: center;
          display: flex; flex-direction: column; gap: 4px;
        }
        .jobs-stat__num {
          font-size: 22px; font-weight: 900; color: var(--navy);
          letter-spacing: -0.04em;
        }
        .jobs-stat__label {
          font-size: 11px; color: #9ca3af; font-weight: 500;
        }
        .jobs-stat-div {
          width: 1px; height: 32px; background: #e5e7eb;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .jobs-layout { grid-template-columns: 1fr; }
          .jobs-sidebar {
            position: static;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

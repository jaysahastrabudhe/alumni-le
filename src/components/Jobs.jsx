import { MapPin, Clock, Briefcase, Zap, ArrowRight, Plus } from 'lucide-react';
import { jobsData } from '../data/events';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-card__head">
        <div className="job-card__top">
          <div>
            <h3 className="job-card__title">{job.title}</h3>
            <p className="job-card__company">{job.company}</p>
          </div>
          <div className="job-card__badges">
            <span className={`tag ${job.type === 'Internship' ? 'tag-navy' : 'tag-blue'}`}>{job.type}</span>
            {job.equity && (
              <span className="tag" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>
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
        {job.skills.map(s => <span key={s} className="tag tag-navy">{s}</span>)}
      </div>

      <button className="btn-primary job-card__apply">
        Apply Now <ArrowRight size={15} />
      </button>

      <style>{`
        .job-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          transition: all 0.2s var(--ease);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .job-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          border-color: rgba(54,99,173,0.2);
        }
        .job-card__head { display: flex; flex-direction: column; gap: 4px; }
        .job-card__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .job-card__title {
          font-size: 18px;
          font-weight: 800;
          color: var(--navy);
          margin-bottom: 2px;
        }
        .job-card__company {
          font-size: 14px;
          font-weight: 600;
          color: var(--blue);
        }
        .job-card__badges {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .job-card__posted-by {
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }
        .job-card__desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-muted);
        }
        .job-card__details {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .job-card__detail {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: var(--text-muted);
        }
        .job-card__detail svg { color: var(--teal); }
        .job-card__skills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .job-card__apply {
          align-self: flex-start;
        }
      `}</style>
    </div>
  );
}

export default function Jobs() {
  return (
    <section className="jobs section" style={{ background: 'white' }}>
      <div className="container">
        <div className="jobs__layout">
          <div className="jobs__main">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
              <span className="section-label">Opportunities</span>
              <h2 className="section-title">Jobs from the Network</h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Roles posted by alumni — for alumni and current students. Built-in trust.
              </p>
            </div>

            <div className="jobs__grid">
              {jobsData.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          <div className="jobs__sidebar">
            <div className="jobs__post-card">
              <div className="jobs__post-icon">
                <Plus size={24} />
              </div>
              <h3>Post a Role</h3>
              <p>Hiring? Alumni get first access to post roles — and to apply.</p>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                Post a Job
              </button>
            </div>

            <div className="jobs__tip-card">
              <span className="section-label">Pro Tip</span>
              <p>
                Jobs from LE alumni come with a warm intro — message the poster directly.
                Reference your batch to break the ice.
              </p>
            </div>

            <div className="jobs__stats-card">
              <div className="jobs__stat">
                <span className="jobs__stat-num">12</span>
                <span className="jobs__stat-label">Open roles</span>
              </div>
              <div className="jobs__stat-divider" />
              <div className="jobs__stat">
                <span className="jobs__stat-num">86%</span>
                <span className="jobs__stat-label">Response rate</span>
              </div>
              <div className="jobs__stat-divider" />
              <div className="jobs__stat">
                <span className="jobs__stat-num">48h</span>
                <span className="jobs__stat-label">Avg reply time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .jobs__layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
          align-items: start;
        }
        .jobs__grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .jobs__sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 90px;
        }
        .jobs__post-card {
          background: var(--gradient-navy);
          border-radius: var(--radius-md);
          padding: 28px;
          color: white;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .jobs__post-card h3 {
          font-size: 20px;
          font-weight: 800;
        }
        .jobs__post-card p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.8;
        }
        .jobs__post-icon {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .jobs__post-card .btn-primary {
          background: white;
          color: var(--navy);
        }
        .jobs__post-card .btn-primary:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .jobs__tip-card {
          background: var(--teal-light);
          border: 1px solid rgba(37,188,189,0.2);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .jobs__tip-card p {
          font-size: 13px;
          line-height: 1.6;
          color: var(--navy);
        }
        .jobs__stats-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .jobs__stat {
          flex: 1;
          text-align: center;
        }
        .jobs__stat-num {
          display: block;
          font-size: 22px;
          font-weight: 900;
          color: var(--navy);
        }
        .jobs__stat-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .jobs__stat-divider {
          width: 1px;
          height: 32px;
          background: var(--border);
        }
        @media (max-width: 900px) {
          .jobs__layout {
            grid-template-columns: 1fr;
          }
          .jobs__sidebar {
            position: static;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>
    </section>
  );
}

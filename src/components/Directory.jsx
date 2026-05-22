import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, ExternalLink, Filter, RefreshCw } from 'lucide-react';
import { supabase, getAvatarProps } from '../supabaseClient';

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const BATCHES = ['All Batches', '2020', '2021', '2022', '2023', '2024', '2025'];
const SPECS = ['All Tracks', 'Venture Builder', 'Enterprise Leadership', 'Family Business'];

function AlumniCard({ alum }) {
  const { initials, color } = getAvatarProps(alum.full_name || 'A');
  const avatarColor = alum.avatar_color || color;

  return (
    <div className="alum-card">
      <div className="alum-card__header">
        <div className="alum-card__avatar" style={{ background: avatarColor }}>
          {initials}
        </div>
        <div className="alum-card__meta">
          <h3 className="alum-card__name">{alum.full_name}</h3>
          <p className="alum-card__role">{alum.role || 'LE Alumnus'}</p>
          <p className="alum-card__company">{alum.company || '—'}</p>
        </div>
      </div>

      {alum.bio && <p className="alum-card__bio">{alum.bio}</p>}

      {alum.tags?.length > 0 && (
        <div className="alum-card__tags">
          {alum.tags.map(t => <span key={t} className="tag tag-navy">{t}</span>)}
        </div>
      )}

      <div className="alum-card__footer">
        <div className="alum-card__details">
          {alum.location && (
            <span className="alum-card__detail"><MapPin size={12} /> {alum.location}</span>
          )}
          <span className="alum-card__detail">
            <Briefcase size={12} /> Batch '{(alum.batch || '').slice(2)}
          </span>
        </div>
        <div className="alum-card__actions">
          {alum.linkedin_url && (
            <a href={alum.linkedin_url} target="_blank" rel="noreferrer" className="alum-card__icon-btn" title="LinkedIn">
              <LinkedinIcon />
            </a>
          )}
          <button className="alum-card__connect-btn">Connect</button>
        </div>
      </div>

      <div className="alum-card__track">
        <span className="tag tag-blue">{alum.specialization}</span>
        {alum.manually_added && <span className="tag" style={{ background: 'rgba(37,188,189,0.1)', color: 'var(--teal)', fontSize: 11 }}>LE Verified</span>}
      </div>

      <style>{`
        .alum-card {
          background: white; border: 1px solid var(--border); border-radius: var(--radius-md);
          padding: 24px; transition: all 0.2s var(--ease); position: relative; overflow: hidden;
          display: flex; flex-direction: column; gap: 12px;
        }
        .alum-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--gradient); opacity: 0; transition: opacity 0.2s;
        }
        .alum-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); border-color: rgba(54,99,173,0.2); }
        .alum-card:hover::before { opacity: 1; }
        .alum-card__header { display: flex; align-items: center; gap: 16px; }
        .alum-card__avatar {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; color: white; flex-shrink: 0;
        }
        .alum-card__name { font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 2px; }
        .alum-card__role { font-size: 13px; font-weight: 600; color: var(--blue); margin-bottom: 1px; }
        .alum-card__company { font-size: 12px; color: var(--text-muted); }
        .alum-card__bio { font-size: 13px; line-height: 1.6; color: var(--text-muted); }
        .alum-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .alum-card__footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px; border-top: 1px solid var(--border); margin-top: auto;
        }
        .alum-card__details { display: flex; gap: 12px; flex-wrap: wrap; }
        .alum-card__detail { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-muted); }
        .alum-card__actions { display: flex; align-items: center; gap: 8px; }
        .alum-card__icon-btn {
          width: 32px; height: 32px; border-radius: 8px; background: var(--bg);
          border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
          color: var(--text-muted); transition: all 0.15s;
        }
        .alum-card__icon-btn:hover { color: var(--blue); border-color: var(--blue); background: var(--blue-light); }
        .alum-card__connect-btn {
          padding: 6px 16px; font-size: 13px; font-weight: 600; color: var(--blue);
          background: var(--blue-light); border-radius: 8px; transition: all 0.15s;
        }
        .alum-card__connect-btn:hover { background: var(--blue); color: white; }
        .alum-card__track { display: flex; gap: 6px; flex-wrap: wrap; }
      `}</style>
    </div>
  );
}

export default function Directory() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [batch, setBatch] = useState('All Batches');
  const [spec, setSpec] = useState('All Tracks');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from('alumni_profiles')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      setAlumni(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = alumni.filter(a => {
    const matchSearch = !search ||
      a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.company?.toLowerCase().includes(search.toLowerCase()) ||
      a.role?.toLowerCase().includes(search.toLowerCase()) ||
      a.location?.toLowerCase().includes(search.toLowerCase());
    const matchBatch = batch === 'All Batches' || a.batch === batch;
    const matchSpec = spec === 'All Tracks' || a.specialization === spec;
    return matchSearch && matchBatch && matchSpec;
  });

  return (
    <section className="directory section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Network</span>
          <h2 className="section-title">Find Your People</h2>
          <p className="section-desc">Builders, founders, operators — all LE made.</p>
        </div>

        <div className="directory__controls">
          <div className="directory__search">
            <Search size={16} className="directory__search-icon" />
            <input
              type="text"
              placeholder="Search by name, company, city…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="directory__search-input"
            />
          </div>
          <button
            className={`directory__filter-toggle ${showFilters ? 'directory__filter-toggle--active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={15} /> Filters
            {(batch !== 'All Batches' || spec !== 'All Tracks') && (
              <span className="directory__filter-badge">
                {[batch !== 'All Batches', spec !== 'All Tracks'].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="directory__filters">
            <div className="directory__filter-group">
              <label className="directory__filter-label">Batch</label>
              <div className="directory__filter-pills">
                {BATCHES.map(b => (
                  <button key={b} className={`directory__pill ${batch === b ? 'directory__pill--active' : ''}`} onClick={() => setBatch(b)}>{b}</button>
                ))}
              </div>
            </div>
            <div className="directory__filter-group">
              <label className="directory__filter-label">Track</label>
              <div className="directory__filter-pills">
                {SPECS.map(s => (
                  <button key={s} className={`directory__pill ${spec === s ? 'directory__pill--active' : ''}`} onClick={() => setSpec(s)}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="directory__count">
          {loading ? 'Loading alumni…' : <>Showing <strong>{filtered.length}</strong> approved alumni</>}
        </div>

        {loading ? (
          <div className="directory__loading">
            <RefreshCw size={24} className="directory__spin" />
            <p>Loading alumni from the network…</p>
          </div>
        ) : (
          <div className="directory__grid">
            {filtered.map(alum => <AlumniCard key={alum.id} alum={alum} />)}
            {filtered.length === 0 && !loading && (
              <div className="directory__empty">
                <p>{search || batch !== 'All Batches' || spec !== 'All Tracks'
                  ? 'No alumni match your filters.'
                  : 'No approved alumni yet. Check back soon!'}
                </p>
                {(search || batch !== 'All Batches' || spec !== 'All Tracks') && (
                  <button className="btn-secondary" onClick={() => { setSearch(''); setBatch('All Batches'); setSpec('All Tracks'); }}>
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .section { padding: 96px 0; }
        .section-header { text-align: center; margin-bottom: 48px; }
        .section-title { font-size: 40px; font-weight: 900; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 16px; }
        .section-desc { font-size: 17px; color: var(--text-muted); max-width: 520px; margin: 0 auto; line-height: 1.7; }
        .directory__controls { display: flex; gap: 12px; margin-bottom: 16px; }
        .directory__search { flex: 1; position: relative; }
        .directory__search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .directory__search-input {
          width: 100%; padding: 13px 16px 13px 44px; background: white;
          border: 1px solid var(--border); border-radius: var(--radius-sm);
          font-size: 15px; color: var(--text-primary); transition: border-color 0.15s;
        }
        .directory__search-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-light); }
        .directory__search-input::placeholder { color: var(--text-muted); }
        .directory__filter-toggle {
          display: flex; align-items: center; gap: 8px; padding: 0 20px;
          background: white; border: 1px solid var(--border); border-radius: var(--radius-sm);
          font-size: 14px; font-weight: 600; color: var(--text-primary); transition: all 0.15s; white-space: nowrap;
        }
        .directory__filter-toggle:hover, .directory__filter-toggle--active { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
        .directory__filter-badge {
          width: 18px; height: 18px; border-radius: 50%; background: var(--blue);
          color: white; font-size: 11px; display: flex; align-items: center; justify-content: center;
        }
        .directory__filters {
          background: white; border: 1px solid var(--border); border-radius: var(--radius-md);
          padding: 24px; margin-bottom: 16px; display: flex; gap: 32px; flex-wrap: wrap;
        }
        .directory__filter-group { flex: 1; min-width: 200px; }
        .directory__filter-label {
          display: block; font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;
        }
        .directory__filter-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .directory__pill {
          padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 500;
          background: var(--bg); border: 1px solid var(--border); color: var(--text-muted); transition: all 0.15s;
        }
        .directory__pill:hover { border-color: var(--blue); color: var(--blue); }
        .directory__pill--active { background: var(--blue); color: white; border-color: var(--blue); }
        .directory__count { font-size: 13px; color: var(--text-muted); margin-bottom: 24px; }
        .directory__count strong { color: var(--navy); }
        .directory__loading {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 80px; color: var(--text-muted);
        }
        .directory__spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .directory__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .directory__empty {
          grid-column: 1/-1; text-align: center; padding: 80px 24px; color: var(--text-muted);
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        @media (max-width: 600px) {
          .section-title { font-size: 30px; }
          .directory__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

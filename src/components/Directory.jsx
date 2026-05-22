import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, ExternalLink, Filter, RefreshCw, X } from 'lucide-react';
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

function AlumniCard({ alum, style }) {
  const { initials, color } = getAvatarProps(alum.full_name || 'A');
  const avatarColor = alum.avatar_color || color;

  return (
    <div className="alum-card" style={style}>
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
          {alum.tags.map(t => <span key={t} className="alum-card__tag">{t}</span>)}
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
        <span className="alum-card__spec-tag">{alum.specialization}</span>
        {alum.manually_added && <span className="alum-card__verified-tag">LE Verified</span>}
      </div>
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

  const activeFilterCount = [batch !== 'All Batches', spec !== 'All Tracks'].filter(Boolean).length;

  return (
    <div className="dir-page">
      {/* ── Page Header ── */}
      <div className="dir-hero">
        <div className="dir-hero__grid" aria-hidden="true" />
        <div className="container dir-hero__inner">
          <div className="dir-hero__eyebrow">
            <span className="dir-hero__dash" />
            <span>Our Network</span>
          </div>
          <h1 className="dir-hero__title">
            Find Your <em className="dir-hero__accent">People.</em>
          </h1>
          <p className="dir-hero__sub">
            400+ builders, founders, and operators — all LE made.
          </p>
        </div>
      </div>

      {/* ── Directory Content ── */}
      <div className="dir-body">
        <div className="container">
          {/* Search + Filters */}
          <div className="dir-controls">
            <div className="dir-search">
              <Search size={16} className="dir-search__icon" />
              <input
                type="text"
                placeholder="Search by name, company, city…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="dir-search__input"
              />
              {search && (
                <button className="dir-search__clear" onClick={() => setSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              className={`dir-filter-btn ${showFilters ? 'dir-filter-btn--active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="dir-filter-btn__badge">{activeFilterCount}</span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="dir-filters">
              <div className="dir-filter-group">
                <label className="dir-filter-label">Batch Year</label>
                <div className="dir-pills">
                  {BATCHES.map(b => (
                    <button
                      key={b}
                      className={`dir-pill ${batch === b ? 'dir-pill--active' : ''}`}
                      onClick={() => setBatch(b)}
                    >{b}</button>
                  ))}
                </div>
              </div>
              <div className="dir-filter-group">
                <label className="dir-filter-label">Track</label>
                <div className="dir-pills">
                  {SPECS.map(s => (
                    <button
                      key={s}
                      className={`dir-pill ${spec === s ? 'dir-pill--active' : ''}`}
                      onClick={() => setSpec(s)}
                    >{s}</button>
                  ))}
                </div>
              </div>
              {activeFilterCount > 0 && (
                <button
                  className="dir-clear-btn"
                  onClick={() => { setBatch('All Batches'); setSpec('All Tracks'); }}
                >
                  <X size={13} /> Clear filters
                </button>
              )}
            </div>
          )}

          <div className="dir-count">
            {loading
              ? 'Loading alumni…'
              : <><strong>{filtered.length}</strong> approved alumni</>
            }
          </div>

          {loading ? (
            <div className="dir-loading">
              <RefreshCw size={24} className="dir-spin" />
              <p>Loading alumni from the network…</p>
            </div>
          ) : (
            <div className="dir-grid">
              {filtered.map((alum, i) => (
                <AlumniCard
                  key={alum.id}
                  alum={alum}
                  style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}
                />
              ))}
              {filtered.length === 0 && !loading && (
                <div className="dir-empty">
                  <p>{search || batch !== 'All Batches' || spec !== 'All Tracks'
                    ? 'No alumni match your filters.'
                    : 'No approved alumni yet. Check back soon!'}
                  </p>
                  {activeFilterCount > 0 && (
                    <button className="dir-pill dir-pill--active" onClick={() => { setSearch(''); setBatch('All Batches'); setSpec('All Tracks'); }}>
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ── Page wrapper ── */
        .dir-page {
          background: #ffffff;
          min-height: 100vh;
        }

        /* ── Hero header ── */
        .dir-hero {
          position: relative;
          padding: 80px 0 64px;
          overflow: hidden;
          background: linear-gradient(160deg, #f0effe 0%, #fafafe 100%);
          border-bottom: 1px solid #e5e7eb;
        }
        .dir-hero__grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(22,14,68,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .dir-hero__inner { position: relative; z-index: 1; }
        .dir-hero__eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--teal);
          margin-bottom: 20px;
        }
        .dir-hero__dash {
          display: inline-block; width: 28px; height: 1px;
          background: var(--teal); flex-shrink: 0;
        }
        .dir-hero__title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900; color: var(--navy);
          letter-spacing: -0.04em; line-height: 1;
          margin-bottom: 16px;
        }
        .dir-hero__accent {
          font-style: italic; color: var(--teal);
        }
        .dir-hero__sub {
          font-size: clamp(15px, 1.4vw, 17px);
          color: #6b7280; line-height: 1.7; max-width: 480px;
        }

        /* ── Body section ── */
        .dir-body { padding: 48px 0 96px; }

        /* ── Controls ── */
        .dir-controls { display: flex; gap: 12px; margin-bottom: 16px; }
        .dir-search { flex: 1; position: relative; }
        .dir-search__icon {
          position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%); color: #9ca3af;
          pointer-events: none;
        }
        .dir-search__input {
          width: 100%;
          padding: 14px 44px 14px 46px;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: var(--radius-sm);
          font-size: 15px; color: var(--navy);
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .dir-search__input::placeholder { color: #9ca3af; }
        .dir-search__input:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(37,188,189,0.12);
          outline: none;
        }
        .dir-search__clear {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          color: #9ca3af; background: none; transition: color 0.15s;
        }
        .dir-search__clear:hover { color: #374151; }

        .dir-filter-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 0 20px;
          background: #ffffff; border: 1px solid #d1d5db;
          border-radius: var(--radius-sm);
          font-size: 14px; font-weight: 600; color: #374151;
          transition: all 0.18s; white-space: nowrap;
        }
        .dir-filter-btn:hover, .dir-filter-btn--active {
          border-color: var(--teal); color: var(--teal);
          background: rgba(37,188,189,0.06);
        }
        .dir-filter-btn__badge {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--teal); color: white;
          font-size: 11px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
        }

        /* ── Filters panel ── */
        .dir-filters {
          background: #f9fafb; border: 1px solid #e5e7eb;
          border-radius: var(--radius-md);
          padding: 24px; margin-bottom: 20px;
          display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start;
        }
        .dir-filter-group { flex: 1; min-width: 200px; }
        .dir-filter-label {
          display: block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #9ca3af; margin-bottom: 12px;
        }
        .dir-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .dir-pill {
          padding: 6px 16px; border-radius: 100px;
          font-size: 13px; font-weight: 500;
          background: white; border: 1px solid #d1d5db;
          color: #374151; transition: all 0.15s;
        }
        .dir-pill:hover { border-color: var(--teal); color: var(--teal); }
        .dir-pill--active {
          background: rgba(37,188,189,0.1);
          border-color: var(--teal); color: var(--teal); font-weight: 600;
        }
        .dir-clear-btn {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #9ca3af;
          background: none; padding: 6px 0; align-self: flex-end; transition: color 0.15s;
        }
        .dir-clear-btn:hover { color: #374151; }

        /* ── Count ── */
        .dir-count { font-size: 13px; color: #9ca3af; margin-bottom: 28px; }
        .dir-count strong { color: #374151; font-weight: 700; }

        /* ── Loading ── */
        .dir-loading {
          display: flex; flex-direction: column; align-items: center;
          gap: 16px; padding: 80px 24px; color: #9ca3af;
        }
        .dir-spin { animation: spin 1s linear infinite; color: var(--teal); }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Grid ── */
        .dir-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        /* ── Alumni Card ── */
        .alum-card {
          background: #ffffff; border: 1px solid #e5e7eb;
          border-radius: var(--radius-md); padding: 24px;
          transition: all 0.22s var(--ease);
          display: flex; flex-direction: column; gap: 14px;
          animation: fadeUp 0.5s var(--ease) both;
        }
        .alum-card:hover {
          border-color: rgba(37,188,189,0.45);
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px rgba(37,188,189,0.1);
        }
        .alum-card__header { display: flex; align-items: center; gap: 16px; }
        .alum-card__avatar {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; color: white; flex-shrink: 0;
        }
        .alum-card__name {
          font-size: 16px; font-weight: 800; color: var(--navy);
          margin-bottom: 2px; letter-spacing: -0.01em;
        }
        .alum-card__role { font-size: 13px; font-weight: 600; color: var(--teal); margin-bottom: 1px; }
        .alum-card__company { font-size: 12px; color: #9ca3af; }
        .alum-card__bio { font-size: 13px; line-height: 1.65; color: #6b7280; }
        .alum-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .alum-card__tag {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
        }
        .alum-card__footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px; border-top: 1px solid #f3f4f6; margin-top: auto;
        }
        .alum-card__details { display: flex; gap: 12px; flex-wrap: wrap; }
        .alum-card__detail {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; color: #9ca3af;
        }
        .alum-card__detail svg { color: var(--teal); flex-shrink: 0; }
        .alum-card__actions { display: flex; align-items: center; gap: 8px; }
        .alum-card__icon-btn {
          width: 32px; height: 32px; border-radius: 8px;
          background: #f9fafb; border: 1px solid #e5e7eb;
          display: flex; align-items: center; justify-content: center;
          color: #9ca3af; transition: all 0.15s;
        }
        .alum-card__icon-btn:hover {
          color: var(--teal); border-color: rgba(37,188,189,0.4);
          background: rgba(37,188,189,0.06);
        }
        .alum-card__connect-btn {
          padding: 6px 16px; font-size: 13px; font-weight: 600;
          color: var(--teal);
          background: rgba(37,188,189,0.08);
          border: 1px solid rgba(37,188,189,0.25);
          border-radius: 8px; transition: all 0.15s;
        }
        .alum-card__connect-btn:hover {
          background: var(--teal); color: white; border-color: var(--teal);
        }
        .alum-card__track { display: flex; gap: 6px; flex-wrap: wrap; }
        .alum-card__spec-tag {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: rgba(54,99,173,0.08); color: var(--blue);
          border: 1px solid rgba(54,99,173,0.2);
        }
        .alum-card__verified-tag {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: rgba(37,188,189,0.08); color: var(--teal);
          border: 1px solid rgba(37,188,189,0.2);
        }

        /* ── Empty ── */
        .dir-empty {
          grid-column: 1/-1; text-align: center;
          padding: 80px 24px; color: #9ca3af;
          display: flex; flex-direction: column;
          align-items: center; gap: 20px; font-size: 15px;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .dir-grid { grid-template-columns: 1fr; }
          .dir-filters { gap: 20px; }
        }
      `}</style>
    </div>
  );
}

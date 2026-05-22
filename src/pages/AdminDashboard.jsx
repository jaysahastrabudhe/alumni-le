import { useState, useEffect, useCallback } from 'react';
import {
  Users, Clock, CheckCircle, XCircle, Plus, Search,
  RefreshCw, Trash2, UserCheck, UserX, ChevronDown, AlertCircle, ArrowLeft
} from 'lucide-react';
import { supabase, getAvatarProps } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const BATCHES = ['2020', '2021', '2022', '2023', '2024', '2025'];
const SPECS = ['Venture Builder', 'Enterprise Leadership', 'Family Business'];
const COLORS = ['#3663AD', '#25BCBD', '#160E44', '#2563EB', '#0891B2'];

const TABS = [
  { id: 'pending', label: 'Pending', icon: Clock },
  { id: 'approved', label: 'Approved', icon: CheckCircle },
  { id: 'rejected', label: 'Rejected', icon: XCircle },
  { id: 'add', label: 'Add Manually', icon: Plus },
];

export default function AdminDashboard({ onBack }) {
  const { profile } = useAuth();
  const [tab, setTab] = useState('pending');
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAlumni = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('alumni_profiles')
      .select('*')
      .order('created_at', { ascending: false });
    const all = data || [];
    setAlumni(all);
    setCounts({
      pending: all.filter(a => a.status === 'pending').length,
      approved: all.filter(a => a.status === 'approved').length,
      rejected: all.filter(a => a.status === 'rejected').length,
    });
    setLoading(false);
  }, []);

  useEffect(() => { fetchAlumni(); }, [fetchAlumni]);

  async function updateStatus(id, status, reason = null) {
    setActionLoading(id);
    const update = { status };
    if (reason) update.rejection_reason = reason;
    const { error } = await supabase.from('alumni_profiles').update(update).eq('id', id);
    setActionLoading(null);
    if (error) { showToast(error.message, 'error'); return; }
    showToast(`Alumni ${status} successfully.`);
    fetchAlumni();
  }

  async function deleteAlumni(id) {
    if (!confirm('Delete this alumni profile permanently?')) return;
    setActionLoading(id);
    const { error } = await supabase.from('alumni_profiles').delete().eq('id', id);
    setActionLoading(null);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Profile deleted.');
    fetchAlumni();
  }

  const filtered = alumni.filter(a => {
    if (tab === 'add') return false;
    if (a.status !== tab) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return a.full_name?.toLowerCase().includes(q) ||
      a.company?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q);
  });

  return (
    <div className="admin-wrap">
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      <div className="admin-sidebar">
        <div className="admin-logo">
          <img src="/logo.png" alt="Let's Enterprise" />
          <span className="admin-badge">Admin</span>
        </div>

        <nav className="admin-nav">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`admin-nav-item ${tab === id ? 'admin-nav-item--active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon size={16} />
              {label}
              {id !== 'add' && counts[id] > 0 && (
                <span className={`admin-nav-badge ${id === 'pending' ? 'admin-nav-badge--alert' : ''}`}>
                  {counts[id]}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-user-avatar" style={{ background: getAvatarProps(profile?.full_name || 'Admin').color }}>
              {getAvatarProps(profile?.full_name || 'Admin').initials}
            </div>
            <div>
              <p className="admin-user-name">{profile?.full_name || 'Admin'}</p>
              <p className="admin-user-role">Administrator</p>
            </div>
          </div>
          <button className="admin-back-btn" onClick={onBack}>
            <ArrowLeft size={14} /> Back to Site
          </button>
        </div>
      </div>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">
              {tab === 'add' ? 'Add Alumni Manually' : tab === 'pending' ? 'Pending Approvals' : tab === 'approved' ? 'Approved Alumni' : 'Rejected Profiles'}
            </h1>
            <p className="admin-subtitle">
              {tab === 'pending' && `${counts.pending} profile${counts.pending !== 1 ? 's' : ''} waiting for review`}
              {tab === 'approved' && `${counts.approved} active alumni in the directory`}
              {tab === 'rejected' && `${counts.rejected} rejected profiles`}
              {tab === 'add' && 'Add an alumni profile without requiring them to sign up'}
            </p>
          </div>
          {tab !== 'add' && (
            <button className="admin-refresh" onClick={fetchAlumni} disabled={loading}>
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
              Refresh
            </button>
          )}
        </div>

        {tab === 'add' ? (
          <AddManuallyForm onSuccess={() => { showToast('Alumni added and approved!'); fetchAlumni(); setTab('approved'); }} />
        ) : (
          <>
            <div className="admin-search-bar">
              <Search size={15} />
              <input
                placeholder="Search by name, company, email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="admin-loading">
                <RefreshCw size={24} className="spin" />
                <p>Loading…</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="admin-empty">
                <CheckCircle size={40} style={{ color: 'var(--teal)', opacity: 0.4 }} />
                <p>No {tab} profiles{search ? ' matching your search' : ''}.</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Alumni</th>
                      <th>Track & Batch</th>
                      <th>Company</th>
                      <th>Applied</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(a => (
                      <AdminRow
                        key={a.id}
                        alum={a}
                        tab={tab}
                        loading={actionLoading === a.id}
                        onApprove={() => updateStatus(a.id, 'approved')}
                        onReject={(reason) => updateStatus(a.id, 'rejected', reason)}
                        onDelete={() => deleteAlumni(a.id)}
                        onRestore={() => updateStatus(a.id, 'pending')}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      <style>{`
        .admin-wrap {
          display: flex;
          min-height: 100vh;
          background: #F1F5F9;
        }
        .admin-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 999;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: var(--shadow-lg);
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .admin-toast--success { background: #F0FDF4; color: #15803D; border: 1px solid #86EFAC; }
        .admin-toast--error { background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; }
        .admin-sidebar {
          width: 260px;
          flex-shrink: 0;
          background: var(--navy);
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: sticky;
          top: 0;
        }
        .admin-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 16px;
        }
        .admin-logo img {
          height: 26px;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }
        .admin-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: var(--teal);
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .admin-nav {
          flex: 1;
          padding: 0 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          background: none;
          transition: all 0.15s;
          text-align: left;
        }
        .admin-nav-item:hover { color: white; background: rgba(255,255,255,0.06); }
        .admin-nav-item--active { color: white; background: rgba(255,255,255,0.1); font-weight: 600; }
        .admin-nav-badge {
          margin-left: auto;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 100px;
          background: rgba(255,255,255,0.15);
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-nav-badge--alert { background: var(--teal); }
        .admin-sidebar-footer {
          padding: 20px 12px 0;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .admin-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 8px;
        }
        .admin-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }
        .admin-user-name { font-size: 13px; font-weight: 600; color: white; }
        .admin-user-role { font-size: 11px; color: rgba(255,255,255,0.4); }
        .admin-back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.15s;
        }
        .admin-back-btn:hover { color: white; border-color: rgba(255,255,255,0.25); }
        .admin-main {
          flex: 1;
          padding: 32px 40px;
          max-width: 1100px;
        }
        .admin-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .admin-title { font-size: 26px; font-weight: 900; color: var(--navy); margin-bottom: 4px; }
        .admin-subtitle { font-size: 14px; color: var(--text-muted); }
        .admin-refresh {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          transition: all 0.15s;
        }
        .admin-refresh:hover { color: var(--navy); border-color: var(--navy); }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .admin-search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 11px 16px;
          margin-bottom: 20px;
          color: var(--text-muted);
        }
        .admin-search-bar input {
          flex: 1;
          background: none;
          border: none;
          font-size: 14px;
          color: var(--text-primary);
        }
        .admin-loading, .admin-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 80px;
          color: var(--text-muted);
        }
        .admin-table-wrap {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          padding: 14px 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          background: #F8FAFC;
          border-bottom: 1px solid var(--border);
        }
        .admin-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #F1F5F9;
          vertical-align: middle;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: #FAFAFA; }
        @media (max-width: 900px) {
          .admin-wrap { flex-direction: column; }
          .admin-sidebar { width: 100%; min-height: auto; position: static; flex-direction: row; flex-wrap: wrap; padding: 16px; }
          .admin-nav { flex-direction: row; flex-wrap: wrap; }
          .admin-main { padding: 20px; }
        }
      `}</style>
    </div>
  );
}

function AdminRow({ alum, tab, loading, onApprove, onReject, onDelete, onRestore }) {
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState('');
  const { initials, color } = getAvatarProps(alum.full_name || 'A');

  return (
    <>
      <tr>
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: alum.avatar_color || color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 800, color: 'white', flexShrink: 0
            }}>
              {initials}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{alum.full_name}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{alum.email}</p>
              {alum.manually_added && <span style={{ fontSize: 10, background: 'var(--teal-light)', color: 'var(--teal)', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>Manual</span>}
            </div>
          </div>
        </td>
        <td>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)' }}>{alum.specialization}</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Batch '{(alum.batch || '').slice(2)}</p>
        </td>
        <td>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{alum.role || '—'}</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{alum.company || '—'}</p>
        </td>
        <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {new Date(alum.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </td>
        <td>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tab === 'pending' && (
              <>
                <button
                  disabled={loading}
                  onClick={onApprove}
                  style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', background:'rgba(16,185,129,0.1)', color:'#059669', borderRadius:7, fontSize:13, fontWeight:600, border:'1px solid rgba(16,185,129,0.2)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.background='rgba(16,185,129,0.2)'}
                  onMouseOut={e => e.currentTarget.style.background='rgba(16,185,129,0.1)'}
                >
                  <UserCheck size={13} /> Approve
                </button>
                <button
                  disabled={loading}
                  onClick={() => setShowReject(!showReject)}
                  style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', background:'rgba(239,68,68,0.08)', color:'#dc2626', borderRadius:7, fontSize:13, fontWeight:600, border:'1px solid rgba(239,68,68,0.15)', cursor:'pointer' }}
                >
                  <UserX size={13} /> Reject
                </button>
              </>
            )}
            {tab === 'approved' && (
              <button
                disabled={loading}
                onClick={() => setShowReject(!showReject)}
                style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', background:'rgba(239,68,68,0.08)', color:'#dc2626', borderRadius:7, fontSize:13, fontWeight:600, border:'1px solid rgba(239,68,68,0.15)', cursor:'pointer' }}
              >
                <UserX size={13} /> Revoke
              </button>
            )}
            {tab === 'rejected' && (
              <button
                disabled={loading}
                onClick={onRestore}
                style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', background:'var(--blue-light)', color:'var(--blue)', borderRadius:7, fontSize:13, fontWeight:600, border:'1px solid rgba(54,99,173,0.2)', cursor:'pointer' }}
              >
                <RefreshCw size={13} /> Restore
              </button>
            )}
            <button
              disabled={loading}
              onClick={onDelete}
              style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'#FEF2F2', color:'#DC2626', borderRadius:7, border:'1px solid #FECACA', cursor:'pointer' }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </td>
      </tr>
      {showReject && (
        <tr>
          <td colSpan={5} style={{ background: '#FEF9F9', padding: '12px 20px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Reason for rejection (optional)..."
                style={{ flex: 1, padding: '8px 12px', border: '1px solid #FECACA', borderRadius: 7, fontSize: 13, background: 'white' }}
              />
              <button
                onClick={() => { onReject(reason); setShowReject(false); }}
                style={{ padding: '8px 18px', background: '#DC2626', color: 'white', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
              >
                Confirm {tab === 'approved' ? 'Revoke' : 'Reject'}
              </button>
              <button onClick={() => setShowReject(false)} style={{ padding: '8px 14px', background: 'none', fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}>Cancel</button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function AddManuallyForm({ onSuccess }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    full_name: '', email: '', batch: '2024', specialization: 'Enterprise Leadership',
    role: '', company: '', location: '', bio: '', linkedin_url: '', tags: '',
    avatar_color: '#3663AD',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.full_name || !form.batch || !form.specialization) {
      setError('Name, Batch and Track are required.'); return;
    }
    setError('');
    setLoading(true);

    const { initials, color } = getAvatarProps(form.full_name);
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);

    const { error: err } = await supabase.from('alumni_profiles').insert({
      user_id: null,
      full_name: form.full_name,
      email: form.email || null,
      batch: form.batch,
      specialization: form.specialization,
      role: form.role,
      company: form.company,
      location: form.location,
      bio: form.bio,
      linkedin_url: form.linkedin_url,
      tags,
      avatar_color: form.avatar_color || color,
      status: 'approved',
      manually_added: true,
    });

    setLoading(false);
    if (err) { setError(err.message); return; }
    setForm({ full_name: '', email: '', batch: '2024', specialization: 'Enterprise Leadership', role: '', company: '', location: '', bio: '', linkedin_url: '', tags: '', avatar_color: '#3663AD' });
    onSuccess?.();
  }

  return (
    <div className="add-form-wrap">
      <form onSubmit={handleSubmit} className="add-form">
        {error && <div className="auth-error"><AlertCircle size={14} /> {error}</div>}

        <div className="add-form-section">
          <h3>Identity</h3>
          <div className="add-form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Aryan Mehta" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="aryan@example.com" />
            </div>
          </div>
        </div>

        <div className="add-form-section">
          <h3>Academic</h3>
          <div className="add-form-grid">
            <div className="form-group">
              <label>Batch *</label>
              <select value={form.batch} onChange={e => set('batch', e.target.value)}>
                {BATCHES.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Track *</label>
              <select value={form.specialization} onChange={e => set('specialization', e.target.value)}>
                {SPECS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="add-form-section">
          <h3>Professional</h3>
          <div className="add-form-grid">
            <div className="form-group">
              <label>Current Role</label>
              <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="Co-Founder" />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Inc." />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Pune, Maharashtra" />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input value={form.linkedin_url} onChange={e => set('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={3} placeholder="Brief background..." />
          </div>
          <div className="form-group">
            <label>Tags <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(comma-separated)</span></label>
            <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Founder, SaaS, ClimaTech" />
          </div>
        </div>

        <div className="add-form-section">
          <h3>Avatar Color</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            {COLORS.map(c => (
              <button
                key={c} type="button"
                onClick={() => set('avatar_color', c)}
                style={{
                  width: 32, height: 32, borderRadius: 8, background: c,
                  border: form.avatar_color === c ? '3px solid var(--navy)' : '3px solid transparent',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '13px 32px' }}>
            {loading ? 'Adding…' : 'Add & Approve Alumni'}
          </button>
        </div>
      </form>

      <style>{`
        .add-form-wrap {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 32px;
          max-width: 720px;
        }
        .add-form { display: flex; flex-direction: column; gap: 28px; }
        .add-form-section h3 {
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 16px;
        }
        .add-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 13px; font-weight: 600; color: var(--navy); }
        .form-group input, .form-group select, .form-group textarea {
          padding: 10px 14px; border: 1px solid var(--border); border-radius: 8px;
          font-size: 14px; color: var(--text-primary); background: white; width: 100%;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-light); outline: none;
        }
        .form-group textarea { resize: vertical; min-height: 80px; font-family: inherit; }
        .auth-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #dc2626;
        }
        @media (max-width: 600px) {
          .add-form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

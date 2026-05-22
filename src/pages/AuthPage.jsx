import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, getAvatarProps } from '../supabaseClient';

const BATCHES = ['2020', '2021', '2022', '2023', '2024', '2025'];
const SPECS = ['Venture Builder', 'Enterprise Leadership', 'Family Business'];
const STEPS = ['Account', 'Profile', 'Review'];

export default function AuthPage({ onSuccess, defaultTab = 'login' }) {
  const [tab, setTab] = useState(defaultTab);
  const { signIn, signUp } = useAuth();

  return (
    <div className="auth-page">
      {/* Subtle background grid */}
      <div className="auth-page__grid" aria-hidden="true" />

      <div className="auth-card">
        <div className="auth-logo">
          <img src="/logo.png" alt="Let's Enterprise" />
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => setTab('login')}
          >Sign In</button>
          <button
            className={`auth-tab ${tab === 'signup' ? 'auth-tab--active' : ''}`}
            onClick={() => setTab('signup')}
          >Join Network</button>
        </div>

        {tab === 'login'
          ? <LoginForm onSuccess={onSuccess} signIn={signIn} onSwitch={() => setTab('signup')} />
          : <SignupForm onSuccess={onSuccess} signUp={signUp} signIn={signIn} onSwitch={() => setTab('login')} />
        }
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #f0effe 0%, #fafafe 100%);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; position: relative; overflow: hidden;
        }
        .auth-page__grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(22,14,68,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .auth-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: var(--radius-lg);
          padding: 40px; width: 100%; max-width: 480px;
          position: relative; z-index: 1;
          box-shadow: 0 8px 40px rgba(22,14,68,0.1), 0 2px 8px rgba(0,0,0,0.06);
        }
        .auth-logo {
          display: flex; justify-content: center; margin-bottom: 32px;
        }
        .auth-logo img { height: 36px; }
        .auth-tabs {
          display: flex; background: #f3f4f6; border: 1px solid #e5e7eb;
          border-radius: var(--radius-sm); padding: 4px; margin-bottom: 32px;
        }
        .auth-tab {
          flex: 1; padding: 10px;
          font-size: 14px; font-weight: 600;
          border-radius: 6px; background: none;
          color: #9ca3af; transition: all 0.18s;
        }
        .auth-tab--active {
          background: white; color: var(--navy);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
}

function LoginForm({ onSuccess, signIn, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) { setError(err.message); return; }
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-form-title">Welcome back</h2>
      <p className="auth-form-sub">Sign in to access the alumni network.</p>

      {error && <div className="auth-error"><AlertCircle size={15} /> {error}</div>}

      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
      </div>

      <div className="form-group">
        <label>Password</label>
        <div className="input-with-icon">
          <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          <button type="button" className="input-icon-btn" onClick={() => setShowPw(!showPw)}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button type="submit" className="auth-submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign In'} <ArrowRight size={16} />
      </button>

      <p className="auth-switch">
        Not in the network yet?{' '}
        <button type="button" onClick={onSwitch}>Join now</button>
      </p>

      <FormStyles />
    </form>
  );
}

function SignupForm({ onSuccess, signUp, signIn, onSwitch }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    email: '', password: '', confirmPw: '',
    full_name: '', batch: '2024', specialization: 'Enterprise Leadership',
    role: '', company: '', location: '', bio: '', linkedin_url: '', tags: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit() {
    setError('');
    setLoading(true);

    const { data: authData, error: authErr } = await signUp(form.email, form.password);
    if (authErr) { setError(authErr.message); setLoading(false); return; }

    const user = authData.user;
    if (!user) { setError('Sign up succeeded but no user returned — check your email to confirm.'); setLoading(false); setDone(true); return; }

    const { initials, color } = getAvatarProps(form.full_name);
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);

    const { error: profileErr } = await supabase.from('alumni_profiles').insert({
      user_id: user.id,
      email: form.email,
      full_name: form.full_name,
      batch: form.batch,
      specialization: form.specialization,
      role: form.role,
      company: form.company,
      location: form.location,
      bio: form.bio,
      linkedin_url: form.linkedin_url,
      tags,
      avatar_color: color,
      status: 'pending',
    });

    setLoading(false);
    if (profileErr) { setError(profileErr.message); return; }
    setDone(true);
  }

  if (done) return <SuccessScreen email={form.email} />;

  return (
    <div className="signup-form">
      <div className="signup-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={`signup-step ${i === step ? 'signup-step--active' : ''} ${i < step ? 'signup-step--done' : ''}`}>
            <div className="signup-step-dot">{i < step ? <CheckCircle size={14} /> : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {error && <div className="auth-error"><AlertCircle size={15} /> {error}</div>}

      {step === 0 && (
        <Step0 form={form} set={set} onNext={() => {
          if (!form.email || !form.password) return setError('Fill all fields');
          if (form.password !== form.confirmPw) return setError('Passwords do not match');
          if (form.password.length < 6) return setError('Password must be 6+ characters');
          setError(''); setStep(1);
        }} onSwitch={onSwitch} />
      )}
      {step === 1 && (
        <Step1 form={form} set={set} onBack={() => setStep(0)} onNext={() => {
          if (!form.full_name || !form.batch) return setError('Fill required fields');
          setError(''); setStep(2);
        }} />
      )}
      {step === 2 && (
        <Step2 form={form} loading={loading} onBack={() => setStep(1)} onSubmit={handleSubmit} />
      )}

      <FormStyles />
    </div>
  );
}

function Step0({ form, set, onNext, onSwitch }) {
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="auth-form">
      <h2 className="auth-form-title">Create your account</h2>
      <p className="auth-form-sub">Step 1 of 3 — your login credentials</p>
      <div className="form-group">
        <label>Email *</label>
        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" required />
      </div>
      <div className="form-group">
        <label>Password *</label>
        <div className="input-with-icon">
          <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" />
          <button type="button" className="input-icon-btn" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>
      </div>
      <div className="form-group">
        <label>Confirm Password *</label>
        <input type="password" value={form.confirmPw} onChange={e => set('confirmPw', e.target.value)} placeholder="Repeat password" />
      </div>
      <button type="button" className="auth-submit" onClick={onNext}>
        Continue <ArrowRight size={16} />
      </button>
      <p className="auth-switch">Already in the network? <button type="button" onClick={onSwitch}>Sign in</button></p>
    </div>
  );
}

function Step1({ form, set, onBack, onNext }) {
  return (
    <div className="auth-form">
      <h2 className="auth-form-title">Your LE profile</h2>
      <p className="auth-form-sub">Step 2 of 3 — tell the network who you are</p>
      <div className="form-group">
        <label>Full Name *</label>
        <input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Aryan Mehta" />
      </div>
      <div className="form-row">
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
      <div className="form-row">
        <div className="form-group">
          <label>Current Role</label>
          <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="Co-Founder" />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Inc." />
        </div>
      </div>
      <div className="form-group">
        <label>Location</label>
        <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Pune, Maharashtra" />
      </div>
      <div className="form-actions">
        <button type="button" className="auth-back-btn" onClick={onBack}>Back</button>
        <button type="button" className="auth-submit auth-submit--flex" onClick={onNext}>Continue <ArrowRight size={16} /></button>
      </div>
    </div>
  );
}

function Step2({ form, loading, onBack, onSubmit }) {
  return (
    <div className="auth-form">
      <h2 className="auth-form-title">Almost done</h2>
      <p className="auth-form-sub">Step 3 of 3 — add context, get approved faster</p>
      <div className="form-group">
        <label>Bio</label>
        <textarea value={form.bio} onChange={e => { form.bio = e.target.value; }} placeholder="Tell the network what you've built or are building..." rows={3} />
      </div>
      <div className="form-group">
        <label>LinkedIn URL</label>
        <input value={form.linkedin_url} onChange={e => { form.linkedin_url = e.target.value; }} placeholder="https://linkedin.com/in/yourname" />
      </div>
      <div className="form-group">
        <label>Tags <span className="form-label-muted">(comma-separated)</span></label>
        <input value={form.tags} onChange={e => { form.tags = e.target.value; }} placeholder="Founder, SaaS, D2C" />
      </div>
      <div className="auth-review-card">
        <div className="auth-review-avatar" style={{ background: getAvatarProps(form.full_name || 'A').color }}>
          {getAvatarProps(form.full_name || 'A').initials}
        </div>
        <div>
          <p className="auth-review-name">{form.full_name || '—'}</p>
          <p className="auth-review-sub">{form.role || 'Role'} · {form.company || 'Company'} · Batch '{form.batch.slice(2)}</p>
          <p className="auth-review-track">{form.specialization}</p>
        </div>
      </div>
      <p className="auth-disclaimer">Your profile will be reviewed by the LE team before it appears in the directory.</p>
      <div className="form-actions">
        <button type="button" className="auth-back-btn" onClick={onBack}>Back</button>
        <button type="button" className="auth-submit auth-submit--flex" onClick={onSubmit} disabled={loading}>
          {loading ? 'Submitting…' : 'Submit for Review'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function SuccessScreen({ email }) {
  return (
    <div className="auth-success">
      <div className="auth-success-icon"><CheckCircle size={48} /></div>
      <h2>Application submitted!</h2>
      <p>We'll review your profile and notify you at <strong>{email}</strong> once approved.</p>
      <p className="auth-success-note">Check your inbox to confirm your email address too.</p>
    </div>
  );
}

function FormStyles() {
  return (
    <style>{`
      .auth-form { display: flex; flex-direction: column; gap: 16px; }
      .auth-form-title { font-size: 22px; font-weight: 800; color: var(--navy); }
      .auth-form-sub { font-size: 14px; color: #9ca3af; margin-top: -8px; }
      .auth-error {
        display: flex; align-items: center; gap: 8px;
        background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2);
        border-radius: 8px; padding: 10px 14px;
        font-size: 13px; color: #dc2626;
      }
      .form-group { display: flex; flex-direction: column; gap: 7px; }
      .form-group label {
        font-size: 13px; font-weight: 600; color: #374151;
      }
      .form-label-muted { color: #9ca3af; font-weight: 400; }
      .form-group input,
      .form-group select,
      .form-group textarea {
        padding: 11px 14px;
        background: #ffffff; border: 1px solid #d1d5db;
        border-radius: 8px; font-size: 14px; color: var(--navy); width: 100%;
        transition: border-color 0.18s, box-shadow 0.18s;
      }
      .form-group input::placeholder,
      .form-group textarea::placeholder { color: #9ca3af; }
      .form-group input:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        border-color: var(--teal);
        box-shadow: 0 0 0 3px rgba(37,188,189,0.12);
        outline: none;
      }
      .form-group select option { background: #ffffff; color: var(--navy); }
      .form-group textarea { resize: vertical; min-height: 80px; }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .input-with-icon { position: relative; }
      .input-with-icon input { padding-right: 44px; }
      .input-icon-btn {
        position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
        background: none; color: #9ca3af; transition: color 0.15s;
      }
      .input-icon-btn:hover { color: #374151; }
      .auth-submit {
        display: flex; align-items: center; justify-content: center; gap: 8px;
        width: 100%; padding: 14px; font-size: 15px; font-weight: 700;
        background: var(--teal); color: white;
        border-radius: var(--radius-sm); transition: all 0.2s var(--ease);
      }
      .auth-submit:hover:not(:disabled) {
        background: rgba(37,188,189,0.85);
        box-shadow: 0 12px 36px rgba(37,188,189,0.3);
        transform: translateY(-1px);
      }
      .auth-submit:disabled { opacity: 0.5; cursor: not-allowed; }
      .auth-submit--flex { flex: 1; }
      .auth-back-btn {
        padding: 14px 24px; font-size: 15px; font-weight: 600;
        color: #374151; background: #f9fafb;
        border: 1px solid #d1d5db; border-radius: var(--radius-sm);
        transition: all 0.15s; flex-shrink: 0;
      }
      .auth-back-btn:hover {
        color: var(--navy); background: #f3f4f6; border-color: #9ca3af;
      }
      .auth-switch {
        font-size: 13px; color: #9ca3af; text-align: center;
      }
      .auth-switch button {
        background: none; color: var(--teal);
        font-weight: 600; font-size: 13px; transition: color 0.15s;
      }
      .auth-switch button:hover { color: rgba(37,188,189,0.8); }
      .form-actions { display: flex; gap: 12px; }
      .auth-review-card {
        display: flex; align-items: center; gap: 14px;
        background: #f9fafb; border: 1px solid #e5e7eb;
        border-radius: 12px; padding: 16px;
      }
      .auth-review-avatar {
        width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; font-weight: 800; color: white;
      }
      .auth-review-name { font-weight: 700; color: var(--navy); font-size: 15px; }
      .auth-review-sub { font-size: 13px; color: #9ca3af; margin-top: 2px; }
      .auth-review-track { font-size: 12px; color: var(--teal); margin-top: 3px; }
      .auth-disclaimer { font-size: 12px; color: #9ca3af; line-height: 1.6; }
      .signup-steps {
        display: flex; gap: 0; margin-bottom: 28px;
        border-bottom: 1px solid #e5e7eb; padding-bottom: 16px;
      }
      .signup-step {
        display: flex; align-items: center; gap: 8px;
        flex: 1; font-size: 13px; font-weight: 500; color: #9ca3af;
      }
      .signup-step-dot {
        width: 24px; height: 24px; border-radius: 50%;
        border: 1.5px solid #d1d5db;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 700; flex-shrink: 0; color: #9ca3af;
      }
      .signup-step--active { color: var(--navy); }
      .signup-step--active .signup-step-dot {
        border-color: var(--teal); color: var(--teal);
      }
      .signup-step--done { color: #6b7280; }
      .signup-step--done .signup-step-dot {
        border-color: var(--teal); color: var(--teal);
      }
      .auth-success {
        display: flex; flex-direction: column; align-items: center;
        text-align: center; gap: 12px; padding: 16px 0;
      }
      .auth-success-icon { color: var(--teal); }
      .auth-success h2 { font-size: 22px; font-weight: 800; color: var(--navy); }
      .auth-success p { font-size: 15px; color: #6b7280; line-height: 1.6; }
      .auth-success p strong { color: var(--navy); }
      .auth-success-note { font-size: 13px !important; color: #9ca3af !important; }
    `}</style>
  );
}

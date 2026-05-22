import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);

// Derive avatar initials and a deterministic color from a name
export function getAvatarProps(name) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const colors = ['#3663AD', '#25BCBD', '#160E44', '#2563EB', '#0891B2'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return { initials, color };
}

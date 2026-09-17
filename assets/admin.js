import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const CFG = window.ESTERIKA_CONFIG || {};
const $ = id => document.getElementById(id);
const STATUSES = ['חדש', 'אושר', 'שילם', 'ביטל'];

if (!CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY) {
  $('login').innerHTML = '<h2>עוד לא הוגדר</h2><p class="muted">יש להזין את מפתחות Supabase בקובץ <code>assets/config.js</code>. ההוראות ב-README.</p>';
  throw new Error('Supabase is not configured');
}

const db = createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
let rows = [];
let filter = 'הכל';

// ===== auth: magic link, no passwords =====
const ALLOWED = (CFG.MANAGER_EMAILS || []).map(e => e.trim().toLowerCase());

const loginMsg = (text, isError = false) => {
  $('loginMsg').textContent = text;
  $('loginMsg').classList.toggle('form__msg--err', isError);
  $('loginMsg').hidden = false;
};

$('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = String(new FormData(e.target).get('email')).trim().toLowerCase();
  const btn = e.target.querySelector('button');

  if (ALLOWED.length && !ALLOWED.includes(email)) {
    loginMsg('המייל הזה לא מורשה לצפות בנרשמים.', true);
    return;
  }

  btn.disabled = true; btn.textContent = 'שולח...';
  const { error } = await db.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: location.href.split('#')[0] }
  });
  btn.disabled = false; btn.textContent = 'שלחו לי קישור כניסה';

  if (error) loginMsg('לא הצלחנו לשלוח את הקישור. נסו שוב בעוד רגע.', true);
  else loginMsg('שלחנו קישור כניסה ל' + email + ' 📬 פתחו אותו מהטלפון הזה.');
});

$('logout').addEventListener('click', () => db.auth.signOut());

db.auth.onAuthStateChange((_e, session) => {
  const inside = Boolean(session);
  $('login').hidden = inside;
  $('dash').hidden = !inside;
  if (inside) {
    $('who').textContent = session.user.email;
    guard();
  }
});

// ===== data =====
// מוודא שהמייל שאיתו נכנסו מופיע ברשימת המנהלים (טבלת staff ב-Supabase)
async function guard() {
  const { data, error } = await db.rpc('is_staff');
  if (error) { load(); return; }   // אם הפונקציה לא קיימת, ה-RLS עדיין מגן
  if (data === false) {
    alert('המייל הזה לא מורשה לצפות בנרשמים.');
    await db.auth.signOut();
    return;
  }
  load();
}

async function load() {
  const { data, error } = await db
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    alert('שגיאה בטעינת הנרשמים: ' + error.message);
    return;
  }
  rows = data || [];
  render();
}

async function setStatus(id, status) {
  const { error } = await db.from('registrations').update({ status }).eq('id', id);
  if (error) { alert('לא הצלחנו לעדכן: ' + error.message); return; }
  const row = rows.find(r => r.id === id);
  if (row) row.status = status;
  render();
}

// ===== render =====
const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const waLink = phone => `https://wa.me/972${String(phone).replace(/\D/g, '').replace(/^972/, '').replace(/^0/, '')}`;

const fmtDate = iso => new Date(iso).toLocaleString('he-IL',
  { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });

const peopleCount = r => ({ 'לבד': 1, 'שניים': 2, 'קבוצה': 3 }[r.people] ?? 1);

function visible() {
  const q = $('search').value.trim().toLowerCase();
  return rows.filter(r => {
    if (filter !== 'הכל' && (r.status || 'חדש') !== filter) return false;
    if (!q) return true;
    return [r.name, r.phone, r.email, r.notes].join(' ').toLowerCase().includes(q);
  });
}

function render() {
  const live = rows.filter(r => r.status !== 'ביטל');
  $('sTotal').textContent = live.length;
  $('sPeople').textContent = live.reduce((n, r) => n + peopleCount(r), 0);
  $('sNew').textContent = rows.filter(r => (r.status || 'חדש') === 'חדש').length;

  const list = visible();
  $('empty').hidden = list.length > 0;
  $('list').innerHTML = list.map(r => `
    <article class="reg card" data-status="${esc(r.status || 'חדש')}">
      <div class="reg__head">
        <h3>${esc(r.name)}</h3>
        <span class="reg__date">${fmtDate(r.created_at)}</span>
      </div>
      <div class="reg__row">
        <a class="reg__tel" href="tel:${esc(r.phone)}">${esc(r.phone)}</a>
        <a class="reg__wa" href="${waLink(r.phone)}" target="_blank" rel="noopener">וואטסאפ</a>
        ${r.email ? `<a href="mailto:${esc(r.email)}">${esc(r.email)}</a>` : ''}
      </div>
      <p class="reg__people">מגיעים: <b>${esc(r.people || '—')}</b></p>
      ${r.notes ? `<p class="reg__notes">${esc(r.notes)}</p>` : ''}
      <div class="reg__status">
        ${STATUSES.map(s => `
          <button class="chip ${(r.status || 'חדש') === s ? 'is-on' : ''}"
                  data-id="${r.id}" data-status="${s}">${s}</button>`).join('')}
      </div>
    </article>`).join('');
}

$('list').addEventListener('click', (e) => {
  const b = e.target.closest('.reg__status .chip');
  if (b) setStatus(Number(b.dataset.id), b.dataset.status);
});

$('search').addEventListener('input', render);
$('refresh').addEventListener('click', load);
$('filters').addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (!b) return;
  filter = b.dataset.f;
  $('filters').querySelectorAll('.chip').forEach(c => c.classList.toggle('is-on', c === b));
  render();
});

// ===== CSV (Excel-friendly, UTF-8 BOM) =====
$('csv').addEventListener('click', () => {
  const head = ['תאריך הרשמה', 'שם', 'טלפון', 'אימייל', 'מגיעים', 'הערות', 'סטטוס'];
  const cell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const body = visible().map(r =>
    [fmtDate(r.created_at), r.name, r.phone, r.email, r.people, r.notes, r.status || 'חדש'].map(cell).join(','));
  const blob = new Blob(['﻿' + [head.map(cell).join(','), ...body].join('\r\n')],
    { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `נרשמים-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
});

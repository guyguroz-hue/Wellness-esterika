const CFG = window.ESTERIKA_CONFIG || {};
const HAS_DB = Boolean(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY);

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Signup =====
const form = document.getElementById('signup');
const msg = document.getElementById('msg');
const submitBtn = form?.querySelector('button[type="submit"]');

const setMsg = (text, isError = false) => {
  if (!msg) return;
  msg.textContent = text;
  msg.classList.toggle('form__msg--err', isError);
  msg.hidden = false;
};

async function saveToSupabase(row) {
  const res = await fetch(`${CFG.SUPABASE_URL}/rest/v1/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: CFG.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${CFG.SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(row)
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
}

function sendToWhatsapp(row) {
  const lines = [
    'היי אסתריקה! אשמח להירשם לבוקר הוולנסי 🌿',
    `שם: ${row.name}`,
    `טלפון: ${row.phone}`,
    row.email && `אימייל: ${row.email}`,
    `מגיעים: ${row.people}`,
    row.notes && `הערות: ${row.notes}`
  ].filter(Boolean);
  window.open(`https://wa.me/${CFG.WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const val = k => (d.get(k) || '').toString().trim();

  let ok = true;
  form.querySelectorAll('input[required]').forEach(i => {
    const bad = !i.value.trim();
    i.classList.toggle('is-err', bad);
    if (bad) ok = false;
  });
  if (!ok) { setMsg('נא למלא שם וטלפון 🙏', true); return; }

  const row = {
    name: val('name'),
    phone: val('phone'),
    email: val('email') || null,
    people: val('count'),
    notes: val('notes') || null
  };

  if (!HAS_DB) { sendToWhatsapp(row); setMsg('תודה! נחזור אליכם עם כל הפרטים 🤍'); form.reset(); return; }

  submitBtn.disabled = true;
  submitBtn.textContent = 'שולח...';
  try {
    await saveToSupabase(row);
    form.hidden = true;
    setMsg('');
    document.getElementById('done').hidden = false;
  } catch (err) {
    console.error(err);
    setMsg('משהו השתבש בשליחה. אפשר לשלוח לנו בוואטסאפ ונשמור לכם מקום 🤍', true);
    sendToWhatsapp(row);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'שמרו לי מקום';
  }
});

form?.querySelectorAll('input').forEach(i =>
  i.addEventListener('input', () => i.classList.remove('is-err')));

const WA_NUMBER = '972545367306';

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Signup form → WhatsApp
const form = document.getElementById('signup');
const msg = document.getElementById('msg');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const val = k => (d.get(k) || '').toString().trim();
  let ok = true;
  form.querySelectorAll('input[required]').forEach(i => {
    const bad = !i.value.trim();
    i.classList.toggle('is-err', bad);
    if (bad) ok = false;
  });
  if (!ok) return;

  const lines = [
    'היי אסתריקה! אשמח להירשם לבוקר הוולנסי 🌿',
    `שם: ${val('name')}`,
    `טלפון: ${val('phone')}`,
    val('email') && `אימייל: ${val('email')}`,
    `מגיעים: ${val('count')}`,
    val('notes') && `הערות: ${val('notes')}`
  ].filter(Boolean);

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  msg.hidden = false;
  form.reset();
});

form?.querySelectorAll('input').forEach(i =>
  i.addEventListener('input', () => i.classList.remove('is-err')));

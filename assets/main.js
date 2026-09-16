// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('is-in'), (i % 4) * 90);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Sticky nav
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 80);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Hero parallax
const bg = document.querySelector('.hero__bg');
if (bg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    bg.style.transform = `translateY(${y * 0.18}px) scale(1.04)`;
  }, { passive: true });
}

// Form → WhatsApp
const form = document.getElementById('form');
const msg = document.getElementById('msg');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const name = (d.get('name') || '').toString().trim();
  const phone = (d.get('phone') || '').toString().trim();
  if (!name || !phone) {
    form.querySelectorAll('input[required]').forEach(i => {
      if (!i.value.trim()) i.style.borderColor = '#E2A183';
    });
    return;
  }
  const text = `היי אסתריקה! אשמח להירשם לבוקר הוולנסי.\nשם: ${name}\nטלפון: ${phone}\nהערות: ${d.get('notes') || '-'}`;
  window.open('https://wa.me/972500000000?text=' + encodeURIComponent(text), '_blank');
  msg.hidden = false;
  form.reset();
});

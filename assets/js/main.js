/* ─── Tag Filter ─────────────────────────────────────────────── */
function initTagFilter() {
  const btns  = document.querySelectorAll('.tag-btn');
  const cards = document.querySelectorAll('.post-card[data-tags]');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tag = btn.dataset.tag;

      cards.forEach(card => {
        const tags = card.dataset.tags?.split(',') ?? [];
        const show = tag === 'all' || tags.includes(tag);
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ─── Newsletter Form ────────────────────────────────────────── */
function initNewsletter() {
  const form  = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const btn   = document.getElementById('newsletter-btn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!input.value || !input.value.includes('@')) {
      input.style.borderColor = '#DC2626';
      input.focus();
      return;
    }
    input.style.borderColor = '';
    btn.textContent = '✓ Listo';
    btn.disabled = true;
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Suscribirse';
      btn.disabled = false;
    }, 3000);
  });
}

/* ─── Active nav link ────────────────────────────────────────── */
function initActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav__links a').forEach(a => {
    if (a.getAttribute('href') === path ||
        (path.includes('/posts/') && a.getAttribute('href') === '/posts/')) {
      a.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTagFilter();
  initNewsletter();
  initActiveNav();
});

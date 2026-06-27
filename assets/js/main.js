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
const WORKER_URL = 'https://brecha-newslette.santagadea-ia.workers.dev';

function initNewsletter() {
  const form  = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const btn   = document.getElementById('newsletter-btn');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!input.value || !input.value.includes('@')) {
      input.style.borderColor = '#DC2626';
      input.focus();
      return;
    }

    input.style.borderColor = '';
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input.value }),
      });

      if (res.ok) {
        btn.textContent = '✓ Suscrito';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Suscribirse';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('error');
      }
    } catch {
      btn.textContent = 'Intentar de nuevo';
      btn.disabled = false;
      input.style.borderColor = '#DC2626';
    }
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

/* ─── Share ──────────────────────────────────────────────────── */
function showToast(msg) {
  let toast = document.getElementById('share-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'share-toast';
    toast.className = 'share-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function shareThreads() {
  const title = document.querySelector('.post-header__title')?.textContent?.trim() || document.title;
  const url = window.location.href;
  const text = encodeURIComponent(title + '\n\n' + url);
  window.open('https://www.threads.net/intent/post?text=' + text, '_blank');
}

function shareInstagram() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: document.title, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Link copiado — pégalo en Instagram');
    });
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('¡Link copiado al portapapeles!');
  });
}

/* ─── Scroll Reveal ──────────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.post-card, .post-card--featured, .frase-card');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(() => el.classList.add('is-visible'), Number(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el, i) => {
    el.dataset.revealDelay = i * 80;
    observer.observe(el);
  });
}

/* ─── Dark Mode Toggle ───────────────────────────────────────── */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('brecha-theme', next);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTagFilter();
  initNewsletter();
  initActiveNav();
  initThemeToggle();
  initScrollReveal();
});

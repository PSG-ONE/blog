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

document.addEventListener('DOMContentLoaded', () => {
  initTagFilter();
  initNewsletter();
  initActiveNav();
});

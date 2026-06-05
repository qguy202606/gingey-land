/* Gingey Land — Shared Menu + Lightbox */

/* Active page highlighting */
const menuButtons = document.querySelectorAll('.menu-btn');
menuButtons.forEach(btn => {
  const page = btn.dataset.page;
  if (page && window.location.pathname.endsWith(page)) {
    btn.classList.add('active');
  }
  /* Fallback: lightbox anchor */
  if (btn.dataset.lightbox) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(btn.dataset.lightbox);
      if (target) target.classList.add('open');
    });
  }
});

/* Lightbox */
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (!img) return;
    const lb = document.getElementById('lightbox');
    const lbImg = lb.querySelector('img');
    lbImg.src = img.src;
    lb.classList.add('open');
  });
});

const lbClose = document.getElementById('lightbox-close');
if (lbClose) {
  lbClose.addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('open');
  });
}

document.getElementById('lightbox')?.addEventListener('click', e => {
  if (e.target.id === 'lightbox') {
    document.getElementById('lightbox').classList.remove('open');
  }
});

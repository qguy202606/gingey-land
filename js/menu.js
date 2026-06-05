/* Gingey Land — Shared Menu + Lightbox */

/* Active page highlighting */
const menuButtons = document.querySelectorAll('.menu-btn');
menuButtons.forEach(btn => {
  const page = btn.dataset.page;
  if (page && window.location.pathname.endsWith(page)) {
    btn.classList.add('active');
  }
});

/* Lightbox */
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (!img || !lbImg) return;
      lbImg.src = img.src;
      lightbox.classList.add('open');
    });
  });

  const lbClose = document.getElementById('lightbox-close');
  if (lbClose) {
    lbClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });
  }

  lightbox.addEventListener('click', e => {
    if (e.target.id === 'lightbox') {
      lightbox.classList.remove('open');
    }
  });
}

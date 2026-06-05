const GAMES_PLAYED_KEY = 'gingey_played';

function markPlayed() {
  try { localStorage.setItem(GAMES_PLAYED_KEY, 'true'); } catch (e) {}
}

function initCookiePuzzle() {
  markPlayed();
  const container = document.getElementById('game-puzzle');
  if (!container) return;
  container.innerHTML = '';

  const pieces = Array.from({ length: 6 }, (_, i) => i + 1);
  const shuffled = [...pieces].sort(() => Math.random() - 0.5);

  const board = document.createElement('div');
  board.className = 'puzzle-board';
  board.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:280px;margin:0 auto;';

  let nextNumber = 1;

  shuffled.forEach((num) => {
    const slot = document.createElement('div');
    slot.className = 'puzzle-slot';
    slot.dataset.value = num;
    slot.textContent = '?';
    slot.style.cssText = 'aspect-ratio:1;border-radius:14px;background:#fff;box-shadow:0 3px 0 #ffd7b8;display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:800;cursor:pointer;border:2.5px solid #ffe0c0;transition:all .15s ease;user-select:none;';

    slot.addEventListener('click', () => {
      if (slot.classList.contains('revealed')) return;
      if (num !== nextNumber) {
        slot.style.background = '#ff9eb5';
        slot.textContent = num;
        setTimeout(() => {
          slot.textContent = '?';
          slot.style.background = '#fff';
        }, 400);
        return;
      }
      slot.textContent = String(num);
      slot.style.background = '#7ecba1';
      slot.style.borderColor = '#5ba882';
      slot.style.color = '#fff';
      slot.style.pointerEvents = 'none';
      slot.classList.add('revealed');
      nextNumber += 1;
      if (nextNumber > pieces.length) {
        announcePuzzleWin(board);
      }
    });
    board.appendChild(slot);
  });

  const hint = document.createElement('div');
  hint.className = 'game-hint';
  hint.style.cssText = 'margin-top:10px;font-size:.85rem;color:#7a5a48;';
  hint.textContent = 'Tap each slot in the number order.';

  container.appendChild(board);
  container.appendChild(hint);
}

function announcePuzzleWin(container) {
  let msg = container.parentElement.querySelector('.game-message');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'game-message';
    msg.style.cssText = 'margin-top:8px;font-weight:800;color:#c6865b;font-size:1rem;';
    container.parentElement.appendChild(msg);
  }
  msg.textContent = 'Great job! 🍪';
}

function initMemoryMatch() {
  markPlayed();
  let container;
  try { container = document.getElementById('game-match'); } catch (e) { return; }
  if (!container) return;
  container.innerHTML = '';

  const icons = ['🍪', '🧩', '🎯', '🍎'];
  const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
  let flipped = [];
  let matched = 0;

  const board = document.createElement('div');
  board.className = 'match-board';
  board.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:360px;margin:0 auto;';

  deck.forEach((icon, idx) => {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.dataset.icon = icon;
    card.dataset.index = idx;

    const inner = document.createElement('div');
    inner.className = 'match-inner';
    inner.style.cssText = 'position:relative;width:100%;aspect-ratio:3/4;transform-style:preserve-3d;transition:transform .4s ease;cursor:pointer;';

    const front = document.createElement('div');
    front.className = 'match-front';
    front.style.cssText = 'position:absolute;inset:0;border-radius:14px;background:#fff0db;box-shadow:0 3px 0 #d6b99a;display:flex;align-items:center;justify-content:center;font-size:1.4rem;backface-visibility:hidden;';

    const back = document.createElement('div');
    back.className = 'match-back';
    back.style.cssText = 'position:absolute;inset:0;border-radius:14px;background:#c6865b;box-shadow:0 3px 0 #a76a42;display:flex;align-items:center;justify-content:center;font-size:1.8rem;color:#fff;backface-visidden:hidden;transform:rotateY(180deg);';

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => {
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
      if (flipped.length >= 2) return;
      inner.style.transform = 'rotateY(180deg)';
      card.classList.add('flipped');
      flipped.push(card);

      if (flipped.length === 2) {
        const [a, b] = flipped;
        if (a.dataset.icon === b.dataset.icon) {
          a.classList.add('matched');
          b.classList.add('matched');
          matched += 1;
          flipped = [];
          if (matched === icons.length) announceMatchWin(container);
        } else {
          setTimeout(() => {
            const [x, y] = flipped;
            x.querySelector('.match-inner').style.transform = '';
            y.querySelector('.match-inner').style.transform = '';
            x.classList.remove('flipped');
            y.classList.remove('flipped');
            flipped = [];
          }, 700);
        }
      }
    });

    board.appendChild(card);
  });

  const hint = document.createElement('div');
  hint.style.cssText = 'margin-top:8px;font-size:.85rem;color:#7a5a48;';
  hint.textContent = 'Find all matching cookie pairs!';

  container.appendChild(board);
  container.appendChild(hint);
}

function announceMatchWin(container) {
  let msg = container.parentElement.querySelector('.game-message');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'game-message';
    msg.style.cssText = 'margin-top:8px;font-weight:800;color:#c6865b;font-size:1rem;';
    container.parentElement.appendChild(msg);
  }
  msg.textContent = 'All pairs found! 🎉';
}

function initColorStudio() {
  markPlayed();
  let container;
  try { container = document.getElementById('game-color'); } catch (e) { return; }
  if (!container) return;
  container.innerHTML = '';

  const colors = ['#c6865b', '#ff9eb5', '#7ecba1', '#ffd54f', '#5c3d2e', '#fff'];
  const canvas = document.createElement('div');
  canvas.className = 'color-canvas';
  canvas.style.cssText = 'position:relative;width:260px;height:260px;margin:0 auto;border-radius:22px;background:#fff;box-shadow:0 4px 0 #ffe0c0;overflow:hidden;';

  const face = `
    <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <circle cx="130" cy="110" r="75" data-colorable="true" fill="#c6865b"/>
      <circle cx="106" cy="100" r="7" data-colorable="true" fill="#2c1a0e"/>
      <circle cx="154" cy="100" r="7" data-colorable="true" fill="#2c1a0e"/>
      <path d="M106 118 Q130 150 154 118" data-colorable="true" fill="none" stroke="#2c1a0e" stroke-width="4" stroke-linecap="round"/>
      <path d="M90 120 Q130 160 170 120" data-colorable="true" fill="#ff9eb5"/>
      <circle cx="130" cy="145" r="5" data-colorable="true" fill="#7ecba1"/>
      <circle cx="130" cy="165" r="5" data-colorable="true" fill="#7ecba1"/>
      <path d="M70 175 Q130 205 190 175 L200 245 Q130 265 60 245 Z" data-colorable="true" fill="#c6865b"/>
      <path d="M88 180 Q130 200 172 180" data-colorable="true" fill="none" stroke="#ff9eb5" stroke-width="5" stroke-linecap="round"/>
      <circle cx="130" cy="220" r="6" data-colorable="true" fill="#7ecba1"/>
      <circle cx="130" cy="245" r="6" data-colorable="true" fill="#7ecba1"/>
    </svg>
  `;

  canvas.innerHTML = face;
  const palette = document.createElement('div');
  palette.style.cssText = 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px;';

  colors.forEach(c => {
    const sw = document.createElement('button');
    sw.className = 'color-swatch';
    sw.style.cssText = `width:28px;height:28px;border-radius:999px;border:2.5px solid rgba(0,0,0,.08);background:${c};cursor:pointer;`;
    sw.setAttribute('aria-label', 'Color');
    sw.addEventListener('click', () => {
      const current = canvas.querySelector('[data-colorable="true"]');
      if (current) current.setAttribute('fill', c);
    });
    palette.appendChild(sw);
  });

  container.appendChild(canvas);
  container.appendChild(palette);
}

function bootGames() {
  initCookiePuzzle();
  initMemoryMatch();
  initColorStudio();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootGames);
} else {
  bootGames();
}

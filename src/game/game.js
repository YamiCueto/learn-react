// Pure HTML5 Canvas 2D Platformer — React Quest
// No external game library. Full control over visuals and physics.
import { TIPS } from './tips';

// ── Constants ─────────────────────────────────
const GRAVITY    = 0.45;
const JUMP_VEL   = -10;
const WALK_SPEED = 3.5;
const WORLD_W    = 3200;

// ── Level data ────────────────────────────────
const LEVEL = {
  platforms: [
    // Ground sections (y=300, h=60)
    { x: 0,    y: 300, w: 680,  h: 60, t: 'g' },
    { x: 780,  y: 300, w: 820,  h: 60, t: 'g' },
    { x: 1700, y: 300, w: 800,  h: 60, t: 'g' },
    { x: 2600, y: 300, w: 600,  h: 60, t: 'g' },
    // Floating platforms (brick style)
    { x: 150,  y: 235, w: 110,  h: 16, t: 'b' },
    { x: 350,  y: 185, w: 90,   h: 16, t: 'b' },
    { x: 520,  y: 225, w: 100,  h: 16, t: 'b' },
    { x: 820,  y: 225, w: 100,  h: 16, t: 'b' },
    { x: 1000, y: 178, w: 110,  h: 16, t: 'b' },
    { x: 1160, y: 228, w: 90,   h: 16, t: 'b' },
    { x: 1380, y: 185, w: 100,  h: 16, t: 'b' },
    { x: 1720, y: 225, w: 100,  h: 16, t: 'b' },
    { x: 1900, y: 178, w: 110,  h: 16, t: 'b' },
    { x: 2060, y: 228, w: 90,   h: 16, t: 'b' },
    { x: 2260, y: 185, w: 100,  h: 16, t: 'b' },
    { x: 2640, y: 228, w: 90,   h: 16, t: 'b' },
    { x: 2820, y: 185, w: 100,  h: 16, t: 'b' },
    { x: 2960, y: 228, w: 100,  h: 16, t: 'b' },
  ],
  coins: [
    { x: 195, y: 205, t: 'gold' }, { x: 385, y: 155, t: 'blue' },
    { x: 565, y: 195, t: 'gold' }, { x: 860, y: 195, t: 'gold' },
    { x: 1045,y: 148, t: 'blue' }, { x: 1195,y: 198, t: 'gold' },
    { x: 1415,y: 155, t: 'gold' }, { x: 1755,y: 195, t: 'star' },
    { x: 1945,y: 148, t: 'blue' }, { x: 2090,y: 198, t: 'gold' },
    { x: 2295,y: 155, t: 'gold' }, { x: 2670,y: 198, t: 'blue' },
    { x: 2855,y: 155, t: 'gold' }, { x: 2990,y: 198, t: 'star' },
    // Ground-level star coins (in gaps between ground sections)
    { x: 730, y: 270, t: 'star' }, { x: 1650,y: 270, t: 'gold' },
  ],
  enemies: [
    { x: 320,  y: 278, px: 80,   qx: 480  },
    { x: 1050, y: 178, px: 960,  qx: 1120 }, // patrolling floating platform
    { x: 1200, y: 278, px: 1030, qx: 1400 },
    { x: 1980, y: 278, px: 1800, qx: 2100 },
    { x: 2700, y: 278, px: 2600, qx: 2900 },
  ],
};

// ── AABB collision ────────────────────────────
function aabb(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// ── Drawing ───────────────────────────────────
function drawBg(ctx, camX, W, H) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#080818');
  g.addColorStop(1, '#160d38');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // Parallax stars
  ctx.fillStyle = 'rgba(200,200,255,0.65)';
  const shift = (camX * 0.18) % W;
  for (let i = 0; i < 50; i++) {
    const sx = ((i * 131 + 20) % W - shift + W * 2) % W;
    const sy = (i * 71 + 15) % (H * 0.78);
    ctx.fillRect(sx, sy, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1);
  }
}

function drawPlatform(ctx, p, camX) {
  const sx = p.x - camX;
  const isGround = p.t === 'g';
  // Base block
  ctx.fillStyle = isGround ? '#1b0e45' : '#27165a';
  ctx.fillRect(sx, p.y, p.w, p.h);
  // Top accent
  ctx.fillStyle = isGround ? '#7c3aed' : '#a855f7';
  ctx.fillRect(sx, p.y, p.w, isGround ? 4 : 3);
  // Brick grid
  ctx.strokeStyle = isGround ? '#2a1860' : '#361e72';
  ctx.lineWidth = 1;
  const brickW = isGround ? 22 : 18;
  for (let bx = sx; bx < sx + p.w; bx += brickW) {
    ctx.beginPath(); ctx.moveTo(bx, p.y + (isGround ? 4 : 3)); ctx.lineTo(bx, p.y + p.h); ctx.stroke();
  }
  if (isGround) {
    for (let by = p.y + 20; by < p.y + p.h; by += 20) {
      ctx.beginPath(); ctx.moveTo(sx, by); ctx.lineTo(sx + p.w, by); ctx.stroke();
    }
  }
  // Bottom shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(sx, p.y + p.h - 3, p.w, 3);
}

function drawPlayer(ctx, pl, camX, tick) {
  const sx = Math.round(pl.x - camX);
  const sy = Math.round(pl.y);
  if (pl.inv > 0 && Math.floor(pl.inv / 5) % 2) return; // blink
  const f = pl.facing;
  const moving = Math.abs(pl.vx) > 0.5 && pl.onGround;
  const leg = Math.floor(tick / 7) % 2;
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(sx - 3, sy + pl.h - 1, pl.w + 6, 4);
  // Legs
  ctx.fillStyle = '#2a5acc';
  const lL = moving && leg === 0 ? 12 : 9;
  const lR = moving && leg === 1 ? 12 : 9;
  ctx.fillRect(sx + 2,         sy + 24, 7, lL);
  ctx.fillRect(sx + pl.w - 9,  sy + 24, 7, lR);
  // Feet
  ctx.fillStyle = '#1a3a9a';
  ctx.fillRect(sx + 1,         sy + 24 + lL, 9, 4);
  ctx.fillRect(sx + pl.w - 10, sy + 24 + lR, 9, 4);
  // Body
  ctx.fillStyle = '#4a86ff';
  ctx.fillRect(sx, sy + 10, pl.w, 16);
  // Chest atom symbol
  ctx.fillStyle = 'rgba(190,220,255,0.92)';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⚛', sx + pl.w / 2, sy + 18);
  // Arms
  ctx.fillStyle = '#3a76ee';
  if (f === 1) {
    ctx.fillRect(sx - 4, sy + 12, 5, moving && leg === 0 ? 13 : 9);
    ctx.fillRect(sx + pl.w - 1, sy + 12, 5, moving && leg === 1 ? 13 : 9);
  } else {
    ctx.fillRect(sx - 4, sy + 12, 5, moving && leg === 1 ? 13 : 9);
    ctx.fillRect(sx + pl.w - 1, sy + 12, 5, moving && leg === 0 ? 13 : 9);
  }
  // Head
  ctx.fillStyle = '#5a9aff';
  ctx.fillRect(sx + 1, sy, pl.w - 2, 12);
  // Helmet top
  ctx.fillStyle = '#8ac4ff';
  ctx.fillRect(sx + 2, sy, pl.w - 4, 4);
  // Visor (eye-side)
  ctx.fillStyle = '#c8e8ff';
  if (f === 1) ctx.fillRect(sx + pl.w - 7, sy + 4, 6, 5);
  else         ctx.fillRect(sx + 1, sy + 4, 6, 5);
}

function drawEnemy(ctx, e, camX, tick) {
  if (!e.alive) return;
  const sx = e.x - camX;
  const sy = e.y;
  const bob = Math.sin(tick * 0.09) * 2;
  const legAnim = Math.sin(tick * 0.14) * 4;
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(sx - 3, sy + e.h, e.w + 6, 4);
  // Body (oval via scale trick)
  ctx.save();
  ctx.translate(sx + e.w / 2, sy + e.h / 2 + bob);
  ctx.scale(1, 0.75);
  ctx.fillStyle = '#cc2a2a';
  ctx.beginPath(); ctx.arc(0, 0, e.w / 2 + 1, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  // Shell line
  ctx.strokeStyle = '#aa1818';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sx + e.w / 2, sy + 3 + bob);
  ctx.lineTo(sx + e.w / 2, sy + e.h - 2 + bob);
  ctx.stroke();
  // Eyes
  ctx.fillStyle = 'white';
  ctx.fillRect(sx + 2, sy + 3 + bob, 6, 6);
  ctx.fillRect(sx + e.w - 8, sy + 3 + bob, 6, 6);
  ctx.fillStyle = '#000';
  ctx.fillRect(sx + 3, sy + 4 + bob, 4, 4);
  ctx.fillRect(sx + e.w - 7, sy + 4 + bob, 4, 4);
  // Antennae
  ctx.strokeStyle = '#cc2a2a'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(sx + 5, sy + 3 + bob); ctx.lineTo(sx - 3, sy - 5 + bob);
  ctx.moveTo(sx + e.w - 5, sy + 3 + bob); ctx.lineTo(sx + e.w + 3, sy - 5 + bob);
  ctx.stroke();
  // Legs (3 per side)
  ctx.strokeStyle = '#aa1818'; ctx.lineWidth = 1.5;
  for (let i = 0; i < 3; i++) {
    const ly = sy + 6 + i * 4 + bob;
    const la = (i % 2 === 0 ? legAnim : -legAnim);
    ctx.beginPath();
    ctx.moveTo(sx, ly); ctx.lineTo(sx - 8, ly + la);
    ctx.moveTo(sx + e.w, ly); ctx.lineTo(sx + e.w + 8, ly - la);
    ctx.stroke();
  }
}

function drawCoin(ctx, c, camX, tick) {
  if (c.collected) return;
  const sx = c.x - camX;
  const sy = c.y + Math.sin(tick * 0.07 + c.phase) * 5;
  const clr  = c.t === 'gold' ? '#ffd700' : c.t === 'blue' ? '#06b6d4' : '#ffeb44';
  const glow = c.t === 'gold' ? 'rgba(255,215,0,0.25)' : c.t === 'blue' ? 'rgba(6,182,212,0.25)' : 'rgba(255,235,68,0.25)';
  const sym  = c.t === 'gold' ? '⚛' : c.t === 'blue' ? '💡' : '★';
  // Glow ring
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(sx, sy, 15, 0, Math.PI * 2); ctx.fill();
  // Coin
  ctx.fillStyle = clr;
  ctx.beginPath(); ctx.arc(sx, sy, 9, 0, Math.PI * 2); ctx.fill();
  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath(); ctx.arc(sx - 3, sy - 3, 3, 0, Math.PI * 2); ctx.fill();
  // Symbol
  ctx.fillStyle = 'rgba(0,0,0,0.65)';
  ctx.font = '9px monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(sym, sx, sy);
}

function drawGoal(ctx, camX) {
  const sx = WORLD_W - 130 - camX;
  // Pole
  const grad = ctx.createLinearGradient(sx, 160, sx + 5, 160);
  grad.addColorStop(0, '#ccc'); grad.addColorStop(1, '#888');
  ctx.fillStyle = grad;
  ctx.fillRect(sx, 165, 5, 135);
  // Flag
  ctx.fillStyle = '#7c3aed';
  ctx.beginPath();
  ctx.moveTo(sx + 5, 165); ctx.lineTo(sx + 55, 186); ctx.lineTo(sx + 5, 207);
  ctx.closePath(); ctx.fill();
  // ⚛ on flag
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('⚛', sx + 22, 186);
}

function drawHUD(ctx, score, lives, collected, total, W) {
  ctx.fillStyle = 'rgba(8, 6, 25, 0.88)';
  ctx.fillRect(0, 0, W, 30);
  ctx.fillStyle = '#7c3aed';
  ctx.fillRect(0, 29, W, 2);
  ctx.font = 'bold 13px monospace';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.fillText(`⚛ ${String(score).padStart(6, '0')}`, 12, 15);
  ctx.textAlign = 'center';
  const pct = Math.round((collected / total) * 100);
  ctx.fillText(`🪙 ${collected}/${total}  (${pct}%)`, W / 2, 15);
  ctx.textAlign = 'right';
  ctx.fillText(`${'❤️'.repeat(Math.max(0, lives))}`, W - 12, 15);
}

// ── Main exported function ────────────────────
export function startGame(canvas, { onTipCollected, onScoreChange, onLivesChange, onWin, pausedRef }) {
  const W = 800, H = 360;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const tips = [...TIPS];
  const player = {
    x: 60, y: 260, w: 20, h: 36,
    vx: 0, vy: 0, facing: 1, onGround: false, inv: 0, lives: 3,
  };

  const coins = LEVEL.coins.map((c, i) => ({
    ...c, collected: false, phase: i * 0.72, tipData: tips[i % tips.length],
  }));

  const enemies = LEVEL.enemies.map(e => ({
    ...e, w: 24, h: 22, dir: -1, alive: true,
  }));

  let score = 0, collected = 0, tick = 0, camX = 0;
  const total = coins.length;

  // ── Input ──────────────────────────────────
  const keys = {};
  const kd = e => {
    keys[e.code] = true;
    if (['Space','ArrowUp','ArrowLeft','ArrowRight','ArrowDown'].includes(e.code)) e.preventDefault();
  };
  const ku = e => { keys[e.code] = false; };
  window.addEventListener('keydown', kd);
  window.addEventListener('keyup',   ku);

  // ── Physics ────────────────────────────────
  function resolvePlayer() {
    // X
    player.x += player.vx;
    for (const p of LEVEL.platforms) {
      if (aabb(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
        if (player.vx > 0) player.x = p.x - player.w;
        else               player.x = p.x + p.w;
        player.vx = 0;
      }
    }
    // Y
    player.y += player.vy;
    player.onGround = false;
    for (const p of LEVEL.platforms) {
      if (aabb(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
        if (player.vy > 0) { player.y = p.y - player.h; player.onGround = true; }
        else               { player.y = p.y + p.h; }
        player.vy = 0;
      }
    }
    player.x = Math.max(0, Math.min(player.x, WORLD_W - player.w));
  }

  // ── Update ─────────────────────────────────
  function update() {
    if (pausedRef.current) return;
    tick++;

    const L = keys['ArrowLeft']  || keys['KeyA'];
    const R = keys['ArrowRight'] || keys['KeyD'];
    const J = keys['ArrowUp']   || keys['KeyW'] || keys['Space'];

    if (L)      { player.vx = -WALK_SPEED; player.facing = -1; }
    else if (R) { player.vx =  WALK_SPEED; player.facing =  1; }
    else        { player.vx *= player.onGround ? 0.68 : 0.92; }

    if (J && player.onGround) { player.vy = JUMP_VEL; player.onGround = false; }
    player.vy = Math.min(player.vy + GRAVITY, 14);

    resolvePlayer();

    if (player.inv > 0) player.inv--;

    // Smooth camera
    const targetCam = player.x - W / 3;
    camX += (targetCam - camX) * 0.10;
    camX = Math.max(0, Math.min(camX, WORLD_W - W));

    // Fall death
    if (player.y > H + 80) {
      player.lives--; onLivesChange(player.lives);
      player.x = 60; player.y = 240; player.vx = 0; player.vy = 0; player.inv = 120;
      if (player.lives <= 0) player.lives = 3;
    }

    // Enemies
    for (const e of enemies) {
      if (!e.alive) continue;
      e.x += e.dir * 1.3;
      if (e.x < e.px || e.x > e.qx) e.dir *= -1;
      if (player.inv === 0 && aabb(player.x, player.y, player.w, player.h, e.x, e.y, e.w, e.h)) {
        const stomp = player.vy > 1 && (player.y + player.h) < (e.y + e.h * 0.55);
        if (stomp) {
          e.alive = false; player.vy = JUMP_VEL * 0.55;
          score += 20; onScoreChange(s => s + 20);
        } else {
          player.lives--; onLivesChange(player.lives);
          player.inv = 90; player.vy = -5;
          if (player.lives <= 0) player.lives = 3;
        }
      }
    }

    // Coins
    for (const c of coins) {
      if (c.collected) continue;
      const dx = player.x + player.w / 2 - c.x;
      const dy = player.y + player.h / 2 - c.y;
      if (dx * dx + dy * dy < 22 * 22) {
        c.collected = true; collected++;
        const pts = c.t === 'gold' ? 10 : c.t === 'blue' ? 25 : 50;
        score += pts; onScoreChange(s => s + pts);
        onTipCollected(c.tipData);
        if (collected === total) setTimeout(() => onWin(), 600);
      }
    }

    // Reach goal
    if (player.x > WORLD_W - 150) onWin();
  }

  // ── Render ─────────────────────────────────
  function render() {
    ctx.clearRect(0, 0, W, H);
    drawBg(ctx, camX, W, H);
    for (const p of LEVEL.platforms) {
      if (p.x + p.w < camX - 10 || p.x > camX + W + 10) continue;
      drawPlatform(ctx, p, camX);
    }
    drawGoal(ctx, camX);
    for (const c of coins) {
      if (c.x - camX < -20 || c.x - camX > W + 20) continue;
      drawCoin(ctx, c, camX, tick);
    }
    for (const e of enemies) {
      if (!e.alive || e.x - camX < -40 || e.x - camX > W + 40) continue;
      drawEnemy(ctx, e, camX, tick);
    }
    drawPlayer(ctx, player, camX, tick);
    drawHUD(ctx, score, player.lives, collected, total, W);
  }

  // ── Loop ───────────────────────────────────
  let rafId, running = true;
  function loop() {
    if (!running) return;
    update(); render();
    rafId = requestAnimationFrame(loop);
  }
  loop();

  // ── Expose controls & cleanup ───────────────
  return {
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup',   ku);
    },
    controls: {
      pressLeft:   () => { keys['ArrowLeft']  = true;  },
      releaseLeft: () => { keys['ArrowLeft']  = false; },
      pressRight:  () => { keys['ArrowRight'] = true;  },
      releaseRight:() => { keys['ArrowRight'] = false; },
      pressJump:   () => { keys['Space']      = true;  },
      releaseJump: () => { keys['Space']      = false; },
    },
  };
}

import kaboom from 'kaboom';
import { TIPS } from './tips';

const W = 800;
const H = 400;
const WORLD_W = 2400;
const GROUND_Y = 348;

const PLATFORMS = [
  { x: 80,   y: 280, w: 150 },
  { x: 310,  y: 240, w: 120 },
  { x: 500,  y: 290, w: 140 },
  { x: 700,  y: 230, w: 110 },
  { x: 870,  y: 175, w: 100 },
  { x: 1050, y: 270, w: 130 },
  { x: 1240, y: 230, w: 110 },
  { x: 1440, y: 280, w: 120 },
  { x: 1640, y: 220, w: 100 },
  { x: 1840, y: 270, w: 120 },
  { x: 2050, y: 235, w: 110 },
  { x: 2210, y: 285, w: 140 },
];

const COINS = [
  { x: 155, y: 250, type: 'gold'  },
  { x: 370, y: 210, type: 'gold'  },
  { x: 570, y: 260, type: 'blue'  },
  { x: 755, y: 200, type: 'gold'  },
  { x: 920, y: 145, type: 'star'  },
  { x: 1115,y: 240, type: 'gold'  },
  { x: 1295,y: 200, type: 'blue'  },
  { x: 1505,y: 250, type: 'gold'  },
  { x: 1695,y: 190, type: 'star'  },
  { x: 1900,y: 240, type: 'gold'  },
  { x: 2105,y: 205, type: 'blue'  },
  { x: 2280,y: 255, type: 'gold'  },
  { x: 450, y: 358, type: 'gold'  },
  { x: 1150,y: 358, type: 'blue'  },
  { x: 1900,y: 358, type: 'star'  },
];

const ENEMIES = [
  { x: 200, y: GROUND_Y, min: 80,   max: 350  },
  { x: 530, y: 290,      min: 500,  max: 635  },
  { x: 1080,y: GROUND_Y, min: 900,  max: 1200 },
  { x: 1470,y: 280,      min: 1440, max: 1560 },
  { x: 2100,y: GROUND_Y, min: 1950, max: 2300 },
];

export function initGame({ canvas, onTipCollected, onScoreChange, onLivesChange, onWin, pausedRef }) {
  const k = kaboom({
    canvas,
    width: W,
    height: H,
    background: [15, 15, 26],
    debug: false,
    crisp: false,
  });

  // Make canvas focusable and auto-focus so keyboard events work
  canvas.setAttribute('tabindex', '0');
  canvas.style.outline = 'none';
  canvas.focus();

  const tipPool = [...TIPS];
  let tipIndex = 0;

  k.scene('game', () => {

    // ── Background stars ────────────────────────
    for (let i = 0; i < 60; i++) {
      k.add([
        k.rect(k.rand(1, 2.5), k.rand(1, 2.5)),
        k.pos(k.rand(0, WORLD_W), k.rand(0, GROUND_Y)),
        k.color(k.rgb(80, 80, 130)),
        k.z(-10),
        k.fixed(),
        'star',
      ]);
    }

    // ── Ground ──────────────────────────────────
    k.add([
      k.rect(WORLD_W, 52),
      k.pos(0, GROUND_Y),
      k.color(k.rgb(28, 28, 55)),
      k.outline(2, k.rgb(90, 60, 180)),
      k.area(),
      k.body({ isStatic: true }),
      'ground',
    ]);

    // ── Platforms ───────────────────────────────
    PLATFORMS.forEach(({ x, y, w }) => {
      k.add([
        k.rect(w, 14),
        k.pos(x, y),
        k.color(k.rgb(35, 35, 65)),
        k.outline(2, k.rgb(124, 58, 237)),
        k.area(),
        k.body({ isStatic: true }),
        'platform',
      ]);
    });

    // ── Player ──────────────────────────────────
    const player = k.add([
      k.rect(30, 42),
      k.pos(60, GROUND_Y - 50),
      k.color(k.rgb(90, 130, 230)),
      k.outline(2, k.rgb(150, 200, 255)),
      k.anchor('bot'),
      k.area(),
      k.body({ jumpForce: 520 }),
      { speed: 210, lives: 3, invincible: false },
      'player',
    ]);

    // Draw ⚛ symbol on player
    player.onDraw(() => {
      k.drawText({
        text: '⚛',
        size: 18,
        anchor: 'center',
        pos: k.vec2(0, -22),
        color: k.rgb(200, 230, 255),
      });
    });

    // ── Coins ───────────────────────────────────
    COINS.forEach(({ x, y, type }) => {
      const tip = tipPool[tipIndex++ % tipPool.length];
      const clr = type === 'gold' ? k.rgb(255, 200, 0)
                : type === 'blue' ? k.rgb(6, 182, 212)
                :                   k.rgb(255, 230, 80);
      const pts = type === 'gold' ? 10 : type === 'blue' ? 25 : 50;
      const startY = y;
      let t = k.rand(0, Math.PI * 2);

      const coin = k.add([
        k.rect(18, 18),
        k.pos(x, y),
        k.color(clr),
        k.outline(1.5, k.rgb(255, 255, 200)),
        k.anchor('center'),
        k.area(),
        k.z(2),
        { tipData: tip, coinType: type, pts },
        `coin`,
        `coin-${type}`,
      ]);

      // Bobbing animation
      coin.onUpdate(() => {
        t += k.dt() * 2;
        coin.pos.y = startY + Math.sin(t) * 5;
      });

      // Draw type symbol on top of rect
      coin.onDraw(() => {
        k.drawText({
          text: type === 'gold' ? '🪙' : type === 'blue' ? '💎' : '⭐',
          size: 16,
          anchor: 'center',
          pos: k.vec2(0, 0),
        });
      });
    });

    // ── Enemies ─────────────────────────────────
    ENEMIES.forEach(({ x, y, min, max }) => {
      const enemy = k.add([
        k.rect(28, 28),
        k.pos(x, y),
        k.color(k.rgb(180, 50, 50)),
        k.outline(2, k.rgb(220, 90, 90)),
        k.anchor('bot'),
        k.area(),
        k.body(),
        { dir: 1, spd: 70, patrolMin: min, patrolMax: max },
        'enemy',
      ]);

      enemy.onDraw(() => {
        k.drawText({ text: '🐛', size: 20, anchor: 'center', pos: k.vec2(0, -16) });
      });

      enemy.onUpdate(() => {
        if (pausedRef.current) return;
        enemy.move(enemy.dir * enemy.spd, 0);
        if (enemy.pos.x > enemy.patrolMax || enemy.pos.x < enemy.patrolMin) {
          enemy.dir *= -1;
        }
      });
    });

    // ── Score display (in-canvas) ─────────────
    const camLabel = k.add([
      k.text('', { size: 14, font: 'monospace' }),
      k.pos(10, 10),
      k.color(k.rgb(200, 200, 255)),
      k.fixed(),
      k.z(100),
      'label',
    ]);

    // ── Finish flag ──────────────────────────────
    k.add([
      k.rect(16, 80),
      k.pos(WORLD_W - 60, GROUND_Y - 80),
      k.color(k.rgb(124, 58, 237)),
      k.area(),
      k.z(1),
      'finish',
    ]);
    k.add([
      k.rect(40, 22),
      k.pos(WORLD_W - 44, GROUND_Y - 80),
      k.color(k.rgb(6, 182, 212)),
      k.z(1),
    ]);

    // ── Collisions ──────────────────────────────

    // Player ↔ Coin
    k.onCollide('player', 'coin', (p, coin) => {
      if (pausedRef.current) return;
      onTipCollected(coin.tipData);
      onScoreChange(s => s + coin.pts);
      k.destroy(coin);
      // Check win
      if (k.get('coin').length === 0) {
        setTimeout(() => onWin(), 300);
      }
    });

    // Player ↔ Enemy
    k.onCollide('player', 'enemy', (p, enemy) => {
      if (pausedRef.current || player.invincible) return;
      // Stomp from above
      if (player.vel && player.vel.y > 50 && player.pos.y < enemy.pos.y - 10) {
        k.destroy(enemy);
        onScoreChange(s => s + 30);
        player.jump(400);
      } else {
        // Take damage
        player.invincible = true;
        player.lives--;
        onLivesChange(player.lives);
        player.pos = k.vec2(60, GROUND_Y - 50);
        k.wait(1.5, () => { player.invincible = false; });
      }
    });

    // Player ↔ Finish
    k.onCollide('player', 'finish', () => {
      onWin();
    });

    // ── Player controls ──────────────────────────
    k.onKeyDown('left',  () => { if (!pausedRef.current) player.move(-player.speed, 0); });
    k.onKeyDown('right', () => { if (!pausedRef.current) player.move(player.speed, 0); });
    k.onKeyDown('a',     () => { if (!pausedRef.current) player.move(-player.speed, 0); });
    k.onKeyDown('d',     () => { if (!pausedRef.current) player.move(player.speed, 0); });
    k.onKeyPress(['space', 'up', 'w'], () => {
      if (!pausedRef.current && player.isGrounded()) player.jump(520);
    });

    // ── Camera & update ──────────────────────────
    k.onUpdate(() => {
      // Camera follow X, fixed Y
      const camX = Math.max(W / 2, Math.min(player.pos.x, WORLD_W - W / 2));
      k.camPos(camX, H / 2);

      // Label
      camLabel.text = `⚛️ React Quest`;

      // Fall death
      if (player.pos.y > H + 80) {
        player.lives--;
        onLivesChange(player.lives);
        player.pos = k.vec2(60, GROUND_Y - 50);
        if (player.lives <= 0) player.lives = 1; // keep playing
      }
    });

    // ── Expose manual controls for mobile ───────
    k._manualControls = {
      left:  () => { if (!pausedRef.current) player.move(-player.speed, 0); },
      right: () => { if (!pausedRef.current) player.move(player.speed, 0); },
      jump:  () => { if (!pausedRef.current && player.isGrounded()) player.jump(520); },
    };
  });

  k.go('game');
  return k;
}

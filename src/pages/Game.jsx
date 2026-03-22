import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { startGame } from '../game/game';
import './Game.css';

/* ── Tip modal shown when a coin is collected ── */
function TipModal({ tip, lang, onClose }) {
  const { t } = useTranslation();
  const data = lang === 'en' ? tip.en : tip.es;
  const info = {
    gold: { label: lang === 'en' ? '🪙 Basic Tip' : '🪙 Tip Básico', cls: 'tip-gold' },
    blue: { label: lang === 'en' ? '💎 Advanced Tip' : '💎 Tip Avanzado', cls: 'tip-blue' },
    star: { label: lang === 'en' ? '⭐ Fun Fact' : '⭐ Dato Curioso', cls: 'tip-star' },
  }[tip.type];

  return (
    <div className="tip-overlay" onClick={onClose}>
      <div className={`tip-modal ${info.cls}`} onClick={e => e.stopPropagation()}>
        <div className="tip-modal-type">{info.label}</div>
        <h2 className="tip-modal-title">{data.title}</h2>
        <p className="tip-modal-body">{data.body}</p>
        {data.code && <pre className="tip-modal-code"><code>{data.code}</code></pre>}
        <button id="btn-tip-close" className="btn btn-primary tip-modal-btn" onClick={onClose}>
          {lang === 'en' ? '✅ Got it!' : '✅ ¡Entendido!'}
        </button>
      </div>
    </div>
  );
}

/* ── Win modal ──────────────────────────────── */
function WinModal({ score, lang, onRestart }) {
  return (
    <div className="tip-overlay">
      <div className="tip-modal tip-win">
        <div className="win-emoji">🎉</div>
        <h2>{lang === 'en' ? 'You win!' : '¡Ganaste!'}</h2>
        <p className="tip-modal-body">
          {lang === 'en' ? `Score: ${score} pts — React Master! 🚀` : `Puntaje: ${score} pts — ¡React Master! 🚀`}
        </p>
        <button id="btn-win-restart" className="btn btn-primary tip-modal-btn" onClick={onRestart}>
          {lang === 'en' ? '🔄 Play again' : '🔄 Jugar de nuevo'}
        </button>
      </div>
    </div>
  );
}

/* ── Game page ──────────────────────────────── */
export default function Game() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isEn = lang === 'en';

  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const pausedRef = useRef(false);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentTip, setCurrentTip] = useState(null);
  const [won, setWon] = useState(false);

  useEffect(() => { pausedRef.current = !!currentTip; }, [currentTip]);

  // Start game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameRef.current) return;
    gameRef.current = startGame(canvas, {
      onTipCollected: setCurrentTip,
      onScoreChange: setScore,
      onLivesChange: setLives,
      onWin: () => setWon(true),
      pausedRef,
    });
    canvas.focus();
    return () => {
      try { gameRef.current?.stop(); } catch (_) { }
      gameRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    setScore(0); setLives(3); setWon(false); setCurrentTip(null);
    try { gameRef.current?.stop(); } catch (_) { }
    gameRef.current = null;
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      gameRef.current = startGame(canvas, {
        onTipCollected: setCurrentTip,
        onScoreChange: setScore,
        onLivesChange: setLives,
        onWin: () => setWon(true),
        pausedRef,
      });
      canvas.focus();
    }, 80);
  };

  // Mobile button helpers
  const press = (action) => {
    const c = gameRef.current?.controls;
    if (!c) return;
    if (action === 'left') c.pressLeft();
    if (action === 'right') c.pressRight();
    if (action === 'jump') c.pressJump();
  };
  const release = (action) => {
    const c = gameRef.current?.controls;
    if (!c) return;
    if (action === 'left') c.releaseLeft();
    if (action === 'right') c.releaseRight();
    if (action === 'jump') c.releaseJump();
  };

  return (
    <div className="game-page">
      <div className="game-header">
        <div className="game-title">
          <h1>⚛️ <span className="gradient-text">React Quest</span></h1>
          <p className="game-subtitle">
            {isEn ? 'Collect coins to learn React — stomp the bugs!' : '¡Recoge monedas para aprender React — aplasta los bugs!'}
          </p>
        </div>
        <div className="game-stats">
          <div className="game-stat"><span className="stat-label">Score</span><span className="stat-value">{score}</span></div>
          <div className="game-stat"><span className="stat-label">{isEn ? 'Lives' : 'Vidas'}</span><span className="stat-value">{'❤️'.repeat(Math.max(0, lives))}</span></div>
        </div>
      </div>

      <div className="game-legend">
        <span className="legend-item legend-gold">🪙 {isEn ? 'Basic (10pts)' : 'Básico (10pts)'}</span>
        <span className="legend-item legend-blue">💡 {isEn ? 'Advanced (25pts)' : 'Avanzado (25pts)'}</span>
        <span className="legend-item legend-star">⭐ {isEn ? 'Fun fact (50pts)' : 'Dato curioso (50pts)'}</span>
        <span className="legend-item legend-enemy">🐛 {isEn ? 'Stomp from above!' : '¡Sáltale encima!'}</span>
      </div>

      <div className="game-canvas-wrapper" onClick={() => canvasRef.current?.focus()}>
        <canvas ref={canvasRef} id="react-quest-canvas" tabIndex={0} />
        {won && <WinModal score={score} lang={lang} onRestart={restart} />}
        {currentTip && !won && <TipModal tip={currentTip} lang={lang} onClose={() => setCurrentTip(null)} />}
      </div>

      <div className="game-controls-hint">
        <kbd>← →</kbd> / <kbd>A D</kbd> {isEn ? 'Move' : 'Mover'} &nbsp;|&nbsp;
        <kbd>Space</kbd> / <kbd>↑</kbd> / <kbd>W</kbd> {isEn ? 'Jump' : 'Saltar'} &nbsp;|&nbsp;
        {isEn ? '🐛 Stomp from above for +20pts' : '🐛 Sáltale encima por +20pts'}
      </div>

      <div className="game-mobile-controls">
        <button id="btn-game-left" className="mobile-btn"
          onPointerDown={() => press('left')} onPointerUp={() => release('left')} onPointerLeave={() => release('left')}>◀</button>
        <button id="btn-game-jump" className="mobile-btn mobile-btn-jump"
          onPointerDown={() => press('jump')} onPointerUp={() => release('jump')} onPointerLeave={() => release('jump')}>▲</button>
        <button id="btn-game-right" className="mobile-btn"
          onPointerDown={() => press('right')} onPointerUp={() => release('right')} onPointerLeave={() => release('right')}>▶</button>
      </div>
    </div>
  );
}

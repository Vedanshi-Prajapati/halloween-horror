import React, { useState, useEffect } from 'react';
import { playChime, playCardSelect } from '../utils/audio';
import CreatureSigil from './CreatureSigil';

export default function Result({ result, onRestart }) {
  const [toastMessage, setToastMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [activeTraitIndex, setActiveTraitIndex] = useState(null);

  useEffect(() => {
    // Play solemn iron bell chime on result reveal
    playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [result.id]);

  const handleShare = async () => {
    playCardSelect();
    const shareUrl = window.location.href.split('?')[0];
    const traitNames = result.traits.map((t) => (typeof t === 'string' ? t : t.name)).join(', ');
    const shareText = `In the shadows of “WHAT LURKS IN THE DARK?”, my soul walks as ${result.name} (${traitNames}). What dwells in yours?`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `WHAT LURKS IN THE DARK? — ${result.name}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setIsCopied(true);
      setToastMessage('TALE COPIED TO CLIPBOARD');
      setTimeout(() => {
        setIsCopied(false);
        setToastMessage('');
      }, 3000);
    } catch {
      setToastMessage('UNABLE TO COPY TALE');
      setTimeout(() => setToastMessage(''), 2500);
    }
  };

  const handlePlayAgain = () => {
    playCardSelect();
    onRestart();
  };

  const handleTraitClick = (idx) => {
    playCardSelect();
    setActiveTraitIndex(activeTraitIndex === idx ? null : idx);
  };

  return (
    <div className={`result-screen-container theme-${result.themeColor}`}>
      {/* Full-screen Character Illustration Backdrop */}
      <div className="result-backdrop-frame" aria-hidden="true">
        <img
          src={result.image}
          alt={result.name}
          className="result-backdrop-image result-slow-drift"
          loading="eager"
        />
        <div className="result-backdrop-shade" />
        <div className="result-atmospheric-mist" />
      </div>

      <div className="result-editorial-sheet">
        {/* Antique Corner Flourishes */}
        <span className="plate-corner-flourish top-left">┌</span>
        <span className="plate-corner-flourish top-right">┐</span>
        <span className="plate-corner-flourish bottom-left">└</span>
        <span className="plate-corner-flourish bottom-right">┘</span>

        {/* Creature Crest Sigil */}
        <div className="result-sigil-badge" aria-hidden="true">
          <CreatureSigil type={result.id} />
        </div>

        <header className="result-header">
          <div className="result-pretitle">
            <span className="flourish">❧</span>
            <span>THE VEIL IS TORN &middot; YOUR TRUE FORM</span>
            <span className="flourish">☙</span>
          </div>

          <h1 className="result-creature-title">
            {result.name}
          </h1>

          <p className="result-subtitle">
            {result.subtitle}
          </p>
        </header>

        {/* 3 Interactive Personality Traits */}
        <section className="result-traits-container" aria-label="Personality Traits">
          <div className="traits-interactive-hint">
            <span>CLICK A TRAIT TO UNLOCK ITS DARK LORE</span>
          </div>
          <div className="traits-grid">
            {result.traits.map((traitObj, idx) => {
              const name = typeof traitObj === 'string' ? traitObj : traitObj.name;
              const detail = typeof traitObj === 'string' ? null : traitObj.detail;
              const isActive = activeTraitIndex === idx;

              return (
                <div
                  key={idx}
                  className={`result-trait-card ${isActive ? 'card-active' : ''}`}
                  onClick={() => handleTraitClick(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleTraitClick(idx)}
                  aria-expanded={isActive}
                >
                  <div className="trait-card-header">
                    <span className="trait-dagger">†</span>
                    <span className="trait-label">{name}</span>
                    <span className="trait-toggle-icon">{isActive ? '▲' : '▼'}</span>
                  </div>
                  {detail && (
                    <div className="trait-card-detail">
                      <p>{detail}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Personality Narrative Description */}
        <section className="result-narrative-box">
          <p className="result-description-body">
            {result.description}
          </p>
          <blockquote className="result-epitaph-quote">
            {result.epitaph}
          </blockquote>
        </section>

        {/* Action Controls */}
        <footer className="result-action-controls">
          <button
            type="button"
            className="result-btn result-btn-primary"
            onClick={handlePlayAgain}
          >
            <span className="btn-frame-corner top-left" />
            <span className="btn-frame-corner top-right" />
            <span className="btn-frame-corner bottom-left" />
            <span className="btn-frame-corner bottom-right" />
            <span className="btn-icon">↺</span>
            <span>PLAY AGAIN</span>
          </button>

          <button
            type="button"
            className={`result-btn result-btn-secondary ${isCopied ? 'copied' : ''}`}
            onClick={handleShare}
          >
            <span className="btn-frame-corner top-left" />
            <span className="btn-frame-corner top-right" />
            <span className="btn-frame-corner bottom-left" />
            <span className="btn-frame-corner bottom-right" />
            <span className="btn-icon">{isCopied ? '✓' : '✦'}</span>
            <span>{isCopied ? 'TALE COPIED' : 'SHARE RESULT'}</span>
          </button>
        </footer>

        {/* Subtle toast message */}
        {toastMessage && (
          <div className="share-feedback-toast" role="status" aria-live="polite">
            <span className="toast-dot">◆</span>
            {toastMessage}
            <span className="toast-dot">◆</span>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { playChime, playCardSelect } from '../utils/audio';

export default function Result({ result, onRestart }) {
  const [toastMessage, setToastMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Play solemn iron bell chime on result reveal
    playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [result.id]);

  const handleShare = async () => {
    playCardSelect();
    const shareUrl = window.location.href.split('?')[0];
    const shareText = `In the shadows of “WHAT LURKS IN THE DARK?”, my soul walks as ${result.name} — ${result.traits.join(', ')}. What dwells in yours?`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `WHAT LURKS IN THE DARK? — ${result.name}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or fallback
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

  return (
    <div className={`result-screen-container theme-${result.themeColor}`}>
      {/* Full-screen Character Illustration Backdrop */}
      <div className="result-backdrop-frame" aria-hidden="true">
        <img
          src={result.image}
          alt={result.name}
          className="result-backdrop-image"
          loading="eager"
        />
        <div className="result-backdrop-shade" />
      </div>

      <div className="result-editorial-sheet">
        <header className="result-header">
          <div className="result-pretitle">
            <span className="flourish">❧</span>
            <span>THE VEIL IS TORN</span>
            <span className="flourish">☙</span>
          </div>

          <h1 className="result-creature-title">
            {result.name}
          </h1>

          <p className="result-subtitle">
            {result.subtitle}
          </p>
        </header>

        {/* 3 Personality Traits */}
        <section className="result-traits-container" aria-label="Personality Traits">
          {result.traits.map((trait, idx) => (
            <div key={idx} className="result-trait-pill">
              <span className="trait-dagger">†</span>
              <span className="trait-label">{trait}</span>
            </div>
          ))}
        </section>

        {/* Personality Description */}
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

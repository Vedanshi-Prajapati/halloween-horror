import React, { useState, useEffect } from 'react';
import { playChime, playCardSelect } from '../utils/audio';

export default function Result({ result, onRestart }) {
  const [toastMessage, setToastMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [result.id]);

  const handleShare = async () => {
    playCardSelect();
    const shareUrl = window.location.href.split('?')[0];
    const traitNames = result.traits.map((t) => (typeof t === 'string' ? t : t.name)).join(', ');
    const shareText = `In “WHAT LURKS IN THE DARK?”, my soul was revealed as ${result.name} (${traitNames}). Discover what walks in your shadow:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `WHAT LURKS IN THE DARK? — ${result.name}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setIsCopied(true);
      setToastMessage('RESULT COPIED TO CLIPBOARD');
      setTimeout(() => {
        setIsCopied(false);
        setToastMessage('');
      }, 3000);
    } catch {
      setToastMessage('UNABLE TO COPY');
      setTimeout(() => setToastMessage(''), 2000);
    }
  };

  const handlePlayAgain = () => {
    playCardSelect();
    onRestart();
  };

  return (
    <section className="screen-result-reveal">
      <div className="result-character-hero-frame">
        <img
          src={result.image}
          alt={result.name}
          className="result-character-image"
          loading="eager"
        />
        <div className="result-character-gradient-vignette" />
      </div>

      <div className="result-editorial-details">
        <header className="result-identity-header">
          <p className="result-kicker">YOUR NOCTURNAL ESSENCE</p>
          <h1 className="result-creature-title">
            {result.name}
          </h1>
          <p className="result-creature-subtitle">
            {result.subtitle}
          </p>
        </header>

        <div className="result-traits-row">
          {result.traits.map((traitObj, idx) => {
            const name = typeof traitObj === 'string' ? traitObj : traitObj.name;
            return (
              <span key={idx} className="result-trait-tag">
                {name}
              </span>
            );
          })}
        </div>

        <p className="result-narrative-summary">
          {result.description}
        </p>

        <div className="result-action-row">
          <button
            type="button"
            className="result-cta-btn primary"
            onClick={handlePlayAgain}
          >
            PLAY AGAIN
          </button>

          <button
            type="button"
            className={`result-cta-btn secondary ${isCopied ? 'copied' : ''}`}
            onClick={handleShare}
          >
            {isCopied ? 'COPIED' : 'SHARE RESULT'}
          </button>
        </div>

        {toastMessage && (
          <div className="result-share-toast" role="status">
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}

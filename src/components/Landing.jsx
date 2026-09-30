import React from 'react';
import { playCardSelect } from '../utils/audio';

export default function Landing({ onStart }) {
  const handleStart = () => {
    playCardSelect();
    onStart();
  };

  return (
    <div className="landing-screen-container">
      {/* Full-Screen Atmospheric Background Illustration */}
      <div className="landing-backdrop-wrapper" aria-hidden="true">
        <img
          src="/assets/landing.jpg"
          alt="Atmospheric nocturnal haunted landscape with vintage manor and glowing lantern"
          className="landing-backdrop-image"
          loading="eager"
        />
        <div className="landing-atmosphere-shade" />
        <div className="landing-lantern-flicker" />
      </div>

      {/* Editorial Content Frame */}
      <div className="landing-content-frame">
        <div className="landing-header-group">
          <div className="editorial-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">AN AUTUMN INQUIRY</span>
            <span className="eyebrow-line" />
          </div>

          <h1 className="landing-title">
            WHAT LURKS IN THE DARK?
          </h1>

          <p className="landing-description">
            A seven-question passage into the nocturnal corners of your spirit.
            Answer with honesty; the shadows are listening.
          </p>
        </div>

        <div className="landing-action-group">
          <button
            type="button"
            className="landing-cta-button"
            onClick={handleStart}
            autoFocus
          >
            <span className="cta-border-corner top-left" />
            <span className="cta-border-corner top-right" />
            <span className="cta-border-corner bottom-left" />
            <span className="cta-border-corner bottom-right" />
            <span className="cta-text">BEGIN THE QUIZ</span>
          </button>

          <div className="landing-meta-badge">
            <span className="meta-dot">◆</span>
            <span className="meta-label">7 QUESTIONS</span>
            <span className="meta-dot">◆</span>
          </div>
        </div>
      </div>
    </div>
  );
}

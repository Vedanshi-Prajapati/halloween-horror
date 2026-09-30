import React from 'react';
import { playCardSelect } from '../utils/audio';

export default function Landing({ onStart }) {
  const handleStart = () => {
    playCardSelect();
    onStart();
  };

  return (
    <section className="screen-landing">
      {/* Hero Fullscreen Artwork */}
      <div className="hero-artwork-canvas" aria-hidden="true">
        <img
          src="/assets/landing.jpg"
          alt="Haunted gothic forest and solitary lantern"
          className="hero-artwork-image"
          loading="eager"
        />
        <div className="hero-artwork-vignette" />
      </div>

      {/* Editorial Content — Integrated Directly into the Scene */}
      <div className="landing-editorial-flow">
        <header className="landing-titles">
          <p className="landing-kicker">AN INTERACTIVE INQUIRY</p>
          <h1 className="landing-masthead">
            WHAT LURKS IN THE DARK?
          </h1>
          <p className="landing-subline">
            Seven questions beneath the harvest moon to unearth what walks in your shadow.
          </p>
        </header>

        <div className="landing-actions">
          <button
            type="button"
            className="editorial-cta-btn"
            onClick={handleStart}
          >
            BEGIN
          </button>
          <p className="landing-meta">
            7 QUESTIONS &middot; 1 UNEXPECTED RESULT
          </p>
        </div>
      </div>
    </section>
  );
}

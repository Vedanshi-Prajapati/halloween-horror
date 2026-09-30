import React, { useRef, useEffect } from 'react';
import { playCardSelect } from '../utils/audio';

export default function Landing({ onStart }) {
  const containerRef = useRef(null);

  const handleStart = () => {
    playCardSelect();
    onStart();
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--torch-x', `${x}px`);
      containerRef.current.style.setProperty('--torch-y', `${y}px`);
      containerRef.current.style.setProperty('--torch-opacity', '1');
    };

    const handleLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--torch-opacity', '0');
    };

    const handleTouch = (e) => {
      if (!containerRef.current || !e.touches || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      containerRef.current.style.setProperty('--torch-x', `${x}px`);
      containerRef.current.style.setProperty('--torch-y', `${y}px`);
      containerRef.current.style.setProperty('--torch-opacity', '1');
    };

    window.addEventListener('mousemove', handleMove);
    document.removeEventListener('mouseleave', handleLeave);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return (
    <section className="screen-landing" ref={containerRef}>
      <div className="hero-artwork-canvas torchlight-target" aria-hidden="true">
        <img
          src="/assets/landing.jpg"
          alt="Haunted gothic forest and solitary lantern"
          className="hero-artwork-image"
          loading="eager"
        />
        <div className="hero-artwork-vignette" />
      </div>

      <div className="torchlight-beam" aria-hidden="true" />

      <div className="landing-editorial-flow">
        <header className="landing-titles">
          <p className="landing-kicker">AN UNEXPECTED INQUIRY</p>
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

import React, { useState } from 'react';
import { toggleAmbience } from '../utils/audio';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = toggleAmbience();
    setIsPlaying(active);
  };

  return (
    <button
      type="button"
      className={`audio-toggle-btn ${isPlaying ? 'active' : ''}`}
      onClick={handleToggle}
      title={isPlaying ? "Silence night wind" : "Awaken night wind"}
      aria-label={isPlaying ? "Mute atmosphere audio" : "Enable atmosphere audio"}
    >
      <span className="audio-toggle-icon">
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </span>
      <span className="audio-toggle-label">
        {isPlaying ? "WIND: ON" : "ATMOSPHERE"}
      </span>
    </button>
  );
}

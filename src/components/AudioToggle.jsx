import React, { useState, useEffect } from 'react';
import { toggleAmbience, subscribeAudioState } from '../utils/audio';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAudioState((active) => {
      setIsPlaying(active);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    toggleAmbience();
  };

  return (
    <button
      type="button"
      className={`audio-toggle-btn ${isPlaying ? 'active' : ''}`}
      onClick={handleToggle}
      title={isPlaying ? "Silence dark horror soundtrack" : "Awaken dark horror soundtrack"}
      aria-label={isPlaying ? "Mute horror background music" : "Play horror background music"}
      aria-pressed={isPlaying}
    >
      <span className="audio-toggle-icon" aria-hidden="true">
        {isPlaying ? (
          <span className="audio-equalizer">
            <span className="eq-bar bar-1" />
            <span className="eq-bar bar-2" />
            <span className="eq-bar bar-3" />
          </span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </span>
      <span className="audio-toggle-label">
        {isPlaying ? "BGM: ON" : "BGM: OFF"}
      </span>
    </button>
  );
}

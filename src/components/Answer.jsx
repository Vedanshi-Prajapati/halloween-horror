import React from 'react';
import { playCardSelect } from '../utils/audio';

const INDEX_LETTERS = ['A', 'B', 'C', 'D'];

export default function Answer({ answer, index, isSelected, onSelect, disabled }) {
  const handleClick = () => {
    if (disabled) return;
    playCardSelect();
    onSelect(answer);
  };

  return (
    <button
      type="button"
      className={`answer-button ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Choice ${INDEX_LETTERS[index]}: ${answer.text}`}
    >
      {/* Corner Bracket Micro-animations */}
      <span className="corner-pip top-left" />
      <span className="corner-pip top-right" />
      <span className="corner-pip bottom-left" />
      <span className="corner-pip bottom-right" />

      {/* Antique Seal Badge */}
      <span className="answer-index-badge">
        <span className="badge-letter">{INDEX_LETTERS[index]}</span>
        <span className="badge-key-hint">{index + 1}</span>
      </span>

      {/* Main Narrative Text */}
      <span className="answer-body-text">{answer.text}</span>

      {/* Selection Seal Mark */}
      <span className="answer-selection-mark">
        {isSelected ? '✦' : '·'}
      </span>
    </button>
  );
}

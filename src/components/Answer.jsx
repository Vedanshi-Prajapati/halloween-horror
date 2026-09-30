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
      <span className="answer-index-badge">{INDEX_LETTERS[index]}</span>
      <span className="answer-body-text">{answer.text}</span>
      <span className="answer-selection-mark" aria-hidden="true" />
    </button>
  );
}

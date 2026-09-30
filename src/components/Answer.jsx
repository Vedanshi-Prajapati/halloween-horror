import React from 'react';
import { playCardSelect } from '../utils/audio';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Answer({ answer, index, isSelected, onSelect, disabled }) {
  const handleClick = () => {
    if (disabled) return;
    playCardSelect();
    onSelect(answer);
  };

  return (
    <button
      type="button"
      className={`scene-answer-item ${isSelected ? 'is-selected' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Option ${LETTERS[index]}: ${answer.text}`}
    >
      <span className="answer-letter">{LETTERS[index]}</span>
      <span className="answer-text">{answer.text}</span>
    </button>
  );
}

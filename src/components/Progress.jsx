import React from 'react';

export default function Progress({ currentIndex, totalCount, roman, sceneTitle }) {
  return (
    <div className="quiz-progress-bar" aria-label={`Question ${currentIndex + 1} of ${totalCount}`}>
      <div className="progress-editorial-track">
        {Array.from({ length: totalCount }).map((_, idx) => (
          <div
            key={idx}
            className={`progress-pip ${idx === currentIndex ? 'current' : idx < currentIndex ? 'completed' : ''}`}
            title={`Question ${idx + 1}`}
          >
            {idx === currentIndex && <span className="pip-ember-glow" />}
          </div>
        ))}
      </div>
      <div className="progress-folio-text">
        <span className="progress-numeral">ACT {roman}</span>
        <span className="progress-divider">—</span>
        <span className="progress-count">QUESTION 0{currentIndex + 1} OF 0{totalCount}</span>
      </div>
    </div>
  );
}

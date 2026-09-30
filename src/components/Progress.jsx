import React from 'react';

export default function Progress({ currentIndex, totalCount, sceneTitle }) {
  return (
    <div className="scene-folio-tracker">
      <div className="folio-info">
        <span className="folio-scene-number">SCENE 0{currentIndex + 1} / 0{totalCount}</span>
        {sceneTitle && (
          <>
            <span className="folio-sep">&mdash;</span>
            <span className="folio-scene-title">{sceneTitle}</span>
          </>
        )}
      </div>
      <div className="folio-progress-line" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={totalCount}>
        <div
          className="folio-progress-fill"
          style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
        />
      </div>
    </div>
  );
}

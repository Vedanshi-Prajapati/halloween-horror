import React from 'react';

export default function GrainOverlay() {
  return (
    <>
      <svg className="svg-grain-filter" aria-hidden="true">
        <filter id="horror-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="grain-layer" aria-hidden="true" />
      <div className="vignette-layer" aria-hidden="true" />
    </>
  );
}

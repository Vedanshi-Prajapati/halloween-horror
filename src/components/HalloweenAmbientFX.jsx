import React, { useEffect, useState } from 'react';

export default function HalloweenAmbientFX() {
  const [torchPos, setTorchPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      setTorchPos({ x: xPercent.toFixed(1), y: yPercent.toFixed(1) });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="halloween-ambient-fx-layer" aria-hidden="true">
      <div
        className="torchlight-glow"
        style={{
          background: `radial-gradient(circle 420px at ${torchPos.x}% ${torchPos.y}%, rgba(199, 100, 38, 0.16) 0%, rgba(103, 33, 33, 0.06) 45%, transparent 75%)`,
        }}
      />

      <div className="creeping-fog-mist fog-layer-1" />
      <div className="creeping-fog-mist fog-layer-2" />

      <div className="ambient-gliding-raven" />
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Particle class for spectral mist & floating embers
    class EmberParticle {
      constructor(x, y, isBurst = false) {
        this.x = x;
        this.y = y;
        const angle = isBurst ? Math.random() * Math.PI * 2 : Math.random() * Math.PI * 2;
        const speed = isBurst ? 1.5 + Math.random() * 3.5 : 0.4 + Math.random() * 1.2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (isBurst ? 0.5 : 0.8); // float gently upwards
        this.size = isBurst ? 2.5 + Math.random() * 2.5 : 1.5 + Math.random() * 2;
        this.alpha = 1;
        this.decay = isBurst ? 0.03 + Math.random() * 0.03 : 0.02 + Math.random() * 0.025;
        // Warm pumpkin ember to spectral ash
        this.colorType = Math.random() > 0.4 ? 'ember' : 'ash';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.size = Math.max(0, this.size - 0.03);
      }

      draw(c) {
        if (this.alpha <= 0) return;
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        if (this.colorType === 'ember') {
          c.fillStyle = '#c76426';
          c.shadowColor = '#e67329';
          c.shadowBlur = 6;
        } else {
          c.fillStyle = '#eae2d2';
          c.shadowColor = '#fff';
          c.shadowBlur = 4;
        }
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0 || p.size <= 0) {
          particles.splice(i, 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };
    render();

    // Mouse movement
    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
      if (!isVisible) setIsVisible(true);

      // Spawn drifting embers based on speed
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 4 && particlesRef.current.length < 90) {
        particlesRef.current.push(new EmberParticle(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6));
      }
      lastPosRef.current = { x, y };

      // Check hover
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('.interactive') ||
        target.classList.contains('answer-button') ||
        target.classList.contains('result-trait-pill')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = (e) => {
      setIsClicking(true);
      // Burst of embers on click
      for (let i = 0; i < 14; i++) {
        particlesRef.current.push(new EmberParticle(e.clientX, e.clientY, true));
      }
    };

    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Background Canvas for Spectral Embers & Ash Dust */}
      <canvas ref={canvasRef} className="cursor-particles-canvas" aria-hidden="true" />

      {/* Handcrafted Gothic Ritual Dagger / Bone Needle Cursor */}
      <div
        className={`custom-gothic-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
        aria-hidden="true"
      >
        <svg
          className="dagger-svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blade Glow */}
          <path
            d="M5 5 L16 16 L12 20 L2 10 Z"
            fill="rgba(199, 100, 38, 0.25)"
            filter="blur(2px)"
          />
          {/* Ornate Dagger / Stiletto Blade */}
          <path
            d="M4 4 L14 14 L11 17 L2 8 Z"
            fill="#eae2d2"
            stroke="#1a1410"
            strokeWidth="0.8"
          />
          {/* Bloodline Ridge */}
          <path
            d="M4 4 L12 12"
            stroke="#681d1d"
            strokeWidth="0.75"
          />
          {/* Crossguard */}
          <path
            d="M10 18 L18 10 L19 11 L11 19 Z"
            fill="#9e7c52"
            stroke="#110d0a"
            strokeWidth="0.8"
          />
          {/* Ruby / Oxblood Pommel Gem */}
          <circle cx="14.5" cy="14.5" r="2" fill="#8a2020" stroke="#f2ece0" strokeWidth="0.5" />
          {/* Tang & Pommel */}
          <path
            d="M16 16 L23 23 L24 22 L17 15 Z"
            fill="#3a2e26"
            stroke="#110d0a"
            strokeWidth="0.7"
          />
          <circle cx="23.5" cy="23.5" r="2.2" fill="#c76426" stroke="#14110e" strokeWidth="0.6" />
        </svg>

        {/* Ambient Torch Aura */}
        <div className="cursor-aura-glow" />
      </div>
    </>
  );
}

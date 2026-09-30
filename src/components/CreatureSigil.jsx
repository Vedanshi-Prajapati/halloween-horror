import React from 'react';

export default function CreatureSigil({ type }) {
  if (type === 'vampire') {
    return (
      <svg className="creature-sigil-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        {/* Bat Wings & Chalice */}
        <path d="M16 18 C22 14, 28 20, 32 26 C36 20, 42 14, 48 18 C44 26, 42 34, 48 42 C40 38, 36 34, 32 38 C28 34, 24 38, 16 42 C22 34, 20 26, 16 18 Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Chalice / Goblet Stem & Bowl */}
        <path d="M26 24 C26 32, 38 32, 38 24 Z" strokeWidth="1.6" />
        <path d="M32 32 L32 44" strokeWidth="2" />
        <path d="M24 44 L40 44" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="20" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'witch') {
    return (
      <svg className="creature-sigil-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        {/* Cauldron & Crescent Moon */}
        <ellipse cx="32" cy="38" rx="16" ry="12" strokeWidth="1.6" />
        <path d="M20 38 C20 48, 44 48, 44 38" strokeWidth="1.6" />
        <path d="M22 47 L18 52" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 47 L46 52" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 47 L32 53" strokeWidth="2" strokeLinecap="round" />
        {/* Rising Vapor wisps */}
        <path d="M27 30 C25 24, 29 20, 27 15" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M32 30 C34 22, 30 18, 33 12" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M37 30 C39 25, 35 21, 38 16" strokeWidth="1.4" strokeLinecap="round" />
        {/* Crescent Moon */}
        <path d="M46 12 A6 6 0 1 1 40 18 A4 4 0 0 0 46 12 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }

  if (type === 'ghost') {
    return (
      <svg className="creature-sigil-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        {/* Spectral Apparition Veil */}
        <path d="M32 14 C22 14, 20 24, 20 32 C20 44, 23 48, 21 54 C23 52, 26 52, 28 54 C30 52, 34 52, 36 54 C38 52, 41 52, 43 54 C41 48, 44 44, 44 32 C44 24, 42 14, 32 14 Z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Hollow Eyes */}
        <ellipse cx="28" cy="28" rx="2" ry="3.5" fill="currentColor" />
        <ellipse cx="36" cy="28" rx="2" ry="3.5" fill="currentColor" />
        <ellipse cx="32" cy="38" rx="1.5" ry="3" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'werewolf') {
    return (
      <svg className="creature-sigil-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        {/* Wolf Silhouette & Claw Slash */}
        <path d="M22 42 L20 28 L27 33 L32 18 L37 33 L44 28 L42 42 C40 48, 24 48, 22 42 Z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="34" r="1.5" fill="currentColor" />
        <circle cx="36" cy="34" r="1.5" fill="currentColor" />
        {/* Triple Claw Slash Marks */}
        <path d="M12 16 L18 26" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 12 L23 23" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M47 12 L53 23" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  // Reaper
  return (
    <svg className="creature-sigil-svg" viewBox="0 0 64 64" fill="none" stroke="currentColor">
      {/* Scythe & Hourglass */}
      <path d="M18 48 L46 16" strokeWidth="2" strokeLinecap="round" />
      {/* Scythe Blade */}
      <path d="M46 16 C48 10, 40 8, 30 11 C23 13, 18 18, 14 26 C20 21, 28 17, 46 16 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Hourglass */}
      <path d="M44 40 L52 40 L48 45 L52 50 L44 50 L48 45 Z" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="48" cy="45" r="0.8" fill="currentColor" />
    </svg>
  );
}

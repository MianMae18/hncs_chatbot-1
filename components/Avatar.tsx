import React from 'react';

export default function Avatar({ size = 36 }: { size?: number }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Assistant avatar"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--main-color)" />
          <stop offset="100%" stopColor="#7a1414" />
        </linearGradient>
        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter="url(#f1)">
        <circle cx="32" cy="32" r="28" fill="url(#g1)" />
      </g>

      <g transform="translate(0,0)">
        {/* Minimal two-eye face: two white rounded eyes, no mouth */}
        <ellipse cx="22.5" cy="30" rx="4.8" ry="6" fill="#ffffff" />
        <ellipse cx="41.5" cy="30" rx="4.8" ry="6" fill="#ffffff" />
        {/* small inner dots for subtle pupil contrast using slight maroon */}
        <circle cx="22.5" cy="30" r="1.2" fill="#7a1414" opacity="0.95" />
        <circle cx="41.5" cy="30" r="1.2" fill="#7a1414" opacity="0.95" />
      </g>
    </svg>
  );
}

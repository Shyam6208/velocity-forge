import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchIntensity?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className = '',
  glitchIntensity = 0.1
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [glitchIntensity]);

  return (
    <span
      className={`relative inline-block ${className} ${
        isGlitching ? 'animate-glitch' : ''
      }`}
      data-text={children}
    >
      {children}
    </span>
  );
};
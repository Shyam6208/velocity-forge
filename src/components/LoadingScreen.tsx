import React, { useEffect, useState } from 'react';
import { Car } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');

  useEffect(() => {
    const texts = ['INITIALIZING', 'LOADING ASSETS', 'PREPARING EXPERIENCE', 'ALMOST READY'];
    let textIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += Math.random() * 15 + 5;
      
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        setTimeout(onComplete, 500);
        clearInterval(interval);
      } else {
        setProgress(progressValue);
        
        if (progressValue > 25 && textIndex === 0) {
          setLoadingText(texts[1]);
          textIndex = 1;
        } else if (progressValue > 50 && textIndex === 1) {
          setLoadingText(texts[2]);
          textIndex = 2;
        } else if (progressValue > 75 && textIndex === 2) {
          setLoadingText(texts[3]);
          textIndex = 3;
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-12">
          <div className="w-24 h-24 glass-morphism rounded-3xl flex items-center justify-center mx-auto mb-6 pulse-glow">
            <Car className="h-12 w-12 text-white rotate-slow" />
          </div>
          
          {/* Floating particles around logo */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full floating-animation"
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Brand Name */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-white mb-2 animate-fadeInUp">
            VelocityForge
          </h1>
          <p className="text-lg font-semibold text-orange-200 tracking-widest animate-fadeInUp stagger-1">
            AUTOMOTIVE
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-80 mx-auto mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/80 text-sm font-medium">{loadingText}</span>
            <span className="text-white font-bold">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white/60 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
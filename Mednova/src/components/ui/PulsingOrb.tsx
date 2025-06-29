import React from 'react';
import { motion } from 'framer-motion';

interface PulsingOrbProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const PulsingOrb: React.FC<PulsingOrbProps> = ({
  size = 'md',
  color = 'bio',
  intensity = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const intensitySettings = {
    low: { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5], duration: 3 },
    medium: { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6], duration: 2 },
    high: { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7], duration: 1.5 }
  };

  const settings = intensitySettings[intensity];

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-${color}-500 to-${color}-600 shadow-glow-md ${className}`}
      animate={{
        scale: settings.scale,
        opacity: settings.opacity,
      }}
      transition={{
        duration: settings.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
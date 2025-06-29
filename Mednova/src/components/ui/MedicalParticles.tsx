import React from 'react';
import { motion } from 'framer-motion';

interface MedicalParticlesProps {
  count?: number;
  className?: string;
}

export const MedicalParticles: React.FC<MedicalParticlesProps> = ({ 
  count = 15, 
  className = '' 
}) => {
  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -100, 0],
      x: [0, Math.sin(i) * 50, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.3
      }
    })
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-bio-400 to-medical-500 rounded-full shadow-glow-sm"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '0%',
          }}
          variants={particleVariants}
          animate="animate"
          custom={i}
        />
      ))}
    </div>
  );
};
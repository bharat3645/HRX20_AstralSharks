import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Dna, Microscope, Stethoscope, Brain, Activity, Zap, Star } from 'lucide-react';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  count = 8, 
  className = '' 
}) => {
  const medicalIcons = [Heart, Dna, Microscope, Stethoscope, Brain, Activity, Zap, Star];
  const colors = ['text-bio-400/20', 'text-medical-400/20', 'text-neural-400/20', 'text-blood-400/20'];

  const floatingVariants = {
    float: (i: number) => ({
      y: [0, -20, 0],
      x: [0, Math.sin(i) * 10, 0],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const Icon = medicalIcons[i % medicalIcons.length];
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${color}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="float"
            custom={i}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        );
      })}
    </div>
  );
};
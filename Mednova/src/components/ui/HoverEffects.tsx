import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Zap, Star } from 'lucide-react';

interface HoverEffectsProps {
  children: React.ReactNode;
  effect?: 'sparkle' | 'glow' | 'float' | 'medical';
  className?: string;
}

export const HoverEffects: React.FC<HoverEffectsProps> = ({
  children,
  effect = 'sparkle',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (effect === 'sparkle') {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));
      setParticles(newParticles);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParticles([]);
  };

  const effectVariants = {
    sparkle: {
      scale: isHovered ? 1.05 : 1,
      transition: { duration: 0.3 }
    },
    glow: {
      scale: isHovered ? 1.02 : 1,
      boxShadow: isHovered 
        ? '0 0 30px rgba(34, 197, 94, 0.6)' 
        : '0 0 0px rgba(34, 197, 94, 0)',
      transition: { duration: 0.3 }
    },
    float: {
      y: isHovered ? -10 : 0,
      scale: isHovered ? 1.03 : 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    medical: {
      scale: isHovered ? 1.05 : 1,
      rotateY: isHovered ? 5 : 0,
      transition: { duration: 0.3 }
    }
  };

  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1, 0], 
      opacity: [0, 1, 0],
      y: [0, -20],
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={effectVariants}
      animate={effect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Sparkle particles */}
      <AnimatePresence>
        {effect === 'sparkle' && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            variants={particleVariants}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            {particle.id % 4 === 0 && <Sparkles className="w-4 h-4 text-bio-400" />}
            {particle.id % 4 === 1 && <Heart className="w-3 h-3 text-blood-400" />}
            {particle.id % 4 === 2 && <Zap className="w-3 h-3 text-medical-400" />}
            {particle.id % 4 === 3 && <Star className="w-3 h-3 text-neural-400" />}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Medical pulse effect */}
      {effect === 'medical' && isHovered && (
        <motion.div
          className="absolute inset-0 border-2 border-bio-400/50 rounded-xl"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};
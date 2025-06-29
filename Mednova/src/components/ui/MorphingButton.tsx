import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Check, X, Heart, Brain, Zap, Star, Sparkles } from 'lucide-react';

interface MorphingButtonProps {
  states: Array<{
    icon: React.ComponentType<any>;
    label: string;
    color: string;
    action: () => void;
  }>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MorphingButton: React.FC<MorphingButtonProps> = ({
  states,
  className = '',
  size = 'md'
}) => {
  const [currentState, setCurrentState] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg'
  };

  const handleClick = () => {
    setIsTransitioning(true);
    states[currentState].action();
    
    setTimeout(() => {
      setCurrentState((prev) => (prev + 1) % states.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentStateData = states[currentState];
  const CurrentIcon = currentStateData.icon;

  return (
    <motion.button
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-full font-semibold text-white
        ${sizeClasses[size]} ${className}
        bg-gradient-to-r from-${currentStateData.color}-500 to-${currentStateData.color}-600
        hover:from-${currentStateData.color}-600 hover:to-${currentStateData.color}-700
        shadow-glow-md hover:shadow-glow-lg transition-all duration-300
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        rotate: isTransitioning ? 360 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Morphing background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: `conic-gradient(from 0deg, 
            var(--${currentStateData.color}-500), 
            var(--${currentStateData.color}-600), 
            var(--${currentStateData.color}-500))`,
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Particle explosion effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45 * Math.PI / 180) * 30,
                  y: Math.sin(i * 45 * Math.PI / 180) * 30,
                }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Icon with morphing animation */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full"
        animate={{
          scale: isTransitioning ? [1, 0, 1] : 1,
          rotate: isTransitioning ? [0, 180, 360] : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <CurrentIcon className="w-6 h-6" />
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={{
          scale: isTransitioning ? [1, 2] : 1,
          opacity: isTransitioning ? [0.5, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};
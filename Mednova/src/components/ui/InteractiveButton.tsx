import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'magical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    onClick?.();
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-bio-500 to-medical-600 hover:from-bio-600 hover:to-medical-700',
    secondary: 'bg-gradient-to-r from-neural-500 to-neural-600 hover:from-neural-600 hover:to-neural-700',
    magical: 'bg-gradient-to-r from-blood-500 via-neural-500 to-bio-500 hover:from-blood-600 hover:via-neural-600 hover:to-bio-600'
  };

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: { 
      scale: [0, 1, 0], 
      rotate: [0, 180, 360],
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl font-semibold text-white shadow-medical
        transition-all duration-300 backdrop-blur-lg border border-white/10
        ${sizeClasses[size]} ${variantClasses[variant]} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-glow-lg'}
      `}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Sparkle effects */}
      {isClicked && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
            >
              {i % 2 === 0 ? <Sparkles className="w-4 h-4" /> : <Zap className="w-3 h-3" />}
            </motion.div>
          ))}
        </>
      )}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};
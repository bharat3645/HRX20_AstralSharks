import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  gradient = false,
  onClick
}) => {
  const baseClasses = 'rounded-xl border transition-all duration-300';
  const backgroundClasses = gradient 
    ? 'bg-gradient-to-br from-dark-950/90 to-dark-900/80 backdrop-blur-xl' 
    : 'bg-dark-950/90 backdrop-blur-xl';
  const hoverClasses = hover 
    ? 'hover:shadow-dark-lg cursor-pointer hover:bg-dark-900/80 hover:border-bio-500/30' 
    : '';

  return (
    <motion.div
      className={`${baseClasses} ${backgroundClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
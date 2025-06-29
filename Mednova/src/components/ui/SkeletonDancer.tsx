import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Bone } from 'lucide-react';

interface SkeletonDancerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const SkeletonDancer: React.FC<SkeletonDancerProps> = ({ 
  size = 'md', 
  color = 'text-bone-400',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const skeletonVariants = {
    dance: {
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
      y: [0, -5, 5, -3, 3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const boneVariants = {
    wiggle: {
      rotate: [0, 5, -5, 3, -3, 0],
      x: [0, 2, -2, 1, -1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} ${color} cursor-pointer`}
        variants={skeletonVariants}
        animate="dance"
        whileHover="hover"
      >
        <Skull className="w-full h-full drop-shadow-lg" />
      </motion.div>
      
      {/* Dancing bones around the skull */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 text-bone-300"
        variants={boneVariants}
        animate="wiggle"
      >
        <Bone className="w-full h-full" />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-1 -left-1 w-3 h-3 text-bone-300"
        variants={boneVariants}
        animate="wiggle"
        style={{ animationDelay: '0.5s' }}
      >
        <Bone className="w-full h-full rotate-45" />
      </motion.div>
    </div>
  );
};
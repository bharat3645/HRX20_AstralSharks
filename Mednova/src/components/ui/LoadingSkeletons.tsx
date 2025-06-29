import React from 'react';
import { motion } from 'framer-motion';
import { SkeletonDancer } from './SkeletonDancer';

interface LoadingSkeletonsProps {
  count?: number;
  type?: 'card' | 'list' | 'dashboard';
  className?: string;
}

export const LoadingSkeletons: React.FC<LoadingSkeletonsProps> = ({
  count = 3,
  type = 'card',
  className = ''
}) => {
  const shimmerVariants = {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const CardSkeleton = () => (
    <div className="bg-gradient-to-br from-bone-800/50 to-bone-700/50 border border-bio-600/30 rounded-xl p-6 backdrop-blur-lg relative overflow-hidden">
      <div className="flex items-center space-x-4 mb-4">
        <SkeletonDancer size="md" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-bone-600/50 rounded-lg w-3/4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
          <div className="h-3 bg-bone-600/50 rounded-lg w-1/2 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-bone-600/50 rounded w-full relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
        <div className="h-3 bg-bone-600/50 rounded w-4/5 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="bg-gradient-to-br from-bone-800/50 to-bone-700/50 border border-bio-600/30 rounded-lg p-4 backdrop-blur-lg flex items-center space-x-4">
      <SkeletonDancer size="sm" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-bone-600/50 rounded w-2/3 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
        <div className="h-3 bg-bone-600/50 rounded w-1/3 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      </div>
    </div>
  );

  const DashboardSkeleton = () => (
    <div className="bg-gradient-to-br from-bone-800/50 to-bone-700/50 border border-bio-600/30 rounded-xl p-6 backdrop-blur-lg">
      <div className="flex items-center justify-between mb-6">
        <SkeletonDancer size="lg" />
        <div className="h-8 bg-bone-600/50 rounded-lg w-24 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-4 bg-bone-600/50 rounded w-full relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-bio-400/20 to-transparent"
              variants={shimmerVariants}
              animate="animate"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const SkeletonComponent = {
    card: CardSkeleton,
    list: ListSkeleton,
    dashboard: DashboardSkeleton
  }[type];

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <SkeletonComponent />
        </motion.div>
      ))}
    </div>
  );
};
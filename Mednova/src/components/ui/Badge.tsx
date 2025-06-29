import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full backdrop-blur-lg';
  
  const variantClasses = {
    default: 'bg-dark-800/80 text-bone-200 border border-bone-500/30',
    success: 'bg-bio-500/20 text-bio-400 border border-bio-500/30',
    warning: 'bg-blood-500/20 text-blood-400 border border-blood-500/30',
    error: 'bg-blood-500/20 text-blood-400 border border-blood-500/30',
    info: 'bg-medical-500/20 text-medical-400 border border-medical-500/30'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};
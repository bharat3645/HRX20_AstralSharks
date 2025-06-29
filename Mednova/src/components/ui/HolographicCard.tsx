import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'intense';
  glowColor?: string;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className = '',
  intensity = 'medium',
  glowColor = 'bio'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const intensitySettings = {
    subtle: { scale: 1.02, glow: 0.3, rotate: 0.5 },
    medium: { scale: 1.05, glow: 0.5, rotate: 1 },
    intense: { scale: 1.08, glow: 0.8, rotate: 1.5 }
  };

  const settings = intensitySettings[intensity];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * settings.rotate);
    y.set(yPct * settings.rotate);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? settings.scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`relative ${className}`}
    >
      {/* Holographic background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-bone-800/50 to-bone-700/50 backdrop-blur-xl border border-bio-500/30" />
      
      {/* Holographic overlay */}
      <motion.div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${glowColor}-500/10 via-transparent to-${glowColor}-600/10`}
        animate={{
          opacity: isHovered ? settings.glow : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(135deg, transparent 30%, rgba(34, 197, 94, 0.1) 50%, transparent 70%)`,
        }}
        animate={{
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      
      {/* Holographic border glow */}
      <motion.div
        className={`absolute inset-0 rounded-xl border-2 border-${glowColor}-400/50`}
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? `0 0 30px rgba(34, 197, 94, ${settings.glow})` 
            : '0 0 0px rgba(34, 197, 94, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
};
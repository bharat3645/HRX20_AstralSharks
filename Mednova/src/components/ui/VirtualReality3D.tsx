import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, EyeOff, Maximize, Minimize } from 'lucide-react';

interface VirtualReality3DProps {
  children: React.ReactNode;
  depth?: number;
  perspective?: number;
  className?: string;
}

export const VirtualReality3D: React.FC<VirtualReality3DProps> = ({
  children,
  depth = 100,
  perspective = 1000,
  className = ''
}) => {
  const [isVRMode, setIsVRMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleVR = () => {
    setIsVRMode(!isVRMode);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''} ${className}`}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* VR Controls */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <motion.button
          onClick={toggleVR}
          className={`p-2 rounded-lg backdrop-blur-lg transition-all duration-200 ${
            isVRMode 
              ? 'bg-bio-500/20 text-bio-400 border border-bio-500/30' 
              : 'bg-bone-800/50 text-bone-400 border border-bone-600/30'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isVRMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </motion.button>
        
        <motion.button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg bg-bone-800/50 text-bone-400 border border-bone-600/30 backdrop-blur-lg hover:bg-bio-500/20 hover:text-bio-400 transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* 3D Container */}
      <motion.div
        style={{
          rotateX: isVRMode ? rotateX : 0,
          rotateY: isVRMode ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Main Content */}
        <motion.div
          style={{
            transform: `translateZ(${depth}px)`,
          }}
          className="relative w-full h-full"
        >
          {children}
        </motion.div>

        {/* 3D Layers */}
        {isVRMode && (
          <>
            {/* Background layer */}
            <motion.div
              style={{
                transform: `translateZ(-${depth}px)`,
              }}
              className="absolute inset-0 bg-gradient-to-br from-bio-900/10 to-medical-900/10 rounded-xl opacity-30"
            />
            
            {/* Floating elements */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                style={{
                  transform: `translateZ(${(i - 4) * 20}px)`,
                }}
                className="absolute w-4 h-4 bg-gradient-to-r from-bio-400 to-medical-500 rounded-full opacity-60"
                animate={{
                  x: [0, Math.sin(i) * 50],
                  y: [0, Math.cos(i) * 50],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  transform: `translateZ(${(i - 4) * 20}px)`,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* VR Overlay Effects */}
      {isVRMode && (
        <>
          {/* Depth of field blur */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
          </div>
          
          {/* Chromatic aberration effect */}
          <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20">
            <div className="absolute inset-0 bg-red-500 translate-x-1" />
            <div className="absolute inset-0 bg-blue-500 -translate-x-1" />
          </div>
        </>
      )}
    </div>
  );
};
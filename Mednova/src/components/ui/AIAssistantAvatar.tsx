import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Stethoscope, Microscope, MessageCircle, Sparkles, Zap } from 'lucide-react';

interface AIAssistantAvatarProps {
  mood?: 'happy' | 'thinking' | 'excited' | 'focused' | 'helping';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isActive?: boolean;
  className?: string;
  onInteract?: () => void;
}

export const AIAssistantAvatar: React.FC<AIAssistantAvatarProps> = ({
  mood = 'happy',
  size = 'md',
  isActive = false,
  className = '',
  onInteract
}) => {
  const [currentExpression, setCurrentExpression] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const moodColors = {
    happy: 'from-bio-400 to-bio-600',
    thinking: 'from-neural-400 to-neural-600',
    excited: 'from-blood-400 to-blood-600',
    focused: 'from-medical-400 to-medical-600',
    helping: 'from-bio-400 via-medical-500 to-neural-600'
  };

  const expressions = {
    happy: ['😊', '😄', '🙂'],
    thinking: ['🤔', '💭', '🧠'],
    excited: ['🤩', '✨', '🎉'],
    focused: ['😌', '🎯', '👁️'],
    helping: ['🤝', '💡', '🔬']
  };

  // Auto-blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Expression cycling
  useEffect(() => {
    const expressionInterval = setInterval(() => {
      setCurrentExpression(prev => (prev + 1) % expressions[mood].length);
    }, 2000);

    return () => clearInterval(expressionInterval);
  }, [mood]);

  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1, 0], 
      opacity: [0, 1, 0],
      y: [0, -20],
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
      onClick={onInteract}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Main Avatar Body */}
      <motion.div
        className={`w-full h-full rounded-full bg-gradient-to-br ${moodColors[mood]} shadow-glow-lg relative overflow-hidden`}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
          boxShadow: isActive 
            ? ['0 0 20px rgba(34, 197, 94, 0.5)', '0 0 30px rgba(34, 197, 94, 0.8)', '0 0 20px rgba(34, 197, 94, 0.5)']
            : '0 0 20px rgba(34, 197, 94, 0.3)',
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, white 2px, transparent 2px)',
              'radial-gradient(circle at 80% 80%, white 2px, transparent 2px)',
              'radial-gradient(circle at 20% 80%, white 2px, transparent 2px)',
              'radial-gradient(circle at 80% 20%, white 2px, transparent 2px)',
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Face Expression */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-2xl"
            animate={{
              scale: isBlinking ? [1, 1, 0.1, 1] : 1,
            }}
            transition={{ duration: 0.15 }}
          >
            {expressions[mood][currentExpression]}
          </motion.div>
        </div>

        {/* Neural network overlay */}
        {mood === 'thinking' && (
          <svg className="absolute inset-0 w-full h-full opacity-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={`${20 + i * 12}%`}
                cy={`${30 + (i % 2) * 40}%`}
                r="2"
                fill="white"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </svg>
        )}
      </motion.div>

      {/* Floating Icons */}
      <AnimatePresence>
        {isActive && (
          <>
            {[Brain, Heart, Stethoscope, Microscope].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 90 * Math.PI / 180) * 40,
                  y: Math.sin(i * 90 * Math.PI / 180) * 40,
                  rotate: [0, 360],
                }}
                exit={{ scale: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                <Icon className="w-4 h-4 text-white" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Particle Effects */}
      <AnimatePresence>
        {isActive && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                exit="initial"
                transition={{
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Speech Bubble */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 10 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium shadow-lg"
        >
          <MessageCircle className="w-3 h-3 inline mr-1" />
          How can I help?
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
        </motion.div>
      )}

      {/* Pulse Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={{
          scale: isActive ? [1, 1.3, 1] : 1,
          opacity: isActive ? [0.5, 0, 0.5] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
};
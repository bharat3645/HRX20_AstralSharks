import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Dna, Brain, Microscope, Stethoscope, Activity, Zap, Star, Sparkles } from 'lucide-react';

interface AdvancedAnimationsProps {
  type: 'dna-helix' | 'heartbeat-wave' | 'neural-network' | 'medical-constellation' | 'particle-storm';
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  className?: string;
}

export const AdvancedAnimations: React.FC<AdvancedAnimationsProps> = ({
  type,
  intensity = 'medium',
  className = ''
}) => {
  const intensitySettings = {
    low: { count: 5, speed: 3, scale: 1 },
    medium: { count: 10, speed: 2, scale: 1.2 },
    high: { count: 15, speed: 1.5, scale: 1.5 },
    extreme: { count: 25, speed: 1, scale: 2 }
  };

  const settings = intensitySettings[intensity];

  const DNAHelix = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: settings.count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 8}%`,
            top: '50%',
          }}
          animate={{
            y: [0, -50, 50, 0],
            rotate: [0, 360],
            scale: [1, settings.scale, 1],
          }}
          transition={{
            duration: settings.speed,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        >
          <Dna className="w-6 h-6 text-bio-400/60" />
        </motion.div>
      ))}
    </div>
  );

  const HeartbeatWave = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 400 100">
        <motion.path
          d="M0,50 Q100,10 200,50 T400,50"
          stroke="url(#heartbeat-gradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: settings.speed,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="heartbeat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="1" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${i * 20}%`,
            top: '40%',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Heart className="w-4 h-4 text-blood-400 fill-current" />
        </motion.div>
      ))}
    </div>
  );

  const NeuralNetwork = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full opacity-30">
        {Array.from({ length: settings.count }).map((_, i) => {
          const x1 = Math.random() * 100;
          const y1 = Math.random() * 100;
          const x2 = Math.random() * 100;
          const y2 = Math.random() * 100;
          
          return (
            <motion.line
              key={i}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#a855f7"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: settings.speed,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          );
        })}
      </svg>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Brain className="w-5 h-5 text-neural-400" />
        </motion.div>
      ))}
    </div>
  );

  const MedicalConstellation = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: settings.count }).map((_, i) => {
        const icons = [Heart, Stethoscope, Microscope, Activity, Brain];
        const Icon = icons[i % icons.length];
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: settings.speed * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-4 h-4 text-medical-400/50" />
          </motion.div>
        );
      })}
    </div>
  );

  const ParticleStorm = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: settings.count * 2 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-bio-400 to-medical-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [0, settings.scale, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: settings.speed,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeOut"
          }}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        >
          <Sparkles className="w-3 h-3 text-bio-400/70" />
        </motion.div>
      ))}
    </div>
  );

  const animations = {
    'dna-helix': DNAHelix,
    'heartbeat-wave': HeartbeatWave,
    'neural-network': NeuralNetwork,
    'medical-constellation': MedicalConstellation,
    'particle-storm': ParticleStorm
  };

  const AnimationComponent = animations[type];

  return (
    <div className={`relative ${className}`}>
      <AnimationComponent />
    </div>
  );
};
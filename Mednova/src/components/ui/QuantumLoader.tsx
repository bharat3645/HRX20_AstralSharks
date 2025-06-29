import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Heart, Brain, Microscope, Stethoscope } from 'lucide-react';

interface QuantumLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'dna' | 'medical' | 'neural' | 'quantum';
  className?: string;
}

export const QuantumLoader: React.FC<QuantumLoaderProps> = ({
  size = 'md',
  type = 'quantum',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const DNALoader = () => (
    <div className="relative">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        >
          <Dna className="w-full h-full text-bio-400" style={{ 
            transform: `rotate(${i * 60}deg) translateY(-50%)` 
          }} />
        </motion.div>
      ))}
    </div>
  );

  const MedicalLoader = () => {
    const icons = [Heart, Stethoscope, Microscope, Brain];
    
    return (
      <div className="relative">
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-8 h-8 text-medical-400" />
          </motion.div>
        ))}
      </div>
    );
  };

  const NeuralLoader = () => (
    <div className="relative">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          const x = 50 + 30 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 30 * Math.sin((angle * Math.PI) / 180);
          
          return (
            <g key={i}>
              <motion.line
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="#a855f7"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1,
                }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="3"
                fill="#a855f7"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            </g>
          );
        })}
        <motion.circle
          cx="50"
          cy="50"
          r="5"
          fill="#a855f7"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </svg>
    </div>
  );

  const QuantumLoader = () => (
    <div className="relative">
      {Array.from({ length: 3 }).map((_, ring) => (
        <motion.div
          key={ring}
          className="absolute inset-0 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: ring === 0 ? '#22c55e' : ring === 1 ? '#0ea5e9' : '#a855f7',
            borderRightColor: ring === 0 ? '#22c55e' : ring === 1 ? '#0ea5e9' : '#a855f7',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5 - ring * 0.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Quantum particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-bio-400 to-medical-500 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * 60 * Math.PI / 180) * 20],
            y: [0, Math.sin(i * 60 * Math.PI / 180) * 20],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const loaders = {
    dna: DNALoader,
    medical: MedicalLoader,
    neural: NeuralLoader,
    quantum: QuantumLoader
  };

  const LoaderComponent = loaders[type];

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <LoaderComponent />
    </div>
  );
};
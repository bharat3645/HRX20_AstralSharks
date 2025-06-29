import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, BookOpen, Brain, Stethoscope, Award, Target, TrendingUp, ArrowRight, Play, CheckCircle, Clock, Zap, Star, Heart, Microscope, Swords, FileText, Sparkles, Dna, HeartPulse as Pulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMedicalStore } from '../../store/medicalStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AdvancedAnimations } from '../ui/AdvancedAnimations';
import { HolographicCard } from '../ui/HolographicCard';
import { MorphingButton } from '../ui/MorphingButton';
import { VirtualReality3D } from '../ui/VirtualReality3D';
import { AIAssistantAvatar } from '../ui/AIAssistantAvatar';
import { QuantumLoader } from '../ui/QuantumLoader';

export const EnhancedMedicalDashboard: React.FC = () => {
  const { user, selectedDomain, userProgress } = useMedicalStore();
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user || !selectedDomain) return null;

  const morphingButtonStates = [
    {
      icon: Play,
      label: 'Start',
      color: 'bio',
      action: () => console.log('Starting...')
    },
    {
      icon: Pulse,
      label: 'Active',
      color: 'blood',
      action: () => console.log('Active...')
    },
    {
      icon: CheckCircle,
      label: 'Complete',
      color: 'medical',
      action: () => console.log('Complete!')
    }
  ];

  const stats = [
    {
      label: 'Medical XP',
      value: userProgress?.total_xp || 2450,
      change: '+125 today',
      icon: Award,
      color: 'blood',
      gradient: 'from-blood-500 to-blood-600'
    },
    {
      label: 'Clinical Level',
      value: user.level,
      change: '45% to next',
      icon: TrendingUp,
      color: 'neural',
      gradient: 'from-neural-500 to-neural-600'
    },
    {
      label: 'Study Streak',
      value: user.streak,
      change: 'Personal best!',
      icon: Target,
      color: 'bio',
      gradient: 'from-bio-500 to-bio-600'
    },
    {
      label: 'Cases Solved',
      value: '87%',
      change: '+12% this week',
      icon: Activity,
      color: 'medical',
      gradient: 'from-medical-500 to-medical-600'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-medical relative overflow-hidden">
      {/* Advanced Background Animations */}
      <AdvancedAnimations type="medical-constellation" intensity="medium" className="opacity-20" />
      <AdvancedAnimations type="particle-storm" intensity="low" className="opacity-10" />
      
      {/* AI Assistant */}
      <div className="fixed bottom-8 right-8 z-50">
        <AIAssistantAvatar
          mood="helping"
          size="lg"
          isActive={aiAssistantActive}
          onInteract={() => setAiAssistantActive(!aiAssistantActive)}
        />
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Header with VR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <VirtualReality3D depth={50} className="h-64">
              <HolographicCard intensity="intense" glowColor="bio" className="p-8 h-full">
                <div className="relative z-10 h-full flex items-center">
                  <div className="flex items-center space-x-6 w-full">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-bio-500 to-medical-600 rounded-full flex items-center justify-center shadow-bio relative"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Stethoscope className="w-10 h-10 text-white" />
                      <AdvancedAnimations type="dna-helix" intensity="high" className="absolute inset-0" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h1 className="text-4xl font-bold medical-text-gradient">
                          Welcome back, Dr. {user.username}!
                        </h1>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.3, 1],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ 
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity
                              }}
                            >
                              <Star className="w-5 h-5 text-blood-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xl text-bone-100 mb-6">
                        Your medical journey continues with advanced AI-powered learning experiences
                      </p>
                      <div className="flex space-x-4">
                        <MorphingButton states={morphingButtonStates} size="lg" />
                        <Link to="/battle">
                          <Button className="bg-gradient-to-r from-neural-500 to-neural-600 hover:from-neural-600 hover:to-neural-700 text-white shadow-neural">
                            <Swords className="w-5 h-5 mr-2" />
                            Enter MedBattle
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </HolographicCard>
            </VirtualReality3D>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HolographicCard intensity="medium" glowColor={stat.color}>
                  <div className="p-6 relative">
                    <AdvancedAnimations 
                      type="heartbeat-wave" 
                      intensity="low" 
                      className="absolute inset-0 opacity-20" 
                    />
                    
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-glow-sm`}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -15, 15, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <motion.span 
                        className="text-3xl font-bold text-white"
                        animate={{ 
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      >
                        {stat.value}
                      </motion.span>
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
                      <p className="text-xs text-bone-400 font-medium">{stat.change}</p>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>

          {/* Advanced Learning Modules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <HolographicCard intensity="intense" glowColor="neural" className="p-8">
              <div className="relative">
                <AdvancedAnimations type="neural-network" intensity="medium" className="absolute inset-0 opacity-30" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain className="w-8 h-8 text-neural-400" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Advanced Medical AI Training</h2>
                        <p className="text-neural-400">Next-generation medical education</p>
                      </div>
                    </div>
                    
                    {isLoading && <QuantumLoader type="neural" size="md" />}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        title: 'VR Patient Simulation', 
                        desc: 'Immersive 3D patient interactions',
                        icon: Users,
                        path: '/cases',
                        color: 'blood'
                      },
                      { 
                        title: 'Quantum MedBattle', 
                        desc: 'Multi-dimensional diagnostic challenges',
                        icon: Swords,
                        path: '/battle',
                        color: 'neural'
                      },
                      { 
                        title: 'Holographic Mentor', 
                        desc: 'AI-powered medical guidance',
                        icon: Brain,
                        path: '/mentor',
                        color: 'bio'
                      }
                    ].map((module, index) => (
                      <Link key={index} to={module.path}>
                        <VirtualReality3D depth={30}>
                          <HolographicCard intensity="medium" glowColor={module.color}>
                            <div className="p-6 text-center relative">
                              <AdvancedAnimations 
                                type="particle-storm" 
                                intensity="low" 
                                className="absolute inset-0 opacity-20" 
                              />
                              
                              <motion.div 
                                className={`w-16 h-16 rounded-xl bg-gradient-to-r from-${module.color}-500 to-${module.color}-600 flex items-center justify-center mx-auto mb-4 shadow-glow-sm relative z-10`}
                                whileHover={{ 
                                  scale: 1.2,
                                  rotate: [0, -10, 10, 0],
                                  y: [0, -10, 0]
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                <module.icon className="w-8 h-8 text-white" />
                              </motion.div>
                              
                              <h3 className="text-lg font-bold text-white mb-2 relative z-10">{module.title}</h3>
                              <p className="text-bone-300 text-sm relative z-10">{module.desc}</p>
                            </div>
                          </HolographicCard>
                        </VirtualReality3D>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Quantum Progress Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <HolographicCard intensity="intense" glowColor="bio" className="p-8">
              <div className="relative">
                <AdvancedAnimations type="dna-helix" intensity="high" className="absolute inset-0 opacity-20" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Dna className="w-8 h-8 text-bio-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Quantum Learning Progress</h2>
                      <p className="text-bio-400">Advanced medical knowledge synthesis</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Neural Pathway Development</h3>
                      <div className="space-y-4">
                        {[
                          { skill: 'Diagnostic Reasoning', progress: 85 },
                          { skill: 'Clinical Decision Making', progress: 72 },
                          { skill: 'Patient Communication', progress: 91 },
                          { skill: 'Emergency Response', progress: 68 }
                        ].map((skill, index) => (
                          <div key={index} className="relative">
                            <div className="flex justify-between text-sm text-white mb-2">
                              <span>{skill.skill}</span>
                              <span>{skill.progress}%</span>
                            </div>
                            <div className="w-full bg-bone-800/60 rounded-full h-3 overflow-hidden">
                              <motion.div 
                                className="medical-progress h-3 rounded-full relative"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.progress}%` }}
                                transition={{ duration: 1.5, delay: index * 0.2 }}
                              >
                                <AdvancedAnimations 
                                  type="particle-storm" 
                                  intensity="low" 
                                  className="absolute inset-0" 
                                />
                              </motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <VirtualReality3D depth={100}>
                        <div className="relative w-48 h-48">
                          <QuantumLoader type="quantum" size="lg" className="w-full h-full" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-white mb-2">
                                {user.level}
                              </div>
                              <div className="text-sm text-bio-400 font-medium">
                                Quantum Level
                              </div>
                            </div>
                          </div>
                        </div>
                      </VirtualReality3D>
                    </div>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
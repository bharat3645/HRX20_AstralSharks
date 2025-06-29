import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, BookOpen, Brain, Stethoscope, Award, Target, TrendingUp, ArrowRight, Play, CheckCircle, Clock, Zap, Star, Heart, Microscope, Swords, FileText, Sparkles, Dna, HeartPulse as Pulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMedicalStore } from '../../store/medicalStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SkeletonDancer } from '../ui/SkeletonDancer';
import { FloatingElements } from '../ui/FloatingElements';
import { PulsingOrb } from '../ui/PulsingOrb';
import { MedicalParticles } from '../ui/MedicalParticles';
import { InteractiveButton } from '../ui/InteractiveButton';
import { HoverEffects } from '../ui/HoverEffects';

export const MedicalDashboard: React.FC = () => {
  const { user, selectedDomain, userProgress } = useMedicalStore();

  if (!user || !selectedDomain) return null;

  const stats = [
    {
      label: 'Medical XP',
      value: userProgress?.total_xp || 2450,
      change: '+125 today',
      icon: Award,
      color: 'text-blood-400',
      bg: 'bg-dark-900/80',
      border: 'border-blood-500/30',
      shadow: 'shadow-blood',
      gradient: 'from-blood-500 to-blood-600'
    },
    {
      label: 'Clinical Level',
      value: user.level,
      change: '45% to next',
      icon: TrendingUp,
      color: 'text-neural-400',
      bg: 'bg-dark-900/80',
      border: 'border-neural-500/30',
      shadow: 'shadow-neural',
      gradient: 'from-neural-500 to-neural-600'
    },
    {
      label: 'Study Streak',
      value: user.streak,
      change: 'Personal best!',
      icon: Target,
      color: 'text-bio-400',
      bg: 'bg-dark-900/80',
      border: 'border-bio-500/30',
      shadow: 'shadow-bio',
      gradient: 'from-bio-500 to-bio-600'
    },
    {
      label: 'Cases Solved',
      value: '87%',
      change: '+12% this week',
      icon: Activity,
      color: 'text-medical-400',
      bg: 'bg-dark-900/80',
      border: 'border-medical-500/30',
      shadow: 'shadow-medical',
      gradient: 'from-medical-500 to-medical-600'
    }
  ];

  const dailyMissions = [
    {
      title: 'Complete 3 Patient Cases',
      description: 'Diagnose virtual patients to earn clinical experience',
      progress: 2,
      target: 3,
      reward: '+300 XP',
      icon: Users,
      color: 'text-blood-400',
      bg: 'bg-blood-500/10',
      border: 'border-blood-500/30',
      gradient: 'from-blood-500 to-blood-600'
    },
    {
      title: 'Study 20 Flashcards',
      description: 'Review medical concepts with spaced repetition',
      progress: 15,
      target: 20,
      reward: '+150 XP',
      icon: BookOpen,
      color: 'text-bio-400',
      bg: 'bg-bio-500/10',
      border: 'border-bio-500/30',
      gradient: 'from-bio-500 to-bio-600'
    },
    {
      title: 'Win 1 MedBattle',
      description: 'Challenge another student in diagnostic battle',
      progress: 0,
      target: 1,
      reward: '+500 XP',
      icon: Swords,
      color: 'text-neural-400',
      bg: 'bg-neural-500/10',
      border: 'border-neural-500/30',
      gradient: 'from-neural-500 to-neural-600'
    }
  ];

  const activeQuests = [
    {
      title: 'Cardiovascular Mastery',
      category: 'Cardiology',
      difficulty: 'INTERMEDIATE',
      description: 'Master cardiac anatomy, physiology, and common pathologies through comprehensive case studies and diagnostic challenges.',
      objectives: [
        'Complete 5 cardiac cases',
        'Master ECG interpretation',
        'Study heart failure management'
      ],
      progress: 65,
      xpReward: 750,
      estimatedTime: '2-3 hours'
    }
  ];

  const recentAchievements = [
    { name: 'First Diagnosis', icon: '🩺', description: 'Completed your first patient case', earned: true },
    { name: 'Study Warrior', icon: '📚', description: '7-day study streak achieved', earned: true },
    { name: 'Battle Victor', icon: '⚔️', description: 'Won your first MedBattle', earned: false },
    { name: 'Anatomy Expert', icon: '🫀', description: 'Mastered human anatomy module', earned: false }
  ];

  return (
    <div className="min-h-screen bg-dark-medical dark-pattern-medical relative overflow-hidden">
      {/* Floating background elements */}
      <FloatingElements count={12} className="opacity-30" />
      <MedicalParticles count={20} className="opacity-20" />
      
      {/* Main Content */}
      <div className="ml-64 pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <HoverEffects effect="medical">
              <div className="bg-dark-950/90 backdrop-blur-xl rounded-2xl p-8 text-white relative overflow-hidden border border-bio-500/30 shadow-dark-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-bio-500/5 via-medical-500/5 to-neural-500/5" />
                
                {/* Dancing skeleton in corner */}
                <div className="absolute top-4 right-4">
                  <SkeletonDancer size="lg" color="text-bio-400/50" />
                </div>
                
                {/* Pulsing orbs */}
                <div className="absolute top-8 left-8">
                  <PulsingOrb size="sm" color="bio" intensity="low" />
                </div>
                <div className="absolute bottom-8 right-8">
                  <PulsingOrb size="md" color="medical" intensity="medium" />
                </div>
                
                <div className="absolute bottom-4 left-4 opacity-20">
                  <Microscope className="w-12 h-12 text-neural-400 animate-pulse" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-bio-500 to-medical-600 rounded-full flex items-center justify-center shadow-bio"
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
                      <Stethoscope className="w-8 h-8 text-white medical-icon" />
                    </motion.div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h1 className="text-3xl font-bold medical-text-gradient medical-heading">
                          Welcome back, Dr. {user.username}!
                        </h1>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ 
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity
                              }}
                            >
                              <Star className="w-4 h-4 text-blood-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <p className="text-bio-200 medical-subheading">Level {user.level} • {user.rank} • {user.streak} day streak</p>
                    </div>
                  </div>
                  <p className="text-lg text-bone-100 mb-6 medical-body">
                    Your medical journey continues. Ready to diagnose new cases and expand your clinical expertise in {selectedDomain.name}?
                  </p>
                  <div className="flex space-x-4">
                    <Link to="/cases">
                      <InteractiveButton variant="primary">
                        <Play className="w-4 h-4 mr-2" />
                        Start Diagnosis
                      </InteractiveButton>
                    </Link>
                    <Link to="/battle">
                      <InteractiveButton variant="magical">
                        <Swords className="w-4 h-4 mr-2" />
                        Enter MedBattle
                      </InteractiveButton>
                    </Link>
                  </div>
                </div>
              </div>
            </HoverEffects>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HoverEffects effect="glow">
                  <Card className={`p-6 border ${stat.border} ${stat.bg} ${stat.shadow} group backdrop-blur-xl hover:bg-dark-800/80 transition-all duration-300 relative overflow-hidden`}>
                    {/* Dancing skeleton for high values */}
                    {index === 0 && (
                      <div className="absolute top-2 right-2">
                        <SkeletonDancer size="sm" color="text-blood-400/30" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} border ${stat.border} flex items-center justify-center shadow-glow-sm`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <stat.icon className="w-6 h-6 text-white medical-icon" />
                      </motion.div>
                      <motion.span 
                        className="text-2xl font-bold text-white medical-heading"
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
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
                      <p className="text-xs text-bone-400 font-medium">{stat.change}</p>
                    </div>
                  </Card>
                </HoverEffects>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daily Missions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HoverEffects effect="float">
                <Card className="p-6 bg-dark-950/90 backdrop-blur-xl border-bio-500/30 shadow-dark-lg relative overflow-hidden">
                  {/* Floating skeleton */}
                  <div className="absolute top-4 right-4">
                    <SkeletonDancer size="md" color="text-bio-400/20" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-r from-bio-500 to-bio-600 rounded-xl flex items-center justify-center border border-bio-500/30 shadow-glow-sm"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <CheckCircle className="w-5 h-5 text-white medical-icon" />
                      </motion.div>
                      <div>
                        <h2 className="text-lg font-bold text-white medical-heading">Daily Missions</h2>
                        <p className="text-sm text-bio-400 font-medium">1/3 completed</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 3,
                            delay: i * 0.3,
                            repeat: Infinity
                          }}
                        >
                          <Star className="w-3 h-3 text-blood-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {dailyMissions.map((mission, index) => (
                      <HoverEffects key={index} effect="sparkle">
                        <div className={`p-4 ${mission.bg} rounded-xl border ${mission.border} hover:bg-opacity-80 transition-all duration-200 bg-dark-900/60 backdrop-blur-lg relative overflow-hidden`}>
                          {/* Mini dancing skeleton for incomplete missions */}
                          {mission.progress < mission.target && (
                            <div className="absolute top-2 right-2">
                              <SkeletonDancer size="sm" color="text-bone-400/30" />
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <motion.div
                                whileHover={{ 
                                  rotate: [0, -15, 15, 0],
                                  scale: 1.2
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                <mission.icon className={`w-4 h-4 ${mission.color} medical-icon`} />
                              </motion.div>
                              <span className="font-semibold text-white">{mission.title}</span>
                            </div>
                            <Badge variant="success" size="sm" className="bg-bio-500/20 text-bio-400 border-bio-500/30 font-medium">{mission.reward}</Badge>
                          </div>
                          <p className="text-sm text-bone-300 mb-3 medical-body">{mission.description}</p>
                          <div className="w-full bg-dark-800/60 rounded-full h-3 mb-2 overflow-hidden border border-bio-500/20">
                            <motion.div 
                              className={`bg-gradient-to-r ${mission.gradient} h-3 rounded-full transition-all duration-500`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(mission.progress / mission.target) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-bone-400 font-medium">
                            <span>{mission.progress}/{mission.target}</span>
                            <span>{Math.round((mission.progress / mission.target) * 100)}%</span>
                          </div>
                        </div>
                      </HoverEffects>
                    ))}
                  </div>
                </Card>
              </HoverEffects>
            </motion.div>

            {/* Active Quests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2"
            >
              <HoverEffects effect="medical">
                <Card className="p-6 bg-dark-950/90 backdrop-blur-xl border-bio-500/30 shadow-dark-lg relative overflow-hidden">
                  {/* Multiple dancing skeletons */}
                  <div className="absolute top-4 right-4">
                    <SkeletonDancer size="lg" color="text-neural-400/20" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <SkeletonDancer size="sm" color="text-blood-400/30" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className="w-10 h-10 bg-gradient-to-r from-medical-500 to-medical-600 rounded-xl flex items-center justify-center border border-medical-500/30 shadow-glow-sm"
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <TrendingUp className="w-5 h-5 text-white medical-icon" />
                      </motion.div>
                      <div>
                        <h2 className="text-lg font-bold text-white medical-heading">Active Medical Quests</h2>
                        <p className="text-sm text-medical-400 font-medium">Continue your clinical learning journey</p>
                      </div>
                    </div>
                    <Link to="/cases" className="text-bio-400 hover:text-bio-300 text-sm font-semibold flex items-center group">
                      View All Cases 
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </motion.div>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {activeQuests.map((quest, index) => (
                      <HoverEffects key={index} effect="glow">
                        <div className="p-6 bg-dark-900/80 backdrop-blur-lg rounded-xl border border-bio-500/30 hover:border-bio-500/50 transition-all duration-200 relative overflow-hidden shadow-bio">
                          <div className="absolute top-2 right-2">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity
                              }}
                            >
                              <Pulse className="w-6 h-6 text-blood-400/50" />
                            </motion.div>
                          </div>
                          
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <motion.div 
                                className="w-12 h-12 bg-gradient-to-r from-blood-500 to-blood-600 rounded-xl flex items-center justify-center shadow-blood"
                                whileHover={{ 
                                  scale: 1.1,
                                  rotate: [0, -10, 10, 0]
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                <Heart className="w-6 h-6 text-white medical-icon" />
                              </motion.div>
                              <div>
                                <h3 className="text-lg font-bold text-white medical-heading">{quest.title}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="info" size="sm" className="bg-medical-500/20 text-medical-400 border-medical-500/30 font-medium">{quest.category}</Badge>
                                  <Badge variant="success" size="sm" className="bg-bio-500/20 text-bio-400 border-bio-500/30 font-medium">{quest.difficulty}</Badge>
                                  <span className="text-xs text-bone-400 font-medium">{quest.estimatedTime}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <motion.p 
                                className="text-sm text-blood-400 font-bold"
                                animate={{ 
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity
                                }}
                              >
                                +{quest.xpReward} XP
                              </motion.p>
                              <p className="text-xs text-bone-400 font-medium">{quest.progress}% complete</p>
                            </div>
                          </div>
                          
                          <p className="text-bone-300 mb-4 medical-body">{quest.description}</p>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-white mb-2">Learning Objectives:</h4>
                            <ul className="space-y-1">
                              {quest.objectives.map((objective, objIndex) => (
                                <li key={objIndex} className="flex items-center space-x-2 text-sm text-bone-300">
                                  <motion.div 
                                    className="w-1.5 h-1.5 bg-bio-400 rounded-full shadow-glow-sm"
                                    animate={{ 
                                      scale: [1, 1.3, 1],
                                      opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={{ 
                                      duration: 2,
                                      delay: objIndex * 0.2,
                                      repeat: Infinity
                                    }}
                                  />
                                  <span className="medical-body">{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="w-full bg-dark-800/60 rounded-full h-3 overflow-hidden border border-bio-500/20">
                              <motion.div 
                                className="medical-progress h-3 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${quest.progress}%` }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                              />
                            </div>
                          </div>
                          
                          <InteractiveButton variant="primary" className="w-full">
                            <Play className="w-4 h-4 mr-2" />
                            Continue Quest
                          </InteractiveButton>
                        </div>
                      </HoverEffects>
                    ))}
                  </div>
                </Card>
              </HoverEffects>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { 
                title: 'Patient Cases', 
                desc: 'Diagnose virtual patients', 
                action: 'Start Diagnosis',
                icon: Users,
                path: '/cases',
                gradient: 'from-blood-500 to-blood-600',
                bg: 'bg-blood-500/10',
                border: 'border-blood-500/30',
                shadow: 'shadow-blood'
              },
              { 
                title: 'MedBattle Arena', 
                desc: 'Challenge other students', 
                action: 'Enter Battle',
                icon: Swords,
                path: '/battle',
                gradient: 'from-neural-500 to-neural-600',
                bg: 'bg-neural-500/10',
                border: 'border-neural-500/30',
                shadow: 'shadow-neural'
              },
              { 
                title: 'AI Medical Mentor', 
                desc: 'Get personalized guidance', 
                action: 'Start Session',
                icon: Brain,
                path: '/mentor',
                gradient: 'from-bio-500 to-bio-600',
                bg: 'bg-bio-500/10',
                border: 'border-bio-500/30',
                shadow: 'shadow-bio'
              }
            ].map((item, index) => (
              <Link key={index} to={item.path}>
                <HoverEffects effect="float">
                  <Card hover className={`p-6 text-center border ${item.border} ${item.bg} ${item.shadow} group bg-dark-950/90 backdrop-blur-xl hover:bg-dark-900/80 transition-all duration-300 relative overflow-hidden`}>
                    {/* Dancing skeleton for each card */}
                    <div className="absolute top-2 right-2">
                      <SkeletonDancer size="sm" color="text-bone-400/20" />
                    </div>
                    
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mx-auto mb-4 shadow-glow-sm`}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: [0, -10, 10, 0],
                        y: [0, -5, 0]
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-8 h-8 text-white medical-icon" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2 medical-heading">{item.title}</h3>
                    <p className="text-bone-300 mb-4 text-sm medical-body">{item.desc}</p>
                    <InteractiveButton variant="secondary" className="w-full">
                      {item.action}
                    </InteractiveButton>
                  </Card>
                </HoverEffects>
              </Link>
            ))}
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <HoverEffects effect="glow">
              <Card className="p-6 bg-dark-950/90 backdrop-blur-xl border-bio-500/30 shadow-dark-lg relative overflow-hidden">
                {/* Multiple dancing skeletons for achievements */}
                <div className="absolute top-4 right-4">
                  <SkeletonDancer size="md" color="text-blood-400/30" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <SkeletonDancer size="sm" color="text-bio-400/20" />
                </div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-r from-blood-500 to-blood-600 rounded-xl flex items-center justify-center border border-blood-500/30 shadow-glow-sm"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Award className="w-5 h-5 text-white medical-icon" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold text-white medical-heading">Medical Achievements</h2>
                    <p className="text-sm text-blood-400 font-medium">Your learning milestones</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recentAchievements.map((achievement, index) => (
                    <HoverEffects key={index} effect="sparkle">
                      <motion.div
                        className={`p-4 rounded-xl transition-all duration-200 bg-dark-900/80 backdrop-blur-lg relative overflow-hidden ${
                          achievement.earned
                            ? 'border border-bio-500/30 hover:border-bio-500/50 shadow-bio'
                            : 'border border-bone-500/30 opacity-60 hover:opacity-80'
                        }`}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Mini dancing skeleton for unearned achievements */}
                        {!achievement.earned && (
                          <div className="absolute top-1 right-1">
                            <SkeletonDancer size="sm" color="text-bone-400/20" />
                          </div>
                        )}
                        
                        <div className="text-center">
                          <motion.div 
                            className="text-3xl mb-2"
                            animate={achievement.earned ? { 
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            } : {}}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                          >
                            {achievement.icon}
                          </motion.div>
                          <h4 className={`font-semibold mb-1 ${
                            achievement.earned ? 'text-bio-300' : 'text-bone-400'
                          }`}>
                            {achievement.name}
                          </h4>
                          <p className={`text-xs medical-body ${
                            achievement.earned ? 'text-bio-500' : 'text-bone-500'
                          }`}>
                            {achievement.description}
                          </p>
                          {achievement.earned && (
                            <div className="mt-2">
                              <Badge variant="success" size="sm" className="bg-bio-500/20 text-bio-400 border-bio-500/30 font-medium">Earned</Badge>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </HoverEffects>
                  ))}
                </div>
              </Card>
            </HoverEffects>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
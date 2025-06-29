import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Zap, Crown, Target, TrendingUp, Award, Flame, CheckCircle, ArrowRight, Play,
  DollarSign, BarChart3, Calculator, Brain, Users, Globe, Sparkles, Trophy,
  ChevronRight, Star, Clock, BookOpen, Shield, Briefcase, LineChart
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const Dashboard: React.FC = () => {
  const { totalXP, currentLevel, streak, achievements } = useGameStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { 
      label: 'Total XP', 
      value: '2,450', 
      change: '+125 today',
      icon: Zap, 
      iconColor: 'text-yellow-400',
      bgClass: 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10',
      borderClass: 'border-yellow-500/20',
      trend: '+12%'
    },
    { 
      label: 'Mastery Level', 
      value: '5', 
      change: '45% to Level 6',
      icon: Crown, 
      iconColor: 'text-purple-400',
      bgClass: 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10',
      borderClass: 'border-purple-500/20',
      trend: 'Silver II'
    },
    { 
      label: 'Learning Streak', 
      value: '3', 
      change: 'Personal best!',
      icon: Flame, 
      iconColor: 'text-red-400',
      bgClass: 'bg-gradient-to-r from-red-500/10 to-orange-500/10',
      borderClass: 'border-red-500/20',
      trend: '🔥 Hot'
    },
    { 
      label: 'Scenarios Mastered', 
      value: '12', 
      change: '+3 this week',
      icon: Target, 
      iconColor: 'text-emerald-400',
      bgClass: 'bg-gradient-to-r from-emerald-500/10 to-green-500/10',
      borderClass: 'border-emerald-500/20',
      trend: '85%'
    },
  ];

  const missions = [
    {
      title: 'Master Financial Ratios',
      description: 'Complete 5 ratio analysis scenarios',
      progress: 3,
      total: 5,
      reward: '+150 XP',
      icon: Calculator,
      difficulty: 'Intermediate',
      difficultyColor: 'status-warning'
    },
    {
      title: 'SaaS Metrics Expert',
      description: 'Analyze MRR, ARR, and churn scenarios',
      progress: 2,
      total: 4,
      reward: '+200 XP',
      icon: BarChart3,
      difficulty: 'Advanced',
      difficultyColor: 'status-error'
    },
    {
      title: 'Investment Analysis Pro',
      description: 'Complete DCF and valuation challenges',
      progress: 1,
      total: 3,
      reward: '+250 XP',
      icon: TrendingUp,
      difficulty: 'Expert',
      difficultyColor: 'status-error'
    }
  ];

  const featuredScenarios = [
    {
      title: 'Startup Valuation Crisis',
      category: 'Venture Capital',
      difficulty: 'ADVANCED',
      description: 'A promising fintech startup needs urgent valuation for Series A. Multiple methodologies yield different results.',
      objectives: ['Apply DCF methodology', 'Compare market multiples', 'Assess risk factors'],
      participants: 1247,
      avgScore: 78,
      timeEstimate: '25 min'
    },
    {
      title: 'M&A Financial Modeling',
      category: 'Corporate Finance',
      difficulty: 'EXPERT',
      description: 'Two tech companies are merging. Build the financial model and assess synergies and integration costs.',
      objectives: ['Model revenue synergies', 'Calculate cost savings', 'Assess integration risks'],
      participants: 892,
      avgScore: 72,
      timeEstimate: '35 min'
    }
  ];

  const achievements_display = [
    { name: 'First Steps', icon: '🚀', progress: 100, description: 'Complete first scenario' },
    { name: 'Ratio Master', icon: '📊', progress: 75, description: 'Master 10 financial ratios' },
    { name: 'Streak Warrior', icon: '🔥', progress: 60, description: 'Maintain 7-day streak' },
    { name: 'Scenario Expert', icon: '🎯', progress: 40, description: 'Complete 25 scenarios' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'status-success';
      case 'intermediate': return 'status-warning';
      case 'advanced': return 'status-error';
      case 'expert': return 'status-error';
      default: return 'status-info';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>

      <div className="relative z-10 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="professional-card rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-blue-500/5"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="flex items-center space-x-4 mb-4"
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-neon"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(139, 92, 246, 0.3)',
                        '0 0 30px rgba(139, 92, 246, 0.5)',
                        '0 0 20px rgba(139, 92, 246, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <DollarSign className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      Welcome back, Finance Warrior!
                    </h1>
                    <p className="text-slate-300 text-lg flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-purple-400" />
                      <span>Level 5 • Silver II • {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}</span>
                    </p>
                  </div>
                </motion.div>
                <p className="text-slate-400 mb-6 max-w-2xl text-lg leading-relaxed">
                  Your financial mastery journey continues. Ready to conquer new challenges and expand your strategic skills across the digital landscape?
                </p>
              </div>
              <div className="text-right">
                <motion.div 
                  className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.3 }}
                >
                  85%
                </motion.div>
                <div className="text-slate-400 mb-2">Daily Progress</div>
                <div className="w-32 h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="progress-bar h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-3 px-8 py-4 rounded-xl text-lg shadow-lg"
              >
                <Rocket className="w-6 h-6" />
                <span>Continue Learning Path</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Target className="w-6 h-6" />
                <span>Challenge Mode</span>
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`professional-card rounded-xl p-6 ${stat.bgClass} border ${stat.borderClass} relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 ${stat.bgClass} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center shadow-lg backdrop-blur-sm`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </motion.div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-300 font-medium">{stat.trend}</div>
                  </div>
                </div>
                <div className="text-slate-200 font-semibold mb-1">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Missions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="professional-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Trophy className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Daily Missions</h3>
              </div>
              <div className="status-success text-sm font-medium px-2 py-1 rounded-full">2/3 Complete</div>
            </div>

            <div className="space-y-4">
              {missions.map((mission, index) => (
                <motion.div 
                  key={index} 
                  className="professional-card rounded-lg p-4 hover:border-emerald-500/30 transition-all group cursor-pointer"
                  whileHover={{ scale: 1.02, x: 4 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-purple-500/30">
                        <mission.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-white font-semibold group-hover:text-emerald-300 transition-colors">
                          {mission.title}
                        </span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${mission.difficultyColor}`}>
                            {mission.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-emerald-400 text-sm font-medium">{mission.reward}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{mission.description}</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <motion.div 
                        className="progress-bar h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(mission.progress / mission.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      />
                    </div>
                    <span className="text-slate-400 text-sm font-medium">
                      {mission.progress}/{mission.total}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Scenarios */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 professional-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Featured Scenarios</h3>
              </div>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors flex items-center space-x-1">
                <span>Explore All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {featuredScenarios.map((scenario, index) => (
                <motion.div 
                  key={index} 
                  className="professional-card rounded-lg p-6 hover:border-blue-500/30 transition-all group cursor-pointer"
                  whileHover={{ scale: 1.01, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {scenario.title}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-blue-400 text-sm font-medium">{scenario.category}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                            {scenario.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-400">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="w-4 h-4" />
                        <span>{scenario.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{scenario.avgScore}% avg</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{scenario.timeEstimate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">{scenario.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-white font-medium mb-2 flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Learning Objectives:</span>
                    </div>
                    <ul className="space-y-1">
                      {scenario.objectives.map((objective, objIndex) => (
                        <li key={objIndex} className="flex items-center space-x-2 text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Scenario</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="professional-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Achievement Progress</h3>
            </div>
            <span className="status-info text-sm font-medium px-2 py-1 rounded-full">4 Active</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements_display.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="professional-card rounded-lg p-4 hover:border-purple-500/30 transition-all group cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {achievement.name}
                  </h4>
                  <p className="text-slate-400 text-xs mb-3">{achievement.description}</p>
                  <div className="relative">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div 
                        className="progress-bar h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                    <div className="text-xs text-purple-400 font-medium mt-1">
                      {achievement.progress}%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
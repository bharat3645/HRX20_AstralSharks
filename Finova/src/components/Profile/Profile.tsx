import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Crown, Zap, Trophy, Target, Calendar, TrendingUp, Award, 
  Settings, Edit3, Camera, Star, Flame, BookOpen, Brain, Calculator,
  BarChart3, DollarSign, Shield, ChevronRight, Download, Share2,
  Medal, Sparkles, Clock, Users, Globe, LineChart
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  xpReward: number;
}

interface Badge {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  progress: number;
  maxProgress: number;
}

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const { totalXP, currentLevel, streak } = useGameStore();

  const userStats = {
    name: 'Demo User',
    title: 'Finance Warrior',
    level: 5,
    xp: 2450,
    nextLevelXP: 3000,
    rank: 'Silver II',
    joinDate: new Date('2024-01-15'),
    streak: 3,
    totalScenarios: 12,
    completedScenarios: 8,
    averageScore: 78,
    totalStudyTime: '24h 30m',
    skillsLearned: 15,
    flashcardsReviewed: 156
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first scenario',
      icon: '🚀',
      rarity: 'common',
      unlockedAt: new Date('2024-01-16'),
      xpReward: 50
    },
    {
      id: '2',
      name: 'Streak Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      rarity: 'rare',
      unlockedAt: new Date('2024-01-23'),
      xpReward: 150
    },
    {
      id: '3',
      name: 'Crisis Master',
      description: 'Complete 10 crisis scenarios',
      icon: '🎯',
      rarity: 'epic',
      unlockedAt: new Date('2024-02-01'),
      xpReward: 300
    },
    {
      id: '4',
      name: 'Finance Sage',
      description: 'Master all foundation skills',
      icon: '🧠',
      rarity: 'legendary',
      unlockedAt: new Date('2024-02-10'),
      xpReward: 500
    }
  ];

  const badges: Badge[] = [
    {
      id: 'scenarios',
      name: 'Scenario Expert',
      icon: Target,
      color: 'from-red-400 to-orange-500',
      description: 'Complete crisis scenarios',
      progress: 8,
      maxProgress: 15
    },
    {
      id: 'flashcards',
      name: 'Knowledge Vault',
      icon: BookOpen,
      color: 'from-green-400 to-emerald-500',
      description: 'Review flashcards',
      progress: 156,
      maxProgress: 200
    },
    {
      id: 'skills',
      name: 'Skill Master',
      icon: Brain,
      color: 'from-purple-400 to-pink-500',
      description: 'Learn new skills',
      progress: 15,
      maxProgress: 25
    },
    {
      id: 'streak',
      name: 'Consistency King',
      icon: Flame,
      color: 'from-yellow-400 to-orange-500',
      description: 'Maintain learning streak',
      progress: 3,
      maxProgress: 30
    }
  ];

  const skillCategories = [
    {
      name: 'Financial Analysis',
      icon: BarChart3,
      color: 'from-blue-400 to-cyan-500',
      level: 4,
      progress: 75,
      skills: ['DCF Modeling', 'Ratio Analysis', 'Financial Statements']
    },
    {
      name: 'Investment Strategy',
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-500',
      level: 3,
      progress: 60,
      skills: ['Portfolio Theory', 'Risk Management', 'Asset Allocation']
    },
    {
      name: 'Corporate Finance',
      icon: DollarSign,
      color: 'from-purple-400 to-pink-500',
      level: 5,
      progress: 90,
      skills: ['Capital Structure', 'M&A Analysis', 'Valuation']
    },
    {
      name: 'SaaS Metrics',
      icon: Calculator,
      color: 'from-orange-400 to-red-500',
      level: 2,
      progress: 40,
      skills: ['MRR/ARR', 'Churn Analysis', 'Unit Economics']
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/30';
      case 'rare': return 'border-blue-500/30';
      case 'epic': return 'border-purple-500/30';
      case 'legendary': return 'border-yellow-500/30';
      default: return 'border-gray-500/30';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.div 
              className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-neon"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                  '0 0 30px rgba(139, 92, 246, 0.5)',
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Profile Center
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Track your progress, achievements, and mastery across all finance domains
          </p>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="professional-card rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-neon"
                  whileHover={{ scale: 1.05 }}
                >
                  <User className="w-12 h-12 text-white" />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-slate-900"
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-white">{userStats.name}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-purple-400 font-semibold">{userStats.title}</span>
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Level {userStats.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">{userStats.rank}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {userStats.joinDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{userStats.streak} day streak</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">{userStats.xp}</div>
              <div className="text-slate-400 text-sm mb-3">Total XP</div>
              <div className="w-48 bg-slate-700 rounded-full h-3 mb-2">
                <motion.div 
                  className="bg-gradient-to-r from-purple-400 to-indigo-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(userStats.xp / userStats.nextLevelXP) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="text-xs text-slate-400">
                {userStats.nextLevelXP - userStats.xp} XP to Level {userStats.level + 1}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">{userStats.completedScenarios}</div>
              <div className="text-slate-400 text-sm">Scenarios Completed</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{userStats.averageScore}%</div>
              <div className="text-slate-400 text-sm">Average Score</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{userStats.skillsLearned}</div>
              <div className="text-slate-400 text-sm">Skills Learned</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{userStats.totalStudyTime}</div>
              <div className="text-slate-400 text-sm">Study Time</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-2 backdrop-blur-xl border border-purple-500/20">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Skill Categories */}
              <div className="professional-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-purple-400" />
                  Skill Mastery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-4 hover:from-slate-700/50 hover:to-slate-600/50 transition-all cursor-pointer group border border-purple-500/10 hover:border-purple-500/30"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}>
                            <category.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                              {category.name}
                            </h4>
                            <div className="text-slate-400 text-sm">Level {category.level}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{category.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div 
                            className={`bg-gradient-to-r ${category.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${category.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {category.skills.map((skill) => (
                          <span key={skill} className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress Badges */}
              <div className="professional-card rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Medal className="w-6 h-6 mr-2 text-yellow-400" />
                  Progress Badges
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {badges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-4 text-center hover:from-slate-700/50 hover:to-slate-600/50 transition-all cursor-pointer border border-purple-500/10 hover:border-purple-500/30"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                        <badge.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-1">{badge.name}</h4>
                      <p className="text-slate-400 text-xs mb-3">{badge.description}</p>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>{badge.progress}</span>
                          <span>{badge.maxProgress}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1">
                          <motion.div 
                            className={`bg-gradient-to-r ${badge.color} h-1 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {Math.round((badge.progress / badge.maxProgress) * 100)}% Complete
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="professional-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  Achievement Gallery
                </h3>
                <div className="text-slate-400 text-sm">
                  {achievements.length} unlocked • {achievements.reduce((sum, a) => sum + a.xpReward, 0)} XP earned
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${getRarityColor(achievement.rarity)}/10 rounded-lg p-6 border ${getRarityBorder(achievement.rarity)} hover:scale-105 transition-all cursor-pointer`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="text-white font-bold mb-2">{achievement.name}</h4>
                      <p className="text-slate-400 text-sm mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white font-medium capitalize`}>
                          {achievement.rarity}
                        </span>
                        <span className="text-yellow-400 font-medium">+{achievement.xpReward} XP</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-2">
                        Unlocked {achievement.unlockedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learning Stats */}
                <div className="professional-card rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                    Learning Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Study Time</span>
                      <span className="text-white font-semibold">{userStats.totalStudyTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Flashcards Reviewed</span>
                      <span className="text-white font-semibold">{userStats.flashcardsReviewed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Skills Mastered</span>
                      <span className="text-white font-semibold">{userStats.skillsLearned}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Current Streak</span>
                      <span className="text-orange-400 font-semibold flex items-center">
                        <Flame className="w-4 h-4 mr-1" />
                        {userStats.streak} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="professional-card rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                    Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Average Score</span>
                      <span className="text-white font-semibold">{userStats.averageScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Scenarios Completed</span>
                      <span className="text-white font-semibold">{userStats.completedScenarios}/{userStats.totalScenarios}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Success Rate</span>
                      <span className="text-green-400 font-semibold">
                        {Math.round((userStats.completedScenarios / userStats.totalScenarios) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Global Rank</span>
                      <span className="text-purple-400 font-semibold">#1,247</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Chart Placeholder */}
              <div className="professional-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <LineChart className="w-5 h-5 mr-2 text-purple-400" />
                  Learning Activity
                </h3>
                <div className="h-64 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg flex items-center justify-center border border-purple-500/20">
                  <div className="text-center text-slate-400">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Activity chart coming soon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="professional-card rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-slate-400" />
                Account Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-4">Profile Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Display Name</label>
                      <input 
                        type="text" 
                        value={userStats.name}
                        className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2">Title</label>
                      <input 
                        type="text" 
                        value={userStats.title}
                        className="w-full px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Preferences</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-purple-500 bg-slate-800 border-purple-500/30 rounded focus:ring-purple-500" />
                      <span className="text-slate-300">Email notifications for achievements</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-purple-500 bg-slate-800 border-purple-500/30 rounded focus:ring-purple-500" />
                      <span className="text-slate-300">Daily learning reminders</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-purple-500 bg-slate-800 border-purple-500/30 rounded focus:ring-purple-500" />
                      <span className="text-slate-300">Weekly progress reports</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Data & Privacy</h4>
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Data</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share Profile</span>
                    </motion.button>
                  </div>
                </div>

                <div className="pt-6 border-t border-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary px-6 py-3 rounded-lg"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
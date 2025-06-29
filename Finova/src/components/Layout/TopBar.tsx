import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, Zap, Crown, Flame, User, Trophy, Target, TrendingUp, Star, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const TopBar: React.FC = () => {
  const { totalXP, currentLevel, streak } = useGameStore();

  const badges = [
    { 
      icon: Zap, 
      label: '2,450 XP', 
      bgClass: 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20',
      borderClass: 'border-yellow-500/30',
      textClass: 'text-yellow-400',
      glowClass: 'shadow-yellow-500/20'
    },
    { 
      icon: Crown, 
      label: 'Level 5', 
      bgClass: 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20',
      borderClass: 'border-purple-500/30',
      textClass: 'text-purple-400',
      glowClass: 'shadow-purple-500/20'
    },
    { 
      icon: Trophy, 
      label: 'Silver II', 
      bgClass: 'bg-gradient-to-r from-slate-500/20 to-gray-500/20',
      borderClass: 'border-slate-500/30',
      textClass: 'text-slate-300',
      glowClass: 'shadow-slate-500/20'
    },
    { 
      icon: Flame, 
      label: '3 Day Streak', 
      bgClass: 'bg-gradient-to-r from-red-500/20 to-orange-500/20',
      borderClass: 'border-red-500/30',
      textClass: 'text-red-400',
      glowClass: 'shadow-red-500/20'
    },
  ];

  const quickStats = [
    { label: 'Scenarios', value: '12', icon: Target, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { label: 'Mastered', value: '8', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  ];

  return (
    <div className="fixed top-0 left-70 right-0 h-16 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-purple-500/20 z-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative z-10 flex items-center justify-between h-full px-6">
        {/* Left side - Quick Stats */}
        <div className="flex items-center space-x-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center space-x-2 px-4 py-2 ${stat.bg} rounded-xl border ${stat.border} backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-lg`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-sm font-bold text-white">{stat.value}</span>
              <span className="text-xs text-slate-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Center - Status badges */}
        <div className="flex items-center space-x-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-full ${badge.bgClass} border ${badge.borderClass} backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-lg ${badge.glowClass}`}
            >
              {/* Animated background glow */}
              <motion.div
                className={`absolute inset-0 rounded-full ${badge.bgClass} opacity-50`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative flex items-center space-x-2">
                <badge.icon className={`w-4 h-4 ${badge.textClass}`} />
                <span className={`text-sm font-semibold ${badge.textClass}`}>{badge.label}</span>
              </div>
              
              {/* Sparkle effect for special badges */}
              {(badge.label.includes('Level') || badge.label.includes('Streak')) && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 text-purple-400 opacity-60" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition-all cursor-pointer">
                <Bell className="w-5 h-5 text-purple-400 hover:text-purple-300 transition-colors" />
              </div>
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center border border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs text-white font-bold">3</span>
              </motion.div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition-all cursor-pointer"
            >
              <Settings className="w-5 h-5 text-purple-400 hover:text-purple-300 transition-colors" />
            </motion.div>
          </div>

          {/* User profile */}
          <motion.div 
            className="flex items-center space-x-3 pl-4 border-l border-purple-500/20"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-right">
              <div className="text-white font-semibold text-sm">Demo User</div>
              <div className="text-purple-400 text-xs font-medium flex items-center space-x-1">
                <span>Finance Warrior</span>
                <span>•</span>
                <span>Level 5</span>
                <Star className="w-3 h-3 text-yellow-400" />
              </div>
            </div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center cursor-pointer shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center border-2 border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Crown className="w-2.5 h-2.5 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
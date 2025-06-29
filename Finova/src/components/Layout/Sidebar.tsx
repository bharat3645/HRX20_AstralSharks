import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  Home,
  MessageCircle,
  Target,
  Brain,
  BookOpen,
  Megaphone,
  Calculator,
  User,
  Zap,
  TrendingUp,
  DollarSign,
  Award,
  Crown,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Command Center', description: 'Your mission control hub', color: 'text-blue-400' },
  { path: '/mentor', icon: MessageCircle, label: 'AI Oracle', description: 'Your finance sage', color: 'text-purple-400' },
  { path: '/scenarios', icon: Target, label: 'Crisis Simulator', description: 'Real-world challenges', color: 'text-red-400' },
  { path: '/skill-tree', icon: Brain, label: 'Mastery Path', description: 'Strategic progression', color: 'text-emerald-400' },
  { path: '/flashcards', icon: BookOpen, label: 'Knowledge Vault', description: 'Concept mastery', color: 'text-green-400' },
  { path: '/campaigns', icon: Megaphone, label: 'Strategy Forge', description: 'Campaign architect', color: 'text-amber-400' },
  { path: '/equations', icon: Calculator, label: 'Formula Lab', description: 'Math mastery', color: 'text-cyan-400' },
  { path: '/profile', icon: User, label: 'Profile', description: 'Your achievements', color: 'text-slate-400' },
];

export const Sidebar: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-full w-70 bg-gradient-to-b from-slate-900 via-purple-900/50 to-indigo-900 border-r border-purple-500/20 z-30 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-purple-500/20">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-neon"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                    '0 0 30px rgba(139, 92, 246, 0.5)',
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <DollarSign className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div 
                className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                FINOVA
              </h1>
              <p className="text-xs text-purple-400 font-medium">
                Master • Analyze • Dominate
              </p>
            </div>
          </motion.div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="professional-card rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <div className="text-white font-semibold">Demo User</div>
                <div className="text-purple-400 text-sm font-medium">Finance Warrior</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-yellow-500 font-semibold">2,450 XP</span>
                </div>
                <span className="status-info text-xs font-medium px-2 py-1 rounded-full">
                  Level 5
                </span>
              </div>
              <div className="relative">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="progress-bar h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Silver II</span>
                  <span>25% to Gold</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 shadow-lg'
                        : 'text-slate-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-indigo-500/10 hover:text-white border border-transparent hover:border-purple-500/20'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Background glow effect */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      <div className={`relative p-2 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-500/30 to-indigo-500/30 text-purple-300 shadow-lg' 
                          : `bg-slate-700/50 ${item.color} group-hover:bg-slate-600/50 group-hover:scale-110`
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 relative">
                        <div className={`font-semibold ${isActive ? 'text-white' : 'group-hover:text-white'} transition-colors`}>
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <motion.div 
                          className="w-2 h-2 bg-purple-400 rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                        />
                      )}
                      
                      {/* Sparkle effect for active item */}
                      {isActive && (
                        <motion.div
                          className="absolute top-2 right-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-3 h-3 text-purple-400 opacity-60" />
                        </motion.div>
                      )}
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Daily Progress */}
        <div className="p-4 border-t border-purple-500/20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <div className="text-purple-400 text-sm font-semibold">Daily Mastery</div>
            </div>
            <div className="relative mb-3">
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="progress-bar h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow-lg">85%</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-purple-400 font-medium">3 day streak</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-medium">On fire! 🔥</span>
              </div>
              <div className="text-slate-500">Keep the momentum going!</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
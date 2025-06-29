import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Trophy, Zap, LogOut, ChevronDown } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, userProgress, logout } = useGameStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Companion Quest
            </span>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* XP Display */}
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">
                  Level {user.level}
                </span>
                <span className="text-xs text-gray-400">
                  {userProgress?.total_xp || 0} XP
                </span>
              </div>

              {/* Streak */}
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-1">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">
                  {user.streak} day streak
                </span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white hidden sm:block">
                    {user.username}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            // Navigate to profile - you can add navigation logic here
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            // Navigate to settings - you can add navigation logic here
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        
                        <div className="border-t border-gray-700 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </motion.nav>
  );
};
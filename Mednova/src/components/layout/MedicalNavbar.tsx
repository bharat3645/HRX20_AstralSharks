import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Award, Activity, LogOut, ChevronDown, Stethoscope, Menu, Bell, Star, Dna, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMedicalStore } from '../../store/medicalStore';

export const MedicalNavbar: React.FC = () => {
  const { user, userProgress, logout } = useMedicalStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Intern': return 'text-medical-400';
      case 'Resident': return 'text-bio-400';
      case 'Consultant': return 'text-neural-400';
      case 'Nova Surgeon': return 'text-blood-400';
      default: return 'text-bone-400';
    }
  };

  const getRankBg = (rank: string) => {
    switch (rank) {
      case 'Intern': return 'bg-medical-500';
      case 'Resident': return 'bg-bio-500';
      case 'Consultant': return 'bg-neural-500';
      case 'Nova Surgeon': return 'bg-blood-500';
      default: return 'bg-bone-500';
    }
  };

  if (!user) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-950/95 backdrop-blur-xl border-b border-bio-500/20 shadow-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-bio-500 to-medical-600 rounded-xl flex items-center justify-center shadow-bio animate-heartbeat">
                <Stethoscope className="w-6 h-6 text-white medical-icon" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blood-500 to-blood-600 rounded-full flex items-center justify-center animate-dna-spin">
                <Dna className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold medical-text-gradient">
                MedNOVA
              </span>
              <span className="text-xs text-bio-400 -mt-1 hidden sm:block font-medium">Medical Learning Platform</span>
            </div>
            <div className="flex space-x-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-blood-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </Link>

          {/* Center Stats - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* XP Display */}
            <div className="flex items-center space-x-2 bg-dark-900/80 backdrop-blur-lg rounded-lg px-4 py-2 border border-blood-500/30 shadow-blood">
              <Award className="w-4 h-4 text-blood-400 animate-pulse medical-icon" />
              <span className="text-sm font-semibold text-white">
                {userProgress?.total_xp || 0} XP
              </span>
            </div>

            {/* Level Display */}
            <div className="flex items-center space-x-2 bg-dark-900/80 backdrop-blur-lg rounded-lg px-4 py-2 border border-neural-500/30 shadow-neural">
              <div className="w-6 h-6 bg-gradient-to-r from-neural-500 to-neural-600 rounded-full flex items-center justify-center animate-heartbeat shadow-glow-sm">
                <span className="text-xs font-bold text-white">{user.level}</span>
              </div>
              <span className="text-sm font-semibold text-white">
                Level {user.level}
              </span>
            </div>

            {/* Rank Badge */}
            <div className="flex items-center space-x-2 bg-dark-900/80 backdrop-blur-lg rounded-lg px-4 py-2 border border-bone-500/30">
              <div className={`w-3 h-3 rounded-full ${getRankBg(user.rank)} animate-pulse shadow-glow-sm`} />
              <span className="text-sm font-semibold text-white">
                {user.rank}
              </span>
            </div>

            {/* Streak */}
            <div className="flex items-center space-x-2 bg-dark-900/80 backdrop-blur-lg rounded-lg px-4 py-2 border border-bio-500/30 shadow-bio">
              <Activity className="w-4 h-4 text-bio-400 animate-pulse medical-icon" />
              <span className="text-sm font-semibold text-white">
                {user.streak} Day Streak
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-bone-400 hover:text-bio-400 hover:bg-bio-500/10 rounded-lg transition-all duration-200 relative group">
              <Bell className="w-5 h-5 medical-icon group-hover:animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blood-500 rounded-full animate-pulse shadow-glow-sm" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-bone-400 hover:text-bio-400 hover:bg-bio-500/10 rounded-lg transition-all duration-200"
            >
              <Menu className="w-5 h-5 medical-icon" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 bg-dark-900/80 hover:bg-bio-500/10 rounded-xl px-3 py-2 transition-all duration-200 border border-bone-500/30 hover:border-bio-500/50 group backdrop-blur-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-bio-500 to-medical-600 rounded-full flex items-center justify-center shadow-bio group-hover:animate-heartbeat">
                  <span className="text-sm font-bold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-white">Dr. {user.username}</p>
                  <p className={`text-xs ${getRankColor(user.rank)} font-medium`}>{user.rank}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-bone-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-dark-950/95 border border-bio-500/30 rounded-xl shadow-dark-lg overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-4 border-b border-bio-500/30 bg-gradient-to-r from-bio-500/10 to-medical-500/10">
                      <p className="font-semibold text-white">Dr. {user.username}</p>
                      <p className="text-sm text-bone-300">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRankColor(user.rank)} bg-dark-800/50 border border-bio-500/30`}>
                          {user.rank}
                        </span>
                        <span className="text-xs text-bone-400 font-medium">Level {user.level}</span>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-bone-300 hover:bg-bio-500/10 hover:text-bio-400 transition-all duration-200 group"
                      >
                        <User className="w-4 h-4 medical-icon group-hover:animate-pulse" />
                        <span className="font-medium">Medical Profile</span>
                      </Link>
                      
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-bone-300 hover:bg-bio-500/10 hover:text-bio-400 transition-all duration-200 group"
                      >
                        <Settings className="w-4 h-4 medical-icon group-hover:animate-pulse" />
                        <span className="font-medium">Settings</span>
                      </Link>
                      
                      <div className="border-t border-bio-500/30 my-1"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-blood-400 hover:bg-blood-500/10 hover:text-blood-300 transition-all duration-200 group"
                      >
                        <LogOut className="w-4 h-4 medical-icon group-hover:animate-pulse" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-bio-500/30 py-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 bg-dark-900/80 rounded-lg px-3 py-2 border border-blood-500/30 backdrop-blur-lg">
                  <Award className="w-4 h-4 text-blood-400 medical-icon" />
                  <span className="text-sm font-semibold text-white">
                    {userProgress?.total_xp || 0} XP
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-dark-900/80 rounded-lg px-3 py-2 border border-neural-500/30 backdrop-blur-lg">
                  <div className="w-5 h-5 bg-gradient-to-r from-neural-500 to-neural-600 rounded-full flex items-center justify-center shadow-glow-sm">
                    <span className="text-xs font-bold text-white">{user.level}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    Level {user.level}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-dark-900/80 rounded-lg px-3 py-2 border border-bone-500/30 backdrop-blur-lg">
                  <div className={`w-3 h-3 rounded-full ${getRankBg(user.rank)} shadow-glow-sm`} />
                  <span className="text-sm font-semibold text-white">
                    {user.rank}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-dark-900/80 rounded-lg px-3 py-2 border border-bio-500/30 backdrop-blur-lg">
                  <Activity className="w-4 h-4 text-bio-400 medical-icon" />
                  <span className="text-sm font-semibold text-white">
                    {user.streak} Days
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close menus */}
      {(showUserMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </motion.nav>
  );
};
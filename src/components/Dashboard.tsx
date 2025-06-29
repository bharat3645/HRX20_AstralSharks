import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  LogOut, 
  Zap, 
  Flame, 
  Trophy, 
  Target,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Heart,
  Brain,
  Microscope,
  Shield,
  Activity,
  Award,
  BookOpen,
  Users,
  Clock,
  Star,
  Calendar,
  BarChart3,
  Code2,
  Stethoscope,
  Rocket,
  Globe,
  DollarSign,
  PieChart,
  LineChart,
  Calculator
} from 'lucide-react';
import { User as UserType } from '../store/authStore';

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const domainConfig = {
    tech: {
      name: 'Mentoro AI Academy',
      gradient: 'from-blue-500 via-purple-500 to-cyan-500',
      bgGradient: 'from-blue-900/20 via-purple-900/20 to-cyan-900/20',
      website: 'https://mentoro-ai.netlify.app',
      websiteName: 'Mentoro AI',
      description: 'Continue your coding journey with AI-powered mentorship and interactive projects',
      icon: '🤖',
      primaryIcon: <Code2 className="w-8 h-8" />
    },
    medicine: {
      name: 'MedNova AI Academy',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-900/20 via-teal-900/20 to-cyan-900/20',
      website: 'https://mednova-ai.netlify.app',
      websiteName: 'MedNova AI',
      description: 'Advance your medical expertise with AI-powered diagnostics and virtual patient simulations',
      icon: '⚕️',
      primaryIcon: <Stethoscope className="w-8 h-8" />
    },
    finance: {
      name: 'Finova AI Academy',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      bgGradient: 'from-amber-900/20 via-orange-900/20 to-red-900/20',
      website: 'https://finova-ai.netlify.app',
      websiteName: 'Finova AI',
      description: 'Master financial markets with AI-powered trading simulations and investment strategies',
      icon: '💰',
      primaryIcon: <DollarSign className="w-8 h-8" />
    }
  };

  const config = domainConfig[user.domain as keyof typeof domainConfig];
  
  const moodColors = {
    calm: 'from-blue-400 to-blue-600',
    focused: 'from-purple-400 to-purple-600',
    excited: 'from-orange-400 to-orange-600',
    stressed: 'from-red-400 to-red-600'
  };

  const xpProgress = (user.xp / user.nextLevelXP) * 100;
  const xpToNext = user.nextLevelXP - user.xp;

  const handleWebsiteRedirect = () => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-gradient-to-br from-purple-900 via-emerald-900 to-cyan-900 z-50 flex items-center justify-center';
    overlay.innerHTML = `
      <div class="text-center text-white">
        <div class="relative mb-8">
          <div class="animate-spin w-20 h-20 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-10 h-10 bg-gradient-to-r ${config.gradient} rounded-full animate-pulse"></div>
          </div>
        </div>
        <p class="text-3xl font-bold mb-3">Seamlessly transitioning to ${config.websiteName}...</p>
        <p class="text-gray-300 text-lg">Preparing your personalized AI learning environment</p>
        <div class="mt-6 flex items-center justify-center space-x-2">
          <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      window.open(config.website, '_blank');
      document.body.removeChild(overlay);
    }, 2500);
  };

  const FloatingElements = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {user.domain === 'medicine' ? (
        <>
          <motion.div
            className="absolute top-20 right-20 text-emerald-400/4"
            animate={{
              y: [0, -40, 0],
              rotate: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          >
            <Heart className="w-28 h-28" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-16 text-teal-400/4"
            animate={{
              y: [0, 35, 0],
              rotate: [0, -15, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 3 }}
          >
            <Brain className="w-32 h-32" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-10 text-cyan-400/4"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Microscope className="w-24 h-24" />
          </motion.div>
        </>
      ) : user.domain === 'finance' ? (
        <>
          <motion.div
            className="absolute top-20 right-20 text-amber-400/4"
            animate={{
              y: [0, -40, 0],
              rotate: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          >
            <TrendingUp className="w-28 h-28" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-16 text-orange-400/4"
            animate={{
              y: [0, 35, 0],
              rotate: [0, -15, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 3 }}
          >
            <PieChart className="w-32 h-32" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-10 text-red-400/4"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <LineChart className="w-24 h-24" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-1/4 text-amber-300/4"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          >
            <Calculator className="w-20 h-20" />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            className="absolute top-20 right-20 text-blue-400/4"
            animate={{
              y: [0, -40, 0],
              rotate: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          >
            <Rocket className="w-28 h-28" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-16 text-purple-400/4"
            animate={{
              y: [0, 35, 0],
              rotate: [0, -15, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, delay: 3 }}
          >
            <Code2 className="w-32 h-32" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-10 text-cyan-400/4"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-24 h-24" />
          </motion.div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-40`}
          animate={{
            background: user.domain === 'medicine' 
              ? [
                  'linear-gradient(to bottom right, rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4))',
                  'linear-gradient(to top left, rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.4))',
                  'linear-gradient(to bottom right, rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4))'
                ]
              : user.domain === 'finance'
              ? [
                  'linear-gradient(to bottom right, rgba(245, 158, 11, 0.4), rgba(249, 115, 22, 0.4), rgba(239, 68, 68, 0.4))',
                  'linear-gradient(to top left, rgba(239, 68, 68, 0.4), rgba(245, 158, 11, 0.4), rgba(249, 115, 22, 0.4))',
                  'linear-gradient(to bottom right, rgba(245, 158, 11, 0.4), rgba(249, 115, 22, 0.4), rgba(239, 68, 68, 0.4))'
                ]
              : [
                  'linear-gradient(to bottom right, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4), rgba(6, 182, 212, 0.4))',
                  'linear-gradient(to top left, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
                  'linear-gradient(to bottom right, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4), rgba(6, 182, 212, 0.4))'
                ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <FloatingElements />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="text-6xl">{user.avatar}</div>
              {user.domain === 'medicine' && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-3 h-3 text-white" />
                </motion.div>
              )}
              {user.domain === 'finance' && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">
                Welcome back, {user.username}!
              </h1>
              <p className="text-gray-300 text-xl mb-2">{config.name}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Rank: {user.rank}</span>
                <span>•</span>
                <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                <span>•</span>
                <span>Last active: {new Date(user.lastActive).toLocaleDateString()}</span>
              </div>
              {user.specialization && (
                <p className="text-gray-400 text-lg mt-1">Specialization: {user.specialization}</p>
              )}
            </div>
          </div>
          
          <motion.button
            onClick={onLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <Trophy className="w-10 h-10 text-yellow-400" />
              <span className="text-3xl font-bold text-white">Lv.{user.level}</span>
            </div>
            <p className="text-gray-300 text-lg font-medium">Current Level</p>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
          </motion.div>

          {/* XP Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-10 h-10 text-blue-400" />
              <span className="text-3xl font-bold text-white">{user.xp.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
              <motion.div
                className={`bg-gradient-to-r ${config.gradient} h-3 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
            </div>
            <p className="text-gray-300 text-sm">{xpToNext.toLocaleString()} XP to next level</p>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <Flame className="w-10 h-10 text-orange-400" />
              <span className="text-3xl font-bold text-white">{user.streak}</span>
            </div>
            <p className="text-gray-300 text-lg font-medium">Day Streak 🔥</p>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
          </motion.div>

          {/* Study Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <Clock className="w-10 h-10 text-green-400" />
              <span className="text-3xl font-bold text-white">{user.studyHours}</span>
            </div>
            <p className="text-gray-300 text-lg font-medium">Study Hours</p>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Enhanced Progress Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Learning Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Learning Progress</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-semibold">Courses Completed</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{user.coursesCompleted}</div>
                <div className="text-gray-400 text-sm">+3 this month</div>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${moodColors[user.mood]}`} />
                  <span className="text-white font-semibold">Current Mood</span>
                </div>
                <div className="text-2xl font-bold text-white mb-2 capitalize">{user.mood}</div>
                <div className="text-gray-400 text-sm">Optimal for learning</div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Quick Stats</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Global Rank</span>
                <span className="text-white font-semibold">#1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Domain Rank</span>
                <span className="text-white font-semibold">#342</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Accuracy</span>
                <span className="text-white font-semibold">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg. Session</span>
                <span className="text-white font-semibold">2.4h</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Achievements Section */}
        {user.achievements && user.achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Recent Achievements</h3>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                {user.achievements.length} unlocked
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {user.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`p-4 bg-gradient-to-r ${config.gradient} bg-opacity-20 rounded-2xl text-center border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
                >
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-white text-sm font-semibold">{achievement}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Enhanced Main Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/10 backdrop-blur-lg rounded-4xl p-12 border border-white/20 mb-12 relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-5`} />
          
          <div className="text-center relative z-10">
            <motion.div 
              className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r ${config.gradient} rounded-4xl mb-8 shadow-2xl relative`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Target className="w-16 h-16 text-white" />
              {user.domain === 'medicine' && (
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Activity className="w-4 h-4 text-white" />
                </motion.div>
              )}
              {user.domain === 'finance' && (
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
            
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready for Your Next Quest?
            </h2>
            
            <p className="text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              {config.description}
            </p>
            
            <motion.button
              onClick={handleWebsiteRedirect}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r ${config.gradient} text-white font-bold text-2xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Launch {config.websiteName}</span>
              <ExternalLink className="w-7 h-7 relative z-10" />
              <Sparkles className="w-6 h-6 relative z-10" />
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Domain-Specific Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {user.domain === 'medicine' ? (
            <>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Patient Care Excellence</h3>
                <p className="text-gray-400 leading-relaxed">AI-powered diagnostic assistance and virtual patient interactions for comprehensive medical training</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Medical AI Innovation</h3>
                <p className="text-gray-400 leading-relaxed">Advanced machine learning algorithms for medical diagnosis, treatment planning, and research</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <Microscope className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Research & Analysis</h3>
                <p className="text-gray-400 leading-relaxed">Cutting-edge medical research tools, case study analysis, and evidence-based learning</p>
              </div>
            </>
          ) : user.domain === 'finance' ? (
            <>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <TrendingUp className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">AI Trading Intelligence</h3>
                <p className="text-gray-400 leading-relaxed">Advanced algorithmic trading strategies with real-time market analysis and risk assessment</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <PieChart className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Portfolio Optimization</h3>
                <p className="text-gray-400 leading-relaxed">AI-powered portfolio management with diversification strategies and performance analytics</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <LineChart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Market Analysis</h3>
                <p className="text-gray-400 leading-relaxed">Comprehensive financial modeling, trend analysis, and predictive market intelligence tools</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <Code2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Mentorship</h3>
                <p className="text-gray-400 leading-relaxed">Personalized coding guidance with intelligent feedback systems and real-time code analysis</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <Rocket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Interactive Projects</h3>
                <p className="text-gray-400 leading-relaxed">Real-world coding challenges with AI-powered assistance and industry-standard practices</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Career Development</h3>
                <p className="text-gray-400 leading-relaxed">Progressive learning paths tailored to your coding journey with job placement assistance</p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};
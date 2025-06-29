import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Brain, 
  Stethoscope, 
  FileText, 
  User,
  Swords,
  Target,
  Star,
  Dna,
  Heart,
  Microscope,
  Activity
} from 'lucide-react';
import { useMedicalStore } from '../../store/medicalStore';

export const MedicalSidebar: React.FC = () => {
  const { user } = useMedicalStore();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', description: 'Overview & progress', color: 'medical', gradient: 'from-medical-500 to-medical-600' },
    { icon: Users, label: 'Patient Cases', path: '/cases', description: 'Virtual patient simulations', color: 'blood', gradient: 'from-blood-500 to-blood-600' },
    { icon: BookOpen, label: 'Flashcards', path: '/flashcards', description: 'Study medical concepts', color: 'bio', gradient: 'from-bio-500 to-bio-600' },
    { icon: Stethoscope, label: 'Simulator', path: '/simulator', description: 'Clinical practice', color: 'oxygen', gradient: 'from-oxygen-500 to-oxygen-600' },
    { icon: Swords, label: 'MedBattle', path: '/battle', description: 'Diagnostic battles', color: 'neural', gradient: 'from-neural-500 to-neural-600' },
    { icon: Brain, label: 'AI Mentor', path: '/mentor', description: 'Personalized guidance', color: 'medical', gradient: 'from-medical-500 to-bio-500' },
    { icon: FileText, label: 'Study Journal', path: '/journal', description: 'Notes & insights', color: 'bio', gradient: 'from-bio-500 to-medical-500' },
    { icon: User, label: 'Profile', path: '/profile', description: 'Account settings', color: 'bone', gradient: 'from-bone-500 to-bone-600' },
  ];

  if (!user) return null;

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 bottom-0 w-64 bg-dark-950/95 backdrop-blur-xl border-r border-bio-500/20 overflow-y-auto z-40 shadow-dark-lg dark-pattern-medical"
    >
      {/* User Info */}
      <div className="p-6 border-b border-bio-500/30 bg-gradient-to-r from-bio-500/10 to-medical-500/10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-bio-500 to-medical-600 rounded-xl flex items-center justify-center shadow-bio animate-heartbeat">
              <span className="text-lg font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blood-500 to-blood-600 rounded-full flex items-center justify-center shadow-glow-sm">
              <Heart className="w-3 h-3 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white medical-heading">Dr. {user.username}</h3>
            <p className="text-sm text-bio-400 font-medium">{user.rank}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-bone-200 mb-2 font-medium">
            <span>Level {user.level}</span>
            <span>{Math.round((user.xp % 1000) / 10)}%</span>
          </div>
          <div className="w-full bg-dark-800/80 rounded-full h-3 overflow-hidden border border-bio-500/30">
            <div 
              className="medical-progress h-3 rounded-full transition-all duration-500"
              style={{ width: `${(user.xp % 1000) / 10}%` }}
            />
          </div>
          <p className="text-xs text-bone-400 mt-2 font-medium">
            {1000 - (user.xp % 1000)} XP to next level
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    isActive
                      ? `bg-dark-900/80 border border-${item.color}-500/40 shadow-${item.color} text-white backdrop-blur-lg`
                      : 'text-bone-400 hover:bg-dark-900/60 hover:text-white hover:border-bio-500/30 border border-transparent backdrop-blur-sm'
                  }`}
                >
                  <div className="relative">
                    <item.icon className={`w-5 h-5 ${isActive ? `text-${item.color}-400` : 'text-bone-500 group-hover:text-bio-400'} transition-colors duration-200 medical-icon`} />
                    {isActive && (
                      <div className="absolute inset-0 animate-pulse">
                        <item.icon className={`w-5 h-5 text-${item.color}-400 opacity-50`} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isActive ? 'text-white' : 'text-bone-200 group-hover:text-white'} transition-colors duration-200`}>
                      {item.label}
                    </p>
                    <p className={`text-xs ${isActive ? `text-${item.color}-400` : 'text-bone-500 group-hover:text-bio-400'} transition-colors duration-200 font-medium`}>
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className={`w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse shadow-glow-sm`} />
                    </div>
                  )}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-5 rounded-xl`} />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Daily Progress */}
      <div className="p-4 border-t border-bio-500/30 mt-auto">
        <div className="bg-dark-900/80 backdrop-blur-lg rounded-xl p-4 border border-bio-500/30 relative overflow-hidden shadow-bio">
          <div className="absolute top-2 right-2">
            <Microscope className="w-6 h-6 text-bio-400/20 animate-dna-spin" />
          </div>
          <div className="absolute bottom-1 right-1">
            <Dna className="w-4 h-4 text-neural-400/30 animate-dna-spin" />
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-4 h-4 text-bio-400 animate-pulse medical-icon" />
            <span className="text-sm font-bold text-white">Daily Progress</span>
          </div>
          
          <div className="w-full bg-dark-800/60 rounded-full h-3 mb-3 overflow-hidden border border-bio-500/30">
            <div 
              className="medical-progress h-3 rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            />
          </div>
          
          <p className="text-xs text-bio-400 font-semibold mb-3">
            75% Complete • Keep going!
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-blood-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-blood-400 animate-pulse" />
              <p className="text-xs text-blood-400 font-bold">
                {user.streak} day streak!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};
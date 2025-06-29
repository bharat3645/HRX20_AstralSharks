import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Stethoscope, 
  DollarSign,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  website: string;
  rating: number;
}

interface DomainSelectorProps {
  onDomainSelect: (domain: string) => void;
  selectedDomain: string | null;
}

const domains: Domain[] = [
  {
    id: 'tech',
    name: 'Mentoro AI',
    tagline: 'Your AI Coding Mentor',
    description: 'Master programming with personalized AI guidance and real-time feedback',
    icon: <Code2 className="w-8 h-8" />,
    gradient: 'from-blue-500 via-purple-500 to-cyan-500',
    website: 'https://mentoro-ai.netlify.app',
    rating: 4.9
  },
  {
    id: 'medicine',
    name: 'MedNova AI',
    tagline: 'Advanced Medical AI Education',
    description: 'Revolutionary medical training with AI diagnostics and virtual patients',
    icon: <Stethoscope className="w-8 h-8" />,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    website: 'https://mednova-ai.netlify.app',
    rating: 4.8
  },
  {
    id: 'finance',
    name: 'Finova AI',
    tagline: 'Smart Financial Intelligence',
    description: 'Master financial markets with AI-powered trading and analysis tools',
    icon: <DollarSign className="w-8 h-8" />,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    website: 'https://finova-ai.netlify.app',
    rating: 4.7
  }
];

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animated gradient orbs */}
    <motion.div
      className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
      animate={{
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <motion.div
      className="absolute top-40 right-1/3 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl"
      animate={{
        y: [0, 40, 0],
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{ duration: 10, repeat: Infinity, delay: 2 }}
    />
    <motion.div
      className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-xl"
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 12, repeat: Infinity, delay: 4 }}
    />
  </div>
);

export const DomainSelector: React.FC<DomainSelectorProps> = ({ 
  onDomainSelect, 
  selectedDomain 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-900/50 to-slate-900"></div>
        <FloatingElements />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-7xl">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div 
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500 rounded-full mb-8 shadow-2xl relative"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="w-12 h-12 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500 opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            
            <h1 className="text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-emerald-200 bg-clip-text text-transparent mb-6">
              Astral AI
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose your domain and embark on an AI-powered learning journey that transforms your expertise
            </p>
          </motion.div>

          {/* Glassmorphism Domain Cards - Perfectly Symmetrical */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {domains.map((domain, index) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -10 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onDomainSelect(domain.id)}
                className={`
                  relative cursor-pointer group h-full
                  ${selectedDomain === domain.id ? 'ring-2 ring-white/30' : ''}
                `}
              >
                {/* Glassmorphism Card */}
                <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                  
                  {/* Gradient Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Animated Border Glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${domain.gradient} opacity-0 group-hover:opacity-20 blur-sm`}
                    style={{ padding: '1px' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    
                    {/* Icon Section */}
                    <div className="flex justify-center mb-8">
                      <motion.div 
                        className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${domain.gradient} rounded-2xl shadow-2xl relative`}
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {domain.icon}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-white/20"
                          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Title & Tagline */}
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-white mb-3">
                        {domain.name}
                      </h3>
                      <p className={`text-xl font-semibold bg-gradient-to-r ${domain.gradient} bg-clip-text text-transparent mb-4`}>
                        {domain.tagline}
                      </p>
                      <p className="text-gray-300 text-base leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-2 mb-10">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(domain.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-white font-semibold text-xl">{domain.rating}</span>
                    </div>
                    
                    {/* Launch Button - Fixed at bottom */}
                    <div className="mt-auto">
                      <motion.div
                        className={`w-full px-8 py-5 bg-gradient-to-r ${domain.gradient} rounded-2xl text-white font-bold text-xl shadow-2xl flex items-center justify-between group-hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">Launch Platform</span>
                        <ChevronRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${domain.gradient} blur-2xl`}
                    style={{ transform: 'scale(1.1)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-8 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">115K+ Learners</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">592 AI Courses</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">92% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
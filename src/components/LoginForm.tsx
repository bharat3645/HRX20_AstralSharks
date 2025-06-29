import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  LogIn, 
  AlertCircle, 
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  Heart,
  Brain,
  Microscope,
  Shield,
  Stethoscope,
  Activity,
  Code2,
  Zap,
  Star,
  Users,
  TrendingUp,
  Award,
  ChevronLeft,
  Rocket,
  BookOpen,
  Clock,
  Target,
  CheckCircle,
  DollarSign,
  PieChart,
  LineChart,
  BarChart3,
  Calculator
} from 'lucide-react';

interface LoginFormProps {
  domain: string;
  onLogin: (credentials: { username: string; password: string; domain: string }) => Promise<boolean>;
  onBack: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ domain, onLogin, onBack }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const domainConfig = {
    tech: {
      name: 'Mentoro AI',
      fullName: 'Mentoro AI Academy',
      subtitle: 'Your AI Coding Mentor',
      description: 'Master programming with personalized AI guidance, real-time feedback, and industry-grade projects',
      gradient: 'from-blue-500 via-purple-500 to-cyan-500',
      bgGradient: 'from-blue-900/20 via-purple-900/20 to-cyan-900/20',
      icon: '🤖',
      primaryIcon: <Code2 className="w-10 h-10" />,
      demoCredentials: [
        { username: 'alexcode', password: 'dev2024', role: 'Senior Developer', level: 'Expert', xp: '15.4K', streak: 47 },
        { username: 'sarah_dev', password: 'frontend123', role: 'Frontend Specialist', level: 'Advanced', xp: '8.7K', streak: 23 },
        { username: 'mike_student', password: 'learn2024', role: 'CS Student', level: 'Beginner', xp: '2.3K', streak: 12 }
      ],
      features: ['AI Code Review', 'Live Mentorship', 'Project Portfolio', 'Career Guidance'],
      stats: { learners: '52,340', rating: 4.9, courses: '247', completion: '94%' },
      highlights: [
        '🚀 Launch your tech career with confidence',
        '🤖 AI-powered personalized learning paths', 
        '💼 Real industry projects and internships',
        '🎯 Job placement assistance included'
      ],
      testimonial: {
        text: "Mentoro AI transformed my coding journey. The AI mentor feels like having a senior developer by your side 24/7.",
        author: "Alex Chen, Software Engineer at Google"
      }
    },
    medicine: {
      name: 'MedNova AI',
      fullName: 'MedNova AI Academy',
      subtitle: 'Advanced Medical AI Education',
      description: 'Revolutionary medical training with AI diagnostics, virtual patients, and cutting-edge simulations',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-900/20 via-teal-900/20 to-cyan-900/20',
      icon: '⚕️',
      primaryIcon: <Stethoscope className="w-10 h-10" />,
      demoCredentials: [
        { username: 'dr_smith', password: 'medicine2024', role: 'Senior Physician', level: 'Expert', xp: '22.8K', streak: 89 },
        { username: 'emma_med', password: 'study2024', role: 'Medical Student', level: 'Intermediate', xp: '4.2K', streak: 34 },
        { username: 'dr_patel', password: 'emergency2024', role: 'Emergency Physician', level: 'Advanced', xp: '12.6K', streak: 56 }
      ],
      features: ['AI Diagnostics', 'Virtual Patients', 'Case Studies', 'Medical Simulations'],
      stats: { learners: '28,750', rating: 4.8, courses: '189', completion: '91%' },
      highlights: [
        '⚕️ Advanced medical training with AI precision',
        '🧠 Virtual patient interactions and diagnostics',
        '🏥 Real case studies from leading hospitals',
        '📊 Evidence-based learning methodologies'
      ],
      testimonial: {
        text: "MedNova AI's virtual patients prepared me better than traditional textbooks ever could. The diagnostic AI is incredibly accurate.",
        author: "Dr. Sarah Johnson, Internal Medicine Resident"
      }
    },
    finance: {
      name: 'Finova AI',
      fullName: 'Finova AI Academy',
      subtitle: 'Smart Financial Intelligence',
      description: 'Master finance with AI-powered market analysis, algorithmic trading simulations, and real-world investment strategies',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      bgGradient: 'from-amber-900/20 via-orange-900/20 to-red-900/20',
      icon: '💰',
      primaryIcon: <DollarSign className="w-10 h-10" />,
      demoCredentials: [
        { username: 'warren_trader', password: 'finance2024', role: 'Senior Analyst', level: 'Expert', xp: '19.6K', streak: 73 },
        { username: 'sophia_cfa', password: 'invest2024', role: 'Portfolio Manager', level: 'Advanced', xp: '13.4K', streak: 45 },
        { username: 'james_fintech', password: 'crypto2024', role: 'FinTech Specialist', level: 'Intermediate', xp: '6.8K', streak: 28 }
      ],
      features: ['AI Trading Bots', 'Market Analysis', 'Risk Assessment', 'Portfolio Optimization'],
      stats: { learners: '34,920', rating: 4.7, courses: '156', completion: '89%' },
      highlights: [
        '💰 Master financial markets with AI precision',
        '📈 Real-time trading simulations and strategies',
        '🏦 Learn from Wall Street professionals',
        '🤖 AI-powered portfolio optimization tools'
      ],
      testimonial: {
        text: "Finova AI's trading simulations gave me the confidence to manage real portfolios. The AI market analysis is incredibly sophisticated.",
        author: "Warren Mitchell, Investment Analyst at Goldman Sachs"
      }
    }
  };

  const config = domainConfig[domain as keyof typeof domainConfig];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await onLogin({
        ...credentials,
        domain
      });

      if (!success) {
        setError('Invalid credentials. Please check your username and password or try a demo account.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoUser: any) => {
    setCredentials({
      username: demoUser.username,
      password: demoUser.password
    });
  };

  const MedicalFloatingIcons = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 text-emerald-400/6"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Heart className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-16 text-teal-400/6"
        animate={{
          y: [0, 35, 0],
          rotate: [0, -25, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
      >
        <Brain className="w-24 h-24" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-16 text-cyan-400/6"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, delay: 4 }}
      >
        <Microscope className="w-22 h-22" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-emerald-300/6"
        animate={{
          rotate: 360,
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <Shield className="w-16 h-16" />
      </motion.div>
    </div>
  );

  const TechFloatingIcons = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 text-blue-400/6"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Rocket className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-16 text-purple-400/6"
        animate={{
          y: [0, 35, 0],
          rotate: [0, -25, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
      >
        <Code2 className="w-24 h-24" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-16 text-cyan-400/6"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, delay: 4 }}
      >
        <Brain className="w-22 h-22" />
      </motion.div>
    </div>
  );

  const FinanceFloatingIcons = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 text-amber-400/6"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <TrendingUp className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-16 text-orange-400/6"
        animate={{
          y: [0, 35, 0],
          rotate: [0, -25, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
      >
        <PieChart className="w-24 h-24" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-16 text-red-400/6"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, delay: 4 }}
      >
        <LineChart className="w-22 h-22" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-amber-300/6"
        animate={{
          rotate: 360,
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <Calculator className="w-16 h-16" />
      </motion.div>
    </div>
  );

  const getFloatingIcons = () => {
    switch (domain) {
      case 'medicine':
        return <MedicalFloatingIcons />;
      case 'finance':
        return <FinanceFloatingIcons />;
      default:
        return <TechFloatingIcons />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Domain-specific Background */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-60`}
          animate={{
            background: domain === 'medicine' 
              ? [
                  'linear-gradient(to bottom right, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.25))',
                  'linear-gradient(to top left, rgba(59, 130, 246, 0.25), rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25))',
                  'linear-gradient(to bottom right, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.25))'
                ]
              : domain === 'finance'
              ? [
                  'linear-gradient(to bottom right, rgba(245, 158, 11, 0.25), rgba(249, 115, 22, 0.25), rgba(239, 68, 68, 0.25))',
                  'linear-gradient(to top left, rgba(239, 68, 68, 0.25), rgba(245, 158, 11, 0.25), rgba(249, 115, 22, 0.25))',
                  'linear-gradient(to bottom right, rgba(245, 158, 11, 0.25), rgba(249, 115, 22, 0.25), rgba(239, 68, 68, 0.25))'
                ]
              : [
                  'linear-gradient(to bottom right, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.25), rgba(6, 182, 212, 0.25))',
                  'linear-gradient(to top left, rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.25))',
                  'linear-gradient(to bottom right, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.25), rgba(6, 182, 212, 0.25))'
                ]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        
        {/* Domain-specific floating elements */}
        {getFloatingIcons()}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Enhanced Left Side - Platform Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* Enhanced Header */}
            <div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${config.gradient} rounded-3xl mb-8 shadow-2xl text-5xl relative`}
              >
                {config.icon}
                {domain === 'medicine' && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Activity className="w-3 h-3 text-white" />
                  </motion.div>
                )}
                {domain === 'finance' && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.div>
              
              <h1 className="text-6xl font-bold text-white mb-4">
                {config.name}
              </h1>
              <p className={`text-2xl font-semibold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-6`}>
                {config.subtitle}
              </p>
              <p className="text-gray-300 text-xl leading-relaxed">
                {config.description}
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  <div className="text-3xl font-bold text-white">{config.stats.learners}</div>
                </div>
                <div className="text-gray-400 text-sm">Active Learners</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="w-6 h-6 text-green-400" />
                  <div className="text-3xl font-bold text-white">{config.stats.courses}</div>
                </div>
                <div className="text-gray-400 text-sm">AI Courses</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <div className="text-3xl font-bold text-white">{config.stats.rating}</div>
                </div>
                <div className="text-gray-400 text-sm">Average Rating</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  <div className="text-3xl font-bold text-white">{config.stats.completion}</div>
                </div>
                <div className="text-gray-400 text-sm">Completion Rate</div>
              </div>
            </div>

            {/* Enhanced Features */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-xl flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Platform Features
              </h3>
              {config.highlights.map((highlight, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="text-2xl">{highlight.split(' ')[0]}</div>
                  <div>
                    <span className="text-gray-300 leading-relaxed">{highlight.substring(2)}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center text-2xl`}>
                  💬
                </div>
                <div>
                  <p className="text-gray-300 italic mb-3">"{config.testimonial.text}"</p>
                  <p className="text-gray-400 text-sm">— {config.testimonial.author}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-4xl p-10 border border-white/10 shadow-2xl">
              
              {/* Enhanced Form Header */}
              <div className="text-center mb-10">
                <motion.div 
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${config.gradient} rounded-2xl mb-6 shadow-2xl`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {config.primaryIcon}
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-3">Welcome Back</h2>
                <p className="text-gray-400 text-lg">Sign in to continue your AI learning journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Enhanced Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-lg"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Enhanced Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-lg"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 px-6 bg-gradient-to-r ${config.gradient} text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed text-xl relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-6 h-6" />
                      <span>Enter {config.name}</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Enhanced Demo Credentials */}
              <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center space-x-2 mb-6">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <p className="text-sm text-gray-300 font-semibold">Quick Demo Access:</p>
                </div>
                <div className="space-y-4">
                  {config.demoCredentials.map((cred, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleDemoLogin(cred)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${config.gradient} rounded-xl flex items-center justify-center text-xl`}>
                            {config.icon}
                          </div>
                          <div>
                            <div className="text-white font-semibold">{cred.username}</div>
                            <div className="text-gray-400 text-sm">{cred.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium mb-1 ${
                            cred.level === 'Expert' ? 'bg-red-500/20 text-red-300' :
                            cred.level === 'Advanced' ? 'bg-orange-500/20 text-orange-300' :
                            cred.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {cred.level}
                          </div>
                          <div className="text-xs text-gray-400">
                            {cred.xp} XP • {cred.streak} day streak
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Back Button */}
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-8 py-4 text-gray-400 hover:text-white transition-colors text-lg flex items-center justify-center space-x-2 bg-white/5 rounded-xl border border-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Domain Selection</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
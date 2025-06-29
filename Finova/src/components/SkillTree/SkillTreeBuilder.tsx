import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, DollarSign, BarChart3, TrendingUp, Calculator, Target, Award, 
  CheckCircle, Lock, Play, BookOpen, Zap, Star, Crown, Sparkles,
  ChevronRight, Trophy, Users, Clock, ArrowRight
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface SkillNode {
  id: string;
  title: string;
  description: string;
  category: 'foundation' | 'intermediate' | 'advanced' | 'mastery';
  icon: any;
  color: string;
  prerequisites: string[];
  xpReward: number;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  completed: boolean;
  locked: boolean;
  progress: number;
  lessons: number;
  quizzes: number;
  flashcards: number;
}

const skillNodes: SkillNode[] = [
  // Foundation Tier
  {
    id: 'financial-statements',
    title: 'Financial Statements Mastery',
    description: 'Master the three core financial statements: Income Statement, Balance Sheet, and Cash Flow Statement',
    category: 'foundation',
    icon: BarChart3,
    color: 'from-blue-400 to-cyan-500',
    prerequisites: [],
    xpReward: 150,
    estimatedTime: '2 hours',
    difficulty: 'Beginner',
    completed: false,
    locked: false,
    progress: 0,
    lessons: 5,
    quizzes: 3,
    flashcards: 15
  },
  {
    id: 'ratio-analysis',
    title: 'Financial Ratio Analysis',
    description: 'Learn to calculate and interpret key financial ratios for business analysis',
    category: 'foundation',
    icon: Calculator,
    color: 'from-green-400 to-emerald-500',
    prerequisites: ['financial-statements'],
    xpReward: 200,
    estimatedTime: '3 hours',
    difficulty: 'Beginner',
    completed: false,
    locked: true,
    progress: 0,
    lessons: 6,
    quizzes: 4,
    flashcards: 20
  },
  {
    id: 'time-value-money',
    title: 'Time Value of Money',
    description: 'Understand present value, future value, and discounting concepts',
    category: 'foundation',
    icon: DollarSign,
    color: 'from-yellow-400 to-orange-500',
    prerequisites: [],
    xpReward: 180,
    estimatedTime: '2.5 hours',
    difficulty: 'Beginner',
    completed: false,
    locked: false,
    progress: 0,
    lessons: 4,
    quizzes: 3,
    flashcards: 12
  },

  // Intermediate Tier
  {
    id: 'dcf-valuation',
    title: 'DCF Valuation Modeling',
    description: 'Build comprehensive discounted cash flow models for company valuation',
    category: 'intermediate',
    icon: TrendingUp,
    color: 'from-purple-400 to-pink-500',
    prerequisites: ['financial-statements', 'time-value-money'],
    xpReward: 300,
    estimatedTime: '4 hours',
    difficulty: 'Intermediate',
    completed: false,
    locked: true,
    progress: 0,
    lessons: 8,
    quizzes: 5,
    flashcards: 25
  },
  {
    id: 'saas-metrics',
    title: 'SaaS Business Metrics',
    description: 'Master MRR, ARR, churn, CAC, LTV and other critical SaaS metrics',
    category: 'intermediate',
    icon: BarChart3,
    color: 'from-indigo-400 to-purple-500',
    prerequisites: ['ratio-analysis'],
    xpReward: 250,
    estimatedTime: '3.5 hours',
    difficulty: 'Intermediate',
    completed: false,
    locked: true,
    progress: 0,
    lessons: 7,
    quizzes: 4,
    flashcards: 18
  },
  {
    id: 'investment-analysis',
    title: 'Investment Analysis',
    description: 'Learn NPV, IRR, payback period and other investment evaluation methods',
    category: 'intermediate',
    icon: Target,
    color: 'from-teal-400 to-cyan-500',
    prerequisites: ['time-value-money', 'ratio-analysis'],
    xpReward: 280,
    estimatedTime: '4 hours',
    difficulty: 'Intermediate',
    completed: false,
    locked: true,
    progress: 0,
    lessons: 6,
    quizzes: 4,
    flashcards: 22
  },

  // Advanced Tier
  {
    id: 'merger-acquisition',
    title: 'M&A Financial Modeling',
    description: 'Advanced merger and acquisition analysis including synergies and deal structures',
    category: 'advanced',
    icon: Brain,
    color: 'from-red-400 to-pink-500',
    prerequisites: ['dcf-valuation', 'investment-analysis'],
    xpReward: 400,
    estimatedTime: '6 hours',
    difficulty: 'Advanced',
    completed: false,
    locked: true,
    progress: 0,
    lessons: 10,
    quizzes: 6,
    flashcards: 30
  },
  {
    id: 'risk-management',
    title: 'Financial Risk Management',
    description: 'Comprehensive risk assessment, hedging strategies, and portfolio optimization',
    category: 'advanced',
    icon: Award,
    color: 'from-orange-400 to-red-500',
    prerequisites: ['investment-analysis', 'saas-metrics'],
    xpReward: 350,
    estimatedTime: '5 hours',
    difficulty: 'Advanced',
    completed: false,
    locked: true,
    progress: 0,
    lessons: 9,
    quizzes: 5,
    flashcards: 28
  },

  // Mastery Tier
  {
    id: 'strategic-finance',
    title: 'Strategic Finance Leadership',
    description: 'Executive-level financial strategy, capital allocation, and value creation',
    category: 'mastery',
    icon: Crown,
    color: 'from-yellow-400 to-yellow-600',
    prerequisites: ['merger-acquisition', 'risk-management'],
    xpReward: 500,
    estimatedTime: '8 hours',
    difficulty: 'Expert',
    completed: false,
    locked: true,
    progress: 0,
    lessons: 12,
    quizzes: 8,
    flashcards: 35
  }
];

export const SkillTreeBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<SkillNode[]>(skillNodes);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState<'lesson' | 'quiz' | 'flashcards'>('lesson');
  const [stepProgress, setStepProgress] = useState(0);
  const { addXP } = useGameStore();

  useEffect(() => {
    updateNodeLocks();
  }, [nodes]);

  const updateNodeLocks = () => {
    setNodes(prevNodes => 
      prevNodes.map(node => ({
        ...node,
        locked: node.prerequisites.length > 0 && 
                !node.prerequisites.every(prereq => 
                  prevNodes.find(n => n.id === prereq)?.completed
                )
      }))
    );
  };

  const startSkill = (node: SkillNode) => {
    if (node.locked) {
      toast.error('Complete prerequisites first!');
      return;
    }
    setSelectedNode(node);
    setCurrentStep('lesson');
    setStepProgress(0);
  };

  const completeStep = () => {
    if (!selectedNode) return;

    const stepXP = {
      lesson: 25,
      quiz: 50,
      flashcards: 75
    };

    addXP(stepXP[currentStep]);
    
    if (currentStep === 'lesson') {
      setCurrentStep('quiz');
      toast.success(`Lesson completed! +${stepXP.lesson} XP`);
    } else if (currentStep === 'quiz') {
      setCurrentStep('flashcards');
      toast.success(`Quiz mastered! +${stepXP.quiz} XP`);
    } else {
      // Complete the entire skill
      completeSkill();
    }
    
    setStepProgress(0);
  };

  const completeSkill = () => {
    if (!selectedNode) return;

    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === selectedNode.id
          ? { ...node, completed: true, progress: 100 }
          : node
      )
    );

    addXP(selectedNode.xpReward);
    setShowConfetti(true);
    toast.success(`🎉 Skill Mastered! +${selectedNode.xpReward} XP`);
    
    setTimeout(() => {
      setShowConfetti(false);
      setSelectedNode(null);
    }, 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'intermediate': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'advanced': return 'from-red-500/20 to-orange-500/20 border-red-500/30';
      case 'mastery': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-orange-400 bg-orange-400/20';
      case 'Expert': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCompletedCount = (category: string) => {
    return nodes.filter(node => node.category === category && node.completed).length;
  };

  const getTotalCount = (category: string) => {
    return nodes.filter(node => node.category === category).length;
  };

  const categories = [
    { id: 'foundation', name: 'Foundation', icon: BookOpen, description: 'Core financial concepts' },
    { id: 'intermediate', name: 'Intermediate', icon: BarChart3, description: 'Advanced analysis skills' },
    { id: 'advanced', name: 'Advanced', icon: Brain, description: 'Expert-level modeling' },
    { id: 'mastery', name: 'Mastery', icon: Crown, description: 'Strategic leadership' }
  ];

  if (selectedNode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 rounded-2xl p-8 border border-slate-600/50 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedNode.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 10, scale: 1.05 }}
                >
                  <selectedNode.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedNode.title}</h2>
                  <p className="text-slate-400">{selectedNode.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                ← Back to Tree
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              {['lesson', 'quiz', 'flashcards'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      currentStep === step 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : index < ['lesson', 'quiz', 'flashcards'].indexOf(currentStep)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-600 text-slate-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step === 'lesson' && <BookOpen className="w-5 h-5" />}
                    {step === 'quiz' && <Brain className="w-5 h-5" />}
                    {step === 'flashcards' && <Zap className="w-5 h-5" />}
                  </motion.div>
                  <div className="ml-3">
                    <div className="text-white font-medium capitalize">{step}</div>
                    <div className="text-slate-400 text-sm">
                      {step === 'lesson' && `${selectedNode.lessons} lessons`}
                      {step === 'quiz' && `${selectedNode.quizzes} quizzes`}
                      {step === 'flashcards' && `${selectedNode.flashcards} cards`}
                    </div>
                  </div>
                  {index < 2 && (
                    <ChevronRight className="w-5 h-5 text-slate-600 mx-4" />
                  )}
                </div>
              ))}
            </div>

            {/* Current Step Content */}
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4 capitalize">
                {currentStep} Phase
              </h3>
              
              {currentStep === 'lesson' && (
                <div>
                  <p className="text-slate-300 mb-4">
                    Interactive lessons covering core concepts with real-world examples and case studies.
                  </p>
                  <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">Current Lesson: Introduction to {selectedNode.title}</h4>
                    <p className="text-slate-400 text-sm">
                      Learn the fundamental concepts and practical applications in modern finance.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 'quiz' && (
                <div>
                  <p className="text-slate-300 mb-4">
                    Test your understanding with challenging questions and real-world scenarios.
                  </p>
                  <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">Quiz: {selectedNode.title} Assessment</h4>
                    <p className="text-slate-400 text-sm">
                      Multiple choice and scenario-based questions to validate your knowledge.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 'flashcards' && (
                <div>
                  <p className="text-slate-300 mb-4">
                    Reinforce learning with spaced repetition flashcards for long-term retention.
                  </p>
                  <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">Flashcard Review: Key Concepts</h4>
                    <p className="text-slate-400 text-sm">
                      Master important terms, formulas, and concepts through active recall.
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(stepProgress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div 
                    className={`bg-gradient-to-r ${selectedNode.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stepProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setStepProgress(100);
                  setTimeout(completeStep, 1000);
                }}
                className={`w-full py-3 bg-gradient-to-r ${selectedNode.color} text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
              >
                <Play className="w-5 h-5" />
                <span>
                  {currentStep === 'flashcards' ? 'Complete Skill' : `Complete ${currentStep}`}
                </span>
              </motion.button>
            </div>

            {/* Skill Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{selectedNode.xpReward}</div>
                <div className="text-slate-400 text-sm">XP Reward</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{selectedNode.estimatedTime}</div>
                <div className="text-slate-400 text-sm">Est. Time</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${getDifficultyColor(selectedNode.difficulty).split(' ')[0]}`}>
                  {selectedNode.difficulty}
                </div>
                <div className="text-slate-400 text-sm">Difficulty</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.div 
              className="w-16 h-16 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.3)',
                  '0 0 30px rgba(16, 185, 129, 0.5)',
                  '0 0 20px rgba(16, 185, 129, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Mastery Path
            </h1>
          </div>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Progress through structured learning paths designed by finance experts. Master skills systematically from foundation to advanced expertise.
          </p>
        </motion.div>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${getCategoryColor(category.id)} rounded-xl p-6 backdrop-blur-xl border`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <category.icon className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-lg font-bold text-white">{category.name}</h3>
                  <p className="text-slate-300 text-sm">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {getCompletedCount(category.id)}/{getTotalCount(category.id)}
                </span>
                <div className="text-right">
                  <div className="text-sm text-slate-300">
                    {Math.round((getCompletedCount(category.id) / getTotalCount(category.id)) * 100)}%
                  </div>
                  <div className="text-xs text-slate-400">Complete</div>
                </div>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all"
                  style={{ width: `${(getCompletedCount(category.id) / getTotalCount(category.id)) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Tree */}
        <div className="space-y-12">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <category.icon className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white capitalize">{category.name} Skills</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nodes
                  .filter(node => node.category === category.id)
                  .map((node, index) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative bg-gradient-to-br from-slate-800/60 to-slate-700/60 rounded-xl p-6 border backdrop-blur-xl cursor-pointer group transition-all ${
                        node.locked 
                          ? 'border-slate-700/50 opacity-60' 
                          : node.completed
                          ? 'border-green-500/50 hover:border-green-400/70'
                          : 'border-slate-600/50 hover:border-emerald-500/50'
                      }`}
                      onClick={() => startSkill(node)}
                      whileHover={{ scale: node.locked ? 1 : 1.02, y: node.locked ? 0 : -4 }}
                    >
                      {/* Lock Overlay */}
                      {node.locked && (
                        <div className="absolute inset-0 bg-slate-900/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <Lock className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                            <div className="text-slate-500 text-sm font-medium">Locked</div>
                          </div>
                        </div>
                      )}

                      {/* Completion Badge */}
                      {node.completed && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-start space-x-4 mb-4">
                        <motion.div  
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${node.color} flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <node.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                            {node.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                            {node.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(node.difficulty)}`}>
                            {node.difficulty}
                          </span>
                          <div className="flex items-center space-x-3 text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{node.estimatedTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span>{node.xpReward} XP</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{node.lessons} lessons • {node.quizzes} quizzes • {node.flashcards} cards</span>
                        </div>

                        {!node.locked && (
                          <div className="flex items-center justify-between">
                            <div className="text-emerald-400 text-sm font-medium group-hover:text-emerald-300 flex items-center">
                              <span>{node.completed ? 'Completed' : 'Start Learning'}</span>
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Prerequisites */}
                      {node.prerequisites.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                          <div className="text-xs text-slate-500">
                            Prerequisites: {node.prerequisites.map(prereq => 
                              nodes.find(n => n.id === prereq)?.title
                            ).join(', ')}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
            Overall Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {nodes.filter(n => n.completed).length}
              </div>
              <div className="text-slate-400">Skills Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {nodes.reduce((sum, node) => sum + (node.completed ? node.xpReward : 0), 0)}
              </div>
              <div className="text-slate-400">XP Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {Math.round((nodes.filter(n => n.completed).length / nodes.length) * 100)}%
              </div>
              <div className="text-slate-400">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {nodes.reduce((sum, node) => sum + (node.completed ? parseInt(node.estimatedTime) : 0), 0)}h
              </div>
              <div className="text-slate-400">Time Invested</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
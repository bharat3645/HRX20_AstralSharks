import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Target, Clock, Lightbulb, CheckCircle, X, Zap, Trophy, RotateCcw } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import toast from 'react-hot-toast';

interface Equation {
  id: string;
  name: string;
  formula: string;
  description: string;
  category: 'finance' | 'marketing' | 'saas';
  difficulty: 'easy' | 'medium' | 'hard';
  variables: Array<{
    name: string;
    symbol: string;
    description: string;
  }>;
}

interface Problem {
  id: string;
  equation: Equation;
  question: string;
  variables: { [key: string]: number };
  correctAnswer: number;
  unit: string;
  explanation: string;
}

const equations: Equation[] = [
  {
    id: 'roi',
    name: 'Return on Investment (ROI)',
    formula: 'ROI = (Gain - Cost) / Cost × 100',
    description: 'Measures the efficiency of an investment',
    category: 'finance',
    difficulty: 'easy',
    variables: [
      { name: 'Gain', symbol: 'G', description: 'Total return from investment' },
      { name: 'Cost', symbol: 'C', description: 'Initial investment cost' }
    ]
  },
  {
    id: 'cac',
    name: 'Customer Acquisition Cost (CAC)',
    formula: 'CAC = Total Marketing Cost / New Customers',
    description: 'Cost to acquire one new customer',
    category: 'marketing',
    difficulty: 'easy',
    variables: [
      { name: 'Marketing Cost', symbol: 'MC', description: 'Total marketing expenses' },
      { name: 'New Customers', symbol: 'NC', description: 'Number of new customers acquired' }
    ]
  },
  {
    id: 'clv',
    name: 'Customer Lifetime Value (CLV)',
    formula: 'CLV = (ARPU × Gross Margin) / Churn Rate',
    description: 'Total value of a customer over their lifetime',
    category: 'saas',
    difficulty: 'medium',
    variables: [
      { name: 'ARPU', symbol: 'ARPU', description: 'Average Revenue Per User' },
      { name: 'Gross Margin', symbol: 'GM', description: 'Gross margin percentage' },
      { name: 'Churn Rate', symbol: 'CR', description: 'Monthly churn rate' }
    ]
  },
  {
    id: 'roas',
    name: 'Return on Ad Spend (ROAS)',
    formula: 'ROAS = Revenue from Ads / Ad Spend',
    description: 'Revenue generated per dollar spent on advertising',
    category: 'marketing',
    difficulty: 'easy',
    variables: [
      { name: 'Revenue', symbol: 'R', description: 'Revenue generated from ads' },
      { name: 'Ad Spend', symbol: 'AS', description: 'Total advertising spend' }
    ]
  },
  {
    id: 'breakeven',
    name: 'Break-Even Point',
    formula: 'Break-Even = Fixed Costs / (Price - Variable Cost)',
    description: 'Units needed to cover all costs',
    category: 'finance',
    difficulty: 'medium',
    variables: [
      { name: 'Fixed Costs', symbol: 'FC', description: 'Total fixed costs' },
      { name: 'Price', symbol: 'P', description: 'Price per unit' },
      { name: 'Variable Cost', symbol: 'VC', description: 'Variable cost per unit' }
    ]
  },
  {
    id: 'ltv-cac',
    name: 'LTV:CAC Ratio',
    formula: 'LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost',
    description: 'Ratio of customer value to acquisition cost',
    category: 'saas',
    difficulty: 'hard',
    variables: [
      { name: 'LTV', symbol: 'LTV', description: 'Customer Lifetime Value' },
      { name: 'CAC', symbol: 'CAC', description: 'Customer Acquisition Cost' }
    ]
  }
];

export const EquationTrainer: React.FC = () => {
  const [selectedEquation, setSelectedEquation] = useState<Equation | null>(null);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerMode, setTimerMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { addXP } = useGameStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const generateProblem = (equation: Equation): Problem => {
    const problems = {
      roi: {
        question: 'A company invested $10,000 in marketing and generated $15,000 in revenue. What is the ROI?',
        variables: { gain: 15000, cost: 10000 },
        correctAnswer: 50,
        unit: '%',
        explanation: 'ROI = (15,000 - 10,000) / 10,000 × 100 = 50%'
      },
      cac: {
        question: 'A company spent $5,000 on marketing and acquired 100 new customers. What is the CAC?',
        variables: { marketingCost: 5000, newCustomers: 100 },
        correctAnswer: 50,
        unit: '$',
        explanation: 'CAC = $5,000 / 100 customers = $50 per customer'
      },
      clv: {
        question: 'ARPU is $50, gross margin is 80%, and monthly churn is 5%. What is the CLV?',
        variables: { arpu: 50, grossMargin: 0.8, churnRate: 0.05 },
        correctAnswer: 800,
        unit: '$',
        explanation: 'CLV = ($50 × 0.8) / 0.05 = $800'
      },
      roas: {
        question: 'Ad spend was $2,000 and generated $8,000 in revenue. What is the ROAS?',
        variables: { revenue: 8000, adSpend: 2000 },
        correctAnswer: 4,
        unit: ':1',
        explanation: 'ROAS = $8,000 / $2,000 = 4:1'
      },
      breakeven: {
        question: 'Fixed costs are $10,000, price per unit is $50, variable cost is $30. What is the break-even point?',
        variables: { fixedCosts: 10000, price: 50, variableCost: 30 },
        correctAnswer: 500,
        unit: ' units',
        explanation: 'Break-Even = $10,000 / ($50 - $30) = 500 units'
      },
      'ltv-cac': {
        question: 'LTV is $1,200 and CAC is $200. What is the LTV:CAC ratio?',
        variables: { ltv: 1200, cac: 200 },
        correctAnswer: 6,
        unit: ':1',
        explanation: 'LTV:CAC = $1,200 / $200 = 6:1'
      }
    };

    const problemData = problems[equation.id as keyof typeof problems];
    
    return {
      id: Date.now().toString(),
      equation,
      ...problemData
    };
  };

  const startProblem = (equation: Equation) => {
    const problem = generateProblem(equation);
    setCurrentProblem(problem);
    setSelectedEquation(equation);
    setUserAnswer('');
    setIsCorrect(null);
    setShowHint(false);
    
    if (timerMode) {
      setTimeLeft(60); // 60 seconds
      setIsActive(true);
    }
  };

  const handleSubmit = () => {
    if (!currentProblem || !userAnswer.trim()) return;

    const answer = parseFloat(userAnswer);
    const correct = Math.abs(answer - currentProblem.correctAnswer) < 0.01;
    
    setIsCorrect(correct);
    setIsActive(false);

    if (correct) {
      setStreak(prev => prev + 1);
      const baseXP = currentProblem.equation.difficulty === 'easy' ? 15 : 
                   currentProblem.equation.difficulty === 'medium' ? 25 : 35;
      const timeBonus = timerMode && timeLeft > 30 ? 10 : 0;
      const streakBonus = streak >= 5 ? 15 : 0;
      
      addXP(baseXP + timeBonus + streakBonus);
      toast.success(`Correct! +${baseXP + timeBonus + streakBonus} XP`);
    } else {
      setStreak(0);
      toast.error('Incorrect. Try again!');
    }
  };

  const handleTimeUp = () => {
    setIsActive(false);
    if (!isCorrect) {
      setIsCorrect(false);
      setStreak(0);
      toast.error("Time's up!");
    }
  };

  const nextProblem = () => {
    if (selectedEquation) {
      startProblem(selectedEquation);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'finance': return 'from-green-400 to-emerald-500';
      case 'marketing': return 'from-blue-400 to-cyan-500';
      case 'saas': return 'from-purple-400 to-pink-500';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (currentProblem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-center min-h-screen p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(currentProblem.equation.category)} flex items-center justify-center shadow-neon`}>
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{currentProblem.equation.name}</h1>
                  <p className="text-slate-400">{currentProblem.equation.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                {timerMode && (
                  <div className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-400' : 'text-white'}`}>
                    {timeLeft}s
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">Streak: {streak}</span>
                </div>
              </div>
            </div>

            {/* Formula */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Formula</h3>
              <div className="text-xl font-mono text-cyan-300 bg-slate-900/50 p-4 rounded-lg">
                {currentProblem.equation.formula}
              </div>
            </div>

            {/* Problem */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Problem</h3>
              <p className="text-slate-200 text-lg leading-relaxed mb-6">
                {currentProblem.question}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="Enter your answer..."
                    className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={isCorrect !== null}
                  />
                  <span className="text-slate-400 text-lg">{currentProblem.unit}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim() || isCorrect !== null}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Submit</span>
                  </button>
                  
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center space-x-2 px-4 py-3 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all"
                  >
                    <Lightbulb className="w-5 h-5" />
                    <span>Hint</span>
                  </button>

                  <button
                    onClick={() => setCurrentProblem(null)}
                    className="p-3 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-400 font-medium mb-1">Hint</h4>
                      <p className="text-yellow-200 text-sm">
                        Break down the formula step by step. Identify each variable from the problem and substitute the values.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-6 border ${
                    isCorrect 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <X className="w-6 h-6 text-red-400" />
                    )}
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </h4>
                      <p className={`mb-4 ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                        The correct answer is: {currentProblem.correctAnswer}{currentProblem.unit}
                      </p>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <h5 className="text-white font-medium mb-2">Explanation:</h5>
                        <p className="text-slate-300 text-sm">{currentProblem.explanation}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <button
                          onClick={nextProblem}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Next Problem</span>
                        </button>
                        <button
                          onClick={() => setCurrentProblem(null)}
                          className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all"
                        >
                          Back to Equations
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-neon">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Math Booster
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Master business formulas through interactive problem solving and instant feedback
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Current Streak: {streak}</span>
          </div>
          <button
            onClick={() => setTimerMode(!timerMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              timerMode 
                ? 'bg-orange-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timer Mode</span>
          </button>
        </motion.div>

        {/* Equations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equations.map((equation, index) => (
            <motion.div
              key={equation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-cyan-500/30 transition-all cursor-pointer group"
              onClick={() => startProblem(equation)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(equation.category)} flex items-center justify-center shadow-lg`}>
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(equation.difficulty)}`}>
                    {equation.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full capitalize">
                    {equation.category}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {equation.name}
              </h3>
              
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                {equation.description}
              </p>

              <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                <div className="text-cyan-300 font-mono text-sm">
                  {equation.formula}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-slate-400 text-sm">
                  {equation.variables.length} variables
                </div>
                <div className="text-cyan-400 text-sm font-medium group-hover:text-cyan-300">
                  Start Practice →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>Your Progress</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-slate-400 text-sm">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{streak}</div>
              <div className="text-slate-400 text-sm">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">0</div>
              <div className="text-slate-400 text-sm">Best Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">0%</div>
              <div className="text-slate-400 text-sm">Accuracy</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
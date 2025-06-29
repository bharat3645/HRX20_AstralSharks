import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Target, TrendingUp, Award, AlertTriangle, 
  DollarSign, BarChart3, Clock, Users, Globe, Zap, Brain, 
  ChevronRight, Star, Trophy, Timer, Activity, Briefcase,
  TrendingDown, Shield, Calculator, PieChart, LineChart,
  ArrowUp, ArrowDown, Eye, BookOpen, Lightbulb, CheckCircle2
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import toast from 'react-hot-toast';

interface CrisisScenario {
  id: string;
  title: string;
  description: string;
  category: 'market-crash' | 'liquidity-crisis' | 'regulatory-change' | 'cyber-attack' | 'economic-downturn';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedTime: string;
  participants: number;
  successRate: number;
  xpReward: number;
  realWorldContext: string;
  keyMetrics: string[];
  stakeholders: string[];
  timeConstraints: string;
  consequences: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

interface Decision {
  id: string;
  text: string;
  impact: {
    financial: number;
    reputation: number;
    stakeholder: number;
    regulatory: number;
  };
  consequences: string[];
  isOptimal: boolean;
}

interface SimulationState {
  currentPhase: number;
  totalPhases: number;
  timeRemaining: number;
  decisions: Decision[];
  selectedDecision: string | null;
  metrics: {
    financial: number;
    reputation: number;
    stakeholder: number;
    regulatory: number;
  };
  events: Array<{
    id: string;
    time: number;
    type: 'crisis' | 'opportunity' | 'pressure' | 'info';
    message: string;
    impact?: string;
  }>;
}

const crisisScenarios: CrisisScenario[] = [
  {
    id: 'market-crash-2024',
    title: 'Global Market Crash Response',
    description: 'Navigate a sudden 30% market downturn affecting your $2B portfolio. Make critical decisions under extreme pressure while managing stakeholder panic.',
    category: 'market-crash',
    difficulty: 'Expert',
    estimatedTime: '25 min',
    participants: 1247,
    successRate: 23,
    xpReward: 500,
    realWorldContext: 'Based on 2008 financial crisis patterns with modern market dynamics including algorithmic trading and social media amplification.',
    keyMetrics: ['Portfolio Value', 'Liquidity Ratio', 'VaR (Value at Risk)', 'Sharpe Ratio', 'Beta Coefficient'],
    stakeholders: ['Board of Directors', 'Institutional Investors', 'Retail Clients', 'Regulatory Bodies', 'Media'],
    timeConstraints: 'Critical decisions must be made within 4 hours of market open',
    consequences: {
      immediate: ['Portfolio valuation drops', 'Client redemption requests surge', 'Media scrutiny intensifies'],
      shortTerm: ['Regulatory investigations possible', 'Staff morale impacts', 'Competitive positioning shifts'],
      longTerm: ['Brand reputation effects', 'Client retention rates', 'Regulatory compliance costs']
    }
  },
  {
    id: 'liquidity-crisis-bank',
    title: 'Banking Liquidity Crisis',
    description: 'Your regional bank faces a sudden liquidity crunch as depositors rush to withdraw funds. Manage cash flow while maintaining regulatory compliance.',
    category: 'liquidity-crisis',
    difficulty: 'Advanced',
    estimatedTime: '20 min',
    participants: 892,
    successRate: 34,
    xpReward: 400,
    realWorldContext: 'Inspired by Silicon Valley Bank collapse with focus on deposit concentration and interest rate risk management.',
    keyMetrics: ['Liquidity Coverage Ratio', 'Deposit Concentration', 'Net Interest Margin', 'Tier 1 Capital Ratio'],
    stakeholders: ['Depositors', 'Federal Reserve', 'FDIC', 'Board Members', 'Employees'],
    timeConstraints: 'Must maintain regulatory ratios within 24 hours',
    consequences: {
      immediate: ['Deposit outflows accelerate', 'Credit lines activated', 'Stock price volatility'],
      shortTerm: ['Regulatory intervention risk', 'Credit rating downgrades', 'Operational stress'],
      longTerm: ['Market confidence restoration', 'Regulatory oversight increase', 'Business model viability']
    }
  },
  {
    id: 'crypto-exchange-hack',
    title: 'Cryptocurrency Exchange Security Breach',
    description: 'Your crypto exchange suffers a $100M hack. Navigate customer communications, regulatory compliance, and business continuity under intense scrutiny.',
    category: 'cyber-attack',
    difficulty: 'Expert',
    estimatedTime: '30 min',
    participants: 567,
    successRate: 18,
    xpReward: 600,
    realWorldContext: 'Based on FTX collapse and other major exchange failures, focusing on customer protection and regulatory response.',
    keyMetrics: ['Customer Funds Security', 'Operational Uptime', 'Regulatory Compliance Score', 'Public Trust Index'],
    stakeholders: ['Customers', 'Regulators', 'Law Enforcement', 'Insurance Providers', 'Competitors'],
    timeConstraints: 'Public disclosure required within 72 hours',
    consequences: {
      immediate: ['Trading halted', 'Customer panic', 'Regulatory investigation'],
      shortTerm: ['Legal proceedings', 'Insurance claims', 'Competitive disadvantage'],
      longTerm: ['Industry reputation', 'Regulatory framework changes', 'Business viability']
    }
  },
  {
    id: 'fed-rate-shock',
    title: 'Federal Reserve Emergency Rate Hike',
    description: 'The Fed announces an unexpected 200 basis point rate increase. Adjust your real estate investment portfolio strategy in real-time.',
    category: 'regulatory-change',
    difficulty: 'Intermediate',
    estimatedTime: '15 min',
    participants: 1456,
    successRate: 45,
    xpReward: 300,
    realWorldContext: 'Simulates aggressive monetary policy response to inflation, testing interest rate sensitivity management.',
    keyMetrics: ['Duration Risk', 'Yield Curve Position', 'Cash Flow Coverage', 'Debt Service Ratio'],
    stakeholders: ['Property Investors', 'Tenants', 'Lenders', 'Property Managers', 'Local Government'],
    timeConstraints: 'Portfolio adjustments must be completed within market hours',
    consequences: {
      immediate: ['Property valuations drop', 'Refinancing costs spike', 'Development projects stall'],
      shortTerm: ['Tenant affordability issues', 'Construction loan pressures', 'Market liquidity reduces'],
      longTerm: ['Portfolio restructuring needs', 'Market cycle positioning', 'Investment strategy pivot']
    }
  },
  {
    id: 'supply-chain-disruption',
    title: 'Global Supply Chain Collapse',
    description: 'A major shipping crisis disrupts 40% of global trade. Navigate the impact on your manufacturing company\'s operations and cash flow.',
    category: 'economic-downturn',
    difficulty: 'Advanced',
    estimatedTime: '22 min',
    participants: 734,
    successRate: 28,
    xpReward: 450,
    realWorldContext: 'Based on Suez Canal blockage and COVID-19 supply chain disruptions with focus on working capital management.',
    keyMetrics: ['Inventory Turnover', 'Days Sales Outstanding', 'Working Capital Ratio', 'Supplier Concentration'],
    stakeholders: ['Customers', 'Suppliers', 'Employees', 'Shareholders', 'Logistics Partners'],
    timeConstraints: 'Customer commitments must be addressed within 48 hours',
    consequences: {
      immediate: ['Production delays', 'Customer complaints', 'Inventory shortages'],
      shortTerm: ['Revenue recognition delays', 'Supplier relationship strain', 'Cost inflation'],
      longTerm: ['Supply chain redesign', 'Customer relationship impacts', 'Competitive positioning']
    }
  }
];

export const ScenarioSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<CrisisScenario | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [currentDecisions, setCurrentDecisions] = useState<Decision[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { addXP } = useGameStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && simulationState && simulationState.timeRemaining > 0) {
      interval = setInterval(() => {
        setSimulationState(prev => {
          if (!prev) return null;
          const newTime = prev.timeRemaining - 1;
          
          // Add random events
          const events = [...prev.events];
          if (Math.random() < 0.1 && newTime > 0) {
            const eventTypes = [
              { type: 'crisis' as const, message: 'Breaking: Market volatility increases', impact: 'Negative' },
              { type: 'opportunity' as const, message: 'Opportunity: Strategic partner offers support', impact: 'Positive' },
              { type: 'pressure' as const, message: 'Stakeholder pressure mounting', impact: 'Neutral' },
              { type: 'info' as const, message: 'New market data available', impact: 'Informational' }
            ];
            const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            events.push({
              id: Date.now().toString(),
              time: newTime,
              ...randomEvent
            });
          }
          
          if (newTime <= 0) {
            setIsRunning(false);
            setShowResults(true);
          }
          
          return { ...prev, timeRemaining: newTime, events };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, simulationState]);

  const startSimulation = (scenario: CrisisScenario) => {
    setSelectedScenario(scenario);
    setSimulationState({
      currentPhase: 1,
      totalPhases: 4,
      timeRemaining: 300, // 5 minutes
      decisions: [],
      selectedDecision: null,
      metrics: {
        financial: 100,
        reputation: 100,
        stakeholder: 100,
        regulatory: 100
      },
      events: [{
        id: '1',
        time: 300,
        type: 'crisis',
        message: `Crisis Alert: ${scenario.title} has begun!`,
        impact: 'Critical'
      }]
    });
    
    // Generate phase-specific decisions
    generateDecisions(scenario, 1);
    setIsRunning(true);
    setShowResults(false);
  };

  const generateDecisions = (scenario: CrisisScenario, phase: number) => {
    const decisions: Decision[] = [
      {
        id: '1',
        text: 'Implement immediate risk mitigation protocols',
        impact: { financial: -5, reputation: +10, stakeholder: +15, regulatory: +20 },
        consequences: ['Reduces immediate losses', 'Demonstrates proactive management', 'May limit upside potential'],
        isOptimal: true
      },
      {
        id: '2',
        text: 'Maintain current strategy and monitor situation',
        impact: { financial: -15, reputation: -10, stakeholder: -5, regulatory: -10 },
        consequences: ['Preserves resources', 'May appear unprepared', 'Risk of escalation'],
        isOptimal: false
      },
      {
        id: '3',
        text: 'Aggressive counter-measures with high resource allocation',
        impact: { financial: -25, reputation: +5, stakeholder: +10, regulatory: +5 },
        consequences: ['Shows strong response', 'High resource consumption', 'May overcorrect'],
        isOptimal: false
      },
      {
        id: '4',
        text: 'Seek external expert consultation and partnerships',
        impact: { financial: -10, reputation: +15, stakeholder: +20, regulatory: +15 },
        consequences: ['Leverages external expertise', 'Demonstrates humility', 'May slow decision making'],
        isOptimal: true
      }
    ];
    setCurrentDecisions(decisions);
  };

  const makeDecision = (decision: Decision) => {
    if (!simulationState) return;
    
    setSimulationState(prev => {
      if (!prev) return null;
      
      const newMetrics = {
        financial: Math.max(0, Math.min(100, prev.metrics.financial + decision.impact.financial)),
        reputation: Math.max(0, Math.min(100, prev.metrics.reputation + decision.impact.reputation)),
        stakeholder: Math.max(0, Math.min(100, prev.metrics.stakeholder + decision.impact.stakeholder)),
        regulatory: Math.max(0, Math.min(100, prev.metrics.regulatory + decision.impact.regulatory))
      };
      
      const newEvents = [...prev.events, {
        id: Date.now().toString(),
        time: prev.timeRemaining,
        type: decision.isOptimal ? 'opportunity' as const : 'pressure' as const,
        message: `Decision Impact: ${decision.consequences[0]}`,
        impact: decision.isOptimal ? 'Positive' : 'Negative'
      }];
      
      return {
        ...prev,
        metrics: newMetrics,
        decisions: [...prev.decisions, decision],
        selectedDecision: decision.id,
        events: newEvents,
        currentPhase: prev.currentPhase < prev.totalPhases ? prev.currentPhase + 1 : prev.currentPhase
      };
    });
    
    // Generate next phase decisions
    if (selectedScenario && simulationState.currentPhase < simulationState.totalPhases) {
      setTimeout(() => {
        generateDecisions(selectedScenario, simulationState.currentPhase + 1);
        setSimulationState(prev => prev ? { ...prev, selectedDecision: null } : null);
      }, 2000);
    }
    
    if (decision.isOptimal) {
      addXP(25);
      toast.success('Excellent decision! +25 XP');
    } else {
      toast.error('Suboptimal choice. Learn from the consequences.');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market-crash': return 'from-red-500 to-red-700';
      case 'liquidity-crisis': return 'from-orange-500 to-red-600';
      case 'regulatory-change': return 'from-purple-500 to-indigo-600';
      case 'cyber-attack': return 'from-gray-700 to-gray-900';
      case 'economic-downturn': return 'from-yellow-600 to-orange-700';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'market-crash': return TrendingDown;
      case 'liquidity-crisis': return DollarSign;
      case 'regulatory-change': return Shield;
      case 'cyber-attack': return AlertTriangle;
      case 'economic-downturn': return BarChart3;
      default: return Target;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30';
      case 'Intermediate': return 'text-amber-400 bg-amber-400/20 border-amber-400/30';
      case 'Advanced': return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
      case 'Expert': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateFinalScore = () => {
    if (!simulationState) return 0;
    const { financial, reputation, stakeholder, regulatory } = simulationState.metrics;
    return Math.round((financial + reputation + stakeholder + regulatory) / 4);
  };

  if (showResults && simulationState && selectedScenario) {
    const finalScore = calculateFinalScore();
    const isSuccess = finalScore >= 70;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-8 border border-slate-600/50 backdrop-blur-xl"
          >
            {/* Results Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  isSuccess ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                }`}
              >
                {isSuccess ? <Trophy className="w-12 h-12 text-white" /> : <AlertTriangle className="w-12 h-12 text-white" />}
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSuccess ? 'Crisis Managed Successfully!' : 'Crisis Management Needs Improvement'}
              </h2>
              <p className="text-slate-300 text-lg">Final Score: {finalScore}/100</p>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(simulationState.metrics).map(([key, value]) => (
                <div key={key} className="bg-slate-800/50 rounded-lg p-4 text-center">
                  <div className={`text-2xl font-bold mb-1 ${
                    value >= 80 ? 'text-emerald-400' : 
                    value >= 60 ? 'text-amber-400' : 
                    value >= 40 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {value}
                  </div>
                  <div className="text-slate-400 text-sm capitalize">{key}</div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        value >= 80 ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 
                        value >= 60 ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 
                        value >= 40 ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Decision Analysis */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Decision Analysis</h3>
              <div className="space-y-3">
                {simulationState.decisions.map((decision, index) => (
                  <div key={decision.id} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Phase {index + 1}: {decision.text}</span>
                      {decision.isOptimal ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{decision.consequences[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Insights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-amber-400" />
                Key Learning Insights
              </h3>
              <div className="bg-slate-800/50 rounded-lg p-6">
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Crisis management requires balancing multiple stakeholder interests simultaneously</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Early intervention and proactive communication often yield better outcomes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Regulatory compliance should never be compromised during crisis situations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>External expertise and partnerships can provide valuable crisis management resources</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowResults(false);
                  setSelectedScenario(null);
                  setSimulationState(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all"
              >
                Try Another Scenario
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startSimulation(selectedScenario)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all"
              >
                Retry Scenario
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isRunning && selectedScenario && simulationState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto p-6">
          {/* Simulation Header */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(selectedScenario.category)} flex items-center justify-center`}>
                  {React.createElement(getCategoryIcon(selectedScenario.category), { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedScenario.title}</h2>
                  <p className="text-slate-400">Phase {simulationState.currentPhase} of {simulationState.totalPhases}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold mb-1 ${
                  simulationState.timeRemaining > 60 ? 'text-emerald-400' : 
                  simulationState.timeRemaining > 30 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {formatTime(simulationState.timeRemaining)}
                </div>
                <div className="text-slate-400 text-sm">Time Remaining</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${(simulationState.currentPhase / simulationState.totalPhases) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Decision Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Situation */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Current Situation
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4">{selectedScenario.description}</p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 font-medium">⚠️ Critical Decision Required</p>
                  <p className="text-red-200 text-sm mt-1">Your next decision will significantly impact the outcome. Consider all stakeholders and long-term consequences.</p>
                </div>
              </div>

              {/* Decision Options */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-4">Decision Options</h3>
                <div className="space-y-4">
                  {currentDecisions.map((decision) => (
                    <motion.button
                      key={decision.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => makeDecision(decision)}
                      disabled={simulationState.selectedDecision !== null}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        simulationState.selectedDecision === decision.id
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-slate-600 bg-slate-800/50 hover:border-purple-400 hover:bg-slate-700/50'
                      } ${simulationState.selectedDecision !== null && simulationState.selectedDecision !== decision.id ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-white font-medium">{decision.text}</p>
                        {decision.isOptimal && (
                          <Star className="w-5 h-5 text-amber-400 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <div className="text-slate-400 text-sm mb-3">
                        {decision.consequences[0]}
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className={`flex items-center ${decision.impact.financial >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {decision.impact.financial >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                          Financial: {Math.abs(decision.impact.financial)}
                        </span>
                        <span className={`flex items-center ${decision.impact.reputation >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {decision.impact.reputation >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                          Reputation: {Math.abs(decision.impact.reputation)}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics & Events Panel */}
            <div className="space-y-6">
              {/* Real-time Metrics */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-400" />
                  Live Metrics
                </h3>
                <div className="space-y-4">
                  {Object.entries(simulationState.metrics).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300 capitalize">{key}</span>
                        <span className={`font-medium ${
                          value >= 80 ? 'text-emerald-400' : 
                          value >= 60 ? 'text-amber-400' : 
                          value >= 40 ? 'text-orange-400' : 'text-red-400'
                        }`}>
                          {value}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full transition-all ${
                            value >= 80 ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 
                            value >= 60 ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 
                            value >= 40 ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Feed */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-400" />
                  Live Events
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {simulationState.events.slice(-5).reverse().map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border-l-4 ${
                        event.type === 'crisis' ? 'border-red-400 bg-red-500/10' :
                        event.type === 'opportunity' ? 'border-emerald-400 bg-emerald-500/10' :
                        event.type === 'pressure' ? 'border-amber-400 bg-amber-500/10' :
                        'border-blue-400 bg-blue-500/10'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-white text-sm font-medium">{event.message}</p>
                        <span className="text-slate-400 text-xs">{formatTime(event.time)}</span>
                      </div>
                      {event.impact && (
                        <p className="text-slate-400 text-xs mt-1">Impact: {event.impact}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsRunning(false)}
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-all"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause Simulation</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsRunning(false);
                      setSelectedScenario(null);
                      setSimulationState(null);
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Exit Simulation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div 
              className="w-16 h-16 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center shadow-2xl"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                  '0 0 30px rgba(239, 68, 68, 0.5)',
                  '0 0 20px rgba(239, 68, 68, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Crisis Command Center
            </h1>
          </div>
          <p className="text-slate-300 max-w-4xl mx-auto text-lg leading-relaxed">
            Navigate high-stakes financial crises with real-world scenarios. Make critical decisions under pressure, 
            manage stakeholder relationships, and learn from the consequences in a risk-free environment.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Crises', value: '5', icon: AlertTriangle, color: 'from-red-400 to-red-600' },
            { label: 'Success Rate', value: '67%', icon: Trophy, color: 'from-emerald-400 to-green-600' },
            { label: 'Avg Response Time', value: '4.2m', icon: Timer, color: 'from-blue-400 to-cyan-600' },
            { label: 'Participants', value: '4.9K', icon: Users, color: 'from-purple-400 to-pink-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Crisis Scenarios */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Available Crisis Scenarios</h2>
            <div className="text-slate-400 text-sm">
              {crisisScenarios.length} scenarios • Real-world based
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {crisisScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl hover:border-purple-500/50 transition-all group cursor-pointer"
                onClick={() => setShowDetails(showDetails === scenario.id ? null : scenario.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(scenario.category)} flex items-center justify-center shadow-lg`}>
                      {React.createElement(getCategoryIcon(scenario.category), { className: "w-6 h-6 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {scenario.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(scenario.difficulty)}`}>
                          {scenario.difficulty}
                        </span>
                        <span className="text-slate-400 text-sm capitalize">{scenario.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showDetails === scenario.id ? 'rotate-90' : ''}`} />
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                  {scenario.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{scenario.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{scenario.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <Target className="w-4 h-4" />
                    <span>{scenario.successRate}% success</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>{scenario.xpReward} XP</span>
                  </div>
                </div>

                <AnimatePresence>
                  {showDetails === scenario.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-600/50 pt-4 space-y-4"
                    >
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
                          Real-World Context
                        </h4>
                        <p className="text-slate-400 text-sm">{scenario.realWorldContext}</p>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <BarChart3 className="w-4 h-4 mr-2 text-blue-400" />
                          Key Metrics to Monitor
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {scenario.keyMetrics.map((metric) => (
                            <span key={metric} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-emerald-400" />
                          Stakeholders Involved
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {scenario.stakeholders.map((stakeholder) => (
                            <span key={stakeholder} className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                              {stakeholder}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
                          Potential Consequences
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-red-300 font-medium">Immediate:</span>
                            <span className="text-slate-400 ml-2">{scenario.consequences.immediate.join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-amber-300 font-medium">Short-term:</span>
                            <span className="text-slate-400 ml-2">{scenario.consequences.shortTerm.join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-blue-300 font-medium">Long-term:</span>
                            <span className="text-slate-400 ml-2">{scenario.consequences.longTerm.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    startSimulation(scenario);
                  }}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Crisis Simulation</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
            Crisis Management Learning Hub
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Pre-Crisis Preparation</h4>
              <p className="text-slate-400 text-sm">Learn to identify early warning signs and build robust risk management frameworks.</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Crisis Communication</h4>
              <p className="text-slate-400 text-sm">Master stakeholder communication strategies during high-pressure situations.</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Post-Crisis Analysis</h4>
              <p className="text-slate-400 text-sm">Develop skills to analyze outcomes and implement lessons learned for future resilience.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
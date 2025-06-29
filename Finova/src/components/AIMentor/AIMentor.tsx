import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Lightbulb, BookOpen, Target, Settings, Zap, MessageCircle,
  Brain, TrendingUp, DollarSign, Calculator, BarChart3, Sparkles, Star,
  ChevronDown, Mic, Paperclip, Smile, Crown, Shield
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { ChatMessage } from '../../types';

const toneOptions = [
  { 
    id: 'mentor', 
    label: 'Finance Mentor', 
    description: 'Wise and experienced guide', 
    personality: 'analytical and supportive'
  },
  { 
    id: 'executive', 
    label: 'C-Suite Executive', 
    description: 'Strategic and decisive', 
    personality: 'direct and results-focused'
  },
  { 
    id: 'analyst', 
    label: 'Senior Analyst', 
    description: 'Detail-oriented and precise', 
    personality: 'methodical and thorough'
  },
];

const quickPrompts = [
  { text: 'Explain DCF valuation methodology', category: 'Valuation', icon: Calculator },
  { text: 'How to analyze SaaS metrics effectively?', category: 'SaaS', icon: BarChart3 },
  { text: 'What drives ROIC in tech companies?', category: 'Analysis', icon: TrendingUp },
  { text: 'Best practices for financial modeling', category: 'Modeling', icon: Brain },
  { text: 'How to assess investment opportunities?', category: 'Investment', icon: Target },
  { text: 'Understanding working capital dynamics', category: 'Finance', icon: DollarSign },
];

const conversationStarters = [
  "I'm here to guide you through complex financial concepts. What would you like to master today?",
  "Ready to dive deep into financial analysis? I have insights from decades of market experience.",
  "Let's explore the fascinating world of corporate finance together. What's your burning question?",
];

export const AIMentor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: conversationStarters[Math.floor(Math.random() * conversationStarters.length)],
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTone, setSelectedTone] = useState('mentor');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addXP } = useGameStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const analyzeSentiment = (message: string): 'positive' | 'neutral' | 'negative' => {
    const negativeWords = ['confused', 'difficult', 'struggling', 'lost', 'frustrated'];
    const positiveWords = ['excited', 'interested', 'love', 'amazing', 'great', 'understand'];
    
    const lowerMessage = message.toLowerCase();
    const hasNegative = negativeWords.some(word => lowerMessage.includes(word));
    const hasPositive = positiveWords.some(word => lowerMessage.includes(word));
    
    if (hasNegative) return 'negative';
    if (hasPositive) return 'positive';
    return 'neutral';
  };

  const generateResponse = (userMessage: string, sentiment: string, tone: string): string => {
    const responses = {
      mentor: {
        positive: "Excellent curiosity! 🌟 Let me share some insights that will elevate your understanding...",
        neutral: "Great question! Let me break this down with real-world examples...",
        negative: "I understand this can be challenging. Let's tackle it step by step with clarity..."
      },
      executive: {
        positive: "Outstanding strategic thinking! Here's the executive perspective...",
        neutral: "Let me provide the strategic framework you need...",
        negative: "Every expert was once a beginner. Here's how to master this..."
      },
      analyst: {
        positive: "Perfect analytical mindset! Let's dive into the data and methodology...",
        neutral: "Excellent question. Here's the detailed analysis...",
        negative: "Complex topics require systematic approaches. Let me guide you through..."
      }
    };

    const baseResponse = responses[tone as keyof typeof responses][sentiment as keyof typeof responses.mentor];
    
    // Enhanced responses based on keywords
    if (userMessage.toLowerCase().includes('dcf') || userMessage.toLowerCase().includes('valuation')) {
      return `${baseResponse}\n\n**DCF (Discounted Cash Flow) Valuation** is the gold standard for intrinsic value assessment. Key components:\n\n• **Free Cash Flow Projections**: Project 5-10 years of operational cash flows\n• **Terminal Value**: Capture value beyond projection period\n• **WACC (Weighted Average Cost of Capital)**: Discount rate reflecting risk\n• **Sensitivity Analysis**: Test key assumptions\n\nPro tip: Focus on the quality of assumptions rather than model complexity. A simple model with great assumptions beats a complex model with poor ones.`;
    }
    
    if (userMessage.toLowerCase().includes('saas') || userMessage.toLowerCase().includes('metrics')) {
      return `${baseResponse}\n\n**SaaS Metrics Mastery Framework**:\n\n**Growth Metrics:**\n• **MRR/ARR**: Monthly/Annual Recurring Revenue\n• **Net Revenue Retention**: Expansion minus churn\n• **Customer Acquisition Cost (CAC)**: Total sales & marketing / new customers\n\n**Efficiency Metrics:**\n• **LTV:CAC Ratio**: Should be 3:1 minimum, 5:1+ excellent\n• **Payback Period**: Time to recover CAC (12-18 months ideal)\n• **Rule of 40**: Growth rate + profit margin ≥ 40%\n\nThe magic happens when you analyze these metrics together, not in isolation.`;
    }

    if (userMessage.toLowerCase().includes('roic') || userMessage.toLowerCase().includes('return')) {
      return `${baseResponse}\n\n**ROIC (Return on Invested Capital) Analysis**:\n\n**Formula**: NOPAT ÷ Invested Capital\n\n**Key Drivers in Tech:**\n• **Asset-Light Models**: High ROIC due to minimal capital requirements\n• **Network Effects**: Increasing returns to scale\n• **Intellectual Property**: Moats that sustain high returns\n• **Working Capital Efficiency**: Negative working capital cycles\n\n**Benchmarks**: 15%+ is excellent, 10-15% is good, <10% needs investigation.\n\nTech companies often achieve 20%+ ROIC due to scalable software models.`;
    }
    
    return `${baseResponse}\n\nI'm ready to provide deep insights on your specific question. Share more context about what you're trying to understand, and I'll deliver actionable knowledge with real-world applications.`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    const sentiment = analyzeSentiment(inputValue);
    setMessages(prev => [...prev, { ...userMessage, sentiment }]);
    setInputValue('');
    setIsTyping(true);
    setShowPrompts(false);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue, sentiment, selectedTone),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      addXP(25);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    setShowPrompts(false);
  };

  const selectedToneData = toneOptions.find(t => t.id === selectedTone) || toneOptions[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-neon"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                  '0 0 30px rgba(139, 92, 246, 0.5)',
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AI Finance Oracle
              </h1>
              <p className="text-slate-400">Your personal finance mentor & strategic advisor</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="professional-card px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">{selectedToneData.label}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="btn-secondary p-3 rounded-xl"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="professional-card rounded-xl p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>AI Personality Settings</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {toneOptions.map((tone) => (
                  <motion.button
                    key={tone.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedTone === tone.id
                        ? 'border-purple-500 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold mb-1">{tone.label}</div>
                    <div className="text-xs opacity-75 mb-2">{tone.description}</div>
                    <div className="text-xs italic opacity-60">{tone.personality}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Container */}
        <div className="flex-1 professional-card rounded-2xl flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-4 max-w-4xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <motion.div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-r from-purple-500 to-indigo-600'
                      }`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      {message.isUser ? <User className="w-6 h-6 text-white" /> : <Brain className="w-6 h-6 text-white" />}
                    </motion.div>
                    <div className={`p-6 rounded-2xl shadow-lg backdrop-blur-sm ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-white' 
                        : 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-purple-500/20 text-slate-100'
                    }`}>
                      <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                      {!message.isUser && (
                        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-slate-700/30">
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            className="text-xs px-3 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-all flex items-center space-x-1"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>Save as Flashcard</span>
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            className="text-xs px-3 py-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-all flex items-center space-x-1"
                          >
                            <Target className="w-3 h-3" />
                            <span>Create Scenario</span>
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            className="text-xs px-3 py-2 bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500/30 transition-all flex items-center space-x-1"
                          >
                            <Star className="w-3 h-3" />
                            <span>Deep Dive</span>
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-purple-500/20">
                    <div className="flex space-x-2">
                      <motion.div 
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <AnimatePresence>
            {showPrompts && (
              <motion.div 
                className="p-6 border-t border-purple-500/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span>Quick Start Topics</span>
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowPrompts(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="text-left p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 text-slate-300 rounded-xl hover:from-slate-700/50 hover:to-slate-600/50 hover:text-white transition-all border border-slate-700/50 hover:border-purple-500/30 group"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <prompt.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                        <span className="status-info text-xs px-2 py-1 rounded-full">
                          {prompt.category}
                        </span>
                      </div>
                      <div className="text-sm font-medium">{prompt.text}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="p-6 border-t border-purple-500/20">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about financial analysis, valuation, SaaS metrics, or any finance topic..."
                  className="w-full px-6 py-4 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-24 backdrop-blur-sm"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    <Mic className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="btn-primary px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Send</span>
              </motion.button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
              <span>Press Enter to send • Use @ to mention specific topics</span>
              <span>{inputValue.length}/500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
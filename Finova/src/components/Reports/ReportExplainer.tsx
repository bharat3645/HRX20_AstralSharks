import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, TrendingUp, AlertCircle, MessageCircle, BookOpen, Zap, BarChart3, DollarSign, Target } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import toast from 'react-hot-toast';

interface ReportInsight {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ReportExplainer: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<ReportInsight[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const { addXP } = useGameStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      analyzeReport(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const analyzeReport = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockInsights: ReportInsight[] = [
        {
          id: '1',
          title: 'Return on Ad Spend (ROAS)',
          value: '4.2x',
          change: '+15% vs last month',
          trend: 'up',
          description: 'Strong performance across all channels. Google Ads leading with 5.1x ROAS.'
        },
        {
          id: '2',
          title: 'Customer Acquisition Cost (CAC)',
          value: '$45',
          change: '-8% vs last month',
          trend: 'up',
          description: 'CAC decreased due to improved targeting and higher conversion rates.'
        },
        {
          id: '3',
          title: 'Gross Margin',
          value: '68%',
          change: '+3% vs last quarter',
          trend: 'up',
          description: 'Margin improvement driven by operational efficiency and pricing optimization.'
        },
        {
          id: '4',
          title: 'Monthly Recurring Revenue (MRR)',
          value: '$125K',
          change: '+22% vs last month',
          trend: 'up',
          description: 'Strong growth in new subscriptions and reduced churn rate.'
        },
        {
          id: '5',
          title: 'Churn Rate',
          value: '3.2%',
          change: '-1.1% vs last month',
          trend: 'up',
          description: 'Churn reduction due to improved onboarding and customer success initiatives.'
        },
        {
          id: '6',
          title: 'Break-even Point',
          value: '18 months',
          change: '-2 months vs projection',
          trend: 'up',
          description: 'Faster break-even due to higher than expected conversion rates.'
        }
      ];
      
      setInsights(mockInsights);
      setIsAnalyzing(false);
      addXP(100);
      toast.success('Report analyzed successfully! +100 XP');
    }, 2000);
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: chatInput,
      isUser: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(chatInput),
        isUser: false,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      addXP(25);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const responses = {
      'roas': 'ROAS (Return on Ad Spend) measures revenue generated per dollar spent on advertising. Your current 4.2x ROAS means you earn $4.20 for every $1 spent on ads, which is excellent for most industries.',
      'cac': 'Customer Acquisition Cost (CAC) is calculated by dividing total marketing costs by new customers acquired. Your $45 CAC is competitive, especially with your current customer lifetime value.',
      'churn': 'Churn rate represents the percentage of customers who cancel their subscriptions. Your 3.2% monthly churn is below industry average, indicating strong product-market fit.',
      'default': 'Based on your report data, I can help explain any financial metrics, identify trends, or suggest optimization strategies. What specific aspect would you like me to elaborate on?'
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('roas')) return responses.roas;
    if (lowerQuestion.includes('cac')) return responses.cac;
    if (lowerQuestion.includes('churn')) return responses.churn;
    return responses.default;
  };

  const generateFlashcard = (insight: ReportInsight) => {
    toast.success(`Flashcard created for ${insight.title}!`);
    addXP(15);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-neon">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Intel Reports
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Upload your financial reports and get AI-powered insights, explanations, and actionable recommendations
          </p>
        </motion.div>

        {/* Upload Section */}
        {!uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 hover:border-blue-500/50 hover:bg-slate-800/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {isDragActive ? 'Drop your report here' : 'Upload Financial Report'}
                  </h3>
                  <p className="text-slate-400">
                    Drag & drop or click to upload PDF, CSV, Excel, or text files
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                  <span>Balance Sheets</span>
                  <span>•</span>
                  <span>Income Statements</span>
                  <span>•</span>
                  <span>Ad Spend Logs</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analysis Loading */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-300 font-medium">Analyzing your report...</span>
            </div>
          </motion.div>
        )}

        {/* Insights Grid */}
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Key Insights</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask Questions</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        insight.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                        insight.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {insight.title.includes('ROAS') && <Target className="w-5 h-5" />}
                        {insight.title.includes('CAC') && <DollarSign className="w-5 h-5" />}
                        {insight.title.includes('Margin') && <TrendingUp className="w-5 h-5" />}
                        {insight.title.includes('Revenue') && <BarChart3 className="w-5 h-5" />}
                        {insight.title.includes('Churn') && <AlertCircle className="w-5 h-5" />}
                        {insight.title.includes('Break-even') && <Zap className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {insight.title}
                        </h3>
                        <p className="text-sm text-slate-400">{insight.change}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-2">{insight.value}</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{insight.description}</p>
                  </div>

                  <button
                    onClick={() => generateFlashcard(insight)}
                    className="w-full flex items-center justify-center space-x-2 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Create Flashcard</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat Interface */}
        <AnimatePresence>
          {showChat && insights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl border border-purple-500/30 backdrop-blur-xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-600/50">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  <span>Ask About Your Report</span>
                </h3>
              </div>

              <div className="h-64 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-slate-400">
                    <p>Ask me anything about your financial report!</p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {['Why did ROAS improve?', 'How is CAC calculated?', 'What affects churn rate?'].map((question) => (
                        <button
                          key={question}
                          onClick={() => setChatInput(question)}
                          className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm hover:bg-slate-600/50 transition-all"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-slate-700 text-slate-100'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-slate-600/50">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                    placeholder="Ask about metrics, trends, or get explanations..."
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleChatSubmit}
                    disabled={!chatInput.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
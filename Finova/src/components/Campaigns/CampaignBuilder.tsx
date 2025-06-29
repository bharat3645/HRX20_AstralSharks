import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Target, DollarSign, BarChart3, Edit3, RefreshCw, Save, BookOpen, Zap } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import toast from 'react-hot-toast';

interface Campaign {
  id: string;
  title: string;
  objective: string;
  channels: string[];
  budget: number;
  kpis: { [key: string]: number };
  createdAt: Date;
}

interface CampaignPlan {
  objective: string;
  channels: Array<{
    name: string;
    budget: number;
    percentage: number;
    description: string;
  }>;
  kpis: Array<{
    name: string;
    target: string;
    description: string;
  }>;
  timeline: string;
  recommendations: string[];
}

export const CampaignBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<CampaignPlan | null>(null);
  const [savedCampaigns, setSavedCampaigns] = useState<Campaign[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const { addXP } = useGameStore();

  const generateCampaign = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a campaign prompt');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const mockPlan: CampaignPlan = {
        objective: prompt.includes('SaaS') 
          ? 'Increase trial signups and reduce customer acquisition cost'
          : 'Drive brand awareness and increase online sales',
        channels: [
          {
            name: 'Google Ads',
            budget: 15000,
            percentage: 50,
            description: 'Search and display campaigns targeting high-intent keywords'
          },
          {
            name: 'Facebook Ads',
            budget: 9000,
            percentage: 30,
            description: 'Lookalike audiences and interest-based targeting'
          },
          {
            name: 'LinkedIn Ads',
            budget: 4500,
            percentage: 15,
            description: 'B2B targeting for decision makers and influencers'
          },
          {
            name: 'Email Marketing',
            budget: 1500,
            percentage: 5,
            description: 'Nurture sequences and promotional campaigns'
          }
        ],
        kpis: [
          {
            name: 'Cost Per Acquisition (CPA)',
            target: '$45',
            description: 'Target CPA 20% below industry average'
          },
          {
            name: 'Return on Ad Spend (ROAS)',
            target: '4.5:1',
            description: 'Minimum 4.5x return on advertising investment'
          },
          {
            name: 'Conversion Rate',
            target: '3.2%',
            description: 'Landing page conversion rate optimization'
          },
          {
            name: 'Click-Through Rate (CTR)',
            target: '2.8%',
            description: 'Above-average CTR across all channels'
          }
        ],
        timeline: '90-day campaign with weekly optimization cycles',
        recommendations: [
          'Start with 70% budget allocation to Google Ads for immediate results',
          'Implement conversion tracking across all touchpoints',
          'A/B test ad creatives weekly to improve performance',
          'Set up automated bidding strategies after 2 weeks of data collection',
          'Create dedicated landing pages for each channel'
        ]
      };

      setCurrentPlan(mockPlan);
      setIsGenerating(false);
      addXP(50);
      toast.success('Campaign generated! +50 XP');
    }, 2000);
  };

  const regenerateSection = (section: string) => {
    toast.success(`${section} regenerated!`);
    addXP(15);
  };

  const saveCampaign = () => {
    if (!currentPlan) return;

    const campaign: Campaign = {
      id: Date.now().toString(),
      title: prompt,
      objective: currentPlan.objective,
      channels: currentPlan.channels.map(c => c.name),
      budget: currentPlan.channels.reduce((sum, c) => sum + c.budget, 0),
      kpis: currentPlan.kpis.reduce((acc, kpi) => ({ ...acc, [kpi.name]: kpi.target }), {}),
      createdAt: new Date()
    };

    setSavedCampaigns(prev => [...prev, campaign]);
    addXP(75);
    toast.success('Campaign saved! +75 XP');
  };

  const createFlashcards = () => {
    if (!currentPlan) return;
    
    toast.success('Flashcards created from campaign insights!');
    addXP(30);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-neon">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Strategy Builder
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Generate comprehensive digital marketing campaigns with AI-powered strategy and budget allocation
          </p>
        </motion.div>

        {/* Campaign Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-orange-500/20 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Campaign Prompt</h2>
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your campaign needs... e.g., 'Create a Google Ads plan for a SaaS product targeting small businesses with a $30K monthly budget'"
                className="w-full h-24 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
              <div className="flex items-center space-x-4">
                <button
                  onClick={generateCampaign}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Generate Campaign</span>
                    </>
                  )}
                </button>
                {currentPlan && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={saveCampaign}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={createFlashcards}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Create Cards</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Generated Campaign Plan */}
        <AnimatePresence>
          {currentPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto space-y-6"
            >
              {/* Objective */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <Target className="w-5 h-5 text-orange-400" />
                    <span>Campaign Objective</span>
                  </h3>
                  <button
                    onClick={() => regenerateSection('Objective')}
                    className="p-2 text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-200 leading-relaxed">{currentPlan.objective}</p>
              </div>

              {/* Channel Allocation */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span>Budget Allocation</span>
                  </h3>
                  <button
                    onClick={() => regenerateSection('Budget')}
                    className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPlan.channels.map((channel, index) => (
                    <motion.div
                      key={channel.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{channel.name}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">
                            ${channel.budget.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-400">{channel.percentage}%</div>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm">{channel.description}</p>
                      <div className="mt-3">
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all"
                            style={{ width: `${channel.percentage}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Total Budget</span>
                    <span className="text-2xl font-bold text-green-400">
                      ${currentPlan.channels.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* KPIs */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <span>Key Performance Indicators</span>
                  </h3>
                  <button
                    onClick={() => regenerateSection('KPIs')}
                    className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPlan.kpis.map((kpi, index) => (
                    <motion.div
                      key={kpi.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{kpi.name}</h4>
                        <span className="text-lg font-bold text-blue-400">{kpi.target}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{kpi.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Timeline & Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Timeline</h3>
                  <p className="text-slate-200">{currentPlan.timeline}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {currentPlan.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2 text-slate-200 text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Saved Campaigns */}
        {savedCampaigns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Saved Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-orange-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                      <Megaphone className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        ${campaign.budget.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {campaign.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors line-clamp-2">
                    {campaign.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {campaign.objective}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {campaign.channels.slice(0, 3).map((channel) => (
                      <span key={channel} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                        {channel}
                      </span>
                    ))}
                    {campaign.channels.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                        +{campaign.channels.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="text-orange-400 text-sm font-medium group-hover:text-orange-300">
                    View Campaign →
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
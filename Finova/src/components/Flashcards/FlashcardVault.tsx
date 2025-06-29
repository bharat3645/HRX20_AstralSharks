import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Filter, RotateCcw, CheckCircle, X, Zap, Target, TrendingUp, DollarSign } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import toast from 'react-hot-toast';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  example: string;
  category: 'finance' | 'marketing' | 'saas' | 'strategy';
  difficulty: 'easy' | 'medium' | 'hard';
  confidence: number;
  lastReviewed: Date;
  nextReview: Date;
  timesReviewed: number;
}

const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    term: 'Customer Lifetime Value (CLV)',
    definition: 'The total revenue a business can expect from a customer over their entire relationship.',
    example: 'If a customer spends $50/month for 24 months, CLV = $1,200',
    category: 'finance',
    difficulty: 'medium',
    confidence: 0.7,
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 86400000),
    timesReviewed: 3
  },
  {
    id: '2',
    term: 'Return on Ad Spend (ROAS)',
    definition: 'A marketing metric that measures revenue generated for every dollar spent on advertising.',
    example: 'If you spend $1,000 on ads and generate $4,000 in revenue, ROAS = 4:1',
    category: 'marketing',
    difficulty: 'easy',
    confidence: 0.9,
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 172800000),
    timesReviewed: 5
  },
  {
    id: '3',
    term: 'Monthly Recurring Revenue (MRR)',
    definition: 'The predictable revenue that a business expects to receive every month from subscriptions.',
    example: '100 customers paying $50/month = $5,000 MRR',
    category: 'saas',
    difficulty: 'easy',
    confidence: 0.8,
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 259200000),
    timesReviewed: 4
  },
  {
    id: '4',
    term: 'Product-Market Fit',
    definition: 'The degree to which a product satisfies strong market demand.',
    example: 'High retention rates, organic growth, and customers actively recommending your product',
    category: 'strategy',
    difficulty: 'hard',
    confidence: 0.5,
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 86400000),
    timesReviewed: 2
  }
];

export const FlashcardVault: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studyMode, setStudyMode] = useState(false);
  const [studyQueue, setStudyQueue] = useState<Flashcard[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCard, setNewCard] = useState({
    term: '',
    definition: '',
    example: '',
    category: 'finance' as const,
    difficulty: 'medium' as const
  });
  const { addXP } = useGameStore();

  const categories = [
    { id: 'all', label: 'All Cards', icon: BookOpen, color: 'from-slate-400 to-slate-600' },
    { id: 'finance', label: 'Finance', icon: DollarSign, color: 'from-green-400 to-emerald-500' },
    { id: 'marketing', label: 'Marketing', icon: Target, color: 'from-blue-400 to-cyan-500' },
    { id: 'saas', label: 'SaaS Metrics', icon: TrendingUp, color: 'from-purple-400 to-pink-500' },
    { id: 'strategy', label: 'Strategy', icon: Zap, color: 'from-orange-400 to-red-500' }
  ];

  const filteredCards = selectedCategory === 'all' 
    ? flashcards 
    : flashcards.filter(card => card.category === selectedCategory);

  const startStudySession = () => {
    const cardsToStudy = filteredCards
      .filter(card => card.nextReview <= new Date())
      .sort((a, b) => a.confidence - b.confidence);
    
    if (cardsToStudy.length === 0) {
      toast.error('No cards due for review!');
      return;
    }

    setStudyQueue(cardsToStudy);
    setCurrentCard(cardsToStudy[0]);
    setStudyMode(true);
    setIsFlipped(false);
  };

  const handleCardResponse = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!currentCard) return;

    const confidenceChange = difficulty === 'easy' ? 0.1 : difficulty === 'medium' ? 0.05 : -0.1;
    const newConfidence = Math.max(0, Math.min(1, currentCard.confidence + confidenceChange));
    
    const nextReviewDays = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 1 : 0.5;
    const nextReview = new Date(Date.now() + nextReviewDays * 86400000);

    const updatedCard = {
      ...currentCard,
      confidence: newConfidence,
      lastReviewed: new Date(),
      nextReview,
      timesReviewed: currentCard.timesReviewed + 1
    };

    setFlashcards(prev => prev.map(card => 
      card.id === currentCard.id ? updatedCard : card
    ));

    const remainingQueue = studyQueue.slice(1);
    if (remainingQueue.length > 0) {
      setCurrentCard(remainingQueue[0]);
      setStudyQueue(remainingQueue);
      setIsFlipped(false);
    } else {
      setStudyMode(false);
      setCurrentCard(null);
      toast.success('Study session complete! Great job!');
    }

    addXP(difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20);
  };

  const createFlashcard = () => {
    if (!newCard.term || !newCard.definition) {
      toast.error('Please fill in term and definition');
      return;
    }

    const flashcard: Flashcard = {
      id: Date.now().toString(),
      ...newCard,
      confidence: 0,
      lastReviewed: new Date(),
      nextReview: new Date(),
      timesReviewed: 0
    };

    setFlashcards(prev => [...prev, flashcard]);
    setNewCard({
      term: '',
      definition: '',
      example: '',
      category: 'finance',
      difficulty: 'medium'
    });
    setShowCreateForm(false);
    addXP(25);
    toast.success('Flashcard created! +25 XP');
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : BookOpen;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'from-slate-400 to-slate-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-neon">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Knowledge Vault
              </h1>
              <p className="text-slate-400">Master business concepts with spaced repetition</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Card</span>
            </button>
            <button
              onClick={startStudySession}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Study Now</span>
            </button>
          </div>
        </motion.div>

        {/* Study Mode */}
        <AnimatePresence>
          {studyMode && currentCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
              <div className="max-w-2xl w-full">
                <div className="text-center mb-6">
                  <div className="text-white text-lg font-medium">
                    {studyQueue.length} cards remaining
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${((filteredCards.length - studyQueue.length) / filteredCards.length) * 100}%` }}
                    />
                  </div>
                </div>

                <motion.div
                  key={currentCard.id}
                  className="relative h-96 cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 p-8 flex flex-col justify-center items-center text-center backface-hidden">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(currentCard.category)} flex items-center justify-center mb-6`}>
                        {React.createElement(getCategoryIcon(currentCard.category), { className: "w-8 h-8 text-white" })}
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">{currentCard.term}</h2>
                      <p className="text-slate-400">Click to reveal definition</p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-800 to-purple-800 rounded-2xl border border-blue-500 p-8 flex flex-col justify-center text-center backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                      <h3 className="text-xl font-semibold text-white mb-4">Definition</h3>
                      <p className="text-blue-100 mb-6 leading-relaxed">{currentCard.definition}</p>
                      {currentCard.example && (
                        <>
                          <h4 className="text-lg font-medium text-blue-200 mb-2">Example</h4>
                          <p className="text-blue-200 italic">{currentCard.example}</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>

                {isFlipped && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center space-x-4 mt-8"
                  >
                    <button
                      onClick={() => handleCardResponse('hard')}
                      className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      Hard
                    </button>
                    <button
                      onClick={() => handleCardResponse('medium')}
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => handleCardResponse('easy')}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                    >
                      Easy
                    </button>
                  </motion.div>
                )}

                <button
                  onClick={() => setStudyMode(false)}
                  className="absolute top-4 right-4 p-2 text-white hover:text-red-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Card Modal */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 p-8 max-w-2xl w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Create New Flashcard</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Term</label>
                    <input
                      type="text"
                      value={newCard.term}
                      onChange={(e) => setNewCard(prev => ({ ...prev, term: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Customer Lifetime Value"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Definition</label>
                    <textarea
                      value={newCard.definition}
                      onChange={(e) => setNewCard(prev => ({ ...prev, definition: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-24 resize-none"
                      placeholder="Clear, concise definition..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Example (Optional)</label>
                    <textarea
                      value={newCard.example}
                      onChange={(e) => setNewCard(prev => ({ ...prev, example: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-20 resize-none"
                      placeholder="Real-world example or calculation..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Category</label>
                      <select
                        value={newCard.category}
                        onChange={(e) => setNewCard(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="finance">Finance</option>
                        <option value="marketing">Marketing</option>
                        <option value="saas">SaaS Metrics</option>
                        <option value="strategy">Strategy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Difficulty</label>
                      <select
                        value={newCard.difficulty}
                        onChange={(e) => setNewCard(prev => ({ ...prev, difficulty: e.target.value as any }))}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createFlashcard}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
                    >
                      Create Card
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
              <span className="text-xs opacity-75">
                ({category.id === 'all' ? flashcards.length : flashcards.filter(c => c.category === category.id).length})
              </span>
            </motion.button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50">
            <div className="text-2xl font-bold text-white">{flashcards.length}</div>
            <div className="text-slate-400">Total Cards</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
            <div className="text-2xl font-bold text-green-400">
              {flashcards.filter(c => c.confidence >= 0.8).length}
            </div>
            <div className="text-slate-400">Mastered</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-400">
              {flashcards.filter(c => c.nextReview <= new Date()).length}
            </div>
            <div className="text-slate-400">Due for Review</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(flashcards.reduce((acc, card) => acc + card.confidence, 0) / flashcards.length * 100)}%
            </div>
            <div className="text-slate-400">Avg Confidence</div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all group cursor-pointer"
              onClick={() => {
                setCurrentCard(card);
                setStudyMode(true);
                setStudyQueue([card]);
                setIsFlipped(false);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(card.category)} flex items-center justify-center`}>
                  {React.createElement(getCategoryIcon(card.category), { className: "w-5 h-5 text-white" })}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    card.difficulty === 'easy' ? 'bg-green-400' :
                    card.difficulty === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-xs text-slate-400 capitalize">{card.difficulty}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                {card.term}
              </h3>
              
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                {card.definition}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Confidence</span>
                  <span>{Math.round(card.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full transition-all"
                    style={{ width: `${card.confidence * 100}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500">
                  Reviewed {card.timesReviewed} times
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  RotateCcw, 
  Check, 
  X, 
  Brain, 
  Target,
  Plus,
  Filter,
  Search,
  Shuffle,
  Play,
  Star,
  Zap,
  Award,
  Dna,
  Heart,
  Microscope
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const MedicalFlashcards: React.FC = () => {
  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const flashcardDecks = [
    {
      id: 1,
      title: 'Cardiovascular System',
      description: 'Heart anatomy, physiology, and common pathologies',
      cardCount: 45,
      difficulty: 'Intermediate',
      specialty: 'Cardiology',
      progress: 78,
      lastStudied: '2 hours ago',
      color: 'blood',
      gradient: 'from-blood-500 to-blood-600',
      cards: [
        {
          question: 'What is the normal resting heart rate for adults?',
          answer: '60-100 beats per minute. Bradycardia is <60 bpm, tachycardia is >100 bpm.',
          category: 'Physiology',
          difficulty: 'Beginner'
        },
        {
          question: 'Name the four chambers of the heart',
          answer: 'Right atrium, right ventricle, left atrium, and left ventricle. The atria receive blood, ventricles pump blood.',
          category: 'Anatomy',
          difficulty: 'Beginner'
        }
      ]
    },
    {
      id: 2,
      title: 'Pharmacology Basics',
      description: 'Drug classifications, mechanisms, and interactions',
      cardCount: 62,
      difficulty: 'Advanced',
      specialty: 'Pharmacology',
      progress: 45,
      lastStudied: '1 day ago',
      color: 'bio',
      gradient: 'from-bio-500 to-bio-600',
      cards: [
        {
          question: 'What is the mechanism of action of ACE inhibitors?',
          answer: 'ACE inhibitors block the conversion of angiotensin I to angiotensin II, reducing vasoconstriction and aldosterone secretion.',
          category: 'Mechanism',
          difficulty: 'Intermediate'
        }
      ]
    },
    {
      id: 3,
      title: 'Neuroanatomy',
      description: 'Brain structures, functions, and neural pathways',
      cardCount: 38,
      difficulty: 'Advanced',
      specialty: 'Neurology',
      progress: 23,
      lastStudied: '3 days ago',
      color: 'neural',
      gradient: 'from-neural-500 to-neural-600',
      cards: [
        {
          question: 'What are the main functions of the frontal lobe?',
          answer: 'Executive functions, motor control, personality, decision-making, and speech production (Broca\'s area).',
          category: 'Function',
          difficulty: 'Intermediate'
        }
      ]
    },
    {
      id: 4,
      title: 'Pediatric Milestones',
      description: 'Developmental milestones and pediatric assessments',
      cardCount: 28,
      difficulty: 'Beginner',
      specialty: 'Pediatrics',
      progress: 92,
      lastStudied: '5 hours ago',
      color: 'medical',
      gradient: 'from-medical-500 to-medical-600',
      cards: [
        {
          question: 'At what age should a child typically walk independently?',
          answer: '12-15 months. Walking with support typically occurs around 9-12 months.',
          category: 'Development',
          difficulty: 'Beginner'
        }
      ]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Decks' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const filteredDecks = flashcardDecks.filter(deck => {
    const matchesFilter = selectedFilter === 'all' || deck.difficulty.toLowerCase() === selectedFilter;
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deck.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    const deck = flashcardDecks.find(d => d.id === selectedDeck);
    if (deck && currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleBackToDeck = () => {
    setSelectedDeck(null);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  if (selectedDeck) {
    const deck = flashcardDecks.find(d => d.id === selectedDeck);
    if (!deck) return null;

    const card = deck.cards[currentCard];

    return (
      <div className="min-h-screen bg-gradient-to-br from-bone-950 via-bone-900 to-bone-950" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
        <div className="ml-64 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Button
                    variant="ghost"
                    onClick={handleBackToDeck}
                    className="mb-4 text-bone-300 hover:text-bio-400 hover:bg-bio-900/20"
                  >
                    ← Back to Decks
                  </Button>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-bio-400 via-medical-400 to-neural-400 bg-clip-text text-transparent">{deck.title}</h1>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-blood-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-bone-300 font-medium">Card {currentCard + 1} of {deck.cards.length}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="info" size="sm" className="bg-medical-500/20 text-medical-400 border-medical-600/30">{deck.specialty}</Badge>
                  <Badge variant={getDifficultyColor(deck.difficulty) as any} size="sm">
                    {deck.difficulty}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="w-full bg-bone-800/60 rounded-full h-3 overflow-hidden border border-bio-600/30">
                <div 
                  className="medical-progress h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentCard + 1) / deck.cards.length) * 100}%` }}
                />
              </div>
            </motion.div>

            {/* Flashcard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative h-96 perspective-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFlipped ? 'answer' : 'question'}
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -90 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Card 
                      className="w-full h-full p-8 bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-bio-600/30 backdrop-blur-lg cursor-pointer hover:border-bio-500/50 transition-all duration-300 relative overflow-hidden group shadow-medical"
                      onClick={handleCardFlip}
                    >
                      <div className="absolute top-4 right-4 opacity-20">
                        <Dna className="w-8 h-8 text-bio-400 animate-dna-spin" />
                      </div>
                      <div className="absolute bottom-4 left-4 opacity-20">
                        <Microscope className="w-6 h-6 text-neural-400 animate-pulse" />
                      </div>
                      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                        <div className="mb-4">
                          <Badge variant="info" size="sm" className="bg-bio-500/20 text-bio-400 border-bio-600/30 font-medium">
                            {isFlipped ? 'Answer' : 'Question'}
                          </Badge>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <p className="text-xl text-white leading-relaxed font-medium">
                            {isFlipped ? card.answer : card.question}
                          </p>
                        </div>
                        <div className="mt-4 text-sm text-bone-400 font-medium">
                          Click to {isFlipped ? 'see question' : 'reveal answer'}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-4"
            >
              <Button
                variant="outline"
                onClick={handlePrevCard}
                disabled={currentCard === 0}
                className="px-6 border-bone-600/30 text-bone-300 hover:bg-bio-900/20 hover:border-bio-500/50 bg-bone-800/50 backdrop-blur-lg"
              >
                Previous
              </Button>
              
              <Button
                variant="outline"
                onClick={handleCardFlip}
                className="px-6 border-bone-600/30 text-bone-300 hover:bg-bio-900/20 hover:border-bio-500/50 bg-bone-800/50 backdrop-blur-lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Flip Card
              </Button>
              
              <Button
                onClick={handleNextCard}
                disabled={currentCard === deck.cards.length - 1}
                className="px-6 bg-gradient-to-r from-bio-500 to-medical-600 hover:from-bio-600 hover:to-medical-700 text-white shadow-medical"
              >
                Next
              </Button>
            </motion.div>

            {/* Difficulty Rating */}
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-bone-300 mb-4 font-medium">How difficult was this card?</p>
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="outline" className="text-bio-400 border-bio-600/30 hover:bg-bio-900/20 bg-bone-800/50 backdrop-blur-lg">
                    <Check className="w-4 h-4 mr-2" />
                    Easy
                  </Button>
                  <Button variant="outline" className="text-blood-400 border-blood-600/30 hover:bg-blood-900/20 bg-bone-800/50 backdrop-blur-lg">
                    <Target className="w-4 h-4 mr-2" />
                    Medium
                  </Button>
                  <Button variant="outline" className="text-neural-400 border-neural-600/30 hover:bg-neural-900/20 bg-bone-800/50 backdrop-blur-lg">
                    <X className="w-4 h-4 mr-2" />
                    Hard
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bone-950 via-bone-900 to-bone-950" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
      <div className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-bio-400 via-medical-400 to-neural-400 bg-clip-text text-transparent">Medical Flashcards</h1>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-blood-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
                <p className="text-bone-300 font-medium">Study medical concepts with spaced repetition</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-bone-400" />
                  <input
                    type="text"
                    placeholder="Search decks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-bone-800/50 border border-bio-600/30 rounded-lg text-white placeholder-bone-400 focus:outline-none focus:ring-2 focus:ring-bio-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <Button className="bg-gradient-to-r from-bio-500 to-medical-600 hover:from-bio-600 hover:to-medical-700 text-white shadow-medical">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Deck
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-bio-500 to-medical-600 text-white shadow-medical'
                      : 'bg-bone-800/50 text-bone-300 border border-bio-600/30 hover:bg-bio-900/20 hover:border-bio-500/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Flashcard Decks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDecks.map((deck, index) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-bio-600/30 backdrop-blur-lg hover:border-bio-500/50 transition-all duration-300 group relative overflow-hidden shadow-medical">
                  <div className="absolute top-2 right-2 opacity-20">
                    <Heart className="w-6 h-6 text-blood-400 animate-pulse" />
                  </div>
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${deck.gradient} flex items-center justify-center shadow-glow-sm group-hover:animate-heartbeat transition-transform duration-200`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant={getDifficultyColor(deck.difficulty) as any} size="sm">
                        {deck.difficulty}
                      </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-bio-400 transition-colors">
                      {deck.title}
                    </h3>
                    <p className="text-sm text-bone-300 mb-4">{deck.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-bone-400 font-medium">
                      <span>{deck.cardCount} cards</span>
                      <span>Last studied {deck.lastStudied}</span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-bone-300 mb-1 font-medium">
                        <span>Progress</span>
                        <span>{deck.progress}%</span>
                      </div>
                      <div className="w-full bg-bone-800/60 rounded-full h-2 overflow-hidden border border-bio-600/30">
                        <div 
                          className={`bg-gradient-to-r ${deck.gradient} h-2 rounded-full transition-all duration-500 animate-pulse`}
                          style={{ width: `${deck.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setSelectedDeck(deck.id)}
                        className="flex-1 bg-gradient-to-r from-bio-500 to-medical-600 hover:from-bio-600 hover:to-medical-700 text-white shadow-medical"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Study
                      </Button>
                      <Button variant="outline" className="px-3 border-bone-600/30 text-bone-300 hover:bg-bio-900/20 hover:border-bio-500/50 bg-bone-800/50 backdrop-blur-lg">
                        <Shuffle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDecks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mb-4">
                <BookOpen className="w-16 h-16 text-bone-500 mx-auto animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No flashcard decks found</h3>
              <p className="text-bone-400 mb-4">Try adjusting your search or filter criteria</p>
              <Button className="bg-gradient-to-r from-bio-500 to-medical-600 hover:from-bio-600 hover:to-medical-700 text-white shadow-medical">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Deck
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
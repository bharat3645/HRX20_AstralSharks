import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  Brain,
  Lightbulb,
  BookOpen,
  Star,
  Zap,
  Bot,
  Loader2,
  CheckCircle,
  X,
  RotateCcw,
  Target,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  Play,
  PauseCircle,
  SkipForward,
  ArrowLeft,
  Save
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { geminiAI } from '../../services/geminiAI';
import { useMedicalStore } from '../../store/medicalStore';

interface StudyNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  date: string;
  aiAnalysis?: string;
  difficulty: string;
  lastModified: string;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: string;
  clinicalRelevance: string;
  mastered: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  schedule: Array<{
    day: number;
    topic: string;
    activities: string[];
    estimatedTime: string;
  }>;
  progress: number;
}

export const StudyJournal: React.FC = () => {
  const { selectedDomain } = useMedicalStore();
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards' | 'quiz' | 'study-plan'>('notes');
  const [isGenerating, setIsGenerating] = useState(false);

  // Note editing states
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('Study Notes');
  const [newNoteDifficulty, setNewNoteDifficulty] = useState('Intermediate');
  const [newNoteTags, setNewNoteTags] = useState('');

  // Flashcard states
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [flashcardTopic, setFlashcardTopic] = useState('');
  const [flashcardCount, setFlashcardCount] = useState(5);

  // Quiz states
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResults, setQuizResults] = useState<Array<{ correct: boolean; selectedAnswer: number }>>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizTopic, setQuizTopic] = useState('');

  // Study plan states
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [selectedStudyPlan, setSelectedStudyPlan] = useState<StudyPlan | null>(null);
  const [studyPlanTopic, setStudyPlanTopic] = useState('');

  const [notes, setNotes] = useState<StudyNote[]>([
    {
      id: '1',
      title: 'Cardiovascular Physiology Review',
      content: 'Today I studied the cardiac cycle and learned about the Frank-Starling mechanism. Key points:\n\n1. Preload affects stroke volume\n2. Afterload is the resistance the heart pumps against\n3. Contractility can be increased by sympathetic stimulation\n\nNeed to review: ECG interpretation and arrhythmias\n\nDetailed Notes:\n\nThe Frank-Starling mechanism is a fundamental principle of cardiac physiology that describes the relationship between ventricular filling (preload) and stroke volume. As the ventricle fills with more blood during diastole, the cardiac muscle fibers are stretched, leading to a more forceful contraction during systole.\n\nKey Components:\n- Preload: The degree of ventricular filling at the end of diastole\n- Afterload: The resistance the ventricle must overcome to eject blood\n- Contractility: The intrinsic ability of the heart muscle to contract\n\nClinical Relevance:\nUnderstanding this mechanism is crucial for managing heart failure patients and optimizing cardiac output in various clinical scenarios.',
      tags: ['Cardiology', 'Physiology'],
      category: 'Study Notes',
      date: '2024-01-15',
      aiAnalysis: 'Great foundation in cardiac physiology! Consider reviewing the relationship between preload and venous return, and how this relates to clinical conditions like heart failure.',
      difficulty: 'Intermediate',
      lastModified: '2 hours ago'
    },
    {
      id: '2',
      title: 'Patient Case: Chest Pain',
      content: 'Encountered a 55-year-old male with acute chest pain in the ER today. Initial presentation was concerning for MI.\n\nLearning points:\n- Always consider STEMI vs NSTEMI\n- Troponin levels and timing\n- ECG changes to look for\n\nReflection: I need to be more systematic in my approach to chest pain evaluation.\n\nCase Details:\nPatient presented with crushing substernal chest pain radiating to the left arm, associated with diaphoresis and nausea. Pain started 2 hours prior while at rest.\n\nVital Signs:\n- BP: 160/95 mmHg\n- HR: 110 bpm\n- RR: 22/min\n- Temp: 98.6°F\n- SpO2: 96% on room air\n\nECG Findings:\n- ST elevation in leads II, III, aVF\n- Reciprocal changes in I, aVL\n- Consistent with inferior STEMI\n\nManagement:\n- Immediate cardiology consultation\n- Dual antiplatelet therapy\n- Anticoagulation\n- Urgent cardiac catheterization',
      tags: ['Emergency Medicine', 'Cardiology', 'Case Study'],
      category: 'Clinical Experience',
      date: '2024-01-14',
      aiAnalysis: 'Excellent clinical reflection! Your systematic approach is developing well. Consider creating a chest pain differential diagnosis checklist.',
      difficulty: 'Advanced',
      lastModified: '1 day ago'
    },
    {
      id: '3',
      title: 'Pharmacology: ACE Inhibitors',
      content: 'Mechanism of action:\n- Block conversion of Angiotensin I to Angiotensin II\n- Reduce vasoconstriction and aldosterone secretion\n- Lower blood pressure and reduce cardiac workload\n\nSide effects: Dry cough (due to bradykinin), hyperkalemia, angioedema\n\nContraindications: Pregnancy, bilateral renal artery stenosis\n\nDetailed Pharmacology:\n\nACE inhibitors work by blocking the angiotensin-converting enzyme, which is responsible for converting angiotensin I to the potent vasoconstrictor angiotensin II. This leads to:\n\n1. Decreased vasoconstriction\n2. Reduced aldosterone secretion\n3. Increased bradykinin levels\n4. Improved endothelial function\n\nClinical Applications:\n- Hypertension\n- Heart failure\n- Post-myocardial infarction\n- Diabetic nephropathy\n- Chronic kidney disease\n\nMonitoring:\n- Serum creatinine and potassium\n- Blood pressure\n- Signs of angioedema',
      tags: ['Pharmacology', 'Cardiology'],
      category: 'Drug Study',
      date: '2024-01-13',
      aiAnalysis: 'Solid understanding of ACE inhibitors! Try connecting this to clinical scenarios - when would you prescribe vs contraindicate?',
      difficulty: 'Beginner',
      lastModified: '2 days ago'
    }
  ]);

  // Generate Flashcards
  const generateFlashcards = async () => {
    if (!flashcardTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      const generatedCards = await geminiAI.generateFlashcards(flashcardTopic, flashcardCount);
      const formattedCards: Flashcard[] = generatedCards.map((card, index) => ({
        id: `fc-${Date.now()}-${index}`,
        question: card.question,
        answer: card.answer,
        category: card.category,
        difficulty: card.difficulty,
        clinicalRelevance: card.clinicalRelevance,
        mastered: false
      }));
      
      setFlashcards(formattedCards);
      setCurrentFlashcard(0);
      setIsFlashcardFlipped(false);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Quiz
  const generateQuiz = async () => {
    if (!quizTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Create a medical quiz about ${quizTopic} with 5 multiple choice questions. Each question should have 4 options with only one correct answer.

Respond in this JSON format:
[
  {
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of the correct answer",
    "difficulty": "beginner/intermediate/advanced"
  }
]`;

      const response = await geminiAI.generateContent({
        prompt,
        userDomain: selectedDomain?.slug || 'medical',
        type: 'study_analysis'
      });

      const generatedQuestions = JSON.parse(response.content);
      const formattedQuestions: QuizQuestion[] = generatedQuestions.map((q: any, index: number) => ({
        id: `quiz-${Date.now()}-${index}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty
      }));

      setQuizQuestions(formattedQuestions);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setQuizResults([]);
      setShowQuizResults(false);
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Study Plan
  const generateStudyPlan = async () => {
    if (!studyPlanTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      const prompt = `Create a comprehensive 7-day study plan for ${studyPlanTopic}. Include daily topics, activities, and estimated time.

Respond in this JSON format:
{
  "title": "Study Plan Title",
  "description": "Brief description of the study plan",
  "duration": "7 days",
  "topics": ["Topic 1", "Topic 2", "Topic 3"],
  "schedule": [
    {
      "day": 1,
      "topic": "Day 1 Topic",
      "activities": ["Activity 1", "Activity 2", "Activity 3"],
      "estimatedTime": "2-3 hours"
    }
  ]
}`;

      const response = await geminiAI.generateContent({
        prompt,
        userDomain: selectedDomain?.slug || 'medical',
        type: 'study_analysis'
      });

      const generatedPlan = JSON.parse(response.content);
      const newStudyPlan: StudyPlan = {
        id: `plan-${Date.now()}`,
        title: generatedPlan.title,
        description: generatedPlan.description,
        duration: generatedPlan.duration,
        topics: generatedPlan.topics,
        schedule: generatedPlan.schedule,
        progress: 0
      };

      setStudyPlans([...studyPlans, newStudyPlan]);
      setSelectedStudyPlan(newStudyPlan);
    } catch (error) {
      console.error('Error generating study plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Note management functions
  const handleCreateNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote: StudyNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle,
      content: newNoteContent,
      tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category: newNoteCategory,
      date: new Date().toISOString().split('T')[0],
      difficulty: newNoteDifficulty,
      lastModified: 'Just now'
    };

    setNotes([newNote, ...notes]);
    setIsCreating(false);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
  };

  const handleEditNote = (note: StudyNote) => {
    setEditingNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
    setNewNoteCategory(note.category);
    setNewNoteDifficulty(note.difficulty);
    setNewNoteTags(note.tags.join(', '));
  };

  const handleSaveEdit = () => {
    if (!editingNote || !newNoteTitle.trim() || !newNoteContent.trim()) return;

    const updatedNotes = notes.map(note => 
      note.id === editingNote.id 
        ? {
            ...note,
            title: newNoteTitle,
            content: newNoteContent,
            category: newNoteCategory,
            difficulty: newNoteDifficulty,
            tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag),
            lastModified: 'Just now'
          }
        : note
    );

    setNotes(updatedNotes);
    setEditingNote(null);
    setSelectedNote(null);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote === noteId) {
      setSelectedNote(null);
    }
  };

  // Flashcard navigation
  const nextFlashcard = () => {
    if (currentFlashcard < flashcards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
      setIsFlashcardFlipped(false);
    }
  };

  const prevFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(currentFlashcard - 1);
      setIsFlashcardFlipped(false);
    }
  };

  const markFlashcardMastered = (mastered: boolean) => {
    const updatedCards = [...flashcards];
    updatedCards[currentFlashcard].mastered = mastered;
    setFlashcards(updatedCards);
    
    // Auto advance to next card
    setTimeout(() => {
      nextFlashcard();
    }, 500);
  };

  // Quiz functions
  const submitQuizAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    const newResults = [...quizResults, { correct: isCorrect, selectedAnswer }];
    setQuizResults(newResults);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowQuizResults(true);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizResults([]);
    setShowQuizResults(false);
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || 
                         note.category.toLowerCase() === selectedFilter.toLowerCase() ||
                         note.difficulty.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', 'Study Notes', 'Clinical Experience', 'Drug Study', 'Research'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Study Notes': 'blue',
      'Clinical Experience': 'green',
      'Drug Study': 'purple',
      'Research': 'orange'
    };
    return colors[category] || 'gray';
  };

  // If viewing a specific note
  if (selectedNote && !isCreating && !editingNote) {
    const note = notes.find(n => n.id === selectedNote);
    if (!note) {
      setSelectedNote(null);
      return null;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="ml-64 pt-16">
          <div className="max-w-6xl mx-auto px-6 py-8">
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
                    onClick={() => setSelectedNote(null)}
                    className="mb-4 text-gray-300 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Journal
                  </Button>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">{note.title}</h1>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">
                    {note.category} • {note.date} • Last modified {note.lastModified}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getDifficultyColor(note.difficulty) as any} size="sm">
                    {note.difficulty}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => handleEditNote(note)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Note Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    {note.tags.map((tag, index) => (
                      <Badge key={index} variant="info" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed font-sans">
                      {note.content}
                    </pre>
                  </div>
                </Card>
              </motion.div>

              {/* AI Analysis & Tools */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {note.aiAnalysis && (
                  <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-purple-900/30 rounded-xl flex items-center justify-center border border-purple-700/30">
                        <Brain className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">AI Analysis</h3>
                        <p className="text-sm text-gray-400">Personalized insights</p>
                      </div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                      <p className="text-sm text-purple-200">{note.aiAnalysis}</p>
                    </div>
                  </Card>
                )}

                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">Study Tools</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        setFlashcardTopic(note.title);
                        setActiveTab('flashcards');
                        setSelectedNote(null);
                      }}
                    >
                      <Lightbulb className="w-4 h-4 mr-2 text-amber-400" />
                      Generate Flashcards
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        setQuizTopic(note.title);
                        setActiveTab('quiz');
                        setSelectedNote(null);
                      }}
                    >
                      <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                      Create Quiz
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        setStudyPlanTopic(note.title);
                        setActiveTab('study-plan');
                        setSelectedNote(null);
                      }}
                    >
                      <Brain className="w-4 h-4 mr-2 text-purple-400" />
                      AI Study Plan
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">Note Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Category</span>
                      <Badge variant="default" size="sm">{note.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Difficulty</span>
                      <Badge variant={getDifficultyColor(note.difficulty) as any} size="sm">
                        {note.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Created</span>
                      <span className="text-sm text-white">{note.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Modified</span>
                      <span className="text-sm text-white">{note.lastModified}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If creating or editing a note
  if (isCreating || editingNote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="ml-64 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => {
                  setIsCreating(false);
                  setEditingNote(null);
                  setNewNoteTitle('');
                  setNewNoteContent('');
                  setNewNoteTags('');
                }}
                className="mb-4 text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Journal
              </Button>
              <h1 className="text-3xl font-bold text-white">
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h1>
            </motion.div>

            <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Enter note title..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newNoteCategory}
                      onChange={(e) => setNewNoteCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Study Notes">Study Notes</option>
                      <option value="Clinical Experience">Clinical Experience</option>
                      <option value="Drug Study">Drug Study</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={newNoteDifficulty}
                      onChange={(e) => setNewNoteDifficulty(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newNoteTags}
                      onChange={(e) => setNewNoteTags(e.target.value)}
                      placeholder="e.g., Cardiology, Physiology"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Write your note content here..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-96 resize-none"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={editingNote ? handleSaveEdit : handleCreateNote}
                    disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingNote ? 'Save Changes' : 'Create Note'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingNote(null);
                      setNewNoteTitle('');
                      setNewNoteContent('');
                      setNewNoteTags('');
                    }}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
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
                  <h1 className="text-3xl font-bold text-white">AI Study Journal</h1>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Bot className="w-3 h-3 mr-1" />
                    Gemini AI Powered
                  </Badge>
                </div>
                <p className="text-gray-300">AI-enhanced learning with flashcards, quizzes, and study plans</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Note
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex space-x-4">
              {[
                { id: 'notes', label: 'Study Notes', icon: FileText },
                { id: 'flashcards', label: 'AI Flashcards', icon: BookOpen },
                { id: 'quiz', label: 'AI Quiz', icon: Target },
                { id: 'study-plan', label: 'AI Study Plan', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id !== 'notes' && (
                    <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                      AI
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'notes' && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Filters */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                    {[...categories, ...difficulties].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter.toLowerCase())}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                          selectedFilter === filter.toLowerCase()
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700/50'
                        }`}
                      >
                        <span>{filter}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-${getCategoryColor(note.category)}-900/30 border border-${getCategoryColor(note.category)}-700/30 flex items-center justify-center`}>
                            <FileText className={`w-5 h-5 text-${getCategoryColor(note.category)}-400`} />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getDifficultyColor(note.difficulty) as any} size="sm">
                              {note.difficulty}
                            </Badge>
                            <button 
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNote(note.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                            </button>
                          </div>
                        </div>

                        <h3 
                          className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors cursor-pointer"
                          onClick={() => setSelectedNote(note.id)}
                        >
                          {note.title}
                        </h3>

                        <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                          {note.content.substring(0, 120)}...
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="default" size="sm">{note.category}</Badge>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs">{note.date}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {note.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="info" size="sm">
                              {tag}
                            </Badge>
                          ))}
                          {note.tags.length > 2 && (
                            <Badge variant="default" size="sm">
                              +{note.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setSelectedNote(note.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            Read More
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditNote(note);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredNotes.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No notes found</h3>
                    <p className="text-gray-400 mb-4">Start documenting your medical learning journey</p>
                    <Button
                      onClick={() => setIsCreating(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Note
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'flashcards' && (
              <motion.div
                key="flashcards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Flashcard Generator */}
                  <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <Bot className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-white">AI Flashcard Generator</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Topic
                        </label>
                        <input
                          type="text"
                          value={flashcardTopic}
                          onChange={(e) => setFlashcardTopic(e.target.value)}
                          placeholder="e.g., Cardiac Arrhythmias"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Number of Cards
                        </label>
                        <select
                          value={flashcardCount}
                          onChange={(e) => setFlashcardCount(Number(e.target.value))}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={5}>5 Cards</option>
                          <option value={10}>10 Cards</option>
                          <option value={15}>15 Cards</option>
                          <option value={20}>20 Cards</option>
                        </select>
                      </div>
                      
                      <Button
                        onClick={generateFlashcards}
                        disabled={!flashcardTopic.trim() || isGenerating}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Flashcards
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>

                  {/* Flashcard Display */}
                  <div className="lg:col-span-2">
                    {flashcards.length > 0 && (
                      <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-white">
                            Flashcard {currentFlashcard + 1} of {flashcards.length}
                          </h3>
                          <Badge variant="info" size="sm">
                            {flashcards[currentFlashcard]?.difficulty}
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentFlashcard + 1) / flashcards.length) * 100}%` }}
                          />
                        </div>

                        {/* Flashcard */}
                        <div className="relative h-64 mb-6">
                          <div
                            className="w-full h-full bg-gray-700/50 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-700/70"
                            onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                          >
                            <div className="flex flex-col justify-center items-center h-full text-center">
                              <div className="mb-4">
                                <Badge variant="info" size="sm">
                                  {isFlashcardFlipped ? 'Answer' : 'Question'}
                                </Badge>
                              </div>
                              <p className="text-lg text-white leading-relaxed">
                                {isFlashcardFlipped 
                                  ? flashcards[currentFlashcard]?.answer 
                                  : flashcards[currentFlashcard]?.question
                                }
                              </p>
                              <div className="mt-4 text-sm text-gray-400">
                                Click to {isFlashcardFlipped ? 'see question' : 'reveal answer'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            onClick={prevFlashcard}
                            disabled={currentFlashcard === 0}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            Previous
                          </Button>

                          {isFlashcardFlipped && (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => markFlashcardMastered(false)}
                                className="border-red-600 text-red-400 hover:bg-red-900/20"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Need Review
                              </Button>
                              <Button
                                onClick={() => markFlashcardMastered(true)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mastered
                              </Button>
                            </div>
                          )}

                          <Button
                            onClick={nextFlashcard}
                            disabled={currentFlashcard === flashcards.length - 1}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Next
                          </Button>
                        </div>

                        {/* Clinical Relevance */}
                        {isFlashcardFlipped && flashcards[currentFlashcard]?.clinicalRelevance && (
                          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-300 mb-2">Clinical Relevance</h4>
                            <p className="text-sm text-blue-200">
                              {flashcards[currentFlashcard].clinicalRelevance}
                            </p>
                          </div>
                        )}
                      </Card>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Quiz Generator */}
                  <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <Bot className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-white">AI Quiz Generator</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quiz Topic
                        </label>
                        <input
                          type="text"
                          value={quizTopic}
                          onChange={(e) => setQuizTopic(e.target.value)}
                          placeholder="e.g., Pharmacology Basics"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <Button
                        onClick={generateQuiz}
                        disabled={!quizTopic.trim() || isGenerating}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Target className="w-4 h-4 mr-2" />
                            Generate Quiz
                          </>
                        )}
                      </Button>

                      {quizQuestions.length > 0 && !showQuizResults && (
                        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-300 mb-2">Quiz Progress</h4>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-blue-200">
                            Question {currentQuestion + 1} of {quizQuestions.length}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Quiz Display */}
                  <div className="lg:col-span-2">
                    {quizQuestions.length > 0 && !showQuizResults && (
                      <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-white mb-4">
                            Question {currentQuestion + 1}
                          </h3>
                          <p className="text-gray-300 text-lg leading-relaxed">
                            {quizQuestions[currentQuestion]?.question}
                          </p>
                        </div>

                        <div className="space-y-3 mb-6">
                          {quizQuestions[currentQuestion]?.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedAnswer(index)}
                              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                                selectedAnswer === index
                                  ? 'bg-blue-600 border-blue-500 text-white'
                                  : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700/70'
                              }`}
                            >
                              <span className="font-medium mr-3">
                                {String.fromCharCode(65 + index)}.
                              </span>
                              {option}
                            </button>
                          ))}
                        </div>

                        <Button
                          onClick={submitQuizAnswer}
                          disabled={selectedAnswer === null}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          Submit Answer
                        </Button>

                        {/* Show explanation after answer */}
                        {quizResults.length > currentQuestion && (
                          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                            <h4 className="text-sm font-medium text-white mb-2">Explanation</h4>
                            <p className="text-sm text-gray-300">
                              {quizQuestions[currentQuestion]?.explanation}
                            </p>
                          </div>
                        )}
                      </Card>
                    )}

                    {/* Quiz Results */}
                    {showQuizResults && (
                      <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <div className="text-center mb-6">
                          <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
                          <p className="text-gray-300">
                            You scored {quizResults.filter(r => r.correct).length} out of {quizResults.length}
                          </p>
                        </div>

                        <div className="space-y-3 mb-6">
                          {quizResults.map((result, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${
                                result.correct
                                  ? 'bg-green-900/20 border-green-700/30'
                                  : 'bg-red-900/20 border-red-700/30'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {result.correct ? (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                  <X className="w-5 h-5 text-red-400" />
                                )}
                                <span className="text-white font-medium">
                                  Question {index + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={resetQuiz}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Retake Quiz
                        </Button>
                      </Card>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'study-plan' && (
              <motion.div
                key="study-plan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Study Plan Generator */}
                  <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <Bot className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-white">AI Study Plan Generator</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Study Topic
                        </label>
                        <input
                          type="text"
                          value={studyPlanTopic}
                          onChange={(e) => setStudyPlanTopic(e.target.value)}
                          placeholder="e.g., Cardiovascular System"
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <Button
                        onClick={generateStudyPlan}
                        disabled={!studyPlanTopic.trim() || isGenerating}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Generate Study Plan
                          </>
                        )}
                      </Button>

                      {/* Study Plan List */}
                      {studyPlans.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-white mb-3">Your Study Plans</h4>
                          <div className="space-y-2">
                            {studyPlans.map((plan) => (
                              <button
                                key={plan.id}
                                onClick={() => setSelectedStudyPlan(plan)}
                                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                  selectedStudyPlan?.id === plan.id
                                    ? 'bg-blue-600 border-blue-500 text-white'
                                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700/70'
                                }`}
                              >
                                <p className="font-medium">{plan.title}</p>
                                <p className="text-xs opacity-75">{plan.duration}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Study Plan Display */}
                  <div className="lg:col-span-2">
                    {selectedStudyPlan && (
                      <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {selectedStudyPlan.title}
                          </h3>
                          <p className="text-gray-300 mb-4">
                            {selectedStudyPlan.description}
                          </p>
                          <div className="flex items-center space-x-4">
                            <Badge variant="info" size="sm">
                              {selectedStudyPlan.duration}
                            </Badge>
                            <div className="flex items-center space-x-1 text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">Progress: {selectedStudyPlan.progress}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedStudyPlan.progress}%` }}
                          />
                        </div>

                        {/* Schedule */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white">Study Schedule</h4>
                          {selectedStudyPlan.schedule.map((day, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium text-white">
                                  Day {day.day}: {day.topic}
                                </h5>
                                <Badge variant="default" size="sm">
                                  {day.estimatedTime}
                                </Badge>
                              </div>
                              <ul className="space-y-1">
                                {day.activities.map((activity, actIndex) => (
                                  <li key={actIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
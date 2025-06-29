import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Swords, 
  Clock, 
  Trophy, 
  Users, 
  Send, 
  Star,
  Zap,
  Target,
  Brain,
  Heart,
  Activity,
  User,
  Crown,
  Sparkles,
  Shield,
  Flame,
  Award
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useMedicalStore } from '../../store/medicalStore';
import { geminiAI, BattleEvaluation } from '../../services/geminiAI';

interface BattleSession {
  id: string;
  player1: string;
  player2: string;
  case: PatientCase;
  status: 'waiting' | 'active' | 'completed';
  timeLimit: number;
  timeRemaining: number;
}

interface PatientCase {
  id: string;
  title: string;
  presentation: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  correctDiagnosis: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  vitals: {
    bp: string;
    hr: string;
    rr: string;
    temp: string;
    spo2: string;
  };
}

export const MedBattle: React.FC = () => {
  const { user } = useMedicalStore();
  const [battleState, setBattleState] = useState<'queue' | 'battle' | 'results'>('queue');
  const [currentBattle, setCurrentBattle] = useState<BattleSession | null>(null);
  const [playerQuestions, setPlayerQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [finalDiagnosis, setFinalDiagnosis] = useState('');
  const [finalTreatment, setFinalTreatment] = useState('');
  const [battleResults, setBattleResults] = useState<{
    playerScore: BattleEvaluation;
    opponentScore: BattleEvaluation;
    winner: string;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [isInQueue, setIsInQueue] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const joinQueue = async () => {
    setIsInQueue(true);
    // Simulate finding a match after 3 seconds
    setTimeout(async () => {
      try {
        // Generate a random case using Gemini AI
        const specialties = ['Cardiology', 'Emergency Medicine', 'Internal Medicine', 'Neurology'];
        const difficulties = ['beginner', 'intermediate', 'advanced'];
        const randomSpecialty = specialties[Math.floor(Math.random() * specialties.length)];
        const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

        const generatedCase = await geminiAI.generatePatientCase(randomSpecialty, randomDifficulty as any);
        
        const battleCase: PatientCase = {
          id: crypto.randomUUID(),
          title: generatedCase.title,
          presentation: generatedCase.presentation,
          age: generatedCase.age,
          gender: generatedCase.gender,
          chiefComplaint: generatedCase.chiefComplaint,
          correctDiagnosis: generatedCase.correctDiagnosis,
          difficulty: randomDifficulty as any,
          vitals: generatedCase.vitals
        };

        setCurrentBattle({
          id: crypto.randomUUID(),
          player1: user?.username || 'You',
          player2: 'Dr. Challenger',
          case: battleCase,
          status: 'active',
          timeLimit: 300,
          timeRemaining: 300
        });
        setBattleState('battle');
        setIsInQueue(false);
      } catch (error) {
        console.error('Error generating battle case:', error);
        // Fallback to predefined case
        const fallbackCase: PatientCase = {
          id: '1',
          title: 'Emergency Chest Pain',
          presentation: 'A 58-year-old male presents with severe crushing chest pain that started 2 hours ago.',
          age: 58,
          gender: 'Male',
          chiefComplaint: 'Severe chest pain for 2 hours',
          correctDiagnosis: 'ST-Elevation Myocardial Infarction (STEMI)',
          difficulty: 'intermediate',
          vitals: {
            bp: '160/95',
            hr: '110',
            rr: '22',
            temp: '98.6°F',
            spo2: '96%'
          }
        };

        setCurrentBattle({
          id: crypto.randomUUID(),
          player1: user?.username || 'You',
          player2: 'Dr. Challenger',
          case: fallbackCase,
          status: 'active',
          timeLimit: 300,
          timeRemaining: 300
        });
        setBattleState('battle');
        setIsInQueue(false);
      }
    }, 3000);
  };

  const submitQuestion = () => {
    if (!currentQuestion.trim()) return;
    
    setPlayerQuestions([...playerQuestions, currentQuestion]);
    setCurrentQuestion('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Blood pressure: 160/95 mmHg, Heart rate: 110 bpm',
        'ECG shows ST elevation in leads II, III, aVF',
        'Troponin I: 15.2 ng/mL (elevated)',
        'Patient reports 8/10 crushing chest pain',
        'No known drug allergies, takes lisinopril for hypertension',
        'Chest X-ray shows no acute abnormalities',
        'Patient appears diaphoretic and anxious',
        'Pain radiates to left arm and jaw'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setPlayerQuestions(prev => [...prev, `Patient: ${randomResponse}`]);
    }, 1000);
  };

  const submitFinalAnswer = async () => {
    if (!finalDiagnosis.trim() || !finalTreatment.trim() || !currentBattle) return;

    setIsEvaluating(true);

    try {
      // Use Gemini AI to evaluate the battle submission
      const playerScore = await geminiAI.evaluateBattleSubmission(
        currentBattle.case.presentation,
        playerQuestions.filter(q => !q.startsWith('Patient:')),
        finalDiagnosis,
        finalTreatment,
        currentBattle.case.correctDiagnosis
      );

      // Generate opponent score (slightly randomized for realism)
      const opponentScore: BattleEvaluation = {
        diagnosisScore: Math.floor(Math.random() * 30) + 60,
        investigationScore: Math.floor(Math.random() * 30) + 60,
        treatmentScore: Math.floor(Math.random() * 30) + 60,
        reasoningScore: Math.floor(Math.random() * 30) + 60,
        totalScore: 0,
        feedback: 'Solid clinical reasoning but missed some key investigations.',
        suggestions: ['Consider additional differential diagnoses', 'Order more specific tests', 'Review treatment protocols']
      };
      opponentScore.totalScore = opponentScore.diagnosisScore + opponentScore.investigationScore + 
                                 opponentScore.treatmentScore + opponentScore.reasoningScore;

      setBattleResults({
        playerScore,
        opponentScore,
        winner: playerScore.totalScore > opponentScore.totalScore ? user?.username || 'You' : 'Dr. Challenger'
      });
      setBattleState('results');
    } catch (error) {
      console.error('Error evaluating battle:', error);
      // Fallback evaluation
      const fallbackScore: BattleEvaluation = {
        diagnosisScore: Math.floor(Math.random() * 30) + 70,
        investigationScore: Math.floor(Math.random() * 30) + 70,
        treatmentScore: Math.floor(Math.random() * 30) + 70,
        reasoningScore: Math.floor(Math.random() * 30) + 70,
        totalScore: 280,
        feedback: 'Good clinical approach. Continue developing systematic diagnostic skills.',
        suggestions: ['Review differential diagnosis', 'Practice evidence-based medicine', 'Focus on patient safety']
      };

      const opponentScore: BattleEvaluation = {
        diagnosisScore: Math.floor(Math.random() * 30) + 60,
        investigationScore: Math.floor(Math.random() * 30) + 60,
        treatmentScore: Math.floor(Math.random() * 30) + 60,
        reasoningScore: Math.floor(Math.random() * 30) + 60,
        totalScore: 240,
        feedback: 'Decent effort but needs improvement in systematic approach.',
        suggestions: ['Study more cases', 'Review clinical guidelines', 'Practice diagnostic reasoning']
      };

      setBattleResults({
        playerScore: fallbackScore,
        opponentScore,
        winner: fallbackScore.totalScore > opponentScore.totalScore ? user?.username || 'You' : 'Dr. Challenger'
      });
      setBattleState('results');
    } finally {
      setIsEvaluating(false);
    }
  };

  const resetBattle = () => {
    setBattleState('queue');
    setCurrentBattle(null);
    setPlayerQuestions([]);
    setCurrentQuestion('');
    setFinalDiagnosis('');
    setFinalTreatment('');
    setBattleResults(null);
    setTimeRemaining(300);
  };

  // Timer effect
  useEffect(() => {
    if (battleState === 'battle' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [battleState, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (battleState === 'queue') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="ml-64 pt-16">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg relative">
                  <Swords className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-yellow-900" />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">MedBattle Arena</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Challenge fellow medical students in real-time diagnostic battles. Test your clinical reasoning against the best!
              </p>
            </motion.div>

            {/* Battle Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Battles Won', value: '12', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-700/30' },
                { label: 'Win Rate', value: '78%', icon: Target, color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-700/30' },
                { label: 'Current Rank', value: '#47', icon: Crown, color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-700/30' },
                { label: 'Battle XP', value: '2,450', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-700/30' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-6 ${stat.bg} border ${stat.border} backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-200`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center border ${stat.border}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Queue Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm text-center relative overflow-hidden hover:bg-gray-700/50 transition-all duration-200">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-purple-900/10" />
                <div className="relative z-10">
                  {!isInQueue ? (
                    <>
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <Users className="w-12 h-12 text-white" />
                        <div className="absolute -top-1 -right-1">
                          <Flame className="w-6 h-6 text-orange-400 animate-bounce" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4">Ready for Medical Combat?</h2>
                      <p className="text-gray-300 mb-8">
                        Enter the arena to be matched with another medical student for an intense diagnostic challenge!
                      </p>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center">
                          <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-300">5 Min Battle</p>
                        </div>
                        <div className="text-center">
                          <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-300">AI Evaluation</p>
                        </div>
                        <div className="text-center">
                          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-300">Earn XP & Rank</p>
                        </div>
                      </div>
                      <Button
                        onClick={joinQueue}
                        className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-lg"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Enter Battle Arena
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <Clock className="w-12 h-12 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4">Finding Worthy Opponent...</h2>
                      <p className="text-gray-300 mb-8">
                        Searching for a medical student at your skill level. Preparing battle case...
                      </p>
                      <div className="flex justify-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Recent Battles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Recent Battle History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { opponent: 'Dr. Sarah Chen', result: 'Victory', score: '285 vs 240', case: 'Acute MI', time: '2 hours ago' },
                  { opponent: 'Dr. Mike Johnson', result: 'Defeat', score: '220 vs 275', case: 'Pneumonia', time: '1 day ago' },
                  { opponent: 'Dr. Lisa Park', result: 'Victory', score: '310 vs 290', case: 'Diabetes', time: '2 days ago' },
                  { opponent: 'Dr. Alex Kumar', result: 'Victory', score: '265 vs 235', case: 'Stroke', time: '3 days ago' }
                ].map((battle, index) => (
                  <Card key={index} className="p-4 bg-gray-800/30 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          battle.result === 'Victory' ? 'bg-green-900/30 border border-green-700/30' : 'bg-red-900/30 border border-red-700/30'
                        }`}>
                          {battle.result === 'Victory' ? (
                            <Trophy className="w-5 h-5 text-green-400" />
                          ) : (
                            <Target className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{battle.opponent}</p>
                          <p className="text-sm text-gray-400">{battle.case} • {battle.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={battle.result === 'Victory' ? 'success' : 'error'}
                          size="sm"
                        >
                          {battle.result}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-1">{battle.score}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (battleState === 'battle' && currentBattle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="ml-64 pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Battle Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Swords className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Medical Battle Arena</h1>
                    <p className="text-gray-300">{currentBattle.player1} vs {currentBattle.player2}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-mono text-lg">{formatTime(timeRemaining)}</span>
                  </div>
                  <Badge variant={currentBattle.case.difficulty === 'beginner' ? 'success' : currentBattle.case.difficulty === 'intermediate' ? 'warning' : 'error'}>
                    {currentBattle.case.difficulty}
                  </Badge>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Patient Case */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="w-6 h-6 text-red-400" />
                    <h2 className="text-xl font-semibold text-white">Battle Case</h2>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-2">Clinical Presentation</h3>
                      <p className="text-gray-300">{currentBattle.case.presentation}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Age</p>
                        <p className="text-white font-medium">{currentBattle.case.age} years</p>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Gender</p>
                        <p className="text-white font-medium">{currentBattle.case.gender}</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-300 mb-2">Chief Complaint</h4>
                      <p className="text-white">{currentBattle.case.chiefComplaint}</p>
                    </div>

                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-white mb-2">Vital Signs</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-400">BP:</span>
                          <span className="ml-2 text-white font-medium">{currentBattle.case.vitals.bp}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">HR:</span>
                          <span className="ml-2 text-white font-medium">{currentBattle.case.vitals.hr}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">RR:</span>
                          <span className="ml-2 text-white font-medium">{currentBattle.case.vitals.rr}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Temp:</span>
                          <span className="ml-2 text-white font-medium">{currentBattle.case.vitals.temp}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400">SpO2:</span>
                          <span className="ml-2 text-white font-medium">{currentBattle.case.vitals.spo2}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Investigation Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm h-full hover:bg-gray-700/50 transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Brain className="w-6 h-6 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">Clinical Investigation</h2>
                  </div>
                  
                  {/* Chat History */}
                  <div className="bg-gray-900/50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                    {playerQuestions.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">
                        Start by asking questions about the patient's history, physical exam, or order investigations.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {playerQuestions.map((question, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded-lg ${
                              question.startsWith('Patient:') 
                                ? 'bg-blue-900/30 text-blue-200' 
                                : 'bg-gray-700/50 text-white'
                            }`}
                          >
                            {question}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Question Input */}
                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && submitQuestion()}
                      placeholder="Ask about history, order tests, or examine the patient..."
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      onClick={submitQuestion}
                      disabled={!currentQuestion.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Check vital signs',
                      'Order ECG',
                      'Blood tests',
                      'Chest X-ray',
                      'Physical exam',
                      'Medical history'
                    ].map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentQuestion(action)}
                        className="text-gray-300 border-gray-600 hover:bg-gray-700"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Final Answer Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Final Battle Submission</h2>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Primary Diagnosis
                    </label>
                    <textarea
                      value={finalDiagnosis}
                      onChange={(e) => setFinalDiagnosis(e.target.value)}
                      placeholder="Enter your primary diagnosis..."
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 h-24 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Treatment Plan
                    </label>
                    <textarea
                      value={finalTreatment}
                      onChange={(e) => setFinalTreatment(e.target.value)}
                      placeholder="Enter your treatment recommendations..."
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 h-24 resize-none"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={submitFinalAnswer}
                    disabled={!finalDiagnosis.trim() || !finalTreatment.trim() || isEvaluating}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3"
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        AI Evaluating...
                      </>
                    ) : (
                      <>
                        <Trophy className="w-5 h-5 mr-2" />
                        Submit Battle Answer
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (battleState === 'results' && battleResults) {
    const isWinner = battleResults.winner === (user?.username || 'You');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="ml-64 pt-16">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-12"
            >
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 relative ${
                isWinner ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-pink-600'
              }`}>
                {isWinner ? (
                  <Trophy className="w-16 h-16 text-white" />
                ) : (
                  <Target className="w-16 h-16 text-white" />
                )}
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-yellow-900" />
                  </div>
                </div>
              </div>
              
              <h1 className={`text-5xl font-bold mb-4 ${
                isWinner ? 'text-green-400' : 'text-red-400'
              }`}>
                {isWinner ? 'VICTORY!' : 'DEFEAT'}
              </h1>
              
              <p className="text-xl text-gray-300 mb-4">
                {isWinner ? 'Outstanding clinical reasoning!' : 'Good effort! Learn from this battle.'}
              </p>
              
              <div className="flex items-center justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </motion.div>

            {/* Score Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Player Score */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className={`p-6 border-2 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-200 ${
                  isWinner ? 'bg-green-900/20 border-green-500' : 'bg-gray-800/50 border-gray-700'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user?.username || 'You'}</h3>
                      <p className="text-sm text-gray-400">Total Score: {battleResults.playerScore.totalScore}</p>
                    </div>
                    {isWinner && <Crown className="w-8 h-8 text-yellow-400" />}
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Diagnosis', score: battleResults.playerScore.diagnosisScore },
                      { label: 'Investigation', score: battleResults.playerScore.investigationScore },
                      { label: 'Treatment', score: battleResults.playerScore.treatmentScore },
                      { label: 'Reasoning', score: battleResults.playerScore.reasoningScore }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-white font-medium">{item.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">AI Feedback</h4>
                    <p className="text-sm text-gray-300">{battleResults.playerScore.feedback}</p>
                  </div>

                  <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-300 mb-2">Improvement Suggestions</h4>
                    <ul className="space-y-1">
                      {battleResults.playerScore.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-blue-200 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>

              {/* Opponent Score */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className={`p-6 border-2 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-200 ${
                  !isWinner ? 'bg-green-900/20 border-green-500' : 'bg-gray-800/50 border-gray-700'
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Dr. Challenger</h3>
                      <p className="text-sm text-gray-400">Total Score: {battleResults.opponentScore.totalScore}</p>
                    </div>
                    {!isWinner && <Crown className="w-8 h-8 text-yellow-400" />}
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Diagnosis', score: battleResults.opponentScore.diagnosisScore },
                      { label: 'Investigation', score: battleResults.opponentScore.investigationScore },
                      { label: 'Treatment', score: battleResults.opponentScore.treatmentScore },
                      { label: 'Reasoning', score: battleResults.opponentScore.reasoningScore }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-white font-medium">{item.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <motion.div
                            className="bg-gradient-to-r from-red-500 to-pink-600 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">Opponent Analysis</h4>
                    <p className="text-sm text-gray-300">{battleResults.opponentScore.feedback}</p>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center space-x-4"
            >
              <Button
                onClick={resetBattle}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Battle Again
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
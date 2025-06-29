import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Award, Search, Play, CheckCircle, AlertCircle, Heart, Brain, Baby, Stethoscope, Star, Zap, Target, Send, MessageCircle, Dna, Microscope, HeartPulse as Pulse } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { geminiAI } from '../../services/geminiAI';

interface PatientCase {
  id: number;
  title: string;
  patient: string;
  specialty: string;
  difficulty: string;
  duration: number;
  xp: number;
  description: string;
  objectives: string[];
  vitals: {
    bp: string;
    hr: string;
    rr: string;
    temp: string;
    spo2: string;
  };
  completed: boolean;
  icon: any;
  color: string;
  presentation?: string;
  correctDiagnosis?: string;
  age?: number;
  gender?: string;
  chiefComplaint?: string;
}

export const PatientCases: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<PatientCase | null>(null);
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, sender: 'user' | 'patient', message: string, timestamp: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [caseCompleted, setCaseCompleted] = useState(false);
  const [isPatientTyping, setIsPatientTyping] = useState(false);

  const [cases, setCases] = useState<PatientCase[]>([
    {
      id: 1,
      title: 'Acute Chest Pain Assessment',
      patient: 'Male, 45 years',
      specialty: 'Cardiology',
      difficulty: 'Intermediate',
      duration: 45,
      xp: 300,
      description: 'Evaluate a patient presenting with severe chest pain and shortness of breath.',
      objectives: [
        'Take comprehensive history',
        'Perform focused physical examination',
        'Order appropriate investigations',
        'Formulate differential diagnosis'
      ],
      vitals: {
        bp: '160/95',
        hr: '110',
        rr: '22',
        temp: '98.6°F',
        spo2: '96%'
      },
      completed: false,
      icon: Heart,
      color: 'blood',
      presentation: 'A 45-year-old male presents to the emergency department with severe crushing chest pain that started 2 hours ago while at work. The pain radiates to his left arm and is associated with shortness of breath and diaphoresis.',
      correctDiagnosis: 'ST-Elevation Myocardial Infarction (STEMI)',
      age: 45,
      gender: 'Male',
      chiefComplaint: 'Severe chest pain for 2 hours'
    },
    {
      id: 2,
      title: 'Pediatric Fever Evaluation',
      patient: 'Female, 6 years',
      specialty: 'Pediatrics',
      difficulty: 'Beginner',
      duration: 30,
      xp: 200,
      description: 'Assess a febrile child with irritability and decreased oral intake.',
      objectives: [
        'Pediatric history taking',
        'Age-appropriate examination',
        'Fever workup protocol',
        'Parent counseling'
      ],
      vitals: {
        bp: '90/60',
        hr: '130',
        rr: '28',
        temp: '102.5°F',
        spo2: '98%'
      },
      completed: true,
      icon: Baby,
      color: 'bio',
      presentation: 'A 6-year-old girl is brought by her mother with a 3-day history of high fever, sore throat, and difficulty swallowing. She appears ill and has enlarged cervical lymph nodes.',
      correctDiagnosis: 'Streptococcal Pharyngitis',
      age: 6,
      gender: 'Female',
      chiefComplaint: 'High fever and sore throat for 3 days'
    },
    {
      id: 3,
      title: 'Neurological Assessment',
      patient: 'Female, 32 years',
      specialty: 'Neurology',
      difficulty: 'Advanced',
      duration: 60,
      xp: 450,
      description: 'Evaluate a patient with acute onset headache and neurological symptoms.',
      objectives: [
        'Detailed neurological history',
        'Complete neurological examination',
        'Interpret neuroimaging',
        'Emergency management'
      ],
      vitals: {
        bp: '140/85',
        hr: '88',
        rr: '18',
        temp: '99.2°F',
        spo2: '99%'
      },
      completed: false,
      icon: Brain,
      color: 'neural',
      presentation: 'A 32-year-old woman presents with sudden onset severe headache, described as "the worst headache of my life," associated with nausea, vomiting, and photophobia.',
      correctDiagnosis: 'Subarachnoid Hemorrhage',
      age: 32,
      gender: 'Female',
      chiefComplaint: 'Sudden severe headache'
    },
    {
      id: 4,
      title: 'Emergency Trauma Case',
      patient: 'Male, 28 years',
      specialty: 'Emergency Medicine',
      difficulty: 'Advanced',
      duration: 40,
      xp: 400,
      description: 'Manage a multi-trauma patient in the emergency department.',
      objectives: [
        'Primary survey (ABCDE)',
        'Trauma team coordination',
        'Rapid decision making',
        'Stabilization protocols'
      ],
      vitals: {
        bp: '90/60',
        hr: '120',
        rr: '24',
        temp: '97.8°F',
        spo2: '94%'
      },
      completed: false,
      icon: Stethoscope,
      color: 'medical',
      presentation: 'A 28-year-old male arrives via ambulance following a motor vehicle accident. He is conscious but appears pale and diaphoretic with obvious deformity of the right leg.',
      correctDiagnosis: 'Polytrauma with hemorrhagic shock',
      age: 28,
      gender: 'Male',
      chiefComplaint: 'Motor vehicle accident with multiple injuries'
    }
  ]);

  const filters = [
    { id: 'all', label: 'All Cases', count: cases.length },
    { id: 'beginner', label: 'Beginner', count: cases.filter(c => c.difficulty === 'Beginner').length },
    { id: 'intermediate', label: 'Intermediate', count: cases.filter(c => c.difficulty === 'Intermediate').length },
    { id: 'advanced', label: 'Advanced', count: cases.filter(c => c.difficulty === 'Advanced').length },
    { id: 'completed', label: 'Completed', count: cases.filter(c => c.completed).length }
  ];

  const generateNewCase = async () => {
    setIsGeneratingCase(true);
    try {
      const specialties = ['Cardiology', 'Neurology', 'Pediatrics', 'Emergency Medicine', 'Internal Medicine'];
      const difficulties = ['beginner', 'intermediate', 'advanced'];
      const randomSpecialty = specialties[Math.floor(Math.random() * specialties.length)];
      const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

      const generatedCase = await geminiAI.generatePatientCase(randomSpecialty, randomDifficulty as any);
      
      const newCase: PatientCase = {
        id: cases.length + 1,
        title: generatedCase.title,
        patient: `${generatedCase.gender}, ${generatedCase.age} years`,
        specialty: randomSpecialty,
        difficulty: randomDifficulty.charAt(0).toUpperCase() + randomDifficulty.slice(1),
        duration: Math.floor(Math.random() * 30) + 30,
        xp: randomDifficulty === 'beginner' ? 200 : randomDifficulty === 'intermediate' ? 300 : 450,
        description: generatedCase.presentation,
        objectives: generatedCase.keyFindings || ['Complete patient assessment', 'Formulate diagnosis', 'Plan treatment'],
        vitals: generatedCase.vitals,
        completed: false,
        icon: Heart,
        color: 'blood',
        presentation: generatedCase.presentation,
        correctDiagnosis: generatedCase.correctDiagnosis,
        age: generatedCase.age,
        gender: generatedCase.gender,
        chiefComplaint: generatedCase.chiefComplaint
      };

      setCases([...cases, newCase]);
    } catch (error) {
      console.error('Error generating case:', error);
    } finally {
      setIsGeneratingCase(false);
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesFilter = selectedFilter === 'all' || 
                         case_.difficulty.toLowerCase() === selectedFilter ||
                         (selectedFilter === 'completed' && case_.completed);
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.specialty.toLowerCase().includes(searchTerm.toLowerCase());
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

  const getSpecialtyColor = (specialty: string) => {
    const colors: Record<string, string> = {
      'Cardiology': 'text-blood-400 bg-blood-900/20 border-blood-600/30',
      'Pediatrics': 'text-bio-400 bg-bio-900/20 border-bio-600/30',
      'Neurology': 'text-neural-400 bg-neural-900/20 border-neural-600/30',
      'Emergency Medicine': 'text-medical-400 bg-medical-900/20 border-medical-600/30',
      'Internal Medicine': 'text-oxygen-400 bg-oxygen-900/20 border-oxygen-600/30'
    };
    return colors[specialty] || 'text-bone-400 bg-bone-900/20 border-bone-600/30';
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !selectedCase) return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user' as const,
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages([...chatMessages, newMessage]);
    setCurrentMessage('');
    setIsPatientTyping(true);

    try {
      // Use Gemini AI to generate intelligent patient responses
      const patientContext = `
        Patient Information:
        - Age: ${selectedCase.age}
        - Gender: ${selectedCase.gender}
        - Chief Complaint: ${selectedCase.chiefComplaint}
        - Presentation: ${selectedCase.presentation}
        - Specialty: ${selectedCase.specialty}
        - Vitals: BP ${selectedCase.vitals.bp}, HR ${selectedCase.vitals.hr}, RR ${selectedCase.vitals.rr}, Temp ${selectedCase.vitals.temp}, SpO2 ${selectedCase.vitals.spo2}
        
        Previous conversation:
        ${chatMessages.map(msg => `${msg.sender}: ${msg.message}`).join('\n')}
        
        Doctor's question: ${currentMessage}
        
        Respond as the patient would, staying in character. Be realistic about what a patient would know and how they would describe their symptoms. If asked about medical history, medications, or family history, provide relevant information that fits the case. Keep responses conversational and authentic.
      `;

      const response = await geminiAI.generateContent({
        prompt: patientContext,
        userDomain: selectedCase.specialty,
        type: 'patient_case'
      });

      setTimeout(() => {
        const patientResponse = {
          id: chatMessages.length + 2,
          sender: 'patient' as const,
          message: response.content,
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, patientResponse]);
        setIsPatientTyping(false);
      }, 1500); // Simulate typing delay

    } catch (error) {
      console.error('Error generating patient response:', error);
      // Fallback to simple response
      setTimeout(() => {
        const fallbackResponse = {
          id: chatMessages.length + 2,
          sender: 'patient' as const,
          message: generateFallbackResponse(currentMessage, selectedCase),
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, fallbackResponse]);
        setIsPatientTyping(false);
      }, 1000);
    }
  };

  const generateFallbackResponse = (userMessage: string, case_: PatientCase): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('pain') || message.includes('hurt')) {
      if (case_.specialty === 'Cardiology') {
        return "The pain is severe, like someone is squeezing my chest. It started about 2 hours ago while I was at work. It's a crushing sensation that goes down my left arm.";
      } else if (case_.specialty === 'Neurology') {
        return "This is the worst headache I've ever had. It came on suddenly like a thunderclap. The light hurts my eyes.";
      } else {
        return "It hurts a lot. I've never felt pain like this before.";
      }
    }
    
    if (message.includes('when') || message.includes('start')) {
      return case_.specialty === 'Cardiology' 
        ? "It started suddenly about 2 hours ago while I was at my desk at work."
        : "It started suddenly this morning. I was fine yesterday.";
    }
    
    if (message.includes('medication') || message.includes('medicine')) {
      return case_.specialty === 'Cardiology'
        ? "I take medication for my blood pressure - lisinopril 10mg daily. I also take aspirin sometimes."
        : "I don't take any regular medications. Just some vitamins.";
    }
    
    if (message.includes('family') || message.includes('history')) {
      return "My father had a heart attack when he was 50. My mother has diabetes.";
    }
    
    return "Could you ask me something more specific about my symptoms?";
  };

  const submitDiagnosis = async () => {
    if (!diagnosis.trim() || !treatment.trim() || !selectedCase) return;

    try {
      const evaluation = await geminiAI.evaluateBattleSubmission(
        selectedCase.presentation || '',
        chatMessages.filter(m => m.sender === 'user').map(m => m.message),
        diagnosis,
        treatment,
        selectedCase.correctDiagnosis || ''
      );

      setCaseCompleted(true);
      console.log('Case evaluation:', evaluation);
      
    } catch (error) {
      console.error('Error evaluating case:', error);
    }
  };

  if (selectedCase) {
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
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedCase(null);
                      setChatMessages([]);
                      setDiagnosis('');
                      setTreatment('');
                      setCaseCompleted(false);
                    }}
                    className="mb-4 text-bone-300 hover:text-bio-400 hover:bg-bio-900/20"
                  >
                    ← Back to Cases
                  </Button>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-bio-400 via-medical-400 to-neural-400 bg-clip-text text-transparent mb-2">{selectedCase.title}</h1>
                  <p className="text-bone-300">{selectedCase.patient} • {selectedCase.specialty}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="info" size="sm" className="bg-medical-500/20 text-medical-400 border-medical-600/30">{selectedCase.specialty}</Badge>
                  <Badge variant={getDifficultyColor(selectedCase.difficulty) as any} size="sm">
                    {selectedCase.difficulty}
                  </Badge>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-blood-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Patient Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-bio-600/30 backdrop-blur-lg shadow-medical">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-bio-500 to-bio-600 rounded-full flex items-center justify-center border border-bio-600/30 animate-heartbeat">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Patient Information</h3>
                      <p className="text-sm text-bio-400">{selectedCase.age} years old, {selectedCase.gender}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Chief Complaint</h4>
                      <p className="text-sm text-bone-300">{selectedCase.chiefComplaint}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Presentation</h4>
                      <p className="text-sm text-bone-300">{selectedCase.presentation}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Vital Signs</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-blood-400 animate-pulse" />
                          <span className="text-bone-300">BP: {selectedCase.vitals.bp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Pulse className="w-4 h-4 text-medical-400 animate-pulse" />
                          <span className="text-bone-300">HR: {selectedCase.vitals.hr}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-neural-400" />
                          <span className="text-bone-300">Temp: {selectedCase.vitals.temp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-bio-400" />
                          <span className="text-bone-300">SpO2: {selectedCase.vitals.spo2}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Learning Objectives</h4>
                      <ul className="space-y-1">
                        {selectedCase.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start space-x-2 text-xs text-bone-300">
                            <div className="w-1.5 h-1.5 bg-bio-400 rounded-full mt-1.5 animate-pulse" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* AI-Powered Chat Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="p-6 bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-bio-600/30 backdrop-blur-lg shadow-medical h-96 flex flex-col">
                  <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-bio-600/30">
                    <MessageCircle className="w-5 h-5 text-bio-400 animate-pulse" />
                    <h3 className="text-lg font-semibold text-white">AI-Powered Patient Interview</h3>
                    <Badge variant="success" size="sm" className="bg-bio-500/20 text-bio-400 border-bio-600/30">Gemini AI</Badge>
                    <div className="ml-auto">
                      <Dna className="w-5 h-5 text-neural-400/50 animate-dna-spin" />
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-8">
                        <div className="mb-4">
                          <Microscope className="w-12 h-12 text-bio-400/50 mx-auto animate-pulse" />
                        </div>
                        <p className="text-bone-400 mb-4">Start by asking the patient about their symptoms, medical history, or current concerns.</p>
                        <div className="bg-gradient-to-r from-bio-900/20 to-medical-900/20 border border-bio-600/30 rounded-lg p-4 backdrop-blur-sm">
                          <p className="text-sm text-bio-300">
                            <strong>AI-Enhanced:</strong> This patient is powered by Gemini AI for realistic, intelligent responses based on the case scenario.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg backdrop-blur-sm ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-bio-600 to-medical-600 text-white shadow-medical'
                              : 'bg-gradient-to-r from-bone-700/50 to-bone-600/50 text-bone-100 border border-bio-600/30'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-bio-200' : 'text-bone-400'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isPatientTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gradient-to-r from-bone-700/50 to-bone-600/50 text-bone-100 border border-bio-600/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-bio-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-bio-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-bio-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isPatientTyping && handleSendMessage()}
                      placeholder="Ask the patient about their symptoms..."
                      className="flex-1 px-4 py-2 bg-bone-700/50 border border-bio-600/30 rounded-lg text-white placeholder-bone-400 focus:outline-none focus:ring-2 focus:ring-bio-500 focus:border-transparent backdrop-blur-sm"
                      disabled={isPatientTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim() || isPatientTyping}
                      className="bg-gradient-to-r from-bio-500 to-bio-600 hover:from-bio-600 hover:to-bio-700 text-white shadow-medical"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>

                {/* Diagnosis Section */}
                <Card className="p-6 bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-bio-600/30 backdrop-blur-lg shadow-medical mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Final Diagnosis & Treatment</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-bone-300 mb-2">
                        Primary Diagnosis
                      </label>
                      <textarea
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Enter your primary diagnosis..."
                        className="w-full px-4 py-3 bg-bone-700/50 border border-bio-600/30 rounded-lg text-white placeholder-bone-400 focus:outline-none focus:ring-2 focus:ring-bio-500 h-20 resize-none backdrop-blur-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-bone-300 mb-2">
                        Treatment Plan
                      </label>
                      <textarea
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        placeholder="Enter your treatment recommendations..."
                        className="w-full px-4 py-3 bg-bone-700/50 border border-bio-600/30 rounded-lg text-white placeholder-bone-400 focus:outline-none focus:ring-2 focus:ring-bio-500 h-20 resize-none backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={submitDiagnosis}
                    disabled={!diagnosis.trim() || !treatment.trim() || caseCompleted}
                    className="w-full bg-gradient-to-r from-bio-500 to-medical-600 hover:from-bio-600 hover:to-medical-700 text-white shadow-medical"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {caseCompleted ? 'Case Completed' : 'Submit Diagnosis'}
                  </Button>
                </Card>
              </motion.div>
            </div>
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
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-bio-400 via-medical-400 to-neural-400 bg-clip-text text-transparent">Patient Cases</h1>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-blood-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
                <p className="text-bone-300">Practice clinical reasoning with AI-powered virtual patient simulations</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-bone-400" />
                  <input
                    type="text"
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-bone-800/50 border border-bio-600/30 rounded-lg text-white placeholder-bone-400 focus:outline-none focus:ring-2 focus:ring-bio-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <Button
                  onClick={generateNewCase}
                  disabled={isGeneratingCase}
                  className="bg-gradient-to-r from-bio-500 to-medical-600 hover:from-bio-600 hover:to-medical-700 text-white shadow-medical"
                >
                  {isGeneratingCase ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  Generate AI Case
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
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 backdrop-blur-sm ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-bio-500 to-medical-600 text-white shadow-medical'
                      : 'bg-bone-800/50 text-bone-300 border border-bio-600/30 hover:bg-bio-900/20 hover:border-bio-500/50'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedFilter === filter.id
                      ? 'bg-white/20 text-white'
                      : 'bg-bone-700/50 text-bone-300'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCases.map((case_, index) => (
              <motion.div
                key={case_.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-bio-600/30 backdrop-blur-lg shadow-medical hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-20">
                    <Dna className="w-8 h-8 text-bio-400 animate-dna-spin" />
                  </div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${case_.color}-500 to-${case_.color}-600 border border-${case_.color}-600/30 flex items-center justify-center group-hover:animate-heartbeat shadow-${case_.color}`}>
                        <case_.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-bio-400 transition-colors">
                          {case_.title}
                        </h3>
                        <p className="text-sm text-bone-400">{case_.patient}</p>
                      </div>
                    </div>
                    {case_.completed && (
                      <CheckCircle className="w-6 h-6 text-bio-400 animate-pulse" />
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge 
                      variant={getDifficultyColor(case_.difficulty) as any}
                      size="sm"
                      className="backdrop-blur-sm"
                    >
                      {case_.difficulty}
                    </Badge>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getSpecialtyColor(case_.specialty)}`}>
                      {case_.specialty}
                    </span>
                    <div className="flex items-center space-x-1 text-bone-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{case_.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blood-400">
                      <Award className="w-4 h-4 animate-pulse" />
                      <span className="text-xs">{case_.xp} XP</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-bone-300 mb-4 text-sm">{case_.description}</p>

                  {/* Vitals */}
                  <div className="bg-gradient-to-r from-bone-700/30 to-bone-600/30 rounded-lg p-3 mb-4 border border-bio-600/30 backdrop-blur-sm">
                    <h4 className="text-sm font-medium text-white mb-2">Vital Signs</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-bone-400">BP:</span>
                        <span className="ml-1 font-medium text-bone-200">{case_.vitals.bp}</span>
                      </div>
                      <div>
                        <span className="text-bone-400">HR:</span>
                        <span className="ml-1 font-medium text-bone-200">{case_.vitals.hr}</span>
                      </div>
                      <div>
                        <span className="text-bone-400">RR:</span>
                        <span className="ml-1 font-medium text-bone-200">{case_.vitals.rr}</span>
                      </div>
                      <div>
                        <span className="text-bone-400">Temp:</span>
                        <span className="ml-1 font-medium text-bone-200">{case_.vitals.temp}</span>
                      </div>
                      <div>
                        <span className="text-bone-400">SpO2:</span>
                        <span className="ml-1 font-medium text-bone-200">{case_.vitals.spo2}</span>
                      </div>
                    </div>
                  </div>

                  {/* Objectives */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Learning Objectives</h4>
                    <ul className="space-y-1">
                      {case_.objectives.slice(0, 2).map((objective, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-bone-300">
                          <div className="w-1.5 h-1.5 bg-bio-400 rounded-full animate-pulse" />
                          <span>{objective}</span>
                        </li>
                      ))}
                      {case_.objectives.length > 2 && (
                        <li className="text-xs text-bone-500 ml-3.5">
                          +{case_.objectives.length - 2} more objectives
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => setSelectedCase(case_)}
                    className={`w-full ${case_.completed 
                      ? 'bg-gradient-to-r from-bio-500 to-bio-600 hover:from-bio-600 hover:to-bio-700 shadow-medical' 
                      : 'bg-gradient-to-r from-blood-500 to-blood-600 hover:from-blood-600 hover:to-blood-700 shadow-blood'
                    } text-white`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {case_.completed ? 'Review Case' : 'Start AI Case'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCases.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mb-4">
                <Users className="w-16 h-16 text-bone-500 mx-auto animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No cases found</h3>
              <p className="text-bone-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
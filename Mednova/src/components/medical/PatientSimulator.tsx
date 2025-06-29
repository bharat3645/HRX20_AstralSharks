import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  MessageCircle, 
  FileText, 
  Activity, 
  Clock,
  Send,
  User,
  Heart,
  Thermometer,
  Droplets,
  Star,
  Zap,
  Target,
  Brain
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const PatientSimulator: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, sender: 'user' | 'patient', message: string, timestamp: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentStep, setCurrentStep] = useState('history'); // history, examination, investigation, diagnosis

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      chiefComplaint: 'Chest pain for 2 hours',
      scenario: 'Emergency Department',
      difficulty: 'Intermediate',
      vitals: {
        bp: '160/95',
        hr: '110',
        rr: '22',
        temp: '98.6°F',
        spo2: '96%'
      },
      background: 'Hypertension, smoker, family history of CAD',
      presentation: 'Patient presents with severe crushing chest pain radiating to left arm, associated with shortness of breath and diaphoresis.',
      expectedDiagnosis: 'Acute Myocardial Infarction',
      learningObjectives: [
        'Recognize acute coronary syndrome presentation',
        'Perform focused cardiovascular examination',
        'Order appropriate cardiac investigations',
        'Initiate emergency management'
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 6,
      gender: 'Female',
      chiefComplaint: 'High fever and irritability',
      scenario: 'Pediatric Clinic',
      difficulty: 'Beginner',
      vitals: {
        bp: '90/60',
        hr: '130',
        rr: '28',
        temp: '102.5°F',
        spo2: '98%'
      },
      background: 'Previously healthy, up-to-date vaccinations',
      presentation: 'Child brought by mother with 24-hour history of high fever, decreased appetite, and increased irritability.',
      expectedDiagnosis: 'Viral Upper Respiratory Infection',
      learningObjectives: [
        'Pediatric history taking techniques',
        'Age-appropriate physical examination',
        'Fever management in children',
        'Parent education and reassurance'
      ]
    }
  ];

  const steps = [
    { id: 'history', label: 'History Taking', icon: MessageCircle },
    { id: 'examination', label: 'Physical Exam', icon: Stethoscope },
    { id: 'investigation', label: 'Investigations', icon: FileText },
    { id: 'diagnosis', label: 'Diagnosis', icon: Activity }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedPatient) return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user' as const,
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages([...chatMessages, newMessage]);

    // Simulate patient response
    setTimeout(() => {
      const patientResponse = {
        id: chatMessages.length + 2,
        sender: 'patient' as const,
        message: generatePatientResponse(currentMessage, selectedPatient),
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, patientResponse]);
    }, 1000);

    setCurrentMessage('');
  };

  const generatePatientResponse = (userMessage: string, patientId: number): string => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return "I don't understand.";

    const message = userMessage.toLowerCase();
    
    if (message.includes('pain') || message.includes('hurt')) {
      if (patient.id === 1) {
        return "The pain is severe, like someone is squeezing my chest. It started about 2 hours ago while I was at work. It's a crushing sensation that goes down my left arm.";
      } else {
        return "My chest hurts and I feel really hot. I don't want to eat anything.";
      }
    }
    
    if (message.includes('when') || message.includes('start')) {
      return patient.id === 1 
        ? "It started suddenly about 2 hours ago while I was at my desk at work."
        : "Mommy says I started feeling sick yesterday evening.";
    }
    
    if (message.includes('medication') || message.includes('medicine')) {
      return patient.id === 1
        ? "I take medication for my blood pressure - lisinopril 10mg daily. I also take aspirin sometimes."
        : "I don't take any medicines. Mommy gave me some children's Tylenol this morning.";
    }
    
    return "Could you ask me something more specific about my symptoms?";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  if (selectedPatient) {
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient) return null;

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
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedPatient(null)}
                    className="mb-4 text-gray-300 hover:text-white"
                  >
                    ← Back to Patient List
                  </Button>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">Patient Simulator</h1>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{patient.name} • {patient.scenario}</p>
                </div>
                <Badge variant={getDifficultyColor(patient.difficulty) as any}>
                  {patient.difficulty}
                </Badge>
              </div>
            </motion.div>

            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep === step.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep === step.id ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-16 h-1 mx-4 bg-gray-700 rounded-full">
                        <div className="h-1 bg-blue-600 rounded-full" style={{ width: '0%' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Patient Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-700/30">
                      <User className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                      <p className="text-sm text-gray-400">{patient.age} years old, {patient.gender}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Chief Complaint</h4>
                      <p className="text-sm text-gray-300">{patient.chiefComplaint}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Vital Signs</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span className="text-gray-300">BP: {patient.vitals.bp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">HR: {patient.vitals.hr}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-orange-400" />
                          <span className="text-gray-300">Temp: {patient.vitals.temp}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-4 h-4 text-cyan-400" />
                          <span className="text-gray-300">SpO2: {patient.vitals.spo2}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Background</h4>
                      <p className="text-sm text-gray-300">{patient.background}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">Learning Objectives</h4>
                      <ul className="space-y-1">
                        {patient.learningObjectives.map((objective, index) => (
                          <li key={index} className="flex items-start space-x-2 text-xs text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Chat Interface */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm h-96 flex flex-col">
                  <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Patient Interview</h3>
                    <Badge variant="info" size="sm">{currentStep}</Badge>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">Start by introducing yourself and asking about the patient's symptoms.</p>
                        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                          <p className="text-sm text-blue-300">
                            <strong>Tip:</strong> Begin with open-ended questions like "Can you tell me about your symptoms?" or "When did this start?"
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
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700/50 text-gray-100'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your question or examination finding..."
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'Order ECG',
                    'Check Blood Pressure',
                    'Listen to Heart',
                    'Examine Chest',
                    'Order Blood Tests',
                    'Request X-ray',
                    'Assess Pain Scale',
                    'Check Reflexes'
                  ].map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        setCurrentMessage(`I would like to ${action.toLowerCase()}`);
                      }}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>
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
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Stethoscope className="w-8 h-8 text-blue-400" />
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Patient Simulator</h1>
              <p className="text-gray-300">Practice clinical skills with virtual patients</p>
            </div>
          </motion.div>

          {/* Patient Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {patients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-700/30">
                          <User className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                          <p className="text-sm text-gray-400">{patient.age} years old, {patient.gender}</p>
                        </div>
                      </div>
                      <Badge variant={getDifficultyColor(patient.difficulty) as any} size="sm">
                        {patient.difficulty}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Chief Complaint</h4>
                      <p className="text-sm text-gray-300">{patient.chiefComplaint}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Scenario</h4>
                      <p className="text-sm text-gray-300">{patient.scenario}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-white mb-2">Presentation</h4>
                      <p className="text-sm text-gray-300">{patient.presentation}</p>
                    </div>

                    <Button
                      onClick={() => setSelectedPatient(patient.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Start Consultation
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
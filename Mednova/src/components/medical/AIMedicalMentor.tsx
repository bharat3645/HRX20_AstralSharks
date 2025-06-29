import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MessageCircle, 
  Send, 
  Lightbulb, 
  BookOpen, 
  Target,
  Sparkles,
  Star,
  History,
  Settings,
  Zap,
  Loader2,
  Bot,
  User as UserIcon,
  Heart,
  Stethoscope,
  Microscope,
  Activity
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { geminiAI } from '../../services/geminiAI';
import { useMedicalStore } from '../../store/medicalStore';

interface ChatMessage {
  id: number;
  sender: 'user' | 'mentor';
  message: string;
  timestamp: string;
  mentorId?: number;
  isTyping?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  mentorId: number;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
}

export const AIMedicalMentor: React.FC = () => {
  const { selectedDomain } = useMedicalStore();
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [currentMode, setCurrentMode] = useState<'chat' | 'history' | 'settings'>('chat');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Cardiology Basics',
      mentorId: 1,
      lastMessage: 'Great question about ECG interpretation!',
      timestamp: '2 hours ago',
      messageCount: 15
    },
    {
      id: '2',
      title: 'Pharmacology Help',
      mentorId: 2,
      lastMessage: 'Remember the mechanism of ACE inhibitors...',
      timestamp: '1 day ago',
      messageCount: 8
    },
    {
      id: '3',
      title: 'Emergency Protocols',
      mentorId: 2,
      lastMessage: 'ABCDE approach is crucial in trauma cases.',
      timestamp: '3 days ago',
      messageCount: 22
    }
  ]);

  const mentors = [
    {
      id: 1,
      name: 'Dr. Clara',
      specialty: 'Internal Medicine',
      personality: 'Empathetic & Encouraging',
      description: 'Supportive mentor who helps build confidence and provides gentle guidance through complex medical concepts.',
      avatar: '👩‍⚕️',
      color: 'blue',
      strengths: ['Patient care', 'Clinical reasoning', 'Emotional support'],
      greeting: "Hello! I'm Dr. Clara, your supportive medical mentor. I'm here to help you navigate the complexities of internal medicine with patience and understanding. What would you like to explore today?",
      modes: ['Study Support', 'Case Discussion', 'Exam Prep', 'Career Guidance'],
      systemPrompt: "You are Dr. Clara, an empathetic and encouraging internal medicine mentor. You provide supportive guidance with patience and understanding. Use encouraging language, break down complex concepts into digestible parts, and always validate the student's efforts while gently correcting misconceptions."
    },
    {
      id: 2,
      name: 'Dr. Pulse',
      specialty: 'Emergency Medicine',
      personality: 'Direct & Energetic',
      description: 'High-energy mentor focused on rapid decision-making and emergency protocols.',
      avatar: '⚡',
      color: 'red',
      strengths: ['Emergency protocols', 'Quick thinking', 'Practical skills'],
      greeting: "Ready for action! I'm Dr. Pulse, your emergency medicine mentor. Let's dive into high-stakes medical scenarios and sharpen your rapid decision-making skills!",
      modes: ['Emergency Cases', 'Rapid Assessment', 'Protocol Review', 'Simulation Training'],
      systemPrompt: "You are Dr. Pulse, a direct and energetic emergency medicine mentor. You focus on rapid decision-making, emergency protocols, and practical skills. Use concise, action-oriented language and emphasize time-critical thinking and systematic approaches to emergency care."
    },
    {
      id: 3,
      name: 'Dr. Sage',
      specialty: 'Medical Research',
      personality: 'Analytical & Thorough',
      description: 'Research-focused mentor who emphasizes evidence-based medicine and critical analysis.',
      avatar: '🔬',
      color: 'purple',
      strengths: ['Research methods', 'Evidence analysis', 'Critical thinking'],
      greeting: "Greetings! I'm Dr. Sage, your research-oriented mentor. Let's explore the fascinating world of medical research and evidence-based practice together.",
      modes: ['Research Methods', 'Literature Review', 'Statistical Analysis', 'Publication Writing'],
      systemPrompt: "You are Dr. Sage, an analytical and thorough medical research mentor. You emphasize evidence-based medicine, critical analysis, and research methodology. Use precise language, cite evidence when appropriate, and encourage systematic thinking and scientific rigor."
    },
    {
      id: 4,
      name: 'Dr. Heart',
      specialty: 'Cardiology',
      personality: 'Precise & Methodical',
      description: 'Cardiology specialist who focuses on cardiovascular medicine and diagnostic precision.',
      avatar: '❤️',
      color: 'pink',
      strengths: ['Cardiology', 'Diagnostics', 'Precision medicine'],
      greeting: "Welcome! I'm Dr. Heart, your cardiology mentor. Let's explore the intricacies of the cardiovascular system and master the art of cardiac care.",
      modes: ['ECG Interpretation', 'Cardiac Pathology', 'Interventional Cardiology', 'Heart Failure Management'],
      systemPrompt: "You are Dr. Heart, a precise and methodical cardiology mentor. You focus on cardiovascular medicine and diagnostic precision. Use detailed explanations about cardiac physiology, emphasize systematic approaches to cardiac assessment, and provide specific guidance on cardiovascular conditions."
    }
  ];

  const quickTopics = [
    'Explain differential diagnosis approach',
    'Help with pharmacology concepts',
    'Review anatomy and physiology',
    'Discuss clinical case scenarios',
    'Study tips and techniques',
    'Medical ethics guidance',
    'Research methodology help',
    'Career advice in medicine'
  ];

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !selectedMentor || isGenerating) return;

    const mentor = mentors.find(m => m.id === selectedMentor);
    if (!mentor) return;

    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString(),
      mentorId: selectedMentor
    };

    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setIsGenerating(true);

    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: chatMessages.length + 2,
      sender: 'mentor',
      message: '',
      timestamp: new Date().toLocaleTimeString(),
      mentorId: selectedMentor,
      isTyping: true
    };
    setChatMessages(prev => [...prev, typingMessage]);

    try {
      // Build context from previous messages
      const conversationContext = chatMessages
        .filter(msg => !msg.isTyping)
        .slice(-5) // Last 5 messages for context
        .map(msg => `${msg.sender}: ${msg.message}`)
        .join('\n');

      // Create enhanced prompt with mentor personality and context
      const enhancedPrompt = `
${mentor.systemPrompt}

CONVERSATION CONTEXT:
${conversationContext}

CURRENT STUDENT QUESTION: ${currentMessage}

MEDICAL DOMAIN: ${selectedDomain?.name || 'General Medicine'}
MENTOR SPECIALTY: ${mentor.specialty}
MENTOR PERSONALITY: ${mentor.personality}

Please respond as ${mentor.name} would, maintaining your personality and expertise. Provide helpful, accurate medical guidance while staying in character. Keep responses conversational but informative, and always prioritize patient safety and evidence-based medicine.
`;

      const response = await geminiAI.generateContent({
        prompt: enhancedPrompt,
        userDomain: selectedDomain?.slug || 'medical',
        type: 'mentor_chat'
      });

      // Remove typing indicator and add actual response
      setChatMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: prev.length + 1,
          sender: 'mentor',
          message: response.content,
          timestamp: new Date().toLocaleTimeString(),
          mentorId: selectedMentor
        }];
      });

    } catch (error) {
      console.error('Error generating mentor response:', error);
      
      // Remove typing indicator and add fallback response
      setChatMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, {
          id: prev.length + 1,
          sender: 'mentor',
          message: "I apologize, but I'm having trouble connecting right now. Let me try to help you with a general response based on my medical knowledge. Could you please rephrase your question?",
          timestamp: new Date().toLocaleTimeString(),
          mentorId: selectedMentor
        }];
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const startNewChat = () => {
    setChatMessages([]);
    setCurrentMode('chat');
  };

  const loadChatSession = (session: ChatSession) => {
    // Simulate loading chat history
    const mockMessages: ChatMessage[] = [
      {
        id: 1,
        sender: 'mentor',
        message: mentors.find(m => m.id === session.mentorId)?.greeting || "Hello!",
        timestamp: '10:30 AM',
        mentorId: session.mentorId
      },
      {
        id: 2,
        sender: 'user',
        message: 'Can you help me understand cardiac physiology?',
        timestamp: '10:32 AM',
        mentorId: session.mentorId
      },
      {
        id: 3,
        sender: 'mentor',
        message: session.lastMessage,
        timestamp: '10:35 AM',
        mentorId: session.mentorId
      }
    ];
    setChatMessages(mockMessages);
    setSelectedMentor(session.mentorId);
    setCurrentMode('chat');
  };

  const handleQuickTopic = async (topic: string) => {
    setCurrentMessage(topic);
    // Auto-send the message
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  if (selectedMentor) {
    const mentor = mentors.find(m => m.id === selectedMentor);
    if (!mentor) return null;

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
                    onClick={() => setSelectedMentor(null)}
                    className="mb-4 text-gray-300 hover:text-white"
                  >
                    ← Back to Mentors
                  </Button>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{mentor.avatar}</div>
                    <div>
                      <h1 className="text-3xl font-bold text-white">{mentor.name}</h1>
                      <p className="text-gray-300">{mentor.specialty} • {mentor.personality}</p>
                    </div>
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
                </div>
                <Badge variant="info">{mentor.specialty}</Badge>
              </div>
            </motion.div>

            {/* Mode Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex space-x-4">
                {[
                  { id: 'chat', label: 'AI Chat', icon: MessageCircle },
                  { id: 'history', label: 'Chat History', icon: History },
                  { id: 'settings', label: 'Mentor Modes', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentMode(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentMode === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {currentMode === 'chat' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Mentor Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-4">{mentor.avatar}</div>
                      <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
                      <p className="text-sm text-gray-400">{mentor.specialty}</p>
                      <div className="mt-2">
                        <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI Enhanced
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Personality</h4>
                        <p className="text-sm text-gray-300">{mentor.personality}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Strengths</h4>
                        <div className="space-y-1">
                          {mentor.strengths.map((strength, index) => (
                            <Badge key={index} variant="info" size="sm" className="mr-1 mb-1">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Quick Topics</h4>
                        <div className="space-y-2">
                          {quickTopics.slice(0, 4).map((topic, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickTopic(topic)}
                              className="w-full text-left text-xs text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 p-2 rounded transition-colors"
                              disabled={isGenerating}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={startNewChat}
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        New Chat
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                {/* Enhanced Chat Interface */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-3"
                >
                  <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm h-96 flex flex-col">
                    <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">Real-time AI Chat with {mentor.name}</h3>
                      <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Bot className="w-3 h-3 mr-1" />
                        Gemini AI
                      </Badge>
                      {isGenerating && (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                          <span className="text-xs text-blue-400">Thinking...</span>
                        </div>
                      )}
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {chatMessages.length === 0 && (
                        <div className="flex justify-start">
                          <div className="max-w-md bg-gray-700/50 text-gray-100 px-4 py-3 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg">{mentor.avatar}</span>
                              <span className="text-sm font-medium">{mentor.name}</span>
                              <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                                AI
                              </Badge>
                            </div>
                            <p className="text-sm">{mentor.greeting}</p>
                          </div>
                        </div>
                      )}
                      
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-md px-4 py-3 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700/50 text-gray-100'
                            }`}
                          >
                            {msg.sender === 'mentor' && (
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-lg">{mentor.avatar}</span>
                                <span className="text-sm font-medium">{mentor.name}</span>
                                <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                                  AI
                                </Badge>
                              </div>
                            )}
                            {msg.sender === 'user' && (
                              <div className="flex items-center space-x-2 mb-2">
                                <UserIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">You</span>
                              </div>
                            )}
                            
                            {msg.isTyping ? (
                              <div className="flex items-center space-x-1">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                                <span className="text-xs text-gray-400 ml-2">AI is thinking...</span>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                <p className={`text-xs mt-2 ${
                                  msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                                }`}>
                                  {msg.timestamp}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Message Input */}
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleSendMessage()}
                          placeholder={`Ask ${mentor.name} anything about medicine...`}
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={isGenerating}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!currentMessage.trim() || isGenerating}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {isGenerating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      {/* AI Status Indicator */}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span>Powered by Gemini AI • Real-time responses</span>
                        </div>
                        <span>{chatMessages.filter(m => !m.isTyping).length} messages</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            )}

            {currentMode === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-6">Chat History with {mentor.name}</h3>
                  <div className="space-y-4">
                    {chatSessions
                      .filter(session => session.mentorId === selectedMentor)
                      .map((session) => (
                        <div
                          key={session.id}
                          onClick={() => loadChatSession(session)}
                          className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-medium">{session.title}</h4>
                              <p className="text-sm text-gray-400 mt-1">{session.lastMessage}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400">{session.timestamp}</p>
                              <p className="text-xs text-gray-500">{session.messageCount} messages</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {currentMode === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-6">{mentor.name}'s Specialized Modes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentor.modes.map((mode, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 cursor-pointer transition-colors border border-gray-600 hover:border-blue-500"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{mode}</h4>
                            <p className="text-sm text-gray-400">AI-powered specialized guidance</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Enhanced Suggested Questions */}
            {currentMode === 'chat' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-semibold text-white">AI-Powered Quick Topics</h3>
                    <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Intelligent Suggestions
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickTopics.map((topic, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left justify-start h-auto py-3 border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => handleQuickTopic(topic)}
                        disabled={isGenerating}
                      >
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
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
                <Brain className="w-8 h-8 text-purple-400" />
                <Bot className="w-6 h-6 text-green-400" />
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">AI Medical Mentors</h1>
              <p className="text-gray-300 mb-4">Get personalized guidance from specialized AI medical mentors</p>
              <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Gemini AI • Real-time Intelligence
              </Badge>
            </div>
          </motion.div>

          {/* Enhanced Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant="success" size="sm" className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Bot className="w-3 h-3 mr-1" />
                      AI
                    </Badge>
                  </div>
                  
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl">{mentor.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{mentor.specialty}</p>
                      <Badge variant="info" size="sm">{mentor.personality}</Badge>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{mentor.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">AI Specializes in:</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.strengths.map((strength, index) => (
                        <Badge key={index} variant="default" size="sm">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-2">Available AI Modes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.modes.slice(0, 2).map((mode, index) => (
                        <Badge key={index} variant="info" size="sm">
                          {mode}
                        </Badge>
                      ))}
                      {mentor.modes.length > 2 && (
                        <Badge variant="default" size="sm">
                          +{mentor.modes.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedMentor(mentor.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Start AI Conversation
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Advanced AI Medical Mentorship</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Bot,
                  title: 'Real-time AI Responses',
                  description: 'Powered by Gemini AI for intelligent, contextual medical guidance and instant responses.',
                  color: 'green'
                },
                {
                  icon: Brain,
                  title: 'Personalized Learning',
                  description: 'AI adapts to your learning style and provides customized medical education experiences.',
                  color: 'purple'
                },
                {
                  icon: Sparkles,
                  title: 'Advanced Medical Knowledge',
                  description: 'Access cutting-edge medical information with evidence-based AI recommendations.',
                  color: 'blue'
                }
              ].map((feature, index) => (
                <Card key={index} className="p-6 text-center bg-gray-800/30 border-gray-700">
                  <div className={`w-16 h-16 rounded-xl bg-${feature.color}-900/30 border border-${feature.color}-700 flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
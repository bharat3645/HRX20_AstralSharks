import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Domain } from '../../types';
import { domains } from '../../data/domains';
import { DomainSelector } from '../domain/DomainSelector';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface OnboardingFlowProps {
  onComplete: (selectedDomain: Domain, username: string) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [username, setUsername] = useState('');

  const steps = [
    {
      title: "Welcome to AI Companion Quest!",
      subtitle: "Your personalized learning adventure awaits",
      component: <WelcomeStep />
    },
    {
      title: "Choose Your Learning Domain",
      subtitle: "Select the field you want to master",
      component: (
        <DomainSelector
          domains={domains}
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
          title="What would you like to learn?"
          subtitle="Choose your domain to get personalized quests, projects, and AI mentorship"
        />
      )
    },
    {
      title: "Create Your Profile",
      subtitle: "Tell us a bit about yourself",
      component: (
        <ProfileStep
          username={username}
          setUsername={setUsername}
          selectedDomain={selectedDomain}
        />
      )
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return selectedDomain !== null;
      case 2: return username.trim().length >= 3;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (selectedDomain && username) {
      onComplete(selectedDomain, username);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            icon={ArrowLeft}
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            icon={ArrowRight}
            iconPosition="right"
          >
            {currentStep === steps.length - 1 ? 'Start Learning' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const WelcomeStep: React.FC = () => (
  <div className="text-center">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
    >
      <Sparkles className="w-12 h-12 text-white" />
    </motion.div>
    
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-5xl font-bold text-white mb-6"
    >
      Welcome to AI Companion Quest!
    </motion.h1>
    
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
    >
      Embark on a personalized learning journey powered by AI. Master any field through 
      gamified quests, interactive projects, and intelligent mentorship.
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {[
        { icon: '🎯', title: 'Personalized Learning', desc: 'AI-powered quests tailored to your goals' },
        { icon: '🏆', title: 'Gamified Progress', desc: 'Earn XP, level up, and track your journey' },
        { icon: '🤖', title: 'AI Mentorship', desc: 'Get guidance from specialized AI companions' }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <Card className="p-6 text-center">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

interface ProfileStepProps {
  username: string;
  setUsername: (username: string) => void;
  selectedDomain: Domain | null;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ username, setUsername, selectedDomain }) => (
  <div className="max-w-2xl mx-auto">
    <Card className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Create Your Profile</h2>
        <p className="text-gray-400">
          You've chosen <span className="text-blue-400 font-semibold">{selectedDomain?.name}</span>. 
          Now let's set up your learning profile.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Choose a username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            minLength={3}
            maxLength={20}
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 3 characters long
          </p>
        </div>

        {selectedDomain && (
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Your Learning Path</h3>
            <p className="text-gray-400 mb-3">{selectedDomain.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedDomain.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  </div>
);
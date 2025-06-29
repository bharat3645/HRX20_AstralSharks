import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Stethoscope, Activity, Brain, CheckCircle, Dna, Heart, Microscope } from 'lucide-react';
import { MedicalDomain } from '../../types/medical';
import { medicalDomains } from '../../data/medicalDomains';
import { MedicalDomainSelector } from './MedicalDomainSelector';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SkeletonDancer } from '../ui/SkeletonDancer';
import { FloatingElements } from '../ui/FloatingElements';
import { PulsingOrb } from '../ui/PulsingOrb';
import { InteractiveButton } from '../ui/InteractiveButton';
import { HoverEffects } from '../ui/HoverEffects';

interface MedicalOnboardingProps {
  onComplete: (selectedDomain: MedicalDomain, username: string) => void;
}

export const MedicalOnboarding: React.FC<MedicalOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState<MedicalDomain | null>(null);
  const [username, setUsername] = useState('');

  const steps = [
    {
      title: "Welcome to MedNOVA",
      subtitle: "Your intelligent medical learning companion",
      component: <WelcomeStep />
    },
    {
      title: "Choose Your Medical Specialty",
      subtitle: "Select your area of focus for personalized learning",
      component: (
        <MedicalDomainSelector
          domains={medicalDomains}
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
          title="What medical field interests you?"
          subtitle="Choose your specialty to get personalized cases, flashcards, and AI mentorship"
        />
      )
    },
    {
      title: "Create Your Medical Profile",
      subtitle: "Set up your learning identity",
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
    <div className="min-h-screen bg-gradient-to-br from-bone-950 via-bone-900 to-bone-950 flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
      {/* Floating background elements */}
      <FloatingElements count={15} className="opacity-20" />
      
      {/* Dancing skeletons in corners */}
      <div className="absolute top-8 left-8">
        <SkeletonDancer size="lg" color="text-bio-400/30" />
      </div>
      <div className="absolute top-8 right-8">
        <SkeletonDancer size="md" color="text-neural-400/20" />
      </div>
      <div className="absolute bottom-8 left-8">
        <SkeletonDancer size="sm" color="text-blood-400/30" />
      </div>
      <div className="absolute bottom-8 right-8">
        <SkeletonDancer size="md" color="text-medical-400/20" />
      </div>
      
      {/* Pulsing orbs */}
      <div className="absolute top-1/4 left-1/4">
        <PulsingOrb size="sm" color="bio" intensity="low" />
      </div>
      <div className="absolute top-3/4 right-1/4">
        <PulsingOrb size="md" color="medical" intensity="medium" />
      </div>
      
      <div className="w-full max-w-7xl relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-lg relative ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-bio-500 to-medical-600 text-white shadow-bio' 
                      : 'bg-bone-800/50 text-bone-400 border border-bone-600/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={index === currentStep ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: index === currentStep ? Infinity : 0
                  }}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5 animate-pulse" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                  
                  {/* Dancing mini skeleton for current step */}
                  {index === currentStep && (
                    <div className="absolute -top-2 -right-2">
                      <SkeletonDancer size="sm" color="text-bio-400/50" />
                    </div>
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div 
                    className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                      index < currentStep ? 'bg-gradient-to-r from-bio-500 to-medical-600' : 'bg-bone-700/50'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-bone-300 font-medium">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
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
            className="text-bone-400 hover:text-bio-400 hover:bg-bio-900/20"
          >
            Previous
          </Button>

          <InteractiveButton
            onClick={handleNext}
            disabled={!canProceed()}
            variant={currentStep === steps.length - 1 ? "magical" : "primary"}
          >
            {currentStep === steps.length - 1 ? 'Begin Medical Journey' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
};

const WelcomeStep: React.FC = () => (
  <div className="text-center max-w-4xl mx-auto">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
      className="relative w-32 h-32 mx-auto mb-8"
    >
      <motion.div 
        className="w-32 h-32 bg-gradient-to-br from-bio-500 to-medical-600 rounded-full flex items-center justify-center shadow-bio"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Stethoscope className="w-16 h-16 text-white" />
      </motion.div>
      
      {/* Dancing skeletons around main icon */}
      <motion.div 
        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blood-500 to-blood-600 rounded-full flex items-center justify-center shadow-glow-sm"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity
        }}
      >
        <Dna className="w-4 h-4 text-white" />
      </motion.div>
      
      <motion.div 
        className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-neural-500 to-neural-600 rounded-full flex items-center justify-center shadow-glow-sm"
        animate={{ 
          y: [0, -5, 0],
          rotate: [0, -180, 0]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity
        }}
      >
        <Microscope className="w-3 h-3 text-white" />
      </motion.div>
      
      {/* Floating skeleton */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <SkeletonDancer size="sm" color="text-bio-400/50" />
      </div>
    </motion.div>
    
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-bold bg-gradient-to-r from-bio-400 via-medical-400 to-neural-400 bg-clip-text text-transparent mb-6"
    >
      Welcome to MedNOVA
    </motion.h1>
    
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-xl text-bone-300 max-w-3xl mx-auto mb-12"
    >
      Advance your medical knowledge through AI-powered learning, interactive patient simulations, 
      and personalized study plans designed for medical students and healthcare professionals.
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        { 
          icon: Activity, 
          title: 'Patient Simulations', 
          desc: 'Practice with AI-powered virtual patients and clinical cases',
          color: 'blood',
          gradient: 'from-blood-500 to-blood-600'
        },
        { 
          icon: Brain, 
          title: 'Smart Learning', 
          desc: 'Adaptive flashcards and personalized study recommendations',
          color: 'bio',
          gradient: 'from-bio-500 to-bio-600'
        },
        { 
          icon: Stethoscope, 
          title: 'AI Mentorship', 
          desc: 'Get guidance from specialized medical AI companions',
          color: 'neural',
          gradient: 'from-neural-500 to-neural-600'
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <HoverEffects effect="float">
            <Card className={`p-6 text-center bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-${feature.color}-600/30 hover:border-${feature.color}-500/50 transition-all duration-300 backdrop-blur-lg shadow-${feature.color} group relative overflow-hidden`}>
              {/* Mini dancing skeleton */}
              <div className="absolute top-2 right-2">
                <SkeletonDancer size="sm" color={`text-${feature.color}-400/30`} />
              </div>
              
              <motion.div 
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-4 shadow-glow-sm`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, 0],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-bone-300">{feature.desc}</p>
            </Card>
          </HoverEffects>
        </motion.div>
      ))}
    </div>
  </div>
);

interface ProfileStepProps {
  username: string;
  setUsername: (username: string) => void;
  selectedDomain: MedicalDomain | null;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ username, setUsername, selectedDomain }) => (
  <div className="max-w-2xl mx-auto">
    <HoverEffects effect="glow">
      <Card className="p-8 bg-gradient-to-br from-bone-800/50 to-bone-700/50 border-bio-600/30 backdrop-blur-lg shadow-medical relative overflow-hidden">
        {/* Dancing skeletons */}
        <div className="absolute top-4 right-4">
          <SkeletonDancer size="md" color="text-bio-400/30" />
        </div>
        <div className="absolute bottom-4 left-4">
          <SkeletonDancer size="sm" color="text-neural-400/20" />
        </div>
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              <Heart className="w-6 h-6 text-blood-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Create Your Medical Profile</h2>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity
              }}
            >
              <Dna className="w-6 h-6 text-bio-400" />
            </motion.div>
          </div>
          <p className="text-bone-300">
            You've chosen <span className="text-bio-400 font-bold">{selectedDomain?.name}</span>. 
            Now let's set up your medical learning profile.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">
              Choose your medical username
            </label>
            <motion.input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username (e.g., MedStudent2024)"
              className="w-full px-4 py-3 bg-bone-700/50 border border-bio-600/30 rounded-lg text-white placeholder-bone-400 focus:outline-none focus:ring-2 focus:ring-bio-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              minLength={3}
              maxLength={20}
              whileFocus={{ scale: 1.02 }}
            />
            <p className="text-xs text-bone-400 mt-1 font-medium">
              Must be at least 3 characters long
            </p>
          </div>

          {selectedDomain && (
            <HoverEffects effect="sparkle">
              <div className="bg-gradient-to-r from-bio-900/20 to-medical-900/20 rounded-lg p-6 border border-bio-600/30 backdrop-blur-sm relative overflow-hidden">
                {/* Mini dancing skeleton */}
                <div className="absolute top-2 right-2">
                  <SkeletonDancer size="sm" color="text-medical-400/30" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">Your Medical Specialty</h3>
                <p className="text-bone-300 mb-4">{selectedDomain.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDomain.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-bio-500/20 text-bio-400 rounded-full text-sm border border-bio-600/30 font-medium backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                <div className="p-3 bg-gradient-to-r from-medical-900/20 to-bio-900/20 rounded-lg border border-medical-600/30 backdrop-blur-sm">
                  <p className="text-sm text-medical-300 font-medium">
                    <strong>Specialty Area:</strong> {selectedDomain.specialty}
                  </p>
                </div>
              </div>
            </HoverEffects>
          )}
        </div>
      </Card>
    </HoverEffects>
  </div>
);
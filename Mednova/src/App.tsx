import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useMedicalStore } from './store/medicalStore';
import { medicalDomains } from './data/medicalDomains';
import { MedicalNavbar } from './components/layout/MedicalNavbar';
import { MedicalSidebar } from './components/layout/MedicalSidebar';
import { MedicalOnboarding } from './components/medical/MedicalOnboarding';
import { EnhancedMedicalDashboard } from './components/medical/EnhancedMedicalDashboard';
import { PatientCases } from './components/medical/PatientCases';
import { MedicalFlashcards } from './components/medical/MedicalFlashcards';
import { PatientSimulator } from './components/medical/PatientSimulator';
import { MedBattle } from './components/medical/MedBattle';
import { AIMedicalMentor } from './components/medical/AIMedicalMentor';
import { StudyJournal } from './components/medical/StudyJournal';
import { MedicalProfile } from './components/medical/MedicalProfile';
import { MedicalDomain } from './types/medical';

function App() {
  const { user, selectedDomain, setUser, setSelectedDomain, setDomains } = useMedicalStore();
  const [isOnboarding, setIsOnboarding] = useState(!user);

  useEffect(() => {
    // Initialize domains
    setDomains(medicalDomains);
    
    // Check for existing user session
    const savedUser = localStorage.getItem('medicalUser');
    const savedDomain = localStorage.getItem('selectedMedicalDomain');
    
    if (savedUser && savedDomain) {
      setUser(JSON.parse(savedUser));
      setSelectedDomain(JSON.parse(savedDomain));
      setIsOnboarding(false);
    }
  }, [setUser, setSelectedDomain, setDomains]);

  // Watch for user changes to update onboarding state
  useEffect(() => {
    setIsOnboarding(!user);
  }, [user]);

  const handleOnboardingComplete = (domain: MedicalDomain, username: string) => {
    const newUser = {
      id: crypto.randomUUID(),
      email: `${username}@mednova.com`,
      username,
      domain,
      level: 5,
      xp: 2450,
      streak: 1,
      rank: 'Resident' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setUser(newUser);
    setSelectedDomain(domain);
    
    // Save to localStorage (in a real app, this would be saved to Supabase)
    localStorage.setItem('medicalUser', JSON.stringify(newUser));
    localStorage.setItem('selectedMedicalDomain', JSON.stringify(domain));
    
    setIsOnboarding(false);
  };

  if (isOnboarding) {
    return <MedicalOnboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark-medical">
        <MedicalNavbar />
        <MedicalSidebar />
        
        <main>
          <Routes>
            <Route path="/" element={<EnhancedMedicalDashboard />} />
            <Route path="/cases" element={<PatientCases />} />
            <Route path="/flashcards" element={<MedicalFlashcards />} />
            <Route path="/simulator" element={<PatientSimulator />} />
            <Route path="/battle" element={<MedBattle />} />
            <Route path="/mentor" element={<AIMedicalMentor />} />
            <Route path="/journal" element={<StudyJournal />} />
            <Route path="/profile" element={<MedicalProfile />} />
            <Route path="/settings" element={<div className="ml-64 pt-16 p-8 text-center text-gray-400">Settings coming soon...</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#f3f4f6',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              backdropFilter: 'blur(16px)'
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;
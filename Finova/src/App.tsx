import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AIMentor } from './components/AIMentor/AIMentor';
import { ScenarioSimulator } from './components/Scenarios/ScenarioSimulator';
import { SkillTreeBuilder } from './components/SkillTree/SkillTreeBuilder';
import { FlashcardVault } from './components/Flashcards/FlashcardVault';
import { CampaignBuilder } from './components/Campaigns/CampaignBuilder';
import { EquationTrainer } from './components/Equations/EquationTrainer';
import { Profile } from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="mentor" element={<AIMentor />} />
            <Route path="scenarios" element={<ScenarioSimulator />} />
            <Route path="skill-tree" element={<SkillTreeBuilder />} />
            <Route path="flashcards" element={<FlashcardVault />} />
            <Route path="campaigns" element={<CampaignBuilder />} />
            <Route path="equations" element={<EquationTrainer />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
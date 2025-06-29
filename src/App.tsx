import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import { DomainSelector } from './components/DomainSelector';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';

function App() {
  const { 
    user, 
    isAuthenticated, 
    selectedDomain, 
    login, 
    logout, 
    setDomain 
  } = useAuthStore();

  const handleDomainSelect = (domain: string) => {
    setDomain(domain);
  };

  const handleLogin = async (credentials: { username: string; password: string; domain: string }) => {
    return await login(credentials);
  };

  const handleLogout = () => {
    logout();
  };

  const handleBackToDomains = () => {
    setDomain(null);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {isAuthenticated && user ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard user={user} onLogout={handleLogout} />
          </motion.div>
        ) : selectedDomain ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <LoginForm
              domain={selectedDomain}
              onLogin={handleLogin}
              onBack={handleBackToDomains}
            />
          </motion.div>
        ) : (
          <motion.div
            key="domain-selector"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <DomainSelector
              onDomainSelect={handleDomainSelect}
              selectedDomain={selectedDomain}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
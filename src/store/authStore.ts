import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  domain: string;
  level: number;
  xp: number;
  streak: number;
  avatar: string;
  mood: 'calm' | 'focused' | 'excited' | 'stressed';
  theme: 'cyber' | 'zen' | 'neon';
  specialization?: string;
  achievements?: string[];
  joinDate: string;
  lastActive: string;
  coursesCompleted: number;
  studyHours: number;
  rank: string;
  nextLevelXP: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  selectedDomain: string | null;
  login: (credentials: { username: string; password: string; domain: string }) => Promise<boolean>;
  logout: () => void;
  setDomain: (domain: string | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

// Enhanced mock user database with realistic data including Finance domain
const mockUsers: Record<string, { username: string; password: string; userData: User }[]> = {
  tech: [
    {
      username: 'alexcode',
      password: 'dev2024',
      userData: {
        id: '1',
        username: 'alexcode',
        email: 'alex@mentoro.ai',
        domain: 'tech',
        level: 28,
        xp: 15420,
        nextLevelXP: 16000,
        streak: 47,
        avatar: '👨‍💻',
        mood: 'focused',
        theme: 'cyber',
        specialization: 'Full Stack Development',
        achievements: ['Code Warrior', 'Bug Hunter', 'Stack Master', 'AI Pioneer', 'Open Source Hero'],
        joinDate: '2023-03-15',
        lastActive: '2024-01-15',
        coursesCompleted: 23,
        studyHours: 340,
        rank: 'Senior Developer'
      }
    },
    {
      username: 'sarah_dev',
      password: 'frontend123',
      userData: {
        id: '2',
        username: 'sarah_dev',
        email: 'sarah@mentoro.ai',
        domain: 'tech',
        level: 19,
        xp: 8750,
        nextLevelXP: 9500,
        streak: 23,
        avatar: '👩‍💻',
        mood: 'excited',
        theme: 'neon',
        specialization: 'Frontend Development',
        achievements: ['UI Craftsman', 'React Ninja', 'Design Guru', 'Performance Pro'],
        joinDate: '2023-07-22',
        lastActive: '2024-01-15',
        coursesCompleted: 15,
        studyHours: 220,
        rank: 'Frontend Specialist'
      }
    },
    {
      username: 'mike_student',
      password: 'learn2024',
      userData: {
        id: '3',
        username: 'mike_student',
        email: 'mike@mentoro.ai',
        domain: 'tech',
        level: 8,
        xp: 2340,
        nextLevelXP: 3000,
        streak: 12,
        avatar: '🧑‍🎓',
        mood: 'calm',
        theme: 'zen',
        specialization: 'Computer Science',
        achievements: ['First Steps', 'Code Explorer', 'Problem Solver'],
        joinDate: '2023-11-10',
        lastActive: '2024-01-15',
        coursesCompleted: 6,
        studyHours: 85,
        rank: 'Beginner'
      }
    }
  ],
  medicine: [
    {
      username: 'dr_smith',
      password: 'medicine2024',
      userData: {
        id: '4',
        username: 'dr_smith',
        email: 'smith@mednova.ai',
        domain: 'medicine',
        level: 35,
        xp: 22800,
        nextLevelXP: 24000,
        streak: 89,
        avatar: '👨‍⚕️',
        mood: 'focused',
        theme: 'zen',
        specialization: 'Internal Medicine',
        achievements: ['Diagnostic Expert', 'Patient Care Champion', 'Medical Scholar', 'AI Pioneer', 'Research Leader', 'Mentor'],
        joinDate: '2022-09-12',
        lastActive: '2024-01-15',
        coursesCompleted: 42,
        studyHours: 680,
        rank: 'Senior Physician'
      }
    },
    {
      username: 'emma_med',
      password: 'study2024',
      userData: {
        id: '5',
        username: 'emma_med',
        email: 'emma@mednova.ai',
        domain: 'medicine',
        level: 12,
        xp: 4200,
        nextLevelXP: 5000,
        streak: 34,
        avatar: '👩‍🎓',
        mood: 'excited',
        theme: 'neon',
        specialization: 'Pre-Med Studies',
        achievements: ['Knowledge Seeker', 'Study Streak', 'Anatomy Master', 'Case Study Pro'],
        joinDate: '2023-08-20',
        lastActive: '2024-01-15',
        coursesCompleted: 18,
        studyHours: 280,
        rank: 'Medical Student'
      }
    },
    {
      username: 'dr_patel',
      password: 'emergency2024',
      userData: {
        id: '6',
        username: 'dr_patel',
        email: 'patel@mednova.ai',
        domain: 'medicine',
        level: 24,
        xp: 12600,
        nextLevelXP: 14000,
        streak: 56,
        avatar: '🩺',
        mood: 'focused',
        theme: 'cyber',
        specialization: 'Emergency Medicine',
        achievements: ['Night Shift Hero', 'Quick Thinker', 'Life Saver', 'Trauma Expert', 'Team Leader'],
        joinDate: '2023-01-08',
        lastActive: '2024-01-15',
        coursesCompleted: 28,
        studyHours: 420,
        rank: 'Emergency Physician'
      }
    }
  ],
  finance: [
    {
      username: 'warren_trader',
      password: 'finance2024',
      userData: {
        id: '7',
        username: 'warren_trader',
        email: 'warren@finova.ai',
        domain: 'finance',
        level: 32,
        xp: 19650,
        nextLevelXP: 21000,
        streak: 73,
        avatar: '💼',
        mood: 'focused',
        theme: 'cyber',
        specialization: 'Investment Banking',
        achievements: ['Market Master', 'Risk Analyst', 'Portfolio Pro', 'Trading Legend', 'Financial Guru', 'AI Trader'],
        joinDate: '2022-11-05',
        lastActive: '2024-01-15',
        coursesCompleted: 38,
        studyHours: 520,
        rank: 'Senior Analyst'
      }
    },
    {
      username: 'sophia_cfa',
      password: 'invest2024',
      userData: {
        id: '8',
        username: 'sophia_cfa',
        email: 'sophia@finova.ai',
        domain: 'finance',
        level: 26,
        xp: 13400,
        nextLevelXP: 15000,
        streak: 45,
        avatar: '👩‍💼',
        mood: 'excited',
        theme: 'neon',
        specialization: 'Portfolio Management',
        achievements: ['CFA Champion', 'Risk Master', 'Market Analyst', 'Investment Pro', 'Data Wizard'],
        joinDate: '2023-02-18',
        lastActive: '2024-01-15',
        coursesCompleted: 31,
        studyHours: 410,
        rank: 'Portfolio Manager'
      }
    },
    {
      username: 'james_fintech',
      password: 'crypto2024',
      userData: {
        id: '9',
        username: 'james_fintech',
        email: 'james@finova.ai',
        domain: 'finance',
        level: 15,
        xp: 6800,
        nextLevelXP: 8000,
        streak: 28,
        avatar: '🚀',
        mood: 'excited',
        theme: 'cyber',
        specialization: 'FinTech & Blockchain',
        achievements: ['Crypto Pioneer', 'DeFi Explorer', 'Blockchain Builder', 'Innovation Leader'],
        joinDate: '2023-06-12',
        lastActive: '2024-01-15',
        coursesCompleted: 22,
        studyHours: 315,
        rank: 'FinTech Specialist'
      }
    }
  ]
};

// Domain website mapping
const domainWebsites = {
  tech: 'https://mentoro-ai.netlify.app',
  medicine: 'https://mednova-ai.netlify.app',
  finance: 'https://finova-ai.netlify.app'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      selectedDomain: null,

      login: async (credentials) => {
        const { username, password, domain } = credentials;
        const domainUsers = mockUsers[domain] || [];
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const foundUser = domainUsers.find(
          u => u.username === username && u.password === password
        );

        if (foundUser) {
          // Instead of setting user state, directly redirect to the website
          const websiteUrl = domainWebsites[domain as keyof typeof domainWebsites];
          if (websiteUrl) {
            // Create loading overlay
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 bg-gradient-to-br from-purple-900 via-emerald-900 to-cyan-900 z-50 flex items-center justify-center';
            overlay.innerHTML = `
              <div class="text-center text-white">
                <div class="relative mb-8">
                  <div class="animate-spin w-20 h-20 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <p class="text-3xl font-bold mb-3">Launching ${domain === 'tech' ? 'Mentoro AI' : domain === 'medicine' ? 'MedNova AI' : 'Finova AI'}...</p>
                <p class="text-gray-300 text-lg">Preparing your personalized AI learning environment</p>
                <div class="mt-6 flex items-center justify-center space-x-2">
                  <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            `;
            document.body.appendChild(overlay);
            
            setTimeout(() => {
              window.open(websiteUrl, '_blank');
              document.body.removeChild(overlay);
              // Reset the form state
              set({
                selectedDomain: null
              });
            }, 2500);
          }
          return true;
        }
        
        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          selectedDomain: null
        });
      },

      setDomain: (domain) => {
        set({ selectedDomain: domain });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          });
        }
      }
    }),
    {
      name: 'ai-learning-auth'
    }
  )
);
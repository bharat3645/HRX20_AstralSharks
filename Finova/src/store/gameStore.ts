import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, User, Achievement, Flashcard } from '../types';

interface GameStore extends GameState {
  setUser: (user: User) => void;
  addXP: (amount: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  updateStreak: () => void;
  addFlashcard: (flashcard: Flashcard) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  resetGame: () => void;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first AI mentor conversation',
    icon: '🚀',
    xpReward: 50,
  },
  {
    id: 'scenario-master',
    name: 'Scenario Master',
    description: 'Complete 5 business scenarios',
    icon: '🎯',
    xpReward: 200,
  },
  {
    id: 'flashcard-hero',
    name: 'Flashcard Hero',
    description: 'Review 50 flashcards',
    icon: '📚',
    xpReward: 150,
  },
  {
    id: 'metric-master',
    name: 'Metric Master',
    description: 'Master 10 business equations',
    icon: '📊',
    xpReward: 300,
  },
  {
    id: 'streak-warrior',
    name: 'Streak Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    xpReward: 250,
  },
];

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      user: null,
      totalXP: 0,
      currentLevel: 1,
      streak: 0,
      achievements: [],
      flashcards: [],
      scenarios: [],
      campaigns: [],
      
      setUser: (user) => set({ user }),
      
      addXP: (amount) => {
        const state = get();
        const newXP = state.totalXP + amount;
        const newLevel = Math.floor(newXP / 1000) + 1;
        
        set({
          totalXP: newXP,
          currentLevel: newLevel,
        });
        
        // Check for level up achievements
        if (newLevel > state.currentLevel) {
          // Trigger level up celebration
          console.log(`Level up! Now level ${newLevel}`);
        }
      },
      
      unlockAchievement: (achievement) => {
        const state = get();
        if (!state.achievements.find(a => a.id === achievement.id)) {
          const unlockedAchievement = { ...achievement, unlockedAt: new Date() };
          set({
            achievements: [...state.achievements, unlockedAchievement],
          });
          get().addXP(achievement.xpReward);
        }
      },
      
      updateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        const lastActivity = state.user?.lastActivity ? new Date(state.user.lastActivity).toDateString() : null;
        
        if (lastActivity !== today) {
          const newStreak = state.streak + 1;
          set({ streak: newStreak });
          
          // Check for streak achievements
          if (newStreak === 7) {
            const streakAchievement = initialAchievements.find(a => a.id === 'streak-warrior');
            if (streakAchievement) get().unlockAchievement(streakAchievement);
          }
        }
      },
      
      addFlashcard: (flashcard) => {
        set(state => ({
          flashcards: [...state.flashcards, flashcard]
        }));
      },
      
      updateFlashcard: (id, updates) => {
        set(state => ({
          flashcards: state.flashcards.map(card =>
            card.id === id ? { ...card, ...updates } : card
          )
        }));
      },
      
      resetGame: () => set({
        user: null,
        totalXP: 0,
        currentLevel: 1,
        streak: 0,
        achievements: [],
        flashcards: [],
        scenarios: [],
        campaigns: [],
      }),
    }),
    {
      name: 'business-learning-game',
    }
  )
);
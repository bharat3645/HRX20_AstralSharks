import { create } from 'zustand';
import { User, Domain, Quest, UserProgress } from '../types';

interface GameState {
  user: User | null;
  selectedDomain: Domain | null;
  domains: Domain[];
  quests: Quest[];
  userProgress: UserProgress | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setSelectedDomain: (domain: Domain | null) => void;
  setDomains: (domains: Domain[]) => void;
  setQuests: (quests: Quest[]) => void;
  setUserProgress: (progress: UserProgress | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addXP: (amount: number) => void;
  completeQuest: (questId: string) => void;
  logout: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  user: null,
  selectedDomain: null,
  domains: [],
  quests: [],
  userProgress: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setSelectedDomain: (domain) => set({ selectedDomain: domain }),
  setDomains: (domains) => set({ domains }),
  setQuests: (quests) => set({ quests }),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  addXP: (amount) => {
    const { user, userProgress } = get();
    if (user && userProgress) {
      const newXP = userProgress.total_xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      
      set({
        user: { ...user, xp: newXP, level: newLevel },
        userProgress: { ...userProgress, total_xp: newXP, level: newLevel }
      });
    }
  },

  completeQuest: (questId) => {
    const { userProgress, quests } = get();
    if (userProgress) {
      const quest = quests.find(q => q.id === questId);
      if (quest && !userProgress.completed_quests.includes(questId)) {
        set({
          userProgress: {
            ...userProgress,
            completed_quests: [...userProgress.completed_quests, questId]
          }
        });
        get().addXP(quest.xp_reward);
      }
    }
  },

  logout: () => {
    // Clear all user data from store
    set({
      user: null,
      selectedDomain: null,
      userProgress: null,
      quests: [],
      error: null
    });
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('selectedDomain');
    
    // In a real app, you would also call supabase.auth.signOut()
    // supabase.auth.signOut();
  }
}));
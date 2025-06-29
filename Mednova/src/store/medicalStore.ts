import { create } from 'zustand';
import { MedicalUser, MedicalDomain, PatientCase, MedicalProgress } from '../types/medical';

interface MedicalGameState {
  user: MedicalUser | null;
  selectedDomain: MedicalDomain | null;
  domains: MedicalDomain[];
  cases: PatientCase[];
  userProgress: MedicalProgress | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: MedicalUser | null) => void;
  setSelectedDomain: (domain: MedicalDomain | null) => void;
  setDomains: (domains: MedicalDomain[]) => void;
  setCases: (cases: PatientCase[]) => void;
  setUserProgress: (progress: MedicalProgress | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addXP: (amount: number) => void;
  completeCase: (caseId: string) => void;
  updateRank: (xp: number) => string;
  logout: () => void;
}

export const useMedicalStore = create<MedicalGameState>((set, get) => ({
  user: null,
  selectedDomain: null,
  domains: [],
  cases: [],
  userProgress: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setSelectedDomain: (domain) => set({ selectedDomain: domain }),
  setDomains: (domains) => set({ domains }),
  setCases: (cases) => set({ cases }),
  setUserProgress: (progress) => set({ userProgress: progress }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  updateRank: (xp: number): string => {
    if (xp >= 10000) return 'Nova Surgeon';
    if (xp >= 5000) return 'Consultant';
    if (xp >= 2000) return 'Resident';
    return 'Intern';
  },

  addXP: (amount) => {
    const { user, userProgress, updateRank } = get();
    if (user && userProgress) {
      const newXP = userProgress.total_xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const newRank = updateRank(newXP);
      
      set({
        user: { ...user, xp: newXP, level: newLevel, rank: newRank as any },
        userProgress: { ...userProgress, total_xp: newXP, level: newLevel, rank: newRank }
      });
    }
  },

  completeCase: (caseId) => {
    const { userProgress, cases } = get();
    if (userProgress) {
      const case_ = cases.find(c => c.id === caseId);
      if (case_ && !userProgress.completed_cases.includes(caseId)) {
        set({
          userProgress: {
            ...userProgress,
            completed_cases: [...userProgress.completed_cases, caseId]
          }
        });
        get().addXP(case_.xp_reward);
      }
    }
  },

  logout: () => {
    // Clear all user data from store
    set({
      user: null,
      selectedDomain: null,
      userProgress: null,
      cases: [],
      error: null
    });
    
    // Clear localStorage
    localStorage.removeItem('medicalUser');
    localStorage.removeItem('selectedMedicalDomain');
    
    // In a real app, you would also call supabase.auth.signOut()
    // supabase.auth.signOut();
  }
}));
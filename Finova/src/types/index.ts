export interface User {
  id: string;
  email: string;
  name: string;
  xp: number;
  level: number;
  streak: number;
  lastActivity: Date;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: Date;
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  example: string;
  category: 'finance' | 'marketing' | 'saas' | 'strategy';
  difficulty: 'easy' | 'medium' | 'hard';
  confidence: number;
  lastReviewed: Date;
  nextReview: Date;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  completed: boolean;
  score?: number;
}

export interface Campaign {
  id: string;
  title: string;
  objective: string;
  channels: string[];
  budget: number;
  kpis: { [key: string]: number };
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface GameState {
  user: User | null;
  totalXP: number;
  currentLevel: number;
  streak: number;
  achievements: Achievement[];
  flashcards: Flashcard[];
  scenarios: Scenario[];
  campaigns: Campaign[];
}
export interface User {
  id: string;
  email: string;
  username: string;
  domain: Domain;
  level: number;
  xp: number;
  streak: number;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Domain {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  skills: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  domain_id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp_reward: number;
  estimated_time: number;
  skills_required: string[];
  content: QuestContent;
  completed: boolean;
}

export interface QuestContent {
  type: 'flashcard' | 'project' | 'challenge' | 'roadmap';
  data: any;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  domain_id: string;
  difficulty: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  domain_id: string;
  difficulty: string;
  estimated_hours: number;
  skills: string[];
  requirements: string[];
  deliverables: string[];
}

export interface AIBuddy {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  specialization: string;
  greeting: string;
}

export interface UserProgress {
  domain_id: string;
  skill_points: Record<string, number>;
  completed_quests: string[];
  current_streak: number;
  total_xp: number;
  level: number;
}
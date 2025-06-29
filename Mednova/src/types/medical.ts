export interface MedicalDomain {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  skills: string[];
  specialty: 'Basic Sciences' | 'Clinical Medicine';
}

export interface MedicalUser {
  id: string;
  email: string;
  username: string;
  domain: MedicalDomain;
  level: number;
  xp: number;
  streak: number;
  rank: 'Intern' | 'Resident' | 'Consultant' | 'Nova Surgeon';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PatientCase {
  id: string;
  title: string;
  description: string;
  domain_id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp_reward: number;
  estimated_time: number;
  skills_required: string[];
  patient_data: PatientData;
  completed: boolean;
}

export interface PatientData {
  age: number;
  gender: string;
  chief_complaint: string;
  history: string;
  physical_exam: string;
  vitals: {
    temperature: string;
    blood_pressure: string;
    heart_rate: string;
    respiratory_rate: string;
    oxygen_saturation: string;
  };
  lab_results?: any;
  imaging?: any;
  diagnosis?: string;
  treatment_plan?: string;
}

export interface MedicalFlashcard {
  id: string;
  question: string;
  answer: string;
  domain_id: string;
  difficulty: string;
  tags: string[];
  clinical_relevance: string;
  image_url?: string;
}

export interface AICompanion {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  specialization: string;
  greeting: string;
  tone: 'empathetic' | 'direct' | 'encouraging' | 'analytical';
}

export interface MedicalProgress {
  domain_id: string;
  skill_points: Record<string, number>;
  completed_cases: string[];
  mastered_flashcards: string[];
  current_streak: number;
  total_xp: number;
  level: number;
  rank: string;
}

export interface StudyNote {
  id: string;
  user_id: string;
  title: string;
  content: string;
  domain_id: string;
  tags: string[];
  ai_analysis?: string;
  created_at: string;
  updated_at: string;
}
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          username: string;
          domain: string;
          level: number;
          xp: number;
          streak: number;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
          domain: string;
          level?: number;
          xp?: number;
          streak?: number;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          domain?: string;
          level?: number;
          xp?: number;
          streak?: number;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      domains: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          color: string;
          gradient: string;
          skills: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          color: string;
          gradient: string;
          skills: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          icon?: string;
          color?: string;
          gradient?: string;
          skills?: string[];
        };
      };
      quests: {
        Row: {
          id: string;
          title: string;
          description: string;
          domain_id: string;
          difficulty: string;
          xp_reward: number;
          estimated_time: number;
          skills_required: string[];
          content: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          domain_id: string;
          difficulty: string;
          xp_reward: number;
          estimated_time: number;
          skills_required: string[];
          content: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          domain_id?: string;
          difficulty?: string;
          xp_reward?: number;
          estimated_time?: number;
          skills_required?: string[];
          content?: any;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          domain_id: string;
          skill_points: any;
          completed_quests: string[];
          current_streak: number;
          total_xp: number;
          level: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          domain_id: string;
          skill_points?: any;
          completed_quests?: string[];
          current_streak?: number;
          total_xp?: number;
          level?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          domain_id?: string;
          skill_points?: any;
          completed_quests?: string[];
          current_streak?: number;
          total_xp?: number;
          level?: number;
          updated_at?: string;
        };
      };
    };
  };
};
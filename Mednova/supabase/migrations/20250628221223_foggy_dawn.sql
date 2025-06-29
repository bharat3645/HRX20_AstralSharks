/*
  # Create quests table for domain-specific learning content

  1. New Tables
    - `quests`
      - `id` (uuid, primary key)
      - `title` (text, quest title)
      - `description` (text, quest description)
      - `domain_id` (uuid, references domains table)
      - `difficulty` (text, beginner/intermediate/advanced)
      - `xp_reward` (integer, XP awarded for completion)
      - `estimated_time` (integer, estimated time in minutes)
      - `skills_required` (jsonb, array of required skills)
      - `content` (jsonb, quest content and data)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quests` table
    - Add policy for public read access to quests
*/

CREATE TABLE IF NOT EXISTS quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  domain_id uuid NOT NULL REFERENCES domains(id),
  difficulty text NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  xp_reward integer NOT NULL DEFAULT 100,
  estimated_time integer NOT NULL DEFAULT 30,
  skills_required jsonb NOT NULL DEFAULT '[]'::jsonb,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quests are publicly readable"
  ON quests
  FOR SELECT
  TO public
  USING (true);

-- Create index for better performance
CREATE INDEX idx_quests_domain_id ON quests(domain_id);
CREATE INDEX idx_quests_difficulty ON quests(difficulty);
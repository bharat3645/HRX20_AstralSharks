/*
  # Create user progress table for tracking learning advancement

  1. New Tables
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `domain_id` (uuid, references domains)
      - `skill_points` (jsonb, points per skill)
      - `completed_quests` (jsonb, array of completed quest IDs)
      - `current_streak` (integer, current learning streak)
      - `total_xp` (integer, total XP in this domain)
      - `level` (integer, level in this domain)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_progress` table
    - Add policy for users to read/update their own progress
*/

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id),
  domain_id uuid NOT NULL REFERENCES domains(id),
  skill_points jsonb NOT NULL DEFAULT '{}'::jsonb,
  completed_quests jsonb NOT NULL DEFAULT '[]'::jsonb,
  current_streak integer DEFAULT 0,
  total_xp integer DEFAULT 0,
  level integer DEFAULT 1,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, domain_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_domain_id ON user_progress(domain_id);
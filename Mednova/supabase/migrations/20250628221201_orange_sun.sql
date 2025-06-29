/*
  # Create domains table for multi-domain learning platform

  1. New Tables
    - `domains`
      - `id` (uuid, primary key)
      - `name` (text, domain name like "Business & Marketing")
      - `slug` (text, URL-friendly identifier)
      - `description` (text, domain description)
      - `icon` (text, Lucide icon name)
      - `color` (text, Tailwind color name)
      - `gradient` (text, Tailwind gradient classes)
      - `skills` (jsonb, array of skill names)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `domains` table
    - Add policy for public read access to domains
*/

CREATE TABLE IF NOT EXISTS domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  gradient text NOT NULL,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE domains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Domains are publicly readable"
  ON domains
  FOR SELECT
  TO public
  USING (true);

-- Insert default domains
INSERT INTO domains (name, slug, description, icon, color, gradient, skills) VALUES
  ('Business & Marketing', 'business', 'Master entrepreneurship, strategy, and marketing fundamentals', 'TrendingUp', 'emerald', 'from-emerald-500 to-teal-600', '["Strategy", "Marketing", "Finance", "Leadership", "Analytics", "Sales"]'),
  ('Medicine & Healthcare', 'healthcare', 'Advance your medical knowledge and patient care skills', 'Heart', 'red', 'from-red-500 to-pink-600', '["Anatomy", "Pharmacology", "Diagnostics", "Patient Care", "Medical Ethics", "Research"]'),
  ('Law & Legal Reasoning', 'law', 'Develop legal expertise and critical thinking skills', 'Scale', 'blue', 'from-blue-500 to-indigo-600', '["Constitutional Law", "Contract Law", "Legal Research", "Case Analysis", "Ethics", "Litigation"]'),
  ('Psychology', 'psychology', 'Understand human behavior and mental processes', 'Brain', 'purple', 'from-purple-500 to-violet-600', '["Cognitive Psychology", "Behavioral Analysis", "Research Methods", "Therapy", "Assessment", "Statistics"]'),
  ('UI/UX & Design', 'design', 'Create beautiful and functional user experiences', 'Palette', 'pink', 'from-pink-500 to-rose-600', '["User Research", "Prototyping", "Visual Design", "Interaction Design", "Usability", "Design Systems"]'),
  ('Education & Pedagogy', 'education', 'Master teaching methods and educational theory', 'GraduationCap', 'amber', 'from-amber-500 to-orange-600', '["Curriculum Design", "Assessment", "Classroom Management", "Learning Theory", "Technology Integration", "Differentiation"]'),
  ('Data Journalism', 'journalism', 'Tell compelling stories through data and investigation', 'FileText', 'cyan', 'from-cyan-500 to-blue-600', '["Data Analysis", "Storytelling", "Research", "Visualization", "Ethics", "Digital Tools"]'),
  ('Civil Engineering', 'engineering', 'Design and build infrastructure for society', 'Building', 'slate', 'from-slate-500 to-gray-600', '["Structural Design", "Project Management", "CAD", "Materials Science", "Safety", "Sustainability"]'),
  ('Aviation & Hospitality', 'aviation', 'Excel in travel, tourism, and service industries', 'Plane', 'sky', 'from-sky-500 to-blue-600', '["Customer Service", "Safety Protocols", "Operations", "Communication", "Cultural Awareness", "Crisis Management"]'),
  ('Technology', 'technology', 'Master programming and software development', 'Code', 'green', 'from-green-500 to-emerald-600', '["Programming", "Algorithms", "System Design", "DevOps", "Security", "AI/ML"]');
import { Domain } from '../types';

export const domains: Domain[] = [
  {
    id: 'business',
    name: 'Business & Marketing',
    slug: 'business',
    description: 'Master entrepreneurship, strategy, and marketing fundamentals',
    icon: 'TrendingUp',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    skills: ['Strategy', 'Marketing', 'Finance', 'Leadership', 'Analytics', 'Sales']
  },
  {
    id: 'healthcare',
    name: 'Medicine & Healthcare',
    slug: 'healthcare',
    description: 'Advance your medical knowledge and patient care skills',
    icon: 'Heart',
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    skills: ['Anatomy', 'Pharmacology', 'Diagnostics', 'Patient Care', 'Medical Ethics', 'Research']
  },
  {
    id: 'law',
    name: 'Law & Legal Reasoning',
    slug: 'law',
    description: 'Develop legal expertise and critical thinking skills',
    icon: 'Scale',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    skills: ['Constitutional Law', 'Contract Law', 'Legal Research', 'Case Analysis', 'Ethics', 'Litigation']
  },
  {
    id: 'psychology',
    name: 'Psychology',
    slug: 'psychology',
    description: 'Understand human behavior and mental processes',
    icon: 'Brain',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    skills: ['Cognitive Psychology', 'Behavioral Analysis', 'Research Methods', 'Therapy', 'Assessment', 'Statistics']
  },
  {
    id: 'design',
    name: 'UI/UX & Design',
    slug: 'design',
    description: 'Create beautiful and functional user experiences',
    icon: 'Palette',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    skills: ['User Research', 'Prototyping', 'Visual Design', 'Interaction Design', 'Usability', 'Design Systems']
  },
  {
    id: 'education',
    name: 'Education & Pedagogy',
    slug: 'education',
    description: 'Master teaching methods and educational theory',
    icon: 'GraduationCap',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    skills: ['Curriculum Design', 'Assessment', 'Classroom Management', 'Learning Theory', 'Technology Integration', 'Differentiation']
  },
  {
    id: 'journalism',
    name: 'Data Journalism',
    slug: 'journalism',
    description: 'Tell compelling stories through data and investigation',
    icon: 'FileText',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    skills: ['Data Analysis', 'Storytelling', 'Research', 'Visualization', 'Ethics', 'Digital Tools']
  },
  {
    id: 'engineering',
    name: 'Civil Engineering',
    slug: 'engineering',
    description: 'Design and build infrastructure for society',
    icon: 'Building',
    color: 'slate',
    gradient: 'from-slate-500 to-gray-600',
    skills: ['Structural Design', 'Project Management', 'CAD', 'Materials Science', 'Safety', 'Sustainability']
  },
  {
    id: 'aviation',
    name: 'Aviation & Hospitality',
    slug: 'aviation',
    description: 'Excel in travel, tourism, and service industries',
    icon: 'Plane',
    color: 'sky',
    gradient: 'from-sky-500 to-blue-600',
    skills: ['Customer Service', 'Safety Protocols', 'Operations', 'Communication', 'Cultural Awareness', 'Crisis Management']
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'Master programming and software development',
    icon: 'Code',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    skills: ['Programming', 'Algorithms', 'System Design', 'DevOps', 'Security', 'AI/ML']
  }
];
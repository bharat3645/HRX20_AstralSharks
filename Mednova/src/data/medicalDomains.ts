import { MedicalDomain } from '../types';

export const medicalDomains: MedicalDomain[] = [
  {
    id: 'anatomy',
    name: 'Human Anatomy',
    slug: 'anatomy',
    description: 'Master the structure and organization of the human body',
    icon: 'User',
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    skills: ['Musculoskeletal', 'Cardiovascular', 'Nervous System', 'Respiratory', 'Digestive', 'Endocrine'],
    specialty: 'Basic Sciences'
  },
  {
    id: 'physiology',
    name: 'Physiology',
    slug: 'physiology',
    description: 'Understand how body systems function and interact',
    icon: 'Activity',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    skills: ['Cardiac Function', 'Respiratory Mechanics', 'Renal Function', 'Neurophysiology', 'Endocrine Control', 'Metabolism'],
    specialty: 'Basic Sciences'
  },
  {
    id: 'pathology',
    name: 'Pathology',
    slug: 'pathology',
    description: 'Study disease processes and their effects on the body',
    icon: 'Microscope',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    skills: ['General Pathology', 'Systemic Pathology', 'Histopathology', 'Clinical Pathology', 'Forensic Medicine', 'Microbiology'],
    specialty: 'Basic Sciences'
  },
  {
    id: 'pharmacology',
    name: 'Pharmacology',
    slug: 'pharmacology',
    description: 'Learn drug actions, interactions, and therapeutic applications',
    icon: 'Pill',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    skills: ['Pharmacokinetics', 'Pharmacodynamics', 'Drug Classifications', 'Toxicology', 'Clinical Pharmacology', 'Therapeutics'],
    specialty: 'Basic Sciences'
  },
  {
    id: 'internal-medicine',
    name: 'Internal Medicine',
    slug: 'internal-medicine',
    description: 'Diagnose and treat adult diseases and conditions',
    icon: 'Stethoscope',
    color: 'indigo',
    gradient: 'from-indigo-500 to-blue-600',
    skills: ['Cardiology', 'Pulmonology', 'Gastroenterology', 'Nephrology', 'Endocrinology', 'Rheumatology'],
    specialty: 'Clinical Medicine'
  },
  {
    id: 'surgery',
    name: 'Surgery',
    slug: 'surgery',
    description: 'Master surgical principles and operative techniques',
    icon: 'Scissors',
    color: 'orange',
    gradient: 'from-orange-500 to-red-600',
    skills: ['General Surgery', 'Trauma Surgery', 'Minimally Invasive', 'Surgical Anatomy', 'Pre/Post-op Care', 'Emergency Surgery'],
    specialty: 'Clinical Medicine'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    slug: 'pediatrics',
    description: 'Provide comprehensive care for infants, children, and adolescents',
    icon: 'Baby',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    skills: ['Neonatology', 'Child Development', 'Pediatric Diseases', 'Immunizations', 'Growth Disorders', 'Adolescent Medicine'],
    specialty: 'Clinical Medicine'
  },
  {
    id: 'obstetrics-gynecology',
    name: 'Obstetrics & Gynecology',
    slug: 'obstetrics-gynecology',
    description: 'Women\'s reproductive health and pregnancy care',
    icon: 'Heart',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    skills: ['Obstetrics', 'Gynecology', 'Reproductive Endocrinology', 'Maternal-Fetal Medicine', 'Gynecologic Oncology', 'Family Planning'],
    specialty: 'Clinical Medicine'
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    slug: 'psychiatry',
    description: 'Understand and treat mental health disorders',
    icon: 'Brain',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    skills: ['Psychopathology', 'Psychopharmacology', 'Psychotherapy', 'Addiction Medicine', 'Child Psychiatry', 'Forensic Psychiatry'],
    specialty: 'Clinical Medicine'
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    slug: 'emergency-medicine',
    description: 'Rapid assessment and treatment of acute medical conditions',
    icon: 'Zap',
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-600',
    skills: ['Trauma Management', 'Resuscitation', 'Emergency Procedures', 'Toxicology', 'Critical Care', 'Disaster Medicine'],
    specialty: 'Clinical Medicine'
  }
];
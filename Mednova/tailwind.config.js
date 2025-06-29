/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
        medical: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'dna-spin': 'dna-spin 3s linear infinite',
        'medical-pulse': 'medical-pulse 2s infinite',
        'neural-glow': 'neural-glow 2s infinite',
        'bio-glow': 'bio-glow 2s infinite',
        'blood-glow': 'blood-glow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dark-medical': 'linear-gradient(135deg, #000000 0%, #0f172a 50%, #1e293b 100%)',
        'dark-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        'dna-pattern': 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2322c55e" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")',
        'medical-grid': 'linear-gradient(rgba(14, 165, 233, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.05) 1px, transparent 1px)',
      },
      colors: {
        // Dark Professional Medical Color System
        medical: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Primary Medical Blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Biology/Life Green
        bio: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Primary Bio Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Blood/Emergency Red
        blood: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Primary Blood Red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Neural/Brain Purple
        neural: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Primary Neural Purple
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Bone/Structure Gray
        bone: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Primary Bone Gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Oxygen/Respiratory Blue
        oxygen: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary Oxygen Blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Professional Dark Theme
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          975: '#000000',
        }
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' },
          '100%': { boxShadow: '0 0 25px rgba(34, 197, 94, 0.8)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(1.05)' },
        },
        'dna-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'medical-pulse': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.02)' },
        },
        'neural-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(168, 85, 247, 0.7)' },
        },
        'bio-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(34, 197, 94, 0.7)' },
        },
        'blood-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(239, 68, 68, 0.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      boxShadow: {
        'medical': '0 6px 25px rgba(14, 165, 233, 0.2)',
        'bio': '0 6px 25px rgba(34, 197, 94, 0.2)',
        'blood': '0 6px 25px rgba(239, 68, 68, 0.2)',
        'neural': '0 6px 25px rgba(168, 85, 247, 0.2)',
        'oxygen': '0 6px 25px rgba(59, 130, 246, 0.2)',
        'glow-sm': '0 0 15px rgba(14, 165, 233, 0.4)',
        'glow-md': '0 0 20px rgba(14, 165, 233, 0.5)',
        'glow-lg': '0 0 30px rgba(14, 165, 233, 0.6)',
        'inner-glow': 'inset 0 0 15px rgba(14, 165, 233, 0.3)',
        'dark': '0 10px 40px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 15px 50px rgba(0, 0, 0, 0.7)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
  safelist: [
    // Medical Color System
    'text-medical-400', 'text-medical-500', 'text-medical-600',
    'text-bio-400', 'text-bio-500', 'text-bio-600',
    'text-blood-400', 'text-blood-500', 'text-blood-600',
    'text-neural-400', 'text-neural-500', 'text-neural-600',
    'text-oxygen-400', 'text-oxygen-500', 'text-oxygen-600',
    'text-bone-400', 'text-bone-500', 'text-bone-600',
    'text-bone-100', 'text-bone-200', 'text-bone-300',
    
    // Background Colors
    'bg-medical-500/20', 'bg-bio-500/20', 'bg-blood-500/20', 'bg-neural-500/20', 'bg-oxygen-500/20', 'bg-bone-500/20',
    'bg-medical-900/20', 'bg-bio-900/20', 'bg-blood-900/20', 'bg-neural-900/20', 'bg-oxygen-900/20', 'bg-bone-900/20',
    'bg-medical-800/50', 'bg-bio-800/50', 'bg-blood-800/50', 'bg-neural-800/50', 'bg-oxygen-800/50', 'bg-bone-800/50',
    'bg-dark-950', 'bg-dark-900', 'bg-dark-800', 'bg-dark-700',
    
    // Border Colors
    'border-medical-500', 'border-bio-500', 'border-blood-500', 'border-neural-500', 'border-oxygen-500', 'border-bone-500',
    'border-medical-600/30', 'border-bio-600/30', 'border-blood-600/30', 'border-neural-600/30', 'border-oxygen-600/30', 'border-bone-600/30',
    'border-medical-500/20', 'border-bio-500/20', 'border-blood-500/20', 'border-neural-500/20', 'border-oxygen-500/20', 'border-bone-500/20',
    
    // Gradients
    'from-medical-500', 'to-medical-600', 'from-bio-500', 'to-bio-600',
    'from-blood-500', 'to-blood-600', 'from-neural-500', 'to-neural-600',
    'from-oxygen-500', 'to-oxygen-600', 'from-bone-500', 'to-bone-600',
    'from-dark-950', 'to-dark-900', 'from-dark-900', 'to-dark-800',
    'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-gradient-to-tr',
    
    // Shadows
    'shadow-medical', 'shadow-bio', 'shadow-blood', 'shadow-neural', 'shadow-oxygen',
    'shadow-glow-sm', 'shadow-glow-md', 'shadow-glow-lg', 'shadow-dark', 'shadow-dark-lg',
    
    // Animations
    'animate-heartbeat', 'animate-dna-spin', 'animate-medical-pulse', 'animate-neural-glow', 'animate-bio-glow', 'animate-blood-glow', 'animate-float',
    
    // Dark theme specific
    'glass-morphism', 'glass-morphism-light', 'glass-morphism-dark',
    'medical-card', 'medical-button', 'medical-text-gradient',
    'dark-card-primary', 'dark-card-secondary', 'dark-card-accent',
    'dark-button-primary', 'dark-button-secondary', 'dark-button-accent',
    'text-dark-primary', 'text-dark-secondary', 'text-dark-muted', 'text-dark-subtle',
  ],
};
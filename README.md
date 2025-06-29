# 🚀 Astral AI - Multi-Domain Gamified Learning Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.4.7-orange.svg)](https://zustand-demo.pmnd.rs/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.0-3ECF8E.svg)](https://supabase.com/)

> **Transform your learning journey with AI-powered, gamified education across multiple professional domains**

## 📖 Table of Contents

- [🌟 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [🎮 Domains](#-domains)
- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎯 Gamification System](#-gamification-system)
- [🤖 AI Integration](#-ai-integration)
- [💾 Database Schema](#-database-schema)
- [🔐 Security](#-security)
- [📱 User Experience](#-user-experience)
- [🎓 Learning Methodology](#-learning-methodology)
- [🔄 API Endpoints](#-api-endpoints)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Overview

**Astral AI** is a revolutionary multi-domain gamified learning platform that transforms traditional education into an immersive, AI-powered experience. The platform consists of three specialized learning environments, each designed for specific professional domains:

- **🎯 Mentoro AI** - Programming & Technology Education
- **🏥 MedNova AI** - Medical Education & Training  
- **💰 Finova AI** - Financial Markets & Trading Education

### 🎯 Core Philosophy

Astral AI combines cutting-edge AI technology with proven gamification principles to create engaging, personalized learning experiences that adapt to each user's needs, mood, and learning style.

## 🏗️ Architecture

### Hub-and-Spoke Design

```
Astral AI Hub
├── Domain Selection
├── Authentication
└── User Management
    ├── Mentoro AI (Tech)
    ├── MedNova AI (Medical)
    └── Finova AI (Finance)
```

### Monorepo Structure

```
Astral AI/
├── src/                    # Main hub application
├── Mentoro/               # Programming education platform
├── Mednova/               # Medical education platform
├── Finova/                # Financial education platform
├── package.json           # Root dependencies
└── README.md             # This file
```

## 🎮 Domains

### 🎯 Mentoro AI - Your AI Coding Mentor

**Focus**: Programming, Software Development, Computer Science

**Key Features**:
- **Coding Arena**: Real-time competitive programming battles
- **AI Buddy**: Personalized coding mentor with multiple personalities
- **DIY Generator**: AI-generated project tasks and challenges
- **Skill Tree**: Visual progression system for programming concepts
- **Flashcard Battles**: Gamified learning cards for programming concepts
- **Architect Mode**: Community code contribution and review system
- **Emotion Dashboard**: Mood tracking and productivity insights

**Technologies**: React, TypeScript, FastAPI, WebSockets, Gemini AI

### 🏥 MedNova AI - Advanced Medical AI Education

**Focus**: Medical Education, Clinical Training, Healthcare

**Key Features**:
- **Patient Cases**: Interactive medical scenarios and case studies
- **AI Medical Mentor**: Specialized medical AI assistant
- **Patient Simulator**: Virtual patient interactions and diagnostics
- **Med Battle**: Medical knowledge competitions
- **Study Journal**: Progress tracking and reflection
- **Medical Flashcards**: Domain-specific learning cards
- **Enhanced Dashboard**: Medical metrics and learning analytics

**Technologies**: React, TypeScript, Supabase, Medical AI Models

### 💰 Finova AI - Smart Financial Intelligence

**Focus**: Financial Markets, Trading, Investment Analysis

**Key Features**:
- **AI Mentor**: Financial market guidance and analysis
- **Scenario Simulator**: Trading and investment scenarios
- **Campaign Builder**: Financial strategy development
- **Equation Trainer**: Financial formula mastery
- **Flashcard Vault**: Financial concept learning
- **Skill Tree Builder**: Financial expertise progression
- **Report Explainer**: AI-powered financial report analysis

**Technologies**: React, TypeScript, Supabase, Financial APIs

## ✨ Features

### 🎮 Universal Gamification Elements

**Experience System**:
- **XP Points**: Earn experience for all learning activities
- **Level Progression**: Advance through levels based on XP
- **Achievement System**: Unlockable badges and rewards
- **Streak Tracking**: Daily activity streaks with bonuses
- **Ranking System**: Competitive leaderboards
- **Theme Customization**: Unlockable UI themes and avatars

**Social Features**:
- **Real-time Battles**: Compete with other learners
- **Community Submissions**: Share and review work
- **Peer Reviews**: Collaborative learning through feedback
- **Leaderboards**: Global and domain-specific rankings

### 🧠 AI-Powered Learning

**Adaptive Intelligence**:
- **Multi-Personality AI Mentors**: Different teaching styles and approaches
- **Context-Aware Responses**: Personalized based on user level and mood
- **Dynamic Content Generation**: AI-generated flashcards, projects, and scenarios
- **Real-Time Code Evaluation**: Automated testing and feedback
- **Emotional Intelligence**: Mood-aware learning recommendations

**Personalization**:
- **Learning Path Adaptation**: Content adjusts to user progress
- **Mood-Based Recommendations**: Learning suggestions based on emotional state
- **Skill Gap Analysis**: Identify and target weak areas
- **Progress Optimization**: AI-driven study scheduling

## 🛠️ Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **TypeScript** | 5.5.3 | Type Safety |
| **Vite** | 5.4.2 | Build Tool & Dev Server |
| **Tailwind CSS** | 3.4.1 | Styling Framework |
| **Framer Motion** | 10.16.16 | Animations |
| **Zustand** | 4.4.7 | State Management |
| **React Router** | 6.26.1 | Navigation |
| **Lucide React** | 0.344.0 | Icons |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **FastAPI** | 0.104.1 | Backend Framework (Mentoro) |
| **Python** | 3.11+ | Backend Language |
| **WebSockets** | - | Real-time Communication |
| **Supabase** | 2.39.0 | Database & Auth |
| **PostgreSQL** | 15+ | Primary Database |

### AI & External Services

| Service | Purpose |
|---------|---------|
| **Google Gemini AI** | Content Generation & AI Responses |
| **OpenAI GPT** | Advanced AI Features |
| **Supabase Auth** | Authentication & User Management |
| **Supabase Realtime** | Real-time Database Updates |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code Quality |
| **TypeScript ESLint** | TypeScript Linting |
| **PostCSS** | CSS Processing |
| **Autoprefixer** | CSS Compatibility |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **Python** 3.11+ (for Mentoro backend)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/astral-ai.git
   cd astral-ai
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install domain-specific dependencies**

   **Mentoro AI:**
   ```bash
   cd Mentoro
   npm install
   cd backend
   pip install -r requirements.txt
   ```

   **MedNova AI:**
   ```bash
   cd Mednova
   npm install
   ```

   **Finova AI:**
   ```bash
   cd Finova
   npm install
   ```

### Environment Setup

1. **Create environment files**

   **Root (.env):**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Mentoro (.env):**
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Backend (.env):**
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration files in `Mentoro/supabase/migrations/`
   - Configure Row Level Security (RLS) policies

### Running the Application

1. **Start the main hub**
   ```bash
   npm run dev
   ```

2. **Start individual domains**

   **Mentoro AI:**
   ```bash
   cd Mentoro
   npm run dev
   # In another terminal:
   cd backend
   python main.py
   ```

   **MedNova AI:**
   ```bash
   cd Mednova
   npm run dev
   ```

   **Finova AI:**
   ```bash
   cd Finova
   npm run dev
   ```

3. **Access the applications**
   - Main Hub: `http://localhost:5173`
   - Mentoro AI: `http://localhost:5174`
   - MedNova AI: `http://localhost:5175`
   - Finova AI: `http://localhost:5176`

## 📁 Project Structure

```
Astral AI/
├── src/                          # Main hub application
│   ├── components/               # Hub components
│   │   ├── Dashboard.tsx         # Main dashboard
│   │   ├── DomainSelector.tsx    # Domain selection
│   │   └── LoginForm.tsx         # Authentication
│   ├── store/                    # State management
│   │   └── authStore.ts          # Authentication store
│   └── App.tsx                   # Main app component
│
├── Mentoro/                      # Programming education platform
│   ├── src/
│   │   ├── components/           # UI components
│   │   ├── pages/                # Page components
│   │   ├── services/             # API services
│   │   ├── store/                # State management
│   │   └── hooks/                # Custom hooks
│   ├── backend/                  # FastAPI backend
│   │   ├── main.py               # Main API server
│   │   └── requirements.txt      # Python dependencies
│   └── supabase/                 # Database migrations
│
├── Mednova/                      # Medical education platform
│   ├── src/
│   │   ├── components/           # Medical-specific components
│   │   ├── data/                 # Medical data and domains
│   │   ├── services/             # Medical AI services
│   │   └── types/                # Medical type definitions
│   └── supabase/                 # Medical database migrations
│
├── Finova/                       # Financial education platform
│   ├── src/
│   │   ├── components/           # Finance-specific components
│   │   ├── services/             # Financial services
│   │   └── types/                # Financial type definitions
│   └── supabase/                 # Financial database migrations
│
├── package.json                  # Root dependencies
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🎯 Gamification System

### Experience Points (XP) System

**XP Sources**:
- **Quests**: 100-1000 XP per quest completion
- **Battles**: 50-500 XP based on performance
- **Flashcards**: 10-50 XP per correct answer
- **Daily Streaks**: 25 XP per day maintained
- **Achievements**: 50-500 XP per achievement
- **Community Contributions**: 100-300 XP per accepted submission

**Level Progression**:
```typescript
const calculateLevel = (totalXP: number): number => {
  return Math.floor(totalXP / 1000) + 1;
};
```

### Achievement System

**Achievement Categories**:
- **🏆 Milestone Achievements**: Level-based rewards
- **🔥 Streak Achievements**: Consistency rewards
- **⚔️ Battle Achievements**: Competitive rewards
- **📚 Learning Achievements**: Knowledge-based rewards
- **🤝 Community Achievements**: Social contribution rewards

### Streak System

**Daily Streak Benefits**:
- **1-7 days**: 25 XP bonus per day
- **8-30 days**: 50 XP bonus per day
- **31+ days**: 100 XP bonus per day
- **Special rewards**: Unlock exclusive themes and avatars

## 🤖 AI Integration

### AI Mentor Personalities

**Mentoro AI Personalities**:
- **Ada**: Encouraging and supportive mentor
- **Byte**: Direct and technical instructor
- **Codex**: Humorous and engaging teacher
- **Nova**: Analytical and detail-oriented guide

**MedNova AI Specializations**:
- **Dr. Smith**: Internal medicine specialist
- **Dr. Patel**: Emergency medicine expert
- **Dr. Chen**: Surgical procedures mentor

**Finova AI Advisors**:
- **Warren**: Value investing specialist
- **Sofia**: Technical analysis expert
- **Marcus**: Risk management advisor

### AI-Powered Features

**Content Generation**:
```typescript
// Example: AI-generated flashcards
const generateFlashcards = async (
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  count: number
): Promise<FlashcardData[]> => {
  // AI generates contextual flashcards
};
```

**Personalized Learning**:
```typescript
// Example: Mood-aware recommendations
const getRecommendations = (user: User, mood: string) => {
  const recommendations = aiService.analyze(user, mood);
  return recommendations.filterByMood(mood);
};
```

## 💾 Database Schema

### Core Tables

**User Management**:
```sql
-- User profiles with gamification data
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  level integer DEFAULT 1,
  xp integer DEFAULT 0,
  total_xp integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  rank text DEFAULT 'Bronze I',
  mood text DEFAULT 'excited',
  created_at timestamptz DEFAULT now()
);
```

**Learning Progress**:
```sql
-- Skill tree and concept progress
CREATE TABLE concept_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id),
  concept_id text NOT NULL,
  level integer DEFAULT 0,
  mastered boolean DEFAULT false,
  xp_invested integer DEFAULT 0
);
```

**Gamification Data**:
```sql
-- XP transaction logs
CREATE TABLE xp_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id),
  amount integer NOT NULL,
  source text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Achievement tracking
CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id),
  achievement_id text NOT NULL,
  unlocked_at timestamptz DEFAULT now()
);
```

**Social Features**:
```sql
-- Real-time battles
CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id uuid REFERENCES profiles(id),
  problem_title text NOT NULL,
  difficulty text NOT NULL,
  status text DEFAULT 'waiting',
  xp_wager integer DEFAULT 100
);

-- Community submissions
CREATE TABLE submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'pending'
);
```

## 🔐 Security

### Authentication & Authorization

**Supabase Auth Integration**:
```typescript
// JWT-based authentication
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};
```

**Row Level Security (RLS)**:
```sql
-- Example RLS policy
CREATE POLICY "Users can only access their own data"
ON profiles FOR ALL
USING (auth.uid() = id);
```

### Data Protection

- **Environment Variables**: Secure API key management
- **CORS Configuration**: Proper cross-origin handling
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **SQL Injection Prevention**: Parameterized queries

## 📱 User Experience

### Design System

**Glassmorphism Design**:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
}
```

**Animation System**:
```typescript
// Framer Motion animations
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05, y: -10 }
};
```

### Responsive Design

**Breakpoint System**:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

**Progressive Enhancement**:
- Core functionality works without JavaScript
- Enhanced features with modern browsers
- Graceful degradation for older browsers

## 🎓 Learning Methodology

### Pedagogical Approach

**Adaptive Learning**:
- Content difficulty adjusts to user level
- Personalized learning paths based on progress
- Skill gap identification and targeting

**Spaced Repetition**:
- Optimized review schedules
- Memory retention algorithms
- Progressive difficulty scaling

**Project-Based Learning**:
- Hands-on application of concepts
- Real-world problem solving
- Portfolio building opportunities

**Competitive Learning**:
- Peer-to-peer challenges
- Real-time competitions
- Collaborative problem solving

### Learning Analytics

**Progress Tracking**:
```typescript
interface LearningMetrics {
  timeSpent: number;
  conceptsMastered: number;
  accuracyRate: number;
  improvementRate: number;
  weakAreas: string[];
}
```

**Performance Insights**:
- Learning velocity analysis
- Concept mastery tracking
- Time-to-proficiency metrics
- Comparative performance data

## 🔄 API Endpoints

### Mentoro AI Backend (FastAPI)

**User Management**:
```
GET    /api/profile              # Get user profile
POST   /api/profile              # Create user profile
PUT    /api/profile              # Update user profile
```

**Gamification**:
```
POST   /api/xp/add               # Add XP points
GET    /api/xp/logs              # Get XP history
POST   /api/mood/log             # Log user mood
GET    /api/mood/history         # Get mood history
```

**Learning Features**:
```
POST   /api/battles/create       # Create coding battle
POST   /api/battles/{id}/join    # Join battle
POST   /api/battles/{id}/submit  # Submit code solution
POST   /api/diy/generate         # Generate DIY project
POST   /api/buddy/chat           # Chat with AI buddy
```

**Community Features**:
```
POST   /api/submissions/create   # Create submission
GET    /api/submissions          # Get submissions
POST   /api/submissions/{id}/review  # Review submission
GET    /api/leaderboard          # Get leaderboard
```

**Real-time Features**:
```
WS     /ws/{user_id}             # WebSocket connection
```

### Supabase Integration

**Database Operations**:
```typescript
// Example: Fetch user profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();

// Example: Update XP
const { data } = await supabase
  .from('profiles')
  .update({ xp: newXP, level: newLevel })
  .eq('id', user.id);
```

## 🧪 Testing

### Testing Strategy

**Frontend Testing**:
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

**Backend Testing**:
```bash
# Run Python tests
cd Mentoro/backend
python -m pytest

# Run API tests
python -m pytest tests/api/
```

### Test Coverage

**Target Coverage**:
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical user flows
- **E2E Tests**: Core user journeys
- **API Tests**: All endpoints

## 📦 Deployment

### Production Build

**Frontend Build**:
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**Backend Deployment**:
```bash
# Deploy FastAPI to production
cd Mentoro/backend
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Deployment Platforms

**Frontend Options**:
- **Vercel**: Automatic deployments from Git
- **Netlify**: Static site hosting
- **AWS S3 + CloudFront**: Scalable hosting
- **Firebase Hosting**: Google's hosting solution

**Backend Options**:
- **Railway**: Easy Python deployment
- **Heroku**: Platform-as-a-Service
- **AWS EC2**: Virtual server hosting
- **Google Cloud Run**: Containerized deployment

### Environment Configuration

**Production Environment**:
```env
NODE_ENV=production
VITE_API_URL=https://api.astral-ai.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_key
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests for new features**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards

**TypeScript Guidelines**:
- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Avoid `any` type usage
- Use proper error handling

**React Guidelines**:
- Use functional components with hooks
- Implement proper prop validation
- Follow React best practices
- Use proper state management

**Styling Guidelines**:
- Use Tailwind CSS utility classes
- Follow consistent naming conventions
- Implement responsive design
- Maintain accessibility standards

### Commit Message Format

```
type(scope): description

feat(auth): add OAuth authentication
fix(ui): resolve mobile layout issues
docs(readme): update installation instructions
style(components): improve button styling
refactor(store): optimize state management
test(api): add user endpoint tests
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Supabase** for the backend-as-a-service platform
- **Google AI** for the Gemini AI models
- **OpenAI** for the GPT models
- **Framer Motion** for the animation library
- **Zustand** for the state management solution

## 📞 Support

- **Documentation**: [docs.astral-ai.com](https://docs.astral-ai.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/astral-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/astral-ai/discussions)
- **Email**: support@astral-ai.com

---

**Made with ❤️ by the Astral AI Team**

*Transforming education through AI-powered gamification* 
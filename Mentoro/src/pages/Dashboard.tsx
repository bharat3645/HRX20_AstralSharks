import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Target,
  Trophy,
  Flame,
  TrendingUp,
  BarChart3,
  Brain,
  Code,
  CheckCircle,
  Play,
  ChevronRight,
  Activity,
  Users,
  Award,
  BookOpen,
  Sword
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import toast from 'react-hot-toast';

// Components
import StatsCard from '../components/ui/StatsCard';
import ProgressChart from '../components/ui/ProgressChart';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dailyGoals, setDailyGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const {
    currentStreak,
    activeQuests,
    engagementMetrics,
    updateStreak,
    addXP,
    user
  } = useGameStore();

  // Clean, professional user data
  const profile = user || {
    username: 'Demo User',
    avatar: '🚀',
    level: 5,
    xp: 2450,
    total_xp: 2450,
    streak_days: 7,
    rank: 'Silver II',
    battles_won: 12,
    quests_completed: 23
  };

  // Simplified daily goals
  const simplifiedDailyGoals = [
    {
      id: '1',
      title: 'Complete 1 Quest',
      description: 'Finish any learning activity',
      target: 1,
      current: 0,
      xp_reward: 100,
      completed: false,
      type: 'quests',
      icon: '🎯'
    },
    {
      id: '2',
      title: 'Practice 30 minutes',
      description: 'Spend focused time learning',
      target: 30,
      current: 15,
      xp_reward: 75,
      completed: false,
      type: 'study_time',
      icon: '📚'
    },
    {
      id: '3',
      title: 'Earn 200 XP',
      description: 'Complete activities to earn XP',
      target: 200,
      current: 200,
      xp_reward: 50,
      completed: true,
      type: 'xp',
      icon: '⚡'
    }
  ];

  useEffect(() => {
    loadDashboardData();
    updateStreak();
  }, [updateStreak]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setDailyGoals(simplifiedDailyGoals);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteGoal = async (goalId: string) => {
    try {
      const goal = dailyGoals.find(g => g.id === goalId);
      if (!goal || goal.completed) return;

      setDailyGoals(prev => prev.map(g => 
        g.id === goalId ? { ...g, completed: true, current: g.target } : g
      ));

      addXP(goal.xp_reward, 'daily_goal');
      toast.success(`Goal completed! +${goal.xp_reward} XP`);
    } catch (error: any) {
      toast.error('Failed to complete goal');
    }
  };

  const nextLevelProgress = profile ? Math.round(((profile.xp % 1000) / 1000) * 100) : 0;

  const quickActions = [
    {
      title: 'Start Learning',
      description: 'Begin a new quest',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'neon-blue',
      action: () => navigate('/skill-tree')
    },
    {
      title: 'Join Battle',
      description: 'Compete with others',
      icon: <Sword className="w-5 h-5" />,
      color: 'neon-red',
      action: () => navigate('/arena')
    },
    {
      title: 'AI Mentor',
      description: 'Get personalized help',
      icon: <Brain className="w-5 h-5" />,
      color: 'neon-purple',
      action: () => navigate('/ai-buddy')
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Clean Welcome Section */}
      <motion.div 
        className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-neon-blue/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center text-2xl">
              {profile.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-game">
                Welcome back, {profile.username}!
              </h1>
              <p className="text-neon-cyan/80 font-space">
                Level {profile.level} • {profile.rank} • {profile.streak_days} day streak
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400 font-space mb-1">Next Level Progress</div>
            <div className="w-32 bg-dark-700 rounded-full h-2 mb-2">
              <motion.div
                className="bg-gradient-to-r from-neon-blue to-neon-cyan h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${nextLevelProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="text-xs text-gray-500 font-space">{nextLevelProgress}% complete</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              onClick={action.action}
              className={`p-4 bg-gradient-to-r from-${action.color}/20 to-${action.color}/10 rounded-lg border border-${action.color}/30 hover:border-${action.color}/50 transition-all group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-${action.color} group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-white text-sm font-space">{action.title}</div>
                  <div className="text-xs text-gray-400 font-space">{action.description}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Clean Stats Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <StatsCard
          title="Total XP"
          value={profile.total_xp?.toLocaleString() || '0'}
          icon={<Zap className="w-6 h-6 text-neon-yellow" />}
          trend="+125 today"
          color="yellow"
        />
        <StatsCard
          title="Current Level"
          value={profile.level || 1}
          icon={<Trophy className="w-6 h-6 text-neon-purple" />}
          trend={`${nextLevelProgress}% to next`}
          color="purple"
        />
        <StatsCard
          title="Day Streak"
          value={profile.streak_days || currentStreak}
          icon={<Flame className="w-6 h-6 text-neon-red" />}
          trend="Keep it up!"
          color="pink"
        />
        <StatsCard
          title="Quests Done"
          value={profile.quests_completed || 0}
          icon={<Target className="w-6 h-6 text-neon-green" />}
          trend="+3 this week"
          color="green"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Goals */}
        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-neon-green/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center font-game">
              <Target className="w-5 h-5 mr-2 text-neon-green" />
              Daily Goals
            </h2>
            <span className="text-sm text-neon-green/80 font-space">
              {dailyGoals.filter(g => g.completed).length}/{dailyGoals.length}
            </span>
          </div>

          <div className="space-y-4">
            {dailyGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  goal.completed
                    ? 'bg-neon-green/10 border-neon-green/30'
                    : 'bg-black/20 border-dark-600 hover:border-neon-green/30'
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => !goal.completed && goal.current >= goal.target && handleCompleteGoal(goal.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{goal.icon}</span>
                    <h3 className="font-medium text-white font-space">{goal.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {goal.completed && <CheckCircle className="w-4 h-4 text-neon-green" />}
                    <span className="text-sm text-neon-yellow font-bold font-space">
                      +{goal.xp_reward} XP
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3 font-space">{goal.description}</p>
                <div className="w-full bg-black/40 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-neon-green to-neon-cyan h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-space">
                  <span>{goal.current}/{goal.target}</span>
                  <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Learning */}
        <motion.div
          className="lg:col-span-2 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-neon-cyan/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center font-game">
              <TrendingUp className="w-5 h-5 mr-2 text-neon-cyan" />
              Continue Learning
            </h2>
            <button 
              onClick={() => navigate('/skill-tree')}
              className="text-sm text-neon-cyan hover:text-white transition-colors font-space flex items-center"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {activeQuests.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
              <h3 className="text-lg font-medium mb-2 font-game text-white">Ready to Learn?</h3>
              <p className="text-gray-400 mb-6 font-space">Start your coding journey with a quest</p>
              <motion.button
                onClick={() => navigate('/skill-tree')}
                className="bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-neon-cyan/25 transition-all font-space"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4 inline mr-2" />
                Browse Quests
              </motion.button>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeQuests.slice(0, 2).map((quest, index) => (
                <motion.div
                  key={quest.id}
                  className="p-4 bg-black/20 rounded-lg border border-dark-600 hover:border-neon-cyan/50 transition-all cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  onClick={() => navigate('/skill-tree')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-neon-cyan/20 border border-neon-cyan/30">
                        <Code className="w-4 h-4 text-neon-cyan" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white font-space">{quest.title}</h3>
                        <p className="text-sm text-gray-400 font-space">{quest.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-neon-yellow font-space">+{quest.xpReward} XP</div>
                      <div className="text-xs text-gray-400 font-space">{quest.estimatedTime}min</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-black/40 rounded-full h-2 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-neon-cyan to-neon-blue h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${quest.progress}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-space">
                    <span>Progress: {quest.progress}%</span>
                    <span className="text-neon-cyan">Continue →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div
        className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-neon-purple/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center font-game">
            <BarChart3 className="w-5 h-5 mr-2 text-neon-purple" />
            Weekly Progress
          </h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-lg text-sm font-space border border-neon-purple/30">
              7 Days
            </button>
            <button className="px-3 py-1 bg-black/20 text-gray-400 rounded-lg text-sm hover:bg-black/40 font-space border border-gray-600">
              30 Days
            </button>
          </div>
        </div>
        <ProgressChart data={engagementMetrics} />
      </motion.div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-neon-yellow/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center font-game">
              <Activity className="w-5 h-5 mr-2 text-neon-yellow" />
              Recent Activity
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { desc: 'Completed JavaScript Fundamentals', xp: 150, time: '2 hours ago', icon: '🎯' },
              { desc: 'Won coding battle vs ReactNinja', xp: 100, time: '5 hours ago', icon: '⚔️' },
              { desc: 'Perfect flashcard session', xp: 75, time: '1 day ago', icon: '🧠' }
            ].map((activity, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{activity.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white font-space">{activity.desc}</p>
                    <p className="text-xs text-gray-400 font-space">{activity.time}</p>
                  </div>
                </div>
                <span className="text-neon-yellow font-bold font-space">+{activity.xp} XP</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community */}
        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-neon-pink/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center font-game">
              <Users className="w-5 h-5 mr-2 text-neon-pink" />
              Community
            </h2>
            <button 
              onClick={() => navigate('/emotions')}
              className="text-sm text-neon-pink hover:text-white transition-colors font-space flex items-center"
            >
              View Leaderboard <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { rank: 1, name: 'CodeMaster99', xp: 12450, avatar: '🏆' },
              { rank: 2, name: 'ReactNinja', xp: 11890, avatar: '🥈' },
              { rank: 3, name: 'You', xp: profile.total_xp, avatar: profile.avatar },
              { rank: 4, name: 'JSWarrior', xp: 10200, avatar: '🥉' }
            ].map((user, index) => (
              <motion.div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name === 'You' ? 'bg-neon-pink/10 border border-neon-pink/30' : 'bg-black/20'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{user.avatar}</span>
                  <div>
                    <p className="font-medium text-white font-space">#{user.rank} {user.name}</p>
                    <p className="text-xs text-gray-400 font-space">{user.xp.toLocaleString()} XP</p>
                  </div>
                </div>
                {user.name === 'You' && (
                  <Award className="w-4 h-4 text-neon-pink" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
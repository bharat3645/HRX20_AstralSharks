import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Swords, 
  Users, 
  Timer, 
  Trophy, 
  Zap,
  Play,
  Crown,
  Gamepad2,
  RefreshCw,
  Clock,
  Flame,
  Search,
  Award,
  ChevronRight,
  Globe,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { battleAPI } from '../services/api';
import BattleRoom from '../components/battle/BattleRoom';
import toast from 'react-hot-toast';

const CodingArena: React.FC = () => {
  const { profile } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'quick' | 'ranked' | 'custom'>('quick');
  const [activeBattles, setActiveBattles] = useState<any[]>([]);
  const [currentBattle, setCurrentBattle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [battleConfig, setBattleConfig] = useState({
    difficulty: 'easy',
    xp_wager: 100,
    time_limit: 1800
  });

  // Enhanced mock battles with more variety
  const mockBattles = [
    {
      id: 'battle-1',
      problem_title: 'Two Sum Challenge',
      problem_description: 'Find two numbers in an array that add up to a target sum',
      difficulty: 'easy',
      xp_wager: 150,
      status: 'waiting',
      mode: 'quick',
      max_players: 2,
      time_limit: 1800,
      creator: { username: 'CodeMaster99', avatar: '🏆' },
      participant_count: 1,
      created_at: new Date(Date.now() - 300000).toISOString(),
      tags: ['arrays', 'hash-map', 'algorithms']
    },
    {
      id: 'battle-2',
      problem_title: 'Binary Tree Traversal',
      problem_description: 'Implement in-order traversal of a binary tree',
      difficulty: 'medium',
      xp_wager: 300,
      status: 'active',
      mode: 'ranked',
      max_players: 4,
      time_limit: 2700,
      creator: { username: 'TreeExpert', avatar: '🌳' },
      participant_count: 3,
      created_at: new Date(Date.now() - 600000).toISOString(),
      tags: ['trees', 'recursion', 'data-structures']
    },
    {
      id: 'battle-3',
      problem_title: 'Dynamic Programming: Fibonacci',
      problem_description: 'Optimize Fibonacci sequence calculation using dynamic programming',
      difficulty: 'hard',
      xp_wager: 500,
      status: 'waiting',
      mode: 'custom',
      max_players: 2,
      time_limit: 3600,
      creator: { username: 'DPMaster', avatar: '🧠' },
      participant_count: 0,
      created_at: new Date(Date.now() - 120000).toISOString(),
      tags: ['dynamic-programming', 'optimization', 'algorithms']
    },
    {
      id: 'battle-4',
      problem_title: 'React Component Challenge',
      problem_description: 'Build a responsive todo list component with hooks',
      difficulty: 'medium',
      xp_wager: 250,
      status: 'waiting',
      mode: 'quick',
      max_players: 3,
      time_limit: 2400,
      creator: { username: 'ReactNinja', avatar: '⚛️' },
      participant_count: 1,
      created_at: new Date(Date.now() - 180000).toISOString(),
      tags: ['react', 'hooks', 'frontend']
    },
    {
      id: 'battle-5',
      problem_title: 'SQL Query Optimization',
      problem_description: 'Optimize complex SQL queries for better performance',
      difficulty: 'hard',
      xp_wager: 400,
      status: 'active',
      mode: 'ranked',
      max_players: 2,
      time_limit: 3000,
      creator: { username: 'SQLGuru', avatar: '🗄️' },
      participant_count: 2,
      created_at: new Date(Date.now() - 900000).toISOString(),
      tags: ['sql', 'database', 'optimization']
    },
    {
      id: 'battle-6',
      problem_title: 'Graph Algorithms: Shortest Path',
      problem_description: 'Implement Dijkstra\'s algorithm for shortest path finding',
      difficulty: 'hard',
      xp_wager: 600,
      status: 'waiting',
      mode: 'custom',
      max_players: 2,
      time_limit: 4200,
      creator: { username: 'GraphTheory', avatar: '🕸️' },
      participant_count: 0,
      created_at: new Date(Date.now() - 60000).toISOString(),
      tags: ['graphs', 'algorithms', 'shortest-path']
    },
    {
      id: 'battle-7',
      problem_title: 'API Design Challenge',
      problem_description: 'Design and implement a RESTful API with authentication',
      difficulty: 'medium',
      xp_wager: 350,
      status: 'waiting',
      mode: 'quick',
      max_players: 4,
      time_limit: 3600,
      creator: { username: 'APIArchitect', avatar: '🏗️' },
      participant_count: 2,
      created_at: new Date(Date.now() - 240000).toISOString(),
      tags: ['api', 'backend', 'authentication']
    },
    {
      id: 'battle-8',
      problem_title: 'CSS Animation Mastery',
      problem_description: 'Create smooth animations using pure CSS',
      difficulty: 'easy',
      xp_wager: 200,
      status: 'active',
      mode: 'quick',
      max_players: 6,
      time_limit: 1800,
      creator: { username: 'CSSArtist', avatar: '🎨' },
      participant_count: 4,
      created_at: new Date(Date.now() - 450000).toISOString(),
      tags: ['css', 'animation', 'frontend']
    },
    {
      id: 'battle-9',
      problem_title: 'Machine Learning: Linear Regression',
      problem_description: 'Implement linear regression from scratch',
      difficulty: 'hard',
      xp_wager: 700,
      status: 'waiting',
      mode: 'ranked',
      max_players: 2,
      time_limit: 5400,
      creator: { username: 'MLExpert', avatar: '🤖' },
      participant_count: 1,
      created_at: new Date(Date.now() - 90000).toISOString(),
      tags: ['machine-learning', 'algorithms', 'python']
    },
    {
      id: 'battle-10',
      problem_title: 'Microservices Architecture',
      problem_description: 'Design a scalable microservices system',
      difficulty: 'expert',
      xp_wager: 1000,
      status: 'waiting',
      mode: 'custom',
      max_players: 2,
      time_limit: 7200,
      creator: { username: 'SystemDesigner', avatar: '🏛️' },
      participant_count: 0,
      created_at: new Date(Date.now() - 30000).toISOString(),
      tags: ['microservices', 'architecture', 'system-design']
    }
  ];

  useEffect(() => {
    loadActiveBattles();
    const interval = setInterval(loadActiveBattles, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const loadActiveBattles = async () => {
    try {
      // Simulate API call with mock data
      setActiveBattles(mockBattles);
    } catch (error) {
      console.error('Error loading active battles:', error);
      toast.error('Failed to load battles');
    }
  };

  const arenaStats = {
    totalBattles: profile?.total_battles || 15,
    wins: profile?.battles_won || 12,
    winRate: profile?.total_battles ? Math.round((profile.battles_won / profile.total_battles) * 100) : 80,
    currentRank: profile?.rank || 'Silver II',
    highestStreak: 8,
    activePlayers: 247,
    totalRewards: 15750
  };

  const handleFindMatch = async () => {
    try {
      setLoading(true);
      
      // Simulate finding a match
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await battleAPI.createBattle({
        difficulty: battleConfig.difficulty,
        xp_wager: battleConfig.xp_wager,
        mode: selectedMode,
        time_limit: battleConfig.time_limit
      });
      
      toast.success('Battle created! Waiting for opponent...');
      setCurrentBattle(response.match_id);
      
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to create battle');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinBattle = async (battleId: string) => {
    try {
      setLoading(true);
      await battleAPI.joinBattle(battleId);
      setCurrentBattle(battleId);
      toast.success('Joined battle! Get ready to code!');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to join battle');
    } finally {
      setLoading(false);
    }
  };

  const handleExitBattle = () => {
    setCurrentBattle(null);
    loadActiveBattles();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      case 'medium': return 'text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10';
      case 'hard': return 'text-neon-red border-neon-red/30 bg-neon-red/10';
      case 'expert': return 'text-neon-purple border-neon-purple/30 bg-neon-purple/10';
      default: return 'text-neon-blue border-neon-blue/30 bg-neon-blue/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'text-neon-yellow';
      case 'active': return 'text-neon-green';
      case 'completed': return 'text-gray-400';
      default: return 'text-neon-blue';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return <Clock className="w-4 h-4" />;
      case 'active': return <Wifi className="w-4 h-4" />;
      case 'completed': return <Trophy className="w-4 h-4" />;
      default: return <WifiOff className="w-4 h-4" />;
    }
  };

  const filteredBattles = activeBattles.filter(battle => {
    const matchesSearch = battle.problem_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         battle.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'all' || battle.difficulty === difficultyFilter;
    const matchesStatus = statusFilter === 'all' || battle.status === statusFilter;
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  if (currentBattle) {
    return <BattleRoom matchId={currentBattle} onExit={handleExitBattle} />;
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <motion.div
        className="text-center py-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-neon-red/20 via-neon-pink/20 to-neon-purple/20 border border-neon-red/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 bg-star-field opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-red to-neon-pink flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Swords className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-red to-neon-pink bg-clip-text text-transparent font-game">
                Coding Arena
              </h1>
              <p className="text-gray-400 text-lg font-space">
                Battle other coders and prove your skills • {arenaStats.activePlayers} players online
              </p>
            </div>
          </div>
          
          {/* Live Stats */}
          <div className="flex justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-green">{filteredBattles.filter(b => b.status === 'active').length}</div>
              <div className="text-sm text-gray-400 font-space">Live Battles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-yellow">{filteredBattles.filter(b => b.status === 'waiting').length}</div>
              <div className="text-sm text-gray-400 font-space">Waiting</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple">{arenaStats.activePlayers}</div>
              <div className="text-sm text-gray-400 font-space">Online</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Arena Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-7 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-neon-yellow/20 text-center">
          <Trophy className="w-6 h-6 text-neon-yellow mx-auto mb-2" />
          <p className="text-2xl font-bold text-white font-game">{arenaStats.totalBattles}</p>
          <p className="text-sm text-gray-400 font-space">Total Battles</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-neon-green/20 text-center">
          <Trophy className="w-6 h-6 text-neon-green mx-auto mb-2" />
          <p className="text-2xl font-bold text-white font-game">{arenaStats.wins}</p>
          <p className="text-sm text-gray-400 font-space">Wins</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-neon-cyan/20 text-center">
          <Zap className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
          <p className="text-2xl font-bold text-white font-game">{arenaStats.winRate}%</p>
          <p className="text-sm text-gray-400 font-space">Win Rate</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-neon-purple/20 text-center">
          <Crown className="w-6 h-6 text-neon-purple mx-auto mb-2" />
          <p className="text-2xl font-bold text-white font-game">{arenaStats.currentRank}</p>
          <p className="text-sm text-gray-400 font-space">Current Rank</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-neon-pink/20 text-center">
          <Flame className="w-6 h-6 text-neon-pink mx-auto mb-2" />
          <p className="text-2xl font-bold text-white font-game">{arenaStats.highestStreak}</p>
          <p className="text-sm text-gray-400 font-space">Best Streak</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-neon-blue/20 text-center">
          <Users className="w-6 h-6 text-neon-blue mx-auto mb-2" />
          <p className="text-2xl font-bold text-white font-game">{arenaStats.activePlayers}</p>
          <p className="text-sm text-gray-400 font-space">Online</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-neon-orange/20 text-center">
          <Award className="w-6 h-6 text-neon-orange mx-auto mb-2" />
          <p className="text-2xl font-bold text-white font-game">{arenaStats.totalRewards.toLocaleString()}</p>
          <p className="text-sm text-gray-400 font-space">XP Earned</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Battle Creation */}
        <motion.div
          className="lg:col-span-1 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-neon-red/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center font-game">
            <Gamepad2 className="w-5 h-5 mr-2 text-neon-red animate-pulse" />
            Create Battle
          </h2>

          {/* Mode Selector */}
          <div className="space-y-3 mb-6">
            {(['quick', 'ranked', 'custom'] as const).map((mode) => (
              <motion.button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`w-full p-4 rounded-lg font-medium capitalize transition-all text-left border ${
                  selectedMode === mode
                    ? 'bg-gradient-to-r from-neon-red/20 to-neon-pink/20 border-neon-red/50 text-white'
                    : 'bg-black/20 border-dark-600 text-gray-400 hover:text-white hover:border-gray-500'
                } font-space`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{mode} Battle</div>
                    <div className="text-xs opacity-70">
                      {mode === 'quick' && 'Fast matchmaking'}
                      {mode === 'ranked' && 'Competitive ranking'}
                      {mode === 'custom' && 'Custom settings'}
                    </div>
                  </div>
                  {selectedMode === mode && <ChevronRight className="w-4 h-4" />}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Battle Configuration */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-space">Difficulty</label>
                <select 
                  value={battleConfig.difficulty}
                  onChange={(e) => setBattleConfig({...battleConfig, difficulty: e.target.value})}
                  className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-white font-space"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-space">XP Wager</label>
                <select 
                  value={battleConfig.xp_wager}
                  onChange={(e) => setBattleConfig({...battleConfig, xp_wager: parseInt(e.target.value)})}
                  className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-white font-space"
                >
                  <option value={100}>100 XP</option>
                  <option value={250}>250 XP</option>
                  <option value={500}>500 XP</option>
                  <option value={1000}>1000 XP</option>
                </select>
              </div>
            </div>

            <motion.button
              onClick={handleFindMatch}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-neon-red to-neon-pink rounded-lg font-medium text-white hover:shadow-lg hover:shadow-neon-red/25 transition-all disabled:opacity-50 font-space"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full inline mr-2" />
                  Creating Battle...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 inline mr-2" />
                  Start Battle
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Active Battles */}
        <motion.div
          className="lg:col-span-2 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-neon-cyan/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center font-game">
              <Globe className="w-5 h-5 mr-2 text-neon-cyan animate-pulse" />
              Live Battles ({filteredBattles.length})
            </h2>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={loadActiveBattles}
                className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search battles..."
                className="bg-dark-800 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:border-neon-cyan focus:outline-none w-48 font-space"
              />
            </div>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-white focus:border-neon-cyan focus:outline-none font-space"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-white focus:border-neon-cyan focus:outline-none font-space"
            >
              <option value="all">All Status</option>
              <option value="waiting">Waiting</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredBattles.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Swords className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-space">No battles match your filters</p>
                <p className="text-sm font-space">Try adjusting your search criteria</p>
              </div>
            ) : (
              filteredBattles.map((battle) => (
                <motion.div
                  key={battle.id}
                  className="p-4 bg-black/20 rounded-lg border border-dark-600 hover:border-neon-cyan/50 transition-all cursor-pointer group"
                  whileHover={{ scale: 1.01, y: -1 }}
                  onClick={() => battle.status === 'waiting' && handleJoinBattle(battle.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-white font-space">{battle.problem_title}</h3>
                        <div className={`flex items-center space-x-1 ${getStatusColor(battle.status)}`}>
                          {getStatusIcon(battle.status)}
                          <span className="text-xs capitalize font-space">{battle.status}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2 font-space">{battle.problem_description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {battle.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full border border-neon-blue/30 font-space"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(battle.difficulty)} font-space`}>
                        {battle.difficulty.toUpperCase()}
                      </span>
                      <div className="text-xs text-gray-400 text-right font-space">
                        <div>by {battle.creator.username} {battle.creator.avatar}</div>
                        <div>{new Date(battle.created_at).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-neon-yellow">
                        <Zap className="w-3 h-3 mr-1" />
                        {battle.xp_wager} XP
                      </div>
                      <div className="flex items-center text-neon-cyan">
                        <Users className="w-3 h-3 mr-1" />
                        {battle.participant_count}/{battle.max_players}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Timer className="w-3 h-3 mr-1" />
                        {Math.floor(battle.time_limit / 60)}min
                      </div>
                    </div>
                    {battle.status === 'waiting' && (
                      <motion.div
                        className="text-neon-green font-medium group-hover:text-white transition-colors font-space"
                        whileHover={{ scale: 1.05 }}
                      >
                        Join Battle →
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingArena;
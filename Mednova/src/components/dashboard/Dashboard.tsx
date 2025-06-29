import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const Dashboard: React.FC = () => {
  const { user, selectedDomain, userProgress } = useGameStore();

  if (!user || !selectedDomain) return null;

  const stats = [
    {
      label: 'Total XP',
      value: userProgress?.total_xp || 0,
      icon: TrendingUp,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20'
    },
    {
      label: 'Current Level',
      value: user.level,
      icon: Award,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20'
    },
    {
      label: 'Streak',
      value: `${user.streak} days`,
      icon: Target,
      color: 'text-green-400',
      bg: 'bg-green-500/20'
    },
    {
      label: 'Quests Completed',
      value: userProgress?.completed_quests.length || 0,
      icon: Clock,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome back, {user.username}!
        </h1>
        <p className="text-xl text-gray-400">
          Continue your journey in <span className="text-blue-400 font-semibold">{selectedDomain.name}</span>
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Quests */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Today's Quests</h2>
            <div className="space-y-3">
              {[
                { title: 'Complete 5 Flashcards', xp: 100, difficulty: 'Easy' },
                { title: 'Finish Project Module', xp: 500, difficulty: 'Medium' },
                { title: 'AI Buddy Chat Session', xp: 200, difficulty: 'Easy' }
              ].map((quest, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{quest.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge size="sm" variant="info">{quest.difficulty}</Badge>
                      <span className="text-sm text-gray-400">{quest.xp} XP</span>
                    </div>
                  </div>
                  <Button size="sm">Start</Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Skill Progress</h2>
            <div className="space-y-4">
              {selectedDomain.skills.slice(0, 4).map((skill, index) => {
                const progress = Math.random() * 100; // Mock progress
                return (
                  <div key={skill}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">{skill}</span>
                      <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Start Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { title: 'Practice Flashcards', desc: 'Review key concepts', action: 'Start Practice' },
          { title: 'New Project', desc: 'Build something amazing', action: 'Generate Project' },
          { title: 'AI Mentor Chat', desc: 'Get personalized guidance', action: 'Start Chat' }
        ].map((item, index) => (
          <Card key={index} hover className="p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 mb-4">{item.desc}</p>
            <Button variant="outline" className="w-full">{item.action}</Button>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
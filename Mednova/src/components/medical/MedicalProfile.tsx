import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Award, 
  Target, 
  Activity, 
  Calendar,
  BookOpen,
  Stethoscope,
  Brain,
  TrendingUp,
  Star
} from 'lucide-react';
import { useMedicalStore } from '../../store/medicalStore';
import { medicalDomains } from '../../data/medicalDomains';
import { MedicalDomainSelector } from './MedicalDomainSelector';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const MedicalProfile: React.FC = () => {
  const { user, selectedDomain, setSelectedDomain } = useMedicalStore();
  const [isEditingDomain, setIsEditingDomain] = useState(false);
  const [tempDomain, setTempDomain] = useState(selectedDomain);

  if (!user || !selectedDomain) return null;

  const handleSaveDomain = () => {
    if (tempDomain) {
      setSelectedDomain(tempDomain);
      setIsEditingDomain(false);
    }
  };

  const handleCancelEdit = () => {
    setTempDomain(selectedDomain);
    setIsEditingDomain(false);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Intern': return 'text-blue-400 bg-blue-900/20 border-blue-700/30';
      case 'Resident': return 'text-emerald-400 bg-emerald-900/20 border-emerald-700/30';
      case 'Consultant': return 'text-purple-400 bg-purple-900/20 border-purple-700/30';
      case 'Nova Surgeon': return 'text-amber-400 bg-amber-900/20 border-amber-700/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-700/30';
    }
  };

  const getRankBg = (rank: string) => {
    switch (rank) {
      case 'Intern': return 'bg-blue-500';
      case 'Resident': return 'bg-emerald-500';
      case 'Consultant': return 'bg-purple-500';
      case 'Nova Surgeon': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const stats = [
    {
      label: 'Total XP',
      value: user.xp,
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-900/20',
      border: 'border-amber-700/30'
    },
    {
      label: 'Current Level',
      value: user.level,
      icon: TrendingUp,
      color: 'text-purple-400',
      bg: 'bg-purple-900/20',
      border: 'border-purple-700/30'
    },
    {
      label: 'Study Streak',
      value: `${user.streak} days`,
      icon: Target,
      color: 'text-emerald-400',
      bg: 'bg-emerald-900/20',
      border: 'border-emerald-700/30'
    },
    {
      label: 'Cases Completed',
      value: 12,
      icon: Stethoscope,
      color: 'text-blue-400',
      bg: 'bg-blue-900/20',
      border: 'border-blue-700/30'
    }
  ];

  const achievements = [
    { name: 'First Case', description: 'Completed your first patient case', icon: '🏥', earned: true },
    { name: 'Study Streak', description: '7-day study streak', icon: '🔥', earned: true },
    { name: 'Cardiology Expert', description: 'Mastered 50 cardiology flashcards', icon: '❤️', earned: false },
    { name: 'Emergency Hero', description: 'Completed 10 emergency cases', icon: '🚨', earned: false },
    { name: 'Research Scholar', description: 'Published 5 study notes', icon: '📚', earned: true },
    { name: 'Mentor', description: 'Helped 10 fellow students', icon: '👨‍🏫', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed Chest Pain Case', time: '2 hours ago', xp: 300, type: 'case' },
    { action: 'Studied Cardiology Flashcards', time: '5 hours ago', xp: 150, type: 'study' },
    { action: 'Created Study Note', time: '1 day ago', xp: 100, type: 'note' },
    { action: 'AI Mentor Session', time: '2 days ago', xp: 200, type: 'mentor' },
    { action: 'Completed Pediatric Quiz', time: '3 days ago', xp: 250, type: 'quiz' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      <div className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">Dr. {user.username}</h1>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{user.email}</p>
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getRankColor(user.rank)} border`}>
                      {user.rank}
                    </Badge>
                    <Badge variant="info">Level {user.level}</Badge>
                    <Badge variant="success">{user.streak} day streak</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Member since</p>
                  <p className="text-lg font-semibold text-white">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={stat.label} className={`p-6 ${stat.bg} border ${stat.border} backdrop-blur-sm`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Medical Specialty */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Medical Specialty</h2>
                  {!isEditingDomain && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit}
                      onClick={() => setIsEditingDomain(true)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Change Specialty
                    </Button>
                  )}
                </div>

                {isEditingDomain ? (
                  <div>
                    <MedicalDomainSelector
                      domains={medicalDomains}
                      selectedDomain={tempDomain}
                      onSelectDomain={setTempDomain}
                      title="Select a New Medical Specialty"
                      subtitle="Choose a different field to focus your learning on"
                    />
                    <div className="flex items-center justify-end space-x-3 mt-6">
                      <Button
                        variant="ghost"
                        icon={X}
                        onClick={handleCancelEdit}
                        className="text-gray-300 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        icon={Save}
                        onClick={handleSaveDomain}
                        disabled={!tempDomain}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedDomain.gradient} flex items-center justify-center shadow-md`}>
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {selectedDomain.name}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {selectedDomain.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedDomain.skills.map((skill) => (
                          <Badge key={skill} variant="info" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
                        <p className="text-sm text-blue-300">
                          <strong>Specialty Area:</strong> {selectedDomain.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-6">Achievements</h2>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        achievement.earned
                          ? 'bg-emerald-900/20 border border-emerald-700/30'
                          : 'bg-gray-700/30 border border-gray-600 opacity-60'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.earned ? 'text-emerald-300' : 'text-gray-400'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-emerald-500' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="p-6 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'case' ? 'bg-red-900/30 border border-red-700/30' :
                        activity.type === 'study' ? 'bg-blue-900/30 border border-blue-700/30' :
                        activity.type === 'note' ? 'bg-green-900/30 border border-green-700/30' :
                        activity.type === 'mentor' ? 'bg-purple-900/30 border border-purple-700/30' :
                        'bg-amber-900/30 border border-amber-700/30'
                      }`}>
                        {activity.type === 'case' && <Stethoscope className="w-5 h-5 text-red-400" />}
                        {activity.type === 'study' && <BookOpen className="w-5 h-5 text-blue-400" />}
                        {activity.type === 'note' && <Edit className="w-5 h-5 text-green-400" />}
                        {activity.type === 'mentor' && <Brain className="w-5 h-5 text-purple-400" />}
                        {activity.type === 'quiz' && <Target className="w-5 h-5 text-amber-400" />}
                      </div>
                      <div>
                        <p className="font-medium text-white">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">
                      +{activity.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
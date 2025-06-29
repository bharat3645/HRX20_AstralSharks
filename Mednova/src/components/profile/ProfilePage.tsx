import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, X } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { domains } from '../../data/domains';
import { DomainSelector } from '../domain/DomainSelector';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ProfilePage: React.FC = () => {
  const { user, selectedDomain, setSelectedDomain } = useGameStore();
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{user.username}</h1>
              <p className="text-gray-400">Level {user.level} • {user.xp} XP</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="success">
                  {user.streak} day streak
                </Badge>
                <Badge variant="info">
                  {selectedDomain.name}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Domain Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Learning Domain</h2>
            {!isEditingDomain && (
              <Button
                variant="outline"
                size="sm"
                icon={Edit}
                onClick={() => setIsEditingDomain(true)}
              >
                Change Domain
              </Button>
            )}
          </div>

          {isEditingDomain ? (
            <div>
              <DomainSelector
                domains={domains}
                selectedDomain={tempDomain}
                onSelectDomain={setTempDomain}
                title="Select a New Domain"
                subtitle="Choose a different field to focus your learning on"
              />
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="ghost"
                  icon={X}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  icon={Save}
                  onClick={handleSaveDomain}
                  disabled={!tempDomain}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${selectedDomain.gradient} flex items-center justify-center`}>
                {/* Domain icon would go here */}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {selectedDomain.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {selectedDomain.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedDomain.skills.map((skill) => (
                    <Badge key={skill} variant="info" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total XP', value: user.xp, color: 'blue' },
          { label: 'Current Level', value: user.level, color: 'yellow' },
          { label: 'Learning Streak', value: `${user.streak} days`, color: 'green' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="p-6 text-center">
              <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { action: 'Completed flashcard set', time: '2 hours ago', xp: 150 },
              { action: 'Finished project milestone', time: '1 day ago', xp: 500 },
              { action: 'Had AI mentor session', time: '2 days ago', xp: 200 },
              { action: 'Achieved 7-day streak', time: '3 days ago', xp: 300 }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="text-white">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
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
  );
};
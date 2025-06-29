import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Domain } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface DomainSelectorProps {
  domains: Domain[];
  selectedDomain: Domain | null;
  onSelectDomain: (domain: Domain) => void;
  title?: string;
  subtitle?: string;
}

export const DomainSelector: React.FC<DomainSelectorProps> = ({
  domains,
  selectedDomain,
  onSelectDomain,
  title = "Choose Your Learning Domain",
  subtitle = "Select the field you want to master and begin your personalized learning journey"
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain, index) => {
          const IconComponent = Icons[domain.icon as keyof typeof Icons] as React.ComponentType<any>;
          const isSelected = selectedDomain?.id === domain.id;

          return (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hover
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? `border-${domain.color}-500 bg-gradient-to-br from-${domain.color}-500/10 to-${domain.color}-600/5` 
                    : 'hover:border-gray-600'
                }`}
                onClick={() => onSelectDomain(domain)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${domain.gradient} flex items-center justify-center flex-shrink-0`}>
                    {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {domain.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {domain.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {domain.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} size="sm" variant="info">
                          {skill}
                        </Badge>
                      ))}
                      {domain.skills.length > 3 && (
                        <Badge size="sm" variant="default">
                          +{domain.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <Icons.Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
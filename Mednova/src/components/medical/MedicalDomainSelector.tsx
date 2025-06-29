import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { MedicalDomain } from '../../types/medical';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface MedicalDomainSelectorProps {
  domains: MedicalDomain[];
  selectedDomain: MedicalDomain | null;
  onSelectDomain: (domain: MedicalDomain) => void;
  title?: string;
  subtitle?: string;
}

export const MedicalDomainSelector: React.FC<MedicalDomainSelectorProps> = ({
  domains,
  selectedDomain,
  onSelectDomain,
  title = "Choose Your Medical Specialty",
  subtitle = "Select your area of focus for personalized medical learning"
}) => {
  // Group domains by specialty
  const basicSciences = domains.filter(d => d.specialty === 'Basic Sciences');
  const clinicalMedicine = domains.filter(d => d.specialty === 'Clinical Medicine');

  const DomainGrid = ({ domains: domainList, title: gridTitle }: { domains: MedicalDomain[], title: string }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-white mb-2">{gridTitle}</h3>
      <p className="text-bone-300 mb-6 font-medium">
        {gridTitle === 'Basic Medical Sciences' 
          ? 'Foundation knowledge for medical practice'
          : 'Clinical specialties and patient care'
        }
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domainList.map((domain, index) => {
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
                className={`p-6 cursor-pointer transition-all duration-300 border-2 backdrop-blur-lg relative overflow-hidden group ${
                  isSelected 
                    ? `border-bio-500 bg-gradient-to-br from-bio-900/20 to-medical-900/20 shadow-bio` 
                    : 'border-bone-600/30 hover:border-bio-500/50 hover:shadow-medical bg-gradient-to-br from-bone-800/50 to-bone-700/50'
                }`}
                onClick={() => onSelectDomain(domain)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${domain.gradient} flex items-center justify-center flex-shrink-0 shadow-glow-sm group-hover:animate-heartbeat transition-transform duration-200`}>
                    {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-bio-400 transition-colors">
                      {domain.name}
                    </h4>
                    <p className="text-sm text-bone-300 mb-4 line-clamp-2">
                      {domain.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {domain.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} size="sm" variant="info" className="bg-medical-500/20 text-medical-400 border-medical-600/30 font-medium">
                          {skill}
                        </Badge>
                      ))}
                      {domain.skills.length > 3 && (
                        <Badge size="sm" variant="default" className="bg-bone-700/50 text-bone-300 border-bone-600/30">
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
                    className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-bio-500 to-medical-600 rounded-full flex items-center justify-center shadow-glow-sm"
                  >
                    <Icons.Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
                
                {isSelected && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${domain.gradient} opacity-5 rounded-xl`} />
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-bio-400 via-medical-400 to-neural-400 bg-clip-text text-transparent mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-bone-300 max-w-3xl mx-auto font-medium"
        >
          {subtitle}
        </motion.p>
      </div>

      <DomainGrid domains={basicSciences} title="Basic Medical Sciences" />
      <DomainGrid domains={clinicalMedicine} title="Clinical Medicine" />
    </div>
  );
};
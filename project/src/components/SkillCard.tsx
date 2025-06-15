import React from 'react';
import { Skill } from '../types';
import { Star, Clock, Award } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  type: 'offered' | 'wanted';
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, type, className = '' }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Star className="h-3 w-3" />;
      case 'intermediate':
        return <Award className="h-3 w-3" />;
      case 'advanced':
        return <Clock className="h-3 w-3" />;
      default:
        return <Star className="h-3 w-3" />;
    }
  };

  const getTypeStyle = (type: string) => {
    return type === 'offered' 
      ? 'border-l-4 border-l-teal-500 bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30' 
      : 'border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30';
  };

  return (
    <div className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${getTypeStyle(type)} transition-all duration-200 ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{skill.name}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getLevelColor(skill.level)}`}>
          {getLevelIcon(skill.level)}
          <span className="capitalize">{skill.level}</span>
        </div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{skill.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          {skill.category}
        </span>
        {skill.yearsOfExperience && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            {skill.yearsOfExperience} years
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
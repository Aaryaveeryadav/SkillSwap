import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
          <BookOpen className="text-white h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading SkillSwap...</h2>
        <p className="text-gray-500 dark:text-gray-400">Preparing your skill exchange experience</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
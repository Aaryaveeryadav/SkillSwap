import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="text-white h-8 w-8" />
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-transparent mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading SkillSwap...</h2>
        <p className="text-gray-500 dark:text-gray-400">Preparing your skill exchange experience</p>
        
        {/* Progress dots */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
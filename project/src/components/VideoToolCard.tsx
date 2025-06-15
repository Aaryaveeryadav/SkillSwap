import React from 'react';
import { VideoTool } from '../types';
import { ExternalLink, Star, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface VideoToolCardProps {
  tool: VideoTool;
  className?: string;
}

const VideoToolCard: React.FC<VideoToolCardProps> = ({ tool, className = '' }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anime':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'game':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ai-animation':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group ${className}`}>
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h3>
            <p className="text-sm text-gray-600">{tool.type}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{tool.rating}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>
              {tool.difficulty}
            </span>
          </div>
        </div>

        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(tool.category)}`}>
          <Zap className="h-3 w-3 mr-1" />
          {tool.category.replace('-', ' ').toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Features */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
          <div className="flex flex-wrap gap-2">
            {tool.features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Free Plan */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            {tool.watermark ? (
              <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            )}
            <h4 className="font-semibold text-gray-900">Free Plan</h4>
          </div>
          <p className="text-sm text-gray-600">{tool.freePlan}</p>
        </div>

        {/* Good For */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Best For</h4>
          <p className="text-sm text-gray-600">{tool.goodFor}</p>
        </div>

        {/* Action Button */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group"
        >
          Try {tool.name}
          <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default VideoToolCard;
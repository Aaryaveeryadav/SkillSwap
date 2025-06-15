import React, { useState } from 'react';
import { animeVideoTools, gameVideoTools, aiAnimationTools } from '../data/videoTools';
import VideoToolCard from './VideoToolCard';
import { Sparkles, Gamepad2, Zap, Filter } from 'lucide-react';

const ToolsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'anime' | 'game' | 'ai-animation'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const allTools = [...animeVideoTools, ...gameVideoTools, ...aiAnimationTools];
  
  const filteredTools = allTools.filter(tool => {
    const categoryMatch = activeCategory === 'all' || tool.category === activeCategory;
    const difficultyMatch = difficultyFilter === 'all' || tool.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  const categories = [
    { id: 'all', name: 'All Tools', icon: Filter, count: allTools.length },
    { id: 'anime', name: 'Anime Video', icon: Sparkles, count: animeVideoTools.length },
    { id: 'game', name: 'Game Video', icon: Gamepad2, count: gameVideoTools.length },
    { id: 'ai-animation', name: 'AI Animation', icon: Zap, count: aiAnimationTools.length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Video Generation Tools
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the best free and trial tools for creating anime videos, game content, and AI animations
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {category.name}
                <span className="ml-2 px-2 py-1 bg-black bg-opacity-20 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Difficulty Filter */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 p-1">
            <span className="text-sm font-medium text-gray-700 px-3">Difficulty:</span>
            {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setDifficultyFilter(difficulty as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 capitalize ${
                  difficultyFilter === difficulty
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTools.map((tool) => (
          <VideoToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-16 bg-gradient-to-r from-teal-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">💡 Pro Tips</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-teal-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">AI-First Approach</h4>
            <p className="text-sm text-gray-600">
              Use text-to-video AI tools (like Kaiber or Pika) for short concept videos or experimental clips.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Template Power</h4>
            <p className="text-sm text-gray-600">
              Use template-based tools (like CapCut, Renderforest) for game intros and anime edits.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Combine Tools</h4>
            <p className="text-sm text-gray-600">
              Generate AI art on Craiyon or Leonardo AI, then animate with CapCut or Kaiber.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;
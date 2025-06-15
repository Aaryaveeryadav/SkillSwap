import React from 'react';
import { Match } from '../types';
import MatchCard from './MatchCard';
import { Users, TrendingUp } from 'lucide-react';

interface MatchesGridProps {
  matches: Match[];
  className?: string;
}

const MatchesGrid: React.FC<MatchesGridProps> = ({ matches, className = '' }) => {
  const sortedMatches = [...matches].sort((a, b) => b.compatibility - a.compatibility);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="h-6 w-6 text-teal-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Your Matches</h2>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          Sorted by compatibility
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600">Try adjusting your filters or adding more skills to your profile.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesGrid;
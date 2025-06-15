import React, { useState } from 'react';
import { Match } from '../types';
import { MapPin, Star, ArrowLeftRight, Clock, MessageCircle, Heart } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  className?: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, className = '' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 90) return 'text-green-600 bg-green-100';
    if (compatibility >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const handleSaveProfile = () => {
    // Toggle the saved state
    setIsLiked(!isLiked);
    
    // Show animation when saving (not when unsaving)
    if (!isLiked) {
      setShowHeartAnimation(true);
      // Reset animation after it completes
      setTimeout(() => {
        setShowHeartAnimation(false);
      }, 600);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group ${className}`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={match.user.avatar}
              alt={match.user.name}
              className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{match.user.name}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{match.distance} away</span>
              </div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{match.user.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({match.user.reviewCount})</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${getCompatibilityColor(match.compatibility)}`}>
              {match.compatibility}% match
            </div>
            {match.availabilityMatch && (
              <div className="flex items-center text-green-600 text-xs mt-2">
                <Clock className="h-3 w-3 mr-1" />
                Available now
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Skill Exchange */}
      <div className="px-6 pb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Potential Skill Exchange</h4>
        <div className="space-y-3">
          {match.sharedSkills.map((exchange, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium text-teal-600">They teach:</span>
                  <span className="ml-2 text-gray-900">{exchange.theyTeach.name}</span>
                </div>
              </div>
              <ArrowLeftRight className="h-4 w-4 text-gray-400 mx-3" />
              <div className="flex-1 text-right">
                <div className="text-sm">
                  <span className="font-medium text-purple-600">You teach:</span>
                  <span className="ml-2 text-gray-900">{exchange.youTeach.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        <div className="flex space-x-3">
          <button className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Connect
          </button>
          <button 
            onClick={handleSaveProfile}
            className={`relative px-4 py-2 border rounded-lg transition-all duration-300 overflow-hidden cursor-pointer ${
              isLiked 
                ? 'border-red-300 text-red-600 bg-red-50 hover:bg-red-100' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Heart className={`h-4 w-4 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            
            {/* Heart Animation */}
            {showHeartAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Heart className="h-8 w-8 text-red-500 fill-red-500 animate-ping" />
                <Heart className="absolute h-6 w-6 text-red-500 fill-red-500 animate-bounce" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { MapPin, Star, Calendar, CheckCircle, MessageCircle, Heart, Video, Shield, X } from 'lucide-react';
import SkillCard from './SkillCard';
import VideoCallButton from './video/VideoCallButton';
import { useAuth } from '../contexts/AuthContext';

interface UserCardProps {
  user: User;
  showSkills?: boolean;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, showSkills = true, className = '' }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

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

  const handleMessage = () => {
    navigate(`/messages/${user.id}`);
  };

  if (!currentUser) return null;

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-50 to-purple-50 dark:from-gray-700 dark:to-gray-800">
          <div className="flex items-start space-x-4">
            <button onClick={() => setShowProfileModal(true)} className="focus:outline-none">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg hover:scale-105 transition-transform cursor-pointer"
              />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Link to={`/user/${user.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h3>
                </Link>
                {user.verified && (
                  <CheckCircle className="h-5 w-5 text-teal-500" />
                )}
                {user.subscription === 'premium' && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                )}
                <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{user.location}</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.rating}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({user.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  Member since {new Date(user.joinedDate).getFullYear()}
                </div>
              </div>
              
              {/* Learning Mode Badge */}
              <div className="mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.learningMode === 'online' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                  user.learningMode === 'offline' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                }`}>
                  {user.learningMode === 'online' ? '💻 Online Only' :
                   user.learningMode === 'offline' ? '🤝 In-Person Only' :
                   '🔄 Online & In-Person'}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={handleMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </button>
              
              {/* Video Call Button - Only show if user supports online mode */}
              <VideoCallButton
                otherUser={user}
                currentUser={currentUser}
                className="text-sm px-4 py-2"
              />
              
              <button 
                onClick={handleSaveProfile}
                className={`relative border px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer ${
                  isLiked 
                    ? 'border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Heart className={`h-4 w-4 mr-1 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {isLiked ? 'Saved' : 'Save'}
                
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
          <p className="text-gray-700 dark:text-gray-300 mt-4 text-sm leading-relaxed">{user.bio}</p>
        </div>

        {/* Skills */}
        {showSkills && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                  Skills Offered ({user.skillsOffered.length})
                </h4>
                <div className="space-y-2">
                  {user.skillsOffered.slice(0, 2).map((skill) => (
                    <SkillCard key={skill.id} skill={skill} type="offered" />
                  ))}
                  {user.skillsOffered.length > 2 && (
                    <Link
                      to={`/user/${user.id}`}
                      className="block text-center py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      +{user.skillsOffered.length - 2} more skills
                    </Link>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  Skills Wanted ({user.skillsWanted.length})
                </h4>
                <div className="space-y-2">
                  {user.skillsWanted.slice(0, 2).map((skill) => (
                    <SkillCard key={skill.id} skill={skill} type="wanted" />
                  ))}
                  {user.skillsWanted.length > 2 && (
                    <Link
                      to={`/user/${user.id}`}
                      className="block text-center py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      +{user.skillsWanted.length - 2} more skills
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Availability</h4>
              <div className="flex flex-wrap gap-2">
                {user.availability.map((time) => (
                  <span
                    key={time}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm capitalize"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Picture Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white text-xl font-bold">{user.name}</h3>
              <p className="text-gray-200 text-sm">{user.location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
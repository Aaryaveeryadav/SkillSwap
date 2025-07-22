import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockUsers, mockReviews } from '../data/mockData'; // Use mockUsers
import { 
  MapPin, 
  Star, 
  Calendar, 
  CheckCircle, 
  MessageCircle, 
  Heart,
  Clock,
  Award,
  Users,
  Video,
  Phone,
  MoreVertical,
  Flag,
  UserX,
  X
} from 'lucide-react';
import SkillCard from '../components/SkillCard';
import VideoCallButton from '../components/video/VideoCallButton';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  // Find user from mockUsers, as Supabase is removed
  const user = mockUsers.find(u => u.id === id); 
  const userReviews = mockReviews.filter(r => r.reviewerId === id); // mockReviews still used
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
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
    if (user) {
      navigate(`/messages/${user.id}`);
    }
  };

  const makePhoneCall = () => {
    if (!user || !user.phone) {
      // Replaced alert with a custom message box as per instructions
      const messageBox = document.createElement('div');
      messageBox.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
      messageBox.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p class="text-gray-900 dark:text-gray-100 mb-4">Phone number not available for this user.</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg" onclick="this.parentNode.parentNode.remove()">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      return;
    }
    
    // Use tel: protocol to initiate phone call
    window.location.href = `tel:${user.phone}`;
  };

  const handleReport = () => {
    if (user) {
      navigate(`/report?user=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`);
    }
  };

  const blockUser = () => {
    // Replaced confirm with a custom message box as per instructions
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    messageBox.innerHTML = `
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <p class="text-gray-900 dark:text-gray-100 mb-4">Are you sure you want to block ${user?.name}? You won't see their profile or receive messages from them anymore.</p>
        <div class="flex justify-center space-x-4">
          <button class="bg-red-500 text-white px-4 py-2 rounded-lg" onclick="this.parentNode.parentNode.parentNode.remove(); alert('${user?.name} has been blocked.'); window.location.href='/browse-skills';">Yes, Block</button>
          <button class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg" onclick="this.parentNode.parentNode.parentNode.remove()">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(messageBox);
  };

  if (!user || !currentUser) { // currentUser check remains for protected actions
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <button onClick={() => setShowProfileModal(true)} className="focus:outline-none">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                />
              </button>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
                  {user.verified && (
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  )}
                  {user.subscription === 'premium' && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      PREMIUM
                    </div>
                  )}
                  <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-medium">{user.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">({user.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Member since {new Date(user.joinedDate).getFullYear()}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{user.completedExchanges} exchanges</span>
                  </div>
                </div>
                
                {/* Learning Mode Badge */}
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.learningMode === 'online' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                    user.learningMode === 'offline' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  }`}>
                    {user.learningMode === 'online' ? '💻 Online Only' :
                     user.learningMode === 'offline' ? '🤝 In-Person Only' :
                     '🔄 Online & In-Person'}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{user.bio}</p>
              </div>
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={handleMessage}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </button>
                
                {/* Video Call Button */}
                <VideoCallButton
                  otherUser={user}
                  currentUser={currentUser}
                  className="px-6 py-3"
                />
                
                <button 
                  onClick={handleSaveProfile}
                  className={`relative border px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer ${
                    isLiked 
                      ? 'border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {isLiked ? 'Saved Profile' : 'Save Profile'}
                  
                  {/* Heart Animation */}
                  {showHeartAnimation && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Heart className="h-12 w-12 text-red-500 fill-red-500 animate-ping" />
                      <Heart className="absolute h-8 w-8 text-red-500 fill-red-500 animate-bounce" />
                      <Heart className="absolute h-6 w-6 text-red-500 fill-red-500 animate-pulse" />
                    </div>
                  )}
                </button>
                
                {/* More Options */}
                <div className="relative">
                  <button
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                    className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <MoreVertical className="h-5 w-5 mr-2" />
                    More Options
                  </button>
                  
                  {showMoreOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <button
                        onClick={makePhoneCall}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Phone
                      </button>
                      
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      
                      <button
                        onClick={() => {
                          handleReport();
                          setShowMoreOptions(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                      >
                        <Flag className="h-4 w-4 mr-2" />
                        Report User
                      </button>
                      
                      <button
                        onClick={() => {
                          blockUser();
                          setShowMoreOptions(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Block User
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-3"></span>
              Skills I Offer ({user.skillsOffered.length})
            </h2>
            <div className="space-y-3">
              {user.skillsOffered.map((skill) => (
                <SkillCard key={skill.id} skill={skill} type="offered" />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
              Skills I Want ({user.skillsWanted.length})
            </h2>
            <div className="space-y-3">
              {user.skillsWanted.map((skill) => (
                <SkillCard key={skill.id} skill={skill} type="wanted" />
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Availability
          </h2>
          <div className="flex flex-wrap gap-3">
            {user.availability.map((time) => (
              <span
                key={time}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium capitalize"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Reviews ({userReviews.length})
          </h2>
          {userReviews.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">No reviews yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {userReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.reviewerAvatar}
                      alt={review.reviewerName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{review.reviewerName}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Skill: {review.skillTaught}</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Click outside to close dropdown */}
        {showMoreOptions && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMoreOptions(false)}
          />
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

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../lib/supabase'; // Removed Supabase import
import MessageCenter from '../messaging/MessageCenter';
import { 
  BookOpen, 
  Users, 
  MessageCircle, 
  Star, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Target,
  Zap,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { Message, User } from '../../types'; // Import User type

interface RecentMessage {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar_url: string;
  };
  lastMessage: {
    content: string;
    created_at: string;
    sender_id: string;
    message_type: string;
  };
  unreadCount: number;
}

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth(); // Removed supabaseUser
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'exchanges' | 'profile'>('overview');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  useEffect(() => {
    // Simulate loading recent messages from mock data or current user's in-memory messages
    setIsLoadingMessages(true);
    const timer = setTimeout(() => {
      if (currentUser && currentUser.messages && currentUser.messages.length > 0) {
        // For simplicity, create mock recent messages from the current user's messages
        // In a real app, this would involve a more complex mock or a backend call
        const mockRecent: RecentMessage[] = [];
        const uniqueSenders = new Set<string>();

        // Get unique senders and their last message
        const messagesBySender: { [senderId: string]: Message } = {};
        currentUser.messages.forEach(msg => {
          const otherId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
          // Only process messages from others for "recent messages" display
          if (otherId !== currentUser.id && (!messagesBySender[otherId] || new Date(msg.timestamp) > new Date(messagesBySender[otherId].timestamp))) {
            messagesBySender[otherId] = msg;
          }
        });

        // Convert to RecentMessage format
        for (const otherId in messagesBySender) {
          const lastMsg = messagesBySender[otherId];
          // Find a mock user to represent the other user
          const mockOtherUser = currentUser.id === 'demo@example.com' ? 
                                  (otherId === '2' ? { id: '2', name: 'Miguel Rodriguez', avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_online: true } : 
                                   otherId === '3' ? { id: '3', name: 'Emma Chen', avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_online: false } :
                                   { id: otherId, name: `User ${otherId.substring(0,4)}`, avatar_url: 'https://placehold.co/150x150/aabbcc/ffffff?text=U' })
                                : { id: otherId, name: `User ${otherId.substring(0,4)}`, avatar_url: 'https://placehold.co/150x150/aabbcc/ffffff?text=U' };


          // Calculate unread count (mock for in-memory)
          const unreadCount = currentUser.messages.filter(
            msg => msg.senderId === otherId && !msg.read
          ).length;

          mockRecent.push({
            id: lastMsg.id,
            otherUser: mockOtherUser,
            lastMessage: {
              content: lastMsg.content,
              created_at: lastMsg.timestamp,
              sender_id: lastMsg.senderId,
              message_type: lastMsg.type,
            },
            unreadCount: unreadCount,
          });
        }
        
        setRecentMessages(mockRecent.sort((a, b) => new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime()).slice(0,3));
        setHasUnreadMessages(mockRecent.some(msg => msg.unreadCount > 0));

      } else {
        setRecentMessages([]);
        setHasUnreadMessages(false);
      }
      setIsLoadingMessages(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [currentUser]); // Depend on currentUser to update when messages change

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getMessagePreview = (message: any) => {
    if (message.message_type === 'video-call') {
      return 'Started a video call';
    }
    return message.content.length > 40 ? `${message.content.substring(0, 40)}...` : message.content;
  };

  if (!currentUser) return null;

  const stats = [
    {
      label: 'Active Exchanges',
      value: '0', // Mock value
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
    },
    {
      label: 'Completed',
      value: currentUser.completedExchanges.toString(),
      icon: Award,
      color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Rating',
      value: currentUser.rating.toFixed(1).toString(), // Format rating
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      label: 'Skills Offered',
      value: currentUser.skillsOffered.length.toString(),
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {currentUser.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's what's happening with your skill exchanges
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: TrendingUp },
            { id: 'messages', name: 'Messages', icon: MessageCircle, badge: hasUnreadMessages },
            { id: 'exchanges', name: 'My Exchanges', icon: BookOpen },
            { id: 'profile', name: 'Profile', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Messages */}
          {recentMessages.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Messages</h3>
                <button 
                  onClick={() => setActiveTab('messages')}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  View all
                </button>
              </div>
              {isLoadingMessages ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate(`/messages/${message.otherUser.id}`)}
                    >
                      <img
                        src={message.otherUser.avatar_url || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                        alt={message.otherUser.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{message.otherUser.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formatMessageTime(message.lastMessage.created_at)}</p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {message.lastMessage.sender_id === currentUser.id ? 'You: ' : ''}
                          {getMessagePreview(message.lastMessage)}
                        </p>
                        {message.unreadCount > 0 && (
                          <span className="inline-block mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {message.unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Welcome to SkillSwap</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your journey to exchanging skills begins here! Start by exploring potential matches or updating your profile.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  💡 <strong>Tip:</strong> The more skills you add to your profile, the better matches we can find for you!
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => navigate('/browse-skills')}
              className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors text-left"
            >
              <Users className="h-8 w-8 mb-3" />
              <h3 className="font-semibold mb-2">Find New Matches</h3>
              <p className="text-sm opacity-90">Discover people with complementary skills</p>
            </button>
            
            <button 
              onClick={() => setActiveTab('messages')}
              className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors text-left"
            >
              <MessageCircle className="h-8 w-8 mb-3" />
              <h3 className="font-semibold mb-2">Messages</h3>
              <p className="text-sm opacity-90">Check your conversations and connect</p>
            </button>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors text-left"
            >
              <BookOpen className="h-8 w-8 mb-3" />
              <h3 className="font-semibold mb-2">Update Skills</h3>
              <p className="text-sm opacity-90">Add new skills you want to teach or learn</p>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div>
          <MessageCenter />
        </div>
      )}

      {activeTab === 'exchanges' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">My Skill Exchanges</h3>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No active exchanges</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start connecting with people to begin your first skill exchange!</p>
            <button 
              onClick={() => navigate('/browse-skills')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Find Matches
            </button>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Profile Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{currentUser.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{currentUser.location}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member since {new Date(currentUser.joinedDate).getFullYear()}</p>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Bio</h5>
              <p className="text-gray-600 dark:text-gray-400">{currentUser.bio}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Skills I Offer</h5>
                <div className="space-y-2">
                  {currentUser.skillsOffered.map((skill) => (
                    <div key={skill.id} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h6 className="font-medium text-blue-900 dark:text-blue-100">{skill.name}</h6>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">{skill.description}</p>
                      {skill.yearsOfExperience && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          {skill.yearsOfExperience} years experience
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Skills I Want</h5>
                <div className="space-y-2">
                  {currentUser.skillsWanted.map((skill) => (
                    <div key={skill.id} className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h6 className="font-medium text-purple-900 dark:text-purple-100">{skill.name}</h6>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

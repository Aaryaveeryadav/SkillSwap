import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MessageCenter from '../messaging/MessageCenter';
import { generateMatches, mockUsers } from '../../data/mockData';
import { User } from '../../types';
import UserCard from '../UserCard';
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

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'exchanges' | 'profile'>('overview');
  const [skillMatches, setSkillMatches] = useState<User[]>([]);
  const [showMatches, setShowMatches] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  useEffect(() => {
    if (currentUser) {
      // Find users who can teach skills the current user wants to learn
      const teachersForMySkills = mockUsers.filter(user => 
        user.id !== currentUser.id &&
        currentUser.skillsWanted.some(wantedSkill =>
          user.skillsOffered.some(offeredSkill =>
            offeredSkill.name.toLowerCase() === wantedSkill.name.toLowerCase()
          )
        )
      );
      setSkillMatches(teachersForMySkills.slice(0, 3));
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const stats = [
    {
      label: 'Active Exchanges',
      value: '3',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Completed',
      value: currentUser.completedExchanges.toString(),
      icon: Award,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Rating',
      value: currentUser.rating.toString(),
      icon: Star,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      label: 'Skill Matches',
      value: skillMatches.length.toString(),
      icon: Target,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'exchange_completed',
      message: 'Completed Photoshop exchange with Sarah',
      time: '2 hours ago',
      icon: Award
    },
    {
      id: '2',
      type: 'new_message',
      message: 'New message from Miguel about guitar lessons',
      time: '5 hours ago',
      icon: MessageCircle
    },
    {
      id: '3',
      type: 'match_found',
      message: 'New match found for cooking skills',
      time: '1 day ago',
      icon: Users
    }
  ];

  // Get all potential matches for skills the user wants to learn
  const getAllSkillMatches = () => {
    if (!currentUser) return [];
    
    return mockUsers.filter(user => 
      user.id !== currentUser.id &&
      user.skillsOffered.some(offeredSkill => {
        const matchesSearch = searchTerm === '' || 
          offeredSkill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesSkillFilter = selectedSkill === 'all' || 
          currentUser.skillsWanted.some(wantedSkill => 
            wantedSkill.name.toLowerCase() === offeredSkill.name.toLowerCase() &&
            (selectedSkill === 'all' || offeredSkill.name.toLowerCase() === selectedSkill.toLowerCase())
          );
        
        return matchesSearch && matchesSkillFilter;
      })
    );
  };

  const filteredMatches = getAllSkillMatches();

  const handleFindMatches = () => {
    setShowMatches(true);
  };

  const handleBackToExchanges = () => {
    setShowMatches(false);
    setSearchTerm('');
    setSelectedSkill('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your skill exchanges
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: TrendingUp },
            { id: 'messages', name: 'Messages', icon: MessageCircle },
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
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
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
                <div key={stat.label} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skill Matches Alert */}
          {skillMatches.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-900">New Skill Matches Found!</h3>
              </div>
              <p className="text-green-800 mb-4">
                We found {skillMatches.length} people who can teach skills you want to learn. Check them out!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skillMatches.map((user) => (
                  <div key={user.id} className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.location}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">{user.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-green-700 font-medium">Can teach:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.skillsOffered.slice(0, 2).map((skill) => (
                          <span
                            key={skill.id}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={handleFindMatches}
              className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors text-left"
            >
              <Users className="h-8 w-8 mb-3" />
              <h3 className="font-semibold mb-2">Find New Matches</h3>
              <p className="text-sm opacity-90">Discover people with complementary skills</p>
            </button>
            
            <button className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors text-left">
              <Calendar className="h-8 w-8 mb-3" />
              <h3 className="font-semibold mb-2">Schedule Session</h3>
              <p className="text-sm opacity-90">Book a learning session with your matches</p>
            </button>
            
            <button className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors text-left">
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
        <div>
          {!showMatches ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">My Skill Exchanges</h3>
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No active exchanges</h4>
                <p className="text-gray-600 mb-6">Start connecting with people to begin your first skill exchange!</p>
                <button 
                  onClick={handleFindMatches}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Find Matches
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header with Back Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={handleBackToExchanges}
                    className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Find Skill Matches</h3>
                    <p className="text-gray-600">People who can teach skills you want to learn</p>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search by skill or person name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Skills I Want</option>
                      {currentUser.skillsWanted.map((skill) => (
                        <option key={skill.id} value={skill.name.toLowerCase()}>
                          {skill.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills You Want to Learn */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h4 className="font-semibold text-purple-900 mb-3">Skills You Want to Learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skillsWanted.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    >
                      {skill.name} ({skill.level})
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Found {filteredMatches.length} potential teachers
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-1" />
                    Sorted by skill match
                  </div>
                </div>

                {filteredMatches.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">No matches found for your search criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredMatches.map((user) => (
                      <div key={user.id} className="relative">
                        <UserCard user={user} />
                        {/* Highlight matching skills */}
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Can Teach You!
                        </div>
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-medium text-green-900 mb-2">Matching Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {user.skillsOffered
                              .filter(offeredSkill => 
                                currentUser.skillsWanted.some(wantedSkill => 
                                  wantedSkill.name.toLowerCase() === offeredSkill.name.toLowerCase()
                                )
                              )
                              .map((skill) => (
                                <span
                                  key={skill.id}
                                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                                >
                                  {skill.name} ({skill.level})
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{currentUser.name}</h4>
                <p className="text-gray-600">{currentUser.location}</p>
                <p className="text-sm text-gray-500">Member since {new Date(currentUser.joinedDate).getFullYear()}</p>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Bio</h5>
              <p className="text-gray-600">{currentUser.bio}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Skills I Offer</h5>
                <div className="space-y-2">
                  {currentUser.skillsOffered.map((skill) => (
                    <div key={skill.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h6 className="font-medium text-blue-900">{skill.name}</h6>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">{skill.description}</p>
                      {skill.yearsOfExperience && (
                        <p className="text-xs text-blue-600 mt-1">
                          {skill.yearsOfExperience} years experience
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Skills I Want</h5>
                <div className="space-y-2">
                  {currentUser.skillsWanted.map((skill) => (
                    <div key={skill.id} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h6 className="font-medium text-purple-900">{skill.name}</h6>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-sm text-purple-700">{skill.description}</p>
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
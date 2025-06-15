import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroSection from '../components/HeroSection';
import UserCard from '../components/UserCard';
import { mockUsers, skillCategories } from '../data/mockData';
import { User } from '../types';
import { 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Users as UsersIcon, 
  Filter,
  Search,
  MapPin,
  Star,
  Clock,
  Award,
  Shield,
  Zap,
  X,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

interface FilterState {
  searchTerm: string;
  location: string;
  skillCategory: string;
  minRating: string;
  learningMode: string;
  availability: string[];
  verified: boolean;
  subscription: string;
  experienceLevel: string[];
}

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [featuredUsers, setFeaturedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [skillMatches, setSkillMatches] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    skills: true,
    preferences: true,
    advanced: false
  });

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    location: '',
    skillCategory: 'all',
    minRating: 'any',
    learningMode: 'any',
    availability: [],
    verified: false,
    subscription: 'any',
    experienceLevel: []
  });

  const availabilityOptions = ['mornings', 'afternoons', 'evenings', 'weekends'];
  const experienceLevels = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
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
        setSkillMatches(teachersForMySkills.slice(0, 4));
      }
      
      setFeaturedUsers(mockUsers.slice(0, 2));
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUser]);

  // Apply filters to users
  useEffect(() => {
    let filtered = [...mockUsers];

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.bio.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.skillsOffered.some(skill => 
          skill.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          skill.category.toLowerCase().includes(filters.searchTerm.toLowerCase())
        ) ||
        user.skillsWanted.some(skill => 
          skill.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          skill.category.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(user =>
        user.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Skill category filter
    if (filters.skillCategory !== 'all') {
      filtered = filtered.filter(user =>
        user.skillsOffered.some(skill => skill.category === filters.skillCategory) ||
        user.skillsWanted.some(skill => skill.category === filters.skillCategory)
      );
    }

    // Rating filter
    if (filters.minRating !== 'any') {
      filtered = filtered.filter(user => user.rating >= parseFloat(filters.minRating));
    }

    // Learning mode filter
    if (filters.learningMode !== 'any') {
      filtered = filtered.filter(user =>
        user.learningMode === filters.learningMode ||
        user.learningMode === 'both'
      );
    }

    // Availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(user =>
        filters.availability.some(time => user.availability.includes(time))
      );
    }

    // Verified filter
    if (filters.verified) {
      filtered = filtered.filter(user => user.verified);
    }

    // Subscription filter
    if (filters.subscription !== 'any') {
      filtered = filtered.filter(user => user.subscription === filters.subscription);
    }

    // Experience level filter
    if (filters.experienceLevel.length > 0) {
      filtered = filtered.filter(user =>
        user.skillsOffered.some(skill => 
          filters.experienceLevel.includes(skill.level)
        )
      );
    }

    setFilteredUsers(filtered);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = filters[key] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      location: '',
      skillCategory: 'all',
      minRating: 'any',
      learningMode: 'any',
      availability: [],
      verified: false,
      subscription: 'any',
      experienceLevel: []
    });
  };

  const hasActiveFilters = () => {
    return filters.searchTerm !== '' ||
           filters.location !== '' ||
           filters.skillCategory !== 'all' ||
           filters.minRating !== 'any' ||
           filters.learningMode !== 'any' ||
           filters.availability.length > 0 ||
           filters.verified ||
           filters.subscription !== 'any' ||
           filters.experienceLevel.length > 0;
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.location) count++;
    if (filters.skillCategory !== 'all') count++;
    if (filters.minRating !== 'any') count++;
    if (filters.learningMode !== 'any') count++;
    if (filters.availability.length > 0) count++;
    if (filters.verified) count++;
    if (filters.subscription !== 'any') count++;
    if (filters.experienceLevel.length > 0) count++;
    return count;
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="text-white h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Finding your perfect skill matches...</h2>
          <p className="text-gray-500 dark:text-gray-400">This won't take long!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-32 transition-colors duration-200">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filters</h2>
                </div>
                {hasActiveFilters() && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Active Filter Count */}
              {hasActiveFilters() && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                    {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} active
                  </p>
                  <p className="text-blue-600 dark:text-blue-300 text-xs">
                    Showing {filteredUsers.length} of {mockUsers.length} people
                  </p>
                </div>
              )}

              {/* Basic Filters */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('basic')}
                  className="flex items-center justify-between w-full text-left mb-3"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Basic Search</h3>
                  {expandedSections.basic ? 
                    <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  }
                </button>
                
                {expandedSections.basic && (
                  <div className="space-y-4">
                    {/* Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Search People & Skills
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                        <input
                          type="text"
                          value={filters.searchTerm}
                          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                          placeholder="Search names, skills, bio..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                        <input
                          type="text"
                          value={filters.location}
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                          placeholder="City, State"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills Filters */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('skills')}
                  className="flex items-center justify-between w-full text-left mb-3"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Skills & Experience</h3>
                  {expandedSections.skills ? 
                    <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  }
                </button>
                
                {expandedSections.skills && (
                  <div className="space-y-4">
                    {/* Skill Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Skill Category
                      </label>
                      <select
                        value={filters.skillCategory}
                        onChange={(e) => handleFilterChange('skillCategory', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="all">All Categories</option>
                        {skillCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Experience Level
                      </label>
                      <div className="space-y-2">
                        {experienceLevels.map((level) => (
                          <label key={level} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.experienceLevel.includes(level)}
                              onChange={(e) => handleArrayFilterChange('experienceLevel', level, e.target.checked)}
                              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 mr-2 bg-white dark:bg-gray-700"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preferences */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('preferences')}
                  className="flex items-center justify-between w-full text-left mb-3"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Preferences</h3>
                  {expandedSections.preferences ? 
                    <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  }
                </button>
                
                {expandedSections.preferences && (
                  <div className="space-y-4">
                    {/* Learning Mode */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Learning Mode
                      </label>
                      <select
                        value={filters.learningMode}
                        onChange={(e) => handleFilterChange('learningMode', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="any">Any mode</option>
                        <option value="online">Online only</option>
                        <option value="offline">In-person only</option>
                        <option value="both">Both online & in-person</option>
                      </select>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Availability
                      </label>
                      <div className="space-y-2">
                        {availabilityOptions.map((time) => (
                          <label key={time} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.availability.includes(time)}
                              onChange={(e) => handleArrayFilterChange('availability', time, e.target.checked)}
                              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 mr-2 bg-white dark:bg-gray-700"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{time}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Filters */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('advanced')}
                  className="flex items-center justify-between w-full text-left mb-3"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Advanced</h3>
                  {expandedSections.advanced ? 
                    <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  }
                </button>
                
                {expandedSections.advanced && (
                  <div className="space-y-4">
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Rating
                      </label>
                      <select
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange('minRating', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="any">Any rating</option>
                        <option value="3.0">3.0+ stars</option>
                        <option value="4.0">4.0+ stars</option>
                        <option value="4.5">4.5+ stars</option>
                        <option value="4.8">4.8+ stars</option>
                      </select>
                    </div>

                    {/* Subscription */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subscription
                      </label>
                      <select
                        value={filters.subscription}
                        onChange={(e) => handleFilterChange('subscription', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="any">Any subscription</option>
                        <option value="free">Free users</option>
                        <option value="premium">Premium users</option>
                      </select>
                    </div>

                    {/* Verified */}
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.verified}
                          onChange={(e) => handleFilterChange('verified', e.target.checked)}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 mr-2 bg-white dark:bg-gray-700"
                        />
                        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Verified users only</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center relative"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {hasActiveFilters() && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Filter Modal */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-4">
                  {/* Mobile filter content - same as desktop but in modal */}
                  <div className="space-y-6">
                    {/* Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Search People & Skills
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                        <input
                          type="text"
                          value={filters.searchTerm}
                          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                          placeholder="Search names, skills, bio..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setShowMobileFilters(false)}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Apply Filters ({filteredUsers.length} results)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {hasActiveFilters() ? `${filteredUsers.length} People Found` : 'Discover Amazing People'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {hasActiveFilters() 
                    ? `Filtered from ${mockUsers.length} total members`
                    : 'Connect with skilled people in your community'
                  }
                </p>
              </div>
            </div>

            {/* Skill Matches Section - Only show if user is logged in and has skills */}
            {currentUser && skillMatches.length > 0 && !hasActiveFilters() && (
              <div>
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">People Who Can Teach Your Desired Skills</h2>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    🎯 <strong>Perfect Matches Found!</strong> These people can teach skills you want to learn. 
                    Check if you have skills they're looking for to create a skill exchange!
                  </p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {skillMatches.map((user) => (
                    <div key={user.id} className="relative">
                      <UserCard user={user} />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Can Teach You!
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Results */}
            {hasActiveFilters() && (
              <div>
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertCircle className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">No Results Available</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any people matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                    
                    {/* Search suggestions */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto mb-6">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Search Tips:</h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 text-left">
                        <li>• Try broader search terms</li>
                        <li>• Remove some filters to see more results</li>
                        <li>• Check your spelling</li>
                        <li>• Search for skill categories instead of specific skills</li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={clearAllFilters}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Clear All Filters
                      </button>
                      <button
                        onClick={() => handleFilterChange('searchTerm', '')}
                        className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Clear Search
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredUsers.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Featured Users - Only show when no filters */}
            {!hasActiveFilters() && (
              <div>
                <div className="flex items-center mb-6">
                  <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Skill Sharers</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {featuredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}

            {/* Success Stories - Only show when no filters */}
            {!hasActiveFilters() && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-200">
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Success Stories</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "I learned Photoshop from Sarah in exchange for guitar lessons. Now I can create amazing designs for my band!"
                    </p>
                    <div className="flex items-center">
                      <img
                        src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                        alt="Miguel"
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Miguel, Musician</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "Teaching cooking while learning photography has been incredible. The community here is so supportive!"
                    </p>
                    <div className="flex items-center">
                      <img
                        src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                        alt="Emma"
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Emma, Chef</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="text-white h-5 w-5" />
                </div>
                <span className="text-2xl font-bold">SkillSwap</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Connect with people in your area to exchange skills and learn something new. From Photoshop to guitar, cooking to coding - there's always someone ready to teach and learn.
              </p>
              <p className="text-sm text-gray-500">
                © 2024 SkillSwap. All rights reserved.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Popular Skills</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/browse-skills?category=Design" className="hover:text-white transition-colors">Design & Art</Link></li>
                <li><Link to="/browse-skills?category=Music" className="hover:text-white transition-colors">Music & Audio</Link></li>
                <li><Link to="/browse-skills?category=Languages" className="hover:text-white transition-colors">Languages</Link></li>
                <li><Link to="/browse-skills?category=Technology" className="hover:text-white transition-colors">Technology</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/browse-skills" className="hover:text-white transition-colors">Find Matches</Link></li>
                <li><Link to="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link to="/safety" className="hover:text-white transition-colors">Safety Guidelines</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockUsers, skillCategories } from '../data/mockData';
import UserCard from '../components/UserCard';
import FilterSidebar, { FilterState } from '../components/FilterSidebar';
import { Search, Filter, Users, TrendingUp, MapPin, Star, Award, Zap, X } from 'lucide-react';
import { User } from '../types';

const BrowseSkills: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'distance' | 'recent'>('relevance');
  const [filters, setFilters] = useState<FilterState>({
    distance: 'any',
    availability: [],
    categories: [],
    minRating: 'any',
    learningMode: 'any',
    subscription: 'any',
    verified: false,
    experienceLevel: []
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    distance: 'any',
    availability: [],
    categories: [],
    minRating: 'any',
    learningMode: 'any',
    subscription: 'any',
    verified: false,
    experienceLevel: []
  });

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  const applyFilters = (users: User[]): User[] => {
    return users.filter(user => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.skillsWanted.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
        user.skillsOffered.some(skill => skill.category === selectedCategory) ||
        user.skillsWanted.some(skill => skill.category === selectedCategory);

      // Distance filter (simplified - in real app would use geolocation)
      const matchesDistance = appliedFilters.distance === 'any' || true; // Simplified for demo

      // Availability filter
      const matchesAvailability = appliedFilters.availability.length === 0 ||
        appliedFilters.availability.some(time => user.availability.includes(time));

      // Skill categories filter
      const matchesSkillCategories = appliedFilters.categories.length === 0 ||
        appliedFilters.categories.some(category => 
          user.skillsOffered.some(skill => skill.category === category) ||
          user.skillsWanted.some(skill => skill.category === category)
        );

      // Rating filter
      const matchesRating = appliedFilters.minRating === 'any' || 
        user.rating >= parseFloat(appliedFilters.minRating);

      // Learning mode filter
      const matchesLearningMode = appliedFilters.learningMode === 'any' ||
        user.learningMode === appliedFilters.learningMode ||
        (appliedFilters.learningMode === 'both' && user.learningMode === 'both');

      // Subscription filter
      const matchesSubscription = appliedFilters.subscription === 'any' ||
        user.subscription === appliedFilters.subscription;

      // Verified filter
      const matchesVerified = !appliedFilters.verified || user.verified;

      // Experience level filter
      const matchesExperienceLevel = appliedFilters.experienceLevel.length === 0 ||
        appliedFilters.experienceLevel.some(level =>
          user.skillsOffered.some(skill => skill.level === level)
        );

      return matchesSearch && matchesCategory && matchesDistance && 
             matchesAvailability && matchesSkillCategories && matchesRating &&
             matchesLearningMode && matchesSubscription && matchesVerified &&
             matchesExperienceLevel;
    });
  };

  const sortUsers = (users: User[]): User[] => {
    const sorted = [...users];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'distance':
        // Simplified distance sorting - in real app would use actual coordinates
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'recent':
        return sorted.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
      case 'relevance':
      default:
        // Sort by number of matching skills and rating
        return sorted.sort((a, b) => {
          const aSkillCount = a.skillsOffered.length + a.skillsWanted.length;
          const bSkillCount = b.skillsOffered.length + b.skillsWanted.length;
          if (aSkillCount !== bSkillCount) {
            return bSkillCount - aSkillCount;
          }
          return b.rating - a.rating;
        });
    }
  };

  const filteredUsers = sortUsers(applyFilters(mockUsers));

  const getActiveFilterCount = (): number => {
    let count = 0;
    if (appliedFilters.distance !== 'any') count++;
    if (appliedFilters.availability.length > 0) count++;
    if (appliedFilters.categories.length > 0) count++;
    if (appliedFilters.minRating !== 'any') count++;
    if (appliedFilters.learningMode !== 'any') count++;
    if (appliedFilters.subscription !== 'any') count++;
    if (appliedFilters.verified) count++;
    if (appliedFilters.experienceLevel.length > 0) count++;
    if (selectedCategory !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const getFilterSummary = (): string[] => {
    const summary: string[] = [];
    if (searchTerm) summary.push(`"${searchTerm}"`);
    if (selectedCategory !== 'all') summary.push(selectedCategory);
    if (appliedFilters.learningMode !== 'any') {
      const mode = appliedFilters.learningMode === 'online' ? 'Online only' :
                   appliedFilters.learningMode === 'offline' ? 'In-person only' : 'Both modes';
      summary.push(mode);
    }
    if (appliedFilters.verified) summary.push('Verified users');
    if (appliedFilters.minRating !== 'any') summary.push(`${appliedFilters.minRating}+ stars`);
    return summary;
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setShowFilters(false);
  };

  const handleClearAllFilters = () => {
    const clearedFilters = {
      distance: 'any',
      availability: [],
      categories: [],
      minRating: 'any',
      learningMode: 'any',
      subscription: 'any',
      verified: false,
      experienceLevel: []
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setSelectedCategory('all');
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Browse Skills & People
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover amazing people in your area ready to share their skills and learn something new
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search skills, people, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center relative"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
              <option value="recent">Sort by Recent</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            All Categories
          </button>
          {skillCategories.slice(0, 6).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Active Filters Summary */}
        {(searchTerm || activeFilterCount > 0) && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  {filteredUsers.length} people found
                  {getFilterSummary().length > 0 && (
                    <span className="font-normal"> for: {getFilterSummary().join(', ')}</span>
                  )}
                </p>
                {activeFilterCount > 0 && (
                  <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
                    {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
                  </p>
                )}
              </div>
              {(searchTerm || activeFilterCount > 0) && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <FilterSidebar 
            className="sticky top-32" 
            filters={filters}
            onFiltersChange={setFilters}
            onApplyFilters={handleApplyFilters}
          />
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg h-full overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <FilterSidebar 
                filters={filters}
                onFiltersChange={setFilters}
                onApplyFilters={handleApplyFilters}
                showApplyButton={true}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredUsers.length} People Found
              </h2>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              Sorted by {sortBy}
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">No matches found</h3>
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? `No results found for "${searchTerm}".`
                    : 'No people match your current filters.'
                  }
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Try these suggestions:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 text-left">
                    <li>• Remove some filters to see more results</li>
                    <li>• Try different search terms or categories</li>
                    <li>• Expand your distance range</li>
                    <li>• Check your spelling and try again</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleClearAllFilters}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-2">
                    <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {(filteredUsers.reduce((sum, user) => sum + user.rating, 0) / filteredUsers.length).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-2">
                    <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {filteredUsers.filter(user => user.verified).length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Verified</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-2">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {filteredUsers.filter(user => user.subscription === 'premium').length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Premium</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full mx-auto mb-2">
                    <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {filteredUsers.filter(user => user.isOnline).length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Online Now</p>
                </div>
              </div>

              {/* User Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseSkills;
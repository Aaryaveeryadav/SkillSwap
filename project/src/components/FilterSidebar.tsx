import React from 'react';
import { Filter, MapPin, Clock, Star, Zap, Users, Award, Shield } from 'lucide-react';
import { skillCategories } from '../data/mockData';

interface FilterSidebarProps {
  className?: string;
  onFiltersChange?: (filters: FilterState) => void;
  filters?: FilterState;
  onApplyFilters?: () => void;
  showApplyButton?: boolean;
}

export interface FilterState {
  distance: string;
  availability: string[];
  categories: string[];
  minRating: string;
  learningMode: string;
  subscription: string;
  verified: boolean;
  experienceLevel: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  className = '', 
  onFiltersChange,
  onApplyFilters,
  showApplyButton = false,
  filters = {
    distance: 'any',
    availability: [],
    categories: [],
    minRating: 'any',
    learningMode: 'any',
    subscription: 'any',
    verified: false,
    experienceLevel: []
  }
}) => {
  
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange?.(newFilters);
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = filters[key] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      distance: 'any',
      availability: [],
      categories: [],
      minRating: 'any',
      learningMode: 'any',
      subscription: 'any',
      verified: false,
      experienceLevel: []
    };
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = () => {
    return filters.distance !== 'any' ||
           filters.availability.length > 0 ||
           filters.categories.length > 0 ||
           filters.minRating !== 'any' ||
           filters.learningMode !== 'any' ||
           filters.subscription !== 'any' ||
           filters.verified ||
           filters.experienceLevel.length > 0;
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.distance !== 'any') count++;
    if (filters.availability.length > 0) count++;
    if (filters.categories.length > 0) count++;
    if (filters.minRating !== 'any') count++;
    if (filters.learningMode !== 'any') count++;
    if (filters.subscription !== 'any') count++;
    if (filters.verified) count++;
    if (filters.experienceLevel.length > 0) count++;
    return count;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
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

      {/* Distance */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          Distance
        </label>
        <select 
          value={filters.distance}
          onChange={(e) => handleFilterChange('distance', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="any">Any distance</option>
          <option value="5">Within 5 miles</option>
          <option value="10">Within 10 miles</option>
          <option value="25">Within 25 miles</option>
          <option value="50">Within 50 miles</option>
        </select>
      </div>

      {/* Learning Mode */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <Users className="h-4 w-4 mr-2" />
          Learning Mode
        </label>
        <select 
          value={filters.learningMode}
          onChange={(e) => handleFilterChange('learningMode', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="any">Any mode</option>
          <option value="online">Online only</option>
          <option value="offline">In-person only</option>
          <option value="both">Both online & in-person</option>
        </select>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <Clock className="h-4 w-4 mr-2" />
          Availability
        </label>
        <div className="space-y-2">
          {['mornings', 'afternoons', 'evenings', 'weekends'].map((time) => (
            <label key={time} className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.availability.includes(time)}
                onChange={(e) => handleArrayFilterChange('availability', time, e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 bg-white dark:bg-gray-700" 
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">{time}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <Award className="h-4 w-4 mr-2" />
          Experience Level
        </label>
        <div className="space-y-2">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <label key={level} className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.experienceLevel.includes(level)}
                onChange={(e) => handleArrayFilterChange('experienceLevel', level, e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 bg-white dark:bg-gray-700" 
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skill Categories */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <Zap className="h-4 w-4 mr-2" />
          Skill Categories
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {skillCategories.map((category) => (
            <label key={category} className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.categories.includes(category)}
                onChange={(e) => handleArrayFilterChange('categories', category, e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 bg-white dark:bg-gray-700" 
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <Star className="h-4 w-4 mr-2" />
          Minimum Rating
        </label>
        <select 
          value={filters.minRating}
          onChange={(e) => handleFilterChange('minRating', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="any">Any rating</option>
          <option value="3.0">3.0+ stars</option>
          <option value="4.0">4.0+ stars</option>
          <option value="4.5">4.5+ stars</option>
          <option value="4.8">4.8+ stars</option>
        </select>
      </div>

      {/* Subscription Type */}
      <div className="mb-6">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          <Award className="h-4 w-4 mr-2" />
          Subscription
        </label>
        <select 
          value={filters.subscription}
          onChange={(e) => handleFilterChange('subscription', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="any">Any subscription</option>
          <option value="free">Free users</option>
          <option value="premium">Premium users</option>
        </select>
      </div>

      {/* Verified Users */}
      <div className="mb-6">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={filters.verified}
            onChange={(e) => handleFilterChange('verified', e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500 bg-white dark:bg-gray-700" 
          />
          <Shield className="h-4 w-4 ml-2 mr-1 text-blue-600 dark:text-blue-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Verified users only</span>
        </label>
      </div>

      {/* Apply Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onApplyFilters}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
          {hasActiveFilters() && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Active Filters:</h3>
          <div className="space-y-2">
            {filters.distance !== 'any' && (
              <span className="inline-block bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                {filters.distance === '5' ? 'Within 5 miles' :
                 filters.distance === '10' ? 'Within 10 miles' :
                 filters.distance === '25' ? 'Within 25 miles' :
                 filters.distance === '50' ? 'Within 50 miles' : ''}
              </span>
            )}
            {filters.learningMode !== 'any' && (
              <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                {filters.learningMode === 'online' ? 'Online only' :
                 filters.learningMode === 'offline' ? 'In-person only' :
                 'Both modes'}
              </span>
            )}
            {filters.verified && (
              <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                Verified only
              </span>
            )}
            {filters.minRating !== 'any' && (
              <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                {filters.minRating}+ stars
              </span>
            )}
            {filters.availability.map((time) => (
              <span key={time} className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full mr-1 mb-1 capitalize">
                {time}
              </span>
            ))}
            {filters.experienceLevel.map((level) => (
              <span key={level} className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs px-2 py-1 rounded-full mr-1 mb-1 capitalize">
                {level}
              </span>
            ))}
            {filters.categories.slice(0, 3).map((category) => (
              <span key={category} className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                {category}
              </span>
            ))}
            {filters.categories.length > 3 && (
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                +{filters.categories.length - 3} more categories
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
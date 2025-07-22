import React from 'react';
import { mockVideoProjects } from '../data/mockData';
import VideoProjectCard from './VideoProjectCard';
import { Users, TrendingUp, Award, Plus } from 'lucide-react';

const CommunitySection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Community Creations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our community is creating with these amazing tools. Get inspired and share your own projects!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2,500+</h3>
            <p className="text-gray-600">Active Creators</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15,000+</h3>
            <p className="text-gray-600">Videos Created</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">500+</h3>
            <p className="text-gray-600">Skills Exchanged</p>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Featured Projects</h3>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Share Your Project
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockVideoProjects.map((project) => (
              <VideoProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-teal-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Amazing Videos?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join our community of creators and start exchanging skills today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              Join Community
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-teal-600 transition-colors duration-200">
              Browse Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
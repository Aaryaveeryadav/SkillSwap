import React from 'react';
import { VideoProject } from '../types';
import { Play, Heart, Eye, Clock, Tag, ExternalLink } from 'lucide-react';

interface VideoProjectCardProps {
  project: VideoProject;
  className?: string;
}

const VideoProjectCard: React.FC<VideoProjectCardProps> = ({ project, className = '' }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anime':
        return 'bg-purple-100 text-purple-800';
      case 'game':
        return 'bg-blue-100 text-blue-800';
      case 'tutorial':
        return 'bg-green-100 text-green-800';
      case 'showcase':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group ${className}`}>
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white bg-opacity-90 text-gray-900 p-3 rounded-full hover:bg-opacity-100 transition-all duration-200">
            <Play className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {project.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        {/* Creator */}
        <div className="flex items-center mb-4">
          <img
            src={project.creator.avatar}
            alt={project.creator.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{project.creator.name}</p>
            <p className="text-xs text-gray-500">{project.creator.location}</p>
          </div>
        </div>

        {/* Tools Used */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Tools Used</h4>
          <div className="flex flex-wrap gap-1">
            {project.toolsUsed.map((tool) => (
              <span
                key={tool.id}
                className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs flex items-center"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {project.likes.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {project.views.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center">
            <Play className="h-4 w-4 mr-2" />
            Watch
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoProjectCard;
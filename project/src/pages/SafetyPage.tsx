import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, CheckCircle, Users, Phone, Eye, Flag } from 'lucide-react';

const SafetyPage: React.FC = () => {
  const safetyTips = [
    {
      icon: Users,
      title: 'Meet in Public Places',
      description: 'Always meet in well-lit, public locations like cafes, libraries, or community centers.',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      icon: Phone,
      title: 'Tell Someone Your Plans',
      description: 'Let a friend or family member know where you\'re going and when you expect to return.',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      icon: Eye,
      title: 'Trust Your Instincts',
      description: 'If something feels off, don\'t hesitate to leave or reschedule the meeting.',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    {
      icon: CheckCircle,
      title: 'Verify Profiles',
      description: 'Look for verified profiles and read reviews from other community members.',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
    }
  ];

  const guidelines = [
    {
      category: 'Before Meeting',
      items: [
        'Exchange messages through the platform first',
        'Video chat before meeting in person',
        'Choose a public location for your first meeting',
        'Share your meeting details with someone you trust',
        'Verify the person\'s identity and profile information'
      ]
    },
    {
      category: 'During the Exchange',
      items: [
        'Stay in public areas during skill sessions',
        'Keep your personal belongings secure',
        'Maintain professional boundaries',
        'End the session if you feel uncomfortable',
        'Focus on the skill being taught/learned'
      ]
    },
    {
      category: 'Online Safety',
      items: [
        'Don\'t share personal information too quickly',
        'Use the platform\'s messaging system initially',
        'Be cautious about sharing social media profiles',
        'Report suspicious behavior immediately',
        'Keep financial transactions separate from skill exchanges'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Safety Guidelines
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Your safety is our top priority. Follow these guidelines to ensure positive and secure skill exchange experiences.
        </p>
      </div>

      {/* Safety Tips */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">Essential Safety Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {safetyTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center transition-colors duration-200">
                <div className={`w-16 h-16 ${tip.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Guidelines */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">Detailed Safety Guidelines</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {guidelines.map((section) => (
            <div key={section.category} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{section.category}</h3>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 mb-16 transition-colors duration-200">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 mr-3" />
          <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">Warning Signs to Watch For</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3">Red Flags in Communication:</h3>
            <ul className="space-y-2 text-red-800 dark:text-red-200">
              <li>• Pushing to meet immediately without getting to know you</li>
              <li>• Asking for personal information too quickly</li>
              <li>• Refusing to video chat or talk on the phone</li>
              <li>• Making inappropriate comments or requests</li>
              <li>• Pressuring you to meet in private locations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3">Suspicious Behavior:</h3>
            <ul className="space-y-2 text-red-800 dark:text-red-200">
              <li>• Profile information doesn't match their stories</li>
              <li>• No reviews or very new account</li>
              <li>• Avoiding questions about their skills or experience</li>
              <li>• Asking for money or expensive equipment</li>
              <li>• Making you feel uncomfortable or pressured</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reporting */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-16 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">How to Report Issues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Report Through the Platform</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Use our comprehensive reporting system to flag inappropriate behavior, suspicious profiles, or safety concerns.
            </p>
            <Link
              to="/report"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors inline-flex items-center"
            >
              <Flag className="h-4 w-4 mr-2" />
              Report a User
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Emergency Situations</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you're in immediate danger, contact local emergency services first, then report the incident to us.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Emergency: <strong>911</strong></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Crisis Text Line: <strong>Text HOME to 741741</strong></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">SkillSwap Safety: <strong>support@skillswap.com</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Standards */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Community Standards</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 dark:text-gray-300 text-center mb-8">
            SkillSwap is built on trust, respect, and mutual learning. We expect all community members to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Be Respectful</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Treat all community members with kindness, respect, and professionalism, regardless of their background or skill level.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Be Honest</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Provide accurate information about your skills, experience, and availability. Honesty builds trust in our community.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Be Safe</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Follow safety guidelines, meet in public places, and prioritize your personal safety and that of others.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-200">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Be Committed</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Honor your commitments to skill exchanges and communicate clearly if plans need to change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPage;
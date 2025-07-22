import React from 'react';
import { BookOpen, Users, Heart, Target, Award, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Skills Exchanged', value: '25,000+', icon: BookOpen },
    { label: 'Cities Covered', value: '150+', icon: Globe },
    { label: 'Success Rate', value: '94%', icon: Award }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former educator passionate about democratizing learning',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Head of Community',
      bio: 'Community builder with 10+ years in social platforms',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Emma Johnson',
      role: 'Product Designer',
      bio: 'UX designer focused on creating meaningful connections',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          About SkillSwap
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          We believe everyone has something valuable to teach and something exciting to learn. 
          SkillSwap connects people in local communities to exchange knowledge, build relationships, 
          and grow together.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-16 transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              To create a world where learning is accessible, personal, and community-driven. 
              We're breaking down barriers to education by connecting people who want to share 
              their passions with those eager to learn.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Heart className="h-6 w-6 text-red-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Build meaningful connections through learning</span>
              </div>
              <div className="flex items-center">
                <Target className="h-6 w-6 text-blue-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Make skill sharing accessible to everyone</span>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">Strengthen local communities</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <img
              src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop"
              alt="People learning together"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center transition-colors duration-200">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-16 transition-colors duration-200">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Story</h2>
        <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
          <p className="mb-6">
            SkillSwap was born from a simple observation: everyone has unique skills and knowledge, 
            but traditional education systems often create barriers to sharing and learning. 
            Our founder, Sarah, was teaching Photoshop to a neighbor in exchange for guitar lessons 
            when she realized how powerful this type of exchange could be.
          </p>
          <p className="mb-6">
            What started as informal skill trading between friends has grown into a platform that 
            connects thousands of people worldwide. We've seen photographers learn coding, 
            chefs master languages, and musicians discover digital art - all through the power 
            of community-driven learning.
          </p>
          <p>
            Today, SkillSwap continues to evolve, but our core belief remains the same: 
            the best learning happens when people connect, share their passions, and 
            grow together as a community.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center transition-colors duration-200">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 transition-colors duration-200">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Community First</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We prioritize building strong, supportive communities where everyone feels welcome to learn and teach.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Lifelong Learning</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We believe learning never stops and everyone has something valuable to contribute.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Authentic Connections</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We foster genuine relationships built on mutual respect, trust, and shared learning goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
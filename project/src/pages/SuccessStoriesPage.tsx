import React from 'react';
import { Star, Quote, Heart, TrendingUp, Users, BookOpen } from 'lucide-react';

const SuccessStoriesPage: React.FC = () => {
  const stories = [
    {
      id: '1',
      title: 'From Photoshop Novice to Freelance Designer',
      excerpt: 'Sarah taught me Photoshop in exchange for guitar lessons. Now I run my own design business!',
      fullStory: 'When I started on SkillSwap, I was just a musician looking to learn some basic design skills for my band\'s promotional materials. Sarah, a professional graphic designer, was interested in learning guitar. What started as a simple skill exchange turned into a life-changing experience. Over three months, Sarah taught me everything from basic photo editing to advanced design principles. Her patient teaching style and real-world projects helped me build a portfolio. Today, I run a successful freelance design business alongside my music career. The best part? Sarah and I are still great friends and continue to collaborate on projects.',
      student: {
        name: 'Miguel Rodriguez',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'Austin, TX',
        skillLearned: 'Photoshop & Design'
      },
      teacher: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'Austin, TX',
        skillTaught: 'Guitar'
      },
      rating: 5,
      duration: '3 months',
      category: 'Career Change'
    },
    {
      id: '2',
      title: 'Cooking My Way to Confidence',
      excerpt: 'Emma\'s cooking lessons didn\'t just teach me recipes - they taught me confidence and brought my family together.',
      fullStory: 'As a busy professional, I lived on takeout and frozen meals. When I found Emma on SkillSwap, I was hesitant - I could barely boil water! But Emma\'s enthusiasm for teaching cooking was infectious. In exchange for photography lessons, she taught me everything from knife skills to meal planning. What surprised me most was how cooking became a form of meditation and creativity. Now I cook dinner for my family every night, and we\'ve started a tradition of trying new recipes together on weekends. Emma didn\'t just teach me to cook; she helped me create lasting memories with my loved ones.',
      student: {
        name: 'David Park',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'Seattle, WA',
        skillLearned: 'Cooking'
      },
      teacher: {
        name: 'Emma Chen',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'Seattle, WA',
        skillTaught: 'Photography'
      },
      rating: 5,
      duration: '2 months',
      category: 'Personal Growth'
    },
    {
      id: '3',
      title: 'Breaking Language Barriers',
      excerpt: 'Learning Spanish through SkillSwap opened doors I never knew existed in my career and personal life.',
      fullStory: 'I work in healthcare and always felt limited by only speaking English. When I connected with Carlos, a native Spanish speaker wanting to improve his English, it was a perfect match. Our weekly conversations over coffee became the highlight of my week. Carlos was patient with my terrible pronunciation and creative with his teaching methods - we practiced medical terminology, watched Spanish movies, and even cooked traditional dishes together. Six months later, I was confident enough to take a position in our hospital\'s bilingual unit. More importantly, I gained a lifelong friend and a deep appreciation for another culture. Carlos and I still meet regularly, and now we help other language learners in our community.',
      student: {
        name: 'Jennifer Walsh',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'Phoenix, AZ',
        skillLearned: 'Spanish'
      },
      teacher: {
        name: 'Carlos Mendez',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'Phoenix, AZ',
        skillTaught: 'English'
      },
      rating: 5,
      duration: '6 months',
      category: 'Career Advancement'
    }
  ];

  const stats = [
    { label: 'Success Stories', value: '2,500+', icon: Heart },
    { label: 'Career Changes', value: '450+', icon: TrendingUp },
    { label: 'Lasting Friendships', value: '8,000+', icon: Users },
    { label: 'Skills Mastered', value: '15,000+', icon: BookOpen }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Success Stories
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Real stories from our community members who transformed their lives through skill sharing and meaningful connections.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

      {/* Featured Stories */}
      <div className="space-y-12">
        {stories.map((story, index) => (
          <div key={story.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="p-8">
              {/* Story Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{story.title}</h2>
                    <div className="flex items-center mt-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{story.duration}</span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  {story.category}
                </span>
              </div>

              {/* Participants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-3">Student</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src={story.student.avatar}
                      alt={story.student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{story.student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{story.student.location}</p>
                      <p className="text-sm text-teal-700 dark:text-teal-300">Learned: {story.student.skillLearned}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">Teacher</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src={story.teacher.avatar}
                      alt={story.teacher.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{story.teacher.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{story.teacher.location}</p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Learned: {story.teacher.skillTaught}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{story.fullStory}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of learners and teachers who are transforming their lives through skill sharing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Start Learning Today
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
            Share Your Skills
          </button>
        </div>
      </div>

      {/* Community Testimonials */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">What Our Community Says</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
              "SkillSwap changed my life. I not only learned web development but made lifelong friends in the process."
            </p>
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                alt="Alex"
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Alex Thompson</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
              "The platform is amazing for connecting with like-minded people. I've learned so much and taught even more!"
            </p>
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                alt="Maria"
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Maria Garcia</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
              "I love how safe and welcoming the community is. Everyone is genuinely interested in helping each other grow."
            </p>
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                alt="James"
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">James Wilson</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
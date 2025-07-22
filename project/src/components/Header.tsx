import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AuthModal from './auth/AuthModal';
import SubscriptionModal from './subscription/SubscriptionModal';
import { Search, MessageCircle, User, LogOut, Settings, BookOpen, Menu, X, Crown, Star, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/browse-skills?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSubscribe = (planId: string) => {
    console.log('Subscribing to plan:', planId);
    // Handle subscription logic here
  };

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  useEffect(() => {
    // Check for unread messages
    if (currentUser && currentUser.messages) {
      const unreadMessages = currentUser.messages.filter(
        msg => msg.senderId !== 'current-user' && !msg.read
      );
      setHasUnreadMessages(unreadMessages.length > 0);
    }
  }, [currentUser]);

  const navigationLinks = [
    { name: 'Browse Skills', href: '/browse-skills' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'About', href: '/about' },
    { name: 'Safety', href: '/safety' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white h-5 w-5" />
                </div>
                <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SkillSwap
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-12">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search skills, people, or locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {currentUser ? (
                <>
                  {/* Subscription Badge */}
                  {currentUser.subscription === 'premium' && (
                    <div className="hidden md:flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Crown className="h-3 w-3 mr-1" />
                      PREMIUM
                    </div>
                  )}

                  {/* Upgrade Button for Free Users */}
                  {currentUser.subscription === 'free' && (
                    <button
                      onClick={() => setShowSubscription(true)}
                      className="hidden md:flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      UPGRADE
                    </button>
                  )}

                  {/* Messages */}
                  <button
                    onClick={handleMessagesClick}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 relative"
                  >
                    <MessageCircle className="h-6 w-6" />
                    {hasUnreadMessages && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                    )}
                  </button>
                  
                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentUser.name}
                      </span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{currentUser.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                          {currentUser.subscription === 'premium' && (
                            <div className="flex items-center mt-1">
                              <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Premium Member</span>
                            </div>
                          )}
                        </div>
                        <Link
                          to="/dashboard"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                        <button 
                          onClick={() => {
                            setShowSubscription(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          {currentUser.subscription === 'premium' ? 'Manage Subscription' : 'Upgrade to Premium'}
                        </button>
                        <Link
                          to="/settings"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                        <hr className="my-2 border-gray-100 dark:border-gray-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Join Now
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search skills, people, locations..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </form>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              {!currentUser && (
                <div className="flex space-x-3 px-4">
                  <button
                    onClick={() => {
                      handleAuthClick('login');
                      setShowMobileMenu(false);
                    }}
                    className="flex-1 text-center py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick('signup');
                      setShowMobileMenu(false);
                    }}
                    className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Join Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Close menus when clicking outside */}
      {(showUserMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      <SubscriptionModal
        isOpen={showSubscription}
        onClose={() => setShowSubscription(false)}
        onSubscribe={handleSubscribe}
      />
    </>
  );
};

export default Header;
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Mail, 
  MapPin, 
  Bell, 
  Shield, 
  Eye, 
  Moon, 
  Sun, 
  Globe, 
  Smartphone,
  Lock,
  Trash2,
  Download,
  Upload,
  Save,
  Camera,
  Edit3,
  Settings as SettingsIcon,
  Crown,
  Star,
  MessageCircle,
  Heart,
  Calendar,
  Clock,
  Award,
  Zap
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'privacy' | 'notifications' | 'preferences'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
    avatar: currentUser?.avatar || ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    matchNotifications: true,
    reviewNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    soundEnabled: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    showLocation: true,
    showEmail: false,
    allowMessages: 'everyone',
    showCompletedExchanges: true,
    showRating: true,
    searchableProfile: true
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    distanceUnit: 'miles',
    autoSave: true,
    compactView: false,
    showTips: true
  });

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    
    setIsSaving(true);
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const exportData = () => {
    const data = {
      profile: currentUser,
      settings: {
        notifications: notificationSettings,
        privacy: privacySettings,
        preferences: preferences
      },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skillswap-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your data, messages, and connections. Type "DELETE" to confirm.')) {
        // In a real app, this would call an API
        alert('Account deletion requested. You will receive an email with further instructions.');
      }
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: SettingsIcon },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Preferences', icon: Globe }
  ];

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-colors duration-200">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                        <Camera className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{currentUser.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{currentUser.rating} rating</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{currentUser.completedExchanges} exchanges</span>
                      </div>
                      {currentUser.subscription === 'premium' && (
                        <div className="flex items-center">
                          <Crown className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-yellow-600 dark:text-yellow-400">Premium</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-50 dark:disabled:bg-gray-800 resize-none"
                      placeholder="Tell others about yourself and your skills..."
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Settings</h2>

                {/* Theme Settings */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {isDarkMode ? <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" /> : <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isDarkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isDarkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Subscription */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Subscription</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Crown className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentUser.subscription === 'premium' ? 'Premium Plan' : 'Free Plan'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {currentUser.subscription === 'premium' 
                            ? 'Unlimited matches and premium features' 
                            : 'Limited to 5 matches per month'
                          }
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      {currentUser.subscription === 'premium' ? 'Manage' : 'Upgrade'}
                    </button>
                  </div>
                </div>

                {/* Data Export */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Data Export</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Download className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Export Your Data</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Download all your profile data and settings</p>
                      </div>
                    </div>
                    <button
                      onClick={exportData}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Export
                    </button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="border border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">Danger Zone</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
                      <div>
                        <p className="font-medium text-red-900 dark:text-red-100">Delete Account</p>
                        <p className="text-sm text-red-700 dark:text-red-300">Permanently delete your account and all data</p>
                      </div>
                    </div>
                    <button
                      onClick={deleteAccount}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Privacy Settings</h2>

                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Visibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Profile Visibility</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Who can see your profile</p>
                        </div>
                        <select
                          value={privacySettings.profileVisibility}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          <option value="public">Public</option>
                          <option value="members">Members Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Show Online Status</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Let others see when you're online</p>
                        </div>
                        <button
                          onClick={() => setPrivacySettings(prev => ({ ...prev, showOnlineStatus: !prev.showOnlineStatus }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacySettings.showOnlineStatus ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacySettings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Show Location</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Display your city and state</p>
                        </div>
                        <button
                          onClick={() => setPrivacySettings(prev => ({ ...prev, showLocation: !prev.showLocation }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacySettings.showLocation ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacySettings.showLocation ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messaging */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Messaging</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Who can message you</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Control who can send you messages</p>
                      </div>
                      <select
                        value={privacySettings.allowMessages}
                        onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessages: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="verified">Verified Users Only</option>
                        <option value="matches">Matches Only</option>
                        <option value="none">No One</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notification Settings</h2>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                        { key: 'messageNotifications', label: 'New Messages', desc: 'Get notified of new messages' },
                        { key: 'matchNotifications', label: 'New Matches', desc: 'Get notified of new skill matches' },
                        { key: 'reviewNotifications', label: 'Reviews', desc: 'Get notified of new reviews' },
                        { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of your activity' },
                        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional emails and updates' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotificationSettings(prev => ({ 
                              ...prev, 
                              [setting.key]: !prev[setting.key as keyof typeof prev] 
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notificationSettings[setting.key as keyof typeof notificationSettings] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notificationSettings[setting.key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Push Notifications</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications on your device</p>
                        </div>
                        <button
                          onClick={() => setNotificationSettings(prev => ({ ...prev, pushNotifications: !prev.pushNotifications }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Sound</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Play sound for notifications</p>
                        </div>
                        <button
                          onClick={() => setNotificationSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.soundEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Preferences</h2>

                <div className="space-y-6">
                  {/* Language & Region */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/Denver">Mountain Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Display Preferences */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Display</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Compact View</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Show more content in less space</p>
                        </div>
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, compactView: !prev.compactView }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.compactView ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.compactView ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">Show Tips</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Display helpful tips and tutorials</p>
                        </div>
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, showTips: !prev.showTips }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferences.showTips ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.showTips ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import ProfileSetup from './components/profile/ProfileSetup';
import BrowseSkills from './pages/BrowseSkills';
import UserProfile from './pages/UserProfile';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SafetyPage from './pages/SafetyPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ReportPage from './pages/ReportPage';
import SettingsPage from './pages/SettingsPage';
import DirectMessage from './components/messaging/DirectMessage';
import MessageCenter from './components/messaging/MessageCenter';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse-skills" element={<BrowseSkills />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/messages" element={currentUser ? <MessageCenter /> : <Navigate to="/" />} />
        <Route path="/messages/:userId" element={currentUser ? <DirectMessage /> : <Navigate to="/" />} />
        <Route 
          path="/dashboard" 
          element={currentUser ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/settings" 
          element={currentUser ? <SettingsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile-setup" 
          element={currentUser ? <ProfileSetup /> : <Navigate to="/" />} 
        />
      </Routes>
      {currentUser && currentUser.skillsOffered.length === 0 && currentUser.skillsWanted.length === 0 && <ProfileSetup />}
    </div>
  );
}

export default App;
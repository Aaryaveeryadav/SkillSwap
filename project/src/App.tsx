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
import LoginPage from './pages/LoginPage'; // Import the new LoginPage component

function App() {
  const { currentUser, isLoading } = useAuth();

  // Show a loading spinner while authentication state is being determined
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Routes>
        {/*
          The root path '/' now points to the LoginPage if not authenticated.
          If authenticated, it redirects to the Dashboard.
        */}
        <Route 
          path="/" 
          element={currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />
        
        {/* LoginPage is now explicitly routed */}
        <Route path="/login" element={<LoginPage />} />

        {/* Public routes - accessible regardless of authentication status */}
        <Route path="/browse-skills" element={<BrowseSkills />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/user/:id" element={<UserProfile />} />

        {/* Protected routes - only accessible if currentUser exists */}
        <Route 
          path="/dashboard" 
          element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/settings" 
          element={currentUser ? <SettingsPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/profile-setup" 
          element={currentUser ? <ProfileSetup /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/messages" 
          element={currentUser ? <MessageCenter /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/messages/:userId" 
          element={currentUser ? <DirectMessage /> : <Navigate to="/login" replace />} 
        />
        
        {/*
          REMOVED: Conditional rendering of ProfileSetup directly inside <Routes>.
          This caused the "not a <Route> component" error.
          The ProfileSetup is now managed by AuthContext via the PersonalDetailsForm,
          or it can be explicitly routed if it needs to be a full page.
          If it should appear as an overlay after initial login/verification,
          that logic needs to be handled within Dashboard or a similar authenticated component.
        */}
        {/* {currentUser && currentUser.skillsOffered.length === 0 && currentUser.skillsWanted.length === 0 && <ProfileSetup />} */}
      </Routes>
    </div>
  );
}

export default App;

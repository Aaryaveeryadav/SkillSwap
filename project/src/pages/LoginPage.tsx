import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner

const LoginPage: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect them to the home page or dashboard
  useEffect(() => {
    if (!isLoading && currentUser) {
      // Redirect to dashboard if logged in, or home page if no dashboard
      navigate('/dashboard', { replace: true }); 
    }
  }, [currentUser, isLoading, navigate]);

  // If loading, show a simple loading state or a spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If not logged in, display the AuthModal
  // The AuthModal's onClose will trigger navigation to '/' which then redirects to /dashboard
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <AuthModal
        isOpen={true} // Always open on this page
        onClose={() => navigate('/dashboard', { replace: true })} // Redirect to dashboard on successful login/signup
        initialMode="login"
      />
    </div>
  );
};

export default LoginPage;

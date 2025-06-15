import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PersonalDetails } from '../types';
import PersonalDetailsForm from '../components/auth/PersonalDetailsForm';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  completeVerification: (details: PersonalDetails, learningMode: 'online' | 'offline' | 'both') => Promise<void>;
  isLoading: boolean;
  showVerificationForm: boolean;
  setShowVerificationForm: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Decode JWT token to extract user info
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('skillswap_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      
      // Show verification form if user is not verified and doesn't have personal details
      if (!user.personalDetails && user.verificationStatus !== 'verified') {
        setShowVerificationForm(true);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const user: User = {
      id: '1',
      name: 'John Doe',
      email,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'San Francisco, CA',
      rating: 4.8,
      reviewCount: 23,
      joinedDate: '2023-01-15',
      bio: 'Passionate about learning and sharing skills with others.',
      skillsOffered: [],
      skillsWanted: [],
      availability: ['evenings', 'weekends'],
      verified: true,
      isOnline: true,
      completedExchanges: 12,
      badges: [],
      verificationStatus: 'pending',
      learningMode: 'both',
      subscription: 'free'
    };
    
    setCurrentUser(user);
    localStorage.setItem('skillswap_user', JSON.stringify(user));
    setIsLoading(false);
  };

  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true);
    
    try {
      // Decode the Google JWT credential
      const googleUser = decodeJWT(credential);
      
      if (!googleUser) {
        throw new Error('Failed to decode Google credential');
      }

      // Simulate API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user from Google data
      const user: User = {
        id: googleUser.sub, // Google user ID
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: '', // Will be filled in profile setup
        rating: 0,
        reviewCount: 0,
        joinedDate: new Date().toISOString(),
        bio: '',
        skillsOffered: [],
        skillsWanted: [],
        availability: [],
        verified: googleUser.email_verified || false,
        isOnline: true,
        completedExchanges: 0,
        badges: [],
        verificationStatus: 'pending',
        learningMode: 'both',
        subscription: 'free'
      };
      
      setCurrentUser(user);
      localStorage.setItem('skillswap_user', JSON.stringify(user));
      setShowVerificationForm(true); // Show verification form for new Google users
      setIsLoading(false);
    } catch (error) {
      console.error('Google sign-in error:', error);
      setIsLoading(false);
      throw new Error('Failed to sign in with Google');
    }
  };

  const signup = async (userData: Partial<User>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      avatar: userData.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: userData.location || '',
      rating: 0,
      reviewCount: 0,
      joinedDate: new Date().toISOString(),
      bio: userData.bio || '',
      skillsOffered: userData.skillsOffered || [],
      skillsWanted: userData.skillsWanted || [],
      availability: userData.availability || [],
      verified: false,
      isOnline: true,
      completedExchanges: 0,
      badges: [],
      verificationStatus: 'pending',
      learningMode: 'both',
      subscription: 'free'
    };
    
    setCurrentUser(user);
    localStorage.setItem('skillswap_user', JSON.stringify(user));
    setShowVerificationForm(true); // Show verification form for new signups
    setIsLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('skillswap_user');
    setShowVerificationForm(false);
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  const completeVerification = async (details: PersonalDetails, learningMode: 'online' | 'offline' | 'both') => {
    if (!currentUser) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser: User = {
      ...currentUser,
      personalDetails: details,
      verificationStatus: 'verified',
      learningMode,
      verified: true,
      phone: details.phoneNumber,
      address: details.address,
      idVerified: true
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('skillswap_user', JSON.stringify(updatedUser));
    setShowVerificationForm(false);
    setIsLoading(false);
  };

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    signup,
    logout,
    updateProfile,
    completeVerification,
    isLoading,
    showVerificationForm,
    setShowVerificationForm
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showVerificationForm && (
        <PersonalDetailsForm
          onComplete={completeVerification}
          onSkip={() => setShowVerificationForm(false)}
        />
      )}
    </AuthContext.Provider>
  );
};
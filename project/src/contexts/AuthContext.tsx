import React, { createContext, useContext, useState, useEffect } from 'react';
// Removed SupabaseUser import as Supabase is removed
// import { User as SupabaseUser } from '@supabase/supabase-js'; 
// Removed supabase import as Supabase is removed
// import { supabase } from '../lib/supabase'; 
import { User, PersonalDetails, Message, Skill, VerificationStatus } from '../types'; // Import VerificationStatus type
import PersonalDetailsForm from '../components/auth/PersonalDetailsForm';
import { mockUsers, mockSkills } from '../data/mockData'; // Import mock data

interface AuthContextType {
  currentUser: User | null;
  // supabaseUser: SupabaseUser | null; // Removed as Supabase is removed
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  completeVerification: (details: PersonalDetails, learningMode: 'online' | 'offline' | 'both') => Promise<void>;
  updateMessages: (message: Message) => void;
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

// Helper to convert mock profile to User type (simplified as no Supabase profile structure now)
const convertMockProfileToUser = (profile: any): User => {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    avatar: profile.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: profile.location || '',
    rating: profile.rating || 0,
    reviewCount: profile.reviewCount || 0,
    joinedDate: profile.joinedDate || new Date().toISOString(),
    bio: profile.bio || '',
    skillsOffered: profile.skillsOffered || [],
    skillsWanted: profile.skillsWanted || [],
    availability: profile.availability || [],
    verified: profile.verified || false,
    isOnline: profile.isOnline || false,
    completedExchanges: profile.completedExchanges || 0,
    badges: profile.badges || [],
    // Ensure verificationStatus is one of the literal types
    verificationStatus: (profile.verificationStatus || 'pending') as VerificationStatus, 
    learningMode: profile.learningMode || 'both',
    subscription: profile.subscription || 'free',
    phone: profile.phone,
    address: profile.address,
    idVerified: profile.idVerified || false,
    messages: profile.messages || [] // Assuming messages are part of the user object for in-memory
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null); // Removed
  const [isLoading, setIsLoading] = useState(true);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  // Simulate initial auth check and loading user from localStorage
  useEffect(() => {
    let mounted = true; // Flag to prevent state updates on unmounted component

    const initializeAuth = async () => {
      try {
        // Simulate a short delay for initial loading
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        if (!mounted) return;

        const storedUser = localStorage.getItem('skillswap_current_user');
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            // Check if profile setup is needed (if skills are empty and not yet verified)
            if (user.skillsOffered.length === 0 && user.skillsWanted.length === 0 && user.verificationStatus !== 'verified') {
              setShowVerificationForm(true);
            }
          } catch (e) {
            console.error("Failed to parse stored user from localStorage:", e);
            localStorage.removeItem('skillswap_current_user'); // Clear corrupted data
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // No Supabase auth listener needed anymore
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => { /* ... */ });
    // return () => { mounted = false; subscription.unsubscribe(); };

    return () => {
      mounted = false; // Cleanup for useEffect
    };
  }, []);

  // Simulate login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    // Simple mock login logic
    // For demo, only 'demo@example.com' with 'demo123' works
    if (email === 'demo@example.com' && password === 'demo123') {
      const foundUserInMocks = mockUsers.find(u => u.email === email);
      
      const userToLogin: User = foundUserInMocks ? convertMockProfileToUser(foundUserInMocks) : {
        id: 'demo_user_id_123', // Assign a unique ID for the demo user
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        location: 'San Francisco, CA',
        rating: 4.8,
        reviewCount: 10,
        joinedDate: new Date().toISOString(),
        bio: 'This is a demo account. Explore the features!',
        skillsOffered: [],
        skillsWanted: [],
        availability: [],
        verified: true,
        isOnline: true,
        completedExchanges: 0,
        badges: [],
        verificationStatus: 'verified', // Explicitly typed literal
        learningMode: 'both',
        subscription: 'premium',
        phone: '555-123-4567',
        address: '123 Demo St, Demo City, CA',
        idVerified: true,
        messages: []
      };
      
      setCurrentUser(userToLogin);
      localStorage.setItem('skillswap_current_user', JSON.stringify(userToLogin));
      console.log('Login successful (mock):', email);
    } else {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    setIsLoading(false);
  };

  // Simulate Google login
  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    // For simplicity, Google login will also log in the demo user
    const userToLogin: User = {
      id: 'google_demo_user_id_456', // Assign a unique ID for Google demo user
      name: 'Google Demo User',
      email: 'google.demo@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: 'New York, NY',
      rating: 4.5,
      reviewCount: 5,
      joinedDate: new Date().toISOString(),
      bio: 'This is a Google demo account. Enjoy!',
      skillsOffered: [],
      skillsWanted: [],
      availability: [],
      verified: true,
      isOnline: true,
      completedExchanges: 0,
      badges: [],
      verificationStatus: 'verified', // Explicitly typed literal
      learningMode: 'both',
      subscription: 'free',
      phone: '555-987-6543',
      address: '456 Google Ave, Google Town, NY',
      idVerified: true,
      messages: []
    };

    setCurrentUser(userToLogin);
    localStorage.setItem('skillswap_current_user', JSON.stringify(userToLogin));
    console.log('Google login successful (mock)');
    setIsLoading(false);
  };

  // Simulate signup
  const signup = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    // Create a new mock user
    const newUser: User = {
      id: userData.email!, // Use email as ID for mock (not truly unique, but fine for demo)
      name: userData.name || 'New User',
      email: userData.email!,
      avatar: userData.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      location: userData.location || '',
      rating: 0,
      reviewCount: 0,
      joinedDate: new Date().toISOString(),
      bio: userData.bio || '',
      skillsOffered: [],
      skillsWanted: [],
      availability: [],
      verified: false,
      isOnline: true,
      completedExchanges: 0,
      badges: [],
      verificationStatus: 'pending', // Explicitly typed literal
      learningMode: 'both',
      subscription: 'free',
      messages: []
    };
    setCurrentUser(newUser);
    localStorage.setItem('skillswap_current_user', JSON.stringify(newUser));
    console.log('Signup successful (mock):', newUser.email);
    setShowVerificationForm(true); // Prompt for profile setup after signup
    setIsLoading(false);
  };

  // Simulate logout
  const logout = () => {
    console.log('Logging out (mock)...');
    setCurrentUser(null);
    localStorage.removeItem('skillswap_current_user');
    setShowVerificationForm(false);
  };

  // Simulate profile update
  const updateProfile = async (userData: Partial<User>) => {
    if (!currentUser) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    const updatedUser: User = {
      ...currentUser,
      ...userData,
      // Ensure skills are deeply copied and updated
      skillsOffered: userData.skillsOffered ? [...userData.skillsOffered] : currentUser.skillsOffered,
      skillsWanted: userData.skillsWanted ? [...userData.skillsWanted] : currentUser.skillsWanted,
      availability: userData.availability ? [...userData.availability] : currentUser.availability,
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('skillswap_current_user', JSON.stringify(updatedUser));
    console.log('Profile updated successfully (mock)');
    setIsLoading(false);
  };

  // Simulate verification completion
  const completeVerification = async (details: PersonalDetails, learningMode: 'online' | 'offline' | 'both') => {
    if (!currentUser) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    const updatedUser: User = {
      ...currentUser,
      personalDetails: details,
      verificationStatus: 'verified', // Explicitly typed literal
      learningMode: learningMode,
      verified: true,
      phone: details.phoneNumber,
      address: details.address,
      idVerified: true,
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('skillswap_current_user', JSON.stringify(updatedUser));
    setShowVerificationForm(false);
    console.log('Verification completed (mock)');
    setIsLoading(false);
  };

  // Simulate message update (in-memory only for current user)
  const updateMessages = async (message: Message) => {
    if (!currentUser) return;

    // For a real app, this would involve a backend and potentially a real-time listener
    // For this mock, we just add it to the current user's messages array
    setCurrentUser(prev => {
      if (!prev) return prev;
      // Find the other user in mockUsers to get their avatar and name for the message center
      const otherUser = mockUsers.find(u => u.id === message.receiverId || u.id === message.senderId);
      
      // If it's a message from another user (simulated), mark it as unread initially
      const isIncoming = message.senderId !== prev.id;
      const updatedMessage = { ...message, read: !isIncoming }; // Mark as read if sent by current user

      // This is a simplified in-memory message handling.
      // In a real app, messages would be stored in a database and fetched.
      // We're simulating adding messages to the current user's local state.
      const updatedMessagesArray = [...(prev.messages || []), updatedMessage];

      // Also, ensure the mock user's messages are updated if this is a message to/from them
      // This is to make the MessageCenter and DirectMessage components work correctly in demo
      const updatedMockUsers = mockUsers.map(mockUser => {
        if (mockUser.id === message.receiverId || mockUser.id === message.senderId) {
          return {
            ...mockUser,
            messages: [...(mockUser.messages || []), updatedMessage]
          };
        }
        return mockUser;
      });
      // In a real app, you wouldn't modify mockUsers directly.

      // Update localStorage with the new currentUser state
      const newCurrentUser = { ...prev, messages: updatedMessagesArray };
      localStorage.setItem('skillswap_current_user', JSON.stringify(newCurrentUser));

      return newCurrentUser;
    });
    console.log('Message sent/received (mock):', message);
  };

  const value = {
    currentUser,
    // supabaseUser: null, // Removed
    login,
    loginWithGoogle,
    signup,
    logout,
    updateProfile,
    completeVerification,
    updateMessages,
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

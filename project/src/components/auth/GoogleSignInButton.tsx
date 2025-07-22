import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  text?: 'signin_with' | 'signup_with' | 'continue_with';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  width?: number;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  text = 'signin_with',
  theme = 'outline',
  size = 'large',
  width = 320
}) => {
  const { loginWithGoogle } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize Google GSI if window.google is available
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        // client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Removed direct usage of env for client_id
        // For local demo without a backend, we'll use a placeholder client_id.
        // In a real app, this would be your actual Google Client ID.
        client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com', 
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: 'popup', // Changed to popup for better local dev experience
      });

      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: 'standard',
          theme: theme,
          size: size,
          text: text,
          width: width,
          logo_alignment: 'left',
        });
      }
    }
  }, [theme, size, text, width]);

  const handleCredentialResponse = async (response: any) => {
    try {
      // In a real application, you would send this credential to your backend
      // for verification and user authentication.
      // For this demo, we'll just pass a mock credential to AuthContext.
      await loginWithGoogle(response.credential); 
      onSuccess?.();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to sign in with Google');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div ref={googleButtonRef} className="google-signin-button" />
    </div>
  );
};

// Extend the Window interface to include Google Sign-In
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default GoogleSignInButton;

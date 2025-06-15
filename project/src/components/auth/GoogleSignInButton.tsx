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
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com', // Replace with your actual client ID
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
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
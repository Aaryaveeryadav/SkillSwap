import React, { useState, useEffect } from 'react';
import { Video, Phone, X, Users } from 'lucide-react';
import VideoCallModal from './VideoCallModal';

interface VideoCallInvitationProps {
  invitation: {
    roomId: string;
    fromUser: {
      id: string;
      name: string;
      avatar: string;
    };
    timestamp: string;
  };
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
  onAccept: () => void;
  onDecline: () => void;
}

const VideoCallInvitation: React.FC<VideoCallInvitationProps> = ({
  invitation,
  currentUser,
  onAccept,
  onDecline
}) => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds to respond

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onDecline(); // Auto-decline when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDecline]);

  const handleAccept = () => {
    setShowVideoCall(true);
    onAccept();
  };

  return (
    <>
      {/* Invitation Popup */}
      <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 z-50 max-w-sm transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Video className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Incoming Video Call</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">from {invitation.fromUser.name}</p>
            </div>
          </div>
          <button
            onClick={onDecline}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <img
            src={invitation.fromUser.avatar}
            alt={invitation.fromUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{invitation.fromUser.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">wants to start a video call</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expires in <span className="font-semibold text-red-600 dark:text-red-400">{timeLeft}s</span>
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onDecline}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
          >
            <Phone className="h-4 w-4 mr-2 rotate-[135deg]" />
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <Video className="h-4 w-4 mr-2" />
            Accept
          </button>
        </div>
      </div>

      {/* Video Call Modal */}
      {showVideoCall && (
        <VideoCallModal
          isOpen={showVideoCall}
          onClose={() => setShowVideoCall(false)}
          roomId={invitation.roomId}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default VideoCallInvitation;
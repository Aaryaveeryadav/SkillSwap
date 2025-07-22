import React, { useState } from 'react';
import { Video, Phone, Users } from 'lucide-react';
import VideoCallModal from './VideoCallModal';

interface VideoCallButtonProps {
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    learningMode: 'online' | 'offline' | 'both';
  };
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
  className?: string;
}

const VideoCallButton: React.FC<VideoCallButtonProps> = ({ 
  otherUser, 
  currentUser, 
  className = '' 
}) => {
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [roomId, setRoomId] = useState<string>('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const startVideoCall = async () => {
    if (otherUser.learningMode === 'offline') {
      alert('This user prefers in-person meetings only and doesn\'t accept video calls.');
      return;
    }

    setIsCreatingRoom(true);
    
    try {
      // Create a new room
      const response = await fetch('http://localhost:5000/api/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hostId: currentUser.id,
          hostName: currentUser.name
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create video call room');
      }

      const data = await response.json();
      setRoomId(data.roomId);
      setShowVideoCall(true);
      
      // In a real app, you would send an invitation to the other user
      // For demo purposes, we'll just show a notification
      console.log(`Video call invitation sent to ${otherUser.name}`);
      console.log(`Room ID: ${data.roomId}`);
      console.log(`Join URL: ${data.joinUrl}`);
      
    } catch (error) {
      console.error('Error starting video call:', error);
      alert('Failed to start video call. Please try again.');
    } finally {
      setIsCreatingRoom(false);
    }
  };

  // Don't show video call button for offline-only users
  if (otherUser.learningMode === 'offline') {
    return null;
  }

  return (
    <>
      <button
        onClick={startVideoCall}
        disabled={isCreatingRoom}
        className={`bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center ${className}`}
      >
        {isCreatingRoom ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Starting...
          </>
        ) : (
          <>
            <Video className="h-4 w-4 mr-2" />
            Video Call
          </>
        )}
      </button>

      {showVideoCall && roomId && (
        <VideoCallModal
          isOpen={showVideoCall}
          onClose={() => setShowVideoCall(false)}
          roomId={roomId}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default VideoCallButton;
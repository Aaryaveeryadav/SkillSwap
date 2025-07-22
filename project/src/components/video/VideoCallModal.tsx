import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, Phone, MessageCircle, Users, Settings } from 'lucide-react';
import io, { Socket } from 'socket.io-client';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface Participant {
  id: string;
  name: string;
  socketId: string;
  videoEnabled: boolean;
  audioEnabled: boolean;
  stream?: MediaStream;
}

interface ChatMessage {
  id: string;
  message: string;
  sender: string;
  senderId: string;
  timestamp: Date;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, roomId, currentUser }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const peersRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const localStreamRef = useRef<MediaStream | null>(null);
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const servers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  useEffect(() => {
    if (!isOpen) return;

    initializeCall();

    return () => {
      cleanup();
    };
  }, [isOpen, roomId]);

  const initializeCall = async () => {
    try {
      setIsConnecting(true);
      setConnectionError(null);

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize socket connection
      socketRef.current = io('http://localhost:5000', {
        transports: ['websocket']
      });

      const socket = socketRef.current;

      socket.on('connect', () => {
        console.log('Connected to video server');
        socket.emit('join-room', {
          roomId,
          userId: currentUser.id,
          userName: currentUser.name
        });
      });

      socket.on('room-users', (users: any[]) => {
        console.log('Current room users:', users);
        setParticipants(users.map(user => ({
          ...user,
          videoEnabled: true,
          audioEnabled: true
        })));
        setIsConnecting(false);
      });

      socket.on('user-joined', (userData: any) => {
        console.log('User joined:', userData);
        setParticipants(prev => [...prev, {
          ...userData,
          videoEnabled: true,
          audioEnabled: true
        }]);
        createPeerConnection(userData.socketId, true);
      });

      socket.on('user-left', (userData: any) => {
        console.log('User left:', userData);
        setParticipants(prev => prev.filter(p => p.socketId !== userData.socketId));
        
        const peer = peersRef.current.get(userData.socketId);
        if (peer) {
          peer.close();
          peersRef.current.delete(userData.socketId);
        }
      });

      socket.on('offer', async (data: any) => {
        console.log('Received offer from:', data.sender);
        await handleOffer(data);
      });

      socket.on('answer', async (data: any) => {
        console.log('Received answer from:', data.sender);
        await handleAnswer(data);
      });

      socket.on('ice-candidate', async (data: any) => {
        await handleIceCandidate(data);
      });

      socket.on('user-audio-toggle', (data: any) => {
        setParticipants(prev => prev.map(p => 
          p.id === data.userId ? { ...p, audioEnabled: data.audioEnabled } : p
        ));
      });

      socket.on('user-video-toggle', (data: any) => {
        setParticipants(prev => prev.map(p => 
          p.id === data.userId ? { ...p, videoEnabled: data.videoEnabled } : p
        ));
      });

      socket.on('chat-message', (message: ChatMessage) => {
        setChatMessages(prev => [...prev, message]);
      });

      socket.on('error', (error: any) => {
        console.error('Socket error:', error);
        setConnectionError(error.message);
        setIsConnecting(false);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from video server');
        setConnectionError('Disconnected from server');
      });

    } catch (error) {
      console.error('Error initializing call:', error);
      setConnectionError('Failed to access camera/microphone');
      setIsConnecting(false);
    }
  };

  const createPeerConnection = async (socketId: string, isInitiator: boolean) => {
    const peer = new RTCPeerConnection(servers);
    peersRef.current.set(socketId, peer);

    // Add local stream tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        peer.addTrack(track, localStreamRef.current!);
      });
    }

    // Handle remote stream
    peer.ontrack = (event) => {
      console.log('Received remote stream from:', socketId);
      setParticipants(prev => prev.map(p => 
        p.socketId === socketId ? { ...p, stream: event.streams[0] } : p
      ));
    };

    // Handle ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          target: socketId,
          candidate: event.candidate
        });
      }
    };

    // Create offer if initiator
    if (isInitiator) {
      try {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        
        if (socketRef.current) {
          socketRef.current.emit('offer', {
            target: socketId,
            sdp: offer
          });
        }
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }
  };

  const handleOffer = async (data: any) => {
    const peer = new RTCPeerConnection(servers);
    peersRef.current.set(data.sender, peer);

    // Add local stream tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        peer.addTrack(track, localStreamRef.current!);
      });
    }

    // Handle remote stream
    peer.ontrack = (event) => {
      console.log('Received remote stream from:', data.sender);
      setParticipants(prev => prev.map(p => 
        p.socketId === data.sender ? { ...p, stream: event.streams[0] } : p
      ));
    };

    // Handle ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          target: data.sender,
          candidate: event.candidate
        });
      }
    };

    try {
      await peer.setRemoteDescription(new RTCSessionDescription(data.sdp));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      
      if (socketRef.current) {
        socketRef.current.emit('answer', {
          target: data.sender,
          sdp: answer
        });
      }
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (data: any) => {
    const peer = peersRef.current.get(data.sender);
    if (peer) {
      try {
        await peer.setRemoteDescription(new RTCSessionDescription(data.sdp));
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    }
  };

  const handleIceCandidate = async (data: any) => {
    const peer = peersRef.current.get(data.sender);
    if (peer) {
      try {
        await peer.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (error) {
        console.error('Error handling ICE candidate:', error);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        
        if (socketRef.current) {
          socketRef.current.emit('toggle-audio', { audioEnabled: audioTrack.enabled });
        }
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        
        if (socketRef.current) {
          socketRef.current.emit('toggle-video', { videoEnabled: videoTrack.enabled });
        }
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      socketRef.current.emit('chat-message', { message: newMessage.trim() });
      setNewMessage('');
    }
  };

  const cleanup = () => {
    // Close all peer connections
    peersRef.current.forEach(peer => peer.close());
    peersRef.current.clear();

    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Disconnect socket
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // Reset state
    setParticipants([]);
    setChatMessages([]);
    setIsConnecting(true);
    setConnectionError(null);
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Video Call</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {participants.length + 1} participant{participants.length !== 0 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Video Area */}
          <div className="flex-1 bg-gray-900 relative">
            {isConnecting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Connecting to video call...</p>
                </div>
              </div>
            )}

            {connectionError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white bg-red-600 p-6 rounded-lg">
                  <p className="font-semibold mb-2">Connection Error</p>
                  <p className="text-sm">{connectionError}</p>
                  <button
                    onClick={initializeCall}
                    className="mt-4 bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Video Grid */}
            <div className={`grid gap-2 p-4 h-full ${
              participants.length === 0 ? 'grid-cols-1' :
              participants.length === 1 ? 'grid-cols-2' :
              participants.length <= 3 ? 'grid-cols-2 grid-rows-2' :
              'grid-cols-3 grid-rows-2'
            }`}>
              {/* Local Video */}
              <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  You {!isVideoEnabled && '(Video Off)'}
                </div>
                {!isVideoEnabled && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <VideoOff className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Video Off</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Remote Videos */}
              {participants.map((participant) => (
                <RemoteVideo
                  key={participant.socketId}
                  participant={participant}
                />
              ))}
            </div>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Chat</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {message.sender}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {message.message}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full transition-colors ${
                isAudioEnabled 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                isVideoEnabled 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
            </button>

            <button
              onClick={handleClose}
              className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RemoteVideo: React.FC<{ participant: Participant }> = ({ participant }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      {participant.stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Connecting...</p>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        {participant.name} {!participant.videoEnabled && '(Video Off)'}
      </div>
      
      {!participant.videoEnabled && participant.stream && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center text-white">
            <VideoOff className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Video Off</p>
          </div>
        </div>
      )}
      
      {!participant.audioEnabled && (
        <div className="absolute top-2 right-2">
          <MicOff className="h-4 w-4 text-red-500" />
        </div>
      )}
    </div>
  );
};

export default VideoCallModal;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../data/mockData';
import { Message, User } from '../../types';
import { ArrowLeft, Send, Video, Phone, MoreVertical, Smile, Flag, UserX, Volume2, VolumeX, Archive, Trash2, CheckCircle2 } from 'lucide-react';

const DirectMessage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [allMessagesRead, setAllMessagesRead] = useState(false);

  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
    '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
    '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏',
    '🙌', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
    '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐',
    '⭐', '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️',
    '🌤️', '⛅', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️', '☃️', '⛄'
  ];

  const reportReasons = [
    'Inappropriate behavior',
    'Harassment or bullying',
    'Spam or scam',
    'Fake profile',
    'Inappropriate content',
    'Safety concerns',
    'Other'
  ];

  // Mock message history for each user
  const getMessagesForUser = (userId: string): Message[] => {
    const messageHistory: { [key: string]: Message[] } = {
      '1': [ // Sarah Johnson
        {
          id: 'msg-1-1',
          senderId: '1',
          receiverId: 'current-user',
          content: 'Hi! I saw your profile and noticed you want to learn Photoshop. I\'m a professional graphic designer and would love to help!',
          timestamp: '2024-01-15T09:00:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-1-2',
          senderId: 'current-user',
          receiverId: '1',
          content: 'That sounds amazing! I\'ve been wanting to learn Photoshop for so long. What would you like to learn in exchange?',
          timestamp: '2024-01-15T09:15:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-1-3',
          senderId: '1',
          receiverId: 'current-user',
          content: 'I\'ve always wanted to learn guitar! I see you\'re advanced level. Would you be interested in teaching me the basics?',
          timestamp: '2024-01-15T09:30:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-1-4',
          senderId: 'current-user',
          receiverId: '1',
          content: 'Absolutely! I\'d love to teach you guitar. When would be a good time to start our first session?',
          timestamp: '2024-01-15T10:00:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-1-5',
          senderId: '1',
          receiverId: 'current-user',
          content: 'How about this weekend? I\'m free Saturday afternoon. We could do a video call first to plan our exchange schedule!',
          timestamp: '2024-01-15T10:30:00Z',
          read: false,
          type: 'text'
        }
      ],
      '2': [ // Miguel Rodriguez
        {
          id: 'msg-2-1',
          senderId: '2',
          receiverId: 'current-user',
          content: 'Hola! I noticed you\'re interested in learning Spanish. I\'m a native speaker and would love to help you!',
          timestamp: '2024-01-14T16:00:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-2-2',
          senderId: 'current-user',
          receiverId: '2',
          content: 'That would be fantastic! I\'ve been trying to learn Spanish for travel. What would you like to learn from me?',
          timestamp: '2024-01-14T16:30:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-2-3',
          senderId: '2',
          receiverId: 'current-user',
          content: 'I\'d love to learn cooking! Especially Italian cuisine. I saw you have experience with pasta making.',
          timestamp: '2024-01-14T17:00:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-2-4',
          senderId: 'current-user',
          receiverId: '2',
          content: 'Perfect! I can teach you how to make authentic pasta from scratch. Let me share my grandmother\'s recipe!',
          timestamp: '2024-01-14T18:00:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-2-5',
          senderId: '2',
          receiverId: 'current-user',
          content: 'Thanks for the cooking tips! The pasta recipe you shared was amazing. My family loved it. Could we schedule another session next week?',
          timestamp: '2024-01-14T18:45:00Z',
          read: true,
          type: 'text'
        }
      ],
      '3': [ // Emma Chen
        {
          id: 'msg-3-1',
          senderId: '3',
          receiverId: 'current-user',
          content: 'Hi there! I\'m Emma, a yoga instructor. I saw you\'re interested in learning yoga and I\'d love to teach you!',
          timestamp: '2024-01-13T14:00:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-3-2',
          senderId: 'current-user',
          receiverId: '3',
          content: 'That sounds wonderful! I\'ve been wanting to start yoga for stress relief. What would you like to learn in return?',
          timestamp: '2024-01-13T14:30:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-3-3',
          senderId: '3',
          receiverId: 'current-user',
          content: 'I\'ve been wanting to improve my photography skills! I see you\'re advanced level. Could you teach me portrait photography?',
          timestamp: '2024-01-13T15:00:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-3-4',
          senderId: 'current-user',
          receiverId: '3',
          content: 'Absolutely! Portrait photography is one of my specialties. I can teach you lighting, composition, and editing techniques.',
          timestamp: '2024-01-13T15:30:00Z',
          read: true,
          type: 'text'
        },
        {
          id: 'msg-3-5',
          senderId: '3',
          receiverId: 'current-user',
          content: 'Hey! I just finished setting up my photography equipment. Ready for our first lesson tomorrow? I\'m excited to learn from you!',
          timestamp: '2024-01-13T16:20:00Z',
          read: true,
          type: 'text'
        }
      ]
    };
    
    return messageHistory[userId] || [];
  };

  useEffect(() => {
    if (userId) {
      const user = mockUsers.find(u => u.id === userId);
      setOtherUser(user || null);
      
      // Load message history for this user
      if (user) {
        const messageHistory = getMessagesForUser(userId);
        setMessages(messageHistory);
        
        // Mark all messages as read when opening the conversation
        const updatedMessages = messageHistory.map(msg => ({ ...msg, read: true }));
        setMessages(updatedMessages);
        setAllMessagesRead(true);
      }
    }

    // Check if we came from a comment reply
    if (location.state?.replyToComment) {
      const { replyToComment, userName } = location.state;
      setNewMessage(`Replying to your comment: "${replyToComment.substring(0, 50)}${replyToComment.length > 50 ? '...' : ''}"\n\n`);
    }
  }, [userId, currentUser, location.state]);

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUser || !otherUser) return;
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId: otherUser.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true, // Your own messages are automatically read
      type: 'text'
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const startVideoCall = () => {
    if (!currentUser || !otherUser) return;
    
    if (otherUser.learningMode === 'offline') {
      alert('This user prefers in-person meetings only and doesn\'t accept video calls.');
      return;
    }
    
    // Generate a mock video call link
    const videoCallLink = `https://meet.skillswap.com/call/${currentUser.id}-${otherUser.id}`;
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId: otherUser.id,
      content: 'Started a video call',
      timestamp: new Date().toISOString(),
      read: true,
      type: 'video-call',
      videoCallLink
    };
    
    setMessages(prev => [...prev, message]);
    
    // Open video call in new window
    window.open(videoCallLink, '_blank');
  };

  const makePhoneCall = () => {
    if (!otherUser || !otherUser.phone) {
      alert('Phone number not available for this user.');
      return;
    }
    
    // Use tel: protocol to initiate phone call
    window.location.href = `tel:${otherUser.phone}`;
  };

  const handleReport = () => {
    if (!reportReason) {
      alert('Please select a reason for reporting.');
      return;
    }
    
    // Navigate to report page with pre-filled information
    navigate(`/report?user=${encodeURIComponent(otherUser?.name || '')}&email=${encodeURIComponent(otherUser?.email || '')}`);
  };

  const blockUser = () => {
    if (confirm(`Are you sure you want to block ${otherUser?.name}? You won't receive messages from them anymore.`)) {
      alert(`${otherUser?.name} has been blocked.`);
      navigate('/messages');
    }
  };

  const archiveConversation = () => {
    if (confirm('Archive this conversation? You can find it in your archived messages.')) {
      alert('Conversation archived.');
      navigate('/messages');
    }
  };

  const deleteConversation = () => {
    if (confirm('Delete this conversation? This action cannot be undone.')) {
      alert('Conversation deleted.');
      navigate('/messages');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!otherUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">User not found</h1>
          <p className="text-gray-600 mt-2">The user you're trying to message doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium text-gray-900">{otherUser.name}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">
                  {otherUser.isOnline ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Online
                    </span>
                  ) : (
                    'Last seen recently'
                  )}
                </p>
                {allMessagesRead && (
                  <span className="flex items-center text-xs text-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    All messages read
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Video Call Button */}
            <button
              onClick={startVideoCall}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Start video call"
            >
              <Video className="h-5 w-5" />
            </button>
            
            {/* Phone Call Button */}
            <button
              onClick={makePhoneCall}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Make phone call"
            >
              <Phone className="h-5 w-5" />
            </button>
            
            {/* More Options */}
            <div className="relative">
              <button
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              
              {showMoreOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    {isMuted ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                    {isMuted ? 'Unmute notifications' : 'Mute notifications'}
                  </button>
                  
                  <button
                    onClick={() => {
                      archiveConversation();
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive conversation
                  </button>
                  
                  <button
                    onClick={() => {
                      handleReport();
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report user
                  </button>
                  
                  <button
                    onClick={() => {
                      blockUser();
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Block user
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={() => {
                      deleteConversation();
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete conversation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
              <p className="text-gray-600 mb-4">
                Say hello to {otherUser.name} and start your skill exchange journey!
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Introduce yourself and mention which skills you'd like to exchange!
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isFromCurrentUser = message.senderId === 'current-user';
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isFromCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.type === 'video-call' ? (
                      <div className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span className="text-sm">Video call started</span>
                        {message.videoCallLink && (
                          <a
                            href={message.videoCallLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs underline"
                          >
                            Join
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${
                        isFromCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                      {message.read && (
                        <CheckCircle2 className={`h-3 w-3 ${
                          isFromCurrentUser ? 'text-blue-200' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-10 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="text-xl hover:bg-gray-200 rounded p-1 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-2 rounded-lg transition-colors ${
                showEmojiPicker 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Smile className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${otherUser.name}...`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showMoreOptions || showEmojiPicker) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowMoreOptions(false);
            setShowEmojiPicker(false);
          }}
        />
      )}
    </div>
  );
};

export default DirectMessage;
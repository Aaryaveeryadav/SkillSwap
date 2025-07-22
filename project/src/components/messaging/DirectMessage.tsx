import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// import { supabase } from '../../lib/supabase'; // Removed Supabase import
import { Message, User } from '../../types';
import { ArrowLeft, Send, Video, Phone, MoreVertical, Smile, Flag, UserX, Volume2, VolumeX, Archive, Trash2, CheckCircle2 } from 'lucide-react';
import { mockUsers } from '../../data/mockData'; // Import mockUsers

const DirectMessage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { currentUser, updateMessages } = useAuth(); // Removed supabaseUser
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉'
  ];

  useEffect(() => {
    // Simulate loading other user and messages
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (userId && currentUser) {
        // Find other user from mock data
        const foundOtherUser = mockUsers.find(u => u.id === userId);
        if (foundOtherUser) {
          setOtherUser(foundOtherUser);

          // Filter messages relevant to this conversation from currentUser's messages
          const conversationMessages = currentUser.messages?.filter(
            msg => (msg.senderId === currentUser.id && msg.receiverId === userId) ||
                   (msg.senderId === userId && msg.receiverId === currentUser.id)
          ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) || [];
          
          setMessages(conversationMessages);

          // Mark messages as read (in-memory only)
          const updatedCurrentUserMessages = currentUser.messages?.map(msg => {
            if (msg.senderId === userId && msg.receiverId === currentUser.id && !msg.read) {
              return { ...msg, read: true };
            }
            return msg;
          }) || [];
          // This is a simple in-memory update. In a real app, this would trigger a backend update.
          // For now, we'll re-set the currentUser with updated messages to reflect read status.
          // Note: This directly modifies currentUser which is not ideal in a large app,
          // but acceptable for a simple in-memory demo.
          if (currentUser.messages?.some(msg => msg.senderId === userId && !msg.read)) {
             // Simulate updating currentUser in AuthContext to mark messages as read
             // This is a simplified approach for in-memory demo
             updateMessages({
                id: 'mock_read',
                senderId: currentUser.id,
                receiverId: userId,
                content: 'MARK_AS_READ_SIGNAL', // Dummy content
                timestamp: new Date().toISOString(),
                read: true,
                type: 'text'
             });
          }

        } else {
          console.error('Other user not found in mock data.');
        }
      }
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [userId, currentUser]); // Depend on userId and currentUser

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !otherUser) return;
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: otherUser.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false, // Mark as unread for receiver until they open it
      type: 'text'
    };
    
    // Update local state immediately
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate sending message to the other user (in-memory for demo)
    // In a real app, this would send to backend, which then notifies receiver.
    updateMessages(message); // This will add it to currentUser.messages
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
      senderId: currentUser.id,
      receiverId: otherUser.id,
      content: 'Started a video call',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'video-call',
      videoCallLink
    };
    
    // Update local state
    setMessages(prev => [...prev, message]);
    
    // Simulate sending message
    updateMessages(message);
    
    // Open video call in new window
    window.open(videoCallLink, '_blank');
  };

  const makePhoneCall = () => {
    if (!otherUser || !otherUser.phone) {
      // Replaced alert with a custom message box as per instructions
      const messageBox = document.createElement('div');
      messageBox.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
      messageBox.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p class="text-gray-900 dark:text-gray-100 mb-4">Phone number not available for this user.</p>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg" onclick="this.parentNode.parentNode.remove()">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      return;
    }
    
    window.location.href = `tel:${otherUser.phone}`;
  };

  const handleReport = () => {
    if (otherUser) {
      navigate(`/report?user=${encodeURIComponent(otherUser.name)}&email=${encodeURIComponent(otherUser.email)}`);
    }
  };

  const blockUser = () => {
    // Replaced confirm with a custom message box as per instructions
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    messageBox.innerHTML = `
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <p class="text-gray-900 dark:text-gray-100 mb-4">Are you sure you want to block ${otherUser?.name}? You won't receive messages from them anymore.</p>
        <div class="flex justify-center space-x-4">
          <button class="bg-red-500 text-white px-4 py-2 rounded-lg" onclick="this.parentNode.parentNode.parentNode.remove(); alert('${otherUser?.name} has been blocked.'); window.location.href='/messages';">Yes, Block</button>
          <button class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg" onclick="this.parentNode.parentNode.parentNode.remove()">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(messageBox);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  if (isLoading || !currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[600px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!otherUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The user you're trying to message doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col transition-colors duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{otherUser.name}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {otherUser.isOnline ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Online
                    </span>
                  ) : (
                    'Last seen recently'
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={startVideoCall}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Start video call"
            >
              <Video className="h-5 w-5" />
            </button>
            
            <button
              onClick={makePhoneCall}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              title="Make phone call"
            >
              <Phone className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              
              {showMoreOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    {isMuted ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                    {isMuted ? 'Unmute notifications' : 'Mute notifications'}
                  </button>
                  
                  <button
                    onClick={() => {
                      handleReport();
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report user
                  </button>
                  
                  <button
                    onClick={() => {
                      blockUser();
                      setShowMoreOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Block user
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smile className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Start a conversation</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Say hello to {otherUser.name} and start your skill exchange journey!
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Tip:</strong> Introduce yourself and mention which skills you'd like to exchange!
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isFromCurrentUser = message.senderId === currentUser.id;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isFromCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
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
                        isFromCurrentUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                      {message.read && (
                        <CheckCircle2 className={`h-3 w-3 ${
                          isFromCurrentUser ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'
                        }`} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {showEmojiPicker && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-10 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="text-xl hover:bg-gray-200 dark:hover:bg-gray-600 rounded p-1 transition-colors"
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
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Smile className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${otherUser.name}...`}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// import { supabase } from '../../lib/supabase'; // Removed Supabase import
import { MessageCircle, Users } from 'lucide-react';
import { User, Message } from '../../types'; // Import User and Message types

interface ConversationData {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar_url: string;
    is_online: boolean;
  };
  lastMessage: {
    content: string;
    created_at: string;
    sender_id: string;
    message_type: string;
  };
  unreadCount: number;
}

const MessageCenter: React.FC = () => {
  const { currentUser, updateMessages } = useAuth(); // Removed supabaseUser
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading conversations from currentUser's in-memory messages
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (currentUser && currentUser.messages && currentUser.messages.length > 0) {
        const processedConversations: ConversationData[] = [];
        const latestMessagesByOtherUser: { [otherUserId: string]: Message } = {};

        // Group messages by other user and find the latest one
        currentUser.messages.forEach(msg => {
          const otherId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
          if (!latestMessagesByOtherUser[otherId] || new Date(msg.timestamp) > new Date(latestMessagesByOtherUser[otherId].timestamp)) {
            latestMessagesByOtherUser[otherId] = msg;
          }
        });

        for (const otherId in latestMessagesByOtherUser) {
          const lastMsg = latestMessagesByOtherUser[otherId];
          
          // Create a mock other user profile (since we don't have a backend to fetch it)
          // For demo, we'll use a placeholder or assume fixed mock users
          const mockOtherUser: ConversationData['otherUser'] = 
            otherId === 'demo@example.com' ? { id: 'demo@example.com', name: 'Demo User', avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_online: true } :
            otherId === '1' ? { id: '1', name: 'Sarah Johnson', avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_online: true } :
            otherId === '2' ? { id: '2', name: 'Miguel Rodriguez', avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_online: false } :
            otherId === '3' ? { id: '3', name: 'Emma Chen', avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', is_online: true } :
            { id: otherId, name: `User ${otherId.substring(0,4)}`, avatar_url: 'https://placehold.co/150x150/aabbcc/ffffff?text=U', is_online: false };

          // Calculate unread count (in-memory)
          const unreadCount = currentUser.messages.filter(
            msg => msg.senderId === otherId && !msg.read
          ).length;

          processedConversations.push({
            id: `conv-${otherId}`, // Mock conversation ID
            otherUser: mockOtherUser,
            lastMessage: {
              content: lastMsg.content,
              created_at: lastMsg.timestamp,
              sender_id: lastMsg.senderId,
              message_type: lastMsg.type,
            },
            unreadCount: unreadCount,
          });
        }
        // Sort by latest message
        setConversations(processedConversations.sort((a, b) => new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime()));
      } else {
        setConversations([]);
      }
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [currentUser, updateMessages]); // Depend on currentUser and updateMessages

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getMessagePreview = (message: any) => {
    if (message.message_type === 'video-call') {
      return 'Started a video call';
    }
    return message.content.length > 40 ? `${message.content.substring(0, 40)}...` : message.content;
  };

  const handleConversationClick = (conversation: ConversationData) => {
    // Mark messages as read in current user's in-memory messages
    if (currentUser) {
      const updatedMessages = currentUser.messages?.map(msg => 
        (msg.senderId === conversation.otherUser.id && !msg.read) ? { ...msg, read: true } : msg
      ) || [];
      // This is a bit of a hack for in-memory, as updateMessages is for sending.
      // In a real app, you'd have a specific action for marking messages read.
      // For now, we'll just navigate and rely on the DirectMessage component to handle its view.
      // A more robust in-memory solution would involve a custom context for messages.
      // For now, we'll just simulate the navigation.
      updateMessages({ // This is not ideal for marking read, but it's the closest mock action
        id: 'mock_read_action',
        senderId: currentUser.id,
        receiverId: conversation.otherUser.id,
        content: 'Messages marked as read',
        timestamp: new Date().toISOString(),
        read: true,
        type: 'text'
      });
    }
    navigate(`/messages/${conversation.otherUser.id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[600px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[600px] flex transition-colors duration-200">
        <div className="w-full border-r border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2" />
              Messages
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {conversations.length > 0 
                ? `${conversations.length} conversation${conversations.length > 1 ? 's' : ''}`
                : 'Start connecting with people'}
            </p>
          </div>
          
          <div className="overflow-y-auto h-[500px]">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleConversationClick(conversation)}
                className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 text-left transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.otherUser.avatar_url || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                      alt={conversation.otherUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.otherUser.is_online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-xs text-white font-bold">{conversation.unreadCount}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">
                        {conversation.otherUser.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(conversation.lastMessage.created_at)}
                      </p>
                    </div>
                    
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 
                        ? 'text-gray-900 dark:text-gray-100 font-medium' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {conversation.lastMessage.sender_id === currentUser?.id ? 'You: ' : ''}
                      {getMessagePreview(conversation.lastMessage)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
            
            {conversations.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No messages yet</h4>
                <p className="text-gray-600 dark:text-gray-400">Start connecting with people to begin conversations!</p>
                <button 
                  onClick={() => navigate('/browse-skills')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Find People to Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Conversation, Message } from '../../types';
import { MessageCircle, Send, ArrowLeft, Clock, CheckCircle2, Users } from 'lucide-react';

const MessageCenter: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [permanentlyReadConversations, setPermanentlyReadConversations] = useState<Set<string>>(new Set());

  // Mock conversations with CORRECT user IDs and actual message content
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participants: [
        {
          id: '1', // Sarah Johnson's correct ID
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          email: 'sarah@example.com',
          location: 'San Francisco, CA',
          rating: 4.9,
          reviewCount: 45,
          joinedDate: '2023-01-15',
          bio: 'Graphic designer passionate about teaching Photoshop',
          skillsOffered: [],
          skillsWanted: [],
          availability: ['evenings'],
          verified: true,
          isOnline: true,
          completedExchanges: 12,
          badges: [],
          verificationStatus: 'verified',
          learningMode: 'both',
          subscription: 'premium'
        }
      ],
      lastMessage: {
        id: '1',
        senderId: '1', // From Sarah
        receiverId: 'current-user',
        content: 'Hi! I saw you want to learn Photoshop. I\'d love to teach you in exchange for guitar lessons! When would be a good time to start?',
        timestamp: '2024-01-15T10:30:00Z',
        read: false,
        type: 'text'
      },
      unreadCount: 1,
      skillExchange: {
        theyTeach: {
          id: '1',
          name: 'Photoshop',
          category: 'Design',
          level: 'intermediate',
          description: 'Photo editing and digital art',
          tags: []
        },
        youTeach: {
          id: '2',
          name: 'Guitar',
          category: 'Music',
          level: 'advanced',
          description: 'Acoustic and electric guitar',
          tags: []
        },
        status: 'proposed'
      }
    },
    {
      id: '2',
      participants: [
        {
          id: '2', // Miguel Rodriguez's correct ID
          name: 'Miguel Rodriguez',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          email: 'miguel@example.com',
          location: 'Austin, TX',
          rating: 4.8,
          reviewCount: 32,
          joinedDate: '2022-11-08',
          bio: 'Professional guitarist and Spanish tutor',
          skillsOffered: [],
          skillsWanted: [],
          availability: ['mornings', 'afternoons'],
          verified: true,
          isOnline: false,
          completedExchanges: 8,
          badges: [],
          verificationStatus: 'verified',
          learningMode: 'online',
          subscription: 'free'
        }
      ],
      lastMessage: {
        id: '2',
        senderId: '2', // From Miguel
        receiverId: 'current-user',
        content: 'Thanks for the cooking tips! The pasta recipe you shared was amazing. My family loved it. Could we schedule another session next week?',
        timestamp: '2024-01-14T18:45:00Z',
        read: false,
        type: 'text'
      },
      unreadCount: 1,
      skillExchange: {
        theyTeach: {
          id: '3',
          name: 'Spanish',
          category: 'Languages',
          level: 'advanced',
          description: 'Conversational and business Spanish',
          tags: []
        },
        youTeach: {
          id: '4',
          name: 'Cooking',
          category: 'Cooking',
          level: 'intermediate',
          description: 'Italian cuisine and pasta making',
          tags: []
        },
        status: 'in-progress'
      }
    },
    {
      id: '3',
      participants: [
        {
          id: '3', // Emma Chen's correct ID
          name: 'Emma Chen',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          email: 'emma@example.com',
          location: 'New York, NY',
          rating: 4.7,
          reviewCount: 28,
          joinedDate: '2023-03-22',
          bio: 'Chef and yoga instructor',
          skillsOffered: [],
          skillsWanted: [],
          availability: ['evenings', 'weekends'],
          verified: true,
          isOnline: true,
          completedExchanges: 15,
          badges: [],
          verificationStatus: 'verified',
          learningMode: 'offline',
          subscription: 'free'
        }
      ],
      lastMessage: {
        id: '3',
        senderId: '3', // From Emma
        receiverId: 'current-user',
        content: 'Hey! I just finished setting up my photography equipment. Ready for our first lesson tomorrow? I\'m excited to learn from you!',
        timestamp: '2024-01-13T16:20:00Z',
        read: true,
        type: 'text'
      },
      unreadCount: 0,
      skillExchange: {
        theyTeach: {
          id: '5',
          name: 'Yoga',
          category: 'Sports',
          level: 'advanced',
          description: 'Hatha and Vinyasa yoga',
          tags: []
        },
        youTeach: {
          id: '6',
          name: 'Photography',
          category: 'Photography',
          level: 'advanced',
          description: 'Portrait and landscape photography',
          tags: []
        },
        status: 'accepted'
      }
    }
  ]);

  // Mock message history for each conversation
  const getMessagesForConversation = (conversationId: string): Message[] => {
    const messageHistory: { [key: string]: Message[] } = {
      '1': [ // Sarah's conversation
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
          content: 'Hi! I saw you want to learn Photoshop. I\'d love to teach you in exchange for guitar lessons! When would be a good time to start?',
          timestamp: '2024-01-15T10:30:00Z',
          read: true, // This will be marked as read when user visits the DM
          type: 'text'
        }
      ],
      '2': [ // Miguel's conversation
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
          read: true, // This will be marked as read when user visits the DM
          type: 'text'
        }
      ],
      '3': [ // Emma's conversation
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
    
    return messageHistory[conversationId] || [];
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

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

  const handleConversationClick = (conversation: Conversation) => {
    const otherUser = conversation.participants[0];
    
    // Mark conversation as permanently read
    setPermanentlyReadConversations(prev => new Set([...prev, conversation.id]));
    
    // Update the conversation's unread count to 0 and mark last message as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { 
              ...conv, 
              unreadCount: 0, 
              lastMessage: { ...conv.lastMessage, read: true } 
            }
          : conv
      )
    );
    
    // Navigate to direct message with the CORRECT user ID
    navigate(`/messages/${otherUser.id}`);
  };

  // Calculate unread count - only show if not permanently read
  const getDisplayUnreadCount = (conversation: Conversation) => {
    return permanentlyReadConversations.has(conversation.id) ? 0 : conversation.unreadCount;
  };

  // Calculate total unread count excluding permanently read conversations
  const totalUnreadCount = conversations
    .filter(c => !permanentlyReadConversations.has(c.id))
    .reduce((sum, c) => sum + c.unreadCount, 0);

  // Check if conversation should show as read
  const isConversationRead = (conversation: Conversation) => {
    return permanentlyReadConversations.has(conversation.id) || conversation.unreadCount === 0;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] flex">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden md:block' : 'block'} w-full md:w-1/2 lg:w-1/3 border-r border-gray-200`}>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2" />
              Messages
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {totalUnreadCount > 0 ? `${totalUnreadCount} unread conversations` : 'All messages read'}
            </p>
          </div>
          
          <div className="overflow-y-auto h-[500px]">
            {conversations.map((conversation) => {
              const otherUser = conversation.participants[0];
              const displayUnreadCount = getDisplayUnreadCount(conversation);
              const isRead = isConversationRead(conversation);
              
              return (
                <button
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                  className={`w-full p-4 hover:bg-gray-50 border-b border-gray-100 text-left transition-colors ${
                    !isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={otherUser.avatar}
                        alt={otherUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {otherUser.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {displayUnreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-xs text-white font-bold">{displayUnreadCount}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium truncate ${
                          !isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {otherUser.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </p>
                      </div>
                      
                      {/* Show the actual message content */}
                      <p className={`text-sm truncate ${
                        !isRead ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {conversation.lastMessage.content}
                      </p>
                      
                      {/* Skill Exchange Info */}
                      {conversation.skillExchange && (
                        <div className="mt-2">
                          <div className="flex items-center text-xs text-blue-600">
                            <span className="bg-blue-100 px-2 py-1 rounded-full">
                              {conversation.skillExchange.theyTeach.name} ↔ {conversation.skillExchange.youTeach.name}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Read status indicator - only show if read */}
                      {isRead && (
                        <div className="flex items-center mt-2">
                          <span className="inline-flex items-center text-xs text-gray-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Read
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            
            {conversations.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h4>
                <p className="text-gray-600">Start connecting with people to begin conversations!</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className={`${selectedConversation ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden mr-3 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <img
                  src={selectedConversation.participants[0].avatar}
                  alt={selectedConversation.participants[0].name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {selectedConversation.participants[0].name}
                  </h4>
                  {selectedConversation.skillExchange && (
                    <p className="text-xs text-gray-500">
                      {selectedConversation.skillExchange.theyTeach.name} ↔ {selectedConversation.skillExchange.youTeach.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {getMessagesForConversation(selectedConversation.id).map((message) => {
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
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            isFromCurrentUser ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Messages</h3>
                <p className="text-gray-600 mb-4">Select a conversation to start chatting</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Click on any conversation to see the full message history and continue chatting!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
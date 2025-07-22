import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification, Comment } from '../../types';
import { Bell, X, MessageCircle, Users, Star, Calendar, Shield, Heart, Eye, ThumbsUp, CheckCircle } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose, onMarkAllRead }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'notifications' | 'comments'>('notifications');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: '1',
      type: 'match',
      title: 'New Skill Match!',
      message: 'Sarah Johnson can teach you Photoshop and wants to learn Guitar',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      actionUrl: '/user/2'
    },
    {
      id: '2',
      userId: '1',
      type: 'message',
      title: 'New Message',
      message: 'Miguel sent you a message about guitar lessons',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      actionUrl: '/messages/2'
    },
    {
      id: '3',
      userId: '1',
      type: 'verification',
      title: 'Verification Complete',
      message: 'Your account has been verified! You now have a verified badge.',
      timestamp: '2024-01-14T16:45:00Z',
      read: true
    },
    {
      id: '4',
      userId: '1',
      type: 'review',
      title: 'New Review',
      message: 'Emma left you a 5-star review for your cooking lesson',
      timestamp: '2024-01-14T14:20:00Z',
      read: true,
      actionUrl: '/profile'
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'Great tutorial! Your Photoshop techniques are amazing. Would love to learn more about layer masking. I\'ve been struggling with creating realistic shadows and your approach seems so much more intuitive than what I\'ve been trying.',
      timestamp: '2024-01-15T11:30:00Z',
      likes: 5,
      replies: [
        {
          id: '1-1',
          userId: '1',
          userName: 'You',
          userAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'Thanks Sarah! I\'d be happy to teach you layer masking in exchange for guitar lessons. Layer masking is actually one of my favorite techniques because it\'s non-destructive and gives you so much flexibility.',
          timestamp: '2024-01-15T12:00:00Z',
          likes: 2
        }
      ]
    },
    {
      id: '2',
      userId: '3',
      userName: 'Miguel Rodriguez',
      userAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'Your guitar playing is incredible! That fingerpicking technique you showed really helped me improve. I\'ve been practicing the pattern you demonstrated and I can already see progress. Do you have any recommendations for songs that would help me practice this technique further?',
      timestamp: '2024-01-15T10:15:00Z',
      likes: 8
    },
    {
      id: '3',
      userId: '4',
      userName: 'Emma Chen',
      userAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'The cooking tips you shared were so helpful! My pasta turned out perfect thanks to your guidance. I never knew about the importance of pasta water salinity - that tip alone made such a huge difference. My family was amazed at how restaurant-quality the dish turned out!',
      timestamp: '2024-01-14T18:45:00Z',
      likes: 12
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case 'meeting':
        return <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'verification':
        return <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    onMarkAllRead?.();
  };

  const likeComment = (commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleReply = (comment: Comment) => {
    // Navigate to DMs with the user and include the comment context
    navigate(`/messages/${comment.userId}`, { 
      state: { 
        replyToComment: comment.content,
        userName: comment.userName 
      } 
    });
    onClose();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden transition-colors duration-200">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Activity Center</h2>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Bell className="h-4 w-4 inline mr-2" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'comments'
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Comments
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-96">
          {activeTab === 'notifications' ? (
            <div className="p-6 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    notification.read
                      ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{comment.userName}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => likeComment(comment.id)}
                          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-xs">{comment.likes}</span>
                        </button>
                        <button 
                          onClick={() => handleReply(comment)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                          Reply
                        </button>
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 ml-4 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-3">
                              <img
                                src={reply.userAvatar}
                                alt={reply.userName}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{reply.userName}</h5>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatTime(reply.timestamp)}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 leading-relaxed">{reply.content}</p>
                                <div className="flex items-center space-x-3">
                                  <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                    <Heart className="h-3 w-3 mr-1" />
                                    <span className="text-xs">{reply.likes}</span>
                                  </button>
                                  <button 
                                    onClick={() => handleReply(comment)}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
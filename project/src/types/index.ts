export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  bio: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: string[];
  verified: boolean;
  isOnline?: boolean;
  lastSeen?: string;
  completedExchanges: number;
  badges: Badge[];
  // New verification fields
  personalDetails?: PersonalDetails;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  learningMode: 'online' | 'offline' | 'both';
  subscription: 'free' | 'premium';
  phone?: string;
  address?: string;
  idVerified?: boolean;
  // Messages
  messages?: Message[];
}

// Export the VerificationStatus type explicitly
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  idType: 'passport' | 'drivers_license' | 'national_id';
  idNumber: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  yearsOfExperience?: number;
  tags: string[];
  // New certification fields
  hasCertification?: boolean;
  certificationName?: string;
  certificationIssuer?: string;
  certificationDate?: string;
  portfolioUrl?: string;
  additionalExperience?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Match {
  id: string;
  user: User;
  compatibility: number;
  sharedSkills: {
    theyTeach: Skill;
    youTeach: Skill;
  }[];
  distance: string;
  availabilityMatch: boolean;
  mutualConnections: number;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  skillTaught: string;
  helpful: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'skill-request' | 'meeting-proposal' | 'video-call';
  videoCallLink?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  skillExchange?: {
    theyTeach: Skill;
    youTeach: Skill;
    status: 'proposed' | 'accepted' | 'in-progress' | 'completed';
  };
}

export interface SkillExchange {
  id: string;
  participants: User[];
  skillsExchanged: {
    user1Teaches: Skill;
    user2Teaches: Skill;
  };
  status: 'proposed' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  meetingSchedule: Meeting[];
  progress: {
    user1Progress: number;
    user2Progress: number;
  };
}

export interface Meeting {
  id: string;
  exchangeId: string;
  date: string;
  time: string;
  location: string;
  type: 'in-person' | 'online';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'review' | 'meeting' | 'system' | 'skill_request' | 'verification';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  data?: any;
}

export interface VideoTool {
  id: string;
  name: string;
  type: string;
  category: 'anime' | 'game' | 'ai-animation';
  features: string[];
  freePlan: string;
  goodFor: string;
  url: string;
  rating: number;
  difficulty: 'easy' | 'medium' | 'hard';
  watermark: boolean;
}

export interface VideoProject {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: 'anime' | 'game' | 'tutorial' | 'showcase';
  creator: User;
  toolsUsed: { id: string; name: string }[];
  tags: string[];
  likes: number;
  views: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
  maxMatches: number;
  prioritySupport: boolean;
  advancedFilters: boolean;
  videoCallMinutes: number;
}

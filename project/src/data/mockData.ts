import { User, Skill, Match, Review, VideoProject } from '../types';

export const skillCategories = [
  'Technology',
  'Design',
  'Music',
  'Languages',
  'Cooking',
  'Sports',
  'Arts & Crafts',
  'Business',
  'Photography',
  'Writing'
];

export const mockSkills: Skill[] = [
  { id: '1', name: 'Photoshop', category: 'Design', level: 'advanced', description: 'Photo editing and digital art', tags: [], yearsOfExperience: 5 },
  { id: '2', name: 'Guitar', category: 'Music', level: 'advanced', description: 'Acoustic and electric guitar', tags: [], yearsOfExperience: 8 },
  { id: '3', name: 'Spanish', category: 'Languages', level: 'advanced', description: 'Conversational and business Spanish', tags: [], yearsOfExperience: 10 },
  { id: '4', name: 'Cooking', category: 'Cooking', level: 'intermediate', description: 'Italian cuisine and pasta making', tags: [], yearsOfExperience: 3 },
  { id: '5', name: 'Photography', category: 'Photography', level: 'advanced', description: 'Portrait and landscape photography', tags: [], yearsOfExperience: 6 },
  { id: '6', name: 'Web Development', category: 'Technology', level: 'intermediate', description: 'React and JavaScript', tags: [], yearsOfExperience: 4 },
  { id: '7', name: 'Piano', category: 'Music', level: 'beginner', description: 'Classical and contemporary piano', tags: [], yearsOfExperience: 1 },
  { id: '8', name: 'Yoga', category: 'Sports', level: 'advanced', description: 'Hatha and Vinyasa yoga', tags: [], yearsOfExperience: 7 },
  { id: '9', name: 'French', category: 'Languages', level: 'intermediate', description: 'Conversational French', tags: [], yearsOfExperience: 3 },
  { id: '10', name: 'Digital Marketing', category: 'Business', level: 'advanced', description: 'SEO, social media, and content marketing', tags: [], yearsOfExperience: 5 },
  { id: '11', name: 'Watercolor Painting', category: 'Arts & Crafts', level: 'intermediate', description: 'Landscape and portrait watercolors', tags: [], yearsOfExperience: 4 },
  { id: '12', name: 'Public Speaking', category: 'Business', level: 'advanced', description: 'Presentation skills and confidence building', tags: [], yearsOfExperience: 6 }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviewCount: 45,
    joinedDate: '2023-01-15',
    bio: 'Graphic designer passionate about teaching Photoshop and learning new musical instruments.',
    skillsOffered: [
      { ...mockSkills[0], level: 'advanced', yearsOfExperience: 5 },
      { ...mockSkills[4], level: 'advanced', yearsOfExperience: 6 },
      { ...mockSkills[10], level: 'intermediate', yearsOfExperience: 4 }
    ],
    skillsWanted: [
      { ...mockSkills[1], level: 'beginner', description: 'Want to learn basic guitar chords and strumming' },
      { ...mockSkills[6], level: 'beginner', description: 'Interested in learning piano fundamentals' },
      { ...mockSkills[8], level: 'beginner', description: 'Want to learn French for travel' }
    ],
    availability: ['evenings', 'weekends'],
    verified: true,
    isOnline: true,
    completedExchanges: 12,
    badges: [],
    verificationStatus: 'verified',
    learningMode: 'both',
    subscription: 'premium'
  },
  {
    id: '2',
    name: 'Miguel Rodriguez',
    email: 'miguel@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'Austin, TX',
    rating: 4.8,
    reviewCount: 32,
    joinedDate: '2022-11-08',
    bio: 'Professional guitarist and Spanish tutor. Love sharing music and language skills!',
    skillsOffered: [
      { ...mockSkills[1], level: 'advanced', yearsOfExperience: 8 },
      { ...mockSkills[2], level: 'advanced', yearsOfExperience: 10 },
      { ...mockSkills[11], level: 'advanced', yearsOfExperience: 6 }
    ],
    skillsWanted: [
      { ...mockSkills[0], level: 'intermediate', description: 'Want to improve my design skills for album covers' },
      { ...mockSkills[5], level: 'beginner', description: 'Interested in learning web development' },
      { ...mockSkills[4], level: 'intermediate', description: 'Want to improve my photography for concerts' }
    ],
    availability: ['mornings', 'afternoons'],
    verified: true,
    isOnline: false,
    lastSeen: '2024-01-15T10:30:00Z',
    completedExchanges: 8,
    badges: [],
    verificationStatus: 'verified',
    learningMode: 'online',
    subscription: 'free'
  },
  {
    id: '3',
    name: 'Emma Chen',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'New York, NY',
    rating: 4.7,
    reviewCount: 28,
    joinedDate: '2023-03-22',
    bio: 'Chef and yoga instructor passionate about healthy living and creative cooking.',
    skillsOffered: [
      { ...mockSkills[3], level: 'advanced', yearsOfExperience: 8 },
      { ...mockSkills[7], level: 'advanced', yearsOfExperience: 7 },
      { ...mockSkills[8], level: 'intermediate', yearsOfExperience: 3 }
    ],
    skillsWanted: [
      { ...mockSkills[4], level: 'intermediate', description: 'Want to learn food photography for my blog' },
      { ...mockSkills[5], level: 'beginner', description: 'Interested in building a website for my yoga studio' },
      { ...mockSkills[9], level: 'intermediate', description: 'Want to improve my digital marketing skills' }
    ],
    availability: ['evenings', 'weekends'],
    verified: true,
    isOnline: true,
    completedExchanges: 15,
    badges: [],
    verificationStatus: 'verified',
    learningMode: 'offline',
    subscription: 'free'
  },
  {
    id: '4',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'Seattle, WA',
    rating: 4.6,
    reviewCount: 18,
    joinedDate: '2023-06-10',
    bio: 'Software developer and digital marketing enthusiast. Always eager to learn new creative skills.',
    skillsOffered: [
      { ...mockSkills[5], level: 'advanced', yearsOfExperience: 4 },
      { ...mockSkills[9], level: 'advanced', yearsOfExperience: 5 }
    ],
    skillsWanted: [
      { ...mockSkills[1], level: 'beginner', description: 'Always wanted to learn guitar' },
      { ...mockSkills[3], level: 'beginner', description: 'Want to learn cooking basics' },
      { ...mockSkills[10], level: 'intermediate', description: 'Interested in watercolor painting' }
    ],
    availability: ['evenings', 'weekends'],
    verified: true,
    isOnline: true,
    completedExchanges: 6,
    badges: [],
    verificationStatus: 'verified',
    learningMode: 'both',
    subscription: 'premium'
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lisa@example.com',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviewCount: 52,
    joinedDate: '2022-08-20',
    bio: 'Language teacher and public speaking coach. I believe communication is the key to connection.',
    skillsOffered: [
      { ...mockSkills[8], level: 'advanced', yearsOfExperience: 8 },
      { ...mockSkills[11], level: 'advanced', yearsOfExperience: 6 },
      { ...mockSkills[6], level: 'intermediate', yearsOfExperience: 2 }
    ],
    skillsWanted: [
      { ...mockSkills[0], level: 'intermediate', description: 'Want to create better visual presentations' },
      { ...mockSkills[4], level: 'beginner', description: 'Interested in portrait photography' },
      { ...mockSkills[7], level: 'beginner', description: 'Want to learn yoga for stress relief' }
    ],
    availability: ['mornings', 'evenings'],
    verified: true,
    isOnline: false,
    lastSeen: '2024-01-14T18:45:00Z',
    completedExchanges: 20,
    badges: [],
    verificationStatus: 'verified',
    learningMode: 'both',
    subscription: 'free'
  }
];

// Generate matches based on complementary skills
export const generateMatches = (currentUser: User): Match[] => {
  if (!currentUser) return [];

  const potentialMatches = mockUsers.filter(user => user.id !== currentUser.id);
  const matches: Match[] = [];

  potentialMatches.forEach(user => {
    const sharedSkills: { theyTeach: Skill; youTeach: Skill }[] = [];
    let compatibility = 0;

    // Find skills where they can teach what you want to learn
    currentUser.skillsWanted.forEach(wantedSkill => {
      user.skillsOffered.forEach(offeredSkill => {
        if (offeredSkill.name.toLowerCase() === wantedSkill.name.toLowerCase()) {
          // Find what you can teach them in return
          const youCanTeach = currentUser.skillsOffered.find(yourSkill =>
            user.skillsWanted.some(theirWanted => 
              theirWanted.name.toLowerCase() === yourSkill.name.toLowerCase()
            )
          );

          if (youCanTeach) {
            sharedSkills.push({
              theyTeach: offeredSkill,
              youTeach: youCanTeach
            });
            
            // Calculate compatibility based on skill levels and experience
            const levelMatch = calculateLevelCompatibility(wantedSkill.level, offeredSkill.level);
            const experienceBonus = offeredSkill.yearsOfExperience ? Math.min(offeredSkill.yearsOfExperience * 2, 20) : 0;
            compatibility += levelMatch + experienceBonus;
          }
        }
      });
    });

    // Add availability bonus
    const availabilityMatch = currentUser.availability.some(time => 
      user.availability.includes(time)
    );
    if (availabilityMatch) compatibility += 15;

    // Add location bonus (simplified - same city)
    if (currentUser.location === user.location) compatibility += 10;

    // Add rating bonus
    compatibility += user.rating * 5;

    // Add learning mode compatibility
    if (currentUser.learningMode === user.learningMode || 
        currentUser.learningMode === 'both' || 
        user.learningMode === 'both') {
      compatibility += 10;
    }

    // Premium users get slight boost
    if (user.subscription === 'premium') compatibility += 5;

    // Only include if there are shared skills and reasonable compatibility
    if (sharedSkills.length > 0 && compatibility > 30) {
      matches.push({
        id: `match-${user.id}`,
        user,
        compatibility: Math.min(Math.round(compatibility), 99),
        sharedSkills,
        distance: calculateDistance(currentUser.location, user.location),
        availabilityMatch,
        mutualConnections: Math.floor(Math.random() * 5)
      });
    }
  });

  return matches.sort((a, b) => b.compatibility - a.compatibility);
};

const calculateLevelCompatibility = (wantedLevel: string, offeredLevel: string): number => {
  const levels = { beginner: 1, intermediate: 2, advanced: 3 };
  const wanted = levels[wantedLevel as keyof typeof levels] || 1;
  const offered = levels[offeredLevel as keyof typeof levels] || 1;
  
  // Perfect if teacher level is same or higher than desired learning level
  if (offered >= wanted) return 25;
  // Slight penalty if teacher level is lower than desired
  return Math.max(15 - (wanted - offered) * 5, 5);
};

const calculateDistance = (location1: string, location2: string): string => {
  // Simplified distance calculation
  if (location1 === location2) return '0.5 miles';
  
  const distances = ['2.3 miles', '5.7 miles', '8.1 miles', '12.4 miles', '18.9 miles'];
  return distances[Math.floor(Math.random() * distances.length)];
};

export const mockMatches: Match[] = [
  {
    id: '1',
    user: mockUsers[0],
    compatibility: 95,
    sharedSkills: [
      { theyTeach: mockSkills[0], youTeach: mockSkills[1] }
    ],
    distance: '2.3 miles',
    availabilityMatch: true,
    mutualConnections: 3
  },
  {
    id: '2',
    user: mockUsers[1],
    compatibility: 87,
    sharedSkills: [
      { theyTeach: mockSkills[1], youTeach: mockSkills[5] }
    ],
    distance: '5.7 miles',
    availabilityMatch: false,
    mutualConnections: 1
  },
  {
    id: '3',
    user: mockUsers[2],
    compatibility: 78,
    sharedSkills: [
      { theyTeach: mockSkills[3], youTeach: mockSkills[4] }
    ],
    distance: '8.1 miles',
    availabilityMatch: true,
    mutualConnections: 2
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    reviewerId: '2',
    reviewerName: 'Miguel Rodriguez',
    reviewerAvatar: mockUsers[1].avatar,
    rating: 5,
    comment: 'Sarah taught me Photoshop basics in exchange for guitar lessons. Great experience!',
    date: '2024-01-15',
    skillTaught: 'Photoshop',
    helpful: 12
  },
  {
    id: '2',
    reviewerId: '3',
    reviewerName: 'Emma Chen',
    reviewerAvatar: mockUsers[2].avatar,
    rating: 5,
    comment: 'Learned amazing cooking techniques from Emma. Highly recommend!',
    date: '2024-01-08',
    skillTaught: 'Italian Cooking',
    helpful: 8
  }
];

export const mockVideoProjects: VideoProject[] = [
  {
    id: '1',
    title: 'Anime Character Design Tutorial',
    description: 'Learn how to create stunning anime characters using digital art techniques',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    duration: '12:34',
    category: 'tutorial',
    creator: mockUsers[0],
    toolsUsed: [
      { id: '1', name: 'Photoshop' },
      { id: '2', name: 'Procreate' }
    ],
    tags: ['anime', 'character design', 'digital art'],
    likes: 1250,
    views: 15600,
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '2',
    title: 'Guitar Fingerpicking Masterclass',
    description: 'Master the art of fingerpicking with these essential techniques',
    thumbnail: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    duration: '18:45',
    category: 'tutorial',
    creator: mockUsers[1],
    toolsUsed: [
      { id: '3', name: 'Guitar' },
      { id: '4', name: 'Audio Recording' }
    ],
    tags: ['guitar', 'fingerpicking', 'music'],
    likes: 890,
    views: 12400,
    createdAt: '2024-01-08T16:20:00Z'
  },
  {
    id: '3',
    title: 'Healthy Cooking Made Simple',
    description: 'Quick and nutritious recipes for busy professionals',
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    duration: '15:22',
    category: 'tutorial',
    creator: mockUsers[2],
    toolsUsed: [
      { id: '5', name: 'Kitchen Equipment' },
      { id: '6', name: 'Video Editing' }
    ],
    tags: ['cooking', 'healthy', 'recipes'],
    likes: 2100,
    views: 28900,
    createdAt: '2024-01-05T11:15:00Z'
  }
];
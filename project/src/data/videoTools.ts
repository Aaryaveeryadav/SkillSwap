import { VideoTool } from '../types';

export const animeVideoTools: VideoTool[] = [
  {
    id: '1',
    name: 'CapCut',
    type: 'Online editor (no-code)',
    category: 'anime',
    features: ['Anime templates', 'effects', 'audio sync', 'AI-generated scenes'],
    freePlan: 'Full features with watermark',
    goodFor: 'TikTok-style anime edits or meme videos',
    url: 'https://www.capcut.com',
    rating: 4.5,
    difficulty: 'easy',
    watermark: true
  },
  {
    id: '2',
    name: 'Kaiber',
    type: 'AI video generator',
    category: 'anime',
    features: ['Text to video', 'Image to video', 'Stylized animations', 'Anime/cyberpunk styles'],
    freePlan: 'Limited resolution + watermark',
    goodFor: 'AI anime music videos (AMVs)',
    url: 'https://kaiber.ai',
    rating: 4.7,
    difficulty: 'medium',
    watermark: true
  },
  {
    id: '3',
    name: 'Pika Labs',
    type: 'AI video generator (early access)',
    category: 'anime',
    features: ['Text-to-video', 'Style prompts', 'Anime/3D/pixel art'],
    freePlan: 'Free if accepted into beta',
    goodFor: 'Experimental anime content',
    url: 'https://pika.art',
    rating: 4.3,
    difficulty: 'medium',
    watermark: false
  },
  {
    id: '4',
    name: 'Animoto',
    type: 'Drag-and-drop editor',
    category: 'anime',
    features: ['Anime slideshow templates', 'Gaming trailers', 'Music sync'],
    freePlan: 'Limited resolution + watermark',
    goodFor: 'Anime slideshows and gaming trailers',
    url: 'https://animoto.com',
    rating: 4.1,
    difficulty: 'easy',
    watermark: true
  }
];

export const gameVideoTools: VideoTool[] = [
  {
    id: '5',
    name: 'Powtoon',
    type: 'Animated video maker',
    category: 'game',
    features: ['Gaming intro templates', 'Explainer videos', 'Character animations'],
    freePlan: 'Limited exports with watermark',
    goodFor: 'Game concept presentations or YouTube content',
    url: 'https://www.powtoon.com',
    rating: 4.2,
    difficulty: 'medium',
    watermark: true
  },
  {
    id: '6',
    name: 'Renderforest',
    type: 'All-in-one video generator',
    category: 'game',
    features: ['Gaming logo intros', 'Trailers', 'Character animations', 'Music library'],
    freePlan: 'Limited quality + watermark',
    goodFor: 'Professional gaming content',
    url: 'https://www.renderforest.com',
    rating: 4.4,
    difficulty: 'medium',
    watermark: true
  },
  {
    id: '7',
    name: 'FlexClip',
    type: 'Online editor with templates',
    category: 'game',
    features: ['Gaming trailers', 'Anime openings', 'Background music', 'Text animations'],
    freePlan: '720p video with watermark',
    goodFor: 'Quick gaming content creation',
    url: 'https://www.flexclip.com',
    rating: 4.3,
    difficulty: 'easy',
    watermark: true
  },
  {
    id: '8',
    name: 'VEED.IO',
    type: 'Simple online editor',
    category: 'game',
    features: ['Game highlight edits', 'Subtitles', 'Overlays', 'Screen recording'],
    freePlan: 'Basic exports with watermark',
    goodFor: 'Game highlight reels',
    url: 'https://www.veed.io',
    rating: 4.6,
    difficulty: 'easy',
    watermark: true
  }
];

export const aiAnimationTools: VideoTool[] = [
  {
    id: '9',
    name: 'DeepMotion',
    type: 'AI motion capture',
    category: 'ai-animation',
    features: ['3D character animation', 'Webcam motion capture', 'Anime character support'],
    freePlan: '60 seconds/month',
    goodFor: 'Animate 3D anime characters',
    url: 'https://www.deepmotion.com',
    rating: 4.0,
    difficulty: 'hard',
    watermark: false
  },
  {
    id: '10',
    name: 'Animaker',
    type: '2D animation platform',
    category: 'ai-animation',
    features: ['Anime-style characters', 'Drag-and-drop scenes', 'Voice sync'],
    freePlan: 'Limited exports/month',
    goodFor: '2D anime character animation',
    url: 'https://www.animaker.com',
    rating: 4.1,
    difficulty: 'medium',
    watermark: true
  }
];

export const allVideoTools = [...animeVideoTools, ...gameVideoTools, ...aiAnimationTools];
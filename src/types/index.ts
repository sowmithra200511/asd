export interface UserData {
  name: string;
  age: number;
  learningLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredThemes: string[];
  avatar: string;
}

export interface Progress {
  totalScenarios: number;
  completedScenarios: number;
  stars: number;
  badges: string[];
  level: number;
  streakDays: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  theme: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  emoji: string;
  situation: string;
  steps: ConversationStep[];
}

export interface ConversationStep {
  id: string;
  type: 'prompt' | 'choice' | 'input' | 'feedback';
  content: string;
  emotion?: string;
  choices?: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    stars: number;
  }[];
  hint?: string;
  correctResponse?: string;
}

export interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  emotion?: string;
  timestamp: Date;
}
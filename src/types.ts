export type HabitatType = 'all' | 'snow' | 'forest' | 'desert' | 'plateau' | 'mystic';
export type FoxCategory = 'all' | 'real' | 'mythical';

export interface FoxPassiveSkill {
  name: string;
  badge: string;
  description: string;
}

export interface FoxStats {
  cuteness: number; // 1-100
  fluffiness: number; // 1-100
  agility: number; // 1-100
  curiosity: number; // 1-100
  magicPower?: number; // 1-100
}

export interface FoxVocalization {
  soundText: string;
  soundDesc: string;
}

export interface FoxSpecies {
  id: string;
  name: string;
  englishName: string;
  scientificName: string;
  category: 'real' | 'mythical';
  habitat: 'snow' | 'forest' | 'desert' | 'plateau' | 'mystic';
  habitatLabel: string;
  themeColor: string; // Tailwind color class or hex
  accentBg: string;
  avatarEmoji: string;
  subtitle: string;
  description: string;
  personalityTraits: string[];
  stats: FoxStats;
  passiveSkill: FoxPassiveSkill;
  diet: string;
  sizeWeight: string;
  lifespan: string;
  vocalization: FoxVocalization;
  funFacts: string[];
  cuteQuote: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    text: string;
    description: string;
    icon: string;
    targetFoxId: string;
  }[];
}

export interface ColdFact {
  id: number;
  foxName: string;
  title: string;
  fact: string;
  category: string;
  tagEmoji: string;
}

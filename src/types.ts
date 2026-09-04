export type HabitatType = 'all' | 'snow' | 'forest' | 'desert' | 'plateau' | 'mystic' | 'grassland' | 'rainforest';
export type FoxCategory = 'all' | 'real' | 'mythical' | 'easter-egg';

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
  category: 'real' | 'mythical' | 'easter-egg';
  habitat: 'snow' | 'forest' | 'desert' | 'plateau' | 'mystic' | 'grassland' | 'rainforest';
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
  isEasterEgg?: boolean;
  easterEggNote?: string;
}

export interface MythVsRealityItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  mythName: string;
  realName: string;
  mythCulture: string;
  mythDescription: string;
  mythSuperpower: string;
  realFact: string;
  scientificExplanation: string;
  culturalInsight: string;
  keyComparison: {
    feature: string;
    legendSays: string;
    scienceSays: string;
  }[];
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

// 10 Interactive Action Types
export type PetActionType =
  | 'pat'        // 1. 摸摸揉臉
  | 'feed'       // 2. 美食投餵
  | 'brush'      // 3. 輕柔梳毛
  | 'play'       // 4. 丟球逗狐
  | 'bath'       // 5. 溫泉沐浴
  | 'sleep'      // 6. 搖籃安睡
  | 'adventure'  // 7. 後山探險
  | 'blessing'   // 8. 靈力祈福
  | 'dress'      // 9. 飾品裝扮
  | 'snapshot';  // 10. 拍立得手帳

export type FoxEvolutionStage = 'baby' | 'adult' | 'mystic';

export interface FoxAccessory {
  id: string;
  name: string;
  icon: string;
  category: 'head' | 'neck' | 'aura';
  description: string;
}

export interface AdoptedFox {
  speciesId: string;
  customName: string;
  adoptedAt: string;
  level: number;
  exp: number;
  stage: FoxEvolutionStage;
  hunger: number;     // 0 - 100
  happiness: number;  // 0 - 100
  energy: number;     // 0 - 100
  spirit: number;     // 0 - 100 (Spiritual Power)
  fluffiness: number; // 0 - 100
  equippedAccessoryId?: string;
  adventureLog: {
    id: string;
    date: string;
    location: string;
    itemFound: string;
    story: string;
  }[];
  snapshots: {
    id: string;
    date: string;
    title: string;
    note: string;
    stage: FoxEvolutionStage;
  }[];
}

// Courtyard Garden Placeable items
export interface GardenSnackItem {
  id: string;
  name: string;
  emoji: string;
  attractionBonus: string;
  desc: string;
}

export interface GardenToyItem {
  id: string;
  name: string;
  emoji: string;
  desc: string;
}

export type GamePlayMode = 'adopt' | 'idle' | 'encyclopedia' | 'myth-vs-reality';

export interface GardenVisitor {
  id: string;
  speciesId: string;
  activity: string;
  visitedAt: string;
  satisfaction: number;
  giftGiven?: boolean;
}

export interface GardenState {
  placedSnack: GardenSnackItem | null;
  placedToy: GardenToyItem | null;
  visitors: GardenVisitor[];
  coins: number;
  unlockedFoxIds: string[];
}

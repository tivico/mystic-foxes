import { AdoptedFox, FoxDailyJournalEntry } from '../types';
import { FOX_SPECIES_LIST } from '../data/foxesData';

const JOURNAL_STORAGE_KEY = 'fox_daily_journal_entries';

// Helper to format date string YYYY-MM-DD
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentTimeString(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = hours < 6 ? '清晨' : hours < 12 ? '上午' : hours < 18 ? '下午' : '夜晚';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${period} ${displayHours}:${minutes}`;
}

// Seed entries for first-time opening
function getInitialSeedEntries(foxName: string, speciesName: string): FoxDailyJournalEntry[] {
  const now = new Date();
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const twoDaysAgo = new Date(now);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

  return [
    {
      id: `seed-${yesterdayStr}`,
      date: yesterdayStr,
      timeStr: '黃昏 05:40',
      weatherMood: '晚霞微風',
      title: '尾巴蓬蓬的秋日散步',
      content: `今天主人幫我梳了三次毛，我的大尾巴變得蓬鬆得像剛出爐的棉花糖！在窗台上曬太陽時，有一隻彩色的蝴蝶飛過，我用小爪子抓了一下，雖然沒抓到，但主人看著我笑了好久。我覺得這裡是我最喜歡的家。`,
      favoriteMoment: '主人拿軟毛梳輕輕梳我後頸的時候，喉嚨忍不住發出呼嚕聲。',
      moodEmoji: '🌸',
      statsSnapshot: { happiness: 92, fluffiness: 88, level: 1 },
      ownerReply: '看你舒服得眼睛瞇成一條線，心情也跟著被治癒了。',
    },
    {
      id: `seed-${twoDaysAgoStr}`,
      date: twoDaysAgoStr,
      timeStr: '午後 02:15',
      weatherMood: '窗外微雨',
      title: '第一天來到這裡的心情',
      content: `初次被主人領回家，其實心裡有點害羞。主人給我起了可愛的名字叫「${foxName}」，還準備了溫暖的坐墊。外頭下著滴滴答答的小雨，我悄悄蜷縮在主人的腳邊，聞著淡淡的茶香，不知不覺就睡了一個好香的午覺。`,
      favoriteMoment: '主人第一次伸出手摸摸我的耳朵尖尖。',
      moodEmoji: '🐾',
      statsSnapshot: { happiness: 85, fluffiness: 80, level: 1 },
    },
  ];
}

/**
 * Load all stored journal entries
 */
export function loadJournalEntries(foxName = '小狐狸', speciesName = '赤狐'): FoxDailyJournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load journal entries from localStorage', err);
  }

  // Seed default entries
  const seed = getInitialSeedEntries(foxName, speciesName);
  saveJournalEntries(seed);
  return seed;
}

/**
 * Save entries back to localStorage
 */
export function saveJournalEntries(entries: FoxDailyJournalEntry[]): void {
  try {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.warn('Failed to save journal entries', err);
  }
}

/**
 * Generate spontaneous creative diary entry based on fox state & circumstances
 */
export function generateTodayStory(
  adoptedFox: AdoptedFox | null,
  timeOfDay = 'day',
  season = 'autumn'
): { title: string; content: string; favoriteMoment: string; moodEmoji: string; weatherMood: string } {
  const name = adoptedFox?.customName || '小狐狸';
  const speciesId = adoptedFox?.speciesId || 'red-fox';
  const species = FOX_SPECIES_LIST.find((f) => f.id === speciesId);
  const speciesName = species?.name || '赤狐';
  const stage = adoptedFox?.stage || 'baby';

  const seasonMap: Record<string, string> = {
    spring: '初春櫻落',
    summer: '夏夜流螢',
    autumn: '楓紅秋風',
    winter: '初雪覆瓦',
  };

  const timeMap: Record<string, string> = {
    morning: '朝露晨光',
    day: '晴日暖陽',
    sunset: '晚霞暮色',
    night: '寂靜星河',
  };

  const weatherMood = `${seasonMap[season] || '林間暖陽'} · ${timeMap[timeOfDay] || '午後清風'}`;

  // Stage-based variations
  if (stage === 'mystic') {
    return {
      title: '九尾仙靈的星夜守護',
      content: `今天周身泛著淡淡的靈氣金芒，我的仙靈之尾輕輕拂過主人的書桌。我能感受到主人今天專注時的心跳頻率，沉穩而溫暖。無論世間多喧囂，只要主人一回頭，我便會化作最安詳的守護結界。`,
      favoriteMoment: '看著主人揉揉眉心，我悄悄將一抹祥和的靈風吹拂到主人身邊。',
      moodEmoji: '⭐',
      weatherMood,
    };
  }

  // Species customized flavors
  if (speciesId === 'fennec-fox') {
    return {
      title: '大耳朵的小小雷達站',
      content: `今天我的大耳朵轉動了整整好幾百次！聽到了窗外落葉擦過石階的沙沙聲，聽到了茶杯輕輕放下的聲音，最喜歡聽到的，還是主人喊「${name}」時溫柔的語氣。每次聽到，我的耳朵尖尖都會開心得抖一抖！`,
      favoriteMoment: '主人給我撓大耳朵後面最癢癢的地方，整隻狐差點化成一灘水。',
      moodEmoji: '🌸',
      weatherMood,
    };
  }

  if (speciesId === 'arctic-fox') {
    return {
      title: '雪白毛球的抱抱日',
      content: `今天天氣好舒服，我把厚厚的白毛圍在脖子周圍，蜷縮成一顆圓滾滾的雪球。主人走過來輕輕戳了戳我的肚子，軟乎乎的！雖然我生長在極寒的雪原，但在主人的房間裡，心裡總是暖烘烘的。`,
      favoriteMoment: '主人拿著保暖軟墊鋪在我的小窩裡，聞起來好安心。',
      moodEmoji: '💤',
      weatherMood,
    };
  }

  if (speciesId === 'tibetan-fox') {
    return {
      title: '淡定凝視哲學日常',
      content: `很多人說我的方臉和瞇瞇眼看起來很看破紅塵，但其實我只是在非常認真地凝視主人的一舉一動。今天主人做事時，我坐在旁邊默默看了半個小時。陪伴不需要千言萬語，眼神交會就足夠懂得。`,
      favoriteMoment: '主人跟我四目相對時，忍不住被我的淡定表情逗笑。',
      moodEmoji: '🍃',
      weatherMood,
    };
  }

  // Default warm and playful entry
  return {
    title: '窗邊打盹與小確幸',
    content: `今天下午有淡淡的陽光曬在窗櫺上，暖洋洋的。我趴在軟墊上偷偷看著主人忙碌的背影，尾巴忍不住在地板上輕輕敲著節拍。主人忙完轉身走過來摸摸我，還誇我是全天下最乖巧的${speciesName}！今天也是幸福度滿分的一天。`,
    favoriteMoment: '趴在主人的手腕旁打哈欠，感受手掌傳來的體溫。',
    moodEmoji: '🍯',
    weatherMood,
  };
}

/**
 * Get or create today's journal entry
 */
export function getOrCreateTodayJournalEntry(
  adoptedFox: AdoptedFox | null,
  timeOfDay = 'day',
  season = 'autumn'
): FoxDailyJournalEntry {
  const foxName = adoptedFox?.customName || '小狐狸';
  const species = FOX_SPECIES_LIST.find((f) => f.id === adoptedFox?.speciesId);
  const speciesName = species?.name || '赤狐';

  const entries = loadJournalEntries(foxName, speciesName);
  const todayStr = getTodayDateString();

  const existing = entries.find((e) => e.date === todayStr);
  if (existing) {
    return existing;
  }

  // Create today's entry
  const story = generateTodayStory(adoptedFox, timeOfDay, season);
  const newEntry: FoxDailyJournalEntry = {
    id: `entry-${todayStr}-${Date.now()}`,
    date: todayStr,
    timeStr: getCurrentTimeString(),
    weatherMood: story.weatherMood,
    title: story.title,
    content: story.content,
    favoriteMoment: story.favoriteMoment,
    moodEmoji: story.moodEmoji,
    statsSnapshot: {
      happiness: adoptedFox?.happiness || 85,
      fluffiness: adoptedFox?.fluffiness || 80,
      level: adoptedFox?.level || 1,
    },
  };

  const updated = [newEntry, ...entries];
  saveJournalEntries(updated);
  return newEntry;
}

/**
 * Record a dedicated focus session into the journal!
 */
export function recordFocusSessionToJournal(
  adoptedFox: AdoptedFox | null,
  durationMinutes: number,
  modeLabel: string
): FoxDailyJournalEntry {
  const foxName = adoptedFox?.customName || '小狐狸';
  const species = FOX_SPECIES_LIST.find((f) => f.id === adoptedFox?.speciesId);
  const speciesName = species?.name || '赤狐';
  const entries = loadJournalEntries(foxName, speciesName);

  const todayStr = getTodayDateString();
  const timeStr = getCurrentTimeString();

  const focusEntry: FoxDailyJournalEntry = {
    id: `focus-${todayStr}-${Date.now()}`,
    date: todayStr,
    timeStr,
    weatherMood: `專注時光 · 心流沈浸`,
    title: `陪主人安靜深研了 ${durationMinutes} 分鐘！`,
    content: `主人剛剛開啟了【${modeLabel}】，整整 ${durationMinutes} 分鐘都無比認真！我乖乖趴在書桌一角，把爪爪收在胸前，連尾巴都悄悄放輕了，一聲都沒吵鬧。看著主人全神貫注的神情，覺得主人真的好厲害呀！森林精靈也銜來了香甜的專注松果犒賞我們呢。`,
    favoriteMoment: `計時結束時頌缽磬音響起，主人深深舒了一口氣，伸手揉了揉我的小腦袋。`,
    moodEmoji: '⭐',
    statsSnapshot: {
      happiness: Math.min(100, (adoptedFox?.happiness || 80) + 10),
      fluffiness: Math.min(100, (adoptedFox?.fluffiness || 80) + 5),
      level: adoptedFox?.level || 1,
    },
  };

  const updated = [focusEntry, ...entries];
  saveJournalEntries(updated);
  return focusEntry;
}

/**
 * Save owner reply to an entry
 */
export function saveOwnerReplyToEntry(entryId: string, replyText: string): FoxDailyJournalEntry[] {
  const entries = loadJournalEntries();
  const updated = entries.map((item) => {
    if (item.id === entryId) {
      return { ...item, ownerReply: replyText.trim() };
    }
    return item;
  });
  saveJournalEntries(updated);
  return updated;
}

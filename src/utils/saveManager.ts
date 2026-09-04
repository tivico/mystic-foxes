import { FoxSaveData, AdoptedFox, GardenState, GamePlayMode } from '../types';

export const SAVE_KEYS = {
  GAME_MODE: 'fox_game_mode',
  ADOPTED_FOX: 'adopted_fox_data',
  GARDEN_STATE: 'garden_state_data',
  PET_COUNTS: 'fox_pet_counts',
  LAST_ACTIVE: 'fox_last_active_timestamp',
  TIME_OF_DAY: 'fox_time_of_day',
  SEASON: 'fox_season',
};

/**
 * Persist all game states safely into localStorage
 */
export function persistAllStatesToStorage(params: {
  gameMode: GamePlayMode;
  adoptedFox: AdoptedFox | null;
  gardenState: GardenState;
  petCounts: Record<string, number>;
  timeOfDay?: string;
  season?: string;
}): void {
  try {
    localStorage.setItem(SAVE_KEYS.GAME_MODE, params.gameMode);
    if (params.adoptedFox) {
      localStorage.setItem(SAVE_KEYS.ADOPTED_FOX, JSON.stringify(params.adoptedFox));
    }
    const gardenWithTime: GardenState = {
      ...params.gardenState,
      lastActiveTimestamp: Date.now(),
    };
    localStorage.setItem(SAVE_KEYS.GARDEN_STATE, JSON.stringify(gardenWithTime));
    localStorage.setItem(SAVE_KEYS.PET_COUNTS, JSON.stringify(params.petCounts));
    localStorage.setItem(SAVE_KEYS.LAST_ACTIVE, Date.now().toString());

    if (params.timeOfDay) {
      localStorage.setItem(SAVE_KEYS.TIME_OF_DAY, params.timeOfDay);
    }
    if (params.season) {
      localStorage.setItem(SAVE_KEYS.SEASON, params.season);
    }
  } catch (err) {
    console.warn('Failed to persist game state to localStorage:', err);
  }
}

/**
 * Trigger export of current game save as a JSON file
 */
export function exportSaveToFile(data: FoxSaveData): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `fox-companion-save-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validate and parse imported JSON data
 */
export function parseSaveFileContent(content: string): FoxSaveData {
  const parsed = JSON.parse(content);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('存檔格式無效，非合法的 JSON 物件');
  }

  // Basic sanity check
  if (!parsed.gardenState && !parsed.adoptedFox) {
    throw new Error('存檔內容缺少靈狐或庭院資料');
  }

  // Sanitize adoptedFox and ensure adoptedAt is a valid ISO timestamp
  let normalizedAdoptedFox: AdoptedFox | null = null;
  if (parsed.adoptedFox && typeof parsed.adoptedFox === 'object') {
    let adoptedAt = parsed.adoptedFox.adoptedAt;
    if (!adoptedAt || adoptedAt === '今天' || isNaN(Date.parse(adoptedAt))) {
      adoptedAt = parsed.exportedAt || new Date().toISOString();
    }
    normalizedAdoptedFox = {
      ...parsed.adoptedFox,
      adoptedAt,
    };
  }

  return {
    version: parsed.version || 1,
    exportedAt: parsed.exportedAt || new Date().toISOString(),
    gameMode: parsed.gameMode || 'adopt',
    adoptedFox: normalizedAdoptedFox,
    gardenState: {
      placedSnack: parsed.gardenState?.placedSnack ?? null,
      placedToy: parsed.gardenState?.placedToy ?? null,
      visitors: Array.isArray(parsed.gardenState?.visitors) ? parsed.gardenState.visitors : [],
      coins: typeof parsed.gardenState?.coins === 'number' ? parsed.gardenState.coins : 150,
      unlockedFoxIds: Array.isArray(parsed.gardenState?.unlockedFoxIds)
        ? parsed.gardenState.unlockedFoxIds
        : ['red-fox'],
      lastActiveTimestamp: Date.now(),
    },
    petCounts: typeof parsed.petCounts === 'object' && parsed.petCounts !== null ? parsed.petCounts : {},
    timeOfDay: parsed.timeOfDay,
    season: parsed.season,
    lastActiveTimestamp: Date.now(),
  };
}

/**
 * Calculate offline earnings based on Date.now() timestamp difference
 */
export function calculateOfflineEarnings(
  lastActiveTimestamp: number,
  visitorCount: number
): {
  offlineSeconds: number;
  coinsEarned: number;
  formattedDuration: string;
} | null {
  const now = Date.now();
  if (!lastActiveTimestamp || lastActiveTimestamp <= 0) {
    return null;
  }

  const elapsedSeconds = Math.floor((now - lastActiveTimestamp) / 1000);

  // Ignore negligible absences (< 30 seconds)
  if (elapsedSeconds < 30) {
    return null;
  }

  // Cap maximum offline calculation to 12 hours (43,200 seconds)
  const effectiveSeconds = Math.min(elapsedSeconds, 43200);

  // Rate: 1 coin every 8 seconds per active visitor (minimum 1 visitor rate)
  const activeRate = Math.max(1, visitorCount);
  const coinsEarned = Math.max(5, Math.floor((effectiveSeconds / 8) * activeRate));

  // Format human readable duration
  let formattedDuration = '';
  const minutes = Math.floor(elapsedSeconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    formattedDuration = `${hours} 小時 ${minutes % 60} 分鐘`;
  } else if (minutes > 0) {
    formattedDuration = `${minutes} 分鐘`;
  } else {
    formattedDuration = `${elapsedSeconds} 秒`;
  }

  return {
    offlineSeconds: elapsedSeconds,
    coinsEarned,
    formattedDuration,
  };
}

/**
 * Calculate total days accompanied with the adopted fox
 * Returns 1 on the day of adoption, 2 on the next day, etc.
 */
export function calculateCompanionDays(adoptedAt?: string): number {
  if (!adoptedAt || adoptedAt === '今天') return 1;
  const parsedTime = Date.parse(adoptedAt);
  if (isNaN(parsedTime)) return 1;

  const adoptedDate = new Date(parsedTime);
  const now = new Date();

  // Reset hours/minutes/seconds to compare whole calendar days in local time
  const startAdopted = new Date(
    adoptedDate.getFullYear(),
    adoptedDate.getMonth(),
    adoptedDate.getDate()
  ).getTime();
  const startToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  const diffDays = Math.floor((startToday - startAdopted) / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}


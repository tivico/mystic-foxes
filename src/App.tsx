import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FoxSpecies, HabitatType, FoxCategory, GamePlayMode, AdoptedFox, GardenState, FoxSaveData, QuizTabMode } from './types';
import { FOX_SPECIES_LIST } from './data/foxesData';
import { GARDEN_SNACKS, GARDEN_TOYS } from './data/petGameData';
import { AppSidebar } from './components/AppSidebar';
import { AppTopBar } from './components/AppTopBar';
import { MobileBottomDock } from './components/MobileBottomDock';
import { HabitatFilter } from './components/HabitatFilter';
import { FoxCard } from './components/FoxCard';
import { FoxModal } from './components/FoxModal';
import { FoxQuizHallModal } from './components/FoxQuizHallModal';
import { CrystalBallModal } from './components/CrystalBallModal';
import { Footer } from './components/Footer';
import { AdoptedFoxView } from './components/AdoptedFoxView';
import { CourtyardGardenView } from './components/CourtyardGardenView';
import { AmbientSoundMixer } from './components/AmbientSoundMixer';
import { FoxPostcardAdventure } from './components/FoxPostcardAdventure';
import { FoxBreathingGuide } from './components/FoxBreathingGuide';
import { AtmosphereController } from './components/AtmosphereController';
import { StorybookTextureOverlay, TextureStyle } from './components/StorybookTextureOverlay';
import { MythVsRealityView } from './components/MythVsRealityView';
import { SeasonParticlesCanvas, SeasonType, TimeOfDay } from './components/SeasonParticlesCanvas';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
import { SaveBackupModal } from './components/SaveBackupModal';
import { OfflineEarningsModal } from './components/OfflineEarningsModal';
import { FoxLoadingScreen } from './components/FoxLoadingScreen';
import { FoxDailyJournalModal } from './components/FoxDailyJournalModal';
import { FoxFocusCompanionModal } from './components/FoxFocusCompanionModal';
import {
  SAVE_KEYS,
  persistAllStatesToStorage,
  calculateOfflineEarnings,
} from './utils/saveManager';
import { playPettingSound } from './utils/foxAudio';
import { Sparkles, RotateCcw } from 'lucide-react';

// Time helpers for zero-backend atmosphere detection
const getAutoTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 17) return 'day';
  if (hour >= 17 && hour < 19) return 'sunset';
  return 'night';
};

const getAutoSeason = (): SeasonType => {
  const month = new Date().getMonth() + 1; // 1 - 12
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
};

export default function App() {
  // Current game mode: 'adopt' (認領一隻) | 'idle' (放置養成) | 'encyclopedia' (圖鑑全覽)
  const [gameMode, setGameMode] = useState<GamePlayMode>(() => {
    try {
      const saved = localStorage.getItem('fox_game_mode');
      return (saved as GamePlayMode) || 'adopt';
    } catch {
      return 'adopt';
    }
  });

  // Atmosphere & Lighting state
  const [autoSyncAtmosphere, setAutoSyncAtmosphere] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('fox_auto_sync_atmo');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() => {
    try {
      const saved = localStorage.getItem('fox_time_of_day');
      return (saved as TimeOfDay) || getAutoTimeOfDay();
    } catch {
      return getAutoTimeOfDay();
    }
  });

  const [season, setSeason] = useState<SeasonType>(() => {
    try {
      const saved = localStorage.getItem('fox_season');
      return (saved as SeasonType) || getAutoSeason();
    } catch {
      return getAutoSeason();
    }
  });

  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);

  // 繪本光影質感與動態視差設定 (持久化存儲)
  const [textureStyle, setTextureStyle] = useState<TextureStyle>(() => {
    try {
      const saved = localStorage.getItem('fox_texture_style');
      return (saved as TextureStyle) || 'paper';
    } catch {
      return 'paper';
    }
  });

  const [parallaxEnabled, setParallaxEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('fox_parallax_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Sync atmosphere with real-time clock if enabled
  useEffect(() => {
    if (!autoSyncAtmosphere) return;
    const updateTime = () => {
      setTimeOfDay(getAutoTimeOfDay());
      setSeason(getAutoSeason());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [autoSyncAtmosphere]);

  // Modals state for soothing companion suite
  const [isAmbientMixerOpen, setIsAmbientMixerOpen] = useState(false);
  const [isPostcardsOpen, setIsPostcardsOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isAtmosphereOpen, setIsAtmosphereOpen] = useState(false);
  const [isDailyJournalOpen, setIsDailyJournalOpen] = useState(false);
  const [isFocusCompanionOpen, setIsFocusCompanionOpen] = useState(false);

  // Adopted Fox Companion state
  const [adoptedFox, setAdoptedFox] = useState<AdoptedFox | null>(() => {
    try {
      const saved = localStorage.getItem('adopted_fox_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          // Normalize legacy "今天" or missing adoptedAt to ISO timestamp
          if (!parsed.adoptedAt || parsed.adoptedAt === '今天' || isNaN(Date.parse(parsed.adoptedAt))) {
            parsed.adoptedAt = new Date().toISOString();
          }
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return {
      speciesId: 'red-fox',
      customName: '小赤赤',
      level: 1,
      exp: 15,
      stage: 'baby',
      hunger: 70,
      happiness: 85,
      energy: 90,
      fluffiness: 75,
      spirit: 40,
      equippedAccessoryId: 'clover-leaf',
      adoptedAt: new Date().toISOString(),
      snapshots: [
        {
          id: 'init-snap-1',
          date: new Date().toLocaleDateString('zh-TW'),
          title: '初次相遇的紀念',
          note: '在晨曦森林中初次相遇，戴著一朵幸運小草。',
          stage: 'baby',
        },
      ],
      adventureLog: [
        {
          id: 'init-log-1',
          date: new Date().toLocaleDateString('zh-TW'),
          location: '星光湖畔',
          itemFound: '星光螢石 💎',
          story: '初次前往湖邊玩耍，撿回了發光的螢石！',
        },
      ],
    };
  });

  // Garden Courtyard Idle State
  const [gardenState, setGardenState] = useState<GardenState>(() => {
    try {
      const saved = localStorage.getItem('garden_state_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      coins: 195,
      placedSnack: GARDEN_SNACKS[1],
      placedToy: GARDEN_TOYS[0],
      visitors: [
        {
          id: 'red-fox-init',
          speciesId: 'red-fox',
          activity: '在日式緣側木廊舒服地享用油豆腐 🍙',
          visitedAt: '剛才',
          satisfaction: 90,
          giftGiven: false,
        },
      ],
      unlockedFoxIds: ['red-fox', 'arctic-fox', 'fennec-fox'],
      lastActiveTimestamp: Date.now(),
    };
  });

  // Mode switching transition state (to prevent 1-3s blank screen)
  const [isSwitchingMode, setIsSwitchingMode] = useState(false);

  // Modern Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Save & Backup modal state
  const [isSaveBackupOpen, setIsSaveBackupOpen] = useState(false);

  // Offline earnings modal state
  const [offlineEarnings, setOfflineEarnings] = useState<{
    coins: number;
    duration: string;
  } | null>(null);

  // Check offline earnings on startup based on Date.now() elapsed delta
  useEffect(() => {
    try {
      const lastActiveStr = localStorage.getItem(SAVE_KEYS.LAST_ACTIVE);
      const lastActive = lastActiveStr ? Number(lastActiveStr) : gardenState.lastActiveTimestamp;
      if (lastActive) {
        const result = calculateOfflineEarnings(lastActive, gardenState.visitors.length);
        if (result && result.coinsEarned > 0) {
          setOfflineEarnings({
            coins: result.coinsEarned,
            duration: result.formattedDuration,
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleClaimOfflineEarnings = () => {
    if (!offlineEarnings) return;
    const coinsToAdd = offlineEarnings.coins;
    setGardenState((prev) => ({
      ...prev,
      coins: prev.coins + coinsToAdd,
      lastActiveTimestamp: Date.now(),
    }));
    setOfflineEarnings(null);
  };

  // Petting counts for each fox
  const [petCounts, setPetCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('fox_pet_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Guaranteed continuous persistence of all states to localStorage
  useEffect(() => {
    persistAllStatesToStorage({
      gameMode,
      adoptedFox,
      gardenState,
      petCounts,
      timeOfDay,
      season,
    });
  }, [gameMode, adoptedFox, gardenState, petCounts, timeOfDay, season]);

  // Flush to localStorage immediately on tab blur or browser close
  useEffect(() => {
    const handleSaveBeforeLeave = () => {
      persistAllStatesToStorage({
        gameMode,
        adoptedFox,
        gardenState,
        petCounts,
        timeOfDay,
        season,
      });
    };

    window.addEventListener('beforeunload', handleSaveBeforeLeave);
    document.addEventListener('visibilitychange', handleSaveBeforeLeave);
    return () => {
      window.removeEventListener('beforeunload', handleSaveBeforeLeave);
      document.removeEventListener('visibilitychange', handleSaveBeforeLeave);
    };
  }, [gameMode, adoptedFox, gardenState, petCounts, timeOfDay, season]);

  // Persist game mode with responsive feedback
  const handleSelectGameMode = (mode: GamePlayMode) => {
    if (mode === gameMode) return;
    setIsSwitchingMode(true);
    setGameMode(mode);
    try {
      localStorage.setItem('fox_game_mode', mode);
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsSwitchingMode(false);
    }, 80);
  };

  // Persist adopted fox
  const handleUpdateAdoptedFox = (updater: (prev: AdoptedFox) => AdoptedFox) => {
    setAdoptedFox((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      return next;
    });
  };

  // Adopt new fox
  const handleAdoptNew = (speciesId: string, customName: string) => {
    const newFox: AdoptedFox = {
      speciesId,
      customName,
      level: 1,
      exp: 0,
      stage: 'baby',
      hunger: 80,
      happiness: 80,
      energy: 100,
      fluffiness: 70,
      spirit: 30,
      equippedAccessoryId: 'none',
      adoptedAt: new Date().toISOString(),
      snapshots: [],
      adventureLog: [],
    };
    setAdoptedFox(newFox);
  };

  // Persist garden state
  const handleUpdateGarden = (updater: (prev: GardenState) => GardenState) => {
    setGardenState((prev) => {
      const next = updater(prev);
      return {
        ...next,
        lastActiveTimestamp: Date.now(),
      };
    });
  };

  // Handle successful save file import
  const handleImportSaveSuccess = (imported: FoxSaveData) => {
    setGameMode(imported.gameMode || 'adopt');
    setAdoptedFox(imported.adoptedFox);
    setGardenState(imported.gardenState);
    setPetCounts(imported.petCounts || {});
    if (imported.timeOfDay) setTimeOfDay(imported.timeOfDay as TimeOfDay);
    if (imported.season) setSeason(imported.season as SeasonType);

    persistAllStatesToStorage({
      gameMode: imported.gameMode || 'adopt',
      adoptedFox: imported.adoptedFox,
      gardenState: imported.gardenState,
      petCounts: imported.petCounts || {},
      timeOfDay: imported.timeOfDay,
      season: imported.season,
    });
  };

  const handleResetSave = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  // Encyclopedia filters
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatType>('all');
  const [selectedCategory, setSelectedCategory] = useState<FoxCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [activeFox, setActiveFox] = useState<FoxSpecies | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizHallInitialTab, setQuizHallInitialTab] = useState<QuizTabMode>('personality');
  const [isCrystalBallOpen, setIsCrystalBallOpen] = useState(false);

  const handleOpenQuiz = (tab: QuizTabMode = 'personality') => {
    setQuizHallInitialTab(tab);
    setIsQuizOpen(true);
  };

  const handleRewardCoins = (amount: number) => {
    setGardenState((prev) => ({
      ...prev,
      coins: prev.coins + amount,
      lastActiveTimestamp: Date.now(),
    }));
  };

  const handleRewardExp = (amount: number) => {
    handleUpdateAdoptedFox((prev) => {
      const nextExp = prev.exp + amount;
      const expNeeded = prev.level * 50;
      if (nextExp >= expNeeded) {
        return {
          ...prev,
          level: prev.level + 1,
          exp: nextExp - expNeeded,
          happiness: Math.min(100, prev.happiness + 15),
          fluffiness: Math.min(100, prev.fluffiness + 10),
        };
      }
      return {
        ...prev,
        exp: nextExp,
        happiness: Math.min(100, prev.happiness + 5),
      };
    });
  };

  // Floating heart particles for quick-pet on cards
  const [floatingHearts, setFloatingHearts] = useState<
    { id: number; x: number; y: number; text: string }[]
  >([]);

  const totalPetCount = useMemo(() => {
    return Object.values(petCounts).reduce<number>(
      (acc, count) => acc + (typeof count === 'number' ? count : 0),
      0
    );
  }, [petCounts]);

  const handlePet = (foxId: string, event?: React.MouseEvent) => {
    playPettingSound(foxId);

    setPetCounts((prev) => {
      const updated = { ...prev, [foxId]: (prev[foxId] || 0) + 1 };
      try {
        localStorage.setItem('fox_pet_counts', JSON.stringify(updated));
      } catch {
        // LocalStorage fallback
      }
      return updated;
    });

    if (event) {
      const newHeart = {
        id: Date.now() + Math.random(),
        x: event.clientX,
        y: event.clientY,
        text: ['+1 摸摸 ❤️', '好舒服～ ✨', '尾巴搖搖 🐾', '咕嚕呼嚕 🥰'][
          Math.floor(Math.random() * 4)
        ],
      };
      setFloatingHearts((prev) => [...prev, newHeart]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1200);
    }
  };

  // Filtered fox species list for Encyclopedia
  const filteredFoxes = useMemo(() => {
    return FOX_SPECIES_LIST.filter((fox) => {
      if (selectedCategory !== 'all' && fox.category !== selectedCategory) {
        return false;
      }
      if (selectedHabitat !== 'all' && fox.habitat !== selectedHabitat) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = fox.name.toLowerCase().includes(q);
        const matchEn = fox.englishName.toLowerCase().includes(q);
        const matchSci = fox.scientificName.toLowerCase().includes(q);
        const matchTrait = fox.personalityTraits.some((t) =>
          t.toLowerCase().includes(q)
        );
        const matchSkill = fox.passiveSkill.name.toLowerCase().includes(q);
        const matchDesc = fox.description.toLowerCase().includes(q);
        return (
          matchName || matchEn || matchSci || matchTrait || matchSkill || matchDesc
        );
      }
      return true;
    });
  }, [selectedCategory, selectedHabitat, searchQuery]);

  const handleViewFoxByName = (name: string) => {
    const target = FOX_SPECIES_LIST.find(
      (f) => f.name.includes(name) || name.includes(f.name)
    );
    if (target) {
      setActiveFox(target);
    }
  };

  const handleResetFilters = () => {
    setSelectedHabitat('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Dynamic atmosphere background classes
  const atmoContainerClasses = useMemo(() => {
    if (timeOfDay === 'night') {
      return 'bg-[#181614] text-[#ece7e1] selection:bg-amber-900 selection:text-amber-100';
    }
    if (timeOfDay === 'sunset') {
      return 'bg-gradient-to-b from-[#fdf6ee] via-[#faece0] to-[#f8e5d6] text-stone-800 selection:bg-orange-200 selection:text-orange-900';
    }
    // Day
    return 'bg-[#faf8f5] text-stone-800 selection:bg-amber-200 selection:text-amber-900';
  }, [timeOfDay]);

  return (
    <div
      className={`h-screen w-full flex font-sans transition-colors duration-1000 relative overflow-hidden ${atmoContainerClasses} ${
        timeOfDay === 'night' ? 'dark' : ''
      }`}
    >
      {/* Lightweight Canvas Ambient Season Particles */}
      <SeasonParticlesCanvas
        season={season}
        timeOfDay={timeOfDay}
        enabled={particlesEnabled}
      />

      {/* 繪本光影質感層 (全域微弱水彩紙張紋理 / 35mm 底片微粒) */}
      <StorybookTextureOverlay texture={textureStyle} opacity={0.22} />

      {/* Floating Hearts Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, scale: 0.7, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.7, 1.15, 1, 0.9],
                y: -50,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              style={{ left: `${heart.x - 45}px`, top: `${heart.y - 30}px` }}
              className="fixed text-xs font-bold text-rose-500 bg-white/95 px-3 py-1 rounded-full shadow-lg border border-rose-200"
            >
              {heart.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modern Japanese Collapsible Sidebar (Desktop & Drawer on Mobile) */}
      <AppSidebar
        currentMode={gameMode}
        onSelectMode={handleSelectGameMode}
        adoptedFox={adoptedFox}
        visitorCount={gardenState.visitors.length}
        speciesCount={FOX_SPECIES_LIST.length}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onOpenAmbientMixer={() => setIsAmbientMixerOpen(true)}
        onOpenAtmosphere={() => setIsAtmosphereOpen(true)}
        onOpenQuiz={handleOpenQuiz}
        onOpenCrystalBall={() => setIsCrystalBallOpen(true)}
        onOpenPostcards={() => setIsPostcardsOpen(true)}
        onOpenSaveBackup={() => setIsSaveBackupOpen(true)}
        onOpenDailyJournal={() => setIsDailyJournalOpen(true)}
        onOpenFocusCompanion={() => setIsFocusCompanionOpen(true)}
      />

      {/* Right Canvas / Main Stage Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto relative">
        {/* Streamlined Clean Top Status Bar */}
        <AppTopBar
          currentMode={gameMode}
          coins={gardenState.coins}
          totalPetCount={totalPetCount}
          timeOfDay={timeOfDay}
          season={season}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenAtmosphere={() => setIsAtmosphereOpen(true)}
          onOpenSaveBackup={() => setIsSaveBackupOpen(true)}
          onOpenAmbientMixer={() => setIsAmbientMixerOpen(true)}
          onOpenDailyJournal={() => setIsDailyJournalOpen(true)}
          onOpenFocusCompanion={() => setIsFocusCompanionOpen(true)}
        />

        {/* Main Container */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-12 z-20">
          {isSwitchingMode ? (
            <FoxLoadingScreen message="小狐狸正輕快奔馳前往新模式..." />
          ) : (
            <AnimatePresence>
            {/* 1. 認領一隻專屬養成模式 */}
            {gameMode === 'adopt' && (
              <motion.div
                key="adopt-mode-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AdoptedFoxView
                  adoptedFox={adoptedFox}
                  onUpdateFox={handleUpdateAdoptedFox}
                  onAdoptNew={handleAdoptNew}
                  onPetFox={(id) => handlePet(id)}
                  onOpenDailyJournal={() => setIsDailyJournalOpen(true)}
                  onOpenFocusCompanion={() => setIsFocusCompanionOpen(true)}
                  parallaxEnabled={parallaxEnabled}
                  textureStyle={textureStyle}
                  onTextureStyleChange={(style) => {
                    setTextureStyle(style);
                    try {
                      localStorage.setItem('fox_texture_style', style);
                    } catch {
                      // ignore
                    }
                  }}
                />
              </motion.div>
            )}

            {/* 2. 放置養成庭院模式 */}
            {gameMode === 'idle' && (
              <motion.div
                key="idle-mode-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CourtyardGardenView
                  gardenState={gardenState}
                  onUpdateGarden={handleUpdateGarden}
                  onPetFox={(id) => handlePet(id)}
                />
              </motion.div>
            )}

          {/* 3. 靈狐全圖鑑百科模式 */}
          {gameMode === 'encyclopedia' && (
            <motion.div
              key="encyclopedia-mode-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Habitats & Search Filter Bar */}
              <HabitatFilter
                selectedHabitat={selectedHabitat}
                onSelectHabitat={setSelectedHabitat}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {/* Status Bar */}
              <div className="flex items-center justify-between px-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>
                    共收錄{' '}
                    <strong className="text-stone-800 dark:text-stone-200">
                      {FOX_SPECIES_LIST.length}
                    </strong>{' '}
                    種奇幻與自然狐狸 · 當前顯示{' '}
                    <strong className="text-amber-700 dark:text-amber-400 font-bold">
                      {filteredFoxes.length}
                    </strong>{' '}
                    隻
                  </span>
                </div>

                {(selectedHabitat !== 'all' ||
                  selectedCategory !== 'all' ||
                  searchQuery) && (
                  <motion.button
                    type="button"
                    onClick={handleResetFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-amber-700 dark:text-amber-400 hover:text-amber-900 hover:underline cursor-pointer font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>重設所有條件</span>
                  </motion.button>
                )}
              </div>

              {/* Fox Grid */}
              <motion.div layout className="min-h-[400px]">
                {filteredFoxes.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    <AnimatePresence>
                      {filteredFoxes.map((fox) => (
                        <FoxCard
                          key={fox.id}
                          fox={fox}
                          onSelect={(selected) => setActiveFox(selected)}
                          onQuickPet={(id, e) => handlePet(id, e)}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 dark:bg-stone-800/80 rounded-3xl p-12 text-center border border-dashed border-stone-300 dark:border-stone-700 max-w-md mx-auto space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center mx-auto text-3xl">
                      🔍
                    </div>
                    <h4 className="text-lg font-bold text-stone-800 dark:text-stone-100 font-serif">
                      找不到符合條件的狐狸朋友
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      嘗試調整搜尋關鍵字，或是切換生境篩選條件來發現更多可愛狐狸！
                    </p>
                    <motion.button
                      type="button"
                      onClick={handleResetFilters}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm cursor-pointer"
                    >
                      清除所有篩選條件
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* Bottom Banner Calling for Guardian Quiz */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
              >
                <div className="space-y-2 text-center sm:text-left z-10">
                  <div className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                    <span>靈魂契約</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif">
                    不知道哪一隻狐狸最像你嗎？
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 max-w-md">
                    只要回答 3 個簡單的心境二選一，森林水晶球將會為你召喚專屬的本命守護狐！
                  </p>
                </div>

                <motion.button
                  type="button"
                  id="banner-open-quiz-btn"
                  onClick={() => setIsQuizOpen(true)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all z-10 shrink-0 cursor-pointer"
                >
                  立即開始守護狐測驗 ✨
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* 4. 傳說 vs 現實：神話民俗與科學演化對照手帳 */}
          {gameMode === 'myth-vs-reality' && (
            <motion.div
              key="myth-vs-reality-mode-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <MythVsRealityView onViewFoxByName={handleViewFoxByName} />
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenQuiz={handleOpenQuiz}
        onOpenCrystalBall={() => setIsCrystalBallOpen(true)}
      />

      {/* Mobile Bottom Floating Dock */}
      <MobileBottomDock
        currentMode={gameMode}
        onSelectMode={handleSelectGameMode}
        visitorCount={gardenState.visitors.length}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onOpenAmbientMixer={() => setIsAmbientMixerOpen(true)}
        onOpenAtmosphere={() => setIsAtmosphereOpen(true)}
        onOpenQuiz={handleOpenQuiz}
        onOpenCrystalBall={() => setIsCrystalBallOpen(true)}
        onOpenPostcards={() => setIsPostcardsOpen(true)}
        onOpenSaveBackup={() => setIsSaveBackupOpen(true)}
        onOpenDailyJournal={() => setIsDailyJournalOpen(true)}
        onOpenFocusCompanion={() => setIsFocusCompanionOpen(true)}
      />
    </div>

      {/* Ambient Sound Mixer Modal */}
      <AmbientSoundMixer
        isOpen={isAmbientMixerOpen}
        onClose={() => setIsAmbientMixerOpen(false)}
      />

      {/* Fox Postcard Adventure Modal */}
      <FoxPostcardAdventure
        foxName={adoptedFox?.customName || '小狐狸'}
        isOpen={isPostcardsOpen}
        onClose={() => setIsPostcardsOpen(false)}
      />

      {/* Guided Relaxation Breathing Modal */}
      <FoxBreathingGuide
        foxName={adoptedFox?.customName || '小狐狸'}
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      {/* Day/Night & Season Atmosphere Controller Modal */}
      <AtmosphereController
        timeOfDay={timeOfDay}
        season={season}
        autoSync={autoSyncAtmosphere}
        onTimeChange={(t) => {
          setTimeOfDay(t);
          try {
            localStorage.setItem('fox_time_of_day', t);
          } catch {
            // ignore
          }
        }}
        onSeasonChange={(s) => {
          setSeason(s);
          try {
            localStorage.setItem('fox_season', s);
          } catch {
            // ignore
          }
        }}
        onAutoSyncToggle={(val) => {
          setAutoSyncAtmosphere(val);
          try {
            localStorage.setItem('fox_auto_sync_atmo', JSON.stringify(val));
          } catch {
            // ignore
          }
        }}
        particlesEnabled={particlesEnabled}
        onToggleParticles={setParticlesEnabled}
        textureStyle={textureStyle}
        onTextureStyleChange={(style) => {
          setTextureStyle(style);
          try {
            localStorage.setItem('fox_texture_style', style);
          } catch {
            // ignore
          }
        }}
        parallaxEnabled={parallaxEnabled}
        onToggleParallax={(val) => {
          setParallaxEnabled(val);
          try {
            localStorage.setItem('fox_parallax_enabled', JSON.stringify(val));
          } catch {
            // ignore
          }
        }}
        isOpen={isAtmosphereOpen}
        onClose={() => setIsAtmosphereOpen(false)}
      />

      {/* Detailed Fox Profile Modal */}
      <FoxModal
        fox={activeFox}
        onClose={() => setActiveFox(null)}
        onPet={(id) => handlePet(id)}
        petCount={activeFox ? petCounts[activeFox.id] || 0 : 0}
      />

      {/* Personality & Trivia & Silhouette Quiz Hall Modal */}
      <FoxQuizHallModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onViewFox={(fox) => setActiveFox(fox)}
        onRewardCoins={handleRewardCoins}
        initialTab={quizHallInitialTab}
      />

      {/* Magic Crystal Ball Modal */}
      <CrystalBallModal
        isOpen={isCrystalBallOpen}
        onClose={() => setIsCrystalBallOpen(false)}
        onViewFoxByName={handleViewFoxByName}
      />

      {/* Save & Backup Modal */}
      <SaveBackupModal
        isOpen={isSaveBackupOpen}
        onClose={() => setIsSaveBackupOpen(false)}
        gameMode={gameMode}
        adoptedFox={adoptedFox}
        gardenState={gardenState}
        petCounts={petCounts}
        timeOfDay={timeOfDay}
        season={season}
        onImportSuccess={handleImportSaveSuccess}
        onResetSave={handleResetSave}
      />

      {/* Offline Earnings Settlement Modal */}
      {offlineEarnings && (
        <OfflineEarningsModal
          isOpen={!!offlineEarnings}
          onClaim={handleClaimOfflineEarnings}
          coinsEarned={offlineEarnings.coins}
          formattedDuration={offlineEarnings.duration}
        />
      )}

      {/* 靈狐第一人稱日常童趣手記 Modal */}
      <FoxDailyJournalModal
        isOpen={isDailyJournalOpen}
        onClose={() => setIsDailyJournalOpen(false)}
        adoptedFox={adoptedFox}
        timeOfDay={timeOfDay}
        season={season}
      />

      {/* 靈狐極簡番茄鐘 / 陪讀專注 Modal */}
      <FoxFocusCompanionModal
        isOpen={isFocusCompanionOpen}
        onClose={() => setIsFocusCompanionOpen(false)}
        adoptedFox={adoptedFox}
        onRewardCoins={handleRewardCoins}
        onRewardExp={handleRewardExp}
      />

      {/* PWA In-App Install Prompt Banner */}
      <PwaInstallPrompt />
    </div>
  );
}

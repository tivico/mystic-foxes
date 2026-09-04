import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FoxSpecies, HabitatType, FoxCategory, GamePlayMode, AdoptedFox, GardenState } from './types';
import { FOX_SPECIES_LIST } from './data/foxesData';
import { GARDEN_SNACKS, GARDEN_TOYS } from './data/petGameData';
import { Header } from './components/Header';
import { HabitatFilter } from './components/HabitatFilter';
import { FoxCard } from './components/FoxCard';
import { FoxModal } from './components/FoxModal';
import { FoxQuizModal } from './components/FoxQuizModal';
import { CrystalBallModal } from './components/CrystalBallModal';
import { Footer } from './components/Footer';
import { GameModeNav } from './components/GameModeNav';
import { AdoptedFoxView } from './components/AdoptedFoxView';
import { CourtyardGardenView } from './components/CourtyardGardenView';
import { AmbientSoundMixer } from './components/AmbientSoundMixer';
import { FoxPostcardAdventure } from './components/FoxPostcardAdventure';
import { FoxBreathingGuide } from './components/FoxBreathingGuide';
import { AtmosphereController } from './components/AtmosphereController';
import { MythVsRealityView } from './components/MythVsRealityView';
import { SeasonParticlesCanvas, SeasonType, TimeOfDay } from './components/SeasonParticlesCanvas';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';
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

  // Adopted Fox Companion state
  const [adoptedFox, setAdoptedFox] = useState<AdoptedFox | null>(() => {
    try {
      const saved = localStorage.getItem('adopted_fox_data');
      if (saved) return JSON.parse(saved);
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
      adoptedAt: '今天',
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
      coins: 180,
      placedSnack: GARDEN_SNACKS[1],
      placedToy: GARDEN_TOYS[0],
      visitors: [],
      unlockedFoxIds: ['red-fox', 'arctic-fox', 'fennec-fox'],
    };
  });

  // Persist game mode
  const handleSelectGameMode = (mode: GamePlayMode) => {
    setGameMode(mode);
    try {
      localStorage.setItem('fox_game_mode', mode);
    } catch {
      // ignore
    }
  };

  // Persist adopted fox
  const handleUpdateAdoptedFox = (updater: (prev: AdoptedFox) => AdoptedFox) => {
    setAdoptedFox((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      try {
        localStorage.setItem('adopted_fox_data', JSON.stringify(next));
      } catch {
        // ignore
      }
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
      adoptedAt: new Date().toLocaleDateString('zh-TW'),
      snapshots: [],
      adventureLog: [],
    };
    setAdoptedFox(newFox);
    try {
      localStorage.setItem('adopted_fox_data', JSON.stringify(newFox));
    } catch {
      // ignore
    }
  };

  // Persist garden state
  const handleUpdateGarden = (updater: (prev: GardenState) => GardenState) => {
    setGardenState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem('garden_state_data', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Encyclopedia filters
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatType>('all');
  const [selectedCategory, setSelectedCategory] = useState<FoxCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [activeFox, setActiveFox] = useState<FoxSpecies | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCrystalBallOpen, setIsCrystalBallOpen] = useState(false);

  // Petting counts for each fox
  const [petCounts, setPetCounts] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('fox_pet_counts');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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
      className={`min-h-screen flex flex-col font-sans transition-colors duration-1000 relative ${atmoContainerClasses} ${
        timeOfDay === 'night' ? 'dark' : ''
      }`}
    >
      {/* Lightweight Canvas Ambient Season Particles */}
      <SeasonParticlesCanvas
        season={season}
        timeOfDay={timeOfDay}
        enabled={particlesEnabled}
      />

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

      {/* Main Header */}
      <Header
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCrystalBall={() => setIsCrystalBallOpen(true)}
        onOpenAmbientMixer={() => setIsAmbientMixerOpen(true)}
        onOpenPostcards={() => setIsPostcardsOpen(true)}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onOpenAtmosphere={() => setIsAtmosphereOpen(true)}
        onOpenMythVsReality={() => handleSelectGameMode('myth-vs-reality')}
        totalPetCount={totalPetCount}
      />

      {/* Mode Selector Navigation */}
      <div className="mt-4 z-20">
        <GameModeNav
          currentMode={gameMode}
          onSelectMode={handleSelectGameMode}
          adoptedFoxName={adoptedFox?.customName}
          visitorCount={gardenState.visitors.length}
        />
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 z-20">
        <AnimatePresence mode="wait">
          {/* 1. 認領一隻專屬養成模式 */}
          {gameMode === 'adopt' && (
            <motion.div
              key="adopt-mode-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <AdoptedFoxView
                adoptedFox={adoptedFox}
                onUpdateFox={handleUpdateAdoptedFox}
                onAdoptNew={handleAdoptNew}
              />
            </motion.div>
          )}

          {/* 2. 放置養成庭院模式 */}
          {gameMode === 'idle' && (
            <motion.div
              key="idle-mode-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <CourtyardGardenView
                gardenState={gardenState}
                onUpdateGarden={handleUpdateGarden}
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
      </main>

      {/* Footer */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCrystalBall={() => setIsCrystalBallOpen(true)}
      />

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

      {/* Personality Quiz Modal */}
      <FoxQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onViewFox={(fox) => setActiveFox(fox)}
      />

      {/* Magic Crystal Ball Modal */}
      <CrystalBallModal
        isOpen={isCrystalBallOpen}
        onClose={() => setIsCrystalBallOpen(false)}
        onViewFoxByName={handleViewFoxByName}
      />

      {/* PWA In-App Install Prompt Banner */}
      <PwaInstallPrompt />
    </div>
  );
}

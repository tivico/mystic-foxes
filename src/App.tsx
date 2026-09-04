import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FoxSpecies, HabitatType, FoxCategory } from './types';
import { FOX_SPECIES_LIST } from './data/foxesData';
import { Header } from './components/Header';
import { HabitatFilter } from './components/HabitatFilter';
import { FoxCard } from './components/FoxCard';
import { FoxModal } from './components/FoxModal';
import { FoxQuizModal } from './components/FoxQuizModal';
import { CrystalBallModal } from './components/CrystalBallModal';
import { Footer } from './components/Footer';
import { playPettingSound } from './utils/foxAudio';
import { Sparkles, Heart, SearchX, RotateCcw } from 'lucide-react';

export default function App() {
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
    // Play adorable species-specific happy petting audio
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

  // Filtered fox species list
  const filteredFoxes = useMemo(() => {
    return FOX_SPECIES_LIST.filter((fox) => {
      // Category filter
      if (selectedCategory !== 'all' && fox.category !== selectedCategory) {
        return false;
      }
      // Habitat filter
      if (selectedHabitat !== 'all' && fox.habitat !== selectedHabitat) {
        return false;
      }
      // Search query filter
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

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col selection:bg-amber-200 selection:text-amber-900 font-sans">
      {/* Floating Hearts Container with Motion */}
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
        totalPetCount={totalPetCount}
      />

      {/* Main Interactive Guidebook Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
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
        <div className="flex items-center justify-between px-2 text-xs font-medium text-stone-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>
              共收錄{' '}
              <strong className="text-stone-800">
                {FOX_SPECIES_LIST.length}
              </strong>{' '}
              種奇幻與自然狐狸 · 當前顯示{' '}
              <strong className="text-amber-700 font-bold">
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
              className="flex items-center gap-1 text-amber-700 hover:text-amber-900 hover:underline cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重設所有條件</span>
            </motion.button>
          )}
        </div>

        {/* Fox Grid with Motion Layout */}
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
            /* Empty Search State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 rounded-3xl p-12 text-center border border-dashed border-stone-300 max-w-md mx-auto space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-3xl">
                🔍
              </div>
              <h4 className="text-lg font-bold text-stone-800 font-serif">
                找不到符合條件的狐狸朋友
              </h4>
              <p className="text-xs text-stone-500">
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
      </main>

      {/* Footer */}
      <Footer
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCrystalBall={() => setIsCrystalBallOpen(true)}
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
    </div>
  );
}

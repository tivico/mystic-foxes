import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FOX_SPECIES_LIST } from '../data/foxesData';
import { GARDEN_SNACKS, GARDEN_TOYS } from '../data/petGameData';
import {
  GardenState,
  GardenVisitor,
  GardenSnackItem,
  GardenToyItem,
} from '../types';
import { FoxIllustration } from './FoxIllustration';
import {
  playPettingSound,
  playFeedSound,
  playToySound,
  playBrushSound,
  playBlessingSound,
  playCameraSound,
} from '../utils/foxAudio';
import {
  Sparkles,
  Plus,
  Coins,
  BookOpen,
  Coffee,
  X,
  Smile,
  Heart,
  RotateCw,
} from 'lucide-react';

interface CourtyardGardenViewProps {
  gardenState: GardenState;
  onUpdateGarden: (updater: (prev: GardenState) => GardenState) => void;
}

export const CourtyardGardenView: React.FC<CourtyardGardenViewProps> = ({
  gardenState,
  onUpdateGarden,
}) => {
  const [selectedVisitor, setSelectedVisitor] = useState<GardenVisitor | null>(null);
  const [isSnackPickerOpen, setIsSnackPickerOpen] = useState(false);
  const [isToyPickerOpen, setIsToyPickerOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [floatingCoin, setFloatingCoin] = useState<{ id: number; text: string } | null>(null);

  // Auto idle coin accumulation (every 10s if visitors exist)
  useEffect(() => {
    const timer = setInterval(() => {
      if (gardenState.visitors.length > 0) {
        const bonus = gardenState.visitors.length * 5;
        onUpdateGarden((prev) => ({
          ...prev,
          coins: prev.coins + bonus,
        }));
      }
    }, 12000);
    return () => clearInterval(timer);
  }, [gardenState.visitors.length, onUpdateGarden]);

  // Spawn initial visitors if none exist
  useEffect(() => {
    if (gardenState.visitors.length === 0) {
      summonWildFox();
    }
  }, []);

  const spawnCoinParticle = (text: string) => {
    setFloatingCoin({ id: Date.now(), text });
    setTimeout(() => setFloatingCoin(null), 1400);
  };

  // Summon wild fox visitor
  const summonWildFox = () => {
    const randomFox =
      FOX_SPECIES_LIST[Math.floor(Math.random() * FOX_SPECIES_LIST.length)];
    const activities = [
      '正趴在草地上瞇著眼曬太陽 ☀️',
      '好奇地聳著小鼻子嗅來嗅去 👃',
      '追著自己毛茸茸的尾巴轉圈圈 🌀',
      '正在開心地享用擺放的美食 🍙',
      '在軟墊上蜷成一個甜甜圈打呼嚕 💤',
    ];

    const newVisitor: GardenVisitor = {
      id: `${randomFox.id}-${Date.now()}`,
      speciesId: randomFox.id,
      activity: activities[Math.floor(Math.random() * activities.length)],
      visitedAt: '剛才',
      satisfaction: 80,
      giftGiven: false,
    };

    onUpdateGarden((prev) => {
      // Keep max 4 visitors at once
      const updated = [newVisitor, ...prev.visitors.slice(0, 3)];
      return {
        ...prev,
        visitors: updated,
        unlockedFoxIds: Array.from(new Set([...prev.unlockedFoxIds, randomFox.id])),
      };
    });

    playBlessingSound();
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    spawnCoinParticle('吸引到新訪客！');
  };

  // Interact with visiting fox in courtyard
  const handlePetVisitor = (visitor: GardenVisitor) => {
    playPettingSound(visitor.speciesId);
    spawnCoinParticle('+20 靈狐幣 & 謝禮 🪙');

    onUpdateGarden((prev) => ({
      ...prev,
      coins: prev.coins + 20,
      visitors: prev.visitors.map((v) =>
        v.id === visitor.id
          ? {
              ...v,
              satisfaction: Math.min(100, v.satisfaction + 15),
              giftGiven: true,
              activity: '被摸得開心地發出呼嚕聲～ 💖',
            }
          : v
      ),
    }));
  };

  // Feed visitor
  const handleFeedVisitor = (visitor: GardenVisitor) => {
    playFeedSound();
    spawnCoinParticle('+35 靈狐幣 🪙');

    onUpdateGarden((prev) => ({
      ...prev,
      coins: prev.coins + 35,
      visitors: prev.visitors.map((v) =>
        v.id === visitor.id
          ? {
              ...v,
              satisfaction: 100,
              activity: '大口嚼著點心，滿足地舔著小爪子！ 🍙',
            }
          : v
      ),
    }));
  };

  // Play with visitor
  const handlePlayVisitor = (visitor: GardenVisitor) => {
    playToySound();
    spawnCoinParticle('+25 靈狐幣 🪙');

    onUpdateGarden((prev) => ({
      ...prev,
      coins: prev.coins + 25,
      visitors: prev.visitors.map((v) =>
        v.id === visitor.id
          ? {
              ...v,
              satisfaction: 100,
              activity: '輕巧躍起，咬住玩具在庭院裡雀躍狂奔！ 🎾',
            }
          : v
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Floating Coin Banner */}
      {floatingCoin && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -20, scale: 1.1 }}
          exit={{ opacity: 0 }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-stone-950 font-black px-4 py-1.5 rounded-full shadow-xl border border-amber-300 text-xs sm:text-sm"
        >
          {floatingCoin.text}
        </motion.div>
      )}

      {/* Top Courtyard Header */}
      <div className="bg-white/90 rounded-3xl p-5 sm:p-6 border border-amber-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-inner">
            ⛩️
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <span>悠閒稻荷庭院</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                放置休閒模式
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              擺放香甜豆腐與逗趣玩具，吸引林間各類靈狐前來小憩做客！
            </p>
          </div>
        </div>

        {/* Currency & Action Toolbar */}
        <div className="flex items-center gap-3">
          {/* Coins Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs shadow-2xs">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>{gardenState.coins || 0} 靈狐金幣</span>
          </div>

          {/* Guestbook Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsGuestbookOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>訪客圖鑑 ({gardenState.unlockedFoxIds.length}/8)</span>
          </motion.button>

          {/* Summon Wild Fox */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={summonWildFox}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>召喚訪客 🦊</span>
          </motion.button>
        </div>
      </div>

      {/* Main Sanctuary Courtyard Stage */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-200 shadow-md bg-gradient-to-b from-amber-100/60 via-orange-50/40 to-emerald-50/60 p-6 sm:p-10 min-h-[460px] flex flex-col justify-between">
        {/* Background Scenic Elements */}
        <div className="absolute top-4 left-6 text-4xl opacity-15 select-none pointer-events-none">
          🍁
        </div>
        <div className="absolute top-8 right-10 text-5xl opacity-10 select-none pointer-events-none">
          ⛩️
        </div>
        <div className="absolute bottom-6 left-8 text-4xl opacity-20 select-none pointer-events-none">
          🎋
        </div>

        {/* Top Stations: Placed Snacks & Toys */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {/* Placed Snacks Table */}
          <div className="bg-white/85 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/90 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-xl bg-amber-50 border border-amber-200">
                {gardenState.placedSnack ? gardenState.placedSnack.emoji : '🥣'}
              </span>
              <div>
                <div className="text-xs font-bold text-stone-900">
                  {gardenState.placedSnack ? gardenState.placedSnack.name : '供餐台空空如也'}
                </div>
                <div className="text-[10px] text-stone-500">
                  {gardenState.placedSnack
                    ? gardenState.placedSnack.attractionBonus
                    : '擺放點心以吸引稀有靈狐訪客'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsSnackPickerOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] cursor-pointer"
            >
              {gardenState.placedSnack ? '更換美食 🍙' : '+ 擺放點心'}
            </button>
          </div>

          {/* Placed Toys Station */}
          <div className="bg-white/85 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/90 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-xl bg-teal-50 border border-teal-200">
                {gardenState.placedToy ? gardenState.placedToy.emoji : '📦'}
              </span>
              <div>
                <div className="text-xs font-bold text-stone-900">
                  {gardenState.placedToy ? gardenState.placedToy.name : '玩具台空空如也'}
                </div>
                <div className="text-[10px] text-stone-500">
                  {gardenState.placedToy
                    ? '讓來訪的小狐狸開心地玩耍互動'
                    : '擺放玩具讓狐狸們更願意駐足逗留'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsToyPickerOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-[11px] cursor-pointer"
            >
              {gardenState.placedToy ? '更換玩具 🎾' : '+ 擺放玩具'}
            </button>
          </div>
        </div>

        {/* Center Courtyard: Visiting Foxes */}
        <div className="my-8 relative z-10">
          <div className="text-center mb-4">
            <span className="text-xs font-bold text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
              庭院中已有 {gardenState.visitors.length} 隻狐狸正在漫步做客（點擊互動）
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gardenState.visitors.map((visitor) => {
              const species =
                FOX_SPECIES_LIST.find((f) => f.id === visitor.speciesId) || FOX_SPECIES_LIST[0];

              return (
                <motion.div
                  key={visitor.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedVisitor(visitor)}
                  className="bg-white/95 rounded-3xl p-4 border border-amber-200 shadow-sm flex flex-col items-center text-center cursor-pointer relative group transition-all"
                >
                  <FoxIllustration foxId={visitor.speciesId} size="md" />

                  <div className="mt-2 space-y-0.5">
                    <div className="text-xs font-bold text-stone-900 font-serif flex items-center justify-center gap-1">
                      <span>{species.name}</span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                        {visitor.satisfaction}% 滿意
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-500 line-clamp-1">{visitor.activity}</p>
                  </div>

                  <div className="mt-3 flex gap-1.5 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePetVisitor(visitor);
                      }}
                      className="flex-1 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg border border-rose-200"
                    >
                      摸摸 🐾
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeedVisitor(visitor);
                      }}
                      className="flex-1 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 text-[10px] font-bold rounded-lg border border-orange-200"
                    >
                      餵食 🍙
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Courtyard Hint */}
        <div className="text-center text-[11px] text-stone-500 relative z-10">
          ✦ 提示：庭院處於放置模式時，來訪的狐狸會自動為你留下「靈狐金幣」謝禮！
        </div>
      </div>

      {/* Snack Selector Modal */}
      {isSnackPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-base font-bold text-stone-900 font-serif">擺放庭院招待美食</h3>
              <button
                onClick={() => setIsSnackPickerOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GARDEN_SNACKS.map((snack) => (
                <button
                  key={snack.id}
                  onClick={() => {
                    onUpdateGarden((prev) => ({ ...prev, placedSnack: snack }));
                    setIsSnackPickerOpen(false);
                    playFeedSound();
                  }}
                  className="p-3 rounded-2xl border border-amber-200 hover:bg-amber-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="text-2xl p-1.5 rounded-xl bg-amber-50 shrink-0">{snack.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{snack.name}</div>
                    <div className="text-[10px] text-amber-800 font-semibold">{snack.attractionBonus}</div>
                    <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{snack.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Toy Selector Modal */}
      {isToyPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-base font-bold text-stone-900 font-serif">擺放庭院娛樂玩具</h3>
              <button
                onClick={() => setIsToyPickerOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GARDEN_TOYS.map((toy) => (
                <button
                  key={toy.id}
                  onClick={() => {
                    onUpdateGarden((prev) => ({ ...prev, placedToy: toy }));
                    setIsToyPickerOpen(false);
                    playToySound();
                  }}
                  className="p-3 rounded-2xl border border-teal-200 hover:bg-teal-50 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="text-2xl p-1.5 rounded-xl bg-teal-50 shrink-0">{toy.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{toy.name}</div>
                    <div className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">{toy.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Guestbook Modal */}
      {isGuestbookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-amber-100 space-y-4 max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">庭院訪客圖鑑手帳</h3>
                  <p className="text-xs text-stone-500">已結緣解鎖 {gardenState.unlockedFoxIds.length} / 8 種靈狐訪客</p>
                </div>
              </div>
              <button
                onClick={() => setIsGuestbookOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FOX_SPECIES_LIST.map((fox) => {
                  const isUnlocked = gardenState.unlockedFoxIds.includes(fox.id);
                  return (
                    <div
                      key={fox.id}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 ${
                        isUnlocked
                          ? 'bg-amber-50/60 border-amber-200'
                          : 'bg-stone-100/70 border-stone-200 opacity-50 grayscale'
                      }`}
                    >
                      <FoxIllustration foxId={fox.id} size="sm" />
                      <div className="text-xs font-bold text-stone-900">{fox.name}</div>
                      <span className="text-[10px] text-stone-500">
                        {isUnlocked ? '已造訪庭院 ✨' : '未拜訪'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Visitor Detail Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-100 text-center space-y-4"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedVisitor(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center">
              <FoxIllustration foxId={selectedVisitor.speciesId} size="lg" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-stone-900 font-serif">
                {FOX_SPECIES_LIST.find((f) => f.id === selectedVisitor.speciesId)?.name}
              </h4>
              <p className="text-xs text-stone-600 italic">「{selectedVisitor.activity}」</p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                onClick={() => {
                  handlePetVisitor(selectedVisitor);
                  setSelectedVisitor(null);
                }}
                className="py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 cursor-pointer"
              >
                摸摸頭 🐾
              </button>
              <button
                onClick={() => {
                  handleFeedVisitor(selectedVisitor);
                  setSelectedVisitor(null);
                }}
                className="py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200 cursor-pointer"
              >
                餵豆腐 🧈
              </button>
              <button
                onClick={() => {
                  handlePlayVisitor(selectedVisitor);
                  setSelectedVisitor(null);
                }}
                className="py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 cursor-pointer"
              >
                逗它玩 🎾
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

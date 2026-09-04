import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FOX_SPECIES_LIST } from '../data/foxesData';
import { GARDEN_SNACKS, GARDEN_TOYS } from '../data/petGameData';
import {
  GardenState,
  GardenVisitor,
} from '../types';
import { FoxIllustration } from './FoxIllustration';
import {
  playPettingSound,
  playFeedSound,
  playToySound,
  playBlessingSound,
} from '../utils/foxAudio';
import {
  Sparkles,
  Coins,
  BookOpen,
  X,
  RotateCw,
  Heart,
  Utensils,
  Gamepad2,
} from 'lucide-react';

interface CourtyardGardenViewProps {
  gardenState: GardenState;
  onUpdateGarden: (updater: (prev: GardenState) => GardenState) => void;
  onPetFox?: (foxId: string) => void;
}

// 5 fixed scenic anchor coordinates in the courtyard stage
const SCENIC_ANCHORS = [
  {
    id: 'veranda',
    name: '緣側木廊',
    left: '48%',
    top: '38%',
    labelOffset: '-top-10',
    desc: '在日式緣側木地板上舒服地享用美食',
  },
  {
    id: 'pond',
    name: '錦鯉清泉溪畔',
    left: '20%',
    top: '64%',
    labelOffset: '-top-10',
    desc: '好奇地看著水中游動的錦鯉與水波',
  },
  {
    id: 'tree',
    name: '櫻花古樹草坪',
    left: '75%',
    top: '50%',
    labelOffset: '-top-10',
    desc: '在落櫻與清風中圍著玩具雀躍玩耍',
  },
  {
    id: 'torii',
    name: '神社鳥居石徑',
    left: '30%',
    top: '34%',
    labelOffset: '-top-10',
    desc: '在朱紅鳥居前的石燈徑上輕巧探險',
  },
  {
    id: 'lantern',
    name: '青苔石燈籠處',
    left: '82%',
    top: '72%',
    labelOffset: '-top-10',
    desc: '蜷在溫暖古樸的石燈籠苔痕旁打盹',
  },
];

export const CourtyardGardenView: React.FC<CourtyardGardenViewProps> = ({
  gardenState,
  onUpdateGarden,
  onPetFox,
}) => {
  const [selectedVisitor, setSelectedVisitor] = useState<GardenVisitor | null>(null);
  const [isSnackPickerOpen, setIsSnackPickerOpen] = useState(false);
  const [isToyPickerOpen, setIsToyPickerOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [activeInteractiveFoxId, setActiveInteractiveFoxId] = useState<string | null>(null);
  const [floatingCoin, setFloatingCoin] = useState<{ id: number; text: string } | null>(null);

  // Auto idle coin accumulation (every 12s if visitors exist)
  useEffect(() => {
    const timer = setInterval(() => {
      if (gardenState.visitors.length > 0) {
        const bonus = gardenState.visitors.length * 5;
        onUpdateGarden((prev) => ({
          ...prev,
          coins: prev.coins + bonus,
          lastActiveTimestamp: Date.now(),
        }));
      }
    }, 12000);
    return () => clearInterval(timer);
  }, [gardenState.visitors.length, onUpdateGarden]);

  const spawnCoinParticle = (text: string) => {
    setFloatingCoin({ id: Date.now(), text });
    setTimeout(() => setFloatingCoin(null), 1500);
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
      '歪著頭聆聽林間吹來的清風 🍃',
    ];

    const newVisitor: GardenVisitor = {
      id: `${randomFox.id}-${Date.now()}`,
      speciesId: randomFox.id,
      activity: activities[Math.floor(Math.random() * activities.length)],
      visitedAt: '剛才',
      satisfaction: 85,
      giftGiven: false,
    };

    onUpdateGarden((prev) => {
      // Keep up to 5 visitors for the 5 scenic spots
      const updated = [newVisitor, ...prev.visitors.filter((v) => v.speciesId !== randomFox.id).slice(0, 4)];
      return {
        ...prev,
        visitors: updated,
        unlockedFoxIds: Array.from(new Set([...prev.unlockedFoxIds, randomFox.id])),
        lastActiveTimestamp: Date.now(),
      };
    });

    playBlessingSound();
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    spawnCoinParticle('吸引到新訪客！');
  };

  // Interact with visiting fox in courtyard
  const handlePetVisitor = (visitor: GardenVisitor, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playPettingSound(visitor.speciesId);
    onPetFox?.(visitor.speciesId);
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
      lastActiveTimestamp: Date.now(),
    }));
  };

  // Feed visitor
  const handleFeedVisitor = (visitor: GardenVisitor, e?: React.MouseEvent) => {
    e?.stopPropagation();
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
      lastActiveTimestamp: Date.now(),
    }));
  };

  // Play with visitor
  const handlePlayVisitor = (visitor: GardenVisitor, e?: React.MouseEvent) => {
    e?.stopPropagation();
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
              activity: '咬住玩具在庭院裡雀躍狂奔！ 🎾',
            }
          : v
      ),
      lastActiveTimestamp: Date.now(),
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
          className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-stone-950 font-black px-4 py-2 rounded-full shadow-xl border border-amber-300 text-xs sm:text-sm flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-stone-900" />
          <span>{floatingCoin.text}</span>
        </motion.div>
      )}

      {/* Top Courtyard Header */}
      <div className="bg-white/90 dark:bg-stone-800/90 rounded-3xl p-5 sm:p-6 border border-amber-100 dark:border-stone-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-2xl shadow-inner">
            ⛩️
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-serif flex items-center gap-2">
              <span>悠閒稻荷庭院</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                放置休閒模式
              </span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              擺放香甜豆腐與逗趣玩具，吸引林間各類靈狐在庭院中漫步做客！
            </p>
          </div>
        </div>

        {/* Currency & Action Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {/* Coins Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold text-xs shadow-2xs">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>{gardenState.coins || 0} 靈狐幣</span>
          </div>

          {/* Guestbook Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsGuestbookOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 font-semibold text-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>訪客手帳 ({gardenState.unlockedFoxIds.length}/{FOX_SPECIES_LIST.length})</span>
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

      {/* FIXED SCENIC COURTYARD STAGE (庭院景觀生活舞台) */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 dark:border-stone-700 shadow-lg min-h-[480px] sm:min-h-[540px] md:min-h-[580px] select-none bg-gradient-to-b from-amber-100/70 via-orange-50/40 to-emerald-100/80 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-800">
        {/* Sky and Distant Hills Layer */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-sky-200/40 via-amber-100/30 to-transparent dark:from-indigo-950/40 pointer-events-none" />

        {/* Scenic Background Illustrations (Torii, Shrine Engawa, Trees, Koi Pond) */}
        {/* 1. Left Torii Gate (朱紅鳥居) */}
        <div className="absolute top-10 left-6 sm:left-12 opacity-85 pointer-events-none flex flex-col items-center">
          <span className="text-6xl sm:text-7xl filter drop-shadow-md">⛩️</span>
          <div className="w-16 h-1 bg-amber-950/20 rounded-full blur-[1px] mt-1" />
        </div>

        {/* 2. Top-Center Veranda Engawa (日式神社緣側木廊) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-72 sm:w-84 h-28 bg-amber-900/15 dark:bg-stone-950/40 rounded-2xl border border-amber-900/20 dark:border-stone-700 flex flex-col items-center justify-between p-3 pointer-events-none">
          <div className="w-full flex justify-around opacity-30 text-stone-700 dark:text-stone-300 text-xs">
            <span>🎋</span>
            <span>🏮</span>
            <span>🎐</span>
            <span>🏮</span>
            <span>🎋</span>
          </div>
          {/* Tatami Deck Mat */}
          <div className="w-60 h-10 bg-amber-200/50 dark:bg-amber-950/40 rounded-xl border border-amber-300/40 flex items-center justify-center gap-2">
            <span className="text-xs text-amber-900 dark:text-amber-200 font-serif font-bold">
              神社緣側 · 甜點休憩席
            </span>
          </div>
        </div>

        {/* 3. Right Ancient Sakura / Blossom Tree (櫻花古樹) */}
        <div className="absolute top-8 right-6 sm:right-12 opacity-90 pointer-events-none flex flex-col items-center">
          <div className="text-6xl sm:text-7xl filter drop-shadow-lg animate-pulse">
            🌸
          </div>
          <span className="text-2xl -mt-3 text-pink-300/70">🍃</span>
        </div>

        {/* 4. Left-Lower Koi Stream & Pond (錦鯉清泉與石橋) */}
        <div className="absolute bottom-10 left-6 sm:left-12 w-48 sm:w-56 h-28 bg-sky-300/35 dark:bg-sky-900/30 rounded-3xl border border-sky-400/40 dark:border-sky-700/40 flex items-center justify-around px-3 py-2 pointer-events-none shadow-inner">
          <div className="text-xl animate-bounce">🐟</div>
          <div className="text-2xl">🪷</div>
          <div className="text-xl">🌊</div>
        </div>

        {/* 5. Right-Lower Stone Lantern & Lawn (石燈籠花草) */}
        <div className="absolute bottom-10 right-6 sm:right-14 opacity-80 pointer-events-none flex flex-col items-center">
          <span className="text-5xl filter drop-shadow-md">🏮</span>
          <span className="text-xl -mt-1">🌿 🪨</span>
        </div>

        {/* Placed Items Interactive Hotspots on Stage */}
        {/* Snack Spot on Engawa */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSnackPickerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-stone-800/90 shadow-md border border-amber-300 dark:border-stone-600 cursor-pointer backdrop-blur-xs"
            title="點擊更換供餐美食"
          >
            <span className="text-2xl">
              {gardenState.placedSnack ? gardenState.placedSnack.emoji : '🥣'}
            </span>
            <div className="text-left">
              <span className="text-[10px] text-stone-500 block leading-none">供餐台</span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                {gardenState.placedSnack ? gardenState.placedSnack.name : '擺放點心'}
              </span>
            </div>
          </motion.button>
        </div>

        {/* Toy Spot near Sacred Tree */}
        <div className="absolute top-28 right-24 sm:right-32 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsToyPickerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-stone-800/90 shadow-md border border-teal-300 dark:border-stone-600 cursor-pointer backdrop-blur-xs"
            title="點擊更換逗趣玩具"
          >
            <span className="text-2xl">
              {gardenState.placedToy ? gardenState.placedToy.emoji : '📦'}
            </span>
            <div className="text-left">
              <span className="text-[10px] text-stone-500 block leading-none">玩具區</span>
              <span className="text-xs font-bold text-teal-900 dark:text-teal-300">
                {gardenState.placedToy ? gardenState.placedToy.name : '擺放玩具'}
              </span>
            </div>
          </motion.button>
        </div>

        {/* VISITING FOXES RENDERED AT SCENIC ANCHOR POSITIONS */}
        <div className="absolute inset-0 z-30">
          {gardenState.visitors.map((visitor, index) => {
            const anchor = SCENIC_ANCHORS[index % SCENIC_ANCHORS.length];
            const species =
              FOX_SPECIES_LIST.find((f) => f.id === visitor.speciesId) || FOX_SPECIES_LIST[0];
            const isMenuOpen = activeInteractiveFoxId === visitor.id;

            return (
              <div
                key={visitor.id}
                style={{
                  left: anchor.left,
                  top: anchor.top,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                {/* Speech / Activity Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-1 pointer-events-auto"
                >
                  <div
                    onClick={() => setActiveInteractiveFoxId(isMenuOpen ? null : visitor.id)}
                    className="cursor-pointer bg-white/95 dark:bg-stone-800/95 px-2.5 py-1 rounded-2xl border border-amber-200 dark:border-stone-700 shadow-md text-stone-900 dark:text-stone-100 text-[11px] flex items-center gap-1.5 whitespace-nowrap hover:scale-105 transition-transform"
                  >
                    <span className="font-bold text-amber-700 dark:text-amber-400 font-serif">
                      {species.name}
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 text-[10px]">
                      {visitor.activity}
                    </span>
                    <span className="text-[10px] text-rose-500 font-bold">
                      ❤️ {visitor.satisfaction}%
                    </span>
                  </div>
                </motion.div>

                {/* Grounded Fox Avatar in the Scene */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveInteractiveFoxId(isMenuOpen ? null : visitor.id)}
                  className="cursor-pointer relative group flex flex-col items-center"
                >
                  {/* Soft floor shadow */}
                  <div className="absolute -bottom-1.5 w-20 h-3.5 bg-stone-900/20 dark:bg-black/30 rounded-full blur-[2px] pointer-events-none" />

                  <FoxIllustration foxId={visitor.speciesId} size="md" />

                  {/* Gentle border highlight on Hover */}
                  <div className="absolute -inset-1 rounded-3xl border-2 border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>

                {/* Interactive Action Menu Popover directly over the Fox */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-white/95 dark:bg-stone-900/95 rounded-2xl p-2 shadow-2xl border border-amber-200 dark:border-stone-700 flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md"
                    >
                      <button
                        onClick={(e) => {
                          handlePetVisitor(visitor, e);
                          setActiveInteractiveFoxId(null);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-200 flex items-center gap-1 cursor-pointer"
                        title="摸摸小狐狸"
                      >
                        <Heart className="w-3 h-3 text-rose-600" />
                        <span>摸摸 🐾</span>
                      </button>

                      <button
                        onClick={(e) => {
                          handleFeedVisitor(visitor, e);
                          setActiveInteractiveFoxId(null);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 flex items-center gap-1 cursor-pointer"
                        title="投餵庭院點心"
                      >
                        <Utensils className="w-3 h-3 text-amber-600" />
                        <span>餵食 🍙</span>
                      </button>

                      <button
                        onClick={(e) => {
                          handlePlayVisitor(visitor, e);
                          setActiveInteractiveFoxId(null);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200 flex items-center gap-1 cursor-pointer"
                        title="逗弄玩具玩耍"
                      >
                        <Gamepad2 className="w-3 h-3 text-teal-600" />
                        <span>玩耍 🎾</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVisitor(visitor);
                          setActiveInteractiveFoxId(null);
                        }}
                        className="p-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
                        title="查看訪客檔案"
                      >
                        <BookOpen className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Scenic Status Indicator */}
        <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none z-20">
          <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300 bg-white/75 dark:bg-stone-800/75 px-3 py-1 rounded-full border border-amber-200/60 dark:border-stone-700 shadow-2xs backdrop-blur-xs">
            ✦ 點選場景中的狐狸可直接進行摸摸、餵食與逗趣玩耍互動！
          </span>
        </div>
      </div>

      {/* VISITOR QUICK-ROSTER STRIP (訪客隨身互動欄) */}
      <div className="bg-white/80 dark:bg-stone-800/80 rounded-3xl p-4 sm:p-5 border border-amber-100 dark:border-stone-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🐾</span>
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-serif">
              做客中的靈狐訪客名單 ({gardenState.visitors.length} 隻)
            </h4>
          </div>
          <span className="text-[11px] text-stone-500 dark:text-stone-400">
            訪客會隨時間留下謝禮與金幣
          </span>
        </div>

        {/* Visitors Horizontal Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {gardenState.visitors.map((visitor, idx) => {
            const species =
              FOX_SPECIES_LIST.find((f) => f.id === visitor.speciesId) || FOX_SPECIES_LIST[0];
            const anchor = SCENIC_ANCHORS[idx % SCENIC_ANCHORS.length];

            return (
              <div
                key={visitor.id}
                className="p-3 rounded-2xl bg-amber-50/60 dark:bg-stone-800/60 border border-amber-200/80 dark:border-stone-700 flex flex-col justify-between gap-2 shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-stone-700 flex items-center justify-center shrink-0 border border-amber-100 dark:border-stone-600">
                    <FoxIllustration foxId={visitor.speciesId} size="sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate font-serif">
                      {species.name}
                    </div>
                    <div className="text-[10px] text-amber-800 dark:text-amber-400 font-medium">
                      在{anchor.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 w-full">
                  <button
                    onClick={(e) => handlePetVisitor(visitor, e)}
                    className="flex-1 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px] border border-rose-200 cursor-pointer text-center"
                  >
                    摸摸 ❤️
                  </button>
                  <button
                    onClick={(e) => handleFeedVisitor(visitor, e)}
                    className="flex-1 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-[10px] border border-amber-300 cursor-pointer text-center"
                  >
                    餵食 🍙
                  </button>
                  <button
                    onClick={() => setSelectedVisitor(visitor)}
                    className="p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-[10px] cursor-pointer"
                    title="詳細資訊"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Snack Selector Modal */}
      {isSnackPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100 dark:border-stone-800 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                擺放庭院招待美食
              </h3>
              <button
                onClick={() => setIsSnackPickerOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GARDEN_SNACKS.map((snack) => (
                <button
                  key={snack.id}
                  onClick={() => {
                    onUpdateGarden((prev) => ({ ...prev, placedSnack: snack, lastActiveTimestamp: Date.now() }));
                    setIsSnackPickerOpen(false);
                    playFeedSound();
                  }}
                  className="p-3 rounded-2xl border border-amber-200 hover:bg-amber-50 dark:border-stone-700 dark:hover:bg-stone-800 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="text-2xl p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 shrink-0">
                    {snack.emoji}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{snack.name}</div>
                    <div className="text-[10px] text-amber-800 dark:text-amber-400 font-semibold">
                      {snack.attractionBonus}
                    </div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                      {snack.desc}
                    </div>
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
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100 dark:border-stone-800 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                擺放庭院娛樂玩具
              </h3>
              <button
                onClick={() => setIsToyPickerOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GARDEN_TOYS.map((toy) => (
                <button
                  key={toy.id}
                  onClick={() => {
                    onUpdateGarden((prev) => ({ ...prev, placedToy: toy, lastActiveTimestamp: Date.now() }));
                    setIsToyPickerOpen(false);
                    playToySound();
                  }}
                  className="p-3 rounded-2xl border border-teal-200 hover:bg-teal-50 dark:border-stone-700 dark:hover:bg-stone-800 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                >
                  <span className="text-2xl p-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 shrink-0">
                    {toy.emoji}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{toy.name}</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                      {toy.desc}
                    </div>
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
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-amber-100 dark:border-stone-800 space-y-4 max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                    庭院訪客圖鑑手帳
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    已結緣解鎖 {gardenState.unlockedFoxIds.length} / {FOX_SPECIES_LIST.length} 種靈狐訪客
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGuestbookOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
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
                          ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
                          : 'bg-stone-100/70 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 opacity-50 grayscale'
                      }`}
                    >
                      <FoxIllustration foxId={fox.id} size="sm" />
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{fox.name}</div>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400">
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
            className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-100 dark:border-stone-800 text-center space-y-4"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedVisitor(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center">
              <FoxIllustration foxId={selectedVisitor.speciesId} size="lg" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                {FOX_SPECIES_LIST.find((f) => f.id === selectedVisitor.speciesId)?.name}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                「{selectedVisitor.activity}」
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                onClick={(e) => {
                  handlePetVisitor(selectedVisitor, e);
                  setSelectedVisitor(null);
                }}
                className="py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 cursor-pointer"
              >
                摸摸頭 🐾
              </button>
              <button
                onClick={(e) => {
                  handleFeedVisitor(selectedVisitor, e);
                  setSelectedVisitor(null);
                }}
                className="py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200 cursor-pointer"
              >
                餵豆腐 🍙
              </button>
              <button
                onClick={(e) => {
                  handlePlayVisitor(selectedVisitor, e);
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

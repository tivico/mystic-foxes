import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  POSTCARD_DESTINATIONS,
  POSTCARD_COLLECTION,
  PostcardDestination,
  PostcardStory,
} from '../data/postcardData';
import confetti from 'canvas-confetti';
import {
  Send,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  BookOpen,
  X,
  Compass,
  Heart,
  ChevronRight,
} from 'lucide-react';

interface WalkState {
  isWalking: boolean;
  destinationId: string;
  startTime: number;
  durationMs: number;
  readyStoryId?: string;
}

interface FoxPostcardAdventureProps {
  foxName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FoxPostcardAdventure({
  foxName,
  isOpen,
  onClose,
}: FoxPostcardAdventureProps) {
  // Adventure state in LocalStorage
  const [walkState, setWalkState] = useState<WalkState | null>(() => {
    try {
      const saved = localStorage.getItem('fox_walk_state');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Postcard history in LocalStorage
  const [history, setHistory] = useState<PostcardStory[]>(() => {
    try {
      const saved = localStorage.getItem('fox_postcards_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeStoryToView, setActiveStoryToView] = useState<PostcardStory | null>(null);
  const [viewTab, setViewTab] = useState<'walk' | 'album'>('walk');
  const [now, setNow] = useState(Date.now());

  // Keep track of current time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isWalking = walkState?.isWalking;
  const currentDest = POSTCARD_DESTINATIONS.find((d) => d.id === walkState?.destinationId);

  // Check if walk is completed
  const remainingMs = walkState
    ? Math.max(0, walkState.startTime + walkState.durationMs - now)
    : 0;
  const isCompleted = isWalking && remainingMs <= 0;

  // Start walking
  const handleStartWalk = (dest: PostcardDestination) => {
    const randomStory =
      POSTCARD_COLLECTION[Math.floor(Math.random() * POSTCARD_COLLECTION.length)];

    const newState: WalkState = {
      isWalking: true,
      destinationId: dest.id,
      startTime: Date.now(),
      durationMs: dest.durationMs,
      readyStoryId: randomStory.id,
    };

    setWalkState(newState);
    try {
      localStorage.setItem('fox_walk_state', JSON.stringify(newState));
    } catch {
      // ignore
    }
  };

  // Open the returned letter
  const handleOpenLetter = () => {
    if (!walkState?.readyStoryId) return;

    const story =
      POSTCARD_COLLECTION.find((s) => s.id === walkState.readyStoryId) ||
      POSTCARD_COLLECTION[0];

    // Trigger celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fbbf24', '#38bdf8'],
      });
    } catch {
      // safe ignore
    }

    // Save to album history if not exists
    setHistory((prev) => {
      if (prev.some((item) => item.id === story.id)) return prev;
      const updated = [story, ...prev];
      try {
        localStorage.setItem('fox_postcards_history', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Clear walk state
    setWalkState(null);
    try {
      localStorage.removeItem('fox_walk_state');
    } catch {
      // ignore
    }

    setActiveStoryToView(story);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 relative max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xl shadow-inner">
                💌
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif flex items-center gap-2">
                  <span>狐狸外出漫步與時空信件</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-sans font-medium">
                    離線自動計時
                  </span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  讓 {foxName} 外出散步，即使關閉網頁，歸來時也會帶回風景明信片與心靈小語！
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 my-4 border-b border-stone-100 dark:border-stone-800 pb-2">
            <button
              type="button"
              onClick={() => setViewTab('walk')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewTab === 'walk'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>漫步啟程</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('album')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewTab === 'album'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>時空明信片手帳 ({history.length})</span>
            </button>
          </div>

          {/* Tab 1: Walk Status or Select Destinations */}
          {viewTab === 'walk' && (
            <div className="space-y-5">
              {isWalking ? (
                /* Walking In-Progress / Returned State */
                <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-center space-y-4">
                  {isCompleted ? (
                    <>
                      <motion.div
                        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl mx-auto"
                      >
                        🦊💌
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold font-serif text-amber-900 dark:text-amber-200">
                          {foxName} 散步回來了！
                        </h4>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                          小狐狸嘴裡銜著一封溫暖的信件，尾巴正開心地搖個不停呢～
                        </p>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenLetter}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        <span>拆閱時空信件與風景明信片 ✨</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ x: [-15, 15, -15] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        className="text-5xl mx-auto"
                      >
                        🦊🎒🍃
                      </motion.div>
                      <div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900 text-amber-800 dark:text-amber-200 inline-block mb-1">
                          正在 {currentDest?.name} 散步中
                        </span>
                        <h4 className="text-base font-bold text-stone-800 dark:text-stone-100">
                          {foxName} 揹著小包袱正在林間漫遊
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                          即使現在關閉或刷新網頁，倒數依然會在背景悄悄進行喔！
                        </p>
                      </div>

                      {/* Countdown Timer */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-stone-800 shadow-sm border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200">
                        <Clock className="w-4 h-4 text-amber-500 animate-spin" />
                        <span className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
                          預計歸來倒數：{Math.floor(remainingMs / 60000)} 分{' '}
                          {Math.floor((remainingMs % 60000) / 1000)} 秒
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Select Destination */
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    選擇散步目的地：
                  </span>

                  <div className="space-y-3">
                    {POSTCARD_DESTINATIONS.map((dest) => (
                      <motion.div
                        key={dest.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 flex items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-white dark:bg-stone-700 flex items-center justify-center text-2xl shadow-sm border border-stone-100 dark:border-stone-600">
                            {dest.svgIcon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-bold text-stone-800 dark:text-stone-100">
                                {dest.name}
                              </h5>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-medium">
                                {dest.durationLabel}
                              </span>
                            </div>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              {dest.sceneryDescription}
                            </p>
                          </div>
                        </div>

                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStartWalk(dest)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>啟程</span>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Postcard Album */}
          {viewTab === 'album' && (
            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="py-12 text-center text-stone-400 dark:text-stone-500 space-y-2">
                  <div className="text-4xl">📭</div>
                  <p className="text-xs">
                    信箱裡目前空空的～讓小狐狸出發去散步，收集第一張風景明信片吧！
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setActiveStoryToView(item)}
                      className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-12 h-14 rounded-lg bg-gradient-to-b from-amber-100 to-rose-100 flex items-center justify-center text-xl shadow-inner border border-white">
                        {item.photoPalette.accentEmoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                          {item.destination}
                        </span>
                        <h6 className="text-xs font-bold text-stone-800 dark:text-stone-100 truncate">
                          {item.title}
                        </h6>
                        <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-1">
                          <span>{item.relicEmoji}</span>
                          <span className="truncate">{item.relicName}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Modal to view single Polaroid Postcard Detail */}
          <AnimatePresence>
            {activeStoryToView && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#fefcf8] dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-white dark:border-stone-800 text-stone-800 dark:text-stone-100 relative max-h-[90vh] overflow-y-auto"
                >
                  {/* Polaroid Photo Frame */}
                  <div className="bg-white dark:bg-stone-800 p-3 pb-5 rounded-2xl shadow-md border border-stone-200 dark:border-stone-700">
                    <div
                      style={{
                        background: `linear-gradient(180deg, ${activeStoryToView.photoPalette.skyTop} 0%, ${activeStoryToView.photoPalette.skyBottom} 100%)`,
                      }}
                      className="h-44 rounded-xl relative overflow-hidden flex flex-col justify-between p-3"
                    >
                      {/* Sun/Moon */}
                      <div
                        style={{ background: activeStoryToView.photoPalette.sunColor }}
                        className="w-10 h-10 rounded-full shadow-lg self-end opacity-90"
                      />

                      {/* Mountains Silhouette */}
                      <svg
                        viewBox="0 0 100 40"
                        className="absolute bottom-0 left-0 right-0 w-full h-16 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,40 L15,18 L35,32 L60,12 L85,28 L100,20 L100,40 Z"
                          fill={activeStoryToView.photoPalette.mountainColor}
                          opacity="0.75"
                        />
                        <path
                          d="M0,40 L25,25 L50,35 L75,20 L100,30 L100,40 Z"
                          fill={activeStoryToView.photoPalette.treesColor}
                          opacity="0.9"
                        />
                      </svg>

                      {/* Scenery floating emoji */}
                      <div className="text-4xl absolute bottom-3 right-4 drop-shadow-md">
                        {activeStoryToView.photoPalette.accentEmoji}
                      </div>

                      <span className="text-[10px] font-bold text-stone-800/80 px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-xs self-start">
                        {activeStoryToView.destination}
                      </span>
                    </div>

                    <div className="mt-3 px-1 flex items-center justify-between">
                      <span className="text-xs font-serif font-bold text-stone-700 dark:text-stone-300">
                        {activeStoryToView.title}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {foxName} 敬上 🐾
                      </span>
                    </div>
                  </div>

                  {/* Poetic & Soul Message */}
                  <div className="mt-5 space-y-4">
                    {/* Poem */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 text-center font-serif text-xs text-amber-900 dark:text-amber-200 leading-relaxed tracking-wider">
                      「 {activeStoryToView.poemText} 」
                    </div>

                    {/* Warm Letter */}
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                      {activeStoryToView.warmLetter}
                    </p>

                    {/* Found Relic */}
                    <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center gap-3">
                      <div className="text-2xl">{activeStoryToView.relicEmoji}</div>
                      <div>
                        <div className="text-xs font-bold text-stone-800 dark:text-stone-100">
                          帶回紀念品：{activeStoryToView.relicName}
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          {activeStoryToView.relicDesc}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setActiveStoryToView(null)}
                      className="px-6 py-2 rounded-full bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-xs font-bold text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
                    >
                      收存入信箱手帳
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

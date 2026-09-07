import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GamePlayMode } from '../types';
import {
  PawPrint,
  Sparkles,
  BookOpen,
  Wrench,
  Wind,
  Music,
  SunMedium,
  HelpCircle,
  Mail,
  Database,
  Search,
  X,
  Clock,
} from 'lucide-react';

interface MobileBottomDockProps {
  currentMode: GamePlayMode;
  onSelectMode: (mode: GamePlayMode) => void;
  visitorCount: number;
  onOpenBreathing: () => void;
  onOpenAmbientMixer: () => void;
  onOpenAtmosphere: () => void;
  onOpenQuiz: (tab?: 'personality' | 'trivia' | 'silhouette') => void;
  onOpenCrystalBall: () => void;
  onOpenPostcards: () => void;
  onOpenSaveBackup: () => void;
  onOpenDailyJournal: () => void;
  onOpenFocusCompanion: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  currentMode,
  onSelectMode,
  visitorCount,
  onOpenBreathing,
  onOpenAmbientMixer,
  onOpenAtmosphere,
  onOpenQuiz,
  onOpenCrystalBall,
  onOpenPostcards,
  onOpenSaveBackup,
  onOpenDailyJournal,
  onOpenFocusCompanion,
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const tabs: {
    id: GamePlayMode;
    label: string;
    icon: string;
    badge?: number;
  }[] = [
    { id: 'adopt', label: '認領', icon: '🐾' },
    { id: 'idle', label: '庭院', icon: '⛩️', badge: visitorCount },
    { id: 'encyclopedia', label: '圖鑑', icon: '📖' },
    { id: 'myth-vs-reality', label: '傳說', icon: '✨' },
  ];

  return (
    <>
      {/* Mobile Floating Bottom Bar */}
      <nav className="lg:hidden fixed bottom-3 inset-x-3 z-40 bg-white/95 dark:bg-[#1f1d19]/95 backdrop-blur-md rounded-2xl border border-amber-900/15 dark:border-amber-100/15 shadow-xl p-1.5 flex items-center justify-around select-none">
        {tabs.map((tab) => {
          const isActive = currentMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onSelectMode(tab.id);
                setIsToolsOpen(false);
              }}
              className={`flex-1 py-1.5 px-2 flex flex-col items-center justify-center rounded-xl transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span className="text-base leading-none relative">
                {tab.icon}
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-rose-500 text-white text-[9px] font-bold rounded-full border border-white">
                    {tab.badge}
                  </span>
                ) : null}
              </span>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}

        {/* Tools Drawer Trigger Button */}
        <button
          type="button"
          onClick={() => setIsToolsOpen(true)}
          className="flex-1 py-1.5 px-2 flex flex-col items-center justify-center rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
        >
          <span className="text-base leading-none">🧰</span>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">工具</span>
        </button>
      </nav>

      {/* Mobile Tools Bottom Sheet Drawer */}
      <AnimatePresence>
        {isToolsOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsToolsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-h-[80vh] overflow-y-auto bg-[#fbf9f5] dark:bg-[#1c1a16] rounded-t-3xl border-t border-amber-900/15 p-5 shadow-2xl space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧰</span>
                  <h3 className="font-serif font-black text-stone-900 dark:text-stone-100 text-base">
                    靈狐心靈工具箱
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsToolsOpen(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100 dark:bg-stone-800"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Group 0: 深度治癒體驗 (Focus & Journal) */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  ✦ 深度治癒體驗（專注與日常手記）
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenFocusCompanion();
                      setIsToolsOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-900 border border-stone-700 text-left cursor-pointer"
                  >
                    <Clock size={20} className="text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-amber-200">靈狐陪讀專注</div>
                      <div className="text-[10px] text-stone-400">極簡番茄鐘</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenDailyJournal();
                      setIsToolsOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-400/40 text-left cursor-pointer"
                  >
                    <BookOpen size={20} className="text-amber-600 dark:text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">狐狐日常手記</div>
                      <div className="text-[10px] text-amber-700 dark:text-amber-400">第一人稱日記</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Group 1: 靈狐試煉考堂 (New & Highlighted) */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                  ⛩️ 靈狐試煉考堂（3種趣味題庫）
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenQuiz('personality');
                      setIsToolsOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 text-center"
                  >
                    <Sparkles size={18} className="text-amber-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200">
                      命定守護狐
                    </span>
                    <span className="text-[9px] text-amber-700 dark:text-amber-400">心靈特質</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenQuiz('trivia');
                      setIsToolsOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 text-center"
                  >
                    <HelpCircle size={18} className="text-orange-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200">
                      生態知識
                    </span>
                    <span className="text-[9px] text-orange-700 dark:text-orange-400">答對賺幣</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenQuiz('silhouette');
                      setIsToolsOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 text-center"
                  >
                    <Search size={18} className="text-purple-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200">
                      剪影盲盒
                    </span>
                    <span className="text-[9px] text-purple-700 dark:text-purple-400">看線索猜</span>
                  </button>
                </div>
              </div>

              {/* Group 2: 心靈舒緩 */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                  🌿 心靈舒緩冥想
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenBreathing();
                      setIsToolsOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 text-center"
                  >
                    <Wind size={18} className="text-teal-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200">
                      深呼吸
                    </span>
                    <span className="text-[9px] text-teal-700 dark:text-teal-400">放鬆練習</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenAmbientMixer();
                      setIsToolsOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 text-center"
                  >
                    <Music size={18} className="text-amber-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200">
                      白噪音
                    </span>
                    <span className="text-[9px] text-amber-700 dark:text-amber-400">環境混音</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenAtmosphere();
                      setIsToolsOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 text-center"
                  >
                    <SunMedium size={18} className="text-orange-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800 dark:text-stone-200">
                      四季光影
                    </span>
                    <span className="text-[9px] text-orange-700 dark:text-orange-400">晝夜氛圍</span>
                  </button>
                </div>
              </div>

              {/* Group 3: 奇遇探索 */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                  📮 奇遇探索
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenCrystalBall();
                      setIsToolsOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/70 text-left"
                  >
                    <Sparkles size={18} className="text-purple-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        冷知識水晶球
                      </div>
                      <div className="text-[10px] text-purple-700 dark:text-purple-400">
                        每日靈狐小知識
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onOpenPostcards();
                      setIsToolsOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/70 text-left"
                  >
                    <Mail size={18} className="text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        時空明信片
                      </div>
                      <div className="text-[10px] text-blue-700 dark:text-blue-400">
                        狐狸旅行來信
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Save & Backup Full Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenSaveBackup();
                    setIsToolsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  <Database size={16} />
                  <span>存檔備份與 JSON 匯出／匯入</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

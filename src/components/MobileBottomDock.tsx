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
  X,
} from 'lucide-react';

interface MobileBottomDockProps {
  currentMode: GamePlayMode;
  onSelectMode: (mode: GamePlayMode) => void;
  visitorCount: number;
  onOpenBreathing: () => void;
  onOpenAmbientMixer: () => void;
  onOpenAtmosphere: () => void;
  onOpenQuiz: () => void;
  onOpenCrystalBall: () => void;
  onOpenPostcards: () => void;
  onOpenSaveBackup: () => void;
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

              {/* Tools Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onOpenBreathing();
                    setIsToolsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200/70 text-left text-teal-950 dark:text-teal-200"
                >
                  <Wind size={20} className="text-teal-600" />
                  <div>
                    <div className="text-xs font-bold">引導深呼吸</div>
                    <div className="text-[10px] text-teal-700 dark:text-teal-400">箱式冥想練習</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenAmbientMixer();
                    setIsToolsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 text-left text-amber-950 dark:text-amber-200"
                >
                  <Music size={20} className="text-amber-600" />
                  <div>
                    <div className="text-xs font-bold">林間白噪音</div>
                    <div className="text-[10px] text-amber-700 dark:text-amber-400">環境白噪音混音</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenAtmosphere();
                    setIsToolsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/70 text-left text-orange-950 dark:text-orange-200"
                >
                  <SunMedium size={20} className="text-orange-600" />
                  <div>
                    <div className="text-xs font-bold">晝夜四季光影</div>
                    <div className="text-[10px] text-orange-700 dark:text-orange-400">微粒與色溫切換</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenCrystalBall();
                    setIsToolsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/70 text-left text-purple-950 dark:text-purple-200"
                >
                  <Sparkles size={20} className="text-purple-600" />
                  <div>
                    <div className="text-xs font-bold">冷知識水晶球</div>
                    <div className="text-[10px] text-purple-700 dark:text-purple-400">每日靈狐小知識</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenQuiz();
                    setIsToolsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/70 text-left text-rose-950 dark:text-rose-200"
                >
                  <HelpCircle size={20} className="text-rose-600" />
                  <div>
                    <div className="text-xs font-bold">測守護靈狐</div>
                    <div className="text-[10px] text-rose-700 dark:text-rose-400">命定靈魂伴侶</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenPostcards();
                    setIsToolsOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/70 text-left text-blue-950 dark:text-blue-200"
                >
                  <Mail size={20} className="text-blue-600" />
                  <div>
                    <div className="text-xs font-bold">時空明信片</div>
                    <div className="text-[10px] text-blue-700 dark:text-blue-400">狐狸旅行來信</div>
                  </div>
                </button>
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

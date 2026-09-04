import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GamePlayMode, AdoptedFox } from '../types';
import { FOX_SPECIES_LIST } from '../data/foxesData';
import { FoxIllustration } from './FoxIllustration';
import { calculateCompanionDays } from '../utils/saveManager';
import {
  PawPrint,
  Sparkles,
  BookOpen,
  Wind,
  Music,
  SunMedium,
  HelpCircle,
  Mail,
  Database,
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
  Smile,
  Zap,
} from 'lucide-react';

interface AppSidebarProps {
  currentMode: GamePlayMode;
  onSelectMode: (mode: GamePlayMode) => void;
  adoptedFox: AdoptedFox | null;
  visitorCount: number;
  speciesCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenBreathing: () => void;
  onOpenAmbientMixer: () => void;
  onOpenAtmosphere: () => void;
  onOpenQuiz: (tab?: 'personality' | 'trivia' | 'silhouette') => void;
  onOpenCrystalBall: () => void;
  onOpenPostcards: () => void;
  onOpenSaveBackup: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentMode,
  onSelectMode,
  adoptedFox,
  visitorCount,
  speciesCount,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
  onOpenBreathing,
  onOpenAmbientMixer,
  onOpenAtmosphere,
  onOpenQuiz,
  onOpenCrystalBall,
  onOpenPostcards,
  onOpenSaveBackup,
}) => {
  const speciesMeta = adoptedFox ? FOX_SPECIES_LIST.find((f) => f.id === adoptedFox.speciesId) : null;

  const coreModes: {
    id: GamePlayMode;
    label: string;
    sublabel: string;
    icon: string;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      id: 'adopt',
      label: '專屬陪伴',
      sublabel: adoptedFox ? `${adoptedFox.customName} Lv.${adoptedFox.level}` : '認領小狐狸',
      icon: '🐾',
      badge: adoptedFox ? `Lv.${adoptedFox.level}` : '未認領',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'idle',
      label: '悠閒庭院',
      sublabel: '稻荷神社放置庭院',
      icon: '⛩️',
      badge: visitorCount > 0 ? `${visitorCount} 隻做客` : '等待中',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'encyclopedia',
      label: '典藏圖鑑',
      sublabel: '自然與神話全覽',
      icon: '📖',
      badge: `${speciesCount} 種`,
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    {
      id: 'myth-vs-reality',
      label: '傳說 vs 現實',
      sublabel: '神話考證與現實原型',
      icon: '✨',
      badge: '對照',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#fbf9f5] dark:bg-[#1a1815] border-r border-amber-900/10 dark:border-amber-100/10 text-stone-800 dark:text-stone-200 select-none overflow-hidden">
      {/* Brand & Logo Header */}
      <div className="p-4 flex items-center justify-between border-b border-amber-900/5 dark:border-amber-100/5">
        <div
          onClick={() => onSelectMode('adopt')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="返回靈狐主頁"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm shadow-amber-500/20 text-lg shrink-0 group-hover:scale-105 transition-transform">
            🦊
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap transition-all">
              <h1 className="font-serif font-black text-stone-900 dark:text-stone-100 text-sm tracking-wide flex items-center gap-1.5">
                <span>靈狐治癒伴侶</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-sans font-medium">
                  和風
                </span>
              </h1>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                Fox Healing Sanctuary
              </p>
            </div>
          )}
        </div>

        {/* Desktop Collapse Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors"
          title={isCollapsed ? '展開側邊欄' : '收合側邊欄'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Mini Companion Snapshot Widget (when not collapsed) */}
      {!isCollapsed && adoptedFox && (
        <div className="mx-3 mt-3 p-2.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 flex items-center gap-3">
          <div className="relative w-11 h-11 shrink-0 rounded-xl overflow-hidden border border-amber-300/60 bg-white/80 dark:bg-stone-800 shadow-2xs">
            <FoxIllustration foxId={adoptedFox.speciesId} alt={adoptedFox.customName} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                {adoptedFox.customName}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-200/70 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-bold shrink-0">
                Lv.{adoptedFox.level}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-0.5 text-rose-600 dark:text-rose-400 font-medium">
                <Smile size={10} /> {adoptedFox.happiness}%
              </span>
              <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-medium">
                <Zap size={10} /> {adoptedFox.energy}%
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium ml-auto">
                陪伴 {calculateCompanionDays(adoptedFox.adoptedAt)} 天
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links Scroll Container */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5 custom-scrollbar">
        {/* Section 1: Core Modes */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-1.5 text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
              核心場景
            </div>
          )}
          <nav className="space-y-1">
            {coreModes.map((mode) => {
              const isActive = currentMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    onSelectMode(mode.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
                  } rounded-2xl text-left transition-all relative group cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-white font-bold shadow-sm shadow-amber-500/25'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 font-medium'
                  }`}
                  title={mode.label}
                >
                  <span className="text-lg shrink-0">{mode.icon}</span>
                  {!isCollapsed && (
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs truncate">{mode.label}</span>
                        {mode.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold border ${
                              isActive
                                ? 'bg-white/20 text-white border-white/30'
                                : mode.badgeColor || 'bg-stone-100 text-stone-600 border-stone-200'
                            }`}
                          >
                            {mode.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[10px] truncate ${
                          isActive ? 'text-amber-100' : 'text-stone-400 dark:text-stone-500'
                        }`}
                      >
                        {mode.sublabel}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section 2: Mindfulness & Atmosphere */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-1.5 text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
              心靈舒緩
            </div>
          )}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => {
                onOpenBreathing();
                onCloseMobile();
              }}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'
              } rounded-xl text-stone-700 dark:text-stone-300 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:text-teal-900 dark:hover:text-teal-200 transition-colors text-xs font-medium cursor-pointer`}
              title="引導深呼吸練習"
            >
              <Wind size={16} className="text-teal-500 shrink-0" />
              {!isCollapsed && <span className="ml-3">引導深呼吸</span>}
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenAmbientMixer();
                onCloseMobile();
              }}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'
              } rounded-xl text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-900 dark:hover:text-amber-200 transition-colors text-xs font-medium cursor-pointer`}
              title="自然環境白噪音混音"
            >
              <Music size={16} className="text-amber-500 shrink-0" />
              {!isCollapsed && <span className="ml-3">林間白噪音</span>}
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenAtmosphere();
                onCloseMobile();
              }}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'
              } rounded-xl text-stone-700 dark:text-stone-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-900 dark:hover:text-orange-200 transition-colors text-xs font-medium cursor-pointer`}
              title="晝夜光影與四季微粒"
            >
              <SunMedium size={16} className="text-orange-500 shrink-0" />
              {!isCollapsed && <span className="ml-3">晝夜四季光影</span>}
            </button>
          </div>
        </div>

        {/* Section 3: Interactive & Lore */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-1.5 text-[11px] font-bold tracking-wider text-stone-400 dark:text-stone-500 uppercase">
              趣味探索
            </div>
          )}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => {
                onOpenQuiz('personality');
                onCloseMobile();
              }}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'
              } rounded-xl text-stone-700 dark:text-stone-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-900 dark:hover:text-rose-200 transition-colors text-xs font-medium cursor-pointer`}
              title="靈狐試煉考堂（命定測驗、知識挑戰、剪影盲盒）"
            >
              <HelpCircle size={16} className="text-rose-500 shrink-0" />
              {!isCollapsed && (
                <div className="ml-3 flex-1 flex items-center justify-between">
                  <span>靈狐試煉考堂</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-mono font-bold">
                    3種題庫
                  </span>
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenCrystalBall();
                onCloseMobile();
              }}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'
              } rounded-xl text-stone-700 dark:text-stone-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-purple-900 dark:hover:text-purple-200 transition-colors text-xs font-medium cursor-pointer`}
              title="每日靈狐冷知識水晶球"
            >
              <Sparkles size={16} className="text-purple-500 shrink-0" />
              {!isCollapsed && <span className="ml-3">冷知識水晶球</span>}
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenPostcards();
                onCloseMobile();
              }}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2'
              } rounded-xl text-stone-700 dark:text-stone-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-900 dark:hover:text-blue-200 transition-colors text-xs font-medium cursor-pointer`}
              title="旅行明信片與來信"
            >
              <Mail size={16} className="text-blue-500 shrink-0" />
              {!isCollapsed && <span className="ml-3">時空明信片</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Settings & Save Utility */}
      <div className="p-3 border-t border-amber-900/5 dark:border-amber-100/5 bg-amber-50/40 dark:bg-amber-950/10">
        <button
          type="button"
          onClick={() => {
            onOpenSaveBackup();
            onCloseMobile();
          }}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center p-2' : 'px-3 py-2'
          } rounded-xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all text-xs font-bold shadow-2xs cursor-pointer`}
          title="存檔備份、JSON 匯出與匯入"
        >
          <Database size={15} className="text-emerald-600 shrink-0" />
          {!isCollapsed && (
            <div className="ml-2.5 flex-1 flex items-center justify-between">
              <span>存檔備份</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-normal">
                JSON
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 h-screen transition-all duration-300 ease-in-out z-30 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Offcanvas Drawer */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 shadow-2xl lg:hidden"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

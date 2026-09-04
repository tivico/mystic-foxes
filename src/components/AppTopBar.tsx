import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GamePlayMode } from '../types';
import { playWindChimeSound } from '../utils/foxAudio';
import {
  Menu,
  Coins,
  Heart,
  Volume2,
  VolumeX,
  Database,
  Sun,
  Moon,
  Sunset,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface AppTopBarProps {
  currentMode: GamePlayMode;
  coins: number;
  totalPetCount: number;
  timeOfDay: 'day' | 'sunset' | 'night';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  onOpenMobileMenu: () => void;
  onOpenAtmosphere: () => void;
  onOpenSaveBackup: () => void;
  onOpenAmbientMixer?: () => void;
}

export const AppTopBar: React.FC<AppTopBarProps> = ({
  currentMode,
  coins,
  totalPetCount,
  timeOfDay,
  season,
  onOpenMobileMenu,
  onOpenAtmosphere,
  onOpenSaveBackup,
  onOpenAmbientMixer,
}) => {
  const [isChimeActive, setIsChimeActive] = useState(false);

  const handleChimeClick = () => {
    playWindChimeSound();
    setIsChimeActive(true);
    setTimeout(() => setIsChimeActive(false), 1200);
  };

  const getModeTitle = () => {
    switch (currentMode) {
      case 'adopt':
        return {
          icon: '🐾',
          title: '專屬伴侶養成',
          subtitle: '給狐狸一個溫暖的家，陪伴它長大成長',
        };
      case 'idle':
        return {
          icon: '⛩️',
          title: '悠閒稻荷庭院',
          subtitle: '擺放茶點與木玩，吸引各方靈狐前來小憩做客',
        };
      case 'encyclopedia':
        return {
          icon: '📖',
          title: '靈狐典藏全圖鑑',
          subtitle: '收錄 18 種自然野生狐種與東方神話仙狐',
        };
      case 'myth-vs-reality':
        return {
          icon: '✨',
          title: '傳說 vs 現實考證',
          subtitle: '從生物演化特徵走進跨文化靈狐神話的世界',
        };
      default:
        return {
          icon: '🦊',
          title: '靈狐治癒空間',
          subtitle: '沉浸在微風與溫暖的療癒氛圍中',
        };
    }
  };

  const modeInfo = getModeTitle();

  const seasonEmoji = {
    spring: '🌸 春櫻',
    summer: '🌿 夏林',
    autumn: '🍁 秋楓',
    winter: '❄️ 冬雪',
  }[season];

  const timeEmoji = {
    day: <Sun size={13} className="text-amber-500" />,
    sunset: <Sunset size={13} className="text-orange-500" />,
    night: <Moon size={13} className="text-indigo-400" />,
  }[timeOfDay];

  return (
    <header className="sticky top-0 z-20 w-full bg-white/85 dark:bg-[#1a1815]/85 backdrop-blur-md border-b border-amber-900/10 dark:border-amber-100/10 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 transition-colors select-none">
      {/* Left: Mobile hamburger + Current Mode Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title="開啟選單"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg">{modeInfo.icon}</span>
            <h2 className="font-serif font-black text-sm sm:text-base text-stone-900 dark:text-stone-100 tracking-tight truncate">
              {modeInfo.title}
            </h2>
          </div>
          <p className="hidden sm:block text-[11px] text-stone-500 dark:text-stone-400 truncate font-medium">
            {modeInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Currency, Hearts, Atmosphere, Chime, Backup */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Quick Atmosphere Pill */}
        <button
          type="button"
          onClick={onOpenAtmosphere}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-stone-200/80 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-[11px] font-bold transition-all cursor-pointer"
          title="切換晝夜四季光影"
        >
          {timeEmoji}
          <span>{seasonEmoji}</span>
        </button>

        {/* Coins Pill */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs font-bold font-mono shadow-2xs"
          title="現有靈狐幣"
        >
          <Coins size={14} className="text-amber-500" />
          <span>{coins}</span>
        </div>

        {/* Global Pet Count Badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 text-xs font-bold font-mono shadow-2xs"
          title="總撫摸次數"
        >
          <Heart size={13} className="text-rose-500 fill-rose-400" />
          <span>{totalPetCount}</span>
        </div>

        {/* Ambient Sound & Sleep Timer Trigger */}
        {onOpenAmbientMixer && (
          <button
            type="button"
            onClick={onOpenAmbientMixer}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-all text-xs font-bold shadow-2xs flex items-center gap-1 cursor-pointer"
            title="開啟白噪音混音與睡眠定時器"
          >
            <Sliders size={13} className="text-amber-500" />
            <span className="hidden lg:inline">白噪音</span>
          </button>
        )}

        {/* Zen Wind Chime Audio Trigger */}
        <motion.button
          type="button"
          onClick={handleChimeClick}
          whileTap={{ scale: 0.9 }}
          className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
            isChimeActive
              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 border-amber-300 scale-105'
              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200/80 dark:border-stone-700 hover:bg-stone-50'
          }`}
          title="輕叩御守風鈴"
        >
          <span className="text-sm">🎐</span>
        </motion.button>

        {/* Quick Save Modal Button */}
        <button
          type="button"
          onClick={onOpenSaveBackup}
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-400 hover:text-emerald-700 transition-all text-xs font-bold shadow-2xs flex items-center gap-1 cursor-pointer"
          title="開啟存檔備份中心"
        >
          <Database size={14} className="text-emerald-600" />
          <span className="hidden sm:inline">備份</span>
        </button>
      </div>
    </header>
  );
};

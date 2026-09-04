import React from 'react';
import { motion } from 'motion/react';
import { GamePlayMode } from '../types';
import { Heart, Home, BookOpen, Sparkles } from 'lucide-react';

interface GameModeNavProps {
  currentMode: GamePlayMode;
  onSelectMode: (mode: GamePlayMode) => void;
  adoptedFoxName?: string;
  visitorCount?: number;
}

export const GameModeNav: React.FC<GameModeNavProps> = ({
  currentMode,
  onSelectMode,
  adoptedFoxName,
  visitorCount = 0,
}) => {
  const tabs = [
    {
      id: 'adopt' as GamePlayMode,
      label: '認領一隻模式',
      subtitle: adoptedFoxName ? `伴侶：${adoptedFoxName}` : '專屬契約伴侶',
      icon: '🦊',
      badge: '10種互動',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'idle' as GamePlayMode,
      label: '放置養成模式',
      subtitle: `庭院訪客 (${visitorCount} 隻做客中)`,
      icon: '🏡',
      badge: '離線收成',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'encyclopedia' as GamePlayMode,
      label: '靈狐全圖鑑',
      subtitle: '8 種物種資料庫',
      icon: '📖',
      badge: '冷知識測驗',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white/95 p-1.5 sm:p-2 rounded-3xl border border-amber-200/80 shadow-md backdrop-blur-md grid grid-cols-3 gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const isActive = currentMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectMode(tab.id)}
              className={`relative py-3 px-2 sm:px-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none ${
                isActive
                  ? 'text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50/80'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-mode-pill"
                  className="absolute inset-0 bg-gradient-to-tr from-amber-100/90 via-orange-50/80 to-amber-50 rounded-2xl border border-amber-300"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl">{tab.icon}</span>
                  <span className="text-xs sm:text-sm font-black font-serif tracking-tight">
                    {tab.label}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] text-stone-500 font-medium">
                    {tab.subtitle}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${tab.badgeColor}`}
                  >
                    {tab.badge}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

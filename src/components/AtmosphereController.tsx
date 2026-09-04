import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SeasonType, TimeOfDay } from './SeasonParticlesCanvas';
import { Sun, Sunset, Moon, Sparkles, Calendar, ToggleLeft, ToggleRight, X } from 'lucide-react';

interface AtmosphereControllerProps {
  timeOfDay: TimeOfDay;
  season: SeasonType;
  autoSync: boolean;
  onTimeChange: (time: TimeOfDay) => void;
  onSeasonChange: (season: SeasonType) => void;
  onAutoSyncToggle: (val: boolean) => void;
  particlesEnabled: boolean;
  onToggleParticles: (val: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AtmosphereController({
  timeOfDay,
  season,
  autoSync,
  onTimeChange,
  onSeasonChange,
  onAutoSyncToggle,
  particlesEnabled,
  onToggleParticles,
  isOpen,
  onClose,
}: AtmosphereControllerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xl shadow-inner">
                🌤️
              </div>
              <div>
                <h3 className="text-base font-bold font-serif">晝夜光影與四季氛圍</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  純前端時間感知，沈浸式自然光影轉換
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-4 space-y-5">
            {/* Auto-Sync Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-stone-800 dark:text-stone-100 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>即時同步本地真實時間</span>
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  根據你所在地的當前時鐘與月份自動切換晝夜與四季
                </p>
              </div>

              <button
                type="button"
                onClick={() => onAutoSyncToggle(!autoSync)}
                className="text-amber-600 hover:text-amber-700 cursor-pointer"
              >
                {autoSync ? (
                  <ToggleRight className="w-7 h-7 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-stone-400" />
                )}
              </button>
            </div>

            {/* Time of Day selection */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                時段光照（當前：{autoSync ? '已隨時鐘自動調節' : '手動自選'}）：
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'day', label: '晨曦暖陽', icon: Sun, color: 'text-amber-500' },
                  { id: 'sunset', label: '夕照暮光', icon: Sunset, color: 'text-orange-500' },
                  { id: 'night', label: '靜夜星月', icon: Moon, color: 'text-indigo-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = timeOfDay === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onTimeChange(item.id as TimeOfDay);
                        if (autoSync) onAutoSyncToggle(false);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 shadow-sm'
                          : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${item.color}`} />
                      <span className="text-xs font-bold block">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Season selection */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                季節氛圍微粒：
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'spring', label: '🌸 春櫻', desc: '飄櫻落英' },
                  { id: 'summer', label: '🌿 夏夜', desc: '微光螢火' },
                  { id: 'autumn', label: '🍁 秋楓', desc: '流光金葉' },
                  { id: 'winter', label: '❄️ 冬雪', desc: '晶瑩初雪' },
                ].map((item) => {
                  const isSelected = season === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSeasonChange(item.id as SeasonType);
                        if (autoSync) onAutoSyncToggle(false);
                      }}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 font-bold text-amber-950 dark:text-amber-100 shadow-sm'
                          : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <span className="text-xs block font-bold">{item.label}</span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Canvas Particle Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>飄動粒子特效開關</span>
              </span>

              <button
                type="button"
                onClick={() => onToggleParticles(!particlesEnabled)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
              >
                {particlesEnabled ? '已開啟 (Canvas流暢運算)' : '已暫停'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

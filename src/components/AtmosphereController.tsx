import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SeasonType, TimeOfDay } from './SeasonParticlesCanvas';
import { TextureStyle } from './StorybookTextureOverlay';
import { Sun, Sunset, Moon, Sparkles, Calendar, ToggleLeft, ToggleRight, X, Layers, Image as ImageIcon } from 'lucide-react';

interface AtmosphereControllerProps {
  timeOfDay: TimeOfDay;
  season: SeasonType;
  autoSync: boolean;
  onTimeChange: (time: TimeOfDay) => void;
  onSeasonChange: (season: SeasonType) => void;
  onAutoSyncToggle: (val: boolean) => void;
  particlesEnabled: boolean;
  onToggleParticles: (val: boolean) => void;
  textureStyle: TextureStyle;
  onTextureStyleChange: (style: TextureStyle) => void;
  parallaxEnabled: boolean;
  onToggleParallax: (val: boolean) => void;
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
  textureStyle,
  onTextureStyleChange,
  parallaxEnabled,
  onToggleParallax,
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
          className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xl shadow-inner">
                🌤️
              </div>
              <div>
                <h3 className="text-base font-bold font-serif">光影質感、視差與四季氛圍</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  純前端高階渲染：紙張紋理、動態視差與聲學景深
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

            {/* 繪本光影質感層：水彩紙張紋理 / 底片微粒 */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>繪本光影質感層 (Texture Overlay)：</span>
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">
                  SVG Filter 加速
                </span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: 'paper' as const,
                    label: '水彩厚磅紙',
                    desc: '手揉和紙纖維質感',
                    icon: '📜',
                  },
                  {
                    id: 'grain' as const,
                    label: '底片膠捲微粒',
                    desc: '35mm 復古電影感',
                    icon: '🎞️',
                  },
                  {
                    id: 'none' as const,
                    label: '清爽原畫',
                    desc: '純淨高對比無視效',
                    icon: '✨',
                  },
                ].map((item) => {
                  const isSelected = textureStyle === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onTextureStyleChange(item.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 font-bold text-amber-950 dark:text-amber-100 shadow-sm ring-1 ring-amber-500/20'
                          : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <span className="text-base block mb-0.5">{item.icon}</span>
                      <span className="text-xs font-bold block">{item.label}</span>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 繪本動態視差與景深開關 */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-300/40 dark:border-amber-700/40">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-stone-800 dark:text-stone-100 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>立體繪本視差與微距景深 (Parallax)</span>
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  滑鼠游標掠過時，遠景、中景與前景靈狐呈現層次位移與近鏡柔焦光斑
                </p>
              </div>

              <button
                type="button"
                onClick={() => onToggleParallax(!parallaxEnabled)}
                className="text-amber-600 hover:text-amber-700 cursor-pointer"
              >
                {parallaxEnabled ? (
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

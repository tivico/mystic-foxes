import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ambientSoundEngine } from '../utils/ambientAudio';
import {
  Volume2,
  VolumeX,
  Wind,
  CloudRain,
  Flame,
  Moon,
  Music,
  Clock,
  Sparkles,
  Sliders,
  X,
} from 'lucide-react';

interface ChannelConfig {
  id: 'breeze' | 'rain' | 'campfire' | 'crickets' | 'chimes';
  name: string;
  sub: string;
  icon: React.ElementType;
  defaultVal: number;
}

const CHANNELS: ChannelConfig[] = [
  { id: 'breeze', name: '森林微風', sub: '樹梢沙沙自然微風', icon: Wind, defaultVal: 0.4 },
  { id: 'rain', name: '午後陣雨', sub: '屋簷淅瀝柔和雨滴', icon: CloudRain, defaultVal: 0 },
  { id: 'campfire', name: '溫暖營火', sub: '柴火微光噼啪脆響', icon: Flame, defaultVal: 0 },
  { id: 'crickets', name: '夏夜蟲鳴', sub: '田野夜鶯蟋蟀呢喃', icon: Moon, defaultVal: 0.3 },
  { id: 'chimes', name: '空靈琴音', sub: '五音階安神和弦琴鈴', icon: Music, defaultVal: 0.25 },
];

const PRESETS = [
  {
    name: '深林冥想',
    icon: '🌲',
    values: { breeze: 0.5, rain: 0, campfire: 0, crickets: 0.3, chimes: 0.4 },
  },
  {
    name: '雨夜伴讀',
    icon: '🌧️',
    values: { breeze: 0.2, rain: 0.6, campfire: 0, crickets: 0.4, chimes: 0.2 },
  },
  {
    name: '篝火暖夢',
    icon: '🪵',
    values: { breeze: 0.3, rain: 0, campfire: 0.6, crickets: 0.4, chimes: 0 },
  },
  {
    name: '全靜音',
    icon: '🔇',
    values: { breeze: 0, rain: 0, campfire: 0, crickets: 0, chimes: 0 },
  },
];

interface AmbientSoundMixerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AmbientSoundMixer({ isOpen, onClose }: AmbientSoundMixerProps) {
  const [volumes, setVolumes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('ambient_volumes');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      breeze: 0,
      rain: 0,
      campfire: 0,
      crickets: 0,
      chimes: 0,
    };
  });

  const [isMuted, setIsMuted] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeftSec, setTimeLeftSec] = useState<number | null>(null);

  // Apply volume changes to engine
  const applyVolume = (channel: ChannelConfig['id'], val: number) => {
    setVolumes((prev) => {
      const next = { ...prev, [channel]: val };
      try {
        localStorage.setItem('ambient_volumes', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    if (!isMuted) {
      ambientSoundEngine.setVolume(channel, val);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      // Turn on
      setIsMuted(false);
      CHANNELS.forEach((ch) => {
        ambientSoundEngine.setVolume(ch.id, volumes[ch.id] || 0);
      });
    } else {
      // Turn off
      setIsMuted(true);
      ambientSoundEngine.stopAll();
    }
  };

  const handleApplyPreset = (presetVals: Record<string, number>) => {
    setVolumes(presetVals);
    try {
      localStorage.setItem('ambient_volumes', JSON.stringify(presetVals));
    } catch {
      // ignore
    }
    const hasAnySound = Object.values(presetVals).some((v) => v > 0);
    if (hasAnySound) {
      setIsMuted(false);
      Object.entries(presetVals).forEach(([k, v]) => {
        ambientSoundEngine.setVolume(k as ChannelConfig['id'], v);
      });
    } else {
      setIsMuted(true);
      ambientSoundEngine.stopAll();
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timerMinutes === null) {
      setTimeLeftSec(null);
      return;
    }
    setTimeLeftSec(timerMinutes * 60);
  }, [timerMinutes]);

  useEffect(() => {
    if (timeLeftSec === null || timeLeftSec <= 0) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev === null || prev <= 1) {
          // Timer finished: mute all
          setIsMuted(true);
          ambientSoundEngine.stopAll();
          setTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeftSec]);

  const activeChannelCount = Object.values(volumes).filter((v) => typeof v === 'number' && v > 0).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shadow-inner">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif flex items-center gap-2">
                  <span>陪伴系環境白噪音混音器</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-sans font-medium">
                    100% 離線免流量
                  </span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  純 Web Audio 合成自然音景，放鬆專注、安神助眠
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

          {/* Master Control & Timer */}
          <div className="my-5 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 flex flex-wrap items-center justify-between gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={handleToggleMute}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                !isMuted && activeChannelCount > 0
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200'
              }`}
            >
              {!isMuted && activeChannelCount > 0 ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span>正在播放 ({activeChannelCount} 軌音景)</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>點擊開啟白噪音播放</span>
                </>
              )}
            </motion.button>

            {/* Sleep Timer */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>定時休眠：</span>
              {[15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimerMinutes(timerMinutes === mins ? null : mins)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    timerMinutes === mins
                      ? 'bg-amber-500 text-white font-bold'
                      : 'bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {mins}分
                </button>
              ))}
              {timeLeftSec !== null && (
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold text-[11px] ml-1">
                  剩 {Math.floor(timeLeftSec / 60)}:
                  {(timeLeftSec % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2 mb-6">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>快速靜心主題：</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset.values)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-stone-700/50 text-xs font-medium text-stone-700 dark:text-stone-200 transition-all text-left cursor-pointer"
                >
                  <span className="text-base">{preset.icon}</span>
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Sliders */}
          <div className="space-y-4">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
              各音軌獨立音量微調（0% - 100%）：
            </span>

            {CHANNELS.map((ch) => {
              const Icon = ch.icon;
              const val = volumes[ch.id] || 0;
              const percent = Math.round(val * 100);

              return (
                <div
                  key={ch.id}
                  className="p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors ${
                          val > 0 && !isMuted
                            ? 'bg-amber-500 text-white'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-800 dark:text-stone-100">
                          {ch.name}
                        </span>
                        <span className="text-[10px] text-stone-400 dark:text-stone-500 ml-2">
                          {ch.sub}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                      {percent}%
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={val}
                      onChange={(e) => applyVolume(ch.id, parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-center text-xs text-stone-400 dark:text-stone-500">
            🌱 採用高階程序化聲學合成，無需下載任何大檔案，關閉分頁即自動釋放記憶體。
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

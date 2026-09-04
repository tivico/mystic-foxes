import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
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

const SLEEP_TIMER_OPTIONS = [15, 30, 60];
const FADE_OUT_THRESHOLD_SEC = 30; // Last 30 seconds enter gentle fade-out

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

  const [masterVolume, setMasterVolume] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ambient_master_vol');
      if (saved) return parseFloat(saved);
    } catch {
      // ignore
    }
    return 0.8;
  });

  const [isMuted, setIsMuted] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [targetEndTime, setTargetEndTime] = useState<number | null>(null);
  const [timeLeftSec, setTimeLeftSec] = useState<number | null>(null);
  const [isFadingOutToSleep, setIsFadingOutToSleep] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const fadeInTimerRef = useRef<number | null>(null);

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

  const handleMasterVolumeChange = (newVal: number) => {
    setMasterVolume(newVal);
    ambientSoundEngine.setMasterVolume(newVal);
    try {
      localStorage.setItem('ambient_master_vol', newVal.toString());
    } catch {
      // ignore
    }
  };

  // Toggle Mute with Hearing Protection Fade-in / Fade-out
  const handleToggleMute = () => {
    if (isMuted) {
      // Unmute with gentle fade-in (3s) to protect ears
      setIsMuted(false);
      setIsFadingIn(true);
      if (fadeInTimerRef.current) clearTimeout(fadeInTimerRef.current);
      fadeInTimerRef.current = window.setTimeout(() => setIsFadingIn(false), 3000);

      ambientSoundEngine.fadeIn(3.0, masterVolume);
      CHANNELS.forEach((ch) => {
        ambientSoundEngine.setVolume(ch.id, volumes[ch.id] || 0);
      });
    } else {
      // Turn off with a short soft 0.8s fade out instead of sudden cutoff
      ambientSoundEngine.fadeOut(0.8, () => {
        setIsMuted(true);
        setIsFadingIn(false);
      });
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
      setIsFadingIn(true);
      if (fadeInTimerRef.current) clearTimeout(fadeInTimerRef.current);
      fadeInTimerRef.current = window.setTimeout(() => setIsFadingIn(false), 3000);

      ambientSoundEngine.fadeIn(3.0, masterVolume);
      Object.entries(presetVals).forEach(([k, v]) => {
        ambientSoundEngine.setVolume(k as ChannelConfig['id'], v);
      });
    } else {
      ambientSoundEngine.fadeOut(0.8, () => {
        setIsMuted(true);
        setIsFadingIn(false);
      });
    }
  };

  // Sleep Timer Selection (15 / 30 / 60 minutes)
  const handleSelectSleepTimer = (mins: number) => {
    if (timerMinutes === mins) {
      // Cancel timer
      ambientSoundEngine.cancelFade();
      setTimerMinutes(null);
      setTargetEndTime(null);
      setTimeLeftSec(null);
      setIsFadingOutToSleep(false);
      return;
    }

    const totalSeconds = mins * 60;
    const endTime = Date.now() + totalSeconds * 1000;
    setTimerMinutes(mins);
    setTargetEndTime(endTime);
    setTimeLeftSec(totalSeconds);
    setIsFadingOutToSleep(false);

    // If muted, automatically start audio with gentle fade-in
    if (isMuted) {
      setIsMuted(false);
      setIsFadingIn(true);
      if (fadeInTimerRef.current) clearTimeout(fadeInTimerRef.current);
      fadeInTimerRef.current = window.setTimeout(() => setIsFadingIn(false), 3000);

      ambientSoundEngine.fadeIn(3.0, masterVolume);
      CHANNELS.forEach((ch) => {
        ambientSoundEngine.setVolume(ch.id, volumes[ch.id] || 0);
      });
    }
  };

  const handleCancelSleepTimer = () => {
    ambientSoundEngine.cancelFade();
    setTimerMinutes(null);
    setTargetEndTime(null);
    setTimeLeftSec(null);
    setIsFadingOutToSleep(false);
  };

  // Precise Clock Countdown for Sleep Timer
  useEffect(() => {
    if (!targetEndTime) {
      setTimeLeftSec(null);
      return;
    }

    const checkInterval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((targetEndTime - Date.now()) / 1000));
      setTimeLeftSec(remaining);

      // Trigger gentle progressive fade-out when reaching the final threshold (e.g. last 30s)
      if (remaining <= FADE_OUT_THRESHOLD_SEC && remaining > 0 && !isFadingOutToSleep) {
        setIsFadingOutToSleep(true);
        ambientSoundEngine.fadeOut(remaining, () => {
          setIsMuted(true);
          setTimerMinutes(null);
          setTargetEndTime(null);
          setTimeLeftSec(null);
          setIsFadingOutToSleep(false);
        });
      }

      if (remaining <= 0) {
        setIsMuted(true);
        setTimerMinutes(null);
        setTargetEndTime(null);
        setTimeLeftSec(null);
        setIsFadingOutToSleep(false);
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, [targetEndTime, isFadingOutToSleep]);

  const activeChannelCount = Object.values(volumes).filter(
    (v) => typeof v === 'number' && v > 0
  ).length;

  if (!isOpen) return null;

  const totalTimerSeconds = timerMinutes ? timerMinutes * 60 : 0;
  const progressPercent =
    totalTimerSeconds > 0 && timeLeftSec !== null
      ? Math.round(((totalTimerSeconds - timeLeftSec) / totalTimerSeconds) * 100)
      : 0;

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
                <h3 className="text-lg font-bold font-serif flex items-center gap-2 flex-wrap">
                  <span>自然白噪音聲學混音器</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-sans font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    聽覺保護淡入
                  </span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  純 Web Audio 合成自然音景 · 睡眠定時與平滑淡出
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

          {/* Hearing Protection Notice Banner */}
          <div className="mt-4 p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold">防驚擾柔和淡入：</span>
              開啟播放時音量由靜音於 3 秒內平緩升起 (Fade-in)，免受突發強音驚嚇。
            </div>
          </div>

          {/* Master Control & Fade In Status */}
          <div className="my-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={handleToggleMute}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
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

              {isFadingIn && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 animate-pulse bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800/40">
                  <Sparkles className="w-3 h-3" />
                  音量柔和淡入中 (Fade-in)...
                </span>
              )}
            </div>

            {/* Master Volume Slider */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/50">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-stone-600 dark:text-stone-400 font-medium">
                  主音量 (Master Volume)：
                </span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                  {Math.round(masterVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={masterVolume}
                onChange={(e) => handleMasterVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Sleep Timer & Fade Out Section */}
          <div className="my-4 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>離線睡眠定時器 (Sleep Timer)</span>
              </div>

              {timerMinutes !== null && (
                <button
                  type="button"
                  onClick={handleCancelSleepTimer}
                  className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  title="取消睡眠定時"
                >
                  <RotateCcw className="w-3 h-3" />
                  取消定時
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {SLEEP_TIMER_OPTIONS.map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => handleSelectSleepTimer(mins)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                    timerMinutes === mins
                      ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                      : 'bg-white dark:bg-stone-800 border border-indigo-200/80 dark:border-indigo-800/60 text-stone-700 dark:text-stone-200 hover:border-indigo-400'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{mins} 分鐘</span>
                </button>
              ))}
            </div>

            {/* Timer Active Indicator */}
            {timeLeftSec !== null && (
              <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-700 dark:text-indigo-300 font-medium flex items-center gap-1.5">
                    {isFadingOutToSleep ? (
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold animate-pulse">
                        <Moon className="w-3.5 h-3.5" />
                        🌙 正在舒緩淡出入睡中 (Fade-out)...
                      </span>
                    ) : (
                      <span>伴睡中，到期前 30 秒平滑淡出</span>
                    )}
                  </span>
                  <span className="font-mono font-bold text-indigo-900 dark:text-indigo-100 text-sm">
                    {Math.floor(timeLeftSec / 60)}:
                    {(timeLeftSec % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-indigo-200/60 dark:bg-indigo-900/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
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

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  Coffee,
  CheckCircle2,
  Flame,
  CloudRain,
  Wind,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdoptedFox } from '../types';
import { FoxIllustration } from './FoxIllustration';
import { playZenSingingBowlSound } from '../utils/foxAudio';
import { ambientSoundEngine } from '../utils/ambientAudio';
import { recordFocusSessionToJournal } from '../utils/foxJournalManager';
import { StorybookTextureOverlay, TextureStyle } from './StorybookTextureOverlay';
import { useParallax } from '../hooks/useParallax';

interface FoxFocusCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  adoptedFox: AdoptedFox | null;
  onRewardCoins: (amount: number) => void;
  onRewardExp: (amount: number) => void;
  onAddPinecone?: (amount: number) => void;
}

const PRESET_MODES = [
  { id: 'pomodoro', name: '標準番茄鐘', minutes: 25, icon: '🍅', desc: '25分鐘黃金專注' },
  { id: 'deepwork', name: '深度心流', minutes: 50, icon: '🌊', desc: '50分鐘深度沉浸' },
  { id: 'quick', name: '靈感短思', minutes: 15, icon: '⚡', desc: '15分鐘速記回顧' },
  { id: 'rest', name: '禪意小憩', minutes: 5, icon: '🍵', desc: '5分鐘深呼吸放鬆' },
];

const COMPANION_WHISPERS = [
  '「專心做事吧，小狐狸一直安靜守在你的身旁。」',
  '「一呼一吸，沉澱心神，世界會為你慢下來。」',
  '「每專注一秒，我們的陪伴之樹就在悄悄發芽。」',
  '「不用著急，一步一步來，你已經做得很好了。」',
  '「毛茸茸的尾巴輕輕搭在你腳邊，為你注入溫柔的勇氣。」',
];

export const FoxFocusCompanionModal: React.FC<FoxFocusCompanionModalProps> = ({
  isOpen,
  onClose,
  adoptedFox,
  onRewardCoins,
  onRewardExp,
  onAddPinecone,
}) => {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_MODES[0]);
  const [timeLeft, setTimeLeft] = useState(PRESET_MODES[0].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAmbientActive, setIsAmbientActive] = useState(false);
  const [ambientTheme, setAmbientTheme] = useState<'breeze' | 'rain' | 'campfire'>('breeze');
  const [whisperIdx, setWhisperIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // 繪本光影質感與動態視差
  const [textureStyle, setTextureStyle] = useState<TextureStyle>(() => {
    try {
      const saved = localStorage.getItem('fox_texture_style');
      return (saved as TextureStyle) || 'paper';
    } catch {
      return 'paper';
    }
  });
  const [isParallaxEnabled, setIsParallaxEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('fox_parallax_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const parallax = useParallax({ enabled: isParallaxEnabled, intensity: 1.1 });

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const whisperIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const foxName = adoptedFox?.customName || '小狐狸';
  const foxSpeciesId = adoptedFox?.speciesId || 'red-fox';
  const totalSeconds = selectedPreset.minutes * 60;
  const progressRatio = Math.max(0, Math.min(1, (totalSeconds - timeLeft) / totalSeconds));

  // Reset timer when preset changes
  const handleSelectPreset = (preset: typeof PRESET_MODES[0]) => {
    if (isRunning) {
      if (!window.confirm('目前專注計時進行中，確定要更換模式並重設嗎？')) return;
    }
    setIsRunning(false);
    setSelectedPreset(preset);
    setTimeLeft(preset.minutes * 60);
    setIsCompleted(false);
  };

  // Timer Tick
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Completed!
      handleSessionComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  // Subtle whisper rotation every 28 seconds
  useEffect(() => {
    if (isRunning) {
      whisperIntervalRef.current = setInterval(() => {
        setWhisperIdx((prev) => (prev + 1) % COMPANION_WHISPERS.length);
      }, 28000);
    }
    return () => {
      if (whisperIntervalRef.current) clearInterval(whisperIntervalRef.current);
    };
  }, [isRunning]);

  // Handle Finish
  const handleSessionComplete = () => {
    setIsRunning(false);
    setIsCompleted(true);

    // Play serene Singing Bowl sound
    playZenSingingBowlSound();

    // Confetti celebration
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    // Reward calculations
    const earnedCoins = selectedPreset.minutes >= 50 ? 50 : selectedPreset.minutes >= 25 ? 30 : 15;
    const earnedExp = selectedPreset.minutes >= 50 ? 60 : selectedPreset.minutes >= 25 ? 35 : 15;
    const pinecones = selectedPreset.minutes >= 25 ? 1 : 0;

    onRewardCoins(earnedCoins);
    onRewardExp(earnedExp);
    if (pinecones > 0 && onAddPinecone) {
      onAddPinecone(pinecones);
    }

    // Auto-record to Fox Journal!
    recordFocusSessionToJournal(adoptedFox, selectedPreset.minutes, selectedPreset.name);
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isCompleted) {
      // Reset
      setIsCompleted(false);
      setTimeLeft(selectedPreset.minutes * 60);
    }
    setIsRunning((prev) => !prev);
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(selectedPreset.minutes * 60);
  };

  // Ambient sound toggle in Focus Mode
  const toggleAmbientSound = () => {
    if (!isAmbientActive) {
      ambientSoundEngine.fadeIn(1.5);
      // Set peaceful preset
      if (ambientTheme === 'breeze') {
        ambientSoundEngine.setVolume('breeze', 0.5);
        ambientSoundEngine.setVolume('chimes', 0.25);
        ambientSoundEngine.setVolume('rain', 0);
        ambientSoundEngine.setVolume('campfire', 0);
      } else if (ambientTheme === 'rain') {
        ambientSoundEngine.setVolume('rain', 0.55);
        ambientSoundEngine.setVolume('breeze', 0.2);
        ambientSoundEngine.setVolume('campfire', 0);
        ambientSoundEngine.setVolume('chimes', 0);
      } else {
        ambientSoundEngine.setVolume('campfire', 0.6);
        ambientSoundEngine.setVolume('breeze', 0.3);
        ambientSoundEngine.setVolume('rain', 0);
        ambientSoundEngine.setVolume('chimes', 0);
      }
      setIsAmbientActive(true);
    } else {
      ambientSoundEngine.stopAll();
      setIsAmbientActive(false);
    }
  };

  // Switch ambient theme while active
  const switchAmbientTheme = (theme: 'breeze' | 'rain' | 'campfire') => {
    setAmbientTheme(theme);
    if (isAmbientActive) {
      if (theme === 'breeze') {
        ambientSoundEngine.setVolume('rain', 0);
        ambientSoundEngine.setVolume('campfire', 0);
        ambientSoundEngine.setVolume('breeze', 0.5);
        ambientSoundEngine.setVolume('chimes', 0.25);
      } else if (theme === 'rain') {
        ambientSoundEngine.setVolume('campfire', 0);
        ambientSoundEngine.setVolume('chimes', 0);
        ambientSoundEngine.setVolume('rain', 0.55);
        ambientSoundEngine.setVolume('breeze', 0.2);
      } else {
        ambientSoundEngine.setVolume('rain', 0);
        ambientSoundEngine.setVolume('chimes', 0);
        ambientSoundEngine.setVolume('campfire', 0.6);
        ambientSoundEngine.setVolume('breeze', 0.3);
      }
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        ref={parallax.containerRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 bg-[#181614] text-amber-100 select-none overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* Storybook Texture Overlay (水彩紙張紋理 / 復古底片膠捲微粒) */}
        <StorybookTextureOverlay
          texture={textureStyle}
          isFullscreen={isFullscreen}
          opacity={isFullscreen ? (textureStyle === 'grain' ? 0.38 : 0.45) : 0.3}
        />

        {/* Parallax Layer 1: Deep Starfield & Celestial Moon Glow */}
        <div
          className="absolute inset-0 bg-radial from-amber-950/30 via-[#181614] to-[#12100e] pointer-events-none transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${parallax.layer1.x}px, ${parallax.layer1.y}px, 0)`,
          }}
        >
          {/* Subtle celestial dust stars */}
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-amber-200/40 blur-[0.5px]" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-amber-300/30 blur-[0.5px]" />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-amber-100/20 blur-[1px]" />
          <div className="absolute top-1/6 right-1/3 w-1.5 h-1.5 rounded-full bg-yellow-200/30 blur-[0.5px]" />
        </div>

        {/* Top Control Bar */}
        <div className="relative z-20 w-full max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl select-none">🦊</span>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-black text-amber-200 tracking-wider flex items-center gap-2">
                <span>靈狐陪讀 · 禪意專注</span>
                {isFullscreen && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                    全螢幕繪本沉浸
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-amber-200/60">
                {foxName} 正在身邊安靜陪伴著你
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Texture Selector Pill */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => {
                  if (textureStyle === 'paper') setTextureStyle('grain');
                  else if (textureStyle === 'grain') setTextureStyle('none');
                  else setTextureStyle('paper');
                }}
                className="px-2 py-1 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer text-amber-200/90 hover:text-white"
                title="切換繪本紋理質感（水彩紙 / 底片微粒 / 原畫）"
              >
                <ImageIcon size={13} className="text-amber-400" />
                <span className="text-[11px]">
                  {textureStyle === 'paper'
                    ? '📜 水彩紙'
                    : textureStyle === 'grain'
                    ? '🎞️ 底片微粒'
                    : '✨ 原畫'}
                </span>
              </button>

              {/* Parallax Toggle */}
              <button
                type="button"
                onClick={() => setIsParallaxEnabled(!isParallaxEnabled)}
                className={`p-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                  isParallaxEnabled
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'text-stone-500 hover:text-stone-300'
                }`}
                title={isParallaxEnabled ? '關閉立體視差' : '開啟立體視差'}
              >
                <Layers size={13} />
              </button>
            </div>

            {/* Ambient Sound Quick Controls */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
              <button
                type="button"
                onClick={toggleAmbientSound}
                className={`p-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                  isAmbientActive
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title={isAmbientActive ? '關閉白噪音' : '開啟自然白噪音'}
              >
                {isAmbientActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span className="hidden sm:inline text-[11px]">
                  {isAmbientActive ? '音效播放中' : '自然音效'}
                </span>
              </button>

              {isAmbientActive && (
                <div className="flex items-center gap-0.5 px-1">
                  <button
                    onClick={() => switchAmbientTheme('breeze')}
                    className={`p-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      ambientTheme === 'breeze' ? 'bg-amber-400/20 text-amber-300' : 'text-stone-400'
                    }`}
                    title="微風"
                  >
                    <Wind size={12} />
                  </button>
                  <button
                    onClick={() => switchAmbientTheme('rain')}
                    className={`p-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      ambientTheme === 'rain' ? 'bg-amber-400/20 text-amber-300' : 'text-stone-400'
                    }`}
                    title="細雨"
                  >
                    <CloudRain size={12} />
                  </button>
                  <button
                    onClick={() => switchAmbientTheme('campfire')}
                    className={`p-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      ambientTheme === 'campfire' ? 'bg-amber-400/20 text-amber-300' : 'text-stone-400'
                    }`}
                    title="營火"
                  >
                    <Flame size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-amber-200 transition-colors cursor-pointer"
              title={isFullscreen ? '退出全螢幕' : '切換全螢幕沈浸'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Exit Button */}
            <button
              onClick={() => {
                if (isRunning && !window.confirm('專注計時進行中，確定要離開嗎？')) return;
                setIsRunning(false);
                if (isAmbientActive) ambientSoundEngine.stopAll();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-amber-200 transition-colors cursor-pointer"
              title="離開陪讀模式"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-lg space-y-6">
          {/* Preset Selector Pill Tabs (when paused/reset) */}
          {!isRunning && !isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10"
            >
              {PRESET_MODES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedPreset.id === preset.id
                      ? 'bg-amber-500 text-stone-900 shadow-md scale-105'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.name}</span>
                  <span className="text-[10px] opacity-80 font-mono">({preset.minutes}m)</span>
                </button>
              ))}
            </motion.div>
          )}

          {/* Parallax Layer 2: Midground subtle halo & sacred shrine element */}
          <div
            className="absolute -top-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(${parallax.layer2.x}px, ${parallax.layer2.y}px, 0)`,
            }}
          />

          {/* Parallax Layer 3: Fox Resting Center Stage & Clock */}
          <div
            className="flex flex-col items-center space-y-5 transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(${parallax.layer3.x}px, ${parallax.layer3.y}px, 0)`,
            }}
          >
            {/* Fox Resting Center Stage */}
            <div className="relative flex flex-col items-center">
              {/* Ground shadow beneath fox */}
              <div className="absolute -bottom-2 w-36 h-6 bg-black/40 rounded-full blur-md pointer-events-none" />

              <FoxIllustration
                foxId={foxSpeciesId}
                size="lg"
                activity={isRunning ? 'sleeping' : 'sleeping'}
                stage={adoptedFox?.stage}
              />
            </div>

            {/* Clock Timer Section */}
            <div className="text-center space-y-2">
              {!isCompleted ? (
                <>
                  <div className="font-mono text-5xl sm:text-7xl font-bold tracking-tight text-amber-100 drop-shadow-sm">
                    {formatTime(timeLeft)}
                  </div>

                  {/* Subtle Breathing Progress Ring / Bar */}
                  <div className="w-56 sm:w-64 h-2 mx-auto bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-1000"
                      style={{ width: `${progressRatio * 100}%` }}
                    />
                  </div>
                </>
              ) : (
                /* Completion Success Card */
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-6 rounded-3xl bg-amber-950/60 border border-amber-500/40 text-center space-y-3 max-w-sm"
                >
                  <div className="text-4xl select-none">🎉</div>
                  <h3 className="text-lg font-bold font-serif text-amber-200">
                    專注完成！辛苦你了！
                  </h3>
                  <p className="text-xs text-amber-300/80">
                    小狐狸剛剛把這份美好時光悄悄寫進了【日常手記】中！
                  </p>

                  <div className="flex items-center justify-center gap-3 pt-2 text-xs font-bold text-amber-200">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30">
                      🌲 專注松果 +1
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30">
                      🪙 靈狐幣 +30
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30">
                      ✨ 修為 +35
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Fox Whisper Prompt */}
              <div className="h-6 text-xs text-amber-300/70 font-medium italic transition-opacity">
                {!isCompleted && COMPANION_WHISPERS[whisperIdx]}
              </div>
            </div>
          </div>

          {/* Near Bokeh Depth of Field Floating Particles (Parallax Layer 4) */}
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(${parallax.layer4.x}px, ${parallax.layer4.y}px, 0)`,
            }}
          >
            <div className="absolute -bottom-8 -right-8 w-12 h-12 rounded-full bg-amber-400/15 blur-lg" />
            <div className="absolute -top-10 -left-10 w-16 h-16 rounded-full bg-amber-300/10 blur-xl" />
            <div className="absolute top-1/2 -right-4 w-6 h-6 rounded-full bg-yellow-200/20 blur-xs" />
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {!isCompleted ? (
              <>
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className={`px-7 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
                    isRunning
                      ? 'bg-amber-600/80 hover:bg-amber-600 text-stone-100'
                      : 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-black scale-105'
                  }`}
                >
                  {isRunning ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isRunning ? '暫停休息' : '開始專注'}</span>
                </button>

                {(isRunning || timeLeft !== totalSeconds) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
                    title="重設當前番茄鐘"
                  >
                    <RotateCcw size={18} />
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsCompleted(false);
                  setTimeLeft(selectedPreset.minutes * 60);
                }}
                className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wide transition-all cursor-pointer"
              >
                進行下一個專注循環
              </button>
            )}
          </div>
        </div>

        {/* Bottom Peaceful Footer */}
        <div className="relative z-10 text-center text-[11px] text-stone-500 font-sans">
          ✦ 專注完成將獲得「專注松果」，並由小狐狸自動寫下第一人稱陪伴手記
        </div>
      </div>
    </AnimatePresence>
  );
};

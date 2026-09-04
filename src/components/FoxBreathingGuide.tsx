import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Volume2, VolumeX, X, Play, Pause, RotateCcw } from 'lucide-react';

interface FoxBreathingGuideProps {
  foxName: string;
  isOpen: boolean;
  onClose: () => void;
}

type BreathingTechnique = 'box' | 'relax478';

export function FoxBreathingGuide({
  foxName,
  isOpen,
  onClose,
}: FoxBreathingGuideProps) {
  const [technique, setTechnique] = useState<BreathingTechnique>('box');
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Sound chime state
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Technique intervals in seconds
  const techniqueConfig = {
    box: {
      name: '4-4-4-4 箱式冥想呼吸',
      desc: '平衡自律神經、迅速平復心浮氣躁',
      phases: [
        { key: 'inhale', label: '深深吸氣', prompt: '放鬆雙肩，緩慢吸入純淨清新的森林微風...', duration: 4 },
        { key: 'hold1', label: '靜心屏氣', prompt: '安詳感受體內生機的充盈與寧靜...', duration: 4 },
        { key: 'exhale', label: '緩緩吐氣', prompt: '放鬆所有緊繃，將一整天的疲憊慢慢吐出...', duration: 4 },
        { key: 'hold2', label: '沉澱安歇', prompt: '身心澄澈，靜靜感受心跳平穩的節奏...', duration: 4 },
      ] as const,
    },
    relax478: {
      name: '4-7-8 深度安眠呼吸',
      desc: '舒緩交感神經、營造深層睡眠與沉靜感',
      phases: [
        { key: 'inhale', label: '溫和吸氣', prompt: '閉上嘴唇，以鼻腔輕柔吸氣四秒鐘...', duration: 4 },
        { key: 'hold1', label: '安穩屏氣', prompt: '屏息定神，任由氧氣流淌至全身每個細胞...', duration: 7 },
        { key: 'exhale', label: '深長呼氣', prompt: '微啟雙唇，發出微風般的呼氣聲八秒鐘...', duration: 8 },
        { key: 'hold2', label: '自然放鬆', prompt: '回歸自然寧靜，準備進入下一個循環...', duration: 1 },
      ] as const,
    },
  };

  const currentTechnique = techniqueConfig[technique];
  const currentPhaseIndex = currentTechnique.phases.findIndex((p) => p.key === phase);
  const currentPhaseConfig = currentTechnique.phases[currentPhaseIndex] || currentTechnique.phases[0];

  // Play soft guidance tone with Web Audio
  const playBreathChime = (type: 'inhale' | 'exhale' | 'hold') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = type === 'inhale' ? 440 : type === 'exhale' ? 330 : 554.37;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    } catch {
      // safe ignore
    }
  };

  useEffect(() => {
    if (!isOpen || !isActive) return;

    let timer: number;
    let step = 0;
    const intervalMs = 100;
    const totalSteps = currentPhaseConfig.duration * 10;

    timer = window.setInterval(() => {
      step += 1;
      setPhaseProgress(step / totalSteps);

      if (step >= totalSteps) {
        // Advance to next phase
        const nextIndex = (currentPhaseIndex + 1) % currentTechnique.phases.length;
        const nextPhase = currentTechnique.phases[nextIndex].key;
        setPhase(nextPhase);
        setPhaseProgress(0);

        if (nextIndex === 0) {
          setCycleCount((c) => c + 1);
        }

        playBreathChime(nextPhase === 'inhale' ? 'inhale' : nextPhase === 'exhale' ? 'exhale' : 'hold');
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isOpen, isActive, phase, technique, currentPhaseConfig.duration, soundEnabled]);

  if (!isOpen) return null;

  // Scale factor calculation for breathing animation
  let scale = 1;
  if (phase === 'inhale') {
    scale = 1 + 0.28 * phaseProgress;
  } else if (phase === 'hold1') {
    scale = 1.28;
  } else if (phase === 'exhale') {
    scale = 1.28 - 0.28 * phaseProgress;
  } else {
    scale = 1;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#faf8f5] dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 relative max-h-[92vh] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">🫧</span>
              <h3 className="text-base font-bold font-serif">
                {foxName} 的舒緩引導呼吸
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                    : 'bg-stone-100 text-stone-400 dark:bg-stone-800'
                }`}
                title={soundEnabled ? '提示音已開啟' : '提示音已靜音'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Technique Selector */}
          <div className="flex items-center justify-center gap-2 my-4">
            <button
              type="button"
              onClick={() => {
                setTechnique('box');
                setPhase('inhale');
                setPhaseProgress(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                technique === 'box'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              4-4-4-4 箱式冥想
            </button>
            <button
              type="button"
              onClick={() => {
                setTechnique('relax478');
                setPhase('inhale');
                setPhaseProgress(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                technique === 'relax478'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              4-7-8 深度安眠
            </button>
          </div>

          {/* Central Breathing Ring & Animated Fox */}
          <div className="py-8 flex flex-col items-center justify-center relative min-h-[300px]">
            {/* Outer Expanding Breath Rings */}
            <motion.div
              style={{ scale }}
              className="w-56 h-56 rounded-full bg-gradient-to-tr from-amber-200/50 via-rose-100/40 to-sky-100/50 dark:from-amber-950/40 dark:via-rose-950/30 dark:to-sky-950/40 absolute flex items-center justify-center shadow-xl backdrop-blur-xs transition-transform duration-100 ease-out"
            >
              <div className="w-44 h-44 rounded-full border-2 border-dashed border-amber-400/40 dark:border-amber-600/40 animate-spin-slow" />
            </motion.div>

            {/* Inner Sleeping/Breathing Fox */}
            <motion.div
              style={{ scale: 0.95 + 0.15 * (scale - 1) }}
              className="z-10 flex flex-col items-center select-none"
            >
              <div className="text-7xl filter drop-shadow-md">
                {phase === 'inhale' ? '🦊✨' : phase === 'exhale' ? '🦊💨' : '🦊💤'}
              </div>
              <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mt-2">
                {foxName} 正伴隨你的節奏深呼吸...
              </div>
            </motion.div>

            {/* Bubble floating particles during exhale */}
            {phase === 'exhale' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: [0, 0.8, 0], y: -40, scale: 1.2 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-12 text-2xl"
              >
                🫧
              </motion.div>
            )}
          </div>

          {/* Current Phase Prompt Card */}
          <div className="text-center space-y-2 px-4 py-3 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700 shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-xs font-bold font-serif">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentPhaseConfig.label}</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 ml-1">
                ({Math.ceil(currentPhaseConfig.duration * (1 - phaseProgress))}s)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-sm mx-auto font-sans">
              {currentPhaseConfig.prompt}
            </p>
          </div>

          {/* Bottom Controls */}
          <div className="mt-5 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1 font-medium">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>
                已完成 <strong className="text-stone-800 dark:text-stone-100 font-bold">{cycleCount}</strong> 個呼吸循環
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-700 dark:text-stone-200 font-medium cursor-pointer"
              >
                {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isActive ? '暫停' : '繼續'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPhase('inhale');
                  setPhaseProgress(0);
                  setCycleCount(0);
                }}
                className="p-1.5 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-700 dark:text-stone-200 cursor-pointer"
                title="重新計時"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

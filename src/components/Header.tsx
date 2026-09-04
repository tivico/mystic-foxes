import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HelpCircle, Compass, Volume2, VolumeX, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenQuiz: () => void;
  onOpenCrystalBall: () => void;
  totalPetCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuiz,
  onOpenCrystalBall,
  totalPetCount,
}) => {
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Play a soft natural ambient chime using Web Audio
  const toggleAmbientSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();

      // Play soft Pentatonic wind chime sequence
      const notes = [523.25, 587.33, 659.25, 783.99, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + idx * 0.12 + 0.8
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.9);
      });

      setIsAmbientPlaying(true);
      setTimeout(() => setIsAmbientPlaying(false), 1400);
    } catch {
      setIsAmbientPlaying(false);
    }
  };

  return (
    <header className="relative w-full overflow-hidden border-b border-amber-100 bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-transparent">
      {/* Decorative whimsical background elements */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 left-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-10 right-1/4 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Main Logo & Identity */}
          <div className="text-center md:text-left space-y-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold"
            >
              <span className="text-sm">✦</span>
              <span>森之冒險者手冊 · 奇幻生態圖鑑</span>
              <span className="text-amber-600">|</span>
              <span className="text-amber-700 font-normal">
                已累計摸摸 {totalPetCount} 次
              </span>
            </motion.div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <motion.div
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-md shadow-orange-500/20 cursor-pointer"
              >
                🦊
              </motion.div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
                  奇幻狐狸生態圖鑑
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  探索真實荒野與神話秘境的超萌狐狸物種與被動習性
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Guardian Quiz Button */}
            <motion.button
              type="button"
              id="header-quiz-btn"
              onClick={onOpenQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
              <span>測測你的守護狐</span>
            </motion.button>

            {/* Crystal Ball Button */}
            <motion.button
              type="button"
              id="header-crystal-ball-btn"
              onClick={onOpenCrystalBall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold shadow-2xs hover:shadow-sm transition-colors cursor-pointer"
            >
              <span className="text-sm">🔮</span>
              <span>冷知識水晶球</span>
            </motion.button>

            {/* Ambient Sound Button */}
            <motion.button
              type="button"
              id="header-sound-btn"
              aria-label="播放森林風鈴聲"
              onClick={toggleAmbientSound}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-2xl border text-xs font-medium transition-colors cursor-pointer ${
                isAmbientPlaying
                  ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-inner'
                  : 'bg-white hover:bg-stone-50 text-stone-600 border-stone-200'
              }`}
              title="聆聽森林清晨風鈴聲"
            >
              {isAmbientPlaying ? (
                <Volume2 className="w-4 h-4 text-amber-600 animate-bounce" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-400" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

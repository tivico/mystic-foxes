import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ColdFact } from '../types';
import { COLD_FACTS } from '../data/foxesData';
import { X, Sparkles, RefreshCw, Star } from 'lucide-react';

interface CrystalBallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFoxByName: (name: string) => void;
}

export const CrystalBallModal: React.FC<CrystalBallModalProps> = ({
  isOpen,
  onClose,
  onViewFoxByName,
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isDivining, setIsDivining] = useState(false);

  const currentFact: ColdFact = COLD_FACTS[currentFactIndex];

  const rollNewFact = () => {
    setIsDivining(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * COLD_FACTS.length);
      if (nextIndex === currentFactIndex) {
        nextIndex = (currentFactIndex + 1) % COLD_FACTS.length;
      }
      setCurrentFactIndex(nextIndex);
      setIsDivining(false);
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="crystal-ball-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            id="crystal-ball-modal"
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-gradient-to-b from-indigo-950 via-purple-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-purple-400/30 overflow-hidden text-center z-10"
          >
            {/* Background glow effects */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-20 -left-20 w-52 h-52 bg-purple-500/30 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-20 -right-20 w-52 h-52 bg-pink-500/30 rounded-full blur-3xl pointer-events-none"
            />

            {/* Close Button */}
            <motion.button
              type="button"
              aria-label="關閉水晶球"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2 text-purple-200/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>森林占星術 · 狐狸冷知識水晶球</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-yellow-100">
              每日一狐魔法冷知識
            </h3>
            <p className="text-xs text-purple-200/80 mt-1">
              搖一搖神秘的水晶球，看看森林精靈們藏了什麼不可思議的祕密！
            </p>

            {/* Interactive Glowing Floating Crystal Ball with Motion */}
            <div className="my-6 flex justify-center">
              <motion.button
                type="button"
                onClick={rollNewFact}
                disabled={isDivining}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                animate={
                  isDivining
                    ? {
                        rotate: [-12, 12, -8, 8, -4, 4, 0],
                        scale: [1, 1.12, 0.95, 1],
                      }
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={
                  isDivining
                    ? { duration: 0.45 }
                    : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                }
                className="relative group cursor-pointer p-4 rounded-full"
                title="點擊水晶球換一則冷知識"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-400 p-1 shadow-[0_0_50px_rgba(168,85,247,0.6)] flex items-center justify-center relative overflow-hidden">
                  {/* Inner Reflections */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/40" />
                  <div className="relative text-center z-10">
                    <motion.span
                      key={currentFact.tagEmoji}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="text-4xl sm:text-5xl block"
                    >
                      {currentFact.tagEmoji}
                    </motion.span>
                    <span className="text-[10px] text-purple-100/90 font-bold tracking-wider mt-1 block">
                      TAP TO SHAKE
                    </span>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Revealed Fact Card with animated entrance */}
            <motion.div
              key={currentFact.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-purple-300/30 text-left"
            >
              <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-800/60 font-medium">
                  #{currentFact.category}
                </span>
                <span className="font-semibold text-amber-300">
                  主角：{currentFact.foxName}
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-serif mb-2 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{currentFact.title}</span>
              </h4>

              <p className="text-sm text-purple-100/90 leading-relaxed font-light">
                {currentFact.fact}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onViewFoxByName(currentFact.foxName);
                    onClose();
                  }}
                  className="text-xs text-yellow-300 hover:text-yellow-200 underline font-medium cursor-pointer"
                >
                  深入查閱 {currentFact.foxName} 檔案 →
                </button>

                <motion.button
                  type="button"
                  onClick={rollNewFact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center gap-1 text-xs px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors cursor-pointer shadow-sm"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isDivining ? 'animate-spin' : ''}`}
                  />
                  <span>換下一則</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

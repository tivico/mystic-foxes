import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FoxSpecies } from '../types';
import { QUIZ_QUESTIONS, FOX_SPECIES_LIST } from '../data/foxesData';
import { FoxIllustration } from './FoxIllustration';
import confetti from 'canvas-confetti';
import { X, Sparkles, RefreshCw, CheckCircle2, ArrowRight, Heart } from 'lucide-react';

interface FoxQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFox: (fox: FoxSpecies) => void;
}

export const FoxQuizModal: React.FC<FoxQuizModalProps> = ({
  isOpen,
  onClose,
  onViewFox,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [resultFox, setResultFox] = useState<FoxSpecies | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (targetFoxId: string) => {
    const updated = [...selectedAnswers, targetFoxId];
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate top matched fox
      const counts: Record<string, number> = {};
      updated.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });

      let highestCount = 0;
      let matchedId = updated[updated.length - 1]; // fallback to last choice
      Object.entries(counts).forEach(([id, cnt]) => {
        if (cnt > highestCount) {
          highestCount = cnt;
          matchedId = id;
        }
      });

      const matchedFox =
        FOX_SPECIES_LIST.find((f) => f.id === matchedId) || FOX_SPECIES_LIST[0];
      setResultFox(matchedFox);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#f97316', '#fbbf24', '#c084fc', '#38bdf8', '#f43f5e'],
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultFox(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="fox-quiz-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="fox-quiz-modal"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-100 overflow-hidden text-stone-800 my-auto z-10"
          >
            {/* Close Button */}
            <motion.button
              type="button"
              aria-label="關閉測驗"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {!resultFox ? (
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>森林靈魂占卜</span>
                  </span>
                  <span className="text-xs text-stone-500 font-mono font-semibold">
                    問題 {currentStep + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-1.5 bg-stone-100 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>

                {/* Animated Question Transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-6 text-left">
                      <span className="text-xs text-amber-600 font-bold uppercase tracking-wider block mb-1">
                        {currentQuestion.context}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900 leading-snug">
                        {currentQuestion.question}
                      </h3>
                    </div>

                    {/* Options List */}
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt, idx) => (
                        <motion.button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(opt.targetFoxId)}
                          whileHover={{ scale: 1.015, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200/80 hover:border-amber-300 text-left transition-colors group flex items-start gap-3.5 hover:shadow-sm cursor-pointer"
                        >
                          <span className="text-2xl p-2 bg-white rounded-xl shadow-2xs shrink-0 group-hover:scale-110 transition-transform">
                            {opt.icon}
                          </span>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-stone-800 group-hover:text-amber-900">
                              {opt.text}
                            </div>
                            <div className="text-xs text-stone-500 mt-0.5 group-hover:text-stone-600">
                              {opt.description}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-500 shrink-0 self-center group-hover:translate-x-1 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              /* Result Guardian Fox Reveal */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="text-center py-2"
              >
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-4">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>靈魂守護狐契約完成</span>
                </div>

                <div className="my-3 flex justify-center">
                  <div className="p-4 bg-gradient-to-b from-amber-50 to-orange-50/30 rounded-3xl border border-amber-200 shadow-sm relative">
                    <FoxIllustration foxId={resultFox.id} size="lg" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-2">
                  你是「{resultFox.name}」的靈魂夥伴！
                </h3>
                <p className="text-sm text-amber-700 font-medium mt-1">
                  {resultFox.subtitle}
                </p>

                <div className="my-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs sm:text-sm text-stone-700 leading-relaxed text-left">
                  <p className="font-semibold text-amber-900 mb-1">
                    🦊 守護狐的祝福與性格共鳴：
                  </p>
                  <p>
                    你的氣質與 {resultFox.name}{' '}
                    天然契合！就如同牠在{resultFox.habitatLabel}的生活態度一樣，你的特質中流淌著
                    {resultFox.personalityTraits.join('、')}。
                    生活裡的風雪或喧囂，都無法遮蔽你內心純粹靈動的本色。
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                  <motion.button
                    type="button"
                    onClick={() => {
                      onViewFox(resultFox);
                      onClose();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>查看 {resultFox.name} 完整檔案</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleRestart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>重新測驗</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

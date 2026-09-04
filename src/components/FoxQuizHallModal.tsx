import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FoxSpecies, QuizTabMode } from '../types';
import {
  PERSONALITY_QUIZ_QUESTIONS,
  TRIVIA_QUIZ_QUESTIONS,
  SILHOUETTE_QUIZ_QUESTIONS,
} from '../data/foxQuizData';
import { FOX_SPECIES_LIST } from '../data/foxesData';
import { FoxIllustration } from './FoxIllustration';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Coins,
  Brain,
  Search,
  Award,
  ChevronRight,
  HelpCircle,
  Flame,
} from 'lucide-react';

interface FoxQuizHallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFox: (fox: FoxSpecies) => void;
  onRewardCoins?: (coins: number) => void;
  initialTab?: QuizTabMode;
}

export const FoxQuizHallModal: React.FC<FoxQuizHallModalProps> = ({
  isOpen,
  onClose,
  onViewFox,
  onRewardCoins,
  initialTab = 'personality',
}) => {
  const [activeTab, setActiveTab] = useState<QuizTabMode>(initialTab);

  // ================= 1. Personality Quiz State =================
  const [personalityStep, setPersonalityStep] = useState(0);
  const [personalityAnswers, setPersonalityAnswers] = useState<string[]>([]);
  const [personalityResult, setPersonalityResult] = useState<FoxSpecies | null>(null);

  // ================= 2. Trivia Quiz State =================
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedTriviaOption, setSelectedTriviaOption] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaCoinsEarned, setTriviaCoinsEarned] = useState(0);
  const [triviaFinished, setTriviaFinished] = useState(false);
  const [triviaStreak, setTriviaStreak] = useState(0);

  // ================= 3. Silhouette Guess State =================
  const [silhouetteIndex, setSilhouetteIndex] = useState(0);
  const [selectedSilhouetteChoice, setSelectedSilhouetteChoice] = useState<string | null>(null);
  const [silhouetteRevealed, setSilhouetteRevealed] = useState(false);
  const [silhouetteScore, setSilhouetteScore] = useState(0);
  const [silhouetteFinished, setSilhouetteFinished] = useState(false);

  if (!isOpen) return null;

  // --- Handlers for Personality Mode ---
  const handleSelectPersonalityOption = (targetFoxId: string) => {
    const updated = [...personalityAnswers, targetFoxId];
    setPersonalityAnswers(updated);

    if (personalityStep < PERSONALITY_QUIZ_QUESTIONS.length - 1) {
      setPersonalityStep(personalityStep + 1);
    } else {
      const counts: Record<string, number> = {};
      updated.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });

      let highestCount = 0;
      let matchedId = updated[updated.length - 1];
      Object.entries(counts).forEach(([id, cnt]) => {
        if (cnt > highestCount) {
          highestCount = cnt;
          matchedId = id;
        }
      });

      const matchedFox =
        FOX_SPECIES_LIST.find((f) => f.id === matchedId) || FOX_SPECIES_LIST[0];
      setPersonalityResult(matchedFox);

      // Reward 50 coins on completing personality test
      if (onRewardCoins) {
        onRewardCoins(50);
      }

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f97316', '#fbbf24', '#c084fc', '#38bdf8', '#f43f5e'],
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleRestartPersonality = () => {
    setPersonalityStep(0);
    setPersonalityAnswers([]);
    setPersonalityResult(null);
  };

  // --- Handlers for Trivia Mode ---
  const currentTrivia = TRIVIA_QUIZ_QUESTIONS[triviaIndex];

  const handleSelectTriviaOption = (optionIndex: number) => {
    if (selectedTriviaOption !== null) return; // already answered
    setSelectedTriviaOption(optionIndex);

    const isCorrect = optionIndex === currentTrivia.correctIndex;
    if (isCorrect) {
      const newStreak = triviaStreak + 1;
      setTriviaStreak(newStreak);
      const bonus = newStreak > 2 ? 10 : 0;
      const earned = currentTrivia.rewardCoins + bonus;
      setTriviaScore((prev) => prev + 100);
      setTriviaCoinsEarned((prev) => prev + earned);
      if (onRewardCoins) onRewardCoins(earned);

      if (newStreak >= 3) {
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
        } catch {
          // Safe fallback
        }
      }
    } else {
      setTriviaStreak(0);
    }
  };

  const handleNextTrivia = () => {
    if (triviaIndex < TRIVIA_QUIZ_QUESTIONS.length - 1) {
      setTriviaIndex(triviaIndex + 1);
      setSelectedTriviaOption(null);
    } else {
      setTriviaFinished(true);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleRestartTrivia = () => {
    setTriviaIndex(0);
    setSelectedTriviaOption(null);
    setTriviaScore(0);
    setTriviaCoinsEarned(0);
    setTriviaFinished(false);
    setTriviaStreak(0);
  };

  // --- Handlers for Silhouette Mode ---
  const currentSilhouette = SILHOUETTE_QUIZ_QUESTIONS[silhouetteIndex];

  const handleSelectSilhouette = (choice: string) => {
    if (selectedSilhouetteChoice !== null) return;
    setSelectedSilhouetteChoice(choice);
    setSilhouetteRevealed(true);

    const isCorrect = choice === currentSilhouette.correctAnswer;
    if (isCorrect) {
      setSilhouetteScore((prev) => prev + 1);
      if (onRewardCoins) onRewardCoins(currentSilhouette.rewardCoins);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleNextSilhouette = () => {
    if (silhouetteIndex < SILHOUETTE_QUIZ_QUESTIONS.length - 1) {
      setSilhouetteIndex(silhouetteIndex + 1);
      setSelectedSilhouetteChoice(null);
      setSilhouetteRevealed(false);
    } else {
      setSilhouetteFinished(true);
    }
  };

  const handleRestartSilhouette = () => {
    setSilhouetteIndex(0);
    setSelectedSilhouetteChoice(null);
    setSilhouetteRevealed(false);
    setSilhouetteScore(0);
    setSilhouetteFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#1a1815] rounded-3xl shadow-2xl border border-amber-900/15 dark:border-amber-100/15 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header & Tab Navigation */}
        <div className="p-4 sm:p-5 border-b border-amber-900/10 dark:border-amber-100/10 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">⛩️</span>
              <div>
                <h2 className="font-serif font-black text-lg sm:text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span>靈狐試煉考堂</span>
                  <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs">
                    3種趣味玩法
                  </span>
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  探索內心守護神獸，挑戰科普趣味冷知識
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Categorized Tabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('personality')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'personality'
                  ? 'bg-white dark:bg-[#25221d] text-amber-900 dark:text-amber-200 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>命定守護靈狐</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('trivia')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'trivia'
                  ? 'bg-white dark:bg-[#25221d] text-amber-900 dark:text-amber-200 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Brain size={14} className="text-orange-500" />
              <span>生態知識擂台</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('silhouette')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'silhouette'
                  ? 'bg-white dark:bg-[#25221d] text-amber-900 dark:text-amber-200 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Search size={14} className="text-purple-500" />
              <span>剪影盲盒猜猜</span>
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* ================= MODE 1: PERSONALITY QUIZ ================= */}
          {activeTab === 'personality' && (
            <div>
              {!personalityResult ? (
                <div className="space-y-5">
                  {/* Progress Indicator */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
                      <span>
                        第 {personalityStep + 1} / {PERSONALITY_QUIZ_QUESTIONS.length} 題
                      </span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        心靈共鳴值{' '}
                        {Math.round(
                          ((personalityStep + 1) / PERSONALITY_QUIZ_QUESTIONS.length) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((personalityStep + 1) / PERSONALITY_QUIZ_QUESTIONS.length) * 100
                          }%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">
                      {PERSONALITY_QUIZ_QUESTIONS[personalityStep].context}
                    </span>
                    <h3 className="font-serif font-black text-lg sm:text-xl text-stone-900 dark:text-stone-100 pt-2 leading-relaxed">
                      {PERSONALITY_QUIZ_QUESTIONS[personalityStep].question}
                    </h3>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5 pt-2">
                    {PERSONALITY_QUIZ_QUESTIONS[personalityStep].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectPersonalityOption(opt.targetFoxId)}
                        className="w-full p-4 rounded-2xl text-left bg-stone-50 dark:bg-stone-800/60 hover:bg-amber-50/80 dark:hover:bg-amber-950/30 border border-stone-200/80 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-700 transition-all flex items-start gap-3.5 group cursor-pointer"
                      >
                        <span className="text-2xl shrink-0 p-2 rounded-xl bg-white dark:bg-stone-700 shadow-2xs group-hover:scale-110 transition-transform">
                          {opt.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-200 leading-snug">
                            {opt.text}
                          </div>
                          <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                            {opt.description}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Personality Result Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-5"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-bold">
                    <Sparkles size={14} className="text-amber-500" />
                    <span>測驗完成 · 你的命定守護神獸</span>
                  </div>

                  <div className="relative w-36 h-36 mx-auto rounded-3xl overflow-hidden border-4 border-amber-300 dark:border-amber-600 shadow-xl bg-gradient-to-b from-amber-50 to-orange-100 dark:from-stone-800 dark:to-stone-900">
                    <FoxIllustration foxId={personalityResult.id} alt={personalityResult.name} />
                  </div>

                  <div>
                    <h3 className="font-serif font-black text-2xl text-stone-900 dark:text-stone-100">
                      {personalityResult.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-0.5">
                      {personalityResult.scientificName}
                    </p>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mt-2 max-w-md mx-auto">
                      「{personalityResult.cuteQuote}」
                    </p>
                  </div>

                  {/* Trait Chips */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {personalityResult.personalityTraits.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold"
                      >
                        ✨ {t}
                      </span>
                    ))}
                  </div>

                  {/* Description Box */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 text-left text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-w-lg mx-auto">
                    <p className="font-bold text-stone-800 dark:text-stone-200 mb-1">
                      🌟 靈魂契合解讀：
                    </p>
                    {personalityResult.description}
                  </div>

                  {/* Reward Notice */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    <Coins size={14} className="text-amber-500" />
                    <span>完成測驗獎勵：已獲贈 +50 靈狐幣！</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleRestartPersonality}
                      className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw size={14} />
                      <span>重新測驗</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onViewFox(personalityResult);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/25 cursor-pointer"
                    >
                      <span>前往圖鑑查看詳情</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ================= MODE 2: TRIVIA KNOWLEDGE QUIZ ================= */}
          {activeTab === 'trivia' && (
            <div>
              {!triviaFinished ? (
                <div className="space-y-5">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-200 border border-orange-200">
                        {currentTrivia.category}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-mono">
                        難度: {currentTrivia.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold">
                      {triviaStreak >= 2 && (
                        <span className="flex items-center gap-1 text-rose-500 animate-pulse">
                          <Flame size={14} /> 連對 {triviaStreak} 題
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-amber-600 font-mono">
                        <Coins size={14} className="text-amber-500" />+{currentTrivia.rewardCoins}
                      </span>
                      <span className="text-stone-500 dark:text-stone-400">
                        {triviaIndex + 1} / {TRIVIA_QUIZ_QUESTIONS.length}
                      </span>
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="font-serif font-black text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-relaxed">
                    {currentTrivia.question}
                  </h3>

                  {/* 4 Options */}
                  <div className="space-y-2.5">
                    {currentTrivia.options.map((opt, idx) => {
                      const isSelected = selectedTriviaOption === idx;
                      const isAnswered = selectedTriviaOption !== null;
                      const isCorrectAnswer = idx === currentTrivia.correctIndex;

                      let btnStyle =
                        'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-300';
                      if (isAnswered) {
                        if (isCorrectAnswer) {
                          btnStyle =
                            'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-100 font-bold';
                        } else if (isSelected) {
                          btnStyle =
                            'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-100 line-through';
                        } else {
                          btnStyle =
                            'bg-stone-50/50 dark:bg-stone-800/30 border-stone-200/50 text-stone-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleSelectTriviaOption(idx)}
                          className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-stone-200/70 dark:bg-stone-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {['A', 'B', 'C', 'D'][idx]}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isAnswered && isCorrectAnswer && (
                            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrectAnswer && (
                            <XCircle size={18} className="text-rose-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Card (shows immediately after answering) */}
                  <AnimatePresence>
                    {selectedTriviaOption !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl border ${
                          selectedTriviaOption === currentTrivia.correctIndex
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200'
                            : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200'
                        } space-y-1.5`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-1 text-stone-900 dark:text-stone-100">
                            💡 靈狐小百科解密：
                          </span>
                          {selectedTriviaOption === currentTrivia.correctIndex ? (
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                              回答正確！+{currentTrivia.rewardCoins} 幣
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-rose-600">
                              很可惜答錯了，正確答案是【
                              {['A', 'B', 'C', 'D'][currentTrivia.correctIndex]}】
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                          {currentTrivia.explanation}
                        </p>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={handleNextTrivia}
                            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                          >
                            <span>
                              {triviaIndex < TRIVIA_QUIZ_QUESTIONS.length - 1
                                ? '下一題'
                                : '看闖關結算'}
                            </span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Trivia Complete Summary */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-5 py-4"
                >
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center text-4xl shadow-inner">
                    🎓
                  </div>

                  <div>
                    <h3 className="font-serif font-black text-2xl text-stone-900 dark:text-stone-100">
                      生態知識擂台 · 挑戰完成！
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      你已經順利通關了 12 道自然科學與神話古籍的靈狐試煉！
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
                      <div className="text-xs text-stone-500">總得分</div>
                      <div className="text-2xl font-black font-mono text-amber-700 dark:text-amber-300">
                        {triviaScore}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
                      <div className="text-xs text-stone-500">累計賺取靈狐幣</div>
                      <div className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1">
                        <Coins size={18} className="text-amber-500" />+{triviaCoinsEarned}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleRestartTrivia}
                      className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw size={14} />
                      <span>再次挑戰擂台</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ================= MODE 3: SILHOUETTE GUESSING GAME ================= */}
          {activeTab === 'silhouette' && (
            <div>
              {!silhouetteFinished ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-purple-700 dark:text-purple-300">
                      第 {silhouetteIndex + 1} / {SILHOUETTE_QUIZ_QUESTIONS.length} 隻盲盒
                    </span>
                    <span className="font-mono text-amber-600 flex items-center gap-1 font-bold">
                      <Coins size={14} className="text-amber-500" />+
                      {currentSilhouette.rewardCoins} 幣
                    </span>
                  </div>

                  {/* Silhouette Visual Card */}
                  <div className="relative w-40 h-40 mx-auto rounded-3xl overflow-hidden border-4 border-purple-200 dark:border-purple-800/40 bg-stone-900 flex items-center justify-center shadow-lg transition-all">
                    <div
                      className={`w-full h-full transition-all duration-700 ${
                        silhouetteRevealed
                          ? 'filter-none scale-100'
                          : 'filter brightness-0 contrast-200 blur-xs scale-95 opacity-80'
                      }`}
                    >
                      <FoxIllustration
                        foxId={currentSilhouette.foxId}
                        alt="Silhouette guessing target"
                      />
                    </div>

                    {!silhouetteRevealed && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-4xl animate-bounce">❓</span>
                      </div>
                    )}
                  </div>

                  {/* Clues Box */}
                  <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 space-y-2">
                    <div className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                      <Search size={14} />
                      <span>神秘線索提示：{currentSilhouette.hint}</span>
                    </div>
                    <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1 pl-4 list-disc">
                      {currentSilhouette.clues.map((clue, idx) => (
                        <li key={idx}>{clue}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 4 Choices */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentSilhouette.options.map((opt, idx) => {
                      const isAnswered = selectedSilhouetteChoice !== null;
                      const isCorrect = opt === currentSilhouette.correctAnswer;
                      const isChosen = opt === selectedSilhouetteChoice;

                      let style =
                        'bg-stone-50 dark:bg-stone-800/60 border-stone-200 hover:border-purple-300 text-stone-800 dark:text-stone-200';
                      if (isAnswered) {
                        if (isCorrect) {
                          style = 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-400 font-bold';
                        } else if (isChosen) {
                          style = 'bg-rose-100 dark:bg-rose-950/50 border-rose-400 line-through';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleSelectSilhouette(opt)}
                          className={`p-3.5 rounded-2xl border text-center text-xs font-bold transition-all cursor-pointer ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Result & Next button */}
                  {silhouetteRevealed && (
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        {selectedSilhouetteChoice === currentSilhouette.correctAnswer
                          ? '🎉 猜對了！真敏銳！'
                          : `解答：是【${currentSilhouette.correctAnswer}】哦！`}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextSilhouette}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {silhouetteIndex < SILHOUETTE_QUIZ_QUESTIONS.length - 1
                            ? '下一題'
                            : '完成結算'}
                        </span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Silhouette Finished */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4 py-6"
                >
                  <div className="text-4xl">🏆</div>
                  <h3 className="font-serif font-black text-xl text-stone-900 dark:text-stone-100">
                    剪影盲盒全數破解！
                  </h3>
                  <p className="text-xs text-stone-500">
                    答對 {silhouetteScore} / {SILHOUETTE_QUIZ_QUESTIONS.length} 隻
                  </p>
                  <button
                    type="button"
                    onClick={handleRestartSilhouette}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold cursor-pointer"
                  >
                    再玩一次剪影盲盒
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

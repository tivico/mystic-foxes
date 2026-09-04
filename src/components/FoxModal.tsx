import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FoxSpecies } from '../types';
import { FoxIllustration } from './FoxIllustration';
import { X, Volume2, Shield, Sparkles, Heart, Compass, Award, BookOpen } from 'lucide-react';

interface FoxModalProps {
  fox: FoxSpecies | null;
  onClose: () => void;
  onPet: (foxId: string) => void;
  petCount: number;
}

export const FoxModal: React.FC<FoxModalProps> = ({
  fox,
  onClose,
  onPet,
  petCount,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [pettingEffect, setPettingEffect] = useState(false);
  const [reactionQuote, setReactionQuote] = useState<string | null>(null);

  // Web Audio chime generator for interactive fox call
  const playCuteFoxChime = () => {
    if (!fox) return;
    try {
      setIsPlayingSound(true);
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();

      const baseFreq =
        fox.id === 'fennec-fox'
          ? 880
          : fox.id === 'tibetan-fox'
          ? 220
          : fox.id === 'starfall-fox'
          ? 659.25
          : 440;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type =
        fox.id === 'starfall-fox'
          ? 'sine'
          : fox.id === 'fennec-fox'
          ? 'triangle'
          : 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        baseFreq * 1.5,
        ctx.currentTime + 0.15
      );
      osc.frequency.exponentialRampToValueAtTime(
        baseFreq * 0.9,
        ctx.currentTime + 0.35
      );

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.55);

      setTimeout(() => {
        setIsPlayingSound(false);
      }, 600);
    } catch {
      setIsPlayingSound(false);
    }
  };

  const handlePetAction = () => {
    if (!fox) return;
    onPet(fox.id);
    setPettingEffect(true);

    const reactions = [
      `🥰 ${fox.name} 舒服地瞇起眼睛蹭了蹭你的手！`,
      `💕 ${fox.name} 開心地搖晃著蓬鬆的大尾巴！`,
      `✨ ${fox.name} 發出了滿足的咕嚕呼嚕聲～`,
      `🐾 ${fox.name} 輕輕用濕漉漉的小鼻子碰了碰你！`,
    ];
    setReactionQuote(reactions[Math.floor(Math.random() * reactions.length)]);

    setTimeout(() => {
      setPettingEffect(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {fox && (
        <div
          id="fox-detail-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Backdrop with Motion */}
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
            id="fox-detail-modal"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-gradient-to-b from-stone-50 to-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
          >
            {/* Header Ribbon & Close */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    fox.isEasterEgg
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : fox.category === 'mythical'
                      ? 'bg-purple-100 text-purple-800 border-purple-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {fox.isEasterEgg
                    ? '🥚 偽狐彩蛋專屬'
                    : fox.category === 'mythical'
                    ? '✨ 奇幻傳說靈獸'
                    : '🐾 自然野生狐屬'}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {fox.scientificName}
                </span>
              </div>

              <motion.button
                type="button"
                aria-label="關閉檔案"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* Top Showcase Banner with Illustration & Petting Interaction */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-stone-50 p-6 rounded-2xl border border-amber-100/90 relative">
                <div className="flex flex-col items-center">
                  <div
                    onClick={handlePetAction}
                    className="relative cursor-pointer group transition-transform active:scale-95"
                    title="點擊直接摸摸頭聽叫聲！"
                  >
                    <FoxIllustration foxId={fox.id} size="lg" isPetting={pettingEffect} />
                    <AnimatePresence>
                      {pettingEffect && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: -5, scale: 1 }}
                          exit={{ opacity: 0, y: -15, scale: 0.9 }}
                          className="absolute -top-3 right-0 flex items-center gap-1 bg-rose-500 text-white text-xs px-2.5 py-1 rounded-full shadow-lg pointer-events-none"
                        >
                          <Heart className="w-3.5 h-3.5 fill-white" />
                          <span>好舒服！</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Petting Button */}
                  <div className="mt-4 flex items-center gap-2">
                    <motion.button
                      type="button"
                      id="pet-fox-button"
                      onClick={handlePetAction}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold rounded-full shadow-sm hover:shadow cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>摸摸頭（已擼 {petCount} 次 · 點擊發聲 🔊）</span>
                    </motion.button>
                  </div>
                </div>

                {/* Fox Name & Quick Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-baseline justify-center sm:justify-start gap-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
                      {fox.name}
                    </h2>
                    <span className="text-sm text-stone-500 font-medium">
                      {fox.englishName}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-800 font-medium mt-1">
                    {fox.subtitle}
                  </p>

                  {fox.isEasterEgg && fox.easterEggNote && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-semibold flex items-center gap-1.5">
                      <span>💡</span>
                      <span>{fox.easterEggNote}</span>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {fox.personalityTraits.map((trait, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium shadow-2xs"
                      >
                        #{trait}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {reactionQuote && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 p-2.5 bg-white/90 border border-rose-200 text-rose-800 text-xs rounded-xl shadow-2xs"
                      >
                        {reactionQuote}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sound Button */}
                  <div className="mt-4 pt-3 border-t border-amber-200/50 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <motion.button
                      type="button"
                      id="play-fox-sound-button"
                      onClick={playCuteFoxChime}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        isPlayingSound
                          ? 'bg-amber-500 text-white border-amber-600 shadow-inner'
                          : 'bg-white hover:bg-amber-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      <Volume2
                        className={`w-4 h-4 ${isPlayingSound ? 'animate-bounce' : ''}`}
                      />
                      <span>叫聲模擬：{fox.vocalization.soundText}</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
                <h4 className="text-sm font-bold text-stone-800 flex items-center gap-2 mb-2 font-serif">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>生態概述</span>
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {fox.description}
                </p>
              </div>

              {/* Passive Ecological Skill */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2 font-serif">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <span>專屬生態被動技：{fox.passiveSkill.name}</span>
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-900 font-semibold">
                    {fox.passiveSkill.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {fox.passiveSkill.description}
                </p>
              </div>

              {/* Attributes & Stats Bars with Smooth Motion animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>能力雷達指標</span>
                  </h4>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-stone-600 mb-1">
                      <span>軟萌可愛度</span>
                      <span className="font-mono text-amber-700">
                        {fox.stats.cuteness}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fox.stats.cuteness}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-stone-600 mb-1">
                      <span>毛絨蓬鬆度</span>
                      <span className="font-mono text-amber-700">
                        {fox.stats.fluffiness}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fox.stats.fluffiness}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-stone-600 mb-1">
                      <span>敏捷反應度</span>
                      <span className="font-mono text-amber-700">
                        {fox.stats.agility}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fox.stats.agility}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-stone-600 mb-1">
                      <span>好奇心指數</span>
                      <span className="font-mono text-amber-700">
                        {fox.stats.curiosity}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fox.stats.curiosity}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  {fox.stats.magicPower && (
                    <div>
                      <div className="flex justify-between text-xs font-medium text-purple-700 mb-1">
                        <span>✨ 奇幻靈力蘊藏</span>
                        <span className="font-mono text-purple-700">
                          {fox.stats.magicPower}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${fox.stats.magicPower}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Field Notes & Size */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs space-y-3 text-xs">
                  <h4 className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    <span>生態檔案規格</span>
                  </h4>

                  <div className="space-y-2 text-stone-600">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">棲息環境</span>
                      <span className="font-medium text-stone-800">
                        {fox.habitatLabel}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">體型與體重</span>
                      <span className="font-medium text-stone-800">
                        {fox.sizeWeight}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-400">預估壽命</span>
                      <span className="font-medium text-stone-800">
                        {fox.lifespan}
                      </span>
                    </div>
                    <div className="flex flex-col py-1">
                      <span className="text-stone-400 mb-1">主要食性</span>
                      <span className="font-medium text-stone-800 bg-stone-50 p-2 rounded-lg leading-relaxed">
                        {fox.diet}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fun Facts List */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
                <h4 className="text-sm font-bold text-stone-800 flex items-center gap-2 mb-3 font-serif">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>你知道嗎？趣味生態冷知識</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {fox.funFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cute Quote */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/60 to-orange-100/40 border border-amber-200/80 text-center">
                <p className="text-xs sm:text-sm font-medium text-amber-900 italic font-serif">
                  {fox.cuteQuote}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

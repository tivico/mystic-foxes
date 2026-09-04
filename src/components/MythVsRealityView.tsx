import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MYTH_VS_REALITY_LIST } from '../data/mythVsRealityData';
import { MythVsRealityItem } from '../types';
import { Sparkles, BookOpen, Microscope, ArrowRight, Compass, Volume2 } from 'lucide-react';
import { playPettingSound } from '../utils/foxAudio';

interface MythVsRealityViewProps {
  onViewFoxByName?: (name: string) => void;
}

export const MythVsRealityView: React.FC<MythVsRealityViewProps> = ({
  onViewFoxByName,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(
    MYTH_VS_REALITY_LIST[0].id
  );

  const activeItem =
    MYTH_VS_REALITY_LIST.find((item) => item.id === selectedItemId) ||
    MYTH_VS_REALITY_LIST[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>特別專題 · 民俗傳說與生物演化對照手帳</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            傳說 vs 現實：神話面紗下的自然奇蹟
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            神話並非空穴來風，而是古人在晨昏幽光中，對狐狸不可思議的夜行光學、敏捷身姿與生存智慧最深情的詩意想像。
          </p>
        </div>

        {/* Quick Selection Navigation Chips */}
        <div className="mt-6 pt-4 border-t border-purple-700/50 flex flex-wrap gap-2">
          {MYTH_VS_REALITY_LIST.map((item) => {
            const isSelected = item.id === activeItem.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedItemId(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-stone-900 shadow-md shadow-amber-400/30 font-extrabold'
                    : 'bg-white/10 hover:bg-white/20 text-purple-100 border border-purple-400/30'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.mythName.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Comparison Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 dark:bg-stone-800/90 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-700 shadow-lg space-y-8 backdrop-blur-xs"
        >
          {/* Comparison Title & Subtitle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-700">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                <span className="text-xl">{activeItem.icon}</span>
                <span>深度解密專題</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                {activeItem.subtitle}
              </p>
            </div>

            {onViewFoxByName && (
              <button
                type="button"
                onClick={() => onViewFoxByName(activeItem.realName.split(' ')[0])}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-stone-700 hover:bg-amber-100 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-stone-600 transition-colors cursor-pointer shrink-0"
              >
                <span>在圖鑑查看此狐</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Two Columns: Myth vs Reality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Myth / Legend */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-50 via-pink-50/50 to-indigo-50/40 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-stone-900 border border-purple-200 dark:border-purple-800/60 space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>古老傳說 · 民俗文化</span>
                </div>
                <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                  {activeItem.mythCulture}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold font-serif text-purple-950 dark:text-purple-100">
                  {activeItem.mythName}
                </h4>
                <div className="mt-2 text-xs leading-relaxed text-purple-900/90 dark:text-purple-200/90 space-y-2">
                  <p>{activeItem.mythDescription}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-200/70 dark:border-purple-800/60">
                <div className="text-[11px] font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1">
                  <span>✨ 傳說神通技能：</span>
                </div>
                <p className="text-xs text-purple-950 dark:text-purple-200 font-medium mt-1">
                  {activeItem.mythSuperpower}
                </p>
              </div>
            </div>

            {/* Right Column: Science / Reality */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-sky-50/40 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-stone-900 border border-emerald-200 dark:border-emerald-800/60 space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>生物真相 · 科學鏡頭</span>
                </div>
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  動物學與演化適應
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold font-serif text-emerald-950 dark:text-emerald-100">
                  {activeItem.realName}
                </h4>
                <div className="mt-2 text-xs leading-relaxed text-emerald-900/90 dark:text-emerald-200/90 space-y-2">
                  <p>{activeItem.realFact}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-200/70 dark:border-emerald-800/60">
                <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <span>🔬 科學實證解析：</span>
                </div>
                <p className="text-xs text-emerald-950 dark:text-emerald-200 font-medium mt-1">
                  {activeItem.scientificExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* Key Comparisons Breakdown Table */}
          <div className="rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
            <div className="bg-stone-100 dark:bg-stone-700/60 px-4 py-2.5 font-bold text-xs text-stone-700 dark:text-stone-200 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>關鍵特徵深度對照表</span>
            </div>
            <div className="divide-y divide-stone-100 dark:divide-stone-700">
              {activeItem.keyComparison.map((comp, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-3 p-3 sm:p-4 gap-2 text-xs hover:bg-stone-50/80 dark:hover:bg-stone-750 transition-colors"
                >
                  <div className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{comp.feature}</span>
                  </div>
                  <div className="text-purple-900 dark:text-purple-300 bg-purple-50/60 dark:bg-purple-950/40 p-2 rounded-xl">
                    <strong className="block text-[10px] text-purple-600 dark:text-purple-400 font-mono mb-0.5">
                      【傳說描述】
                    </strong>
                    <span>{comp.legendSays}</span>
                  </div>
                  <div className="text-emerald-900 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 p-2 rounded-xl">
                    <strong className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mb-0.5">
                      【科學本質】
                    </strong>
                    <span>{comp.scienceSays}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Insight Callout */}
          <div className="rounded-2xl p-4 bg-amber-50/80 dark:bg-stone-750 border border-amber-200/80 dark:border-amber-900/40 flex items-start gap-3">
            <div className="text-xl shrink-0">💡</div>
            <div>
              <h5 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                人類學與民俗洞察 (Anthropological Insight)
              </h5>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                {activeItem.culturalInsight}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

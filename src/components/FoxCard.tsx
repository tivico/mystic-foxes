import React from 'react';
import { motion } from 'motion/react';
import { FoxSpecies } from '../types';
import { FoxIllustration } from './FoxIllustration';
import { Sparkles, Heart, Shield, ArrowRight } from 'lucide-react';

interface FoxCardProps {
  fox: FoxSpecies;
  onSelect: (fox: FoxSpecies) => void;
  onQuickPet: (foxId: string, event: React.MouseEvent) => void;
}

export const FoxCard: React.FC<FoxCardProps> = ({ fox, onSelect, onQuickPet }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      id={`fox-card-${fox.id}`}
      onClick={() => onSelect(fox)}
      className="group relative bg-white/95 rounded-3xl p-5 shadow-xs hover:shadow-xl border border-amber-100/90 hover:border-amber-300 transition-shadow duration-300 flex flex-col cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      {/* Subtle background glow */}
      <div
        className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${fox.themeColor} opacity-10 group-hover:opacity-30 transition-opacity duration-300 blur-2xl pointer-events-none`}
      />

      {/* Top Header Tags */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
            fox.isEasterEgg
              ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
              : fox.category === 'mythical'
              ? 'bg-purple-100 text-purple-700 border-purple-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          {fox.isEasterEgg
            ? '🥚 偽狐彩蛋'
            : fox.category === 'mythical'
            ? '✨ 傳說神獸'
            : '🐾 自然野生'}
        </span>
        <span className="text-xs text-stone-500 font-mono tracking-tight">
          {fox.habitatLabel.split('/')[0]}
        </span>
      </div>

      {/* Central Illustration Display */}
      <div className="relative my-2 py-4 flex flex-col items-center justify-center bg-gradient-to-b from-amber-50/60 to-orange-50/20 rounded-2xl border border-amber-50/80 group-hover:bg-amber-50/90 transition-colors">
        <FoxIllustration foxId={fox.id} size="md" />

        {/* Quick Pet Button with Motion & Sound feedback */}
        <motion.button
          type="button"
          aria-label={`摸摸${fox.name}聽叫聲`}
          onClick={(e) => {
            e.stopPropagation();
            onQuickPet(fox.id, e);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
          className="absolute bottom-2 right-2 px-2.5 py-1 bg-white/95 hover:bg-rose-50 text-stone-600 hover:text-rose-500 rounded-full shadow-sm border border-stone-200/80 hover:border-rose-300 transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer z-10"
          title={`摸摸${fox.name}聽叫聲！`}
        >
          <Heart className="w-3.5 h-3.5 fill-rose-100 text-rose-500" />
          <span>摸摸 🔊</span>
        </motion.button>
      </div>

      {/* Title & Subtitle */}
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-700 transition-colors font-serif">
            {fox.name}
          </h3>
          <span className="text-xs text-stone-400 font-mono">
            {fox.englishName}
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1 line-clamp-1 font-medium">
          {fox.subtitle}
        </p>
      </div>

      {/* Personality Traits Chips */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 my-3">
        {fox.personalityTraits.slice(0, 3).map((trait, idx) => (
          <span
            key={idx}
            className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-normal"
          >
            #{trait}
          </span>
        ))}
      </div>

      {/* Passive Skill Highlight */}
      <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-1.5 truncate">
          <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="truncate font-medium text-stone-700">
            {fox.passiveSkill.name.split(' ')[0]}
          </span>
        </div>
        <div className="flex items-center gap-1 text-amber-600 font-medium group-hover:translate-x-1 transition-transform shrink-0">
          <span>檔案</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
};

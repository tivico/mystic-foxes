import React from 'react';
import { motion } from 'motion/react';
import { HabitatType, FoxCategory } from '../types';
import { FOX_HABITATS } from '../data/foxesData';
import { Search, X, Sparkles, Filter } from 'lucide-react';

interface HabitatFilterProps {
  selectedHabitat: HabitatType;
  onSelectHabitat: (habitat: HabitatType) => void;
  selectedCategory: FoxCategory;
  onSelectCategory: (cat: FoxCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const HabitatFilter: React.FC<HabitatFilterProps> = ({
  selectedHabitat,
  onSelectHabitat,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="w-full space-y-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-amber-100 shadow-sm">
      {/* Search & Category Tabs */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="fox-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜尋狐狸名字、習性、被動技能或特徵..."
            className="w-full pl-10 pr-9 py-2.5 bg-stone-50 hover:bg-stone-100/80 focus:bg-white text-stone-800 text-sm rounded-2xl border border-stone-200 focus:border-amber-400 focus:outline-none transition-all placeholder:text-stone-400"
          />
          {searchQuery && (
            <motion.button
              type="button"
              aria-label="清除搜尋"
              onClick={() => onSearchChange('')}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Category Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-2xl border border-stone-200/80 w-full sm:w-auto justify-center">
          <motion.button
            type="button"
            onClick={() => onSelectCategory('all')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-stone-800 shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            全部界域
          </motion.button>
          <motion.button
            type="button"
            onClick={() => onSelectCategory('real')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'real'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>🐾 自然野生</span>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => onSelectCategory('mythical')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'mythical'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>✨ 奇幻傳說</span>
          </motion.button>
        </div>
      </div>

      {/* Habitat Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
        <span className="text-xs font-bold text-stone-400 flex items-center gap-1 shrink-0 pl-1">
          <Filter className="w-3.5 h-3.5" />
          <span>生態環境：</span>
        </span>
        {FOX_HABITATS.map((habitat) => {
          const isSelected = selectedHabitat === habitat.id;
          return (
            <motion.button
              key={habitat.id}
              type="button"
              id={`habitat-pill-${habitat.id}`}
              onClick={() => onSelectHabitat(habitat.id as HabitatType)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm font-semibold'
                  : 'bg-stone-50 hover:bg-amber-50 text-stone-600 hover:text-amber-800 border-stone-200'
              }`}
            >
              <span>{habitat.icon}</span>
              <span>{habitat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
                    ? 'bg-amber-600 text-amber-100'
                    : 'bg-stone-200/70 text-stone-600'
                }`}
              >
                {habitat.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

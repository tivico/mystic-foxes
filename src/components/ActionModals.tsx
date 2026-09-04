import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  GARDEN_SNACKS,
  FOX_ACCESSORIES,
  ADVENTURE_LOCATIONS,
} from '../data/petGameData';
import { FoxAccessory, FoxEvolutionStage, GardenSnackItem } from '../types';
import { FoxIllustration } from './FoxIllustration';
import { X, Sparkles, Compass, Camera, Heart, Check, Download } from 'lucide-react';

/* ---------------- 1. 投餵美食彈窗 ---------------- */
interface FeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeed: (snack: GardenSnackItem) => void;
}

export const FeedModal: React.FC<FeedModalProps> = ({ isOpen, onClose, onFeed }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100 space-y-4 relative"
      >
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍙</span>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">投餵美味餐點</h3>
              <p className="text-xs text-stone-500">挑選一道狐狸的最愛，恢復飽食度與精力！</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GARDEN_SNACKS.map((snack) => (
            <motion.button
              key={snack.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onFeed(snack);
                onClose();
              }}
              className="p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/80 text-left flex flex-col justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl group-hover:scale-125 transition-transform">{snack.emoji}</span>
                <span className="text-xs font-bold text-stone-800">{snack.name}</span>
              </div>
              <p className="text-[11px] text-stone-500 line-clamp-2">{snack.desc}</p>
              <span className="mt-2 text-[10px] font-semibold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md inline-block">
                {snack.attractionBonus}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- 2. 後山秘境探險彈窗 ---------------- */
interface AdventureModalProps {
  isOpen: boolean;
  onClose: () => void;
  foxLevel: number;
  onStartAdventure: (location: (typeof ADVENTURE_LOCATIONS)[0]) => void;
}

export const AdventureModal: React.FC<AdventureModalProps> = ({
  isOpen,
  onClose,
  foxLevel,
  onStartAdventure,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-amber-100 space-y-4 relative"
      >
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌲</span>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">後山秘境散步探險</h3>
              <p className="text-xs text-stone-500">放小狐狸前往森林探索，帶回奇妙寶物與冒險日記！</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {ADVENTURE_LOCATIONS.map((loc) => {
            const isUnlocked = foxLevel >= loc.minLevel;
            return (
              <div
                key={loc.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/50 border-amber-200/90 hover:bg-amber-50'
                    : 'bg-stone-100/70 border-stone-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-white shadow-2xs border border-amber-100">
                      {loc.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900">{loc.name}</h4>
                        {!isUnlocked && (
                          <span className="text-[10px] bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full font-bold">
                            需等級 Lv.{loc.minLevel} 解鎖
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5">{loc.desc}</p>
                      <div className="flex flex-wrap gap-1 mt-2 text-[10px] text-amber-800">
                        <span className="font-semibold text-stone-500">可能尋獲：</span>
                        {loc.treasures.slice(0, 3).join(' · ')}
                      </div>
                    </div>
                  </div>

                  {isUnlocked && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onStartAdventure(loc);
                        onClose();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer shrink-0"
                    >
                      出發探險 🧭
                    </motion.button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- 3. 飾品更衣室彈窗 ---------------- */
interface DressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccessoryId?: string;
  onSelectAccessory: (acc: FoxAccessory) => void;
}

export const DressModal: React.FC<DressModalProps> = ({
  isOpen,
  onClose,
  currentAccessoryId = 'none',
  onSelectAccessory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100 space-y-4 relative"
      >
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎀</span>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">萌狐專屬衣櫥裝扮</h3>
              <p className="text-xs text-stone-500">選擇一件可愛飾品，立即為小狐狸換上！</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {FOX_ACCESSORIES.map((acc) => {
            const isEquipped = (currentAccessoryId || 'none') === acc.id;
            return (
              <motion.button
                key={acc.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onSelectAccessory(acc);
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  isEquipped
                    ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-400/40'
                    : 'bg-stone-50 hover:bg-amber-50/60 border-stone-200'
                }`}
              >
                <span className="text-2xl p-1.5 rounded-xl bg-white shadow-2xs shrink-0">{acc.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{acc.name}</span>
                    {isEquipped && <Check className="w-4 h-4 text-amber-700" />}
                  </div>
                  <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">{acc.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- 4. 拍立得手帳與寫真彈窗 ---------------- */
interface SnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  foxName: string;
  speciesId: string;
  stage: FoxEvolutionStage;
  accessoryId?: string;
  snapshots: {
    id: string;
    date: string;
    title: string;
    note: string;
    stage: FoxEvolutionStage;
  }[];
}

export const SnapshotModal: React.FC<SnapshotModalProps> = ({
  isOpen,
  onClose,
  foxName,
  speciesId,
  stage,
  accessoryId,
  snapshots,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-amber-100 space-y-4 relative max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">萌狐拍立得寫真手帳</h3>
              <p className="text-xs text-stone-500">記錄小狐狸成長點滴的拍立得照片集（已收錄 {snapshots.length} 張）</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {snapshots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {snapshots.map((snap) => (
                <div
                  key={snap.id}
                  className="bg-[#fcfbf9] p-3 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col items-center rotate-[-1deg] hover:rotate-0 transition-transform"
                >
                  <div className="w-full aspect-square bg-stone-100 rounded-xl overflow-hidden flex items-center justify-center relative p-2">
                    <FoxIllustration foxId={speciesId} size="md" stage={snap.stage} accessoryId={accessoryId} />
                    <span className="absolute top-2 right-2 text-xs bg-white/90 px-2 py-0.5 rounded-md font-bold text-stone-600 shadow-2xs">
                      {snap.stage === 'mystic' ? '✨ 仙靈' : snap.stage === 'baby' ? '🍼 幼崽' : '🦊 成狐'}
                    </span>
                  </div>
                  <div className="w-full text-center mt-2.5 space-y-1">
                    <h5 className="text-xs font-bold text-stone-800 font-serif">{snap.title}</h5>
                    <p className="text-[10px] text-stone-500 italic">「{snap.note}」</p>
                    <span className="text-[9px] text-stone-400 block">{snap.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 space-y-2 text-stone-400">
              <Camera className="w-10 h-10 mx-auto text-stone-300" />
              <p className="text-xs">還沒有拍過立可得照片喔！點擊右側「📸 拍立得合影」即可隨時拍一張！</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- 5. 形態進化突破慶祝彈窗 ---------------- */
interface EvolutionCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  foxName: string;
  speciesId: string;
  stage: FoxEvolutionStage;
  accessoryId?: string;
}

export const EvolutionCelebrationModal: React.FC<EvolutionCelebrationModalProps> = ({
  isOpen,
  onClose,
  foxName,
  speciesId,
  stage,
  accessoryId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-amber-300 text-center space-y-6 relative overflow-hidden"
      >
        {/* Confetti Aura */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-yellow-300/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-orange-400/30 rounded-full blur-2xl" />

        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
            <span>形態覺醒 · 突破進化！</span>
          </span>
          <h2 className="text-2xl font-black text-stone-900 font-serif">
            {stage === 'mystic' ? '✨ 仙靈九天神狐覺醒！' : '🦊 茁壯成狐晉升！'}
          </h2>
          <p className="text-xs text-stone-600">
            {foxName} 在你的悉心照料下吸收天地靈氣，形態產生了不可思議的蛻變！
          </p>
        </div>

        <div className="py-4 flex justify-center relative z-10">
          <FoxIllustration foxId={speciesId} size="lg" stage={stage} accessoryId={accessoryId} />
        </div>

        <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 text-xs text-stone-700 space-y-1 relative z-10">
          <p className="font-bold text-amber-900">
            {stage === 'mystic' ? '解鎖特權：星宿神環光環 · 靈力上限翻倍' : '解鎖特權：體力上限提升 · 後山高等冒險'}
          </p>
          <p className="text-stone-500">繼續與小狐狸摸摸、玩耍，共同書寫專屬的森林傳奇吧！</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg cursor-pointer relative z-10"
        >
          太棒了！摸摸慶祝 ✨
        </button>
      </motion.div>
    </div>
  );
};

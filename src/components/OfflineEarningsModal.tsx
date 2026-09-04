import React from 'react';
import { motion } from 'motion/react';
import { Coins, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playBlessingSound } from '../utils/foxAudio';
import { FoxIllustration } from './FoxIllustration';

interface OfflineEarningsModalProps {
  isOpen: boolean;
  onClaim: () => void;
  coinsEarned: number;
  formattedDuration: string;
}

export const OfflineEarningsModal: React.FC<OfflineEarningsModalProps> = ({
  isOpen,
  onClaim,
  coinsEarned,
  formattedDuration,
}) => {
  if (!isOpen || coinsEarned <= 0) return null;

  const handleClaimReward = () => {
    playBlessingSound();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
    });
    onClaim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-amber-200 dark:border-stone-800 text-center space-y-5"
      >
        <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-100 dark:bg-amber-900/30 rounded-full animate-ping opacity-25" />
          <FoxIllustration foxId="red-fox" size="md" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>悠閒離線收益結算</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            歡迎回到靈狐庭院！
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            你暫時離開了約 <strong className="text-stone-800 dark:text-stone-200">{formattedDuration}</strong>。在溫暖的陽光與微風中，訪客狐狸們為你收集了滿滿心意！
          </p>
        </div>

        {/* Big Reward Display */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center gap-2">
          <Coins className="w-6 h-6 text-amber-600 animate-bounce" />
          <span className="text-2xl font-black text-amber-900 dark:text-amber-300">
            +{coinsEarned} 靈狐金幣
          </span>
        </div>

        <button
          onClick={handleClaimReward}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>收下狐狸的謝禮 🐾</span>
        </button>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';

interface FoxLoadingScreenProps {
  message?: string;
}

export const FoxLoadingScreen: React.FC<FoxLoadingScreenProps> = ({
  message = '小狐狸正輕快奔馳前往中...',
}) => {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center space-y-4">
      {/* Running Fox Animation Frame */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Glowing halo */}
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-amber-200 dark:bg-amber-900/40 rounded-full blur-md"
        />

        {/* Animated Bouncing Fox */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-5xl select-none relative z-10 filter drop-shadow-md"
        >
          🦊
        </motion.div>

        {/* Floating Paw Prints */}
        <motion.span
          animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute -bottom-1 text-sm select-none"
        >
          🐾
        </motion.span>
      </div>

      <div className="space-y-1 text-center">
        <p className="text-sm font-bold text-stone-800 dark:text-stone-200 font-serif">
          {message}
        </p>
        <div className="flex items-center justify-center gap-1">
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-1.5 h-1.5 rounded-full bg-amber-500"
          />
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-amber-500"
          />
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-1.5 h-1.5 rounded-full bg-amber-500"
          />
        </div>
      </div>
    </div>
  );
};

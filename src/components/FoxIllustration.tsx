import React from 'react';
import { motion } from 'motion/react';
import cuteRedFox from '../assets/images/cute_red_fox_1788489051699.jpg';
import cuteArcticFox from '../assets/images/cute_arctic_fox_1788489071384.jpg';
import cuteFennecFox from '../assets/images/cute_fennec_fox_1788489092812.jpg';
import cuteTibetanFox from '../assets/images/cute_tibetan_fox_1788489111232.jpg';
import cuteGrayFox from '../assets/images/cute_gray_fox_1788489130744.jpg';
import cuteBatearedFox from '../assets/images/cute_bateared_fox_1788489147895.jpg';
import cuteStarfallFox from '../assets/images/cute_starfall_fox_1788489167289.jpg';
import cuteCelestialKitsune from '../assets/images/cute_celestial_kitsune_1788489186013.jpg';

interface FoxIllustrationProps {
  foxId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isPetting?: boolean;
}

const FOX_IMAGE_MAP: Record<
  string,
  {
    src: string;
    alt: string;
    ringColor: string;
    shadowColor: string;
    badge: string;
    isMythical?: boolean;
  }
> = {
  'red-fox': {
    src: cuteRedFox,
    alt: '赤狐 3D 卡通立體肖像',
    ringColor: 'ring-orange-300/80',
    shadowColor: 'shadow-orange-500/25',
    badge: '🦊',
  },
  'arctic-fox': {
    src: cuteArcticFox,
    alt: '北極狐雪球 3D 卡通立體肖像',
    ringColor: 'ring-sky-300/80',
    shadowColor: 'shadow-sky-500/25',
    badge: '❄️',
  },
  'fennec-fox': {
    src: cuteFennecFox,
    alt: '耳廓狐大雷達耳 3D 卡通立體肖像',
    ringColor: 'ring-amber-300/80',
    shadowColor: 'shadow-amber-500/25',
    badge: '👂',
  },
  'tibetan-fox': {
    src: cuteTibetanFox,
    alt: '藏狐厭世方臉 3D 卡通立體肖像',
    ringColor: 'ring-stone-400/80',
    shadowColor: 'shadow-stone-700/25',
    badge: '😐',
  },
  'gray-fox': {
    src: cuteGrayFox,
    alt: '灰狐樹棲忍者 3D 卡通立體肖像',
    ringColor: 'ring-emerald-400/80',
    shadowColor: 'shadow-emerald-600/25',
    badge: '🌲',
  },
  'bat-eared-fox': {
    src: cuteBatearedFox,
    alt: '大耳狐黑眼罩 3D 卡通立體肖像',
    ringColor: 'ring-amber-400/80',
    shadowColor: 'shadow-amber-700/25',
    badge: '🦇',
  },
  'starfall-fox': {
    src: cuteStarfallFox,
    alt: '星月夜狐奇幻星塵 3D 卡通立體肖像',
    ringColor: 'ring-purple-400/90',
    shadowColor: 'shadow-purple-600/35',
    badge: '✨',
    isMythical: true,
  },
  'celestial-kitsune': {
    src: cuteCelestialKitsune,
    alt: '九尾仙狐祥瑞神獸 3D 卡通立體肖像',
    ringColor: 'ring-rose-400/90',
    shadowColor: 'shadow-rose-600/35',
    badge: '⛩️',
    isMythical: true,
  },
};

export const FoxIllustration: React.FC<FoxIllustrationProps> = ({
  foxId,
  size = 'md',
  isPetting = false,
}) => {
  const foxData = FOX_IMAGE_MAP[foxId] || FOX_IMAGE_MAP['red-fox'];

  const sizeContainerMap = {
    sm: 'w-16 h-16',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
    xl: 'w-64 h-64',
  };

  const roundedClassMap = {
    sm: 'rounded-2xl',
    md: 'rounded-3xl',
    lg: 'rounded-3xl',
    xl: 'rounded-3xl',
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${sizeContainerMap[size]}`}
      animate={
        isPetting
          ? {
              scale: [1, 1.15, 0.94, 1.08, 1],
              rotate: [0, -3, 3, -1.5, 0],
            }
          : {
              y: [0, -5, 0],
            }
      }
      transition={
        isPetting
          ? { duration: 0.65, ease: 'easeOut' }
          : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
      }
      whileHover={{ scale: 1.05 }}
    >
      {/* Outer Glow & Soft Aura */}
      <motion.div
        className={`absolute -inset-2 ${roundedClassMap[size]} bg-gradient-to-tr from-amber-300/30 via-orange-300/20 to-purple-300/30 blur-lg pointer-events-none`}
        animate={
          foxData.isMythical
            ? {
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.85, 0.5],
              }
            : {
                opacity: [0.4, 0.65, 0.4],
              }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Image Frame */}
      <div
        className={`relative w-full h-full ${roundedClassMap[size]} overflow-hidden ring-4 ${foxData.ringColor} shadow-lg ${foxData.shadowColor} bg-white transition-all`}
      >
        <motion.img
          src={foxData.src}
          alt={foxData.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.45 }}
        />

        {/* Soft Glass Corner Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/25 pointer-events-none" />
      </div>

      {/* Tiny species emoji badge on corner with subtle hover wiggle */}
      {size !== 'sm' && (
        <motion.span
          className="absolute -bottom-1 -right-1 text-base sm:text-lg bg-white/95 rounded-full p-1 shadow-md border border-stone-200/80 leading-none cursor-default"
          whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.3 }}
        >
          {foxData.badge}
        </motion.span>
      )}
    </motion.div>
  );
};

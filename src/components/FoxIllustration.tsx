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
import cuteBlueFox from '../assets/images/cute_blue_fox_1788504878956.jpg';
import cuteCorsacFox from '../assets/images/cute_corsac_fox_1788504895324.jpg';
import cuteDarwinsFox from '../assets/images/cute_darwins_fox_1788504907509.jpg';
import cuteManedWolf from '../assets/images/cute_maned_wolf_1788504922083.jpg';
import cuteInariFox from '../assets/images/cute_inari_fox_1788504935605.jpg';
import cuteKitsunebiFox from '../assets/images/cute_kitsunebi_fox_1788504950980.jpg';
import cuteReynardFox from '../assets/images/cute_reynard_fox_1788504962501.jpg';
import cuteYakanFox from '../assets/images/cute_yakan_fox_1788504976839.jpg';
import cuteCelestialTenko from '../assets/images/cute_celestial_tenko_1788504989119.jpg';
import cuteLunarFox from '../assets/images/cute_lunar_fox_1788505002449.jpg';

interface FoxIllustrationProps {
  foxId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isPetting?: boolean;
  stage?: 'baby' | 'adult' | 'mystic';
  accessoryId?: string;
  activity?: 'idle' | 'sleeping' | 'eating' | 'bathing' | 'playing' | 'brushing';
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
    badge: '🌸',
    isMythical: true,
  },
  'blue-fox': {
    src: cuteBlueFox,
    alt: '藍狐北大西洋岩岸 3D 卡通立體肖像',
    ringColor: 'ring-indigo-300/80',
    shadowColor: 'shadow-indigo-500/25',
    badge: '🪨',
  },
  'corsac-fox': {
    src: cuteCorsacFox,
    alt: '沙狐中亞草原 3D 卡通立體肖像',
    ringColor: 'ring-amber-500/80',
    shadowColor: 'shadow-amber-600/25',
    badge: '🌾',
  },
  'darwins-fox': {
    src: cuteDarwinsFox,
    alt: '達爾文狐雨林隱者 3D 卡通立體肖像',
    ringColor: 'ring-teal-400/80',
    shadowColor: 'shadow-teal-600/25',
    badge: '🌿',
  },
  'maned-wolf': {
    src: cuteManedWolf,
    alt: '南美鬃狼高跟鞋大巨人 3D 卡通立體肖像',
    ringColor: 'ring-amber-600/90',
    shadowColor: 'shadow-orange-700/35',
    badge: '🦵',
  },
  'inari-fox': {
    src: cuteInariFox,
    alt: '稻荷神使白狐神獸 3D 卡通立體肖像',
    ringColor: 'ring-red-400/90',
    shadowColor: 'shadow-red-600/35',
    badge: '⛩️',
    isMythical: true,
  },
  'kitsunebi-fox': {
    src: cuteKitsunebiFox,
    alt: '狐火靈狐幽夜冷火 3D 卡通立體肖像',
    ringColor: 'ring-cyan-400/90',
    shadowColor: 'shadow-cyan-600/35',
    badge: '🔥',
    isMythical: true,
  },
  'reynard-fox': {
    src: cuteReynardFox,
    alt: '智狐雷納德古典貴族 3D 卡通立體肖像',
    ringColor: 'ring-rose-500/90',
    shadowColor: 'shadow-rose-700/35',
    badge: '🎩',
    isMythical: true,
  },
  'yakan-fox': {
    src: cuteYakanFox,
    alt: '野干神狐梵音禪宗 3D 卡通立體肖像',
    ringColor: 'ring-purple-600/90',
    shadowColor: 'shadow-purple-800/35',
    badge: '🔮',
    isMythical: true,
  },
  'celestial-tenko': {
    src: cuteCelestialTenko,
    alt: '金狐天狐大仙宗主 3D 卡通立體肖像',
    ringColor: 'ring-yellow-400/90',
    shadowColor: 'shadow-yellow-500/35',
    badge: '👑',
    isMythical: true,
  },
  'lunar-fox': {
    src: cuteLunarFox,
    alt: '幽夜月狐靜謐守月 3D 卡通立體肖像',
    ringColor: 'ring-indigo-400/90',
    shadowColor: 'shadow-indigo-800/35',
    badge: '🌙',
    isMythical: true,
  },
};

export const FoxIllustration: React.FC<FoxIllustrationProps> = ({
  foxId,
  size = 'md',
  isPetting = false,
  stage = 'adult',
  accessoryId = 'none',
  activity = 'idle',
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

  // Accessory Icons map
  const ACCESSORY_ICON_MAP: Record<string, { icon: string; pos: string; label: string }> = {
    'shrine-ribbon': { icon: '⛩️', pos: '-bottom-2 -left-2', label: '稻荷朱砂結' },
    'sakura-crown': { icon: '🌸', pos: '-top-3 left-1/2 -translate-x-1/2', label: '春櫻冠' },
    'clover-leaf': { icon: '🍀', pos: '-top-3 right-4', label: '四葉草' },
    'round-glasses': { icon: '👓', pos: 'top-1/3 left-1/2 -translate-x-1/2', label: '學者鏡' },
    'explorer-cape': { icon: '🧭', pos: '-bottom-2 -left-1', label: '冒險斗篷' },
    'celestial-aura': { icon: '💫', pos: '-top-4 left-1/2 -translate-x-1/2', label: '星宿神環' },
  };

  const activeAcc = accessoryId && accessoryId !== 'none' ? ACCESSORY_ICON_MAP[accessoryId] : null;

  // Animation variants depending on activity & stage
  let motionAnimate: Record<string, unknown> = { y: [0, -5, 0] };
  let motionTransition: Record<string, unknown> = { duration: 3.8, repeat: Infinity, ease: 'easeInOut' };

  if (isPetting) {
    motionAnimate = {
      scale: [1, 1.15, 0.94, 1.08, 1],
      rotate: [0, -3, 3, -1.5, 0],
    };
    motionTransition = { duration: 0.65, ease: 'easeOut' };
  } else if (activity === 'sleeping') {
    motionAnimate = { scale: [1, 0.96, 1], y: [0, 4, 0] };
    motionTransition = { duration: 2.8, repeat: Infinity, ease: 'easeInOut' };
  } else if (activity === 'eating') {
    motionAnimate = { scale: [1, 1.06, 0.98, 1.05, 1], y: [0, -4, 0, -2, 0] };
    motionTransition = { duration: 0.5, repeat: 3, ease: 'easeInOut' };
  } else if (activity === 'playing') {
    motionAnimate = { y: [0, -22, 0, -12, 0], rotate: [0, -6, 6, -3, 0] };
    motionTransition = { duration: 1.2, repeat: 2, ease: 'easeInOut' };
  } else if (activity === 'bathing') {
    motionAnimate = { y: [0, 2, -2, 0], rotate: [0, -1, 1, 0] };
    motionTransition = { duration: 1.8, repeat: Infinity, ease: 'easeInOut' };
  }

  // Stage scaling
  const stageScale = stage === 'baby' ? 'scale-90' : stage === 'mystic' ? 'scale-105' : 'scale-100';

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${sizeContainerMap[size]} ${stageScale} transition-transform`}
      animate={motionAnimate}
      transition={motionTransition}
      whileHover={{ scale: 1.05 }}
    >
      {/* Mystic Stage Cosmic Halo / Radiance */}
      {stage === 'mystic' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-5 rounded-full border-2 border-dashed border-amber-300/60 pointer-events-none"
        />
      )}

      {/* Outer Glow & Soft Aura */}
      <motion.div
        className={`absolute -inset-2 ${roundedClassMap[size]} bg-gradient-to-tr from-amber-300/30 via-orange-300/20 to-purple-300/30 blur-lg pointer-events-none`}
        animate={
          stage === 'mystic' || foxData.isMythical
            ? {
                scale: [1, 1.18, 1],
                opacity: [0.65, 0.95, 0.65],
              }
            : {
                opacity: [0.4, 0.65, 0.4],
              }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main Image Frame */}
      <div
        className={`relative w-full h-full ${roundedClassMap[size]} overflow-hidden ring-4 ${
          stage === 'mystic'
            ? 'ring-amber-400 shadow-amber-400/40 shadow-xl'
            : stage === 'baby'
            ? 'ring-pink-300 shadow-pink-300/30'
            : `${foxData.ringColor} ${foxData.shadowColor}`
        } shadow-lg bg-white transition-all`}
      >
        <motion.img
          src={foxData.src}
          alt={foxData.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.45 }}
        />

        {/* Baby blush cheeks overlay */}
        {stage === 'baby' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-6 opacity-60">
            <span className="w-5 h-2.5 rounded-full bg-pink-400/50 blur-xs" />
            <span className="w-5 h-2.5 rounded-full bg-pink-400/50 blur-xs" />
          </div>
        )}

        {/* Soft Glass Corner Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/25 pointer-events-none" />
      </div>

      {/* Equipped Accessory Overlay */}
      {activeAcc && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute ${activeAcc.pos} z-20 text-2xl drop-shadow-md select-none pointer-events-none`}
          title={activeAcc.label}
        >
          {activeAcc.icon}
        </motion.div>
      )}

      {/* Stage Badge on Top Left */}
      {size !== 'sm' && stage && (
        <span
          className={`absolute -top-1.5 -left-1.5 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md z-20 ${
            stage === 'mystic'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 border border-yellow-200'
              : stage === 'baby'
              ? 'bg-pink-100 text-pink-700 border border-pink-200'
              : 'bg-stone-100 text-stone-700 border border-stone-200'
          }`}
        >
          {stage === 'mystic' ? '✨ 仙靈覺醒' : stage === 'baby' ? '🍼 幼狐萌寶' : '🦊 成年靈狐'}
        </span>
      )}

      {/* Tiny species emoji badge on bottom right corner */}
      {size !== 'sm' && (
        <motion.span
          className="absolute -bottom-1 -right-1 text-base sm:text-lg bg-white/95 rounded-full p-1 shadow-md border border-stone-200/80 leading-none cursor-default z-10"
          whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.3 }}
        >
          {foxData.badge}
        </motion.span>
      )}
    </motion.div>
  );
};


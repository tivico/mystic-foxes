import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FOX_SPECIES_LIST } from '../data/foxesData';
import { AdoptedFox, FoxAccessory, FoxEvolutionStage, GardenSnackItem } from '../types';
import { FoxIllustration } from './FoxIllustration';
import {
  playPettingSound,
  playFeedSound,
  playBrushSound,
  playToySound,
  playBathSound,
  playLullabySound,
  playAdventureFanfare,
  playBlessingSound,
  playDressSound,
  playCameraSound,
} from '../utils/foxAudio';
import {
  FeedModal,
  AdventureModal,
  DressModal,
  SnapshotModal,
  EvolutionCelebrationModal,
} from './ActionModals';
import { ADVENTURE_LOCATIONS } from '../data/petGameData';
import {
  Heart,
  Sparkles,
  Zap,
  Coffee,
  RotateCcw,
  Camera,
  BookOpen,
  Edit2,
  Check,
  Award,
} from 'lucide-react';

interface AdoptedFoxViewProps {
  adoptedFox: AdoptedFox | null;
  onUpdateFox: (updater: (prev: AdoptedFox) => AdoptedFox) => void;
  onAdoptNew: (speciesId: string, customName: string) => void;
}

export const AdoptedFoxView: React.FC<AdoptedFoxViewProps> = ({
  adoptedFox,
  onUpdateFox,
  onAdoptNew,
}) => {
  // Adoption onboarding state if user has no companion yet
  const [selectedSpeciesId, setSelectedSpeciesId] = useState('red-fox');
  const [nameInput, setNameInput] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentThought, setCurrentThought] = useState('主人，今天也要一起開心地玩喔！');

  // Animation states for the 10 actions
  const [isPettingAnim, setIsPettingAnim] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<
    'idle' | 'sleeping' | 'eating' | 'bathing' | 'playing' | 'brushing'
  >('idle');
  const [floatingParticles, setFloatingParticles] = useState<
    { id: number; text: string; icon: string }[]
  >([]);

  // Sub modals
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isAdventureModalOpen, setIsAdventureModalOpen] = useState(false);
  const [isDressModalOpen, setIsDressModalOpen] = useState(false);
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false);
  const [isCelebrationModalOpen, setIsCelebrationModalOpen] = useState(false);
  const [isAdventureLogOpen, setIsAdventureLogOpen] = useState(false);
  const [isChangeFoxModalOpen, setIsChangeFoxModalOpen] = useState(false);

  const activeSpecies = adoptedFox
    ? FOX_SPECIES_LIST.find((f) => f.id === adoptedFox.speciesId) || FOX_SPECIES_LIST[0]
    : FOX_SPECIES_LIST[0];

  // Helper to spawn floating floating particles
  const spawnParticle = (text: string, icon: string) => {
    const id = Date.now() + Math.random();
    setFloatingParticles((prev) => [...prev, { id, text, icon }]);
    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1500);
  };

  // Helper to add EXP and check evolution
  const gainExpAndCheckEvolution = (
    amount: number,
    statUpdates: Partial<AdoptedFox>,
    speechText: string
  ) => {
    if (!adoptedFox) return;

    setCurrentThought(speechText);

    onUpdateFox((prev) => {
      const newExp = prev.exp + amount;
      const expNeeded = prev.level * 50;
      let newLevel = prev.level;
      let newStage = prev.stage;
      let didEvolve = false;

      if (newExp >= expNeeded) {
        newLevel += 1;
        // Evolution check: Lv 5 -> Adult, Lv 10 -> Mystic
        if (newLevel >= 10 && prev.stage !== 'mystic') {
          newStage = 'mystic';
          didEvolve = true;
        } else if (newLevel >= 5 && prev.stage === 'baby') {
          newStage = 'adult';
          didEvolve = true;
        }
      }

      if (didEvolve) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => setIsCelebrationModalOpen(true), 400);
      }

      return {
        ...prev,
        ...statUpdates,
        exp: newExp >= expNeeded ? newExp - expNeeded : newExp,
        level: newLevel,
        stage: newStage,
      };
    });
  };

  /* ---------------- 10 種完整互動玩法實作 ---------------- */

  // 1. 🐾 摸摸揉臉
  const handlePetAction = () => {
    if (!adoptedFox) return;
    playPettingSound(adoptedFox.speciesId);
    setIsPettingAnim(true);
    setTimeout(() => setIsPettingAnim(false), 700);

    spawnParticle('+15 摸摸親密', '💖');
    gainExpAndCheckEvolution(
      15,
      {
        happiness: Math.min(100, (adoptedFox.happiness || 50) + 10),
        energy: Math.max(0, (adoptedFox.energy || 50) - 2),
      },
      ['瞇起眼睛舒服地蹭著你的手指～', '耳朵動了動，發出開心的呼嚕聲！', '輕輕用鼻子頂頂你的手心～'][
        Math.floor(Math.random() * 3)
      ]
    );
  };

  // 2. 🍙 美食投餵
  const handleFeed = (snack: GardenSnackItem) => {
    if (!adoptedFox) return;
    playFeedSound();
    setCurrentActivity('eating');
    setTimeout(() => setCurrentActivity('idle'), 1800);

    spawnParticle(`+35 飽食 (${snack.name})`, snack.emoji);
    gainExpAndCheckEvolution(
      20,
      {
        hunger: Math.min(100, (adoptedFox.hunger || 50) + 35),
        happiness: Math.min(100, (adoptedFox.happiness || 50) + 15),
        energy: Math.min(100, (adoptedFox.energy || 50) + 10),
      },
      `咔嚓咔嚓～ ${snack.name} 太好吃了！小舌頭意猶未盡地舔舔嘴巴！`
    );
  };

  // 3. 🪮 輕柔梳毛
  const handleBrush = () => {
    if (!adoptedFox) return;
    playBrushSound();
    setCurrentActivity('brushing');
    setTimeout(() => setCurrentActivity('idle'), 1600);

    spawnParticle('+25 蓬鬆乾淨', '✨');
    gainExpAndCheckEvolution(
      15,
      {
        fluffiness: Math.min(100, (adoptedFox.fluffiness || 50) + 25),
        happiness: Math.min(100, (adoptedFox.happiness || 50) + 12),
      },
      '全身的毛髮都被梳得像棉花糖一樣蓬鬆閃亮！'
    );
  };

  // 4. 🎾 拋球玩耍
  const handlePlayToy = () => {
    if (!adoptedFox) return;
    if (adoptedFox.energy < 10) {
      setCurrentThought('小狐狸累趴在地上喘氣，先讓它泡個溫泉或睡一覺吧！');
      return;
    }

    playToySound();
    setCurrentActivity('playing');
    setTimeout(() => setCurrentActivity('idle'), 2400);

    spawnParticle('+25 活力玩耍', '🎾');
    gainExpAndCheckEvolution(
      22,
      {
        happiness: Math.min(100, (adoptedFox.happiness || 50) + 25),
        energy: Math.max(0, (adoptedFox.energy || 50) - 15),
        hunger: Math.max(0, (adoptedFox.hunger || 50) - 8),
      },
      '靈敏地縱身一躍，在半空中準確咬住球球，興奮地搖著尾巴跑回來！'
    );
  };

  // 5. 🛁 溫泉花瓣浴
  const handleOnsenBath = () => {
    if (!adoptedFox) return;
    playBathSound();
    setCurrentActivity('bathing');
    setTimeout(() => setCurrentActivity('idle'), 2200);

    spawnParticle('+30 療癒舒緩', '♨️');
    gainExpAndCheckEvolution(
      20,
      {
        energy: Math.min(100, (adoptedFox.energy || 50) + 30),
        fluffiness: Math.min(100, (adoptedFox.fluffiness || 50) + 15),
        happiness: Math.min(100, (adoptedFox.happiness || 50) + 20),
      },
      '頂著溫泉小毛巾泡在暖呼呼的泉水裡，舒服得全身都融化了～'
    );
  };

  // 6. 💤 搖籃安睡
  const handleSleepNap = () => {
    if (!adoptedFox) return;
    playLullabySound();
    setCurrentActivity('sleeping');
    setTimeout(() => setCurrentActivity('idle'), 3000);

    spawnParticle('體力全回滿 💤', '🌙');
    gainExpAndCheckEvolution(
      25,
      {
        energy: 100,
        hunger: Math.max(0, (adoptedFox.hunger || 50) - 12),
      },
      '蜷縮成一個圓滾滾的毛茸茸甜甜圈，發出呼嚕嚕的可愛夢話！'
    );
  };

  // 7. 🌲 後山探險
  const handleStartAdventure = (location: (typeof ADVENTURE_LOCATIONS)[0]) => {
    if (!adoptedFox) return;
    playAdventureFanfare();

    const randomItem =
      location.treasures[Math.floor(Math.random() * location.treasures.length)];
    const randomStory =
      location.stories[Math.floor(Math.random() * location.stories.length)];

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    spawnParticle(`尋獲寶物：${randomItem}`, '💎');

    const newLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-TW'),
      location: location.name,
      itemFound: randomItem,
      story: randomStory,
    };

    gainExpAndCheckEvolution(
      35,
      {
        spirit: Math.min(100, (adoptedFox.spirit || 30) + 20),
        energy: Math.max(0, (adoptedFox.energy || 50) - 18),
        adventureLog: [newLog, ...(adoptedFox.adventureLog || [])],
      },
      `從小狐狸嘴裡接過了【${randomItem}】！${randomStory}`
    );
  };

  // 8. 🔮 神社靈力祈福
  const handleShrineBlessing = () => {
    if (!adoptedFox) return;
    playBlessingSound();

    spawnParticle('+30 靈性修為', '🔮');
    confetti({
      particleCount: 40,
      colors: ['#ffd700', '#ff9900', '#ffffff'],
      origin: { y: 0.5 },
    });

    gainExpAndCheckEvolution(
      30,
      {
        spirit: Math.min(100, (adoptedFox.spirit || 30) + 30),
        happiness: Math.min(100, (adoptedFox.happiness || 50) + 20),
      },
      '神社鳥居飄散下耀眼金光，小狐狸周身環繞著神秘的靈狐符紋！'
    );
  };

  // 9. 🎀 飾品更衣
  const handleSelectAccessory = (acc: FoxAccessory) => {
    if (!adoptedFox) return;
    playDressSound();
    onUpdateFox((prev) => ({
      ...prev,
      equippedAccessoryId: acc.id,
    }));
    spawnParticle(`戴上飾品：${acc.name}`, acc.icon);
    setCurrentThought(`換上了【${acc.name}】，照著水坑左右端詳，看起來超神氣！`);
  };

  // 10. 📸 拍立得拍照手帳
  const handleTakeSnapshot = () => {
    if (!adoptedFox) return;
    playCameraSound();

    const titles = ['初醒晨曦之吻', '午後偷閒咬落葉', '小鼻頭頂著花花', '神氣十足的站姿'];
    const notes = [
      '今天陽光很好，小耳朵看起來特別剔透。',
      '剛摸摸完，眼睛瞇成了兩條彎彎的月牙。',
      '發現了鏡頭，好奇地湊近嗅了嗅！',
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];

    const newSnapshot = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-TW'),
      title: randomTitle,
      note: randomNote,
      stage: adoptedFox.stage,
    };

    onUpdateFox((prev) => ({
      ...prev,
      snapshots: [newSnapshot, ...(prev.snapshots || [])],
    }));

    spawnParticle('已儲存至寫真手帳 📸', '✨');
    setCurrentThought(`咔嚓！【${randomTitle}】已被記錄在專屬拍立得手帳中囉！`);
    setTimeout(() => setIsSnapshotModalOpen(true), 600);
  };

  /* ---------------- 初次認領畫面 (若尚未認領狐狸) ---------------- */
  if (!adoptedFox) {
    return (
      <div className="bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            ✦ 專屬契約召喚 ✦
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            認領你的命定靈狐幼崽
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            選擇一隻你最心動的狐狸，從幼崽開始悉心照料，陪伴它逐步進化為威風凜凜的九天仙狐！
          </p>
        </div>

        {/* Species Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FOX_SPECIES_LIST.map((fox) => {
            const isSelected = selectedSpeciesId === fox.id;
            return (
              <motion.button
                key={fox.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedSpeciesId(fox.id)}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                    : 'bg-white/80 hover:bg-stone-50 border-stone-200'
                }`}
              >
                <FoxIllustration foxId={fox.id} size="sm" />
                <div>
                  <div className="text-xs font-bold text-stone-900">{fox.name}</div>
                  <div className="text-[10px] text-stone-500">{fox.habitatLabel}</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Naming Form & Adoption Button */}
        <div className="bg-white/90 p-6 rounded-2xl border border-amber-100 shadow-xs max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              為你的小狐狸取個暱稱吧：
            </label>
            <input
              type="text"
              placeholder="例如：小赤赤、雪球球、星塵、大耳寶..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none"
              maxLength={12}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const defaultName =
                FOX_SPECIES_LIST.find((f) => f.id === selectedSpeciesId)?.name || '小狐狸';
              onAdoptNew(selectedSpeciesId, nameInput.trim() || defaultName);
            }}
            className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>締結契約 · 正式認領 🐾</span>
          </motion.button>
        </div>
      </div>
    );
  }

  /* ---------------- 核心養成主畫面 ---------------- */
  const expPercentage = Math.min(
    100,
    Math.round(((adoptedFox.exp || 0) / ((adoptedFox.level || 1) * 50)) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Floating Action Particles */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {floatingParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.6, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.2, 1, 0.9],
                y: -60,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-black text-amber-900 bg-white/95 px-4 py-1.5 rounded-full shadow-xl border border-amber-300 flex items-center gap-1.5"
            >
              <span>{p.icon}</span>
              <span>{p.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top Companion Header Bar */}
      <div className="bg-white/90 rounded-3xl p-5 sm:p-6 border border-amber-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Fox Name & Level */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-inner">
            {activeSpecies.avatarEmoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="text-lg font-bold border-b border-amber-500 outline-none px-1"
                    maxLength={10}
                  />
                  <button
                    onClick={() => {
                      if (nameInput.trim()) {
                        onUpdateFox((prev) => ({ ...prev, customName: nameInput.trim() }));
                      }
                      setIsEditingName(false);
                    }}
                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <h3 className="text-xl font-bold text-stone-900 font-serif flex items-center gap-1.5">
                  <span>{adoptedFox.customName}</span>
                  <button
                    onClick={() => {
                      setNameInput(adoptedFox.customName);
                      setIsEditingName(true);
                    }}
                    className="text-stone-400 hover:text-stone-700 p-0.5"
                    title="修改暱稱"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </h3>
              )}
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                Lv.{adoptedFox.level}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
              <span>{activeSpecies.name}</span>
              <span>·</span>
              <span className="text-amber-700 font-semibold">
                {adoptedFox.stage === 'mystic'
                  ? '✨ 仙靈九天覺醒期'
                  : adoptedFox.stage === 'adult'
                  ? '🦊 雄健成狐期'
                  : '🍼 呆萌幼狐期'}
              </span>
              <span>·</span>
              <span>已領養 {adoptedFox.adoptedAt}</span>
            </div>
          </div>
        </div>

        {/* Quick Menu Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdventureLogOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200/60 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>冒險日記 ({adoptedFox.adventureLog?.length || 0})</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSnapshotModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold border border-purple-200/60 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>拍立得相簿 ({adoptedFox.snapshots?.length || 0})</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChangeFoxModalOpen(true)}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
            title="更換認領品種"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Main Sanctuary Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center 3D Fox Stage Area (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-amber-50/90 via-orange-50/30 to-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden">
          {/* Decorative shrine torii background faint element */}
          <div className="absolute top-4 right-4 text-7xl opacity-5 pointer-events-none select-none">
            ⛩️
          </div>

          {/* Level Exp Bar at Top of Stage */}
          <div className="w-full max-w-md space-y-1">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>進化修為進度</span>
              </span>
              <span>
                {adoptedFox.exp || 0} / {(adoptedFox.level || 1) * 50} EXP ({expPercentage}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-200/80 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: `${expPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Center Stage: Thought Bubble + Fox Illustration */}
          <div className="flex flex-col items-center my-6 relative">
            {/* Dynamic Thought Bubble */}
            <motion.div
              key={currentThought}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-white/95 text-stone-800 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-md border border-amber-100 max-w-xs text-center mb-6 relative"
            >
              <p>💭 {currentThought}</p>
              {/* Bubble pointer tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-amber-100" />
            </motion.div>

            {/* Fox Avatar (Click to Pet!) */}
            <div
              onClick={handlePetAction}
              className="cursor-pointer group relative active:scale-95 transition-transform"
              title="點擊直接摸摸頭聽叫聲！"
            >
              <FoxIllustration
                foxId={adoptedFox.speciesId}
                size="xl"
                isPetting={isPettingAnim}
                stage={adoptedFox.stage}
                accessoryId={adoptedFox.equippedAccessoryId}
                activity={currentActivity}
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-stone-400 group-hover:text-rose-500 bg-white/90 px-3 py-0.5 rounded-full shadow-2xs border border-stone-200/60 transition-colors pointer-events-none">
                點擊摸摸 🔊
              </span>
            </div>
          </div>

          {/* Bottom Stage Hint */}
          <div className="text-[11px] text-stone-500 font-medium text-center">
            ✦ 提示：進行下方 10 種日常互動可獲得修為，滿級將覺醒為仙靈神狐！
          </div>
        </div>

        {/* Right 5 Vitals & 10 Action Buttons Grid (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 5 Status Meters */}
          <div className="bg-white/90 rounded-3xl p-5 border border-amber-100 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-stone-800 font-serif flex items-center justify-between">
              <span>萌狐生機狀態</span>
              <span className="text-[10px] text-stone-400 font-normal">隨時照料保持健康</span>
            </h4>

            <div className="space-y-2">
              {/* 飽食度 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>🍗</span> 飽食度
                  </span>
                  <span className="text-orange-600">{adoptedFox.hunger || 50} / 100</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-400 rounded-full transition-all"
                    style={{ width: `${adoptedFox.hunger || 50}%` }}
                  />
                </div>
              </div>

              {/* 幸福感 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>💖</span> 幸福親密
                  </span>
                  <span className="text-pink-600">{adoptedFox.happiness || 50} / 100</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-400 rounded-full transition-all"
                    style={{ width: `${adoptedFox.happiness || 50}%` }}
                  />
                </div>
              </div>

              {/* 精力值 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>⚡</span> 活力精力
                  </span>
                  <span className="text-emerald-600">{adoptedFox.energy || 50} / 100</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all"
                    style={{ width: `${adoptedFox.energy || 50}%` }}
                  />
                </div>
              </div>

              {/* 靈力值 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>🔮</span> 靈性靈力
                  </span>
                  <span className="text-purple-600">{adoptedFox.spirit || 30} / 100</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full transition-all"
                    style={{ width: `${adoptedFox.spirit || 30}%` }}
                  />
                </div>
              </div>

              {/* 蓬鬆度 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>🌸</span> 毛髮蓬鬆
                  </span>
                  <span className="text-amber-600">{adoptedFox.fluffiness || 50} / 100</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${adoptedFox.fluffiness || 50}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* The 10 Interactive Action Buttons */}
          <div className="bg-white/90 rounded-3xl p-5 border border-amber-100 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-stone-800 font-serif flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>十項互動玩法日常</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* 1. 摸摸揉臉 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePetAction}
                className="p-2.5 rounded-2xl bg-rose-50/80 hover:bg-rose-100/90 text-rose-900 border border-rose-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">🐾</span>
                <div>
                  <div>1. 摸摸揉臉</div>
                  <span className="text-[10px] text-rose-600 font-normal">專屬叫聲發聲</span>
                </div>
              </motion.button>

              {/* 2. 美食投餵 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsFeedModalOpen(true)}
                className="p-2.5 rounded-2xl bg-orange-50/80 hover:bg-orange-100/90 text-orange-900 border border-orange-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">🍙</span>
                <div>
                  <div>2. 美食投餵</div>
                  <span className="text-[10px] text-orange-600 font-normal">野莓·油豆腐</span>
                </div>
              </motion.button>

              {/* 3. 輕柔梳毛 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleBrush}
                className="p-2.5 rounded-2xl bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border border-amber-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">🪮</span>
                <div>
                  <div>3. 輕柔梳毛</div>
                  <span className="text-[10px] text-amber-600 font-normal">蓬鬆閃亮微光</span>
                </div>
              </motion.button>

              {/* 4. 拋球玩耍 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePlayToy}
                className="p-2.5 rounded-2xl bg-teal-50/80 hover:bg-teal-100/90 text-teal-900 border border-teal-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">🎾</span>
                <div>
                  <div>4. 拋球玩耍</div>
                  <span className="text-[10px] text-teal-600 font-normal">飛撲跳躍追逐</span>
                </div>
              </motion.button>

              {/* 5. 溫泉沐浴 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOnsenBath}
                className="p-2.5 rounded-2xl bg-sky-50/80 hover:bg-sky-100/90 text-sky-900 border border-sky-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">♨️</span>
                <div>
                  <div>5. 溫泉花瓣浴</div>
                  <span className="text-[10px] text-sky-600 font-normal">水花泡泡蒸氣</span>
                </div>
              </motion.button>

              {/* 6. 搖籃安睡 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSleepNap}
                className="p-2.5 rounded-2xl bg-indigo-50/80 hover:bg-indigo-100/90 text-indigo-900 border border-indigo-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">💤</span>
                <div>
                  <div>6. 搖籃安睡</div>
                  <span className="text-[10px] text-indigo-600 font-normal">八音盒曲回滿精力</span>
                </div>
              </motion.button>

              {/* 7. 後山探險 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsAdventureModalOpen(true)}
                className="p-2.5 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">🌲</span>
                <div>
                  <div>7. 後山探險</div>
                  <span className="text-[10px] text-emerald-600 font-normal">秘境拾獲奇珍</span>
                </div>
              </motion.button>

              {/* 8. 靈力祈福 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleShrineBlessing}
                className="p-2.5 rounded-2xl bg-purple-50/80 hover:bg-purple-100/90 text-purple-900 border border-purple-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">🔮</span>
                <div>
                  <div>8. 靈力祈福</div>
                  <span className="text-[10px] text-purple-600 font-normal">神社神鈴加速覺醒</span>
                </div>
              </motion.button>

              {/* 9. 飾品更衣 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsDressModalOpen(true)}
                className="p-2.5 rounded-2xl bg-pink-50/80 hover:bg-pink-100/90 text-pink-900 border border-pink-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">🎀</span>
                <div>
                  <div>9. 飾品更衣</div>
                  <span className="text-[10px] text-pink-600 font-normal">花冠·朱砂結穿戴</span>
                </div>
              </motion.button>

              {/* 10. 拍立得合影 */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleTakeSnapshot}
                className="p-2.5 rounded-2xl bg-yellow-50/80 hover:bg-yellow-100/90 text-yellow-900 border border-yellow-200/80 flex items-center gap-2 font-bold cursor-pointer transition-colors text-left"
              >
                <span className="text-lg">📸</span>
                <div>
                  <div>10. 拍立得合影</div>
                  <span className="text-[10px] text-yellow-700 font-normal">快門寫真留念</span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Modals */}
      <FeedModal
        isOpen={isFeedModalOpen}
        onClose={() => setIsFeedModalOpen(false)}
        onFeed={handleFeed}
      />

      <AdventureModal
        isOpen={isAdventureModalOpen}
        onClose={() => setIsAdventureModalOpen(false)}
        foxLevel={adoptedFox.level}
        onStartAdventure={handleStartAdventure}
      />

      <DressModal
        isOpen={isDressModalOpen}
        onClose={() => setIsDressModalOpen(false)}
        currentAccessoryId={adoptedFox.equippedAccessoryId}
        onSelectAccessory={handleSelectAccessory}
      />

      <SnapshotModal
        isOpen={isSnapshotModalOpen}
        onClose={() => setIsSnapshotModalOpen(false)}
        foxName={adoptedFox.customName}
        speciesId={adoptedFox.speciesId}
        stage={adoptedFox.stage}
        accessoryId={adoptedFox.equippedAccessoryId}
        snapshots={adoptedFox.snapshots || []}
      />

      <EvolutionCelebrationModal
        isOpen={isCelebrationModalOpen}
        onClose={() => setIsCelebrationModalOpen(false)}
        foxName={adoptedFox.customName}
        speciesId={adoptedFox.speciesId}
        stage={adoptedFox.stage}
        accessoryId={adoptedFox.equippedAccessoryId}
      />

      {/* Adventure Log Modal */}
      {isAdventureLogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-100 space-y-4 max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
                <span>🌲</span>
                <span>後山探險拾遺日記</span>
              </h3>
              <button
                onClick={() => setIsAdventureLogOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {adoptedFox.adventureLog && adoptedFox.adventureLog.length > 0 ? (
                adoptedFox.adventureLog.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-stone-800">
                      <span>{log.location}</span>
                      <span className="text-[10px] text-stone-400 font-normal">{log.date}</span>
                    </div>
                    <div className="font-semibold text-amber-800">拾獲寶物：{log.itemFound}</div>
                    <p className="text-stone-600 text-[11px]">{log.story}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-stone-400 text-xs">
                  還沒有出發過探險喔！點擊「7. 後山探險」讓小狐狸去森林散步吧！
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Change Companion Confirm Modal */}
      {isChangeFoxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-100 text-center space-y-4"
          >
            <span className="text-3xl block">🔄</span>
            <h3 className="text-base font-bold text-stone-900 font-serif">重新領養其他品種狐狸？</h3>
            <p className="text-xs text-stone-500">
              你可以隨時重新選擇一隻不同品種的狐狸幼崽進行契約認領。（目前狐狸的數值將會重設為新幼崽）
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsChangeFoxModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                保持當前夥伴
              </button>
              <button
                onClick={() => {
                  setIsChangeFoxModalOpen(false);
                  onAdoptNew('arctic-fox', '雪球');
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-semibold text-white cursor-pointer"
              >
                確認更換
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

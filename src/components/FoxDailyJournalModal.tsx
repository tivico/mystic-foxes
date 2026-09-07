import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  X,
  Heart,
  Calendar,
  Sparkles,
  Send,
  MessageCircle,
  Clock,
  RotateCw,
  Award,
} from 'lucide-react';
import { AdoptedFox, FoxDailyJournalEntry } from '../types';
import {
  loadJournalEntries,
  getOrCreateTodayJournalEntry,
  saveOwnerReplyToEntry,
  generateTodayStory,
  saveJournalEntries,
  getCurrentTimeString,
  getTodayDateString,
} from '../utils/foxJournalManager';
import { FoxIllustration } from './FoxIllustration';

interface FoxDailyJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  adoptedFox: AdoptedFox | null;
  timeOfDay?: string;
  season?: string;
}

export const FoxDailyJournalModal: React.FC<FoxDailyJournalModalProps> = ({
  isOpen,
  onClose,
  adoptedFox,
  timeOfDay = 'day',
  season = 'autumn',
}) => {
  const [entries, setEntries] = useState<FoxDailyJournalEntry[]>([]);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');

  const foxName = adoptedFox?.customName || '小狐狸';
  const foxSpeciesId = adoptedFox?.speciesId || 'red-fox';

  // Load entries whenever opened
  useEffect(() => {
    if (isOpen) {
      const todayEntry = getOrCreateTodayJournalEntry(adoptedFox, timeOfDay, season);
      const allEntries = loadJournalEntries(foxName);
      setEntries(allEntries);
      setSelectedEntryId(todayEntry.id);
      setReplyInput('');
    }
  }, [isOpen, adoptedFox, timeOfDay, season, foxName]);

  const currentEntry =
    entries.find((e) => e.id === selectedEntryId) ||
    entries[0] ||
    null;

  // Handle owner reply submit
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEntry || !replyInput.trim()) return;

    const updated = saveOwnerReplyToEntry(currentEntry.id, replyInput.trim());
    setEntries(updated);
    setReplyInput('');
  };

  // Regenerate / re-reflect today's thought based on fresh interactions
  const handleRegenerateToday = () => {
    if (!currentEntry) return;
    setIsRefreshing(true);

    setTimeout(() => {
      const freshStory = generateTodayStory(adoptedFox, timeOfDay, season);
      const updatedList = entries.map((entry) => {
        if (entry.id === currentEntry.id) {
          return {
            ...entry,
            title: freshStory.title,
            content: freshStory.content,
            favoriteMoment: freshStory.favoriteMoment,
            moodEmoji: freshStory.moodEmoji,
            weatherMood: freshStory.weatherMood,
            timeStr: getCurrentTimeString(),
            statsSnapshot: {
              happiness: adoptedFox?.happiness || 85,
              fluffiness: adoptedFox?.fluffiness || 80,
              level: adoptedFox?.level || 1,
            },
          };
        }
        return entry;
      });

      saveJournalEntries(updatedList);
      setEntries(updatedList);
      setIsRefreshing(false);
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#faf7f2] dark:bg-stone-900 rounded-3xl shadow-2xl border border-amber-200/80 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Top Washi Paper Header Banner */}
          <div className="relative px-6 py-4 bg-gradient-to-r from-amber-100/90 via-orange-100/70 to-amber-50 dark:from-stone-800 dark:via-stone-850 dark:to-stone-800 border-b border-amber-200/60 dark:border-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-xl shrink-0">
                📖
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span>{foxName}的日常手記</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-sans font-bold">
                    第一人稱心境
                  </span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  小狐狸悄悄記錄下與你相伴的點滴日常與溫暖回憶
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="關閉手記"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs (Today vs History) */}
          <div className="flex border-b border-amber-200/40 dark:border-stone-800 px-6 pt-3 bg-amber-50/40 dark:bg-stone-850 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('today')}
              className={`pb-2.5 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'today'
                  ? 'border-amber-600 text-amber-700 dark:text-amber-300'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Sparkles size={14} />
              <span>今日手記</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-2.5 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'border-amber-600 text-amber-700 dark:text-amber-300'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Calendar size={14} />
              <span>相伴手帳回憶錄 ({entries.length})</span>
            </button>
          </div>

          {/* Main Journal Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {activeTab === 'today' && currentEntry && (
              <div className="space-y-6">
                {/* Washi Paper Card */}
                <div className="relative p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-stone-800/80 border border-amber-200/70 dark:border-stone-700 shadow-sm space-y-5">
                  {/* Watermark decorative paw */}
                  <div className="absolute right-6 top-6 text-7xl text-amber-500/5 dark:text-amber-400/5 pointer-events-none select-none font-serif">
                    🐾
                  </div>

                  {/* Header info: weather, time & mood stamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-700/60 pb-3.5">
                    <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 font-medium">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-[11px] font-bold">
                        {currentEntry.weatherMood}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-stone-400" />
                        <span>{currentEntry.timeStr}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-400 dark:text-stone-500">今日心情印章:</span>
                      <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-sm shadow-2xs">
                        {currentEntry.moodEmoji}
                      </div>
                    </div>
                  </div>

                  {/* Title & Author Avatar */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-stone-700 p-1 border border-amber-200/80 dark:border-stone-600 shrink-0 shadow-2xs">
                      <FoxIllustration foxId={foxSpeciesId} size="sm" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <h4 className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                        {currentEntry.title}
                      </h4>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                        筆者：{foxName}（親密度 {currentEntry.statsSnapshot.happiness}% · 蓬鬆度 {currentEntry.statsSnapshot.fluffiness}%）
                      </p>
                    </div>
                  </div>

                  {/* Diary Content Body */}
                  <div className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed tracking-wide font-sans bg-amber-50/40 dark:bg-stone-850/60 p-4 sm:p-5 rounded-2xl border border-amber-100/80 dark:border-stone-700">
                    <p className="whitespace-pre-line">{currentEntry.content}</p>
                  </div>

                  {/* Favorite Moment */}
                  {currentEntry.favoriteMoment && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50/80 to-amber-50/50 dark:from-rose-950/30 dark:to-stone-800 border border-rose-200/60 dark:border-rose-900/40 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                        <Heart size={16} className="fill-rose-400" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
                          ✦ 今日最心動瞬間
                        </span>
                        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium italic">
                          「{currentEntry.favoriteMoment}」
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Owner's Whisper Reply Section */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-700/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                        <MessageCircle size={14} className="text-amber-500" />
                        <span>給小狐狸的悄悄話回信</span>
                      </h5>
                      {currentEntry.ownerReply && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          已送達小狐狸心中 ♡
                        </span>
                      )}
                    </div>

                    {currentEntry.ownerReply ? (
                      <div className="p-3.5 rounded-2xl bg-amber-100/50 dark:bg-stone-750 border border-amber-300/50 dark:border-stone-600 flex items-start gap-2.5">
                        <span className="text-base select-none">💌</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium">
                            {currentEntry.ownerReply}
                          </p>
                          <span className="text-[10px] text-stone-400 mt-1 block">
                            — 來自溫柔的主人
                          </span>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSendReply} className="flex gap-2">
                        <input
                          type="text"
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          placeholder={`想對 ${foxName} 說些什麼呢？例如：今天也辛苦你了，小毛球...`}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 dark:text-stone-100"
                        />
                        <button
                          type="submit"
                          disabled={!replyInput.trim()}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Send size={13} />
                          <span>回信</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Bottom Action Hint & Refresh */}
                <div className="flex items-center justify-between text-xs text-stone-500 px-2">
                  <span>✦ 每天互動、餵食或完成專注時，小狐狸都會在日記裡寫下新心情！</span>
                  <button
                    onClick={handleRegenerateToday}
                    disabled={isRefreshing}
                    className="flex items-center gap-1 text-amber-700 dark:text-amber-400 hover:underline font-semibold cursor-pointer disabled:opacity-50"
                  >
                    <RotateCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
                    <span>捕捉當下心情</span>
                  </button>
                </div>
              </div>
            )}

            {/* History Memoir Tab */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="text-xs text-stone-500 dark:text-stone-400 px-1">
                  點選歷史手帳日期，回顧過往每一天溫暖的治癒片刻：
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {entries.map((entry) => {
                    const isSelected = entry.id === selectedEntryId;
                    return (
                      <div
                        key={entry.id}
                        onClick={() => {
                          setSelectedEntryId(entry.id);
                          setActiveTab('today');
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative group ${
                          isSelected
                            ? 'bg-amber-100/60 dark:bg-stone-800 border-amber-400 dark:border-amber-500 shadow-xs'
                            : 'bg-white dark:bg-stone-850 border-stone-200/80 dark:border-stone-750 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-mono font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1">
                            <Calendar size={11} />
                            <span>{entry.date}</span>
                          </span>
                          <span className="text-base">{entry.moodEmoji}</span>
                        </div>

                        <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 transition-colors">
                          {entry.title}
                        </h5>

                        <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1">
                          {entry.content}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                          <span>{entry.weatherMood}</span>
                          {entry.ownerReply && (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold">
                              💌 有主人回信
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Close */}
          <div className="p-4 bg-amber-50/50 dark:bg-stone-850 border-t border-amber-200/50 dark:border-stone-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-750 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors cursor-pointer"
            >
              闔上手帳
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

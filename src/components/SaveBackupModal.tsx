import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Download,
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  FileJson,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FoxSaveData, AdoptedFox, GardenState, GamePlayMode } from '../types';
import {
  exportSaveToFile,
  parseSaveFileContent,
  persistAllStatesToStorage,
} from '../utils/saveManager';
import { playBlessingSound } from '../utils/foxAudio';

interface SaveBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameMode: GamePlayMode;
  adoptedFox: AdoptedFox | null;
  gardenState: GardenState;
  petCounts: Record<string, number>;
  timeOfDay: string;
  season: string;
  onImportSuccess: (imported: FoxSaveData) => void;
  onResetSave: () => void;
}

export const SaveBackupModal: React.FC<SaveBackupModalProps> = ({
  isOpen,
  onClose,
  gameMode,
  adoptedFox,
  gardenState,
  petCounts,
  timeOfDay,
  season,
  onImportSuccess,
  onResetSave,
}) => {
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pasteText, setPasteText] = useState('');
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const totalPetCount = Object.values(petCounts).reduce<number>(
    (a, b) => a + (typeof b === 'number' ? b : 0),
    0
  );

  const currentSaveData: FoxSaveData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    gameMode,
    adoptedFox,
    gardenState,
    petCounts,
    timeOfDay,
    season,
    lastActiveTimestamp: Date.now(),
  };

  // Handle Export
  const handleExport = () => {
    try {
      exportSaveToFile(currentSaveData);
      setCopiedStatus('已成功下載存檔 JSON 檔案！');
      playBlessingSound();
      confetti({ particleCount: 30, spread: 60 });
      setTimeout(() => setCopiedStatus(null), 3000);
    } catch {
      setErrorMessage('匯出存檔失敗，請確認瀏覽器權限');
    }
  };

  // Handle Force Immediate LocalStorage Flush
  const handleForceSave = () => {
    persistAllStatesToStorage({
      gameMode,
      adoptedFox,
      gardenState,
      petCounts,
      timeOfDay,
      season,
    });
    setCopiedStatus('已即時同步寫入 LocalStorage！');
    playBlessingSound();
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseSaveFileContent(text);
        onImportSuccess(parsed);
        playBlessingSound();
        confetti({ particleCount: 50, spread: 70 });
        setCopiedStatus('存檔匯入成功！已還原所有靈狐與庭院進度');
        setTimeout(() => {
          onClose();
        }, 1200);
      } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : '存檔檔案解析錯誤');
      }
    };
    reader.readAsText(file);
  };

  // Handle Paste JSON Import
  const handlePasteImport = () => {
    if (!pasteText.trim()) {
      setErrorMessage('請先貼上存檔 JSON 文字內容');
      return;
    }
    try {
      const parsed = parseSaveFileContent(pasteText);
      onImportSuccess(parsed);
      playBlessingSound();
      confetti({ particleCount: 50, spread: 70 });
      setCopiedStatus('存檔匯入成功！已還原進度');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : '貼上的 JSON 格式不正確');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-amber-200 dark:border-stone-800 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xl">
              💾
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-serif">
                靈狐進度備份與存檔管理
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                純前端 LocalStorage 永久存檔 · 支援 JSON 匯出與跨裝置還原
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current State Summary Card */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 space-y-2.5">
          <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              當前存檔快照
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              {new Date().toLocaleDateString('zh-TW')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
              <span className="text-stone-400 text-[10px] block">專屬認領靈狐</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">
                {adoptedFox ? `${adoptedFox.customName} (Lv.${adoptedFox.level})` : '尚未認領'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
              <span className="text-stone-400 text-[10px] block">庭院金幣與訪客</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {gardenState.coins} 金幣 · {gardenState.visitors.length} 訪客
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
              <span className="text-stone-400 text-[10px] block">全體累計撫摸</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {totalPetCount} 次互動
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700">
              <span className="text-stone-400 text-[10px] block">已解鎖靈狐訪客</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {gardenState.unlockedFoxIds.length} 種
              </span>
            </div>
          </div>
        </div>

        {/* Action Status Feedback */}
        {copiedStatus && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{copiedStatus}</span>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-600 underline cursor-pointer"
            >
              關閉
            </button>
          </motion.div>
        )}

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Export JSON Button */}
          <button
            onClick={handleExport}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>匯出存檔 (下載 JSON)</span>
          </button>

          {/* Force Sync LocalStorage */}
          <button
            onClick={handleForceSave}
            className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs border border-stone-300 dark:border-stone-700 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 text-emerald-600" />
            <span>立即寫入 LocalStorage</span>
          </button>
        </div>

        {/* Import JSON Section */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-indigo-500" />
              匯入備份存檔 (JSON)
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileJson className="w-4 h-4 text-indigo-600" />
              <span>選擇電腦／手機 JSON 檔案</span>
            </button>
          </div>

          {/* Or Paste Raw JSON */}
          <details className="text-xs text-stone-500 cursor-pointer">
            <summary className="hover:text-stone-800 dark:hover:text-stone-200 font-medium py-1">
              或直接貼上 JSON 代碼文字
            </summary>
            <div className="mt-2 space-y-2">
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="在此貼上 fox-companion-save-xxxx.json 的完整文字內容..."
                className="w-full h-20 p-2 text-[11px] font-mono rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden"
              />
              <button
                onClick={handlePasteImport}
                className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                確認讀取並套用
              </button>
            </div>
          </details>
        </div>

        {/* Reset Save Section */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-3 flex items-center justify-between text-xs">
          {!isConfirmingReset ? (
            <button
              onClick={() => setIsConfirmingReset(true)}
              className="text-stone-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>重設或清除所有紀錄</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-rose-600 font-bold text-[11px]">確定重設存檔？進度將清空</span>
              <button
                onClick={() => {
                  onResetSave();
                  setIsConfirmingReset(false);
                  onClose();
                }}
                className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px]"
              >
                確定清空
              </button>
              <button
                onClick={() => setIsConfirmingReset(false)}
                className="px-2.5 py-1 rounded-lg bg-stone-200 text-stone-700 font-medium text-[11px]"
              >
                取消
              </button>
            </div>
          )}
          <span className="text-[10px] text-stone-400 font-mono">v1.0 LocalDB</span>
        </div>
      </motion.div>
    </div>
  );
};

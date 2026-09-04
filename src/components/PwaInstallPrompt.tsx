import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Share2, PlusSquare, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsStandalone(true);
      return;
    }

    // Check iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Don't show immediately, wait a few seconds so user experiences the app first
      const timer = setTimeout(() => setShowPrompt(true), 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Register service worker if supported
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {
          // ignore
        });
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-5 right-5 z-40 max-w-sm bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-amber-200 dark:border-amber-900/60 text-stone-800 dark:text-stone-100"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-2xl shadow-inner shrink-0">
              🦊
            </div>
            <div>
              <h4 className="text-xs font-bold font-serif flex items-center gap-1.5">
                <span>安裝至手機/桌面主畫面</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-sans">
                  PWA 離線可用
                </span>
              </h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                如 App 般一鍵秒開，享受零干擾、無網址列的全螢幕療癒陪伴！
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPrompt(false)}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowPrompt(false)}
            className="px-3 py-1.5 rounded-xl text-[11px] text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            稍後再說
          </button>

          {isIOS ? (
            <div className="text-[11px] text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl flex items-center gap-1">
              <span>點擊</span>
              <Share2 className="w-3.5 h-3.5 inline text-amber-600" />
              <span>選「加入主畫面」</span>
              <PlusSquare className="w-3.5 h-3.5 inline text-amber-600" />
            </div>
          ) : (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={handleInstallClick}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>立即安裝</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

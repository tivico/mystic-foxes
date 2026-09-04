import React from 'react';
import { Heart, Sparkles, Compass } from 'lucide-react';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenCrystalBall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz, onOpenCrystalBall }) => {
  return (
    <footer className="mt-16 border-t border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-stone-100 py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-stone-400 text-xs">
          <span>🌿 尊重野生物種</span>
          <span>•</span>
          <span>保護自然棲地</span>
          <span>•</span>
          <span>愛護森林精靈 🐾</span>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          狐狸是自然界中極為靈敏而美麗的生靈，請共同支持野生動物保育與棲地維護，讓荒野與雪原上的小毛球們能永遠自由自在地奔跑。
        </p>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-amber-800 pt-2">
          <button
            type="button"
            onClick={onOpenQuiz}
            className="hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>守護狐測驗</span>
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={onOpenCrystalBall}
            className="hover:underline flex items-center gap-1"
          >
            <span>🔮 冷知識占卜</span>
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:underline flex items-center gap-1 text-stone-500"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>回到頂端</span>
          </button>
        </div>

        <div className="text-[11px] text-stone-400 pt-4 border-t border-stone-200/60">
          奇幻狐狸生態圖鑑 · Crafted with cute cartoon vector aesthetics
        </div>
      </div>
    </footer>
  );
};

import { useState, useEffect, useRef, useCallback } from 'react';

export interface ParallaxOffsets {
  // 遠景 (深林、山巒、遠空微移)
  deepBg: { x: number; y: number };
  // 中景 (神社鳥居、石燈籠、庭院樹籬)
  midground: { x: number; y: number };
  // 主景 (靈狐本體、座墊、互動氣泡)
  foreground: { x: number; y: number; rotateX: number; rotateY: number };
  // 前景近鏡頭景深浮塵與光斑 (Bokeh / Dust Motes，移動幅度最大且略帶微距散焦)
  nearBokeh: { x: number; y: number };
}

interface UseParallaxOptions {
  enabled?: boolean;
  intensity?: number; // 0.5 ~ 2.0
}

/**
 * 繪本動態視差與景深 Hook (Parallax & Depth of Field)
 * 透過 requestAnimationFrame 與平滑阻尼插值 (LERP)，
 * 隨滑鼠或游標掠過時，使多重空間平面產生細緻分層位移，營造繪本立體翻頁感。
 */
export function useParallax(options: UseParallaxOptions = {}) {
  const { enabled = true, intensity = 1.0 } = options;

  const [offsets, setOffsets] = useState<ParallaxOffsets>({
    deepBg: { x: 0, y: 0 },
    midground: { x: 0, y: 0 },
    foreground: { x: 0, y: 0, rotateX: 0, rotateY: 0 },
    nearBokeh: { x: 0, y: 0 },
  });

  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // 滑鼠移動事件監聽
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;
      const width = window.innerWidth || 1000;
      const height = window.innerHeight || 800;

      // 正規化為 -1 到 +1 區間
      const normX = ((e.clientX - width / 2) / (width / 2)) * intensity;
      const normY = ((e.clientY - height / 2) / (height / 2)) * intensity;

      targetRef.current = {
        x: Math.max(-1, Math.min(1, normX)),
        y: Math.max(-1, Math.min(1, normY)),
      };
    },
    [enabled, intensity]
  );

  useEffect(() => {
    if (!enabled) {
      setOffsets({
        deepBg: { x: 0, y: 0 },
        midground: { x: 0, y: 0 },
        foreground: { x: 0, y: 0, rotateX: 0, rotateY: 0 },
        nearBokeh: { x: 0, y: 0 },
      });
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 平滑阻尼運動迴圈 (LERP 阻尼繫數 0.08)
    const updateLoop = () => {
      const lerpFactor = 0.08;
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.x += (tgt.x - cur.x) * lerpFactor;
      cur.y += (tgt.y - cur.y) * lerpFactor;

      setOffsets({
        deepBg: {
          x: Math.round(cur.x * -7 * 10) / 10,
          y: Math.round(cur.y * -5 * 10) / 10,
        },
        midground: {
          x: Math.round(cur.x * -13 * 10) / 10,
          y: Math.round(cur.y * -9 * 10) / 10,
        },
        foreground: {
          x: Math.round(cur.x * 9 * 10) / 10,
          y: Math.round(cur.y * 7 * 10) / 10,
          rotateX: Math.round(-cur.y * 3.5 * 10) / 10,
          rotateY: Math.round(cur.x * 3.5 * 10) / 10,
        },
        nearBokeh: {
          x: Math.round(cur.x * 20 * 10) / 10,
          y: Math.round(cur.y * 16 * 10) / 10,
        },
      });

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, handleMouseMove]);

  return offsets;
}

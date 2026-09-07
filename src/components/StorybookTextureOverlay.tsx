import React from 'react';

export type TextureStyle = 'paper' | 'grain' | 'none';

interface StorybookTextureOverlayProps {
  texture: TextureStyle;
  isFullscreen?: boolean;
}

/**
 * 繪本光影質感層：水彩厚磅手揉紙 (Paper Texture) 與 經典底片微粒 (Film Grain)
 * 純向量 SVG Filter 渲染，零網路傳輸、GPU 高性能加速、極弱透明度兼顧清晰度與頂級手感
 */
export const StorybookTextureOverlay: React.FC<StorybookTextureOverlayProps> = ({
  texture,
  isFullscreen = false,
}) => {
  if (texture === 'none') return null;

  // 全螢幕或沉浸模式下微幅增加質感呈現
  const baseOpacity = texture === 'paper' ? (isFullscreen ? 'opacity-35' : 'opacity-25') : (isFullscreen ? 'opacity-30' : 'opacity-20');

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-700 ${baseOpacity}`}
      style={{
        // 柔和疊加混合模式，光影深邃而不影響文字可讀性
        mixBlendMode: 'overlay',
      }}
    >
      {/* 隱藏式高精度 SVG 濾鏡生成器 */}
      <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
        <defs>
          {/* 水彩厚磅手揉紙紋理 (Watercolor Washi Paper Fibers) */}
          <filter id="storybook-paper-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="4"
              result="paperNoise"
            />
            <feDiffuseLighting
              in="paperNoise"
              lightingColor="#fffdfa"
              surfaceScale="1.4"
              result="light"
            >
              <feDistantLight azimuth="60" elevation="55" />
            </feDiffuseLighting>
            <feBlend mode="multiply" in="SourceGraphic" in2="light" />
          </filter>

          {/* 35mm 經典膠捲微粒 (Analog Cinematic Film Grain) */}
          <filter id="storybook-film-grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
              result="filmNoise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.8 0"
            />
          </filter>
        </defs>
      </svg>

      {/* 物理紋理繪製層 */}
      {texture === 'paper' ? (
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 252, 245, 0.2) 0%, rgba(240, 230, 215, 0.35) 100%), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '240px 240px',
          }}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainFilter)' opacity='0.45'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '160px 160px',
          }}
        />
      )}
    </div>
  );
};

// Web Audio API synthesized sounds for petting and fox vocalizations
// No external mp3 files required, works instantly offline and across devices.

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch (err) {
    console.warn('Web Audio not supported or blocked:', err);
    return null;
  }
}

/**
 * Plays an adorable species-specific happy sound effect when the fox is petted!
 */
export function playPettingSound(foxId: string): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  switch (foxId) {
    case 'fennec-fox': {
      // 耳廓狐：超高頻水靈清脆的萌幼崽唧唧聲 (High-pitch baby squeaks)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1100, now);
      osc1.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
      osc1.frequency.exponentialRampToValueAtTime(1300, now + 0.16);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.19);

      // Second soft companion chirp
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1400, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(1900, now + 0.2);
      osc2.frequency.exponentialRampToValueAtTime(1500, now + 0.3);
      gain2.gain.setValueAtTime(0.14, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.33);
      break;
    }

    case 'arctic-fox': {
      // 北極狐：雪球般輕柔的呼嚕與冰晶雙音微光 (Gentle snowy purr & crystal chime)
      [659.25, 880, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.1, now + i * 0.07 + 0.15);
        gain.gain.setValueAtTime(0.12, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.3);
      });
      break;
    }

    case 'tibetan-fox': {
      // 藏狐：沉穩、呆萌且佛系的低頻嘟嚕聲 (Deadpan comedic boop-purr)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(290, now + 0.32);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);

      // Low warm tail-thump undertone
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(140, now + 0.05);
      subGain.gain.setValueAtTime(0.15, now + 0.05);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(now + 0.05);
      sub.stop(now + 0.26);
      break;
    }

    case 'starfall-fox': {
      // 星月夜狐：夢幻星塵流光琶音 (Dreamy cosmic stardust chime)
      const notes = [587.33, 739.99, 880, 1174.66, 1479.98];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.5);
      });
      break;
    }

    case 'celestial-kitsune': {
      // 九尾仙狐：朱砂神社風鈴與仙靈和弦 (Sacred shrine chime & mystic harmonics)
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.1, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.65);
      });
      break;
    }

    case 'gray-fox': {
      // 灰狐：敏捷俏皮的樹梢鳥語式咕嚕啁啾 (Agile forest chirrup)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(680, now);
      osc1.frequency.linearRampToValueAtTime(950, now + 0.09);
      osc1.frequency.linearRampToValueAtTime(780, now + 0.18);
      gain1.gain.setValueAtTime(0.16, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.23);
      break;
    }

    case 'bat-eared-fox': {
      // 大耳狐：好奇蝠耳微音顫鳴 (Curious fluttery echo)
      [750, 920, 850].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.18);
      });
      break;
    }

    case 'maned-wolf': {
      // 南美鬃狼：深沉宏大的低頻吼吠 (Deep resonant roar-bark)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    }

    case 'blue-fox': {
      // 藍狐：北大西洋岩岸海風呼嚕聲 (Oceanic slate purr)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }

    case 'corsac-fox': {
      // 沙狐：開闊草原雙音跳躍鳴叫 (Steppe double chirp)
      [680, 860].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + idx * 0.09 + 0.08);
        gain.gain.setValueAtTime(0.14, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.16);
      });
      break;
    }

    case 'darwins-fox': {
      // 達爾文狐：極度軟萌害羞的幼細啁啾 (Delicate mossy chirp)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(1300, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
      break;
    }

    case 'inari-fox': {
      // 稻荷神使·白狐：清靈神社神樂鈴與朱砂和弦 (Shrine Kagura bell chord)
      [587.33, 739.99, 880, 1174.66].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.1, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.6);
      });
      break;
    }

    case 'kitsunebi-fox': {
      // 狐火靈狐：飄渺冷光與幽火微裂音 (Ethereal wisp & chime)
      const notes = [659.25, 830.61, 987.77];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.08, now + idx * 0.06 + 0.2);
        gain.gain.setValueAtTime(0.09, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.5);
      });
      break;
    }

    case 'reynard-fox': {
      // 智狐雷納德：風趣機警的兩段式紳士笑聲 (Witty gentleman chirp)
      [580, 780, 680].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.14, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.13);
      });
      break;
    }

    case 'yakan-fox': {
      // 野干神狐：古剎深沉頌缽梵音 (Ancient bronze bell resonance)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
      break;
    }

    case 'celestial-tenko': {
      // 金狐天狐：金光普照太虛梵天音 (Radiant golden chime)
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.11, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.75);
      });
      break;
    }

    case 'lunar-fox': {
      // 幽夜月狐：如月光水波般溫柔的安眠和弦 (Lunar solace soft wave)
      [440, 523.25, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.1, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.65);
      });
      break;
    }

    case 'red-fox':
    default: {
      // 赤狐：招牌歡樂小狐叫「咔咔咕嚕嚕！」(Joyful playful fox purr-giggle)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(780, now + 0.09);
      osc1.frequency.exponentialRampToValueAtTime(620, now + 0.18);
      gain1.gain.setValueAtTime(0.16, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.21);

      // Follow-up happy chirp
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(720, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(960, now + 0.2);
      osc2.frequency.exponentialRampToValueAtTime(840, now + 0.28);
      gain2.gain.setValueAtTime(0.15, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.33);
      break;
    }
  }
}

/** 2. 餵食咀嚼與歡快吞嚥音 */
export function playFeedSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Munch crunch 1
  [0, 0.09, 0.18].forEach((offset, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450 + idx * 80, now + offset);
    osc.frequency.exponentialRampToValueAtTime(200, now + offset + 0.06);
    gain.gain.setValueAtTime(0.16, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + offset);
    osc.stop(now + offset + 0.08);
  });

  // Gulp / happy chime
  const gulp = ctx.createOscillator();
  const gulpGain = ctx.createGain();
  gulp.type = 'sine';
  gulp.frequency.setValueAtTime(320, now + 0.28);
  gulp.frequency.exponentialRampToValueAtTime(580, now + 0.38);
  gulpGain.gain.setValueAtTime(0.14, now + 0.28);
  gulpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  gulp.connect(gulpGain);
  gulpGain.connect(ctx.destination);
  gulp.start(now + 0.28);
  gulp.stop(now + 0.46);
}

/** 3. 輕柔梳毛柔和風聲與蓬鬆閃光音 */
export function playBrushSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  [880, 1174.66, 1318.51].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
    gain.gain.setValueAtTime(0.1, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.38);
  });
}

/** 4. 丟球逗狐撲跳彈跳聲 */
export function playToySound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Squeak
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(980, now);
  osc.frequency.exponentialRampToValueAtTime(1480, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(1100, now + 0.16);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.19);

  // Bounce Boing
  const boing = ctx.createOscillator();
  const boingGain = ctx.createGain();
  boing.type = 'sine';
  boing.frequency.setValueAtTime(320, now + 0.14);
  boing.frequency.exponentialRampToValueAtTime(680, now + 0.26);
  boingGain.gain.setValueAtTime(0.15, now + 0.14);
  boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
  boing.connect(boingGain);
  boingGain.connect(ctx.destination);
  boing.start(now + 0.14);
  boing.stop(now + 0.4);
}

/** 5. 溫泉泡湯水泡與療癒水花音 */
export function playBathSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  [520, 680, 840, 600].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.09);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + idx * 0.09 + 0.08);
    gain.gain.setValueAtTime(0.1, now + idx * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.09);
    osc.stop(now + idx * 0.09 + 0.2);
  });
}

/** 6. 八音盒安睡搖籃曲 */
export function playLullabySound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const notes = [659.25, 587.33, 523.25, 659.25, 783.99]; // E5, D5, C5, E5, G5
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.22);
    gain.gain.setValueAtTime(0.12, now + idx * 0.22);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.22 + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.22);
    osc.stop(now + idx * 0.22 + 0.65);
  });
}

/** 7. 後山探險發現寶物凱旋音 */
export function playAdventureFanfare(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.1);
    gain.gain.setValueAtTime(0.14, now + idx * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + (idx === 3 ? 0.6 : 0.25));
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.1);
    osc.stop(now + idx * 0.1 + (idx === 3 ? 0.65 : 0.28));
  });
}

/** 8. 神社靈力祈福仙靈鐘磬和弦 */
export function playBlessingSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Deep bell
  const bell = ctx.createOscillator();
  const bellGain = ctx.createGain();
  bell.type = 'sine';
  bell.frequency.setValueAtTime(220, now);
  bellGain.gain.setValueAtTime(0.25, now);
  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
  bell.connect(bellGain);
  bellGain.connect(ctx.destination);
  bell.start(now);
  bell.stop(now + 1.25);

  // Mystic harmonics
  [440, 659.25, 880, 1318.51].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
    gain.gain.setValueAtTime(0.1, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.95);
  });
}

/** 9. 換裝打扮布料與魔力閃亮音 */
export function playDressSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  [783.99, 987.77, 1174.66, 1567.98].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.07);
    gain.gain.setValueAtTime(0.12, now + idx * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.07);
    osc.stop(now + idx * 0.07 + 0.32);
  });
}

/** 10. 拍立得快門咔嚓聲 */
export function playCameraSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Shutter click 1
  const click1 = ctx.createOscillator();
  const clickGain1 = ctx.createGain();
  click1.type = 'square';
  click1.frequency.setValueAtTime(1200, now);
  clickGain1.gain.setValueAtTime(0.15, now);
  clickGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
  click1.connect(clickGain1);
  clickGain1.connect(ctx.destination);
  click1.start(now);
  click1.stop(now + 0.04);

  // Mechanical Whir / flash
  const whir = ctx.createOscillator();
  const whirGain = ctx.createGain();
  whir.type = 'triangle';
  whir.frequency.setValueAtTime(400, now + 0.08);
  whir.frequency.linearRampToValueAtTime(700, now + 0.22);
  whirGain.gain.setValueAtTime(0.1, now + 0.08);
  whirGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
  whir.connect(whirGain);
  whirGain.connect(ctx.destination);
  whir.start(now + 0.08);
  whir.stop(now + 0.28);
}

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

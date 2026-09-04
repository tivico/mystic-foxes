// Pure Web Audio API Ambient Sound Synthesizer
// Zero external assets, zero network traffic, 100% offline & royalty-free

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning = false;

  // Track nodes
  private breezeGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private campfireGain: GainNode | null = null;
  private cricketsGain: GainNode | null = null;
  private chimesGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  // Timers for intermittent sounds
  private campfireTimer: number | null = null;
  private cricketsTimer: number | null = null;
  private chimesTimer: number | null = null;

  // Ensure AudioContext is initialized on user gesture
  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  // 1. Forest Breeze: Pink noise filtered with an LFO for natural wind gusts
  private createBreezeNode(): GainNode | null {
    if (!this.ctx || !this.masterGain) return null;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to sound like soft foliage wind
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // Subtle LFO for wind swelling
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(160, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    lfo.start();
    return gain;
  }

  // 2. Gentle Rain: High-frequency filtered noise with gentle droplet texture
  private createRainNode(): GainNode | null {
    if (!this.ctx || !this.masterGain) return null;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.12;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1200, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(0.8, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    return gain;
  }

  // 3. Campfire Crackle: Warm low-end rumble + intermittent wooden pop snaps
  private createCampfireNode(): GainNode | null {
    if (!this.ctx || !this.masterGain) return null;

    // Low rumble
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(55, this.ctx.currentTime);

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(120, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);

    osc.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.masterGain);
    osc.start();

    // Trigger intermittent crackles
    const scheduleCrackles = () => {
      if (!this.isRunning || !this.ctx || !gain) return;
      const crackleGain = gain.gain.value;
      if (crackleGain > 0.01) {
        this.playSingleCrackle(crackleGain);
      }
      const nextDelay = 150 + Math.random() * 800;
      this.campfireTimer = window.setTimeout(scheduleCrackles, nextDelay);
    };
    this.campfireTimer = window.setTimeout(scheduleCrackles, 300);

    return gain;
  }

  private playSingleCrackle(volumeRatio: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300 + Math.random() * 900, now);

      popGain.gain.setValueAtTime(0.12 * volumeRatio, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03 + Math.random() * 0.05);

      osc.connect(popGain);
      popGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // safe ignore
    }
  }

  // 4. Night Crickets: Rhythmic FM chirp bursts
  private createCricketsNode(): GainNode | null {
    if (!this.ctx || !this.masterGain) return null;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.connect(this.masterGain);

    const scheduleCrickets = () => {
      if (!this.isRunning || !this.ctx || !gain) return;
      const currentVol = gain.gain.value;
      if (currentVol > 0.01) {
        this.playCricketChirp(currentVol);
      }
      const nextInterval = 800 + Math.random() * 1600;
      this.cricketsTimer = window.setTimeout(scheduleCrickets, nextInterval);
    };
    this.cricketsTimer = window.setTimeout(scheduleCrickets, 400);

    return gain;
  }

  private playCricketChirp(volumeRatio: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const chirps = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < chirps; i++) {
        const chirpStart = now + i * 0.09;
        const osc = this.ctx.createOscillator();
        const chirpGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(4500 + Math.random() * 400, chirpStart);

        chirpGain.gain.setValueAtTime(0.001, chirpStart);
        chirpGain.gain.linearRampToValueAtTime(0.06 * volumeRatio, chirpStart + 0.02);
        chirpGain.gain.exponentialRampToValueAtTime(0.001, chirpStart + 0.06);

        osc.connect(chirpGain);
        chirpGain.connect(this.masterGain);

        osc.start(chirpStart);
        osc.stop(chirpStart + 0.07);
      }
    } catch {
      // safe ignore
    }
  }

  // 5. Meditative Zen Chimes: Gentle harmonic Pentatonic tones (E4, G4, A4, B4, D5, E5)
  private createChimesNode(): GainNode | null {
    if (!this.ctx || !this.masterGain) return null;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.connect(this.masterGain);

    const notes = [329.63, 392.0, 440.0, 493.88, 587.33, 659.25]; // E minor pentatonic

    const scheduleChime = () => {
      if (!this.isRunning || !this.ctx || !gain) return;
      const currentVol = gain.gain.value;
      if (currentVol > 0.01) {
        const freq = notes[Math.floor(Math.random() * notes.length)];
        this.playSingleChime(freq, currentVol);
      }
      const nextDelay = 3500 + Math.random() * 4000;
      this.chimesTimer = window.setTimeout(scheduleChime, nextDelay);
    };
    this.chimesTimer = window.setTimeout(scheduleChime, 1500);

    return gain;
  }

  private playSingleChime(freq: number, volumeRatio: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      // Fundamental
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Overharmonic
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.76, now);

      chimeGain.gain.setValueAtTime(0.0001, now);
      chimeGain.gain.linearRampToValueAtTime(0.08 * volumeRatio, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc1.connect(chimeGain);
      osc2.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 4.0);
      osc2.stop(now + 4.0);
    } catch {
      // safe ignore
    }
  }

  // Public API to set individual channel volumes (0.0 to 1.0)
  public setVolume(channel: 'breeze' | 'rain' | 'campfire' | 'crickets' | 'chimes', volume: number) {
    this.initContext();
    this.isRunning = true;
    const safeVol = Math.max(0, Math.min(1, volume));

    if (this.ctx) {
      const now = this.ctx.currentTime;

      if (channel === 'breeze') {
        if (!this.breezeGain) this.breezeGain = this.createBreezeNode();
        if (this.breezeGain) this.breezeGain.gain.setTargetAtTime(safeVol * 0.7, now, 0.2);
      } else if (channel === 'rain') {
        if (!this.rainGain) this.rainGain = this.createRainNode();
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(safeVol * 0.6, now, 0.2);
      } else if (channel === 'campfire') {
        if (!this.campfireGain) this.campfireGain = this.createCampfireNode();
        if (this.campfireGain) this.campfireGain.gain.setTargetAtTime(safeVol * 0.7, now, 0.2);
      } else if (channel === 'crickets') {
        if (!this.cricketsGain) this.cricketsGain = this.createCricketsNode();
        if (this.cricketsGain) this.cricketsGain.gain.setTargetAtTime(safeVol * 0.5, now, 0.2);
      } else if (channel === 'chimes') {
        if (!this.chimesGain) this.chimesGain = this.createChimesNode();
        if (this.chimesGain) this.chimesGain.gain.setTargetAtTime(safeVol * 0.6, now, 0.2);
      }
    }
  }

  // Master mute or pause
  public stopAll() {
    this.isRunning = false;
    if (this.campfireTimer) clearTimeout(this.campfireTimer);
    if (this.cricketsTimer) clearTimeout(this.cricketsTimer);
    if (this.chimesTimer) clearTimeout(this.chimesTimer);

    if (this.ctx) {
      const now = this.ctx.currentTime;
      [this.breezeGain, this.rainGain, this.campfireGain, this.cricketsGain, this.chimesGain].forEach((g) => {
        if (g) g.gain.setTargetAtTime(0, now, 0.1);
      });
    }
  }
}

export const ambientSoundEngine = new AmbientSoundEngine();

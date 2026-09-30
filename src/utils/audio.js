// Web Audio API ambient soundscape and tactile audio feedback

let audioCtx = null;
let ambientGain = null;
let ambientOsc = null;
let ambientNoise = null;
let isAmbiencePlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle dry paper / wood tap feedback
export function playCardSelect() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Warm wooden tap / parchment click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Ignore audio restrictions
  }
}

// Low distant gothic church bell / iron chime for result reveal
export function playChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [146.83, 220, 293.66]; // D3 chord harmonic

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const initialVolume = 0.04 / (idx + 1);
      gain.gain.setValueAtTime(initialVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.03);
      osc.stop(now + 2.6);
    });
  } catch {
    // Ignore
  }
}

// Subtle ambient low wind hum (optional user toggle)
export function toggleAmbience() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (isAmbiencePlaying) {
      if (ambientGain) {
        ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      }
      setTimeout(() => {
        if (ambientOsc) {
          try { ambientOsc.stop(); } catch {}
          ambientOsc = null;
        }
        if (ambientNoise) {
          try { ambientNoise.stop(); } catch {}
          ambientNoise = null;
        }
      }, 500);
      isAmbiencePlaying = false;
      return false;
    } else {
      const now = ctx.currentTime;
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.0001, now);
      ambientGain.gain.exponentialRampToValueAtTime(0.025, now + 1.2);

      // Low sub drone
      ambientOsc = ctx.createOscillator();
      ambientOsc.type = 'sine';
      ambientOsc.frequency.setValueAtTime(55, now); // A1 note
      ambientOsc.connect(ambientGain);
      ambientOsc.start(now);

      ambientGain.connect(ctx.destination);
      isAmbiencePlaying = true;
      return true;
    }
  } catch {
    return false;
  }
}

export function isAudioActive() {
  return isAmbiencePlaying;
}

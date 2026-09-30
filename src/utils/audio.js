// Web Audio API Cinematic Horror Ambient BGM & Sound Engine
// Zero external assets required — procedural, seamless, zero-latency dark horror soundtrack

let audioCtx = null;
let masterGain = null;
let compressor = null;
let delayNode = null;
let delayFeedback = null;
let delayFilter = null;

// Trackers for active synthesized sound layers
let droneGain = null;
let droneOscs = [];
let droneLFOs = [];

let windSource = null;
let windGain = null;
let windFilter = null;
let windLFO = null;

let heartbeatTimer = null;
let bellTimer = null;

let isPlaying = false;
let userMutedExplicitly = false;
let currentStage = 'landing'; // 'landing' | 'quiz' | 'result'
const stateListeners = new Set();

function notifyListeners() {
  stateListeners.forEach((fn) => {
    try {
      fn(isPlaying);
    } catch {}
  });
}

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

// Master bus with compression and gothic reverb-delay network
function setupMasterBus(ctx) {
  if (masterGain && compressor) return;

  // Master Gain
  masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);

  // Dynamics Compressor for filmic mastering (glues dark low-end without clipping)
  compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-14, ctx.currentTime);
  compressor.knee.setValueAtTime(12, ctx.currentTime);
  compressor.ratio.setValueAtTime(6, ctx.currentTime);
  compressor.attack.setValueAtTime(0.005, ctx.currentTime);
  compressor.release.setValueAtTime(0.25, ctx.currentTime);

  // Gothic cathedral space delay/echo bus
  delayNode = ctx.createDelay();
  delayNode.delayTime.setValueAtTime(0.38, ctx.currentTime);

  delayFeedback = ctx.createGain();
  delayFeedback.gain.setValueAtTime(0.42, ctx.currentTime);

  delayFilter = ctx.createBiquadFilter();
  delayFilter.type = 'lowpass';
  delayFilter.frequency.setValueAtTime(1400, ctx.currentTime);

  // Reverb/Delay loop
  delayNode.connect(delayFilter);
  delayFilter.connect(delayFeedback);
  delayFeedback.connect(delayNode);
  delayFilter.connect(masterGain);

  masterGain.connect(compressor);
  compressor.connect(ctx.destination);
}

// Procedural Pink/Brown Noise buffer for spectral night wind
function createNoiseBuffer(ctx) {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown noise integration for heavy deep wind rumble
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.2; // Gain normalization
  }
  return buffer;
}

// Start Night Wind Sound Generator
function startWindLayer(ctx) {
  if (windSource) return;

  const noiseBuffer = createNoiseBuffer(ctx);
  windSource = ctx.createBufferSource();
  windSource.buffer = noiseBuffer;
  windSource.loop = true;

  windFilter = ctx.createBiquadFilter();
  windFilter.type = 'bandpass';
  windFilter.frequency.setValueAtTime(420, ctx.currentTime);
  windFilter.Q.setValueAtTime(2.8, ctx.currentTime);

  windGain = ctx.createGain();
  windGain.gain.setValueAtTime(0.035, ctx.currentTime);

  // LFO to sweep wind frequency (whistling wind gusts)
  windLFO = ctx.createOscillator();
  windLFO.frequency.setValueAtTime(0.07, ctx.currentTime);
  const windLFOGain = ctx.createGain();
  windLFOGain.gain.setValueAtTime(260, ctx.currentTime);

  windLFO.connect(windLFOGain);
  windLFOGain.connect(windFilter.frequency);

  windSource.connect(windFilter);
  windFilter.connect(windGain);
  windGain.connect(masterGain);

  windSource.start();
  windLFO.start();
}

function stopWindLayer() {
  if (windSource) {
    try { windSource.stop(); } catch {}
    windSource.disconnect();
    windSource = null;
  }
  if (windLFO) {
    try { windLFO.stop(); } catch {}
    windLFO.disconnect();
    windLFO = null;
  }
  if (windGain) {
    windGain.disconnect();
    windGain = null;
  }
}

// Start Multi-Oscillator Dark Drone Pad (D-minor / A-minor cluster)
function startDroneLayer(ctx) {
  if (droneOscs.length > 0) return;

  droneGain = ctx.createGain();
  droneGain.gain.setValueAtTime(0.07, ctx.currentTime);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(140, ctx.currentTime);
  filter.Q.setValueAtTime(3.8, ctx.currentTime);

  // Filter sweep LFO for breathing darkness
  const filterLFO = ctx.createOscillator();
  filterLFO.frequency.setValueAtTime(0.05, ctx.currentTime);
  const filterLFOGain = ctx.createGain();
  filterLFOGain.gain.setValueAtTime(70, ctx.currentTime);
  filterLFO.connect(filterLFOGain);
  filterLFOGain.connect(filter.frequency);
  filterLFO.start();
  droneLFOs.push(filterLFO);

  // Detuned horror cluster: D1 (36.7Hz), A1 (55Hz), D2 (73.4Hz), F2 (87.3Hz)
  const tones = [
    { freq: 36.7, type: 'sine', detune: 0, gain: 0.12 },
    { freq: 55.0, type: 'triangle', detune: -4, gain: 0.08 },
    { freq: 73.4, type: 'sawtooth', detune: +5, gain: 0.04 },
    { freq: 87.3, type: 'triangle', detune: +2, gain: 0.05 },
  ];

  tones.forEach((t) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();

    osc.type = t.type;
    osc.frequency.setValueAtTime(t.freq, ctx.currentTime);
    osc.detune.setValueAtTime(t.detune, ctx.currentTime);

    g.gain.setValueAtTime(t.gain, ctx.currentTime);

    osc.connect(g);
    g.connect(filter);

    osc.start();
    droneOscs.push(osc);
  });

  filter.connect(droneGain);
  droneGain.connect(masterGain);
}

function stopDroneLayer() {
  droneOscs.forEach((osc) => {
    try { osc.stop(); } catch {}
    osc.disconnect();
  });
  droneOscs = [];

  droneLFOs.forEach((lfo) => {
    try { lfo.stop(); } catch {}
    lfo.disconnect();
  });
  droneLFOs = [];

  if (droneGain) {
    droneGain.disconnect();
    droneGain = null;
  }
}

// Subterranean Heartbeat pulse (Lub-Dub every ~1.35s)
function playHeartbeatHit(ctx, isSecondHit = false) {
  if (!isPlaying) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const baseFreq = isSecondHit ? 42 : 48;
  osc.type = 'sine';
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(26, now + 0.14);

  // Heartbeat is more prominent during quiz tension
  const vol = currentStage === 'quiz' ? 0.09 : 0.035;
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.16);
}

function startHeartbeatLoop(ctx) {
  if (heartbeatTimer) clearInterval(heartbeatTimer);

  heartbeatTimer = setInterval(() => {
    if (!isPlaying) return;
    playHeartbeatHit(ctx, false);
    setTimeout(() => {
      if (isPlaying) playHeartbeatHit(ctx, true);
    }, 280);
  }, 1380);
}

function stopHeartbeatLoop() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

// Procedural Eerie Gothic Bell / High Harmonic Shimmer
function playGothicBell(ctx) {
  if (!isPlaying) return;
  const now = ctx.currentTime;

  // Gothic minor scale frequencies: D4, F4, G#4, A4, C5, D5
  const scale = [293.66, 349.23, 415.3, 440.0, 523.25, 587.33];
  const rootFreq = scale[Math.floor(Math.random() * scale.length)];

  // Partial harmonic multiples for realistic gothic cast-iron church bell resonance
  const partials = [
    { mult: 1.0, decay: 4.5, gain: 0.02 },
    { mult: 2.76, decay: 3.2, gain: 0.012 },
    { mult: 5.4, decay: 1.8, gain: 0.006 },
  ];

  partials.forEach((p) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(rootFreq * p.mult, now);

    gain.gain.setValueAtTime(p.gain, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

    osc.connect(gain);
    gain.connect(masterGain);
    if (delayNode) {
      gain.connect(delayNode); // Send to reverb delay for eerie cathedral space
    }

    osc.start(now);
    osc.stop(now + p.decay + 0.1);
  });
}

function startBellLoop(ctx) {
  if (bellTimer) clearTimeout(bellTimer);

  const scheduleNextBell = () => {
    if (!isPlaying) return;
    // Bell tolls every 8-15 seconds
    const delayMs = 8000 + Math.random() * 7000;
    bellTimer = setTimeout(() => {
      if (isPlaying) {
        playGothicBell(ctx);
        scheduleNextBell();
      }
    }, delayMs);
  };

  scheduleNextBell();
}

function stopBellLoop() {
  if (bellTimer) {
    clearTimeout(bellTimer);
    bellTimer = null;
  }
}

// ============================================================================
// PUBLIC API FOR APP COMPONENTS
// ============================================================================

/**
 * Start or resume the procedural horror BGM soundtrack
 */
export function startBGM() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    setupMasterBus(ctx);

    if (!isPlaying) {
      isPlaying = true;
      userMutedExplicitly = false;

      startDroneLayer(ctx);
      startWindLayer(ctx);
      startHeartbeatLoop(ctx);
      startBellLoop(ctx);

      // Smooth fade-in of master gain to prevent pops
      const now = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value || 0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.18, now + 1.6);

      notifyListeners();
    }
    return true;
  } catch (err) {
    console.warn("Audio start prevented:", err);
    return false;
  }
}

/**
 * Stop or fade out the BGM soundtrack
 */
export function stopBGM(isExplicitUserMute = true) {
  if (isExplicitUserMute) {
    userMutedExplicitly = true;
  }

  if (!isPlaying || !audioCtx || !masterGain) {
    isPlaying = false;
    notifyListeners();
    return false;
  }

  try {
    const now = audioCtx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      stopDroneLayer();
      stopWindLayer();
      stopHeartbeatLoop();
      stopBellLoop();
      isPlaying = false;
      notifyListeners();
    }, 1250);

    return false;
  } catch {
    isPlaying = false;
    notifyListeners();
    return false;
  }
}

/**
 * Toggle BGM on / off
 */
export function toggleAmbience() {
  if (isPlaying) {
    return stopBGM(true);
  } else {
    return startBGM();
  }
}

export function isAudioActive() {
  return isPlaying;
}

export function hasUserMuted() {
  return userMutedExplicitly;
}

export function subscribeAudioState(fn) {
  stateListeners.add(fn);
  fn(isPlaying);
  return () => stateListeners.delete(fn);
}

/**
 * Adapt the soundtrack dynamically according to app stage
 * @param {'landing' | 'quiz' | 'result'} stage
 */
export function setAudioStage(stage) {
  currentStage = stage;
  if (!isPlaying || !audioCtx || !droneGain) return;

  const now = audioCtx.currentTime;
  if (stage === 'landing') {
    droneGain.gain.setTargetAtTime(0.07, now, 0.8);
    if (windGain) windGain.gain.setTargetAtTime(0.035, now, 0.8);
  } else if (stage === 'quiz') {
    droneGain.gain.setTargetAtTime(0.09, now, 0.8);
    if (windGain) windGain.gain.setTargetAtTime(0.045, now, 0.8);
  } else if (stage === 'result') {
    droneGain.gain.setTargetAtTime(0.12, now, 0.5);
    if (windGain) windGain.gain.setTargetAtTime(0.025, now, 0.5);
  }
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

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(36, now + 0.07);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, now);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {}
}

// Question transition whoosh
export function playQuestionTransition() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.4);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  } catch {}
}

// Low distant gothic church bell / iron chime for result reveal
export function playChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [146.83, 220, 293.66, 369.99]; // D minor chord harmonic

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const initialVolume = 0.06 / (idx + 1);
      gain.gain.setValueAtTime(initialVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(masterGain || ctx.destination);

      if (delayNode) {
        gain.connect(delayNode);
      }

      osc.start(now + idx * 0.04);
      osc.stop(now + 3.3);
    });
  } catch {}
}

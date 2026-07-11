// ===== AUDIO MANAGER =====
// Music via looping HTML5 Audio elements; SFX procedurally generated below.

// Track name -> file. Add new songs here (source lives in Music/, runtime copy
// in assets/audio/music/).
const MUSIC_TRACKS = {
    underworld: 'assets/audio/music/underworld.wav'
};

// Map id -> track name. Maps without an entry are silent (island theme TBD).
const MAP_MUSIC = {
    underground: 'underworld'
};

let audioManager = {
    musicVolume: 0.5,
    sfxVolume: 0.7,
    muted: false,
    currentTrack: null,
    musicEl: null,
    audioCtx: null,

    init: function() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) this.audioCtx = new AudioContext();
        }
    },

    ensureCtx: function() {
        this.init();
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        return this.audioCtx;
    },

    playMusic: function(trackName) {
        if (this.currentTrack === trackName) return;
        this.stopMusic();
        this.currentTrack = trackName;
        const src = MUSIC_TRACKS[trackName];
        if (!src) return;
        const el = new Audio(src);
        el.loop = true;
        el.volume = this.musicVolume;
        this.musicEl = el;
        // play() can reject before the first user gesture; music will start on
        // the next map travel (always keyboard-triggered), so ignore it.
        if (!this.muted) el.play().catch(() => {});
    },

    stopMusic: function() {
        if (this.musicEl) {
            this.musicEl.pause();
            this.musicEl = null;
        }
        this.currentTrack = null;
    },

    // Play whatever the given map should sound like. Called on map travel.
    updateMapMusic: function(mapId) {
        const track = MAP_MUSIC[mapId];
        if (track) this.playMusic(track);
        else this.stopMusic();
    },

    // Short white-noise burst through a lowpass — water, dirt, rustles.
    playNoise: function(ctx, when, dur, cutoffHz, peakGain) {
        const len = Math.ceil(ctx.sampleRate * dur);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = cutoffHz;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, when);
        gain.gain.linearRampToValueAtTime(peakGain, when + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        src.start(when);
        src.stop(when + dur);
    },

    // One short enveloped oscillator note — building block for the tonal SFX.
    playTone: function(ctx, when, dur, type, f0, f1, peakGain) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f0, when);
        if (f1 && f1 !== f0) osc.frequency.exponentialRampToValueAtTime(f1, when + dur * 0.8);
        gain.gain.setValueAtTime(0, when);
        gain.gain.linearRampToValueAtTime(peakGain, when + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(when);
        osc.stop(when + dur + 0.01);
    },

    // Play a procedurally generated sound effect.
    // Ambient: 'chirp' (bird), 'cicada' (buzzy), 'oink' (hog).
    // Feedback: 'harvest', 'craft', 'splash', 'chime', 'door', 'blip',
    //           'plant', 'click'.
    playSFX: function(sfxName, volumeScale = 1) {
        if (this.muted) return;
        const ctx = this.ensureCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const master = this.sfxVolume * volumeScale;
        switch (sfxName) {
            case 'chirp': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2200 + Math.random() * 1200, now);
                osc.frequency.exponentialRampToValueAtTime(2800 + Math.random() * 800, now + 0.08);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.05 * master, now + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.16);
                break;
            }
            case 'cicada': {
                const carrier = ctx.createOscillator();
                const mod = ctx.createOscillator();
                const modGain = ctx.createGain();
                const gain = ctx.createGain();
                carrier.type = 'sawtooth';
                carrier.frequency.value = 4200;
                mod.type = 'sine';
                mod.frequency.value = 35 + Math.random() * 10;
                modGain.gain.value = 400;
                carrier.connect(gain);
                mod.connect(modGain);
                modGain.connect(carrier.frequency);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.04 * master, now + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                carrier.connect(gain);
                gain.connect(ctx.destination);
                carrier.start(now);
                mod.start(now);
                carrier.stop(now + 0.45);
                mod.stop(now + 0.45);
                break;
            }
            case 'oink': {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.linearRampToValueAtTime(140, now + 0.2);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.12 * master, now + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.36);
                break;
            }
            case 'harvest': // quick pluck as resources come loose
                this.playTone(ctx, now, 0.12, 'triangle', 420, 180, 0.10 * master);
                break;
            case 'craft': // two-tap workbench tink
                this.playTone(ctx, now, 0.07, 'square', 520, 520, 0.05 * master);
                this.playTone(ctx, now + 0.09, 0.09, 'square', 780, 780, 0.05 * master);
                break;
            case 'splash': // the gettin' line hits something
                this.playNoise(ctx, now, 0.28, 900, 0.14 * master);
                this.playTone(ctx, now, 0.10, 'sine', 300, 130, 0.06 * master);
                break;
            case 'chime': // quest complete — little ascending sparkle
                this.playTone(ctx, now, 0.18, 'sine', 660, 660, 0.08 * master);
                this.playTone(ctx, now + 0.12, 0.30, 'sine', 880, 880, 0.08 * master);
                break;
            case 'door': // soft thud crossing a threshold
                this.playTone(ctx, now, 0.14, 'sine', 150, 85, 0.14 * master);
                break;
            case 'blip': // a neighbor starts talking
                this.playTone(ctx, now, 0.05, 'sine', 750, 900, 0.06 * master);
                break;
            case 'plant': // seed patted into soil
                this.playNoise(ctx, now, 0.09, 400, 0.10 * master);
                break;
            case 'click': // UI tick
                this.playTone(ctx, now, 0.03, 'square', 1100, 1100, 0.03 * master);
                break;
        }
    },

    setMusicVolume: function(v) {
        this.musicVolume = Math.max(0, Math.min(1, v));
        if (this.musicEl) this.musicEl.volume = this.musicVolume;
        this.saveSettings();
    },

    setSFXVolume: function(v) {
        this.sfxVolume = constrain(v, 0, 1);
        this.saveSettings();
    },

    toggleMute: function() {
        this.muted = !this.muted;
        if (this.musicEl) {
            if (this.muted) this.musicEl.pause();
            else this.musicEl.play().catch(() => {});
        }
        this.saveSettings();
        return this.muted;
    },

    saveSettings: function() {
        try {
            localStorage.setItem('cozyIslandSettings', JSON.stringify({
                musicVolume: this.musicVolume,
                sfxVolume: this.sfxVolume,
                muted: this.muted
            }));
        } catch(e) {}
    },

    loadSettings: function() {
        try {
            const s = localStorage.getItem('cozyIslandSettings');
            if (s) {
                const data = JSON.parse(s);
                this.musicVolume = data.musicVolume !== undefined ? data.musicVolume : 0.5;
                this.sfxVolume = data.sfxVolume !== undefined ? data.sfxVolume : 0.7;
                this.muted = data.muted || false;
            }
        } catch(e) {}
    }
};

// Load settings on script load
audioManager.loadSettings();
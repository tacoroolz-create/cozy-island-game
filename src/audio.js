// ===== AUDIO MANAGER =====
// Placeholder audio system — no-op until sound files are added

let audioManager = {
    musicVolume: 0.5,
    sfxVolume: 0.7,
    muted: false,
    currentTrack: null,
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
        if (this.muted) return;
        this.currentTrack = trackName;
    },

    stopMusic: function() {
        this.currentTrack = null;
    },

    // Play a procedurally generated sound effect.
    // Types supported: 'chirp' (bird), 'cicada' (buzzy), 'oink' (hog).
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
        }
    },

    setMusicVolume: function(v) {
        this.musicVolume = constrain(v, 0, 1);
        this.saveSettings();
    },

    setSFXVolume: function(v) {
        this.sfxVolume = constrain(v, 0, 1);
        this.saveSettings();
    },

    toggleMute: function() {
        this.muted = !this.muted;
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
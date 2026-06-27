// ===== AUDIO MANAGER =====
// Placeholder audio system — no-op until sound files are added

let audioManager = {
    musicVolume: 0.5,
    sfxVolume: 0.7,
    muted: false,
    currentTrack: null,

    playMusic: function(trackName) {
        if (this.muted) return;
        this.currentTrack = trackName;
        // Will play actual audio when files are available
    },

    stopMusic: function() {
        this.currentTrack = null;
    },

    playSFX: function(sfxName) {
        if (this.muted) return;
        // Will play SFX when files are available
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
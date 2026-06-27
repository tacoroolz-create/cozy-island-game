// Cozy Island Game - Engine / State Manager
// Lightweight central hub for game state, scene stack, and events.
// Designed to grow into: overworld, interiors, underworld, minigames.
//
// This module is intentionally thin. It doesn't replace p5.js global mode;
// it organizes the top-level state so that new systems can register scenes
// instead of adding more global variables and wrapping keyPressed.

const Engine = {
    // Scene registry. Each scene: { id, enter, exit, update, draw, keyPressed, mousePressed }
    scenes: {},

    // Active scene stack. Top of stack is current scene.
    stack: [],

    // Global game state object (the single source of truth for runtime data).
    state: {
        game: null,        // will hold world, player, inventory, buildings, etc.
        settings: {},
        session: {
            startTime: Date.now(),
            lastSave: 0
        }
    },

    // Event bus for decoupled system communication.
    // Usage: Engine.on('craft', (data) => { ... })
    events: {},

    on(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    },

    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    },

    emit(event, data) {
        if (!this.events[event]) return;
        for (const cb of this.events[event]) {
            try { cb(data); } catch (e) { console.error('Event handler error:', e); }
        }
    },

    // Register a scene by id.
    registerScene(id, scene) {
        this.scenes[id] = scene;
    },

    // Push a scene onto the stack. Calls enter() on new scene.
    pushScene(id, data) {
        const scene = this.scenes[id];
        if (!scene) { console.warn('Unknown scene:', id); return; }
        const prev = this.currentScene();
        if (prev && typeof prev.exit === 'function') prev.exit();
        this.stack.push(id);
        if (typeof scene.enter === 'function') scene.enter(data);
    },

    // Pop current scene. Calls exit() on it, enter() on previous.
    popScene() {
        const id = this.stack.pop();
        const scene = id ? this.scenes[id] : null;
        if (scene && typeof scene.exit === 'function') scene.exit();
        const prev = this.currentScene();
        if (prev && typeof prev.enter === 'function') prev.enter();
    },

    // Replace current scene (clears stack).
    setScene(id, data) {
        while (this.stack.length > 0) this.popScene();
        this.pushScene(id, data);
    },

    currentScene() {
        if (this.stack.length === 0) return null;
        return this.scenes[this.stack[this.stack.length - 1]];
    },

    currentSceneId() {
        if (this.stack.length === 0) return null;
        return this.stack[this.stack.length - 1];
    },

    // Top-level update/draw/keyPressed dispatch.
    update() {
        const scene = this.currentScene();
        if (scene && typeof scene.update === 'function') scene.update();
    },

    draw() {
        const scene = this.currentScene();
        if (scene && typeof scene.draw === 'function') scene.draw();
    },

    keyPressed() {
        const scene = this.currentScene();
        if (scene && typeof scene.keyPressed === 'function') return scene.keyPressed();
        return true;
    },

    mousePressed() {
        const scene = this.currentScene();
        if (scene && typeof scene.mousePressed === 'function') return scene.mousePressed();
        return true;
    }
};

// Convenience: a scene that wraps an existing p5 global-mode function.
// Usage: Engine.makeLegacyScene('playing', { update: drawGame, draw: drawGame, keyPressed: keyPressedPlaying })
Engine.makeLegacyScene = function(id, handlers) {
    this.registerScene(id, {
        update: handlers.update || (() => {}),
        draw: handlers.draw || (() => {}),
        keyPressed: handlers.keyPressed || (() => true),
        mousePressed: handlers.mousePressed || (() => true),
        enter: handlers.enter || (() => {}),
        exit: handlers.exit || (() => {})
    });
};

// Expose a stable global so other modules can subscribe to events / query scene.
window.Engine = Engine;

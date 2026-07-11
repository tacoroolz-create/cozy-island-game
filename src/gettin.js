// Cozy Island Game - Gettin' Stick Module
// The Gettin' Stick pulls TREASURE from the water — never fish.
// Cast into sea/water with a Gettin' Stick equipped, wait for a pull,
// then reel in a weighted-random treasure from the loot table.
// Each successful pull consumes 1 durability from the stick.
//
// Globals used: ITEMS, inventory, world, player, notify.
// Hooks keyPressed so Enter triggers casting (not harvesting) when facing
// water with a gettin_stick in the active hotbar slot.
// Wraps drawGame() to render the line/bobber while a line is out.

// ===== TREASURE ITEMS (added to the global ITEMS dict if missing) =====
// NOTE: gold_coin is defined in game.js already; this block adds the rest
// and is idempotent (won't overwrite existing defs).
const GETTIN_ITEMS = {
    gold_coin:    { name: 'Gold Coin',    category: 'treasure', maxStack: 99, color: '#FFD700', desc: 'An ancient gold coin pulled from the deep.' },
    glass_bottle: { name: 'Glass Bottle', category: 'treasure', maxStack: 99, color: '#B3E5FC', desc: 'A barnacle-crusted bottle. Something inside?' },
    iron_ingot:   { name: 'Iron Ingot',   category: 'treasure', maxStack: 99, color: '#90A4AE', desc: 'A heavy rust-spotted ingot. Good metal.' },
    metal_rod:    { name: 'Metal Rod',    category: 'treasure', maxStack: 99, color: '#78909C', desc: 'A bent metal rod. Could be useful.' },
    old_radio:    { name: 'Old Radio',    category: 'treasure', maxStack: 99, color: '#8D6E63', desc: 'A waterlogged transistor radio. Static only... for now.' }
};

// Merge into the global ITEMS dict if this file loads before/after game.js.
(function registerGettinItems() {
    // Access the global ITEMS via window to avoid ReferenceErrors on bad order.
    function merge() {
        if (typeof window.ITEMS === 'undefined') {
            // game.js hasn't defined ITEMS yet; retry shortly.
            return false;
        }
        for (const id in GETTIN_ITEMS) {
            if (!window.ITEMS[id]) window.ITEMS[id] = GETTIN_ITEMS[id];
        }
        return true;
    }
    if (!merge()) setTimeout(registerGettinItems, 0);
})();

// ===== TREASURE LOOT TABLE =====
// One flat weighted pool.
// Each entry: { id (itemId), name, weight (relative probability) }
// Tools pulled from the water come in with lowered durability (1-2 of 3).
const TREASURE_POOL = [
    { id: 'glass_bottle', name: 'Glass Bottle', weight: 40 },
    { id: 'metal_rod',    name: 'Metal Rod',    weight: 28 },
    { id: 'iron_ingot',   name: 'Iron Ingot',   weight: 16 },
    { id: 'gold_coin',    name: 'Gold Coin',    weight: 12 },
    { id: 'old_radio',    name: 'Old Radio',    weight:  6 },
    // Waterlogged tools — found with reduced durability.
    { id: 'axe',     name: 'Rusty Axe',     weight: 3, isTool: true },
    { id: 'hoe',     name: 'Rusty Hoe',     weight: 3, isTool: true },
    { id: 'pickaxe', name: 'Rusty Pickaxe', weight: 3, isTool: true }
];

// ===== CASTING STATE MACHINE =====
const CAST_STATES = { IDLE: 0, CASTING: 1, WAITING: 2, PULLED: 3 };

let castState = {
    state: CAST_STATES.IDLE,
    // Target tile the line was cast toward (tile coords in world space).
    targetTx: null,
    targetTy: null,
    // Bobber position (tile-space float, for a little drift).
    bobberX: 0,
    bobberY: 0,
    // Accumulated wait time in ms while WAITING.
    waitMs: 0,
    // Pre-rolled treasure revealed when PULLED.
    pendingPull: null,
    // Reel-back timer (ms) so the player sees the pulled flash briefly.
    reelMs: 0
};

// Per-second pull chance. ~1/10 per second means avg ~10s wait.
const PULL_CHANCE_PER_SEC = 0.10;

// ===== HELPERS =====
function isWaterTile(tile) {
    return tile && (tile.type === 'sea' || tile.type === 'water');
}

function activeItemIsGettinStick() {
    const active = inventory.getActiveItem();
    return !!active && active.id === 'gettin_stick';
}

// Weighted random selection from TREASURE_POOL (flat pool).
function rollTreasure() {
    const pool = TREASURE_POOL;
    if (pool.length === 0) return null;
    let total = 0;
    for (const c of pool) total += c.weight;
    let r = Math.random() * total;
    for (const c of pool) {
        r -= c.weight;
        if (r <= 0) return c;
    }
    return pool[pool.length - 1];
}

// ===== ACTIONS =====
// Called when the player presses Enter while playing. Returns true if it
// handled the press (so the caller shouldn't also try to harvest).
function tryCast() {
    if (castState.state !== CAST_STATES.IDLE) return false;

    const facing = player.getFacingTile();
    if (!facing) return false;

    if (!isWaterTile(facing.tile)) return false;

    if (!activeItemIsGettinStick()) {
        notify("Equip a Gettin' Stick to pull treasure.");
        return false;
    }

    // Check durability — can't cast with a broken stick
    const stick = inventory.getActiveItem();
    if (stick && typeof stick.durability === 'number' && stick.durability <= 0) {
        notify("Your Gettin' Stick is broken! Craft a new one.");
        return false;
    }

    // Cast!
    castState.state = CAST_STATES.CASTING;
    castState.targetTx = facing.x;
    castState.targetTy = facing.y;
    // Bobber starts at the player and arcs out toward the target.
    castState.bobberX = player.x;
    castState.bobberY = player.y;
    castState.waitMs = 0;
    castState.pendingPull = null;
    castState.reelMs = 0;
    notify("*cast*");
    return true;
}

// Reels the line in early (used if player moves or cancels).
function reelIn() {
    castState.state = CAST_STATES.IDLE;
    castState.targetTx = null;
    castState.targetTy = null;
    castState.pendingPull = null;
    castState.waitMs = 0;
    castState.reelMs = 0;
}

// Step the casting state machine. Call from drawGame() (frame-rate dt in ms).
function updateCasting(dt) {
    if (castState.state === CAST_STATES.IDLE) return;

    if (castState.state === CAST_STATES.CASTING) {
        // Animate bobber out toward the target tile.
        const tx = castState.targetTx;
        const ty = castState.targetTy;
        if (tx == null || ty == null) { reelIn(); return; }
        const speed = 0.08; // tile-units per ms -> quite snappy (~12ms/tile)
        const dx = tx - castState.bobberX;
        const dy = ty - castState.bobberY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 0.15) {
            castState.bobberX = tx;
            castState.bobberY = ty;
            castState.state = CAST_STATES.WAITING;
            castState.waitMs = 0;
            // Pre-roll the eventual treasure now (reels independent of timing).
            castState.pendingPull = rollTreasure();
        } else {
            castState.bobberX += (dx / d) * speed * dt;
            castState.bobberY += (dy / d) * speed * dt;
        }
        return;
    }

    if (castState.state === CAST_STATES.WAITING) {
        castState.waitMs += dt;
        // Roll per second (accumulate probability across dt slices).
        const p = PULL_CHANCE_PER_SEC * (dt / 1000);
        if (Math.random() < p) {
            castState.state = CAST_STATES.PULLED;
            castState.reelMs = 0;
            audioManager.playSFX('splash');
            notify("! ! Pull !");
        }
        return;
    }

    if (castState.state === CAST_STATES.PULLED) {
        // Hold the pulled state briefly so the player sees the flash,
        // then award and reset. ~800ms display.
        castState.reelMs += dt;
        if (castState.reelMs >= 800) {
            const c = castState.pendingPull;
            if (c) {
                // Tools pulled from the water get lowered durability (1 or 2).
                if (c.isTool) {
                    const ok = inventory.addItem(c.id, 1, { durability: 1 + Math.floor(Math.random() * 2) });
                    if (ok) notify("Pulled up: " + c.name + " (worn)!");
                    else notify("Inventory full — lost the " + c.name + "!");
                } else {
                    const ok = inventory.addItem(c.id, 1);
                    if (ok) notify("Pulled up: " + c.name + "!");
                    else notify("Inventory full — lost the " + c.name + "!");
                }
                // Consume 1 durability from the gettin' stick.
                const stick = inventory.getActiveItem();
                if (stick && stick.id === 'gettin_stick') {
                    if (typeof stick.durability !== 'number') stick.durability = 3;
                    stick.durability -= 1;
                    if (stick.durability <= 0) {
                        notify("Your Gettin' Stick broke!");
                        inventory.removeItem('gettin_stick', 1);
                    } else {
                        notify("Gettin' Stick durability: " + stick.durability + "/3");
                    }
                }
            } else {
                notify("The line came back empty...");
            }
            reelIn();
        }
        return;
    }
}

// ===== DRAWING =====
// Renders the line, bobber, and state flashes in screen space.
// Call after the world/player are drawn but before notifications.
function drawCastState() {
    if (castState.state === CAST_STATES.IDLE) return;
    if (castState.targetTx == null || castState.targetTy == null) return;

    const TS = CONFIG.TILE_SIZE;
    // Player pixel center.
    const px = player.x * TS - cameraX + TS / 2;
    const py = player.y * TS - cameraY + TS / 2;
    // Bobber pixel center.
    const bx = castState.bobberX * TS - cameraX + TS / 2;
    const by = castState.bobberY * TS - cameraY + TS / 2;

    // Line from player to bobber.
    stroke(255, 255, 255, 200);
    strokeWeight(1);
    noFill();
    line(px, py, bx, by);

    // Bobber.
    noStroke();
    if (castState.state === CAST_STATES.PULLED) {
        // Excited red bobber during a pull.
        fill('#E53935');
        ellipse(bx, by, 6, 6);
    } else {
        fill('#FFD93D');
        ellipse(bx, by, 4, 4);
        fill(0, 0, 0, 120);
        // Tiny water shadow under bobber.
        ellipse(bx, by + 2, 6, 2);
    }

    // Status text near the bobber.
    let label = '';
    if (castState.state === CAST_STATES.CASTING) label = '...';
    else if (castState.state === CAST_STATES.WAITING) label = '~ waiting ~';
    else if (castState.state === CAST_STATES.PULLED) label = '!';
    if (label) {
        fill(0, 0, 0, 180);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(8);
        textFont('Courier New');
        const tw = textWidth(label) + 6;
        rect(bx - tw / 2, by - 18, tw, 11);
        fill(255, 255, 200);
        text(label, bx, by - 8);
    }
}

// ===== HOOKS =====
// Wrap keyPressed so Enter while playing tries casting first (when facing water
// with a Gettin' Stick). Falls through to the original handler otherwise.
(function wrapCastKeys() {
    if (typeof window._cozyCastKeysWrapped !== 'undefined') return;
    window._cozyCastKeysWrapped = true;

    if (typeof window.keyPressed !== 'function') {
        setTimeout(wrapCastKeys, 0);
        return;
    }

    // We must wrap AFTER crafting.js so the chain order is:
    // cast wrapper -> crafting wrapper -> original. But crafting.js wraps
    // whenever keyPressed exists. To guarantee our wrapper runs first, we grab
    // whatever keyPressed currently is (which already includes crafting's wrap
    // if crafting.js loaded first) and install ourselves around it. Either way
    // we only act on PLAYING+Enter, and crafting acts on MENU+Crafting, so there
    // is no conflict.
    const orig = window.keyPressed;
    window.keyPressed = function () {
        if (typeof gameState !== 'undefined' && gameState === STATE.PLAYING &&
            (keyCode === ENTER || keyCode === RETURN)) {
            // Try to cast. If we handled it, swallow the event.
            if (typeof castState !== 'undefined' && castState.state === CAST_STATES.IDLE) {
                if (tryCast()) return false;
            } else {
                // Already casting: pressing Enter reels in / resolves a pull early.
                if (castState.state === CAST_STATES.WAITING) {
                    notify("Reeled in early...");
                    reelIn();
                    return false;
                } else if (castState.state === CAST_STATES.PULLED) {
                    // Skip the display timer and resolve now.
                    castState.reelMs = 800;
                    return false;
                }
            }
        }
        return orig.apply(this, arguments);
    };
})();

// Wrap drawGame so the line/bobber renders after the world+player.
(function wrapDrawGame() {
    if (typeof window._cozyCastDrawWrapped !== 'undefined') return;
    window._cozyCastDrawWrapped = true;

    if (typeof window.drawGame !== 'function') {
        setTimeout(wrapDrawGame, 0);
        return;
    }
    const orig = window.drawGame;
    window.drawGame = function () {
        orig.apply(this, arguments);
        // Update + draw casting overlay after everything else.
        if (typeof deltaTime === 'number' && deltaTime > 0) updateCasting(deltaTime);
        drawCastState();
    };
})();
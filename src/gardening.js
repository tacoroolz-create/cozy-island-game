// Cozy Island Game - Gardening Module ð±
// Lets the player plant seeds on fertile soil, grow crops over several in-game
// days, and harvest them. Plants advance one stage per day when growthDays
// reaches the daysPerStage threshold.
//
// Globals used: ITEMS, inventory, world, player, notify.
// Hooks World.prototype.draw so that on a new in-game day it calls onNewDay(),
// which advances all planted plots. Wraps drawGame() to render plant overlays.

// ===== PLANTS =====
// PLANTS[id] = {
//   name, stages (int total incl. planted & mature), daysPerStage,
//   seed (itemId used to plant this), crop (itemId harvested),
//   color (visual color for the overlay circle)
// }
const PLANTS = {
    wildflower: {
        name: 'Wildflower',
        stages: 3,          // 0=seedling, 1=sprout, 2=mature
        daysPerStage: 1,
        seed: 'seed',
        crop: 'berry',
        color: '#E53935'
    },
    berry_bush: {
        name: 'Berry Bush',
        stages: 3,
        daysPerStage: 1,
        seed: 'berry',
        crop: 'berry',
        color: '#C62828'
    },
    flea_lily: {
        name: 'Flea Lily',
        stages: 3,
        daysPerStage: 1,
        seed: 'flea_lily_seed',
        crop: 'flea_lily_bloom',
        color: '#8E24AA'
    }
};

// Mystery-seed items that resolve to a random plant type when planted.
// seed_random is a synthetic id used internally; the actual 'seed' item is the
// generic seed in game.js and rolls into one of the regular plant types.
const SEED_RANDOM_ID = 'seed_random';

// Map seed item ids -> plant id. Multiple seed ids can map to the same plant.
const SEED_TO_PLANT = {
    seed: 'wildflower',       // generic seed -> wildflower
    berry: 'berry_bush',       // berry -> berry bush
    flea_lily_seed: 'flea_lily' // Flealess Market seed -> flea lily
};

// ===== PLOTS =====
// gardenPlots['x,y'] = { x, y, type (plant id), stage (0..stages-1), growthDays }
let gardenPlots = {};

// Tiles flagged as fertile (populated later by world gen). Format: array of [x,y].
let fertileSoilTiles = [];

// Quick membership test for fertile soil (fast lookup set, rebuilt as needed).
let _fertileSet = null;
function isFertile(x, y) {
    if (!_fertileSet) {
        _fertileSet = new Set();
        for (const [fx, fy] of fertileSoilTiles) _fertileSet.add(fx + ',' + fy);
    }
    return _fertileSet.has(x + ',' + y);
}
// Call this whenever fertileSoilTiles changes to force a rebuild on next check.
function invalidateFertileCache() { _fertileSet = null; }

function plotKey(x, y) { return x + ',' + y; }
function getPlot(x, y) { return gardenPlots[plotKey(x, y)] || null; }

// Can a seed be planted at (x,y)? Plantable = open ground (plain grass) or
// fertile soil, with nothing solid/built on it and no existing plot.
function canPlantAt(x, y) {
    if (!world || !world.tiles[x] || !world.tiles[x][y]) return false;
    const tile = world.tiles[x][y];
    if (tile.type !== 'grass' && tile.type !== 'soil' && !isFertile(x, y)) return false;
    if (typeof isSolidTile === 'function' && isSolidTile(x, y)) return false;
    if (typeof buildingAt === 'function' && buildingAt(x, y)) return false;
    if (getPlot(x, y)) return false;
    return true;
}

// ===== ACTIONS =====
// Resolve a seed item id to a plant id. Returns null for unknown seeds.
function resolvePlantType(seedId) {
    if (SEED_TO_PLANT[seedId]) return SEED_TO_PLANT[seedId];
    // Mystery seed path (synthetic): pick a random plant.
    if (seedId === SEED_RANDOM_ID) {
        const keys = Object.keys(PLANTS);
        return keys[Math.floor(Math.random() * keys.length)];
    }
    return null;
}

// Plant a seed at (x,y). Consumes one seed from inventory.
// Returns true on success. Notifies on failure reasons.
function plantSeed(x, y, seedId) {
    // Resolve plant type first so we can reject non-seeds cleanly.
    const plantId = resolvePlantType(seedId);
    if (!plantId) {
        notify("That isn't a seed.");
        return false;
    }
    // Must be plantable ground (open grass or fertile soil), nothing there yet.
    if (!canPlantAt(x, y)) {
        if (getPlot(x, y)) notify("Something's already growing here.");
        else notify("You can't plant there.");
        return false;
    }
    // Consume the seed.
    if (!inventory.hasItem(seedId, 1)) {
        notify("You don't have any of that seed.");
        return false;
    }
    inventory.removeItem(seedId, 1);

    gardenPlots[plotKey(x, y)] = {
        x: x,
        y: y,
        type: plantId,
        stage: 0,
        growthDays: 0
    };
    audioManager.playSFX('plant');
    notify("Planted: " + PLANTS[plantId].name + ".");
    return true;
}

// Harvest a fully-grown plant at (x,y). Adds the crop to inventory and removes the plot.
function harvestPlant(x, y) {
    const plot = getPlot(x, y);
    if (!plot) {
        notify("Nothing growing here.");
        return false;
    }
    const def = PLANTS[plot.type];
    if (!def) { delete gardenPlots[plotKey(x, y)]; return false; }
    if (plot.stage < def.stages - 1) {
        notify("It's not ready yet.");
        return false;
    }
    // Fully grown â give crop.
    inventory.addItem(def.crop, 1);
    notify("Harvested: " + ITEMS[def.crop].name + "!");
    delete gardenPlots[plotKey(x, y)];
    return true;
}

// Try to plant the currently active hotbar item onto the facing tile.
// Returns true if it handled the press.
function tryPlantFromHotbar() {
    if (!player) return false;
    const facing = player.getFacingTile();
    if (!facing) return false;
    const active = inventory.getActiveItem();
    if (!active) return false;
    // Only react to seed-like items.
    if (!isSeedItem(active.id)) return false;
    // Try to plant; if the spot is invalid, fall through (return false) so the
    // normal harvest path can run instead.
    if (!canPlantAt(facing.x, facing.y)) return false;
    return plantSeed(facing.x, facing.y, active.id);
}

// Use the currently active hotbar item on a target tile (e.g., a clicked tile).
// The caller is responsible for confirming the tile is adjacent to the player.
// Returns true if the item was used. This is the general "use selected item"
// dispatch — extend it as more usable items are added.
function tryUseActiveItemAt(tx, ty) {
    if (!player || !inventory) return false;
    const active = inventory.getActiveItem();
    if (!active) return false;
    // Seeds -> plant a sprout on open ground.
    if (isSeedItem(active.id)) {
        return plantSeed(tx, ty, active.id);
    }
    return false;
}

// Is this item id a plantable seed? (generic seed, berry, or mystery seed.)
function isSeedItem(id) {
    return id in SEED_TO_PLANT || id === SEED_RANDOM_ID;
}

// ===== NEW-DAY HOOK =====
// Advances every plot's growthDays and promotes stage when threshold reached.
function onGardenNewDay() {
    for (const key in gardenPlots) {
        const plot = gardenPlots[key];
        const def = PLANTS[plot.type];
        if (!def) continue;
        plot.growthDays++;
        if (plot.growthDays >= def.daysPerStage) {
            plot.growthDays = 0;
            if (plot.stage < def.stages - 1) {
                plot.stage++;
            }
        }
    }
}

// onGardenNewDay is dispatched from onNewDay() in daycycle.js.

// ===== DRAWING =====
// Draws small colored circles for each visible plant, sized/color by stage.
// Call after the world is drawn. Uses cameraX/cameraY (same as tiles).
function drawGardenOverlay() {
    const TS = CONFIG.TILE_SIZE;
    const startX = Math.max(0, Math.floor(cameraX / TS));
    const startY = Math.max(0, Math.floor(cameraY / TS));
    const endX = Math.min(CONFIG.WORLD_WIDTH, startX + Math.ceil(CONFIG.CANVAS_WIDTH / TS) + 2);
    const endY = Math.min(CONFIG.WORLD_HEIGHT, startY + Math.ceil(CONFIG.CANVAS_HEIGHT / TS) + 2);

    for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
            const plot = getPlot(x, y);
            if (!plot) continue;
            const def = PLANTS[plot.type];
            if (!def) continue;

            const sx = x * TS - cameraX;
            const sy = y * TS - cameraY;

            // Stage 0 (freshly planted): show a little sprout.
            // Uses the 'tiles.sprout' sprite if one has been added, otherwise a
            // drawn placeholder (stem + two leaves).
            if (plot.stage === 0) {
                const sproutSpr = (typeof SPRITES !== 'undefined') ? SPRITES['tiles.sprout'] : null;
                if (sproutSpr) {
                    image(sproutSpr, sx, sy, TS, TS);
                } else {
                    drawSproutPlaceholder(sx, sy, TS);
                }
                continue;
            }

            // Later stages: growing bloom.
            const cx = sx + TS / 2;
            const cy = sy + TS / 2 + 2;
            const ratio = (plot.stage + 1) / def.stages; // 0.33..1
            const r = Math.max(1.5, ratio * (TS / 2 - 2));

            noStroke();
            // Stem
            fill('#558B2F');
            rect(cx - 0.5, cy - r + 1, 1, r);
            // Bloom
            fill(def.color);
            ellipse(cx, cy - r + 1, r * 2, r * 2);
            // Mature sparkle (a brighter center)
            if (plot.stage >= def.stages - 1) {
                fill('#FFD93D');
                ellipse(cx, cy - r + 1, r * 0.6, r * 0.6);
            }
        }
    }
}

// Placeholder sprout drawing: a short green stem with two small leaves,
// rooted at the bottom-center of the tile. Replaced automatically once a
// 'tiles.sprout' sprite (assets/tiles/sprout.png) is added.
function drawSproutPlaceholder(sx, sy, TS) {
    noStroke();
    const cx = sx + TS / 2;
    const baseY = sy + TS - 3;
    // Stem
    fill('#558B2F');
    rect(cx - 0.5, baseY - 6, 1, 6);
    // Two leaves
    fill('#7CB342');
    ellipse(cx - 2.5, baseY - 5, 4, 2.5);
    ellipse(cx + 2.5, baseY - 5, 4, 2.5);
    // Tiny top tip
    fill('#9CCC65');
    ellipse(cx, baseY - 7, 2, 2);
}

// ===== GARDENING TAB =====
// Placeholder content for the Gardening menu tab (lists available seeds + instructions).
function drawGardeningTab(x, y, w, h) {
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Gardening', x, y);

    fill(120);
    textSize(7);
    text('Plant seeds on tilled soil. Water daily.', x, y + 12);
    text('Harvest when fully grown!', x, y + 22);

    // Available seeds list
    const seeds = collectAvailableSeeds();
    const listY = y + 36;
    if (seeds.length === 0) {
        fill(150);
        textSize(8);
        text('No seeds in inventory.', x, listY);
        text('Find seeds by harvesting flowers,', x, listY + 10);
        text('bird poop, or weeds.', x, listY + 20);
        // Garden Day extra hint
        const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
        if (holiday && holiday.name === 'Garden Day') {
            fill(255, 255, 150);
            text('It\'s Garden Day! Hoes never break — till freely.', x, listY + 34);
        }
        return;
    }

    fill(180);
    textSize(8);
    text('Your seeds:', x, listY);
    let ry = listY + 12;
    for (const s of seeds) {
        const it = ITEMS[s.id];
        const plantName = PLANTS[resolvePlantType(s.id)] ?
            PLANTS[resolvePlantType(s.id)].name : '?';
        // Colored block
        fill(it ? it.color : '#888');
        noStroke();
        rect(x, ry, 8, 8);
        // Label
        fill(220);
        textSize(8);
        text(it ? it.name : s.id, x + 12, ry);
        fill(140);
        textSize(7);
        text('x' + s.count + '  -> ' + plantName, x + 12, ry + 9);
        ry += 20;
    }

    // Footer hint (flows after the list so it scrolls with the content)
    fill(120);
    textSize(7);
    textAlign(LEFT, TOP);
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    ry += 4;
    if (holiday && holiday.name === 'Garden Day') {
        text('Tip: till grass with a hoe to make soil. Hoes never break today!', x, ry);
    } else {
        text('Tip: till grass with a hoe to make soil.', x, ry);
    }
    if (typeof menuContentH !== 'undefined') menuContentH = ry + 12 - y;
}

// Collect distinct seed item ids + counts currently in inventory.
function collectAvailableSeeds() {
    const out = [];
    if (!inventory) return out;
    for (let i = 0; i < 24; i++) {
        const slot = inventory.slots[i];
        if (!slot) continue;
        if (isSeedItem(slot.id)) {
            // Aggregate.
            const existing = out.find(o => o.id === slot.id);
            if (existing) existing.count += slot.count;
            else out.push({ id: slot.id, count: slot.count });
        }
    }
    return out;
}

// ===== HOOKS =====
// Wrap drawGame so the garden overlay renders after the world+player.
(function wrapGardenDraw() {
    if (typeof window._cozyGardenDrawWrapped !== 'undefined') return;
    window._cozyGardenDrawWrapped = true;

    if (typeof window.drawGame !== 'function') {
        setTimeout(wrapGardenDraw, 0);
        return;
    }
    const orig = window.drawGame;
    window.drawGame = function () {
        orig.apply(this, arguments);
        drawGardenOverlay();
    };
})();

// Wrap keyPressed so that, while playing, pressing Enter with a seed in the
// active hotbar slot plants on the facing fertile tile (taking precedence over
// gettin only if we actually planted; otherwise falls through). We install
// ourselves around whatever keyPressed currently is (may already include the
// gettin/crafting wraps).
(function wrapGardenKeys() {
    if (typeof window._cozyGardenKeysWrapped !== 'undefined') return;
    window._cozyGardenKeysWrapped = true;

    if (typeof window.keyPressed !== 'function') {
        setTimeout(wrapGardenKeys, 0);
        return;
    }
    const orig = window.keyPressed;
    window.keyPressed = function () {
        if (typeof gameState !== 'undefined' && gameState === STATE.PLAYING &&
            (keyCode === ENTER || keyCode === RETURN)) {
            if (typeof castState === 'undefined' || castState.state === CAST_STATES.IDLE) {
                // Try planting first; only swallow the event if we actually planted.
                if (tryPlantFromHotbar()) return false;
            }
        }
        return orig.apply(this, arguments);
    };
})();
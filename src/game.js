// Cozy Island Game - Main Game Loop 🏝️
// Phase 1: Foundation

// Game states
const STATE = {
    START: 'start',
    PLAYING: 'playing',
    MENU: 'menu',
    PAUSED: 'paused',
    INSIDE: 'inside'
};
// DIALOGUE and MINIGAME states added by dialogue.js and games.js if not present

// Menu tabs
const MENU_TABS = ['Inventory', 'Crafting', 'Treasure', 'Gardening', 'Magic', 'Friends', 'Settings'];
let menuTab = 0;

// Game configuration
const CONFIG = {
    TILE_SIZE: 16,
    WORLD_WIDTH: 100,
    WORLD_HEIGHT: 100,
    CANVAS_WIDTH: 640,
    CANVAS_HEIGHT: 384,
    DAY_LENGTH_MINUTES: 30
};

// Sprite registry — holds loaded p5.Image objects, null if not loaded
const SPRITES = {};
const SPRITE_DEFS = {
    'tiles.grass':       'assets/tiles/grass.png',
    'tiles.beach':       'assets/tiles/beach.png',
    'tiles.water':       'assets/tiles/water.png',
    'tiles.tree':        'assets/tiles/tree.png',
    'tiles.palm':        'assets/tiles/palm.png',
    'tiles.rock':        'assets/tiles/rock.png',
    'tiles.shiny_rock':  'assets/tiles/shiny_rock.png',
    'tiles.weeds':       'assets/tiles/weeds.png',
    'tiles.bird_poop':   'assets/tiles/bird_poop.png',
    'tiles.rosebush':    'assets/tiles/rosebush.png',
    'tiles.tulip':       'assets/tiles/tulip.png',
    'sprites.player':    'assets/sprites/player.png',
    'items.log':         'assets/sprites/log.png',
    'items.stone':       'assets/sprites/stone.png',
    'items.magnet':      'assets/sprites/magnet.png',
    'items.crystal':     'assets/sprites/crystal.png',
    'items.stick':       'assets/sprites/stick.png',
    'items.fiber':       'assets/sprites/fiber.png',
    'items.bean':       'assets/sprites/bean.png',
    'items.berry':       'assets/sprites/berry.png',
    'items.banana':      'assets/sprites/banana.png',
    'items.seed':        'assets/sprites/seed.png',
    'items.axe':         'assets/sprites/axe.png',
    'items.hoe':         'assets/sprites/hoe.png',
    'sprites.shack':     'assets/sprites/shack.png',
    'sprites.house':     'assets/sprites/house.png'
};

// Global game state
let gameState = STATE.START;
let player = null;
let world = null;
let cameraX = 0;
let cameraY = 0;

// UI state
let selectedMenuOption = 0;

// Movement cooldown for grid-based movement (ms)
let lastMoveTime = 0;
const MOVE_COOLDOWN = 120;
const startMenuOptions = ['Start', 'Load', 'Settings'];
const settingsMenuOptions = ['Back'];

// Tiles that block player movement
const TILE_SOLID = new Set(['sea', 'water', 'tree', 'rock', 'palm', 'shiny_rock', 'rosebush']);

// Helper: check if a tile is solid. Individual tiles can override with a `solid` property
// (used for 2-tall trees: trunk solid, leaves passable).
function isSolidTile(x, y) {
    if (x < 0 || x >= CONFIG.WORLD_WIDTH || y < 0 || y >= CONFIG.WORLD_HEIGHT) return true;
    const tile = world.tiles[x][y];
    if (!tile) return true;
    if (tile.solid !== undefined) return tile.solid;
    return TILE_SOLID.has(tile.type);
}

// Water animation frame counter
let waterFrame = 0;

// ===== ITEM DEFINITIONS =====
// Categories: 'material', 'gift', 'tool', 'block'
const ITEMS = {
    log:         { name: 'Log',         category: 'material', maxStack: 99, color: '#8B4513', desc: 'A sturdy piece of wood you found near a tree.' },
    stick:       { name: 'Stick',       category: 'material', maxStack: 99, color: '#A0826D', desc: 'A flexible piece of wood you found near a tree.' },
    fiber:       { name: 'Fiber',       category: 'material', maxStack: 99, color: '#558B2F', desc: 'Long strips of plant fiber that grow from the dirt.' },
    stone:       { name: 'Stone',       category: 'material', maxStack: 99, color: '#9E9E9E', desc: 'A block of stone you chipped off of a boulder.' },
    magnet:      { name: 'Magnet',      category: 'material', maxStack: 99, color: '#607D8B', desc: 'A magic rock you chipped off of a shiny rock.' },
    crystal:     { name: 'Crystal',     category: 'material', maxStack: 99, color: '#B98DFF', desc: 'A magic rock you chipped off of a shiny rock.' },
    seed:        { name: 'Seed',        category: 'material', maxStack: 99, color: '#8BC34A', desc: 'A generic seed for planting.' },
    rose_seed:   { name: 'Rose Seed',   category: 'material', maxStack: 99, color: '#E53935', desc: 'A red rose seed.' },
    tulip_bulb:  { name: 'Tulip Bulb',  category: 'material', maxStack: 99, color: '#F5F5F5', desc: 'A white tulip bulb.' },
    bird_poop:   { name: 'Bird Poop',   category: 'material', maxStack: 99, color: '#E0E0E0', desc: 'May contain seeds.' },
    thatch:      { name: 'Thatch',      category: 'block',    maxStack: 99, color: '#D4A76A', desc: 'Building material.' },
    banana:      { name: 'Banana',      category: 'gift',     maxStack: 99, color: '#FFD93D', desc: 'Tasty beach fruit.' },
    bean:        { name: 'Bean',        category: 'gift',     maxStack: 99, color: '#D4A76A', desc: 'An edible seed you can eat or plant.' },
    berry:       { name: 'Berry',       category: 'gift',     maxStack: 99, color: '#C62828', desc: 'A sweet gift from the garden.' },
    gettin_stick:{ name: "Gettin' Stick", category: 'tool', maxStack: 1, color: '#D4A76A', desc: 'A stick with a magnet. Pulls treasure from the water!', durability: 3 },
    axe:         { name: 'Axe',         category: 'tool',     maxStack: 1, color: '#7CB342', desc: 'Chops wood faster.', durability: 3 },
    hoe:         { name: 'Hoe',         category: 'tool',     maxStack: 1, color: '#A1887F', desc: 'Tills soil.', durability: 3 },
    pickaxe:     { name: 'Pickaxe',     category: 'tool',     maxStack: 1, color: '#B0BEC5', desc: 'Mines rocks.', durability: 3 },
    // --- Treasure items (pulled from the water with a Gettin' Stick) ---
    glass_bottle:{ name: 'Glass Bottle',category: 'treasure', maxStack: 99, color: '#B3E5FC', desc: 'A barnacle-crusted bottle. Something inside?' },
    iron_ingot:  { name: 'Iron Ingot',  category: 'treasure', maxStack: 99, color: '#90A4AE', desc: 'A heavy rust-spotted ingot. Good metal.' },
    metal_rod:   { name: 'Metal Rod',   category: 'treasure', maxStack: 99, color: '#78909C', desc: 'A bent metal rod. Could be useful.' },
    old_radio:   { name: 'Old Radio',   category: 'treasure', maxStack: 99, color: '#8D6E63', desc: 'A waterlogged transistor radio. Static only... for now.' },
    gold_coin:   { name: 'Gold Coin',   category: 'treasure', maxStack: 99, color: '#FFD700', desc: 'An ancient gold coin pulled from the deep.' }
};

// ===== INVENTORY =====
let inventory = null;
let invSelectedSlot = 0;       // Currently selected slot in inventory view
let hotbarSlot = 0;            // Active hotbar slot (1-8)

// ===== BUILDINGS =====
let buildings = [];
let insideBuilding = null;  // building we're currently inside (null = outside)

// Building exterior tiers — each has a sprite key and base tile dimensions
const BUILDING_TIERS = {
    shack: { spriteKey: 'sprites.shack', name: 'Shack' },
    house: { spriteKey: 'sprites.house', name: 'House' }
};

// Interior wall height (top wall area for decoration)
const INTERIOR_WALL_HEIGHT = 2;

class Building {
    constructor(type, gridX, gridY, owner) {
        this.type = type;       // 'shack', 'house', etc.
        this.gridX = gridX;      // top-left tile (exterior)
        this.gridY = gridY;
        this.owner = owner || null; // NPC id or null for player
        this.spriteKey = BUILDING_TIERS[type] ? BUILDING_TIERS[type].spriteKey : 'sprites.' + type;
        // Interior dimensions in tiles. Start = exterior sprite size.
        const ts = this.tileSize;
        this.interiorW = ts.w;
        this.interiorH = ts.h + INTERIOR_WALL_HEIGHT; // walkable area + wall on top
        // Interior tile grid — grass floor for shack
        this.interiorTiles = [];
        this.initInterior();
    }

    // Returns the exterior sprite dimensions in tiles
    get tileSize() {
        const spr = SPRITES[this.spriteKey];
        if (!spr) return { w: 3, h: 2 };
        return { w: Math.ceil(spr.width / CONFIG.TILE_SIZE), h: Math.ceil(spr.height / CONFIG.TILE_SIZE) };
    }

    // Initialize interior tiles — grass floor, wall row on top
    initInterior() {
        this.interiorTiles = [];
        for (let x = 0; x < this.interiorW; x++) {
            this.interiorTiles[x] = [];
            for (let y = 0; y < this.interiorH; y++) {
                if (y < INTERIOR_WALL_HEIGHT) {
                    this.interiorTiles[x][y] = { type: 'wall', variant: 0 };
                } else {
                    this.interiorTiles[x][y] = { type: 'grass', variant: floor(Math.random() * 3) };
                }
            }
        }
    }

    // Expand interior by given tiles (width and/or height).
    // New tiles get grass floor; wall row stays at top.
    expandInterior(dw, dh) {
        const newW = this.interiorW + dw;
        const newH = this.interiorH + dh;
        const newTiles = [];
        for (let x = 0; x < newW; x++) {
            newTiles[x] = [];
            for (let y = 0; y < newH; y++) {
                if (x < this.interiorW && y < this.interiorH) {
                    // Preserve existing tile
                    newTiles[x][y] = this.interiorTiles[x][y];
                } else if (y < INTERIOR_WALL_HEIGHT) {
                    newTiles[x][y] = { type: 'wall', variant: 0 };
                } else {
                    newTiles[x][y] = { type: 'grass', variant: floor(Math.random() * 3) };
                }
            }
        }
        this.interiorW = newW;
        this.interiorH = newH;
        this.interiorTiles = newTiles;
    }

    // Change the exterior type (shack -> house, etc.)
    upgradeTo(newType) {
        if (!BUILDING_TIERS[newType]) return;
        this.type = newType;
        this.spriteKey = BUILDING_TIERS[newType].spriteKey;
    }

    // Check if a tile coordinate is occupied by this building's exterior
    occupies(x, y) {
        const ts = this.tileSize;
        return x >= this.gridX && x < this.gridX + ts.w && y >= this.gridY && y < this.gridY + ts.h;
    }

    // Door tile (bottom-center of exterior, in world coords)
    getDoorTile() {
        const ts = this.tileSize;
        return { x: this.gridX + Math.floor(ts.w / 2), y: this.gridY + ts.h - 1 };
    }

    // Interior door position (bottom-center of walkable area, in interior coords)
    getInteriorDoorPos() {
        return { x: Math.floor(this.interiorW / 2), y: this.interiorH - 1 };
    }

    draw() {
        const spr = SPRITES[this.spriteKey];
        const screenX = this.gridX * CONFIG.TILE_SIZE - cameraX;
        const screenY = this.gridY * CONFIG.TILE_SIZE - cameraY;
        if (spr) {
            image(spr, screenX, screenY);
        } else {
            // Fallback: brown rectangle
            fill('#8B4513');
            noStroke();
            const ts = this.tileSize;
            rect(screenX, screenY, ts.w * CONFIG.TILE_SIZE, ts.h * CONFIG.TILE_SIZE);
        }
    }

    serialize() {
        return {
            type: this.type,
            gridX: this.gridX,
            gridY: this.gridY,
            owner: this.owner,
            interiorW: this.interiorW,
            interiorH: this.interiorH,
            interiorTiles: this.interiorTiles
        };
    }

    static deserialize(data) {
        const b = new Building(data.type, data.gridX, data.gridY, data.owner);
        if (data.interiorW) b.interiorW = data.interiorW;
        if (data.interiorH) b.interiorH = data.interiorH;
        if (data.interiorTiles) b.interiorTiles = data.interiorTiles;
        return b;
    }
}

// Check if any building occupies a tile
function buildingAt(x, y) {
    for (const b of buildings) {
        if (b.occupies(x, y)) return b;
    }
    return null;
}

// ===== HARVEST DEFINITIONS =====
// Each harvestable tile type: what it drops, respawn time (game hours), tool needed (null = bare hands)
const HARVEST_TYPES = {
    tree:        { drops: [{id:'log', count:2, chance:1.0}, {id:'berry', count:2, chance:1.0}, {id:'stick', count:1, chance:0.5}], respawnHours: 12, tool: null, name: 'Tree' },
    palm:        { drops: [{id:'banana', count:2, chance:1.0}, {id:'fiber', count:2, chance:1.0}], respawnHours: 8,  tool: null, name: 'Palm Tree' },
    rock:        { drops: [{id:'stone', count:2, chance:1.0}], respawnHours: 24, tool: null, name: 'Rock' },
    shiny_rock:  { drops: [{id:'stone', count:1, chance:1.0}, {id:'magnet', count:1, chance:0.8}, {id:'crystal', count:1, chance:0.4}], respawnHours: 24, tool: null, name: 'Shiny Rock' },
    weeds:       { drops: [{id:'fiber', count:2, chance:1.0}, {id:'bean', count:1, chance:0.3}], respawnHours: 6,  tool: null, name: 'Tall Grass' },
    bird_poop:   { drops: [{id:'seed', count:1, chance:1.0}, {id:'rose_seed', count:1, chance:0.5}, {id:'tulip_bulb', count:1, chance:0.5}], disappears: true, name: 'Bird Poop' },
    rosebush:    { drops: [{id:'rose_seed', count:1, chance:1.0}], respawnHours: 12, tool: null, name: 'Rose Bush' }
    // Note: flower, tulip, and water pond decorations have been removed from world generation.
};

// ===== NOTIFICATIONS =====
let notifications = [];

function notify(text, duration = 2000) {
    notifications.push({ text, life: duration, maxLife: duration, y: height + 20 });
}

function updateNotifications(dt) {
    for (let i = notifications.length - 1; i >= 0; i--) {
        const n = notifications[i];
        n.life -= dt;
        if (n.life <= 0) {
            notifications.splice(i, 1);
        } else {
            // Anchor bottom-left, stack upward
            const targetY = height - 18 - i * 14;
            n.y += (targetY - n.y) * 0.15;
        }
    }
}

function drawNotifications() {
    for (const n of notifications) {
        const alpha = n.life < 500 ? map(n.life, 0, 500, 0, 255) : 255;
        fill(0, 0, 0, alpha * 0.7);
        noStroke();
        const tw = textWidth(n.text) + 10;
        rect(8, n.y, tw, 12);
        fill(255, 255, 200, alpha);
        textAlign(LEFT, CENTER);
        textSize(10);
        textFont('Courier New');
        text(n.text, 13, n.y + 6);
    }
}

function preload() {
    for (const [key, path] of Object.entries(SPRITE_DEFS)) {
        // loadImage with error callback so missing files don't hang preload
        SPRITES[key] = loadImage(path, () => {}, () => {
            console.warn(`Failed to load sprite ${key} from ${path}`);
            SPRITES[key] = null;
        });
    }
}

function setup() {
    const canvas = createCanvas(CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    canvas.parent('game-container');
    pixelDensity(1);
    noSmooth();

    // Initialize world
    world = new World();

    // Initialize player at center of island
    player = new Player(50, 50);

    // Initialize inventory
    inventory = new Inventory();

    // Initialize buildings
    buildings = [];
    spawnPlayerShack();

    // Center camera on player
    updateCamera();

    // Load save data if exists
    loadSaveData();
}

function draw() {
    background(0);

    // Advance water animation (4 frames, ~8fps)
    waterFrame = Math.floor(frameCount / 8) % 4;

    switch(gameState) {
        case STATE.START:
            drawStartScreen();
            break;
        case STATE.PLAYING:
            drawGame();
            break;
        case STATE.INSIDE:
            drawInterior();
            break;
        case STATE.MENU:
            if (insideBuilding) drawInterior(); else drawGame();
            drawMenuScreen();
            break;
        case STATE.PAUSED:
            if (insideBuilding) drawInterior(); else drawGame();
            drawPauseMenu();
            break;
        default:
            // States added by other modules (dialogue, minigame)
            if (gameState === 'dialogue') {
                drawGame();
                drawDialogueScreen();
            } else if (gameState === 'minigame') {
                drawGame();
                drawMinigame();
            }
            break;
    }
}

function drawStartScreen() {
    // Gradient sky background
    for (let y = 0; y < height; y++) {
        const inter = map(y, 0, height, 0, 1);
        const c = lerpColor(color('#87CEEB'), color('#FFB6C1'), inter);
        stroke(c);
        line(0, y, width, y);
    }
    
    // Title
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    textFont('Courier New');
    text('Cozy Island', width / 2, 60);
    textSize(16);
    text('🏝️ ✧ Sweet Dreams ✧ 🏝️', width / 2, 85);
    
    // Menu options
    textSize(20);
    for (let i = 0; i < startMenuOptions.length; i++) {
        if (i === selectedMenuOption) {
            fill(255, 255, 100);
            text('▶ ' + startMenuOptions[i] + ' ◀', width / 2, 150 + i * 40);
        } else {
            fill(255);
            text('  ' + startMenuOptions[i], width / 2, 150 + i * 40);
        }
    }
    
    // Instructions
    textSize(12);
    fill(200);
    text('Use arrows or click to select, Enter to confirm', width / 2, height - 30);
}

function handleMovement() {
    if (gameState !== STATE.PLAYING || !player) return;
    
    const now = millis();
    if (now - lastMoveTime < MOVE_COOLDOWN) return;
    
    let moved = false;
    
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W
        player.move(0, -1);
        moved = true;
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S
        player.move(0, 1);
        moved = true;
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A
        player.move(-1, 0);
        moved = true;
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D
        player.move(1, 0);
        moved = true;
    }
    
    if (moved) {
        updateCamera();
        lastMoveTime = now;
    }
}

// Movement inside a building — clamped to interior dimensions, walls block
function handleInteriorMovement() {
    if (gameState !== STATE.INSIDE || !player || !insideBuilding) return;
    
    const now = millis();
    if (now - lastMoveTime < MOVE_COOLDOWN) return;
    
    const b = insideBuilding;
    let moved = false;
    let dx = 0, dy = 0;
    
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { dy = -1; moved = true; }
    else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { dy = 1; moved = true; }
    else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { dx = -1; moved = true; }
    else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { dx = 1; moved = true; }
    
    if (moved) {
        const newX = player.x + dx;
        const newY = player.y + dy;
        // Clamp to interior bounds
        if (newX < 0 || newX >= b.interiorW || newY < 0 || newY >= b.interiorH) {
            lastMoveTime = now;
            return;
        }
        // Walls block movement
        const tile = b.interiorTiles[newX][newY];
        if (tile.type === 'wall') {
            lastMoveTime = now;
            return;
        }
        // Track facing
        if (dx !== 0) player.facing = dx > 0 ? 'right' : 'left';
        if (dy !== 0) player.facing = dy > 0 ? 'down' : 'up';
        player.x = newX;
        player.y = newY;
        lastMoveTime = now;
    }
}

function drawGame() {    // Handle continuous movement
    handleMovement();

    // Check for tile respawns
    checkRespawns();

    // Update notifications
    if (deltaTime) updateNotifications(deltaTime);

    // Draw world
    world.draw();

    // Draw buildings (after world, before player for depth)
    for (const b of buildings) {
        b.draw();
    }

    // Draw NPCs
    if (typeof drawEntities === 'function') drawEntities();

    // Draw player
    player.draw();

    // Draw tree/palm canopies on top of player so walking under them looks right.
    world.drawTreeTops();

    // Day/night overlay
    drawDayNightOverlay();

    // Draw UI
    drawUI();

    // Draw notifications on top
    drawNotifications();

    // Draw fairy overlay (from magic system)
    if (typeof drawFairyOverlay === 'function') drawFairyOverlay();

    // Update entities
    if (typeof updateEntities === 'function') updateEntities(deltaTime);
    if (typeof updateFairies === 'function') updateFairies(deltaTime);
    if (typeof updateDialogue === 'function') updateDialogue(deltaTime);
    if (typeof updateMinigame === 'function' && gameState === 'minigame') updateMinigame(deltaTime);

    // Auto-save
    if (typeof autoSave === 'function') autoSave();
}

function drawDayNightOverlay() {
    const hour = world.timeMinutes / 60;
    let darkness = 0;
    let r = 20, g = 20, b = 60;
    
    if (hour < 5) {
        // Deep night
        darkness = 0.5;
    } else if (hour < 7) {
        // Dawn
        darkness = map(hour, 5, 7, 0.5, 0);
        r = lerp(60, 20, map(hour, 5, 7, 0, 1));
        g = lerp(40, 20, map(hour, 5, 7, 0, 1));
        b = lerp(80, 60, map(hour, 5, 7, 0, 1));
    } else if (hour < 17) {
        // Full day
        darkness = 0;
    } else if (hour < 20) {
        // Dusk
        darkness = map(hour, 17, 20, 0, 0.5);
        r = lerp(20, 80, map(hour, 17, 20, 0, 1));
        g = lerp(20, 30, map(hour, 17, 20, 0, 1));
        b = lerp(60, 40, map(hour, 17, 20, 0, 1));
    } else {
        // Night
        darkness = 0.5;
    }
    
    if (darkness > 0) {
        noStroke();
        fill(r, g, b, darkness * 255);
        rect(0, 0, width, height);
    }
}

function drawUI() {
    // Top bar with date/time
    fill(0, 0, 0, 150);
    rect(0, 0, width, 30);

    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Day 1 - Sweet Season', 10, 15);

    textAlign(RIGHT, CENTER);
    text('🕐 ' + world.getTimeString(), width - 10, 15);

    // Save indicator
    if (world.showSaveIndicator) {
        fill(0, 0, 0, 150);
        rect(width - 60, 35, 50, 20);
        fill(100, 255, 100);
        textAlign(CENTER, CENTER);
        text('Saved!', width - 35, 45);
    }

    // Hotbar — 8 slots at bottom center
    drawHotbar();
}

function drawHotbar() {
    const slotSize = 20;
    const gap = 2;
    const totalW = 8 * slotSize + 7 * gap;
    const startX = (width - totalW) / 2;
    const y = height - slotSize - 4;

    for (let i = 0; i < 8; i++) {
        const x = startX + i * (slotSize + gap);

        // Slot background
        if (i === hotbarSlot) {
            fill(255, 255, 100, 200);
        } else {
            fill(0, 0, 0, 180);
        }
        noStroke();
        rect(x, y, slotSize, slotSize);

        // Slot border
        stroke(255, 200);
        strokeWeight(1);
        noFill();
        rect(x, y, slotSize, slotSize);
        noStroke();

        // Draw item if present
        const slot = inventory.slots[i];
        if (slot) {
            drawItemIcon(slot.id, x, y, slotSize);
            // Stack count
            if (slot.count > 1) {
                fill(255);
                textAlign(RIGHT, BOTTOM);
                textSize(8);
                textFont('Courier New');
                text(slot.count, x + slotSize - 1, y + slotSize);
            }
            // Durability pips for tools
            if (typeof slot.durability === 'number') {
                drawDurabilityPips(slot, x, y, slotSize);
            }
        }

        // Slot number
        fill(255, 150);
        textAlign(LEFT, TOP);
        textSize(7);
        textFont('Courier New');
        text(i + 1, x + 1, y + 1);
    }
}

function drawItemIcon(itemId, x, y, size) {
    const item = ITEMS[itemId];
    if (!item) return;
    const spr = SPRITES['items.' + itemId];
    if (spr) {
        // Center the sprite in the slot, draw at native or scaled size
        const sw = spr.width;
        const sh = spr.height;
        // Scale to fit slot with small padding
        const pad = 2;
        const drawSize = size - pad * 2;
        const ox = x + (size - drawSize) / 2;
        const oy = y + (size - drawSize) / 2;
        image(spr, ox, oy, drawSize, drawSize);
    } else {
        // Fallback: colored rect
        fill(item.color);
        noStroke();
        rect(x + 2, y + 2, size - 4, size - 4);
    }
}

// Draw durability pips (diamonds) at the bottom of a slot.
// Filled diamonds = remaining durability, hollow = used.
function drawDurabilityPips(slot, x, y, size) {
    const maxDur = ITEMS[slot.id] && ITEMS[slot.id].durability ? ITEMS[slot.id].durability : 3;
    const cur = slot.durability;
    const pipSize = max(2, Math.floor(size / 7));
    const gap = 1;
    const totalW = maxDur * pipSize + (maxDur - 1) * gap;
    const startY = y + size - pipSize - 1;
    const startX = x + (size - totalW) / 2;
    noStroke();
    for (let i = 0; i < maxDur; i++) {
        const px = startX + i * (pipSize + gap);
        if (i < cur) {
            // Filled — green if healthy, yellow at 1, red at 0 (shouldn't show at 0)
            fill(cur > 1 ? '#7CB342' : '#FFD93D');
        } else {
            // Hollow — dark grey
            fill(60, 60, 60, 200);
        }
        // Small diamond shape
        push();
        translate(px + pipSize / 2, startY + pipSize / 2);
        rotate(QUARTER_PI);
        rectMode(CENTER);
        rect(0, 0, pipSize, pipSize);
        rectMode(CORNER);
        pop();
    }
}

function drawMenuScreen() {
    // Dim overlay
    fill(0, 0, 0, 200);
    noStroke();
    rect(0, 0, width, height);

    // ===== LAYOUT =====
    // Left panel: tabs + content (inventory grid, crafting, etc.)
    // Right panel: player portrait + info
    const pad = 8;
    const tabH = 16;
    const leftX = pad;
    const leftY = pad + 20; // below top bar
    const leftW = 320;
    const leftH = height - leftY - pad - 20; // leave room for bottom hint

    // Right panel
    const rightX = leftX + leftW + pad;
    const rightW = width - rightX - pad;
    const rightY = leftY;
    const rightH = leftH;

    // ===== DRAW LEFT PANEL =====
    fill(20, 14, 10, 235);
    stroke(180, 160, 120);
    strokeWeight(1);
    rect(leftX, leftY, leftW, leftH);
    noStroke();

    // ===== TAB BAR =====
    const tabW = leftW / MENU_TABS.length;
    for (let i = 0; i < MENU_TABS.length; i++) {
        const tx = leftX + i * tabW;
        if (i === menuTab) {
            fill(80, 70, 50);
            rect(tx, leftY, tabW, tabH);
            fill(255, 255, 200);
        } else {
            fill(40, 30, 20);
            rect(tx, leftY, tabW, tabH);
            fill(150);
        }
        textAlign(CENTER, CENTER);
        textSize(8);
        textFont('Courier New');
        text(MENU_TABS[i], tx + tabW / 2, leftY + tabH / 2);
    }

    // Tab content area
    const contentY = leftY + tabH + 4;
    const contentH = leftH - tabH - 8;

    // ===== TAB CONTENT =====
    switch(menuTab) {
        case 0: drawInventoryTab(leftX + 4, contentY, leftW - 8, contentH); break;
        case 1:
            if (typeof drawCraftingTab === 'function') drawCraftingTab(leftX + 4, contentY, leftW - 8, contentH);
            break;
        case 2:
            drawPlaceholderTab(leftX + 4, contentY, 'Treasure', 'Use a Gettin Stick to pull treasure from the water. Sea creatures are coming soon!');
            break;
        case 3:
            if (typeof drawGardeningTab === 'function') drawGardeningTab(leftX + 4, contentY, leftW - 8, contentH);
            else drawPlaceholderTab(leftX + 4, contentY, 'Gardening', 'Plant seeds in fertile soil.');
            break;
        case 4:
            if (typeof drawMagicTab === 'function') drawMagicTab(leftX + 4, contentY, leftW - 8, contentH);
            break;
        case 5:
            if (typeof drawFriendsTab === 'function') drawFriendsTab(leftX + 4, contentY, leftW - 8, contentH);
            break;
        case 6: drawSettingsTab(leftX + 4, contentY, leftW - 8, contentH); break;
    }

    // ===== DRAW RIGHT PANEL =====
    fill(20, 14, 10, 235);
    stroke(180, 160, 120);
    rect(rightX, rightY, rightW, rightH);
    noStroke();

    // Player portrait
    const portraitSize = min(rightW - 12, 48);
    const px = rightX + (rightW - portraitSize) / 2;
    const py = rightY + 8;
    fill(40, 30, 20);
    rect(px, py, portraitSize, portraitSize);
    stroke(200, 180, 140);
    noFill();
    rect(px, py, portraitSize, portraitSize);
    noStroke();

    const pSpr = SPRITES['sprites.player'];
    if (pSpr) {
        image(pSpr, px + 2, py + 2, portraitSize - 4, portraitSize - 4);
    } else {
        fill(0, 100, 255);
        rect(px + 2, py + 2, portraitSize - 4, portraitSize - 4);
    }

    // Player info
    fill(255, 255, 200);
    textAlign(CENTER, TOP);
    textSize(10);
    textFont('Courier New');
    text('Player', rightX + rightW / 2, py + portraitSize + 4);

    fill(200);
    textSize(8);
    text('Day ' + world.day, rightX + rightW / 2, py + portraitSize + 18);
    text(world.season + ' Season', rightX + rightW / 2, py + portraitSize + 30);
    text(world.getTimeString(), rightX + rightW / 2, py + portraitSize + 42);

    // Selected item info (for inventory tab)
    if (menuTab === 0) {
        const selected = inventory.slots[invSelectedSlot];
        const infoY = py + portraitSize + 56;
        fill(0, 0, 0, 120);
        rect(rightX + 4, infoY, rightW - 8, 60);
        if (selected) {
            const item = ITEMS[selected.id];
            fill(255, 255, 200);
            textAlign(LEFT, TOP);
            textSize(9);
            text(item.name, rightX + 8, infoY + 4);
            fill(200);
            textSize(7);
            text('x' + selected.count, rightX + 8, infoY + 16);
            text(item.desc, rightX + 8, infoY + 28, rightW - 16);
            // Show durability for tools
            if (typeof selected.durability === 'number') {
                const maxDur = item.durability || 3;
                fill(selected.durability > 1 ? '#7CB342' : '#FFD93D');
                text('Durability: ' + selected.durability + '/' + maxDur, rightX + 8, infoY + 44);
                fill(150);
                text('Category: ' + item.category, rightX + 8, infoY + 52);
            } else {
                fill(150);
                text('Category: ' + item.category, rightX + 8, infoY + 52);
            }
        } else {
            fill(150);
            textAlign(CENTER, TOP);
            textSize(8);
            text('Empty slot', rightX + rightW / 2, infoY + 24);
        }
    }

    // ===== BOTTOM HINT =====
    fill(150);
    textAlign(CENTER, BOTTOM);
    textSize(8);
    textFont('Courier New');
    text('E to close  ·  Click tabs to switch  ·  Click items to swap', width / 2, height - 4);
}

// ===== INVENTORY TAB =====
function drawInventoryTab(x, y, w, h) {
    const slotSize = 16;
    const gap = 2;
    const cols = 8;

    // Hotbar label
    fill(200);
    textAlign(LEFT, TOP);
    textSize(8);
    textFont('Courier New');
    text('Hotbar', x, y);

    // Hotbar (8 slots)
    const hbY = y + 12;
    for (let i = 0; i < INV_HOTBAR_SIZE; i++) {
        drawMenuSlot(i, x + i * (slotSize + gap), hbY, slotSize);
    }

    // Category sections
    let sectionY = hbY + slotSize + 8;
    const sectionLabels = ['Materials', 'Gifts', 'Tools', 'Treasure', 'Blocks'];

    for (let cat = 0; cat < INV_CATEGORIES.length; cat++) {
        const catStart = INV_HOTBAR_SIZE + cat * INV_SLOTS_PER_CAT;

        // Section label
        fill(180);
        textAlign(LEFT, TOP);
        textSize(8);
        textFont('Courier New');
        text(sectionLabels[cat], x, sectionY);

        // 16 slots = 2 rows of 8
        const catY = sectionY + 12;
        for (let i = 0; i < INV_SLOTS_PER_CAT; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            drawMenuSlot(catStart + i, x + col * (slotSize + gap), catY + row * (slotSize + gap), slotSize);
        }

        sectionY = catY + 2 * (slotSize + gap) + 6;
    }
}

// ===== CRAFTING TAB =====
function drawCraftingTab(x, y, w, h) {
    if (typeof _drawCraftingTabImpl === 'function') {
        _drawCraftingTabImpl(x, y, w, h);
        return;
    }
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Crafting', x, y);
    fill(120);
    textSize(8);
    text('Crafting recipes will appear here.', x, y + 16);
    text('(Not yet implemented)', x, y + 28);
}

function drawPlaceholderTab(x, y, title, desc) {
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text(title, x, y);
    fill(120);
    textSize(8);
    text(desc, x, y + 16);
    text('(Coming soon)', x, y + 28);
}

// ===== MAGIC TAB =====
function drawMagicTab(x, y, w, h) {
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Magic Tricks', x, y);
    fill(120);
    textSize(8);
    text('Learn magic from neighbors to unlock tricks.', x, y + 16);
    text('(Not yet implemented)', x, y + 28);
}

// ===== FRIENDS TAB =====
function drawFriendsTab(x, y, w, h) {
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Friendships', x, y);
    fill(120);
    textSize(8);
    text('Neighbors will appear here once they arrive.', x, y + 16);
    text('(Not yet implemented)', x, y + 28);
}

// ===== SETTINGS TAB =====
function drawSettingsTab(x, y, w, h) {
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Settings', x, y);

    fill(180);
    textSize(8);
    text('S - Save Game', x, y + 20);
    text('ESC - Pause Game', x, y + 32);

    fill(120);
    text('Volume: [TBD]', x, y + 48);
    text('Controls: [TBD]', x, y + 60);
    text('Mute: [TBD]', x, y + 72);

    fill(255, 255, 100);
    textSize(9);
    text('Press S to save your game', x, y + h - 16);
}

function drawMenuSlot(slotIndex, x, y, size) {
    const isSelected = slotIndex === invSelectedSlot && menuTab === 0;
    const isPendingSwap = mouseSelectedSlot === slotIndex;
    const isHotbar = slotIndex < 8;

    // Background
    if (isPendingSwap) {
        fill(100, 255, 150, 200); // green highlight for pending swap
    } else if (isSelected) {
        fill(255, 255, 100, 180);
    } else if (isHotbar && slotIndex === hotbarSlot) {
        fill(100, 200, 255, 120);
    } else {
        fill(50, 40, 30, 180);
    }
    noStroke();
    rect(x, y, size, size);

    // Border
    if (isPendingSwap) {
        stroke(100, 255, 100);
        strokeWeight(2);
    } else {
        stroke(isSelected ? 255 : 150, isSelected ? 255 : 100, 100, 200);
        strokeWeight(isSelected ? 2 : 1);
    }
    noFill();
    rect(x, y, size, size);
    noStroke();

    // Item
    const slot = inventory.slots[slotIndex];
    if (slot) {
        drawItemIcon(slot.id, x, y, size);
        if (slot.count > 1) {
            fill(255);
            textAlign(RIGHT, BOTTOM);
            textSize(7);
            textFont('Courier New');
            text(slot.count, x + size - 1, y + size);
        }
        // Durability pips for tools
        if (typeof slot.durability === 'number') {
            drawDurabilityPips(slot, x, y, size);
        }
    }

    // Hotbar number
    if (isHotbar) {
        fill(255, 120);
        textAlign(LEFT, TOP);
        textSize(6);
        text(slotIndex + 1, x + 1, y + 1);
    }
}

function drawPauseMenu() {
    // Semi-transparent overlay
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);
    
    // Menu
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Paused', width / 2, 80);
    
    textSize(16);
    text('ESC - Resume', width / 2, 120);
    text('S - Save Game', width / 2, 145);
    text('M - Mute (TBD)', width / 2, 170);
}

// ===== MOUSE CLICK-TO-SWAP FOR INVENTORY =====
// First click selects a slot, second click swaps the two slots.
// Clicking the same slot twice deselects it.
let mouseSelectedSlot = null; // pending slot for click-to-swap

// Compute the screen-space rect for a given inventory slot index,
// or null if it's not in a clickable area (only hotbar + inventory tab).
function getInventorySlotRect(slotIndex) {
    const pad = 8;
    const leftX = pad;
    const leftY = pad + 20;
    const leftW = 320;
    const slotSize = 16;
    const gap = 2;
    const cols = 8;

    // Hotbar slots (0-7)
    if (slotIndex < INV_HOTBAR_SIZE) {
        const hbY = leftY + tabH_menu() + 4 + 12;
        return { x: leftX + 4 + slotIndex * (slotSize + gap), y: hbY, w: slotSize, h: slotSize };
    }

    // Category slots (8+)
    const catIdx = Math.floor((slotIndex - INV_HOTBAR_SIZE) / INV_SLOTS_PER_CAT);
    const slotInCat = (slotIndex - INV_HOTBAR_SIZE) % INV_SLOTS_PER_CAT;
    const hbY = leftY + tabH_menu() + 4 + 12;
    let sectionY = hbY + slotSize + 8;
    const catY = sectionY + 12;

    const row = Math.floor(slotInCat / cols);
    const col = slotInCat % cols;

    // Each category section: 2 rows of slots + 6px spacing
    const catSectionH = 2 * (slotSize + gap) + 6;
    const slotY = catY + row * (slotSize + gap) + catIdx * catSectionH;

    return { x: leftX + 4 + col * (slotSize + gap), y: slotY, w: slotSize, h: slotSize };
}

// Helper to get the tab height used in drawMenuScreen
function tabH_menu() { return 16; }

// Find which inventory slot the mouse is over, or -1 if none.
function getSlotAtMouse() {
    // Only active when menu is open and on inventory tab
    if (typeof gameState === 'undefined' || gameState !== STATE.MENU) return -1;
    if (typeof menuTab === 'undefined' || menuTab !== 0) return -1;

    for (let i = 0; i < INV_TOTAL; i++) {
        const r = getInventorySlotRect(i);
        if (r && mouseX >= r.x && mouseX < r.x + r.w && mouseY >= r.y && mouseY < r.y + r.h) {
            return i;
        }
    }
    return -1;
}

function mousePressed() {
    // ===== START SCREEN =====
    if (gameState === STATE.START) {
        // Menu options are at y = 150 + i*40, centered horizontally
        for (let i = 0; i < startMenuOptions.length; i++) {
            const oy = 150 + i * 40;
            // Approximate text width for 20px font
            const tw = textWidth(startMenuOptions[i]) + 40; // generous hit area
            if (mouseY >= oy - 14 && mouseY < oy + 14 &&
                mouseX >= width / 2 - tw / 2 && mouseX < width / 2 + tw / 2) {
                selectedMenuOption = i;
                handleStartMenuSelection();
                return;
            }
        }
        return;
    }

    // ===== PLAYING: click to interact (same as Enter) =====
    if (gameState === STATE.PLAYING) {
        // Try entering building first
        if (tryEnterBuilding()) return;
        // Check NPC talk, then harvest
        if (typeof npcAtFacing === 'function') {
            const npc = npcAtFacing();
            if (npc) {
                openDialogue(npc);
                return;
            }
        }
        tryHarvest();
        return;
    }

    // ===== INSIDE: click to interact (exit on door) =====
    if (gameState === STATE.INSIDE) {
        // Same as pressing Enter — try to exit
        tryExitBuilding();
        return;
    }

    // ===== MENU: tab switching + inventory swaps + crafting =====
    if (gameState === STATE.MENU) {
        const pad = 8;
        const leftX = pad;
        const leftY = pad + 20;
        const leftW = 320;
        const tabH = 16;

        // --- Tab bar clicks ---
        const tabW = leftW / MENU_TABS.length;
        for (let i = 0; i < MENU_TABS.length; i++) {
            const tx = leftX + i * tabW;
            if (mouseX >= tx && mouseX < tx + tabW &&
                mouseY >= leftY && mouseY < leftY + tabH) {
                menuTab = i;
                mouseSelectedSlot = null; // reset swap selection on tab change
                return;
            }
        }

        // --- Inventory tab: click-to-swap + click hotbar to select ---
        if (menuTab === 0) {
            const slot = getSlotAtMouse();
            if (slot >= 0) {
                // If it's a hotbar slot, just select it as active
                if (slot < INV_HOTBAR_SIZE) {
                    hotbarSlot = slot;
                    invSelectedSlot = slot;
                    return;
                }
                // Otherwise do click-to-swap
                if (mouseSelectedSlot === null) {
                    mouseSelectedSlot = slot;
                    invSelectedSlot = slot;
                } else if (mouseSelectedSlot === slot) {
                    mouseSelectedSlot = null;
                } else {
                    inventory.swapSlots(mouseSelectedSlot, slot);
                    const fromName = inventory.slots[slot] ? ITEMS[inventory.slots[slot].id].name : 'empty';
                    notify('Swapped: ' + fromName);
                    mouseSelectedSlot = null;
                    invSelectedSlot = slot;
                }
                return;
            }
        }

        // --- Crafting tab: click a recipe to craft it ---
        if (menuTab === 1 && typeof getActiveRecipes === 'function') {
            const recipes = getActiveRecipes();
            const contentY = leftY + tabH + 4;
            const rowH = 30;
            const listY = contentY + 14;
            const recipeX = leftX + 4;
            const recipeW = leftW - 8;
            for (let i = 0; i < Math.min(recipes.length, 20); i++) {
                const ry = listY + i * rowH;
                if (mouseX >= recipeX && mouseX < recipeX + recipeW &&
                    mouseY >= ry && mouseY < ry + rowH - 2) {
                    craftSelectedIndex = i;
                    craftItem(i);
                    return;
                }
            }
        }

        // --- Settings tab: click "Save Game" text ---
        if (menuTab === 6) {
            const contentY = leftY + tabH + 4;
            const sx = leftX + 4;
            // "S - Save Game" is at y + 20
            const saveY = contentY + 20;
            if (mouseY >= saveY - 4 && mouseY < saveY + 10 &&
                mouseX >= sx && mouseX < sx + 120) {
                if (typeof saveGame === 'function') saveGame();
                else if (typeof enhancedSaveGame === 'function') enhancedSaveGame();
                notify('Game saved!');
                return;
            }
        }

        return;
    }

    // ===== PAUSED: click "Resume" or "Save" =====
    if (gameState === STATE.PAUSED) {
        // "ESC - Resume" at y=120, "S - Save Game" at y=145
        if (mouseY >= 110 && mouseY < 130) {
            gameState = STATE.PLAYING;
            return;
        }
        if (mouseY >= 135 && mouseY < 155) {
            if (typeof saveGame === 'function') saveGame();
            else if (typeof enhancedSaveGame === 'function') enhancedSaveGame();
            return;
        }
        return;
    }
}

// ===== BUILDING ENTER/EXIT =====
// Player's saved position before entering a building
let savedPlayerX = 0, savedPlayerY = 0, savedPlayerFacing = 'down';

function tryEnterBuilding() {
    const facing = player.getFacingTile();
    if (!facing) return false;
    const b = buildingAt(facing.x, facing.y);
    if (!b) return false;

    // Only enter from the door tile (bottom-center of the building exterior).
    // The player must be facing that specific tile.
    const door = b.getDoorTile();
    if (facing.x !== door.x || facing.y !== door.y) {
        notify("The door is on the front of the building.");
        return false;
    }

    // Save player position (standing outside, facing the door)
    savedPlayerX = player.x;
    savedPlayerY = player.y;
    savedPlayerFacing = player.facing;

    // Set player to interior door position (stand above the door, inside)
    const intDoor = b.getInteriorDoorPos();
    player.x = intDoor.x;
    player.y = intDoor.y - 1;
    player.facing = 'up';
    insideBuilding = b;
    gameState = STATE.INSIDE;
    notify("Entered " + (BUILDING_TIERS[b.type] ? BUILDING_TIERS[b.type].name : b.type));
    return true;
}

function tryExitBuilding() {
    if (!insideBuilding) return false;
    const b = insideBuilding;
    const intDoor = b.getInteriorDoorPos();
    // Only exit if player is standing on the interior door tile
    if (player.x !== intDoor.x || player.y !== intDoor.y) return false;

    // Place player directly in front of the exterior door (one tile below it),
    // facing up toward the building.
    const door = b.getDoorTile();
    player.x = door.x;
    player.y = door.y + 1; // one tile below the door
    player.facing = 'up';

    // Make sure the exit tile isn't solid (walk on grass, not ocean)
    if (world.tiles[player.x] && world.tiles[player.x][player.y]) {
        if (TILE_SOLID.has(world.tiles[player.x][player.y].type)) {
            // Try the tile above the door instead
            player.y = door.y + 1;
            if (TILE_SOLID.has(world.tiles[player.x][player.y].type)) {
                // Last resort: use saved position
                player.x = savedPlayerX;
                player.y = savedPlayerY;
            }
        }
    }

    insideBuilding = null;
    gameState = STATE.PLAYING;
    updateCamera();
    notify("Exited building");
    return true;
}

// ===== INTERIOR RENDERING =====
function drawInterior() {
    if (!insideBuilding) return;
    const b = insideBuilding;
    const TS = CONFIG.TILE_SIZE;

    // Handle movement inside
    handleInteriorMovement();

    // Dark background
    background(15, 10, 8);

    // Center the interior in the canvas
    const interiorPixW = b.interiorW * TS;
    const interiorPixH = b.interiorH * TS;
    const offsetX = Math.floor((CONFIG.CANVAS_WIDTH - interiorPixW) / 2);
    const offsetY = Math.floor((CONFIG.CANVAS_HEIGHT - interiorPixH) / 2);

    // Draw interior tiles
    for (let x = 0; x < b.interiorW; x++) {
        for (let y = 0; y < b.interiorH; y++) {
            const tile = b.interiorTiles[x][y];
            const sx = offsetX + x * TS;
            const sy = offsetY + y * TS;
            drawInteriorTile(tile, sx, sy, TS);
        }
    }

    // Draw door marker (highlight the exit tile)
    const door = b.getInteriorDoorPos();
    const doorX = offsetX + door.x * TS;
    const doorY = offsetY + door.y * TS;
    // Brown door rectangle
    fill('#8B4513');
    noStroke();
    rect(doorX + 2, doorY + 2, TS - 4, TS - 4);
    // Door knob
    fill('#FFD700');
    rect(doorX + TS - 6, doorY + TS / 2 - 1, 2, 2);
    // "Exit" label
    fill(255, 255, 200);
    textAlign(CENTER, BOTTOM);
    textSize(7);
    textFont('Courier New');
    text('EXIT', doorX + TS / 2, doorY - 1);

    // Draw player
    const px = offsetX + player.x * TS;
    const py = offsetY + player.y * TS;
    const pSpr = SPRITES['sprites.player'];
    if (pSpr) {
        image(pSpr, px, py, TS, TS);
    } else {
        fill(0, 100, 255);
        rect(px, py, TS, TS);
    }

    // Draw HUD (time, day)
    fill(255, 255, 200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('🕐 ' + world.getTimeString(), 8, 15);
    fill(200);
    textSize(8);
    text(BUILDING_TIERS[b.type] ? BUILDING_TIERS[b.type].name : b.type, 8, 28);
    text(b.interiorW + 'x' + (b.interiorH - INTERIOR_WALL_HEIGHT) + ' space', 8, 38);

    // Hint
    fill(150);
    textAlign(CENTER, BOTTOM);
    textSize(8);
    text('Enter: exit  ·  E: menu', width / 2, height - 4);

    // Notifications still draw
    drawNotifications();

    // Update time inside (same as outside)
    if (deltaTime) {
        const gameMinutesPerRealMin = (24 * 60) / CONFIG.DAY_LENGTH_MINUTES;
        world.timeMinutes += gameMinutesPerRealMin * (deltaTime / 60000);
    }
    if (world.timeMinutes >= 24 * 60) {
        world.timeMinutes = 0;
        world.day++;
    }
    if (deltaTime) updateNotifications(deltaTime);
}

function drawInteriorTile(tile, sx, sy, TS) {
    if (tile.type === 'wall') {
        // Wood wall
        fill('#5D4037');
        noStroke();
        rect(sx, sy, TS, TS);
        // Wood plank lines
        fill('#4E342E');
        rect(sx, sy + TS / 2 - 1, TS, 1);
        rect(sx + TS / 2 - 1, sy, 1, TS / 2);
    } else if (tile.type === 'grass') {
        const spr = SPRITES['tiles.grass'];
        if (spr) {
            image(spr, sx, sy, TS, TS);
        } else {
            fill('#7CB342');
            rect(sx, sy, TS, TS);
        }
    } else {
        // Fallback
        fill('#7CB342');
        rect(sx, sy, TS, TS);
    }
}

function keyPressed() {
    if (gameState === STATE.START) {
        if (keyCode === UP_ARROW) {
            selectedMenuOption = (selectedMenuOption - 1 + startMenuOptions.length) % startMenuOptions.length;
            return false;
        } else if (keyCode === DOWN_ARROW) {
            selectedMenuOption = (selectedMenuOption + 1) % startMenuOptions.length;
            return false;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            handleStartMenuSelection();
            return false;
        }
        return false;
    } else if (gameState === STATE.PLAYING) {
        if (keyCode === ESCAPE) {
            gameState = STATE.PAUSED;
            return false;
        } else if (key === 'e' || key === 'E') {
            gameState = STATE.MENU;
            menuTab = 0;
            invSelectedSlot = 0;
            return false;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            // Check if facing a building — enter it
            if (tryEnterBuilding()) return false;
            // Check if facing an NPC — talk to them
            if (typeof npcAtFacing === 'function') {
                const npc = npcAtFacing();
                if (npc) {
                    openDialogue(npc);
                    return false;
                }
            }
            // Otherwise try harvest (gettin/gardening handled by their own key wrappers)
            tryHarvest();
            return false;
        } else if (keyCode === SHIFT) {
            // Shift+Enter for advanced NPC menu — check on Enter with shift held
            return false;
        } else if (keyCode >= 49 && keyCode <= 56) {
            hotbarSlot = keyCode - 49;
            return false;
        }
        return false;
    } else if (gameState === STATE.INSIDE) {
        if (keyCode === ESCAPE) {
            gameState = STATE.PAUSED;
            return false;
        } else if (key === 'e' || key === 'E') {
            gameState = STATE.MENU;
            menuTab = 0;
            invSelectedSlot = 0;
            return false;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            // Try to exit building (must be on door tile)
            tryExitBuilding();
            return false;
        } else if (keyCode >= 49 && keyCode <= 56) {
            hotbarSlot = keyCode - 49;
            return false;
        }
        return false;
    } else if (gameState === 'dialogue') {
        if (typeof handleDialogueKey === 'function') {
            return handleDialogueKey(keyCode, key);
        }
        return false;
    } else if (gameState === 'minigame') {
        if (typeof handleMinigameKey === 'function') {
            return handleMinigameKey(keyCode);
        }
        return false;
    } else if (gameState === STATE.MENU) {
        if (key === 'e' || key === 'E' || keyCode === ESCAPE) {
            gameState = STATE.PLAYING;
            return false;
        } else if (key === 'q' || key === 'Q') {
            menuTab = (menuTab - 1 + MENU_TABS.length) % MENU_TABS.length;
            return false;
        } else if (key === 'w' || key === 'W') {
            menuTab = (menuTab + 1) % MENU_TABS.length;
            return false;
        } else if (keyCode === UP_ARROW) {
            if (menuTab === 0) invSelectedSlot = (invSelectedSlot - 8 + INV_TOTAL) % INV_TOTAL;
            return false;
        } else if (keyCode === DOWN_ARROW) {
            if (menuTab === 0) invSelectedSlot = (invSelectedSlot + 8) % INV_TOTAL;
            return false;
        } else if (keyCode === LEFT_ARROW) {
            if (menuTab === 0) invSelectedSlot = (invSelectedSlot - 1 + INV_TOTAL) % INV_TOTAL;
            return false;
        } else if (keyCode === RIGHT_ARROW) {
            if (menuTab === 0) invSelectedSlot = (invSelectedSlot + 1) % INV_TOTAL;
            return false;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            // In inventory tab: swap selected slot with active hotbar slot
            if (menuTab === 0 && invSelectedSlot !== hotbarSlot) {
                inventory.swapSlots(invSelectedSlot, hotbarSlot);
                notify('Swapped to hotbar slot ' + (hotbarSlot + 1));
            }
            return false;
        } else if (keyCode >= 49 && keyCode <= 56) {
            // In inventory tab: number keys 1-8 swap selected slot with that hotbar slot
            if (menuTab === 0) {
                const targetHotbar = keyCode - 49;
                if (invSelectedSlot !== targetHotbar) {
                    inventory.swapSlots(invSelectedSlot, targetHotbar);
                    notify('Swapped to hotbar slot ' + (targetHotbar + 1));
                }
            }
            return false;
        } else if (key === 's' || key === 'S') {
            if (menuTab === 6) saveGame();
            return false;
        }
        return false;
    } else if (gameState === STATE.PAUSED) {
        if (keyCode === ESCAPE) {
            gameState = STATE.PLAYING;
            return false;
        } else if (key === 's' || key === 'S') {
            saveGame();
        }
    }
}

function updateCamera() {
    // Center camera on player
    cameraX = player.x * CONFIG.TILE_SIZE - CONFIG.CANVAS_WIDTH / 2;
    cameraY = player.y * CONFIG.TILE_SIZE - CONFIG.CANVAS_HEIGHT / 2;
    
    // Clamp camera to world bounds
    cameraX = constrain(cameraX, 0, CONFIG.WORLD_WIDTH * CONFIG.TILE_SIZE - CONFIG.CANVAS_WIDTH);
    cameraY = constrain(cameraY, 0, CONFIG.WORLD_HEIGHT * CONFIG.TILE_SIZE - CONFIG.CANVAS_HEIGHT);
}

// ===== HARVESTING =====
function tryHarvest() {
    // Check all 4 adjacent tiles (up/down/left/right) for harvestable items
    const dirs = [[0,-1,'up'], [0,1,'down'], [-1,0,'left'], [1,0,'right']];
    let bestTile = null;
    let bestInfo = null;

    // Prefer the faced tile, but fall back to any adjacent harvestable tile
    for (const [dx, dy, dirName] of dirs) {
        const tx = player.x + dx;
        const ty = player.y + dy;
        if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
        if (!world.tiles[tx] || !world.tiles[tx][ty]) continue;
        const tile = world.tiles[tx][ty];
        const harvestDef = HARVEST_TYPES[tile.type];
        // Tree/palm tops are not harvestable — only the solid trunk tile below.
        if (!harvestDef || tile.depleted || tile.isTreeTop) continue;

        // Prefer the tile we're facing
        if (dirName === player.facing) {
            bestTile = tile;
            bestInfo = { x: tx, y: ty, def: harvestDef };
            break;
        }
        // Otherwise remember the first valid adjacent tile
        if (!bestTile) {
            bestTile = tile;
            bestInfo = { x: tx, y: ty, def: harvestDef };
        }
    }

    if (!bestTile || !bestInfo) {
        notify('Nothing to harvest nearby.');
        return;
    }

    const tile = bestTile;
    const harvestDef = bestInfo.def;

    // Check tool requirement (null = bare hands OK)
    if (harvestDef.tool) {
        const active = inventory.getActiveItem();
        if (!active || active.id !== harvestDef.tool) {
            notify('Need a ' + ITEMS[harvestDef.tool].name + ' to harvest this.');
            return;
        }
        // Check tool durability
        if (typeof active.durability === 'number' && active.durability <= 0) {
            notify('Your ' + ITEMS[active.id].name + ' is broken!');
            return;
        }
    }

    // Harvest! Roll drops
    const gotItems = [];
    for (const drop of harvestDef.drops) {
        if (random() <= drop.chance) {
            inventory.addItem(drop.id, drop.count);
            gotItems.push(drop.count + 'x ' + ITEMS[drop.id].name);
        }
    }

    if (gotItems.length > 0) {
        notify('Got: ' + gotItems.join(', '));
    } else {
        notify('Nothing dropped this time...');
    }

    // Consume 1 durability from the tool used (if any).
    if (harvestDef.tool) {
        const active = inventory.getActiveItem();
        if (active && active.id === harvestDef.tool) {
            if (typeof active.durability !== 'number') active.durability = ITEMS[active.id].durability || 3;
            active.durability -= 1;
            if (active.durability <= 0) {
                notify('Your ' + ITEMS[active.id].name + ' broke!');
                inventory.removeItem(active.id, 1);
            }
        }
    }

    // Some harvestables disappear entirely instead of becoming depleted.
    if (harvestDef.disappears) {
        tile.type = 'grass';
        tile.variant = 0;
        tile.depleted = false;
        tile.respawnAt = null;
        return;
    }

    // Mark bottom tile as depleted, and sync the top tile if there is one.
    tile.depleted = true;
    tile.respawnAt = world.timeMinutes + harvestDef.respawnHours * 60;
    const topY = bestInfo.y - 1;
    if (topY >= 0 && world.tiles[bestInfo.x][topY] && world.tiles[bestInfo.x][topY].isTreeTop) {
        world.tiles[bestInfo.x][topY].depleted = true;
        world.tiles[bestInfo.x][topY].respawnAt = tile.respawnAt;
    }
}

function checkRespawns() {
    // Check visible tiles for respawn
    const startX = max(0, floor(cameraX / CONFIG.TILE_SIZE) - 2);
    const startY = max(0, floor(cameraY / CONFIG.TILE_SIZE) - 2);
    const endX = min(CONFIG.WORLD_WIDTH, startX + ceil(CONFIG.CANVAS_WIDTH / CONFIG.TILE_SIZE) + 4);
    const endY = min(CONFIG.WORLD_HEIGHT, startY + ceil(CONFIG.CANVAS_HEIGHT / CONFIG.TILE_SIZE) + 4);

    for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
            const tile = world.tiles[x][y];
            if (tile.depleted && world.timeMinutes >= tile.respawnAt) {
                tile.depleted = false;
                tile.respawnAt = null;
            }
        }
    }
}

// Spawn new bird poop on random grass tiles at the start of each day.
function spawnBirdPoop(targetCount) {
    if (!world) return;
    let attempts = 0;
    let spawned = 0;
    const px = player ? player.x : -1;
    const py = player ? player.y : -1;
    while (spawned < targetCount && attempts < 500) {
        attempts++;
        const x = floor(random(CONFIG.WORLD_WIDTH));
        const y = floor(random(CONFIG.WORLD_HEIGHT));
        const tile = world.tiles[x][y];
        if (!tile || tile.type !== 'grass') continue;
        if (isSolidTile(x, y)) continue;
        if (buildingAt(x, y)) continue;
        if (x === px && y === py) continue;
        world.tiles[x][y] = { type: 'bird_poop', variant: 0 };
        spawned++;
    }
    if (spawned > 0 && player) {
        notify('The birds have been busy overnight...');
    }
}

function handleStartMenuSelection() {
    switch(selectedMenuOption) {
        case 0: // Start
            startNewGame();
            break;
        case 1: // Load
            loadGame();
            break;
        case 2: // Settings - go straight to menu settings tab
            gameState = STATE.MENU;
            menuTab = 4;
            break;
    }
}

function startNewGame() {
    world = new World();
    player = new Player(50, 50);
    inventory = new Inventory();
    buildings = [];
    spawnPlayerShack();
    npcs = [];
    knownMagic = [];
    fairyEntities = [];
    // Spawn first neighbor
    checkArrivals();
    updateCamera();
    gameState = STATE.PLAYING;
}

// Spawn the player's starter shack just beside the spawn point
function spawnPlayerShack() {
    // Shack is 48x32 (3x2 tiles). Place it 2 tiles to the right of player spawn.
    const sx = 52;
    const sy = 49; // slightly above player so visible
    // Clear any decorations at those tiles
    for (let dx = 0; dx < 3; dx++) {
        for (let dy = 0; dy < 2; dy++) {
            if (world.tiles[sx + dx] && world.tiles[sx + dx][sy + dy]) {
                if (world.tiles[sx + dx][sy + dy].type !== 'sea' && world.tiles[sx + dx][sy + dy].type !== 'beach') {
                    world.tiles[sx + dx][sy + dy] = { type: 'grass', variant: 0 };
                }
            }
            // Also remove any tree/palm canopy tops directly above the cleared row.
            if (dy === 0) {
                const aboveY = sy + dy - 1;
                if (aboveY >= 0 && world.tiles[sx + dx] && world.tiles[sx + dx][aboveY] && world.tiles[sx + dx][aboveY].isTreeTop) {
                    world.tiles[sx + dx][aboveY] = { type: 'grass', variant: 0 };
                }
            }
        }
    }
    buildings.push(new Building('shack', sx, sy, 'player'));
}

function saveGame() {
    const data = {
        player: player.serialize(),
        world: world.serialize(),
        inventory: inventory.serialize(),
        buildings: buildings.map(b => b.serialize()),
        timestamp: millis()
    };

    localStorage.setItem('cozyIslandSave', JSON.stringify(data));
    world.showSaveIndicator = true;
    setTimeout(() => {
        world.showSaveIndicator = false;
    }, 2000);
}

function loadGame() {
    const saved = localStorage.getItem('cozyIslandSave');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            player = new Player(data.player.x, data.player.y);
            player.deserialize(data.player);
            world = new World();
            world.deserialize(data.world);
            inventory = new Inventory();
            if (data.inventory) inventory.deserialize(data.inventory);
            buildings = [];
            if (data.buildings) {
                for (const bd of data.buildings) {
                    buildings.push(Building.deserialize(bd));
                }
            }
            updateCamera();
            gameState = STATE.PLAYING;
        } catch (e) {
            console.error('Failed to load save:', e);
        }
    }
}

function loadSaveData() {
    // Checks if a save exists (used at startup)
    // Actual loading happens in loadGame()
    return localStorage.getItem('cozyIslandSave') !== null;
}

// ===== INVENTORY CLASS =====
// Categorized inventory: 8 hotbar + 16 materials + 16 gifts + 16 tools + 16 treasure + 16 blocks
const INV_CATEGORIES = ['material', 'gift', 'tool', 'treasure', 'block'];
const INV_SLOTS_PER_CAT = 16;
const INV_HOTBAR_SIZE = 8;
const INV_TOTAL = INV_HOTBAR_SIZE + INV_CATEGORIES.length * INV_SLOTS_PER_CAT;

class Inventory {
    constructor() {
        this.slots = new Array(INV_TOTAL).fill(null);
        this.heldItem = null; // For dragging/swapping
    }

    // Get the category section start index for an item
    getCategoryIndex(itemId) {
        const item = ITEMS[itemId];
        if (!item) return INV_HOTBAR_SIZE; // default to materials
        const catIdx = INV_CATEGORIES.indexOf(item.category);
        return INV_HOTBAR_SIZE + (catIdx >= 0 ? catIdx : 0) * INV_SLOTS_PER_CAT;
    }

    addItem(itemId, count = 1, opts = {}) {
        const item = ITEMS[itemId];
        if (!item) return false;

        // Tools don't stack — each gets its own slot with durability.
        const isTool = item.category === 'tool';
        const durability = (opts.durability !== undefined) ? opts.durability
                          : (typeof item.durability === 'number') ? item.durability
                          : undefined;

        // Try to stack into existing slots: hotbar first, then category section
        const catStart = this.getCategoryIndex(itemId);

        if (!isTool) {
            // Check hotbar for existing stacks
            for (let i = 0; i < INV_HOTBAR_SIZE; i++) {
                const s = this.slots[i];
                if (s && s.id === itemId && s.count < item.maxStack) {
                    const add = Math.min(count, item.maxStack - s.count);
                    s.count += add; count -= add;
                    if (count <= 0) return true;
                }
            }
            // Check category section for existing stacks
            for (let i = catStart; i < catStart + INV_SLOTS_PER_CAT; i++) {
                const s = this.slots[i];
                if (s && s.id === itemId && s.count < item.maxStack) {
                    const add = Math.min(count, item.maxStack - s.count);
                    s.count += add; count -= add;
                    if (count <= 0) return true;
                }
            }
        }

        // Find empty slot in category section
        for (let i = catStart; i < catStart + INV_SLOTS_PER_CAT; i++) {
            if (!this.slots[i]) {
                this.slots[i] = { id: itemId, count: Math.min(count, item.maxStack) };
                if (isTool && durability !== undefined) this.slots[i].durability = durability;
                count -= this.slots[i].count;
                if (count <= 0) return true;
            }
        }
        // Try hotbar as overflow
        for (let i = 0; i < INV_HOTBAR_SIZE; i++) {
            if (!this.slots[i]) {
                this.slots[i] = { id: itemId, count: Math.min(count, item.maxStack) };
                if (isTool && durability !== undefined) this.slots[i].durability = durability;
                count -= this.slots[i].count;
                if (count <= 0) return true;
            }
        }

        return false; // full
    }

    removeItem(itemId, count = 1) {
        let remaining = count;
        for (let i = 0; i < INV_TOTAL && remaining > 0; i++) {
            const s = this.slots[i];
            if (s && s.id === itemId) {
                const take = Math.min(remaining, s.count);
                s.count -= take;
                remaining -= take;
                if (s.count <= 0) this.slots[i] = null;
            }
        }
        return remaining === 0;
    }

    countItem(itemId) {
        let total = 0;
        for (let i = 0; i < INV_TOTAL; i++) {
            if (this.slots[i] && this.slots[i].id === itemId) total += this.slots[i].count;
        }
        return total;
    }

    hasItem(itemId, count = 1) { return this.countItem(itemId) >= count; }

    getActiveItem() { return this.slots[hotbarSlot]; }

    // Swap two slots (for reorganizing inventory)
    swapSlots(i, j) {
        const tmp = this.slots[i];
        this.slots[i] = this.slots[j];
        this.slots[j] = tmp;
    }

    // Move item from any slot to hotbar slot
    moveToHotbar(fromSlot, toHotbar) {
        const target = toHotbar; // 0-7
        this.swapSlots(fromSlot, target);
    }

    serialize() {
        return { slots: this.slots, hotbarSlot: hotbarSlot };
    }

    deserialize(data) {
        if (data.slots) {
            // Handle old saves with 24 slots — migrate to new size
            if (data.slots.length < INV_TOTAL) {
                const newSlots = new Array(INV_TOTAL).fill(null);
                for (let i = 0; i < data.slots.length; i++) newSlots[i] = data.slots[i];
                this.slots = newSlots;
                // Auto-sort into categories
                this.autoSort();
            } else {
                this.slots = data.slots;
            }
        }
        if (data.hotbarSlot !== undefined) hotbarSlot = data.hotbarSlot;
    }

    // Sort items into their proper category sections
    autoSort() {
        const hotbar = this.slots.slice(0, INV_HOTBAR_SIZE);
        const cats = {};
        for (const c of INV_CATEGORIES) cats[c] = [];
        const extra = [];

        for (let i = INV_HOTBAR_SIZE; i < this.slots.length; i++) {
            const s = this.slots[i];
            if (!s) continue;
            const item = ITEMS[s.id];
            if (item && cats[item.category]) {
                cats[item.category].push(s);
            } else {
                extra.push(s);
            }
        }

        let idx = INV_HOTBAR_SIZE;
        for (const c of INV_CATEGORIES) {
            for (const s of cats[c]) {
                if (idx < INV_TOTAL) this.slots[idx++] = s;
            }
        }
        for (const s of extra) {
            if (idx < INV_TOTAL) this.slots[idx++] = s;
        }
    }
}

// Player class - simple blue square placeholder
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = CONFIG.TILE_SIZE;
        this.facing = 'down';
    }
    
    move(dx, dy) {
        const newX = constrain(this.x + dx, 0, CONFIG.WORLD_WIDTH - 1);
        const newY = constrain(this.y + dy, 0, CONFIG.WORLD_HEIGHT - 1);

        // Collision check using per-tile solidity
        if (world && world.tiles[newX] && world.tiles[newX][newY]) {
            if (isSolidTile(newX, newY)) {
                return; // Blocked
            }
        }

        // Collision check — buildings block movement
        if (buildingAt(newX, newY)) {
            return;
        }

        // Track facing direction
        if (dx !== 0) this.facing = dx > 0 ? 'right' : 'left';
        if (dy !== 0) this.facing = dy > 0 ? 'down' : 'up';

        this.x = newX;
        this.y = newY;
    }

    getFacingTile() {
        let dx = 0, dy = 0;
        if (this.facing === 'up') dy = -1;
        else if (this.facing === 'down') dy = 1;
        else if (this.facing === 'left') dx = -1;
        else if (this.facing === 'right') dx = 1;
        const fx = this.x + dx;
        const fy = this.y + dy;
        if (fx < 0 || fx >= CONFIG.WORLD_WIDTH || fy < 0 || fy >= CONFIG.WORLD_HEIGHT) return null;
        if (!world.tiles[fx] || !world.tiles[fx][fy]) return null;
        return { x: fx, y: fy, tile: world.tiles[fx][fy] };
    }
    
    draw() {
        const screenX = this.x * CONFIG.TILE_SIZE - cameraX;
        const screenY = this.y * CONFIG.TILE_SIZE - cameraY;

        const spr = SPRITES['sprites.player'];
        if (spr) {
            // Player is 1 tile wide, 2 tiles tall (drawn bottom-anchored).
            // Feet are at (x, y); head/shoulders occupy the tile above.
            image(spr, screenX, screenY - CONFIG.TILE_SIZE, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE * 2);
        } else {
            // Fallback: blue 2-tall figure
            fill(0, 100, 255);
            noStroke();
            rect(screenX, screenY - CONFIG.TILE_SIZE, this.size, this.size * 2);
            fill(255);
            rect(screenX + 3, screenY - CONFIG.TILE_SIZE + 4, 3, 3);
            rect(screenX + 10, screenY - CONFIG.TILE_SIZE + 4, 3, 3);
        }
    }
    
    serialize() {
        return {
            x: this.x,
            y: this.y,
            facing: this.facing
        };
    }
    
    deserialize(data) {
        this.x = data.x;
        this.y = data.y;
        if (data.facing) this.facing = data.facing;
    }
}

// World class
class World {
    constructor() {
        this.tiles = [];
        this.day = 1;
        this.season = 'Sweet';
        this.timeMinutes = 8 * 60; // Start at 8 AM
        this.showSaveIndicator = false;
        
        this.generateWorld();
    }
    
    generateWorld() {
        const centerX = CONFIG.WORLD_WIDTH / 2;
        const centerY = CONFIG.WORLD_HEIGHT / 2;

        // Initialize tile grid with base terrain only
        for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
                const d = dist(x, y, centerX, centerY);
                if (d > 42) {
                    this.tiles[x][y] = { type: 'sea', variant: floor(random(3)) };
                } else if (d > 38) {
                    this.tiles[x][y] = { type: 'beach', variant: floor(random(3)) };
                } else {
                    this.tiles[x][y] = { type: 'grass', variant: floor(random(3)) };
                }
            }
        }

        // Scatter decorations on a 10x10 grid — at most 1 decoration per cell
        // This keeps open space for building
        const CELL = 10;
        const decorations = ['tree', 'tree', 'rock', 'shiny_rock', 'weeds', 'bird_poop'];
        const beachDecorations = ['palm', 'palm'];

        for (let cx = 0; cx < CONFIG.WORLD_WIDTH; cx += CELL) {
            for (let cy = 0; cy < CONFIG.WORLD_HEIGHT; cy += CELL) {
                // Pick a random tile within this 10x10 cell
                const tx = cx + floor(random(CELL));
                const ty = cy + floor(random(CELL));
                if (tx >= CONFIG.WORLD_WIDTH || ty >= CONFIG.WORLD_HEIGHT) continue;

                const d = dist(tx, ty, centerX, centerY);
                if (d > 42) continue;          // skip sea
                if (d > 38) {
                    // Beach zone — mostly empty, occasional palm
                    if (random() < 0.35) {
                        const type = random(beachDecorations);
                        if (type === 'palm') this.placeTree(tx, ty, 'palm');
                    }
                    continue;
                }
                // Interior — 1 decoration per cell, ~80% chance (some cells stay empty)
                if (random() < 0.8) {
                    const type = random(decorations);
                    if (type === 'tree') this.placeTree(tx, ty, 'tree');
                    else if (type === 'rock') this.tiles[tx][ty] = { type: 'rock', variant: floor(random(2)) };
                    else if (type === 'shiny_rock') this.tiles[tx][ty] = { type: 'shiny_rock', variant: 0 };
                    else if (type === 'weeds') this.tiles[tx][ty] = { type: 'weeds', variant: floor(random(2)) };
                    else if (type === 'bird_poop') this.tiles[tx][ty] = { type: 'bird_poop', variant: 0 };
                }
            }
        }

        // Place exactly 2 rosebushes on the island interior
        let rosebushesPlaced = 0;
        let attempts = 0;
        while (rosebushesPlaced < 2 && attempts < 200) {
            attempts++;
            const rx = 15 + floor(random(70));
            const ry = 15 + floor(random(70));
            const d = dist(rx, ry, centerX, centerY);
            if (d > 38) continue; // interior only
            if (this.tiles[rx][ry].type !== 'grass') continue; // only on open grass
            // Rosebushes are 1-tall, solid, harvested for seeds.
            this.tiles[rx][ry] = { type: 'rosebush', variant: 0 };
            rosebushesPlaced++;
        }

        // Seed the world with an initial set of bird poop.
        spawnBirdPoop(3 + floor(random(3)));
    }

    // Place a 2-tall tree/palm: solid trunk at (x,y) and passable canopy at (x,y-1).
    placeTree(x, y, type) {
        const baseTerrain = type === 'palm' ? 'beach' : 'grass';
        if (this.tiles[x][y].type !== baseTerrain) return;
        const topY = y - 1;
        if (topY < 0 || topY >= CONFIG.WORLD_HEIGHT) return;
        const topTile = this.tiles[x][topY];
        if (!topTile || topTile.type !== baseTerrain) return;
        // Ensure the top spot hasn't already been claimed by another decoration.
        if (topTile.solid === true || topTile.isTreeTop === true) return;

        this.tiles[x][y] = { type: type, variant: floor(random(3)), solid: true };
        this.tiles[x][topY] = { type: type, variant: floor(random(3)), isTreeTop: true, solid: false };
    }
    
    draw() {
        push();
        translate(-cameraX, -cameraY);
        
        // Draw visible tiles only (with padding for camera movement)
        const startTileX = floor(cameraX / CONFIG.TILE_SIZE);
        const startTileY = floor(cameraY / CONFIG.TILE_SIZE);
        const endTileX = startTileX + ceil(CONFIG.CANVAS_WIDTH / CONFIG.TILE_SIZE) + 2;
        const endTileY = startTileY + ceil(CONFIG.CANVAS_HEIGHT / CONFIG.TILE_SIZE) + 2;
        
        // Pass 1: draw base terrain and solid tile bottoms.
        for (let x = max(0, startTileX); x < min(CONFIG.WORLD_WIDTH, endTileX); x++) {
            for (let y = max(0, startTileY); y < min(CONFIG.WORLD_HEIGHT, endTileY); y++) {
                this.drawTile(x, y, this.tiles[x][y]);
            }
        }
        
        pop();
        
        // Update time (30 real minutes = 24 game hours)
        if (deltaTime) {
            const gameMinutesPerRealMin = (24 * 60) / CONFIG.DAY_LENGTH_MINUTES;
            this.timeMinutes += gameMinutesPerRealMin * (deltaTime / 60000);
        }
        if (this.timeMinutes >= 24 * 60) {
            this.timeMinutes = 0;
            this.day++;
            // Sunrise: new bird poop appears across the island.
            spawnBirdPoop(3 + floor(random(3)));
        }
    }

    // Pass 2: draw tree/palm canopy tops on top of entities/player.
    drawTreeTops() {
        push();
        translate(-cameraX, -cameraY);
        
        const startTileX = floor(cameraX / CONFIG.TILE_SIZE);
        const startTileY = floor(cameraY / CONFIG.TILE_SIZE);
        const endTileX = startTileX + ceil(CONFIG.CANVAS_WIDTH / CONFIG.TILE_SIZE) + 2;
        const endTileY = startTileY + ceil(CONFIG.CANVAS_HEIGHT / CONFIG.TILE_SIZE) + 2;
        
        for (let x = max(0, startTileX); x < min(CONFIG.WORLD_WIDTH, endTileX); x++) {
            for (let y = max(0, startTileY); y < min(CONFIG.WORLD_HEIGHT, endTileY); y++) {
                const tile = this.tiles[x][y];
                if (!tile || !tile.isTreeTop) continue;
                this.drawTreeTop(x, y, tile);
            }
        }
        
        pop();
    }

    drawTreeTop(x, y, tile) {
        const screenX = x * CONFIG.TILE_SIZE;
        const screenY = y * CONFIG.TILE_SIZE;
        const TS = CONFIG.TILE_SIZE;
        const type = tile.type;
        const spr = SPRITES['tiles.' + type];
        if (spr) {
            // Draw the upper 16 pixels of the 16x32 sprite.
            image(spr, screenX, screenY, TS, TS, 0, 0, spr.width, TS);
        } else {
            if (type === 'tree') {
                fill('#2E7D32');
                ellipse(screenX + 8, screenY + 12, 12, 12);
            } else if (type === 'palm') {
                fill('#4CAF50');
                ellipse(screenX + 8, screenY + 12, 14, 8);
            }
        }
        if (tile.depleted) {
            fill(0, 0, 0, 120);
            rect(screenX, screenY, TS, TS);
        }
    }
    
    drawTile(x, y, tile) {
        const screenX = x * CONFIG.TILE_SIZE;
        const screenY = y * CONFIG.TILE_SIZE;
        const TS = CONFIG.TILE_SIZE;

        // Helper: draw a base terrain tile (grass or beach) under decorations
        function drawBase(baseType) {
            const baseSpr = SPRITES['tiles.' + baseType];
            if (baseSpr) {
                image(baseSpr, screenX, screenY, TS, TS);
            } else if (baseType === 'beach') {
                fill('#F4E4BC');
                rect(screenX, screenY, TS, TS);
            } else {
                fill('#7CB342');
                rect(screenX, screenY, TS, TS);
            }
        }

        switch(tile.type) {
            case 'sea': {
                const spr = SPRITES['tiles.water'];
                if (spr) {
                    // Single 16x16 sprite — draw whole thing, no frame slicing
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    fill('#4A90C8');
                    rect(screenX, screenY, TS, TS);
                    if (tile.variant === 1) {
                        fill('#6BB6FF');
                        rect(screenX + 3, screenY + 3, 6, 2);
                    } else if (tile.variant === 2) {
                        fill('#6BB6FF');
                        rect(screenX + 5, screenY + 8, 6, 2);
                    }
                }
                break;
            }
            case 'beach': {
                const spr = SPRITES['tiles.beach'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    fill('#F4E4BC');
                    rect(screenX, screenY, TS, TS);
                    fill('#E8D4A0');
                    if (tile.variant === 1) {
                        point(screenX + 4, screenY + 4);
                        point(screenX + 12, screenY + 10);
                    } else if (tile.variant === 2) {
                        point(screenX + 10, screenY + 5);
                        point(screenX + 6, screenY + 12);
                    }
                }
                break;
            }
            case 'grass': {
                const spr = SPRITES['tiles.grass'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    fill('#7CB342');
                    rect(screenX, screenY, TS, TS);
                    fill('#8BC34A');
                    if (tile.variant === 1) {
                        rect(screenX + 4, screenY + 4, 2, 4);
                        rect(screenX + 10, screenY + 6, 2, 3);
                    } else if (tile.variant === 2) {
                        rect(screenX + 6, screenY + 3, 2, 5);
                        rect(screenX + 11, screenY + 5, 2, 4);
                    }
                }
                break;
            }
            case 'tree': {
                const isTop = tile.isTreeTop;
                // Draw the correct base terrain under the tile.
                drawBase(isTop ? 'grass' : 'grass');
                // Both trunk and canopy tiles draw their own half of the 16x32 sprite.
                const spr = SPRITES['tiles.tree'];
                if (spr) {
                    if (isTop) {
                        // Top half of the sprite (upper canopy) — drawn only in the tree-top pass,
                        // which happens AFTER entities/player so the player walks behind it.
                    } else {
                        // Bottom half (trunk) drawn during the base pass.
                        // Source: lower 16 pixels of the 16x32 sprite.
                        const sy = spr.height - TS;
                        image(spr, screenX, screenY, TS, TS, 0, sy, spr.width, TS);
                    }
                } else {
                    if (isTop) {
                        fill('#2E7D32');
                        ellipse(screenX + 8, screenY + 12, 12, 12);
                    } else {
                        fill('#8B4513');
                        rect(screenX + 6, screenY + 4, 4, 10);
                    }
                }
                if (!isTop && tile.depleted) {
                    fill(0, 0, 0, 120);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'palm': {
                const isTop = tile.isTreeTop;
                // Draw the correct base terrain under the tile.
                drawBase(isTop ? 'beach' : 'beach');
                const spr = SPRITES['tiles.palm'];
                if (spr) {
                    if (isTop) {
                        // Top half drawn in the tree-top pass.
                    } else {
                        // Bottom half drawn in base pass.
                        const sy = spr.height - TS;
                        image(spr, screenX, screenY, TS, TS, 0, sy, spr.width, TS);
                    }
                } else {
                    if (isTop) {
                        fill('#4CAF50');
                        ellipse(screenX + 8, screenY + 12, 14, 8);
                    } else {
                        fill('#8B4513');
                        rect(screenX + 7, screenY + 2, 3, 12);
                    }
                }
                if (!isTop && tile.depleted) {
                    fill(0, 0, 0, 120);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'rock': {
                // Draw grass base first, then rock sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.rock'];
                if (spr) {
                    const offsetX = screenX - (spr.width - TS) / 2;
                    const offsetY = screenY - (spr.height - TS);
                    image(spr, offsetX, offsetY);
                } else {
                    fill('#9E9E9E');
                    ellipse(screenX + 8, screenY + 10, 10, 8);
                    fill('#BDBDBD');
                    ellipse(screenX + 6, screenY + 8, 4, 3);
                }
                if (tile.depleted) {
                    fill(0, 0, 0, 120);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'shiny_rock': {
                // Draw grass base first, then shiny rock sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.shiny_rock'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    fill('#BDBDBD');
                    ellipse(screenX + 8, screenY + 10, 10, 8);
                    fill('#FFD700');
                    const sx = screenX + 6 + (waterFrame % 2);
                    const sy = screenY + 7 + (waterFrame % 2);
                    rect(sx, sy, 1, 1);
                    rect(sx + 2, sy + 2, 1, 1);
                }
                if (tile.depleted) {
                    fill(0, 0, 0, 120);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'weeds': {
                // Draw grass base first, then weeds sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.weeds'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    fill('#558B2F');
                    rect(screenX + 3, screenY + 6, 1, 8);
                    rect(screenX + 7, screenY + 4, 1, 10);
                    rect(screenX + 11, screenY + 7, 1, 6);
                    rect(screenX + 13, screenY + 5, 1, 9);
                }
                if (tile.depleted) {
                    fill(0, 0, 0, 100);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'bird_poop': {
                // Draw grass base first, then bird poop sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.bird_poop'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    fill('#E0E0E0');
                    ellipse(screenX + 8, screenY + 9, 8, 5);
                    fill('#FFFFFF');
                    ellipse(screenX + 6, screenY + 8, 3, 2);
                }
                if (tile.depleted) {
                    fill(0, 0, 0, 100);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'flower': {
                // No sprite yet — draw grass base + fallback flower
                drawBase('grass');
                const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
                fill(colors[tile.variant]);
                ellipse(screenX + 8, screenY + 8, 6, 6);
                fill('#FFD93D');
                ellipse(screenX + 8, screenY + 8, 3, 3);
                if (tile.depleted) {
                    fill(0, 0, 0, 100);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'tulip': {
                // Draw grass base, then tulip sprite
                drawBase('grass');
                const spr = SPRITES['tiles.tulip'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    // Fallback: green stem + colored cup
                    fill('#558B2F');
                    rect(screenX + 7, screenY + 6, 2, 8);
                    const tcolors = ['#E53935', '#F5F5F5'];
                    fill(tcolors[tile.variant || 0]);
                    ellipse(screenX + 8, screenY + 5, 6, 5);
                }
                if (tile.depleted) {
                    fill(0, 0, 0, 100);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'rosebush': {
                // 32x32 sprite — draw grass base, then rosebush centered extending upward
                drawBase('grass');
                const spr = SPRITES['tiles.rosebush'];
                if (spr) {
                    const offsetX = screenX - (spr.width - TS) / 2;
                    const offsetY = screenY - (spr.height - TS);
                    image(spr, offsetX, offsetY);
                } else {
                    // Fallback: green bush with red dots
                    fill('#2E7D32');
                    ellipse(screenX + 8, screenY + 8, 14, 12);
                    fill('#E53935');
                    ellipse(screenX + 4, screenY + 6, 3, 3);
                    ellipse(screenX + 12, screenY + 8, 3, 3);
                    ellipse(screenX + 8, screenY + 4, 3, 3);
                }
                if (tile.depleted) {
                    fill(0, 0, 0, 120);
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'water': {
                // Small pond — draw grass base, then water sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.water'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    fill('#4A90C8');
                    ellipse(screenX + 8, screenY + 8, 14, 12);
                }
                break;
            }
        }
    }
    
    getTimeString() {
        const hours = floor(this.timeMinutes / 60);
        const minutes = floor(this.timeMinutes % 60);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
    
    serialize() {
        return {
            day: this.day,
            season: this.season,
            timeMinutes: this.timeMinutes,
            tiles: this.tiles
        };
    }
    
    deserialize(data) {
        this.day = data.day;
        this.season = data.season;
        this.timeMinutes = data.timeMinutes;
        this.tiles = data.tiles;
        // v4 saves may have single-tile trees/palms without top tiles.
        // Convert them to the new 2-tall format: trunk solid, canopy passable.
        for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
            for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
                const tile = this.tiles[x][y];
                if (!tile) continue;
                if ((tile.type === 'tree' || tile.type === 'palm') && !tile.isTreeTop && tile.solid === undefined) {
                    tile.solid = true;
                    const topY = y - 1;
                    if (topY >= 0 && topY < CONFIG.WORLD_HEIGHT) {
                        const topTile = this.tiles[x][topY];
                        if (topTile && !topTile.isTreeTop) {
                            this.tiles[x][topY] = {
                                type: tile.type,
                                variant: tile.variant || 0,
                                isTreeTop: true,
                                solid: false,
                                depleted: tile.depleted || false,
                                respawnAt: tile.respawnAt || null
                            };
                        }
                    }
                }
                // v5 saves may still have removed flower/tulip/water decorations.
                if (tile.type === 'flower' || tile.type === 'tulip' || tile.type === 'water') {
                    this.tiles[x][y] = { type: 'grass', variant: 0 };
                }
            }
        }
    }
}

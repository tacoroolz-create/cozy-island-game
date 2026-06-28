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

// Sprite registry - holds loaded p5.Image objects, null if not loaded
const SPRITES = {};
const SPRITE_DEFS = {
    'tiles.grass':            'assets/tiles/grass.png',
    'tiles.beach':            'assets/tiles/beach.png',
    'tiles.water':            'assets/tiles/water.png',
    'tiles.tree':             'assets/tiles/tree.png',
    'tiles.rock':             'assets/tiles/rock.png',
    'tiles.shiny_rock':       'assets/tiles/shiny_rock.png',
    'tiles.weeds':            'assets/tiles/weeds.png',
    'tiles.bird_poop':        'assets/tiles/bird_poop.png',
    'tiles.rosebush':         'assets/tiles/rosebush.png',
    'tiles.bed_blue':         'assets/tiles/bed_blue.png',
    'tiles.bed_orange':       'assets/tiles/bed_orange.png',
    'tiles.bed_red':          'assets/tiles/bed_red.png',
    'tiles.sprout':           'assets/tiles/sprout.png',
    'sprites.player':         'assets/sprites/player.png',
    'sprites.mira':           'assets/sprites/mira.png',
    'sprites.luna':           'assets/sprites/luna.png',
    'sprites.brass':          'assets/sprites/brass.png',
    'sprites.krip':           'assets/sprites/krip.png',
    'sprites.penny':          'assets/sprites/penny.png',
    'sprites.mimis':          'assets/sprites/mimis.png',
    'sprites.hudson':         'assets/sprites/hudson.png',
    'sprites.cort':           'assets/sprites/cort.png',
    'sprites.aiko':           'assets/sprites/aiko.png',
    'sprites.ihor':           'assets/sprites/ihor.png',
    'sprites.psy':            'assets/sprites/psy.png',
    'sprites.boll':           'assets/sprites/boll.png',
    'sprites.taira':          'assets/sprites/taira.png',
    'sprites.mah':            'assets/sprites/mah.png',
    'sprites.liz':            'assets/sprites/liz.png',
    'sprites.eo':             'assets/sprites/eo.png',
    'sprites.quark':          'assets/sprites/quark.png',
    'sprites.zora':           'assets/sprites/zora.png',
    'sprites.basil':          'assets/sprites/basil.png',
    'sprites.gearwick':       'assets/sprites/gearwick.png',
    'sprites.zephyr':         'assets/sprites/zephyr.png',
    'sprites.gorm':           'assets/sprites/gorm.png',
    'sprites.sprig':          'assets/sprites/sprig.png',
    'sprites.rollo':          'assets/sprites/rollo.png',
    'sprites.nyx':            'assets/sprites/nyx.png',
    'sprites.titan':          'assets/sprites/titan.png',
    'sprites.orla':           'assets/sprites/orla.png',
    'sprites.jax':            'assets/sprites/jax.png',
    'sprites.clover':         'assets/sprites/clover.png',
    'sprites.sprocket':       'assets/sprites/sprocket.png',
    'sprites.luna-2':         'assets/sprites/luna-2.png',
    'sprites.vira':           'assets/sprites/vira.png',
    'sprites.birch':          'assets/sprites/birch.png',
    'sprites.flick':          'assets/sprites/flick.png',
    'sprites.draven':         'assets/sprites/draven.png',
    'sprites.pixel':          'assets/sprites/pixel.png',
    'sprites.aria':           'assets/sprites/aria.png',
    'sprites.grumble':        'assets/sprites/grumble.png',
    'sprites.selene':         'assets/sprites/selene.png',
    'sprites.bolt':           'assets/sprites/bolt.png',
    'sprites.gidget':         'assets/sprites/gidget.png',
    'sprites.lunae':          'assets/sprites/lunae.png',
    'sprites.willow':         'assets/sprites/willow.png',
    'sprites.rusty':          'assets/sprites/rusty.png',
    'sprites.ember':          'assets/sprites/ember.png',
    'sprites.pippa':          'assets/sprites/pippa.png',
    'sprites.orion':          'assets/sprites/orion.png',
    'sprites.nixie':          'assets/sprites/nixie.png',
    'sprites.cobble':         'assets/sprites/cobble.png',
    'sprites.zeph':           'assets/sprites/zeph.png',
    'sprites.kiko':           'assets/sprites/kiko.png',
    'sprites.aurora':         'assets/sprites/aurora.png',
    'sprites.quill':          'assets/sprites/quill.png',
    'sprites.vex':            'assets/sprites/vex.png',
    'sprites.daphne':         'assets/sprites/daphne.png',
    'sprites.chester':        'assets/sprites/chester.png',
    'sprites.vega':           'assets/sprites/vega.png',
    'sprites.turtle':         'assets/sprites/turtle.png',
    'sprites.seagull':        'assets/sprites/seagull.png',
    'items.log':              'assets/sprites/log.png',
    'items.stone':            'assets/sprites/stone.png',
    'items.magnet':           'assets/sprites/magnet.png',
    'items.crystal':          'assets/sprites/crystal.png',
    'items.stick':            'assets/sprites/stick.png',
    'items.fiber':            'assets/sprites/fiber.png',
    'items.bean':             'assets/sprites/bean.png',
    'items.berry':            'assets/sprites/berry.png',
    'items.banana':           'assets/sprites/banana.png',
    'items.seed':             'assets/sprites/seed.png',
    'items.axe':              'assets/sprites/axe.png',
    'items.hoe':              'assets/sprites/hoe.png',
    'items.feather':          'assets/sprites/feather.png',
    'items.seashell':         'assets/sprites/seashell.png',
    'items.turtle_egg':       'assets/sprites/turtle_egg.png',
    'items.stale_toast':      'assets/sprites/stale_toast.png',
    'sprites.shack':          'assets/sprites/shack.png',
    'sprites.house':          'assets/sprites/house.png',
    'sprites.bird':           'assets/sprites/animals/bird.png',
    'sprites.bird2':          'assets/sprites/animals/bird2.png',
    'sprites.butterfly':      'assets/sprites/butterfly.png',
    'sprites.cicada':         'assets/sprites/cicada.png',
    'items.cicada_shell':     'assets/sprites/cicada_shell.png',
    'sprites.hog':            'assets/sprites/hog.png',
    'tiles.poop':             'assets/sprites/poop.png',
};

// Global game state
let gameState = STATE.START;
let player = null;
let world = null;
let cameraX = 0;
let cameraY = 0;

// UI state
let selectedMenuOption = 1; // Default-highlight "Load" on the start menu

// Movement cooldown for grid-based movement (ms)
let lastMoveTime = 0;
const MOVE_COOLDOWN = 120;
const startMenuOptions = ['New Game', 'Load Game', 'Settings'];
const settingsMenuOptions = ['Back'];

// Start-screen sub-views: 'main' (top menu) | 'slots' (choose a save slot) |
// 'name' (type a name for a new save).
let startView = 'main';
let startMode = 'new';        // what the slot picker is for: 'new' | 'load'
let slotSelectIndex = 0;      // highlighted row in the slot picker (0..2 = slots, 3 = Back)
let nameEntryText = '';       // current text in the name-entry field
let nameEntrySlot = 0;        // slot being named

// Tiles that block player movement by default.
const TILE_SOLID = new Set(['sea', 'water', 'tree', 'rock', 'shiny_rock', 'rosebush']);

// Helper: check if a tile is solid. Individual tiles can override with a `solid` property.
// Animals also block movement (solid obstacles).
function isSolidTile(x, y) {
    if (x < 0 || x >= CONFIG.WORLD_WIDTH || y < 0 || y >= CONFIG.WORLD_HEIGHT) return true;
    const tile = world.tiles[x][y];
    if (!tile) return true;
    if (tile.solid !== undefined) return tile.solid;
    if (TILE_SOLID.has(tile.type)) return true;
    if (typeof animalAt === 'function' && animalAt(x, y)) return true;
    return false;
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
    gold_coin:   { name: 'Gold Coin',   category: 'treasure', maxStack: 99, color: '#FFD700', desc: 'An ancient gold coin pulled from the deep.' },
    feather:     { name: 'Feather',     category: 'material', maxStack: 99, color: '#F5F5F5', desc: 'A soft feather left behind by a bird.' },
    seashell:    { name: 'Seashell',    category: 'gift',     maxStack: 20, color: '#FFE4E1', desc: 'A polished shell from a grateful crab.' },
    turtle_egg:  { name: 'Turtle Egg',  category: 'gift',     maxStack: 10, color: '#E8DCC5', desc: 'A smooth, patterned egg left behind by a nesting sea turtle.' },
    stale_toast: { name: 'Stale Toast', category: 'tool',     maxStack: 10, color: '#D2B48C', desc: 'A hardened piece of toast perfect for throwing at targets.' },
    cicada_shell:{ name: 'Cicada Shell',category: 'material', maxStack: 99, color: '#B8A070', desc: 'A translucent shell left behind by a summer cicada. Useful in magic tricks.' },

    // ===== CONSUMABLES (cooked foods — great gifts for neighbors) =====
    grilled_banana: { name: 'Grilled Banana', category: 'gift', maxStack: 20, color: '#E0A92E', desc: 'A warm, caramelized banana. A sweet treat.' },
    berry_jam:      { name: 'Berry Jam',      category: 'gift', maxStack: 20, color: '#9C1F3A', desc: 'Sweet jam cooked down from fresh berries.' },
    fruit_salad:    { name: 'Fruit Salad',    category: 'gift', maxStack: 20, color: '#FF8A65', desc: 'A cheerful bowl of mixed island fruit.' },

    // ===== HOME IMPROVEMENT ITEMS =====
    // Placeable inside your home. `home` metadata drives placement:
    //   cls: 'furniture' (solid, sits on floor) | 'decoration' (visual, hangs on wall or lays on floor)
    //   placeOn: 'floor' | 'wall'   solid: blocks movement when true
    // Equip one in the hotbar and click an open tile inside a building to place it.
    // --- Furniture (12) — solid blocks on the floor ---
    chair:        { name: 'Wooden Chair',  category: 'block', maxStack: 99, color: '#8B5A2B', desc: 'A simple wooden chair.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    armchair:     { name: 'Armchair',      category: 'block', maxStack: 99, color: '#7E57C2', desc: 'A cushioned armchair to sink into.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    stool:        { name: 'Stool',         category: 'block', maxStack: 99, color: '#A1887F', desc: 'A little round stool.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    bench:        { name: 'Wooden Bench',  category: 'block', maxStack: 99, color: '#9C6B3F', desc: 'A long wooden bench.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    end_table:    { name: 'End Table',     category: 'block', maxStack: 99, color: '#8D6E63', desc: 'A small table for beside a chair or bed.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    coffee_table: { name: 'Coffee Table',  category: 'block', maxStack: 99, color: '#795548', desc: 'A low table for the middle of the room.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    bookshelf:    { name: 'Bookshelf',     category: 'block', maxStack: 99, color: '#5D4037', desc: 'Tall shelves full of books.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    dresser:      { name: 'Dresser',       category: 'block', maxStack: 99, color: '#6D4C41', desc: 'A drawer dresser for your things.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    cabinet:      { name: 'Side Cabinet',  category: 'block', maxStack: 99, color: '#8D6E63', desc: 'A cozy little storage cabinet.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    floor_lamp:   { name: 'Floor Lamp',    category: 'block', maxStack: 99, color: '#FFE082', desc: 'A warm standing lamp.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    potted_plant: { name: 'Potted Plant',  category: 'block', maxStack: 99, color: '#4CAF50', desc: 'A leafy plant in a clay pot.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    fireplace:    { name: 'Fireplace',     category: 'block', maxStack: 99, color: '#B0BEC5', desc: 'A stone fireplace to warm the room.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    // --- Decoration (8) — visual objects on the wall (or rugs on the floor) ---
    tapestry:     { name: 'Wall Tapestry', category: 'block', maxStack: 99, color: '#AD1457', desc: 'A woven tapestry to hang on the wall.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    painting:     { name: 'Framed Painting', category: 'block', maxStack: 99, color: '#C0A062', desc: 'A framed painting for the wall.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    window:       { name: 'Window',        category: 'block', maxStack: 99, color: '#81D4FA', desc: 'A glass window that lets in light.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    drapes:       { name: 'Drapes',        category: 'block', maxStack: 99, color: '#7B1FA2', desc: 'Flowing curtains for a window.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    wall_clock:   { name: 'Wall Clock',    category: 'block', maxStack: 99, color: '#455A64', desc: 'A ticking clock for the wall.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    wall_shelf:   { name: 'Wall Shelf',    category: 'block', maxStack: 99, color: '#8D6E63', desc: 'A floating shelf for trinkets.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    round_rug:    { name: 'Round Rug',     category: 'block', maxStack: 99, color: '#E57373', desc: 'A soft round rug for the floor.', home: { cls: 'decoration', placeOn: 'floor', solid: false } },
    runner_rug:   { name: 'Runner Rug',    category: 'block', maxStack: 99, color: '#64B5F6', desc: 'A long runner rug for the floor.', home: { cls: 'decoration', placeOn: 'floor', solid: false } },
};

// ===== INVENTORY =====
let inventory = null;
let invSelectedSlot = 0;       // Currently selected slot in inventory view
let hotbarSlot = 0;            // Active hotbar slot (1-8)

// ===== BUILDINGS =====
let buildings = [];
let insideBuilding = null;  // building we're currently inside (null = outside)

// Building exterior tiers - each has a sprite key and base tile dimensions
const BUILDING_TIERS = {
    // w/h = exterior footprint in tiles. doorWidth = how many bottom-center tiles
    // act as the entrance. interiorW/interiorFloorRows = interior size (floor rows
    // are in addition to INTERIOR_WALL_HEIGHT wall rows on top).
    shack: { spriteKey: 'sprites.shack', name: 'Shack', w: 8, h: 5, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },  // 128x80 sprite
    house: { spriteKey: 'sprites.house', name: 'House', w: 4, h: 4 }   // 64x64 sprite
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
        // Interior dimensions from the building tier (fallback 5 wide, 3 floor rows).
        const tierDef = BUILDING_TIERS[type] || {};
        this.interiorW = tierDef.interiorW || 5;
        this.interiorH = INTERIOR_WALL_HEIGHT + (tierDef.interiorFloorRows || 3);
        // Interior tile grid
        this.interiorTiles = [];
        this.initInterior();
    }

    // Returns the exterior footprint in tiles. Prefers the explicit dimensions
    // declared in BUILDING_TIERS (robust against async sprite loading); falls
    // back to deriving from the loaded sprite, then a sensible default.
    get tileSize() {
        const def = BUILDING_TIERS[this.type];
        if (def && def.w && def.h) return { w: def.w, h: def.h };
        const spr = SPRITES[this.spriteKey];
        if (!spr) return { w: 8, h: 5 };
        return { w: Math.ceil(spr.width / CONFIG.TILE_SIZE), h: Math.ceil(spr.height / CONFIG.TILE_SIZE) };
    }

    // Initialize interior tiles - grass floor, wall row on top, bed on the left
    initInterior() {
        this.interiorTiles = [];
        const bedVariant = ['bed_blue', 'bed_orange', 'bed_red'][floor(random(3))];
        for (let x = 0; x < this.interiorW; x++) {
            this.interiorTiles[x] = [];
            for (let y = 0; y < this.interiorH; y++) {
                if (y < INTERIOR_WALL_HEIGHT) {
                    this.interiorTiles[x][y] = { type: 'wall', variant: 0 };
                } else if (x === 0 && y === INTERIOR_WALL_HEIGHT) {
                    // Bed on the left, against the back wall
                    this.interiorTiles[x][y] = { type: 'bed', variant: bedVariant };
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

    // Primary door tile (bottom-center of exterior, in world coords).
    // Used as the anchor for interior spawn and exit placement.
    getDoorTile() {
        const ts = this.tileSize;
        return { x: this.gridX + Math.floor(ts.w / 2), y: this.gridY + ts.h - 1 };
    }

    // All walkable door tiles, in world coords. A doorWidth of 2 makes the two
    // center-bottom tiles both valid entrances.
    getDoorTiles() {
        const ts = this.tileSize;
        const def = BUILDING_TIERS[this.type] || {};
        const dw = def.doorWidth || 1;
        const cy = this.gridY + ts.h - 1;
        const center = this.gridX + Math.floor(ts.w / 2);
        if (dw >= 2) return [{ x: center - 1, y: cy }, { x: center, y: cy }];
        return [{ x: center, y: cy }];
    }

    // Is (x,y) one of this building's door tiles?
    isDoorTile(x, y) {
        return this.getDoorTiles().some(d => d.x === x && d.y === y);
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

// Clear terrain under and just around a building so it sits on grass and the
// exit path in front of the door is always walkable. Sea/beach are left intact.
function clearBuildingFootprint(b) {
    const ts = b.tileSize;
    for (let dx = -1; dx <= ts.w; dx++) {
        for (let dy = -1; dy <= ts.h + 2; dy++) {
            const tx = b.gridX + dx, ty = b.gridY + dy;
            if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
            if (!world.tiles[tx] || !world.tiles[tx][ty]) continue;
            const t = world.tiles[tx][ty];
            if (t.type !== 'sea' && t.type !== 'beach') {
                world.tiles[tx][ty] = { type: 'grass', variant: 0 };
            }
        }
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
    rock:        { drops: [{id:'stone', count:2, chance:1.0}], respawnHours: 24, tool: null, name: 'Rock' },
    shiny_rock:  { drops: [{id:'stone', count:1, chance:1.0}, {id:'magnet', count:1, chance:0.8}, {id:'crystal', count:1, chance:0.4}], respawnHours: 24, tool: null, name: 'Shiny Rock' },
    weeds:       { drops: [{id:'fiber', count:2, chance:1.0}, {id:'bean', count:1, chance:0.3}], respawnHours: 6,  tool: null, name: 'Tall Grass' },
    bird_poop:   { drops: [{id:'seed', count:1, chance:1.0}, {id:'rose_seed', count:1, chance:0.5}, {id:'tulip_bulb', count:1, chance:0.5}], disappears: true, name: 'Bird Poop' },
    rosebush:    { drops: [{id:'rose_seed', count:1, chance:1.0}], respawnHours: 12, tool: null, name: 'Rose Bush' },
    toast_target:{ drops: [], disappears: true, tool: 'stale_toast', name: 'Toast Target' }
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

// Bump this whenever sprite art is updated so browsers re-fetch images instead
// of serving stale cached copies (images aren't covered by the index.html ?v=).
const ASSET_VERSION = '20260628';

function preload() {
    for (const [key, path] of Object.entries(SPRITE_DEFS)) {
        const url = path + (path.includes('?') ? '&' : '?') + 'v=' + ASSET_VERSION;
        // loadImage with error callback so missing files don't hang preload
        SPRITES[key] = loadImage(url, () => {}, () => {
            console.warn(`Failed to load sprite ${key} from ${url}`);
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

    // Spawn the single wild hog
    spawnHog();

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

function drawStartBackdrop() {
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
}

function drawStartScreen() {
    if (startView === 'slots') { drawSlotSelect(); return; }
    if (startView === 'name')  { drawNameEntry();  return; }

    drawStartBackdrop();

    // Main menu options
    textAlign(CENTER, CENTER);
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

// Y position of slot-picker row i (0..2 = slots, 3 = Back).
function slotRowY(i) { return 150 + i * 46; }

function drawSlotSelect() {
    drawStartBackdrop();

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    textFont('Courier New');
    text(startMode === 'new' ? 'New Game — choose a slot' : 'Load Game — choose a slot', width / 2, 120);

    const slots = getAllSaveSlots();
    textSize(14);
    for (let i = 0; i < SAVE_SLOT_COUNT; i++) {
        const info = slots[i];
        const y = slotRowY(i);
        const selectable = (startMode === 'new') || info.exists;
        const selected = i === slotSelectIndex;

        // Row plate
        const plateW = 320, plateH = 38;
        if (selected) fill(255, 255, 255, 60); else fill(255, 255, 255, 25);
        noStroke();
        rect(width / 2 - plateW / 2, y - plateH / 2, plateW, plateH, 6);

        // Label
        let label, sub;
        if (info.exists) {
            label = 'Slot ' + (i + 1) + ': ' + info.name;
            sub = 'Day ' + info.day + '  ·  ' + formatSaveTime(info.timestamp);
            if (startMode === 'new') sub += '  ·  will overwrite';
        } else {
            label = 'Slot ' + (i + 1) + ': — empty —';
            sub = startMode === 'load' ? '(nothing to load)' : 'start a fresh island here';
        }

        fill(selected ? color(255, 255, 120) : (selectable ? color(255) : color(180, 180, 180, 160)));
        textAlign(CENTER, BOTTOM);
        textSize(14);
        text((selected ? '▶ ' : '') + label, width / 2, y - 1);
        fill(selectable ? 220 : 150, selectable ? 220 : 150, selectable ? 230 : 160, 220);
        textAlign(CENTER, TOP);
        textSize(9);
        text(sub, width / 2, y + 1);
    }

    // Back row
    const by = slotRowY(SAVE_SLOT_COUNT);
    fill(slotSelectIndex === SAVE_SLOT_COUNT ? color(255, 255, 120) : color(255));
    textAlign(CENTER, CENTER);
    textSize(15);
    text((slotSelectIndex === SAVE_SLOT_COUNT ? '▶ ' : '') + 'Back', width / 2, by);

    textSize(11);
    fill(200);
    text('Arrows/click to choose · Enter to confirm · Esc to go back', width / 2, height - 26);
}

function drawNameEntry() {
    drawStartBackdrop();

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    textFont('Courier New');
    text('Name your island save', width / 2, 130);

    // Text field
    const boxW = 320, boxH = 40;
    const bx = width / 2 - boxW / 2, by = 170;
    fill(255, 255, 255, 40);
    stroke(255);
    strokeWeight(1);
    rect(bx, by, boxW, boxH, 6);
    noStroke();

    // Blinking cursor
    const showCursor = (floor(millis() / 500) % 2 === 0);
    const shown = nameEntryText + (showCursor ? '_' : '');
    fill(255, 255, 180);
    textAlign(LEFT, CENTER);
    textSize(18);
    text(shown || (showCursor ? '_' : ''), bx + 10, by + boxH / 2);

    // Placeholder hint when empty
    if (!nameEntryText) {
        fill(220, 220, 220, 120);
        textAlign(RIGHT, CENTER);
        textSize(11);
        text('default: Save ' + (nameEntrySlot + 1), bx + boxW - 10, by + boxH / 2);
    }

    fill(200);
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Type a name · Enter to begin · Esc to go back', width / 2, height - 26);
}

// Friendly short timestamp for the slot list.
function formatSaveTime(ts) {
    if (!ts) return 'unknown';
    const d = new Date(ts);
    const mm = ('0' + (d.getMonth() + 1)).slice(-2);
    const dd = ('0' + d.getDate()).slice(-2);
    let h = d.getHours();
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    const min = ('0' + d.getMinutes()).slice(-2);
    return mm + '/' + dd + ' ' + h + ':' + min + ap;
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

// Movement inside a building - clamped to interior dimensions, walls block
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
        // Walls, beds, and solid furniture block movement
        const tile = b.interiorTiles[newX][newY];
        if (tile.type === 'wall' || tile.type === 'bed' || isSolidHomeTile(tile)) {
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

    // Draw animals (birds/crabs)
    if (typeof drawAnimals === 'function') drawAnimals();

    // Draw wild hog and poop
    if (typeof drawHog === 'function') drawHog();

    // Draw player
    player.draw();

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
    if (typeof updateAnimals === 'function') updateAnimals(deltaTime);
    if (typeof updateHog === 'function') updateHog(deltaTime);
    if (typeof checkAnimalSunEvents === 'function') checkAnimalSunEvents();
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
    text(getDateString(), 10, 15);

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

    // Hotbar - 8 slots at bottom center
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
            // Filled - green if healthy, yellow at 1, red at 0 (shouldn't show at 0)
            fill(cur > 1 ? '#7CB342' : '#FFD93D');
        } else {
            // Hollow - dark grey
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
            drawPlaceholderTab(leftX + 4, contentY, 'Treasure', 'Use a Gettin Stick to pull treasure from the water. Sea creatures are coming soon!', leftW - 8);
            break;
        case 3:
            if (typeof drawGardeningTab === 'function') drawGardeningTab(leftX + 4, contentY, leftW - 8, contentH);
            else drawPlaceholderTab(leftX + 4, contentY, 'Gardening', 'Plant seeds in fertile soil.', leftW - 8);
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

function drawPlaceholderTab(x, y, title, desc, w) {
    const wrapW = w || 304; // default to the menu content width so text wraps
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text(title, x, y);
    fill(120);
    textSize(8);
    // Wrap the description within the panel; measure its height to place the footer.
    text(desc, x, y + 16, wrapW, 60);
    const lines = Math.max(1, Math.ceil(textWidth(desc) / wrapW));
    text('(Coming soon)', x, y + 16 + lines * 11 + 4);
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

    // Clickable action rows (hit-tested in mousePressed with matching offsets).
    fill('#7CB342');
    textSize(9);
    text('▶ Save Game', x, y + 50);
    fill('#FF8A80');
    text('▶ Save and Quit to Menu', x, y + 66);

    fill(120);
    textSize(8);
    text('Volume: [TBD]', x, y + 86);
    text('Controls: [TBD]', x, y + 98);
    text('Mute: [TBD]', x, y + 110);

    fill(255, 255, 100);
    textSize(8);
    text('Press S to save · click a row above to act', x, y + h - 14);
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
    // ===== DIALOGUE: click to advance text / pick a response =====
    if (gameState === 'dialogue') {
        if (typeof handleDialogueClick === 'function') handleDialogueClick(mouseX, mouseY);
        return;
    }

    // ===== START SCREEN =====
    if (gameState === STATE.START) {
        // Name-entry screen: clicks don't pick anything (keyboard-driven).
        if (startView === 'name') return;

        // Slot picker: click a slot row or Back.
        if (startView === 'slots') {
            for (let i = 0; i <= SAVE_SLOT_COUNT; i++) {
                const oy = slotRowY(i);
                if (mouseY >= oy - 20 && mouseY < oy + 20 &&
                    mouseX >= width / 2 - 160 && mouseX < width / 2 + 160) {
                    slotSelectIndex = i;
                    chooseSlot(i);
                    return;
                }
            }
            return;
        }

        // Main menu options at y = 150 + i*40, centered horizontally.
        for (let i = 0; i < startMenuOptions.length; i++) {
            const oy = 150 + i * 40;
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
        // Toast Toss interaction (only on holiday)
        if (typeof tryToastToss === 'function' && tryToastToss()) return;
        // Use the selected hotbar item on a clicked adjacent tile (e.g. plant a seed).
        if (typeof tryUseActiveItemAt === 'function') {
            const TS = CONFIG.TILE_SIZE;
            const tx = Math.floor((mouseX + cameraX) / TS);
            const ty = Math.floor((mouseY + cameraY) / TS);
            // Adjacent = within 1 tile (incl. diagonals), but not the player's own tile.
            const adj = Math.max(Math.abs(tx - player.x), Math.abs(ty - player.y)) === 1;
            if (adj && tryUseActiveItemAt(tx, ty)) return;
        }
        tryHarvest();
        return;
    }

    // ===== INSIDE: click to interact (place/pick up furniture, sleep, exit) =====
    if (gameState === STATE.INSIDE) {
        // Furniture/decoration placement & pickup on the clicked interior tile.
        const it = getInteriorTileAtMouse();
        if (it) {
            const active = inventory.getActiveItem();
            // Holding a placeable home item -> try to place it.
            if (active && ITEMS[active.id] && ITEMS[active.id].home) {
                if (tryPlaceHomeItemInside(it.x, it.y)) return;
            } else {
                // Empty / non-placeable hand -> try to pick a placed item back up.
                if (tryPickupHomeInside(it.x, it.y)) return;
            }
        }
        // Try sleeping in the bed first (only if it's night)
        if (trySleep()) return;
        // Otherwise try to exit
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
        const leftH = height - leftY - pad - 20; // match drawMenuScreen
        const contentH = leftH - tabH - 8;

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

        // --- Crafting tab: branching menu clicks (categories / recipes) ---
        if (menuTab === 1 && typeof craftingTabClick === 'function') {
            const contentY = leftY + tabH + 4;
            if (craftingTabClick(leftX + 4, contentY, leftW - 8, contentH)) return;
        }

        // --- Settings tab: clickable action rows ---
        if (menuTab === 6) {
            const contentY = leftY + tabH + 4;
            const sx = leftX + 4;
            // "▶ Save Game" row at y + 50
            const saveY = contentY + 50;
            if (mouseY >= saveY - 4 && mouseY < saveY + 11 &&
                mouseX >= sx && mouseX < sx + 200) {
                saveGame();
                notify('Game saved!');
                return;
            }
            // "▶ Save and Quit to Menu" row at y + 66
            const quitY = contentY + 66;
            if (mouseY >= quitY - 4 && mouseY < quitY + 11 &&
                mouseX >= sx && mouseX < sx + 220) {
                saveAndQuit();
                return;
            }
        }

        return;
    }

    // ===== PAUSED: click "Resume" or "Save" =====
    if (gameState === STATE.PAUSED) {
        // "ESC - Resume" at y=120, "S - Save Game" at y=145
        if (mouseY >= 110 && mouseY < 130) {
            gameState = insideBuilding ? STATE.INSIDE : STATE.PLAYING;
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

    // Only enter via a door tile (bottom-center of the exterior; may be 2 wide).
    // The player must be facing one of those tiles.
    if (!b.isDoorTile(facing.x, facing.y)) {
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

    // Place the player on the clear standing tile just outside this building's door.
    const spot = findExteriorStandingTile(b);
    player.x = spot.x;
    player.y = spot.y;
    player.facing = 'down';

    insideBuilding = null;
    gameState = STATE.PLAYING;
    updateCamera();
    notify("Exited building");
    return true;
}

// ===== OVERWORLD SPAWN HELPERS =====
// Finds a clear, walkable tile just outside a building's door (overworld coords).
// Checks candidates in order: directly below the door, then further out, then to
// the sides. Robust even if something spawned in front. As a last resort it
// clears the tile directly below the door so the player is never stuck.
function findExteriorStandingTile(b) {
    const door = b.getDoorTile();
    const candidates = [
        { x: door.x,     y: door.y + 1 },
        { x: door.x,     y: door.y + 2 },
        { x: door.x - 1, y: door.y + 1 },
        { x: door.x + 1, y: door.y + 1 },
        { x: door.x - 1, y: door.y + 2 },
        { x: door.x + 1, y: door.y + 2 },
    ];
    for (const c of candidates) {
        if (c.x < 0 || c.x >= CONFIG.WORLD_WIDTH || c.y < 0 || c.y >= CONFIG.WORLD_HEIGHT) continue;
        if (!world.tiles[c.x] || !world.tiles[c.x][c.y]) continue;
        if (isSolidTile(c.x, c.y)) continue;
        if (buildingAt(c.x, c.y)) continue;
        return { x: c.x, y: c.y };
    }
    // No clear tile found — clear the spot directly below the door and use it.
    const fx = door.x, fy = door.y + 1;
    if (fy >= 0 && fy < CONFIG.WORLD_HEIGHT && world.tiles[fx] && world.tiles[fx][fy]) {
        world.tiles[fx][fy] = { type: 'grass', variant: 0 };
    }
    return { x: fx, y: fy };
}

// The player's home shack (owner 'player'), falling back to the first building.
function getPlayerShack() {
    if (!buildings || buildings.length === 0) return null;
    return buildings.find(b => b.owner === 'player') || buildings[0];
}

// Place the player in the overworld, standing in the space in front of the shack.
// This is the single source of truth for "where the player appears in the
// overworld" — used by both new games and loads so the player can never be
// warped to the top-left by a stale/interior saved position.
function placePlayerAtShackEntrance() {
    const b = getPlayerShack();
    const spot = b ? findExteriorStandingTile(b) : { x: 50, y: 50 };
    player.x = spot.x;
    player.y = spot.y;
    player.facing = 'down';
    insideBuilding = null;
    updateCamera();
}

// ===== SLEEPING =====
// Night is defined as 8 PM (20:00) to 6 AM (06:00).
function isNightTime() {
    const hour = world.timeMinutes / 60;
    return hour >= 20 || hour < 6;
}

// If the player is adjacent to a bed inside a building and it's night, skip to 6 AM.
function trySleep() {
    if (!insideBuilding || !world) return false;
    const b = insideBuilding;

    // Find the bed tile
    let bedX = -1, bedY = -1;
    for (let x = 0; x < b.interiorW; x++) {
        for (let y = 0; y < b.interiorH; y++) {
            if (b.interiorTiles[x][y].type === 'bed') {
                bedX = x;
                bedY = y;
            }
        }
    }
    if (bedX < 0 || bedY < 0) return false;

    // Player must be standing next to the bed and facing it
    const dx = bedX - player.x;
    const dy = bedY - player.y;
    const isAdjacent = (abs(dx) === 1 && dy === 0) || (dx === 0 && abs(dy) === 1);
    if (!isAdjacent) return false;

    // Check facing direction matches the bed
    const facing = player.getFacingTile ? player.getFacingTile() : null;
    if (!facing || facing.x !== bedX || facing.y !== bedY) return false;

    if (!isNightTime()) {
        notify("You can only sleep at night.");
        return false;
    }

    // Skip to next day 6:00 AM
    world.day++;
    world.timeMinutes = 6 * 60;
    notify("You slept until morning. Day " + world.day + " begins!");

    // Spawn new bird poop at sunrise
    spawnBirdPoop(3 + floor(random(3)));

    // Wake up just outside the bed
    // Move player to a free adjacent tile if they're currently standing in the bed tile
    if (player.x === bedX && player.y === bedY) {
        // Prefer the tile below the bed (foot of the bed)
        const wakeX = bedX;
        const wakeY = min(bedY + 1, b.interiorH - 2);
        if (b.interiorTiles[wakeX][wakeY].type !== 'wall' && b.interiorTiles[wakeX][wakeY].type !== 'bed') {
            player.x = wakeX;
            player.y = wakeY;
        }
    }
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

    // Draw player — 2 tiles tall, bottom-anchored at player tile.
    // The top half peeks above the bottom wall row when on the top floor tile.
    const px = offsetX + player.x * TS;
    const py = offsetY + player.y * TS;
    const pSpr = SPRITES['sprites.player'];
    const pMoving = (millis() - lastMoveTime) < 180;
    if (!drawCharacterSprite(pSpr, px, py - TS, player.facing, pMoving)) {
        fill(0, 100, 255);
        rect(px, py - TS, TS, TS * 2);
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
        // Hung wall decoration (tapestry, painting, window, etc.)
        if (tile.deco && ITEMS[tile.deco]) {
            drawWallDeco(tile.deco, sx, sy, TS);
        }
    } else if (tile.type === 'home') {
        // Floor base, then the placed furniture / floor decoration on top.
        const grassSpr = SPRITES['tiles.grass'];
        if (grassSpr) { image(grassSpr, sx, sy, TS, TS); } else { fill('#7CB342'); noStroke(); rect(sx, sy, TS, TS); }
        drawHomeItem(tile.item, sx, sy, TS);
    } else if (tile.type === 'grass') {
        const spr = SPRITES['tiles.grass'];
        if (spr) {
            image(spr, sx, sy, TS, TS);
        } else {
            fill('#7CB342');
            rect(sx, sy, TS, TS);
        }
    } else if (tile.type === 'bed') {
        // Grass base first so no dark gaps around the sprite
        const grassSpr = SPRITES['tiles.grass'];
        if (grassSpr) { image(grassSpr, sx, sy, TS, TS); } else { fill('#7CB342'); rect(sx, sy, TS, TS); }
        const spr = SPRITES['tiles.' + tile.variant];
        if (spr) {
            // Bed sprite is 16x32 (2 tiles tall). Bottom-anchored so the base sits
            // on this floor tile and the headboard rises into the wall row above.
            image(spr, sx, sy - TS, TS, TS * 2);
        } else {
            fill('#8B4513');
            rect(sx, sy, TS, TS);
            fill('#FFD700');
            rect(sx + 2, sy + 2, TS - 4, TS - 4);
        }
    } else {
        // Fallback
        fill('#7CB342');
        rect(sx, sy, TS, TS);
    }
}

// ===== HOME ITEM HELPERS =====
// True if an interior tile holds a solid (movement-blocking) furniture piece.
function isSolidHomeTile(tile) {
    if (!tile || tile.type !== 'home') return false;
    const item = ITEMS[tile.item];
    return !!(item && item.home && item.home.solid);
}

// Draw a placed furniture / floor-decoration item. We have no sprites yet, so
// these are simple shaded shapes colored by the item — good enough to read the
// room, and easy to swap for art later.
function drawHomeItem(itemId, sx, sy, TS) {
    const item = ITEMS[itemId];
    if (!item) return;
    const spr = SPRITES['items.' + itemId];
    if (spr) { image(spr, sx, sy, TS, TS); return; }
    const c = item.color;
    noStroke();
    const home = item.home || {};
    if (home.cls === 'decoration') {
        // Floor decoration (rug): flat ellipse covering most of the tile.
        fill(c);
        ellipse(sx + TS / 2, sy + TS / 2, TS - 2, TS - 4);
        fill(0, 0, 0, 40);
        ellipse(sx + TS / 2, sy + TS / 2, TS - 8, TS - 10);
    } else {
        // Furniture: a body block with a darker base shadow and a light top edge.
        fill(0, 0, 0, 50);
        rect(sx + 2, sy + TS - 4, TS - 4, 3);
        fill(c);
        rect(sx + 2, sy + 3, TS - 4, TS - 6, 2);
        fill(255, 255, 255, 45);
        rect(sx + 2, sy + 3, TS - 4, 2, 2);
    }
}

// Draw a decoration hung on a wall tile (overlay on top of the wood wall).
function drawWallDeco(itemId, sx, sy, TS) {
    const item = ITEMS[itemId];
    if (!item) return;
    const spr = SPRITES['items.' + itemId];
    if (spr) { image(spr, sx, sy, TS, TS); return; }
    noStroke();
    // Dark frame, then the colored face inset within it.
    fill(20, 14, 10);
    rect(sx + 2, sy + 2, TS - 4, TS - 4);
    fill(item.color);
    rect(sx + 3, sy + 3, TS - 6, TS - 6);
}

// Convert mouse position to an interior tile coordinate (or null if outside).
function getInteriorTileAtMouse() {
    if (!insideBuilding) return null;
    const b = insideBuilding;
    const TS = CONFIG.TILE_SIZE;
    const interiorPixW = b.interiorW * TS;
    const interiorPixH = b.interiorH * TS;
    const offsetX = Math.floor((CONFIG.CANVAS_WIDTH - interiorPixW) / 2);
    const offsetY = Math.floor((CONFIG.CANVAS_HEIGHT - interiorPixH) / 2);
    const tx = Math.floor((mouseX - offsetX) / TS);
    const ty = Math.floor((mouseY - offsetY) / TS);
    if (tx < 0 || tx >= b.interiorW || ty < 0 || ty >= b.interiorH) return null;
    return { x: tx, y: ty };
}

// Try to place the equipped home item on the clicked interior tile.
// Returns true if a placement happened (or was attempted with feedback).
function tryPlaceHomeItemInside(tx, ty) {
    if (!insideBuilding) return false;
    const active = inventory.getActiveItem();
    if (!active) return false;
    const item = ITEMS[active.id];
    if (!item || !item.home) return false; // not a placeable item

    const b = insideBuilding;
    const tile = b.interiorTiles[tx][ty];
    const home = item.home;

    if (home.placeOn === 'wall') {
        if (tile.type !== 'wall') { notify(item.name + ' must hang on a wall.'); return true; }
        if (tile.deco) { notify('That wall spot is taken.'); return true; }
        tile.deco = active.id;
    } else {
        // Floor placement: only on an empty grass floor tile, not the door.
        const door = b.getInteriorDoorPos();
        if (tx === door.x && ty === door.y) { notify("Can't block the door."); return true; }
        if (tile.type !== 'grass') { notify('Place that on an empty floor tile.'); return true; }
        b.interiorTiles[tx][ty] = { type: 'home', item: active.id };
    }
    inventory.removeItem(active.id, 1);
    notify('Placed ' + item.name + '.');
    return true;
}

// Try to pick up a placed home item from the clicked tile (empty hand).
function tryPickupHomeInside(tx, ty) {
    if (!insideBuilding) return false;
    const b = insideBuilding;
    const tile = b.interiorTiles[tx][ty];
    if (tile.type === 'home') {
        const id = tile.item;
        b.interiorTiles[tx][ty] = { type: 'grass', variant: floor(Math.random() * 3) };
        inventory.addItem(id, 1);
        notify('Picked up ' + (ITEMS[id] ? ITEMS[id].name : id) + '.');
        return true;
    }
    if (tile.type === 'wall' && tile.deco) {
        const id = tile.deco;
        delete tile.deco;
        inventory.addItem(id, 1);
        notify('Took down ' + (ITEMS[id] ? ITEMS[id].name : id) + '.');
        return true;
    }
    return false;
}

function keyPressed() {
    if (gameState === STATE.START) {
        // --- Name-entry sub-screen: capture typed characters ---
        if (startView === 'name') {
            if (keyCode === ENTER || keyCode === RETURN) {
                beginNewGameInSlot(nameEntrySlot, nameEntryText);
            } else if (keyCode === ESCAPE) {
                startView = 'slots';
            } else if (keyCode === BACKSPACE) {
                nameEntryText = nameEntryText.slice(0, -1);
            } else if (key && key.length === 1 && /[A-Za-z0-9 '!\-]/.test(key) && nameEntryText.length < 16) {
                nameEntryText += key;
            }
            return false;
        }

        // --- Slot-picker sub-screen ---
        if (startView === 'slots') {
            const rowCount = SAVE_SLOT_COUNT + 1; // slots + Back
            if (keyCode === UP_ARROW) {
                slotSelectIndex = (slotSelectIndex - 1 + rowCount) % rowCount;
            } else if (keyCode === DOWN_ARROW) {
                slotSelectIndex = (slotSelectIndex + 1) % rowCount;
            } else if (keyCode === ENTER || keyCode === RETURN) {
                chooseSlot(slotSelectIndex);
            } else if (keyCode === ESCAPE) {
                startView = 'main';
            }
            return false;
        }

        // --- Main start menu ---
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
            // Check if facing a building - enter it
            if (tryEnterBuilding()) return false;
            // Check if facing an NPC - talk to them
            if (typeof npcAtFacing === 'function') {
                const npc = npcAtFacing();
                if (npc) {
                    openDialogue(npc);
                    return false;
                }
            }
            // Toast Toss interaction (only on holiday, before normal harvest)
            if (typeof tryToastToss === 'function' && tryToastToss()) return false;
            // Otherwise try harvest (gettin/gardening handled by their own key wrappers)
            tryHarvest();
            return false;
        } else if (keyCode === SHIFT) {
            // Shift+Enter for advanced NPC menu - check on Enter with shift held
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
            // Try to sleep in the bed (only at night), otherwise exit building
            if (trySleep()) return false;
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
            gameState = insideBuilding ? STATE.INSIDE : STATE.PLAYING;
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
            gameState = insideBuilding ? STATE.INSIDE : STATE.PLAYING;
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
        // Tree tops are not harvestable - only the solid trunk tile below.
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

// Spawn Toast Toss Tournament targets on beach tiles.
function spawnToastTargets(targetCount) {
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
        if (!tile || tile.type !== 'beach') continue;
        if (isSolidTile(x, y)) continue;
        if (buildingAt(x, y)) continue;
        if (x === px && y === py) continue;
        world.tiles[x][y] = { type: 'toast_target', variant: floor(random(3)) };
        spawned++;
    }
    if (spawned > 0) {
        notify(spawned + ' toast targets appeared on the beach!');
    }
}

function tryToastToss() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Toast Toss Tournament') return false;

    const facing = player.getFacingTile ? player.getFacingTile() : null;
    if (!facing || !facing.tile) return false;
    if (facing.tile.type !== 'toast_target') return false;

    const active = inventory.getActiveItem();
    if (!active || active.id !== 'stale_toast') {
        notify('Equip some Stale Toast to join the tournament!');
        return false;
    }

    // Score based on distance from target center - represented by variant.
    const variant = facing.tile.variant || 0;
    const scoreRoll = random();
    let prize = null;
    let prizeCount = 1;
    let message = '';

    if (variant === 0 && scoreRoll < 0.7) {
        prize = 'gold_coin';
        prizeCount = 1 + floor(random(2));
        message = 'Bullseye! The toast lands square in the target. You win ' + prizeCount + ' Gold Coin' + (prizeCount > 1 ? 's' : '') + '!';
    } else if (scoreRoll < 0.5) {
        prize = 'banana';
        prizeCount = 1 + floor(random(2));
        message = 'Nice toss! The toast clips the rim. You win ' + prizeCount + ' Banana' + (prizeCount > 1 ? 's' : '') + '!';
    } else {
        message = 'Splat! The toast misses entirely. The target just stares back.';
    }

    inventory.removeItem('stale_toast', 1);
    if (prize) {
        inventory.addItem(prize, prizeCount);
        notify(message + ' (-1 toast)');
    } else {
        notify(message + ' (-1 toast)');
    }

    // Target disappears after being hit.
    facing.tile.type = 'beach';
    facing.tile.variant = 0;
    facing.tile.depleted = false;
    facing.tile.respawnAt = null;
    return true;
}

function handleStartMenuSelection() {
    switch(selectedMenuOption) {
        case 0: // New Game -> choose a slot, then name it
            startMode = 'new';
            startView = 'slots';
            slotSelectIndex = 0;
            break;
        case 1: // Load Game -> choose a slot to load
            startMode = 'load';
            startView = 'slots';
            // Default-highlight the first occupied slot, if any.
            slotSelectIndex = 0;
            const slots = getAllSaveSlots();
            const firstFilled = slots.findIndex(s => s.exists);
            if (firstFilled >= 0) slotSelectIndex = firstFilled;
            break;
        case 2: // Settings - go straight to menu settings tab
            gameState = STATE.MENU;
            menuTab = 6;
            break;
    }
}

// Handle a choice in the slot picker (index 0..2 = slots, SAVE_SLOT_COUNT = Back).
function chooseSlot(i) {
    if (i === SAVE_SLOT_COUNT) { startView = 'main'; return; } // Back

    if (startMode === 'load') {
        const info = getSaveSlotInfo(i);
        if (!info.exists) { notify('That slot is empty.'); return; }
        loadGameFromSlot(i);
    } else {
        // New game: go to the name-entry screen for this slot.
        nameEntrySlot = i;
        nameEntryText = '';
        startView = 'name';
    }
}

// Start a brand-new game in the given slot under the chosen name, then persist it.
function beginNewGameInSlot(slot, name) {
    currentSlot = slot;
    currentSaveName = (name && name.trim()) ? name.trim() : ('Save ' + (slot + 1));
    startView = 'main';
    startNewGame();        // builds the world, places player, sets STATE.PLAYING
    enhancedSaveGame();    // immediately persist so the named slot exists
    notify('New island "' + currentSaveName + '" created!');
}

// Load a specific slot into the overworld.
function loadGameFromSlot(slot) {
    if (typeof enhancedLoadGameFromSlot === 'function' && enhancedLoadGameFromSlot(slot)) {
        if (typeof checkArrivals === 'function' && (!npcs || npcs.length === 0)) checkArrivals();
        if (typeof spawnHog === 'function' && !hog) spawnHog();
        // Always re-enter the overworld in front of the shack (never warp top-left).
        placePlayerAtShackEntrance();
        startView = 'main';
        gameState = STATE.PLAYING;
        notify('Loaded: ' + currentSaveName);
        return true;
    }
    notify('That slot is empty');
    return false;
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
    birds = [];
    crabs = [];
    groundLoot = [];
    _lastAnimalHour = null;
    // Spawn first neighbor
    checkArrivals();
    // Spawn initial animals at the start of the day
    if (typeof onAnimalNewDay === 'function') onAnimalNewDay();
    // Spawn hog if not already present (fresh games)
    if (typeof spawnHog === 'function' && !hog) spawnHog();
    // Stand the player in front of the shack (single source of truth).
    placePlayerAtShackEntrance();
    gameState = STATE.PLAYING;
}

// Spawn the player's starter shack just beside the spawn point
function spawnPlayerShack() {
    // Shack exterior is 8x5 tiles. Place it just right of the player spawn (50,50),
    // so the player stands clear of it and the door faces open ground.
    const b = new Building('shack', 52, 47, 'player');
    clearBuildingFootprint(b);
    buildings.push(b);
}

function saveGame() {
    enhancedSaveGame();
}

// Save the game, then return to the start menu.
function saveAndQuit() {
    saveGame();
    notify('Game saved. Returning to menu...');
    insideBuilding = null;
    gameState = STATE.START;
    startView = 'main';
    selectedMenuOption = 1; // default-highlight "Load Game"
}

function loadGame() {
    if (typeof enhancedLoadGame === 'function' && enhancedLoadGame()) {
        // Ensure systems that may not be in old saves are present
        if (typeof checkArrivals === 'function' && (!npcs || npcs.length === 0)) checkArrivals();
        if (typeof spawnHog === 'function' && !hog) spawnHog();
        // Always re-enter the overworld in front of the shack. The saved position
        // can be interior coords (if saved indoors), which would otherwise warp
        // the player to the top-left of the map.
        placePlayerAtShackEntrance();
        gameState = STATE.PLAYING;
        notify('Save loaded!');
        return true;
    }
    notify('No save found');
    return false;
}

function loadSaveData() {
    // Run at startup: fold any legacy single-slot save into slot 0, then report
    // whether any slot has a save.
    if (typeof migrateLegacySave === 'function') migrateLegacySave();
    if (typeof getAllSaveSlots === 'function') return getAllSaveSlots().some(s => s.exists);
    return localStorage.getItem(SAVE_KEY) !== null;
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

        // Tools don't stack - each gets its own slot with durability.
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
            // Handle old saves with 24 slots - migrate to new size
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

// ===== CHARACTER ANIMATION =====
// Hybrid sprite system for the player and NPCs.
//
// A character image can be either:
//   * a plain 16x32 still  -> animated with a horizontal flip (for facing left)
//     and a gentle vertical "bob" while moving. No new art required.
//   * a sprite SHEET of 16x32 frames -> rows = facing directions, columns =
//     walk frames. Detected automatically from the image dimensions.
//
// Sheet row conventions (by number of rows):
//   4 rows: 0=down, 1=left, 2=right, 3=up
//   3 rows: 0=down, 1=up, 2=side  (side is mirrored for left vs right)
//   1-2 rows: single-direction animation, mirrored for left
// Columns are walk frames; column 0 is the idle pose.
const CHAR_FW = 16;            // source frame width
const CHAR_FH = 32;            // source frame height
const WALK_FRAME_MS = 150;     // ms per animation frame
const BOB_PATTERN = [0, -1, -2, -1]; // vertical bob offsets for still-image walk

// Draw an image, optionally mirrored horizontally, optionally from a source rect.
function drawSpriteMaybeFlipped(spr, dx, dy, dw, dh, flip, sx, sy, sw, sh) {
    const hasSrc = (sx !== undefined);
    if (!flip) {
        if (hasSrc) image(spr, dx, dy, dw, dh, sx, sy, sw, sh);
        else image(spr, dx, dy, dw, dh);
        return;
    }
    push();
    translate(dx + dw, dy);
    scale(-1, 1);
    if (hasSrc) image(spr, 0, 0, dw, dh, sx, sy, sw, sh);
    else image(spr, 0, 0, dw, dh);
    pop();
}

// Draw a character sprite at (dx,dy) as a TS-wide x 2*TS-tall figure.
// facing: 'down'|'up'|'left'|'right'. moving: bool. Returns false if no sprite.
function drawCharacterSprite(spr, dx, dy, facing, moving) {
    if (!spr) return false;
    const TS = CONFIG.TILE_SIZE;
    const drawW = TS, drawH = TS * 2;
    const cols = Math.max(1, Math.floor(spr.width / CHAR_FW));
    const rows = Math.max(1, Math.floor(spr.height / CHAR_FH));
    const phase = Math.floor(millis() / WALK_FRAME_MS);

    // Plain single still image -> bob + flip.
    // Convention: un-flipped art faces LEFT, so mirror when facing right.
    if (cols <= 1 && rows <= 1) {
        const bob = moving ? BOB_PATTERN[phase % BOB_PATTERN.length] : 0;
        drawSpriteMaybeFlipped(spr, dx, dy + bob, drawW, drawH, facing === 'right');
        return true;
    }

    // Sprite sheet -> choose row by facing, column by walk frame.
    // Convention: side-row art faces LEFT, so mirror when facing right.
    let row = 0, flip = false;
    if (rows >= 4) {
        row = { down: 0, left: 1, right: 2, up: 3 }[facing];
        if (row === undefined) row = 0;
    } else if (rows === 3) {
        if (facing === 'up') row = 1;
        else if (facing === 'left' || facing === 'right') { row = 2; flip = (facing === 'right'); }
        else row = 0;
    } else {
        row = 0;
        flip = (facing === 'right');
    }
    const frame = moving ? (phase % cols) : 0;
    drawSpriteMaybeFlipped(spr, dx, dy, drawW, drawH, flip,
        frame * CHAR_FW, row * CHAR_FH, CHAR_FW, CHAR_FH);
    return true;
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

        // Collision check - buildings block movement
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
        // Player is 1 tile wide, 2 tiles tall (drawn bottom-anchored).
        // Considered "moving" briefly after each grid step.
        const moving = (millis() - lastMoveTime) < 180;
        if (!drawCharacterSprite(spr, screenX, screenY - CONFIG.TILE_SIZE, this.facing, moving)) {
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

// ===== TERRAIN EDGE ROUNDING =====
// Purely visual: softens the hard square boundaries between terrain heights by
// carving rounded corners. "Height" is water (0) < beach (1) < land (2). A
// higher tile that meets lower terrain on two sides of a corner gets that corner
// rounded off with the lower terrain's color. Collision is unaffected.
let ROUND_TERRAIN = true;

// Approximate palette used to carve corners (close to the tile sprites).
const TERRAIN_EDGE_COLORS = { 0: '#4A90C8', 1: '#F4E4BC', 2: '#7CB342' };

// Terrain height level. Anything that sits on land (grass, trees, rocks, flowers)
// counts as land so we only round true coast/beach edges, not grass detail.
// Off-map neighbors are treated as land so the rectangular world border isn't carved.
function terrainLevel(tile) {
    if (!tile) return 2;
    if (tile.type === 'sea' || tile.type === 'water') return 0;
    if (tile.type === 'beach') return 1;
    return 2;
}

// CONVEX corner: carve the protruding corner of a HIGHER tile. Fills the area of
// the tile corner OUTSIDE a quarter circle (centered inset from the corner) with
// the lower terrain's color, rounding off the bump.
// (hx,vy) pick the corner: (-1,-1)=NW, (1,-1)=NE, (-1,1)=SW, (1,1)=SE.
function drawCornerWedge(sx, sy, TS, hx, vy, r, col) {
    const outerX = hx > 0 ? sx + TS : sx;
    const outerY = vy > 0 ? sy + TS : sy;
    const centerX = outerX - hx * r;
    const centerY = outerY - vy * r;
    const bx = outerX - hx * r, by = outerY;        // point on the horizontal edge
    const ax = outerX,          ay = outerY - vy * r; // point on the vertical edge
    const a0 = Math.atan2(by - centerY, bx - centerX);
    const a1 = Math.atan2(ay - centerY, ax - centerX);
    let da = a1 - a0;
    while (da > Math.PI) da -= 2 * Math.PI;
    while (da < -Math.PI) da += 2 * Math.PI;
    fill(col);
    noStroke();
    beginShape();
    vertex(outerX, outerY);
    const segs = 6;
    for (let i = 0; i <= segs; i++) {
        const a = a0 + da * (i / segs);
        vertex(centerX + Math.cos(a) * r, centerY + Math.sin(a) * r);
    }
    endShape(CLOSE);
}

// CONCAVE corner: fillet an inner corner of a LOWER tile that has higher terrain
// wrapping around it. Fills a quarter disk (pie slice) centered AT the corner
// with the higher terrain's color, so the wrap reads as a smooth inner curve.
function drawCornerFill(sx, sy, TS, hx, vy, r, col) {
    const outerX = hx > 0 ? sx + TS : sx;
    const outerY = vy > 0 ? sy + TS : sy;
    const bx = outerX - hx * r, by = outerY;        // point on the horizontal edge
    const ax = outerX,          ay = outerY - vy * r; // point on the vertical edge
    const a0 = Math.atan2(by - outerY, bx - outerX);
    const a1 = Math.atan2(ay - outerY, ax - outerX);
    let da = a1 - a0;
    while (da > Math.PI) da -= 2 * Math.PI;
    while (da < -Math.PI) da += 2 * Math.PI;
    fill(col);
    noStroke();
    beginShape();
    vertex(outerX, outerY);
    const segs = 6;
    for (let i = 0; i <= segs; i++) {
        const a = a0 + da * (i / segs);
        vertex(outerX + Math.cos(a) * r, outerY + Math.sin(a) * r);
    }
    endShape(CLOSE);
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

        // Smooth the coastline: remove lone 1-tile extrusions/notches so the
        // island reads as natural curves instead of rasterized jaggies.
        this.smoothTerrain(2);

        // Scatter decorations on a 10x10 grid - at most 1 decoration per cell
        // This keeps open space for building
        const CELL = 10;
        const decorations = ['tree', 'tree', 'rock', 'shiny_rock', 'weeds', 'bird_poop'];

        for (let cx = 0; cx < CONFIG.WORLD_WIDTH; cx += CELL) {
            for (let cy = 0; cy < CONFIG.WORLD_HEIGHT; cy += CELL) {
                // Pick a random tile within this 10x10 cell
                const tx = cx + floor(random(CELL));
                const ty = cy + floor(random(CELL));
                if (tx >= CONFIG.WORLD_WIDTH || ty >= CONFIG.WORLD_HEIGHT) continue;

                const d = dist(tx, ty, centerX, centerY);
                if (d > 42) continue;          // skip sea
                if (d > 38) {
                    // Beach zone - mostly empty for now.
                    continue;
                }
                // Interior - 1 decoration per cell, ~80% chance (some cells stay empty)
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

    // Smooth the base terrain (sea/beach/grass) by removing lone 1-tile
    // extrusions and notches. A tile flips to its dominant neighbor type when 3+
    // of its 4 orthogonal neighbors share that type — so single pokes get
    // absorbed while genuine corners (2 vs 2) are preserved. Run before
    // decorations are placed, on new-world generation only.
    smoothTerrain(passes = 1) {
        const BASE = { sea: true, beach: true, grass: true };
        const W = CONFIG.WORLD_WIDTH, H = CONFIG.WORLD_HEIGHT;
        for (let p = 0; p < passes; p++) {
            const changes = [];
            for (let x = 0; x < W; x++) {
                for (let y = 0; y < H; y++) {
                    const t = this.tiles[x][y];
                    if (!t || !BASE[t.type]) continue;
                    const counts = {};
                    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                        const nx = x + dx, ny = y + dy;
                        if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
                        const nt = this.tiles[nx][ny];
                        if (!nt || !BASE[nt.type]) continue;
                        counts[nt.type] = (counts[nt.type] || 0) + 1;
                    }
                    let domType = null, domCount = 0;
                    for (const k in counts) {
                        if (counts[k] > domCount) { domCount = counts[k]; domType = k; }
                    }
                    if (domType && domType !== t.type && domCount >= 3) {
                        changes.push([x, y, domType]);
                    }
                }
            }
            if (changes.length === 0) break;
            for (const [x, y, type] of changes) {
                this.tiles[x][y] = { type, variant: floor(random(3)) };
            }
        }
    }

    // Place a 2-tall tree: solid trunk at (x,y) and solid canopy at (x,y-1).
    placeTree(x, y, type = 'tree') {
        if (this.tiles[x][y].type !== 'grass') return;
        const topY = y - 1;
        if (topY < 0 || topY >= CONFIG.WORLD_HEIGHT) return;
        const topTile = this.tiles[x][topY];
        if (!topTile || topTile.type !== 'grass') return;
        // Ensure the top spot hasn't already been claimed by another decoration.
        if (topTile.solid === true || topTile.isTreeTop === true) return;

        this.tiles[x][y] = { type: 'tree', variant: floor(random(3)), solid: true };
        this.tiles[x][topY] = { type: 'tree', variant: floor(random(3)), isTreeTop: true, solid: true };
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

        // Pass 2: soften terrain boundaries by rounding outer corners. Each wedge
        // stays inside its own tile, so this never paints over trees/buildings.
        if (ROUND_TERRAIN) {
            for (let x = max(0, startTileX); x < min(CONFIG.WORLD_WIDTH, endTileX); x++) {
                for (let y = max(0, startTileY); y < min(CONFIG.WORLD_HEIGHT, endTileY); y++) {
                    this.drawTerrainCornerRounding(x, y);
                }
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
            // Sunrise: animals spawn (handled by checkAnimalSunEvents too, but ensure on wrap)
            if (typeof onAnimalNewDay === 'function') onAnimalNewDay();
            if (typeof onHogNewDay === 'function') onHogNewDay();
        }
    }

    // Pass 2: draw tree canopy tops as part of the base world pass.
    // Both trunk and top tiles are now solid, so depth sorting is simple.
    drawTreeTops() {
        // Deprecated: canopy tops are drawn during drawTile now that trees are fully solid.
    }
    
    // Round both convex (protruding) and concave (inner) corners of this tile
    // where it borders a different terrain height.
    drawTerrainCornerRounding(x, y) {
        const L = terrainLevel(this.tiles[x][y]);
        const TS = CONFIG.TILE_SIZE;
        const sx = x * TS, sy = y * TS;
        const r = Math.max(4, Math.round(TS * 0.5));

        // 4 corners: NW, NE, SW, SE
        const corners = [ [-1, -1], [1, -1], [-1, 1], [1, 1] ];
        for (const [hx, vy] of corners) {
            const hTile = (this.tiles[x + hx]) ? this.tiles[x + hx][y] : null;       // horizontal neighbor
            const vTile = this.tiles[x][y + vy] !== undefined ? this.tiles[x][y + vy] : null; // vertical neighbor
            const lvlH = terrainLevel(hTile);
            const lvlV = terrainLevel(vTile);

            if (lvlH < L && lvlV < L) {
                // Convex outer corner: carve this higher tile's bump with the
                // higher of the two lower neighbors (correct grass→beach→water layering).
                drawCornerWedge(sx, sy, TS, hx, vy, r, TERRAIN_EDGE_COLORS[Math.max(lvlH, lvlV)]);
            } else if (lvlH > L && lvlV > L) {
                // Concave inner corner: fillet with the lower of the two higher
                // neighbors (the terrain directly above this one).
                drawCornerFill(sx, sy, TS, hx, vy, r, TERRAIN_EDGE_COLORS[Math.min(lvlH, lvlV)]);
            }
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
                    // Single 16x16 sprite - draw whole thing, no frame slicing
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
                drawBase('grass');
                // Both trunk and top tiles draw their own half of the 16x32 sprite.
                const spr = SPRITES['tiles.tree'];
                if (spr) {
                    if (tile.depleted) tint(160, 160, 160);
                    if (isTop) {
                        image(spr, screenX, screenY, TS, TS, 0, 0, spr.width, TS);
                    } else {
                        const sy = spr.height - TS;
                        image(spr, screenX, screenY, TS, TS, 0, sy, spr.width, TS);
                    }
                    noTint();
                } else {
                    if (isTop) {
                        fill(tile.depleted ? '#7A9E7A' : '#2E7D32');
                        ellipse(screenX + 8, screenY + 12, 12, 12);
                    } else {
                        fill(tile.depleted ? '#7A6050' : '#8B4513');
                        rect(screenX + 6, screenY + 4, 4, 10);
                    }
                }
                break;
            }
            case 'rock': {
                // Draw grass base first, then rock sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.rock'];
                if (spr) {
                    if (tile.depleted) tint(160, 160, 160);
                    const offsetX = screenX - (spr.width - TS) / 2;
                    const offsetY = screenY - (spr.height - TS);
                    image(spr, offsetX, offsetY);
                    noTint();
                } else {
                    fill(tile.depleted ? '#888' : '#9E9E9E');
                    ellipse(screenX + 8, screenY + 10, 10, 8);
                    fill(tile.depleted ? '#AAA' : '#BDBDBD');
                    ellipse(screenX + 6, screenY + 8, 4, 3);
                }
                break;
            }
            case 'shiny_rock': {
                // Draw grass base first, then shiny rock sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.shiny_rock'];
                if (spr) {
                    if (tile.depleted) tint(160, 160, 160);
                    image(spr, screenX, screenY, TS, TS);
                    noTint();
                } else {
                    fill(tile.depleted ? '#AAA' : '#BDBDBD');
                    ellipse(screenX + 8, screenY + 10, 10, 8);
                    if (!tile.depleted) {
                        fill('#FFD700');
                        const sx = screenX + 6 + (waterFrame % 2);
                        const sy = screenY + 7 + (waterFrame % 2);
                        rect(sx, sy, 1, 1);
                        rect(sx + 2, sy + 2, 1, 1);
                    }
                }
                break;
            }
            case 'weeds': {
                // Draw grass base first, then weeds sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.weeds'];
                if (spr) {
                    if (tile.depleted) tint(160, 160, 160);
                    image(spr, screenX, screenY, TS, TS);
                    noTint();
                } else {
                    fill(tile.depleted ? '#8A9E8A' : '#558B2F');
                    rect(screenX + 3, screenY + 6, 1, 8);
                    rect(screenX + 7, screenY + 4, 1, 10);
                    rect(screenX + 11, screenY + 7, 1, 6);
                    rect(screenX + 13, screenY + 5, 1, 9);
                }
                break;
            }
            case 'bird_poop': {
                // Draw grass base first, then bird poop sprite on top
                drawBase('grass');
                const spr = SPRITES['tiles.bird_poop'];
                if (spr) {
                    if (tile.depleted) tint(160, 160, 160);
                    image(spr, screenX, screenY, TS, TS);
                    noTint();
                } else {
                    fill(tile.depleted ? '#B0B0B0' : '#E0E0E0');
                    ellipse(screenX + 8, screenY + 9, 8, 5);
                    fill(tile.depleted ? '#C8C8C8' : '#FFFFFF');
                    ellipse(screenX + 6, screenY + 8, 3, 2);
                }
                break;
            }
            case 'flower': {
                // No sprite yet - draw grass base + fallback flower
                drawBase('grass');
                const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
                fill(tile.depleted ? '#999' : colors[tile.variant]);
                ellipse(screenX + 8, screenY + 8, 6, 6);
                fill(tile.depleted ? '#BBB' : '#FFD93D');
                ellipse(screenX + 8, screenY + 8, 3, 3);
                break;
            }
            case 'tulip': {
                // Draw grass base, then tulip sprite
                drawBase('grass');
                const spr = SPRITES['tiles.tulip'];
                if (spr) {
                    if (tile.depleted) tint(160, 160, 160);
                    image(spr, screenX, screenY, TS, TS);
                    noTint();
                } else {
                    fill(tile.depleted ? '#8A9E8A' : '#558B2F');
                    rect(screenX + 7, screenY + 6, 2, 8);
                    const tcolors = ['#E53935', '#F5F5F5'];
                    fill(tile.depleted ? '#AAA' : tcolors[tile.variant || 0]);
                    ellipse(screenX + 8, screenY + 5, 6, 5);
                }
                break;
            }
            case 'rosebush': {
                // 32x32 sprite - draw grass base, then rosebush centered extending upward
                drawBase('grass');
                const spr = SPRITES['tiles.rosebush'];
                if (spr) {
                    if (tile.depleted) tint(160, 160, 160);
                    const offsetX = screenX - (spr.width - TS) / 2;
                    const offsetY = screenY - (spr.height - TS);
                    image(spr, offsetX, offsetY);
                    noTint();
                } else {
                    fill(tile.depleted ? '#7A9E7A' : '#2E7D32');
                    ellipse(screenX + 8, screenY + 8, 14, 12);
                    fill(tile.depleted ? '#AAA' : '#E53935');
                    ellipse(screenX + 4, screenY + 6, 3, 3);
                    ellipse(screenX + 12, screenY + 8, 3, 3);
                    ellipse(screenX + 8, screenY + 4, 3, 3);
                }
                break;
            }
            case 'water': {
                // Small pond - draw grass base, then water sprite on top
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
            case 'toast_target': {
                // Toast target - draw beach base, then target sprite or concentric rings
                drawBase('beach');
                const spr = SPRITES['tiles.toast_target'];
                if (spr) {
                    image(spr, screenX, screenY, TS, TS);
                } else {
                    // Fallback: beach + target rings
                    fill('#FFFFFF');
                    ellipse(screenX + 8, screenY + 8, 14, 14);
                    fill('#E53935');
                    ellipse(screenX + 8, screenY + 8, 10, 10);
                    fill('#FFFFFF');
                    ellipse(screenX + 8, screenY + 8, 6, 6);
                    fill('#E53935');
                    ellipse(screenX + 8, screenY + 8, 3, 3);
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
        // Tree migration: ensure all tree tiles (trunk and top) are solid 2-tall stacks.
        for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
            for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
                const tile = this.tiles[x][y];
                if (!tile) continue;
                if (tile.type === 'tree' && !tile.isTreeTop && tile.solid === undefined) {
                    tile.solid = true;
                    const topY = y - 1;
                    if (topY >= 0 && topY < CONFIG.WORLD_HEIGHT) {
                        const topTile = this.tiles[x][topY];
                        if (topTile && !topTile.isTreeTop) {
                            this.tiles[x][topY] = {
                                type: 'tree',
                                variant: tile.variant || 0,
                                isTreeTop: true,
                                solid: true,
                                depleted: tile.depleted || false,
                                respawnAt: tile.respawnAt || null
                            };
                        } else if (topTile && topTile.isTreeTop) {
                            topTile.solid = true;
                        }
                    }
                }
                // Ensure any existing tree top tile is solid in old saves.
                if (tile.type === 'tree' && tile.isTreeTop) {
                    tile.solid = true;
                }
                // v5 saves may still have removed flower/tulip/water decorations.
                if (tile.type === 'flower' || tile.type === 'tulip' || tile.type === 'water') {
                    this.tiles[x][y] = { type: 'grass', variant: 0 };
                }
            }
        }
    }
}

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

// Island shape: the island is a centered rectangle. Tiles within SEA_MARGIN of the
// world edge are open ocean; the next BEACH_THICKNESS ring is sandy beach; everything
// inside that is grass. "Edge distance" is measured to the nearest world edge, so the
// coastline is a clean rectangle rather than a circle.
//
// The land is a square of side (WORLD_WIDTH - 2*SEA_MARGIN). Dropping SEA_MARGIN from 8
// to 6 grows that side from 84 to 88 tiles — land area 7056 -> 7744, about +9.75% (the
// closest whole-tile step to +10%). The grass interior is unchanged (still starts at
// edge 11), so all of the added land becomes beach: the beach ring thickens from 3 to 5.
const ISLAND = { SEA_MARGIN: 6, BEACH_THICKNESS: 5 };
// Non-beach decorations (trees, rocks, weeds, flowers, bird poop) must keep at
// least this many tiles of clearance from the beach, so they never render across
// the grass/sand seam where the edge tiles can't blend them.
const NONBEACH_BEACH_BUFFER = 10;
// Beach decorations (palms, banana trees) sit within this many tiles of the
// water — the outer edge of the beach — and away from the grass line.
const BEACH_FEATURE_WATER_DIST = 2;
function islandZone(x, y) {
    const edge = Math.min(x, CONFIG.WORLD_WIDTH - 1 - x, y, CONFIG.WORLD_HEIGHT - 1 - y);
    if (edge < ISLAND.SEA_MARGIN) return 'sea';
    if (edge < ISLAND.SEA_MARGIN + ISLAND.BEACH_THICKNESS) return 'beach';
    return 'grass';
}

// True if any tile of `zone` lies within `radius` (Chebyshev) of (x, y).
function isNearZone(x, y, radius, zone) {
    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) continue;
            if (islandZone(nx, ny) === zone) return true;
        }
    }
    return false;
}
function isNearBeach(x, y, radius) { return isNearZone(x, y, radius, 'beach'); }
function isNearSea(x, y, radius)   { return isNearZone(x, y, radius, 'sea'); }

// Sprite registry - holds loaded p5.Image objects, null if not loaded
const SPRITES = {};
const SPRITE_DEFS = {
    'tiles.grass':            'assets/tiles/grass.png',
    'tiles.beach':            'assets/tiles/beach.png',
    'tiles.beach_edge':       'assets/tiles/beach_edge.png',
    'tiles.water':            'assets/tiles/water.png',
    'tiles.banana_tree':      'assets/tiles/banana_tree.png',
    'tiles.palm_tree':        'assets/tiles/palm_tree.png',
    'tiles.tree_trunk_overworld': 'assets/tiles/tree_trunk_overworld.png',
    'tiles.tree_top_basic':   'assets/tiles/tree_top_basic.png',
    'tiles.tree_top_cool':    'assets/tiles/tree_top_cool.png',
    'tiles.tree_top_yeesh':   'assets/tiles/tree_top_yeesh.png',
    // Staged for the not-yet-built underworld/stars zones (see worlds-system memory).
    'tiles.tree_full_underground': 'assets/tiles/tree_full_underground.png',
    'tiles.tree_full_stars':  'assets/tiles/tree_full_stars.png',
    'tiles.grass_cool':       'assets/tiles/grass_cool.png',
    'tiles.grass_yeesh':      'assets/tiles/grass_yeesh.png',
    'tiles.grass_underworld': 'assets/tiles/grass_underworld.png',
    'tiles.grass_stars':      'assets/tiles/grass_stars.png',
    'tiles.sea_overworld':    'assets/tiles/sea_overworld.png',
    'tiles.rock':             'assets/tiles/rock.png',
    'tiles.shiny_rock':       'assets/tiles/shiny_rock.png',
    'tiles.weeds':            'assets/tiles/weeds.png',
    'tiles.bird_poop':        'assets/tiles/bird_poop.png',
    'tiles.rosebush':         'assets/tiles/rosebush.png',
    'tiles.tulip':            'assets/tiles/tulip.png',
    'tiles.bed_blue':         'assets/tiles/bed_blue.png',
    'tiles.bed_orange':       'assets/tiles/bed_orange.png',
    'tiles.bed_red':          'assets/tiles/bed_red.png',
    'tiles.sprout':           'assets/tiles/sprout.png',
    'tiles.soil':             'assets/tiles/soil.png',
    'sprites.player':         'assets/sprites/orb.png',
    'sprites.mubaba':         'assets/sprites/npcs/mubaba.png',
    // Underground building art + fortress scene props — files don't exist yet;
    // the error callback nulls them and colored fallbacks draw instead.
    'sprites.ug_mubaba_fortress': 'assets/sprites/buildings/mubaba_fortress.png',
    'sprites.ug_electric_temple': 'assets/sprites/buildings/electric_temple.png',
    'sprites.magic_circle':       'assets/sprites/effects/magic_circle.png',
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
    'items.protein_shake':    'assets/sprites/protein_shake.png',
    'sprites.shack':          'assets/sprites/shack.png',
    'sprites.house':          'assets/sprites/house.png',
    'sprites.bird':           'assets/sprites/animals/bird.png',
    'sprites.bird2':          'assets/sprites/animals/bird2.png',
    'sprites.crab':           'assets/sprites/animals/crab.png',
    'sprites.butterfly':      'assets/sprites/butterfly.png',
    'sprites.cicada':         'assets/sprites/cicada.png',
    'items.cicada_shell':     'assets/sprites/cicada_shell.png',
    'sprites.hog':            'assets/sprites/hog.png',
    'tiles.poop':             'assets/sprites/poop.png',
    'tiles.waves':            'assets/sprites/waves.png',
    'tiles.pond':             'assets/sprites/pond.png',
    'tiles.dock':             'assets/tiles/dock.png',
};

// Global game state
let gameState = STATE.START;
let player = null;
let world = null;            // the ACTIVE map (one of `maps`)
let maps = {};               // id -> World instance (e.g. 'island', 'underground')
let currentMapId = 'island'; // which map `world` currently points at
let debugMode = false;       // dev overlay + cheats (toggle with backtick `)
let cameraX = 0;
let cameraY = 0;

// UI state
let selectedMenuOption = 1; // Default-highlight "Load" on the start menu

// Movement cooldown for grid-based movement (ms)
let lastMoveTime = 0;
const MOVE_COOLDOWN = 120;

// Active pond-warp fall/bounce sequence (see startPondWarp/updateWarpAnim), or
// null when idle. Blocks movement input while set.
let warpAnim = null;
const startMenuOptions = ['New Game', 'Load Game', 'Settings'];
const settingsMenuOptions = ['Back'];

// Start-screen sub-views: 'main' (top menu) | 'slots' (choose a save slot) |
// 'name' (type a name for a new save).
let startView = 'main';
let startMode = 'new';        // what the slot picker is for: 'new' | 'load'
let slotSelectIndex = 0;      // highlighted row in the slot picker (0..2 = slots, 3 = Back)
let nameEntryText = '';       // current text in the name-entry field
let nameEntrySlot = 0;        // slot being named

let yogatron = null; // temporary holiday visitor for Ab Appreciation Day
const YOGATRON_DAY_INDEX = 7; // 0-based holiday index matching HOLIDAYS order (day 43)
const TILE_SOLID = new Set(['sea', 'water', 'pond_water', 'tree', 'fir_tree', 'banana_tree', 'palm_tree', 'rock', 'shiny_rock', 'rosebush', 'toast_target']);

// Tiles whose sprite is wider/taller than a single tile. These are drawn in a
// deferred pass after all base terrain so the next column's base can't clip the
// sprite's overflow. Maps tile type → sprite key.
const TALL_SPRITE_TILES = {
    tree: 'tiles.tree_trunk_overworld', fir_tree: 'tiles.tree_trunk_overworld',
    banana_tree: 'tiles.banana_tree', palm_tree: 'tiles.palm_tree',
    rosebush: 'tiles.rosebush'
};

// ===== ANIMATED SPRITE STRIPS =====
// Any sprite key listed here is a horizontal strip of `frames` equal cells;
// cell width is image.width / frames, derived per file — so structures of any
// size animate independently and resizing one can never affect another.
// Draw to the sheet spec in SpriteUpdate.txt section 14, then register here.
const ANIMATED_SPRITES = {
    // 'tiles.palm_tree':            { frames: 4, frameMs: 200 },
    // 'sprites.ug_electric_temple': { frames: 2, frameMs: 400 },
    'sprites.ug_mubaba_fortress': { frames: 3, frameMs: 300 },
};

// Current frame of a (possibly animated) structure sprite: {img, sx, w, h}.
// Whole image for stills; cycles by wall clock for registered strips.
function structureFrame(key) {
    const img = SPRITES[key];
    if (!img || !img.width) return null;
    const anim = ANIMATED_SPRITES[key];
    if (!anim) return { img, sx: 0, w: img.width, h: img.height };
    const w = Math.floor(img.width / anim.frames);
    const frame = Math.floor(millis() / (anim.frameMs || 200)) % anim.frames;
    return { img, sx: frame * w, w, h: img.height };
}

// Frame 0 of a sprite as a silhouette/static source: {img, sx, sy, w, h}.
function structureFrame0(key) {
    const img = SPRITES[key];
    if (!img || !img.width) return null;
    const anim = ANIMATED_SPRITES[key];
    const w = anim ? Math.floor(img.width / anim.frames) : img.width;
    return { img, sx: 0, sy: 0, w, h: img.height };
}

// ===== DYNAMIC SUN SHADOWS (overworld) =====
// Fake-but-convincing cast shadows: each caster's sprite is baked once into a
// black silhouette, then stamped flipped/sheared/squashed onto a per-frame
// offscreen layer that's composited in one pass (so overlapping shadows don't
// double-darken). Direction and length track the day clock: long shadows
// pointing west at dawn, a small puddle at solar noon, long east at dusk.
// ponytail: the constants ARE the look — tune them by eye in-browser.
const SHADOW_SUNRISE = 330, SHADOW_SUNSET = 1170; // minutes; matches the dawn/dusk overlay window
const SHADOW_MAX_SHEAR = 2.2;    // sideways lean at dawn/dusk (x object height)
const SHADOW_MIN_STRETCH = 0.22; // shadow drop at noon (x object height)
const SHADOW_MAX_STRETCH = 0.72; // shadow drop at dawn/dusk
const SHADOW_ALPHA = 52;         // layer opacity at full sun

let _shadowLayer = null;
const _shadowSilhouettes = {};

// Where the sun is right now: null when it's down, else { shear, stretch, alpha }.
function sunShadowParams() {
    const t = world.timeMinutes;
    if (t <= SHADOW_SUNRISE || t >= SHADOW_SUNSET) return null;
    const d = ((t - SHADOW_SUNRISE) / (SHADOW_SUNSET - SHADOW_SUNRISE)) * 2 - 1; // -1 dawn .. +1 dusk
    const edge = Math.min(1, (t - SHADOW_SUNRISE) / 45, (SHADOW_SUNSET - t) / 45); // soft in/out
    return {
        // Negated because the stamp shears against the silhouette's upward
        // (negative-y) axis: dawn sun in the east throws shadows west.
        shear: -SHADOW_MAX_SHEAR * d,
        stretch: SHADOW_MIN_STRETCH + (SHADOW_MAX_STRETCH - SHADOW_MIN_STRETCH) * Math.abs(d),
        alpha: SHADOW_ALPHA * edge
    };
}

// Bake (and cache) a pure-black copy of one or more sprite sources stacked at
// a shared top-left origin (how tree trunk + canopy are drawn). Each source is
// {img, sx, sy, w, h} — see structureFrame0() — so animated strips bake only
// their first frame.
function shadowSilhouette(key, sources) {
    if (_shadowSilhouettes[key]) return _shadowSilhouettes[key];
    for (const s of sources) if (!s || !s.img || !s.img.width) return null; // not loaded yet; retry next frame
    const w = Math.max(...sources.map(s => s.w));
    const h = Math.max(...sources.map(s => s.h));
    const g = createGraphics(w, h);
    g.pixelDensity(1);
    for (const s of sources) {
        g.image(s.img, 0, 0, s.w, s.h, s.sx || 0, s.sy || 0, s.w, s.h);
    }
    g.drawingContext.globalCompositeOperation = 'source-in';
    g.noStroke();
    g.fill(0);
    g.rect(0, 0, w, h);
    g.drawingContext.globalCompositeOperation = 'source-over';
    _shadowSilhouettes[key] = g;
    return g;
}

// Stamp one silhouette onto the shadow layer. (footX, footY) is the caster's
// ground-contact point in screen pixels; groundY is that line's y within the
// silhouette image.
function stampShadow(layer, sil, footX, footY, groundY, p) {
    layer.push();
    layer.translate(footX, footY);
    layer.scale(1, -p.stretch);                // flip downward + set length
    layer.applyMatrix(1, 0, p.shear, 1, 0, 0); // lean toward/away from the sun
    layer.image(sil, -sil.width / 2, -groundY);
    layer.pop();
}

// Overworld grass/tree-top swap by season (Sweet & Saucy share the default look).
function seasonalGrassKey() {
    if (world.season === 'Cool') return 'tiles.grass_cool';
    if (world.season === 'Yeesh') return 'tiles.grass_yeesh';
    return 'tiles.grass';
}
function seasonalTreeTopKey() {
    if (world.season === 'Cool') return 'tiles.tree_top_cool';
    if (world.season === 'Yeesh') return 'tiles.tree_top_yeesh';
    return 'tiles.tree_top_basic';
}

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
    pinecone:    { name: 'Pinecone',    category: 'material', maxStack: 99, color: '#8D6E63', desc: 'A woody cone that fell from a fir tree.' },
    fiber:       { name: 'Fiber',       category: 'material', maxStack: 99, color: '#558B2F', desc: 'Long strips of plant fiber that grow from the dirt.' },
    stone:       { name: 'Stone',       category: 'material', maxStack: 99, color: '#9E9E9E', desc: 'A block of stone you chipped off of a boulder.' },
    magnet:      { name: 'Magnet',      category: 'material', maxStack: 99, color: '#607D8B', desc: 'A magic rock you chipped off of a shiny rock.' },
    crystal:     { name: 'Crystal',     category: 'material', maxStack: 99, color: '#B98DFF', desc: 'A magic rock you chipped off of a shiny rock.' },
    seed:        { name: 'Seed',        category: 'material', maxStack: 99, color: '#8BC34A', desc: 'A generic seed for planting.' },
    rose_seed:   { name: 'Rose Seed',   category: 'material', maxStack: 99, color: '#E53935', desc: 'A red rose seed.' },
    tulip_bulb:  { name: 'Tulip Bulb',  category: 'material', maxStack: 99, color: '#F5F5F5', desc: 'A white tulip bulb.' },
    bird_poop:   { name: 'Bird Poop',   category: 'material', maxStack: 99, color: '#E0E0E0', desc: 'May contain seeds.' },
    rose:        { name: 'Rose',        category: 'gift',     maxStack: 99, color: '#E53935', desc: 'A freshly picked red rose.' },
    tulip:       { name: 'Tulip',       category: 'gift',     maxStack: 99, color: '#F5F5F5', desc: 'A freshly picked tulip.' },
    thatch:      { name: 'Thatch',      category: 'block',    maxStack: 99, color: '#D4A76A', desc: 'Building material.' },
    banana:      { name: 'Banana',      category: 'gift',     maxStack: 99, color: '#FFD93D', desc: 'Tasty beach fruit.' },
    palm_frond:  { name: 'Palm Frond',  category: 'material', maxStack: 99, color: '#4CAF50', desc: 'A broad leaf from a palm tree.' },
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
    // Mubaba's World Domination quest (see Mubabas Quests.txt). Stardew is
    // bottled in the Stars world (once it exists); IOUs await the economy.
    stardew:     { name: 'Bottle of Stardew', category: 'treasure', maxStack: 9, color: '#9FD8FF', desc: 'Dew gathered from star grass at dawn. Faintly humming.' },
    iou:         { name: 'IOU',         category: 'treasure', maxStack: 99, color: '#F5F0DC', desc: 'A promise of future payment. Legally binding? Unclear.' },
    feather:     { name: 'Feather',     category: 'material', maxStack: 99, color: '#F5F5F5', desc: 'A soft feather left behind by a bird.' },
    seashell:    { name: 'Seashell',    category: 'gift',     maxStack: 20, color: '#FFE4E1', desc: 'A polished shell from a grateful crab.' },
    turtle_egg:  { name: 'Turtle Egg',  category: 'gift',     maxStack: 10, color: '#E8DCC5', desc: 'A smooth, patterned egg left behind by a nesting sea turtle.' },
    stale_toast: { name: 'Stale Toast', category: 'tool',     maxStack: 10, color: '#D2B48C', desc: 'A hardened piece of toast perfect for throwing at targets.' },
    protein_shake: { name: 'Protein Shake', category: 'gift', maxStack: 20, color: '#E1C699', desc: 'A creamy shake from Yogatron. Tastes like encouragement and biceps.' },
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

    // Outdoor placeable — equip and click an open area outside to build a neighbor's shack
    neighbor_shack: { name: "Neighbor's Shack", category: 'block', maxStack: 1, color: '#8B6914', desc: 'A cozy little shack for a neighbor. Place it outside on open ground.', outdoor: { type: 'shack' } },

    // Trees scooped up by the Tree Move magic trick (magic.js). Equip and click
    // open ground to replant via World.placeTree (grass or beach per type).
    potted_tree:        { name: 'Potted Tree',        category: 'block', maxStack: 10, color: '#2E7D32', desc: 'A whole tree, magically to-go. Replant on open grass.', outdoor: { tree: 'tree' } },
    potted_fir_tree:    { name: 'Potted Fir',         category: 'block', maxStack: 10, color: '#1B5E20', desc: 'A fir tree in a very big pot. Replant on open grass.', outdoor: { tree: 'fir_tree' } },
    potted_banana_tree: { name: 'Potted Banana Tree', category: 'block', maxStack: 10, color: '#F9A825', desc: 'A banana tree, roots and all. Replant on open beach.', outdoor: { tree: 'banana_tree' } },
    potted_palm_tree:   { name: 'Potted Palm',        category: 'block', maxStack: 10, color: '#66BB6A', desc: 'A palm tree to-go. Replant on open beach.', outdoor: { tree: 'palm_tree' } },
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
    house: { spriteKey: 'sprites.house', name: 'House', w: 4, h: 4 },   // 64x64 sprite
    // --- Underground city buildings (PLACEHOLDERS) ---
    // No sprites yet: Building.draw falls back to a colored block tinted by
    // `color`. Same footprint/interior as the shack. Rename/reskin later.
    ug_mubaba_fortress: { spriteKey: 'sprites.ug_mubaba_fortress', name: "Mubaba's Fortress",   color: '#4A0D67', w: 8, h: 8, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_gettin:          { spriteKey: 'sprites.ug_gettin',          name: "Gettin' Place",       color: '#5A7E9B', w: 6, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_recycle_bin:     { spriteKey: 'sprites.ug_recycle_bin',     name: 'Recycle Bin',         color: '#4C8A4C', w: 6, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_inner_temple:    { spriteKey: 'sprites.ug_inner_temple',    name: 'The Inner Temple',    color: '#8B8B9B', w: 6, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_electric_temple: { spriteKey: 'sprites.ug_electric_temple', name: 'The Electric Temple', color: '#C9B23A', w: 6, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_black_goddess:   { spriteKey: 'sprites.ug_black_goddess',   name: 'The Black Goddess',   color: '#26202B', w: 6, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_stimmy_tims:     { spriteKey: 'sprites.ug_stimmy_tims',     name: "Stimmy Tim's",        color: '#B3574D', w: 6, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_bottomless_pit:  { spriteKey: 'sprites.ug_bottomless_pit',  name: 'A Bottomless Pit',    color: '#111111', w: 6, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 }
};

// The eight underground building identities (see underWorldBldgs.rtf).
const UNDERGROUND_BUILDING_TYPES = ['ug_mubaba_fortress', 'ug_gettin', 'ug_recycle_bin', 'ug_inner_temple', 'ug_electric_temple', 'ug_black_goddess', 'ug_stimmy_tims', 'ug_bottomless_pit'];
// Fixed at city creation — randomization retired. The two designed buildings
// stand now for verification; Charles's planned starter set (Mubaba's /
// Recycle Bin / Stimmy Tim's, in a set order) replaces this list later.
const UNDERGROUND_STARTING_BUILDINGS = [
    { type: 'ug_mubaba_fortress', padIndex: 1 },
    { type: 'ug_electric_temple', padIndex: 2 }
];

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
                } else if (x === 0 && y === INTERIOR_WALL_HEIGHT && !String(this.type).startsWith('ug_')) {
                    // Bed on the left, against the back wall (homes only — the
                    // underground establishments don't sleep)
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
        const f = structureFrame(this.spriteKey);
        const screenX = this.gridX * CONFIG.TILE_SIZE - cameraX;
        const screenY = this.gridY * CONFIG.TILE_SIZE - cameraY;
        if (f) {
            image(f.img, screenX, screenY, f.w, f.h, f.sx, 0, f.w, f.h);
        } else {
            // Fallback: a colored block (tier `color`, else brown) with a doorway
            // and a name label so placeholder buildings are distinguishable.
            const def = BUILDING_TIERS[this.type] || {};
            const ts = this.tileSize;
            const w = ts.w * CONFIG.TILE_SIZE, h = ts.h * CONFIG.TILE_SIZE;
            noStroke();
            fill(def.color || '#8B4513');
            rect(screenX, screenY, w, h);
            // Roof band + dark doorway at bottom-center.
            fill(0, 0, 0, 40);
            rect(screenX, screenY, w, CONFIG.TILE_SIZE);
            fill('#241C16');
            const doorTiles = (def.doorWidth || 1) * CONFIG.TILE_SIZE;
            rect(screenX + (w - doorTiles) / 2, screenY + h - CONFIG.TILE_SIZE * 1.5, doorTiles, CONFIG.TILE_SIZE * 1.5);
            if (def.name) {
                fill(255);
                textSize(8);
                textAlign(CENTER, CENTER);
                text(def.name, screenX + w / 2, screenY + h / 2 - 4);
                textAlign(LEFT, BASELINE);
            }
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
    // Trees, rocks and shiny rocks each provide ONE randomly chosen drop per day,
    // with a random quantity of 1-3 of that item (pickOne + randomQty). The drop's
    // `chance` acts as a relative weight for which item is selected.
    tree:        { drops: [{id:'log', chance:1.0}, {id:'berry', chance:1.0}, {id:'stick', chance:0.5}], pickOne: true, randomQty: true, respawnHours: 12, tool: null, name: 'Oak Tree' },
    fir_tree:    { drops: [{id:'log', chance:1.0}, {id:'pinecone', chance:1.0}], pickOne: true, randomQty: true, respawnHours: 12, tool: null, name: 'Fir Tree' },
    // Beach-only trees, same daily pickOne + 1-3 quantity rules.
    banana_tree: { drops: [{id:'banana', chance:1.0}], pickOne: true, randomQty: true, respawnHours: 12, tool: null, name: 'Banana Tree' },
    palm_tree:   { drops: [{id:'fiber', chance:1.0}, {id:'palm_frond', chance:1.0}], pickOne: true, randomQty: true, respawnHours: 12, tool: null, name: 'Palm Tree' },
    rock:        { drops: [{id:'stone', chance:1.0}], pickOne: true, randomQty: true, respawnHours: 24, tool: null, name: 'Rock' },
    shiny_rock:  { drops: [{id:'stone', chance:1.0}, {id:'magnet', chance:0.8}, {id:'crystal', chance:0.4}], pickOne: true, randomQty: true, respawnHours: 24, tool: null, name: 'Shiny Rock' },
    weeds:       { drops: [{id:'fiber', count:2, chance:1.0}, {id:'bean', count:1, chance:0.3}], respawnHours: 6,  tool: null, name: 'Tall Grass' },
    // Bird poop gives exactly 1 of a single randomly chosen seed type, then disappears.
    bird_poop:   { drops: [{id:'seed', chance:1.0}, {id:'rose_seed', chance:1.0}, {id:'tulip_bulb', chance:1.0}], pickOne: true, disappears: true, name: 'Bird Poop' },
    // Rosebushes and tulips are destructible pickups: harvest yields 1 rose/tulip and removes the plant.
    rosebush:    { drops: [{id:'rose', count:1, chance:1.0}], pickOne: true, disappears: true, name: 'Rose Bush' },
    tulip:       { drops: [{id:'tulip', count:1, chance:1.0}], pickOne: true, disappears: true, name: 'Tulip' },
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
    textSize(10);
    textFont('Courier New');
    textAlign(LEFT, CENTER);
    for (const n of notifications) {
        const alpha = n.life < 500 ? map(n.life, 0, 500, 0, 255) : 255;
        noStroke();
        fill(0, 0, 0, alpha * 0.7);
        const tw = textWidth(n.text) + 10;
        rect(8, n.y, tw, 12);
        fill(255, 255, 200, alpha);
        text(n.text, 13, n.y + 6);
    }
}

// DEV TOGGLE: while iterating on art, leave this true so every image is
// re-fetched on each page load (a fresh timestamp per load defeats the cache).
// Set it to false for release so sprites cache normally — and then bump
// ASSET_VERSION whenever you change art.
const DEV_REFRESH_ASSETS = true;
// Cache-buster appended to every image URL in preload(). With the dev toggle on
// it's unique per load; off, it's the fixed version string below.
const ASSET_VERSION = DEV_REFRESH_ASSETS ? String(Date.now()) : '20260705';

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
    // Install dialogue overrides now that every script (incl. dialogue.js) has loaded.
    installYogatronDialogueHooks();

    const canvas = createCanvas(CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    canvas.parent('game-container');
    pixelDensity(1);
    noSmooth();

    // Initialize world (the island is the starting map)
    world = new World('island', 'island');
    maps = { island: world };
    currentMapId = 'island';

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
            // States added by other modules (dialogue, minigame, shackPicker)
            if (gameState === 'dialogue') {
                // Dialogue can happen inside a building (Electric Temple) or in
                // Mubaba's fortress scene, which paints over the backdrop.
                if (insideBuilding) drawInterior(); else drawGame();
                if (typeof drawFortressScene === 'function') drawFortressScene();
                drawDialogueScreen();
            } else if (gameState === 'minigame') {
                drawGame();
                drawMinigame();
            } else if (gameState === 'shackPicker') {
                drawGame();
                drawShackPicker();
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
    if (gameState !== STATE.PLAYING || !player || warpAnim) return;
    
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
        // Stepping onto a portal tile carries the player to another map.
        checkPortalUnderfoot();
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
        // Taira blocks her spot in the Electric Temple
        if (b.type === 'ug_electric_temple' && newX === TEMPLE_TAIRA_POS.x && newY === TEMPLE_TAIRA_POS.y) {
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
    updateWarpAnim();

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

    // Toast Toss projectile (flies above the player)
    updateToastProjectile(deltaTime);
    drawToastProjectile();

    // Backflip Day animation timers
    updateBackflips(deltaTime);

    // Redraw tree canopy the player is standing under so foliage occludes
    // them (see World.drawTreeCanopyOverPlayer()).
    if (world) world.drawTreeCanopyOverPlayer();

    // Day/night overlay
    drawDayNightOverlay();

    // Draw UI
    drawUI();

    // Draw notifications on top
    drawNotifications();

    // Debug overlay (coords, time, hotkeys)
    drawDebugOverlay();

    // ===== YOGATRON: Ab Appreciation Day visitor =====
    updateYogatron(deltaTime);
    drawYogatron();

    // Update entities
    if (typeof updateEntities === 'function') updateEntities(deltaTime);
    if (typeof updateAnimals === 'function') updateAnimals(deltaTime);
    if (typeof updateHog === 'function') updateHog(deltaTime);
    if (typeof checkAnimalSunEvents === 'function') checkAnimalSunEvents();
    if (typeof updateDialogue === 'function') updateDialogue(deltaTime);
    if (typeof updateMinigame === 'function' && gameState === 'minigame') updateMinigame(deltaTime);

    // Auto-save
    if (typeof autoSave === 'function') autoSave();
}

// ===== YOGATRON (Ab Appreciation Day) =====
function spawnYogatron() {
    if (yogatron && yogatron.isPresent) return;
    if (typeof world === 'undefined' || !world) return;
    const holiday = getCurrentHoliday();
    if (!holiday || holiday.name !== 'Ab Appreciation Day') return;

    // Find a clear tile near the player on grass.
    let sx = player ? player.x : 50;
    let sy = player ? player.y : 50;
    let bestX = -1, bestY = -1;
    for (let r = 2; r <= 8; r++) {
        for (let a = 0; a < 8; a++) {
            const rad = a * PI / 4;
            const tx = Math.round(sx + r * Math.cos(rad));
            const ty = Math.round(sy + r * Math.sin(rad));
            if (tx < 1 || tx >= CONFIG.WORLD_WIDTH - 1 || ty < 1 || ty >= CONFIG.WORLD_HEIGHT - 1) continue;
            if (!world.tiles[tx] || !world.tiles[tx][ty]) continue;
            if (world.tiles[tx][ty].type !== 'grass') continue;
            if (isSolidTile(tx, ty)) continue;
            if (buildingAt(tx, ty)) continue;
            if (typeof npcAt === 'function' && npcAt(tx, ty)) continue;
            bestX = tx; bestY = ty;
            break;
        }
        if (bestX >= 0) break;
    }
    if (bestX < 0) { bestX = sx; bestY = sy; }

    yogatron = {
        name: 'Yogatron',
        species: 'Fitness Robot',
        color: '#FF6F00',
        gridX: bestX,
        gridY: bestY,
        facing: 'down',
        isPresent: true,
        gaveShake: false,
        animFrame: 0,
        lastMoveAt: 0,
        dialogue: {
            start: {
                text: 'Greetings, flex-friend! I am Yogatron, and today we celebrate the mighty abdominal. Have you stretched yet?',
                choices: [
                    { text: 'I want a protein shake!', next: 'shake', friendshipDelta: 0 },
                    { text: 'How do I celebrate this holiday?', next: 'about', friendshipDelta: 0 },
                    { text: 'Maybe later.', next: null, friendshipDelta: 0 }
                ]
            },
            shake: {
                text: '',
                choices: [
                    { text: 'Thanks!', next: null, friendshipDelta: 1 }
                ]
            },
            about: {
                text: 'On Ab Appreciation Day, every crunch counts! Do a little stretch, strike a heroic pose, and remember: your core is your friend.',
                choices: [
                    { text: 'I will flex with purpose.', next: 'shake', friendshipDelta: 1 },
                    { text: 'I need that shake now.', next: 'shake', friendshipDelta: 0 },
                    { text: 'Goodbye!', next: null, friendshipDelta: 0 }
                ]
            }
        }
    };
    // The 'shake' node text is set when the player chooses it so it can reflect whether
    // they have already received one today.
    notify('Yogatron has arrived for Ab Appreciation Day!', 4000);
}

function despawnYogatron() {
    if (!yogatron) return;
    yogatron.isPresent = false;
    yogatron = null;
}

function updateYogatron(dt) {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    // If it's not the day, make sure Yogatron is gone.
    if (!holiday || holiday.name !== 'Ab Appreciation Day') {
        if (yogatron && yogatron.isPresent) despawnYogatron();
        return;
    }
    // If the holiday is active but no Yogatron yet, spawn him.
    if (!yogatron || !yogatron.isPresent) {
        spawnYogatron();
    }
    if (!yogatron || !dt) return;

    // Gentle wander.
    if (Math.random() < 0.005) {
        const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
        const d = dirs[Math.floor(Math.random()*4)];
        const nx = yogatron.gridX + d[0];
        const ny = yogatron.gridY + d[1];
        if (nx >= 0 && nx < CONFIG.WORLD_WIDTH && ny >= 0 && ny < CONFIG.WORLD_HEIGHT) {
            if (!isSolidTile(nx, ny) && !buildingAt(nx, ny) && !(typeof npcAt === 'function' && npcAt(nx, ny))) {
                yogatron.gridX = nx;
                yogatron.gridY = ny;
                yogatron.facing = d[0] > 0 ? 'right' : d[0] < 0 ? 'left' : d[1] > 0 ? 'down' : 'up';
                yogatron.lastMoveAt = millis();
            }
        }
    }
}

function drawYogatron() {
    if (!yogatron || !yogatron.isPresent) return;
    const sx = yogatron.gridX * CONFIG.TILE_SIZE - cameraX;
    const sy = yogatron.gridY * CONFIG.TILE_SIZE - cameraY;
    const TS = CONFIG.TILE_SIZE;
    // Animated bob for that cheerful fitness vibe.
    const moving = (millis() - (yogatron.lastMoveAt || 0)) < 300;
    const bob = moving ? BOB_PATTERN[Math.floor(millis() / WALK_FRAME_MS) % BOB_PATTERN.length] : 0;
    // Draw a friendly orange robot-ish sprite (fallback).
    const spriteKey = 'sprites.yogatron';
    const spr = SPRITES[spriteKey] || null;
    if (!drawCharacterSprite(spr, sx, sy - TS + bob, yogatron.facing, moving)) {
        fill('#FF6F00');
        noStroke();
        rect(sx, sy - TS + bob, TS, TS * 2);
        fill('#FFFFFF');
        rect(sx + 3, sy - TS + 4 + bob, 3, 3);
        rect(sx + 10, sy - TS + 4 + bob, 3, 3);
        // A tiny flexed arm.
        fill('#FFB74D');
        rect(sx - 2, sy - TS + 10 + bob, 2, 6);
        rect(sx + TS, sy - TS + 10 + bob, 2, 6);
    }
    // Name tag
    const halfW = CONFIG.CANVAS_WIDTH / 2;
    const halfH = CONFIG.CANVAS_HEIGHT / 2;
    if (Math.abs(sx - halfW) < halfW && Math.abs(sy - halfH) < halfH) {
        fill(0, 0, 0, 150);
        textAlign(CENTER, BOTTOM);
        textSize(7);
        textFont('Courier New');
        const nw = textWidth('Yogatron') + 4;
        rect(sx + TS / 2 - nw / 2, sy - TS - 12, nw, 9);
        fill(255);
        text('Yogatron', sx + TS / 2, sy - TS - 3);
    }
}

function isFacingYogatron() {
    if (!yogatron || !yogatron.isPresent || !player) return false;
    const facing = player.getFacingTile();
    if (!facing) return false;
    return (facing.x === yogatron.gridX && facing.y === yogatron.gridY) ||
           (facing.x === yogatron.gridX && facing.y === yogatron.gridY - 1);
}

function tryTalkToYogatron() {
    if (!yogatron || !yogatron.isPresent) return false;
    if (!isFacingYogatron()) return false;
    openYogatronDialogue();
    return true;
}

function openYogatronDialogue() {
    if (!yogatron || !yogatron.isPresent) return;
    // Clone the dialogue tree so mutations don't persist across conversations.
    const tree = JSON.parse(JSON.stringify(yogatron.dialogue));
    // Shake node: give one protein shake per visit/day.
    if (!yogatron.gaveShake) {
        tree.shake.text = 'One shake, coming right up! *blender noises* Drink deep and flex proud!';
        tree.shake.choices = [
            { text: 'Thanks!', next: null, friendshipDelta: 1, action: 'shake' }
        ];
    } else {
        tree.shake.text = 'I already handed you today\'s shake, friend. One per abdominal day is the rule!';
        tree.shake.choices = [
            { text: 'Fair enough.', next: null, friendshipDelta: 0 }
        ];
    }

    dialogueState.active = true;
    dialogueState.npc = yogatron;
    dialogueState.currentNode = 'start';
    dialogueState.textRevealed = 0;
    dialogueState.selectedChoice = 0;
    dialogueState.choicesVisible = false;
    dialogueState.advancedMenu = false;
    dialogueState._yogatronTree = tree;
    gameState = STATE.DIALOGUE;
}

// ===== Yogatron dialogue overrides =====
// These wrap functions defined in dialogue.js. dialogue.js loads AFTER game.js, so we
// must NOT touch those identifiers at game.js load time (doing so throws a ReferenceError
// that halts the rest of this file). Instead we capture the originals and install the
// wrappers from setup(), which runs once every script has finished loading.
let _originalGetDialogueTree = null;
let _originalSelectDialogueChoice = null;
let _originalCloseDialogue = null;
let _yogatronHooksInstalled = false;

function installYogatronDialogueHooks() {
    if (_yogatronHooksInstalled) return;
    if (typeof getDialogueTree !== 'function' || typeof selectDialogueChoice !== 'function' || typeof closeDialogue !== 'function') return;
    _yogatronHooksInstalled = true;

    _originalGetDialogueTree = getDialogueTree;
    getDialogueTree = function() {
        if (dialogueState.npc && dialogueState.npc.name === 'Yogatron') {
            return dialogueState._yogatronTree;
        }
        return _originalGetDialogueTree();
    };

    // ===== OVERRIDE selectDialogueChoice for Yogatron shake action =====
    // Note: dialogue.js defines selectDialogueChoice. game.js installs this wrapper
    // from setup() after all scripts have loaded (see installYogatronDialogueHooks).
    _originalSelectDialogueChoice = selectDialogueChoice;
    selectDialogueChoice = _yogatronSelectDialogueChoice;
    _originalCloseDialogue = closeDialogue;
    closeDialogue = function() {
        if (dialogueState.npc && dialogueState.npc.name === 'Yogatron') {
            dialogueState._yogatronTree = null;
        }
        _originalCloseDialogue();
    };
}

function _yogatronSelectDialogueChoice(i) {
    const npc = dialogueState.npc;
    if (npc && npc.name === 'Yogatron') {
        const tree = dialogueState._yogatronTree;
        const node = tree ? tree[dialogueState.currentNode] : null;
        if (!node || !node.choices[i]) return;
        const choice = node.choices[i];
        if (choice.action === 'shake' && !npc.gaveShake && typeof inventory !== 'undefined') {
            inventory.addItem('protein_shake', 1);
            npc.gaveShake = true;
            notify('Yogatron gave you a Protein Shake!');
        }
        if (choice.next === null) {
            closeDialogue();
        } else {
            // If going back to shake after about, re-evaluate text based on gaveShake.
            if (choice.next === 'shake') {
                if (!npc.gaveShake) {
                    tree.shake.text = 'One shake, coming right up! *blender noises* Drink deep and flex proud!';
                    tree.shake.choices = [
                        { text: 'Thanks!', next: null, friendshipDelta: 1, action: 'shake' }
                    ];
                } else {
                    tree.shake.text = 'I already handed you today\'s shake, friend. One per abdominal day is the rule!';
                    tree.shake.choices = [
                        { text: 'Fair enough.', next: null, friendshipDelta: 0 }
                    ];
                }
            }
            dialogueState.currentNode = choice.next;
            dialogueState.textRevealed = 0;
            dialogueState.selectedChoice = 0;
            dialogueState.choicesVisible = false;
        }
        return;
    }
    _originalSelectDialogueChoice(i);
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

// Which on-screen hotbar slot is under the mouse (0-7), or -1. Uses the same
// geometry as drawHotbar so clicking the bar selects a slot on any screen.
function getHotbarSlotAtMouse() {
    const slotSize = 20;
    const gap = 2;
    const totalW = 8 * slotSize + 7 * gap;
    const startX = (width - totalW) / 2;
    const y = height - slotSize - 4;
    if (mouseY < y || mouseY >= y + slotSize) return -1;
    for (let i = 0; i < 8; i++) {
        const x = startX + i * (slotSize + gap);
        if (mouseX >= x && mouseX < x + slotSize) return i;
    }
    return -1;
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
        // Draw a single (animated) frame, aspect-correct, centered in the box.
        // Works for both a 16x32 still and a multi-frame horizontal strip.
        const cols = Math.max(1, Math.floor(pSpr.width / CHAR_FW));
        const frame = Math.floor(millis() / WALK_FRAME_MS) % cols;
        const boxW = portraitSize - 4, boxH = portraitSize - 4;
        const scale = Math.min(boxW / CHAR_FW, boxH / CHAR_FH);
        const dw = CHAR_FW * scale, dh = CHAR_FH * scale;
        const ox = px + 2 + (boxW - dw) / 2, oy = py + 2 + (boxH - dh) / 2;
        image(pSpr, ox, oy, dw, dh, frame * CHAR_FW, 0, CHAR_FW, CHAR_FH);
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

    fill('#82B1FF');
    textSize(9);
    text('▶ Music Volume: ' + Math.round(audioManager.musicVolume * 100) + '% (click to cycle)', x, y + 86);
    text('▶ SFX Volume: ' + Math.round(audioManager.sfxVolume * 100) + '% (click to cycle)', x, y + 98);
    fill(audioManager.muted ? '#FF8A80' : '#82B1FF');
    text('▶ Mute: ' + (audioManager.muted ? 'ON' : 'OFF'), x, y + 110);

    // Debug Mode toggle (also togglable with the backtick key).
    fill(debugMode ? '#7CFC8A' : '#9E9E9E');
    textSize(9);
    text((debugMode ? '■' : '□') + ' Debug Mode: ' + (debugMode ? 'ON' : 'OFF'), x, y + 130);
    fill(120);
    textSize(7);
    text('(cheats + coord overlay; key: `)', x, y + 142);

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

    // Each category section spans: label (12) + 2 rows of slots + 6px spacing.
    // This must match the stride used in drawInventoryTab, which advances
    // sectionY by catY(+12 label) + 2 rows + 6 between sections.
    const catSectionH = 12 + 2 * (slotSize + gap) + 6;
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
    // ===== SHACK PICKER =====
    if (gameState === 'shackPicker' && shackPicker) {
        const nbrs = shackPicker.neighbors;
        const rowH = 24;
        const panelW = 220;
        const panelH = 32 + nbrs.length * rowH + 28;
        const px = (width - panelW) / 2;
        const py = (height - panelH) / 2;
        // Check row clicks.
        for (let i = 0; i < nbrs.length; i++) {
            const ry = py + 32 + i * rowH;
            if (mouseX >= px + 6 && mouseX < px + panelW - 6 && mouseY >= ry && mouseY < ry + rowH - 2) {
                if (shackPicker.selected === i) {
                    confirmShackPicker();
                } else {
                    shackPicker.selected = i;
                }
                return;
            }
        }
        // Confirm button area.
        if (mouseY >= py + panelH - 26 && mouseY < py + panelH - 2 &&
            mouseX >= px && mouseX < px + panelW) {
            confirmShackPicker();
            return;
        }
        // Click outside panel = cancel.
        if (mouseX < px || mouseX > px + panelW || mouseY < py || mouseY > py + panelH) {
            cancelShackPicker();
        }
        return;
    }

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
        // Clicking the on-screen hotbar selects that slot (universal).
        const hb = getHotbarSlotAtMouse();
        if (hb >= 0) { hotbarSlot = hb; return; }
        // Debug: click anywhere else to teleport the player there.
        if (debugMode) {
            const TS = CONFIG.TILE_SIZE;
            debugTeleport(Math.floor((mouseX + cameraX) / TS), Math.floor((mouseY + cameraY) / TS));
            return;
        }
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
        // Yogatron holiday interaction (before harvest)
        if (typeof tryTalkToYogatron === 'function' && tryTalkToYogatron()) return;
        // Toast Toss interaction (only on holiday)
        if (typeof tryToastToss === 'function' && tryToastToss()) return;
        // Garden Day: till facing grass with hoe (swallows if tilled)
        if (typeof tryTillSoil === 'function' && tryTillSoil()) return;
        // Place an outdoor item (neighbor's shack, potted tree) on open ground.
        {
            const active = inventory.getActiveItem();
            if (active && ITEMS[active.id] && ITEMS[active.id].outdoor) {
                const outdoor = ITEMS[active.id].outdoor;
                const TS = CONFIG.TILE_SIZE;
                const tx = Math.floor((mouseX + cameraX) / TS);
                const ty = Math.floor((mouseY + cameraY) / TS);
                if (outdoor.tree) {
                    if (tryPlaceMovedTree(tx, ty, outdoor.tree, active.id)) return;
                } else if (tryPlaceNeighborShack(tx, ty, outdoor.type)) return;
            }
        }
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
        // Clicking the on-screen hotbar selects that slot (universal).
        const hb = getHotbarSlotAtMouse();
        if (hb >= 0) { hotbarSlot = hb; return; }
        const it = getInteriorTileAtMouse();
        // Electric Temple: clicking Taira (body or head tile) talks to her.
        if (it && insideBuilding && insideBuilding.type === 'ug_electric_temple' &&
            it.x === TEMPLE_TAIRA_POS.x && (it.y === TEMPLE_TAIRA_POS.y || it.y === TEMPLE_TAIRA_POS.y - 1)) {
            const t = templeTaira();
            if (t && typeof openDialogue === 'function') { openDialogue(t); return; }
        }
        // Furniture/decoration placement & pickup on the clicked interior tile.
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

        // --- Inventory tab: click-to-swap (works into the hotbar too) ---
        if (menuTab === 0) {
            const slot = getSlotAtMouse();
            if (slot >= 0) {
                if (mouseSelectedSlot === null) {
                    // Nothing picked up yet: clicking the hotbar selects it as
                    // active; clicking a category slot picks it up to move.
                    if (slot < INV_HOTBAR_SIZE) {
                        hotbarSlot = slot;
                        invSelectedSlot = slot;
                    } else {
                        mouseSelectedSlot = slot;
                        invSelectedSlot = slot;
                    }
                } else if (mouseSelectedSlot === slot) {
                    // Clicked the same slot again: cancel the pickup.
                    mouseSelectedSlot = null;
                } else {
                    // Pending pickup: move/swap into the clicked slot — including
                    // a hotbar slot, so crafted items can be equipped by clicking.
                    inventory.swapSlots(mouseSelectedSlot, slot);
                    const movedName = inventory.slots[slot] ? ITEMS[inventory.slots[slot].id].name : 'item';
                    notify(slot < INV_HOTBAR_SIZE
                        ? 'Moved ' + movedName + ' to hotbar slot ' + (slot + 1)
                        : 'Swapped: ' + movedName);
                    if (slot < INV_HOTBAR_SIZE) hotbarSlot = slot;
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
            // Audio rows at y + 86 / 98 / 110. Volume rows cycle 0→25→50→75→100→0.
            const cycleVol = v => (Math.round(v * 4) + 1) % 5 / 4;
            const musY = contentY + 86;
            if (mouseY >= musY - 4 && mouseY < musY + 11 &&
                mouseX >= sx && mouseX < sx + 220) {
                audioManager.setMusicVolume(cycleVol(audioManager.musicVolume));
                return;
            }
            const sfxY = contentY + 98;
            if (mouseY >= sfxY - 4 && mouseY < sfxY + 11 &&
                mouseX >= sx && mouseX < sx + 220) {
                audioManager.setSFXVolume(cycleVol(audioManager.sfxVolume));
                audioManager.playSFX('chirp'); // preview the new level
                return;
            }
            const muteY = contentY + 110;
            if (mouseY >= muteY - 4 && mouseY < muteY + 11 &&
                mouseX >= sx && mouseX < sx + 200) {
                audioManager.toggleMute();
                return;
            }
            // "Debug Mode" toggle row at y + 130
            const dbgY = contentY + 130;
            if (mouseY >= dbgY - 4 && mouseY < dbgY + 11 &&
                mouseX >= sx && mouseX < sx + 200) {
                toggleDebugMode();
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

    // Mubaba's Fortress has no walkable interior: the door opens straight into
    // an audience with Mubaba (black scene, magic circle — see magic.js).
    if (b.type === 'ug_mubaba_fortress' && typeof enterMubabaFortress === 'function') {
        enterMubabaFortress();
        return true;
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

// ===== THE ELECTRIC TEMPLE =====
// A single room holding Taira, the mac. The back wall will eventually be
// MarcOS (future NPC) who opens the portal to the Stars world.
// ponytail: transient NPC instance — temple friendship doesn't persist across
// reloads; merge with the island roster record if that ever matters.
const TEMPLE_TAIRA_ID = 14; // NPC_DEFS index for Taira
const TEMPLE_TAIRA_POS = { x: 3, y: INTERIOR_WALL_HEIGHT }; // back-center of the room
let _templeTaira = null;
function templeTaira() {
    if (!_templeTaira && typeof NPC !== 'undefined') {
        _templeTaira = new NPC(NPC_DEFS[TEMPLE_TAIRA_ID], TEMPLE_TAIRA_ID);
    }
    return _templeTaira;
}

function tryTalkToTempleTaira() {
    if (!insideBuilding || insideBuilding.type !== 'ug_electric_temple') return false;
    let dx = 0, dy = 0;
    if (player.facing === 'up') dy = -1;
    else if (player.facing === 'down') dy = 1;
    else if (player.facing === 'left') dx = -1;
    else dx = 1;
    if (player.x + dx !== TEMPLE_TAIRA_POS.x || player.y + dy !== TEMPLE_TAIRA_POS.y) return false;
    const t = templeTaira();
    if (t && typeof openDialogue === 'function') { openDialogue(t); return true; }
    return false;
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

// ===== WORLDS (multiple maps) =====
// The whole game runs off a single active map (`world`). To support several
// large locations we keep N World instances in `maps` and swap which one is
// active. Per-map entities (buildings, NPCs, animals, hog) live in shared
// globals while their map is active; on travel we "park" the active map's
// entities onto its World instance and load the destination's.
//
// Each entry: [getter, setter, freshValue]. Getters/setters reference the
// shared cross-file globals so parking/loading just moves array references.
const MAP_ENTITY_FIELDS = [
    ['buildings',    () => buildings,    v => { buildings = v; },    () => []],
    ['npcs',         () => npcs,         v => { npcs = v; },         () => []],
    ['hog',          () => hog,          v => { hog = v; },          () => null],
    ['hogPoopTiles', () => hogPoopTiles, v => { hogPoopTiles = v; }, () => []],
    ['birds',        () => birds,        v => { birds = v; },        () => []],
    ['crabs',        () => crabs,        v => { crabs = v; },        () => []],
    ['turtles',      () => turtles,      v => { turtles = v; },      () => []],
    ['seagulls',     () => seagulls,     v => { seagulls = v; },     () => []],
    ['butterflies',  () => butterflies,  v => { butterflies = v; },  () => []],
    ['cicadas',      () => cicadas,      v => { cicadas = v; },      () => []],
    ['groundLoot',   () => groundLoot,   v => { groundLoot = v; },   () => []],
];

// Snapshot the active map's entity globals onto its World instance.
function parkActiveMap() {
    const m = maps[currentMapId];
    if (!m) return;
    m.entities = m.entities || {};
    for (const [name, get] of MAP_ENTITY_FIELDS) {
        try { m.entities[name] = get(); } catch (e) { /* global not yet defined */ }
    }
}

// Load a map's parked entities into the shared globals (fresh empties if none).
function loadMapEntities(m) {
    const parked = m.entities || {};
    for (const [name, , set, fresh] of MAP_ENTITY_FIELDS) {
        try { set(parked[name] !== undefined ? parked[name] : fresh()); } catch (e) { /* ignore */ }
    }
}

// Ensure a map exists, generating it on first visit.
function getOrCreateMap(id) {
    if (!maps[id]) maps[id] = new World(id === 'island' ? 'island' : id, id);
    return maps[id];
}

// Move the player to another map. (x, y, facing) is the arrival spot — place the
// player ADJACENT to the destination portal so they don't immediately re-trigger.
function travelTo(targetId, x, y, facing) {
    if (!world) return;
    parkActiveMap();
    const dest = getOrCreateMap(targetId);
    // Carry the world clock across so time is continuous between maps.
    dest.day = world.day;
    dest.season = world.season;
    dest.timeMinutes = world.timeMinutes;
    currentMapId = targetId;
    world = dest;
    loadMapEntities(dest);
    insideBuilding = null;
    if (typeof x === 'number') player.x = x;
    if (typeof y === 'number') player.y = y;
    if (facing) player.facing = facing;
    gameState = STATE.PLAYING;
    if (typeof invalidateFertileCache === 'function') invalidateFertileCache();
    if (typeof audioManager !== 'undefined') audioManager.updateMapMusic(targetId);
    updateCamera();
}

// If the player is standing on a portal tile, travel through it. Called after
// each overworld step.
function checkPortalUnderfoot() {
    if (!world || !player) return;
    const col = world.tiles[player.x];
    const tile = col ? col[player.y] : null;
    if (!tile || !tile.target) return;
    const dest = tile.target;
    if (tile.type === 'pond') {
        startPondWarp(dest);
    } else {
        travelTo(dest.map, dest.x, dest.y, dest.facing || 'down');
        if (dest.label) notify(dest.label);
    }
}

// Find a clear (non-solid, no building, dry) tile near (sx, sy), searching
// outward in rings. Excludes pond/portal tiles so a warp doesn't bounce the
// player straight into another warp. Falls back to (sx, sy) itself if nothing
// is found within range.
function findOpenTileNear(sx, sy) {
    for (let r = 1; r <= 8; r++) {
        for (let a = 0; a < 8; a++) {
            const rad = a * PI / 4;
            const tx = Math.round(sx + r * Math.cos(rad));
            const ty = Math.round(sy + r * Math.sin(rad));
            if (tx < 1 || tx >= CONFIG.WORLD_WIDTH - 1 || ty < 1 || ty >= CONFIG.WORLD_HEIGHT - 1) continue;
            const tile = world.tiles[tx] ? world.tiles[tx][ty] : null;
            if (!tile || tile.target || tile.type === 'pond') continue;
            if (isSolidTile(tx, ty)) continue;
            if (buildingAt(tx, ty)) continue;
            return { x: tx, y: ty };
        }
    }
    return { x: sx, y: sy };
}

const WARP_FALL_MS = 400;      // fall-from-offscreen duration
const WARP_BOUNCE_MS = 250;    // hop-to-a-clear-tile duration
const WARP_BOUNCE_HEIGHT = 10; // px, arc peak during the bounce-out hop

// Warp through a pond: travel instantly (as with any portal), then play a
// fall-from-offscreen + bounce-to-a-clear-tile sequence before returning
// control to the player. See updateWarpAnim() and the `warpAnim` guard in
// handleMovement().
function startPondWarp(dest) {
    travelTo(dest.map, dest.x, dest.y, dest.facing || 'down');
    const open = findOpenTileNear(player.x, player.y);
    warpAnim = {
        phase: 'falling',
        startTime: millis(),
        bounceX: open.x,
        bounceY: open.y
    };
    player.fallOffsetY = -CONFIG.CANVAS_HEIGHT;
}

// Advances the active pond-warp animation, if any. Called once per frame from
// drawGame(). Clears `warpAnim` (re-enabling movement) when the sequence ends.
function updateWarpAnim() {
    if (!warpAnim || !player) return;
    const elapsed = millis() - warpAnim.startTime;

    if (warpAnim.phase === 'falling') {
        const t = Math.min(1, elapsed / WARP_FALL_MS);
        const ease = 1 - (1 - t) * (1 - t); // ease-out
        player.fallOffsetY = -CONFIG.CANVAS_HEIGHT * (1 - ease);
        if (t >= 1) {
            player.fallOffsetY = 0;
            warpAnim.phase = 'bouncing';
            warpAnim.startTime = millis();
            warpAnim.fromX = player.x;
            warpAnim.fromY = player.y;
        }
        return;
    }

    // 'bouncing': hop from the landing tile to a clear tile nearby.
    const t = Math.min(1, elapsed / WARP_BOUNCE_MS);
    const arc = Math.sin(t * PI) * WARP_BOUNCE_HEIGHT;
    player.hopOffsetX = (warpAnim.bounceX - warpAnim.fromX) * CONFIG.TILE_SIZE * t;
    player.hopOffsetY = (warpAnim.bounceY - warpAnim.fromY) * CONFIG.TILE_SIZE * t - arc;
    if (t >= 1) {
        player.x = warpAnim.bounceX;
        player.y = warpAnim.bounceY;
        player.hopOffsetX = 0;
        player.hopOffsetY = 0;
        warpAnim = null;
        updateCamera();
    }
}

// ===== DEBUG MODE =====
// Dev cheats + an info overlay, gated behind `debugMode`. Toggle with backtick.
//   `  toggle debug      T  +1 hour      Y  skip to next day (sunrise)
//   H  refresh harvest   click  teleport player to the clicked tile
function toggleDebugMode() {
    debugMode = !debugMode;
    notify('Debug mode ' + (debugMode ? 'ON' : 'OFF'));
}

function debugSkipHour() {
    if (!world) return;
    world.timeMinutes += 60;
    while (world.timeMinutes >= 24 * 60) {
        world.timeMinutes -= 24 * 60;
        world.day++;
        if (typeof onNewDay === 'function') onNewDay();
    }
    notify('Debug: time ' + (typeof getTimeString === 'function' ? getTimeString() : world.timeMinutes));
}

function debugSkipDay() {
    if (!world) return;
    world.day++;
    world.timeMinutes = 6 * 60; // sunrise
    if (typeof onNewDay === 'function') onNewDay();
    if (typeof refreshHarvestables === 'function') refreshHarvestables();
    if (typeof spawnBirdPoop === 'function') spawnBirdPoop(3 + floor(random(3)));
    notify('Debug: skipped to Day ' + world.day);
}

function debugRefreshHarvest() {
    if (typeof refreshHarvestables === 'function') refreshHarvestables();
    if (typeof checkRespawns === 'function') checkRespawns();
    notify('Debug: harvestables refreshed');
}

function debugTeleport(tx, ty) {
    if (!world || !player) return;
    player.x = constrain(tx, 0, CONFIG.WORLD_WIDTH - 1);
    player.y = constrain(ty, 0, CONFIG.WORLD_HEIGHT - 1);
    updateCamera();
    notify('Debug: teleported to ' + player.x + ',' + player.y);
}

// First walkable tile in a ring around (x, y): not solid, no building, no NPC.
function firstWalkableNear(x, y) {
    const rings = [
        [0, -1], [1, 0], [0, 1], [-1, 0],
        [1, -1], [1, 1], [-1, 1], [-1, -1],
        [0, -2], [2, 0], [0, 2], [-2, 0],
    ];
    for (const [dx, dy] of rings) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) continue;
        if (isSolidTile(nx, ny)) continue;
        if (typeof buildingAt === 'function' && buildingAt(nx, ny)) continue;
        if (typeof npcAt === 'function' && npcAt(nx, ny)) continue;
        return { x: nx, y: ny };
    }
    return null;
}

// Spawn a roster neighbour next to the player. Prefers an unused NPC_DEFS entry
// (so dialogue keys line up); falls back to a random one if all are present.
function debugSpawnNPC() {
    if (!world || !player || typeof NPC_DEFS === 'undefined' || typeof NPC === 'undefined') {
        notify('Debug: NPC system unavailable');
        return;
    }
    let index = NPC_DEFS.findIndex((d, i) => !npcs.some(n => n.id === i));
    if (index < 0) index = floor(random(NPC_DEFS.length));
    const npc = new NPC(NPC_DEFS[index], index);
    const spot = firstWalkableNear(player.x, player.y) || { x: player.x, y: player.y };
    npc.gridX = spot.x;
    npc.gridY = spot.y;
    npc.isPresent = true;
    npcs.push(npc);
    notify('Debug: spawned ' + npc.name + ' the ' + npc.species);
}

// Give an item to the inventory. Prompts for "itemId [count]" (count defaults 1).
function debugGiveItem() {
    if (typeof inventory === 'undefined' || !inventory) { notify('Debug: no inventory'); return; }
    const ids = Object.keys(ITEMS);
    const raw = (typeof window !== 'undefined' && window.prompt)
        ? window.prompt('Give item — "itemId [count]"\n(see console for the full list)', 'log 10')
        : null;
    if (ids && console) console.log('[debug] valid item ids:', ids.join(', '));
    if (!raw) return;
    const parts = raw.trim().split(/\s+/);
    const id = parts[0];
    const count = Math.max(1, parseInt(parts[1], 10) || 1);
    if (!ITEMS[id]) { notify('Debug: unknown item "' + id + '"'); return; }
    inventory.addItem(id, count);
    notify('Debug: +' + count + ' ' + (ITEMS[id].name || id));
}

// Debug hotkeys. Returns true if the key was consumed. Only called in PLAYING
// and INSIDE states so it never eats menu/dialogue/name-entry input.
function handleDebugKey(kc, k) {
    if (kc === 192) { toggleDebugMode(); return true; } // backtick `
    if (!debugMode) return false;
    if (k === 't' || k === 'T') { debugSkipHour(); return true; }
    if (k === 'y' || k === 'Y') { debugSkipDay(); return true; }
    if (k === 'h' || k === 'H') { debugRefreshHarvest(); return true; }
    if (k === 'n' || k === 'N') { debugSpawnNPC(); return true; }
    if (k === 'g' || k === 'G') { debugGiveItem(); return true; }
    return false;
}

// Top-left info panel: map, player & mouse tile, day/time, and the hotkey legend.
function drawDebugOverlay() {
    if (!debugMode) return;
    push();
    const TS = CONFIG.TILE_SIZE;
    const playing = (gameState === STATE.PLAYING);
    const lines = [
        'DEBUG  (` to toggle)',
        'map: ' + currentMapId,
        'player: ' + (player ? player.x + ',' + player.y : '?'),
    ];
    if (playing) {
        lines.push('mouse: ' + Math.floor((mouseX + cameraX) / TS) + ',' + Math.floor((mouseY + cameraY) / TS));
    }
    lines.push('day ' + (world ? world.day : '?') + '   ' + (typeof getTimeString === 'function' ? getTimeString() : ''));
    lines.push('npcs: ' + (typeof npcs !== 'undefined' && npcs ? npcs.length : 0));
    lines.push('T:+1h  Y:+1day  H:harvest');
    lines.push('N:npc  G:give-item');
    if (playing) lines.push('click: teleport');

    textSize(10);
    textAlign(LEFT, TOP);
    const w = 210, h = lines.length * 13 + 8;
    const x = 6, y = 40;
    noStroke();
    fill(0, 0, 0, 180);
    rect(x, y, w, h);
    fill('#7CFC8A');
    for (let i = 0; i < lines.length; i++) text(lines[i], x + 6, y + 5 + i * 13);
    pop();
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
    if (typeof onNewDay === 'function') onNewDay();
    notify("You slept until morning. Day " + world.day + " begins!");

    // Refresh harvestables and spawn new bird poop at sunrise
    refreshHarvestables();
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

    // The Electric Temple's resident mac, against the back wall.
    if (b.type === 'ug_electric_temple') {
        const tSpr = SPRITES['sprites.taira'];
        const tx = offsetX + TEMPLE_TAIRA_POS.x * TS;
        const ty = offsetY + TEMPLE_TAIRA_POS.y * TS;
        if (!drawCharacterSprite(tSpr, tx, ty - TS, 'down', false)) {
            fill(NPC_DEFS[TEMPLE_TAIRA_ID].color);
            noStroke();
            rect(tx, ty - TS, TS, TS * 2);
        }
        fill(255, 255, 200);
        textAlign(CENTER, BOTTOM);
        textSize(7);
        textFont('Courier New');
        text('Taira', tx + TS / 2, ty - TS - 2);
    }

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

    // Hint (above the hotbar)
    fill(150);
    textAlign(CENTER, BOTTOM);
    textSize(8);
    text('Enter: exit  ·  E: menu', width / 2, height - 28);

    // Hotbar is universal — show it inside buildings too.
    drawHotbar();

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
        if (typeof onNewDay === 'function') onNewDay();
    }
    if (deltaTime) updateNotifications(deltaTime);

    // Debug overlay (coords, time, hotkeys)
    drawDebugOverlay();
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
        // grass.png is a large texture; sample one tile-sized patch instead of squashing it.
        if (grassSpr) { image(grassSpr, sx, sy, TS, TS, 0, 0, TS, TS); } else { fill('#7CB342'); noStroke(); rect(sx, sy, TS, TS); }
        drawHomeItem(tile.item, sx, sy, TS);
    } else if (tile.type === 'grass') {
        const spr = SPRITES['tiles.grass'];
        if (spr) {
            image(spr, sx, sy, TS, TS, 0, 0, TS, TS);
        } else {
            fill('#7CB342');
            rect(sx, sy, TS, TS);
        }
    } else if (tile.type === 'soil') {
        // Soil (tilled grass) - prefer sprite, fallback to dark brown with tilling texture
        const spr = SPRITES['tiles.soil'];
        if (spr) {
            image(spr, sx, sy, TS, TS);
        } else {
            fill('#5D4037');
            rect(sx, sy, TS, TS);
            fill('#4E342E');
            ellipse(sx + TS/2, sy + TS/2, TS - 4, TS - 4);
            fill('#6D4C41');
            rect(sx + 2, sy + TS/2 - 1, TS - 4, 1);
        }
    } else if (tile.type === 'bed') {
        // Grass base first so no dark gaps around the sprite
        const grassSpr = SPRITES['tiles.grass'];
        if (grassSpr) { image(grassSpr, sx, sy, TS, TS, 0, 0, TS, TS); } else { fill('#7CB342'); rect(sx, sy, TS, TS); }
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

// ===== NEIGHBOR SHACK PICKER =====
// Pending placement: set when the player clicks a valid spot; cleared on confirm/cancel.
let shackPicker = null; // { tx, ty, type, neighbors: [npc,...], selected: 0 }

// Try to place a neighbor's shack at the clicked overworld tile.
// Validates the footprint then opens a neighbor-selection picker.
// Replant a potted tree item (from the Tree Move trick) at (tx, ty). Always
// returns true so the click is swallowed whether or not placement succeeded.
function tryPlaceMovedTree(tx, ty, treeType, itemId) {
    if (tx < 1 || tx > CONFIG.WORLD_WIDTH - 2 || ty < 1 || ty > CONFIG.WORLD_HEIGHT - 2) return true;
    if (world.placeTree(tx, ty, treeType)) {
        inventory.removeItem(itemId, 1);
        notify('Replanted the ' + (ITEMS[itemId] ? ITEMS[itemId].name.toLowerCase() : 'tree') + '!');
    } else {
        const spot = (treeType === 'tree' || treeType === 'fir_tree') ? 'grass' : 'beach';
        notify('Needs a clear ' + spot + ' tile with room above it.');
    }
    return true;
}

function tryPlaceNeighborShack(tx, ty, type) {
    type = type || 'shack';
    const dims = BUILDING_TIERS[type] || BUILDING_TIERS.shack;

    const homeless = (typeof npcs !== 'undefined' ? npcs : [])
        .filter(n => n.isPresent && !n.hasHome);
    if (homeless.length === 0) {
        notify("No homeless neighbors to build for right now.");
        return true;
    }

    // Validate footprint.
    let clear = true;
    for (let dx = 0; dx < dims.w && clear; dx++) {
        for (let dy = 0; dy < dims.h && clear; dy++) {
            const cx = tx + dx, cy = ty + dy;
            if (cx < 1 || cx > CONFIG.WORLD_WIDTH - 2 || cy < 1 || cy > CONFIG.WORLD_HEIGHT - 2) { clear = false; break; }
            const tile = world.tiles[cx] && world.tiles[cx][cy];
            if (!tile || tile.type === 'sea' || tile.type === 'beach' || tile.type === 'water') { clear = false; break; }
            if (TILE_SOLID.has(tile.type)) { clear = false; break; }
            if (buildingAt(cx, cy)) { clear = false; break; }
        }
    }
    if (!clear) {
        notify("Can't place a shack there — clear some space first.");
        return true;
    }

    shackPicker = { tx, ty, type, neighbors: homeless, selected: 0 };
    gameState = 'shackPicker';
    return true;
}

// Confirm the picker selection and actually build the shack.
function confirmShackPicker() {
    if (!shackPicker) return;
    const npc = shackPicker.neighbors[shackPicker.selected];
    if (!npc) return;
    const b = new Building(shackPicker.type, shackPicker.tx, shackPicker.ty, npc.id);
    buildings.push(b);
    npc.hasHome = true;
    npc.hutX = shackPicker.tx;
    npc.hutY = shackPicker.ty;
    clearBuildingFootprint(b);
    inventory.removeItem(inventory.getActiveItem().id, 1);
    notify("Built a shack for " + npc.name + "!");
    shackPicker = null;
    gameState = STATE.PLAYING;
}

function cancelShackPicker() {
    shackPicker = null;
    gameState = STATE.PLAYING;
}

// Draw the neighbor picker overlay (called from the draw loop).
function drawShackPicker() {
    if (!shackPicker) return;

    // Dim the background.
    fill(0, 0, 0, 140);
    noStroke();
    rect(0, 0, width, height);

    const nbrs = shackPicker.neighbors;
    const rowH = 24;
    const panelW = 220;
    const panelH = 32 + nbrs.length * rowH + 28;
    const px = (width - panelW) / 2;
    const py = (height - panelH) / 2;

    // Panel background.
    fill(28, 22, 36, 240);
    stroke('#6A5ACD');
    strokeWeight(1);
    rect(px, py, panelW, panelH, 4);
    noStroke();

    fill(220, 210, 255);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text("Build shack for whom?", px + 10, py + 8);

    fill(140);
    textSize(7);
    text("↑↓ select   ⏎ confirm   Esc cancel", px + 10, py + 20);

    for (let i = 0; i < nbrs.length; i++) {
        const npc = nbrs[i];
        const ry = py + 32 + i * rowH;
        const sel = i === shackPicker.selected;

        fill(sel ? 60 : 34, sel ? 50 : 28, sel ? 80 : 40, 220);
        noStroke();
        rect(px + 6, ry, panelW - 12, rowH - 2, 2);

        fill(sel ? '#B98DFF' : '#5A4A8A');
        rect(px + 6, ry, 2, rowH - 2);

        if (sel) {
            stroke('#B6A6E0'); strokeWeight(1); noFill();
            rect(px + 6, ry, panelW - 12, rowH - 2, 2); noStroke();
        }

        // Colored dot for NPC.
        fill(npc.color || '#AAA');
        noStroke();
        ellipse(px + 20, ry + (rowH - 2) / 2, 8, 8);

        fill(sel ? 255 : 190, sel ? 255 : 190, sel ? 255 : 200);
        textAlign(LEFT, CENTER);
        textSize(9);
        textFont('Courier New');
        text(npc.name, px + 28, ry + (rowH - 2) / 2);

        fill(sel ? 180 : 110);
        textSize(7);
        const daysLeft = 14 - npc.daysOnIsland;
        text('Day ' + npc.daysOnIsland + (daysLeft > 0 ? '  (' + daysLeft + 'd left)' : '  leaving soon!'),
             px + 28, ry + (rowH - 2) / 2 + 8);
    }

    // Confirm button hint at bottom.
    fill('#7CB342');
    textAlign(CENTER, CENTER);
    textSize(9);
    textFont('Courier New');
    text('[ Confirm ]', px + panelW / 2, py + panelH - 14);
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
    // ===== DEBUG HOTKEYS (only while playing/inside, so menus/typing are safe) =====
    if (gameState === STATE.PLAYING || gameState === STATE.INSIDE) {
        if (handleDebugKey(keyCode, key)) return false;
    }

    // ===== SHACK PICKER =====
    if (gameState === 'shackPicker' && shackPicker) {
        const nbrs = shackPicker.neighbors;
        if (keyCode === UP_ARROW) {
            shackPicker.selected = (shackPicker.selected - 1 + nbrs.length) % nbrs.length;
        } else if (keyCode === DOWN_ARROW) {
            shackPicker.selected = (shackPicker.selected + 1) % nbrs.length;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            confirmShackPicker();
        } else if (keyCode === ESCAPE) {
            cancelShackPicker();
        }
        return false;
    }

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
        } else if (key === 'm' || key === 'M') {
            if (typeof openMagicCastMenu === 'function') openMagicCastMenu();
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
            // Yogatron holiday interaction (before harvest)
            if (typeof tryTalkToYogatron === 'function' && tryTalkToYogatron()) return false;
            // Toast Toss interaction (only on holiday)
            if (typeof tryToastToss === 'function' && tryToastToss()) return false;
            // Garden Day: till soil with hoe before trying other interactions
            if (typeof tryTillSoil === 'function' && tryTillSoil()) return false;
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
            // Electric Temple: talk to Taira when facing her spot.
            if (tryTalkToTempleTaira()) return false;
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

// ===== TILLING / GARDEN DAY HELPERS =====
// Returns true if the active tool should not lose durability today (Garden Day = hoe)
function isUnbreakableToolToday(toolId) {
    if (toolId !== 'hoe') return false;
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    return !!(holiday && holiday.name === 'Garden Day');
}

// Try to till the grass tile the player is facing with an equipped hoe.
// Returns true if a tile was tilled (swallowing the interaction event).
function tryTillSoil() {
    if (!player || !inventory) return false;
    const active = inventory.getActiveItem();
    if (!active || active.id !== 'hoe') return false;

    const facing = player.getFacingTile ? player.getFacingTile() : null;
    if (!facing || !facing.tile) return false;
    if (facing.tile.type !== 'grass') {
        // Not grass - maybe already soil. Give a small hint without swallowing.
        if (facing.tile.type === 'soil') {
            notify('Already tilled! Plant a seed here.');
        }
        return false;
    }
    // Don't till onto solid/building/animal tiles (grass can be there only if not solid anyway)
    if (typeof isSolidTile === 'function' && isSolidTile(facing.x, facing.y)) return false;
    if (typeof buildingAt === 'function' && buildingAt(facing.x, facing.y)) return false;

    facing.tile.type = 'soil';
    facing.tile.variant = 0;
    notify('Tilled the soil!');

    // On Garden Day, hoes never break. Otherwise consume 1 durability.
    if (!isUnbreakableToolToday('hoe')) {
        if (typeof active.durability !== 'number') active.durability = ITEMS[active.id].durability || 3;
        active.durability -= 1;
        if (active.durability <= 0) {
            notify('Your hoe broke!');
            inventory.removeItem('hoe', 1);
        }
    }
    return true;
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

    // Backflip Day: the harvest target flips even if the harvest itself fails.
    {
        const TS = CONFIG.TILE_SIZE;
        const tall = (typeof TALL_SPRITE_TILES !== 'undefined') && TALL_SPRITE_TILES[tile.type];
        triggerBackflip('tile:' + bestInfo.x + ',' + bestInfo.y,
            (bestInfo.x + 0.5) * TS,
            tall ? (bestInfo.y - 0.5) * TS : (bestInfo.y + 0.5) * TS);
    }

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
    if (harvestDef.pickOne) {
        // Choose a single drop, weighted by each drop's `chance`.
        const drops = harvestDef.drops;
        if (drops.length > 0) {
            let total = 0;
            for (const d of drops) total += (d.chance || 1);
            let r = random() * total;
            let chosen = drops[drops.length - 1];
            for (const d of drops) { r -= (d.chance || 1); if (r <= 0) { chosen = d; break; } }
            // randomQty: roll 1-3 of the chosen item; otherwise use its fixed count (default 1).
            const qty = harvestDef.randomQty ? (1 + floor(random(3))) : (chosen.count || 1);
            inventory.addItem(chosen.id, qty);
            gotItems.push(qty + 'x ' + ITEMS[chosen.id].name);
        }
    } else {
        for (const drop of harvestDef.drops) {
            if (random() <= drop.chance) {
                inventory.addItem(drop.id, drop.count);
                gotItems.push(drop.count + 'x ' + ITEMS[drop.id].name);
            }
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
            // Garden Day: hoes are unbreakable.
            if (isUnbreakableToolToday(active.id)) {
                notify("Your hoe feels strangely sturdy today. Garden Day magic!");
            } else {
                if (typeof active.durability !== 'number') active.durability = ITEMS[active.id].durability || 3;
                active.durability -= 1;
                if (active.durability <= 0) {
                    notify('Your ' + ITEMS[active.id].name + ' broke!');
                    inventory.removeItem(active.id, 1);
                }
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

// Refresh all depleted harvestable tiles across the whole world (called at 6 AM each day).
function refreshHarvestables() {
    if (!world) return;
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const tile = world.tiles[x][y];
            if (tile.depleted) {
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
        if (isNearBeach(x, y, NONBEACH_BEACH_BUFFER)) continue; // non-beach item: stay inland
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

// Spawn the single Toast Toss Tournament target on a beach tile.
function spawnToastTargets() {
    if (!world) return;
    let attempts = 0;
    const px = player ? player.x : -1;
    const py = player ? player.y : -1;
    while (attempts < 500) {
        attempts++;
        const x = floor(random(CONFIG.WORLD_WIDTH));
        const y = floor(random(CONFIG.WORLD_HEIGHT));
        const tile = world.tiles[x][y];
        if (!tile || tile.type !== 'beach') continue;
        if (isSolidTile(x, y)) continue;
        if (buildingAt(x, y)) continue;
        if (x === px && y === py) continue;
        world.tiles[x][y] = { type: 'toast_target', variant: 0 };
        notify('A toast target appeared on the beach!');
        return;
    }
}

// Sweep the tournament target away (called when a new day starts).
function clearToastTargets() {
    if (!world) return;
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (t && t.type === 'toast_target') { t.type = 'beach'; t.variant = 0; }
        }
    }
    toastProjectile = null;
}

// ===== TOAST THROWING =====
// One toast in flight at a time: {x0,y0,x1,y1,t,dur,hit}. Tile coords; t/dur in seconds.
let toastProjectile = null;
const TOAST_RANGE = 5;

function tryToastToss() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Toast Toss Tournament') return false;

    const active = inventory.getActiveItem();
    if (!active || active.id !== 'stale_toast') {
        // Only hint if they're clearly trying to interact with the target.
        const facing = player.getFacingTile ? player.getFacingTile() : null;
        if (facing && facing.tile && facing.tile.type === 'toast_target') {
            notify('Equip some Stale Toast to join the tournament!');
            return true;
        }
        return false;
    }
    if (toastProjectile) return true; // one toast in the air at a time

    // Trace the throw line along the facing direction, up to TOAST_RANGE tiles.
    let dx = 0, dy = 0;
    if (player.facing === 'up') dy = -1;
    else if (player.facing === 'down') dy = 1;
    else if (player.facing === 'left') dx = -1;
    else dx = 1;

    let lx = player.x, ly = player.y, hit = false;
    for (let i = 1; i <= TOAST_RANGE; i++) {
        const tx = player.x + dx * i;
        const ty = player.y + dy * i;
        if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) break;
        lx = tx; ly = ty;
        const tile = world.tiles[tx][ty];
        if (tile && tile.type === 'toast_target') { hit = true; break; }
    }
    if (lx === player.x && ly === player.y) return false; // facing the world edge

    inventory.removeItem('stale_toast', 1);
    const dist = Math.max(Math.abs(lx - player.x), Math.abs(ly - player.y));
    // ponytail: "physics" = straight tile path + parabolic arc; toast sails over obstacles
    toastProjectile = { x0: player.x, y0: player.y, x1: lx, y1: ly, t: 0, dur: 0.15 + 0.08 * dist, hit };
    return true;
}

function updateToastProjectile(dt) {
    if (!toastProjectile) return;
    toastProjectile.t += dt / 1000;
    if (toastProjectile.t < toastProjectile.dur) return;
    const p = toastProjectile;
    toastProjectile = null;

    const tile = world.tiles[p.x1] && world.tiles[p.x1][p.y1];
    if (!p.hit || !tile || tile.type !== 'toast_target') {
        notify('Splat! The toast lands in the sand. (-1 toast)');
        return;
    }
    // Closer throws score better. The target stays up all day for more throws.
    const dist = Math.max(Math.abs(p.x1 - p.x0), Math.abs(p.y1 - p.y0));
    const roll = random();
    if (roll < 0.85 - 0.1 * dist) {
        const n = 1 + floor(random(2));
        inventory.addItem('gold_coin', n);
        notify('Bullseye! You win ' + n + ' Gold Coin' + (n > 1 ? 's' : '') + '! (-1 toast)');
    } else if (roll < 0.9) {
        const n = 1 + floor(random(2));
        inventory.addItem('banana', n);
        notify('Nice toss! The toast clips the rim. You win ' + n + ' Banana' + (n > 1 ? 's' : '') + '! (-1 toast)');
    } else {
        notify('So close! The toast bounces off the target. (-1 toast)');
    }
}

// ===== BACKFLIP DAY =====
// On the holiday, anything the player interacts with does one full backflip.
let backflips = []; // { key, px, py, t, dur } — pivot px/py in world pixels
function isBackflipDay() {
    const h = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    return !!h && h.name === 'Backflip Day';
}
// key: 'tile:x,y' string for tiles, or the entity object itself for NPCs/animals.
function triggerBackflip(key, px, py) {
    if (!isBackflipDay()) return;
    if (backflips.some(b => b.key === key)) return; // already mid-flip
    backflips.push({ key, px, py, t: 0, dur: 700 });
}
function updateBackflips(dt) {
    if (backflips.length === 0) return;
    for (const b of backflips) b.t += dt;
    backflips = backflips.filter(b => b.t < b.dur);
}
// Run drawFn rotated one full turn around the flip pivot. applyCamera=true for
// callers drawing in screen space (NPCs/animals); tile passes are already
// camera-translated so they pass false.
function withBackflip(key, drawFn, applyCamera) {
    const b = backflips.length ? backflips.find(b => b.key === key) : null;
    if (!b) { drawFn(); return; }
    const px = applyCamera ? b.px - cameraX : b.px;
    const py = applyCamera ? b.py - cameraY : b.py;
    push();
    translate(px, py);
    rotate(-(b.t / b.dur) * TWO_PI); // backwards rotation = backflip
    translate(-px, -py);
    drawFn();
    pop();
}

function drawToastProjectile() {
    if (!toastProjectile) return;
    const p = toastProjectile;
    const TS = CONFIG.TILE_SIZE;
    const t = Math.min(p.t / p.dur, 1);
    const x = lerp(p.x0, p.x1, t) * TS + TS / 2 - cameraX;
    const y = lerp(p.y0, p.y1, t) * TS + TS / 2 - cameraY - 4 * 24 * t * (1 - t); // parabolic arc, 24px peak
    const spr = SPRITES['items.stale_toast'];
    push();
    translate(x, y);
    rotate(t * TWO_PI * 2); // toast tumbles in flight
    if (spr) image(spr, -8, -8, 16, 16);
    else { fill('#D2B48C'); noStroke(); rect(-6, -6, 12, 12); }
    pop();
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
    world = new World('island', 'island');
    maps = { island: world };
    currentMapId = 'island';
    player = new Player(50, 50);
    inventory = new Inventory();
    buildings = [];
    spawnPlayerShack();
    npcs = [];
    knownMagic = [];
    magicFlags = { mubabaQuest: false, mubabaMet: false, usurperBanished: false, domStep: 0 };
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

    // Single-row horizontal strip -> a looping one-direction animation (e.g. the
    // orb player sprite). Always cycles through every frame regardless of
    // movement; bobs while moving; never flips (only one direction exists).
    if (rows === 1 && cols > 1) {
        const frame = phase % cols;
        const bob = moving ? BOB_PATTERN[phase % BOB_PATTERN.length] : 0;
        drawSpriteMaybeFlipped(spr, dx, dy + bob, drawW, drawH, false,
            frame * CHAR_FW, 0, CHAR_FW, CHAR_FH);
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
        // Pixel offsets applied during a pond-warp fall/bounce (see updateWarpAnim()).
        this.fallOffsetY = 0;
        this.hopOffsetX = 0;
        this.hopOffsetY = 0;
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
        const screenX = this.x * CONFIG.TILE_SIZE - cameraX + this.hopOffsetX;
        const screenY = this.y * CONFIG.TILE_SIZE - cameraY + this.fallOffsetY + this.hopOffsetY;

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
//
// DISABLED: the sea↔beach transition is now drawn by the waves.png corner/shore
// sprites and the beach↔grass transition by the beach_edge.png overlay. Beach
// borders every terrain boundary, so this geometric rounding only fought those
// custom tiles — leaving artifacts at the sand corners. Off means plain, full
// beach tiles in the corners, which is what the custom edge tiles expect.
let ROUND_TERRAIN = false;

// Approximate palette used to carve corners (close to the tile sprites).
const TERRAIN_EDGE_COLORS = { 0: '#4A90C8', 1: '#F4E4BC', 2: '#7CB342' };

// Terrain height level. Anything that sits on land (grass, trees, rocks, flowers)
// counts as land so we only round true coast/beach edges, not grass detail.
// Off-map neighbors are treated as land so the rectangular world border isn't carved.
function terrainLevel(tile) {
    if (!tile) return 2;
    if (tile.type === 'sea' || tile.type === 'water' || tile.type === 'pond_water') return 0;
    // Beach itself, plus decorations that sit ON the beach, are all beach-level. Without
    // this the rounding pass treats a beach tree as a raised "land" bump and paints green
    // grass globs into the sand around its base.
    if (tile.type === 'beach' || tile.type === 'banana_tree' || tile.type === 'palm_tree' || tile.type === 'toast_target') return 1;
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

// Beach-edge fringe: drawn OVER a grass tile that borders beach, so sand creeps
// onto the grass edge facing the beach. Uses beach_edge.png (2 cols × 4 rows of
// 16×16 cells). Each cell's sand fills the side toward the beach:
//   row0 East(0,0)/West(16,0)  row1 North(0,16)/South(16,16)
//   row2 NW(0,32)/NE(16,32)    row3 SW(0,48)/SE(16,48)
// Cells are named for where the LAND (grass) sits, so e.g. the "East" cell has its
// sand on the WEST — used when the beach is to the west of this grass tile.
// Correction by charles: corner tile coordinates
function drawBeachEdgeOverlay(x, y, screenX, screenY, TS) {
    const edge = SPRITES['tiles.beach_edge'];
    if (!edge) return;
    function isBeach(dx, dy) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) return false;
        const t = world.tiles[nx][ny];
        return !!t && t.type === 'beach';
    }
    const bN = isBeach(0, -1), bS = isBeach(0, 1), bE = isBeach(1, 0), bW = isBeach(-1, 0);
    if (!(bN || bS || bE || bW)) return;
    let sx2, sy2;
    if (bN && bE)      { sx2 = 0; sy2 = 48; } // beach to N+E -> sand fills NE corner
    else if (bN && bW) { sx2 = 16;  sy2 = 48; } // N+W -> NW
    else if (bS && bE) { sx2 = 0; sy2 = 32; } // S+E -> SE
    else if (bS && bW) { sx2 = 16;  sy2 = 32; } // S+W -> SW
    else if (bW)       { sx2 = 0;  sy2 = 0;  } // beach W -> sand on W ("East" cell)
    else if (bE)       { sx2 = 16; sy2 = 0;  } // beach E -> sand on E ("West" cell)
    else if (bN)       { sx2 = 16; sy2 = 16; } // beach N -> sand on N ("South" cell)
    else               { sx2 = 0;  sy2 = 16; } // beach S -> sand on S ("North" cell)
    image(edge, screenX, screenY, TS, TS, sx2, sy2, 16, 16);
}

// World class
// Route between the two maps: stepping into either pond's
// water warps you to the other (see World.placePond(), checkPortalUnderfoot()).
const ISLAND_POND_ORIGIN      = { x: 47, y: 39 }; // top-left of the 6x6 island pond
const ISLAND_POND_LANDING     = { x: 49, y: 41 }; // inner water tile, used as the underground pond's warp target
const UNDERGROUND_POND_ORIGIN = { x: 17, y: 11 }; // top-left of the 6x6 underground pond
const UNDERGROUND_POND_LANDING = { x: 19, y: 13 }; // inner water tile, used as the island pond's warp target

// Where Mubaba the magic merchant stands: on the cave floor just east of the
// underground pond, so arrivals walk right into him. He moves in front of his
// own building once that exists (July3rdReview C4).
const MUBABA_SPAWN = { x: 26, y: 14 };

// Where the Teleport trick (magic.js) drops the player: one tile clear of
// each map's pond, so it never lands on a warp tile.
const TELEPORT_LANDINGS = {
    island:      { x: 50, y: 45, facing: 'down' },
    underground: { x: 20, y: 17, facing: 'down' }
};

// The west-beach dock: an 8x4 tile pier (dock.png), origin at its NW corner.
// Columns 0-5 stick out over the sea, columns 6-7 sit on the sand. Neighbors
// and guests "arrive" by boat and appear on the beach tile just east of the
// dock's landward end (see checkArrivals() in entities.js).
const ISLAND_DOCK_ORIGIN  = { x: 0, y: 48 };
const ISLAND_DOCK_W = 8, ISLAND_DOCK_H = 4;
const ISLAND_DOCK_ARRIVAL = { x: ISLAND_DOCK_ORIGIN.x + ISLAND_DOCK_W, y: ISLAND_DOCK_ORIGIN.y + 2 };

// Eight foundation pads where underground buildings can stand (2 rows x 4 cols).
// Each pad is PAD_W x PAD_H tiles; (x,y) is its top-left corner.
const UNDERGROUND_PAD_W = 8, UNDERGROUND_PAD_H = 6;
const UNDERGROUND_FOUNDATIONS = [
    { x: 12, y: 26 }, { x: 30, y: 26 }, { x: 48, y: 26 }, { x: 66, y: 26 },
    { x: 12, y: 50 }, { x: 30, y: 50 }, { x: 48, y: 50 }, { x: 66, y: 50 },
];

// Return a shuffled copy of an array (Fisher-Yates, using p5's random()).
function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = floor(random(i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class World {
    constructor(kind = 'island', id = null) {
        this.kind = kind;          // 'island' | 'underground' (drives generation)
        this.id = id || kind;      // registry key in `maps`
        this.tiles = [];
        this.day = 1;
        this.season = 'Sweet';
        this.timeMinutes = 8 * 60; // Start at 8 AM
        this.showSaveIndicator = false;
        this.entities = null;      // parked per-map entity globals (see parkActiveMap)

        if (kind === 'underground') this.generateUnderground();
        else if (kind === 'island') this.generateWorld();
        // Other kinds (e.g. 'blank' when rebuilding a map from a save) skip
        // generation; the caller fills in tiles/entities.
    }

    // The underground city: a fixed cavern (rock border, stone floor) with eight
    // foundation pads. Buildings on the pads are placed separately (3 of 8 at
    // creation), not here.
    generateUnderground() {
        const W = CONFIG.WORLD_WIDTH, H = CONFIG.WORLD_HEIGHT;
        const BORDER = 4; // thickness of the surrounding rock wall
        for (let x = 0; x < W; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < H; y++) {
                const edge = Math.min(x, W - 1 - x, y, H - 1 - y);
                if (edge < BORDER) {
                    this.tiles[x][y] = { type: 'cave_wall', variant: floor(random(3)), solid: true };
                } else {
                    this.tiles[x][y] = { type: 'cave_floor', variant: floor(random(4)) };
                }
            }
        }
        // Lay the eight foundation pads.
        for (const pad of UNDERGROUND_FOUNDATIONS) {
            for (let dx = 0; dx < UNDERGROUND_PAD_W; dx++) {
                for (let dy = 0; dy < UNDERGROUND_PAD_H; dy++) {
                    const tx = pad.x + dx, ty = pad.y + dy;
                    if (tx < 0 || tx >= W || ty < 0 || ty >= H) continue;
                    this.tiles[tx][ty] = { type: 'foundation', variant: 0 };
                }
            }
        }
        // Animated route back to the surface: a pond mirroring the one up on
        // the island.
        this.placePond(UNDERGROUND_POND_ORIGIN.x, UNDERGROUND_POND_ORIGIN.y, 'island',
                       ISLAND_POND_LANDING.x, ISLAND_POND_LANDING.y, 'down');

        // Place the fixed starting buildings. The remaining pads fill in later
        // via quests. Buildings live on this map's parked entity list so they
        // appear when the player travels here.
        const placed = [];
        for (const s of UNDERGROUND_STARTING_BUILDINGS) {
            const b = this.placeBuildingOnFoundation(s.type, s.padIndex);
            if (b) placed.push(b);
        }
        // Mubaba awaits inside his fortress (isPresent false keeps him off the
        // map; entering the fortress talks to this record — see magic.js).
        const mubaba = new NPC(MUBABA_DEF, 'mubaba');
        mubaba.gridX = MUBABA_SPAWN.x;
        mubaba.gridY = MUBABA_SPAWN.y;
        mubaba.facing = 'left';
        mubaba.isPresent = false;
        this.entities = { buildings: placed, npcs: [mubaba] };
    }

    // Build a placeholder building centered on foundation pad #padIndex. The
    // door faces down onto open foundation; no terrain clearing (it sits on the
    // stone pad). Returns the Building, or null if the pad is invalid.
    placeBuildingOnFoundation(type, padIndex) {
        const pad = UNDERGROUND_FOUNDATIONS[padIndex];
        if (!pad) return null;
        const def = BUILDING_TIERS[type] || {};
        const bw = def.w || 6, bh = def.h || 4;
        const gx = pad.x + Math.floor((UNDERGROUND_PAD_W - bw) / 2);
        const gy = pad.y; // top-aligned, leaving foundation below the door
        const b = new Building(type, gx, gy, null);
        b.padIndex = padIndex;
        return b;
    }

    // Lay a 6x6 pond at (originX, originY) (top-left corner): a 1-tile
    // walkable bank ring around a 4x4 water interior. Stepping into the water
    // warps to (targetMap, targetX, targetY) via the tile's `target` field
    // (see checkPortalUnderfoot()/startPondWarp()).
    placePond(originX, originY, targetMap, targetX, targetY, facing) {
        const PW = 6, PH = 6;
        for (let px = 0; px < PW; px++) {
            for (let py = 0; py < PH; py++) {
                const tx = originX + px, ty = originY + py;
                if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
                const isBank = px === 0 || px === PW - 1 || py === 0 || py === PH - 1;
                const tile = { type: 'pond', pondOrigin: (px === 0 && py === 0), solid: false };
                if (!isBank) {
                    tile.target = { map: targetMap, x: targetX, y: targetY, facing: facing || 'down' };
                }
                this.tiles[tx][ty] = tile;
            }
        }
    }

    // Lay the west-beach dock at (originX, originY) (top-left corner): an
    // ISLAND_DOCK_W x ISLAND_DOCK_H solid pier, drawn as one image (see
    // drawDockOverlay()). Blocks movement like a rock/tree.
    placeDock(originX, originY) {
        for (let px = 0; px < ISLAND_DOCK_W; px++) {
            for (let py = 0; py < ISLAND_DOCK_H; py++) {
                const tx = originX + px, ty = originY + py;
                if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
                this.tiles[tx][ty] = { type: 'dock', dockOrigin: (px === 0 && py === 0), solid: true };
            }
        }
    }

    generateWorld() {
        const centerX = CONFIG.WORLD_WIDTH / 2;
        const centerY = CONFIG.WORLD_HEIGHT / 2;

        // Initialize tile grid with base terrain only
        for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
                const zone = islandZone(x, y);
                if (zone === 'sea') {
                    this.tiles[x][y] = { type: 'sea', variant: floor(random(3)) };
                } else if (zone === 'beach') {
                    this.tiles[x][y] = { type: 'beach', variant: floor(random(3)) };
                } else {
                    this.tiles[x][y] = { type: 'grass', variant: floor(random(3)) };
                }
            }
        }
        // The island is a clean rectangle, so no coastline smoothing is needed.

        // Scatter decorations on a 10x10 grid - at most 1 decoration per cell
        // This keeps open space for building
        const CELL = 10;
        const decorations = ['tree', 'tree', 'fir_tree', 'rock', 'shiny_rock', 'weeds', 'bird_poop'];

        for (let cx = 0; cx < CONFIG.WORLD_WIDTH; cx += CELL) {
            for (let cy = 0; cy < CONFIG.WORLD_HEIGHT; cy += CELL) {
                // Pick a random tile within this 10x10 cell
                const tx = cx + floor(random(CELL));
                const ty = cy + floor(random(CELL));
                if (tx >= CONFIG.WORLD_WIDTH || ty >= CONFIG.WORLD_HEIGHT) continue;

                // Only decorate grass interior; skip sea and (mostly-empty) beach.
                if (islandZone(tx, ty) !== 'grass') continue;
                // These are all non-beach decorations, so keep them well inland of
                // the beach line (NONBEACH_BEACH_BUFFER) to avoid grass/sand seams.
                if (isNearBeach(tx, ty, NONBEACH_BEACH_BUFFER)) continue;
                // Interior - 1 decoration per cell, ~80% chance (some cells stay empty)
                if (random() < 0.8) {
                    const type = random(decorations);
                    if (type === 'tree' || type === 'fir_tree') this.placeTree(tx, ty, type);
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
            if (islandZone(rx, ry) !== 'grass') continue; // interior only
            if (isNearBeach(rx, ry, NONBEACH_BEACH_BUFFER)) continue; // keep clear of the beach
            if (this.tiles[rx][ry].type !== 'grass') continue; // only on open grass
            // Rosebushes are 1-tall, solid, harvested (destroyed) for a rose.
            this.tiles[rx][ry] = { type: 'rosebush', variant: 0 };
            rosebushesPlaced++;
        }

        // Place a handful of tulips on the island interior (destructible pickups, like rosebushes).
        let tulipsPlaced = 0;
        let tulipAttempts = 0;
        while (tulipsPlaced < 4 && tulipAttempts < 300) {
            tulipAttempts++;
            const tx2 = 15 + floor(random(70));
            const ty2 = 15 + floor(random(70));
            if (islandZone(tx2, ty2) !== 'grass') continue; // interior only
            if (isNearBeach(tx2, ty2, NONBEACH_BEACH_BUFFER)) continue; // keep clear of the beach
            if (this.tiles[tx2][ty2].type !== 'grass') continue; // only on open grass
            this.tiles[tx2][ty2] = { type: 'tulip', variant: floor(random(2)) };
            tulipsPlaced++;
        }

        // Scatter banana and palm trees around the beach ring.
        let beachTreesPlaced = 0;
        let beachTreeAttempts = 0;
        while (beachTreesPlaced < 14 && beachTreeAttempts < 600) {
            beachTreeAttempts++;
            const bx = floor(random(CONFIG.WORLD_WIDTH));
            const by = floor(random(CONFIG.WORLD_HEIGHT));
            if (islandZone(bx, by) !== 'beach') continue;
            if (this.tiles[bx][by].type !== 'beach') continue;
            // Beach features hug the water — only the outer couple of beach tiles,
            // never up against the grass line.
            if (!isNearSea(bx, by, BEACH_FEATURE_WATER_DIST)) continue;
            const treeType = random() < 0.5 ? 'banana_tree' : 'palm_tree';
            const before = this.tiles[bx][by].type;
            const beachTreeSpacing = 10;
            const beachTreePositions = []
            let tooClose = false;
            for (const pos of beachTreePositions) {
                const dx = bx - pos.x;
                const dy = by - pos.y;
                if (Math.sqrt(dx * dx + dy * dy) < beachTreeSpacing) {
                    tooClose = true;
                    break;
                }
            }
            if (tooClose) continue;
            this.placeTree(bx, by, treeType);
            if (this.tiles[bx][by].type !== before) beachTreesPlaced++;
            if (this.tiles[bx][by].type !== before) {
                beachTreesPlaced++;
                beachTreePositions.push({ x: bx, y: by });
            }
        }

        // Place a pond near-center, slightly above. The entire pond — water and banks —
        // is a single 96×96 (6×6 tile) image drawn from the top-left tile (pondOrigin).
        // Both the bank ring and the water are walkable; stepping into the water warps
        // to the underground pond (see placePond()/checkPortalUnderfoot()).
        this.placePond(ISLAND_POND_ORIGIN.x, ISLAND_POND_ORIGIN.y, 'underground',
                       UNDERGROUND_POND_LANDING.x, UNDERGROUND_POND_LANDING.y, 'down');

        // Place the arrivals dock on the west beach.
        this.placeDock(ISLAND_DOCK_ORIGIN.x, ISLAND_DOCK_ORIGIN.y);

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
        // Oak and fir trees stand on grass; banana/palm trees stand on the beach.
        const baseNeeded = (type === 'tree' || type === 'fir_tree') ? 'grass' : 'beach';
        if (this.tiles[x][y].type !== baseNeeded) return false;
        const topY = y - 1;
        if (topY < 0 || topY >= CONFIG.WORLD_HEIGHT) return false;
        const topTile = this.tiles[x][topY];
        const topNeeded = (type === 'tree' || type === 'fir_tree') ? 'grass' : null;
        // Inland trees must stay fully on grass; beach trees can extend over grass or beach.
        if (!topTile || (topNeeded ? topTile.type !== topNeeded : (topTile.type !== 'grass' && topTile.type !== 'beach'))) return false;
        if (topTile.solid === true || topTile.isTreeTop === true) return false;

        // The trunk tile blocks movement; the canopy tile above it does not, so the
        // player can walk under the overworld tree-top sprite (see drawTallDecoration).
        const topSolid = (type === 'tree' || type === 'fir_tree') ? false : true;
        this.tiles[x][y] = { type, variant: floor(random(3)), solid: true };
        this.tiles[x][topY] = { type, variant: floor(random(3)), isTreeTop: true, solid: topSolid };
        return true;
    }
    
    draw() {
        push();
        translate(-cameraX, -cameraY);
        
        // Draw visible tiles only. MARGIN extends the range so multi-tile sprites drawn
        // from an off-screen top-left origin (e.g. the 6×6 pond) still render, and trees
        // whose trunk sits just below the view still poke their canopy in.
        const MARGIN = 6;
        const x0 = max(0, floor(cameraX / CONFIG.TILE_SIZE) - MARGIN);
        const y0 = max(0, floor(cameraY / CONFIG.TILE_SIZE) - MARGIN);
        const x1 = min(CONFIG.WORLD_WIDTH, floor(cameraX / CONFIG.TILE_SIZE) + ceil(CONFIG.CANVAS_WIDTH / CONFIG.TILE_SIZE) + MARGIN);
        const y1 = min(CONFIG.WORLD_HEIGHT, floor(cameraY / CONFIG.TILE_SIZE) + ceil(CONFIG.CANVAS_HEIGHT / CONFIG.TILE_SIZE) + MARGIN);

        // Pass 1: draw base terrain and solid tile bottoms.
        for (let x = x0; x < x1; x++) {
            for (let y = y0; y < y1; y++) {
                this.drawTile(x, y, this.tiles[x][y]);
            }
        }

        // Pass 2: soften terrain boundaries by rounding outer corners. Each wedge
        // stays inside its own tile, so this never paints over trees/buildings.
        if (ROUND_TERRAIN) {
            for (let x = x0; x < x1; x++) {
                for (let y = y0; y < y1; y++) {
                    this.drawTerrainCornerRounding(x, y);
                }
            }
        }

        // Pass 3: large ground overlays, drawn after all base tiles so transparent
        // sprites are not covered by later grass tiles.
        for (let x = x0; x < x1; x++) {
            for (let y = y0; y < y1; y++) {
                this.drawPondOverlay(x, y, this.tiles[x][y]);
                this.drawDockOverlay(x, y, this.tiles[x][y]);
            }
        }

        // Pass 3.5: sun shadows on the ground — beneath flora (pass 4) and the
        // actors drawn later in drawGame().
        this.drawSunShadows(x0, y0, x1, y1);

        // Pass 4: tall decorations (trees, rosebushes) whose sprites overflow their
        // tile. Drawn last so neighbouring tiles' base terrain can't clip them.
        for (let x = x0; x < x1; x++) {
            for (let y = y0; y < y1; y++) {
                // Backflip Day: rotate a flipping tree/bush around its pivot.
                withBackflip('tile:' + x + ',' + y, () => this.drawTallDecoration(x, y, this.tiles[x][y]));
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
            // Calendar tick: holidays, seasons, NPC arrivals/departures, gardens.
            if (typeof onNewDay === 'function') onNewDay();
            // Sunrise: refresh harvestables and spawn new bird poop.
            refreshHarvestables();
            spawnBirdPoop(3 + floor(random(3)));
            // Sunrise: animals spawn (handled by checkAnimalSunEvents too, but ensure on wrap)
            if (typeof onAnimalNewDay === 'function') onAnimalNewDay();
            if (typeof onHogNewDay === 'function') onHogNewDay();
        }
    }

    drawPondOverlay(x, y, tile) {
        if (!tile || tile.type !== 'pond' || !tile.pondOrigin) return;
        const spr = SPRITES['tiles.pond'];
        const TS = CONFIG.TILE_SIZE;
        const screenX = x * TS;
        const screenY = y * TS;
        if (spr) {
            image(spr, screenX, screenY, TS * 6, TS * 6);
        } else {
            fill('#4A90C8');
            rect(screenX, screenY, TS * 6, TS * 6);
        }
    }

    drawDockOverlay(x, y, tile) {
        if (!tile || tile.type !== 'dock' || !tile.dockOrigin) return;
        const spr = SPRITES['tiles.dock'];
        const TS = CONFIG.TILE_SIZE;
        const screenX = x * TS;
        const screenY = y * TS;
        const w = TS * ISLAND_DOCK_W, h = TS * ISLAND_DOCK_H;
        if (spr) {
            image(spr, screenX, screenY, w, h);
        } else {
            fill('#8B6914');
            rect(screenX, screenY, w, h);
        }
    }

    // Oak/fir canopy tiles are deliberately walkable (see placeTree()) so the
    // player can stand under the foliage. drawTallDecoration() draws the whole
    // tree before the player, so redraw the canopy on top of the player when
    // it visually overlaps them, or it'd look like they're floating in front
    // of the leaves instead of hidden beneath them.
    //
    // The canopy sprite is 2 tiles wide, centered on its 1-tile trunk column
    // (half a tile bleeds into each side neighbor) and 2 tiles tall above the
    // trunk row. So overlap can't be checked against a single tile — it's a
    // real pixel bounding-box test against every trunk within reach.
    drawTreeCanopyOverPlayer() {
        if (!player) return;
        const TS = CONFIG.TILE_SIZE;
        const trunk = SPRITES['tiles.tree_trunk_overworld'];
        const top = SPRITES[seasonalTreeTopKey()];
        if (!trunk || !top) return;

        const pScreenX = player.x * TS - cameraX;
        const pScreenY = player.y * TS - cameraY;
        const pLeft = pScreenX, pRight = pScreenX + TS;
        const pTop = pScreenY - TS, pBottom = pScreenY + TS;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = 1; dy <= 2; dy++) {
                const tx = player.x + dx, ty = player.y + dy;
                const col = this.tiles[tx];
                const tile = col ? col[ty] : null;
                if (!tile || tile.isTreeTop) continue;
                if (tile.type !== 'tree' && tile.type !== 'fir_tree') continue;

                const screenX = tx * TS - cameraX;
                const screenY = ty * TS - cameraY;
                const offsetX = screenX - (trunk.width - TS) / 2;
                const offsetY = screenY - (trunk.height - TS);
                const cLeft = offsetX, cRight = offsetX + top.width;
                const cTop = offsetY, cBottom = offsetY + top.height;

                const overlaps = pLeft < cRight && pRight > cLeft && pTop < cBottom && pBottom > cTop;
                if (!overlaps) continue;

                if (tile.depleted) tint(160, 160, 160);
                image(top, offsetX, offsetY, top.width, top.height);
                noTint();
            }
        }
    }

    // Draw an oversized decoration sprite (tree/rosebush) centered on its tile and
    // extending upward. Only the trunk/base tile draws; tree-top tiles are skipped.
    drawTallDecoration(x, y, tile) {
        if (!tile || tile.isTreeTop) return;
        const TS = CONFIG.TILE_SIZE;
        const screenX = x * TS;
        const screenY = y * TS;

        // Oak/fir share one overworld trunk; only the canopy on top varies by season.
        if (tile.type === 'tree' || tile.type === 'fir_tree') {
            const trunk = structureFrame('tiles.tree_trunk_overworld');
            if (!trunk) return;
            const offsetX = screenX - (trunk.w - TS) / 2;
            const offsetY = screenY - (trunk.h - TS);
            if (tile.depleted) tint(160, 160, 160);
            image(trunk.img, offsetX, offsetY, trunk.w, trunk.h, trunk.sx, 0, trunk.w, trunk.h);
            const top = structureFrame(seasonalTreeTopKey());
            if (top) image(top.img, offsetX, offsetY, top.w, top.h, top.sx, 0, top.w, top.h);
            noTint();
            return;
        }

        const key = TALL_SPRITE_TILES[tile.type];
        if (!key) return;
        const f = structureFrame(key);
        if (!f) return;
        if (tile.depleted) tint(160, 160, 160);
        const offsetX = screenX - (f.w - TS) / 2;
        const offsetY = screenY - (f.h - TS);
        image(f.img, offsetX, offsetY, f.w, f.h, f.sx, 0, f.w, f.h);
        noTint();
    }

    // Dynamic sun shadows for everything visible: tall flora (same sprites
    // drawTallDecoration uses), the player, and NPCs. Stamped to an offscreen
    // layer, then composited once at the sun's current strength.
    drawSunShadows(x0, y0, x1, y1) {
        if (this.kind !== 'island') return; // no sun underground
        const p = sunShadowParams();
        if (!p) return;
        const TS = CONFIG.TILE_SIZE;
        if (!_shadowLayer) {
            _shadowLayer = createGraphics(width, height);
            _shadowLayer.pixelDensity(1);
        }
        const L = _shadowLayer;
        L.clear();

        // Tall flora. Oak/fir composite the shared trunk with the seasonal canopy.
        for (let x = x0; x < x1; x++) {
            for (let y = y0; y < y1; y++) {
                const tile = this.tiles[x][y];
                if (!tile || tile.isTreeTop || !TALL_SPRITE_TILES[tile.type]) continue;
                let sil;
                if (tile.type === 'tree' || tile.type === 'fir_tree') {
                    const topKey = seasonalTreeTopKey();
                    sil = shadowSilhouette('tree|' + topKey,
                        [structureFrame0('tiles.tree_trunk_overworld'), structureFrame0(topKey)]);
                } else {
                    const sprKey = TALL_SPRITE_TILES[tile.type];
                    sil = shadowSilhouette(sprKey, [structureFrame0(sprKey)]);
                }
                if (!sil) continue;
                stampShadow(L, sil, x * TS + TS / 2 - cameraX, y * TS + TS - cameraY, sil.height, p);
            }
        }

        // Actors (a frozen first frame is plenty for a shadow).
        const charSource = (spr) => ({ img: spr, sx: 0, sy: 0, w: Math.min(CHAR_FW, spr.width), h: Math.min(CHAR_FH, spr.height) });
        const wholeSource = (spr) => ({ img: spr, sx: 0, sy: 0, w: spr.width, h: spr.height });
        const pSpr = SPRITES['sprites.player'];
        if (pSpr && pSpr.width) {
            const sil = shadowSilhouette('actor|player', [charSource(pSpr)]);
            if (sil) stampShadow(L, sil, player.x * TS + TS / 2 - cameraX, player.y * TS + TS - cameraY, sil.height, p);
        }
        if (typeof npcs !== 'undefined') {
            for (const npc of npcs) {
                if (!npc.isPresent) continue;
                const spr = SPRITES['sprites.' + npc.name.toLowerCase()];
                if (!spr || !spr.width) continue;
                const big = (npc.wTiles || 1) > 1 || (npc.hTiles || 2) > 2;
                const sil = shadowSilhouette('actor|' + npc.name, [big ? wholeSource(spr) : charSource(spr)]);
                if (!sil) continue;
                const w = (npc.wTiles || 1) * TS;
                stampShadow(L, sil, npc.gridX * TS + w / 2 - cameraX, npc.gridY * TS + TS - cameraY, sil.height, p);
            }
        }

        // Single composite. translate(-camera) is active, so (cameraX, cameraY)
        // lands at the screen origin.
        drawingContext.globalAlpha = p.alpha / 255;
        image(L, cameraX, cameraY);
        drawingContext.globalAlpha = 1;
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

        // Helper: draw the grass texture for tile (x,y). grass.png is one big 512×512
        // image (32×32 tiles); we sample the sub-region at the tile's world position so
        // the texture tiles seamlessly across the island instead of repeating per tile.
        function drawGrass() {
            const g = SPRITES[seasonalGrassKey()] || SPRITES['tiles.grass'];
            if (g) {
                const cols = Math.max(1, Math.floor(g.width / TS));
                const rows = Math.max(1, Math.floor(g.height / TS));
                const srcX = (((x % cols) + cols) % cols) * TS;
                const srcY = (((y % rows) + rows) % rows) * TS;
                image(g, screenX, screenY, TS, TS, srcX, srcY, TS, TS);
            } else {
                fill('#7CB342');
                rect(screenX, screenY, TS, TS);
            }
        }

        // Helper: draw a base terrain tile (grass or beach) under decorations
        function drawBase(baseType) {
            if (baseType === 'grass') { drawGrass(); return; }
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
            case 'cave_floor': {
                // Stone floor with a little speckle so it isn't flat.
                fill('#4A4640');
                rect(screenX, screenY, TS, TS);
                noStroke();
                fill('#544F48');
                if (tile.variant === 1) rect(screenX + 3, screenY + 9, 3, 2);
                else if (tile.variant === 2) rect(screenX + 10, screenY + 4, 2, 3);
                else if (tile.variant === 3) { rect(screenX + 6, screenY + 6, 2, 2); rect(screenX + 11, screenY + 11, 2, 2); }
                break;
            }
            case 'cave_wall': {
                // Dark rock with a lighter top bevel for a bit of depth.
                fill('#2A2622');
                rect(screenX, screenY, TS, TS);
                noStroke();
                fill('#3A352F');
                rect(screenX, screenY, TS, 3);
                fill('#211D19');
                rect(screenX, screenY + TS - 2, TS, 2);
                break;
            }
            case 'foundation': {
                // Pale flagstone pad where a building can be raised.
                fill('#6E6358');
                rect(screenX, screenY, TS, TS);
                noFill();
                stroke('#564C43');
                strokeWeight(1);
                rect(screenX + 0.5, screenY + 0.5, TS - 1, TS - 1);
                noStroke();
                break;
            }
            case 'sea': {
                const spr = SPRITES['tiles.waves'];
                if (spr) {
                    // waves.png layout (64×128, 16×16 tiles, 4 cols × 8 rows):
                    //   col 0 (x=0):  straight shore — 8 animation frames. Native orientation
                    //                 has land to the EAST (sand on the right, water on the left).
                    //   col 1 (x=16): corner — 8 animation frames. Native orientation has land in
                    //                 the SOUTH-EAST (sand bottom-right, water wrapping the NW).
                    //   col 2 (x=32): ocean — rows 5-7 are the plain looping water animation.
                    //   col 3 (x=48): pond shore — 8 animation frames (grass/stone bank).
                    function seaNeighborType(dx, dy) {
                        const nx = x + dx, ny = y + dy;
                        if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) return 'sea';
                        const t = world.tiles[nx][ny];
                        return t ? t.type : 'sea';
                    }
                    function isLandType(type) {
                        // The dock is a structure OVER water — sea beside it must not
                        // grow a sandy shoreline.
                        return type !== 'sea' && type !== 'pond_water' && type !== 'pond_shore' && type !== 'dock';
                    }
                    const northLand = isLandType(seaNeighborType(0, -1));
                    const southLand = isLandType(seaNeighborType(0, 1));
                    const westLand  = isLandType(seaNeighborType(-1, 0));
                    const eastLand  = isLandType(seaNeighborType(1, 0));
                    // Diagonal land neighbours — used to catch convex (outer) coast corners,
                    // where only the diagonal tile is land (e.g. the sea tile just off an
                    // island corner) and the two straight shores should meet.
                    const dNE = isLandType(seaNeighborType(1, -1));
                    const dNW = isLandType(seaNeighborType(-1, -1));
                    const dSE = isLandType(seaNeighborType(1, 1));
                    const dSW = isLandType(seaNeighborType(-1, 1));
                    const anyOrthoLand = northLand || southLand || eastLand || westLand;
                    const shoreFrame = floor(frameCount / 8) % 8;

                    function drawRotatedSprite(srcX, srcY, angle) {
                        push();
                        translate(screenX + TS / 2, screenY + TS / 2);
                        rotate(angle);
                        image(spr, -TS / 2, -TS / 2, TS, TS, srcX, srcY, TS, TS);
                        pop();
                    }

                    const nw = northLand && westLand;
                    const ne = northLand && eastLand;
                    const sw = southLand && westLand;
                    const se = southLand && eastLand;

                    if (nw || ne || sw || se) {
                        // Concave (inner) corner — land on two adjacent orthogonal sides.
                        // Native land is SE, so rotate from there:
                        //   land SE = 0, land SW = +90° CW, land NW = 180°, land NE = -90°.
                        const angle = se ? 0 : sw ? HALF_PI : nw ? PI : -HALF_PI;
                        drawRotatedSprite(16, shoreFrame * TS, angle);
                    } else if (!anyOrthoLand && (dNE || dNW || dSE || dSW)) {
                        // Convex (outer) corner — only a diagonal neighbour is land, so this
                        // is the tile just off an island corner where the two straight shores
                        // meet. Reuse the corner sprite, oriented toward the diagonal land.
                        const angle = dSE ? 0 : dSW ? HALF_PI : dNW ? PI : -HALF_PI;
                        drawRotatedSprite(16, shoreFrame * TS, angle);
                    } else if (northLand || southLand || westLand || eastLand) {
                        // Animated straight shore (col 0). Native land is East, so rotate from there:
                        //   land E = 0, land S = +90° CW, land W = 180°, land N = -90°.
                        const angle = eastLand ? 0 : southLand ? HALF_PI : westLand ? PI : -HALF_PI;
                        drawRotatedSprite(0, shoreFrame * TS, angle);
                    } else {
                        // Plain looping open-water animation: sea_overworld.png, frames laid out
                        // left-to-right from x=0, each a 16x16 tile.
                        const seaSpr = SPRITES['tiles.sea_overworld'];
                        if (seaSpr) {
                            const frames = Math.max(1, Math.floor(seaSpr.width / TS));
                            const oceanFrame = floor(frameCount / 8) % frames;
                            image(seaSpr, screenX, screenY, TS, TS, oceanFrame * TS, 0, TS, TS);
                        } else {
                            const oceanFrame = floor(frameCount / 8) % 3;
                            image(spr, screenX, screenY, TS, TS, 32, (5 + oceanFrame) * TS, TS, TS);
                        }
                    }
                } else {
                    // Fallback to solid color or old sprite
                    const fallback = SPRITES['tiles.water'];
                    if (fallback) {
                        image(fallback, screenX, screenY, TS, TS);
                    } else {
                        fill('#4A90C8');
                        rect(screenX, screenY, TS, TS);
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
                drawGrass();
                if (!SPRITES['tiles.grass']) {
                    fill('#8BC34A');
                    if (tile.variant === 1) {
                        rect(screenX + 4, screenY + 4, 2, 4);
                        rect(screenX + 10, screenY + 6, 2, 3);
                    } else if (tile.variant === 2) {
                        rect(screenX + 6, screenY + 3, 2, 5);
                        rect(screenX + 11, screenY + 5, 2, 4);
                    }
                }
                // Beach-edge overlay: a grass tile bordering beach draws a sand fringe
                // (beach_edge.png) over the grass, on the side(s) facing the beach.
                drawBeachEdgeOverlay(x, y, screenX, screenY, TS);
                break;
            }
            case 'tree':
            case 'fir_tree':
            case 'banana_tree':
            case 'palm_tree': {
                const isTop = tile.isTreeTop;
                // Oak/fir grow on grass; banana/palm grow on the beach.
                drawBase((tile.type === 'tree' || tile.type === 'fir_tree') ? 'grass' : 'beach');
                // The actual 32x48 sprite is wider/taller than its tile, so it is drawn in
                // a deferred pass (drawTallDecoration) AFTER all base terrain — otherwise the
                // next column's base would clip the sprite's right edge. Here we only draw a
                // vector fallback for when the sprite image failed to load.
                if (!SPRITES[TALL_SPRITE_TILES[tile.type]]) {
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
                // Draw grass base first, then rock sprite on top (sprite alone
                // rotates on Backflip Day so the grass stays put).
                drawBase('grass');
                const spr = SPRITES['tiles.rock'];
                withBackflip('tile:' + x + ',' + y, () => {
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
                });
                break;
            }
            case 'shiny_rock': {
                // Draw grass base first, then shiny rock sprite on top
                drawBase('grass');
                const sprShiny = SPRITES['tiles.shiny_rock'];
                withBackflip('tile:' + x + ',' + y, () => {
                const spr = sprShiny;
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
                });
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
                // 32x32 sprite, wider than its tile - draw grass base here; the sprite
                // itself is drawn in the deferred drawTallDecoration pass (see tree case)
                // so the neighbouring tile's base can't clip its right edge.
                drawBase('grass');
                if (!SPRITES['tiles.rosebush']) {
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
                // Legacy small pond tile — draw grass base, then water sprite on top
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
            case 'pond': {
                // The pond sprite is drawn later as one large overlay from pondOrigin.
                // This pass only provides grass underneath the transparent PNG.
                drawBase('grass');
                break;
            }
            case 'dock': {
                // The dock sprite is drawn later as one large overlay from dockOrigin.
                // This pass only provides sand/water underneath the transparent PNG.
                if (islandZone(x, y) === 'beach') drawBase('beach');
                else {
                    // Same animated open-water frames as the surrounding sea, so the
                    // water under the dock doesn't read as a flat blue rectangle.
                    const seaSpr = SPRITES['tiles.sea_overworld'];
                    if (seaSpr) {
                        const frames = Math.max(1, Math.floor(seaSpr.width / TS));
                        const oceanFrame = floor(frameCount / 8) % frames;
                        image(seaSpr, screenX, screenY, TS, TS, oceanFrame * TS, 0, TS, TS);
                    } else { fill('#4A90C8'); noStroke(); rect(screenX, screenY, TS, TS); }
                }
                break;
            }
            case 'pond_water': {
                // Legacy pond (pre single-image): a 4×4 interior image from its origin.
                if (tile.pondOrigin) {
                    const spr = SPRITES['tiles.pond'];
                    if (spr) image(spr, screenX, screenY, TS * 4, TS * 4);
                    else { fill('#4A90C8'); rect(screenX, screenY, TS * 4, TS * 4); }
                }
                break;
            }
            case 'pond_shore': {
                // Legacy bank tile (pre single-image pond). Newer ponds bake banks into
                // the pond image, so just show grass under any leftover shore tiles.
                drawBase('grass');
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
                                solid: false,
                                depleted: tile.depleted || false,
                                respawnAt: tile.respawnAt || null
                            };
                        } else if (topTile && topTile.isTreeTop) {
                            topTile.solid = false;
                        }
                    }
                }
                // Canopy tiles are passable (see placeTree) so the player can walk under them.
                if (tile.type === 'tree' && tile.isTreeTop) {
                    tile.solid = false;
                }
                // v5 saves may still have removed flower/water decorations.
                // (Tulips are now valid harvestable content again.)
                if (tile.type === 'flower' || tile.type === 'water') {
                    this.tiles[x][y] = { type: 'grass', variant: 0 };
                }
            }
        }
    }
}

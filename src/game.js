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
const MENU_TABS = ['Inventory', 'Crafting', 'Treasure', 'Gardening', 'Magic', 'Friends', 'Almanac', 'Settings'];
let menuTab = 0;

// The player character is always called "Dreamer" wherever a name is needed
// (house labels, menus, generated dialogue).
const PLAYER_NAME = 'Dreamer';

// Game configuration
const CONFIG = {
    TILE_SIZE: 16,
    WORLD_WIDTH: 100,
    WORLD_HEIGHT: 100,
    // Internal render resolution. Kept low (SNES-ish: 20x12 tiles) so tiles read
    // large; CSS stretches this buffer to the window as a pure pixelated zoom.
    // Must stay 5:3 or the index.html aspect ratio needs updating too.
    // ponytail: tune this pair for zoom level — 400x240 = gentler, 256x192 = tighter.
    CANVAS_WIDTH: 320,
    CANVAS_HEIGHT: 192,
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
    'tiles.path':             'assets/tiles/path.png',
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
    'tiles.boulder':          'assets/tiles/boulder.png',
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
    'sprites.player':         'assets/sprites/player.png',
    'sprites.mubaba':         'assets/sprites/npcs/mubaba.png',
    // Underground building art + fortress scene props. Missing files hit the
    // error callback, get nulled, and colored fallbacks draw instead.
    'sprites.ug_mubaba_fortress': 'assets/sprites/buildings/mubaba_fortress.png',
    'sprites.ug_electric_temple': 'assets/sprites/buildings/electric_temple.png',
    'sprites.ug_gettin':          'assets/sprites/buildings/gettin_place.png',
    'sprites.ug_black_goddess':   'assets/sprites/buildings/black_goddess.png',
    'sprites.ug_inner_temple':    'assets/sprites/buildings/inner_temple.png',
    'sprites.ug_recycle_bin':     'assets/sprites/buildings/recycle_bin.png',
    'sprites.ug_stimmy_tims':     'assets/sprites/buildings/stimmy_tims.png',
    'sprites.ug_bottomless_pit':  'assets/sprites/buildings/bottomless_pit.png',
    'sprites.magic_circle':       'assets/sprites/effects/magic_circle.png',
    'sprites.turtle':         'assets/sprites/turtle.png',
    'sprites.island_god':     'assets/sprites/island_god.png',
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
    'tiles.tunnel_surface':   'assets/tiles/tunnel_surface.png',
    'tiles.tunnel_ug':        'assets/tiles/tunnel_ug.png',
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
let islandGod = null; // static giant turtle visitor for Day of the Island God
let lostMail = null; // { day, letters: [{x,y,npcId,address,isPresent,delivered}], allDeliveredNotified }
let heldLostMailLetter = null; // the Lost Mail Day letter currently in the player's hand, or null
const TILE_SOLID = new Set(['sea', 'water', 'pond_water', 'tree', 'fir_tree', 'banana_tree', 'palm_tree', 'rock', 'shiny_rock', 'rosebush', 'toast_target', 'ug_wall', 'ug_pit']);

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
    'sprites.ug_electric_temple': { frames: 2, frameMs: 400 },
    'sprites.ug_mubaba_fortress': { frames: 2, frameMs: 400 },
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
    if (currentMapId === 'underground') return 'tiles.grass_underworld';
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
    flea_lily_seed: { name: 'Flea Lily Seed', category: 'material', maxStack: 99, color: '#8E24AA', desc: 'A rare seed bartered from the Flealess Market. Plant it on tilled soil.' },
    bird_poop:   { name: 'Bird Poop',   category: 'material', maxStack: 99, color: '#E0E0E0', desc: 'May contain seeds.' },
    rose:        { name: 'Rose',        category: 'gift',     maxStack: 99, color: '#E53935', desc: 'A freshly picked red rose.' },
    tulip:       { name: 'Tulip',       category: 'gift',     maxStack: 99, color: '#F5F5F5', desc: 'A freshly picked tulip.' },
    thatch:      { name: 'Thatch',      category: 'block',    maxStack: 99, color: '#D4A76A', desc: 'Building material.' },
    banana:      { name: 'Banana',      category: 'gift',     maxStack: 99, color: '#FFD93D', desc: 'Tasty beach fruit.' },
    palm_frond:  { name: 'Palm Frond',  category: 'material', maxStack: 99, color: '#4CAF50', desc: 'A broad leaf from a palm tree.' },
    bean:        { name: 'Bean',        category: 'gift',     maxStack: 99, color: '#D4A76A', desc: 'An edible seed you can eat or plant.' },
    berry:       { name: 'Berry',       category: 'gift',     maxStack: 99, color: '#C62828', desc: 'A sweet gift from the garden.' },
    flea_lily_bloom: { name: 'Flea Lily Bloom', category: 'gift', maxStack: 99, color: '#AB47BC', desc: 'A strange lavender bloom that grew from a market seed. Neighbors seem to love it.' },
    gettin_stick:{ name: "Gettin' Stick", category: 'tool', maxStack: 1, color: '#D4A76A', desc: 'A stick with a magnet. Pulls treasure from the water!', durability: 3 },
    axe:         { name: 'Axe',         category: 'tool',     maxStack: 1, color: '#7CB342', desc: 'Chops wood faster.', durability: 3 },
    hoe:         { name: 'Hoe',         category: 'tool',     maxStack: 1, color: '#A1887F', desc: 'Tills soil.', durability: 3 },
    pickaxe:     { name: 'Pickaxe',     category: 'tool',     maxStack: 1, color: '#B0BEC5', desc: 'Mines rocks.', durability: 3 },
    shovel:      { name: 'Shovel',      category: 'tool',     maxStack: 1, color: '#8B5A2B', desc: 'Carve a dirt path across the grass. Face grass and use.', unbreakable: true },
    grass_seed:  { name: 'Grass Seed',  category: 'tool',     maxStack: 1, color: '#7CB342', desc: 'Scatter to turn a dirt path back into grass. Face a path and use.', unbreakable: true },
    sturdy_pickaxe: { name: 'Sturdy Pickaxe', category: 'tool', maxStack: 1, color: '#B0BEC5', desc: 'A pickaxe bartered from a traveling merchant. It never seems to dull.', unbreakable: true },
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
    // --- Peak Yeesh holiday furniture pool (Papa Yeesh's midnight reward) ---
    yule_tree:       { name: 'Yule Tree',        category: 'block', maxStack: 99, color: '#1B5E20', desc: 'A decorated evergreen, still smelling of the outdoors.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    brick_fireplace: { name: 'Brick Fireplace',  category: 'block', maxStack: 99, color: '#8D4E32', desc: 'A cozy brick-faced fireplace, an Everburn keepsake.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },
    garland:         { name: 'Garland',          category: 'block', maxStack: 99, color: '#2E7D32', desc: 'A set of five festive garlands for the wall.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    wreath:          { name: 'Wreath',           category: 'block', maxStack: 99, color: '#C62828', desc: 'An evergreen wreath for the door or wall.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    mistletoe_sprig: { name: 'Mistletoe Sprig',  category: 'block', maxStack: 99, color: '#7CB342', desc: 'A small sprig to hang overhead.', home: { cls: 'decoration', placeOn: 'wall', solid: false } },
    candle_log:      { name: 'Candle Log',       category: 'block', maxStack: 99, color: '#EF9A9A', desc: 'A long-burning candle set into a birch log.', home: { cls: 'decoration', placeOn: 'floor', solid: false } },
    holly_vase:      { name: 'Holly Vase',       category: 'block', maxStack: 99, color: '#AD1457', desc: 'A vase of holly sprigs for the table.', home: { cls: 'decoration', placeOn: 'floor', solid: false } },
    yule_goat_plush: { name: 'Yule Goat Plush',  category: 'block', maxStack: 99, color: '#F5DEB3', desc: 'A small straw goat, a solstice keepsake.', home: { cls: 'decoration', placeOn: 'floor', solid: false } },
    // --- Flealess Market barter reward ---
    flealess_statue: { name: 'Flealess Statue', category: 'block', maxStack: 1, color: '#B0A18F', desc: 'An odd little statue bartered from a traveling merchant. Decorate your home with it.', home: { cls: 'furniture', placeOn: 'floor', solid: true } },

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
    // --- Underground city buildings ---
    // Types without sprite files yet: Building.draw falls back to a colored
    // block tinted by `color`. Reskin as art lands.
    ug_mubaba_fortress: { spriteKey: 'sprites.ug_mubaba_fortress', name: "Mubaba's Fortress",   color: '#4A0D67', w: 8, h: 8, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_gettin:          { spriteKey: 'sprites.ug_gettin',          name: "Gettin' Place",       color: '#5A7E9B', w: 8, h: 8, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_recycle_bin:     { spriteKey: 'sprites.ug_recycle_bin',     name: 'Recycle Bin',         color: '#4C8A4C', w: 8, h: 8, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_inner_temple:    { spriteKey: 'sprites.ug_inner_temple',    name: 'The Inner Temple',    color: '#8B8B9B', w: 8, h: 8, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_electric_temple: { spriteKey: 'sprites.ug_electric_temple', name: 'The Electric Temple', color: '#C9B23A', w: 8, h: 8, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },
    ug_black_goddess:   { spriteKey: 'sprites.ug_black_goddess',   name: 'The Black Goddess',   color: '#26202B', w: 8, h: 8, doorWidth: 2, interiorW: 9, interiorFloorRows: 6 },
    ug_stimmy_tims:     { spriteKey: 'sprites.ug_stimmy_tims',     name: "Stimmy Tim's",        color: '#B3574D', w: 8, h: 5, doorWidth: 2, interiorW: 8, interiorFloorRows: 5 },
    ug_bottomless_pit:  { spriteKey: 'sprites.ug_bottomless_pit',  name: 'A Bottomless Pit',    color: '#111111', w: 4, h: 4, doorWidth: 2, interiorW: 7, interiorFloorRows: 4 },  // 64x64 sprite
    // Player-built second shelter from Castle of Sticks Day. Placeholder
    // colored-block fallback until twig tower art lands.
    twig_tower:         { spriteKey: 'sprites.twig_tower',         name: 'Twig Tower',          color: '#9A7B4F', w: 4, h: 5, doorWidth: 1, interiorW: 5, interiorFloorRows: 3 }
};

// The eight underground building identities (see underWorldBldgs.rtf).
const UNDERGROUND_BUILDING_TYPES = ['ug_mubaba_fortress', 'ug_gettin', 'ug_recycle_bin', 'ug_inner_temple', 'ug_electric_temple', 'ug_black_goddess', 'ug_stimmy_tims', 'ug_bottomless_pit'];
// Fixed at city creation — randomization retired. The seven buildings with
// finished art stand now; the Bottomless Pit fills the last pad when it lands.
const UNDERGROUND_STARTING_BUILDINGS = [
    { type: 'ug_inner_temple',    padIndex: 0 },
    { type: 'ug_mubaba_fortress', padIndex: 1 },
    { type: 'ug_electric_temple', padIndex: 2 },
    { type: 'ug_gettin',          padIndex: 3 },
    { type: 'ug_stimmy_tims',     padIndex: 4 },
    { type: 'ug_recycle_bin',     padIndex: 5 },
    { type: 'ug_black_goddess',   padIndex: 6 }
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
        // Stimmy Tim's gets its full cafe fit-out (see cafe.js).
        if (this.type === 'ug_stimmy_tims' && typeof furnishStimmyCafe === 'function') {
            furnishStimmyCafe(this);
        }
        // The Black Goddess gets its club fit-out (see club.js).
        if (this.type === 'ug_black_goddess' && typeof furnishBlackGoddess === 'function') {
            furnishBlackGoddess(this);
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
                text(buildingDisplayName(this), screenX + w / 2, screenY + h / 2 - 4);
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

// Slug used to build a per-NPC sprite/portrait key from a display name, e.g.
// "Sir Cogs-a-Lot" -> "sir_cogs_a_lot". Used by the loader below AND by every
// draw-time lookup (entities.js, the shadow pass) so keys always match.
function npcSlug(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

// Load one image into SPRITES[key]; missing files null out (colored fallback).
function loadSpriteURL(key, path) {
    const url = path + (path.includes('?') ? '&' : '?') + 'v=' + ASSET_VERSION;
    SPRITES[key] = loadImage(url, () => {}, () => {
        console.warn(`Failed to load sprite ${key} from ${url}`);
        SPRITES[key] = null;
    });
}

function preload() {
    for (const [key, path] of Object.entries(SPRITE_DEFS)) {
        loadSpriteURL(key, path);
    }
    // Neighbor + permanent-NPC art, keyed by name slug so the draw-time lookups
    // resolve. Two sprites each: a 16x32 overworld sprite (assets/sprites/npcs/)
    // and a 64x64 talking portrait (assets/sprites/portraits/). Missing files
    // fall back to the colored rect / silhouette, same as everything else.
    const roamers   = [...NPC_DEFS.map(d => d.name), 'Yogatron'];
    const portraits = [...NPC_DEFS.map(d => d.name), 'Yogatron', 'Stan', 'Bob'];
    for (const name of roamers) {
        loadSpriteURL('sprites.' + npcSlug(name), 'assets/sprites/npcs/' + npcSlug(name) + '.png');
    }
    for (const name of portraits) {
        loadSpriteURL('portraits.' + npcSlug(name), 'assets/sprites/portraits/' + npcSlug(name) + '.png');
    }
    // Load the underworld layout CSV so generateUnderground() can run synchronously.
    // Cache-busted like the script tags in index.html, so layout edits show up
    // on plain reload.
    underworldCSVLines = loadStrings('underworld.csv?v=' + Date.now());
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

    // Sleep transition wipe, on top of whatever state drew.
    updateSleepFade();
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
        if (tile.type === 'wall' || tile.type === 'bed' || isSolidHomeTile(tile) ||
            (typeof isSolidCafeTile === 'function' && isSolidCafeTile(tile)) ||
            (typeof isSolidClubTile === 'function' && isSolidClubTile(tile))) {
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
    if (typeof drawCutouts === 'function') drawCutouts();
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

    // ===== ISLAND GOD: Day of the Island God visitor =====
    updateIslandGod();
    drawIslandGod();

    // ===== LOST MAIL DAY: beach letters =====
    updateLostMail();
    drawLostMail();

    // ===== WELL-WISHING GARDEN: gardener + door flowers =====
    updateWellWishGarden();
    drawWellWishGarden();

    // ===== THE PETAL PATH MAKER: path-artist + anchor petals =====
    updatePetalPath();
    drawPetalPath();

    // ===== MEMORY LANTERN NIGHT: dusk shore lanterns =====
    updateMemoryLanternNight();
    drawMemoryLanternNight();

    // ===== THE PICNIC RESET: organizer + neighbor picnic line =====
    updatePicnicReset();
    drawPicnicReset();

    // ===== THE NEIGHBORHOOD TIME CAPSULE: historian + buried box =====
    updateTimeCapsuleHistorian();
    drawTimeCapsuleHistorian();

    // ===== TOURIST TIME!: beached tourists near the dock =====
    updateTouristTime();
    drawTouristTime();

    // ===== PEAK SAUCY: bonfire elder serving sweet tea =====
    updatePeakSaucy();
    drawPeakSaucy();

    // ===== COOL VALLEY: dusk memory walk =====
    updateCoolValley();
    drawCoolValley();

    // ===== SWEET VALLEY: beach altar build + offering =====
    updateSweetValley();
    drawSweetValley();

    // ===== PEAK YEESH: Everburn bonfire + silent Papa Yeesh visitor =====
    updatePeakYeesh();
    drawPeakYeesh();

    // ===== THE FLEALESS MARKET: traveling merchant near the dock =====
    updateFlealessMarket();
    drawFlealessMarket();

    // ===== FAMILIAR SELLER: druid visitor + persistent companion =====
    updateFamiliarSeller();
    drawFamiliarSeller();
    updateFamiliar(deltaTime);
    drawFamiliar();

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
        tree.shake.text = 'One shake, coming right up! Drink deep and flex proud!';
        tree.shake.choices = [
            { text: 'Thanks!', next: null, friendshipDelta: 1, action: 'shake' }
        ];
    } else {
        tree.shake.text = 'I already handed you today\'s shake, friend. One per abdominal day is the rule!';
        tree.shake.choices = [
            { text: 'Fair enough.', next: null, friendshipDelta: 0 }
        ];
    }

    if (typeof almDiscover === 'function') almDiscover('char:yogatron');
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
                    tree.shake.text = 'One shake, coming right up! Drink deep and flex proud!';
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

// ===== ISLAND GOD (Day of the Island God) =====
// A static, non-moving, non-speaking giant turtle. Interacting with it just
// shows one-off flavor text — no dialogue tree needed for a statue.
const ISLAND_GOD_LINES = [
    'You gaze upon the Island God. Something in your chest goes very quiet.',
    'The Island God does not move. You feel, somehow, seen.',
    'You stare at the ancient shell. A gull lands on it and immediately regrets it.',
    'The Island God says nothing. You bow anyway. It felt right.'
];

function findEastBeachTile() {
    for (let x = CONFIG.WORLD_WIDTH - 1; x >= 0; x--) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (!t || t.type !== 'beach') continue;
            if (isSolidTile(x, y) || buildingAt(x, y)) continue;
            if (typeof npcAt === 'function' && npcAt(x, y)) continue;
            return { x, y };
        }
    }
    return null;
}

function spawnIslandGod() {
    if (islandGod && islandGod.isPresent) return;
    if (typeof world === 'undefined' || !world) return;
    const holiday = getCurrentHoliday();
    if (!holiday || holiday.name !== 'Day of the Island God') return;

    const spot = findEastBeachTile();
    if (!spot) return;

    islandGod = { gridX: spot.x, gridY: spot.y, isPresent: true };
    notify('The Island God has risen on the east beach.', 4000);
}

function despawnIslandGod() {
    if (!islandGod) return;
    islandGod.isPresent = false;
    islandGod = null;
}

function updateIslandGod() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Day of the Island God') {
        if (islandGod && islandGod.isPresent) despawnIslandGod();
        return;
    }
    if (!islandGod || !islandGod.isPresent) spawnIslandGod();
}

function drawIslandGod() {
    if (!islandGod || !islandGod.isPresent) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = islandGod.gridX * TS - cameraX;
    const sy = islandGod.gridY * TS - cameraY;
    const SPAN = TS * 3; // looms three tiles wide/tall
    const spr = SPRITES['sprites.island_god'];
    if (spr) {
        image(spr, sx - SPAN / 3, sy - SPAN + TS, SPAN, SPAN);
    } else {
        noStroke();
        fill('#2E8B57');
        ellipse(sx + TS / 2, sy + TS / 2, SPAN * 0.7, SPAN * 0.5);
        fill('#1B5E3F');
        ellipse(sx + TS / 2, sy + TS / 2 - SPAN * 0.08, SPAN * 0.45, SPAN * 0.32);
    }
}

function isFacingIslandGod() {
    if (!islandGod || !islandGod.isPresent || !player) return false;
    const facing = player.getFacingTile();
    if (!facing) return false;
    return facing.x === islandGod.gridX && facing.y === islandGod.gridY;
}

function tryTalkToIslandGod() {
    if (!islandGod || !islandGod.isPresent) return false;
    if (!isFacingIslandGod()) return false;
    notify(ISLAND_GOD_LINES[Math.floor(Math.random() * ISLAND_GOD_LINES.length)], 4000);
    return true;
}

// ===== LOST MAIL DAY =====
// Sealed letters wash up on the beach, each addressed with a vague "dream
// clue" pointing at one random neighbor. Picking one up is a temporary held
// item (heldLostMailLetter), not an inventory slot — delivering it is tried
// before dialogue opens at both interact call sites, same hook point as
// Island God/Yogatron.
const LOST_MAIL_COUNT = 4;
const LOST_MAIL_ADDRESSES = [
    'To: The One Who Talks to Vegetables',
    'To: The Keeper of Moon Opinions',
    "To: The Island's Loudest Whistler",
    'To: Whoever Is Standing Near the Big Rock',
    'To: The One Who Always Waters First',
    'To: Whoever Feeds the Loudest Bird',
    'To: The Keeper of the Best Naps',
    'To: Whoever Left Footprints at Midnight'
];
const LOST_MAIL_MATCH_LINES = [
    ' unfolds the letter and goes quiet for a second. "This... is exactly what I needed to hear today."',
    ' reads it twice, then grins. "Only I would get a letter like this."',
    ' presses the letter to their chest. "Someone out there gets me."'
];
const LOST_MAIL_MISMATCH_LINES = [
    ' squints at the letter. "This isn\'t for me," they say, and hand it back.',
    ' reads a line, frowns politely, and returns it. "Wrong door, I think."',
    ' shrugs. "Sounds like someone else\'s dream," they say, handing it back.'
];

function findLostMailBeachSpots(count) {
    const spots = [];
    let attempts = 0;
    while (spots.length < count && attempts < 500) {
        attempts++;
        const x = Math.floor(Math.random() * CONFIG.WORLD_WIDTH);
        const y = Math.floor(Math.random() * CONFIG.WORLD_HEIGHT);
        const t = world.tiles[x] && world.tiles[x][y];
        if (!t || t.type !== 'beach') continue;
        if (isSolidTile(x, y) || buildingAt(x, y)) continue;
        if (typeof npcAt === 'function' && npcAt(x, y)) continue;
        if (spots.some(s => Math.abs(s.x - x) + Math.abs(s.y - y) < 4)) continue;
        spots.push({ x, y });
    }
    return spots;
}

function spawnLostMail() {
    if (!world || typeof npcs === 'undefined' || npcs.length === 0) return;
    const spots = findLostMailBeachSpots(LOST_MAIL_COUNT);
    if (spots.length === 0) return;
    const addressPool = LOST_MAIL_ADDRESSES.slice();
    const npcPool = npcs.slice();
    const letters = spots.map(spot => {
        const addrIdx = Math.floor(Math.random() * addressPool.length);
        const address = addressPool.splice(addrIdx, 1)[0] || 'To: A Friend, Probably';
        const npcIdx = Math.floor(Math.random() * npcPool.length);
        const npc = npcPool.splice(npcIdx, 1)[0] || npcs[Math.floor(Math.random() * npcs.length)];
        return { x: spot.x, y: spot.y, npcId: npc.id, address, isPresent: true, delivered: false };
    });
    lostMail = { day: world.day, letters, allDeliveredNotified: false };
    heldLostMailLetter = null;
    notify('Crates of undelivered letters washed up on the beach. Find one and deliver it to the right neighbor.', 4500);
}

function updateLostMail() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Lost Mail Day') {
        if (lostMail) { lostMail = null; heldLostMailLetter = null; }
        return;
    }
    if (!world) return;
    if (!lostMail || lostMail.day !== world.day) spawnLostMail();
}

function drawLostMail() {
    if (!lostMail) return;
    const TS = CONFIG.TILE_SIZE;
    const spr = SPRITES['sprites.letter'];
    for (const letter of lostMail.letters) {
        if (!letter.isPresent) continue;
        const sx = letter.x * TS - cameraX;
        const sy = letter.y * TS - cameraY;
        if (spr) {
            image(spr, sx, sy, TS, TS);
        } else {
            noStroke();
            fill('#F5E6C8');
            rectMode(CORNER);
            rect(sx + 3, sy + 5, TS - 6, TS - 10, 2);
            stroke('#B0895A');
            strokeWeight(1);
            line(sx + 3, sy + 5, sx + TS / 2, sy + TS / 2 - 1);
            line(sx + TS - 3, sy + 5, sx + TS / 2, sy + TS / 2 - 1);
            noStroke();
        }
    }
}

function findFacingLostMailLetter() {
    if (!lostMail || !player) return null;
    const facing = player.getFacingTile();
    if (!facing) return null;
    return lostMail.letters.find(l => l.isPresent && l.x === facing.x && l.y === facing.y) || null;
}

// Picking a letter up off the beach (holiday interaction, tried before harvest).
function tryTalkToLostMail() {
    if (!lostMail || heldLostMailLetter) return false;
    const letter = findFacingLostMailLetter();
    if (!letter) return false;
    letter.isPresent = false;
    heldLostMailLetter = letter;
    notify('You picked up a sealed letter. "' + letter.address + '"', 4000);
    return true;
}

// Delivering a held letter to a neighbor (tried before dialogue opens). No
// failure state: a wrong neighbor politely hands it back and it stays held.
function tryDeliverLostMailLetter(npc) {
    if (!heldLostMailLetter || !npc) return false;
    const letter = heldLostMailLetter;
    if (npc.id === letter.npcId) {
        const line = LOST_MAIL_MATCH_LINES[Math.floor(Math.random() * LOST_MAIL_MATCH_LINES.length)];
        notify(npc.name + line + ' Friendship +3.', 4500);
        if (typeof npc.gainGift === 'function') npc.gainGift(3);
        letter.delivered = true;
        heldLostMailLetter = null;
        if (lostMail && !lostMail.allDeliveredNotified && lostMail.letters.every(l => l.delivered)) {
            lostMail.allDeliveredNotified = true;
            notify('A neighbor mentions a "return address" on one of the letters — an address that does not exist on this island.', 5000);
        }
    } else {
        const line = LOST_MAIL_MISMATCH_LINES[Math.floor(Math.random() * LOST_MAIL_MISMATCH_LINES.length)];
        notify(npc.name + line, 4000);
    }
    return true;
}

// ===== OUTDOOR DECOR (shared by Well-Wishing Garden & The Petal Path Maker) =====
// A temporary flower placed at a specific outdoor tile for the rest of the
// holiday, purely decorative. Distinct from the real `outdoor:`-tagged ITEMS
// (potted trees/shacks, see tryPlaceMovedTree/tryPlaceNeighborShack above)
// which permanently mutate the map — these never touch world.tiles and just
// vanish when the holiday ends, same as islandGod/lostMail.
function drawFlowerDecor(x, y) {
    const TS = CONFIG.TILE_SIZE;
    const sx = x * TS - cameraX, sy = y * TS - cameraY;
    const spr = SPRITES['sprites.flower'];
    if (spr) {
        image(spr, sx, sy, TS, TS);
    } else {
        noStroke();
        fill('#F06292');
        ellipse(sx + TS / 2, sy + TS / 2, TS * 0.5, TS * 0.5);
        fill('#FFEB3B');
        ellipse(sx + TS / 2, sy + TS / 2, TS * 0.18, TS * 0.18);
    }
}

// Radial search for a clear grass/beach tile near (cx, cy), r stepping from minR to maxR.
function findClearGroundNear(cx, cy, minR, maxR) {
    for (let r = minR; r <= maxR; r++) {
        for (let a = 0; a < 8; a++) {
            const rad = a * Math.PI / 4;
            const tx = Math.round(cx + r * Math.cos(rad));
            const ty = Math.round(cy + r * Math.sin(rad));
            if (tx < 1 || tx >= CONFIG.WORLD_WIDTH - 1 || ty < 1 || ty >= CONFIG.WORLD_HEIGHT - 1) continue;
            const t = world.tiles[tx] && world.tiles[tx][ty];
            if (!t || (t.type !== 'grass' && t.type !== 'beach')) continue;
            if (isSolidTile(tx, ty) || buildingAt(tx, ty)) continue;
            if (typeof npcAt === 'function' && npcAt(tx, ty)) continue;
            return { x: tx, y: ty };
        }
    }
    return null;
}

// ===== WELL-WISHING GARDEN =====
// A visiting gardener hands the player one potted flower a day (temporary
// held item, same pattern as Lost Mail Day's letters). Plant it at any
// neighbor's front-door tile, precomputed once per morning from that
// neighbor's home Building via findExteriorStandingTile(). The thank-you
// reaction lives in dialogue.js's getHolidayGreetingPrefix, same hook point
// as Hoggy's Birthday / Turtle Crossing Guard Day.
let wellWishGardener = null; // { x, y }
let wellWishGarden = null; // { day, spots:[{npcId,npcName,x,y,filled,thanked}], gaveFlowerToday }
let heldWellWishFlower = false;

function buildWellWishSpots() {
    const spots = [];
    if (typeof buildings === 'undefined' || typeof npcs === 'undefined') return spots;
    for (const npc of npcs) {
        if (!npc.isPresent || !npc.hasHome) continue;
        const b = buildings.find(bl => bl.owner === npc.id);
        if (!b) continue;
        const tile = findExteriorStandingTile(b);
        if (!tile) continue;
        spots.push({ npcId: npc.id, npcName: npc.name, x: tile.x, y: tile.y, filled: false, thanked: false });
    }
    return spots;
}

function spawnWellWishGarden() {
    if (!world || typeof npcs === 'undefined') return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    wellWishGardener = findClearGroundNear(dock.x, dock.y, 1, 10);
    wellWishGarden = { day: world.day, spots: buildWellWishSpots(), gaveFlowerToday: false };
    heldWellWishFlower = false;
    notify('A traveling gardener has set up near the dock with a cart of potted flowers.', 4500);
}

function updateWellWishGarden() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Well-Wishing Garden') {
        if (wellWishGarden) { wellWishGarden = null; wellWishGardener = null; heldWellWishFlower = false; }
        return;
    }
    if (!world) return;
    if (!wellWishGarden || wellWishGarden.day !== world.day) spawnWellWishGarden();
}

function drawWellWishGarden() {
    if (!wellWishGarden) return;
    const TS = CONFIG.TILE_SIZE;
    if (wellWishGardener) {
        const sx = wellWishGardener.x * TS - cameraX, sy = wellWishGardener.y * TS - cameraY;
        noStroke();
        fill('#8D6E63');
        rect(sx, sy + TS * 0.3, TS, TS * 0.7, 2);
        fill('#F06292');
        ellipse(sx + TS * 0.3, sy + TS * 0.25, TS * 0.3, TS * 0.3);
        fill('#FFEB3B');
        ellipse(sx + TS * 0.7, sy + TS * 0.25, TS * 0.3, TS * 0.3);
    }
    for (const spot of wellWishGarden.spots) {
        if (spot.filled) drawFlowerDecor(spot.x, spot.y);
    }
}

function isFacingWellWishGardener() {
    if (!wellWishGardener || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === wellWishGardener.x && facing.y === wellWishGardener.y;
}

function tryTalkToWellWishGardener() {
    if (!wellWishGarden || !isFacingWellWishGardener()) return false;
    if (heldWellWishFlower) {
        notify('"You\'re already holding one of my well-wishing flowers!"', 3500);
    } else if (wellWishGarden.gaveFlowerToday) {
        notify('"I\'m fresh out for today, come back tomorrow for more flowers to wish with."', 4000);
    } else {
        heldWellWishFlower = true;
        wellWishGarden.gaveFlowerToday = true;
        notify('The gardener hands you a potted flower. "Plant it near someone\'s door as a silent well-wish."', 4500);
    }
    return true;
}

// Placing the flower at a facing tile (tried before harvest, not tied to an NPC).
function tryPlaceWellWishFlower() {
    if (!wellWishGarden || !heldWellWishFlower || !player) return false;
    const facing = player.getFacingTile();
    if (!facing) return false;
    const spot = wellWishGarden.spots.find(s => s.x === facing.x && s.y === facing.y);
    if (!spot) return false;
    if (spot.filled) {
        notify("There's already a flower there.", 3000);
    } else {
        spot.filled = true;
        heldWellWishFlower = false;
        notify('You planted the flower by the door as a silent well-wish.', 3500);
    }
    return true;
}

// ===== THE PETAL PATH MAKER =====
// A visiting path-artist hands out petals (temporary held item) to connect
// the dock to the player's home with a line of anchor tiles, interpolated
// between the two landmarks and snapped to clear ground. Neighbors trickle
// in petals of their own over the day; once every anchor is filled the path
// "completes" and standing on it near a neighbor triggers a one-time comment
// + small friendship boost.
const PETAL_PATH_ANCHOR_COUNT = 5;
let petalPathArtist = null; // { x, y }
let petalPath = null; // { day, anchors:[{x,y,filled}], nextNeighborFillAt, walkedWith:Set<npcId> }
let heldPetal = false;
const PETAL_PATH_WALK_LINES = [
    'Ooh, follow the pink! They hop along the petals beside you.',
    'This path smells incredible, they say, walking a few steps with you.',
    'I helped plant one of these, they say, pointing proudly at a petal.'
];

function findPetalPathAnchors() {
    if (!world) return null;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    const home = (typeof getPlayerShack === 'function') ? getPlayerShack() : null;
    const end = home ? findExteriorStandingTile(home)
        : findClearGroundNear(Math.floor(CONFIG.WORLD_WIDTH / 2), Math.floor(CONFIG.WORLD_HEIGHT / 2), 0, 20);
    if (!end) return null;
    const anchors = [];
    for (let i = 1; i <= PETAL_PATH_ANCHOR_COUNT; i++) {
        const t = i / (PETAL_PATH_ANCHOR_COUNT + 1);
        const ix = Math.round(dock.x + (end.x - dock.x) * t);
        const iy = Math.round(dock.y + (end.y - dock.y) * t);
        const spot = findClearGroundNear(ix, iy, 0, 6);
        if (spot && !anchors.some(a => a.x === spot.x && a.y === spot.y)) {
            anchors.push({ x: spot.x, y: spot.y, filled: false });
        }
    }
    return anchors.length >= 3 ? anchors : null;
}

function spawnPetalPath() {
    if (!world) return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    const anchors = findPetalPathAnchors();
    if (!anchors) return;
    petalPathArtist = findClearGroundNear(dock.x, dock.y, 1, 10);
    petalPath = { day: world.day, anchors, nextNeighborFillAt: millis() + 15000, walkedWith: new Set() };
    heldPetal = false;
    notify('A traveling path-artist wants to connect the dock to your doorstep with flower petals.', 4500);
}

function updatePetalPath() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'The Petal Path Maker') {
        if (petalPath) { petalPath = null; petalPathArtist = null; heldPetal = false; }
        return;
    }
    if (!world) return;
    if (!petalPath || petalPath.day !== world.day) { spawnPetalPath(); if (!petalPath) return; }

    // Neighbors periodically drop a petal of their own on an open anchor.
    if (millis() >= petalPath.nextNeighborFillAt) {
        petalPath.nextNeighborFillAt = millis() + 15000 + Math.random() * 10000;
        const open = petalPath.anchors.filter(a => !a.filled);
        if (open.length > 0 && typeof npcs !== 'undefined' && npcs.length > 0) {
            const anchor = open[Math.floor(Math.random() * open.length)];
            anchor.filled = true;
            const npc = npcs[Math.floor(Math.random() * npcs.length)];
            notify(npc.name + ' added a petal to the path.', 3500);
        }
    }

    // Walking the completed path next to a neighbor: one-time comment + boost.
    if (player && petalPath.anchors.length > 0 && petalPath.anchors.every(a => a.filled)) {
        const onPath = petalPath.anchors.some(a => a.x === player.x && a.y === player.y);
        if (onPath && typeof npcs !== 'undefined') {
            for (const npc of npcs) {
                if (!npc.isPresent || petalPath.walkedWith.has(npc.id)) continue;
                if (Math.abs(npc.gridX - player.x) <= 1 && Math.abs(npc.gridY - player.y) <= 1) {
                    petalPath.walkedWith.add(npc.id);
                    const line = PETAL_PATH_WALK_LINES[Math.floor(Math.random() * PETAL_PATH_WALK_LINES.length)];
                    notify(npc.name + ': "' + line + '"', 4000);
                    if (typeof npc.gainGift === 'function') npc.gainGift(2);
                }
            }
        }
    }
}

function drawPetalPath() {
    if (!petalPath) return;
    const TS = CONFIG.TILE_SIZE;
    if (petalPathArtist) {
        const sx = petalPathArtist.x * TS - cameraX, sy = petalPathArtist.y * TS - cameraY;
        noStroke();
        fill('#AD1457');
        ellipse(sx + TS / 2, sy + TS / 2, TS * 0.7, TS * 0.7);
        fill('#F8BBD0');
        ellipse(sx + TS / 2, sy + TS * 0.3, TS * 0.35, TS * 0.35);
    }
    for (const anchor of petalPath.anchors) {
        if (anchor.filled) drawFlowerDecor(anchor.x, anchor.y);
    }
}

function isFacingPetalPathArtist() {
    if (!petalPathArtist || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === petalPathArtist.x && facing.y === petalPathArtist.y;
}

function tryTalkToPetalPathArtist() {
    if (!petalPath || !isFacingPetalPathArtist()) return false;
    if (petalPath.anchors.every(a => a.filled)) {
        notify('"The path is finished! Look at it glow." The path-artist beams.', 4000);
    } else if (heldPetal) {
        notify('"You\'re already holding a petal, go place it on the path!"', 3500);
    } else {
        heldPetal = true;
        notify('The path-artist hands you a petal. "Drop it anywhere along the path between the dock and your door."', 4500);
    }
    return true;
}

// Placing a petal at a facing anchor tile (tried before harvest, not tied to an NPC).
function tryPlacePetal() {
    if (!petalPath || !heldPetal || !player) return false;
    const facing = player.getFacingTile();
    if (!facing) return false;
    const anchor = petalPath.anchors.find(a => a.x === facing.x && a.y === facing.y);
    if (!anchor) return false;
    if (anchor.filled) {
        notify('That spot already has a petal.', 3000);
    } else {
        anchor.filled = true;
        heldPetal = false;
        notify('You laid a petal along the path.', 3500);
        if (petalPath.anchors.every(a => a.filled)) {
            notify('The petal path is complete! It glows faintly in the afternoon light.', 4500);
        }
    }
    return true;
}

// ===== MEMORY LANTERN NIGHT =====
// Dusk-triggered (spawns only once world clock passes 5 PM on the holiday
// day) and vanishes on its own the next morning, once the holiday is no
// longer active — same lifecycle as islandGod/lostMail. Neighbor lanterns
// are pre-lit with a memory; the last lantern starts empty and the lighter
// fills it with a random player memory line on interact. Skipped a real
// "pick from a list" UI for the player's own line (outline's optional
// flavor) — one random pick keeps the pattern identical to every other
// "talk to the visiting NPC for one small reward" holiday.
const MEMORY_LANTERN_COUNT = 5;
const MEMORY_LANTERN_DUSK_HOUR = 17;
const MEMORY_LANTERN_NEIGHBOR_LINES = [
    'I once laughed so hard a cloud changed shape.',
    'The best sandwich is the one you share with a crab.',
    'Hoggy looked at me for three full seconds. I\'ll never forget it.',
    'I wrote about the time I saw a fish wearing a leaf. People doubted me.',
    'I once sneezed and swear a flower bloomed. I\'m not taking questions.',
    'Someone waved at me from very far away once. I still think about it.'
];
const MEMORY_LANTERN_PLAYER_LINES = [
    'I found this island and decided to stay a while.',
    'Someone here made me feel like I belonged before I even unpacked.',
    'The quietest days here turned out to be my favorite ones.'
];
let memoryLanternNight = null; // { day, lanterns:[{x,y,npcId,npcName,memory,read,isPlayer}], lighter:{x,y} }

// Widest run of clear beach tiles on any row, evenly spaced into `count` spots.
function findLanternShoreLine(count) {
    let bestY = -1, bestStart = -1, bestLen = 0;
    for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
        let curStart = -1, curLen = 0;
        for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
            const t = world.tiles[x] && world.tiles[x][y];
            const clear = t && t.type === 'beach' && !isSolidTile(x, y) && !buildingAt(x, y);
            if (clear) {
                if (curStart < 0) curStart = x;
                curLen++;
                if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; bestY = y; }
            } else {
                curStart = -1; curLen = 0;
            }
        }
    }
    if (bestLen < count) return null;
    const spots = [];
    for (let i = 0; i < count; i++) {
        const t = (i + 1) / (count + 1);
        spots.push({ x: Math.round(bestStart + (bestLen - 1) * t), y: bestY });
    }
    return spots;
}

function spawnMemoryLanternNight() {
    if (!world || typeof npcs === 'undefined') return;
    const spots = findLanternShoreLine(MEMORY_LANTERN_COUNT);
    if (!spots) return;
    const npcPool = npcs.filter(n => n.isPresent).slice();
    const linePool = MEMORY_LANTERN_NEIGHBOR_LINES.slice();
    const lanterns = spots.map((spot, i) => {
        if (i === spots.length - 1 || npcPool.length === 0) {
            return { x: spot.x, y: spot.y, npcId: null, npcName: null, memory: null, read: false, isPlayer: true };
        }
        const npc = npcPool.splice(Math.floor(Math.random() * npcPool.length), 1)[0];
        const memory = linePool.length
            ? linePool.splice(Math.floor(Math.random() * linePool.length), 1)[0]
            : MEMORY_LANTERN_NEIGHBOR_LINES[Math.floor(Math.random() * MEMORY_LANTERN_NEIGHBOR_LINES.length)];
        return { x: spot.x, y: spot.y, npcId: npc.id, npcName: npc.name, memory, read: false, isPlayer: false };
    });
    const last = spots[spots.length - 1];
    memoryLanternNight = { day: world.day, lanterns, lighter: findClearGroundNear(last.x, last.y, 1, 6) };
    notify('A lantern-lighter has lined the shore with paper lanterns for Memory Lantern Night.', 4500);
}

function updateMemoryLanternNight() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Memory Lantern Night') {
        if (memoryLanternNight) memoryLanternNight = null;
        return;
    }
    if (!world) return;
    if (world.timeMinutes / 60 < MEMORY_LANTERN_DUSK_HOUR) return; // not dusk yet
    if (!memoryLanternNight || memoryLanternNight.day !== world.day) spawnMemoryLanternNight();
    if (!memoryLanternNight || !player) return;

    // Walking near a lit lantern reads it — ambient, no interact key needed.
    for (const lantern of memoryLanternNight.lanterns) {
        if (lantern.read || !lantern.memory) continue;
        if (Math.abs(lantern.x - player.x) <= 1 && Math.abs(lantern.y - player.y) <= 1) {
            lantern.read = true;
            if (lantern.isPlayer) {
                notify('Your own lantern glows softly: "' + lantern.memory + '"', 4500);
            } else {
                notify(lantern.npcName + '\'s lantern reads: "' + lantern.memory + '"', 4500);
                const npc = npcs.find(n => n.id === lantern.npcId);
                if (npc && typeof npc.gainGift === 'function') npc.gainGift(2);
            }
        }
    }
}

function drawMemoryLanternNight() {
    if (!memoryLanternNight) return;
    const TS = CONFIG.TILE_SIZE;
    if (memoryLanternNight.lighter) {
        const sx = memoryLanternNight.lighter.x * TS - cameraX, sy = memoryLanternNight.lighter.y * TS - cameraY;
        noStroke();
        fill('#4E342E');
        rect(sx + TS * 0.35, sy + TS * 0.3, TS * 0.3, TS * 0.7);
        fill('#FFD54F');
        ellipse(sx + TS / 2, sy + TS * 0.25, TS * 0.35, TS * 0.4);
    }
    for (const lantern of memoryLanternNight.lanterns) {
        const sx = lantern.x * TS - cameraX, sy = lantern.y * TS - cameraY;
        const lit = !lantern.isPlayer || !!lantern.memory;
        noStroke();
        fill(lit ? '#FFD54F' : '#9E9E9E');
        rect(sx + TS * 0.25, sy + TS * 0.2, TS * 0.5, TS * 0.6, 2);
        if (lit) {
            fill(255, 235, 150, 90);
            ellipse(sx + TS / 2, sy + TS * 0.5, TS * 1.4, TS * 1.4);
        }
    }
}

function isFacingLanternLighter() {
    if (!memoryLanternNight || !memoryLanternNight.lighter || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === memoryLanternNight.lighter.x && facing.y === memoryLanternNight.lighter.y;
}

function tryTalkToLanternLighter() {
    if (!memoryLanternNight || !isFacingLanternLighter()) return false;
    const empty = memoryLanternNight.lanterns.find(l => l.isPlayer && !l.memory);
    if (!empty) {
        notify('"Every lantern is lit tonight," the lighter says, smiling at the shore.', 4000);
    } else {
        empty.memory = MEMORY_LANTERN_PLAYER_LINES[Math.floor(Math.random() * MEMORY_LANTERN_PLAYER_LINES.length)];
        notify('The lighter hands you a lantern. "Pick a memory, any memory." You add yours to the line.', 4500);
    }
    return true;
}

// ===== THE PICNIC RESET =====
// A visiting organizer temporarily arranges neighbor pairs along a line of
// blanket/bench props for one day. No real furniture is touched — the real
// outdoor-item system (ITEMS[id].outdoor) is permanent and mutates
// world.tiles, so this reuses the "hijack npc.stationary + snap position"
// trick from The Returning Bird instead, for a handful of neighbors at once.
// Original positions are saved and restored the moment the holiday ends.
const PICNIC_BANTER_PAIRS = [
    { line1: 'I think the potato salad is staring at me.', line2: "That's because you're staring at it first." },
    { line1: 'Pass the dream-bread?', line2: "There is no bread. We're just being polite." },
    { line1: 'This blanket has more personality than half the neighbors.', line2: 'Rude. Accurate, but rude.' },
    { line1: 'I saved you the shady seat.', line2: 'You saved yourself the shady seat and gave me the sun.' },
    { line1: 'Is this a lecture about ants now?', line2: "It's always a lecture about ants." }
];
const PICNIC_ORGANIZER_LINES = [
    'One long picnic for everyone — walk up next to any pair and listen in!',
    'I moved every bench and blanket into a single line. Took all morning.',
    'Sit anywhere you like. Everything goes back exactly where it belongs tonight.'
];
let picnicReset = null; // { day, seats:[{x,y}], pairs:[{seatA,seatB,npcAId,npcBId,line1,line2,thanked}], organizer:{x,y}, saved:[{npcId,gridX,gridY,stationary}], sitCount, titleGiven }

function findPicnicLineSpots(count) {
    let bestY = -1, bestStart = -1, bestLen = 0;
    for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
        let curStart = -1, curLen = 0;
        for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
            const t = world.tiles[x] && world.tiles[x][y];
            const clear = t && t.type === 'grass' && !isSolidTile(x, y) && !buildingAt(x, y);
            if (clear) {
                if (curStart < 0) curStart = x;
                curLen++;
                if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; bestY = y; }
            } else {
                curStart = -1; curLen = 0;
            }
        }
    }
    if (bestLen < count) return null;
    const spots = [];
    for (let i = 0; i < count; i++) {
        const t = (i + 1) / (count + 1);
        spots.push({ x: Math.round(bestStart + (bestLen - 1) * t), y: bestY });
    }
    return spots;
}

function spawnPicnicReset() {
    if (!world || typeof npcs === 'undefined') return;
    const present = npcs.filter(n => n.isPresent);
    const pairCount = Math.min(3, Math.floor(present.length / 2));
    if (pairCount < 1) return;
    const seatCount = pairCount * 2;
    const seats = findPicnicLineSpots(seatCount);
    if (!seats) return;

    const pool = present.slice();
    const chosen = [];
    for (let i = 0; i < seatCount; i++) {
        chosen.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    const saved = chosen.map(npc => ({ npcId: npc.id, gridX: npc.gridX, gridY: npc.gridY, stationary: npc.stationary }));

    const banterPool = PICNIC_BANTER_PAIRS.slice();
    const pairs = [];
    for (let i = 0; i < pairCount; i++) {
        const npcA = chosen[i * 2], npcB = chosen[i * 2 + 1];
        const seatA = seats[i * 2], seatB = seats[i * 2 + 1];
        npcA.stationary = true; npcA.gridX = seatA.x; npcA.gridY = seatA.y;
        npcB.stationary = true; npcB.gridX = seatB.x; npcB.gridY = seatB.y;
        const banter = banterPool.length ? banterPool.splice(Math.floor(Math.random() * banterPool.length), 1)[0] : PICNIC_BANTER_PAIRS[0];
        pairs.push({ seatA, seatB, npcAId: npcA.id, npcBId: npcB.id, line1: banter.line1, line2: banter.line2, thanked: false });
    }

    const organizer = findClearGroundNear(seats[0].x, seats[0].y, 1, 6) || { x: seats[0].x, y: Math.max(0, seats[0].y - 1) };
    picnicReset = { day: world.day, seats, pairs, organizer, saved, sitCount: 0, titleGiven: false };
    notify('A visiting organizer has arranged the neighbors into one long picnic line. Walk up to any pair and listen in!', 4500);
}

function restorePicnicNeighbors() {
    if (!picnicReset || typeof npcs === 'undefined') return;
    for (const s of picnicReset.saved) {
        const npc = npcs.find(n => n.id === s.npcId);
        if (npc) { npc.gridX = s.gridX; npc.gridY = s.gridY; npc.stationary = s.stationary; }
    }
}

function updatePicnicReset() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'The Picnic Reset') {
        if (picnicReset) { restorePicnicNeighbors(); picnicReset = null; }
        return;
    }
    if (!world) return;
    if (!picnicReset || picnicReset.day !== world.day) {
        if (picnicReset) restorePicnicNeighbors();
        spawnPicnicReset();
    }
}

function drawPicnicReset() {
    if (!picnicReset) return;
    const TS = CONFIG.TILE_SIZE;
    if (picnicReset.organizer) {
        const sx = picnicReset.organizer.x * TS - cameraX, sy = picnicReset.organizer.y * TS - cameraY;
        noStroke();
        fill('#6D4C41');
        rect(sx + TS * 0.3, sy + TS * 0.25, TS * 0.4, TS * 0.75);
        fill('#FFCC80');
        ellipse(sx + TS / 2, sy + TS * 0.2, TS * 0.4, TS * 0.4);
    }
    for (let i = 0; i < picnicReset.seats.length; i += 2) {
        const a = picnicReset.seats[i], b = picnicReset.seats[i + 1];
        if (!a || !b) continue;
        const sx = Math.min(a.x, b.x) * TS - cameraX, sy = a.y * TS - cameraY;
        const w = (Math.abs(a.x - b.x) + 1) * TS;
        noStroke();
        fill(i % 4 === 0 ? '#EF5350' : '#42A5F5');
        rect(sx + 2, sy + TS * 0.35, w - 4, TS * 0.5, 2);
        stroke(255, 255, 255, 160);
        strokeWeight(1);
        for (let gx = sx + 2; gx < sx + w - 2; gx += 6) line(gx, sy + TS * 0.35, gx, sy + TS * 0.85);
        noStroke();
    }
}

function isFacingPicnicOrganizer() {
    if (!picnicReset || !picnicReset.organizer || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === picnicReset.organizer.x && facing.y === picnicReset.organizer.y;
}

function tryTalkToPicnicOrganizer() {
    if (!picnicReset || !isFacingPicnicOrganizer()) return false;
    notify(PICNIC_ORGANIZER_LINES[Math.floor(Math.random() * PICNIC_ORGANIZER_LINES.length)], 4000);
    return true;
}

function findFacingPicnicPair() {
    if (!picnicReset || !player) return null;
    const facing = player.getFacingTile();
    if (!facing) return null;
    return picnicReset.pairs.find(p =>
        (facing.x === p.seatA.x && facing.y === p.seatA.y) || (facing.x === p.seatB.x && facing.y === p.seatB.y)
    ) || null;
}

function tryListenToPicnicPair() {
    if (!picnicReset) return false;
    const pair = findFacingPicnicPair();
    if (!pair) return false;
    const npcA = npcs.find(n => n.id === pair.npcAId);
    const npcB = npcs.find(n => n.id === pair.npcBId);
    const nameA = npcA ? npcA.name : 'Someone', nameB = npcB ? npcB.name : 'Someone else';
    notify(nameA + ': "' + pair.line1 + '" ' + nameB + ': "' + pair.line2 + '"', 5500);
    if (!pair.thanked) {
        pair.thanked = true;
        if (npcA && typeof npcA.gainGift === 'function') npcA.gainGift(2);
        if (npcB && typeof npcB.gainGift === 'function') npcB.gainGift(2);
        picnicReset.sitCount++;
        if (!picnicReset.titleGiven && picnicReset.sitCount >= 3) {
            picnicReset.titleGiven = true;
            notify('The organizer beams at you. "Three different pairs today? You\'ve earned it — Picnic Napper."', 4500);
        }
    }
    return true;
}

// ===== THE NEIGHBORHOOD TIME CAPSULE =====
// A visiting historian buries one real player-donated item + a memory line,
// plus a handful of flavor-only neighbor "donations". Unlike every other
// holiday's per-day state, `timeCapsuleBox` must survive until this same
// holiday slot rolls around again (HOLIDAY_INTERVAL * HOLIDAYS.length days
// later) — so it's the one piece of holiday state also wired into save.js,
// rather than being reset whenever the holiday isn't active.
const TIME_CAPSULE_MEMORY_LINES = [
    "The tide was extra sparkly this morning and nobody else noticed.",
    "I finally beat my own record for skipping stones. Four! A personal era.",
    "Someone left a perfect little pile of shells by my door. Still don't know who.",
    "I napped in the sun for exactly as long as I meant to, which never happens.",
    "I said something nice to a crab and meant every word of it.",
    "The bread I baked collapsed but tasted like victory anyway."
];
const TIME_CAPSULE_NEIGHBOR_LINES = [
    'a pebble that looks like regret',
    'a moonbeam, trapped in a jar (it escaped almost immediately)',
    'a perfectly good sandwich, for future consumption',
    'one sock, significance unclear',
    'a very serious drawing of a cloud',
    'three words they refuse to repeat out loud',
    'a shell that whispers when you\'re not listening',
    'their own shadow, allegedly'
];
let timeCapsuleBox = null; // { itemName, memoryLine, neighborDonations:[{name,item}], buriedDay } — persists across cycles
let timeCapsuleHistorian = null; // { x, y, revealedToday, donatedToday, day } — resets like every other one-day visitor

function spawnTimeCapsuleHistorian() {
    if (!world) return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    const spot = findClearGroundNear(dock.x, dock.y, 1, 12) || dock;
    timeCapsuleHistorian = { x: spot.x, y: spot.y, revealedToday: false, donatedToday: false, day: world.day };
    if (timeCapsuleBox) {
        notify('A traveling historian has arrived with a small shovel — and a familiar-looking box.', 4500);
    } else {
        notify('A traveling historian has arrived with a small shovel, collecting a memory to bury for next time.', 4500);
    }
}

function updateTimeCapsuleHistorian() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'The Neighborhood Time Capsule') {
        timeCapsuleHistorian = null;
        return;
    }
    if (!world) return;
    if (!timeCapsuleHistorian || timeCapsuleHistorian.day !== world.day) spawnTimeCapsuleHistorian();
}

function drawTimeCapsuleHistorian() {
    if (!timeCapsuleHistorian) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = timeCapsuleHistorian.x * TS - cameraX, sy = timeCapsuleHistorian.y * TS - cameraY;
    noStroke();
    fill('#6D4C41');
    rect(sx + TS * 0.25, sy + TS * 0.3, TS * 0.5, TS * 0.7, 2);
    fill('#A1887F');
    rect(sx + TS * 0.15, sy + TS * 0.55, TS * 0.7, TS * 0.15);
    fill('#FFCC80');
    ellipse(sx + TS / 2, sy + TS * 0.2, TS * 0.4, TS * 0.4);
}

function isFacingTimeCapsuleHistorian() {
    if (!timeCapsuleHistorian || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === timeCapsuleHistorian.x && facing.y === timeCapsuleHistorian.y;
}

// First real material/gift/treasure item the player is carrying — tools and
// building blocks don't count as a "harvestable" to donate.
function findDonatableItem() {
    if (typeof inventory === 'undefined') return null;
    for (const slot of inventory.slots) {
        if (!slot || !slot.id) continue;
        const item = ITEMS[slot.id];
        if (!item || item.category === 'tool' || item.category === 'block') continue;
        return slot;
    }
    return null;
}

function tryTalkToTimeCapsuleHistorian() {
    if (!timeCapsuleHistorian || !isFacingTimeCapsuleHistorian()) return false;

    if (timeCapsuleBox && !timeCapsuleHistorian.revealedToday) {
        timeCapsuleHistorian.revealedToday = true;
        const box = timeCapsuleBox;
        const donorLines = box.neighborDonations.map(d => d.name + ' donated ' + d.item).join('; ');
        notify('The historian digs up the old box and reads the list, half-mangled: "' + box.memoryLine + '" — and somewhere in there, ' + box.itemName + '. Neighbors argue cheerfully: ' + donorLines + '.', 6500);
        timeCapsuleBox = null;
        return true;
    }

    if (timeCapsuleHistorian.donatedToday) {
        notify('"Already got your memory for this box. Come back next time it\'s buried."', 3500);
        return true;
    }

    const slot = findDonatableItem();
    if (!slot) {
        notify('"Bring me something you\'ve gathered, and a memory to go with it."', 3500);
        return true;
    }

    const itemName = ITEMS[slot.id].name || slot.id;
    inventory.removeItem(slot.id, 1);
    const memoryLine = TIME_CAPSULE_MEMORY_LINES[Math.floor(Math.random() * TIME_CAPSULE_MEMORY_LINES.length)];

    const present = (typeof npcs !== 'undefined') ? npcs.filter(n => n.isPresent) : [];
    const donorCount = Math.min(present.length, 2 + Math.floor(Math.random() * 3));
    const pool = present.slice();
    const neighborDonations = [];
    for (let i = 0; i < donorCount; i++) {
        const npc = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
        const line = TIME_CAPSULE_NEIGHBOR_LINES[Math.floor(Math.random() * TIME_CAPSULE_NEIGHBOR_LINES.length)];
        neighborDonations.push({ name: npc.name, item: line });
    }

    timeCapsuleHistorian.donatedToday = true;
    timeCapsuleBox = { itemName, memoryLine, neighborDonations, buriedDay: world.day };
    notify('You donate your ' + itemName + ' and one memory: "' + memoryLine + '" The historian buries the box, with everyone else\'s donations mixed in.', 5500);
    return true;
}

// ===== TOURIST TIME! =====
// A dreamy little boat beaches for one day and 3 static tourists wander near
// the dock (same non-moving "statue" shape as islandGod/the historian).
// Facing one while holding any 'gift'-category item (the closest existing
// stand-in for "harvested fruit or flower") hands it over as a souvenir for
// an IOU, once per tourist per day; otherwise interacting just shows a naive
// question, no failure state, matching the outline.
const TOURIST_QUESTIONS = [
    'Is this island real?',
    'May I touch a tree?',
    'Where do I leave my socks?',
    'Do the crabs have names?',
    'Is the sand supposed to be this friendly?',
    'Does it rain upward here?',
    'Who do I tip for the nice weather?'
];
const TOURIST_THANKS = [
    'A tourist gasps and clutches the souvenir like a holy relic. IOU +1!',
    'A tourist declares this "the trip of a lifetime" and hands you an IOU.',
    'A tourist takes seventeen photos of the souvenir before pocketing it. IOU +1!',
    'A tourist tears up. "This is going straight on the mantel." IOU +1!'
];
const TOURIST_NAMES = ['Wide-Eyed Tourist', 'Sunburnt Tourist', 'Bewildered Tourist'];
let touristTime = null; // { tourists:[{x,y,name,gaveSouvenirToday}], day }

function spawnTouristTime() {
    if (!world) return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    const tourists = [];
    const rings = [[1, 5], [4, 9], [7, 13]];
    for (let i = 0; i < TOURIST_NAMES.length; i++) {
        const spot = findClearGroundNear(dock.x, dock.y, rings[i][0], rings[i][1]) || dock;
        tourists.push({ x: spot.x, y: spot.y, name: TOURIST_NAMES[i], gaveSouvenirToday: false });
    }
    touristTime = { tourists, day: world.day };
    notify('A small, dreamy boat has beached near the dock — tourists! Offer one a gift for an IOU.', 4500);
}

function updateTouristTime() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Tourist Time!') {
        touristTime = null;
        return;
    }
    if (!world) return;
    if (!touristTime || touristTime.day !== world.day) spawnTouristTime();
}

function drawTouristTime() {
    if (!touristTime) return;
    const TS = CONFIG.TILE_SIZE;
    const colors = ['#4FC3F7', '#FFB74D', '#BA68C8'];
    touristTime.tourists.forEach((t, i) => {
        const sx = t.x * TS - cameraX, sy = t.y * TS - cameraY;
        noStroke();
        fill(colors[i % colors.length]);
        rect(sx + TS * 0.25, sy + TS * 0.3, TS * 0.5, TS * 0.7, 3);
        fill('#FFE0B2');
        ellipse(sx + TS / 2, sy + TS * 0.22, TS * 0.4, TS * 0.4);
    });
}

function findFacingTourist() {
    if (!touristTime || !player) return null;
    const facing = player.getFacingTile();
    if (!facing) return null;
    return touristTime.tourists.find(t => t.x === facing.x && t.y === facing.y) || null;
}

function tryTalkToTourist() {
    const tourist = findFacingTourist();
    if (!tourist) return false;

    const active = (typeof inventory !== 'undefined') ? inventory.getActiveItem() : null;
    const item = active ? ITEMS[active.id] : null;
    if (item && item.category === 'gift' && !tourist.gaveSouvenirToday) {
        inventory.removeItem(active.id, 1);
        inventory.addItem('iou', 1);
        tourist.gaveSouvenirToday = true;
        notify(TOURIST_THANKS[Math.floor(Math.random() * TOURIST_THANKS.length)], 4000);
        return true;
    }

    notify(tourist.name + ' asks: "' + TOURIST_QUESTIONS[Math.floor(Math.random() * TOURIST_QUESTIONS.length)] + '"', 3500);
    return true;
}

// ===== PEAK SAUCY =====
// A summer-solstice bonfire holiday. A static elder waits by a beach bonfire
// and hands the player a held Sweet Tea (temporary held item, no inventory
// slot, no real crafting/harvest chain — same simplification other holidays
// use for their handed-out flavor items) on request, refillable all day
// rather than once-per-day like the flower/petal holidays, since the loop is
// "serve as many neighbors as you can before the fire dies down". Serving a
// neighbor is tried before dialogue opens, same hook point as Lost Mail Day.
const PEAK_SAUCY_KEEPSAKE_THRESHOLD = 3;
const PEAK_SAUCY_ELDER_LINES = [
    'The elder hands you a warm cup. "Longest day of the year. Go share it."',
    '"Sweet tea, fresh off the fire," the elder says, passing you a cup.',
    'The elder tops off a cup for you. "Slow afternoon, warm drink. That\'s the whole plan."'
];
const PEAK_SAUCY_SERVE_LINES = [
    ' takes the cup with both hands. "Perfect. Just perfect for today."',
    ' sips it slow, watching the water. "This is what summer\'s for."',
    ' clinks their cup against yours. "To the longest day!"',
    ' savors it and sighs happily. "You didn\'t have to, but I\'m glad you did."'
];
let peakSaucyElder = null; // { x, y }
let peakSaucy = null; // { day, served:Set<npcId>, keepsakeGiven }
let heldSweetTea = false;

function spawnPeakSaucy() {
    if (!world) return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    peakSaucyElder = findClearGroundNear(dock.x, dock.y, 1, 12);
    peakSaucy = { day: world.day, served: new Set(), keepsakeGiven: false };
    heldSweetTea = false;
    notify('An elder has built a bonfire near the shore for the longest day of the year. Ask for a cup of sweet tea to share.', 4500);
}

function updatePeakSaucy() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Peak Saucy') {
        if (peakSaucy) { peakSaucy = null; peakSaucyElder = null; heldSweetTea = false; }
        return;
    }
    if (!world) return;
    if (!peakSaucy || peakSaucy.day !== world.day) spawnPeakSaucy();
}

function drawPeakSaucy() {
    if (!peakSaucy || !peakSaucyElder) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = peakSaucyElder.x * TS - cameraX, sy = peakSaucyElder.y * TS - cameraY;
    noStroke();
    fill('#FF7043');
    ellipse(sx + TS * 0.5, sy + TS * 0.75, TS * 0.6, TS * 0.4);
    fill('#FFCA28');
    ellipse(sx + TS * 0.5, sy + TS * 0.6, TS * 0.35, TS * 0.45);
    fill('#8D6E63');
    rect(sx + TS * 0.15, sy, TS * 0.7, TS * 0.55, 2);
}

function isFacingPeakSaucyElder() {
    if (!peakSaucyElder || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === peakSaucyElder.x && facing.y === peakSaucyElder.y;
}

function tryTalkToPeakSaucyElder() {
    if (!peakSaucy || !isFacingPeakSaucyElder()) return false;
    if (heldSweetTea) {
        notify('"You\'re already holding a cup — go find someone to share it with."', 3500);
    } else {
        heldSweetTea = true;
        notify(PEAK_SAUCY_ELDER_LINES[Math.floor(Math.random() * PEAK_SAUCY_ELDER_LINES.length)], 4000);
    }
    return true;
}

// Serving a held cup to a neighbor (tried before dialogue opens, same hook as
// Lost Mail Day's delivery). No failure state — any neighbor can be served.
function tryServeSweetTea(npc) {
    if (!peakSaucy || !heldSweetTea || !npc) return false;
    heldSweetTea = false;
    peakSaucy.served.add(npc.id);
    const line = PEAK_SAUCY_SERVE_LINES[Math.floor(Math.random() * PEAK_SAUCY_SERVE_LINES.length)];
    notify(npc.name + line + ' Friendship +2.', 4500);
    if (typeof npc.gainGift === 'function') npc.gainGift(2);
    if (!peakSaucy.keepsakeGiven && peakSaucy.served.size >= PEAK_SAUCY_KEEPSAKE_THRESHOLD) {
        peakSaucy.keepsakeGiven = true;
        inventory.addItem('iou', 1);
        notify('Word gets around about your tea-serving. Someone presses a keepsake IOU into your hand. "For the longest day."', 5000);
    }
    return true;
}

// ===== COOL VALLEY =====
// Autumn-equinox remembrance holiday, dusk-gated like Memory Lantern Night
// (same 5 PM threshold) so it reads as an evening gathering rather than an
// all-day event. Reuses findLanternShoreLine() for a row of purely-ambient
// lanterns (no per-lantern memory text — that's Memory Lantern Night's own
// mechanic), existing rock/shiny_rock tiles as "memory stones" (no new tile
// type, per the outline's own constraint) for a leave-an-offering loop, and
// Peak Saucy's held-treat/serve shape for Sweet Rice Balls.
const COOL_VALLEY_DUSK_HOUR = 17;
const COOL_VALLEY_LANTERN_COUNT = 4;
const COOL_VALLEY_STONE_COUNT = 3;
const COOL_VALLEY_SERVE_THRESHOLD = 3;
const COOL_VALLEY_ELDER_LINES = [
    '"Sweet rice ball?" the elder offers. "Warm hands, warm memories."',
    'The elder presses a rice ball into your hands. "Share it with someone you\'re glad is here."',
    '"There\'s always another one," the elder says, handing you a fresh rice ball.'
];
const COOL_VALLEY_SERVE_LINES = [
    ' takes it with both hands. "Thank you. This is a good night for this."',
    ' eats it slow, watching the water. "Some nights just feel like remembering."',
    ' smiles and looks toward the moon. "Perfect timing."',
    ' savors it quietly. "You didn\'t have to, but I\'m glad you did."'
];
const COOL_VALLEY_OFFERING_LINES = [
    'You leave it at the stone. It feels like saying hello to a good memory.',
    'You set it down gently. The stone has heard a lot of stories, probably.',
    'You leave it there, quiet and unhurried. No sadness in it, just remembering.'
];
let coolValley = null; // { day, elder:{x,y}, lanterns:[{x,y}], stones:[{x,y,offered}], served:Set, keepsakeGiven, offeringBonusGiven }
let heldSweetRiceBall = false;

// Every existing rock/shiny_rock tile on the map, shuffled and capped at `count`.
function findMemoryStones(count) {
    const found = [];
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x] && world.tiles[x][y];
            if (t && (t.type === 'rock' || t.type === 'shiny_rock')) found.push({ x, y });
        }
    }
    for (let i = found.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [found[i], found[j]] = [found[j], found[i]];
    }
    return found.slice(0, count);
}

function spawnCoolValley() {
    if (!world) return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    const elder = findClearGroundNear(dock.x, dock.y, 1, 12);
    const lanterns = findLanternShoreLine(COOL_VALLEY_LANTERN_COUNT) || [];
    const stones = findMemoryStones(COOL_VALLEY_STONE_COUNT).map(s => ({ x: s.x, y: s.y, offered: false }));
    coolValley = { day: world.day, elder, lanterns, stones, served: new Set(), keepsakeGiven: false, offeringBonusGiven: false };
    heldSweetRiceBall = false;
    notify('Dusk settles and neighbors gather for Cool Valley\'s memory walk. An elder waits near the shore with sweet rice balls to share.', 5000);
}

function updateCoolValley() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Cool Valley') {
        if (coolValley) { coolValley = null; heldSweetRiceBall = false; }
        return;
    }
    if (!world) return;
    if (world.timeMinutes / 60 < COOL_VALLEY_DUSK_HOUR) return; // gathers at dusk
    if (!coolValley || coolValley.day !== world.day) spawnCoolValley();
}

function drawCoolValley() {
    if (!coolValley) return;
    const TS = CONFIG.TILE_SIZE;
    if (coolValley.elder) {
        const sx = coolValley.elder.x * TS - cameraX, sy = coolValley.elder.y * TS - cameraY;
        noStroke();
        fill('#7E57C2');
        rect(sx + TS * 0.2, sy + TS * 0.15, TS * 0.6, TS * 0.75, 3);
        fill('#FFF9C4');
        ellipse(sx + TS * 0.5, sy + TS * 0.15, TS * 0.3, TS * 0.3);
    }
    for (const lantern of coolValley.lanterns) {
        const sx = lantern.x * TS - cameraX, sy = lantern.y * TS - cameraY;
        noStroke();
        fill('#FFD54F');
        rect(sx + TS * 0.3, sy + TS * 0.25, TS * 0.4, TS * 0.5, 2);
        fill(255, 240, 180, 80);
        ellipse(sx + TS * 0.5, sy + TS * 0.5, TS * 1.2, TS * 1.2);
    }
    for (const stone of coolValley.stones) {
        if (!stone.offered) continue;
        const sx = stone.x * TS - cameraX, sy = stone.y * TS - cameraY;
        noStroke();
        fill('#F06292');
        ellipse(sx + TS * 0.5, sy + TS * 0.15, TS * 0.35, TS * 0.25);
    }
}

function isFacingCoolValleyElder() {
    if (!coolValley || !coolValley.elder || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === coolValley.elder.x && facing.y === coolValley.elder.y;
}

function tryTalkToCoolValleyElder() {
    if (!coolValley || !isFacingCoolValleyElder()) return false;
    if (heldSweetRiceBall) {
        notify('"You\'re already holding one — go find someone to share it with."', 3500);
    } else {
        heldSweetRiceBall = true;
        notify(COOL_VALLEY_ELDER_LINES[Math.floor(Math.random() * COOL_VALLEY_ELDER_LINES.length)], 4000);
    }
    return true;
}

// Serving a held rice ball to a neighbor (tried before dialogue opens, same
// hook point as Peak Saucy's tea / Lost Mail Day's delivery). No failure
// state — any present neighbor can be served.
function tryServeRiceBall(npc) {
    if (!coolValley || !heldSweetRiceBall || !npc) return false;
    heldSweetRiceBall = false;
    coolValley.served.add(npc.id);
    const line = COOL_VALLEY_SERVE_LINES[Math.floor(Math.random() * COOL_VALLEY_SERVE_LINES.length)];
    notify(npc.name + line + ' Friendship +2.', 4500);
    if (typeof npc.gainGift === 'function') npc.gainGift(2);
    if (!coolValley.keepsakeGiven && coolValley.served.size >= COOL_VALLEY_SERVE_THRESHOLD) {
        coolValley.keepsakeGiven = true;
        inventory.addItem('iou', 1);
        notify('Someone notices how many rice balls you\'ve shared tonight and presses an IOU into your hand. "For remembering with us."', 5000);
    }
    return true;
}

// Leaving an offering at an existing rock/shiny_rock "memory stone" — faces
// the stone tile directly, same as facing any other solid interactable.
function tryLeaveMemoryOffering() {
    if (!coolValley || !player) return false;
    const facing = player.getFacingTile();
    if (!facing) return false;
    const stone = coolValley.stones.find(s => s.x === facing.x && s.y === facing.y && !s.offered);
    if (!stone) return false;
    const active = (typeof inventory !== 'undefined') ? inventory.getActiveItem() : null;
    if (!active) {
        notify('An offering needs something in hand. You look at the quiet stone empty-handed.', 3500);
        return true;
    }
    inventory.removeItem(active.id, 1);
    stone.offered = true;
    notify(COOL_VALLEY_OFFERING_LINES[Math.floor(Math.random() * COOL_VALLEY_OFFERING_LINES.length)], 4500);
    if (!coolValley.offeringBonusGiven && coolValley.stones.every(s => s.offered)) {
        coolValley.offeringBonusGiven = true;
        inventory.addItem('iou', 1);
        notify('Every memory stone along the walk is honored. The moon feels a little closer tonight.', 5000);
    }
    return true;
}

// ===== SWEET VALLEY =====
// Spring-equinox holiday honoring the coming Island God. A single altar spot
// is picked on the widest beach run each morning (reuses findLanternShoreLine
// with count=1), starting unbuilt. Building it consumes 10 Sticks + 5 Stones
// (both plain existing ITEMS, no new materials) — no new placed-structure
// system needed since it's one fixed tile, not a footprint like Castle of
// Sticks Day's Building-based twig tower. Once built, offering any
// 'gift'-category item (same "harvestable" stand-in Tourist Time uses) gives
// a flavor line, and the first offering of the day boosts every neighbor's
// friendship once, same shared-trigger pattern as Hoggy's Birthday/Turtle
// Crossing Guard Day.
const SWEET_VALLEY_STICK_COST = 10;
const SWEET_VALLEY_STONE_COST = 5;
const SWEET_VALLEY_BUILD_LINES = [
    'You stack the sticks and stones into a beach altar. It feels ready for an offering.',
    'The altar comes together, sticks braced against stones. Something about it already feels honored.',
    'You set the last stone in place. The altar looks small, but it looks right.'
];
const SWEET_VALLEY_OFFER_LINES = [
    'You lay the offering on the altar. For a moment the sand feels warmer.',
    'The offering settles into place. Somewhere, something slow and ancient seems pleased.',
    'You leave it at the altar and step back. It feels like the start of something.',
    'The offering catches the light oddly as you set it down. Good sign, probably.'
];
let sweetValleyAltar = null; // { day, x, y, built, offeredBonusGiven }

function findSweetValleyAltarSpot() {
    const shore = (typeof findLanternShoreLine === 'function') ? findLanternShoreLine(1) : null;
    if (shore && shore[0]) return shore[0];
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    return findClearGroundNear(dock.x, dock.y, 1, 15);
}

function spawnSweetValley() {
    if (!world) return;
    const spot = findSweetValleyAltarSpot();
    if (!spot) return;
    sweetValleyAltar = { day: world.day, x: spot.x, y: spot.y, built: false, offeredBonusGiven: false };
    notify('Neighbors say the Island God is expected today. The beach needs an altar — 10 Sticks and 5 Stones should do it.', 5000);
}

function updateSweetValley() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Sweet Valley') {
        if (sweetValleyAltar) sweetValleyAltar = null;
        return;
    }
    if (!world) return;
    if (!sweetValleyAltar || sweetValleyAltar.day !== world.day) spawnSweetValley();
}

function drawSweetValley() {
    if (!sweetValleyAltar) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = sweetValleyAltar.x * TS - cameraX, sy = sweetValleyAltar.y * TS - cameraY;
    noStroke();
    if (sweetValleyAltar.built) {
        fill('#9E9E9E');
        rect(sx + TS * 0.15, sy + TS * 0.4, TS * 0.7, TS * 0.45, 3);
        fill('#A0826D');
        rect(sx + TS * 0.25, sy + TS * 0.18, TS * 0.5, TS * 0.28, 2);
        fill(255, 236, 179, 110);
        ellipse(sx + TS * 0.5, sy + TS * 0.32, TS * 0.9, TS * 0.9);
    } else {
        fill('#9E9E9E');
        ellipse(sx + TS * 0.35, sy + TS * 0.7, TS * 0.35, TS * 0.22);
        fill('#A0826D');
        rect(sx + TS * 0.45, sy + TS * 0.55, TS * 0.35, TS * 0.1, 2);
    }
}

function isFacingSweetValleyAltar() {
    if (!sweetValleyAltar || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === sweetValleyAltar.x && facing.y === sweetValleyAltar.y;
}

// Building the altar (tried before offering/harvest at both interact call sites).
function tryBuildSweetValleyAltar() {
    if (!sweetValleyAltar || sweetValleyAltar.built || !isFacingSweetValleyAltar()) return false;
    if (!inventory.hasItem('stick', SWEET_VALLEY_STICK_COST) || !inventory.hasItem('stone', SWEET_VALLEY_STONE_COST)) {
        notify('The altar needs 10 Sticks and 5 Stones to build. Gather a bit more.', 3500);
        return true;
    }
    inventory.removeItem('stick', SWEET_VALLEY_STICK_COST);
    inventory.removeItem('stone', SWEET_VALLEY_STONE_COST);
    sweetValleyAltar.built = true;
    notify(SWEET_VALLEY_BUILD_LINES[Math.floor(Math.random() * SWEET_VALLEY_BUILD_LINES.length)], 4500);
    return true;
}

// Making an offering at the built altar. No failure state beyond needing a
// held gift-category item, matching Tourist Time's "any gift works" rule.
function tryOfferAtSweetValleyAltar() {
    if (!sweetValleyAltar || !sweetValleyAltar.built || !isFacingSweetValleyAltar()) return false;
    const active = (typeof inventory !== 'undefined') ? inventory.getActiveItem() : null;
    const item = active ? ITEMS[active.id] : null;
    if (!item || item.category !== 'gift') {
        notify('The altar is ready. Hold a harvestable gift and interact to make an offering.', 3500);
        return true;
    }
    inventory.removeItem(active.id, 1);
    notify(SWEET_VALLEY_OFFER_LINES[Math.floor(Math.random() * SWEET_VALLEY_OFFER_LINES.length)], 4500);
    if (!sweetValleyAltar.offeredBonusGiven) {
        sweetValleyAltar.offeredBonusGiven = true;
        if (typeof npcs !== 'undefined') {
            for (const npc of npcs) { if (typeof npc.gainGift === 'function') npc.gainGift(2); }
        }
        notify('A ripple of thanks passes through the neighborhood. Friendship +2, islandwide.', 5000);
    }
    return true;
}

// ===== PEAK YEESH =====
// Winter-solstice holiday. The Everburn fire pit appears the moment the
// holiday starts (build any time, same materials-consuming shape as Sweet
// Valley's altar — plain Sticks + Logs, no new Yule Log/Evergreen Bough
// items, following every other holiday's precedent of skipping a new economy
// item). After dusk a silent visitor, Papa Yeesh, wanders nearby (same
// gentle wander tick as Yogatron); talking to him is flavor only, no reward.
// The real reward resolves automatically at the natural midnight rollover
// (onPeakYeeshMidnight, called from daycycle.js's onNewDay) based on
// hog.yearGiftCount — unless the player slept before midnight, tracked via
// sleptPastMidnight (set in trySleep()).
const PEAK_YEESH_STICK_COST = 15;
const PEAK_YEESH_LOG_COST = 5;
const PEAK_YEESH_DUSK_HOUR = 18;
const PEAK_YEESH_FURNITURE_POOL = ['yule_tree', 'brick_fireplace', 'garland', 'wreath', 'mistletoe_sprig', 'candle_log', 'holly_vase', 'yule_goat_plush'];
const PEAK_YEESH_BUILD_LINES = [
    'You stack the sticks and logs into the Everburn. It catches fast and burns bright against the long night.',
    'The Everburn roars to life. Somewhere, neighbors cheer at the light on the horizon.',
    'You light the Everburn. The dark backs off a little.'
];
const PAPA_YEESH_LINES = [
    'Papa Yeesh looks at you and says nothing. He drifts on into the dark.',
    'Papa Yeesh nods once, silent, and continues his rounds.',
    'You catch Papa Yeesh\'s eye. He says nothing, but seems to be counting something.',
    'Papa Yeesh pauses near you for a moment, quiet as snowfall, then moves on.'
];
let sleptPastMidnight = false; // set by trySleep(), read + reset by onPeakYeeshMidnight
let peakYeesh = null; // { day, spot:{x,y}, built }
let papaYeesh = null; // { x, y, lastMoveAt }

function findEverburnSpot() {
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    return findClearGroundNear(dock.x, dock.y, 1, 15);
}

function spawnPeakYeesh() {
    if (!world) return;
    const spot = findEverburnSpot();
    if (!spot) return;
    peakYeesh = { day: world.day, spot, built: false };
    notify('The longest night has come. Gather 15 Sticks and 5 Logs to build the Everburn bonfire.', 5000);
}

function updatePeakYeesh() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Peak Yeesh') {
        if (peakYeesh) peakYeesh = null;
        if (papaYeesh) papaYeesh = null;
        return;
    }
    if (!world) return;
    if (!peakYeesh || peakYeesh.day !== world.day) spawnPeakYeesh();

    // Papa Yeesh only comes out after dusk.
    if (world.timeMinutes / 60 < PEAK_YEESH_DUSK_HOUR) {
        if (papaYeesh) papaYeesh = null;
        return;
    }
    if (!papaYeesh) {
        const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
        const spot = findClearGroundNear(dock.x, dock.y, 3, 18);
        if (!spot) return;
        papaYeesh = { x: spot.x, y: spot.y, lastMoveAt: 0 };
        notify('A quiet figure has appeared near the homes. Papa Yeesh has come for the longest night.', 4500);
        return;
    }
    // Gentle wander, same cadence as Yogatron.
    if (Math.random() < 0.005) {
        const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
        const d = dirs[Math.floor(Math.random()*4)];
        const nx = papaYeesh.x + d[0], ny = papaYeesh.y + d[1];
        if (nx >= 0 && nx < CONFIG.WORLD_WIDTH && ny >= 0 && ny < CONFIG.WORLD_HEIGHT) {
            if (!isSolidTile(nx, ny) && !buildingAt(nx, ny) && !(typeof npcAt === 'function' && npcAt(nx, ny))) {
                papaYeesh.x = nx;
                papaYeesh.y = ny;
                papaYeesh.lastMoveAt = millis();
            }
        }
    }
}

function drawPeakYeesh() {
    if (!peakYeesh) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = peakYeesh.spot.x * TS - cameraX, sy = peakYeesh.spot.y * TS - cameraY;
    noStroke();
    if (peakYeesh.built) {
        fill('#5D4037');
        rect(sx + TS * 0.2, sy + TS * 0.55, TS * 0.6, TS * 0.35, 2);
        fill('#FF7043');
        ellipse(sx + TS * 0.5, sy + TS * 0.4, TS * 0.5, TS * 0.6);
        fill('#FFCA28');
        ellipse(sx + TS * 0.5, sy + TS * 0.25, TS * 0.3, TS * 0.4);
        fill(255, 140, 60, 90);
        ellipse(sx + TS * 0.5, sy + TS * 0.4, TS * 1.4, TS * 1.4);
    } else {
        fill('#8D6E63');
        ellipse(sx + TS * 0.5, sy + TS * 0.7, TS * 0.7, TS * 0.3);
        fill('#A0826D');
        rect(sx + TS * 0.35, sy + TS * 0.35, TS * 0.3, TS * 0.4, 2);
    }
    if (papaYeesh) {
        const px = papaYeesh.x * TS - cameraX, py = papaYeesh.y * TS - cameraY;
        const moving = (millis() - (papaYeesh.lastMoveAt || 0)) < 300;
        const bob = moving ? BOB_PATTERN[Math.floor(millis() / WALK_FRAME_MS) % BOB_PATTERN.length] : 0;
        fill('#37474F');
        rect(px, py - TS + bob, TS, TS * 2);
        fill('#ECEFF1');
        ellipse(px + TS * 0.5, py - TS * 1.6 + bob, TS * 0.7, TS * 0.7);
        fill('#B0BEC5');
        rect(px - 2, py - TS * 1.9 + bob, TS + 4, TS * 0.35, 3);
    }
}

function isFacingEverburn() {
    if (!peakYeesh || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === peakYeesh.spot.x && facing.y === peakYeesh.spot.y;
}

// Building/lighting the Everburn (tried before harvest at both interact call sites).
function tryBuildEverburn() {
    if (!peakYeesh || peakYeesh.built || !isFacingEverburn()) return false;
    if (!inventory.hasItem('stick', PEAK_YEESH_STICK_COST) || !inventory.hasItem('log', PEAK_YEESH_LOG_COST)) {
        notify('The Everburn needs 15 Sticks and 5 Logs to build. Gather a bit more.', 3500);
        return true;
    }
    inventory.removeItem('stick', PEAK_YEESH_STICK_COST);
    inventory.removeItem('log', PEAK_YEESH_LOG_COST);
    peakYeesh.built = true;
    notify(PEAK_YEESH_BUILD_LINES[Math.floor(Math.random() * PEAK_YEESH_BUILD_LINES.length)], 4500);
    return true;
}

function isFacingPapaYeesh() {
    if (!papaYeesh || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === papaYeesh.x && facing.y === papaYeesh.y;
}

// Papa Yeesh never speaks when approached directly — flavor line only. The
// real reward resolves at midnight via onPeakYeeshMidnight.
function tryTalkToPapaYeesh() {
    if (!papaYeesh || !isFacingPapaYeesh()) return false;
    notify(PAPA_YEESH_LINES[Math.floor(Math.random() * PAPA_YEESH_LINES.length)], 4000);
    return true;
}

// Called from daycycle.js's onNewDay() when yesterday was Peak Yeesh. Reward
// is based on hog.yearGiftCount accumulated since the last Peak Yeesh: 0.5
// IOUs per gift (rounded up), or one random holiday furniture piece if that
// would exceed 20 IOUs. Skipped entirely if the player slept before midnight.
function onPeakYeeshMidnight() {
    const wentToSleep = sleptPastMidnight;
    sleptPastMidnight = false;
    if (wentToSleep) return;
    if (typeof hog === 'undefined' || !hog) return;
    const count = hog.yearGiftCount || 0;
    hog.yearGiftCount = 0;
    const iouAmount = Math.ceil(count * 0.5);
    if (iouAmount <= 0) return;
    if (typeof inventory === 'undefined' || !inventory) return;
    if (iouAmount > 20) {
        const pick = PEAK_YEESH_FURNITURE_POOL[Math.floor(Math.random() * PEAK_YEESH_FURNITURE_POOL.length)];
        inventory.addItem(pick, 1);
        notify('Papa Yeesh left something by your door overnight: a ' + ITEMS[pick].name + '.', 5500);
    } else {
        inventory.addItem('iou', iouAmount);
        notify('Papa Yeesh left ' + iouAmount + ' IOU' + (iouAmount === 1 ? '' : 's') + ' by your door — a quiet thanks for how you treated ' + hog.name + ' this year.', 5500);
    }
}

// ===== THE FLEALESS MARKET =====
// A traveling merchant barters three rare items for common harvested
// materials — no currency system, matches the outline's barter-only
// constraint. Reuses the real dialogue-choice UI (the same `choices`/`action`
// shape quest dialogue already uses in quests.js) instead of inventing a shop
// menu: the merchant's `_dialogueTree` is set directly and opened through the
// normal openDialogue(npc), no Yogatron-style global override needed.
const FLEALESS_MARKET_OFFERS = [
    { key: 'statue', label: 'A Statue',         cost: { stone: 15, stick: 10 },  give: () => inventory.addItem('flealess_statue', 1),
      line: 'The merchant unwraps a small carved statue. "Careful — heavier than it looks."' },
    { key: 'tool',   label: 'A Sturdy Pickaxe', cost: { stone: 20, crystal: 5 }, give: () => inventory.addItem('sturdy_pickaxe', 1),
      line: 'The merchant hands over a pickaxe. "Never dulls, never breaks. Don\'t ask how."' },
    { key: 'seed',   label: 'Mystery Seeds',    cost: { fiber: 10, pinecone: 5 }, give: () => inventory.addItem('flea_lily_seed', 3),
      line: 'The merchant presses a few seeds into your hand. "Not from around here, if you catch my meaning."' }
];
let flealessMerchant = null; // { x, y }
let flealessMarket = null;   // { day, bought: {statue,tool,seed} }

function flealessCostLabel(cost) {
    return Object.entries(cost).map(([id, n]) => n + ' ' + (ITEMS[id] ? ITEMS[id].name : id)).join(' + ');
}

function spawnFlealessMarket() {
    if (!world) return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    flealessMerchant = findClearGroundNear(dock.x, dock.y, 1, 12);
    flealessMarket = { day: world.day, bought: { statue: false, tool: false, seed: false } };
    notify('A traveling merchant has set up near the dock, offering rare goods for barter.', 4500);
}

function updateFlealessMarket() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'The Flealess Market') {
        if (flealessMarket) { flealessMarket = null; flealessMerchant = null; }
        return;
    }
    if (!world) return;
    if (!flealessMarket || flealessMarket.day !== world.day) spawnFlealessMarket();
}

function drawFlealessMarket() {
    if (!flealessMarket || !flealessMerchant) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = flealessMerchant.x * TS - cameraX, sy = flealessMerchant.y * TS - cameraY;
    noStroke();
    fill('#4E342E');
    rect(sx + TS * 0.1, sy - TS * 0.25, TS * 0.8, TS * 0.28, 2); // cart canopy
    fill('#8D6E63');
    rect(sx + TS * 0.15, sy, TS * 0.7, TS * 0.55, 2); // cart body
    fill('#D7CCC8');
    ellipse(sx + TS * 0.5, sy + TS * 0.7, TS * 0.35, TS * 0.45); // merchant
}

function isFacingFlealessMerchant() {
    if (!flealessMerchant || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === flealessMerchant.x && facing.y === flealessMerchant.y;
}

function buildFlealessMarketTree() {
    const choices = FLEALESS_MARKET_OFFERS.map(offer => {
        const bought = flealessMarket.bought[offer.key];
        const text = bought ? offer.label + ' (sold)' : offer.label + ' — ' + flealessCostLabel(offer.cost);
        return { text, next: null, action: () => tryBuyFlealessOffer(offer) };
    });
    choices.push({ text: 'Just looking.', next: null });
    return {
        start: {
            text: 'Rare goods, honest prices — well, honest barter. Take a look?',
            choices
        }
    };
}

function tryBuyFlealessOffer(offer) {
    if (flealessMarket.bought[offer.key]) {
        notify('"Already sold you that one, friend."', 3000);
        return;
    }
    const affordable = Object.entries(offer.cost).every(([id, n]) => inventory.hasItem(id, n));
    if (!affordable) {
        notify('"That\'ll cost you ' + flealessCostLabel(offer.cost) + '." You don\'t have enough yet.', 4000);
        return;
    }
    for (const [id, n] of Object.entries(offer.cost)) inventory.removeItem(id, n);
    offer.give();
    flealessMarket.bought[offer.key] = true;
    notify(offer.line, 4500);
}

function tryTalkToFlealessMerchant() {
    if (!flealessMarket || !isFacingFlealessMerchant()) return false;
    const merchant = {
        id: 'flealess_merchant',
        name: 'The Merchant',
        color: '#6D4C41',
        isPresent: true,
        gridX: flealessMerchant.x,
        gridY: flealessMerchant.y,
        _dialogueTree: buildFlealessMarketTree()
    };
    openDialogue(merchant);
    return true;
}

// ===== FAMILIAR SELLER =====
// A traveling druid offers one companion familiar a year for 20 IOUs. Once
// bought, `familiar` is permanent, persisted state (see save.js) — not
// scoped to the holiday like the druid herself, who despawns as usual when
// the day ends. Follow logic is a lazy step-toward-player grid hop on a
// timer, the same discrete-move shape Animal.update() already uses; no
// pathfinding or collision, matching the outline's "cosmetic only" constraint.
const FAMILIAR_KINDS = [
    { name: 'Will-o-Wisp',   color: '#FFEB3B', desc: 'a small floating light that hums when happy' },
    { name: 'Shadow Fox',    color: '#37474F', desc: 'a fox-shaped patch of dark that only shows its eyes' },
    { name: 'Moss Golem',    color: '#4CAF50', desc: 'a fist-sized clump of moss with a face when it wants one' },
    { name: 'Star Newt',     color: '#7E57C2', desc: 'a newt speckled with what might be actual stars' },
    { name: 'Candle Wisp',   color: '#FF8A65', desc: 'a floating candle flame that never goes out' },
    { name: 'Puddle Sprite', color: '#4FC3F7', desc: 'a walking puddle that reflects the wrong sky' }
];
const FAMILIAR_COST = 20;

let familiarDruid = null;     // { x, y } — holiday-scoped
let familiarSellerDay = null; // { day, kindIndex } — holiday-scoped
let familiar = null; // persistent: { active, name, kindIndex, gridX, gridY, facing, moveTimer } — survives days/saves

function spawnFamiliarSeller() {
    if (!world) return;
    const dock = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    familiarDruid = findClearGroundNear(dock.x, dock.y, 1, 12);
    familiarSellerDay = { day: world.day, kindIndex: world.day % FAMILIAR_KINDS.length };
    notify('A traveling druid has set up near the dock with a familiar for sale.', 4500);
}

function updateFamiliarSeller() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Familiar Seller') {
        if (familiarSellerDay) { familiarSellerDay = null; familiarDruid = null; }
        return;
    }
    if (!world) return;
    if (!familiarSellerDay || familiarSellerDay.day !== world.day) spawnFamiliarSeller();
}

function drawFamiliarSeller() {
    if (!familiarSellerDay || !familiarDruid) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = familiarDruid.x * TS - cameraX, sy = familiarDruid.y * TS - cameraY;
    noStroke();
    fill('#6A1B9A');
    rect(sx + TS * 0.2, sy + TS * 0.15, TS * 0.6, TS * 0.75, 3); // robe
    fill('#D7CCC8');
    ellipse(sx + TS * 0.5, sy + TS * 0.2, TS * 0.3, TS * 0.3); // head
}

function isFacingFamiliarDruid() {
    if (!familiarDruid || !player) return false;
    const facing = player.getFacingTile();
    return !!facing && facing.x === familiarDruid.x && facing.y === familiarDruid.y;
}

function buildFamiliarSellerTree() {
    if (familiar && familiar.active) {
        return {
            start: {
                text: '"Ah, ' + familiar.name + ' already found you. One familiar a year, that\'s the rule — even for druids."',
                choices: [{ text: 'Fair enough.', next: null }]
            }
        };
    }
    const kind = FAMILIAR_KINDS[familiarSellerDay.kindIndex];
    return {
        start: {
            text: '"This year I\'m offering a ' + kind.name + ' — ' + kind.desc + '. Yours for ' + FAMILIAR_COST + ' IOUs, and it\'ll follow you the rest of your days."',
            choices: [
                { text: 'Buy it (' + FAMILIAR_COST + ' IOUs).', next: null, action: () => tryBuyFamiliar() },
                { text: 'Not today.', next: null }
            ]
        }
    };
}

function tryBuyFamiliar() {
    if (familiar && familiar.active) return;
    if (!inventory.hasItem('iou', FAMILIAR_COST)) {
        notify('"That\'ll cost you ' + FAMILIAR_COST + ' IOUs." You don\'t have enough yet.', 4000);
        return;
    }
    const name = (window.prompt('Name your new familiar:') || '').trim().slice(0, 20);
    if (!name) { notify('"No name, no deal." The druid shrugs.', 3000); return; }
    inventory.removeItem('iou', FAMILIAR_COST);
    const kind = FAMILIAR_KINDS[familiarSellerDay.kindIndex];
    familiar = {
        active: true,
        name,
        kindIndex: familiarSellerDay.kindIndex,
        gridX: player.x,
        gridY: player.y + 1,
        facing: 'down',
        moveTimer: 0
    };
    notify(name + ' the ' + kind.name + ' blinks awake and starts following you!', 5000);
}

function tryTalkToFamiliarDruid() {
    if (!familiarSellerDay || !isFacingFamiliarDruid()) return false;
    const druid = {
        id: 'familiar_druid',
        name: 'The Druid',
        color: '#6A1B9A',
        isPresent: true,
        gridX: familiarDruid.x,
        gridY: familiarDruid.y,
        _dialogueTree: buildFamiliarSellerTree()
    };
    openDialogue(druid);
    return true;
}

// Persistent companion: follows every day, on every map, holiday or not.
function updateFamiliar(dt) {
    if (!familiar || !familiar.active || !player || !dt) return;
    familiar.moveTimer += dt;
    if (familiar.moveTimer < 260) return;
    familiar.moveTimer = 0;
    const dx = player.x - familiar.gridX;
    const dy = player.y - familiar.gridY;
    // Snap instantly if it got left behind on another map (e.g. underground).
    if (Math.abs(dx) + Math.abs(dy) > 40) {
        familiar.gridX = player.x;
        familiar.gridY = player.y + 1;
        return;
    }
    if (Math.abs(dx) + Math.abs(dy) <= 1) return;
    if (Math.abs(dx) >= Math.abs(dy)) {
        familiar.gridX += Math.sign(dx);
        familiar.facing = dx > 0 ? 'right' : 'left';
    } else {
        familiar.gridY += Math.sign(dy);
        familiar.facing = dy > 0 ? 'down' : 'up';
    }
}

function drawFamiliar() {
    if (!familiar || !familiar.active) return;
    const kind = FAMILIAR_KINDS[familiar.kindIndex] || FAMILIAR_KINDS[0];
    const TS = CONFIG.TILE_SIZE;
    const sx = familiar.gridX * TS - cameraX, sy = familiar.gridY * TS - cameraY;
    noStroke();
    fill(kind.color);
    ellipse(sx + TS * 0.5, sy + TS * 0.6, TS * 0.5, TS * 0.4);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(7);
    text(familiar.name, sx + TS * 0.5, sy - 2);
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
        textSize(7);
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
        case 6:
            if (typeof drawAlmanacTab === 'function') drawAlmanacTab(leftX + 4, contentY, leftW - 8, contentH);
            break;
        case 7: drawSettingsTab(leftX + 4, contentY, leftW - 8, contentH); break;
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
    text(PLAYER_NAME, rightX + rightW / 2, py + portraitSize + 4);

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
        // Turn toward the clicked tile first, so facing-based interactions
        // (doors, NPCs, tilling...) work no matter which way we were looking.
        {
            const TS = CONFIG.TILE_SIZE;
            const tx = Math.floor((mouseX + cameraX) / TS);
            const ty = Math.floor((mouseY + cameraY) / TS);
            const dx = tx - player.x, dy = ty - player.y;
            if (dx !== 0 || dy !== 0) {
                player.facing = Math.abs(dx) > Math.abs(dy)
                    ? (dx > 0 ? 'right' : 'left')
                    : (dy > 0 ? 'down' : 'up');
            }
        }
        // Try entering building first
        if (tryEnterBuilding()) return;
        // Then the tunnel to/from the underground city
        if (tryEnterTunnel()) return;
        // Check NPC talk, then harvest
        if (typeof npcAtFacing === 'function') {
            const npc = npcAtFacing();
            if (npc) {
                if (typeof tryDeliverLostMailLetter === 'function' && tryDeliverLostMailLetter(npc)) return;
                if (typeof tryServeSweetTea === 'function' && tryServeSweetTea(npc)) return;
                if (typeof tryServeRiceBall === 'function' && tryServeRiceBall(npc)) return;
                openDialogue(npc);
                return;
            }
        }
        // Yogatron holiday interaction (before harvest)
        if (typeof tryTalkToYogatron === 'function' && tryTalkToYogatron()) return;
        // Island God holiday interaction (before harvest)
        if (typeof tryTalkToIslandGod === 'function' && tryTalkToIslandGod()) return;
        // Returning Bird holiday interaction (before harvest)
        if (typeof tryTalkToReturningBird === 'function' && tryTalkToReturningBird()) return;
        // Lost Mail Day: pick up a letter off the beach (before harvest)
        if (typeof tryTalkToLostMail === 'function' && tryTalkToLostMail()) return;
        // Well-Wishing Garden: talk to the gardener, then plant the flower at a door
        if (typeof tryTalkToWellWishGardener === 'function' && tryTalkToWellWishGardener()) return;
        if (typeof tryPlaceWellWishFlower === 'function' && tryPlaceWellWishFlower()) return;
        // The Petal Path Maker: talk to the path-artist, then lay petals at anchors
        if (typeof tryTalkToPetalPathArtist === 'function' && tryTalkToPetalPathArtist()) return;
        if (typeof tryPlacePetal === 'function' && tryPlacePetal()) return;
        // Memory Lantern Night: talk to the lantern-lighter for a lantern of your own
        if (typeof tryTalkToLanternLighter === 'function' && tryTalkToLanternLighter()) return;
        // The Picnic Reset: talk to the organizer, or listen in on a seated pair
        if (typeof tryTalkToPicnicOrganizer === 'function' && tryTalkToPicnicOrganizer()) return;
        if (typeof tryListenToPicnicPair === 'function' && tryListenToPicnicPair()) return;
        // The Neighborhood Time Capsule: talk to the historian to donate or dig up
        if (typeof tryTalkToTimeCapsuleHistorian === 'function' && tryTalkToTimeCapsuleHistorian()) return;
        // Tourist Time!: offer a beached tourist a gift for an IOU
        if (typeof tryTalkToTourist === 'function' && tryTalkToTourist()) return;
        // Peak Saucy: talk to the bonfire elder for a cup of sweet tea
        if (typeof tryTalkToPeakSaucyElder === 'function' && tryTalkToPeakSaucyElder()) return;
        // Cool Valley: talk to the elder for a rice ball, or leave an offering at a memory stone
        if (typeof tryTalkToCoolValleyElder === 'function' && tryTalkToCoolValleyElder()) return;
        if (typeof tryLeaveMemoryOffering === 'function' && tryLeaveMemoryOffering()) return;
        // Sweet Valley: build the beach altar, then offer a harvestable
        if (typeof tryBuildSweetValleyAltar === 'function' && tryBuildSweetValleyAltar()) return;
        if (typeof tryOfferAtSweetValleyAltar === 'function' && tryOfferAtSweetValleyAltar()) return;
        // Peak Yeesh: build the Everburn, or talk to the silent Papa Yeesh
        if (typeof tryBuildEverburn === 'function' && tryBuildEverburn()) return;
        if (typeof tryTalkToPapaYeesh === 'function' && tryTalkToPapaYeesh()) return;
        // The Flealess Market: talk to the traveling merchant to barter
        if (typeof tryTalkToFlealessMerchant === 'function' && tryTalkToFlealessMerchant()) return;
        // Familiar Seller: talk to the traveling druid
        if (typeof tryTalkToFamiliarDruid === 'function' && tryTalkToFamiliarDruid()) return;
        // Toast Toss interaction (only on holiday)
        if (typeof tryToastToss === 'function' && tryToastToss()) return;
        // Garden Day: till facing grass with hoe (swallows if tilled)
        if (typeof tryTillSoil === 'function' && tryTillSoil()) return;
        // Shovel carves a path on faced grass; Grass Seed reverses it.
        if (typeof tryPathTool === 'function' && tryPathTool()) return;
        // Dig a Hole Day: pickaxe the ground / deepen the hole
        if (typeof tryDigHole === 'function' && tryDigHole()) return;
        // Castle of Sticks Day: raise a twig tower on the clicked spot (sticks equipped)
        {
            const TS = CONFIG.TILE_SIZE;
            const tx = Math.floor((mouseX + cameraX) / TS);
            const ty = Math.floor((mouseY + cameraY) / TS);
            if (tryBuildTwigTower(tx, ty)) return;
        }
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
                } else if (outdoor.cutout) {
                    if (tryPlaceCutout(tx, ty, outdoor.cutout, active.id)) return;
                } else if (tryPlaceNeighborShack(tx, ty, outdoor.type)) return;
            }
        }
        // Click a placed cardboard cutout up close to pick it back up (quests.js).
        if (typeof tryPickupCutoutAt === 'function') {
            const TS = CONFIG.TILE_SIZE;
            const tx = Math.floor((mouseX + cameraX) / TS);
            const ty = Math.floor((mouseY + cameraY) / TS);
            if (tryPickupCutoutAt(tx, ty)) return;
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
        // Turn toward the clicked tile so facing-based interactions (bed, door)
        // work no matter which way we were looking.
        if (it) {
            const dx = it.x - player.x, dy = it.y - player.y;
            if (dx !== 0 || dy !== 0) {
                player.facing = Math.abs(dx) > Math.abs(dy)
                    ? (dx > 0 ? 'right' : 'left')
                    : (dy > 0 ? 'down' : 'up');
            }
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
                if (menuTab !== i) audioManager.playSFX('click');
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
        if (menuTab === 7) {
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

    // The Recycle Bin is a counter, not a room: the door opens onto Bob.
    if (b.type === 'ug_recycle_bin' && typeof openBobDialogue === 'function') {
        audioManager.playSFX('door');
        openBobDialogue();
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
    audioManager.playSFX('door');
    notify("Entered " + buildingDisplayName(b));
    return true;
}

// If the player is facing a tunnel (the hole between the surface and the
// underground city), ask before dropping through. Reuses the dialogue advanced-
// menu as a lightweight yes/no prompt (see openMagicMenu()); accepting runs the
// same fall/bounce warp the ponds used (startPondWarp()).
function tryEnterTunnel() {
    const facing = player.getFacingTile();
    if (!facing) return false;
    const tile = facing.tile;
    if (!tile || tile.type !== 'tunnel' || !tile.target) return false;
    const dest = tile.target;
    const goingDown = dest.map !== 'island';
    const prompt = goingDown
        ? "There's a hole in the ground. Wanna see what's inside?"
        : "Light spills down from a hole above. Climb back up?";
    openMagicMenu(prompt, [
        { text: goingDown ? 'Yes, drop in' : 'Yes, climb up', action: () => { closeDialogue(); startPondWarp(dest); } },
        { text: 'No, not now', action: () => closeDialogue() }
    ]);
    audioManager.playSFX('click');
    return true;
}

// "Dreamer's Shack", "Rusty's Shack" — owner name + tier for owned homes,
// plain tier name for everything else (temples, shops, etc.).
function buildingDisplayName(b) {
    const tierName = BUILDING_TIERS[b.type] ? BUILDING_TIERS[b.type].name : b.type;
    if (b.owner === 'player') return PLAYER_NAME + "'s " + tierName;
    if (typeof b.owner === 'number' && typeof NPC_DEFS !== 'undefined' && NPC_DEFS[b.owner]) {
        return NPC_DEFS[b.owner].name + "'s " + tierName;
    }
    return tierName;
}

// ===== THE ELECTRIC TEMPLE =====
// Taira (its old resident mac) left with the neighbor-roster rewrite; the room
// stands empty until MarcOS (future NPC) opens the portal to the Stars world.

function tryExitBuilding() {
    if (!insideBuilding) return false;
    const b = insideBuilding;
    const intDoor = b.getInteriorDoorPos();
    // Only exit if player is standing on the interior door tile
    if (player.x !== intDoor.x || player.y !== intDoor.y) return false;

    // Clean Your Room Day: the door refuses to open until the room's been tidied.
    if (roomCleanDebt) {
        notify("It's Clean Your Room Day! Move or put away a furnishing before heading out.");
        return true;
    }

    // Place the player on the clear standing tile just outside this building's door.
    const spot = findExteriorStandingTile(b);
    player.x = spot.x;
    player.y = spot.y;
    player.facing = 'down';

    insideBuilding = null;
    gameState = STATE.PLAYING;
    updateCamera();
    audioManager.playSFX('door');
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

// Place the player in the overworld, standing on the island pond's west bank.
// This is the single source of truth for "where the player appears in the
// overworld" — used by both new games and loads so the player can never be
// warped to the top-left by a stale/interior saved position.
function placePlayerAtStartLocation() {
    // Stand the player on the grass just in front of the shack's door, facing
    // it. Derived from the shack so it stays correct if the shack moves; falls
    // back to the pond bank if the shack isn't spawned yet.
    const shack = getPlayerShack();
    if (shack) {
        const door = shack.getDoorTile();
        player.x = door.x;
        player.y = door.y + 1; // one tile below the door, on open ground
        player.facing = 'up';
    } else {
        player.x = ISLAND_POND_ORIGIN.x - 1;
        player.y = ISLAND_POND_ORIGIN.y + 2;
        player.facing = 'right';
    }
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
    // Scan every tile of each ring (Chebyshev radius r), nearest ring first —
    // an 8-direction spot check can miss a narrow path (e.g. the underworld's
    // grass strip beside the pond) and strand the player on the warp tile.
    for (let r = 1; r <= 8; r++) {
        for (let dx = -r; dx <= r; dx++) {
            for (let dy = -r; dy <= r; dy++) {
                if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
                const tx = sx + dx, ty = sy + dy;
                if (tx < 1 || tx >= CONFIG.WORLD_WIDTH - 1 || ty < 1 || ty >= CONFIG.WORLD_HEIGHT - 1) continue;
                const tile = world.tiles[tx] ? world.tiles[tx][ty] : null;
                if (!tile || tile.target || tile.type === 'pond') continue;
                if (isSolidTile(tx, ty)) continue;
                if (buildingAt(tx, ty)) continue;
                return { x: tx, y: ty };
            }
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
// ===== SLEEP FADE =====
// A black wipe over the whole screen when the player sleeps: fade out, run the
// day-advance at full black so the change isn't jarring, then fade back in.
let sleepFadeAlpha = 0;     // 0 = clear, 255 = black
let sleepFadeState = null;  // 'out' | 'in' | null
let sleepFadeAction = null; // deferred work, run once at full black
const SLEEP_FADE_SPEED = 10; // alpha/frame — ~0.4s each way at 60fps

function sleepFadeActive() { return sleepFadeState !== null; }

function startSleepFade(action) {
    sleepFadeState = 'out';
    sleepFadeAction = action;
}

// Draw + advance the fade. Called at the very end of draw() so it sits on top.
function updateSleepFade() {
    if (sleepFadeState === 'out') {
        sleepFadeAlpha = Math.min(255, sleepFadeAlpha + SLEEP_FADE_SPEED);
        if (sleepFadeAlpha >= 255) {
            if (sleepFadeAction) { sleepFadeAction(); sleepFadeAction = null; }
            sleepFadeState = 'in';
        }
    } else if (sleepFadeState === 'in') {
        sleepFadeAlpha = Math.max(0, sleepFadeAlpha - SLEEP_FADE_SPEED);
        if (sleepFadeAlpha <= 0) sleepFadeState = null;
    }
    if (sleepFadeAlpha > 0) {
        push();
        noStroke();
        fill(0, sleepFadeAlpha);
        rect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        pop();
    }
}

function trySleep() {
    if (!insideBuilding || !world) return false;
    if (sleepFadeActive()) return false; // already mid-transition
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

    // Fade to black, advance the day at the darkest point, then fade back in.
    startSleepFade(() => finishSleep(b, bedX, bedY));
    return true;
}

// The actual day-advance, run at full black by the sleep fade.
function finishSleep(b, bedX, bedY) {
    // Skip to next day 6:00 AM
    world.day++;
    world.timeMinutes = 6 * 60;
    // Peak Yeesh's midnight reward only fires if the player stayed awake for
    // the natural clock rollover, not this manual sleep-skip.
    if (typeof sleptPastMidnight !== 'undefined') sleptPastMidnight = true;
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

    // The Black Goddess: disco ball, neon trim, and roaming spotlights.
    if (b.type === 'ug_black_goddess' && typeof drawClubOverlay === 'function') {
        drawClubOverlay(b, offsetX, offsetY, TS);
    }

    // The Electric Temple interior currently has no fixed resident NPC.
    // (The old temple resident was retired with the neighbor rewrite.)

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
        const prevMinutes = world.timeMinutes;
        world.timeMinutes += gameMinutesPerRealMin * (deltaTime / 60000);
        freezeAtLateNight(world, prevMinutes);
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
        // grass.png is a 48x48 autotile sheet; sample its neutral center cell (fringe-free).
        if (grassSpr) { const o = grassSpr.width >= 48 ? 16 : 0; image(grassSpr, sx, sy, TS, TS, o, o, TS, TS); } else { fill('#7CB342'); noStroke(); rect(sx, sy, TS, TS); }
        drawHomeItem(tile.item, sx, sy, TS);
    } else if (tile.type === 'grass') {
        const spr = SPRITES['tiles.grass'];
        if (spr) {
            const o = spr.width >= 48 ? 16 : 0;
            image(spr, sx, sy, TS, TS, o, o, TS, TS);
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
        if (grassSpr) { const o = grassSpr.width >= 48 ? 16 : 0; image(grassSpr, sx, sy, TS, TS, o, o, TS, TS); } else { fill('#7CB342'); rect(sx, sy, TS, TS); }
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
    } else if (tile.type && tile.type.indexOf('cafe_') === 0 && typeof drawCafeTile === 'function') {
        // Stimmy Tim's fit-out (floor, counter, bistro tables — see cafe.js)
        drawCafeTile(tile, sx, sy, TS);
    } else if (tile.type && tile.type.indexOf('club_') === 0 && typeof drawClubTile === 'function') {
        // The Black Goddess fit-out (LED floor, DJ booth, speakers — see club.js)
        drawClubTile(tile, sx, sy, TS);
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

// True if a dims.w × dims.h building footprint fits on buildable land at (tx, ty).
function isFootprintClear(tx, ty, dims) {
    for (let dx = 0; dx < dims.w; dx++) {
        for (let dy = 0; dy < dims.h; dy++) {
            const cx = tx + dx, cy = ty + dy;
            if (cx < 1 || cx > CONFIG.WORLD_WIDTH - 2 || cy < 1 || cy > CONFIG.WORLD_HEIGHT - 2) return false;
            const tile = world.tiles[cx] && world.tiles[cx][cy];
            if (!tile || tile.type === 'sea' || tile.type === 'beach' || tile.type === 'water') return false;
            if (TILE_SOLID.has(tile.type)) return false;
            if (buildingAt(cx, cy)) return false;
        }
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

    if (!isFootprintClear(tx, ty, dims)) {
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
    roomCleaned();
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
        roomCleaned();
        return true;
    }
    if (tile.type === 'wall' && tile.deco) {
        const id = tile.deco;
        delete tile.deco;
        inventory.addItem(id, 1);
        notify('Took down ' + (ITEMS[id] ? ITEMS[id].name : id) + '.');
        roomCleaned();
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
            audioManager.playSFX('click');
            return false;
        } else if (key === 'm' || key === 'M') {
            if (typeof openMagicCastMenu === 'function') openMagicCastMenu();
            return false;
        } else if (key === 'p' || key === 'P') {
            // Name the Island Day: propose a name for a vote.
            if (typeof tryProposeIslandName === 'function') tryProposeIslandName();
            return false;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            // Check if facing a building - enter it
            if (tryEnterBuilding()) return false;
            // Check if facing the tunnel to/from the underground city
            if (tryEnterTunnel()) return false;
            // Check if facing an NPC - talk to them
            if (typeof npcAtFacing === 'function') {
                const npc = npcAtFacing();
                if (npc) {
                    if (typeof tryDeliverLostMailLetter === 'function' && tryDeliverLostMailLetter(npc)) return false;
                    if (typeof tryServeSweetTea === 'function' && tryServeSweetTea(npc)) return false;
                    if (typeof tryServeRiceBall === 'function' && tryServeRiceBall(npc)) return false;
                    openDialogue(npc);
                    return false;
                }
            }
            // Yogatron holiday interaction (before harvest)
            if (typeof tryTalkToYogatron === 'function' && tryTalkToYogatron()) return false;
            // Island God holiday interaction (before harvest)
            if (typeof tryTalkToIslandGod === 'function' && tryTalkToIslandGod()) return false;
            // Returning Bird holiday interaction (before harvest)
            if (typeof tryTalkToReturningBird === 'function' && tryTalkToReturningBird()) return false;
            // Lost Mail Day: pick up a letter off the beach (before harvest)
            if (typeof tryTalkToLostMail === 'function' && tryTalkToLostMail()) return false;
            // Well-Wishing Garden: talk to the gardener, then plant the flower at a door
            if (typeof tryTalkToWellWishGardener === 'function' && tryTalkToWellWishGardener()) return false;
            if (typeof tryPlaceWellWishFlower === 'function' && tryPlaceWellWishFlower()) return false;
            // The Petal Path Maker: talk to the path-artist, then lay petals at anchors
            if (typeof tryTalkToPetalPathArtist === 'function' && tryTalkToPetalPathArtist()) return false;
            if (typeof tryPlacePetal === 'function' && tryPlacePetal()) return false;
            // Memory Lantern Night: talk to the lantern-lighter for a lantern of your own
            if (typeof tryTalkToLanternLighter === 'function' && tryTalkToLanternLighter()) return false;
            // The Picnic Reset: talk to the organizer, or listen in on a seated pair
            if (typeof tryTalkToPicnicOrganizer === 'function' && tryTalkToPicnicOrganizer()) return false;
            if (typeof tryListenToPicnicPair === 'function' && tryListenToPicnicPair()) return false;
            // The Neighborhood Time Capsule: talk to the historian to donate or dig up
            if (typeof tryTalkToTimeCapsuleHistorian === 'function' && tryTalkToTimeCapsuleHistorian()) return false;
            // Tourist Time!: offer a beached tourist a gift for an IOU
            if (typeof tryTalkToTourist === 'function' && tryTalkToTourist()) return false;
            // Peak Saucy: talk to the bonfire elder for a cup of sweet tea
            if (typeof tryTalkToPeakSaucyElder === 'function' && tryTalkToPeakSaucyElder()) return false;
            // Cool Valley: talk to the elder for a rice ball, or leave an offering at a memory stone
            if (typeof tryTalkToCoolValleyElder === 'function' && tryTalkToCoolValleyElder()) return false;
            if (typeof tryLeaveMemoryOffering === 'function' && tryLeaveMemoryOffering()) return false;
            // Sweet Valley: build the beach altar, then offer a harvestable
            if (typeof tryBuildSweetValleyAltar === 'function' && tryBuildSweetValleyAltar()) return false;
            if (typeof tryOfferAtSweetValleyAltar === 'function' && tryOfferAtSweetValleyAltar()) return false;
            // Peak Yeesh: build the Everburn, or talk to the silent Papa Yeesh
            if (typeof tryBuildEverburn === 'function' && tryBuildEverburn()) return false;
            if (typeof tryTalkToPapaYeesh === 'function' && tryTalkToPapaYeesh()) return false;
            // The Flealess Market: talk to the traveling merchant to barter
            if (typeof tryTalkToFlealessMerchant === 'function' && tryTalkToFlealessMerchant()) return false;
            // Familiar Seller: talk to the traveling druid
            if (typeof tryTalkToFamiliarDruid === 'function' && tryTalkToFamiliarDruid()) return false;
            // Toast Toss interaction (only on holiday)
            if (typeof tryToastToss === 'function' && tryToastToss()) return false;
            // Garden Day: till soil with hoe before trying other interactions
            if (typeof tryTillSoil === 'function' && tryTillSoil()) return false;
            // Dig a Hole Day: pickaxe the facing ground / deepen the hole
            if (typeof tryDigHole === 'function' && tryDigHole()) return false;
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
            audioManager.playSFX('click');
            return false;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            // Stimmy Tim's: facing the counter opens the shop.
            if (typeof tryUseCafeCounter === 'function' && tryUseCafeCounter()) return false;
            // The Black Goddess: facing the DJ booth offers a dance-off.
            if (typeof tryUseClubBooth === 'function' && tryUseClubBooth()) return false;
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
            if (menuTab === 7) saveGame();
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
    // Flealess Market's Sturdy Pickaxe never breaks, any day.
    if (ITEMS[toolId] && ITEMS[toolId].unbreakable) return true;
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

// Shovel carves the faced grass tile into a dirt path; Grass Seed reverses a
// path back to grass. Both are facing-based (like the hoe). Neighboring path/grass
// tiles auto-redraw their fringe, so no hard edges appear while shaping.
function tryPathTool() {
    if (!player || !inventory) return false;
    const active = inventory.getActiveItem();
    if (!active || (active.id !== 'shovel' && active.id !== 'grass_seed')) return false;

    const facing = player.getFacingTile ? player.getFacingTile() : null;
    if (!facing || !facing.tile) return false;
    // Never carve under a building or solid feature (tree, rock, pond, etc.).
    if (typeof isSolidTile === 'function' && isSolidTile(facing.x, facing.y)) return false;
    if (typeof buildingAt === 'function' && buildingAt(facing.x, facing.y)) return false;

    if (active.id === 'shovel') {
        if (facing.tile.type !== 'grass') return false;
        facing.tile.type = 'path';
        facing.tile.variant = 0;
        notify('Carved a path.');
    } else { // grass_seed
        if (facing.tile.type !== 'path') return false;
        facing.tile.type = 'grass';
        facing.tile.variant = floor(random(3));
        notify('Grass grows back over the path.');
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
    audioManager.playSFX('harvest');
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

// ===== DIG A HOLE DAY =====
// One communal hole. Each Dig a Hole Day (~once a year) the player can deepen
// it once with a pickaxe; at depth 5 — the fifth year — it opens into a portal.
// Hole state lives on the tile (depth, lastDugDay) so it rides along in saves.
const HOLE_PORTAL_DEPTH = 5;

function findDugHole() {
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (t && t.type === 'dug_hole') return { x, y, tile: t };
        }
    }
    return null;
}

function tryDigHole() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Dig a Hole Day') return false;

    const facing = player.getFacingTile ? player.getFacingTile() : null;
    if (!facing || !facing.tile) return false;
    const t = facing.tile;
    const isHole = t.type === 'dug_hole';
    const isDiggable = (t.type === 'grass' || t.type === 'beach') && !buildingAt(facing.x, facing.y);
    if (!isHole && !isDiggable) return false;

    if (isHole && t.depth >= HOLE_PORTAL_DEPTH) {
        notify('The portal hums softly. Whatever lies beyond is still taking shape...');
        return true;
    }

    const active = inventory.getActiveItem();
    if (!active || active.id !== 'pickaxe') {
        if (isHole) { notify('Equip your pickaxe to dig the hole deeper!'); return true; }
        return false;
    }

    if (isHole) {
        if (t.lastDugDay === world.day) {
            notify('You already dug today. The hole rests until next Dig a Hole Day.');
            return true;
        }
        t.depth = (t.depth || 1) + 1;
        t.lastDugDay = world.day;
        if (t.depth >= HOLE_PORTAL_DEPTH) {
            notify('The hole breaks through! A shimmering portal swirls at the bottom!', 6000);
        } else {
            notify('You dig the hole deeper. Depth: ' + t.depth + '. Same time next year?', 4000);
        }
        return true;
    }

    // Starting a fresh hole — but the island only gets one.
    const hole = findDugHole();
    if (hole) {
        notify('The island already has its hole (over at ' + hole.x + ', ' + hole.y + '). Tradition demands you deepen that one.');
        return true;
    }
    world.tiles[facing.x][facing.y] = { type: 'dug_hole', depth: 1, lastDugDay: world.day, solid: true };
    notify('You start a hole. It is a fine hole. Come back next Dig a Hole Day!', 4500);
    return true;
}

// ===== NAME THE ISLAND DAY =====
// ponytail: ballot is transient — a reload mid-vote scraps it; the passed name
// itself is saved on the world.
let islandVote = null; // { name, yes, no, voted:Set of npc ids }

function tryProposeIslandName() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Name the Island Day') return false;
    const name = (window.prompt('Propose a name for the island:') || '').trim().slice(0, 24);
    if (!name) return true;
    islandVote = { name, yes: 0, no: 0, voted: new Set() };
    notify('Proposal: "' + name + '"! Go ask the neighbors to vote on it.', 4500);
    return true;
}

// Called from openDialogue: a greeted neighbor casts their vote.
function castIslandVote(npc) {
    if (!islandVote || islandVote.voted.has(npc.id)) return;
    islandVote.voted.add(npc.id);
    const yes = Math.random() < 0.5;
    if (yes) islandVote.yes++; else islandVote.no++;
    const present = (typeof npcs !== 'undefined') ? npcs.filter(n => n.isPresent).length : 1;
    const majority = Math.floor(present / 2) + 1;
    notify(npc.name + ' votes ' + (yes ? 'YES' : 'NO') + ' on "' + islandVote.name + '"! (' +
        islandVote.yes + ' yes / ' + islandVote.no + ' no, ' + majority + ' to decide)', 4000);
    if (islandVote.yes >= majority) {
        world.islandName = islandVote.name;
        notify('The vote passes! This island shall henceforth be known as ' + islandVote.name + '!', 6000);
        islandVote = null;
    } else if (islandVote.no >= majority) {
        notify('The vote fails. "' + islandVote.name + '" is rejected. Press P to propose another!', 5000);
        islandVote = null;
    }
}

// ===== CASTLE OF STICKS DAY =====
// 100 sticks + a click on open ground = a twig tower: a player-owned second
// shelter with a normal decorate-able interior. Placeholder colored-block
// sprite until real art lands.
function tryBuildTwigTower(tx, ty) {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Castle of Sticks Day') return false;
    const active = inventory.getActiveItem();
    if (!active || active.id !== 'stick') return false;

    if (buildings.some(b => b.type === 'twig_tower')) {
        notify('Your twig tower already stands proud. One castle per island.');
        return true;
    }
    if (!inventory.hasItem('stick', 100)) {
        notify('A twig tower takes 100 sticks. You have ' + inventory.countItem('stick') + '.');
        return true;
    }
    const dims = BUILDING_TIERS.twig_tower;
    if (!isFootprintClear(tx, ty, dims)) {
        notify("Can't raise the tower there — clear some open ground first.");
        return true;
    }
    const b = new Building('twig_tower', tx, ty, 'player');
    buildings.push(b);
    clearBuildingFootprint(b);
    inventory.removeItem('stick', 100);
    notify('You lash 100 sticks into a mighty Twig Tower! Step inside and decorate it.', 5500);
    return true;
}

// ===== CLEAN YOUR ROOM DAY =====
// Waking up at home on the holiday locks the front door until the player
// moves or removes one furnishing. ponytail: not saved — reloading skips the chore.
let roomCleanDebt = false;

function onCleanRoomNewDay() {
    roomCleanDebt = false;
    const h = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!h || h.name !== 'Clean Your Room Day') return;
    if (!insideBuilding || insideBuilding.owner !== 'player') return; // only when waking in your own home
    // Softlock guard: nothing placed and nothing placeable = room already spotless.
    if (!roomHasSomethingToTidy(insideBuilding)) {
        notify("Clean Your Room Day! Your room is already spotless. Enjoy the day off.", 4000);
        return;
    }
    roomCleanDebt = true;
    notify('Clean Your Room Day: tidy up — move or put away one furnishing — before you go outside!', 4500);
}

function roomHasSomethingToTidy(b) {
    for (let x = 0; x < b.interiorW; x++) {
        for (let y = 0; y < b.interiorH; y++) {
            const t = b.interiorTiles[x][y];
            if (t && (t.type === 'home' || (t.type === 'wall' && t.deco))) return true;
        }
    }
    return inventory.slots.some(s => s && ITEMS[s.id] && ITEMS[s.id].home);
}

function roomCleaned() {
    if (!roomCleanDebt) return;
    roomCleanDebt = false;
    notify('The room looks better already. Now you may go outside!', 3500);
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
        // Always re-enter the overworld in front of the pond (never warp top-left).
        placePlayerAtStartLocation();
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
    carveStarterPaths();
    npcs = [];
    knownMagic = [];
    magicFlags = { mubabaQuest: false, mubabaMet: false, usurperBanished: false, domStep: 0 };
    birds = [];
    crabs = [];
    groundLoot = [];
    _lastAnimalHour = null;
    if (typeof questLoad === 'function') questLoad(null); // fresh quest state
    // Spawn first neighbor
    checkArrivals();
    // Spawn initial animals at the start of the day
    if (typeof onAnimalNewDay === 'function') onAnimalNewDay();
    // Spawn hog if not already present (fresh games)
    if (typeof spawnHog === 'function' && !hog) spawnHog();
    // Stand the player on the island pond's west bank (single source of truth).
    placePlayerAtStartLocation();
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

// Carve a couple of dirt paths from the player's shack door out to nearby
// landmarks (the arrivals dock) at world gen. Paths plow through grass
// and any grass decorations (trees, rocks, flowers) that fell on the route, but
// leave sea, beach, ponds, docks and buildings untouched. The path tiles autotile
// their grassy fringe at draw time.
function carveStarterPaths() {
    const shack = buildings.find(b => b.type === 'shack' && b.owner === 'player');
    if (!shack) return;
    const door = shack.getDoorTile();
    const start = { x: door.x, y: door.y + 1 }; // open tile just in front of the door
    // Only the dock gets a starter path. The tunnel to the underground city is
    // deliberately left pathless so it reads as a natural oddity you stumble on.
    const targets = [
        ISLAND_DOCK_ARRIVAL, // the west-beach dock landing
    ];
    for (const t of targets) carveMeanderingPath(start.x, start.y, t.x, t.y);
}

// Step from (x0,y0) toward (x1,y1) one tile at a time, mostly along the larger
// axis with an occasional perpendicular wobble, stamping a 3-wide swath of path
// on grass as it goes. 3 wide gives a solid dirt center column with grass-framed
// edge columns (a 1-wide path is all fringe and looks anemic).
function carveMeanderingPath(x0, y0, x1, y1) {
    let x = x0, y = y0, guard = 0;
    // Grass and grass-based decorations the path may pave over. Sea/beach/pond/dock/
    // building tiles aren't listed, so the path routes around them as before.
    const CLEARABLE = new Set(['grass', 'tree', 'fir_tree', 'rock', 'shiny_rock', 'weeds', 'bird_poop', 'rosebush', 'tulip']);
    const lay = (px, py) => {
        if (px < 0 || px >= CONFIG.WORLD_WIDTH || py < 0 || py >= CONFIG.WORLD_HEIGHT) return;
        const row = world.tiles[px];
        const t = row && row[py];
        if (!t || !CLEARABLE.has(t.type)) return;
        // Trees are 2-tall (trunk + canopy above). Clear both tiles so paving the
        // trunk doesn't leave a canopy floating over the path; the paired tile drops
        // back to grass and is re-paved by a later stamp if it's also on the route.
        if (t.type === 'tree' || t.type === 'fir_tree') {
            const trunkY = t.isTreeTop ? py + 1 : py;
            if (trunkY - 1 >= 0) row[trunkY - 1] = { type: 'grass', variant: floor(random(3)) };
            row[trunkY] = { type: 'grass', variant: floor(random(3)) };
        }
        row[py] = { type: 'path', variant: 0 };
    };
    const stamp = (cx, cy) => { for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) lay(cx + a, cy + b); };
    while ((x !== x1 || y !== y1) && guard++ < 500) {
        stamp(x, y);
        const dx = x1 - x, dy = y1 - y;
        if (Math.abs(dx) >= Math.abs(dy)) {
            if (random() < 0.15 && dy !== 0) y += Math.sign(dy); else x += Math.sign(dx);
        } else {
            if (random() < 0.15 && dx !== 0) x += Math.sign(dx); else y += Math.sign(dy);
        }
    }
    stamp(x1, y1);
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
        // Always re-enter the overworld in front of the pond (never warp top-left).
        placePlayerAtStartLocation();
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
        if (typeof almDiscover === 'function') almDiscover('item:' + itemId);

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
// 3-frame walk rows play center→step→center→other-step (1,2,1,3 in 1-indexed art terms).
const WALK_CYCLE_3 = [0, 1, 0, 2];
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

const GHOST_FRAME_MS = 450;    // idle-float alternation cadence for ghosts

// Draw a character sprite at (dx,dy) as a TS-wide x 2*TS-tall figure.
// facing: 'down'|'up'|'left'|'right'. moving: bool.
// idleAnim: alternate frames on a timer even when standing still (ghosts float).
// Returns false if no sprite.
function drawCharacterSprite(spr, dx, dy, facing, moving, idleAnim) {
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
    let frame = 0;
    if (idleAnim) frame = Math.floor(millis() / GHOST_FRAME_MS) % cols;
    else if (moving) frame = (cols === 3) ? WALK_CYCLE_3[phase % WALK_CYCLE_3.length] : (phase % cols);
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
// Type of the tile at (x,y) on the active map, or null if out of bounds.
function tileTypeAt(x, y) {
    if (x < 0 || x >= CONFIG.WORLD_WIDTH || y < 0 || y >= CONFIG.WORLD_HEIGHT) return null;
    const t = world.tiles[x] && world.tiles[x][y];
    return t ? t.type : null;
}

// New terrain tiles (grass, path) ship as a 48x48 "9-tile" autotile sheet: a
// neutral center cell (16,16) plus a soft transition fringe painted around the
// outer ring. We composite the fringe per side: for each orthogonal neighbor that
// is "foreign" (a different terrain we blend toward), overlay just that side's
// fringe strip from the matching edge cell. Doing it per-side (not one whole
// edge cell) means arbitrary shapes — 1-wide paths, corners, peninsulas — never
// show a hard edge, since opposite/adjacent fringes stack. EDGE_FRINGE covers the
// deepest wave of the hand-drawn border (~6px); inner strip pixels match the
// center, so over-covering is invisible.
const EDGE_FRINGE = 6;
function drawEdgeFringe(sheet, x, y, screenX, screenY, TS, isForeign) {
    if (!sheet || sheet.width < 48 || sheet.height < 48) return;
    const S = EDGE_FRINGE;
    if (isForeign(0, -1)) image(sheet, screenX, screenY, TS, S, 16, 0, 16, S);              // N
    if (isForeign(0, 1))  image(sheet, screenX, screenY + TS - S, TS, S, 16, 48 - S, 16, S); // S
    if (isForeign(-1, 0)) image(sheet, screenX, screenY, S, TS, 0, 16, S, 16);              // W
    if (isForeign(1, 0))  image(sheet, screenX + TS - S, screenY, S, TS, 48 - S, 16, S, 16); // E

    // Outside (convex) corners: where two edge strips meet, the second strip's inner
    // (dirt) half overwrites the first strip's grass, leaving a dirt bump poking into
    // the grass. Repaint the corner with the sheet's proper wrapped-grass corner cell.
    if (isForeign(0, -1) && isForeign(-1, 0)) image(sheet, screenX, screenY, S, S, 0, 0, S, S);                            // NW
    if (isForeign(0, -1) && isForeign(1, 0))  image(sheet, screenX + TS - S, screenY, S, S, 48 - S, 0, S, S);              // NE
    if (isForeign(0, 1)  && isForeign(-1, 0)) image(sheet, screenX, screenY + TS - S, S, S, 0, 48 - S, S, S);              // SW
    if (isForeign(0, 1)  && isForeign(1, 0))  image(sheet, screenX + TS - S, screenY + TS - S, S, S, 48 - S, 48 - S, S, S); // SE

    // Inside (concave) corners: a diagonal neighbor is foreign while both adjacent
    // orthogonals match, so no edge strip covers that corner and it reads as a hard
    // notch. Overlay the sheet's rounded inner-corner nub — grass filling the corner
    // that eases back to the center. These live in a second 48-wide block (right half
    // of a 96x48 sheet), so this only fires for sheets that ship them (dirt paths).
    if (sheet.width >= 96) {
        const IN = 48; // right block origin: grass field + dirt border with rounded inner corners
        if (isForeign(-1, -1) && !isForeign(0, -1) && !isForeign(-1, 0)) image(sheet, screenX, screenY, S, S, IN + 40, 40, S, S);                     // NW
        if (isForeign(1, -1)  && !isForeign(0, -1) && !isForeign(1, 0))  image(sheet, screenX + TS - S, screenY, S, S, IN + 2, 40, S, S);             // NE
        if (isForeign(-1, 1)  && !isForeign(0, 1)  && !isForeign(-1, 0)) image(sheet, screenX, screenY + TS - S, S, S, IN + 40, 2, S, S);             // SW
        if (isForeign(1, 1)   && !isForeign(0, 1)  && !isForeign(1, 0))  image(sheet, screenX + TS - S, screenY + TS - S, S, S, IN + 2, 2, S, S);     // SE
    }
}

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

// The underworld path is grass rows 9-11. The Bottomless Pit marker ('bp')
// sits at CSV col 0, row 11 and caps the path's west end; the pond marker
// ('p') is at CSV col 74, row 10.
// The 6x6 pond extends up/right from there, so its top-left is at (74, 5).
const UNDERGROUND_POND_ORIGIN = { x: 74, y: 5 };   // top-left of the 6x6 underground pond
const UNDERGROUND_POND_LANDING = { x: 76, y: 8 };  // inner water tile; used as the island pond's warp target

// The hole-in-the-ground tunnels that replace the ponds as the route between
// the surface and the underground city. Each is a solid 3x3 (48x48px) natural
// feature — no path leads to it; interacting with it prompts a yes/no to travel
// (see placeTunnel()/tryEnterTunnel()). Landings are a walkable tile just south
// of the *far* tunnel, so you surface/emerge right beside the opposite hole.
const ISLAND_TUNNEL_ORIGIN       = { x: 47, y: 39 }; // top-left of the 3x3 island tunnel
const ISLAND_TUNNEL_LANDING      = { x: 48, y: 42 }; // grass just south of the island tunnel
const UNDERGROUND_TUNNEL_LANDING = { x: 75, y: 11 }; // path just south of the underground tunnel

// The island tunnel doesn't exist at the start of the game — the earth breaks
// open overnight on the 3rd day of the first Saucy season (day 41 = Saucy day 1).
const TUNNEL_REVEAL_DAY = 43;

// Open the island tunnel if it isn't already there. Idempotent, so it's safe to
// call on the reveal morning (see onNewDay) and again on load as a backstop.
function revealIslandTunnel() {
    const m = (typeof maps !== 'undefined' && maps.island) ? maps.island : world;
    if (!m || !m.tiles || !m.tiles[ISLAND_TUNNEL_ORIGIN.x]) return;
    const t = m.tiles[ISLAND_TUNNEL_ORIGIN.x][ISLAND_TUNNEL_ORIGIN.y];
    if (t && t.type === 'tunnel') return;
    m.placeTunnel(ISLAND_TUNNEL_ORIGIN.x, ISLAND_TUNNEL_ORIGIN.y, 'underground',
                  UNDERGROUND_TUNNEL_LANDING.x, UNDERGROUND_TUNNEL_LANDING.y, 'down');
}

// Mubaba waits inside his fortress (isPresent stays false, so this is never
// drawn — see generateUnderground()/magic.js). The fortress is the 6th building
// in the CSV row of 'b' markers (0-indexed: building 5).
const MUBABA_SPAWN = { x: 46, y: 4 };

// Building types placed left-to-right from the 'b' markers in underworld.csv.
// The CSV has 7 markers, one per canonical underground building. The Bottomless
// Pit is not part of the strip — it has its own 'bp' marker capping the path's
// west end (the pond caps the east).
const UNDERGROUND_STRIP = [
    // West -> East (x increasing).
    'ug_inner_temple', 'ug_stimmy_tims', 'ug_black_goddess',
    'ug_electric_temple', 'ug_mubaba_fortress', 'ug_gettin', 'ug_recycle_bin'
];

// Dimensions of the CSV-authored area embedded in the top-left of the 100x100 world.
const UNDERWORLD_CSV_WIDTH = 80;

// Where the Teleport trick (magic.js) drops the player: one tile clear of
// each map's pond, so it never lands on a warp tile.
const TELEPORT_LANDINGS = {
    island:      { x: 50, y: 45, facing: 'down' },
    underground: { x: 73, y: 9, facing: 'down' }
};

// Multi-tile footprint sizes used when expanding CSV symbols.
const UNDERGROUND_BUILDING_SIZE = { w: 8 };
const UNDERGROUND_TREE_SIZE = { w: 1, h: 2 };
const UNDERGROUND_POND_SIZE = { w: 6, h: 6 };

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

// Parse the underworld.csv lines loaded by preload(). Cells are trimmed and
// empty cells become '.'. Strips a leading BOM from the first cell if present.
function parseUnderworldCSV(lines) {
    if (!lines || !lines.length) return [];
    const rows = [];
    for (const line of lines) {
        if (!line || !line.trim()) {
            // Preserve blank rows as all '.' so row indices stay stable.
            rows.push(new Array(UNDERWORLD_CSV_WIDTH).fill('.'));
            continue;
        }
        const cells = line.split(',').map(s => s.trim());
        if (rows.length === 0 && cells[0] && cells[0].charCodeAt(0) === 0xFEFF) {
            cells[0] = cells[0].slice(1);
        }
        rows.push(cells);
    }
    return rows;
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

    // The underground city is now authored in underworld.csv and loaded here.
    // The CSV is embedded in the top-left of the 100x100 world; everything outside
    // it stays solid ug_wall. Symbols use bottom-left anchoring for tall objects
    // (tree, building) and the pond is placed via its top-left equivalent so it
    // lines up with World.placePond().
    generateUnderground() {
        const W = CONFIG.WORLD_WIDTH, H = CONFIG.WORLD_HEIGHT;
        // Solid wall everywhere.
        for (let x = 0; x < W; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < H; y++) {
                this.tiles[x][y] = { type: 'ug_wall', variant: 6 + floor(random(4)), solid: true };
            }
        }

        const csv = parseUnderworldCSV(underworldCSVLines);
        if (!csv || csv.length === 0) {
            console.warn('underworld.csv failed to load; using fallback wall.');
            this.entities = { buildings: [], npcs: [] };
            return;
        }

        // Mark which cells are occupied by expanding multi-tile symbols.
        const occupied = new Set();
        function mark(x, y, w, h) {
            for (let dx = 0; dx < w; dx++) {
                for (let dy = 0; dy < h; dy++) {
                    occupied.add((x + dx) + ',' + (y + dy));
                }
            }
        }

        const placed = [];
        let buildingIndex = 0;
        const bSize = UNDERGROUND_BUILDING_SIZE;
        const tSize = UNDERGROUND_TREE_SIZE;

        for (let r = 0; r < csv.length; r++) {
            const row = csv[r];
            for (let c = 0; c < row.length; c++) {
                const sym = row[c];
                const wx = c;
                const wy = r; // bottom-left anchor row for tall objects
                if (sym === 'g') {
                    this.tiles[wx][wy] = { type: 'grass_underworld', variant: 0 };
                } else if (sym === 't') {
                    // 2-tall underground tree, bottom-left anchored. The bottom tile
                    // draws the full tree; the top tile is plain wall.
                    if (wy >= 0 && wy < H) {
                        this.tiles[wx][wy] = { type: 'ug_wall', variant: floor(random(3)), solid: true };
                        mark(c, r, tSize.w, tSize.h);
                    }
                    const topY = wy - 1;
                    // Only claim the top tile if it's still untouched wall, so a
                    // tree row never clobbers an authored grass/path row above it.
                    if (topY >= 0 && topY < H && this.tiles[wx][topY].type === 'ug_wall') {
                        this.tiles[wx][topY] = { type: 'ug_wall', variant: 6 + floor(random(4)), solid: true };
                    }
                } else if (sym === 'b' || sym === 'bp') {
                    // 'b': the next building in UNDERGROUND_STRIP.
                    // 'bp': the Bottomless Pit, capping the path's west end.
                    const type = (sym === 'bp') ? 'ug_bottomless_pit' : UNDERGROUND_STRIP[buildingIndex++];
                    if (!type) continue;
                    const def = BUILDING_TIERS[type] || {};
                    const bw = def.w || bSize.w;  // strip buildings are 8 wide; the pit is 4
                    const bh = def.h || 8;        // height varies per building (Stimmy Tim's is 5)
                    // Bottom-left anchored in the CSV: the marker row is the building's bottom row.
                    const gx = wx;
                    const gy = wy - bh + 1;
                    if (gy >= 0) {
                        // Carve the exact footprint to grass.
                        for (let dx = 0; dx < bw; dx++) {
                            for (let dy = 0; dy < bh; dy++) {
                                const bx = gx + dx, by = gy + dy;
                                if (bx < W && by < H) {
                                    this.tiles[bx][by] = { type: 'grass_underworld', variant: 0 };
                                }
                            }
                        }
                        placed.push(new Building(type, gx, gy, null));
                        mark(c, r, bw, bh);
                    }
                } else if (sym === 'p') {
                    // The exit tunnel back to the surface: a 3x3 hole, bottom-left
                    // anchored in the CSV; convert to top-left for placeTunnel.
                    const originX = wx;
                    const originY = wy - 2;
                    this.placeTunnel(originX, originY, 'island',
                                     ISLAND_TUNNEL_LANDING.x, ISLAND_TUNNEL_LANDING.y, 'down');
                    mark(c, r, 3, 3);
                }
                // '.' and anything else leave the solid ug_wall from initialization.
            }
        }

        // Mubaba awaits inside his fortress (isPresent false keeps him off the
        // map; entering the fortress talks to this record — see magic.js).
        const mubaba = new NPC(MUBABA_DEF, 'mubaba');
        mubaba.gridX = MUBABA_SPAWN.x;
        mubaba.gridY = MUBABA_SPAWN.y;
        mubaba.facing = 'down';
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

    // Lay a 3x3 impassable tunnel (a hole in the ground) at (originX, originY)
    // (top-left corner). Every tile is solid so the player can't cross it; each
    // carries the warp `target`, so facing any edge tile and interacting offers
    // to travel (see tryEnterTunnel()). Drawn as one 48x48 image from tunnelOrigin.
    placeTunnel(originX, originY, targetMap, targetX, targetY, facing) {
        const T = 3;
        for (let px = 0; px < T; px++) {
            for (let py = 0; py < T; py++) {
                const tx = originX + px, ty = originY + py;
                if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
                this.tiles[tx][ty] = {
                    type: 'tunnel', solid: true,
                    tunnelOrigin: (px === 0 && py === 0),
                    target: { map: targetMap, x: targetX, y: targetY, facing: facing || 'down' }
                };
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

        // Place the tunnel to the underground city near-center, slightly above.
        // It's an impassable 3x3 hole (no path leads to it — it reads as a natural
        // oddity); interacting with it prompts to drop through (see tryEnterTunnel()).
        // It only exists from its reveal day on (see revealIslandTunnel); a fresh
        // island generates without it. Saved tiles restore it on load past that day.
        if (this.day >= TUNNEL_REVEAL_DAY) {
            this.placeTunnel(ISLAND_TUNNEL_ORIGIN.x, ISLAND_TUNNEL_ORIGIN.y, 'underground',
                             UNDERGROUND_TUNNEL_LANDING.x, UNDERGROUND_TUNNEL_LANDING.y, 'down');
        }

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
                this.drawTunnelOverlay(x, y, this.tiles[x][y]);
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
            const prevMinutes = this.timeMinutes;
            this.timeMinutes += gameMinutesPerRealMin * (deltaTime / 60000);
            freezeAtLateNight(this, prevMinutes);
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

    drawTunnelOverlay(x, y, tile) {
        if (!tile || tile.type !== 'tunnel' || !tile.tunnelOrigin) return;
        const spr = SPRITES[this.kind === 'underground' ? 'tiles.tunnel_ug' : 'tiles.tunnel_surface'];
        const TS = CONFIG.TILE_SIZE;
        const screenX = x * TS;
        const screenY = y * TS;
        if (spr) {
            image(spr, screenX, screenY, TS * 3, TS * 3);
        } else {
            fill('#1A1A1A');
            ellipse(screenX + TS * 1.5, screenY + TS * 1.5, TS * 2.5, TS * 2);
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

        // Underground thicket: bottom-anchored 32px trees/boulders on 16px
        // tiles. Deferred here so neighbouring wall bases can't clip them.
        // variant 0-2 tree, 3-5 boulder, >=6 plain rock for breathing room.
        if (tile.type === 'ug_wall') {
            // variant 0-2 tree, 3-5 boulder, >=6 plain rock for breathing room.
            if (tile.variant < 3) {
                const spr = SPRITES['tiles.tree_full_underground'];
                if (spr) image(spr, screenX - (spr.width - TS) / 2, screenY - (spr.height - TS)); // trunk centered
            } else if (tile.variant < 6) {
                // Boulder covers a 2x2 tile footprint, anchored at its tile's bottom-left
                // (extends up and right) instead of centered, so it never hangs into — and
                // gets clipped against — the neighbour to its left.
                const spr = SPRITES['tiles.boulder'];
                if (spr) image(spr, screenX, screenY - (spr.height - TS));
            }
            return;
        }

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

        // Surface rock: 32px sprite on a 16px tile, anchored at its tile's bottom-left
        // so it fills a 2x2 footprint (extends up and right) without hanging into — and
        // being clipped against — its neighbours. Deferred here so base terrain can't
        // clip it; the enclosing withBackflip still spins it on Backflip Day.
        if (tile.type === 'rock') {
            const spr = SPRITES['tiles.rock'];
            if (!spr) return;
            if (tile.depleted) tint(160, 160, 160);
            image(spr, screenX, screenY - (spr.height - TS));
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
                const spr = SPRITES['sprites.' + npcSlug(npc.name)];
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
            if (!g) { fill('#7CB342'); rect(screenX, screenY, TS, TS); return; }
            if (g.width >= 48 && g.height >= 48) {
                // 48x48 autotile sheet: neutral grass in the center, sandy fringe
                // composited on any side facing beach (replaces the old beach_edge overlay).
                image(g, screenX, screenY, TS, TS, 16, 16, TS, TS);
                drawEdgeFringe(g, x, y, screenX, screenY, TS, (dx, dy) => tileTypeAt(x + dx, y + dy) === 'beach');
            } else {
                // Legacy single-tile / big-texture grass: sample by world position so it tiles.
                const cols = Math.max(1, Math.floor(g.width / TS));
                const rows = Math.max(1, Math.floor(g.height / TS));
                const srcX = (((x % cols) + cols) % cols) * TS;
                const srcY = (((y % rows) + rows) % rows) * TS;
                image(g, screenX, screenY, TS, TS, srcX, srcY, TS, TS);
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
            case 'ug_wall': {
                // The underground strip's boxing wall: just the dark cavern base
                // here. The scattered trees/boulders overflow their 16px tile
                // (sprites are 32px wide), so they're deferred to the tall-
                // decoration pass — otherwise the next column's base rect clips
                // their right edge. See drawTallDecoration.
                noStroke();
                fill('#1E1A17');
                rect(screenX, screenY, TS, TS);
                break;
            }
            case 'grass_underworld': {
                const gug = SPRITES['tiles.grass_underworld'];
                if (gug) {
                    image(gug, screenX, screenY, TS, TS);
                } else {
                    fill('#5A6B3A');
                    rect(screenX, screenY, TS, TS);
                }
                break;
            }
            case 'ug_pit': {
                fill('#0D0D0D');
                rect(screenX, screenY, TS, TS);
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
                // Beach-edge overlay: a grass tile bordering beach draws a sand fringe over
                // the grass. The 48x48 autotile grass sheet paints its own sand edge in
                // drawGrass(), so only the legacy 16x16 (seasonal) grass needs beach_edge.png.
                {
                    const g = SPRITES[seasonalGrassKey()] || SPRITES['tiles.grass'];
                    if (!(g && g.width >= 48 && g.height >= 48)) {
                        drawBeachEdgeOverlay(x, y, screenX, screenY, TS);
                    }
                }
                break;
            }
            case 'path': {
                // Dirt path (48x48 autotile sheet): center dirt + grassy fringe on any side
                // facing non-path terrain, so shaping paths never leaves a hard edge.
                const p = SPRITES['tiles.path'];
                if (p && p.width >= 48 && p.height >= 48) {
                    image(p, screenX, screenY, TS, TS, 16, 16, TS, TS);
                    drawEdgeFringe(p, x, y, screenX, screenY, TS, (dx, dy) => {
                        const t = tileTypeAt(x + dx, y + dy);
                        return t !== null && t !== 'path';
                    });
                } else if (p) {
                    image(p, screenX, screenY, TS, TS);
                } else {
                    fill('#7A5A3A');
                    rect(screenX, screenY, TS, TS);
                }
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
                // Grass base only (static). The 32px rock sprite overflows its 16px
                // tile, so it's deferred to the tall-decoration pass (drawTallDecoration)
                // — otherwise the next column's grass base clips its right edge. The
                // sprite alone rotates on Backflip Day so the grass stays put.
                drawBase('grass');
                if (!SPRITES['tiles.rock']) {
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
            case 'dug_hole': {
                // Dig a Hole Day: deeper = wider and darker; depth 5 is a portal.
                drawBase('grass');
                const depth = tile.depth || 1;
                noStroke();
                if (depth >= HOLE_PORTAL_DEPTH) {
                    fill('#1A0533');
                    ellipse(screenX + TS / 2, screenY + TS / 2, TS - 2, TS - 4);
                    const pulse = Math.sin(frameCount * 0.15) * 2;
                    noFill();
                    stroke('#B368FF');
                    strokeWeight(1);
                    ellipse(screenX + TS / 2, screenY + TS / 2, TS - 6 - pulse, TS - 8 - pulse);
                    ellipse(screenX + TS / 2, screenY + TS / 2, (TS - 6 - pulse) / 2, (TS - 8 - pulse) / 2);
                    noStroke();
                } else {
                    const w = 5 + depth * 2;
                    fill('#5D4037');
                    ellipse(screenX + TS / 2, screenY + TS / 2, w + 2, w * 0.75 + 2);
                    fill(lerpColor(color('#4E342E'), color('#000000'), depth / HOLE_PORTAL_DEPTH));
                    ellipse(screenX + TS / 2, screenY + TS / 2, w, w * 0.75);
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
            case 'tunnel': {
                // The tunnel sprite is drawn later as one 48x48 overlay from
                // tunnelOrigin; this pass just lays the matching ground beneath it.
                drawBase(this.kind === 'underground' ? 'grass_underworld' : 'grass');
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
            islandName: this.islandName || '',
            tiles: this.tiles
        };
    }

    deserialize(data) {
        this.day = data.day;
        this.season = data.season;
        this.timeMinutes = data.timeMinutes;
        this.islandName = data.islandName || '';
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

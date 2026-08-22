// ===== FLOATING ISLANDS: THE INFINITE DESCENT =====
// See WorldRedesign/08_FLOATING_ISLANDS.md. The world is a one-way chain of
// islands floating in a void. Walk into the void at any edge, confirm, and you
// fall to the next island down. You can never go back up.
//
// ponytail: there is no island *stack*. Only one island is ever live — the
// existing `maps.island` slot, regenerated in place on each fall. Since the
// descent is one-way by design, keeping dead islands in memory (and in the
// save) would buy nothing, and every `currentMapId === 'island'` check across
// the codebase keeps working untouched. Add a stack only if backtracking
// ever becomes a thing (the whole point is that it doesn't).
//
// Depth 0 is the original island — beach, dock, sea, pond, tunnel — unchanged.
// Depth 1+ are the biome islands generated below.

// Each island is still drawn on the engine's 100x100 tile grid; the island's
// *land* is a centered square and everything outside it is void. So land size
// is set by the void margin, not by a per-island grid size.
// ponytail: per-island grid dimensions (09_ISLAND_SIZING) would mean making
// CONFIG.WORLD_WIDTH per-world, which every file reads directly. Margins give
// the same varying land areas for free. Revisit if 80x80 town ever feels cramped.
const ISLAND_GRID = CONFIG.WORLD_WIDTH;   // 100 — the engine grid every island is drawn on

const ISLAND_BIOMES = [
    {
        id: 'meadow', name: 'The Meadow', land: 50,
        blurb: 'Flowers all the way to the edge. Nothing here wants anything from you.',
        sky: [150, 195, 230],
        decor: [['tulip', 16], ['rosebush', 8], ['tree', 4], ['bird_poop', 4]],
    },
    {
        id: 'woods', name: 'The Woods', land: 56,
        blurb: 'Dappled light. Something moves and it is only ever a bird.',
        sky: [128, 178, 205],
        decor: [['tree', 44], ['fir_tree', 16], ['rock', 8], ['shiny_rock', 3]],
    },
    {
        id: 'town', name: 'The Town', land: 80,
        blurb: 'Room enough for everyone who jumped after you.',
        sky: [205, 185, 150],
        decor: [['tree', 12], ['rosebush', 4], ['bird_poop', 6]],
    },
    {
        id: 'city', name: 'The City', land: 60,
        blurb: 'Cozy-urban. The clock tower has not been built yet.',
        sky: [175, 160, 185],
        decor: [['rock', 14], ['tree', 6], ['shiny_rock', 4]],
    },
    {
        id: 'deep_woods', name: 'The Deep Woods', land: 60,
        blurb: 'Spooky, but the cozy kind. The trees lean in to listen.',
        sky: [95, 105, 135],
        decor: [['fir_tree', 46], ['tree', 14], ['rock', 8], ['shiny_rock', 2]],
    },
    {
        id: 'mountain', name: 'The Mountain', land: 56,
        blurb: 'Look up. Everything you left is up there, small and gold.',
        sky: [120, 150, 190],
        decor: [['rock', 56], ['shiny_rock', 8], ['fir_tree', 14]],
    },
];

// Depth 0 = the original island. Depth 1..6 = the fixed biomes above.
// Depth 7+ reuses a biome at random until procedural generation exists.
// ponytail: a random re-pick is the whole "infinite below" for now — it keeps
// the descent endless without pretending we have Phase 5 content.
function islandBiomeFor(depth) {
    if (depth <= 0) return null;
    return ISLAND_BIOMES[(depth - 1) % ISLAND_BIOMES.length];
}

function islandDepth() { return (world && world.depth) || 0; }
function onBiomeIsland() { return !!(world && world.biome && currentMapId === 'island'); }

// Tiles outside the land square are void. Land is centered on the grid.
function islandVoidMargin(landSize) { return Math.floor((ISLAND_GRID - landSize) / 2); }

function isVoidTile(x, y) {
    if (!world || !world.tiles[x] || !world.tiles[x][y]) return false;
    return world.tiles[x][y].type === 'void';
}

// ===== GENERATION =====

// Fill `w.tiles` with a floating island for `biome`. Mirrors World.generateWorld()
// but with a void ring instead of an ocean, and a per-biome decoration mix.
function generateBiomeIsland(w, biome) {
    const m = islandVoidMargin(biome.land);
    const lo = m, hi = ISLAND_GRID - m - 1;
    w.tiles = [];
    for (let x = 0; x < ISLAND_GRID; x++) {
        w.tiles[x] = [];
        for (let y = 0; y < ISLAND_GRID; y++) {
            const onLand = x >= lo && x <= hi && y >= lo && y <= hi;
            w.tiles[x][y] = onLand
                ? { type: 'grass', variant: Math.floor(Math.random() * 3) }
                : { type: 'void', variant: 0, solid: true };
        }
    }
    // Nibble the corners so the island reads as a landmass, not a box.
    const bite = Math.max(3, Math.floor(biome.land * 0.18));
    for (const [cx, cy] of [[lo, lo], [hi, lo], [lo, hi], [hi, hi]]) {
        const sx = cx === lo ? 1 : -1, sy = cy === lo ? 1 : -1;
        for (let i = 0; i < bite; i++) {
            const run = bite - i - Math.floor(Math.random() * 2);
            for (let j = 0; j < run; j++) {
                const x = cx + sx * i, y = cy + sy * j;
                if (x < 0 || x >= ISLAND_GRID || y < 0 || y >= ISLAND_GRID) continue;
                w.tiles[x][y] = { type: 'void', variant: 0, solid: true };
            }
        }
    }

    // Scatter decorations, keeping a clear band inside the edge so nothing
    // renders half-over the void, and leaving the middle open for buildings.
    const EDGE_CLEAR = 3;
    for (const [type, count] of biome.decor) {
        let placed = 0;
        for (let tries = 0; placed < count && tries < count * 40; tries++) {
            const x = lo + EDGE_CLEAR + Math.floor(Math.random() * (biome.land - EDGE_CLEAR * 2));
            const y = lo + EDGE_CLEAR + Math.floor(Math.random() * (biome.land - EDGE_CLEAR * 2));
            if (!w.tiles[x] || !w.tiles[x][y] || w.tiles[x][y].type !== 'grass') continue;
            if (type === 'tree' || type === 'fir_tree') {
                const before = w.tiles[x][y].type;
                w.placeTree(x, y, type);
                if (w.tiles[x][y].type === before) continue;
            } else {
                w.tiles[x][y] = { type, variant: Math.floor(Math.random() * 2) };
            }
            placed++;
        }
    }
}

// ===== THE FALL =====

let fallPrompt = null;   // { dir } — waiting on the player's yes/no
let fallAnim = null;     // { phase: 'out'|'in', startTime, dir }
const FALL_FADE_MS = 900;
const FALL_DROP_MS = 1400;

// True while the fall prompt or animation owns the input.
function fallBlocksInput() { return !!(fallPrompt || fallAnim); }

// Called from Player.move() with the tile the player is trying to step into.
// Returns true if the step opened the fall prompt (and so must be blocked).
function promptFallAt(p, nx, ny) {
    if (fallBlocksInput() || currentMapId !== 'island' || !world.tiles[nx]) return false;
    const target = world.tiles[nx][ny];
    const here = world.tiles[p.x] && world.tiles[p.x][p.y];
    if (!target) return false;
    const dir = nx > p.x ? 'right' : nx < p.x ? 'left' : ny > p.y ? 'down' : 'up';
    if (target.type === 'void') { fallPrompt = { dir }; return true; }
    // Island 0 is the original island: it has a real ocean, not a void ring, so
    // its one way down is the end of the pier — "the last link to above."
    if (islandDepth() === 0 && target.type === 'sea' && here && here.type === 'dock') {
        fallPrompt = { dir };
        return true;
    }
    return false;
}

function handleFallPromptKey(kc, k) {
    if (!fallPrompt) return false;
    const yes = kc === 89 || kc === ENTER || kc === RETURN;      // Y / Enter
    const no = kc === 78 || kc === ESCAPE || kc === 8;           // N / Esc / Backspace
    if (yes) {
        const dir = fallPrompt.dir;
        fallPrompt = null;
        fallAnim = { phase: 'out', startTime: millis(), dir };
    } else if (no) {
        fallPrompt = null;
    }
    return true;
}

function updateIslandFall() {
    if (!fallAnim) return;
    const t = millis() - fallAnim.startTime;
    if (fallAnim.phase === 'out') {
        if (t >= FALL_FADE_MS) {
            fallToNextIsland(fallAnim.dir);
            fallAnim = { phase: 'in', startTime: millis(), dir: fallAnim.dir };
            player.fallOffsetY = -CONFIG.CANVAS_HEIGHT;
        }
        return;
    }
    // 'in': feather-slow drop onto the new island while the white burns off.
    const p = Math.min(1, t / FALL_DROP_MS);
    const ease = 1 - Math.pow(1 - p, 3);
    player.fallOffsetY = -CONFIG.CANVAS_HEIGHT * (1 - ease);
    if (p >= 1) {
        player.fallOffsetY = 0;
        fallAnim = null;
        const b = world.biome && ISLAND_BIOMES.find(x => x.id === world.biome);
        if (b) notify(b.name + ' — ' + b.blurb);
    }
}

// Replace the live island with the next one down. Inventory, friendships,
// quests and the almanac come along; terrain, buildings and crops do not.
function fallToNextIsland(dir) {
    const depth = islandDepth() + 1;
    const biome = islandBiomeFor(depth);
    const followers = npcs.filter(n => n.isPresent);

    const next = new World('blank', 'island');
    next.kind = 'island';
    next.depth = depth;
    next.biome = biome.id;
    next.day = world.day;
    next.season = world.season;
    next.timeMinutes = world.timeMinutes;
    generateBiomeIsland(next, biome);

    maps.island = next;
    world = next;
    currentMapId = 'island';
    insideBuilding = null;
    loadMapEntities(next);   // fresh empties for every per-map entity global

    // Arrive on the far side from the edge you stepped off.
    const arrival = islandArrivalPoint(biome, dir);
    player.x = arrival.x;
    player.y = arrival.y;

    // The player's shack and every follower's shack are rebuilt here.
    buildings = [];
    const shack = new Building('shack', clampToLand(biome, player.x + 3), clampToLand(biome, player.y - 3), 'player');
    clearBuildingFootprint(shack);
    buildings.push(shack);

    npcs = followers;
    for (const npc of npcs) {
        npc.hasHome = false;
        npc.hutX = null;
        npc.hutY = null;
        npc.gridX = clampToLand(biome, player.x + Math.floor(Math.random() * 16 - 8));
        npc.gridY = clampToLand(biome, player.y + Math.floor(Math.random() * 16 - 8));
        buildNpcShack(npc);
    }

    // The underground city is a pocket dimension, not a rung on the chain — its
    // tunnel mouth reopens on every island once the player has found it.
    if (typeof TUNNEL_REVEAL_DAY !== 'undefined' && world.day >= TUNNEL_REVEAL_DAY) {
        next.placeTunnel(clampToLand(biome, arrival.x - 6), clampToLand(biome, arrival.y + 4),
                         'underground', UNDERGROUND_TUNNEL_LANDING.x, UNDERGROUND_TUNNEL_LANDING.y, 'down');
    }

    if (typeof invalidateFertileCache === 'function') invalidateFertileCache();
    if (typeof onAnimalNewDay === 'function') onAnimalNewDay();
    if (typeof spawnHog === 'function') spawnHog();
    updateCamera();
    if (followers.length) notify('Your neighbors looked at each other. Then they jumped.');
}

function clampToLand(biome, v) {
    const m = islandVoidMargin(biome.land);
    return Math.max(m + 4, Math.min(ISLAND_GRID - m - 5, v));
}

// Fall off the north edge, arrive in the south of the island below, etc.
function islandArrivalPoint(biome, dir) {
    const m = islandVoidMargin(biome.land);
    const lo = m + 5, hi = ISLAND_GRID - m - 6, mid = Math.floor(ISLAND_GRID / 2);
    if (dir === 'up') return { x: mid, y: hi };
    if (dir === 'down') return { x: mid, y: lo };
    if (dir === 'left') return { x: hi, y: mid };
    return { x: lo, y: mid };
}

// ===== SKY =====
// Void tiles have no draw case, so they render as nothing — this backdrop is
// what shows through them. It also deepens with depth, per the design doc.
// ponytail: a flat tinted wash plus the existing drifting clouds. Distant
// islands-above and the depth-specific sky art (08's sprite list) go here when
// the art exists.
function drawIslandVoidBackdrop() {
    if (!onBiomeIsland()) return;
    const b = ISLAND_BIOMES.find(x => x.id === world.biome);
    if (!b) return;
    // Every 6 islands past the fixed set, the void gets one shade stranger.
    const deep = Math.min(1, Math.max(0, (islandDepth() - ISLAND_BIOMES.length) / 24));
    noStroke();
    fill(
        lerp(b.sky[0], 40, deep),
        lerp(b.sky[1], 20, deep),
        lerp(b.sky[2], 70, deep)
    );
    rect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    if (typeof drawSkyClouds === 'function' && deep < 0.5) drawSkyClouds(0);
}

// ===== PROMPT + FADE OVERLAY =====

function drawIslandFallUI() {
    if (fallAnim) {
        const t = millis() - fallAnim.startTime;
        const a = fallAnim.phase === 'out'
            ? Math.min(1, t / FALL_FADE_MS) * 255
            : (1 - Math.min(1, t / FALL_DROP_MS)) * 255;
        noStroke();
        fill(255, 255, 255, a);
        rect(0, 0, width, height);
        return;
    }
    if (!fallPrompt) return;
    const w = 180, h = 44;
    const x = (CONFIG.CANVAS_WIDTH - w) / 2, y = CONFIG.CANVAS_HEIGHT - h - 26;
    noStroke();
    fill(0, 0, 0, 190);
    rect(x, y, w, h);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Step off the edge?', x + w / 2, y + 14);
    textSize(8);
    fill(210);
    text('Y — fall     N — stay', x + w / 2, y + 31);
}

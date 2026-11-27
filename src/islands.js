// ===== FLOATING ISLANDS =====
// See WorldRedesign/08_FLOATING_ISLANDS.md and src/island_maps.js.
// Depth 0 is the original island — beach, dock, sea, pond, tunnel — unchanged.
// Depth 1+ are the authored biome maps. The coast is solid sky. The way down
// is the shoot tile on that map; the ladder tile is the way back up, once the
// climbs are wired. Layouts live in island_maps.js as coordinates.
//
// ponytail: there is no island *stack*. Only one island is ever live — the
// existing `maps.island` slot, regenerated in place on each fall. The maps
// are fixed, so regenerating one redraws the same place. A stack is what
// makes a return climb bring back the shells you left. Add it with the climbs.

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
        blurb: 'Flowers, a pond off to the east, and yards for the animals who stay.',
        sky: [150, 195, 230],
        decor: [['tulip', 16], ['rosebush', 6]],
    },
    {
        id: 'woods', name: 'The Woods', land: 56,
        blurb: 'The creek bends past the door. The trees hold the light.',
        sky: [128, 178, 205],
        decor: [['tree', 56], ['fir_tree', 10], ['shiny_rock', 4]],
    },
    {
        id: 'town', name: 'The Town', land: 80,
        blurb: 'Stimmy Tim\'s is open on the landing. The fountain is the square.',
        sky: [205, 185, 150],
        decor: [['tree', 12], ['rosebush', 4], ['bird_poop', 6]],
    },
    {
        id: 'city', name: 'The City', land: 60,
        blurb: 'The Black Goddess and the Electric Temple share the landing.',
        sky: [175, 160, 185],
        decor: [['rock', 14], ['tree', 6], ['shiny_rock', 4]],
    },
    {
        id: 'deep_woods', name: 'The Deep Woods', land: 60,
        blurb: 'Mubaba\'s Fortress stands beside the yard. The pit is south of the door.',
        sky: [95, 105, 135],
        decor: [['fir_tree', 46], ['tree', 14], ['rock', 8], ['shiny_rock', 2]],
    },
    {
        id: 'mountain', name: 'The Mountain', land: 56,
        blurb: 'Dirt underfoot, snow on the ridge. The Recycle Bin is east of the door.',
        sky: [120, 150, 190],
        decor: [['fir_tree', 7], ['shiny_rock', 3]],
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

// A size-by-size block of plain grass, away from the shack yard, for the
// underground tunnel mouth. Returns the top-left, or null.
function findOpenGrass(w, size) {
    const b = w.mapBounds;
    if (!b) return null;
    for (let y = b.y0; y <= b.y1 - size + 1; y++) {
        for (let x = b.x0; x <= b.x1 - size + 1; x++) {
            if (w.home && x > w.home.x - 4 && x < w.home.x + 12 && y > w.home.y - 4 && y < w.home.y + 14) continue;
            let ok = true;
            for (let dy = 0; dy < size && ok; dy++) {
                for (let dx = 0; dx < size; dx++) {
                    const t = w.tiles[x + dx][y + dy];
                    if (!t || t.type !== 'grass' || t.solid || t.link) ok = false;
                    if (ok && typeof buildingAt === 'function' && buildingAt(x + dx, y + dy)) ok = false;
                    if (ok && (w.lots || []).some(function (lot) {
                        return x + dx >= lot.x - 1 && x + dx <= lot.x + 8 &&
                               y + dy >= lot.y - 1 && y + dy <= lot.y + 10;
                    })) ok = false;
                }
            }
            if (ok) return { x: x, y: y };
        }
    }
    return null;
}

function islandDepth() { return (world && world.depth) || 0; }

// The beach is the original island. Its shop is the Gettin' Place, inland of
// the dock, on grass. Added for a new game and for a save that predates it.
function ensureBeachGettin() {
    if (typeof world === 'undefined' || !world || world.biome) return;
    if (currentMapId !== 'island') return;
    if (typeof buildings === 'undefined' || !buildings) return;
    if (buildings.some(function (b) { return b.type === 'ug_gettin'; })) return;
    const gx = 26, gy = 42, w = 8, h = 8;
    for (let dy = 0; dy < h; dy++) {
        for (let dx = 0; dx < w; dx++) {
            if (typeof buildingAt === 'function' && buildingAt(gx + dx, gy + dy)) return;
        }
    }
    const shop = new Building('ug_gettin', gx, gy, null);
    if (typeof clearBuildingFootprint === 'function') clearBuildingFootprint(shop);
    buildings.push(shop);
}
function onBiomeIsland() { return !!(world && world.biome && currentMapId === 'island'); }

// Tiles outside the land square are void. Land is centered on the grid.
function islandVoidMargin(landSize) { return Math.floor((ISLAND_GRID - landSize) / 2); }

function isVoidTile(x, y) {
    if (!world || !world.tiles[x] || !world.tiles[x][y]) return false;
    return world.tiles[x][y].type === 'void';
}

// ===== GENERATION =====

// Blit an authored map onto the engine grid, centered. Cells outside the map
// are void. Impassable coordinates are kept on the world in grid space.
function generateBiomeIsland(w, biome) {
    const grid = buildIslandGrid(biome.id);
    if (grid.errors && grid.errors.length && typeof console !== 'undefined') {
        console.warn(grid.errors.join('\n'));
    }
    const ox = Math.floor((ISLAND_GRID - grid.w) / 2);
    const oy = Math.floor((ISLAND_GRID - grid.h) / 2);
    w.tiles = [];
    for (let x = 0; x < ISLAND_GRID; x++) {
        w.tiles[x] = [];
        for (let y = 0; y < ISLAND_GRID; y++) {
            w.tiles[x][y] = { type: 'void', variant: 0, solid: true };
        }
    }
    for (let x = 0; x < grid.w; x++) {
        for (let y = 0; y < grid.h; y++) {
            const src = grid.cells[x][y];
            if (src.type === 'void') continue;
            const tile = { type: src.type, variant: 0, solid: src.solid };
            if (src.canopy) tile.isTreeTop = true;
            if (src.link) tile.link = src.link;
            if (src.type === 'tall_grass') tile.growth = 3;
            w.tiles[ox + x][oy + y] = tile;
        }
    }
    function shift(p) { return p ? { x: p.x + ox, y: p.y + oy } : null; }
    w.mapOrigin = { x: ox, y: oy };
    w.mapBounds = { x0: ox, y0: oy, x1: ox + grid.w - 1, y1: oy + grid.h - 1 };
    w.links = {};
    for (const name in grid.links) w.links[name] = shift(grid.links[name]);
    w.home = shift(grid.home);
    w.lots = grid.lots.map(shift);
    w.landmarks = grid.buildings.map(function (b) {
        return { type: b.type, x: b.x + ox, y: b.y + oy, w: b.w, h: b.h };
    });
    w.impassable = grid.impassable.map(function (c) {
        return { x: c.x + ox, y: c.y + oy, type: c.type };
    });
}

// ===== THE FALL =====

let fallPrompt = null;   // { dir } — waiting on the player's yes/no
let fallAnim = null;     // { phase: 'out'|'in', startTime, dir }
const FALL_FADE_MS = 900;
const FALL_DROP_MS = 1400;

// True while the fall prompt or animation owns the input.
function fallBlocksInput() { return !!(fallPrompt || fallAnim); }

// Called from Player.move() with the tile the player is trying to step into.
// nx/ny may lie outside the grid: the pier ends on the left edge of the map.
// Returns true if the step opened the fall prompt (and so must be blocked).
function promptFallAt(p, nx, ny) {
    if (fallBlocksInput() || currentMapId !== 'island' || !world) return false;
    const here = world.tiles[p.x] && world.tiles[p.x][p.y];
    const dir = nx > p.x ? 'right' : nx < p.x ? 'left' : ny > p.y ? 'down' : 'up';
    const offMap = nx < 0 || ny < 0 || nx >= CONFIG.WORLD_WIDTH || ny >= CONFIG.WORLD_HEIGHT;
    // The pier is drawn from x = 0, so its seaward end has no sea tile past it.
    // Trying to walk off that end is the way down from the original island.
    if (offMap) {
        if (islandDepth() === 0 && here && here.type === 'dock') {
            fallPrompt = { dir };
            return true;
        }
        return false;
    }
    if (!world.tiles[nx]) return false;
    const target = world.tiles[nx][ny];
    if (!target) return false;
    // Biome coasts are sky. Stepping into the void only asks to fall when you
    // are standing on that island's shoot. Every other edge just stops you.
    if (target.type === 'void') {
        if (onBiomeIsland() && here && here.link === 'shoot') fallPrompt = { dir };
        else if (!onBiomeIsland()) fallPrompt = { dir };
        return true;
    }
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

// Animal neighbors are the meadow's residents. Species strings look like
// "Animal (Rabbit)". getNpcSpeciesGroup lives with the roster.
function neighborIsAnimal(npc) {
    const species = npc && npc.species;
    if (typeof getNpcSpeciesGroup === 'function') return getNpcSpeciesGroup(species) === 'Animal';
    return !!(species && String(species).indexOf('Animal') === 0);
}

function neighborIsGhost(npc) {
    const species = npc && npc.species;
    if (typeof getNpcSpeciesGroup === 'function') return getNpcSpeciesGroup(species) === 'Ghost';
    return species === 'Ghost';
}

// Meadow yards are for animals. Mountain yards are for ghosts.
function residentGroup(biomeId) {
    if (biomeId === 'meadow') return 'Animal';
    if (biomeId === 'mountain') return 'Ghost';
    return null;
}

function neighborGroup(npc) {
    if (neighborIsAnimal(npc)) return 'Animal';
    if (neighborIsGhost(npc)) return 'Ghost';
    return '';
}

// Stamp a shack on a reserved yard. The lot origin is the shack's corner,
// and the neighbor stands on the grass at the door.
function placeNeighborShack(npc, lot) {
    const shack = new Building('shack', lot.x, lot.y, npc.id);
    if (typeof clearBuildingFootprint === 'function') clearBuildingFootprint(shack);
    buildings.push(shack);
    npc.hasHome = true;
    npc.hutX = lot.x;
    npc.hutY = lot.y;
    npc.gridX = lot.x + 4;
    npc.gridY = lot.y + 8;
    notify(npc.name + ' built a shack!');
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

    // Land on the ladder yard, just south of where the shack's door will be.
    const arrival = next.links.spawn || islandArrivalPoint(biome, dir);
    player.x = arrival.x;
    player.y = arrival.y;

    // The player's shack, the map's landmark buildings, and follower shacks.
    buildings = [];
    if (next.home) {
        const shack = new Building('shack', next.home.x, next.home.y, 'player');
        clearBuildingFootprint(shack);
        buildings.push(shack);
    }
    for (const mark of next.landmarks || []) {
        buildings.push(new Building(mark.type, mark.x, mark.y, null));
    }

    npcs = followers;
    // Meadow yards are for animals, mountain yards for ghosts. The test is
    // the same: they already had a shack. Anyone else waits at the landing.
    // The other islands still rebuild a shack for every follower.
    const residents = residentGroup(biome.id);
    let yard = 0;
    for (let i = 0; i < npcs.length; i++) {
        const npc = npcs[i];
        const settledHere = residents && npc.hasHome && neighborGroup(npc) === residents;
        npc.hasHome = false;
        npc.hutX = null;
        npc.hutY = null;
        if (settledHere) {
            const lot = next.lots[yard++];
            if (lot) {
                placeNeighborShack(npc, lot);
                continue;
            }
        }
        if (residents) {
            npc.gridX = arrival.x;
            npc.gridY = arrival.y;
            continue;
        }
        const lot = next.lots[i];
        npc.gridX = lot ? lot.x : arrival.x;
        npc.gridY = lot ? lot.y : arrival.y;
        buildNpcShack(npc);
    }

    // The underground city is a pocket dimension, not a rung on the chain — its
    // tunnel mouth reopens on every island once the player has found it.
    // Park it on open grass so it doesn't erase a pond or a shack pad.
    if (typeof TUNNEL_REVEAL_DAY !== 'undefined' && world.day >= TUNNEL_REVEAL_DAY) {
        const mouth = findOpenGrass(next, 3);
        if (mouth) {
            next.placeTunnel(mouth.x, mouth.y, 'underground',
                             UNDERGROUND_TUNNEL_LANDING.x, UNDERGROUND_TUNNEL_LANDING.y, 'down');
        }
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
    if (typeof currentMapId !== 'undefined' && currentMapId !== 'island') return;
    if (!world) return;
    // Home beach. The oval sits in the same sky the islands below use.
    if (!onBiomeIsland()) {
        const hour = world.timeMinutes / 60;
        const day = hour >= 6 && hour < 19;
        noStroke();
        if (day) fill(150, 198, 230);
        else fill(20, 28, 58);
        rect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        if (day && typeof drawSkyClouds === 'function') drawSkyClouds(0);
        else if (!day && typeof drawSkyStars === 'function') drawSkyStars(0);
        return;
    }
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

// The woods sit under a canopy. A thin green wash over the island, so the
// screen reads a little darker than the meadow without turning into night.
function drawWoodsShade() {
    if (typeof currentMapId !== 'undefined' && currentMapId !== 'island') return;
    if (!world || world.biome !== 'woods') return;
    noStroke();
    fill(10, 26, 14, 48);
    rect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
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

// ===== ENTITIES (NPCs) =====
// Neighbors that arrive, build shacks, befriend, and depart

// The 32-neighbor rewrite roster (NeighborRewrite/CharacterDraft.txt):
// 8 robots, 8 ghosts, 8 animals, 8 monsters.
const NPC_DEFS = [
    { name: 'Piko', personality: 'kawaii', species: 'Robot', color: '#F48FB1' },
    { name: 'Rivet', personality: 'tsundere', species: 'Robot', color: '#B71C1C' },
    { name: 'Shade-7', personality: 'goth', species: 'Robot', color: '#263238' },
    { name: 'Cypher', personality: 'nerd', species: 'Robot', color: '#00838F' },
    { name: 'Om-Bit', personality: 'monk', species: 'Robot', color: '#C0A062' },
    { name: 'Sir Cogs-a-Lot', personality: 'medieval', species: 'Robot', color: '#D4AF37' },
    { name: 'Tinker', personality: 'shy', species: 'Robot', color: '#8D6E63' },
    { name: 'Zap-Zap', personality: 'cheerful', species: 'Robot', color: '#FDD835' },
    { name: 'Boo-Boo', personality: 'kawaii', species: 'Ghost', color: '#F8BBD0' },
    { name: 'Wisp', personality: 'tsundere', species: 'Ghost', color: '#BA68C8' },
    { name: 'Morwen', personality: 'goth', species: 'Ghost', color: '#78909C' },
    { name: 'Spectra', personality: 'nerd', species: 'Ghost', color: '#4DB6AC' },
    { name: 'Hush', personality: 'monk', species: 'Ghost', color: '#B0BEC5' },
    { name: 'Sir Haunts-a-Lot', personality: 'medieval', species: 'Ghost', color: '#9E9E9E' },
    { name: 'Flutter', personality: 'shy', species: 'Ghost', color: '#E1BEE7' },
    { name: 'Giggles', personality: 'cheerful', species: 'Ghost', color: '#FFF176' },
    { name: 'Mochi', personality: 'kawaii', species: 'Animal (Rabbit)', color: '#FFE0E0' },
    { name: 'Shadow', personality: 'tsundere', species: 'Animal (Cat)', color: '#212121' },
    { name: 'Raven', personality: 'goth', species: 'Animal (Crow)', color: '#37474F' },
    { name: 'Newton', personality: 'nerd', species: 'Animal (Owl)', color: '#ECEFF1' },
    { name: 'Lotus', personality: 'monk', species: 'Animal (Crane)', color: '#E0F7FA' },
    { name: 'Squire Paws', personality: 'medieval', species: 'Animal (Dog)', color: '#8D6E63' },
    { name: 'Pebble', personality: 'shy', species: 'Animal (Turtle)', color: '#A5D6A7' },
    { name: 'Sunny', personality: 'cheerful', species: 'Animal (Parrot)', color: '#FFEB3B' },
    { name: 'Fluffernox', personality: 'kawaii', species: 'Monster', color: '#FFCCBC' },
    { name: 'Grumble', personality: 'tsundere', species: 'Monster', color: '#78909C' },
    { name: 'Vesper', personality: 'goth', species: 'Monster', color: '#263238' },
    { name: 'Gizmo', personality: 'nerd', species: 'Monster', color: '#90A4AE' },
    { name: 'Ommmm', personality: 'monk', species: 'Monster', color: '#4CAF50' },
    { name: 'Lord Roar', personality: 'medieval', species: 'Monster (Dragon-like)', color: '#7B1FA2' },
    { name: 'Snug', personality: 'shy', species: 'Monster', color: '#B3E5FC' },
    { name: 'Gigglegrow', personality: 'cheerful', species: 'Monster', color: '#FFD54F' },
];

// ===== PERSONALITY-BASED ITEM PREFERENCES =====
// Loved gifts come from the neighbor's personality. Liked gifts come from their
// species group. Everything else is neutral, except obvious junk (tools, blocks,
// raw materials) which is disliked. Value caps at +30 for loved, +20 for liked,
// +5 for neutral, -5 for disliked.
const PERSONALITY_LOVED_ITEMS = {
    kawaii:   ['flea_lily_bloom', 'rose', 'tulip', 'berry_jam', 'donut'],
    tsundere: ['coffee', 'grilled_banana', 'iron_ingot', 'gold_coin', 'crystal'],
    goth:     ['crystal', 'cicada_shell', 'moonflower', 'old_radio', 'pocket_watch'],
    nerd:     ['pocket_watch', 'glass_bottle', 'atlas_1', 'atlas_2', 'atlas_3', 'atlas_4', 'metal_rod'],
    monk:     ['seashell', 'turtle_egg', 'mushroom', 'grain_seed', 'truffle'],
    medieval: ['gold_coin', 'iron_ingot', 'thatch', 'pocket_watch', 'flealess_statue'],
    shy:      ['mushroom', 'feather', 'berry', 'bean', 'seashell'],
    cheerful: ['banana', 'fruit_salad', 'donut', 'protein_shake', 'berry_jam']
};
const SPECIES_LIKED_CATEGORIES = {
    Robot:    ['material', 'treasure'],
    Ghost:    ['gift', 'treasure'],
    Animal:   ['gift', 'food'],
    Monster:  ['treasure', 'gift']
};
function getNpcSpeciesGroup(species) {
    if (!species) return 'Monster';
    if (species.startsWith('Animal')) return 'Animal';
    return species;
}
function getGiftValue(npc, itemId) {
    const item = ITEMS[itemId];
    if (!item || !npc) return { value: 0, reaction: 'neutral' };
    // Disliked: tools, blocks, raw unprocessed materials.
    if (item.category === 'tool' || item.category === 'block' || item.category === 'material') {
        return { value: -5, reaction: 'disliked' };
    }
    const loved = PERSONALITY_LOVED_ITEMS[npc.personality] || [];
    if (loved.includes(itemId)) return { value: 30, reaction: 'loved' };
    const group = getNpcSpeciesGroup(npc.species);
    const likedCats = SPECIES_LIKED_CATEGORIES[group] || [];
    if (likedCats.includes(item.category)) return { value: 20, reaction: 'liked' };
    return { value: 5, reaction: 'neutral' };
}

// Mubaba: the underground city's magic merchant (July3rdReview C4). Not part
// of the island neighbor roster — he lives on the underground map, keyed by
// the string id 'mubaba', and never wanders, arrives, or departs. He'll trade
// goods / check accomplishments to teach magic tricks (content TBD).
// First sprite at the new 2x5 character scale (32x80 px).
const MUBABA_DEF = {
    name: 'Mubaba', personality: 'custom', species: 'Magic Merchant',
    color: '#8a5ac2', wTiles: 2, hTiles: 5, stationary: true, hasHome: true
};

// ===== DAILY SCHEDULES =====
// Neighbors follow the day: night (9pm-5am) is spent at home (standing at the
// shack door); daytime buckets send them to a personality hangout spot, or
// wandering if their schedule (or a full spot) leaves them free.
//
// Each hangout has fixed slot tiles; a slot is "occupied" when a present
// neighbor holds a claim on it, so two neighbors never compete for one tile.
// Beach spots sit mid-ring (edge distance 8), clear of palms (edge < 8) and
// the grass seam. Interior spots may collide with trees/player buildings on a
// given save — claiming skips blocked slots, and a fully-blocked spot just
// means that neighbor wanders instead.
const HANGOUT_SPOTS = {
    // Nerds narrate cloud shapes (Cypher, Spectra, Newton) — north shore lookout.
    cloud_watch:   { slots: [[40, 8], [44, 8], [48, 8], [52, 8]], facing: 'up' },
    // Cheerful folks love sunny mornings on the beach (Zap-Zap, Sunny) — south shore.
    sunny_beach:   { slots: [[42, 91], [46, 91], [50, 91], [54, 91]], facing: 'down' },
    // Goths recite poems near the water and hum to the moon after sunset
    // (Shade-7, Raven, Morwen, Vesper) — east shore.
    dusk_shore:    { slots: [[91, 42], [91, 46], [91, 50], [91, 54]], facing: 'right' },
    // Medieval types stand proud watch where boats arrive (Sir Cogs-a-Lot,
    // Sir Haunts-a-Lot, Lord Roar) — west grass line by the dock.
    dock_watch:    { slots: [[12, 46], [12, 49], [12, 52], [12, 55]], facing: 'left' },
    // Monks sit very still together (Om-Bit, Hush, Lotus, Ommmm) — quiet NE grass.
    meditation:    { slots: [[70, 26], [72, 26], [70, 28], [72, 28]], facing: 'up' },
    // Kawaii neighbors watch butterflies near flowers (Piko, Mochi) — west meadow.
    flower_meadow: { slots: [[28, 32], [30, 32], [28, 34], [30, 34]], facing: 'down' },
    // Tsunderes claim sunny spots and "count leaves" (Shadow, Rivet) — east knoll.
    sunny_knoll:   { slots: [[66, 62], [68, 62], [66, 64], [68, 64]], facing: 'down' },
    // Shy ones linger near bushes watching birds (Tinker, Pebble, Snug) — SW grove.
    quiet_grove:   { slots: [[26, 66], [28, 66], [26, 68], [28, 68]], facing: 'down' }
};

// Per-personality daytime plan: morning/afternoon/evening each name a hangout
// or null (free wander). Night is always "go home" for anyone with a shack.
const PERSONALITY_SCHEDULE = {
    nerd:     { morning: null,            afternoon: 'cloud_watch',   evening: null },
    cheerful: { morning: 'sunny_beach',   afternoon: null,            evening: null },
    goth:     { morning: null,            afternoon: 'dusk_shore',    evening: 'dusk_shore' },
    monk:     { morning: 'meditation',    afternoon: null,            evening: 'meditation' },
    kawaii:   { morning: null,            afternoon: 'flower_meadow', evening: null },
    tsundere: { morning: null,            afternoon: 'sunny_knoll',   evening: null },
    shy:      { morning: 'quiet_grove',   afternoon: null,            evening: 'quiet_grove' },
    medieval: { morning: 'dock_watch',    afternoon: 'dock_watch',    evening: null }
};

// A slot is occupied if another present neighbor holds a claim on it.
function hangoutSlotTaken(spotId, sx, sy, self) {
    return npcs.some(n => n !== self && n.isPresent && n._sched &&
        n._sched.spot === spotId && n._sched.slot &&
        n._sched.slot[0] === sx && n._sched.slot[1] === sy);
}

// First free, walkable slot of a spot, or null if all taken/blocked.
function claimHangoutSlot(spotId, npc) {
    const spot = HANGOUT_SPOTS[spotId];
    if (!spot) return null;
    for (const [sx, sy] of spot.slots) {
        if (isSolidTile(sx, sy) || buildingAt(sx, sy)) continue;
        if (hangoutSlotTaken(spotId, sx, sy, npc)) continue;
        return [sx, sy];
    }
    return null;
}

let npcs = [];

class NPC {
    constructor(def, index) {
        this.id = index;
        this.name = def.name;
        this.personality = def.personality;
        this.species = def.species || '';
        this.color = def.color;
        this.gridX = 50;
        this.gridY = 50;
        // Footprint in tiles, bottom-anchored at (gridX, gridY). Default is the
        // classic 1x2; big characters (e.g. Mubaba at 2x5) override via def.
        this.wTiles = def.wTiles || 1;
        this.hTiles = def.hTiles || 2;
        this.stationary = !!def.stationary;
        this.facing = 'down';
        this.friendship = 0;
        this.isPresent = true;
        this.hasHome = !!def.hasHome;
        this.hutX = 0;
        this.hutY = 0;
        this.dailyTalked = false;
        this.departureCounter = 0;
        this.animFrame = 0;
        this.daysOnIsland = 0;
        this.lastMoveAt = 0;
    }

    // Re-plan when the time-of-day bucket changes: claim a hangout slot,
    // head home for the night, or go free-wander.
    updateSchedule() {
        if (typeof getTimeOfDay !== 'function') return;
        const bucket = getTimeOfDay();
        if (this._sched && this._sched.bucket === bucket) return;
        this._sched = { bucket, spot: null, slot: null, facing: null };
        this._target = null;
        this._atPost = false;
        if (bucket === 'night') {
            if (this.hasHome) {
                // Stand just outside the shack door (footprint is 8x8, door
                // bottom-center) — starts and ends every day at home.
                const dims = (typeof BUILDING_TIERS !== 'undefined' && BUILDING_TIERS.shack) || { w: 8, h: 8 };
                this._target = [this.hutX + Math.floor(dims.w / 2), this.hutY + dims.h];
                this._sched.facing = 'down';
            }
            return;
        }
        const plan = PERSONALITY_SCHEDULE[this.personality];
        const spotId = plan ? plan[bucket] : null;
        if (!spotId) return; // free wander this bucket
        const slot = claimHangoutSlot(spotId, this);
        if (slot) {
            this._sched.spot = spotId;
            this._sched.slot = slot;
            this._sched.facing = HANGOUT_SPOTS[spotId].facing;
            this._target = slot;
        }
    }

    // One greedy step toward _target, throttled to a stroll pace.
    // ponytail: greedy walk + random sidestep when blocked, no pathfinding —
    // good enough on open island terrain; A* if they ever get stuck in pens.
    stepTowardTarget() {
        if (millis() - (this.lastMoveAt || 0) < 350) return;
        const [tx, ty] = this._target;
        const dx = Math.sign(tx - this.gridX), dy = Math.sign(ty - this.gridY);
        if (dx === 0 && dy === 0) {
            this._target = null;
            this._atPost = true;
            if (this._sched && this._sched.facing) this.facing = this._sched.facing;
            return;
        }
        // Prefer the longer axis, fall back to the other, then jiggle randomly.
        const primary = Math.abs(tx - this.gridX) >= Math.abs(ty - this.gridY) ? [dx, 0] : [0, dy];
        const secondary = primary[0] === 0 ? [dx, 0] : [0, dy];
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        const jiggle = dirs[Math.floor(Math.random() * 4)];
        for (const [mx, my] of [primary, secondary, jiggle]) {
            if (mx === 0 && my === 0) continue;
            const nx = this.gridX + mx, ny = this.gridY + my;
            if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) continue;
            if (isSolidTile(nx, ny) || buildingAt(nx, ny)) continue;
            this.gridX = nx;
            this.gridY = ny;
            this.facing = mx > 0 ? 'right' : mx < 0 ? 'left' : my > 0 ? 'down' : 'up';
            this.lastMoveAt = millis();
            return;
        }
    }

    update(dt, gameTime) {
        if (this.stationary) return; // shopkeepers stay put
        // Daily schedule only applies to roster neighbors on the island map.
        if (typeof this.id === 'number' && (typeof currentMapId === 'undefined' || currentMapId === 'island')) {
            this.updateSchedule();
        }
        if (this._target) { this.stepTowardTarget(); return; }
        if (this._atPost) return; // holding a hangout slot / home post until the next bucket
        // Simple wander behavior — move randomly within home radius
        if (Math.random() < 0.005) {
            const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
            const d = dirs[Math.floor(Math.random()*4)];
            const nx = this.gridX + d[0];
            const ny = this.gridY + d[1];
            if (nx >= 0 && nx < CONFIG.WORLD_WIDTH && ny >= 0 && ny < CONFIG.WORLD_HEIGHT) {
                if (!isSolidTile(nx, ny) && !buildingAt(nx, ny)) {
                    this.gridX = nx;
                    this.gridY = ny;
                    this.facing = d[0] > 0 ? 'right' : d[0] < 0 ? 'left' : d[1] > 0 ? 'down' : 'up';
                    this.lastMoveAt = millis();
                }
            }
        }
    }

    draw() {
        if (!this.isPresent) return;
        // NPCs draw bottom-anchored at (gridX, gridY); footprint from wTiles/hTiles.
        const TS = CONFIG.TILE_SIZE;
        const w = this.wTiles * TS;
        const h = this.hTiles * TS;
        const sx = this.gridX * TS - cameraX;
        const sy = this.gridY * TS - cameraY;
        const topY = sy + TS - h; // screen y of the sprite's top edge
        // Use per-NPC sprite if available, otherwise fall back to colored rectangle.
        const spriteKey = 'sprites.' + npcSlug(this.name);
        const spr = SPRITES[spriteKey] || null;
        const moving = (millis() - (this.lastMoveAt || 0)) < 300;
        if (spr && (this.wTiles > 1 || this.hTiles > 2)) {
            // Big new-scale character: a single still frame drawn at natural
            // tile size with bob + flip (un-flipped art faces left).
            const bob = moving ? BOB_PATTERN[Math.floor(millis() / WALK_FRAME_MS) % BOB_PATTERN.length] : 0;
            drawSpriteMaybeFlipped(spr, sx, topY + bob, w, h, this.facing === 'right');
        } else if (!drawCharacterSprite(spr, sx, sy - TS, this.facing, moving, this.species === 'Ghost')) {
            fill(this.color);
            noStroke();
            rect(sx, topY, w, h);
        }
        // Name tag above head
        const halfW = CONFIG.CANVAS_WIDTH / 2;
        const halfH = CONFIG.CANVAS_HEIGHT / 2;
        if (Math.abs(sx - halfW) < halfW && Math.abs(sy - halfH) < halfH) {
            fill(0, 0, 0, 150);
            textAlign(CENTER, BOTTOM);
            textSize(7);
            textFont('Courier New');
            const nw = textWidth(this.name) + 4;
            rect(sx + w / 2 - nw / 2, topY - 12, nw, 9);
            fill(255);
            text(this.name, sx + w / 2, topY - 3);
        }
    }

    gainTalk() {
        if (!this.dailyTalked) {
            this.friendship = Math.min(300, this.friendship + 3);
            this.dailyTalked = true;
        }
    }

    gainGift(value) {
        this.friendship = Math.min(300, this.friendship + value);
    }

    lossRude() { this.friendship = Math.max(0, this.friendship - 3); }
    lossIgnored() { this.friendship = Math.max(0, this.friendship - 6); }
    lossToolUsed() { this.friendship = Math.max(0, this.friendship - 9); }

    serialize() {
        return {
            id: this.id, name: this.name, personality: this.personality, color: this.color,
            gridX: this.gridX, gridY: this.gridY, facing: this.facing,
            friendship: this.friendship, isPresent: this.isPresent, hasHome: this.hasHome,
            hutX: this.hutX, hutY: this.hutY, dailyTalked: this.dailyTalked,
            departureCounter: this.departureCounter, daysOnIsland: this.daysOnIsland
        };
    }

    static deserialize(data) {
        const def = (data.id === 'mubaba') ? MUBABA_DEF
            : NPC_DEFS[data.id] || { name: data.name, personality: data.personality, color: data.color };
        const npc = new NPC(def, data.id);
        npc.gridX = data.gridX; npc.gridY = data.gridY;
        npc.facing = data.facing || 'down';
        npc.friendship = data.friendship || 0;
        npc.isPresent = data.isPresent !== undefined ? data.isPresent : true;
        npc.hasHome = data.hasHome || false;
        npc.hutX = data.hutX || 0; npc.hutY = data.hutY || 0;
        npc.dailyTalked = data.dailyTalked || false;
        npc.departureCounter = data.departureCounter || 0;
        npc.daysOnIsland = data.daysOnIsland || 0;
        return npc;
    }
}

// Neighbor population rules: a new neighbor arrives every ARRIVAL_INTERVAL_DAYS
// until MAX_NEIGHBORS live on the island; a neighbor still homeless after
// HOMELESS_DEPARTURE_DAYS departs (and becomes eligible to return later).
const MAX_NEIGHBORS = 9;
const ARRIVAL_INTERVAL_DAYS = 3;
const HOMELESS_DEPARTURE_DAYS = 14;

// Bring one new neighbor to the beach: a random pull from the defs not
// currently present on the island. Called on new day (every 3rd) and at game start.
function checkArrivals() {
    if (npcs.filter(n => n.isPresent).length >= MAX_NEIGHBORS) return;
    const candidates = NPC_DEFS.map((d, i) => i)
        .filter(i => !npcs.some(n => n.id === i && n.isPresent));
    if (candidates.length === 0) return;
    const id = candidates[Math.floor(Math.random() * candidates.length)];

    // A returning neighbor reuses their record, keeping friendship history.
    let npc = npcs.find(n => n.id === id);
    if (npc) {
        npc.isPresent = true;
        npc.daysOnIsland = 0;
        npc.departureCounter = 0;
        npc.dailyTalked = false;
    } else {
        npc = new NPC(NPC_DEFS[id], id);
        npcs.push(npc);
    }
    // Arrive by boat at the end of the west-beach dock.
    const arrival = (typeof ISLAND_DOCK_ARRIVAL !== 'undefined') ? ISLAND_DOCK_ARRIVAL : { x: 9, y: 50 };
    npc.gridX = arrival.x;
    npc.gridY = arrival.y;
    announce('New neighbor: ' + npc.name + '!');
}

// Build shack for NPC on first night
function buildNpcShack(npc) {
    if (npc.hasHome) return;
    // Shack footprint in tiles (matches the exterior sprite).
    const dims = (typeof BUILDING_TIERS !== 'undefined' && BUILDING_TIERS.shack) ? BUILDING_TIERS.shack : { w: 8, h: 5 };
    // Find a clear spot near their current position big enough for the shack.
    for (let attempts = 0; attempts < 80; attempts++) {
        const sx = npc.gridX + Math.floor(Math.random() * 12 - 6);
        const sy = npc.gridY + Math.floor(Math.random() * 12 - 6);
        // Check the full footprint is clear (no solids, no other buildings).
        let clear = true;
        for (let dx = 0; dx < dims.w && clear; dx++) {
            for (let dy = 0; dy < dims.h; dy++) {
                const tx = sx + dx, ty = sy + dy;
                if (tx < 1 || tx > CONFIG.WORLD_WIDTH - 2 || ty < 1 || ty > CONFIG.WORLD_HEIGHT - 2) { clear = false; break; }
                if (TILE_SOLID.has(world.tiles[tx][ty].type)) { clear = false; break; }
                if (buildingAt(tx, ty)) { clear = false; break; }
            }
        }
        if (clear) {
            const b = new Building('shack', sx, sy, npc.id);
            buildings.push(b);
            npc.hasHome = true;
            npc.hutX = sx;
            npc.hutY = sy;
            // Clear the footprint and exit path so the shack sits on grass.
            if (typeof clearBuildingFootprint === 'function') clearBuildingFootprint(b);
            notify(npc.name + ' built a shack!');
            return;
        }
    }
}

// Called on new day for all NPCs
function onNpcNewDay() {
    // The npcs global holds the *active* map's list (see MAP_ENTITY_FIELDS);
    // neighbors live on the island, so skip the tick while underground.
    if (typeof currentMapId !== 'undefined' && currentMapId !== 'island') return;
    for (const npc of npcs) {
        if (!npc.isPresent) continue;
        npc.daysOnIsland++;
        npc.dailyTalked = false;
        // Departure check — homeless neighbors leave after 14 days without shelter
        if (!npc.hasHome && npc.daysOnIsland >= HOMELESS_DEPARTURE_DAYS) {
            npc.isPresent = false;
            notify(npc.name + ' gave up waiting for a home and left the island...');
        }
    }
    // A new neighbor ferries in every 3rd day until the island holds 9.
    if (world.day % ARRIVAL_INTERVAL_DAYS === 0) checkArrivals();
}

function drawEntities() {
    for (const npc of npcs) {
        if (typeof withBackflip === 'function') withBackflip(npc, () => npc.draw(), true);
        else npc.draw();
    }
}

function updateEntities(dt) {
    for (const npc of npcs) {
        if (npc.isPresent) npc.update(dt, world.timeMinutes);
    }
}

// Friends tab rendering
function drawFriendsTab(x, y, w, h) {
    fill(255);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Friendships', x, y);

    if (npcs.length === 0) {
        fill(255);
        textSize(8);
        text('Neighbors will arrive over time.', x, y + 16);
        text('At least 1 new neighbor per season.', x, y + 28);
        text('(Current: ' + npcs.length + '/9 neighbors)', x, y + 40);
        return;
    }

    let rowY = y + 18;
    for (const npc of npcs) {
        if (!npc.isPresent) continue;
        // Portrait placeholder
        fill(npc.color);
        noStroke();
        rect(x, rowY, 16, 16);

        // Name
        fill(255);
        textAlign(LEFT, TOP);
        textSize(9);
        text(npc.name, x + 22, rowY);

        // Friendship hearts (0-10 display, 300 max)
        fill(255);
        textSize(7);
        let hearts = '';
        const filledHearts = Math.floor(npc.friendship / 30);
        for (let i = 0; i < 10; i++) {
            hearts += i < filledHearts ? '\u2665' : '\u2661';
        }
        fill(npc.friendship >= 300 ? '#FFD700' : npc.friendship >= 90 ? '#E91E63' : '#888');
        text(hearts, x + 22, rowY + 10);

        fill(255);
        textSize(6);
        let shelterLabel = npc.hasHome ? '  Has shack' : '  Homeless';
        if (!npc.hasHome && npc.daysOnIsland >= 3) {
            const daysLeft = 14 - npc.daysOnIsland;
            shelterLabel = daysLeft > 0
                ? '  Needs shelter! (' + daysLeft + 'd left)'
                : '  Leaving soon!';
            fill('#FF8A80');
        }
        text('Day ' + npc.daysOnIsland + shelterLabel, x + 22, rowY + 20);

        rowY += 28;
    }
    // Report full content height so the menu can scroll the list.
    if (typeof menuContentH !== 'undefined') menuContentH = rowY - y;
}
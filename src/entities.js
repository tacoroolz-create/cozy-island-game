// ===== ENTITIES (NPCs) =====
// Neighbors that arrive, build shacks, befriend, and depart

// The 32-neighbor rewrite roster (NeighborRewrite/CharacterDraft.txt):
// 8 robots, 8 ghosts, 8 animals, 8 monsters.
const NPC_DEFS = [
    { name: 'Piko', personality: 'custom', species: 'Robot', color: '#F48FB1' },
    { name: 'Rivet', personality: 'custom', species: 'Robot', color: '#B71C1C' },
    { name: 'Shade-7', personality: 'custom', species: 'Robot', color: '#263238' },
    { name: 'Cypher', personality: 'custom', species: 'Robot', color: '#00838F' },
    { name: 'Om-Bit', personality: 'custom', species: 'Robot', color: '#C0A062' },
    { name: 'Sir Cogs-a-Lot', personality: 'custom', species: 'Robot', color: '#D4AF37' },
    { name: 'Tinker', personality: 'custom', species: 'Robot', color: '#8D6E63' },
    { name: 'Zap-Zap', personality: 'custom', species: 'Robot', color: '#FDD835' },
    { name: 'Boo-Boo', personality: 'custom', species: 'Ghost', color: '#F8BBD0' },
    { name: 'Wisp', personality: 'custom', species: 'Ghost', color: '#BA68C8' },
    { name: 'Morwen', personality: 'custom', species: 'Ghost', color: '#78909C' },
    { name: 'Spectra', personality: 'custom', species: 'Ghost', color: '#4DB6AC' },
    { name: 'Hush', personality: 'custom', species: 'Ghost', color: '#B0BEC5' },
    { name: 'Sir Haunts-a-Lot', personality: 'custom', species: 'Ghost', color: '#9E9E9E' },
    { name: 'Flutter', personality: 'custom', species: 'Ghost', color: '#E1BEE7' },
    { name: 'Giggles', personality: 'custom', species: 'Ghost', color: '#FFF176' },
    { name: 'Mochi', personality: 'custom', species: 'Animal (Rabbit)', color: '#FFE0E0' },
    { name: 'Shadow', personality: 'custom', species: 'Animal (Cat)', color: '#212121' },
    { name: 'Raven', personality: 'custom', species: 'Animal (Crow)', color: '#37474F' },
    { name: 'Newton', personality: 'custom', species: 'Animal (Owl)', color: '#ECEFF1' },
    { name: 'Lotus', personality: 'custom', species: 'Animal (Crane)', color: '#E0F7FA' },
    { name: 'Squire Paws', personality: 'custom', species: 'Animal (Dog)', color: '#8D6E63' },
    { name: 'Pebble', personality: 'custom', species: 'Animal (Turtle)', color: '#A5D6A7' },
    { name: 'Sunny', personality: 'custom', species: 'Animal (Parrot)', color: '#FFEB3B' },
    { name: 'Fluffernox', personality: 'custom', species: 'Monster', color: '#FFCCBC' },
    { name: 'Grumble', personality: 'custom', species: 'Monster', color: '#78909C' },
    { name: 'Vesper', personality: 'custom', species: 'Monster', color: '#263238' },
    { name: 'Gizmo', personality: 'custom', species: 'Monster', color: '#90A4AE' },
    { name: 'Ommmm', personality: 'custom', species: 'Monster', color: '#4CAF50' },
    { name: 'Lord Roar', personality: 'custom', species: 'Monster (Dragon-like)', color: '#7B1FA2' },
    { name: 'Snug', personality: 'custom', species: 'Monster', color: '#B3E5FC' },
    { name: 'Gigglegrow', personality: 'custom', species: 'Monster', color: '#FFD54F' },
];

// Mubaba: the underground city's magic merchant (July3rdReview C4). Not part
// of the island neighbor roster — he lives on the underground map, keyed by
// the string id 'mubaba', and never wanders, arrives, or departs. He'll trade
// goods / check accomplishments to teach magic tricks (content TBD).
// First sprite at the new 2x5 character scale (32x80 px).
const MUBABA_DEF = {
    name: 'Mubaba', personality: 'custom', species: 'Magic Merchant',
    color: '#8a5ac2', wTiles: 2, hTiles: 5, stationary: true, hasHome: true
};

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

    update(dt, gameTime) {
        if (this.stationary) return; // shopkeepers stay put
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
    notify(npc.name + ' arrived on the island!');
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
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Friendships', x, y);

    if (npcs.length === 0) {
        fill(120);
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
        fill(120);
        textSize(7);
        let hearts = '';
        const filledHearts = Math.floor(npc.friendship / 30);
        for (let i = 0; i < 10; i++) {
            hearts += i < filledHearts ? '\u2665' : '\u2661';
        }
        fill(npc.friendship >= 300 ? '#FFD700' : npc.friendship >= 90 ? '#E91E63' : '#888');
        text(hearts, x + 22, rowY + 10);

        fill(100);
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
        if (rowY > y + h - 20) break;
    }
}
// ===== ENTITIES (NPCs) =====
// Neighbors that arrive, build shacks, befriend, and depart

const NPC_DEFS = [
    { name: 'Chester', personality: 'custom', species: 'Robot', color: '#e7d238' },
    { name: 'Luna', personality: 'custom', species: 'Talking Cat', color: '#a71f94' },
    { name: 'Brass', personality: 'custom', species: 'Robot', color: '#4a0679' },
    { name: 'Vega', personality: 'custom', species: 'Alien', color: '#96b300' },
    { name: 'Daphne', personality: 'custom', species: 'Talking Flower', color: '#33796f' },
    { name: 'Krip', personality: 'custom', species: 'Alien', color: '#793abb' },
    { name: 'Penny', personality: 'custom', species: 'Anthropomorphic Houseplant', color: '#e922e9' },
    { name: 'Mimis', personality: 'custom', species: 'Supernatural Fairy', color: '#5e5be8' },
    { name: 'Hudson', personality: 'custom', species: 'Talking Japanese Tea Cup', color: '#0dec50' },
    { name: 'Cort', personality: 'custom', species: 'Robot', color: '#d6b270' },
    { name: 'Aiko', personality: 'custom', species: 'Talking Dog', color: '#2d1170' },
    { name: 'Ihor', personality: 'custom', species: 'Supernatural Vampire', color: '#30f1ec' },
    { name: 'Psy', personality: 'custom', species: 'Talking Plant', color: '#014ca7' },
    { name: 'Boll', personality: 'custom', species: 'Robot', color: '#0820ae' },
    { name: 'Taira', personality: 'custom', species: 'Anthropomorphic Mac', color: '#9ef7ee' },
    { name: 'Mah', personality: 'custom', species: 'Supernatural SCP', color: '#b56d0a' },
    { name: 'Mira', personality: 'custom', species: 'Supernatural Witch', color: '#80ae70' },
    { name: 'Liz', personality: 'custom', species: 'Talking Dog', color: '#88984b' },
    { name: 'Eo', personality: 'custom', species: 'Talking Robot', color: '#c9006a' },
    { name: 'Quark', personality: 'custom', species: 'Robot', color: '#aff54f' },
    { name: 'Zora', personality: 'custom', species: 'Alien (Luminous Jelly‑type)', color: '#ed9caa' },
    { name: 'Basil', personality: 'custom', species: 'Talking Plant (Basilisk Vine)', color: '#b078ab' },
    { name: 'Gearwick', personality: 'custom', species: 'Robot', color: '#2266a0' },
    { name: 'Zephyr', personality: 'custom', species: 'Talking Bird (Hummingbird)', color: '#b5b2af' },
    { name: 'Gorm', personality: 'custom', species: 'Fantasy Creature (Mini‑Dragon)', color: '#fa080b' },
    { name: 'Sprig', personality: 'custom', species: 'Talking Plant (Mushroom)', color: '#cd5dc4' },
    { name: 'Rollo', personality: 'custom', species: 'Anthropomorphic Rolling Pin', color: '#c96644' },
    { name: 'Nyx', personality: 'custom', species: 'Supernatural Ghost', color: '#6b636a' },
    { name: 'Titan', personality: 'custom', species: 'Robot (Construction)', color: '#8c9097' },
    { name: 'Orla', personality: 'custom', species: 'Talking Whale (Mini‑size)', color: '#b440ef' },
    { name: 'Jax', personality: 'custom', species: 'Alien (Rock‑based)', color: '#0e4459' },
    { name: 'Clover', personality: 'custom', species: 'Talking Plant (Clover)', color: '#5698fb' },
    { name: 'Sprocket', personality: 'custom', species: 'Robot', color: '#80a829' },
    { name: 'Luna-2', personality: 'custom', species: 'Talking Cat (Twin)', color: '#082761' },
    { name: 'Vira', personality: 'custom', species: 'Alien (Bioluminescent)', color: '#7f0f4f' },
    { name: 'Birch', personality: 'custom', species: 'Talking Tree', color: '#c51f82' },
    { name: 'Flick', personality: 'custom', species: 'Anthropomorphic Candle', color: '#9b557c' },
    { name: 'Draven', personality: 'custom', species: 'Supernatural Werewolf (Mini)', color: '#583e24' },
    { name: 'Pixel', personality: 'custom', species: 'Robot (Pixel‑Art)', color: '#d5d06c' },
    { name: 'Aria', personality: 'custom', species: 'Talking Bird (Parrot)', color: '#9debe8' },
    { name: 'Grumble', personality: 'custom', species: 'Anthropomorphic Rock', color: '#b5da9a' },
    { name: 'Selene', personality: 'custom', species: 'Supernatural Moon Spirit', color: '#614c71' },
    { name: 'Bolt', personality: 'custom', species: 'Robot (Electric)', color: '#6cd417' },
    { name: 'Gidget', personality: 'custom', species: 'Talking Squirrel', color: '#ac9359' },
    { name: 'Lunae', personality: 'custom', species: 'Alien (Gas‑Giant Mini‑Avatar)', color: '#42d4b8' },
    { name: 'Willow', personality: 'custom', species: 'Talking Plant (Willow Tree)', color: '#2d2e9f' },
    { name: 'Rusty', personality: 'custom', species: 'Robot (Scrap‑Collector)', color: '#8c608f' },
    { name: 'Ember', personality: 'custom', species: 'Supernatural Fire Sprite', color: '#1d3a2d' },
    { name: 'Pippa', personality: 'custom', species: 'Anthropomorphic Teapot', color: '#1318d4' },
    { name: 'Orion', personality: 'custom', species: 'Alien (Star‑Child)', color: '#879016' },
    { name: 'Nixie', personality: 'custom', species: 'Talking Fish (Goldfish)', color: '#5c0e26' },
    { name: 'Cobble', personality: 'custom', species: 'Anthropomorphic Stone Statue', color: '#9ecb98' },
    { name: 'Zeph', personality: 'custom', species: 'Supernatural Wind Spirit', color: '#c4c5c9' },
    { name: 'Kiko', personality: 'custom', species: 'Talking Rabbit', color: '#33af19' },
    { name: 'Aurora', personality: 'custom', species: 'Supernatural Aurora Borealis Entity', color: '#fb9b3d' },
    { name: 'Quill', personality: 'custom', species: 'Anthropomorphic Quill Pen', color: '#43d638' },
    { name: 'Vex', personality: 'custom', species: 'Robot (Steampunk)', color: '#220158' },
];

let npcs = [];
let npcQueue = []; // remaining NPCs to arrive

class NPC {
    constructor(def, index) {
        this.id = index;
        this.name = def.name;
        this.personality = def.personality;
        this.species = def.species || '';
        this.color = def.color;
        this.gridX = 50;
        this.gridY = 50;
        this.facing = 'down';
        this.friendship = 0;
        this.isPresent = true;
        this.hasHome = false;
        this.hutX = 0;
        this.hutY = 0;
        this.dailyTalked = false;
        this.departureCounter = 0;
        this.animFrame = 0;
        this.daysOnIsland = 0;
        this.lastMoveAt = 0;
    }

    update(dt, gameTime) {
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
        // NPCs are 1 tile wide, 2 tiles tall, drawn bottom-anchored at (gridX, gridY).
        const sx = this.gridX * CONFIG.TILE_SIZE - cameraX;
        const sy = this.gridY * CONFIG.TILE_SIZE - cameraY;
        // Use per-NPC sprite if available, otherwise fall back to colored rectangle.
        const spriteKey = 'sprites.' + this.name.toLowerCase();
        const spr = SPRITES[spriteKey] || null;
        const moving = (millis() - (this.lastMoveAt || 0)) < 300;
        if (!drawCharacterSprite(spr, sx, sy - CONFIG.TILE_SIZE, this.facing, moving)) {
            fill(this.color);
            noStroke();
            rect(sx, sy - CONFIG.TILE_SIZE, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE * 2);
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
            rect(sx + CONFIG.TILE_SIZE / 2 - nw / 2, sy - CONFIG.TILE_SIZE - 12, nw, 9);
            fill(255);
            text(this.name, sx + CONFIG.TILE_SIZE / 2, sy - CONFIG.TILE_SIZE - 3);
        }
    }

    gainTalk() {
        if (!this.dailyTalked) {
            this.friendship = Math.min(10, this.friendship + 1);
            this.dailyTalked = true;
        }
    }

    gainGift(value) {
        this.friendship = Math.min(10, this.friendship + value);
    }

    lossRude() { this.friendship = Math.max(0, this.friendship - 1); }
    lossIgnored() { this.friendship = Math.max(0, this.friendship - 2); }
    lossToolUsed() { this.friendship = Math.max(0, this.friendship - 3); }

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
        const def = NPC_DEFS[data.id] || { name: data.name, personality: data.personality, color: data.color };
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

// Check for new NPC arrivals — called on new day
function checkArrivals() {
    if (npcs.length >= NPC_DEFS.length) return;
    if (npcQueue.length === 0) {
        // Fill queue with unused defs
        npcQueue = NPC_DEFS.map((d, i) => ({def: d, index: i}))
            .filter(d => !npcs.some(n => n.id === d.index));
    }
    const next = npcQueue.shift();
    if (!next) return;

    const npc = new NPC(next.def, next.index);
    // Spawn at random shoreline position
    const angle = Math.random() * Math.PI * 2;
    const r = 39; // beach ring
    npc.gridX = Math.round(50 + r * Math.cos(angle));
    npc.gridY = Math.round(50 + r * Math.sin(angle));
    npc.gridX = constrain(npc.gridX, 5, 95);
    npc.gridY = constrain(npc.gridY, 5, 95);
    npcs.push(npc);
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
    for (const npc of npcs) {
        npc.daysOnIsland++;
        npc.dailyTalked = false;
        // Build shack on first night if homeless
        if (!npc.hasHome) buildNpcShack(npc);
        // Departure check
        if (npc.friendship < 3) {
            npc.departureCounter++;
            if (npc.departureCounter >= 10) {
                npc.isPresent = false;
                notify(npc.name + ' left the island...');
            }
        } else {
            npc.departureCounter = 0;
        }
    }
    // Check for new arrivals (at least 1 per season)
    checkArrivals();
}

function drawEntities() {
    for (const npc of npcs) {
        npc.draw();
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

        // Friendship hearts (0-10)
        fill(120);
        textSize(7);
        let hearts = '';
        for (let i = 0; i < 10; i++) {
            hearts += i < Math.floor(npc.friendship) ? '\u2665' : '\u2661';
        }
        fill(npc.friendship >= 10 ? '#FFD700' : npc.friendship >= 3 ? '#E91E63' : '#888');
        text(hearts, x + 22, rowY + 10);

        fill(100);
        textSize(6);
        text('Day ' + npc.daysOnIsland + (npc.hasHome ? '  Has shack' : '  Homeless'), x + 22, rowY + 20);

        rowY += 28;
        if (rowY > y + h - 20) break;
    }
}
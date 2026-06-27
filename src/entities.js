// ===== ENTITIES (NPCs) =====
// Neighbors that arrive, build shacks, befriend, and depart

const NPC_DEFS = [
    { name: 'Mira',  personality: 'friendly',  color: '#E91E63' },
    { name: 'Toby',  personality: 'shy',       color: '#2196F3' },
    { name: 'Greta', personality: 'grumpy',   color: '#795548' },
    { name: 'Pip',   personality: 'cheerful',  color: '#FFC107' },
    { name: 'Hazel', personality: 'wise',      color: '#4CAF50' },
    { name: 'Finn',  personality: 'adventurous',color: '#FF5722' },
    { name: 'Luna',  personality: 'dreamy',    color: '#9C27B0' },
    { name: 'Buck',  personality: 'jolly',      color: '#FF9800' },
    { name: 'Wren',  personality: 'quiet',      color: '#607D8B' }
];

let npcs = [];
let npcQueue = []; // remaining NPCs to arrive

class NPC {
    constructor(def, index) {
        this.id = index;
        this.name = def.name;
        this.personality = def.personality;
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
                }
            }
        }
    }

    draw() {
        if (!this.isPresent) return;
        // NPCs are 1 tile wide, 2 tiles tall, drawn bottom-anchored at (gridX, gridY).
        const sx = this.gridX * CONFIG.TILE_SIZE - cameraX;
        const sy = this.gridY * CONFIG.TILE_SIZE - cameraY;
        fill(this.color);
        noStroke();
        rect(sx, sy - CONFIG.TILE_SIZE, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE * 2);
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
    if (npcs.length >= 9) return;
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
    // Find clear spot near their current position
    for (let attempts = 0; attempts < 50; attempts++) {
        const sx = npc.gridX + Math.floor(Math.random() * 10 - 5);
        const sy = npc.gridY + Math.floor(Math.random() * 10 - 5);
        // Check 3x2 area is clear
        let clear = true;
        for (let dx = 0; dx < 3; dx++) {
            for (let dy = 0; dy < 2; dy++) {
                const tx = sx + dx, ty = sy + dy;
                if (tx < 1 || tx > 97 || ty < 1 || ty > 98) { clear = false; break; }
                if (TILE_SOLID.has(world.tiles[tx][ty].type)) { clear = false; break; }
                if (buildingAt(tx, ty)) { clear = false; break; }
            }
            if (!clear) break;
        }
        if (clear) {
            buildings.push(new Building('shack', sx, sy, npc.id));
            npc.hasHome = true;
            npc.hutX = sx;
            npc.hutY = sy;
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
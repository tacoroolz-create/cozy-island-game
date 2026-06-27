// ===== MAGIC SYSTEM =====
// Neighbors teach magic tricks that manipulate the world

const MAGIC_TRICKS = [
    { id: 'vanish_npc',     name: 'Vanish',         desc: 'Make a neighbor disappear.',         teacher: 0, cost: [{id:'crystal', count:1}], icon: '\u2728' },
    { id: 'move_feature',  name: 'Movable Feature',  desc: 'Pick up a harvest tile and move it.',  teacher: 1, cost: [{id:'crystal', count:1}], icon: '\u2702' },
    { id: 'summon_fairy',   name: 'Summon Fairy',    desc: 'Call a glowing fairy to follow you.', teacher: 2, cost: [{id:'crystal', count:2}], icon: '\u2741' },
    { id: 'change_time',    name: 'Time Warp',       desc: 'Toggle between day and night.',        teacher: 3, cost: [{id:'crystal', count:1}], icon: '\u2600' },
    { id: 'change_season',  name: 'Season Shift',    desc: 'Advance to the next season instantly.',teacher: 4, cost: [{id:'crystal', count:3}], icon: '\u2698' }
];

let knownMagic = [];
let fairyEntities = [];
let magicCasting = false;
let magicCastingTrick = null;

function learnMagic(trickId) {
    if (knownMagic.includes(trickId)) return;
    knownMagic.push(trickId);
    const trick = MAGIC_TRICKS.find(t => t.id === trickId);
    if (trick) notify('Learned ' + trick.name + '!');
}

function canCastMagic(trickId) {
    const trick = MAGIC_TRICKS.find(t => t.id === trickId);
    if (!trick) return false;
    return trick.cost.every(c => inventory.hasItem(c.id, c.count));
}

function castMagic(trickId, target) {
    const trick = MAGIC_TRICKS.find(t => t.id === trickId);
    if (!trick || !canCastMagic(trickId)) return false;

    // Consume cost
    for (const c of trick.cost) {
        inventory.removeItem(c.id, c.count);
    }

    // Execute effect
    switch(trickId) {
        case 'vanish_npc':
            if (target && target instanceof NPC) {
                target.isPresent = false;
                notify(target.name + ' vanished!');
            }
            break;
        case 'move_feature':
            // Pick up harvest tile at facing position as item
            const facing = player.getFacingTile();
            if (facing && HARVEST_TYPES[facing.tile.type]) {
                const tileType = facing.tile.type;
                inventory.addItem('seed', 1); // simplified
                facing.tile.type = 'grass';
                facing.tile.variant = 0;
                notify('Moved a ' + HARVEST_TYPES[tileType].name.toLowerCase() + '!');
            }
            break;
        case 'summon_fairy':
            fairyEntities.push({
                x: player.x, y: player.y,
                offsetX: 0, offsetY: 0,
                hue: Math.random() * 360,
                life: -1 // permanent
            });
            notify('A fairy appeared!');
            break;
        case 'change_time':
            if (world.timeMinutes < 720) {
                world.timeMinutes = 1200; // 8 PM
                notify('Night fell!');
            } else {
                world.timeMinutes = 360; // 6 AM
                notify('Morning arrived!');
            }
            break;
        case 'change_season':
            const seasons = ['Sweet', 'Saucy', 'Cool', 'Yeesh'];
            const idx = seasons.indexOf(world.season);
            world.season = seasons[(idx + 1) % 4];
            notify('Season shifted to ' + world.season + '!');
            break;
    }

    return true;
}

function updateFairies(dt) {
    for (let i = fairyEntities.length - 1; i >= 0; i--) {
        const f = fairyEntities[i];
        // Follow player
        const dx = player.x - f.x;
        const dy = player.y - f.y;
        f.x += dx * 0.02;
        f.y += dy * 0.02;
        // Bobbing
        f.offsetX = Math.sin(frameCount * 0.05 + i) * 2;
        f.offsetY = Math.cos(frameCount * 0.07 + i) * 2;
        f.hue = (f.hue + 0.5) % 360;
    }
}

function drawFairyOverlay() {
    for (const f of fairyEntities) {
        const sx = f.x * CONFIG.TILE_SIZE - cameraX + 8 + f.offsetX;
        const sy = f.y * CONFIG.TILE_SIZE - cameraY + 8 + f.offsetY;
        // Glowing fairy
        push();
        colorMode(HSB, 360, 100, 100, 100);
        fill(f.hue, 80, 100, 60);
        noStroke();
        ellipse(sx, sy, 8, 8);
        fill(f.hue, 30, 100, 90);
        ellipse(sx, sy, 3, 3);
        colorMode(RGB, 255);
        pop();
    }
}

// Magic tab rendering
function drawMagicTab(x, y, w, h) {
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Magic Tricks', x, y);

    if (knownMagic.length === 0) {
        fill(120);
        textSize(8);
        text('Learn magic tricks from neighbors', x, y + 16);
        text('as your friendship grows!', x, y + 28);
        text('(Befriend neighbors to unlock tricks)', x, y + 44);
        return;
    }

    // List known tricks
    let rowY = y + 18;
    for (const trickId of knownMagic) {
        const trick = MAGIC_TRICKS.find(t => t.id === trickId);
        if (!trick) continue;

        // Icon
        fill(255, 255, 100);
        text(trick.icon, x, rowY);

        // Name
        fill(255);
        textSize(9);
        text(trick.name, x + 16, rowY);

        // Desc
        fill(150);
        textSize(7);
        text(trick.desc, x + 16, rowY + 10);

        // Cost
        fill(120);
        textSize(7);
        text('Cost: ' + trick.cost.map(c => c.count + 'x ' + (ITEMS[c.id] ? ITEMS[c.id].name : c.id)).join(', '), x + 16, rowY + 20);

        // Castable?
        if (canCastMagic(trickId)) {
            fill(100, 255, 100);
            textSize(7);
            text('Ready!', x + w - 40, rowY);
        } else {
            fill(150);
            textSize(7);
            text('No materials', x + w - 60, rowY);
        }

        rowY += 32;
        if (rowY > y + h - 16) break;
    }

    fill(120);
    textSize(7);
    text('Press Enter to cast (if facing valid target)', x, y + h - 10);
}
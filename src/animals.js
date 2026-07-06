// ===== ANIMALS (birds + crabs) =====
// Birds appear at sunrise, wander for ~3 game hours, accept seeds as gifts,
// then disappear and leave a feather. Crabs appear at sunrise on the beach edge,
// wander along the beach all day, and return to the water at sundown.

let birds = [];
let crabs = [];
let turtles = [];
let seagulls = [];
let butterflies = [];
let cicadas = [];
let groundLoot = []; // { x, y, id, count, sprKey } temporary pickups

const ANIMAL_SPRITES = {
    bird: ['sprites.bird', 'sprites.bird2'],
    crab: ['sprites.crab'],
    turtle: ['sprites.turtle'],
    seagull: ['sprites.seagull'],
    butterfly: ['sprites.butterfly'],
    cicada: ['sprites.cicada']
};

const SUNRISE_HOUR = 6;
const BIRD_DESPAWN_HOUR = 9; // 3 in-game hours after sunrise
const SUNSET_HOUR = 20;

class Animal {
    constructor(type, x, y, variant) {
        this.type = type;          // 'bird', 'crab', 'turtle', 'seagull', 'butterfly', or 'cicada'
        this.gridX = x;
        this.gridY = y;
        this.facing = 'down';
        this.variant = variant || 0;
        this.friendship = 0;
        this.ateToday = false;
        this.complimentedToday = false;
        this.frameTimer = 0;
        this.moveTimer = 0;
        this.bobOffset = 0;
        this.homeX = x; // flower or tree tile to orbit/cling to
        this.homeY = y;
    }

    update(dt, gameMinutes) {
        this.frameTimer += dt;
        this.moveTimer += dt;

        // Hop/bob animation timer
        this.bobOffset = Math.sin(this.frameTimer * 0.008) * 1.5;

        // Butterflies flutter in a small orbit around their flower; cicadas stay still.
        if (this.type === 'butterfly') {
            // Lazy orbit, update position rarely
            if (this.moveTimer < 400 + Math.random() * 400) return;
            this.moveTimer = 0;
            const angle = this.frameTimer * 0.002 + this.variant * 1.5;
            const radius = 1.5;
            const tx = Math.round(this.homeX + Math.cos(angle) * radius);
            const ty = Math.round(this.homeY + Math.sin(angle) * radius);
            if (tx >= 0 && tx < CONFIG.WORLD_WIDTH && ty >= 0 && ty < CONFIG.WORLD_HEIGHT) {
                this.gridX = tx;
                this.gridY = ty;
            }
            return;
        } else if (this.type === 'cicada') {
            // Cicadas cling to their tree and don't move. Visual pulse handled in draw.
            return;
        }

        // Move every ~0.8-1.5 seconds
        if (this.moveTimer < 900 + Math.random() * 600) return;
        this.moveTimer = 0;

        const dirs = [[0,-1,'up'], [0,1,'down'], [-1,0,'left'], [1,0,'right']];
        // Filter candidates based on terrain preference
        const validDirs = dirs.filter(([dx, dy, dirName]) => {
            const nx = this.gridX + dx;
            const ny = this.gridY + dy;
            if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) return false;
            if (!world || !world.tiles[nx] || !world.tiles[nx][ny]) return false;
            if (isSolidTile(nx, ny)) return false;
            if (buildingAt(nx, ny)) return false;
            if (this.blockedByAnimal(nx, ny)) return false;
            if (this.type === 'crab') {
                // Crabs stick to beach tiles adjacent to water
                const t = world.tiles[nx][ny];
                if (t.type !== 'beach' && t.type !== 'water' && t.type !== 'sea') return false;
                // Prefer staying near water
                const nearWater = [[0,-1],[0,1],[-1,0],[1,0]].some(([ox, oy]) => {
                    const wx = nx + ox, wy = ny + oy;
                    if (wx < 0 || wx >= CONFIG.WORLD_WIDTH || wy < 0 || wy >= CONFIG.WORLD_HEIGHT) return false;
                    const wt = world.tiles[wx][wy];
                    return wt && (wt.type === 'water' || wt.type === 'sea');
                });
                if (t.type === 'beach' && !nearWater) return false;
            } else if (this.type === 'bird') {
                // Birds stay on grass/beach, avoid water
                const t = world.tiles[nx][ny];
                if (t.type === 'water' || t.type === 'sea') return false;
            } else if (this.type === 'seagull') {
                // Seagulls stay on beach/grass, avoid water
                const t = world.tiles[nx][ny];
                if (t.type === 'water' || t.type === 'sea') return false;
            } else if (this.type === 'turtle') {
                // Turtles stay on beach adjacent to water, or in shallow water
                const t = world.tiles[nx][ny];
                if (t.type !== 'beach' && t.type !== 'water' && t.type !== 'sea') return false;
                const nearWater = [[0,-1],[0,1],[-1,0],[1,0]].some(([ox, oy]) => {
                    const wx = nx + ox, wy = ny + oy;
                    if (wx < 0 || wx >= CONFIG.WORLD_WIDTH || wy < 0 || wy >= CONFIG.WORLD_HEIGHT) return false;
                    const wt = world.tiles[wx][wy];
                    return wt && (wt.type === 'water' || wt.type === 'sea');
                });
                if (t.type === 'beach' && !nearWater) return false;
            }
            return true;
        });

        if (validDirs.length === 0) return;

        const [dx, dy, dirName] = validDirs[Math.floor(Math.random() * validDirs.length)];
        this.gridX += dx;
        this.gridY += dy;
        this.facing = dirName;
    }

    draw() {
        const sx = this.gridX * CONFIG.TILE_SIZE - cameraX;
        const sy = this.gridY * CONFIG.TILE_SIZE - cameraY;
        const sprKey = ANIMAL_SPRITES[this.type][this.variant % ANIMAL_SPRITES[this.type].length];
        const spr = SPRITES[sprKey];

        // Birds hop up/down slightly; crabs scuttle side-to-side a tiny bit
        const bob = this.type === 'bird' ? this.bobOffset : Math.sin(this.frameTimer * 0.012) * 0.5;

        if (spr) {
            image(spr, sx, sy + bob, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
        } else {
            // Fallback colored shape
            noStroke();
            if (this.type === 'bird' || this.type === 'seagull') {
                fill(this.type === 'seagull' ? '#FFFFFF' : '#FFFFFF');
                ellipse(sx + 8, sy + 8 + bob, 8, 6);
            } else if (this.type === 'turtle') {
                fill('#2E8B57');
                ellipse(sx + 8, sy + 10, 10, 7);
                fill('#006400');
                ellipse(sx + 8, sy + 9, 6, 5);
            } else if (this.type === 'butterfly') {
                fill('#FF69B4');
                ellipse(sx + 5, sy + 6, 5, 5);
                ellipse(sx + 11, sy + 6, 5, 5);
                fill('#333');
                ellipse(sx + 8, sy + 6, 2, 6);
            } else if (this.type === 'cicada') {
                fill('#8B7355');
                ellipse(sx + 8, sy + 8, 8, 5);
                // Buzz pulse when player is near
                const distToPlayer = Math.abs(this.gridX - player.x) + Math.abs(this.gridY - player.y);
                if (distToPlayer <= 2) {
                    fill(255, 255, 0, 120 + Math.sin(this.frameTimer * 0.02) * 80);
                    ellipse(sx + 8, sy + 8, 12 + Math.sin(this.frameTimer * 0.05) * 2, 9 + Math.sin(this.frameTimer * 0.05) * 2);
                }
            } else {
                fill('#FF5722');
                ellipse(sx + 8, sy + 10, 10, 6);
            }
        }

        // Friendship heart puff when fed
        if (this.friendshipPuffTimer > 0) {
            this.friendshipPuffTimer -= deltaTime || 16;
            fill('#E91E63');
            textAlign(CENTER, CENTER);
            textSize(7);
            text('♥', sx + CONFIG.TILE_SIZE / 2, sy - 6 + Math.sin(this.friendshipPuffTimer * 0.02) * 2);
        }
    }

    feed() {
        if (this.ateToday) {
            notify(this.type === 'bird' ? 'This bird is full for today.' : 'The crab is not interested.');
            return false;
        }
        if (!inventory.hasItem('seed', 1)) {
            notify('You need seeds to feed the bird.');
            return false;
        }
        inventory.removeItem('seed', 1);
        this.friendship = Math.min(10, this.friendship + 1);
        this.ateToday = true;
        this.friendshipPuffTimer = 1000;
        notify('The bird likes the seed. Friendship +1');
        return true;
    }

    compliment() {
        if (this.type !== 'crab') return false;
        const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
        if (!holiday || holiday.name !== 'Compliment a Crab Day') {
            notify('The crab stares blankly. Maybe it needs a special day for compliments.');
            return false;
        }
        if (this.complimentedToday) {
            notify('This crab has already been complimented today. Its shell can only take so much praise.');
            return false;
        }
        this.complimentedToday = true;
        this.friendship = Math.min(10, this.friendship + 2);
        this.friendshipPuffTimer = 1200;
        // Chance to receive a seashell gift from the flattered crab
        if (Math.random() < 0.6) {
            inventory.addItem('seashell', 1);
            notify('You complimented the crab! It blushes red and gives you a seashell. Friendship +2');
        } else {
            notify('You complimented the crab! It does a tiny happy scuttle. Friendship +2');
        }
        return true;
    }

    blockedByAnimal(nx, ny) {
        switch (this.type) {
            case 'bird': return birds.some(a => a !== this && a.gridX === nx && a.gridY === ny);
            case 'crab': return crabs.some(a => a !== this && a.gridX === nx && a.gridY === ny);
            case 'seagull': return seagulls.some(a => a !== this && a.gridX === nx && a.gridY === ny);
            case 'turtle': return turtles.some(a => a !== this && a.gridX === nx && a.gridY === ny);
            case 'butterfly': return butterflies.some(a => a !== this && a.gridX === nx && a.gridY === ny);
            case 'cicada': return cicadas.some(a => a !== this && a.gridX === nx && a.gridY === ny);
            default: return false;
        }
    }
}

// Spawn birds at sunrise on random grass tiles
function spawnBirds(count) {
    if (!world) return;
    let spawned = 0;
    let attempts = 0;
    const px = player ? player.x : -1;
    const py = player ? player.y : -1;
    while (spawned < count && attempts < 500) {
        attempts++;
        const x = floor(random(CONFIG.WORLD_WIDTH));
        const y = floor(random(CONFIG.WORLD_HEIGHT));
        const tile = world.tiles[x][y];
        if (!tile || tile.type !== 'grass') continue;
        if (isSolidTile(x, y)) continue;
        if (buildingAt(x, y)) continue;
        if (x === px && y === py) continue;
        if (animalAt(x, y)) continue;
        birds.push(new Animal('bird', x, y, floor(random(2))));
        spawned++;
    }
    if (spawned > 0) {
        notify(spawned + ' bird' + (spawned === 1 ? '' : 's') + ' arrived at sunrise!');
    }
}

// Spawn crabs at sunrise on beach tiles near water
function spawnCrabs(count) {
    if (!world) return;
    if (world.season !== 'Sour' && world.season !== 'Sweet') return; // crabs active in warm seasons
    let spawned = 0;
    let attempts = 0;
    const candidates = [];
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (!t || t.type !== 'beach') continue;
            const nearWater = [[0,-1],[0,1],[-1,0],[1,0]].some(([dx, dy]) => {
                const nx = x + dx, ny = y + dy;
                if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) return false;
                const nt = world.tiles[nx][ny];
                return nt && (nt.type === 'water' || nt.type === 'sea');
            });
            if (nearWater) candidates.push({x, y});
        }
    }
    while (spawned < count && attempts < 500 && candidates.length > 0) {
        attempts++;
        const pick = candidates.splice(floor(random(candidates.length)), 1)[0];
        if (animalAt(pick.x, pick.y)) continue;
        crabs.push(new Animal('crab', pick.x, pick.y, floor(random(3))));
        spawned++;
    }
    if (spawned > 0) {
        notify(spawned + ' crab' + (spawned === 1 ? '' : 's') + ' scuttled onto the beach!');
    }
}

// Spawn seagulls at sunrise on beach or grass tiles
function spawnSeagulls(count) {
    if (!world) return;
    let spawned = 0;
    let attempts = 0;
    const px = player ? player.x : -1;
    const py = player ? player.y : -1;
    while (spawned < count && attempts < 500) {
        attempts++;
        const x = floor(random(CONFIG.WORLD_WIDTH));
        const y = floor(random(CONFIG.WORLD_HEIGHT));
        const tile = world.tiles[x][y];
        if (!tile || (tile.type !== 'beach' && tile.type !== 'grass')) continue;
        if (isSolidTile(x, y)) continue;
        if (buildingAt(x, y)) continue;
        if (x === px && y === py) continue;
        if (animalAt(x, y)) continue;
        seagulls.push(new Animal('seagull', x, y, 0));
        spawned++;
    }
    if (spawned > 0) {
        notify(spawned + ' seagull' + (spawned === 1 ? '' : 's') + ' circled down to the island!');
    }
}

// Spawn sea turtles at sunrise during Sour Season (summer nesting season) on beach near water
function spawnTurtles(count) {
    if (!world) return;
    if (world.season !== 'Sour') return; // turtles nest in Sour season
    let spawned = 0;
    let attempts = 0;
    const candidates = [];
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (!t || t.type !== 'beach') continue;
            const nearWater = [[0,-1],[0,1],[-1,0],[1,0]].some(([dx, dy]) => {
                const nx = x + dx, ny = y + dy;
                if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) return false;
                const nt = world.tiles[nx][ny];
                return nt && (nt.type === 'water' || nt.type === 'sea');
            });
            if (nearWater) candidates.push({x, y});
        }
    }
    while (spawned < count && attempts < 500 && candidates.length > 0) {
        attempts++;
        const pick = candidates.splice(floor(random(candidates.length)), 1)[0];
        if (animalAt(pick.x, pick.y)) continue;
        turtles.push(new Animal('turtle', pick.x, pick.y, 0));
        spawned++;
    }
    if (spawned > 0) {
        notify(spawned + ' sea turtle' + (spawned === 1 ? '' : 's') + ' came ashore to nest!');
    }
}

// Sea turtles leave polished eggs on nearby beach tiles when they depart
function layTurtleEggs() {
    if (!world || world.season !== 'Sour') return;
    for (const turtle of turtles) {
        // Find a nearby empty beach tile
        const offsets = [[0,0],[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[1,1],[-1,1],[1,-1]];
        for (const [ox, oy] of offsets) {
            const tx = turtle.gridX + ox;
            const ty = turtle.gridY + oy;
            if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
            const tile = world.tiles[tx][ty];
            if (!tile || tile.type !== 'beach') continue;
            if (animalAt(tx, ty)) continue;
            if (tx === player.x && ty === player.y) continue;
            groundLoot.push({ x: tx, y: ty, id: 'turtle_egg', count: 1, sprKey: 'items.turtle_egg' });
            break;
        }
    }
}

// Spawn butterflies at sunrise in Cool Season. One per flower on the island.
function spawnButterflies() {
    if (!world) return;
    if (world.season !== 'Cool') return;

    const flowers = [];
    // Rosebush tiles
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (t && t.type === 'rosebush') flowers.push({x, y});
        }
    }
    // Mature wildflower plots (visible flowers)
    if (typeof gardenPlots !== 'undefined') {
        for (const key in gardenPlots) {
            const plot = gardenPlots[key];
            if (plot && plot.type === 'wildflower' && plot.stage >= 2) {
                flowers.push({x: plot.x, y: plot.y});
            }
        }
    }

    for (const flower of flowers) {
        if (animalAt(flower.x, flower.y)) continue;
        butterflies.push(new Animal('butterfly', flower.x, flower.y, butterflies.length % 4));
    }
    if (butterflies.length > 0) {
        notify(butterflies.length + ' migrating butterfly' + (butterflies.length === 1 ? '' : 'ies') + ' visited the flowers!');
    }
}

// Spawn cicadas at sunrise in Sour Season, clinging to tree tiles.
function spawnCicadas(count) {
    if (!world) return;
    if (world.season !== 'Sour') return;

    const trees = [];
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (t && t.type === 'tree') {
                if (t.isTreeTop) continue;
                trees.push({x, y});
            }
        }
    }

    let spawned = 0;
    let attempts = 0;
    const desired = Math.min(count, trees.length);
    while (spawned < desired && attempts < 500 && trees.length > 0) {
        attempts++;
        const pick = trees.splice(floor(random(trees.length)), 1)[0];
        if (animalAt(pick.x, pick.y)) continue;
        cicadas.push(new Animal('cicada', pick.x, pick.y, spawned % 3));
        spawned++;
    }
    if (spawned > 0) {
        notify(spawned + ' cicada' + (spawned === 1 ? '' : 's') + ' started humming in the trees.');
    }
}

// Cicadas leave their shells on tree tiles at the end of Sour Season.
function shedCicadaShells() {
    if (!world || world.season !== 'Sour') return;
    let shed = 0;
    for (const cicada of cicadas) {
        const tx = cicada.gridX;
        const ty = cicada.gridY;
        const tile = world.tiles[tx][ty];
        if (tile && tile.type === 'tree') {
            groundLoot.push({ x: tx, y: ty, id: 'cicada_shell', count: 1, sprKey: 'items.cicada_shell' });
            shed++;
        }
    }
    if (shed > 0) notify('Cicadas left ' + shed + ' delicate shells behind.');
}

// Seagulls occasionally drop feathers while active
function dropSeagullFeathers() {
    for (const gull of seagulls) {
        if (random() < 0.15) {
            groundLoot.push({ x: gull.gridX, y: gull.gridY, id: 'feather', count: 1, sprKey: 'items.feather' });
        }
    }
    const dropped = seagulls.filter(() => random() < 0.15).length;
    if (dropped > 0) notify('Seagulls dropped a few feathers.');
}

function despawnBirds() {
    for (const bird of birds) {
        // Leave feather at last occupied tile
        groundLoot.push({ x: bird.gridX, y: bird.gridY, id: 'feather', count: 1, sprKey: 'items.feather' });
    }
    birds = [];
    notify('The birds flew away, leaving feathers behind.');
}

function despawnSeagulls() {
    seagulls = [];
    notify('The seagulls flew back out to sea.');
}

function despawnCrabs() {
    crabs = [];
    notify('The crabs returned to the water.');
}

function despawnTurtles() {
    layTurtleEggs();
    turtles = [];
    notify('The sea turtles slipped back into the waves.');
}

function animalAt(x, y) {
    return birds.some(a => a.gridX === x && a.gridY === y) ||
           crabs.some(a => a.gridX === x && a.gridY === y) ||
           seagulls.some(a => a.gridX === x && a.gridY === y) ||
           turtles.some(a => a.gridX === x && a.gridY === y) ||
           butterflies.some(a => a.gridX === x && a.gridY === y) ||
           cicadas.some(a => a.gridX === x && a.gridY === y);
}

function animalAtFacing() {
    const facing = player.getFacingTile();
    if (!facing) return null;
    let found = birds.find(a => a.gridX === facing.x && a.gridY === facing.y) ||
                seagulls.find(a => a.gridX === facing.x && a.gridY === facing.y) ||
                butterflies.find(a => a.gridX === facing.x && a.gridY === facing.y) ||
                crabs.find(a => a.gridX === facing.x && a.gridY === facing.y) ||
                turtles.find(a => a.gridX === facing.x && a.gridY === facing.y) ||
                cicadas.find(a => a.gridX === facing.x && a.gridY === facing.y);
    if (found) return found;
    return null;
}

function updateAnimals(dt) {
    if (!world) return;
    const hour = world.timeMinutes / 60;

    for (const bird of birds) bird.update(dt, world.timeMinutes);
    for (const crab of crabs) crab.update(dt, world.timeMinutes);
    for (const gull of seagulls) gull.update(dt, world.timeMinutes);
    for (const turtle of turtles) turtle.update(dt, world.timeMinutes);
    for (const butterfly of butterflies) butterfly.update(dt, world.timeMinutes);
    for (const cicada of cicadas) cicada.update(dt, world.timeMinutes);
    updateSnakes(dt);

    // Ambient sounds
    if (audioManager && !audioManager.muted) {
        // Bird chirps during daytime when birds are near
        if (hour >= SUNRISE_HOUR && hour <= SUNSET_HOUR && birds.length > 0) {
            if (Math.random() < 0.003) {
                const nearBird = birds.find(b => Math.abs(b.gridX - player.x) + Math.abs(b.gridY - player.y) <= 6);
                if (nearBird) audioManager.playSFX('chirp', 0.6);
            }
        }
        // Cicada buzz when player is near a cicada in Sour season
        if (world.season === 'Sour' && cicadas.length > 0 && Math.random() < 0.015) {
            const nearCicada = cicadas.find(c => Math.abs(c.gridX - player.x) + Math.abs(c.gridY - player.y) <= 4);
            if (nearCicada) audioManager.playSFX('cicada', 0.5);
        }
    }

    // Auto-pickup ground loot
    if (player) {
        groundLoot = groundLoot.filter(loot => {
            if (loot.x === player.x && loot.y === player.y) {
                inventory.addItem(loot.id, loot.count);
                notify('Picked up: ' + ITEMS[loot.id].name);
                return false;
            }
            return true;
        });
    }
}

function drawGroundLoot() {
    if (!groundLoot || groundLoot.length === 0) return;
    const TS = CONFIG.TILE_SIZE;
    const startX = Math.max(0, Math.floor(cameraX / TS));
    const startY = Math.max(0, Math.floor(cameraY / TS));
    const endX = Math.min(CONFIG.WORLD_WIDTH, startX + Math.ceil(CONFIG.CANVAS_WIDTH / TS) + 2);
    const endY = Math.min(CONFIG.WORLD_HEIGHT, startY + Math.ceil(CONFIG.CANVAS_HEIGHT / TS) + 2);
    for (const loot of groundLoot) {
        if (loot.x < startX || loot.x >= endX || loot.y < startY || loot.y >= endY) continue;
        const sx = loot.x * TS - cameraX;
        const sy = loot.y * TS - cameraY;
        const spr = SPRITES[loot.sprKey];
        if (spr) {
            image(spr, sx, sy, TS, TS);
        } else {
            const item = ITEMS[loot.id];
            fill(item ? item.color : '#FFF');
            noStroke();
            ellipse(sx + TS/2, sy + TS/2, TS/2, TS/2);
        }
    }
}

function drawAnimals() {
    // Backflip Day: an interacted-with animal draws mid-rotation.
    const flip = (typeof withBackflip === 'function')
        ? (a) => withBackflip(a, () => a.draw(), true)
        : (a) => a.draw();
    for (const bird of birds) flip(bird);
    for (const gull of seagulls) flip(gull);
    for (const crab of crabs) flip(crab);
    for (const turtle of turtles) flip(turtle);
    for (const butterfly of butterflies) flip(butterfly);
    for (const cicada of cicadas) flip(cicada);
    drawSnakes();
    drawGroundLoot();
}

// ===== SNAKE RUN DAY =====
// Holiday-only snakes. Each one hides inside an object (tree, rock, building),
// then darts fast in a straight line to another object, drawn as a squiggly
// green line. Touching one mid-dart shakes loose a small resource gift.
let snakes = [];
let snakeObjects = null; // cached dart anchor points for the day
const SNAKE_COUNT = 8;
const SNAKE_SPEED = 7; // tiles per second
const SNAKE_GIFTS = ['fiber', 'feather', 'seed', 'stick', 'stone'];

function snakeObjectTiles() {
    const objs = [];
    const kinds = new Set(['tree', 'fir_tree', 'banana_tree', 'palm_tree', 'rock', 'shiny_rock']);
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            const t = world.tiles[x][y];
            if (t && kinds.has(t.type) && !t.isTreeTop) objs.push({ x, y });
        }
    }
    if (typeof buildings !== 'undefined') {
        for (const b of buildings) objs.push({ x: b.gridX, y: b.gridY });
    }
    return objs;
}

function spawnSnakes() {
    snakeObjects = snakeObjectTiles(); // ponytail: cached all day; a chopped tree just means one empty dart spot
    if (snakeObjects.length < 2) return;
    for (let i = 0; i < SNAKE_COUNT; i++) {
        const home = snakeObjects[floor(random(snakeObjects.length))];
        snakes.push({
            x: home.x, y: home.y,           // current position (float tile coords)
            x0: home.x, y0: home.y,          // dart start
            tx: home.x, ty: home.y,          // dart end
            darting: false,
            dartT: 0, dartDur: 1,
            hideTimer: 500 + random(3500),   // ms hiding before the next dart
            phase: random(1000),             // squiggle animation offset
            gave: false                      // one gift per dart
        });
    }
    notify("It's Snake Run Day! Snakes are darting between the island's trees and rocks.", 4000);
}

function updateSnakes(dt) {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== 'Snake Run Day') {
        if (snakes.length) { snakes = []; snakeObjects = null; }
        return;
    }
    if (snakes.length === 0 && world) spawnSnakes();

    for (const s of snakes) {
        s.phase += dt;

        if (!s.darting) {
            s.hideTimer -= dt;
            if (s.hideTimer > 0) continue;
            // Pick a new object to run to, preferring mid-range darts.
            let dest = null;
            for (let tries = 0; tries < 10 && !dest; tries++) {
                const cand = snakeObjects[floor(random(snakeObjects.length))];
                const d = Math.max(Math.abs(cand.x - s.x), Math.abs(cand.y - s.y));
                if (d >= 3 && d <= 12) dest = cand;
            }
            if (!dest) { s.hideTimer = 1000; continue; }
            s.x0 = s.x; s.y0 = s.y;
            s.tx = dest.x; s.ty = dest.y;
            s.dartT = 0;
            s.dartDur = Math.hypot(dest.x - s.x, dest.y - s.y) / SNAKE_SPEED;
            s.darting = true;
            s.gave = false;
            continue;
        }

        // Mid-dart: slide along the straight line between the two objects.
        s.dartT += dt / 1000;
        const t = Math.min(s.dartT / s.dartDur, 1);
        s.x = lerp(s.x0, s.tx, t);
        s.y = lerp(s.y0, s.ty, t);

        // Caught! Player touched the running snake.
        if (!s.gave && player && Math.abs(s.x - player.x) < 0.6 && Math.abs(s.y - player.y) < 0.6) {
            s.gave = true;
            const gift = SNAKE_GIFTS[floor(random(SNAKE_GIFTS.length))];
            inventory.addItem(gift, 1);
            notify('You caught a snake! It wriggles free, leaving you a ' + (ITEMS[gift] ? ITEMS[gift].name : gift) + '.');
        }

        if (t >= 1) {
            s.darting = false;
            s.hideTimer = 800 + random(4000);
        }
    }
}

function drawSnakes() {
    if (snakes.length === 0) return;
    const TS = CONFIG.TILE_SIZE;
    for (const s of snakes) {
        if (!s.darting) continue; // hidden inside an object
        const cx = s.x * TS + TS / 2 - cameraX;
        const cy = s.y * TS + TS / 2 - cameraY;
        // Unit vector along the dart, and its perpendicular for the wiggle.
        const dx = s.tx - s.x0, dy = s.ty - s.y0;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len, uy = dy / len;
        stroke('#2E7D32');
        strokeWeight(3);
        noFill();
        beginShape();
        for (let i = 0; i <= 8; i++) {
            const along = (i / 8 - 0.5) * TS;                       // one tile long
            const wig = Math.sin(s.phase * 0.03 + i * 1.3) * 3;     // squiggle
            vertex(cx + ux * along - uy * wig, cy + uy * along + ux * wig);
        }
        endShape();
        noStroke();
    }
}

function despawnButterflies() {
    butterflies = [];
    notify('The migrating butterflies continued on their journey.');
}

function despawnCicadas() {
    shedCicadaShells();
    cicadas = [];
    notify('The cicadas fell silent.');
}

// Called once per in-game day at sunrise
function onAnimalNewDay() {
    // Reset daily flags
    for (const bird of birds) bird.ateToday = false;
    for (const crab of crabs) crab.complimentedToday = false;
    // Clear seasonal animals and respawn based on current season
    butterflies = [];
    cicadas = [];
    // Spawn fresh animals
    spawnBirds(2 + floor(random(3)));
    spawnCrabs(2 + floor(random(3)));
    spawnSeagulls(2 + floor(random(3)));
    spawnTurtles(1 + floor(random(2)));
    spawnButterflies();
    spawnCicadas(2 + floor(random(3)));
    // Seagulls sometimes drop extra feathers after circling down
    if (seagulls.length > 0) setTimeout(dropSeagullFeathers, 1000);
}

// Hook into day rollover.
let _lastAnimalHour = null;
function checkAnimalSunEvents() {
    if (!world) return;
    const hour = world.timeMinutes / 60;
    if (_lastAnimalHour === null) {
        _lastAnimalHour = hour;
        return;
    }

    const crossed = (before, after, target) => before < target && after >= target;

    // Sunrise: 6 AM
    if (crossed(_lastAnimalHour, hour, SUNRISE_HOUR)) {
        onAnimalNewDay();
    }

    // Birds leave: 9 AM
    if (crossed(_lastAnimalHour, hour, BIRD_DESPAWN_HOUR)) {
        despawnBirds();
    }

    // Seagulls leave: 8 PM (fly off with the day)
    if (crossed(_lastAnimalHour, hour, SUNSET_HOUR)) {
        despawnSeagulls();
        despawnCrabs();
        despawnTurtles();
        despawnButterflies();
        despawnCicadas();
    }

    _lastAnimalHour = hour;
}

// Wrap keyPressed to feed animals when facing a bird with seeds
(function wrapAnimalKeys() {
    if (typeof window._cozyAnimalKeysWrapped !== 'undefined') return;
    window._cozyAnimalKeysWrapped = true;

    if (typeof window.keyPressed !== 'function') {
        setTimeout(wrapAnimalKeys, 0);
        return;
    }
    const orig = window.keyPressed;
    window.keyPressed = function () {
        if (typeof gameState !== 'undefined' && gameState === STATE.PLAYING &&
            (keyCode === ENTER || keyCode === RETURN)) {
            const animal = animalAtFacing();
            if (animal && typeof triggerBackflip === 'function') {
                const TS = CONFIG.TILE_SIZE;
                triggerBackflip(animal, (animal.gridX + 0.5) * TS, (animal.gridY + 0.5) * TS);
            }
            if (animal && animal.type === 'bird') {
                if (animal.feed()) return false;
            } else if (animal && animal.type === 'crab') {
                if (animal.compliment()) return false;
            }
        }
        return orig.apply(this, arguments);
    };
})();

// Wrap mousePressed to feed animals on click too
(function wrapAnimalMouse() {
    if (typeof window._cozyAnimalMouseWrapped !== 'undefined') return;
    window._cozyAnimalMouseWrapped = true;

    if (typeof window.mousePressed !== 'function') {
        setTimeout(wrapAnimalMouse, 0);
        return;
    }
    const orig = window.mousePressed;
    window.mousePressed = function () {
        if (typeof gameState !== 'undefined' && gameState === STATE.PLAYING) {
            const animal = animalAtFacing();
            if (animal && typeof triggerBackflip === 'function') {
                const TS = CONFIG.TILE_SIZE;
                triggerBackflip(animal, (animal.gridX + 0.5) * TS, (animal.gridY + 0.5) * TS);
            }
            if (animal && animal.type === 'bird') {
                if (animal.feed()) return;
            } else if (animal && animal.type === 'crab') {
                if (animal.compliment()) return;
            }
        }
        return orig.apply(this, arguments);
    };
})();

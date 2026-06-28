// ===== WILD HOG =====
// A single, named wild hog who lives on the island. Not a neighbor, but interactive.
// He will eat any gift. Likes = friendship. Dislikes = leaves a poop tile for a day.

let hog = null;            // { name, gridX, gridY, friendship, dailyFed }
let hogPoopTiles = [];     // { x, y, createdDay }
let hogNaming = false;     // true when waiting for player to type a name

const HOG_POOP_LIFETIME_DAYS = 1;

class Hog {
    constructor(x, y) {
        this.name = 'Hog';
        this.gridX = x;
        this.gridY = y;
        this.friendship = 0;
        this.dailyFed = false;
        this.moveTimer = 0;
        this.frameTimer = 0;
        this.named = false;
    }

    update(dt, gameMinutes) {
        this.frameTimer += dt;
        this.moveTimer += dt;
        // Waddle around slowly every ~2-4 seconds
        if (this.moveTimer < 2000 + Math.random() * 2000) return;
        this.moveTimer = 0;
        const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
        const d = dirs[Math.floor(Math.random() * dirs.length)];
        const nx = this.gridX + d[0];
        const ny = this.gridY + d[1];
        if (nx >= 0 && nx < CONFIG.WORLD_WIDTH && ny >= 0 && ny < CONFIG.WORLD_HEIGHT) {
            const t = world.tiles[nx][ny];
            if (t && t.type === 'grass' && !isSolidTile(nx, ny) && !buildingAt(nx, ny) && !npcAt(nx, ny)) {
                this.gridX = nx;
                this.gridY = ny;
            }
        }
    }

    draw() {
        const sx = this.gridX * CONFIG.TILE_SIZE - cameraX;
        const sy = this.gridY * CONFIG.TILE_SIZE - cameraY;
        const spr = SPRITES['sprites.hog'];
        const wobble = Math.sin(this.frameTimer * 0.005) * 1;
        if (spr) {
            image(spr, sx, sy - CONFIG.TILE_SIZE + wobble, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE * 2);
        } else {
            fill('#8B5A2B');
            noStroke();
            ellipse(sx + 8, sy + 8, 12, 16);
        }
        // Name tag only if named
        if (this.named) {
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

    feed(itemId) {
        if (!itemId || !ITEMS[itemId]) return false;
        const item = ITEMS[itemId];
        // First meeting: name him
        if (!this.named) {
            promptHogName();
            return false; // gift consumed after naming? Let's not consume until named.
        }
        if (this.dailyFed) {
            notify(this.name + ' is full for today.');
            return false;
        }
        this.dailyFed = true;
        // Reaction: liked if category food/gift, disliked if material/tool/treasure (mostly)
        const liked = (item.category === 'food' || item.category === 'gift' || Math.random() < 0.4);
        if (liked) {
            const gain = item.category === 'food' ? 2 : 1;
            this.friendship = Math.min(10, this.friendship + gain);
            notify(this.name + ' gobbled the ' + item.name + ' happily! Friendship +' + gain);
            if (audioManager) audioManager.playSFX('oink', 0.8);
        } else {
            notify(this.name + ' sniffs the ' + item.name + ', grunts, and poops on the ground.');
            hogPoopTiles.push({ x: this.gridX, y: this.gridY, createdDay: world.day });
            if (audioManager) audioManager.playSFX('oink', 0.5);
        }
        return true;
    }

    serialize() {
        return {
            name: this.name,
            gridX: this.gridX,
            gridY: this.gridY,
            friendship: this.friendship,
            dailyFed: this.dailyFed,
            named: this.named
        };
    }

    static deserialize(data) {
        const h = new Hog(data.gridX, data.gridY);
        h.name = data.name || 'Hog';
        h.friendship = data.friendship || 0;
        h.dailyFed = data.dailyFed || false;
        h.named = data.named || false;
        return h;
    }
}

function promptHogName() {
    hogNaming = true;
    gameState = STATE.DIALOGUE;
    // Build a temporary dialogue-like state so the loop doesn't continue running the world
    if (typeof dialogueState !== 'undefined') {
        dialogueState.active = false;
    }
    // Use a native prompt for now; can be replaced with custom UI later
    const entered = window.prompt('This wild hog seems friendly. What will you name him?');
    if (entered && entered.trim()) {
        hog.name = entered.trim().substring(0, 12);
        hog.named = true;
        notify('You named the wild hog ' + hog.name + '!');
    }
    hogNaming = false;
    gameState = STATE.PLAYING;
}

function spawnHog() {
    if (hog) return;
    // Find a grass tile away from water
    let attempts = 0;
    while (attempts < 200) {
        const x = 20 + Math.floor(Math.random() * 60);
        const y = 20 + Math.floor(Math.random() * 60);
        const t = world.tiles[x][y];
        if (t && t.type === 'grass' && !isSolidTile(x, y) && !buildingAt(x, y)) {
            hog = new Hog(x, y);
            notify('A wild hog is rooting around the island.');
            return;
        }
        attempts++;
    }
    // Fallback
    hog = new Hog(50, 50);
    notify('A wild hog is rooting around the island.');
}

function drawHogPoop() {
    for (const p of hogPoopTiles) {
        const sx = p.x * CONFIG.TILE_SIZE - cameraX;
        const sy = p.y * CONFIG.TILE_SIZE - cameraY;
        const spr = SPRITES['tiles.poop'];
        if (spr) {
            image(spr, sx, sy, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
        } else {
            fill('#5D4037');
            noStroke();
            ellipse(sx + 8, sy + 12, 6, 4);
        }
    }
}

function updateHogPoop() {
    if (!world) return;
    hogPoopTiles = hogPoopTiles.filter(p => (world.day - p.createdDay) < HOG_POOP_LIFETIME_DAYS);
}

function hogAt(x, y) {
    return hog && hog.gridX === x && hog.gridY === y;
}

function hogAtFacing() {
    const facing = player.getFacingTile();
    if (!facing) return null;
    return hogAt(facing.x, facing.y) ? hog : null;
}

function onHogNewDay() {
    if (hog) hog.dailyFed = false;
    updateHogPoop();
}

function updateHog(dt) {
    if (hog) hog.update(dt);
}

function drawHog() {
    if (hog) {
        hog.draw();
        drawHogPoop();
    }
}

// Helper used by dialogue system to detect stink near an NPC
function isNearPoop(x, y, radius = 3) {
    return hogPoopTiles.some(p => Math.abs(p.x - x) + Math.abs(p.y - y) <= radius);
}

// Wrap key/mouse handling for hog gifts
(function wrapHogKeys() {
    if (typeof window._cozyHogKeysWrapped !== 'undefined') return;
    window._cozyHogKeysWrapped = true;

    function tryHogGift(e) {
        if (typeof gameState !== 'undefined' && gameState !== STATE.PLAYING) return false;
        if (hogNaming) return false;
        const facingHog = hogAtFacing();
        if (!facingHog) return false;
        const active = inventory.getActiveItem();
        if (!active) {
            notify('You need an item in hand to give the hog.');
            return true;
        }
        inventory.removeItem(active.id, 1);
        facingHog.feed(active.id);
        return true;
    }

    if (typeof window.keyPressed === 'function') {
        const origKey = window.keyPressed;
        window.keyPressed = function () {
            if ((keyCode === ENTER || keyCode === RETURN) && tryHogGift()) return false;
            return origKey.apply(this, arguments);
        };
    }

    if (typeof window.mousePressed === 'function') {
        const origMouse = window.mousePressed;
        window.mousePressed = function () {
            if (tryHogGift()) return false;
            return origMouse.apply(this, arguments);
        };
    }
})();

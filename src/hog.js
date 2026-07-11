// ===== WILD HOG =====
// A single, named wild hog who lives on the island. Not a neighbor, but interactive.
// He has logical food preferences (organic = yum, rocks/wood = no), a daily routine,
// friendship tiers, holiday moods, and leaves world-state surprises behind.

let hog = null;            // Hog instance
let hogPoopTiles = [];     // { x, y, createdDay }
let hogNaming = false;     // true when waiting for player to type a name
let hogEmotes = [];        // floating emotes { x, y, text, timer, life }

const HOG_POOP_LIFETIME_DAYS = 1;

// Hoggy's biological preferences. Anything else falls back to category logic.
const HOG_FAVORITES = new Set([
    'berry', 'banana', 'grilled_banana', 'fruit_salad', 'berry_jam',
    'rose', 'tulip', 'bean', 'turtle_egg', 'seashell', 'protein_shake'
]);
const HOG_DISLIKES = new Set([
    'log', 'stick', 'pinecone', 'stone', 'magnet', 'crystal', 'fiber',
    'bird_poop', 'thatch', 'palm_frond', 'feather', 'cicada_shell',
    'gettin_stick', 'axe', 'hoe', 'pickaxe', 'stale_toast', 'gold_coin',
    'iron_ingot', 'metal_rod', 'old_radio', 'glass_bottle', 'iou', 'stardew'
]);

// Daily routine time ranges (game hour)
const HOG_ROUTINE = {
    morning: { start: 6,  end: 12, label: 'rooting',  radius: 5 },
    day:     { start: 12, end: 18, label: 'beach',    radius: 4 },
    evening: { start: 18, end: 24, label: 'pond',     radius: 4 }
};

class Hog {
    constructor(x, y) {
        this.name = 'Hog';
        this.gridX = x;
        this.gridY = y;
        this.friendship = 0;
        this.dailyFed = false;
        this.dailyRooted = false;   // once-per-day rooting dig near trees
        this.birthdayGiftGiven = false; // Hoggy's Birthday: community gift already triggered today
        this.moveTimer = 0;
        this.frameTimer = 0;
        this.named = false;
        this.facing = 'right';
        this.pendingGift = null;    // item id held while naming prompt is open
        this.homeX = x;
        this.homeY = y;
    }

    getTier() {
        if (this.friendship >= 9) return 4;
        if (this.friendship >= 6) return 3;
        if (this.friendship >= 3) return 2;
        return 1;
    }

    isLiked(itemId, item) {
        if (HOG_FAVORITES.has(itemId)) return true;
        if (HOG_DISLIKES.has(itemId)) return false;
        // Fallback by category: organic/gift/food = liked, material/tool/treasure/block = disliked
        return item.category === 'food' || item.category === 'gift';
    }

    currentRoutine() {
        const hour = (world && world.timeMinutes / 60) || 8;
        if (hour >= HOG_ROUTINE.morning.start && hour < HOG_ROUTINE.morning.end) return 'morning';
        if (hour >= HOG_ROUTINE.day.start && hour < HOG_ROUTINE.day.end) return 'day';
        return 'evening';
    }

    routineAnchor() {
        const r = this.currentRoutine();
        if (r === 'morning') {
            // Root near the closest tree trunk
            const t = findNearestTree(this.gridX, this.gridY, 25);
            return t || { x: this.homeX, y: this.homeY };
        }
        if (r === 'day') {
            // Sit on the nearest beach
            const b = findNearestBeach(this.gridX, this.gridY, 40);
            return b || { x: this.homeX, y: this.homeY };
        }
        // Evening: walk around the pond
        const pond = (typeof ISLAND_POND_ORIGIN !== 'undefined') ? ISLAND_POND_ORIGIN : { x: 47, y: 39 };
        return pond;
    }

    update(dt) {
        this.frameTimer += dt;
        this.moveTimer += dt;

        const hour = (world && world.timeMinutes / 60) || 8;
        const routine = this.currentRoutine();
        const anchor = this.routineAnchor();
        const targetRadius = HOG_ROUTINE[routine].radius;

        // Movement cadence: slower when just sitting on the beach, peppier when rooting
        let moveDelay = (routine === 'day') ? 3500 + Math.random() * 2500 : 2200 + Math.random() * 2000;

        // Friendship tier 4 greets you at your shack entrance each morning
        if (this.getTier() === 4 && routine === 'morning' && typeof getPlayerShack === 'function') {
            const shack = getPlayerShack();
            if (shack) {
                const entrance = findExteriorStandingTile(shack);
                anchor.x = entrance.x;
                anchor.y = entrance.y;
                moveDelay = 1500; // eager
            }
        }

        if (this.moveTimer < moveDelay) return;
        this.moveTimer = 0;

        const distToAnchor = Math.abs(this.gridX - anchor.x) + Math.abs(this.gridY - anchor.y);
        let candidates = [];

        if (distToAnchor > targetRadius) {
            // Drift back toward anchor
            const dx = Math.sign(anchor.x - this.gridX);
            const dy = Math.sign(anchor.y - this.gridY);
            candidates = [[dx, 0], [0, dy], [dx, dy]].filter(d => d[0] || d[1]);
        } else {
            // Wander within routine zone
            candidates = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        }

        // Shuffle candidates
        for (let i = candidates.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }

        for (const d of candidates) {
            const nx = this.gridX + d[0];
            const ny = this.gridY + d[1];
            if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) continue;
            const t = world.tiles[nx][ny];
            if (!t) continue;
            if (isSolidTile(nx, ny)) continue;
            if (buildingAt(nx, ny)) continue;
            if (npcAt(nx, ny)) continue;
            if (typeof animalAt === 'function' && animalAt(nx, ny)) continue;
            // Don't wander into pond water
            if (t.type === 'pond' || t.type === 'water' || t.type === 'sea') continue;
            // Beaches in the day are fine; otherwise prefer grass
            if (routine !== 'day' && t.type === 'beach') continue;
            if (d[0] > 0) this.facing = 'right';
            else if (d[0] < 0) this.facing = 'left';
            this.gridX = nx;
            this.gridY = ny;
            return;
        }
    }

    draw() {
        const sx = this.gridX * CONFIG.TILE_SIZE - cameraX;
        const sy = this.gridY * CONFIG.TILE_SIZE - cameraY;
        const TS = CONFIG.TILE_SIZE;
        const spr = SPRITES['sprites.hog'];

        // Sitting pose on the beach in the afternoon
        const routine = this.currentRoutine();
        const sitting = (routine === 'day');

        if (spr) {
            const frame = sitting ? 0 : (Math.floor(this.frameTimer / 650) % 2);
            const fw = 32, fh = 32;
            const w = TS * 1.5, h = TS * 1.5;
            const dx = sx + (TS - w) / 2, dy = sy + TS - h;
            push();
            translate(dx + w / 2, dy + h / 2);
            scale(this.facing === 'right' ? -1 : 1, 1);
            image(spr, -w / 2, -h / 2, w, h, frame * fw, 0, fw, fh);
            pop();
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

        // First meeting: name him, then process the gift after naming
        if (!this.named) {
            this.pendingGift = itemId;
            promptHogName();
            return false;
        }

        if (this.dailyFed) {
            notify(this.name + ' is full for today.');
            spawnHogEmote(this.gridX, this.gridY, 'zzz');
            return false;
        }

        this.dailyFed = true;
        const liked = this.isLiked(itemId, item);

        if (liked) {
            const isFav = HOG_FAVORITES.has(itemId);
            const gain = isFav ? 3 : (item.category === 'food' ? 2 : 1);
            this.friendship = Math.min(10, this.friendship + gain);
            const reactions = [
                'gobbled it happily', 'munched with delight', 'snorfled it down',
                'ate it in one bite', 'made happy little grunts'
            ];
            const verb = reactions[Math.floor(Math.random() * reactions.length)];
            notify(this.name + ' ' + verb + '! Friendship +' + gain);
            spawnHogEmote(this.gridX, this.gridY, isFav ? 'heart' : 'yum');
            if (audioManager) audioManager.playSFX('oink', 0.8);
        } else {
            notify(this.name + ' sniffs the ' + item.name + ', grunts, and poops on the ground.');
            hogPoopTiles.push({ x: this.gridX, y: this.gridY, createdDay: world.day });
            spawnHogEmote(this.gridX, this.gridY, 'stink');
            if (audioManager) audioManager.playSFX('oink', 0.5);
        }

        if (!this.birthdayGiftGiven) {
            const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
            if (holiday && holiday.name === "Hoggy's Birthday") triggerHoggyBirthdayGift();
        }
        return true;
    }

    finishNaming() {
        if (this.pendingGift) {
            const gift = this.pendingGift;
            this.pendingGift = null;
            this.feed(gift);
        }
    }

    // Once per day, interact without an item to have him root up a surprise
    root() {
        if (!this.named) {
            notify('The wild hog seems friendly. Maybe bring him a gift first?');
            return false;
        }
        if (this.dailyRooted) {
            notify(this.name + ' has already rooted up something today.');
            return false;
        }
        if (this.currentRoutine() !== 'morning') {
            notify(this.name + ' is more interested in rooting around trees in the morning.');
            return false;
        }
        const nearTree = findNearestTree(this.gridX, this.gridY, 2);
        if (!nearTree) {
            notify(this.name + ' needs to be near a tree to root effectively.');
            return false;
        }
        this.dailyRooted = true;

        const lootTable = [
            { id: 'seed', chance: 0.35 },
            { id: 'berry', chance: 0.20 },
            { id: 'stick', chance: 0.15 },
            { id: 'pinecone', chance: 0.15 },
            { id: 'mushroom', chance: 0.10 },
            { id: 'truffle', chance: 0.05 }
        ];
        const roll = Math.random();
        let acc = 0;
        let foundId = null;
        for (const entry of lootTable) {
            acc += entry.chance;
            if (roll <= acc) { foundId = entry.id; break; }
        }
        if (!foundId) foundId = 'seed';

        // Register dynamic items if missing
        ensureHogItems();
        if (ITEMS[foundId]) {
            inventory.addItem(foundId, 1);
            notify(this.name + ' rooted up a ' + ITEMS[foundId].name + '!');
        }
        spawnHogEmote(this.gridX, this.gridY, 'dig');
        if (audioManager) audioManager.playSFX('oink', 0.7);
        return true;
    }

    serialize() {
        return {
            name: this.name,
            gridX: this.gridX,
            gridY: this.gridY,
            friendship: this.friendship,
            dailyFed: this.dailyFed,
            dailyRooted: this.dailyRooted,
            birthdayGiftGiven: this.birthdayGiftGiven,
            named: this.named,
            facing: this.facing,
            homeX: this.homeX,
            homeY: this.homeY
        };
    }

    static deserialize(data) {
        const h = new Hog(data.gridX, data.gridY);
        h.name = data.name || 'Hog';
        h.friendship = data.friendship || 0;
        h.dailyFed = data.dailyFed || false;
        h.dailyRooted = data.dailyRooted || false;
        h.birthdayGiftGiven = data.birthdayGiftGiven || false;
        h.named = data.named || false;
        h.facing = data.facing || 'right';
        h.homeX = data.homeX || data.gridX;
        h.homeY = data.homeY || data.gridY;
        return h;
    }
}

function promptHogName() {
    hogNaming = true;
    gameState = STATE.DIALOGUE;
    if (typeof dialogueState !== 'undefined') {
        dialogueState.active = false;
    }
    const entered = window.prompt('This wild hog seems friendly. What will you name him?');
    if (entered && entered.trim()) {
        hog.name = entered.trim().substring(0, 12);
        hog.named = true;
        notify('You named the wild hog ' + hog.name + '!');
    }
    hogNaming = false;
    gameState = STATE.PLAYING;
    if (hog) hog.finishNaming();
}

function spawnHog() {
    if (hog) return;
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
    if (hog) {
        hog.dailyFed = false;
        hog.dailyRooted = false;
        hog.birthdayGiftGiven = false;
    }
    updateHogPoop();
}

function updateHog(dt) {
    if (hog) hog.update(dt);
    updateHogEmotes(dt);
    updateHoggyBirthdayBlanket();
}

function drawHog() {
    drawHoggyBirthdayBlanket();
    if (hog) {
        hog.draw();
        drawHogEmotes();
        drawHogPoop();
    }
}

function isNearPoop(x, y, radius = 3) {
    return hogPoopTiles.some(p => Math.abs(p.x - x) + Math.abs(p.y - y) <= radius);
}

// ===== ROUTINE HELPERS =====
function findNearestTree(x, y, maxDist) {
    if (!world) return null;
    for (let d = 0; d <= maxDist; d++) {
        for (let dx = -d; dx <= d; dx++) {
            for (let dy = -d; dy <= d; dy++) {
                if (Math.abs(dx) + Math.abs(dy) !== d) continue;
                const tx = x + dx, ty = y + dy;
                if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
                const t = world.tiles[tx][ty];
                if (t && (t.type === 'tree' || t.type === 'palm_tree' || t.type === 'banana_tree') && !t.isTreeTop) {
                    return { x: tx, y: ty };
                }
            }
        }
    }
    return null;
}

function findNearestBeach(x, y, maxDist) {
    if (!world) return null;
    for (let d = 0; d <= maxDist; d++) {
        for (let dx = -d; dx <= d; dx++) {
            for (let dy = -d; dy <= d; dy++) {
                if (Math.abs(dx) + Math.abs(dy) !== d) continue;
                const tx = x + dx, ty = y + dy;
                if (tx < 0 || tx >= CONFIG.WORLD_WIDTH || ty < 0 || ty >= CONFIG.WORLD_HEIGHT) continue;
                const t = world.tiles[tx][ty];
                if (t && t.type === 'beach') return { x: tx, y: ty };
            }
        }
    }
    return null;
}

// ===== EMOTES =====
function spawnHogEmote(x, y, kind) {
    const icon = {
        heart: 'heart', yum: 'yum', zzz: 'zzz', stink: 'stink', dig: 'dig'
    }[kind] || kind;
    hogEmotes.push({
        x: x * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE / 2,
        y: y * CONFIG.TILE_SIZE - CONFIG.TILE_SIZE,
        text: icon,
        timer: 0,
        life: 1200
    });
}

function updateHogEmotes(dt) {
    for (const e of hogEmotes) e.timer += dt;
    hogEmotes = hogEmotes.filter(e => e.timer < e.life);
}

function drawHogEmotes() {
    push();
    textAlign(CENTER, CENTER);
    textSize(10);
    noStroke();
    for (const e of hogEmotes) {
        const t = e.timer / e.life;
        const sx = e.x - cameraX;
        const sy = e.y - cameraY - t * 16;
        fill(0, 0, 0, 150 * (1 - t));
        rect(sx - 8, sy - 8, 16, 14, 3);
        fill(255, 255, 255, 255 * (1 - t));
        text(e.text, sx, sy + 1);
    }
    pop();
}

// ===== DYNAMIC ITEMS =====
function ensureHogItems() {
    if (!ITEMS.mushroom) {
        ITEMS.mushroom = { name: 'Mushroom', category: 'gift', maxStack: 20, color: '#D7CCC8', desc: 'A soft mushroom Hoggy rooted up near a tree.' };
    }
    if (!ITEMS.truffle) {
        ITEMS.truffle = { name: 'Truffle', category: 'gift', maxStack: 10, color: '#5D4037', desc: 'A rare, earthy treasure Hoggy unearthed.' };
    }
}

// ===== HOLIDAY PARTICIPATION =====
function getHogHolidayMood() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday) return null;
    const name = holiday.name;
    if (name === 'Garden Day') return { emote: 'dig', note: hog.name + ' is extra enthusiastic about dirt today.' };
    if (name === 'Backflip Day') return { emote: 'flip', note: hog.name + ' wiggles like he is about to backflip.' };
    if (name === 'Toast Toss Tournament') return { emote: 'toast', note: hog.name + ' eyes the stale toast with surprising interest.' };
    if (name === 'Ab Appreciation Day') return { emote: 'flex', note: hog.name + ' strikes a tiny flexing pose.' };
    if (name === 'Compliment a Crab Day') return { emote: 'nice', note: hog.name + ' oinks politely in the direction of any crabs.' };
    if (name === 'Snake Run Day') return { emote: 'snake', note: hog.name + ' snorts at the snakes racing past.' };
    if (name === 'Day of the Island God') return { emote: 'awe', note: hog.name + ' stares east, utterly starstruck.' };
    if (name === "Hoggy's Birthday") return { emote: 'heart', note: 'It is ' + hog.name + "'s Birthday! He sits proudly by his picnic blanket, waiting for gifts." };
    if (name === 'Turtle Crossing Guard Day') return { emote: 'guard', note: hog.name + ' stands watch by the crossing, chest puffed out importantly.' };
    if (name === 'The Returning Bird') return { emote: 'sky', note: hog.name + ' cranes his neck skyward, watching for the bird.' };
    if (name === 'Lost Mail Day') return { emote: 'letter', note: hog.name + ' noses at a sealed letter, hoping it is for him.' };
    if (name === 'Well-Wishing Garden') return { emote: 'flower', note: hog.name + ' sniffs at the gardener\'s cart, hoping for a flower of his own.' };
    if (name === 'The Petal Path Maker') return { emote: 'path', note: hog.name + ' trots along the petal path, leaving little hoofprints.' };
    if (name === 'Memory Lantern Night') return { emote: 'glow', note: hog.name + ' watches the lanterns come alive on the shore, transfixed.' };
    if (name === 'The Picnic Reset') return { emote: 'picnic', note: hog.name + ' flops down at the end of the picnic line, hoping for scraps.' };
    return null;
}

// Hoggy's Birthday: the first gift of the day (liked or not) is treated as
// the community's gift too — every neighbor's friendship gets a boost.
function triggerHoggyBirthdayGift() {
    hog.birthdayGiftGiven = true;
    if (typeof npcs === 'undefined' || !npcs.length) return;
    for (const npc of npcs) {
        if (typeof npc.gainGift === 'function') npc.gainGift(5);
    }
    notify('Word spreads fast — every neighbor pitches in a little something for ' + hog.name + "'s Birthday! Friendship +5 with everyone.", 4500);
}

// ===== HOGGY'S BIRTHDAY: PICNIC BLANKET (static decoration, no new assets) =====
let hoggyBirthdayBlanket = null; // { gridX, gridY }

function updateHoggyBirthdayBlanket() {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday || holiday.name !== "Hoggy's Birthday" || !hog) {
        hoggyBirthdayBlanket = null;
        return;
    }
    if (!hoggyBirthdayBlanket) {
        hoggyBirthdayBlanket = { gridX: hog.gridX, gridY: hog.gridY + 1 };
    }
}

function drawHoggyBirthdayBlanket() {
    if (!hoggyBirthdayBlanket) return;
    const TS = CONFIG.TILE_SIZE;
    const sx = hoggyBirthdayBlanket.gridX * TS - cameraX;
    const sy = hoggyBirthdayBlanket.gridY * TS - cameraY;
    noStroke();
    fill('#D32F2F');
    rect(sx, sy, TS, TS, 3);
    fill('#FFF176');
    const half = TS / 2;
    rect(sx, sy, half, half);
    rect(sx + half, sy + half, half, half);
}

// Holiday mood hook: called when the player faces the hog on a holiday
function tryHogHolidayGreeting() {
    const mood = getHogHolidayMood();
    if (mood) {
        notify(mood.note);
        spawnHogEmote(hog.gridX, hog.gridY, mood.emote);
    }
}

// ===== INPUT WRAPPING =====
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
            // No item: try to root (morning near trees only)
            if (hog && hog.root()) return true;
            notify('You need an item in hand to give ' + (hog && hog.name ? hog.name : 'the hog') + '.');
            return true;
        }
        inventory.removeItem(active.id, 1);
        facingHog.feed(active.id);
        return true;
    }

    if (typeof window.keyPressed === 'function') {
        const origKey = window.keyPressed;
        window.keyPressed = function () {
            if ((keyCode === ENTER || keyCode === RETURN) && tryHogGift()) {
                if (hog && getHogHolidayMood()) tryHogHolidayGreeting();
                return false;
            }
            return origKey.apply(this, arguments);
        };
    }

    if (typeof window.mousePressed === 'function') {
        const origMouse = window.mousePressed;
        window.mousePressed = function () {
            if (tryHogGift()) {
                if (hog && getHogHolidayMood()) tryHogHolidayGreeting();
                return false;
            }
            return origMouse.apply(this, arguments);
        };
    }
})();

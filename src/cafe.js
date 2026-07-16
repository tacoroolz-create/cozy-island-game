// ===== STIMMY TIM'S (IOU economy, phase 2) =====
// The underground coffee-and-donut cafe (see underWorldBldgs.rtf). Unlike the
// fortress and Recycle Bin, this is a real walkable interior: checkerboard
// floor, a counter along the back with the espresso machine and donut case,
// and two bistro tables. Facing the counter and interacting opens the shop.
// Coffee and donuts are gift items (like the Protein Shake) — an eat/drink
// mechanic can hook in later.

ITEMS.coffee = { name: 'Coffee', category: 'gift', maxStack: 20, color: '#6F4E37',
    desc: "A hot cup of Stimmy Tim's house blend. Warm, bitter, encouraging." };
ITEMS.donut  = { name: 'Donut', category: 'gift', maxStack: 20, color: '#E491A9',
    desc: 'A pink-frosted donut with sprinkles. The underground runs on these.' };

const CAFE_MENU = [
    { id: 'coffee', price: 3 },
    { id: 'donut',  price: 2 }
];

// --- Interior layout ---
// Called from Building.initInterior for ug_stimmy_tims (8 wide, 2 wall rows +
// 5 floor rows). Door is at (4,6).
function furnishStimmyCafe(b) {
    // Checkerboard cafe floor everywhere below the walls (variant = parity).
    for (let x = 0; x < b.interiorW; x++) {
        for (let y = INTERIOR_WALL_HEIGHT; y < b.interiorH; y++) {
            b.interiorTiles[x][y] = { type: 'cafe_floor', variant: (x + y) % 2 };
        }
    }
    // Wall decor: shelf, windows, and the framed single-origin poster.
    b.interiorTiles[1][1].deco = 'wall_shelf';
    b.interiorTiles[2][1].deco = 'window';
    b.interiorTiles[4][1].deco = 'framed_painting';
    b.interiorTiles[6][1].deco = 'window';
    // The counter along the back: register, espresso machine, donut case.
    const COUNTER = ['plain', 'register', 'espresso', 'donuts'];
    for (let x = 0; x < COUNTER.length; x++) {
        b.interiorTiles[x][INTERIOR_WALL_HEIGHT] = { type: 'cafe_counter', variant: COUNTER[x] };
    }
    // A leafy corner fern, obviously in a hand-thrown pot.
    b.interiorTiles[7][INTERIOR_WALL_HEIGHT] = { type: 'cafe_plant', variant: 0 };
    // Two bistro sets: round table with a stool on each side.
    for (const tx of [2, 6]) {
        b.interiorTiles[tx][4] = { type: 'cafe_table', variant: 0 };
        b.interiorTiles[tx - 1][4] = { type: 'cafe_stool', variant: 0 };
        b.interiorTiles[tx + 1][4] = { type: 'cafe_stool', variant: 0 };
    }
}

// Solid cafe furniture (stools are walkable so you can stand at a table).
function isSolidCafeTile(tile) {
    return tile && (tile.type === 'cafe_counter' || tile.type === 'cafe_table' ||
                    tile.type === 'cafe_plant');
}

// --- Drawing (called from drawInteriorTile for cafe_* types) ---
function drawCafeTile(tile, sx, sy, TS) {
    noStroke();
    if (tile.type === 'cafe_floor') {
        // Checkerboard: warm cream and latte brown (variant = parity).
        fill(tile.variant === 1 ? '#C9A87C' : '#EBDFC4');
        rect(sx, sy, TS, TS);
        return;
    }
    // Furniture tiles sit on a neutral light floor square.
    fill('#EBDFC4');
    rect(sx, sy, TS, TS);

    if (tile.type === 'cafe_counter') {
        // Counter body + worn butcher-block top.
        fill('#7B5233');
        rect(sx, sy + 4, TS, TS - 4);
        fill('#A9825A');
        rect(sx, sy + 3, TS, 4);
        if (tile.variant === 'espresso') {
            // The chrome espresso machine, pride of the shop.
            fill('#8A9BA8'); rect(sx + 3, sy - 4, 10, 8);
            fill('#5F6E78'); rect(sx + 4, sy + 2, 3, 3);   // portafilter
            fill('#FFFFFF'); rect(sx + 11, sy - 6, 1, 3);  // steam
        } else if (tile.variant === 'donuts') {
            // Glass display case of pink donuts.
            fill(210, 230, 240, 160); rect(sx + 2, sy - 4, 12, 8);
            fill('#E491A9'); ellipse(sx + 6, sy, 5, 5); ellipse(sx + 11, sy, 5, 5);
            fill('#EBDFC4'); ellipse(sx + 6, sy, 2, 2); ellipse(sx + 11, sy, 2, 2);
        } else if (tile.variant === 'register') {
            fill('#4E4238'); rect(sx + 4, sy - 3, 8, 7);
            fill('#B8E0B0'); rect(sx + 5, sy - 2, 6, 2);   // little green display
        }
    } else if (tile.type === 'cafe_table') {
        // Round bistro table.
        fill(60, 40, 25, 60); ellipse(sx + TS / 2, sy + TS / 2 + 2, TS - 3, TS - 5);
        fill('#7B4B28'); ellipse(sx + TS / 2, sy + TS / 2, TS - 3, TS - 5);
        fill('#95603A'); ellipse(sx + TS / 2, sy + TS / 2 - 1, TS - 7, TS - 9);
        // A tiny cup waiting on top.
        fill('#EBDFC4'); ellipse(sx + TS / 2 + 2, sy + TS / 2 - 1, 4, 3);
    } else if (tile.type === 'cafe_stool') {
        fill(60, 40, 25, 60); ellipse(sx + TS / 2, sy + TS / 2 + 2, 9, 7);
        fill('#A9825A'); ellipse(sx + TS / 2, sy + TS / 2, 9, 7);
    } else if (tile.type === 'cafe_plant') {
        fill('#B0603C'); rect(sx + 5, sy + 8, 6, 6);        // terracotta pot
        fill('#3E7C4F'); ellipse(sx + TS / 2, sy + 5, 11, 9);
        fill('#57975F'); ellipse(sx + TS / 2 - 2, sy + 3, 5, 5);
        fill('#57975F'); ellipse(sx + TS / 2 + 3, sy + 4, 4, 4);
    }
}

// ===== STAN (Stimmy Tim's counter clerk — see NPCConvoUnderworld1.txt) =====
const STAN_NPC = { name: 'Stan', color: '#6F4E37' };
const STAN_TREE = {
    start: { text: "HEY! HI! HELLO! Welcome to Stimmy Tims, my name is Stan, I am your friend and also your caffeine enthusiast, what can I get you today, we have hot coffee, cold coffee, medium coffee, coffee with a donut on top, and a donut with coffee inside it!",
        choices: [
            { text: "Slow down, Stan. One coffee, please.", next: 'oneCoffee' },
            { text: "What do you recommend?", next: 'recommend' },
            { text: "You seem very... awake.", next: 'awake' }
        ] },
    oneCoffee: { text: "One coffee! Got it! One coffee coming right up! Hot or cold or lukewarm or mysterious? Mysterious is whatever's left in the bottom of the pot, and honestly? It's got a following.",
        choices: [
            { text: "Hot. Regular. No surprises.", next: 'hotRegular' },
            { text: "I'll try the mysterious one.", next: 'mysterious' },
            { text: "Do you have a favorite?", next: 'favorite' }
        ] },
    recommend: { text: "Recommend? I recommend EVERYTHING! But if you want the real inside scoop, the little know-it-alls around here each got their own perfect pairing. Robots like the bolt-brew, ghosts go ghostly vanilla, animals love the nutty crunch blend, and monsters? They pretend they don't want whipped cream, but they do.",
        choices: [
            { text: "Tell me more about the secret menu.", next: 'secretMenu' },
            { text: "I'll have the ghostly vanilla.", next: 'ghostlyVanilla' },
            { text: "Which one's for me?", next: 'whichOne' }
        ] },
    awake: { text: "Awake? I am awake like a lighthouse in a lightning storm! I am customer service incarnate! I greet the sunrise with a mug in each hand and a list of names I want to remember! You, Dreamer, are at the top of that list!",
        choices: [
            { text: "That's dedication.", next: 'dedication' },
            { text: "Do you ever sleep?", next: 'sleep' },
            { text: "I want to be a regular here.", next: 'regular' }
        ] },
    hotRegular: { text: "Hot regular no surprises! I respect that. Solid. Reliable. The kind of order a person makes when they got things to do and places to be. I'll put a little extra warmth in it on the house.",
        choices: [{ text: "Thanks, Stan.", action: () => openStimmyShop() }] },
    mysterious: { text: "Mysterious! Bold choice! It might be dark roast, it might be yesterday's special, it might taste like ambition. Whatever it is, it'll keep your eyelids at full attention. Enjoy the adventure!",
        choices: [{ text: "Here goes nothing.", action: () => openStimmyShop() }] },
    favorite: { text: "My favorite? The sunrise sipper. It tastes like the first orange slice of morning and the last yawn of night. I drink one every day at dawn and then I organize the sprinkles by color. Best hour of my life.",
        choices: [{ text: "Sounds lovely. Let's order.", action: () => openStimmyShop() }] },
    secretMenu: { text: "Secret menu? Oh, you heard right! Once we're good friends, I'll show you the whole list — every neighbor species got their own donut and coffee combo written down special. It makes folks feel seen, and feeling seen is basically my whole job description.",
        choices: [{ text: "Can't wait. For now, the usual.", action: () => openStimmyShop() }] },
    ghostlyVanilla: { text: "Ghostly vanilla! One cup of cloud-white comfort coming up! It tastes like a soft apology and a warm blanket. I don't even know how we make it, but the ghosts keep comin' back, so something's workin'.",
        choices: [{ text: "Perfect.", action: () => openStimmyShop() }] },
    whichOne: { text: "For you? Hmm. Dreamer, you strike me as a midday-miracle person. Not too hot, not too cold, a little sweet, a little bold, with a sprinkle of 'what just happened?' on top. I'll make it custom.",
        choices: [{ text: "I'll trust you on this one.", action: () => openStimmyShop() }] },
    dedication: { text: "Dedication? It's not dedication, it's JOY! Serving people good things and seein' their eyes light up? That's better than any nap. Naps are great, but this? This is magic in a paper cup.",
        choices: [{ text: "Can't argue with that.", action: () => openStimmyShop() }] },
    sleep: { text: "Sleep? Sure, eventually. Around 10 PM I go back down to the underworld, recharge my social battery, and then I'm up again before the rooster even thinks about it. Come find me after business hours someday — I wander the island just to say hi to the trees.",
        choices: [{ text: "I'll look for you.", action: () => openStimmyShop() }] },
    regular: { text: "A regular? Dreamer, you're already family. Come back every day, every hour, every minute if you want. I'll remember your order before you even say it. That's a Stan promise, and Stan promises are legally binding in my heart.",
        choices: [{ text: "Deal. Let's order.", action: () => openStimmyShop() }] }
};
STAN_NPC._dialogueTree = STAN_TREE;

let stanGreeted = false; // ponytail: session-only; skip the full chat after the first visit
const STAN_LINES = ["HEY! Welcome back! Coffee's fresh, or at least recently made!", "Oh hey, it's you again! Best part of my day!", "Back for more?! I remembered you! Mostly!", "Coffee o'clock again? Let's gooo!"];

// Entry point for the counter — Stan's chat the first visit, a quick line
// and straight to the menu after that.
function openStanDialogue() {
    if (stanGreeted) {
        notify('Stan: "' + STAN_LINES[Math.floor(Math.random() * STAN_LINES.length)] + '"', 2500);
        openStimmyShop();
        return;
    }
    stanGreeted = true;
    dialogueState.active = true;
    dialogueState.npc = STAN_NPC;
    dialogueState.currentNode = 'start';
    dialogueState.textRevealed = 0;
    dialogueState.page = 0;
    dialogueState.pageComplete = false;
    dialogueState.selectedChoice = 0;
    dialogueState.choicesVisible = false;
    dialogueState.advancedMenu = false;
    gameState = STATE.DIALOGUE;
}

// --- The shop ---
function tryUseCafeCounter() {
    if (!insideBuilding || insideBuilding.type !== 'ug_stimmy_tims') return false;
    let dx = 0, dy = 0;
    if (player.facing === 'up') dy = -1;
    else if (player.facing === 'down') dy = 1;
    else if (player.facing === 'left') dx = -1;
    else dx = 1;
    const fx = player.x + dx, fy = player.y + dy;
    if (fx < 0 || fx >= insideBuilding.interiorW || fy < 0 || fy >= insideBuilding.interiorH) return false;
    const t = insideBuilding.interiorTiles[fx][fy];
    if (!t || t.type !== 'cafe_counter') return false;
    openStanDialogue();
    return true;
}

function buyCafeItem(itemId, price) {
    if (inventory.countItem('iou') < price) {
        notify('Not enough IOUs — the Recycle Bin pays for spares!');
        openStimmyShop();
        return;
    }
    if (!inventory.addItem(itemId, 1)) {
        notify('Pockets full!');
        openStimmyShop();
        return;
    }
    inventory.removeItem('iou', price);
    audioManager.playSFX('chime');
    notify('Bought a ' + ITEMS[itemId].name + ' for ' + price + ' IOUs.');
    openStimmyShop();
}

function openStimmyShop() {
    const opts = CAFE_MENU.map(m => ({
        text: ITEMS[m.id].name + ' — ' + m.price + ' IOUs',
        action: () => buyCafeItem(m.id, m.price)
    }));
    opts.push({ text: 'Done', action: () => closeDialogue() });
    openMagicMenu("Stimmy Tim's — IOUs in pocket: " + inventory.countItem('iou'), opts);
}

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
    openStimmyShop();
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

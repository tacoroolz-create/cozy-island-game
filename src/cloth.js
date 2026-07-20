// ===== CLOTH, ROPE & BANNERS =====
// Fiber's sink now that grass regrows: fiber -> cloth -> carpets, banners, rope.
// Rope is also the key to the underground city (ROPE_TO_DESCEND lengths, once).
// Banners are player-authored: type a short word, pick a color, hang it on an
// interior wall or plant it outside as a flag.
//
// Loads AFTER crafting.js (pushes into RECIPES) and game.js (mutates ITEMS).

const FIBER_PER_CLOTH = 5;
const ROPE_TO_DESCEND = 50;
// ponytail: 4 chars is what the pixel font fits on a flag at 1:1. Longer words
// would need a wider flag sprite, not a smaller font.
const BANNER_MAX_CHARS = 4;
const BANNER_COLORS = [
    { name: 'Red',    hex: '#C62828' }, { name: 'Blue',   hex: '#1565C0' },
    { name: 'Green',  hex: '#2E7D32' }, { name: 'Gold',   hex: '#F9A825' },
    { name: 'Purple', hex: '#6A1B9A' }, { name: 'Cream',  hex: '#EFE3C8' }
];

let clothState = { tunnelRoped: false, flags: [] };  // flags: [{x, y, text, color}]

// --- Items & recipes ---
(function registerCloth() {
    ITEMS.cloth = { name: 'Cloth', category: 'material', maxStack: 99, color: '#E8DCC0',
        desc: 'A bolt of woven plant fiber. The start of most soft things.' };
    ITEMS.rope = { name: 'Rope', category: 'material', maxStack: 99, color: '#B08D57',
        desc: 'Braided cloth, strong enough to climb. The deep places want a lot of it.' };
    ITEMS.carpet = { name: 'Carpet', category: 'block', maxStack: 99, color: '#8D6E63',
        desc: 'A woven carpet for a cozy floor.', home: { cls: 'decoration', placeOn: 'floor', solid: false } };
    ITEMS.banner = { name: 'Blank Banner', category: 'block', maxStack: 99, color: '#EFE3C8',
        desc: 'Undyed cloth on a batten. Hang it on a wall or plant it outside, then name it.',
        home: { cls: 'decoration', placeOn: 'wall', solid: false },
        outdoor: { flag: true } };

    RECIPES.push(
        { output: 'cloth', cat: 'home', sub: 'expansion', name: 'Cloth', desc: 'Weave loose fiber into usable cloth.',
            inputs: [ { id: 'fiber', count: FIBER_PER_CLOTH } ] },
        { output: 'rope', cat: 'home', sub: 'expansion', name: 'Rope', desc: 'Braided cloth. Strong enough to climb down.',
            inputs: [ { id: 'cloth', count: 2 } ] },
        { output: 'carpet', cat: 'home', sub: 'decoration', name: 'Carpet', desc: 'A woven carpet for the floor.',
            inputs: [ { id: 'cloth', count: 4 } ] },
        { output: 'banner', cat: 'home', sub: 'decoration', name: 'Blank Banner', desc: 'Wall banner or outdoor flag. You choose the word.',
            inputs: [ { id: 'cloth', count: 2 }, { id: 'stick', count: 1 } ] }
    );
})();

// --- Authoring: word, then color ---
// Calls done({ text, color }) once the player has picked both, or done(null) if
// they backed out at the word prompt.
function askBannerDesign(done) {
    const raw = (typeof window !== 'undefined' && window.prompt)
        ? window.prompt('What should the banner say? (' + BANNER_MAX_CHARS + ' letters)')
        : null;
    if (raw === null) { done(null); return; }
    const text = raw.trim().toUpperCase().slice(0, BANNER_MAX_CHARS);
    openMagicMenu('Banner color for "' + (text || ' ') + '"', BANNER_COLORS.map(c => ({
        text: c.name,
        action: () => { closeDialogue(); done({ text: text, color: c.hex }); }
    })));
}

// --- Interior banners (hung on a wall tile by tryPlaceHomeItemInside) ---
function authorWallBanner(tile) {
    askBannerDesign(design => {
        if (!design) return;  // tile keeps a blank banner
        tile.decoText = design.text;
        tile.decoColor = design.color;
    });
}

// Draw a banner over an interior wall tile (see drawWallDeco in game.js).
function drawBanner(tile, sx, sy, TS) {
    noStroke();
    fill('#4E342E');
    rect(sx + 2, sy + 2, TS - 4, 2);                       // batten
    fill(tile.decoColor || ITEMS.banner.color);
    rect(sx + 2, sy + 4, TS - 4, TS - 7);                  // cloth
    fill(0, 0, 0, 40);
    rect(sx + 2, sy + TS - 4, TS - 4, 1);
    drawBannerText(tile.decoText, sx + 2, sy + 4, TS - 4, TS - 7);
}

// Word centered on the cloth, squeezed horizontally if it overruns. Squeezing
// is what keeps a 4-letter word on a 16px wall tile; outdoor flags are wide
// enough to draw at 1:1.
function drawBannerText(text, x, y, w, h) {
    if (!text || typeof pixelText !== 'function') return;
    const full = pixelTextWidth(text, 1);
    if (!full) return;
    const squeeze = Math.min(1, (w - 2) / full);
    push();
    translate(x + w / 2, y + h / 2);
    scale(squeeze, 1);
    pixelText(text, 0, 0, { align: 'center', valign: 'middle', color: [30, 22, 16] });
    pop();
}

// --- Outdoor flags (a pole with the banner flying from it, 2x2 tiles) ---
function tryPlaceFlag(tx, ty, itemId) {
    if (isSolidTile(tx, ty) || buildingAt(tx, ty) || (typeof npcAt === 'function' && npcAt(tx, ty))) {
        notify('No room for a flagpole there.');
        return false;
    }
    if (clothState.flags.some(f => f.x === tx && f.y === ty)) return false;  // falls through to pickup
    askBannerDesign(design => {
        if (!design) return;
        clothState.flags.push({ x: tx, y: ty, text: design.text, color: design.color, map: currentMapId });
        inventory.removeItem(itemId, 1);
        notify('Raised a flag.');
    });
    return true;
}

function tryPickupFlagAt(tx, ty) {
    const i = clothState.flags.findIndex(f => f.map === currentMapId && f.x === tx && (f.y === ty || f.y - 1 === ty));
    if (i < 0) return false;
    const f = clothState.flags[i];
    if (Math.max(Math.abs(f.x - player.x), Math.abs(f.y - player.y)) > 2) return false;
    if (!inventory.addItem('banner', 1)) { notify('Pockets full!'); return true; }
    clothState.flags.splice(i, 1);
    notify('Took down the flag.');
    return true;
}

function drawFlags() {
    const TS = CONFIG.TILE_SIZE;
    for (const f of clothState.flags) {
        if (f.map !== currentMapId) continue;
        const sx = f.x * TS - cameraX;
        const sy = f.y * TS - cameraY;
        if (sx < -TS * 3 || sy < -TS * 3 || sx > width + TS * 3 || sy > height + TS * 3) continue;
        noStroke();
        fill('#6D4C41');
        rect(sx + 2, sy - TS, 3, TS * 2 - 2);                // pole, 2 tiles tall
        fill('#8D6E63');
        rect(sx, sy + TS - 3, 7, 2);                          // base
        fill(f.color);
        rect(sx + 5, sy - TS + 2, TS * 2 - 6, TS - 4);        // cloth, 2 tiles wide
        drawBannerText(f.text, sx + 5, sy - TS + 2, TS * 2 - 6, TS - 4);
    }
}

// --- Rope gate on the descent into the underground city ---
// Returns true if the player may drop through; otherwise explains and returns
// false. The rope stays tied once paid.
function ropeReadyForDescent() {
    if (clothState.tunnelRoped) return true;
    if (!inventory.hasItem('rope', ROPE_TO_DESCEND)) {
        notify('The hole goes deeper than it looks. You would need ' + ROPE_TO_DESCEND +
               ' lengths of rope to climb down (you have ' + inventory.countItem('rope') + ').', 5000);
        return false;
    }
    inventory.removeItem('rope', ROPE_TO_DESCEND);
    clothState.tunnelRoped = true;
    notify('You knot ' + ROPE_TO_DESCEND + ' lengths of rope together and anchor them at the lip of the hole.', 5000);
    return true;
}

// --- Persistence ---
function clothSerialize() {
    return { tunnelRoped: clothState.tunnelRoped, flags: clothState.flags };
}

function clothLoad(data) {
    // ponytail: a save from before the rope gate has already been down there —
    // don't re-charge an existing playthrough.
    clothState = data
        ? { tunnelRoped: !!data.tunnelRoped, flags: (data.flags || []).slice() }
        : { tunnelRoped: true, flags: [] };
}

// Self-check for the map editor's brush logic (run: node tools/test_mapeditor.js).
// Covers the parts that aren't obvious by reading: brush footprint, gap-free drag
// interpolation, tree-pair clearing, and stroke undo.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// --- Minimal game globals ---
global.window = global;
global.CONFIG = { TILE_SIZE: 16, WORLD_WIDTH: 20, WORLD_HEIGHT: 20, CANVAS_WIDTH: 320, CANVAS_HEIGHT: 192 };
global.STATE = { START: 'start', PLAYING: 'playing', PAUSED: 'paused', INSIDE: 'inside' };
global.gameState = 'playing';
global.SPRITES = {};
global.ESCAPE = 27;
global.keyCode = 0;
global.key = '';
global.insideBuilding = null;
global.notify = () => {};
global.constrain = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
global.isSolidTile = () => false;
global.updateCamera = () => {};
global.cameraX = 0;
global.cameraY = 0;

function freshWorld() {
    const tiles = [];
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        tiles[x] = [];
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) tiles[x][y] = { type: 'grass', variant: 0 };
    }
    // A tree: solid trunk at (5,5) with its canopy tile directly above.
    tiles[5][5] = { type: 'tree', variant: 0, solid: true };
    tiles[5][4] = { type: 'tree', variant: 0, isTreeTop: true, solid: false };
    return { tiles, timeMinutes: 480 };
}
global.world = freshWorld();

eval(fs.readFileSync(path.join(__dirname, '../src/mapeditor.js'), 'utf8'));

const typeAt = (x, y) => world.tiles[x][y].type;
// The brush size lives in the editor's own scope; drive it through the key handler.
function pressKey(k) { global.key = k; editorKeyPressed(); }

// --- Brush footprint: default size is 3x3, centered on the target tile ---
pressKey('3'); // Water
editorBeginStroke();
editorPaintAt(10, 10);
assert.strictEqual(typeAt(10, 10), 'sea', 'center tile painted');
assert.strictEqual(typeAt(9, 9), 'sea', 'NW corner of a 3x3 brush painted');
assert.strictEqual(typeAt(11, 11), 'sea', 'SE corner of a 3x3 brush painted');
assert.strictEqual(typeAt(12, 10), 'grass', '3x3 brush does not reach 2 tiles out');
editorEndStroke();

// --- Undo restores the whole stroke, including the tiles it overwrote ---
editorUndoStroke();
assert.strictEqual(typeAt(10, 10), 'grass', 'undo restores the painted center');
assert.strictEqual(typeAt(9, 9), 'grass', 'undo restores the whole footprint');

// --- Drag interpolation: a fast diagonal drag leaves no unpainted gaps ---
pressKey('['); // brush size 1, so a gap would actually show
pressKey('2'); // Sand
editorBeginStroke();
editorPaintLineTo(2, 2);
editorPaintLineTo(9, 9);   // jumped 7 tiles in one frame
for (let i = 2; i <= 9; i++) {
    assert.strictEqual(typeAt(i, i), 'beach', 'no gap at ' + i + ',' + i + ' along the drag');
}
assert.strictEqual(typeAt(3, 2), 'grass', 'drag stays on its own line');
editorEndStroke();

// --- Painting over a tree clears both halves, leaving no floating canopy ---
world = freshWorld();
pressKey('2'); // Sand
editorBeginStroke();
editorPaintTile(5, 5, 'beach');       // the trunk
assert.strictEqual(typeAt(5, 5), 'beach', 'trunk replaced');
assert.strictEqual(typeAt(5, 4), 'beach', 'canopy above the trunk cleared too');
editorEndStroke();

// ...and from the other direction: painting the canopy clears the trunk below.
world = freshWorld();
editorBeginStroke();
editorPaintTile(5, 4, 'beach');       // the canopy
assert.strictEqual(typeAt(5, 4), 'beach', 'canopy replaced');
assert.strictEqual(typeAt(5, 5), 'beach', 'trunk below the canopy cleared too');
editorEndStroke();

// --- Painting never writes outside the world ---
editorBeginStroke();
editorPaintAt(0, 0);
editorPaintAt(CONFIG.WORLD_WIDTH - 1, CONFIG.WORLD_HEIGHT - 1);
editorEndStroke();

console.log('map editor self-check: all assertions passed');

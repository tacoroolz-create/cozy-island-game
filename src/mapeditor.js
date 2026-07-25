// ===== MAP EDITOR =====
// Paint the island's terrain by hand. This is not a separate tool: it's a zoomed-out
// view of the live world with a mouse brush that writes straight into world.tiles.
// Whatever you paint IS the map — the normal save carries it (see World.serialize),
// and every tile autotiles itself (coastline waves, sandy grass fringe, path edges)
// exactly as it does in play.
//
// ponytail: no standalone editor app. The game already knows how to draw every tile,
// blend every seam and save the grid — reusing that renderer IS the editor. The only
// new code here is a brush, a palette and a zoom.
//
// Terrain only, on purpose: grass / sand / water / path / soil. Trees, rocks and
// buildings stay the game's business; painting over a tree simply clears it.

const EDITOR_STATE = 'editor';

// Brushes, in palette order (also the 1-5 hotkeys). `src` is the source pixel in
// the tile's sprite sheet to show as the swatch — for 48x48 autotile sheets that's
// the neutral center cell at (16,16).
const EDITOR_BRUSHES = [
    { type: 'grass', label: 'Grass', color: '#7CB342', src: [16, 16],
      sprite: () => SPRITES[typeof seasonalGrassKey === 'function' ? seasonalGrassKey() : 'tiles.grass'] || SPRITES['tiles.grass'] },
    { type: 'beach', label: 'Sand',  color: '#F4E4BC', src: [0, 0],
      sprite: () => SPRITES['tiles.beach'] },
    // waves.png col 2 (x=32), rows 5-7 are the plain open-water loop.
    { type: 'sea',   label: 'Water', color: '#4A90C8', src: [32, 80],
      sprite: () => SPRITES['tiles.waves'] },
    { type: 'path',  label: 'Path',  color: '#7A5A3A', src: [16, 16],
      sprite: () => SPRITES['tiles.path'] },
    { type: 'soil',  label: 'Soil',  color: '#5D4037', src: [0, 0],
      sprite: () => SPRITES['tiles.soil'] }
];

// Trees occupy two stacked tiles (trunk + canopy above); painting either half must
// clear the other so no canopy is left floating over fresh sand.
const EDITOR_TREE_TYPES = ['tree', 'fir_tree', 'banana_tree', 'palm_tree'];

const EDITOR_ZOOMS = [1, 0.5, 0.25];   // 20x12, 40x24, 80x48 tiles on screen
const EDITOR_SIZES = [1, 3, 5, 9];     // brush footprint, in tiles
const EDITOR_PALETTE_H = 26;           // bottom bar height, in canvas pixels
const EDITOR_UNDO_DEPTH = 30;

let editorZoom = 0.5;
let editorBrush = 0;
let editorSizeIdx = 1;
let editorPainting = false;
let editorLastTile = null;   // last painted tile this stroke, for gap-free drags
let editorStroke = [];       // tiles changed by the in-progress stroke (pre-edit)
let editorStrokeSeen = null; // Set of "x,y" already captured this stroke
let editorUndo = [];         // completed strokes, newest last

function editorBrushSize() { return EDITOR_SIZES[editorSizeIdx]; }

// ===== OPEN / CLOSE =====

function openMapEditor() {
    if (typeof world === 'undefined' || !world || !player) return;
    gameState = EDITOR_STATE;
    editorUndo = [];
    editorEndStroke();
    worldViewScale = editorZoom;
    editorCenterOn(player.x, player.y);
    notify('Map editor — paint your island.', 2500, true);
}

function closeMapEditor() {
    editorEndStroke();
    worldViewScale = 1;
    gameState = STATE.PLAYING;
    // Terrain may have been painted out from under the player (a lake where they
    // were standing); step them to the nearest open tile so they can't get stuck.
    if (isSolidTile(player.x, player.y)) {
        const spot = editorNearestOpenTile(player.x, player.y);
        if (spot) { player.x = spot.x; player.y = spot.y; }
    }
    updateCamera();
    notify('Looking good. Save to keep it.', 2500, true);
}

// Outward ring search for a walkable tile near (x,y).
function editorNearestOpenTile(x, y) {
    for (let r = 1; r < 30; r++) {
        for (let dx = -r; dx <= r; dx++) {
            for (let dy = -r; dy <= r; dy++) {
                if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
                const nx = x + dx, ny = y + dy;
                if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) continue;
                if (!isSolidTile(nx, ny)) return { x: nx, y: ny };
            }
        }
    }
    return null;
}

// ===== CAMERA =====
// The editor drives cameraX/cameraY itself (free pan), instead of following the
// player the way updateCamera() does in play.

function editorViewSize() {
    return { w: CONFIG.CANVAS_WIDTH / editorZoom, h: CONFIG.CANVAS_HEIGHT / editorZoom };
}

function editorClampCamera() {
    const TS = CONFIG.TILE_SIZE;
    const v = editorViewSize();
    cameraX = Math.round(constrain(cameraX, 0, Math.max(0, CONFIG.WORLD_WIDTH * TS - v.w)));
    cameraY = Math.round(constrain(cameraY, 0, Math.max(0, CONFIG.WORLD_HEIGHT * TS - v.h)));
}

function editorCenterOn(tileX, tileY) {
    const TS = CONFIG.TILE_SIZE;
    const v = editorViewSize();
    cameraX = tileX * TS - v.w / 2;
    cameraY = tileY * TS - v.h / 2;
    editorClampCamera();
}

function editorSetZoom(idx) {
    const z = EDITOR_ZOOMS[constrain(idx, 0, EDITOR_ZOOMS.length - 1)];
    if (z === editorZoom) return;
    // Keep the view's center fixed across the zoom change.
    const TS = CONFIG.TILE_SIZE;
    const v = editorViewSize();
    const cx = (cameraX + v.w / 2) / TS, cy = (cameraY + v.h / 2) / TS;
    editorZoom = z;
    worldViewScale = z;
    editorCenterOn(cx, cy);
}

// Held arrow/WASD keys pan the camera. Speed is set in screen pixels so panning
// feels the same at every zoom level.
function editorHandlePan() {
    const step = 4 / editorZoom;
    if (keyIsDown(LEFT_ARROW)  || keyIsDown(65)) cameraX -= step;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) cameraX += step;
    if (keyIsDown(UP_ARROW)    || keyIsDown(87)) cameraY -= step;
    if (keyIsDown(DOWN_ARROW)  || keyIsDown(83)) cameraY += step;
    editorClampCamera();
}

// ===== PAINTING =====

// The tile under the cursor, or null when the cursor is over the palette bar.
function editorTileUnderMouse() {
    if (mouseY >= CONFIG.CANVAS_HEIGHT - EDITOR_PALETTE_H) return null;
    const TS = CONFIG.TILE_SIZE;
    const x = Math.floor((mouseX / editorZoom + cameraX) / TS);
    const y = Math.floor((mouseY / editorZoom + cameraY) / TS);
    if (x < 0 || x >= CONFIG.WORLD_WIDTH || y < 0 || y >= CONFIG.WORLD_HEIGHT) return null;
    return { x, y };
}

function editorSetTile(x, y, type) {
    if (x < 0 || x >= CONFIG.WORLD_WIDTH || y < 0 || y >= CONFIG.WORLD_HEIGHT) return;
    const key = x + ',' + y;
    if (!editorStrokeSeen.has(key)) {
        editorStrokeSeen.add(key);
        editorStroke.push({ x, y, tile: world.tiles[x][y] });
    }
    world.tiles[x][y] = { type, variant: Math.floor(Math.random() * 3) };
}

function editorPaintTile(x, y, type) {
    if (x < 0 || x >= CONFIG.WORLD_WIDTH || y < 0 || y >= CONFIG.WORLD_HEIGHT) return;
    const old = world.tiles[x][y];
    if (old && EDITOR_TREE_TYPES.indexOf(old.type) >= 0) {
        // Clear the tree's other half too (canopy above a trunk, trunk below a canopy).
        const pairY = old.isTreeTop ? y + 1 : y - 1;
        const pair = world.tiles[x] && world.tiles[x][pairY];
        if (pair && pair.type === old.type) editorSetTile(x, pairY, type);
    }
    editorSetTile(x, y, type);
}

function editorPaintAt(tx, ty) {
    const type = EDITOR_BRUSHES[editorBrush].type;
    const r = Math.floor(editorBrushSize() / 2);
    for (let dx = -r; dx <= r; dx++) {
        for (let dy = -r; dy <= r; dy++) editorPaintTile(tx + dx, ty + dy, type);
    }
}

// A fast drag moves several tiles between frames, which would leave a dotted
// trail — so stamp the brush along the line from the last painted tile.
function editorPaintLineTo(tx, ty) {
    const from = editorLastTile;
    if (!from) { editorPaintAt(tx, ty); editorLastTile = { x: tx, y: ty }; return; }
    const steps = Math.max(Math.abs(tx - from.x), Math.abs(ty - from.y));
    for (let i = 1; i <= steps; i++) {
        editorPaintAt(Math.round(from.x + (tx - from.x) * i / steps),
                      Math.round(from.y + (ty - from.y) * i / steps));
    }
    if (steps === 0) editorPaintAt(tx, ty);
    editorLastTile = { x: tx, y: ty };
}

function editorBeginStroke() {
    editorStroke = [];
    editorStrokeSeen = new Set();
    editorLastTile = null;
}

function editorEndStroke() {
    if (editorStroke && editorStroke.length) {
        editorUndo.push(editorStroke);
        if (editorUndo.length > EDITOR_UNDO_DEPTH) editorUndo.shift();
    }
    editorStroke = [];
    editorStrokeSeen = new Set();
    editorLastTile = null;
    editorPainting = false;
}

function editorUndoStroke() {
    const stroke = editorUndo.pop();
    if (!stroke) { notify('Nothing left to undo.'); return; }
    for (const change of stroke) world.tiles[change.x][change.y] = change.tile;
}

// ===== DRAW =====

function drawEditor() {
    background('#16222c');
    editorHandlePan();
    worldViewScale = editorZoom;

    // Editing shouldn't burn daylight: World.draw() advances the clock, so hold
    // the time steady while the editor is open (no day rollover mid-brushstroke).
    const frozenTime = world.timeMinutes;

    push();
    scale(editorZoom);
    world.draw();
    for (const b of buildings) b.draw();
    if (player) player.draw();
    pop();

    world.timeMinutes = frozenTime;

    editorDrawCursor();
    editorDrawPalette();
}

function editorDrawCursor() {
    const t = editorTileUnderMouse();
    if (!t) return;
    const TS = CONFIG.TILE_SIZE;
    const r = Math.floor(editorBrushSize() / 2);
    const sx = ((t.x - r) * TS - cameraX) * editorZoom;
    const sy = ((t.y - r) * TS - cameraY) * editorZoom;
    const s = editorBrushSize() * TS * editorZoom;
    noFill();
    stroke(0, 160);
    strokeWeight(2);
    rect(sx, sy, s, s);
    stroke(255, 230);
    strokeWeight(1);
    rect(sx, sy, s, s);
    noStroke();
}

// Draw one palette swatch showing the brush's real texture, so the bar reads as
// the island's own materials rather than flat color chips.
function editorDrawSwatch(brush, x, y, size) {
    const spr = brush.sprite();
    if (spr && spr.width >= brush.src[0] + 16 && spr.height >= brush.src[1] + 16) {
        image(spr, x, y, size, size, brush.src[0], brush.src[1], 16, 16);
    } else if (spr) {
        image(spr, x, y, size, size);
    } else {
        fill(brush.color);
        rect(x, y, size, size);
    }
}

function editorDrawPalette() {
    const H = CONFIG.CANVAS_HEIGHT, W = CONFIG.CANVAS_WIDTH;
    const barY = H - EDITOR_PALETTE_H;
    noStroke();
    fill(18, 24, 32, 230);
    rect(0, barY, W, EDITOR_PALETTE_H);
    fill(255, 40);
    rect(0, barY, W, 1);

    // Swatches
    const SW = 18, GAP = 4, x0 = 5, sy = barY + 4;
    for (let i = 0; i < EDITOR_BRUSHES.length; i++) {
        const x = x0 + i * (SW + GAP);
        editorDrawSwatch(EDITOR_BRUSHES[i], x, sy, SW);
        noFill();
        stroke(i === editorBrush ? color(255, 255, 255) : color(0, 140));
        strokeWeight(1);
        rect(x - 0.5, sy - 0.5, SW + 1, SW + 1);
        noStroke();
    }

    // Selected brush name, brush size and zoom.
    textSize(10);
    textAlign(LEFT, TOP);
    fill(255);
    const infoX = x0 + EDITOR_BRUSHES.length * (SW + GAP) + 4;
    text(EDITOR_BRUSHES[editorBrush].label, infoX, barY + 5);
    fill(180, 200, 220);
    text(editorBrushSize() + 'x' + editorBrushSize() + '  ' + Math.round(1 / editorZoom) + 'x out', infoX, barY + 15);

    // Controls, right-aligned so they never collide with the brush name.
    textAlign(RIGHT, TOP);
    fill(150, 170, 190);
    text('1-5 brush   [ ] size   - + zoom', W - 5, barY + 5);
    text('Z undo   WASD pan   ESC done', W - 5, barY + 15);

    // Cursor coordinates, top-left, so you can aim precisely.
    const t = editorTileUnderMouse();
    if (t) {
        textAlign(LEFT, TOP);
        fill(0, 150);
        rect(2, 2, 46, 12);
        fill(220);
        text(t.x + ', ' + t.y, 5, 4);
    }
    textAlign(LEFT, BASELINE);
}

// Click a palette swatch. Returns true if the click landed on the bar.
function editorPaletteClick() {
    const barY = CONFIG.CANVAS_HEIGHT - EDITOR_PALETTE_H;
    if (mouseY < barY) return false;
    const SW = 18, GAP = 4, x0 = 5, sy = barY + 4;
    for (let i = 0; i < EDITOR_BRUSHES.length; i++) {
        const x = x0 + i * (SW + GAP);
        if (mouseX >= x && mouseX < x + SW && mouseY >= sy && mouseY < sy + SW) {
            editorBrush = i;
            return true;
        }
    }
    return true; // clicks anywhere on the bar are swallowed, never painted
}

// ===== INPUT =====

function editorKeyPressed() {
    if (keyCode === ESCAPE) { closeMapEditor(); return false; }
    if (key >= '1' && key <= String(EDITOR_BRUSHES.length)) {
        editorBrush = parseInt(key, 10) - 1;
        return false;
    }
    if (key === '[') { editorSizeIdx = Math.max(0, editorSizeIdx - 1); return false; }
    if (key === ']') { editorSizeIdx = Math.min(EDITOR_SIZES.length - 1, editorSizeIdx + 1); return false; }
    if (key === '-' || key === '_') { editorSetZoom(EDITOR_ZOOMS.indexOf(editorZoom) + 1); return false; }
    if (key === '=' || key === '+') { editorSetZoom(EDITOR_ZOOMS.indexOf(editorZoom) - 1); return false; }
    if (key === 'z' || key === 'Z') { editorUndoStroke(); return false; }
    return false; // swallow everything else so game hotkeys can't fire mid-edit
}

// Wrap p5's global handlers. This file loads last, so these run before the
// wrappers other modules installed and can claim events while editing.
(function editorInstallHandlers() {
    const origKey = window.keyPressed;
    window.keyPressed = function () {
        if (gameState === EDITOR_STATE) return editorKeyPressed();
        // Pause menu: E opens the editor (outdoors only — there's no terrain inside).
        if (gameState === STATE.PAUSED && !insideBuilding && (key === 'e' || key === 'E')) {
            openMapEditor();
            return false;
        }
        return origKey ? origKey.apply(this, arguments) : true;
    };

    const origPress = window.mousePressed;
    window.mousePressed = function () {
        if (gameState === EDITOR_STATE) {
            if (editorPaletteClick()) return false;
            const t = editorTileUnderMouse();
            if (!t) return false;
            editorBeginStroke();
            editorPainting = true;
            editorPaintLineTo(t.x, t.y);
            return false;
        }
        // Pause menu: the "E - Edit Terrain" row is clickable like the others.
        if (gameState === STATE.PAUSED && !insideBuilding && mouseY >= 160 && mouseY < 180) {
            openMapEditor();
            return false;
        }
        return origPress ? origPress.apply(this, arguments) : true;
    };

    const origDrag = window.mouseDragged;
    window.mouseDragged = function () {
        if (gameState === EDITOR_STATE) {
            if (!editorPainting) return false;
            const t = editorTileUnderMouse();
            if (t) editorPaintLineTo(t.x, t.y);
            return false;
        }
        return origDrag ? origDrag.apply(this, arguments) : true;
    };

    const origRelease = window.mouseReleased;
    window.mouseReleased = function () {
        if (gameState === EDITOR_STATE) { editorEndStroke(); return false; }
        return origRelease ? origRelease.apply(this, arguments) : true;
    };

    const origWheel = window.mouseWheel;
    window.mouseWheel = function (event) {
        if (gameState === EDITOR_STATE) {
            editorSetZoom(EDITOR_ZOOMS.indexOf(editorZoom) + (event.delta > 0 ? 1 : -1));
            return false;
        }
        return origWheel ? origWheel.apply(this, arguments) : true;
    };
})();

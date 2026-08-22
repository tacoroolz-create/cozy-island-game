// Runnable check for src/islands.js generation + fall geometry: node tools/test_islands.js
// Stubs the p5/game globals the file touches at load time (none) and at call time.
const fs = require('fs'), vm = require('vm');
const ctx = {
    CONFIG: { CANVAS_WIDTH: 320, CANVAS_HEIGHT: 192, WORLD_WIDTH: 100, WORLD_HEIGHT: 100 },
    currentMapId: 'island', world: null, npcs: [], buildings: [], maps: {},
    millis: () => 0, notify: () => {}, lerp: (a, b, t) => a + (b - a) * t,
    console,
};
vm.createContext(ctx);
// Top-level `const`/`function` in a vm context aren't context properties, so
// hand them back with a trailing expression.
const { ISLAND_BIOMES, ISLAND_GRID, generateBiomeIsland, islandArrivalPoint, islandVoidMargin } =
    vm.runInContext(fs.readFileSync('src/islands.js', 'utf8') +
        '\n;({ ISLAND_BIOMES, ISLAND_GRID, generateBiomeIsland, islandArrivalPoint, islandVoidMargin })', ctx);

let fails = 0;
const ok = (c, m) => { if (!c) { console.error('FAIL: ' + m); fails++; } };

for (const b of ISLAND_BIOMES) {
    const w = { tiles: [], placeTree(x, y, t) { this.tiles[x][y] = { type: t, solid: true }; } };
    generateBiomeIsland(w, b);

    let land = 0, voidCount = 0, decor = 0;
    for (let x = 0; x < ISLAND_GRID; x++) for (let y = 0; y < ISLAND_GRID; y++) {
        const t = w.tiles[x][y];
        ok(!!t, b.id + ' has a tile at ' + x + ',' + y);
        if (t.type === 'void') voidCount++; else { land++; if (t.type !== 'grass') decor++; }
    }
    ok(land + voidCount === ISLAND_GRID * ISLAND_GRID, b.id + ' covers the grid');
    // Corner bites eat some land, but the island must stay close to its spec.
    ok(land > b.land * b.land * 0.8 && land <= b.land * b.land,
        b.id + ' land area ' + land + ' near ' + (b.land * b.land));
    const wanted = b.decor.reduce((s, d) => s + d[1], 0);
    ok(decor >= wanted * 0.8, b.id + ' placed ' + decor + '/' + wanted + ' decorations');

    // The whole border must be void, or the player could never step off.
    for (let i = 0; i < ISLAND_GRID; i++) {
        ok(w.tiles[0][i].type === 'void' && w.tiles[ISLAND_GRID - 1][i].type === 'void' &&
           w.tiles[i][0].type === 'void' && w.tiles[i][ISLAND_GRID - 1].type === 'void',
           b.id + ' border is void at ' + i);
    }
    // Arrival points must land on solid ground, opposite the edge you fell from.
    for (const dir of ['up', 'down', 'left', 'right']) {
        const a = islandArrivalPoint(b, dir);
        ok(w.tiles[a.x][a.y].type !== 'void', b.id + ' arrival from ' + dir + ' is on land');
    }
    const m = islandVoidMargin(b.land);
    ok(islandArrivalPoint(b, 'up').y > ISLAND_GRID / 2 && islandArrivalPoint(b, 'down').y < ISLAND_GRID / 2,
        b.id + ' arrives opposite the edge fallen from');
    ok(m >= 0, b.id + ' margin');
}
console.log(fails ? fails + ' FAILURES' : 'islands: all checks passed');
process.exit(fails ? 1 : 0);

// Runnable check for the authored island maps: node tools/test_islands.js
// Confirms each biome is a connected place, the coast is void, the shoot and
// the ladder sit on the coast, and the impassable list matches the solid cells.
const fs = require('fs'), vm = require('vm');
const ctx = {
    CONFIG: { CANVAS_WIDTH: 320, CANVAS_HEIGHT: 192, WORLD_WIDTH: 100, WORLD_HEIGHT: 100, TILE_SIZE: 16 },
    currentMapId: 'island', world: null, npcs: [], buildings: [], maps: {},
    millis: () => 0, notify: () => {}, lerp: (a, b, t) => a + (b - a) * t,
    console,
};
vm.createContext(ctx);
const src = fs.readFileSync('src/island_maps.js', 'utf8') + '\n' + fs.readFileSync('src/islands.js', 'utf8');
const exported = vm.runInContext(src + `
;({ ISLAND_BIOMES, ISLAND_GRID, generateBiomeIsland, buildIslandGrid, islandReachable, islandMapSpecs,
    promptFallAt, peekFall() { return fallPrompt; }, clearFall() { fallPrompt = null; } })
`, ctx);

const { ISLAND_BIOMES, ISLAND_GRID, generateBiomeIsland, buildIslandGrid, islandReachable } = exported;

let fails = 0;
const ok = (c, m) => { if (!c) { console.error('FAIL: ' + m); fails++; } };

for (const b of ISLAND_BIOMES) {
    const grid = buildIslandGrid(b.id);
    ok(grid.errors.length === 0, b.id + ' layout errors:\n  ' + grid.errors.join('\n  '));
    ok(grid.links.shoot && grid.links.ladder && grid.links.spawn, b.id + ' has a shoot, a ladder, and a spawn');

    const reach = islandReachable(grid, grid.links.spawn);
    const reached = {};
    reach.forEach(p => { reached[p.x + ',' + p.y] = true; });
    function canReach(name) {
        const p = grid.links[name];
        ok(!!p, b.id + ' has link ' + name);
        if (!p) return;
        ok(!!reached[p.x + ',' + p.y], b.id + ' can walk from the yard to ' + name + ' at ' + p.x + ',' + p.y);
    }
    canReach('shoot');
    canReach('ladder');
    Object.keys(grid.links).forEach(name => {
        if (name === 'spawn' || name === 'shoot' || name === 'ladder') return;
        canReach(name);
    });

    // Impassable coordinates are exactly the solid, non-void cells.
    const solids = [];
    let land = 0;
    for (let x = 0; x < grid.w; x++) {
        for (let y = 0; y < grid.h; y++) {
            const c = grid.cells[x][y];
            if (c.type === 'void') continue;
            land++;
            if (c.solid) solids.push(x + ',' + y + ' ' + (c.building || c.type));
        }
    }
    ok(land > 200, b.id + ' has a real footprint (' + land + ' land tiles)');
    const listed = grid.impassable.map(c => c.x + ',' + c.y + ' ' + c.type).sort();
    ok(listed.length === solids.length, b.id + ' impassable count ' + listed.length + ' vs solid cells ' + solids.length);
    const solidSet = {};
    solids.forEach(s => { solidSet[s] = true; });
    listed.forEach(s => { if (!solidSet[s]) ok(false, b.id + ' lists a solid that is not on the map: ' + s); });

    const w = { tiles: [] };
    generateBiomeIsland(w, b);
    ok(w.impassable.length === grid.impassable.length, b.id + ' world impassable list copied');
    // The engine grid's border stays void, so the island reads as floating.
    for (let i = 0; i < ISLAND_GRID; i++) {
        ok(w.tiles[0][i].type === 'void' && w.tiles[ISLAND_GRID - 1][i].type === 'void' &&
           w.tiles[i][0].type === 'void' && w.tiles[i][ISLAND_GRID - 1].type === 'void',
           b.id + ' border is void at ' + i);
    }
    const spawn = w.links.spawn;
    ok(spawn && w.tiles[spawn.x][spawn.y].type !== 'void' && !w.tiles[spawn.x][spawn.y].solid,
        b.id + ' spawn is walkable ground');
    // Every listed impassable cell is solid on the blitted world.
    w.impassable.forEach(c => {
        const t = w.tiles[c.x][c.y];
        if (!t || !t.solid || t.type === 'void') ok(false, b.id + ' impassable ' + c.x + ',' + c.y + ' (' + c.type + ') is not a solid tile');
    });
}

// The original pier is drawn from the left edge of the grid. Stepping past
// that end has to offer the fall; walking along the planks must not.
ctx.world = { depth: 0, biome: null, tiles: [] };
for (let x = 0; x < 3; x++) {
    ctx.world.tiles[x] = [];
    for (let y = 48; y <= 51; y++) ctx.world.tiles[x][y] = { type: x < 2 ? 'dock' : 'sea' };
}
ok(exported.promptFallAt({ x: 0, y: 49 }, -1, 49) && exported.peekFall() && exported.peekFall().dir === 'left',
    'stepping off the seaward end of the pier offers the fall');
exported.clearFall();
ok(exported.promptFallAt({ x: 1, y: 49 }, 2, 49) && exported.peekFall() && exported.peekFall().dir === 'right',
    'stepping from the pier onto the sea offers the fall');
exported.clearFall();
ok(!exported.promptFallAt({ x: 0, y: 49 }, 1, 49) && !exported.peekFall(),
    'walking along the pier stays on the pier');
exported.clearFall();

console.log(fails ? fails + ' FAILURES' : 'islands: all checks passed');
process.exit(fails ? 1 : 0);

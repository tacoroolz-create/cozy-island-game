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
    beachIslandZone, residentGroup, neighborGroup,
    promptFallAt, peekFall() { return fallPrompt; }, clearFall() { fallPrompt = null; } })
`, ctx);

const { ISLAND_BIOMES, ISLAND_GRID, generateBiomeIsland, buildIslandGrid, islandReachable } = exported;

let fails = 0;
const ok = (c, m) => { if (!c) { console.error('FAIL: ' + m); fails++; } };

ok(exported.residentGroup('town') === 'Townfolk', 'town yards are for robots and monsters');
ok(exported.residentGroup('meadow') === 'Animal' && exported.residentGroup('mountain') === 'Ghost',
    'meadow and mountain keep their own residents');
ok(exported.residentGroup('city') === null, 'the city still houses whoever followed');
['Robot', 'Monster', 'Monster (Dragon-like)'].forEach(function (species) {
    ok(exported.neighborGroup({ species: species }) === 'Townfolk', species + ' is townfolk');
});
ok(exported.neighborGroup({ species: 'Animal (Rabbit)' }) === 'Animal', 'animals stay meadow residents');
ok(exported.neighborGroup({ species: 'Ghost' }) === 'Ghost', 'ghosts stay mountain residents');

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
    if (b.id === 'meadow') {
        ok(land > 1000 && land < 2200, 'meadow is a floating oval (' + land + ' land tiles)');
        ok(grid.cells[0][0].type === 'void' && grid.cells[grid.w - 1][grid.h - 1].type === 'void',
            'meadow corners are sky');
        ok(grid.lots.length === 4, 'meadow has four animal yards');
        let waterSky = 0;
        for (let x = 0; x < grid.w; x++) {
            for (let y = 0; y < grid.h; y++) {
                if (grid.cells[x][y].type !== 'water') continue;
                for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                    const n = grid.cells[x + dx] && grid.cells[x + dx][y + dy];
                    if (!n || n.type === 'void') waterSky++;
                }
            }
        }
        ok(waterSky === 0, 'meadow pond does not touch the sky (' + waterSky + ')');
        grid.lots.forEach(function (lot, i) {
            for (let dy = -1; dy <= 10; dy++) {
                for (let dx = -1; dx <= 8; dx++) {
                    const c = grid.cells[lot.x + dx][lot.y + dy];
                    ok(c && c.type === 'grass' && !c.solid, 'meadow yard ' + i + ' is grass at ' + (lot.x + dx) + ',' + (lot.y + dy));
                }
            }
            const door = (lot.x + 4) + ',' + (lot.y + 8);
            ok(!!reached[door], 'meadow yard ' + i + ' door is reachable');
        });
    }
    if (b.id === 'woods') {
        ok(land > 1000 && land < 2200, 'woods is a floating oval (' + land + ' land tiles)');
        ok(grid.cells[0][0].type === 'void' && grid.cells[grid.w - 1][grid.h - 1].type === 'void',
            'woods corners are sky');
        let waterSky = 0;
        for (let x = 0; x < grid.w; x++) {
            for (let y = 0; y < grid.h; y++) {
                if (grid.cells[x][y].type !== 'water') continue;
                for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                    const n = grid.cells[x + dx] && grid.cells[x + dx][y + dy];
                    if (!n || n.type === 'void') waterSky++;
                }
            }
        }
        ok(waterSky === 0, 'woods creek does not touch the sky (' + waterSky + ')');
    }
    if (b.id === 'town') {
        ok(land > 1600 && land < 2400, 'town is a floating oval (' + land + ' land tiles)');
        ok(grid.cells[0][0].type === 'void' && grid.cells[grid.w - 1][grid.h - 1].type === 'void',
            'town corners are sky');
        ok(grid.lots.length === 8, 'town has eight yards');
        let waterSky = 0;
        for (let x = 0; x < grid.w; x++) {
            for (let y = 0; y < grid.h; y++) {
                if (grid.cells[x][y].type !== 'water') continue;
                for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                    const n = grid.cells[x + dx] && grid.cells[x + dx][y + dy];
                    if (!n || n.type === 'void') waterSky++;
                }
            }
        }
        ok(waterSky === 0, 'town fountain does not touch the sky (' + waterSky + ')');
        const cafe = grid.buildings.find(function (bld) { return bld.type === 'ug_stimmy_tims'; });
        ok(!!cafe, 'town has Stimmy Tim\'s');
        const step = cafe && grid.cells[cafe.x + Math.floor(cafe.w / 2)][cafe.y + cafe.h];
        ok(step && !step.solid && step.type !== 'void', 'cafe door is walkable');
        const landing = grid.links.spawn;
        ok(landing && cafe.y + cafe.h === landing.y, 'cafe door is on the landing row');
        grid.lots.forEach(function (lot, i) {
            for (let dy = -1; dy <= 10; dy++) {
                for (let dx = -1; dx <= 8; dx++) {
                    const c = grid.cells[lot.x + dx][lot.y + dy];
                    ok(c && c.type === 'grass' && !c.solid, 'town yard ' + i + ' is grass at ' + (lot.x + dx) + ',' + (lot.y + dy));
                }
            }
            const door = (lot.x + 4) + ',' + (lot.y + 8);
            ok(!!reached[door], 'town yard ' + i + ' door is reachable');
        });
    }
    if (b.id === 'mountain') {
        ok(grid.cells[0][0].type === 'void' && grid.cells[grid.w - 1][grid.h - 1].type === 'void',
            'mountain corners are sky');
        let dirt = 0, turf = 0;
        for (let x = 0; x < grid.w; x++) {
            for (let y = 0; y < grid.h; y++) {
                const t = grid.cells[x][y].type;
                if (t === 'path') dirt++;
                else if (t === 'grass') turf++;
            }
        }
        ok(dirt > turf, 'mountain is more dirt than grass (' + dirt + ' dirt, ' + turf + ' grass)');
        ok(grid.lots.length === 4, 'mountain has four ghost yards');
        ok(grid.buildings.some(function (bld) { return bld.type === 'ug_recycle_bin'; }),
            'mountain has the recycle bin');
        const bin = grid.buildings.find(function (bld) { return bld.type === 'ug_recycle_bin'; });
        const step = bin && grid.cells[bin.x + Math.floor(bin.w / 2)][bin.y + bin.h];
        ok(step && !step.solid && step.type !== 'void', 'recycle bin door is walkable');
        grid.lots.forEach(function (lot, i) {
            for (let dy = -1; dy <= 10; dy++) {
                for (let dx = -1; dx <= 8; dx++) {
                    const c = grid.cells[lot.x + dx][lot.y + dy];
                    ok(c && c.type === 'grass' && !c.solid, 'mountain yard ' + i + ' is grass at ' + (lot.x + dx) + ',' + (lot.y + dy));
                }
            }
            const door = (lot.x + 4) + ',' + (lot.y + 8);
            ok(!!reached[door], 'mountain yard ' + i + ' door is reachable');
        });
    }
    if (b.id === 'city') {
        ok(!grid.buildings.some(function (bld) { return bld.type === 'ug_recycle_bin'; }),
            'the recycle bin has left the city');
    }
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

// The home beach is an oval: sky at the corners, grass under the shack and
// the pond, shallows under the pier, sand at its landward end.
const zone = exported.beachIslandZone;
ok(zone(0, 0) === 'void' && zone(99, 99) === 'void', 'beach corners are sky');
ok(zone(15, 15) === 'void' && zone(20, 20) === 'void', 'the old square corners are sky now');
let grass = 0, sand = 0, beachOnVoid = 0;
const grassSeen = {};
for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        const z = zone(x, y);
        if (z === 'grass') { grass++; grassSeen[x + ',' + y] = true; }
        else if (z === 'beach') {
            sand++;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const nx = x + dx, ny = y + dy;
                if (nx < 0 || ny < 0 || nx > 99 || ny > 99 || zone(nx, ny) === 'void') beachOnVoid++;
            }
        }
    }
}
ok(beachOnVoid === 0, 'sand never touches the sky (' + beachOnVoid + ')');
ok(grass + sand > 1800 && grass + sand < 5000, 'beach land is larger than a biome island (' + (grass + sand) + ')');
// One grass blob, so the yard can walk to the shore.
let reached = 0;
const q = [[50, 47]];
const seen = { '50,47': true };
while (q.length) {
    const p = q.pop();
    reached++;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = p[0] + dx, ny = p[1] + dy, k = nx + ',' + ny;
        if (!grassSeen[k] || seen[k]) continue;
        seen[k] = true;
        q.push([nx, ny]);
    }
}
ok(reached === grass, 'grass is one island (' + reached + '/' + grass + ')');
for (let dy = 0; dy < 6; dy++) {
    for (let dx = 0; dx < 6; dx++) {
        ok(zone(47 + dx, 39 + dy) === 'grass', 'pond tile ' + (47 + dx) + ',' + (39 + dy) + ' is grass');
    }
}
for (let dy = 0; dy < 12; dy++) {
    for (let dx = 0; dx < 10; dx++) {
        ok(zone(51 + dx, 46 + dy) === 'grass', 'shack yard ' + (51 + dx) + ',' + (46 + dy) + ' is grass');
    }
}
for (let dy = 0; dy < 8; dy++) {
    for (let dx = 0; dx < 8; dx++) {
        ok(zone(26 + dx, 42 + dy) === 'grass', 'gettin tile ' + (26 + dx) + ',' + (42 + dy) + ' is grass');
    }
}
ok(zone(46, 41) === 'grass', 'the pond bank where you start is grass');
for (let py = 0; py < 4; py++) {
    for (let px = 0; px < 6; px++) ok(zone(8 + px, 45 + py) === 'sea', 'pier water ' + px + ',' + py);
    ok(zone(14, 45 + py) === 'beach' && zone(15, 45 + py) === 'beach', 'pier sand row ' + py);
    ok(zone(7, 45 + py) === 'sea', 'one step west of the pier is water, row ' + py);
}
ok(zone(16, 47) === 'beach', 'dock arrival is sand');

console.log(fails ? fails + ' FAILURES' : 'islands: all checks passed');
process.exit(fails ? 1 : 0);

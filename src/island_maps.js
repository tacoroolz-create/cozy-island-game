// ===== AUTHORED FLOATING ISLANDS =====
// Each island below the original (depth 0) is a fixed layout, not a filled
// square. Coordinates are local: x right, y down, origin at the map's top-left.
// generateBiomeIsland() centers the map on the 100x100 grid.
//
// Impassable cells are water, cliff, pit, rosebush, shiny rock, tree trunks,
// and building footprints. Everything else that isn't void is walkable.
// The coast is void and blocks movement. Only the shoot tile offers the fall.
//
// A shack pad is the 8x8 player/neighbor shack plus the ring
// clearBuildingFootprint() wipes (one tile around, two extra tiles south).
// That whole pad stays plain grass so a shack never erases a path or a pond.

const SHACK_CLEAR_W = 10; // dx -1..8
const SHACK_CLEAR_H = 12; // dy -1..10

function islandMapSpecs() {
    return {
        meadow: {
            w: 42, h: 32,
            home: [8, 14],
            ground: [
                [6, 8, 28, 16],
                [14, 3, 12, 8],
                [16, 22, 10, 8],
                [2, 12, 8, 8],
                [30, 12, 8, 8]
            ],
            // Pond in the northeast lobe. Windmill is a pair of cliff posts
            // on the west lobe; the skip-city ladder stands beside it.
            water: [[28, 9, 6, 4]],
            cliff: [[3, 14, 2, 2]],
            path: [
                [18, 3, 2, 27],
                [20, 10, 8, 2],
                [2, 16, 4, 2]
            ],
            tulip: [[12, 10], [16, 12], [24, 16], [32, 14], [33, 16], [22, 20]],
            rose: [[27, 20], [31, 18]],
            tall: [[10, 10], [34, 14], [22, 20]],
            tree: [[24, 14], [26, 18], [34, 16]],
            shoot: [18, 3],
            ladder: [18, 29],
            skip: { 'skip-city': [4, 17] }
        },
        woods: {
            w: 44, h: 34,
            home: [6, 16],
            ground: [
                [2, 4, 40, 24],
                [16, 0, 10, 6],
                [16, 26, 12, 7]
            ],
            // Creek in two runs with a log bridge between them.
            water: [[22, 6, 2, 8], [24, 16, 2, 8]],
            path: [
                [18, 0, 2, 33],
                [18, 14, 8, 2]
            ],
            tree: [[4, 8], [4, 12], [10, 8], [14, 10], [28, 8], [32, 8], [36, 10],
                   [28, 12], [34, 14], [30, 18], [36, 18], [28, 22], [34, 22], [38, 20]],
            fir: [[8, 10], [38, 12], [30, 26]],
            tall: [[16, 8], [20, 20], [20, 24]],
            shiny: [[36, 16], [14, 14]],
            shoot: [18, 0],
            ladder: [18, 32]
        },
        town: {
            w: 48, h: 40,
            home: [4, 8],
            lots: [[4, 24], [28, 24]],
            // Stimmy Tim's sits on the east side of the square. Footprint 8x5.
            buildings: [{ type: 'ug_stimmy_tims', x: 30, y: 8, w: 8, h: 5 }],
            ground: [
                [2, 4, 44, 32],
                [18, 0, 8, 6],
                [18, 34, 10, 5]
            ],
            water: [[16, 12, 3, 3]],
            path: [
                [20, 0, 2, 39],
                [4, 20, 40, 2],
                [14, 10, 14, 8],
                [30, 13, 8, 1]
            ],
            tulip: [[14, 11], [26, 11], [15, 16], [26, 16]],
            rose: [[14, 14], [26, 14]],
            tree: [[40, 10], [42, 16], [40, 28]],
            shoot: [20, 0],
            ladder: [20, 38]
        },
        city: {
            w: 46, h: 36,
            home: [4, 20],
            // Three shops around a path plaza. Clock is a narrow cliff tower;
            // its base is the ladder that will reach the mountain.
            buildings: [
                { type: 'ug_black_goddess', x: 6, y: 6, w: 8, h: 8 },
                { type: 'ug_electric_temple', x: 30, y: 6, w: 8, h: 8 },
                { type: 'ug_recycle_bin', x: 18, y: 16, w: 8, h: 8 }
            ],
            ground: [
                [2, 4, 42, 26],
                [18, 0, 8, 6],
                [18, 28, 10, 7]
            ],
            cliff: [[22, 6, 2, 6]],
            path: [
                [20, 0, 2, 35],
                [4, 14, 38, 2],
                [14, 6, 18, 8]
            ],
            tree: [[4, 18], [40, 18], [40, 26]],
            shoot: [20, 0],
            ladder: [20, 34],
            skip: { 'skip-mountain': [22, 12] }
        },
        deep_woods: {
            w: 46, h: 36,
            home: [16, 20],
            buildings: [
                { type: 'ug_mubaba_fortress', x: 16, y: 6, w: 8, h: 8 },
                { type: 'ug_inner_temple', x: 32, y: 8, w: 8, h: 8 },
                { type: 'ug_bottomless_pit', x: 4, y: 18, w: 4, h: 4 }
            ],
            ground: [
                [2, 4, 42, 26],
                [18, 0, 8, 6],
                [12, 30, 2, 5],
                [18, 30, 10, 5],
                [12, 31, 16, 4]
            ],
            path: [
                [12, 4, 2, 28],
                [18, 0, 4, 4],
                [12, 31, 12, 2],
                [20, 32, 4, 3]
            ],
            fir: [[6, 8], [8, 12], [6, 28], [28, 16], [42, 12], [40, 20], [38, 28]],
            tree: [[10, 8], [8, 16], [28, 28], [28, 18]],
            shiny: [[10, 14], [30, 18]],
            shoot: [20, 0],
            ladder: [22, 34],
            // Standing just east of the pit. The pit itself is the building.
            skip: { 'skip-beach': [8, 20] }
        },
        mountain: {
            w: 44, h: 36,
            home: [4, 20],
            ground: [
                [2, 6, 40, 24],
                [12, 1, 18, 8],
                [16, 28, 12, 7]
            ],
            snow: [[14, 3, 14, 8]],
            // A rock ring with a gate to the north and a gate to the south.
            // The path runs through both gates, so the peak is a walk.
            cliff: [
                [12, 4, 6, 1], [22, 4, 8, 1],
                [12, 12, 6, 1], [22, 12, 8, 1],
                [12, 4, 1, 9], [29, 4, 1, 9],
                [8, 16, 8, 1], [24, 18, 10, 1],
                [16, 22, 2, 1], [20, 22, 8, 1]
            ],
            path: [
                [18, 1, 2, 34],
                [14, 18, 6, 2]
            ],
            fir: [[6, 10], [8, 14], [34, 10], [36, 16], [34, 24]],
            shiny: [[32, 20], [14, 26]],
            shoot: [18, 1],
            ladder: [18, 34],
            skip: { 'skip-meadow': [20, 8] },
            overlook: [22, 6]
        }
    };
}

// Build one island in local coordinates.
// Returns { w, h, cells, links, home, lots, impassable, errors }.
// cells[x][y] = { type, solid, link }.
function buildIslandGrid(id) {
    const spec = islandMapSpecs()[id];
    const errors = [];
    if (!spec) return { errors: ['no spec ' + id] };
    const W = spec.w, H = spec.h;
    const cells = [];
    for (let x = 0; x < W; x++) {
        cells[x] = [];
        for (let y = 0; y < H; y++) cells[x][y] = { type: 'void', solid: true };
    }
    function inside(x, y) { return x >= 0 && y >= 0 && x < W && y < H; }
    function cell(x, y) { return inside(x, y) ? cells[x][y] : null; }

    function fillRect(rect, label, painter) {
        const x0 = rect[0], y0 = rect[1], rw = rect[2], rh = rect[3];
        for (let dy = 0; dy < rh; dy++) {
            for (let dx = 0; dx < rw; dx++) {
                const x = x0 + dx, y = y0 + dy;
                const c = cell(x, y);
                if (!c) { errors.push(id + ' ' + label + ' out of bounds at ' + x + ',' + y); continue; }
                painter(c, x, y);
            }
        }
    }
    function paintGround(c) {
        if (c.type === 'void') { c.type = 'grass'; c.solid = false; }
    }
    function paintOverLand(c, x, y, type, solid, label) {
        if (c.pad) { errors.push(id + ' ' + label + ' lands on a shack pad at ' + x + ',' + y); return; }
        if (c.type === 'void') { errors.push(id + ' ' + label + ' is off the island at ' + x + ',' + y); return; }
        c.type = type;
        c.solid = solid;
    }

    // Shack pads first, so the rest of the island is drawn around plain yards.
    const padOrigins = [spec.home].concat(spec.lots || []);
    padOrigins.forEach(function (origin, i) {
        if (!origin) return;
        for (let dy = -1; dy < SHACK_CLEAR_H - 1; dy++) {
            for (let dx = -1; dx < SHACK_CLEAR_W - 1; dx++) {
                const x = origin[0] + dx, y = origin[1] + dy;
                const c = cell(x, y);
                if (!c) { errors.push(id + ' pad ' + i + ' out of bounds at ' + x + ',' + y); continue; }
                c.type = 'grass';
                c.solid = false;
                c.pad = true;
            }
        }
    });

    (spec.ground || []).forEach(function (r) { fillRect(r, 'ground', paintGround); });
    (spec.snow || []).forEach(function (r) {
        fillRect(r, 'snow', function (c, x, y) { paintOverLand(c, x, y, 'snow', false, 'snow'); });
    });
    (spec.path || []).forEach(function (r) {
        fillRect(r, 'path', function (c, x, y) { paintOverLand(c, x, y, 'path', false, 'path'); });
    });
    (spec.water || []).forEach(function (r) {
        fillRect(r, 'water', function (c, x, y) { paintOverLand(c, x, y, 'water', true, 'water'); });
    });
    (spec.cliff || []).forEach(function (r) {
        fillRect(r, 'cliff', function (c, x, y) { paintOverLand(c, x, y, 'cliff', true, 'cliff'); });
    });
    (spec.pit || []).forEach(function (r) {
        fillRect(r, 'pit', function (c, x, y) { paintOverLand(c, x, y, 'ug_pit', true, 'pit'); });
    });

    function paintPoint(list, type, solid, label) {
        (list || []).forEach(function (p) {
            const c = cell(p[0], p[1]);
            if (!c) { errors.push(id + ' ' + label + ' out of bounds at ' + p[0] + ',' + p[1]); return; }
            paintOverLand(c, p[0], p[1], type, solid, label);
        });
    }
    paintPoint(spec.tulip, 'tulip', false, 'tulip');
    paintPoint(spec.rose, 'rosebush', true, 'rose');
    paintPoint(spec.tall, 'tall_grass', false, 'tall grass');
    paintPoint(spec.shiny, 'shiny_rock', true, 'shiny rock');

    function paintTree(list, type) {
        (list || []).forEach(function (p) {
            const trunk = cell(p[0], p[1]);
            const canopy = cell(p[0], p[1] - 1);
            if (!trunk || !canopy) { errors.push(id + ' tree out of bounds at ' + p[0] + ',' + p[1]); return; }
            if (trunk.pad || canopy.pad) { errors.push(id + ' tree on a shack pad at ' + p[0] + ',' + p[1]); return; }
            if (trunk.type !== 'grass' || canopy.type !== 'grass') {
                errors.push(id + ' tree needs grass at ' + p[0] + ',' + p[1] + ' (trunk ' + trunk.type + ', canopy ' + canopy.type + ')');
                return;
            }
            trunk.type = type;
            trunk.solid = true;
            canopy.type = type;
            canopy.solid = false;
            canopy.canopy = true;
        });
    }
    paintTree(spec.tree, 'tree');
    paintTree(spec.fir, 'fir_tree');

    (spec.buildings || []).forEach(function (b) {
        for (let dy = 0; dy < b.h; dy++) {
            for (let dx = 0; dx < b.w; dx++) {
                const x = b.x + dx, y = b.y + dy;
                const c = cell(x, y);
                if (!c) { errors.push(id + ' ' + b.type + ' out of bounds at ' + x + ',' + y); continue; }
                if (c.pad) { errors.push(id + ' ' + b.type + ' overlaps a shack pad at ' + x + ',' + y); continue; }
                if (c.type !== 'grass' && c.type !== 'path' && c.type !== 'snow') {
                    errors.push(id + ' ' + b.type + ' footprint is ' + c.type + ' at ' + x + ',' + y);
                    continue;
                }
                // Grass underneath the sprite. Solid so the footprint blocks
                // even before the Building object is attached.
                c.type = 'grass';
                c.solid = true;
                c.building = b.type;
            }
        }
        const doorY = b.y + b.h;
        const doorX = b.x + Math.floor(b.w / 2);
        const step = cell(doorX, doorY);
        if (!step || step.solid || step.type === 'void') {
            errors.push(id + ' ' + b.type + ' has no walkable step at ' + doorX + ',' + doorY);
        }
    });

    function markLink(p, name) {
        if (!p) return;
        const c = cell(p[0], p[1]);
        if (!c) { errors.push(id + ' link ' + name + ' out of bounds'); return; }
        if (c.solid || c.type === 'void') { errors.push(id + ' link ' + name + ' is not walkable (' + c.type + ')'); return; }
        c.link = name;
    }
    markLink(spec.shoot, 'shoot');
    markLink(spec.ladder, 'ladder');
    if (spec.home) markLink([spec.home[0] + 3, spec.home[1] + 8], 'spawn');
    if (spec.skip) {
        for (const name in spec.skip) markLink(spec.skip[name], name);
    }
    markLink(spec.overlook, 'overlook');

    // The shoot and the ladder are mouths at the void. Each needs an open side.
    function touchesVoid(p, label) {
        if (!p) { errors.push(id + ' missing ' + label); return; }
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        const open = dirs.some(function (d) {
            const c = cell(p[0] + d[0], p[1] + d[1]);
            return !c || c.type === 'void';
        });
        if (!open) errors.push(id + ' ' + label + ' is not on the coast');
    }
    touchesVoid(spec.shoot, 'shoot');
    touchesVoid(spec.ladder, 'ladder');

    const impassable = [];
    for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {
            const c = cells[x][y];
            if (c.type === 'void') continue;
            if (c.solid) impassable.push({ x: x, y: y, type: c.building || c.type });
        }
    }

    const home = spec.home ? { x: spec.home[0], y: spec.home[1] } : null;
    const lots = (spec.lots || []).map(function (p) { return { x: p[0], y: p[1] }; });
    const links = {};
    for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {
            if (cells[x][y].link) links[cells[x][y].link] = { x: x, y: y };
        }
    }
    const buildings = (spec.buildings || []).map(function (b) {
        return { type: b.type, x: b.x, y: b.y, w: b.w, h: b.h };
    });

    return { w: W, h: H, cells: cells, links: links, home: home, lots: lots, buildings: buildings, impassable: impassable, errors: errors };
}

// 4-direction walk from `from` across non-solid, non-void cells.
function islandReachable(grid, from) {
    const W = grid.w, H = grid.h;
    const seen = {};
    const q = [from];
    seen[from.x + ',' + from.y] = true;
    const reach = [];
    while (q.length) {
        const p = q.pop();
        reach.push(p);
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
            const x = p.x + d[0], y = p.y + d[1];
            const k = x + ',' + y;
            if (seen[k] || x < 0 || y < 0 || x >= W || y >= H) return;
            const c = grid.cells[x][y];
            if (!c || c.solid || c.type === 'void') return;
            seen[k] = true;
            q.push({ x: x, y: y });
        });
    }
    return reach;
}

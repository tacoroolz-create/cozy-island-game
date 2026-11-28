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

// The home beach. Larger than the biome islands, because the shack, the
// garden, and the holidays live here. It is an oval: grass in the middle,
// a sand beach (thicker on the south), a thin skirt of shallows, then sky.
// The west shallows bulge out into a cove so the pier stands in the water.
const BEACH = { cx: 50, cy: 47, rx: 32, ry: 24, sand: 5, sea: 4 };

function beachAngle(x, y) {
    return Math.atan2((y + 0.5 - BEACH.cy) / BEACH.ry, (x + 0.5 - BEACH.cx) / BEACH.rx);
}

function beachNorm(x, y) {
    const dx = (x + 0.5 - BEACH.cx) / BEACH.rx;
    const dy = (y + 0.5 - BEACH.cy) / BEACH.ry;
    return Math.sqrt(dx * dx + dy * dy);
}

// 1 at the grass edge. A little wobble, so the shore is not a perfect oval.
function beachGrassEdge(x, y) {
    const a = beachAngle(x, y);
    return 1
        + 0.06 * Math.sin(2 * a + 0.6)
        + 0.045 * Math.sin(3 * a + 1.7)
        + 0.03 * Math.sin(5 * a + 0.4);
}

// 'grass' | 'beach' | 'sea' | 'void' for a world-grid tile on the home island.
function beachIslandZone(x, y) {
    const a = beachAngle(x, y);
    const edge = beachGrassEdge(x, y);
    const d = beachNorm(x, y);
    const south = Math.max(0, Math.sin(a));
    const west = Math.max(0, -Math.cos(a));
    const sand = (BEACH.sand + south * 2) / BEACH.rx;
    // west^8 is a cove: extra water only near due west, where the pier sits.
    const sea = (BEACH.sea + Math.pow(west, 8) * 5) / BEACH.rx;
    if (d <= edge) return 'grass';
    if (d <= edge + sand) return 'beach';
    if (d <= edge + sand + sea) return 'sea';
    return 'void';
}

function islandMapSpecs() {
    return {
        meadow: {
            w: 56, h: 48,
            // Oval of grass in the sky. The player's yard is on the west, and
            // the pond sits just east of the door, so the first screen is water
            // and flowers. The four lots are clear yards for animal neighbors
            // who already have a home: north, south, east, and southwest.
            disc: { cx: 28, cy: 24, rx: 24, ry: 20 },
            home: [15, 18],
            lots: [[25, 7], [27, 31], [40, 18], [17, 30]],
            water: [
                [27, 20, 8, 6],
                [30, 21, 7, 7],
                [30, 18, 6, 5]
            ],
            // The windmill, a 2x2 stone, with the city skip beside it.
            cliff: [[18, 12, 2, 2]],
            tulip: [[10, 12], [12, 11], [9, 14], [22, 15], [23, 16], [21, 14],
                    [35, 16], [34, 29], [32, 28], [36, 30], [37, 29],
                    [8, 22], [9, 23], [10, 24], [14, 8], [15, 9], [13, 10]],
            rose: [[11, 12], [22, 16], [33, 28], [9, 22], [14, 9], [37, 30]],
            tall: [[12, 16], [20, 15], [35, 17], [8, 24], [24, 28], [36, 15], [11, 28]],
            shoot: [28, 4],
            ladder: [28, 43],
            skip: { 'skip-city': [21, 13] }
        },
        woods: {
            w: 58, h: 50,
            // Oval of trees in the sky. The yard is on the west. The creek bends
            // in just east of the door, with a path across it, so the first
            // screen is water and trunks. Trees ring the clearing.
            disc: { cx: 29, cy: 25, rx: 25, ry: 20 },
            home: [12, 18],
            water: [
                [26, 10, 2, 10],
                [22, 18, 6, 2],
                [22, 18, 2, 5],
                [22, 25, 2, 8],
                [22, 31, 12, 2],
                [32, 31, 2, 8]
            ],
            path: [[21, 23, 16, 2]],
            tree: [[25, 8], [32, 8], [21, 9], [28, 9], [35, 9], [18, 10], [38, 10],
                   [24, 11], [31, 11], [15, 12], [21, 12], [28, 12], [34, 12], [41, 12],
                   [18, 13], [37, 13], [44, 14], [15, 15], [40, 15], [18, 16],
                   [43, 17], [46, 17], [42, 20], [45, 20], [43, 23], [46, 23],
                   [43, 26], [46, 26], [42, 29], [45, 29], [9, 30], [15, 30],
                   [40, 32], [43, 32], [11, 33], [14, 33], [17, 33], [20, 34],
                   [37, 34], [40, 35], [43, 35], [14, 36], [17, 36], [23, 36],
                   [31, 36], [34, 36], [20, 37], [37, 37], [40, 38], [23, 39],
                   [26, 39], [29, 39], [34, 39]],
            fir: [[12, 15], [10, 18], [8, 21], [8, 24], [8, 27], [48, 20],
                  [49, 23], [49, 26], [48, 29], [46, 32]],
            tall: [[20, 16], [18, 30], [34, 28]],
            shiny: [[28, 22], [18, 32], [36, 20], [16, 14]],
            shoot: [29, 5],
            ladder: [29, 44]
        },
        town: {
            w: 64, h: 56,
            // Oval of grass in the sky. The fountain is the square, and Stimmy
            // Tim's door is on the landing row just south of it. Eight yards
            // ring the square for robots and monsters who already have a shack.
            disc: { cx: 32, cy: 28, rx: 28, ry: 23 },
            home: [18, 24],
            lots: [[18, 7], [28, 7], [41, 13], [52, 26], [42, 35], [28, 39], [18, 36], [7, 18]],
            buildings: [{ type: 'ug_stimmy_tims', x: 28, y: 27, w: 8, h: 5 }],
            water: [[31, 23, 3, 3]],
            path: [
                [16, 21, 24, 2],
                [27, 23, 4, 3],
                [34, 23, 6, 3],
                [27, 26, 13, 1],
                [27, 32, 13, 1]
            ],
            tulip: [[20, 18], [21, 19], [23, 19], [22, 18],
                    [35, 18], [37, 18], [36, 19], [38, 20],
                    [27, 34], [29, 34], [30, 33],
                    [36, 28], [38, 28], [37, 29], [39, 30]],
            rose: [[22, 20], [36, 18], [38, 29], [29, 33]],
            tree: [[10, 32], [13, 35], [44, 26], [38, 37], [48, 30]],
            shoot: [31, 5],
            ladder: [31, 50]
        },
        city: {
            w: 46, h: 36,
            home: [4, 16],
            // The club's door is on the landing row. The temple shares that
            // frontage. The clock stands between them.
            buildings: [
                { type: 'ug_black_goddess', x: 14, y: 16, w: 8, h: 8 },
                { type: 'ug_electric_temple', x: 30, y: 6, w: 8, h: 8 }
            ],
            ground: [
                [2, 4, 42, 28],
                [34, 0, 6, 6],
                [34, 30, 8, 6]
            ],
            cliff: [[22, 6, 2, 6]],
            path: [
                [36, 0, 2, 36],
                [13, 24, 24, 2]
            ],
            tree: [[4, 8], [42, 10], [42, 28]],
            shoot: [36, 0],
            ladder: [36, 35],
            skip: { 'skip-mountain': [22, 12] }
        },
        deep_woods: {
            w: 46, h: 36,
            home: [6, 16],
            // Fortress door on the landing row. Pit to the south, temple north.
            buildings: [
                { type: 'ug_mubaba_fortress', x: 16, y: 16, w: 8, h: 8 },
                { type: 'ug_inner_temple', x: 30, y: 6, w: 8, h: 8 },
                { type: 'ug_bottomless_pit', x: 8, y: 28, w: 4, h: 4 }
            ],
            ground: [
                [2, 4, 42, 26],
                [30, 0, 6, 6],
                [6, 28, 14, 8],
                [30, 28, 6, 8]
            ],
            path: [
                [32, 0, 2, 36],
                [15, 24, 18, 2]
            ],
            fir: [[4, 8], [4, 12], [40, 12], [40, 20], [12, 32]],
            tree: [[4, 18], [42, 8], [16, 32], [40, 24]],
            shiny: [[4, 22], [40, 26]],
            shoot: [32, 0],
            ladder: [32, 35],
            skip: { 'skip-beach': [14, 30] }
        },
        mountain: {
            w: 58, h: 50,
            // Oval of dirt in the sky. Grass is the yards. The Recycle Bin
            // sits just east of the door. Snow on the north ridge is the
            // overlook. The four lots are homes for ghosts who already have
            // a shack: north, east, south, and southwest.
            disc: { cx: 29, cy: 25, rx: 25, ry: 20 },
            dirt: true,
            home: [12, 19],
            lots: [[23, 7], [40, 18], [28, 32], [18, 31]],
            buildings: [{ type: 'ug_recycle_bin', x: 22, y: 18, w: 8, h: 8 }],
            snow: [[33, 10, 6, 4]],
            cliff: [[34, 14, 6, 1], [8, 17, 4, 1]],
            fir: [[16, 16], [36, 16], [20, 14], [38, 30], [34, 28], [16, 34], [42, 14]],
            shiny: [[18, 16], [40, 12], [44, 32]],
            shoot: [29, 5],
            ladder: [29, 44],
            skip: { 'skip-meadow': [33, 11] },
            overlook: [35, 11]
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

    // An oval island. Grass in the disc, sky in the corners.
    if (spec.disc) {
        const d = spec.disc;
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                const ang = Math.atan2((y + 0.5 - d.cy) / d.ry, (x + 0.5 - d.cx) / d.rx);
                const dx = (x + 0.5 - d.cx) / d.rx;
                const dy = (y + 0.5 - d.cy) / d.ry;
                const norm = Math.sqrt(dx * dx + dy * dy);
                const edge = 1
                    + 0.05 * Math.sin(2 * ang + 0.3)
                    + 0.035 * Math.sin(3 * ang + 1.1)
                    + 0.02 * Math.sin(5 * ang + 0.6);
                if (norm > edge) continue;
                const c = cells[x][y];
                if (c.type === 'void') { c.type = 'grass'; c.solid = false; }
            }
        }
    }
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

    // Open ground becomes dirt. Yards, tree tiles, snow, and building
    // footprints stay what they are, so the mountain is more dirt than grass.
    if (spec.dirt) {
        for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
                const c = cells[x][y];
                if (c.type === 'grass' && !c.pad && !c.solid) c.type = 'path';
            }
        }
    }

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

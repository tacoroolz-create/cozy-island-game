// Cozy Island Game - CSV Tile Map Translator
// Standalone helper: turns a simple CSV text grid into a p5.js World object.
// Load this script in index.html AFTER game.js (so World, CONFIG, etc. exist).
//
// Usage:
//   const world = CSV_TILEMAP.buildMapFromCSV(csvText, 'my_underground');
//   maps['my_underground'] = world;
//
// Or load from a file with p5's loadStrings():
//   CSV_TILEMAP.loadCSVFromFile('assets/maps/underground.csv', (world) => {
//       maps['underground'] = world;
//   });

const CSV_TILEMAP = (function () {
    'use strict';

    // Default character → tile definition for underground maps.
    // Each entry can contain: type, variant, solid, target, and any custom props.
    const DEFAULT_LEGEND = {
        '#': { type: 'cave_wall',    solid: true,  variant: 0, desc: 'Surrounding rock wall' },
        '.': { type: 'cave_floor',  solid: false, variant: 0, desc: 'Stone floor' },
        'f': { type: 'foundation',  solid: false, variant: 0, desc: 'Building foundation pad' },
        '^': {
            type: 'portal',
            solid: false,
            variant: 0,
            desc: 'Stairs / portal back to surface',
            target: {
                map: 'island',
                x: 50,
                y: 50,
                facing: 'down',
                label: 'You climb back to the surface.'
            }
        },
        'c': { type: 'crystal',     solid: false, variant: 0, desc: 'Glowing crystal decoration' },
        'p': { type: 'pillar',      solid: true,  variant: 0, desc: 'Stone pillar' },
        'w': { type: 'water',       solid: true,  variant: 0, desc: 'Underground water' },
        '~': { type: 'lava',        solid: true,  variant: 0, desc: 'Lava pool' },
        'r': { type: 'tree_root',   solid: false, variant: 0, desc: 'Tree root' },
        'd': { type: 'door',        solid: false, variant: 0, desc: 'Door marker' }
    };

    // Split CSV text into a 2D grid of characters.
    function parseCSV(csvText) {
        if (typeof csvText !== 'string') {
            throw new Error('CSV tilemap must be a string. Got: ' + typeof csvText);
        }
        const lines = csvText
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const grid = lines.map(line => line.split(',').map(cell => cell.trim()));
        const width = grid.length ? grid[0].length : 0;
        return { grid, width, height: grid.length };
    }

    // Validate a CSV against a legend. Returns { valid, width, height, errors }.
    function validateCSV(csvText, legend, options) {
        const opts = options || {};
        const defaultChar = opts.defaultChar || '.';
        const result = { valid: true, width: 0, height: 0, errors: [] };

        try {
            const parsed = parseCSV(csvText);
            result.width = parsed.width;
            result.height = parsed.height;
            result.grid = parsed.grid;
            const grid = result.grid;

            if (result.height === 0) result.errors.push('CSV appears empty (no non-empty lines).');
            if (result.width === 0) result.errors.push('First row has no columns.');
            if (!legend[defaultChar]) {
                result.errors.push(`Default char "${defaultChar}" is not defined in the legend.`);
            }

            for (let y = 0; y < grid.length; y++) {
                const row = grid[y];
                if (row.length !== result.width) {
                    result.errors.push(
                        `Row ${y + 1} has ${row.length} columns, expected ${result.width}.`
                    );
                }
                for (let x = 0; x < row.length; x++) {
                    const ch = row[x] || defaultChar;
                    if (!legend[ch]) {
                        result.errors.push(
                            `Unknown tile char "${ch}" at row ${y + 1}, col ${x + 1}.`
                        );
                    }
                }
            }
        } catch (e) {
            result.errors.push('Parse error: ' + e.message);
        }

        result.valid = result.errors.length === 0;
        return result;
    }

    // Count how many times each character appears.
    function getTileCounts(csvText) {
        const { grid } = parseCSV(csvText);
        const counts = {};
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                const ch = grid[y][x];
                counts[ch] = (counts[ch] || 0) + 1;
            }
        }
        return counts;
    }

    // Turn a tile definition into a tile object matching the engine's format.
    function makeTile(def) {
        const tile = {
            type: def.type,
            variant: def.variant !== undefined ? def.variant : 0
        };
        if (def.solid !== undefined) tile.solid = def.solid;
        if (def.target) tile.target = JSON.parse(JSON.stringify(def.target));

        // Copy any extra custom properties (not the reserved ones already handled).
        const reserved = new Set(['type', 'variant', 'solid', 'target', 'desc']);
        for (const key of Object.keys(def)) {
            if (!reserved.has(key)) {
                tile[key] = def[key];
            }
        }
        return tile;
    }

    // Build a full World from CSV text.
    //
    // Options:
    //   kind            - stored on world.kind (default 'underground')
    //   worldWidth      - total world width (default CONFIG.WORLD_WIDTH or 100)
    //   worldHeight     - total world height (default CONFIG.WORLD_HEIGHT or 100)
    //   offsetX / offsetY - where to place the CSV inside the world (default 0, 0)
    //   center          - if true, center the CSV inside the world (overrides offsetX/Y)
    //   fillChar        - char used to fill the rest of the world (default '#')
    //   defaultChar     - char used for empty CSV cells (default '.')
    function buildMapFromCSV(csvText, mapId, legend, options) {
        const usedLegend = legend || DEFAULT_LEGEND;
        const opts = options || {};
        const defaultChar = opts.defaultChar || '.';

        const validation = validateCSV(csvText, usedLegend, opts);
        if (!validation.valid) {
            console.error('CSV tilemap validation failed:', validation.errors);
            throw new Error('Invalid CSV tilemap:\n' + validation.errors.join('\n'));
        }

        const worldW = opts.worldWidth || (typeof CONFIG !== 'undefined' ? CONFIG.WORLD_WIDTH : 100);
        const worldH = opts.worldHeight || (typeof CONFIG !== 'undefined' ? CONFIG.WORLD_HEIGHT : 100);
        const fillChar = opts.fillChar || '#';
        const fillDef = usedLegend[fillChar] || usedLegend['#'];
        if (!fillDef) {
            throw new Error(`Fill char "${fillChar}" is not defined in the legend.`);
        }

        const { grid, width, height } = validation;

        let offsetX = opts.offsetX || 0;
        let offsetY = opts.offsetY || 0;
        if (opts.center) {
            offsetX = Math.floor((worldW - width) / 2);
            offsetY = Math.floor((worldH - height) / 2);
        }

        if (width + offsetX > worldW || height + offsetY > worldH) {
            throw new Error(
                `CSV map (${width}x${height}) + offset (${offsetX},${offsetY}) ` +
                `does not fit inside world (${worldW}x${worldH}).`
            );
        }

        // Create a blank world, then fill it to the requested size.
        const world = new World('blank', mapId || 'csv_map');
        world.kind = opts.kind || 'underground';
        world.csvWidth = width;
        world.csvHeight = height;
        world.csvOffsetX = offsetX;
        world.csvOffsetY = offsetY;

        for (let x = 0; x < worldW; x++) {
            world.tiles[x] = [];
            for (let y = 0; y < worldH; y++) {
                world.tiles[x][y] = makeTile(fillDef);
            }
        }

        // Stamp the CSV map into the world.
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const ch = grid[y][x] || defaultChar;
                const def = usedLegend[ch] || usedLegend[defaultChar];
                if (!def) continue;
                world.tiles[x + offsetX][y + offsetY] = makeTile(def);
            }
        }

        return world;
    }

    // Friendly alias.
    function translateCSVToWorld(csvText, mapId, legend, options) {
        return buildMapFromCSV(csvText, mapId, legend, options);
    }

    // Load a CSV file at runtime using p5.js loadStrings().
    // Provide a callback that receives the finished World object.
    function loadCSVFromFile(filePath, callback, mapId, legend, options) {
        if (typeof loadStrings !== 'function') {
            throw new Error(
                'CSV_TILEMAP.loadCSVFromFile needs p5.js loadStrings(). ' +
                'Make sure p5.js is loaded before calling this.'
            );
        }
        if (typeof callback !== 'function') {
            throw new Error('loadCSVFromFile requires a callback function.');
        }
        loadStrings(filePath, function (lines) {
            const text = Array.isArray(lines) ? lines.join('\n') : '';
            const world = buildMapFromCSV(text, mapId, legend, options);
            callback(world);
        }, function (err) {
            console.error('Failed to load CSV tilemap:', err);
            throw new Error('Failed to load CSV tilemap: ' + filePath);
        });
    }

    // Example 20x12 handcrafted underground layout.
    const EXAMPLE_MAP = [
        '#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#',
        '#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#',
        '#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#',
        '#,.,.,.,f,f,f,f,.,.,.,f,f,f,f,.,.,.,.,#',
        '#,.,.,.,f,.,.,f,.,.,.,f,.,.,f,.,.,.,.,#',
        '#,.,.,.,f,.,.,f,.,.,.,f,.,.,f,.,.,.,.,#',
        '#,.,.,.,f,f,d,f,.,.,.,f,f,d,f,.,.,.,.,#',
        '#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#',
        '#,.,.,c,.,p,.,.,.,c,.,p,.,.,.,c,.,.,.,#',
        '#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,^,.,#',
        '#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#',
        '#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#'
    ].join('\n');

    return {
        DEFAULT_LEGEND,
        EXAMPLE_MAP,
        parseCSV,
        validateCSV,
        getTileCounts,
        makeTile,
        buildMapFromCSV,
        translateCSVToWorld,
        loadCSVFromFile
    };
})();

// Expose to the browser (p5.js global mode).
if (typeof window !== 'undefined') {
    window.CSV_TILEMAP = CSV_TILEMAP;
}

// Expose to Node.js for quick testing / verification.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSV_TILEMAP;
}

# CSV Tile Map Translator — How-To Guide

A standalone helper for Cozy Island Game that turns a simple CSV text grid into an in-game `World` tile map. Keep this in your project until you are ready to wire it into `src/` files.

---

## What you get

- `tools/csv_tilemap_translator.js` — the translator code.
- `tools/HOW_TO_CSV_TILEMAP.md` — this file.

The translator does **not** change any `src/` files. It is designed so you can review it, test it, and only later build it into the game.

---

## Quick overview

1. Draw your map in a CSV file using one-character tile codes.
2. Load `csv_tilemap_translator.js` in `index.html` after `src/game.js`.
3. Call `CSV_TILEMAP.buildMapFromCSV()` to turn the CSV text into a `World` object.
4. Assign the result to `maps['underground']` (or any map id you want).

---

## Default tile legend

The translator ships with a default underground legend. Each cell in the CSV is a single character.

| Char | Tile type      | Solid | Purpose                           |
|------|----------------|-------|-----------------------------------|
| `#`  | `cave_wall`    | yes   | Surrounding rock / out-of-bounds  |
| `.`  | `cave_floor`   | no    | Open walkable stone floor         |
| `f`  | `foundation`   | no    | Building foundation pad           |
| `^`  | `portal`       | no    | Stairs / portal back to surface   |
| `c`  | `crystal`      | no    | Glowing crystal decoration          |
| `p`  | `pillar`       | yes   | Stone pillar                      |
| `w`  | `water`        | yes   | Underground water               |
| `~`  | `lava`         | yes   | Lava pool                         |
| `r`  | `tree_root`    | no    | Tree root decoration              |
| `d`  | `door`         | no    | Door marker                       |

The default portal (`^`) sends the player to the island at `(50, 50)` facing down.

---

## CSV format rules

- One row per line.
- Each cell is separated by a comma `,`.
- Every cell should contain exactly one character from the legend.
- All rows must have the same number of columns (rectangular map).
- Blank lines are ignored.

Example `assets/maps/underground.csv`:

```csv
#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#
#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#
#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#
#,.,.,.,f,f,f,f,.,.,.,f,f,f,f,.,.,.,.,#
#,.,.,.,f,.,.,f,.,.,.,f,.,.,f,.,.,.,.,#
#,.,.,.,f,.,.,f,.,.,.,f,.,.,f,.,.,.,.,#
#,.,.,.,f,f,d,f,.,.,.,f,f,d,f,.,.,.,.,#
#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#
#,.,.,c,.,p,.,.,.,c,.,p,.,.,.,c,.,.,.,#
#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,^,.,#
#,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,#
#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#,#
```

---

## Wiring into the game

### 1. Add the script tag

In `index.html`, add this **after** `src/game.js`:

```html
<script src="tools/csv_tilemap_translator.js"></script>
```

### 2. Replace the underground generator

In `src/game.js`, change `generateUnderground()` so it reads a CSV file instead of procedurally filling the world.

Old code (inside `World` class):

```js
generateUnderground() {
    const W = CONFIG.WORLD_WIDTH, H = CONFIG.WORLD_HEIGHT;
    const BORDER = 4;
    for (let x = 0; x < W; x++) {
        this.tiles[x] = [];
        for (let y = 0; y < H; y++) {
            const edge = Math.min(x, W - 1 - x, y, H - 1 - y);
            if (edge < BORDER) {
                this.tiles[x][y] = { type: 'cave_wall', variant: floor(random(3)), solid: true };
            } else {
                this.tiles[x][y] = { type: 'cave_floor', variant: floor(random(4)) };
            }
        }
    }
    // ... foundation pads, portal, buildings ...
}
```

New code:

```js
generateUnderground() {
    // 1. Build the whole map from CSV.
    const csv = CSV_TILEMAP.EXAMPLE_MAP;   // or load a file
    const built = CSV_TILEMAP.buildMapFromCSV(
        csv,
        'underground',
        CSV_TILEMAP.DEFAULT_LEGEND,
        { kind: 'underground', center: true, fillChar: '#' }
    );

    // 2. Copy the tiles from the built world into this one.
    this.tiles = built.tiles;
    this.csvOffsetX = built.csvOffsetX;
    this.csvOffsetY = built.csvOffsetY;
    this.csvWidth = built.csvWidth;
    this.csvHeight = built.csvHeight;

    // 3. Place buildings on foundation pads (optional).
    //    The translator keeps the `foundation` tile type, so existing
    //    `placeBuildingOnFoundation()` still works if you keep the pad definitions.
}
```

To load from a real file, use `loadStrings()` in `preload()`:

```js
let undergroundCSV;

function preload() {
    // ... other preloads ...
    undergroundCSV = loadStrings('assets/maps/underground.csv');
}
```

Then in `generateUnderground()`:

```js
const csvText = Array.isArray(undergroundCSV) ? undergroundCSV.join('\n') : '';
const built = CSV_TILEMAP.buildMapFromCSV(
    csvText,
    'underground',
    CSV_TILEMAP.DEFAULT_LEGEND,
    { kind: 'underground', center: true, fillChar: '#' }
);
this.tiles = built.tiles;
```

---

## Creating your own legend

You can pass a custom legend to `buildMapFromCSV()`. Each entry must have at least `type` and `variant`. `solid` is optional and defaults to unset (the engine falls back to `TILE_SOLID`).

```js
const MY_LEGEND = {
    '#': { type: 'cave_wall',  solid: true,  variant: 0 },
    '.': { type: 'cave_floor', solid: false, variant: 0 },
    'T': { type: 'tall_torch', solid: false, variant: 0, lightRadius: 3 },
    'E': { type: 'portal',     solid: false, variant: 0,
           target: { map: 'island', x: 50, y: 50, facing: 'down', label: 'Back to the island.' } }
};

const world = CSV_TILEMAP.buildMapFromCSV(csvText, 'my_map', MY_LEGEND);
```

Custom properties like `lightRadius` are copied onto each tile, so you can add gameplay behavior without changing the translator.

---

## Helper functions

### `CSV_TILEMAP.validateCSV(csvText, legend, options)`

Check a CSV for errors before building.

```js
const check = CSV_TILEMAP.validateCSV(csvText, CSV_TILEMAP.DEFAULT_LEGEND);
if (!check.valid) {
    console.error(check.errors);
}
```

### `CSV_TILEMAP.getTileCounts(csvText)`

See how many of each tile you used.

```js
console.log(CSV_TILEMAP.getTileCounts(csvText));
// { '#': 42, '.': 100, 'f': 12, ... }
```

### `CSV_TILEMAP.buildMapFromCSV(csvText, mapId, legend, options)`

The main function.

| Option       | Default           | Description                                           |
|--------------|-------------------|-------------------------------------------------------|
| `kind`       | `'underground'`   | Stored on `world.kind`                                |
| `worldWidth` | `CONFIG.WORLD_WIDTH` | Total width of the generated World                 |
| `worldHeight`| `CONFIG.WORLD_HEIGHT`| Total height of the generated World               |
| `offsetX`    | `0`               | Where to place the CSV inside the world               |
| `offsetY`    | `0`               | Where to place the CSV inside the world               |
| `center`     | `false`           | If true, center the CSV (overrides offset)            |
| `fillChar`   | `'#'`             | Tile used to fill the rest of the world               |
| `defaultChar`| `'.'`             | Tile used for empty CSV cells                         |

### `CSV_TILEMAP.loadCSVFromFile(path, callback, mapId, legend, options)`

Load a CSV at runtime using `loadStrings()`. Must be called after p5.js is ready.

```js
CSV_TILEMAP.loadCSVFromFile(
    'assets/maps/underground.csv',
    (world) => { maps['underground'] = world; },
    'underground'
);
```

---

## Testing in Node.js

The translator works in Node.js without p5.js. It needs a fake `World` constructor only if you call `buildMapFromCSV()`.

```js
const CSV_TILEMAP = require('./tools/csv_tilemap_translator.js');

// Minimal fake World for testing.
function World(kind, id) {
    this.kind = kind;
    this.id = id;
    this.tiles = [];
}
global.World = World;

const csv = CSV_TILEMAP.EXAMPLE_MAP;
const world = CSV_TILEMAP.buildMapFromCSV(csv, 'test');
console.log(world.tiles[1][1].type);  // 'cave_floor'
console.log(world.csvWidth, world.csvHeight); // 20 12
```

---

## Recommended workflow

1. Open a new file: `assets/maps/underground.csv`.
2. Sketch your layout with the default legend characters.
3. Run `CSV_TILEMAP.validateCSV()` to catch typos and uneven rows.
4. Use `CSV_TILEMAP.getTileCounts()` to make sure you have enough portals, foundations, etc.
5. Wire the translator into `generateUnderground()` and test.
6. When you are happy with the system, move the translator from `tools/` into `src/` if you want.

---

## Tips

- Keep one CSV per map: `assets/maps/underground.csv`, `assets/maps/dungeon_2.csv`, etc.
- Use `center: true` so the map floats in the middle of the world grid.
- Use `fillChar: '#'` so anything outside your CSV becomes solid rock.
- Add a `door` tile (`d`) where the player should enter a building; handle interaction separately.
- The translator does **not** add entities, NPCs, or items. Add those after the world is built.

---

## When you are ready to merge

1. Move `tools/csv_tilemap_translator.js` to `src/csv_tilemap_translator.js` (or keep it in `tools/` — both work).
2. Update the `<script>` tag in `index.html`.
3. Patch `World.generateUnderground()` to use `CSV_TILEMAP.buildMapFromCSV()`.
4. Create real CSV maps under `assets/maps/`.
5. Test on the local server: `python3 -m http.server 8765`.

Happy mapping! ★

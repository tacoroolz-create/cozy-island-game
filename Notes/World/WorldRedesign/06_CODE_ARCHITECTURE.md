# 06 — Code Architecture & Implementation Plan

> Exactly which files change, which functions get rewritten, and how the save migration works. This is the engineering blueprint.

---

## Branch Strategy

```bash
cd "/Users/clockworkwellness/Desktop/Cozy Island Game"
git checkout main
git checkout -b world-redesign
```

All world-redesign work stays on `world-redesign` until Charles says to merge. Per CLAUDE.md rules, finished work normally merges to main — but this is explicitly a fork until told otherwise, so **do not merge until the user approves.**

---

## File Change Map

| File | Change Type | Scope |
|------|-------------|-------|
| `src/game.js` | **Major rewrite** | `islandZone()` → `getBiome()`, `generateWorld()`, constants, dock/tunnel/pond positions, shop placement |
| `src/entities.js` | **Moderate rewrite** | `HANGOUT_SPOTS` → `BIOME_HANGOUTS`, `PERSONALITY_SCHEDULE`, shack placement, hangout slot logic |
| `src/save.js` | **Migration** | New migration v24→v25, `SAVE_VERSION` bump |
| `src/animals.js` | **Moderate additions** | New animal classes (goat, deer, owl, etc.), biome-restricted spawning |
| `src/dialogue_smalltalk.js` | **Additions** | New biome-flavored gossip lines, biome-aware ambient banks |
| `src/dialogue.js` | **Additions** | Biome-aware greeting prefixes, new interactions (fountain wish, overlook view) |
| `src/daycycle.js` | **Minor** | Holiday positioning may shift (some holidays now reference biome locations) |
| `src/gardening.js` | **Minor** | Garden plots pre-placed in town biome |
| `src/cafe.js` | **Minor** | Stimmy Tim's now in town (interior unchanged) |
| `src/club.js` | **Minor** | Black Goddess now in city (interior unchanged) |
| `src/recycle.js` | **Minor** | Recycle Bin now in city (interior unchanged) |
| `src/gettin.js` | **Minor** | Gettin' Place now on beach (mechanic unchanged) |
| `index.html` | **Minor** | Add any new script tags if new files are created |

### New Files (Optional, Phase 4-5)

| File | Purpose |
|------|---------|
| `src/biomes.js` | Biome definitions, `getBiome()`, `getElevation()`, biome constants — extracted from game.js |
| `src/biome_decorate.js` | Per-biome decoration functions — extracted from game.js `generateWorld()` |
| `src/mountain_cave.js` | Cave interior map (Phase 5) |

---

## Detailed Changes: `src/game.js`

### 1. Replace `islandZone()` with `getBiome()`

```js
// REMOVE:
const ISLAND = { SEA_MARGIN: 6, BEACH_THICKNESS: 5 };
function islandZone(x, y) { ... }

// ADD:
const BIOMES = {
    BEACH: 'beach', MEADOW: 'meadow', WOODS: 'woods',
    TOWN: 'town', CITY: 'city', DEEP_WOODS: 'deep_woods',
    MOUNTAIN: 'mountain', SEA: 'sea'
};
const SEA_MARGIN = 6;

function getBiome(x, y) {
    if (x < SEA_MARGIN || x >= CONFIG.WORLD_WIDTH - SEA_MARGIN ||
        y < SEA_MARGIN || y >= CONFIG.WORLD_HEIGHT - SEA_MARGIN) {
        return BIOMES.SEA;
    }
    if (x < 25 && y < 25) return BIOMES.BEACH;
    if (x >= 25 && x < 60 && y < 25) return BIOMES.MEADOW;
    if (x < 25 && y >= 25 && y < 56) return BIOMES.WOODS;
    if (x < 30 && y >= 56) return BIOMES.DEEP_WOODS;
    if (x >= 25 && x < 56 && y >= 25 && y < 56) return BIOMES.TOWN;
    if (x >= 56 && x < 81 && y >= 25 && y < 61) return BIOMES.CITY;
    if (x >= 60 && y >= 56) return BIOMES.MOUNTAIN;
    if (x >= 75 && y < 25) return BIOMES.MOUNTAIN;
    return BIOMES.WOODS;
}

function getBiomeSoft(x, y) {
    const noise = Math.sin(x * 0.3 + y * 0.2) * 2;
    const nx = Math.round(x + noise);
    const ny = Math.round(y + noise * 0.7);
    return getBiome(
        Math.max(0, Math.min(CONFIG.WORLD_WIDTH - 1, nx)),
        Math.max(0, Math.min(CONFIG.WORLD_HEIGHT - 1, ny))
    );
}

function getElevation(x, y) {
    const cx = 80, cy = 85;
    const dx = (x - cx) / 20;
    const dy = (y - cy) / 20;
    return Math.max(0, 1 - Math.sqrt(dx*dx + dy*dy));
}

function isRockyCoast(x, y) {
    const biome = getBiome(x, y);
    if (biome !== BIOMES.SEA) return false;
    // Check if adjacent land is mountain or deep woods (south/east coast)
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nb = getBiome(x+dx, y+dy);
        if (nb === BIOMES.MOUNTAIN || nb === BIOMES.DEEP_WOODS) return true;
    }
    return false;
}
```

### 2. Update `isNearBeach()` / `isNearSea()`

These functions reference `islandZone()` which no longer exists. Update them:

```js
function isNearZone(x, y, radius, zone) {
    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || nx >= CONFIG.WORLD_WIDTH || ny < 0 || ny >= CONFIG.WORLD_HEIGHT) continue;
            if (getBiome(nx, ny) === zone) return true;
        }
    }
    return false;
}
function isNearBeach(x, y, radius) { return isNearZone(x, y, radius, BIOMES.BEACH); }
function isNearSea(x, y, radius) { return isNearZone(x, y, radius, BIOMES.SEA); }
```

### 3. Add New Tile Types to `SPRITE_DEFS`

```js
// New biome terrain
'tiles.grass_dark':         'assets/tiles/grass_dark.png',
'tiles.mountain_grass':     'assets/tiles/mountain_grass.png',
'tiles.mountain_rock':      'assets/tiles/mountain_rock.png',
'tiles.snow':               'assets/tiles/snow.png',
'tiles.rocky_shore':        'assets/tiles/rocky_shore.png',
'tiles.cobblestone':        'assets/tiles/cobblestone.png',
'tiles.city_street':        'assets/tiles/city_street.png',
'tiles.plaza_tile':         'assets/tiles/plaza_tile.png',
'tiles.creek':              'assets/tiles/creek.png',
'tiles.mist':               'assets/tiles/mist.png',
'tiles.glowing_mushroom':   'assets/tiles/glowing_mushroom.png',
'tiles.forest_mushroom':    'assets/tiles/forest_mushroom.png',
'tiles.wildflower':         'assets/tiles/wildflower.png',
'tiles.clover':             'assets/tiles/clover.png',
'tiles.mountain_herb':      'assets/tiles/mountain_herb.png',
'tiles.fern':               'assets/tiles/fern.png',
'tiles.lantern_post':       'assets/tiles/lantern_post.png',    // 16x32
'tiles.fountain':           'assets/tiles/fountain.png',        // 32x32
'tiles.notice_board':       'assets/tiles/notice_board.png',
'tiles.sandcastle':         'assets/tiles/sandcastle.png',
// New trees
'tiles.twisted_tree':       'assets/tiles/twisted_tree.png',
'tiles.pine_tree':          'assets/tiles/pine_tree.png',
'tiles.oak_tree':           'assets/tiles/oak_tree.png',
'trees.willow':             'assets/tiles/willow_tree.png',
'trees.dead_tree':          'assets/tiles/dead_tree.png',
```

**All with error callbacks in `preload()`:**
```js
SPRITES['tiles.grass_dark'] = loadImage('assets/tiles/grass_dark.png', () => {}, (e) => { SPRITES['tiles.grass_dark'] = null; });
```

### 4. Update `TILE_SOLID`

```js
const TILE_SOLID = new Set([
    'sea', 'water', 'pond_water', 'tree', 'fir_tree', 'banana_tree', 'palm_tree',
    'rock', 'shiny_rock', 'rosebush', 'toast_target', 'ug_wall', 'ug_pit',
    // New:
    'mountain_rock', 'cliff_face', 'fountain', 'twisted_tree', 'pine_tree', 'oak_tree'
]);
```

### 5. Rewrite `generateWorld()`

See `01_ISLAND_LAYOUT.md` for the full rewrite. Key points:
- Replace the uniform terrain loop with `generateBiomeTile(x, y)`
- Replace the scatter-grid decoration pass with per-biome decoration functions
- Replace underground pad placement with surface shop placement
- Reposition dock, tunnel, pond

### 6. Surface Shop Placement

Replace `UNDERGROUND_STARTING_BUILDINGS` with surface placement:

```js
const SURFACE_SHOP_PLACEMENT = [
    { type: 'ug_gettin',       biome: 'beach',      x: 12, y: 18 },  // near dock
    { type: 'ug_stimmy_tims',  biome: 'town',       x: 42, y: 38 },  // town square
    { type: 'ug_recycle_bin',  biome: 'city',       x: 65, y: 35 },  // city plaza
    { type: 'ug_electric_temple', biome: 'city',    x: 72, y: 42 },  // city
    { type: 'ug_black_goddess',   biome: 'city',    x: 68, y: 50 },  // city
    { type: 'ug_inner_temple',    biome: 'deep_woods', x: 22, y: 80 }, // deep woods
    { type: 'ug_mubaba_fortress', biome: 'deep_woods', x: 15, y: 82 }, // deep woods
    { type: 'ug_bottomless_pit',  biome: 'deep_woods', x: 25, y: 88 }, // deep woods
];

function placeSurfaceShops() {
    for (const shop of SURFACE_SHOP_PLACEMENT) {
        // Verify the tile is in the right biome
        if (getBiome(shop.x, shop.y) !== shop.biome) continue;
        // Clear the area for the building footprint
        const tier = BUILDING_TIERS[shop.type];
        clearBuildingArea(shop.x, shop.y, tier.w, tier.h);
        // Place the building
        buildings.push(new Building(shop.type, shop.x, shop.y, null));
    }
}
```

### 7. Update Position Constants

```js
// Dock → NW beach
const ISLAND_DOCK_ORIGIN  = { x: 0, y: 10 };
const ISLAND_DOCK_W = 8, ISLAND_DOCK_H = 4;
const ISLAND_DOCK_ARRIVAL = { x: ISLAND_DOCK_ORIGIN.x + ISLAND_DOCK_W, y: ISLAND_DOCK_ORIGIN.y + 2 };

// Tunnel → Deep Woods
const ISLAND_TUNNEL_ORIGIN = { x: 15, y: 70 };
const UNDERGROUND_TUNNEL_LANDING = { x: 75, y: 11 }; // unchanged

// Pond → Meadow
const ISLAND_POND_ORIGIN = { x: 40, y: 15 };
```

### 8. Update `getTileSprite()` (or equivalent tile drawing)

Add cases for new tile types in the tile drawing switch:

```js
function getTileSprite(tile) {
    switch(tile.type) {
        case 'grass_dark': return SPRITES['tiles.grass_dark'];
        case 'mountain_grass': return SPRITES['tiles.mountain_grass'];
        case 'mountain_rock': return SPRITES['tiles.mountain_rock'];
        case 'snow': return SPRITES['tiles.snow'];
        case 'rocky_shore': return SPRITES['tiles.rocky_shore'];
        case 'cobblestone': return SPRITES['tiles.cobblestone'];
        case 'city_street': return SPRITES['tiles.city_street'];
        case 'plaza_tile': return SPRITES['tiles.plaza_tile'];
        case 'creek': return SPRITES['tiles.creek'];
        case 'mist': return SPRITES['tiles.mist'];
        case 'glowing_mushroom': return SPRITES['tiles.glowing_mushroom'];
        case 'forest_mushroom': return SPRITES['tiles.forest_mushroom'];
        case 'wildflower': return SPRITES['tiles.wildflower'];
        case 'clover': return SPRITES['tiles.clover'];
        case 'mountain_herb': return SPRITES['tiles.mountain_herb'];
        case 'fern': return SPRITES['tiles.fern'];
        case 'lantern_post': return SPRITES['tiles.lantern_post'];
        case 'fountain': return SPRITES['tiles.fountain'];
        case 'notice_board': return SPRITES['tiles.notice_board'];
        case 'sandcastle': return SPRITES['tiles.sandcastle'];
        case 'twisted_tree': return SPRITES['tiles.twisted_tree'];
        case 'pine_tree': return SPRITES['tiles.pine_tree'];
        case 'oak_tree': return SPRITES['tiles.oak_tree'];
        // ... existing cases
    }
}
```

Add **colored-rectangle fallbacks** for every new tile type in the draw function when sprite is null.

### 9. New Interaction Hooks

```js
// In keyPressed() and mousePressed(), before tryHarvest():

// Fountain wish
if (typeof tryFountainWish === 'function' && tryFountainWish()) return;

// Overlook view
if (typeof tryOverlookView === 'function' && tryOverlookView()) return;

// Horizon watch
if (typeof tryHorizonWatch === 'function' && tryHorizonWatch()) return;

// Notice board
if (typeof tryReadNoticeBoard === 'function' && tryReadNoticeBoard()) return;

// Biome-specific harvesting (wildflowers, mushrooms, herbs)
if (typeof tryBiomeHarvest === 'function' && tryBiomeHarvest()) return;

tryHarvest(); // existing
```

---

## Detailed Changes: `src/entities.js`

### 1. Replace `HANGOUT_SPOTS` with `BIOME_HANGOUTS`

See `03_NPC_PLACEMENT.md` for the full `BIOME_HANGOUTS` definition. Replace the fixed-coordinate spots with biome-relative spots.

### 2. Replace `PERSONALITY_SCHEDULE`

Update schedule entries from fixed spot names to `biome:spot` format.

### 3. Update `findHangoutSpot()` / `hangoutSlotTaken()`

Rewrite to parse `biome:spot` format and check biome zone capacity.

### 4. Update Shack Placement

Replace random grass scatter with `TOWN_SHACK_PLOTS` system. When `checkArrivals()` places a new NPC shack, use `assignShackPlot()` instead of `findClearGrassNear()`.

### 5. Update NPC Spawn Position

New arrivals appear at the dock (new position) and walk to their town shack plot.

```js
// NPC spawns at dock arrival point
const SPAWN_POINT = { x: ISLAND_DOCK_ARRIVAL.x, y: ISLAND_DOCK_ARRIVAL.y };
```

---

## Detailed Changes: `src/save.js`

### Migration v24 → v25

```js
// v24 → v25: World redesign — biome terrain + shop relocation
function(data) {
    if (data.world && data.world.tiles) {
        // Rewrite terrain tiles based on new biome map
        for (let x = 0; x < data.world.tiles.length; x++) {
            if (!data.world.tiles[x]) continue;
            for (let y = 0; y < data.world.tiles[x].length; y++) {
                const t = data.world.tiles[x][y];
                if (!t) continue;
                const biome = getBiomeSoft(x, y);

                // Convert grass to biome-specific variants
                if (t.type === 'grass') {
                    if (biome === BIOMES.DEEP_WOODS) {
                        data.world.tiles[x][y] = { type: 'grass_dark', variant: 0 };
                    } else if (biome === BIOMES.MOUNTAIN) {
                        const elev = getElevation(x, y);
                        if (elev > 0.7) data.world.tiles[x][y] = { type: 'snow', variant: 0 };
                        else if (elev > 0.4) data.world.tiles[x][y] = { type: 'mountain_rock', variant: 0, solid: true };
                        else data.world.tiles[x][y] = { type: 'mountain_grass', variant: 0 };
                    }
                }

                // Beach tiles outside beach biome → rocky_shore
                if (t.type === 'beach' && biome !== BIOMES.BEACH && biome !== BIOMES.SEA) {
                    data.world.tiles[x][y] = { type: 'rocky_shore', variant: 0 };
                }
            }
        }
    }

    // Move shop buildings to surface
    // Remove old underground building entries, add surface shop buildings
    if (data.buildings) {
        data.buildings = data.buildings.filter(b =>
            !b.type || !b.type.startsWith('ug_') || b.type === 'ug_mubaba_fortress'
        );
        // Surface shops will be placed by placeSurfaceShops() on next world generation
    }

    // NPC positions: will be re-routed by schedule system on next time-bucket change
    // NPC shacks: stay where they are (may be outside town, that's OK)

    // Reset hangout schedule cache so NPCs pick new biome spots
    if (data.npcs) {
        for (const npc of data.npcs) {
            if (npc._sched) npc._sched = {};
        }
    }

    return data;
}
```

### `SAVE_VERSION` Bump

```js
const SAVE_VERSION = 25; // was 24
```

---

## Detailed Changes: `src/animals.js`

### New Animal Classes

Add new animal types following the existing `Animal` class pattern:

```js
// Mountain Goat
class MountainGoat extends Animal { ... }
// spawn: mountain biome, daytime, wanders rocky terrain

// Deer
class Deer extends Animal { ... }
// spawn: woods biome, dawn/dusk, flees from player

// Owl
class Owl extends Animal { ... }
// spawn: woods/deep_woods, night, perches on trees

// Eagle
class Eagle extends Animal { ... }
// spawn: mountain, clear weather, soars (screen-space visual)

// Fox
class Fox extends Animal { ... }
// spawn: woods/deep_woods, dawn/dusk/night, sly wanderer

// WildRabbit
class WildRabbit extends Animal { ... }
// spawn: meadow, daytime, hops between clover

// Bat
class Bat extends Animal { ... }
// spawn: deep_woods/mountain, night, erratic flight

// StreamFish
class StreamFish extends Animal { ... }
// spawn: woods creek, daytime, visible under water
```

### Biome-Restricted Spawning

Update `spawnAnimals()` to check biome:

```js
function spawnAnimals() {
    // Beach animals
    spawnInBiome('crab', BIOMES.BEACH, 3 + floor(random(3)));
    spawnInBiome('seagull', BIOMES.BEACH, 2 + floor(random(2)));
    if (world.season === 'Saucy') spawnInBiome('turtle', BIOMES.BEACH, 2);

    // Meadow animals
    spawnInBiome('butterfly', BIOMES.MEADOW, 5 + floor(random(5)));
    spawnInBiome('wild_rabbit', BIOMES.MEADOW, 2 + floor(random(2)));

    // Woods animals
    spawnInBiome('bird', BIOMES.WOODS, 5 + floor(random(5)));
    spawnInBiome('deer', BIOMES.WOODS, 1 + floor(random(2)));
    if (getTimeOfDay() === 'night') spawnInBiome('owl', BIOMES.WOODS, 1 + floor(random(2)));

    // Deep Woods animals
    spawnInBiome('cicada', BIOMES.DEEP_WOODS, 3 + floor(random(3)));
    if (world.season === 'Saucy') spawnInBiome('fox', BIOMES.DEEP_WOODS, 1);
    if (getTimeOfDay() === 'night') spawnInBiome('bat', BIOMES.DEEP_WOODS, 3 + floor(random(3)));

    // Mountain animals
    spawnInBiome('mountain_goat', BIOMES.MOUNTAIN, 2 + floor(random(2)));
    if (getCurrentWeather() === 'clear') spawnInBiome('eagle', BIOMES.MOUNTAIN, 1);

    // Town birds (a few)
    spawnInBiome('bird', BIOMES.TOWN, 2 + floor(random(2)));
}

function spawnInBiome(type, biome, count) {
    for (let i = 0; i < count; i++) {
        // Find a random tile in the target biome
        for (let attempts = 0; attempts < 50; attempts++) {
            const x = floor(random(CONFIG.WORLD_WIDTH));
            const y = floor(random(CONFIG.WORLD_HEIGHT));
            if (getBiome(x, y) !== biome) continue;
            if (isSolidTile(x, y)) continue;
            spawnAnimal(type, x, y);
            break;
        }
    }
}
```

---

## Implementation Order (Phases)

### Phase 1: Terrain & Biomes (Core — 3-5 sessions)
1. Create `world-redesign` branch
2. Add `getBiome()` / `getBiomeSoft()` / `getElevation()` to game.js
3. Add new tile types to `SPRITE_DEFS` with error callbacks
4. Add new tiles to `TILE_SOLID`
5. Rewrite `generateWorld()` with biome-based generation
6. Add per-biome decoration functions
7. Reposition dock, tunnel, pond constants
8. Replace `islandZone()` calls with `getBiome()` calls
9. Add save migration v24→v25
10. Syntax check all files: `for f in src/*.js; do node --check "$f"; done`
11. Test in browser — verify biomes generate, dock works, player spawns correctly

### Phase 2: Shop Relocation (1-2 sessions)
1. Define `SURFACE_SHOP_PLACEMENT` array
2. Add `placeSurfaceShops()` function
3. Remove underground pad-based shop spawning (keep underground map for quest content)
4. Verify each shop is enterable and functional on the surface
5. Update tunnel logic (tunnel now in deep woods)

### Phase 3: NPC Hangouts (1-2 sessions)
1. Replace `HANGOUT_SPOTS` with `BIOME_HANGOUTS`
2. Rewrite `PERSONALITY_SCHEDULE` with biome:spot format
3. Update `findHangoutSlot()` for biome-relative placement
4. Implement `TOWN_SHACK_PLOTS` for NPC home clustering
5. Test: verify NPCs go to correct biomes at correct times
6. Add biome-flavored gossip lines to `dialogue_smalltalk.js`

### Phase 4: New Wildlife & Flora (2-3 sessions)
1. Add new animal classes to `animals.js`
2. Add biome-restricted spawning
3. Add new harvestable plant tiles
4. Add new items (`glow_cap`, `wildflower`, `clover`, `mountain_herb`, etc.)
5. Update `PERSONALITY_LOVED_ITEMS` with new gift items
6. Add biome-specific ambient sounds (procedural audio)

### Phase 5: Polish & New Content (Ongoing)
1. New interaction hooks (fountain wish, overlook view, horizon watch, notice board)
2. New NPCs (Granite the goat, Pip the raccoon, etc.)
3. Biome-specific holiday variants
4. Mountain cave interior map
5. Biome palettes for Pixsplat
6. Seasonal biome tile variants

---

## Verification Checklist

After each phase:

```bash
# 1. Syntax check all source files
for f in src/*.js; do node --check "$f" || echo "FAIL: $f"; done

# 2. Verify SAVE_VERSION was bumped
grep "SAVE_VERSION" src/save.js

# 3. Verify no islandZone references remain
grep -r "islandZone" src/ | grep -v "//"

# 4. Verify all new SPRITE_DEFS have error callbacks
grep -c "loadImage.*() => {}.*(e)" src/game.js

# 5. Verify biome function works
node -e "
function getBiome(x,y) {
    if (x<6||x>=94||y<6||y>=94) return 'sea';
    if (x<25&&y<25) return 'beach';
    if (x>=25&&x<60&&y<25) return 'meadow';
    if (x<25&&y>=25&&y<56) return 'woods';
    if (x<30&&y>=56) return 'deep_woods';
    if (x>=25&&x<56&&y>=25&&y<56) return 'town';
    if (x>=56&&x<81&&y>=25&&y<61) return 'city';
    if (x>=60&&y>=56) return 'mountain';
    if (x>=75&&y<25) return 'mountain';
    return 'woods';
}
// Test key positions
console.log('Dock (0,12):', getBiome(0,12)); // sea
console.log('Beach (12,15):', getBiome(12,15)); // beach
console.log('Meadow (40,15):', getBiome(40,15)); // meadow
console.log('Woods (12,40):', getBiome(12,40)); // woods
console.log('Town (40,40):', getBiome(40,40)); // town
console.log('City (65,40):', getBiome(65,40)); // city
console.log('Deep woods (15,75):', getBiome(15,75)); // deep_woods
console.log('Mountain (85,80):', getBiome(85,80)); // mountain
"

# 6. Browser test: verify game loads, player spawns at dock, biomes render
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Old saves break | Medium | High | Migration v24→v25 rewrites terrain; player buildings/crops preserved |
| NPC schedules break | Medium | Medium | Schedule system is self-correcting (re-plans on time-bucket change) |
| Shop interiors don't work on surface | Low | High | Interiors are map-independent — building code already works on any map |
| Underground map access breaks | Low | Medium | Tunnel logic unchanged, just repositioned |
| Performance hit from more tile types | Low | Low | Tile drawing is already O(visible tiles); new types are just more switch cases |
| Missing sprites cause blank tiles | Medium | Low | Error callbacks + colored rectangle fallbacks |
| Biome boundaries look unnatural | Medium | Low | Zone softening with noise; can adjust boundaries after visual test |
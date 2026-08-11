# 01 — Island Layout & Coordinate Map

> The technical blueprint: biome boundaries, coordinate ranges, terrain generation rewrite, and world shape.

---

## World Grid

The world stays **100×100 tiles** (CONFIG.WORLD_WIDTH/HEIGHT unchanged). What changes is how tiles are classified and generated.

### Current System (being replaced)

```js
const ISLAND = { SEA_MARGIN: 6, BEACH_THICKNESS: 5 };
function islandZone(x, y) {
    const edge = Math.min(x, 100-1-x, y, 100-1-y);
    if (edge < 6) return 'sea';
    if (edge < 11) return 'beach';
    return 'grass';
}
```

This produces a uniform square: sea ring → beach ring → grass everywhere. Simple, but no spatial identity.

### New System: Biome Zone Map

Instead of edge-distance, we use a **biome zone map** — a function that returns a biome id for any (x, y) coordinate. The map is hand-defined as a set of rectangular and polygonal regions, then softened with a small noise function for organic edges.

```js
const BIOMES = {
    BEACH:      'beach',
    MEADOW:     'meadow',
    WOODS:      'woods',
    TOWN:       'town',
    CITY:       'city',
    DEEP_WOODS: 'deep_woods',
    MOUNTAIN:   'mountain',
    SEA:        'sea'
};
```

---

## Biome Coordinate Map

```
    0         25        50        75       100
 0  ┌─────────┬─────────┬─────────┬─────────┐
    │  BEACH  │  MEADOW │  MEADOW │ MOUNTAIN│
    │  (dock) │         │         │         │
 25 ├─────────┼─────────┼─────────┤         │
    │  BEACH  │  WOODS  │  TOWN   │  CITY   │
    │         │         │         │         │
 50 ├─────────┼─────────┼─────────┼─────────┤
    │  SEA/   │ DEEP    │  TOWN/  │  CITY/  │
    │  coast  │ WOODS   │  WOODS  │ MOUNTAIN│
    │         │ (fort,  │  border │         │
 75 │         │  pit)   │         │ MOUNTAIN│
    │         │         │         │         │
100 └─────────┴─────────┴─────────┴─────────┘
```

### Precise Biome Boundaries

Biomes are defined as rectangles (with optional coastal rounding). All coordinates are tile-space (0-99).

| Biome | X range | Y range | Notes |
|-------|---------|---------|-------|
| **BEACH** | 0–24 | 0–24 | NW corner. Dock at (0, 10–14). Ocean on N and W edges. |
| **MEADOW** | 25–60 | 0–24 | North-central. Open grass, flowers, pond. Borders beach on W, mountain on E. |
| **WOODS** | 0–24 | 25–55 | West-central. Forested, creek running N→S. |
| **TOWN** | 25–55 | 25–55 | Center of the island. NPC shacks cluster here. Market square, fountain. |
| **CITY** | 56–80 | 25–60 | East-central. Urban buildings, shops, plaza. |
| **DEEP_WOODS** | 0–30 | 56–99 | SW. Darker forest, Mubaba's Fortress, Bottomless Pit. |
| **MOUNTAIN** | 60–99 | 56–99 (also 75–99, 0–24) | SE corner + NE strip. Rocky cliffs, cave, overlook. |
| **SEA** | All outer edges | | Ocean surrounds the island. N and W edges by beach are open water. S and E edges by mountain are rocky coast. |

### Coastal Variation

The island is no longer a clean rectangle. The coastline varies:

- **North edge (y=0–5):** Open ocean (beach/meadow/mountain shore)
- **West edge (x=0–5):** Open ocean (beach/woods shore)
- **South edge (y=95–99):** Rocky coast (deep woods / mountain shore)
- **East edge (x=95–99):** Rocky coast (city / mountain shore)

The beach biome only exists in the NW. Other coastal areas use `rocky_shore` tiles (a new beach-adjacent tile type that reads as "rocky coastline" rather than "sandy beach").

### `getBiome(x, y)` Implementation

```js
function getBiome(x, y) {
    // Sea: outer ring
    if (x < SEA_MARGIN || x >= CONFIG.WORLD_WIDTH - SEA_MARGIN ||
        y < SEA_MARGIN || y >= CONFIG.WORLD_HEIGHT - SEA_MARGIN) {
        return BIOMES.SEA;
    }

    // BEACH: NW corner quadrant
    if (x < 25 && y < 25) return BIOMES.BEACH;

    // MEADOW: north-central band
    if (x >= 25 && x < 60 && y < 25) return BIOMES.MEADOW;

    // WOODS: west-central
    if (x < 25 && y >= 25 && y < 56) return BIOMES.WOODS;

    // DEEP_WOODS: SW
    if (x < 30 && y >= 56) return BIOMES.DEEP_WOODS;

    // TOWN: center
    if (x >= 25 && x < 56 && y >= 25 && y < 56) return BIOMES.TOWN;

    // CITY: east-central
    if (x >= 56 && x < 81 && y >= 25 && y < 61) return BIOMES.CITY;

    // MOUNTAIN: SE + NE strip
    if (x >= 60 && y >= 56) return BIOMES.MOUNTAIN;
    if (x >= 75 && y < 25) return BIOMES.MOUNTAIN;

    // Fallback (edge cases between zones)
    return BIOMES.WOODS;
}
```

### Zone Softening

To avoid hard rectangular edges between biomes, apply a **fract-of-sine noise** at biome boundaries:

```js
function getBiomeSoft(x, y) {
    const base = getBiome(x, y);
    // Only soften at boundaries (where neighboring tiles differ)
    const noise = Math.sin(x * 0.3 + y * 0.2) * 2;
    const nx = Math.round(x + noise);
    const ny = Math.round(y + noise * 0.7);
    return getBiome(nx, ny);
}
```

This creates slightly wavy, organic biome borders while keeping the overall structure readable.

---

## Terrain Generation Rewrite

### `generateWorld()` — New Version

```js
generateWorld() {
    // 1. Base terrain: assign biome to each tile
    for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
        this.tiles[x] = [];
        for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
            this.tiles[x][y] = this.generateBiomeTile(x, y);
        }
    }

    // 2. Biome-specific decoration pass
    this.decorateBeach();
    this.decorateMeadow();
    this.decorateWoods();
    this.decorateTown();
    this.decorateCity();
    this.decorateDeepWoods();
    this.decorateMountain();

    // 3. Shared features (unchanged)
    if (this.day >= TUNNEL_REVEAL_DAY) {
        this.placeTunnel(/* new location in deep woods */);
    }
    this.placeDock(ISLAND_DOCK_ORIGIN.x, ISLAND_DOCK_ORIGIN.y);
    this.placePond(/* meadow pond location */);

    // 4. Shop building placement (replaces underground pad system)
    this.placeSurfaceShops();
}
```

### `generateBiomeTile(x, y)`

```js
generateBiomeTile(x, y) {
    const biome = getBiomeSoft(x, y);

    // Sea and coast
    if (biome === BIOMES.SEA) {
        // Check if near land → rocky_shore for S/E coasts
        if (isRockyCoast(x, y)) {
            return { type: 'rocky_shore', variant: floor(random(3)) };
        }
        return { type: 'sea', variant: floor(random(3)) };
    }

    // Beach
    if (biome === BIOMES.BEACH) {
        // Edge tiles near sea stay beach; interior transitions to meadow grass
        if (isNearSea(x, y, 2)) {
            return { type: 'beach', variant: floor(random(3)) };
        }
        return { type: 'grass', variant: floor(random(3)) }; // beach interior is still walkable grass
    }

    // Meadow
    if (biome === BIOMES.MEADOW) {
        return { type: 'grass', variant: floor(random(3)) };
    }

    // Woods
    if (biome === BIOMES.WOODS) {
        return { type: 'grass', variant: floor(random(3)) }; // trees placed in decorate pass
    }

    // Town
    if (biome === BIOMES.TOWN) {
        return { type: 'grass', variant: floor(random(3)) }; // paths placed in decorate pass
    }

    // City
    if (biome === BIOMES.CITY) {
        return { type: 'grass', variant: floor(random(3)) }; // paths + buildings in decorate pass
    }

    // Deep Woods
    if (biome === BIOMES.DEEP_WOODS) {
        return { type: 'grass_dark', variant: floor(random(3)) }; // new darker grass tile
    }

    // Mountain
    if (biome === BIOMES.MOUNTAIN) {
        const elev = getElevation(x, y);
        if (elev > 0.7) return { type: 'snow', variant: floor(random(2)) };
        if (elev > 0.4) return { type: 'mountain_rock', variant: floor(random(3)), solid: true };
        return { type: 'mountain_grass', variant: floor(random(2)) };
    }

    return { type: 'grass', variant: 0 };
}
```

### Biome Decoration Functions

Each decoration function scatters biome-appropriate features:

| Function | Scatters |
|----------|----------|
| `decorateBeach()` | Palm trees (near water), seashells, driftwood, beach pebbles |
| `decorateMeadow()` | Wildflowers (rosebushes, tulips), tall grass, butterfly attractors, small pond |
| `decorateWoods()` | Regular trees (denser scatter), mushrooms, rocks, creek tiles |
| `decorateTown()` | Cobblestone paths, lantern posts, fountain, NPC shack pads |
| `decorateCity()` | Wider paths/streets, street lamps, plaza tiles, shop building pads |
| `decorateDeepWoods()` | Darker/fir trees (dense), glowing mushrooms, mist tiles, fortress + pit |
| `decorateMountain()` | Pine trees (sparse), boulders, cliff faces, cave entrance, snow patches |

---

## Elevation System (Mountain Only)

The mountain biome uses a simple elevation model to create height variation:

```js
function getElevation(x, y) {
    // Elevation increases toward the SE corner of the mountain biome
    const cx = 80, cy = 85; // mountain center
    const dx = (x - cx) / 20;
    const dy = (y - cy) / 20;
    const dist = Math.sqrt(dx*dx + dy*dy);
    return Math.max(0, 1 - dist);
}
```

Elevation affects:
- **0.0–0.4:** Mountain grass (walkable, sparse pines)
- **0.4–0.7:** Mountain rock (solid, requires pathfinding around)
- **0.7–1.0:** Snow (walkable, visual only)

No actual heightmap rendering — this is a 2D top-down game. Elevation just determines tile type and creates a visual gradient from grass → rock → snow as you walk toward the peak.

---

## Dock Position

The dock moves to the **northwest beach** to match the new layout:

```js
// OLD: west beach, y=48 (middle of west edge)
const ISLAND_DOCK_ORIGIN = { x: 0, y: 48 };

// NEW: northwest beach, y=12 (upper portion of beach biome)
const ISLAND_DOCK_ORIGIN = { x: 0, y: 10 };
const ISLAND_DOCK_W = 8, ISLAND_DOCK_H = 4;
const ISLAND_DOCK_ARRIVAL = { x: 8, y: 12 };
```

The dock extends west into the sea from the beach. The arrival point (where NPCs and guests appear) is on the beach tile just east of the dock.

---

## Tunnel Position

The tunnel to the underground moves to the **deep woods** (since Mubaba's fortress is there):

```js
// OLD: near-center (47, 39)
const ISLAND_TUNNEL_ORIGIN = { x: 47, y: 39 };

// NEW: in deep woods, near Mubaba's Fortress
const ISLAND_TUNNEL_ORIGIN = { x: 15, y: 70 };
```

The underground map itself stays the same size and layout — it's now accessed from the deep woods and is themed as Mubaba's domain / the Underworld.

---

## Pond Position

The pond (which connects to the underground pond via portal) moves to the **meadow**:

```js
// OLD: near-center
// NEW: meadow area
const ISLAND_POND_ORIGIN = { x: 40, y: 15 };
```

---

## NPC Shack Clustering

Currently, NPC shacks scatter randomly on grass. In the new layout, they cluster in the **Town** biome:

```js
// In checkArrivals() or building placement:
function findShackSpot(npcId) {
    const biome = BIOMES.TOWN;
    // Pick a random tile in the town biome that's clear
    for (let attempts = 0; attempts < 200; attempts++) {
        const x = 27 + floor(random(26));
        const y = 27 + floor(random(26));
        if (getBiome(x, y) !== BIOMES.TOWN) continue;
        if (this.tiles[x][y].type !== 'grass') continue;
        if (isNearBeach(x, y, 5)) continue;
        // Check clearance for 4x4 shack
        if (isClearArea(this.tiles, x, y, 4, 4)) return { x, y };
    }
    // Fallback: any grass tile
    return findClearGrassNear(50, 40, 0, 30);
}
```

This creates a proper town where NPC homes are clustered together, with paths connecting them.

---

## Save Migration

**Bump SAVE_VERSION from 24 to 25.**

The migration rewrites all terrain tiles based on the new biome map:

```js
// v24 → v25: world redesign biome terrain
function(data) {
    if (data.world && data.world.tiles) {
        for (let x = 0; x < data.world.tiles.length; x++) {
            for (let y = 0; y < data.world.tiles[x].length; y++) {
                const t = data.world.tiles[x][y];
                const biome = getBiomeSoft(x, y);

                // Convert old uniform tiles to biome-appropriate tiles
                if (t.type === 'grass') {
                    if (biome === 'deep_woods') {
                        data.world.tiles[x][y] = { type: 'grass_dark', variant: 0 };
                    } else if (biome === 'mountain') {
                        const elev = getElevation(x, y);
                        if (elev > 0.7) data.world.tiles[x][y] = { type: 'snow', variant: 0 };
                        else if (elev > 0.4) data.world.tiles[x][y] = { type: 'mountain_rock', variant: 0, solid: true };
                        else data.world.tiles[x][y] = { type: 'mountain_grass', variant: 0 };
                    }
                    // Other biomes keep 'grass' — it's still correct
                }

                // Beach ring tiles outside the NW beach biome become rocky_shore
                if (t.type === 'beach' && biome !== 'beach') {
                    data.world.tiles[x][y] = { type: 'rocky_shore', variant: 0 };
                }
            }
        }

        // Move dock, tunnel, pond to new positions
        // (handled by revealIslandTunnel and placeDock on next load)
    }

    // Move underground shop buildings to surface positions
    // (the UNDERGROUND_STARTING_BUILDINGS are replaced by SURFACE_SHOP_PLACEMENT)

    return data;
}
```

### Migration Considerations

- **NPC positions:** NPCs that were standing on old hangout spots will be re-routed on next time-bucket change (their schedule system handles this).
- **Buildings:** Player-built shacks/twig towers stay where they are. NPC shacks may end up outside the town biome — that's OK, they're still functional. New arrivals will cluster in town.
- **Trees/harvestables:** Player-planted crops and gardens stay. Wild trees that were on what is now mountain/deep_woods terrain may look slightly odd (regular tree on dark grass) but are still harvestable.
- **The simplest approach:** for a pre-redesign save, just regenerate the world terrain and keep player-placed items/buildings. The migration marks player-placed tiles (crops, placed furniture) with a flag so they survive the terrain rewrite.
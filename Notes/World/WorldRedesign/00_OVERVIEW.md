# Cozy Island World Redesign — Master Overview

> **Branch:** `world-redesign` (forked from `main`)
> **Created:** August 10, 2026
> **Status:** PLANNING — no code changes yet
> **Goal:** Replace the uniform square island with a multi-biome world that preserves all existing systems while adding spatial variety, new gameplay zones, and richer exploration.

---

## What We're Changing

The current island is a 100×100 square: a uniform beach ring, uniform grass interior, and a single underground map. Everything is procedurally placed on a 10×10 scatter grid with no spatial identity — trees, rocks, and NPCs are evenly distributed with no sense of *place*.

This redesign introduces **7 distinct surface biomes** and reworks the underground as a **deep woods** zone, creating a world where exploration matters, NPCs have favorite hangouts, and each area has its own mood, flora, wildlife, and gameplay hooks.

### Design Principles

1. **Preserve everything** — all existing systems (save, dialogue, holidays, animals, buildings, crafting, gardening, weather, seasons) work unchanged in the new layout. We're reshaping the canvas, not repainting it.
2. **Biome as vibe, not as mechanic** — biomes differ in terrain tiles, decorations, wildlife spawns, and NPC hangout spots. No biome locks content behind a gate; they're about *feel*.
3. **Flow from the dock** — the player arrives at the northwest beach dock and naturally flows inward: beach → meadow → woods → town → (city / deep woods / mountain as branches).
4. **Town and City split the underground shops** — the 8 underground buildings (Mubaba's Fortress, Gettin' Place, Recycle Bin, Inner Temple, Electric Temple, Black Goddess, Stimmy Tim's, Bottomless Pit) get redistributed: cozy ones move to the Town, flashier ones to the City. The underground map remains for Mubaba's fortress scene and the Bottomless Pit.
5. **Dream logic** — the world is a dream, so biome transitions can be slightly surreal. A meadow can edge into deep woods without a realistic ecological boundary. Mountains can rise from tropical beach climate. This is *fine*.

---

## Biome Summary

| # | Biome | Position | Size (approx tiles) | Vibe | Key Feature |
|---|-------|----------|---------------------|------|-------------|
| 1 | **Beach** | NW corner | ~25×25 | Tropical, arrivals | Dock, horizon, seashells |
| 2 | **Meadow** | N-central, inland from beach | ~30×25 | Open, flowery, peaceful | Wildflowers, butterflies, pond |
| 3 | **Woods** | Central-west | ~30×30 | Forested, dappled light | Trees, mushrooms, creek |
| 4 | **Town** | Central | ~25×25 | Homey, shops, cottages | NPC shacks, market, fountain |
| 5 | **City** | E-central | ~25×25 | Bustling, urban-cozy | Shops (from underground), plaza |
| 6 | **Deep Woods** | SW | ~25×30 | Spooky-cozy, misty | Mubaba's Fortress, Bottomless Pit |
| 7 | **Mountain** | SE/E edge | ~30×30 | Alpine, rocky | Cliffs, cave, overlook, goats |

The island is no longer a clean rectangle — it has an irregular coastline with the beach concentrated in the northwest. The remaining coastline is rocky/mountainous on the east and south, with smaller beach pockets.

---

## Shop Redistribution (Underground → Surface)

| Building | Current | New Location | Rationale |
|----------|---------|-------------|-----------|
| **Stimmy Tim's** (cafe) | Underground pad 4 | **Town** | Coffee shop belongs in a town square |
| **Gettin' Place** (treasure fishing) | Underground pad 3 | **Beach/Dock** | Fishing gear belongs by the water |
| **Recycle Bin** (sell for IOUs) | Underground pad 5 | **City** | Urban commerce vibe |
| **Inner Temple** (meditation) | Underground pad 0 | **Deep Woods** | Quiet, mystical, away from town |
| **Electric Temple** | Underground pad 2 | **City** | Neon/tech vibe fits urban |
| **Black Goddess** (nightclub) | Underground pad 6 | **City** | Nightlife belongs in the city |
| **Mubaba's Fortress** | Underground pad 1 | **Deep Woods** | Stays spooky and fortress-like |
| **Bottomless Pit** | Underground pad 7 | **Deep Woods** | Literally a pit in the woods |

The **underground map** remains accessible (via the existing tunnel) but is repurposed as a smaller "Underworld" — a dream-nether-region tied to Mubaba's questline. It's no longer the shopping district.

---

## Player Flow

```
                    ARRIVAL
                       ↓
              ╔══════════════════╗
              ║     BEACH (NW)   ║
              ║  dock · horizon  ║
              ╚════════╤═════════╝
                       ↓
              ╔══════════════════╗
              ║    MEADOW (N)    ║
              ║ flowers · pond   ║
              ╚════════╤═════════╝
                       ↓
              ╔══════════════════╗
              ║   WOODS (W-cen)  ║
              ║  trees · creek   ║
              ╚════════╤═════════╝
                       ↓
              ╔══════════════════╗
              ║   TOWN (cen)     ║
              ║ shacks · market  ║
              ╚══════╤═══╤═══════╝
                     │   │
          ╔══════════╛   ╰══════════╗
          ║  DEEP WOODS (SW)  ║  CITY (E)     ║
          ║ fortress · pit    ║  shops · club ║
          ╚═══════════════════╝ ╚══════╤═══════╝
                                 │
                         ╔═══════╧═══════╗
                         ║ MOUNTAIN (SE) ║
                         ║ cliffs · cave ║
                         ╚═══════════════╝
```

The player arrives at the dock, walks through the beach to the meadow, passes through the woods to reach the town. From the town, they can branch west to the deep woods (spooky content) or east to the city (shops/nightlife). The mountain is the farthest point, accessible through the city.

---

## File Index

| File | Contents |
|------|----------|
| `00_OVERVIEW.md` | This file — master plan, principles, summary |
| `01_ISLAND_LAYOUT.md` | Coordinate-level biome map, terrain generation changes, world shape |
| `02_SPRITES_NEEDED.md` | Every new sprite needed (tiles, buildings, NPCs, animals, items) |
| `03_NPC_PLACEMENT.md` | Which NPC personalities hang out where, schedule changes, new NPCs |
| `04_BIOME_FEATURES.md` | Per-biome gameplay features, interactions, ambient details |
| `05_WILDLIFE_FLORA.md` | New animals, plants, seasonal variations per biome |
| `06_CODE_ARCHITECTURE.md` | Implementation plan: file changes, function rewrites, save migration |
| `07_SUGGESTED_LOCATIONS.md` | Additional location ideas beyond the 7 core biomes |
| `concepts/` | Generated biome concept images |

---

## What Stays the Same

- **Engine:** p5.js global mode, 16px tiles, 100×100 world grid, 320×192 internal canvas
- **Player:** Dreamer, 2-tall sprite, same controls
- **Save system:** versioned migrations (will need a new migration for biome terrain)
- **Day/night cycle:** unchanged
- **Seasons:** Sweet, Saucy, Cool, Yeesh — unchanged
- **Holiday system:** unchanged (holiday events still fire; some may get biome-specific variants later)
- **NPC dialogue:** existing trees remain valid; hangout spots move to biome-appropriate locations
- **Crafting, gardening, magic, animals, weather:** all work on the new terrain
- **Underground map:** still exists, still accessible via tunnel, repurposed (not deleted)

## What Changes

- **World shape:** square rectangle → irregular coastline with NW beach bias
- **Terrain generation:** uniform grass → 7 biome zones with distinct tile types
- **`islandZone()`:** simple edge-distance → biome zone lookup from a biome map
- **`generateWorld()`:** uniform scatter → biome-aware placement
- **NPC hangout spots:** fixed coordinates → biome-zone-relative placement
- **Building placement:** NPC shacks scatter anywhere on grass → cluster in Town biome
- **Shop buildings:** underground pads → surface biome locations
- **Save migration:** terrain tiles get rewritten to biome-appropriate types
- **New sprites:** biome-specific grass/trees/decorations/wildlife
- **New wildlife:** biome-specific animal spawns (mountain goats, woods deer, meadow butterflies already exist)

---

## Implementation Phases

### Phase 1: Biome Map & Terrain Generation
- Define biome zone boundaries as a coordinate map
- Rewrite `islandZone()` → `getBiome(x, y)` returning biome id
- Rewrite `generateWorld()` to place biome-specific terrain and decorations
- Add new tile types to `SPRITE_DEFS` and `TILE_SOLID`
- Save migration: convert old saves to new biome terrain

### Phase 2: Shop & Building Relocation
- Move underground building definitions to surface biome locations
- Update `UNDERGROUND_STARTING_BUILDINGS` → `SURFACE_SHOP_PLACEMENT`
- Keep underground map for Mubaba/quest content
- Update tunnel logic

### Phase 3: NPC Hangout Rework
- Rewrite `HANGOUT_SPOTS` to be biome-relative
- Update `PERSONALITY_SCHEDULE` to send NPCs to biome-appropriate zones
- NPC shacks cluster in Town biome instead of random grass

### Phase 4: New Wildlife & Flora
- Add biome-specific animal spawns
- Add biome-specific harvestable plants
- Seasonal variations per biome

### Phase 5: Polish & New Content
- Biome-specific ambient effects (mist in deep woods, wind on mountain)
- New NPCs that fit specific biomes
- Biome-specific holiday variants
- New locations from `07_SUGGESTED_LOCATIONS.md`

---

## Concept Images

Rough AI-generated concept images for each biome are in `concepts/`. These are *vibe references* for sprite direction, not final art. Charles draws all actual sprites in Pixsplat.
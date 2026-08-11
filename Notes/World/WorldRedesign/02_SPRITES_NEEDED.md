# 02 — New Sprites Needed

> Every sprite the world redesign requires, organized by category. Charles draws all actual art in Pixsplat. These are specifications, not AI-generated art.

---

## Tile Sprites (16×16 unless noted)

### New Terrain Tiles

| Sprite Name | Size | Biome | Description | Priority |
|-------------|------|-------|-------------|----------|
| `grass_dark.png` | 16×16 | Deep Woods | Darker grass variant — deep blue-green, mossy. 3 variants for texture. | HIGH |
| `mountain_grass.png` | 16×16 | Mountain | Scrubby alpine grass — gray-green, sparse. 2 variants. | HIGH |
| `mountain_rock.png` | 16×16 | Mountain | Solid gray rock face. 3 variants. **Solid tile.** | HIGH |
| `snow.png` | 16×16 | Mountain (peak) | White snow patch. 2 variants. Walkable. | MEDIUM |
| `rocky_shore.png` | 16×16 | S/E coast | Rocky coastline — gray rocks with foam. 3 variants. Replaces beach on non-NW coasts. | HIGH |
| `cobblestone.png` | 16×16 | Town | Cobblestone path tile. 3 variants for texture. Walkable. | HIGH |
| `city_street.png` | 16×16 | City | Wider pavement/street tile. 2-3 variants. Walkable. | HIGH |
| `plaza_tile.png` | 16×16 | City | Decorative plaza tile (patterned). 2 variants. | MEDIUM |
| `creek.png` | 16×16 | Woods | Shallow water creek — lighter blue than pond, walkable (shallow). 3 variants with flow direction. | MEDIUM |
| `mist.png` | 16×16 | Deep Woods | Semi-transparent mist overlay tile. Not solid, visual only. Animated (2 frames). | LOW |
| `glowing_mushroom.png` | 16×16 | Deep Woods | Bioluminescent mushroom cluster. Emitted faint glow at night. Harvestable → `glow_cap` item. | MEDIUM |
| `lantern_post.png` | 16×32 | Town/City | 2-tall decorative lantern. Not solid (passable). Emits light radius at night. | MEDIUM |
| `fountain.png` | 32×32 | Town | 2×2 town square fountain. Solid. Decorative. | MEDIUM |
| `mountain_path.png` | 16×16 | Mountain | Dirt + gravel path for mountain trails. 2 variants. | LOW |
| `cliff_face.png` | 16×16 | Mountain | Vertical cliff texture (for elevation changes). Solid. | LOW |

### Existing Tiles — Reused Per Biome

| Sprite | Already In Game | Used In |
|--------|-----------------|---------|
| `grass.png` | ✅ | Meadow, Woods, Town, Beach interior, City base |
| `beach.png` | ✅ | Beach biome |
| `beach_edge.png` | ✅ | Beach ↔ sea transition |
| `sea_overworld.png` | ✅ | Ocean |
| `tree.png` (2-tall) | ✅ | Woods (standard trees) |
| `fir_tree.png` (2-tall) | ✅ | Deep Woods, Mountain (pines) |
| `rock.png` | ✅ | Woods, Mountain |
| `boulder.png` | ✅ | Mountain |
| `tall_grass.png` | ✅ | Meadow, Woods edge |
| `rosebush.png` | ✅ | Meadow |
| `tulip.png` | ✅ | Meadow |
| `path.png` | ✅ | Town paths (existing path tile) |
| `dock.png` | ✅ | Beach dock (repositioned) |
| `bottomless_pit.png` | ✅ | Deep Woods (relocated from underground) |

### Seasonal Tile Variants

The existing seasonal system (`grass_cool.png`, `grass_yeesh.png`, `seasonal_decor.png`) should get biome-specific variants:

| Sprite | Size | Description | Priority |
|--------|------|-------------|----------|
| `grass_dark_cool.png` | 16×16 | Deep woods grass in Cool season | LOW |
| `grass_dark_yeesh.png` | 16×16 | Deep woods grass in Yeesh season | LOW |
| `mountain_grass_cool.png` | 16×16 | Mountain grass in Cool season | LOW |
| `mountain_grass_yeesh.png` | 16×16 | Mountain grass in Yeesh season (more snow) | LOW |
| `cobblestone_snow.png` | 16×16 | Snow-dusted cobblestone in Yeesh | LOW |

---

## Tree Sprites (2-tall: 16×32, trunk/canopy split)

### Existing Tree Sprites — Reused

| Sprite | Size | Used In |
|--------|------|---------|
| `tree.png` (TreeFull) | 16×32 | Woods — standard deciduous |
| `fir_tree.png` | 16×32 | Deep Woods, Mountain — coniferous |

### New Tree Sprites

| Sprite Name | Size | Biome | Description | Priority |
|-------------|------|-------|-------------|----------|
| `oak_tree.png` | 16×32 | Woods | Large oak with spreading canopy. 2-tall solid stack. | MEDIUM |
| `twisted_tree.png` | 16×32 | Deep Woods | Gnarled, twisted tree with sparse dark canopy. Spooky but cozy. | HIGH |
| `pine_tree.png` | 16×32 | Mountain | Tall narrow pine. Different from fir (more alpine). | MEDIUM |
| `palm_tree.png` | 16×32 | Beach | Already exists but was removed — re-add with clean trunk/canopy split. | MEDIUM |
| `willow_tree.png` | 16×32 | Woods (near creek) | Weeping willow with drooping canopy. | LOW |
| `dead_tree.png` | 16×32 | Deep Woods | Leafless tree with bare branches. Adds spooky atmosphere. | LOW |

> **Critical:** All 2-tall trees must have trunk in bottom 16 rows and canopy in top 16 rows with no overlap. See `references/sprite-splitting.md` and `references/solid-2-tall-tile-entities.md` in the cozy-island-game skill.

---

## Building Sprites

### Shop Buildings (Relocated from Underground)

These already have sprites in `assets/sprites/buildings/`. They need to be placed on the surface now. **No new art needed** — just repositioning.

| Building | Sprite | New Surface Location | Size |
|----------|--------|---------------------|------|
| Stimmy Tim's | `stimmy_tims.png` | Town (near market) | 8×5 |
| Gettin' Place | `gettin_place.png` | Beach (near dock) | 8×8 |
| Recycle Bin | `recycle_bin.png` | City | 8×8 |
| Inner Temple | `inner_temple.png` | Deep Woods (quiet clearing) | 8×8 |
| Electric Temple | `electric_temple.png` | City | 8×8 |
| Black Goddess | `black_goddess.png` | City | 8×8 |
| Mubaba's Fortress | `mubaba_fortress.png` | Deep Woods | 8×8 |
| Bottomless Pit | `bottomless_pit.png` | Deep Woods | 4×4 |

### New Building Sprites

| Sprite Name | Size | Location | Description | Priority |
|-------------|------|----------|-------------|----------|
| `town_market.png` | 32×32 (2×2 tiles) | Town square | Open-air market stall. Decorative, interactable (future shop). | LOW |
| `city_clocktower.png` | 16×48 (1×3 tiles) | City plaza | Tall clock tower landmark. Solid. Decorative. | LOW |
| `mountain_cave.png` | 32×16 (2×1 tiles) | Mountain | Cave entrance. Interactable → enters cave interior (future). | MEDIUM |
| `observatory.png` | 32×32 (2×2 tiles) | Mountain peak | Small telescope observatory. Decorative + interactable (stargazing). | LOW |
| `meadow_windmill.png` | 32×32 (2×2 tiles) | Meadow | Decorative windmill. Animated blades (2 frames). | LOW |
| `woods_cabin.png` | 32×32 (2×2 tiles) | Woods clearing | Abandoned cozy cabin. Enterable interior (future). | LOW |

---

## NPC Sprites

### Existing 32 Neighbors — No New Sprites Needed

All 32 neighbors in `NPC_DEFS` already have sprites in `assets/sprites/npcs/`. The redesign doesn't add new neighbors by default (see `03_NPC_PLACEMENT.md` for optional new NPCs).

### Potential New NPC Sprites (Optional / Phase 5)

| Sprite Name | Size | Biome | Character | Priority |
|-------------|------|-------|-----------|----------|
| `mountain_goat_npc.png` | 16×16 | Mountain | Goat hermit NPC | LOW |
| `city_vendor.png` | 16×32 | City | Street vendor NPC | LOW |
| `woods_ranger.png` | 16×32 | Woods | Forest ranger NPC | LOW |
| `deep_woods_spirit.png` | 16×16 | Deep Woods | Mysterious forest spirit | LOW |

---

## Animal Sprites (16×16 unless noted)

### Existing Animals — Reused with Biome Spawning

| Sprite | Animal | New Biome Spawns |
|--------|--------|-----------------|
| `bird.png` / `bird2.png` | Birds | Meadow, Woods, Town (songbirds) |
| `crab.png` | Crabs | Beach only |
| `turtle.png` | Turtles | Beach (nesting) |
| `seagull.png` | Seagulls | Beach, rocky coast |
| `butterfly.png` | Butterflies | Meadow (near flowers), Woods |
| `cicada.png` | Cicadas | Woods, Deep Woods (on trees) |

### New Animal Sprites

| Sprite Name | Size | Biome | Animal | Behavior | Priority |
|-------------|------|-------|--------|----------|----------|
| `mountain_goat.png` | 16×16 | Mountain | Goat | Wanders rocky terrain, climbs cliffs. Observational. | MEDIUM |
| `deer.png` | 16×16 | Woods | Deer | Grazes in clearings, flees from player. Observational. | MEDIUM |
| `firefly.png` | 16×16 | Deep Woods, Meadow | Firefly | Evening glow. Already exists as ambient effect but could be an animal entity. | LOW |
| `owl_bird.png` | 16×16 | Woods, Deep Woods | Owl | Nocturnal bird. Perches on trees at night. | LOW |
| `mountain_eagle.png` | 16×16 | Mountain | Eagle | Soars over mountain area. Rare spawn. | LOW |
| `woods_fox.png` | 16×16 | Woods, Deep Woods | Fox | Sly wanderer. Observational, leaves tracks. | LOW |
| `meadow_rabbit.png` | 16×16 | Meadow | Wild rabbit | Hops around, burrows. (Distinct from Mochi the NPC rabbit.) | LOW |
| `cave_bat.png` | 16×16 | Mountain cave / Deep Woods | Bat | Nocturnal, flies in erratic patterns. | LOW |
| `stream_fish.png` | 16×16 | Woods creek | Fish | Visible in creek water. Observational. | LOW |

---

## Item Sprites (16×16)

### New Harvestable Items

| Item ID | Sprite Name | Source | Category | Description | Priority |
|---------|-------------|--------|----------|-------------|----------|
| `glow_cap` | `glow_cap.png` | Deep Woods `glowing_mushroom` tile | material | Bioluminescent mushroom cap. Gift item, crafting ingredient. | MEDIUM |
| `pine_cone` | `pine_cone.png` | Mountain `pine_tree` harvest | material | Already exists as `pinecone.png` in Sprites! Needs runtime copy. | MEDIUM |
| `mountain_herb` | `mountain_herb.png` | Mountain grass harvest | gift | Alpine herb with medicinal properties (flavor). | LOW |
| `creek_stone` | `creek_stone.png` | Woods creek foraging | material | Smooth river stone. Crafting/decor. | LOW |
| `deer_track` | — | Woods (passive observation) | — | Not an item — visual trail that fades. | LOW |

### New Decorative / Craftable Items

| Item ID | Sprite Name | Category | Description | Priority |
|---------|-------------|----------|-------------|----------|
| `cobblestone_block` | `cobblestone_block.png` | block | Craftable path tile. 4 stone → 1 cobblestone. | MEDIUM |
| `street_lamp` | `street_lamp.png` | block | Placeable lamp. Emits light at night. Crafted from iron + stick. | LOW |
| `banner_town` | — | gift | Town flag banner. Uses existing banner system. | LOW |
| `fountain_blueprint` | — | tool | Placeable fountain (future). | LOW |

---

## Palette Files (Pixsplat .gpl)

Following the existing palette workflow, new biome palettes:

| Palette Name | Colors | Biome | Priority |
|-------------|--------|-------|----------|
| `cozy-island-meadow.gpl` | 12 | Meadow — bright greens, floral pinks/yellows/purples | HIGH |
| `cozy-island-woods.gpl` | 14 | Woods — forest greens, bark browns, dappled light | HIGH |
| `cozy-island-town.gpl` | 12 | Town — warm stone grays, cottage browns, garden greens | HIGH |
| `cozy-island-city.gpl` | 14 | City — urban grays, shop sign colors, lamp glow | HIGH |
| `cozy-island-deep-woods.gpl` | 14 | Deep Woods — dark blue-greens, mushroom glow, purple shadows | HIGH |
| `cozy-island-mountain.gpl` | 14 | Mountain — rock grays, snow whites, alpine greens, pine dark | HIGH |
| `cozy-island-mountain-snes.gpl` | 18 | Mountain SNES variant with smoother midtones | LOW |

> Existing palettes: `cozy-island-tropical.gpl` (beach), `cozy-island-homestead.gpl` (interiors), `cozy-island-underdeep.gpl` (underground), `cozy-island-deepsight.gpl` (underground detail).

---

## Sprite Copy Checklist

When new sprites are drawn in Pixsplat (top-level `Sprites/` mixed-case), copy to runtime:

```bash
# Example for a new tile:
cp "Sprites/GrassDark.png" "assets/tiles/grass_dark.png"
cp "Sprites/MountainRock.png" "assets/tiles/mountain_rock.png"

# For new animals:
cp "Sprites/MountainGoat.png" "assets/sprites/animals/mountain_goat.png"

# For new items:
cp "Sprites/GlowCap.png" "assets/sprites/glow_cap.png"
```

Then register in `SPRITE_DEFS`:
```js
'tiles.grass_dark':  'assets/tiles/grass_dark.png',
'tiles.mountain_rock': 'assets/tiles/mountain_rock.png',
// ... always with error callback
```

**Always use the 3-argument `loadImage(path, success, error)` to prevent preload hangs!**

---

## Priority Summary

### HIGH Priority (Phase 1 — Required for biome terrain)
1. `grass_dark.png` — deep woods base terrain
2. `mountain_grass.png` — mountain base terrain
3. `mountain_rock.png` — mountain solid tiles
4. `rocky_shore.png` — non-beach coastline
5. `cobblestone.png` — town paths
6. `city_street.png` — city paths
7. `twisted_tree.png` — deep woods trees
8. Biome palettes (meadow, woods, town, city, deep-woods, mountain .gpl files)

### MEDIUM Priority (Phase 2-3 — Enriches biomes)
1. `snow.png` — mountain peak
2. `glowing_mushroom.png` — deep woods harvestable
3. `creek.png` — woods water feature
4. `lantern_post.png` — town/city lighting
5. `fountain.png` — town landmark
6. `pine_tree.png` — mountain trees
7. `palm_tree.png` — beach trees (re-add with clean split)
8. `mountain_cave.png` — cave entrance
9. `mountain_goat.png` — mountain animal
10. `deer.png` — woods animal
11. `glow_cap` item sprite
12. `pine_cone` runtime copy (sprite already exists)
13. `cobblestone_block` craftable item

### LOW Priority (Phase 4-5 — Polish and extras)
- Seasonal biome tile variants
- Willow/dead trees
- Windmill, observatory, cabin, clocktower, market
- Additional animals (fox, eagle, owl, rabbit, bat, fish)
- Additional items (herbs, stones, blueprints)
- New NPC sprites (if adding new neighbors)
# Biome island maps

The six islands below the original beach are authored layouts, not filled squares. The coordinates live in [[src/island_maps.js|island_maps.js]] (`islandMapSpecs`). `buildIslandGrid` turns them into cells, and `generateBiomeIsland` in `src/islands.js` centers the result on the 100×100 grid.

Local coordinates: x grows east, y grows south, origin at the map's top-left.

## What a cell is

Walkable: grass, path, snow, tulip, tall grass, tree canopy.

Impassable, and listed on `world.impassable` as `{x, y, type}` in grid coordinates after the map is centered:

- `water` — ponds and the woods creek
- `cliff` — 1×1 stone (the mountain ring, the city clock tower)
- `rosebush`, `shiny_rock`
- tree and fir trunks (the canopy above a trunk is walkable)
- building footprints (the sprite sits on solid grass)

Void is the sky around the island. It blocks movement. The only tile that offers the fall is the one tagged `shoot`.

## Mouths

Each map has a `shoot` on the north coast (the way down) and a `ladder` on the south coast (the climb back). The player arrives on `spawn`, one tile south of the shack door, inside a grass pad that `clearBuildingFootprint` is allowed to wipe.

Skips are marked and walkable, and do not travel yet:

| Island | Tag | Where |
|---|---|---|
| Meadow | `skip-city` | Beside the windmill |
| City | `skip-mountain` | At the foot of the clock tower |
| Deep woods | `skip-beach` | East of the Bottomless Pit |
| Mountain | `skip-meadow` | On the snow, the melt |
| Mountain | `overlook` | The middle of the snow |

Shops are real buildings: Stimmy Tim's on the Town square; the Black Goddess, the Electric Temple, and the Recycle Bin in the City; Mubaba's Fortress, the Inner Temple, and the Bottomless Pit in the Deep Woods.

`node tools/test_islands.js` checks that every pad stays grass, every mouth touches the void, the yard can walk to every mouth, and the impassable list matches the solid cells.

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

The home beach is the large island. It is an oval of grass with a sand beach, thicker along the south shore, then a thin skirt of shallows and sky past that. The west shallows bulge into a cove, and the pier stands in that cove. The shack and the pond stay where they were. The Gettin' Place sits on the west grass, inland of the pier. A new game builds this shape. A save already on the beach keeps the tiles it stored, and guests still arrive at the pier that save actually has.

The meadow is an oval of grass with sky at the corners. The pond sits east of the door, with flowers and tall grass in the open. Four clear yards are the animal neighbors' lots: north, south, east, and southwest. An animal who already has a shack gets one of those yards when the meadow is made. A save already on the meadow keeps the tiles it stored.

The woods are an oval of trees with sky at the corners. The creek bends in east of the door, and a path crosses it. Trees ring the clearing. While you stand there, the screen carries a thin green shade. Mubaba's Fortress stays on the deep woods. A save already in the woods keeps the tiles it stored.

The mountain is an oval of dirt with sky at the corners. Grass is the yards. The Recycle Bin sits east of the door, and the snow on the north ridge is the overlook. Four clear yards are the ghost neighbors' lots: north, east, south, and southwest. A ghost who already has a shack gets one of those yards when the mountain is made. A save already on the mountain keeps the tiles it stored.

The town is an oval of grass with sky at the corners. Stimmy Tim's sits on the landing row, and the fountain is the square, with paths and flower beds around it. Eight yards ring the square. A robot or a monster who already has a shack gets one of those yards when the town is made. Anyone else on the town waits at the landing. A save already on the town keeps the tiles it stored.

Each island below is one section of the old map, and its place stands beside the door you land at:

- Beach — the Gettin' Place, inland of the dock
- Meadow — the pond, east of the yard, and the animal yards around it
- Woods — the creek, bending east of the yard, with the path across it
- Town — Stimmy Tim's on the landing row, the fountain in the square, and eight yards for robots and monsters
- City — the Black Goddess (the club) on the landing row, with the Electric Temple and the clock
- Deep woods — Mubaba's Fortress on the landing row, the Bottomless Pit south of the yard, the Inner Temple north
- Mountain — the Recycle Bin east of the door, snow on the north ridge, and the ghost yards

`node tools/test_islands.js` checks that every pad stays grass, every mouth touches the void, the yard can walk to every mouth, and the impassable list matches the solid cells.

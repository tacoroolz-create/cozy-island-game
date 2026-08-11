# Cozy Island — Sprite Map

Documents all sprite sheets and individual sprites used in the game.

## Asset Folder Structure

```
assets/
  sprites/         — character sprites, items, effects
    player.png     — 16×16 player character
    npcs/          — NPC sprites (mubaba.png — 32×80, first 2×5 new-scale character)
    portraits/     — NPC dialogue portraits (future)
    buildings/     — building overworld sprites (future)
    animals/       — animal sprites (future)
    effects/       — magic effects, particles (future)
  tiles/           — terrain tiles + harvest overlay sprites
    grass.png      — 16×16 grass tile
    beach.png      — 16×16 sand/beach tile
    water.png      — 16×16 water tile (sea + pond)
    tree.png       — 32×32 tree (draws over tile, extends upward)
    palm.png       — 16×16 palm tree (beach decoration)
    rock.png       — 24×24 rock (draws over tile, extends upward)
    shiny_rock.png — 16×16 sparkly rock
    weeds.png      — 16×16 tall grass / weeds
    bird_poop.png  — 16×16 bird poop (seed source)
  ui/              — UI elements (future: borders, icons, buttons)
  fonts/           — pixel fonts (future)
  audio/           — music + SFX (future)
```

## Current Sprite Inventory

| Sprite Key      | File                     | Size    | Used By         | Notes |
|-----------------|--------------------------|---------|-----------------|-------|
| tiles.grass     | assets/tiles/grass.png   | 16×16   | World.drawTile  | Base terrain |
| tiles.beach     | assets/tiles/beach.png   | 16×16   | World.drawTile  | Beach ring |
| tiles.water     | assets/tiles/water.png   | 16×16   | World.drawTile  | Sea + pond. Supports 4-frame animation if 16×64 sheet. |
| tiles.tree      | assets/tiles/tree.png    | 32×32   | World.drawTile  | Multi-tile: centered on tile, extends 16px upward |
| tiles.palm      | assets/tiles/palm.png    | 16×16   | World.drawTile  | Beach palm tree |
| tiles.rock      | assets/tiles/rock.png     | 24×24   | World.drawTile  | Multi-tile: centered on tile, extends 8px upward |
| tiles.shiny_rock| assets/tiles/shiny_rock.png | 16×16 | World.drawTile  | Sparkly rock (has animated sparkle in fallback) |
| tiles.weeds     | assets/tiles/weeds.png   | 16×16   | World.drawTile  | Tall grass, harvestable |
| tiles.bird_poop | assets/tiles/bird_poop.png | 16×16 | World.drawTile  | Bird poop, seed source |
| sprites.player  | assets/sprites/player.png | 16×16 | Player.draw     | Player character |

## Multi-tile Sprite Drawing Convention

Sprites larger than 16×16 are drawn centered horizontally on the tile and extending upward so the base sits on the tile:

- **Tree (32×32)**: offsetX = screenX - 8, offsetY = screenY - 16
- **Rock (24×24)**: offsetX = screenX - 4, offsetY = screenY - 8

## Fallback Behavior

Every sprite has a colored-rectangle fallback rendered if the sprite fails to load. This ensures the game is always playable even with missing assets.

## Future Sprite Sheets (from SCOPE.md)

| Planned Sheet | Location | Purpose | Task |
|---------------|----------|---------|------|
| items.png | assets/sprites/ | 16×16 item icon grid | Task 4 |
| harvest_tiles.png | assets/tiles/ | Harvest type variants | Task 9 |
| borders.png | assets/ui/ | 9-slice panel borders | Task 10 |
| icons.png | assets/ui/ | HUD icons (coin, heart, clock) | Task 10 |
| crops.png | assets/sprites/ | Crop growth stages | Task 12 |
| interior_tileset.png | assets/tiles/ | Interior furniture/floor | Task 8 |
| magic_sparkle.png | assets/sprites/effects/ | Magic cast particles | Task 11 |
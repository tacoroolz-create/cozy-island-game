# Cozy Island Game — Full Project Scope & Task Breakdown

*Generated June 25, 2026 — based on PROJECT.md + Sweet Dreams overview + current codebase*

This document breaks down every element of the game design into independent, parallelizable work units. Each task is scoped so a different agent can pick it up without blocking others. A rough coding plan accompanies each task, including how pixel art assets will be integrated.

---

## KEY DESIGN FACTS (from Sweet Dreams overview)

These specifics override any assumptions — all agents must follow these:

| Aspect | Value |
|--------|-------|
| Canvas resolution | 480×272 px (scaled up for browser) |
| Tile size | 16 px |
| World size | 100×100 tiles, surrounded by 10 tiles of sea |
| Total map | 120×120 tiles (100 land + 10 sea each side) |
| Day/night | 30 real minutes = 1 full 24-hour in-game cycle |
| Season length | 40 in-game days |
| Seasons | Sweet (spring), Saucy (summer), Cool (fall), Yeesh (winter) |
| Events | Holiday on day 1 of each season; festival every 6 days thereafter |
| Max neighbors | 9 (arrive by dinghy, ≥1 per season until cap reached) |
| Player movement | WASD (classic) |
| Primary interaction | Enter key or left-click (default action) |
| Advanced interaction | Shift+Enter or right-click (opens menu with advanced options) |
| Fishing mechanic | Craft a "gettin' stick" (magnet + stick + fiber). Cast into ocean. Each second = 1/10 catch chance. |
| Crafting | Through inventory screen, simple list, consumes recipe elements |
| Harvesting | Non-destructive. Tiles regenerate. Harvest spots are fixed at island creation. |
| Gardening | Seeds found in bird poop. Plant in fertile soil (appears randomly / pig-created). Grow 3 days, then pickable & movable. |
| Building | Thatch huts initially → temples, towers, lighthouses, castles unlocked as materials are discovered. Place via item screen on clear ground. |
| Magic | Neighbors teach "magic tricks": vanish neighbors, make permanent features movable, summon fairies, change day/night, change seasons. |
| Neighbor huts | Auto-built on first night after arrival, random location. Player can build new shelters and reassign. |
| Friendship | 0–10 scale. Max → invite to move in (frees a neighbor slot). < 3 → neighbor may leave (ignored, rude dialogue, tool used on them). |
| Save | localStorage. Must survive game updates (versioned/migration-safe schema). |
| Date display | Upper right of screen |

---

## 0. Project Architecture Overview

### Current State
- **Single-page web app** using p5.js (CDN, v1.9.0)
- No build step — plain HTML/CSS/JS served directly
- `index.html` → loads p5.js + `src/game.js`
- `src/game.js` — single file containing: state machine, Player class, World class, UI rendering, input handler, save/load
- Canvas: 480×272, tile: 16px, world: 100×100 (currently with sea ring)
- Camera follows player, clamped to world bounds
- States: START menu, SETTINGS, PLAYING, PAUSED
- Player moves on grid with WASD/arrows (continuous, 120ms cooldown)
- World: simple island (grass interior, sand beach, water ring)
- Has basic day/night overlay and time system (30 min = 24 hrs — **already matches spec**)
- Has basic save/load via localStorage
- No assets folder, no sprite sheets, no audio — all rendering is colored rectangles

### Target File Structure

## TASK 1: Config & Sprite Infrastructure
**Phase**: 1 | **Priority**: CRITICAL (do first) | **Blocks**: everything

### Scope
- Extract constants from game.js into src/config.js
- Create src/sprites.js with sprite loading, animator, recolor function
- Create SPRITE_MAP.md documenting all planned sprite sheets
- Set up empty asset folder structure
- Ensure preload() calls loadSprites()
- Verify noSmooth() in setup()

### Coding Plan
1. Create src/config.js: Move STATE, CONFIG, MOVE_COOLDOWN constants. Add tile IDs, TILE_SOLID set, SEASONS array, SEASON_LENGTH (40), DAY_LENGTH_MS.
2. Create src/sprites.js: Global sprites object, loadSprites() (wrapped in try/catch), SpriteAnimator class, recolorSprite() function.
3. Update index.html: Add script tags for config.js and sprites.js before game.js.
4. Update game.js: Reference CONFIG from config.js. Add preload() calling loadSprites(). Keep everything else working.
5. Create asset folders: assets/sprites/, assets/tiles/, assets/ui/, assets/fonts/, assets/audio/, data/.
6. Write SPRITE_MAP.md documenting every planned sheet.

### Deliverables
- src/config.js, src/sprites.js, updated index.html + game.js, asset folders, SPRITE_MAP.md

### Dependencies
- None. Must be first.

---

## TASK 2: World Map Generation & Biomes
**Phase**: 1 | **Priority**: High

### Scope
- Replace hand-coded island with procedurally generated island matching the design spec.
- Biomes: beach (palm trees, bananas), sparse jungle near shore, swampy wooded interior, rocky areas (sparkly rocks), ponds.
- Map: 120x120 total (100x100 land + 10 tiles sea each side).
- Sea impassable. Beach walkable. Jungle/swamp walkable.
- Water animation (gentle waves, 3-4 frames).
- Transition tiles for smooth biome borders.
- Harvest tiles spawned at creation (see Task 9).

### Coding Plan
1. Refactor World class into src/world.js:
   - World.generate(): Perlin noise for elevation + radial falloff (center=land, edges=sea). Distance from center determines deep water / water / sand / terrain. Inner biomes via moisture/biomass noise: grass vs jungle vs swamp. Rock outcrops at high elevation. Scatter ponds in interior.
   - World.tiles[x][y] = tile ID integer.
   - World.decorations[] = list of {x, y, type, spriteKey} (trees, rocks, bushes).
   - World.harvestTiles[] = list of harvest tile instances (see Task 9).

2. Collision: World.isSolid(x, y) checks TILE_SOLID set. Player.move() calls this.

3. Water animation: Global waterFrame = Math.floor(frameCount / 30) % 4. Water tiles use this to select source column.

4. Rendering (World.draw()): Calculate visible tile range from camera. Draw tiles from tileset sheet or fallback color. Draw decorations sorted by Y for depth ordering. Palm trees: 16x32 sprites (canopy extends above tile). Interior trees: 16x32 or 16x48.

5. Sprite integration:
   - tileset.png: rows = tile categories, columns = variants/animation frames.
   - Transition tiles: bitmask auto-tiling (4-bit N/E/S/W) mapped to specific cells.
   - Fallback: solid color per tile ID.

### Deliverables
- src/world.js (refactored), assets/tiles/tileset.png (when ready)

### Dependencies
- Task 1 (config constants).

---

## TASK 3: Player Character & Animation
**Phase**: 1 | **Priority**: High

### Scope
- Extract Player class from game.js into src/player.js.
- 4-directional walking animation with sprite sheet.
- Facing direction tracked (required for interaction system).
- Smooth grid movement (lerp between tiles, ~100ms).
- Character customization: skin tone, hair color, outfit color via palette swap.
- Player can face an adjacent tile and interact (sets up Tasks 6-9).

### Coding Plan
1. Extract Player to src/player.js. Properties: gridX, gridY, displayX, displayY (for lerping), facing, animFrame, moving. Methods: move(dx,dy), update(dt), render(), serialize(), deserialize().

2. Facing direction: In move(), set this.facing based on dx/dy ('down','up','right','left'). Map to sprite sheet row: down=0, left=1, right=2, up=3.

3. Smooth movement: In update(dt), lerp displayX/displayY toward gridX*TILE_SIZE / gridY*TILE_SIZE. Arrives in ~100ms. render() uses display position; logic uses grid position.

4. Walking animation: Use SpriteAnimator when moving. 4-frame cycle (idle, step-1, idle, step-2). ~8 fps.

5. Character customization screen: 3 color swatches (skin, hair, outfit). Left/right arrows cycle presets. On confirm, call recolorSprite() to generate sprites.playerCustom.

6. Facing-based interaction helper:
   getFacingTile() returns {x, y} of the tile in front of player based on facing direction.

7. Sprite integration: assets/sprites/player.png is 64x64 (4 cols x 4 rows of 16x16). Row 0=down, 1=left, 2=right, 3=up. Palette markers for skin/hair/outfit. Fallback: colored rect.

### Deliverables
- src/player.js, assets/sprites/player.png (when ready), customization screen

### Dependencies
- Task 1 (config, sprites.js).

---

## TASK 4: Inventory & Crafting System
**Phase**: 2 | **Priority**: High

### Scope
- Grid-based inventory (24 slots: 8 hotbar + 16 backpack).
- Crafting is inside the inventory screen: simple list of known recipes. Select recipe, see required materials, craft button consumes and creates.
- Items: tools (gettin' stick, axe, hoe, pickaxe), materials (wood, fiber, magnet, stick, stone, banana, bird poop, seeds), food, building blocks (thatch, wood brick, stone brick).
- Hotbar: 8 slots, number keys 1-8 to select active.
- Building placement mode: equip building block, ghost preview on clear ground, Enter places.
- Tooltips on hover.

### Coding Plan
1. Item database (data/item_data.js): Array of item defs with id, name, category, maxStack, iconCol, iconRow, desc. Merged into global ITEMS at load time.

2. Inventory class (src/inventory.js): slots array (24), hotbarSize (8), activeSlot. Methods: addItem, removeItem, hasItem, countItem, getActiveItem. Handles stacking (materials stack to 99, tools stack to 1).

3. Crafting (src/crafting.js + data/recipe_data.js): RECIPES array with output and inputs. In inventory screen, show crafting list. Grey out if insufficient materials. Enter crafts: consume inputs, add output, play SFX, notify.

4. Building placement mode: Equip building block, Enter on clear ground enters placement mode. Ghost preview follows facing tile. WASD moves ghost, Enter confirms, ESC cancels. world.placeBuilding() validates and creates.

5. Full inventory overlay: Tab/I key toggles. Shows all 24 slots. Click slot for Use/Drop/Cancel popup. Tooltip on hover.

6. Sprite integration: assets/sprites/items.png = 16x16 icon grid. iconCol/iconRow in item defs. Slot borders: 9-slice or fallback rect. Building sprites: multi-tile (e.g., 32x32 for hut).

### Deliverables
- src/inventory.js, src/crafting.js, data/item_data.js, data/recipe_data.js, building placement mode

### Dependencies
- Task 1.

---

## TASK 5: Day/Night Cycle & Calendar System
**Phase**: 3 | **Priority**: High

### Scope
- 30 real minutes = 1 full 24-hour in-game cycle (already in current code).
- Seasons: 40 days each. Sweet, Saucy, Cool, Yeesh.
- Holiday on day 1 of each season. Festival every 6 days after.
- Date tracked upper right of screen.
- Extract time logic from game.js into src/daycycle.js.
- Lighting overlay (port existing drawDayNightOverlay, enhance with season tints).
- Sleep mechanic: bed to skip to morning.
- onNewDay() event dispatcher for all systems.

### Coding Plan
1. gameTime object: totalMinutes (float), day (1-40), season, year. Starts at 6:00 AM day 1 Sweet.

2. Time scale: 1 real second = 0.8 game minutes (1440 / 1800). updateTime(dt) advances totalMinutes, rolls over at 1440 calling onNewDay().

3. Calendar: onNewDay increments day. At day > 40, wrap to 1 and advance season. Holiday on day 1, festival every 6 days. Dispatch to registered callbacks via registerNewDay().

4. Lighting: Port existing drawDayNightOverlay(). Dawn=warm orange fade, day=clear, dusk=orange-pink, night=dark blue alpha 0.5. Season tints: Cool=cooler, Yeesh=desaturated/bluish.

5. Sleep: Fade to black, set time to 6:00 AM, advance day, onNewDay(), fade in.

6. HUD: getDateString() returns "Day X - Season". getTimeString() returns "H:MM AM/PM". Display upper right.

7. Holiday/event stub: triggerHoliday() and triggerEvent() -- flesh out with content later.

### Deliverables
- src/daycycle.js

### Dependencies
- Task 1. Consumed by: Tasks 6, 7, 9, 12.

---

## TASK 6: NPCs, Dialogue & Friendship System
**Phase**: 3 | **Priority**: High

### Scope
- Up to 9 neighbors. Arrive by dinghy on shore at random, at least 1 per season until cap.
- Build thatch hut on first night. Random location.
- Friendship 0-10. Max = invite to move in (frees slot). Less than 3 = may leave.
- Unique shelter interiors. Friendship visible in inventory friendship tab.
- Player can challenge neighbors to games (tic-tac-toe, rhythm, etc.).
- Magic tricks can make neighbors vanish/appear.

### Sub-tasks (can be separate agents):

**6A: NPC Entity System (src/entities.js)**
- NPC class: id, name, personality, gridX/Y, facing, friendship, isPresent, hasHome, hutX/Y, schedule, dialogues, animFrame, dailyTalked, departureCounter.
- update(dt, timeBlock): Move toward scheduled position. At night, walk home and sleep (inactive indoors).
- Arrival system: npcQueue of NPC_DEFS. checkArrivals() called onNewDay/onNewSeason. If npcs.length < 9, spawn next at shoreline. Dinghy appears, NPC walks ashore, intro dialogue triggered.
- Hut construction: On first onNewDay after arrival, pick random clear location, create thatch hut building. Set npc.hasHome=true.
- Departure: If friendship < 3 and departureCounter exceeds threshold, NPC announces departure, leaves, hut becomes empty, slot opens.
- Sprite: assets/sprites/npcs/<id>.png, 4x4 sheet same format as player. Fallback: unique colored rect per NPC.

**6B: Dialogue Engine (src/dialogue.js + data/npc_dialogues.js)**
- Dialogue tree format: DIALOGUES object keyed by NPC id. Each has entryByFriendship (array of {min, node}) and nodes object. Each node has text, optional portrait, and choices array. Each choice has text, next (node id or null to close), and optional friendship delta.
- Typewriter: Reveal text at ~30 chars/sec. Press E/Enter to skip to full text, then show choices.
- Choice navigation: Arrow keys + Enter. next=null closes dialogue. Friendship deltas applied on selection.
- Rendering: Bottom 1/3 of screen, semi-transparent panel. Portrait on left (32x32 or 48x48). NPC name above text. Choices with triangle indicator on selected. Fallback: no portrait = colored box with initial.
- Advanced interaction menu (Shift+Enter or right-click on NPC): Options include Talk, Challenge to Game, Give Gift, Use Magic Trick, Assign Shelter, Cancel. Context-dependent visibility.

**6C: Friendship System**
- Stored per NPC as float 0-10.
- Gain: +1 per daily talk (first interaction each day), +2-5 for liked gifts, +5-10 for quests.
- Loss: -1 rude dialogue, -2 ignored when flagged, -3 tool used on them.
- Display: Friendship tab in inventory. Shows name, portrait mini, heart meter (0-10).
- Max friendship: Unlock "Invite to move in" option. NPC moves into player's house, frees island slot, new NPC can arrive.
- Low friendship (< 3): Accumulate departureCounter. At threshold, NPC departs. Hut becomes empty, player can reassign.

### Deliverables
- src/entities.js, src/dialogue.js, data/npc_definitions.js, data/npc_dialogues.js, assets/sprites/npcs/, assets/sprites/portraits/

### Dependencies
- Task 3 (player facing), Task 5 (time for schedules), Task 10 (UI for friendship tab).

---

## TASK 7: Fishing / Casting System
**Phase**: 2 | **Priority**: Medium-High

### Scope
- Craft a gettin' stick (magnet + stick + fiber). Cast into ocean. Each second = 1/10 catch chance.
- Probability-based cast-and-wait system. No reel-in minigame per the design spec.

### Coding Plan
1. Catch/treasure data (data/fish_data.js): CATCHES array with id, name, rarity, value, weight (for weighted random), optional season restriction. Includes junk (old boot, tin can), fish, and treasure (gold coin, pearl, ancient relic).

2. Casting state machine (src/fishing.js): States IDLE, CASTING, WAITING, CAUGHT.
   - tryCast(): Check gettin_stick equipped and facing water. If valid, enter CASTING (brief animation ~500ms), then WAITING.
   - updateCasting(dt): In WAITING, every 1000ms roll random() < 0.1. If hit, roll catch table, add to inventory, notify, return to IDLE. Player can press E to cancel (reel in, no catch).

3. rollCatchTable(): Filter by season, sum weights, random roll, return catch item. Weighted probability.

4. Visual feedback: CASTING = line from player to water. WAITING = bobber sprite on water with gentle bob. CAUGHT = splash particles + exclamation mark. Fallback: line() + ellipse() shapes.

5. Input: E/Enter while facing water with gettin_stick equipped triggers cast. Movement keys cancel active cast.

### Deliverables
- src/fishing.js, data/fish_data.js

### Dependencies
- Task 4 (inventory -- add catches, check equipped tool).

---

## TASK 8: Buildings & Interiors
**Phase**: 3 | **Priority**: Medium

### Scope
- Buildings on overworld: thatch huts (initial), later temples, towers, lighthouses, castles.
- Player places buildings from inventory (placement mode in Task 4).
- NPC auto-builds hut on first night after arrival (Task 6).
- Enter buildings: walk to door, press Enter, transition to interior.
- Interior maps: smaller tile grids (e.g., 12x10) with floor, walls, furniture.
- Each NPC has unique interior design.
- Right-click empty shelter to assign to a neighbor.

### Coding Plan
1. Building class (src/buildings.js): type, gridX/Y, owner (NPC id or null), interiorMap, exitX/Y, interiorEnterX/Y.

2. Interior maps (data/building_maps.js): INTERIORS object keyed by building type and NPC id. Each has w, h, enterX/Y, and 2D tiles array (WALL border, FLOOR interior, FURNITURE scattered, door at bottom center).

3. Building placement: Integrates with Task 4 inventory. world.placeBuilding(x, y, type) validates clear ground, creates Building entity, adds to buildings[] array. Buildings are solid except door tile.

4. NPC hut auto-construction: On first onNewDay after NPC arrival, pick random clear location near shore, create thatch hut, set npc.hutX/hutY.

5. Entering/exiting: enterBuilding() saves previousPos, loads interior map, moves player to enter position, fades transition. exitBuilding() restores overworld, moves player to exit position.

6. Shelter assignment: Right-click empty building, context menu "Assign to Neighbor", list neighbors without homes, select to assign.

7. Furniture interaction: Bed = sleep (Task 5). Stove = cook (convert raw to cooked food). Chest = storage. Decorative = visual only.

8. Sprite integration: Overworld building sprites are multi-tile (32x32 hut, 48x64 temple). assets/sprites/buildings/. Interior furniture: 16x16 from interior_tileset.png. Door: closed/open frames, animate on transition. Fallback: colored rectangles.

### Deliverables
- src/buildings.js, data/building_maps.js, assets/sprites/buildings/, assets/tiles/interior_tileset.png

### Dependencies
- Task 4 (inventory placement), Task 6 (NPCs -- hut ownership).

---

## TASK 9: Harvesting System (Non-Destructive Foraging)
**Phase**: 2 | **Priority**: High

### Scope
- Harvesting is non-destructive. Tiles regenerate. Harvest spots fixed at island creation.
- Only magic can move harvest tiles.
- Harvestable: rocks, trees, bushes, tall grass, salt water, pond water, sparkly rocks, bird poop.
- All plant life harvestable as wood or fiber. Some bushes/trees produce fruit.
- Weed pulling yields fiber.

### Key Design Principle
Harvest tiles are permanent fixtures. Harvesting collects resources and starts a respawn timer. The tile is never destroyed.

### Coding Plan
1. Harvest types (src/foraging.js): HARVEST_TYPES object keyed by type. Each has resources array (id, count, optional chance), respawnHours, required tool (or null), sprite key. Types: tree, palm_tree, bush, tall_grass, sparkly_rock, rock, bird_poop, salt_water, pond_water.

2. HarvestTile class: type, gridX/Y, lastHarvestTime, available. canHarvest() checks respawn timer (respawnHours * 60 game minutes). harvest(inventory, equippedTool, currentGameMinutes) checks tool requirement, gives resources, sets available=false and lastHarvestTime.

3. World generation integration: During World.generate(), scatter harvest tiles by biome. Beach: palm trees, salt water. Jungle: trees, bushes, tall grass. Swamp: trees, bushes, pond water. Rocky: rocks, sparkly rocks. Random: bird poop anywhere. Store in world.harvestTiles[], indexed by grid position.

4. Interaction: Player faces tile, presses Enter. tryInteract() checks for harvest tile at facing position. If found, call harvest(). Season affects available drops.

5. Sprite integration: assets/tiles/harvest_tiles.png, one row per harvest type, columns for variants. Overlay drawn on top of base terrain. Depleted state: dimmer sprite. Sparkly rock: glittery animation. Fallback: unique-colored rect per type.

6. Magic-trick moving (stretch, Task 11): Certain magic tricks can pick up a harvest tile and place it elsewhere. Remove from array, add at new position.

### Deliverables
- src/foraging.js, assets/tiles/harvest_tiles.png (when ready)

### Dependencies
- Task 2 (world gen), Task 4 (inventory -- add items, check tools).

---

## TASK 10: UI / HUD System
**Phase**: 2 | **Priority**: High

### Scope
- HUD: clock (upper right), date, season, hotbar, notifications.
- Context menus: right-click / Shift+Enter advanced interaction.
- Settings menu: volume, mute, controls, text speed.
- Reusable UI framework: panels, buttons with pixel-art styling.
- Pixel font rendering.
- Notification toasts: item pickup, events, etc.

### Coding Plan
1. HUD layout (src/ui.js): Top-right = date + time + season. Bottom-center = hotbar (8 slots from Task 4). Top-left = notification stack. Drawn every frame during PLAYING.

2. Notification system: notifications[] array of {text, icon, life, maxLife, y}. notify(text, icon, duration) pushes new. updateNotifications(dt) decrements life, slides in from -40 to y=10 over 300ms, fades out last 500ms. Stack vertically.

3. Context menus: contextMenu object with active, x, y, options[], selected. openContextMenu(x, y, options). drawContextMenu() draws panel + options with indicator. Arrow keys navigate, Enter selects, ESC cancels. Used by NPC interaction, building assignment, magic tricks.

4. Reusable components: drawPanel(x, y, w, h) draws 9-slice border or fallback rect. drawButton(x, y, w, h, label, hovered, pressed) draws pixel-art button or fallback.

5. 9-slice border: assets/ui/borders.png is 3x3 grid (corners, edges, center). draw9Slice(img, x, y, w, h, sliceSize) draws corners full-size, edges stretched, center tiled. Fallback: simple rect with stroke.

6. Pixel font: Load assets/fonts/PixelFont.ttf via loadFont() in preload(). Use textFont() before drawing. Fallback: Courier New (already used).

7. Tooltips: On hover over inventory item, show small panel with name + description. Track mouse over slot bounding boxes.

8. Settings menu: Volume sliders (music, SFX), mute toggles, text speed. Persist to localStorage under cozyIslandSettings.

9. Sprite integration: assets/ui/borders.png (9-slice), assets/ui/icons.png (coin, heart, clock, calendar), assets/ui/buttons.png (states). Fallback: p5 rect + text with Courier New.

### Deliverables
- src/ui.js, assets/ui/borders.png, assets/ui/icons.png, assets/fonts/PixelFont.ttf

### Dependencies
- Task 4 (hotbar), Task 5 (clock). Used by all tasks for notifications.

---

## TASK 11: Magic System
**Phase**: 4 | **Priority**: Medium

### Scope
- Neighbors teach player "magic tricks" that manipulate the world:
  - Make unwanted neighbors disappear
  - Make permanent features (stones, trees) into movable items
  - Summon fairies
  - Change day into night or seasons

### Coding Plan
1. Magic trick definitions (data/magic_data.js): MAGIC_TRICKS array with id, name, desc, teacher (NPC id), cost ({id, count}).

2. Learning: NPCs teach at certain friendship levels. Special dialogue node offers to teach. On learn, add to player.knownMagic[].

3. Casting (src/magic.js): Accessed via advanced interaction menu. "Cast Magic Trick" submenu lists known tricks. Select trick, select target if applicable, consume cost, execute effect.

4. Effects:
   - vanish_npc: Set npc.isPresent=false, hut becomes empty, slot opens.
   - move_feature: Convert harvest tile to inventory item, placeable elsewhere.
   - summon_fairy: Spawn fairy entity (cosmetic follower with light source).
   - change_time: Toggle day/night (set gameTime.totalMinutes to 360 or 1200).
   - change_season: Advance season, call onNewSeason() immediately.

5. Sprite integration: assets/sprites/effects/magic_sparkle.png for cast particles. Fairy: assets/sprites/animals/fairy.png with idle bob. Fallback: ellipse() with alpha for particles.

### Deliverables
- src/magic.js, data/magic_data.js, assets/sprites/effects/

### Dependencies
- Task 6 (NPCs -- teachers + targets), Task 5 (daycycle), Task 9 (foraging -- move features).

---

## TASK 12: Gardening System
**Phase**: 2 | **Priority**: Medium

### Scope
- Seeds found in bird poop. Plant in fertile soil (appears randomly at creation, pig-created).
- Plants grow each day for 3 days until fully grown.
- Fully grown plants can be picked up and moved elsewhere.
- This is gardening, not farming -- decorative and relaxing.

### Coding Plan
1. Plant definitions (data/crop_data.js): PLANTS object with wildflower and berry_bush. Each has stages (3), daysPerStage (1), seedId, cropId, type. seed_random is a mystery seed -- type determined on planting by random roll.

2. Farm tile management (src/farming.js):
   - gardenPlots = {} keyed by "x,y" to {planted, stage, growthDays}.
   - fertileSoilTiles = [] generated at world creation.
   - plantSeed(x, y, seedId): Check fertile soil, roll plant type, create plot.
   - harvestPlant(x, y): If fully grown, add crop to inventory (movable!), delete plot.
   - Plants are NOT destroyed on harvest -- they become items the player can place elsewhere.

3. Daily growth: Hooked into onNewDay() via registerNewDay(). Increment growthDays, advance stage when threshold reached.

4. Placement of picked-up plants: Fully grown plants placed on any clear ground tile as decorative entities (no further growth, just visual).

5. Fertile soil: Generated at world creation in interior (swamp/jungle). Visually distinct (darker, richer, small sparkle). Pig NPC can create fertile soil when befriended.

6. Sprite integration: assets/sprites/crops.png with rows = plant types, columns = growth stages. Fallback: small colored circles.

### Deliverables
- src/farming.js, data/crop_data.js, assets/sprites/crops.png

### Dependencies
- Task 4 (inventory -- seeds, harvesting), Task 5 (daycycle -- daily growth), Task 2 (world -- fertile soil).

---

## TASK 13: Animals & Pets
**Phase**: 5 | **Priority**: Low

### Scope
- Animals on island and in sea that can be befriended.
- Pigs can create fertile soil when asked (at friendship).
- Birds fly around, occasionally land and leave bird poop (source of seeds).
- Sea creatures visible in water, some catchable.

### Coding Plan
1. Animal entity (src/pets.js): Animal class with type, gridX/Y, facing, tamed, friendship, wanderTimer, animFrame. Wild animals wander randomly within home radius. Birds fly and land periodically. Tamed animals follow player.

2. Bird poop generation: Birds land on tile, after N seconds spawn bird_poop harvest tile, fly away. Primary source of seeds.

3. Pig fertile-soil ability: Befriend pig (feed fruit/berries). At friendship threshold, advanced interaction "Ask to dig fertile soil." Pig converts grass to fertile soil.

4. Befriending: Drop food near animal, animal eats over N seconds, friendship +1. Repeat over days to tame. Tamed: follow player, can be named, can be petted.

5. Sea creatures: Visible shadows in water. Some catchable via casting (add to catch table). Dolphins/turtles: cosmetic, swim by occasionally.

6. Sprite integration: assets/sprites/animals/pig.png (4x4 sheet), bird.png (flight + landing). Fallback: colored rectangles.

### Deliverables
- src/pets.js, assets/sprites/animals/

### Dependencies
- Task 2 (world), Task 9 (harvest -- bird poop), Task 12 (farming -- pig fertile soil).

---

## TASK 14: Save/Load System (Versioned)
**Phase**: 1 (enhance existing) | **Priority**: High

### Scope
- Must survive game updates without breaking saves.
- Versioned schema with migration support.
- Auto-save every in-game day and every 60 real seconds.

### Coding Plan
1. Versioned save schema (src/save.js): SAVE_VERSION constant, SAVE_KEY = 'cozyIslandSave'. serializeGame() returns plain object with version, timestamp, and all game state. saveGame() writes to localStorage.

2. Migration system: MIGRATIONS array of functions, each transforms data from version N to N+1. loadGame() parses, runs migrations, then calls deserializeGame().

3. Serialize/deserialize on every class: Player, World, NPC, Building, Inventory each implement serialize() and deserialize(data). Plain data only -- no functions or circular refs.

4. Auto-save: Save on onNewDay() and every 60 real seconds. Show brief "Saved!" indicator.

5. Save integrity: Wrap load in try/catch. If parse fails, offer "Start New Game" with warning. Validate key fields after migration, fill defaults for missing.

### Deliverables
- src/save.js, serialize()/deserialize() methods on all entity classes

### Dependencies
- All tasks (need their serialize/deserialize). Can define interface first.

---

## TASK 15: Audio System
**Phase**: 5 | **Priority**: Low

### Scope
- Music: ambient, seasonal looping tracks.
- SFX: harvesting, casting, footsteps, UI clicks, magic sparkles, notifications.
- Volume controls in settings. Mute toggle.

### Coding Plan
1. Sound manager (src/audio.js): audioManager object with musicVolume, sfxVolume, muted, currentTrack. Methods: playMusic(trackName), playSFX(sfxName), setMusicVolume(v), setSFXVolume(v), toggleMute().

2. Sound triggers: Other systems call audioManager.playSFX('chop'), playSFX('splash'), etc. at appropriate moments.

3. Seasonal music: Change track on season change (hooked into onNewSeason()).

4. Settings persistence: Save volume/mute to localStorage under cozyIslandSettings.

5. Asset format: .ogg files. Load via p5.js loadSound().

### Deliverables
- src/audio.js, assets/audio/music/, assets/audio/sfx/

### Dependencies
- Task 10 (UI settings -- volume sliders).

---

## TASK 16: Minigames (Neighbor Challenges)
**Phase**: 5 | **Priority**: Low

### Scope
- Neighbors can be challenged to games: tic-tac-toe, rhythm game, others to be designed.
- Triggered via advanced interaction menu on NPCs.

### Coding Plan
1. Minigame framework (src/games.js): Minigame base class with opponent NPC, state, update(dt), render(), onKey(key), onClick(x,y), getResult() returning win/lose/draw/null.

2. Tic-Tac-Toe: 3x3 grid, player is X, NPC is O. Click to place, NPC AI moves after delay. Win/lose/draw applies friendship delta (+2 win, +1 draw, 0 lose).

3. Rhythm game (basic): Arrows scroll across screen, press corresponding key at hit zone. Score-based, threshold for win.

4. Integration: Challenged via NPC advanced interaction menu. New game STATE.MINIGAME. Minigame update/render. Result returns to PLAYING with friendship delta.

### Deliverables
- src/games.js

### Dependencies
- Task 6 (NPCs -- challenge trigger).

---

## PARALLELIZATION GUIDE

### Which tasks can run simultaneously?

**Wave 1 (Foundation -- all parallel after Task 1)**:
- Task 1 (Config & Sprites) -- do first
- Task 2 (World Gen) -- after Task 1
- Task 3 (Player Animation) -- after Task 1
- Task 4 (Inventory) -- after Task 1
- Task 5 (Day/Night) -- after Task 1
- Task 14 (Save System) -- after Task 1 (define interface)

**Wave 2 (Activities -- parallel, after Wave 1)**:
- Task 7 (Fishing) -- after Task 4
- Task 9 (Harvesting) -- after Task 2, Task 4
- Task 10 (UI/HUD) -- after Task 4, Task 5
- Task 12 (Gardening) -- after Task 4, Task 5, Task 2

**Wave 3 (Social & World -- parallel)**:
- Task 6 (NPCs/Dialogue) -- after Task 3, Task 5, Task 10
- Task 8 (Buildings) -- after Task 4, Task 6

**Wave 4 (Advanced Systems)**:
- Task 11 (Magic) -- after Task 6, Task 9, Task 5
- Task 13 (Animals) -- after Task 2, Task 9, Task 12
- Task 15 (Audio) -- after Task 10
- Task 16 (Minigames) -- after Task 6

### Interface Contracts (what each module exposes)

| Module | Exposes | Consumes |
|--------|---------|----------|
| config.js | CONFIG, TILES, TILE_SOLID, SEASONS, constants | -- |
| sprites.js | sprites{}, loadSprites(), SpriteAnimator, recolorSprite() | config |
| world.js | World class, world.isSolid(), world.getTile(), world.placeBuilding() | config, sprites |
| player.js | Player class, player.facing, getFacingTile() | config, sprites, world |
| entities.js | NPC class, npcs[], checkArrivals() | config, sprites, daycycle, dialogue |
| dialogue.js | openDialogue(), dialogueState, typewriter renderer | entities, ui |
| inventory.js | Inventory class, add/remove/has/getActive() | items |
| crafting.js | RECIPES, craftItem() | inventory, items |
| fishing.js | castState, tryCast(), updateCasting() | inventory |
| foraging.js | HarvestTile class, world.harvestTiles[] | inventory, world |
| farming.js | gardenPlots{}, plantSeed(), harvestPlant(), onNewDay() | inventory, daycycle, world |
| buildings.js | Building class, buildings[], enterBuilding(), exitBuilding() | world, inventory, entities |
| magic.js | MAGIC_TRICKS, castMagic() | entities, daycycle, foraging |
| daycycle.js | gameTime, updateTime(), onNewDay(), registerNewDay(), getTimeString() | config |
| ui.js | notify(), drawPanel(), drawButton(), context menus | -- |
| save.js | saveGame(), loadGame(), serializeGame(), deserializeGame() | all |
| pets.js | Animal class, animals[] | world, foraging, farming |
| audio.js | audioManager, playMusic(), playSFX() | ui (settings) |
| games.js | Minigame class, subclasses | entities |

### Design Doc Needed (from Charles)
Before starting Tasks 6 (NPCs) and 11 (Magic), the user should provide:
- Neighbor list: Names, personalities, appearances, what magic they teach.
- Dialogue content: At minimum, intro dialogues for 1-2 NPCs.
- Lore: Holiday names, event descriptions, island mythology.
- Item list: Full harvestable/craftable items, seasonal exclusives.

---

## SUMMARY TABLE

| Task | Name | Phase | Priority | Deps | Deliverables |
|------|------|-------|----------|------|--------------|
| 1 | Config & Sprites | 1 | CRITICAL | -- | config.js, sprites.js |
| 2 | World Gen & Biomes | 1 | High | 1 | world.js |
| 3 | Player & Animation | 1 | High | 1 | player.js |
| 4 | Inventory & Crafting | 2 | High | 1 | inventory.js, crafting.js |
| 5 | Day/Night & Calendar | 3 | High | 1 | daycycle.js |
| 6 | NPCs & Dialogue | 3 | High | 3,5,10 | entities.js, dialogue.js |
| 7 | Fishing/Casting | 2 | Med-High | 4 | fishing.js |
| 8 | Buildings & Interiors | 3 | Med | 4,6 | buildings.js |
| 9 | Harvesting (Foraging) | 2 | High | 2,4 | foraging.js |
| 10 | UI / HUD | 2 | High | 4,5 | ui.js |
| 11 | Magic System | 4 | Med | 6,9,5 | magic.js |
| 12 | Gardening | 2 | Med | 4,5,2 | farming.js |
| 13 | Animals & Pets | 5 | Low | 2,9,12 | pets.js |
| 14 | Save/Load (Versioned) | 1 | High | all | save.js |
| 15 | Audio | 5 | Low | 10 | audio.js |
| 16 | Minigames | 5 | Low | 6 | games.js |

*End of scope document.*

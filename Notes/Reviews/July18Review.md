# July 18 Review — Missing Assets, Text, and Mechanics

Full-codebase audit: every sprite slot the code looks for, every character the
docs promise, every mechanic that's stubbed or blocked. Compiled against
`src/*.js`, `assets/`, `Sprites/` (staging), and the design txt/md docs.

---

## 1. Missing sprites & art

Every hard-coded path in `SPRITE_DEFS` loads fine — the gaps are all in the
auto-loaded slug slots, item icons, and fallback-shape props.

### 1a. Staged in `Sprites/` but never copied into `assets/` (quick wins)

| Staged file | Should land at |
|---|---|
| `Sprites/vesper.png` | `assets/sprites/npcs/vesper.png` |
| `Sprites/Gigglegrow.png` | `assets/sprites/npcs/gigglegrow.png` |
| `Sprites/island_god_turtle.png` | newer Island God art? current `assets/sprites/island_god.png` was copied from the older `island_god.png` |
| `Sprites/player_base.png`, `player_cheerful.png`, `player_goth.png`, `player_kawaii.png` | nowhere yet — player-variant system doesn't exist in code (see §3) |
| `Sprites/TitleScreen.png` | possibly a refresh of `assets/ui/title.png` |

### 1b. Neighbor overworld sprites — 14 of 32 missing (`assets/sprites/npcs/<slug>.png`, 16×32)

- **Robots (8/8 done)** ✓  **Ghosts (8/8 done)** ✓
- **Animals (0/8):** mochi, shadow, raven, newton, lotus, squire_paws, pebble, sunny
- **Monsters (2/8 staged, 6 not drawn):** vesper + gigglegrow staged (§1a);
  **fluffernox, grumble, gizmo, ommmm, lord_roar, snug** don't exist anywhere.
  (A loose old-roster `assets/sprites/grumble.png` exists but is in the retired
  folder and never loads.)

### 1c. Dialogue portraits — ALL 35 missing (`assets/sprites/portraits/<slug>.png`, 64×64)

The folder is empty. The loader wants one for each of the 32 neighbors plus
**yogatron, stan, bob**. Every dialogue box currently shows the colored-square
fallback.

### 1d. Referenced sprite key with no file at all

- `sprites.twig_tower` (Castle of Sticks Day tower, `BUILDING_TIERS.twig_tower`)
  — not even in `SPRITE_DEFS`, so it always draws as a tan block. Needs the file
  **and** a manifest line.

### 1e. Item icons — 88 items draw as colored squares

53 entries in `ITEMS` have no `items.<id>` line in `SPRITE_DEFS`, plus 3
registered in other files, plus the 32 quest cutouts:

- **Seeds/garden:** grain_seed, rose_seed, tulip_bulb, flea_lily_seed, bird_poop, rose, tulip, flea_lily_bloom
- **Tools:** pickaxe, sturdy_pickaxe, grass_seed
- **Treasure:** iron_ingot, metal_rod, old_radio, stardew, thatch
- **Food:** grilled_banana, berry_jam, fruit_salad, **coffee, donut** (cafe.js)
- **Furniture (12):** chair, armchair, stool, bench, end_table, coffee_table, bookshelf, dresser, cabinet, floor_lamp, potted_plant, fireplace
- **Decorations (8):** tapestry, painting, window, drapes, wall_clock, wall_shelf, round_rug, runner_rug
- **Peak Yeesh pool (8):** yule_tree, brick_fireplace, garland, wreath, mistletoe_sprig, candle_log, holly_vase, yule_goat_plush
- **Placeables:** flealess_statue, neighbor_shack, potted_tree, potted_fir_tree, potted_banana_tree, potted_palm_tree
- **Quests:** parcel (quests.js) + 32 `cutout_*` neighbor cutouts

### 1f. Holiday/visitor props drawn as fallback shapes (deliberate so far)

Tourists, the gardener, path-artist, lantern-lighter, historian, both elders,
Papa Yeesh, the Flealess merchant cart, the familiar druid, all 6 familiar
kinds, lanterns, memory stones, both beach altars, the Everburn fire pit,
snakes, crossing turtles, picnic blankets, Lost Mail letters. All flagged "no
new sprite" in holiday_status.txt — listed here so they're on the art backlog,
not forgotten.

### 1g. Cleanup

- ~40 retired-roster sprites still loose in `assets/sprites/` (aiko … zora) —
  never loaded, wrong folder.
- `assets/ui/Menu.png` is unreferenced (`ui.menu_bg` loads `menu_bg.png`).
- `SPRITES_TODO.md` §1 is stale — soil, sprout, magic_circle, island_god,
  protein_shake all exist now.

---

## 2. Characters & functions lacking text

The 32-neighbor roster is fully written: base trees + all four seasonal banks +
smalltalk (`dialogue_written.js`, `dialogue_seasonal_extra.js`). The gaps are
all special characters:

| Character | Status |
|---|---|
| **Yarbo** | Sprite, ship, and wander code exist — **zero dialogue, no interact handler.** Talking to him does nothing. |
| **Mac** (furniture salesman, Gettin' Place) | Full script in `NPCConvoUnderworld1.txt` — not in code |
| **Viola** (tailor + bird-watcher variant) | Scripted, not in code |
| **Rob** (materials reseller, Gettin' Place) | Scripted, not in code |
| **Ol' Jeb** (Gettin' Place owner) | Scripted, not in code |
| **Marge the Miracle** (Black Goddess owner) | Scripted, not in code (club.js names her as "later") |
| **A:Sploder** (Electric Temple mainframe) | Scripted, not in code |
| **Jorg** (Bottomless Pit guardian) | Scripted, not in code |
| **MarcOS** (opens the Stars portal) | Mentioned in a game.js comment only — no script, no code |
| Stan, Bob, Mubaba (incl. postgame IOU bit), Yogatron, Island God, Papa Yeesh (silent by design), Hoggy (ollama chat) | ✓ have text |

Also text-adjacent: NPC `personality` is `'custom'` for all 32 — the
personality types the docs assign (kawaii, tsundere, goth, nerd, cheerful, shy,
monk, renaissance) are never set, which blocks item preferences (§3).

---

## 3. Mechanics not built out

### Blocked / broken today

- **World Domination Quest 5 is soft-locked at step 2.** Mubaba asks for
  Stardew from the Stars world; `stardew` exists as an item but **nothing in
  the code can ever grant it** (no addItem source). Consequence: **Teleport is
  unlearnable.** Blocked on the Stars world existing.
- **Dead-end seeds:** `grain_seed` (drops from tall grass) and `rose_seed` /
  `tulip_bulb` (drop from bird poop) are **not plantable** — no
  `SEED_TO_PLANT` entries. Players collect them; they do nothing.

### Whole worlds (expansions.txt + code comments)

- **The Stars** — Electric Temple stands empty "until MarcOS opens the portal."
  Tiles (`grass_stars`, `tree_full_stars`) and music (`Music/stars.ceol`,
  unexported) are staged. Unblocks Quest 5, star grass/stardew, and the
  "dragon → real world" expansion.
- **Sea floor** — "shack by beach will lead to sea floor." Nothing in code.
- **Other islands** — "ship at the docks will eventually lead to other
  islands." Yarbo's ship moors on even days but is scenery only.

### Underground city — empty rooms

7 of 8 buildings have exteriors + interiors, but three interiors have no
content: **Gettin' Place** (Mac/Viola/Rob/Ol' Jeb scripts waiting, §2),
**Inner Temple** (gardening.txt: Sage offerings), **Bottomless Pit** (Jorg
script waiting). **Electric Temple** is deliberately empty pending MarcOS.

### Gardening overhaul (gardening.txt — mostly unbuilt)

Current PLANTS: wildflower, berry bush, flea lily. The doc wants:

- **Crops with 4 seasonal variants each:** grain (wheat/corn/amaranth/rice),
  vine berry (raspberry/strawberry/grape/blueberry), root
  (beet/potato/carrot/yam), gourd (squash/melon/pumpkin/zucchini), yam, sage
  (Inner Temple), 4 species-targeted herbs (sweet/saucy/cool/yeesh), **dirt
  fish** (animated soil plant; throw in pond to animate it)
- **Flowers:** glory, sun, moon, dusk (rose/tulip exist as tiles but aren't growable, see dead-end seeds)
- **Landscape plants:** hedge, bubble bush, bulb tree (multi-color)
- **Bird feeder** (grain fills it) — no feeder object exists

### Item preferences (itempreference.txt — not started)

Loved-gift by personality / liked-gift by species (animals→crops,
robots→metals, ghosts→crystal/gold, monsters→treasure, etc.). `gainGift` takes
a flat value today; needs personalities assigned first (§2).

### Gettin' Stick loot (gsitems.txt)

Doc wants: broken watch ✓, plus **captain's log, gear, rivet, anchor** — none
of the four are items or in `TREASURE_POOL`.

### Player character variants

Four player sprites + 8 personality palettes (`.gpl`) staged in `Sprites/` —
no character-select or skin system in code anywhere.

### Smaller stubs (named in code comments)

- **Backwards Hats Day** — the last unimplemented holiday (array[0]); no outline file either.
- **Eat/drink mechanic** — coffee/donut/foods are gift-only ("can hook in later," cafe.js).
- **Old Radio** — "static only... for now."
- **Island music** — only the underworld has a track; island + stars have none wired (`MUSIC` table has one entry).
- **Club after dark** — neighbors on the dance floor + Marge hosting (club.js "still later").
- **HOLIDAYS array growth** — holiday_status.txt's seasonal calendar assumes 32 slots; array has 29.

---

## Suggested priority order

1. **Unblock Teleport** — either build the Stars world or give stardew an interim source.
2. **Fix dead-end seeds** — small `PLANTS`/`SEED_TO_PLANT` additions for grain/rose/tulip.
3. **Copy staged sprites** (vesper, gigglegrow) — two file copies.
4. **Wire Gettin' Place** — interiors + the four already-written scripts; unlocks furniture shopping.
5. **Portraits** — 35 slots, all auto-load, pure art work; biggest visible polish win.
6. Item icons for the furniture/food/seed lists (88 colored squares today).

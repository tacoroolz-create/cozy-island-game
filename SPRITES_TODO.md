# Sprites still to build

Everything below is referenced by the game but currently draws a **colored-box
fallback** because no art file exists. Grouped by what it is and where it shows
up. Sizes noted where the code fixes them (tiles are 16×16 unless said otherwise).

> **Wiring note:** dropping a `.png` in `assets/` is only half the job. The
> loader only fetches paths listed in `SPRITE_DEFS` (`src/game.js:72`). Items and
> buildings already have their manifest lines. **NPC sprites + portraits are now
> auto-loaded** by a slug loop in `preload()` — just drop the files at the paths
> below and they appear; no manifest edit needed. See the NPC section.

---

## 1. Referenced but flat-out missing files (quick wins)

These paths are already in the manifest — the game tries to load them and logs a
warning. Just drop the file in:

| File | What it is |
|---|---|
| `assets/tiles/soil.png` | Tilled/hoed soil terrain tile |
| `assets/tiles/sprout.png` | Planted-crop sprout terrain tile |
| `assets/sprites/effects/magic_circle.png` | Magic ritual circle effect |
| `assets/sprites/island_god.png` | The Island God character |
| `assets/sprites/protein_shake.png` | Yogatron's protein-shake item (also item, below) |

---

## 2. Neighbor NPCs — 32-character roster (`src/entities.js:6`)

**Two sprites each**, both auto-loaded by name slug (no manifest edits):

| Sprite | Size | Drop it at |
|---|---|---|
| Overworld | **16×32** (1 tile wide, 2 tall; un-flipped art faces **left**) | `assets/sprites/npcs/<slug>.png` |
| Talking portrait | **64×64** (shows in the dialogue box left gutter) | `assets/sprites/portraits/<slug>.png` |

`<slug>` = name lowercased, non-alphanumerics → `_` (e.g. `Sir Cogs-a-Lot` →
`sir_cogs_a_lot`, `Shade-7` → `shade_7`). Full list:

**Robots (8):** piko · rivet · shade_7 · cypher · om_bit · sir_cogs_a_lot · tinker · zap_zap
**Ghosts (8):** boo_boo · wisp · morwen · spectra · hush · sir_haunts_a_lot · flutter · giggles
**Animals (8):** mochi (rabbit) · shadow (cat) · raven (crow) · newton (owl) · lotus (crane) · squire_paws (dog) · pebble (turtle) · sunny (parrot)
**Monsters (8):** fluffernox · grumble · vesper · gizmo · ommmm · lord_roar (dragon-ish) · snug · gigglegrow

The old loose `assets/sprites/*.png` (aiko, grumble, …) are the retired roster —
they're in the wrong folder now and won't load. Rebuild into `npcs/`.

### Permanent NPCs (portraits only, same `portraits/<slug>.png` scheme)
`yogatron` · `stan` (Stimmy Tim's counter) · `bob` (Recycle Bin counter).
Yogatron also gets a 16×32 overworld sprite (`assets/sprites/npcs/yogatron.png`).
Marge and other true NPCs aren't in code yet — add them to `NPC_DEFS` (or their
own def) and they'll pick up the same slug loading.

---

## 3. Buildings

| Type | Sprite key | Status |
|---|---|---|
| `twig_tower` | `sprites.twig_tower` | No art + no manifest line — colored-block placeholder (`src/game.js:453`). Player-built shelter from Castle of Sticks Day. |

All 8 underground buildings and the Shack/House have art. (The Bottomless Pit
uses `bottomless_pit.png`, present.)

---

## 4. Item / object sprites (`ITEMS`, `src/game.js:326`)

Currently draw as colored squares with no icon. Roughly 24×24 icon art. Each
needs a `assets/sprites/<id>.png` **and** an `items.<id>` manifest line.

### Materials / seeds
`pinecone` · `palm_frond` · `bird_poop` · `rose_seed` · `tulip_bulb` · `flea_lily_seed`

### Flowers / garden gifts
`rose` · `tulip` · `flea_lily_bloom`

### Tools
`gettin_stick` (magnet stick) · `pickaxe` · `sturdy_pickaxe`

### Food / cooked gifts
`protein_shake` · `grilled_banana` · `berry_jam` · `fruit_salad`

### Treasure (Gettin' Place pulls)
`glass_bottle` · `gold_coin` · `iron_ingot` · `metal_rod` · `old_radio` · `stardew` · `iou`

### Building material
`thatch`

---

## 5. Furniture & decor (placeable in the home)

Same deal — colored blocks today. Bigger art than icons since they sit in the
room.

### Floor furniture
`chair` · `armchair` · `stool` · `bench` · `end_table` · `coffee_table` ·
`bookshelf` · `dresser` · `cabinet` · `floor_lamp` · `potted_plant` ·
`fireplace` · `brick_fireplace` · `yule_tree` · `flealess_statue`

### Wall decorations
`tapestry` · `painting` · `window` · `drapes` · `wall_clock` · `wall_shelf` ·
`garland` · `wreath` · `mistletoe_sprig`

### Floor decorations
`round_rug` · `runner_rug` · `candle_log` · `holly_vase` · `yule_goat_plush`

### Outdoor placeables
`neighbor_shack` (places a Shack) · `potted_tree` · `potted_fir_tree` ·
`potted_banana_tree` · `potted_palm_tree`

---

## Already have art (for reference — don't redo)

Tiles: grass (+cool/yeesh/underworld/stars variants), beach/beach_edge, water,
sea, trees (palm/banana/basic/cool/yeesh/underground/stars), rock, boulder,
shiny_rock, weeds, flowers, beds, dock. Sprites: player/orb, Mubaba, all 8
underground buildings, shack, house, turtle, seagull, hog, birds, crab,
butterfly, cicada. Items: log, stick, stone, fiber, magnet, crystal, seed, axe,
hoe, banana, bean, berry, feather, seashell, turtle_egg, stale_toast,
cicada_shell.

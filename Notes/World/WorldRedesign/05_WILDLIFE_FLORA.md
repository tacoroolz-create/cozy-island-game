# 05 — New Wildlife & Flora

> Complete catalog of new animals, plants, and seasonal variations per biome.

---

## New Animals

### Mountain Goat
- **Biome:** Mountain (rocky slopes, cliffs)
- **Sprite:** `mountain_goat.png` (16×16)
- **Behavior:** Wanders rocky terrain. Can "climb" cliff tiles (visual only — appears on top of solid rock). Flees if the player gets within 3 tiles, but slower than deer. Stops on elevated outcrops and stares at the player.
- **Spawn time:** Daytime (6 AM – 8 PM)
- **Season:** All seasons (thicker coat visual in Yeesh)
- **Interaction:** Observational only. Feed a `mountain_herb` → goat follows you for 10 tiles (charm, no gameplay benefit).
- **Drops:** None (animals never die/harvest in this game)
- **Sound:** Occasional bleat + bell jingle (if we add a bell variant)

### Deer
- **Biome:** Woods (clearings, near creek)
- **Sprite:** `deer.png` (16×16)
- **Behavior:** Grazes in clearings. When the player approaches within 4 tiles, deer lifts head, stares for 1 second, then bounds away (fast movement in opposite direction). Leaves fading tracks for ~30 seconds.
- **Spawn time:** Dawn and dusk (6 AM – 9 AM, 5 PM – 8 PM)
- **Season:** All (antlers in Yeesh — visual variant)
- **Interaction:** Observational. No feeding — they flee.
- **Drops:** None
- **Sound:** Twig snap when fleeing

### Owl (Nocturnal Bird)
- **Biome:** Woods, Deep Woods (perched on tree tops)
- **Sprite:** `owl_bird.png` (16×16)
- **Behavior:** Perches on tree canopy tiles at night. Stationary. Hoots periodically (every 30-60 seconds). Eyes glow faintly. Flies away at sunrise.
- **Spawn time:** Night (8 PM – 6 AM)
- **Season:** All (more frequent in Cool/Yeesh)
- **Interaction:** Observational. Hooting adds to night ambiance.
- **Drops:** Occasional `feather` on despawn (dawn)
- **Sound:** Hoot (low double-note)

### Eagle
- **Biome:** Mountain (soaring overhead)
- **Sprite:** `mountain_eagle.png` (16×16)
- **Behavior:** Rare spawn (15% chance on clear days). Soars in a wide circle over the mountain peak. Never lands. Purely visual — a distant majestic silhouette.
- **Spawn time:** Daytime (10 AM – 4 PM), clear weather only
- **Season:** All (rare)
- **Interaction:** None — too high to reach. Just beautiful.
- **Drops:** None
- **Sound:** Distant screech (faint)

### Fox
- **Biome:** Woods, Deep Woods (edge areas)
- **Sprite:** `woods_fox.png` (16×16)
- **Behavior:** Sly wanderer. Moves in deliberate paths between clearings. Stops and looks at the player with tilted head. Doesn't flee but doesn't approach. If the player stands still for 5+ seconds nearby, the fox sits down.
- **Spawn time:** Dawn, dusk, and night
- **Season:** All (redder coat in Sweet, grayer in Yeesh)
- **Interaction:** Observational. Leave a `berry` on the ground nearby → fox eats it → leaves a `feather` (traded!).
- **Drops:** None directly (berry trade)
- **Sound:** Occasional yip

### Wild Rabbit
- **Biome:** Meadow
- **Sprite:** `meadow_rabbit.png` (16×16)
- **Behavior:** Hops between clover patches. Digs burrows (visual — small hole tiles appear). If player approaches within 2 tiles, rabbit hops quickly away to another patch. Eats clover (visual animation).
- **Spawn time:** Daytime (6 AM – 8 PM)
- **Season:** All
- **Interaction:** Observational. (Distinct from Mochi the NPC rabbit — this is a wild animal, not a neighbor.)
- **Drops:** None
- **Sound:** Soft thump when hopping

### Cave Bat
- **Biome:** Mountain cave (future), Deep Woods (night)
- **Sprite:** `cave_bat.png` (16×16)
- **Behavior:** Nocturnal. Flies in erratic zigzag patterns between trees. Swarms of 3-5 in deep woods at night.
- **Spawn time:** Night (8 PM – 6 AM)
- **Season:** All
- **Interaction:** Observational. Fly near the player but never collide.
- **Drops:** None
- **Sound:** High-pitched squeak (very faint)

### Stream Fish
- **Biome:** Woods (creek)
- **Sprite:** `stream_fish.png` (16×16)
- **Behavior:** Visible under creek water. Swims in short bursts upstream. Occasionally jumps (splash effect). Purely visual — creek is shallow, fish are small.
- **Spawn time:** Daytime
- **Season:** Sweet, Saucy, Cool (not Yeesh — too cold)
- **Interaction:** Observational. Cast Gettin' Stick in creek → different loot table (freshwater: `creek_stone`, `glass_bottle`, rare `gold_coin`).
- **Drops:** None directly (Gettin' Stick handles loot)
- **Sound:** Occasional splash

### Firefly (as Animal Entity)
- **Biome:** Meadow, Deep Woods (evening)
- **Sprite:** `firefly.png` (16×16)
- **Behavior:** Currently exists as an ambient particle effect. This upgrade makes fireflies individual entities that drift between flower patches (meadow) or mushroom patches (deep woods). They glow on a 2-second pulse cycle.
- **Spawn time:** Dusk to dawn (7 PM – 6 AM)
- **Season:** Sweet, Saucy (warm seasons)
- **Interaction:** Observational. Walking through a cluster of fireflies → they scatter briefly then reconverge.
- **Drops:** None
- **Sound:** None (silent glow)

---

## New Plants & Flora

### Harvestable Plants

| Plant | Biome | Tile Type | Harvest Item | Respawn | Season | Notes |
|-------|-------|-----------|-------------|---------|--------|-------|
| **Glowing Mushroom** | Deep Woods | `glowing_mushroom` | `glow_cap` | Daily | All | Glows at night. Goth-loved gift. |
| **Forest Mushroom** | Woods | `forest_mushroom` | `mushroom` (existing) | Daily | All | Already exists as item, now has a tile source. |
| **Wildflower** | Meadow | `wildflower` | `wildflower` (new item) | Daily | Sweet, Saucy, Cool | Kawaii-loved gift. Multiple color variants. |
| **Clover** | Meadow | `clover` | `clover` (new item) | Daily | All | Neutral gift. 1% chance: `lucky_clover` (+50 friendship gift). |
| **Mountain Herb** | Mountain | `mountain_herb` | `mountain_herb` (new item) | Daily | Sweet, Saucy, Cool | Monk-loved gift. Grows on mountain grass. |
| **Pine Cone** | Mountain | (harvest from `pine_tree`) | `pine_cone` (existing item) | Tree respawn | All | Sprite already exists in Sprites/ as `pinecone.png`. |
| **Creek Stone** | Woods | (forage from `creek`) | `creek_stone` (new item) | Daily | All | Material item. Smooth stone. |

### Decorative Plants (Non-Harvestable)

| Plant | Biome | Tile Type | Notes |
|-------|-------|-----------|-------|
| **Fern** | Woods | `fern` | Lush green clusters. Visual only. |
| **Moss** | Deep Woods | `moss` (overlay on `grass_dark`) | Adds texture to dark ground. |
| **Alpine Flower** | Mountain | `alpine_flower` | Tiny flowers on mountain grass. Sweet/Saucy only. |
| **Lily Pad** | Meadow | `lily_pad` (on pond water) | Decorative pond surface. |
| **Reed** | Woods / Meadow | `reed` (near water) | Tall reeds at water edges. Sways in wind. |
| **Snowdrop** | Mountain | `snowdrop` | First flower of spring. Sweet season only, at snow line. |
| **Glow Moss** | Deep Woods | `glow_moss` (overlay) | Faint glow on rocks/trees at night. |

### New Tree Types

| Tree | Biome | Size | Harvest | Notes |
|------|-------|------|---------|-------|
| **Twisted Tree** | Deep Woods | 16×32 (2-tall) | `dark_wood` log | Gnarled, dark canopy. Fits spooky vibe. |
| **Pine Tree** | Mountain | 16×32 (2-tall) | `pine_cone` + `log` | Tall narrow alpine pine. |
| **Oak Tree** | Woods | 16×32 (2-tall) | `log` + `acorn` (new item?) | Large spreading canopy. Standard woods tree. |
| **Willow Tree** | Woods (near creek) | 16×32 (2-tall) | `log` | Drooping canopy. Decorative. |
| **Dead Tree** | Deep Woods | 16×32 (2-tall) | `log` (bare) | Leafless. Adds spooky atmosphere. Not harvestable (too brittle?). |
| **Palm Tree** | Beach | 16×32 (2-tall) | `banana` (from banana variant) | Re-add with clean trunk/canopy split. |

---

## Seasonal Variations Per Biome

### Sweet Season (Spring)

| Biome | Visual Change | New Spawns |
|-------|---------------|------------|
| Beach | Warm sand, gentle waves | Sandcastles (Sweet Valley holiday) |
| Meadow | **Peak wildflower bloom** — dense flowers everywhere | Butterflies (early), wild rabbits, clover patches |
| Woods | Blossoms on deciduous trees | Deer (active), birds (nesting), mushroom sprouts |
| Town | Flower boxes on shack windows | Garden seedlings |
| City | Flower planters on streets | Street vendor (seasonal) |
| Deep Woods | Fresh green mist | Glowing mushrooms (brightest), foxes (active) |
| Mountain | Snow melting on lower slopes | Snowdrops at snow line, alpine flowers, goats (active) |

### Saucy Season (Summer)

| Biome | Visual Change | New Spawns |
|-------|---------------|------------|
| Beach | Hot sand, sparkly water | Crabs (active), seagulls, turtles (nesting) |
| Meadow | Lush deep green, fireflies at dusk | Butterflies (peak), rabbits, clover |
| Woods | Full green canopy, dense shade | Cicadas (peak), deer, owlets |
| Town | Awnings out, market bustling | All NPCs social in town square |
| City | Outdoor cafe seating | Street vendor, club open late |
| Deep Woods | Humid, thick mist | Cicadas, foxes, bats (warm nights) |
| Mountain | Clear trails, best visibility | Eagles (most common), goats, hikers (tourists) |

### Cool Season (Autumn)

| Biome | Visual Change | New Spawns |
|-------|---------------|------------|
| Beach | Cooler, fewer tourists | Crabs (still active), driftwood |
| Meadow | Late flowers, falling petals | Butterflies (last), wildflowers fading |
| Woods | **Falling leaf particles** — orange/red canopy | Deer (rutting, more active), owls (more frequent) |
| Town | Leaf piles on cobblestone paths | Garden harvests, lantern-lit evenings |
| City | String lights along streets | Club cozy, warm window glow |
| Deep Woods | Falling dark leaves | Cicada shells (end of season), mist thickening |
| Mountain | First frost on grass | Goats (thicker coats), fewer eagles |

### Yeesh Season (Winter)

| Biome | Visual Change | New Spawns |
|-------|---------------|------------|
| Beach | Cold sand, frost on driftwood | Seagulls only, no crabs/turtles |
| Meadow | Frost-kissed flowers, dormant grass | Fireflies gone, rabbits (rare, in burrows) |
| Woods | Bare branches, snow on ground | Owls (peak — most active), foxes (gray coat) |
| Town | **Snow on rooftops**, lanterns glow brighter | All NPCs huddle indoors, chimney smoke |
| City | Snow on buildings, warm windows | Club as warm refuge, fewer street vendors |
| Deep Woods | **Frost mist**, snow on twisted branches | Bats (fewer), glowing mushrooms (dimmer but still visible) |
| Mountain | **Heavy snow**, peak impassable | Goats (thick winter coat), no eagles, snow persists |

---

## Item Reference: New Items

| Item ID | Name | Category | Source | Gift Value | Notes |
|---------|------|----------|--------|------------|-------|
| `glow_cap` | Glow Cap | material | Deep Woods mushroom harvest | Monk-loved, Goth-liked | Bioluminescent. Crafting ingredient. |
| `wildflower` | Wildflower | gift | Meadow wildflower harvest | Kawaii-loved (+30) | Multiple color variants (visual only). |
| `clover` | Clover | gift | Meadow clover harvest | Neutral (+5) | Common. |
| `lucky_clover` | Lucky Clover | gift | Meadow clover (1% rare) | **Super-loved (+50)** | Rare. Any personality. |
| `mountain_herb` | Mountain Herb | gift | Mountain herb harvest | Monk-loved (+30) | Alpine medicinal herb. |
| `creek_stone` | Creek Stone | material | Woods creek foraging | Neutral | Crafting material (smooth stone path?). |
| `dark_wood` | Dark Wood | material | Deep Woods twisted tree harvest | Neutral | Crafting variant. Darker furniture? |
| `acorn` | Acorn | gift | Woods oak tree harvest | Shy-liked, Animal-liked | Squirrel-favorite (future NPC?). |

---

## Procedural Audio Per Biome

Building on the existing Web Audio API system:

| Biome | Ambient Sound | Trigger |
|-------|---------------|---------|
| Beach | Gentle wave loop + seagull calls | Entering beach biome |
| Meadow | Bird chorus + cricket night | Entering meadow biome |
| Woods | Leaves rustling + creek babble + owl hoots | Entering woods biome |
| Town | Fountain splash + NPC chatter + chimney crackle | Entering town biome |
| City | City hum + distant club music + clock chime | Entering city biome |
| Deep Woods | Low drone + wind through branches + mist chimes | Entering deep woods biome |
| Mountain | Wind howling + goat bells + rock rumbles | Entering mountain biome |

Implementation: Add a `currentBiomeAmbient` tracker in `drawGame()`. When the player's biome changes, crossfade between ambient sounds over 2 seconds.
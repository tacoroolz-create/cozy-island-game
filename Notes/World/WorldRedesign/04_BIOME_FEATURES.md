# 04 — Biome Features & Gameplay Hooks

> Per-biome gameplay features, interactions, ambient details, and unique mechanics.

---

## 1. Beach (NW Corner)

### Core Identity
The arrival point. Tropical, sunny, sandy. The dock and ocean horizon anchor the player's first impression.

### Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Dock** | 8×4 wooden pier extending into the sea. NPCs and tourists arrive here. | Existing `placeDock()` — repositioned to (0, 10) |
| **Seashell harvesting** | Scattered seashell tiles on the beach. Harvest for `seashell` item (already exists). | New `seashell_tile` tile type, daily spawn like flotsam |
| **Driftwood** | Flotsam piles that wash up daily. Walk over to auto-pickup sticks/fiber. | Existing flotsam system, now beach-only |
| **Gettin' Place** | Fishing shop relocated here. Buy/craft Gettin' Stick, cast for treasure. | `ug_gettin` building placed on beach near dock |
| **Crab interactions** | Compliment a Crab Day already exists. Crabs spawn on beach only. | Existing animal system, biome-restricted |
| **Turtle nesting** | Turtles appear on beach during Sour Season (already implemented). | Existing, now beach-biome-only |
| **Beach bonfire** | Peak Saucy holiday bonfire happens here (already implemented). | Existing holiday, now beach-specific |
| **Horizon watching** | Standing at the west edge of the dock and pressing Enter shows a special horizon message. | New interaction: `tryHorizonWatch()` |
| **Sandcastles** | During Sweet Season, sandcastle tiles appear on the beach. Decorative, interactable. | New `sandcastle` tile type, seasonal spawn |

### Ambient Details
- **Sound:** Gentle waves (procedural audio — soft noise + low sine)
- **Weather:** Rain creates puddle reflections; wind blows sand particles
- **Lighting:** Brightest biome — golden sand + turquoise water
- **Time of day:** Sunrise over the ocean (east-facing beach means the sun rises behind the island — actually the beach faces NW, so sunsets are the star)

### Unique Interactions
- **Horizon watch:** Facing west from the dock edge, press Enter → "The horizon stretches forever. Something out there? Or just the dream ending?" (Flavor only, no mechanic.)
- **Beachcombing:** Each morning, 3-5 seashells spawn randomly on beach tiles. Pick up like flotsam.
- **Message in a bottle:** Rare (5% per day) `glass_bottle` washes up on beach. Contains a random neighbor's written note (flavor text).

---

## 2. Meadow (North-Central)

### Core Identity
Open, flowery, peaceful. The social hub for kawaii personalities. Where butterflies gather.

### Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Wildflower fields** | Dense rosebush + tulip spawns. More than current (2 rosebushes → 8+). | Increase spawn count in meadow decorate pass |
| **Butterfly meadow** | Butterflies spawn here in Cool Season (already implemented). | Existing, now meadow-concentrated |
| **Meadow pond** | Small pond (6×6) with lily pads. Connects to underground pond portal. | Existing pond system, repositioned |
| **Picnic spot** | A permanent picnic blanket tile near the pond. Sit and eat → friendship boost with nearby NPCs. | New `meadow_picnic` tile, interaction |
| **Wildflower picking** | Pick wildflowers → `wildflower` item (gift item, loved by kawaii personality). | New harvestable tile type |
| **Clover patch** | A dense patch of clover tiles. Lucky clover (1% chance) → `lucky_clover` item (gift, gives +50 friendship). | New `clover` tile, rare variant |
| **Windmill** | Decorative animated windmill (2×2). Blades spin with wind. | New `meadow_windmill` building sprite |
| **Firefly evening** | Fireflies appear here at dusk in Sweet/Saucy seasons (already in game as ambient). | Existing ambient, meadow-focused |

### Ambient Details
- **Sound:** Bird chirps (meadow songbirds), cricket chorus at night
- **Weather:** Rain makes flowers bloom brighter (visual variant); wind sways tall grass
- **Lighting:** Soft, dappled, warm
- **Seasonal:** Sweet = peak blooms; Saucy = lush green; Cool = late flowers + falling petals; Yeesh = frost-kissed flowers

### Unique Interactions
- **Flower picking:** Harvest wildflower tiles → `wildflower` item. Respawns daily.
- **Picnic:** Sit on the picnic blanket with food in inventory → eat → if a kawaii NPC is nearby, they join → +5 friendship.
- **Pond fishing:** Cast Gettin' Stick into the meadow pond → different treasure table than ocean (freshwater items).
- **Butterfly census:** During Cool Season, interact with a butterfly → "You counted 7 butterflies today!" (Almanac entry, flavor).

---

## 3. Woods (West-Central)

### Core Identity
Forested, dappled light, peaceful. The shy and tsundere hangout. Trees, mushrooms, a creek.

### Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Tree harvesting** | Standard trees (oak, birch) for wood/logs. Denser than current scatter. | Existing tree system, biome-concentrated |
| **Mushroom foraging** | Mushroom tiles on the forest floor. Harvest → `mushroom` item (already exists). | New `forest_mushroom` tile type, daily spawn |
| **Creek** | A winding creek (3-4 tiles wide) running N→S through the woods. Shallow, walkable. | New `creek` tile type |
| **Creek foraging** | Forage in creek → `creek_stone` item (smooth stone, crafting material). | New interaction on creek tiles |
| **Ferns** | Decorative fern clusters. Non-harvestable, pure ambience. | New `fern` decoration tile |
| **Deer** | Wild deer wander the woods. Observational — they flee from the player. | New `deer` animal entity |
| **Owl** | Nocturnal owl perches on tree branches at night. Hoots. | New `owl_bird` animal entity |
| **Woods cabin** | An abandoned cozy cabin in a clearing. Enterable interior (future: NPC home or shop). | New `woods_cabin` building |
| **Bird watching** | Birds spawn more frequently here than any other biome (woods = best birding). | Existing bird system, biome-boosted |

### Ambient Details
- **Sound:** Rustling leaves, bird songs, creek babble, owl hoots at night
- **Weather:** Rain creates dripping effects from canopies; wind rustles branches
- **Lighting:** Dappled — slightly darker under tree canopy, bright in clearings
- **Seasonal:** Sweet = blossoms on trees; Saucy = full green canopy; Cool = falling leaf particles; Yeesh = bare branches + snow on ground

### Unique Interactions
- **Mushroom hunt:** Each morning, 4-8 `forest_mushroom` tiles spawn in the woods. Harvest for mushrooms.
- **Creek crossing:** The creek is walkable but slows movement slightly (visual: splash effect). No gameplay penalty unless we want one.
- **Tree canopy shelter:** Standing under a tree during rain → reduced rain particles (visual, cozy detail).
- **Deer tracking:** Deer leave tracks that fade over ~30 seconds. Following tracks → encounter deer.

---

## 4. Town (Center)

### Core Identity
Homey, community-focused. Where NPC shacks cluster. The social heart of the island.

### Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **NPC shacks** | All 32 neighbors' homes cluster here along streets. | New `TOWN_SHACK_PLOTS` system (see 03_NPC_PLACEMENT.md) |
| **Cobblestone paths** | Paths connect shacks, the market, and the fountain. | New `cobblestone` tile, placed in `decorateTown()` |
| **Town fountain** | 2×2 fountain in the town square. Throw a coin → make a wish (small luck boost). | New `fountain` building, `tryFountainWish()` |
| **Town market** | Open-air market stall (Stimmy Tim's relocated here). Coffee + donuts. | `ug_stimmy_tims` building placed in town |
| **Lantern posts** | Decorative lanterns along paths. Emit light at night. | New `lantern_post` 2-tall decoration |
| **Garden plots** | Pre-placed soil tiles near shacks for community gardening. | `soil` tiles placed in `decorateTown()` |
| **Town notice board** | Interactable board showing today's holiday and neighbor arrival info. | New `notice_board` tile, `tryReadNoticeBoard()` |
| **Flealess Market** | Holiday merchant sets up here (already implemented, now town-specific). | Existing holiday, positioned in town |

### Ambient Details
- **Sound:** Chimney smoke wisps, door creaks, NPC chatter, fountain splashing
- **Weather:** Rain creates puddles on cobblestone; snow dusts roofs
- **Lighting:** Warm, cozy — lanterns at night create pools of orange light
- **Seasonal:** Sweet = flower boxes on windows; Saucy = awnings out; Cool = leaf piles on paths; Yeesh = lanterns glow brighter, smoke from chimneys

### Unique Interactions
- **Fountain wish:** Face the fountain, press Enter, have a `gold_coin` → throw coin → "You made a wish." (5% chance: next gift to any NPC is loved instead of neutral.)
- **Notice board:** Read the board → shows today's holiday name, which NPCs are present, and arrival/departure notices.
- **Neighbor visiting:** Knock on an NPC's shack door (interact while facing it) → if they're home (night), short door conversation.
- **Town gossip:** NPCs in the town square share biome-specific gossip about neighbors in other biomes.

---

## 5. City (East-Central)

### Core Identity
Urban-cozy, bustling, shops and nightlife. The commercial hub.

### Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **City streets** | Wider paved streets with street lamps. | New `city_street` tile, `street_lamp` decoration |
| **Recycle Bin** | Sell items for IOUs (relocated from underground). | `ug_recycle_bin` building placed in city |
| **Electric Temple** | Neon/tech temple (relocated from underground). | `ug_electric_temple` building placed in city |
| **Black Goddess** | Nightclub with rhythm game (relocated from underground). | `ug_black_goddess` building placed in city |
| **City plaza** | Large plaza with benches and patterned tiles. | New `plaza_tile` + `bench` decoration |
| **Clock tower** | Landmark clock tower. Shows current in-game time visually. | New `city_clocktower` 1×3 building |
| **Street vendor** | Wandering vendor NPC sells random items for IOUs. | Future: `city_vendor` NPC (Phase 5) |
| **Neon at night** | City buildings glow with neon at night — brightest biome after dark. | Night-time visual variant on city buildings |

### Ambient Details
- **Sound:** City hum, distant music from the club, clock tower chime on the hour
- **Weather:** Rain reflects on wet streets (visual sheen); wind doesn't reach between buildings
- **Lighting:** Neon-bright at night, busy daytime
- **Seasonal:** Sweet = flower planters; Saucy = outdoor cafe seating; Cool = string lights; Yeesh = snow on rooftops + warm window glow

### Unique Interactions
- **Clock tower chime:** On every in-game hour, the clock tower plays a short chime. At midnight, a longer melody.
- **Club dancing:** Already implemented (rhythm game in Black Goddess). Now on the surface — no tunnel needed.
- **IOU economy:** Recycle Bin, Gettin' Place, and Stimmy Tim's all accept/spend IOUs. The city is the financial hub.
- **Street performance:** During holidays, a temporary NPC performs in the plaza → small crowd of neighbors gathers.

---

## 6. Deep Woods (SW)

### Core Identity
Spooky-cozy, misty, mysterious. Mubaba's domain. The deep woods are where the dream gets a little darker — but still cozy.

### Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Mubaba's Fortress** | Mubaba's surface fortress (relocated from underground). Magic merchant + quests. | `ug_mubaba_fortress` building placed in deep woods |
| **Bottomless Pit** | The literal bottomless pit (relocated from underground). Interact → drop through? | `ug_bottomless_pit` building placed in deep woods |
| **Inner Temple** | Meditation temple (relocated from underground). Quiet, mystical. | `ug_inner_temple` building placed in deep woods |
| **Glowing mushrooms** | Bioluminescent mushroom tiles. Emit faint glow at night. Harvestable → `glow_cap`. | New `glowing_mushroom` tile type |
| **Mist** | Semi-transparent mist tiles drift between trees. Visual only, adds atmosphere. | New `mist` animated tile |
| **Twisted trees** | Gnarled, dark-canopy trees. Harvestable like normal trees but yield `dark_wood` (crafting variant). | New `twisted_tree` 2-tall tree |
| **Tunnel to underworld** | The underground tunnel entrance is here (relocated). | `ISLAND_TUNNEL_ORIGIN` moved to deep woods |
| **Forest spirit** | Optional NPC: Lumen, the shy ghost who drifts between mushrooms. | Phase 5: `deep_woods_spirit` NPC |
| **Cicada chorus** | Cicadas cling to deep woods trees in Sour Season. Loudest here. | Existing cicada system, biome-boosted |

### Ambient Details
- **Sound:** Low drone, wind through twisted branches, distant chimes, cicada buzz (Sour)
- **Weather:** Mist thickens during rain; wind creates eerie sounds
- **Lighting:** Darkest biome during day (dense canopy), but glowing mushrooms + mist create beautiful night lighting
- **Seasonal:** Sweet = misty green; Saucy = humid, thick mist; Cool = falling dark leaves; Yeesh = frost mist, snow on twisted branches

### Unique Interactions
- **Glowing mushroom harvest:** Each evening, 2-4 `glowing_mushroom` tiles glow brighter. Harvest → `glow_cap` item (gift, loved by goth personality).
- **Mist walking:** Walking through mist tiles creates a brief particle trail. No gameplay effect, pure coziness.
- **Bottomless Pit:** Interact → "You peer into the pit. It goes... down. Far down. Something down there hums." (Flavor + future quest hook.)
- **Mubaba's quests:** Mubaba's questline now starts from his surface fortress. The underground is accessible via the nearby tunnel for deeper quest content.
- **Peek Yeesh connection:** The Peak Yeesh bonfire could alternatively be built here (the "longest night" feels right in the spooky woods). Or the silent visitor comes from the deep woods.

---

## 7. Mountain (SE + NE strip)

### Core Identity
Alpine, rocky, elevated. The farthest reach. Goats, cliffs, a cave, an overlook.

### Features

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Elevation terrain** | Grass → rock → snow gradient as you climb. Rock is solid (must path around). | `getElevation()` system, `mountain_rock` solid tiles |
| **Mountain goats** | Wild goats wander rocky terrain. Climb cliffs. Observational. | New `mountain_goat` animal entity |
| **Pine trees** | Sparse alpine pines on lower slopes. Harvestable. | New `pine_tree` 2-tall tree |
| **Cave entrance** | Enterable cave (future: cave interior map with crystals, bats). | New `mountain_cave` building, enters new map |
| **Overlook** | At the peak, a scenic overlook. Face the edge → see the whole island spread below. | New `tryOverlookView()` interaction |
| **Observatory** | Small telescope building at the peak. Interact → stargazing (night) or cloud watching (day). | New `observatory` building |
| **Boulders** | Large rocks block paths, create maze-like navigation. | Existing `boulder` tile, mountain-concentrated |
| **Mountain path** | Winding gravel path up the mountain. | New `mountain_path` tile |
| **Eagle** | Rare soaring eagle. Appears on clear days. | New `mountain_eagle` animal entity |
| **Cliff guard** | Medieval NPCs (Sir Cogs-a-Lot, Lord Roar) patrol the cliffs. | Hangout spot, no new code |

### Ambient Details
- **Sound:** Wind howling (stronger than other biomes), goat bells, rock rumbles
- **Weather:** Snow at the peak even in Sweet season (high altitude); rain on lower slopes; wind is strongest here
- **Lighting:** Brightest at the peak (above tree line), cooler blue tones
- **Seasonal:** Sweet = snow melting, wildflowers on lower slopes; Saucy = clear trails; Cool = first frost; Yeesh = heavy snow, near-impassable peak

### Unique Interactions
- **Overlook view:** At the peak overlook, face south → "The whole island spreads below you. You can see the dock, the town smoke, the deep woods mist. It's all a dream." (Flavor + Almanac entry.)
- **Stargazing:** At the observatory at night → "The stars are different here. Or maybe you're different." (Flavor + rare `star_fragment` item 10% chance.)
- **Cave exploration:** Enter the cave → new small map (future Phase 5: crystal mining, bat colony, underground spring).
- **Mountain climbing:** Rock tiles are solid — the player must find paths around them, creating a natural maze. Higher elevation = more rock = more navigation challenge.
- **Goat watching:** Observe a mountain goat → it stares back. After 3 seconds, it climbs a cliff. (Pure charm.)

---

## Cross-Biome Systems

### Weather Per Biome

| Biome | Rain | Snow | Wind | Crigeon |
|-------|------|------|------|---------|
| Beach | Yes | No (rare) | Strong | Rare |
| Meadow | Yes | Yes (Yeesh) | Gentle | Yes |
| Woods | Drips through canopy | Light (under trees) | Rustles leaves | Rare |
| Town | Puddles on cobble | Snow on roofs | Minimal | Rare |
| City | Street sheen | Snow on buildings | Blocked by buildings | Rare |
| Deep Woods | Mist thickens | Frost mist | Eerie sounds | Yes (native) |
| Mountain | Rain on slopes | Snow at peak (always) | **Strongest** | Rare |

### Holiday Biome Connections

| Holiday | Biome Connection |
|---------|-----------------|
| Sweet Valley | Beach altar (already) |
| Peak Saucy | Beach bonfire (already) → could add meadow picnics |
| Cool Valley | Meadow memory walk (already near shore) → could add woods lantern walk |
| Peak Yeesh | Town Everburn bonfire → could add deep woods silent visitor |
| Compliment a Crab Day | Beach (already) |
| Garden Day | Town gardens (now central) |
| Day of the Island God | Beach east shore → rocky coast |
| Memory Lantern Night | Beach shore → could extend to woods creek |
| The Petal Path Maker | Dock to home → now dock to town (longer path) |
| Castle of Sticks Day | Twig tower → now placed in town or woods |
| Snake Run Day | Snakes dart between trees → woods + deep woods |
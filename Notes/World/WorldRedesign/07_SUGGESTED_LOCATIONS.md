# 07 — Suggested Additional Locations

> Beyond the 7 core biomes, these are optional locations and features that could enrich the world in later phases.

---

## Surface Locations

### 1. Hot Spring (Mountain)
- **Position:** Mountain biome, mid-elevation, near a cliff face
- **Size:** 4×3 tiles (water pool + rock surround)
- **Description:** A natural hot spring warmed by dream-geothermal magic. Steam rises gently. The water is a warm turquoise.
- **Mechanic:** Sit in the hot spring → time advances 1 hour, stamina/health restored (if we add stamina). For now: sitting → "You soak in the warm water. The dream feels... softer here." + small friendship boost if an NPC is soaking nearby.
- **Who visits:** Monks (Om-Bit, Hush, Lotus, Ommmm) meditate here in the morning. Tsunderes (Rivet, Shadow) "definitely didn't come here to relax."
- **Sprites needed:** `hot_spring.png` (water variant), `steam.png` (particle)
- **Priority:** LOW (Phase 5+)

### 2. Lighthouse (Rocky Coast)
- **Position:** South rocky coast, on a cliff overlooking the sea
- **Size:** 2×3 tiles (tower + light)
- **Description:** A small lighthouse that sweeps a beam across the southern ocean at night. Its light is warm and steady. A spiral staircase inside leads to the top.
- **Mechanic:** Climb to the top → overlook view of the southern sea. At night, the beam is visible from anywhere on the island (a rotating light on the horizon). Interact with the lamp → "You tend the light. It feels important, somehow."
- **Who visits:** Gothic personalities (Shade-7, Morwen, Raven, Vesper) come here at night to watch the beam. Medieval types (Sir Haunts-a-Lot) treat it as a sacred duty.
- **Sprites needed:** `lighthouse.png` (2×3, animated light), `lighthouse_top.png` (interior)
- **Priority:** LOW (Phase 5+)

### 3. Treehouse (Woods)
- **Position:** Woods biome, in the largest tree in the forest
- **Size:** 2×2 (accessed via rope ladder)
- **Description:** A cozy treehouse nestled in the canopy. Accessed by interacting with a special tree → "climb up" prompt. Interior is a small room with a window overlooking the woods.
- **Mechanic:** Enterable interior (like NPC shacks). Could be a player second home or an NPC's dwelling. Great for the shy personalities.
- **Who lives here:** Tinker (shy robot) or Flutter (shy ghost) — their "home" could be the treehouse instead of a ground shack.
- **Sprites needed:** `treehouse_tree.png` (2-tall with house on top), `treehouse_interior.png`
- **Priority:** LOW (Phase 5+)

### 4. Fairy Ring (Deep Woods)
- **Position:** Deep woods, in a hidden clearing
- **Size:** 5×5 ring of mushrooms
- **Description:** A perfect circle of glowing mushrooms. Stepping into the center at midnight during a full moon (or Peak Yeesh) → a brief magical event: fireflies swirl, a soft chime plays, and the player receives a `star_fragment` (rare gift item).
- **Mechanic:** Once-per-season event at midnight. The fairy ring "activates" — mushrooms pulse brightly, ambient music shifts, player gets a gift. Pure magic/coziness.
- **Who knows about it:** Monks and goths mention it in dialogue: "There's a place in the deep woods where the mushrooms form a circle. I wouldn't step inside at midnight. ...Or would I?"
- **Sprites needed:** Uses existing `glowing_mushroom` tile in a ring pattern
- **Priority:** LOW (Phase 5+)

### 5. Geyser Field (Mountain)
- **Position:** Mountain biome, lower slopes
- **Size:** Scattered 1×1 geyser tiles
- **Description:** Small geysers that erupt on a timer (every 30 seconds). Steam and water spray briefly. Purely visual and charming.
- **Mechanic:** Stand next to a geyser when it erupts → "You got splashed! But it's warm." Tiny cosmetic effect. Some geysers are predictable (fixed timer), others random.
- **Who visits:** Nerd personalities (Cypher, Spectra, Newton, Gizmo) study the eruption patterns.
- **Sprites needed:** `geyser.png` (animated: idle + erupting frames)
- **Priority:** LOW (Phase 5+)

### 6. Hidden Cove (Beach edge)
- **Position:** Small pocket beach on the west coast, accessible only by walking through a narrow gap in rocks
- **Size:** ~8×6 tiles
- **Description:** A secret tiny beach hidden behind rocky cliffs. The sand is pink (dream logic). A single palm tree. A buried treasure (one-time `gold_coin` × 3).
- **Mechanic:** Discover by walking along the west coast → narrow gap between rocks → hidden cove. One-time treasure dig. After discovery, it becomes a peaceful spot NPCs occasionally visit.
- **Who visits:** Cheerful types love it ("A secret beach!"). Kawaii types pick the pink sand.
- **Sprites needed:** `pink_sand.png` (beach variant), `rock_arch.png` (entrance)
- **Priority:** LOW (Phase 5+)

### 7. Whispering Cave (Mountain)
- **Position:** Behind the mountain cave entrance
- **Size:** Small interior map (10×8 tiles)
- **Description:** A cave with glowing crystal formations and a gentle echoing whisper. The whisper is actually distorted NPC dialogue fragments — you can hear faint pieces of neighbor conversations from across the island.
- **Mechanic:** Enter cave → ambient whisper sound (random NPC dialogue lines, pitch-shifted and echoed). Mine `crystal` from crystal tiles. A bat colony lives here.
- **Who visits:** Goth and nerd personalities mention the cave. "The whispers in the cave... they sound like the neighbors. But wrong. Dreamily wrong."
- **Sprites needed:** `crystal_formation.png`, `cave_wall.png`, `cave_floor.png`
- **Priority:** MEDIUM (Phase 5)

### 8. Community Garden (Town)
- **Position:** Town biome, behind the market square
- **Size:** 10×8 tiles of pre-placed soil
- **Description:** A shared garden plot where the player and NPCs can grow crops. Some plots are "claimed" by NPCs (their garden). The player gets 2-3 plots of their own.
- **Mechanic:** Pre-placed `soil` tiles. NPCs tend their plots in the morning (visual: they stand by their garden). Player can plant in unclaimed plots. Harvested crops near an NPC's plot → that NPC gets a small friendship boost ("You grew that near my garden! How lovely!").
- **Who visits:** All personalities garden in the morning. Kawaii and cheerful types are most active.
- **Sprites needed:** Uses existing `soil` and `sprout` tiles
- **Priority:** MEDIUM (Phase 4)

### 9. Wishing Well (Woods)
- **Position:** Woods biome, near the creek
- **Size:** 2×2 tiles
- **Description:** An old stone well with clear water at the bottom. Mossy, ancient, cozy. Drop a `gold_coin` → wish. Different from the fountain (wishes here are "deeper" — affect friendship with a random NPC).
- **Mechanic:** Drop coin → "You make a wish at the old well." → random NPC gets +3 friendship (you don't know which one). "Someone on the island is thinking of you."
- **Who visits:** Monks meditate near it. Shy NPCs whisper wishes here.
- **Sprites needed:** `wishing_well.png` (2×2)
- **Priority:** LOW (Phase 5+)

### 10. Star Pond (Meadow, night)
- **Position:** The meadow pond, at night
- **Description:** At night, the meadow pond reflects the sky perfectly — stars and moon ripple on the surface. Standing at the edge and looking down → "You see stars below and above. For a moment, you can't tell which way is up." (Cosmic cozy moment.)
- **Mechanic:** Nighttime only interaction at the pond edge. Flavor text + rare `star_fragment` (5% chance per night).
- **Sprites needed:** Uses existing pond tiles + night overlay
- **Priority:** LOW (Phase 5+)

---

## Underground / Alternate Map Locations

### 11. Crystal Caverns (Underground expansion)
- **Position:** Connected to the existing underground map via a new tunnel
- **Description:** A sparkling cavern filled with crystal formations. Different from the Whispering Cave — this is a proper underground biome with harvestable crystals, underground streams, and glowing moss.
- **Mechanic:** Mine crystals (existing `crystal` item). Rare `star_fragment` in deep pockets. Underground spring restores "energy."
- **Priority:** LOW (Phase 5+, underground expansion)

### 12. Dream Nexus (Deepest underground)
- **Position:** Bottom of the crystal caverns
- **Description:** The deepest point of the underground. A pulsing orb of light that hums with dream-energy. This is where the dream "comes from" — a story-arc location for Mubaba's questline.
- **Mechanic:** Story content. Mubaba's final quest brings you here. The Nexus gives a one-time gift: the `dream_core` (ultimate gift item, +100 friendship to any NPC).
- **Priority:** LOW (Phase 5+, story content)

---

## Holiday-Specific Locations

### 13. Festival Grounds (Town, holiday-temporary)
- **Position:** Town square expands during holidays
- **Description:** During holidays like The Flealess Market, Tourist Time, and The Picnic Reset, the town square transforms with temporary stalls, banners, and decorations.
- **Mechanic:** Holiday events that currently spawn near the dock could spawn in the town square instead, creating a proper festival atmosphere.
- **Priority:** MEDIUM (Phase 4, holiday repositioning)

### 14. Altar of the Island God (Beach, holiday-temporary)
- **Position:** Beach biome, already exists for Sweet Valley
- **Description:** The seasonal altar. Already implemented. Could get visual upgrades per season.
- **Priority:** Already exists

### 15. Bonfire Site (Beach or Deep Woods)
- **Position:** Beach (Peak Saucy) or Deep Woods (Peak Yeesh alternative)
- **Description:** The bonfire site for solstice holidays. Could have a permanent fire pit that's relit during festivals.
- **Priority:** Already implemented (could add deep woods variant)

---

## Transportation

### 16. Ferry Service (Beach Dock → City Pier)
- **Description:** A small ferry boat that travels between the beach dock and a city pier on the east coast. Reduces travel time across the island.
- **Mechanic:** Interact with the ferryman NPC at the dock → pay 1 IOU → arrive at the city pier (or vice versa). The ferry crosses the south coast (screen-space visual of a boat moving along the bottom edge).
- **Sprites needed:** `ferry_boat.png`, `city_pier.png`
- **Priority:** LOW (Phase 5+)

### 17. Mountain Tram (City → Mountain)
- **Description:** A small cable car / tram from the city up to the mountain peak. Saves climbing the maze of rock tiles.
- **Mechanic:** Interact at the tram station (city edge) → pay 2 IOUs → arrive at mountain peak. Screen-space visual of ascending.
- **Sprites needed:** `tram_car.png`, `tram_station.png`
- **Priority:** LOW (Phase 5+)

### 18. Woods Bridges (Creek crossings)
- **Description:** Small wooden bridges over the creek in the woods. Currently the creek is walkable (shallow), but bridges add charm and prevent the "splash" slowdown.
- **Mechanic:** Crafted from 2 `log` + 1 `rope` → place across creek tiles. Decorative + functional (no splash).
- **Sprites needed:** `wood_bridge_h.png`, `wood_bridge_v.png`
- **Priority:** LOW (Phase 5+)

---

## Social Spots

### 19. Campfire Ring (Woods clearing)
- **Position:** Woods biome, central clearing
- **Description:** A ring of stones around a fire pit. At night, NPCs gather here to tell stories. The player can light the fire (needs `stick` × 3).
- **Mechanic:** Light fire → NPCs in the woods converge on the campfire → storytelling event (random NPC shares a story/ambient dialogue). +2 friendship to all gathered.
- **Who visits:** All personalities, especially evening. Goth types tell moody stories. Cheerful types tell funny ones.
- **Priority:** LOW (Phase 5+)

### 20. Stargazing Hill (Meadow, elevated)
- **Position:** Meadow biome, small hill
- **Description:** A gentle hill in the meadow that's slightly higher than surroundings. At night, it's the best stargazing spot. Lay on the grass → star map appears briefly.
- **Mechanic:** Nighttime → lie down → "You look up. The stars are impossibly bright. One of them might be you." + rare `star_fragment` (10%).
- **Priority:** LOW (Phase 5+)

---

## Summary Priority List

| # | Location | Priority | Phase |
|---|----------|----------|-------|
| 8 | Community Garden | MEDIUM | 4 |
| 7 | Whispering Cave | MEDIUM | 5 |
| 13 | Festival Grounds | MEDIUM | 4 |
| 1 | Hot Spring | LOW | 5+ |
| 2 | Lighthouse | LOW | 5+ |
| 3 | Treehouse | LOW | 5+ |
| 4 | Fairy Ring | LOW | 5+ |
| 5 | Geyser Field | LOW | 5+ |
| 6 | Hidden Cove | LOW | 5+ |
| 9 | Wishing Well | LOW | 5+ |
| 10 | Star Pond | LOW | 5+ |
| 11 | Crystal Caverns | LOW | 5+ |
| 12 | Dream Nexus | LOW | 5+ |
| 14-15 | Holiday sites | — | Already exist |
| 16 | Ferry Service | LOW | 5+ |
| 17 | Mountain Tram | LOW | 5+ |
| 18 | Woods Bridges | LOW | 5+ |
| 19 | Campfire Ring | LOW | 5+ |
| 20 | Stargazing Hill | LOW | 5+ |
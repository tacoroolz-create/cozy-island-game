# 03 — NPC Placement & Biome Affinities

> Which neighbors hang out where, how schedules change, and potential new NPCs.

---

## Personality → Biome Affinity

Each of the 8 personality types has a natural biome affinity. This replaces the current fixed-coordinate hangout spots with biome-zone-relative placement.

| Personality | Primary Biome | Secondary Biome | Rationale |
|-------------|---------------|-----------------|-----------|
| **kawaii** | Meadow | Beach | Flowers, butterflies, cute animals, sunshine |
| **tsundere** | Woods (sunny clearing) | Mountain (solitary overlook) | "I'm only here because nobody else is." |
| **goth** | Deep Woods | Rocky coast (dusk) | Misty, moody, reciting poems to the dark |
| **nerd** | Mountain (overlook) | City (library/study) | Cloud watching from the peak, studying, cataloging |
| **monk** | Deep Woods (Inner Temple) | Meadow (meditation spot) | Quiet places, stillness, nature |
| **medieval** | Town (dock watch) | Mountain (cliff guard) | Standing proud watch, guarding the realm |
| **shy** | Woods (bushy clearing) | Meadow (quiet corner) | Hiding near bushes, watching from cover |
| **cheerful** | Beach | Town (market) | Sunny mornings, greeting everyone, bustling |

---

## Per-NPC Biome Assignments

### Robots (8)

| NPC | Personality | Primary Hangout | Secondary Hangout | Why |
|-----|-------------|-----------------|-------------------|-----|
| **Piko** | kawaii | Meadow (flower patches) | Beach (seashell collecting) | Loves butterflies and flowers |
| **Rivet** | tsundere | Woods (sunny knoll) | Mountain (solitary cliff) | "Counting leaves because someone has to" |
| **Shade-7** | goth | Deep Woods (misty clearing) | Rocky coast at dusk | Spiderweb etchings fit the dark woods |
| **Cypher** | nerd | Mountain (cloud watch overlook) | City (studying) | Best cloud viewing from the peak |
| **Om-Bit** | monk | Deep Woods (Inner Temple) | Meadow (quiet spot) | Meditation in still, quiet places |
| **Sir Cogs-a-Lot** | medieval | Town (dock watch) | Mountain (cliff guard post) | Proud watch at the gate and the high pass |
| **Tinker** | shy | Woods (bushy clearing) | Meadow (tall grass) | Hides near bushes, watches birds |
| **Zap-Zap** | cheerful | Beach (sunny mornings) | Town (market greetings) | Loves the sun and loud greetings |

### Ghosts (8)

| NPC | Personality | Primary Hangout | Secondary Hangout | Why |
|-----|-------------|-----------------|-------------------|-----|
| **Boo-Boo** | kawaii | Meadow (near butterflies) | Beach (soft sand) | Gentle, pink, soft — flowers and sunshine |
| **Wisp** | tsundere | Woods (quiet grove) | Mountain (floating over cliffs) | "I guess drifting here is fine." |
| **Morwen** | goth | Deep Woods (moonlight clearing) | Rocky coast (poems to sea) | Elegant, moody, moon-silver hair in the dark |
| **Spectra** | nerd | Mountain (studying clouds) | City (near shops) | Studies the dream, cataloging facts |
| **Hush** | monk | Deep Woods (Inner Temple) | Meadow (silent meditation) | Calm, translucent, presses hands together |
| **Sir Haunts-a-Lot** | medieval | Town (dock watch) | Mountain (cliff patrol) | Noble knight ghost, bows before entering |
| **Flutter** | shy | Woods (near lanterns) | Meadow (quiet flower corner) | Stays near light sources, whispers |
| **Giggles** | cheerful | Beach (morning loops) | Town (market giggling) | Floats around celebrating every day |

### Animals (8)

| NPC | Personality | Primary Hangout | Secondary Hangout | Why |
|-----|-------------|-----------------|-------------------|-----|
| **Mochi** | kawaii | Meadow (clover patch) | Beach (warm sand) | Nibbles clover, hops in place |
| **Shadow** | tsundere | Woods (sunny spot) | Town (rooftop sun) | "Only here for the warmth." |
| **Raven** | goth | Deep Woods (dark branches) | Rocky coast (dark clouds) | Poems about the sea, admires storms |
| **Newton** | nerd | Mountain (overlook) | Woods (treetop facts) | Explains tides and clouds from the peak |
| **Lotus** | monk | Deep Woods (still pond) | Meadow (one-leg meditation) | Meditates on one leg for hours |
| **Squire Paws** | medieval | Town (market patrol) | Beach (dock watch) | Trots proudly beside picnic blankets |
| **Pebble** | shy | Woods (near creek) | Meadow (tall grass) | Retracts at loud noises, stops when looked at |
| **Sunny** | cheerful | Beach (morning flights) | Meadow (flower loops) | Greets every morning loudly from the sky |

### Monsters (8)

| NPC | Personality | Primary Hangout | Secondary Hangout | Why |
|-----|-------------|-----------------|-------------------|-----|
| **Fluffernox** | kawaii | Meadow (gentle pats) | Woods (flower clearing) | Fuzzy, gives pats, smiles with whole face |
| **Grumble** | tsundere | Deep Woods (straightening flowers) | Woods (sulking glade) | "Terrifying," then carefully tends wildflowers |
| **Vesper** | goth | Deep Woods (moonlit rock) | Mountain (sunset peak) | Sits on rocks after sunset, hums to moon |
| **Gizmo** | nerd | Mountain (inspecting rocks) | City (examining shops) | Inspects rocks and weeds, explains how they work |
| **Ommmm** | monk | Deep Woods (ancient grove) | Meadow (center stillness) | Sits very still, hums, believes listening is magic |
| **Lord Roar** | medieval | Mountain (cliff throne) | Town (formal court) | Velvet cape, greets formally, calls hog "noble steed" |
| **Snug** | shy | Deep Woods (under rocks) | Woods (behind logs) | Hides under rocks, peeks with one eye |
| **Gigglegrow** | cheerful | Meadow (bouncing) | Beach (bouncing on sand) | Bounces instead of walking, startles birds |

---

## Schedule Rewrite

### Current System

```js
const HANGOUT_SPOTS = {
    cloud_watch:   { slots: [[40, 8], [44, 8], ...] },
    sunny_beach:   { slots: [[42, 91], ...] },
    // ... 8 fixed spots with hardcoded coordinates
};
const PERSONALITY_SCHEDULE = {
    nerd:     { morning: null, afternoon: 'cloud_watch', evening: null },
    // ...
};
```

### New System: Biome-Relative Hangout Spots

Instead of hardcoded coordinates, hangout spots are defined **relative to biome zones** with a tile offset. At schedule time, the NPC picks an available slot within the target biome.

```js
const BIOME_HANGOUTS = {
    // Each entry: biome → array of named spots with relative coords
    meadow: {
        flower_patch:    { x: 35, y: 15, facing: 'down', capacity: 4 },
        clover_corner:   { x: 50, y: 18, facing: 'down', capacity: 2 },
        quiet_pond:      { x: 40, y: 12, facing: 'up', capacity: 2 },
        butterfly_hill:  { x: 45, y: 8,  facing: 'down', capacity: 3 },
        meadow_center:   { x: 42, y: 15, facing: 'down', capacity: 4 },
    },
    beach: {
        sunny_sand:      { x: 15, y: 18, facing: 'down', capacity: 4 },
        dock_watch_b:    { x: 10, y: 12, facing: 'left', capacity: 3 },
        tide_pool:       { x: 20, y: 20, facing: 'down', capacity: 2 },
        morning_shore:   { x: 12, y: 5,  facing: 'up', capacity: 3 },
    },
    woods: {
        sunny_knoll:     { x: 15, y: 35, facing: 'down', capacity: 4 },
        bushy_clearing:  { x: 10, y: 45, facing: 'down', capacity: 3 },
        creek_side:      { x: 18, y: 50, facing: 'left', capacity: 2 },
        bird_grove:      { x: 12, y: 30, facing: 'up', capacity: 3 },
        quiet_glade:     { x: 20, y: 40, facing: 'down', capacity: 2 },
    },
    town: {
        market_square:   { x: 40, y: 40, facing: 'down', capacity: 4 },
        fountain_steps:  { x: 38, y: 35, facing: 'up', capacity: 3 },
        dock_watch_t:    { x: 30, y: 28, facing: 'left', capacity: 3 },
        market_stroll:   { x: 45, y: 42, facing: 'right', capacity: 4 },
    },
    city: {
        plaza_bench:     { x: 65, y: 35, facing: 'down', capacity: 3 },
        shop_window:     { x: 70, y: 40, facing: 'up', capacity: 3 },
        street_corner:   { x: 62, y: 30, facing: 'right', capacity: 4 },
        neon_alley:      { x: 75, y: 45, facing: 'down', capacity: 2 },
    },
    deep_woods: {
        misty_clearing:  { x: 15, y: 70, facing: 'up', capacity: 4 },
        inner_temple:    { x: 22, y: 80, facing: 'down', capacity: 3 },
        moonlit_rock:    { x: 10, y: 75, facing: 'up', capacity: 2 },
        fortress_gate:   { x: 18, y: 85, facing: 'down', capacity: 2 },
        ancient_grove:   { x: 25, y: 90, facing: 'up', capacity: 3 },
    },
    mountain: {
        cliff_overlook:  { x: 85, y: 75, facing: 'down', capacity: 4 },
        peak_stargaze:   { x: 90, y: 85, facing: 'up', capacity: 3 },
        cliff_guard:     { x: 80, y: 70, facing: 'left', capacity: 2 },
        cave_entrance:   { x: 78, y: 80, facing: 'up', capacity: 2 },
        alpine_meadow:   { x: 82, y: 65, facing: 'down', capacity: 3 },
    },
};
```

### New Personality Schedule

```js
const PERSONALITY_SCHEDULE = {
    nerd:     { morning: null,                    afternoon: 'mountain:cliff_overlook', evening: null },
    cheerful: { morning: 'beach:morning_shore',   afternoon: 'town:market_stroll',     evening: null },
    goth:     { morning: null,                    afternoon: 'deep_woods:misty_clearing', evening: 'deep_woods:moonlit_rock' },
    monk:     { morning: 'deep_woods:inner_temple', afternoon: null,                    evening: 'meadow:quiet_pond' },
    kawaii:   { morning: null,                    afternoon: 'meadow:flower_patch',    evening: null },
    tsundere: { morning: null,                    afternoon: 'woods:sunny_knoll',      evening: null },
    shy:      { morning: 'woods:bushy_clearing',  afternoon: null,                      evening: 'woods:quiet_glade' },
    medieval: { morning: 'town:dock_watch_t',     afternoon: 'town:dock_watch_t',       evening: 'mountain:cliff_guard' }
};
```

### Slot Selection Logic

```js
function findHangoutSlot(spotId, npc) {
    const [biome, spotName] = spotId.split(':');
    const spot = BIOME_HANGOUTS[biome]?.[spotName];
    if (!spot) return null;

    // Check capacity: count NPCs currently at this spot
    let occupied = 0;
    for (const other of npcs) {
        if (other === npc) continue;
        if (other._sched?.spotId === spotId) occupied++;
    }
    if (occupied >= spot.capacity) {
        // Overfilled → find a nearby alternative in the same biome
        return findAlternativeSpot(biome, npc);
    }

    // Pick a slot tile near the spot center (jittered within capacity)
    const slotIdx = occupied;
    const jitter = 2; // tiles
    return {
        x: spot.x + (slotIdx % 2) * jitter - jitter/2,
        y: spot.y + floor(slotIdx / 2) * jitter,
        facing: spot.facing
    };
}
```

---

## NPC Home Placement (Shacks)

### Current Behavior
NPC shacks scatter randomly on any grass tile.

### New Behavior
NPC shacks cluster in the **Town** biome, arranged along cobblestone paths:

```js
// Shack placement grid within Town biome
const TOWN_SHACK_PLOTS = [
    // Each plot is a 4x4 pad with a facing direction for the door
    { x: 28, y: 28, doorFacing: 'right' },
    { x: 33, y: 28, doorFacing: 'right' },
    { x: 38, y: 28, doorFacing: 'right' },
    { x: 43, y: 28, doorFacing: 'right' },
    { x: 48, y: 28, doorFacing: 'right' },
    { x: 28, y: 48, doorFacing: 'right' },
    { x: 33, y: 48, doorFacing: 'right' },
    { x: 38, y: 48, doorFacing: 'right' },
    { x: 43, y: 48, doorFacing: 'right' },
    { x: 48, y: 48, doorFacing: 'right' },
    // ... 32 plots total (4 rows × 8 columns)
];

// Assign plots as NPCs arrive
function assignShackPlot(npcId) {
    const usedPlots = buildings
        .filter(b => b.type === 'shack' && b.owner !== null)
        .map(b => ({ x: b.gridX, y: b.gridY }));
    for (const plot of TOWN_SHACK_PLOTS) {
        if (!usedPlots.some(p => p.x === plot.x && p.y === plot.y)) {
            return plot;
        }
    }
    // Fallback: random grass in town
    return findTownGrassSpot();
}
```

This creates a proper **town neighborhood** — shacks line the streets, paths connect them, and the town feels like a community.

---

## Cross-Biome NPC Gossip

With neighbors spread across biomes, ambient dialogue gets richer:

- **Raven** (goth, deep woods) → gossips about **Morwen** (goth, deep woods): "Morwen was humming something particularly mournful by the old grove. I appreciated the commitment."
- **Sunny** (cheerful, beach) → gossips about **Zap-Zap** (cheerful, beach): "Zap-Zap and I had a sunrise shouting contest! I won! ...I think. She was pretty loud."
- **Lord Roar** (medieval, mountain) → gossips about **Sir Cogs-a-Lot** (medieval, town): "Sir Cogs guards the dock with admirable diligence. I hold the high pass. Together we protect the realm."
- **Pebble** (shy, woods) → gossips about **Tinker** (shy, woods): "Tinker waved at me from the other side of the creek. I hid. ...But I waved back. Later. From behind a log."

Add these to `RELATIONSHIP_GOSSIP` in `src/dialogue_smalltalk.js` with biome-flavored lines.

---

## Potential New NPCs (Phase 5)

These are *optional* additions for later phases. They should follow the existing 32-neighbor format (species × personality × description) and use the `CharacterDraft.txt` workflow.

### Mountain Hermit
- **Name:** Granite
- **Species:** Animal (Mountain Goat)
- **Personality:** Monk
- **Description:** A grizzled old mountain goat with a tiny bell on his collar. He meditates on the highest peak and speaks in riddles about wind and stone.
- **Hangout:** Mountain peak, cave entrance
- **Why:** Gives the mountain biome a permanent resident. Monk personality fits alpine stillness.

### City Vendor
- **Name:** Pip
- **Species:** Animal (Raccoon)
- **Personality:** Cheerful
- **Description:** A masked raccoon in a tiny apron, always setting up a new stall. She trades odds and ends and giggles at her own sales pitches.
- **Hangout:** City plaza, street corners
- **Why:** Gives the city a street-market character. Raccoon fits urban scavenging vibe.

### Woods Ranger
- **Name:** Compass
- **Species:** Robot
- **Personality:** Nerd
- **Description:** A forest-green robot with a built-in compass rose on his chest. He maps the woods and marks trail blazes on trees.
- **Hangout:** Woods clearings, creek side
- **Why:** Gives the woods a guide character. Nerd personality fits mapping/cataloging.

### Deep Woods Spirit
- **Name:** Lumen
- **Species:** Ghost
- **Personality:** Shy
- **Description:** A faint glow that drifts between the twisted trees of the deep woods. It hides behind mushrooms and peeks out at night.
- **Hangout:** Deep woods misty clearing, glowing mushroom patches
- **Why:** Deep woods needs a resident that fits the spooky-cozy vibe. Shy ghost hiding among glowing mushrooms is peak cozy.

### Beachcomber
- **Name:** Drift
- **Species:** Animal (Pelican)
- **Personality:** Tsundere
- **Description:** A large pelican with a battered old sailor's cap. He sits on the dock posts and pretends not to watch the horizon.
- **Hangout:** Beach dock, rocky coast
- **Why:** Beach needs a permanent character who's always there. Tsundere pelican "not watching the horizon" is charming.

---

## Mubaba Placement

Mubaba remains the **stationary magic merchant** but his fortress is now in the **Deep Woods** rather than the underground city. The fortress building (`ug_mubaba_fortress`) is placed as a surface building in the deep woods biome.

The underground map remains accessible via the tunnel (also in deep woods) for quest-related content, but Mubaba himself stands in his surface fortress.

```js
// Mubaba's Fortress surface placement
const MUBABA_FORTRESS_POS = { x: 18, y: 82 }; // deep woods
```

---

## NPC Schedule Per Time of Day (Quick Reference)

| Time | All NPCs |
|------|----------|
| **Night (9 PM – 5 AM)** | At home (shack door in Town) |
| **Morning (5 AM – 11 AM)** | Personality-specific morning hangout |
| **Afternoon (11 AM – 5 PM)** | Personality-specific afternoon hangout |
| **Evening (5 PM – 9 PM)** | Personality-specific evening hangout |
| **Free wander** | When no hangout assigned or slots full |

NPCs that are **kawaii** (Piko, Boo-Boo, Mochi, Fluffernox) all head to the **meadow** in the afternoon — the meadow becomes a social hub for the cute personalities.

NPCs that are **goth** (Shade-7, Morwen, Raven, Vesper) all head to the **deep woods** in the afternoon/evening — the deep woods becomes a moody gathering spot.

This creates emergent social scenes: you'll find groups of similar personalities clustered in their favorite biomes at predictable times, making the world feel alive. ★
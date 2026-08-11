# Peak Saucy

## Core
A summer-solstice holiday inspired by ancient Middle Eastern sun-procession traditions, reframed as a cozy island gathering. Neighbors take a slow afternoon walk around the island, ending at a sunset bonfire where they drink sweet tea and lemonade together. The player builds the bonfire and serves drinks.

## Existing Systems Used
- Existing wild bushes (fiber source)
- Inventory / item system
- NPC movement / dialogue
- Player interact (Enter / click)
- Bonfire lighting logic (similar to lanterns/torches)

## New Items
- **Tea Leaves** — wild herb harvested from the same small bushes that drop Fiber.
- **Lemon** — wild fruit found on small shore/edge trees or bushes.
- **Sweet Tea** — crafted from Tea Leaves + water/sugar (or simplified as a flavor reward from a neighbor).
- **Lemonade** — crafted from Lemon + water/sugar.

## Gameplay Flow
1. **Afternoon:** Neighbors begin a slow procession along a simple island route.
2. **Player builds bonfire:** Before sunset, the player places 10 sticks + 3 stones at the designated end-of-route spot (beach or overlook) to build a temporary bonfire.
3. **Serve drinks:** The player can hand neighbors Tea Leaves, Lemons, Sweet Tea, or Lemonade during the procession or at the bonfire.
4. **Sunset:** Once the bonfire is lit and at least one neighbor has gathered, a short communal scene triggers — neighbors say cozy lines about the longest day.
5. **Reward:** Friendship boost for every drink served. If both Sweet Tea and Lemonade are served at the bonfire, the player receives a small keepsake (e.g., a "Long Day Lantern" or flavor-only IOU).
6. **Night:** The bonfire burns until late night, then disappears the next morning.

## Constraints
- No mourning or darkness; the tone is warm gratitude for the longest day.
- The bonfire is temporary and disappears at sunrise.
- Tea Leaves share spawn source with Fiber bushes so no new tile type is needed.
- No complex multi-NPC pathing; neighbors move slowly along a short loop or stand at the bonfire.

## New Assets Needed
- Tea Leaves sprite (16×16 herb / inventory icon)
- Lemon sprite (16×16 fruit / inventory icon)
- Sweet Tea / Lemonade sprites (16×16 drink icons, optional — can use color rectangles at first)
- Temporary bonfire sprite (can reuse existing fire/lantern art if available)

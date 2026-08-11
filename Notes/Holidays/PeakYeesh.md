# Peak Yeesh

## Core
A winter-solstice holiday inspired by European Yule and pagan midwinter traditions, reframed as a cozy island gathering around the longest night. Neighbors build a great communal bonfire (the Everburn) from the largest log available, decorate the area with evergreen boughs, and keep the fire lit through the night. A mysterious visitor, Papa Yeesh, arrives after sundown and quietly visits homes. If the player stays awake until midnight, Papa Yeesh leaves a reward based on how kind the player has been to Hoggy over the year.

## Existing Systems Used
- Hoggy daily-gift system
- IOU economy
- Furniture / decoration placement system
- Bonfire / fire lighting logic
- Day/night cycle and late-night freeze
- Player interact (Enter / click)
- NPC dialogue hooks

## New Items
- **Yule Log** — a rare large log that appears on Peak Yeesh. Used to start the Everburn bonfire.
- **Evergreen Bough** — harvested from existing fir/pine trees or bushes during Yeesh season.
- **Holiday furniture pool:**
  - **Yule Tree** — decorated evergreen tree furniture.
  - **Brick Fireplace** — alternate fireplace skin / variant.
  - **Garland (×5)** — wall-decoration set of five festive garlands.
  - **Wreath** — door/wall decoration.
  - **Mistletoe Sprig** — small hanging decoration.
  - **Candle Log** — long-burning floor decoration.
  - **Holly Vase** — tabletop decoration.
  - **Yule Goat Plush** — small floor decoration.

## Gameplay Flow
1. **Morning:** Neighbors talk about the coming long night and the need for a big fire.
2. **Find the Yule Log:** A large log spawns somewhere on the island. The player drags/carries it to the communal bonfire spot.
3. **Build the Everburn:** The Yule Log is placed in the fire pit, and neighbors add evergreen boughs. Lighting it begins the holiday event.
4. **Keep it burning:** The player can feed the fire sticks throughout the night. Neighbors gather around and tell cozy lines.
5. **Papa Yeesh visits:** After sundown, a temporary NPC (Papa Yeesh) appears near homes and walks between them. He does not speak when approached directly.
6. **Midnight reward:** If the player is still awake at midnight (game time), Papa Yeesh leaves a message. The reward is based on the number of gifts the player has given Hoggy over the current year:
   - **Default:** 0.5 IOUs per Hoggy gift, rounded up.
   - **Cap switch:** If that amount would exceed 20 IOUs, the player instead receives one random piece from the holiday furniture pool.
7. **Sunrise:** Papa Yeesh departs. The Everburn burns down and the area returns to normal.

## Constraints
- No sacrifice, no darkness, no violence. The Yule boar tradition is replaced by honoring Hoggy with gifts year-round.
- Papa Yeesh is a silent visitor, not a religious figure.
- The midnight reward requires the player to stay awake, creating a small challenge without punishment.
- Holiday furniture uses the existing home decoration system.

## New Assets Needed
- Papa Yeesh sprite (16×32 NPC, winter visitor)
- Yule Log sprite (32×16 or 16×16 large log)
- Evergreen Bough sprite (16×16 herb/branch)
- Holiday furniture sprites:
  - Yule Tree
  - Brick Fireplace
  - Garland (single sprite, stack of 5 as item)
  - Wreath
  - Mistletoe Sprig
  - Candle Log
  - Holly Vase
  - Yule Goat Plush

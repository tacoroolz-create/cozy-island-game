# Lost Mail Day

## Core
Crates of undelivered letters wash up on the shore. Each letter is addressed to a dream-version of a neighbor. The player fishes letters from beach spots and delivers them to the right NPC, unlocking a unique "did you read my mail?" dialogue branch for that day.

## Existing Systems Used
- Shore/beach tiles
- Player interact / temporary held object
- NPC dialogue branches
- Existing neighbor roster

## Gameplay Flow
- Morning: 3–5 sealed letters appear as interactable objects on the beach.
- Player picks one up. The letter shows a dream-address like:
  - "To: The Crab Whisperer"
  - "To: Whoever Is Standing Near the Big Rock"
- Player delivers it to the matching neighbor by interacting with them while holding the letter.
- The neighbor reacts with a holiday-specific line, then the letter is consumed.

## Matching Logic
Addresses are vague enough to be guessable, but specific enough to point to one neighbor's personality or known hangout.

Examples:
- "To the one who talks to vegetables" → **Hudson**
- "To the keeper of moon opinions" → **Luna**
- "To the island's loudest whistler" → **Chester**

## Reward
- Small friendship boost with the recipient.
- If the player delivers all letters, a neighbor mentions a "return address" that doesn't exist, just for flavor.

## Constraints
- Letters are temporary holiday objects; no persistent inventory clutter.
- No failure state if delivered to the "wrong" neighbor — the NPC says something confused and polite, then returns it.

## Optional Upgrade
- One letter per cycle addressed to the player from "your future self" with a nonsense tip. Flavor only.

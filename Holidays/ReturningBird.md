# The Returning Bird

## Core
A single migrating bird arrives that one neighbor insists is their old friend. That NPC follows the bird around for the day, talking to it at each stop. The player can walk near the bird and get the neighbor's running commentary.

## Existing Systems Used
- Bird animal sprites / behavior
- NPC pathing/following behavior
- NPC dialogue branches
- Player movement and interact

## Gameplay Flow
- Morning: a special, slightly different-colored bird spawns on the island.
- One neighbor is selected as the bird's "old friend" for the cycle.
- That neighbor follows the bird as it hops from perch to perch (tree, bench, roof, shore).
- The bird uses existing bird movement but visits a few preset landmark points.
- Player approaches the bird + neighbor pair at any stop to hear the neighbor's latest one-sided conversation.

## Neighbor Interaction
The chosen neighbor has unique lines at each stop:
- Stop 1 (tree): "You remember this branch. You napped here for three seasons."
- Stop 2 (shore): "Don't drink the sea. We talked about this last year."
- Stop 3 (bench): "Sit with me. Or on me. You always did what you wanted."

Other neighbors mention the sight with gentle disbelief:
- **Hudson:** "I think that bird is pretending to remember Chester. Birds are like that."

## Reward
- Small friendship boost with the bird's "friend" neighbor each time the player checks in at a new stop.

## Constraints
- Uses existing bird sprite with a possible subtle palette tweak.
- No new animal AI beyond following preset waypoints.
- No failure state.

## Optional Upgrade
- At the final stop, the bird flies away and the neighbor thanks the player for "witnessing the reunion."

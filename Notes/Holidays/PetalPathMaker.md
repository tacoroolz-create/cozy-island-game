# The Petal Path Maker

## Core
A visiting path-artist asks the player and neighbors to drop harvested flowers along the ground to connect two meeting spots. Walking the finished path triggers tiny "follow the pink" comments from nearby NPCs.

## Existing Systems Used
- Flower harvestables
- Path/ground tiles
- NPC placement + dialogue
- Player movement and interact

## Gameplay Flow
- Morning: the path-artist appears near one landmark and announces a "petal path" goal to another landmark.
- Several "path anchor" spots appear between the two points.
- Player and neighbors can place harvested flowers at anchor spots.
- Once all anchors are filled, the path is "complete" and glows faintly.
- Walking along the completed path triggers one-line comments from nearby NPCs.

## Neighbor Interaction
Neighbors contribute flowers to random anchor spots over the course of the day:
- **Daphne:** "I added a daisy. Now the path has opinions."
- **Krip:** "My flower was immediately trampled. I consider it art."
- **Penny:** "I walked the whole thing backward. It still worked."

## Reward
- Friendship boost with the path-artist when the player contributes at least one flower.
- Small boost with any neighbor the player walks the path alongside.

## Constraints
- Uses existing flower sprites.
- Anchor spots are temporary; flowers vanish at sunset.

## Optional Upgrade
- Different path destinations each cycle, so neighbors comment on the "theme" of the route.

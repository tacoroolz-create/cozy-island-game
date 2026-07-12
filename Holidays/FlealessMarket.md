# The Flealess Market

## Core
A traveling merchant stands by the dock and offers three special items. The player can barter harvested resources for them.

## Existing Systems Used
- Dock area
- NPC dialogue / shop interface
- Harvestable resources
- Existing tool sprites
- Furniture/statue placement system

## Items Offered
1. **Statue** — decorative placeable object (new sprite to be created by user).
2. **Unbreakable Tool** — reuses existing tool sprites, but as a new item setup that removes durability.
3. **Seed for a new plant type** — user will create new plant sprites.

## Gameplay Flow
- Morning: merchant spawns at the dock.
- Player interacts with merchant to open a small shop UI or dialogue choice list.
- Player selects an item and pays with harvested resources.
- Items are added to inventory or delivered to the player's house.

## Neighbor Interaction
Neighbors mention what they saw at the market:
- **Daphne:** "I almost traded my umbrella for a jar of fog. Then I remembered I don't have an umbrella."
- **Krip:** "The merchant had a spoon that looked exactly like my cousin. I walked away."
- **Penny:** "I bought nothing and feel heroic."

## Reward
- Player gets rare/decor items without normal unlock conditions.

## Constraints
- No currency system needed — barter only.
- Merchant is a temporary NPC standing at the dock.

## New Assets Needed
- Statue sprite
- New plant sprites (seed + growth stages)

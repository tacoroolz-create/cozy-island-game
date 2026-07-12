# Hoggy's Birthday

## Core
The wild hog is guest of honor for one day. The usual "Hoggy gives the player a daily gift" mechanic flips: **everyone gives Hoggy something**. The player brings the biggest vegetable they can harvest.

## Existing Systems Used
- Wild hog NPC (named, interactive, daily gifting)
- Vegetable harvestables
- NPC dialogue system
- Picnic blanket furniture (reused as decoration)
- Neighbor pathing / placement

## Gameplay Flow
- Morning: Hoggy stands still beside a reused picnic blanket in a decorated spot.
- Neighbors are coded to approach the blanket throughout the day and drop items near it.
- Player can place one harvested vegetable as a gift for Hoggy.
- Hoggy "inspects" it with a tiny pause/happy reaction, then the vegetable disappears.

## Reward
- **Friendship boost with every neighbor** (the reward is social, not an item).

## Neighbor Interaction
Each neighbor reports what they brought Hoggy and his imagined response:
- **Chester:** "I gave Hoggy a turnip. He looked at it like it owed him money. Then he ate it."
- **Luna:** "A moonlit beet. He snorted three times. That means he liked it."
- **Hudson:** "I tried to give him my spare sock. He refused. Politely."

## Constraints
- No new animal behavior: Hoggy uses existing interaction + gifting code.
- No new assets required; picnic blanket and flowers reused as decoration.
- No failure state.

## Optional Upgrade
- A "birthday card" signboard near Hoggy with one signature from each neighbor. Flavor text, changes each cycle.

# The Picnic Reset

## Core
A visiting organizer rearranges all outdoor furniture into one long, winding communal picnic. Neighbors sit wherever they land and chat with whoever's beside them. The player can sit on a blanket or bench and overhear a tiny two-NPC exchange.

## Existing Systems Used
- Outdoor furniture (picnic blanket, bench, etc.)
- NPC placement + dialogue
- Player sitting/interact mechanics
- Path/tile system

## Gameplay Flow
- Morning: all placed outdoor furniture is temporarily moved into a long snaking line in a central area.
- Neighbors are assigned to specific seats along the line.
- Player can sit in any empty seat. If two neighbors are seated next to each other, they perform a short two-line exchange the player overhears.
- Furniture returns to its original position at the end of the day.

## Neighbor Interaction
Seat neighbors get paired dialogue:
- **Chester + Luna:**
  - Chester: "I think the potato salad is staring at me."
  - Luna: "That's because you're staring at it first."
- **Hudson + Mimis:**
  - Hudson: "Pass the dream-bread?"
  - Mimis: "There is no bread. We're just being polite."

## Reward
- Small friendship boost with both neighbors in any pair the player overhears.
- Sitting for a short while gives a tiny "relaxed" mood flavor message.

## Constraints
- Furniture is moved temporarily; original positions stored and restored.
- No new assets.
- No failure state.

## Optional Upgrade
- If the player sits in three different seats, the organizer thanks them and gives a "picnic napper" title — flavor only.

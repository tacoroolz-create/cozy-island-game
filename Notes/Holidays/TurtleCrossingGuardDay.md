# Turtle Crossing Guard Day

## Core
A wave of traveling turtles crosses a main path, and neighbors take turns being honorary crossing guards. The player can stand near a turtle to make it pause safely, while nearby NPCs salute or offer tiny encouraging remarks.

## Existing Systems Used
- Turtle animal sprites / behavior
- Path tiles
- NPC placement + dialogue
- Player movement

## Gameplay Flow
- Morning: a group of 4–6 turtles spawns at one side of a main path and slowly crosses to the other side over the course of the day.
- Neighbors position themselves along the path as "crossing guards" and have unique guard lines.
- Player can stand near a moving turtle to make it stop briefly (existing animal pause behavior or simple proximity check).
- When a turtle safely reaches the other side, it disappears into the scenery.

## Neighbor Interaction
Crossing guard neighbors have lines about the duty:
- **Brass:** "Hold the line. This turtle is six hundred years late and doing fine."
- **Vega:** "I saluted a turtle. It did not salute back. I am still proud."
- **Willow:** "Softly now. They're carrying small dreams on their backs."

## Reward
- Small friendship boost with each guard neighbor if the player helps at least one turtle cross.

## Constraints
- Uses existing turtle sprites and slow movement.
- No new AI; turtles move in a straight line across the path.
- No failure state if a turtle isn't helped — they cross anyway, just more slowly.

## Optional Upgrade
- A tiny "turtle crossed" counter appears on a chalkboard near the path.

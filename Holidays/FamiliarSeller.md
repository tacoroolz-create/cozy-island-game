# Familiar Seller

## Core
On this day, a druid appears by the dock with one familiar available for purchase. The familiar is different each year. If the player purchases it for IOUs, they can name it and have the animal/monster follow them around forever.

## Existing Systems Used
- Dock area
- NPC dialogue
- IOU system
- Existing animal movement / follower logic (to be extended)

## Gameplay Flow
- Morning: a druid NPC spawns by the dock.
- One unique familiar (animal/monster) is available.
- Player can purchase the familiar for IOUs.
- If purchased, the player names the familiar.
- The familiar follows the player from that point forward (persistent across days).

## Neighbor Interaction
- Neighbors react to the druid's arrival with curiosity or skepticism.
- Neighbors comment on the player's familiar after purchase:
  - "Did you adopt a small dream? It suits you."
  - "That thing follows you like you owe it a secret."

## Reward
- A permanent named companion that follows the player.

## Constraints
- Familiar is cosmetic / companion only; no combat or extra mechanics required.
- One familiar per year.

## New Code Needed
- Persistent follower system
- Naming input
- Familiar selection by year

## New Assets Needed
- Familiar sprites (one per year, created by user)

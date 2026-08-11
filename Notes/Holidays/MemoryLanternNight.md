# Memory Lantern Night

## Core
At dusk, a visiting lantern-lighter arrives and hands out paper lanterns. Neighbors line them up along the shore, each containing a one-sentence "memory." The player reads them by walking past and can add their own from a list.

## Existing Systems Used
- Shore/beach tiles
- Day/night cycle (dusk trigger)
- NPC dialogue system
- Player interact
- Glow / light visual effect

## Gameplay Flow
- Dusk: a lantern-lighter NPC appears near the shore and places paper lanterns along the beach.
- Each lantern is a small glowing object with a tiny readable label.
- Player walks near a lantern to read its memory:
  - "I once laughed so hard a cloud changed shape."
  - "The best sandwich is the one you share with a crab."
  - "Hoggy looked at me for three full seconds. I'll never forget it."
- Player interacts with the lantern-lighter to choose one memory sentence from a list to add to the next empty lantern.
- Lanterns remain lit until morning, then quietly disappear.

## Neighbor Interaction
- Each neighbor has their own lantern memory that appears only on this holiday.
- They may comment on the player's chosen memory.
  - **Mimis:** "My lantern says I once sneezed and a flower bloomed. I'm not taking questions."
  - **Cort:** "I wrote about the time I saw a fish wearing a leaf. People doubted me."

## Reward
- Small friendship boost with the lantern-lighter and any neighbor whose memory the player reads.

## Constraints
- Lanterns are temporary objects with no persistence needed.
- No new audio; glow is visual only.
- No complex placement; lanterns spawn in a preset line along the shore.

## Optional Upgrade
- The player's chosen memory is saved and may reappear on a later cycle.

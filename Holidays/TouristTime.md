# Tourist Time!

## Core
A small, dreamy boat full of bewildered tourists beaches on the island for one day. 2–3 visiting tourist NPCs stand near the shore and ask naive questions.

## Existing Systems Used
- Shore tiles / beach area
- NPC dialogue system
- Harvestable fruit/flower resources
- Player interact key
- IOU system (flavor-only dream currency)

## Gameplay Flow
- Morning: boat appears; 2–3 tourists spawn near shore.
- Tourists rotate naive lines like:
  - "Is this island real?"
  - "May I touch a tree?"
  - "Where do I leave my socks?"
- Player offers a harvested fruit or flower as an "authentic island souvenir."
- Tourist accepts the item and tips the player with **IOUs**.

## Neighbor Interaction
Neighbors do not approach tourists visibly. Instead, their regular holiday dialogue includes a one-line brag about the hilarious tour fact they told the tourists.

Examples:
- **Chester:** "Welcome to Cozy Island. Population: dreams. Main export: confusion."
- **Luna:** "Shh. The tourists think the moon is following them. Let them."
- **Hudson:** "I told them the big rock is older than the sky. They believed me."
- **Aiko:** "They asked if the trees are made of clouds. I said yes."

## Constraints
- No new AI behavior: tourists stand or pace in a tiny radius.
- No new assets required; tourists can reuse existing visitor-like sprites.
- No combat or failure state.

## Optional Upgrade
- A "visitor log" sign near the boat accumulates silly one-liner tourist reviews each cycle. Changing sign text only.

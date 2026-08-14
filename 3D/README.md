# Cozy Island 3D 🏝️

A self-contained 3D version of the Cozy Island Game, built with **Three.js** in
the `3D/` folder. Aiming at a Nintendo-64-era *Animal Crossing* / *Harvest Moon
64* look: low-poly flat-shaded geometry, a chunky low-res framebuffer, blob
shadows, and a village you can actually walk around.

## Run

```bash
cd "Cozy Island Game/3D" && ./START_SERVER_3D.sh
```

Then open **http://localhost:8766/3D/**. Or double-click `START_SERVER_3D.command`.

`serve.py` serves the repo root (so the 2D game's `assets/sprites/*.png` resolve
for inventory icons) and sends `Cache-Control: no-store` — without that the
browser happily reruns yesterday's ES modules, because a `?v=` on the page URL
doesn't bust a module's sibling imports.

## Controls

| Input | Action |
|-------|--------|
| W A S D / Arrows | Move (relative to the camera) |
| Shift | Run |
| Mouse drag | Orbit camera |
| Mouse wheel | Zoom |
| Space / Enter | Talk, gift, harvest, chop, till, plant, water, ship, enter house |
| E | Menu (wallet, held tool, pockets, today, controls) |
| Esc | Close menu |
| Tab / Q | Cycle held tool/seed |
| 1 / 2 / 3 | Select tool slot directly |
| P | Toggle the retro pixel filter |

## New in this build

- **Tool belt:** axe, hoe, watering can. Tab or 1/2/3 to switch.
- **Farming:** till grass into soil, plant seasonal seeds, water daily, harvest crops.
- **Chopping trees:** equip the axe and Space near a broadleaf tree to get logs + occasional berries.
- **Shipping bin:** sell produce and foraged goods for G.
- **Friendship:** talk to neighbours once per day (+3) and give held gifts (+5–30) to raise friendship.
- **House interiors:** walk up to any house and press Space to enter a minimal room with a bed and table. Sleep to skip to 6 AM.
- **Persistence:** soil, crops, inventory, wallet, and friendships are saved.

## What's on the island

- **A round island** with a wobbled coastline, sand, rolling meadow, and a pond.
- **The dock** on the west shore — a walkable pier over the water, with a
  moored rowboat. You start on its sandy apron.
- **The village plaza**: a stone well and a notice board that posts the day's
  holiday.
- **Dreamer's Shack**, plus homes for **Mochi, Grumble, Newton, Lotus** and
  **Sunny** — each with the roof colour, species and personality from the 2D
  game's roster.
- **Hoggy**, wandering the 2D game's routine: rooting in the morning, the beach
  midday, the pond at dusk. Feed him a berry, banana, shell or flower.
- **Dirt paths** linking the dock, the plaza and every front door.
- Trees in groves (with open meadows between), beach palms, rocks, flowers,
  shells and sticks — all harvestable, all dropping items you walk over to pick up.
- The full day/night cycle, seasons and holiday calendar from `daycycle.js`,
  with a moving sun and moon, stars, drifting clouds and seasonal foliage tints.

Neighbours wander near their homes during the day and go inside at 10pm.

## How it fits together

| File | Owns |
|------|------|
| `src/island.js` | The island's shape and layout, as pure math. No Three.js. |
| `src/world.js` | Terrain mesh, water, buildings, instanced props, collision. |
| `src/npc.js` | The shared chibi character rig, neighbours, Hoggy, dialogue. |
| `src/player.js` | Movement, camera, interaction targeting. |
| `src/main.js` | Renderer, sky and lighting, the game loop. |
| `src/daycycle.js` | Clock, seasons, the holiday calendar. |
| `src/input.js` `src/ui.js` `src/save.js` | Keys/mouse, HUD, localStorage. |

`island.js` is deliberately dependency-free: terrain vertices, prop placement,
NPC pathing and the player's footing all read the same `heightAt()`, so they
can't disagree — and it runs under plain node, which is what the test uses.

## Test

```bash
node 3D/test/island.test.mjs
```

Covers the camera-relative movement basis and the island layout (nothing
underwater, pads level, paths walkable end to end, spawn reachable).

## Not here yet

Interiors, crafting, minigames, the underground city, the full written dialogue
system, animals beyond Hoggy. Neighbour lines here are a small 3D-only pool —
the real dialogue system lives in the 2D game's `src/dialogue*.js`.

## Tech

- Three.js r160, vendored at `vendor/three.module.js` (no CDN, runs offline)
- No build step; pure ES modules

# Cozy Island 3D 🏝️

A self-contained 3D prototype of the original Cozy Island Game, built with **Three.js** in a new `3D/` folder inside the main project.

## Goal

Replicate the core island loop in a low-poly / pixel-textured 3D style inspired by *Harvest Moon 64* and early *Animal Crossing*:
- Procedural rectangular island (sea, beach, grass)
- Third-person exploration (WASD + mouse camera)
- Harvestable environment (trees, rocks, flowers)
- Day/night cycle with dynamic sun/moon lighting
- Inventory + item drops
- Local save/load

## Run

```bash
cd "Cozy Island Game/3D"
./START_SERVER_3D.sh
# open http://localhost:8766
```

Or double-click `START_SERVER_3D.command` on macOS.

## Controls

| Input | Action |
|-------|--------|
| W / A / S / D or Arrows | Move |
| Mouse drag | Orbit camera |
| Mouse wheel | Zoom |
| Space | Harvest / interact |
| E | Toggle menu |
| Shift | Run |

## Scope notes

This is a **3D prototype** of the original 2D p5.js game. It does not yet include:
- Full NPC dialogue system
- Crafting / recipes
- Interiors / buildings
- Holidays / calendar events
- Full animal behaviors
- Minigames

Those systems are tracked on the `cozy-3d` kanban board for follow-up work.

## Tech

- [Three.js](https://threejs.org/) r160 (CDN module import map)
- No build step; pure ES modules
- Reuses existing 2D asset filenames where available

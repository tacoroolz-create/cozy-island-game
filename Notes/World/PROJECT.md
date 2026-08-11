# Cozy Island Game 🏝️ ✧

**An 8-bit browser-based cozy life simulation game**

*Created with p5.js*

---

## Vision

A peaceful, objective-free island life game inspired by Animal Crossing. Players customize their character, inhabit a charming island, and engage in relaxing activities at their own pace. Neighbors arrive and depart, pets can be tamed and bred, and magic allows players to shape their world.

**Core feeling:** Cozy, gentle, player-driven, no pressure ✧*。٩(ˊωˋ*)و✧*。

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Engine | p5.js (browser-based) |
| Art Style | 8-bit / SNES-style pixel art (4px blocks) |
| Platform | Browser (desktop first) |
| Future | Potential PICO-8 export |

---

## Planned Features

### Core Systems
- [ ] Character creation & light customization
- [ ] Island world with day/night cycle
- [ ] Save/load system
- [ ] Inventory system

### Activities
- [ ] Fishing
- [ ] Gardening (not farming — decorative, relaxing)
- [ ] Landscaping (placing/removing terrain features)
- [ ] Town construction (placing buildings, decorations)
- [ ] Pet taming & breeding
- [ ] Befriending neighbors (NPCs with personalities)
- [ ] Magic system:
  - [ ] Create items
  - [ ] Make neighbors vanish/appear
  - [ ] Transform plants & landscape features

### Neighbor System
- [ ] NPCs with unique personalities
- [ ] Arrival/departure mechanics
- [ ] Friendship levels
- [ ] Dialogue system

---

## Development Phases

### Phase 1: Foundation 🌱
- Character sprite with basic customization
- Island environment (terrain, water, sky)
- Character movement (walking around)
- Basic collision/boundaries

### Phase 2: First Activity 🎣
- One complete activity (fishing OR gardening)
- Simple UI for interaction
- Reward/collection system

### Phase 3: Neighbors & World 🏘️
- 1-2 NPC neighbors
- Basic dialogue system
- Day/night cycle
- Time passing

### Phase 4: Magic & Expansion ✨
- Magic system foundation
- Item creation
- Landscape transformation

### Phase 5: Depth & Polish 💎
- Pet system
- Breeding mechanics
- More neighbors
- Construction system
- Save/load
- Visual polish, animations

---

## Project Structure

```
Cozy Island Game/
├── PROJECT.md          # This file
├── DESIGN.md           # Detailed design doc (coming from Charles)
├── index.html          # Main game file
├── assets/
│   ├── sprites/        # Character, NPC, object sprites
│   ├── tiles/          # Terrain tiles
│   └── audio/          # Music & SFX (future)
└── src/
    ├── game.js         # Main game loop
    ├── character.js    # Character logic
    ├── world.js        # Island/world logic
    └── systems/        # Activity systems (fishing, magic, etc.)
```

---

## Art Style Guide

- **Pixel size:** 4px blocks (SNES-style)
- **Palette:** Cozy pastels + earth tones (TBD)
- **Resolution:** 320x240 or 480x272 (scaled up for browser)
- **Animation:** Simple, gentle movements

---

## Notes

- User (Charles) is a fantasy writer — rich lore potential!
- Prioritize cozy vibes over complexity
- Build incrementally; each phase should be playable
- Save progress as skills for continuity between sessions

---

*Last updated: June 24, 2026*
*Status: Pre-production — awaiting detailed design doc*

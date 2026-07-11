# Holiday Overhaul — Handoff

## Where this came from
`holiday_status.txt` is the source of truth for what's implemented. `Holidays/*.md`
holds design outlines for the 13 holidays that were unimplemented placeholders as
of July 11. Each outline maps **positionally** onto `HOLIDAYS` in
[src/daycycle.js](src/daycycle.js:44) — same index in the status doc list as in the
array, so e.g. outline #3 (Day of the Island God) replaced array entry #12
("Pinecone Prom"). Check `holiday_status.txt` against the array order if a name
doesn't match — the array holds the old placeholder name until someone renames it.

## Shipped this session
**Day of the Island God** (commit `0bf4fb8`, on `main`, pushed to origin). Static
giant turtle spawns on the easternmost beach tile via `spawnIslandGod()` in
[src/game.js](src/game.js:1367); interact for random flavor text (no dialogue
tree — just `notify()`). Animal spawn counts double for the day
([src/animals.js:717](src/animals.js:717)). Hoggy gets a reverence emote
([src/hog.js:502](src/hog.js:502)). Sprite key `sprites.island_god` is
registered but the file (`assets/sprites/island_god.png`) doesn't exist yet —
falls back to a colored shell shape until Charles drops in art.

## Remaining 12, ranked easiest → hardest to build
Ranking based on how much new plumbing each needs vs. reusing existing systems
(NPC roster, `gainGift` friendship, inventory, dialogue tree, interior-only
decor placement).

1. **Hoggy's Birthday** — reuses Hoggy NPC + gifting flip. Needs a new "place
   held item on/near an NPC" interaction (Hoggy already receives items via
   `feed()` in [src/hog.js:193](src/hog.js:193), so giving him a vegetable is
   close to free). The outline's picnic-blanket decoration is the only new
   plumbing — **skip it or reuse an existing static prop** rather than building
   outdoor decor placement from scratch (see gotcha below).
2. **Turtle Crossing Guard Day** — spawn 4-6 turtles that walk a straight line
   across a path; reuses `Animal`/turtle sprite from animals.js. Needs simple
   waypoint movement (no pathfinding).
3. **Returning Bird** — one bird + one neighbor following preset waypoints.
   Slightly more state than turtles (a neighbor's position gets overridden for
   the day).
4. **Lost Mail Day** — 3-5 pickable letter objects on the beach, matched to a
   neighbor by dialogue trigger. New "held temporary item" concept, no
   inventory slot needed.
5. **Well-Wishing Garden** / **Petal Path Maker** — both need placing a flower
   at a specific outdoor tile (a neighbor's door, or a path anchor) and
   checking it later. Same missing piece: no outdoor per-tile decor system
   exists yet (see gotcha).
6. **Memory Lantern Night** — dusk-triggered, lanterns placed in a preset line,
   pick-a-memory list UI. New but self-contained (no persistence).
7. **Picnic Reset** — temporarily relocates all placed outdoor furniture,
   requires storing + restoring original positions. First holiday that
   mutates existing player-placed state instead of adding temp objects.
8. **The Neighborhood Time Capsule** — cross-cycle persistence (store text
   across the 6-day gap until the holiday repeats). First one needing
   `world`-level persistent storage beyond the day.
9. **Flealess Market** — 3 items, one of which is a whole new plant type
   (seed + growth stages). Most new content of any outline.
10. **Familiar Seller** — permanent named companion that follows the player
    forever, across saves. Biggest new system (persistent follower + naming
    input + per-year selection).
11. **Tourist Time!** — mechanically simple (spawn 2-3 NPCs, trade item for
    IOUs) but needs several new throwaway dialogue lines per neighbor; save
    for when there's appetite for writing flavor text.

(Tourist Time and Flealess Market/Familiar Seller are ranked by *systems*
complexity, not necessarily writing effort — reorder freely.)

## Gotchas found while building the first one
- **No outdoor decor placement system.** Furniture/decoration placement
  ([src/game.js:2164](src/game.js:2164)) is interior-only (walls/floors inside
  buildings). Several outlines (Hoggy's Birthday picnic blanket,
  Well-Wishing Garden, Petal Path Maker) assume you can drop a decorative tile
  outside. Don't build a general system for this — reuse the temporary-NPC
  pattern instead (spawn a decoration as a static non-interactive prop object,
  same as `islandGod`, rather than plumbing it through the real furniture
  system).
- **`spawnTurtles()` never actually fires.** It's gated on
  `world.season !== 'Sour'` ([src/animals.js:319](src/animals.js:319)), but
  `SEASONS` is `['Sweet','Saucy','Cool','Yeesh']` — there is no 'Sour' season,
  so the check always passes and... wait, re-read it: the early return fires
  when the season *isn't* Sour, i.e. always, since Sour never occurs. Turtles
  currently never spawn via the daily cycle. Pre-existing bug, out of scope
  for the holiday work, but worth knowing if a holiday outline depends on wild
  turtles being present (Turtle Crossing Guard Day spawns its own turtles
  directly, so it's unaffected).
- **Positional mapping is fragile.** If anyone reorders `HOLIDAYS` or renames
  an old placeholder without checking `holiday_status.txt`'s matching row, the
  two files will drift out of sync. Always cross-check both before touching
  the array.

## Reusable template
`spawnYogatron()` / `updateYogatron()` / `drawYogatron()` / `tryTalkToYogatron()`
in [src/game.js:1104](src/game.js:1104) is the reference pattern for "temporary
NPC that exists only during one named holiday, self-manages spawn/despawn by
checking `getCurrentHoliday()` every frame." `islandGod` (added this session,
[src/game.js:1367](src/game.js:1367)) is a stripped-down variant with no
movement and no dialogue tree — better starting point than Yogatron for any
holiday whose NPC is static or has no branching conversation.

Friendship boosts: `npc.gainGift(value)` (neighbors, capped at 300,
[src/entities.js:144](src/entities.js:144)); Hoggy uses his own 0-10 scale
directly, not `gainGift`.

There's also now a project skill for this — see `/implement-holiday` in
`.claude/skills/implement-holiday/SKILL.md`.

## Process reminder (from CLAUDE.md)
Finished work always lands on `main`, pushed to origin, no need to ask. This
repo's checkout IS the main working copy, so no `git pull` step is needed
after pushing from here.

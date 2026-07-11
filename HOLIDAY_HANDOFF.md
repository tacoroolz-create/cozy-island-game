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

**Hoggy's Birthday** (on `main`, pushed to origin). Array slot 9 in
[src/daycycle.js](src/daycycle.js:54) (was "Left-Handed High-Fives") renamed.
No new "place item on NPC" interaction was needed — the existing gift-hand-in
flow (`Hog.feed()` in [src/hog.js:194](src/hog.js:194)) already covers "give
Hoggy something"; on this holiday the first feed of the day (any item, liked
or not) calls `triggerHoggyBirthdayGift()` ([src/hog.js:521](src/hog.js:521)),
which boosts every neighbor in `npcs[]` by `gainGift(5)` and fires one
`notify()`. Guarded per-day by `hog.birthdayGiftGiven`, reset in
`onHogNewDay()`. The picnic blanket is a static colored-rectangle prop
(`updateHoggyBirthdayBlanket`/`drawHoggyBirthdayBlanket`, hog.js) spawned
beside Hoggy — no new sprite, per the gotcha below. Neighbor dialogue gets
gift-flavored birthday lines via the existing `getHolidayGreetingPrefix()`
bank in [src/dialogue.js](src/dialogue.js:47). Skipped: the "birthday card
signboard with neighbor signatures" optional upgrade from the outline — not
needed for the core loop.

## Shipped this session (cont'd)
**Turtle Crossing Guard Day** (on `main`, pushed to origin). Array slot 20 in
[src/daycycle.js](src/daycycle.js:44) (was "One Big Scarf Festival") renamed.
Lives in [src/animals.js](src/animals.js:705) (`turtleCrossing` state,
`spawnTurtleCrossing`/`updateTurtleCrossing`/`drawTurtleCrossing`), hooked into
the existing `updateAnimals`/`drawAnimals` loop right next to Snake Run Day's
`updateSnakes`/`drawSnakes` — same "float tile-coordinate position + dt-based
lerp, self-spawn by checking `getCurrentHoliday()` every frame" shape, just a
straight crawl instead of a dart. `findTurtleCrossingRow()` scans the map's
center row for the widest clear grass run (no literal "path" tile exists, see
gotcha below) and 5 turtles crawl it, staggered by a random start delay.
Standing within 1 tile of a moving turtle pauses it; the first pause of the
day boosts every neighbor via `gainGift(3)` once (same shared-trigger pattern
as Hoggy's Birthday). Hoggy gets a "guard" mood; neighbor dialogue gets
guard-flavored lines via `getHolidayGreetingPrefix`. Skipped: the outline's
named neighbors (Brass, Vega, Willow) aren't in the actual 32-NPC roster
([src/entities.js:6](src/entities.js:6)), so lines are generic rather than
character-specific; also skipped physically repositioning neighbors along the
path — not needed for the reward loop, and that's the harder pattern this
ranking already reserves for The Returning Bird.

**The Returning Bird** (on `main`, pushed to origin). Array slot 22 in
[src/daycycle.js](src/daycycle.js:67) (was "Fruit Apology Day") renamed.
Lives in [src/animals.js](src/animals.js:799) (`returningBird` state,
`findReturningBirdStops`/`spawnReturningBird`/`updateReturningBird`/
`drawReturningBird`/`tryTalkToReturningBird`). One random neighbor from
`npcs[]` is picked as the bird's "old friend" for the day; that neighbor's
`stationary` flag is temporarily forced true and its `gridX`/`gridY` snapped
to the bird's current stop, since `entities.js`'s `NPC` class has no existing
"follow" concept — cheaper to hijack `stationary` + direct position writes
for one day than add a real following system. 3 waypoints are picked by
rejection-sampling clear grass/beach tiles (same technique as `spawnBirds`),
and the bird loops between them on a 40s timer all day rather than
"wandering" like a real `Animal`. Facing the bird+neighbor pair and
interacting (same two call sites as Island God, `game.js:3452` and
`game.js:2190`) shows a stop-specific one-sided line; first check-in per stop
gives that neighbor `gainGift(3)`. Hoggy gets a "sky" mood
([src/hog.js:517](src/hog.js:517)); neighbor dialogue gets
friend-vs-everyone-else lines via `getHolidayGreetingPrefix`
([src/dialogue.js:43](src/dialogue.js:43)). Skipped: the outline's
Hudson-specific line (no NPC named Hudson in the current roster — same gap as
Turtle Crossing Guard Day) and the optional "bird flies away at the final
stop" ending, since looping forever serves the check-in reward loop just as
well.

## Remaining 9, ranked easiest → hardest to build
Ranking based on how much new plumbing each needs vs. reusing existing systems
(NPC roster, `gainGift` friendship, inventory, dialogue tree, interior-only
decor placement).

1. **Lost Mail Day** — 3-5 pickable letter objects on the beach, matched to a
   neighbor by dialogue trigger. New "held temporary item" concept, no
   inventory slot needed.
2. **Well-Wishing Garden** / **Petal Path Maker** — both need placing a flower
   at a specific outdoor tile (a neighbor's door, or a path anchor) and
   checking it later. Same missing piece: no outdoor per-tile decor system
   exists yet (see gotcha).
3. **Memory Lantern Night** — dusk-triggered, lanterns placed in a preset line,
   pick-a-memory list UI. New but self-contained (no persistence).
4. **Picnic Reset** — temporarily relocates all placed outdoor furniture,
   requires storing + restoring original positions. First holiday that
   mutates existing player-placed state instead of adding temp objects.
5. **The Neighborhood Time Capsule** — cross-cycle persistence (store text
   across the 6-day gap until the holiday repeats). First one needing
   `world`-level persistent storage beyond the day.
6. **Flealess Market** — 3 items, one of which is a whole new plant type
   (seed + growth stages). Most new content of any outline.
7. **Familiar Seller** — permanent named companion that follows the player
   forever, across saves. Biggest new system (persistent follower + naming
   input + per-year selection).
8. **Tourist Time!** — mechanically simple (spawn 2-3 NPCs, trade item for
   IOUs) but needs several new throwaway dialogue lines per neighbor; save
   for when there's appetite for writing flavor text.
9. **Peak Saucy** — new outline that appeared mid-session
    ([Holidays/PeakSaucy.md](Holidays/PeakSaucy.md)), not yet ranked or given
    an array slot. `holiday_status.txt` now has 30 rows but
    `src/daycycle.js`'s `HOLIDAYS` array still has 29 — re-verify the
    positional mapping from this row onward before implementing it or
    anything after it. (Note: as of this session `holiday_status.txt` row 31
    also changed from "Jellybean Council" to "Cool Valley" outside this
    session's edits — the array still says "Jellybean Council" at that slot,
    another drift point to reconcile before touching that region.)

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

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

**Lost Mail Day** (on `main`, pushed to origin). Array slot 13 in
[src/daycycle.js](src/daycycle.js:58) (was "Reverse Burglary") renamed. Up to
4 sealed letters spawn on rejection-sampled beach tiles
(`lostMail`/`spawnLostMail`/`findLostMailBeachSpots` in
[src/game.js](src/game.js:1456)), each assigned a random neighbor from
`npcs[]` and a vague "dream address" flavor line. Facing and interacting with
a letter (`tryTalkToLostMail`, same two call sites as Island God) picks it up
as a temporary held item (`heldLostMailLetter`) — no inventory slot, per the
outline's "no persistent clutter" constraint. Delivering means facing the
matching neighbor and interacting; `tryDeliverLostMailLetter(npc)` is checked
*before* `openDialogue(npc)` at both call sites, so a correct delivery
short-circuits the normal conversation. Right neighbor: reaction line +
`gainGift(3)`, letter consumed. Wrong neighbor: polite "not mine" line, letter
stays held — no failure state, matches the outline. All 4 delivered correctly
triggers a one-time "return address that doesn't exist" flavor notify. Hoggy
gets a "letter" mood. No new sprite — falls back to a drawn envelope shape.
Skipped: personality-matched addresses (the outline's example clues like "the
one who talks to vegetables" don't map onto the actual 32-NPC roster, same gap
as Turtle Crossing Guard Day/The Returning Bird) — addresses are generic
whimsical flavor instead, since there's no failure state requiring the player
to actually solve the clue; also skipped a custom `getHolidayGreetingPrefix`
bank, following the precedent of Island God/Dig a Hole Day/Castle of Sticks
Day (static-prop holidays lean on the generic fallback).

**Well-Wishing Garden + The Petal Path Maker** (on `main`, pushed to origin),
shipped together since both were blocked on the same missing piece. First
built the shared primitive the old gotcha below used to warn against —
`findClearGroundNear(cx, cy, minR, maxR)` and `drawFlowerDecor(x, y)` in
[src/game.js](src/game.js:1599) — a radial rejection-sampled search for clear
grass/beach, and a flower sprite/fallback draw call. It's deliberately *not*
the real furniture/outdoor-item system (`ITEMS[id].outdoor`, used by potted
trees and neighbor shacks — still interior-placement-only, still permanent,
still untouched); this is a lighter, purely-visual, per-holiday-state overlay
that never writes to `world.tiles` and vanishes when the holiday ends, same
lifecycle as `islandGod`/`lostMail`/`turtleCrossing`.

**Well-Wishing Garden**: array slot 19 (was "Opposite Compliment Day")
renamed. A static gardener (`wellWishGardener`) spawns near the dock;
interacting hands the player one held flower a day (`heldWellWishFlower`,
same temporary-held-item pattern as Lost Mail Day's letters). Door-standing
spots for every housed neighbor are precomputed each morning
(`buildWellWishSpots()`, via each neighbor's home `Building` +
`findExteriorStandingTile()` — the same helper `hog.js` already uses for
Hoggy's tier-4 morning greet). Facing a spot while holding the flower plants
it (`tryPlaceWellWishFlower`); the thank-you reaction lives in
[src/dialogue.js](src/dialogue.js:66)'s `getHolidayGreetingPrefix` (same hook
as Hoggy's Birthday/Turtle Crossing), firing `gainGift(3)` once per neighbor
the first time they're greeted after their door is decorated.

**The Petal Path Maker**: array slot 23 (was "Humming in Unison Hour")
renamed. A path-artist (`petalPathArtist`) spawns near the dock and hands out
held petals (`heldPetal`). 5 anchor tiles are interpolated between the dock
and the player's own home door (`findPetalPathAnchors()`, via
`getPlayerShack()` + `findExteriorStandingTile()`) and snapped to clear
ground. Neighbors trickle petals onto open anchors every 15-25s
(`updatePetalPath()`); once every anchor is filled, standing on the path
within 1 tile of a neighbor triggers a one-time "follow the pink" comment +
`gainGift(2)` per neighbor (`walkedWith` Set, keyed by `npc.id`).

Both: Hoggy gets a mood in `getHogHolidayMood()`. No new sprites — both fall
back to `drawFlowerDecor`'s colored-ellipse flower. Skipped: the outline's
named neighbors (Zora/Gearwick/Nix, Daphne/Krip/Penny — same gap as every
other holiday with example dialogue for characters outside the real 32-NPC
roster); Well-Wishing Garden's "perpetual blessing seed" optional upgrade;
and a friendship stat for the path-artist to receive the outline's "boost the
path-artist" reward — one-day visiting NPCs (Yogatron, the gardener, the
path-artist) don't have a friendship system in this codebase at all, not
worth inventing one for a single cosmetic line.

**Memory Lantern Night** (on `main`, pushed to origin). Array slot 18 in
[src/daycycle.js](src/daycycle.js:64) (was "Pet Rock Adoption Fair") renamed.
Dusk-gated: `updateMemoryLanternNight()` in
[src/game.js](src/game.js:1886) only spawns once `world.timeMinutes` passes
5 PM on the holiday day, via `findLanternShoreLine()` (widest run of clear
beach tiles on any row, same "scan a row" technique as
`findTurtleCrossingRow`), evenly spaced into 5 lantern spots. 4 lanterns are
pre-lit with a random neighbor's memory line from a small generic bank; the
5th starts empty. Walking within 1 tile of a lit lantern reads it ambiently
(no interact key) and gives that neighbor `gainGift(2)` on first read. A
static lantern-lighter (same shape as `islandGod`) spawns near the shore;
interacting fills the empty lantern with one random player memory line — no
"pick from a list" UI, since one random pick on interact matches every other
"talk to the visiting NPC for a small reward" holiday. Everything vanishes
the next morning once the holiday's no longer active, same lifecycle as
every other one-day visitor. Hoggy gets a "glow" mood; neighbor dialogue
gets lantern-flavored lines via `getHolidayGreetingPrefix`, including a
special comment once that neighbor's own lantern has been read. No new
sprite — falls back to a colored rectangle + soft glow ellipse. Skipped: the
"chosen memory reappears on a later cycle" optional upgrade, and
named-neighbor-specific lines (Mimis/Cort aren't in the actual 32-NPC
roster, same gap as every other holiday with example dialogue for
out-of-roster characters).

**The Picnic Reset** (on `main`, pushed to origin). Array slot 22 (was
"Door-Holding Olympics") renamed. The outline wanted the real player-placed
outdoor furniture temporarily relocated and restored — out of scope per the
existing gotcha (that system mutates `world.tiles` and is meant to be
permanent), so this reuses The Returning Bird's "hijack `npc.stationary` +
snap position" trick for up to 3 neighbor pairs instead of touching real
furniture. `findPicnicLineSpots()` in
[src/game.js](src/game.js:2032) scans every row for the widest clear-grass
run (same technique as `findLanternShoreLine`) and seats 2-6 randomly chosen
present neighbors along it as blanket-prop pairs; each neighbor's original
position/stationary flag is saved and restored when the holiday ends or a
new day begins. A static organizer NPC (same shape as `islandGod`) gives
flavor lines; facing a seated pair and interacting shows a two-line banter
exchange and gives both neighbors `gainGift(2)` once, with a one-time
"Picnic Napper" flavor line after 3 different pairs (standing in for the
outline's "sit in three seats" upgrade — no sitting mechanic exists in this
codebase). Hoggy gets a "picnic" mood; neighbor dialogue gets
seated-vs-not-seated lines via `getHolidayGreetingPrefix`. No new sprite —
falls back to striped rectangle blankets. Skipped: the outline's named pairs
(Chester+Luna, Hudson+Mimis), same out-of-roster gap as every other holiday
with example dialogue — pairs are chosen randomly from the real roster
instead.

**The Neighborhood Time Capsule** (on `main`, pushed to origin). Array slot 25
(was "Cloud-Naming Congress") in
[src/daycycle.js](src/daycycle.js:69) renamed. First holiday needing state
that survives past its own day — the holiday recurs every
`HOLIDAY_INTERVAL * HOLIDAYS.length` = 174 days, and the buried box has to
last until then. A historian NPC (same static-prop shape as `islandGod`)
spawns near the dock each occurrence
(`spawnTimeCapsuleHistorian`/`updateTimeCapsuleHistorian`/
`drawTimeCapsuleHistorian`/`tryTalkToTimeCapsuleHistorian`, in
[src/game.js](src/game.js:2203)). Talking to him: if a box is already buried
from last cycle, the first interact digs it up and reads one mangled reveal
line (player's old item/memory blended with a handful of flavor-only
neighbor donations), then clears it; the next interact re-buries a fresh box
— consuming a real inventory item (first material/gift/treasure slot found,
skips tools/blocks) plus one random memory line from a small bank.
`timeCapsuleBox` is the one holiday-state variable that does *not* get reset
whenever `getCurrentHoliday()` stops matching (every other holiday's temp
state does) — it's also wired into
[src/save.js](src/save.js:428)'s `serializeGame`/`deserializeGame` (new
`timeCapsuleBox` field) so a save/quit mid-cycle doesn't lose it. Hoggy gets
a "dig" mood; neighbor dialogue gets box-flavored lines via
`getHolidayGreetingPrefix`, including a special line for neighbors who
"donated" to the currently-buried box. No new sprite — historian falls back
to a colored rectangle. Skipped: the outline's named donation lines
(Chester/Luna/Hudson/Mimis — same out-of-roster gap as every other holiday
with example dialogue) — neighbor donations are generic lines assigned to
randomly chosen present neighbors instead; also skipped the "player's own
donation is mangled specifically" optional upgrade, since the whole reveal
line is already a single generic mangled blend, matching the "no picker UI"
precedent from every other visiting-NPC holiday.

**Tourist Time!** (on `main`, pushed to origin). Array slot 7 (was "Spoon
Appreciation Day") in [src/daycycle.js](src/daycycle.js:52) renamed. 3 static
tourists spawn near the dock on `findClearGroundNear` rings staggered by
radius so they don't stack
(`spawnTouristTime`/`updateTouristTime`/`drawTouristTime`/`tryTalkToTourist`
in [src/game.js](src/game.js:2333)). Facing one while holding any
`'gift'`-category item (the closest existing stand-in for "harvested fruit
or flower" — no dedicated fruit/flower category exists in `ITEMS`) hands it
over as a souvenir: item consumed via `inventory.removeItem`, `+1 IOU` via
`inventory.addItem('iou', 1)`, once per tourist per day. Otherwise, or once
thanked, interacting shows a random naive question via `notify()` — no
failure state, matching the outline. Hoggy gets a "confused" mood; neighbor
dialogue gets tourist-brag lines via `getHolidayGreetingPrefix`
([src/dialogue.js](src/dialogue.js:23)). No new sprite or boat — falls back
to a colored rectangle body per tourist; the boat itself is flavor text
only in the spawn `notify()`, never drawn. Skipped: the outline's named
neighbor brags (Chester/Luna/Hudson/Aiko — same out-of-roster gap as every
other holiday with example dialogue) — brags are generic instead; also
skipped the "visitor log sign" optional upgrade.

## Shipped this session (cont'd, 2)
**Peak Saucy** (on `main`, pushed to origin). This also resolved the
row-count drift flagged below: `holiday_status.txt` had picked up a stray
extra "The Great Blink-Off" row (never a real outline, just leftover filler
text) that pushed everything from Peak Saucy onward one row out of sync with
`src/daycycle.js`'s `HOLIDAYS` array. That row is now gone from the status
file, so every row maps 1:1 to its array index again — array slot 26 (was
"The Great Blink-Off" placeholder) is renamed to Peak Saucy. Two placeholder
slots remain: array[27] "Jellybean Council" and array[28] "Hat-Stacking
Jubilee", which map 1:1 to Cool Valley and Peak Yeesh respectively by row
order — no array growth to 32 needed for those two.

Lives in [src/game.js:2423](src/game.js:2423) (`peakSaucyElder`/`peakSaucy`
state, `spawnPeakSaucy`/`updatePeakSaucy`/`drawPeakSaucy`/
`tryTalkToPeakSaucyElder`/`tryServeSweetTea`), a static bonfire elder near
the dock, same shape as `islandGod`. Talking to the elder hands the player a
held Sweet Tea (`heldSweetTea`, same temporary-held-item pattern as Lost Mail
Day's letters) — refillable all day rather than once-per-day, since the loop
is "serve as many neighbors as you can" rather than the flower/petal
holidays' single-item-per-day economy. Facing any neighbor while holding tea
and interacting (`tryServeSweetTea`, checked before `openDialogue` at both
call sites, same hook point as Lost Mail Day's delivery) serves it —
`gainGift(2)`, no targeting, any neighbor works. Serving 3 different
neighbors triggers a one-time keepsake IOU. Hoggy gets a "cozy" mood;
neighbor dialogue gets served-vs-not-served lines via
`getHolidayGreetingPrefix`. No new sprite — falls back to colored shapes.
Skipped: the outline's Tea Leaves/Lemon wild-harvestable items and the Sweet
Tea/Lemonade crafting chain — confirmed both would be near-trivial data-table
additions (`PLANTS`/`RECIPES`/`HARVEST_TYPES` in gardening.js/crafting.js/
game.js are all generic, keyed off small data tables), but every other
holiday in this codebase already skips real economy integration for a
handed-out flavor item instead, so Peak Saucy follows that precedent rather
than being the first exception; also skipped the procession/pathing walk per
the outline's own "no complex multi-NPC pathing" constraint, and the "both
Sweet Tea and Lemonade" keepsake condition since there's only one drink type.

**Cool Valley** (on `main`, pushed to origin). Array slot 27 (was "Jellybean
Council") in [src/daycycle.js](src/daycycle.js:72) renamed. Dusk-gated (spawns
once `world.timeMinutes` passes 5 PM, same threshold as Memory Lantern Night)
via `updateCoolValley`/`spawnCoolValley` in
[src/game.js](src/game.js:2517). `findLanternShoreLine()` is reused verbatim
from Memory Lantern Night to line 4 purely-ambient lanterns along the shore —
no per-lantern memory text, since reading individual lines is already Memory
Lantern Night's mechanic; these are just the "path to watch the moon rise"
flavor from the outline. `findMemoryStones()` scans the whole map for
existing `rock`/`shiny_rock` tiles (no new tile type, per the outline's own
constraint) and picks 3 at random as "memory stones." A static elder
(`coolValleyElder`, same static-prop shape as `islandGod`/`peakSaucyElder`)
spawns near the dock and hands out a held Sweet Rice Ball on interact
(`heldSweetRiceBall`, refillable all day, same pattern as Peak Saucy's tea);
serving it to any present neighbor (`tryServeRiceBall`, checked before
`openDialogue` at both interact call sites, same hook point as Peak Saucy)
gives `gainGift(2)`, with a one-time IOU reward after serving 3 different
neighbors. Facing a memory stone while holding any inventory item and
interacting (`tryLeaveMemoryOffering`) consumes it as an offering (one-time
per stone per day, generic flavor line, no neighbor tied since stones aren't
personal); leaving all 3 offerings gives a one-time bonus IOU. Hoggy gets a
"moonlit" mood; neighbor dialogue reuses the Cool Valley comment bank already
sitting unused in [src/dialogue.js](src/dialogue.js:197)'s
`getHolidayGreetingPrefix` (written in an earlier pass but never wired to a
matching `holiday.name` until now — worth checking `dialogue.js` for other
pre-written-but-unwired banks before building the next holiday, since Peak
Yeesh's bank is already there too at [src/dialogue.js:208](src/dialogue.js:208)).
No new sprites — elder, lanterns, and stone offerings all fall back to
colored shapes. Skipped: the outline's Chrysanthemum seasonal-flower item
(offerings accept any inventory item instead, following the "flavor item,
not a real crop" precedent every prior holiday has used) and a literal "high
point" destination — this engine has no elevation/hill concept, so the
moon-viewing gathering happens along the shore like Memory Lantern Night's
instead, which fits the source tradition's waterside moon-viewing just as
well.

## Remaining, ranked easiest → hardest to build
Ranking based on how much new plumbing each needs vs. reusing existing systems
(NPC roster, `gainGift` friendship, inventory, dialogue tree, the outdoor
decor primitive above).

1. **The Flealess Market** — 3 items, one of which is a whole new plant type
   (seed + growth stages). Confirmed in Peak Saucy's research that the
   crop-growth system (`PLANTS`/`SEED_TO_PLANT` in gardening.js) is a tiny
   data-table addition, not a new state machine — so this is less scary than
   it sounds, just more items than usual.
2. **Peak Yeesh** — needs 8 new furniture pieces (reuses the existing
   furniture/decoration placement system, so each is a data-table item, not
   new plumbing), a silent wandering NPC (Papa Yeesh), a "stay awake until
   midnight" timing check, and reading back the player's yearly Hoggy-gift
   count for the reward split. Its `getHolidayGreetingPrefix` comment bank is
   already written ([src/dialogue.js:208](src/dialogue.js:208)), same
   pre-written-but-unwired situation Cool Valley's was in. More moving parts
   than Flealess Market but nothing that needs a new subsystem.
3. **Familiar Seller** — permanent named companion that follows the player
   forever, across saves. Biggest new system (persistent follower + naming
   input + per-year selection) — no existing "follow the player" or
   "permanent named pet" system to reuse, unlike everything else on this
   list.

`Backwards Hats Day` (array[0]) is still unimplemented with no outline file —
not ranked, since the skill's step 1 only considers `No` rows that have a
matching `Holidays/*.md` outline.

## Gotchas found while building the first one
- **~~No outdoor decor placement system.~~ Resolved.** The real furniture
  placement system ([src/game.js:2164](src/game.js:2164)) is still
  interior-only and permanent (walls/floors inside buildings, or the
  `ITEMS[id].outdoor` potted-tree/shack path that mutates `world.tiles`) — do
  *not* route new outlines through either of those. Instead use
  `findClearGroundNear(cx, cy, minR, maxR)` + `drawFlowerDecor(x, y)` in
  [src/game.js](src/game.js:1599) (added for Well-Wishing Garden/The Petal
  Path Maker): a radial rejection-sampled ground search + a flower draw call,
  both purely visual and held in per-holiday JS state that vanishes when the
  holiday ends. Any future outline needing "drop a decorative tile outside"
  (Memory Lantern Night's lanterns, etc.) should reuse this, not reinvent it.
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

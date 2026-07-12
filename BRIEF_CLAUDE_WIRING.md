# Claude Code Task Brief — Cozy Island Neighbor Rewrite Wiring

## Goal
Replace the game's old 59-neighbor roster and its old conversations with the new 32-neighbor rewrite roster and their hand-written conversations in `NeighborRewrite/`.

## Repository
`/Users/clockworkwellness/Desktop/Cozy Island Game`
Run all commands from this directory.

## Important Constraints
- **Only edit files inside `src/` and `save.js` migration wiring.** Do not touch art in `Sprites/` or untracked new asset files.
- **Do not change the existing holiday list** in `src/daycycle.js`.
- Keep p5.js global-mode patterns; preserve existing engine behavior (dialogue injection, quest hooks, cutouts, etc.).
- After finishing, run a JS syntax check (`node --check`) on every edited `src/*.js` file.

## New Neighbor Roster (32)
Source: `NeighborRewrite/CharacterDraft.txt`

| # | Name | Species | Personality | Suggested Color |
|---|------|---------|-------------|-----------------|
| 0 | Piko | Robot | Kawaii (female) | #F48FB1 |
| 1 | Rivet | Robot | Tsundere (female) | #B71C1C |
| 2 | Shade-7 | Robot | Goth (female) | #263238 |
| 3 | Cypher | Robot | Nerd | #00838F |
| 4 | Om-Bit | Robot | Monk | #C0A062 |
| 5 | Sir Cogs-a-Lot | Robot | Medieval | #D4AF37 |
| 6 | Tinker | Robot | Shy | #8D6E63 |
| 7 | Zap-Zap | Robot | Cheerful (female) | #FDD835 |
| 8 | Boo-Boo | Ghost | Kawaii (female) | #F8BBD0 |
| 9 | Wisp | Ghost | Tsundere (female) | #BA68C8 |
| 10 | Morwen | Ghost | Goth (female) | #78909C |
| 11 | Spectra | Ghost | Nerd | #4DB6AC |
| 12 | Hush | Ghost | Monk | #B0BEC5 |
| 13 | Sir Haunts-a-Lot | Ghost | Medieval | #9E9E9E |
| 14 | Flutter | Ghost | Shy | #E1BEE7 |
| 15 | Giggles | Ghost | Cheerful (female) | #FFF176 |
| 16 | Mochi | Animal (Rabbit) | Kawaii (female) | #FFE0E0 |
| 17 | Shadow | Animal (Cat) | Tsundere (female) | #212121 |
| 18 | Raven | Animal (Crow) | Goth (female) | #37474F |
| 19 | Newton | Animal (Owl) | Nerd | #ECEFF1 |
| 20 | Lotus | Animal (Crane) | Monk | #E0F7FA |
| 21 | Squire Paws | Animal (Dog) | Medieval | #8D6E63 |
| 22 | Pebble | Animal (Turtle) | Shy | #A5D6A7 |
| 23 | Sunny | Animal (Parrot) | Cheerful (female) | #FFEB3B |
| 24 | Fluffernox | Monster | Kawaii (female) | #FFCCBC |
| 25 | Grumble | Monster | Tsundere (female) | #78909C |
| 26 | Vesper | Monster | Goth (female) | #263238 |
| 27 | Gizmo | Monster | Nerd | #90A4AE |
| 28 | Ommmm | Monster | Monk | #4CAF50 |
| 29 | Lord Roar | Monster (Dragon-like) | Medieval | #7B1FA2 |
| 30 | Snug | Monster | Shy | #B3E5FC |
| 31 | Gigglegrow | Monster | Cheerful (female) | #FFD54F |

(Use colors you think fit; the ones above are suggestions. Each def must keep `{ name, personality: "custom", species, color }`.)

## New Conversation Source Files
All under `NeighborRewrite/`:
- `NPCConvo2.txt` — first 8 robots (Piko..Zap-Zap)
- `NPCConvo3.txt` — next 8 ghosts (Boo-Boo..Giggles)
- `NPCConvo4.txt` — next 8 animals (Mochi..Sunny)
- `NPCConvo5.txt` — last 8 monsters (Fluffernox..Gigglegrow)
- `NPCConvoCool2.txt`..`NPCConvoCool5.txt` — Cool-season variants for the same 32
- `NPCConvoSaucy2.txt`..`NPCConvoSaucy5.txt` — Saucy-season variants
- `NPCConvoYeesh2.txt`..`NPCConvoYeesh5.txt` — Yeesh-season variants
- `NPCConvoQuests.txt` — quest start/remind/thank dialogues for all 32
- `NPCConvoSprinkles.txt` — one-liners and species/personality endings

Conversation format in each `NPCConvo*.txt`:
```
TURN 1 - Name:
"dialogue text"
PLAYER CHOICES:
[1] "choice"
[2] "choice"
[3] "choice"

---

TURN 2A (if player chose 1):
Name: "reply"
PLAYER CHOICES: [1] [2] [3]

TURN 2B (if player chose 2):
...
TURN 2C (if player chose 3):
...

TURN 3AA (if player chose 1 then 1):
Name: "final reply"
TURN 3AB, 3AC, 3BA, 3BB, 3BC, 3CA, 3CB, 3CC follow the same pattern.
```
The rewrite uses 3 turns (start, choice, final). Convert each NPC into the existing JS tree shape used by the engine:
```js
"Name": {
  "start": { text: "...", choices: [
    { text: "[1]", next: "c1", friendshipDelta: 0 },
    { text: "[2]", next: "c2", friendshipDelta: 0 },
    { text: "[3]", next: "c3", friendshipDelta: 0 }
  ]},
  "c1": { text: "...", choices: [
    { text: "[1]", next: "c1a", friendshipDelta: 1 },
    { text: "[2]", next: "c1b", friendshipDelta: 1 },
    { text: "[3]", next: "c1c", friendshipDelta: 1 }
  ]},
  "c1a": { text: "...", choices: [{ text: "Goodbye!", next: null, friendshipDelta: 1 }] },
  ...
}
```
Use sensible `friendshipDelta` values (0 for neutral starts, 1 for warm choices, 2 for very warm choices).

## Files to Modify

### 1. `src/entities.js`
- Replace the entire `NPC_DEFS` array with the 32 new neighbors from `CharacterDraft.txt`.
- Keep `MUBABA_DEF` untouched (he is not a neighbor).
- Keep `MAX_NEIGHBORS = 9`, `ARRIVAL_INTERVAL_DAYS = 3`, etc.

### 2. `src/dialogue_written.js`
- Replace the entire `WRITTEN_DIALOGUES` object with the new 32 neighbors parsed from `NPCConvo2.txt`..`NPCConvo5.txt`.
- Convert to the node-tree shape the engine expects (see above).

### 3. `src/dialogue_smalltalk.js`
- Replace `CUTOUT_COMMENTS` so it contains one entry per new 32 neighbor. Keep the style: neighbor reacts to seeing their own cardboard cutout. Reference `cutoutItemId` already exists; just ensure names match.
- Replace `SMALLTALK_BANKS` so it contains 3 short `st(...)` conversations per new neighbor. You can build them from `NPCConvoSprinkles.txt` one-liners plus a few seasonal lines, or reuse leaf nodes from the seasonal conversation files as short small-talk trees. The key is each entry must be an array of 3 small talk trees.
- Keep the `st()` helper, ambient constants, `makeAmbientTree`, and `chooseConversationTree`.

### 4. `src/dialogue.js`
- Replace `CHARACTER_DIALOGUES` so it only lists the 32 new neighbors. The factory string arguments can be derived from `CharacterDraft.txt` description and species/personality. Keep the `makeCharacterTree` and `generateDialogue` functions as fallback machinery.
- Optional but encouraged: add a `SEASONAL_DIALOGUES` lookup object loaded from `NPCConvoCool/Saucy/Yeesh*.txt` and update `chooseConversationTree` (in `dialogue_smalltalk.js`) so that, when a seasonal variant exists for the current `world.season`, it has a chance to be used instead of the default written tree. If this feels risky, skip it for now and note it.

### 5. `src/save.js`
- Bump `SAVE_VERSION` from 20 to 21.
- Add a v20 → v21 migration that handles the old roster being replaced. The simplest correct behavior: if the save contains `npcs` whose ids reference the old 59-index range, clear the island `npcs` array and clear any `buildings` whose `owner` is a number (those were NPC shacks). This lets `checkArrivals()` / `onNpcNewDay()` repopulate neighbors. Do not clear the player shack (owner is the string `'player'`). Notify the player with `notify()` if possible, or just leave it to natural arrival flow.

### 6. `src/game.js`
- Remove the old per-neighbor sprite entries in `SPRITE_DEFS` (the 59 `sprites.<name>` entries). It is fine if new neighbors have no sprite entries yet — the drawing code falls back to a colored rectangle when `SPRITES[spriteKey]` is null. Do not add 32 new placeholder files.
- The Electric Temple currently hardcodes `TEMPLE_TAIRA_ID = 14` and `templeTaira()`. Taira is no longer in the new roster. Disable / comment out the temple-Taira logic:
  - Remove/comment the `TEMPLE_TAIRA_ID` constant, `TEMPLE_TAIRA_POS`, `_templeTaira`, `templeTaira()`, `tryTalkToTempleTaira()`, the temple Taira drawing block in `drawInterior()`, and the Enter/click temple Taira hooks.
  - Leave the temple interior otherwise intact.

### 7. `index.html` (if needed)
No changes expected unless a script order issue appears.

## Verification Steps (must all pass before reporting done)
1. `node --check src/entities.js`
2. `node --check src/dialogue.js`
3. `node --check src/dialogue_written.js`
4. `node --check src/dialogue_smalltalk.js`
5. `node --check src/save.js`
6. `node --check src/game.js`
7. `node --check src/quests.js`
8. `node --check src/almanac.js`
9. `node --check index.html` — note: HTML is not JS; instead just confirm `index.html` loads the same scripts.
10. Run a quick grep: `grep -n "TEMPLE_TAIRA_ID\|TEMPLE_TAIRA_POS\|templeTaira\|tryTalkToTempleTaira" src/game.js` should return nothing after disabling.
11. `grep -n "'Chester'\|'Luna'\|'Brass'\|'Vega'" src/entities.js` should return nothing.
12. Confirm `NPC_DEFS` length is 32 and `WRITTEN_DIALOGUES` keys match the 32 names.

## How to Report Completion
- Summarize which files were changed and the key decisions (e.g. Taira removed, migration added, seasonal variants wired/skipped).
- Show the `node --check` results.
- Note any remaining loose ends or things the human should review.

## What NOT to Do
- Do not generate new pixel art.
- Do not modify `Sprites/`, `assets/`, holiday definitions, Mubaba, Hog, animals, buildings tiers, or magic systems beyond the direct side effects of the roster swap.
- Do not delete the old `src/dialogue_written.js.bak` backup.

---
name: implement-holiday
description: Implement one of the Cozy Island Game's outlined-but-unbuilt holidays from Holidays/*.md into working code. Use when the user says "implement the next holiday", "build [holiday name]", "work on the holiday overhaul", or references holiday_status.txt / the Holidays folder.
---

# Implement a Cozy Island Game holiday

Turns one design outline in `Holidays/*.md` into working code, following the
pattern established by "Day of the Island God" (see `HOLIDAY_HANDOFF.md` for
full context on that build).

## Steps

1. **Read `holiday_status.txt`** to find holidays marked `No` with an outline
   file, and **read the matching outline** in `Holidays/<Name>.md`.

2. **Find the array slot.** `holiday_status.txt`'s row order matches
   `HOLIDAYS` in `src/daycycle.js` positionally — same index in both. Confirm
   by counting, don't assume names match (the array still holds the old
   placeholder name, e.g. "Pinecone Prom", until you rename it).

3. **Pick the laziest holiday first, not the first in the list.** Rank
   candidates by how much new plumbing they need vs. reusing what's already
   there (NPC roster + dialogue, `gainGift` friendship, inventory, animal
   spawn system). `HOLIDAY_HANDOFF.md` has a ranked list from the first pass —
   check it before re-deriving the ranking from scratch, but re-verify since
   it goes stale as holidays get built.

4. **Reuse the temporary-NPC template**, don't invent a new one:
   `src/game.js` has `spawnYogatron`/`updateYogatron`/`drawYogatron`/
   `tryTalkToYogatron` (full dialogue tree, wandering) and `spawnIslandGod`/
   `updateIslandGod`/`drawIslandGod`/`tryTalkToIslandGod` (static, one-off
   flavor text via `notify()`, no dialogue tree). Pick whichever's closer to
   what the outline needs and copy its shape: self-managing spawn/despawn by
   checking `getCurrentHoliday().name` every frame, hooked into the main
   update/draw loop and both interact call sites (there are two — a keyboard
   handler and a mouse handler, grep `tryTalkToYogatron` to find both).

5. **No outdoor decor placement system exists.** Furniture/decoration
   placement (`src/game.js` around line 2164) is interior-only. If an outline
   wants a flower/blanket/statue placed outside, spawn it as a static prop
   object (like `islandGod`) instead of building general outdoor decor
   plumbing — that's out of scope for a single holiday.

6. **Wire the calendar hook** in `src/daycycle.js`'s `onNewDay()`, inside the
   `isFestival` block, alongside the other `if (holiday.name === '...')` cases.

7. **Give Hoggy a reaction** in `getHogHolidayMood()` (`src/hog.js`) if the
   holiday warrants one — it's a one-line addition and keeps his coverage
   consistent across holidays.

8. **Update `holiday_status.txt`**: flip the row to `Yes` with a one-line
   note of what was built, and append a dated note at the bottom (see the
   existing July 11 entries for the format).

9. **`node --check` every file you touched** before committing — this repo
   has no build step, so a syntax slip only surfaces at runtime in-browser.

10. **Commit and push to `main` directly**, per this repo's `CLAUDE.md`:
    finished work always lands on `main` and gets pushed to origin without
    asking. Stage only the files you touched — this repo commonly has
    unrelated in-progress work sitting uncommitted (dialogue rewrites, new
    sprites); check `git status` and `git diff --stat` against your own edit
    list before `git add`.

11. **Don't launch the game to self-verify.** Charles checks changes in-browser
    himself (per `CLAUDE.md`) — report what changed instead.

## Output

After implementing, report: what was built, which file/line the new spawn
function lives at, what was deliberately skipped (e.g. "no new sprite yet,
falls back to a colored shape"), and what the next-easiest remaining holiday
is per the ranked list.

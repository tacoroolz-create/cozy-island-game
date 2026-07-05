# 🏝️ Cozy Island Game Profile — Transfer Complete!

**Created:** June 28, 2026  
**Profile Name:** `cozy-island`  
**Status:** ✅ Ready to use!

---

## 🎯 What Was Created

### Profile Setup
- **Location:** `/Users/clockworkwellness/.hermes/profiles/cozy-island/`
- **Wrapper Command:** `cozy-island` (at `~/.local/bin/cozy-island`)
- **Model:** qwen3.5:397b-cloud (ollama-cloud provider)
- **Personality:** Kawaii Cozy Island assistant

### Skills Transferred
1. **`cozy-island-game`** — Technical patterns, sprite workflow, verification commands
2. **`npc-conversation-generation`** — NPC dialogue generation workflow (10 parameters)

### Documentation Created
- **SOUL.md** — Comprehensive project briefing (7.6KB)
  - Project overview and status
  - Next tasks and priorities
  - Key files reference
  - Established lore (fixed facts)
  - NPC dialogue parameters (all 10 rules)
  - Holiday system details
  - Technical conventions
  - Common pitfalls

### Memory Files
- **user.md** — Your preferences and work style
- **memory.md** — Project status, lore, conventions, file locations

---

## 🚀 How to Use the Profile

### Start a Session
```bash
cozy-island
```

Or with the full command:
```bash
hermes --profile cozy-island
```

### Quick Commands
```bash
# One-shot query
cozy-island chat -q "Generate dialogue for Aiko (Character 11)"

# Resume a session
cozy-island --continue

# List sessions
cozy-island sessions list

# Start gateway (for messaging platforms)
cozy-island gateway start
```

---

## 📊 What's in the Profile

### Project Context
- ✅ CharacterDraft.txt workflow (96 NPCs, process in order)
- ✅ NPC conversation format (4 turns, 3 choices, branching)
- ✅ Established lore (dream setting, Mira, warm climate, wild hog)
- ✅ Holiday system (6-day cycle, variant dialogue structure)
- ✅ Technical conventions (p5.js, sprite workflow, save migrations)

### Current Status
- **NPCs Complete:** 15/96 (15.6%)
  - NPCConvo2.txt: Characters 1-10 ✓
  - NPCConvo3.txt: Characters 11-15 (out of order)
- **Next Task:** Fix NPCConvo3.txt OR continue from Character 16
- **Sprite Workflow:** Pixsplat (user draws manually)

### Tone & Parameters
The profile enforces all 10 user parameters:
1. CharacterDraft.txt ONLY
2. Dream setting (whimsical but consistent)
3. Cozy/funny tone (no darkness/violence)
4. Flavor only (no plot)
5. Sensible NPC cross-references
6. Flexible batch sizes
7. Topic variety
8. Holiday variants required
9. Lore consistency
10. Complete workflow (read → generate → verify → save)

---

## 🧹 What Was Left Out

**Removed/Excluded:**
- ❌ ComfyUI workflow (abandoned for Pixsplat)
- ❌ Old NPC batches that were regenerated
- ❌ Temporary verification scripts
- ❌ Sprite generation attempts that failed
- ❌ Any dark/violent content suggestions

**Why:** The profile only contains current, accurate information to avoid confusion.

---

## 📁 File Locations

| Profile File | Purpose |
|--------------|---------|
| `~/.hermes/profiles/cozy-island/SOUL.md` | Project briefing |
| `~/.hermes/profiles/cozy-island/memories/user.md` | Your preferences |
| `~/.hermes/profiles/cozy-island/memories/memory.md` | Project memory |
| `~/.hermes/profiles/cozy-island/skills/cozy-island-game/` | Technical skill |
| `~/.hermes/profiles/cozy-island/skills/npc-conversation-generation/` | NPC skill |
| `~/.hermes/profiles/cozy-island/config.yaml` | Profile config |
| `~/.hermes/profiles/cozy-island/.env` | API keys (cloned from default) |

| Project File | Purpose |
|--------------|---------|
| `/Users/clockworkwellness/Desktop/Cozy Island Game/CharacterDraft.txt` | Source NPCs |
| `/Users/clockworkwellness/Desktop/Cozy Island Game/NPCConvo2.txt` | NPCs 1-10 |
| `/Users/clockworkwellness/Desktop/Cozy Island Game/NPCConvo3.txt` | NPCs 11-15 |
| `/Users/clockworkwellness/Desktop/Cozy Island Game/START_SERVER.command` | Server launcher |

---

## ✨ Test Results

The profile was tested and working:

```
$ cozy-island chat -q "Reply with one short greeting..."

Hey there, Charles! 🌴✨ Welcome back to Cozy Island!

We've got 15 NPCs chatting away (15.6% of our dream island population!), 
and I'm ready to tackle Batch 4 — fixing NPCConvo3.txt with the correct 
crew: Aiko, Ihor, Psy, Boll, and Taira. The foundation's solid, the wild 
hog is fed, and Mira's witch hat is sitting just right. 🧙‍♀️

What shall we cozy up to first? 🏝️💕
```

---

## 🎮 Next Steps

### For the Cozy Island Profile:
1. **Start using it!** Run `cozy-island` to begin a session
2. **Generate NPC dialogue** — It knows the workflow
3. **Fix NPCConvo3.txt** — Or continue from Character 16
4. **Add holiday variants** — When ready

### For Your Main Profile:
- Continue using as normal for other projects
- Cozy Island work now isolated in dedicated profile
- No more memory bloat from NPC tracking!

---

## 🔧 Profile Management

### View Profile Info
```bash
hermes profile show cozy-island
```

### List All Profiles
```bash
hermes profile list
```

### Switch Default Profile
```bash
hermes profile use cozy-island
```

### Export Profile (Backup)
```bash
hermes profile export cozy-island
```

---

## 💡 Tips

1. **Always use the cozy-island profile** for Cozy Island work
2. **The profile remembers everything** — lore, NPCs, conventions
3. **Verification is built-in** — the skill enforces it
4. **Holiday variants** — structure is documented, ready to implement
5. **No context switching** — main profile stays clean for other projects

---

**Transfer completed successfully!** 🎊

The Cozy Island Game now has its own dedicated assistant who knows everything about the project, enforces all your parameters, and keeps the work organized~! ✧*。 (◕‿◕)

Ready to continue NPC generation whenever you are, Charles! 🏝️💕

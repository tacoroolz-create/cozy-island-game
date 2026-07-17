// ===== MAGIC SYSTEM =====
// Magic tricks are learned by completing Mubaba's quests in his fortress
// (see "Mubabas Quests.txt"). Casting: press M in the world (see
// openMagicCastMenu). Menus reuse the dialogue advanced-menu machinery
// (dialogue.js).

// ponytail: per-cast costs default to 1 crystal each — tune the cost lists here.
const MAGIC_TRICKS = [
    { id: 'tree_move', name: 'Tree Move', icon: '♣',
      desc: 'Pick up a tree as a placeable item.',
      cost: [{id:'crystal', count:1}] },
    { id: 'banish', name: 'Banish', icon: '⚡',
      desc: 'Force a neighbor to move out, home and all.',
      cost: [{id:'crystal', count:1}] },
    { id: 'transmute', name: 'Transmute', icon: '⚗',
      desc: 'Turn 10 of an item into 3 of another.',
      cost: [{id:'crystal', count:1}] },
    { id: 'teleport', name: 'Teleport', icon: '☉',
      desc: 'Warp between the island and the underground.',
      cost: [{id:'crystal', count:1}] },
    { id: 'change_time', name: 'Time Warp', icon: '☀',
      desc: 'Toggle between day and night.',
      cost: [{id:'crystal', count:1}] },
    { id: 'change_season', name: 'Season Shift', icon: '⚘',
      desc: 'Advance to the next season instantly.',
      cost: [{id:'crystal', count:1}] }
];

let knownMagic = [];
// Cross-save quest state. mubabaMet: accepted his offer (intro done forever).
// domStep: World Domination progress (0 not started, 1 usurper pending,
// 2 stardew pending, 3 elixir done / IOU ask pending). usurperBanished is
// only set by casting Banish while domStep is 1. mubabaQuest flips true when
// Teleport is learned (kept for older saves/UI that read it).
let magicFlags = { mubabaQuest: false, mubabaMet: false, usurperBanished: false, domStep: 0 };

// Which placeable item each tree tile type turns into (and back).
const TREE_ITEM_BY_TYPE = {
    tree: 'potted_tree', fir_tree: 'potted_fir_tree',
    banana_tree: 'potted_banana_tree', palm_tree: 'potted_palm_tree'
};

// The island neighbor roster, wherever the player currently is. On the island
// it's the live `npcs` global; elsewhere it's parked on the island map.
function islandNpcList() {
    if (typeof currentMapId === 'undefined' || currentMapId === 'island') return npcs;
    return (maps.island && maps.island.entities && maps.island.entities.npcs) || [];
}

// id -> total inventory count for non-tool items (transmute candidates).
function transmutableCounts() {
    const counts = {};
    for (const s of inventory.slots) {
        if (!s) continue;
        const it = ITEMS[s.id];
        if (!it || it.category === 'tool') continue;
        counts[s.id] = (counts[s.id] || 0) + s.count;
    }
    return counts;
}

function costLabel(cost) {
    return cost.map(c => c.count + ' ' + (ITEMS[c.id] ? ITEMS[c.id].name : c.id)).join(', ');
}

function learnMagic(trickId) {
    if (knownMagic.includes(trickId)) return;
    knownMagic.push(trickId);
    const trick = MAGIC_TRICKS.find(t => t.id === trickId);
    if (trick) notify('Learned ' + trick.name + '!');
}

function canCastMagic(trickId) {
    const trick = MAGIC_TRICKS.find(t => t.id === trickId);
    if (!trick) return false;
    return trick.cost.every(c => inventory.hasItem(c.id, c.count));
}

function payCastCost(trick) {
    for (const c of trick.cost) inventory.removeItem(c.id, c.count);
}

// ===== MENUS (built on the dialogue advanced-menu machinery) =====

function openMagicMenu(title, options) {
    dialogueState.active = true;
    dialogueState.menuTitle = title;
    dialogueState.advancedMenu = true;
    dialogueState.advancedSelected = 0;
    dialogueState.advancedOptions = options;
    gameState = STATE.DIALOGUE;
}

// ===== MUBABA'S QUESTS (script: "Mubabas Quests.txt") =====

const MUBABA_INTRO =
    "I AM MUBABA, WIZARD OF SHADOW AND STRIFE! Manipulator of magical monsters and men alike! " +
    "The dwarves know me as Bjorn M'gorn, the elves know me as Lan'key Musafa, and to the humans " +
    "I am known only as terror! A simple greeting, you say? Such paltry words for one who will " +
    "command the very essence of this world – nay, all of existence, once my glorious empire " +
    "is fully realized!";

// Start a written dialogue tree with Mubaba (fortress scene stays up behind it).
function openMubabaTree(npc, tree) {
    npc._dialogueTree = tree;
    dialogueState.active = true;
    dialogueState.npc = npc;
    dialogueState.advancedMenu = false;
    dialogueState.currentNode = 'start';
    dialogueState.textRevealed = 0;
    dialogueState.selectedChoice = 0;
    dialogueState.choicesVisible = false;
    gameState = STATE.DIALOGUE;
}

// Entry point when talking to Mubaba (from the fortress door or openDialogue).
function openMubabaMenu(npc) {
    dialogueState.npc = npc;
    if (!magicFlags.mubabaMet) { openMubabaIntro(npc); return; }
    if (knownMagic.includes('teleport')) { openMubabaPostgame(npc); return; }
    openMubabaQuestMenu(npc);
}

// First-ever audience: the intro plays once. Refusing (option 1) boots the
// player back outside; accepting closes this conversation forever and makes
// every later visit open the quests list.
function openMubabaIntro(npc) {
    openMubabaTree(npc, {
        start: { text: MUBABA_INTRO, choices: [
            { text: "Woah. Okay. Well, I don't really have a name and all that...", next: 'noname' },
            { text: 'Neat. Can I help?', next: 'eager', action: () => { magicFlags.mubabaMet = true; } }
        ] },
        noname: { text: "No name?! What a strange creature you are... hm... yes, this is most interesting. Or... Do you deceive me?! Aye, I see through your trickery! Away, ye nameless ghoul!", choices: [
            { text: '...', next: null }
        ] },
        eager: { text: "Yes...YES! An eager servant, a confidant and boon companion. This is what I need. I have many needs, new friend. Alas, I cannot leave my fortress. What with all of these machinations and magical whirligigs thrumming... imagine if one were to fly out the window and alert the outside of my plans? A disaster, to say the least. Yes, you can help. Here is what I need.", choices: [
            { text: '...', action: () => openMubabaQuestMenu(npc) }
        ] }
    });
}

// The four trick quests. `met` checks the requirement; `consume` hands over
// the goods (only called right after met() passed).
const MUBABA_QUESTS = [
    { name: 'Research the life on the surface', tricks: ['tree_move'], smoke: [92, 184, 92],
      pitch: "I believe I may be able bend the surface world to my will if I can control their flora. To do this, I will need to understand the magical essence of the plant life. Bring me 10 logs, 10 pinecones, and 10 bananas. I believe I can distill these into a plant mind control ritual!",
      met: () => ['log', 'pinecone', 'banana'].every(id => inventory.hasItem(id, 10)),
      consume: () => ['log', 'pinecone', 'banana'].forEach(id => inventory.removeItem(id, 10)),
      handOver: 'Here you go.', comeBack: "I'm on it.",
      ritual: "Huzzah! This is exactly what I needed. Now, allow me to place them in the circle. The body of the tree, to teach me their strength. The seed of the tree, to teach me their future. The fruit of the tree, to show me their gifts. Flizardo Requinta Bistoffa!",
      fizzle: "Blast these infernal pinecones and their poppy popping! The spell seems to have missed me... where did it go?",
      gained: 'The magic seems to have seeped into you. You can move trees now!' },
    { name: 'Raising the Golem', tricks: ['transmute'], smoke: [150, 150, 150],
      pitch: "Perhaps I am over complicating this... no empire was ever built without good old fashioned warcraft! I will build an army, not of men, but of animate refuse! Let their wasteful ways be their very downfall! Bring me 50 units of something from the surface. Anything. Make sure it's all the same thing for aesthetics, of course.",
      met: () => Object.values(transmutableCounts()).some(c => c >= 50),
      consume: () => { // hand over 50 of whatever the player has the most of
          const counts = transmutableCounts();
          const id = Object.keys(counts).filter(k => counts[k] >= 50)
                           .sort((a, b) => counts[b] - counts[a])[0];
          inventory.removeItem(id, 50);
      },
      handOver: 'Take these 50, then.', comeBack: "I'll start hoarding.",
      ritual: "Huzzah! This will do nicely. Stand back, for the golems shall thirst for blood with their first breath! Jalipa Pintoofa Shin Gotaram!",
      fizzle: "Gah! I can't work in these conditions! This place is a mess! Where are my golems? Confound it, the spell didn't work!",
      gained: 'The magic seems to have seeped into you. You can magically manipulate items now!' },
    { name: 'Manipulate Time and Space', tricks: ['change_time', 'change_season'], smoke: [220, 70, 70],
      pitch: "If they are too old to fight, the armies of the world will kneel to me in surrender! However, it will take some time to learn how to manipulate... erm... time.",
      met: () => typeof world !== 'undefined' && world && world.day > 160,
      consume: () => {},
      handOver: "It's been a whole year, you know.", comeBack: "See you next year, I guess.",
      ritual: "We have done it! I have the secret incantation to control time! Bingabong Boothie Piddle Paddle!",
      fizzle: "It is done! I think... Hm... Maybe this watch is broken.",
      gained: 'The magic seems to have seeped into you. You can fast forward through time now!' },
    { name: 'No Kings', tricks: ['banish'], smoke: [80, 130, 230],
      pitch: "I don't know why I didn't think of this sooner! If I banish the Kings and Emperors of the world, the people will naturally looks for the wisest and most regal man in the lands to lead them! That's me, by the way. Yes, fine, you are impressive as well. We need more energy from the surface to fuel this spell... at least 9 intelligent beings whose souls I can harness. Perhaps you could... make friends?",
      met: () => islandNpcList().filter(n => n.isPresent && n.hasHome).length >= 9,
      consume: () => {},
      handOver: 'I happen to have 9 friends.', comeBack: "I'll go make friends.",
      ritual: "At last! My most powerful incantation yet! By drawing from the power of those on the surface we shall unfurl a great incantation... underground! Here, I mean. Shabbo Shabbo Binkley Tazani Horrem Dastalik!",
      fizzle: "At last! I shall... I will... hm... I don't feel any different.",
      gained: 'The magic seems to have seeped into you. You can magically banish neighbors now!' },
];

function mubabaQuestDone(q) { return q.tricks.every(t => knownMagic.includes(t)); }

// The quests table: the hub every post-intro visit lands on. World Domination
// appears only once the four trick quests are complete.
function openMubabaQuestMenu(npc) {
    dialogueState.npc = npc;
    const opts = MUBABA_QUESTS.map(q => mubabaQuestDone(q)
        ? { text: '✓ ' + q.name, action: () => openMubabaQuestMenu(npc) }
        : { text: q.name, action: () => openMubabaQuest(npc, q) });
    if (MUBABA_QUESTS.every(mubabaQuestDone)) {
        opts.push({ text: 'World Domination', action: () => openWorldDomination(npc) });
    }
    opts.push({ text: 'Leave', action: () => closeDialogue() });
    openMagicMenu("Mubaba's Quests", opts);
}

// One trick quest: pitch, then either back to the table (requirement unmet)
// or the ritual -> smoke puff -> comic failure -> the player gains the magic.
function openMubabaQuest(npc, q) {
    const met = q.met();
    openMubabaTree(npc, {
        start: { text: q.pitch, choices: [ met
            ? { text: q.handOver, next: 'ritual', action: () => q.consume() }
            : { text: q.comeBack, action: () => openMubabaQuestMenu(npc) } ] },
        ritual: { text: q.ritual, choices: [
            { text: '...', next: 'fizzle', action: () => triggerFortressPuff(q.smoke) }
        ] },
        fizzle: { text: q.fizzle, choices: [
            { text: '...', next: null, action: () => {
                q.tricks.forEach(learnMagic);
                notify(q.gained, 6000);
            } }
        ] }
    });
}

// ===== QUEST 5: WORLD DOMINATION (multi-step, gated by magicFlags.domStep) =====

function openWorldDomination(npc) {
    const step = magicFlags.domStep;
    if (step === 0) {
        openMubabaTree(npc, {
            start: { text: "Ah! My friend! Such good fortune to have an audience for my inevitable rise to greatness! Never mind the failures of the past, we are striving! We are moving into the future! Nothing will stop us! Or... will it? Hm... something tells me that someone is plotting against me... Go forth, my minion! Eject the Usurper!", choices: [
                { text: '...', next: null, action: () => {
                    magicFlags.domStep = 1;
                    notify("Mubaba thinks someone is up to... yes good? Up to something. He's probably just being his crazy self. You could probably banish anyone and he'd believe it was the right person.", 8000);
                } }
            ] }
        });
    } else if (step === 1 && !magicFlags.usurperBanished) {
        openMubabaTree(npc, {
            start: { text: "The Usurper still schemes against us! Go forth, my minion! Eject the Usurper!", choices: [
                { text: 'Right, on it.', action: () => openMubabaQuestMenu(npc) }
            ] }
        });
    } else if (step === 1) {
        openMubabaTree(npc, {
            start: { text: "The usurper has been annihilated! Rejoice! Excellent work, my friend. Now, to blend the elixir. Ice water from hell, a cactus grown from snow, a Barbara Streisand cassette tape, and a bottle of Stardew... Wait, where did I put the Stardew?! Blast!", choices: [
                { text: '...', next: null, action: () => {
                    magicFlags.domStep = 2;
                    notify("He probably never had it. Oh well, let's go get it for him. We can use a glass bottle from the sea and fill it with the dew from the grass in the Stars. We'd better be there early in the morning though, the grass up there doesn't stay wet for long.", 8000);
                } }
            ] }
        });
    } else if (step === 2 && !inventory.hasItem('stardew', 1)) {
        openMubabaTree(npc, {
            start: { text: "The elixir awaits only the Stardew! Where is my Stardew?!", choices: [
                { text: "Still looking. It's a whole thing.", action: () => openMubabaQuestMenu(npc) }
            ] }
        });
    } else {
        if (step === 2) { inventory.removeItem('stardew', 1); magicFlags.domStep = 3; }
        const hasIous = inventory.hasItem('iou', 10);
        openMubabaTree(npc, {
            start: { text: "There it is! I knew I didn't misplace it! Now that all of the ingredients are compiled, only one thing remains... I... am STARVING. I wouldn't normally ask this but you know... rent is due... Can I borrow 10 IOUs?", choices: [
                hasIous
                    ? { text: 'Sure.', next: 'sucker', action: () => inventory.removeItem('iou', 10) }
                    : { text: 'Sure.', next: null, action: () => notify("You dig through your pockets... you don't actually have 10 IOUs.", 5000) },
                { text: 'No way!', next: 'begone' }
            ] },
            sucker: { text: "Hah! Sucker! After I finish this spell, you'll never see me again! Never loan a wizard money!", choices: [
                { text: '...', next: 'still', action: () => triggerFortressPuff([240, 220, 80]) }
            ] },
            still: { text: "What... I'm still here? I uh... I'll get this back to you soon.", choices: [
                { text: '...', next: null, action: () => {
                    learnMagic('teleport');
                    magicFlags.mubabaQuest = true;
                    notify('The magic seems to have seeped into you. You can Teleport now!', 6000);
                } }
            ] },
            begone: { text: "No?! What manner of friend are you? Begone!", choices: [
                { text: '...', next: null }
            ] }
        });
    }
}

// After every quest is done Mubaba is purely conversational.
function openMubabaPostgame(npc) {
    openMubabaTree(npc, {
        start: { text: MUBABA_INTRO, choices: [
            { text: 'Yeah, good luck with that.', next: null },
            { text: 'Hey buddy, do you have that 10 you owe me?', next: 'owe' }
        ] },
        owe: { text: "Yes, yes of course... I... um... You know what? It's in the chest. I'm just a little wary of exposing the location of my secret chest. I'll have it out for you next time.", choices: [
            { text: 'Uh huh.', next: null }
        ] }
    });
}

// Entry point: M key while playing.
function openMagicCastMenu() {
    if (knownMagic.length === 0) {
        notify("You haven't learned any magic yet. Visit Mubaba in the underground city!");
        return;
    }
    const opts = knownMagic.map(id => {
        const t = MAGIC_TRICKS.find(tr => tr.id === id);
        return { text: t.icon + ' ' + t.name + ' (' + costLabel(t.cost) + ')', action: () => castTrick(t.id) };
    });
    opts.push({ text: 'Cancel', action: () => closeDialogue() });
    openMagicMenu('Cast Magic', opts);
}

// ===== CASTING =====

function castTrick(trickId) {
    closeDialogue();
    const trick = MAGIC_TRICKS.find(t => t.id === trickId);
    if (!trick) return;
    if (!canCastMagic(trickId)) {
        notify('Need ' + costLabel(trick.cost) + ' to cast ' + trick.name + '.');
        return;
    }
    switch (trickId) {
        case 'tree_move':     castTreeMove(trick); break;
        case 'banish':        castBanish(trick); break;
        case 'transmute':     openTransmuteSourceMenu(trick); break;
        case 'teleport':      castTeleport(trick); break;
        case 'change_time':
            payCastCost(trick);
            if (world.timeMinutes < 720) {
                world.timeMinutes = 1200; // 8 PM
                notify('Night fell!');
            } else {
                world.timeMinutes = 360; // 6 AM
                notify('Morning arrived!');
            }
            break;
        case 'change_season': {
            payCastCost(trick);
            const seasons = ['Sweet', 'Saucy', 'Cool', 'Yeesh'];
            world.season = seasons[(seasons.indexOf(world.season) + 1) % 4];
            notify('Season shifted to ' + world.season + '!');
            break;
        }
    }
}

// Tree Move: scoop the faced tree (trunk or canopy tile) into a potted item.
function castTreeMove(trick) {
    const facing = player.getFacingTile();
    let fx, fy, tile = null;
    if (facing && TREE_ITEM_BY_TYPE[facing.tile.type]) {
        fx = facing.x; fy = facing.y; tile = facing.tile;
        if (tile.isTreeTop) { // resolve canopy -> trunk below it
            fy = facing.y + 1;
            tile = (world.tiles[fx] && world.tiles[fx][fy]) || null;
            if (!tile || !TREE_ITEM_BY_TYPE[tile.type]) tile = null;
        }
    }
    if (!tile) { notify('Face a tree to cast Tree Move.'); return; }
    const itemId = TREE_ITEM_BY_TYPE[tile.type];
    if (!inventory.addItem(itemId, 1)) { notify('Inventory is full!'); return; }
    payCastCost(trick);
    // Restore both tiles to the coastline's true terrain (islandZone is the
    // source of truth on the island; other maps have no trees).
    for (const ty of [fy, fy - 1]) {
        const zone = (typeof islandZone === 'function' && currentMapId === 'island') ? islandZone(fx, ty) : 'grass';
        world.tiles[fx][ty] = { type: zone === 'beach' ? 'beach' : 'grass', variant: floor(random(3)) };
    }
    notify('Scooped up a ' + ITEMS[itemId].name + '! Click open ground to replant it.');
}

// Banish: confirm, then force the faced neighbor out and remove their shack.
function castBanish(trick) {
    const npc = (typeof npcAtFacing === 'function') ? npcAtFacing() : null;
    // Only roster neighbors (numeric ids) can be banished — not Mubaba.
    if (!npc || typeof npc.id !== 'number') { notify('Face a neighbor to cast Banish.'); return; }
    openMagicMenu('Banish ' + npc.name + '?', [
        { text: 'Yes — banish ' + npc.name, action: () => {
            closeDialogue();
            payCastCost(trick);
            if (magicFlags.domStep === 1) magicFlags.usurperBanished = true; // "the Usurper" is whoever you banish
            npc.isPresent = false;
            npc.hasHome = false;
            npc.departureCounter = 0;
            buildings = buildings.filter(b => b.owner !== npc.id);
            notify(npc.name + ' was banished! Their home vanished with them.');
        } },
        { text: 'Cancel', action: () => closeDialogue() }
    ]);
}

// Transmute: pick a source you hold >=10 of, then a target in the same category.
function openTransmuteSourceMenu(trick) {
    const counts = transmutableCounts();
    const sources = Object.keys(counts).filter(id => counts[id] >= 10);
    if (sources.length === 0) { notify('You need at least 10 of an item to transmute.'); return; }
    const opts = sources.map(id => ({
        text: ITEMS[id].name + ' x' + counts[id],
        action: () => openTransmuteTargetMenu(trick, id)
    }));
    opts.push({ text: 'Cancel', action: () => closeDialogue() });
    openMagicMenu('Transmute 10 of...', opts);
}

function openTransmuteTargetMenu(trick, srcId) {
    const cat = ITEMS[srcId].category;
    const targets = Object.keys(ITEMS).filter(id => id !== srcId && ITEMS[id].category === cat);
    const opts = targets.map(id => ({
        text: '→ 3x ' + ITEMS[id].name,
        action: () => {
            closeDialogue();
            if (!inventory.hasItem(srcId, 10)) { notify('Not enough ' + ITEMS[srcId].name + ' anymore.'); return; }
            payCastCost(trick);
            inventory.removeItem(srcId, 10);
            inventory.addItem(id, 3);
            notify('Transmuted 10 ' + ITEMS[srcId].name + ' into 3 ' + ITEMS[id].name + '!');
        }
    }));
    opts.push({ text: 'Cancel', action: () => closeDialogue() });
    openMagicMenu('...into 3 of', opts);
}

// ===== MUBABA'S FORTRESS =====
// The fortress door opens straight into an audience with Mubaba: black scene,
// mubaba.png over a magic circle, player unseen. Entered from tryEnterBuilding;
// drawn by drawFortressScene during the dialogue state.
let fortressSceneActive = false;

// Called by closeDialogue() so leaving any fortress conversation drops the scene.
function clearFortressScene() { fortressSceneActive = false; fortressPuff = null; }

// Ritual smoke: colored puff rising from Mubaba's feet + a screen shake.
let fortressPuff = null; // { color: [r,g,b], start: ms }
function triggerFortressPuff(color) { fortressPuff = { color, start: millis() }; }

function enterMubabaFortress() {
    let m = npcs.find(n => n.id === 'mubaba');
    if (!m) { m = new NPC(MUBABA_DEF, 'mubaba'); m.isPresent = false; npcs.push(m); } // safety net
    fortressSceneActive = true;
    openMubabaMenu(m);
}

function drawFortressScene() {
    if (!fortressSceneActive) return;
    background(0);
    // Ritual effects: shake the whole scene briefly, then let the puff rise.
    const puffAge = fortressPuff ? millis() - fortressPuff.start : Infinity;
    push();
    if (puffAge < 600) translate(random(-4, 4), random(-3, 3));
    const sceneH = height - 120; // the dialogue panel covers the bottom
    const cx = width / 2;
    const feetY = Math.floor(sceneH * 0.85);
    // Magic circle: sprite when Charles provides one, drawn rings until then.
    const circle = SPRITES['sprites.magic_circle'];
    if (circle) {
        image(circle, cx - 90, feetY - 34, 180, 68);
    } else {
        noFill();
        stroke(140, 60, 220);
        strokeWeight(2);
        ellipse(cx, feetY, 170, 56);
        stroke(190, 120, 255);
        strokeWeight(1);
        ellipse(cx, feetY, 130, 42);
        noStroke();
        fill(220, 170, 255);
        for (let i = 0; i < 8; i++) { // slowly orbiting rune dots
            const a = frameCount * 0.01 + i * PI / 4;
            ellipse(cx + Math.cos(a) * 75, feetY + Math.sin(a) * 24, 4, 4);
        }
    }
    // Mubaba, large, hovering gently over the circle.
    const spr = SPRITES['sprites.mubaba'];
    const bob = Math.sin(frameCount * 0.04) * 4;
    if (spr) {
        const mw = 64, mh = 160; // 2x the 32x80 sprite
        image(spr, cx - mw / 2, feetY - mh + 6 + bob, mw, mh);
    } else {
        fill('#8a5ac2');
        noStroke();
        rect(cx - 24, feetY - 120 + bob, 48, 116);
    }
    // Smoke puff: translucent blobs drifting up from his feet for ~1.5s.
    if (puffAge < 1500) {
        const [r, g, b] = fortressPuff.color;
        noStroke();
        const t = puffAge / 1500;
        for (let i = 0; i < 10; i++) {
            const a = i * 2.4; // fixed pseudo-random spread per blob
            const px = cx + Math.sin(a) * (14 + t * 40);
            const py = feetY - t * (60 + (i % 4) * 25);
            const size = 18 + (i % 3) * 10 - t * 8;
            fill(r, g, b, 180 * (1 - t));
            ellipse(px, py, size, size * 0.8);
        }
    } else if (fortressPuff) {
        fortressPuff = null;
    }
    pop();
}

// Teleport: hop to the other world, landing one tile clear of its pond.
function castTeleport(trick) {
    const dest = (currentMapId === 'underground') ? 'island' : 'underground';
    const spot = TELEPORT_LANDINGS[dest];
    payCastCost(trick);
    notify('Whoosh!');
    travelTo(dest, spot.x, spot.y, spot.facing);
}

// Magic tab rendering (menu). Shadows the older stub in game.js (loads later).
function drawMagicTab(x, y, w, h) {
    fill(255);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Magic Tricks', x, y);

    if (knownMagic.length === 0) {
        fill(255);
        textSize(8);
        text('Mubaba, in the underground city,', x, y + 16);
        text('teaches magic tricks — for a price,', x, y + 28);
        text('or to those who earn them.', x, y + 40);
        return;
    }

    // List known tricks
    let rowY = y + 18;
    for (const trickId of knownMagic) {
        const trick = MAGIC_TRICKS.find(t => t.id === trickId);
        if (!trick) continue;

        // Icon
        fill(255, 255, 100);
        text(trick.icon, x, rowY);

        // Name
        fill(255);
        textSize(9);
        text(trick.name, x + 16, rowY);

        // Desc
        fill(255);
        textSize(7);
        text(trick.desc, x + 16, rowY + 10);

        // Cost
        fill(255);
        textSize(7);
        text('Cost: ' + costLabel(trick.cost), x + 16, rowY + 20);

        // Castable?
        if (canCastMagic(trickId)) {
            fill(100, 255, 100);
            textSize(7);
            text('Ready!', x + w - 40, rowY);
        } else {
            fill(255);
            textSize(7);
            text('No materials', x + w - 60, rowY);
        }

        rowY += 32;
    }

    fill(255);
    textSize(7);
    text('Press M in the world to cast', x, rowY + 2);
    if (typeof menuContentH !== 'undefined') menuContentH = rowY + 14 - y;
}

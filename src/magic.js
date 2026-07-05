// ===== MAGIC SYSTEM =====
// Magic tricks are learned from Mubaba in the underground city (C4 redesign):
// some are traded for goods, some unlock from accomplishments, one from his
// quest. Casting: press M in the world (see openMagicCastMenu). Menus reuse
// the dialogue advanced-menu machinery (dialogue.js).

// ponytail: per-cast costs default to 1 crystal each — tune the cost lists here.
const MAGIC_TRICKS = [
    { id: 'tree_move', name: 'Tree Move', icon: '♣',
      desc: 'Pick up a tree as a placeable item.',
      cost: [{id:'crystal', count:1}],
      unlock: { type: 'trade', cost: [{id:'log', count:10}, {id:'pinecone', count:10}, {id:'banana', count:10}] } },
    { id: 'banish', name: 'Banish', icon: '⚡',
      desc: 'Force a neighbor to move out, home and all.',
      cost: [{id:'crystal', count:1}],
      unlock: { type: 'milestone', hint: 'Have 9 housed neighbors',
                check: () => islandNpcList().filter(n => n.isPresent && n.hasHome).length >= 9 } },
    { id: 'transmute', name: 'Transmute', icon: '⚗',
      desc: 'Turn 10 of an item into 3 of another.',
      cost: [{id:'crystal', count:1}],
      unlock: { type: 'milestone', hint: 'Hold more than 50 of one item',
                check: () => Object.values(transmutableCounts()).some(c => c > 50) } },
    { id: 'teleport', name: 'Teleport', icon: '☉',
      desc: 'Warp between the island and the underground.',
      cost: [{id:'crystal', count:1}],
      unlock: { type: 'quest', hint: "Complete Mubaba's quest",
                check: () => !!magicFlags.mubabaQuest } },
    { id: 'change_time', name: 'Time Warp', icon: '☀',
      desc: 'Toggle between day and night.',
      cost: [{id:'crystal', count:1}],
      unlock: { type: 'milestone', hint: 'Complete one full year (160 days)',
                check: () => typeof world !== 'undefined' && world && world.day > 160 } },
    { id: 'change_season', name: 'Season Shift', icon: '⚘',
      desc: 'Advance to the next season instantly.',
      cost: [{id:'crystal', count:1}],
      unlock: { type: 'milestone', hint: 'Complete one full year (160 days)',
                check: () => typeof world !== 'undefined' && world && world.day > 160 } }
];

let knownMagic = [];
// Cross-save flags for magic unlocks. mubabaQuest is set by Mubaba's quest
// (content TBD — nothing sets it yet, so Teleport ships locked).
let magicFlags = { mubabaQuest: false };

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

// Talking to Mubaba lands here instead of the plain dialogue (see openDialogue).
function openMubabaMenu(npc) {
    dialogueState.npc = npc;
    openMagicMenu(npc.name, [
        { text: 'Talk', action: () => {
            dialogueState.advancedMenu = false;
            dialogueState.currentNode = 'start';
            dialogueState.textRevealed = 0;
            dialogueState.selectedChoice = 0;
            dialogueState.choicesVisible = false;
            npc.gainTalk();
        } },
        { text: 'Learn Magic', action: () => openLearnMagicMenu(npc) },
        { text: 'Cancel', action: () => closeDialogue() }
    ]);
}

function openLearnMagicMenu(npc) {
    const opts = MAGIC_TRICKS.map(t => {
        if (knownMagic.includes(t.id)) {
            return { text: t.icon + ' ' + t.name + ' ✓ known', action: () => openLearnMagicMenu(npc) };
        }
        const u = t.unlock;
        if (u.type === 'trade') {
            return { text: t.icon + ' ' + t.name + ' — trade ' + costLabel(u.cost), action: () => {
                if (!u.cost.every(c => inventory.hasItem(c.id, c.count))) {
                    notify('You need ' + costLabel(u.cost) + ' for that.');
                    openLearnMagicMenu(npc);
                    return;
                }
                for (const c of u.cost) inventory.removeItem(c.id, c.count);
                learnMagic(t.id);
                openLearnMagicMenu(npc);
            } };
        }
        // Milestone/quest unlocks: label reflects menu-open time, but the
        // action re-checks live so a just-met condition still counts.
        return { text: t.icon + ' ' + t.name + (u.check() ? ' — ready to learn!' : ' — locked'), action: () => {
            if (u.check()) learnMagic(t.id);
            else notify('Locked: ' + u.hint + (u.type === 'quest' ? ' (Mubaba has no task for you yet...)' : ''));
            openLearnMagicMenu(npc);
        } };
    });
    opts.push({ text: 'Back', action: () => openMubabaMenu(npc) });
    openMagicMenu('Learn Magic', opts);
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
function clearFortressScene() { fortressSceneActive = false; }

function enterMubabaFortress() {
    let m = npcs.find(n => n.id === 'mubaba');
    if (!m) { m = new NPC(MUBABA_DEF, 'mubaba'); m.isPresent = false; npcs.push(m); } // safety net
    fortressSceneActive = true;
    openMubabaMenu(m);
}

function drawFortressScene() {
    if (!fortressSceneActive) return;
    background(0);
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
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Magic Tricks', x, y);

    if (knownMagic.length === 0) {
        fill(120);
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
        fill(150);
        textSize(7);
        text(trick.desc, x + 16, rowY + 10);

        // Cost
        fill(120);
        textSize(7);
        text('Cost: ' + costLabel(trick.cost), x + 16, rowY + 20);

        // Castable?
        if (canCastMagic(trickId)) {
            fill(100, 255, 100);
            textSize(7);
            text('Ready!', x + w - 40, rowY);
        } else {
            fill(150);
            textSize(7);
            text('No materials', x + w - 60, rowY);
        }

        rowY += 32;
        if (rowY > y + h - 16) break;
    }

    fill(120);
    textSize(7);
    text('Press M in the world to cast', x, y + h - 10);
}

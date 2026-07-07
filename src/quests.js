// ===== NEIGHBOR QUESTS & CARDBOARD CUTOUTS =====
// Daily fetch/delivery quests discovered through conversation (injected into
// dialogue trees by injectQuestDialogue, called from dialogue.js), a
// per-neighbor completion counter, and a cardboard-cutout decor reward that
// quietly appears in the inventory after 10 completed quests for a neighbor.

// --- State (persisted via save.js under `quests`) ---
let questState = {
    active: {},      // npcName -> { type:'fetch'|'deliver', item, qty, to, accepted }
    completed: {},   // npcName -> completed quest count
    cutoutGiven: {}  // npcName -> true once their cutout has appeared
};
let placedCutouts = [];  // [{ x, y, name }] — island map only, 1x2 tiles, bottom-anchored

const QUESTS_PER_DAY = 3;
const CUTOUT_QUEST_GOAL = 10;
const QUEST_FRIENDSHIP = 15;

// Things a player can reasonably gather by hand.
const QUEST_FETCH_ITEMS = [
    { id: 'log', qty: 2 }, { id: 'stick', qty: 3 }, { id: 'stone', qty: 2 },
    { id: 'fiber', qty: 3 }, { id: 'pinecone', qty: 2 }, { id: 'banana', qty: 2 },
    { id: 'berry', qty: 2 }, { id: 'rose', qty: 1 }, { id: 'tulip', qty: 1 },
    { id: 'seashell', qty: 1 }, { id: 'feather', qty: 2 }, { id: 'palm_frond', qty: 2 }
];
const QUEST_REWARD_ITEMS = ['berry_jam', 'fruit_salad', 'grilled_banana', 'seashell', 'crystal', 'gold_coin'];

// --- Item registration (parcel + one cutout per roster character) ---
function cutoutItemId(name) {
    return 'cutout_' + name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}
(function registerQuestItems() {
    ITEMS.parcel = { name: 'Parcel', category: 'treasure', maxStack: 1, color: '#C9A86B', desc: "A neighbor's parcel, wrapped with care. Someone is waiting for this." };
    for (const def of NPC_DEFS) {
        ITEMS[cutoutItemId(def.name)] = {
            name: def.name + ' Cutout', category: 'block', maxStack: 1, color: def.color,
            desc: 'A life-size cardboard cutout of ' + def.name + '. Place it outside on open ground.',
            outdoor: { cutout: def.name }
        };
    }
})();

// --- Daily quest rotation ---
function assignDailyQuests() {
    // Neighbors live on the island; skip the tick while on another map
    // (same guard as onNpcNewDay).
    if (typeof currentMapId !== 'undefined' && currentMapId !== 'island') return;
    // Yesterday's unaccepted offers expire; accepted quests persist until done.
    for (const name in questState.active) {
        if (!questState.active[name].accepted) delete questState.active[name];
    }
    const candidates = npcs.filter(n => n.isPresent && n.id !== 'mubaba' && !questState.active[n.name]);
    // ponytail: one delivery at a time — a generic Parcel item can't tell two apart
    let hasDelivery = Object.values(questState.active).some(q => q.type === 'deliver');
    for (let i = 0; i < QUESTS_PER_DAY && candidates.length > 0; i++) {
        const giver = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
        const targets = npcs.filter(n => n.isPresent && n !== giver && n.id !== 'mubaba');
        if (!hasDelivery && targets.length > 0 && Math.random() < 0.35) {
            const to = targets[Math.floor(Math.random() * targets.length)];
            questState.active[giver.name] = { type: 'deliver', item: 'parcel', qty: 1, to: to.name, accepted: false };
            hasDelivery = true;
        } else {
            const pick = QUEST_FETCH_ITEMS[Math.floor(Math.random() * QUEST_FETCH_ITEMS.length)];
            questState.active[giver.name] = { type: 'fetch', item: pick.id, qty: pick.qty, accepted: false };
        }
    }
}
if (typeof registerNewDay === 'function') registerNewDay(assignDailyQuests);

// --- Quest text ---
function questItemLabel(q) {
    const nm = ITEMS[q.item] ? ITEMS[q.item].name : q.item;
    return q.qty > 1 ? q.qty + ' ' + nm + 's' : (/^[aeiou]/i.test(nm) ? 'an ' : 'a ') + nm;
}

function questAskText(npc, q) {
    if (q.type === 'deliver') {
        return "Actually, yes! I owe " + q.to + " a little something and I keep not walking it over. " +
            "Could you deliver this parcel to them for me? I'd be so grateful.";
    }
    const label = questItemLabel(q);
    const asks = [
        "Now that you mention it... I've been needing " + label + " and haven't had any luck. Could you bring me that?",
        "You know what? Yes. I need " + label + " for a little project of mine. Think you could round that up?",
        "Hmm... if you're offering — " + label + " would make my whole week. No rush, whenever you find it!",
        "Oh! Perfect timing. I've been after " + label + " forever. Bring me that and I'll owe you one!"
    ];
    return asks[Math.floor(Math.random() * asks.length)];
}

function questThanksText(npc) {
    const lines = [
        "You actually got it! You're the best neighbor an islander could ask for. Here — take this, I insist!",
        "Ohh, wonderful! This is exactly what I needed. Please, take a little something for the trouble!",
        "Look at that! Delivered right to me. You've made my whole day — this is for you!"
    ];
    return lines[Math.floor(Math.random() * lines.length)];
}

// --- Accept / complete ---
function acceptQuest(npc, tree) {
    const q = questState.active[npc.name];
    if (!q) return;
    if (q.type === 'deliver') {
        if (!inventory.addItem('parcel', 1)) {
            if (tree && tree.quest_accepted) {
                tree.quest_accepted.text = "Oh... your pockets look completely full. Come back for the parcel when you can carry it!";
            }
            return; // stays unaccepted; offer remains
        }
        notify('Received a Parcel for ' + q.to + '.');
    }
    q.accepted = true;
}

function completeQuest(giverName) {
    delete questState.active[giverName];
    questState.completed[giverName] = (questState.completed[giverName] || 0) + 1;
    const giver = npcs.find(n => n.name === giverName);
    if (giver) giver.friendship = Math.min(300, giver.friendship + QUEST_FRIENDSHIP);
    const rewardId = QUEST_REWARD_ITEMS[Math.floor(Math.random() * QUEST_REWARD_ITEMS.length)];
    if (inventory.addItem(rewardId, 1)) {
        notify(giverName + ' gave you a ' + ITEMS[rewardId].name + '! (+' + QUEST_FRIENDSHIP + ' friendship)');
    } else {
        notify('+' + QUEST_FRIENDSHIP + ' friendship with ' + giverName + ' (pockets too full for the gift!)');
    }
    // The 10th completed quest makes their cardboard cutout quietly appear.
    if (questState.completed[giverName] >= CUTOUT_QUEST_GOAL && !questState.cutoutGiven[giverName]) {
        if (inventory.addItem(cutoutItemId(giverName), 1)) {
            questState.cutoutGiven[giverName] = true;
            notify('Something new appeared in your inventory...');
        }
        // pockets full: retries on the next completed quest (goal check is >=)
    }
}

// --- Dialogue injection (called from openDialogue after the tree is chosen) ---
function injectQuestDialogue(npc, tree) {
    if (!tree || !tree.start || !tree.start.choices) return;
    const name = npc.name;
    const q = questState.active[name];

    // A parcel addressed to this neighbor, from any giver.
    const incoming = Object.keys(questState.active).map(g => [g, questState.active[g]])
        .find(([g, quest]) => quest.type === 'deliver' && quest.accepted && quest.to === name);
    if (incoming && inventory.hasItem('parcel', 1)) {
        const giverName = incoming[0];
        tree.quest_delivered = {
            text: "For ME? From " + giverName + "? Well, would you look at that... I didn't think they remembered! " +
                "Thank you for carrying it all this way. Tell them we're square — and take this for your trouble!",
            choices: [{ text: "Happy to help. Goodbye!", next: null, friendshipDelta: 1 }]
        };
        tree.start.choices.unshift({
            text: "I have a delivery for you, from " + giverName + ".",
            next: 'quest_delivered', friendshipDelta: 1,
            action: () => {
                // Guard: stale tree replay (advanced-menu Talk) must not double-pay.
                if (!questState.active[giverName] || !inventory.hasItem('parcel', 1)) return;
                inventory.removeItem('parcel', 1);
                npc.friendship = Math.min(300, npc.friendship + 6);
                completeQuest(giverName);
            }
        });
    }

    if (!q) return;
    if (!q.accepted) {
        // Discoverable offer: an extra choice on the opening node.
        tree.quest_offer = {
            text: questAskText(npc, q),
            choices: [
                { text: "You can count on me!", next: 'quest_accepted', friendshipDelta: 1, action: () => acceptQuest(npc, tree) },
                { text: "Maybe another time.", next: null, friendshipDelta: 0 }
            ]
        };
        tree.quest_accepted = {
            text: q.type === 'deliver'
                ? "Here it is — handle it like a carton of eggs, please. " + q.to + " will know what it is. Thank you!"
                : "Wonderful! I knew I liked you. Come find me when you have it — no rush at all.",
            choices: [{ text: "See you soon!", next: null, friendshipDelta: 0 }]
        };
        tree.start.choices.unshift({ text: "Anything I can help you with?", next: 'quest_offer', friendshipDelta: 0 });
    } else if (q.type === 'fetch') {
        if (inventory.hasItem(q.item, q.qty)) {
            tree.quest_done = {
                text: questThanksText(npc),
                choices: [{ text: "Anytime, neighbor!", next: null, friendshipDelta: 1 }]
            };
            tree.start.choices.unshift({
                text: "I brought " + questItemLabel(q) + " for you!",
                next: 'quest_done', friendshipDelta: 1,
                action: () => {
                    // Guard: stale tree replay must not double-pay.
                    if (!questState.active[name] || !inventory.hasItem(q.item, q.qty)) return;
                    inventory.removeItem(q.item, q.qty);
                    completeQuest(name);
                }
            });
        } else {
            tree.quest_wip = {
                text: "No rush at all! " + questItemLabel(q).replace(/^(a|an) /i, 'A good ') + " is worth waiting for. I'll be right here.",
                choices: [{ text: "I'm on it!", next: null, friendshipDelta: 0 }]
            };
            tree.start.choices.unshift({ text: "Still working on your " + (ITEMS[q.item] ? ITEMS[q.item].name : q.item) + "!", next: 'quest_wip', friendshipDelta: 0 });
        }
    }
    // accepted delivery: nothing extra to say to the giver until it's delivered
}

// --- Cardboard cutouts: place / pick up / draw / proximity ---
function tryPlaceCutout(tx, ty, npcName, itemId) {
    if (typeof currentMapId !== 'undefined' && currentMapId !== 'island') {
        notify('The cutout belongs on the island.');
        return true;
    }
    if (tx < 1 || ty < 1 || tx >= CONFIG.WORLD_WIDTH - 1 || ty >= CONFIG.WORLD_HEIGHT - 1) return false;
    if (isSolidTile(tx, ty) || buildingAt(tx, ty) || (typeof npcAt === 'function' && npcAt(tx, ty))) {
        notify('No room for the cutout there.');
        return false;
    }
    if (placedCutouts.some(c => c.x === tx && c.y === ty)) return false; // falls through to pickup
    placedCutouts.push({ x: tx, y: ty, name: npcName });
    inventory.removeItem(itemId, 1);
    notify('Placed the ' + npcName + ' cutout.');
    return true;
}

// Click a cutout (body or head tile) up close with a free hand to reclaim it.
function tryPickupCutoutAt(tx, ty) {
    if (typeof currentMapId !== 'undefined' && currentMapId !== 'island') return false;
    const i = placedCutouts.findIndex(c => c.x === tx && (c.y === ty || c.y - 1 === ty));
    if (i < 0) return false;
    const c = placedCutouts[i];
    if (Math.max(Math.abs(c.x - player.x), Math.abs(c.y - player.y)) > 2) return false; // too far away
    if (!inventory.addItem(cutoutItemId(c.name), 1)) { notify('Pockets full!'); return true; }
    placedCutouts.splice(i, 1);
    notify('Picked up the ' + c.name + ' cutout.');
    return true;
}

function drawCutouts() {
    if (typeof currentMapId !== 'undefined' && currentMapId !== 'island') return;
    const TS = CONFIG.TILE_SIZE;
    for (const c of placedCutouts) {
        const sx = c.x * TS - cameraX;
        const sy = c.y * TS - cameraY;
        if (sx < -TS * 2 || sy < -TS * 2 || sx > width + TS * 2 || sy > height + TS * 2) continue;
        // Cardboard stand peeking out at the base.
        noStroke();
        fill(160, 124, 82);
        rect(sx - 2, sy + TS - 4, TS + 4, 4);
        const spr = SPRITES['sprites.' + c.name.toLowerCase()];
        if (!drawCharacterSprite(spr, sx, sy - TS, 'down', false)) {
            const def = NPC_DEFS.find(d => d.name === c.name);
            fill(def ? def.color : '#C9A86B');
            rect(sx, sy - TS, TS, TS * 2);
        }
    }
}

// True if this neighbor's own cutout stands within `radius` tiles of them.
function ownCutoutNear(npc, radius = 3) {
    return placedCutouts.some(c => c.name === npc.name &&
        Math.abs(c.x - npc.gridX) <= radius && Math.abs(c.y - npc.gridY) <= radius);
}

// --- Persistence ---
function questSerialize() {
    return {
        active: questState.active,
        completed: questState.completed,
        cutoutGiven: questState.cutoutGiven,
        placedCutouts: placedCutouts
    };
}

function questLoad(data) {
    questState = { active: {}, completed: {}, cutoutGiven: {} };
    placedCutouts = [];
    if (!data) return;
    Object.assign(questState.active, data.active || {});
    Object.assign(questState.completed, data.completed || {});
    Object.assign(questState.cutoutGiven, data.cutoutGiven || {});
    placedCutouts = (data.placedCutouts || []).slice();
}

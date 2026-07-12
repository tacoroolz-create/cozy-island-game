// ===== RECYCLE BIN (IOU economy, phase 1) =====
// The underground Recycle Bin: a counter where the player sells spare
// materials, gifts, furniture, and treasure for IOUs — the island's currency
// (see underWorldBldgs.rtf). IOUs are ordinary inventory items, so the
// balance lives in your pockets like everything else. Spending them comes
// with the later shops (Gettin' Place, Stimmy Tim's, Black Goddess wagers).

// IOUs paid per item. Category gives the default; overrides price the
// notable stuff. Tools and quest items don't sell (value 0).
const SELL_CATEGORY_VALUES = { material: 1, gift: 2, block: 2, treasure: 3 };
const SELL_OVERRIDES = {
    gold_coin: 10, old_radio: 8, iron_ingot: 6, crystal: 5, metal_rod: 4,
    turtle_egg: 4, glass_bottle: 3, seashell: 3, berry_jam: 3,
    fruit_salad: 3, grilled_banana: 3, protein_shake: 3,
    coffee: 1, donut: 1  // no flipping Stimmy Tim's stock for profit
};

function sellValue(itemId) {
    // Currency, quest goods, and keepsakes stay in the pockets.
    if (itemId === 'iou' || itemId === 'parcel' || itemId === 'stardew') return 0;
    if (itemId.startsWith('cutout_')) return 0;
    if (SELL_OVERRIDES[itemId]) return SELL_OVERRIDES[itemId];
    const item = ITEMS[itemId];
    return (item && SELL_CATEGORY_VALUES[item.category]) || 0;
}

// How many IOUs fit in the inventory once `qty` of `itemId` has been sold
// (sold stacks free their slots). Mirrors addItem's slot search: existing IOU
// stacks top up, then empty treasure-section and hotbar slots open new stacks.
function iouRoomAfterRemoving(itemId, qty) {
    const iouDef = ITEMS.iou;
    const catStart = inventory.getCategoryIndex('iou');
    let toRemove = qty;
    let room = 0;
    for (let i = 0; i < inventory.slots.length; i++) {
        let s = inventory.slots[i];
        let emptied = !s;
        if (s && s.id === itemId && toRemove > 0) {
            const take = Math.min(toRemove, s.count);
            toRemove -= take;
            if (take === s.count) emptied = true;
        }
        if (s && s.id === 'iou') room += iouDef.maxStack - s.count;
        const inIouSection = (i < INV_HOTBAR_SIZE) ||
            (i >= catStart && i < catStart + INV_SLOTS_PER_CAT);
        if (emptied && inIouSection) room += iouDef.maxStack;
    }
    return room;
}

function sellItem(itemId, qty) {
    const payout = sellValue(itemId) * qty;
    if (payout > iouRoomAfterRemoving(itemId, qty)) {
        notify('No room for ' + payout + ' IOUs — make some pocket space first!');
        openRecycleCounter();
        return;
    }
    inventory.removeItem(itemId, qty);
    inventory.addItem('iou', payout);
    audioManager.playSFX('craft');
    notify('Sold ' + qty + 'x ' + ITEMS[itemId].name + ' for ' + payout +
           ' IOU' + (payout > 1 ? 's' : '') + '.');
    openRecycleCounter();
}

function openSellSubmenu(itemId) {
    const v = sellValue(itemId);
    const count = inventory.countItem(itemId);
    const nm = ITEMS[itemId].name;
    const opts = [{ text: 'Sell 1 (+' + v + ' IOU' + (v > 1 ? 's' : '') + ')',
                    action: () => sellItem(itemId, 1) }];
    if (count > 1) {
        opts.push({ text: 'Sell all ' + count + ' (+' + (v * count) + ' IOUs)',
                    action: () => sellItem(itemId, count) });
    }
    opts.push({ text: 'Back', action: () => openRecycleCounter() });
    openMagicMenu(nm + ' x' + count, opts);
}

// ===== BOB (Recycle Bin clerk — see NPCConvoUnderworld1.txt) =====
const BOB_NPC = { name: 'Bob', color: '#8D6E63' };
const BOB_TREE = {
    start: { text: "Hey. Name's Bob. Got stuff? We take stuff. Trade it in. Get somethin' else. No fuss. No song. No dance. Just... stuff goes here.",
        choices: [
            { text: "I have some things to recycle.", next: 'stuff' },
            { text: "What kind of stuff do you take?", next: 'kind' },
            { text: "You don't say much, do you?", next: 'quiet' }
        ] },
    stuff: { text: "Good. Pile it up. I don't need a story. Don't need a receipt. Just weigh it, swap it, done. You want store credit or you want somethin' shiny today?",
        choices: [
            { text: "Store credit sounds fine.", next: 'credit' },
            { text: "Something shiny today.", next: 'shiny' },
            { text: "How does the trade value work?", next: 'value' }
        ] },
    kind: { text: "Most things. Old tools. Extra weeds. Rocks you picked up and forgot why. Furniture that don't fit your soul no more. If it's clutter, it's currency. That's the Bin way.",
        choices: [
            { text: "I like that. Clutter is currency.", next: 'clutter' },
            { text: "What don't you take?", next: 'wontTake' },
            { text: "Do people bring weird things?", next: 'weird' }
        ] },
    quiet: { text: "Not much. Words wear me out. Folks talk circles around a simple thing. I just like the clink of trade. Clink's honest. Words got too many corners.",
        choices: [
            { text: "I'll keep it short then.", next: 'short' },
            { text: "Clink is honest. I get that.", next: 'clinkHonest' },
            { text: "You ever get lonely back here?", next: 'lonely' }
        ] },
    credit: { text: "Store credit. Smart. Builds up. Somethin' good comes through, you'll be first in line. I write it down. I don't lose paper.",
        choices: [{ text: "Alright, let's trade.", action: () => openRecycleCounter() }] },
    shiny: { text: "Shiny today. Alright. Let's see what we got behind the counter. Might be a trinket, might be a tool. You pick what catches your eye. I'll do the math.",
        choices: [{ text: "Let's see it.", action: () => openRecycleCounter() }] },
    value: { text: "Trade value? Simple. More useful, more credit. Prettier, maybe less. Ugly but handy? Gold. Pretty but useless? Still pretty. We ain't heartless.",
        choices: [{ text: "Fair enough.", action: () => openRecycleCounter() }] },
    clutter: { text: "Clutter is currency. You got it. Most folks don't. They hang onto broken things like they're gonna fix 'em someday. Bin takes 'em and gives 'em a second job.",
        choices: [{ text: "Let's trade, then.", action: () => openRecycleCounter() }] },
    wontTake: { text: "Don't take? Feelings. Regrets. Half-eaten sandwiches. We tried once. Mess. Also live crabs. They got their own system.",
        choices: [{ text: "Noted. Let's trade.", action: () => openRecycleCounter() }] },
    weird: { text: "Weird? All day. Somebody brought in a lamp that only glowed when you apologized to it. Worked fine. Gave 'em three credits and a napkin.",
        choices: [{ text: "Sounds about right. Let's trade.", action: () => openRecycleCounter() }] },
    short: { text: "Short's good. We can do the whole deal in nods if you want. Nod once for trade, twice for credit, shake for 'let me think on it.'",
        choices: [{ text: "Let's trade.", action: () => openRecycleCounter() }] },
    clinkHonest: { text: "Clink's honest. You drop a can, it don't pretend to be a cup. It just is what it is. That's why I like this place. No pretending. No show. Just trade.",
        choices: [{ text: "Just trade, then.", action: () => openRecycleCounter() }] },
    lonely: { text: "Lonely? Nah. Got the bins. Got the bell on the door. Got the hum of the compactor. Quiet company. Better than loud company most days.",
        choices: [{ text: "Fair enough. Let's trade.", action: () => openRecycleCounter() }] }
};
BOB_NPC._dialogueTree = BOB_TREE;

let bobGreeted = false; // ponytail: session-only; skip the full chat after the first visit
const BOB_LINES = ["Back again. Pile it up.", "Stuff's stuff. Let's trade.", "Bin's open. What ya got.", "Clink's honest. Let's see it."];

// Entry point for the Recycle Bin door — Bob's chat the first visit, a quick
// line and straight to the counter after that (see tryEnterBuilding).
function openBobDialogue() {
    if (bobGreeted) {
        notify('Bob: "' + BOB_LINES[Math.floor(Math.random() * BOB_LINES.length)] + '"', 2500);
        openRecycleCounter();
        return;
    }
    bobGreeted = true;
    dialogueState.active = true;
    dialogueState.npc = BOB_NPC;
    dialogueState.currentNode = 'start';
    dialogueState.textRevealed = 0;
    dialogueState.selectedChoice = 0;
    dialogueState.choicesVisible = false;
    dialogueState.advancedMenu = false;
    gameState = STATE.DIALOGUE;
}

// The counter itself — opened via Bob's dialogue, or directly on repeat visits.
function openRecycleCounter() {
    const opts = [];
    const seen = new Set();
    for (const slot of inventory.slots) {
        if (!slot || seen.has(slot.id)) continue;
        seen.add(slot.id);
        const v = sellValue(slot.id);
        if (v <= 0) continue;
        const id = slot.id;
        opts.push({
            text: ITEMS[id].name + ' x' + inventory.countItem(id) + ' — ' +
                  v + ' IOU' + (v > 1 ? 's' : '') + ' each',
            action: () => openSellSubmenu(id)
        });
    }
    if (opts.length === 0) {
        opts.push({ text: "(Nothing in your pockets they'll pay for)", action: () => {} });
    }
    opts.push({ text: 'Done', action: () => closeDialogue() });
    openMagicMenu('Recycle Bin — IOUs in pocket: ' + inventory.countItem('iou'), opts);
}

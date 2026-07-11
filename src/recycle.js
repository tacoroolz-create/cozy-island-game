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
    fruit_salad: 3, grilled_banana: 3, protein_shake: 3
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

// The counter itself — opened by the Recycle Bin door (see tryEnterBuilding).
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

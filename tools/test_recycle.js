// Self-check for the IOU economy (run: node tools/test_recycle.js).
// Stubs just enough of the game's globals to exercise the Recycle Bin's
// sellValue() / iouRoomAfterRemoving() and Stimmy Tim's buyCafeItem() —
// the pieces where money changes hands.
const fs = require('fs');
const path = require('path');

// --- Minimal game globals ---
global.INV_HOTBAR_SIZE = 2;
global.INV_SLOTS_PER_CAT = 2;
global.INV_CATEGORIES = ['material', 'gift', 'block', 'treasure'];
global.ITEMS = {
    log:      { name: 'Log',      category: 'material', maxStack: 99 },
    gold_coin:{ name: 'Gold Coin',category: 'treasure', maxStack: 99 },
    iou:      { name: 'IOU',      category: 'treasure', maxStack: 99 },
    parcel:   { name: 'Parcel',   category: 'treasure', maxStack: 1 },
    axe:      { name: 'Axe',      category: 'tool',     maxStack: 1 }
};
// Slot layout: [0,1]=hotbar, then 2 per category: material 2-3, gift 4-5,
// block 6-7, treasure 8-9.
global.inventory = {
    slots: new Array(10).fill(null),
    getCategoryIndex(id) {
        return INV_HOTBAR_SIZE + INV_CATEGORIES.indexOf(ITEMS[id].category) * INV_SLOTS_PER_CAT;
    },
    countItem(id) {
        return this.slots.reduce((n, s) => n + (s && s.id === id ? s.count : 0), 0);
    }
};
global.notify = () => {};
global.audioManager = { playSFX: () => {} };

eval(fs.readFileSync(path.join(__dirname, '../src/recycle.js'), 'utf8'));

const assert = require('assert');

// sellValue: overrides, category defaults, exclusions.
assert.strictEqual(sellValue('gold_coin'), 10, 'override price');
assert.strictEqual(sellValue('log'), 1, 'category default');
assert.strictEqual(sellValue('iou'), 0, 'currency not sellable');
assert.strictEqual(sellValue('parcel'), 0, 'quest item not sellable');
assert.strictEqual(sellValue('axe'), 0, 'tools not sellable');
assert.strictEqual(sellValue('cutout_mimi'), 0, 'cutouts not sellable');

// iouRoomAfterRemoving: full inventory, selling the whole log stack frees a
// material slot — but material slots can't hold IOUs, so only the partial
// IOU stack's headroom counts.
inventory.slots = [
    { id: 'gold_coin', count: 99 }, { id: 'gold_coin', count: 99 }, // hotbar full
    { id: 'log', count: 30 },  { id: 'log', count: 99 },            // material
    { id: 'gold_coin', count: 99 }, { id: 'gold_coin', count: 99 }, // gift (spillover)
    { id: 'gold_coin', count: 99 }, { id: 'gold_coin', count: 99 }, // block
    { id: 'iou', count: 90 },  { id: 'gold_coin', count: 99 }       // treasure
];
assert.strictEqual(iouRoomAfterRemoving('log', 30), 9, 'freed material slot is no IOU home');

// Selling a treasure stack frees a treasure slot: 9 headroom + 99 fresh slot.
assert.strictEqual(iouRoomAfterRemoving('gold_coin', 99), 9 + 99, 'freed treasure slot holds IOUs');

// Partial removal frees nothing extra.
assert.strictEqual(iouRoomAfterRemoving('gold_coin', 50), 9, 'partial stack stays occupied');

// Empty hotbar slot counts as IOU room.
inventory.slots[0] = null;
assert.strictEqual(iouRoomAfterRemoving('log', 1), 9 + 99, 'empty hotbar slot holds IOUs');

// --- Stimmy Tim's purchase path ---
// Simple add/remove for the cafe test: one virtual stack per item id.
const bag = {};
inventory.countItem = (id) => bag[id] || 0;
inventory.addItem = (id, n = 1) => {
    if (bag.__full) return false;
    bag[id] = (bag[id] || 0) + n;
    return true;
};
inventory.removeItem = (id, n = 1) => { bag[id] = (bag[id] || 0) - n; };
global.openMagicMenu = () => {};
global.closeDialogue = () => {};
global.INTERIOR_WALL_HEIGHT = 2;
global.player = { x: 0, y: 0, facing: 'up' };
global.insideBuilding = null;

eval(fs.readFileSync(path.join(__dirname, '../src/cafe.js'), 'utf8'));

bag.iou = 2;
buyCafeItem('coffee', 3);   // can't afford: nothing charged, nothing gained
assert.strictEqual(bag.iou, 2, 'no charge when broke');
assert.strictEqual(bag.coffee || 0, 0, 'no coffee when broke');

bag.iou = 5;
buyCafeItem('coffee', 3);   // paid and served
assert.strictEqual(bag.iou, 2, 'charged 3 IOUs');
assert.strictEqual(bag.coffee, 1, 'got the coffee');

bag.__full = true;
buyCafeItem('donut', 2);    // pockets full: not charged
assert.strictEqual(bag.iou, 2, 'no charge when pockets are full');

// Cafe stock sells back below cost — no arbitrage loop.
assert.strictEqual(sellValue('coffee'), 1, 'coffee sell-back below cost');
assert.strictEqual(sellValue('donut'), 1, 'donut sell-back below cost');

console.log('economy self-check OK');

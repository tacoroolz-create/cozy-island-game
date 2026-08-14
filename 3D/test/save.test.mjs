
// Stub localStorage for Node tests
globalThis.localStorage = {
    store: new Map(),
    getItem(k) { return this.store.get(k) ?? null; },
    setItem(k, v) { this.store.set(k, String(v)); },
    removeItem(k) { this.store.delete(k); },
};

import assert from 'node:assert/strict';
import { SAVE_VERSION, saveGame, loadGame } from '../src/save.js';
import * as Farming from '../src/farming.js';
import { Inventory } from '../src/items.js';

Farming.reset();
const inv = new Inventory();
inv.add('turnip', 2);
inv.earn(50);
Farming.till(2, 3);
Farming.plant(2, 3, 'turnip_seed');
Farming.water(2, 3);

const player = { inventory: inv, pos: { x: 1, y: 0, z: 2 } };
const gameTime = {
    day: 5,
    minutes: 360,
    serialize: () => ({ day: 5, season: 'Sweet', holiday: null, minutes: 360 }),
    deserialize: () => {},
};
const hog = { friendship: 7, dailyGift: true };
const neighbors = [
    { name: 'Chester', serialize: () => ({ friendship: 42, talkedToday: true, giftedToday: false, indoors: false }), deserialize: (d) => { Object.assign(this, d); } },
];

let saveErr = null;
try { saveGame(player, gameTime, hog, neighbors); } catch (e) { saveErr = e; console.error('save error', e); }
const raw = localStorage.getItem('cozy-island-3d-save');
assert.ok(raw, `save was written (err=${saveErr})`);
const data = JSON.parse(raw);
assert.equal(data.version, SAVE_VERSION, 'save version matches');
assert.equal(data.inventory.items.turnip, 2, 'inventory persisted');
assert.equal(data.inventory.wallet, 150, 'wallet persisted');
assert.ok(data.farm, 'farm persisted');
assert.equal(data.neighbors.Chester.friendship, 42, 'neighbor friendship persisted');
assert.equal(data.hog.dailyGift, true, 'hog dailyGift persisted');

// Load into fresh objects
const inv2 = new Inventory();
const player2 = { inventory: inv2, pos: { x: 0, y: 0, z: 0 }, placeAt(x, z) { this.pos.x = x; this.pos.z = z; } };
const gameTime2 = {
    _state: {},
    serialize() { return this._state; },
    deserialize(d) { this._state = d; this.day = d?.day; this.minutes = d?.minutes; },
    getSeasonForDay() { return 'Sweet'; },
    getHolidayForDay() { return null; },
};
const hog2 = { friendship: 0, dailyGift: false };
const n2 = { name: 'Chester', friendship: 0, talkedToday: false, giftedToday: false, indoors: false,
    deserialize(d) { if (d) Object.assign(this, d); }
};
let loadErr = null;
try { loadGame(player2, gameTime2, hog2, [n2]); } catch (e) { loadErr = e; console.error('load error', e); }
assert.equal(inv2.count('turnip'), 2, `loaded inventory turnip count (err=${loadErr})`);
assert.equal(inv2.wallet, 150, 'loaded wallet');
assert.equal(n2.friendship, 42, 'loaded neighbor friendship');
assert.equal(gameTime2.day, 5, 'loaded day');

console.log('save.test.mjs — save/load roundtrip passed ✅');

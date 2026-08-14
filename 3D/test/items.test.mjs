
import assert from 'node:assert/strict';
import { Inventory, ITEMS, itemValue } from '../src/items.js';

const inv = new Inventory();
assert.equal(inv.wallet, 100, 'starting wallet');
assert.equal(inv.activeTool(), 'axe', 'starts with axe');

inv.add('turnip', 3);
assert.equal(inv.count('turnip'), 3);
inv.remove('turnip', 1);
assert.equal(inv.count('turnip'), 2);

inv.earn(50);
assert.equal(inv.wallet, 150);
assert.ok(inv.spend(30));
assert.equal(inv.wallet, 120);
assert.ok(!inv.spend(500));

inv.cycleActive(1);
assert.equal(inv.activeTool(), 'hoe');
inv.cycleActive(1);
assert.equal(inv.activeTool(), 'watering_can');
inv.add('corn_seed', 2);
const beforeCycle = inv.activeTool();
assert.equal(beforeCycle, 'watering_can', 'seeds appended without changing index');
inv.cycleActive(1);
const seedActive = inv.activeTool();
assert.ok(['turnip_seed','tomato_seed','corn_seed'].includes(seedActive), `seed active: ${seedActive}`);
inv.cycleActive(1);
assert.ok(['turnip_seed','tomato_seed','corn_seed'].includes(inv.activeTool()), 'another seed active');

assert.equal(itemValue('turnip'), 60);
assert.equal(ITEMS['watering_can'].tool, true);

console.log('items.test.mjs — all checks passed ✅');

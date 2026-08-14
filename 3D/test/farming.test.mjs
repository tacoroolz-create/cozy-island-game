// Cozy Island 3D — tests for the farming loop and tools
import assert from 'node:assert/strict';
import {
    canTillHere, canPlantHere, canWaterHere, canHarvestHere,
    till, plant, water, harvest, onNewDay, serialize, deserialize, reset,
    worldToGrid, cropForSeed, seasonCrop, isSeed, allSoil, allPlots,
} from '../src/farming.js';

// Stub world helper: only grass, no paths, no solids.
function makeWorld() {
    return {
        zoneAt(x, z) { return 'grass'; },
        distToPaths(x, z) { return 99; },
        solidAt(x, z, r) { return false; },
    };
}

const w = makeWorld();

// --- seeds ---
assert.equal(cropForSeed('turnip_seed'), 'turnip');
assert.equal(seasonCrop('Sweet'), 'turnip');
assert.ok(isSeed('tomato_seed'));
assert.ok(!isSeed('turnip'));

// --- tilling ---
reset();
assert.ok(canTillHere(w, 2, 3));
assert.ok(till(2, 3));
assert.ok(!canTillHere(w, 2, 3), 'cannot till twice');
assert.deepEqual(allSoil(), [[2, 3]]);

// --- planting ---
assert.ok(canPlantHere(2, 3));
assert.equal(plant(2, 3, 'turnip_seed'), 'turnip');
assert.ok(!canPlantHere(2, 3), 'plot occupied');

// --- watering / growth ---
assert.ok(canWaterHere(2, 3));
assert.ok(water(2, 3));
// Second water should be a no-op if same day
water(2, 3);

// One day of water advances stage once.

onNewDay();
const plot = allPlots()[0];
assert.equal(plot.stage, 1, 'crop grew one stage after one watered day');

// Without water, stage stalls but does not die.
onNewDay();
const plot2 = allPlots()[0];
assert.equal(plot2.stage, 1, 'crop stalled without water');


// Two more watered days to maturity
water(2, 3);
onNewDay();
water(2, 3);
onNewDay();
water(2, 3);
onNewDay();
assert.ok(canHarvestHere(2, 3), 'crop mature');
assert.equal(allPlots()[0].stage, 2, 'crop at final stage');
assert.equal(harvest(2, 3), 'turnip');
assert.ok(!canHarvestHere(2, 3), 'plot empty after harvest');

// --- serialization round-trip ---
reset();
till(1, 1);
plant(1, 1, 'tomato_seed');
water(1, 1);
const data = serialize();
deserialize(data);
assert.equal(allSoil().length, 1);
assert.equal(allPlots().length, 1);
assert.equal(allPlots()[0].cropId, 'tomato');
assert.ok(canWaterHere(1, 1)); // watered set clears on load; that's fine

console.log('farming.test.mjs — all checks passed ✅');

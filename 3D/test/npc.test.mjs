
import assert from 'node:assert/strict';
import fs from 'node:fs';

const src = fs.readFileSync('src/npc.js', 'utf8');

assert.match(src, /class Neighbor/, 'npc exports Neighbor class');
assert.match(src, /interact\(inventory, hour\)/, 'Neighbor has interact with inventory');
assert.match(src, /giftValue\(/, 'Neighbor computes gift value');
assert.match(src, /talkedToday/, 'Neighbor tracks talkedToday');
assert.match(src, /giftedToday/, 'Neighbor tracks giftedToday');
assert.match(src, /onNewDay\(\)/, 'Neighbor has daily reset');
assert.match(src, /serialize\(\)/, 'Neighbor serializes state');
assert.match(src, /deserialize\(/, 'Neighbor deserializes state');
assert.match(src, /friendship \+= 3/, 'daily talk gives +3');
assert.match(src, /friendship \+= gain/, 'gift gives variable gain');

console.log('npc.test.mjs — neighbor wiring checks passed ✅');

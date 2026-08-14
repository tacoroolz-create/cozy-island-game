
import assert from 'node:assert/strict';
import fs from 'node:fs';

const base = decodeURIComponent(new URL('../src/', import.meta.url).pathname);
const player = fs.readFileSync(base + 'player.js', 'utf8');
const main = fs.readFileSync(base + 'main.js', 'utf8');
const world = fs.readFileSync(base + 'world.js', 'utf8');

// Player.interact dispatches tools and farm harvest.
assert.match(player, /useTool\(\)/, 'player.interact calls useTool');
assert.match(player, /Farming\.harvest\(/, 'player.interact calls Farming.harvest');
assert.match(player, /shipHeldItem\(/, 'player.interact calls shipHeldItem');
assert.match(player, /onEnterHouse/, 'player.interact handles house entry');

// World has farming methods.
assert.match(world, /tillSoil\(/, 'world has tillSoil');
assert.match(world, /plantSeed\(/, 'world has plantSeed');
assert.match(world, /waterCrop\(/, 'world has waterCrop');
assert.match(world, /chopTree\(/, 'world has chopTree');
assert.match(world, /shipHeldItem\(/, 'world has shipHeldItem');

// Main wires tool cycling and interior.
assert.match(main, /consumeToolCycle/, 'main consumes tool cycle');
assert.match(main, /interior\.interact\(/, 'main dispatches interior interactions');
assert.match(main, /player\.onEnterHouse/, 'main sets house entry handler');

console.log('player.test.mjs — integration wiring checks passed ✅');

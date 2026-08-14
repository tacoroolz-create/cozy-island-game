
import assert from 'node:assert/strict';
import fs from 'node:fs';

const src = fs.readFileSync('src/interior.js', 'utf8');

assert.match(src, /class Interior/, 'interior exports Interior class');
assert.match(src, /enter\(/, 'interior has enter method');
assert.match(src, /exit\(\)/, 'interior has exit method');
assert.match(src, /update\(dt/, 'interior has update movement method');
assert.match(src, /updatePrompt\(/, 'interior has updatePrompt');
assert.match(src, /interact\(/, 'interior has interact');
assert.match(src, /kind: 'bed'/, 'interior has bed object');
assert.match(src, /kind: 'door'/, 'interior has door object');
assert.match(src, /gameTime\.dispatch\('newDay'\)/, 'sleep dispatches newDay event');
assert.match(src, /ROOM_BOUNDS/, 'interior constrains movement to room');

console.log('interior.test.mjs — interior wiring checks passed ✅');

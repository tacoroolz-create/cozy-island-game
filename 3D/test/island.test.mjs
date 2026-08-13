// Cozy Island 3D — the one check. Run: node 3D/test/island.test.mjs
//
// Covers the two things that actually broke the first prototype: the
// camera-relative movement basis (W walked toward the camera) and the island
// layout (spawning inside scenery, landmarks in the sea).
import assert from 'node:assert/strict';
import {
    WATER_LEVEL, LANDMARKS, DOCK, NEIGHBORS, PATHS,
    heightAt, groundHeightAt, onDock, distToPaths, moveVector, mulberry32, zoneAt,
} from '../src/island.js';

const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

// --- movement basis -------------------------------------------------------
// yaw 0: camera sits at +z looking toward -z, so W must go -z and D must go +x.
{
    const w = moveVector(0, 1, 0);
    assert.ok(near(w.x, 0) && near(w.z, -1), `W at yaw 0 went ${JSON.stringify(w)}`);
    const d = moveVector(0, 0, 1);
    assert.ok(near(d.x, 1) && near(d.z, 0), `D at yaw 0 went ${JSON.stringify(d)}`);
    const s = moveVector(0, -1, 0);
    assert.ok(near(s.z, 1), 'S must be the opposite of W');
}
// yaw PI/2: camera at +x looking toward -x, so W must go -x and D must go -z.
{
    const w = moveVector(Math.PI / 2, 1, 0);
    assert.ok(near(w.x, -1, 1e-9) && near(w.z, 0, 1e-9), `W at yaw PI/2 went ${JSON.stringify(w)}`);
    const d = moveVector(Math.PI / 2, 0, 1);
    assert.ok(near(d.x, 0, 1e-9) && near(d.z, -1, 1e-9), `D at yaw PI/2 went ${JSON.stringify(d)}`);
}
// Diagonals stay unit length, so you can't run faster cornerwise.
for (const yaw of [0, 0.7, -2.3, Math.PI]) {
    const v = moveVector(yaw, 1, 1);
    assert.ok(near(Math.hypot(v.x, v.z), 1, 1e-9), 'diagonal must be normalised');
}
assert.equal(moveVector(0, 0, 0), null, 'no keys = no movement');

// --- island shape ---------------------------------------------------------
assert.equal(zoneAt(0, 0), 'grass', 'the middle of the island must be grass');
assert.equal(zoneAt(46, 0), 'sand', 'the coast must be sand');
assert.ok(heightAt(90, 0) < WATER_LEVEL, 'far out must be open sea');
assert.ok(heightAt(0, 90) < WATER_LEVEL, 'far out must be open sea');

// Every landmark and every home must be on dry, walkable land.
for (const [name, p] of Object.entries(LANDMARKS)) {
    if (name === 'pond') continue; // the pond is deliberately underwater
    assert.ok(groundHeightAt(p.x, p.z) > WATER_LEVEL + 0.15,
        `landmark ${name} is in the sea (y=${groundHeightAt(p.x, p.z).toFixed(2)})`);
}
assert.ok(heightAt(LANDMARKS.pond.x, LANDMARKS.pond.z) < WATER_LEVEL,
    'the pond basin must hold water');

for (const n of NEIGHBORS) {
    assert.equal(zoneAt(n.home.x, n.home.z), 'grass', `${n.name}'s house is not on grass`);
}

// Hills must never dip a meadow below the waterline.
let lowest = Infinity;
for (let x = -40; x <= 40; x += 2) {
    for (let z = -40; z <= 40; z += 2) {
        if (zoneAt(x, z) !== 'grass') continue;
        lowest = Math.min(lowest, heightAt(x, z));
    }
}
assert.ok(lowest > WATER_LEVEL + 0.5, `grass dips to ${lowest.toFixed(2)} — hills are too deep`);

// Building pads are levelled, so houses don't float or sink at their corners.
for (const n of NEIGHBORS) {
    const c = heightAt(n.home.x, n.home.z);
    for (const [dx, dz] of [[2.2, 2.2], [-2.2, 2.2], [2.2, -2.2], [-2.2, -2.2]]) {
        const corner = heightAt(n.home.x + dx, n.home.z + dz);
        assert.ok(Math.abs(corner - c) < 0.12,
            `${n.name}'s pad is not level (corner off by ${(corner - c).toFixed(3)})`);
    }
}

// --- paths ----------------------------------------------------------------
// Every path waypoint must be walkable, or the village is cut in half.
for (const path of PATHS) {
    for (const [x, z] of path) {
        assert.ok(groundHeightAt(x, z) > WATER_LEVEL + 0.1,
            `path waypoint ${x},${z} is underwater`);
    }
}
// Walking a path never drops you in the sea, and never climbs a wall.
for (const path of PATHS) {
    for (let i = 0; i < path.length - 1; i++) {
        const [ax, az] = path[i], [bx, bz] = path[i + 1];
        let prev = groundHeightAt(ax, az);
        for (let t = 0; t <= 1; t += 0.02) {
            const x = ax + (bx - ax) * t, z = az + (bz - az) * t;
            const h = groundHeightAt(x, z);
            assert.ok(h > WATER_LEVEL, `path floods at ${x.toFixed(1)},${z.toFixed(1)}`);
            assert.ok(Math.abs(h - prev) < 0.5, `path has a step at ${x.toFixed(1)},${z.toFixed(1)}`);
            prev = h;
        }
    }
}
assert.ok(distToPaths(0, 2) < 0.5, 'the plaza sits on the path network');
assert.ok(distToPaths(40, -40) > 5, 'the far corner has no paths');

// --- dock -----------------------------------------------------------------
assert.ok(onDock(DOCK.x0 + 1, 0) && !onDock(0, 0), 'dock bounds');
assert.equal(groundHeightAt(DOCK.x0 + 1, 0), DOCK.y, 'the pier deck is standable');
assert.ok(heightAt(DOCK.x0 + 1, 0) < WATER_LEVEL, 'the pier really is over water');
// The landward end meets the beach without a big step up.
assert.ok(Math.abs(groundHeightAt(DOCK.x1 + 0.5, 0) - DOCK.y) < 0.7, 'dock step is too tall');

// --- spawn ----------------------------------------------------------------
const spawn = { x: LANDMARKS.dockLanding.x + 3, z: LANDMARKS.dockLanding.z };
assert.ok(groundHeightAt(spawn.x, spawn.z) > WATER_LEVEL + 0.15, 'spawn is in the sea');
// You can actually walk from the spawn toward town without hitting water.
for (let x = spawn.x; x < 0; x += 1) {
    assert.ok(groundHeightAt(x, 1) > WATER_LEVEL, `no dry route to town at x=${x}`);
}

// --- rng ------------------------------------------------------------------
{
    const a = mulberry32(20260813), b = mulberry32(20260813);
    const seqA = Array.from({ length: 5 }, () => a());
    const seqB = Array.from({ length: 5 }, () => b());
    assert.deepEqual(seqA, seqB, 'the island seed must be reproducible');
    assert.ok(seqA.every(v => v >= 0 && v < 1), 'rng must stay in [0,1)');
}

console.log('island.test.mjs — all checks passed ✅');

// Cozy Island 3D — terrain mesh, landmarks, props, collision 🏝️
//
// The island is a height field, not a tile grid. island.js owns the shape;
// this file turns it into geometry and everything you can bump into.
import * as THREE from 'three';
import {
    WATER_LEVEL, LAND_Y, LANDMARKS, DOCK, NEIGHBORS,
    smoothstep, clamp01, mulberry32,
    heightAt, groundHeightAt, onDock, distToPaths, sandiness, zoneAt,
} from './island.js';
import * as Farming from './farming.js';
import { ITEMS } from './items.js';

export { WATER_LEVEL, LANDMARKS, DOCK, NEIGHBORS, heightAt, distToPaths, zoneAt } from './island.js';

const TERRAIN_SIZE = 132;
const TERRAIN_SEGS = 200;

// ---------------------------------------------------------------- palette

const C = {
    seabed:   new THREE.Color(0x9a8f6a),
    sandWet:  new THREE.Color(0xd8c493),
    sand:     new THREE.Color(0xeedcb0),
    grass:    new THREE.Color(0x74b34a),
    grassAlt: new THREE.Color(0x5f9b3c),
    grassDim: new THREE.Color(0x4d8534),
    dirt:     new THREE.Color(0xb8955f),
    dirtAlt:  new THREE.Color(0xa8834f),
};

const SEASON_TINT = {
    Sweet: { ground: 0xffffff, canopy: 0x9ede6a, alt: 0xf6b8d4 },
    Saucy: { ground: 0xfff6e2, canopy: 0x5aa83c, alt: 0xffd25e },
    Cool:  { ground: 0xf0dcc0, canopy: 0xe08a3c, alt: 0xd9603a },
    Yeesh: { ground: 0xdde7f2, canopy: 0x8f7f6a, alt: 0xcfe4f0 },
};

// Instanced prop helper: one draw call per part, hide() retires an instance.
function makeProps(scene, max, parts) {
    const dummy = new THREE.Object3D();
    const meshes = parts.map(p => {
        const m = new THREE.InstancedMesh(p.geo, p.mat, max);
        m.count = 0;
        m.castShadow = p.shadow !== false;
        m.receiveShadow = true;
        m.frustumCulled = false; // instance matrices change after construction
        scene.add(m);
        return m;
    });
    return {
        meshes,
        materials: parts.map(p => p.mat),
        add(x, y, z, scale, rotY, color) {
            const i = meshes[0].count;
            if (i >= max) return -1;
            dummy.position.set(x, y, z);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            for (const m of meshes) {
                m.setMatrixAt(i, dummy.matrix);
                if (color) m.setColorAt(i, color);
                m.count = i + 1;
                m.instanceMatrix.needsUpdate = true;
                if (m.instanceColor) m.instanceColor.needsUpdate = true;
            }
            return i;
        },
        hide(i) {
            dummy.position.set(0, -999, 0);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(0.0001, 0.0001, 0.0001);
            dummy.updateMatrix();
            for (const m of meshes) {
                m.setMatrixAt(i, dummy.matrix);
                m.instanceMatrix.needsUpdate = true;
            }
        },
    };
}


// ---------------------------------------------------------------- farming visuals

const SOIL_COLOR = new THREE.Color(0x8d6e4a);
const WATERED_COLOR = new THREE.Color(0x6a8fbb);

function makeFlatTile(geo, mat, scene, max) {
    const mesh = new THREE.InstancedMesh(geo, mat, max);
    mesh.count = 0;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    scene.add(mesh);
    const dummy = new THREE.Object3D();
    return {
        mesh,
        add(x, z) {
            const i = mesh.count;
            if (i >= max) return -1;
            dummy.position.set(x, 0, z);
            dummy.rotation.set(-Math.PI / 2, 0, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
            mesh.count = i + 1;
            mesh.instanceMatrix.needsUpdate = true;
            return i;
        },
        clear() {
            mesh.count = 0;
            mesh.instanceMatrix.needsUpdate = true;
        },
        setColor(i, color) {
            if (!mesh.instanceColor) {
                const colors = new Float32Array(max * 3);
                mesh.setAttribute('instanceColor', new THREE.InstancedBufferAttribute(colors, 3));
            }
            mesh.setColorAt(i, color);
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        },
    };
}

const lambert = (color, opts = {}) => new THREE.MeshLambertMaterial({ color, ...opts });

// ---------------------------------------------------------------- world

export class World {
    constructor(scene) {
        this.scene = scene;
        this.rng = mulberry32(20260813); // fixed seed: the island is the same every visit
        this.props = [];        // { kind, x, z, y, r, solid, label, item, set, idx }
        this.drops = [];
        this.spacing = new Set();
        this.farmDirty = true;
        this.shippingBin = null;

        this.buildTerrain();
        this.buildWater();
        this.buildDock();
        this.buildPlaza();
        this.buildHouses();
        this.scatterProps();
        this.buildFarm();
        this.buildShippingBin();
    }

    // -- terrain -------------------------------------------------------

    buildTerrain() {
        const geo = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, TERRAIN_SEGS, TERRAIN_SEGS);
        geo.rotateX(-Math.PI / 2);
        const pos = geo.attributes.position;
        const colors = new Float32Array(pos.count * 3);
        const c = new THREE.Color();

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i), z = pos.getZ(i);
            const h = heightAt(x, z);
            pos.setY(i, h);

            if (h < -0.1) {
                c.copy(C.seabed).lerp(C.sandWet, clamp01((h + 2.2) / 2.1));
            } else {
                // Two-tone grass with low-frequency patchiness, darker in hollows.
                const patch = clamp01(0.5 + 0.5 * Math.sin(x * 0.28) * Math.cos(z * 0.24));
                c.copy(C.grass).lerp(C.grassAlt, patch);
                c.lerp(C.grassDim, clamp01((LAND_Y + 0.3 - h) / 1.4) * 0.4);
                // Sand fades in toward every waterline — coast and pond rim alike.
                const s = sandiness(x, z);
                if (s > 0) c.lerp(C.sandWet.clone().lerp(C.sand, clamp01(h / 1.1)), smoothstep(clamp01(s)));
            }

            // Dirt paths, painted on land only.
            if (h > 0.25) {
                const pd = distToPaths(x, z);
                if (pd < 2.4) {
                    const t = 1 - smoothstep(clamp01((pd - 1.3) / 1.1));
                    const grain = clamp01(0.5 + 0.5 * Math.sin(x * 1.7 + z * 1.3));
                    c.lerp(C.dirt.clone().lerp(C.dirtAlt, grain), t * 0.92);
                }
            }
            colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        }

        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        this.terrainMat = lambert(0xffffff, { vertexColors: true, flatShading: true });
        const mesh = new THREE.Mesh(geo, this.terrainMat);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.terrain = mesh;
    }

    buildWater() {
        // One plane fills the sea and the pond basin — both sit at/below y=0.
        const geo = new THREE.PlaneGeometry(420, 420, 70, 70);
        geo.rotateX(-Math.PI / 2);
        this.waterBaseY = Float32Array.from(geo.attributes.position.array);
        this.waterMat = new THREE.MeshLambertMaterial({
            color: 0x3f9dc4, transparent: true, opacity: 0.82, flatShading: true,
        });
        const mesh = new THREE.Mesh(geo, this.waterMat);
        mesh.position.y = WATER_LEVEL;
        this.scene.add(mesh);
        this.water = mesh;
    }

    // -- structures ----------------------------------------------------

    buildDock() {
        const g = new THREE.Group();
        const plank = lambert(0xa9794b);
        const post = lambert(0x6f4d2e);
        const len = DOCK.x1 - DOCK.x0;
        const deck = new THREE.Mesh(new THREE.BoxGeometry(len, 0.22, DOCK.z1 - DOCK.z0), plank);
        deck.position.set((DOCK.x0 + DOCK.x1) / 2, DOCK.y, 0);
        deck.castShadow = true; deck.receiveShadow = true;
        g.add(deck);

        for (let x = DOCK.x0 + 1.5; x < DOCK.x1; x += 3.5) {
            for (const z of [DOCK.z0 + 0.3, DOCK.z1 - 0.3]) {
                const p = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 3, 6), post);
                p.position.set(x, DOCK.y - 1.6, z);
                p.castShadow = true;
                g.add(p);
                const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.85, 5), post);
                rail.position.set(x, DOCK.y + 0.53, z);
                rail.castShadow = true;
                g.add(rail);
            }
        }
        // A little moored rowboat at the seaward end.
        const boat = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.55, 2.6, 6, 1, false), lambert(0xc26b4a));
        boat.rotation.set(Math.PI / 2, 0, Math.PI / 2);
        boat.position.set(DOCK.x0 + 1.5, 0.15, DOCK.z1 + 1.5);
        boat.castShadow = true;
        g.add(boat);
        this.scene.add(g);

        this.addProp({
            kind: 'dock', x: DOCK.x0 + 2, z: 0, y: DOCK.y, r: 2.4, solid: false,
            label: 'Look out to sea', line: 'The sea is calm. Somewhere past the fog, the mainland.',
        });
    }

    buildPlaza() {
        const p = LANDMARKS.plaza;
        const y = heightAt(p.x, p.z);
        const g = new THREE.Group();

        // Well: stone ring, two posts, a little roof.
        const stone = lambert(0x9a9a94, { flatShading: true });
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 0.75, 8), stone);
        ring.position.set(p.x, y + 0.37, p.z);
        ring.castShadow = true; ring.receiveShadow = true;
        g.add(ring);
        const wood = lambert(0x8b5a2b);
        for (const dx of [-0.8, 0.8]) {
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.6, 0.16), wood);
            post.position.set(p.x + dx, y + 1.5, p.z);
            post.castShadow = true;
            g.add(post);
        }
        const roof = new THREE.Mesh(new THREE.ConeGeometry(1.35, 0.7, 4), lambert(0xc0563c, { flatShading: true }));
        roof.rotation.y = Math.PI / 4;
        roof.position.set(p.x, y + 2.55, p.z);
        roof.castShadow = true;
        g.add(roof);

        // Notice board.
        const board = new THREE.Group();
        const face = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.1, 0.14), lambert(0xd9bb85));
        face.position.y = 1.35;
        face.castShadow = true;
        board.add(face);
        for (const dx of [-0.6, 0.6]) {
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.4, 0.14), wood);
            leg.position.set(dx, 0.7, 0);
            leg.castShadow = true;
            board.add(leg);
        }
        board.position.set(p.x + 4.2, y, p.z - 2.4);
        board.rotation.y = -0.5;
        g.add(board);
        this.scene.add(g);

        this.addProp({
            kind: 'well', x: p.x, z: p.z, y, r: 1.5, solid: true,
            label: 'Peer into the well', line: 'Cool air, a coin somebody wished on, and your own face looking back.',
        });
        this.addProp({
            kind: 'board', x: p.x + 4.2, z: p.z - 2.4, y, r: 1.2, solid: true,
            label: 'Read the notice board', line: null, // filled in by main.js with the day's news
        });
    }

    makeShack(bodyColor, roofColor) {
        const g = new THREE.Group();
        const walls = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.4, 3.8), lambert(bodyColor, { flatShading: true }));
        walls.position.y = 1.2;
        walls.castShadow = true; walls.receiveShadow = true;
        g.add(walls);

        const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 1.9, 4), lambert(roofColor, { flatShading: true }));
        roof.rotation.y = Math.PI / 4;
        roof.position.y = 3.35;
        roof.castShadow = true;
        g.add(roof);

        const door = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.5, 0.12), lambert(0x5b3a20));
        door.position.set(0, 0.75, 1.95);
        g.add(door);

        for (const dx of [-1.35, 1.35]) {
            const win = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.12), lambert(0x8fd0e8));
            win.position.set(dx, 1.5, 1.95);
            g.add(win);
        }
        const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.2, 0.5), lambert(0x8a6a55, { flatShading: true }));
        chimney.position.set(1.2, 3.4, -0.8);
        chimney.castShadow = true;
        g.add(chimney);
        return g;
    }


    // -- farm ------------------------------------------------------------

    buildFarm() {
        const soilGeo = new THREE.PlaneGeometry(Farming.GRID * 0.95, Farming.GRID * 0.95);
        this.soilMesh = makeFlatTile(soilGeo, lambert(SOIL_COLOR, { transparent: true, opacity: 0.92, flatShading: true }), this.scene, 600);

        const wateredGeo = new THREE.PlaneGeometry(Farming.GRID * 0.55, Farming.GRID * 0.55);
        this.wateredMesh = makeFlatTile(wateredGeo, lambert(WATERED_COLOR, { transparent: true, opacity: 0.65, flatShading: true }), this.scene, 600);

        const stemGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.4, 5);
        stemGeo.translate(0, 0.2, 0);
        const headGeo = new THREE.DodecahedronGeometry(0.24, 0);
        headGeo.translate(0, 0.5, 0);
        this.crops = makeProps(this.scene, 500, [
            { geo: stemGeo, mat: lambert(0x5d8c3a, { flatShading: true }), shadow: false },
            { geo: headGeo, mat: lambert(0xffffff), shadow: false },
        ]);
    }

    buildShippingBin() {
        const g = new THREE.Group();
        const boxMat = lambert(0x8b5a2b);
        const slatMat = lambert(0x6d4c33);
        for (let i = 0; i < 3; i++) {
            const b = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.35, 1.0), boxMat);
            b.position.set(0, i * 0.38 + 0.18, 0);
            b.castShadow = true; b.receiveShadow = true;
            g.add(b);
            for (const dx of [-0.55, 0.55]) {
                const s = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.8), slatMat);
                s.position.set(dx, i * 0.38 + 0.3, 0);
                g.add(s);
            }
        }
        const { x: hx, z: hz } = LANDMARKS.playerHome;
        const x = hx + 5.5, z = hz + 3.5;
        const y = heightAt(x, z);
        g.position.set(x, y, z);
        g.rotation.y = 0.3;
        this.scene.add(g);
        this.shippingBin = this.addProp({
            kind: 'shipping-bin', x, z, y, r: 1.4, solid: true,
            label: 'Ship your goods',
        });
    }

    buildHouses() {
        const home = LANDMARKS.playerHome;
        const hy = heightAt(home.x, home.z);
        const mine = this.makeShack(0xd8c09a, 0x6f9fd8);
        mine.position.set(home.x, hy, home.z);
        mine.rotation.y = -0.35;
        this.scene.add(mine);
        this.addProp({
            kind: 'home', x: home.x, z: home.z, y: hy, hw: 2.5, hd: 2.3, solid: true, r: 3.4,
            label: "Dreamer's Shack", line: 'Home. The lamp is on, the bed is made, and Space opens the door.',
        });

        for (const n of NEIGHBORS) {
            const y = heightAt(n.home.x, n.home.z);
            const s = this.makeShack(0xe0d3bb, n.roof);
            s.position.set(n.home.x, y, n.home.z);
            // Face roughly toward the plaza so doors meet the paths.
            s.rotation.y = Math.atan2(LANDMARKS.plaza.x - n.home.x, LANDMARKS.plaza.z - n.home.z);
            this.scene.add(s);
            n.homeY = y;
            this.addProp({
                kind: 'house', x: n.home.x, z: n.home.z, y, hw: 2.5, hd: 2.3, solid: true, r: 3.4,
                label: `${n.name}'s Shack`, line: `${n.name} lives here. The doormat says something rude but affectionate.`,
            });
        }
    }

    // -- props ---------------------------------------------------------

    /** Reject a spot in the wrong zone, on a path, or too near a landmark/prop. */
    spotOk(x, z, opts) {
        const zone = zoneAt(x, z);
        if (zone === 'sea') return false;
        if (opts.zone !== 'any' && zone !== opts.zone) return false;
        if (distToPaths(x, z) < opts.pathClear) return false;
        for (const p of this.props) {
            if (p.kind !== 'home' && p.kind !== 'house' && p.kind !== 'well' &&
                p.kind !== 'board' && p.kind !== 'dock') continue;
            if (Math.hypot(x - p.x, z - p.z) < 8) return false;
        }
        // ponytail: coarse 1.5-unit occupancy grid instead of a real spatial index.
        const key = `${Math.round(x / opts.spacing)},${Math.round(z / opts.spacing)}`;
        if (this.spacing.has(key)) return false;
        this.spacing.add(key);
        return true;
    }

    findSpot(opts, tries = 24) {
        for (let i = 0; i < tries; i++) {
            const a = this.rng() * Math.PI * 2;
            const r = Math.sqrt(this.rng()) * (opts.radius ?? 52);
            const x = (opts.cx ?? 0) + Math.cos(a) * r;
            const z = (opts.cz ?? 0) + Math.sin(a) * r;
            if (this.spotOk(x, z, opts)) return { x, z, y: heightAt(x, z) };
        }
        return null;
    }

    addProp(p) {
        this.props.push(p);
        return p;
    }

    scatterProps() {
        const rng = this.rng;
        const tint = SEASON_TINT.Sweet;

        // --- broadleaf trees, clustered into groves so meadows stay open ---
        const trunkGeo = new THREE.CylinderGeometry(0.16, 0.24, 1.9, 6);
        trunkGeo.translate(0, 0.95, 0);
        const canopyGeo = new THREE.IcosahedronGeometry(1.35, 0);
        canopyGeo.translate(0, 2.6, 0);
        this.trees = makeProps(this.scene, 320, [
            { geo: trunkGeo, mat: lambert(0x7a5230, { flatShading: true }) },
            { geo: canopyGeo, mat: lambert(tint.canopy, { flatShading: true }) },
        ]);

        const groveOpts = { zone: 'grass', pathClear: 3.2, spacing: 1.9, radius: 42 };
        for (let g = 0; g < 15; g++) {
            const seed = this.findSpot({ ...groveOpts, spacing: 6 }, 40);
            if (!seed) continue;
            const n = 5 + Math.floor(rng() * 9);
            for (let i = 0; i < n; i++) {
                const spot = this.findSpot({ ...groveOpts, cx: seed.x, cz: seed.z, radius: 7.5 }, 10);
                if (!spot) continue;
                const s = 0.82 + rng() * 0.42;
                const idx = this.trees.add(spot.x, spot.y, spot.z, s, rng() * Math.PI * 2);
                if (idx < 0) continue;
                this.addProp({
                    kind: 'tree', x: spot.x, z: spot.z, y: spot.y, r: 0.75 * s, solid: true,
                    label: 'Shake the tree', item: 'log', set: this.trees, idx,
                });
            }
        }

        // --- palms along the sand ---
        const palmTrunk = new THREE.CylinderGeometry(0.13, 0.2, 3.2, 6);
        palmTrunk.translate(0, 1.6, 0);
        const frondGeo = new THREE.ConeGeometry(1.5, 0.9, 5);
        frondGeo.translate(0, 3.5, 0);
        this.palms = makeProps(this.scene, 70, [
            { geo: palmTrunk, mat: lambert(0x8d6742, { flatShading: true }) },
            { geo: frondGeo, mat: lambert(0x59a04a, { flatShading: true }) },
        ]);
        for (let i = 0; i < 44; i++) {
            const spot = this.findSpot({ zone: 'sand', pathClear: 3, spacing: 3.4, radius: 52 }, 30);
            if (!spot) continue;
            const s = 0.85 + rng() * 0.4;
            const idx = this.palms.add(spot.x, spot.y, spot.z, s, rng() * Math.PI * 2);
            if (idx < 0) continue;
            this.addProp({
                kind: 'palm', x: spot.x, z: spot.z, y: spot.y, r: 0.7 * s, solid: true,
                label: 'Shake the palm', item: 'banana', set: this.palms, idx,
            });
        }

        // --- rocks ---
        const rockGeo = new THREE.DodecahedronGeometry(0.62, 0);
        rockGeo.translate(0, 0.34, 0);
        this.rocks = makeProps(this.scene, 80, [
            { geo: rockGeo, mat: lambert(0x9d9a92, { flatShading: true }) },
        ]);
        for (let i = 0; i < 55; i++) {
            const spot = this.findSpot({ zone: 'any', pathClear: 2.6, spacing: 3.2, radius: 50 }, 24);
            if (!spot) continue;
            const s = 0.7 + rng() * 0.7;
            const idx = this.rocks.add(spot.x, spot.y, spot.z, s, rng() * Math.PI * 2);
            if (idx < 0) continue;
            this.addProp({
                kind: 'rock', x: spot.x, z: spot.z, y: spot.y, r: 0.55 * s, solid: true,
                label: 'Break the rock', item: 'stone', set: this.rocks, idx,
            });
        }

        // --- flowers (tinted per instance) ---
        const stemGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.36, 4);
        stemGeo.translate(0, 0.18, 0);
        const headGeo = new THREE.IcosahedronGeometry(0.19, 0);
        headGeo.translate(0, 0.44, 0);
        this.flowers = makeProps(this.scene, 260, [
            { geo: stemGeo, mat: lambert(0x4f8b3a), shadow: false },
            { geo: headGeo, mat: lambert(0xffffff), shadow: false },
        ]);
        const PETALS = [0xff7bac, 0xffd54f, 0xffffff, 0xe05a5a, 0xb388ff, 0xff9d4d];
        for (let i = 0; i < 220; i++) {
            const spot = this.findSpot({ zone: 'grass', pathClear: 1.5, spacing: 1.4, radius: 48 }, 16);
            if (!spot) continue;
            const col = new THREE.Color(PETALS[Math.floor(rng() * PETALS.length)]);
            const idx = this.flowers.add(spot.x, spot.y, spot.z, 0.8 + rng() * 0.5, rng() * Math.PI * 2, col);
            if (idx < 0) continue;
            this.addProp({
                kind: 'flower', x: spot.x, z: spot.z, y: spot.y, r: 0.4, solid: false,
                label: 'Pick the flower', item: 'fiber', set: this.flowers, idx,
            });
        }

        // --- beachcombing: shells on the sand, sticks in the grass ---
        const shellGeo = new THREE.ConeGeometry(0.2, 0.26, 6);
        shellGeo.translate(0, 0.13, 0);
        this.shells = makeProps(this.scene, 40, [
            { geo: shellGeo, mat: lambert(0xffe6ea, { flatShading: true }) },
        ]);
        for (let i = 0; i < 30; i++) {
            const spot = this.findSpot({ zone: 'sand', pathClear: 0.5, spacing: 2.4, radius: 52 }, 24);
            if (!spot) continue;
            const idx = this.shells.add(spot.x, spot.y, spot.z, 0.9 + rng() * 0.5, rng() * Math.PI * 2);
            if (idx < 0) continue;
            this.addProp({
                kind: 'shell', x: spot.x, z: spot.z, y: spot.y, r: 0.45, solid: false,
                label: 'Pick up the shell', item: 'seashell', set: this.shells, idx,
            });
        }

        const stickGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 4);
        stickGeo.rotateZ(Math.PI / 2);
        stickGeo.translate(0, 0.07, 0);
        this.sticks = makeProps(this.scene, 40, [
            { geo: stickGeo, mat: lambert(0x8b6b45) },
        ]);
        for (let i = 0; i < 28; i++) {
            const spot = this.findSpot({ zone: 'grass', pathClear: 1.4, spacing: 2.6, radius: 48 }, 20);
            if (!spot) continue;
            const idx = this.sticks.add(spot.x, spot.y, spot.z, 1, this.rng() * Math.PI * 2);
            if (idx < 0) continue;
            this.addProp({
                kind: 'stick', x: spot.x, z: spot.z, y: spot.y, r: 0.45, solid: false,
                label: 'Pick up the stick', item: 'stick', set: this.sticks, idx,
            });
        }

        // --- grass tufts: pure decoration, no prop entries ---
        const tuftGeo = new THREE.ConeGeometry(0.13, 0.42, 4);
        tuftGeo.translate(0, 0.21, 0);
        this.tufts = makeProps(this.scene, 1400, [
            { geo: tuftGeo, mat: lambert(0x67a83f, { flatShading: true }), shadow: false },
        ]);
        for (let i = 0; i < 1400; i++) {
            const a = rng() * Math.PI * 2;
            const r = Math.sqrt(rng()) * 50;
            const x = Math.cos(a) * r, z = Math.sin(a) * r;
            const y = heightAt(x, z);
            if (zoneAt(x, z) !== 'grass' || distToPaths(x, z) < 1.7) continue;
            this.tufts.add(x, y, z, 0.7 + rng() * 0.7, rng() * Math.PI * 2);
        }
    }

    // -- queries -------------------------------------------------------

    /** Ground height including the pier deck. */
    groundHeightAt(x, z) { return groundHeightAt(x, z); }
    onDock(x, z) { return onDock(x, z); }

    /** Can a body of the given radius stand here? */
    canStand(x, z, radius = 0.35) {
        if (this.groundHeightAt(x, z) <= WATER_LEVEL + 0.12) return false;
        // ponytail: linear scan over ~500 props. Add a grid if this ever shows up in a profile.
        for (const p of this.props) {
            if (!p.solid) continue;
            if (p.hw !== undefined) {
                if (Math.abs(x - p.x) < p.hw + radius && Math.abs(z - p.z) < p.hd + radius) return false;
            } else if (Math.hypot(x - p.x, z - p.z) < p.r + radius) {
                return false;
            }
        }
        return true;
    }

    /** True if a solid prop overlaps the disc at (x,z). */
    solidAt(x, z, radius = 0.35) {
        for (const p of this.props) {
            if (!p.solid) continue;
            if (p.hw !== undefined) {
                if (Math.abs(x - p.x) < p.hw + radius && Math.abs(z - p.z) < p.hd + radius) return true;
            } else if (Math.hypot(x - p.x, z - p.z) < p.r + radius) {
                return true;
            }
        }
        return false;
    }

    /**
     * Closest legal footing to (x,z), searching outward in rings. Anything
     * that places a body — spawns, save-loading, an actor that wandered into
     * a wall — goes through here, so nothing can end up wedged in scenery.
     */
    nearestStandable(x, z, maxR = 12, radius = 0.5) {
        if (this.canStand(x, z, radius)) return { x, z };
        for (let r = 1; r <= maxR; r += 0.75) {
            for (let i = 0; i < 12; i++) {
                const a = (i / 12) * Math.PI * 2 + r; // offset each ring so we don't favour +x
                const nx = x + Math.cos(a) * r, nz = z + Math.sin(a) * r;
                if (this.canStand(nx, nz, radius)) return { x: nx, z: nz };
            }
        }
        return null;
    }

    /**
     * Nearest interactable in front of `pos`, or underfoot.
     * Facing is a unit vector in world XZ.
     */
    interactableNear(pos, facing, reach = 2.6) {
        let best = null, bestScore = Infinity;
        for (const p of this.props) {
            const dx = p.x - pos.x, dz = p.z - pos.z;
            const d = Math.hypot(dx, dz);
            const limit = (p.hw !== undefined ? p.r : p.r) + reach;
            if (d > limit) continue;
            const dot = d < 0.001 ? 1 : (dx * facing.x + dz * facing.z) / d;
            if (dot < 0.15 && d > 1.2) continue; // behind you and not underfoot
            const score = d - dot * 1.4;
            if (score < bestScore) { bestScore = score; best = p; }
        }
        return best;
    }

    /** Remove a harvestable prop and drop its item where it stood. */
    harvest(prop) {
        if (!prop.item) return null;
        const i = this.props.indexOf(prop);
        if (i === -1) return null;
        this.props.splice(i, 1);
        if (prop.set) prop.set.hide(prop.idx);
        this.spawnDrop(prop.item, prop.x, prop.y, prop.z);
        // Trees leave a stump-free clearing but sometimes a bonus.
        if (prop.kind === 'tree' && this.rng() < 0.35) {
            this.spawnDrop('berry', prop.x + 0.7, prop.y, prop.z + 0.4);
        }
        return prop;
    }


    // -- farm actions --------------------------------------------------

    /** Return the plot and soil grid in front of pos, or null. */
    facingFarmTile(pos, facing) {
        const reach = 2.2;
        const tx = pos.x + facing.x * reach;
        const tz = pos.z + facing.z * reach;
        const { gx, gz } = Farming.worldToGrid(tx, tz);
        return { gx, gz, x: Farming.gridToWorld(gx, gz).x, z: Farming.gridToWorld(gx, gz).z };
    }

    /** Try to chop a tree. Returns the prop if hit/felled, null if nothing. */
    chopTree(pos, facing, day = 0) {
        let best = null, bestScore = Infinity;
        for (const p of this.props) {
            if (p.kind !== 'tree' || p.stump) continue;
            const dx = p.x - pos.x, dz = p.z - pos.z;
            const d = Math.hypot(dx, dz);
            if (d > 2.8) continue;
            const dot = d < 0.001 ? 1 : (dx * facing.x + dz * facing.z) / d;
            if (dot < 0.1 && d > 1.4) continue;
            const score = d - dot * 1.3;
            if (score < bestScore) { bestScore = score; best = p; }
        }
        if (!best) return null;
        best.hits = (best.hits || 0) + 1;
        if (best.hits < 3) {
            return { prop: best, fell: false, remaining: 3 - best.hits };
        }
        this.fellTree(best, day);
        return { prop: best, fell: true };
    }

    fellTree(prop, day = 0) {
        if (prop.set && prop.idx !== undefined) prop.set.hide(prop.idx);
        // Stump: tiny cylinder at ground level.
        const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.3, 7), lambert(0x6b4428));
        stump.position.set(prop.x, prop.y + 0.15, prop.z);
        stump.castShadow = true; stump.receiveShadow = true;
        this.scene.add(stump);
        prop.stump = stump;
        prop.solid = false;
        prop.label = 'Inspect the stump';
        prop.line = 'A clean cut. This will grow back in a few days.';
        delete prop.item;
        prop.felledDay = day;
        this.spawnDrop('log', prop.x, prop.y, prop.z);
        if (this.rng() < 0.35) this.spawnDrop('berry', prop.x + 0.5, prop.y, prop.z + 0.3);
        if (this.rng() < 0.25) this.spawnDrop('seed', prop.x - 0.3, prop.y, prop.z + 0.5);
    }

    regrowTrees(day) {
        for (const p of this.props) {
            if (p.kind !== 'tree' || !p.stump) continue;
            if (typeof p.felledDay !== 'number' || day - p.felledDay < 5) continue;
            this.scene.remove(p.stump);
            p.stump.geometry.dispose();
            p.stump = null;
            p.hits = 0;
            delete p.felledDay;
            p.solid = true;
            p.label = 'Shake the tree';
            p.line = 'The leaves rustle.';
            p.item = 'berry';
            if (p.set && p.idx !== undefined) p.set.show(p.idx);
        }
    }

    /** Till the soil at the grid cell in front of the player. */
    tillSoil(pos, facing) {
        const t = this.facingFarmTile(pos, facing);
        if (!Farming.canTillHere(this, t.gx, t.gz)) return false;
        Farming.till(t.gx, t.gz);
        this.farmDirty = true;
        return true;
    }

    /** Plant the active seed at the facing soil cell. */
    plantSeed(pos, facing, seedId) {
        const t = this.facingFarmTile(pos, facing);
        const cropId = Farming.plant(t.gx, t.gz, seedId);
        if (!cropId) return false;
        this.farmDirty = true;
        return cropId;
    }

    waterCrop(pos, facing) {
        const t = this.facingFarmTile(pos, facing);
        if (!Farming.canWaterHere(t.gx, t.gz) || Farming.isWatered(t.gx, t.gz)) return false;
        Farming.water(t.gx, t.gz);
        this.farmDirty = true;
        return true;
    }

    harvestCrop(pos, facing) {
        const t = this.facingFarmTile(pos, facing);
        const cropId = Farming.harvest(t.gx, t.gz);
        if (!cropId) return false;
        this.farmDirty = true;
        return cropId;
    }

    /** Sell one of the held item from inventory, if it has value. Returns profit or null. */
    shipHeldItem(inventory) {
        const active = inventory.activeItem();
        if (!active) return null;
        const def = ITEMS[active];
        const value = def && def.value ? def.value : 0;
        if (!value || !inventory.has(active, 1)) return null;
        inventory.remove(active, 1);
        inventory.earn(value);
        return { id: active, value };
    }

    spawnDrop(itemId, x, y, z) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.3, 0.3),
            lambert(DROP_COLORS[itemId] ?? 0xffd700, { flatShading: true })
        );
        mesh.position.set(x, y + 0.45, z);
        mesh.rotation.y = this.rng() * Math.PI;
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.drops.push({ itemId, mesh, baseY: y + 0.45, t: this.rng() * 6 });
    }

    /** Walk over a drop to collect it. Returns the item ids picked up. */
    collectDropsNear(pos, radius = 1.1) {
        const got = [];
        for (let i = this.drops.length - 1; i >= 0; i--) {
            const d = this.drops[i];
            if (Math.hypot(d.mesh.position.x - pos.x, d.mesh.position.z - pos.z) < radius) {
                this.scene.remove(d.mesh);
                d.mesh.geometry.dispose();
                d.mesh.material.dispose();
                this.drops.splice(i, 1);
                got.push(d.itemId);
            }
        }
        return got;
    }

    // -- per-frame -----------------------------------------------------

    setSeason(season) {
        const t = SEASON_TINT[season] ?? SEASON_TINT.Sweet;
        this.terrainMat.color.setHex(t.ground);
        this.trees.materials[1].color.setHex(t.canopy);
        this.tufts.materials[0].color.setHex(season === 'Yeesh' ? 0x9aa891 : 0x67a83f);
        this.waterMat.color.setHex(season === 'Yeesh' ? 0x4f8fae : 0x3f9dc4);
    }

    update(dt, elapsed) {
        if (this.farmDirty) this.refreshFarm();

        // Gentle swell on the water plane.
        const pos = this.water.geometry.attributes.position;
        const base = this.waterBaseY;
        for (let i = 0; i < pos.count; i++) {
            const x = base[i * 3], z = base[i * 3 + 2];
            pos.array[i * 3 + 1] = Math.sin(x * 0.09 + elapsed * 0.9) * 0.09
                                 + Math.sin(z * 0.13 - elapsed * 0.7) * 0.07;
        }
        pos.needsUpdate = true;

        // Dropped items bob and spin so they read as pickups.
        for (const d of this.drops) {
            d.t += dt;
            d.mesh.position.y = d.baseY + Math.sin(d.t * 2.4) * 0.1;
            d.mesh.rotation.y += dt * 1.6;
        }
    }

    refreshFarm() {
        this.farmDirty = false;
        this.soilMesh.clear();
        this.wateredMesh.clear();
        for (const plot of Farming.allPlots()) {
            const { x, z } = Farming.gridToWorld(plot.gx, plot.gz);
            const y = heightAt(x, z);
            const soilIdx = this.soilMesh.add(x, z);
            this.soilMesh.mesh.position.y = y + 0.02;
            if (soilIdx >= 0 && Farming.isWatered(plot.gx, plot.gz)) {
                this.wateredMesh.add(x, z);
                this.wateredMesh.mesh.position.y = y + 0.03;
            }
        }
        // Rebuild crop instanced mesh
        this.crops.meshes.forEach(m => m.count = 0);
        const dummy = new THREE.Object3D();
        let i = 0;
        for (const plot of Farming.allPlots()) {
            if (i >= 500) break;
            const def = Farming.getCropDef(plot.cropId);
            if (!def) continue;
            const { x, z } = Farming.gridToWorld(plot.gx, plot.gz);
            const y = heightAt(x, z);
            const ratio = (plot.stage + 1) / def.stages;
            const s = 0.5 + ratio * 0.9;
            dummy.position.set(x, y, z);
            dummy.rotation.set(0, this.rng() * 0.5, 0);
            dummy.scale.set(s, s, s);
            dummy.updateMatrix();
            for (const m of this.crops.meshes) {
                m.setMatrixAt(i, dummy.matrix);
                if (m.material.color) m.setColorAt(i, new THREE.Color(def.color));
                m.count = i + 1;
                m.instanceMatrix.needsUpdate = true;
                if (m.instanceColor) m.instanceColor.needsUpdate = true;
            }
            i++;
        }
    }
}

const DROP_COLORS = {
    log: 0x8b5a2b, stone: 0x9d9a92, fiber: 0xff7bac, seashell: 0xffe6ea,
    stick: 0x8b6b45, banana: 0xffe066, berry: 0xd94f6a,
    turnip: 0xffffff, tomato: 0xe84a3c, corn: 0xffd54f, strawberry: 0xd94f6a,
};

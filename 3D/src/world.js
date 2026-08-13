// Cozy Island 3D — world generation and tile management
import * as THREE from 'three';

const TILE_MATERIALS = {
    grass: new THREE.MeshStandardMaterial({ color: 0x6db33f, roughness: 0.9 }),
    beach: new THREE.MeshStandardMaterial({ color: 0xe6c288, roughness: 0.95 }),
    water: new THREE.MeshStandardMaterial({ color: 0x4fa4b8, transparent: true, opacity: 0.8, roughness: 0.1 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 1.0 }),
    canopy: new THREE.MeshStandardMaterial({ color: 0x4a8c3a, roughness: 0.9 }),
    rock: new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 }),
    flower: new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.9 }),
};

export class World {
    constructor(config, scene) {
        this.config = config;
        this.scene = scene;
        this.tiles = []; // 2D array of tile objects
        this.decorations = []; // objects that can be harvested
        this.drops = []; // collectable items on ground

        this.generate();
        this.buildMeshes();
        this.spawnDecorations();
        this.createWater();
    }

    islandZone(x, z) {
        const { WORLD_WIDTH, WORLD_HEIGHT, SEA_MARGIN, BEACH_THICKNESS } = this.config;
        const edge = Math.min(x, WORLD_WIDTH - 1 - x, z, WORLD_HEIGHT - 1 - z);
        if (edge < SEA_MARGIN) return 'sea';
        if (edge < SEA_MARGIN + BEACH_THICKNESS) return 'beach';
        return 'grass';
    }

    edgeDistance(x, z) {
        const { WORLD_WIDTH, WORLD_HEIGHT } = this.config;
        return Math.min(x, WORLD_WIDTH - 1 - x, z, WORLD_HEIGHT - 1 - z);
    }

    generate() {
        const { WORLD_WIDTH, WORLD_HEIGHT } = this.config;
        for (let z = 0; z < WORLD_HEIGHT; z++) {
            const row = [];
            for (let x = 0; x < WORLD_WIDTH; x++) {
                const zone = this.islandZone(x, z);
                row.push({
                    x, z,
                    type: zone,
                    solid: zone === 'sea',
                });
            }
            this.tiles.push(row);
        }
    }

    buildMeshes() {
        const { WORLD_WIDTH, WORLD_HEIGHT } = this.config;
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // Shift so (0,0) tile center is at world (0,0)
        geometry.translate(0, -0.5, 0);

        const grassCount = WORLD_WIDTH * WORLD_HEIGHT;
        this.grassMesh = new THREE.InstancedMesh(geometry, TILE_MATERIALS.grass, grassCount);
        this.beachMesh = new THREE.InstancedMesh(geometry, TILE_MATERIALS.beach, grassCount);
        this.grassMesh.receiveShadow = true;
        this.beachMesh.receiveShadow = true;
        this.grassMesh.castShadow = true;
        this.beachMesh.castShadow = true;

        const dummy = new THREE.Object3D();
        let gi = 0, bi = 0;
        const offsetX = -WORLD_WIDTH / 2;
        const offsetZ = -WORLD_HEIGHT / 2;
        this.worldOffset = { x: offsetX, z: offsetZ };

        for (let z = 0; z < WORLD_HEIGHT; z++) {
            for (let x = 0; x < WORLD_WIDTH; x++) {
                const zone = this.tiles[z][x].type;
                dummy.position.set(x + offsetX + 0.5, 0, z + offsetZ + 0.5);
                dummy.scale.set(1, 1, 1);
                dummy.updateMatrix();
                if (zone === 'grass') {
                    this.grassMesh.setMatrixAt(gi++, dummy.matrix);
                } else if (zone === 'beach') {
                    this.beachMesh.setMatrixAt(bi++, dummy.matrix);
                }
            }
        }
        this.grassMesh.count = gi;
        this.beachMesh.count = bi;
        this.grassMesh.instanceMatrix.needsUpdate = true;
        this.beachMesh.instanceMatrix.needsUpdate = true;
        this.scene.add(this.grassMesh);
        this.scene.add(this.beachMesh);
    }

    createWater() {
        const { WORLD_WIDTH, WORLD_HEIGHT } = this.config;
        const geometry = new THREE.PlaneGeometry(WORLD_WIDTH, WORLD_HEIGHT);
        const mesh = new THREE.Mesh(geometry, TILE_MATERIALS.water);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -0.25;
        this.scene.add(mesh);
        this.waterMesh = mesh;
    }

    spawnDecorations() {
        const { SEA_MARGIN, BEACH_THICKNESS } = this.config;
        for (let z = 0; z < this.config.WORLD_HEIGHT; z++) {
            for (let x = 0; x < this.config.WORLD_WIDTH; x++) {
                const zone = this.islandZone(x, z);
                const edge = this.edgeDistance(x, z);
                if (zone !== 'grass') continue;
                const wx = this.tileToWorldX(x);
                const wz = this.tileToWorldZ(z);
                const r = Math.random();
                if (edge >= SEA_MARGIN + BEACH_THICKNESS + 3) {
                    // deeper grass — trees
                    if (r < 0.05) this.createTree(x, z, wx, wz);
                    else if (r < 0.12) this.createRock(x, z, wx, wz);
                    else if (r < 0.18) this.createFlower(x, z, wx, wz);
                } else {
                    // near beach — smaller stuff
                    if (r < 0.03) this.createRock(x, z, wx, wz);
                    else if (r < 0.08) this.createFlower(x, z, wx, wz);
                }
            }
        }
    }

    createTree(tx, tz, wx, wz) {
        const group = new THREE.Group();
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.7, 6), TILE_MATERIALS.trunk);
        trunk.position.y = 0.35;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.9, 7), TILE_MATERIALS.canopy);
        canopy.position.y = 1.0;
        canopy.castShadow = true;
        canopy.receiveShadow = true;
        group.add(trunk, canopy);
        group.position.set(wx + 0.5, 0, wz + 0.5);
        this.scene.add(group);
        this.tiles[tz][tx].solid = true;
        this.decorations.push({ type: 'tree', tx, tz, mesh: group, harvest: 'log' });
    }

    createRock(tx, tz, wx, wz) {
        const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25, 0), TILE_MATERIALS.rock);
        mesh.position.set(wx + 0.5, 0.2, wz + 0.5);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.tiles[tz][tx].solid = true;
        this.decorations.push({ type: 'rock', tx, tz, mesh, harvest: 'stone' });
    }

    createFlower(tx, tz, wx, wz) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.15), TILE_MATERIALS.flower);
        mesh.position.set(wx + 0.5, 0.125, wz + 0.5);
        this.scene.add(mesh);
        this.decorations.push({ type: 'flower', tx, tz, mesh, harvest: 'fiber' });
    }

    tileToWorldX(tx) { return tx + this.worldOffset.x; }
    tileToWorldZ(tz) { return tz + this.worldOffset.z; }
    worldToTileX(wx) { return Math.floor(wx - this.worldOffset.x); }
    worldToTileZ(wz) { return Math.floor(wz - this.worldOffset.z); }

    getTile(tx, tz) {
        if (tx < 0 || tz < 0 || tx >= this.config.WORLD_WIDTH || tz >= this.config.WORLD_HEIGHT) return { type: 'void', solid: true };
        return this.tiles[tz][tx];
    }

    getTileAtWorld(wx, wz) {
        return this.getTile(this.worldToTileX(wx), this.worldToTileZ(wz));
    }

    isSolidWorld(wx, wz) {
        return this.getTileAtWorld(wx, wz).solid;
    }

    decorationAt(tx, tz) {
        return this.decorations.find(d => d.tx === tx && d.tz === tz);
    }

    harvest(tx, tz) {
        const idx = this.decorations.findIndex(d => d.tx === tx && d.tz === tz);
        if (idx === -1) return null;
        const dec = this.decorations[idx];
        this.scene.remove(dec.mesh);
        this.decorations.splice(idx, 1);
        this.tiles[tz][tx].solid = false;
        // Spawn drop
        this.spawnDrop(dec.harvest, tx, tz);
        return dec;
    }

    spawnDrop(itemId, tx, tz) {
        const wx = this.tileToWorldX(tx) + 0.5;
        const wz = this.tileToWorldZ(tz) + 0.5;
        const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const material = new THREE.MeshStandardMaterial({ color: dropColor(itemId) });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(wx, 0.35, wz);
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.castShadow = true;
        this.scene.add(mesh);
        this.drops.push({ itemId, tx, tz, mesh });
    }

    collectDropsAt(tx, tz) {
        const collected = [];
        for (let i = this.drops.length - 1; i >= 0; i--) {
            const d = this.drops[i];
            if (d.tx === tx && d.tz === tz) {
                this.scene.remove(d.mesh);
                collected.push(d.itemId);
                this.drops.splice(i, 1);
            }
        }
        return collected;
    }

    dropsAt(tx, tz) {
        return this.drops.filter(d => d.tx === tx && d.tz === tz).map(d => d.itemId);
    }
}

function dropColor(itemId) {
    switch (itemId) {
        case 'log': return 0x8b5a2b;
        case 'stone': return 0x999999;
        case 'fiber': return 0xffb6c1;
        default: return 0xffd700;
    }
}

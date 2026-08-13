// Cozy Island 3D — player controller, camera, and interaction
import * as THREE from 'three';

export class Player {
    constructor(config, scene, world, camera) {
        this.config = config;
        this.world = world;
        this.camera = camera;
        this.radius = 0.25;
        this.speed = 3.5;
        this.runSpeed = 6.0;
        this.facing = { x: 0, z: 1 };
        this.velocity = new THREE.Vector3();

        this.group = new THREE.Group();
        const body = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.2, 0.5, 4, 8),
            new THREE.MeshStandardMaterial({ color: 0xffc0cb, roughness: 0.7 })
        );
        body.position.y = 0.5;
        body.castShadow = true;
        this.group.add(body);
        // simple hat/crown
        const hat = new THREE.Mesh(
            new THREE.ConeGeometry(0.25, 0.25, 8),
            new THREE.MeshStandardMaterial({ color: 0x4b0082 })
        );
        hat.position.y = 0.9;
        this.group.add(hat);
        this.group.position.set(0, 0, 0);
        scene.add(this.group);

        // Camera orbit state
        this.cameraYaw = Math.PI / 4;
        this.cameraPitch = 0.45;
        this.cameraDistance = 9;
        this.minCameraDistance = 3;
        this.maxCameraDistance = 18;

        this.inventory = {};
        this.prompt = '';
    }

    update(dt, input) {
        // Camera orbit input
        if (input.mouse.down) {
            this.cameraYaw -= input.mouse.dx * 0.005;
            this.cameraPitch = THREE.MathUtils.clamp(this.cameraPitch - input.mouse.dy * 0.005, 0.1, 1.2);
        }
        this.cameraDistance = THREE.MathUtils.clamp(this.cameraDistance + input.wheel * 3, this.minCameraDistance, this.maxCameraDistance);

        // Movement relative to camera yaw
        const forward = input.forward() ? 1 : (input.back() ? -1 : 0);
        const right = input.right() ? 1 : (input.left() ? -1 : 0);
        let moved = false;
        if (forward !== 0 || right !== 0) {
            const angle = Math.atan2(right, forward) - this.cameraYaw + Math.PI / 2;
            const len = (input.run() ? this.runSpeed : this.speed) * dt;
            const vx = Math.cos(angle) * len;
            const vz = Math.sin(angle) * len;
            this.tryMove(vx, vz);
            this.facing.x = Math.cos(angle);
            this.facing.z = Math.sin(angle);
            // Rotate body to face movement
            this.group.rotation.y = Math.atan2(this.facing.x, this.facing.z);
            moved = true;
        }

        // Update camera position
        const target = this.group.position.clone().add(new THREE.Vector3(0, 1.2, 0));
        const dx = Math.cos(this.cameraPitch) * Math.sin(this.cameraYaw);
        const dz = Math.cos(this.cameraPitch) * Math.cos(this.cameraYaw);
        const dy = Math.sin(this.cameraPitch);
        const camPos = target.clone().add(new THREE.Vector3(dx, dy, dz).multiplyScalar(this.cameraDistance));
        // simple collision push: if camPos is below ground, raise it
        if (camPos.y < 1.5) camPos.y = 1.5;
        this.camera.position.copy(camPos);
        this.camera.lookAt(target);

        // Interaction (only when not moving or menu closed)
        if (!input.menuOpen) {
            this.updateInteractionPrompt();
            if (input.consumeInteract()) {
                this.interact();
            }
        } else {
            this.prompt = '';
            input.consumeInteract(); // swallow inputs while menu is open
        }

        // Collect drops underfoot
        const tx = this.world.worldToTileX(this.group.position.x);
        const tz = this.world.worldToTileZ(this.group.position.z);
        const drops = this.world.collectDropsAt(tx, tz);
        for (const itemId of drops) {
            this.addItem(itemId, 1);
        }
    }

    tryMove(dx, dz) {
        const pos = this.group.position;
        const newX = pos.x + dx;
        const newZ = pos.z + dz;
        // Collide separately
        if (!this.collides(newX, pos.z)) pos.x = newX;
        if (!this.collides(pos.x, newZ)) pos.z = newZ;
    }

    collides(x, z) {
        if (this.world.isSolidWorld(x - this.radius, z - this.radius)) return true;
        if (this.world.isSolidWorld(x + this.radius, z - this.radius)) return true;
        if (this.world.isSolidWorld(x - this.radius, z + this.radius)) return true;
        if (this.world.isSolidWorld(x + this.radius, z + this.radius)) return true;
        return false;
    }

    getFacingTile() {
        const px = this.group.position.x;
        const pz = this.group.position.z;
        const tx = this.world.worldToTileX(px + this.facing.x * 0.7);
        const tz = this.world.worldToTileZ(pz + this.facing.z * 0.7);
        return { tx, tz };
    }

    updateInteractionPrompt() {
        const { tx, tz } = this.getFacingTile();
        const dec = this.world.decorationAt(tx, tz);
        if (dec) {
            this.prompt = `Press Space to harvest ${dec.type}`;
        } else {
            this.prompt = '';
        }
    }

    getInteractionPrompt() { return this.prompt; }

    interact() {
        const { tx, tz } = this.getFacingTile();
        const dec = this.world.decorationAt(tx, tz);
        if (dec) {
            this.world.harvest(tx, tz);
        }
    }

    addItem(itemId, qty) {
        this.inventory[itemId] = (this.inventory[itemId] || 0) + qty;
    }
}

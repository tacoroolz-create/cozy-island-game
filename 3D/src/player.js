// Cozy Island 3D — player movement, camera, interaction
import * as THREE from 'three';
import { makeCharacter, makeBlobShadow } from './npc.js';
import { LANDMARKS, WATER_LEVEL, moveVector } from './island.js';

const WALK = 4.4;
const RUN = 7.6;
const RADIUS = 0.34;

export class Player {
    constructor(scene, world, camera) {
        this.world = world;
        this.camera = camera;

        const built = makeCharacter({ body: 0xf28ba0, accent: 0x4b3fa0, species: 'person' });
        this.group = built.group;
        this.limbs = built.limbs;
        this.shadow = makeBlobShadow(0.5);
        scene.add(this.group, this.shadow);

        // Start on the dock apron, so the first thing you do is walk into town.
        this.pos = new THREE.Vector3();
        this.smoothY = 0;
        this.placeAt(LANDMARKS.dockLanding.x + 3, LANDMARKS.dockLanding.z);
        this.facing = new THREE.Vector3(1, 0, 0);
        this.phase = 0;

        this.cameraYaw = -Math.PI / 2;   // looking east, down the path into town
        this.cameraPitch = 0.42;
        this.cameraDistance = 11;
        this.camAt = new THREE.Vector3().copy(this.pos);

        this.inventory = {};
        this.prompt = '';
        this.target = null;   // prop the prompt refers to
    }

    /** Put the player on the closest legal footing to (x,z). */
    placeAt(x, z) {
        const spot = this.world.nearestStandable(x, z, 14, RADIUS);
        if (!spot) return false;
        this.pos.set(spot.x, this.world.groundHeightAt(spot.x, spot.z), spot.z);
        this.smoothY = this.pos.y;
        return true;
    }

    update(dt, input, actors) {
        if (input.mouse.down) {
            this.cameraYaw -= input.mouse.dx * 0.006;
            this.cameraPitch = THREE.MathUtils.clamp(this.cameraPitch - input.mouse.dy * 0.005, 0.12, 1.15);
        }
        this.cameraDistance = THREE.MathUtils.clamp(this.cameraDistance + input.wheel * 4, 5, 22);

        this.move(dt, input);
        this.updateCamera(dt);
        this.aim(actors);

        for (const item of this.world.collectDropsNear(this.pos)) this.addItem(item, 1);
    }

    move(dt, input) {
        const fwd = (input.forward() ? 1 : 0) - (input.back() ? 1 : 0);
        const strafe = (input.right() ? 1 : 0) - (input.left() ? 1 : 0);
        const v = moveVector(this.cameraYaw, fwd, strafe);
        const moving = !!v;

        if (v) {
            const speed = input.run() ? RUN : WALK;
            this.step(v.x * speed * dt, v.z * speed * dt);
            this.facing.set(v.x, 0, v.z);
        }

        // Face the direction of travel, easing so turns don't snap.
        if (moving) {
            const want = Math.atan2(this.facing.x, this.facing.z);
            let d = want - this.group.rotation.y;
            while (d > Math.PI) d -= Math.PI * 2;
            while (d < -Math.PI) d += Math.PI * 2;
            this.group.rotation.y += d * Math.min(1, dt * 14);
        }

        this.phase += dt * (moving ? (input.run() ? 13 : 9) : 1.4);
        const swing = Math.sin(this.phase) * (moving ? 0.62 : 0.06);
        this.limbs.legs[0].rotation.x = swing;
        this.limbs.legs[1].rotation.x = -swing;
        this.limbs.arms[0].rotation.x = -swing * 0.8;
        this.limbs.arms[1].rotation.x = swing * 0.8;

        // Follow the ground, smoothed so slopes and the dock step read gently.
        const ground = this.world.groundHeightAt(this.pos.x, this.pos.z);
        this.smoothY += (ground - this.smoothY) * Math.min(1, dt * 12);
        this.pos.y = this.smoothY;
        this.group.position.copy(this.pos);
        if (moving) this.group.position.y += Math.abs(Math.sin(this.phase)) * 0.045;
        this.shadow.position.set(this.pos.x, ground + 0.03, this.pos.z);
    }

    /** Slide along obstacles instead of sticking to them. */
    step(dx, dz) {
        if (this.world.canStand(this.pos.x + dx, this.pos.z, RADIUS)) this.pos.x += dx;
        if (this.world.canStand(this.pos.x, this.pos.z + dz, RADIUS)) this.pos.z += dz;
    }

    updateCamera(dt) {
        // Follow a lagged point rather than the player directly — less seasick.
        this.camAt.lerp(this.pos, Math.min(1, dt * 7));
        const look = this.camAt.clone().add(new THREE.Vector3(0, 1.15, 0));
        const cp = Math.cos(this.cameraPitch);
        const offset = new THREE.Vector3(
            cp * Math.sin(this.cameraYaw),
            Math.sin(this.cameraPitch),
            cp * Math.cos(this.cameraYaw)
        ).multiplyScalar(this.cameraDistance);

        const camPos = look.clone().add(offset);
        // Never let the camera drop through the ground or under the sea.
        const floor = Math.max(this.world.groundHeightAt(camPos.x, camPos.z), WATER_LEVEL) + 1.4;
        if (camPos.y < floor) camPos.y = floor;
        this.camera.position.lerp(camPos, Math.min(1, dt * 12));
        this.camera.lookAt(look);
    }

    /** Work out what Space would act on right now, and phrase the prompt. */
    aim(actors) {
        const f = { x: this.facing.x, z: this.facing.z };
        let best = null, bestScore = Infinity;

        for (const a of actors) {
            if (a.group && a.group.visible === false) continue;
            const dx = a.pos.x - this.pos.x, dz = a.pos.z - this.pos.z;
            const d = Math.hypot(dx, dz);
            if (d > 3.0) continue;
            const dot = d < 0.001 ? 1 : (dx * f.x + dz * f.z) / d;
            if (dot < 0.1 && d > 1.3) continue;
            const score = d - dot * 1.4 - 0.8; // characters win ties against scenery
            if (score < bestScore) { bestScore = score; best = { actor: a, score }; }
        }

        const prop = this.world.interactableNear(this.pos, f);
        if (prop) {
            const d = Math.hypot(prop.x - this.pos.x, prop.z - this.pos.z);
            const dot = d < 0.001 ? 1 : ((prop.x - this.pos.x) * f.x + (prop.z - this.pos.z) * f.z) / d;
            const score = d - dot * 1.4;
            if (score < bestScore) { bestScore = score; best = { prop, score }; }
        }

        this.target = best;
        if (!best) { this.prompt = ''; return; }
        if (best.actor) this.prompt = `Space — talk to ${best.actor.name}`;
        else this.prompt = `Space — ${best.prop.label}`;
    }

    /** Returns a dialogue {name, text} to show, or null. */
    interact(hour) {
        const t = this.target;
        if (!t) return null;

        if (t.actor) {
            // Hoggy takes gifts; neighbours just talk.
            return t.actor.interact ? t.actor.interact(this.inventory) : t.actor.talk(hour);
        }

        const p = t.prop;
        if (p.item) {
            this.world.harvest(p);
            return null; // the drop speaks for itself
        }
        if (p.line) return { name: p.label, text: p.line };
        return null;
    }

    addItem(itemId, qty) {
        this.inventory[itemId] = (this.inventory[itemId] || 0) + qty;
    }
}

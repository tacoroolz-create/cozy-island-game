// Cozy Island 3D — player movement, camera, interaction
import * as THREE from 'three';
import { makeCharacter, makeBlobShadow } from './npc.js';
import { Inventory, ITEMS } from './items.js';
import * as Farming from './farming.js';
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

        this.inventory = new Inventory();
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

        for (const item of this.world.collectDropsNear(this.pos)) this.inventory.add(item, 1);
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
        if (best.actor) {
            const gift = best.actor.giftPrompt ? best.actor.giftPrompt(this.inventory) : null;
            this.prompt = gift || `Space — talk to ${best.actor.name}`;
            return;
        }
        // Tool-aware prop prompts
        const tool = this.inventory.activeTool();
        if (best.prop.kind === 'tree' && tool === 'axe' && !best.prop.stump) {
            this.prompt = 'Space — chop the tree';
            return;
        }
        if (best.prop.kind === 'shipping-bin') {
            const activeId = this.inventory.activeItem();
            const def = activeId ? ITEMS[activeId] : null;
            if (def && def.value) {
                this.prompt = `Space — ship ${def.name} for ${def.value}G`;
                return;
            }
        }
        const farm = this.world.facingFarmTile(this.pos, f);
        if (tool === 'hoe' && !Farming.hasSoil(farm.gx, farm.gz)) {
            this.prompt = 'Space — till the soil';
            return;
        }
        if (tool === 'watering_can' && Farming.hasSoil(farm.gx, farm.gz) && !Farming.isWatered(farm.gx, farm.gz)) {
            this.prompt = 'Space — water the crop';
            return;
        }
        if (tool && Farming.isSeed(tool) && Farming.canPlantHere(farm.gx, farm.gz)) {
            const name = ITEMS[tool] ? ITEMS[tool].name : tool;
            this.prompt = `Space — plant ${name}`;
            return;
        }
        if (Farming.canHarvestHere(farm.gx, farm.gz)) {
            const plot = Farming.getPlot(farm.gx, farm.gz);
            const def = plot ? ITEMS[plot.cropId] : null;
            this.prompt = def ? `Space — harvest ${def.name}` : 'Space — harvest crop';
            return;
        }
        this.prompt = `Space — ${best.prop.label}`;
    }

    /** Returns a dialogue {name, text} to show, or null. */
    interact(hour, day = 0) {
        const t = this.target;
        if (!t) return null;

        if (t.actor) {
            // If holding a gift, neighbours accept it; otherwise talk. Hoggy always eats gifts.
            return t.actor.interact ? t.actor.interact(this.inventory, hour) : t.actor.talk(hour);
        }

        const p = t.prop;

        // Enter houses (handled by main.js interior instance)
        if (p.kind === 'home' || p.kind === 'house') {
            if (this.onEnterHouse) this.onEnterHouse(p.kind === 'home' ? 'player' : p.label);
            return null;
        }

        // Shipping bin takes the active item.
        if (p.kind === 'shipping-bin') {
            const sold = this.world.shipHeldItem(this.inventory);
            if (sold) return { name: 'Shipping Bin', text: `Shipped ${ITEMS[sold.id].name} for ${sold.value}G.` };
            const active = this.inventory.activeItem();
            const def = active ? ITEMS[active] : null;
            if (!def || !def.value) return { name: 'Shipping Bin', text: 'Hold something worth money and try again.' };
            return { name: 'Shipping Bin', text: `You don't have a ${def.name} to ship.` };
        }

        // Tools: axe, hoe, can, seeds. Try tool first, fall through to harvest.
        const toolResult = this.useTool(day);
        if (toolResult) return toolResult;

        // Harvest farm crop if mature (no tool needed).
        const f = { x: this.facing.x, z: this.facing.z };
        const farm = this.world.facingFarmTile(this.pos, f);
        const cropId = Farming.canHarvestHere(farm.gx, farm.gz) ? Farming.harvest(farm.gx, farm.gz) : null;
        if (cropId) {
            this.inventory.add(cropId, 1);
            this.world.farmDirty = true;
            return { name: 'Harvest', text: `Harvested a ${ITEMS[cropId].name}!` };
        }

        if (p.item) {
            this.world.harvest(p);
            return null; // the drop speaks for itself
        }
        if (p.line) return { name: p.label, text: p.line };
        return null;
    }

    /** Quick add for collectables; tools/money go through this.inventory directly. */
    addItem(itemId, qty) { this.inventory.add(itemId, qty); }
    get money() { return this.inventory.wallet; }

    cycleTool(dir) { this.inventory.cycleActive(dir); }

    /** Dispatch a tool/seed use on the facing tile. Returns a result string or null. */
    useTool(day = 0) {
        const f = { x: this.facing.x, z: this.facing.z };
        const tool = this.inventory.activeTool();
        if (!tool) return null;

        if (tool === 'axe') {
            const result = this.world.chopTree(this.pos, f, day);
            if (!result) return null;
            if (!result.fell) return { name: 'Axe', text: `Thwack! ${result.remaining} more swings to fell it.` };
            return { name: 'Axe', text: 'Timber! The tree drops a log at your feet.' };
        }
        if (tool === 'hoe') {
            if (this.world.tillSoil(this.pos, f)) return { name: 'Hoe', text: 'You turn the grass into soft soil.' };
            const farm = this.world.facingFarmTile(this.pos, f);
            if (Farming.hasSoil(farm.gx, farm.gz)) return { name: 'Hoe', text: 'This spot is already tilled.' };
            return { name: 'Hoe', text: 'You can only till grass here.' };
        }
        if (tool === 'watering_can') {
            if (this.world.waterCrop(this.pos, f)) return { name: 'Watering Can', text: 'The soil darkens with water.' };
            const farm = this.world.facingFarmTile(this.pos, f);
            if (!Farming.hasSoil(farm.gx, farm.gz)) return { name: 'Watering Can', text: 'There is no soil to water.' };
            if (Farming.isWatered(farm.gx, farm.gz)) return { name: 'Watering Can', text: 'It is already watered.' };
            return null;
        }
        if (Farming.isSeed(tool)) {
            const cropId = this.world.plantSeed(this.pos, f, tool);
            if (cropId) {
                this.inventory.remove(tool, 1);
                return { name: 'Seed', text: `Planted ${ITEMS[cropId]?.name || cropId}.` };
            }
            const farm = this.world.facingFarmTile(this.pos, f);
            if (!Farming.hasSoil(farm.gx, farm.gz)) return { name: 'Seed', text: 'Plant seeds in tilled soil.' };
            if (Farming.hasPlot(farm.gx, farm.gz)) return { name: 'Seed', text: 'Something is already growing there.' };
            return null;
        }
        return null;
    }
}


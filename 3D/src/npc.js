// Cozy Island 3D — characters: the shared chibi rig, neighbours, and Hoggy 🐗
import * as THREE from 'three';
import { NEIGHBORS } from './world.js';
import { ITEMS } from './items.js';

const lambert = (color, opts = {}) => new THREE.MeshLambertMaterial({ color, ...opts });

/**
 * Big head, tiny body, huge eyes — the Animal Crossing read. Returns a group
 * plus the limbs so callers can drive the walk cycle.
 */
export function makeCharacter({ body = 0xffc0cb, head = null, accent = 0x4b0082, species = 'person' } = {}) {
    const g = new THREE.Group();
    const headColor = head ?? body;
    const bodyMat = lambert(body, { flatShading: true });
    const headMat = lambert(headColor, { flatShading: true });
    const darkMat = lambert(0x1b1b22);

    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.27, 0.3, 3, 8), bodyMat);
    torso.position.y = 0.5;
    torso.castShadow = true;
    g.add(torso);

    const skull = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1), headMat);
    skull.position.y = 1.06;
    skull.castShadow = true;
    g.add(skull);

    for (const dx of [-0.15, 0.15]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.072, 6, 5), darkMat);
        eye.position.set(dx, 1.11, 0.37);
        g.add(eye);
    }

    const limbs = { arms: [], legs: [] };
    for (const dx of [-0.32, 0.32]) {
        const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.24, 3, 6), bodyMat);
        arm.position.set(dx, 0.56, 0);
        arm.castShadow = true;
        g.add(arm);
        limbs.arms.push(arm);
    }
    for (const dx of [-0.13, 0.13]) {
        const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.095, 0.2, 3, 6), lambert(accent));
        leg.position.set(dx, 0.2, 0);
        leg.castShadow = true;
        g.add(leg);
        limbs.legs.push(leg);
    }

    addSpeciesFeatures(g, species, headMat, accent);
    return { group: g, limbs, head: skull };
}

function addSpeciesFeatures(g, species, headMat, accent) {
    const beakMat = lambert(0xffb74d, { flatShading: true });
    const mk = (geo, mat, x, y, z, rot) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
        m.castShadow = true;
        g.add(m);
        return m;
    };

    switch (species) {
        case 'rabbit':
            for (const dx of [-0.15, 0.15]) {
                mk(new THREE.CapsuleGeometry(0.075, 0.4, 3, 6), headMat, dx, 1.6, -0.02, [0, 0, dx * 1.1]);
            }
            break;
        case 'owl':
            mk(new THREE.ConeGeometry(0.1, 0.24, 5), beakMat, 0, 1.02, 0.42, [Math.PI / 2, 0, 0]);
            for (const dx of [-0.26, 0.26]) mk(new THREE.ConeGeometry(0.12, 0.24, 4), headMat, dx, 1.4, 0);
            break;
        case 'parrot':
            mk(new THREE.ConeGeometry(0.11, 0.26, 5), beakMat, 0, 1.0, 0.43, [Math.PI / 2, 0, 0]);
            mk(new THREE.ConeGeometry(0.13, 0.42, 4), lambert(accent, { flatShading: true }), 0, 1.55, -0.05, [-0.35, 0, 0]);
            break;
        case 'crane':
            mk(new THREE.CylinderGeometry(0.1, 0.13, 0.4, 6), headMat, 0, 0.85, 0);
            mk(new THREE.ConeGeometry(0.075, 0.34, 5), beakMat, 0, 1.05, 0.45, [Math.PI / 2, 0, 0]);
            break;
        case 'monster':
            for (const dx of [-0.2, 0.2]) {
                mk(new THREE.ConeGeometry(0.1, 0.34, 5), lambert(0xf2e2c0, { flatShading: true }), dx, 1.45, 0, [0, 0, dx * 1.4]);
            }
            break;
        case 'person':
            mk(new THREE.SphereGeometry(0.44, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
               lambert(accent, { flatShading: true }), 0, 1.1, 0);
            break;
    }
}

/** Shared walk cycle. `speed` 0 = idle breathing, >0 = stride. */
function animateLimbs(limbs, phase, speed) {
    const swing = Math.sin(phase) * Math.min(0.7, 0.25 + speed * 0.12);
    limbs.legs[0].rotation.x = swing;
    limbs.legs[1].rotation.x = -swing;
    limbs.arms[0].rotation.x = -swing * 0.8;
    limbs.arms[1].rotation.x = swing * 0.8;
}

/** Flat dark disc under a character — N64 blob shadow, cheaper than a shadow map. */
export function makeBlobShadow(radius = 0.5) {
    const geo = new THREE.CircleGeometry(radius, 12);
    geo.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
        color: 0x000000, transparent: true, opacity: 0.22, depthWrite: false,
    }));
    mesh.renderOrder = 1;
    return mesh;
}

// ---------------------------------------------------------------- wandering

/**
 * Steer toward a target, stopping short of anything solid. Shared by
 * neighbours and Hoggy — both amble, neither pathfinds.
 */
function amble(actor, world, dt, speed) {
    // If we're somehow standing in scenery, step out before doing anything
    // else — otherwise every move is blocked and the actor retargets forever.
    if (!world.canStand(actor.pos.x, actor.pos.z, 0.45)) {
        const free = world.nearestStandable(actor.pos.x, actor.pos.z);
        if (free) { actor.pos.x = free.x; actor.pos.z = free.z; }
    }

    const dx = actor.target.x - actor.pos.x;
    const dz = actor.target.z - actor.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.5) { actor.moving = false; return 0; }

    const step = speed * dt;
    const nx = actor.pos.x + (dx / d) * step;
    const nz = actor.pos.z + (dz / d) * step;
    if (world.canStand(nx, nz, 0.45)) {
        actor.pos.x = nx; actor.pos.z = nz;
        actor.facing = Math.atan2(dx, dz);
        actor.moving = true;
        return speed;
    }
    actor.retarget(world); // blocked — pick somewhere else
    return 0;
}

function randomSpotNear(world, cx, cz, radius, rng) {
    for (let i = 0; i < 12; i++) {
        const a = rng() * Math.PI * 2;
        const r = 2 + rng() * radius;
        const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
        if (world.canStand(x, z, 0.6)) return { x, z };
    }
    // The centre itself may be a building, so never fall back to it blindly.
    return world.nearestStandable(cx, cz, radius) ?? { x: cx, z: cz };
}

// ---------------------------------------------------------------- neighbours

const GREETINGS = {
    kawaii: [
        "Dreamer! You have the exact energy of a warm bun today.",
        "I picked a flower for you and then I got shy and put it back. It's the third one from the left.",
        "Do you ever just stand still and feel the island being nice at you?",
    ],
    tsundere: [
        "Oh. It's you. I wasn't waiting by the path or anything.",
        "Don't get sentimental, but the sunset was fine tonight. Fine. That's all.",
        "I saved you a spot on the good log. Not because I like you. It just had a spot.",
    ],
    nerd: [
        "Dreamer! I've been logging tide times. There's a pattern and it's going to ruin my week.",
        "Fun fact: this island has more species of moth than opinions, which is remarkable given who lives here.",
        "I catalogued every rock on the north shore. Two of them are, and I cannot stress this enough, suspicious.",
    ],
    monk: [
        "You arrived exactly when you arrived. That is the correct time.",
        "The well is deep and the day is wide. Sit with me a moment.",
        "I have been listening to the same wave for an hour. It has not repeated itself once.",
    ],
    cheerful: [
        "DREAMER! Big day! Huge day! I don't know why yet but I can feel it!",
        "I waved at a seagull and it waved back. Well. It flapped. Same thing.",
        "Guess what? Nothing! I just wanted to say your name out loud.",
    ],
};

const NIGHT_LINES = {
    kawaii:   "Shhh, the island's asleep. I'm just out here collecting the good quiet.",
    tsundere: "It's late. You should be home. ...I'll walk partway. Only partway.",
    nerd:     "Stars are out. Ask me anything. Please ask me something, I have so much prepared.",
    monk:     "Night is the same island with the volume turned down.",
    cheerful: "Nighttime! My second favourite time! First is all the other times!",
};

export class Neighbor {
    constructor(data, world, scene, rng) {
        this.data = data;
        this.name = data.name;
        this.rng = rng;
        const built = makeCharacter({
            body: data.body,
            accent: data.roof,
            species: data.species,
        });
        this.group = built.group;
        this.limbs = built.limbs;
        this.shadow = makeBlobShadow(0.46);
        scene.add(this.group, this.shadow);

        this.pos = randomSpotNear(world, data.home.x, data.home.z, 6, rng);
        this.facing = 0;
        this.phase = rng() * 6;
        this.moving = false;
        this.wait = rng() * 4;
        this.target = { ...this.pos };
        this.lineIdx = Math.floor(rng() * 3);
        this.indoors = false;
        this.friendship = 0;
        this.talkedToday = false;
        this.giftedToday = false;
    }

    retarget(world) {
        const spot = randomSpotNear(world, this.data.home.x, this.data.home.z, 11, this.rng);
        this.target = spot;
        this.wait = 1.5 + this.rng() * 4;
    }

    giftValue(itemId) {
        // Personality-based simple gifts
        const loved = {
            kawaii: new Set(['berry', 'banana', 'flower']),
            tsundere: new Set(['log', 'stone']),
            nerd: new Set(['seashell', 'stick']),
            monk: new Set(['fiber', 'flower']),
            cheerful: new Set(['banana', 'berry']),
        };
        if (loved[this.data.personality]?.has(itemId)) return 30;
        const def = ITEMS[itemId];
        if (def && def.value > 0) return 15;
        return 5;
    }

    giftPrompt(inventory) {
        // Only prompt gift if player is holding a non-tool item
        const active = inventory.activeItem();
        if (!active || active.startsWith('tool') || ITEMS[active]?.tool) return null;
        if (inventory.has(active, 1)) return `Space — give ${ITEMS[active]?.name || active} to ${this.name}`;
        return null;
    }

    /** Talk to or gift the neighbour. Inventory needed for gift checks. */
    interact(inventory, hour) {
        const active = inventory.activeItem();
        if (active && !ITEMS[active]?.tool && inventory.has(active, 1)) {
            if (this.giftedToday) return { name: this.name, text: "One gift per day, Dreamer. You're going to spoil me." };
            inventory.remove(active, 1);
            const gain = this.giftValue(active);
            this.friendship += gain;
            this.giftedToday = true;
            return { name: this.name, text: `For me? ${ITEMS[active]?.name || active}! That's... okay, that's really nice. (+${gain})` };
        }
        return this.talk(hour);
    }

    talk(hour) {
        if (!this.talkedToday) {
            this.friendship += 3;
            this.talkedToday = true;
        }
        if (hour >= 20 || hour < 6) {
            return { name: this.name, text: `${NIGHT_LINES[this.data.personality]} (Friendship ${this.friendship})` };
        }
        const pool = GREETINGS[this.data.personality];
        this.lineIdx = (this.lineIdx + 1) % pool.length;
        return { name: this.name, text: `${pool[this.lineIdx]} (Friendship ${this.friendship})` };
    }

    onNewDay() {
        this.talkedToday = false;
        this.giftedToday = false;
    }

    serialize() {
        return {
            friendship: this.friendship,
            talkedToday: this.talkedToday,
            giftedToday: this.giftedToday,
            indoors: this.indoors,
        };
    }

    deserialize(data) {
        if (typeof data.friendship === 'number') this.friendship = data.friendship;
        if (typeof data.talkedToday === 'boolean') this.talkedToday = data.talkedToday;
        if (typeof data.giftedToday === 'boolean') this.giftedToday = data.giftedToday;
        if (typeof data.indoors === 'boolean') this.indoors = data.indoors;
    }

    update(dt, world, hour) {
        // Home and out of sight overnight. Must be awake by the hour the day
        // starts at, or you spawn into an empty village.
        const shouldSleep = hour >= 22 || hour < 6;
        if (shouldSleep && !this.indoors) {
            this.target = world.nearestStandable(this.data.home.x, this.data.home.z, 8)
                       ?? { x: this.pos.x, z: this.pos.z };
            if (Math.hypot(this.pos.x - this.target.x, this.pos.z - this.target.z) < 0.8) {
                this.indoors = true;
            }
        } else if (!shouldSleep && this.indoors) {
            this.indoors = false;
            this.retarget(world);
        }
        this.group.visible = !this.indoors;
        this.shadow.visible = !this.indoors;
        if (this.indoors) return;

        this.wait -= dt;
        if (this.wait <= 0 && !this.moving) this.retarget(world);

        const speed = amble(this, world, dt, 1.6);
        if (speed > 0) this.phase += dt * 7;
        else this.phase += dt * 1.2;
        animateLimbs(this.limbs, this.phase, speed);

        const y = world.groundHeightAt(this.pos.x, this.pos.z);
        this.group.position.set(this.pos.x, y, this.pos.z);
        this.group.rotation.y = this.facing;
        this.shadow.position.set(this.pos.x, y + 0.03, this.pos.z);
    }

}

// ---------------------------------------------------------------- Hoggy

// Same routine as the 2D game: rooting in the morning, beach midday, pond at dusk.
const HOG_ROUTINE = [
    { until: 12, spot: { x: 4, z: -8 },  radius: 14, note: 'rooting' },
    { until: 18, spot: { x: -34, z: 6 }, radius: 9,  note: 'beach' },
    { until: 24, spot: { x: 22, z: 19 }, radius: 8,  note: 'pond' },
];

const HOG_LINES = [
    "Hoggy snuffles your shin with real commitment.",
    "Hoggy has found a stick. Hoggy is not sharing the stick.",
    "Hoggy flops sideways into the grass with the confidence of a much smaller animal.",
    "Hoggy looks at you. Hoggy looks at where food would be, if there were food. Hoggy looks back at you.",
    "Hoggy trots a small victory lap for no stated reason.",
];

const HOG_FAVORITES = new Set(['berry', 'banana', 'seashell', 'fiber']);

export class Hog {
    constructor(world, scene, rng) {
        this.name = 'Hoggy';
        this.rng = rng;
        this.friendship = 0;
        this.lineIdx = 0;
        this.pos = world.nearestStandable(6, -6, 14) ?? { x: 6, z: -6 };
        this.facing = 0;
        this.phase = 0;
        this.moving = false;
        this.wait = 0;
        this.target = { ...this.pos };

        const g = new THREE.Group();
        const hide = lambert(0x9b7a63, { flatShading: true });
        const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.5, 3, 8), hide);
        body.rotation.z = Math.PI / 2;
        body.position.y = 0.45;
        body.castShadow = true;
        g.add(body);

        const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 1), hide);
        head.position.set(0, 0.5, 0.55);
        head.castShadow = true;
        g.add(head);

        const snout = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.2, 6), lambert(0xd7a0a0));
        snout.rotation.x = Math.PI / 2;
        snout.position.set(0, 0.46, 0.82);
        g.add(snout);

        for (const dx of [-0.14, 0.14]) {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 5), lambert(0x1b1b22));
            eye.position.set(dx, 0.6, 0.76);
            g.add(eye);
            const ear = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.2, 4), hide);
            ear.position.set(dx * 1.4, 0.74, 0.42);
            g.add(ear);
        }

        this.legs = [];
        for (const dx of [-0.2, 0.2]) {
            for (const dz of [-0.28, 0.3]) {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.34, 5), lambert(0x6f5544));
                leg.position.set(dx, 0.17, dz);
                leg.castShadow = true;
                g.add(leg);
                this.legs.push(leg);
            }
        }

        const tail = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.03, 4, 8), hide);
        tail.position.set(0, 0.55, -0.55);
        g.add(tail);
        this.tail = tail;

        this.group = g;
        this.shadow = makeBlobShadow(0.55);
        scene.add(g, this.shadow);
    }

    routineFor(hour) {
        return HOG_ROUTINE.find(r => hour < r.until) ?? HOG_ROUTINE[0];
    }

    retarget(world) {
        const r = this.routineFor(this.hour ?? 8);
        this.target = randomSpotNear(world, r.spot.x, r.spot.z, r.radius, this.rng);
        this.wait = 1 + this.rng() * 3;
    }

    update(dt, world, hour) {
        this.hour = hour;
        this.wait -= dt;
        if (this.wait <= 0 && !this.moving) this.retarget(world);

        const speed = amble(this, world, dt, 2.1);
        this.phase += dt * (speed > 0 ? 9 : 1.5);
        const swing = Math.sin(this.phase) * (speed > 0 ? 0.55 : 0.06);
        this.legs[0].rotation.x = swing;
        this.legs[1].rotation.x = -swing;
        this.legs[2].rotation.x = -swing;
        this.legs[3].rotation.x = swing;
        this.tail.rotation.z = Math.sin(this.phase * 1.7) * 0.5;

        const y = world.groundHeightAt(this.pos.x, this.pos.z);
        this.group.position.set(this.pos.x, y, this.pos.z);
        this.group.rotation.y = this.facing;
        this.shadow.position.set(this.pos.x, y + 0.03, this.pos.z);
    }

    /** Feed him if you're holding something he likes, otherwise just say hello. */
    interact(inventory) {
        for (const item of HOG_FAVORITES) {
            if (inventory[item] > 0) {
                inventory[item]--;
                if (inventory[item] <= 0) delete inventory[item];
                this.friendship++;
                return {
                    name: 'Hoggy',
                    text: `You offer the ${item.replace('_', ' ')}. It is gone before you finish offering it. ` +
                          `Hoggy's tail is going like a metronome. (Friendship ${this.friendship})`,
                };
            }
        }
        this.lineIdx = (this.lineIdx + 1) % HOG_LINES.length;
        return { name: 'Hoggy', text: HOG_LINES[this.lineIdx] };
    }
}

/** Build every islander. Returns the neighbours and Hoggy in one bundle. */
export function populate(world, scene, rng) {
    const neighbors = NEIGHBORS.map(n => new Neighbor(n, world, scene, rng));
    return { neighbors, hog: new Hog(world, scene, rng) };
}

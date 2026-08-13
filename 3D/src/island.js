// Cozy Island 3D — the island's shape and layout, as pure math.
//
// No Three.js in here on purpose: terrain vertices, prop placement, NPC
// pathing and the player's footing all read heightAt(), so it has to be one
// function with one answer. Keeping it dependency-free also means it runs
// under plain node — see test/island.test.mjs.

export const WATER_LEVEL = 0;
export const SHORE = 47;        // nominal island radius, wobbled per angle
export const BEACH_W = 15;      // width of the shoreline ramp
export const SAND_INLAND = 7;   // sand runs this far in from the waterline
export const LAND_Y = 2.2;      // height of the grass plateau
export const HILL_AMP = 0.7;    // must stay well under LAND_Y or hollows flood

export const LANDMARKS = {
    plaza:       { x: 0,   z: 2 },
    dockLanding: { x: -45, z: 0 },
    playerHome:  { x: 11,  z: -13 },
    pond:        { x: 22,  z: 19 },
};

// The pier. Its deck is a fixed height so you can walk out over the water.
export const DOCK = { x0: -61, x1: -44, z0: -2.4, z1: 2.4, y: 0.95 };

export const NEIGHBORS = [
    { name: 'Mochi',   species: 'rabbit',  personality: 'kawaii',   body: 0xffe0e0, roof: 0xef9aa8, home: { x: -15, z: 19 } },
    { name: 'Grumble', species: 'monster', personality: 'tsundere', body: 0x78909c, roof: 0x4f6572, home: { x: -5,  z: -25 } },
    { name: 'Newton',  species: 'owl',     personality: 'nerd',     body: 0xeceff1, roof: 0x6d8fb0, home: { x: 24,  z: -3 } },
    { name: 'Lotus',   species: 'crane',   personality: 'monk',     body: 0xe0f7fa, roof: 0xc0a062, home: { x: -22, z: -9 } },
    { name: 'Sunny',   species: 'parrot',  personality: 'cheerful', body: 0xffeb3b, roof: 0xe07a3f, home: { x: 14,  z: 24 } },
];

// Dirt paths as waypoint chains. Tinted into the terrain and kept clear of
// props, so the island reads as lived-in rather than randomly forested.
export const PATHS = [
    [[-44, 0], [-34, 0], [-18, 3], [0, 2]],       // dock → plaza
    [[0, 2], [6, -5], [11, -11]],                 // plaza → your shack
    [[0, 2], [-7, 11], [-15, 17]],                // plaza → Mochi
    [[0, 2], [1, -12], [-5, -23]],                // plaza → Grumble
    [[11, -11], [18, -8], [24, -5]],              // your shack → Newton
    [[0, 2], [-12, -3], [-21, -7]],               // plaza → Lotus
    [[0, 2], [9, 11], [14, 22]],                  // plaza → Sunny
    [[14, 22], [16, 20]],                         // Sunny → the pond shore
];

// Ground that must be level: building pads, the plaza, the dock apron, the
// pond basin. `y` overrides the natural height; otherwise the zone levels to
// its own centre. Blending starts at `edge` (fraction of r) so there are no
// cliffs at the seams.
export const FLAT_ZONES = [
    { x: 0, z: 2, r: 11, edge: 0.5 },                         // village plaza
    { x: -45, z: 0, r: 6, y: 0.80, edge: 0.45 },              // sandy dock apron
    { x: 22, z: 19, r: 7, y: -1.10, edge: 0.5 },              // pond basin
    { x: LANDMARKS.playerHome.x, z: LANDMARKS.playerHome.z, r: 6, edge: 0.55 },
    ...NEIGHBORS.map(n => ({ x: n.home.x, z: n.home.z, r: 6, edge: 0.55 })),
];

export function smoothstep(t) { return t * t * (3 - 2 * t); }
export function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }

/** Small, fast, seeded PRNG — the island is identical on every visit. */
export function mulberry32(a) {
    return function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

/** How far inside the coastline a point is, in world units. Negative = sea. */
export function inlandAt(x, z) {
    const ang = Math.atan2(z, x);
    // Wobble the coastline so the island isn't an obvious circle.
    const wob = Math.sin(ang * 3 + 0.6) * 3.4
              + Math.sin(ang * 5 - 1.9) * 2.1
              + Math.sin(ang * 2 + 2.4) * 2.8;
    return (SHORE + wob) - Math.hypot(x, z * 1.1);
}

/** Natural terrain, before any levelling. */
export function baseHeight(x, z) {
    const inland = inlandAt(x, z);
    if (inland <= 0) return -0.8 - Math.min(7, -inland * 0.22); // seabed
    let h = smoothstep(clamp01(inland / BEACH_W)) * LAND_Y;
    // Rolling meadow, but only once clear of the beach ramp.
    const mask = clamp01((inland - BEACH_W) / 10);
    h += (Math.sin(x * 0.11 + 0.5) * Math.cos(z * 0.09 - 1.2)
        + Math.sin(x * 0.05 - z * 0.07) * 0.7) * HILL_AMP * mask;
    return h;
}

for (const zone of FLAT_ZONES) {
    zone.target = zone.y !== undefined ? zone.y : baseHeight(zone.x, zone.z);
}

/** Terrain height with building pads and the pond basin levelled in. */
export function heightAt(x, z) {
    let h = baseHeight(x, z);
    for (const zone of FLAT_ZONES) {
        const d = Math.hypot(x - zone.x, z - zone.z);
        if (d >= zone.r) continue;
        const inner = zone.r * zone.edge;
        const t = d <= inner ? 1 : 1 - smoothstep((d - inner) / (zone.r - inner));
        h += (zone.target - h) * t;
    }
    return h;
}

/**
 * 0 = solid grass, 1 = bare sand. Driven by distance from the shoreline
 * *and* proximity to any waterline, so the pond gets a sandy rim too.
 * Ground colour and prop placement both read this, so they always agree.
 */
export function sandiness(x, z) {
    const byShore = 1 - clamp01((inlandAt(x, z) - SAND_INLAND) / 3.5);
    const byWater = 1 - clamp01((heightAt(x, z) - 0.2) / 0.7);
    return Math.max(byShore, byWater);
}

/** 'sea' | 'sand' | 'grass' — the one classifier everything else uses. */
export function zoneAt(x, z) {
    if (heightAt(x, z) <= WATER_LEVEL) return 'sea';
    return sandiness(x, z) > 0.45 ? 'sand' : 'grass';
}

export function onDock(x, z) {
    return x >= DOCK.x0 && x <= DOCK.x1 && z >= DOCK.z0 && z <= DOCK.z1;
}

/** Walkable surface height: terrain, or the pier deck where it covers it. */
export function groundHeightAt(x, z) {
    const h = heightAt(x, z);
    return onDock(x, z) ? Math.max(h, DOCK.y) : h;
}

function distToSegment(px, pz, ax, az, bx, bz) {
    const dx = bx - ax, dz = bz - az;
    const len2 = dx * dx + dz * dz;
    const t = clamp01(len2 ? ((px - ax) * dx + (pz - az) * dz) / len2 : 0);
    return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}

export function distToPaths(x, z) {
    let best = Infinity;
    for (const path of PATHS) {
        for (let i = 0; i < path.length - 1; i++) {
            const d = distToSegment(x, z, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
            if (d < best) best = d;
        }
    }
    return best;
}

/**
 * Camera-relative movement basis. At yaw θ the camera sits at
 * (sinθ, ·, cosθ) from the player, so "into the screen" is its negation and
 * screen-right is that turned a quarter turn. Getting this backwards is what
 * made W walk toward the camera in the first prototype.
 */
export function cameraBasis(yaw) {
    const s = Math.sin(yaw), c = Math.cos(yaw);
    return { fx: -s, fz: -c, rx: c, rz: -s };
}

/** Unit-length XZ move vector for the given key state. Null when idle. */
export function moveVector(yaw, forward, strafe) {
    if (!forward && !strafe) return null;
    const { fx, fz, rx, rz } = cameraBasis(yaw);
    const x = fx * forward + rx * strafe;
    const z = fz * forward + rz * strafe;
    const len = Math.hypot(x, z);
    return { x: x / len, z: z / len };
}

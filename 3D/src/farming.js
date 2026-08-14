// Cozy Island 3D — farming loop: soil, seeds, water, growth, harvest 🌱
// Pure logic (no Three.js). World.js renders the overlays.

export const GRID = 1.5;                     // size of one farm tile in world units
export const GRID_MAX = 60;                  // keep farm cells in a reasonable range around origin

const CROP_DEFS = {
    turnip:     { name: 'Turnip',     seed: 'turnip_seed',  stages: 3, daysPerStage: 1, color: 0xffffff, sell: 60 },
    tomato:     { name: 'Tomato',     seed: 'tomato_seed',  stages: 3, daysPerStage: 1, color: 0xe84a3c, sell: 80, regrow: true },
    corn:       { name: 'Corn',       seed: 'corn_seed',    stages: 3, daysPerStage: 1, color: 0xffd54f, sell: 90 },
    strawberry: { name: 'Strawberry', seed: 'strawberry_seed', stages: 3, daysPerStage: 1, color: 0xd94f6a, sell: 150 },
};

const SEASON_CROP = {
    Sweet: 'turnip',
    Saucy: 'tomato',
    Cool:  'corn',
    Yeesh: 'strawberry',
};

const SEED_TO_CROP = {};
for (const id in CROP_DEFS) SEED_TO_CROP[CROP_DEFS[id].seed] = id;

let soil = new Set();        // keys "gx,gz"
let watered = new Set();     // keys watered today
let plots = new Map();       // key -> { gx, gz, cropId, stage }

function key(gx, gz) { return `${gx},${gz}`; }
export function gridToWorld(gx, gz) { return { x: gx * GRID, z: gz * GRID }; }
export function worldToGrid(x, z) {
    const gx = Math.round(x / GRID);
    const gz = Math.round(z / GRID);
    return { gx, gz };
}

export function getCropDef(id) { return CROP_DEFS[id]; }
export function cropForSeed(seedId) { return SEED_TO_CROP[seedId] || null; }
export function seasonCrop(season) { return SEASON_CROP[season] || 'turnip'; }
export function isSeed(id) { return id in SEED_TO_CROP; }

export function hasSoil(gx, gz) { return soil.has(key(gx, gz)); }
export function hasPlot(gx, gz) { return plots.has(key(gx, gz)); }
export function getPlot(gx, gz) { return plots.get(key(gx, gz)) || null; }
export function isWatered(gx, gz) { return watered.has(key(gx, gz)); }
export function allPlots() { return Array.from(plots.values()); }
export function allSoil() { return Array.from(soil).map(k => k.split(',').map(Number)); }

export function canTillHere(world, gx, gz) {
    if (Math.max(Math.abs(gx), Math.abs(gz)) > GRID_MAX) return false;
    const { x, z } = gridToWorld(gx, gz);
    if (world.zoneAt(x, z) !== 'grass') return false;
    if (world.distToPaths(x, z) < 1.0) return false;
    if (soil.has(key(gx, gz))) return false;
    // Don't till right under a solid prop.
    if (world.solidAt(x, z, 0.6)) return false;
    return true;
}

export function canPlantHere(gx, gz) {
    return soil.has(key(gx, gz)) && !plots.has(key(gx, gz));
}

export function canWaterHere(gx, gz) {
    return soil.has(key(gx, gz));
}

export function canHarvestHere(gx, gz) {
    const plot = plots.get(key(gx, gz));
    if (!plot) return false;
    const def = CROP_DEFS[plot.cropId];
    return def && plot.stage >= def.stages - 1;
}

export function till(gx, gz) {
    if (soil.has(key(gx, gz))) return false;
    soil.add(key(gx, gz));
    return true;
}

export function plant(gx, gz, seedId) {
    const cropId = SEED_TO_CROP[seedId];
    if (!cropId || !canPlantHere(gx, gz)) return null;
    const def = CROP_DEFS[cropId];
    plots.set(key(gx, gz), { gx, gz, cropId, stage: 0, days: 0, regrown: false });
    return cropId;
}

export function water(gx, gz) {
    if (!soil.has(key(gx, gz))) return false;
    watered.add(key(gx, gz));
    return true;
}

export function harvest(gx, gz) {
    const plot = plots.get(key(gx, gz));
    if (!plot) return null;
    const def = CROP_DEFS[plot.cropId];
    if (!def || plot.stage < def.stages - 1) return null;
    const cropId = plot.cropId;
    // Regrowing crops (tomato) reset to stage 1 after harvest and keep needing water.
    if (def.regrow) {
        plot.stage = 1;
        plot.regrown = true;
        watered.delete(key(gx, gz));
        return cropId;
    }
    plots.delete(key(gx, gz));
    return cropId;
}

export function removeCrop(gx, gz) {
    plots.delete(key(gx, gz));
}

export function removeSoil(gx, gz) {
    plots.delete(key(gx, gz));
    soil.delete(key(gx, gz));
    watered.delete(key(gx, gz));
}

export function onNewDay() {
    for (const [k, plot] of plots) {
        const def = CROP_DEFS[plot.cropId];
        if (!def) continue;
        if (watered.has(k)) {
            plot.days++;
            if (plot.days >= def.daysPerStage && plot.stage < def.stages - 1) {
                plot.stage++;
                plot.days = 0;
            }
        } else {
            // Drought stall: crops don't die, they just wait.
            plot.days = 0;
        }
    }
    watered.clear();
}

export function serialize() {
    return {
        soil: Array.from(soil),
        watered: Array.from(watered),
        plots: Array.from(plots.values()),
    };
}

export function deserialize(data) {
    soil = new Set(Array.isArray(data.soil) ? data.soil : []);
    watered = new Set();
    plots = new Map();
    const rawPlots = Array.isArray(data.plots) ? data.plots : [];
    for (const p of rawPlots) {
        const k = key(p.gx, p.gz);
        plots.set(k, { gx: p.gx, gz: p.gz, cropId: p.cropId, stage: p.stage ?? 0, days: p.days ?? 0, regrown: p.regrown || false });
    }
}

export function reset() {
    soil = new Set();
    watered = new Set();
    plots = new Map();
}

// ===== VERSIONED SAVE SYSTEM =====
// Migration-safe save/load with version numbering

const SAVE_VERSION = 9;
const SAVE_KEY = 'cozyIslandSave';          // legacy single-slot key (migrated to slot 0)

// ===== MULTI-SLOT SAVES =====
// Three named save slots. The active game writes to `currentSlot`, and the slot
// is labeled with `currentSaveName` (chosen when the player starts a new game).
const SAVE_SLOT_COUNT = 3;
function saveSlotKey(i) { return 'cozyIslandSave_' + i; }

let currentSlot = 0;        // which slot the active game saves to
let currentSaveName = '';   // display name for the active save

// Light-parse a slot's metadata for the menu without fully loading it.
// Returns { exists, name, timestamp, day }.
function getSaveSlotInfo(i) {
    try {
        const raw = localStorage.getItem(saveSlotKey(i));
        if (!raw) return { exists: false };
        const d = JSON.parse(raw);
        return {
            exists: true,
            name: d.saveName || ('Save ' + (i + 1)),
            timestamp: d.timestamp || 0,
            day: (d.world && d.world.day) || 1
        };
    } catch (e) {
        return { exists: false };
    }
}

function getAllSaveSlots() {
    const arr = [];
    for (let i = 0; i < SAVE_SLOT_COUNT; i++) arr.push(getSaveSlotInfo(i));
    return arr;
}

// One-time migration: fold a legacy single-slot save into slot 0 so existing
// players keep their game when slots are introduced.
function migrateLegacySave() {
    const legacy = localStorage.getItem(SAVE_KEY);
    if (!legacy) return;
    if (localStorage.getItem(saveSlotKey(0))) return; // don't clobber an existing slot 0
    try {
        const d = JSON.parse(legacy);
        if (!d.saveName) d.saveName = 'Save 1';
        d.slot = 0;
        localStorage.setItem(saveSlotKey(0), JSON.stringify(d));
        localStorage.removeItem(SAVE_KEY);
    } catch (e) { /* leave legacy data untouched on parse failure */ }
}
const MIGRATIONS = [
    // v1 → v2: added buildings
    function(data) {
        if (!data.buildings) data.buildings = [];
        return data;
    },
    // v2 → v3: added tool durability + treasure category
    function(data) {
        if (data.inventory && data.inventory.slots) {
            for (const slot of data.inventory.slots) {
                if (slot && ITEMS[slot.id] && ITEMS[slot.id].category === 'tool') {
                    if (typeof slot.durability !== 'number') {
                        slot.durability = ITEMS[slot.id].durability || 3;
                    }
                }
            }
        }
        return data;
    },
    // v3 → v4: added building interiors
    function(data) {
        if (data.buildings) {
            for (const bd of data.buildings) {
                if (!bd.interiorTiles) {
                    delete bd.interiorW;
                    delete bd.interiorH;
                }
            }
        }
        return data;
    },
    // v4 → v5: trees are now 2-tall (solid trunk + passable canopy)
    function(data) {
        if (data.world && data.world.tiles) {
            const tiles = data.world.tiles;
            for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
                if (!tiles[x]) continue;
                for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
                    const tile = tiles[x][y];
                    if (!tile) continue;
                    if (tile.type === 'tree' && !tile.isTreeTop && tile.solid === undefined) {
                        tile.solid = true;
                        const topY = y - 1;
                        if (topY >= 0 && topY < CONFIG.WORLD_HEIGHT && tiles[x][topY] && !tiles[x][topY].isTreeTop) {
                            tiles[x][topY] = {
                                type: 'tree',
                                variant: tile.variant || 0,
                                isTreeTop: true,
                                solid: false,
                                depleted: tile.depleted || false,
                                respawnAt: tile.respawnAt || null
                            };
                        }
                    }
                }
            }
        }
        return data;
    },
    // v5 → v6: removed flower/tulip/water decorations from world generation
    function(data) {
        if (data.world && data.world.tiles) {
            const tiles = data.world.tiles;
            for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
                if (!tiles[x]) continue;
                for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
                    const tile = tiles[x][y];
                    if (tile && (tile.type === 'flower' || tile.type === 'tulip' || tile.type === 'water')) {
                        tiles[x][y] = { type: 'grass', variant: 0 };
                    }
                }
            }
        }
        return data;
    },
    // v6 → v7: added wild hog and hog poop tiles
    function(data) {
        if (!data.hog) data.hog = { name: 'Hog', gridX: 50, gridY: 50, friendship: 0, dailyFed: false, named: false };
        if (!data.hogPoopTiles) data.hogPoopTiles = [];
        return data;
    },
    // v7 → v8: trees are now fully solid 2-tall stacks (canopy no longer passable)
    function(data) {
        if (data.world && data.world.tiles) {
            const tiles = data.world.tiles;
            for (let x = 0; x < CONFIG.WORLD_WIDTH; x++) {
                if (!tiles[x]) continue;
                for (let y = 0; y < CONFIG.WORLD_HEIGHT; y++) {
                    const tile = tiles[x][y];
                    if (!tile) continue;
                    if (tile.type === 'tree') {
                        tile.solid = true;
                        if (tile.isTreeTop) {
                            // Sync depleted/respawn state with the trunk tile below.
                            const trunkY = y + 1;
                            if (trunkY < CONFIG.WORLD_HEIGHT) {
                                const trunk = tiles[x][trunkY];
                                if (trunk && !trunk.isTreeTop) {
                                    tile.depleted = trunk.depleted || false;
                                    tile.respawnAt = trunk.respawnAt || null;
                                }
                            }
                        }
                    }
                }
            }
        }
        return data;
    },
    // v8 -> v9: garden plots are now persisted
    function(data) {
        if (!data.gardenPlots) data.gardenPlots = {};
        return data;
    }
    // Future migrations go here
];

function serializeGame() {
    // Persistence currently tracks the island map. If the player is standing in
    // another map (e.g. the underground city), momentarily swap the island back
    // in so the entity-global serialization below captures the island, never the
    // transient map. No frame renders between the swaps, so it's invisible.
    const activeMap = (typeof currentMapId !== 'undefined') ? currentMapId : 'island';
    if (typeof parkActiveMap === 'function') parkActiveMap(); // snapshot active entities
    let swappedOut = null;
    if (activeMap !== 'island' && typeof maps !== 'undefined' && maps.island) {
        swappedOut = activeMap;
        currentMapId = 'island';
        world = maps.island;
        loadMapEntities(world);
    }
    const data = {
        version: SAVE_VERSION,
        timestamp: Date.now(),
        currentMapId: activeMap,
        player: player.serialize(),
        world: world.serialize(),
        inventory: inventory.serialize(),
        buildings: buildings.map(b => b.serialize()),
        npcs: npcs.map(n => n.serialize()),
        knownMagic: knownMagic || [],
        birds: birds.map(b => ({ type: b.type, gridX: b.gridX, gridY: b.gridY, variant: b.variant, friendship: b.friendship })),
        crabs: crabs.map(c => ({ type: c.type, gridX: c.gridX, gridY: c.gridY, variant: c.variant })),
        turtles: turtles.map(t => ({ type: t.type, gridX: t.gridX, gridY: t.gridY, variant: t.variant })),
        seagulls: seagulls.map(s => ({ type: s.type, gridX: s.gridX, gridY: s.gridY, variant: s.variant })),
        butterflies: butterflies.map(b => ({ type: b.type, gridX: b.gridX, gridY: b.gridY, variant: b.variant })),
        cicadas: cicadas.map(c => ({ type: c.type, gridX: c.gridX, gridY: c.gridY, variant: c.variant })),
        groundLoot: groundLoot.slice(),
        hog: hog ? hog.serialize() : null,
        hogPoopTiles: hogPoopTiles.slice(),
        gardenPlots: (typeof gardenPlots !== 'undefined') ? gardenPlots : {}
    };
    // Persist any non-island maps (e.g. the underground city) so their layout
    // and placed buildings are stable across save/load. Entities were parked at
    // the top, so each map's `entities` holds its current buildings.
    data.extraMaps = {};
    if (typeof maps !== 'undefined') {
        for (const id in maps) {
            if (id === 'island') continue;
            const m = maps[id];
            const ents = m.entities || {};
            data.extraMaps[id] = {
                kind: m.kind,
                day: m.day, season: m.season, timeMinutes: m.timeMinutes,
                tiles: m.tiles,
                buildings: (ents.buildings || []).map(b => b.serialize())
            };
        }
    }
    // Restore the map the player was actually standing in.
    if (swappedOut) {
        currentMapId = swappedOut;
        world = maps[swappedOut];
        loadMapEntities(world);
    }
    return data;
}

function deserializeGame(data) {
    player = new Player(data.player.x, data.player.y);
    player.deserialize(data.player);

    world = new World('island', 'island');
    world.deserialize(data.world);
    // Reset the map registry to just the island, then restore any saved extra
    // maps (e.g. the underground city) so their layout/buildings are preserved.
    maps = { island: world };
    currentMapId = 'island';
    if (data.extraMaps) {
        for (const id in data.extraMaps) {
            const md = data.extraMaps[id];
            const m = new World('blank', id);   // 'blank' skips generation
            m.kind = md.kind || id;
            m.tiles = md.tiles;
            m.day = md.day; m.season = md.season; m.timeMinutes = md.timeMinutes;
            m.entities = { buildings: (md.buildings || []).map(bd => Building.deserialize(bd)) };
            maps[id] = m;
        }
    }

    inventory = new Inventory();
    if (data.inventory) inventory.deserialize(data.inventory);

    buildings = [];
    if (data.buildings) {
        for (const bd of data.buildings) {
            buildings.push(Building.deserialize(bd));
        }
    }

    npcs = [];
    if (data.npcs) {
        for (const nd of data.npcs) {
            npcs.push(NPC.deserialize(nd));
        }
    }

    knownMagic = data.knownMagic || [];

    birds = [];
    crabs = [];
    turtles = [];
    seagulls = [];
    butterflies = [];
    cicadas = [];
    groundLoot = [];
    _lastAnimalHour = null;
    if (data.birds) {
        for (const b of data.birds) birds.push(new Animal(b.type, b.gridX, b.gridY, b.variant || 0));
    }
    if (data.crabs) {
        for (const c of data.crabs) crabs.push(new Animal(c.type, c.gridX, c.gridY, c.variant || 0));
    }
    if (data.turtles) {
        for (const t of data.turtles) turtles.push(new Animal(t.type, t.gridX, t.gridY, t.variant || 0));
    }
    if (data.seagulls) {
        for (const s of data.seagulls) seagulls.push(new Animal(s.type, s.gridX, s.gridY, s.variant || 0));
    }
    if (data.butterflies) {
        for (const b of data.butterflies) butterflies.push(new Animal(b.type, b.gridX, b.gridY, b.variant || 0));
    }
    if (data.cicadas) {
        for (const c of data.cicadas) cicadas.push(new Animal(c.type, c.gridX, c.gridY, c.variant || 0));
    }
    if (data.groundLoot) groundLoot = data.groundLoot.slice();

    hog = null;
    hogPoopTiles = [];
    if (data.hog) {
        hog = Hog.deserialize(data.hog);
    }
    if (data.hogPoopTiles) {
        hogPoopTiles = data.hogPoopTiles.slice();
    }

    if (typeof gardenPlots !== 'undefined') {
        gardenPlots = data.gardenPlots || {};
    }
    if (typeof invalidateFertileCache === 'function') invalidateFertileCache();
}

function migrateSave(data) {
    let version = data.version || 1;
    while (version < SAVE_VERSION) {
        const migration = MIGRATIONS[version - 1];
        if (migration) {
            data = migration(data);
        }
        version++;
    }
    data.version = SAVE_VERSION;
    return data;
}

function enhancedSaveGame() {
    const data = serializeGame();
    data.saveName = currentSaveName || ('Save ' + (currentSlot + 1));
    data.slot = currentSlot;
    try {
        localStorage.setItem(saveSlotKey(currentSlot), JSON.stringify(data));
        world.showSaveIndicator = true;
        setTimeout(() => { world.showSaveIndicator = false; }, 2000);
    } catch(e) {
        console.error('Save failed:', e);
        notify('Save failed!');
    }
}

// Load a specific slot. On success, makes it the active slot.
function enhancedLoadGameFromSlot(i) {
    const saved = localStorage.getItem(saveSlotKey(i));
    if (!saved) return false;
    try {
        let data = JSON.parse(saved);
        data = migrateSave(data);
        deserializeGame(data);
        currentSlot = i;
        currentSaveName = data.saveName || ('Save ' + (i + 1));
        return true;
    } catch(e) {
        console.error('Load failed:', e);
        return false;
    }
}

// Back-compat: load whatever the active slot is.
function enhancedLoadGame() {
    return enhancedLoadGameFromSlot(currentSlot);
}

// Auto-save every 60 real seconds
let lastAutoSave = 0;
function autoSave() {
    if (gameState === STATE.PLAYING && millis() - lastAutoSave > 60000) {
        enhancedSaveGame();
        lastAutoSave = millis();
    }
}
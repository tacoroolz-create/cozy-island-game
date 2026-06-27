// ===== VERSIONED SAVE SYSTEM =====
// Migration-safe save/load with version numbering

const SAVE_VERSION = 4;
const SAVE_KEY = 'cozyIslandSave';
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
                    // Will be initialized by Building constructor on deserialize
                    // but we need to ensure the data triggers it
                    delete bd.interiorW;
                    delete bd.interiorH;
                }
            }
        }
        return data;
    }
    // Future migrations go here
];

function serializeGame() {
    return {
        version: SAVE_VERSION,
        timestamp: Date.now(),
        player: player.serialize(),
        world: world.serialize(),
        inventory: inventory.serialize(),
        buildings: buildings.map(b => b.serialize()),
        npcs: npcs.map(n => n.serialize()),
        knownMagic: knownMagic || []
    };
}

function deserializeGame(data) {
    player = new Player(data.player.x, data.player.y);
    player.deserialize(data.player);

    world = new World();
    world.deserialize(data.world);

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
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
        world.showSaveIndicator = true;
        setTimeout(() => { world.showSaveIndicator = false; }, 2000);
    } catch(e) {
        console.error('Save failed:', e);
        notify('Save failed!');
    }
}

function enhancedLoadGame() {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return false;
    try {
        let data = JSON.parse(saved);
        data = migrateSave(data);
        deserializeGame(data);
        return true;
    } catch(e) {
        console.error('Load failed:', e);
        return false;
    }
}

// Auto-save every 60 real seconds
let lastAutoSave = 0;
function autoSave() {
    if (gameState === STATE.PLAYING && millis() - lastAutoSave > 60000) {
        enhancedSaveGame();
        lastAutoSave = millis();
    }
}
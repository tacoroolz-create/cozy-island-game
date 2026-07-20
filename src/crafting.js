// Cozy Island Game - Crafting Module 🔨
// Defines RECIPES, craftRecipe(), and a branching drawCraftingTab() that replaces
// the placeholder in game.js. Hooks into globals: ITEMS, inventory, notify.
//
// Load this script AFTER game.js. It wraps window.keyPressed to add Crafting-tab
// navigation (arrows + Enter) without breaking the existing menu controls.
//
// ===== MENU STRUCTURE =====
// The Crafting tab is a branching menu:
//   Tools | Consumables | Home Improvement
// Home Improvement branches again into:
//   Expansion | Furniture | Decoration
// Every recipe is tagged with `cat` (top category) and, for Home items, `sub`.

// ===== RECIPES =====
// Each recipe: { output, name, desc, cat, sub?, inputs: [{id, count}] }
// Remodel recipes (Expansion) have `isRemodel: true` + `action(building)` instead
// of an `output`, and only appear while the player is inside a building.
const RECIPES = [
    // --- TOOLS ---
    {
        output: 'gettin_stick', cat: 'tools',
        name: "Gettin' Stick",
        desc: "A stick with a magnet on it. Pulls treasure from the water! (3 uses)",
        inputs: [ { id: 'magnet', count: 1 }, { id: 'stick', count: 1 }, { id: 'fiber', count: 5 } ]
    },
    { output: 'axe', cat: 'tools', name: 'Axe', desc: 'Chops wood faster.',
        inputs: [ { id: 'log', count: 1 }, { id: 'stick', count: 1 }, { id: 'stone', count: 1 } ] },
    { output: 'hoe', cat: 'tools', name: 'Hoe', desc: 'Tills soil for gardening.',
        inputs: [ { id: 'log', count: 1 }, { id: 'fiber', count: 5 } ] },
    { output: 'pickaxe', cat: 'tools', name: 'Pickaxe', desc: 'Mines rocks faster.',
        inputs: [ { id: 'stone', count: 2 }, { id: 'stick', count: 1 } ] },
    { output: 'shovel', cat: 'tools', name: 'Shovel', desc: 'Carve dirt paths across the grass.',
        inputs: [ { id: 'log', count: 1 }, { id: 'stone', count: 1 } ] },
    { output: 'pocket_watch', cat: 'tools', name: 'Pocket Watch',
        desc: 'Five broken watches, one working one. Shows the time while outdoors.',
        inputs: [ { id: 'broken_watch', count: 5 } ] },
    { output: 'grass_seed', cat: 'tools', name: 'Grass Seed', desc: 'Erase a dirt path back into grass.',
        inputs: [ { id: 'fiber', count: 10 } ] },

    // --- CONSUMABLES ---
    { output: 'grilled_banana', cat: 'consumables', name: 'Grilled Banana', desc: 'A sweet, warm treat.',
        inputs: [ { id: 'banana', count: 1 } ] },
    { output: 'berry_jam', cat: 'consumables', name: 'Berry Jam', desc: 'Cooked down from fresh berries.',
        inputs: [ { id: 'berry', count: 3 } ] },
    { output: 'fruit_salad', cat: 'consumables', name: 'Fruit Salad', desc: 'A cheerful bowl of mixed fruit.',
        inputs: [ { id: 'banana', count: 1 }, { id: 'berry', count: 2 } ] },

    // --- HOME IMPROVEMENT: Expansion (building materials) ---
    { output: 'thatch', cat: 'home', sub: 'expansion', name: 'Thatch', desc: 'A bundle of building material.',
        inputs: [ { id: 'fiber', count: 10 }, { id: 'log', count: 1 } ] },

    // --- HOME IMPROVEMENT: Furniture (solid floor pieces) ---
    { output: 'chair', cat: 'home', sub: 'furniture', name: 'Wooden Chair', desc: 'A simple wooden chair.',
        inputs: [ { id: 'log', count: 2 }, { id: 'fiber', count: 5 } ] },
    { output: 'armchair', cat: 'home', sub: 'furniture', name: 'Armchair', desc: 'A cushioned armchair.',
        inputs: [ { id: 'log', count: 2 }, { id: 'fiber', count: 15 } ] },
    { output: 'stool', cat: 'home', sub: 'furniture', name: 'Stool', desc: 'A little round stool.',
        inputs: [ { id: 'log', count: 1 }, { id: 'fiber', count: 5 } ] },
    { output: 'bench', cat: 'home', sub: 'furniture', name: 'Wooden Bench', desc: 'A long wooden bench.',
        inputs: [ { id: 'log', count: 3 }, { id: 'fiber', count: 5 } ] },
    { output: 'end_table', cat: 'home', sub: 'furniture', name: 'End Table', desc: 'A small bedside table.',
        inputs: [ { id: 'log', count: 2 }, { id: 'stick', count: 1 } ] },
    { output: 'coffee_table', cat: 'home', sub: 'furniture', name: 'Coffee Table', desc: 'A low center table.',
        inputs: [ { id: 'log', count: 3 }, { id: 'stick', count: 1 } ] },
    { output: 'bookshelf', cat: 'home', sub: 'furniture', name: 'Bookshelf', desc: 'Tall shelves of books.',
        inputs: [ { id: 'log', count: 4 }, { id: 'fiber', count: 5 } ] },
    { output: 'dresser', cat: 'home', sub: 'furniture', name: 'Dresser', desc: 'A drawer dresser.',
        inputs: [ { id: 'log', count: 4 }, { id: 'stone', count: 1 } ] },
    { output: 'cabinet', cat: 'home', sub: 'furniture', name: 'Side Cabinet', desc: 'A storage cabinet.',
        inputs: [ { id: 'log', count: 3 }, { id: 'stone', count: 1 } ] },
    { output: 'floor_lamp', cat: 'home', sub: 'furniture', name: 'Floor Lamp', desc: 'A warm standing lamp.',
        inputs: [ { id: 'stick', count: 2 }, { id: 'crystal', count: 1 } ] },
    { output: 'potted_plant', cat: 'home', sub: 'furniture', name: 'Potted Plant', desc: 'A leafy plant in a pot.',
        inputs: [ { id: 'fiber', count: 10 }, { id: 'stone', count: 1 }, { id: 'seed', count: 1 } ] },
    { output: 'fireplace', cat: 'home', sub: 'furniture', name: 'Fireplace', desc: 'A cozy stone fireplace.',
        inputs: [ { id: 'stone', count: 4 }, { id: 'log', count: 1 } ] },

    // --- HOME IMPROVEMENT: Decoration (wall hangings & rugs) ---
    { output: 'tapestry', cat: 'home', sub: 'decoration', name: 'Wall Tapestry', desc: 'A woven wall hanging.',
        inputs: [ { id: 'cloth', count: 2 } ] },
    { output: 'painting', cat: 'home', sub: 'decoration', name: 'Framed Painting', desc: 'Art for the wall.',
        inputs: [ { id: 'fiber', count: 5 }, { id: 'log', count: 1 }, { id: 'crystal', count: 1 } ] },
    { output: 'window', cat: 'home', sub: 'decoration', name: 'Window', desc: 'A glass window for the wall.',
        inputs: [ { id: 'stone', count: 1 }, { id: 'crystal', count: 1 } ] },
    { output: 'drapes', cat: 'home', sub: 'decoration', name: 'Drapes', desc: 'Flowing curtains.',
        inputs: [ { id: 'cloth', count: 2 } ] },
    { output: 'wall_clock', cat: 'home', sub: 'decoration', name: 'Wall Clock', desc: 'A ticking wall clock.',
        inputs: [ { id: 'stone', count: 1 }, { id: 'stick', count: 1 }, { id: 'crystal', count: 1 } ] },
    { output: 'wall_shelf', cat: 'home', sub: 'decoration', name: 'Wall Shelf', desc: 'A floating trinket shelf.',
        inputs: [ { id: 'log', count: 2 } ] },
    { output: 'round_rug', cat: 'home', sub: 'decoration', name: 'Round Rug', desc: 'A soft round floor rug.',
        inputs: [ { id: 'cloth', count: 2 } ] },
    { output: 'runner_rug', cat: 'home', sub: 'decoration', name: 'Runner Rug', desc: 'A long floor runner.',
        inputs: [ { id: 'cloth', count: 3 } ] },

    // --- ISLAND BUILDING ---
    {
        output: 'neighbor_shack', cat: 'island',
        name: "Neighbor's Shack",
        desc: 'A small shelter for a homeless neighbor. Equip it and click outside to place.',
        inputs: [ { id: 'log', count: 15 }, { id: 'stone', count: 10 }, { id: 'fiber', count: 40 } ]
    }
];

// ===== REMODEL RECIPES (Expansion — only available when inside a building) =====
// These don't produce an item — they modify the building directly.
const REMODEL_RECIPES = [
    {
        id: 'expand_width', cat: 'home', sub: 'expansion',
        name: 'Expand Width +1', desc: 'Add 1 tile of interior width.',
        inputs: [ { id: 'log', count: 3 }, { id: 'fiber', count: 10 } ],
        action: function(b) { b.expandInterior(1, 0); }
    },
    {
        id: 'expand_height', cat: 'home', sub: 'expansion',
        name: 'Expand Height +1', desc: 'Add 1 tile of interior height.',
        inputs: [ { id: 'log', count: 3 }, { id: 'fiber', count: 10 } ],
        action: function(b) { b.expandInterior(0, 1); }
    },
    {
        id: 'upgrade_house', cat: 'home', sub: 'expansion',
        name: 'Upgrade to House', desc: 'Change exterior from Shack to House.',
        inputs: [ { id: 'log', count: 8 }, { id: 'stone', count: 4 }, { id: 'thatch', count: 2 } ],
        action: function(b) { b.upgradeTo('house'); }
    }
];

// ===== CATEGORY DEFINITIONS =====
const CRAFT_CATEGORIES = [
    { id: 'tools',        name: 'Tools' },
    { id: 'consumables',  name: 'Consumables' },
    { id: 'home',         name: 'Home Improvement', subs: [
        { id: 'expansion',  name: 'Expansion' },
        { id: 'furniture',  name: 'Furniture' },
        { id: 'decoration', name: 'Decoration' }
    ] },
    { id: 'island',       name: 'Island Building' }
];

// Get the active recipe list — regular + remodel (only when inside a building).
function getActiveRecipes() {
    const recipes = RECIPES.map(r => ({ ...r, isRemodel: false }));
    if (typeof insideBuilding !== 'undefined' && insideBuilding) {
        for (const r of REMODEL_RECIPES) recipes.push({ ...r, isRemodel: true });
    }
    return recipes;
}

// ===== NAVIGATION STATE =====
// craftNav.cat / craftNav.sub are null until the player drills in.
let craftNav = { cat: null, sub: null };
let craftSelectedIndex = 0;

// Build the list of on-screen entries for the current navigation level.
// Each entry: { kind: 'cat'|'sub'|'back'|'recipe', name, ... }
function getCraftEntries() {
    const entries = [];
    // Top level: pick a category.
    if (craftNav.cat === null) {
        for (const c of CRAFT_CATEGORIES) {
            entries.push({ kind: 'cat', id: c.id, name: c.name, hasSub: !!c.subs });
        }
        return entries;
    }
    const cat = CRAFT_CATEGORIES.find(c => c.id === craftNav.cat);
    // Category has sub-categories and none chosen yet: pick a sub-category.
    if (cat && cat.subs && craftNav.sub === null) {
        entries.push({ kind: 'back', name: '◀ Back' });
        for (const s of cat.subs) entries.push({ kind: 'sub', id: s.id, name: s.name });
        return entries;
    }
    // Recipe level.
    entries.push({ kind: 'back', name: '◀ Back' });
    for (const r of getActiveRecipes()) {
        if (r.cat !== craftNav.cat) continue;
        if (cat && cat.subs && r.sub !== craftNav.sub) continue;
        entries.push({ kind: 'recipe', name: r.name, recipe: r });
    }
    return entries;
}

// Step back up one navigation level. Returns true if it moved.
function craftBack() {
    if (craftNav.sub !== null) { craftNav.sub = null; craftSelectedIndex = 0; return true; }
    if (craftNav.cat !== null) { craftNav.cat = null; craftSelectedIndex = 0; return true; }
    return false;
}

// Activate the entry at the given index (descend a level, go back, or craft).
function craftActivate(i) {
    const entries = getCraftEntries();
    const en = entries[i];
    if (!en) return;
    if (en.kind === 'cat') {
        craftNav.cat = en.id;
        craftNav.sub = null;
        craftSelectedIndex = 0;
    } else if (en.kind === 'sub') {
        craftNav.sub = en.id;
        craftSelectedIndex = 0;
    } else if (en.kind === 'back') {
        craftBack();
    } else if (en.kind === 'recipe') {
        craftRecipe(en.recipe);
    }
}

// ===== HELPERS =====

// Does the player's inventory currently hold every input for this recipe?
function canCraft(recipe) {
    if (!recipe) return false;
    return recipe.inputs.every(inp => inventory.hasItem(inp.id, inp.count));
}

// Returns the item color for an input id, falling back to grey.
function itemColor(id) {
    const it = ITEMS[id];
    return it ? it.color : '#9E9E9E';
}

// ===== CRAFT ACTION =====
// Crafts a single recipe object. Consumes inputs, grants the output (or applies
// a remodel), and notifies. Returns true on success.
function craftRecipe(recipe) {
    if (!recipe) return false;

    if (!canCraft(recipe)) {
        notify("Not enough materials for " + recipe.name + ".");
        return false;
    }

    // Remodel recipes must be performed inside a building.
    if (recipe.isRemodel && !(typeof insideBuilding !== 'undefined' && insideBuilding)) {
        notify("Go inside your home to do that.");
        return false;
    }

    // Consume all inputs.
    for (const inp of recipe.inputs) inventory.removeItem(inp.id, inp.count);

    // Remodel recipes modify the building directly.
    if (recipe.isRemodel) {
        if (recipe.action) recipe.action(insideBuilding);
        audioManager.playSFX('craft');
        notify("Remodeled: " + recipe.name + "!");
        return true;
    }

    // Grant the output item.
    const ok = inventory.addItem(recipe.output, 1);
    if (ok) {
        audioManager.playSFX('craft');
        notify("Crafted: " + ITEMS[recipe.output].name + "!");
    } else {
        // Roll back inputs if the inventory was full.
        for (const inp of recipe.inputs) inventory.addItem(inp.id, inp.count);
        notify("Inventory full!");
        return false;
    }
    return true;
}

// Legacy entry point kept for safety (indexes into the flat active recipe list).
function craftItem(recipeIndex) {
    const recipes = getActiveRecipes();
    return craftRecipe(recipes[recipeIndex]);
}

// ===== CRAFTING TAB UI =====
// Renders the branching menu. At category/sub levels it shows simple rows; at the
// recipe level it shows each recipe with its ingredient list and material blocks.
function drawCraftingTab(x, y, w, h) {
    // Header + breadcrumb
    fill(255);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    let crumb = 'Crafting';
    if (craftNav.cat) {
        const cat = CRAFT_CATEGORIES.find(c => c.id === craftNav.cat);
        crumb += ' > ' + (cat ? cat.name : craftNav.cat);
        if (craftNav.sub && cat && cat.subs) {
            const sub = cat.subs.find(s => s.id === craftNav.sub);
            crumb += ' > ' + (sub ? sub.name : craftNav.sub);
        }
    }
    text(crumb, x, y);

    fill(255);
    textSize(7);
    text('▲▼ select  ▶ open/craft', x + w - 92, y + 2);

    const entries = getCraftEntries();
    const listY = y + 16;
    const listH = h - 16;

    // Clamp selection into range.
    if (craftSelectedIndex >= entries.length) craftSelectedIndex = Math.max(0, entries.length - 1);

    // Recipe rows are taller (show ingredients); nav rows are compact.
    const atRecipeLevel = entries.some(e => e.kind === 'recipe');
    const rowH = atRecipeLevel ? 36 : 20;

    const maxRows = Math.floor(listH / rowH);
    // Simple scroll window so long lists (furniture) stay reachable.
    let startRow = 0;
    if (entries.length > maxRows) {
        startRow = Math.min(Math.max(0, craftSelectedIndex - Math.floor(maxRows / 2)), entries.length - maxRows);
    }

    for (let vi = 0; vi < Math.min(maxRows, entries.length); vi++) {
        const i = startRow + vi;
        const en = entries[i];
        if (!en) break;
        const ry = listY + vi * rowH;
        const selected = i === craftSelectedIndex;

        if (en.kind === 'recipe') {
            drawRecipeRow(en.recipe, x, ry, w, rowH, selected);
        } else {
            drawNavRow(en, x, ry, w, rowH, selected);
        }
    }

}

// A compact navigation row (category / sub-category / back).
function drawNavRow(entry, x, ry, w, rowH, selected) {
    fill(selected ? 60 : 34, selected ? 60 : 28, selected ? 80 : 40, 210);
    noStroke();
    rect(x, ry, w, rowH - 2);
    fill(selected ? '#B98DFF' : '#7E6BA8');
    rect(x, ry, 2, rowH - 2);
    if (selected) {
        stroke('#B6A6E0'); strokeWeight(1); noFill();
        rect(x, ry, w, rowH - 2); noStroke();
    }
    fill(entry.kind === 'back' ? 180 : 235, 235, 245);
    textAlign(LEFT, CENTER);
    textSize(9);
    textFont('Courier New');
    text(entry.name, x + 8, ry + (rowH - 2) / 2);
    // Chevron to signal further branching.
    if (entry.kind === 'cat' || entry.kind === 'sub') {
        fill(150);
        textAlign(RIGHT, CENTER);
        text('▶', x + w - 8, ry + (rowH - 2) / 2);
    }
}

// A full recipe row with ingredients and material blocks.
function drawRecipeRow(recipe, x, ry, w, rowH, selected) {
    const craftable = canCraft(recipe);

    if (selected) {
        fill(craftable ? 60 : 50, craftable ? 90 : 40, craftable ? 40 : 40, 220);
    } else if (recipe.isRemodel) {
        fill(40, 30, 50, 180);
    } else {
        fill(30, 24, 18, 180);
    }
    noStroke();
    rect(x, ry, w, rowH - 2);

    fill(craftable ? (recipe.isRemodel ? '#B98DFF' : '#7CB342') : '#555');
    rect(x, ry, 2, rowH - 2);

    if (selected) {
        stroke(craftable ? '#B6E38A' : '#999'); strokeWeight(1); noFill();
        rect(x, ry, w, rowH - 2); noStroke();
    }

    // Ingredient icons on the right: sprite in a colored block + owned/needed count.
    const blockSz = 14, gap = 3;
    const blocksW = recipe.inputs.length * (blockSz + gap);
    let bx = x + w - blocksW - 6;
    const by = ry + 3;
    for (const inp of recipe.inputs) {
        const owned = inventory.countItem(inp.id);
        const has = owned >= inp.count;
        noStroke();
        fill(has ? itemColor(inp.id) : '#444');
        rect(bx, by, blockSz, blockSz);
        drawItemIcon(inp.id, bx, by, blockSz);
        if (!has) { fill(0, 0, 0, 120); rect(bx, by, blockSz, blockSz); }
        // Requirement count only: green when we have enough, red when short.
        fill(has ? '#C8E6A0' : '#FF8A80');
        textAlign(CENTER, TOP);
        textSize(7);
        textFont('Courier New');
        text(inp.count, bx + blockSz / 2, by + blockSz + 1);
        bx += blockSz + gap;
    }

    // Name + description, kept clear of the icon column.
    const textW = w - 12 - blocksW;
    fill(craftable ? 255 : 140, craftable ? 255 : 140, craftable ? 200 : 140);
    textAlign(LEFT, TOP);
    textSize(9);
    textFont('Courier New');
    text(recipe.name, x + 6, ry + 1, textW, 11);
    fill(craftable ? 170 : 100);
    textSize(7);
    text(recipe.desc, x + 6, ry + 13, textW, 20);
}

// Hit-test a mouse click within the crafting list and activate the row.
// Called from mousePressed in game.js. Returns true if a row was hit.
function craftingTabClick(x, y, w, h) {
    const entries = getCraftEntries();
    const listY = y + 16;
    const listH = h - 16;
    const atRecipeLevel = entries.some(e => e.kind === 'recipe');
    const rowH = atRecipeLevel ? 36 : 20;
    const maxRows = Math.floor(listH / rowH);
    let startRow = 0;
    if (entries.length > maxRows) {
        startRow = Math.min(Math.max(0, craftSelectedIndex - Math.floor(maxRows / 2)), entries.length - maxRows);
    }
    for (let vi = 0; vi < Math.min(maxRows, entries.length); vi++) {
        const i = startRow + vi;
        const ry = listY + vi * rowH;
        if (mouseX >= x && mouseX < x + w && mouseY >= ry && mouseY < ry + rowH - 2) {
            craftSelectedIndex = i;
            craftActivate(i);
            return true;
        }
    }
    return false;
}

// ===== KEYBOARD HOOK =====
// On the Crafting tab: arrows move the selection, Enter opens/crafts, and
// Backspace / Left-arrow steps back a level. Escape and E still fall through so
// the menu can always close.
(function wrapCraftingKeys() {
    if (typeof window._cozyCraftingKeysWrapped !== 'undefined') return;
    window._cozyCraftingKeysWrapped = true;

    if (typeof window.keyPressed !== 'function') {
        setTimeout(wrapCraftingKeys, 0);
        return;
    }

    const orig = window.keyPressed;
    window.keyPressed = function () {
        if (typeof gameState !== 'undefined' && gameState === STATE.MENU &&
            typeof menuTab !== 'undefined' && menuTab === 1) {

            // Always let Escape / E close the menu, and Tab/Q/W switch tabs.
            if (keyCode === ESCAPE || keyCode === TAB || key === 'e' || key === 'E' ||
                key === 'q' || key === 'Q' || key === 'w' || key === 'W') {
                // Reset crafting navigation when leaving the tab/menu.
                if (keyCode === ESCAPE || key === 'e' || key === 'E') { craftNav = { cat: null, sub: null }; craftSelectedIndex = 0; }
                return orig.apply(this, arguments);
            }

            const entries = getCraftEntries();
            if (entries.length === 0) return false;

            if (keyCode === UP_ARROW) {
                craftSelectedIndex = (craftSelectedIndex - 1 + entries.length) % entries.length;
                return false;
            } else if (keyCode === DOWN_ARROW) {
                craftSelectedIndex = (craftSelectedIndex + 1) % entries.length;
                return false;
            } else if (keyCode === ENTER || keyCode === RETURN) {
                craftActivate(craftSelectedIndex);
                return false;
            } else if (keyCode === LEFT_ARROW || keyCode === BACKSPACE) {
                craftBack();
                return false;
            } else if (keyCode === RIGHT_ARROW) {
                // Descend into the highlighted category/sub if applicable.
                const en = entries[craftSelectedIndex];
                if (en && (en.kind === 'cat' || en.kind === 'sub')) craftActivate(craftSelectedIndex);
                return false;
            }
            return false;
        }
        return orig.apply(this, arguments);
    };
})();

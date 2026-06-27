// Cozy Island Game - Crafting Module 🔨
// Defines RECIPES, craftItem(), and a real drawCraftingTab() that replaces the
// placeholder in game.js. Hooks into globals: ITEMS, inventory, notify.
//
// Load this script AFTER game.js. It wraps window.keyPressed to add Crafting-tab
// navigation (arrows + Enter) without breaking the existing menu controls.

// ===== RECIPES =====
// Each recipe: { output: itemId, name, desc, inputs: [{id, count}] }
const RECIPES = [
    {
        output: 'gettin_stick',
        name: "Gettin' Stick",
        desc: "A stick with a magnet on it. Pulls treasure from the water! (3 uses)",
        inputs: [
            { id: 'magnet', count: 1 },
            { id: 'stick',  count: 1 },
            { id: 'fiber',  count: 1 }
        ]
    },
    {
        output: 'axe',
        name: 'Axe',
        desc: 'Chops wood faster.',
        inputs: [
            { id: 'log',   count: 1 },
            { id: 'stick', count: 1 },
            { id: 'stone', count: 1 }
        ]
    },
    {
        output: 'hoe',
        name: 'Hoe',
        desc: 'Tills soil for gardening.',
        inputs: [
            { id: 'log',   count: 1 },
            { id: 'fiber', count: 1 }
        ]
    },
    {
        output: 'pickaxe',
        name: 'Pickaxe',
        desc: 'Mines rocks faster.',
        inputs: [
            { id: 'stone', count: 2 },
            { id: 'stick', count: 1 }
        ]
    },
    {
        output: 'thatch',
        name: 'Thatch',
        desc: 'A bundle of building material.',
        inputs: [
            { id: 'fiber', count: 2 },
            { id: 'log',   count: 1 }
        ]
    }
];

// ===== REMODEL RECIPES (only available when inside a building) =====
// These don't produce an item — they modify the building directly.
const REMODEL_RECIPES = [
    {
        id: 'expand_width',
        name: 'Expand Width +1',
        desc: 'Add 1 tile of interior width.',
        inputs: [
            { id: 'log',   count: 3 },
            { id: 'fiber', count: 2 }
        ],
        action: function(b) { b.expandInterior(1, 0); }
    },
    {
        id: 'expand_height',
        name: 'Expand Height +1',
        desc: 'Add 1 tile of interior height.',
        inputs: [
            { id: 'log',   count: 3 },
            { id: 'fiber', count: 2 }
        ],
        action: function(b) { b.expandInterior(0, 1); }
    },
    {
        id: 'upgrade_house',
        name: 'Upgrade to House',
        desc: 'Change exterior from Shack to House.',
        inputs: [
            { id: 'log',    count: 8 },
            { id: 'stone',  count: 4 },
            { id: 'thatch', count: 2 }
        ],
        action: function(b) { b.upgradeTo('house'); }
    }
];

// Get the active recipe list — regular + remodel (if inside)
function getActiveRecipes() {
    const recipes = RECIPES.map(r => ({ ...r, isRemodel: false }));
    if (typeof insideBuilding !== 'undefined' && insideBuilding) {
        for (const r of REMODEL_RECIPES) {
            recipes.push({ ...r, isRemodel: true });
        }
    }
    return recipes;
}

// Currently selected recipe index in the Crafting tab.
let craftSelectedIndex = 0;

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
// Tries to craft the recipe at recipeIndex. Consumes inputs, adds output,
// and notifies the player. Returns true on success.
function craftItem(recipeIndex) {
    const recipes = getActiveRecipes();
    const recipe = recipes[recipeIndex];
    if (!recipe) return false;

    if (!canCraft(recipe)) {
        notify("Not enough materials for " + recipe.name + ".");
        return false;
    }

    // Consume all inputs.
    for (const inp of recipe.inputs) {
        inventory.removeItem(inp.id, inp.count);
    }

    // Remodel recipes modify the building directly.
    if (recipe.isRemodel) {
        if (typeof insideBuilding !== 'undefined' && insideBuilding && recipe.action) {
            recipe.action(insideBuilding);
            notify("Remodeled: " + recipe.name + "!");
        }
        return true;
    }

    // Grant the output.
    const ok = inventory.addItem(recipe.output, 1);
    if (ok) {
        notify("Crafted: " + ITEMS[recipe.output].name + "!");
    } else {
        // Roll back inputs if inventory was somehow full (shouldn't happen for tools).
        for (const inp of recipe.inputs) {
            inventory.addItem(inp.id, inp.count);
        }
        notify("Inventory full!");
        return false;
    }
    return true;
}

// ===== CRAFTING TAB UI =====
// Replaces the placeholder drawCraftingTab() in game.js.
// Layout: a scrollable-ish list of recipes. Each row shows the recipe name,
// its description, and a row of colored material blocks. Rows the player can
// craft are highlighted green; otherwise greyed out.
function drawCraftingTab(x, y, w, h) {
    // Header
    fill(200);
    textAlign(LEFT, TOP);
    textSize(10);
    textFont('Courier New');
    text('Crafting', x, y);

    fill(120);
    textSize(7);
    text('\u2191\u2193 select  \u23ce craft', x + w - 78, y + 2);

    const rowH = 30;
    const listY = y + 14;
    const listH = h - 14;

    const recipes = getActiveRecipes();

    // Clip-ish: only draw rows that fit (no fancy scrolling, just cap).
    const maxRows = Math.floor(listH / rowH);
    const visible = Math.min(recipes.length, maxRows);

    for (let i = 0; i < visible; i++) {
        const recipe = recipes[i];
        const ry = listY + i * rowH;
        const craftable = canCraft(recipe);
        const selected = i === craftSelectedIndex;

        // Row background
        if (selected) {
            fill(craftable ? 60 : 50, craftable ? 90 : 40, craftable ? 40 : 40, 220);
        } else if (recipe.isRemodel) {
            fill(40, 30, 50, 180); // slightly purple for remodel
        } else {
            fill(30, 24, 18, 180);
        }
        noStroke();
        rect(x, ry, w, rowH - 2);

        // Left accent bar (green if craftable, grey if not, purple for remodel)
        fill(craftable ? (recipe.isRemodel ? '#B98DFF' : '#7CB342') : '#555');
        rect(x, ry, 2, rowH - 2);

        // Selection border
        if (selected) {
            stroke(craftable ? '#B6E38A' : '#999');
            strokeWeight(1);
            noFill();
            rect(x, ry, w, rowH - 2);
            noStroke();
        }

        // Name + desc
        fill(craftable ? 255 : 140, craftable ? 255 : 140, craftable ? 200 : 140);
        textAlign(LEFT, TOP);
        textSize(9);
        textFont('Courier New');
        text(recipe.name, x + 6, ry + 2);
        fill(craftable ? 170 : 100);
        textSize(7);
        text(recipe.desc, x + 6, ry + 12, w - 6, 12);

        // Readable ingredient list: "3 Log + 2 Fiber"
        const ingText = recipe.inputs.map(inp => {
            const it = ITEMS[inp.id];
            const owned = inventory.countItem(inp.id);
            const name = it ? it.name : inp.id;
            return (owned >= inp.count ? '' : '⚠ ') + inp.count + ' ' + name;
        }).join(' + ');
        fill(craftable ? 200 : 120, craftable ? 230 : 100, craftable ? 200 : 120);
        textSize(7);
        text(ingText, x + 6, ry + 21, w - 6, 9);

        // Material blocks (colored squares + counts) on the right side.
        const blockSz = 7;
        const gap = 2;
        const blocksW = recipe.inputs.length * (blockSz + gap);
        let bx = x + w - blocksW - 6;
        const by = ry + 4;
        for (const inp of recipe.inputs) {
            const has = inventory.hasItem(inp.id, inp.count);
            // Block
            fill(has ? itemColor(inp.id) : '#444');
            noStroke();
            rect(bx, by, blockSz, blockSz);
            if (!has) {
                // dim overlay
                fill(0, 0, 0, 120);
                rect(bx, by, blockSz, blockSz);
            }
            bx += blockSz + gap;
        }
    }

    // Footer hint if no recipes visible
    if (RECIPES.length === 0) {
        fill(120);
        textAlign(CENTER, CENTER);
        textSize(8);
        text('No recipes yet.', x + w / 2, listY + listH / 2);
    }

    // Show "need more" feedback when selected but uncraftable
    const selectedRecipe = recipes[craftSelectedIndex];
    if (selectedRecipe && !canCraft(selectedRecipe)) {
        const need = selectedRecipe.inputs
            .filter(inp => inventory.countItem(inp.id) < inp.count)
            .map(inp => {
                const it = ITEMS[inp.id];
                const name = it ? it.name : inp.id;
                const short = Math.min(inp.count - inventory.countItem(inp.id), 99);
                return short + ' more ' + name;
            }).join(', ');
        if (need) {
            fill('#FF8A80');
            textAlign(LEFT, BOTTOM);
            textSize(8);
            text('Need: ' + need, x, y + h - 2);
        }
    }
}

// ===== KEYBOARD HOOK =====
// Wrap keyPressed so that on the Crafting menu tab, arrows move craftSelectedIndex
// and Enter crafts — instead of navigating inventory slots.
(function wrapCraftingKeys() {
    if (typeof window._cozyCraftingKeysWrapped !== 'undefined') return;
    window._cozyCraftingKeysWrapped = true;

    // Wait for game.js to define keyPressed before wrapping.
    if (typeof window.keyPressed !== 'function') {
        // Try again on the next tick (script load order safety).
        setTimeout(wrapCraftingKeys, 0);
        return;
    }

    const orig = window.keyPressed;
    window.keyPressed = function () {
        // Only intercept when the menu is open and the Crafting tab is active.
        if (typeof gameState !== 'undefined' && gameState === STATE.MENU &&
            typeof menuTab !== 'undefined' && menuTab === 1 &&
            typeof getActiveRecipes === 'function') {

            const recipes = getActiveRecipes();
            if (recipes.length === 0) return orig.apply(this, arguments);

            if (keyCode === UP_ARROW) {
                craftSelectedIndex = (craftSelectedIndex - 1 + recipes.length) % recipes.length;
                return false;
            } else if (keyCode === DOWN_ARROW) {
                craftSelectedIndex = (craftSelectedIndex + 1) % recipes.length;
                return false;
            } else if (keyCode === ENTER || keyCode === RETURN) {
                craftItem(craftSelectedIndex);
                return false;
            }
            // Allow Q/W tab switching to fall through to the original handler.
            if (key === 'q' || key === 'Q' || key === 'w' || key === 'W') {
                return orig.apply(this, arguments);
            }
            // Block left/right inventory nav while on crafting tab.
            if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
                return false;
            }
            return false;
        }
        return orig.apply(this, arguments);
    };
})();
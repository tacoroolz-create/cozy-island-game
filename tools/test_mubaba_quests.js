// Headless smoke test for Mubaba's quest flow (run: node tools/test_mubaba_quests.js).
// Stubs the p5/game globals, loads dialogue.js + magic.js, then walks the
// intro, all four trick quests, and World Domination end to end.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// ---- minimal game-world stubs ----
global.STATE = { PLAYING: 'playing', DIALOGUE: 'dialogue', INSIDE: 'inside' };
global.gameState = STATE.PLAYING;
global.notify = () => {};
global.millis = () => 0;
global.ITEMS = {
    log: { name: 'Log', category: 'material' },
    pinecone: { name: 'Pinecone', category: 'material' },
    banana: { name: 'Banana', category: 'gift' },
    crystal: { name: 'Crystal', category: 'material' },
    stardew: { name: 'Bottle of Stardew', category: 'treasure' },
    iou: { name: 'IOU', category: 'treasure' }
};
global.inventory = {
    slots: [],
    counts: {},
    hasItem(id, n) { return (this.counts[id] || 0) >= n; },
    removeItem(id, n) { this.counts[id] = (this.counts[id] || 0) - n; },
    addItem(id, n) { this.counts[id] = (this.counts[id] || 0) + n; return true; }
};
// keep inventory.slots in sync for transmutableCounts()
function setItem(id, count) {
    inventory.counts[id] = count;
    inventory.slots = Object.entries(inventory.counts)
        .filter(([, c]) => c > 0).map(([id, c]) => ({ id, count: c }));
}
global.world = { day: 1 };
global.npcs = [];
global.currentMapId = 'underground';
global.maps = { island: { entities: { npcs: [] } } };
global.getCurrentHoliday = () => null;
global.buildings = [];
global.player = { getFacingTile: () => null };
global.WRITTEN_DIALOGUES = {};
global.CHARACTER_DIALOGUES = {};
global.insideBuilding = null;

for (const f of ['dialogue.js', 'magic.js']) {
    // indirect eval runs in global scope; demote top-level let/const to var so
    // dialogueState, knownMagic, magicFlags etc. land on global for the test
    const src = fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8')
        .replace(/^let /gm, 'var ').replace(/^const /gm, 'var ');
    (0, eval)(src);
}

// ---- driver helpers ----
const mubaba = { id: 'mubaba', name: 'Mubaba', friendship: 0, isPresent: false, gainTalk() {} };
function currentText() {
    return dialogueState.advancedMenu
        ? dialogueState.advancedOptions.map(o => o.text)
        : getDialogueTree()[dialogueState.currentNode].text;
}
function choose(label) { // pick a dialogue choice or menu option by (partial) text
    if (dialogueState.advancedMenu) {
        const i = dialogueState.advancedOptions.findIndex(o => o.text.includes(label));
        assert(i >= 0, 'menu option not found: ' + label + ' in ' + currentText());
        dialogueState.advancedOptions[i].action();
    } else {
        const node = getDialogueTree()[dialogueState.currentNode];
        const i = node.choices.findIndex(c => c.text.includes(label));
        assert(i >= 0, 'choice not found: ' + label + ' at node ' + dialogueState.currentNode);
        selectDialogueChoice(i);
    }
}

// ---- intro: refusing boots you out, accepting is permanent ----
openMubabaMenu(mubaba);
assert(!dialogueState.advancedMenu && currentText().includes('I AM MUBABA'));
choose("don't really have a name");
choose('...');
assert(!dialogueState.active, 'refusal should end the conversation');
openMubabaMenu(mubaba);
choose('Neat. Can I help?');
assert(magicFlags.mubabaMet === true);
choose('...');
assert(dialogueState.advancedMenu, 'accepting should land on the quest table');

// ---- quest 1: unmet returns to table, met grants Tree Move ----
choose('Research the life on the surface');
choose("I'm on it");
assert(dialogueState.advancedMenu, 'unmet quest should return to the table');
setItem('log', 10); setItem('pinecone', 10); setItem('banana', 12);
choose('Research the life on the surface');
choose('Here you go.');
choose('...'); // ritual -> fizzle
choose('...'); // fizzle -> learn + close
assert(knownMagic.includes('tree_move'));
assert(inventory.counts.banana === 2, 'quest 1 should consume 10 of each');
assert(!dialogueState.active);

// ---- quests 2-4 ----
setItem('log', 60);
openMubabaMenu(mubaba); choose('Raising the Golem'); choose('Take these 50'); choose('...'); choose('...');
assert(knownMagic.includes('transmute') && inventory.counts.log === 10);
world.day = 161;
openMubabaMenu(mubaba); choose('Manipulate Time and Space'); choose('whole year'); choose('...'); choose('...');
assert(knownMagic.includes('change_time') && knownMagic.includes('change_season'));
maps.island.entities.npcs = Array.from({ length: 9 }, (_, i) => ({ id: i, isPresent: true, hasHome: true }));
openMubabaMenu(mubaba); choose('No Kings'); choose('9 friends'); choose('...'); choose('...');
assert(knownMagic.includes('banish'));

// ---- world domination ----
openMubabaMenu(mubaba);
assert(currentText().some(t => t === 'World Domination'), 'quest 5 appears once the four are done');
choose('World Domination'); choose('...');
assert(magicFlags.domStep === 1 && !dialogueState.active);
// banish "the Usurper" (any neighbor) via castBanish's hook
magicFlags.usurperBanished = false;
setItem('crystal', 5);
global.npcAtFacing = () => ({ id: 3, name: 'Pat', isPresent: true, hasHome: true });
castTrick('banish'); choose('Yes — banish Pat');
assert(magicFlags.usurperBanished === true, 'banishing during step 1 marks the usurper');
openMubabaMenu(mubaba); choose('World Domination'); choose('...');
assert(magicFlags.domStep === 2);
// no stardew yet -> reminder; with stardew -> hand it over, reach the IOU ask
openMubabaMenu(mubaba); choose('World Domination'); choose('Still looking');
assert(dialogueState.advancedMenu);
setItem('stardew', 1);
choose('World Domination');
assert(magicFlags.domStep === 3 && inventory.counts.stardew === 0);
choose('No way!'); choose('...');
assert(!dialogueState.active && !knownMagic.includes('teleport'));
// broke "Sure." fails gracefully; with 10 IOUs the spell backfires into Teleport
openMubabaMenu(mubaba); choose('World Domination'); choose('Sure.');
assert(!dialogueState.active && !knownMagic.includes('teleport'));
setItem('iou', 10);
openMubabaMenu(mubaba); choose('World Domination'); choose('Sure.'); choose('...'); choose('...');
assert(knownMagic.includes('teleport') && magicFlags.mubabaQuest === true && inventory.counts.iou === 0);

// ---- postgame: purely conversational ----
openMubabaMenu(mubaba);
assert(currentText().includes('I AM MUBABA'));
choose('that 10 you owe me');
choose('Uh huh.');
assert(!dialogueState.active);

console.log('All Mubaba quest checks passed.');

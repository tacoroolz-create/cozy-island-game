// ===== DIALOGUE SYSTEM =====
// Multi-turn conversations with NPCs, multiple choice answers

// Add dialogue state to STATE if not present
if (typeof STATE !== 'undefined' && !STATE.DIALOGUE) STATE.DIALOGUE = 'dialogue';

let dialogueState = {
    active: false,
    npc: null,
    currentNode: null,
    textRevealed: 0,
    selectedChoice: 0,
    choicesVisible: false,
    advancedMenu: false,
    advancedOptions: [],
    advancedSelected: 0
};

// Generate generic dialogue trees by personality type
function generateDialogue(personality, name) {
    const greetings = {
        friendly: [`Hi there! I'm ${name}. Lovely day, isn't it?`, `Hey! Great to see you again!`, `Hello friend! How are you doing?`],
        shy: [`Oh... hello. I'm ${name}...`, `H-hi. Nice to see you...`, `Um, hello again...`],
        grumpy: [`What do you want? I'm ${name}.`, `Hmph. Oh, it's you.`, `Yeah yeah, hi. I'm busy.`],
        cheerful: [`HEYA! I'm ${name}! So exciting!`, `Yay, a visitor! What's up?`, `Oh boy oh boy! Hi again!`],
        wise: [`Greetings. I am ${name}.`, `Ah, you've returned. Good.`, `Welcome back, young one.`],
        adventurous: [`Yo! Name's ${name}. Ready for adventure?`, `Hey explorer! What's the plan today?`, `Back again? Let's go exploring!`],
        dreamy: [`Oh... hello. I was just dreaming. I'm ${name}.`, `Mmm... hi. The clouds are pretty today.`, `You again? I had the most wonderful dream...`],
        jolly: [`Hohoho! I'm ${name}! How're ya?`, `Well well, look who it is! Come sit!`, `Another visit? I love company!`],
        quiet: [`...hi. ${name}.`, `...oh, hello.`, `...you came back.`]
    };

    const greets = greetings[personality] || greetings.friendly;

    return {
        start: {
            text: greets[0],
            choices: [
                { text: "How are you?", next: 'howare', friendshipDelta: 1 },
                { text: "Tell me about yourself.", next: 'about', friendshipDelta: 0 },
                { text: "What do you think of the island?", next: 'island', friendshipDelta: 0 },
                { text: "Goodbye!", next: null, friendshipDelta: 0 }
            ]
        },
        howare: {
            text: greets[1],
            choices: [
                { text: "That's great to hear!", next: 'happy', friendshipDelta: 1 },
                { text: "I'm doing well too.", next: 'mutual', friendshipDelta: 0 },
                { text: "Back to exploring.", next: null, friendshipDelta: 0 }
            ]
        },
        about: {
            text: `I'm just a simple ${personality} soul living on this island. I like it here.`,
            choices: [
                { text: "I like having you here.", next: 'happy', friendshipDelta: 2 },
                { text: "Interesting!", next: 'mutual', friendshipDelta: 0 },
                { text: "See you later.", next: null, friendshipDelta: 0 }
            ]
        },
        island: {
            text: `The island is peaceful. The seasons change, the sea sings, and there's always something to discover.`,
            choices: [
                { text: "It really is beautiful here.", next: 'happy', friendshipDelta: 1 },
                { text: "Any tips for a newcomer?", next: 'tips', friendshipDelta: 0 },
                { text: "I should get going.", next: null, friendshipDelta: 0 }
            ]
        },
        tips: {
            text: `Explore everywhere. Talk to everyone. And don't forget to pull treasure from the sea with your Gettin' Stick!`,
            choices: [
                { text: "Thank you, that's helpful!", next: 'happy', friendshipDelta: 1 },
                { text: "I'll keep that in mind.", next: null, friendshipDelta: 0 }
            ]
        },
        happy: {
            text: greets[2] || "I'm glad we talked!",
            choices: [
                { text: "Me too! See you soon.", next: null, friendshipDelta: 1 },
                { text: "Take care!", next: null, friendshipDelta: 0 }
            ]
        },
        mutual: {
            text: "It's nice spending time together on this little island.",
            choices: [
                { text: "Yeah, it really is.", next: null, friendshipDelta: 1 },
                { text: "Catch you later!", next: null, friendshipDelta: 0 }
            ]
        }
    };
}

function openDialogue(npc) {
    if (!npc || !npc.isPresent) return;
    dialogueState.active = true;
    dialogueState.npc = npc;
    dialogueState.currentNode = 'start';
    dialogueState.textRevealed = 0;
    dialogueState.selectedChoice = 0;
    dialogueState.choicesVisible = false;
    dialogueState.advancedMenu = false;
    gameState = STATE.DIALOGUE;

    // Apply talk friendship gain (once per day)
    npc.gainTalk();
}

function openAdvancedMenu(npc) {
    dialogueState.active = true;
    dialogueState.npc = npc;
    dialogueState.advancedMenu = true;
    dialogueState.advancedSelected = 0;
    dialogueState.advancedOptions = [
        { text: 'Talk', action: () => { dialogueState.advancedMenu = false; dialogueState.currentNode = 'start'; dialogueState.textRevealed = 0; dialogueState.selectedChoice = 0; dialogueState.choicesVisible = false; npc.gainTalk(); } },
        { text: 'Give Gift', action: () => { dialogueState.advancedMenu = false; giveGift(npc); } },
        { text: 'Challenge to Game', action: () => { dialogueState.advancedMenu = false; startMinigame(npc); } },
        { text: 'Cancel', action: () => { closeDialogue(); } }
    ];
    gameState = STATE.DIALOGUE;
}

function giveGift(npc) {
    const active = inventory.getActiveItem();
    if (!active) {
        notify('Nothing equipped to give!');
        closeDialogue();
        return;
    }
    // Generic gift value based on category
    const item = ITEMS[active.id];
    let value = item.category === 'food' ? 3 : item.category === 'material' ? 1 : 5;
    inventory.removeItem(active.id, 1);
    npc.gainGift(value);
    notify('Gave ' + item.name + ' to ' + npc.name + '! (+' + value + ' friendship)');
    closeDialogue();
}

function startMinigame(npc) {
    // Placeholder — will hook into games.js when available
    notify('Games coming soon! For now, just chatting.');
    closeDialogue();
}

function closeDialogue() {
    dialogueState.active = false;
    dialogueState.npc = null;
    dialogueState.advancedMenu = false;
    gameState = STATE.PLAYING;
}

function updateDialogue(dt) {
    if (!dialogueState.active || dialogueState.advancedMenu) return;
    if (!dialogueState.choicesVisible) {
        // Typewriter effect — reveal ~30 chars/sec
        const tree = getDialogueTree();
        const node = tree ? tree[dialogueState.currentNode] : null;
        if (node) {
            dialogueState.textRevealed += (30 * dt) / 1000;
            if (dialogueState.textRevealed >= node.text.length) {
                dialogueState.textRevealed = node.text.length;
                dialogueState.choicesVisible = true;
            }
        }
    }
}

function getDialogueTree() {
    if (!dialogueState.npc) return null;
    // Generate or retrieve tree for this NPC's personality
    if (!dialogueState.npc._dialogueTree) {
        dialogueState.npc._dialogueTree = generateDialogue(dialogueState.npc.personality, dialogueState.npc.name);
    }
    return dialogueState.npc._dialogueTree;
}

function drawDialogueScreen() {
    if (!dialogueState.active) return;

    // Bottom dialogue panel
    const panelH = 120;
    const panelY = height - panelH;

    fill(0, 0, 0, 200);
    noStroke();
    rect(0, panelY, width, panelH);

    stroke(180, 160, 120);
    strokeWeight(1);
    noFill();
    rect(0, panelY, width, panelH);
    noStroke();

    if (dialogueState.advancedMenu) {
        // Advanced interaction menu
        fill(255, 255, 200);
        textAlign(LEFT, TOP);
        textSize(10);
        textFont('Courier New');
        text(dialogueState.npc.name, 8, panelY + 6);

        for (let i = 0; i < dialogueState.advancedOptions.length; i++) {
            const opt = dialogueState.advancedOptions[i];
            const oy = panelY + 22 + i * 14;
            if (i === dialogueState.advancedSelected) {
                fill(255, 255, 100);
                text('\u25B6 ' + opt.text, 12, oy);
            } else {
                fill(200);
                text('  ' + opt.text, 12, oy);
            }
        }
        fill(120);
        textAlign(RIGHT, BOTTOM);
        textSize(7);
        text('Arrows: select  Enter: confirm  Esc: cancel', width - 4, height - 4);
        return;
    }

    // Normal dialogue
    const tree = getDialogueTree();
    if (!tree) return;
    const node = tree[dialogueState.currentNode];
    if (!node) return;

    // NPC portrait placeholder
    fill(dialogueState.npc.color);
    rect(8, panelY + 8, 24, 24);
    stroke(200);
    noFill();
    rect(8, panelY + 8, 24, 24);
    noStroke();

    // NPC name
    fill(255, 255, 200);
    textAlign(LEFT, TOP);
    textSize(14);
    textFont('Courier New');
    text(dialogueState.npc.name, 38, panelY + 6);

    // Text (typewriter)
    const visibleText = node.text.substring(0, Math.floor(dialogueState.textRevealed));
    fill(230);
    textSize(12);
    text(visibleText, 38, panelY + 24, width - 46, 44);

    // Choices
    if (dialogueState.choicesVisible) {
        for (let i = 0; i < node.choices.length; i++) {
            const ch = node.choices[i];
            const cy = panelY + 72 + i * 14;
            if (i === dialogueState.selectedChoice) {
                fill(255, 255, 100);
                text('\u25B6 ' + ch.text, 38, cy);
            } else {
                fill(200);
                text('  ' + ch.text, 38, cy);
            }
        }
        fill(120);
        textAlign(RIGHT, BOTTOM);
        textSize(9);
        text('Arrows: choose  Enter: select  Esc: exit', width - 4, height - 4);
    } else {
        fill(120);
        textAlign(RIGHT, BOTTOM);
        textSize(9);
        text('Enter: continue', width - 4, height - 4);
    }
}

function handleDialogueKey(keyCode, key) {
    if (!dialogueState.active) return false;

    if (dialogueState.advancedMenu) {
        if (keyCode === UP_ARROW) {
            dialogueState.advancedSelected = (dialogueState.advancedSelected - 1 + dialogueState.advancedOptions.length) % dialogueState.advancedOptions.length;
            return true;
        } else if (keyCode === DOWN_ARROW) {
            dialogueState.advancedSelected = (dialogueState.advancedSelected + 1) % dialogueState.advancedOptions.length;
            return true;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            const opt = dialogueState.advancedOptions[dialogueState.advancedSelected];
            if (opt.action) opt.action();
            return true;
        } else if (keyCode === ESCAPE) {
            closeDialogue();
            return true;
        }
        return true;
    }

    if (!dialogueState.choicesVisible) {
        // Skip typewriter
        if (keyCode === ENTER || keyCode === RETURN) {
            const tree = getDialogueTree();
            const node = tree[dialogueState.currentNode];
            dialogueState.textRevealed = node.text.length;
            dialogueState.choicesVisible = true;
            return true;
        } else if (keyCode === ESCAPE) {
            closeDialogue();
            return true;
        }
        return true;
    }

    // Choices visible
    const tree = getDialogueTree();
    const node = tree[dialogueState.currentNode];

    if (keyCode === UP_ARROW) {
        dialogueState.selectedChoice = (dialogueState.selectedChoice - 1 + node.choices.length) % node.choices.length;
        return true;
    } else if (keyCode === DOWN_ARROW) {
        dialogueState.selectedChoice = (dialogueState.selectedChoice + 1) % node.choices.length;
        return true;
    } else if (keyCode === ENTER || keyCode === RETURN) {
        const choice = node.choices[dialogueState.selectedChoice];
        // Apply friendship delta
        if (choice.friendshipDelta) {
            dialogueState.npc.friendship = Math.min(10, dialogueState.npc.friendship + choice.friendshipDelta);
        }
        if (choice.next === null) {
            closeDialogue();
        } else {
            dialogueState.currentNode = choice.next;
            dialogueState.textRevealed = 0;
            dialogueState.selectedChoice = 0;
            dialogueState.choicesVisible = false;
        }
        return true;
    } else if (keyCode === ESCAPE) {
        closeDialogue();
        return true;
    }
    return true;
}

// Check if player is facing an NPC
// NPCs are 1 wide, 2 tall, so we check both the tile at feet level and head level.
function npcAtFacing() {
    const facing = player.getFacingTile();
    if (!facing) return null;
    for (const npc of npcs) {
        if (!npc.isPresent) continue;
        // Feet tile
        if (npc.gridX === facing.x && npc.gridY === facing.y) return npc;
        // Head tile (one tile above feet)
        if (npc.gridX === facing.x && npc.gridY - 1 === facing.y) return npc;
    }
    return null;
}
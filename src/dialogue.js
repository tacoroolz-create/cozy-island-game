// ===== DIALOGUE SYSTEM =====
// Multi-turn conversations with NPCs, multiple choice answers

// Conversation typeface. 'Silkscreen' is the pixel webfont pulled in by the
// Google Fonts <link> in index.html; the fallbacks cover the moment before it
// loads (and offline). Swap the first name here to change the whole dialogue box.
const DIALOGUE_FONT = 'Silkscreen, "Courier New", monospace';

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

// ===== HOLIDAY GREETING HELPER =====
// Returns a short holiday-themed prefix that NPCs prepend to the start of any
// conversation. Each holiday gets its own comment bank; names hash to a stable
// comment per NPC so the same character isn't random from sentence to sentence.
function getHolidayGreetingPrefix(name) {
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (!holiday) return '';
    let comments;
    if (holiday.name === 'Garden Day') {
        comments = [
            "I've been saving my seeds all year!",
            "I ate sunflower seeds. Does that count?",
            "Today I'm planting everything. Even the spoons if they sprout.",
            "My pockets are full of seed packets and optimism.",
            "The soil feels extra wiggly today. I think it's excited, too."
        ];
    } else if (holiday.name === "Hoggy's Birthday") {
        comments = [
            "I gave Hoggy a turnip. He looked at it like it owed him money. Then he ate it.",
            "I brought him a moonlit beet. He snorted three times. That means he liked it.",
            "I tried to give him my spare sock. He refused. Politely.",
            "I left a carrot by his blanket. He inspected it for a solid minute before accepting.",
            "Happy birthday to Hoggy! I gave him a squash almost as big as he is.",
            "Hoggy deserves the world, but I'll start with this perfectly good radish.",
            "I sang to him very softly. He pretended to sleep, but his ears were listening.",
            "Hoggy's one year wiser and somehow even hungrier."
        ];
    } else if (holiday.name === 'Turtle Crossing Guard Day') {
        comments = [
            "Hold the line. This turtle is six hundred years late and doing fine.",
            "I saluted a turtle. It did not salute back. I am still proud.",
            "Softly now. They're carrying small dreams on their backs.",
            "Crossing guard duty today! I've never taken a job more seriously.",
            "One turtle down, several more to go. This is the best shift of my life.",
            "I gave a turtle a little leaf umbrella. It didn't use it, but the thought counts.",
            "Turtle traffic is slow, patient, and deeply correct. We could learn a lot.",
            "I waved a turtle across the path like I was directing a parade. It was a parade."
        ];
    } else if (holiday.name === 'The Returning Bird') {
        const friend = (typeof getReturningBirdFriend === 'function') ? getReturningBirdFriend() : null;
        if (friend && friend.name === name) {
            comments = [
                "That's my old friend out there. I'd know that hop anywhere.",
                "Sorry, I'm a little distracted — I have a reunion to get to.",
                "We used to be inseparable. I'm not letting a few years change that.",
                "I saved a breadcrumb from breakfast. That bird deserves the good stuff."
            ];
        } else {
            comments = [
                `I think ${friend ? friend.name : 'someone'} is pretending to remember that bird. Birds are like that.`,
                "There's a whole bird-reunion happening out there. Very touching. Very confusing.",
                "I saw someone talking to a bird like it owed them money. Sweet, honestly.",
                "I bet that bird remembers more people than it lets on.",
                "It's sweet how one returning bird can stop the whole island."
            ];
        }
    } else if (holiday.name === 'Compliment a Crab Day') {
        comments = [
            "I told the little crab by the dock its claws had real personality, and it waved at me.",
            "Have you complimented a crab yet? They pretend not to care, but you can tell they melt.",
            "I saw a crab holding a shell like a hat. I said it looked distinguished. It ran sideways, thrilled.",
            "The crabs are waiting, Dreamer. They need to hear something nice before noon.",
            "I practiced my crab compliments in the mirror. 'Marvelous pincers.' Needs work, I think.",
            "One crab let me sit nearby for a whole minute. That's basically a five-star review.",
            "I complimented a crab on its outfit. It was just sand. Still valid."
        ];
    } else if (holiday.name === 'Talk Like an Eagle Day') {
        comments = [
            "Kyaaaaa! Good morning, neighbor. That never gets old.",
            "Kyaaaaa! I've been screeching at clouds all morning and they seem impressed.",
            "Kyaaaaa! Do you think eagles get sore throats? I might need tea.",
            "Kyaaaaa! I tried to sound majestic in the store and knocked over a basket. Still majestic.",
            "Kyaaaaa! The eagles on the cliffs are probably wondering why we're so loud today.",
            "Kyaaaaa! I'll take that as a friendly hello.",
            "Kyaaaaa! Honoring the eagles means committing to the bit. No quiet sentences before sunset."
        ];
    } else if (holiday.name === 'Toast Toss Tournament') {
        comments = [
            "I have been practicing my toast toss all morning. My elbow is sore and my breakfast is missing.",
            "The beach targets are up! I always aim for the middle one because it looks the most polite.",
            "I brought a whole basket of stale bread. Let us make it rain breakfast.",
            "My throwing arm is ready. My dignity is not.",
            "If you see toast stuck in a palm tree, that one is mine. No take backs.",
            "I won a ribbon last year. It smelled like butter and regret."
        ];
    } else if (holiday.name === 'Snake Run Day') {
        comments = [
            "The snakes are extra zig-zaggy today. I respect their energy.",
            "I almost caught one by the big rock. It saw me coming and chose violence.",
            "If you catch a snake, the island gives you a gift. I assume the snake approves.",
            "I have been chasing a green one in circles. We are bonding, I think.",
            "They dart between trees like little ribbons with opinions.",
            "I am not fast, but I am persistent. The snake will respect that eventually."
        ];
    } else if (holiday.name === 'Backflip Day') {
        comments = [
            "Go ahead, say hello. I have been waiting all day to backflip at someone.",
            "I backflipped near a tree and the tree did not backflip back. Rude.",
            "I waved at a rock and it celebrated with a backflip. This island is magic.",
            "My knees are ready. My stomach is not. Let us do this.",
            "Everything flips today. I saw a crab go upside down out of pure holiday spirit.",
            "Interact with me. I promise a dignified, slightly wobbly backflip."
        ];
    } else if (holiday.name === 'Dig a Hole Day') {
        comments = [
            "I picked my hole for the year. It is already deeper than my last three decisions.",
            "They say if we dig deep enough, we reach somewhere new. I hope it has snacks.",
            "My pickaxe is singing. That might just be my arms complaining.",
            "Year after year the hole grows. I am basically an architect now.",
            "I dug for an hour and found sand. More sand. Very on theme.",
            "Do not fall in my hole. It is part hole, part lifestyle choice."
        ];
    } else if (holiday.name === 'Name the Island Day') {
        comments = [
            "I already have three names in mind. None of them are good, but one might win.",
            "Press P, propose a name, then come ask me. I am a swing voter.",
            "I heard someone suggested Sandwich Island. I am not opposed.",
            "Majority rules today, so I am being very popular on purpose.",
            "I voted for your name. I will deny this if asked by a cooler neighbor.",
            "Naming things is hard. I named my shadow once and it ignored me."
        ];
    } else if (holiday.name === 'Castle of Sticks Day') {
        comments = [
            "I have thirty-seven sticks and a dream. The twig tower will be glorious.",
            "A hundred sticks makes a whole second home. I am going to decorate mine with hope.",
            "I have been gathering twigs since sunrise. My pockets are full of pointy ambition.",
            "The twig tower is basically a castle if you squint and believe.",
            "I plan to put a tiny lamp in mine. Very cozy. Very structurally questionable.",
            "Help me find sticks. I am one short of a real wall and forty short of a roof."
        ];
    } else if (holiday.name === 'Clean Your Room Day') {
        comments = [
            "I moved one chair and the door let me out. Best holiday ever.",
            "My room is clean-ish. That is the highest honor I can give it.",
            "I put away a lamp and now I feel like a new person. A very tidy new person.",
            "The door was locked until I tidied. The door has standards now.",
            "I hid everything under my rug. Does that count? It should count.",
            "One piece of furniture moved, freedom earned. Efficiency."
        ];
    } else if (holiday.name === 'Lost Mail Day') {
        comments = [
            "If you find a soggy envelope with my name on it, I will be very grateful and slightly confused.",
            "Letters are washing up everywhere. It is like the ocean finally remembered us.",
            "I delivered one to the wrong neighbor by accident. They were polite about it.",
            "I hope someone finds a letter for me. I have always wanted mystery mail.",
            "The beach is full of sealed secrets today. Pick one up and play postmaster.",
            "I wrote a letter last year. It is probably still floating around out there."
        ];
    } else if (holiday.name === 'Day of the Island God') {
        comments = [
            "The big turtle is on the east beach. I bowed and then asked if it wanted a snack.",
            "Animal life doubled today. I stepped outside and immediately saw two of everything.",
            "I visited the Island God and it was very still and very wise. I felt judged in a nice way.",
            "The east beach feels holy today. Also sandy. But mostly holy.",
            "I left a flower near the giant turtle. It did not move, which I choose to interpret as approval.",
            "Have you paid your respects yet? The turtle remembers everything, probably."
        ];
    } else if (holiday.name === 'Sweet Valley') {
        comments = [
            "The beach altar's up, or at least it better be. I have a lot of feelings and nowhere to put them.",
            "I brought the first thing I pulled from the ground. That's harvest energy right there.",
            "They say the Island God is on its way. I tidied up my thoughts just in case.",
            "I hope the altar likes yams. I mean, I hope whoever counts the offerings likes yams.",
            "Sweet Valley makes the sand smell hopeful. Either that or it's the seaweed.",
            "I made my offering already. It was a beet. I think it heard me.",
            "No giant turtle in sight, but I can feel something big and slow being proud of us.",
            "Beach offerings today, beach snacks later. Balance."
        ];
    } else if (holiday.name === 'Peak Saucy') {
        comments = [
            "Longest day of the year and I still can't find my other sandal. Doesn't matter. The bonfire will understand.",
            "I'm walking the procession real slow. You can't rush gratitude. Also my legs are short.",
            "Sweet tea or lemonade? I brought both because commitment is hard.",
            "The bonfire's warm and so is my heart. Probably the bonfire, honestly.",
            "I love today because the sun stays up late and nobody yawns at anyone for it.",
            "I gave the longest day a little toast. It was sweet tea. The toast was my heart.",
            "Peak Saucy is just everyone wandering toward warmth together. That's the whole thing and it's perfect."
        ];
    } else if (holiday.name === 'Cool Valley') {
        comments = [
            "Memory walk tonight. I'm bringing a lantern and the time I found a perfect skipping stone.",
            "I left a little flower by the old rock. Not mourning, just saying hello to a good memory.",
            "The moon's coming up whether we're ready or not. That's the best kind of guest.",
            "I made enough sweet rice balls to share, or to accidentally eat on the way. We'll see.",
            "Lanterns on the path make everything feel like a story we already love.",
            "Cool Valley is for remembering without being sad about it. Like a cozy sigh.",
            "I hope someone leaves a memory at my favorite tree. It deserves to be noticed.",
            "Walking slow, eating slow, moon rising slow. Today is doing everything right."
        ];
    } else if (holiday.name === 'Peak Yeesh') {
        comments = [
            "Longest night of the year, but the Everburn's keeping the dark polite.",
            "I dragged a bigger log than usual to the fire pit. My back is mad, my heart is proud.",
            "Papa Yeesh is out there somewhere. Quiet. Judging my gift choices. Gently.",
            "I gave Hoggy an extra nice turnip this year. Just in case Papa Yeesh keeps a tally.",
            "The Evergreen boughs smell like every cozy night stacked on top of each other.",
            "Stay up till midnight, they say. I've been training my whole life for this.",
            "Peak Yeesh isn't about the dark. It's about making the biggest, warmest light possible.",
            "If Papa Yeesh leaves something by my door, I'm pretending to be surprised."
        ];
    } else if (holiday.name === 'Well-Wishing Garden') {
        const garden = (typeof wellWishGarden !== 'undefined') ? wellWishGarden : null;
        const spot = garden ? garden.spots.find(s => s.npcName === name) : null;
        if (spot && spot.filled && !spot.thanked) {
            spot.thanked = true;
            if (typeof npcs !== 'undefined') {
                const npc = npcs.find(n => n.name === name);
                if (npc && typeof npc.gainGift === 'function') npc.gainGift(3);
            }
            comments = [
                "A flower by my door? Did you... wish me well? Thank you, I think.",
                "There's a flower on my step. I have questions. I also have gratitude.",
                "Someone left me a flower. I'm choosing to believe it means something nice."
            ];
        } else if (spot && spot.filled) {
            comments = [
                "That flower's still there. I check on it more than I'd like to admit.",
                "My well-wishing flower is holding up nicely, thank you for asking."
            ];
        } else {
            comments = [
                "A gardener's going around encouraging well-wishes today. Very sweet, very odd.",
                "I heard someone's leaving flowers at doors today. Mine's still empty. No pressure.",
                "Today's about silent well-wishes, apparently. I could use one."
            ];
        }
    } else if (holiday.name === 'Memory Lantern Night') {
        const mln = (typeof memoryLanternNight !== 'undefined') ? memoryLanternNight : null;
        const lantern = mln ? mln.lanterns.find(l => l.npcName === name) : null;
        if (lantern && lantern.read) {
            comments = [
                "You read my lantern? I meant every word. Mostly.",
                "That lantern's mine. I've been quietly proud of it all evening.",
                "Careful with that memory, it's one of my good ones."
            ];
        } else if (lantern) {
            comments = [
                "My lantern's out there on the shore somewhere. Go find it.",
                "I put a little piece of myself in one of those lanterns tonight.",
                "The shore's glowing. One of those is mine, if you're curious."
            ];
        } else {
            comments = [
                "Lanterns all along the shore tonight. I didn't get one, but I read three.",
                "Someone's lighting up the beach with little paper memories. It's lovely.",
                "I walked the shore twice just to read every lantern."
            ];
        }
    } else if (holiday.name === 'The Picnic Reset') {
        const picnic = (typeof picnicReset !== 'undefined') ? picnicReset : null;
        const npcObj = (picnic && typeof npcs !== 'undefined') ? npcs.find(n => n.name === name) : null;
        const pair = (picnic && npcObj) ? picnic.pairs.find(p => p.npcAId === npcObj.id || p.npcBId === npcObj.id) : null;
        if (pair && pair.thanked) {
            comments = [
                "Someone overheard our whole conversation. No regrets.",
                "I've been sitting so long I forgot my legs work.",
                "This seat's the best one on the line. Don't tell the others."
            ];
        } else if (pair) {
            comments = [
                "The organizer put me right next to someone chatty. It's going fine.",
                "I'm parked on this blanket for the whole day, apparently.",
                "Come listen in sometime — the conversation's better than the potato salad."
            ];
        } else {
            comments = [
                "Everyone's lined up on one big picnic blanket today. I got here late.",
                "There's a whole snaking line of neighbors out there, chatting away.",
                "I heard the organizer moved every bench into one long row. Ambitious."
            ];
        }
    } else if (holiday.name === 'The Neighborhood Time Capsule') {
        const box = (typeof timeCapsuleBox !== 'undefined') ? timeCapsuleBox : null;
        const donated = box && box.neighborDonations.some(d => d.name === name);
        if (donated) {
            comments = [
                "I donated something to the box. I'm not telling you what.",
                "Whatever I put in that box, I stand by it completely. Mostly.",
                "The historian buried my contribution today. History will remember me kindly, I hope."
            ];
        } else {
            comments = [
                "A historian's burying a box of everyone's memories today. Very dramatic for a Tuesday.",
                "I heard there's an old box getting dug up somewhere. I forget what I put in the last one.",
                "Something about a time capsule? I wasn't paying attention, I was skipping stones."
            ];
        }
    } else if (holiday.name === 'Peak Saucy') {
        const ps = (typeof peakSaucy !== 'undefined') ? peakSaucy : null;
        const npcObj = (ps && typeof npcs !== 'undefined') ? npcs.find(n => n.name === name) : null;
        const served = ps && npcObj && ps.served.has(npcObj.id);
        if (served) {
            comments = [
                "That sweet tea you brought me really hit the spot. Longest day of the year, best cup I've had.",
                "Still thinking about that tea. You've got good timing.",
                "I keep glancing at the bonfire, half-hoping for a refill."
            ];
        } else {
            comments = [
                "There's an elder by the shore handing out sweet tea. Haven't gotten mine yet.",
                "Longest day of the year today. I could really go for something warm to drink.",
                "The bonfire's going strong. I hear the tea's the whole point."
            ];
        }
    } else if (holiday.name === 'Tourist Time!') {
        comments = [
            "I told a tourist the big rock is older than the sky. They believed me.",
            "Welcome to Cozy Island. Population: dreams. Main export: confusion.",
            "A tourist asked if the trees are made of clouds. I said yes.",
            "Shh. One of them thinks the moon is following him. Let him have that.",
            "I gave a tourist directions to somewhere that doesn't exist. They seemed thrilled anyway.",
            "A tourist asked where to leave his socks. I still don't have an answer for him."
        ];
    } else if (holiday.name === 'Familiar Seller') {
        const has = (typeof familiar !== 'undefined') && familiar && familiar.active;
        comments = has ? [
            `Is that ${familiar.name} following you around? It suits you.`,
            `That thing follows you like it owes you a secret. Where'd you find it?`,
            "I saw your familiar blink at me. I'm choosing to believe it likes me.",
            "One familiar a year, that's the rule. Glad you didn't miss your window.",
            `${familiar.name} has better posture than most of us, honestly.`
        ] : [
            "There's a druid by the dock selling familiars again. Very mysterious. Very overpriced.",
            "I've been saving IOUs all year for this. Wish me luck.",
            "Did you see the druid's cart? Something in there was definitely looking back at me.",
            "I don't trust anything that follows you forever, but I respect the commitment.",
            "One familiar a year, they said. I'm still deciding if I want the responsibility."
        ];
    } else {
        comments = [
            `Can you believe today is ${holiday.name}? I already started my preparations.`,
            `Hard to focus with ${holiday.name} going on. It's honestly beautiful.`,
            `I'm ${name}, and yes, I'm observing ${holiday.name} properly this year.`,
            `${holiday.name} always sneaks up on me. You celebrating?`,
            `Between you and me, ${holiday.name} is my favorite nonsense.`
        ];
    }
    const idx = Math.abs(name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % comments.length;
    return comments[idx] + ' ';
}

// ===== PER-CHARACTER DIALOGUE TREES =====
// Built from the CharacterDraft.txt cast. Each character gets at least 5 nodes.

function makeCharacterTree(name, species, personality, description) {
    // Truncate long strings for safety
    const p = (personality || '').substring(0, 200);
    const d = (description || '').substring(0, 200);
    const s = (species || '').substring(0, 60);

    // Generate a greeting from the first sentence of personality or a default
    let greeting = `Hi, I'm ${name}.`;
    if (p) {
        const firstSentence = p.split(/[.!?]/, 1)[0];
        if (firstSentence.length > 10) {
            greeting = firstSentence.trim();
            if (!/[.!?]$/.test(greeting)) greeting += '.';
        }
    }

    // Check for an active island holiday and inject flavor.
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    let holidayPrefix = '';
    let holidayComment = '';
    let holidayChoices = [];
    if (holiday) {
        holidayComment = getHolidayGreetingPrefix(name).trim();
        holidayPrefix = holidayComment ? holidayComment + ' ' : '';
        holidayChoices = [{ text: `What happens on ${holiday.name}?`, next: 'holiday', friendshipDelta: 0 }];
    }

    // Topic A: about themselves
    const aboutText = p ? p : `I'm just ${name}, a ${s}.`;
    // Topic B: about the island
    const islandText = `The island feels right for a ${s.toLowerCase()}. I can smell salt, metal, pollen... possibilities.`;
    // Topic C: a fun/quirky line
    const funText = d ? `Look at me: ${d.toLowerCase()}. I make an impression, don't I?` : `People always remember a ${s.toLowerCase()}.`;
    // Topic D: advice/wisdom
    const adviceText = `My advice? Stay curious, keep a snack handy, and never trust a door that opens both ways.`;
    // Topic E: holiday-specific blurb
    let holidayText;
    if (holiday && holiday.name === 'Garden Day') {
        holidayText = `${holiday.name}: ${holiday.desc} Best news: hoes never break today, so till until your thumbs turn green.`;
    } else if (holiday) {
        holidayText = `${holiday.name}: ${holiday.desc} I'd tell you more, but I think experiencing it is half the fun.`;
    } else {
        holidayText = `No holiday today. Just a regular, wonderfully strange island day.`;
    }

    const startChoices = [
        { text: "Tell me about yourself.", next: 'about', friendshipDelta: 0 },
        { text: "What do you think of the island?", next: 'island', friendshipDelta: 0 },
        { text: "You look... interesting.", next: 'fun', friendshipDelta: 1 },
        { text: "Any advice?", next: 'advice', friendshipDelta: 0 }
    ].concat(holidayChoices).concat([
        { text: "Goodbye!", next: null, friendshipDelta: 0 }
    ]);

    return {
        start: {
            text: `${holidayPrefix}${greeting} What do you want to talk about?`,
            choices: startChoices
        },
        holiday: {
            text: holidayText,
            choices: [
                { text: "That sounds wonderfully absurd.", next: 'happy', friendshipDelta: 1 },
                { text: "I'll keep an eye out.", next: 'mutual', friendshipDelta: 0 },
                { text: "I should go.", next: null, friendshipDelta: 0 }
            ]
        },
        about: {
            text: aboutText,
            choices: [
                { text: "That suits you.", next: 'happy', friendshipDelta: 1 },
                { text: "Tell me more.", next: 'deep', friendshipDelta: 0 },
                { text: "I should go.", next: null, friendshipDelta: 0 }
            ]
        },
        island: {
            text: islandText,
            choices: [
                { text: "It is peaceful here.", next: 'happy', friendshipDelta: 1 },
                { text: "Have you found anything weird?", next: 'secrets', friendshipDelta: 0 },
                { text: "See you around.", next: null, friendshipDelta: 0 }
            ]
        },
        fun: {
            text: funText,
            choices: [
                { text: "You absolutely do.", next: 'happy', friendshipDelta: 1 },
                { text: "A little strange, honestly.", next: 'mutual', friendshipDelta: 0 },
                { text: "Bye.", next: null, friendshipDelta: 0 }
            ]
        },
        advice: {
            text: adviceText,
            choices: [
                { text: "Wise words.", next: 'happy', friendshipDelta: 1 },
                { text: "I'll remember that.", next: 'mutual', friendshipDelta: 0 },
                { text: "Thanks, goodbye.", next: null, friendshipDelta: 0 }
            ]
        },
        deep: {
            text: `There's more to me than ${s.toLowerCase()} first impressions. I have dreams, doubts, and a favorite mug.`,
            choices: [
                { text: "I'm glad you shared that.", next: 'happy', friendshipDelta: 2 },
                { text: "Everyone has layers.", next: 'mutual', friendshipDelta: 1 },
                { text: "That's enough for now.", next: null, friendshipDelta: 0 }
            ]
        },
        secrets: {
            text: `I've seen shadows moving under the pier and heard beeps from the rocks. This island is alive with secrets.`,
            choices: [
                { text: "Let's investigate sometime.", next: 'happy', friendshipDelta: 1 },
                { text: "Probably just the wind.", next: 'mutual', friendshipDelta: 0 },
                { text: "Stay safe.", next: null, friendshipDelta: 0 }
            ]
        },
        happy: {
            text: `Talking with you makes this place feel a little more like home. Come find me again.`,
            choices: [
                { text: "I will. Take care!", next: null, friendshipDelta: 1 },
                { text: "Bye!", next: null, friendshipDelta: 0 }
            ]
        },
        mutual: {
            text: `Sure is. Let's both keep our eyes open out here.`,
            choices: [
                { text: "Agreed. Goodbye.", next: null, friendshipDelta: 0 },
                { text: "Talk later.", next: null, friendshipDelta: 0 }
            ]
        }
    };
}

// Registry mapping each character name to its tree factory.
const CHARACTER_DIALOGUES = {
    "Piko": () => makeCharacterTree("Piko", "Robot", "Piko is a kawaii (female) robot. A bubblegum-pink robot with heart-shaped LED eyes and tiny antennae. She lights up when Dreamer walks by and likes to watch butterflies near flowers.", "A bubblegum-pink robot with heart-shaped LED eyes and tiny antennae."),
    "Rivet": () => makeCharacterTree("Rivet", "Robot", "Rivet is a tsundere (female) robot. A clanky crimson robot with one loose rivet above her eye. She watches the island trees while muttering that she is only counting leaves because someone has to.", "A clanky crimson robot with one loose rivet above her eye."),
    "Shade-7": () => makeCharacterTree("Shade-7", "Robot", "Shade-7 is a goth (female) robot. A matte-black robot with spiderweb etchings and a single dim violet optic. She spends quiet afternoons near the water, reciting poems to herself.", "A matte-black robot with spiderweb etchings and a single dim violet optic."),
    "Cypher": () => makeCharacterTree("Cypher", "Robot", "Cypher is a nerd robot. A compact teal robot with thick glass-lens spectacles. He notices every cloud shape and happily tells Dreamer what they resemble.", "A compact teal robot with thick glass-lens spectacles."),
    "Om-Bit": () => makeCharacterTree("Om-Bit", "Robot", "Om-Bit is a monk robot. A brass robot with a weathered chassis. He sits very still with his hands folded, as if meditating, and speaks in slow, thoughtful sentences.", "A brass robot with a weathered chassis."),
    "Sir Cogs-a-Lot": () => makeCharacterTree("Sir Cogs-a-Lot", "Robot", "Sir Cogs-a-Lot is a medieval robot. A brass robot with a tiny plume on his head. He walks with a proud posture, calls everyone \"fair traveler,\" and compliments the island's trees.", "A brass robot with a tiny plume on his head."),
    "Tinker": () => makeCharacterTree("Tinker", "Robot", "Tinker is a shy robot. A small, slightly rusted robot with squeaky joints. He stays near bushes and watches the birds, waving shyly when Dreamer says hello.", "A small, slightly rusted robot with squeaky joints."),
    "Zap-Zap": () => makeCharacterTree("Zap-Zap", "Robot", "Zap-Zap is a cheerful (female) robot. A bright yellow robot with zigzag antennae. She laughs in crackles, greets everyone loudly, and enjoys sunny mornings on the beach.", "A bright yellow robot with zigzag antennae."),
    "Boo-Boo": () => makeCharacterTree("Boo-Boo", "Ghost", "Boo-Boo is a kawaii (female) ghost. A tiny round ghost with a pink bow and rosy cheeks. She says \"boo\" very softly, then claps her little hands and smiles.", "A tiny round ghost with a pink bow and rosy cheeks."),
    "Wisp": () => makeCharacterTree("Wisp", "Ghost", "Wisp is a tsundere (female) ghost. A gauzy lavender ghost. She floats beside Dreamer while sighing that she guesses company is better than drifting around alone.", "A gauzy lavender ghost."),
    "Morwen": () => makeCharacterTree("Morwen", "Ghost", "Morwen is a goth (female) ghost. An elegant ghost with moon-silver hair and tattered lace. She enjoys evening breezes and hums slow, moody songs after sunset.", "An elegant ghost with moon-silver hair and tattered lace."),
    "Spectra": () => makeCharacterTree("Spectra", "Ghost", "Spectra is a nerd ghost. A scholarly ghost with floating spectacles. He studies cloud shapes and explains small facts about the dream with great enthusiasm.", "A scholarly ghost with floating spectacles."),
    "Hush": () => makeCharacterTree("Hush", "Ghost", "Hush is a monk ghost. A calm, translucent ghost in simple robes. He floats quietly with his hands pressed together and nods in silent blessing.", "A calm, translucent ghost in simple robes."),
    "Sir Haunts-a-Lot": () => makeCharacterTree("Sir Haunts-a-Lot", "Ghost", "Sir Haunts-a-Lot is a medieval ghost. A noble knight ghost. He speaks in \"thee\" and \"thou,\" compliments everyone's posture, and bows before entering any building.", "A noble knight ghost."),
    "Flutter": () => makeCharacterTree("Flutter", "Ghost", "Flutter is a shy ghost. A tiny, faint ghost who stays near lanterns. She whispers shy compliments and covers her face with her gauzy sleeves.", "A tiny, faint ghost who stays near lanterns."),
    "Giggles": () => makeCharacterTree("Giggles", "Ghost", "Giggles is a cheerful (female) ghost. A giggling ghost. She floats around trees and laughs when Dreamer says hello, convinced every day is worth celebrating.", "A giggling ghost."),
    "Mochi": () => makeCharacterTree("Mochi", "Animal (Rabbit)", "Mochi is a kawaii (female) animal (rabbit). A round, marshmallow-white rabbit with pastel pink cheeks. She hops in place when happy and nibbles clover near the grass.", "A round, marshmallow-white rabbit with pastel pink cheeks."),
    "Shadow": () => makeCharacterTree("Shadow", "Animal (Cat)", "Shadow is a tsundere (female) animal (cat). A sleek black cat with a perpetually flicking tail. She curls in sunny spots and insists she is only there for the warmth.", "A sleek black cat with a perpetually flicking tail."),
    "Raven": () => makeCharacterTree("Raven", "Animal (Crow)", "Raven is a goth (female) animal (crow). A glossy crow with dark feathers and a thoughtful gaze. She recites poems about the sea and admires dark clouds on the horizon.", "A glossy crow with dark feathers and a thoughtful gaze."),
    "Newton": () => makeCharacterTree("Newton", "Animal (Owl)", "Newton is a nerd animal (owl). A snowy owl with oversized reading glasses. He explains facts about clouds, trees, and tides whenever Dreamer will listen.", "A snowy owl with oversized reading glasses."),
    "Lotus": () => makeCharacterTree("Lotus", "Animal (Crane)", "Lotus is a monk animal (crane). A serene white crane. She meditates on one leg for hours and speaks in gentle koans about patience and the tide.", "A serene white crane."),
    "Squire Paws": () => makeCharacterTree("Squire Paws", "Animal (Dog)", "Squire Paws is a medieval animal (dog). A small scruffy dog wearing a tiny felt tabard. He barks at butterflies and trots proudly beside picnic blankets.", "A small scruffy dog wearing a tiny felt tabard."),
    "Pebble": () => makeCharacterTree("Pebble", "Animal (Turtle)", "Pebble is a shy animal (turtle). A small mossy turtle. She retracts into her shell at loud noises and stops moving whenever Dreamer turns to look.", "A small mossy turtle."),
    "Sunny": () => makeCharacterTree("Sunny", "Animal (Parrot)", "Sunny is a cheerful (female) animal (parrot). A bright sun-yellow parrot. She flies loops over the beach and greets every morning with a loud \"Hello, friend!\"", "A bright sun-yellow parrot."),
    "Fluffernox": () => makeCharacterTree("Fluffernox", "Monster", "Fluffernox is a kawaii (female) monster. A fuzzy round monster with tiny horns and a heart-patterned belly. She gives gentle pats and smiles with her whole face.", "A fuzzy round monster with tiny horns and a heart-patterned belly."),
    "Grumble": () => makeCharacterTree("Grumble", "Monster", "Grumble is a tsundere (female) monster. A small lumpy monster with one oversized fang. She insists she is terrifying, then carefully straightens wildflowers with her claws.", "A small lumpy monster with one oversized fang."),
    "Vesper": () => makeCharacterTree("Vesper", "Monster", "Vesper is a goth (female) monster. A tall, elegant shadow monster with silver claws. She likes to sit on rocks after sunset and hum moody songs to the moon.", "A tall, elegant shadow monster with silver claws."),
    "Gizmo": () => makeCharacterTree("Gizmo", "Monster", "Gizmo is a nerd monster. A lumpy monster with many watchful eyes. He inspects rocks and weeds, then tells Dreamer exactly how he thinks they work.", "A lumpy monster with many watchful eyes."),
    "Ommmm": () => makeCharacterTree("Ommmm", "Monster", "Ommmm is a monk monster. A large, moss-covered monster with gentle arms. He sits very still, hums low sounds, and believes listening is the highest magic.", "A large, moss-covered monster with gentle arms."),
    "Lord Roar": () => makeCharacterTree("Lord Roar", "Monster (Dragon-like)", "Lord Roar is a medieval monster (dragon-like). A small dragon-like monster in a velvet cape. He greets everyone formally and calls the wild hog his \"noble steed.\"", "A small dragon-like monster in a velvet cape."),
    "Snug": () => makeCharacterTree("Snug", "Monster", "Snug is a shy monster. A small blob monster. She hides under rocks, peeks out with one big eye, and waves a tiny tentacle when Dreamer walks by.", "A small blob monster."),
    "Gigglegrow": () => makeCharacterTree("Gigglegrow", "Monster", "Gigglegrow is a cheerful (female) monster. A big bouncy fluff monster. She bounces instead of walking and laughs loud enough to startle birds into the sky.", "A big bouncy fluff monster.")
};

// Legacy fallback for non-custom personalities (should not be needed now, but kept safe)
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

    audioManager.playSFX('blip');

    // Backflip Day: greeting a neighbor makes them backflip.
    if (typeof triggerBackflip === 'function') {
        const TS = CONFIG.TILE_SIZE;
        const wT = npc.wTiles || 1, hT = npc.hTiles || 2;
        triggerBackflip(npc, (npc.gridX + wT / 2) * TS, (npc.gridY + 1 - hT / 2) * TS);
    }

    // Name the Island Day: a greeted neighbor casts their vote on the proposal.
    if (typeof castIslandVote === 'function') castIslandVote(npc);

    // Mubaba gets his quest-driven conversation (see magic.js).
    if (npc.id === 'mubaba' && typeof openMubabaMenu === 'function') {
        openMubabaMenu(npc);
        return;
    }

    // If a poop tile is nearby, the NPC may comment on the smell.
    let stinkPrefix = '';
    if (typeof isNearPoop === 'function' && isNearPoop(npc.gridX, npc.gridY, 3)) {
        const stinks = [
            'Something stinks... ',
            'Phew, do you smell that? ',
            'There is an unmistakable funk in the air... ',
            'Something around here smells suspiciously hog-like... '
        ];
        stinkPrefix = stinks[Math.abs(npc.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % stinks.length];
    }

    dialogueState.active = true;
    dialogueState.npc = npc;
    dialogueState.currentNode = 'start';
    dialogueState.textRevealed = 0;
    dialogueState.selectedChoice = 0;
    dialogueState.choicesVisible = false;
    dialogueState.advancedMenu = false;
    gameState = STATE.DIALOGUE;

    // Pick a fresh conversation each chat: small talk usually, the full
    // hand-written tree occasionally (dialogue_smalltalk.js). Must run before
    // gainTalk so "first meeting" (friendship 0) still gets the intro tree.
    if (typeof chooseConversationTree === 'function') {
        npc._dialogueTree = chooseConversationTree(npc);
    }
    // Quest hooks: offers, fetch turn-ins, parcel deliveries (quests.js).
    if (typeof injectQuestDialogue === 'function') {
        injectQuestDialogue(npc, npc._dialogueTree);
    }
    // A neighbor standing near their own cardboard cutout notices it.
    if (typeof ownCutoutNear === 'function' && npc._dialogueTree && npc._dialogueTree.start && ownCutoutNear(npc)) {
        const cc = (typeof CUTOUT_COMMENTS !== 'undefined' && CUTOUT_COMMENTS[npc.name])
            || "Woah! What the heck is that?! Is that... ME?";
        npc._dialogueTree.start.text = cc + ' ' + npc._dialogueTree.start.text;
    }

    // Apply talk friendship gain (once per day)
    npc.gainTalk();

    // Inject stink prefix into the start node text for this conversation
    const tree = getDialogueTree();
    if (tree && tree.start && stinkPrefix) {
        tree.start.text = stinkPrefix + tree.start.text;
    }

    // Inject a holiday greeting prefix for all conversations on a holiday.
    if (tree && tree.start) {
        const holidayPrefix = getHolidayGreetingPrefix(npc.name);
        if (holidayPrefix) {
            tree.start.text = holidayPrefix + tree.start.text;
        }
        // Once the island has a voted-in name, neighbors drop it now and then.
        if (world && world.islandName && Math.random() < 0.3) {
            tree.start.text = 'Another fine day on ' + world.islandName + '! ' + tree.start.text;
        }
    }
}

function openAdvancedMenu(npc) {
    dialogueState.active = true;
    dialogueState.npc = npc;
    dialogueState.advancedMenu = true;
    dialogueState.advancedSelected = 0;
    dialogueState.advancedOptions = [
        { text: 'Talk', action: () => {
            dialogueState.advancedMenu = false;
            dialogueState.currentNode = 'start';
            dialogueState.textRevealed = 0;
            dialogueState.selectedChoice = 0;
            dialogueState.choicesVisible = false;
            npc.gainTalk();
            // Re-apply holiday greeting to the start node when re-entering talk.
            const tree = getDialogueTree();
            if (tree && tree.start) {
                const holidayPrefix = getHolidayGreetingPrefix(npc.name);
                if (holidayPrefix && !tree.start.text.startsWith(holidayPrefix.trim())) {
                    tree.start.text = holidayPrefix + tree.start.text;
                }
            }
        } },
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
    let value = item.category === 'food' ? 9 : item.category === 'material' ? 3 : 15;
    inventory.removeItem(active.id, 1);
    npc.gainGift(value);
    notify('Gave ' + item.name + ' to ' + npc.name + '! (+' + value + ' friendship)');
    closeDialogue();
}

function startMinigame(npc) {
    // Pick a game via the existing advanced-menu UI, then hand off to games.js.
    dialogueState.advancedSelected = 0;
    dialogueState.advancedOptions = [
        { text: 'Tic-Tac-Toe', action: () => { closeDialogue(); startMinigameVs(npc, 'tictactoe'); } },
        { text: 'Rhythm Game', action: () => { closeDialogue(); startMinigameVs(npc, 'rhythm'); } },
        { text: 'Cancel', action: () => { closeDialogue(); } }
    ];
    dialogueState.advancedMenu = true;
}

function closeDialogue() {
    dialogueState.active = false;
    dialogueState.npc = null;
    dialogueState.advancedMenu = false;
    if (typeof clearFortressScene === 'function') clearFortressScene();
    // Return to the interior if the conversation happened inside a building.
    gameState = (typeof insideBuilding !== 'undefined' && insideBuilding) ? STATE.INSIDE : STATE.PLAYING;
}

function getNodeText(node) {
    if (!node || !node.text) return '';
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    if (holiday && holiday.name === 'Talk Like an Eagle Day') {
        return 'Kyaaaaa! ' + node.text;
    }
    return node.text;
}

function updateDialogue(dt) {
    if (!dialogueState.active || dialogueState.advancedMenu) return;
    if (!dialogueState.choicesVisible) {
        // Typewriter effect — reveal ~30 chars/sec
        const tree = getDialogueTree();
        const node = tree ? tree[dialogueState.currentNode] : null;
        if (node) {
            const fullText = getNodeText(node);
            dialogueState.textRevealed += (30 * dt) / 1000;
            if (dialogueState.textRevealed >= fullText.length) {
                dialogueState.textRevealed = fullText.length;
                dialogueState.choicesVisible = true;
            }
        }
    }
}

function getDialogueTree() {
    if (!dialogueState.npc) return null;
    // Prefer custom character dialogue; fall back to personality-based generic tree.
    if (!dialogueState.npc._dialogueTree) {
        // Prefer hand-written dialogue (from NPCConvo2.txt), then the
        // procedurally-built character tree, then the generic fallback.
        const name = dialogueState.npc.name;
        if (typeof WRITTEN_DIALOGUES !== 'undefined' && WRITTEN_DIALOGUES[name]) {
            // Deep-clone so per-conversation mutations (e.g. stink prefix) don't persist.
            dialogueState.npc._dialogueTree = JSON.parse(JSON.stringify(WRITTEN_DIALOGUES[name]));
        } else {
            const factory = CHARACTER_DIALOGUES[name];
            if (factory) {
                dialogueState.npc._dialogueTree = factory();
            } else {
                dialogueState.npc._dialogueTree = generateDialogue(dialogueState.npc.personality, name);
            }
        }
    }
    return dialogueState.npc._dialogueTree;
}

// Word-wrap a string to a list of lines that each fit within maxWidth.
// Assumes the caller has already set textSize/textFont.
function wrapTextLines(str, maxWidth) {
    const words = String(str).split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
        const test = cur ? cur + ' ' + w : w;
        if (cur && textWidth(test) > maxWidth) {
            lines.push(cur);
            cur = w;
        } else {
            cur = test;
        }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [''];
}

// True if the cursor moved since the previous frame — lets hover-highlight take
// over only when the user is using the mouse, not when it's resting on a choice.
function mouseMovedRecently() {
    return mouseX !== pmouseX || mouseY !== pmouseY;
}

function drawDialoguePanelBg(panelY, panelH) {
    fill(0, 0, 0, 200);
    noStroke();
    rect(0, panelY, width, panelH);
    stroke(180, 160, 120);
    strokeWeight(1);
    noFill();
    rect(0, panelY, width, panelH);
    noStroke();
}

function drawDialogueScreen() {
    if (!dialogueState.active) return;

    // ===== Advanced interaction menu (Talk / Give Gift / ...) =====
    if (dialogueState.advancedMenu) {
        const panelH = 120;
        const panelY = height - panelH;
        drawDialoguePanelBg(panelY, panelH);

        fill(255, 255, 200);
        textAlign(LEFT, TOP);
        textSize(10);
        textFont(DIALOGUE_FONT);
        // Magic menus (magic.js) run without an NPC and set a title instead.
        text(dialogueState.npc ? dialogueState.npc.name : (dialogueState.menuTitle || ''), 8, panelY + 6);

        // Long option lists (e.g. transmute pickers) scroll: show a window of
        // rows centered on the selection.
        const maxRows = 6;
        const total = dialogueState.advancedOptions.length;
        const startRow = Math.max(0, Math.min(dialogueState.advancedSelected - 2, total - maxRows));
        dialogueState._advRects = [];
        for (let vi = 0; vi < Math.min(maxRows, total); vi++) {
            const i = startRow + vi;
            const opt = dialogueState.advancedOptions[i];
            const oy = panelY + 22 + vi * 14;
            // Hover-to-highlight (only while the mouse is actually moving, so a
            // resting cursor doesn't fight keyboard navigation).
            if (mouseMovedRecently() && mouseX >= 8 && mouseX <= width - 8 && mouseY >= oy - 2 && mouseY < oy + 12) {
                dialogueState.advancedSelected = i;
            }
            if (i === dialogueState.advancedSelected) {
                fill(255, 255, 100);
                text('\u25B6 ' + opt.text, 12, oy);
            } else {
                fill(200);
                text('  ' + opt.text, 12, oy);
            }
            dialogueState._advRects.push({ x: 8, y: oy - 2, w: width - 16, h: 14, index: i });
        }
        if (startRow > 0) { fill(150); text('▲', width - 16, panelY + 22); }
        if (startRow + maxRows < total) { fill(150); text('▼', width - 16, panelY + 22 + (maxRows - 1) * 14); }
        fill(120);
        textAlign(RIGHT, BOTTOM);
        textSize(7);
        text('Arrows/WASD: select  Enter/click: confirm  Esc: cancel', width - 4, height - 4);
        return;
    }

    // ===== Normal branching dialogue =====
    const tree = getDialogueTree();
    if (!tree) return;
    const node = tree[dialogueState.currentNode];
    if (!node) return;

    // --- Layout metrics ---
    // A 64x64 portrait sits in the left gutter when one is loaded for this NPC;
    // the text column shifts right to clear it. No portrait -> the old 24-wide
    // colored-swatch layout.
    const portrait = (typeof npcSlug === 'function' && dialogueState.npc)
        ? SPRITES['portraits.' + npcSlug(dialogueState.npc.name)] : null;
    const hasPortrait = !!(portrait && portrait.width);
    const textX = hasPortrait ? 80 : 38;
    const topPad = 24;                 // space for the name/portrait header
    const textMaxW = width - textX - 10;
    const bodySize = 12, bodyLineH = 14;
    const choiceSize = 11, choiceLineH = 13, choiceGap = 5, markerW = 14;
    const footerH = 14;

    textFont(DIALOGUE_FONT);

    // Measure the full body text so the panel can grow to fit it.
    textSize(bodySize);
    const fullText = getNodeText(node);
    const bodyLines = wrapTextLines(fullText, textMaxW);
    const bodyH = bodyLines.length * bodyLineH;

    // Pre-wrap each choice (so long options also wrap, never trailing off-screen).
    textSize(choiceSize);
    const choiceBlocks = (node.choices || []).map(ch => {
        const lines = wrapTextLines(ch.text, textMaxW - markerW);
        return { text: ch.text, lines, h: Math.max(choiceLineH, lines.length * choiceLineH) };
    });
    const choicesH = dialogueState.choicesVisible
        ? choiceBlocks.reduce((sum, b) => sum + b.h + choiceGap, 0)
        : 0;

    // Size the panel to fit header + body + choices + footer (with a sane cap).
    let panelH = topPad + bodyH + 8 + choicesH + footerH;
    panelH = Math.max(120, Math.min(panelH, height - 24));
    const panelY = height - panelH;

    drawDialoguePanelBg(panelY, panelH);

    // Portrait
    if (hasPortrait) {
        image(portrait, 8, panelY + 8, 64, 64);
        stroke(200);
        noFill();
        rect(8, panelY + 8, 64, 64);
        noStroke();
    } else {
        fill(dialogueState.npc.color);
        rect(8, panelY + 8, 24, 24);
        stroke(200);
        noFill();
        rect(8, panelY + 8, 24, 24);
        noStroke();
    }

    // Name
    fill(255, 255, 200);
    textAlign(LEFT, TOP);
    textSize(14);
    text(dialogueState.npc.name, textX, panelY + 6);

    // Body text (typewriter) \u2014 drawn line-by-line with our own wrapping so it
    // exactly matches the measured height and is never clipped by the choices.
    const visibleText = fullText.substring(0, Math.floor(dialogueState.textRevealed));
    textSize(bodySize);
    fill(230);
    textAlign(LEFT, TOP);
    const visLines = wrapTextLines(visibleText, textMaxW);
    for (let i = 0; i < visLines.length; i++) {
        text(visLines[i], textX, panelY + topPad + i * bodyLineH);
    }

    // Choices
    dialogueState._choiceRects = [];
    if (dialogueState.choicesVisible) {
        textSize(choiceSize);
        let cy = panelY + topPad + bodyH + 8;
        for (let i = 0; i < choiceBlocks.length; i++) {
            const blk = choiceBlocks[i];
            const rect_ = { x: textX - 4, y: cy - 2, w: textMaxW + 8, h: blk.h, index: i };
            // Hover-to-highlight (only while the mouse is actually moving).
            if (mouseMovedRecently() && mouseY >= rect_.y && mouseY < rect_.y + rect_.h && mouseX >= rect_.x && mouseX < rect_.x + rect_.w) {
                dialogueState.selectedChoice = i;
            }
            const selected = i === dialogueState.selectedChoice;
            fill(selected ? color(255, 255, 100) : color(200));
            textAlign(LEFT, TOP);
            if (selected) text('\u25B6', textX, cy);
            for (let j = 0; j < blk.lines.length; j++) {
                text(blk.lines[j], textX + markerW, cy + j * choiceLineH);
            }
            dialogueState._choiceRects.push(rect_);
            cy += blk.h + choiceGap;
        }
        fill(120);
        textAlign(RIGHT, BOTTOM);
        textSize(8);
        text('Arrows/WASD: choose \u00B7 Enter/click: select \u00B7 Esc: exit', width - 4, height - 4);
    } else {
        fill(120);
        textAlign(RIGHT, BOTTOM);
        textSize(8);
        text('Enter/click: continue', width - 4, height - 4);
    }
}

// Reveal the full body text immediately (skip the typewriter), showing choices.
function revealDialogueText() {
    const tree = getDialogueTree();
    const node = tree ? tree[dialogueState.currentNode] : null;
    if (!node) return;
    dialogueState.textRevealed = getNodeText(node).length;
    dialogueState.choicesVisible = true;
}

// Apply the choice at index i (friendship + advance/close).
function selectDialogueChoice(i) {
    const tree = getDialogueTree();
    const node = tree ? tree[dialogueState.currentNode] : null;
    if (!node || !node.choices[i]) return;
    const choice = node.choices[i];
    if (choice.friendshipDelta) {
        dialogueState.npc.friendship = Math.min(300, dialogueState.npc.friendship + choice.friendshipDelta * 3);
    }
    // Quest hooks (Mubaba etc.): run the choice's side effect. If it opened a
    // menu or closed the dialogue itself, don't also advance/close here.
    if (choice.action) {
        choice.action();
        if (dialogueState.advancedMenu || !dialogueState.active) return;
    }
    if (choice.next === null) {
        closeDialogue();
    } else {
        dialogueState.currentNode = choice.next;
        dialogueState.textRevealed = 0;
        dialogueState.selectedChoice = 0;
        dialogueState.choicesVisible = false;
    }
}

// Mouse click during dialogue: skip the typewriter, or pick a choice / menu option.
function handleDialogueClick(mx, my) {
    if (!dialogueState.active) return false;

    if (dialogueState.advancedMenu) {
        for (const r of (dialogueState._advRects || [])) {
            if (mx >= r.x && mx < r.x + r.w && my >= r.y && my < r.y + r.h) {
                const opt = dialogueState.advancedOptions[r.index];
                if (opt && opt.action) opt.action();
                return true;
            }
        }
        return true; // swallow stray clicks while the menu is open
    }

    if (!dialogueState.choicesVisible) {
        revealDialogueText();
        return true;
    }

    for (const r of (dialogueState._choiceRects || [])) {
        if (mx >= r.x && mx < r.x + r.w && my >= r.y && my < r.y + r.h) {
            dialogueState.selectedChoice = r.index;
            selectDialogueChoice(r.index);
            return true;
        }
    }
    return true; // clicks anywhere during dialogue stay in the dialogue
}

function handleDialogueKey(keyCode, key) {
    if (!dialogueState.active) return false;

    // Movement-key aliases: W/A = up/prev, S/D = down/next (alongside arrows).
    const isUp = keyCode === UP_ARROW || keyCode === 87 || keyCode === 65;   // W, A
    const isDown = keyCode === DOWN_ARROW || keyCode === 83 || keyCode === 68; // S, D

    if (dialogueState.advancedMenu) {
        const n = dialogueState.advancedOptions.length;
        if (isUp) {
            dialogueState.advancedSelected = (dialogueState.advancedSelected - 1 + n) % n;
            return true;
        } else if (isDown) {
            dialogueState.advancedSelected = (dialogueState.advancedSelected + 1) % n;
            return true;
        } else if (keyCode === ENTER || keyCode === RETURN) {
            const opt = dialogueState.advancedOptions[dialogueState.advancedSelected];
            if (opt && opt.action) opt.action();
            return true;
        } else if (keyCode === ESCAPE) {
            closeDialogue();
            return true;
        }
        return true;
    }

    if (!dialogueState.choicesVisible) {
        // Skip the typewriter and show the choices.
        if (keyCode === ENTER || keyCode === RETURN) {
            revealDialogueText();
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
    const n = node.choices.length;

    if (isUp) {
        dialogueState.selectedChoice = (dialogueState.selectedChoice - 1 + n) % n;
        return true;
    } else if (isDown) {
        dialogueState.selectedChoice = (dialogueState.selectedChoice + 1) % n;
        return true;
    } else if (keyCode === ENTER || keyCode === RETURN) {
        selectDialogueChoice(dialogueState.selectedChoice);
        return true;
    } else if (keyCode === ESCAPE) {
        closeDialogue();
        return true;
    }
    return true;
}

// Check if player is facing an NPC
// Checks the NPC's full standing footprint: wTiles wide, hTiles tall,
// bottom-anchored at (gridX, gridY). Default 1x2 matches the old feet+head check.
function npcAtFacing() {
    const facing = player.getFacingTile();
    if (!facing) return null;
    for (const npc of npcs) {
        if (!npc.isPresent) continue;
        const w = npc.wTiles || 1;
        const h = npc.hTiles || 2;
        if (facing.x >= npc.gridX && facing.x < npc.gridX + w &&
            facing.y <= npc.gridY && facing.y > npc.gridY - h) return npc;
    }
    return null;
}

// Check if any NPC occupies a given world tile (full standing footprint).
function npcAt(x, y) {
    if (!npcs) return false;
    for (const npc of npcs) {
        if (!npc.isPresent) continue;
        const w = npc.wTiles || 1;
        const h = npc.hTiles || 2;
        if (x >= npc.gridX && x < npc.gridX + w &&
            y <= npc.gridY && y > npc.gridY - h) return true;
    }
    return false;
}

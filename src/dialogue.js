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
        const comments = [
            `Can you believe today is ${holiday.name}? I already started my preparations.`,
            `Hard to focus with ${holiday.name} going on. It's honestly beautiful.`,
            `I'm ${name}, and yes, I'm observing ${holiday.name} properly this year.`,
            `${holiday.name} always sneaks up on me. You celebrating?`,
            `Between you and me, ${holiday.name} is my favorite nonsense.`
        ];
        holidayComment = comments[Math.abs(name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % comments.length];
        holidayPrefix = holidayComment + ' ';
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
    const holidayText = holiday
        ? `${holiday.name}: ${holiday.desc} I'd tell you more, but I think experiencing it is half the fun.`
        : `No holiday today. Just a regular, wonderfully strange island day.`;

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
    'Chester': () => makeCharacterTree('Chester', 'Robot', 'Chester is a retired mechanic. He speaks in a Boston accent and laughs at things that aren\'t funny.', 'Chester is rust red and wears a trucker hat. His hands are clamps and he has wheels instead of feet.'),
    'Luna': () => makeCharacterTree('Luna', 'Talking Cat', 'Luna is a sly, neon‑purring alley cat who craves adventure and hates litter boxes.', 'A sleek black cat with a single green eyeblink glow, always wearing a velvet collar.'),
    'Brass': () => makeCharacterTree('Brass', 'Robot', 'Brass loves to narrate his own stories in dramatic cannon tones, often correcting himself.', 'Shiny brass framework, a wind‑up arm attached to his left side, stained with coffee rings.'),
    'Vega': () => makeCharacterTree('Vega', 'Alien', 'Vega is a telepathic wanderer who devotes a day to learning Earth’s pop‑culture.', 'A translucent silver humanoid with a pair of delicate, luminous antennae.'),
    'Daphne': () => makeCharacterTree('Daphne', 'Talking Flower', 'Daphne talks in a gentle, soothing voice and hums sea‑shanties to nearby insects.', 'A towering sunflower with a sunflower‑yellow canopy and tiny blue petals.'),
    'Krip': () => makeCharacterTree('Krip', 'Alien', 'Krip is a reclusive cryptic scientist, always looking for exotic minerals.', 'A goo‑ey translucent body swirling with indigo vortexes, long tendrils.'),
    'Penny': () => makeCharacterTree('Penny', 'Anthropomorphic Houseplant', 'Penny is cynic‑y, loves the smell of rain and is a terrible secret‑keeper.', 'A potted fern in an oakwood pot with a paper umbrella that he carries around.'),
    'Mimis': () => makeCharacterTree('Mimis', 'Supernatural Fairy', 'Mimis plans parties and spreads glitter. She has a knack for glittery mischief.', 'A bright pink winged fairy with a glitter‑y half‑glow lamp.'),
    'Hudson': () => makeCharacterTree('Hudson', 'Talking Japanese Tea Cup', 'Hudson is a know‑it‑all who gives seasoned advice about the Tea of all countries.', 'A porcelain cup with a mahogany handle, green glaze indicative of wood grain.'),
    'Cort': () => makeCharacterTree('Cort', 'Robot', 'Cort has a serious bookworm personality. He does not understand pop‑culture references and tends to stumble.', 'A silver chassis with a stack of metallic books on his chest.'),
    'Aiko': () => makeCharacterTree('Aiko', 'Talking Dog', 'Aiko is a loving companion. She loves to protect those around her when they are in danger.', 'A golden retriever dog with a blue collar and a perpetual friendly grin.'),
    'Ihor': () => makeCharacterTree('Ihor', 'Supernatural Vampire', 'Ihor is cool, emotional, but a bit gimmicky. He seeks to be a villain and has a deep love for electric, carnivorous plants.', 'A tall, slim silhouette of a cyan-violet vampire who is suspended by a claw rope.'),
    'Psy': () => makeCharacterTree('Psy', 'Talking Plant', 'Psy explodes when his deep voice passes his chamber. He likes to plant things with his heart.', 'A heavy lumbering structure like a tree with moist, reverent clones.'),
    'Boll': () => makeCharacterTree('Boll', 'Robot', 'Boll double calculates all outcomes and can be bullied by an AI. He is the enlightened being.', 'He looks like a bronze, and his eyes are a clear green. He bemids fo station.'),
    'Taira': () => makeCharacterTree('Taira', 'Anthropomorphic Mac', 'Taira has a subjective personality, who gives random jokes.', 'Taira\'s nod uses a small disk, a small port and some drives inside its body.'),
    'Mah': () => makeCharacterTree('Mah', 'Supernatural SCP', 'Mah is an SCP Creature with a hidden, messy approach.', 'A huge deep space with stuffing ink, a black veil, a creak, a being with a ring.'),
    'Mira': () => makeCharacterTree('Mira', 'Supernatural Witch', 'Spinning and focusing on the self, she asks for example. She is very willing to explain about these interesting', 'She is drawn in a cap. Her work is beautiful, with a scrawled patch of red.'),
    'Liz': () => makeCharacterTree('Liz', 'Talking Dog', 'Liz is a calm dog who loves to an astrophysics. She exhibits a 0% door felicity.', 'Liz is a kitty cat taken by a striped pattern and a blue collar.'),
    'Eo': () => makeCharacterTree('Eo', 'Talking Robot', 'Eo is a gentle giant, always organizing things and offering a “big‑hearted” perspective.', 'Tall, aqua‑ringed head, bulky titanium frame, and soft‑glowing chest panel.'),
    'Quark': () => makeCharacterTree('Quark', 'Robot', 'Quark is hyper‑energetic, speaks in rapid bursts, and loves collecting shiny objects.', 'Small, silver sphere with rotating antennae and a built‑in magnetic claw.'),
    'Zora': () => makeCharacterTree('Zora', 'Alien (Luminous Jelly‑type)', 'Zora is serene, communicates through colors, and enjoys meditating on sea breezes.', 'Gelatinous, pastel‑blue body that pulses with soft light; tends to float gently.'),
    'Basil': () => makeCharacterTree('Basil', 'Talking Plant (Basilisk Vine)', 'Basil is sassy, enjoys riddles, and can “grow” a sarcastic comment on demand.', 'Thick green vine with bright purple flowers that open when it laughs.'),
    'Gearwick': () => makeCharacterTree('Gearwick', 'Robot', 'Gearwick is methodical, loves schedules, and never misses a deadline—unless there’s a power outage.', 'Clock‑work exterior with brass gears visible through a transparent chest panel.'),
    'Zephyr': () => makeCharacterTree('Zephyr', 'Talking Bird (Hummingbird)', 'Zephyr is hyper‑chatty, loves gossip, and flits from story to story.', 'Tiny iridescent hummingbird with a tiny notebook strapped to its leg.'),
    'Gorm': () => makeCharacterTree('Gorm', 'Fantasy Creature (Mini‑Dragon)', 'Gorm is mischievous, hoards glitter, and pretends to be terrified of fire.', 'Small emerald‑scaled dragon with oversized ears and a warm, ember‑glowing tail.'),
    'Sprig': () => makeCharacterTree('Sprig', 'Talking Plant (Mushroom)', 'Sprig is shy, tends to whisper, and always offers calming advice.', 'Round, spotted mushroom with a tiny wooden walking stick.'),
    'Rollo': () => makeCharacterTree('Rollo', 'Anthropomorphic Rolling Pin', 'Rollo is a perfectionist baker, constantly critiquing dough consistency.', 'Wooden rolling pin with expressive eyes carved into the handle and a dapper bow tie.'),
    'Nyx': () => makeCharacterTree('Nyx', 'Supernatural Ghost', 'Nyx is playful, enjoys hiding objects, and loves riddles that make people think.', 'A translucent, lavender‑tinged silhouette that drifts lazily above the ground.'),
    'Titan': () => makeCharacterTree('Titan', 'Robot (Construction)', 'Titan is stoic, speaks in low tones, and loves building things for the community.', 'Massive, cobalt‑blue frame with a tool belt of interchangeable arms.'),
    'Orla': () => makeCharacterTree('Orla', 'Talking Whale (Mini‑size)', 'Orla is wise, tells long‑winded stories, and never forgets a name.', 'Small, smooth‑skinned blue whale that waddles on land using a water‑filled bladders system.'),
    'Jax': () => makeCharacterTree('Jax', 'Alien (Rock‑based)', 'Jax is gruff, loves puns about “rock solid” plans, and enjoys mineral collecting.', 'Rough, brown stone body with glowing orange fissures that pulse with each word.'),
    'Clover': () => makeCharacterTree('Clover', 'Talking Plant (Clover)', 'Clover is optimistic, always sees the bright side, and loves playing hide‑and‑seek.', 'Four‑leaf clover with tiny silver shoes and a bright green halo.'),
    'Sprocket': () => makeCharacterTree('Sprocket', 'Robot', 'Sprocket is a tinkerer who loves improvising gadgets on the fly.', 'Compact, copper‑capped body with a belt of tiny tools and a rotating head.'),
    'Luna‑2': () => makeCharacterTree('Luna‑2', 'Talking Cat (Twin)', 'Luna‑2 is philosophical, often pondering the meaning of naps.', 'Same sleek black coat as Luna, but with a golden eye patch and a tiny scroll.'),
    'Vira': () => makeCharacterTree('Vira', 'Alien (Bioluminescent)', 'Vira is curious, constantly asks “why?” and lights up brighter when excited.', 'Semi‑transparent, teal‑glowing being with floating tendrils that emit soft pulses.'),
    'Birch': () => makeCharacterTree('Birch', 'Talking Tree', 'Birch is patient, offers sage advice, and sometimes tells ancient legends.', 'Tall, silver‑barked tree with a wide, gnarled trunk and luminous bark markings.'),
    'Flick': () => makeCharacterTree('Flick', 'Anthropomorphic Candle', 'Flick is dramatic, enjoys storytelling by candlelight, and gets “melted” when nervous.', 'Tall white candle with a bright orange flame for a face and a tiny cape.'),
    'Draven': () => makeCharacterTree('Draven', 'Supernatural Werewolf (Mini)', 'Draven is brooding but has a soft spot for poetry and moonlit music.', 'Small, silver‑furred wolf‑like creature with glowing amber eyes.'),
    'Pixel': () => makeCharacterTree('Pixel', 'Robot (Pixel‑Art)', 'Pixel loves retro video games, speaks in 8‑bit beeps, and often references classic titles.', 'Small, square robot with a colorful pixelated screen for a face.'),
    'Aria': () => makeCharacterTree('Aria', 'Talking Bird (Parrot)', 'Aria is flamboyant, loves to sing opera arias, and repeats everything with dramatic flair.', 'Vibrant scarlet parrot with a tiny golden microphone attached to its wing.'),
    'Grumble': () => makeCharacterTree('Grumble', 'Anthropomorphic Rock', 'Grumble is grumpy, but deep down is a soft‑hearted guardian of the island’s caves.', 'Rough gray boulder with etched eyes and a moss‑covered “mustache.”'),
    'Selene': () => makeCharacterTree('Selene', 'Supernatural Moon Spirit', 'Selene is serene, offers guidance at night, and loves arranging constellations.', 'Ethereal silver figure that glows faintly; her hair flows like moonlight.'),
    'Bolt': () => makeCharacterTree('Bolt', 'Robot (Electric)', 'Bolt is hyper‑fast, impulsive, and occasionally short‑circuits when startled.', 'Sleek, electric‑blue chassis with lightning‑shaped antennae.'),
    'Gidget': () => makeCharacterTree('Gidget', 'Talking Squirrel', 'Gidget is hyper‑energetic, loves collecting acorns, and tells rapid‑fire jokes.', 'Small, bushy‑tailed squirrel with a tiny explorer’s cap.'),
    'Lunae': () => makeCharacterTree('Lunae', 'Alien (Gas‑Giant Mini‑Avatar)', 'Lunae is dreamy, speaks in soft sighs, and enjoys floating through clouds.', 'Floating orb of pastel pink gas with swirling patterns and a faint luminescent core.'),
    'Willow': () => makeCharacterTree('Willow', 'Talking Plant (Willow Tree)', 'Willow is calm, a good listener, and often hums lullabies.', 'Graceful, slender willow with drooping teal leaves and a bark that looks like a gentle smile.'),
    'Rusty': () => makeCharacterTree('Rusty', 'Robot (Scrap‑Collector)', 'Rusty is sarcastic, loves finding discarded stuff, and builds “art” from junk.', 'Patchwork of rusted metal plates, a single glowing eye, and a magnetic claw.'),
    'Ember': () => makeCharacterTree('Ember', 'Supernatural Fire Sprite', 'Ember is excitable, always “flickering” between ideas, and loves warm hugs.', 'Small, orange‑flame‑shaped sprite with tiny sparkling embers for hair.'),
    'Pippa': () => makeCharacterTree('Pippa', 'Anthropomorphic Teapot', 'Pippa is motherly, offers warm advice, and whistles when she’s excited.', 'Round porcelain teapot with a friendly face etched on the lid and a floral apron.'),
    'Orion': () => makeCharacterTree('Orion', 'Alien (Star‑Child)', 'Orion is wise beyond ages, speaks slowly, and loves mapping constellations.', 'Glimmering humanoid with speckled skin resembling a night sky, tiny comet‑tail hair.'),
    'Nixie': () => makeCharacterTree('Nixie', 'Talking Fish (Goldfish)', 'Nixie is bubbly, loves gossip, and often forgets what she was saying.', 'Shimmering goldfish with a tiny crown of seaweed.'),
    'Cobble': () => makeCharacterTree('Cobble', 'Anthropomorphic Stone Statue', 'Cobble is stoic, loves riddles about strength, and never moves… unless a secret is revealed.', 'Gray stone statue with carved eyes that glow faintly when animated.'),
    'Zeph': () => makeCharacterTree('Zeph', 'Supernatural Wind Spirit', 'Zeph is playful, loves to cause gentle breezes and tease leaves into dancing.', 'Invisible except for a faint swirl of pollen and a soft, humming tone.'),
    'Kiko': () => makeCharacterTree('Kiko', 'Talking Rabbit', 'Kiko is timid yet curious, loves carrots, and enjoys solving simple puzzles.', 'Soft white rabbit with a pink bow tie and long floppy ears.'),
    'Aurora': () => makeCharacterTree('Aurora', 'Supernatural Aurora Borealis Entity', 'Aurora is poetic, loves painting the night sky with colors, and speaks in rhymes.', 'Shimmering curtain of shifting greens and purples that flows like silk.'),
    'Quill': () => makeCharacterTree('Quill', 'Anthropomorphic Quill Pen', 'Authoritative, loves storytelling, and corrects grammar mercilessly.', 'Large feather‑shaped pen with a gentleman’s bow tie and ink‑black eyes.'),
    'Vex': () => makeCharacterTree('Vex', 'Robot (Steampunk)', 'Vex is nostalgic, constantly references Victorian inventions, and loves tea.', 'Brass‑cogged torso, copper pipes, and a top‑hat-shaped antenna.')
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

    // If a poop tile is nearby, the NPC may comment on the smell.
    let stinkPrefix = '';
    if (typeof isNearPoop === 'function' && isNearPoop(npc.gridX, npc.gridY, 3)) {
        const stinks = [
            '*sniff sniff* Something stinks... ',
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

    // Apply talk friendship gain (once per day)
    npc.gainTalk();

    // Inject stink prefix into the start node text for this conversation
    const tree = getDialogueTree();
    if (tree && tree.start && stinkPrefix) {
        tree.start.text = stinkPrefix + tree.start.text;
    }
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
        const factory = CHARACTER_DIALOGUES[dialogueState.npc.name];
        if (factory) {
            dialogueState.npc._dialogueTree = factory();
        } else {
            dialogueState.npc._dialogueTree = generateDialogue(dialogueState.npc.personality, dialogueState.npc.name);
        }
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

    // NPC name + species subtitle
    fill(255, 255, 200);
    textAlign(LEFT, TOP);
    textSize(14);
    textFont('Courier New');
    text(dialogueState.npc.name, 38, panelY + 6);
    fill(180);
    textSize(8);
    text(dialogueState.npc.species || '', 38 + textWidth(dialogueState.npc.name) + 8, panelY + 10);

    // Text (typewriter)
    const visibleText = getNodeText(node).substring(0, Math.floor(dialogueState.textRevealed));
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
            const fullText = getNodeText(node);
            dialogueState.textRevealed = fullText.length;
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

// Check if any NPC occupies a given world tile (feet or head).
function npcAt(x, y) {
    if (!npcs) return false;
    for (const npc of npcs) {
        if (!npc.isPresent) continue;
        if (npc.gridX === x && (npc.gridY === y || npc.gridY - 1 === y)) return true;
    }
    return false;
}

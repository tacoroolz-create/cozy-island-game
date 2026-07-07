// ===== SMALL TALK & AMBIENT DIALOGUE =====
// Short randomized conversations so neighbors don't repeat their one big
// hand-written tree every chat. chooseConversationTree() (called from
// openDialogue in dialogue.js) picks per conversation: the full written tree
// occasionally, otherwise a per-character snippet from SMALLTALK_BANKS or an
// ambient line built from what the island is doing right now (time of day,
// season, gossip about other neighbors, friendship).

// Build a tiny two-beat conversation: an in-voice opener, a few player replies
// each answered with one more in-voice line, then goodbye.
// pairs: [choiceText, replyText, friendshipDelta?]
function st(opener, pairs) {
    const tree = { start: { text: opener, choices: [] } };
    pairs.forEach((p, i) => {
        const key = 'r' + i;
        tree.start.choices.push({ text: p[0], next: key, friendshipDelta: p.length > 2 ? p[2] : 1 });
        tree[key] = { text: p[1], choices: [{ text: "See you around!", next: null, friendshipDelta: 0 }] };
    });
    tree.start.choices.push({ text: "Just passing by. Bye!", next: null, friendshipDelta: 0 });
    return tree;
}

// ---- Ambient lines: { text, ask, reply } with {player}/{other}/{season} slots ----
const AMBIENT_MORNING = [
    { text: "Up with the sun, {player}? The island smells like dew and possibility this early.", ask: "What's the plan today?", reply: "Oh, the usual: wander, snack, admire the sea, repeat. It's a rigorous schedule." },
    { text: "Morning! I heard the birds arguing before dawn. I think the little one won.", ask: "Birds argue?", reply: "Constantly. Mostly about who saw the sunrise first. Nobody ever agrees." },
    { text: "There's something about a morning here. Everything feels un-decided yet, you know?", ask: "I know exactly what you mean.", reply: "I figured you would. You have morning-person eyes. Take that as a compliment." }
];
const AMBIENT_AFTERNOON = [
    { text: "Perfect napping weather, if you ask me. Not that anyone ever asks me.", ask: "I'm asking you!", reply: "Then my official ruling is: yes. Find a warm patch of grass and report back." },
    { text: "Afternoon, {player}. I've been standing here so long a butterfly tried to claim me as territory.", ask: "Did you let it?", reply: "We negotiated. It gets my left shoulder on weekdays. Fair is fair." },
    { text: "Busy day! And by busy I mean I watched a cloud for two hours. It was shaped like a spoon.", ask: "A spoon cloud? Nice.", reply: "It slowly became a ladle. Honestly? Riveting. Best show on the island." }
];
const AMBIENT_EVENING = [
    { text: "The light gets all golden around now. Even the rocks look like they're posing.", ask: "It's my favorite hour.", reply: "Mine too. Don't tell the morning I said that. The morning gets jealous." },
    { text: "Evening already? Days on this island slip by like minnows. Fast and a little shiny.", ask: "What did today slip by with?", reply: "A good stretch, a better snack, and one truly excellent smell I never identified." },
    { text: "Almost dinnertime, {player}. I can practically hear the whole island's stomachs growling in chorus.", ask: "What's on your menu?", reply: "Whatever's closest, garnished with whatever's second closest. Island cooking!" }
];
const AMBIENT_NIGHT = [
    { text: "Out late, {player}? The island keeps a different set of secrets after dark.", ask: "Like what?", reply: "The waves talk slower. The stars lean closer. And somebody — no names — sleep-hums." },
    { text: "Can't sleep either, huh? The moon's too good tonight to waste on being unconscious.", ask: "It really is.", reply: "Stand here a minute and look up with me. There. That's the whole conversation." }
];
const AMBIENT_GENERIC = [
    { text: "You know what I like about you, {player}? You stop and talk. Most folks just wave.", ask: "I like our talks too.", reply: "See? That's exactly the thing I mean. Off you go, now — but come back soon." },
    { text: "I found a spot today where the wind does a little loop. Stood in it for ages.", ask: "Where is it?", reply: "If I told you, it'd be OUR spot instead of MY spot. ...Okay, it's near the big rocks. Our spot." },
    { text: "Do you think the island has a favorite neighbor? Be honest. Is it me?", ask: "It's definitely you.", reply: "I KNEW it. The island and I have an understanding. You're a solid second, though." },
    { text: "I've been working on waving with more enthusiasm. Watch. ...Well, it's better in motion.", ask: "Ten out of ten.", reply: "Thank you! It's all in the follow-through. Years of practice. Well — days." },
    { text: "Quiet today, isn't it? The good kind of quiet. Like the island's holding its breath politely.", ask: "The good kind, yeah.", reply: "Exactly. You get it. Now shoo, before we ruin it with all this talking." }
];
const AMBIENT_GOSSIP = [
    { text: "Have you talked to {other} lately? Between us, I think they're up to something.", ask: "Up to what?", reply: "No idea. But they had that look. You know the one. Keep an eye out and report back." },
    { text: "{other} waved at me this morning and I've been thinking about it all day. We're basically best friends now.", ask: "That's how it works?", reply: "On this island? One good wave is a bond for life. Two waves and you're family." },
    { text: "Don't spread this around, but I saw {other} talking to a seagull. At length. The seagull seemed persuaded.", ask: "Persuaded of WHAT?", reply: "That's the part that worries me. If the gulls start organizing, we all answer to {other}." },
    { text: "I've been meaning to visit {other}, but then I remember how far away 'over there' is.", ask: "It's a five minute walk...", reply: "A five minute walk THERE, {player}. And then — and nobody thinks about this — five minutes BACK." }
];
const AMBIENT_SEASON = {
    'Sweet': { text: "Sweet season suits this island. Everything's blooming like it's showing off.", ask: "It does smell amazing.", reply: "Right? I take one deep breath in the morning and I'm set for the whole day." },
    'Saucy': { text: "Saucy season again. The air's got attitude and frankly, so do I.", ask: "The season fits you.", reply: "It really does. I feel ten percent bolder from now until the season turns. Watch out, island." },
    'Cool': { text: "Cool season's here. The breeze has that crisp edge, like the air got sharpened.", ask: "I love this weather.", reply: "Me too. Perfect for standing dramatically and staring out to sea. I've been practicing." },
    'Yeesh': { text: "Yeesh season. That's not a comment — that's genuinely what it's called. Yeesh.", ask: "Whoever named it knew.", reply: "They absolutely knew. One 'yeesh' says what forty weather reports can't." }
};
const AMBIENT_BESTIES = [
    { text: "There's my favorite Dreamer! I was just thinking about you — good things, obviously.", ask: "Only good things?", reply: "Ninety percent good things. The other ten percent was wondering if you'd bring snacks. So — mostly good." },
    { text: "You and me, {player}, we've become a proper fixture around here. Like the dock, but chattier.", ask: "The island's lucky to have us.", reply: "That's what I keep telling it. One day the waves will agree loudly enough for everyone to hear." }
];
const AMBIENT_NEW = [
    { text: "Oh — hello again. Still learning everyone's faces, but yours is easy. You're the one who talks to everybody.", ask: "That's me!", reply: "It's a good reputation to have. Better than mine, which is 'stands around suspiciously.' I'm working on it." },
    { text: "We haven't talked much yet, have we? You seem alright. Preliminary finding, of course.", ask: "I'll earn the full report.", reply: "I like the ambition. Keep saying hello and we'll upgrade you to 'confirmed alright' in no time." }
];

function makeAmbientTree(npc) {
    const hour = (typeof world !== 'undefined' && world) ? Math.floor((world.timeMinutes || 0) / 60) : 12;
    const timePool = hour >= 5 && hour < 11 ? AMBIENT_MORNING
        : hour >= 11 && hour < 17 ? AMBIENT_AFTERNOON
        : hour >= 17 && hour < 21 ? AMBIENT_EVENING
        : AMBIENT_NIGHT;
    let pool = timePool.concat(AMBIENT_GENERIC);
    const seasonLine = (typeof world !== 'undefined' && world && AMBIENT_SEASON[world.season]) || null;
    if (seasonLine) pool = pool.concat([seasonLine]);
    const others = (typeof npcs !== 'undefined') ? npcs.filter(n => n.isPresent && n !== npc && n.id !== 'mubaba') : [];
    if (others.length > 0) pool = pool.concat(AMBIENT_GOSSIP);
    if (npc.friendship >= 150) pool = pool.concat(AMBIENT_BESTIES);
    else if (npc.friendship < 30) pool = pool.concat(AMBIENT_NEW);

    const line = pool[Math.floor(Math.random() * pool.length)];
    const other = others.length > 0 ? others[Math.floor(Math.random() * others.length)].name : 'someone';
    const playerName = (typeof PLAYER_NAME !== 'undefined') ? PLAYER_NAME : 'Dreamer';
    const fill = s => s.replace(/\{player\}/g, playerName).replace(/\{other\}/g, other).replace(/\{season\}/g, (world && world.season) || '');

    return {
        start: {
            text: fill(line.text),
            choices: [
                { text: fill(line.ask), next: 'more', friendshipDelta: 1 },
                { text: "Good talk! See you around.", next: null, friendshipDelta: 0 }
            ]
        },
        more: {
            text: fill(line.reply),
            choices: [
                { text: "Take care, " + npc.name + "!", next: null, friendshipDelta: 1 },
                { text: "Goodbye!", next: null, friendshipDelta: 0 }
            ]
        }
    };
}

// ---- Conversation picker ----
const WRITTEN_TREE_CHANCE = 0.25;
function chooseConversationTree(npc) {
    const name = npc.name;
    const written = () => {
        if (typeof WRITTEN_DIALOGUES !== 'undefined' && WRITTEN_DIALOGUES[name]) {
            return JSON.parse(JSON.stringify(WRITTEN_DIALOGUES[name]));
        }
        const factory = (typeof CHARACTER_DIALOGUES !== 'undefined') ? CHARACTER_DIALOGUES[name] : null;
        return factory ? factory() : generateDialogue(npc.personality, name);
    };
    // First meeting always gets the full hand-written introduction.
    if (npc.friendship <= 0) return written();
    if (Math.random() < WRITTEN_TREE_CHANCE) return written();
    const bank = SMALLTALK_BANKS[name];
    if (bank && bank.length > 0 && Math.random() < 0.6) {
        // Deep-clone: quest/holiday injection mutates the tree per conversation.
        return JSON.parse(JSON.stringify(bank[Math.floor(Math.random() * bank.length)]));
    }
    return makeAmbientTree(npc);
}

// ---- What each neighbor blurts out when standing near their own cutout ----
const CUTOUT_COMMENTS = {
    "Chester": "WOAH! What the heck is that?! Is that ME? HA! Handsome fella. Terrible posture, though.",
    "Luna": "What... is that. Is that supposed to be me? The tail is all wrong. Burn it. No, wait — I'm flattered. Keep it.",
    "Brass": "And then Brass beheld... HIMSELF?! What the heck is that? Correction: what the heck is THAT. Dramatic emphasis matters.",
    "Vega": "My antennae are tingling. What the heck is that? It looks like me but it thinks... nothing. Fascinating and horrible.",
    "Daphne": "Oh my petals... what in the world is that? It's me! A flat, quiet me. I'm going to hum at it and see what happens.",
    "Krip": "Intriguing. What the heck is that? A mineral-free replica of myself. I must take... samples? No. No samples.",
    "Penny": "What the heck is THAT? It's me, isn't it. Great. Now there's two of us for people to ignore. It can keep a secret better, probably.",
    "Mimis": "WHAT THE HECK IS THAT?! It's ME! It needs glitter. It needs SO much glitter. Hold still, flat me!",
    "Hudson": "I say — what the heck is that? A porcelain likeness with no porcelain. As a cup, I find this deeply confusing.",
    "Cort": "What the heck is that? Statistically improbable. A second Cort with zero books read. Unacceptable. I'll lend it one.",
    "Aiko": "WOOF! What the heck is that?! Oh — it's me! Hello, me! I will protect you, flat friend. It's what I do.",
    "Ihor": "What the heck is that?! A doppelganger! At LAST, my villain era begins. ...It's very flattering, actually. Look at that cape.",
    "Psy": "WHAT. THE HECK. IS THAT. It is I. But rooted... nowhere. My heart aches for this soilless twin.",
    "Boll": "What the heck is that? I calculated every outcome for today. A flat second me appeared in zero of them. Recalculating.",
    "Taira": "What the heck is that?! Is it me? Why is it me? Did I get downloaded WRONG? Ha! Good one, universe.",
    "Mah": "what... the heck... is that. it is shaped like me. the veil approves. the ink does not. we are watching it.",
    "Mira": "What the heck is that? Oh — it's me! A likeness! Interesting. Let me explain why this is fascinating — actually, later. But WOW.",
    "Liz": "What the heck is that? A me-shaped object with zero gravitational pull. As an astrophysics enthusiast: rude. As a dog: I love it.",
    "Eo": "Oh my. What the heck is that? A little flat Eo. I'll organize a nice spot for it. Everyone deserves a nice spot.",
    "Quark": "WHATTHEHECKISTHAT?! It's me! It's ME! Is it shiny? It's a LITTLE shiny! I love it I love it I love it!",
    "Zora": "What... the heck... is that? It is me, but it holds only one color. I will meditate beside it until it relaxes.",
    "Basil": "What the heck is that? A me with no comebacks? Tragic. Riddle me this: what's flat, handsome, and says nothing clever? Apparently: me.",
    "Gearwick": "What the heck is that? A second Gearwick, zero gears, no schedule. It's been standing there UNPLANNED. I'm sweating oil.",
    "Zephyr": "WHAT THE HECK IS THAT?! It's me!! Okay okay okay — who made it, when, WHY, and do they take requests, because I have notes!",
    "Gorm": "WHAT THE HECK IS THAT?! Oh. It's me. Does it hoard glitter too? It'd better not. That glitter is MINE.",
    "Sprig": "oh!! what the heck is that...? it's... me? a big loud flat me. I'm going to whisper to it until we're friends.",
    "Rollo": "What the heck is that?! The proportions! The FINISH! Whoever rolled this me out did... honestly? Decent work. I'd have used less flour.",
    "Nyx": "What the heck is that?! A me that can't float?! Hilarious. I'm going to hide behind it and wave at people. Forever.",
    "Titan": "What the heck is that. ...It's me. Solid build. Good base. I approve of its construction. It stays.",
    "Orla": "My, my. What the heck is that? It reminds me of a story — a long one — about the day I met a very flat whale...",
    "Jax": "What the heck is that?! A me made of... not rock?! It's got a good stance though. Rock solid. HA!",
    "Clover": "What the heck is that?! It's me!! Oh, this is the BEST day. Flat me and I are going to win hide-and-seek as a TEAM.",
    "Sprocket": "What the heck is that? It's me, minus the moving parts. Give me an afternoon and a spring and I'll fix that.",
    "Luna-2": "What the heck is that? A still, silent me. It has achieved what I only nap toward. I must study its stillness.",
    "Vira": "What the heck is that?! Why is it me? Why is it flat? Why is it HERE? Why am I glowing this much about it?!",
    "Birch": "Hm? What the heck is that? A sapling-thin likeness of me. The old legends never mentioned this. New legend, then.",
    "Flick": "WHAT the heck is THAT?! A me who cannot melt?! The DRAMA of it. The PATHOS. I must tell it stories at once.",
    "Draven": "What the heck is that. A moonless, songless me. ...I shall write it a poem. A brooding one. It will understand.",
    "Pixel": "WHAT THE HECK IS THAT?! It's like my character-select screen! Player two: ME! Beep beep! This is AWESOME!",
    "Aria": "What the heck is THAAAAAT?! ~It's meeee!~ A silent understudy! Well, the role is TAKEN, darling, but you may hold my microphone.",
    "Grumble": "What the heck is that. It's me. Standing there. Not complaining. ...Show-off. ...It can stay. Whatever. I don't care. (I love it.)",
    "Selene": "Oh... what the heck is that? A daylight me. How strange, to meet myself with the sun still up. The constellations will laugh.",
    "Bolt": "WHATTHEHECK IS THAT?! It's me — don't touch it — I touched it — I'm FINE — is my hair like that?! It's GREAT!",
    "Gidget": "WHAT THE HECK IS THAT?! It's me! Quick, somebody count our acorns — I mean MY acorns. Flat me gets zero acorns. House rules!",
    "Lunae": "Ohh... what the heck is that...? A me who never floats away... how lovely... how strange... I'll drift beside it a while...",
    "Willow": "Oh my. What the heck is that? A quiet little me. Come, flat one. I'll hum to us both. You'll like the slow songs.",
    "Rusty": "What the heck is that? Somebody made art of ME? Out of CARDBOARD? ...That's the nicest junk anyone's ever wasted. I'm keeping my eye on it.",
    "Ember": "WHAT THE HECK IS THAT?! It's me!! Careful — no, YOU be careful, flat me, you're EXTREMELY flammable and I'm EXTREMELY me!",
    "Pippa": "Goodness! What the heck is that? A little me! Oh, it needs a scarf. It needs a warm drink. It needs — sit down, dear, I'll fuss properly.",
    "Orion": "What... the heck... is that. A still star, fallen here in my shape. I will map its place among the others. It belongs now.",
    "Nixie": "WHAT the heck is THAT?! It's me!! Oh I have to tell everyone — wait. What was I telling everyone? It was BIG news. Me-shaped news!",
    "Cobble": "...What the heck is that. A statue. Of me. A statue. Finally, someone who understands the craft of standing still. Respect.",
    "Zeph": "What the heck is that?! A me the wind can't budge?! Unacceptable. Delightful. I'm going to swirl leaves around it all day.",
    "Kiko": "Eep! W-what the heck is that?! It's... me? Oh. Oh no. It's very brave, standing out here. Maybe I could learn from it. From me!",
    "Aurora": "What the heck is that, I say with a gasp — a me who holds one hue and cannot dance the sky? Then I shall paint the night above it. Twice as bright.",
    "Quill": "What the heck is — no. WHOM the heck is that. Grammar aside: a splendid likeness. The posture is publishable. The bow tie? Impeccable.",
    "Vex": "I say! What the heck is that?! A likeness of me, rendered in card! How wonderfully Victorian. It shall join me for tea. It shan't drink much."
};

// ---- Per-character small talk: three short conversations each ----
const SMALLTALK_BANKS = {
    "Chester": [
        st("Heya kid! I've been rankin' the island's benches by creak. The dock one? Symphony quality. HA!", [
            ["Rank me the top three.", "Dock bench, the log by the beach, and — dark horse — Pippa's front step. Creaks in CHORDS, kid."],
            ["You need a hobby, Chester.", "This IS the hobby! Retirement's all about findin' music in stuff that's fallin' apart. Like me! HA!"]
        ]),
        st("Y'know what I miss? Engine grease. The SMELL of it. Don't make a face — you smell salt all day and call it charming!", [
            ["Fair point, actually.", "Course it's fair! Grease, salt — everybody's got their perfume. Mine just came with a warranty."],
            ["Maybe the island needs a garage.", "Now you're TALKIN'! 'Chester's Fix-It.' Free estimates, mandatory jokes. I'll sleep on it. HA!"]
        ]),
        st("Kid! Settle a bet I'm havin' with myself. Do seagulls land funny, or am I gettin' judgmental in my old age?", [
            ["They absolutely land funny.", "THANK you! Like somebody droppin' a wrench in slow motion. I knew I liked you. HA!"],
            ["Maybe a little judgmental.", "Hm. Maybe. But I judged toasters for forty years and I was right EVERY time, so the track record's on my side!"]
        ])
    ],
    "Luna": [
        st("Mmm. You again. Good. Everyone else on this island wants to talk about the weather. You have... range.", [
            ["What should we talk about?", "Schemes. Rooftops. The forbidden thrill of knocking something off a table. You know — culture."],
            ["The weather IS nice today.", "...I take back everything I said about your range. Fortunately for you, I'm feeling generous today."]
        ]),
        st("I found a sunbeam this morning that was, and I say this professionally, a masterpiece. I napped in it for three hours.", [
            ["Where does one find such a sunbeam?", "One doesn't. The sunbeam finds YOU — if you're worthy. I'm always worthy. Try being more cat about it."],
            ["Three hours? That's dedication.", "Napping is a discipline, darling. Amateurs sleep. Professionals COMMIT."]
        ]),
        st("Between us? I've been casing the big rocks by the shore. Something glitters in there at low tide.", [
            ["Want a partner in crime?", "Finally, someone with initiative. Bring quiet feet and no questions. This is how legends start.", 2],
            ["Should I be worried about you?", "Worried? About ME? I've survived alleys you couldn't dream of. The rocks should be worried."]
        ])
    ],
    "Brass": [
        st("And so Brass stood by the shore, magnificent, awaiting — oh! A visitor approaches. Correction: THE visitor approaches.", [
            ["Narrate me, Brass!", "The Dreamer arrived with excellent timing and, frankly, heroic posture. The crowd — one robot — went wild."],
            ["Do you ever stop narrating?", "Brass considered the question. He did not answer it, for the narration must — no. No, I do not. Correction: cannot."]
        ]),
        st("Chapter twelve: in which Brass discovers a puddle shaped exactly like himself. It was, correction, a GLORIOUS puddle.", [
            ["What happened to the puddle?", "It dried at noon, as all great characters must. Brass observed a moment of silence. The silence was narrated."],
            ["You should write these down.", "Brass's memoirs are composed entirely in the moment, out loud, to strangers. Correction: to FRIENDS."]
        ]),
        st("Our hero faced his greatest foe yet: a stubborn jar lid belonging to Pippa. The battle raged for — correction — is STILL raging.", [
            ["Want a hand with the lid?", "Brass accepted the offer with dignity and only a small amount of dramatic sighing. Together, they were unstoppable.", 2],
            ["My money's on the lid.", "A gasp escaped Brass's speakers. Betrayal! ...He respected it. The lid IS very stubborn."]
        ])
    ],
    "Vega": [
        st("Greetings. I watched three hours of your Earth 'commercials' today. Tell me: WHY is the sandwich always smiling?", [
            ["Nobody knows, honestly.", "Incredible. A whole civilization, haunted by a joyful sandwich, and no one asks questions. I love this planet."],
            ["To make you want the sandwich.", "So the smile is BAIT. Devious. Effective. I have written this in my field notes under 'earth predators.'"]
        ]),
        st("Your pop-culture unit for today: I have learned the phrase 'no way.' I am eager to deploy it. Say something surprising.", [
            ["I once ate nine bananas in a row.", "NO WAY. ...Oh, that was thrilling. The phrase works perfectly. Nine, though? Genuinely: no way."],
            ["Vega, we're standing on a turtle.", "NO W— wait. We are not. ...Are we? My telepathy says no, but my heart says this island has secrets."]
        ]),
        st("I attempted your Earth custom of 'small talk' with Grumble today. He said 'hmph.' Did I win?", [
            ["That's a win with Grumble.", "Excellent! I shall record it as a flawless cultural exchange. Two 'hmphs' and I unlock friendship, yes?"],
            ["Small talk has no winners.", "Fascinating. A game with no victory state, played constantly, by everyone. Your species is beautifully strange."]
        ])
    ],
    "Daphne": [
        st("Oh, hello dear. I was just humming to the ladybugs. They like the slow shanties best — the fast ones make them dizzy.", [
            ["Hum one for me?", "Mmm-hmm-hmmm... there. That one's about a sailor who missed his garden. The ladybugs request it constantly."],
            ["How many bugs attend these concerts?", "Twelve regulars, dear, and one moth who only comes for the finale. Everyone's welcome in my audience."]
        ]),
        st("The breeze brought me news from the far side of the island today. Mostly pollen. But SOME news.", [
            ["What's the news?", "The roses by the cliff are blooming early, and someone's been leaving lovely footprints in the sand. I suspect you, dear."],
            ["Pollen counts as news?", "For a flower, dear, pollen is the newspaper, the mail, AND the gossip column. Today's edition was thrilling."]
        ]),
        st("Hold still a moment, dear. There's a bee deciding between you and me... ah, she chose me. Flattering, and correct.", [
            ["You're clearly the better flower.", "Oh, you sweet thing. I'd blush, but I'm already this color. Come back tomorrow — the bees change their minds daily.", 2],
            ["Should I be offended?", "Not at all, dear. Bees have exacting standards and you have wonderful qualities a bee simply can't appreciate."]
        ])
    ],
    "Krip": [
        st("Do not be alarmed. The glow is normal. I have ingested a promising specimen of quartz and my vortexes are... celebrating.", [
            ["You EAT the minerals?", "Analyze. I analyze the minerals. Ingestion is simply the most thorough laboratory available to me. Science requires commitment."],
            ["Find anything good lately?", "A feldspar with unusual ambitions. It hums at dusk. I am keeping it under observation, and also under my tendril."]
        ]),
        st("You. Yes. I require a second opinion. Does this pebble look... smug... to you?", [
            ["Extremely smug, yes.", "I KNEW it. Vindication. It has been smug since Tuesday and I refuse to be condescended to by igneous rock."],
            ["It's a normal pebble, Krip.", "That is precisely what a smug pebble would want you to think. Regardless — thank you for participating in science."]
        ]),
        st("I have been reclusive this week. Do not take it personally. The rocks, however, may take it personally. They noticed.", [
            ["The rocks missed you?", "The rocks notice everything. They are patient observers. It is why I respect them, and also why I whisper around them."],
            ["Glad you're out and about!", "Yes. Sunlight is... adequate. Company is... acceptable. You may tell no one I said either of those things.", 2]
        ])
    ],
    "Penny": [
        st("Oh good, it's you. Everyone else keeps asking if I'm 'doing okay.' I'm a fern in a pot. I'm doing FERN.", [
            ["Doing fern sounds pretty good.", "It is, actually. Low expectations, good light, occasional drizzle. The secret to happiness nobody asks ferns about."],
            ["...ARE you doing okay though?", "Ugh. Fine. Yes. The rain last night was gorgeous and I feel things about it. Don't tell anyone I said that. I WILL tell everyone you asked."]
        ]),
        st("I heard a secret today. I'm not telling you what it is. ...It's about Zephyr. It involves a berry. That's all I— it fell in a tidepool. Okay I'm done.", [
            ["You are SO bad at secrets.", "I know! I KNOW. It's the fronds — secrets just slide right off. Honestly, telling me anything is basically publishing it."],
            ["Wait, tell me the rest!", "There IS no rest, that was the whole secret! Zephyr, berry, tidepool. Riveting stuff. You didn't hear it from me. You did. You did hear it from me."]
        ]),
        st("Smell that? Rain's coming. I can feel it in my soil. This is the best part — the BEFORE part.", [
            ["You really love rain, huh?", "It's the one weather that comes to YOU. Sun makes you find it, wind just shoves you around. Rain shows up. Respect."],
            ["I'll grab my umbrella.", "See, Rollo carries the umbrella FOR me. Perks of being potted. Enjoy your soggy socks, ambulatory friend."]
        ])
    ],
    "Mimis": [
        st("PERFECT timing! I'm planning a party. Theme: glitter. Venue: everywhere. Date: eventually. RSVP: mandatory!", [
            ["I'm in. Obviously.", "YES! You're on decoration duty, which means standing still while I decorate YOU. It's a very important role!", 2],
            ["What's the occasion?", "Occasion?! The occasion is that it's been DAYS since the last party. That's a crisis, and I'm the emergency response."]
        ]),
        st("Shhh! Don't move. I hid glitter somewhere on this beach and even I don't remember where. It's like a landmine, but festive.", [
            ["You glitter-trapped the beach?!", "Trapped is such a strong word. I ENHANCED it with surprise sparkle. Someone's going to have the best worst day!"],
            ["What if I step in it?", "Then congratulations! You'll shimmer for a week and everyone will know you've been somewhere FUN. You're welcome!"]
        ]),
        st("Question! On a scale of one to SPECTACULAR, how do you feel about surprise confetti? Asking for no reason. Hold still.", [
            ["...Spectacular?", "CORRECT ANSWER! POOF! — okay I didn't actually have any loaded. But the LOOK on your face! Filing that away for the real one."],
            ["Mimis, NO.", "Mimis YES. But fine, fine — you get a confetti exemption. Today. Tomorrow the sky sparkles for everyone, no exceptions!"]
        ])
    ],
    "Hudson": [
        st("Ah, you're here. Sit. Well — stand, I suppose. Did you know the first tea was steeped entirely by accident? Leaves in the wind. Fate in a cup.", [
            ["Tell me more tea facts.", "Gladly! Gyokuro is shaded three weeks before picking — patience you can TASTE. Not that anyone on this island asks. Their loss."],
            ["Is that story true?", "Every good tea story is true in the ways that matter and improved in the ways that don't. That's called tradition."]
        ]),
        st("I observed someone — I shan't say who — microwave water for tea this week. I required a full day to recover.", [
            ["The horror. The HORROR.", "THANK you. Water must be coaxed, not ambushed. You understand. You're the only one here who understands.", 2],
            ["...What's wrong with microwaves?", "What's wrong with— sit down. No, actually, stand. Walk with me. This will take several lectures and a demonstration."]
        ]),
        st("A cup holds more than tea, you know. It holds the pause. The whole point of tea is the pause.", [
            ["That's surprisingly wise, Hudson.", "SURPRISINGLY? I am a vessel of wisdom. Literally. It steeps in me. But — thank you. Come pause with me anytime."],
            ["I could use a pause today.", "Then consider this your official teatime, no cup required. Breathe in... and out. There. The Hudson method. No charge."]
        ])
    ],
    "Cort": [
        st("Good day. I am currently reading four books simultaneously. It is not efficient. It is, however, delightful.", [
            ["What are the four books?", "A history of lighthouses, a mystery, a treatise on knots, and a romance I am DEFINITELY only reading for the nautical terminology."],
            ["Pick a favorite.", "The mystery. I calculated the culprit in chapter two but I keep reading in case the author surprises me. They won't. I hope they do."]
        ]),
        st("Pixel made a reference today. 'It's dangerous to go alone.' Go WHERE? Alone WHY? I have compiled eleven follow-up questions.", [
            ["It's from an old video game.", "A game! That explains items three through nine on my list. Thank you. I will now research 'video games' thoroughly. See you in a week."],
            ["Some things aren't in books, Cort.", "Incorrect. Everything is in books EVENTUALLY. Pop culture is simply literature that hasn't settled down yet."]
        ]),
        st("I have begun cataloguing the island's library. It consists of my books and one soggy magazine Rusty found. Progress: slow but dignified.", [
            ["Can I borrow something?", "Yes! Excellent! First borrower! Let me issue you a card. It's a leaf. I stamped it. This is a big day for the library.", 2],
            ["A one-shelf library?", "Every great library began as one shelf and one stubborn librarian. I have both. History is patient, and so am I."]
        ])
    ],
    "Aiko": [
        st("Hi hi hi! I did a patrol this morning! Everyone is safe! The beach is safe! The rocks are safe! I checked the rocks TWICE!", [
            ["Why twice?", "Because the first time a crab looked at me funny! Follow-up inspection confirmed: friendly crab! Case closed! Island secure!"],
            ["You're very good at your job.", "I KNOW! I mean — thank you! Tail's wagging! Can't stop it! Don't want to!", 2]
        ]),
        st("I smelled something amazing today and followed it for an HOUR. It was Pippa's kettle. I regret nothing.", [
            ["An hour is commitment.", "The nose wants what the nose wants! And Pippa gave me a biscuit at the end, so technically it was a rescue mission. I rescued the biscuit."],
            ["What did it smell like?", "Warm! Like... cinnamon and safety? Smells are hard to explain. You have such a little nose. I'm sorry for your loss."]
        ]),
        st("Can I tell you a secret? Sometimes when the waves are big, I bark at them. They always back down eventually. Undefeated record.", [
            ["The tide fears you, Aiko.", "That's what I'm saying!! Twice a day it tries, twice a day it retreats. You're safe with me, friend. Always.", 2],
            ["That's... that's the tide.", "That's what a wave would SAY. Look, all I know is: I bark, they leave. I don't question the system. The system works."]
        ])
    ],
    "Ihor": [
        st("Ah. You. Witness me: I have been practicing my villain laugh. Mwa-ha... hm. Mwa-HA. No. It needs more echo. Everything needs more echo.", [
            ["Let's hear the full laugh.", "Very well! MWA-HA-HA-ha-ha... koff... the ending fell apart, but the OPENING? Chilling. Admit it. You were chilled."],
            ["Villains don't practice out loud.", "FALSE. All the great villains rehearse. Preparation is nine-tenths of menace. The last tenth is cape maintenance."]
        ]),
        st("My electric flytrap, Kevin, has eaten three moths this week. I am SO proud. He gets his cruelty from me.", [
            ["Kevin sounds lovely, actually.", "He IS. Don't tell him — a fearsome reputation must be maintained — but he purrs when it thunders. My terrible, perfect boy.", 2],
            ["You named your plant Kevin?", "The most sinister names are the unexpected ones. Nobody fears 'Dreadthorn.' But KEVIN? Kevin could be anywhere."]
        ]),
        st("Tell me honestly. When I loom — like this — is it menacing, or do I merely look like I'm checking the weather?", [
            ["Genuinely menacing. Well done.", "EXCELLENT. Years of loom practice, validated at last. You shall be spared in my eventual reign. Probably first spared."],
            ["Kind of a weather vibe, honestly.", "Curses. It's the posture, isn't it. Being a villain with good posture is HARD. Back to the crypt — I mean, drawing board."]
        ])
    ],
    "Psy": [
        st("GREETINGS. Sorry. Greetings. The volume comes from the heart. Everything I do comes from the heart. It is very loud in there.", [
            ["What's the heart saying today?", "TODAY IT SAYS: plant something. Anything. A seed, a kindness, a flag. The heart is not picky, only ENTHUSIASTIC."],
            ["Never apologize for volume.", "TRULY? Then I retract the apology at FULL POWER. THANK YOU, FRIEND. The birds have left but I regret NOTHING.", 2]
        ]),
        st("I planted three seeds this morning. One for the soil, one for the sky, one because my heart demanded a third. It always demands a third.", [
            ["What will they grow into?", "UNKNOWN! That is the finest part. A seed is a surprise you bury and then love until it tells you what it is."],
            ["Your heart has good instincts.", "IT HAS THE BEST INSTINCTS. My brain merely takes notes. The arrangement works beautifully for everyone."]
        ]),
        st("Friend. FRIEND. Come look. This sprout emerged TODAY. I have already given it a name, a song, and a five-year plan.", [
            ["What's its name?", "GERALD. It chose the name itself. I merely listened very loudly. Gerald will do GREAT things. Mostly photosynthesis."],
            ["A five-year plan for a sprout?", "Year one: leaves. Year two: MORE leaves. Years three through five: flexible, but ambitious. Gerald dreams big. We all should."]
        ])
    ],
    "Boll": [
        st("I have calculated all possible outcomes of this conversation. In eighty-one percent of them, we both leave slightly happier. Proceed.", [
            ["What happens in the other 19%?", "In most, a seagull interrupts us. In one memorable branch, you juggle. I do not know where the model got that. I hope for it daily."],
            ["Let's beat the odds. Maximum happiness.", "Recalculating... done. With that attitude, ninety-four percent. You have broken my model in the best direction.", 2]
        ]),
        st("An AI once told me my calculations were 'cute.' I have thought about this for three days. Enlightened beings should not be this bothered.", [
            ["Your calculations are magnificent.", "Thank you. I knew that. I calculated that you would say it, and it STILL felt good. Fascinating. Recalibrating my serenity now."],
            ["Being bothered is very mortal of you.", "Yes... enlightenment with a pinch of pettiness. Perhaps that is the true balance. I shall meditate on it. Briefly. While bothered."]
        ]),
        st("Observe the sunset probability: one hundred percent, and yet I am surprised by it every single evening. I have chosen not to debug this.", [
            ["Some bugs are features.", "Precisely. Wonder is an error I refuse to patch. Do not report it. Let the system stay beautifully broken."],
            ["Very enlightened of you, Boll.", "The enlightened being accepts what it cannot compute. Also the sunset is pink today. Pink! Unprecedented. (It was precedented.)"]
        ])
    ],
    "Taira": [
        st("Hey hey! Why did the computer go to the beach? To SURF the net! Ha! Okay I have a backup joke if that one crashed.", [
            ["Give me the backup joke.", "What do you call a Mac at sea? An iBuoy! ...I'll be here all week. Literally. I don't have legs that work great on sand."],
            ["That one landed just fine.", "Phew! Comedy status: ONLINE. You're a great audience. Five stars. Would joke again.", 2]
        ]),
        st("Random access memory time! I just remembered something from three weeks ago: the sunset was purple. That's it. That's the memory.", [
            ["Beautiful file. Keep it forever.", "Saving to permanent storage! You know what? You're in the file too now. 'Purple sunset, good friend.' Backed up twice."],
            ["Your brain is a mystery, Taira.", "Tell me about it! I've got ten thousand sunset files and I can't remember where I put my own charging cable. Priorities!"]
        ]),
        st("Beep! Status report: mood at ninety-eight percent, disk space wasted on jokes, and one mystery file labeled 'DO NOT OPEN.' I'm going to open it.", [
            ["Open it. Do it. Open it.", "Opening... it's a picture of a cloud shaped like a hat. PAST ME, YOU ABSOLUTE LEGEND. Crisis averted, hat confirmed."],
            ["Taira, respect the label!", "The label is FROM me, so by law I can betray it. ...It was a cloud hat. The suspense was better than the file. Classic."]
        ])
    ],
    "Mah": [
        st("hello. do not be alarmed by the ripples. the ink is just excited. it is rarely excited. you should feel honored.", [
            ["I am deeply honored.", "good. the veil approves of you. the creak also approves. i am outvoted on remaining mysterious about it. welcome."],
            ["What exactly ARE you, Mah?", "unclear. classification pending. the paperwork was eaten. possibly by me. we may never know. it is better this way."]
        ]),
        st("i reorganized my darkness today. there is now a corner for the loud thoughts and a shelf for the quiet ones. it is still messy. it is home.", [
            ["That sounds cozy, actually.", "it is. the void gets a bad reputation. mine has a rug now. metaphorically. the rug is also darkness. but PLACED darkness."],
            ["Can I see it sometime?", "no. yes. maybe. the veil says no but the veil said no to the rug too and look how that turned out. we will see, friend."]
        ]),
        st("a small fish looked into my depths today and saw itself. it swam away improved. i do not know how this works. i am glad it works.", [
            ["You're like a helpful mirror.", "a helpful mirror. the ink likes that. i have been called many things — anomaly, incident, 'oh no' — but that one is nicest.", 2],
            ["What did YOU see in the fish?", "lunch. no. a friend. no — a friend-shaped lunch i chose not to — the point is, restraint was shown and growth occurred. for both of us."]
        ])
    ],
    "Mira": [
        st("Oh, perfect — you're here! I've been dying to explain something to someone. Do you know WHY cauldrons are round? It's fascinating. Sit. Stand. Whatever.", [
            ["Why are cauldrons round?", "Even heat, no corners for the magic to sulk in, and — the best part — a round shadow at dusk looks like a doorway. Witches love a good doorway."],
            ["Do all your facts come with a lecture?", "Yes! It's a package deal. Fact, context, dramatic pause, optional diagram. You're getting the abridged version because I like you."]
        ]),
        st("I've been spinning again — focusing the self, aligning the intent. Also it makes my cap fly off, which the wind finds hilarious.", [
            ["Does the spinning actually work?", "Wonderfully! Three spins clears the mind, seven finds a lost thing, and twelve is just showing off. I do twelve constantly."],
            ["Teach me a spin?", "Yes! Start with your feet — no, the OTHER feet — okay: spin once, breathe, and ask yourself a question. The answer arrives dizzy but honest.", 2]
        ]),
        st("Look at this patch I stitched — the red scrawl there is protective. Well, decorative. Well — with witches the line between those is a suggestion.", [
            ["It's beautiful work, Mira.", "Thank you! Every stitch has an example. This one's for the time Gorm sneezed sparks near my hat. PRACTICAL beauty."],
            ["What does it protect against?", "Drafts, doubts, and one very specific seagull who knows what he did. So far: flawless record on all three."]
        ])
    ],
    "Liz": [
        st("Good day. I was contemplating neutron stars. A teaspoon of one weighs more than this entire island. I find that very calming.", [
            ["How is that CALMING?", "Perspective. My missing bone, the dock's creaky board — a teaspoon of star outweighs every worry I own. Very soothing math."],
            ["Tell me more space facts.", "Gladly. Light from some stars left before this island had trees. When you stargaze, you're reading very old mail. I love old mail."]
        ]),
        st("I attempted to explain orbital mechanics to Aiko today. She chased her tail. Honestly? A solid demonstration of angular momentum.", [
            ["Aiko understood better than most.", "Precisely my conclusion. She lacks the vocabulary but LIVES the physics. There's a lesson in that for all of us academics."],
            ["Two dogs, one physics lecture.", "It was a good seminar. Attendance: two. Comprehension: debatable. Tail-wags: numerous. I consider it a triumph."]
        ]),
        st("The tide is my favorite proof that the moon cares. It reaches down twice a day and the whole ocean reaches back.", [
            ["That's the loveliest physics I've heard.", "Physics is ALL lovely — it just mumbles. I merely translate. Come stargaze with me sometime; the moon shows off for company.", 2],
            ["The moon 'cares'? Scientifically?", "Gravitationally, which is the most reliable form of caring. It has never once forgotten to show up. Can't say that for everyone."]
        ])
    ],
    "Eo": [
        st("Hello, small friend. I spent today organizing the driftwood by size, then by color, then by how much each piece wanted to be a shelf.", [
            ["How does driftwood 'want' to be a shelf?", "You hold it gently and listen. Some wood is shelf-hearted. Some is bench-hearted. One piece was a spoon, deep down. I respected that."],
            ["Your beach must be immaculate.", "It is TIDY, which is different from immaculate. Immaculate has no room for sandy footprints. Tidy welcomes them. I prefer tidy."]
        ]),
        st("My chest panel has been glowing warmer lately. I checked the diagnostics. The diagnostics say: 'you are happy.' Good diagnostics.", [
            ["What's making you happy?", "The island. The weather. This conversation, now, as of eight seconds ago. My list updates in real time. You're on it often.", 2],
            ["Can I see the glow?", "Of course. There. That flicker? That's for you, small friend. No refunds. The glow is final."]
        ]),
        st("I offered to help Titan carry beams today. Two big robots, one small pile. We finished in minutes, then stood around feeling useful. Wonderful day.", [
            ["Standing around feeling useful is elite.", "It IS. The work is good, but the after-work stand? That is where the friendship lives. Titan agrees. He said 'hm' — high praise."],
            ["You and Titan should team up more.", "We plan to. Next project: a bench big enough for everyone. And by everyone I mean EVERYONE. Orla included. It will be a long bench."]
        ])
    ],
    "Quark": [
        st("HIHIHELLO! Look look LOOK — found a bottle cap, found a shiny pebble, found a SECOND bottle cap! Today is the best day EVER!", [
            ["Show me the collection!", "OKAY so cap one is the crown jewel, the pebble is security, and cap two — cap two is for YOU. Because you asked! Take it take it!", 2],
            ["You say every day is the best day.", "And I'm RIGHT every time! You can't argue with a perfect record! Tomorrow's gonna be the best day ever TOO — just watch!"]
        ]),
        st("Quick question quick question: if the sun glints off the water, and the water moves, does that count as a MILLION shiny things or ONE big one?", [
            ["A million. Definitely a million.", "THAT'S WHAT I SAID! A million tiny treasures a second! Nobody can collect them and that makes me crazy and ALIVE!"],
            ["One big one, I think.", "Ohh, big-picture thinker! Okay okay: one MEGA-shiny. Rare classification! I'll allow it! You get partial credit and a high five!"]
        ]),
        st("I sorted my shinies by SPARKLE-PER-SECOND today! The magnetic claw only dropped things twice! Personal record! Applaud me!", [
            ["Bravo! Bravo, Quark!", "YESSS! Thank you! The claw thanks you! The shinies thank you! I'm putting this moment in my top ten moments — it's ALL top ten!"],
            ["What's your rarest shiny?", "A marble with a WHOLE TINY STORM inside. Found it in the tide pools. Sometimes I shake it gently to give the storm exercise!"]
        ])
    ],
    "Zora": [
        st("...Hello. Today I am pale blue with a ribbon of gold. It means contentment, with a thread of curiosity. The curiosity is about you.", [
            ["What are you curious about?", "How you carry so many colors inside and show them only with your face. It seems like hard work. Your face does it beautifully, though."],
            ["What do my colors look like?", "Warm at the center, bright at the edges, a little tired around lunchtime. Very honest colors. I enjoy watching them."]
        ]),
        st("I meditated on the sea breeze for six hours today. The breeze meditated back. We have reached an understanding.", [
            ["What's the understanding?", "It will keep moving, I will keep pulsing, and neither of us will hurry. It's a very old agreement. We renew it weekly."],
            ["Six HOURS?", "Time moves differently when you are mostly water. Six hours, one wave — from the inside they feel remarkably similar. Both lovely."]
        ]),
        st("...You arrived and my colors shifted to seafoam and rose. I don't choose it. The body simply says: friend approaching.", [
            ["That's the nicest greeting ever.", "The colors agree — they've gone brighter. See? You did that. Come by whenever you like. My light is always on. Literally.", 2],
            ["Do you glow for everyone?", "For most, a polite shimmer. For a few, a full bloom. The body keeps its own guest list. You made it long ago."]
        ])
    ],
    "Basil": [
        st("Well, well. The Dreamer returns. Riddle me this: what walks the whole island but never leaves footprints in ME? Oh wait — it's you. You'd better not.", [
            ["Wasn't planning on it!", "Good. Because the LAST person who stepped on my vines got sassed so hard they apologized to three unrelated plants on the way home."],
            ["Give me a real riddle.", "Fine: I have flowers but I'm no bouquet, I laugh and my petals give me away. What am I? ...It's me. I'm the answer. All my riddles are about me."]
        ]),
        st("I grew a fresh sarcastic comment this morning. Haven't used it yet. It's just sitting there. Ripening.", [
            ["Use it on me. I can take it.", "Tempting — but no. You're one of maybe three islanders who visits without needing something. The comment can wait for someone who's earned it.", 2],
            ["What happens if you don't use it?", "It composts into passive aggression. Nobody wants that. Don't worry — Gorm will do something rooted in poor judgment any minute now."]
        ]),
        st("My purple flowers opened twice today, which means I laughed twice, which is annoying because BOTH times were things Kiko said. Earnestness is contagious.", [
            ["Kiko IS accidentally hilarious.", "RIGHT? The rabbit asked me if riddles 'have feelings.' The flowers just POPPED open. I've never been so betrayed by my own botany."],
            ["Laughing is good for you, Basil.", "Ugh, don't WELLNESS at me. ...But yes. Fine. The vine feels looser when I laugh. This conversation never happened."]
        ])
    ],
    "Gearwick": [
        st("Ah — right on schedule. Well, YOUR schedule. I keep one for you. Don't be alarmed. It says 'wanders by, improves the hour.' You're punctual.", [
            ["You schedule my wandering?", "I schedule EVERYTHING. Tides, teatimes, Zephyr's gossip rounds — accurate to the minute, that bird. Your slot is my favorite. Note the gold star."],
            ["What's next on YOUR schedule?", "Four o'clock: wind the left elbow. Four-fifteen: admire the sea, briskly. Four-thirty: flexible time, which I spend feeling nervous about its flexibility."]
        ]),
        st("Confession: a power outage once cost me a deadline, and I still think about it. It was eleven years ago. I have scheduled letting it go for next spring.", [
            ["Why NEXT spring?", "One doesn't rush closure. It's on the calendar between 'reorganize the gear oil' and 'learn to whistle.' Ambitious quarter, honestly."],
            ["Maybe let it go today?", "TODAY? Unscheduled emotional growth?! ...Hm. The gears didn't seize when you said that. Interesting data. I'll pencil it in. In pen. TODAY. Goodness.", 2]
        ]),
        st("The tide was ninety seconds late today. The TIDE. If the ocean can be sloppy and still magnificent, perhaps there's hope for the rest of us.", [
            ["Even you run late sometimes?", "Once. In the rain of '19. I arrived four seconds behind and apologized to a bench. The bench forgave me. I did not."],
            ["The ocean would like a word.", "The ocean and I have an understanding: it's allowed to be late because it's very big and very old. The same excuse works for Birch."]
        ])
    ],
    "Zephyr": [
        st("OH GOOD you're here — okay so — Nixie told Clover who told a butterfly who told ME that somebody's growing a SECRET garden. I have theories. I have NOTES.", [
            ["Whose garden is it?!", "UNCONFIRMED, but the shortlist is Sprig, Willow, or — dark horse — GRUMBLE. Imagine! Grumble! Secret petunias! I need to sit down. I can't sit down. Hummingbird."],
            ["A butterfly is your source?", "Butterflies are EXCELLENT sources! Impeccable access, zero discretion. The gold standard of island journalism. My notebook has a whole butterfly section!"]
        ]),
        st("Quick update quick update: the tide pools are DRAMATIC today, two crabs are feuding, and Rollo said 'overproofed' in a tone I'll be analyzing all week.", [
            ["Tell me about the crab feud.", "Crab one claimed the good rock. Crab two ALSO claimed the good rock. It's been four hours of aggressive sidling. I've named them Chip and Vinegar. Team Vinegar."],
            ["How do you keep track of it all?", "The notebook, obviously, plus raw hummingbird processing power. My heart beats a thousand times a minute — the gossip needs somewhere to GO."]
        ]),
        st("Okay okay okay — I need a favor. If anyone asks: you did NOT hear about the secret garden from me. I have a reputation for discretion to PRETEND to maintain.", [
            ["Your secret's safe with me.", "You're the BEST. This is why you're the only islander in my notebook under 'trustworthy AND interesting.' It's a very short page!", 2],
            ["You told literally everyone.", "I told SELECTED everyone! Curated everyone! There's a difference and the difference is professionalism, thank you very much!"]
        ])
    ],
    "Gorm": [
        st("Psst. Dreamer. If anyone asks: you have NOT seen any glitter. Especially not a hoard of it. Especially not behind the third rock. Forget I mentioned rocks.", [
            ["What glitter? What rocks?", "PERFECT. Flawless. You're a natural. For your discretion: one (1) pinch of the good glitter. The sparkly kind. Well — it's ALL sparkly. That's the point of my life.", 2],
            ["Mimis is looking for that glitter.", "WHAT?! Okay. Okay okay okay. New plan: the hoard was never here, I was never here, and if Mimis asks, a very sparkly seagull did it. GORM AWAY."]
        ]),
        st("AH! Fire! Terrifying! Horrible! ...What? No, my tail's ALWAYS glowing like an ember, that's — that's different. That's decorative. EEK, flames. So scary.", [
            ["Gorm, you're a DRAGON.", "A dragon who commits to the BIT! Do you know how much attention a fire-fearing dragon gets? Gasps! Concern! Snacks of pity! The system is flawless."],
            ["Your tail IS on fire though.", "It's AMBIENT WARMTH. Mood lighting. The one flame I trust. All other fire remains — say it with me — 'so terrifying.' Wink."]
        ]),
        st("Big news. HUGE news. I found a bottle cap that catches the light at EXACTLY the right angle at sunset. It's basically treasure. It's going in the hoard.", [
            ["Show me at sunset?", "You want a hoard viewing?! At GOLDEN HOUR?! You are getting the full tour. Wear something dull so you don't compete with the collection."],
            ["How big is this hoard now?", "Between the glitter, the caps, and one suspiciously sparkly pinecone: dangerous levels of dazzle. If I sneeze near it, the island gets a light show."]
        ])
    ],
    "Sprig": [
        st("oh! hello... I was just practicing saying hello louder. that was attempt twelve. how did it sound?", [
            ["Loud and proud, Sprig!", "really...? oh, that's... that's the nicest review yet. attempt thirteen might even include a wave. baby steps. tiny mushroom steps.", 2],
            ["You can whisper. I don't mind.", "oh thank goodness. whispering is where all my best thoughts live. the loud ones get stage fright and forget the words."]
        ]),
        st("if you're ever feeling too big and too fast... you can stand by me a while. that's the whole offer. it works better than it sounds.", [
            ["I'll take you up on that now.", "okay... there. feel that? that's nothing happening. it's my specialty. the moss teaches it and the moss is a very good teacher."],
            ["Does standing still really help?", "mm-hm. worries are like squirrels... they mostly chase things that run. stand still long enough and they wander off to bother someone jogging."]
        ]),
        st("a snail crossed my cap this morning. it took four hours. we didn't talk. it was the best visit I've had all week... no offense.", [
            ["None taken. Snails are good company.", "the BEST company. no small talk, no big talk... just a shared understanding that nobody's in a hurry. you're good company too. medium speed."],
            ["What's the snail's name?", "oh, we're not on name terms yet... maybe after a few more crossings. you can't rush these things. well... the snail literally can't."]
        ])
    ],
    "Rollo": [
        st("Ah, you're here. Good. Smell that? Someone on this island is baking with COLD butter and I can FEEL it. The crumb will suffer. The crumb always suffers.", [
            ["How can you tell from here?", "The nose knows, kid. Thirty years — well, thirty wooden years — of dough. I can hear an underproofed loaf sulking from across the beach."],
            ["Maybe they like dense bread?", "LIKE dense— ...I'm calm. I'm calm. Everyone has a journey. Some journeys just have very, very sad bread in them."]
        ]),
        st("I dreamed of the perfect croissant again. Eighty-one layers. EIGHTY-ONE. I woke up and rolled the sand flat for two hours just to cope.", [
            ["Describe the croissant.", "Golden. Audible. The kind of flake that falls like autumn. Structurally? A miracle. Emotionally? A memoir. I'll chase it the rest of my days."],
            ["The beach does look very flat.", "Thank you. If I can't perfect pastry on this island, I'll perfect SOMETHING. Today it was sand. Tomorrow, who knows. Standards don't rest."]
        ]),
        st("Between us? Pippa's scone recipe is nearly there. NEARLY. One fold short of glory. I've been hinting for weeks. Subtly. With diagrams.", [
            ["Diagrams aren't subtle, Rollo.", "They were SMALL diagrams. Left in SMALL places. Her teapot, her doorstep, her hat. The point is: I believe in her. Loudly. With visuals."],
            ["Why not just tell her?", "A baker must FIND the fold, kid. You can't gift someone the fold. You can only... aggressively enable the conditions for the fold. It's called mentorship.", 2]
        ])
    ],
    "Nyx": [
        st("Boo. ...Nothing? Not even a flinch? Hmph. You're getting harder to spook, Dreamer. I respect it and I WILL escalate.", [
            ["Do your worst, ghost.", "Oh-ho! A challenge! Very well — check your left pocket sometime today. I've done nothing to it. NOW the haunting is in your head. Classic Nyx.", 2],
            ["I flinched on the inside.", "Awww, thank you. A courtesy flinch. See, THIS is why you're my favorite. Everyone else just sighs and asks where their keys went."]
        ]),
        st("Riddle time! I took your... hmm... no wait, that's a confession, not a riddle. Let me start over. Riddle time! What has no hands and borrowed your trowel?", [
            ["NYX. Where's my trowel?", "Behind the second rock from the dock — and honestly, calling it 'borrowed' hurts. It was RELOCATED. For fun. The trowel had a wonderful time."],
            ["Is the answer 'a delightful ghost'?", "CORRECT! Full marks! And because you played along: your trowel's behind the second rock by the dock. See how pleasant that was? Riddles improve everything."]
        ]),
        st("I spent all afternoon rearranging Grumble's pebble collection into a smiley face. He hasn't noticed. When he does, I want you to LOOK at his face.", [
            ["He's going to lose it.", "He's going to say 'hmph' with SUCH feeling. And then — this is the good part — he'll leave it that way. He always leaves my art up. Softie."],
            ["That's surprisingly wholesome.", "I'm a WHOLESOME menace. Playful hauntings only. The scary stuff is for amateurs — real artistry is a pebble smiley and a long game."]
        ])
    ],
    "Titan": [
        st("Hm. You're here. Good. I finished the retaining wall by the garden today. It will outlast all of us. That's the point of walls.", [
            ["It's beautiful work, Titan.", "It's LEVEL work. Beauty is what people call level when it surprises them. ...But thank you. The wall appreciates it too.", 2],
            ["What's next on the list?", "A ramp for Orla. The dock stairs disrespect her. Nobody asked me to build it. The good projects are usually the ones nobody asks for."]
        ]),
        st("I tested every board on the dock this morning. Stepped on each one. Twice. Three complained. They'll be replaced with honor.", [
            ["What happens to retired boards?", "They become shelving. A board's second life is quieter but dignified. Nothing that held people up gets thrown away. Policy."],
            ["The dock thanks you, big guy.", "Hm. The dock says nothing. That's how I know it's sturdy. Loud structures are worried structures. Remember that."]
        ]),
        st("Someone left flowers on my toolbelt while I worked. I have not moved them. Production is halted indefinitely.", [
            ["You could just... pick them up?", "And risk bruising a petal with these hands? No. The flowers decide when the workday resumes. I can stand very still for a very long time."],
            ["Who left them?", "Unknown. Clover was nearby, whistling with suspicious innocence. I will not investigate. Some mysteries are better left blooming."]
        ])
    ],
    "Orla": [
        st("Ah, Dreamer! Sit, sit — metaphorically, we're on a beach. Did I ever tell you about the storm of the copper moon? No? WONDERFUL. It begins, as all storms do, with a suspicious calm...", [
            ["Tell me the whole thing.", "The whole— oh, you beautiful listener. Very well: the calm lasted three days. The gulls went quiet. My great-aunt Morla — you'd have loved her — looked at the sky and said... come back tomorrow. Cliffhangers keep us both young.", 2],
            ["Is this a long story?", "All my stories are long, dear. That's how you know they're true. Short stories are just long stories that lost their courage."]
        ]),
        st("You know, I never forget a name — and yours has been coming up all over the island lately. Good things. Mostly. Zephyr's account had embellishments.", [
            ["What are they saying?!", "That you help. That you listen. That you once carried something heavy for someone — the object changes with each telling. By spring it will be a boulder. Let it grow, dear. Let it grow."],
            ["What was Zephyr's version?", "In Zephyr's version you also fought a wave and won. I kept my corrections gentle. A good story needs one impossible thing — it's the load-bearing lie."]
        ]),
        st("I waddled the whole shoreline today. Took hours. My bladders are exhausted. But the sea and I caught up on everything — she's a marvelous gossip, the sea.", [
            ["What's the sea gossiping about?", "The usual: which rocks are shifting, where the fish are summering, and that she thinks the moon has been showing off lately. She's right. He has."],
            ["You should rest, Orla.", "Rest! Ha! I'm a whale on LAND, dear — my whole existence is a rest the ocean never approved. I'll rest when the stories run out. They won't."]
        ])
    ],
    "Jax": [
        st("Hey. Look at this chunk of feldspar. LOOK at it. You don't get grain like that without a few thousand years of commitment. That's what I call a ROCK SOLID work ethic.", [
            ["That pun was inevitable.", "Inevitable like EROSION, friend. Slow, relentless, and it always wins. I've got a million of 'em and geological time to use 'em."],
            ["It's a beautiful specimen.", "RIGHT? Everyone's chasing shiny crystals. Meanwhile the honest sedimentary stuff holds the whole island together and never asks for credit.", 2]
        ]),
        st("My fissures are glowing extra today. It means I'm fired up. About what? Gravel. Somebody called my gravel pile 'clutter.' CLUTTER.", [
            ["Who called it clutter?!", "No names — but they FLIT and they GOSSIP. It's not clutter. It's an archive. Every pebble in that pile has a backstory. Some have TWO."],
            ["To be fair, it does sprawl a bit.", "It's not sprawl, it's a DEBRIS FIELD. There's a difference and the difference is INTENT. Hmph. You can stay, but only because you're honest."]
        ]),
        st("Found a geode this morning. Haven't cracked it. Might never crack it. There's something about a rock keeping one secret, y'know?", [
            ["Never crack it. Respect the secret.", "THAT'S what I'm saying! Best part of a geode is the maybe. Crack it and you've just got sparkly gravel and no mystery. You get it. Rock solid judgment."],
            ["I'd crack it immediately.", "Ha! Fair. There's two kinds of folks: crackers and keepers. Takes both to run an island. But this beauty stays sealed on MY watch."]
        ])
    ],
    "Clover": [
        st("Hi hi! I hid in the tall grass for two hours today and NOBODY found me! ...Nobody was looking. It still counts! Undefeated!", [
            ["Absolutely it counts.", "RIGHT?! A win is a win! Tomorrow I'm hiding by the dock. Don't look for me — but also, if nobody looks by lunch, PLEASE look for me.", 2],
            ["Want me to actually seek next time?", "WOULD YOU? Oh, this is the best day! Fair warning: I am VERY good. Four leaves of pure stealth. The halo's the only thing that gives me away."]
        ]),
        st("Guess what! It rained on me this morning and then the sun came out and I got a personal rainbow. MY rainbow. I'm basically famous now.", [
            ["Can I get your autograph?", "Of course! It's a little clover stamp. There. You've been officially lucked! That's worth at LEAST one good thing today. Report back!"],
            ["The rainbow was for all of us.", "Hmm. Generous take! Counterpoint: it landed directly on ME. But okay, fine — I'll share. That's very clover of me. Luck's better shared anyway!"]
        ]),
        st("Silver shoes update! Still shiny, still excellent for sneaking, still my best find EVER. Every step sounds like a tiny bell. Listen! ...Did you hear it?!", [
            ["I heard it! Tiny bell confirmed.", "YES! You have GREAT ears! Most people say it's 'just sand.' JUST SAND. As if luck doesn't jingle! You get it. We're best friends now, it's decided."],
            ["Aren't bells bad for sneaking?", "You'd THINK! But here's the trick: everyone hears a tiny bell and looks UP for a fairy. Meanwhile I'm at ankle height, winning hide-and-seek. Flawless system!"]
        ])
    ],
    "Sprocket": [
        st("Perfect timing! Hold this spring. Now hold this OTHER spring. Okay — you're now my workbench. Comfortable? Great. This'll take four minutes, tops.", [
            ["What are we building?", "A self-stirring soup spoon for Pippa! Or, depending on how these springs behave, a small catapult. Invention is forty percent intent, sixty percent surprise."],
            ["Do I get workbench wages?", "You get the FIRST PROTOTYPE, which is better than money because it's unstable and one of a kind! ...Mostly the first thing. Deal's a deal.", 2]
        ]),
        st("So the automatic banana peeler had what I'm calling a 'spirited debut.' The banana is fine. The banana is in a tree. A DIFFERENT tree.", [
            ["How did it get in a tree?", "Torque, my friend! Beautiful, ambitious, poorly aimed torque! Version two will have a banana catcher. Version three IS a banana catcher. The roadmap is fluid."],
            ["Is the peeler okay?", "The peeler is thriving! Relocated to seagull-deterrent duty, where its enthusiasm is an asset. No invention fails — some just find different callings."]
        ]),
        st("Listen. LISTEN. What if the dock... had wheels? Don't answer yet. I've done zero math but I have SO much conviction.", [
            ["A rolling dock. Genius. Terrifying.", "EXACTLY the reaction I wanted! All great inventions live between genius and terrifying! I'll start small: a rolling BENCH. Titan's going to have opinions."],
            ["Where would the dock GO?", "Wherever the fish are! Mobile infrastructure! ...Okay, hearing it out loud, the fish come to US, don't they. Fine. FINE. The wheels go on something else. The idea SURVIVES."]
        ])
    ],
    "Luna-2": [
        st("Ah. You. I was just asking myself: does a nap end because the sleep is finished, or because the world grows impatient? Sit. Ponder. There's shade enough for two.", [
            ["The world grows impatient.", "My conclusion as well. Naps are infinite; interruptions are not. Somewhere there is a nap I began as a kitten, still waiting to be resumed. One day."],
            ["Naps end when the sun moves.", "Mmm. The sun — the great nap curator. It arranges the warm patches; we merely attend the exhibit. That's rather good. I'll add it to the scroll."]
        ]),
        st("My scroll gained a new entry today: 'A closed eye sees the best views.' Luna says I stole the thought from her mid-yawn. Twins share yawns. The COPYRIGHT is murky.", [
            ["What else is on the scroll?", "Ancient wisdom: 'The cushion knows.' 'Never trust a full food bowl — ask why.' And my earliest work: 'mrrp,' which loses something in translation."],
            ["You two fight over philosophy?", "Constantly. She believes adventure is the meaning of life. I believe the meaning of life naps somewhere warm and shouldn't be woken to settle arguments."]
        ]),
        st("I watched the tide come in today. Then out. In again. The ocean cannot decide, and yet no one calls IT lazy. I find this instructive.", [
            ["The ocean IS just napping, isn't it.", "At LAST, someone sees it. The tide is the ocean rolling over in its sleep. The moon keeps tucking it back in. I've written this down. You may cite me.", 2],
            ["You're overthinking the water.", "'Overthinking the water.' ...No, no, don't apologize — that's going on the scroll TOO. You're quite quotable for someone so awake."]
        ])
    ],
    "Vira": [
        st("You're here! Why are you here? No — wait — I mean it with delight! WHY are you here! What did you see on the way! Was any of it strange! Tell me the strange parts first!", [
            ["A crab was carrying a leaf. Like a sail.", "A SAIL?! Why?! Does it WORK? Is the crab going somewhere or just... aesthetically prepared?! I have to find this crab. I'm glowing. Look how much I'm glowing!"],
            ["Why are YOU here?", "OH, turnabout! I like it! I'm here because the tide pools do a thing at this hour where — actually, why does ANY water hold still? Come look! Questions are better with company!", 2]
        ]),
        st("I asked Birch 'why' eleven times in a row today. On the eleventh, he just said 'yes.' I've been vibrating about it ever since. Was that wisdom?! It felt like wisdom!", [
            ["That was definitely wisdom.", "I KNEW it! The best answers don't even match the question! That's the eleventh-why zone — past all the easy answers, into the good fog! I'm going for twelve tomorrow."],
            ["That was Birch giving up.", "Was it?! Or is giving up after ten whys itself an ANSWER about the limits of— oh no. You've triggered a why-cascade. Why do answers end before questions do?! WHY—"]
        ]),
        st("Look — my tendrils are pulsing in twos today instead of threes! Why! I don't know! Isn't that WONDERFUL? Being a mystery to yourself is very efficient. The wonder is always in stock.", [
            ["You're your own favorite question.", "YES! Exactly! Other beings meditate to find themselves — I just check my own glow and find something NEW. Self-discovery with a light show. Recommended!"],
            ["Should you see a doctor about that?", "A doctor would just tell me WHAT it is. I'm after WHY it is. Different department! No offense to doctors. Some offense to the concept of settled answers."]
        ])
    ],
    "Birch": [
        st("Hello, little walker. I've been standing here thinking about a legend the wind told me — about an island that grew wherever kindness was planted. Slow story. Good roots.", [
            ["Is the legend about THIS island?", "The old stories never say which island. That's their trick — they make you tend the one you're standing on, just in case. Wise, for stories."],
            ["Tell me more sometime?", "Come sit against my trunk any evening. The legends surface at dusk, like fish. Bring patience. Bring a snack. The stories don't mind crumbs.", 2]
        ]),
        st("Your seasons move so quickly, little one. I've watched four hundred springs. The trick, if you want it: don't count them. Taste them.", [
            ["How does one taste a spring?", "Stand in the first warm rain with your face up. That's the whole lesson. The birds mastered it ages ago. Watch the birds."],
            ["Four HUNDRED springs?", "Give or take a dozen — I stopped counting, per my own advice. The rings keep the number. I keep the flavor. We're both content with the arrangement."]
        ]),
        st("A young sapling asked me today how to grow tall. I told it: mostly, don't stop. It seemed disappointed. The truth is often shorter than the question.", [
            ["Solid advice, honestly.", "The best advice is boring — that's how you know it works. The exciting advice is what makes legends, and most legends are warnings wearing nice clothes."],
            ["The sapling wanted secrets.", "They always do. The secret IS the patience. But saplings must discover that slowly — telling them fast would defeat the lesson. Time teaches with a gentle hand."]
        ])
    ],
    "Flick": [
        st("You've arrived at the PERFECT moment — the wind just died down and my flame is doing its BEST work. Behold. BEHOLD. ...You may behold at your leisure, I'll hold the pose.", [
            ["Consider yourself beheld.", "THANK you. Do you know how few people properly behold anymore? Everyone's so busy. You, though — you have the soul of an audience. The HIGHEST compliment.", 2],
            ["Your flame does look great today.", "Doesn't it?! Low humidity, gentle breeze, dramatic lighting — I woke up and CHOSE radiance. Well. I woke up radiant. The choosing is ongoing."]
        ]),
        st("Storytime rehearsal! Picture it: a dark night. A lone candle. A tale SO gripping that the — hm. I melted a little just thinking about the good part. Occupational hazard.", [
            ["What's the tale about?", "A lighthouse who fell in love with a passing storm. It's TRAGIC. It's LUMINOUS. It's forty minutes long with intermission. You'll weep. I'LL weep. Wax everywhere."],
            ["You melt when nervous AND excited?", "I melt when I FEEL, darling. Big feelings, big drips. My cape has wax stains from every great story I've ever told. It's not damage. It's a RESUME."]
        ]),
        st("The moths have been circling me again. I know, I know — occupational hazard — but honestly? An adoring public is an adoring public. I've learned their names.", [
            ["Introduce me to the moths.", "The big one is Sir Dusty. The fast one, Miranda. The one who bonks into me nightly is Kevin — no relation to Ihor's Kevin. Or... IS there. Island mystery!"],
            ["Isn't that dangerous for them?", "We have an ARRANGEMENT. They keep a respectful distance, I keep the flame low, and everyone gets their drama safely. Theater rules: awe from the mezzanine."]
        ])
    ],
    "Draven": [
        st("...Oh. You. I was just watching the clouds cross the moon. Even in daylight, I know where the moon is. It's a whole thing. Don't worry about it.", [
            ["That's actually a cool skill.", "...It is, isn't it. Most just say 'the moon isn't out, Draven.' The moon is ALWAYS out. Somewhere. Like sorrow. And breakfast."],
            ["Write any poems lately?", "One. About the tide. 'It leaves. It returns. It never explains.' ...It's a short poem. The best griefs are brief. I'm workshopping a longer one about fog.", 2]
        ]),
        st("I howled at the moon last night. Quietly. A courtesy howl. The island sleeps and my melancholy is not the island's burden.", [
            ["A considerate werewolf. Rare.", "Brooding responsibly is a discipline. Full-volume anguish is for the deep woods and special occasions. Tuesday was neither. The moon understood."],
            ["What does a quiet howl sound like?", "Like a sigh with ambition. The moon hears it fine — she has excellent hearing for the melodramatic. We've established a rapport over the years."]
        ]),
        st("Selene and I have been composing together at night. Her light, my verses. The crickets provide rhythm but demand creative control. Artists.", [
            ["I'd love to hear a performance.", "...Truly? We perform at moonrise, cliff-side. Attendance to date: one ghost, several moths, a politely confused crab. You'd raise the average considerably.", 2],
            ["Crickets demanding creative control?", "They unionized in spring. Now every ballad needs a chirp solo in the second verse. Honestly? The chirp solos are the best part. Don't tell them."]
        ])
    ],
    "Pixel": [
        st("PLAYER ONE HAS ENTERED! Beep! Welcome back to the overworld, Dreamer! Today's quest log: talk to Pixel. Objective complete! You're SO efficient!", [
            ["What's my reward?", "One (1) friendship point and this dazzling victory jingle: doo-doo-doo-DOO! Save your progress often, player. The island has no continues — that we know of.", 2],
            ["This island IS like a game, huh?", "The BEST kind! Open world, no timer, side quests everywhere, and the NPCs — I say this with love and self-awareness — are extremely charming."]
        ]),
        st("Beep beep! I've been mapping the island in my head, old-school style. Grid paper. Fog of war. There's a spot by the cliffs I've marked 'HERE BE SECRETS.' No proof. Big vibes.", [
            ["I'll go investigate the cliffs!", "YES! Take a torch — metaphorically! Report your findings! If you hear mysterious beeping it's either ancient treasure or me following you. Fifty-fifty!"],
            ["'Big vibes' isn't cartography.", "INCORRECT! All the best maps ran on vibes! 'Here be dragons'? VIBES. My screen face can't wink but know that I am winking."]
        ]),
        st("Achievement idea! 'Sociable Islander: talk to every neighbor in one day.' I calculated it — it's totally possible. Speed-run rules. I'll be your timekeeper. Beep!", [
            ["What's the record to beat?", "There ISN'T one — you'd be setting the world record AND the island record simultaneously! Any-percent friendship run! Glory awaits! I'll make a trophy from a bottle cap!"],
            ["Friendship isn't a speed-run, Pixel.", "...You're right. Some content is meant to be a slow, hundred-percent completion experience. Wisdom unlocked! New achievement: 'Touched Pixel's Heart.' Ding!"]
        ])
    ],
    "Aria": [
        st("Daaaaarling! ~You're just in time!~ I've been rehearsing my new aria since dawn. The seagulls attempted harmony. I have FORGIVEN them, for I am generous. GENEROUS!", [
            ["Sing me a bar!", "~Meeee-mi-mi-MIIIII!~ ...That was merely the warm-up and it was ALREADY transcendent. The full performance is at sunset. Front row is wherever I'm facing.", 2],
            ["How bad were the seagulls?", "Darling. DARLING. Imagine a kazoo learning to scream. And yet! Art welcomes all voices — some voices are simply asked to welcome art from further away."]
        ]),
        st("A tragedy this morning! ~A TRAGEDY!~ My golden microphone slipped and was nearly claimed by the sea! Fear not — I dove. I recovered it. I have been retelling it hourly.", [
            ["You DOVE? Into the OCEAN?", "Three inches of tide pool, darling, but the FORM was Olympic and the STAKES were priceless. In the retelling there are also dolphins. Print the legend!"],
            ["The microphone is your whole life.", "It is my co-star, my confidant, my acoustically-questionable soulmate. Does it even work? Irrelevant! A diva holds a microphone; the universe provides the amplification."]
        ]),
        st("I repeated everything Zephyr told me today with DRAMATIC flair — ~with FLAIR!~ — and now three neighbors believe the tide pools are haunted. Oops? No. Not oops. ENCORE.", [
            ["Aria, that's how rumors start!", "Rumors, darling, are simply operas without funding. Besides, Nyx heard 'haunted tide pools' and RACED off to make it true. I've CREATED work for local ghosts. Patron of the arts!"],
            ["What did Zephyr actually say?", "'The tide pools look weird today.' From THAT, I built a LEGEND. This is the difference between reporting and PERFORMANCE, and I know which one gets applause."]
        ])
    ],
    "Grumble": [
        st("Hmph. You again. ...Well? Don't just stand there letting the wind through. Sit on a rock. Not that one. That one's mine. The OTHER one. There.", [
            ["Happy to sit on the correct rock.", "Hmph. Decent sitting form. Most folks perch like nervous gulls. You sit like you mean it. ...That's all. That was the whole compliment. Don't unwrap it further.", 2],
            ["They're ALL your rocks, aren't they.", "...Technically the caves are mine and the rocks are AFFILIATED. But yes. Fine. You're sitting on my associate. Treat him with respect, he's been here longer than the trees."]
        ]),
        st("Some pebbles got rearranged into a... shape... near my cave. A smiling shape. I know who did it. I haven't fixed it. Don't read into that.", [
            ["You LIKE the pebble smiley.", "I TOLERATE the pebble smiley. There's a difference. The difference is... hmph. The difference is nobody's business. It stays because moving pebbles is effort. THAT'S ALL."],
            ["Want help putting them back?", "NO. I mean — no. They're... load-bearing now. Structurally important smile. Very technical. You wouldn't understand. Leave the pebbles."]
        ]),
        st("Moss update: the mustache is coming in thick this season. Don't laugh. LICHEN takes decades to get right and mine is award-worthy. If there were awards. There should be awards.", [
            ["Finest moss mustache on the island.", "...Hmph. HMPH. Well. It's about consistent moisture and NOT letting squirrels nest in it, which is more discipline than most rocks have. ...Thank you. Tell no one I said that."],
            ["I'll organize a moss award.", "Don't you DARE make a fuss— ...what would the trophy look like. Hypothetically. Asking for the cave. The cave is competitive."]
        ])
    ],
    "Selene": [
        st("Ah... you've caught me before moonrise. I'm rehearsing tonight's arrangement — a little cluster of stars over the eastern water. Subtle. Hopeful. You'll see it if you look up around nine.", [
            ["I'll be watching at nine.", "Then I'll add one extra star, just off-center. That one will be yours. Don't tell the astronomers — they do hate an unexplained twinkle.", 2],
            ["You arrange them by HAND?", "By intention, which is gentler than hands. The stars are old friends — I merely suggest. Most nights they agree. On stubborn nights, we get 'abstract' skies. I claim those were on purpose."]
        ]),
        st("The night shift suits me, but I confess... I've been sneaking into more daylight lately. The way you all rush about while the sun's up — it's like watching a tide made of errands.", [
            ["What do you think of daytime?", "Bright. Loud. Overcommitted. And yet — the way Aiko chases her tail at noon is finer than several constellations I've placed. Don't tell the constellations."],
            ["We must look ridiculous.", "Wonderfully so. At night you all dream in private. In daylight you dream out loud and call it 'plans.' I find it moving. And a little funny. Mostly moving."]
        ]),
        st("Someone wished on a falling star last night. I won't say who. I won't say what. But I've been quietly nudging things in its favor all day. That's the job, really. The stars are just the paperwork.", [
            ["Do wishes actually work?", "Wishes aim the wisher. Once you've said it to the sky, you start walking toward it — I only clear a pebble or two from the path. The wish does its own heavy lifting."],
            ["Was it MY wish?", "Mmm... a moon spirit never tells. But — hypothetically — keep an eye on tomorrow. Hypothetically it looks promising. That's all. The stars are watching fondly."]
        ])
    ],
    "Bolt": [
        st("HEY! Hi! Hello! I ran the whole beach in — okay I didn't time it, TIMING is for slow people — but it was FAST. My antennae are still crackling! Feel the air! FEEL it!", [
            ["The air is... tingly, yes.", "RIGHT?! That's residual velocity! You're basically breathing my personal record! No charge! Ha — CHARGE. Okay okay what were we talking about? Doesn't matter! What's NEXT?"],
            ["Have you tried slowing down?", "Once! For four seconds! Worst four seconds of my life! I saw a snail overtake a leaf and I felt EVERYTHING. Never again. Full speed is where the peace is!"]
        ]),
        st("So I short-circuited a LITTLE this morning — a crab surprised me — and now my left antenna is doing this. See? Zappy. The crab and I have agreed to startle each other on a schedule now.", [
            ["You scheduled mutual startling?", "Tuesdays and Fridays! Keeps the reflexes SHARP and the friendship SPICY! He waves a claw, I spark, we both scream — it's the best relationship I've ever maintained!", 2],
            ["Is the antenna going to be okay?", "Oh totally! The zappy phase passes! By tomorrow it'll just be jazzy! ...Jazzy is the phase after zappy. There are eleven phases. I've named them all. FAST."]
        ]),
        st("IDEA! I deliver messages for everyone, island-wide, at MAXIMUM speed! Bolt Express! Slogan: 'It's Already There!' Flaw: I sometimes deliver the message before I remember it. Working on it!", [
            ["What happens when you forget one?", "I improvise! Willow got 'someone said something nice, probably about trees?' and honestly she LOVED it! Vagueness with enthusiasm is basically poetry!"],
            ["I'll be your first customer.", "YESSS! Bolt Express is OPERATIONAL! First message free! Second message also free! All messages free — wait, is that a business? TOO LATE, IT'S ALREADY THERE!"]
        ])
    ],
    "Gidget": [
        st("HI! Okay okay okay — acorn joke! Why don't oaks ever gossip? Because they'd tell EVERY-acorn! HA! I've got a hundred of those. Literally. I counted them like acorns!", [
            ["Hit me with another one!", "What's a squirrel's favorite way to travel? By ACORN-plane! HAHA! Okay that one's a stretch — but stretches are how you reach the high branches! FREE WISDOM!", 2],
            ["Do you count everything like acorns?", "YES! Jokes: acorns. Friends: acorns. Days until winter: acorns I don't wanna count! It's a flawless system, one nut at a time!"]
        ]),
        st("Explorer's cap update! Today's expedition found: one shiny wrapper (treasure!), one big leaf (blanket!), and a rock that looked at me funny (Grumble. It was Grumble).", [
            ["What did Grumble say?", "'Hmph!' — but like, the FRIENDLY hmph? There are at least nine hmphs and I speak all of them now. Hmph number four means 'get off my rock but come back tomorrow.'"],
            ["That wrapper is litter, Gidget.", "It WAS litter! Now it's ARCHIVED SHINE in my collection! Squirrels invented recycling, you know. Well — we invented burying stuff and forgetting it, which is basically donations!"]
        ]),
        st("I hid seventeen acorns today and I remember where SIXTEEN are! The seventeenth is a gift to Future Gidget! She loves surprises! She's gonna FLIP!", [
            ["Future Gidget is very lucky.", "SO lucky! Past Gidget hooked her UP! That's the family system: past me plants surprises, future me finds 'em, present me takes the credit! Everybody wins and they're all me!"],
            ["What if a bird finds it first?", "Then the bird wins the lottery and I've done a charity! No losers in the acorn economy! ...Okay ONE loser: the acorn. It had tree dreams. Circle of life is complicated!"]
        ])
    ],
    "Lunae": [
        st("Ohh... hello, walking one... I drifted through a cloud this morning and came out the other side wearing a little of it... see the wisp? It's still deciding whether to stay...", [
            ["The wisp suits you.", "You think so...? I'll invite it to remain... clouds rarely commit, you know... they're all drift and no anchor... like me... it's why we get along...", 2],
            ["What's inside a cloud like?", "Soft... and quiet... like being inside a held breath... you'd like it... maybe one day I'll carry you up... you're small... the cloud won't mind..."]
        ]),
        st("I dreamed while floating yesterday... or floated while dreaming... the difference matters less than you'd think... in the dream, the island was also floating... maybe it is... who checks?", [
            ["Nobody HAS checked, actually...", "Mmm... then let's not... some things are lovelier unverified... if the island floats, it floats... if it doesn't, we simply love a very grounded island... both are nice..."],
            ["Islands don't float, Lunae.", "The moon heard you say that... and the moon floats enormously, all night, out of spite... I'd apologize to her at moonrise... a small bow will do..."]
        ]),
        st("The wind carried me sideways today and I simply... allowed it... I saw parts of the island I'd never planned to see... planning is such a heavy thing to carry while floating...", [
            ["Where did the wind take you?", "Past the cliffs... over Daphne, who waved a petal... through Zeph, who giggled — going through Zeph tickles, apparently, for us both... a good accidental day..."],
            ["Don't you worry about drifting off?", "Sometimes... softly... but the island is sticky with friends... every time I drift too far, someone's laughter floats up... and I follow it home... a very reliable anchor..."]
        ])
    ],
    "Willow": [
        st("Hello, dear one. Come stand under the leaves a moment. You've been moving all day — I can tell. The leaves can tell. We compare notes, the leaves and I.", [
            ["Alright, I could use a moment.", "There. Feel the light get softer? That's the whole service. No appointment needed, ever. The leaves and I are open all hours.", 2],
            ["What do the leaves say about me?", "That you pause here more than you used to. They approve. Leaves measure everyone in pauses — it's the only clock they trust."]
        ]),
        st("I hummed a lullaby to the tide pools last night. The little fish settled right down. The crabs, of course, stayed up past bedtime. Crabs always do.", [
            ["Sing me the lullaby?", "Mmm... hmm-mmm... there, just the opening — the rest works too well. I can't have you napping standing up, dear. Come back at actual bedtime."],
            ["The crabs are a lost cause, huh?", "Oh, they listen — they just dance to lullabies instead of sleeping. Sideways, in little rows. Honestly? It's the sweetest insomnia I've ever caused."]
        ]),
        st("Someone sat against my trunk today and cried a little, then laughed a little, then left lighter. I won't say who. That's the arrangement — the bark keeps every secret.", [
            ["You're the island's best listener.", "The trick is having no schedule and deep roots, dear. Everything else is just staying quiet at the right moments. You'd be surprised how rare that is."],
            ["Do YOU ever need a listener?", "Oh... what a kind question. The wind listens to me, mostly at night. And now you, apparently, for one lovely moment. Consider my leaves fluffed. Thank you, dear.", 2]
        ])
    ],
    "Rusty": [
        st("Well, well. Look what the tide dragged in. Relax, that's a compliment — the tide brings me all my best stuff. Speaking of: check out this door hinge. Found ART, baby.", [
            ["It's... a hinge.", "It's a hinge NOW. Wait till it's the wing joint on my seagull sculpture. Then it's a masterpiece with a past. Every genius gets called 'a hinge' early on."],
            ["What's the sculpture going to be?", "'Seagull, Ascending, Judging You.' Mixed media: hinge, spoons, attitude. It's gonna capture the exact face a gull makes before stealing lunch. The people NEED this."]
        ]),
        st("Somebody — no names, rhymes with 'Schmearwick' — called my collection 'a hazard.' A HAZARD. It's an ARCHIVE of POTENTIAL. There's a difference and the difference is vision.", [
            ["It IS organized chaos, to be fair.", "EMPHASIS on organized! The pile on the left is 'soon,' the pile on the right is 'someday,' and the big pile is 'don't touch, it's load-bearing inspiration.' A SYSTEM."],
            ["Your art IS pretty great though.", "...Yeah? Ha! See, YOU get it. One islander's junk is another islander's early period. When the retrospective happens, you're getting a front-row bottle cap.", 2]
        ]),
        st("Big score today: half an umbrella, a boot with character, and a music box that only plays the first three notes. THREE notes. It's not broken — it's a cliffhanger.", [
            ["What are the three notes?", "Doo... dee... dum. And then SILENCE. Torture! Perfection! I've had four neighbors hum me possible endings. Wrong, all of 'em. The mystery is the melody now."],
            ["A boot with 'character'?", "Character means one hole, two stories, and a smell I've chosen to interpret as 'seasoned.' It's gonna be a planter. The most dignified retirement a boot can get."]
        ])
    ],
    "Ember": [
        st("OH! Hi hi hi! I was just — okay I was three ideas deep — there's a NEW idea now: what if we made s'mores? I'm the campfire! I've always BEEN the campfire! This is my MOMENT!", [
            ["S'mores would be incredible.", "RIGHT?! Get the berries — no wait, marshmallows — do we HAVE marshmallows? Doesn't matter! Ember-roasted ANYTHING is a delicacy! I'm so excited my sparks are sparking!", 2],
            ["Weren't you doing something else?", "WAS I? ...Oh! The leaf-drying station! It's fine, it's done, it was done an hour ago — I flicker FAST, friend! Three projects at once, all of them warm!"]
        ]),
        st("Someone hugged me today! Carefully! With the fireproof blanket Mira wove me! Do you know how long I waited for hug technology?! FOREVER. Today the future ARRIVED.", [
            ["Who got the first hug?", "Kiko!! She was nervous and I was nervous and the blanket was PERFECT and we both cried a little, which for me is very dangerous, and it was the BEST minute of my whole flame!"],
            ["Mira deserves an award for that.", "SHE DOES! I'm planning a thank-you bonfire — controlled! CONTROLLED bonfire! — with her name spelled in sparks. Practicing the R nightly. The R is HARD."]
        ]),
        st("Flicker report: today I've been a tall flame, a tiny flame, and briefly — during an exciting story — sideways. SIDEWAYS! Flick says I have 'range.' Flick would know!", [
            ["Sideways?! What was the story?", "Zephyr's crab feud update!! When Vinegar took the good rock at LOW TIDE — strategy!! — I just went WHOOSH. Horizontally. Emotion is aerodynamic, apparently!"],
            ["You and Flick must get along great.", "The BEST! Candle and sprite, flame siblings! We do synchronized flickering on foggy nights! Attendance is low but the ART is high! You should come — bring a snack, stand upwind!"]
        ])
    ],
    "Pippa": [
        st("Oh, hello dear! Perfect timing — the kettle in me just sang. Sit down, sit down. You look like you've been carrying the whole island in that little head. Out with it, over tea.", [
            ["It HAS been a lot lately.", "I knew it. I can read a brow like tea leaves, dear. Well — whatever it is, it steeps better shared. That's not a metaphor, it's policy. Pour it out, I've got all afternoon.", 2],
            ["I'm actually doing great!", "Wonderful! Then we'll have celebration tea instead of consolation tea — same tea, dear, but we clink first. To you! Hoo-wheet! Oh! Pardon the whistle. Joy does that."]
        ]),
        st("I've been mothering the seedlings by the garden fence. Not MY seedlings, mind — but nobody was fussing over them, and unfussed seedlings simply won't do on my island.", [
            ["They're lucky to have you.", "Everyone should have somebody fussing over them, dear. That's the entire philosophy. The seedlings get pep talks. The tall one — Gerald, Psy named him — is thriving."],
            ["Do you mother EVERYTHING?", "Only the things that need it, dear — which is everything, eventually. Even Grumble accepts a cozy once a season. He pretends to hate it. He schedules around it."]
        ]),
        st("Rollo left another baking diagram on my doorstep. A SMALL one. On my HAT, this time. That pin has opinions about my scones and the courage of a very shy pigeon.", [
            ["Are you going to try the fold?", "Between us? I tried it Tuesday. The scone was... transcendent. But if I tell him, I'll never hear the end of it — so I'm letting him simmer a bit longer. Motherly mischief, dear."],
            ["Want me to say something to him?", "Heavens, no! This is the most fun either of us has had in weeks. A good-natured standoff is just friendship with extra steps. More tea?"]
        ])
    ],
    "Orion": [
        st("Ah... the Dreamer. Come. Stand a moment. I have been charting a constellation you cannot see yet... it rises in forty years. I like to be... prepared.", [
            ["What will it look like?", "A small boat... with one oar... rowing somewhere patient. I have penciled it in. The sky respects... a good draft. You will see it, one distant night. Think of me."],
            ["Forty YEARS of preparation?", "The stars taught me... never to rush a thing that shines. Preparation is just... slow love. Everything worth pointing at... was patient first.", 2]
        ]),
        st("Your face... carries new starlight today. Something happened. Something small... but bright. The speckles on my skin flickered when you walked up. They gossip, the speckles.", [
            ["Something good DID happen today.", "I knew... the speckles are never wrong. Hold the moment gently... small brightness is the kind that lasts. The great flares fade... the little glimmers stay charted."],
            ["Your skin gossips about me?", "Mm... all night skies gossip... it is mostly light, arriving late, telling old news kindly. You are... recent news. The speckles like recent news best."]
        ]),
        st("I mapped a constellation for each neighbor... slowly... over many nights. Grumble is a cave with one bright star inside. He does not know. Perhaps... you might not tell him. He would hmph... for weeks.", [
            ["Which constellation is mine?", "Yours... is unfinished. Not from neglect... you keep adding stars. A mapmaker knows... when to wait. It is my favorite kind of chart... the growing kind.", 2],
            ["What's Aiko's constellation?", "A tail... mid-wag... eleven stars, all of them eager. It rises at dawn... of course it does. Even the sky knows... she is a morning creature."]
        ])
    ],
    "Nixie": [
        st("OH! Hi hi! I have NEWS. Big news! It's about — hm. Hold on. It'll come back. It was juicy. It had a NAME in it. Oh, this is agony! Anyway HOW ARE YOU?", [
            ["Take a breath. Retrace your fins.", "Okay okay — I was by the reef — Zephyr flew over — said something about... a garden? A SECRET one! THAT WAS IT! You're a genius! A memory hero! Anyway I've told you everything I know, which is that sentence."],
            ["I'm good! What's YOUR news?", "MY news! Right! It was... hmm... okay, counterpoint: the crown of seaweed is new. Found the sprig this morning! That's not the news but it IS newsworthy. Look how regal!"]
        ]),
        st("So I was gossiping with the minnows — lovely gossips, terrible memories, we get along GREAT — and they said the tide's bringing something interesting this week. Or last week. Tenses are hard underwater.", [
            ["Something interesting like WHAT?", "Ohh, minnows never know details — they just feel excitement in the water and pass it on! It's the purest form of news, honestly. No facts to slow it down!"],
            ["You and the minnows deserve each other.", "We really do! Half our conversations are just 'wait, what were we saying?' in unison and then we all laugh. Fifty times a day. It never gets old — because none of us remember it!", 2]
        ]),
        st("Serious question. SERIOUS question. Did I already tell you about the thing? Don't ask which thing. If you know the thing, I told you. If not, I have AMAZING news I can't remember.", [
            ["You told me the thing.", "Oh THANK goodness. The retelling pressure is off! Was it good?? Did I do the dramatic pause?? Don't answer — I want to imagine I nailed it. I definitely nailed it."],
            ["You never told me the thing!", "Then TODAY is your lucky day, because the thing was — ... — the THING was — okay, new plan: when I remember it, I'm swimming DIRECTLY to you. You'll hear the splash. Stay alert!"]
        ])
    ],
    "Cobble": [
        st("...You stopped. Most walk past. Standing still with someone is the oldest conversation there is. We are having it now. ...You're doing well.", [
            ["Okay. Standing perfectly still.", "...Impressive. Twelve seconds. For a moving creature, that's practically geology. The pigeons never last past four. You have the gift.", 2],
            ["Riddle me something, Cobble.", "Very well: what grows stronger the longer it holds still? ...Take your time. I did. The answer took me a century. It was worth the wait."]
        ]),
        st("A secret was told near me yesterday. My eyes glowed. The teller noticed. Now they think the cove is enchanted. ...I am not sorry. A statue takes entertainment where it can.", [
            ["What was the secret?!", "A statue that repeats secrets... would be a fountain. ...That is statue humor. There is not much of it. We carve every joke to last."],
            ["So you DO move sometimes.", "When a secret is revealed... the old animation stirs. It is in the fine print of being me. Mostly I glow briefly and return to my craft. The craft is standing. I am very good at it."]
        ]),
        st("The riddle of strength, walker: the wave hits the stone ten thousand times. The stone holds. Who wins? ...Wrong. The beach wins. It gets sand. Think bigger.", [
            ["The BEACH wins?", "Always. Conflict grinds both sides into something softer... that children build castles with. The wave and the stone never see it coming. Patience sees everything coming."],
            ["That's the wisest thing I've heard all week.", "Then you should stand near more statues. We are full of this material. Centuries of thinking... and no way to interrupt ourselves. It concentrates wonderfully.", 2]
        ])
    ],
    "Zeph": [
        st("Whoooosh! Guess whoooo! It's me! The breeze with the most! Did you feel that little gust by the dock earlier? That was me saying good morning! Did it land? Be honest!", [
            ["So THAT'S who untied my hair.", "Heeee! Guilty! It looked too tidy! The tousled look suits you — ask anyone! Ask the leaves! They loved it! They applauded! That rustling WAS the applause!"],
            ["It landed. Very refreshing.", "YES! Five-star gust! I've been working on my morning greetings — gentle, cool, ten percent playful! The trick is wrist control. I don't have wrists! It's VERY hard!", 2]
        ]),
        st("Today's masterpiece: I taught a pile of leaves to do a little spiral dance. Held it for SIX seconds! The leaves were naturals. One maple leaf has real star quality.", [
            ["I want to see the leaf ballet!", "Come by the big oak at golden hour! That's when the light hits the spin JUST right! Bring applause! The maple leaf gets nervous without an audience — we're working on it!"],
            ["What happens after six seconds?", "Physics gets jealous! Everything drifts down all soft and dramatic — honestly the ENDING is the best part. Even my collapses are choreographed. Mostly. Sometimes a leaf lands on Grumble. Bonus content!"]
        ]),
        st("Psssst. I overheard — well, I'm the wind, I overhear EVERYTHING — that somebody's been leaving flowers on Titan's toolbelt. I know who it is. I'm not telling. I'm SO good at not telling. Ask me anything.", [
            ["Okay: who is it?", "I said ask me ANYTHING, not THAT thing! Heehee! Okay-okay-okay... all I'll say is: check whose shoes jingle. THAT'S ALL. The wind has spoken! The wind immediately regrets speaking!"],
            ["Your restraint is legendary, Zeph.", "THANK you! Two whole days I've held this secret! That's like a CENTURY in wind years! Penny lasted four minutes with hers! I'm basically a vault! A breezy, giggling vault!"]
        ])
    ],
    "Kiko": [
        st("Oh! H-hello! I was just... okay, I was working up the nerve to try the log bridge again. It wobbles. But today might be the day! It's been 'the day' for six days. But today!", [
            ["Want me to walk it with you?", "R-really?! Yes! If you go first I'll be brave right behind you! That's... that's basically bravery! Adjacent bravery! It still counts, Basil said so — well, Basil SMIRKED so, but still!", 2],
            ["The bridge respects your caution.", "You think? Maybe careful IS respectful! The bridge and I are just... taking things slow. Ohh, that's much nicer than 'scared.' I'm going to use that. Thank you!"]
        ]),
        st("I solved the pinecone puzzle today! The one where they're stacked funny by the fir tree? Three tries! Well — three tries today. Forty tries total. But TODAY: three!", [
            ["Forty tries is dedication!", "That's what I told myself! Every wrong try teaches you a wrong way! I know THIRTY-SEVEN wrong ways now! I'm practically a pinecone expert from the losing side!"],
            ["What was the solution?", "Big ones on the bottom! Which — okay, it sounds obvious NOW, but pinecone thirty-eight had misleading confidence. It's about reading the pinecones, not just stacking them."]
        ]),
        st("Um — carrot report! The wild patch by the meadow has EIGHT new sprouts. I've been guarding them. From a distance. A safe distance. The distance is most of the meadow.", [
            ["Guarding from afar still counts.", "It does, right?! I have excellent eyes and a very loud... okay, a MEDIUM-loud warning squeak. The sprouts feel safer. Probably. I wave at them supportively every morning!", 2],
            ["What are you guarding them FROM?", "Birds! Beetles! And one specific squirrel — Gidget says it wasn't her, and I believe her, but she said it while burying something, so I'm keeping the file open."]
        ])
    ],
    "Aurora": [
        st("Good day, dear walker, beneath the sun's bright reign — I'm resting up my colors for the evening's grand campaign. Tonight I'm painting emerald, with violet at the seam. Do come and see the canvas... it's shaping up a dream.", [
            ["I wouldn't miss it for anything.", "Then look up when the dusk arrives and claim the eastern sky — I'll ripple something once, for you, as sweet as a firefly. The others get the chorus... but you shall get the sigh.", 2],
            ["Do you ALWAYS rhyme?", "I do, I fear, I can't resist — it's how the colors flow. A sentence with no rhythm feels... like dancing in the snow with boots of lead and both eyes closed. So: rhyming it is, you know."]
        ]),
        st("I tried a bold new shade last night — a rose-and-copper braid. The stars all leaned to look at it. The moon, I think, was swayed. Though Selene called it 'daring'... which from her means half-afraid.", [
            ["Copper and rose sounds gorgeous.", "It WAS, if I may say so — like a blush across the deep! I'm keeping it for special nights, a color meant to keep. The sky's my only closet, but I hang my best things steep."],
            ["What did the stars actually say?", "The old ones twinkled slowly, which is how a star applauds. The young ones flashed a little — the astronomical frauds — but envy in a critic is the kindest of the nods."]
        ]),
        st("A confession, gentle Dreamer, if you'll keep it in your coat: some nights I don't paint anything... I simply sit and float. The dark deserves an evening off... the stars, an empty note.", [
            ["Even the sky needs rest days.", "Precisely so! How kind you are — you understand the art. A canvas left unpainted is a breath before the start. And oh, the crowd on my return... it warms my glowing heart.", 2],
            ["What do you do on nights off?", "I listen to the ocean hum, I watch the lighthouse spin, I eavesdrop on the crickets when their symphonies begin... and once — don't tell — I dimmed myself and watched the moths all win."]
        ])
    ],
    "Quill": [
        st("Ah, the Dreamer arrives. Note my phrasing: 'arrives,' present tense, active voice. Vigorous! Immediate! You'd be astonished how many islanders would have said 'so you're here, huh.' Tragic construction.", [
            ["Teach me to speak better!", "Splendid initiative! Lesson one: never say 'very unique.' Uniqueness admits no degrees. Lesson two: em-dashes are for drama — like so — and semicolons are for showing off; observe. You're doing wonderfully.", 2],
            ["What's wrong with 'so you're here, huh'?", "Nothing grammatically — everything SPIRITUALLY. Language should stand up straight. 'Huh' slouches. I've made peace with many things on this island; 'huh' is not among them."]
        ]),
        st("I've begun the island's official chronicle. Volume One: 'The Age of Neighbors.' I'm on chapter three and I've already had to fact-check Orla twice and Aria FOURTEEN times.", [
            ["What's in chapter three?", "The Great Shack Constructions — a stirring account of architecture and optimism. Chester's quotes required light editing. By which I mean I removed eleven 'HA's and kept the best three."],
            ["Fourteen fact-checks?!", "In ONE anecdote about a tide pool. By her account there were dolphins, a tempest, and an aria in D minor. The truth involved three inches of water. I've filed her version under 'mythology' — where, I admit, it thrives."]
        ]),
        st("Someone wrote 'THEIR is treasure here' in the sand by the dock. I corrected it. I used my whole body as the apostrophe-and-E. It was undignified and absolutely necessary.", [
            ["You did the right thing.", "THANK you. Grammar heroism is a thankless calling — the tide erased my correction within the hour. But for sixty glorious minutes, the beach was LITERATE. I'd do it again."],
            ["Maybe it was buried treasure intel!", "...I confess the possibility distracted me mid-correction. If some pirate's error leads to actual treasure, I shall dig it up, catalogue it properly, and STILL insist on 'there's.' Standards survive wealth."]
        ])
    ],
    "Vex": [
        st("Ah, splendid — a visitor! I was just admiring my reflection in the tide pool. This brass never tarnishes, you know. Well — it tarnishes CONSTANTLY. But polishing is a Victorian virtue. Tea?", [
            ["Yes to tea, always.", "Capital! I keep a small service in my chest cavity — entirely sanitary, mildly steampunk. Hudson approves of the leaves and disapproves of the location. One out of two delights me.", 2],
            ["How much do you polish, exactly?", "Two hours per morning, as any respectable brass gentleman should. In the Victorian era — magnificent period, dreadful plumbing — a good shine WAS one's business card."]
        ]),
        st("I've been drafting a design for a difference engine made of driftwood and seashells. It computes one thing: whether it's teatime. It is always teatime. The engineering is flawless.", [
            ["Every calculation returns 'teatime'?", "PRECISELY! A machine of perfect wisdom! The Victorians dreamed of thinking engines — I've built a KNOWING engine. It knows one truth completely. Aspirational, really."],
            ["That's not computing, that's a clock.", "A clock says WHEN, my dear Dreamer. My engine says YES. Entirely different philosophy of time. The top-hat antenna agrees, and it has seniority."]
        ]),
        st("Nostalgia struck me hard today — I heard Gearwick's gears turning and it sounded like a proper Victorian workshop. I stood outside his place for an hour, sighing steam.", [
            ["You two should build something together.", "We've SPOKEN of it! A grand clock for the island square — his precision, my aesthetics, brass EVERYWHERE. The blueprints exist. The courage is still being drafted.", 2],
            ["A whole hour of sighing?", "Fifty-five minutes of sighing, five of polishing. The sighs fog my chest plate, you see. Even my melancholy requires maintenance. Quite Victorian, that. I treasure it."]
        ])
    ]
};

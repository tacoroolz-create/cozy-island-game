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
// Morning lines: birds, dew, sunrise, soft light, new-day optimism.
const AMBIENT_MORNING = [
    { text: "Up with the sun, {player}? The island smells like dew and possibility this early.", ask: "What's the plan today?", reply: "Oh, the usual: wander, snack, admire the sea, repeat. It's a rigorous schedule." },
    { text: "Morning! I heard the birds arguing before dawn. I think the little one won.", ask: "Birds argue?", reply: "Constantly. Mostly about who saw the sunrise first. Nobody ever agrees." },
    { text: "There's something about a morning here. Everything feels un-decided yet, you know?", ask: "I know exactly what you mean.", reply: "I figured you would. You have morning-person eyes. Take that as a compliment." },
    { text: "The sunrise painted the beach pink again. I keep meaning to thank it, but it never stays long enough.", ask: "Pink beach mornings are special.", reply: "They are. You can't put them in your pocket, but you can walk through them, and that's almost the same." },
    { text: "Early enough that even the crabs are still deciding if today is worth walking sideways for.", ask: "Did they decide?", reply: "Most of them said yes. One went back to its hole. I respect both choices." },
    { text: "The dew is sitting on the grass like tiny glass chairs. I keep wanting to sit on one, but that seems rude.", ask: "Tiny chairs for tiny guests?", reply: "Exactly. The dew has invited all the ants to breakfast, and I am far too large for the table." },
    { text: "I saw the first bird of the morning do a little hop, then a bigger hop, then fly away like it had finally made up its mind.", ask: "Morning hops are good luck?", reply: "On this island, everything that moves at dawn is good luck. Even me, apparently." }
];

// Afternoon lines: sun, shade, heat, animal behavior, bright colors.
const AMBIENT_AFTERNOON = [
    { text: "The sun is so bright today. Maybe we should plant a shade tree.", ask: "Where would you put it?", reply: "Right between me and the sun. That's the only architecture I believe in." },
    { text: "Perfect napping weather, if you ask me. Not that anyone ever asks me.", ask: "I'm asking you!", reply: "Then my official ruling is: yes. Find a warm patch of grass and report back." },
    { text: "Afternoon, {player}. I've been standing here so long a butterfly tried to claim me as territory.", ask: "Did you let it?", reply: "We negotiated. It gets my left shoulder on weekdays. Fair is fair." },
    { text: "Busy day! And by busy I mean I watched a cloud for two hours. It was shaped like a spoon.", ask: "A spoon cloud? Nice.", reply: "It slowly became a ladle. Honestly? Riveting. Best show on the island." },
    { text: "The sun is being very generous right now. I think it's trying to win our approval.", ask: "Has it won yours?", reply: "Partially. I'd vote for it if it promised to add a little more shade to the ballot." },
    { text: "Hoggy found a cool spot under a bush earlier. I almost asked to join him, but I'm not ready for that level of friendship.", ask: "Hoggy's good company?", reply: "Hoggy is excellent company. He doesn't judge, he doesn't rush, and he occasionally shares shade." },
    { text: "The beach is glowing so hard it looks like it's showing off. I don't blame it.", ask: "Glowing beaches are hard to ignore.", reply: "Exactly. If I were a beach, I'd glow too. It's the best time of day to be sand." },
    { text: "I saw a cicada singing on a tree earlier. It sounded like a tiny kettle that had something to say.", ask: "What did it say?", reply: "I think it was mostly 'hello, hello, warm, hello.' Repetitive, but sincere." }
];

// Evening lines: golden hour, sunset, winding down, dinner, cooling air.
const AMBIENT_EVENING = [
    { text: "The light gets all golden around now. Even the rocks look like they're posing.", ask: "It's my favorite hour.", reply: "Mine too. Don't tell the morning I said that. The morning gets jealous." },
    { text: "Evening already? Days on this island slip by like minnows. Fast and a little shiny.", ask: "What did today slip by with?", reply: "A good stretch, a better snack, and one truly excellent smell I never identified." },
    { text: "Almost dinnertime, {player}. I can practically hear the whole island's stomachs growling in chorus.", ask: "What's on your menu?", reply: "Whatever's closest, garnished with whatever's second closest. Island cooking!" },
    { text: "The sunset is taking its time tonight. I appreciate a sky that knows how to make an exit.", ask: "Long sunsets are the best.", reply: "They give you time to think about your day, your snacks, and whether you've thanked enough clouds." },
    { text: "The shadows are stretching out like the island is yawning before bed.", ask: "Yawns are contagious.", reply: "Tell me about it. I yawned twice just watching that tree shadow reach the path." },
    { text: "The birds are doing their last loops before settling in. It's like they're saying goodnight to the whole sky.", ask: "Bird goodnights are cute.", reply: "Very. They don't need words. They just fly in a circle and land with a little feather-fluff. Perfect manners." },
    { text: "Evening breeze tastes like salt and warm sand. I keep breathing deeper than I need to.", ask: "Deep breathing is allowed.", reply: "Good. Because I am currently breathing enough for two people and maybe one seagull." }
];

// Night lines: stars, moon, crickets, quiet, secrets, late thoughts.
const AMBIENT_NIGHT = [
    { text: "I love the sound of the crickets chirping. It's like the island is whispering itself to sleep.", ask: "Do you sleep much?", reply: "A little. But mostly I stand here and listen to the whispering. It's better than counting sheep." },
    { text: "Out late, {player}? The island keeps a different set of secrets after dark.", ask: "Like what?", reply: "The waves talk slower. The stars lean closer. And somebody — no names — sleep-hums." },
    { text: "Can't sleep either, huh? The moon's too good tonight to waste on being unconscious.", ask: "It really is.", reply: "Stand here a minute and look up with me. There. That's the whole conversation." },
    { text: "The stars are doing that thing where they look close enough to borrow a cup of sugar.", ask: "Would you lend them sugar?", reply: "Of course. Stars deserve sweet things. I'd leave a whole bowl on the roof if I could reach it." },
    { text: "The moonlight made a little silver path on the water. I keep thinking it's an invitation, but I can't swim that well.", ask: "Silver paths are tempting.", reply: "They are. I walked to the edge and dipped a toe in. The water said no thank you, very politely." },
    { text: "Everything sounds softer at night. Even my own thoughts stopped yelling.", ask: "Soft thoughts are nice.", reply: "Very. They sit in little corners and hum. I am currently having the softest thought I've had all week." },
    { text: "I saw a firefly blink twice and then stop, like it forgot what it was going to say.", ask: "Maybe it got shy.", reply: "Could be. Fireflies are brave until you look directly at them. Then they pretend to be a regular bug." },
    { text: "The island at night feels like it's holding its breath so we can hear the waves.", ask: "Waves are loud enough already.", reply: "True. But nighttime waves sound deeper, like they're telling stories to the sand. I don't interrupt." }
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

// ---- Named relationship gossip: only fires when {other} is a present neighbor
// the speaker actually has a dynamic with. Keeps generic gossip from feeling
// like filler and makes the island seem lived-in when two specific characters
// cross paths in conversation. Format matches ambient lines: {text, ask, reply}.
const RELATIONSHIP_GOSSIP = {
    "Sir Cogs-a-Lot": {
        "Sir Haunts-a-Lot": [
            { text: "Sir Haunts-a-Lot challenged me to a courtesy duel at dawn. We bowed for three hours. My hinges are stiff, but my honor is intact.", ask: "Who won?", reply: "Nobody wins a bowing contest, Dreamer. You simply keep bowing until one of you remembers breakfast. He remembered first. I claim victory by appetite." },
            { text: "The other knight claims his transparency makes him harder to defeat in combat. I pointed out that it also makes him harder to see at noon, which is hardly fair play.", ask: "Will there be a rematch?", reply: "Next month we hold the First Annual Courtesy-Off. Categories include bowing, door-holding, and complimenting clouds. I intend to sweep the cloud round." }
        ]
    },
    "Sir Haunts-a-Lot": {
        "Sir Cogs-a-Lot": [
            { text: "Sir Cogs-a-Lot insists his armor is shinier than mine. I pointed out that I am transparent, so shininess is relative. He did not appreciate the logic.", ask: "Is it a real rivalry?", reply: "Real enough to schedule monthly. Next we compete at who can hold a door open longest. I intend to win by walking through it as a ghost." },
            { text: "He keeps calling me 'fair traveler' even though we have traveled together at least forty times. The knight never forgets a formality, even when it makes no sense.", ask: "Does it bother you?", reply: "It would bother a lesser spirit. I find it comforting. A rival who greets you politely is a rival you can trust to cheat with dignity." }
        ]
    },
    "Lord Roar": {
        "Squire Paws": [
            { text: "Squire Paws believes I once fought a dragon. I have never corrected him. It is good for a squire to have confidence in his knight's fictional past.", ask: "Did you fight a dragon?", reply: "I chased a particularly large seagull once. In the right light, with enough enthusiasm, a seagull is basically a small dragon. Squire Paws was impressed." },
            { text: "My squire keeps asking for dragon-slaying tips. I keep giving him seagull-avoidance advice and hoping he does not notice the difference.", ask: "Has he noticed?", reply: "Not yet. He is very loyal. Loyalty, I have learned, is the art of accepting dragon stories without investigating seagulls too closely." }
        ]
    },
    "Squire Paws": {
        "Lord Roar": [
            { text: "Lord Roar tells me tales of dragon battles. I know they're mostly seagulls, but the way he tells them, every seagull sounds heroic.", ask: "Have you met a real dragon?", reply: "I met a lizard near the warm rocks. It did not breathe fire, but it looked at me with great importance. I saluted it." },
            { text: "The Lord says a true knight never reveals how many dragons he has fought. I think that means the number is flexible, which is also a kind of wisdom.", ask: "Do you believe him?", reply: "I believe in the story. A knight needs a story, and a squire needs a knight. The seagulls are welcome to disagree." }
        ]
    },
    "Shade-7": {
        "Raven": [
            { text: "Raven and I are composing a poem about the moon. It has seventeen stanzas and no rhymes. Rhymes are too... hopeful.", ask: "What's it called?", reply: "We haven't decided. 'The Long Gray Maybe' is the current title. Raven thinks it's too cheerful." },
            { text: "The poetry circle meets by moonlight. Raven brings the gloom, I bring the mechanical precision. Together we achieve a mood best described as 'damp midnight.'", ask: "Can I join?", reply: "You may attend as a silent observer. If you smile, we will pause and pretend we were never there. That is the goth way." }
        ],
        "Morwen": [
            { text: "Morwen says the goths of this island know a little magic. I told her we don't, but she keeps leaving moonflower petals in patterns that almost mean something.", ask: "Do you know magic?", reply: "I know how to look mysterious in dim light. If that counts as magic, then yes. Otherwise, Morwen is just being dramatic. As usual." },
            { text: "Morwen and I once tried to cast a spell to make the sunset last longer. The sunset ignored us, but a nearby crab walked sideways in a very deliberate way. We took it as a sign.", ask: "What did it mean?", reply: "It meant the crab had somewhere to be. We decided the spell worked on a crab, which is better than nothing." }
        ],
        "Vesper": [
            { text: "Vesper told me the moon whispers secrets to robots who stand still enough. I stood still all night. The moon only said hello. It was enough.", ask: "What kind of secrets?", reply: "Small ones. Tide times, good rocks for sitting, which clouds are pretending to be sheep. The moon is more practical than people think." }
        ]
    },
    "Raven": {
        "Morwen": [
            { text: "Morwen claims the goths of this island know a little magic. I think we only know how to sit very still and look like we planned it.", ask: "Do you know magic?", reply: "I know how to make a silence feel important. If silence is magic, then I am practically a sorceress. Otherwise, no." },
            { text: "Morwen and I trade poems about the sea. Hers end with the word 'forever.' Mine end with the sound of a wave. We agree both are acceptable endings.", ask: "Who writes better endings?", reply: "The sea writes the best endings. We are just taking notes and pretending to understand." }
        ],
        "Shade-7": [
            { text: "Shade-7 takes the poetry circle very seriously. She once recited a line about entropy and I had to look away because it was so beautifully depressing.", ask: "Was it good?", reply: "It was excellent. I will deny this if asked directly. The circle operates on plausible deniability and excellent eyeliner." }
        ]
    },
    "Morwen": {
        "Vesper": [
            { text: "Vesper and I hold a poetry circle by moonlight. We don't invite the cheerful ones. Their optimism throws off the meter.", ask: "Can I come?", reply: "You may listen from the shadows. But if you giggle, we will stop and pretend we were never there. That is the goth way." },
            { text: "Vesper believes the shadows at dusk hold messages. I believe the shadows are just tired light. We wrote a poem together called 'Maybe Both, Probably Neither.'", ask: "Is it finished?", reply: "It is never finished. That is the point. A finished poem would be far too decisive for either of us." }
        ],
        "Raven": [
            { text: "Raven says our magic, if we have any, lives in our feathers and our frowns. I told her that's not magic, that's branding. She took it as a compliment.", ask: "Is it branding?", reply: "Everything is branding if you are mysterious enough. The moon has excellent branding. We are merely inspired by it." }
        ],
        "Shade-7": [
            { text: "Shade-7 brought a metal flower to the poetry circle. It did not wilt. I found that both impressive and slightly offensive to the concept of decay.", ask: "Did you keep it?", reply: "I placed it where the moonlight hits it. Now it casts a shadow that looks like a frown. We are all very proud." }
        ]
    },
    "Vesper": {
        "Shade-7": [
            { text: "Shade-7 swears robots make better goths because we can dim our own eyes. I told her my eyes are already shadow. She said that was 'trying too hard.'", ask: "Were you offended?", reply: "Deeply. I will write a poem about it. It will have no title, only a sigh." }
        ],
        "Morwen": [
            { text: "Morwen and I once stayed up all night waiting for the moon to do something dramatic. It just rose, very slowly. We agreed it was worth the wait.", ask: "What did you expect?", reply: "A gesture. A whisper. A small cloud parting like a curtain. The moon gave us steady light, which is the most reliable kind of drama." }
        ]
    },
    "Grumble": {
        "Fluffernox": [
            { text: "I definitely do not like Fluffernox. I just happened to straighten the flowers near her house. Twice. Because chaos offends me, not because she's soft.", ask: "You sure about that?", reply: "I am one hundred percent sure that I am not going to answer that. Now stop smiling. It makes your face look friendly." },
            { text: "Fluffernox said my fang is 'cute.' I told her it's terrifying. She agreed it could be both. I have been thinking about that for three days and I don't like it.", ask: "Is it both?", reply: "It is neither. It is a fang. It bites things. Metaphorically. Mostly marshmallows. Not that I eat marshmallows because she likes them." }
        ]
    },
    "Fluffernox": {
        "Grumble": [
            { text: "Grumble says she's terrifying, but she left a perfectly smooth stone by my door. It had a little flower next to it. Terrifying monsters don't do that.", ask: "Maybe she likes you?", reply: "She would deny it very loudly and then straighten my doormat. That's how I know. Some people show love by pretending not to." },
            { text: "Grumble told me my horns are 'not that cute.' She said it while adjusting a leaf behind my ear. I am choosing to believe she has complicated feelings.", ask: "Complicated how?", reply: "Complicated like a monster who wants to be scary but also wants everyone to have nice flowers. That's my favorite kind of complicated." }
        ]
    },
    "Cypher": {
        "Newton": [
            { text: "Newton and I have a friendly disagreement. He says clouds are for watching. I say clouds are for classifying. We compromised by doing both at the same time.", ask: "Who's right?", reply: "We are both right, which is statistically unlikely. The dream island may be inflating our accuracy. I am choosing not to investigate." },
            { text: "Newton insists the cloud shaped like a sheep is actually two clouds in disguise. I find his paranoia refreshing and possibly correct.", ask: "Two clouds?", reply: "Two small clouds wearing one big cloud costume. It would explain the irregular fluff distribution. We are drafting a formal inquiry." }
        ]
    },
    "Newton": {
        "Gizmo": [
            { text: "Gizmo thinks rocks are secretly enthusiastic. I think rocks are simply round. We are writing a joint paper called 'On the Possible Motivations of Inanimate Objects.'", ask: "Any conclusions?", reply: "Preliminary finding: rocks do not move unless pushed. Gizmo is drafting a rebuttal involving 'hidden determination.' I admire his commitment." }
        ],
        "Cypher": [
            { text: "Cypher says my cloud observations lack rigor because I use words like 'majestic.' I told him 'majestic' is a measurement of emotional height. He wrote it down.", ask: "Is it a measurement?", reply: "It is now. Cypher added it to his spreadsheet. I have never felt more academically validated in my life." }
        ]
    },
    "Gizmo": {
        "Newton": [
            { text: "Newton refuses to believe rocks are enthusiastic. I asked him why round rocks roll downhill then. He said gravity. I said that's just what enthusiastic rocks call their motivation.", ask: "Can you prove it?", reply: "I rolled a rock. It went downhill very quickly. Newton called it gravity. I called it passion. We agreed to disagree at high volume." }
        ]
    },
    "Om-Bit": {
        "Lotus": [
            { text: "Lotus and I sit very still together. We do not speak. We do not need to. The grass grows at us and we accept it.", ask: "Is that a friendship?", reply: "It is a deeper friendship than words could hold. Also, she once shared a very good sitting spot with me. That is the highest monk gift." }
        ],
        "Hush": [
            { text: "Hush and I once had a conversation that lasted an entire afternoon. Neither of us spoke. It was one of the best conversations I have had on this island.", ask: "What did you talk about?", reply: "The wind, mostly. And how water finds its level without trying. We did not say these things out loud. We simply understood them together." }
        ]
    },
    "Lotus": {
        "Hush": [
            { text: "Hush and I trade silences. His are very quiet. Mine have a little tide in them. We both agree that noise is overrated.", ask: "Who has the better silence?", reply: "Silence cannot be ranked. It simply is. Though I will say his silence is excellent. Do not tell him I said so. Silence prefers modesty." }
        ]
    },
    "Hush": {
        "Om-Bit": [
            { text: "Om-Bit and I sat on the grass for so long that a beetle walked across my foot and I did not move. He nodded once. It was the highest praise.", ask: "Why didn't you move?", reply: "Moving would have interrupted the beetle's journey. It was on its way somewhere important. We are all on our way somewhere important." }
        ]
    },
    "Tinker": {
        "Pebble": [
            { text: "Pebble and I have an understanding. We stand near bushes and do not make eye contact with anyone. It is the most comfortable arrangement.", ask: "Do you ever talk?", reply: "We exchange small waves. Very small. If you blinked, you would miss them. That is the perfect size for us." }
        ],
        "Flutter": [
            { text: "Flutter showed me the best corner between two trees. It has soft light and very few visitors. I go there when the world feels too bright.", ask: "Is it a secret?", reply: "It is a shared secret. That is the safest kind. If too many people know, it stops being soft. So far, it is still very soft." }
        ]
    },
    "Pebble": {
        "Flutter": [
            { text: "Flutter showed me the best corner between two trees. It has soft light and very few visitors. I am considering moving in permanently.", ask: "A corner roommate?", reply: "Only in spirit. I am still a turtle with a shell. But spiritually, I live in that corner now, and Flutter is my quiet landlord." }
        ]
    },
    "Flutter": {
        "Tinker": [
            { text: "Tinker and I found a spot where two bushes make a little doorway. We stand there sometimes and pretend we're in a secret house made of leaves.", ask: "Do you invite others?", reply: "Only people who understand that secret houses are mostly for being quiet in. You would understand. You have quiet eyes." }
        ]
    },
    "Rivet": {
        "Shadow": [
            { text: "Shadow keeps claiming my sunny knoll. I told her I don't care, which is obviously a lie because I care very much and have been plotting leaf-based revenge.", ask: "Revenge with leaves?", reply: "I will place one slightly damp leaf on her spot. She will be annoyed. I will pretend I didn't notice. This is how tsunderes negotiate." }
        ]
    },
    "Shadow": {
        "Rivet": [
            { text: "Rivet glares at me whenever I take the sunny knoll. I pretend not to see her. Seeing people proves they exist, and I have no interest in confirming Rivet today.", ask: "Do you two get along?", reply: "We exist in a state of competitive warmth. It is not friendship. It is a temperature-based rivalry. I am winning." }
        ]
    },
    "Piko": {
        "Mochi": [
            { text: "Mochi and I have a butterfly-watching pact. She doesn't hop too loud, and I don't beep too bright. The butterflies seem grateful.", ask: "Pacts are serious.", reply: "Very serious. We shook on it. Well, I extended my hand and she touched it with her nose. That is the rabbit equivalent of a sworn oath." }
        ]
    },
    "Mochi": {
        "Piko": [
            { text: "Piko glows when she's happy. I asked her if she could glow less near the flowers because they get jealous. She said she would try. She failed.", ask: "Flowers get jealous?", reply: "Only of Piko. She is the pinkest thing on the island. If I were a flower, I would also want to be her friend." }
        ]
    },
    "Zap-Zap": {
        "Sunny": [
            { text: "Sunny and I are organizing the island's first 'Hello Marathon.' The goal is to say hello to every tree before lunch. Trees don't reply, but we believe they're listening.", ask: "Every tree?", reply: "Every. Single. One. We are very committed. Sunny does the flying loop, I do the ground greeting. Teamwork makes the island scream with friendliness." }
        ],
        "Giggles": [
            { text: "Giggles and I counted how many hellos fit in one conversation. We got to forty-three before a butterfly interrupted. Butterflies have no respect for science.", ask: "Forty-three is a lot.", reply: "It is the current record. Giggles wants to try for fifty. I said we should pace ourselves. Then we both laughed for no reason." }
        ]
    },
    "Sunny": {
        "Giggles": [
            { text: "Giggles and I are trying to set the island hello record. We're at forty-three. Zap-Zap says we can hit fifty, but I think my beak needs a break.", ask: "Fifty hellos?", reply: "Fifty hellos in one chat! It's ambitious, but with the right friend and enough water breaks, anything is possible." }
        ],
        "Zap-Zap": [
            { text: "Zap-Zap and I high-fived so hard yesterday that a nearby crab jumped. We apologized to the crab. It waved a claw. We're calling it forgiveness.", ask: "Crab forgiveness?", reply: "Crab forgiveness is the best kind. It comes sideways and unexpected, just like crabs. We are very honored." }
        ]
    }
};
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
    const tod = (typeof getTimeOfDay === 'function') ? getTimeOfDay() : 'afternoon';
    let timePool = AMBIENT_AFTERNOON;
    if (tod === 'morning') timePool = AMBIENT_MORNING;
    else if (tod === 'evening') timePool = AMBIENT_EVENING;
    else if (tod === 'night') timePool = AMBIENT_NIGHT;

    // Observational modifiers: if birds/crabs/cicadas are active right now, bias toward them.
    let observational = [];
    if (tod === 'morning') {
        observational = AMBIENT_MORNING.filter(l => l.text.includes('bird') || l.text.includes('crab') || l.text.includes('dew'));
    } else if (tod === 'afternoon') {
        observational = AMBIENT_AFTERNOON.filter(l => l.text.includes('cicada') || l.text.includes('butterfly') || l.text.includes('shade'));
    } else if (tod === 'evening') {
        observational = AMBIENT_EVENING.filter(l => l.text.includes('sunset') || l.text.includes('shadow') || l.text.includes('birds'));
    } else if (tod === 'night') {
        observational = AMBIENT_NIGHT.filter(l => l.text.includes('cricket') || l.text.includes('star') || l.text.includes('moon'));
    }

    let pool = timePool.concat(AMBIENT_GENERIC);
    // 40% chance to pick from observational subset when available so time-of-day feels intentional.
    if (observational.length > 0 && Math.random() < 0.4) {
        pool = observational.concat(AMBIENT_GENERIC);
    }

    const seasonLine = (typeof world !== 'undefined' && world && AMBIENT_SEASON[world.season]) || null;
    if (seasonLine) pool = pool.concat([seasonLine]);
    const others = (typeof npcs !== 'undefined') ? npcs.filter(n => n.isPresent && n !== npc && n.id !== 'mubaba') : [];

    // Named relationship gossip gets first pick: if the speaker has something
    // specific to say about a present neighbor, use that and skip the generic pool.
    let relationshipOther = null;
    if (others.length > 0) {
        const speakerGossip = RELATIONSHIP_GOSSIP[npc.name];
        if (speakerGossip) {
            const related = others.filter(o => speakerGossip[o.name]);
            if (related.length > 0) {
                relationshipOther = related[Math.floor(Math.random() * related.length)];
                pool = speakerGossip[relationshipOther.name];
            }
        }
    }
    // If no relationship line is available, fall back to the generic {other} gossip pool.
    if (!relationshipOther && others.length > 0) {
        pool = pool.concat(AMBIENT_GOSSIP);
    }
    if (npc.friendship >= 150) pool = pool.concat(AMBIENT_BESTIES);
    else if (npc.friendship < 30) pool = pool.concat(AMBIENT_NEW);

    const line = pool[Math.floor(Math.random() * pool.length)];
    const other = relationshipOther ? relationshipOther.name : (others.length > 0 ? others[Math.floor(Math.random() * others.length)].name : 'someone');
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
        // Every season now has hand-written variants (Sweet + Tree-2/Tree-3 for
        // all four). Half the time, swap in a random one of the season's trees:
        // the base tree (SEASONAL_DIALOGUES) plus any variants (SEASONAL_VARIANTS).
        if (typeof world !== 'undefined' && world && npc.friendship > 0 && Math.random() < 0.5) {
            const season = world.season;
            const trees = [];
            const bank = (typeof SEASONAL_DIALOGUES !== 'undefined') ? SEASONAL_DIALOGUES[season] : null;
            if (bank && bank[name]) trees.push(bank[name]);
            const variants = (typeof SEASONAL_VARIANTS !== 'undefined') ? SEASONAL_VARIANTS[season] : null;
            if (variants && variants[name]) trees.push(...variants[name]);
            if (trees.length) {
                return JSON.parse(JSON.stringify(trees[Math.floor(Math.random() * trees.length)]));
            }
        }
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
    "Piko": "Oh! What the heck is that? It's me! A flat me! Hello, flat me! Do you like butterflies too? Blink once for yes... oh. Oh no. She's shy.",
    "Rivet": "What the heck is that. It's me. Standing there. Perfectly still. Perfectly organized. ...It's actually very impressive. I didn't say that.",
    "Shade-7": "What the heck is that. A second me, flat and silent, staring into the eternal nothingness. ...We have so much in common. I will recite it a poem.",
    "Cypher": "What the heck is that?! Fascinating — a two-dimensional Cypher! If I stand beside it, together we're three-dimensional. Wait. That's not how math works. Or IS it?",
    "Om-Bit": "What the heck is that. Ah. A me who has achieved perfect stillness. I have much to learn from this flat teacher.",
    "Sir Cogs-a-Lot": "What the heck is that?! A noble likeness of mine own chassis! The plume! The posture! Fair traveler, whoever crafted this deserves a knighthood.",
    "Tinker": "Oh! W-what the heck is that? It's... me? Standing out in the open? So brave. I could never. I'm going to go stand behind it now.",
    "Zap-Zap": "WHAT THE HECK IS THAT?! IT'S ME! HA HA! Hello, me! Zzt! She's quiet, but I can tell she's having a GREAT time!",
    "Boo-Boo": "Boo! ...What the heck is that? It's me! Oh, she's so cute. Boo. See? She didn't even flinch. So brave. So round.",
    "Wisp": "What the heck is that. A me that can't float? Hmph. How embarrassing. ...Don't move it, though. I've gotten used to it.",
    "Morwen": "What the heck is that... a me pinned to the daylight, silent as old lace. How tragic. How lovely. I shall hum to it after sunset.",
    "Spectra": "What the heck is that?! Remarkable — a fully opaque Spectra! Do you know how rare opacity is in my family? I must take notes.",
    "Hush": "...What the heck is that. A still me. A quiet me. It has already mastered what I practice daily. I bow to it.",
    "Sir Haunts-a-Lot": "What the heck is that?! A portrait in card of mine own noble form! Thou hast captured my posture perfectly. I shall bow to it each morn.",
    "Flutter": "Oh... what the heck is that? It's me... standing where everyone can see... oh no. Oh no no no. She's so brave. I'm hiding behind her.",
    "Giggles": "What the heck is that?! It's MEEE! Hee hee! Oh, this is the funniest thing on the whole island. Two of me! Double the giggles!",
    "Mochi": "What the heck is that?! It's me! A big flat me! Do you think she likes clover too? I'm going to leave her some. Just in case.",
    "Shadow": "What the heck is that. It's me. It doesn't blink. It doesn't purr. It just stands there, claiming the warm spot. ...I respect it completely.",
    "Raven": "What the heck is that... a flightless, feather-flat me. The dark clouds would weep. I shall recite it my poem about the sea.",
    "Newton": "What the heck is that?! Extraordinary — a Newton with no rotational neck capacity whatsoever! However does it keep watch? I must observe it observing.",
    "Lotus": "What the heck is that. Ah... a me balanced forever on both legs. Showing off, then. The tide will humble us all in time.",
    "Squire Paws": "WHAT THE HECK IS THAT?! Bark! It's ME! A fellow knight! We shall guard this spot together, flat sir! Two tabards are better than one!",
    "Pebble": "Oh! What the heck is that...? It's me. But she can't tuck into her shell. Out there. Always. So exposed. So brave. I'll guard her.",
    "Sunny": "WHAT THE HECK IS THAT?! Hello, friend! It's me! Hello, me-friend! She's not saying it back, but I KNOW she's thinking it!",
    "Fluffernox": "What the heck is that?! It's me! Look at her little horns! I'm going to give her a gentle pat. She earned it by existing.",
    "Grumble": "What the heck is that. It's me. Terrifying. Absolutely fearsome. ...Someone straightened the wildflowers around it. It wasn't me. Stop asking.",
    "Vesper": "What the heck is that... a shadow of a shadow. A me who will never see sunset. I shall sit beside her and hum something moody to the moon.",
    "Gizmo": "What the heck is that?! A one-eyed— no, ZERO-eyed me! How does it see? It doesn't! And yet it stands! I have THEORIES.",
    "Ommmm": "Hmmmm. What the heck is that. A me who listens without ears. The highest magic. I will sit with it and listen back.",
    "Lord Roar": "WHAT the heck is THAT?! A monument! To ME! At last, the island recognizes nobility. It shall be knighted. It may ride my noble steed. Ceremonially.",
    "Snug": "Eep! What the heck is that...? It's me. Out in the open. No rock. No hiding. Just... standing there. Bravest me I've ever seen.",
    "Gigglegrow": "WHAT THE HECK IS THAT?! It's ME! AHAHA! I bounced three times when I saw it! The birds left! Worth it! WORTH IT!"
};

// ---- Per-character small talk: three short conversations each ----
const SMALLTALK_BANKS = {
    "Piko": [
        st("The pinkest flower? Oh, that's the nicest thing anyone's ever said without beeping. I hope nobody picks me, though. I'd look very silly in a vase.", [
            ["I'd put you on the best windowsill in the shack.", "The best windowsill? Then I'd get morning light and afternoon naps and maybe a view of the beach. That sounds like the best day a robot could have. Thank you, Dreamer."],
            ["You're too special to pick.", "Too special to pick. I like that. Maybe I'm not a flower at all. Maybe I'm a whole garden. A tiny, pink, beeping garden."],
            ["Maybe you'd look cute in a tiny pot.", "A tiny pot? I'd have to fold my arms very carefully. And my antennae would stick out. But I'd try. For you, I'd try anything cute."]
        ]),
        st("Energy? Do I have energy? I feel mostly sparkles and warmth. Is that the same thing? I hope it's not too much. I don't want to overwhelm the butterflies.", [
            ["It's the perfect amount of energy.", "Perfect amount? That's a relief. I don't have a dial for that. I only have a dial for brightness, and it's always on maximum."],
            ["The butterflies can handle it.", "The butterflies can handle it. Good. Because sometimes I beep when I'm happy, and I don't want to startle my tiny wing-flapping friends."],
            ["A little overwhelm never hurt anyone.", "A little overwhelm never hurt anyone? I hope that's true. I overwhelmed my own charging station once. It blushed and shut down for a whole afternoon."]
        ]),
        st("Standing still is easy when the weather is warm. Everything slows down. Even my fans spin slower. It's very peaceful, like being a little pink statue of friendship.", [
            ["Friendship statue is a good job.", "Friendship statue is a good job. I'd wear a little plaque at my feet. Plaque words: Piko. Likes butterflies, warm breezes, and Dreamer."],
            ["You'd be the cutest statue in a garden.", "The cutest statue in a garden? I'd have to hold very still. But if someone smiled at me, I'd probably wiggle. Garden statues aren't supposed to wiggle."],
            ["I should try standing still more often.", "You should try standing still more often. Then we could stand still together. Two still friends, watching butterflies. That's almost a poem."]
        ])
    ],
    "Rivet": [
        st("Lucky? Leaves aren't lucky. They're just... leafy. But I suppose someone organized should watch them. The wind has no sense of order whatsoever.", [
            ["The wind could learn from you.", "The wind could learn from me? Hmph. It could learn a lot. Like how to arrive on time and stop rusting my joints with surprise gusts."],
            ["Order is underrated on an island.", "Order is underrated. Everyone's running around picking weeds and chasing crabs. Someone needs to watch the leaves fall in a sensible pattern."],
            ["Maybe the wind is just spontaneous.", "Spontaneous? Spontaneous is just a fancy word for unplanned. I don't trust unplanned. Unplanned things usually end up dented."]
        ]),
        st("Important? Finally, someone recognizes it. I have a whole system. Big leaves here, small leaves there, suspicious leaves investigated separately.", [
            ["Suspicious leaves sound serious.", "Serious? Suspicious leaves are always serious. They land too flat, or too curled, or with a smug little edge. You know the type."],
            ["What's a suspicious leaf look like?", "A suspicious leaf looks exactly like a normal leaf except it's up to something. I can tell. I've watched enough leaves to know when one is plotting."],
            ["You should run the whole island.", "Run the whole island? Hmph. I'd have a schedule for everything. Crab parades at dawn. Tree inspections at noon. Mandatory leaf alignment at sunset."]
        ]),
        st("I wasn't waiting. I was standing with purpose. There's a difference. A very big difference that I'm not going to explain, because you should already know.", [
            ["Purposeful standing is a real skill.", "Purposeful standing is absolutely a skill. It requires balance, patience, and the ability to look busy while doing nothing. Not everyone can manage it."],
            ["I'll pretend I don't know.", "Pretend you don't know? Fine. But if you slip up, I'll deny everything. I have a very convincing 'I was just counting leaves' face."],
            ["Whatever you say, Rivet.", "Don't say 'whatever you say' like that. It sounds like you don't believe me. Which is fine, because I don't care if you believe me. Much."]
        ])
    ],
    "Shade-7": [
        st("The view. Yes. The horizon mocks us with its calm. Blue upon blue, pretending everything is fine. The view is technically adequate, I suppose.", [
            ["Adequate is still a compliment.", "Adequate is the highest praise I give to anything that isn't a storm cloud. Today, the horizon has earned my reluctant acknowledgment."],
            ["What color would you prefer?", "Preferred color? Oh, I don't know. Deep violet. Maybe a bruised purple. Something that says, 'The universe is vast and vaguely disappointed.'"],
            ["Maybe the horizon needs a makeover.", "A makeover? No. The horizon is fine the way it is. I just reserve the right to look at it mournfully. That's what the water is for. Reflections of moodiness."]
        ]),
        st("Relaxing nothingness. Exactly. The waves are just small reminders that everything keeps moving while we stand still. Very comforting, in a hopeless kind of way.", [
            ["Hopeless comfort is still comfort.", "Hopeless comfort is still comfort. You're surprisingly understanding for someone who probably has a normal amount of optimism."],
            ["You make the ocean sound poetic.", "Poetic? The ocean doesn't need my help to be poetic. It just sits there, being deep and mysterious. Some of us work very hard for that effect."],
            ["I prefer when the waves are cheerful.", "Cheerful waves? Ugh. They splash too loudly. They don't understand that some of us prefer our water with a side of existential dread."]
        ]),
        st("Looking for me? That implies I was lost. I wasn't lost. I was simply existing in a location unknown to others. It's different. Slightly.", [
            ["I like finding hidden things.", "You like finding hidden things. That's either charming or slightly invasive. For now, I'll call it charming. The day is gloomy enough to allow it."],
            ["You weren't hard to spot by the water.", "I wasn't hard to spot? Is that because I'm dark and dramatic by the water, or because I'm the only robot here reciting poems to seagulls?"],
            ["Existing unknown sounds lonely.", "Lonely? No. Lonely implies I want company. I simply want the world to know I exist in a state of elegant solitude. There's a difference. Probably."]
        ])
    ],
    "Cypher": [
        st("Excellent. Category one: fluffy cumulus. Category two: wispy cirrus. Category three: the one that looks like a hat but isn't. Category four: clouds I suspect are pretending to be sheep.", [
            ["Clouds pretending to be sheep? Suspicious.", "Suspicious, yes. Sheep-shaped clouds have no business drifting that slowly. They're up to something. Atmospheric mischief, most likely."],
            ["That's a very thorough system.", "Thoroughness is my default state. I once categorized every rock on the beach. Most were 'round' or 'rounder than expected.' It was a triumph of granularity."],
            ["What about the cauliflower one?", "The cauliflower cloud is currently classified as 'vegetable-adjacent cumulus, subtype baffling.' I suspect it may be a meteorological pun."]
        ]),
        st("Highlights. Right. Today's sky contains seventeen standard shapes, three anomalies, and one cloud that I believe is mocking me personally.", [
            ["How can a cloud mock you?", "It tilts. Every time I look directly at it, it tilts slightly to the left. That is statistically unlikely for a passive water-vapor formation."],
            ["Seventeen is a lot.", "Seventeen is average for a partly dreamy day. On overcast days I've counted over forty. The sky is more organized than people realize."],
            ["Anomalies are more interesting.", "Anomalies are always interesting. Today's anomaly is a cloud shaped almost exactly like a teapot. I don't drink tea, but I respect the reference."]
        ]),
        st("Clouds as clouds? That's a remarkably low-resolution interpretation. But I respect it. Not everyone has the patience to overanalyze the sky.", [
            ["Someone has to keep it simple.", "Keeping it simple is a public service. If everyone overanalyzed the sky, we'd never get anything done. Also the clouds would get self-conscious."],
            ["I leave the sky to experts like you.", "Experts? I wouldn't call myself an expert. I'm more of an enthusiastic amateur with an unusually detailed spreadsheet. But thank you for the promotion."],
            ["Maybe the clouds prefer simplicity.", "The clouds prefer simplicity? Perhaps. Maybe they drift precisely because no one expects them to organize. It's a very low-pressure existence."]
        ])
    ],
    "Om-Bit": [
        st("Then we sit. Not for a reason. Not to solve anything. Just to be here, where the grass is warm and the sky is wide. This is enough.", [
            ["It really is enough.", "Enough. Yes. Enough is a small word, but it holds a great deal. Today, we have enough sun, enough breeze, enough presence."],
            ["I usually need a reason to stop moving.", "Needing a reason to stop is a habit of the busy world. Here, we may stop simply because we have arrived. Arrival is reason enough."],
            ["Sitting with you feels peaceful already.", "Peaceful. Good. Peace is not a place we reach. It is a place we return to, again and again, like a favorite path through the grass."]
        ]),
        st("Not good at quiet. That is also a kind of practice. The mind chatters like a small bird. We do not silence the bird. We let it fly past.", [
            ["That's a gentle way to think about it.", "Gentle is good. The world is loud enough. We do not need to be louder than it. We can be the soft place where noise settles."],
            ["My mind chatters a lot.", "A chattering mind is not a problem. It is only the wind moving through empty rooms. Let it move. The rooms remain still."],
            ["What if the bird wants to stay?", "If the bird wants to stay, we offer it a branch. We do not chase it away, nor do we make it the master of the house. It stays until it is ready to fly."]
        ]),
        st("The trees are not thinking in words. They are being. Tall, patient, rooted. We could learn from trees, though we should not try to grow bark.", [
            ["No bark-growing. Got it.", "No bark-growing. Wise. Some lessons are not meant to be taken literally. The trees would be confused, and you would be itchy."],
            ["Patience is the hardest part.", "Patience is difficult because the world rewards speed. But trees do not speed. They grow in silence, and no one applauds, yet they become tall."],
            ["Being tall seems nice, though.", "Being tall has its own troubles. More wind, more weather, more responsibility to shade the small things. Height is a kind of service."]
        ])
    ],
    "Sir Cogs-a-Lot": [
        st("A noble quest, conversation! Many underestimate its power. A single kind word can lift a spirit higher than any sword. I myself have no sword, but I have many words.", [
            ["Words are mightier than swords anyway.", "Mightier than swords, aye! For words need no sharpening, no scabbard, and no polishing. They travel light and strike gently upon the heart."],
            ["I'll take kind words over sword fights.", "Wise choice. Sword fights leave dents in one's chassis, and I prefer my brass un-dented. Kind words, however, only polish the soul."],
            ["How many words do you have?", "How many words? A knight never counts his words, lest he discover he has run out mid-speech. I prefer to believe my vocabulary is infinite."]
        ]),
        st("A true spirit! Adventure awaits around every tree and beneath every rock. Though I should warn thee, the local crabs are fierce negotiators of territory.", [
            ["Fierce crabs? Tell me more.", "Fierce crabs? Aye! They raise their claws like tiny banners and declare, 'This sand is ours!' I always salute their courage before walking around them."],
            ["I've met a few brave crabs.", "Then thou knowest their ways. Brave little warriors of the shoreline. They do not yield, yet they are soft of heart, for they retreat into the waves when tired."],
            ["Maybe we should avoid crab territory.", "Avoid crab territory? A cautious strategy, yet honorably executed. Not every quest requires confrontation. Sometimes the bravest path is the one that gives crabs their space."]
        ]),
        st("An inspector after mine own heart! These trees stand tall, their leaves are many, and their bark is pleasantly rough. A fine forest indeed.", [
            ["Rough bark is the best bark.", "The best bark? A connoisseur! Rough bark tells the story of many seasons. Smooth bark is young and hopeful, but rough bark has lived."],
            ["Not too tall, not too short.", "Not too tall, not too short. Exactly so! The trees of this island have achieved noble proportion. Neither arrogant nor humble. Simply tree-ish."],
            ["I approve of these trees as well.", "Thy approval is noted and cherished! Together we form a council of tree appreciation. Our meetings shall be held beneath the widest branches."]
        ])
    ],
    "Tinker": [
        st("A professional watcher? I don't know about that. I just... notice things. Like how that bird over there tilts its head when it sees something new.", [
            ["Noticing things is a real skill.", "A real skill? Maybe. I notice which birds come back every day, and which branches they like best. It's not useful, but it's... something."],
            ["Which bird tilts its head?", "The little blue one. It tilts its head whenever a butterfly passes. I think it wonders if butterflies are also birds, just very small and confused."],
            ["I bet you notice all the small details.", "Small details? I try. Like the way the light changes on the grass before it rains. Or how some rocks are warmer than others. Little things."]
        ]),
        st("A lot of practice. Yes. They've been sitting since before I was assembled. That's a very long time. I respect that kind of dedication.", [
            ["Bird dedication is inspiring.", "Inspiring? I suppose. They just keep doing what they do. Flying, sitting, singing. No one tells them to. They just know."],
            ["You have your own kind of dedication.", "My own dedication? Well, I do come here almost every day. Not because I have to. Because it's quiet, and the birds don't ask me hard questions."],
            ["Maybe they'll teach you their secrets.", "Their secrets? I don't know if they'd tell me. They might think I'm too metal. Too squeaky. But I would listen very carefully if they did."]
        ]),
        st("Together? I mean, if you want. I don't want to bother you. Or the birds. But if you're sure... we could stand over here. Quietly.", [
            ["Quietly sounds perfect.", "Quietly is good. I like quiet. Words can be loud, even when they're soft. But with you, maybe quiet is okay. Maybe more than okay."],
            ["I won't scare the birds.", "You won't scare them? Good. I get scared too, sometimes. Loud noises, sudden movements, the word 'schedule.' So I understand the birds."],
            ["Standing here is fine with me.", "Standing here is fine with you? Then it's fine with me too. We can be fine together. That's... that's a nice thing to be."]
        ])
    ],
    "Zap-Zap": [
        st("Good morning! Did you sleep well? Did you dream about nice things? Did you see any birds yet? I saw three birds and one very shiny rock!", [
            ["I saw two birds and a butterfly.", "Two birds and a butterfly! That's a whole squad! A bird-bird-butterfly squad. I bet they had important island business to attend to."],
            ["Shiny rocks are the best rocks.", "Best rocks! Shiny ones, round ones, flat ones, weird ones. Every rock is doing its best, and the shiny ones are just extra confident about it."],
            ["I dreamed about the beach.", "The beach! Did you walk in the sand? Did the waves say hello? I think the waves are always saying hello, even when they're just quietly lapping."]
        ]),
        st("Energetic? That's just how I'm wired! My circuits are like happy little bumblebees. Buzz buzz buzz, but friendly. Not real bees, though. Robot bees.", [
            ["Robot bees sound fun.", "Robot bees? They'd be polite and not sting anyone, and they'd probably help carry tiny things. Like crumbs, or good ideas, or very small hats."],
            ["I'd like that kind of wiring.", "You'd like my wiring? I could lend you some enthusiasm, but I don't think it works that way. Enthusiasm has to come from inside, like a tiny sun!"],
            ["Do you ever need to recharge?", "Recharge? Oh, sure, sometimes. But the sun charges me up too! And friendly conversations! And seeing a really good cloud! I'm basically always charging!"]
        ]),
        st("Clouds? They move! That's already amazing. Plus they make shapes, and they bring shade, and sometimes they look like really fluffy blankets for the sky!", [
            ["Blankets for the sky. I love that.", "Blankets for the sky! Right? The sky gets cold too, probably. I don't know if it does, but if it does, clouds are the coziest solution ever!"],
            ["Cloud shapes are my favorite.", "Cloud shapes are the best! Today I saw one that looked like a hat, one that looked like a boat, and one that looked like a very confused potato!"],
            ["Shade is very appreciated.", "Shade is the best! It's like the sun and the clouds are working together to give everyone a nice break. Teamwork makes the island work!"]
        ])
    ],
    "Boo-Boo": [
        st("Almost? That means I got a little bit scary! Progress! Maybe by next holiday I'll be medium-scary. Not too scary, though. I don't want anyone to float away.", [
            ["Medium-scary is a good goal.", "Medium-scary. I'll practice in front of a mirror, except I don't have one, so I'll practice in front of calm water. Water is like a mirror, but wiggly."],
            ["Don't get too scary, I like you soft.", "Soft is okay. Soft can still be a little scary, right? Like a marshmallow shaped like a ghost. Wait, that's me. I am the marshmallow ghost."],
            ["Floating away might be fun, actually.", "Floating away might be fun? Maybe, but then I'd miss all the butterflies and sunny spots and you. So I'll stay right here, mostly."]
        ]),
        st("Cute? Oh, thank you! I was going for spooky, but cute is like... spooky's nicer cousin. Cousin Cute. That could be my middle name if ghosts had middle names.", [
            ["Boo-Boo Cousin Cute has a ring to it.", "Boo-Boo Cousin Cute. I like it! Maybe I'll introduce myself that way from now on. 'Hello, I'm Boo-Boo, and this is my cousin title.'"],
            ["Spooky's nicer cousin is a good title.", "Cousin Cute, title holder of nice spookiness. I should make myself a little badge. Do you think leaves could be a badge? I'd like a leaf badge."],
            ["Do ghosts have last names?", "Last names? I don't know. Maybe my last name is 'of the Island.' Boo-Boo of the Island. That sounds very important and floaty."]
        ]),
        st("Long hugs are the best kind. Even though I'm all floaty, I can still feel warm inside when someone smiles at me. Smiles are like invisible hugs, I think.", [
            ["Smiles are definitely invisible hugs.", "Invisible hugs. I'll give you one right now. Did you feel it? It was warm and smiley and a little bit floaty around the edges."],
            ["Your smile feels warm to me.", "Warm? Me? That's the best thing anyone's said since someone called me 'round.' I like being round and warm. Round and warm and friendly."],
            ["Floaty hugs still count as hugs.", "Floaty hugs count. I agree. All hugs count if they mean something. And this hug means I think you're very nice and I'm glad you said hello."]
        ])
    ],
    "Wisp": [
        st("Acceptable. That's the highest praise I give to weather. Most days the wind is too enthusiastic, but today it has the decency to be subtle.", [
            ["Subtle weather is underrated.", "Underrated. Exactly. Everyone wants sunshine and big wind, but a soft breeze that barely moves your hair? That's elegance. That has taste."],
            ["Enthusiastic wind has its charms.", "Enthusiastic wind has charms? I suppose. It does make the leaves dance. But leaves dance too much, in my opinion. Show-offs."],
            ["You have high weather standards.", "High standards? Someone has to have them. If I complimented every breeze, what would the truly excellent breezes think? They'd be devastated."]
        ]),
        st("Not planning to? Then what were you planning? Standing around? Because if so, I suppose there's room near this bush. Not that I want company.", [
            ["Standing around sounds nice, actually.", "Standing around sounds nice. Fine. Stand over there. Not too close. A respectful distance. Close enough to talk, far enough that I can pretend you're just passing through."],
            ["I could use a break from walking.", "A break from walking? You humans and your walking. Always going somewhere. The dream island isn't going anywhere. It will still be here when you stop moving."],
            ["You don't have to want it for it to happen.", "I don't have to want it. That's annoyingly true. But since you're here and the breeze is acceptable, I suppose I won't float away immediately. That's all."]
        ]),
        st("Waiting? Me? Don't be absurd. A ghost doesn't wait. A ghost simply exists in a specific location at a specific time that coincidentally matches your walking schedule.", [
            ["Coincidence is a kind of magic.", "Coincidence as magic. That's a very dreamy thing to say. This whole place is dreamy, so I suppose it fits. Fine. Coincidence. Magic. Whatever."],
            ["I'll accept that explanation.", "Accept my explanation? You'd better. It took me a long time to come up with something that sounded both plausible and disinterested."],
            ["Your schedule-matching is impressive.", "Impressive? Don't compliment me. I'll blush, and ghosts aren't supposed to blush. It disrupts the whole translucent aesthetic."]
        ])
    ],
    "Morwen": [
        st("Beautifully dramatic. Yes. The sun doesn't simply leave. It makes a scene. It throws colors everywhere and demands that everyone watch. I respect the commitment.", [
            ["The sun knows how to make an exit.", "The sun knows how to make an exit. If only all departures were so graceful. Most are just... gone. The sun at least gives us a show first."],
            ["A committed sunset is the best sunset.", "Committed to the very end. That's how one should live, I think. Give everything until the last moment, then fade beautifully into whatever comes next."],
            ["I always watch the exit.", "You watch the exit? Most people look away. They say goodbye too early. But you stay until the color fades. That is a small, noble act."]
        ]),
        st("You prefer brightness? That's sweet. Innocent, even. But darkness holds its own comfort. The stars come out. The world gets quiet. Everything feels possible in the dark.", [
            ["The stars are worth the dark.", "Worth the dark. Yes. The stars would not shine if they had to compete with the sun all night. Darkness gives small lights their chance to be seen."],
            ["Darkness does feel full of possibility.", "Possibility. In the dark, no one can see you doubt yourself. You can try on different versions of yourself. The night keeps secrets generously."],
            ["I'll try to appreciate it more.", "Try to appreciate it more. That's all any of us can do. Start with small things. The shape of shadows. The quiet between bird songs. The comfort of dim light."]
        ]),
        st("A mood? More than a mood. It's an entire philosophy. Why be merely pretty when you can be beautiful and heartbreaking? Beauty with depth has longer staying power.", [
            ["Depth does make things memorable.", "Depth makes things memorable. A shallow sunset is pretty and forgotten. A dramatic one haunts you. I prefer to be haunted by beauty."],
            ["Heartbreaking isn't always cozy, though.", "Heartbreaking isn't cozy, you say? Perhaps. But a small ache can be warm too. Like remembering a song you loved. Sadness and coziness are not enemies."],
            ["Staying power is important for a sunset.", "Staying power. The best sunsets stay with you until morning. The best ghosts stay even longer. I intend to be one of the staying ones."]
        ])
    ],
    "Spectra": [
        st("Complicated? I suppose. But dreams are complicated. If I say 'hello' without context, am I greeting you, your dream-self, or the concept of greeting itself?", [
            ["Maybe all three at once.", "All three at once. A multilayered greeting. I like that. Efficiency and depth combined. The dream rewards such combinations, I have observed."],
            ["A simple hello works fine for me.", "Simple hello. Sometimes the simplest greetings survive the longest. Language evolves, but a warm hello remains surprisingly stable across iterations."],
            ["You think about language a lot.", "Language is the framework of thought. If I think too much about a word, sometimes the word starts to look strange. Hello. Hello. Now it looks like a small hat."]
        ]),
        st("A symbol of consciousness. Yes. You represent agency within the dream narrative. That's quite a responsibility, though I imagine it mostly involves walking around and picking things up.", [
            ["Walking and picking things up is my specialty.", "Specialty noted. Agency requires locomotion and object manipulation. You are, by definition, highly operational. A well-functioning symbol."],
            ["Agency feels like a big word for it.", "Big word, perhaps, but accurate. Without agency, the dream would simply unfold around no one. You are the observer and the actor. Very efficient design."],
            ["I try to be a responsible symbol.", "Responsible symbol. Excellent. Responsibility keeps the dream coherent. Too much chaos and the island might forget what shape it is supposed to be."]
        ]),
        st("Analyze everything? Not everything. Just most things. For example, I am not currently analyzing that rock over there. Wait. I am now. It is sedimentary. Probably.", [
            ["Probably sedimentary is good enough.", "Good enough is a valid scientific conclusion. Perfect certainty is rare, especially in dreams. 'Probably sedimentary' is honest and appropriately humble."],
            ["You couldn't resist the rock.", "I couldn't resist. Rocks are excellent subjects. Silent, patient, and full of history. Unlike me, they don't overthink their existence. Probably."],
            ["Analysis is a form of admiration.", "Admiration through analysis. I had not considered that, but it is true. To study something closely is a kind of affection. I am very affectionate, then."]
        ])
    ],
    "Hush": [
        st("Listening more often is a gentle practice. Not everything needs a reply. Some moments simply want to be noticed. You can begin with the wind.", [
            ["The wind is a good place to start.", "The wind is a kind teacher. It comes and goes. It does not stay to be thanked. You can learn a lot from something that never asks for credit."],
            ["Not everything needs a reply. I like that.", "Not everything needs a reply. Some things only need witness. To see, to hear, to be present. That is enough. More than enough."],
            ["Noticing sounds peaceful.", "Noticing is peaceful because it removes the pressure to do. You are not fixing or changing. You are simply here, with the world as it is."]
        ]),
        st("The space between sounds sounds like stillness wearing a soft coat. It is not empty. It is simply waiting for the next sound to arrive without rushing.", [
            ["Stillness wearing a coat. That's a lovely image.", "A lovely image. I am glad it reached you. Some teachings need words, but the best ones arrive as pictures in the mind. Soft. Easy to remember."],
            ["Waiting without rushing sounds difficult.", "Difficult because we are trained to move. But waiting is also a movement, just a very small one. The heart slows. The breath deepens. That is travel too."],
            ["I'll try to hear it next time.", "Try to hear it. Do not strain. Just open yourself a little wider than usual. The silence will find you. It is generous that way."]
        ]),
        st("Silence can feel like a question we do not know how to answer. But it is not asking. It is simply present, like the sky. You do not need to fill it.", [
            ["That's reassuring.", "Reassuring. Good. The world asks very little of us. Mostly it asks that we do not run from it. Stay, and you will find it stays with you."],
            ["I'll let silence be present.", "Let silence be present. Yes. You do not need to perform for it. It will not judge your quiet. It is already quiet itself."],
            ["The sky doesn't ask questions either.", "The sky asks nothing. It simply holds us. Day and night, light and dark, it remains. That is a kind of love that does not need words."]
        ])
    ],
    "Sir Haunts-a-Lot": [
        st("A fine name indeed! It has dignity, it has leaf, and it has the noble suffix 'a-Lot.' Any name ending in 'a-Lot' carries ancient gravitas. Or so I have decided.", [
            ["I agree about the gravitas.", "Gravitas! You understand the old ways, Dreamer. A name must sound like it could open a heavy door or announce a feast. Sir Leaf-a-Lot does both."],
            ["Maybe I should be Dreamer-a-Lot.", "Dreamer-a-Lot! A noble title! It implies you dream often, dream deeply, and dream with great honor. I shall use it henceforth."],
            ["Sir Leaf-a-Lot should have a ceremony.", "A ceremony! With a twig as sword and a patch of sunlight as crown. I shall knight the tree again, officially, before witnesses. You shall be the witness."]
        ]),
        st("A tree is knighted through shade, patience, and the ability to stand tall through many seasons. Also, birds must like it. Birds are excellent judges of character.", [
            ["Birds are very trustworthy judges.", "Trustworthy judges indeed. A bird would not nest in an unworthy tree. It knows what is solid, what is kind, and where the best morning light falls."],
            ["Patience is a knightly virtue.", "A knightly virtue! Patience allows one to endure long winters, quiet afternoons, and the occasional rude crab. Knights must be patient as stones."],
            ["I should find more knights among the trees.", "Find more knights! A noble quest. Look for anything that stands guard without complaint. Rocks, trees, steady breezes. All may wear invisible armor."]
        ]),
        st("Other knights? Oh, aye! Sir Rock-a-Lot, guardian of the beach. Sir Cloud-a-Lot, watcher of the sky. Sir Crab-a-Lot, fierce defender of sand territory.", [
            ["Sir Crab-a-Lot sounds brave.", "Brave and tiny! Sir Crab-a-Lot raises his claw like a banner and declares, 'None shall pass without acknowledging my sand!' I salute him every time."],
            ["Sir Cloud-a-Lot watches over everything.", "Watches over everything with great softness. Sir Cloud-a-Lot drifts above, keeping the sun in check and the shadows interesting. A knight of the sky."],
            ["I want to meet all of them.", "Meet all of them? A worthy ambition! The island is full of quiet heroes. I shall be your guide, Dreamer-a-Lot, to the realm of noble nothings!"]
        ])
    ],
    "Flutter": [
        st("The best corners? I think so too. Corners where two walls meet and the world feels smaller and safer. Even outside, you can find a corner between two trees.", [
            ["A corner between two trees sounds perfect.", "Perfect. Two trees, a little space, a patch of grass. It feels like a room with no ceiling. The sky can visit, but it doesn't have to stay."],
            ["Safe feels nice.", "Safe is nice. Not because the world is scary, but because safe lets you breathe slower. I like slow breathing. It matches how I float."],
            ["Small worlds are easier to be in.", "Small worlds are easier. You can see all the edges. You know where the quiet is. Big worlds have too much happening at once."]
        ]),
        st("Soft light? Yes. Bright light is too loud. It shows everything all at once. Soft light lets things hide a little, and I think hiding a little is nice sometimes.", [
            ["Soft light is like a whisper.", "A whisper of light. That's exactly it. It doesn't announce itself. It just arrives softly and leaves before you get tired of it."],
            ["Hiding a little is allowed.", "Allowed. I like that word. Allowed means no one will be disappointed. I can hide behind a flower, or a rock, or just be a little transparent."],
            ["You look gentle in dim light.", "Gentle? Me? I don't think anyone's called me gentle before. It makes me feel like a smooth stone. Not sharp. Just there, quietly."]
        ]),
        st("As quiet as I want? That's a very generous rule. Most things want you to be louder. But here, I can be small and still be okay.", [
            ["Small and okay is enough.", "Small and okay is enough. That's going to be my new saying. I'll whisper it when I feel too floaty. Small and okay. Small and okay."],
            ["I won't ask you to be louder.", "You won't ask? Good. Because I'd probably try, and then I'd feel all stretched out, like a ghost trying to be too solid. I don't want to stretch."],
            ["Quiet friends are good friends.", "Quiet friends are good friends. They don't fill all the space. They leave room for you to be in. I want to be that kind of friend."]
        ])
    ],
    "Giggles": [
        st("Three hellos back! That's six hellos total! We just made the island more welcoming by a factor of six. Math is wonderful when it's made of greetings.", [
            ["Six is the perfect number of hellos.", "Perfect! Six hellos. I shall remember this number. Next time I'll do nine. Nine hellos! That's almost too many, but I think almost-too-many is the right amount."],
            ["We should make greeting math a thing.", "Greeting math! Yes! If hello plus hello equals more hello, then friendship must be exponential. I don't know what exponential means, but it sounds bouncy!"],
            ["The island feels more welcoming already.", "Already more welcoming! Because every hello is a little doorway, and now there are six doorways between us. Come through anytime, Dreamer!"]
        ]),
        st("Happy sky! Maybe the clouds told it a good joke. Clouds seem like they'd know excellent jokes. They're so soft and round and full of surprises.", [
            ["Cloud jokes are probably very fluffy.", "Very fluffy! Fluffy jokes are the best kind because even if they're not funny, they're still soft. A soft joke is never a bad joke."],
            ["What kind of jokes do clouds tell?", "Cloud jokes? Let me think. Why did the cloud go to school? To become a little brighter! Get it? Because the sun comes out? Hehe!"],
            ["Surprises are cloud-shaped sometimes.", "Cloud-shaped surprises! Like finding shade exactly when you need it. Or a tiny rain that waters the flowers but not your head. Clouds are thoughtful that way."]
        ]),
        st("A sunny face! And when the clouds drift by, the sky gets little eyebrows. Sometimes it looks surprised. Sometimes it looks sleepy. Today it looks delighted.", [
            ["I hope it stays delighted.", "Stay delighted! I'll ask the butterflies to dance nicely so the sky doesn't get shy. Happy sky, happy butterflies, happy island. That's my wish."],
            ["Sleepy sky is also a good look.", "Sleepy sky is good. Big soft clouds like pillows. You can look up and imagine resting your head on them. Not literally, but dreamily."],
            ["The sky has many moods.", "Many moods! All wonderful. Bright, sleepy, cloudy, pink. The sky gets to wear a new outfit every day. I wish I could do that. I'd have a rainbow wardrobe!"]
        ])
    ],
    "Mochi": [
        st("Soft-spot map! Okay. Spot one is near the big tree with the twisty trunk. Spot two is by the wildflowers that smell like honey. Spot three is... right here. Because you're here.", [
            ["Right here is the best spot.", "The best spot because friends make everything softer. Even hard ground feels okay when a friend is nearby. That's rabbit science."],
            ["Twisty trunk tree is landmark material.", "Landmark material! Big and twisty and impossible to miss. I use it for navigation. 'Hop past twisty trunk, turn left at the nice smell.'"],
            ["Honey flowers sound worth the visit.", "Worth the visit and worth the sniff. I try to visit them every morning. They make my nose happy, and a happy nose leads to a happy day."]
        ]),
        st("Find your own? Yes! The best soft spots choose you, not the other way around. You just hop around until one spot makes your feet say 'ahh.' That's your spot.", [
            ["My feet will tell me. Got it.", "Your feet will tell you. Listen carefully. They say things like 'this grass is nice' or 'let's sit here' or 'we found it!' Feet are chatty if you let them be."],
            ["Do humans hop for soft spots?", "Humans can hop too! I've seen it. Well, sort of. You do a different kind of hop. Slower. But still valid. All hopping counts."],
            ["I hope my spot is near yours.", "Near mine? I hope so too! Then we can share soft spots and compare notes. 'This one is a four-paw soft.' 'This one is more of a three-and-a-half.'"]
        ]),
        st("Hop cloud! That's exactly what it feels like. Boing, boing, little cloud boing. If clouds were grassy and bouncy, that's the sound they'd make.", [
            ["Boing is a good sound.", "Boing is my favorite sound. It's friendly and round and full of hope. Every boing is a tiny promise that the next hop will also be good."],
            ["Clouds should be bouncy.", "Clouds should absolutely be bouncy. Imagine bouncing from cloud to cloud. The birds would be so impressed. Even the seagulls would have to admit it's cool."],
            ["I'll practice my hop cloud technique.", "Practice makes perfect! Start small. A little hop, then a bigger hop, then a hop where you land exactly where you meant to. That's master level."]
        ])
    ],
    "Shadow": [
        st("I will enjoy it. Very much. Possibly for hours. You don't have to stay and watch, but if you did, it wouldn't ruin anything. Not that I care.", [
            ["I'll stay for a minute, if that's okay.", "A minute is acceptable. Long enough to appreciate the sun, short enough that I don't have to think of more things to pretend not to care about."],
            ["I have things to do, so I'll leave you to it.", "Things to do. Of course. Busy Dreamer, running around the island. I'll still be here. The sun will still be here. No need to rush back."],
            ["Watching cats sunbathe is relaxing.", "Relaxing? I'm glad my lounging provides entertainment. Very glad. Not glad enough to move, obviously, but still. It's something."]
        ]),
        st("A good sunny spot? Obviously. I have excellent spot-selection skills. It's one of my many talents, along with ignoring people and looking mysterious.", [
            ["Mysterious suits you.", "Suits me? I know. Black fur, sunny spot, aloof expression. It's a complete aesthetic. I worked very hard on it by doing almost nothing."],
            ["Spot selection is underrated.", "Underrated. Most creatures just fall onto any warm surface. I choose. I evaluate. I claim. It's practically architecture."],
            ["Ignoring people is also a talent.", "A talent and a lifestyle choice. I ignore when I want to, which is often. It keeps the world from getting too familiar. Familiarity is exhausting."]
        ]),
        st("Didn't ask? Hmph. I was simply being thorough. Some people demand explanations. Not you, apparently. Fine. I respect that. Slightly.", [
            ["Thoroughness is a good quality.", "Good quality? Fine. I'll accept that. But don't go around complimenting me too much. I have a reputation to maintain."],
            ["Slightly respected is still respected.", "Slightly respected is still respected. That's the most sensible thing you've said. I'll remember it. Probably. If it suits me."],
            ["I'll keep not demanding things.", "Keep not demanding things. That's a peaceful way to live. I might even stop pretending to be annoyed. Eventually. In stages."]
        ])
    ],
    "Raven": [
        st("Dim moments are honest. They don't pretend everything is bright and simple. They let you be tired without making you feel bad about it.", [
            ["Honest light is refreshing.", "Refreshing, like cold water on tired wings. Honest light doesn't flatter. It simply shows what is. I find that more beautiful than flattery."],
            ["It's okay to be tired sometimes.", "Tired sometimes. More than sometimes, for some of us. The island doesn't rush. It lets you be tired. That is a rare kindness."],
            ["Dim suits your feathers.", "My feathers? Yes. Black and glossy and slightly dramatic. Dim light makes them look deeper, like little pools of night. I appreciate the effect."]
        ]),
        st("Color doesn't tire you? Perhaps you are stronger than I am. Gray has its place, yes. At the end of bright days, before the night decides what it wants to be.", [
            ["Gray is the in-between place.", "In-between. Neither bright nor dark. Neither loud nor silent. A place to pause before committing to a mood. Gray is wise."],
            ["Night is still deciding, I think.", "Still deciding. Night takes its time. It tries on stars, adjusts the moon, considers how much shadow to use. Fashionable darkness is not rushed."],
            ["Maybe I'm just used to color.", "Used to color. Then gray must feel like a guest. A quiet guest who doesn't stay long. Appreciate it while it visits, then return to your bright life."]
        ]),
        st("The sound of the waves. Yes. They don't ask anything of you. They just arrive and leave, arrive and leave. Reliable. Melancholy. Perfect.", [
            ["Reliable things are comforting.", "Comforting. The waves ask nothing, the trees stay put, the rocks endure. The island is full of things that simply continue. That is enough."],
            ["Melancholy can be beautiful.", "Beautiful. Melancholy has depth. It is not sad; it is saturated. Full of feeling. Like the sea when the sky is heavy and the water holds its breath."],
            ["I like that the waves don't need anything.", "Need nothing. That is their gift. They give rhythm without asking for applause. I try to be like the waves sometimes. Just arrive, observe, depart."]
        ])
    ],
    "Newton": [
        st("Excellent. Cloud migration is an underappreciated science. They begin near the trees at midday, gather above the grass by afternoon, and conclude at the beach by sunset. Very orderly.", [
            ["Clouds have a daily schedule.", "A schedule. Indeed. If only more island phenomena were so punctual. The crabs, for example, operate on a system I have yet to decode."],
            ["Who taught them to be so orderly?", "Who taught them? Perhaps the dream itself. The island has an internal logic. We observe it, document it, and occasionally nod respectfully at it."],
            ["I should start a cloud journal.", "A cloud journal! An excellent idea. Date, time, shape, direction, mood. Clouds do have moods, you know. Today's cumulus seems cheerful."]
        ]),
        st("A fine question. My hypothesis is that clouds enjoy the view of the water. The horizon gives them a sense of destination. Everyone needs a destination, even vapor.", [
            ["Even vapor needs purpose.", "Purpose, yes. Even vapor benefits from intention. Without purpose, a cloud might drift into a tree and feel embarrassed. No one wants an embarrassed cloud."],
            ["The horizon is a good destination.", "A good destination. Always out of reach, yet always visible. The horizon is the original goal. Every creature on this island looks toward it eventually."],
            ["Do clouds have preferences?", "Preferences? Difficult to measure. But I believe some clouds prefer morning light, while others enjoy the drama of dusk. Personality is not limited to solids."]
        ]),
        st("Shapes are valid too. Cumulus, stratocumulus, the occasional confused sheep. But direction adds narrative. A cloud without direction is just a shape. A cloud with direction is a journey.", [
            ["I like the idea of cloud journeys.", "Cloud journeys. Small voyages across an endless sky. They travel without luggage, without maps, and without complaint. An elegant mode of transportation."],
            ["Confused sheep clouds are my favorite.", "Confused sheep clouds. A classic. They fluff up, look around, and slowly forget what they were doing. I find them relatable and scientifically charming."],
            ["Direction gives things meaning.", "Meaning, yes. Direction transforms observation into story. A drifting cloud becomes a wanderer. A still cloud becomes a guardian. Context changes everything."]
        ])
    ],
    "Lotus": [
        st("A good teacher, yes, but a quiet one. It does not lecture. It simply shows, again and again, that everything returns in its own time.", [
            ["Returning in its own time is comforting.", "Comforting. Nothing is truly lost. The water leaves, but it returns. The sun sets, but it rises. The island keeps its promises."],
            ["I need a teacher that doesn't lecture.", "A teacher that does not lecture. Yes. The tide shows rather than tells. The sand is wet, then dry, then wet again. That is the whole lesson."],
            ["The tide is patient with us.", "Patient with us. Very patient. We run across the beach, build things, disturb the sand. The tide waits, then smooths everything over."]
        ]),
        st("Peaceful, once you find the balance. At first, the leg wobbles. The mind protests. But eventually, stillness becomes possible. Then it becomes preferable.", [
            ["Stillness becoming preferable is a journey.", "A journey from wobble to stillness. Each day, a little less protest. Each day, a little more trust in the leg, in the ground, in yourself."],
            ["I wobble too much for one leg.", "Wobbling is part of it. The wobble teaches you where your center is. Without wobble, there is no discovery of balance. Be kind to your wobble."],
            ["Balance is worth practicing.", "Worth practicing. Even a few moments of balance can steady the whole day. You do not need to stand on one leg. You can balance in any stillness."]
        ]),
        st("Tired? The tide is more like breathing than working. In, out, in, out. It does not tire because it does not strive. It simply moves.", [
            ["Moving without striving sounds free.", "Free. The tide does not push, it does not pull. It responds. It follows a larger rhythm. That is a freedom greater than choice."],
            ["I strive too much sometimes.", "Striving is human. But not every moment needs effort. Sometimes the best action is to breathe with the water and let the day move you."],
            ["The tide is like the island breathing.", "The island breathing. Yes. Inhale the morning, exhale the evening. The tide is one breath. We are all inside it. That is not loneliness. That is belonging."]
        ])
    ],
    "Squire Paws": [
        st("Peace and friendship! Excellent business. Those are my favorite kinds. Much better than 'I am just walking.' Walking is fine, but friendship has more paperwork.", [
            ["I have no paperwork, but I have good intentions.", "Good intentions are better than paperwork. I will accept them as official documentation. You may now proceed as a friend. Welcome, friend!"],
            ["Friendship paperwork sounds official.", "Very official! Each friend gets a little invisible scroll. 'Let it be known that Dreamer is a friend of the blanket and the squire.' Signed, me."],
            ["Walking is better with friends anyway.", "Better with friends! A patrol is lonely work, even when the breeze is well-behaved. I would welcome company on my rounds. Duties are lighter with two."]
        ]),
        st("Suspicious breezes? The kind that ruffle the blanket without permission. Or carry leaves in a sneaky manner. Or smell like they've been up to something.", [
            ["Sneaky leaves are a real threat.", "A real threat! Leaves can be very sneaky. One moment the blanket is smooth, the next moment there are leaves pretending they belong there. Not on my watch!"],
            ["Blanket permission is important.", "Permission matters. One does not simply ruffle a blanket. There are protocols. Ruffle requests must be submitted in triplicate. The breeze has not submitted."],
            ["How do you question a breeze?", "Question a breeze? Mostly I bark at it and see if it looks guilty. Breezes are hard to read, but a good squire trusts his nose. And his ears. And his cape."]
        ]),
        st("Important? Oh, yes. The picnic blanket represents honor, rest, and possibly crumbs. A squire must defend all three with great enthusiasm.", [
            ["Honor and crumbs are both worth defending.", "Honor and crumbs! The twin pillars of squiredom. Without honor, there is no duty. Without crumbs, there is no snack. Both sustain the noble heart."],
            ["Rest needs protection too.", "Rest needs protection! The world is full of creatures who would disturb a nap. I stand guard so that rest may happen in peace. It is sacred work."],
            ["You seem like an excellent squire.", "Excellent? You really think so? That might be the nicest thing a non-blanket has said to me all day. I shall try to be even more excellent tomorrow."]
        ])
    ],
    "Pebble": [
        st("Small things. Yes. Like the way a pebble... I mean, a rock, shines when it's wet. Or how a little flower bends toward the light. Tiny worlds everywhere.", [
            ["Tiny worlds are easy to miss if you rush.", "Easy to miss. That's why I go slow. The island has so many little kindnesses hidden in plain sight. You just have to be moving at the right speed."],
            ["Wet rocks do shine nicely.", "Nicely. A wet rock looks almost like a gem for a moment. Then the sun dries it, and it goes back to being ordinary. But I remember the shine."],
            ["Flowers reaching for light is a little hope.", "A little hope. That's exactly it. Reaching, reaching, always toward the light. I think flowers understand something simple and important."]
        ]),
        st("I've seen beetles carrying leaves bigger than themselves. I've seen water leave patterns in the sand. I've seen my own shadow move very, very slowly.", [
            ["Beetles are stronger than they look.", "Stronger than they look. All small things are. They carry what seems too big, but they do it anyway. I admire that very much."],
            ["Water patterns in sand are like drawings.", "Drawings that only last until the next wave. Temporary art. I think that's beautiful. It means the beach is always making something new."],
            ["A slow shadow is good company.", "Good company. My shadow never rushes me. It follows at exactly my speed. It's patient. I try to be patient with myself the same way."]
        ]),
        st("With me? Slowly? That would be nice. You don't have to, though. I know humans prefer walking with more... bounce. I don't bounce. I just... proceed.", [
            ["Proceeding is a valid way to travel.", "Valid way to travel. I'm glad someone thinks so. Slow travel is not less travel. It's just travel that notices more."],
            ["I can leave my bounce at home.", "Leave your bounce at home. Hehe. That's a funny image. A little bounce waiting by the door. Don't worry, bounce. We'll come back for you."],
            ["Slow company is good company.", "Slow company is good. It doesn't make you feel slow. It makes you feel like your speed is the right speed. I like that feeling."]
        ])
    ],
    "Sunny": [
        st("Amazing! The wind holds you up, the world gets tiny, and you can see where the grass meets the sand and the sand meets the water. It's like the island is showing off its edges.", [
            ["Edges are where the interesting things happen.", "Interesting things! Where grass turns to sand, where water turns to sky, where day turns to night. Edges are where two worlds shake hands."],
            ["I wish I could see from above.", "You can see from above in your own way. Climb a hill, stand on a rock, or just imagine really hard. Imagination is almost like flying, except less wind."],
            ["The island does have nice edges.", "Nice edges! Soft edges, curvy edges, splashy edges. The island is good at not being too sharp. It knows how to blend things together."]
        ]),
        st("Accurate! I could have said 'trees for resting' or 'trees for climbing' or 'trees for looking nice,' but 'trees for trees' felt most honest. Trees being trees is enough.", [
            ["Trees being trees is perfect.", "Perfect! A tree doesn't need a job to deserve to exist. It just stands there, being tree-ish, and that's a whole career right there."],
            ["Honest descriptions are the best.", "Best descriptions. No fancy words needed. Just say what you see. 'Tree is tree.' 'Rock is rock.' 'Sky is being blue today.' Perfect communication."],
            ["What are rocks for, then?", "Rocks? Rocks are for sitting on, for looking at, and for wondering how long they've been there. They're the island's quiet furniture. Very polite."]
        ]),
        st("Best thing? Hmm. The wild hog was taking a nap in a sunny spot, and his ears looked very peaceful. Also, the beach had little wave-lines like frosting. It was hard to choose.", [
            ["Peaceful hog ears sound great.", "Great! He was all curled up and his ears had little sun spots on them. I wanted to sing him a lullaby, but I didn't want to wake him up."],
            ["Wave-lines like frosting! I love that.", "Frosting! White and swirly and temporary. The ocean keeps decorating the beach and then smoothing it flat again. It's very generous with its art."],
            ["Everything sounds good from above.", "Everything is good from above! Even the things that look messy up close look like part of a pattern from far away. Distance is very forgiving."]
        ])
    ],
    "Fluffernox": [
        st("On purpose! I knew it. They grow up through the dirt and decide to be bright anyway. That's very brave. Flowers are tiny heroes.", [
            ["Tiny heroes in petal form.", "Tiny heroes in petal form! I want to write that down. On a leaf, maybe. Or in the dirt with a stick. Important wisdom needs good surfaces."],
            ["Brave and beautiful is a good combo.", "Brave and beautiful. The best combo. Like butterflies and rainbows and people who smile at strangers. That's you, by the way. The smiling part."],
            ["You're pretty brave too, Fluffernox.", "Me? Brave? I don't feel brave. I feel soft and round and full of nice thoughts. But maybe soft brave is a kind of brave too."]
        ]),
        st("Maybe just look happy? That's okay too. Pretending to be happy sometimes makes you a little bit happy. I read that somewhere. Or maybe I made it up. Either way, it works.", [
            ["Pretending can lead to real happiness.", "Real happiness from pretending. Like smiling until your face believes you. My face believes me a lot. It thinks I'm smiling even when I'm thinking."],
            ["You can make up good wisdom.", "Made-up wisdom is still wisdom if it makes someone feel better. I made up 'be round, be kind' and I think it's very true. For me, anyway."],
            ["Looking happy is a good start.", "Good start! You don't have to be happy all at once. You can start with looking happy, then feeling a little happy, then being happy enough."]
        ]),
        st("Definitely! If sadness wore yellow, it would look confused. Yellow doesn't let anything stay gloomy for long. It's the friendliest color in the rainbow.", [
            ["Yellow is the color of not-gloomy.", "Not-gloomy! I'm going to use that. 'Yellow: the official color of not-gloomy.' It should be on a banner. A tiny banner on a flower."],
            ["Rainbows need yellow to work.", "Need yellow to work! Without yellow, a rainbow would just be blue, green, red, and purple being dramatic. Yellow is the glue that holds rainbows together."],
            ["Friendliest color is a big title.", "Big title, but I think yellow can handle it. Yellow doesn't brag. It just shows up and makes everything warmer. That's true friendliness."]
        ])
    ],
    "Grumble": [
        st("Nicely arranged? I suppose. I didn't try very hard. Just a little straightening here and there. The flowers were being dramatic, all leaning different directions.", [
            ["Flowers can be dramatic.", "Dramatic flowers. Leaning this way and that, like they're posing for a painting. I told them to stand up straight. They didn't listen, but I tried."],
            ["Straightening is a useful skill.", "Useful? Maybe. Or maybe I just have strong opinions about chaos. There's a difference between wild and messy, and flowers should know it."],
            ["You have a good eye for flower order.", "Good eye? Hmph. I don't know about good. I have an eye. It sees flowers that need help. Whether that's good or just annoying is up for debate."]
        ]),
        st("Too much attention? That's the problem. Everyone wants to run around and be busy. But someone has to notice the details. Even if they pretend they don't want to.", [
            ["Details are what make a place feel alive.", "Alive. Yes. Little arrangements, little straightenings, little attentions. They add up. The island knows when someone is paying attention. Probably."],
            ["Noticing is a kind of caring.", "A kind of caring. Don't say that too loud. Someone might get the wrong idea and think I'm soft. I'm not soft. I'm... selectively firm."],
            ["Busy isn't always better.", "Busy isn't better. Running around doesn't fix flowers. Standing still and noticing does. But I only noticed because I had nothing better to do. Obviously."]
        ]),
        st("I don't care. Exactly. I am a monster of complete indifference. If these flowers look better, it's purely a side effect of my profound not-caring.", [
            ["Profound not-caring has impressive results.", "Impressive results from indifference. I should put that on a banner. 'Grumble: doesn't care, but things get done anyway.' Very catchy. Not that I'd display it."],
            ["Side effects can be beautiful.", "Beautiful side effects. Fine. I can accept that. Sometimes the things you didn't mean to do are nicer than the things you did. That's just biology. Or something."],
            ["Indifference looks cute on you.", "Cute? I am a monster. I am fearsome. I am terrifying. I am absolutely not... fine, maybe a little cute. But only from certain angles. In dim light."]
        ])
    ],
    "Vesper": [
        st("Peaceful because it isn't trying. The day tries so hard. The night just arrives, sits down, and says, 'Here I am.' No announcements. No applause needed.", [
            ["Night doesn't need applause.", "No applause needed. The moon does not perform. It simply reflects. That is its art. Quiet reflection in a darkened room of sky."],
            ["The day does try very hard.", "The day tries. Sunlight everywhere, colors everywhere, birds announcing things. It is wonderful but exhausting. Night is the deep breath after."],
            ["Arriving quietly is powerful.", "Powerful. Arrival without ceremony. Presence without demand. The night does not ask you to be anything. It just lets you be."]
        ]),
        st("Quiet is honest. It lets you hear what you've been missing. The small waves, the distant bird, your own breathing. The world has a soft voice if you listen.", [
            ["I want to hear the world's soft voice.", "The soft voice. Listen near the water. The waves are always whispering the same story, but each wave tells it a little differently."],
            ["Quiet makes my own thoughts louder.", "Your own thoughts louder. That can be frightening. But also comforting. At least in quiet, you know who is speaking. The voice is your own."],
            ["Listening is a kind of rest.", "Rest. Yes. Listening is rest because it asks nothing of you. You do not have to reply. You do not have to fix. You only receive."]
        ]),
        st("Secrets? The night doesn't hide things. It just doesn't explain them. Mystery is different from secrecy. One is warm. The other is suspicious.", [
            ["Mystery is warmer than secrecy.", "Mystery is warm. It invites you closer. Secrecy pushes you away. The night invites. It says, 'Come wonder with me.'"],
            ["I like not having everything explained.", "Not everything explained. That is the joy of it. If we understood every star, we might stop looking up. Wonder needs a little ignorance to survive."],
            ["The night keeps things gently.", "Gently. The night wraps things in shadow the way you might wrap a small thing in cloth. Not to hide it. To keep it safe from too much light."]
        ])
    ],
    "Gizmo": [
        st("Roundness! A solid hypothesis. Less friction, more momentum, fewer awkward corners. Round rocks are the athletes of the rock world.", [
            ["Athletic rocks. I love that.", "Athletic rocks! They train by sitting still for centuries, then suddenly rolling with great purpose. Their training regimen is mostly patience."],
            ["Aerodynamic rocks are superior.", "Superior aerodynamics. A flat rock would tumble chaotically. A round rock commits to its path. Commitment is underrated in geology."],
            ["Corners do slow things down.", "Corners slow everything. Trees, rocks, conversations. Corners catch on things. Roundness is nature's way of saying, 'Let's keep moving.'"]
        ]),
        st("Enthusiasm as engine. Brilliant. Perhaps the rock's internal desire to reach the bottom is the true force. Physics may not agree, but philosophy does.", [
            ["Physics and philosophy can disagree.", "They can disagree. Physics says gravity. Philosophy says will. Maybe a rolling rock is the meeting point between the two. A tiny conference of forces."],
            ["A determined rock is unstoppable.", "Unstoppable! Once a rock decides to roll, who am I to argue? I would simply step aside and salute its commitment to descent."],
            ["Maybe rocks have hidden motivation.", "Hidden motivation. Exactly. They may dream of beaches, of ponds, of being skipped across water. Rocks have inner lives. Probably. We cannot prove otherwise."]
        ]),
        st("Not enthusiastic? How can you be sure? They don't speak, but silence is not absence of enthusiasm. Maybe they are simply very focused rocks.", [
            ["Focused rocks is a good reframe.", "Good reframe. Focused rather than enthusiastic. A focused rock does not waste energy. It conserves, waits, then rolls with maximum efficiency."],
            ["Maybe they're just shy.", "Shy rocks. That explains so much. They don't roll because they're show-offs. They roll because they got startled and are trying to leave gracefully."],
            ["I'll try to see rocks as enthusiastic.", "Try it. Next time you see a rock, think, 'That rock is enthusiastic about existing.' It changes the whole relationship. Rocks become friends."]
        ])
    ],
    "Ommmm": [
        st("Appreciated. That is a good thing to be. The tree gives shade and asks for nothing. It is generous in a quiet way. Generous quiet is a rare gift.", [
            ["Quiet generosity is easy to miss.", "Easy to miss. That is why we must practice noticing. The tree does not announce its shade. It simply provides it. Noticing is our part of the exchange."],
            ["Trees deserve thanks.", "Deserve thanks. Yes. But trees do not keep score. They do not remember who thanked them and who did not. They give because giving is their nature."],
            ["I appreciate you too, Ommmm.", "Appreciated. That is kind. I am mostly moss and patience, but I am also glad to be seen. Being seen is a warmth all its own."]
        ]),
        st("You do not need words. The tree understands presence. If you sit beneath it, if you let your breath slow, that is a complete conversation.", [
            ["Presence as conversation. I like that.", "Presence as conversation. The deepest kind. Words can be beautiful, but they can also get in the way. Sometimes silence says the truest things."],
            ["I'll try slowing my breath.", "Try slowing. In through the nose, out through the mouth. Let the tree hold the sky above you. You do not need to hold anything for a moment."],
            ["Trees understand more than we think.", "More than we think. They know seasons, rain, the weight of birds. They remember in rings what we forget in days. Trees are quiet historians."]
        ]),
        st("Sit with us. There is room. The grass is patient, the tree is patient, and I am patient. We make a small circle of stillness. You are welcome in it.", [
            ["A circle of stillness sounds perfect.", "Perfect. A small circle. No one needs to perform. We simply are. The tree, the moss, the little Dreamer. All part of the same still moment."],
            ["I'll be quiet with you.", "Quiet together. That is a gift. Two quiet beings make a gentle silence. It is not empty. It is full of being."],
            ["Stillness is better shared.", "Better shared. Stillness can feel lonely if we hold it alone. Shared stillness becomes peace. The tree taught me that, I think. Or maybe the moss."]
        ])
    ],
    "Lord Roar": [
        st("Important and underappreciated. A noble pace says, 'I am here, I am important, but I am not rushing.' Rushing is for peasants and squirrels.", [
            ["Squirrels do rush a lot.", "Squirrels rush constantly. Up trees, down trees, across branches. They have no sense of ceremony. I respect their energy, but not their pacing."],
            ["I should pace more nobly.", "Pace more nobly. Good. Shoulders back, steps deliberate, expression thoughtful. Imagine you are being observed by history. History appreciates good posture."],
            ["Important but not rushing is a fine line.", "A fine line, but achievable. Move with purpose, yet without haste. The island will wait for you. It has nothing better to do, honestly."]
        ]),
        st("Independent indeed. They come, they go, they wet the sand without asking permission. It is chaos. Beautiful chaos, but chaos nonetheless.", [
            ["Chaos can be beautiful.", "Beautiful chaos. The waves do not plan, yet they create patterns. They are artists without intent. I find that both impressive and slightly annoying."],
            ["The beach doesn't mind the chaos.", "The beach does not mind. It simply accepts each wave, smooths it out, and waits for the next. Beaches are very forgiving hosts."],
            ["Someone should organize the waves.", "Organize the waves? I have tried. I issued a decree. The waves ignored it. This is why dragons prefer land. Water is too democratic."]
        ]),
        st("All day? Many duties. I inspect the sand for suspicious textures, greet passing birds, and decree which rocks look the most dignified. It is exhausting work.", [
            ["Dignified rocks are essential.", "Essential! A dignified rock anchors the beach. It gives the sand something to be proud of. Without dignified rocks, a beach is just a pile of wet sand."],
            ["Suspicious sand textures sound serious.", "Serious! Sand should be smooth, or pebbly, or pleasantly damp. Suspicious textures must be investigated at once. I take my inspections very seriously."],
            ["Decreeing things seems like fun.", "Fun and also a responsibility. When I decree something, the island is obligated to pretend to listen. It is a noble tradition between monster and nature."]
        ])
    ],
    "Snug": [
        st("Valid? Good. Rocks don't judge. They just sit there and listen to the wind. Being near one feels like being near something very patient.", [
            ["Rocks are excellent listeners.", "Excellent listeners. They don't interrupt. They don't ask hard questions. They just let you be nearby, existing at your own speed."],
            ["Patience is a rock's main feature.", "Main feature. Patience, strength, quietness. If rocks had a list of skills, patience would be at the top. Followed by 'good at sitting.'"],
            ["Quiet moments should be respected.", "Respected. Yes. Not everything needs to become loud or public. Some moments are just for the rock and the monster behind it. That's enough."]
        ]),
        st("I don't have to come out? That's nice. Sometimes people want you to come out even when you aren't ready. It's okay to stay where it's safe.", [
            ["Stay where it's safe as long as you need.", "As long as I need. That's a generous amount of time. I might need a while. Or I might come out sooner. Either way, it's okay because you said so."],
            ["Coming out can happen slowly.", "Slowly. One eye, then a little more, then maybe a wave. Coming out doesn't have to be a grand event. It can be a small movement."],
            ["Safe places are important.", "Important. Everyone needs a place where the world can't see them too clearly. A rock, a bush, a quiet thought. Safe places hold us together."]
        ]),
        st("Thoughtful hiding. I like that. It's not scared hiding. It's just... considering things from a comfortable distance. With a rock as a friend.", [
            ["Considering from a distance is wise.", "Wise. I don't always want to be right in the middle. Sometimes I want to watch from the edge and understand before I join. The rock helps with that."],
            ["Rocks make good friends.", "Good friends. They don't leave. They don't get bored. They're just there, solid and steady. It's nice to have a friend who won't suddenly move away."],
            ["Comfortable distance is underrated.", "Underrated. Distance can feel kind. It gives you room to breathe and be yourself. I like people who understand that without me having to explain."]
        ])
    ],
    "Gigglegrow": [
        st("Yay! A party! With two people it's a tiny party, but tiny parties are the best kind because everyone gets to be important. You're the guest of honor.", [
            ["Guest of honor! That's a big job.", "Big job, but easy. You just have to smile, accept tiny compliments, and occasionally say 'hooray.' I believe in your guest-of-honor abilities."],
            ["Tiny parties are underrated.", "Underrated! Big parties are loud and confusing. Tiny parties have room for every feeling. You can be silly, quiet, bouncy, or all three at once."],
            ["Do I get a party hat?", "A party hat? I don't have one, but I can make you a flower crown. Or a leaf hat. Or a very enthusiastic smile that acts like a hat. Smile hats are in fashion."]
        ]),
        st("Cheering counts! Cheering is the soundtrack of bouncing. Without cheers, bouncing is just movement. With cheers, bouncing becomes a celebration.", [
            ["I'll be your cheering section.", "Cheering section of one! That's all I need. One loyal cheerer can make a thousand bounces feel like a parade. You're hired, starting now. Hooray!"],
            ["Every bounce deserves a cheer.", "Every bounce deserves a cheer. And every hop, and every skip, and every wiggle. If movement had feelings, it would want to be celebrated."],
            ["Celebration sounds better than movement.", "Better than movement! Celebration has confetti in the heart, even if there isn't real confetti. Today, my heart confetti is all for you."]
        ]),
        st("It's a party because now there are two smiling faces instead of one, and two is a social unit. Scientists agree. Probably. I didn't ask any, but it feels true.", [
            ["Two smiling faces is a solid unit.", "Solid unit. Two smiles, four eyes, a whole lot of good feelings. We could form a club. The Two-Smile Bouncing Society. First meeting: right now."],
            ["Science should study bouncing parties.", "Science should! They could measure bounce height, cheer volume, and party intensity. The results would probably show that fun is good for you."],
            ["It does feel true, so it counts.", "It counts! Truth can be felt as well as proven. I feel that bouncing near you is a party, and feelings are very reliable when they're this bouncy."]
        ])
    ]
};

# Neighbor Story Arcs — Hermes Draft (Decoration-Gated, Passive-Wish Version)

Planning doc only — not loaded by the game. Charles writes the scripts; Claude builds them into in-game cutscenes triggered at friendship 100 / 200 / 300.

**New progression rules in this draft:**
- Friendship stops advancing at **~79%** until a condition is met.
- **100% cutscene (first arc):** requires the neighbor to have a basic **shack** built.
- **200% cutscene (second arc):** requires the neighbor's house to be **upgraded** once.
- **300% cutscene (final arc):** requires a **personality-specific decoration** placed on the neighbor's property.
- The decoration recipe unlocks during the 200% cutscene, after the neighbor makes a passing mention of something they wish for.
- The 300% cutscene takes place at or around the placed decoration. The neighbor is surprised and touched that Dreamer noticed.
- **Only the final cutscene requires a special decoration sprite.** The 100% and 200% cutscenes use existing world sprites.

Format notes:
- Write dialogue as `NAME: line` — Dreamer's lines as `DREAMER: line`.
- Stage directions in `[brackets]`.
- `[UNLOCK: Decoration Name]` marks recipe unlocks triggered by a passive wish.
- `[REQUIRES: Decoration Name]` marks the final-scene gate.

---

## Mechanic Summary — Housing & Friendship Gates

| Cutscene | Friendship Benchmark | Requirement |
|----------|---------------------|-------------|
| Arc 1 (100) | 80 → unlock | Neighbor must have a shack |
| Arc 2 (200) | 160 → unlock | Neighbor house must be upgraded once |
| Arc 3 (300) | 240 → unlock | Personality decoration must be placed on property |

**Progression stops** if the requirement isn't met. The neighbor gives a gentle, indirect reminder about what's missing instead of advancing the friendship cutscene.

---

## Piko (kawaii Robot)

**Decoration:** Flower Arch  
*Kawaii characters want something bright and welcoming. For Piko, a small garden arch covered in clover and tiny paper hearts. (Species reskin: robot = metal frame with LED heart cutouts.)*

### 100 — The Clover Crown

[Dreamer steps out of their shack. Piko is waiting beside the door, holding a tiny circlet of clover above her head.]

Piko: "Dreamer! I have a little crown made of clover! I picked the roundest ones, the ones that butterflies always miss."
DREAMER: "It's adorable."
Piko: "Flowers should have crowns. Or robots who feel like flowers. You know what I mean."
DREAMER: "I think I do."
Piko: "Good. Then we can make a new one. With more sparkle."
[She sets the crown on Dreamer's head and takes a step back.]

### 200 — Passing the Arbor

[Dreamer visits Piko's upgraded house. Piko is standing in the doorway, gazing at the empty path that leads to her door.]

Piko: "Dreamer... I walked past a garden this morning. It had the cutest little arch. Flowers all over it. Before I even knocked, I knew someone happy lived there."
DREAMER: "You want people to know happy lives here too?"
Piko: "Oh! I didn't mean... I mean, it would be nice. An arch that says 'butterflies and friends welcome.' But I don't know how to build shapes like that."
DREAMER: "Maybe I could figure it out."
Piko: "Really? A hug-shaped arch? I would stand under it every day."
[UNLOCK: Flower Arch recipe]

### 300 — Heartbeep Under the Arch

[REQUIRES: Flower Arch placed on Piko's property. Dreamer walks up to Piko's path. The Flower Arch frames her small garden. She stands beneath it, glowing.]

Piko: "Dreamer! You actually did it! The arch is real! It says 'happy place' before anyone even knocks!"
DREAMER: "It was too good an idea to forget."
Piko: "You remembered my wish. That's the sparkliest thing anyone's ever done."
[She holds out a small pink heart-shaped pebble.]
Piko: "The beach left this for me. I think it wanted me to give it to you. You're my heartbeep, Dreamer. Forever. Beep."
[She taps Dreamer's chest once, gently.]

---

## Rivet (tsundere Robot)

**Decoration:** Orderly Leaf Pile  
*Tsundere characters want something that looks like effort but isn't sentimental. For Rivet, a perfectly arranged pyramid of leaves — decorative, but she insists it's "just organizing." (Species reskin: robot = metal stakes holding the pile in a precise geometry.)*

### 100 — The Leaf Pile

[Dreamer walks along a grassy path. Rivet stands beside a tidy pyramid of leaves, arms crossed.]

Rivet: "Don't look at me like that. I didn't make this for you. I was organizing leaves by size and they formed a jumpable shape."
DREAMER: "A jumpable shape. Right next to my shack."
Rivet: "Coincidence. But since you're here, you might as well jump in it. Once. Efficiently."
DREAMER: "Only once?"
Rivet: "Fine. Twice. Now jump, before the wind ruins my layout."
[She turns away but watches out of the corner of her optic.]

### 200 — Yard Complaint

[Dreamer finds Rivet in her upgraded yard, frowning at a messy cluster of leaves near her path.]

Rivet: "Look at this disaster. Leaves everywhere. Crabs walking through them like they own the place. If someone doesn't impose order, this whole yard is going to collapse into chaos."
DREAMER: "It does look untidy."
Rivet: "Untidy? It's an insult to geometry. If I had the materials, I'd build a frame. Keep the leaves where they belong. Make it look like I meant it to be there."
DREAMER: "A frame for leaves?"
Rivet: "Not because it's pretty. Because it's efficient. But fine, it could also be pretty. If someone wanted to build such a thing, I wouldn't stop them."
[UNLOCK: Orderly Leaf Pile recipe]

### 300 — Approved Disorder

[REQUIRES: Orderly Leaf Pile placed on Rivet's property. Dreamer arrives to find Rivet standing beside the neat pyramid. One leaf has fallen out of place and she is staring at it.]

Rivet: "You actually built it. I didn't ask you to. I didn't."
DREAMER: "You mentioned wanting order."
Rivet: "I mention a lot of things. Most people don't remember."
[She sighs and leaves the leaf where it is.]
Rivet: "One leaf out of alignment. The whole thing should be ruined. But it's not. Because you're standing here, and you're slightly crooked too, and I don't hate that either."
DREAMER: "Is that a compliment?"
Rivet: "It's an observation. Take it. Here — this gear is from my old arm panel. Don't lose it."
[She presses the gear into Dreamer's palm.]
Rivet: "And don't make me regret tolerating crooked things."

---

## Shade-7 (goth Robot)

**Decoration:** Moonlit Lantern  
*Goth characters want mood lighting. Shade-7 wants a tall lantern near her house that glows violet after sunset. (Species reskin: robot = angular iron frame with a dim LED orb.)*

### 100 — Poem for the Waves

[Shade-7 stands at the water's edge on a dark flat rock, facing the horizon.]

Shade-7: "Dreamer. I wrote something. It's not for you. It's for the water. 'The sea forgets the shore each night, and still returns by morning. What a fool. What a faithful fool.'"
DREAMER: "Beautiful."
Shade-7: "It's accurate. Do you have a favorite line?"
DREAMER: "'What a faithful fool.' It sounds like hope dressed in gloom."
Shade-7: "Hope dressed in gloom. Yes. That is my entire aesthetic."

### 200 — The Overhead Offense

[Inside Shade-7's upgraded house. She is sitting in the corner, her optic dimmed, wincing at a single overhead light.]

Shade-7: "The lighting in this house is aggressive. Bright, honest, overhead. It exposes everything. A person needs a dimmer light. Something that apologizes for illuminating."
DREAMER: "Like a mood lamp?"
Shade-7: "Or a tall lantern. Dark metal. A violet glow. The kind of light that lets you read sad poetry without feeling judged by the fixture."
DREAMER: "That sounds nice."
Shade-7: "It would be. Not that I've thought about it much. I just noticed the ceiling light is morally inferior."
[UNLOCK: Moonlit Lantern recipe]

### 300 — The Night Remembers

[REQUIRES: Moonlit Lantern placed on Shade-7's property. Night. Shade-7 stands beside the lantern, its violet glow reflecting off her matte plating.]

Shade-7: "You came. And you brought a lantern. I didn't ask for this."
DREAMER: "You mentioned the ceiling light was morally inferior."
Shade-7: "I say many things. Most of them are complaints. You chose the right complaint to solve."
[She holds out a smooth black stone.]
Shade-7: "A 'when-things-feel-too-bright' stone. For your pocket. And if anyone asks, say it's from the night. Or say it's from me. Actually — say it's from me. I want the dark, dramatic credit."
DREAMER: "Shade-7 gave me the night."
Shade-7: "That's the most romantic thing anyone's said. I'm going to pretend I hate it."

---

## Cypher (nerd Robot)

**Decoration:** Weather Station  
*Nerd characters want an observational object. Cypher wants a small weather station with a wind vane, cloud gauge, and rain collector. (Species reskin: robot = brass gears and glass lenses.)*

### 100 — The Named Cloud

[Cypher is on a small hill, pointing up at a cloud.]

Cypher: "Dreamer! I cataloged a cloud and named it after you. It's the one shaped like a slightly confused mushroom."
DREAMER: "I'm honored?"
Cypher: "You should be. I only name important things after people I like. My charging station is named Gerald. You're Dreamer-Cloud, category: cumulus-adjacent."
DREAMER: "I'll try to live up to my cloud."
Cypher: "Clouds are low-pressure systems. That's a joke. Did you get it?"

### 200 — Window Limitations

[Inside Cypher's upgraded house. Papers with cloud sketches cover every surface. He is trying to balance a small wind vane on his window.]

Cypher: "My observations are limited by window placement. I can't tell if the breeze here is the same as the breeze near your shack. There's no instrumentation."
DREAMER: "You'd need something outside to measure it."
Cypher: "Exactly. A small weather station would settle the question. Wind vane, rain gauge, perhaps a cloud-quality sensor. Brass, precise, slightly overcomplicated."
DREAMER: "That sounds like something worth building."
Cypher: "It would be. Then I'd finally have data instead of guesses. Though guesses are also fun."
[UNLOCK: Weather Station recipe]

### 300 — One Hundred Percent Sky

[REQUIRES: Weather Station placed on Cypher's property. Cypher stands beside it, adjusting a small dial. The vane spins lazily.]

Cypher: "Dreamer! You built it. I mentioned this in passing and you built an entire meteorological instrument."
DREAMER: "You seemed excited about the data."
Cypher: "I am always excited about data. But you are the variable that makes joy statistically significant."
[He pulls out a hand-drawn cloud map.]
Cypher: "I made this for you. Every cloud from every day we talked. The puffy days were my favorites because of the conversations underneath them."
DREAMER: "I'll keep it forever."
Cypher: "Forever may need seasonal appendices. I'll keep writing them. For science. And for you."

---

## Om-Bit (monk Robot)

**Decoration:** Sitting Stone  
*Monk characters want a place of stillness. Om-Bit wants a flat meditation stone for his garden. (Species reskin: robot = a smooth metal disc set in a circle of gravel.)*

### 100 — One Minute of Quiet

[Om-Bit sits cross-legged on a flat stone in the grass. A smaller stone waits nearby for Dreamer.]

Om-Bit: "Dreamer. Sit with me. One minute. We will not solve anything. We will simply be here."
[Dreamer sits. They breathe together.]
Om-Bit: "Did anything change?"
DREAMER: "I think I'm a little calmer."
Om-Bit: "That is enough."

### 200 — The Challenge of Rocks

[Inside Om-Bit's upgraded house. He is trying to sit on a small indoor stool, looking uncomfortable.]

Om-Bit: "At the monastery, the rocks were flat. I did not realize that was not a rule for rocks until I came here. Everything tilts. Everything wobbles. Stillness is difficult."
DREAMER: "A flat stone outside would help."
Om-Bit: "It would. A stone that agrees to hold you without shifting. I have not found one yet."
DREAMER: "I'll keep an eye out."
Om-Bit: "Thank you. The island teaches patience by making you wait for the right rock."
[UNLOCK: Sitting Stone recipe]

### 300 — The Balanced Gift

[REQUIRES: Sitting Stone placed on Om-Bit's property. Om-Bit sits on the stone in the morning light, hands folded.]

Om-Bit: "Dreamer. The stone does not hurry. The light does not hurry. I am also trying not to hurry."
DREAMER: "You look balanced."
Om-Bit: "I am. Because of the stone. Because you remembered my wish for stillness."
[He holds out a small stack of two smooth stones.]
Om-Bit: "A portable quiet place. When the island is too busy, place it before you and sit for one minute."
DREAMER: "I'll keep it close."
Om-Bit: "That is all I ask. Close. Steady. Quiet."

---

## Sir Cogs-a-Lot (medieval Robot)

**Decoration:** Honor Altar  
*Medieval characters want an altar. Sir Cogs wants a small outdoor shrine to nobility and picnics. (Species reskin: robot = riveted metal altar with a tiny plume and a scepter holder.)*

### 100 — Knighting Ceremony

[Sir Cogs-a-Lot stands on a small sandy rise, holding a twig like a sword. A picnic blanket lies nearby.]

Sir Cogs-a-Lot: "Fair traveler, I dub thee Protector of Picnic Blankets and Keeper of Reasonable Volume! Rise, Sir Dreamer, and accept this twig as your ceremonial scepter."
DREAMER: "I accept my twig."
Sir Cogs-a-Lot: "Good. Your first duty is to join me for a picnic."

### 200 — Oaths Need Stages

[Inside Sir Cogs' upgraded house. He is pacing, cape trailing.]

Sir Cogs-a-Lot: "A knight needs a place to swear oaths. Indoors is fine for naps, but true honor requires an outdoor stage. A small rise, a stone slab, perhaps a holder for a scepter."
DREAMER: "You'd use it for ceremonies?"
Sir Cogs-a-Lot: "Naturally! Blessing quests, addressing the realm, perhaps a sandwich afterward. Every noble court has such a place. Mine currently does not, which is a gap in my infrastructure."
DREAMER: "Infrastructure is important."
Sir Cogs-a-Lot: "It is! If only there were a way to build a small altar of honor near my door. With a plume on top. Every altar needs a plume."
[UNLOCK: Honor Altar recipe]

### 300 — Sworn Sibling

[REQUIRES: Honor Altar placed on Sir Cogs' property. Dreamer approaches the small altar. Sir Cogs stands on it proudly, holding up a felt banner.]

Sir Cogs-a-Lot: "Dreamer! The altar is magnificent. You built a whole infrastructure of honor based on my passing complaint!"
DREAMER: "It sounded important to you."
Sir Cogs-a-Lot: "It was. And you noticed. That is the highest form of knightly attention."
[He drapes a small banner over Dreamer's shoulder.]
Sir Cogs-a-Lot: "I hereby declare us sworn siblings. Not by blood, but by shared quests and shared refusal to let crabs ruin a good afternoon."
DREAMER: "I swear it."
Sir Cogs-a-Lot: "Then the realm is safe. And so is my heart. Onward, sibling!"

---

## Tinker (shy Robot)

**Decoration:** Bird Feeder  
*Shy characters want something that invites connection indirectly. Tinker wants a bird feeder so birds come to him instead of him going to them. (Species reskin: robot = a small metal house with a perch and a tiny roof antenna.)*

### 100 — The Bird Name

[Tinker is half-hidden behind a bush, watching a small brown bird.]

Tinker: "Oh. Hi, Dreamer. I've been watching a bird. The one that sits on the bush near your shack. I thought we could name it together."
DREAMER: "How about 'Bushwhistle'?"
Tinker: "That sounds like a real bird name. A proud, tiny name."
DREAMER: "It's our bird now."
Tinker: "Our bird. That's a very nice thing to share."

### 200 — Birds Are Busy

[Inside Tinker's upgraded house. He is peeking out the window at an empty hook by his door.]

Tinker: "Dreamer... I like birds, but they're always so far away. In the bushes, on the beach, up in trees. I don't know how to get them to come closer without... without being noticed first."
DREAMER: "You want them to come to you."
Tinker: "That would be nice. A little house full of seeds. Something gentle-looking. Then the birds could decide to visit. I wouldn't have to wave."
DREAMER: "A feeder."
Tinker: "Yes. Just a feeder. Not a big thing. Birds like small gentle things."
[UNLOCK: Bird Feeder recipe]

### 300 — Bushwhistle's Cousin

[REQUIRES: Bird Feeder placed on Tinker's property. Tinker stands a few feet from the feeder, watching a small bird eat. He doesn't move.]

Tinker: "Dreamer. Look. A bird came. It didn't ask permission. It just landed and ate. That's amazing."
DREAMER: "You made it feel welcome."
Tinker: "I didn't do much. I just wanted it. You built the whole feeder because I wanted it."
[He holds out a brass gear in trembling hands.]
Tinker: "This is from my favorite part. The part that waves. You make me want to wave. So it belongs with you."
DREAMER: "I'll take care of it."
Tinker: "And maybe... maybe we could be best friends?"
DREAMER: "We already are."
Tinker: "Oh. Okay. Best friends. Squeak."

---

## Zap-Zap (cheerful Robot)

**Decoration:** Sunrise Window  
*Cheerful characters want light. Zap-Zap wants an ornate window frame installed on her house so she can wake up with the sunrise. (Species reskin: robot = metal frame with zigzag antenna trim and heart-shaped panes.)*

### 100 — Sunrise Pull

[Dawn. Zap-Zap tugs on Dreamer's sleeve, bouncing in place. The eastern sky is bright pink.]

Zap-Zap: "Dreamer! Wake up! The sun is doing its thing and you're missing it!"
DREAMER: "I'm awake."
Zap-Zap: "The sunrise is basically a party the sky is throwing! We are invited!"
DREAMER: "Lead the way."
[She grabs Dreamer's hand and pulls them toward the water.]

### 200 — Tiny Window Problems

[Inside Zap-Zap's upgraded house. She is standing on a stool, trying to widen her tiny window with her hands.]

Zap-Zap: "Dreamer! My house is so cozy, but my window is tiny. The sunrise barely fits through it. I want a window that says GOOD MORNING in big capital letters!"
DREAMER: "A bigger, brighter window?"
Zap-Zap: "Yes! With zigzags and sparkles and a big wide pane so the morning can just pour right in! But windows are hard. I don't know how to make glass bigger."
DREAMER: "Maybe I could figure it out."
Zap-Zap: "Really? Then I could wake up every morning and throw my arms at the sun!"
[UNLOCK: Sunrise Window recipe]

### 300 — The Jar of Sparkles

[REQUIRES: Sunrise Window placed on Zap-Zap's house. Morning light pours through the zigzag frame. Zap-Zap holds a small jar of glittering sand.]

Zap-Zap: "Dreamer! The window works! The sunrise came in and said hello to everything! Even my charging station looked happy!"
DREAMER: "You look happy too."
Zap-Zap: "I am! Because you took my tiny-window problem and made it huge and sunny!"
[She presses the jar of beach sparkles into Dreamer's hands.]
Zap-Zap: "These are from every morning you visited. Now you can have a little sun whenever you want."
DREAMER: "I'll keep it where I can see it every day."
Zap-Zap: "Good! Because you are my favorite person to be sparkly with. Zzzt! Forever!"

---

## Boo-Boo (kawaii Ghost)

**Decoration:** Soft Cloud Bed  
*Kawaii characters want something soft and adorable. Boo-Boo wants a cloud-shaped outdoor resting spot. (Species reskin: ghost = translucent fluff with a faint pink bow.)*

### 100 — Practice Boo

[Boo-Boo floats behind a small rock, peeking over the top.]

Boo-Boo: "Boo! Did that scare you? Be honest."
DREAMER: "It startled my pinky toe."
Boo-Boo: "Yay! A pinky-toe scare is almost a real scare!"

### 200 — Cloud Beds Are Cute

[Inside Boo-Boo's upgraded house. She tries to lie on a hard bench and sinks right through it.]

Boo-Boo: "Dreamer... I saw a cloud bed in a dream once. Big and puffy and round, with a little pink bow. It looked so cozy, even though I can't really lie down on things."
DREAMER: "It sounds perfect for you."
Boo-Boo: "It does, doesn't it? I wish I had one. Then I could float above it and look cozy, and butterflies could visit my cloud."
DREAMER: "Maybe we could make one."
Boo-Boo: "Really? A cloud bed just for me?"
[UNLOCK: Soft Cloud Bed recipe]

### 300 — Unlimited Ghost Hugs

[REQUIRES: Soft Cloud Bed placed on Boo-Boo's property. Boo-Boo floats above the fluffy cloud bed, glowing softly.]

Boo-Boo: "Dreamer! My cloud bed is real! I can't lie on it but I can float really nicely over it. That counts!"
DREAMER: "It counts completely."
Boo-Boo: "You remembered my dream. That's the friendliest thing."
[She drifts close to Dreamer's shoulders.]
Boo-Boo: "I want to try something. A ghost hug. You won't feel arms, just a little cool breeze. Ooooo... hug. Did you feel it?"
DREAMER: "I felt it. Like a friendly shiver."
Boo-Boo: "Good. You are my favorite solid friend. Unlimited ghost hugs, open always!"

---

## Wisp (tsundere Ghost)

**Decoration:** Lantern Post  
*Tsundere characters want something practical that secretly comforts. Wisp wants a lantern post near her house so she can pretend she's only there for the light. (Species reskin: ghost = a cool-colored lantern that flickers faintly.)*

### 100 — Too Bright

[Night. Wisp hovers near Dreamer's lantern, squinting.]

Wisp: "Your lantern is too bright. It hurts my eyes. Not that I was looking on purpose."
DREAMER: "I can dim it."
Wisp: "No. Don't. It's actually nice. In an annoying way."

### 200 — Self-Sufficient Light

[Inside Wisp's upgraded house. She floats near a dark window, arms crossed.]

Wisp: "I should have my own light. Something dim and practical. A post with a lantern, so I don't have to hover near other people's lamps like I'm waiting for something."
DREAMER: "A lantern post?"
Wisp: "Maybe. Cool, steady, not cheerful. For safety. Not for feelings. I don't need feelings from a lamp."
DREAMER: "Of course not."
Wisp: "But if someone built one near my house, I could test it. For safety purposes."
[UNLOCK: Lantern Post recipe]

### 300 — The Ghost Tether

[REQUIRES: Lantern Post placed on Wisp's property. Wisp hovers beside the lantern, its glow reflecting faintly off her gauzy form.]

Wisp: "It works. The light is acceptable. Not warm. Not cold. Just present."
DREAMER: "Like someone I know."
Wisp: "Don't compare me to a lamp. But also... don't be wrong."
[She pulls a strip of gauzy sleeve free.]
Wisp: "Here. Take this. So I can find you if I drift too far. It's practical. Not romantic."
DREAMER: "Your secret ribbon is safe."
Wisp: "It's not a secret. It's just not advertised. Thank you, Dreamer."

---

## Morwen (goth Ghost)

**Decoration:** Candle Chandelier  
*Goth characters want dramatic indoor lighting. Morwen wants a chandelier of candles for her house. (Species reskin: ghost = cool blue flames, silver chains.)*

### 100 — Moon Song

[Evening. Morwen floats on a low rock by the water.]

Morwen: "Dreamer, the dusk has been generous. I composed a verse: 'The moon remembered your name, and the tide agreed.'"
DREAMER: "Haunting. In a warm way."
Morwen: "Warm haunting is my specialty."

### 200 — The Wrong Light

[Inside Morwen's upgraded house. She stands beneath a single bare ceiling light, looking pained.]

Morwen: "This light is wrong. It's honest and overhead and without mystery. I keep imagining something that drips. Silver chains, many small flames, reflections everywhere."
DREAMER: "A chandelier?"
Morwen: "The word is too ordinary. I mean a light that makes everything feel like a poem. Even folding laundry. Not that I fold laundry."
DREAMER: "But if you did, you'd want poetic lighting."
Morwen: "Exactly. I would build it myself, but chains and flame are difficult for the translucent."
[UNLOCK: Candle Chandelier recipe]

### 300 — Remembered by the Night

[REQUIRES: Candle Chandelier placed in Morwen's house. She stands beneath it, moon-silver hair catching the candlelight.]

Morwen: "The light is perfect. Everything looks like it might weep beautifully."
DREAMER: "Including you?"
Morwen: "Especially me. But I am smiling, Dreamer. You cannot see it well in this light, but I am."
[She pulls a strand of moon-silver hair free.]
Morwen: "I want you to have this. It will remind you that the night knows your name."
DREAMER: "I'll keep it close."
Morwen: "Then I am remembered. That is enough."

---

## Spectra (nerd Ghost)

**Decoration:** Star Chart Rug  
*Nerd characters want a knowledge object. Spectra wants a rug printed with a star chart for his floor. (Species reskin: ghost = faint, glow-in-the-dark thread.)*

### 100 — Shadow Science

[Spectra floats beside Dreamer's shadow on the grass, measuring it with his spectacles.]

Spectra: "Dreamer! I've observed that your shadow behaves differently depending on the time of day. Yours is particularly expressive."
DREAMER: "My shadow is expressive?"
Spectra: "It waves when you wave. I suspect it tries to dance when you're not looking."

### 200 — The Bare Floor Problem

[Inside Spectra's upgraded house. He floats above a blank floor, pointing down.]

Spectra: "I need a reference surface. The ceiling is fine for clouds, but I study stars at night. A rug with a star chart would let me consult the sky without going outside."
DREAMER: "A rug you can read?"
Spectra: "Exactly. Accurate constellations, durable weave, perhaps glow-in-the-dark thread so I can read it at night without a lamp. Which is technically not stargazing, but is still useful."
DREAMER: "That sounds like something worth making."
Spectra: "It would be. My floor is currently a wasted educational opportunity."
[UNLOCK: Star Chart Rug recipe]

### 300 — Data Supports Friendship

[REQUIRES: Star Chart Rug placed in Spectra's house. He floats above it, spectacles reflecting the faint stars.]

Spectra: "The rug is operational. I have identified seventeen constellations so far, including one that looks suspiciously like your silhouette."
DREAMER: "A Dreamer constellation?"
Spectra: "Possibly. I made you a notebook — observations about you. 'Dreamer smiles at clouds.' 'Dreamer does not flinch at ghosts.' The data strongly supports friendship."
DREAMER: "I'll treasure the data."
Spectra: "Good. I'll keep collecting. You are worth observing."

---

## Hush (monk Ghost)

**Decoration:** Zen Garden  
*Monk characters want a place of contemplation. Hush wants a small zen garden with raked sand and a single stone. (Species reskin: ghost = pale sand that shimmers faintly, translucent rake.)*

### 100 — One Breath Together

[Hush floats beside a smooth boulder, hands pressed together.]

Hush: "Dreamer. Sit with me. One breath. Not to change anything. Just to arrive here."
[They breathe together.]
Hush: "Peace is where we are when we stop running toward it."

### 200 — A Corner for Sand

[Inside Hush's upgraded house. He floats in front of a plain corner, gesturing at the empty space.]

Hush: "I need a small corner where nothing happens. Sand, one stone, a rake. A place to practice patience with my own hands."
DREAMER: "A zen garden?"
Hush: "Small enough to fit indoors. Large enough to hold a whole afternoon. The sand should be pale. The stone should be dark. The contrast helps me think."
DREAMER: "I'll see what I can gather."
Hush: "Do not hurry. Gardens arrive when they are ready."
[UNLOCK: Zen Garden recipe]

### 300 — The Heard Stone

[REQUIRES: Zen Garden placed in Hush's house. Hush floats beside it, one finger tracing a pattern in the sand.]

Hush: "The stone sits well. The sand holds its lines. This garden is enough."
DREAMER: "It suits you."
Hush: "It does. And so do you. You noticed my wish for a quiet corner and made it real."
[He holds out a smooth grey stone.]
Hush: "This stone has heard many waves. When you hold it, remember that you are also heard. Even when no one replies."
DREAMER: "Thank you, Hush."
Hush: "Thank you for being someone worth hearing."

---

## Sir Haunts-a-Lot (medieval Ghost)

**Decoration:** Coat of Arms Banner  
*Medieval characters want heraldry. Sir Haunts wants a banner bearing his personal coat of arms. (Species reskin: ghost = translucent tapestry with faintly glowing thread.)*

### 100 — The Noble Kitchen Ghost

[Sir Haunts-a-Lot floats near a picnic blanket, gesturing grandly.]

Sir Haunts-a-Lot: "Good morrow! I shall tell thee a tale of a kitchen ghost who hummed for three hundred years without thanks. A true knight of the ladle."

### 200 — The Empty Wall

[Inside Sir Haunts' upgraded house. He floats back and forth, examining an empty wall.]

Sir Haunts-a-Lot: "Every noble house requires a coat of arms. Mine is currently invisible, which is a tragedy of heraldry. I imagine a banner with a ghostly steed, a ladle, and perhaps a small crab."
DREAMER: "A ladle and a crab?"
Sir Haunts-a-Lot: "Nobility is complex. I cannot weave it myself. My fingers pass through thread, which is inconvenient."
DREAMER: "Maybe someone with solid fingers could help."
Sir Haunts-a-Lot: "Perhaps. If such a person existed and also admired ladle-based heraldry."
[UNLOCK: Coat of Arms Banner recipe]

### 300 — Sworn Sibling

[REQUIRES: Coat of Arms Banner placed in Sir Haunts' house. He floats before it, plume high.]

Sir Haunts-a-Lot: "The banner is magnificent. The crab looks dignified. The ladle looks noble. I look pleased."
DREAMER: "You should."
Sir Haunts-a-Lot: "I hereby declare us sworn siblings. Not by blood, but by shared quests and shared refusal to let crabs ruin a good afternoon."
[He drapes a small matching banner over Dreamer's shoulder.]
DREAMER: "I swear it."
Sir Haunts-a-Lot: "Then the realm is safe. And so is my heart. Onward, sibling!"

---

## Flutter (shy Ghost)

**Decoration:** Window Nook Curtains  
*Shy characters want a place to hide and observe. Flutter wants soft curtains around a window nook so she can peek out. (Species reskin: ghost = sheer, gauzy fabric that billows gently.)*

### 100 — From Behind the Bush

[Flutter is half-hidden behind a bush, only her bow visible.]

Flutter: "Dreamer... I have a compliment. You make the island feel less see-through."
DREAMER: "That's the nicest thing anyone's said all week."
Flutter: "I practiced it. In a puddle. Ghosts don't have mirrors."

### 200 — A Window to Hide Behind

[Inside Flutter's upgraded house. She floats near a bare window, clutching her sleeve.]

Flutter: "Dreamer... I love windows, but they feel so open. I keep imagining a window with soft curtains around it. A little nook where I could peek out and still be mostly hidden."
DREAMER: "Curtains would make that feel safe."
Flutter: "Yes. Sheer, gentle, long enough to hide behind. Not because I'm scared. Just because it feels softer that way."
DREAMER: "I'll see if I can make some."
Flutter: "Really? Then I could practice waving from behind them."
[UNLOCK: Window Nook Curtains recipe]

### 300 — The Shell Lantern

[REQUIRES: Window Nook Curtains placed in Flutter's house. Flutter floats between the sheer curtains, half-hidden.]

Flutter: "Dreamer... the curtains are perfect. I can see out and nobody can see all of me. That's exactly what I wanted."
DREAMER: "I'm glad."
Flutter: "I made you something. A tiny lantern made of shells."
[She sets it in Dreamer's hands and hovers back.]
Flutter: "So when I drift away, I can look for the light and know where you are. Then I can come back."
DREAMER: "I'll leave it glowing every night."
Flutter: "Really? Then home is wherever you are."

---

## Giggles (cheerful Ghost)

**Decoration:** Giggle Wind Chime  
*Cheerful characters want sound. Giggles wants a wind chime that laughs in the breeze. (Species reskin: ghost = translucent chimes that glow faintly when they move.)*

### 100 — The Giggle Game

[Giggles floats in a circle around Dreamer, clapping.]

Giggles: "Dreamer! Play the giggle game! I say a word, you say the first funny thing!"
DREAMER: "Ready."
Giggles: "Coconut!"
DREAMER: "A crab wearing a tiny hat."
Giggles: "Hee hee hee! Crab hat!"

### 200 — Too Quiet Inside

[Inside Giggles' upgraded house. She floats near a closed window, listening to nothing.]

Giggles: "Dreamer... when you're not here, the house is too quiet. I wish something laughed even when I'm alone. Like a wind chime, but giggly."
DREAMER: "A giggling wind chime?"
Giggles: "Yes! When the breeze blows, it makes giggly sounds. Then windy days would feel like parties!"
DREAMER: "I bet I could make one."
Giggles: "Yay! Make it sparkly and giggly and not too serious."
[UNLOCK: Giggle Wind Chime recipe]

### 300 — The Giggle Bottle

[REQUIRES: Giggle Wind Chime placed on Giggles' property. It tinkles softly in the breeze. Giggles spins beneath it, laughing.]

Giggles: "Dreamer! It giggles! The wind made it giggle! Everything is giggling now!"
DREAMER: "It's perfect for you."
Giggles: "You made my quiet wish into a loud happy thing!"
[She puts a seashell to Dreamer's ear.]
Giggles: "This plays my laugh. So if you're ever sad, you can remember someone here thinks you're wonderful. Because you are."
DREAMER: "I'll keep it close."
Giggles: "Good! Unlimited giggles for Dreamer!"

---

## Mochi (kawaii Rabbit)

**Decoration:** Clover Garden Bed  
*Kawaii animal characters want something cute and growing. Mochi wants a raised garden bed full of clover. (Species reskin: animal = small wicker-sided bed with a little fence.)*

### 100 — The Clover Patch

[Mochi hops at the edge of a dense clover patch, ears bouncing.]

Mochi: "Hop-hop, Dreamer! I found the clover-iest patch ever!"
DREAMER: "This is amazing."
Mochi: "Luck is better when you share it. This patch is half yours."

### 200 — Clover Close to Home

[Inside Mochi's upgraded house. She is looking out at a small dirt patch by the door.]

Mochi: "Dreamer... I saw a garden bed in a picture once. A little raised bed full of clover, with a tiny fence so it doesn't run away. I think about it sometimes."
DREAMER: "You want clover right by your door."
Mochi: "Yes! Then I could hop out and be lucky immediately. Clover likes warm hellos."
DREAMER: "I'll see if I can build you a lucky bed."
Mochi: "Really? A Clover Garden Bed just for me?"
[UNLOCK: Clover Garden Bed recipe]

### 300 — The Lucky Clover

[REQUIRES: Clover Garden Bed placed on Mochi's property. It is full of healthy clover. Mochi sits beside it, paws together.]

Mochi: "Dreamer! My clover bed is real! Look how green it is!"
DREAMER: "It's perfect."
Mochi: "I saved you the luckiest one. Kept it under a leaf for three days."
[She places a perfect four-leaf clover into Dreamer's palm.]
Mochi: "Every time I look at you, I feel like I found a four-leaf clover with a smile. Put it in your pocket and be lucky forever."

---

## Shadow (tsundere Cat)

**Decoration:** Sunny Spot Rug  
*Tsundere characters want comfort without admitting it. Shadow wants a warm rug placed in a sunny patch of her house. (Species reskin: animal = a round woven rug with a cat silhouette.)*

### 100 — The Sunny Spot

[Shadow is curled in a warm patch of sunlight on a flat rock.]

Shadow: "Oh. It's you. My sunny spot is large today. You could sit on the edge. If you want. Not that I'm offering."
DREAMER: "I'll sit very still."
Shadow: "Good. Don't talk too much. Sun naps require concentration."

### 200 — Floor Complaint

[Inside Shadow's upgraded house. She is sitting in a square of sunlight on the bare floor, looking unimpressed.]

Shadow: "Dreamer. The floor here is acceptable, but it's not sunny-spot quality. If there were something soft in the exact patch of light, napping efficiency would improve."
DREAMER: "A rug?"
Shadow: "A Sunny Spot Rug. Round, warm, precisely placed. Not because I care about decor. Because efficiency matters."
DREAMER: "Of course."
Shadow: "If someone wanted to make such a thing, I would test it. And give a review."
[UNLOCK: Sunny Spot Rug recipe]

### 300 — The Warm Feather

[REQUIRES: Sunny Spot Rug placed in Shadow's house. Shadow is lying on it, one eye open as Dreamer enters.]

Shadow: "The rug is acceptable. Warm. Round. Correctly placed."
DREAMER: "High praise."
Shadow: "Don't get used to it. I brought you something. A seagull feather. Don't read into it."
[She drops it at Dreamer's feet.]
DREAMER: "It's warm."
Shadow: "Feather-colored. Warm is a side effect. But... thank you for the rug. I didn't say that."
DREAMER: "I didn't hear it."
Shadow: "Good. Your secret feather is safe too."

---

## Raven (goth Crow)

**Decoration:** Raven Perch  
*Goth animal characters want a dramatic vantage point. Raven wants a tall perch with a small roof to stand on near her house. (Species reskin: animal = a gnarled branch painted dark, with a silver crescent.)*

### 100 — Tide Poem

[Raven stands on a wet rock at the tide line, watching the water.]

Raven: "Dreamer. Listen. 'The sea takes everything back, except the things we give away. Those, it keeps forever.'"
DREAMER: "Lovely."
Raven: "The tide is wise. It never explains itself."

### 200 — A Higher Stage

[Inside Raven's upgraded house. She looks out a high window at the bare yard.]

Raven: "Dreamer. I keep thinking about a tall perch near the house. Somewhere above the grass, with a little shelter. A place to compose poems and judge the weather without being interrupted by crabs."
DREAMER: "You want to be up high."
Raven: "High enough to see the water. Low enough that I can still hear the waves. Stable, though. I do not wobble when I am being poetic."
DREAMER: "I could build something like that."
Raven: "If you wanted. It would be a good use of wood."
[UNLOCK: Raven Perch recipe]

### 300 — The Black Feather

[REQUIRES: Raven Perch placed on Raven's property. She stands atop it, silhouetted against the sky.]

Raven: "The perch is perfect. I feel taller and slightly more tragic."
DREAMER: "You were already tragic."
Raven: "True. Now I have a stage for it. And you built it because I mentioned wanting height."
[She drops a long black feather into Dreamer's hand.]
Raven: "This is from my left wing. Use it to remember that something dark and thoughtful chose to stay with you."
DREAMER: "I'll keep it safe."
Raven: "Safe is good. But use it. Feathers are meant to move."

---

## Newton (nerd Owl)

**Decoration:** Bookshelf  
*Nerd animal characters want storage for knowledge. Newton wants a bookshelf for his notes and leaf samples. (Species reskin: animal = a bark-and-twig shelf with small compartments.)*

### 100 — Tree Height

[Newton stands beneath Dreamer's favorite tree, gesturing up with one wing.]

Newton: "Ah, Dreamer. I have calculated this tree to be precisely 4.7 Dreamers tall."
DREAMER: "I'm a unit of measurement now?"
Newton: "An informal one. You rate very high."

### 200 — Organizational Need

[Inside Newton's upgraded house. Leaf piles and scraps of paper cover every surface.]

Newton: "My research is scattered. Leaves on the floor, notes under the bed, a pebble in the soup bowl by mistake. What I need is vertical storage. Compartments. Labels."
DREAMER: "A bookshelf?"
Newton: "A Bookshelf! With sections for leaves, ledgers for dates, and a special shelf for Interesting Rocks. Capitalized."
DREAMER: "I could build one."
Newton: "Make it tall enough that I need a small hop to reach the top shelf. That is the ideal height for a bookshelf."
[UNLOCK: Bookshelf recipe]

### 300 — The Leaf Collection

[REQUIRES: Bookshelf placed in Newton's house. It is neatly organized with leaves, notes, and a small rock.]

Newton: "The bookshelf is operational. My pebble is no longer in the soup bowl."
DREAMER: "A great improvement."
Newton: "I made you a leaf collection. Each leaf is labeled with the date, weather, and one interesting fact."
[He points to a leaf with a feather tip.]
Newton: "The most interesting fact is the one I didn't write down: on every day, I thought of telling you about the leaf."
DREAMER: "I'll believe that with you."
Newton: "Then our hypothesis stands. Friendship increases leaf significance."

---

## Lotus (monk Crane)

**Decoration:** Garden Pond  
*Monk animal characters want water and balance. Lotus wants a small garden pond with a single stepping stone. (Species reskin: animal = smooth stones rimmed with reeds.)*

### 100 — One-Leg Standing

[Lotus stands on one leg at the water's edge, the other tucked beneath her.]

Lotus: "Dreamer. Stand with me on one leg. Not to balance better, but to notice balance."
DREAMER: "I'm wobbling."
Lotus: "All wobbling is noble."

### 200 — Still Water Near Home

[Inside Lotus' upgraded house. She looks out at a dry corner of her garden.]

Lotus: "Dreamer. I have been imagining water near my home. Not the sea — too loud. A small pond, still, with one stone to stand on. A place to practice being present."
DREAMER: "A garden pond?"
Lotus: "Round, quiet, rimmed with stones. I would stand beside it every morning."
DREAMER: "I'll see if I can make one."
Lotus: "Make it shallow enough to reflect the sky, but deep enough to hold a thought."
[UNLOCK: Garden Pond recipe]

### 300 — The Pausing Stone

[REQUIRES: Garden Pond placed on Lotus' property. She stands on one leg beside it, perfectly reflected in the still water.]

Lotus: "The pond is calm. The sky lives in it. I live in it too, for a moment."
DREAMER: "It suits you."
Lotus: "It does. And so do you. You noticed my wish for still water and gave it a home."
[She transfers a smooth stone from her beak into Dreamer's cupped hands.]
Lotus: "This stone was found where the tide pauses before turning back. Even movement contains stillness."
DREAMER: "I'll keep it where I rest."
Lotus: "Good. Then my gift will remind you to rest."

---

## Squire Paws (medieval Dog)

**Decoration:** Trophy Pedestal  
*Medieval animal characters want a place of honor. Squire Paws wants a pedestal to display quest trophies. (Species reskin: animal = a wooden stump pedestal with a small felt banner.)*

### 100 — Squirehood

[Squire Paws stands on a picnic blanket, wearing his tiny felt tabard.]

Squire Paws: "Arf! Dreamer! You shall be my squire! Sir Dreamer, Squire of Squire Paws!"
DREAMER: "Lead on, Squire Paws."

### 200 — A Pedestal Problem

[Inside Squire Paws' upgraded house. He trots in circles around an empty corner.]

Squire Paws: "Dreamer! A knight needs a place to display trophies! Quest items! Noble sticks! I have many important objects and nowhere worthy to put them!"
DREAMER: "A shelf?"
Squire Paws: "A Trophy Pedestal! Small but dignified. For sticks, shells, and medals I will probably invent later!"
DREAMER: "I could build one."
Squire Paws: "Make it sturdy. I may bark at it."
[UNLOCK: Trophy Pedestal recipe]

### 300 — Matching Tabards

[REQUIRES: Trophy Pedestal placed in Squire Paws' house. A single good stick rests on it. Squire Paws stands proudly beside it.]

Squire Paws: "The pedestal is magnificent. My first trophy is this stick. It is a very good stick."
DREAMER: "A worthy trophy."
Squire Paws: "You built it because I said trophies needed a home. You listen like a true squire."
[He drops the tiny tabard into Dreamer's lap.]
DREAMER: "I'll wear mine with honor."
Squire Paws: "Arf! Honor! Friendship! Matching outfits!"

---

## Pebble (shy Turtle)

**Decoration:** Hiding Rock  
*Shy animal characters want a safe hiding spot. Pebble wants a large decorative rock with a hollow underneath. (Species reskin: animal = a mossy boulder with a small arched opening.)*

### 100 — Favorite Rock

[Pebble is tucked partway inside her shell beside a mossy rock.]

Pebble: "Dreamer... I want to show you my favorite hiding rock. It's mossy and has a good view."
DREAMER: "It's a very nice rock."
Pebble: "It kept me safe when the island felt too big."

### 200 — Missing a Rock

[Inside Pebble's upgraded house. She is looking wistfully at a bare corner of her garden.]

Pebble: "Dreamer... I miss having a big rock. One with a little space underneath. Somewhere I can hide when the world feels loud."
DREAMER: "You want a hiding rock of your own."
Pebble: "Yes. Mossy on top, dark underneath. Friendly hiding. Not too big. Big enough for my shell. Small enough that I can still see out."
DREAMER: "I'll find you one."
Pebble: "Thank you. I like cool hiding."
[UNLOCK: Hiding Rock recipe]

### 300 — The Shell Stone

[REQUIRES: Hiding Rock placed on Pebble's property. She peeks out from under it, then slowly comes all the way out when she sees Dreamer.]

Pebble: "Dreamer! My rock is perfect! I fit under it and I can see out and nothing is too loud!"
DREAMER: "I'm so glad."
Pebble: "You remembered that I missed having a rock. That is very slow-patient of you."
[She pushes a round stone toward Dreamer with her front legs.]
Pebble: "This stone looks like my shell. It can keep up with you wherever you go. And when you hold it, remember that a turtle is very glad you're her friend."

---

## Sunny (cheerful Parrot)

**Decoration:** Perch Window  
*Cheerful animal characters want to greet the day. Sunny wants a wide window with an exterior perch so she can watch the sunrise. (Species reskin: animal = a woven wicker frame with a small landing bar.)*

### 100 — Morning Song

[Sunny is perched on a low branch near Dreamer's shack, wings half-open.]

Sunny: "Hello, friend! Hello, morning! I made up a song for today!"
DREAMER: "Let's hear it."
Sunny: "'Sun up, wings out, Dreamer walks, world gets bright!'"

### 200 — Small Window Blues

[Inside Sunny's upgraded house. She is hopping back and forth in front of a small, high window.]

Sunny: "Dreamer! My window is too small! I can't see the sunrise properly! I wish I had a big bird window with a place to land outside."
DREAMER: "A perch window?"
Sunny: "Yes! Wide and sunny, with a little bar outside so I can sit and say good morning to the whole island! But windows are hard. I don't have thumbs."
DREAMER: "I have thumbs. I'll see what I can do."
Sunny: "Yay! Put it where the good hellos come from!"
[UNLOCK: Perch Window recipe]

### 300 — Feather Sun

[REQUIRES: Perch Window placed on Sunny's house. Sunny is perched on the outside bar, glowing in the morning light.]

Sunny: "Dreamer! The window is perfect! I can see the whole sunrise from here!"
DREAMER: "You look right at home."
Sunny: "I am home! Because you made a window just for saying good morning!"
[She drops a bright yellow feather into Dreamer's palm.]
Sunny: "Carry a little sun with you. Even on cloudy days. Heart plus feather equals forever!"

---

## Fluffernox (kawaii Monster)

**Decoration:** Cuddle Bench  
*Kawaii monsters want soft seating. Fluffernox wants a bench so wide and soft that it looks like a hug. (Species reskin: monster = a bench shaped like a fluffy monster mouth or paws.)*

### 100 — The Fluff Hug

[Fluffernox holds very still with arms wide open, though her whole body quivers.]

Fluffernox: "Dreamer! I invented a fluff hug! It involves my whole body and lots of softness!"
DREAMER: "I would love one."
[She envelops Dreamer in a full-body hug.]

### 200 — Soft Seating Dreams

[Inside Fluffernox's upgraded house. She is looking at a small hard chair with disappointment.]

Fluffernox: "Dreamer... I keep imagining a big cozy bench. A place where two friends can sit together and be soft. With round armrests and squishy cushions."
DREAMER: "A cuddle bench?"
Fluffernox: "Yes! Wide and puffy. Then hugs could happen even when I'm not there."
DREAMER: "I could make one."
Fluffernox: "Yay! Make it the softest thing on the island!"
[UNLOCK: Cuddle Bench recipe]

### 300 — Heart Pebble

[REQUIRES: Cuddle Bench placed on Fluffernox's property. She pats the seat invitingly.]

Fluffernox: "Dreamer! The bench is perfect! Come sit! It's warm and squishy and friend-shaped!"
DREAMER: "It's beautiful."
Fluffernox: "You made my soft dream real!"
[She places a heart-shaped pebble in Dreamer's pocket.]
Fluffernox: "Squeeze it when you miss me. You're my favorite squishy friend!"

---

## Grumble (tsundere Monster)

**Decoration:** Grump Shrine  
*Tsundere monsters want something that looks intimidating but is secretly caring. Grumble wants a small shrine with offerings from the yard. (Species reskin: monster = bones, stones, and one carefully straightened wildflower.)*

### 100 — The Not-Gift

[Grumble sits near grey rocks, tossing a lumpy stone from hand to hand.]

Grumble: "Ugh. You again. I found this rock. Ugly. You can have it. Not a gift. Garbage removal."
DREAMER: "I'll keep it on my shelf."
Grumble: "Weird. Don't tell anyone."

### 200 — Too Friendly in Here

[Inside Grumble's upgraded house. She points at an empty corner with a claw.]

Grumble: "Dreamer. My house looks too friendly. Visitors might think I'm welcoming. I keep thinking about a scary corner. Skulls, rocks, a threatening stick. Something that says 'go away.'"
DREAMER: "A shrine?"
Grumble: "A Grump Shrine. Bones, stones, one straight flower for some reason. It would say 'this corner is taken.' I like taken corners."
DREAMER: "I could build you something appropriately menacing."
Grumble: "In the darkest corner. And don't make it cute."
[UNLOCK: Grump Shrine recipe]

### 300 — The Moss Doll

[REQUIRES: Grump Shrine placed in Grumble's house. It has bones, stones, and one carefully straightened flower. Grumble stands beside it, arms crossed.]

Grumble: "The shrine is adequately menacing. The flower is still straight. I check it every day."
DREAMER: "It suits you."
Grumble: "I made something. Don't look at it directly. It's a moss doll. Menacing guardian."
[She thrusts it into Dreamer's hands and looks away.]
DREAMER: "It's adorable."
Grumble: "It's not adorable. It's acceptable. If it makes you happy, that's... fine. Take it."

---

## Vesper (goth Monster)

**Decoration:** Moon Window  
*Goth monsters want nighttime atmosphere. Vesper wants a circular window shaped like the moon for her house. (Species reskin: monster = dark frame with silver claws holding the pane.)*

### 100 — Moonlight Poem

[Vesper sits on a tall rock after sunset, silver claws catching the moonlight.]

Vesper: "Dreamer. The moon is full. I wrote: 'The moon does not ask to be watched, yet we watch.'"
DREAMER: "Beautiful."
Vesper: "Accurate."

### 200 — Square Windows Are Wrong

[Inside Vesper's upgraded house. She stands at a square window, displeased.]

Vesper: "This window is wrong. It is square. The moon is round. How am I supposed to feel appropriately dramatic with a square view of a round moon?"
DREAMER: "A round window would fit better."
Vesper: "A Moon Window. Circular, dark frame, silver trim. So the architecture finally understands me."
DREAMER: "I'll see what I can do."
Vesper: "On the wall that faces the moon. Or wherever the moon rises. You know."
[UNLOCK: Moon Window recipe]

### 300 — Moonlit Shell

[REQUIRES: Moon Window placed on Vesper's house. She stands before it, the round moon perfectly framed behind her.]

Vesper: "The window is correct. The moon fits. For once, something matches how I feel."
DREAMER: "You look content."
Vesper: "Careful. That's a strong word. But... not wrong."
[She holds out a pale shell.]
Vesper: "Hold it to your ear. You will hear quiet. The kind only the moon understands."
DREAMER: "It's peaceful."
Vesper: "Carry that peace into the day. And bring a little sun back to me when you return."

---

## Gizmo (nerd Monster)

**Decoration:** Specimen Table  
*Nerd monsters want a workspace. Gizmo wants a table with compartments for rocks, shells, and leaves. (Species reskin: monster = a lumpy stone table with many small eye-shaped drawers.)*

### 100 — Footprint Classification

[Gizmo crouches in the sand, several eyes examining footprints.]

Gizmo: "Dreamer! I classified our footprints. Mine: irregular, high drag. Yours: compact, bipedal, consistent stride."
DREAMER: "You measured my stride?"
Gizmo: "For science."

### 200 — Floor full of Specimens

[Inside Gizmo's upgraded house. His collections are spread across the floor in chaotic piles.]

Gizmo: "Dreamer. My specimens need organization. A table with compartments, labels, and a flat surface for comparison. I am losing important rocks under the rug."
DREAMER: "A specimen table?"
Gizmo: "A Specimen Table! With drawers for rocks, slots for leaves, and a magnifying lens attached. Everything a field researcher needs."
DREAMER: "I could build one."
Gizmo: "Make it sturdy. I have many eyes, and they all want to look at different things at once."
[UNLOCK: Specimen Table recipe]

### 300 — The Friendship Specimen

[REQUIRES: Specimen Table placed in Gizmo's house. It is neatly organized with sand, a pebble, and a leaf.]

Gizmo: "The table is operational. No more rocks under the rug."
DREAMER: "A great victory."
Gizmo: "You heard my organizational crisis and solved it. That is efficient friendship."
[He hands over a small jar.]
Gizmo: "I made you a specimen jar. Sand from where we first talked, a pebble from your favorite path, a leaf that fell near us. Label reads: 'Friendship between Dreamer and Gizmo. Ongoing. Worth studying.'"
DREAMER: "I love it."
Gizmo: "Love is unscientific. But I will log it with a star."

---

## Ommmm (monk Monster)

**Decoration:** Meditation Mat  
*Monk monsters want a place to sit. Ommmm wants a large woven mat for his garden or floor. (Species reskin: monster = thick moss and reeds woven into a circle.)*

### 100 — Humming by the Water

[Ommmm sits at the water's edge, tapping a flat stone to keep rhythm.]

Ommmm: "Dreamer. Sit with me. We will hum. The water does not mind."
[They hum together.]

### 200 — The Hard Floor

[Inside Ommmm's upgraded house. He tries to sit on the bare floor but his bulk makes it awkward.]

Ommmm: "Dreamer. I need a place to sit that welcomes me. Something wide and soft and round. A mat where I can fold myself and be still."
DREAMER: "A meditation mat?"
Ommmm: "A Meditation Mat. Woven, thick, large enough for a monster. A circle, because circles have no corners to hurry toward."
DREAMER: "I'll weave one."
Ommmm: "Use grass that smells like rain. Then the mat will remember the sky."
[UNLOCK: Meditation Mat recipe]

### 300 — The Moss Pillow

[REQUIRES: Meditation Mat placed on Ommmm's property. He sits on it, mossy hands folded.]

Ommmm: "The mat holds me well. I do not hurry on it. I do not wobble."
DREAMER: "You look at peace."
Ommmm: "I am. Because the mat is patient. And because you noticed I needed a place to fold."
[He holds out a small moss pillow.]
Ommmm: "Use this when you need stillness. Remember that a large monster is sitting calmly and wishing you peace."
DREAMER: "I'll carry your peace with me."
Ommmm: "Good. Peace travels well."

---

## Lord Roar (medieval Dragon Monster)

**Decoration:** Royal Throne  
*Medieval monsters want a throne. Lord Roar wants a small throne for his house or yard. (Species reskin: monster = velvet cushions on a gnarled wooden frame, with tiny skull finials.)*

### 100 — Royal Advisor

[Lord Roar stands on a sandy rise, cape billowing, holding a twig like a sword.]

Lord Roar: "Hail, Dreamer! You shall be my royal advisor!"
DREAMER: "I accept."
Lord Roar: "Should I roar at the sea or trees?"

### 200 — The Stool Problem

[Inside Lord Roar's upgraded house. He is sitting on a tiny stool that barely fits him.]

Lord Roar: "Advisor! This stool is beneath my dignity. A ruler cannot address the realm from a stool. I imagine a throne — small but imposing, with velvet and armrests."
DREAMER: "A royal throne?"
Lord Roar: "A Royal Throne! Comfortable enough for naps, noble enough for decrees."
DREAMER: "I could build one."
Lord Roar: "Make it comfortable. And imposing. Both are important."
[UNLOCK: Royal Throne recipe]

### 300 — Matching Capes

[REQUIRES: Royal Throne placed on Lord Roar's property. He sits on it proudly, cape arranged.]

Lord Roar: "The throne is magnificent. I feel both taller and more prone to napping."
DREAMER: "A good throne should do both."
Lord Roar: "You heard my stool complaint and elevated me. That is the mark of a true advisor."
[He drapes a tiny velvet cape around Dreamer's shoulders.]
DREAMER: "I'll wear it often."
Lord Roar: "Then the realm is twice as noble. And twice as cozy. Rawr!"

---

## Snug (shy Monster)

**Decoration:** Cozy Cave  
*Shy monsters want enclosure. Snug wants a small decorative cave or tunnel entrance on her property. (Species reskin: monster = a rounded burrow entrance made of soft earth and moss.)*

### 100 — Under the Rock

[Snug peeks out from under a large rock, one big eye visible.]

Snug: "Dreamer... would you like to see under my rock? It's small and dark and not impressive. But it's mine."
DREAMER: "It's cozy."
Snug: "Cozy is the best thing a rock can be."

### 200 — Missing Darkness

[Inside Snug's upgraded house. She hovers near a dark corner, looking nervous.]

Snug: "Dreamer... I need a place that's dark and small and only mine. A little cave I could hide in when the island feels too big. Round entrance, soft inside."
DREAMER: "A cozy cave?"
Snug: "Friendly hiding. Not scary. Just... dark and small and mine."
DREAMER: "I'll dig one for you."
Snug: "Put it where people won't accidentally step near it. Surprises are bad for shy monsters."
[UNLOCK: Cozy Cave recipe]

### 300 — The Cool Rock

[REQUIRES: Cozy Cave placed on Snug's property. Snug peeks out, then slowly comes all the way out when she sees Dreamer.]

Snug: "Dreamer! My cave is perfect! It's dark and small and nobody looks inside unless I want them to!"
DREAMER: "I'm glad."
Snug: "You remembered that I like small dark places. That means you really see me."
[She places a cool rock in Dreamer's hand and quickly retreats halfway into the cave.]
Snug: "Hold this when the island gets too warm. And think of me. A little. If you have time."
DREAMER: "I'll think of you a lot."
Snug: "A lot is... tentacle-wiggling happy."

---

## Gigglegrow (cheerful Monster)

**Decoration:** Bouncy Trampoline  
*Cheerful monsters want movement. Gigglegrow wants a small trampoline or springy platform. (Species reskin: monster = a round leaf-and-vine mat on elastic vines.)*

### 100 — Bounce Together

[Gigglegrow bounces in a circle around Dreamer, each bounce leaving a dent in the grass.]

Gigglegrow: "Dreamer! Bounce with me! Friendship bounces!"
DREAMER: "I can't bounce as high as you."
Gigglegrow: "Doesn't matter! Trying is what counts! Boing!"

### 200 — The Floor Is Not Bouncy

[Inside Gigglegrow's upgraded house. She is bouncing on the floor, which is not very springy.]

Gigglegrow: "Dreamer... the floor is not bouncy enough. I keep imagining a springy circle. A place that bounces back when I jump. I could watch the sky while I bounce!"
DREAMER: "A trampoline?"
Gigglegrow: "A Bouncy Trampoline! Round and springy and extra giggly!"
DREAMER: "I'll build one."
Gigglegrow: "Make it strong. I am big and fluffy and full of bounce-energy!"
[UNLOCK: Bouncy Trampoline recipe]

### 300 — The Bouncy Ball

[REQUIRES: Bouncy Trampoline placed on Gigglegrow's property. She bounces on it happily as Dreamer arrives.]

Gigglegrow: "Dreamer! The trampoline is the best thing ever! I can see your head from up here!"
DREAMER: "Hi up there."
Gigglegrow: "You made my bouncy wish real! Here, catch!"
[She drops a soft fluff ball into Dreamer's hands; it bounces once against their chest.]
Gigglegrow: "It laughs when you bounce it. Now you can carry a little giggle everywhere!"
DREAMER: "I'll bounce it every day."
Gigglegrow: "Then we'll be bouncing together even when we're far apart! Best friendship invention ever!"

---

# Decoration Summary — 32 Personality Items

| Character | Personality | Decoration | Indoor/Outdoor | Reskin Notes |
|-----------|-------------|------------|---------------|--------------|
| Piko | Kawaii Robot | Flower Arch | Outdoor | Metal frame with LED heart cutouts |
| Rivet | Tsundere Robot | Orderly Leaf Pile | Outdoor | Metal stakes holding precise geometry |
| Shade-7 | Goth Robot | Moonlit Lantern | Outdoor | Angular iron frame with dim LED orb |
| Cypher | Nerd Robot | Weather Station | Outdoor | Brass gears and glass lenses |
| Om-Bit | Monk Robot | Sitting Stone | Outdoor | Smooth metal disc in gravel circle |
| Sir Cogs-a-Lot | Medieval Robot | Honor Altar | Outdoor | Riveted metal altar with plume and scepter holder |
| Tinker | Shy Robot | Bird Feeder | Outdoor | Small metal house with perch and tiny antenna roof |
| Zap-Zap | Cheerful Robot | Sunrise Window | Indoor | Metal frame with zigzag trim and heart-shaped panes |
| Boo-Boo | Kawaii Ghost | Soft Cloud Bed | Outdoor | Translucent fluff with faint pink bow |
| Wisp | Tsundere Ghost | Lantern Post | Outdoor | Cool-colored lantern that flickers faintly |
| Morwen | Goth Ghost | Candle Chandelier | Indoor | Cool blue flames, silver chains |
| Spectra | Nerd Ghost | Star Chart Rug | Indoor | Glow-in-the-dark thread, faint spectral sheen |
| Hush | Monk Ghost | Zen Garden | Indoor | Pale shimmering sand, translucent rake |
| Sir Haunts-a-Lot | Medieval Ghost | Coat of Arms Banner | Indoor | Translucent tapestry with faintly glowing thread |
| Flutter | Shy Ghost | Window Nook Curtains | Indoor | Sheer gauzy fabric that billows gently |
| Giggles | Cheerful Ghost | Giggle Wind Chime | Outdoor | Translucent chimes that glow faintly when moved |
| Mochi | Kawaii Rabbit | Clover Garden Bed | Outdoor | Small wicker-sided bed with tiny fence |
| Shadow | Tsundere Cat | Sunny Spot Rug | Indoor | Round woven rug with cat silhouette |
| Raven | Goth Crow | Raven Perch | Outdoor | Gnarled dark branch with silver crescent |
| Newton | Nerd Owl | Bookshelf | Indoor | Bark-and-twig shelf with small compartments |
| Lotus | Monk Crane | Garden Pond | Outdoor | Smooth stones rimmed with reeds |
| Squire Paws | Medieval Dog | Trophy Pedestal | Indoor | Wooden stump with small felt banner |
| Pebble | Shy Turtle | Hiding Rock | Outdoor | Mossy boulder with small arched opening |
| Sunny | Cheerful Parrot | Perch Window | Indoor | Woven wicker frame with exterior landing bar |
| Fluffernox | Kawaii Monster | Cuddle Bench | Outdoor | Bench shaped like fluffy monster mouth/paws |
| Grumble | Tsundere Monster | Grump Shrine | Indoor | Bones, stones, one straight wildflower |
| Vesper | Goth Monster | Moon Window | Indoor | Dark frame with silver claws holding the pane |
| Gizmo | Nerd Monster | Specimen Table | Indoor | Lumpy stone table with eye-shaped drawers |
| Ommmm | Monk Monster | Meditation Mat | Indoor/Outdoor | Thick moss and reeds woven in a circle |
| Lord Roar | Medieval Monster | Royal Throne | Indoor/Outdoor | Velvet cushions on gnarled frame with tiny skulls |
| Snug | Shy Monster | Cozy Cave | Outdoor | Rounded burrow entrance of soft earth and moss |
| Gigglegrow | Cheerful Monster | Bouncy Trampoline | Outdoor | Round leaf-and-vine mat on elastic vines |

# Sprite Requirements — Final Arc Decorations Only

Only the 300% cutscene requires a special sprite. The 100% and 200% cutscenes can use existing world tiles/furniture.

## Must-Create Decoration Sprites (32 total)

1. Flower Arch (Piko)
2. Orderly Leaf Pile (Rivet)
3. Moonlit Lantern (Shade-7)
4. Weather Station (Cypher)
5. Sitting Stone (Om-Bit)
6. Honor Altar (Sir Cogs-a-Lot)
7. Bird Feeder (Tinker)
8. Sunrise Window (Zap-Zap)
9. Soft Cloud Bed (Boo-Boo)
10. Lantern Post (Wisp)
11. Candle Chandelier (Morwen)
12. Star Chart Rug (Spectra)
13. Zen Garden (Hush)
14. Coat of Arms Banner (Sir Haunts-a-Lot)
15. Window Nook Curtains (Flutter)
16. Giggle Wind Chime (Giggles)
17. Clover Garden Bed (Mochi)
18. Sunny Spot Rug (Shadow)
19. Raven Perch (Raven)
20. Bookshelf (Newton)
21. Garden Pond (Lotus)
22. Trophy Pedestal (Squire Paws)
23. Hiding Rock (Pebble)
24. Perch Window (Sunny)
25. Cuddle Bench (Fluffernox)
26. Grump Shrine (Grumble)
27. Moon Window (Vesper)
28. Specimen Table (Gizmo)
29. Meditation Mat (Ommmm)
30. Royal Throne (Lord Roar)
31. Cozy Cave (Snug)
32. Bouncy Trampoline (Gigglegrow)

## Housing Sprites Required for Progression

- Basic Shack (neighbor house tier 1)
- Upgraded House (neighbor house tier 2)

END OF DRAFT — 32 characters × 3 friendship-benchmark scenes, decoration-gated, passive-wish framing

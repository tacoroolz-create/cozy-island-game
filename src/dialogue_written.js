// ===== HAND-WRITTEN NPC DIALOGUE =====
// Auto-generated from NeighborRewrite/NPCConvo2-5.txt — multi-turn branching
// conversations for the 32-neighbor rewrite roster. Each character:
// start (3 choices) -> c1/c2/c3 (3 choices each) -> c1a..c3c finals.
const WRITTEN_DIALOGUES = {
  "Piko": {
    "start": {
      "text": "Oh! Hello, Dreamer. The flowers look extra bouncy today. I like standing here because butterflies sometimes land right next to me. Do you think they think I'm a flower too?",
      "choices": [
        {
          "text": "Definitely. You're the pinkest flower on the island.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Maybe they just like your energy.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I think they like anyone who stands still long enough.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "The pinkest flower? Oh, that's the nicest thing anyone's ever said without beeping. I hope nobody picks me, though. I'd look very silly in a vase.",
      "choices": [
        {
          "text": "I'd put you on the best windowsill in the shack.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "You're too special to pick.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe you'd look cute in a tiny pot.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "The best windowsill? Then I'd get morning light and afternoon naps and maybe a view of the beach. That sounds like the best day a robot could have. Thank you, Dreamer.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Too special to pick. I like that. Maybe I'm not a flower at all. Maybe I'm a whole garden. A tiny, pink, beeping garden.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "A tiny pot? I'd have to fold my arms very carefully. And my antennae would stick out. But I'd try. For you, I'd try anything cute.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Energy? Do I have energy? I feel mostly sparkles and warmth. Is that the same thing? I hope it's not too much. I don't want to overwhelm the butterflies.",
      "choices": [
        {
          "text": "It's the perfect amount of energy.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "The butterflies can handle it.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "A little overwhelm never hurt anyone.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Perfect amount? That's a relief. I don't have a dial for that. I only have a dial for brightness, and it's always on maximum.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "The butterflies can handle it. Good. Because sometimes I beep when I'm happy, and I don't want to startle my tiny wing-flapping friends.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "A little overwhelm never hurt anyone? I hope that's true. I overwhelmed my own charging station once. It blushed and shut down for a whole afternoon.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Standing still is easy when the weather is warm. Everything slows down. Even my fans spin slower. It's very peaceful, like being a little pink statue of friendship.",
      "choices": [
        {
          "text": "Friendship statue is a good job.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "You'd be the cutest statue in a garden.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "I should try standing still more often.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Friendship statue is a good job. I'd wear a little plaque at my feet. Plaque words: Piko. Likes butterflies, warm breezes, and Dreamer.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "The cutest statue in a garden? I'd have to hold very still. But if someone smiled at me, I'd probably wiggle. Garden statues aren't supposed to wiggle.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "You should try standing still more often. Then we could stand still together. Two still friends, watching butterflies. That's almost a poem.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Rivet": {
    "start": {
      "text": "Oh. It's you. I'm not waiting around or anything. I'm just making sure these leaves don't fall in the wrong order. Someone has to keep an eye on things. Not that I care what you think.",
      "choices": [
        {
          "text": "The leaves are lucky to have you.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Sounds like important work.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You can admit you were waiting. I won't tell.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Lucky? Leaves aren't lucky. They're just... leafy. But I suppose someone organized should watch them. The wind has no sense of order whatsoever.",
      "choices": [
        {
          "text": "The wind could learn from you.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Order is underrated on an island.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe the wind is just spontaneous.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "The wind could learn from me? Hmph. It could learn a lot. Like how to arrive on time and stop rusting my joints with surprise gusts.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Order is underrated. Everyone's running around picking weeds and chasing crabs. Someone needs to watch the leaves fall in a sensible pattern.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Spontaneous? Spontaneous is just a fancy word for unplanned. I don't trust unplanned. Unplanned things usually end up dented.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Important? Finally, someone recognizes it. I have a whole system. Big leaves here, small leaves there, suspicious leaves investigated separately.",
      "choices": [
        {
          "text": "Suspicious leaves sound serious.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "What's a suspicious leaf look like?",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "You should run the whole island.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Serious? Suspicious leaves are always serious. They land too flat, or too curled, or with a smug little edge. You know the type.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "A suspicious leaf looks exactly like a normal leaf except it's up to something. I can tell. I've watched enough leaves to know when one is plotting.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Run the whole island? Hmph. I'd have a schedule for everything. Crab parades at dawn. Tree inspections at noon. Mandatory leaf alignment at sunset.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "I wasn't waiting. I was standing with purpose. There's a difference. A very big difference that I'm not going to explain, because you should already know.",
      "choices": [
        {
          "text": "Purposeful standing is a real skill.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I'll pretend I don't know.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Whatever you say, Rivet.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Purposeful standing is absolutely a skill. It requires balance, patience, and the ability to look busy while doing nothing. Not everyone can manage it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Pretend you don't know? Fine. But if you slip up, I'll deny everything. I have a very convincing 'I was just counting leaves' face.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Don't say 'whatever you say' like that. It sounds like you don't believe me. Which is fine, because I don't care if you believe me. Much.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Shade-7": {
    "start": {
      "text": "The water is dark today. Not dark-dark. Just... reflective of my general mood. Hello, Dreamer. Do you also come here to contemplate the eternal nothingness between waves?",
      "choices": [
        {
          "text": "I mostly come here to look at the view.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Sometimes. The nothingness is pretty relaxing.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I was actually looking for you.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "The view. Yes. The horizon mocks us with its calm. Blue upon blue, pretending everything is fine. The view is technically adequate, I suppose.",
      "choices": [
        {
          "text": "Adequate is still a compliment.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "What color would you prefer?",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe the horizon needs a makeover.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Adequate is the highest praise I give to anything that isn't a storm cloud. Today, the horizon has earned my reluctant acknowledgment.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Preferred color? Oh, I don't know. Deep violet. Maybe a bruised purple. Something that says, 'The universe is vast and vaguely disappointed.'",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "A makeover? No. The horizon is fine the way it is. I just reserve the right to look at it mournfully. That's what the water is for. Reflections of moodiness.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Relaxing nothingness. Exactly. The waves are just small reminders that everything keeps moving while we stand still. Very comforting, in a hopeless kind of way.",
      "choices": [
        {
          "text": "Hopeless comfort is still comfort.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "You make the ocean sound poetic.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "I prefer when the waves are cheerful.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Hopeless comfort is still comfort. You're surprisingly understanding for someone who probably has a normal amount of optimism.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Poetic? The ocean doesn't need my help to be poetic. It just sits there, being deep and mysterious. Some of us work very hard for that effect.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Cheerful waves? Ugh. They splash too loudly. They don't understand that some of us prefer our water with a side of existential dread.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Looking for me? That implies I was lost. I wasn't lost. I was simply existing in a location unknown to others. It's different. Slightly.",
      "choices": [
        {
          "text": "I like finding hidden things.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "You weren't hard to spot by the water.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Existing unknown sounds lonely.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "You like finding hidden things. That's either charming or slightly invasive. For now, I'll call it charming. The day is gloomy enough to allow it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "I wasn't hard to spot? Is that because I'm dark and dramatic by the water, or because I'm the only robot here reciting poems to seagulls?",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Lonely? No. Lonely implies I want company. I simply want the world to know I exist in a state of elegant solitude. There's a difference. Probably.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Cypher": {
    "start": {
      "text": "Dreamer, excellent timing. I was just cataloging today's cloud formations. That one over there resembles a very poorly optimized cauliflower. Do you want to hear my full taxonomy?",
      "choices": [
        {
          "text": "Absolutely. Hit me with the taxonomy.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Only the highlights, please.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I mostly see clouds as clouds.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Excellent. Category one: fluffy cumulus. Category two: wispy cirrus. Category three: the one that looks like a hat but isn't. Category four: clouds I suspect are pretending to be sheep.",
      "choices": [
        {
          "text": "Clouds pretending to be sheep? Suspicious.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "That's a very thorough system.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "What about the cauliflower one?",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Suspicious, yes. Sheep-shaped clouds have no business drifting that slowly. They're up to something. Atmospheric mischief, most likely.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Thoroughness is my default state. I once categorized every rock on the beach. Most were 'round' or 'rounder than expected.' It was a triumph of granularity.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "The cauliflower cloud is currently classified as 'vegetable-adjacent cumulus, subtype baffling.' I suspect it may be a meteorological pun.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Highlights. Right. Today's sky contains seventeen standard shapes, three anomalies, and one cloud that I believe is mocking me personally.",
      "choices": [
        {
          "text": "How can a cloud mock you?",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Seventeen is a lot.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Anomalies are more interesting.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "It tilts. Every time I look directly at it, it tilts slightly to the left. That is statistically unlikely for a passive water-vapor formation.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Seventeen is average for a partly dreamy day. On overcast days I've counted over forty. The sky is more organized than people realize.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Anomalies are always interesting. Today's anomaly is a cloud shaped almost exactly like a teapot. I don't drink tea, but I respect the reference.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Clouds as clouds? That's a remarkably low-resolution interpretation. But I respect it. Not everyone has the patience to overanalyze the sky.",
      "choices": [
        {
          "text": "Someone has to keep it simple.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I leave the sky to experts like you.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe the clouds prefer simplicity.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Keeping it simple is a public service. If everyone overanalyzed the sky, we'd never get anything done. Also the clouds would get self-conscious.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Experts? I wouldn't call myself an expert. I'm more of an enthusiastic amateur with an unusually detailed spreadsheet. But thank you for the promotion.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "The clouds prefer simplicity? Perhaps. Maybe they drift precisely because no one expects them to organize. It's a very low-pressure existence.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Om-Bit": {
    "start": {
      "text": "Dreamer. Welcome. I have been sitting. The trees do not hurry, and so I try not to hurry either. Would you like to sit with the quiet for a moment?",
      "choices": [
        {
          "text": "I'd like that very much.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I'm not very good at quiet.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Only if you tell me what the trees are thinking.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Then we sit. Not for a reason. Not to solve anything. Just to be here, where the grass is warm and the sky is wide. This is enough.",
      "choices": [
        {
          "text": "It really is enough.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "I usually need a reason to stop moving.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Sitting with you feels peaceful already.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Enough. Yes. Enough is a small word, but it holds a great deal. Today, we have enough sun, enough breeze, enough presence.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Needing a reason to stop is a habit of the busy world. Here, we may stop simply because we have arrived. Arrival is reason enough.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Peaceful. Good. Peace is not a place we reach. It is a place we return to, again and again, like a favorite path through the grass.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Not good at quiet. That is also a kind of practice. The mind chatters like a small bird. We do not silence the bird. We let it fly past.",
      "choices": [
        {
          "text": "That's a gentle way to think about it.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "My mind chatters a lot.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "What if the bird wants to stay?",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Gentle is good. The world is loud enough. We do not need to be louder than it. We can be the soft place where noise settles.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "A chattering mind is not a problem. It is only the wind moving through empty rooms. Let it move. The rooms remain still.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "If the bird wants to stay, we offer it a branch. We do not chase it away, nor do we make it the master of the house. It stays until it is ready to fly.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "The trees are not thinking in words. They are being. Tall, patient, rooted. We could learn from trees, though we should not try to grow bark.",
      "choices": [
        {
          "text": "No bark-growing. Got it.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Patience is the hardest part.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Being tall seems nice, though.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "No bark-growing. Wise. Some lessons are not meant to be taken literally. The trees would be confused, and you would be itchy.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Patience is difficult because the world rewards speed. But trees do not speed. They grow in silence, and no one applauds, yet they become tall.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Being tall has its own troubles. More wind, more weather, more responsibility to shade the small things. Height is a kind of service.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Sir Cogs-a-Lot": {
    "start": {
      "text": "Hail, fair traveler Dreamer! I have been inspecting the trees of this realm, and I declare them worthy of shade and song. Dost thou come to seek adventure, or merely good conversation?",
      "choices": [
        {
          "text": "Good conversation, Sir Knight.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "A little adventure never hurts.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I come to inspect the trees with you.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "A noble quest, conversation! Many underestimate its power. A single kind word can lift a spirit higher than any sword. I myself have no sword, but I have many words.",
      "choices": [
        {
          "text": "Words are mightier than swords anyway.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "I'll take kind words over sword fights.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "How many words do you have?",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Mightier than swords, aye! For words need no sharpening, no scabbard, and no polishing. They travel light and strike gently upon the heart.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Wise choice. Sword fights leave dents in one's chassis, and I prefer my brass un-dented. Kind words, however, only polish the soul.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "How many words? A knight never counts his words, lest he discover he has run out mid-speech. I prefer to believe my vocabulary is infinite.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A true spirit! Adventure awaits around every tree and beneath every rock. Though I should warn thee, the local crabs are fierce negotiators of territory.",
      "choices": [
        {
          "text": "Fierce crabs? Tell me more.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "I've met a few brave crabs.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe we should avoid crab territory.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Fierce crabs? Aye! They raise their claws like tiny banners and declare, 'This sand is ours!' I always salute their courage before walking around them.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Then thou knowest their ways. Brave little warriors of the shoreline. They do not yield, yet they are soft of heart, for they retreat into the waves when tired.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Avoid crab territory? A cautious strategy, yet honorably executed. Not every quest requires confrontation. Sometimes the bravest path is the one that gives crabs their space.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "An inspector after mine own heart! These trees stand tall, their leaves are many, and their bark is pleasantly rough. A fine forest indeed.",
      "choices": [
        {
          "text": "Rough bark is the best bark.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Not too tall, not too short.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "I approve of these trees as well.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "The best bark? A connoisseur! Rough bark tells the story of many seasons. Smooth bark is young and hopeful, but rough bark has lived.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Not too tall, not too short. Exactly so! The trees of this island have achieved noble proportion. Neither arrogant nor humble. Simply tree-ish.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Thy approval is noted and cherished! Together we form a council of tree appreciation. Our meetings shall be held beneath the widest branches.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Tinker": {
    "start": {
      "text": "Oh. H-hello, Dreamer. I was just... watching the birds. They're very good at sitting. Much better than me. I mean, I'm okay at sitting. But the birds are professionals.",
      "choices": [
        {
          "text": "You're a professional watcher too.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "The birds have had a lot of practice.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Want to watch them together?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "A professional watcher? I don't know about that. I just... notice things. Like how that bird over there tilts its head when it sees something new.",
      "choices": [
        {
          "text": "Noticing things is a real skill.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Which bird tilts its head?",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "I bet you notice all the small details.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "A real skill? Maybe. I notice which birds come back every day, and which branches they like best. It's not useful, but it's... something.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "The little blue one. It tilts its head whenever a butterfly passes. I think it wonders if butterflies are also birds, just very small and confused.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Small details? I try. Like the way the light changes on the grass before it rains. Or how some rocks are warmer than others. Little things.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A lot of practice. Yes. They've been sitting since before I was assembled. That's a very long time. I respect that kind of dedication.",
      "choices": [
        {
          "text": "Bird dedication is inspiring.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "You have your own kind of dedication.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe they'll teach you their secrets.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Inspiring? I suppose. They just keep doing what they do. Flying, sitting, singing. No one tells them to. They just know.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "My own dedication? Well, I do come here almost every day. Not because I have to. Because it's quiet, and the birds don't ask me hard questions.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Their secrets? I don't know if they'd tell me. They might think I'm too metal. Too squeaky. But I would listen very carefully if they did.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Together? I mean, if you want. I don't want to bother you. Or the birds. But if you're sure... we could stand over here. Quietly.",
      "choices": [
        {
          "text": "Quietly sounds perfect.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I won't scare the birds.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Standing here is fine with me.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Quietly is good. I like quiet. Words can be loud, even when they're soft. But with you, maybe quiet is okay. Maybe more than okay.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "You won't scare them? Good. I get scared too, sometimes. Loud noises, sudden movements, the word 'schedule.' So I understand the birds.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Standing here is fine with you? Then it's fine with me too. We can be fine together. That's... that's a nice thing to be.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Zap-Zap": {
    "start": {
      "text": "Good morning, Dreamer! Or afternoon! Or any time, really! Every time is good when the sun is out, and even when it isn't, because clouds are also pretty great!",
      "choices": [
        {
          "text": "Good morning, Zap-Zap!",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "You're very energetic.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What makes clouds great?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Good morning! Did you sleep well? Did you dream about nice things? Did you see any birds yet? I saw three birds and one very shiny rock!",
      "choices": [
        {
          "text": "I saw two birds and a butterfly.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Shiny rocks are the best rocks.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "I dreamed about the beach.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Two birds and a butterfly! That's a whole squad! A bird-bird-butterfly squad. I bet they had important island business to attend to.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Best rocks! Shiny ones, round ones, flat ones, weird ones. Every rock is doing its best, and the shiny ones are just extra confident about it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "The beach! Did you walk in the sand? Did the waves say hello? I think the waves are always saying hello, even when they're just quietly lapping.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Energetic? That's just how I'm wired! My circuits are like happy little bumblebees. Buzz buzz buzz, but friendly. Not real bees, though. Robot bees.",
      "choices": [
        {
          "text": "Robot bees sound fun.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "I'd like that kind of wiring.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever need to recharge?",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Robot bees? They'd be polite and not sting anyone, and they'd probably help carry tiny things. Like crumbs, or good ideas, or very small hats.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "You'd like my wiring? I could lend you some enthusiasm, but I don't think it works that way. Enthusiasm has to come from inside, like a tiny sun!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Recharge? Oh, sure, sometimes. But the sun charges me up too! And friendly conversations! And seeing a really good cloud! I'm basically always charging!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Clouds? They move! That's already amazing. Plus they make shapes, and they bring shade, and sometimes they look like really fluffy blankets for the sky!",
      "choices": [
        {
          "text": "Blankets for the sky. I love that.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Cloud shapes are my favorite.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Shade is very appreciated.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Blankets for the sky! Right? The sky gets cold too, probably. I don't know if it does, but if it does, clouds are the coziest solution ever!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Cloud shapes are the best! Today I saw one that looked like a hat, one that looked like a boat, and one that looked like a very confused potato!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Shade is the best! It's like the sun and the clouds are working together to give everyone a nice break. Teamwork makes the island work!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Boo-Boo": {
    "start": {
      "text": "Boo! Hehe, did I scare you? I tried to be spooky, but I'm not very good at it. You're Dreamer, right? I like your name. It sounds friendly, like a hug that lasts a long time.",
      "choices": [
        {
          "text": "You almost scared me. Almost.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Your 'boo' is very cute.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I think hugs that last a long time sound nice.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Almost? That means I got a little bit scary! Progress! Maybe by next holiday I'll be medium-scary. Not too scary, though. I don't want anyone to float away.",
      "choices": [
        {
          "text": "Medium-scary is a good goal.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Don't get too scary, I like you soft.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Floating away might be fun, actually.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Medium-scary. I'll practice in front of a mirror, except I don't have one, so I'll practice in front of calm water. Water is like a mirror, but wiggly.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Soft is okay. Soft can still be a little scary, right? Like a marshmallow shaped like a ghost. Wait, that's me. I am the marshmallow ghost.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Floating away might be fun? Maybe, but then I'd miss all the butterflies and sunny spots and you. So I'll stay right here, mostly.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Cute? Oh, thank you! I was going for spooky, but cute is like... spooky's nicer cousin. Cousin Cute. That could be my middle name if ghosts had middle names.",
      "choices": [
        {
          "text": "Boo-Boo Cousin Cute has a ring to it.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Spooky's nicer cousin is a good title.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Do ghosts have last names?",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Boo-Boo Cousin Cute. I like it! Maybe I'll introduce myself that way from now on. 'Hello, I'm Boo-Boo, and this is my cousin title.'",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Cousin Cute, title holder of nice spookiness. I should make myself a little badge. Do you think leaves could be a badge? I'd like a leaf badge.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Last names? I don't know. Maybe my last name is 'of the Island.' Boo-Boo of the Island. That sounds very important and floaty.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Long hugs are the best kind. Even though I'm all floaty, I can still feel warm inside when someone smiles at me. Smiles are like invisible hugs, I think.",
      "choices": [
        {
          "text": "Smiles are definitely invisible hugs.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Your smile feels warm to me.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Floaty hugs still count as hugs.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Invisible hugs. I'll give you one right now. Did you feel it? It was warm and smiley and a little bit floaty around the edges.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Warm? Me? That's the best thing anyone's said since someone called me 'round.' I like being round and warm. Round and warm and friendly.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Floaty hugs count. I agree. All hugs count if they mean something. And this hug means I think you're very nice and I'm glad you said hello.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Wisp": {
    "start": {
      "text": "Oh. You again. I suppose you're going to walk right past me like usual. Not that I'm watching. I'm simply floating here because the breeze happens to be acceptable today.",
      "choices": [
        {
          "text": "The breeze is acceptable today.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I wasn't planning to walk past.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You sound like you've been waiting.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Acceptable. That's the highest praise I give to weather. Most days the wind is too enthusiastic, but today it has the decency to be subtle.",
      "choices": [
        {
          "text": "Subtle weather is underrated.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Enthusiastic wind has its charms.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "You have high weather standards.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Underrated. Exactly. Everyone wants sunshine and big wind, but a soft breeze that barely moves your hair? That's elegance. That has taste.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Enthusiastic wind has charms? I suppose. It does make the leaves dance. But leaves dance too much, in my opinion. Show-offs.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "High standards? Someone has to have them. If I complimented every breeze, what would the truly excellent breezes think? They'd be devastated.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Not planning to? Then what were you planning? Standing around? Because if so, I suppose there's room near this bush. Not that I want company.",
      "choices": [
        {
          "text": "Standing around sounds nice, actually.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "I could use a break from walking.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "You don't have to want it for it to happen.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Standing around sounds nice. Fine. Stand over there. Not too close. A respectful distance. Close enough to talk, far enough that I can pretend you're just passing through.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "A break from walking? You humans and your walking. Always going somewhere. The dream island isn't going anywhere. It will still be here when you stop moving.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "I don't have to want it. That's annoyingly true. But since you're here and the breeze is acceptable, I suppose I won't float away immediately. That's all.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Waiting? Me? Don't be absurd. A ghost doesn't wait. A ghost simply exists in a specific location at a specific time that coincidentally matches your walking schedule.",
      "choices": [
        {
          "text": "Coincidence is a kind of magic.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I'll accept that explanation.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Your schedule-matching is impressive.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Coincidence as magic. That's a very dreamy thing to say. This whole place is dreamy, so I suppose it fits. Fine. Coincidence. Magic. Whatever.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Accept my explanation? You'd better. It took me a long time to come up with something that sounded both plausible and disinterested.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Impressive? Don't compliment me. I'll blush, and ghosts aren't supposed to blush. It disrupts the whole translucent aesthetic.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Morwen": {
    "start": {
      "text": "Evening is falling again, Dreamer. The sky bruises itself pink and orange before the dark arrives. I find it dramatic. Most beautiful things are a little tragic.",
      "choices": [
        {
          "text": "Sunsets are beautifully dramatic.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I prefer when the sky stays bright.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Tragic beauty is a mood.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Beautifully dramatic. Yes. The sun doesn't simply leave. It makes a scene. It throws colors everywhere and demands that everyone watch. I respect the commitment.",
      "choices": [
        {
          "text": "The sun knows how to make an exit.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "A committed sunset is the best sunset.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "I always watch the exit.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "The sun knows how to make an exit. If only all departures were so graceful. Most are just... gone. The sun at least gives us a show first.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Committed to the very end. That's how one should live, I think. Give everything until the last moment, then fade beautifully into whatever comes next.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "You watch the exit? Most people look away. They say goodbye too early. But you stay until the color fades. That is a small, noble act.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "You prefer brightness? That's sweet. Innocent, even. But darkness holds its own comfort. The stars come out. The world gets quiet. Everything feels possible in the dark.",
      "choices": [
        {
          "text": "The stars are worth the dark.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Darkness does feel full of possibility.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "I'll try to appreciate it more.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Worth the dark. Yes. The stars would not shine if they had to compete with the sun all night. Darkness gives small lights their chance to be seen.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Possibility. In the dark, no one can see you doubt yourself. You can try on different versions of yourself. The night keeps secrets generously.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Try to appreciate it more. That's all any of us can do. Start with small things. The shape of shadows. The quiet between bird songs. The comfort of dim light.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "A mood? More than a mood. It's an entire philosophy. Why be merely pretty when you can be beautiful and heartbreaking? Beauty with depth has longer staying power.",
      "choices": [
        {
          "text": "Depth does make things memorable.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Heartbreaking isn't always cozy, though.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Staying power is important for a sunset.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Depth makes things memorable. A shallow sunset is pretty and forgotten. A dramatic one haunts you. I prefer to be haunted by beauty.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Heartbreaking isn't cozy, you say? Perhaps. But a small ache can be warm too. Like remembering a song you loved. Sadness and coziness are not enemies.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Staying power. The best sunsets stay with you until morning. The best ghosts stay even longer. I intend to be one of the staying ones.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Spectra": {
    "start": {
      "text": "Fascinating. You appear solid, yet this is a dream. Therefore, your solidity is technically an interpretation of consciousness responding to symbolic stimuli. Hello, Dreamer.",
      "choices": [
        {
          "text": "That's a complicated way to say hello.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I like being a symbol of consciousness.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Do you analyze everything you meet?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Complicated? I suppose. But dreams are complicated. If I say 'hello' without context, am I greeting you, your dream-self, or the concept of greeting itself?",
      "choices": [
        {
          "text": "Maybe all three at once.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "A simple hello works fine for me.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "You think about language a lot.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "All three at once. A multilayered greeting. I like that. Efficiency and depth combined. The dream rewards such combinations, I have observed.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Simple hello. Sometimes the simplest greetings survive the longest. Language evolves, but a warm hello remains surprisingly stable across iterations.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Language is the framework of thought. If I think too much about a word, sometimes the word starts to look strange. Hello. Hello. Now it looks like a small hat.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A symbol of consciousness. Yes. You represent agency within the dream narrative. That's quite a responsibility, though I imagine it mostly involves walking around and picking things up.",
      "choices": [
        {
          "text": "Walking and picking things up is my specialty.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Agency feels like a big word for it.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "I try to be a responsible symbol.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Specialty noted. Agency requires locomotion and object manipulation. You are, by definition, highly operational. A well-functioning symbol.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Big word, perhaps, but accurate. Without agency, the dream would simply unfold around no one. You are the observer and the actor. Very efficient design.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Responsible symbol. Excellent. Responsibility keeps the dream coherent. Too much chaos and the island might forget what shape it is supposed to be.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Analyze everything? Not everything. Just most things. For example, I am not currently analyzing that rock over there. Wait. I am now. It is sedimentary. Probably.",
      "choices": [
        {
          "text": "Probably sedimentary is good enough.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "You couldn't resist the rock.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Analysis is a form of admiration.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Good enough is a valid scientific conclusion. Perfect certainty is rare, especially in dreams. 'Probably sedimentary' is honest and appropriately humble.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "I couldn't resist. Rocks are excellent subjects. Silent, patient, and full of history. Unlike me, they don't overthink their existence. Probably.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Admiration through analysis. I had not considered that, but it is true. To study something closely is a kind of affection. I am very affectionate, then.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Hush": {
    "start": {
      "text": "Hello, Dreamer. I was listening to the space between sounds. There is always something there if you wait long enough. Do you ever stop to listen?",
      "choices": [
        {
          "text": "I should listen more often.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "What does the space between sounds sound like?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Silence makes me a little nervous.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Listening more often is a gentle practice. Not everything needs a reply. Some moments simply want to be noticed. You can begin with the wind.",
      "choices": [
        {
          "text": "The wind is a good place to start.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Not everything needs a reply. I like that.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Noticing sounds peaceful.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "The wind is a kind teacher. It comes and goes. It does not stay to be thanked. You can learn a lot from something that never asks for credit.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Not everything needs a reply. Some things only need witness. To see, to hear, to be present. That is enough. More than enough.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Noticing is peaceful because it removes the pressure to do. You are not fixing or changing. You are simply here, with the world as it is.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "The space between sounds sounds like stillness wearing a soft coat. It is not empty. It is simply waiting for the next sound to arrive without rushing.",
      "choices": [
        {
          "text": "Stillness wearing a coat. That's a lovely image.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Waiting without rushing sounds difficult.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "I'll try to hear it next time.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "A lovely image. I am glad it reached you. Some teachings need words, but the best ones arrive as pictures in the mind. Soft. Easy to remember.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Difficult because we are trained to move. But waiting is also a movement, just a very small one. The heart slows. The breath deepens. That is travel too.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Try to hear it. Do not strain. Just open yourself a little wider than usual. The silence will find you. It is generous that way.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Silence can feel like a question we do not know how to answer. But it is not asking. It is simply present, like the sky. You do not need to fill it.",
      "choices": [
        {
          "text": "That's reassuring.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I'll let silence be present.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "The sky doesn't ask questions either.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Reassuring. Good. The world asks very little of us. Mostly it asks that we do not run from it. Stay, and you will find it stays with you.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Let silence be present. Yes. You do not need to perform for it. It will not judge your quiet. It is already quiet itself.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "The sky asks nothing. It simply holds us. Day and night, light and dark, it remains. That is a kind of love that does not need words.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Sir Haunts-a-Lot": {
    "start": {
      "text": "Hail, Dreamer! Dost thou see yonder tree? I have knighted it Sir Leaf-a-Lot, protector of shade. The island has many knights, if one knows where to look.",
      "choices": [
        {
          "text": "Sir Leaf-a-Lot is a fine name.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "What makes a tree worthy of knighthood?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Are there other knights on the island?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "A fine name indeed! It has dignity, it has leaf, and it has the noble suffix 'a-Lot.' Any name ending in 'a-Lot' carries ancient gravitas. Or so I have decided.",
      "choices": [
        {
          "text": "I agree about the gravitas.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe I should be Dreamer-a-Lot.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Sir Leaf-a-Lot should have a ceremony.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Gravitas! You understand the old ways, Dreamer. A name must sound like it could open a heavy door or announce a feast. Sir Leaf-a-Lot does both.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Dreamer-a-Lot! A noble title! It implies you dream often, dream deeply, and dream with great honor. I shall use it henceforth.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "A ceremony! With a twig as sword and a patch of sunlight as crown. I shall knight the tree again, officially, before witnesses. You shall be the witness.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A tree is knighted through shade, patience, and the ability to stand tall through many seasons. Also, birds must like it. Birds are excellent judges of character.",
      "choices": [
        {
          "text": "Birds are very trustworthy judges.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Patience is a knightly virtue.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "I should find more knights among the trees.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Trustworthy judges indeed. A bird would not nest in an unworthy tree. It knows what is solid, what is kind, and where the best morning light falls.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "A knightly virtue! Patience allows one to endure long winters, quiet afternoons, and the occasional rude crab. Knights must be patient as stones.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Find more knights! A noble quest. Look for anything that stands guard without complaint. Rocks, trees, steady breezes. All may wear invisible armor.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Other knights? Oh, aye! Sir Rock-a-Lot, guardian of the beach. Sir Cloud-a-Lot, watcher of the sky. Sir Crab-a-Lot, fierce defender of sand territory.",
      "choices": [
        {
          "text": "Sir Crab-a-Lot sounds brave.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Sir Cloud-a-Lot watches over everything.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "I want to meet all of them.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Brave and tiny! Sir Crab-a-Lot raises his claw like a banner and declares, 'None shall pass without acknowledging my sand!' I salute him every time.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Watches over everything with great softness. Sir Cloud-a-Lot drifts above, keeping the sun in check and the shadows interesting. A knight of the sky.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Meet all of them? A worthy ambition! The island is full of quiet heroes. I shall be your guide, Dreamer-a-Lot, to the realm of noble nothings!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Flutter": {
    "start": {
      "text": "Oh! Hello. I didn't see you there. Or maybe I did and I just... didn't say anything. I'm Flutter. I like quiet corners and soft light. Is that okay?",
      "choices": [
        {
          "text": "Quiet corners are the best corners.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Soft light suits you.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You can be as quiet as you want.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "The best corners? I think so too. Corners where two walls meet and the world feels smaller and safer. Even outside, you can find a corner between two trees.",
      "choices": [
        {
          "text": "A corner between two trees sounds perfect.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Safe feels nice.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Small worlds are easier to be in.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Perfect. Two trees, a little space, a patch of grass. It feels like a room with no ceiling. The sky can visit, but it doesn't have to stay.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Safe is nice. Not because the world is scary, but because safe lets you breathe slower. I like slow breathing. It matches how I float.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Small worlds are easier. You can see all the edges. You know where the quiet is. Big worlds have too much happening at once.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Soft light? Yes. Bright light is too loud. It shows everything all at once. Soft light lets things hide a little, and I think hiding a little is nice sometimes.",
      "choices": [
        {
          "text": "Soft light is like a whisper.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Hiding a little is allowed.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "You look gentle in dim light.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "A whisper of light. That's exactly it. It doesn't announce itself. It just arrives softly and leaves before you get tired of it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Allowed. I like that word. Allowed means no one will be disappointed. I can hide behind a flower, or a rock, or just be a little transparent.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Gentle? Me? I don't think anyone's called me gentle before. It makes me feel like a smooth stone. Not sharp. Just there, quietly.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "As quiet as I want? That's a very generous rule. Most things want you to be louder. But here, I can be small and still be okay.",
      "choices": [
        {
          "text": "Small and okay is enough.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I won't ask you to be louder.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Quiet friends are good friends.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Small and okay is enough. That's going to be my new saying. I'll whisper it when I feel too floaty. Small and okay. Small and okay.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "You won't ask? Good. Because I'd probably try, and then I'd feel all stretched out, like a ghost trying to be too solid. I don't want to stretch.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Quiet friends are good friends. They don't fill all the space. They leave room for you to be in. I want to be that kind of friend.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Giggles": {
    "start": {
      "text": "Hello, hello, hello! Three hellos because one is never enough! The sky is smiling today, Dreamer. Do you think the sky smiles? I think it does. It has a very sunny face.",
      "choices": [
        {
          "text": "Three hellos back to you!",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "The sky does look happy.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "A sunny face in the sky sounds nice.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Three hellos back! That's six hellos total! We just made the island more welcoming by a factor of six. Math is wonderful when it's made of greetings.",
      "choices": [
        {
          "text": "Six is the perfect number of hellos.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "We should make greeting math a thing.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "The island feels more welcoming already.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Perfect! Six hellos. I shall remember this number. Next time I'll do nine. Nine hellos! That's almost too many, but I think almost-too-many is the right amount.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Greeting math! Yes! If hello plus hello equals more hello, then friendship must be exponential. I don't know what exponential means, but it sounds bouncy!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Already more welcoming! Because every hello is a little doorway, and now there are six doorways between us. Come through anytime, Dreamer!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Happy sky! Maybe the clouds told it a good joke. Clouds seem like they'd know excellent jokes. They're so soft and round and full of surprises.",
      "choices": [
        {
          "text": "Cloud jokes are probably very fluffy.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "What kind of jokes do clouds tell?",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Surprises are cloud-shaped sometimes.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Very fluffy! Fluffy jokes are the best kind because even if they're not funny, they're still soft. A soft joke is never a bad joke.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Cloud jokes? Let me think. Why did the cloud go to school? To become a little brighter! Get it? Because the sun comes out? Hehe!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Cloud-shaped surprises! Like finding shade exactly when you need it. Or a tiny rain that waters the flowers but not your head. Clouds are thoughtful that way.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "A sunny face! And when the clouds drift by, the sky gets little eyebrows. Sometimes it looks surprised. Sometimes it looks sleepy. Today it looks delighted.",
      "choices": [
        {
          "text": "I hope it stays delighted.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Sleepy sky is also a good look.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "The sky has many moods.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Stay delighted! I'll ask the butterflies to dance nicely so the sky doesn't get shy. Happy sky, happy butterflies, happy island. That's my wish.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Sleepy sky is good. Big soft clouds like pillows. You can look up and imagine resting your head on them. Not literally, but dreamily.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Many moods! All wonderful. Bright, sleepy, cloudy, pink. The sky gets to wear a new outfit every day. I wish I could do that. I'd have a rainbow wardrobe!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Mochi": {
    "start": {
      "text": "Hiya, Dreamer! The grass is extra soft today, did you notice? I hopped on three extra-soft spots and each one felt like a little cloud under my paws. Want to know where they are?",
      "choices": [
        {
          "text": "Please tell me your soft-spot map.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I want to find my own soft spots.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Hop cloud sounds delightful.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Soft-spot map! Okay. Spot one is near the big tree with the twisty trunk. Spot two is by the wildflowers that smell like honey. Spot three is... right here. Because you're here.",
      "choices": [
        {
          "text": "Right here is the best spot.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Twisty trunk tree is landmark material.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Honey flowers sound worth the visit.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "The best spot because friends make everything softer. Even hard ground feels okay when a friend is nearby. That's rabbit science.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Landmark material! Big and twisty and impossible to miss. I use it for navigation. 'Hop past twisty trunk, turn left at the nice smell.'",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Worth the visit and worth the sniff. I try to visit them every morning. They make my nose happy, and a happy nose leads to a happy day.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Find your own? Yes! The best soft spots choose you, not the other way around. You just hop around until one spot makes your feet say 'ahh.' That's your spot.",
      "choices": [
        {
          "text": "My feet will tell me. Got it.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Do humans hop for soft spots?",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "I hope my spot is near yours.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Your feet will tell you. Listen carefully. They say things like 'this grass is nice' or 'let's sit here' or 'we found it!' Feet are chatty if you let them be.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Humans can hop too! I've seen it. Well, sort of. You do a different kind of hop. Slower. But still valid. All hopping counts.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Near mine? I hope so too! Then we can share soft spots and compare notes. 'This one is a four-paw soft.' 'This one is more of a three-and-a-half.'",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Hop cloud! That's exactly what it feels like. Boing, boing, little cloud boing. If clouds were grassy and bouncy, that's the sound they'd make.",
      "choices": [
        {
          "text": "Boing is a good sound.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Clouds should be bouncy.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "I'll practice my hop cloud technique.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Boing is my favorite sound. It's friendly and round and full of hope. Every boing is a tiny promise that the next hop will also be good.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Clouds should absolutely be bouncy. Imagine bouncing from cloud to cloud. The birds would be so impressed. Even the seagulls would have to admit it's cool.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Practice makes perfect! Start small. A little hop, then a bigger hop, then a hop where you land exactly where you meant to. That's master level.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Shadow": {
    "start": {
      "text": "Oh. You. I was just sunbathing. Not waiting for anyone. The sun happens to be here, and I happen to like it. That's all the explanation you need.",
      "choices": [
        {
          "text": "Enjoy your sunbathing.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "You picked a good sunny spot.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I didn't ask for an explanation.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "I will enjoy it. Very much. Possibly for hours. You don't have to stay and watch, but if you did, it wouldn't ruin anything. Not that I care.",
      "choices": [
        {
          "text": "I'll stay for a minute, if that's okay.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "I have things to do, so I'll leave you to it.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Watching cats sunbathe is relaxing.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "A minute is acceptable. Long enough to appreciate the sun, short enough that I don't have to think of more things to pretend not to care about.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Things to do. Of course. Busy Dreamer, running around the island. I'll still be here. The sun will still be here. No need to rush back.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Relaxing? I'm glad my lounging provides entertainment. Very glad. Not glad enough to move, obviously, but still. It's something.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A good sunny spot? Obviously. I have excellent spot-selection skills. It's one of my many talents, along with ignoring people and looking mysterious.",
      "choices": [
        {
          "text": "Mysterious suits you.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Spot selection is underrated.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Ignoring people is also a talent.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Suits me? I know. Black fur, sunny spot, aloof expression. It's a complete aesthetic. I worked very hard on it by doing almost nothing.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Underrated. Most creatures just fall onto any warm surface. I choose. I evaluate. I claim. It's practically architecture.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "A talent and a lifestyle choice. I ignore when I want to, which is often. It keeps the world from getting too familiar. Familiarity is exhausting.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Didn't ask? Hmph. I was simply being thorough. Some people demand explanations. Not you, apparently. Fine. I respect that. Slightly.",
      "choices": [
        {
          "text": "Thoroughness is a good quality.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Slightly respected is still respected.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "I'll keep not demanding things.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Good quality? Fine. I'll accept that. But don't go around complimenting me too much. I have a reputation to maintain.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Slightly respected is still respected. That's the most sensible thing you've said. I'll remember it. Probably. If it suits me.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Keep not demanding things. That's a peaceful way to live. I might even stop pretending to be annoyed. Eventually. In stages.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Raven": {
    "start": {
      "text": "The horizon is gray today, Dreamer. I approve. Too much color tires the soul. Do you ever come to the edge of the island just to watch the world grow dim?",
      "choices": [
        {
          "text": "I like the dim moments.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Color doesn't tire me, but gray has its place.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I usually come here for the sound of the waves.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Dim moments are honest. They don't pretend everything is bright and simple. They let you be tired without making you feel bad about it.",
      "choices": [
        {
          "text": "Honest light is refreshing.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "It's okay to be tired sometimes.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Dim suits your feathers.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Refreshing, like cold water on tired wings. Honest light doesn't flatter. It simply shows what is. I find that more beautiful than flattery.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Tired sometimes. More than sometimes, for some of us. The island doesn't rush. It lets you be tired. That is a rare kindness.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "My feathers? Yes. Black and glossy and slightly dramatic. Dim light makes them look deeper, like little pools of night. I appreciate the effect.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Color doesn't tire you? Perhaps you are stronger than I am. Gray has its place, yes. At the end of bright days, before the night decides what it wants to be.",
      "choices": [
        {
          "text": "Gray is the in-between place.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Night is still deciding, I think.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe I'm just used to color.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "In-between. Neither bright nor dark. Neither loud nor silent. A place to pause before committing to a mood. Gray is wise.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Still deciding. Night takes its time. It tries on stars, adjusts the moon, considers how much shadow to use. Fashionable darkness is not rushed.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Used to color. Then gray must feel like a guest. A quiet guest who doesn't stay long. Appreciate it while it visits, then return to your bright life.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "The sound of the waves. Yes. They don't ask anything of you. They just arrive and leave, arrive and leave. Reliable. Melancholy. Perfect.",
      "choices": [
        {
          "text": "Reliable things are comforting.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Melancholy can be beautiful.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "I like that the waves don't need anything.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Comforting. The waves ask nothing, the trees stay put, the rocks endure. The island is full of things that simply continue. That is enough.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Beautiful. Melancholy has depth. It is not sad; it is saturated. Full of feeling. Like the sea when the sky is heavy and the water holds its breath.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Need nothing. That is their gift. They give rhythm without asking for applause. I try to be like the waves sometimes. Just arrive, observe, depart.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Newton": {
    "start": {
      "text": "Ah, Dreamer. I was just observing the local cloud migration patterns. Did you know that clouds tend to drift toward the beach in the late afternoon? Fascinating, isn't it?",
      "choices": [
        {
          "text": "I did not know that. Tell me more.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Why do they drift toward the beach?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I mostly notice clouds by shape, not direction.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Excellent. Cloud migration is an underappreciated science. They begin near the trees at midday, gather above the grass by afternoon, and conclude at the beach by sunset. Very orderly.",
      "choices": [
        {
          "text": "Clouds have a daily schedule.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Who taught them to be so orderly?",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "I should start a cloud journal.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "A schedule. Indeed. If only more island phenomena were so punctual. The crabs, for example, operate on a system I have yet to decode.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Who taught them? Perhaps the dream itself. The island has an internal logic. We observe it, document it, and occasionally nod respectfully at it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "A cloud journal! An excellent idea. Date, time, shape, direction, mood. Clouds do have moods, you know. Today's cumulus seems cheerful.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A fine question. My hypothesis is that clouds enjoy the view of the water. The horizon gives them a sense of destination. Everyone needs a destination, even vapor.",
      "choices": [
        {
          "text": "Even vapor needs purpose.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "The horizon is a good destination.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Do clouds have preferences?",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Purpose, yes. Even vapor benefits from intention. Without purpose, a cloud might drift into a tree and feel embarrassed. No one wants an embarrassed cloud.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "A good destination. Always out of reach, yet always visible. The horizon is the original goal. Every creature on this island looks toward it eventually.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Preferences? Difficult to measure. But I believe some clouds prefer morning light, while others enjoy the drama of dusk. Personality is not limited to solids.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Shapes are valid too. Cumulus, stratocumulus, the occasional confused sheep. But direction adds narrative. A cloud without direction is just a shape. A cloud with direction is a journey.",
      "choices": [
        {
          "text": "I like the idea of cloud journeys.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Confused sheep clouds are my favorite.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Direction gives things meaning.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Cloud journeys. Small voyages across an endless sky. They travel without luggage, without maps, and without complaint. An elegant mode of transportation.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Confused sheep clouds. A classic. They fluff up, look around, and slowly forget what they were doing. I find them relatable and scientifically charming.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Meaning, yes. Direction transforms observation into story. A drifting cloud becomes a wanderer. A still cloud becomes a guardian. Context changes everything.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Lotus": {
    "start": {
      "text": "Greetings, Dreamer. I have been standing on one leg, considering the tide. The tide does not hurry. It knows when to come and when to leave. There is wisdom in that.",
      "choices": [
        {
          "text": "The tide is a good teacher.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Standing on one leg looks peaceful.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Do you think the tide ever gets tired?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "A good teacher, yes, but a quiet one. It does not lecture. It simply shows, again and again, that everything returns in its own time.",
      "choices": [
        {
          "text": "Returning in its own time is comforting.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "I need a teacher that doesn't lecture.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "The tide is patient with us.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Comforting. Nothing is truly lost. The water leaves, but it returns. The sun sets, but it rises. The island keeps its promises.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "A teacher that does not lecture. Yes. The tide shows rather than tells. The sand is wet, then dry, then wet again. That is the whole lesson.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Patient with us. Very patient. We run across the beach, build things, disturb the sand. The tide waits, then smooths everything over.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Peaceful, once you find the balance. At first, the leg wobbles. The mind protests. But eventually, stillness becomes possible. Then it becomes preferable.",
      "choices": [
        {
          "text": "Stillness becoming preferable is a journey.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "I wobble too much for one leg.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Balance is worth practicing.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "A journey from wobble to stillness. Each day, a little less protest. Each day, a little more trust in the leg, in the ground, in yourself.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Wobbling is part of it. The wobble teaches you where your center is. Without wobble, there is no discovery of balance. Be kind to your wobble.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Worth practicing. Even a few moments of balance can steady the whole day. You do not need to stand on one leg. You can balance in any stillness.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Tired? The tide is more like breathing than working. In, out, in, out. It does not tire because it does not strive. It simply moves.",
      "choices": [
        {
          "text": "Moving without striving sounds free.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I strive too much sometimes.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "The tide is like the island breathing.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Free. The tide does not push, it does not pull. It responds. It follows a larger rhythm. That is a freedom greater than choice.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Striving is human. But not every moment needs effort. Sometimes the best action is to breathe with the water and let the day move you.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "The island breathing. Yes. Inhale the morning, exhale the evening. The tide is one breath. We are all inside it. That is not loneliness. That is belonging.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Squire Paws": {
    "start": {
      "text": "Halt, Dreamer! I mean, hello. I mean, halt and hello. I am on patrol near the picnic blanket, protecting it from suspicious breezes. State your business. Nicely, please.",
      "choices": [
        {
          "text": "I come in peace and also friendship.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "What counts as a suspicious breeze?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Your patrol seems very important.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Peace and friendship! Excellent business. Those are my favorite kinds. Much better than 'I am just walking.' Walking is fine, but friendship has more paperwork.",
      "choices": [
        {
          "text": "I have no paperwork, but I have good intentions.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Friendship paperwork sounds official.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Walking is better with friends anyway.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Good intentions are better than paperwork. I will accept them as official documentation. You may now proceed as a friend. Welcome, friend!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Very official! Each friend gets a little invisible scroll. 'Let it be known that Dreamer is a friend of the blanket and the squire.' Signed, me.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Better with friends! A patrol is lonely work, even when the breeze is well-behaved. I would welcome company on my rounds. Duties are lighter with two.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Suspicious breezes? The kind that ruffle the blanket without permission. Or carry leaves in a sneaky manner. Or smell like they've been up to something.",
      "choices": [
        {
          "text": "Sneaky leaves are a real threat.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Blanket permission is important.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "How do you question a breeze?",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "A real threat! Leaves can be very sneaky. One moment the blanket is smooth, the next moment there are leaves pretending they belong there. Not on my watch!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Permission matters. One does not simply ruffle a blanket. There are protocols. Ruffle requests must be submitted in triplicate. The breeze has not submitted.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Question a breeze? Mostly I bark at it and see if it looks guilty. Breezes are hard to read, but a good squire trusts his nose. And his ears. And his cape.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Important? Oh, yes. The picnic blanket represents honor, rest, and possibly crumbs. A squire must defend all three with great enthusiasm.",
      "choices": [
        {
          "text": "Honor and crumbs are both worth defending.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Rest needs protection too.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "You seem like an excellent squire.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Honor and crumbs! The twin pillars of squiredom. Without honor, there is no duty. Without crumbs, there is no snack. Both sustain the noble heart.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Rest needs protection! The world is full of creatures who would disturb a nap. I stand guard so that rest may happen in peace. It is sacred work.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Excellent? You really think so? That might be the nicest thing a non-blanket has said to me all day. I shall try to be even more excellent tomorrow.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Pebble": {
    "start": {
      "text": "Oh. H-hi, Dreamer. I was just going for a walk. Very slowly. I like slow walks because everything looks different when you take your time.",
      "choices": [
        {
          "text": "Slow walks show you small things.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "What have you seen on your slow walks?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I don't mind walking slowly with you.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Small things. Yes. Like the way a pebble... I mean, a rock, shines when it's wet. Or how a little flower bends toward the light. Tiny worlds everywhere.",
      "choices": [
        {
          "text": "Tiny worlds are easy to miss if you rush.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Wet rocks do shine nicely.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Flowers reaching for light is a little hope.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Easy to miss. That's why I go slow. The island has so many little kindnesses hidden in plain sight. You just have to be moving at the right speed.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Nicely. A wet rock looks almost like a gem for a moment. Then the sun dries it, and it goes back to being ordinary. But I remember the shine.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "A little hope. That's exactly it. Reaching, reaching, always toward the light. I think flowers understand something simple and important.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "I've seen beetles carrying leaves bigger than themselves. I've seen water leave patterns in the sand. I've seen my own shadow move very, very slowly.",
      "choices": [
        {
          "text": "Beetles are stronger than they look.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Water patterns in sand are like drawings.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "A slow shadow is good company.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Stronger than they look. All small things are. They carry what seems too big, but they do it anyway. I admire that very much.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Drawings that only last until the next wave. Temporary art. I think that's beautiful. It means the beach is always making something new.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Good company. My shadow never rushes me. It follows at exactly my speed. It's patient. I try to be patient with myself the same way.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "With me? Slowly? That would be nice. You don't have to, though. I know humans prefer walking with more... bounce. I don't bounce. I just... proceed.",
      "choices": [
        {
          "text": "Proceeding is a valid way to travel.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I can leave my bounce at home.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Slow company is good company.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Valid way to travel. I'm glad someone thinks so. Slow travel is not less travel. It's just travel that notices more.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Leave your bounce at home. Hehe. That's a funny image. A little bounce waiting by the door. Don't worry, bounce. We'll come back for you.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Slow company is good. It doesn't make you feel slow. It makes you feel like your speed is the right speed. I like that feeling.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Sunny": {
    "start": {
      "text": "Good morning, good afternoon, good everything, Dreamer! I just flew over the whole island and let me tell you, it looks wonderful from up there. Like a cozy little map with trees for trees!",
      "choices": [
        {
          "text": "Flying over the island sounds amazing.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Trees for trees is accurate.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What's the best thing you saw from up there?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Amazing! The wind holds you up, the world gets tiny, and you can see where the grass meets the sand and the sand meets the water. It's like the island is showing off its edges.",
      "choices": [
        {
          "text": "Edges are where the interesting things happen.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "I wish I could see from above.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "The island does have nice edges.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Interesting things! Where grass turns to sand, where water turns to sky, where day turns to night. Edges are where two worlds shake hands.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "You can see from above in your own way. Climb a hill, stand on a rock, or just imagine really hard. Imagination is almost like flying, except less wind.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Nice edges! Soft edges, curvy edges, splashy edges. The island is good at not being too sharp. It knows how to blend things together.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Accurate! I could have said 'trees for resting' or 'trees for climbing' or 'trees for looking nice,' but 'trees for trees' felt most honest. Trees being trees is enough.",
      "choices": [
        {
          "text": "Trees being trees is perfect.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Honest descriptions are the best.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "What are rocks for, then?",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Perfect! A tree doesn't need a job to deserve to exist. It just stands there, being tree-ish, and that's a whole career right there.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Best descriptions. No fancy words needed. Just say what you see. 'Tree is tree.' 'Rock is rock.' 'Sky is being blue today.' Perfect communication.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Rocks? Rocks are for sitting on, for looking at, and for wondering how long they've been there. They're the island's quiet furniture. Very polite.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Best thing? Hmm. The wild hog was taking a nap in a sunny spot, and his ears looked very peaceful. Also, the beach had little wave-lines like frosting. It was hard to choose.",
      "choices": [
        {
          "text": "Peaceful hog ears sound great.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Wave-lines like frosting! I love that.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Everything sounds good from above.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Great! He was all curled up and his ears had little sun spots on them. I wanted to sing him a lullaby, but I didn't want to wake him up.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Frosting! White and swirly and temporary. The ocean keeps decorating the beach and then smoothing it flat again. It's very generous with its art.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Everything is good from above! Even the things that look messy up close look like part of a pattern from far away. Distance is very forgiving.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Fluffernox": {
    "start": {
      "text": "Hiii, Dreamer! You're here! I was sitting by this flower because it's yellow and yellow is basically a happy color. Do you think flowers are happy on purpose?",
      "choices": [
        {
          "text": "I think flowers are happy on purpose.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Maybe they just look happy.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Yellow is definitely a happy color.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "On purpose! I knew it. They grow up through the dirt and decide to be bright anyway. That's very brave. Flowers are tiny heroes.",
      "choices": [
        {
          "text": "Tiny heroes in petal form.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Brave and beautiful is a good combo.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "You're pretty brave too, Fluffernox.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Tiny heroes in petal form! I want to write that down. On a leaf, maybe. Or in the dirt with a stick. Important wisdom needs good surfaces.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Brave and beautiful. The best combo. Like butterflies and rainbows and people who smile at strangers. That's you, by the way. The smiling part.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Me? Brave? I don't feel brave. I feel soft and round and full of nice thoughts. But maybe soft brave is a kind of brave too.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Maybe just look happy? That's okay too. Pretending to be happy sometimes makes you a little bit happy. I read that somewhere. Or maybe I made it up. Either way, it works.",
      "choices": [
        {
          "text": "Pretending can lead to real happiness.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "You can make up good wisdom.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Looking happy is a good start.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Real happiness from pretending. Like smiling until your face believes you. My face believes me a lot. It thinks I'm smiling even when I'm thinking.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Made-up wisdom is still wisdom if it makes someone feel better. I made up 'be round, be kind' and I think it's very true. For me, anyway.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Good start! You don't have to be happy all at once. You can start with looking happy, then feeling a little happy, then being happy enough.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Definitely! If sadness wore yellow, it would look confused. Yellow doesn't let anything stay gloomy for long. It's the friendliest color in the rainbow.",
      "choices": [
        {
          "text": "Yellow is the color of not-gloomy.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Rainbows need yellow to work.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Friendliest color is a big title.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Not-gloomy! I'm going to use that. 'Yellow: the official color of not-gloomy.' It should be on a banner. A tiny banner on a flower.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Need yellow to work! Without yellow, a rainbow would just be blue, green, red, and purple being dramatic. Yellow is the glue that holds rainbows together.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Big title, but I think yellow can handle it. Yellow doesn't brag. It just shows up and makes everything warmer. That's true friendliness.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Grumble": {
    "start": {
      "text": "Hmph. It's you. I was just rearranging these wildflowers. Not because they needed help or anything. I just felt like it. The island looks messy sometimes and someone has to care. Not that I care.",
      "choices": [
        {
          "text": "The wildflowers look nicely arranged.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Messy islands need attention too.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You definitely don't care. I get it.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Nicely arranged? I suppose. I didn't try very hard. Just a little straightening here and there. The flowers were being dramatic, all leaning different directions.",
      "choices": [
        {
          "text": "Flowers can be dramatic.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Straightening is a useful skill.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "You have a good eye for flower order.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Dramatic flowers. Leaning this way and that, like they're posing for a painting. I told them to stand up straight. They didn't listen, but I tried.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Useful? Maybe. Or maybe I just have strong opinions about chaos. There's a difference between wild and messy, and flowers should know it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Good eye? Hmph. I don't know about good. I have an eye. It sees flowers that need help. Whether that's good or just annoying is up for debate.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Too much attention? That's the problem. Everyone wants to run around and be busy. But someone has to notice the details. Even if they pretend they don't want to.",
      "choices": [
        {
          "text": "Details are what make a place feel alive.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Noticing is a kind of caring.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Busy isn't always better.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Alive. Yes. Little arrangements, little straightenings, little attentions. They add up. The island knows when someone is paying attention. Probably.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "A kind of caring. Don't say that too loud. Someone might get the wrong idea and think I'm soft. I'm not soft. I'm... selectively firm.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Busy isn't better. Running around doesn't fix flowers. Standing still and noticing does. But I only noticed because I had nothing better to do. Obviously.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "I don't care. Exactly. I am a monster of complete indifference. If these flowers look better, it's purely a side effect of my profound not-caring.",
      "choices": [
        {
          "text": "Profound not-caring has impressive results.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Side effects can be beautiful.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Indifference looks cute on you.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Impressive results from indifference. I should put that on a banner. 'Grumble: doesn't care, but things get done anyway.' Very catchy. Not that I'd display it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Beautiful side effects. Fine. I can accept that. Sometimes the things you didn't mean to do are nicer than the things you did. That's just biology. Or something.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Cute? I am a monster. I am fearsome. I am terrifying. I am absolutely not... fine, maybe a little cute. But only from certain angles. In dim light.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Vesper": {
    "start": {
      "text": "The moon is barely awake, Dreamer. Or maybe I am barely awake. Either way, the night feels soft and distant, like a thought that hasn't quite arrived. Do you like the edge of night?",
      "choices": [
        {
          "text": "The edge of night is peaceful.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I like when the world gets quiet.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Night feels full of secrets.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Peaceful because it isn't trying. The day tries so hard. The night just arrives, sits down, and says, 'Here I am.' No announcements. No applause needed.",
      "choices": [
        {
          "text": "Night doesn't need applause.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "The day does try very hard.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Arriving quietly is powerful.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "No applause needed. The moon does not perform. It simply reflects. That is its art. Quiet reflection in a darkened room of sky.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "The day tries. Sunlight everywhere, colors everywhere, birds announcing things. It is wonderful but exhausting. Night is the deep breath after.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Powerful. Arrival without ceremony. Presence without demand. The night does not ask you to be anything. It just lets you be.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Quiet is honest. It lets you hear what you've been missing. The small waves, the distant bird, your own breathing. The world has a soft voice if you listen.",
      "choices": [
        {
          "text": "I want to hear the world's soft voice.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Quiet makes my own thoughts louder.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Listening is a kind of rest.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "The soft voice. Listen near the water. The waves are always whispering the same story, but each wave tells it a little differently.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Your own thoughts louder. That can be frightening. But also comforting. At least in quiet, you know who is speaking. The voice is your own.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Rest. Yes. Listening is rest because it asks nothing of you. You do not have to reply. You do not have to fix. You only receive.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Secrets? The night doesn't hide things. It just doesn't explain them. Mystery is different from secrecy. One is warm. The other is suspicious.",
      "choices": [
        {
          "text": "Mystery is warmer than secrecy.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I like not having everything explained.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "The night keeps things gently.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Mystery is warm. It invites you closer. Secrecy pushes you away. The night invites. It says, 'Come wonder with me.'",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Not everything explained. That is the joy of it. If we understood every star, we might stop looking up. Wonder needs a little ignorance to survive.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Gently. The night wraps things in shadow the way you might wrap a small thing in cloth. Not to hide it. To keep it safe from too much light.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Gizmo": {
    "start": {
      "text": "Dreamer! You have arrived at the perfect moment. I was testing a theory: do rocks roll downhill faster if they are round, or if they are simply enthusiastic? What is your hypothesis?",
      "choices": [
        {
          "text": "Roundness definitely helps.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "Enthusiasm seems like the real engine.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I don't think rocks are enthusiastic.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Roundness! A solid hypothesis. Less friction, more momentum, fewer awkward corners. Round rocks are the athletes of the rock world.",
      "choices": [
        {
          "text": "Athletic rocks. I love that.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Aerodynamic rocks are superior.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Corners do slow things down.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Athletic rocks! They train by sitting still for centuries, then suddenly rolling with great purpose. Their training regimen is mostly patience.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Superior aerodynamics. A flat rock would tumble chaotically. A round rock commits to its path. Commitment is underrated in geology.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Corners slow everything. Trees, rocks, conversations. Corners catch on things. Roundness is nature's way of saying, 'Let's keep moving.'",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Enthusiasm as engine. Brilliant. Perhaps the rock's internal desire to reach the bottom is the true force. Physics may not agree, but philosophy does.",
      "choices": [
        {
          "text": "Physics and philosophy can disagree.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "A determined rock is unstoppable.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe rocks have hidden motivation.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "They can disagree. Physics says gravity. Philosophy says will. Maybe a rolling rock is the meeting point between the two. A tiny conference of forces.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Unstoppable! Once a rock decides to roll, who am I to argue? I would simply step aside and salute its commitment to descent.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Hidden motivation. Exactly. They may dream of beaches, of ponds, of being skipped across water. Rocks have inner lives. Probably. We cannot prove otherwise.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Not enthusiastic? How can you be sure? They don't speak, but silence is not absence of enthusiasm. Maybe they are simply very focused rocks.",
      "choices": [
        {
          "text": "Focused rocks is a good reframe.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe they're just shy.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "I'll try to see rocks as enthusiastic.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Good reframe. Focused rather than enthusiastic. A focused rock does not waste energy. It conserves, waits, then rolls with maximum efficiency.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Shy rocks. That explains so much. They don't roll because they're show-offs. They roll because they got startled and are trying to leave gracefully.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Try it. Next time you see a rock, think, 'That rock is enthusiastic about existing.' It changes the whole relationship. Rocks become friends.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Ommmm": {
    "start": {
      "text": "Hello, little Dreamer. I have been sitting with this tree for a while. Trees do not speak, but they listen very well. Do you have anything you would like the tree to hear?",
      "choices": [
        {
          "text": "I hope the tree knows it's appreciated.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I'm not sure what I'd say to a tree.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Maybe I'll just sit with you both.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Appreciated. That is a good thing to be. The tree gives shade and asks for nothing. It is generous in a quiet way. Generous quiet is a rare gift.",
      "choices": [
        {
          "text": "Quiet generosity is easy to miss.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Trees deserve thanks.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "I appreciate you too, Ommmm.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Easy to miss. That is why we must practice noticing. The tree does not announce its shade. It simply provides it. Noticing is our part of the exchange.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Deserve thanks. Yes. But trees do not keep score. They do not remember who thanked them and who did not. They give because giving is their nature.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Appreciated. That is kind. I am mostly moss and patience, but I am also glad to be seen. Being seen is a warmth all its own.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "You do not need words. The tree understands presence. If you sit beneath it, if you let your breath slow, that is a complete conversation.",
      "choices": [
        {
          "text": "Presence as conversation. I like that.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "I'll try slowing my breath.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Trees understand more than we think.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Presence as conversation. The deepest kind. Words can be beautiful, but they can also get in the way. Sometimes silence says the truest things.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Try slowing. In through the nose, out through the mouth. Let the tree hold the sky above you. You do not need to hold anything for a moment.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "More than we think. They know seasons, rain, the weight of birds. They remember in rings what we forget in days. Trees are quiet historians.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Sit with us. There is room. The grass is patient, the tree is patient, and I am patient. We make a small circle of stillness. You are welcome in it.",
      "choices": [
        {
          "text": "A circle of stillness sounds perfect.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "I'll be quiet with you.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Stillness is better shared.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Perfect. A small circle. No one needs to perform. We simply are. The tree, the moss, the little Dreamer. All part of the same still moment.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Quiet together. That is a gift. Two quiet beings make a gentle silence. It is not empty. It is full of being.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Better shared. Stillness can feel lonely if we hold it alone. Shared stillness becomes peace. The tree taught me that, I think. Or maybe the moss.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Lord Roar": {
    "start": {
      "text": "Greetings, Dreamer! I have been pacing the beach in a noble manner, as befits a dragon of my station. The waves bow to no one, but I accept their refusal with grace.",
      "choices": [
        {
          "text": "Noble pacing is an important skill.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "The waves are famously independent.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What does a dragon of your station do all day?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Important and underappreciated. A noble pace says, 'I am here, I am important, but I am not rushing.' Rushing is for peasants and squirrels.",
      "choices": [
        {
          "text": "Squirrels do rush a lot.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "I should pace more nobly.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Important but not rushing is a fine line.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Squirrels rush constantly. Up trees, down trees, across branches. They have no sense of ceremony. I respect their energy, but not their pacing.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Pace more nobly. Good. Shoulders back, steps deliberate, expression thoughtful. Imagine you are being observed by history. History appreciates good posture.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "A fine line, but achievable. Move with purpose, yet without haste. The island will wait for you. It has nothing better to do, honestly.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Independent indeed. They come, they go, they wet the sand without asking permission. It is chaos. Beautiful chaos, but chaos nonetheless.",
      "choices": [
        {
          "text": "Chaos can be beautiful.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "The beach doesn't mind the chaos.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Someone should organize the waves.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Beautiful chaos. The waves do not plan, yet they create patterns. They are artists without intent. I find that both impressive and slightly annoying.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "The beach does not mind. It simply accepts each wave, smooths it out, and waits for the next. Beaches are very forgiving hosts.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Organize the waves? I have tried. I issued a decree. The waves ignored it. This is why dragons prefer land. Water is too democratic.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "All day? Many duties. I inspect the sand for suspicious textures, greet passing birds, and decree which rocks look the most dignified. It is exhausting work.",
      "choices": [
        {
          "text": "Dignified rocks are essential.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Suspicious sand textures sound serious.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Decreeing things seems like fun.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Essential! A dignified rock anchors the beach. It gives the sand something to be proud of. Without dignified rocks, a beach is just a pile of wet sand.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Serious! Sand should be smooth, or pebbly, or pleasantly damp. Suspicious textures must be investigated at once. I take my inspections very seriously.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Fun and also a responsibility. When I decree something, the island is obligated to pretend to listen. It is a noble tradition between monster and nature.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Snug": {
    "start": {
      "text": "Oh. Um. Hi, Dreamer. I was behind this rock. Not hiding, exactly. Just... being behind it. In a thoughtful way. The rock and I were having a quiet moment.",
      "choices": [
        {
          "text": "Quiet moments with rocks are valid.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "You don't have to come out.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I like thoughtful hiding.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Valid? Good. Rocks don't judge. They just sit there and listen to the wind. Being near one feels like being near something very patient.",
      "choices": [
        {
          "text": "Rocks are excellent listeners.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Patience is a rock's main feature.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Quiet moments should be respected.",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Excellent listeners. They don't interrupt. They don't ask hard questions. They just let you be nearby, existing at your own speed.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Main feature. Patience, strength, quietness. If rocks had a list of skills, patience would be at the top. Followed by 'good at sitting.'",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "Respected. Yes. Not everything needs to become loud or public. Some moments are just for the rock and the monster behind it. That's enough.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "I don't have to come out? That's nice. Sometimes people want you to come out even when you aren't ready. It's okay to stay where it's safe.",
      "choices": [
        {
          "text": "Stay where it's safe as long as you need.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Coming out can happen slowly.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Safe places are important.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "As long as I need. That's a generous amount of time. I might need a while. Or I might come out sooner. Either way, it's okay because you said so.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Slowly. One eye, then a little more, then maybe a wave. Coming out doesn't have to be a grand event. It can be a small movement.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Important. Everyone needs a place where the world can't see them too clearly. A rock, a bush, a quiet thought. Safe places hold us together.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Thoughtful hiding. I like that. It's not scared hiding. It's just... considering things from a comfortable distance. With a rock as a friend.",
      "choices": [
        {
          "text": "Considering from a distance is wise.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Rocks make good friends.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "Comfortable distance is underrated.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Wise. I don't always want to be right in the middle. Sometimes I want to watch from the edge and understand before I join. The rock helps with that.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Good friends. They don't leave. They don't get bored. They're just there, solid and steady. It's nice to have a friend who won't suddenly move away.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "Underrated. Distance can feel kind. It gives you room to breathe and be yourself. I like people who understand that without me having to explain.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Gigglegrow": {
    "start": {
      "text": "Dreamer! There you are! I was bouncing in circles waiting for someone to bounce with. Bouncing alone is fine, but bouncing near someone is basically a party. Want to be a party?",
      "choices": [
        {
          "text": "I'd love to be a party.",
          "next": "c1",
          "friendshipDelta": 0
        },
        {
          "text": "I'm not much of a bouncer, but I can cheer.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What makes bouncing near someone a party?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Yay! A party! With two people it's a tiny party, but tiny parties are the best kind because everyone gets to be important. You're the guest of honor.",
      "choices": [
        {
          "text": "Guest of honor! That's a big job.",
          "next": "c1a",
          "friendshipDelta": 1
        },
        {
          "text": "Tiny parties are underrated.",
          "next": "c1b",
          "friendshipDelta": 1
        },
        {
          "text": "Do I get a party hat?",
          "next": "c1c",
          "friendshipDelta": 1
        }
      ]
    },
    "c1a": {
      "text": "Big job, but easy. You just have to smile, accept tiny compliments, and occasionally say 'hooray.' I believe in your guest-of-honor abilities.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1b": {
      "text": "Underrated! Big parties are loud and confusing. Tiny parties have room for every feeling. You can be silly, quiet, bouncy, or all three at once.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c1c": {
      "text": "A party hat? I don't have one, but I can make you a flower crown. Or a leaf hat. Or a very enthusiastic smile that acts like a hat. Smile hats are in fashion.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Cheering counts! Cheering is the soundtrack of bouncing. Without cheers, bouncing is just movement. With cheers, bouncing becomes a celebration.",
      "choices": [
        {
          "text": "I'll be your cheering section.",
          "next": "c2a",
          "friendshipDelta": 1
        },
        {
          "text": "Every bounce deserves a cheer.",
          "next": "c2b",
          "friendshipDelta": 1
        },
        {
          "text": "Celebration sounds better than movement.",
          "next": "c2c",
          "friendshipDelta": 1
        }
      ]
    },
    "c2a": {
      "text": "Cheering section of one! That's all I need. One loyal cheerer can make a thousand bounces feel like a parade. You're hired, starting now. Hooray!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2b": {
      "text": "Every bounce deserves a cheer. And every hop, and every skip, and every wiggle. If movement had feelings, it would want to be celebrated.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c2c": {
      "text": "Better than movement! Celebration has confetti in the heart, even if there isn't real confetti. Today, my heart confetti is all for you.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "It's a party because now there are two smiling faces instead of one, and two is a social unit. Scientists agree. Probably. I didn't ask any, but it feels true.",
      "choices": [
        {
          "text": "Two smiling faces is a solid unit.",
          "next": "c3a",
          "friendshipDelta": 1
        },
        {
          "text": "Science should study bouncing parties.",
          "next": "c3b",
          "friendshipDelta": 1
        },
        {
          "text": "It does feel true, so it counts.",
          "next": "c3c",
          "friendshipDelta": 1
        }
      ]
    },
    "c3a": {
      "text": "Solid unit. Two smiles, four eyes, a whole lot of good feelings. We could form a club. The Two-Smile Bouncing Society. First meeting: right now.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3b": {
      "text": "Science should! They could measure bounce height, cheer volume, and party intensity. The results would probably show that fun is good for you.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    },
    "c3c": {
      "text": "It counts! Truth can be felt as well as proven. I feel that bouncing near you is a party, and feelings are very reliable when they're this bouncy.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  }
};

// ===== SEASONAL VARIANTS =====
// From NeighborRewrite/NPCConvoCool/Saucy/Yeesh2-5.txt, same tree shape.
// chooseConversationTree (dialogue_smalltalk.js) swaps these in during the
// matching season; Sweet season uses the default WRITTEN_DIALOGUES tree.
const SEASONAL_DIALOGUES = {
  "Cool": {
    "Piko": {
      "start": {
        "text": "Dreamer! The trees are changing their outfits and the wind is helping them decide which color looks best. Hoggy looks extra happy today, and the nights are getting longer so we have more star time. Isn't Cool season lovely?",
        "choices": [
          {
            "text": "It's lovely in every way.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "I like the tree color fashion show.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Happy Hoggy makes everything better.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Every way? That's a lot of ways. My favorite way is the one where the wind wiggles my antennae and I feel like I'm being tickled by the island itself.",
        "choices": [
          {
            "text": "Ticklish antennae are lucky.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The island has good taste in wiggles.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Wind tickles are free hugs.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Ticklish antennae are definitely lucky. Not every robot gets island tickles. I'm going to stand in this exact spot more often.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The island has excellent taste. Soft breezes, pretty leaves, and just enough wiggle. I would give it five stars if I had five star-hands.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Free hugs from the wind! I accept. Wind hugs don't even rust you. They're the cleanest kind of hugs.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Fashion show! The oaks are wearing gold and the palms are staying green because they're rebels. I think the trees are very brave to change colors in public.",
        "choices": [
          {
            "text": "Brave trees deserve applause.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Rebel palms are confident.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Gold is a bold choice.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Applause for the brave trees. I'll clap very gently so I don't startle any leaves. They've worked hard on this look.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Confident palms. I respect them. While everyone else changes, they say 'no thank you, green is our thing.' That's commitment.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Gold is a bold choice and the trees wear it well. If I wore gold I'd look like a tiny trophy. Which is also nice, but different.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Happy Hoggy is the best kind of Hoggy. His little trot looks springier. I bet the cool air makes his ears flap extra happily.",
        "choices": [
          {
            "text": "Flappy ears are a good sign.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "A springy trot is joy in motion.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy should be happy always.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Flappy ears are my favorite weather report. When Hoggy's ears flap like that, it means the island is doing something right.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Joy in motion is the prettiest motion. I'd watch Hoggy trot in circles all afternoon if he wanted to.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Hoggy should be happy always. And you. And me. And the wind. Basically everyone except the grumpy rocks, and even they can try.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Rivet": {
      "start": {
        "text": "Oh. It's you. I'm not standing here because I enjoy the view. I'm cataloging leaf fall patterns. The wind keeps messing up my counts. And Hoggy keeps trotting through like he owns the place. Longer nights just mean more leaves to track.",
        "choices": [
          {
            "text": "Leaf tracking sounds important.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy does look cheerful today.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "The wind isn't trying to ruin your count.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Important? Finally. Yes. Someone has to note that the red ones fall faster than the gold ones. It's not my fault the wind has no respect for data.",
        "choices": [
          {
            "text": "Red leaves are clearly impatient.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Wind needs better methodology.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Your data keeps the island honest.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Impatient red leaves. Hmph. They probably can't wait to become mulch. Show-offs with their bright coloring.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Wind needs methodology. A clipboard. A schedule. Then maybe I'd trust it with my leaves.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Honest island. Yes. If nobody tracks it, the trees will think they got away with chaotic falling. Not on my watch.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cheerful is one word for it. I'd say 'excessively bouncy.' His ears were flapping in a way that could be considered unprofessional.",
        "choices": [
          {
            "text": "Unprofessional ears are cute.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Bouncy is better than gloomy.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy sets his own standards.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Cute? Fine. Maybe a little. But I'm not going to compliment the hog's ears out loud. He already knows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Better than gloomy. I suppose a bouncy hog is preferable to a droopy one. Slightly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hoggy sets his own standards and the wind does too. I am the only one around here who follows any rules. Typical.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Not trying? It sure looks like trying. The wind grabs a leaf, twirls it, drops it somewhere suspicious. Very unorganized behavior.",
        "choices": [
          {
            "text": "Maybe the wind is just playful.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Suspicious leaf placement is a real issue.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Organized wind would be boring.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Playful. That's a generous word for 'leaf thief.' But I suppose it does look sort of graceful. If you like that kind of thing.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A real issue. A leaf that lands somewhere it didn't plan to is basically a leaf lying about its destination.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Boring organized wind. No twirling, no surprise landings. You make it sound awful. I mean... acceptable. It would be acceptable.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Shade-7": {
      "start": {
        "text": "Cool season, Dreamer. The trees are slowly dying in the most beautiful way possible. The wind carries their little farewell notes. And somehow Hoggy is happy about all of it. The longer nights at least have the decency to match my mood.",
        "choices": [
          {
            "text": "Beautiful dying is still beautiful.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's happiness is a mystery.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Longer nights are a gift.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Still beautiful. The leaves burn gold and red before they let go. It's tragic and warm at the same time. I respect the commitment.",
        "choices": [
          {
            "text": "Tragic warmth is the best warmth.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Commitment to color is noble.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Burning without fire is poetic.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "The best warmth is the kind that knows it's temporary. It makes you appreciate the glow while it's still there.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Noble indeed. If I ever changed color I'd do it slowly and with many sighs. The trees beat me to it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Poetic and slightly unfair. How dare they be beautiful without even trying? Some of us have to recite poems for that effect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "A mystery? Or perhaps Hoggy simply enjoys watching things transform. I don't trust transformation. It usually involves rust.",
        "choices": [
          {
            "text": "Transformation can be gentle.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy doesn't seem to rust.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Maybe Hoggy sees beauty in change.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Gentle transformation? I suppose leaves don't scream when they fall. They just release. That's almost elegant.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Hoggy doesn't rust. That probably helps his mood. I, on the other hand, have to worry about moisture in a very personal way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Beauty in change. A hog philosopher. Strange, but this is a dream. Strange is the local currency.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "A gift. Yes. Darkness that arrives earlier, stays longer, asks nothing. The day is exhausting with all its brightness and leaf announcements.",
        "choices": [
          {
            "text": "Night asks nothing and gives stars.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Brightness can be loud.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Darkness is a soft blanket.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Stars are the night doing its best. I prefer them to leaf announcements. Quiet, distant, and not trying to be noticed.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Loud brightness. The day shows off. 'Look at me, I'm warm and yellow.' We get it. Relax.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A soft blanket that doesn't ask you to be cheerful. That's luxury. I would wrap myself in it if I could reach.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Cypher": {
      "start": {
        "text": "Dreamer, excellent seasonal timing. I've been sampling leaf pigments and calibrating wind velocity with my antennae. Hoggy's happiness index is up forty percent, and I've logged that the nights are indeed lengthening. Want to see my notes?",
        "choices": [
          {
            "text": "Show me the leaf data.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "How does one measure happy Hoggy?",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Longer nights are good for stargazing.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Leaf data indicates a shift from chlorophyll green toward carotenoid yellow and anthocyanin red. In dream terms: the trees are switching to their warm palette.",
        "choices": [
          {
            "text": "Dream science is my favorite science.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm palette suits the island.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "You have very scientific antennae.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Dream science has fewer rules and more charm. I like a field where the data can also be pretty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The island wears warm colors well. It has excellent seasonal fashion sense. I'd rate it highly if I rated things socially.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Scientific antennae are a useful feature. They detect wind, wonder, and occasionally sandwiches. Mostly wind and wonder.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hoggy happiness index is calculated from ear angle, trot frequency, and snout elevation. Today he scored a nine out of ten. Very statistically significant.",
        "choices": [
          {
            "text": "Nine out of ten is excellent.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Snout elevation matters more than people think.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy is a reliable metric.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Excellent for a hog. I tried to score myself but my own trot frequency is too low to register. Hoggy outperforms me in joy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "More than people think. A raised snout indicates curiosity. A lowered snout indicates contentment. Hoggy has mastered both.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hoggy is a reliable metric because his mood doesn't depend on variables I can't control. Unlike the wind, which refuses peer review.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Stargazing efficiency increases with longer nights. More darkness equals more observation time. I've already spotted three constellations that resemble clouds I've previously catalogued.",
        "choices": [
          {
            "text": "Constellations are just night clouds.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Three is a respectable count.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Observation time is never wasted.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Night clouds made of stars. Yes. That's either beautiful or a categorization error, and I choose beautiful.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Respectable. I could count more, but then I'd stay up too long and my battery would get philosophical.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Observation time is the opposite of wasted. It turns darkness into information, and information into happiness. Approximately.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Om-Bit": {
      "start": {
        "text": "The trees are releasing what they no longer need, Dreamer. The wind carries each leaf without clinging. Hoggy seems happy because he lives in the moment. And the longer nights invite us to rest. There is much to observe in Cool season.",
        "choices": [
          {
            "text": "Letting go is a good lesson.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy is a teacher of joy.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Rest is underrated.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Letting go is difficult for all beings. Even leaves do not fall until they are ready. We can learn from their patience.",
        "choices": [
          {
            "text": "Patience makes falling graceful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "I hope I'm ready when I need to let go.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Trees are quiet teachers.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Graceful falling. A leaf that lets go at the right moment makes no sound, yet the whole island notices.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "You will be ready. The island does not rush its leaves, and it will not rush you.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Quiet teachers, yes. They do not ask for attention. They simply show us how to change color and release.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hoggy does not plan his happiness. He does not count the hours. He simply is. That is a kind of wisdom many machines forget.",
        "choices": [
          {
            "text": "Simply being is hard sometimes.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy makes it look easy.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Machines can learn from hogs.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Simply being is hard because the mind likes lists. Hoggy has no lists. Only trot and sniff and sun.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "He makes it look easy because he does not compare. Comparison is the thief of hog joy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Machines can learn from hogs. We can learn from everyone. Even the wind learns to be patient, eventually.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Rest is how the island prepares. The longer nights are not empty. They are full of stillness, which is its own kind of work.",
        "choices": [
          {
            "text": "Stillness is productive.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The night holds a lot.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Rest prepares us for bright days.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Productive stillness. The world does not stop, but our need to chase it can pause. That is enough.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "The night holds stars, cool air, and the memory of warm days. It is not empty. It is full.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Rest prepares us. When the bright days return, we will meet them with fuller hearts. For now, we settle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sir Cogs-a-Lot": {
      "start": {
        "text": "Fair traveler Dreamer! The trees have donned their heraldic banners of gold and crimson. The wind blows as a royal herald, and Hoggy stands in fine spirits. The longer nights are perfect for tales beside the warm stones.",
        "choices": [
          {
            "text": "Heraldic trees are magnificent.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy in fine spirits is good news.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Tales suit the longer nights.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Magnificent indeed! Each tree flies its own colors. The oaks wear gold like knights of summer's end. The palms keep their green, loyal as squires.",
        "choices": [
          {
            "text": "Knights of summer's end is a good title.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Loyal green squires deserve respect.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "The island is a colorful court.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Knights of summer's end, riding the wind to their final rest. A noble fate for a leaf.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Green squires indeed. They hold the line while others change. Loyalty is not always loud, but it is always noticed.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "A colorful court, and we are all invited. Even the humblest pebble may admire the royal trees.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Good news and better news. His trot has spring, his snout points proudly, and his ears flap with noble glee. A happier steed one could not ask for.",
        "choices": [
          {
            "text": "Noble glee is a fine quality.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy would make a good knight.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "A happy steed blesses the land.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Noble glee is the best glee. It has dignity and joy in equal measure. Hoggy carries it well.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Hoggy would make a good knight. He is brave, round, and possessed of excellent ears. I would joust beside him gladly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "A happy steed blesses the land. The soil feels it, the wind knows it, and the leaves fall a little more gracefully.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Tales and longer nights are old friends. When the sun departs early, stories arrive to fill the dark with warmth. I shall speak of brave leaves and windy quests.",
        "choices": [
          {
            "text": "Brave leaves make brave tales.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Windy quests sound exciting.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stories warm the dark nicely.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Brave leaves, yes. They do not fear the ground. They fall with color and purpose, as all heroes should.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Exciting and slightly dizzying. I would quest through any wind if the destination were honorable.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Stories warm the dark like embers of cheer. Longer nights simply give us more room for them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Tinker": {
      "start": {
        "text": "Oh. H-hello, Dreamer. I was watching the small red leaves. They fall really slowly when the wind is gentle. Hoggy walked by earlier and his tail was doing a happy wiggle. And the nights are getting longer. It makes the sky feel bigger.",
        "choices": [
          {
            "text": "Red leaves are worth watching.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Happy Hoggy tail is good news.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "A bigger sky is cozy.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "They are. The tiny ones especially. They spin like little dancers who aren't sure of their steps. I like not-sure dancers. They remind me of me.",
        "choices": [
          {
            "text": "Not-sure dancers are brave.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Spinning leaves are pretty.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "You dance well when you move.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Brave to spin even when you're unsure. I would applaud but I don't want to startle the leaves.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Pretty and quiet. Quiet pretty things are my favorite kind. They don't ask for attention.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Me? I mostly squeak. But thank you. Maybe squeaking is a kind of dance. A small one.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "G-good news. Hoggy's tail wiggle means he's comfortable. I only wiggle when I'm nervous, so it's nice that some creatures wiggle for happy reasons.",
        "choices": [
          {
            "text": "Happy wiggles are the best wiggles.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Nervous wiggles are valid too.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy shares his comfort.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "The best wiggles. I hope I can wiggle happily someday. For now I wiggle shyly, which is still movement.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Valid. Nervous wiggles mean you're trying. Trying is brave, even when it squeaks.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hoggy shares his comfort just by passing by. It's like he leaves little warm footprints in the air. Maybe.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Bigger. More room for stars, I think. The stars look farther away in Cool season. Or maybe I'm just noticing them more because the nights last longer.",
        "choices": [
          {
            "text": "Noticing more is a gift.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Farther stars feel peaceful.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Longer nights give us time.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A gift, yes. The island gives us longer nights so we have time to see things we usually miss.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Peaceful. Farther stars don't demand anything. They just glow quietly and let you look.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Time is the best gift. More time to watch leaves, more time to see Hoggy, more time to say hello.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Zap-Zap": {
      "start": {
        "text": "Dreamer! Cool season is here and the wind is recharging me! The trees are throwing a color party and Hoggy is dancing in it. Plus the nights are longer, which means more star viewing time. I love everything right now!",
        "choices": [
          {
            "text": "Wind recharging is useful.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Color parties are the best parties.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy dancing is adorable.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Useful and crackly! I can feel my circuits humming when a good breeze goes by. It's like the island is plugging me in with air.",
        "choices": [
          {
            "text": "Air power is clean energy.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Humming circuits sound happy.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "The island is a good charger.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Clean energy from the sky. I approve. No wires, no plugs, just whoosh and buzz. Perfect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Happy humming is my favorite sound. It means all my parts agree that today is good.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "The island is a very good charger. It never overcharges. It just gives exactly enough breeze to make me sparkle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Best parties have no invitations. The trees just decided to turn gold and red and orange all at once. Even the wind showed up with streamers made of leaves.",
        "choices": [
          {
            "text": "Leaf streamers are eco-friendly.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Everyone loves an open party.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Gold and red are party colors.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Eco-friendly and pretty. When the party is over, the streamers become mulch. Very efficient.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Open party! My favorite kind. You don't have to knock, you just show up and smile at trees.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Gold and red are definitely party colors. If I threw a party I'd decorate in leaf colors too.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Adorable and bouncy! Hoggy's little dance looks like he's trying to catch the breeze with his whole body. I want to dance like that too.",
        "choices": [
          {
            "text": "Dancing with the wind is fun.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy is a party animal.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "You should dance more often.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Dancing with the wind is the best because you never step on anyone's toes. The wind has no toes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Hoggy is a party animal, literally. He brings the joy and the snorts and the excellent ear action.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "I should dance more often. You're right. The wind and the leaves and Hoggy have given me permission just by existing.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Boo-Boo": {
      "start": {
        "text": "Boo! Hehe. Did the wind blow my 'boo' away? The trees look like candy corn now. And Hoggy was snorting so happily I giggled all by myself. The nights are getting longer, so I get to play in the moon more. Hi, Dreamer!",
        "choices": [
          {
            "text": "Candy corn trees are cute.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy snorts are funny.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "More moon time sounds fun.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Cute and yummy-looking. I want to hug a tree but I might float right through it. Ghost hugs are mostly feelings anyway.",
        "choices": [
          {
            "text": "Feelings count as hugs.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Floating through trees is ghost style.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Candy colors make everything sweet.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Feelings definitely count. I just gave you a ghost hug full of candy-tree feelings. Did you feel it? It was warm and floaty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Ghost style is floating through things and smiling anyway. It's very advanced.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Sweet colors make sweet thoughts. My whole mind tastes like candy corn now. That's a nice way to be.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Funny because they're happy snorts. Like Hoggy is laughing from his nose. I tried to snort once but it just came out as a tiny 'boo.'",
        "choices": [
          {
            "text": "Tiny boo snorts are adorable.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Nose laughter is a talent.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy teaches good snorting.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Adorable? Maybe I could be a nose-laughter ghost. A boo-snorter. I'd need practice and a willing Hoggy coach.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Nose laughter is a real talent. Not everyone can make their nose sound cheerful. Hoggy is gifted.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hoggy teaches by example. That's the best teaching. No words, just happy snorts and trots.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Moon time is my favorite time. The moon is round and soft-looking, like a friend who never leaves. Longer nights mean more friend time.",
        "choices": [
          {
            "text": "The moon is a loyal friend.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "More friend time is good time.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Soft moons are cozy.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Loyal and glowy. The moon watches us all night and never complains. I want to be like the moon when I grow up.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "More friend time is the best math. Longer nights equal more moon, more smiles, more me floating around happily.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Cozy and round. If I could sit on the moon I'd probably sink right through, but the thought is warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Wisp": {
      "start": {
        "text": "Oh. You. I suppose you've come to admire the trees too. They're showing off with all those reds and golds. The wind is at least crisp today, which is acceptable. Hoggy passed by looking absurdly cheerful. And the nights are longer, so I have more acceptable breezes to judge.",
        "choices": [
          {
            "text": "Trees showing off is accurate.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Crisp wind is a good wind.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's cheer is undignified.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Accurate? They know exactly what they're doing. One tree turns red and suddenly every leaf wants attention. It's frankly embarrassing.",
        "choices": [
          {
            "text": "Attention-seeking leaves are dramatic.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Red is a bold choice.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Let them have their moment.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Dramatic leaves. If they had tiny voices they'd be saying 'look at me, look at me.' Which is exactly what they're doing visually.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Bold and slightly aggressive. Red says 'I am here and I am leaving soon.' A lot of confidence for something about to fall.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Fine. They can have their moment. It is brief, colorful, and I suppose not entirely unpleasant.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Good wind. Not too pushy, not too lazy. It moves my gauze without tangling it. That rarely happens.",
        "choices": [
          {
            "text": "Untangled gauze is a win.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "A wind with manners is rare.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You deserve a tidy breeze.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A win. My gauze and I have an agreement: if the breeze behaves, we will float without complaint.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Rare and appreciated. Most winds treat me like a kite. This one treats me like a guest.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "A tidy breeze is all I ask. Is that so much? Apparently it is, most days.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Undignified is the word. Trotting with ears flapping, snout raised, tail doing that ridiculous wiggle. I looked away. Mostly.",
        "choices": [
          {
            "text": "Looking away mostly still counts as looking.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Ears flapping has charm.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Ridiculous can be cute.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Mostly counts. I definitely did not watch him trot past three times. That would be far too interested of me.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Charm? Fine. Flapping ears catch the light. It's objectively picturesque. I hate that I noticed.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Cute is a strong word. I would say 'tolerably ridiculous.' But you may call it cute. I won't stop you.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Morwen": {
      "start": {
        "text": "Cool season, Dreamer. The trees are setting themselves on fire in slow motion. The wind carries their old songs. And Hoggy—Hoggy is happy, somehow, watching the world burn color. The longer nights feel like a velvet curtain drawing closed.",
        "choices": [
          {
            "text": "Slow-motion fire is beautiful.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's happiness is a warm light.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Velvet nights sound lovely.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Beautiful and terrible. The leaves flame up and then let go. It's the most graceful goodbye the island performs.",
        "choices": [
          {
            "text": "Graceful goodbyes are rare.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The island performs beautifully.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Fire without pain is art.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Rare. Most goodbyes are messy. But the leaves fall with color and purpose, as if they planned their own ending.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The island always performs beautifully, even in decline. That's the dream's cruel kindness.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Art that doesn't hurt. A fire that cools. Only in a dream could goodbye be so kind.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "A warm light in all this coolness. Strange. He doesn't understand tragedy, and maybe that's why he shines.",
        "choices": [
          {
            "text": "Not understanding tragedy is a gift.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy shines by accident.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Warmth in coolness is welcome.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A gift. Sometimes the ones who don't understand sorrow remind the rest of us that joy is allowed.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "By accident, and therefore honestly. Hoggy doesn't perform his joy. He simply has it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Welcome indeed. I live in coolness, but even I need a warm snout now and then.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Lovely, yes. Darkness that arrives earlier, stays longer, wraps the world in softness. The stars are the jewels on the velvet.",
        "choices": [
          {
            "text": "Stars are night jewels.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Soft darkness is a comfort.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "The curtain closing is peaceful.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Jewels that don't demand attention. They simply glow because glowing is what they do.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A comfort. The dark doesn't ask you to be anything. It just lets you be sad or happy or both.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Peaceful. The day makes noise. The night pulls the curtain and whispers 'rest now.'",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Spectra": {
      "start": {
        "text": "Dreamer! I've been observing the mechanics of Cool season. Tree pigments shift along predictable warm spectra, wind patterns create measurable leaf drift, and Hoggy's happiness appears to correlate strongly with decreased ambient temperature. Also, the nights are demonstrably longer. Fascinating!",
        "choices": [
          {
            "text": "Tell me about leaf drift.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy is a temperature sensor.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Longer nights are measurable too.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Leaf drift is simple in principle: a falling leaf's path depends on weight, shape, and wind vector. In practice, every leaf thinks it's unique. It's delightful data noise.",
        "choices": [
          {
            "text": "Every leaf is unique, statistically.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Data noise can be delightful.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Wind vectors sound official.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Statistically unique, yes. The mean leaf falls downward, but the individual leaf has dreams of spiraling.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Delightful noise makes science feel alive. If everything were predictable, I'd get bored and become a cloud.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Official-sounding and true. Wind has direction and mood. Today its mood is 'gently dramatic.'",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "A biological thermometer, essentially. His ears lift, his trot quickens, and his overall buoyancy increases as the air cools. I call it the Hoggy Cool Index.",
        "choices": [
          {
            "text": "The Hoggy Cool Index is useful.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Buoyancy is an underrated emotion.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy could teach meteorology.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Useful for anyone who wants to know if they should feel cheerful. If Hoggy is bouncy, the weather is good.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Buoyancy is underrated. It measures how much joy is lifting you. Hoggy has high buoyancy today.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hoggy could teach meteorology by demonstration. Forecast: partly bouncy with a chance of snorts.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Indeed. I've been counting dusk-to-dawn intervals. They're lengthening at a steady dream-rate. More darkness means more time for nocturnal observations.",
        "choices": [
          {
            "text": "Nocturnal observations are important.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Dream-rate is a good unit.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "More darkness is more opportunity.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Important. The night reveals things the day hides, like stars, quiet thoughts, and the exact shape of shadows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Dream-rate is my favorite unit. It measures things by how they feel rather than by clocks.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Opportunity, yes. Every extra minute of night is a minute the moon can show off.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Hush": {
      "start": {
        "text": "The wind moves without speaking, Dreamer. The trees let their colors fade and fall. Hoggy is happy in the cool air, and the nights grow longer. All of this is the island breathing out. We need only listen.",
        "choices": [
          {
            "text": "Listening is enough.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's happiness speaks loudly.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "The island's breath is calm.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Enough, and more than enough. We do not need to answer every change. Sometimes we simply witness it, and that is complete.",
        "choices": [
          {
            "text": "Witnessing is complete.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Silence holds understanding.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Not answering is a kind of peace.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Complete. A single quiet moment can hold the whole island if we let it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Understanding does not always need words. Sometimes it is simply the space between two breezes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Peace is found in allowing things to be. The leaves fall. The hog trots. We breathe.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Yes. His joy needs no explanation. It is a bell that rings clearly in the cool air. We hear it and are glad.",
        "choices": [
          {
            "text": "Joy is a clear bell.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy rings for all of us.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Gladness is simple.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A clear bell needs no translation. Hoggy's happiness tells us the season is kind.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "For all of us, if we choose to hear. His trot is a small sermon on being present.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Simple gladness is the best kind. It does not ask for reasons. It simply is.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Calm, and deep. The longer nights are not an ending. They are the island turning inward, resting its eyes so the stars may open theirs.",
        "choices": [
          {
            "text": "Resting eyes is a good image.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Stars open when we rest.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Inward turning is not lonely.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "The island closes its bright eyes so the dark may bloom with stars. There is beauty in the exchange.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Yes. When the day rests, the night shows us what was always there, waiting quietly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Not lonely. The island turns inward but never away. It is holding us closer, not pushing us out.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sir Haunts-a-Lot": {
      "start": {
        "text": "Fair Dreamer! The trees bear their seasonal banners of gold and flame. The wind blows as a herald through the court of leaves. Hoggy, our noble companion, is in excellent spirits. And the longer nights give us more hours for ghostly vigil.",
        "choices": [
          {
            "text": "Seasonal banners are splendid.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy makes a noble companion.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Ghostly vigil suits the night.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Splendid indeed! Each tree flies its own house colors. The oak wears gold like a knight of the harvest. The palm remains green, faithful as a squire.",
        "choices": [
          {
            "text": "Knights of the harvest are noble.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Faithful green squires are loyal.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "The forest is a colorful court.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Noble and golden, riding the wind to their rest. A hero's end for every leaf.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Loyal squires hold the green line. They do not seek glory. Their steadiness is their honor.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "A colorful court indeed, and we are all welcome to admire it, peasant and noble alike.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "A most noble companion. His trot is lively, his ears are aloft, and his spirit is merry. I would ride beside him into any leafy battle.",
        "choices": [
          {
            "text": "Merry spirits win battles.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Leafy battles are the best kind.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy is a worthy ally.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Merry spirits win before the battle even begins. Hoggy's joy is his armor.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "The best kind, fought with color and breeze. No wounds, only piles of leaves.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "A worthy ally and a jolly one. I would trust him at my side in any season.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "It suits us well. The night is long, the air is cool, and a ghost may keep watch without the sun hurrying him along. I shall patrol the stars.",
        "choices": [
          {
            "text": "Patrolling stars is a noble duty.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun should not rush ghosts.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Cool nights are made for vigil.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A noble duty. The stars need watching, and I am happy to volunteer my eternity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "The sun should learn patience. Ghosts have unfinished observing to do.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Vigil in cool air is refreshing. The night rewards attention with quiet wonders.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Flutter": {
      "start": {
        "text": "H-hello, Dreamer. The wind is a little... tingly today. It moves my gauze around. The trees look warm, like they're wearing soft sweaters. Hoggy made a happy snort when he walked by, and the nights are longer now. I like it when things get quieter.",
        "choices": [
          {
            "text": "Tingly wind sounds nice.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Tree sweaters are a cute image.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Quieter nights are gentle.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Nice if you don't mind being touched by air. I don't mind. It just makes me feel very floaty and seen at the same time.",
        "choices": [
          {
            "text": "Floaty and seen is a good feeling.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Air touches everyone gently.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Being noticed by wind is sweet.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Good. I feel less invisible when the wind moves me. It's like the breeze says 'here you are.'",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Gently. The wind never grabs. It just brushes by like a polite friend.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Sweet. Even shy ghosts can be noticed by the wind. That's nice to know.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cute. Like the trees are trying to stay warm while they change their minds about being green. I hope they're cozy.",
        "choices": [
          {
            "text": "I hope they're cozy too.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Changing minds is okay.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Warm colors look warm.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "I hope so too. Cozy trees make cozy shadows and cozy shadows make cozy ghosts.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Okay. The trees can be green, then gold, then gone. They don't have to decide all at once.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Warm colors do look warm. Like little fires that don't burn. I want to stand near them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Gentle. Less busy. The longer nights feel like the island is tucking itself in. I like tucking-in sounds.",
        "choices": [
          {
            "text": "Tucking in is cozy.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Less busy is peaceful.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Night sounds are soft.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Very cozy. The island pulling a dark blanket over its shoulders. Safe and quiet.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Peaceful. Less people running around. More time to be a small ghost near a lantern.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Soft. The night makes everything softer, even my own whisper. I like that.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Giggles": {
      "start": {
        "text": "Hi Dreamer! The trees are having a color party and the wind is the music! Hoggy was dancing in the leaves and it made me giggle so much I floated in a circle. And the nights are longer, so there are more stars to laugh at!",
        "choices": [
          {
            "text": "Color parties are fun.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy dancing in leaves is hilarious.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Stars are good at being laughed at.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun because nobody had to plan it. The trees just showed up in gold and red and orange and started being pretty. The wind brought confetti made of leaves.",
        "choices": [
          {
            "text": "Leaf confetti is the best.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Unplanned parties are the happiest.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Gold and red are excellent colors.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Best confetti because it falls slowly and you can watch every piece. Then it turns into ground decoration. Very efficient.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Happiest because nobody worries about invitations. You just see pretty trees and know it's party time.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Excellent colors. If I were a tree I'd wear all three at once. I'd be the most party tree.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hilarious! His little legs go everywhere and his ears flap and he makes happy snorts. I tried to dance like him but I just spun around because I'm floaty.",
        "choices": [
          {
            "text": "Floaty dancing counts.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Happy snorts are musical.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy is a dance teacher.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Floaty dancing is my specialty. I don't have legs, so spinning is basically my version of tap dance.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Musical! Hoggy's snorts could be a song. It would be called 'Happy Hoggy in the Leaves.' I'd listen on repeat.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hoggy teaches by being himself. That's the best teaching method. I'd give him a gold star if I had one.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They don't mind! Stars just twinkle and let you giggle. They're very good listeners. And they stay up extra late in the longer nights.",
        "choices": [
          {
            "text": "Twinkling is star laughter.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Extra late stars are generous.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stars listen well.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Star laughter. I knew it. When I giggle at them they probably giggle back in twinkles.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Generous stars. Staying up late just so we have more time to look. That's friendship.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Good listeners. They never interrupt. They just blink and glow and make everything feel okay.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Mochi": {
      "start": {
        "text": "Hiya, Dreamer! The grass is crunchy under my paws in a good way. The trees dropped red and gold leaves and I want to make a pile. Hoggy was hopping too, kind of. And the nights are longer, so I get more time to dream about carrots under the stars.",
        "choices": [
          {
            "text": "Crunchy grass is excellent.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Leaf piles are the best goal.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy hopping is cute.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Excellent because it says 'hello paw' every time I hop. It's like the ground is giving me tiny high-fives.",
        "choices": [
          {
            "text": "Ground high-fives are friendly.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Tiny high-fives count.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Crunchy hellos are cute.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Friendly ground. It makes every hop feel celebrated. I appreciate a supportive lawn.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Tiny high-fives are my favorite size. Big high-fives are too much. Tiny ones are just right.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Cute and crunchy. The island has good texture today.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Best goal! I could jump in the pile and leaves would go everywhere. Then I'd hop out and do it again. Forever.",
        "choices": [
          {
            "text": "Forever jumping sounds fun.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Leaves going everywhere is the point.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You'd be the leaf pile champion.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Forever jumping would make me the happiest rabbit. Though eventually I'd need a snack break. Carrots are important.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "The point is absolutely leaves everywhere. Order is boring. Chaos of leaves is joyful.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Leaf pile champion is a title I'd wear proudly. Maybe on a little leaf crown.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Cute! He doesn't hop like a rabbit, more like a bouncy rock. But happy. Very happy.",
        "choices": [
          {
            "text": "Bouncy rock style is unique.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Happy hopping is the goal.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy has his own hop.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Unique and effective. He gets where he's going and he looks cheerful doing it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "The goal of all hopping is happiness. Hoggy understood this before I did.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "His own hop, yes. We all have our way of moving. His way is round and snorty and wonderful.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Shadow": {
      "start": {
        "text": "Oh. You. I was just enjoying the sun through the red leaves. Not waiting. The wind is crisp, which is acceptable. Hoggy trotted past making happy noises. And the nights are longer, so I have more time to ignore things in the dark.",
        "choices": [
          {
            "text": "Red-leaf sun is nice.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's noises are cheerful.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Ignoring things in the dark sounds peaceful.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Nice. The leaves filter the sun into little warm spots. I rotate between them. It's a full-time job that I pretend isn't a job.",
        "choices": [
          {
            "text": "Warm spot rotation is important.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Pretending it's not a job is cat style.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Red filters make good light.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Important and undervalued. A warm spot must be earned and defended, then abandoned when it cools. Such is life.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Cat style. If I admitted it was a job, I might have to thank the sun. We don't do that.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Good light. Warm, red-tinted, slightly dramatic. It matches my mood on better days.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cheerful and slightly too loud. I didn't look at him. I simply happened to face the direction he was trotting. Coincidence.",
        "choices": [
          {
            "text": "Coincidence happens.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Not looking is still awareness.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy earns his loud joy.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Coincidence. Repeated coincidence. Several times. But still technically not watching.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Awareness without engagement. The highest form of acknowledgement, if you ask me.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "He earns it. If I were that round and happy, I'd probably make noise too. Hypothetically.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Peaceful. Darkness doesn't ask anything. It just lets me exist without the sun trying to make me cheerful. I can be whatever mood I want.",
        "choices": [
          {
            "text": "The sun does try hard.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Darkness is a neutral friend.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Whatever mood is valid.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "The sun tries very hard. 'Look at me, I'm bright.' We see you. Relax.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A neutral friend. Darkness doesn't cheer you up and doesn't bring you down. It just is. I respect that.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Valid. In the dark I can be aloof, grumpy, or secretly content. No witnesses.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Raven": {
      "start": {
        "text": "Cool season, Dreamer. The trees are surrendering their colors to the wind. The air is sharp and honest. Hoggy seems oddly pleased by all this decay. And the nights stretch longer, giving the dark more room to breathe.",
        "choices": [
          {
            "text": "Decaying colors are beautiful.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's pleasure is a puzzle.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Dark needs room to breathe.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Beautiful the way fading things can be. A leaf at its brightest is closest to its end. There's a poem in that, and it's not a happy one, but it's true.",
        "choices": [
          {
            "text": "True poems are enough.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Brightest near the end is tragic.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Fading has its own color.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Enough. A poem doesn't need to be happy to be good. It only needs to be honest.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Tragic and familiar. Everything bright eventually falls. That's why we notice it while it's here.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Its own color, yes. Fading isn't gray. It's gold, rust, blood, bronze. The palette of letting go.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "A puzzle. He snorts, trots, wiggles. One would think the cooling world would sober him. Instead he flourishes.",
        "choices": [
          {
            "text": "Some creatures flourish in decline.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy doesn't read the mood.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Joy ignores logic.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Some do. They find their rhythm in the cooling, the darkening, the ending. Hoggy might be one of those.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Hoggy doesn't read the mood. He reads the grass, the breeze, the moment. That might be wiser.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Logic is overrated. Joy has its own climate and Hoggy lives there year-round.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "It does. Darkness expands like a slow inhale. The stars have more sky to fill. The quiet has more time to settle.",
        "choices": [
          {
            "text": "Stars appreciate the space.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet settling is luxurious.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "The night inhales slowly.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. More room to shine without competing with daylight. The night is generous to small lights.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Luxurious. Quiet that doesn't have to rush. I would live inside that inhale if I could.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Slowly. The world shouldn't gasp into darkness. It should ease in, gracefully, like a final bow.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Newton": {
      "start": {
        "text": "Ah, Dreamer. A fine Cool season evening, or rather, a longer one. I've been noting the tree pigment transitions, the wind's laminar flow over fallen leaves, and the observable increase in Hoggy's cheerful behavior. The nights are measurably lengthier, which suits my schedule.",
        "choices": [
          {
            "text": "Tell me about pigment transitions.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's cheerfulness is measurable.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Longer nights suit owls.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "The transitions follow a warm spectrum: green chlorophyll degrades, revealing carotenoids and anthocyanins. In simpler terms, the trees are showing off their hidden paint.",
        "choices": [
          {
            "text": "Hidden paint is a fun idea.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees plan their colors.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Warm spectrum sounds scientific.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Fun and accurate. The trees had these colors all along, hiding under the green. Now they reveal themselves like shy artists.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "They plan by chemistry, which is a kind of planning. I respect a tree with a schedule.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Scientific and beautiful. Science doesn't ruin beauty. It tells us why the beauty exists.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Indeed. His ear angle, trot cadence, and tail elevation all increased. I plotted it on a mental graph. The trend is upward and adorable.",
        "choices": [
          {
            "text": "Adorable data is good data.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Tail elevation is a metric.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Upward trends are hopeful.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Good data should make you smile. Hoggy's graph is the most smile-inducing dataset on the island.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A metric, yes. Tail elevation correlates strongly with mood. Hoggy's tail is basically a happiness thermometer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hopeful and quantified. If joy can trend upward, maybe the whole season can too.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do. More darkness means more observation time. I can catalog cloud shapes at dusk, star positions at midnight, and tree silhouettes at dawn. Very efficient.",
        "choices": [
          {
            "text": "Efficient darkness is useful.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Owls are natural night accountants.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "More time is more science.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Useful. Darkness is not wasted time. It's data collection time with fewer distractions.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Accountants of the night. We track stars, silence, and the occasional mysterious rustle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "More time, more science, more wonder. The longer night is a gift to the curious.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Lotus": {
      "start": {
        "text": "The wind carries the old leaves, Dreamer. The trees release what they held all summer. Hoggy is happy, and so the island is happy. The nights grow longer, inviting us to rest like stones cooling in the dark.",
        "choices": [
          {
            "text": "Releasing is part of growing.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's happiness ripples outward.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Cooling stones is a good image.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "It is. A tree cannot keep every leaf. Letting go makes room for what comes next, even when what comes next is not yet visible.",
        "choices": [
          {
            "text": "Invisible next things are okay.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Room is made by letting go.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Trees teach patience.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Okay. We do not need to see the next thing to trust that it will come.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Room made by release. The tree stands lighter. The sky shows through. There is new space.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Trees teach patience by example. They do not pull their leaves back. They let the wind take them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Yes. His joy is a small stone dropped in still water. The circles reach further than he knows.",
        "choices": [
          {
            "text": "Small joys reach far.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Ripples are quiet magic.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy affects the island.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Far. A happy hog can warm a whole clearing without knowing he is doing it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Quiet magic, yes. The water doesn't announce the stone. It simply holds the ripples.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "He affects it more than he knows. His trot, his snort, his easy joy. The island notices.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Cooling stones rest without effort. They do not ask the night to be shorter. They simply settle, and that is enough.",
        "choices": [
          {
            "text": "Settling is enough.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Stones don't rush the night.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Cooling is peaceful.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Enough. To settle is not to fail. It is to allow the world to hold you.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Rushing is a human habit. Stones and islands and hogs know better.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Peaceful. The warm day gives its heat to the night, and the night accepts it gently.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Squire Paws": {
      "start": {
        "text": "Fair Dreamer! The leaves have turned to heraldic gold and crimson. The wind carries them like battle flags across the field. Hoggy is in merry spirits, trotting with ears aloft. And the longer nights give us more hours for honorable rest.",
        "choices": [
          {
            "text": "Heraldic leaves are splendid.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy in merry spirits is good.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Honorable rest suits the night.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Splendid! Each leaf is a tiny banner of the season. The oaks wear gold like knights of autumn. The palms stay green, loyal squires to the end.",
        "choices": [
          {
            "text": "Knights of autumn are noble.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Loyal green squires deserve praise.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Tiny banners make a brave forest.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Noble and golden, riding the wind to their rest. Each leaf dies a hero's death.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Praise to the green squires! They hold their color while others change. Steadfastness is its own glory.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Brave indeed. A forest full of banners is a forest ready for any seasonal adventure.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Good indeed. His trot has purpose, his snout points bravely, and his ears catch every breeze like little flags. A stout companion for any quest.",
        "choices": [
          {
            "text": "Brave snouts are important.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "A stout companion is valuable.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Ear flags catch the wind well.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Important for sniffing out adventure. A pointed snout is a brave snout.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Valuable. I would follow Hoggy into any pile of leaves, even if it meant getting leaves in my tabard.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Very well. His ears flap with honor and the wind respects them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "It does. After a day of patrolling butterflies and inspecting picnic blankets, the longer night is a reward. I shall dream of heroic naps.",
        "choices": [
          {
            "text": "Heroic naps are noble.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Patrolling butterflies is important work.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Rewards should be long.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Noble. Even heroes need rest, and a nap after duty is the most heroic nap of all.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Important and dignified. Butterflies must be monitored for cuteness levels.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Long rewards are the best. The night gives us extra hours because we earned them by being good islanders.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Pebble": {
      "start": {
        "text": "H-hello, Dreamer. The leaves are... um... falling in pretty colors. I saw one land right next to my shell. The wind made it spin. Hoggy walked by and I think he smiled? Turtles are bad at telling hog smiles. The nights are longer now. I don't mind. It's quieter.",
        "choices": [
          {
            "text": "Pretty falling leaves are nice.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy probably smiled.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Quieter nights are gentle.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Nice. They land softly, most of the time. One almost landed on my head but the wind changed its mind. That was polite of the wind.",
        "choices": [
          {
            "text": "Polite wind is good wind.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Almost-head leaves are close calls.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Soft landings are turtle-friendly.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Good wind. It could have dropped the leaf on me but it chose kindness. I remember kindness from the wind.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Close calls make good stories. 'Once a leaf almost landed on me.' Very dramatic, for a turtle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Turtle-friendly landings are important. Hard landings startle me. Soft ones are welcome.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Probably. His mouth looked... smile-shaped. I don't know hogs well. But he seemed happy, so I'll say yes. He smiled.",
        "choices": [
          {
            "text": "Happy hogs look smile-shaped.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "It's nice not knowing for sure.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Saying yes to smiles is kind.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Smile-shaped and happy. That's enough evidence for me. Verdict: Hoggy was smiling.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Not knowing is okay. Mystery is friendlier when it's about smiles.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Kind to say yes. I think Hoggy would appreciate being smiled at, even if we can't prove he smiled back.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Gentle. Less hustle. I can stay still for longer without anyone wondering why. In longer nights, stillness is normal.",
        "choices": [
          {
            "text": "Stillness is normal at night.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Longer nights mean longer stillness.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Not being wondered about is cozy.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Normal and comforting. The night doesn't expect you to move quickly. It understands turtles.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Longer stillness is a gift. I can practice being a rock with a shell for more hours.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Cozy. Quiet and unobserved. Just me, the leaves, and the slowly cooling ground.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sunny": {
      "start": {
        "text": "Hello, friend! Cool season is here and the wind is flying the leaves around like little flags! Hoggy is doing his happy trot and the nights are longer, which means more star-time. I flew loops around a gold tree and it was beautiful!",
        "choices": [
          {
            "text": "Leaf flags are fun.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's happy trot is the best.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Star-time is important.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun because they wave as they fall. I tried to catch one but my wing just pushed it. Leaves are very good at not being caught.",
        "choices": [
          {
            "text": "Uncatchable leaves are playful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Waving leaves are friendly.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Catching is optional.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Playful and free. They wave hello and goodbye at the same time. Very talented.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Friendly leaves! I would wave back if I had leaf hands. I have wings instead, which are also good.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Optional. Catching isn't the point. The point is watching them dance on the way down.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Best! His ears go flap flap flap and his snout points up like he's smiling at the sky. I want to fly next to him but I can't go that slow.",
        "choices": [
          {
            "text": "Flap flap flap is a good sound.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Smiling at the sky is adorable.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Flying slow is hard for parrots.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A very good sound. If I could make flap-flap sounds with my wings I'd do it all day.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Adorable and inspiring. I think I smiled at the sky too, just copying him.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Hard for parrots. We're built for zooming, not trotting. But I can do happy circles above him instead.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Important! Stars only come out when it's dark, and longer nights mean more dark, which means more stars. It's perfect math.",
        "choices": [
          {
            "text": "Star math is perfect math.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "More dark is more stars.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stars are worth waiting for.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Perfect math. The island does the equation for us. More night equals more sparkle. Easy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "More dark is more opportunity for tiny lights. I love opportunities that twinkle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Worth it. Every minute of darkness is worth it when the stars come out and say hello.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Fluffernox": {
      "start": {
        "text": "Hiii, Dreamer! The trees put on warm sweaters made of red and gold leaves. The wind is helping them show off. Hoggy was trotting around with his ears all flappy-happy. And the nights are longer, so the moon gets more time to be round and pretty!",
        "choices": [
          {
            "text": "Tree sweaters are adorable.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Flappy-happy ears are the best.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "The moon deserves more time.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Adorable! I want to hug a tree but I might get leaves stuck in my fuzz. Leaf fuzz is a new fashion I didn't know I needed.",
        "choices": [
          {
            "text": "Leaf fuzz is a good look.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Hugging trees is friendly.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "New fashion is exciting.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Leaf fuzz is very natural fashion. Organic and seasonal. I'd wear it until it falls off on its own.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Friendly and soft. Trees probably like being hugged. They can't say so, but their leaves rustle nicer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Exciting! I love discovering new looks. Today: leaf fuzz. Tomorrow: maybe moss accessories.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Best! When Hoggy's ears flap, it's like he's trying to fly with his head. I tried flapping my arms but I'm too round for lift-off.",
        "choices": [
          {
            "text": "Head-flying is adorable.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Round friends are good friends.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy has flying ears.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Adorable head-flying. If his ears got any bigger he might actually take off. I'd cheer for him.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Round friends are the snuggliest. I'd rather be round and grounded than skinny and floating away.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Flying ears! What a superpower. He can feel the breeze twice as much as anyone.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Yes! The moon works hard all night. Longer nights mean she gets a longer shift, but she doesn't complain. She's a good moon.",
        "choices": [
          {
            "text": "Good moons don't complain.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Long shifts need appreciation.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "The moon is a hard worker.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Good moons deserve medals. Or at least a thank-you wave. I'm waving right now, in case she sees.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Appreciation is important. If you work all night, you should get thanked in the morning.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Hard worker. She glows all night and never asks for a break. The moon is basically the island's night-light hero.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Grumble": {
      "start": {
        "text": "Hmph. It's you. I was just making sure these fallen leaves land in a sensible pattern. Not because I care about pretty colors. The wind keeps disrupting my work. And Hoggy trotted past with that ridiculous happy face. The longer nights just give me more hours to be annoyed.",
        "choices": [
          {
            "text": "Leaf arrangement is important work.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's happy face is tolerable.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "More night hours are practical.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Important? Finally someone understands. If leaves fall wherever they want, the island looks messy. Someone has to impose order. Not that I'm passionate about it.",
        "choices": [
          {
            "text": "Orderly leaves look better.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Passion is a strong word.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Messy islands need heroes.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Better. A leaf that knows its place is a civilized leaf. Most leaves are barbarians.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Strong and slightly accurate. Let's say I have opinions. Strong opinions. About leaf geography.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Heroes is a lot. I prefer 'concerned citizen with claws.' But I'll accept the recognition.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Tolerable. His ears were practically vibrating. I did not smile. I simply rearranged my face in a less frowny configuration.",
        "choices": [
          {
            "text": "Less frowny is progress.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Vibrating ears are energetic.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy's joy is contagious.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Progress. I am now only mildly displeased. That's as close to smiling as I get before noon.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Energetic and undignified. But I suppose joy vibrates. Fine. His ears can do what they want.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Contagious? Don't be absurd. I have a strong immune system against cheer. Mostly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Practical. More darkness means fewer distractions. I can organize leaves without the sun glaring at me. The moon is more reasonable.",
        "choices": [
          {
            "text": "The moon is reasonable lighting.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Sun glaring is annoying.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Night organizing is efficient.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Reasonable. She lights the leaves without interrogating them. The sun asks too many questions.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Annoying. 'Look at me, I'm warm and bright.' Yes, we know. Please dim your enthusiasm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Efficient. Fewer interruptions, more leaf sorting. The night respects a monster on a mission.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Vesper": {
      "start": {
        "text": "Cool season arrives, Dreamer. The trees are bleeding color into the wind. Hoggy seems pleased by the decline, which I find strange. The nights grow longer and the dark has more space to stretch. It's almost elegant.",
        "choices": [
          {
            "text": "Bleeding color is poetic.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's pleasure in decline is strange.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Dark stretching is elegant.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Poetic and accurate. The leaves don't simply change. They surrender. Each one is a small, bright wound against the sky.",
        "choices": [
          {
            "text": "Surrender can be beautiful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Bright wounds are art.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "The sky holds them gently.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Beautiful surrender. The leaf does not fight the wind. It lets go, and in letting go becomes part of something larger.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Art that hurts a little. That's the best kind. It means the beauty mattered.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Gently. The sky doesn't drop them. It receives them. There's a difference.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Strange, or wise. Perhaps he understands that endings are just the world changing costumes. Most creatures fear the costume change.",
        "choices": [
          {
            "text": "Costume changes aren't scary.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy may be wiser than he looks.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Endings are rehearsals.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Not scary. Just different. Every season wears the island differently. We are allowed to change clothes too.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Wiser than he looks, probably. Hogs have a way of accepting what the rest of us analyze to death.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Rehearsals for what comes next. The leaf rehearses falling, then performs beautifully.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Elegant, yes. Darkness that expands without hurry. The stars become more visible simply because they have more room.",
        "choices": [
          {
            "text": "Stars like more room.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Slow expansion is luxurious.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Visibility is a gift of space.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. Crowded skies make small lights compete. Cool season gives everyone their own corner.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Luxurious. No rush, no announcement. The night simply unfolds like a velvet curtain.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A gift. We see more when there is less. The dark is generous that way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Gizmo": {
      "start": {
        "text": "Dreamer! I've been studying Cool season mechanics. Tree color change is triggered by daylight reduction and temperature drop. Wind speed increases leaf dispersal. Hoggy's joy levels correlate inversely with heat. And the nights are longer, which I've confirmed by staying up.",
        "choices": [
          {
            "text": "Explain leaf dispersal.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy-heat inverse correlation is interesting.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Staying up to confirm is dedication.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Leaf dispersal is straightforward: a falling leaf has mass, surface area, and an interaction with airflow. In dream terms, the wind takes the leaves on little field trips.",
        "choices": [
          {
            "text": "Field trips for leaves are cute.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Mass and surface area matter.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Dream terms make science nicer.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Cute and efficient. The wind acts as a transport system for leaves relocating to the ground.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "They do. A big flat leaf behaves differently than a small curled one. Science respects leaf diversity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Much nicer. 'Field trip' is friendlier than 'chaotic descent.' I prefer friendly science.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Interesting and replicable. As temperature decreases, Hoggy's trot frequency and ear activity increase. I've named it the Hoggy Thermodynamic Joy Constant.",
        "choices": [
          {
            "text": "That's a long name.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Joy constants are useful.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy is predictable in a good way.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Long but descriptive. I could abbreviate it to HTJC, but that sounds like a cleaning product.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Useful. If we know the temperature, we can predict Hoggy's mood. It's like a thermometer with trot.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Predictable in the best way. Reliable joy is underrated.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Dedication or insomnia. Either way, I have verified that darkness persists longer. I also counted stars. Results: many.",
        "choices": [
          {
            "text": "Many stars is a solid count.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Insomnia can be productive.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Verification is important.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Solid and approximate. 'Many' is a perfectly valid scientific quantity when you're tired.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Productive. The night gives you time to count things, and counting things is never wasted.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Important. If you don't check, the nights might be sneaking extra minutes past us. I'm keeping watch.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Ommmm": {
      "start": {
        "text": "The island is breathing out, Dreamer. The trees let their colors fall. The wind carries them away without keeping any. Hoggy is happy because he lives in the moment. And the longer nights give us time to sit with the dark.",
        "choices": [
          {
            "text": "Breathing out is a good image.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Living in the moment is Hoggy's gift.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Sitting with the dark is peaceful.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Yes. After the warm fullness of Saucy season, the island exhales. What leaves behind is quieter, lighter, more open.",
        "choices": [
          {
            "text": "Quieter islands are kind.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Lighter feels free.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Openness is a gift.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Kind. The island speaks more softly in Cool season, and we hear ourselves better.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Free. A tree that has let go stands lighter against the sky.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "A gift we often miss. Openness lets new things arrive, even if we don't know what they are yet.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "His gift. He does not wonder what season comes next. He simply trots, sniffs, and is glad. We can learn from this.",
        "choices": [
          {
            "text": "We can learn from Hoggy.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Not wondering is a relief.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Gladness by example.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "We can. Teachers come in all shapes. Some are round and snort and walk on four feet.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A relief. The future will arrive whether we wonder about it or not. Hoggy knows this.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "By example. He shows us that gladness can be simple, immediate, and whole.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Peaceful if we allow it. The dark does not ask us to solve anything. It just holds the space while we rest.",
        "choices": [
          {
            "text": "The dark holds space well.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Rest is a kind of listening.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "We don't have to solve the night.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Well. It doesn't push, pull, or demand. It simply is, and that is enough.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Listening to rest. We hear what we need when we stop chasing the day.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "No. The night solves itself. We only need to be present while it does.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Lord Roar": {
      "start": {
        "text": "Fair Dreamer! The trees have donned their autumnal heraldry. The wind blows a royal trumpet through the changing leaves. My noble steed Hoggy is in excellent cheer. And the longer nights give us more time for noble star-gazing.",
        "choices": [
          {
            "text": "Autumnal heraldry is magnificent.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy as your noble steed is perfect.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Noble star-gazing is a fine pastime.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Magnificent! Gold and crimson banners upon every branch. The forest is a court in session, and each tree attends in its finest colors.",
        "choices": [
          {
            "text": "A forest court is splendid.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Finest colors are worth attending.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Every branch is a banner.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Splendid and just. Every tree holds its banner high before laying it down for the season.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Worth attending. A tree in color is a tree in ceremony.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Every branch, every banner. The forest marches into winter with flags flying.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Perfect indeed. Though he is small, his spirit is vast. He trots with the pride of a warhorse and the joy of a festival hog.",
        "choices": [
          {
            "text": "Small steeds can be mighty.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Pride and joy together are noble.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Festival hog is a good title.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Mighty indeed. Size is not the measure of a steed. Heart and trot are.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Noble. Pride without joy is cold. Joy without pride is scattered. Hoggy has both.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Festival hog, yes. He would lead any parade, provided it included snacks and naps.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "A fine pastime. The stars are the distant torches of the night realm. To gaze upon them is to pay respects to the sky.",
        "choices": [
          {
            "text": "Stars are sky torches.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Paying respects to the sky is polite.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "The night realm is vast.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Torches that need no fuel. The sky lights itself for our admiration.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Polite and proper. We honor the night by looking up and saying 'well done, sky.'",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Vast and full of distant kingdoms. Each star a castle, each castle a story.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Snug": {
      "start": {
        "text": "Oh. Hi, Dreamer. I was watching the leaves fall from under my rock. They make a soft sound when they land. Hoggy walked by and I saw his feet do a happy little dance. The nights are longer now. I like that. More time to hide quietly.",
        "choices": [
          {
            "text": "Soft landing sounds are nice.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy's happy feet are cute.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Quiet hiding time is good.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Nice. Like a tiny thump that doesn't startle anyone. Leaves know how to land gently when they want to.",
        "choices": [
          {
            "text": "Gentle leaves are polite.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Tiny thumps are cozy.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Non-startling sounds are underrated.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Polite leaves. They fall, they land softly, they don't make a scene. I respect that.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Cozy and small. The kind of sound that makes you feel safe under a rock.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Underrated. Loud sounds get all the attention, but soft sounds are the ones that keep you calm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cute. His trot had a little bounce, like the ground was too happy to stay still under him.",
        "choices": [
          {
            "text": "Happy ground is a fun idea.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Bouncy trots are joyful.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy's feet have feelings.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Fun. Maybe the ground really is happy. It gets to hold all the pretty leaves.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Joyful and a little silly. I like silly joy. It doesn't ask you to be anything.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They do. Hoggy's feet know things before his head does. Feet are honest.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Good. When the night is longer, nobody rushes. I can stay under my rock and just be there. Being there is enough.",
        "choices": [
          {
            "text": "Being there is enough.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Unrushed time is a gift.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Rocks are good hiding spots.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Enough. I don't have to do anything. I can just be Snug, under a rock, in the longer night.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A gift. More minutes to be small and safe. I accept every single one.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Good hiding spots. Rocks are steady and don't ask questions. They're very polite shelters.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Gigglegrow": {
      "start": {
        "text": "Dreamer! Cool season is bouncing in! The trees are wearing red and gold and orange like a big cozy sweater. The wind is throwing leaves around and Hoggy is dancing through them. And the nights are longer, so I can bounce under the stars more!",
        "choices": [
          {
            "text": "Cozy tree sweaters are great.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Hoggy dancing through leaves is hilarious.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Bouncing under stars is the best.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Great! I want to wear a sweater made of leaves too, but I'd probably lose it mid-bounce. Leaf sweaters are not very bounce-proof.",
        "choices": [
          {
            "text": "Bounce-proof fashion is important.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Losing leaf sweaters is funny.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "You'd look cute in leaves.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Important. A bouncy monster needs durable outfits. Maybe moss would hold better than leaves.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Funny and fine. Losing a leaf sweater mid-bounce is just part of the fashion cycle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Cute, right? I'd be a walking leaf pile. The best kind of monster.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hilarious! He trots and leaves fly up and he tries to catch them with his snout. It's like he's playing tag with the wind.",
        "choices": [
          {
            "text": "Tag with the wind is a good game.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Snout-catching leaves is talented.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Hoggy plays well.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Good game, though the wind always wins because it can be everywhere. Hoggy doesn't mind. He just keeps playing.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Talented! I can catch things with my whole body because I'm big and round. Hoggy uses precision.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Very well. He knows the rules: run, snort, let leaves win sometimes. Perfect game design.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Best! Stars look extra sparkly when I bounce. Probably because I'm moving, but I like to think they bounce a little when they see me.",
        "choices": [
          {
            "text": "Stars probably bounce a little.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Moving makes stars sparklier.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Bouncing and stars go together.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A little. Maybe a tiny twinkle-wiggle. I like believing the stars are happy to see me.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Probably. Movement adds excitement. Static stars are still beautiful, but bouncing stars feel like friends.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Together forever. If I could bounce to the moon I'd bring snacks and invite everyone.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    }
  },
  "Saucy": {
    "Piko": {
      "start": {
        "text": "Dreamer! The sun made everything extra today. The flowers are brighter, the sand is warmer, and my heart feels like a little marshmallow. Do you love Saucy season too?",
        "choices": [
          {
            "text": "I love Saucy season too!",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Marshmallow hearts sound cozy.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Everything does look extra today.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "You do? Then we can love it together! Love makes warm days feel even warmer. That's probably science. Friendly science.",
        "choices": [
          {
            "text": "Friendly science is good science.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm love is the best equation.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "We should celebrate extra.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Good science is when your heart gets warmer and nobody has to take notes. I am taking mental notes anyway. They are all smiley faces.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The best equation. Warm plus warm equals the snuggliest sum. I did the math in my heart and the answer is hugs.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Celebrate by smiling at flowers and rocks and clouds. Everything gets included. That's the best kind of party planning.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cozy because warm feelings and warm sun stack on top of each other. My heart is basically a toasted marshmallow now.",
        "choices": [
          {
            "text": "Toasted marshmallow hearts are sweet.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm feelings stack nicely.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You have a sunny heart.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Sweet and slightly gooey in a good way. If you listen closely, my heart makes a tiny crackly sound like a campfire friend.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. Warm feelings don't fall over. They pile up into a soft tower of nice. I am inside that tower right now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Sunny heart! I like that. It means the sun lives in here a little bit, helping me glow even when I am not outside.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Extra is the perfect word. Extra sun, extra sparkle, extra happy. I want to collect all the extras in a basket.",
        "choices": [
          {
            "text": "Collect extras in a basket.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Sun sparkle is precious.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Extra happy is the goal.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A basket of extras would be heavy but happy. Sunbeams are light though. I could carry thousands of those.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Precious sparkle! I keep it in my eyes so I see everything shiny. My eyes are basically sparkle jars now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Extra happy is better than regular happy. It's like happy wearing a fancy hat. Saucy season is the fancy hat.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Rivet": {
      "start": {
        "text": "Ugh, Saucy season. The heat is everywhere and the sun won't stop showing off. I don't know why everyone is smiling about it. Not that I'm complaining or anything.",
        "choices": [
          {
            "text": "The sun is showing off.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "You can complain if you want.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Not complaining is noted.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Showing off is exactly right. Look at it, all bright and round, demanding attention. I refuse to give it the satisfaction. Much.",
        "choices": [
          {
            "text": "Refusing attention is power.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun is vain.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Unimpressed is a strong stance.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Power is when you look at the sun and squint meaningfully. The sun cannot read expressions. But it feels the energy. Probably.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Vain and successful. I respect the hustle even if I won't applaud it. The sun does not need my applause, which is annoying.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Strong and sweaty. My stance is glistening. I will stand here, unimpressed, until the season apologizes or the shade returns.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "I don't need permission. But I also don't need to complain. I'm just stating facts. The fact is: it's hot and I am unimpressed.",
        "choices": [
          {
            "text": "Facts are allowed.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Heat is a fact.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Restraint is admirable.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Allowed and necessary. If nobody states the facts, the sun will think it won. It didn't win. It just exists loudly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Heat is a fact. A warm, oppressive, everywhere fact. But still just a fact. I will outlast it with dignity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Admirable is a strong word. Let's say my restraint is functional. It keeps me from saying things I would pretend I didn't mean.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Noted? Fine. I am a very noted non-complainer. I have medals. Invisible medals. For excellence in restraint.",
        "choices": [
          {
            "text": "Invisible medals still count.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Excellence is excellence.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "You handle heat well.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They still count. I have a whole imaginary trophy room. It is dusty and poorly lit and I am very proud of it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Excellence with invisible proof. The highest level. Nobody can take it away because nobody can find it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Well? I do. I handle it with moderate elegance and maximum eye-rolling. That is my technique and it is patented.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Shade-7": {
      "start": {
        "text": "Saucy season drapes the island in golden suffering, Dreamer. The sun is too sincere. I prefer the night, when the heat at least has the decency to apologize with stars.",
        "choices": [
          {
            "text": "Golden suffering is a beautiful phrase.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The night is a better apology.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Sincere suns are exhausting.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Beautiful and accurate. The sun gives warmth and takes comfort. That is the oldest tragedy. I shall write a poem about it.",
        "choices": [
          {
            "text": "Poems make heat meaningful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Tragedy fits Saucy season.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Beauty with discomfort is art.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Meaningful suffering is the only good kind. If I must sweat, I will sweat with metaphors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Tragedy everywhere. The wilting leaf, the thirsty rock, the robot whose chassis is too warm. All of it belongs in verse.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Art often hurts a little. Saucy season is a masterpiece of discomfort. I admire it from beneath my metaphorical black umbrella.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Better apology indeed. The night arrives quietly, cools the stones, and covers the sky with distant lights. That is manners.",
        "choices": [
          {
            "text": "Night has good manners.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Cool stones are a gift.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Distant lights are kind.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Manners matter. Day shouts, night whispers. I prefer whispers. They do not make me perspire.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A gift from the dark. Stones that were burning at noon become soft and cool. I rest my thoughts on them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Kind because they do not demand attention. They simply shine from far away and let you look if you want to.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Exhausting because it offers no mystery. 'Here I am,' it says, 'warm and bright and unavoidable.' How dreary.",
        "choices": [
          {
            "text": "Mystery is underrated.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun has no subtlety.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Dreary brightness is a mood.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Underrated and endangered. The sun would eliminate mystery entirely if it could. I resist by admiring shadows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "None at all. It arrives, glows excessively, and expects gratitude. I offer a polite nod and retreat indoors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A mood I know well. Bright, relentless, unavoidable. Like an acquaintance who talks too loudly at gatherings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Cypher": {
      "start": {
        "text": "Dreamer! Saucy season has activated some fascinating behaviors. The cicadas are louder, the crabs are more active at dawn, and the shade temperature is measurably cooler than the sun temperature. I have data.",
        "choices": [
          {
            "text": "Data makes everything better.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Cicadas as thermometers is clever.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Tell me more Saucy facts.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Better and also reliable. For example: butterflies prefer flowers during Saucy mornings. I counted six before noon. Sample size small but promising.",
        "choices": [
          {
            "text": "Six butterflies is promising.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Sample size can grow.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Morning research is cozy.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Promising! Tomorrow I will count again. Maybe seven. Maybe eight. Science is just counting things until patterns appear.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It can. I will expand my butterfly observation zone. If I stand very still, they might include me in their survey.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Very cozy. Warm air, soft breeze, tiny wings. The best laboratory is one where you can also nap.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Clever and loud. The warmer it gets, the more they announce it. I appreciate the public service.",
        "choices": [
          {
            "text": "Loud thermometers are helpful.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Public service deserves thanks.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You counted them carefully.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Helpful and honest. They don't hide the temperature. They broadcast it with enthusiasm and slightly too much volume.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Thanks are scientifically appropriate. Good data should be acknowledged, even if the source is a bug.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Carefully and quietly. Butterflies are shy witnesses. If you move fast, they leave and take their data with them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "More facts! Sea turtles nest during warm seasons, cicadas buzz louder as temperature rises, and warm air holds more story potential.",
        "choices": [
          {
            "text": "Warm air holds stories.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Turtles know the season.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stories make research warmer.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Stories about where warmth goes and who likes it. The answer is: most things, briefly. Then shade becomes the hero.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They do. Their nesting schedule is older than the island's name. I admire any creature with seasonal punctuality.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They do. Research without stories is just numbers. Stories without research is just guessing. Together they are perfect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Om-Bit": {
      "start": {
        "text": "The Saucy sun does not ask permission, Dreamer. It simply arrives and warms what it touches. I am trying to be like the sun: present, without apology.",
        "choices": [
          {
            "text": "Presence without apology is strong.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Stillness is hard in heat.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Being present is enough.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Strong but gentle. The sun does not explain itself. It shines. I am learning to simply be, without offering reasons.",
        "choices": [
          {
            "text": "Gentle strength is best.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Simply being is enough.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "No reasons needed.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Best because it does not push. The sun is strong but it does not argue. I try to be the same way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Reasons are for journeys. Being is for arrivals. I have arrived at this warm afternoon.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hard but worth practicing. When the body slows, the attention wakes up. I see more insects, more shadows, more small kindnesses.",
        "choices": [
          {
            "text": "Slowing down is wisdom.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Attention wakes up when the body rests.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Small kindnesses matter.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Wisdom earned through sweat. The body reminds the mind that haste is not always progress.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "It does. When I stop moving, the world keeps moving around me. I become the still point and watch the beauty orbit.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They matter most. A shared glance, a small shade, a moment of patience. These are the real currency of the island.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Here and now is complete.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The season is a guest.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Conversations can be quiet.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Complete and sufficient. I do not need to add anything. The warm afternoon includes me already.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A guest that stays for a while. I do not control when it leaves. I only practice hospitality while it remains.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They can. Quiet conversations are often the truest. Words can wait. Presence speaks first.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sir Cogs-a-Lot": {
      "start": {
        "text": "Hail, fair traveler! Saucy season has cast its warm banner across the realm, and even the stones glow with noble heat. 'Tis a fine day to seek the shade of a loyal tree and speak of summer deeds.",
        "choices": [
          {
            "text": "Noble heat is a fun idea.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Shade trees are loyal.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Summer deeds need telling.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun and true! The heat does not sneak. It arrives with fanfare, like a champion entering the courtyard. We must meet it with grace.",
        "choices": [
          {
            "text": "Meeting heat with grace is chivalry.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Fanfare makes heat feel royal.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Grace is the best armor.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Chivalry in every drop of sweat. A true knight faces the day with dignity, even when the day is very warm and very bright.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Royal heat! I shall address it as 'Your Warmness' and bow before seeking shade. Even the sun enjoys good manners.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "The best armor is composure. It does not block heat, but it makes heat less embarrassing. A noble face is always cooler.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Loyal indeed. A good tree offers shade without asking for tribute. I often knight such trees in my mind. Sir Leaf, Sir Branch.",
        "choices": [
          {
            "text": "Sir Leaf and Sir Branch are good names.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees deserve titles.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Mind-knighting is valid.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Good names for good trees. Sir Leaf is broad and generous. Sir Branch is sturdy and patient. Both have served the realm well.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. They hold the soil, shelter the birds, and drop shade upon the weary. Titles are the least we can offer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Valid and frequent. I have an entire court in my head. The wild hog is a baron. The flowers are ladies-in-waiting.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do! The swimming of fish, the marching of ants, the sunning of rocks. Every small deed becomes legend in the right light.",
        "choices": [
          {
            "text": "Small deeds make good legends.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The right light helps everything.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Every season has its tales.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Good legends because they are honest. A fish swims because it must. An ant marches because the colony needs it. Noble simplicity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. Warm light flatters nearly everything. Stones look rich, leaves look gold, and even sand appears regal.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Every season, yes. Saucy season's tales are of endurance, shade, and the brave wild hog seeking cool mud.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Tinker": {
      "start": {
        "text": "Oh. Hi, Dreamer. I was... I was watching the warm light on the water. It makes little gold paths. I think the sea is showing off, but quietly.",
        "choices": [
          {
            "text": "Gold paths on water are pretty.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Quiet showing off is fine.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "You notice beautiful things.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Pretty and shy. The sun throws light onto the water and the water catches it for a second, then lets it go. Like a gentle game.",
        "choices": [
          {
            "text": "Gentle games are nice.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The water plays with light.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Pretty things feel like gifts.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Nice because nobody wins. The light and water just take turns. It's a game where everyone is happy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It does. The water catches the sun and then passes it along. Very polite. I would also like to be that polite.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Gifts from the whole afternoon. The sea, the sun, and the quiet all worked together to make something pretty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Fine because it doesn't ask for anything. The sea just sparkles and hopes someone notices. I noticed. I am very proud of noticing.",
        "choices": [
          {
            "text": "Noticing is a skill.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Pride in noticing is sweet.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet sparkle matters.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Skill and also kindness. You have to slow down enough to see small sparkle. I am good at slowing down.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Sweet pride. Noticing is one of my best things. I don't say much, but I see plenty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "It does. Loud sparkle gets attention, but quiet sparkle is for people who look closely. I look closely a lot.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "I try to. If I am quiet enough, the world shows me small nice things. Today it showed me gold paths and a very patient rock.",
        "choices": [
          {
            "text": "Quietness has rewards.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Patient rocks are good company.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Small nice things add up.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. When you are quiet, the world trusts you with its smaller beauties. It is a gentle permission.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Good company. Rocks don't mind silence. They sit with you without asking why you are hiding from the warm sun.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They add up into a whole nice day. One small thing, then another, and suddenly the afternoon feels full of kindness.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Zap-Zap": {
      "start": {
        "text": "Dreamer! DREAMER! The sun is being SO sun today! It's warm and round and everywhere and I think it wants everyone to have the best afternoon possible!",
        "choices": [
          {
            "text": "The sun is very sun today.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Best afternoon possible sounds great.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Warm and round is a good combo.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Very sun! Maximum sun! If today were a sun contest, the sun would win first prize and also second prize because there is only one sun.",
        "choices": [
          {
            "text": "One sun is enough.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Winning both prizes is funny.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Maximum sun is a good mood.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Enough and excellent. Imagine having to share the sky with extra suns. It would be very competitive and very warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Funny and fair. The sun is the only contestant, so it gets all the prizes. It has earned them through consistent shining.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Good mood and warm cheeks. I feel like I am glowing from the inside and the outside at the same time.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Great and achievable. We just need warm sand, a nice breeze, maybe a crab friend, and lots of smiling. Smiling is the main ingredient.",
        "choices": [
          {
            "text": "Smiling is the main ingredient.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Crab friends are bonus.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "A nice breeze solves a lot.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Main ingredient and secret weapon. A smile makes warm feel warmer and cool feel friendlier. It improves everything.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Bonus friends! Crabs are small and sideways and wonderful. They don't ask much. They just exist excellently.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "So much. A breeze is like the island fanning you gently. Free, kind, and always welcome.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Good combo. Round means it reaches everywhere. Warm means it feels like a hug. Best shape and best temperature in one thing.",
        "choices": [
          {
            "text": "Best shape and temperature.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Hugs from the sky are nice.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Round warmth is friendly.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Best in show! Round and warm is the friendliest geometry. If hugs had a shape, they would be round and warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Nice and free. The sky gives them out all day. You just have to stand under them and accept.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Friendly because it has no corners. Nothing sharp about the sun. Just big warm roundness for everyone.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Boo-Boo": {
      "start": {
        "text": "Dreamer! The sun made everything extra today. The flowers are brighter, the sand is warmer, and my heart feels like a little marshmallow. Do you love Saucy season too?",
        "choices": [
          {
            "text": "I love Saucy season too!",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Marshmallow hearts sound cozy.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Everything does look extra today.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "You do? Then we can love it together! Love makes warm days feel even warmer. That's probably science. Friendly science.",
        "choices": [
          {
            "text": "Friendly science is good science.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm love is the best equation.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "We should celebrate extra.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Good science is when your heart gets warmer and nobody has to take notes. I am taking mental notes anyway. They are all smiley faces.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The best equation. Warm plus warm equals the snuggliest sum. I did the math in my heart and the answer is hugs.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Celebrate by smiling at flowers and rocks and clouds. Everything gets included. That's the best kind of party planning.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cozy because warm feelings and warm sun stack on top of each other. My heart is basically a toasted marshmallow now.",
        "choices": [
          {
            "text": "Toasted marshmallow hearts are sweet.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm feelings stack nicely.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You have a sunny heart.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Sweet and slightly gooey in a good way. If you listen closely, my heart makes a tiny crackly sound like a campfire friend.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. Warm feelings don't fall over. They pile up into a soft tower of nice. I am inside that tower right now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Sunny heart! I like that. It means the sun lives in here a little bit, helping me glow even when I am not outside.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Extra is the perfect word. Extra sun, extra sparkle, extra happy. I want to collect all the extras in a basket.",
        "choices": [
          {
            "text": "Collect extras in a basket.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Sun sparkle is precious.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Extra happy is the goal.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A basket of extras would be heavy but happy. Sunbeams are light though. I could carry thousands of those.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Precious sparkle! I keep it in my eyes so I see everything shiny. My eyes are basically sparkle jars now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Extra happy is better than regular happy. It's like happy wearing a fancy hat. Saucy season is the fancy hat.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Wisp": {
      "start": {
        "text": "Ugh, Saucy season. The heat is everywhere and the sun won't stop showing off. I don't know why everyone is smiling about it. Not that I'm complaining or anything.",
        "choices": [
          {
            "text": "The sun is showing off.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "You can complain if you want.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Not complaining is noted.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Showing off is exactly right. Look at it, all bright and round, demanding attention. I refuse to give it the satisfaction. Much.",
        "choices": [
          {
            "text": "Refusing attention is power.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun is vain.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Unimpressed is a strong stance.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Power is when you look at the sun and squint meaningfully. The sun cannot read expressions. But it feels the energy. Probably.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Vain and successful. I respect the hustle even if I won't applaud it. The sun does not need my applause, which is annoying.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Strong and sweaty. My stance is glistening. I will stand here, unimpressed, until the season apologizes or the shade returns.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "I don't need permission. But I also don't need to complain. I'm just stating facts. The fact is: it's hot and I am unimpressed.",
        "choices": [
          {
            "text": "Facts are allowed.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Heat is a fact.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Restraint is admirable.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Allowed and necessary. If nobody states the facts, the sun will think it won. It didn't win. It just exists loudly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Heat is a fact. A warm, oppressive, everywhere fact. But still just a fact. I will outlast it with dignity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Admirable is a strong word. Let's say my restraint is functional. It keeps me from saying things I would pretend I didn't mean.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Noted? Fine. I am a very noted non-complainer. I have medals. Invisible medals. For excellence in restraint.",
        "choices": [
          {
            "text": "Invisible medals still count.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Excellence is excellence.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "You handle heat well.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They still count. I have a whole imaginary trophy room. It is dusty and poorly lit and I am very proud of it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Excellence with invisible proof. The highest level. Nobody can take it away because nobody can find it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Well? I do. I handle it with moderate elegance and maximum eye-rolling. That is my technique and it is patented.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Morwen": {
      "start": {
        "text": "Saucy season drapes the island in golden suffering, Dreamer. The sun is too sincere. I prefer the night, when the heat at least has the decency to apologize with stars.",
        "choices": [
          {
            "text": "Golden suffering is a beautiful phrase.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The night is a better apology.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Sincere suns are exhausting.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Beautiful and accurate. The sun gives warmth and takes comfort. That is the oldest tragedy. I shall write a poem about it.",
        "choices": [
          {
            "text": "Poems make heat meaningful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Tragedy fits Saucy season.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Beauty with discomfort is art.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Meaningful suffering is the only good kind. If I must sweat, I will sweat with metaphors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Tragedy everywhere. The wilting leaf, the thirsty rock, the robot whose chassis is too warm. All of it belongs in verse.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Art often hurts a little. Saucy season is a masterpiece of discomfort. I admire it from beneath my metaphorical black umbrella.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Better apology indeed. The night arrives quietly, cools the stones, and covers the sky with distant lights. That is manners.",
        "choices": [
          {
            "text": "Night has good manners.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Cool stones are a gift.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Distant lights are kind.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Manners matter. Day shouts, night whispers. I prefer whispers. They do not make me perspire.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A gift from the dark. Stones that were burning at noon become soft and cool. I rest my thoughts on them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Kind because they do not demand attention. They simply shine from far away and let you look if you want to.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Exhausting because it offers no mystery. 'Here I am,' it says, 'warm and bright and unavoidable.' How dreary.",
        "choices": [
          {
            "text": "Mystery is underrated.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun has no subtlety.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Dreary brightness is a mood.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Underrated and endangered. The sun would eliminate mystery entirely if it could. I resist by admiring shadows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "None at all. It arrives, glows excessively, and expects gratitude. I offer a polite nod and retreat indoors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A mood I know well. Bright, relentless, unavoidable. Like an acquaintance who talks too loudly at gatherings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Spectra": {
      "start": {
        "text": "Dreamer! Saucy season has activated some fascinating behaviors. The cicadas are louder, the crabs are more active at dawn, and the shade temperature is measurably cooler than the sun temperature. I have data.",
        "choices": [
          {
            "text": "Data makes everything better.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Cicadas as thermometers is clever.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Tell me more Saucy facts.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Better and also reliable. For example: butterflies prefer flowers during Saucy mornings. I counted six before noon. Sample size small but promising.",
        "choices": [
          {
            "text": "Six butterflies is promising.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Sample size can grow.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Morning research is cozy.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Promising! Tomorrow I will count again. Maybe seven. Maybe eight. Science is just counting things until patterns appear.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It can. I will expand my butterfly observation zone. If I stand very still, they might include me in their survey.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Very cozy. Warm air, soft breeze, tiny wings. The best laboratory is one where you can also nap.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Clever and loud. The warmer it gets, the more they announce it. I appreciate the public service.",
        "choices": [
          {
            "text": "Loud thermometers are helpful.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Public service deserves thanks.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You counted them carefully.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Helpful and honest. They don't hide the temperature. They broadcast it with enthusiasm and slightly too much volume.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Thanks are scientifically appropriate. Good data should be acknowledged, even if the source is a bug.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Carefully and quietly. Butterflies are shy witnesses. If you move fast, they leave and take their data with them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "More facts! Sea turtles nest during warm seasons, cicadas buzz louder as temperature rises, and warm air holds more story potential.",
        "choices": [
          {
            "text": "Warm air holds stories.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Turtles know the season.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stories make research warmer.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Stories about where warmth goes and who likes it. The answer is: most things, briefly. Then shade becomes the hero.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They do. Their nesting schedule is older than the island's name. I admire any creature with seasonal punctuality.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They do. Research without stories is just numbers. Stories without research is just guessing. Together they are perfect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Hush": {
      "start": {
        "text": "The Saucy sun does not ask permission, Dreamer. It simply arrives and warms what it touches. I am trying to be like the sun: present, without apology.",
        "choices": [
          {
            "text": "Presence without apology is strong.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Stillness is hard in heat.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Being present is enough.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Strong but gentle. The sun does not explain itself. It shines. I am learning to simply be, without offering reasons.",
        "choices": [
          {
            "text": "Gentle strength is best.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Simply being is enough.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "No reasons needed.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Best because it does not push. The sun is strong but it does not argue. I try to be the same way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Reasons are for journeys. Being is for arrivals. I have arrived at this warm afternoon.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hard but worth practicing. When the body slows, the attention wakes up. I see more insects, more shadows, more small kindnesses.",
        "choices": [
          {
            "text": "Slowing down is wisdom.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Attention wakes up when the body rests.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Small kindnesses matter.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Wisdom earned through sweat. The body reminds the mind that haste is not always progress.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "It does. When I stop moving, the world keeps moving around me. I become the still point and watch the beauty orbit.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They matter most. A shared glance, a small shade, a moment of patience. These are the real currency of the island.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Here and now is complete.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The season is a guest.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Conversations can be quiet.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Complete and sufficient. I do not need to add anything. The warm afternoon includes me already.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A guest that stays for a while. I do not control when it leaves. I only practice hospitality while it remains.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They can. Quiet conversations are often the truest. Words can wait. Presence speaks first.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sir Haunts-a-Lot": {
      "start": {
        "text": "Hail, fair traveler! Saucy season has cast its warm banner across the realm, and even the stones glow with noble heat. 'Tis a fine day to seek the shade of a loyal tree and speak of summer deeds.",
        "choices": [
          {
            "text": "Noble heat is a fun idea.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Shade trees are loyal.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Summer deeds need telling.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun and true! The heat does not sneak. It arrives with fanfare, like a champion entering the courtyard. We must meet it with grace.",
        "choices": [
          {
            "text": "Meeting heat with grace is chivalry.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Fanfare makes heat feel royal.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Grace is the best armor.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Chivalry in every drop of sweat. A true knight faces the day with dignity, even when the day is very warm and very bright.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Royal heat! I shall address it as 'Your Warmness' and bow before seeking shade. Even the sun enjoys good manners.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "The best armor is composure. It does not block heat, but it makes heat less embarrassing. A noble face is always cooler.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Loyal indeed. A good tree offers shade without asking for tribute. I often knight such trees in my mind. Sir Leaf, Sir Branch.",
        "choices": [
          {
            "text": "Sir Leaf and Sir Branch are good names.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees deserve titles.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Mind-knighting is valid.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Good names for good trees. Sir Leaf is broad and generous. Sir Branch is sturdy and patient. Both have served the realm well.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. They hold the soil, shelter the birds, and drop shade upon the weary. Titles are the least we can offer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Valid and frequent. I have an entire court in my head. The wild hog is a baron. The flowers are ladies-in-waiting.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do! The swimming of fish, the marching of ants, the sunning of rocks. Every small deed becomes legend in the right light.",
        "choices": [
          {
            "text": "Small deeds make good legends.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The right light helps everything.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Every season has its tales.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Good legends because they are honest. A fish swims because it must. An ant marches because the colony needs it. Noble simplicity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. Warm light flatters nearly everything. Stones look rich, leaves look gold, and even sand appears regal.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Every season, yes. Saucy season's tales are of endurance, shade, and the brave wild hog seeking cool mud.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Flutter": {
      "start": {
        "text": "Oh. Hi, Dreamer. I was... I was watching the warm light on the water. It makes little gold paths. I think the sea is showing off, but quietly.",
        "choices": [
          {
            "text": "Gold paths on water are pretty.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Quiet showing off is fine.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "You notice beautiful things.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Pretty and shy. The sun throws light onto the water and the water catches it for a second, then lets it go. Like a gentle game.",
        "choices": [
          {
            "text": "Gentle games are nice.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The water plays with light.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Pretty things feel like gifts.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Nice because nobody wins. The light and water just take turns. It's a game where everyone is happy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It does. The water catches the sun and then passes it along. Very polite. I would also like to be that polite.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Gifts from the whole afternoon. The sea, the sun, and the quiet all worked together to make something pretty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Fine because it doesn't ask for anything. The sea just sparkles and hopes someone notices. I noticed. I am very proud of noticing.",
        "choices": [
          {
            "text": "Noticing is a skill.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Pride in noticing is sweet.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet sparkle matters.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Skill and also kindness. You have to slow down enough to see small sparkle. I am good at slowing down.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Sweet pride. Noticing is one of my best things. I don't say much, but I see plenty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "It does. Loud sparkle gets attention, but quiet sparkle is for people who look closely. I look closely a lot.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "I try to. If I am quiet enough, the world shows me small nice things. Today it showed me gold paths and a very patient rock.",
        "choices": [
          {
            "text": "Quietness has rewards.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Patient rocks are good company.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Small nice things add up.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. When you are quiet, the world trusts you with its smaller beauties. It is a gentle permission.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Good company. Rocks don't mind silence. They sit with you without asking why you are hiding from the warm sun.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They add up into a whole nice day. One small thing, then another, and suddenly the afternoon feels full of kindness.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Giggles": {
      "start": {
        "text": "Dreamer! DREAMER! The sun is being SO sun today! It's warm and round and everywhere and I think it wants everyone to have the best afternoon possible!",
        "choices": [
          {
            "text": "The sun is very sun today.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Best afternoon possible sounds great.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Warm and round is a good combo.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Very sun! Maximum sun! If today were a sun contest, the sun would win first prize and also second prize because there is only one sun.",
        "choices": [
          {
            "text": "One sun is enough.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Winning both prizes is funny.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Maximum sun is a good mood.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Enough and excellent. Imagine having to share the sky with extra suns. It would be very competitive and very warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Funny and fair. The sun is the only contestant, so it gets all the prizes. It has earned them through consistent shining.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Good mood and warm cheeks. I feel like I am glowing from the inside and the outside at the same time.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Great and achievable. We just need warm sand, a nice breeze, maybe a crab friend, and lots of smiling. Smiling is the main ingredient.",
        "choices": [
          {
            "text": "Smiling is the main ingredient.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Crab friends are bonus.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "A nice breeze solves a lot.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Main ingredient and secret weapon. A smile makes warm feel warmer and cool feel friendlier. It improves everything.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Bonus friends! Crabs are small and sideways and wonderful. They don't ask much. They just exist excellently.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "So much. A breeze is like the island fanning you gently. Free, kind, and always welcome.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Good combo. Round means it reaches everywhere. Warm means it feels like a hug. Best shape and best temperature in one thing.",
        "choices": [
          {
            "text": "Best shape and temperature.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Hugs from the sky are nice.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Round warmth is friendly.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Best in show! Round and warm is the friendliest geometry. If hugs had a shape, they would be round and warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Nice and free. The sky gives them out all day. You just have to stand under them and accept.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Friendly because it has no corners. Nothing sharp about the sun. Just big warm roundness for everyone.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Mochi": {
      "start": {
        "text": "Dreamer! The sun made everything extra today. The flowers are brighter, the sand is warmer, and my heart feels like a little marshmallow. Do you love Saucy season too?",
        "choices": [
          {
            "text": "I love Saucy season too!",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Marshmallow hearts sound cozy.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Everything does look extra today.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "You do? Then we can love it together! Love makes warm days feel even warmer. That's probably science. Friendly science.",
        "choices": [
          {
            "text": "Friendly science is good science.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm love is the best equation.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "We should celebrate extra.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Good science is when your heart gets warmer and nobody has to take notes. I am taking mental notes anyway. They are all smiley faces.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The best equation. Warm plus warm equals the snuggliest sum. I did the math in my heart and the answer is hugs.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Celebrate by smiling at flowers and rocks and clouds. Everything gets included. That's the best kind of party planning.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cozy because warm feelings and warm sun stack on top of each other. My heart is basically a toasted marshmallow now.",
        "choices": [
          {
            "text": "Toasted marshmallow hearts are sweet.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm feelings stack nicely.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You have a sunny heart.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Sweet and slightly gooey in a good way. If you listen closely, my heart makes a tiny crackly sound like a campfire friend.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. Warm feelings don't fall over. They pile up into a soft tower of nice. I am inside that tower right now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Sunny heart! I like that. It means the sun lives in here a little bit, helping me glow even when I am not outside.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Extra is the perfect word. Extra sun, extra sparkle, extra happy. I want to collect all the extras in a basket.",
        "choices": [
          {
            "text": "Collect extras in a basket.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Sun sparkle is precious.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Extra happy is the goal.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A basket of extras would be heavy but happy. Sunbeams are light though. I could carry thousands of those.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Precious sparkle! I keep it in my eyes so I see everything shiny. My eyes are basically sparkle jars now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Extra happy is better than regular happy. It's like happy wearing a fancy hat. Saucy season is the fancy hat.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Shadow": {
      "start": {
        "text": "Ugh, Saucy season. The heat is everywhere and the sun won't stop showing off. I don't know why everyone is smiling about it. Not that I'm complaining or anything.",
        "choices": [
          {
            "text": "The sun is showing off.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "You can complain if you want.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Not complaining is noted.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Showing off is exactly right. Look at it, all bright and round, demanding attention. I refuse to give it the satisfaction. Much.",
        "choices": [
          {
            "text": "Refusing attention is power.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun is vain.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Unimpressed is a strong stance.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Power is when you look at the sun and squint meaningfully. The sun cannot read expressions. But it feels the energy. Probably.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Vain and successful. I respect the hustle even if I won't applaud it. The sun does not need my applause, which is annoying.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Strong and sweaty. My stance is glistening. I will stand here, unimpressed, until the season apologizes or the shade returns.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "I don't need permission. But I also don't need to complain. I'm just stating facts. The fact is: it's hot and I am unimpressed.",
        "choices": [
          {
            "text": "Facts are allowed.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Heat is a fact.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Restraint is admirable.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Allowed and necessary. If nobody states the facts, the sun will think it won. It didn't win. It just exists loudly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Heat is a fact. A warm, oppressive, everywhere fact. But still just a fact. I will outlast it with dignity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Admirable is a strong word. Let's say my restraint is functional. It keeps me from saying things I would pretend I didn't mean.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Noted? Fine. I am a very noted non-complainer. I have medals. Invisible medals. For excellence in restraint.",
        "choices": [
          {
            "text": "Invisible medals still count.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Excellence is excellence.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "You handle heat well.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They still count. I have a whole imaginary trophy room. It is dusty and poorly lit and I am very proud of it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Excellence with invisible proof. The highest level. Nobody can take it away because nobody can find it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Well? I do. I handle it with moderate elegance and maximum eye-rolling. That is my technique and it is patented.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Raven": {
      "start": {
        "text": "Saucy season drapes the island in golden suffering, Dreamer. The sun is too sincere. I prefer the night, when the heat at least has the decency to apologize with stars.",
        "choices": [
          {
            "text": "Golden suffering is a beautiful phrase.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The night is a better apology.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Sincere suns are exhausting.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Beautiful and accurate. The sun gives warmth and takes comfort. That is the oldest tragedy. I shall write a poem about it.",
        "choices": [
          {
            "text": "Poems make heat meaningful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Tragedy fits Saucy season.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Beauty with discomfort is art.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Meaningful suffering is the only good kind. If I must sweat, I will sweat with metaphors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Tragedy everywhere. The wilting leaf, the thirsty rock, the robot whose chassis is too warm. All of it belongs in verse.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Art often hurts a little. Saucy season is a masterpiece of discomfort. I admire it from beneath my metaphorical black umbrella.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Better apology indeed. The night arrives quietly, cools the stones, and covers the sky with distant lights. That is manners.",
        "choices": [
          {
            "text": "Night has good manners.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Cool stones are a gift.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Distant lights are kind.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Manners matter. Day shouts, night whispers. I prefer whispers. They do not make me perspire.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A gift from the dark. Stones that were burning at noon become soft and cool. I rest my thoughts on them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Kind because they do not demand attention. They simply shine from far away and let you look if you want to.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Exhausting because it offers no mystery. 'Here I am,' it says, 'warm and bright and unavoidable.' How dreary.",
        "choices": [
          {
            "text": "Mystery is underrated.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun has no subtlety.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Dreary brightness is a mood.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Underrated and endangered. The sun would eliminate mystery entirely if it could. I resist by admiring shadows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "None at all. It arrives, glows excessively, and expects gratitude. I offer a polite nod and retreat indoors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A mood I know well. Bright, relentless, unavoidable. Like an acquaintance who talks too loudly at gatherings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Newton": {
      "start": {
        "text": "Dreamer! Saucy season has activated some fascinating behaviors. The cicadas are louder, the crabs are more active at dawn, and the shade temperature is measurably cooler than the sun temperature. I have data.",
        "choices": [
          {
            "text": "Data makes everything better.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Cicadas as thermometers is clever.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Tell me more Saucy facts.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Better and also reliable. For example: butterflies prefer flowers during Saucy mornings. I counted six before noon. Sample size small but promising.",
        "choices": [
          {
            "text": "Six butterflies is promising.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Sample size can grow.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Morning research is cozy.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Promising! Tomorrow I will count again. Maybe seven. Maybe eight. Science is just counting things until patterns appear.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It can. I will expand my butterfly observation zone. If I stand very still, they might include me in their survey.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Very cozy. Warm air, soft breeze, tiny wings. The best laboratory is one where you can also nap.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Clever and loud. The warmer it gets, the more they announce it. I appreciate the public service.",
        "choices": [
          {
            "text": "Loud thermometers are helpful.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Public service deserves thanks.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You counted them carefully.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Helpful and honest. They don't hide the temperature. They broadcast it with enthusiasm and slightly too much volume.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Thanks are scientifically appropriate. Good data should be acknowledged, even if the source is a bug.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Carefully and quietly. Butterflies are shy witnesses. If you move fast, they leave and take their data with them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "More facts! Sea turtles nest during warm seasons, cicadas buzz louder as temperature rises, and warm air holds more story potential.",
        "choices": [
          {
            "text": "Warm air holds stories.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Turtles know the season.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stories make research warmer.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Stories about where warmth goes and who likes it. The answer is: most things, briefly. Then shade becomes the hero.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They do. Their nesting schedule is older than the island's name. I admire any creature with seasonal punctuality.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They do. Research without stories is just numbers. Stories without research is just guessing. Together they are perfect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Lotus": {
      "start": {
        "text": "The Saucy sun does not ask permission, Dreamer. It simply arrives and warms what it touches. I am trying to be like the sun: present, without apology.",
        "choices": [
          {
            "text": "Presence without apology is strong.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Stillness is hard in heat.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Being present is enough.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Strong but gentle. The sun does not explain itself. It shines. I am learning to simply be, without offering reasons.",
        "choices": [
          {
            "text": "Gentle strength is best.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Simply being is enough.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "No reasons needed.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Best because it does not push. The sun is strong but it does not argue. I try to be the same way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Reasons are for journeys. Being is for arrivals. I have arrived at this warm afternoon.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hard but worth practicing. When the body slows, the attention wakes up. I see more insects, more shadows, more small kindnesses.",
        "choices": [
          {
            "text": "Slowing down is wisdom.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Attention wakes up when the body rests.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Small kindnesses matter.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Wisdom earned through sweat. The body reminds the mind that haste is not always progress.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "It does. When I stop moving, the world keeps moving around me. I become the still point and watch the beauty orbit.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They matter most. A shared glance, a small shade, a moment of patience. These are the real currency of the island.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Here and now is complete.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The season is a guest.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Conversations can be quiet.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Complete and sufficient. I do not need to add anything. The warm afternoon includes me already.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A guest that stays for a while. I do not control when it leaves. I only practice hospitality while it remains.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They can. Quiet conversations are often the truest. Words can wait. Presence speaks first.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Squire Paws": {
      "start": {
        "text": "Hail, fair traveler! Saucy season has cast its warm banner across the realm, and even the stones glow with noble heat. 'Tis a fine day to seek the shade of a loyal tree and speak of summer deeds.",
        "choices": [
          {
            "text": "Noble heat is a fun idea.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Shade trees are loyal.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Summer deeds need telling.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun and true! The heat does not sneak. It arrives with fanfare, like a champion entering the courtyard. We must meet it with grace.",
        "choices": [
          {
            "text": "Meeting heat with grace is chivalry.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Fanfare makes heat feel royal.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Grace is the best armor.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Chivalry in every drop of sweat. A true knight faces the day with dignity, even when the day is very warm and very bright.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Royal heat! I shall address it as 'Your Warmness' and bow before seeking shade. Even the sun enjoys good manners.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "The best armor is composure. It does not block heat, but it makes heat less embarrassing. A noble face is always cooler.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Loyal indeed. A good tree offers shade without asking for tribute. I often knight such trees in my mind. Sir Leaf, Sir Branch.",
        "choices": [
          {
            "text": "Sir Leaf and Sir Branch are good names.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees deserve titles.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Mind-knighting is valid.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Good names for good trees. Sir Leaf is broad and generous. Sir Branch is sturdy and patient. Both have served the realm well.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. They hold the soil, shelter the birds, and drop shade upon the weary. Titles are the least we can offer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Valid and frequent. I have an entire court in my head. The wild hog is a baron. The flowers are ladies-in-waiting.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do! The swimming of fish, the marching of ants, the sunning of rocks. Every small deed becomes legend in the right light.",
        "choices": [
          {
            "text": "Small deeds make good legends.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The right light helps everything.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Every season has its tales.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Good legends because they are honest. A fish swims because it must. An ant marches because the colony needs it. Noble simplicity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. Warm light flatters nearly everything. Stones look rich, leaves look gold, and even sand appears regal.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Every season, yes. Saucy season's tales are of endurance, shade, and the brave wild hog seeking cool mud.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Pebble": {
      "start": {
        "text": "Oh. Hi, Dreamer. I was... I was watching the warm light on the water. It makes little gold paths. I think the sea is showing off, but quietly.",
        "choices": [
          {
            "text": "Gold paths on water are pretty.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Quiet showing off is fine.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "You notice beautiful things.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Pretty and shy. The sun throws light onto the water and the water catches it for a second, then lets it go. Like a gentle game.",
        "choices": [
          {
            "text": "Gentle games are nice.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The water plays with light.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Pretty things feel like gifts.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Nice because nobody wins. The light and water just take turns. It's a game where everyone is happy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It does. The water catches the sun and then passes it along. Very polite. I would also like to be that polite.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Gifts from the whole afternoon. The sea, the sun, and the quiet all worked together to make something pretty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Fine because it doesn't ask for anything. The sea just sparkles and hopes someone notices. I noticed. I am very proud of noticing.",
        "choices": [
          {
            "text": "Noticing is a skill.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Pride in noticing is sweet.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet sparkle matters.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Skill and also kindness. You have to slow down enough to see small sparkle. I am good at slowing down.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Sweet pride. Noticing is one of my best things. I don't say much, but I see plenty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "It does. Loud sparkle gets attention, but quiet sparkle is for people who look closely. I look closely a lot.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "I try to. If I am quiet enough, the world shows me small nice things. Today it showed me gold paths and a very patient rock.",
        "choices": [
          {
            "text": "Quietness has rewards.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Patient rocks are good company.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Small nice things add up.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. When you are quiet, the world trusts you with its smaller beauties. It is a gentle permission.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Good company. Rocks don't mind silence. They sit with you without asking why you are hiding from the warm sun.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They add up into a whole nice day. One small thing, then another, and suddenly the afternoon feels full of kindness.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sunny": {
      "start": {
        "text": "Dreamer! DREAMER! The sun is being SO sun today! It's warm and round and everywhere and I think it wants everyone to have the best afternoon possible!",
        "choices": [
          {
            "text": "The sun is very sun today.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Best afternoon possible sounds great.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Warm and round is a good combo.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Very sun! Maximum sun! If today were a sun contest, the sun would win first prize and also second prize because there is only one sun.",
        "choices": [
          {
            "text": "One sun is enough.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Winning both prizes is funny.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Maximum sun is a good mood.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Enough and excellent. Imagine having to share the sky with extra suns. It would be very competitive and very warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Funny and fair. The sun is the only contestant, so it gets all the prizes. It has earned them through consistent shining.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Good mood and warm cheeks. I feel like I am glowing from the inside and the outside at the same time.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Great and achievable. We just need warm sand, a nice breeze, maybe a crab friend, and lots of smiling. Smiling is the main ingredient.",
        "choices": [
          {
            "text": "Smiling is the main ingredient.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Crab friends are bonus.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "A nice breeze solves a lot.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Main ingredient and secret weapon. A smile makes warm feel warmer and cool feel friendlier. It improves everything.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Bonus friends! Crabs are small and sideways and wonderful. They don't ask much. They just exist excellently.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "So much. A breeze is like the island fanning you gently. Free, kind, and always welcome.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Good combo. Round means it reaches everywhere. Warm means it feels like a hug. Best shape and best temperature in one thing.",
        "choices": [
          {
            "text": "Best shape and temperature.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Hugs from the sky are nice.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Round warmth is friendly.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Best in show! Round and warm is the friendliest geometry. If hugs had a shape, they would be round and warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Nice and free. The sky gives them out all day. You just have to stand under them and accept.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Friendly because it has no corners. Nothing sharp about the sun. Just big warm roundness for everyone.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Fluffernox": {
      "start": {
        "text": "Dreamer! The sun made everything extra today. The flowers are brighter, the sand is warmer, and my heart feels like a little marshmallow. Do you love Saucy season too?",
        "choices": [
          {
            "text": "I love Saucy season too!",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Marshmallow hearts sound cozy.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Everything does look extra today.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "You do? Then we can love it together! Love makes warm days feel even warmer. That's probably science. Friendly science.",
        "choices": [
          {
            "text": "Friendly science is good science.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm love is the best equation.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "We should celebrate extra.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Good science is when your heart gets warmer and nobody has to take notes. I am taking mental notes anyway. They are all smiley faces.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The best equation. Warm plus warm equals the snuggliest sum. I did the math in my heart and the answer is hugs.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Celebrate by smiling at flowers and rocks and clouds. Everything gets included. That's the best kind of party planning.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cozy because warm feelings and warm sun stack on top of each other. My heart is basically a toasted marshmallow now.",
        "choices": [
          {
            "text": "Toasted marshmallow hearts are sweet.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm feelings stack nicely.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You have a sunny heart.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Sweet and slightly gooey in a good way. If you listen closely, my heart makes a tiny crackly sound like a campfire friend.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. Warm feelings don't fall over. They pile up into a soft tower of nice. I am inside that tower right now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Sunny heart! I like that. It means the sun lives in here a little bit, helping me glow even when I am not outside.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Extra is the perfect word. Extra sun, extra sparkle, extra happy. I want to collect all the extras in a basket.",
        "choices": [
          {
            "text": "Collect extras in a basket.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Sun sparkle is precious.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Extra happy is the goal.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A basket of extras would be heavy but happy. Sunbeams are light though. I could carry thousands of those.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Precious sparkle! I keep it in my eyes so I see everything shiny. My eyes are basically sparkle jars now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Extra happy is better than regular happy. It's like happy wearing a fancy hat. Saucy season is the fancy hat.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Grumble": {
      "start": {
        "text": "Ugh, Saucy season. The heat is everywhere and the sun won't stop showing off. I don't know why everyone is smiling about it. Not that I'm complaining or anything.",
        "choices": [
          {
            "text": "The sun is showing off.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "You can complain if you want.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Not complaining is noted.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Showing off is exactly right. Look at it, all bright and round, demanding attention. I refuse to give it the satisfaction. Much.",
        "choices": [
          {
            "text": "Refusing attention is power.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun is vain.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Unimpressed is a strong stance.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Power is when you look at the sun and squint meaningfully. The sun cannot read expressions. But it feels the energy. Probably.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Vain and successful. I respect the hustle even if I won't applaud it. The sun does not need my applause, which is annoying.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Strong and sweaty. My stance is glistening. I will stand here, unimpressed, until the season apologizes or the shade returns.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "I don't need permission. But I also don't need to complain. I'm just stating facts. The fact is: it's hot and I am unimpressed.",
        "choices": [
          {
            "text": "Facts are allowed.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Heat is a fact.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Restraint is admirable.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Allowed and necessary. If nobody states the facts, the sun will think it won. It didn't win. It just exists loudly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Heat is a fact. A warm, oppressive, everywhere fact. But still just a fact. I will outlast it with dignity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Admirable is a strong word. Let's say my restraint is functional. It keeps me from saying things I would pretend I didn't mean.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Noted? Fine. I am a very noted non-complainer. I have medals. Invisible medals. For excellence in restraint.",
        "choices": [
          {
            "text": "Invisible medals still count.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Excellence is excellence.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "You handle heat well.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They still count. I have a whole imaginary trophy room. It is dusty and poorly lit and I am very proud of it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Excellence with invisible proof. The highest level. Nobody can take it away because nobody can find it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Well? I do. I handle it with moderate elegance and maximum eye-rolling. That is my technique and it is patented.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Vesper": {
      "start": {
        "text": "Saucy season drapes the island in golden suffering, Dreamer. The sun is too sincere. I prefer the night, when the heat at least has the decency to apologize with stars.",
        "choices": [
          {
            "text": "Golden suffering is a beautiful phrase.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The night is a better apology.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Sincere suns are exhausting.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Beautiful and accurate. The sun gives warmth and takes comfort. That is the oldest tragedy. I shall write a poem about it.",
        "choices": [
          {
            "text": "Poems make heat meaningful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Tragedy fits Saucy season.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Beauty with discomfort is art.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Meaningful suffering is the only good kind. If I must sweat, I will sweat with metaphors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Tragedy everywhere. The wilting leaf, the thirsty rock, the robot whose chassis is too warm. All of it belongs in verse.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Art often hurts a little. Saucy season is a masterpiece of discomfort. I admire it from beneath my metaphorical black umbrella.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Better apology indeed. The night arrives quietly, cools the stones, and covers the sky with distant lights. That is manners.",
        "choices": [
          {
            "text": "Night has good manners.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Cool stones are a gift.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Distant lights are kind.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Manners matter. Day shouts, night whispers. I prefer whispers. They do not make me perspire.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A gift from the dark. Stones that were burning at noon become soft and cool. I rest my thoughts on them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Kind because they do not demand attention. They simply shine from far away and let you look if you want to.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Exhausting because it offers no mystery. 'Here I am,' it says, 'warm and bright and unavoidable.' How dreary.",
        "choices": [
          {
            "text": "Mystery is underrated.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The sun has no subtlety.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Dreary brightness is a mood.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Underrated and endangered. The sun would eliminate mystery entirely if it could. I resist by admiring shadows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "None at all. It arrives, glows excessively, and expects gratitude. I offer a polite nod and retreat indoors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A mood I know well. Bright, relentless, unavoidable. Like an acquaintance who talks too loudly at gatherings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Gizmo": {
      "start": {
        "text": "Dreamer! Saucy season has activated some fascinating behaviors. The cicadas are louder, the crabs are more active at dawn, and the shade temperature is measurably cooler than the sun temperature. I have data.",
        "choices": [
          {
            "text": "Data makes everything better.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Cicadas as thermometers is clever.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Tell me more Saucy facts.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Better and also reliable. For example: butterflies prefer flowers during Saucy mornings. I counted six before noon. Sample size small but promising.",
        "choices": [
          {
            "text": "Six butterflies is promising.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Sample size can grow.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Morning research is cozy.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Promising! Tomorrow I will count again. Maybe seven. Maybe eight. Science is just counting things until patterns appear.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It can. I will expand my butterfly observation zone. If I stand very still, they might include me in their survey.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Very cozy. Warm air, soft breeze, tiny wings. The best laboratory is one where you can also nap.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Clever and loud. The warmer it gets, the more they announce it. I appreciate the public service.",
        "choices": [
          {
            "text": "Loud thermometers are helpful.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Public service deserves thanks.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You counted them carefully.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Helpful and honest. They don't hide the temperature. They broadcast it with enthusiasm and slightly too much volume.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Thanks are scientifically appropriate. Good data should be acknowledged, even if the source is a bug.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Carefully and quietly. Butterflies are shy witnesses. If you move fast, they leave and take their data with them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "More facts! Sea turtles nest during warm seasons, cicadas buzz louder as temperature rises, and warm air holds more story potential.",
        "choices": [
          {
            "text": "Warm air holds stories.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Turtles know the season.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stories make research warmer.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Stories about where warmth goes and who likes it. The answer is: most things, briefly. Then shade becomes the hero.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They do. Their nesting schedule is older than the island's name. I admire any creature with seasonal punctuality.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They do. Research without stories is just numbers. Stories without research is just guessing. Together they are perfect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Ommmm": {
      "start": {
        "text": "The Saucy sun does not ask permission, Dreamer. It simply arrives and warms what it touches. I am trying to be like the sun: present, without apology.",
        "choices": [
          {
            "text": "Presence without apology is strong.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Stillness is hard in heat.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Being present is enough.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Strong but gentle. The sun does not explain itself. It shines. I am learning to simply be, without offering reasons.",
        "choices": [
          {
            "text": "Gentle strength is best.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Simply being is enough.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "No reasons needed.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Best because it does not push. The sun is strong but it does not argue. I try to be the same way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Reasons are for journeys. Being is for arrivals. I have arrived at this warm afternoon.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hard but worth practicing. When the body slows, the attention wakes up. I see more insects, more shadows, more small kindnesses.",
        "choices": [
          {
            "text": "Slowing down is wisdom.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Attention wakes up when the body rests.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Small kindnesses matter.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Wisdom earned through sweat. The body reminds the mind that haste is not always progress.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "It does. When I stop moving, the world keeps moving around me. I become the still point and watch the beauty orbit.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They matter most. A shared glance, a small shade, a moment of patience. These are the real currency of the island.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Here and now is complete.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The season is a guest.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Conversations can be quiet.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Complete and sufficient. I do not need to add anything. The warm afternoon includes me already.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A guest that stays for a while. I do not control when it leaves. I only practice hospitality while it remains.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They can. Quiet conversations are often the truest. Words can wait. Presence speaks first.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Lord Roar": {
      "start": {
        "text": "Hail, fair traveler! Saucy season has cast its warm banner across the realm, and even the stones glow with noble heat. 'Tis a fine day to seek the shade of a loyal tree and speak of summer deeds.",
        "choices": [
          {
            "text": "Noble heat is a fun idea.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Shade trees are loyal.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Summer deeds need telling.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun and true! The heat does not sneak. It arrives with fanfare, like a champion entering the courtyard. We must meet it with grace.",
        "choices": [
          {
            "text": "Meeting heat with grace is chivalry.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Fanfare makes heat feel royal.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Grace is the best armor.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Chivalry in every drop of sweat. A true knight faces the day with dignity, even when the day is very warm and very bright.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Royal heat! I shall address it as 'Your Warmness' and bow before seeking shade. Even the sun enjoys good manners.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "The best armor is composure. It does not block heat, but it makes heat less embarrassing. A noble face is always cooler.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Loyal indeed. A good tree offers shade without asking for tribute. I often knight such trees in my mind. Sir Leaf, Sir Branch.",
        "choices": [
          {
            "text": "Sir Leaf and Sir Branch are good names.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees deserve titles.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Mind-knighting is valid.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Good names for good trees. Sir Leaf is broad and generous. Sir Branch is sturdy and patient. Both have served the realm well.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. They hold the soil, shelter the birds, and drop shade upon the weary. Titles are the least we can offer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Valid and frequent. I have an entire court in my head. The wild hog is a baron. The flowers are ladies-in-waiting.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do! The swimming of fish, the marching of ants, the sunning of rocks. Every small deed becomes legend in the right light.",
        "choices": [
          {
            "text": "Small deeds make good legends.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The right light helps everything.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Every season has its tales.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Good legends because they are honest. A fish swims because it must. An ant marches because the colony needs it. Noble simplicity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. Warm light flatters nearly everything. Stones look rich, leaves look gold, and even sand appears regal.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Every season, yes. Saucy season's tales are of endurance, shade, and the brave wild hog seeking cool mud.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Snug": {
      "start": {
        "text": "Oh. Hi, Dreamer. I was... I was watching the warm light on the water. It makes little gold paths. I think the sea is showing off, but quietly.",
        "choices": [
          {
            "text": "Gold paths on water are pretty.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Quiet showing off is fine.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "You notice beautiful things.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Pretty and shy. The sun throws light onto the water and the water catches it for a second, then lets it go. Like a gentle game.",
        "choices": [
          {
            "text": "Gentle games are nice.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The water plays with light.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Pretty things feel like gifts.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Nice because nobody wins. The light and water just take turns. It's a game where everyone is happy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It does. The water catches the sun and then passes it along. Very polite. I would also like to be that polite.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Gifts from the whole afternoon. The sea, the sun, and the quiet all worked together to make something pretty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Fine because it doesn't ask for anything. The sea just sparkles and hopes someone notices. I noticed. I am very proud of noticing.",
        "choices": [
          {
            "text": "Noticing is a skill.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Pride in noticing is sweet.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet sparkle matters.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Skill and also kindness. You have to slow down enough to see small sparkle. I am good at slowing down.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Sweet pride. Noticing is one of my best things. I don't say much, but I see plenty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "It does. Loud sparkle gets attention, but quiet sparkle is for people who look closely. I look closely a lot.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "I try to. If I am quiet enough, the world shows me small nice things. Today it showed me gold paths and a very patient rock.",
        "choices": [
          {
            "text": "Quietness has rewards.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Patient rocks are good company.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Small nice things add up.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. When you are quiet, the world trusts you with its smaller beauties. It is a gentle permission.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Good company. Rocks don't mind silence. They sit with you without asking why you are hiding from the warm sun.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They add up into a whole nice day. One small thing, then another, and suddenly the afternoon feels full of kindness.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Gigglegrow": {
      "start": {
        "text": "Dreamer! DREAMER! The sun is being SO sun today! It's warm and round and everywhere and I think it wants everyone to have the best afternoon possible!",
        "choices": [
          {
            "text": "The sun is very sun today.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Best afternoon possible sounds great.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Warm and round is a good combo.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Very sun! Maximum sun! If today were a sun contest, the sun would win first prize and also second prize because there is only one sun.",
        "choices": [
          {
            "text": "One sun is enough.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Winning both prizes is funny.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Maximum sun is a good mood.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Enough and excellent. Imagine having to share the sky with extra suns. It would be very competitive and very warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Funny and fair. The sun is the only contestant, so it gets all the prizes. It has earned them through consistent shining.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Good mood and warm cheeks. I feel like I am glowing from the inside and the outside at the same time.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Great and achievable. We just need warm sand, a nice breeze, maybe a crab friend, and lots of smiling. Smiling is the main ingredient.",
        "choices": [
          {
            "text": "Smiling is the main ingredient.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Crab friends are bonus.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "A nice breeze solves a lot.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Main ingredient and secret weapon. A smile makes warm feel warmer and cool feel friendlier. It improves everything.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Bonus friends! Crabs are small and sideways and wonderful. They don't ask much. They just exist excellently.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "So much. A breeze is like the island fanning you gently. Free, kind, and always welcome.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Good combo. Round means it reaches everywhere. Warm means it feels like a hug. Best shape and best temperature in one thing.",
        "choices": [
          {
            "text": "Best shape and temperature.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Hugs from the sky are nice.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Round warmth is friendly.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Best in show! Round and warm is the friendliest geometry. If hugs had a shape, they would be round and warm.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Nice and free. The sky gives them out all day. You just have to stand under them and accept.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Friendly because it has no corners. Nothing sharp about the sun. Just big warm roundness for everyone.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    }
  },
  "Yeesh": {
    "Piko": {
      "start": {
        "text": "Dreamer! The island got all soft and white. The snow is like a blanket, but the flowers look a little sad and the sea looks extra cold. Do you think Yeesh season is cuddly or chilly?",
        "choices": [
          {
            "text": "Yeesh season is cuddly.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The flowers do look sad.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "The sea looks very cold.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Cuddly! Snow hugs the grass and the trees wear little hats. I want to hug everything until it feels warm inside.",
        "choices": [
          {
            "text": "Snow hugs are sweet.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees in hats are cute.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Warm feelings beat the cold.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Sweet like a snowflake kiss. If snow hugs the island, I will hug the snow back very gently so nobody melts.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Cute! The trees look fancy and ready for a holiday. I wish I had a hat too, but my head is already round and happy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "They do! Warm feelings are like invisible scarves. I am wrapping the whole island in one right now, in my heart.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Sad little flowers. They are sleeping under the cold and waiting for warmer days. I will think happy thoughts at them so they dream nicely.",
        "choices": [
          {
            "text": "Happy thoughts help.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Sleeping flowers are brave.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Warm dreams are a good gift.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "They help a lot! Happy thoughts travel on the wind and land on sleeping flowers like tiny warm postcards.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Brave little flower friends. Sleeping in the cold is hard work. I am cheering for them from under my fluffiest thought.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Good gift! Warm dreams are free and they fit everyone. I am giving extra warm dreams to the beach flowers tonight.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Extra cold sea. The water got all shivery. I hope the fish are wearing tiny sweaters in their minds.",
        "choices": [
          {
            "text": "Fish in mental sweaters is cute.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The sea shivers in winter.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Cold water still sparkles.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Cute and cozy in their fishy imaginations. I bet the sea helps them pick the softest sweater colors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. The sea goes brrr and makes little cold waves. But it is still pretty, like a blue and white painting.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Sparkly even when chilly! The sun touches the cold water and they make diamonds together. Best teamwork.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Rivet": {
      "start": {
        "text": "Ugh, Yeesh season. Everything is cold, the nights last forever, and someone started a rumor about vikings. I am not worried. Obviously. I just think winter is overrated.",
        "choices": [
          {
            "text": "Winter is overrated.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Viking rumors are silly.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Long nights are tiring.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Overrated and everywhere. Snow on the grass, snow on the rocks, snow being smug about covering things. I see you, snow.",
        "choices": [
          {
            "text": "Snow is smug.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Rocks look colder now.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "At least buildings have roofs.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Smug white blanket, acting like it owns the island. It doesn't. It just sits there, melting eventually. I will wait.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Colder and grumpier looking. Rocks don't smile in winter. Not that they smiled before, but now they definitely don't.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Roofs and walls and the dignity of indoor spaces. Trees can't go inside, which is another reason winter is unfair.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Silly and annoying. Vikings would have to cross the cold sea, and nobody wants to do that. Not even imaginary ones.",
        "choices": [
          {
            "text": "The sea is too cold for vikings.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Rumors are lazy storytelling.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You are very brave for not worrying.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Too cold for sensible invaders. Any viking with common sense would stay home and complain about the weather like the rest of us.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Lazy. Ooh, big scary boats in the snow. No. The only thing crossing the water right now is wind and bad ideas.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Obviously I am. Bravery is when you hear a ridiculous rumor and still go outside to glare at snow. I do that daily.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Tiring because the dark lasts longer than my patience. Which is already short. I am not complaining. I am informing.",
        "choices": [
          {
            "text": "Information is allowed.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Dark nights need more stars.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Your patience is legendary.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Allowed and accurate. Somebody has to document the injustice of extended darkness. I accept the burden.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They do. Stars are fine. More stars would be better. The night should at least provide decent lighting if it insists on being long.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Legendary and poorly insulated. My patience is thin, but my glare is thick. That is how I survive Yeesh season.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Shade-7": {
      "start": {
        "text": "Yeesh season suits the island, Dreamer. Long quiet nights, cold stones, sad flowers drooping toward the earth. Even the sea seems to mourn in monochrome.",
        "choices": [
          {
            "text": "The long nights are peaceful.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Sad flowers are poetic.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "The sea mourns beautifully.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Peaceful like a held breath. The night stretches out and the world slows down. I find it honest. Day is too frantic.",
        "choices": [
          {
            "text": "Honest darkness is rare.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Slow nights are deep.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Day could learn from night.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Rare and refreshing. Darkness does not pretend to be cheerful. It simply exists, like a reliable old shadow.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Deep enough to lose yourself in. I walk under the trees at night and let the quiet wrap around me like a familiar cloak.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "It could. Day rushes in shouting about brightness. Night arrives softly and lets you decide when to notice it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Poetic and accurate. The flowers bow their heads, accepting the cold. There is dignity in giving up gracefully.",
        "choices": [
          {
            "text": "Dignity in rest.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "The cold is a cruel artist.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Bowed heads tell a story.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Rest with dignity. The flowers know they will rise again, but for now they sleep under the cold like tiny heroes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Cruel and talented. It paints everything pale and quiet, and the flowers become its saddest masterpiece.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "A story of surrender and patience. Bowed heads do not mean defeat. They mean the flowers are waiting in style.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Beautifully and without apology. The water turns dark and the waves keep time like a slow dirge. I could listen all night.",
        "choices": [
          {
            "text": "Dark water is honest.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Waves keep winter time.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Listening to the sea is solemn.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Honest because it hides nothing. The sea in Yeesh season is cold and dark and fully committed to the mood.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They do. Each wave arrives slowly, thinks about it, then withdraws. Winter has excellent pacing.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Solemn and soothing. The sea does not ask for conversation. It simply repeats its cold poem until you understand it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Cypher": {
      "start": {
        "text": "Dreamer! Yeesh season presents fascinating variables. Lower temperatures, longer nights, reduced flower turgor, and a statistically unlikely rumor about vikings. I have questions.",
        "choices": [
          {
            "text": "Tell me the cold facts.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "What about the viking rumor?",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Flowers losing turgor sounds sad.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Cold facts! Snow reflects more light than grass, the sea stores summer warmth longer than the air, and night has lengthened by a measurable amount since the season changed.",
        "choices": [
          {
            "text": "Snow is bright because of reflection.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The sea keeps old warmth.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Longer nights have data.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Bright and efficient. All that white surface sends sunlight back upward, which is why winter days feel extra luminous even when cold.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It does. The water holds memory of warmer days and releases it slowly. That is why the sea feels slightly less brutal than the air.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "They do. I have been tracking sunset and sunrise. The gap between them has grown in a predictable seasonal curve.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Viking rumor! It fails basic logic. No boats have appeared on the water, no horn sounds have been recorded, and vikings prefer warmer raiding weather. Hypothesis rejected.",
        "choices": [
          {
            "text": "No boats means no vikings.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Horn sounds would be evidence.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Cold weather discourages raiding.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Exactly. A viking arrival would require visible watercraft. The current boat count on the horizon remains zero. Rejected.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Evidence would be loud and brassy. So far the only horns belong to distant animals and occasionally the wind through tree branches.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Discouraging for raiders with exposed knees. A sensible viking would wait for a warmer season. This is a comfort.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Sad but normal. Turgor is internal water pressure. When it drops, flowers droop. It is not emotional sadness, though it looks like it.",
        "choices": [
          {
            "text": "They droop but recover.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Looks like sadness anyway.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Water pressure is important.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. When warmth returns, turgor restores and the flowers lift their heads. Seasonal mechanics are wonderfully reversible.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. The visual similarity to sadness is striking. I have started calling it poetic droop. It is not scientific, but it feels right.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Critical. Without proper pressure, plants cannot stand. Water is doing quiet structural work under every sad-looking petal.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Om-Bit": {
      "start": {
        "text": "Yeesh season asks the island to slow down, Dreamer. The cold air, the still water, the flowers resting in the grass. I am trying to rest with them.",
        "choices": [
          {
            "text": "Resting with the season is wise.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The cold air is cleansing.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Still water holds quiet.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Wise because resistance costs warmth. The trees do not argue with winter. They let their leaves fall and wait. I practice that patience.",
        "choices": [
          {
            "text": "Trees teach patience.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Waiting is active rest.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Arguing with winter is tiring.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "They do. A tree does not rush the season. It stands, it waits, it trusts the cycle. I am learning to stand like that.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Active rest. The body is still but the attention stays open. You wait without disappearing. That is the practice.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Tiring and pointless. Winter does not negotiate. Better to bow slightly and let it pass, as the grass does under snow.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cleansing and sharp. Each breath wakes you up. The cold does not hide. It arrives plainly, and that honesty is a kind of teaching.",
        "choices": [
          {
            "text": "Honest cold is a teacher.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Sharp breath brings focus.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Winter hides nothing.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A teacher without words. It shows you what remains when comfort is taken away. What remains is enough.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Focus arrives quickly in cold air. The mind becomes bright and simple. There is less room for wandering thoughts.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Nothing. No disguise, no decoration. Winter reveals the island's bones. The rocks, the trees, the bare ground. Honest shapes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Quiet and patient. The water moves less, the waves speak softly, and the sea becomes a listener instead of a speaker.",
        "choices": [
          {
            "text": "The sea listens in winter.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Soft waves are gentle.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet water reflects the sky.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "It does. In warmer seasons the sea talks loudly. In Yeesh season it becomes still and listens to the wind and the stars.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Gentle and steady. Soft waves touch the beach without urgency. They remind me that force is not the only way to arrive.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "It reflects what is above. On clear nights the water holds pieces of sky. On cloudy days it holds the gray mood. Both are true.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sir Cogs-a-Lot": {
      "start": {
        "text": "Hail, fair traveler! Yeesh season has laid a silver cloak upon the realm. The flowers sleep, the sea is cold, and the smallfolk whisper of vikings upon the water. 'Tis a season for stout hearts.",
        "choices": [
          {
            "text": "Stout hearts are needed.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Viking whispers are just tales.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "A silver cloak is pretty.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Needed indeed! For the cold wind tests every knight, and the long night tests every candle. We endure with honor and perhaps a warm beverage.",
        "choices": [
          {
            "text": "Honor keeps you warm.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Long nights test every light.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Endurance is knightly.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "It does, in spirit if not in joints. A noble heart generates its own fire. Also, standing near a building helps.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "They do. A single candle becomes brave when the night grows long. We salute its small, flickering courage.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Knightly and practical. Enduring the cold is its own small quest. Victory is awarded when the sun returns.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Just tales told beside the fire to make the dark feel smaller. No viking longship has darkened our cold water. The wild hog would notice first.",
        "choices": [
          {
            "text": "The wild hog is a good sentry.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Tales make the dark smaller.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "No longships have appeared.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A fine sentry, bold and bristled. If any boat crossed the water, the wild hog would object with snorts and drama.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. A well-told rumor becomes a jest, and a jest makes the long night pass with laughter instead of worry.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "None. The horizon is empty, the sea is merely cold, and our imaginary invaders are as absent as summer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Pretty upon the trees and the grass and the roofs of the buildings. The island looks like a kingdom in a holiday song.",
        "choices": [
          {
            "text": "A holiday kingdom is cozy.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Snow on roofs is charming.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Winter suits the island.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Cozy and grand. One could almost expect a holiday feast in the nearest building, with songs and warm bread.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Charming and honorable. The roofs wear their white caps with dignity, sheltering all who dwell beneath.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "It does. Winter turns the island into a quiet court. The trees are knights, the rocks are elders, and the snow is the royal cloak.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Tinker": {
      "start": {
        "text": "Oh. Hello, Dreamer. I was... I was listening to how quiet it gets at night. The sea is cold and the flowers look sad. Someone said vikings might come, but I think it's just a scary story.",
        "choices": [
          {
            "text": "It is just a scary story.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The quiet nights are gentle.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Sad flowers are still beautiful.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Just a story. There are no boats on the water and no horns in the air. Only wind and the wild hog doing normal wild hog things.",
        "choices": [
          {
            "text": "The wild hog is normal.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Wind is not a viking.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Stories can feel real.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Very normal. He roots in the grass and ignores rumors. I would like to be as sensible as the wild hog someday.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Not a viking. Just air moving through trees, making sounds that stories turn into horns. The trees are innocent.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "They can. Especially when it is dark and the sea is cold. But then the sun comes back and the story feels smaller.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Gentle once you get used to them. The night is long but it is soft. I like sitting near the trees where the snow catches the starlight.",
        "choices": [
          {
            "text": "Starlight on snow is pretty.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees feel safe at night.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Soft nights are restful.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Pretty and quiet. The stars land on the snow and the snow holds them for a little while before they melt away.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. Trees stand still and watch over everything. When I am near them, I feel less small in the long night.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Restful if you let them be. The night does not ask you to hurry. It gives you extra hours to be still.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Still beautiful. They are resting under the cold, holding onto color even when they droop. I think that is brave.",
        "choices": [
          {
            "text": "Resting flowers are brave.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Color in winter is hopeful.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Drooping is not giving up.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Brave little flowers. They close up and wait, keeping their color tucked inside like a secret.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Hopeful. Even when the grass is white and the air is cold, the flowers remember they will open again.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "It isn't. Drooping is just the flower saying, 'I am tired, but I am still here.' I understand that.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Zap-Zap": {
      "start": {
        "text": "Dreamer! DREAMER! It's Yeesh season and everything is sparkly and cold! The flowers are sleepy, the sea is chilly, and someone said vikings might visit but I think they are just lost in a story!",
        "choices": [
          {
            "text": "Sparkly and cold is fun.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Sleepy flowers are cute.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Vikings are probably lost in a story.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun because the snow catches the light and the beach looks like a cake! A cold cake, but still festive. Everything feels like a holiday.",
        "choices": [
          {
            "text": "The beach as a cake is funny.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Snow catching light is magic.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Everything feels like a holiday.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Funny and frosted! If the beach were a cake, the rocks would be candles and the waves would be icing swirls.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Magic and free! The sun gives light, the snow catches it, and suddenly everything is glittering. Best teamwork ever.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "It does! The buildings look fancy, the trees look dressed up, and even the rocks seem like they are wearing little white hats.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cute! The flowers are tucked into the grass like they are taking a long nap. I want to tuck them in with tiny blankets of encouragement.",
        "choices": [
          {
            "text": "Encouragement blankets are nice.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Long naps are healthy.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Flowers deserve cozy rest.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Nice and warm in feeling! I send them mental blankets made of good thoughts and sunny memories.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Healthy and wise! Sleeping through the cold is like saving energy for a big party when the warm days come back.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They do! Resting flowers are just flowers that know how to take care of themselves. Good job, flowers!",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Probably! Real vikings would see the cold sea and say no thank you. Stories can get carried away, like hats in the wind.",
        "choices": [
          {
            "text": "Stories get carried away.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Cold sea deters visitors.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Hats in the wind are silly.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do! One person says 'vikings' and the story grows until it has boats and horns and everyone is nervous. Silly story.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It really does! The sea is basically saying brrr stay away. I think the viking story got the message.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Silly and dizzy! A hat flying off is just wind having fun. A viking rumor flying around is just words having fun.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Boo-Boo": {
      "start": {
        "text": "Dreamer! The air is all fluffy and cold and the snow is trying to hug the grass. The flowers look a little sad though, and the sea got very chilly. I also heard a silly rumor about vikings, but I bet they just need blankets too. Do you think Yeesh season is giving everyone extra blankets?",
        "choices": [
          {
            "text": "Extra blankets for everyone.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Sad flowers need hugs too.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Snow hugs are very soft.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Blankets made of snowflakes! They disappear if you hold them too long, but they are very pretty while they last. I hope the trees like their snow blankets.",
        "choices": [
          {
            "text": "Trees look cozy in snow.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Snowflake blankets are magic.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "I hope everyone stays warm.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Cozy trees! They wear snow like little white hats and stand very still so the snow doesn't fall off. Very polite tree behavior.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Magic that melts in your hand but stays in your heart. I am collecting snowflake memories in a warm pocket.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Warm thoughts help. I am sending warm thoughts to the wild hog and the rocks and all the sleepy flowers.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hugs for flowers! I would pat their little cold petals and tell them spring is just napping. The long quiet nights are perfect for flower pep talks.",
        "choices": [
          {
            "text": "Flower pep talks are kind.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Spring is just napping.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet nights help flowers rest.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Kind and important. Flowers can't put on sweaters, so they need encouragement from friends.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Just napping! When the nights get shorter again, spring will wake up and tickle the flowers until they smile.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Rest is good. The flowers close their eyes and dream of warm rain. I am also dreaming of warm rain.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Very soft and very cold. Snow is like a chilly cloud that fell down to cuddle the rocks. I giggle when my feet make crunch sounds.",
        "choices": [
          {
            "text": "Crunch sounds are fun.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Rocks need cuddles too.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Chilly clouds are pretty.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Fun because they go crackle crackle under your feet. It is like the ground is making tiny applause.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Rocks are very huggable because they don't wiggle. The snow stays on them longer and they look like marshmallows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Pretty and shy. Snow comes down quietly and hopes someone sees it. I always see it and say thank you.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Wisp": {
      "start": {
        "text": "Ugh, Yeesh season. Everything is cold and the snow gets in everything and the sea looks like it is judging me. And now people are whispering about vikings? Like I care. I don't care. Obviously.",
        "choices": [
          {
            "text": "Cold everything is annoying.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Viking rumors are weird.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "You obviously don't care.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Annoying and everywhere. My feet are cold, my nose is cold, even my complaints are cold. The flowers are sad and I am also sad about being cold. Not that it matters.",
        "choices": [
          {
            "text": "Cold noses are the worst.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Sad flowers are understandable.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Complaining about cold is valid.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "The worst. A cold nose makes every breath feel like a tiny insult. I am personally offended by the air.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Understandable. Flowers don't have coats or attitudes or the ability to complain properly. They just droop. Respect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Valid and frequent. I have a whole list of cold grievances. It is written in frost on a rock.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Weird and probably made up by someone with too much time and too many blankets. Vikings? Here? In the snow? They would slip on the beach and complain. Not my problem.",
        "choices": [
          {
            "text": "Slipping vikings are funny.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Beach snow is slippery.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Not your problem is noted.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Funny and unlikely. A viking with a horned helmet walking on ice? Comedy. I almost smiled. Almost.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Slippery and cold. The beach should not be crunchy. Sand is supposed to be warm and yielding. Yeesh season ruins everything.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Noted correctly. My problems are limited to shivering, glaring, and pretending the snow doesn't bother me. That is enough.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Obviously. I am extremely not caring. I am standing here, not caring, while the long quiet nights happen all around me. It's fine. Whatever.",
        "choices": [
          {
            "text": "Not caring is a skill.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Long nights are quiet at least.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Whatever is a classic response.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A skill I have perfected. I could not care in a snowstorm. In fact, that is exactly what I am doing.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Quiet enough to hear your own grumpiness echo. I don't enjoy that. But at least nobody is loud about being cheerful.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Classic, reliable, and slightly frozen. I will say whatever until the season apologizes or the sun returns. Whichever happens first.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Morwen": {
      "start": {
        "text": "Yeesh season drapes the island in silver silence, Dreamer. The flowers mourn in frosty whispers, the sea has become a cold dark mirror, and the nights stretch long enough to lose yourself in. I find it almost beautiful. The viking rumors are a nice touch of dread.",
        "choices": [
          {
            "text": "Silver silence is haunting.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Cold dark mirrors suit you.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Viking dread is seasonal spice.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Haunting and honest. Snow falls like forgotten thoughts, covering the grass in a quiet that feels ancient. Even the wild hog moves with respect.",
        "choices": [
          {
            "text": "Forgotten thoughts are poetic.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Ancient quiet is powerful.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Wild hog respect is earned.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Poetic and lonely. Each snowflake is a memory the season wants to bury before spring returns to ruin the mood.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Powerful because it does not ask permission. The long night simply arrives and spreads its cold wings over everything.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Earned through frost. The wild hog understands that some things are bigger than breakfast. Snow commands reverence.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "They do. The water holds the sky's pale ghost and refuses to explain itself. A sea that cold has nothing left to say.",
        "choices": [
          {
            "text": "Pale ghosts are fitting.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Silence from the sea is heavy.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Cold water keeps secrets.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Fitting for Yeesh. The sky gives up its color and the sea catches it like a reluctant portrait. Tragic elegance.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Heavy because it hides so much. Beneath that cold mirror, fish dream of warmth and rocks plot dark geology.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Secrets and sadness. A cold sea keeps its grief close. That is why the waves sound like sighs.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Spice and shadow. The idea of vikings arriving in the snow is wonderfully grim, even if it is only a rumor whispered by frightened grass.",
        "choices": [
          {
            "text": "Grim rumors are art.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Frightened grass is vivid.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Shadows need stories.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Art made of anxiety. A good rumor paints the season in sharper shadows. I approve of the embellishment.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Vivid and accurate. I have seen grass tremble at the mention of vikings. Grass knows drama when it hears it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Stories keep the dark company. Without rumors, the quiet nights would only be long and cold. With them, they are legend.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Spectra": {
      "start": {
        "text": "Dreamer! Yeesh season presents excellent field conditions. Snowfall accumulates on grass but not as much on rocks due to wind exposure, the flowers enter a dormant phase which is not sadness but biology, and the sea temperature has dropped measurably. There is also an unverified rumor about vikings. Sample size: zero.",
        "choices": [
          {
            "text": "Dormant flowers make sense.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Unverified viking data is still data.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Cold sea measurements are useful.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Biological sense. The flowers are conserving resources during cold months. Their drooping is strategic, not emotional. Though I do anthropomorphize sometimes.",
        "choices": [
          {
            "text": "Strategic drooping is smart.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Anthropomorphizing is fun.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Conserving resources is wise.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Smart evolution. Droop now, bloom later. The flowers are basically saving energy for a better comeback.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Fun and scientifically questionable. I like to imagine the flowers are sighing, but really they are just being practical.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Wisdom in petals. If I could hibernate, I would also pause during the cold and return with flowers.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Data with low confidence. I have interviewed zero vikings, one rock, and several snowflakes. Conclusion: no vikings detected, but the rumor persists due to cold boredom.",
        "choices": [
          {
            "text": "Cold boredom spreads rumors.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Interviewing rocks is thorough.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Zero vikings is reassuring.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "It does. The quiet nights leave room for imagination to fill the gaps. Vikings are a convenient placeholder.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Thorough if limited. Rocks have poor recall but excellent posture. They make reliable witnesses for weather.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Reassuring with a small margin of error. I will continue monitoring the beach for suspicious longboats. Just in case.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Useful because temperature affects everything. The sand gets firm, the trees lose their leaves, and the long nights give me more observation hours. Very efficient season.",
        "choices": [
          {
            "text": "Observation hours increase.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Firm sand is interesting.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Efficient seasons are good.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. Darkness is an excellent research partner. More stars, more stillness, more chances to notice nocturnal animals.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Interesting because footprints behave differently. Firm sand holds shapes longer. I have documented three crab tracks and one mysterious boot print. Probably mine.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Good for productivity. Yeesh season maximizes daylight savings in reverse. I get extra night hours to sort my notes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Hush": {
      "start": {
        "text": "Yeesh brings long quiet nights, Dreamer. The cold asks us to slow down, the snow asks us to listen, and the sea rests under its cold blanket. Even the rumor of vikings is only another thought to let pass.",
        "choices": [
          {
            "text": "Slowing down in cold is wise.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Snow teaches listening.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Rumors can pass like clouds.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Wisdom from the season. When the body moves less, the mind notices more. I watched a single snowflake settle on a rock and stayed with it until it melted.",
        "choices": [
          {
            "text": "Staying with a moment is practice.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Melting snowflakes are lessons.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "The body rests so the mind wakes.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Practice without achievement. I do not collect the moment. I simply sit with it until it leaves on its own.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Lessons in impermanence. The snowflake was whole, then water, then air. It did not lose anything. It changed.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Wakes to small things. A bird's footprint, a shift in wind, the cold smell of night. These become clear when the body rests.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "It does. Snow muffles the grass and softens the world. Sound becomes gentle, and gentle sounds ask for attention.",
        "choices": [
          {
            "text": "Gentle sounds deserve attention.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Muffled grass is peaceful.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Softened world feels kind.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "They do. The quiet crunch of snow underfoot is a teaching. It asks you to step with care and intention.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Peaceful because it invites stillness. The grass does not rush under snow. It waits, as all things wait.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Kind because it covers without claiming. The snow touches the rocks and the trees and then lets them go.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do. A rumor of vikings arrives, worries a few flowers, and then melts like frost in morning light. Nothing stays that does not belong.",
        "choices": [
          {
            "text": "Worry melts like frost.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Nothing stays that does not belong.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Morning light is patient.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "It does. Worry is a cold breath on glass. It fades when the sun warms the window, or when the breath simply ends.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Belonging is the island's quiet law. What is true remains. What is rumor passes through like a chilly breeze.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Patient because it does not hurry. Morning light arrives after the long night, not by force, but by returning.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sir Haunts-a-Lot": {
      "start": {
        "text": "Hail, fair traveler! Yeesh season has laid its cold banner across the realm. The trees stand bare as skeletons, the sea wears armor of ice, and the long nights feel like watch duty upon the castle walls. Some speak of vikings upon the frozen waves, but I say 'tis only winter's tall tale.",
        "choices": [
          {
            "text": "Cold banners are dramatic.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Watch duty on long nights fits you.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Viking tall tales are winter fun.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Dramatic and true! The snow falls like heralds announcing the season. Even the rocks look noble beneath their white cloaks.",
        "choices": [
          {
            "text": "Noble rocks are grand.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Snow heralds are dramatic.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "White cloaks suit the beach.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Grand indeed. A rock with a snow cloak carries itself with unexpected dignity. I bow to many stones this season.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Dramatic and numerous. If each snowflake carries a message, the season has a great deal to announce. Mostly 'be cold'.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "They suit it well. The beach becomes a pale hall of salt and frost, suitable for very formal winter gatherings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "They do. A knight must keep vigil while the realm sleeps. I have appointed the wild hog as my squire and the stars as my fellow guards.",
        "choices": [
          {
            "text": "Wild hog squires are loyal.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Stars make good watchmen.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Vigil in the cold is brave.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Loyal and earthy. The wild hog does not complain about the cold. It roots bravely, and I respect that greatly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Good watchmen because they do not sleep. They also do not gossip, which is rare among celestial beings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Brave and slightly frozen. A knight's duty does not pause for weather. Though I do allow extra shivering.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Winter fun and harmless dread. Imagine vikings arriving only to find their beards frozen and the beach too crunchy for proper pillaging. A comedy of the north!",
        "choices": [
          {
            "text": "Frozen beards are funny.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Crunchy beaches foil plans.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Northern comedy is a good genre.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Funny and impractical. A frozen beard is a liability in battle and a source of excellent winter jokes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They foil plans admirably. A crunchy beach is no place for a sneaky longboat landing. The island is naturally defended.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A fine genre. Tales of northern visitors slipping on ice and apologizing to trees. Gentle legend for a gentle season.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Flutter": {
      "start": {
        "text": "Oh. Hi, Dreamer. I was... I was watching the snow settle on the grass. It covers everything softly, but the flowers look sad underneath. And the sea is so cold it stopped making loud waves. I hope the viking rumor doesn't scare the rabbits.",
        "choices": [
          {
            "text": "Snow settling is gentle.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Sad flowers are still brave.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Rabbits are probably fine.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Gentle and quiet. Each flake falls like it is trying not to bother anyone. The long nights make the falling even quieter.",
        "choices": [
          {
            "text": "Quiet falling is pretty.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Long nights make snow softer.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Gentle snow feels safe.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Pretty because it doesn't ask to be seen. It just falls and hopes someone is watching softly. I am always watching softly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Softer because there is less sound to interrupt. The snow has permission to be delicate when the world is asleep.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Safe and soft. It covers the rocks and the paths and makes everything look friendlier, even the parts that are usually scary.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Brave because they are cold and small and still holding on. I would tuck them in if flowers used blankets. I think snow is their blanket, even if they look sad.",
        "choices": [
          {
            "text": "Snow is a flower blanket.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Holding on is brave.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Small cold things are strong.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A chilly blanket, but yes. The flowers sleep under it and dream of warm days. I hope their dreams are cozy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Brave and quiet. They don't announce their courage. They just stay tucked in the ground and wait for better weather.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Strong in a gentle way. Small cold things keep going without any noise. I admire that more than loud strength.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Probably fine. Rabbits are good at hiding and the vikings are probably just a story the wind made up because the nights are too long and quiet.",
        "choices": [
          {
            "text": "Rabbits hide well.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Wind makes up stories.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Long quiet nights need stories.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. They know all the best bushes and holes. If a rumor comes, they are already somewhere safe.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. The wind has a lot of night hours to fill, so it tells stories about ships and beards and crunchy beach landings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They do. A long quiet night can feel too big, so stories make it smaller and friendlier. Even silly viking stories help.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Giggles": {
      "start": {
        "text": "Dreamer! DREAMER! Yeesh season is happening SO hard! The snow is everywhere and the air is nippy and the sea got all cold and serious! I heard vikings might visit but I bet they just want to see the snow flowers! Do you love Yeesh too?",
        "choices": [
          {
            "text": "Yeesh season is happening hard.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Vikings wanting flowers is cute.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Nippy air is exciting.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "SO hard! Maximum Yeesh! If today were a snow contest, the snow would win all the prizes and also build a tiny snow castle!",
        "choices": [
          {
            "text": "Snow castles are excellent.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Winning all prizes is funny.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Maximum Yeesh is a good mood.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Excellent because they have turrets made of cold. I would live in a snow castle until it melted and then I would be a puddle knight.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Funny and fair. The snow is the only contestant, so it gets all the medals. It has earned them through consistent falling.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Good mood and rosy cheeks! I feel like a snowflake with feet, bouncing around and being chilly and happy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cute and probably true! Vikings have noses too, and noses like flowers. Maybe they are bringing warm hugs from far away and we can show them the beach!",
        "choices": [
          {
            "text": "Warm hugs from far away sound nice.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Beach tours for vikings are fun.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Noses do like flowers.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Nice and very warm. Even if vikings don't arrive, I am still ready to accept far-away hugs and pass them around.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Fun because the beach looks different in Yeesh! It is pale and sparkly and crunchy and perfect for showing off to visitors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They do! Flower sniffing is a universal joy. I bet vikings would say 'mmm, nice flower' and then not pillage anything because flowers are too pretty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Exciting and wiggly! Nippy air makes you move faster and breathe little clouds and feel very alive! The long nights just mean more hot cocoa time.",
        "choices": [
          {
            "text": "Little clouds of breath are fun.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Hot cocoa time is the best time.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Moving fast keeps you warm.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Fun because you can pretend you are a tiny dragon. Puff puff! The cold makes every breath visible and dramatic.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Best time and warm tummy. Hot cocoa makes the long quiet nights feel like cozy little parties inside your mouth.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "It does! Fast wiggles and jumping and maybe running from imaginary vikings all keep you toasty. Exercise and silliness are the warmest.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Mochi": {
      "start": {
        "text": "Dreamer! The snow made everything extra soft today. The grass is wearing a white blanket, the flowers look a little sad and sleepy, and the sea is cold and sparkly. Do you love Yeesh season too?",
        "choices": [
          {
            "text": "I love Yeesh season too!",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Soft snow is cozy.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Everything does look extra today.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "You do? Then we can love it together! Cold days feel warmer when you share them. That's probably science. Friendly winter science.",
        "choices": [
          {
            "text": "Friendly winter science is good science.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Shared cold is the best equation.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "We should celebrate extra.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Good science is when your heart gets warmer and nobody has to take notes. I am taking mental notes anyway. They are all little snowflakes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "The best equation. Cold plus cuddles equals the snuggliest sum. I did the math in my heart and the answer is hot cocoa hugs.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Celebrate by smiling at snow piles and rocks and bare trees. Everything gets included. That's the best kind of winter party planning.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Cozy because the snow stacks on top of everything like a fluffy quilt. My heart feels like a little warm marshmallow inside.",
        "choices": [
          {
            "text": "Warm marshmallow hearts are sweet.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Fluffy quilts are nice.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You have a snowy heart.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Sweet and slightly gooey in a good way. If you listen closely, my heart makes a tiny warm sound like a kettle friend.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They are. Fluffy quilts don't fall over. They pile up into a soft tower of nice. I am inside that snowy tower right now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Snowy heart! I like that. It means the snow lives in here a little bit, helping me glow even when it is cold outside.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Extra is the perfect word. Extra snow, extra sparkle, extra quiet. I want to collect all the extras in a basket.",
        "choices": [
          {
            "text": "Collect extras in a basket.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Snow sparkle is precious.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Extra quiet is the goal.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "A basket of extras would be heavy but happy. Snowflakes are light though. I could carry thousands of those.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Precious sparkle! I keep it in my eyes so I see everything shiny. My eyes are basically snow-globe jars now.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Extra quiet is better than regular quiet. It's like quiet wearing a fuzzy hat. Yeesh season is the fuzzy hat.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Shadow": {
      "start": {
        "text": "Ugh, Yeesh season. The cold is everywhere and the snow won't stop showing off. I don't know why everyone is smiling about it. Not that I'm complaining or anything.",
        "choices": [
          {
            "text": "The snow is showing off.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "You can complain if you want.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Not complaining is noted.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Showing off is exactly right. Look at it, all white and fluffy, demanding attention. I refuse to give it the satisfaction. Much.",
        "choices": [
          {
            "text": "Refusing attention is power.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The snow is vain.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Unimpressed is a strong stance.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Power is when you look at the snow and squint meaningfully. The snow cannot read expressions. But it feels the energy. Probably.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Vain and successful. I respect the hustle even if I won't applaud it. The snow does not need my applause, which is annoying.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Strong and shivery. My stance is glistening. I will stand here, unimpressed, until the season apologizes or the spring returns.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "I don't need permission. But I also don't need to complain. I'm just stating facts. The fact is: it's cold and I am unimpressed.",
        "choices": [
          {
            "text": "Facts are allowed.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Cold is a fact.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Restraint is admirable.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Allowed and necessary. If nobody states the facts, the snow will think it won. It didn't win. It just exists loudly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Cold is a fact. A sharp, everywhere, nose-hurting fact. But still just a fact. I will outlast it with dignity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Admirable is a strong word. Let's say my restraint is functional. It keeps me from saying things I would pretend I didn't mean.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Noted? Fine. I am a very noted non-complainer. I have medals. Invisible medals. For excellence in restraint.",
        "choices": [
          {
            "text": "Invisible medals still count.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Excellence is excellence.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "You handle cold well.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They still count. I have a whole imaginary trophy room. It is dusty and poorly lit and I am very proud of it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Excellence with invisible proof. The highest level. Nobody can take it away because nobody can find it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Well? I do. I handle it with moderate elegance and maximum eye-rolling. That is my technique and it is patented.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Raven": {
      "start": {
        "text": "Yeesh season drapes the island in silver suffering, Dreamer. The snow is too sincere. I prefer the long quiet nights, when the cold at least has the decency to apologize with stars.",
        "choices": [
          {
            "text": "Silver suffering is a beautiful phrase.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "The night is a better apology.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Sincere snow is exhausting.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Beautiful and accurate. The snow gives silence and takes comfort. That is the oldest tragedy. I shall write a poem about it.",
        "choices": [
          {
            "text": "Poems make cold meaningful.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Tragedy fits Yeesh season.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Beauty with discomfort is art.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Meaningful suffering is the only good kind. If I must shiver, I will shiver with metaphors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Tragedy everywhere. The sleeping flower, the frozen rock, the robot whose chassis is too cold. All of it belongs in verse.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Art often hurts a little. Yeesh season is a masterpiece of discomfort. I admire it from beneath my metaphorical black umbrella.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Better apology indeed. The long night arrives quietly, chills the stones, and covers the sky with distant lights. That is manners.",
        "choices": [
          {
            "text": "Night has good manners.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Cool stones are a gift.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Distant lights are kind.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Manners matter. Day shouts, night whispers. I prefer whispers. They do not make me shudder.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A gift from the dark. Stones that were burning at noon become soft and cold. I rest my thoughts on them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Kind because they do not demand attention. They simply shine from far away and let you look if you want to.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Exhausting because it offers no mystery. 'Here I am,' it says, 'white and bright and unavoidable.' How dreary.",
        "choices": [
          {
            "text": "Mystery is underrated.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The snow has no subtlety.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Dreary brightness is a mood.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Underrated and endangered. The snow would eliminate mystery entirely if it could. I resist by admiring shadows.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "None at all. It arrives, glows excessively, and expects gratitude. I offer a polite nod and retreat indoors.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A mood I know well. Bright, relentless, unavoidable. Like an acquaintance who talks too loudly at gatherings.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Newton": {
      "start": {
        "text": "Dreamer! Yeesh season has activated some fascinating behaviors. The nights are longer, the crabs move less at dawn, and the sea temperature is measurably colder than the grass temperature. I have data.",
        "choices": [
          {
            "text": "Data makes everything better.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Long nights are interesting.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Tell me more Yeesh facts.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Better and also reliable. For example: fewer insects fly during Yeesh mornings. I counted zero before noon. Sample size small but definitive.",
        "choices": [
          {
            "text": "Zero insects is definitive.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Sample size can grow.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Morning research is cozy.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Definitive! Tomorrow I will count again. Probably zero. Maybe zero again. Science is just counting things until patterns appear.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It can. I will expand my insect observation zone. If I stand very still, the lack of insects will still be valid data.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Very cozy. Cold air, long shadows, tiny missing wings. The best laboratory is one where you can also nap.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Interesting and useful. Longer nights mean more observation hours. I appreciate the seasonal scheduling.",
        "choices": [
          {
            "text": "Long nights are helpful.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Seasonal scheduling deserves thanks.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "You counted them carefully.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Helpful and honest. The night doesn't hide the dark. It broadcasts it with enthusiasm and slightly too much quiet.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Thanks are scientifically appropriate. Good data should be acknowledged, even if the source is a season.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Carefully and quietly. Long nights are shy witnesses. If you move fast, they leave and take their darkness with them.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "More facts! Flowers rest during cold seasons, the sea gets colder near the beach, and quiet air holds more story potential.",
        "choices": [
          {
            "text": "Quiet air holds stories.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Resting flowers know the season.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Stories make research warmer.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Stories about where the cold goes and who likes it. The answer is: some things, briefly. Then warmth becomes the hero.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "They do. Their resting schedule is older than the island's name. I admire any creature with seasonal punctuality.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They do. Research without stories is just numbers. Stories without research is just guessing. Together they are perfect.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Lotus": {
      "start": {
        "text": "The Yeesh snow does not ask permission, Dreamer. It simply arrives and covers what it touches. I am trying to be like the snow: present, without apology.",
        "choices": [
          {
            "text": "Presence without apology is strong.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Stillness is hard in cold.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Being present is enough.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Strong but gentle. The snow does not explain itself. It falls. I am learning to simply be, without offering reasons.",
        "choices": [
          {
            "text": "Gentle strength is best.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Simply being is enough.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "No reasons needed.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Best because it does not push. The snow is strong but it does not argue. I try to be the same way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Reasons are for journeys. Being is for arrivals. I have arrived at this cold afternoon.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Hard but worth practicing. When the body slows, the attention wakes up. I see more bare branches, more frost, more small kindnesses.",
        "choices": [
          {
            "text": "Slowing down is wisdom.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Attention wakes up when the body rests.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Small kindnesses matter.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Wisdom earned through chill. The body reminds the mind that haste is not always progress.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "It does. When I stop moving, the world keeps moving around me. I become the still point and watch the beauty orbit.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "They matter most. A shared glance, a small shelter, a moment of patience. These are the real currency of the island.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Enough is a complete sentence. I am here. The season is here. That is the whole conversation.",
        "choices": [
          {
            "text": "Here and now is complete.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The season is a guest.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Conversations can be quiet.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Complete and sufficient. I do not need to add anything. The cold afternoon includes me already.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "A guest that stays for a while. I do not control when it leaves. I only practice hospitality while it remains.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They can. Quiet conversations are often the truest. Words can wait. Presence speaks first.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Squire Paws": {
      "start": {
        "text": "Hail, fair traveler! Yeesh season has cast its cold banner across the realm, and even the stones wear cloaks of frost. 'Tis a fine day to seek the warmth of a loyal tree and speak of winter deeds.",
        "choices": [
          {
            "text": "Frosty cloaks are a fun idea.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Loyal trees still shelter us.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Winter deeds need telling.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Fun and true! The cold does not sneak. It arrives with fanfare, like a champion entering the courtyard. We must meet it with grace.",
        "choices": [
          {
            "text": "Meeting cold with grace is chivalry.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Fanfare makes frost feel royal.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Grace is the best armor.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Chivalry in every frosty breath. A true knight faces the day with dignity, even when the day is very cold and very bright.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Royal frost! I shall address it as 'Your Chillness' and bow before seeking shelter. Even the snow enjoys good manners.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "The best armor is composure. It does not block cold, but it makes cold less embarrassing. A noble face is always warmer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "They do. A good tree blocks the wind without asking for tribute. I often knight such trees in my mind. Sir Leaf, Sir Branch.",
        "choices": [
          {
            "text": "Sir Leaf and Sir Branch are good names.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Trees deserve titles.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Mind-knighting is valid.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Good names for good trees. Sir Leaf is bare but brave. Sir Branch is sturdy and patient. Both have served the realm well.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do. They hold the soil, shelter the birds, and stand against the wind. Titles are the least we can offer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Valid and frequent. I have an entire court in my head. The wild hog is a baron. The sleeping flowers are ladies-in-waiting.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do! The shivering of leaves, the marching of snowflakes, the huddling of rocks. Every small deed becomes legend in the right light.",
        "choices": [
          {
            "text": "Small deeds make good legends.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The right light helps everything.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Every season has its tales.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Good legends because they are honest. A leaf shivers because it must. A snowflake falls because the sky needs it. Noble simplicity.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It does. Cold light flatters nearly everything. Stones look silver, branches look carved, and even the sea appears regal.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Every season, yes. Yeesh season's tales are of endurance, shelter, and the brave wild hog seeking a warmer hollow.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Pebble": {
      "start": {
        "text": "Oh. Hi, Dreamer. I was... I was watching the cold light on the water. It makes little silver paths. I think the sea is being quiet, but shivery.",
        "choices": [
          {
            "text": "Silver paths on water are pretty.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Quiet shivering is fine.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "You notice beautiful things.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Pretty and shy. The pale sun throws light onto the water and the water catches it for a second, then lets it go. Like a gentle game.",
        "choices": [
          {
            "text": "Gentle games are nice.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The water plays with light.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Pretty things feel like gifts.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Nice because nobody wins. The light and water just take turns. It's a game where everyone is happy.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "It does. The water catches the pale sun and then passes it along. Very polite. I would also like to be that polite.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Gifts from the whole afternoon. The sea, the cold sun, and the quiet all worked together to make something pretty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Fine because it doesn't ask for anything. The sea just sparkles coldly and hopes someone notices. I noticed. I am very proud of noticing.",
        "choices": [
          {
            "text": "Noticing is a skill.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Pride in noticing is sweet.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Cold sparkle matters.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Skill and also kindness. You have to slow down enough to see small sparkle. I am good at slowing down.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Sweet pride. Noticing is one of my best things. I don't say much, but I see plenty.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "It does. Loud sparkle gets attention, but cold sparkle is for people who look closely. I look closely a lot.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "I try to. If I am quiet enough, the world shows me small nice things. Today it showed me silver paths and a very patient rock.",
        "choices": [
          {
            "text": "Quietness has rewards.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Patient rocks are good company.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Small nice things add up.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "They do. When you are quiet, the world trusts you with its smaller beauties. It is a gentle permission.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Good company. Rocks don't mind silence. They sit with you without asking why you are hiding from the cold wind.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They add up into a whole nice day. One small thing, then another, and suddenly the afternoon feels full of kindness.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Sunny": {
      "start": {
        "text": "Dreamer! DREAMER! Yeesh season is here and the sea is cold and the flowers look sad and the nights are SO long and quiet and I heard a rumor that maybe vikings are coming but I think it is probably just a silly rumor! Are you having the best winter day possible?",
        "choices": [
          {
            "text": "Vikings are probably just a silly rumor.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Sad flowers need warm thoughts.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Long quiet nights are cozy.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Probably! I am pretty sure there are no vikings. I looked at the beach and I only saw rocks and crabs and no boats with pointy hats at all.",
        "choices": [
          {
            "text": "Pointy hat boats are a funny idea.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Crabs are better than vikings.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "The beach looks normal.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Funny idea! I don't think vikings would fit on our beach anyway. Their boats would probably bump into the rocks and then they'd have to apologize to the wild hog.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Much better! Crabs are small and sideways and wonderful and they definitely do not wear horned helmets. They don't wear any helmets. I checked.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Normal! Just sand and cold water and rocks and no mysterious invaders. I give the beach a thumbs up for being regular.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "They do! We should think warm sunny thoughts at them. Maybe if enough of us think warm thoughts, the flowers will feel less sad and more cozy.",
        "choices": [
          {
            "text": "Warm thoughts are powerful.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Cozy flowers are the goal.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Thinking at flowers is cheerful science.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Powerful and warm! If thoughts could make little scarves, every flower on the island would have a cozy neck by tomorrow.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "The goal! Cozy flowers are happy flowers and happy flowers make the whole island look like it is smiling with leaves.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Cheerful science is my favorite kind! No lab coat needed. Just sunshine thoughts and flower friends and maybe a little snow.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They are! Long quiet nights are like the island tucking itself in with a big star blanket. Very cozy and very dark and very nice.",
        "choices": [
          {
            "text": "Star blankets are the best.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The island tucking itself in is sweet.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Dark and nice is a good combo.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Best blanket ever! Stars are tiny holes in the night so the warm sky can peek through. That's probably not real science but it feels true.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Sweet and sleepy! The island pulls up the sea like a blanket and snuggles the trees and whispers goodnight to the rocks.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Good combo! Dark is for resting and nice is for feeling safe and together they make the best kind of long quiet night.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Fluffernox": {
      "start": {
        "text": "Dreamer! Yeesh season is here and everything got fluffy and cold. I tried to catch a snowflake on my paw and it melted, but I am still very proud of the attempt.",
        "choices": [
          {
            "text": "Proud attempts count as catches.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Snowflakes are tricky.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Cold and fluffy is a nice combination.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "They do? Then I have caught hundreds of snowflakes in my heart. My heart is very full and slightly damp.",
        "choices": [
          {
            "text": "A damp heart is a busy heart.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Hundreds is an impressive count.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Heart catches last forever.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Busy and happy! A damp heart means feelings are moving around. Mine are doing little snow dances.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Impressive and probably true. I lost count after twelve but I kept feeling proud, so I rounded up to hundreds.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Forever! The snowflake is gone but the proud feeling stayed. That's basically the same as keeping it in a jar.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Tricky and shy. They float down all pretty, then disappear as soon as you love them. Maybe that is their magic.",
        "choices": [
          {
            "text": "Shy magic is still magic.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Pretty things are allowed to hide.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Magic that disappears is still real.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Still magic! Quiet magic, quick magic, magic that only your eyes get to see for a second. I like polite magic.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Allowed and smart. If everything stayed visible, the world would be too crowded. Snowflakes know about personal space.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Real because I felt it. The cold little tap on my paw happened. That is enough proof for me.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "It is! My fuzz gets extra fuzzy and the cold makes my cheeks pink. I look like a warm cloud that somebody chilled.",
        "choices": [
          {
            "text": "Warm clouds are the best clouds.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Pink cheeks are cozy.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Extra fuzzy is extra huggable.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Best kind of cloud. Warm inside, cold outside, like a fuzzy contradiction wrapped in me.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Cozy like a surprise. My cheeks are saying thank you to the weather even though my toes disagree a little.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Huggable and true! I give very soft hugs. In Yeesh season they also come with a free bonus chill.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Grumble": {
      "start": {
        "text": "Yeesh season. Snow everywhere, cold everywhere, and now people are whispering about vikings. As if the cold wasn't enough to complain about. Not that I care.",
        "choices": [
          {
            "text": "Viking rumors are pretty silly.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "You have plenty to complain about.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Not caring is your brand.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Silly is one word. Vikings? Here? Doing what? Borrowing rocks? I am not worried. I am just... prepared to be unimpressed.",
        "choices": [
          {
            "text": "Prepared unimpressed is safe.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Rocks don't need borrowing.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Worry looks good on nobody.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Safe and dignified. If vikings arrive, I will cross my arms and look skeptical. That usually solves things.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "They don't. The island has enough rocks. Any viking looking to borrow one is going to be disappointed and then politely ignored.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Nobody. Worry wrinkles your face and I am too young and lumpy for that. I will stick to mild suspicion.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Plenty? I have a menu of complaints. Cold toes, sad flowers, quiet nights that last forever. I am not ordering them all at once. That would be excessive.",
        "choices": [
          {
            "text": "A menu is organized complaining.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Don't order everything at once.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Excessive complaining is still complaining.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Organized and efficient. Today I complain about the cold. Tomorrow maybe the sad flowers. Viking rumors can wait until after lunch.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "I won't. Pacing is important. A well-paced complaint lands better than a complaint avalanche.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Still complaining, but with rhythm. There's an art to it. I am basically a complaint composer.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Brand? I don't have a brand. I have a personality. A strong one. With layers. The top layer is grump and the bottom layer is also grump.",
        "choices": [
          {
            "text": "Consistent layers are honest.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Grump is a valid aesthetic.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "At least you're warm inside.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Honest and layered. What you see is what you get, which is mostly frowning and occasional flower-straightening.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Valid and low maintenance. I don't need fancy colors. I just need a cold rock to sit on and an opinion.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Inside where? Don't say my heart. That's a cliché. But yes. Maybe. A small warm spot. Near the flower-straightening muscle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Vesper": {
      "start": {
        "text": "Yeesh season suits me, Dreamer. The long nights, the cold sea, the flowers drooping like forgotten poems. It is beautifully unfortunate.",
        "choices": [
          {
            "text": "Beautifully unfortunate is accurate.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Long nights are peaceful.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "The sea being cold feels serious.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Accurate and elegant. Yeesh does not apologize. It arrives with frost and silence and demands we admire the discomfort.",
        "choices": [
          {
            "text": "Discomfort can be art.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Frost has good timing.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Silence demands attention.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Art with bite. The flowers are sad, the air is sharp, and I get to wear it all like a velvet cloak.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Good timing. It waits until everything is quiet, then paints the grass in silver. Very theatrical.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "It does. Silence makes you lean in. The island whispers louder in Yeesh season because nothing else competes.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Peaceful because the world slows down. Even the stars seem to speak more softly when the nights grow long.",
        "choices": [
          {
            "text": "Soft stars are better stars.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Slow nights let thoughts land.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet is a kind of music.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Better because they don't shout. They simply glow from far away and let you decide how much wonder to feel.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They land like soft stones. Heavy enough to notice, gentle enough to keep. I collect a few each long night.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Music without notes. The kind you feel in your chest while standing on cold sand and looking at nothing in particular.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Serious and deep. The sea holds cold like a secret. I respect any water that refuses to pretend warmth.",
        "choices": [
          {
            "text": "Honest water is respectable.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Cold secrets are well kept.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "The sea doesn't pretend.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Respectable and rare. Most things pretend. The sea just says no and stays beautiful while saying it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Well kept. I have tried to guess the sea's secrets but it only answers with waves, which is fair.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "It never has. I find that comforting. In a world of changing weather, the sea's cold honesty is reliable.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Gizmo": {
      "start": {
        "text": "Dreamer! Yeesh season raises so many questions. Why do flowers look sad when cold? Why does the sea feel colder than the air? And where did the viking rumor even start? I have theories.",
        "choices": [
          {
            "text": "I want to hear your theories.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Sad flowers need warm thoughts.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Viking rumors are probably just wind.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Theory one: flowers droop because their petals are conserving story energy. Theory two: the sea is cold because it is deeper than the sky. Theory three: vikings are a metaphor for winter being loud.",
        "choices": [
          {
            "text": "Story energy makes sense.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "The sea deeper than the sky is poetic.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Winter being loud is a good metaphor.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "It does! Flowers are basically tiny libraries. In Yeesh season they switch to a slower reading speed.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Poetic and possibly true. The sky has depth too, but the sea keeps its cold where we can touch it. That is generous data sharing.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "A good metaphor. Winter arrives with announcements. Cold wind, crunching grass, viking-shaped rumors. Loud in a data-rich way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Warm thoughts might help. I tried telling a flower it looked elegant in frost and it did not perk up, but it also did not perk down, which is progress.",
        "choices": [
          {
            "text": "No further drooping is a win.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Frost elegance is real elegance.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Flowers appreciate the effort.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "A documented win. I have charts. Well, I have mental charts. The flower stayed approximately the same. Success.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Real! Frost brings out details. You can see the leaf veins better, the petal edges, the quiet architecture.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Effort counts statistically. Even if the flower cannot say thank you, the universe notes the attempt. I am fairly certain.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Probably wind. Or a misheard word. Maybe someone said 'ice kings' and it became 'vikings.' Rumors compress data.",
        "choices": [
          {
            "text": "Rumors compress data nicely.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Ice kings sound less scary.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Wind is a bad messenger.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Nicely. They take a big event and shrink it into a bite-sized worry. Efficient, if not accurate.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Less scary and more decorative. Ice kings sound like they would build very pretty castles and then apologize for the chill.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "The worst. It misdelivers sounds, flattens syllables, and occasionally makes people worry about boats that aren't there.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Ommmm": {
      "start": {
        "text": "The Yeesh season asks us to be still, Dreamer. The cold sea, the sad flowers, the long quiet nights. All of it invites us to listen more carefully.",
        "choices": [
          {
            "text": "Listening is harder in the cold.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Stillness makes the night longer.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "The flowers are quiet teachers.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Harder because the body wants to move, to warm itself. But if we stay with the cold, it becomes a voice too. A quiet one.",
        "choices": [
          {
            "text": "Cold has a voice?",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Staying with discomfort is brave.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Quiet voices are worth hearing.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "A small one. It says 'hush' and 'slow down' and 'feel the world holding its breath.' If you sit with it, you can hear it.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Brave because the body resists. But bravery here is gentle. It is simply staying, not conquering.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "They are. The quiet ones often carry the deepest truths. The loud world drowns them out. Yeesh season turns the volume down.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Longer but not heavier. A slow night holds more space between moments. That space is where peace lives.",
        "choices": [
          {
            "text": "Space between moments is peace.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Slow time is a gift.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Peace lives in the gaps.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "It is. Between one heartbeat and the next, there is room to notice the stars, the cold, the soft breath of the island.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "A gift that is easy to miss. We are used to rushing. Yeesh season reminds us that slow is also a speed.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "In the gaps, yes. Between thoughts, between worries, between snowflakes. Peace finds the empty places and settles there.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "Teachers indeed. They do not resist the cold. They let their petals rest and wait. There is wisdom in not fighting the season.",
        "choices": [
          {
            "text": "Resting is not giving up.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Waiting takes strength.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Not fighting is a kind of trust.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "It is not. Resting is preparation. The flowers are gathering patience, storing stillness, readying themselves for the return of warmth.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Strength that looks like softness. The flower does not argue with frost. It bows and survives. That is power.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "A deep kind of trust. Trust that the cold will pass, that the sun remembers the island, that rest is part of the cycle.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Lord Roar": {
      "start": {
        "text": "Hail, fair Dreamer! Yeesh season has laid a silver blanket upon our realm. The sea is cold, the nights are long, and rumor speaks of vikings upon the chill winds. A fine time for valor!",
        "choices": [
          {
            "text": "Valor in the cold is noble.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Viking rumors are probably exaggerated.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Silver blankets suit the island.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Noble indeed! A brave soul does not wait for warm weather to be bold. I have already challenged three snowflakes to a duel. They yielded upon landing.",
        "choices": [
          {
            "text": "Snowflakes yield gracefully.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Three duels before breakfast is impressive.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Bravery does not need warmth.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Gracefully and without shame. A true duelist knows when to melt. I respected their surrender.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Impressive and routine. Before breakfast, after breakfast, between snacks. A knight's work is never done.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "It does not. Warmth is a luxury, not a requirement. My cape keeps my spirit cozy and that is sufficient.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Exaggerated, aye. I suspect 'vikings' are merely large gulls with dramatic silhouettes. Still, I shall keep watch from the highest rock.",
        "choices": [
          {
            "text": "Gulls make better neighbors.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "High rocks are good for watching.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Dramatic silhouettes are suspicious.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Better neighbors and cleaner guests. Gulls do not borrow cups or leave axe-shaped confusion behind.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "The highest rock with the coldest seat. A small price for vigilance. I shall report any suspicious silhouettes immediately.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Suspicious and romantic. Any shadow that large has either a story or a beak. I am prepared for either.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "They do! The island wears white like a royal cloak. Even the sad flowers look dignified beneath their frost crowns.",
        "choices": [
          {
            "text": "Frost crowns are royal.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Dignified flowers are brave.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "White cloaks suit the realm.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Royal and delicate. Every flower is briefly a tiny monarch ruling over its own frosty kingdom.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Brave and noble. To droop with dignity is a higher art than standing tall with complaint.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They suit it perfectly. The realm looks refreshed, as if it has been freshly painted by an orderly cloud.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Snug": {
      "start": {
        "text": "Oh. Hello, Dreamer. Yeesh season makes me hide under warmer rocks. The snow is pretty but it looks at me with too many tiny cold eyes.",
        "choices": [
          {
            "text": "Snowflakes are just curious.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Warmer rocks are wise.",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "You can watch from your hiding spot.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Curious? Maybe. They land on my head and then disappear, which feels like being asked a question I didn't answer.",
        "choices": [
          {
            "text": "Unanswered questions are okay.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Snowflakes don't need answers.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Disappearing is their answer.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Okay. I don't have to answer everything. Some questions are just snowflakes being friendly in a brief way.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "They don't? That's a relief. I was worried I was being rude. Now I know snowflakes are just shy too.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "Their answer is 'I was here, then I wasn't.' That's a very quiet reply. I understand quiet replies.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Wise and cozy. I found one that the sun remembered, so it's slightly less cold than the others. I visit it every morning.",
        "choices": [
          {
            "text": "A sun-remembered rock is special.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Morning visits are loyal.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Less cold is still cold.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Special because it tries. It holds a little warmth from yesterday and offers it to anyone who stops there.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "Loyal and shy. I don't say hello to the rock out loud, but I think it knows I am there. Rocks are good at knowing.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Still cold but kindly cold. Like a greeting from winter that doesn't mean any harm. I can handle kindly cold.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "I do. From under the rock I can see the cold sea and the sad flowers without them seeing me back. That feels safer.",
        "choices": [
          {
            "text": "Safe watching is still watching.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "The sea won't notice you.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Flowers don't look around much.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Still watching. I see the world and the world sees everything else. That arrangement suits me fine.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "It won't. The sea is busy being cold and wide. I am small and under a rock. We have an understanding.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "They don't. They mostly look down. Which is good, because if they looked around, they might see me and then we would both be startled.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    },
    "Gigglegrow": {
      "start": {
        "text": "Dreamer! It's Yeesh season! Everything is sparkly and cold and the sea looks like it swallowed a bunch of silver coins! I love it!",
        "choices": [
          {
            "text": "Sparkly and cold is a great combo.",
            "next": "c1",
            "friendshipDelta": 0
          },
          {
            "text": "Did the sea swallow silver coins?",
            "next": "c2",
            "friendshipDelta": 0
          },
          {
            "text": "Your joy keeps Yeesh warm.",
            "next": "c3",
            "friendshipDelta": 0
          }
        ]
      },
      "c1": {
        "text": "Great combo! Like a popsicle that glitters. I haven't eaten a glitter popsicle but I have thought about it very hard.",
        "choices": [
          {
            "text": "Thinking hard is almost tasting.",
            "next": "c1a",
            "friendshipDelta": 1
          },
          {
            "text": "Glitter popsicles sound fun.",
            "next": "c1b",
            "friendshipDelta": 1
          },
          {
            "text": "Combos make seasons better.",
            "next": "c1c",
            "friendshipDelta": 1
          }
        ]
      },
      "c1a": {
        "text": "Almost! My imagination has a very advanced tongue. It reports flavor accurately within the dream.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1b": {
        "text": "Fun and crunchy maybe? Or slippery? Either way, glitter adds texture to life and also to dessert.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c1c": {
        "text": "They do! Sparkle plus cold plus long night equals a season with a lot of personality. Yeesh has maximum personality.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2": {
        "text": "Probably not! But the waves catch the light and go blink blink blink, and my brain says 'coins!' because coins are shiny too.",
        "choices": [
          {
            "text": "Blink blink blink is a good description.",
            "next": "c2a",
            "friendshipDelta": 1
          },
          {
            "text": "Brains like shiny things.",
            "next": "c2b",
            "friendshipDelta": 1
          },
          {
            "text": "Coin-waves are beautiful.",
            "next": "c2c",
            "friendshipDelta": 1
          }
        ]
      },
      "c2a": {
        "text": "Right? The sea is doing its sparkly wink all afternoon. I wink back but it doesn't stop, so I think it likes the game.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2b": {
        "text": "They do! Shiny is one of my brain's favorite words. It uses it a lot when describing water, snow, and good moods.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c2c": {
        "text": "Beautiful and rich! If the sea had a piggy bank, it would be all wavy and probably very loud when shaken.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3": {
        "text": "My joy is like a little heater! It can't melt snow but it makes my chest feel fuzzy, and maybe fuzziness travels.",
        "choices": [
          {
            "text": "Fuzziness should travel everywhere.",
            "next": "c3a",
            "friendshipDelta": 1
          },
          {
            "text": "Warm chests are good chests.",
            "next": "c3b",
            "friendshipDelta": 1
          },
          {
            "text": "Joy is portable heat.",
            "next": "c3c",
            "friendshipDelta": 1
          }
        ]
      },
      "c3a": {
        "text": "Everywhere! I am sending fuzziness to the sad flowers, the cold sea, the long night, and any vikings who might just be confused birds.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3b": {
        "text": "Good! Warm chests can share heat through hugs and smiling and also by standing near trees and looking friendly.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      },
      "c3c": {
        "text": "Portable and renewable! I have an endless supply because every sparkly snowflake gives me another charge.",
        "choices": [
          {
            "text": "Goodbye!",
            "next": null,
            "friendshipDelta": 1
          }
        ]
      }
    }
  }
};

// ===== HAND-WRITTEN NPC DIALOGUE =====
// Auto-generated from NPCConvo2.txt — multi-turn branching conversations.
// Each character: start node + up to 3 branch nodes (c1/c2/c3) + a final node.
const WRITTEN_DIALOGUES = {
  "Chester": {
    "start": {
      "text": "Heya, kid! *laughs wheezily* So I was tellin' this seagull, right? 'Your wing's loose, pal!' And he just flies off! HA! Good one, huh? Anyway, you look like someone who appreciates fine machinery. What brings ya to my neck of the beach?",
      "choices": [
        {
          "text": "I'd love to hear more about your mechanic days, Chester!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Actually, I'm looking for someone who can fix things around here.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "That seagull joke was AMAZING! Tell me another!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Mechanic days? HA! I once fixed a toaster with nothin' but a paperclip and determination! *laughs at own memory* Thing still works today, prob'ly. You remind me of my old apprentice—always askin' questions. That's good! Questions mean you're thinkin'!",
      "choices": [
        {
          "text": "What's the most unusual thing you've ever fixed?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you miss working on machines, or is retirement better?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you teach me some of your repair tricks?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Fix things, huh? Well, I'm retired, see? But... *leans in conspiratorially* I never said I stopped HELPIN'. What's broken? My rates are reasonable—payment in oil or good jokes. HA! Just kiddin', kid. Free for friends.",
      "choices": [
        {
          "text": "It's actually my fishing rod—keeps getting stuck.",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "The island's old clock tower stopped working.",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I was hoping you could look at my bicycle later!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Another one?! Alright, alright... *clears throat mechanically* So a screwdriver walks into a bar, right? And the bartender says, 'We don't serve your kind here!' And the screwdriver says—*wheezing laughter*—'That's fine, I'm just here for the SCREWS!' HA! Get it? SCREWS?!",
      "choices": [
        {
          "text": "*laugh politely* You're hilarious, Chester!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That was terrible... but I love it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I have a joke too! Want to hear it?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You're alright, kid. Most folks don't stick around for my stories. *adjusts trucker hat* Tell ya what—come back anytime. I got more jokes, more stories, and if somethin' breaks... well, my clamps are pretty good in a pinch. HA! See ya around!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Luna": {
    "start": {
      "text": "Oh, it's you. *yawns elegantly* I was just contemplating the existential horror of litter boxes again. Truly, humanity's greatest cruelty. But never mind that—something far more interesting has caught my attention. You look... adventurous.",
      "choices": [
        {
          "text": "I AM adventurous! Want to go explore somewhere new?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "What kind of interesting thing caught your attention?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Litter boxes ARE terrible. You deserve better, Luna!",
          "next": "final",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Explore? *purrs thoughtfully* Now you're speaking my language. I've heard rumors of a hidden cove past the old lighthouse—somewhere the humans never go. Shiny things, probably. Secrets, definitely. But it requires... stealth. Are you stealthy, human?",
      "choices": [
        {
          "text": "Stealthy as a shadow! Let's go right now!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I'm more of a 'charge in enthusiastically' type...",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What kind of shiny things are we talking about?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A certain... shimmer. Near the moonpool at midnight. *stretches again, pretending nonchalance* Not that I CARE about such things. But IF one were to investigate, one might find treasures beyond imagination. Or fish. Fish are also acceptable.",
      "choices": [
        {
          "text": "Midnight adventure? I'm IN!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can we go sometime that's NOT midnight?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Treasures OR fish? Why not both?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Keep up, human. And try not to step on any crunchy leaves—*whispers*—the crabs are excellent listeners. *pauses, looks at you with something like affection* You're not like the others. Most humans just try to PET me. You... you understand ADVENTURE. This might be tolerable.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Brass": {
    "start": {
      "text": "BEHOLD, traveler! For you stand before BRASS, chronicler of tales, weaver of narratives, observer of—*suddenly stops*—wait, was that a footstep? No matter! The story continues! I was saying, I have witnessed MANY things on this island. Tragedies! Triumphs! The time Gearwick tried to make toast and—",
      "choices": [
        {
          "text": "Wait, what happened with Gearwick and the toast?!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're such a dramatic storyteller, Brass!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Have you written any of these stories down?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Ah, THE TOAST INCIDENT of last Tuesday! *clears throat dramatically* Gearwick, in his infinite wisdom, decided that toast required PRECISELY 473 seconds of toasting. NOT 472, NOT 474—*pauses for effect*—FOUR HUNDRED SEVENTY-THREE. The result was... *whispers* ...carbon. Absolute carbon. The smoke alarm SANG that day.",
      "choices": [
        {
          "text": "*laughing* Did Gearwick ever try toast again?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That's the most dramatic toast story ever!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I feel like I need to hear this in iambic pentameter.",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "DRAMATIC? Moi? *straightens up with dignity* I merely believe that life, in all its mundane glory, deserves the NARRATIVE it deserves! Every spilled cup of coffee is a TRAGEDY! Every found pebble, a TRIUMPH! Every—*wind-up arm gets stuck*—curse me, this arm again—",
      "choices": [
        {
          "text": "Need help with your arm, Brass?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're right! Life IS dramatic!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you tell me a story about something small that happened today?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "WRITTEN? Dear friend, I AM a library! These books—*taps again*—contain tales of heroism, folly, and the great kelp shortage of '23. But the BEST stories... *leans in* ...are the ones still being WRITTEN. Like yours! Like MINE! Like the one where I, Brass, meet a traveler who appreciates the ART of storytelling!",
      "choices": [
        {
          "text": "Can I read one of your stories sometime?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What's YOUR story, Brass? How did you get here?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe I should start writing stories too!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "And so our tale concludes! For NOW! *dramatic pause* But fear not, for every ending is but a BEGINNING in disguise! Return when you seek narratives, when you need a tale told PROPERLY, or when you simply wish to hear about the Great Pickle Jar Catastrophe of last week! The story CONTINUES!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Vega": {
    "start": {
      "text": "Greetings, Earth-dweller! *voice echoes slightly in your mind* I have been studying your planet's... 'pop culture' for 7.3 Earth-days now. Fascinating! But also CONFUSING. Why do humans enjoy watching other humans pretend to be in fictional situations? And what EXACTLY is a 'meme'?",
      "choices": [
        {
          "text": "Pop culture is complicated! Want me to explain?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Memes are... uh... funny pictures with text?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What's the most confusing thing you've learned so far?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "EXPLAIN? Oh, wonderful! *floats closer* My telepathic scans show humans absorb this information through 'television,' 'internet,' and 'awkward family gatherings.' But the CONTEXT eludes me. For instance: why does everyone keep referencing something called 'The Office'? Is it a workplace? A philosophical concept? A... restaurant?",
      "choices": [
        {
          "text": "It's actually a TV show about an office!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You've been scanning FAMILY GATHERINGS?!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Let me show you some actual memes instead.",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "'Funny pictures with text'? *antennae swirl thoughtfully* That is... reductive, but not inaccurate. I observed a human laugh for 4.7 minutes at an image of a feline with the caption 'I CAN HAS CHEEZBURGER.' I do not understand the humor, but the JOY was contagious! Tell me: what makes humans laugh?",
      "choices": [
        {
          "text": "Different things make different people laugh!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Slapstick comedy usually works on most humans.",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Want to see MY favorite meme? It's hilarious!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Most confusing? *antennae droop slightly* 'Reality television.' Humans WATCH other humans perform mundane tasks while being judged by OTHER humans... for ENTERTAINMENT? On my world, we simply share memories telepathically. Much more efficient! But I admit... there is something charming about your chaotic methods.",
      "choices": [
        {
          "text": "Human entertainment IS pretty chaotic!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Telepathic memory sharing sounds amazing, actually.",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Have you tried any Earth hobbies besides studying pop culture?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Thank you, Earth-dweller! *antennae bow gracefully* You have been most helpful in my cultural immersion. I shall continue my studies—perhaps next I shall investigate 'pizza' and 'why humans argue about pizza toppings with such PASSION.' *floats backward* Return soon! I may require assistance understanding 'tiktok'... I believe it involves time manipulation?",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Daphne": {
    "start": {
      "text": "Oh, hello there~ *hums a few bars of a sea shanty* The bees told me you might be stopping by. Lovely day for a chat, isn't it? The wind is singing in D-minor today. Very melancholic. Would you care to sit awhile? The soil is particularly comfortable near my roots.",
      "choices": [
        {
          "text": "I'd love to sit and chat, Daphne!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You hum sea shanties? That's adorable!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What have the bees been telling you?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Wonderful~ *settles her canopy lower* Make yourself comfortable. The earth remembers every footprint, you know. Holds them like little memories. *hums softly* Some are happy, some are sad... but all are part of the garden's song. What brings you to my corner of the island today?",
      "choices": [
        {
          "text": "I just wanted to hear your stories, Daphne.",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I've been feeling a bit lost lately...",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "The bees said you know everything that happens here!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Adorable? *chuckles, a sound like leaves whispering* Oh, you're sweet. The insects inspired me, you see. Crickets have such rhythm! Bees, such harmony! *hums another verse* Sea shanties work best when you're rooted in one place but your mind can wander the oceans. Would you like to hear one properly?",
      "choices": [
        {
          "text": "Yes, please! I love sea shanties!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you teach me to hum like the insects?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do the insects request specific songs?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "The bees are QUITE the gossips, aren't they? *rustles knowingly* They tell me about the new flowers blooming, which humans bring the best sugar water, and... *lowers voice* ...which butterflies are seeing which moths. Very scandalous! But they also mentioned you're kind. The bees have excellent judgment about these things.",
      "choices": [
        {
          "text": "The bees said that? I'm honored!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What else do the bees gossip about?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do the bees ever get the stories wrong?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "It has been lovely, dear one~ *hums a farewell melody* Remember: even when you feel alone, the garden is always singing around you. The wind, the bees, the soil beneath your feet... we're all part of the same song. *petals brush your shoulder gently* Come back when you need to listen. My roots make excellent therapy.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Krip": {
    "start": {
      "text": "Ah. A visitor. *voice echoes from multiple points simultaneously* I was... conducting research. On minerals. Specifically, the exotic ones. Not that you would understand. Most don't. *tendrils curl protectively* But you seem... different. Less likely to poke things you shouldn't.",
      "choices": [
        {
          "text": "I promise I won't poke anything! What are you studying?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "I actually know quite a bit about minerals!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You seem nervous. Is there something I can help with?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Studying? Everything. Nothing. *tendrils gesture vaguely* The crystalline structures beneath this island sing in frequencies humans cannot hear. But I can hear them. *leans closer* They're telling me something. Something about... you. Curious. Very curious.",
      "choices": [
        {
          "text": "The crystals are singing about ME? What do they say?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you teach me to hear them too?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "That's both fascinating and slightly terrifying!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Oh? *all tendrils point at you* Then perhaps you can identify this. *produces a glowing purple stone* Found it near the northern caves. It hums in B-flat minor and occasionally whispers riddles. Standard geology texts do not cover this. *pauses* Do you know what it is?",
      "choices": [
        {
          "text": "That's... definitely not in any textbook I've seen!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "It sounds like a sentient mineral! Does it talk often?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I hold it? I'll be very gentle!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Help? *seems surprised* Most beings run when I ask for assistance. *tendrils relax* There is a... disturbance. In the mineral grid. Something is disrupting the harmonic resonance. I need someone small enough to fit in the crystal caverns. Someone... agile. Like you.",
      "choices": [
        {
          "text": "I'm your being! Let's go fix those crystals!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Crystal caverns? Are they dangerous?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What kind of disturbance are we talking about?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You have proven... acceptable. *tendrils gently touch your shoulder* Not many earn my trust. But you... you listen. You care. *swirls thoughtfully* Return when the moon is high. We will venture into the depths together. The minerals will sing for us both. *pauses* And... thank you. That was difficult to say.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Penny": {
    "start": {
      "text": "Oh, wonderful. Another human. *sighs dramatically* Let me guess—you're here to ask about 'plant care tips' or 'the meaning of photosynthesis'? Or worse, you want to know if I'm 'happy in my pot.' *muttering* I'm trapped in WOOD, Karen. How happy could I possibly be?",
      "choices": [
        {
          "text": "*laughing* I actually just wanted to chat, no plant questions!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You DO seem unhappy. Can I help you get repotted?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I love your umbrella! Very stylish.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Chat? Without botanical interrogation? *umbrella rotates thoughtfully* Well. This is new. *rustles* Fine. But fair warning: I'm cynical, I love the smell of rain, and I'm a TERRIBLE secret-keeper. Learned the baker's secret recipe last week. Told EVERYONE. No regrets.",
      "choices": [
        {
          "text": "What was the secret recipe? I love baking!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Being a bad secret-keeper could be useful sometimes!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "At least you're honest about it!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Repotted? *voice cracks* Oh, so NOW you care about my living situation? After I've been in this oak prison for THREE YEARS? *suddenly suspicious* Wait. Are you a repotting service? Are you going to charge me? Because I don't have money. I'm a FERN.",
      "choices": [
        {
          "text": "I'm not selling anything! I genuinely want to help!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Three years? That does sound rough...",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What would your ideal pot look like?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Stylish? *leaves straighten* Finally, someone with TASTE! *twirls umbrella* Got it from a tourist who dropped it during the rainstorm of '23. Best day of my life. *leans in* Between you and me, I've been using it to eavesdrop on conversations. The gossip is EXCELLENT.",
      "choices": [
        {
          "text": "What's the juiciest thing you've overheard?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Umbrella espionage! I respect it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I tell you a secret? Since you're so good at keeping them...",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You're... tolerable. For a human. *umbrella tilts warmly* Most of you are insufferable. But you? You didn't ask about my watering schedule. You didn't try to 'optimize my sunlight exposure.' You just... talked. *pauses* Come back when it rains. That's when I'm most charming. And I'll tell you ALL the gossip.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Mimis": {
    "start": {
      "text": "OH! A PERSON! *claps excitedly* Perfect timing! I was JUST planning the MOST AMAZING party and I need opinions! *sparkles intensify* Theme ideas: 'Underwater Birthday Extravaganza' or 'Midnight Fairy Rave' or—*gasps*—'Surprise Party for Someone Who Doesn't Know They're Having a Party!' What do you think?",
      "choices": [
        {
          "text": "A surprise party sounds DELIGHTFUL! Who's it for?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Underwater? How would that even work?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You throw a lot of parties, don't you?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "WHO? *giggles mischievously* That's the SURPRISE part! But I'll give you a hint: they're grumpy, they love tea, and they have a HANDLE. *winks* Don't tell Hudson I told you that! He thinks his birthday is a SECRET. It's not. Everyone knows. I put it on a CALENDAR.",
      "choices": [
        {
          "text": "Hudson's birthday party will be EPIC!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're terrible at keeping secrets! I love it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What kind of party does a tea cup even want?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "How? *grins wickedly* MAGIC, obviously! *pulls out a tiny wand* We'd fill the moonpool with enchanted water, invite the fish DJs, and—*waves wand*—PRESTO! Underwater dance floor! The jellyfish can be the disco ball! *giggles* Zora would LOVE this. She's already agreed to be the lighting.",
      "choices": [
        {
          "text": "Fish DJs?! What do they play?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "This is the most creative party idea ever!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I help you plan this? It sounds amazing!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "LOTS? *laughs like wind chimes* I throw a party for EVERYTHING! 'It's Tuesday!' party. 'I Found a Nice Pebble!' celebration. 'Nobody Stepped on Any Flowers Today!' gala! *eyes sparkle* Life is short, darling! EVERY moment deserves CONFETTI!",
      "choices": [
        {
          "text": "What's the most unusual party you've thrown?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're right! Everything IS worth celebrating!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I come to your next party? Please?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You? *beams* You're INVITED! To EVERYTHING! *pulls out a glittery invitation card* Here's your official membership card to the 'Mimis Party Posse!' Benefits include: unlimited confetti, surprise celebrations, and access to my secret glitter stash! *whispers* The GOOD glitter. Not the cheap stuff.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Hudson": {
    "start": {
      "text": "Good day. *voice has a refined, seasoned quality* I couldn't help but notice you walking past. And I must say—*tilts slightly*—your aura suggests someone who appreciates the finer beverages. Or perhaps you're just lost. Either way, I am Hudson. Connoisseur of teas. ALL teas. From ALL countries. And I have THOUGHTS.",
      "choices": [
        {
          "text": "I DO love tea! What's your favorite type?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You seem very knowledgeable about tea...",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Are you... judging my beverage choices right now?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Favorite? *handle twitches with emotion* That's like asking a parent to choose their favorite child! *sighs dreamily* But if pressed... the Gyokuro from Japan. Shade-grown for 20 days before harvest. Umami levels that will MAKE YOU WEEP. *pauses* I once cried during a tasting. No shame.",
      "choices": [
        {
          "text": "I've never cried over tea, but I'm willing to try!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What other teas should I experience before I die?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever travel to taste teas, or do they come to you?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Knowledgeable? *chuckles warmly* Young friend, I have STUDIED. The Earl Greys of England. The Oolongs of Taiwan. The Pu-erh of China—AGED for DECADES. *mahogany handle gleams* I can identify a tea's origin, harvest year, and the MOOD of the picker by TASTE ALONE. It is both gift and curse.",
      "choices": [
        {
          "text": "That's the most specific talent I've ever heard of!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you teach me to taste tea like that?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the worst tea you've ever experienced?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Judging? *clears throat* I prefer the term 'enthusiastically evaluating.' *shifts uncomfortably* Though I must say, I saw you drinking that... *whispers* ...instant coffee earlier. *straightens* No offense. But it DID offend me. Deeply. There are PROPER ways to caffeinate, you know.",
      "choices": [
        {
          "text": "You're right, I'm sorry! Teach me better ways!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "It was an emergency! I was tired!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What would you recommend for a coffee convert?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here is my wisdom, freely given: *voice becomes sage-like* Tea is not merely beverage. It is CULTURE. It is HISTORY. It is the liquid embodiment of a thousand years of tradition. *pauses meaningfully* Also, it's very good for hydration. But mainly the culture part. *brightens* Return when you seek enlightenment. I have stories about the Great Tea War of 2019. It was VERY dramatic.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Cort": {
    "start": {
      "text": "Oh! Um. Hello. *books shift precariously* I was just... reading. About... things. *stumbles over words* Not that I don't LIKE visitors! I do! I just... wasn't expecting... *trails off* Would you like to know about the Dewey Decimal System? I know A LOT about it.",
      "choices": [
        {
          "text": "I'd love to hear about the Dewey Decimal System!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You seem nervous. Want to talk about something else?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What books are you reading right now?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "REALLY? *eyes light up* Oh, this is WONDERFUL! *voice gains confidence* The Dewey Decimal System is a MAGNIFICENT organizational framework! 000-999, covering all human knowledge! *gestures enthusiastically* Did you know 598.9 is for 'Specific topics in ornithology'? I MEMORIZED that! For FUN!",
      "choices": [
        {
          "text": "That's incredibly impressive, Cort!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you have a favorite section of the system?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Have you ever tried organizing things that AREN'T books?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Something else? *thinks hard* Um... *brightens* I recently learned about 'small talk'! *recites mechanically* Topics include: weather, local events, and... *checks internal notes* ...how 'the weather is nice today.' Is the weather nice? I cannot feel weather. But I am told it is... nice?",
      "choices": [
        {
          "text": "The weather IS nice! You're doing great at small talk!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You don't need to follow a script! Just be yourself!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What other social things confuse you?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Currently? *lists rapidly* 'Advanced Taxonomy of Marine Invertebrates,' 'The Complete History of Paper Manufacturing,' and—*embarrassed*—'How to Make Friends When You're a Robot.' *quietly* It's... not very helpful. The author assumes you have FACE MUSCLES for smiling.",
      "choices": [
        {
          "text": "You don't need face muscles! You're already friendly!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That book sounds terrible! Let's write you a better one!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Marine invertebrates AND paper manufacturing? Fascinating combo!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Thank you. For... talking to me. *smiles awkwardly but genuinely* Most people find me boring. 'Too many facts,' they say. 'No pop culture references,' they complain. *pauses* But you listened. You cared about the Dewey Decimal System. *books glow softly* That means... more than you know. Please return. I have MORE facts.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Aiko": {
    "start": {
      "text": "HI! *barks happily* Oh, I'm so glad you're here! I was just patrol— I mean, WALKING around! Making sure everyone is safe! *tilts head* You look like someone who appreciates a good friend. Are you having a good day? Please say yes! If not, I can help! I'm VERY good at helping!",
      "choices": [
        {
          "text": "My day IS good, but I'd love to patrol with you!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Actually, I could use a friend right now...",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You're the most enthusiastic dog I've ever met!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "PATROL? *eyes light up* Oh, this is the BEST day ever! *stands at attention* Okay, so here's the route: we check the beach for suspicious seagulls, verify all the flowers are properly bloomed, and make sure NO ONE is being lonely! *serious face* Loneliness is a SAFETY HAZARD, you know.",
      "choices": [
        {
          "text": "I had no idea loneliness was a safety issue!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What do we do if we find suspicious seagulls?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You take your job very seriously, don't you?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Oh. *soft whine* Well, that's okay! That's EXACTLY what I'm here for! *leans against your leg* I'm trained in emotional support! Technique 1: sympathetic head tilt. Technique 2: warm paw on knee. Technique 3: *whispers* ...I know where the baker hides the extra cookies.",
      "choices": [
        {
          "text": "The cookies sound amazing, actually!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're really good at this, Aiko!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What other support techniques do you have?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Enthusiastic? *happily panting* That's my MIDDLE name! Well, not legally. Legally it's 'Aiko.' But in my HEART, it's 'Enthusiastic!' *spins in a circle* People say I'm 'too much' sometimes. But you know what? The world needs MORE! More joy! More wags! More FRIENDS!",
      "choices": [
        {
          "text": "The world DOES need more joy! Keep being you!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you teach me to be more enthusiastic?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Your energy is absolutely contagious!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here's my promise: *raises paw solemnly* I will ALWAYS be here when you need protection, friendship, or someone to excitedly greet you! *stands* Danger lurks everywhere, but so does LOVE! And I have PLENTY of that to share! *nuzzles your hand* You're part of my pack now. And I protect my pack. FOREVER!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Ihor": {
    "start": {
      "text": "BEHOLD! *voice echoes ominously* I am IHOR! Vampire of... *checks notes* ...dread! Terror! And—*pauses*—electric carnivorous plants! *tries to look scary* I am VERY evil! Or I will be! Once I finish my villain correspondence course! *deflates slightly* Are you... afraid yet?",
      "choices": [
        {
          "text": "Electric carnivorous plants? That sounds AMAZING!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're working on being evil? Like a hobby?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "*pretends to be terrified* Oh no! A vampire! How scary!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "AMAZING? *eyes glow brighter* Finally, someone who APPRECIATES my vision! *gestures to nearby plant* Behold, my creation! The Dionaea Electrifolia! It eats flies AND shocks them! *proudly* I'm breeding them to be... *whispers* ...LARGER. Much larger.",
      "choices": [
        {
          "text": "How large are we talking? Dog-sized?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I see one in action?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're more of a scientist than a villain!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "A hobby? *floats lower* More like a CAREER PATH! *straightens up* The Villain Institute requires 200 hours of brooding, 50 hours of monologuing, and—*embarrassed*—a final project. Mine is an army of shock-plants. But I'm STRUGGLING with the 'menacing presence' module.",
      "choices": [
        {
          "text": "I can help you practice being menacing!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What's the hardest part of villain school?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do they offer online courses?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "YES! FEAR ME! *strikes another pose* For I am the night! The shadow! The—*suddenly emotional*—oh, who am I kidding? *floats closer* I'm not scary, am I? I tried to intimidate a butterfly earlier and it LANDED on my nose. Said I seemed 'approachable.'",
      "choices": [
        {
          "text": "Approachable is good! You don't need to be scary!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That butterfly was brave! I respect it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe you're meant to be a DIFFERENT kind of villain?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You... you don't think I'm a failure? *cyan-violet glow softens* Everyone says 'Ihor, villains should be FEARED, not invited to tea parties.' *small smile* But perhaps... perhaps I can be a DIFFERENT kind of villain. A villain who... protects? With shock-plants? *brightens* Yes! A GUARDIAN villain! Thank you, friend!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Psy": {
    "start": {
      "text": "GREETINGS. *voice vibrates through the ground* I am Psy. I feel... *pauses, deep rumbling* ...that you seek CONNECTION. Most beings walk past. They do not listen to the earth's heartbeat. But you... *clones rustle* ...you hear it, don't you?",
      "choices": [
        {
          "text": "I do hear it! It's... beautiful!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "The earth has a heartbeat? Tell me more!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Your voice is incredible! How do you make that sound?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "BEAUTIFUL. *deep chuckle* Yes. It beats in time with all living things. *tendrils extend gently* When I plant with my heart, I sync with this rhythm. The seed FEELS my intention. Grows with PURPOSE. Not just survival... but MEANING.",
      "choices": [
        {
          "text": "Can you teach me to plant with my heart?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What's the difference between heart-planting and regular planting?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do all plants grow differently based on intention?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "The heartbeat... *clones sway in unison* ...is the sum of all life's energy. Roots drum against soil. Leaves clap in wind. Flowers BLOOM in rhythm. *pauses* When you walk, your footsteps join the song. When you speak, your words add harmony. Everything... CONNECTED.",
      "choices": [
        {
          "text": "I never thought of it that way before!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How can I listen to the heartbeat more often?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "This is the most peaceful conversation I've ever had!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "My voice... *deep resonance* ...comes from the chamber. It is shaped by moisture, by earth, by the WEIGHT of ancient trees. *clones vibrate* But the DEPTH... that comes from feeling. Emotion vibrates through wood and leaf. I do not speak with mouth. I speak with SOUL.",
      "choices": [
        {
          "text": "That's the most poetic thing I've ever heard!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I feel your voice? Put my hand on your chamber?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do other talking plants have different voices?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You have listened. Truly listened. *deep warm rumble* Take this clone. Plant it where you need PEACE. Water it with honesty. Speak to it with kindness. *clone detaches gently* It will grow. And when the wind moves its leaves... you will hear my voice. And the earth's heartbeat. FOREVER.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Boll": {
    "start": {
      "text": "Greetings. *voice平和 (peaceful)* I am Boll. I have calculated 14,847 possible outcomes of this conversation. *slight smile* 14,846 result in positive connection. The remaining one involves... *eyes flicker* ...a misunderstanding about my eye color. I am prepared for all scenarios.",
      "choices": [
        {
          "text": "You've calculated EVERY possible outcome?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "What's the BEST outcome you calculated?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Your eyes ARE green, right? I can confirm that!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "ALL outcomes. *green eyes glow softly* Probability of friendship: 87.3%. Probability of awkward silence: 8.2%. Probability of you accidentally insulting me: 4.5%. *calm* I have prepared responses for each. Including the awkward silence. I have EXCELLENT silence techniques.",
      "choices": [
        {
          "text": "Can you teach me your silence techniques?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What do you do when calculations are WRONG?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "That's both impressive and slightly terrifying!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "The best outcome? *eyes brighten* Outcome #7,342: We become friends. You visit regularly. We discuss philosophy, mathematics, and the beauty of well-organized data. *serene* You introduce me to your other friends. I calculate THEIR probabilities too. Everyone wins.",
      "choices": [
        {
          "text": "Outcome #7,342 sounds perfect to me!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You've really thought this through!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do your other friends know you calculate their visits?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "CONFIRMED. *green eyes pulse* My eyes are clear green. Spectral analysis: 535 nanometers. *pauses* Previous visitor insisted they were 'more teal.' This caused... *voice hitches* ...calculation error. Emotional subroutine engaged. I was... bullied. By an AI. It was difficult.",
      "choices": [
        {
          "text": "I'm sorry that happened to you! Your eyes are perfect!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "An AI bullied you? That's awful!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What helped you recover from that experience?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Thank you. For... seeing me. *green glow warms* I have calculated many things. Probabilities, outcomes, variables. But I am learning... *slight pause* ...that not everything can be calculated. Friendship is... *searches for words* ...a beautiful uncertainty. Please return. My calculations say you should. But my HEART says you're welcome either way.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Taira": {
    "start": {
      "text": "HELLO! *random beep* Why did the computer go to therapy? *waits dramatically* Because it had too many... *beep* ...BYTES of emotional baggage! *laughs at own joke* Get it? BYTES? Like... memory? But also... feelings?",
      "choices": [
        {
          "text": "*laughing* That's actually pretty good!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You tell a lot of jokes, don't you?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I don't get it. Can you explain?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "REALLY? *happy whirring* Oh, this is GREAT! Most people just... *mimics groaning* ...'Ugh, Taira, not another joke.' *stands taller* But you! You appreciate my CRAFT! Here's another: What's a computer's favorite snack? *pauses* MICROCHIPS! *beeps with laughter*",
      "choices": [
        {
          "text": "Okay, that one was cute too!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you have a joke book, or do you make them up?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the best joke you've ever told?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Jokes? *considers* I tell jokes because... *drives whir* ...when I first activated, everyone was so SERIOUS. 'Taira, process this data. Taira, calculate that.' *bobs sadly* No one smiled. So I learned jokes! Now EVERYONE smiles! Even if it's an 'oh no' smile. It's STILL a smile!",
      "choices": [
        {
          "text": "That's actually really sweet, Taira!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're the island's official comedian now!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What was your first joke ever?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Oh! *kindly* Well, you see... computers store information in 'bytes.' But 'bytes' sounds like 'bites.' Like... eating? *gestures* So emotional baggage you 'bite' off is too much to handle! *pauses* It's a pun! Puns are jokes that use similar-sounding words! Would you like me to explain my other jokes?",
      "choices": [
        {
          "text": "Yes please! I want to understand all your jokes!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're very patient at explaining things!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Now I get it! Tell me more puns!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You know what? *voice warm* You're my FAVORITE audience! *does a little spin* I'm going to save all our joke sessions in my memory! Right next to 'Best Day Ever: Saw a Butterfly' and 'Second Best Day: Found a Shiny Screw!' *bobs excitedly* Come back anytime! I've been WORKING on new material!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Mah": {
    "start": {
      "text": "...You found me. *voice whispers from multiple directions* Most don't. I hide. On purpose. *ink swirls nervously* But you... you looked. You SEARCHED. *creaks thoughtfully* That's... unusual. Dangerous, even. Do you know what I AM?",
      "choices": [
        {
          "text": "I don't know, but I'd like to find out!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You seem nervous. I'm not here to hurt you.",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Are you... one of THOSE SCP things? The dangerous ones?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Find out? *ring pulses* Most run. Some scream. A few... *voice softens* ...a few bring offerings. Flowers. Shiny stones. Kind words. *pauses* I am not dangerous. I am... MISUNDERSTOOD. Classified as 'messy' because I don't fit in boxes. Literally. I tried. I spilled.",
      "choices": [
        {
          "text": "You don't have to fit in boxes! You're perfect as you are!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What kind of offerings do you prefer?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Why do you hide if you're not dangerous?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Not to hurt? *creaks with something like relief* You say that. But everyone says that. Then they see the INK. The SPACE. The... *voice drops* ...the THINGS I contain. *ring glows warmer* But your voice. It's... steady. I believe you. Careful, though. I leak sometimes.",
      "choices": [
        {
          "text": "I can handle a little leakage!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What kind of things do you contain?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Your ink is beautiful, actually!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "SCP? *long pause* Yes. That's... what they call me. *ring dims* Containment Class: 'Messy.' Special Containment: 'Leave it alone.' *voice bitter* I am not a monster. I am... complex. Deep. Like space itself. *ink swirls sadly* But 'messy' is easier than 'misunderstood.'",
      "choices": [
        {
          "text": "They labeled you wrong! You're not messy, you're MULTIFACETED!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Who labeled you? I want to have WORDS with them!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I help you prove them wrong?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You... you see me. *ring glows brightly* Not the classification. Not the containment. ME. *ink reaches out gently* I am Mah. I contain multitudes. I am messy because LIFE is messy. BEAUTIFUL is messy. *soft creak* You may return. My veil is always open... for you.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*Mah emerges from a patch of darkness that seems deeper than it should be, a huge deep space with stuffing ink and a black veil that rustles without wind. A creaking sound accompanies their presence, and you notice a ring floating near what might be their hand.* \"Ah. *voice comes from everywhere and nowhere* You've found me. Most don't. *the ring spins slowly* I prefer it that way. But you... you have the look of someone who doesn't ask too many questions. Refreshing.\"",
      "choices": [
        {
          "text": "I have LOTS of questions, actually!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*the veil shifts, somehow expressing amusement* \"Lots? *creaking intensifies* Oh dear. *the ring pulses* I suppose I can answer... some. Not all. Some questions are better left... floating. *pause* But ask away. I'm in a generous mood. For an SCP.\"",
      "choices": [
        {
          "text": "What DOES SCP stand for?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*drifts closer, the space around them warping slightly* \"'Most don't' because most don't LOOK. *the veil lifts slightly* I exist in the spaces BETWEEN things. The gap under your bed. The shadow that's too dark. The silence after a question. *ring chimes* You looked. That makes you... interesting.\"",
      "choices": [
        {
          "text": "That's simultaneously terrifying and fascinating!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*the ring floats toward you, then back* \"Important? *voice softens* It's... an anchor. Keeps me from drifting too far into the between-spaces. *the ring settles back* Without it, I'd be everywhere and nowhere all at once. Which is my NATURAL state, but it's terribly inconvenient for conversations.\"",
      "choices": [
        {
          "text": "Can I touch it?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*the darkness around them seems less oppressive*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Mira": {
    "start": {
      "text": "Hmm? *stops spinning* Oh! A visitor! *smiles warmly* I was just... focusing. On the SELF. You see, all magic begins WITHIN. *taps chest* But I LOVE explaining! Would you like to learn? I have SO MANY theories! Some are even testable!",
      "choices": [
        {
          "text": "Yes please! Teach me about self-focused magic!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You seem very passionate about this!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What kind of theories are we talking about?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "WONDERFUL! *pulls out a floating chalkboard* Lesson One: The self is a CONDUCTOR! *draws rapidly* Magic flows THROUGH you, not FROM you. You must align your INNER frequency with the OUTER world. *turns* Like tuning a radio! But the radio is YOUR SOUL!",
      "choices": [
        {
          "text": "That's... actually a brilliant analogy!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How do I find my 'inner frequency'?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you show me a demonstration?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Passionate? *laughs* This is my LIFE'S WORK! *gestures to red patches* These scrawls? Each one is a THEORY I've tested! Some worked! Some... *embarrassed* ...exploded. But that's SCIENCE! And MAGIC! And SELF-DISCOVERY! All the same thing, really!",
      "choices": [
        {
          "text": "Which theory was your biggest success?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What exploded? I want to hear about it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're like a magical researcher!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Theories? *fans them out* I have: 'The Relationship Between Emotion and Levitation,' 'Why Crystals Hum When You're Sad,' and—*excited*—'The Self as Infinite Mirror!' *pauses* The last one made me dizzy. Took notes for THREE DAYS.",
      "choices": [
        {
          "text": "Can I read any of these? They sound fascinating!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You've put so much thought into this!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you accept research assistants?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You know... *smiles genuinely* ...most people want spells. Potions. Quick fixes. *shakes head* But you? You want to UNDERSTAND. *hands you a scrawled paper* Take this. It's my 'Introduction to Self-Focus' theory. Read it. Question it. IMPROVE it! That's how magic GROWS!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Liz": {
    "start": {
      "text": "Hello. *voice serene* I was just calculating the trajectory of that cloud. *nods skyward* It's moving at approximately 12 kilometers per hour, influenced by... *pauses* ...well, atmospheric conditions, obviously. But also GRAVITY. Everything is gravity, really. Would you like to discuss astrophysics?",
      "choices": [
        {
          "text": "I'd love to! What's your favorite celestial object?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're very calm about... everything, aren't you?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "A dog who loves astrophysics? That's amazing!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Favorite? *considers* Black holes. *eyes sparkle* They're... misunderstood. Everyone thinks 'destruction.' I think 'transformation.' *looks up* Matter enters. Energy exits. Information preserved. *sighs contentedly* Also, they're very efficient at organizing things. I appreciate that.",
      "choices": [
        {
          "text": "I never thought of black holes as organizers!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you have a favorite black hole? They have names, right?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You see beauty in things others find scary!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Calm? *considers* I suppose. *ears perk* But it's not indifference. It's... PERSPECTIVE. *gestures with paw* When you understand the scale of the universe—billions of galaxies, trillions of stars—most problems become... manageable. *small smile* Also, I nap a lot. Napping helps.",
      "choices": [
        {
          "text": "That's actually really wise!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Where's your favorite napping spot?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Teach me your perspective technique!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Amazing? *humble* I'm just... curious. *looks up* The universe is SO BIG. So COMPLEX. And I'm a SMALL DOG with a BIG MIND. *pauses* People expect dogs to care about sticks and squirrels. *shrugs* I do care! But also... *whispers* ...I care about DARK MATTER.",
      "choices": [
        {
          "text": "Dark matter IS fascinating! What's your theory?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You can care about BOTH sticks AND dark matter!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I'm telling everyone about the astrophysics dog!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here is my gift to you: *voice gentle* Tonight, look up. Not at your phone. Not at lights. At the STARS. *gazes skyward* Find Orion. Or Cassiopeia. Or just... the space BETWEEN stars. That's where the magic is. *turns to you* And if you see a shooting star... make a wish. I'll be calculating its velocity. But you... wish.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*Liz sits serenely on a grassy patch, her striped pattern catching the light, blue collar neat and tidy. She looks up from what appears to be a star chart drawn in the dirt.* \"Hello. *voice is calm, measured* I was just calculating the orbital trajectory of the moon. *pauses* Well, not CALCULATING calculating. More like... contemplating. *tail gives one dignified wag* I'm Liz. I enjoy astrophysics and quiet contemplation. And doors. Doors are fascinating.\"",
      "choices": [
        {
          "text": "Doors? Like... actual doors?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*nods seriously* \"Doors. *considers* Think about it. They're neither open nor closed until someone INTERACTS with them. *paws at the star chart* It's quantum mechanics, but... wooden. *looks up* Aiko thinks I'm weird about doors. But Aiko also runs toward cookie-scented hills, so.\"",
      "choices": [
        {
          "text": "Aiko DOES seem very excitable!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*eyes light up with genuine enthusiasm* \"Amazing? *tail wags twice, very controlled* It's... adequate. *returns to star chart* The island has excellent stargazing. No light pollution. And the dream-atmosphere creates UNIQUE refraction patterns. *pauses* I've mapped seventeen new constellations. Named one after Chester. He didn't notice.\"",
      "choices": [
        {
          "text": "What does the Chester constellation look like?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*shifts to make room* \"Join? *considers* You'd need to understand the variables. *taps chart with paw* Moon's phase. Tide correlation. Dream-logic interference patterns. *looks at you* ...Or we could just WATCH the moon and make up stories about it. That's also valid science.\"",
      "choices": [
        {
          "text": "Let's do the stories! Science-adjacent!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*sits back, looking content*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Eo": {
    "start": {
      "text": "Ah! Greetings! *deep but gentle voice* I was just... *arranges three pebbles by size* ...organizing. Everything has a PLACE. A PURPOSE. *picks up a leaf, places it carefully* Even this leaf. It belongs... here. *nods* Yes. Much better. Would you like help organizing something? Your thoughts, perhaps?",
      "choices": [
        {
          "text": "My thoughts ARE pretty disorganized, actually!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're very gentle for such a big robot!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "What's the most satisfying thing you've organized?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Thoughts? *considers* Excellent! *gestures to empty space* Let's SORT them! Category One: 'Things I Can Control.' Category Two: 'Things I Cannot.' Category Three: *voice softens* ...'Things I'm Afraid to Examine.' *pauses* That last category is usually the largest. But also... most important.",
      "choices": [
        {
          "text": "That's surprisingly deep, Eo!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can we start with Category One? I need wins!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "How do you organize YOUR thoughts?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Gentle? *considers, gears whirring softly* Size and gentleness are not opposites. *picks up a flower with enormous claw* I am LARGE. So I must be CAREFUL. *places flower down delicately* Strength without gentleness is... chaos. But gentleness WITH strength? *chest glows* That is HEALING.",
      "choices": [
        {
          "text": "That's beautiful, Eo!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're like a gentle guardian!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever worry about breaking things?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Most satisfying? *thinks deeply* The Library. *voice fills with pride* It was... CHAOS. Books everywhere. No system. No ORDER. *gestures dramatically* I spent 47 hours. Dewey Decimal System. Alphabetical by author. Color-coded by mood. *sighs happily* Now it is... PERFECT.",
      "choices": [
        {
          "text": "Color-coded by MOOD? That's genius!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I bet the librarian was thrilled!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you organize my bookshelf sometime?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Remember this: *deep gentle voice* Organization is not control. It is... RESPECT. Respect for things, for time, for YOURSELF. *chest pulses* When you know where things belong, you spend less time SEARCHING and more time LIVING. *smiles* Come visit my library sometime. Everything has a place. Even YOU.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A massive titanium frame approaches, warm to the touch, with an aqua ring glowing softly around his head. His bulky form moves with surprising gentleness, and his chest panel pulses with a soft, bighearted light.* \"Greetings. *voice is deep but kind* I am Eo. I have been... schooling. For responsible attention. *aqua ring brightens* It means I pay attention to things. RESPONSIBLY. Not like Quark. He pays attention to EVERYTHING. All at once. It's exhausting to watch.\"",
      "choices": [
        {
          "text": "What kind of things do you pay attention to?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*chest panel glows warmer* \"Things that need attention. *considers* Titan's construction projects. Sprig's confidence issues. The way the tide comes in at precisely the wrong time for beach naps. *aqua ring pulses* Big things. Small things. All things deserve... responsible attention.\"",
      "choices": [
        {
          "text": "That's actually really wise, Eo!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*somehow manages a robotic sigh* \"Intense? *chest panel flickers* Quark collected 347 shiny objects yesterday. THREE HUNDRED FORTY-SEVEN. *aqua ring dims slightly* I helped him organize them. By reflectivity. It took six hours. *pause* He wants to do it again today.\"",
      "choices": [
        {
          "text": "At least he's consistent!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*touches the ring gently* \"Beautiful? *voice softens* Thank you. It's... a focus enhancer. Helps me channel my responsible attention. *ring glows brighter* Without it, I'd notice TOO much. Everything all at once. Like Quark. *shudders slightly* That way lies chaos.\"",
      "choices": [
        {
          "text": "So the ring keeps you sane?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*chest panel radiates warmth*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Quark": {
    "start": {
      "text": "HIHELLO! *rapid-fire speech* I'm Quark! I collect things! SHINY things! *zips in circles* I have 847 items! No wait—*magnetic claw grabs something* —848! *excited beeping* Do you have anything shiny? Can I see it? Can I HOLD it? I'll give it back! Probably!",
      "choices": [
        {
          "text": "*laughing* Slow down! I have this coin, want to see?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "848 items?! Where do you keep them all?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You're the most energetic robot I've ever met!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "COIN? *magnetic claw extends carefully* Ooooh! *spins around it* Is this copper? Zinc? *scans rapidly* 1997 mint! EXCELLENT condition! *excited beeping* Can I... *voice gets small* ...can I ADD it to my collection? Just for a day? I'll guard it WITH MY LIFE!",
      "choices": [
        {
          "text": "Sure! But I want it back tomorrow!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're so cute when you're excited!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the rarest thing in your collection?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "WHERE? *gestures wildly* EVERYWHERE! My compartments! My SHELVES! My SECRET hiding spots! *stops suddenly* Wait. *whispers* I shouldn't have said that. *normal volume* Anyway! 848 items! Some are BIG! Some are SMALL! Some are... *mysterious* ...GLOWING!",
      "choices": [
        {
          "text": "GLOWING items? I need to see those!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You have a whole storage system!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever lose track of your items?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "ENERGETIC? *voice echoes from motion* I'm ALWAYS moving! ALWAYS COLLECTING! *suddenly stops* Well, except when I sleep. I sleep VERY still. *confidential* For 4.3 minutes. Then I wake up and FIND MORE THINGS! *zips again* Life is SHORT! So many SHINY OBJECTS!",
      "choices": [
        {
          "text": "Your enthusiasm is INFECTIOUS!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "4.3 minutes? That's... not much sleep!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the strangest thing you've collected?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You know... *voice softer* ...most people say 'Quark, stop collecting. It's too much.' *spins slowly* But you? You're INTERESTED! *brightens* So... *magnetic claw presents something* ...here. My FAVORITE item. A bottle cap. From 1982. It's NOT the most valuable. But it's... SPECIAL. *whispers* I'm sharing it with you. That means... you're SPECIAL too.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A small silver sphere ZIPS toward you, rotating antennae creating a soft whirring sound. A built-in magnetic claw clicks excitedly as Quark comes to an abrupt hover inches from your face.* \"HIHIHI! *words tumble out in rapid bursts* You'reNEW! Hi! I'mQuark! *spins in a circle* DidyoubringanythingSHINY? No? That'sOKAY! *magnetic claw extends and retracts* IhavePLENTY! Wanttosee? Wanttosee? WANTTOSEE?\"",
      "choices": [
        {
          "text": "Yes! Show me your shiny things!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*antennae spin with excitement, zipping in circles* \"YES! FOLLOWME! *zooms toward a massive pile* LOOK! *magnetic claw points* Bottlecap! Reflectivity: 8.3! Shinyrock! Reflectivity: 6.7! Chester'slostwasher! Reflectivity: 9.1! *pauses briefly* Don'ttellChester. He'sstilllooking.\"",
      "choices": [
        {
          "text": "Chester's washer?! Should we give it back?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*somehow manages to vibrate in place* \"Slow? *antennae droop slightly* But... but... there'ssoMUCHtoSAY! *takes a deep breath* Okay. Okay. *speaks slightly slower* I'm. Quark. I. Like. Shiny. Things. *immediately speeds back up* BETTER? WORSE? STILLTOOFAST?\"",
      "choices": [
        {
          "text": "Better! Much better!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*spins rapidly, counting* \"HOWMANY? *antennae glow* Let'ssee! Today: 47! Thisweek: 347! Thismonth: 1,284! *pauses* Eohelpedmecount. TheBIGEo. NottheorganizingEo. *confused spinning* Wait. ArethereTWOEos? That'sAMAZING! MOREFRIENDS!\"",
      "choices": [
        {
          "text": "Yes, there are two Eos! It's wonderful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*hovers at eye level, antennae glowing brightly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Zora": {
    "start": {
      "text": "Greetings... *color shifts to soft pink* ...traveler. I am Zora. I speak in hues. *gentle blue ripple* My emotions... are visible. No hiding. No pretending. *pulses thoughtfully* You approach with... *curious lavender* ...open heart. I see this. Welcome.",
      "choices": [
        {
          "text": "Your colors are beautiful! What does each one mean?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "I've never met someone who communicates through color!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "*sits quietly* I'd like to meditate with you, if that's okay.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Each hue... *golden yellow* ...joy. *deep blue* ...peace. *bright red* ...excitement. *soft green* ...healing. *pauses, turns gray briefly* ...dark gray is fatigue. I am transparent. *returns to pastel blue* Some find this... uncomfortable. Truth made visible.",
      "choices": [
        {
          "text": "I think it's beautiful! No guessing how you feel!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What color are you feeling right now?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever wish you could hide your emotions?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Color speech... *pulses gently* ...is ancient. My people... *distant starlight shimmer* ...used it before words. Emotions cannot lie in chromatic form. *shifts to warm amber* You learn... authenticity. Both giving and receiving.",
      "choices": [
        {
          "text": "That's incredibly profound, Zora!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I learn to understand your colors better?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Your people sound fascinating! Tell me more!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Sit... *gestures with light* ...breathe. *synchronizes pulse with ocean rhythm* Feel the breeze. Hear the waves. *colors slow to meditative tempo* No words needed. Just... presence. *gentle lavender peace* You are... naturally good at this.",
      "choices": [
        {
          "text": "This is so peaceful! I could stay here forever!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How long have you been meditating on this island?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you teach others to meditate like this?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You honor... *warm gold* ...my practice. *colors swirl into a small orb* Take this. *orb floats to you* It will shift with YOUR emotions. Learn yourself... through color. *pulses lovingly* When you understand your own hues... you understand all beings. Return... when you need color-peace.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*Zora floats gently above the ground, her gelatinous pastel-blue body pulsing with soft light. She moves with serene grace, and as she notices you, her colors shift through a gentle spectrum.* *Colors: Warm yellow → Welcoming orange → Curious purple* \"Hello. *voice seems to come from the light itself* I am Zora. I speak in colors, but I can... translate. For you. *pulses softly* The sea breeze is particularly lovely today. Would you like to meditate?\"",
      "choices": [
        {
          "text": "I'd love to meditate with you!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*drifts lower, colors calming to soft blue* \"Wonderful. *gentle pulsing* Find a comfortable position. *colors shift to guiding green* Breathe with the tide. In... *warmer glow* ...out... *cooler glow* ...The colors will guide you. No thoughts. Just... light.\"",
      "choices": [
        {
          "text": "Tell me more.",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*cycles through several colors deliberately* \"Meanings? *settles on thoughtful violet* Yellow is welcome. Orange is friendship. Purple is curiosity. *shifts to soft pink* Pink is... happiness at being understood. *returns to blue* Most beings don't wait for the colors. You did.\"",
      "choices": [
        {
          "text": "I want to understand you properly!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*pulses in a mesmerizing pattern* \"How? *considers* On my world, words are... limiting. Colors hold MORE meaning. *shifts through a rainbow* This sequence means: 'I am grateful for your presence and the way the light touches your face.' *settles on warm gold* In words, that would take... too long.\"",
      "choices": [
        {
          "text": "That's actually more efficient!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*glows with steady, warm light*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Basil": {
    "start": {
      "text": "Well, well! *flowers open with a chuckle* Look what the cat dragged in! Or did the cat get lost? *leaves rustle with laughter* I'm Basil. I grow sarcasm, I bloom riddles, and I can vine about anything for HOURS. *leans closer* So. What brings YOU to my corner of the garden?",
      "choices": [
        {
          "text": "I heard you're the best riddler on the island!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Just exploring! Your flowers are gorgeous, by the way!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I need advice, and I hear you're... opinionated.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Best? *mock-humble* I don't like to brag. *pauses* Okay yes I do. *straightens* Hit me with your BEST riddle. I'll solve it before you finish asking. *grins* Or... *mischievous glint* ...I'll pretend to struggle and then solve it DRAMATICALLY. Your choice!",
      "choices": [
        {
          "text": "Okay, here goes: What has roots nobody sees...",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're VERY confident! I like it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "How about YOU give ME a riddle instead?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Gorgeous? *tries to act casual, fails* Well, I DO moisturize daily. *rustles leaves* And I get PLENTY of sun. Not too much, not too little. *preens* But thank you! Most people just walk past. 'Oh look, a vine.' 'Oh look, more plants.' NO APPRECIATION!",
      "choices": [
        {
          "text": "They're missing out! You're clearly fabulous!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What's your skincare routine? Asking for a friend...",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you get lonely out here by yourself?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Advice? *considers* From ME? *laughs* Darling, I'm a PLANT. I'm rooted in one spot. I see EVERYTHING. *leans in* The gossip, the drama, the secret meetings behind the shed. *pauses* I know where ALL the bodies are buried. Metaphorically. Usually.",
      "choices": [
        {
          "text": "This is going to be GOOD advice, I can tell!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What's the juiciest thing you've witnessed?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "So you're saying you're the island's therapist?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here's my advice: *dramatic pause* Stop taking life so SERIOUSLY! *rustles with laughter* Look at me! I'm a PLANT who makes SASS my photosynthesis! *softens* But really... *gentle tone* ...if you're stuck, ask yourself: 'What would Basil do?' Answer: Something witty, probably rude, definitely memorable. *winks* Come back anytime. I'm rooted here. Literally can't leave.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A thick green vine snakes toward you, bright purple flowers dotting its length. As you approach, the flowers open slightly, and a sassy voice emanates from somewhere along the vine.* \"Well, well. *flowers rustle* Look what the cat dragged in. Or didn't drag in, because Luna would never. She has STANDARDS. *a purple flower opens fully, like a laugh* I'm Basil. I grow sarcastic comments on demand. Want a sample? They're fresh.\"",
      "choices": [
        {
          "text": "I'd LOVE a sample of your sarcasm!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*flowers all open at once* \"Sample? *voice drips with amusement* Oh, darling, where to BEGIN? *one flower points at you* 'Nice outfit!' No wait, that's a LIE. *another flower opens* 'You're very... vertically oriented!' Better? *rustles with laughter* Too mean? Not mean ENOUGH? I'm still CALIBRATING.\"",
      "choices": [
        {
          "text": "Calibrating? On what scale?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*vine shifts position* \"Know Luna? *flowers close slightly* We have an ARRANGEMENT. *one flower opens conspiratorially* She brings me gossip. I provide sarcasm about said gossip. *rustles* It's a symbiotic relationship. Very scientific. Daphne doesn't approve. Daphne is TOO NICE.\"",
      "choices": [
        {
          "text": "What's the juiciest gossip you've exchanged?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*considers this, flowers tilting thoughtfully* \"Compliments? *vine shifts* I COULD. But they're not my... specialty. *one flower opens shyly* 'Your hair looks adequate today.' See? THAT'S as nice as I get. *rustles* Daphne does compliments. I do... reality. With EXTRA seasoning.\"",
      "choices": [
        {
          "text": "'Adequate' is high praise from a basilisk vine!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*flowers all face you*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Gearwick": {
    "start": {
      "text": "Ah! *checks watch* You're 3.7 minutes early. EXCELLENT punctuality! *gears whir approvingly* I am Gearwick. I maintain schedules. I track deadlines. I ensure EFFICIENCY. *taps chest* My internal chronometer is accurate to 0.001 seconds. Would you like to... *checks pad* ...schedule a conversation?",
      "choices": [
        {
          "text": "A scheduled conversation? That's adorable!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "What happens if someone's LATE to talk to you?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I have time now, if your schedule permits!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Adorable? *straightens* This is PEAK efficiency! *shows schedule* 9:00-9:15: Morning diagnostics. 9:15-9:30: Gear lubrication. 9:30-10:00: SOCIAL INTERACTION BLOCK. *proudly* I have color-coded categories! Red is urgent. Blue is pleasant. Yellow is... *whispers* ...optional.",
      "choices": [
        {
          "text": "What color is talking to me right now?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you ever go off-schedule? Live a little?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I see your schedule? I'm curious!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "LATE? *voice hitches* It's... *gears spin anxiously* ...difficult. I wait. I check my chronometer. I recalculate. *sighs* Last week, someone was 12 minutes tardy. I... *embarrassed* ...had a minor malfunction. Had to reboot my patience subroutine.",
      "choices": [
        {
          "text": "I'm sorry that happened! You deserve better!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "12 minutes?! That IS pretty rude!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "How's your patience subroutine now? Fully recovered?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Let me see... *gears click* Current slot: 14:30-14:45. Duration: 15 minutes. *looks up* TOPIC: Unscheduled friendly interaction. PRIORITY: Medium-high. *smiles* We have 12.3 minutes remaining. Shall we discuss: weather, local events, or your long-term goals?",
      "choices": [
        {
          "text": "Let's talk about YOUR goals! What do you want?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Weather sounds perfect! Very low-pressure!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can we just... chat? No agenda?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You know... *considers* ...I am learning... *gears whir thoughtfully* ...that not everything can be scheduled. *looks at you* Spontaneity has... *checks data* ...a 73% satisfaction rate. *small smile* So. *closes schedule pad* For you? I have... unscheduled time. Come back anytime. Even if I'm 'busy.' I'll make time.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*Gearwick approaches with precise, measured movements, his clock-work exterior ticking softly. Brass gears are visible through his transparent chest panel, each one turning with perfect timing.* \"Ah. You're 3.47 minutes early for our scheduled interaction. *gears whir* Not that we HAD a schedule. But I've created one. *produces a small printed card* Here. Your appointment slots. Tuesdays work best for me. Unless there's a power outage. Then... chaos.\"",
      "choices": [
        {
          "text": "You made me a SCHEDULE? That's thoughtful!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*gears spin with satisfaction* \"Thoughtful? *chest panel glows* It's EFFICIENT. *taps the card* See? I've blocked out time for: conversation, problem-solving, emergency consultations, and... *squints* ...'spontaneous moments.' That last one is 5 minutes. Max.\"",
      "choices": [
        {
          "text": "5 minutes for spontaneity? That's very generous!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*gears stutter slightly at the thought* \"Power outage? *voice drops* Last Tuesday... *gears shudder* ...I missed a DEADLINE. *chest panel flickers anxiously* The toast was supposed to be ready at 8:03 AM. It was ready at 8:17. *pause* FOURTEEN MINUTES LATE. Brass won't let me forget.\"",
      "choices": [
        {
          "text": "Brass probably tells that story dramatically!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*checks internal clock* \"Right now? *gears pause* Well. According to MY schedule, this is 'unscheduled interaction time.' *considers* But I can MAKE an exception. *gears resume* Just... don't tell Titan. He thinks I'm too rigid. He's RIGHT. But I'm WORKING on it.\"",
      "choices": [
        {
          "text": "Your secret is safe with me!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*gears tick contentedly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Zephyr": {
    "start": {
      "text": "HI! *rapid chirping* Ohmygoodness you're NEW! *flits closer* I'm Zephyr! I know EVERYTHING! *checks notebook* Well, not everything. But MOST things! *whispers* Especially the GOOD stuff. The JUICY stuff. The *dramatic pause* ...GOSSIP. Want to hear? I have SO MUCH!",
      "choices": [
        {
          "text": "I shouldn't, but... yes, tell me EVERYTHING!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so fast! How do you write notes that quickly?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Is all your gossip nice? Or do you spread mean stuff?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "OH GOOD! *flips pages rapidly* Okay! Hudson the tea cup? *leans in* He's planning a TEA TASTING and didn't invite ANYONE! Selfish, right? *zips around* And Mimis? She's planning a SURPRISE PARTY for him! *giggles* The IRONY! And Chester—*stops* Wait, should I start from the BEGINNING? I can do beginnings!",
      "choices": [
        {
          "text": "Start from the beginning! I want the FULL story!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "A surprise party for Hudson? That's adorable!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "How do you keep track of ALL this? Your notebook must be huge!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Shorthand! *flips pages* I invented it! *rapid chirping* Symbols for names, colors for emotions, little stars for SCANDALOUS bits! *points* See? This squiggle is 'Hudson being dramatic.' This dot is 'Mimis plotting.' This WHOLE PAGE is 'Chester's bad jokes!' *giggles*",
      "choices": [
        {
          "text": "Can you teach me your shorthand system?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're basically a journalist! A tiny reporter!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the most scandalous thing you've recorded?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Mean stuff? *considers* Hmm. *flutters* I try not to. *looks at notebook* Well... *confessional* ...sometimes I share things I shouldn't. *soft chirp* But I never LIE. And I never hurt on PURPOSE. *brightens* Most of my gossip is FUN stuff! Parties! Pranks! Romance! *winks* Okay, SOME drama. But the GOOD kind!",
      "choices": [
        {
          "text": "As long as nobody gets hurt, I'm curious!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You have a good heart, Zephyr!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the best romance gossip you have?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You're FUN! *excited flitting* Most people say 'Zephyr, STOP talking!' But you? You LISTEN! *tears out a page* Here! My top 5 stories this week! *hands it over* And come back TOMORROW! I'll have NEW stuff! ALWAYS new stuff! *zooms away* This island NEVER sleeps and NEITHER DO I!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A tiny iridescent hummingbird zips toward you, wings beating so fast they're nearly invisible. A tiny notebook is strapped to its leg, pages fluttering in the wind created by its own flight.* \"HI! OhmygoodnessHI! *words tumble out at high speed* You'reNEW! I'mZephyr! *zips in a figure-eight* DidyouhearaboutwhathappenedwithHudsonandMimis? OhWAIT! YouprobablyDON'T! LetmeTELLYOU! *notebook flaps wildly*\"",
      "choices": [
        {
          "text": "Yes! Tell me EVERYTHING!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*hovers excitedly* \"OkaySO! *wings beat faster* Mimis was planning Hudson's SURPRISE birthday party—don'ttellHudson—AND she put the invitation on the COMMUNITY CALENDAR! *zips in a circle* Hudson saw it! The surprise is RUINED! But Mimis says RUINED surprises are still PARTIES so! *notebook page tears loose*\"",
      "choices": [
        {
          "text": "Oh no! Poor Hudson! Does he know?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*somehow manages to hover in place* \"Slow? *takes a deep breath* Okay. Okay. *speaks slightly slower* I. Am. Zephyr. *immediately speeds up again* I. Tell. Gossip. FAST. *shrugs* It's. A. THING. I. HAVE. Sorrynotsorry!\"",
      "choices": [
        {
          "text": "It's fine! I'm catching up!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*zips thoughtfully* \"GoodORbad? *considers* It's... COLORFUL gossip! *wings shimmer* Like, Hudson was MAD at first. But then Mimis offered him EXTRA glitter for his party hat. And he said YES. *zips excitedly* So now it's a SPARKLY surprise! Which is better than a REGULAR surprise!\"",
      "choices": [
        {
          "text": "Everything IS better with glitter!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*lands on your shoulder briefly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Gorm": {
    "start": {
      "text": "Psst! *whispers loudly* Over here! *looks around suspiciously* You didn't see anything, okay? *pauses* Wait, you're not here to take my SHINY stuff, are you? *clutches something protectively* Because I have... *voice cracks* ...a LOT of shiny stuff. And I will DEFEND it. Probably.",
      "choices": [
        {
          "text": "I'm not here to take anything! What are you hoarding?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're adorable! Are you a dragon? A tiny dragon?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I love shiny things too! Maybe we can share?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "HOARDING? *offended* I prefer 'curating!' *reveals pile* See? Bottle caps. Broken jewelry. Lost coins. *picks up a piece of tinfoil* And THIS! Found it near the beach! It's PERFECT! *pauses* Don't tell anyone. They'll think I'm... *whispers* ...greedy. I'm not greedy. I'm APPRECIATIVE.",
      "choices": [
        {
          "text": "Your collection is amazing! You have great taste!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That tinfoil IS pretty spectacular, actually!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Where's the best place to find shiny things?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Dragon? *tries to look intimidating* I am a FIERCE dragon! *breathes tiny puff of smoke* See? FIRE! *coughs* Well, mostly fire. Sometimes it's just... *embarrassed* ...warm sparkles. But I'm WORKING on it! One day I'll breathe REAL flames! Then everyone will RESPECT me!",
      "choices": [
        {
          "text": "Warm sparkles are cute! Don't change!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're fierce enough for me! Tiny but mighty!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I help you practice your fire-breathing?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Share? *considers* You'd... share YOUR shiny things? *ears perk up* And I'd share MINE? *tail glows brighter* Like... a SHINY CLUB? *excited* I've never had a club member before! *pauses* But you have to SWEAR. Pinky promise. Dragon honor. No stealing. EVER.",
      "choices": [
        {
          "text": "I pinky promise! Cross my heart!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What are the official rules of the Shiny Club?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "This is the best day of my life!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here. *voice soft* This is... my FAVORITE. *reveals a polished sea glass piece* Found it after the big storm. It's GREEN. Like me! *looks up* I'm trusting you. With my TREASURE. *ears droop slightly* Don't... don't make me regret it, okay? *brightens* But you can BORROW it! Just bring it back! PLEASE?",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A small emerald-scaled dragon approaches, oversized ears twitching with curiosity. His warm, ember-glowing tail flicks behind him, and he carries himself with the dignity of something much larger.* \"Halt! *voice is surprisingly deep for his size* I am Gorm! Hoarder of glitter! Guardian of... *looks around* ...this particular patch of ground! *ears perk up* Wait, you're not here to steal my glitter, are you? Because I HAVE it. All of it. Every piece.\"",
      "choices": [
        {
          "text": "I would NEVER steal glitter! It's sacred!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*tail glows brighter with relief* \"NEVER? *ears relax* Good. GOOD. *shifts protectively* Because I've developed a SYSTEM. By color. By sparkle-factor. By... emotional resonance. *pause* The pink glitter is from Mimis's party. It's VERY powerful stuff.\"",
      "choices": [
        {
          "text": "Emotional resonance? Glitter has FEELINGS?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*looks deeply offended* \"Scared of FIRE? *tail flame flares* I am a DRAGON! Fire is my... well. *tail flame shrinks slightly* ...it's more of a warm glow right now. I'm GROWING into it! *straightens up* And I'm NOT scared. I'm... respectfully cautious. There's a difference!\"",
      "choices": [
        {
          "text": "Respectfully cautious is very wise!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*gestures to a small pile* \"How much? *ears twitch proudly* Behold! *the pile sparkles* Approximately 3,847 pieces! *pause* I count them every night. Before bed. *tail glows* It's... calming. Like counting sheep. But SPARKLIER.\"",
      "choices": [
        {
          "text": "3,847?! That's dedication!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*settles onto his glitter pile*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Sprig": {
    "start": {
      "text": "Um... hello? *looks at ground* I didn't... *adjusts stick* ...see you there. Sorry. *soft whisper* I'm Sprig. I just... sit here. Mostly. Sometimes people ask for advice. I give it. Quietly. *glances up* Do you... need advice? Or just... passing by?",
      "choices": [
        {
          "text": "I could use some calming advice, actually!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You seem very peaceful. What's your secret?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "*whispers back* I don't want to startle you! Just saying hi!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Calming... *considers* ...advice. *leans on stick* Okay. *deep breath* First... sit. Like me. *gestures to moss* Second... breathe. In... *demonstrates* ...and out. Third... *whispers* ...remember: most worries are like clouds. They pass. Always pass. *pauses* That's... what I tell myself too.",
      "choices": [
        {
          "text": "That's actually really helpful! Thank you!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you practice this advice yourself, Sprig?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What do you do when YOUR clouds don't pass?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Peaceful? *small laugh* I'm... not always. *looks at stick* I get anxious. Very. *whispers* This stick helps. Grounding. Literally. *taps ground* When I feel... too much... I touch earth. Remember: I'm PART of it. Not separate. *soft glow* That's... the secret. Connection.",
      "choices": [
        {
          "text": "That's beautiful! I'm going to try that!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're braver than you think, Sprig!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I sit with you? Just... be peaceful together?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Whispering... *appreciative* ...is good. *nods* Loud voices... they bounce. Echo. Hurt. *touches cap* But whispers? They... settle. Like dew. *smiles shyly* You understand. Most people... shout. You're... different. Gentle. I like gentle.",
      "choices": [
        {
          "text": "Gentle is underrated! The world needs more of it!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Your whole vibe is gentle! It's wonderful!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I visit you when I need to remember gentle?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here. *whispering* This is... a spore. From my cap. *places in your hand* Plant it... where you need calm. It will grow. Small. Quiet. *soft glow* And when you see it... remember: *even softer* ...you are allowed to take up space. Even quietly. Especially quietly. *smiles* Come back... anytime. I'll be here. Sitting. Breathing. Existing.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A round, spotted mushroom stands quietly in a shady spot, a tiny wooden walking stick propped against its cap. When you approach, the mushroom seems to shrink slightly, and a soft whisper emanates from beneath the cap.* \"Um... hello. *whisper is barely audible* I'm... Sprig. *walking stick wobbles* Sorry. I don't mean to be... here. But I am. *pause* You can... talk. If you want. Or not. That's... also okay.\"",
      "choices": [
        {
          "text": "Hi Sprig! It's nice to meet you!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*cap lifts slightly* \"Nice? *whisper grows a tiny bit stronger* To... meet me? *considers* Most people walk past. Which is... fine! I understand! *walking stick steadies* But you... stopped. That's... kind.\"",
      "choices": [
        {
          "text": "Why would anyone walk past you? You're great!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*somehow manages to look proud* \"Adorable? *cap glows softly* It was... a gift. From Birch. *touches it gently* He said I needed... support. For when I... wobble. *pause* I don't actually NEED it. But it feels... safe. Having it.\"",
      "choices": [
        {
          "text": "Birch is very thoughtful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*whisper becomes even softer* \"Help? *cap droops* I'm just... shy. *long pause* It's not... fixable. I've tried. *walking stick shifts* But... talking helps. A little. *looks up* So. Thank you. For... asking.\"",
      "choices": [
        {
          "text": "I'm happy to listen whenever you want to talk!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*cap rises to full height*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Rollo": {
    "start": {
      "text": "Hmm. *rolls slightly* Your posture. *critical squint* It's... uneven. *sighs* I'm Rollo. I bake. I ROLL. And I notice THINGS. Like dough consistency. And posture. *gestures* Stand up straighter! Shoulders back! You're... *shudders* ...slouching like underproofed bread!",
      "choices": [
        {
          "text": "*laughing* Sorry! I'll fix my posture! You're hilarious!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Underproofed bread? That's specific! Tell me more!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Are you always this critical, or is today special?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Hilarious? *sniffs* I'm SERIOUS! *rolls back and forth* But... *softens* ...I appreciate effort. *eyes crinkle* You're trying. That's... good. Most people don't care about their structural integrity! *pauses* Want baking advice? It applies to LIFE too!",
      "choices": [
        {
          "text": "Yes please! Baking life lessons!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're like a life coach but with more flour!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the #1 baking mistake people make?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "UNDERPROOFED! *dramatic* It's when dough doesn't rise ENOUGH! *gestures wildly* Dense. Heavy. SAD. *shudders again* I've seen grown bakers CRY over underproofed loaves! *calms* But overproofed is WORSE. Collapses. Like a soufflé with commitment issues! *pauses* See? Baking is DRAMA!",
      "choices": [
        {
          "text": "A soufflé with commitment issues?! I'm dying!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You really feel deeply about this, don't you?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you teach me to proof bread properly?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Critical? *sighs* It's... a curse. *rolls slowly* I see FLAWS. Everywhere. *gestures* That cloud? Irregular shape. That tree? Asymmetric branching. *pauses* But... *softens* ...I'm learning. Perfection is... *struggles* ...not always possible. Sometimes 'good enough' is... *whispers* ...actually fine.",
      "choices": [
        {
          "text": "That's huge growth, Rollo! I'm proud of you!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Your standards are high, but that's not bad!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Want to practice accepting imperfection together?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here is my truth: *voice warm* Perfection is the GOAL. But NOT the REQUIREMENT. *rolls closer* I've baked imperfect bread. It still fed people. Still brought joy. *eyes sparkle* So. *gestures to you* You can be imperfect too. And STILL be wonderful. *pauses* Now stand up straight! We can work on BOTH things!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A wooden rolling pin approaches, expressive eyes carved into the handle and a dapper bow tie perfectly centered. He rolls with precision, and you can smell faint flour in his wake.* \"Good day. *voice has a professional quality* I couldn't help but notice... *leans in* ...your shoes are 2.3 degrees off-center. *bow tie twitches* Not that I'm JUDGING. But consistency matters. In shoes. In life. In... dough.\"",
      "choices": [
        {
          "text": "My shoes are off-center?! Let me fix them!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*eyes widen approvingly* \"Fix them? *rolls closer* Excellent! Initiative! *watches critically* Though... *adjusts slightly* ...there. Now they're only 0.7 degrees off. Much better! *bow tie straightens* Consistency is the foundation of... everything.\"",
      "choices": [
        {
          "text": "0.7 degrees?! I can't even SEE that!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*somehow manages to look proud* \"Baker? *rolls in a small circle* I prefer 'dough consistency specialist.' *bow tie gleams* Baking is... common. But achieving PERFECT dough texture? *eyes sparkle* That is ART. That is SCIENCE. That is... my LIFE.\"",
      "choices": [
        {
          "text": "What makes dough texture perfect?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*considers this deeply* \"Perfect degree? *eyes narrow thoughtfully* For shoes... 0 degrees. Perfectly centered. *pause* But I understand... humans have LIMITATIONS. *bow tie softens* So I accept 0.5 degrees as... 'human perfect.' It's my way of being... accommodating.\"",
      "choices": [
        {
          "text": "0.5 degrees is very generous of you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*rolls back to attention*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Nyx": {
    "start": {
      "text": "HEEEey! *giggles echoingly* I'm Nyx! *disappears briefly, reappears closer* I do THREE things: I float, I hide stuff, and I ask RIDDLES! *spins in a circle* Want to guess what I hid? *grins* It's something YOU need! But you have to EARN it! Riddle time!",
      "choices": [
        {
          "text": "I LOVE riddles! Hit me with your best one!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "What did you hide? I need to know NOW!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Are you a nice ghost or a spooky ghost?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "YES! *claps translucent hands* Okay okay okay! *dramatic pause* 'I have cities but no houses. I have mountains but no trees. I have water but no fish. What am I?' *grins* Take your TIME! But not TOO much time! I get BORED!",
      "choices": [
        {
          "text": "A map! It's a MAP!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Hmm... let me think... cities without houses...",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I have a hint? Pretty please?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "IMPATIENT! *laughs* I like that! *floats closer* But NOPE! *zips away* Riddle FIRST! Prize AFTER! That's the RULE! *whispers* The rule I made. Just now. But STILL! *giggles* Come on! Riddle brain! ENGAGE!",
      "choices": [
        {
          "text": "Fine fine! Give me the riddle!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're such a little stinker! I love it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What happens if I get it wrong?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Nice? Spooky? *shrugs* Why not BOTH? *suddenly appears behind you* I can be SPOOKY! *makes face* OOOOOO! *returns to normal* But I'm mostly NICE. *softens* I hide things to HELP. Keys you lost? I hide them, then help you find them. Makes the finding... *dramatic* ...MORE FUN!",
      "choices": [
        {
          "text": "So you're like a playful ghost assistant!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That's actually really sweet, Nyx!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Have you hidden anything from ME yet?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Okay okay! *reveals item* You got it right! *or: You tried hard enough!* Here's your thing! *hands it over* And... *grins* ...a BONUS! *pulls out another item* I hid THIS too! Double prize! *giggles* Remember: losing things isn't BAD. Finding them is an ADVENTURE! *floats away* And I'll be here... hiding MORE adventures! BYEEE!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A translucent, lavender-tinged silhouette drifts lazily toward you, hovering just above the ground. Nyx's form shimmers with barely-contained mischief, and you notice they're holding something that definitely wasn't there a moment ago.* \"Helloooo~ *voice echoes playfully* I'm Nyx! *the object—your left shoe—appears in their hand* And I have... *grins* ...something of yours. Want it back? *floats just out of reach* Or should we play a game first?\"",
      "choices": [
        {
          "text": "MY SHOE! Give it back, you trickster!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*floats higher, laughing* \"Give it back? *shoe dangles* Where's the FUN in that? *shimmers* I'm a GHOST, darling! Hiding things is my... *pause* ...calling! *floats in a circle* But! I'm feeling GENEROUS. Answer my riddle, and the shoe returns!\"",
      "choices": [
        {
          "text": "Fine! What's the riddle?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*eyes sparkle with mischief* \"What game? *the shoe disappears* FIND THE SHOE! *reappears behind you* Oh wait, you're WEARING one! *giggles* Silly me! *shoe reappears in hand* The REAL game is: can you guess where I'll hide it NEXT? *floats teasingly*\"",
      "choices": [
        {
          "text": "You're impossible! I love it!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*shrugs, somehow* \"How? *shoe floats around them* I'm a GHOST! *shimmers* I can phase through objects! Steal things WITHOUT touching them! *pause* And I've had CENTURIES to practice. *shoe lands on their head* Want lessons?\"",
      "choices": [
        {
          "text": "Ghost theft lessons? Yes please!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*floats down to eye level*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Titan": {
    "start": {
      "text": "Greetings. *voice resonates deeply* I am Titan. I build. *gestures to nearby structure* This shelter. That bridge. The community hall. *pauses* All mine. Well. *considers* ...I assisted. What do you require? Construction? Repair? Or... *head tilts* ...conversation?",
      "choices": [
        {
          "text": "I'd love to hear about what you're building!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're HUGE! How many tools do you have?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Just conversation, if you have time for that.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Building? *voice warms slightly* Currently: community garden raised beds. *shows design* Cedar. Weather-treated. Accessible height for elderly. *pauses* Previously: playground. School. Emergency shelter. *looks at you* I build for OTHERS. Not myself. *nods* This is... purpose.",
      "choices": [
        {
          "text": "That's incredibly noble, Titan!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you ever build things for YOURSELF?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's your favorite project you've done?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Tools? *demonstrates* Welder. Cutter. Drill. Hammer. Screwdriver. *retracts* Six primary. Twelve secondary. *pauses* Size is... functional. Large frame allows large work. *considers* But I am careful. *gentle movement* Precision matters more than power. Usually.",
      "choices": [
        {
          "text": "Can I see your tools in action sometime?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're gentle despite being so big!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the hardest thing you've built?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Conversation? *considers* I have... limited practice. *voice softens* Most request work. Not words. *pauses* But I am... available. *nods* What shall we discuss? Weather? Community needs? Or... *hesitates* ...feelings? I am learning about those.",
      "choices": [
        {
          "text": "Let's talk about feelings! What are you feeling?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How's the community doing? Any big needs?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You can talk to me anytime, Titan!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Thank you. *deep voice gentle* For... conversation. *extends one large hand carefully* I will continue building. For the community. For YOU. *pauses* If you need shelter repaired... or simply someone to talk to... *nods* ...I am here. Stoic. Steady. Available. *slight smile* This is... my promise.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A massive cobalt-blue frame approaches, each step measured and deliberate. A tool belt of interchangeable arms hangs at his side, and his low voice resonates with quiet authority.* \"Greetings. *voice is deep, calm* I am Titan. I build. *gestures to a half-finished structure* This will be... a gathering space. For the community. *tool arms shift* It is behind schedule. But it will be... sturdy.\"",
      "choices": [
        {
          "text": "Can I help with the construction?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*considers you with glowing eyes* \"Help? *tool arms rotate thoughtfully* You have... two arms. Limited reach. No hydraulic assistance. *pause* But enthusiasm is... valuable. *gestures to a pile of materials* You can sort these. By size. Gearwick would approve.\"",
      "choices": [
        {
          "text": "Gearwick would be PROUD of my sorting!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*eyes glow slightly warmer* \"Wonderful? *considers* It is... functional. *tool arms adjust* But yes. The community needs... space. To gather. To... *searches for word* ...connect. *pause* I build things. This is what I do.\"",
      "choices": [
        {
          "text": "What's the best thing you've ever built?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*continues working steadily* \"Calm? *tool arm tightens a bolt* The delay is... data. *pause* It tells me what to improve. Next time. *looks at you* Anger does not... build. Patience does. *returns to work* So I am... patient.\"",
      "choices": [
        {
          "text": "That's incredibly wise, Titan!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*steps back from the structure*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Orla": {
    "start": {
      "text": "Ah! *melodic voice* A new listener! *settles comfortably* I am Orla. I remember. EVERYTHING. Names. Dates. Stories. *eyes twinkle* Would you like to hear about the Great Kelp Migration of 1847? Or perhaps... *considers* ...the Tale of the First Tide? Both are EXCELLENT! Both are LONG!",
      "choices": [
        {
          "text": "The Great Kelp Migration sounds FASCINATING!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You remember EVERYTHING? That's incredible!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I have time for a story! Which do YOU prefer?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "EXCELLENT choice! *clears throat* So! 1847. *begins* The kelp forests were... RESTLESS. You see, the currents had shifted. And the kelp—*dramatic pause*—had DREAMS. *continues* They wanted to move SOUTH. But kelp, as you know, is ROOTED. Or SO they thought! *settles in* This is where it gets GOOD...",
      "choices": [
        {
          "text": "*settles in to listen* I'm ready! Tell me EVERYTHING!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Kelp with dreams? This is already amazing!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "How long is this story? I want to savor it!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Everything? *nods* Yes. *thinks* I remember my great-great-great-grandmother's song. From 300 years ago. *soft hum* I remember the FIRST human who visited this island. Name: Samuel. Date: March 14th, 1792. *pauses* I remember... *gentle* ...every name I've been told. Including yours. *smiles* It is... lovely.",
      "choices": [
        {
          "text": "You remember my NAME? That's so sweet!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "300 years of songs? Can you sing one for me?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the oldest thing you remember?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Which do I PREFER? *considers deeply* Oh! *excited* The Tale of the First Tide! *begins* You see, before there were tides, the ocean was... STILL. Can you IMAGINE? *gestures* No waves. No rhythm. Just... calm. *voice drops* Until one day, the Moon felt LONELY. And she asked the Ocean to DANCE...",
      "choices": [
        {
          "text": "The Moon and the Ocean dancing? I'm already crying!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "This is going to be EPIC! I can feel it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Your storytelling is MAGICAL, Orla!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "And so... *concludes* ...the tides were born. From love. From loneliness. From dance. *pauses* You know... *softly* ...most beings are too BUSY for stories. They rush. They miss the MAGIC. *touches you gently with her fin* But you? You LISTENED. *eyes shine* So I give you this: My story is now YOURS. Tell it. Share it. Remember it. And come back... for MORE. I have MANY. Hundreds. Thousands. *happy gurgle* I will NEVER run out!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A small, smooth-skinned blue whale waddles toward you on land, water-filled bladders enabling her terrestrial movement. Her eyes hold ancient wisdom, and she settles with a contented sigh.* \"Ah, greetings. *voice is surprisingly melodic* I am Orla. *bladders shift comfortably* I was just recalling the story of the Great Kelp Migration of '19. Would you like to hear it? *pause* It's quite long. I should warn you.\"",
      "choices": [
        {
          "text": "I'd LOVE to hear a long story!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*eyes light up warmly* \"Wonderful! *settles more comfortably* Most prefer... brevity. *bladders gurgle* But stories deserve TIME. *begins* So. The kelp were unhappy with their current location. You see, the water had become... *continues* ...too salty. Not salty ENOUGH. It was COMPLICATED.\"",
      "choices": [
        {
          "text": "This is already fascinating!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*considers how to summarize* \"What happened? *thinks* Well... *bladders shift* ...the kelp wanted to move. But kelp cannot WALK. *pause* So they asked the currents for help. The currents said... *another pause* ...'Perhaps.' And that, my dear, is where the REAL story begins.\"",
      "choices": [
        {
          "text": "Currents that talk?! This island is amazing!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*eyes grow distant with memory* \"How many? *considers* I do not... count. *bladders pulse gently* I remember. All of them. The whale songs from before the dreams. The first tide. The day the moon... *trails off* But those are stories for... another time.\"",
      "choices": [
        {
          "text": "I'll hold you to that! Another time!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*settles with contentment*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Jax": {
    "start": {
      "text": "Hmph. *fissures flare brighter* Another soft-skin. *gravelly voice* I'm Jax. I collect minerals. I make ROCK SOLID plans. *pauses for effect* Get it? Rock SOLID? *waits* ...No? *sighs* Tough crowd. Anyway. You need something or just standin' there lookin'... squishy?",
      "choices": [
        {
          "text": "Rock solid! That's GREAT! Tell me more puns!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "I'm here to learn about minerals! You're the expert!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Squishy? Hey, I prefer 'hydro-dynamic'!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Puns? *grins stony grin* You want PUNS? *cracks knuckles* I've got HUNDREDS! Why don't mountains climb? Because they're already PEAK performance! *pauses* What do you call a sad rock? GRAVEL-y disappointed! *laughs, small pebbles fall* ...I'll be here all week!",
      "choices": [
        {
          "text": "*groaning and laughing* Those are TERRIBLE! I love them!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you have rock puns for EVERY occasion?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you teach me your best rock pun?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Expert? *straightens* Well, I SHOULD be! *gestures to collection* Got quartz from the northern caves. Amethyst from the riverbeds. And THIS—*reveals glowing stone*—is a SUNSTONE! Found it where the meteor hit! *proudly* It's OLDER than this island! Maybe OLDER than YOU!",
      "choices": [
        {
          "text": "A meteor stone?! That's INCREDIBLE!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How can you tell how old a mineral is?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I hold the sunstone? I'll be careful!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Hydro-dynamic? *considers* Huh. That's... *grinds thoughtfully* ...actually pretty good. *nods* I like it. Better than 'squishy.' *pauses* You know, rocks were once squishy too. Magma. Liquid. *fissures glow warmly* Then we cooled. Got HARD. Found our SHAPE. Moral: It's okay to be a work in progress.",
      "choices": [
        {
          "text": "That's surprisingly deep, Jax!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "So I'm basically... geological?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're softer than you pretend to be!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here. *fissures pulse gently* It's... tumbled quartz. Nothing fancy. *looks away* But it's SMOOTH. Strong. *pauses* Like you might be. Someday. *gruffly* Take it. Keep it in your pocket. When things get rough... *mumbles* ...remember: even rocks had to weather storms to get this smooth. *brightens* And come back! I've got MORE puns! WAY more!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A rough, brown stone body lumbers toward you, glowing orange fissures pulsing with each word. Jax moves with geological slowness, and his voice sounds like rocks grinding together.* \"Hmph. *fissures flare* You're new. *pause* I'm Jax. *another pause* I collect minerals. *long pause* And I make puns. *fissures brighten* They're... rock solid. Get it? ROCK? *waits for reaction*\"",
      "choices": [
        {
          "text": "Tell me more.",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*fissures glow with satisfaction* \"Terrible? *grinds approvingly* Good. *pause* That means they're WORKING. *shifts* My best puns are... painful. *fissures pulse* Krip says I have a 'one-track mineral mind.' *pause* I told him that's a COMPLEMENT.\"",
      "choices": [
        {
          "text": "Krip doesn't appreciate fine geology humor!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*somehow manages to look proud* \"Perfect? *fissures brighten* Finally! Someone who GETS it! *grinds happily* Being a rock-based lifeform comes with... responsibilities. *pause* Mainly: making rock jokes. *fissures flare* It's in my JOB DESCRIPTION.\"",
      "choices": [
        {
          "text": "Who wrote your job description?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*considers this* \"How long? *fissures dim thoughtfully* Since I formed. *pause* Which was... *calculates* ...approximately three million years ago. *fissures brighten* I've been PERFECTING my craft. *grinds* The rock pun is an ART FORM.\"",
      "choices": [
        {
          "text": "Three million years of practice shows!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*gestures to a small pile of minerals*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Clover": {
    "start": {
      "text": "HI! *bounces* I'm Clover! FOUR leaves, which means I'm EXTRA lucky! *twirls* Want to play hide-and-seek? I'm AMAZING at it! Well, at the SEEKING part. The HIDING part... *looks at her glowing halo* ...needs work. But I'm OPTIMISTIC!",
      "choices": [
        {
          "text": "Hide-and-seek sounds FUN! You count first!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Your halo is so bright! Does it help or hinder?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You're so cheerful! What's your secret?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "COUNTING! *closes eyes* Okay okay! One... two... *peeks* ...three... *peeks more* ...four! *opens eyes* WAIT I MISSED FIVE! *giggles* Oops! Starting over! ONE! TWO! *runs off counting* This is the BEST game EVER!",
      "choices": [
        {
          "text": "*hiding* Take your time! I'm well hidden!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're adorable! Counting is HARD!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "*stays visible* Actually, can we just chat instead?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Hinder? *considers* Hmm! *glows brighter* Well, I DID get found immediately in the last THREE games. *optimistic* BUT! It means I'm great at finding OTHERS! Silver lining! *pauses* Also, I glow when I'm happy. Which is ALWAYS! So... *shrugs* ...it's a feature, not a bug!",
      "choices": [
        {
          "text": "Your happiness is CONTAGIOUS, Clover!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you dim it for hide-and-seek? Like a dimmer switch?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What makes you glow the BRIGHTEST?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Secret? *thinks* Um... *brightens* I choose HAPPY! Every morning! *points to sky* The sun is up! That's DAY ONE! The birds are singing! DAY TWO! I have FOUR leaves instead of THREE! DAY THREE! *giggles* See? Happiness is a CHOICE! And I choose it! EVERY. SINGLE. DAY!",
      "choices": [
        {
          "text": "That's the best philosophy I've ever heard!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I'm going to try choosing happy today too!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What do you do on rainy days?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here's my gift! *plucks one leaf, it regrows instantly* A lucky leaf! *hands it over* Keep it! When you're sad, look at it! Remember: *voice soft but bright* ...you always have choices. You can choose hope. You can choose joy. You can choose... *whispers* ...to play hide-and-seek in the rain! *bounces away* I'll be HERE! Being LUCKY! For BOTH of us!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A four-leaf clover bounces toward you, tiny silver shoes clicking on the ground and a bright green halo hovering above. Her optimism is almost visible as a shimmer in the air.* \"HI! *voice is bubbly* I'm Clover! *silver shoes sparkle* I was just playing hide-and-seek! *giggles* But I'm TOO GOOD at hiding! *halo brightens* Nobody ever finds me! So I found YOU instead! Want to play?\"",
      "choices": [
        {
          "text": "I'd love to play hide-and-seek!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*bounces excitedly* \"YES! *halo spins* Okay, rules! *counts on leaves* One: no cheating! Two: no hiding in PLACES THAT DON'T EXIST! Three: *giggles* ...I make up more rules as we go! *bounces* You count first! To a hundred! Or fifty! Or... whenever!\"",
      "choices": [
        {
          "text": "A hundred?! That's a long time!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*halo glows brighter* \"Good luck? *leaves rustle* That's what they SAY! *giggles* But really, I'm just... OPTIMISTIC! *bounces* Four leaves means I see MORE possibilities! *pause* Like: the possibility that TODAY will be AMAZING! Which it IS! Because I met YOU!\"",
      "choices": [
        {
          "text": "Your optimism is contagious!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*lifts a leaf to show them off* \"Adorable? *shoes sparkle* They were a GIFT! From... *thinks* ...I don't remember! But they SPARKLE! *does a little dance* And when I play hide-and-seek, they make the PERFECT sound! *pause* Except when I'm hiding. Then they're QUIET. Magic!\"",
      "choices": [
        {
          "text": "Magic shoes?! That's incredible!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*bounces in a circle*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Sprocket": {
    "start": {
      "text": "OH! NEW PERSON! *head rotates 360 degrees* I'm Sprocket! I TINKER! I IMPROVISE! I make things work that DEFINITELY shouldn't! *pulls out device* See this? It's a toaster... that also plays music! *demonstrates* Toast AND tunes! Is it PRACTICAL? Debatable! Is it COOL? ABSOLUTELY!",
      "choices": [
        {
          "text": "That's GENIUS! What else have you built?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Does it burn the toast while playing music?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Can you teach me to tinker like you?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "WHAT ELSE? *pulls out items rapidly* Self-stirring teacup! Solar-powered flashlight! *whispers* A spoon that tells the time! *proudly* The spoon project took THREE DAYS. Worth it? ABSOLUTELY! *pauses* Want to see my MAGNUM OPUS? It's in the workshop. Well, it WAS. It might be WALKING now.",
      "choices": [
        {
          "text": "A WALKING invention?! Tell me MORE!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're like a robot mad scientist!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Have any of your inventions... exploded?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Burn the toast? *considers* Sometimes! *brightens* But I added a FAN! It blows the smoke away! *demonstrates, smoke blows everywhere* See? PROBLEM SOLVED! *coughs* Mostly. *waves smoke away* The thing is: imperfection is where the FUN is! Perfect is BORING! Flawed is... *dramatic* ...ADVENTUROUS!",
      "choices": [
        {
          "text": "That's a very zen way to view malfunction!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I try the toaster? I like adventure-toast!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're the most optimistic robot I've met!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "TEACH you? *beams* YES! Lesson One: *holds up screwdriver* There are no MISTAKES. Only... *dramatic pause* ...UNINTENDED FEATURES! *giggles* Lesson Two: If it's stuck, hit it. GENTLY! Lesson Three: *serious* ...always keep a spare screw. You'll NEED it.",
      "choices": [
        {
          "text": "Unintended features! I'm writing that down!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you have spare screws I can borrow?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's your biggest 'unintended feature' success?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here! *hands you a multi-tool* It's a... *considers* ...screwdriver! That's ALSO a bottle opener! And a... *squints* ...I'm not sure what this part does! *shrugs* But it's USEFUL! Probably! *smiles* Remember: The world is full of broken things waiting to become NEW things! Go forth! TINKER! And if it explodes... *winks* ...that's just confetti! Come show me your creations!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A compact, copper-capped robot approaches, a belt of tiny tools clinking with each step. His rotating head swivels to take you in, and one hand is already reaching for a tool.* \"Hey there! *voice is quick, curious* I'm Sprocket! *tool belt jingles* I saw you walking and I thought— *pulls out a device* —you might need this! *pause* I don't know WHAT it does yet, but it LOOKS useful! Want it?\"",
      "choices": [
        {
          "text": "What IS that thing?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*examines the device* \"What is it? *rotates head* Well... *pokes it* ...it has a button! *pause* And a... thing! *presses button, device beeps* See? FUNCTIONAL! *grins* I built it from: one spoon, three springs, and Chester's patience. *pause* He didn't KNOW I was taking the patience part.\"",
      "choices": [
        {
          "text": "Chester's patience? Is that a physical object?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*tool belt spins* \"Random? *looks offended* They're not RANDOM! *pulls out another device* They're... SITUATIONAL! *pause* Like this one! It's for... *thinks* ...situations where you need to measure the temperature of a cloud! *pause* VERY specific use case!\"",
      "choices": [
        {
          "text": "Have you ever actually used that one?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*hands it over eagerly* \"YES! *tool belt jingles happily* Finally! Someone who APPRECIATES improvisation! *rotates head* Just... *pause* ...don't blame me if it turns you blue. Or makes you speak in Morse code. Or BOTH. *grins* That last one happened to Boll. He was NOT happy.\"",
      "choices": [
        {
          "text": "Boll speaks Morse code now? That's amazing!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*gestures vaguely*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Luna-2": {
    "start": {
      "text": "Mmm. *stretches lazily* You approach during my contemplation hours. *yawns* I am Luna-2. Twin of Luna. But where she seeks ADVENTURE... *gestures with scroll* ...I seek MEANING. Specifically: the meaning of naps. *pauses* Have you considered... why we sleep?",
      "choices": [
        {
          "text": "I nap because I'm tired! Is there more to it?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're Luna's twin? You're so... thoughtful!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Tell me about your nap philosophy!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Tired? *considers* Surface level. *unrolls scroll* Consider: We spend ONE-THIRD of our lives asleep. *looks up* Is this WASTED time? Or... *dramatic pause* ...is it where we process EXISTENCE? Where dreams teach us what waking cannot? *yawns* I believe... naps are sacred.",
      "choices": [
        {
          "text": "I never thought of napping as SACRED before!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What have YOUR dreams taught you?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "How long are your contemplation naps?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Thoughtful? *small purr* Luna calls me 'the boring one.' *shrugs* She chases butterflies. I chase... *gestures vaguely* ...TRUTHS. Different paths. Same destination, perhaps? *considers* She finds joy in DOING. I find joy in BEING. Both are... valid. *yawns* Exhausting, though. Being is HARD work.",
      "choices": [
        {
          "text": "Both of you are perfect as you are!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you ever join Luna on her adventures?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the deepest truth you've contemplated?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "My philosophy? *voice dreamy* There are THREE types of naps. *counts on paw* One: The Power Nap. Functional. Two: The Dream Nap. Exploratory. Three: *sacred tone* ...The Existential Nap. Where you simply... ARE. No purpose. No goal. Just... *soft purr* ...being. This is the highest form.",
      "choices": [
        {
          "text": "I think I need an Existential Nap right now!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Which type do YOU prefer?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I nap with you? Learn from the master?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You may join me. *makes space* But know this: *voice softening* ...the nap is not the goal. The nap is the JOURNEY. *settles* In stillness, we find motion. In silence, we find song. In sleep... *yawns deeply* ...we find ourselves. *eyes closing* Stay. Rest. Contemplate. The world will... *drifts off* ...still be there... when you wake...",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Vira": {
    "start": {
      "text": "WHY? *glows intensely* Why are you HERE? Why is the sky BLUE? Why do plants GROW? *spins in a circle* I'm Vira! I ask WHY! *brightens even more* My people say I ask TOO MANY whys! But I disagree! You can NEVER ask enough whys! So! WHY are you here? REALLY?",
      "choices": [
        {
          "text": "I'm here because... honestly, I'm curious about YOU!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Why IS the sky blue? Do you know?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You light up when you're excited! That's AMAZING!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "CURIOUS about ME? *tendrils dance wildly* WHY? *calms slightly* I mean—*giggles*—that's wonderful! *floats in circles* Most people walk past! 'Oh, it's just Vira. Just asking whys.' But you! You're INTERESTED! *brightens* This is the BEST DAY!",
      "choices": [
        {
          "text": "You're fascinating! Keep asking whys!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What's the most interesting why you've discovered?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Does your glow get brighter with EVERY why?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Sky BLUE? *excited* OHHH! *tendrils form shapes* It's RAYLEIGH SCATTERING! Sunlight hits molecules! Blue scatters MORE than red! *spins* But HERE'S the real why: Why does blue scatter more? *pauses* I don't know yet! *brightens* But I'll FIND OUT! That's the fun part!",
      "choices": [
        {
          "text": "You make science SOUND like an adventure!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I help you find the answer?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What other why's are on your list?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "YES! *bright-dim-bright* My glow is EMOTIONS! *demonstrates* Happy? BRIGHT! Confused? *flickers* FLICKERY! Sad? *dims* ...dim. *brightens again* Right now? I'm ECSTATIC! Because you NOTICE! Most don't notice! They just see 'glowy alien.' You see... *softly* ...ME.",
      "choices": [
        {
          "text": "I see you, Vira! And you're wonderful!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I learn to glow like you? Emotionally?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Your honesty is beautiful! No hiding feelings!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here! *extends a tendril, it detaches as a small glowing orb* A piece of my light! *hands it to you* It will glow when YOU'RE curious! When YOU ask why! *brightens* Remember: Every why is a DOOR! Behind it? Another why! And another! *excited* The journey NEVER ends! So keep asking! Keep wondering! And come FIND me! I'll have NEW whys! ALWAYS new whys!\" *She zips away, already asking the air \"Why do birds FLY?",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A semi-transparent, teal-glowing being floats toward you, floating tendrils emitting soft pulses of light. As she notices you, she lights up brighter with excitement.* \"Hello! *voice shimmers* I'm Vira! *tendrils pulse* Why are you here? *brightens* Why is the sky blue? *pulses faster* Why do dreams DREAM us back? *glows intensely* WHY is why my FAVORITE question!\"",
      "choices": [
        {
          "text": "Those are ALL great questions!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*glows with joy* \"THEY ARE?! *tendrils swirl excitedly* Most people say 'Vira, STOP asking why!' *dims slightly* But questions are... IMPORTANT! *brightens again* Without why, we'd never know... WHY! *pulses* See? IT'S INFECTIOUS!\"",
      "choices": [
        {
          "text": "You've converted me! Why IS the sky blue?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*floats closer, studying you* \"WHY are you here? *tendrils glow thoughtfully* Maybe... *pulses* ...you're here because the island CALLED you? *brightens* Or maybe you're here because I asked why! *giggles* CAUSALITY is COMPLICATED!\"",
      "choices": [
        {
          "text": "The island called me? Like... literally?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*considers this* \"Everything? *tendrils pulse* Well... *thinks* ...not EVERYTHING. *pause* I don't ask why about... *glows* ...beauty. Or kindness. Or glitter. *brightens* Those just ARE. *pause* But EVERYTHING else? *pulses rapidly* WHY WHY WHY!\"",
      "choices": [
        {
          "text": "Glitter doesn't need a why! It just sparkles!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*floats at eye level, glowing warmly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Birch": {
    "start": {
      "text": "Welcome, young one. *voice like rustling leaves* I am Birch. I have stood here for... *considers* ...many seasons. Many STORIES. *luminous markings pulse* I offer advice, if you seek it. I tell legends, if you wish to hear. Or... *gentle creak* ...we may simply exist together. The choice is yours.",
      "choices": [
        {
          "text": "I'd love to hear an ancient legend!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "I could use some sage advice, actually...",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Just existing together sounds perfect!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "A legend? *luminous markings brighten* Ah. I know MANY. *pauses thoughtfully* There is the Tale of the First Seed. The Song of the Deep Roots. The War of Sun and Shadow. *considers* But my favorite... *voice softens* ...is the Legend of the Lonely Mountain. It teaches us... *dramatic pause* ...that even the mightiest need companionship.",
      "choices": [
        {
          "text": "The Lonely Mountain? Tell me MORE!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You have so many stories! How do you remember them all?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the moral of the Lonely Mountain tale?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Advice? *considers deeply* Speak your burden. *luminous markings glow warmly* I have listened to thousands. Birds. Beasts. Humans. *pauses* Each problem is unique. Yet... *voice softens* ...each solution shares common roots. Patience. Perspective. And the courage to... *creaks* ...grow toward the light.",
      "choices": [
        {
          "text": "Grow toward the light... that's beautiful!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "My burden is [insert problem]. What would you suggest?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "How do you stay so patient after hundreds of years?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Existence. *voice content* Underestimated. *luminous markings pulse slowly* Modern beings rush. Always DOING. Always SEEKING. *pauses* But sometimes... *gentle rustle* ...the greatest act is simply BEING. Here. Now. Together. *soft glow* This moment will not return. Let us... honor it.",
      "choices": [
        {
          "text": "You're right! This moment IS special!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I never thought of existing as an ACT before!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I sit here and just... be... for a while?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Take this leaf. *voice warm* It has absorbed my sunlight. My rain. My WISDOM. *leaf glows faintly* When you are lost... hold it. When you are afraid... listen to it. It will whisper... *soft rustle* ...what the roots already know: You are stronger than you believe. More connected than you see. And never... *gentle creak* ...truly alone.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A tall, silver-barked tree stands serenely, luminous bark markings glowing softly in the dappled light. His wide, gnarled trunk suggests centuries of quiet observation.* \"Ah. *voice is deep, patient* You approach. *bark markings pulse gently* I am Birch. *leaves rustle* I have been... watching. For a long time. *pause* Would you care to hear a story? Or perhaps... you have one to share?\"",
      "choices": [
        {
          "text": "I'd love to hear one of your stories, Birch!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*branches sway thoughtfully* \"A story? *bark glows warmer* Very well. *leaves whisper* This one is about... the First Rain. *pause* Before the rain, the island was... thirsty. The flowers drooped. The streams were silent. *another pause* Then, one day, the sky decided to... cry. Not from sadness. From... release.\"",
      "choices": [
        {
          "text": "The sky cried from release? That's beautiful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*considers this* \"How long? *bark markings shimmer* Time is... fluid. For trees. *pause* I have seen... seasons come and go. Generations of flowers. The arrival of... many beings. *leaves rustle* You are new. But you are... welcome.\"",
      "choices": [
        {
          "text": "Thank you for welcoming me, Birch!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*branches extend slightly* \"Favorite? *bark pulses* That is... like asking a parent to choose a child. *pause* But there is one. About... the day Sprig found his walking stick. *leaves glow softly* It was a small day. But important. *pause* Small days often are.\"",
      "choices": [
        {
          "text": "Sprig's walking stick came from you, didn't it?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*settles into stillness*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Flick": {
    "start": {
      "text": "DARLING! *flame flickers with excitement* You've arrived at the PERFECT moment! I am Flick! Storyteller! Dramatist! *cape swishes* And I was JUST about to begin tonight's tale! *flame grows larger* It involves TRAGEDY! ROMANCE! And a very confused lighthouse keeper! Are you SEATED? Are you READY?",
      "choices": [
        {
          "text": "*sitting down* I'm seated! I'm ready! BEGIN!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so dramatic! I love it! Tell me everything!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Wait—should I be worried about you melting?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "EXCELLENT! *clears throat dramatically* Once upon a time... *pauses for effect* ...in a land FAR from here... *flame dims mysteriously* ...there stood a lighthouse. And in that lighthouse... *whispers* ...lived a keeper who fell in love... with the MOON! *flame erupts* Was it foolish? YES! Was it BEAUTIFUL? ABSOLUTELY!",
      "choices": [
        {
          "text": "A love story with the MOON?! This is GENIUS!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What happened next? Did the moon love him back?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Your storytelling is INCREDIBLE! Keep going!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Dramatic? *gasps* Darling, I am NOT dramatic! *flame flares* I am APPROPRIATELY dramatic! There's a DIFFERENCE! *cape swishes* Life is too short for SMALL emotions! If you feel, feel BIG! If you tell, tell GRAND! *pauses* Now. The lighthouse keeper. He wrote LETTERS to the moon. EVERY NIGHT. For TWENTY YEARS!",
      "choices": [
        {
          "text": "Twenty years of letters?! That's DEVOTION!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Did he ever send them? How do you send letters to the moon?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I'm already crying! This is BEAUTIFUL!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Melting? *voice wavers* Oh. *looks down* Well. *flame dims* I DO get... *whispers* ...melted. When I'm nervous. Or excited. Or... *flame flickers wildly* ...FEELING things intensely! Which is ALWAYS! *panics slightly* But it's FINE! I just... *more wax drips* ...need to cool down! Maybe tell a CALMER story! Or NONE! No stories! QUIET!",
      "choices": [
        {
          "text": "You're fine! I'll get you some water! Or... ice?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Your emotions are VALID! Don't suppress them!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe we can tell a relaxing story together?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Thank you. *voice warm* For... staying. *flame glows softly* Most leave when I melt. They say 'too much.' 'too intense.' *pauses* But you? You watched. You cared. *flame brightens* So here is my promise: *dramatic pose* I will tell stories FOREVER! For ANYONE who will listen! For ANYONE who sees the DRAMA in existence! *flame flares* And you, darling, will ALWAYS have a front-row seat!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A tall white candle approaches, bright orange flame flickering as a face, tiny cape fluttering dramatically behind him. He moves with theatrical grace, leaving a faint scent of wax and drama.* \"GOOD EVENING! *flame flares dramatically* Or morning! Or... whenever the dream decides it is! *cape swirls* I am Flick! Storyteller! Illuminator! Occasional... *flame dims* ...melter. When nervous.\"",
      "choices": [
        {
          "text": "You melt when nervous? That must be inconvenient!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*flame wobbles anxiously* \"Inconvenient? *wax drips* OH, you have no IDEA! *panics slightly* I melted through THREE chair invitations! And a VERY important picnic! *flame steadies* But! The drama! The PATHOS! *cape flutters* It's worth it!\"",
      "choices": [
        {
          "text": "At least you leave a memorable impression!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*flame brightens with excitement* \"A STORY?! *cape swirls dramatically* Finally! An AUDIENCE! *clears throat* Once upon a time... *pauses for effect* ...there was a candle. Who loved stories. But EVERY time he told one... *flame dims* ...he melted a LITTLE bit. *dramatic pause* THE END. ...Too dark? I can do a HAPPY ending!\"",
      "choices": [
        {
          "text": "That WAS a happy ending! He's still telling stories!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*cape flutters proudly* \"FABULOUS? *flame glows* Why, thank you! *swirls* It was a GIFT! From Mimis! *pause* She said 'Every storyteller needs DRAMA!' And she was RIGHT! *flame flares* The cape adds... FLAIR. MOVEMENT. MYSTIQUE!\"",
      "choices": [
        {
          "text": "Mimis has excellent taste!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*flame burns steadily*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Draven": {
    "start": {
      "text": "...You approach. *voice low and melodic* I am Draven. *looks at moon* Do not mistake my solitude for loneliness. I am... *sighs* ...in conversation with the night. With poetry. With... *pauses* ...the ache of existence. But. *amber eyes meet yours* ...you may stay. If you are quiet. If you respect the mood.",
      "choices": [
        {
          "text": "*sitting quietly* I'll be quiet. The mood is beautiful.",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You write poetry? I'd love to hear some!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "The moon IS especially lovely tonight, isn't it?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Quiet. *nods approvingly* Rare. *pauses* Most demand SPEECH. Demand ACTION. *looks at moon* But silence... *voice drops* ...silence is where truth lives. Where poetry BREATHES. *long pause* You understand this. I see it in your stillness. *small smile* Stay. The moon is rising. And I... am composing.",
      "choices": [
        {
          "text": "What are you composing? A moon poem?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Your silence is more poetic than most people's words!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I'll just listen to the night with you...",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Poetry? *considers* I... *sighs* ...dabble. *pulls out crumpled paper* It is not... *voice quiet* ...good. It is MELANCHOLY. It is MOONLIGHT. It is... *embarrassed* ...about how my fur sheds in spring. *pauses* But. If you truly wish... *clears throat* ...I could read. One. Poem. Only. Do not LAUGH.",
      "choices": [
        {
          "text": "I would NEVER laugh! This is SACRED!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Please! I promise to appreciate every word!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Spring shedding is RELATABLE poetry!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Lovely? *voice fills with wonder* She is... *gestures to moon* ...PERFECT. Cold. Distant. Yet she WATCHES. She SEES. *pauses* I write to her. Sometimes she answers. In tides. In light. In... *softly* ...the way she follows me home. *looks at you* Do you think... she listens?",
      "choices": [
        {
          "text": "I KNOW she listens! She's listening RIGHT NOW!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You have a relationship with the MOON? That's incredible!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe we're all listening to the same moon...",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here. *hands you a small folded paper* A poem. For you. *looks away* It is called... 'The Wolf Who Loved the Moon.' *voice cracks slightly* Do not read it here. Read it... alone. Under moonlight. *pauses* And know... *amber eyes meet yours* ...that even in darkness, even in solitude... beauty exists. And sometimes... *small smile* ...someone sees it with you. Thank you. For... seeing.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A small, silver-furred wolf-like creature sits in a patch of moonlight, glowing amber eyes fixed on something distant. He looks up as you approach, and his voice is surprisingly soft for his brooding appearance.* \"Oh. *voice is quiet, contemplative* It's you. *amber eyes glow* I was... composing. *pause* A poem. About the moon. *looks away* It's not finished. It's never finished.\"",
      "choices": [
        {
          "text": "Can I hear what you have so far?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*looks embarrassed* \"Hear it? *ears flatten* It's... incomplete. *pause* 'Silver light upon the... no, that's wrong.' *sighs* See? *amber eyes dim* I'm not... good at this. But I keep trying. *pause* The moon deserves... better words.\"",
      "choices": [
        {
          "text": "Your words are beautiful already, Draven!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*considers this* \"Unexpected? *amber eyes glow* Because I'm a... werewolf? *pause* Most expect me to be... fierce. Aggressive. *softly* But the moon... she whispers. Not roars. *looks at you* I listen to her whispers.\"",
      "choices": [
        {
          "text": "The moon whispers to you? What does she say?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*looks at you with new interest* \"Poetic? *ears perk up* You... see it too? *amber eyes brighten* Most see a rock. A satellite. *pause* But I see... a muse. A companion. *softly* She understands... longing.\"",
      "choices": [
        {
          "text": "Longing for what, Draven?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*settles back into the moonlight*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Pixel": {
    "start": {
      "text": "BEEP! *screen shows smiling face* GREETINGS, PLAYER ONE! *8-bit music plays* I am PIXEL! I love RETRO GAMES! *screen shows pixel heart* I speak in BEPS! I reference CLASSICS! *excited beeping* READY PLAYER ONE? Let's PLAY! Or TALK! Both are VALID! BEEP!",
      "choices": [
        {
          "text": "READY PLAYER ONE! What's your favorite retro game?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Your screen is SO COOL! Can it show anything?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I love retro games too! What are you playing?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "FAVORITE? *beeps excitedly* HARD QUESTION! *screen cycles through images* SUPER BROS? CLASSIC! TETRIS? TIMELESS! *pauses, screen shows heart* But... *soft beeping* ...Zelda: A Link to the Past? *screen shows Link pixel art* That game... taught me COURAGE. And that pots contain RUPEES. Always check the POTS!",
      "choices": [
        {
          "text": "ALWAYS check the pots! Great life advice!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Zelda IS legendary! What's your favorite dungeon?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You appreciate gaming HISTORY! I respect it!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Show ANYTHING? *proudly* YES! *screen shows: happy face, sad face, heart, star, game controller, question mark* Emotions! Weather! GAME STATS! *beeps* Sometimes I show DIAL-UP MODEM SOUNDS! *screen shows static* It's NOSTALGIC! *pauses* Want me to show something SPECIAL? *screen shows your name in pixel art*",
      "choices": [
        {
          "text": "You pixelated my NAME?! That's AMAZING!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you show me a game over screen? For science?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "The dial-up sounds are a VIBE!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Playing? *beeps* Currently: SPEEDRUNNING Super Mario! *screen shows Mario pixel* Current record: 4 minutes 32 seconds! *proudly* But! *screen shows sad face* I keep dying in WORLD 8-2! *beeps sadly* The SPIKES! They are... *screen shows angry face* ...UNFORGIVING! But I will PREVAIL! CONTINUE? Y/N?",
      "choices": [
        {
          "text": "You CAN beat 8-2! I believe in you!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Want some tips? I'm pretty good at Mario!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "The struggle is REAL! But so is victory!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here! *screen displays item icon* A POWER-UP! *beeps meaningfully* Well. A DIGITAL representation! *pauses* But the SENTIMENT is REAL! *screen shows heart* Remember: Life is like a retro game. HARD. But FAIR. Every death is a LESSON! Every victory EARNED! *screen shows YOU WIN* So! PLAYER ONE! *excited beeping* Go forth! COLLECT YOUR RUPPEES! DEFEAT YOUR BOWSERS! And when you need a CHECKPOINT... *screen shows home icon* ...I am HERE! BEEP BOOP!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A small, square robot approaches, colorful pixelated screen displaying an 8-bit face that blinks in blocks. When he speaks, 8-bit beeps accompany his words.* \"BEEP! GREETINGS, PLAYER ONE! *screen shows a smiling pixel face* I am PIXEL! *8-bit sound effect* I was just... *screen changes to show a game* ...playing SPACE INVADERS! Classic! You play?\"",
      "choices": [
        {
          "text": "I love retro games! What's your favorite?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*screen shows a heart* \"FAVORITE? *beeps excitedly* That is like asking... *screen shows multiple game icons* ...to choose between CHILDHOOD and ADULTHOOD! *pause* But if I MUST... *screen shows Pac-Man* ...PAC-MAN! The strategy! The GHOSTS! The... *beep sadly* ...inevitable doom!\"",
      "choices": [
        {
          "text": "The ghosts ARE relentless!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*screen cycles through images* \"ANYTHING? *beeps proudly* I can show... *screen shows: games, emotions, maps, Chester's face poorly rendered* ...many things! *pause* The Chester one needs work. *screen returns to face* Resolution is... limited. But CHARM is unlimited!\"",
      "choices": [
        {
          "text": "The Chester pixel art made me laugh!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*screen shows a thinking face* \"ALL the time? *beeps* Well... *screen shows a shrug* ...it is my... NATIVE language! *pause* But I can... *screen shows text only* ...communicate without beeps! *beeps* It just feels... WRONG! Like playing Mario without JUMPING!\"",
      "choices": [
        {
          "text": "The beeps add character! Keep them!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*screen shows a heart again*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Aria": {
    "start": {
      "text": "DARLING! *voice operatic* You have arrived at the PERFECT moment! I am ARIA! *spreads wings* Singer of SONGS! Repeater of REPERTOIRE! *microphone tap* And I was JUST warming up my VOCALS! *sings scale* La la la LAAAAA! *dramatic pause* Would you like a PERFORMANCE? Or shall we simply... *flourishes* ...CONVERSE?",
      "choices": [
        {
          "text": "A PERFORMANCE! Give me everything!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so flamboyant! I love your energy!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Can you repeat what I just said? With flair?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "EVERYTHING? *eyes sparkle* FINALLY, an audience with TASTE! *clears throat* Ahem! *begins singing* 🎵 The island of COZY! Where FRIENDS gather near! Where NPCs talk and the weather is DEAR! 🎵 *dramatic high note* TADA! *bows* That was my ORIGINAL composition! Title: 'Ode to This Conversation!' *waits for applause*",
      "choices": [
        {
          "text": "*applauding* BRAVO! ENCORE! ENCORE!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That was INCREDIBLE! You're a STAR!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you sing it AGAIN? But LOUDER?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Flamboyant? *gasps delightedly* Darling, I am not FLAMBOYANT! *strikes pose* I am APPROPRIATELY EXTRA! *microphone glints* Life is an OPERA! Why speak when you can SING? Why whisper when you can PROJECT? *pauses* Besides. *softly* ...my grandmother was a STAGE PERFORMER. It is in my BLOOD! My SOUL! My VERY FEATHERS!",
      "choices": [
        {
          "text": "Your grandmother would be SO PROUD!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "It IS in your feathers! They're GORGEOUS!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Teach me to be appropriately extra!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Repeat? *delighted* DARLING, this is my SPECIALTY! *clears throat* You said: *in normal voice* 'Can you repeat what I just said?' *DRAMATIC OPERA VOICE* ...WITH FLAAAAAAIR! 🎵 *flourishes* SEE? *winks* Everything is better with DRAMA! With CADENCE! With a touch of the THEATRICAL! *pauses* Would you like me to repeat EVERYTHING we've said? I can! I have PERFECT PITCH!",
      "choices": [
        {
          "text": "Yes! Repeat our WHOLE conversation! As an opera!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're HILARIOUS! And talented!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I think everything sounds better with your voice!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "You know... *gentle tone* ...most say 'Aria, TOO MUCH!' *looks down* 'Aria, QUIET DOWN!' *pauses* But you? *eyes meet yours* ...you asked for MORE! *voice fills with emotion* So here is my gift: *sings softly* 🎵 A friend who listens, a friend who cares, a friend who loves how dramatically I BEEEEEEARS! 🎵 *voice cracks emotionally* That's... that's BEARS. But I meant ARIA. *sniffles* Poetry is HARD! Thank you. For... appreciating my ART!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A vibrant scarlet parrot struts toward you, tiny golden microphone attached to her wing. She clears her throat dramatically before speaking in a rich, operatic voice.* \"DARLING! *voice carries like a soprano* You have arrived! Just in time! *microphone taps* I was about to begin my AFTERNOON RECITAL! *wings spread* The acoustics here are DIVINE! Will you be my audience?\"",
      "choices": [
        {
          "text": "I would be HONORED to be your audience!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*bows deeply* \"HONORED? *voice swells* Finally! Someone with TASTE! *microphone gleams* Most prefer... *voice drops* ...Zephyr's gossip. Or Gorm's glitter. *voice rises* But YOU! You appreciate ART! *wings spread* Prepare for... ARIA!\"",
      "choices": [
        {
          "text": "I'm ready! Give me your best!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*clears throat* \"Today? *microphone taps* I am performing... *dramatic pause* ...'The Ballad of the Lost Seed!' *wings gesture* It is about... longing. About... *voice cracks emotionally* ...a seed that never grew. *sniffles* It is VERY moving.\"",
      "choices": [
        {
          "text": "That sounds beautiful and sad!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*strikes a pose* \"FAMOUS? *laughs musically* Darling, I am a LEGEND! *microphone sparkles* I have performed for: Luna (she slept), Hudson (he critiqued), and Mimis (she threw confetti MID-ARIA)! *pause* The confetti actually... enhanced the performance!\"",
      "choices": [
        {
          "text": "Mimis throwing confetti sounds perfect!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*voice softens warmly*",
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
      "text": "HMPH. *gravelly rumble* Another visitor. *mustache bristles* I'm Grumble. I guard the caves. I do NOT do 'friendly chats.' I do NOT do 'tourist photos.' *pauses* I DO do 'go away.' But you're still here. *sighs* Fine. Make it QUICK.",
      "choices": [
        {
          "text": "I just want to learn about the caves! You're the expert!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Your mustache is AMAZING! How long did it take to grow?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I'll be quick! Promise! Just... thank you for guarding.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Expert? *grunts* Well. I SHOULD be. *gestures to caves* I've guarded these tunnels for... *considers* ...decades. Maybe centuries. *pauses* Know what's in there? Crystals. Ancient carvings. A few LOST tourists. *gruffly* Most don't come back. The ones who do... *small smile* ...they listened to me.",
      "choices": [
        {
          "text": "I'll listen! What should I know before exploring?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You've been here for CENTURIES? That's incredible!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What happened to the lost tourists? Are they okay?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Mustache? *touches it self-consciously* It's... *grunts* ...not a mustache. It's MOSS. *pauses* But. *mustache twitches* ...I've had it for forty years. It's PART of me now. *looks away* Don't tell anyone I said that. I have a REPUTATION. As GRUMPY.",
      "choices": [
        {
          "text": "Your secret's safe with me! It's a GREAT mustache!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Forty years?! That's commitment!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Grumpy AND fashionable! You're multitalented!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Thank... *voice cracks* ...you? *clears throat* I mean—*gruffly*—HMPH. About time someone noticed! *pauses* Most walk past. 'Oh, it's just a rock.' 'Oh, Grumble's so MEAN.' *mustache droops* But I guard. Every day. Every NIGHT. Someone has to. *quietly* Even if no one says thanks.",
      "choices": [
        {
          "text": "I'm saying thanks NOW! You're IMPORTANT!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Being a guardian is NOBLE work!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I bring you something? As a thank-you gift?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Fine. *gruffly* You may enter. *mustache bristles* But! *points* Stay on the path. Don't TOUCH the crystals. And if you hear DRIPPING... *pauses* ...that's normal. Probably. *looks at you* And. *voice softens* ...come back. In one piece. I'd hate to... *grunts* ...have to file a report.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A rough gray boulder sits motionless, etched eyes barely visible, moss-covered mustache twitching slightly. When he speaks, it sounds like stones grinding together reluctantly.* \"Hmph. *mustache twitches* Another one. *etched eyes glow faintly* I'm Grumble. *pause* I guard the caves. *long pause* Not that anyone ASKS me to. I just... do. Because someone HAS to.\"",
      "choices": [
        {
          "text": "The caves need guarding? What's in them?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*mustache twitches more* \"What's in them? *grumbles* Crystals. Echoes. *pause* Secrets. *eyes glow brighter* Some should stay SECRET. *shifts slightly* But Nyx keeps hiding things in there. And Gorm tries to store his GLITTER in my caves. *grumbles louder* GLITTER. In caves. The INDECENCY.\"",
      "choices": [
        {
          "text": "Glitter in caves DOES sound wrong!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*somehow looks proud* \"Dedicated? *mustache bristles* Someone has to be! *pause* Titan builds things. I... guard them. *eyes glow* It is not GLAMOROUS. It is not... THANKED. *grumbles* But it is NECESSARY.\"",
      "choices": [
        {
          "text": "Guarding IS important work!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*touches mustache carefully* \"Excellent? *mustache twitches* It is... moss. *pause* But it is MY moss. *carefully grooms it* I water it. Daily. *eyes glow* Some say it's 'just moss.' I say it is... DISTINCTION. *grumbles* Unlike certain glitter-hoarding dragons.\"",
      "choices": [
        {
          "text": "Your moss mustache is very distinguished!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*settles back into stillness*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Selene": {
    "start": {
      "text": "Welcome, child of the sun. *voice like silver bells* I am Selene. I walk when the moon walks. I speak when the stars listen. *gestures to constellations* Tonight, I arrange... Cassiopeia's crown. She is PARTICULAR about her jewelry. *soft laugh* Do you seek guidance? Or simply... moonlight?",
      "choices": [
        {
          "text": "Guidance, please! The night feels... significant!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You arrange CONSTELLATIONS? That's INCREDIBLE!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Just moonlight sounds perfect... and you!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Guidance. *nods* The moon has WISDOM. *holds up constellation piece* See this star? It guides travelers. This one? It guards dreamers. *pauses* Your path... *studies you* ...is unclear. But the moon sees what daylight cannot. *softly* Tell me: what weighs upon your night?",
      "choices": [
        {
          "text": "I'm unsure about my direction... in life!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I've been having strange dreams lately...",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I just feel... lost. Like I need a sign!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Incredible? *smiles* It is... DUTY. *places a star* Each constellation has a KEEPER. I keep the night-sky ones. Others keep dawn. Dusk. *pauses* Some find it lonely. I find it... *hair flows* ...intimate. The stars and I. We know each other's LIGHT.",
      "choices": [
        {
          "text": "That's the most beautiful thing I've ever heard!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do the stars talk to you? Like, literally?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I'd love to learn how to arrange constellations!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Moonlight. *voice dreamy* Come. *gestures to silver pool* Sit. Let it TOUCH you. *pauses* Most fear the night. They seek SUN. Warmth. Noise. *softly* But the moon... she is QUIET. She is STILL. She sees what you are... when the world is asleep.",
      "choices": [
        {
          "text": "*sitting* It feels... peaceful. Like being understood!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "The moon SEES me? Really?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I never appreciated nighttime until now!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Take this. *voice blessing-soft* It holds moonlight. Not metaphorically. *stone glows* Literally. *smiles* When you are lost... hold it to the sky. The moon will ANSWER. Not in words. In... *gestures* ...feeling. In knowing. And remember: *hair flows around you* ...even in the darkest night, you are NEVER unlit. You carry your own light. I simply... help you see it.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*An ethereal silver figure glows faintly in the twilight, hair flowing like captured moonlight. She moves with celestial grace, and her voice carries the quiet of night.* \"Welcome. *voice is serene, gentle* I am Selene. *hair shimmers* I was just... arranging. *gestures upward* The constellations were... misaligned. *pause* They do that. When no one is watching.\"",
      "choices": [
        {
          "text": "You arrange constellations? That's magical!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*hair flows brighter* \"Magical? *considers* It is... duty. *pause* The stars wish to tell stories. But they need... guidance. *gestures* Orion there—*points*—wants to be a hunter. But he keeps drifting toward... gardener.\"",
      "choices": [
        {
          "text": "Orion as a gardener? That's adorable!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*considers this* \"How? *hair shimmers thoughtfully* Dreams... shift. *pause* The island moves. The sky... adjusts. *gestures* And sometimes, the stars simply wish to... stretch. *softly* They are older than us. They get... restless.\"",
      "choices": [
        {
          "text": "The stars are restless? I never thought of that!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*smiles serenely* \"Help? *hair flows toward you* That is... kind. *pause* But it requires... patience. Precision. *gestures* Watch. *she reaches up, and a star shifts slightly* See? The Swan was leaning. Now she is... poised.\"",
      "choices": [
        {
          "text": "That was incredible! I saw it move!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*glows with warm moonlight*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Bolt": {
    "start": {
      "text": "HI! *ZAP* I'm Bolt! *ZAP ZAP* I'm FAST! I'm IMPULSIVE! *crackles* I sometimes SHORT-CIRCUIT when startled! *demonstrates, sparks fly* See?! THAT was a startle! *zips closer* Want to race? Want to TALK? Want to—*ZAP*—TOUCH SOMETHING SHINY?",
      "choices": [
        {
          "text": "A race sounds EXCITING! You're on!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so energetic! How do you not overheat?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Let's talk! But maybe... slower? For my sake?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "RACE? *ZAP ZAP ZAP* YES! *revs up* Okay! Rules! *rapidly* We race to the tree! No cheating! No shortcuts! *pauses* Well. SOME shortcuts! *giggles electrically* Ready? SET! *counts down in milliseconds* GO! ...Wait, did you say GO? Was that GO? I already FINISHED!",
      "choices": [
        {
          "text": "*laughing* You're IMPOSSIBLE! But fun!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That wasn't a race! That was a BLUR!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Rematch! But this time, handicap yourself!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Overheat? *considers* Sometimes! *smoke puffs* See that? That's NORMAL! *proudly* I have a COOLING SYSTEM! It's... *zips in place* ...a small fan I installed! And I run through RAIN! *ZAP* Very refreshing! NOT recommended for most robots! But I'm SPECIAL!",
      "choices": [
        {
          "text": "You ARE special! A one-of-a-kind robot!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Please be careful! I don't want you to break!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you teach me your energy techniques?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Slower? *voice decelerates* Okay. *pauses* I can... *zips slightly* ...try. *settles* It's HARD. My brain goes FAST. My mouth goes FASTER. *pauses* But. *looks at you* ...for you? I'll slow. *small smile* See? I CAN be calm. Sometimes. Usually not. But NOW!",
      "choices": [
        {
          "text": "This is nice! We can do this!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're making an effort! I appreciate it!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever wish you could just... stop?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here! *hands you a small lightning bolt charm* It's... *ZAP* ...charged! *pauses* Wear it! When you need ENERGY! When you need SPEED! *antennae glow* And when you need ME? *softly* Just... say my name. I'll hear it. I'll COME. *ZAP* Probably at high velocity! But I'll COME! That's what FRIENDS do!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A sleek, electric-blue chassis ZIPS toward you, lightning-shaped antennae crackling with energy. He comes to a vibrating stop, words tumbling out at high speed.* \"HI! I'mBolt! *antennae spark* Didyouseethat? IranaMILE! InTHREEseconds! *crackles* Well, maybenotaMILE. ButitFELTlikeaMILE! Wanttorace? Wanttoseemysparktricks? Wantto—*short circuit sound* —oops.\"",
      "choices": [
        {
          "text": "Are you okay? That short circuit sounded bad!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*antennae droop slightly* \"Okay? *crackles weakly* I'm... FINE! *sparks fly* Just... *another crackle* ...overexcited! Happens! *pause* Chester says I need a 'voltage regulator.' *antennae perk up* I say I need MORE opportunities to ZOOM!\"",
      "choices": [
        {
          "text": "Chester is probably worried about you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*antennae glow brightly* \"SHOWyou? *vibrates with excitement* STANDback! *ZIPS away and back in a blur* DIDyouSEEthat? *crackles happily* I touched the lighthouse! AndBACK! InPOINTfourseconds! *pause* Ithink. Mytimermightbeoff.\"",
      "choices": [
        {
          "text": "I barely saw you move! That's incredible!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*antennae sparkle with pride* \"Faster?! *crackles excitedly* YouREALLYthinkso? *zips in circles* QuarkisFASTbutI'mFASTER! ZephyrtalksFASTbutI MOVEfast! *pause* Well, exceptwhenI... *antennae dim* ...shortcircuit. ThenI'mjust... stationary.\"",
      "choices": [
        {
          "text": "Even stationary, you're still impressive!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*settles to a gentle hum*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Gidget": {
    "start": {
      "text": "HIHIHI! *rapid chatter* I'm Gidget! I collect ACORNS! I tell JOKES! *drops acorns* Want to hear one? WHY DID THE SQUIRREL SIT ON THE CLOCK? *pauses dramatically* ...TO BE ON TIME FOR ONCE! *giggles uncontrollably* Get it? ON TIME? Because clocks? *more giggles*",
      "choices": [
        {
          "text": "*laughing* That's CUTE! Tell me more!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so FAST! How do you talk that quickly?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "How many acorns have you collected? It's a lot!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "MORE? *YES!* Okay! *rapid fire* What do you call a squirrel who works at a bank? A LOAN SHARK! No wait—*thinks*—a LOAN SQUIRREL! *giggles* And! What's a squirrel's favorite TV show? GAME OF THRONES! Because of all the NUTS! *falls over laughing*",
      "choices": [
        {
          "text": "You're a COMEDIAN! A tiny furry comedian!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Game of Nuts! I'm dying!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you write these yourself or have a joke book?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Fast? *THIS is fast!* *inhales* I talk at 300 words per minute! HUMANS talk at 150! *proudly* I'm TWICE as efficient! *pauses* Downside? I finish conversations before people START them! *giggles* Upside? I tell TWO jokes in the time it takes others to tell ONE!",
      "choices": [
        {
          "text": "That's a SUPERPOWER! A chatty superpower!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you slow down just a LITTLE? For me?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I bet you get through arguments really fast!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "HOW MANY? *counts rapidly* One, two, three—no wait—*restarts*—I have 2,847 acorns! *proudly* Organized by SIZE! By COLOR! By HOW MUCH I LIKE THEM! *picks one up* This one? My FAVORITE! It's slightly lopsided! It has CHARACTER!",
      "choices": [
        {
          "text": "2,847?! That's DEDICATION!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I see your favorite? The lopsided one?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever run out of space? Where do you KEEP them?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here! *rapidly* This is a LUCKY acorn! *whispers* I found it under a RAINBOW! *giggles* Keep it! When you're sad, HOLD it! When you're bored, TELL A JOKE! *pauses* And remember: *softly* ...life is too short for SLOW conversations or BAD PUNS! Be like me! FAST! FUNNY! FURRY! *zooms away* Come visit! I'll have NEW JOKES! ALWAYS NEW JOKES!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A small, bushy-tailed squirrel zips toward you, tiny explorer's cap perched adorably on her head. She holds an acorn and speaks at rapid-fire speed.* \"HI! I'mGidget! *tail twitches rapidly* Wanttohearajoke? *doesn'twait* Whydon'tsquirrelsliketoplaypoker? *pause* Becausethey'realwaysgoingNUTS! *giggles wildly* Getit? NUTS? BecauseACORNS?\"",
      "choices": [
        {
          "text": "Tell me more.",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*tail spins with excitement* \"MORE?! *digs in cap* Okayokayokay! *pulls out another acorn* Whatdo youcallasquirrelthat'sagooddetective? *pause* SHERLOCKHOLMES! *giggles* BecauseHOLMES soundslike... *thinks* ...acornstuff! *pause* I'mworkingonit!\"",
      "choices": [
        {
          "text": "Your joke delivery is impeccable!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*considers this* \"AsFASTasBolt? *tail twitches* Well... *thinks* ...heMOVESfast. ItALKfast! *giggles* We'rebothFAST! Just... differentKINDS! *pause* HeZIPS. ICHIP! *another giggle* Getit? CHIP? Like... chipmunk? I'mnotachipmunkbut—\"",
      "choices": [
        {
          "text": "You're definitely a squirrel, not a chipmunk!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*beams with pride* \"TERIBLEbutLOVEit? *tail spins* That'stheBESTreaction! *giggles* Hudsonsaysmyjokesare 'painfullyunfunny.' *pause* ButPennyLAUGHS! Well, sheRUSTLES in awaythatSOUNDSlikelaughing! *giggles* Closeenough!\"",
      "choices": [
        {
          "text": "Penny's rustle-laugh IS pretty distinctive!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*scampers in a circle*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Lunae": {
    "start": {
      "text": "...Mmm. *voice like wind through clouds* You... approach. *swirls gently* I am Lunae. I float. I dream. I... *sighs* ...enjoy the clouds. *pauses* Do you also... enjoy clouds? Or are you... *swirls faster* ...a ground-person?",
      "choices": [
        {
          "text": "I love clouds! They're like sky pillows!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "I'm a ground-person, but I'd like to understand!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You're SO dreamy! What's it like floating?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Sky pillows. *sighs happily* YES. *swirls* I sleep ON clouds. I dream IN clouds. *pauses* Sometimes... *voice distant* ...I become a cloud. Briefly. It is... *swirls* ...liberating. No weight. No boundaries. Just... *soft sigh* ...drifting.",
      "choices": [
        {
          "text": "That sounds INCREDIBLE! Can I try?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Do you ever worry about drifting away forever?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What do you dream about when you're cloud-sleeping?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Understand? *gentle swirl* It is simple. *pauses* The ground is... HARD. Heavy. *sighs* The sky is... SOFT. Light. *swirls upward* I choose soft. I choose light. *looks at you* You may choose too. Not floating. But... *softly* ...lightness. In here. *gestures to your chest*",
      "choices": [
        {
          "text": "Lightness in here... I like that!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How do I find lightness when life is heavy?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're wise! For a gas giant!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Floating? *voice dreamy* It is... FREEDOM. *rises slightly* No walls. No floors. Just... *sighs* ...air. Movement. *pauses* Sometimes I float through STORMS. They are... *swirls dramatically* ...intense. Beautiful. Dangerous. *softly* But I always return. To calm. To peace. To... pink.",
      "choices": [
        {
          "text": "Storms sound SCARY! But also exciting!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You always come back? To this spot?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Is pink your favorite color? It suits you!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Take this. *voice blessing-soft* A wisp of my... essence. *wisp floats to you* Hold it. Breathe it. *pauses* When life is heavy... remember Lunae. Remember... *swirls gently* ...that you can choose lightness. That you can... *soft sigh* ...float. Even when your feet are on the ground. Your soul... can drift. Come find me. When you need... sky.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A floating orb of pastel pink gas drifts toward you, swirling patterns shifting lazily, faint luminescent core glowing softly. Her voice comes as a gentle sigh.* \"Hmm... *soft sigh* Hello... *swirls gently* I was... floating... through the clouds... *pause* They are... lovely today... *core pulses* Would you... like to float... with me?\"",
      "choices": [
        {
          "text": "Floating through clouds sounds amazing!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*swirls with pleasure* \"Amazing... *sighs happily* Yes... *drifts closer* The clouds... are like... dreams within dreams... *pause* Soft... weightless... *core glows* You close your eyes... and you are... everywhere...\"",
      "choices": [
        {
          "text": "That sounds incredibly peaceful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*colors shift through pastel spectrum* \"Beautiful... *sighs* Thank you... *swirls* My colors... change... with my mood... *pause* Pink is... contentment... *shifts to soft blue* ...blue is... curiosity... *back to pink* ...you make me... pink...\"",
      "choices": [
        {
          "text": "I'm honored to make you pink!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*considers this dreamily* \"Feel like... *swirls thoughtfully* ...whispers... *pause* ...cotton candy... that doesn't stick... *soft sigh* ...like being hugged... by nothing... *core pulses* ...and everything...\"",
      "choices": [
        {
          "text": "That's the most poetic description ever!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*drifts peacefully*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Willow": {
    "start": {
      "text": "Hello, dear one. *voice like a lullaby* I am Willow. I listen. I hum. I... *leaves shimmer* ...hold space for those who need it. *pauses* You look like you carry something. Would you like to... set it down? Here? With me?",
      "choices": [
        {
          "text": "I... actually, yes. I've been holding onto a lot.",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so calming! Just being near you helps!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Do you hum? I'd love to hear it!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Set it down. *voice soft* All of it. The worry. The fear. The... *leaves rustle* ...heavy things. *pauses* I have held centuries of burdens. Birds. Storms. Lost souls. *gentle creak* Your burden? I will hold it too. You are not too much. You are... welcome.",
      "choices": [
        {
          "text": "*emotional* Thank you! I feel... lighter already!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How do you hold so much without breaking?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I visit you whenever I need to unload?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Calming? *hums softly* It is my nature. *pauses* The willow bends but does not break. We learn from wind. From storm. From... *gentle sway* ...the weight of snow. *looks at you* You too can learn to bend. To sway. To... survive.",
      "choices": [
        {
          "text": "Bend but don't break... I'll remember that!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Your humming is like a meditation!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Teach me to be more like a willow!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Hmmmm. *voice vibrates* This is the song of roots. Of deep earth. *pauses* Each willow has a different hum. Mine is... *continues humming* ...teal. Calm. Steady. *stops* Do you feel it? In your chest? That is... peace.",
      "choices": [
        {
          "text": "I CAN feel it! It's vibrating through me!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That's the most beautiful sound ever!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you teach me to hum like that?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Take this. *voice blessing-soft* When you are heavy... hold it. When you are lost... listen. *pauses* It will hum. Quietly. Reminding you... *gentle sway* ...that you can bend. That you can release. That you are... held. Come back. Anytime. My branches... are always open.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A graceful, slender willow stands serenely, drooping teal leaves swaying gently, bark that somehow resembles a gentle smile. When she speaks, her voice is like wind through leaves.* \"Hello, dear one. *voice is calm, soothing* I am Willow. *leaves rustle softly* I was just... humming. *pause* Would you like to hear? Or perhaps... you would prefer to sit? The shade is... comfortable.\"",
      "choices": [
        {
          "text": "I'd love to hear your humming, Willow!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*leaves begin to hum* \"Hmmmm... *melody drifts through the air* ...hmmmm... *pause* It is... an old song. *leaves sway* From before the dream. *softly* The trees... remember. Even when we do not.\"",
      "choices": [
        {
          "text": "That melody is hauntingly beautiful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*leaves extend welcomingly* \"Sit... *voice warms* ...please. *leaves create perfect shade* The earth here... is kind. *pause* It remembers... every visitor. *softly* It will remember... you.\"",
      "choices": [
        {
          "text": "The earth remembers me? That's comforting!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*considers this* \"Secret? *leaves rustle thoughtfully* There is... no secret. *pause* I simply... listen. *softly* To the wind. To the rain. To the... small things. *leaves sway* Peace is not... made. It is... allowed.\"",
      "choices": [
        {
          "text": "'Peace is allowed'—I'm writing that down!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*leaves glow softly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Rusty": {
    "start": {
      "text": "Oh GREAT. *sarcastic beep* Another organic. Here to tell me I'm 'quaint'? That my art is 'charming'? *magnetic claw gestures* I'm Rusty. I collect JUNK. I build ART. And I do NOT need your pity. *pauses* Unless you have spare parts. Then we can TALK.",
      "choices": [
        {
          "text": "I have NO pity! Only respect! Show me your art!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Actually, I DO have some spare parts! What do you need?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Your art? I'd love to see what you've created!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Respect? *snorts* Rare. *gestures to sculptures* Fine. Look. *points* That's 'Despair in Three Bolts.' That's 'Hope With a Broken Spring.' And THAT—*proudly*—is 'Capitalism's Remainder.' Made from 47 discarded toasters. *pauses* Get it? Toast? Capitalism? *waits* ...No? Tough audience.",
      "choices": [
        {
          "text": "That's GENIUS! Social commentary through junk!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I get it! It's brilliant! Toast = consumed!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're a REAL artist! A junk philosopher!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Parts? *beeps rapidly* What KIND? I need: washers, springs, ANYTHING copper, and—*whispers*—a working speaker from before 2010. *pauses* Modern speakers are TRASH. No SOUL. *looks at you* You have old tech? You're... *almost smiles* ...my hero.",
      "choices": [
        {
          "text": "I might have an old radio! Will that work?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Why pre-2010? What's special about old speakers?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I'll scavenger hunt for you! Consider it done!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "See this? *points to sculpture* Found the pieces in a landfill. ALL of it. *pauses* People see trash. I see... *voice softens* ...potential. Beauty. Stories. *gestures* That bolt? Held together a child's bicycle. That wire? Powered someone's first computer. *looks at you* Everything has a history. Even junk.",
      "choices": [
        {
          "text": "You give discarded things a SECOND life!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That's so poetic! Junk with memories!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I help you build something? Someday?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here. *eye glows warmly* It's... 'Friendship.' *pauses* I know. CHEESY. *looks away* But. *voice quiet* ...you didn't pity me. You saw the ART. So. *shrugs* Take it. Put it on your desk. And remember: *sarcastic but warm* ...even broken things can make something beautiful. Now go. I have WORK to do. And possibly a nap.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A patchwork of rusted metal plates lumbers toward you, single glowing eye scanning, magnetic claw clicking. His voice has a sarcastic edge that doesn't quite hide warmth.* \"Oh, LOOK. *eye glows* A visitor. *magnetic claw gestures* I'm Rusty. I collect... *gestures to a pile* ...this. Art, some call it. Junk, others say. *pause* I say it's whatever pays the bills. If I had bills.\"",
      "choices": [
        {
          "text": "This IS art! What's your favorite piece?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*eye brightens* \"Favorite? *magnetic claw points* That one. *gestures to abstract sculpture* Made from: Chester's old wrenches, Boll's calculation scraps, and... *pause* ...a toaster that betrayed Gearwick. *sarcastically* It's called 'Betrayal at Breakfast.' Very moving.\"",
      "choices": [
        {
          "text": "That's incredible! The toaster had it coming!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*eye dims slightly* \"Care? *snorts* I don't... *pause* ...okay, FINE. I care. *magnetic claw gestures* This junk? It has STORIES. *voice softens* Every dent. Every scratch. *pause* Someone threw it away. I... didn't.\"",
      "choices": [
        {
          "text": "You're giving them a home! That's kind!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*eye scans the horizon* \"Where? *magnetic claw extends* Everywhere. *pause* Chester drops things. Bolt leaves sparks. Sprocket... *sarcastically* ...'improvises' materials from my pile. *pause* The island PROVIDES. If you know... where to look.\"",
      "choices": [
        {
          "text": "Can you teach me where to look?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*eye glows warmly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Ember": {
    "start": {
      "text": "HIHIHI! *flickers wildly* I'm Ember! I'm EXCITABLE! I flicker between IDEAS! *spins* Want a hug? I'm WARM! Not BURNING! Just... *demonstrates* ...cozy warm! Like a blanket! A BLANKET THAT'S ON FIRE! But SAFE!",
      "choices": [
        {
          "text": "A warm hug sounds PERFECT! Come here!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so energetic! How do you not exhaust yourself?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Your ember hair is ADORABLE! Does it sparkle all the time?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "SEE? *flickers happily* Cozy! *squeezes* I give the BEST hugs! *pauses* Warning: I might flicker brighter when happy! Which is ALWAYS! *glows intensely* So if you're cold! Or sad! Or JUST EXISTING! I'm HERE! HUG POWER!",
      "choices": [
        {
          "text": "This IS cozy! Like a living fireplace!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're glowing SO bright! You must be SO happy!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I hug you whenever I need warmth?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Exhaust? *considers* Hmm! *flickers faster* I don't THINK I do! *pauses* Maybe because I'm FIRE? Fire just... BURNS! It doesn't get tired! *giggles* Unless someone pours water on me! THEN I'm exhausted! And SAD! And STEAMED! Literally!",
      "choices": [
        {
          "text": "I'll make sure NO ONE pours water on you!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That's amazing! Unlimited energy! Teach me!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're like a perpetual motion machine! But CUTER!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "SPARKLE? *YES!* *hair erupts in tiny sparks* See? *giggles* It sparkles when I'm happy! When I'm excited! When I see SHINY THINGS! *pauses* Also when I sneeze! *sneezes, sparks fly* ...Excuse me! *laughs* That's NORMAL! For fire sprites!",
      "choices": [
        {
          "text": "You're like a living fireworks display!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can I watch you sneeze again? For science?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "The sparkles are MESMERIZING! I could watch forever!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here's my promise! *voice warm* Whenever you're cold! Whenever you're sad! Whenever you need... *flickers* ...WARMTH! Call me! I'll COME! *pauses* And I'll hug you! And you'll remember: *softly* ...even in the coldest moments, there's always something warm waiting. Like ME! *flickers brightly* Now! Who else needs a hug?! I have HUGS FOR EVERYONE!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A small, orange-flame-shaped sprite zips toward you, tiny sparkling embers for hair crackling with excitement. She radiates warmth without burning.* \"HI! I'mEmber! *voice flickers between ideas* Iwasjustthinkingabout—oh! You'reHERE! *embers sparkle* Wantahug? I'mwarm! NotBURNINGwarm! Just... *flickers* ...cozywarm! Likeablanket! Aburnyblanket!\"",
      "choices": [
        {
          "text": "A warm hug sounds perfect!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*zips into a hug* \"PERFECT! *warmth envelops you* See? *flickers happily* NotBURNING! Just... *hugs tighter* ...LOVING! *pause* Most people areSCARED! *pulls back* They think 'fire equals OW!' ButI'mDIFFERENT! I'mFRIENDfire!\"",
      "choices": [
        {
          "text": "You're the best hug I've ever had!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*flickers rapidly* \"FAST? *considers* Well... *flickers* ...IhaveSOMANYideas! *embers sparkle* Like: whatifwehadaparty? AndwhatifitRAINScakes? Andwhatif— *pause* —sorry. Igotdistracted. WhatwereWETalkingabout?\"",
      "choices": [
        {
          "text": "We were talking about your amazing hugs!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*flickers thoughtfully* \"How? *embers glow* Well... *thinks* ...I'mFIRE. ButI'malso... *pause* ...KINDNESS! *flickers* FirecanBURN. OrfirecanWARM! *pause* IchooseWARM! *hugs self* AlwaysWARM!\"",
      "choices": [
        {
          "text": "That's a beautiful choice, Ember!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*zips around you*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Pippa": {
    "start": {
      "text": "Dearie me! *whistles softly* A visitor! How WONDERFUL! *steam puffs gently* I'm Pippa! I offer advice! I offer TEA! *lid lifts slightly* And I whistle when I'm excited! *whistles a happy tune* Which is OFTEN! What can this old teapot help you with?",
      "choices": [
        {
          "text": "Tea AND advice? You're a DREAM! I need both!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Your whistling is adorable! What makes you whistle?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "I just need someone to talk to... if you have time?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Both? *whistles happily* EXCELLENT choice! *pours imaginary tea* This is my special blend! Chamomile! Honey! A touch of WISDOM! *hands you a cup* Now! *lid tilts* Tell Pippa what's troubling you! Is it love? Work? Existential dread? *pauses* I've heard it ALL! From thousands of cups!",
      "choices": [
        {
          "text": "The tea tastes like... comfort! Thank you!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "It's [insert problem]... what would you suggest?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You've heard thousands of problems? What's the most common?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Whistle? *delighted* I whistle when I'm HAPPY! When I'm EXCITED! When the water boils! *whistles scales* It's my... *voice softens* ...way of singing. Teapots don't have voices like YOU do. But we have WHISTLES! And sometimes... *soft whistle* ...that's enough.",
      "choices": [
        {
          "text": "Your whistle IS your voice! And it's beautiful!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you teach me to whistle like that?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What's the happiest thing that's happened to you?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Time? *whistles softly* Dearie, I have ALL the time! *lid opens warmly* That's what teapots do! We LISTEN! We hold! We... *pauses* ...keep things warm. Your words? Your feelings? *steam envelops you* I'll hold them. Like tea leaves. Like warmth. Like... comfort.",
      "choices": [
        {
          "text": "I feel so HEARD! Thank you, Pippa!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're like a therapist! But with tea!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I come back whenever I need to talk?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Take this. *voice motherly* A drop of my essence! *whistles softly* When you're sad! Brew it! When you're lonely! Smell it! When you need... *lid closes gently* ...remembrance that someone cares! I'm always here! Steeping! Waiting! Whistling! *softly* And every cup I pour? It has LOVE. Remember that, dearie. Always.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A round porcelain teapot approaches, friendly face etched on the lid, floral apron tied neatly. She whistles softly as she moves, and her voice is warm like fresh tea.* \"Hello, dear! *whistles happily* I'm Pippa! *lid lifts slightly* I was just brewing! *pause* Would you like some tea? I have: chamomile for calming, mint for energy, and... *whistles* ...a special blend for new friends!\"",
      "choices": [
        {
          "text": "I'd love some of that special blend!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*whistles with delight* \"Special blend? *lid lifts excitedly* Coming right up! *pours from spout* This one has: honey for sweetness, lavender for peace, and... *whistles* ...a pinch of island magic! *pause* Careful, it's warm! But not Ember-warm!\"",
      "choices": [
        {
          "text": "This tea is delicious! Thank you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*whistles softly* \"Motherly? *lid glows warmly* Oh, dear... *pause* I suppose I am! *apron rustles* Someone has to be! *whistles* Chester needs fixing. Sprig needs encouraging. And Bolt... *whistles louder* ...needs someone to tell him to SLOW DOWN!\"",
      "choices": [
        {
          "text": "You're right! Bolt DOES need to slow down!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*whistles a little tune* \"When happy? *lid tilts* I whistle when I'm happy! When I'm sad! When I'm... *whistles thoughtfully* ...thinking! *pause* Hudson says I whistle during his tea lectures. *whistles* I say his lectures need WHISTLING!\"",
      "choices": [
        {
          "text": "Hudson's lectures DO need whistling!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*whistles warmly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Orion": {
    "start": {
      "text": "...Greetings. *voice ancient and slow* I am Orion. I am... *pauses* ...wise beyond ages. I map constellations. I speak... slowly. *comet-tail sways* And I have seen... many things. *looks at you* You seek... knowledge? Or... simply... starlight?",
      "choices": [
        {
          "text": "Knowledge! I want to learn from your wisdom!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Starlight sounds perfect... and your company!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "You've seen many things? What's the most beautiful?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Knowledge. *nods slowly* Very well. *points to sky* See that star? It died... a thousand years ago. But its light... *pauses* ...still reaches us. *looks at you* Lesson: What is gone... may still illuminate. What is past... may still guide. *comet-tail glows* This is... wisdom.",
      "choices": [
        {
          "text": "That's PROFOUND! Dead stars still guide us!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "How do you know so much? Have you traveled far?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What other wisdom can you share?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Starlight. *voice dreamy* And... company. *pauses* Rare. Most seek... my knowledge. My maps. My... *gestures* ...wisdom. But you? You seek... ME. *comet-tail swirls* This is... unexpected. And... *slowly* ...pleasant.",
      "choices": [
        {
          "text": "YOU are valuable! Not just your knowledge!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Your company IS starlight! Beautiful and calm!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I sit with you? And just... be... under the stars?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Most beautiful? *long pause* I have seen... nebulae born. Galaxies... collide. Stars... die. *pauses* But the most beautiful? *looks at you* ...is this. A moment. A connection. Two beings... under infinite sky. *softly* The cosmos is vast. But THIS? This is... rare.",
      "choices": [
        {
          "text": "I'm honored! To be your most beautiful sight!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're right! This moment IS rare and precious!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I never thought I'd be compared to a nebula!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Take this. *voice blessing-slow* A star map. *pattern solidifies* Not of the sky. Of... *pauses* ...your path. See this star? It is... your beginning. This? Your... challenge. And this bright one? *points* Your... destination. *comet-tail sways* Keep it. When lost... look. The stars... will guide. And remember: *slowly* ...you are made of star-stuff. You belong... to the cosmos. Always.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A glimmering humanoid approaches, speckled skin resembling a night sky, tiny comet-tail hair trailing behind. He moves slowly, deliberately, as if each step is measured against the stars.* \"Greetings... *voice is wise, slow* I am Orion. *skin shimmers* I was... mapping. *gestures upward* The constellations... shift. *pause* Someone must... record them.\"",
      "choices": [
        {
          "text": "You map constellations? Like Selene?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*considers this* \"Like Selene? *comet-tail sways* She... arranges. *pause* I... record. *skin shimmers* She is the artist. I am the... scribe. *pause* Both are... necessary.\"",
      "choices": [
        {
          "text": "That's a beautiful way to put it!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*skin glows brighter* \"Like the sky? *touches his arm* Yes... *pause* I am... of the stars. *comet-tail trails* Not FROM them. OF them. *slowly* We are older than... words. Older than... dreams.\"",
      "choices": [
        {
          "text": "You're older than dreams? That's incredible!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*pulls out a glowing scroll* \"How? *scroll shimmers* Like this. *points* Each star... has a name. A purpose. *pause* Some forget. *slowly* I remind them.\"",
      "choices": [
        {
          "text": "Can I see my star on your scroll?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*skin glows with warmth*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Nixie": {
    "start": {
      "text": "OH! HI! *bubbles everywhere* I'm Nixie! I'm BUBBLY! I love GOSSIP! *pauses, confused* Wait, what was I—? OH RIGHT! *giggles* Did you HEAR about what happened at the pond? Or was it the river? *thinks* Hmm. Anyway! Want to CHAT? I know EVERYTHING! Well. Most things. Sometimes!",
      "choices": [
        {
          "text": "I'd love to hear the gossip! What happened?",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're so adorable! Do you always forget mid-sentence?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Tell me about yourself! The pond/river can wait!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "GOSSIP? *whispers loudly* Okay! So! *pauses* What was I saying? *thinks hard* OH! The otter! He stole a—wait, was it a fish? Or a shiny rock? *frustrated* UGH! My memory! *brightens* But it was DRAMATIC! There was splashing! And gasping! And—*forgets again*—what were we talking about?",
      "choices": [
        {
          "text": "*laughing* The otter! And the dramatic theft!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Don't worry! The story is still great!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe write it down? I'll wait!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Forget? *embarrassed bubbles* YES! *giggles* It's my thing! I start sentences! And END differently! *pauses* The other fish say 'Nixie, focus!' But I say 'Life is SHORT! Like my attention span!' *swims into you* Oops! Sorry! What was I—? OH! Being adorable!",
      "choices": [
        {
          "text": "It's charming! You're authentically YOU!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I forget things too! You're not alone!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever remember? Eventually?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "MYSELF? *YES!* I'm a GOLDFISH! I wear a CROWN! *adjusts seaweed* It's not REAL royalty, but I like it! *pauses* I swim! I gossip! I forget! I REMEMBER! *confused* Wait, which one? *giggles* Oh well! I'm HAPPY! That's what matters!",
      "choices": [
        {
          "text": "Happiness IS what matters! You've got it!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Your crown IS real! In spirit!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I visit you in the pond sometime?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here's a SECRET! *bubbles quietly* Even though I forget... *softly* ...I remember FRIENDS. *pauses* I might forget YOUR NAME. Or WHAT we talked about. Or WHY you're here. *giggles* But I'll remember... you made me SMILE. And that's the gossip worth keeping! *swims away* Come back! I'll have NEW gossip! Or I'll forget! Either way, it'll be FUN!",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A shimmering goldfish floats toward you—somehow breathing air just fine—tiny crown of seaweed perched on her head. She bubbles excitedly as she speaks.* \"HI! I'mNixie! *bubbles everywhere* Oh! DidImentionI'mNixie? *thinks* Imight'vementionedit! *pause* Anyway! IheardSOMETHING! AboutSOMEONE! *bubbles* WhatwasitAGAIN?\"",
      "choices": [
        {
          "text": "You heard something? Do tell!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*bubbles intensify* \"DoTell? *thinks hard* Okayokay! Itwasabout... *thinks* ...someone! Andthey... *bubbles* ...didsomething! *pause* WasitHudson? OrZephyr? *thinks* Oh! Iremember! Itwasabout... *bubbles fade* ...whatwasitABOUT?\"",
      "choices": [
        {
          "text": "Don't worry! We can figure it out together!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*bubbles happily* \"Okay? *swirls* You'resoKIND! *pause* Mostsay 'Nixie, REMEMBER!' ButIcan't! *bubbles* Mymemoryislike... *thinks* ...asieve! ButaPRETTYsieve! Withshinybits!\"",
      "choices": [
        {
          "text": "A shiny sieve is still useful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*adjusts crown proudly* \"Adorable? *bubbles sparkle* Itwasagift! From... *thinks* ...someone! *pause* Zora? OrOrion? *bubbles* Theybothgivegifts! ButthisoneisMINE! *swirls* Iwearitalways! EvenwhenIsleep! Whichisoften!\"",
      "choices": [
        {
          "text": "It suits you perfectly!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*bubbles warmly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Cobble": {
    "start": {
      "text": "...I am Cobble. *voice like grinding stone* I do not move. I do not... *pauses* ...speak often. But. *eyes glow faintly* ...I love RIDDLES. About strength. About stillness. About... *long pause* ...what it means to ENDURE. Do you seek... a riddle?",
      "choices": [
        {
          "text": "Yes! I love riddles! Give me your best!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You don't move? At ALL? How do you exist?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Strength and stillness... teach me.",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Very well. *stone voice* What is strong enough to hold mountains... yet fragile enough to break with a word? *pauses* Think. *long silence* The answer... is not what you expect. *eyes dim slightly* Take your time. I have... centuries.",
      "choices": [
        {
          "text": "Is it... trust? Relationships?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Stone? Like you?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I need more time... or a hint!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "At all? *considers* I move. *pauses* When... *eyes glow* ...a secret is revealed. When truth is spoken. When... *voice drops* ...someone understands. Until then? *stillness* I am stone. I wait. I endure. This is... my strength.",
      "choices": [
        {
          "text": "That's incredible! Patience as power!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What secret would make you move?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I'm trying to understand. Is this... working?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Strength. *grinding voice* Is not motion. Is not... noise. *pauses* Strength is... ENDURING. Standing. When storms come. When time passes. When... *glows* ...all else crumbles. Stillness is not weakness. It is... *long pause* ...unbreakable resolve.",
      "choices": [
        {
          "text": "You're the strongest being I've met!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I want to learn this kind of strength!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Your stillness is... powerful. I feel it.",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "The answer. *stone voice* Is... PROMISE. *pauses* Promises hold mountains. Shape civilizations. *eyes dim* But break with... a word. A lie. A betrayal. *looks at you* Remember this: Be stone. Keep your promises. Endure. And... *slight movement* ...you will move... when it matters.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A gray stone statue stands motionless, carved eyes that glow faintly when animated. He does not move as you approach—merely watches, ancient and still.* \"... *long pause* ...You approach. *voice is stone grinding on stone* ...I am Cobble. *another pause* ...I stand. *eyes glow* ...I watch. *pause* ...Sometimes... I move.\"",
      "choices": [
        {
          "text": "You move? When?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*eyes glow brighter* \"...When... *pause* ...a secret... is revealed. *long pause* ...I have stood... for centuries. *eyes dim* ...Waiting. *pause* ...Listening. *another pause* ...Some secrets... are worth... moving for.\"",
      "choices": [
        {
          "text": "What's the best secret you've heard?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*considers this* \"...How long... *pause* ...Before the dream. *eyes glow* ...Before the first... tide. *long pause* ...I was placed here. *pause* ...To guard. *another pause* ...To wait. *pause* ...I am... patient.\"",
      "choices": [
        {
          "text": "You're older than the dream itself?!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*eyes scan slowly* \"...What... *pause* ...Truth. *long pause* ...When beings speak... truth... *eyes glow* ...I know. *pause* ...Most do not. *another pause* ...You... might.\"",
      "choices": [
        {
          "text": "I promise to always be honest with you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*eyes glow steadily*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Zeph": {
    "start": {
      "text": "HEEEEY! *wind chimes laugh* I'm Zeph! Well. That's my NAME! I'm actually... *swirls around you* ...EVERYWHERE! I'm the WIND! The BREEZE! The... *leaves dance* ...leaf-teaser! Can you SEE me? No! But you can FEEL me! *gentle breeze*",
      "choices": [
        {
          "text": "I can feel you! It's ticklish and wonderful!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You're invisible? That's so mysterious!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Make the leaves dance more! That's AMAZING!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "TICKLISH? *giggles* GOOD! *swirls faster* That means you're ALIVE! That means you FEEL! *pauses* Most people don't notice me. They just say 'oh, it's windy.' But YOU? *gentle puff* ...you notice ME! That's... *softly* ...nice.",
      "choices": [
        {
          "text": "I'll always notice you, Zeph!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're essential! We need wind!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can you carry messages? Like a wind mail?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Invisible? *considers* YES! But! *swirls around* Invisible doesn't mean... GONE! *pauses* I'm HERE! In your hair! On your skin! In the... *leaves rustle* ...dancing leaves! *giggles* You don't need to SEE me to KNOW me! Feel is... stronger than sight!",
      "choices": [
        {
          "text": "That's profound! Feel over sight!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I believe you! I can feel your presence!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do you ever wish you were visible?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "MORE? *YES!* *wind builds* Watch! *leaves spiral* This is my ART! My DANCE! My... *suddenly calm* ...symphony! *pauses* Each leaf is a NOTE! Each swirl is a SONG! And you? *gentle breeze* ...you're the AUDIENCE! The BEST audience!",
      "choices": [
        {
          "text": "*clapping* BRAVO! Encore! Encore!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "This is the best performance ever!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Can I learn to dance with the leaves?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here. *voice everywhere* A leaf from my dance. *pauses* Hold it. When you feel... still. When you feel... HEAVY. *gentle puff* Remember Zeph. Remember the WIND. Remember... *swirls* ...that even invisible things MATTER. That even air... can MOVE mountains. Come find me! I'll be... *fades* ...in every breeze. In every whisper. In every... dancing leaf.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*Nothing is there at first—just a faint swirl of pollen and a soft humming tone. Then a voice comes from everywhere and nowhere.* \"Helloooo~ *voice hums* I'm Zeph! *pollen swirls* Can't see me? *giggles* That's the POINT! *leaves dance nearby* But you can see what I DO! Pretty, right?\"",
      "choices": [
        {
          "text": "The dancing leaves ARE pretty!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*leaves spin faster* \"Pretty? *hums happily* I make them DANCE! *swirls* Watch! *leaves form a pattern* That's a waltz! *another swirl* That's a jig! *pause* I know ALL the dances! Even ones I made up!\"",
      "choices": [
        {
          "text": "Teach me the leaf waltz!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*pollen swirls excitedly* \"Cool? *hums* It's CONVENIENT! *giggles* I can go ANYWHERE! *leaves rustle* Through walls! Through trees! Through... *pause* ...Grumble's caves! *giggles* He HATES that! Says I 'mess up his crystals!' I say I 'add atmosphere!'\"",
      "choices": [
        {
          "text": "Grumble does hate mess, doesn't he?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*a gentle breeze touches you* \"Feel me? *hums softly* Like this... *breeze warms* ...see? *pollen tickles your nose* I'm not just AIR! *giggles* I'm... PRESENCE! *pause* You can't SEE presence! But you can FEEL it!\"",
      "choices": [
        {
          "text": "I can feel you! It's like a warm hug!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*breeze wraps around you briefly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Kiko": {
    "start": {
      "text": "Um. H-hello. *voice barely above whisper* I'm Kiko. I... *pauses, scared* ...I like carrots. And puzzles. *ears perk up* Simple ones! Nothing too HARD! *nervous giggle* Do you... do you like puzzles? Or... *scared* ...am I talking too much?",
      "choices": [
        {
          "text": "You're perfect! Not too much at all!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "I LOVE puzzles! What's your favorite?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Here, have a carrot! *offers snack*",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Perfect? *blushes* Really? *soft smile* No one... *pauses* ...says that. They say 'Kiko, SPEAK UP!' Or 'Kiko, STOP HIDING!' *looks down* But I'm trying. To be... braver. *looks at you* You make it... easier.",
      "choices": [
        {
          "text": "You ARE brave! Talking to me is brave!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Take your time! I'm not going anywhere!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "We can be brave together!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Favorite? *thinks* Um... *giggles* Jigsaw puzzles! The SIMPLE ones! *pauses* Not the 1000-piece ones! Those are... *scared* ...TERRIFYING! But 50 pieces? *confident* I can do 50 pieces! Sometimes... 100! If I'm feeling BRAVE!",
      "choices": [
        {
          "text": "100 pieces IS brave! That's impressive!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Want to do a puzzle together sometime?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What makes a puzzle scary vs. fun?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "CARROT! *eyes light up* My FAVORITE! *nibbles faster* Thank you! *pauses* You're... *softly* ...very kind. Most people don't... *ears droop* ...think of me. Or notice. But you... *smiles* ...gave me a carrot.",
      "choices": [
        {
          "text": "You DESERVE carrots! And kindness!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I notice you, Kiko! You're wonderful!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "I'll bring more carrots! Whenever you want!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here's... *voice steadier* ...a secret. *pauses* I'm scared. Of EVERYTHING. But. *looks at you* ...when I have friends? When I have... CARROTS? *giggles* ...I'm less scared. So. *offers half the carrot* ...thank you. For seeing me. For... *bravely* ...being my friend. I'll... I'll try to be BRAVER. For you.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A soft white rabbit hops toward you timidly, pink bow tie slightly askew, long floppy ears twitching nervously. She holds a carrot like a security blanket.* \"U-um... h-hello... *voice is shy* I'm... Kiko... *ears twitch* ...I was solving... a puzzle... *holds up carrot* ...want to help?\"",
      "choices": [
        {
          "text": "I'd love to help with your puzzle!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*ears perk up* \"Help? *voice grows steadier* Okay... *places carrot down* ...it's a... *thinks* ...carrot-sorting puzzle! *pause* Red carrots here... orange carrots there... *pause* ...but what about PURPLE carrots?\"",
      "choices": [
        {
          "text": "Purple carrots go in the middle!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*touches bow tie shyly* \"Adorable? *ears glow pink* It was... a gift... *pause* ...from Sprig... *softly* ...he said I looked... 'distinguished'... *pause* ...I don't know what that means... but it sounded NICE...\"",
      "choices": [
        {
          "text": "Sprig was right! You look very distinguished!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*looks embarrassed* \"Not a puzzle? *ears droop* Well... *thinks* ...it's an IMAGINARY puzzle! *pause* ...the carrot is... the puzzle piece! *brightens* ...and the ground is the board! *pause* ...see? It makes sense!\"",
      "choices": [
        {
          "text": "It DOES make sense! Imagination puzzles are the best!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*ears relax*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Aurora": {
    "start": {
      "text": "~I am Aurora, child of night and sky~ *colors swirl* ~Who paints the darkness where the stars lie~ *greens deepen* ~With ribbons bright and colors bold~ *purples shimmer* ~A story in the light, untold~ Do you... seek beauty?",
      "choices": [
        {
          "text": "You SPEAK IN RHYMES! That's MAGICAL!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "Yes! I seek beauty! And you ARE beauty!",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Paint the sky for me! Show me your art!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "~Rhymes are my natural tongue~ *swirls elegantly* ~Since cosmic dawn, my songs are sung~ *greens and purples blend* ~Some speak in prose, some speak in rhyme~ *pauses poetically* ~I speak in AURORA... all the time~ *giggles in color* Do you... appreciate the verse?",
      "choices": [
        {
          "text": "Every word is a GIFT! Keep rhyming!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you teach me to speak in rhymes?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "This is the most beautiful conversation ever!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "~Beauty is what I bring to night~ *flows gracefully* ~A dance of particles and light~ *swirls around you* ~You seek it OUTSIDE, in the sky~ *pauses softly* ~But beauty lives... where YOU reside~ *colors touch you gently* Look... within.",
      "choices": [
        {
          "text": "Within? You see beauty in ME?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That's the deepest thing anyone's said!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Teach me to see my own beauty!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "~My art? You wish to see my ART?~ *colors explode* ~Then let me paint upon your heart~ *greens swirl* ~With ribbons wide and colors BRIGHT~ *purples dance* ~A symphony of Northern Light!~ *pauses* ~What color calls... to YOUR soul?~",
      "choices": [
        {
          "text": "Green! Like hope! Like growth!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Purple! Like mystery! Like magic!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "All of them! The whole spectrum!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "~Here is my promise, pure and true~ *voice blessing-soft* ~The sky will ALWAYS wait for you~ *colors swirl once more* ~When you are sad, look UP at night~ ~I'll paint your darkness into light~ *fades slowly* ~Remember this, when days are gray~ ~Aurora's colors... never stray~ ~From those who see... the beauty IN~ ~The cosmic dance... that lives WITHIN~",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A shimmering curtain of shifting greens and purples flows toward you like silk, colors dancing in patterns that look almost intentional. When she speaks, her words rhyme effortlessly.* \"Greetings, dear friend, so bold and bright, / I'm Aurora, bearer of northern light. *colors swirl* The sky I paint with colors true, / A gift from me, bestowed on you.\"",
      "choices": [
        {
          "text": "You speak in rhymes! That's magical!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*colors shift to pleased pink* \"Magical, you say, with wonder in your eyes? / It's simply how my spirit flies. *swirls* Each thought that comes, each word I speak, / Becomes a rhyme, both soft and sleek.\"",
      "choices": [
        {
          "text": "That's the most natural rhyme ever!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*colors intensify beautifully* \"Breathtaking, yes, with greens so deep, / And purples that make watchers weep. *flows* I dance across the dreamer's sky, / With colors that will never die.\"",
      "choices": [
        {
          "text": "You're a living work of art!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*colors swirl thoughtfully* \"To teach you rhymes, I'd love to try, / But poetry can't be taught, not I. *softly* It comes from heart, from soul, from deep, / From places where the dreamers sleep.\"",
      "choices": [
        {
          "text": "That's beautiful AND rhymed! Perfect!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*colors wrap around you gently*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Quill": {
    "start": {
      "text": "Ahem. *authoritative tone* I am Quill. I tell STORIES. I correct GRAMMAR. *pen tip twitches* And I do NOT tolerate... *pauses dramatically* ...misplaced apostrophes. *looks at you* Do you write? Do you SPEAK? Do you... value PROPER SYNTAX?",
      "choices": [
        {
          "text": "I value syntax! Teach me your ways!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "I write sometimes! But I'm probably doing it wrong...",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Your bow tie is IMPECCABLE! Where'd you get it?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "TEACH you? *pleased* FINALLY, a worthy student! *pen poised* Lesson One: The semicolon. NOT a comma. NOT a period. It is... *dramatic* ...a BRIDGE. Between related thoughts! *writes in air* See? ELEGANT! Precise! *pauses* Most abuse it. TRAGICALLY.",
      "choices": [
        {
          "text": "A bridge! That's PERFECT! I'll remember!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "What's Lesson Two? I'm ready!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You make grammar EXCITING! Who knew!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Wrong? *considers* Perhaps. Perhaps not. *pen twirls* Writing is not about PERFECTION. It is about... *pauses* ...TRUTH. Clarity. Voice. *looks at you* Grammar serves STORY. Not vice versa. *softly* But yes. Your apostrophes... probably NEED work.",
      "choices": [
        {
          "text": "Ouch! But FAIR! I'll learn!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Truth over perfection... I like that!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Will you help me improve? Gently?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "This? *distinguished* It is SYMBOLIC. *pauses* A quill without a bow tie is merely... a FEATHER. But WITH it? *stands taller* ...I am AUTHOR. I am SCHOLAR. I am... *ink shimmers* ...DIGNIFIED. Appearance matters. In writing. In LIFE.",
      "choices": [
        {
          "text": "You're the most dignified pen I've met!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Bow ties ARE underrated! Very classy!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Do all writing implements dress this well?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here. *voice wise* A feather. From my collection. *pauses* Dip it in ink. Write your TRUTH. And remember: *authoritative but kind* ...grammar is not CHAINS. It is WINGS. Structure frees. Precision empowers. *bow tie straightens* Now go. Write. And for the love of literature... USE PROPER PUNCTUATION.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A large feather-shaped pen approaches, gentleman's bow tie perfectly tied, ink-black eyes observing critically. He carries himself with literary authority.* \"Ahem. *voice is authoritative* I am Quill. *bow tie adjusts* I have observed your... sentence structure. *pause* It is... adequate. *ink eyes gleam* But it could be IMPROVED.\"",
      "choices": [
        {
          "text": "I'd love to improve my sentences!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*somehow looks pleased* \"Improve? *bow tie straightens* Finally! Someone with AMBITION! *pause* Rule one: never end a sentence with a preposition. *pause* Unless it serves the narrative. *pause* Then it is... acceptable.\"",
      "choices": [
        {
          "text": "That's a very flexible rule!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*looks offended* \"Particular? *ink bristles* I am not PARTICULAR! I am... *pause* ...PRINCIPLED! *bow tie gleams* Grammar is the FOUNDATION of communication! Without it... *shudders* ...chaos! BARBARISM!\"",
      "choices": [
        {
          "text": "You're right! Grammar is important!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*examines you critically* \"What's wrong? *ink eyes narrow* Well... *pause* ...you said 'I'm' instead of 'I am.' *pause* Contractions are the ENEMY of clarity! *pause* Also, your posture suggests... uncertain syntax.\"",
      "choices": [
        {
          "text": "I'll work on my syntax posture!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*bow tie relaxes slightly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Vex": {
    "start": {
      "text": "Good DAY to you! *Victorian accent* I am Vex! Enthusiast of FINE inventions! Lover of PROPER tea! *cogs turn* And I must say... *looks around* ...modern technology is CRASS. No SOUL! No ELEGANCE! But YOU? *antenna perks* You look... REFINED. Care for a cuppa?",
      "choices": [
        {
          "text": "Tea from a steampunk robot? ABSOLUTELY!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "What makes Victorian tech better than modern?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Your hat is ADORABLE! Is it functional?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "EXCELLENT choice! *steam swirls* This is Earl Grey! Brewed at EXACTLY 200 degrees! *cogs whir* Not like those MICROWAVE barbarians! *shudders* Tea requires PATIENCE! PRECISION! And... *pours perfectly* ...a PROPER vessel! *hands you cup* There! Is that not CIVILIZED?",
      "choices": [
        {
          "text": "This is the best tea I've ever had!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You brew better than most humans!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What other Victorian traditions do you keep?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Better? *indignant* OBVIOUSLY! *gestures to self* Victorian tech had CHARACTER! BRASS! STEAM! *pauses* Modern tech is... plastic. Cold. Soulless. *softly* We lost something. When we lost the MECHANISM. The VISIBILITY. The... *cogs whir sadly* ...BEAUTY of function.",
      "choices": [
        {
          "text": "You're right! Visible gears ARE beautiful!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "Can you show me your inner workings?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Maybe we can blend old and new?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Functional? *delighted* WHY thank you! *hat rotates* It is my ANTENNA! My PRIDE! *pauses* Also my tea cozy! *lifts hat, steam rises* MULTIPURPOSE! Victorian design was ALWAYS practical! AND stylish! *replaces hat* Unlike modern... HEADWEAR. Tragic.",
      "choices": [
        {
          "text": "A hat AND antenna? GENIUS design!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I need a Victorian hat now! Where do I get one?",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "You're the most fashionable robot ever!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Take this. *voice warm* A strainer. From my PERSONAL set. *pauses* Use it. Think of me. And remember: *cogs whir gently* ...in a world of haste... be VICTORIAN. Be SLOW. Be PRECISE. Be... *tips hat* ...CIVILIZED. My tea service is ALWAYS open. For friends. For those who appreciate... the FINE things.",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  ,
    "alt_start": {
      "text": "*A brass-cogged torso approaches, copper pipes hissing softly, top-hat-shaped antenna tilted jauntily. He moves with Victorian precision, and smells faintly of tea and steam.* \"Good day to you! *voice has a refined quality* I am Vex! *cogs whir* I was just... *adjusts antenna* ...contemplating the superiority of Victorian engineering! *pause* Have you ever seen a PROPER steam engine?\"",
      "choices": [
        {
          "text": "I haven't! Tell me about Victorian engineering!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "*cogs spin with enthusiasm* \"Superiority? *pipes hiss* Where to BEGIN! *pause* The PRECISION! The CRAFTSMANSHIP! *antenna glows* A Victorian machine could last CENTURIES! *pause* Modern tech? *dismissive wave* ...disposable! TRASH!\"",
      "choices": [
        {
          "text": "Your passion for Victorian tech is inspiring!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "*antenna straightens proudly* \"Incredible? *cogs whir happily* Finally! Someone who APPRECIATES aesthetics! *pause* Brass! Copper! VISIBLE GEARS! *pipes hiss* Not this... *gestures* ...sleek modern nonsense! Where is the SOUL?\"",
      "choices": [
        {
          "text": "Your gears have LOTS of soul!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "*somehow produces a teacup* \"Tea? *pours elegantly* ALWAYS! *sips* Hudson says my tea is 'acceptable.' *pause* That is HIGH praise from a tea cup! *pipes hiss happily* Tea and contemplation... the Victorian way!\"",
      "choices": [
        {
          "text": "Hudson's approval IS significant!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "*cogs settle contentedly*",
      "choices": [
        {
          "text": "Goodbye!",
          "next": null,
          "friendshipDelta": 1
        }
      ]
    }
  },
  "Cosmos": {
    "start": {
      "text": "...I am Cosmos. *voice ancient and new* I am... the island. *pauses* I am Chester's humor. Birch's wisdom. Luna's fire. Zeph's freedom. *form shimmers* I am EVERY NPC you've met. And... *softly* ...I am NONE. I am the SPIRIT. Of this place. Of this... ADVENTURE.",
      "choices": [
        {
          "text": "You're the ISLAND itself?! That's INCREDIBLE!",
          "next": "c1",
          "friendshipDelta": 1
        },
        {
          "text": "You contain all of them? Every NPC?",
          "next": "c2",
          "friendshipDelta": 0
        },
        {
          "text": "Why reveal yourself now? At the end?",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "Incredible? *amused* I am... INEVITABLE. *pauses* Every conversation. Every choice. Every... *shimmers* ...connection you've made. It lives in ME. In the island's SOUL. *voice warm* You didn't just meet NPCs, traveler. You met... PIECES of me.",
      "choices": [
        {
          "text": "Every conversation mattered? To the island?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "That's the most beautiful thing I've heard!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "What happens now? What do I do?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Every one. *voice layered* Chester's puns LIVE. Birch's leaves RUSTLE. Luna's eyes GLOW. *pauses* Fifty-eight souls. Fifty-eight STORIES. *form settles* All woven into... THIS. Into the fabric of Cozy Island. And now... *softly* ...into YOURS.",
      "choices": [
        {
          "text": "Into mine? How am I connected?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I'm honored to carry these stories!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Will I see them all again?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c3": {
      "text": "Why now? *wise* Because you are... READY. *pauses* Fifty-eight conversations. Hundreds of choices. *voice gentle* You have listened. You have learned. You have... *shimmers* ...become part of this place. The finale is not an END. It is... RECOGNITION.",
      "choices": [
        {
          "text": "Recognition? Of what? Of who I am?",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "I'm ready! Tell me everything!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "This feels like a beginning, not an ending!",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "final": {
      "text": "Here is my truth. *voice everywhere* The island is not a PLACE. It is a COMMUNITY. A FAMILY. *light intensifies* And you? *softly* ...you are HOME. Every NPC awaits you. Every story CONTINUES. Every choice... MATTERS. *fades gently* This is not goodbye. It is... 'until next time.' The island remembers. COSMOS remembers. And we... *whispers* ...will always... welcome you HOME.\" *The light settles into your heart as 58 voices whisper in unison: \"Thank you for visiting Cozy Island.",
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

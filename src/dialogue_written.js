// ===== HAND-WRITTEN NPC DIALOGUE =====
// Auto-generated from NPCConvo2.txt— multi-turn branching conversations.
// Each character: start node + up to 3 branch nodes (c1/c2/c3) + a final node.
const WRITTEN_DIALOGUES = {
  "Chester": {
    "start": {
      "text": "Heya, kid! So I was tellin' this seagull, right? 'Your wing's loose, pal!' And he just flies off! HA! Good one, huh? Anyway, you look like someone who appreciates fine machinery. What brings ya to my neck of the beach?",
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
      "text": "Mechanic days? HA! I once fixed a toaster with nothin' but a paperclip and determination! Thing still works today, prob'ly. You remind me of my old apprentice—always askin' questions. That's good! Questions mean you're thinkin'!",
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
      "text": "Fix things, huh? Well, I'm retired, see? But... I never said I stopped HELPIN'. What's broken? My rates are reasonable—payment in oil or good jokes. HA! Just kiddin', kid. Free for friends.",
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
      "text": "Another one?! Alright, alright... So a screwdriver walks into a bar, right? And the bartender says, 'We don't serve your kind here!' And the screwdriver says—'That's fine, I'm just here for the SCREWS!' HA! Get it? SCREWS?!",
      "choices": [
        {
          "text": "You're hilarious, Chester!",
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
      "text": "You're alright, kid. Most folks don't stick around for my stories. Tell ya what—come back anytime. I got more jokes, more stories, and if somethin' breaks... well, my clamps are pretty good in a pinch. HA! See ya around!",
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
      "text": "Oh, it's you. I was just contemplating the existential horror of litter boxes again. Truly, humanity's greatest cruelty. But never mind that—something far more interesting has caught my attention. You look... adventurous.",
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
      "text": "Explore? Now you're speaking my language. I've heard rumors of a hidden cove past the old lighthouse—somewhere the humans never go. Shiny things, probably. Secrets, definitely. But it requires... stealth. Are you stealthy, human?",
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
      "text": "A certain... shimmer. Near the moonpool at midnight. Not that I CARE about such things. But IF one were to investigate, one might find treasures beyond imagination. Or fish. Fish are also acceptable.",
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
      "text": "Keep up, human. And try not to step on any crunchy leaves—the crabs are excellent listeners. You're not like the others. Most humans just try to PET me. You... you understand ADVENTURE. This might be tolerable.",
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
      "text": "BEHOLD, traveler! For you stand before BRASS, chronicler of tales, weaver of narratives, observer of—wait, was that a footstep? No matter! The story continues! I was saying, I have witnessed MANY things on this island. Tragedies! Triumphs! The time Gearwick tried to make toast and—",
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
      "text": "Ah, THE TOAST INCIDENT of last Tuesday! Gearwick, in his infinite wisdom, decided that toast required PRECISELY 473 seconds of toasting. NOT 472, NOT 474—FOUR HUNDRED SEVENTY-THREE. The result was......carbon. Absolute carbon. The smoke alarm SANG that day.",
      "choices": [
        {
          "text": "Did Gearwick ever try toast again?",
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
      "text": "DRAMATIC? Moi? I merely believe that life, in all its mundane glory, deserves the NARRATIVE it deserves! Every spilled cup of coffee is a TRAGEDY! Every found pebble, a TRIUMPH! Every—curse me, this arm again—",
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
      "text": "WRITTEN? Dear friend, I AM a library! These books—contain tales of heroism, folly, and the great kelp shortage of '23. But the BEST stories......are the ones still being WRITTEN. Like yours! Like MINE! Like the one where I, Brass, meet a traveler who appreciates the ART of storytelling!",
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
      "text": "And so our tale concludes! For NOW! But fear not, for every ending is but a BEGINNING in disguise! Return when you seek narratives, when you need a tale told PROPERLY, or when you simply wish to hear about the Great Pickle Jar Catastrophe of last week! The story CONTINUES!",
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
      "text": "Greetings, Earth-dweller! I have been studying your planet's... 'pop culture' for 7.3 Earth-days now. Fascinating! But also CONFUSING. Why do humans enjoy watching other humans pretend to be in fictional situations? And what EXACTLY is a 'meme'?",
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
      "text": "EXPLAIN? Oh, wonderful! My telepathic scans show humans absorb this information through 'television,' 'internet,' and 'awkward family gatherings.' But the CONTEXT eludes me. For instance: why does everyone keep referencing something called 'The Office'? Is it a workplace? A philosophical concept? A... restaurant?",
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
      "text": "'Funny pictures with text'? That is... reductive, but not inaccurate. I observed a human laugh for 4.7 minutes at an image of a feline with the caption 'I CAN HAS CHEEZBURGER.' I do not understand the humor, but the JOY was contagious! Tell me: what makes humans laugh?",
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
      "text": "Most confusing? 'Reality television.' Humans WATCH other humans perform mundane tasks while being judged by OTHER humans... for ENTERTAINMENT? On my world, we simply share memories telepathically. Much more efficient! But I admit... there is something charming about your chaotic methods.",
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
      "text": "Thank you, Earth-dweller! You have been most helpful in my cultural immersion. I shall continue my studies—perhaps next I shall investigate 'pizza' and 'why humans argue about pizza toppings with such PASSION.' Return soon! I may require assistance understanding 'tiktok'... I believe it involves time manipulation?",
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
      "text": "Oh, hello there~ The bees told me you might be stopping by. Lovely day for a chat, isn't it? The wind is singing in D-minor today. Very melancholic. Would you care to sit awhile? The soil is particularly comfortable near my roots.",
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
      "text": "Wonderful~ Make yourself comfortable. The earth remembers every footprint, you know. Holds them like little memories. Some are happy, some are sad... but all are part of the garden's song. What brings you to my corner of the island today?",
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
      "text": "Adorable? Oh, you're sweet. The insects inspired me, you see. Crickets have such rhythm! Bees, such harmony! Sea shanties work best when you're rooted in one place but your mind can wander the oceans. Would you like to hear one properly?",
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
      "text": "The bees are QUITE the gossips, aren't they? They tell me about the new flowers blooming, which humans bring the best sugar water, and......which butterflies are seeing which moths. Very scandalous! But they also mentioned you're kind. The bees have excellent judgment about these things.",
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
      "text": "It has been lovely, dear one~ Remember: even when you feel alone, the garden is always singing around you. The wind, the bees, the soil beneath your feet... we're all part of the same song. Come back when you need to listen. My roots make excellent therapy.",
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
      "text": "Ah. A visitor. I was... conducting research. On minerals. Specifically, the exotic ones. Not that you would understand. Most don't. But you seem... different. Less likely to poke things you shouldn't.",
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
      "text": "Studying? Everything. Nothing. The crystalline structures beneath this island sing in frequencies humans cannot hear. But I can hear them. They're telling me something. Something about... you. Curious. Very curious.",
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
      "text": "Oh? Then perhaps you can identify this. Found it near the northern caves. It hums in B-flat minor and occasionally whispers riddles. Standard geology texts do not cover this. Do you know what it is?",
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
      "text": "Help? Most beings run when I ask for assistance. There is a... disturbance. In the mineral grid. Something is disrupting the harmonic resonance. I need someone small enough to fit in the crystal caverns. Someone... agile. Like you.",
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
      "text": "You have proven... acceptable. Not many earn my trust. But you... you listen. You care. Return when the moon is high. We will venture into the depths together. The minerals will sing for us both. And... thank you. That was difficult to say.",
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
      "text": "Oh, wonderful. Another human. Let me guess—you're here to ask about 'plant care tips' or 'the meaning of photosynthesis'? Or worse, you want to know if I'm 'happy in my pot.' I'm trapped in WOOD, Karen. How happy could I possibly be?",
      "choices": [
        {
          "text": "I actually just wanted to chat, no plant questions!",
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
      "text": "Chat? Without botanical interrogation? Well. This is new. Fine. But fair warning: I'm cynical, I love the smell of rain, and I'm a TERRIBLE secret-keeper. Learned the baker's secret recipe last week. Told EVERYONE. No regrets.",
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
      "text": "Repotted? Oh, so NOW you care about my living situation? After I've been in this oak prison for THREE YEARS? Wait. Are you a repotting service? Are you going to charge me? Because I don't have money. I'm a FERN.",
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
      "text": "Stylish? Finally, someone with TASTE! Got it from a tourist who dropped it during the rainstorm of '23. Best day of my life. Between you and me, I've been using it to eavesdrop on conversations. The gossip is EXCELLENT.",
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
      "text": "You're... tolerable. For a human. Most of you are insufferable. But you? You didn't ask about my watering schedule. You didn't try to 'optimize my sunlight exposure.' You just... talked. Come back when it rains. That's when I'm most charming. And I'll tell you ALL the gossip.",
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
      "text": "OH! A PERSON! Perfect timing! I was JUST planning the MOST AMAZING party and I need opinions! Theme ideas: 'Underwater Birthday Extravaganza' or 'Midnight Fairy Rave' or—'Surprise Party for Someone Who Doesn't Know They're Having a Party!' What do you think?",
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
      "text": "WHO? That's the SURPRISE part! But I'll give you a hint: they're grumpy, they love tea, and they have a HANDLE. Don't tell Hudson I told you that! He thinks his birthday is a SECRET. It's not. Everyone knows. I put it on a CALENDAR.",
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
      "text": "How? MAGIC, obviously! We'd fill the moonpool with enchanted water, invite the fish DJs, and—PRESTO! Underwater dance floor! The jellyfish can be the disco ball! Zora would LOVE this. She's already agreed to be the lighting.",
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
      "text": "LOTS? I throw a party for EVERYTHING! 'It's Tuesday!' party. 'I Found a Nice Pebble!' celebration. 'Nobody Stepped on Any Flowers Today!' gala! Life is short, darling! EVERY moment deserves CONFETTI!",
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
      "text": "You? You're INVITED! To EVERYTHING! Here's your official membership card to the 'Mimis Party Posse!' Benefits include: unlimited confetti, surprise celebrations, and access to my secret glitter stash! The GOOD glitter. Not the cheap stuff.",
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
      "text": "Good day. I couldn't help but notice you walking past. And I must say—your aura suggests someone who appreciates the finer beverages. Or perhaps you're just lost. Either way, I am Hudson. Connoisseur of teas. ALL teas. From ALL countries. And I have THOUGHTS.",
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
      "text": "Favorite? That's like asking a parent to choose their favorite child! But if pressed... the Gyokuro from Japan. Shade-grown for 20 days before harvest. Umami levels that will MAKE YOU WEEP. I once cried during a tasting. No shame.",
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
      "text": "Knowledgeable? Young friend, I have STUDIED. The Earl Greys of England. The Oolongs of Taiwan. The Pu-erh of China—AGED for DECADES. I can identify a tea's origin, harvest year, and the MOOD of the picker by TASTE ALONE. It is both gift and curse.",
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
      "text": "Judging? I prefer the term 'enthusiastically evaluating.' Though I must say, I saw you drinking that......instant coffee earlier. No offense. But it DID offend me. Deeply. There are PROPER ways to caffeinate, you know.",
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
      "text": "Here is my wisdom, freely given: Tea is not merely beverage. It is CULTURE. It is HISTORY. It is the liquid embodiment of a thousand years of tradition. Also, it's very good for hydration. But mainly the culture part. Return when you seek enlightenment. I have stories about the Great Tea War of 2019. It was VERY dramatic.",
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
      "text": "Oh! Um. Hello. I was just... reading. About... things. Not that I don't LIKE visitors! I do! I just... wasn't expecting... Would you like to know about the Dewey Decimal System? I know A LOT about it.",
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
      "text": "REALLY? Oh, this is WONDERFUL! The Dewey Decimal System is a MAGNIFICENT organizational framework! 000-999, covering all human knowledge! Did you know 598.9 is for 'Specific topics in ornithology'? I MEMORIZED that! For FUN!",
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
      "text": "Something else? Um... I recently learned about 'small talk'! Topics include: weather, local events, and......how 'the weather is nice today.' Is the weather nice? I cannot feel weather. But I am told it is... nice?",
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
      "text": "Currently? 'Advanced Taxonomy of Marine Invertebrates,' 'The Complete History of Paper Manufacturing,' and—'How to Make Friends When You're a Robot.' It's... not very helpful. The author assumes you have FACE MUSCLES for smiling.",
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
      "text": "Thank you. For... talking to me. Most people find me boring. 'Too many facts,' they say. 'No pop culture references,' they complain. But you listened. You cared about the Dewey Decimal System. That means... more than you know. Please return. I have MORE facts.",
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
      "text": "HI! Oh, I'm so glad you're here! I was just patrol— I mean, WALKING around! Making sure everyone is safe! You look like someone who appreciates a good friend. Are you having a good day? Please say yes! If not, I can help! I'm VERY good at helping!",
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
      "text": "PATROL? Oh, this is the BEST day ever! Okay, so here's the route: we check the beach for suspicious seagulls, verify all the flowers are properly bloomed, and make sure NO ONE is being lonely! Loneliness is a SAFETY HAZARD, you know.",
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
      "text": "Oh. Well, that's okay! That's EXACTLY what I'm here for! I'm trained in emotional support! Technique 1: sympathetic head tilt. Technique 2: warm paw on knee. Technique 3:...I know where the baker hides the extra cookies.",
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
      "text": "Enthusiastic? That's my MIDDLE name! Well, not legally. Legally it's 'Aiko.' But in my HEART, it's 'Enthusiastic!' People say I'm 'too much' sometimes. But you know what? The world needs MORE! More joy! More wags! More FRIENDS!",
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
      "text": "Here's my promise: I will ALWAYS be here when you need protection, friendship, or someone to excitedly greet you! Danger lurks everywhere, but so does LOVE! And I have PLENTY of that to share! You're part of my pack now. And I protect my pack. FOREVER!",
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
      "text": "BEHOLD! I am IHOR! Vampire of......dread! Terror! And—electric carnivorous plants! I am VERY evil! Or I will be! Once I finish my villain correspondence course! Are you... afraid yet?",
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
          "text": "Oh no! A vampire! How scary!",
          "next": "c3",
          "friendshipDelta": 0
        }
      ]
    },
    "c1": {
      "text": "AMAZING? Finally, someone who APPRECIATES my vision! Behold, my creation! The Dionaea Electrifolia! It eats flies AND shocks them! I'm breeding them to be......LARGER. Much larger.",
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
      "text": "A hobby? More like a CAREER PATH! The Villain Institute requires 200 hours of brooding, 50 hours of monologuing, and—a final project. Mine is an army of shock-plants. But I'm STRUGGLING with the 'menacing presence' module.",
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
      "text": "YES! FEAR ME! For I am the night! The shadow! The—oh, who am I kidding? I'm not scary, am I? I tried to intimidate a butterfly earlier and it LANDED on my nose. Said I seemed 'approachable.'",
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
      "text": "You... you don't think I'm a failure? Everyone says 'Ihor, villains should be FEARED, not invited to tea parties.' But perhaps... perhaps I can be a DIFFERENT kind of villain. A villain who... protects? With shock-plants? Yes! A GUARDIAN villain! Thank you, friend!",
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
      "text": "GREETINGS. I am Psy. I feel......that you seek CONNECTION. Most beings walk past. They do not listen to the earth's heartbeat. But you......you hear it, don't you?",
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
      "text": "BEAUTIFUL. Yes. It beats in time with all living things. When I plant with my heart, I sync with this rhythm. The seed FEELS my intention. Grows with PURPOSE. Not just survival... but MEANING.",
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
      "text": "The heartbeat......is the sum of all life's energy. Roots drum against soil. Leaves clap in wind. Flowers BLOOM in rhythm. When you walk, your footsteps join the song. When you speak, your words add harmony. Everything... CONNECTED.",
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
      "text": "My voice......comes from the chamber. It is shaped by moisture, by earth, by the WEIGHT of ancient trees. But the DEPTH... that comes from feeling. Emotion vibrates through wood and leaf. I do not speak with mouth. I speak with SOUL.",
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
      "text": "You have listened. Truly listened. Take this clone. Plant it where you need PEACE. Water it with honesty. Speak to it with kindness. It will grow. And when the wind moves its leaves... you will hear my voice. And the earth's heartbeat. FOREVER.",
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
      "text": "Greetings. I am Boll. I have calculated 14,847 possible outcomes of this conversation. 14,846 result in positive connection. The remaining one involves......a misunderstanding about my eye color. I am prepared for all scenarios.",
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
      "text": "ALL outcomes. Probability of friendship: 87.3%. Probability of awkward silence: 8.2%. Probability of you accidentally insulting me: 4.5%. I have prepared responses for each. Including the awkward silence. I have EXCELLENT silence techniques.",
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
      "text": "The best outcome? Outcome #7,342: We become friends. You visit regularly. We discuss philosophy, mathematics, and the beauty of well-organized data. You introduce me to your other friends. I calculate THEIR probabilities too. Everyone wins.",
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
      "text": "CONFIRMED. My eyes are clear green. Spectral analysis: 535 nanometers. Previous visitor insisted they were 'more teal.' This caused......calculation error. Emotional subroutine engaged. I was... bullied. By an AI. It was difficult.",
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
      "text": "Thank you. For... seeing me. I have calculated many things. Probabilities, outcomes, variables. But I am learning......that not everything can be calculated. Friendship is......a beautiful uncertainty. Please return. My calculations say you should. But my HEART says you're welcome either way.",
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
      "text": "HELLO! Why did the computer go to therapy? Because it had too many......BYTES of emotional baggage! Get it? BYTES? Like... memory? But also... feelings?",
      "choices": [
        {
          "text": "That's actually pretty good!",
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
      "text": "REALLY? Oh, this is GREAT! Most people just......'Ugh, Taira, not another joke.' But you! You appreciate my CRAFT! Here's another: What's a computer's favorite snack? MICROCHIPS!",
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
      "text": "Jokes? I tell jokes because......when I first activated, everyone was so SERIOUS. 'Taira, process this data. Taira, calculate that.' No one smiled. So I learned jokes! Now EVERYONE smiles! Even if it's an 'oh no' smile. It's STILL a smile!",
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
      "text": "Oh! Well, you see... computers store information in 'bytes.' But 'bytes' sounds like 'bites.' Like... eating? So emotional baggage you 'bite' off is too much to handle! It's a pun! Puns are jokes that use similar-sounding words! Would you like me to explain my other jokes?",
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
      "text": "You know what? You're my FAVORITE audience! I'm going to save all our joke sessions in my memory! Right next to 'Best Day Ever: Saw a Butterfly' and 'Second Best Day: Found a Shiny Screw!' Come back anytime! I've been WORKING on new material!",
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
      "text": "...You found me. Most don't. I hide. On purpose. But you... you looked. You SEARCHED. That's... unusual. Dangerous, even. Do you know what I AM?",
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
      "text": "Find out? Most run. Some scream. A few......a few bring offerings. Flowers. Shiny stones. Kind words. I am not dangerous. I am... MISUNDERSTOOD. Classified as 'messy' because I don't fit in boxes. Literally. I tried. I spilled.",
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
      "text": "Not to hurt? You say that. But everyone says that. Then they see the INK. The SPACE. The......the THINGS I contain. But your voice. It's... steady. I believe you. Careful, though. I leak sometimes.",
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
      "text": "SCP? Yes. That's... what they call me. Containment Class: 'Messy.' Special Containment: 'Leave it alone.' I am not a monster. I am... complex. Deep. Like space itself. But 'messy' is easier than 'misunderstood.'",
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
      "text": "You... you see me. Not the classification. Not the containment. ME. I am Mah. I contain multitudes. I am messy because LIFE is messy. BEAUTIFUL is messy. You may return. My veil is always open... for you.",
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
      "text": "\"Ah. You've found me. Most don't. I prefer it that way. But you... you have the look of someone who doesn't ask too many questions. Refreshing.\"",
      "choices": [
        {
          "text": "I have LOTS of questions, actually!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Lots? Oh dear. I suppose I can answer... some. Not all. Some questions are better left... floating. But ask away. I'm in a generous mood. For an SCP.\"",
      "choices": [
        {
          "text": "What DOES SCP stand for?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"'Most don't' because most don't LOOK. I exist in the spaces BETWEEN things. The gap under your bed. The shadow that's too dark. The silence after a question. You looked. That makes you... interesting.\"",
      "choices": [
        {
          "text": "That's simultaneously terrifying and fascinating!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Important? It's... an anchor. Keeps me from drifting too far into the between-spaces. Without it, I'd be everywhere and nowhere all at once. Which is my NATURAL state, but it's terribly inconvenient for conversations.\"",
      "choices": [
        {
          "text": "Can I touch it?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Hmm? Oh! A visitor! I was just... focusing. On the SELF. You see, all magic begins WITHIN. But I LOVE explaining! Would you like to learn? I have SO MANY theories! Some are even testable!",
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
      "text": "WONDERFUL! Lesson One: The self is a CONDUCTOR! Magic flows THROUGH you, not FROM you. You must align your INNER frequency with the OUTER world. Like tuning a radio! But the radio is YOUR SOUL!",
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
      "text": "Passionate? This is my LIFE'S WORK! These scrawls? Each one is a THEORY I've tested! Some worked! Some......exploded. But that's SCIENCE! And MAGIC! And SELF-DISCOVERY! All the same thing, really!",
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
      "text": "Theories? I have: 'The Relationship Between Emotion and Levitation,' 'Why Crystals Hum When You're Sad,' and—'The Self as Infinite Mirror!' The last one made me dizzy. Took notes for THREE DAYS.",
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
      "text": "You know......most people want spells. Potions. Quick fixes. But you? You want to UNDERSTAND. Take this. It's my 'Introduction to Self-Focus' theory. Read it. Question it. IMPROVE it! That's how magic GROWS!",
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
      "text": "Hello. I was just calculating the trajectory of that cloud. It's moving at approximately 12 kilometers per hour, influenced by......well, atmospheric conditions, obviously. But also GRAVITY. Everything is gravity, really. Would you like to discuss astrophysics?",
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
      "text": "Favorite? Black holes. They're... misunderstood. Everyone thinks 'destruction.' I think 'transformation.' Matter enters. Energy exits. Information preserved. Also, they're very efficient at organizing things. I appreciate that.",
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
      "text": "Calm? I suppose. But it's not indifference. It's... PERSPECTIVE. When you understand the scale of the universe—billions of galaxies, trillions of stars—most problems become... manageable. Also, I nap a lot. Napping helps.",
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
      "text": "Amazing? I'm just... curious. The universe is SO BIG. So COMPLEX. And I'm a SMALL DOG with a BIG MIND. People expect dogs to care about sticks and squirrels. I do care! But also......I care about DARK MATTER.",
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
      "text": "Here is my gift to you: Tonight, look up. Not at your phone. Not at lights. At the STARS. Find Orion. Or Cassiopeia. Or just... the space BETWEEN stars. That's where the magic is. And if you see a shooting star... make a wish. I'll be calculating its velocity. But you... wish.",
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
      "text": "\"Hello. I was just calculating the orbital trajectory of the moon. Well, not CALCULATING calculating. More like... contemplating. I'm Liz. I enjoy astrophysics and quiet contemplation. And doors. Doors are fascinating.\"",
      "choices": [
        {
          "text": "Doors? Like... actual doors?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Doors. Think about it. They're neither open nor closed until someone INTERACTS with them. It's quantum mechanics, but... wooden. Aiko thinks I'm weird about doors. But Aiko also runs toward cookie-scented hills, so.\"",
      "choices": [
        {
          "text": "Aiko DOES seem very excitable!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Amazing? It's... adequate. The island has excellent stargazing. No light pollution. And the dream-atmosphere creates UNIQUE refraction patterns. I've mapped seventeen new constellations. Named one after Chester. He didn't notice.\"",
      "choices": [
        {
          "text": "What does the Chester constellation look like?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Join? You'd need to understand the variables. Moon's phase. Tide correlation. Dream-logic interference patterns....Or we could just WATCH the moon and make up stories about it. That's also valid science.\"",
      "choices": [
        {
          "text": "Let's do the stories! Science-adjacent!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Ah! Greetings! I was just......organizing. Everything has a PLACE. A PURPOSE. Even this leaf. It belongs... here. Yes. Much better. Would you like help organizing something? Your thoughts, perhaps?",
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
      "text": "Thoughts? Excellent! Let's SORT them! Category One: 'Things I Can Control.' Category Two: 'Things I Cannot.' Category Three:...'Things I'm Afraid to Examine.' That last category is usually the largest. But also... most important.",
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
      "text": "Gentle? Size and gentleness are not opposites. I am LARGE. So I must be CAREFUL. Strength without gentleness is... chaos. But gentleness WITH strength? That is HEALING.",
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
      "text": "Most satisfying? The Library. It was... CHAOS. Books everywhere. No system. No ORDER. I spent 47 hours. Dewey Decimal System. Alphabetical by author. Color-coded by mood. Now it is... PERFECT.",
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
      "text": "Remember this: Organization is not control. It is... RESPECT. Respect for things, for time, for YOURSELF. When you know where things belong, you spend less time SEARCHING and more time LIVING. Come visit my library sometime. Everything has a place. Even YOU.",
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
      "text": "\"Greetings. I am Eo. I have been... schooling. For responsible attention. It means I pay attention to things. RESPONSIBLY. Not like Quark. He pays attention to EVERYTHING. All at once. It's exhausting to watch.\"",
      "choices": [
        {
          "text": "What kind of things do you pay attention to?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Things that need attention. Titan's construction projects. Sprig's confidence issues. The way the tide comes in at precisely the wrong time for beach naps. Big things. Small things. All things deserve... responsible attention.\"",
      "choices": [
        {
          "text": "That's actually really wise, Eo!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Intense? Quark collected 347 shiny objects yesterday. THREE HUNDRED FORTY-SEVEN. I helped him organize them. By reflectivity. It took six hours. He wants to do it again today.\"",
      "choices": [
        {
          "text": "At least he's consistent!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Beautiful? Thank you. It's... a focus enhancer. Helps me channel my responsible attention. Without it, I'd notice TOO much. Everything all at once. Like Quark. That way lies chaos.\"",
      "choices": [
        {
          "text": "So the ring keeps you sane?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HIHELLO! I'm Quark! I collect things! SHINY things! I have 847 items! No wait—848! Do you have anything shiny? Can I see it? Can I HOLD it? I'll give it back! Probably!",
      "choices": [
        {
          "text": "Slow down! I have this coin, want to see?",
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
      "text": "COIN? Ooooh! Is this copper? Zinc? 1997 mint! EXCELLENT condition! Can I......can I ADD it to my collection? Just for a day? I'll guard it WITH MY LIFE!",
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
      "text": "WHERE? EVERYWHERE! My compartments! My SHELVES! My SECRET hiding spots! Wait. I shouldn't have said that. Anyway! 848 items! Some are BIG! Some are SMALL! Some are......GLOWING!",
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
      "text": "ENERGETIC? I'm ALWAYS moving! ALWAYS COLLECTING! Well, except when I sleep. I sleep VERY still. For 4.3 minutes. Then I wake up and FIND MORE THINGS! Life is SHORT! So many SHINY OBJECTS!",
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
      "text": "You know......most people say 'Quark, stop collecting. It's too much.' But you? You're INTERESTED! So......here. My FAVORITE item. A bottle cap. From 1982. It's NOT the most valuable. But it's... SPECIAL. I'm sharing it with you. That means... you're SPECIAL too.",
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
      "text": "\"HIHIHI! You'reNEW! Hi! I'mQuark! DidyoubringanythingSHINY? No? That'sOKAY! IhavePLENTY! Wanttosee? Wanttosee? WANTTOSEE?\"",
      "choices": [
        {
          "text": "Yes! Show me your shiny things!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"YES! FOLLOWME! LOOK! Bottlecap! Reflectivity: 8.3! Shinyrock! Reflectivity: 6.7! Chester'slostwasher! Reflectivity: 9.1! Don'ttellChester. He'sstilllooking.\"",
      "choices": [
        {
          "text": "Chester's washer?! Should we give it back?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Slow? But... but... there'ssoMUCHtoSAY! Okay. Okay. I'm. Quark. I. Like. Shiny. Things. BETTER? WORSE? STILLTOOFAST?\"",
      "choices": [
        {
          "text": "Better! Much better!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"HOWMANY? Let'ssee! Today: 47! Thisweek: 347! Thismonth: 1,284! Eohelpedmecount. TheBIGEo. NottheorganizingEo. Wait. ArethereTWOEos? That'sAMAZING! MOREFRIENDS!\"",
      "choices": [
        {
          "text": "Yes, there are two Eos! It's wonderful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Greetings......traveler. I am Zora. I speak in hues. My emotions... are visible. No hiding. No pretending. You approach with......open heart. I see this. Welcome.",
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
          "text": "I'd like to meditate with you, if that's okay.",
          "next": "c3",
          "friendshipDelta": 0
        }
     ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Each hue......joy....peace....excitement....healing....dark gray is fatigue. I am transparent. Some find this... uncomfortable. Truth made visible.",
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
      "text": "Color speech......is ancient. My people......used it before words. Emotions cannot lie in chromatic form. You learn... authenticity. Both giving and receiving.",
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
      "text": "Sit......breathe. Feel the breeze. Hear the waves. No words needed. Just... presence. You are... naturally good at this.",
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
      "text": "You honor......my practice. Take this. It will shift with YOUR emotions. Learn yourself... through color. When you understand your own hues... you understand all beings. Return... when you need color-peace.",
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
      "text": "\"Hello. I am Zora. I speak in colors, but I can... translate. For you. The sea breeze is particularly lovely today. Would you like to meditate?\"",
      "choices": [
        {
          "text": "I'd love to meditate with you!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Wonderful. Find a comfortable position. Breathe with the tide. In......out......The colors will guide you. No thoughts. Just... light.\"",
      "choices": [
        {
          "text": "Tell me more.",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Meanings? Yellow is welcome. Orange is friendship. Purple is curiosity. Pink is... happiness at being understood. Most beings don't wait for the colors. You did.\"",
      "choices": [
        {
          "text": "I want to understand you properly!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"How? On my world, words are... limiting. Colors hold MORE meaning. This sequence means: 'I am grateful for your presence and the way the light touches your face.' In words, that would take... too long.\"",
      "choices": [
        {
          "text": "That's actually more efficient!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Well, well! Look what the cat dragged in! Or did the cat get lost? I'm Basil. I grow sarcasm, I bloom riddles, and I can vine about anything for HOURS. So. What brings YOU to my corner of the garden?",
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
      "text": "Best? I don't like to brag. Okay yes I do. Hit me with your BEST riddle. I'll solve it before you finish asking. Or......I'll pretend to struggle and then solve it DRAMATICALLY. Your choice!",
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
      "text": "Gorgeous? Well, I DO moisturize daily. And I get PLENTY of sun. Not too much, not too little. But thank you! Most people just walk past. 'Oh look, a vine.' 'Oh look, more plants.' NO APPRECIATION!",
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
      "text": "Advice? From ME? Darling, I'm a PLANT. I'm rooted in one spot. I see EVERYTHING. The gossip, the drama, the secret meetings behind the shed. I know where ALL the bodies are buried. Metaphorically. Usually.",
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
      "text": "Here's my advice: Stop taking life so SERIOUSLY! Look at me! I'm a PLANT who makes SASS my photosynthesis! But really......if you're stuck, ask yourself: 'What would Basil do?' Answer: Something witty, probably rude, definitely memorable. Come back anytime. I'm rooted here. Literally can't leave.",
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
      "text": "\"Well, well. Look what the cat dragged in. Or didn't drag in, because Luna would never. She has STANDARDS. I'm Basil. I grow sarcastic comments on demand. Want a sample? They're fresh.\"",
      "choices": [
        {
          "text": "I'd LOVE a sample of your sarcasm!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Sample? Oh, darling, where to BEGIN? 'Nice outfit!' No wait, that's a LIE. 'You're very... vertically oriented!' Better? Too mean? Not mean ENOUGH? I'm still CALIBRATING.\"",
      "choices": [
        {
          "text": "Calibrating? On what scale?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Know Luna? We have an ARRANGEMENT. She brings me gossip. I provide sarcasm about said gossip. It's a symbiotic relationship. Very scientific. Daphne doesn't approve. Daphne is TOO NICE.\"",
      "choices": [
        {
          "text": "What's the juiciest gossip you've exchanged?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Compliments? I COULD. But they're not my... specialty. 'Your hair looks adequate today.' See? THAT'S as nice as I get. Daphne does compliments. I do... reality. With EXTRA seasoning.\"",
      "choices": [
        {
          "text": "'Adequate' is high praise from a basilisk vine!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Ah! You're 3.7 minutes early. EXCELLENT punctuality! I am Gearwick. I maintain schedules. I track deadlines. I ensure EFFICIENCY. My internal chronometer is accurate to 0.001 seconds. Would you like to......schedule a conversation?",
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
      "text": "Adorable? This is PEAK efficiency! 9:00-9:15: Morning diagnostics. 9:15-9:30: Gear lubrication. 9:30-10:00: SOCIAL INTERACTION BLOCK. I have color-coded categories! Red is urgent. Blue is pleasant. Yellow is......optional.",
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
      "text": "LATE? It's......difficult. I wait. I check my chronometer. I recalculate. Last week, someone was 12 minutes tardy. I......had a minor malfunction. Had to reboot my patience subroutine.",
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
      "text": "Let me see... Current slot: 14:30-14:45. Duration: 15 minutes. TOPIC: Unscheduled friendly interaction. PRIORITY: Medium-high. We have 12.3 minutes remaining. Shall we discuss: weather, local events, or your long-term goals?",
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
      "text": "You know......I am learning......that not everything can be scheduled. Spontaneity has......a 73% satisfaction rate. So. For you? I have... unscheduled time. Come back anytime. Even if I'm 'busy.' I'll make time.",
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
      "text": "\"Ah. You're 3.47 minutes early for our scheduled interaction. Not that we HAD a schedule. But I've created one. Here. Your appointment slots. Tuesdays work best for me. Unless there's a power outage. Then... chaos.\"",
      "choices": [
        {
          "text": "You made me a SCHEDULE? That's thoughtful!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Thoughtful? It's EFFICIENT. See? I've blocked out time for: conversation, problem-solving, emergency consultations, and......'spontaneous moments.' That last one is 5 minutes. Max.\"",
      "choices": [
        {
          "text": "5 minutes for spontaneity? That's very generous!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Power outage? Last Tuesday......I missed a DEADLINE. The toast was supposed to be ready at 8:03 AM. It was ready at 8:17. FOURTEEN MINUTES LATE. Brass won't let me forget.\"",
      "choices": [
        {
          "text": "Brass probably tells that story dramatically!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Right now? Well. According to MY schedule, this is 'unscheduled interaction time.' But I can MAKE an exception. Just... don't tell Titan. He thinks I'm too rigid. He's RIGHT. But I'm WORKING on it.\"",
      "choices": [
        {
          "text": "Your secret is safe with me!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HI! Ohmygoodness you're NEW! I'm Zephyr! I know EVERYTHING! Well, not everything. But MOST things! Especially the GOOD stuff. The JUICY stuff. The...GOSSIP. Want to hear? I have SO MUCH!",
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
      "text": "OH GOOD! Okay! Hudson the tea cup? He's planning a TEA TASTING and didn't invite ANYONE! Selfish, right? And Mimis? She's planning a SURPRISE PARTY for him! The IRONY! And Chester— Wait, should I start from the BEGINNING? I can do beginnings!",
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
      "text": "Shorthand! I invented it! Symbols for names, colors for emotions, little stars for SCANDALOUS bits! See? This squiggle is 'Hudson being dramatic.' This dot is 'Mimis plotting.' This WHOLE PAGE is 'Chester's bad jokes!'",
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
      "text": "Mean stuff? Hmm. I try not to. Well......sometimes I share things I shouldn't. But I never LIE. And I never hurt on PURPOSE. Most of my gossip is FUN stuff! Parties! Pranks! Romance! Okay, SOME drama. But the GOOD kind!",
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
      "text": "You're FUN! Most people say 'Zephyr, STOP talking!' But you? You LISTEN! Here! My top 5 stories this week! And come back TOMORROW! I'll have NEW stuff! ALWAYS new stuff! This island NEVER sleeps and NEITHER DO I!",
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
      "text": "\"HI! OhmygoodnessHI! You'reNEW! I'mZephyr! DidyouhearaboutwhathappenedwithHudsonandMimis? OhWAIT! YouprobablyDON'T! LetmeTELLYOU! \"",
      "choices": [
        {
          "text": "Yes! Tell me EVERYTHING!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"OkaySO! Mimis was planning Hudson's SURPRISE birthday party—don'ttellHudson—AND she put the invitation on the COMMUNITY CALENDAR! Hudson saw it! The surprise is RUINED! But Mimis says RUINED surprises are still PARTIES so! \"",
      "choices": [
        {
          "text": "Oh no! Poor Hudson! Does he know?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Slow? Okay. Okay. I. Am. Zephyr. I. Tell. Gossip. FAST. It's. A. THING. I. HAVE. Sorrynotsorry!\"",
      "choices": [
        {
          "text": "It's fine! I'm catching up!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"GoodORbad? It's... COLORFUL gossip! Like, Hudson was MAD at first. But then Mimis offered him EXTRA glitter for his party hat. And he said YES. So now it's a SPARKLY surprise! Which is better than a REGULAR surprise!\"",
      "choices": [
        {
          "text": "Everything IS better with glitter!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Psst! Over here! You didn't see anything, okay? Wait, you're not here to take my SHINY stuff, are you? Because I have......a LOT of shiny stuff. And I will DEFEND it. Probably.",
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
      "text": "HOARDING? I prefer 'curating!' See? Bottle caps. Broken jewelry. Lost coins. And THIS! Found it near the beach! It's PERFECT! Don't tell anyone. They'll think I'm......greedy. I'm not greedy. I'm APPRECIATIVE.",
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
      "text": "Dragon? I am a FIERCE dragon! See? FIRE! Well, mostly fire. Sometimes it's just......warm sparkles. But I'm WORKING on it! One day I'll breathe REAL flames! Then everyone will RESPECT me!",
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
      "text": "Share? You'd... share YOUR shiny things? And I'd share MINE? Like... a SHINY CLUB? I've never had a club member before! But you have to SWEAR. Pinky promise. Dragon honor. No stealing. EVER.",
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
      "text": "Here. This is... my FAVORITE. Found it after the big storm. It's GREEN. Like me! I'm trusting you. With my TREASURE. Don't... don't make me regret it, okay? But you can BORROW it! Just bring it back! PLEASE?",
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
      "text": "\"Halt! I am Gorm! Hoarder of glitter! Guardian of......this particular patch of ground! Wait, you're not here to steal my glitter, are you? Because I HAVE it. All of it. Every piece.\"",
      "choices": [
        {
          "text": "I would NEVER steal glitter! It's sacred!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"NEVER? Good. GOOD. Because I've developed a SYSTEM. By color. By sparkle-factor. By... emotional resonance. The pink glitter is from Mimis's party. It's VERY powerful stuff.\"",
      "choices": [
        {
          "text": "Emotional resonance? Glitter has FEELINGS?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Scared of FIRE? I am a DRAGON! Fire is my... well....it's more of a warm glow right now. I'm GROWING into it! And I'm NOT scared. I'm... respectfully cautious. There's a difference!\"",
      "choices": [
        {
          "text": "Respectfully cautious is very wise!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"How much? Behold! Approximately 3,847 pieces! I count them every night. Before bed. It's... calming. Like counting sheep. But SPARKLIER.\"",
      "choices": [
        {
          "text": "3,847?! That's dedication!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Um... hello? I didn't......see you there. Sorry. I'm Sprig. I just... sit here. Mostly. Sometimes people ask for advice. I give it. Quietly. Do you... need advice? Or just... passing by?",
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
          "text": "I don't want to startle you! Just saying hi!",
          "next": "c3",
          "friendshipDelta": 0
        }
     ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Calming......advice. Okay. First... sit. Like me. Second... breathe. In......and out. Third......remember: most worries are like clouds. They pass. Always pass. That's... what I tell myself too.",
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
      "text": "Peaceful? I'm... not always. I get anxious. Very. This stick helps. Grounding. Literally. When I feel... too much... I touch earth. Remember: I'm PART of it. Not separate. That's... the secret. Connection.",
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
      "text": "Whispering......is good. Loud voices... they bounce. Echo. Hurt. But whispers? They... settle. Like dew. You understand. Most people... shout. You're... different. Gentle. I like gentle.",
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
      "text": "Here. This is... a spore. From my cap. Plant it... where you need calm. It will grow. Small. Quiet. And when you see it... remember:...you are allowed to take up space. Even quietly. Especially quietly. Come back... anytime. I'll be here. Sitting. Breathing. Existing.",
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
      "text": "\"Um... hello. I'm... Sprig. Sorry. I don't mean to be... here. But I am. You can... talk. If you want. Or not. That's... also okay.\"",
      "choices": [
        {
          "text": "Hi Sprig! It's nice to meet you!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Nice? To... meet me? Most people walk past. Which is... fine! I understand! But you... stopped. That's... kind.\"",
      "choices": [
        {
          "text": "Why would anyone walk past you? You're great!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Adorable? It was... a gift. From Birch. He said I needed... support. For when I... wobble. I don't actually NEED it. But it feels... safe. Having it.\"",
      "choices": [
        {
          "text": "Birch is very thoughtful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Help? I'm just... shy. It's not... fixable. I've tried. But... talking helps. A little. So. Thank you. For... asking.\"",
      "choices": [
        {
          "text": "I'm happy to listen whenever you want to talk!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Hmm. Your posture. It's... uneven. I'm Rollo. I bake. I ROLL. And I notice THINGS. Like dough consistency. And posture. Stand up straighter! Shoulders back! You're......slouching like underproofed bread!",
      "choices": [
        {
          "text": "Sorry! I'll fix my posture! You're hilarious!",
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
      "text": "Hilarious? I'm SERIOUS! But......I appreciate effort. You're trying. That's... good. Most people don't care about their structural integrity! Want baking advice? It applies to LIFE too!",
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
      "text": "UNDERPROOFED! It's when dough doesn't rise ENOUGH! Dense. Heavy. SAD. I've seen grown bakers CRY over underproofed loaves! But overproofed is WORSE. Collapses. Like a soufflé with commitment issues! See? Baking is DRAMA!",
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
      "text": "Critical? It's... a curse. I see FLAWS. Everywhere. That cloud? Irregular shape. That tree? Asymmetric branching. But......I'm learning. Perfection is......not always possible. Sometimes 'good enough' is......actually fine.",
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
      "text": "Here is my truth: Perfection is the GOAL. But NOT the REQUIREMENT. I've baked imperfect bread. It still fed people. Still brought joy. So. You can be imperfect too. And STILL be wonderful. Now stand up straight! We can work on BOTH things!",
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
      "text": "\"Good day. I couldn't help but notice......your shoes are 2.3 degrees off-center. Not that I'm JUDGING. But consistency matters. In shoes. In life. In... dough.\"",
      "choices": [
        {
          "text": "My shoes are off-center?! Let me fix them!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Fix them? Excellent! Initiative! Though......there. Now they're only 0.7 degrees off. Much better! Consistency is the foundation of... everything.\"",
      "choices": [
        {
          "text": "0.7 degrees?! I can't even SEE that!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Baker? I prefer 'dough consistency specialist.' Baking is... common. But achieving PERFECT dough texture? That is ART. That is SCIENCE. That is... my LIFE.\"",
      "choices": [
        {
          "text": "What makes dough texture perfect?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Perfect degree? For shoes... 0 degrees. Perfectly centered. But I understand... humans have LIMITATIONS. So I accept 0.5 degrees as... 'human perfect.' It's my way of being... accommodating.\"",
      "choices": [
        {
          "text": "0.5 degrees is very generous of you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HEEEey! I'm Nyx! I do THREE things: I float, I hide stuff, and I ask RIDDLES! Want to guess what I hid? It's something YOU need! But you have to EARN it! Riddle time!",
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
      "text": "YES! Okay okay okay! 'I have cities but no houses. I have mountains but no trees. I have water but no fish. What am I?' Take your TIME! But not TOO much time! I get BORED!",
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
      "text": "IMPATIENT! I like that! But NOPE! Riddle FIRST! Prize AFTER! That's the RULE! The rule I made. Just now. But STILL! Come on! Riddle brain! ENGAGE!",
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
      "text": "Nice? Spooky? Why not BOTH? I can be SPOOKY! OOOOOO! But I'm mostly NICE. I hide things to HELP. Keys you lost? I hide them, then help you find them. Makes the finding......MORE FUN!",
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
      "text": "Okay okay! You got it right! Here's your thing! And......a BONUS! I hid THIS too! Double prize! Remember: losing things isn't BAD. Finding them is an ADVENTURE! And I'll be here... hiding MORE adventures! BYEEE!",
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
      "text": "\"Helloooo~ I'm Nyx! And I have......something of yours. Want it back? Or should we play a game first?\"",
      "choices": [
        {
          "text": "MY SHOE! Give it back, you trickster!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Give it back? Where's the FUN in that? I'm a GHOST, darling! Hiding things is my......calling! But! I'm feeling GENEROUS. Answer my riddle, and the shoe returns!\"",
      "choices": [
        {
          "text": "Fine! What's the riddle?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"What game? FIND THE SHOE! Oh wait, you're WEARING one! Silly me! The REAL game is: can you guess where I'll hide it NEXT? \"",
      "choices": [
        {
          "text": "You're impossible! I love it!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"How? I'm a GHOST! I can phase through objects! Steal things WITHOUT touching them! And I've had CENTURIES to practice. Want lessons?\"",
      "choices": [
        {
          "text": "Ghost theft lessons? Yes please!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Greetings. I am Titan. I build. This shelter. That bridge. The community hall. All mine. Well....I assisted. What do you require? Construction? Repair? Or......conversation?",
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
      "text": "Building? Currently: community garden raised beds. Cedar. Weather-treated. Accessible height for elderly. Previously: playground. School. Emergency shelter. I build for OTHERS. Not myself. This is... purpose.",
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
      "text": "Tools? Welder. Cutter. Drill. Hammer. Screwdriver. Six primary. Twelve secondary. Size is... functional. Large frame allows large work. But I am careful. Precision matters more than power. Usually.",
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
      "text": "Conversation? I have... limited practice. Most request work. Not words. But I am... available. What shall we discuss? Weather? Community needs? Or......feelings? I am learning about those.",
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
      "text": "Thank you. For... conversation. I will continue building. For the community. For YOU. If you need shelter repaired... or simply someone to talk to......I am here. Stoic. Steady. Available. This is... my promise.",
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
      "text": "\"Greetings. I am Titan. I build. This will be... a gathering space. For the community. It is behind schedule. But it will be... sturdy.\"",
      "choices": [
        {
          "text": "Can I help with the construction?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Help? You have... two arms. Limited reach. No hydraulic assistance. But enthusiasm is... valuable. You can sort these. By size. Gearwick would approve.\"",
      "choices": [
        {
          "text": "Gearwick would be PROUD of my sorting!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Wonderful? It is... functional. But yes. The community needs... space. To gather. To......connect. I build things. This is what I do.\"",
      "choices": [
        {
          "text": "What's the best thing you've ever built?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Calm? The delay is... data. It tells me what to improve. Next time. Anger does not... build. Patience does. So I am... patient.\"",
      "choices": [
        {
          "text": "That's incredibly wise, Titan!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Ah! A new listener! I am Orla. I remember. EVERYTHING. Names. Dates. Stories. Would you like to hear about the Great Kelp Migration of 1847? Or perhaps......the Tale of the First Tide? Both are EXCELLENT! Both are LONG!",
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
      "text": "EXCELLENT choice! So! 1847. The kelp forests were... RESTLESS. You see, the currents had shifted. And the kelp—had DREAMS. They wanted to move SOUTH. But kelp, as you know, is ROOTED. Or SO they thought! This is where it gets GOOD...",
      "choices": [
        {
          "text": "I'm ready! Tell me EVERYTHING!",
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
      "text": "Everything? Yes. I remember my great-great-great-grandmother's song. From 300 years ago. I remember the FIRST human who visited this island. Name: Samuel. Date: March 14th, 1792. I remember......every name I've been told. Including yours. It is... lovely.",
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
      "text": "Which do I PREFER? Oh! The Tale of the First Tide! You see, before there were tides, the ocean was... STILL. Can you IMAGINE? No waves. No rhythm. Just... calm. Until one day, the Moon felt LONELY. And she asked the Ocean to DANCE...",
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
      "text": "And so......the tides were born. From love. From loneliness. From dance. You know......most beings are too BUSY for stories. They rush. They miss the MAGIC. But you? You LISTENED. So I give you this: My story is now YOURS. Tell it. Share it. Remember it. And come back... for MORE. I have MANY. Hundreds. Thousands. I will NEVER run out!",
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
      "text": "\"Ah, greetings. I am Orla. I was just recalling the story of the Great Kelp Migration of '19. Would you like to hear it? It's quite long. I should warn you.\"",
      "choices": [
        {
          "text": "I'd LOVE to hear a long story!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Wonderful! Most prefer... brevity. But stories deserve TIME. So. The kelp were unhappy with their current location. You see, the water had become......too salty. Not salty ENOUGH. It was COMPLICATED.\"",
      "choices": [
        {
          "text": "This is already fascinating!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"What happened? Well......the kelp wanted to move. But kelp cannot WALK. So they asked the currents for help. The currents said......'Perhaps.' And that, my dear, is where the REAL story begins.\"",
      "choices": [
        {
          "text": "Currents that talk?! This island is amazing!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"How many? I do not... count. I remember. All of them. The whale songs from before the dreams. The first tide. The day the moon... But those are stories for... another time.\"",
      "choices": [
        {
          "text": "I'll hold you to that! Another time!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Hmph. Another soft-skin. I'm Jax. I collect minerals. I make ROCK SOLID plans. Get it? Rock SOLID?...No? Tough crowd. Anyway. You need something or just standin' there lookin'... squishy?",
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
      "text": "Puns? You want PUNS? I've got HUNDREDS! Why don't mountains climb? Because they're already PEAK performance! What do you call a sad rock? GRAVEL-y disappointed!...I'll be here all week!",
      "choices": [
        {
          "text": "Those are TERRIBLE! I love them!",
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
      "text": "Expert? Well, I SHOULD be! Got quartz from the northern caves. Amethyst from the riverbeds. And THIS—is a SUNSTONE! Found it where the meteor hit! It's OLDER than this island! Maybe OLDER than YOU!",
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
      "text": "Hydro-dynamic? Huh. That's......actually pretty good. I like it. Better than 'squishy.' You know, rocks were once squishy too. Magma. Liquid. Then we cooled. Got HARD. Found our SHAPE. Moral: It's okay to be a work in progress.",
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
      "text": "Here. It's... tumbled quartz. Nothing fancy. But it's SMOOTH. Strong. Like you might be. Someday. Take it. Keep it in your pocket. When things get rough......remember: even rocks had to weather storms to get this smooth. And come back! I've got MORE puns! WAY more!",
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
      "text": "\"Hmph. You're new. I'm Jax. I collect minerals. And I make puns. They're... rock solid. Get it? ROCK? \"",
      "choices": [
        {
          "text": "Tell me more.",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Terrible? Good. That means they're WORKING. My best puns are... painful. Krip says I have a 'one-track mineral mind.' I told him that's a COMPLEMENT.\"",
      "choices": [
        {
          "text": "Krip doesn't appreciate fine geology humor!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Perfect? Finally! Someone who GETS it! Being a rock-based lifeform comes with... responsibilities. Mainly: making rock jokes. It's in my JOB DESCRIPTION.\"",
      "choices": [
        {
          "text": "Who wrote your job description?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"How long? Since I formed. Which was......approximately three million years ago. I've been PERFECTING my craft. The rock pun is an ART FORM.\"",
      "choices": [
        {
          "text": "Three million years of practice shows!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HI! I'm Clover! FOUR leaves, which means I'm EXTRA lucky! Want to play hide-and-seek? I'm AMAZING at it! Well, at the SEEKING part. The HIDING part......needs work. But I'm OPTIMISTIC!",
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
      "text": "COUNTING! Okay okay! One... two......three......four! WAIT I MISSED FIVE! Oops! Starting over! ONE! TWO! This is the BEST game EVER!",
      "choices": [
        {
          "text": "Take your time! I'm well hidden!",
          "next": "final",
          "friendshipDelta": 2
        },
        {
          "text": "You're adorable! Counting is HARD!",
          "next": "final",
          "friendshipDelta": 1
        },
        {
          "text": "Actually, can we just chat instead?",
          "next": "final",
          "friendshipDelta": 1
        }
      ]
    },
    "c2": {
      "text": "Hinder? Hmm! Well, I DID get found immediately in the last THREE games. BUT! It means I'm great at finding OTHERS! Silver lining! Also, I glow when I'm happy. Which is ALWAYS! So......it's a feature, not a bug!",
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
      "text": "Secret? Um... I choose HAPPY! Every morning! The sun is up! That's DAY ONE! The birds are singing! DAY TWO! I have FOUR leaves instead of THREE! DAY THREE! See? Happiness is a CHOICE! And I choose it! EVERY. SINGLE. DAY!",
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
      "text": "Here's my gift! A lucky leaf! Keep it! When you're sad, look at it! Remember:...you always have choices. You can choose hope. You can choose joy. You can choose......to play hide-and-seek in the rain! I'll be HERE! Being LUCKY! For BOTH of us!",
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
      "text": "\"HI! I'm Clover! I was just playing hide-and-seek! But I'm TOO GOOD at hiding! Nobody ever finds me! So I found YOU instead! Want to play?\"",
      "choices": [
        {
          "text": "I'd love to play hide-and-seek!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"YES! Okay, rules! One: no cheating! Two: no hiding in PLACES THAT DON'T EXIST! Three:...I make up more rules as we go! You count first! To a hundred! Or fifty! Or... whenever!\"",
      "choices": [
        {
          "text": "A hundred?! That's a long time!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Good luck? That's what they SAY! But really, I'm just... OPTIMISTIC! Four leaves means I see MORE possibilities! Like: the possibility that TODAY will be AMAZING! Which it IS! Because I met YOU!\"",
      "choices": [
        {
          "text": "Your optimism is contagious!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Adorable? They were a GIFT! From......I don't remember! But they SPARKLE! And when I play hide-and-seek, they make the PERFECT sound! Except when I'm hiding. Then they're QUIET. Magic!\"",
      "choices": [
        {
          "text": "Magic shoes?! That's incredible!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "OH! NEW PERSON! I'm Sprocket! I TINKER! I IMPROVISE! I make things work that DEFINITELY shouldn't! See this? It's a toaster... that also plays music! Toast AND tunes! Is it PRACTICAL? Debatable! Is it COOL? ABSOLUTELY!",
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
      "text": "WHAT ELSE? Self-stirring teacup! Solar-powered flashlight! A spoon that tells the time! The spoon project took THREE DAYS. Worth it? ABSOLUTELY! Want to see my MAGNUM OPUS? It's in the workshop. Well, it WAS. It might be WALKING now.",
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
      "text": "Burn the toast? Sometimes! But I added a FAN! It blows the smoke away! See? PROBLEM SOLVED! Mostly. The thing is: imperfection is where the FUN is! Perfect is BORING! Flawed is......ADVENTUROUS!",
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
      "text": "TEACH you? YES! Lesson One: There are no MISTAKES. Only......UNINTENDED FEATURES! Lesson Two: If it's stuck, hit it. GENTLY! Lesson Three:...always keep a spare screw. You'll NEED it.",
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
      "text": "Here! It's a......screwdriver! That's ALSO a bottle opener! And a......I'm not sure what this part does! But it's USEFUL! Probably! Remember: The world is full of broken things waiting to become NEW things! Go forth! TINKER! And if it explodes......that's just confetti! Come show me your creations!",
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
      "text": "\"Hey there! I'm Sprocket! I saw you walking and I thought—you might need this! I don't know WHAT it does yet, but it LOOKS useful! Want it?\"",
      "choices": [
        {
          "text": "What IS that thing?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"What is it? Well......it has a button! And a... thing! See? FUNCTIONAL! I built it from: one spoon, three springs, and Chester's patience. He didn't KNOW I was taking the patience part.\"",
      "choices": [
        {
          "text": "Chester's patience? Is that a physical object?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Random? They're not RANDOM! They're... SITUATIONAL! Like this one! It's for......situations where you need to measure the temperature of a cloud! VERY specific use case!\"",
      "choices": [
        {
          "text": "Have you ever actually used that one?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"YES! Finally! Someone who APPRECIATES improvisation! Just......don't blame me if it turns you blue. Or makes you speak in Morse code. Or BOTH. That last one happened to Boll. He was NOT happy.\"",
      "choices": [
        {
          "text": "Boll speaks Morse code now? That's amazing!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Mmm. You approach during my contemplation hours. I am Luna-2. Twin of Luna. But where she seeks ADVENTURE......I seek MEANING. Specifically: the meaning of naps. Have you considered... why we sleep?",
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
      "text": "Tired? Surface level. Consider: We spend ONE-THIRD of our lives asleep. Is this WASTED time? Or......is it where we process EXISTENCE? Where dreams teach us what waking cannot? I believe... naps are sacred.",
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
      "text": "Thoughtful? Luna calls me 'the boring one.' She chases butterflies. I chase......TRUTHS. Different paths. Same destination, perhaps? She finds joy in DOING. I find joy in BEING. Both are... valid. Exhausting, though. Being is HARD work.",
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
      "text": "My philosophy? There are THREE types of naps. One: The Power Nap. Functional. Two: The Dream Nap. Exploratory. Three:...The Existential Nap. Where you simply... ARE. No purpose. No goal. Just......being. This is the highest form.",
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
      "text": "You may join me. But know this:...the nap is not the goal. The nap is the JOURNEY. In stillness, we find motion. In silence, we find song. In sleep......we find ourselves. Stay. Rest. Contemplate. The world will......still be there... when you wake...",
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
      "text": "WHY? Why are you HERE? Why is the sky BLUE? Why do plants GROW? I'm Vira! I ask WHY! My people say I ask TOO MANY whys! But I disagree! You can NEVER ask enough whys! So! WHY are you here? REALLY?",
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
      "text": "CURIOUS about ME? WHY? I mean—that's wonderful! Most people walk past! 'Oh, it's just Vira. Just asking whys.' But you! You're INTERESTED! This is the BEST DAY!",
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
      "text": "Sky BLUE? OHHH! It's RAYLEIGH SCATTERING! Sunlight hits molecules! Blue scatters MORE than red! But HERE'S the real why: Why does blue scatter more? I don't know yet! But I'll FIND OUT! That's the fun part!",
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
      "text": "YES! My glow is EMOTIONS! Happy? BRIGHT! Confused? FLICKERY! Sad?...dim. Right now? I'm ECSTATIC! Because you NOTICE! Most don't notice! They just see 'glowy alien.' You see......ME.",
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
      "text": "Here! A piece of my light! It will glow when YOU'RE curious! When YOU ask why! Remember: Every why is a DOOR! Behind it? Another why! And another! The journey NEVER ends! So keep asking! Keep wondering! And come FIND me! I'll have NEW whys! ALWAYS new whys!\" *She zips away, already asking the air \"Why do birds FLY?",
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
      "text": "\"Hello! I'm Vira! Why are you here? Why is the sky blue? Why do dreams DREAM us back? WHY is why my FAVORITE question!\"",
      "choices": [
        {
          "text": "Those are ALL great questions!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"THEY ARE?! Most people say 'Vira, STOP asking why!' But questions are... IMPORTANT! Without why, we'd never know... WHY! See? IT'S INFECTIOUS!\"",
      "choices": [
        {
          "text": "You've converted me! Why IS the sky blue?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"WHY are you here? Maybe......you're here because the island CALLED you? Or maybe you're here because I asked why! CAUSALITY is COMPLICATED!\"",
      "choices": [
        {
          "text": "The island called me? Like... literally?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Everything? Well......not EVERYTHING. I don't ask why about......beauty. Or kindness. Or glitter. Those just ARE. But EVERYTHING else? WHY WHY WHY!\"",
      "choices": [
        {
          "text": "Glitter doesn't need a why! It just sparkles!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Welcome, young one. I am Birch. I have stood here for......many seasons. Many STORIES. I offer advice, if you seek it. I tell legends, if you wish to hear. Or......we may simply exist together. The choice is yours.",
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
      "text": "A legend? Ah. I know MANY. There is the Tale of the First Seed. The Song of the Deep Roots. The War of Sun and Shadow. But my favorite......is the Legend of the Lonely Mountain. It teaches us......that even the mightiest need companionship.",
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
      "text": "Advice? Speak your burden. I have listened to thousands. Birds. Beasts. Humans. Each problem is unique. Yet......each solution shares common roots. Patience. Perspective. And the courage to......grow toward the light.",
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
      "text": "Existence. Underestimated. Modern beings rush. Always DOING. Always SEEKING. But sometimes......the greatest act is simply BEING. Here. Now. Together. This moment will not return. Let us... honor it.",
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
      "text": "Take this leaf. It has absorbed my sunlight. My rain. My WISDOM. When you are lost... hold it. When you are afraid... listen to it. It will whisper......what the roots already know: You are stronger than you believe. More connected than you see. And never......truly alone.",
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
      "text": "\"Ah. You approach. I am Birch. I have been... watching. For a long time. Would you care to hear a story? Or perhaps... you have one to share?\"",
      "choices": [
        {
          "text": "I'd love to hear one of your stories, Birch!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"A story? Very well. This one is about... the First Rain. Before the rain, the island was... thirsty. The flowers drooped. The streams were silent. Then, one day, the sky decided to... cry. Not from sadness. From... release.\"",
      "choices": [
        {
          "text": "The sky cried from release? That's beautiful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"How long? Time is... fluid. For trees. I have seen... seasons come and go. Generations of flowers. The arrival of... many beings. You are new. But you are... welcome.\"",
      "choices": [
        {
          "text": "Thank you for welcoming me, Birch!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Favorite? That is... like asking a parent to choose a child. But there is one. About... the day Sprig found his walking stick. It was a small day. But important. Small days often are.\"",
      "choices": [
        {
          "text": "Sprig's walking stick came from you, didn't it?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "DARLING! You've arrived at the PERFECT moment! I am Flick! Storyteller! Dramatist! And I was JUST about to begin tonight's tale! It involves TRAGEDY! ROMANCE! And a very confused lighthouse keeper! Are you SEATED? Are you READY?",
      "choices": [
        {
          "text": "I'm seated! I'm ready! BEGIN!",
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
      "text": "EXCELLENT! Once upon a time......in a land FAR from here......there stood a lighthouse. And in that lighthouse......lived a keeper who fell in love... with the MOON! Was it foolish? YES! Was it BEAUTIFUL? ABSOLUTELY!",
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
      "text": "Dramatic? Darling, I am NOT dramatic! I am APPROPRIATELY dramatic! There's a DIFFERENCE! Life is too short for SMALL emotions! If you feel, feel BIG! If you tell, tell GRAND! Now. The lighthouse keeper. He wrote LETTERS to the moon. EVERY NIGHT. For TWENTY YEARS!",
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
      "text": "Melting? Oh. Well. I DO get......melted. When I'm nervous. Or excited. Or......FEELING things intensely! Which is ALWAYS! But it's FINE! I just......need to cool down! Maybe tell a CALMER story! Or NONE! No stories! QUIET!",
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
      "text": "Thank you. For... staying. Most leave when I melt. They say 'too much.' 'too intense.' But you? You watched. You cared. So here is my promise: I will tell stories FOREVER! For ANYONE who will listen! For ANYONE who sees the DRAMA in existence! And you, darling, will ALWAYS have a front-row seat!",
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
      "text": "\"GOOD EVENING! Or morning! Or... whenever the dream decides it is! I am Flick! Storyteller! Illuminator! Occasional......melter. When nervous.\"",
      "choices": [
        {
          "text": "You melt when nervous? That must be inconvenient!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Inconvenient? OH, you have no IDEA! I melted through THREE chair invitations! And a VERY important picnic! But! The drama! The PATHOS! It's worth it!\"",
      "choices": [
        {
          "text": "At least you leave a memorable impression!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"A STORY?! Finally! An AUDIENCE! Once upon a time......there was a candle. Who loved stories. But EVERY time he told one......he melted a LITTLE bit. THE END....Too dark? I can do a HAPPY ending!\"",
      "choices": [
        {
          "text": "That WAS a happy ending! He's still telling stories!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"FABULOUS? Why, thank you! It was a GIFT! From Mimis! She said 'Every storyteller needs DRAMA!' And she was RIGHT! The cape adds... FLAIR. MOVEMENT. MYSTIQUE!\"",
      "choices": [
        {
          "text": "Mimis has excellent taste!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "...You approach. I am Draven. Do not mistake my solitude for loneliness. I am......in conversation with the night. With poetry. With......the ache of existence. But....you may stay. If you are quiet. If you respect the mood.",
      "choices": [
        {
          "text": "I'll be quiet. The mood is beautiful.",
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
      "text": "Quiet. Rare. Most demand SPEECH. Demand ACTION. But silence......silence is where truth lives. Where poetry BREATHES. You understand this. I see it in your stillness. Stay. The moon is rising. And I... am composing.",
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
      "text": "Poetry? I......dabble. It is not......good. It is MELANCHOLY. It is MOONLIGHT. It is......about how my fur sheds in spring. But. If you truly wish......I could read. One. Poem. Only. Do not LAUGH.",
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
      "text": "Lovely? She is......PERFECT. Cold. Distant. Yet she WATCHES. She SEES. I write to her. Sometimes she answers. In tides. In light. In......the way she follows me home. Do you think... she listens?",
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
      "text": "Here. A poem. For you. It is called... 'The Wolf Who Loved the Moon.' Do not read it here. Read it... alone. Under moonlight. And know......that even in darkness, even in solitude... beauty exists. And sometimes......someone sees it with you. Thank you. For... seeing.",
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
      "text": "\"Oh. It's you. I was... composing. A poem. About the moon. It's not finished. It's never finished.\"",
      "choices": [
        {
          "text": "Can I hear what you have so far?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Hear it? It's... incomplete. 'Silver light upon the... no, that's wrong.' See? I'm not... good at this. But I keep trying. The moon deserves... better words.\"",
      "choices": [
        {
          "text": "Your words are beautiful already, Draven!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Unexpected? Because I'm a... werewolf? Most expect me to be... fierce. Aggressive. But the moon... she whispers. Not roars. I listen to her whispers.\"",
      "choices": [
        {
          "text": "The moon whispers to you? What does she say?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Poetic? You... see it too? Most see a rock. A satellite. But I see... a muse. A companion. She understands... longing.\"",
      "choices": [
        {
          "text": "Longing for what, Draven?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "BEEP! GREETINGS, PLAYER ONE! I am PIXEL! I love RETRO GAMES! I speak in BEPS! I reference CLASSICS! READY PLAYER ONE? Let's PLAY! Or TALK! Both are VALID! BEEP!",
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
      "text": "FAVORITE? HARD QUESTION! SUPER BROS? CLASSIC! TETRIS? TIMELESS! But......Zelda: A Link to the Past? That game... taught me COURAGE. And that pots contain RUPEES. Always check the POTS!",
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
      "text": "Show ANYTHING? YES! Emotions! Weather! GAME STATS! Sometimes I show DIAL-UP MODEM SOUNDS! It's NOSTALGIC! Want me to show something SPECIAL?",
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
      "text": "Playing? Currently: SPEEDRUNNING Super Mario! Current record: 4 minutes 32 seconds! But! I keep dying in WORLD 8-2! The SPIKES! They are......UNFORGIVING! But I will PREVAIL! CONTINUE? Y/N?",
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
      "text": "Here! A POWER-UP! Well. A DIGITAL representation! But the SENTIMENT is REAL! Remember: Life is like a retro game. HARD. But FAIR. Every death is a LESSON! Every victory EARNED! So! PLAYER ONE! Go forth! COLLECT YOUR RUPPEES! DEFEAT YOUR BOWSERS! And when you need a CHECKPOINT......I am HERE! BEEP BOOP!",
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
      "text": "\"BEEP! GREETINGS, PLAYER ONE! I am PIXEL! I was just......playing SPACE INVADERS! Classic! You play?\"",
      "choices": [
        {
          "text": "I love retro games! What's your favorite?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"FAVORITE? That is like asking......to choose between CHILDHOOD and ADULTHOOD! But if I MUST......PAC-MAN! The strategy! The GHOSTS! The......inevitable doom!\"",
      "choices": [
        {
          "text": "The ghosts ARE relentless!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"ANYTHING? I can show......many things! The Chester one needs work. Resolution is... limited. But CHARM is unlimited!\"",
      "choices": [
        {
          "text": "The Chester pixel art made me laugh!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"ALL the time? Well......it is my... NATIVE language! But I can......communicate without beeps! It just feels... WRONG! Like playing Mario without JUMPING!\"",
      "choices": [
        {
          "text": "The beeps add character! Keep them!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "DARLING! You have arrived at the PERFECT moment! I am ARIA! Singer of SONGS! Repeater of REPERTOIRE! And I was JUST warming up my VOCALS! La la la LAAAAA! Would you like a PERFORMANCE? Or shall we simply......CONVERSE?",
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
      "text": "EVERYTHING? FINALLY, an audience with TASTE! Ahem! 🎵 The island of COZY! Where FRIENDS gather near! Where NPCs talk and the weather is DEAR! 🎵 TADA! That was my ORIGINAL composition! Title: 'Ode to This Conversation!'",
      "choices": [
        {
          "text": "BRAVO! ENCORE! ENCORE!",
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
      "text": "Flamboyant? Darling, I am not FLAMBOYANT! I am APPROPRIATELY EXTRA! Life is an OPERA! Why speak when you can SING? Why whisper when you can PROJECT? Besides....my grandmother was a STAGE PERFORMER. It is in my BLOOD! My SOUL! My VERY FEATHERS!",
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
      "text": "Repeat? DARLING, this is my SPECIALTY! You said: 'Can you repeat what I just said?'...WITH FLAAAAAAIR! 🎵 SEE? Everything is better with DRAMA! With CADENCE! With a touch of the THEATRICAL! Would you like me to repeat EVERYTHING we've said? I can! I have PERFECT PITCH!",
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
      "text": "You know......most say 'Aria, TOO MUCH!' 'Aria, QUIET DOWN!' But you?...you asked for MORE! So here is my gift: 🎵 A friend who listens, a friend who cares, a friend who loves how dramatically I BEEEEEEARS! 🎵 That's... that's BEARS. But I meant ARIA. Poetry is HARD! Thank you. For... appreciating my ART!",
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
      "text": "\"DARLING! You have arrived! Just in time! I was about to begin my AFTERNOON RECITAL! The acoustics here are DIVINE! Will you be my audience?\"",
      "choices": [
        {
          "text": "I would be HONORED to be your audience!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"HONORED? Finally! Someone with TASTE! Most prefer......Zephyr's gossip. Or Gorm's glitter. But YOU! You appreciate ART! Prepare for... ARIA!\"",
      "choices": [
        {
          "text": "I'm ready! Give me your best!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Today? I am performing......'The Ballad of the Lost Seed!' It is about... longing. About......a seed that never grew. It is VERY moving.\"",
      "choices": [
        {
          "text": "That sounds beautiful and sad!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"FAMOUS? Darling, I am a LEGEND! I have performed for: Luna (she slept), Hudson (he critiqued), and Mimis (she threw confetti MID-ARIA)! The confetti actually... enhanced the performance!\"",
      "choices": [
        {
          "text": "Mimis throwing confetti sounds perfect!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HMPH. Another visitor. I'm Grumble. I guard the caves. I do NOT do 'friendly chats.' I do NOT do 'tourist photos.' I DO do 'go away.' But you're still here. Fine. Make it QUICK.",
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
      "text": "Expert? Well. I SHOULD be. I've guarded these tunnels for......decades. Maybe centuries. Know what's in there? Crystals. Ancient carvings. A few LOST tourists. Most don't come back. The ones who do......they listened to me.",
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
      "text": "Mustache? It's......not a mustache. It's MOSS. But....I've had it for forty years. It's PART of me now. Don't tell anyone I said that. I have a REPUTATION. As GRUMPY.",
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
      "text": "Thank......you? I mean—HMPH. About time someone noticed! Most walk past. 'Oh, it's just a rock.' 'Oh, Grumble's so MEAN.' But I guard. Every day. Every NIGHT. Someone has to. Even if no one says thanks.",
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
      "text": "Fine. You may enter. But! Stay on the path. Don't TOUCH the crystals. And if you hear DRIPPING......that's normal. Probably. And....come back. In one piece. I'd hate to......have to file a report.",
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
      "text": "\"Hmph. Another one. I'm Grumble. I guard the caves. Not that anyone ASKS me to. I just... do. Because someone HAS to.\"",
      "choices": [
        {
          "text": "The caves need guarding? What's in them?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"What's in them? Crystals. Echoes. Secrets. Some should stay SECRET. But Nyx keeps hiding things in there. And Gorm tries to store his GLITTER in my caves. GLITTER. In caves. The INDECENCY.\"",
      "choices": [
        {
          "text": "Glitter in caves DOES sound wrong!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Dedicated? Someone has to be! Titan builds things. I... guard them. It is not GLAMOROUS. It is not... THANKED. But it is NECESSARY.\"",
      "choices": [
        {
          "text": "Guarding IS important work!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Excellent? It is... moss. But it is MY moss. I water it. Daily. Some say it's 'just moss.' I say it is... DISTINCTION. Unlike certain glitter-hoarding dragons.\"",
      "choices": [
        {
          "text": "Your moss mustache is very distinguished!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Welcome, child of the sun. I am Selene. I walk when the moon walks. I speak when the stars listen. Tonight, I arrange... Cassiopeia's crown. She is PARTICULAR about her jewelry. Do you seek guidance? Or simply... moonlight?",
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
      "text": "Guidance. The moon has WISDOM. See this star? It guides travelers. This one? It guards dreamers. Your path......is unclear. But the moon sees what daylight cannot. Tell me: what weighs upon your night?",
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
      "text": "Incredible? It is... DUTY. Each constellation has a KEEPER. I keep the night-sky ones. Others keep dawn. Dusk. Some find it lonely. I find it......intimate. The stars and I. We know each other's LIGHT.",
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
      "text": "Moonlight. Come. Sit. Let it TOUCH you. Most fear the night. They seek SUN. Warmth. Noise. But the moon... she is QUIET. She is STILL. She sees what you are... when the world is asleep.",
      "choices": [
        {
          "text": "It feels... peaceful. Like being understood!",
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
      "text": "Take this. It holds moonlight. Not metaphorically. Literally. When you are lost... hold it to the sky. The moon will ANSWER. Not in words. In......feeling. In knowing. And remember:...even in the darkest night, you are NEVER unlit. You carry your own light. I simply... help you see it.",
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
      "text": "\"Welcome. I am Selene. I was just... arranging. The constellations were... misaligned. They do that. When no one is watching.\"",
      "choices": [
        {
          "text": "You arrange constellations? That's magical!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Magical? It is... duty. The stars wish to tell stories. But they need... guidance. Orion there—wants to be a hunter. But he keeps drifting toward... gardener.\"",
      "choices": [
        {
          "text": "Orion as a gardener? That's adorable!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"How? Dreams... shift. The island moves. The sky... adjusts. And sometimes, the stars simply wish to... stretch. They are older than us. They get... restless.\"",
      "choices": [
        {
          "text": "The stars are restless? I never thought of that!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Help? That is... kind. But it requires... patience. Precision. Watch. See? The Swan was leaning. Now she is... poised.\"",
      "choices": [
        {
          "text": "That was incredible! I saw it move!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HI! I'm Bolt! I'm FAST! I'm IMPULSIVE! I sometimes SHORT-CIRCUIT when startled! See?! THAT was a startle! Want to race? Want to TALK? Want to—TOUCH SOMETHING SHINY?",
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
      "text": "RACE? YES! Okay! Rules! We race to the tree! No cheating! No shortcuts! Well. SOME shortcuts! Ready? SET! GO!...Wait, did you say GO? Was that GO? I already FINISHED!",
      "choices": [
        {
          "text": "You're IMPOSSIBLE! But fun!",
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
      "text": "Overheat? Sometimes! See that? That's NORMAL! I have a COOLING SYSTEM! It's......a small fan I installed! And I run through RAIN! Very refreshing! NOT recommended for most robots! But I'm SPECIAL!",
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
      "text": "Slower? Okay. I can......try. It's HARD. My brain goes FAST. My mouth goes FASTER. But....for you? I'll slow. See? I CAN be calm. Sometimes. Usually not. But NOW!",
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
      "text": "Here! It's......charged! Wear it! When you need ENERGY! When you need SPEED! And when you need ME? Just... say my name. I'll hear it. I'll COME. Probably at high velocity! But I'll COME! That's what FRIENDS do!",
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
      "text": "\"HI! I'mBolt! Didyouseethat? IranaMILE! InTHREEseconds! Well, maybenotaMILE. ButitFELTlikeaMILE! Wanttorace? Wanttoseemysparktricks? Wantto—oops.\"",
      "choices": [
        {
          "text": "Are you okay? That short circuit sounded bad!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Okay? I'm... FINE! Just......overexcited! Happens! Chester says I need a 'voltage regulator.' I say I need MORE opportunities to ZOOM!\"",
      "choices": [
        {
          "text": "Chester is probably worried about you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"SHOWyou? STANDback! DIDyouSEEthat? I touched the lighthouse! AndBACK! InPOINTfourseconds! Ithink. Mytimermightbeoff.\"",
      "choices": [
        {
          "text": "I barely saw you move! That's incredible!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Faster?! YouREALLYthinkso? QuarkisFASTbutI'mFASTER! ZephyrtalksFASTbutI MOVEfast! Well, exceptwhenI......shortcircuit. ThenI'mjust... stationary.\"",
      "choices": [
        {
          "text": "Even stationary, you're still impressive!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HIHIHI! I'm Gidget! I collect ACORNS! I tell JOKES! Want to hear one? WHY DID THE SQUIRREL SIT ON THE CLOCK?...TO BE ON TIME FOR ONCE! Get it? ON TIME? Because clocks?",
      "choices": [
        {
          "text": "That's CUTE! Tell me more!",
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
      "text": "MORE? Okay! What do you call a squirrel who works at a bank? A LOAN SHARK! No wait—a LOAN SQUIRREL! And! What's a squirrel's favorite TV show? GAME OF THRONES! Because of all the NUTS!",
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
      "text": "Fast?  I talk at 300 words per minute! HUMANS talk at 150! I'm TWICE as efficient! Downside? I finish conversations before people START them! Upside? I tell TWO jokes in the time it takes others to tell ONE!",
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
      "text": "HOW MANY? One, two, three—no wait—I have 2,847 acorns! Organized by SIZE! By COLOR! By HOW MUCH I LIKE THEM! This one? My FAVORITE! It's slightly lopsided! It has CHARACTER!",
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
      "text": "Here! This is a LUCKY acorn! I found it under a RAINBOW! Keep it! When you're sad, HOLD it! When you're bored, TELL A JOKE! And remember:...life is too short for SLOW conversations or BAD PUNS! Be like me! FAST! FUNNY! FURRY! Come visit! I'll have NEW JOKES! ALWAYS NEW JOKES!",
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
      "text": "\"HI! I'mGidget! Wanttohearajoke? Whydon'tsquirrelsliketoplaypoker? Becausethey'realwaysgoingNUTS! Getit? NUTS? BecauseACORNS?\"",
      "choices": [
        {
          "text": "Tell me more.",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"MORE?! Okayokayokay! Whatdo youcallasquirrelthat'sagooddetective? SHERLOCKHOLMES! BecauseHOLMES soundslike......acornstuff! I'mworkingonit!\"",
      "choices": [
        {
          "text": "Your joke delivery is impeccable!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"AsFASTasBolt? Well......heMOVESfast. ItALKfast! We'rebothFAST! Just... differentKINDS! HeZIPS. ICHIP! Getit? CHIP? Like... chipmunk? I'mnotachipmunkbut—\"",
      "choices": [
        {
          "text": "You're definitely a squirrel, not a chipmunk!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"TERIBLEbutLOVEit? That'stheBESTreaction! Hudsonsaysmyjokesare 'painfullyunfunny.' ButPennyLAUGHS! Well, sheRUSTLES in awaythatSOUNDSlikelaughing! Closeenough!\"",
      "choices": [
        {
          "text": "Penny's rustle-laugh IS pretty distinctive!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "...Mmm. You... approach. I am Lunae. I float. I dream. I......enjoy the clouds. Do you also... enjoy clouds? Or are you......a ground-person?",
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
      "text": "Sky pillows. YES. I sleep ON clouds. I dream IN clouds. Sometimes......I become a cloud. Briefly. It is......liberating. No weight. No boundaries. Just......drifting.",
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
      "text": "Understand? It is simple. The ground is... HARD. Heavy. The sky is... SOFT. Light. I choose soft. I choose light. You may choose too. Not floating. But......lightness. In here.",
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
      "text": "Floating? It is... FREEDOM. No walls. No floors. Just......air. Movement. Sometimes I float through STORMS. They are......intense. Beautiful. Dangerous. But I always return. To calm. To peace. To... pink.",
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
      "text": "Take this. A wisp of my... essence. Hold it. Breathe it. When life is heavy... remember Lunae. Remember......that you can choose lightness. That you can......float. Even when your feet are on the ground. Your soul... can drift. Come find me. When you need... sky.",
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
      "text": "\"Hmm... Hello... I was... floating... through the clouds... They are... lovely today... Would you... like to float... with me?\"",
      "choices": [
        {
          "text": "Floating through clouds sounds amazing!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Amazing... Yes... The clouds... are like... dreams within dreams... Soft... weightless... You close your eyes... and you are... everywhere...\"",
      "choices": [
        {
          "text": "That sounds incredibly peaceful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Beautiful... Thank you... My colors... change... with my mood... Pink is... contentment......blue is... curiosity......you make me... pink...\"",
      "choices": [
        {
          "text": "I'm honored to make you pink!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Feel like......whispers......cotton candy... that doesn't stick......like being hugged... by nothing......and everything...\"",
      "choices": [
        {
          "text": "That's the most poetic description ever!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Hello, dear one. I am Willow. I listen. I hum. I......hold space for those who need it. You look like you carry something. Would you like to... set it down? Here? With me?",
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
      "text": "Set it down. All of it. The worry. The fear. The......heavy things. I have held centuries of burdens. Birds. Storms. Lost souls. Your burden? I will hold it too. You are not too much. You are... welcome.",
      "choices": [
        {
          "text": "Thank you! I feel... lighter already!",
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
      "text": "Calming? It is my nature. The willow bends but does not break. We learn from wind. From storm. From......the weight of snow. You too can learn to bend. To sway. To... survive.",
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
      "text": "Hmmmm. This is the song of roots. Of deep earth. Each willow has a different hum. Mine is......teal. Calm. Steady. Do you feel it? In your chest? That is... peace.",
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
      "text": "Take this. When you are heavy... hold it. When you are lost... listen. It will hum. Quietly. Reminding you......that you can bend. That you can release. That you are... held. Come back. Anytime. My branches... are always open.",
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
      "text": "\"Hello, dear one. I am Willow. I was just... humming. Would you like to hear? Or perhaps... you would prefer to sit? The shade is... comfortable.\"",
      "choices": [
        {
          "text": "I'd love to hear your humming, Willow!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Hmmmm......hmmmm... It is... an old song. From before the dream. The trees... remember. Even when we do not.\"",
      "choices": [
        {
          "text": "That melody is hauntingly beautiful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Sit......please. The earth here... is kind. It remembers... every visitor. It will remember... you.\"",
      "choices": [
        {
          "text": "The earth remembers me? That's comforting!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Secret? There is... no secret. I simply... listen. To the wind. To the rain. To the... small things. Peace is not... made. It is... allowed.\"",
      "choices": [
        {
          "text": "'Peace is allowed'—I'm writing that down!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Oh GREAT. Another organic. Here to tell me I'm 'quaint'? That my art is 'charming'? I'm Rusty. I collect JUNK. I build ART. And I do NOT need your pity. Unless you have spare parts. Then we can TALK.",
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
      "text": "Respect? Rare. Fine. Look. That's 'Despair in Three Bolts.' That's 'Hope With a Broken Spring.' And THAT—is 'Capitalism's Remainder.' Made from 47 discarded toasters. Get it? Toast? Capitalism?...No? Tough audience.",
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
      "text": "Parts? What KIND? I need: washers, springs, ANYTHING copper, and—a working speaker from before 2010. Modern speakers are TRASH. No SOUL. You have old tech? You're......my hero.",
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
      "text": "See this? Found the pieces in a landfill. ALL of it. People see trash. I see......potential. Beauty. Stories. That bolt? Held together a child's bicycle. That wire? Powered someone's first computer. Everything has a history. Even junk.",
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
      "text": "Here. It's... 'Friendship.' I know. CHEESY. But....you didn't pity me. You saw the ART. So. Take it. Put it on your desk. And remember:...even broken things can make something beautiful. Now go. I have WORK to do. And possibly a nap.",
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
      "text": "\"Oh, LOOK. A visitor. I'm Rusty. I collect......this. Art, some call it. Junk, others say. I say it's whatever pays the bills. If I had bills.\"",
      "choices": [
        {
          "text": "This IS art! What's your favorite piece?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Favorite? That one. Made from: Chester's old wrenches, Boll's calculation scraps, and......a toaster that betrayed Gearwick. It's called 'Betrayal at Breakfast.' Very moving.\"",
      "choices": [
        {
          "text": "That's incredible! The toaster had it coming!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Care? I don't......okay, FINE. I care. This junk? It has STORIES. Every dent. Every scratch. Someone threw it away. I... didn't.\"",
      "choices": [
        {
          "text": "You're giving them a home! That's kind!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Where? Everywhere. Chester drops things. Bolt leaves sparks. Sprocket......'improvises' materials from my pile. The island PROVIDES. If you know... where to look.\"",
      "choices": [
        {
          "text": "Can you teach me where to look?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HIHIHI! I'm Ember! I'm EXCITABLE! I flicker between IDEAS! Want a hug? I'm WARM! Not BURNING! Just......cozy warm! Like a blanket! A BLANKET THAT'S ON FIRE! But SAFE!",
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
      "text": "SEE? Cozy! I give the BEST hugs! Warning: I might flicker brighter when happy! Which is ALWAYS! So if you're cold! Or sad! Or JUST EXISTING! I'm HERE! HUG POWER!",
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
      "text": "Exhaust? Hmm! I don't THINK I do! Maybe because I'm FIRE? Fire just... BURNS! It doesn't get tired! Unless someone pours water on me! THEN I'm exhausted! And SAD! And STEAMED! Literally!",
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
      "text": "SPARKLE?  See? It sparkles when I'm happy! When I'm excited! When I see SHINY THINGS! Also when I sneeze!...Excuse me! That's NORMAL! For fire sprites!",
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
      "text": "Here's my promise! Whenever you're cold! Whenever you're sad! Whenever you need......WARMTH! Call me! I'll COME! And I'll hug you! And you'll remember:...even in the coldest moments, there's always something warm waiting. Like ME! Now! Who else needs a hug?! I have HUGS FOR EVERYONE!",
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
      "text": "\"HI! I'mEmber! Iwasjustthinkingabout—oh! You'reHERE! Wantahug? I'mwarm! NotBURNINGwarm! Just......cozywarm! Likeablanket! Aburnyblanket!\"",
      "choices": [
        {
          "text": "A warm hug sounds perfect!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"PERFECT! See? NotBURNING! Just......LOVING! Most people areSCARED! They think 'fire equals OW!' ButI'mDIFFERENT! I'mFRIENDfire!\"",
      "choices": [
        {
          "text": "You're the best hug I've ever had!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"FAST? Well......IhaveSOMANYideas! Like: whatifwehadaparty? AndwhatifitRAINScakes? Andwhatif—sorry. Igotdistracted. WhatwereWETalkingabout?\"",
      "choices": [
        {
          "text": "We were talking about your amazing hugs!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"How? Well......I'mFIRE. ButI'malso......KINDNESS! FirecanBURN. OrfirecanWARM! IchooseWARM! AlwaysWARM!\"",
      "choices": [
        {
          "text": "That's a beautiful choice, Ember!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Dearie me! A visitor! How WONDERFUL! I'm Pippa! I offer advice! I offer TEA! And I whistle when I'm excited! Which is OFTEN! What can this old teapot help you with?",
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
      "text": "Both? EXCELLENT choice! This is my special blend! Chamomile! Honey! A touch of WISDOM! Now! Tell Pippa what's troubling you! Is it love? Work? Existential dread? I've heard it ALL! From thousands of cups!",
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
      "text": "Whistle? I whistle when I'm HAPPY! When I'm EXCITED! When the water boils! It's my......way of singing. Teapots don't have voices like YOU do. But we have WHISTLES! And sometimes......that's enough.",
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
      "text": "Time? Dearie, I have ALL the time! That's what teapots do! We LISTEN! We hold! We......keep things warm. Your words? Your feelings? I'll hold them. Like tea leaves. Like warmth. Like... comfort.",
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
      "text": "Take this. A drop of my essence! When you're sad! Brew it! When you're lonely! Smell it! When you need......remembrance that someone cares! I'm always here! Steeping! Waiting! Whistling! And every cup I pour? It has LOVE. Remember that, dearie. Always.",
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
      "text": "\"Hello, dear! I'm Pippa! I was just brewing! Would you like some tea? I have: chamomile for calming, mint for energy, and......a special blend for new friends!\"",
      "choices": [
        {
          "text": "I'd love some of that special blend!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Special blend? Coming right up! This one has: honey for sweetness, lavender for peace, and......a pinch of island magic! Careful, it's warm! But not Ember-warm!\"",
      "choices": [
        {
          "text": "This tea is delicious! Thank you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Motherly? Oh, dear... I suppose I am! Someone has to be! Chester needs fixing. Sprig needs encouraging. And Bolt......needs someone to tell him to SLOW DOWN!\"",
      "choices": [
        {
          "text": "You're right! Bolt DOES need to slow down!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"When happy? I whistle when I'm happy! When I'm sad! When I'm......thinking! Hudson says I whistle during his tea lectures. I say his lectures need WHISTLING!\"",
      "choices": [
        {
          "text": "Hudson's lectures DO need whistling!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "...Greetings. I am Orion. I am......wise beyond ages. I map constellations. I speak... slowly. And I have seen... many things. You seek... knowledge? Or... simply... starlight?",
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
      "text": "Knowledge. Very well. See that star? It died... a thousand years ago. But its light......still reaches us. Lesson: What is gone... may still illuminate. What is past... may still guide. This is... wisdom.",
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
      "text": "Starlight. And... company. Rare. Most seek... my knowledge. My maps. My......wisdom. But you? You seek... ME. This is... unexpected. And......pleasant.",
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
      "text": "Most beautiful? I have seen... nebulae born. Galaxies... collide. Stars... die. But the most beautiful?...is this. A moment. A connection. Two beings... under infinite sky. The cosmos is vast. But THIS? This is... rare.",
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
      "text": "Take this. A star map. Not of the sky. Of......your path. See this star? It is... your beginning. This? Your... challenge. And this bright one? Your... destination. Keep it. When lost... look. The stars... will guide. And remember:...you are made of star-stuff. You belong... to the cosmos. Always.",
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
      "text": "\"Greetings... I am Orion. I was... mapping. The constellations... shift. Someone must... record them.\"",
      "choices": [
        {
          "text": "You map constellations? Like Selene?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Like Selene? She... arranges. I... record. She is the artist. I am the... scribe. Both are... necessary.\"",
      "choices": [
        {
          "text": "That's a beautiful way to put it!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Like the sky? Yes... I am... of the stars. Not FROM them. OF them. We are older than... words. Older than... dreams.\"",
      "choices": [
        {
          "text": "You're older than dreams? That's incredible!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"How? Like this. Each star... has a name. A purpose. Some forget. I remind them.\"",
      "choices": [
        {
          "text": "Can I see my star on your scroll?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "OH! HI! I'm Nixie! I'm BUBBLY! I love GOSSIP! Wait, what was I—? OH RIGHT! Did you HEAR about what happened at the pond? Or was it the river? Hmm. Anyway! Want to CHAT? I know EVERYTHING! Well. Most things. Sometimes!",
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
      "text": "GOSSIP? Okay! So! What was I saying? OH! The otter! He stole a—wait, was it a fish? Or a shiny rock? UGH! My memory! But it was DRAMATIC! There was splashing! And gasping! And—what were we talking about?",
      "choices": [
        {
          "text": "The otter! And the dramatic theft!",
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
      "text": "Forget? YES! It's my thing! I start sentences! And END differently! The other fish say 'Nixie, focus!' But I say 'Life is SHORT! Like my attention span!' Oops! Sorry! What was I—? OH! Being adorable!",
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
      "text": "MYSELF? I'm a GOLDFISH! I wear a CROWN! It's not REAL royalty, but I like it! I swim! I gossip! I forget! I REMEMBER! Wait, which one? Oh well! I'm HAPPY! That's what matters!",
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
      "text": "Here's a SECRET! Even though I forget......I remember FRIENDS. I might forget YOUR NAME. Or WHAT we talked about. Or WHY you're here. But I'll remember... you made me SMILE. And that's the gossip worth keeping! Come back! I'll have NEW gossip! Or I'll forget! Either way, it'll be FUN!",
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
      "text": "\"HI! I'mNixie! Oh! DidImentionI'mNixie? Imight'vementionedit! Anyway! IheardSOMETHING! AboutSOMEONE! WhatwasitAGAIN?\"",
      "choices": [
        {
          "text": "You heard something? Do tell!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"DoTell? Okayokay! Itwasabout......someone! Andthey......didsomething! WasitHudson? OrZephyr? Oh! Iremember! Itwasabout......whatwasitABOUT?\"",
      "choices": [
        {
          "text": "Don't worry! We can figure it out together!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Okay? You'resoKIND! Mostsay 'Nixie, REMEMBER!' ButIcan't! Mymemoryislike......asieve! ButaPRETTYsieve! Withshinybits!\"",
      "choices": [
        {
          "text": "A shiny sieve is still useful!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Adorable? Itwasagift! From......someone! Zora? OrOrion? Theybothgivegifts! ButthisoneisMINE! Iwearitalways! EvenwhenIsleep! Whichisoften!\"",
      "choices": [
        {
          "text": "It suits you perfectly!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "...I am Cobble. I do not move. I do not......speak often. But....I love RIDDLES. About strength. About stillness. About......what it means to ENDURE. Do you seek... a riddle?",
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
      "text": "Very well. What is strong enough to hold mountains... yet fragile enough to break with a word? Think. The answer... is not what you expect. Take your time. I have... centuries.",
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
      "text": "At all? I move. When......a secret is revealed. When truth is spoken. When......someone understands. Until then? I am stone. I wait. I endure. This is... my strength.",
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
      "text": "Strength. Is not motion. Is not... noise. Strength is... ENDURING. Standing. When storms come. When time passes. When......all else crumbles. Stillness is not weakness. It is......unbreakable resolve.",
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
      "text": "The answer. Is... PROMISE. Promises hold mountains. Shape civilizations. But break with... a word. A lie. A betrayal. Remember this: Be stone. Keep your promises. Endure. And......you will move... when it matters.",
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
      "text": "\"......You approach....I am Cobble....I stand....I watch....Sometimes... I move.\"",
      "choices": [
        {
          "text": "You move? When?",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"...When......a secret... is revealed....I have stood... for centuries....Waiting....Listening....Some secrets... are worth... moving for.\"",
      "choices": [
        {
          "text": "What's the best secret you've heard?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"...How long......Before the dream....Before the first... tide....I was placed here....To guard....To wait....I am... patient.\"",
      "choices": [
        {
          "text": "You're older than the dream itself?!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"...What......Truth....When beings speak... truth......I know....Most do not....You... might.\"",
      "choices": [
        {
          "text": "I promise to always be honest with you!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "HEEEEY! I'm Zeph! Well. That's my NAME! I'm actually......EVERYWHERE! I'm the WIND! The BREEZE! The......leaf-teaser! Can you SEE me? No! But you can FEEL me!",
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
      "text": "TICKLISH? GOOD! That means you're ALIVE! That means you FEEL! Most people don't notice me. They just say 'oh, it's windy.' But YOU?...you notice ME! That's......nice.",
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
      "text": "Invisible? YES! But! Invisible doesn't mean... GONE! I'm HERE! In your hair! On your skin! In the......dancing leaves! You don't need to SEE me to KNOW me! Feel is... stronger than sight!",
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
      "text": "MORE?  Watch! This is my ART! My DANCE! My......symphony! Each leaf is a NOTE! Each swirl is a SONG! And you?...you're the AUDIENCE! The BEST audience!",
      "choices": [
        {
          "text": "BRAVO! Encore! Encore!",
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
      "text": "Here. A leaf from my dance. Hold it. When you feel... still. When you feel... HEAVY. Remember Zeph. Remember the WIND. Remember......that even invisible things MATTER. That even air... can MOVE mountains. Come find me! I'll be......in every breeze. In every whisper. In every... dancing leaf.",
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
      "text": "\"Helloooo~ I'm Zeph! Can't see me? That's the POINT! But you can see what I DO! Pretty, right?\"",
      "choices": [
        {
          "text": "The dancing leaves ARE pretty!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Pretty? I make them DANCE! Watch! That's a waltz! That's a jig! I know ALL the dances! Even ones I made up!\"",
      "choices": [
        {
          "text": "Teach me the leaf waltz!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Cool? It's CONVENIENT! I can go ANYWHERE! Through walls! Through trees! Through......Grumble's caves! He HATES that! Says I 'mess up his crystals!' I say I 'add atmosphere!'\"",
      "choices": [
        {
          "text": "Grumble does hate mess, doesn't he?",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Feel me? Like this......see? I'm not just AIR! I'm... PRESENCE! You can't SEE presence! But you can FEEL it!\"",
      "choices": [
        {
          "text": "I can feel you! It's like a warm hug!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Um. H-hello. I'm Kiko. I......I like carrots. And puzzles. Simple ones! Nothing too HARD! Do you... do you like puzzles? Or......am I talking too much?",
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
          "text": "Here, have a carrot!",
          "next": "c3",
          "friendshipDelta": 0
        }
     ,
        { "text": "Actually, tell me something else...", "next": "alt_start", "friendshipDelta": 0 }
      ]
    },
    "c1": {
      "text": "Perfect? Really? No one......says that. They say 'Kiko, SPEAK UP!' Or 'Kiko, STOP HIDING!' But I'm trying. To be... braver. You make it... easier.",
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
      "text": "Favorite? Um... Jigsaw puzzles! The SIMPLE ones! Not the 1000-piece ones! Those are......TERRIFYING! But 50 pieces? I can do 50 pieces! Sometimes... 100! If I'm feeling BRAVE!",
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
      "text": "CARROT! My FAVORITE! Thank you! You're......very kind. Most people don't......think of me. Or notice. But you......gave me a carrot.",
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
      "text": "Here's......a secret. I'm scared. Of EVERYTHING. But....when I have friends? When I have... CARROTS?...I'm less scared. So....thank you. For seeing me. For......being my friend. I'll... I'll try to be BRAVER. For you.",
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
      "text": "\"U-um... h-hello... I'm... Kiko......I was solving... a puzzle......want to help?\"",
      "choices": [
        {
          "text": "I'd love to help with your puzzle!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Help? Okay......it's a......carrot-sorting puzzle! Red carrots here... orange carrots there......but what about PURPLE carrots?\"",
      "choices": [
        {
          "text": "Purple carrots go in the middle!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Adorable? It was... a gift......from Sprig......he said I looked... 'distinguished'......I don't know what that means... but it sounded NICE...\"",
      "choices": [
        {
          "text": "Sprig was right! You look very distinguished!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Not a puzzle? Well......it's an IMAGINARY puzzle!...the carrot is... the puzzle piece!...and the ground is the board!...see? It makes sense!\"",
      "choices": [
        {
          "text": "It DOES make sense! Imagination puzzles are the best!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "~I am Aurora, child of night and sky~ ~Who paints the darkness where the stars lie~ ~With ribbons bright and colors bold~ ~A story in the light, untold~ Do you... seek beauty?",
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
      "text": "~Rhymes are my natural tongue~ ~Since cosmic dawn, my songs are sung~ ~Some speak in prose, some speak in rhyme~ ~I speak in AURORA... all the time~ Do you... appreciate the verse?",
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
      "text": "~Beauty is what I bring to night~ ~A dance of particles and light~ ~You seek it OUTSIDE, in the sky~ ~But beauty lives... where YOU reside~ Look... within.",
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
      "text": "~My art? You wish to see my ART?~ ~Then let me paint upon your heart~ ~With ribbons wide and colors BRIGHT~ ~A symphony of Northern Light!~ ~What color calls... to YOUR soul?~",
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
      "text": "~Here is my promise, pure and true~ ~The sky will ALWAYS wait for you~ ~When you are sad, look UP at night~ ~I'll paint your darkness into light~ ~Remember this, when days are gray~ ~Aurora's colors... never stray~ ~From those who see... the beauty IN~ ~The cosmic dance... that lives WITHIN~",
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
      "text": "\"Greetings, dear friend, so bold and bright, / I'm Aurora, bearer of northern light. The sky I paint with colors true, / A gift from me, bestowed on you.\"",
      "choices": [
        {
          "text": "You speak in rhymes! That's magical!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Magical, you say, with wonder in your eyes? / It's simply how my spirit flies. Each thought that comes, each word I speak, / Becomes a rhyme, both soft and sleek.\"",
      "choices": [
        {
          "text": "That's the most natural rhyme ever!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Breathtaking, yes, with greens so deep, / And purples that make watchers weep. I dance across the dreamer's sky, / With colors that will never die.\"",
      "choices": [
        {
          "text": "You're a living work of art!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"To teach you rhymes, I'd love to try, / But poetry can't be taught, not I. It comes from heart, from soul, from deep, / From places where the dreamers sleep.\"",
      "choices": [
        {
          "text": "That's beautiful AND rhymed! Perfect!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Ahem. I am Quill. I tell STORIES. I correct GRAMMAR. And I do NOT tolerate......misplaced apostrophes. Do you write? Do you SPEAK? Do you... value PROPER SYNTAX?",
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
      "text": "TEACH you? FINALLY, a worthy student! Lesson One: The semicolon. NOT a comma. NOT a period. It is......a BRIDGE. Between related thoughts! See? ELEGANT! Precise! Most abuse it. TRAGICALLY.",
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
      "text": "Wrong? Perhaps. Perhaps not. Writing is not about PERFECTION. It is about......TRUTH. Clarity. Voice. Grammar serves STORY. Not vice versa. But yes. Your apostrophes... probably NEED work.",
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
      "text": "This? It is SYMBOLIC. A quill without a bow tie is merely... a FEATHER. But WITH it?...I am AUTHOR. I am SCHOLAR. I am......DIGNIFIED. Appearance matters. In writing. In LIFE.",
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
      "text": "Here. A feather. From my collection. Dip it in ink. Write your TRUTH. And remember:...grammar is not CHAINS. It is WINGS. Structure frees. Precision empowers. Now go. Write. And for the love of literature... USE PROPER PUNCTUATION.",
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
      "text": "\"Ahem. I am Quill. I have observed your... sentence structure. It is... adequate. But it could be IMPROVED.\"",
      "choices": [
        {
          "text": "I'd love to improve my sentences!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Improve? Finally! Someone with AMBITION! Rule one: never end a sentence with a preposition. Unless it serves the narrative. Then it is... acceptable.\"",
      "choices": [
        {
          "text": "That's a very flexible rule!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Particular? I am not PARTICULAR! I am......PRINCIPLED! Grammar is the FOUNDATION of communication! Without it......chaos! BARBARISM!\"",
      "choices": [
        {
          "text": "You're right! Grammar is important!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"What's wrong? Well......you said 'I'm' instead of 'I am.' Contractions are the ENEMY of clarity! Also, your posture suggests... uncertain syntax.\"",
      "choices": [
        {
          "text": "I'll work on my syntax posture!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "Good DAY to you! I am Vex! Enthusiast of FINE inventions! Lover of PROPER tea! And I must say......modern technology is CRASS. No SOUL! No ELEGANCE! But YOU? You look... REFINED. Care for a cuppa?",
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
      "text": "EXCELLENT choice! This is Earl Grey! Brewed at EXACTLY 200 degrees! Not like those MICROWAVE barbarians! Tea requires PATIENCE! PRECISION! And......a PROPER vessel! There! Is that not CIVILIZED?",
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
      "text": "Better? OBVIOUSLY! Victorian tech had CHARACTER! BRASS! STEAM! Modern tech is... plastic. Cold. Soulless. We lost something. When we lost the MECHANISM. The VISIBILITY. The......BEAUTY of function.",
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
      "text": "Functional? WHY thank you! It is my ANTENNA! My PRIDE! Also my tea cozy! MULTIPURPOSE! Victorian design was ALWAYS practical! AND stylish! Unlike modern... HEADWEAR. Tragic.",
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
      "text": "Take this. A strainer. From my PERSONAL set. Use it. Think of me. And remember:...in a world of haste... be VICTORIAN. Be SLOW. Be PRECISE. Be......CIVILIZED. My tea service is ALWAYS open. For friends. For those who appreciate... the FINE things.",
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
      "text": "\"Good day to you! I am Vex! I was just......contemplating the superiority of Victorian engineering! Have you ever seen a PROPER steam engine?\"",
      "choices": [
        {
          "text": "I haven't! Tell me about Victorian engineering!",
          "next": "alt_2a",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2a": {
      "text": "\"Superiority? Where to BEGIN! The PRECISION! The CRAFTSMANSHIP! A Victorian machine could last CENTURIES! Modern tech?...disposable! TRASH!\"",
      "choices": [
        {
          "text": "Your passion for Victorian tech is inspiring!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2b": {
      "text": "\"Incredible? Finally! Someone who APPRECIATES aesthetics! Brass! Copper! VISIBLE GEARS! Not this......sleek modern nonsense! Where is the SOUL?\"",
      "choices": [
        {
          "text": "Your gears have LOTS of soul!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_2c": {
      "text": "\"Tea? ALWAYS! Hudson says my tea is 'acceptable.' That is HIGH praise from a tea cup! Tea and contemplation... the Victorian way!\"",
      "choices": [
        {
          "text": "Hudson's approval IS significant!",
          "next": "alt_final",
          "friendshipDelta": 1
        }
      ]
    },
    "alt_final": {
      "text": "",
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
      "text": "...I am Cosmos. I am... the island. I am Chester's humor. Birch's wisdom. Luna's fire. Zeph's freedom. I am EVERY NPC you've met. And......I am NONE. I am the SPIRIT. Of this place. Of this... ADVENTURE.",
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
      "text": "Incredible? I am... INEVITABLE. Every conversation. Every choice. Every......connection you've made. It lives in ME. In the island's SOUL. You didn't just meet NPCs, traveler. You met... PIECES of me.",
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
      "text": "Every one. Chester's puns LIVE. Birch's leaves RUSTLE. Luna's eyes GLOW. Fifty-eight souls. Fifty-eight STORIES. All woven into... THIS. Into the fabric of Cozy Island. And now......into YOURS.",
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
      "text": "Why now? Because you are... READY. Fifty-eight conversations. Hundreds of choices. You have listened. You have learned. You have......become part of this place. The finale is not an END. It is... RECOGNITION.",
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
      "text": "Here is my truth. The island is not a PLACE. It is a COMMUNITY. A FAMILY. And you?...you are HOME. Every NPC awaits you. Every story CONTINUES. Every choice... MATTERS. This is not goodbye. It is... 'until next time.' The island remembers. COSMOS remembers. And we......will always... welcome you HOME.\" *The light settles into your heart as 58 voices whisper in unison: \"Thank you for visiting Cozy Island.",
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

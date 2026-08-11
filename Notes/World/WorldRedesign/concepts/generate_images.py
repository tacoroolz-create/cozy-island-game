#!/usr/bin/env python3
"""Generate biome concept images via OpenRouter's image API."""
import os, sys, base64, requests, time

API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not API_KEY:
    # Load from .env files
    for p in [os.path.expanduser("~/.hermes/.env"),
              os.path.expanduser("~/.hermes/profiles/cozy-island/.env")]:
        if os.path.exists(p):
            with open(p) as f:
                for line in f:
                    if line.startswith("OPENROUTER_API_KEY="):
                        API_KEY = line.split("=",1)[1].strip()
                        break
        if API_KEY:
            break
if not API_KEY:
    print("ERROR: No OPENROUTER_API_KEY found"); sys.exit(1)

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL = "google/gemini-2.5-flash-image"  # Nano Banana — cheap, good quality

BIOMES = [
    ("overview", "Pixel art concept mockup of a cozy tropical island seen from above, 16-bit SNES RPG style. The island has distinct biome regions: northwest corner has a sandy beach with a small wooden dock and ocean horizon. Moving inland from the beach: a bright green meadow with wildflowers, then a woods area with regular trees, then a town area with small cobblestone paths and cottages. Southeast has a denser darker deep woods with a stone fortress visible. East side has a mountain area with rocky cliffs. A city area with larger buildings sits between the town and mountain. Warm cozy color palette, top-down perspective, soft pixel art style, no text labels.", "landscape"),
    ("beach", "Pixel art concept of a cozy northwest beach biome on a tropical island, 16-bit SNES style top-down view. Sandy beach in the corner with gentle waves, a small wooden dock extending into turquoise ocean, a clear horizon line. Scattered seashells, driftwood, and a few palm trees near the grass line. Warm golden sand, soft blue water, cozy and inviting atmosphere. No text.", "landscape"),
    ("meadow", "Pixel art concept of a cozy meadow biome on a dream island, 16-bit SNES style top-down view. Lush green grass with wildflowers in pink, yellow, and purple. Butterfly-friendly flower patches, a small clear pond, tall grass tufts swaying. Soft rolling terrain, dappled sunlight feeling. Warm and peaceful cozy atmosphere. No text.", "landscape"),
    ("woods", "Pixel art concept of a cozy woods biome on a dream island, 16-bit SNES style top-down view. Mixed deciduous trees with green canopies, dappled light filtering through, a winding dirt path through the trees, small clearings with mushrooms and ferns. A creek or stream running through. Peaceful forest atmosphere, warm greens and browns. No text.", "landscape"),
    ("town", "Pixel art concept of a cozy town biome on a dream island, 16-bit SNES style top-down view. Small cottages with thatched roofs along cobblestone paths, a little town square with a fountain, garden plots, lantern posts, and a cozy market stall or two. Warm inviting colors, homey and charming. No text.", "landscape"),
    ("city", "Pixel art concept of a cozy city biome on a dream island, 16-bit SNES style top-down view. Slightly larger and more urban than a town — multi-story buildings with shop signs, a plaza with benches, street lamps, potted plants, and a train or trolley track. Bustling but still cozy and dreamlike, not gritty. Warm urban palette. No text.", "landscape"),
    ("deep_woods", "Pixel art concept of a slightly spooky deep woods biome on a dream island, 16-bit SNES style top-down view. Darker, denser forest with twisted trees, glowing mushrooms, mist between trunks, and a stone fortress visible through the trees. A dark bottomless pit in a clearing. Spooky but still cozy and dreamlike, not horror. Cool blue-green palette with purple shadows. No text.", "landscape"),
    ("mountain", "Pixel art concept of a cozy mountain biome on a dream island, 16-bit SNES style top-down view. Rocky cliffs and slopes with sparse pine trees, a winding mountain path, a cave entrance, patches of snow at the peak, and a scenic overlook. Goats or mountain creatures on the rocks. Cool blue-gray palette with warm highlights. Cozy alpine atmosphere. No text.", "landscape"),
]

def generate(name, prompt, aspect):
    out_path = os.path.join(OUT_DIR, f"{name}.png")
    if os.path.exists(out_path):
        print(f"  SKIP {name} (already exists)"); return True
    print(f"  Generating {name}...")
    ar = "16:9" if aspect == "landscape" else "1:1"
    try:
        resp = requests.post(
            "https://openrouter.ai/api/v1/images",
            headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
            json={"model": MODEL, "prompt": prompt, "aspect_ratio": ar, "n": 1},
            timeout=120
        )
        if resp.status_code != 200:
            print(f"  ERROR {name}: HTTP {resp.status_code} — {resp.text[:300]}")
            return False
        data = resp.json()
        if "data" not in data or not data["data"]:
            print(f"  ERROR {name}: no data in response — {str(data)[:300]}")
            return False
        img_b64 = data["data"][0].get("b64_json")
        if not img_b64:
            print(f"  ERROR {name}: no b64_json — {str(data['data'][0])[:300]}")
            return False
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(img_b64))
        print(f"  OK {name} -> {out_path}")
        return True
    except Exception as e:
        print(f"  ERROR {name}: {e}")
        return False

print(f"Generating {len(BIOMES)} biome concept images to {OUT_DIR}")
ok = 0
for name, prompt, aspect in BIOMES:
    if generate(name, prompt, aspect):
        ok += 1
    time.sleep(2)  # rate limit courtesy
print(f"\nDone: {ok}/{len(BIOMES)} images generated")
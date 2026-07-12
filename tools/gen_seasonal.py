#!/usr/bin/env python3
"""Parse NeighborRewrite/NPCConvo{Season}{2-5}[_T2|_T3].txt into the game's
branching-dialogue tree shape and emit src/dialogue_seasonal_extra.py-> .js.

Tree shape (matches existing WRITTEN_DIALOGUES/SEASONAL_DIALOGUES):
  start -> c1/c2/c3 (turn2) -> c1a..c3c (turn3 finals)
Choice index i -> next 'c{i}'; turn3 second letter -> 'c{i}{a|b|c}'.
"""
import json, re, sys, glob, os
from collections import OrderedDict

ROOT = "/Users/clockworkwellness/Desktop/Cozy Island Game"
NR = os.path.join(ROOT, "NeighborRewrite")

LETTER = {'A': 1, 'B': 2, 'C': 3}
SUB = {'A': 'a', 'B': 'b', 'C': 'c'}

def first_quote(line):
    # text between the first and last double-quote on the line
    i = line.find('"')
    j = line.rfind('"')
    if i == -1 or j <= i:
        return None
    return line[i+1:j].strip()

def parse_file(path):
    """Return OrderedDict {name: tree}."""
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()
    # split into character blocks
    chars = OrderedDict()
    cur_name = None
    cur = []
    def flush():
        if cur_name:
            chars[cur_name] = build_tree(cur, cur_name, path)
    for ln in lines:
        m = re.match(r'^CHARACTER\s+\d+:\s*(.+?)\s*\(', ln)
        if m:
            flush()
            cur_name = m.group(1).strip()
            cur = []
        elif cur_name is not None:
            cur.append(ln)
    flush()
    return chars

def split_turns(block):
    """Yield (label, [lines]) for each TURN segment."""
    turns = []
    label = None
    buf = []
    for ln in block:
        m = re.match(r'^TURN\s+(\S+)', ln)
        if m:
            if label:
                turns.append((label, buf))
            label = m.group(1)  # '1', '2A', '3AB', ...
            buf = []
        elif label:
            buf.append(ln)
    if label:
        turns.append((label, buf))
    return turns

def turn_text(buf):
    """First quoted line that appears before PLAYER CHOICES."""
    for ln in buf:
        if ln.strip().startswith('PLAYER CHOICES'):
            break
        if re.match(r'^\[\d+\]', ln.strip()):
            continue
        q = first_quote(ln)
        if q:
            return q
    return ""

def turn_choices(buf):
    out = []
    for ln in buf:
        m = re.match(r'^\[(\d+)\]\s*(.+)$', ln.strip())
        if m:
            q = first_quote(m.group(2)) or m.group(2).strip().strip('"')
            out.append(q)
    return out

def _nonempty(buf):
    return bool(turn_text(buf)) or any(turn_choices(buf))

def build_tree(block, name, path):
    # Some source files append a placeholder DUPLICATE of each tree with blank
    # choices. Keep the first non-empty occurrence of each TURN label; only let a
    # later copy replace an earlier one if the earlier was empty.
    turns = {}
    for lbl, buf in split_turns(block):
        if lbl not in turns or (not _nonempty(turns[lbl]) and _nonempty(buf)):
            turns[lbl] = buf
    if '1' not in turns:
        sys.exit(f"No TURN 1 for {name} in {path}")
    tree = OrderedDict()
    # start
    t1 = turns['1']
    start_choices = turn_choices(t1)
    tree['start'] = {
        "text": turn_text(t1),
        "choices": [
            {"text": c, "next": f"c{i+1}", "friendshipDelta": 0}
            for i, c in enumerate(start_choices)
        ],
    }
    # turn2 branches: labels like 2A,2B,2C
    for lbl, buf in list(turns.items()):
        m = re.fullmatch(r'2([A-C])', lbl)
        if not m:
            continue
        idx = LETTER[m.group(1)]
        key = f"c{idx}"
        ch = turn_choices(buf)
        tree[key] = {
            "text": turn_text(buf),
            "choices": [
                {"text": c, "next": f"{key}{SUB[chr(ord('A')+j)]}", "friendshipDelta": 1}
                for j, c in enumerate(ch)
            ],
        }
    # turn3 finals: 3XY
    for lbl, buf in list(turns.items()):
        m = re.fullmatch(r'3([A-C])([A-C])', lbl)
        if not m:
            continue
        key = f"c{LETTER[m.group(1)]}{SUB[m.group(2)]}"
        tree[key] = {
            "text": turn_text(buf),
            "choices": [{"text": "Goodbye!", "next": None, "friendshipDelta": 1}],
        }
    return tree

def merge_group(pattern):
    """Merge files 2-5 for a given pattern into one {name: tree}."""
    merged = OrderedDict()
    files = sorted(glob.glob(os.path.join(NR, pattern)))
    if not files:
        return None
    for fp in files:
        for name, tree in parse_file(fp).items():
            merged[name] = tree
    return merged

SEASONS = ["Sweet", "Saucy", "Cool", "Yeesh"]

def main():
    sweet_base = merge_group("NPCConvoSweet[2-5].txt")
    variants = OrderedDict()  # season -> name -> [tree,...]
    for s in SEASONS:
        for suffix in ("_T2", "_T3"):
            grp = merge_group(f"NPCConvo{s}[2-5]{suffix}.txt")
            if not grp:
                continue
            vs = variants.setdefault(s, OrderedDict())
            for name, tree in grp.items():
                vs.setdefault(name, []).append(tree)

    def dump(obj):
        return json.dumps(obj, indent=2, ensure_ascii=False)

    out = []
    out.append("// ===== SEASONAL DIALOGUE — Sweet base + Tree-2/Tree-3 variants =====")
    out.append("// AUTO-GENERATED from NeighborRewrite/NPCConvo{Season}{2-5}[_T2|_T3].txt")
    out.append("// by scratchpad/gen_seasonal.py. Do not hand-edit; re-run the generator.")
    out.append("// Loaded after dialogue_written.js; chooseConversationTree() picks a")
    out.append("// random tree from base + variants during the matching season.")
    out.append("")
    out.append("// Sweet had no seasonal bank before; add it to SEASONAL_DIALOGUES.")
    out.append("if (typeof SEASONAL_DIALOGUES !== 'undefined') {")
    out.append("  SEASONAL_DIALOGUES['Sweet'] = " + dump(sweet_base) + ";")
    out.append("}")
    out.append("")
    out.append("const SEASONAL_VARIANTS = " + dump(variants) + ";")
    out.append("")

    js = "\n".join(out)
    dest = os.path.join(ROOT, "src", "dialogue_seasonal_extra.js")
    with open(dest, "w", encoding="utf-8") as f:
        f.write(js)

    # --- self-check ---
    def check_tree(t):
        assert t['start']['text'], "empty start text"
        keys = set(t.keys())
        for k, node in t.items():
            for c in node['choices']:
                nx = c['next']
                assert nx is None or nx in keys, f"dangling next {nx} in key {k}"
                assert c['text'], f"empty choice text in {k}"
    for name, t in sweet_base.items():
        check_tree(t)
    for s, names in variants.items():
        for name, arr in names.items():
            for t in arr:
                check_tree(t)
    print(f"Sweet base chars: {len(sweet_base)}")
    for s in SEASONS:
        v = variants.get(s, {})
        counts = {n: len(a) for n, a in v.items()}
        distinct = set(counts.values())
        print(f"{s}: {len(v)} chars, trees-per-char {distinct}")
    print("wrote", dest, f"({len(js)} bytes)")

if __name__ == "__main__":
    main()

// ===== HOGGY AI CHAT =====
// Free-text conversation with Hoggy, powered by a LOCAL model via Ollama.
// Unlocks after his first treat (hog.treated). Everything here is a DOM overlay
// on top of the p5 canvas — the game's own dialogue box is multiple-choice only,
// so a real <input> is the native, lazy way to let the player type.
//
// SETUP: install Ollama (https://ollama.com), then `ollama pull gemma3:4b`.
// Ollama runs a background server on localhost:11434; nothing else to configure.
// Swap the model below for whatever you've pulled.
const HOG_CHAT_MODEL = 'gemma3:4b';
const OLLAMA_URL = 'http://localhost:11434/api/chat';

// Conversation history for the CURRENT chat only. Reset every time the panel
// closes — the model is stateless, so a dropped array IS a clean slate. This is
// the "clear at the end to prep for next time" you wanted; it's automatic.
let hogChatMessages = [];
let hogChatBusy = false;
let hogChatEl = null; // { root, log, input } once built

// Build Hoggy's personality + live island state into a system prompt. Pulls from
// the same data the rest of the game already knows (favorites, friendship tier,
// routine, holiday) so his replies are grounded in what's actually happening.
function buildHogSystemPrompt(h) {
    const player = (typeof PLAYER_NAME !== 'undefined') ? PLAYER_NAME : 'Dreamer';
    const tod = (typeof getTimeOfDay === 'function') ? getTimeOfDay() : 'afternoon';
    const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : null;
    const island = (typeof world !== 'undefined' && world && world.islandName) ? world.islandName : 'the island';
    const routineLabel = { morning: 'rooting around in the dirt near the trees', day: 'lazing on the warm beach sand', evening: 'snuffling around the pond' };
    const routine = (typeof h.currentRoutine === 'function') ? h.currentRoutine() : 'day';
    const tier = (typeof h.getTier === 'function') ? h.getTier() : 1;
    const tierMood = ['', 'warming up to them', 'friendly and comfortable', 'very fond of them', 'devoted to them — they are your favorite person in the whole world'][tier];
    const faves = Array.from(typeof HOG_FAVORITES !== 'undefined' ? HOG_FAVORITES : []).join(', ').replace(/_/g, ' ');

    return [
        `You ARE ${h.name}, a real wild hog (a pig) who lives on a cozy island. You are NOT an AI, an assistant, or a program — never break character, never mention any of that.`,
        `You are talking with ${player}, the kind human who tamed you with treats. You adore ${player}. Right now you are feeling ${tierMood}.`,
        ``,
        `How you talk: warm, simple, earthy, and playful. Short — 1 to 3 sentences. You're a pig, so you love food, mud, sunny naps, and rooting for snacks. Now and then (not every line) add a little action beat like *snort*, *happy oink*, or *wiggles ears*. Never use big fancy words.`,
        `Your favorite treats are: ${faves}. You'll happily gush about food.`,
        `You know island things: trees, the beach, the pond, the neighbors, the seasons, treats, mud. You do NOT know anything about the human world, technology, phones, or the internet — if asked, be sweetly baffled and change the subject back to snacks or the island.`,
        ``,
        `Right now: it is ${tod}, and you are ${routineLabel[routine] || 'wandering the island'} on ${island}.`,
        holiday ? `It is a special island day: ${holiday.name}. ${holiday.desc || ''} You're a little extra excited about it.` : `It's an ordinary, lovely island day.`
    ].join('\n');
}

// A couple of example turns to lock the voice in — few-shot matters more than
// model size for staying in character on a small local model.
function hogFewShot() {
    return [
        { role: 'user', content: 'Hi Hoggy!' },
        { role: 'assistant', content: '*happy oink* You came to see me! Did you bring a snack? ...No? That\'s okay. I like you even more than berries. Almost.' },
        { role: 'user', content: 'What have you been up to today?' },
        { role: 'assistant', content: 'Rooted up half the island looking for truffles, then took a big warm nap in the sun. *snort* A very good day so far.' }
    ];
}

function ensureHogChatDom() {
    if (hogChatEl) return hogChatEl;
    const container = document.getElementById('game-container') || document.body;

    const root = document.createElement('div');
    root.id = 'hog-chat';
    root.style.cssText = [
        'position:absolute', 'left:2%', 'right:2%', 'bottom:2%', 'height:44%',
        'display:none', 'flex-direction:column', 'z-index:500',
        'background:rgba(10,14,40,0.94)', 'border:2px solid rgb(230,236,255)',
        'border-radius:6px', 'box-shadow:0 0 0 2px rgba(40,50,90,1) inset',
        'font-family:Silkscreen,"Courier New",monospace', 'color:#eef', 'overflow:hidden'
    ].join(';');

    const header = document.createElement('div');
    header.style.cssText = 'padding:6px 10px;font-size:13px;color:#ffdca8;border-bottom:1px solid #2a3560;flex:0 0 auto';
    root.appendChild(header);

    const log = document.createElement('div');
    log.style.cssText = 'flex:1 1 auto;overflow-y:auto;padding:8px 10px;font-size:12px;line-height:1.5;display:flex;flex-direction:column;gap:6px';
    root.appendChild(log);

    const bar = document.createElement('div');
    bar.style.cssText = 'flex:0 0 auto;display:flex;gap:6px;padding:8px;border-top:1px solid #2a3560';
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 200;
    input.placeholder = 'Say something to Hoggy…  (Esc to leave)';
    input.style.cssText = 'flex:1;background:#05070f;border:1px solid #3a4780;border-radius:4px;color:#eef;font-family:inherit;font-size:12px;padding:6px 8px;outline:none';
    bar.appendChild(input);
    root.appendChild(bar);

    // Keep keystrokes away from p5's window-level handlers (movement, hotkeys).
    ['keydown', 'keyup', 'keypress'].forEach(ev =>
        input.addEventListener(ev, e => e.stopPropagation()));
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); sendHogMessage(); }
        else if (e.key === 'Escape') { e.preventDefault(); closeHogChat(); }
    });

    container.appendChild(root);
    hogChatEl = { root, log, input, header };
    return hogChatEl;
}

function appendHogChatLine(who, text) {
    const el = ensureHogChatDom();
    const line = document.createElement('div');
    const mine = who === 'me';
    line.style.cssText = 'max-width:85%;padding:4px 8px;border-radius:6px;white-space:pre-wrap;' +
        (mine ? 'align-self:flex-end;background:#243056;color:#dfe6ff'
              : 'align-self:flex-start;background:#3a2a12;color:#ffe6c2');
    line.textContent = text;
    el.log.appendChild(line);
    el.log.scrollTop = el.log.scrollHeight;
    return line;
}

function openHogChat(h) {
    if (!h) return;
    const el = ensureHogChatDom();
    hogChatMessages = [{ role: 'system', content: buildHogSystemPrompt(h) }, ...hogFewShot()];
    el.header.textContent = '🐷 ' + h.name;
    el.log.innerHTML = '';
    el.root.style.display = 'flex';
    if (typeof gameState !== 'undefined' && typeof STATE !== 'undefined') gameState = STATE.DIALOGUE;
    if (typeof audioManager !== 'undefined' && audioManager) audioManager.playSFX('oink', 0.6);
    appendHogChatLine('hog', h.name + ' trots over and looks at you expectantly.');
    setTimeout(() => el.input.focus(), 0);
}

function closeHogChat() {
    if (!hogChatEl) return;
    hogChatEl.root.style.display = 'none';
    hogChatEl.input.blur();
    hogChatMessages = [];   // clean slate for next time
    hogChatBusy = false;
    if (typeof gameState !== 'undefined' && typeof STATE !== 'undefined') gameState = STATE.PLAYING;
}

async function sendHogMessage() {
    if (hogChatBusy) return;
    const el = ensureHogChatDom();
    const text = el.input.value.trim();
    if (!text) return;
    el.input.value = '';
    appendHogChatLine('me', text);
    hogChatMessages.push({ role: 'user', content: text });

    hogChatBusy = true;
    el.input.disabled = true;
    const replyLine = appendHogChatLine('hog', '…');
    let reply = '';

    try {
        const resp = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: HOG_CHAT_MODEL, messages: hogChatMessages, stream: true })
        });
        if (!resp.ok || !resp.body) throw new Error('Ollama returned ' + resp.status);

        // Ollama streams newline-delimited JSON; reveal tokens as they arrive
        // (this streaming IS the typewriter effect, and it hides model latency).
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            const lines = buf.split('\n');
            buf = lines.pop();
            for (const ln of lines) {
                if (!ln.trim()) continue;
                const obj = JSON.parse(ln);
                if (obj.message && obj.message.content) {
                    reply += obj.message.content;
                    replyLine.textContent = reply;
                    el.log.scrollTop = el.log.scrollHeight;
                }
            }
        }
        if (reply.trim()) hogChatMessages.push({ role: 'assistant', content: reply });
        else replyLine.textContent = '*' + (hogChatEl.header.textContent.replace('🐷 ', '') || 'Hoggy') + ' just snorts, out of words.*';
    } catch (err) {
        // Most likely: Ollama isn't running, or the model isn't pulled.
        replyLine.textContent = '(Hoggy tilts his head — his thoughts are offline. Is Ollama running with `' + HOG_CHAT_MODEL + '` pulled?)';
        console.error('[HOG CHAT]', err);
    } finally {
        hogChatBusy = false;
        el.input.disabled = false;
        el.input.focus();
    }
}

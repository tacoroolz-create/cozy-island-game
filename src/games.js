// ===== MINIGAMES =====
// Neighbor challenges: tic-tac-toe, rhythm game

if (typeof STATE !== 'undefined' && !STATE.MINIGAME) STATE.MINIGAME = 'minigame';

let activeMinigame = null;

class Minigame {
    constructor(opponent) {
        this.opponent = opponent;
        this.state = 'playing';
        this.result = null;
    }

    update(dt) {}
    render() {}
    onKey(key) {}
    onClick(x, y) {}
    getResult() { return this.result; }

    end(result) {
        this.result = result;
        this.state = 'finished';
        // Apply friendship delta
        if (this.opponent) {
            if (result === 'win') this.opponent.gainGift(2);
            else if (result === 'draw') this.opponent.gainGift(1);
        }
        // Prize games (the Black Goddess dance-off) pay IOUs on a win.
        if (result === 'win' && this.prizeIOUs && typeof awardClubPrize === 'function') {
            awardClubPrize(this.prizeIOUs);
        }
        const hadOpponent = !!this.opponent;
        setTimeout(() => {
            activeMinigame = null;
            // Return inside if the game was played indoors (the club dance-off).
            gameState = (typeof insideBuilding !== 'undefined' && insideBuilding) ? STATE.INSIDE : STATE.PLAYING;
            if (hadOpponent) {
                notify(result === 'win' ? 'You won! (+2 friendship)' : result === 'draw' ? 'Draw! (+1 friendship)' : 'You lost!');
            } else {
                notify(result === 'win' ? 'You owned the dance floor!' : 'The decks win this round.');
            }
        }, 2000);
    }
}

class TicTacToe extends Minigame {
    constructor(opponent) {
        super(opponent);
        this.grid = [['','',''],['','',''],['','','']];
        this.playerTurn = true;
        this.aiDelay = 0;
        this.selected = { row: 0, col: 0 };
    }

    update(dt) {
        if (this.state !== 'playing') return;
        if (!this.playerTurn) {
            this.aiDelay += dt;
            if (this.aiDelay > 800) {
                this.aiMove();
                this.playerTurn = true;
                this.aiDelay = 0;
            }
        }
    }

    aiMove() {
        // Simple AI: try to win, block, or random
        const moves = [];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (this.grid[r][c] === '') moves.push({r, c});
            }
        }
        if (moves.length === 0) return;

        // Try to win
        for (const m of moves) {
            this.grid[m.r][m.c] = 'O';
            if (this.checkWin() === 'O') { this.end('lose'); return; }
            this.grid[m.r][m.c] = '';
        }
        // Block player
        for (const m of moves) {
            this.grid[m.r][m.c] = 'X';
            if (this.checkWin() === 'X') { this.grid[m.r][m.c] = 'O'; return; }
            this.grid[m.r][m.c] = '';
        }
        // Random
        const move = moves[Math.floor(Math.random() * moves.length)];
        this.grid[move.r][move.c] = 'O';
        if (this.checkWin() === 'O') { this.end('lose'); return; }
        if (this.checkFull()) { this.end('draw'); return; }
    }

    checkWin() {
        const g = this.grid;
        const lines = [
            [g[0][0],g[0][1],g[0][2]], [g[1][0],g[1][1],g[1][2]], [g[2][0],g[2][1],g[2][2]],
            [g[0][0],g[1][0],g[2][0]], [g[0][1],g[1][1],g[2][1]], [g[0][2],g[1][2],g[2][2]],
            [g[0][0],g[1][1],g[2][2]], [g[0][2],g[1][1],g[2][0]]
        ];
        for (const line of lines) {
            if (line[0] && line[0] === line[1] && line[1] === line[2]) return line[0];
        }
        return null;
    }

    checkFull() {
        return this.grid.every(row => row.every(cell => cell !== ''));
    }

    onKey(keyCode) {
        if (this.state !== 'playing' || !this.playerTurn) return;

        if (keyCode === UP_ARROW) this.selected.row = (this.selected.row - 1 + 3) % 3;
        else if (keyCode === DOWN_ARROW) this.selected.row = (this.selected.row + 1) % 3;
        else if (keyCode === LEFT_ARROW) this.selected.col = (this.selected.col - 1 + 3) % 3;
        else if (keyCode === RIGHT_ARROW) this.selected.col = (this.selected.col + 1) % 3;
        else if (keyCode === ENTER || keyCode === RETURN) {
            if (this.grid[this.selected.row][this.selected.col] === '') {
                this.grid[this.selected.row][this.selected.col] = 'X';
                if (this.checkWin() === 'X') { this.end('win'); return; }
                if (this.checkFull()) { this.end('draw'); return; }
                this.playerTurn = false;
            }
        }
    }

    render() {
        const cw = 160, ch = 160;
        const cx = (width - cw) / 2, cy = (height - ch) / 2 - 10;

        // Background
        fill(20, 14, 10, 240);
        stroke(180, 160, 120);
        rect(cx, cy, cw, ch);
        noStroke();

        // Title
        fill(255, 255, 200);
        textAlign(CENTER, TOP);
        textSize(10);
        textFont('Courier New');
        text('Tic-Tac-Toe vs ' + this.opponent.name, cx + cw/2, cy + 4);

        // Grid
        const gs = 40;
        const gx = cx + (cw - gs * 3) / 2;
        const gy = cy + 22;
        stroke(180, 160, 120);
        strokeWeight(1);
        for (let i = 0; i <= 3; i++) {
            line(gx + i * gs, gy, gx + i * gs, gy + 3 * gs);
            line(gx, gy + i * gs, gx + 3 * gs, gy + i * gs);
        }
        noStroke();

        // Pieces
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const px = gx + c * gs + gs/2;
                const py = gy + r * gs + gs/2;
                if (this.grid[r][c] === 'X') {
                    fill(100, 200, 255);
                    textSize(18);
                    textAlign(CENTER, CENTER);
                    text('X', px, py);
                } else if (this.grid[r][c] === 'O') {
                    fill(255, 100, 100);
                    textSize(18);
                    textAlign(CENTER, CENTER);
                    text('O', px, py);
                }
            }
        }

        // Selection cursor
        if (this.playerTurn) {
            stroke(255, 255, 100);
            strokeWeight(2);
            noFill();
            rect(gx + this.selected.col * gs + 2, gy + this.selected.row * gs + 2, gs - 4, gs - 4);
            noStroke();
        }

        // Status
        fill(200);
        textSize(8);
        textAlign(CENTER, BOTTOM);
        if (this.state === 'finished') {
            text(this.result === 'win' ? 'You won!' : this.result === 'draw' ? 'Draw!' : 'You lost!', cx + cw/2, cy + ch - 4);
        } else {
            text(this.playerTurn ? 'Your turn (Enter to place)' : 'Opponent thinking...', cx + cw/2, cy + ch - 4);
        }
    }
}

class RhythmGame extends Minigame {
    constructor(opponent) {
        super(opponent);
        this.arrows = [];
        this.score = 0;
        this.hits = 0;
        this.misses = 0;
        this.spawnTimer = 0;
        this.targetHits = 10;
    }

    update(dt) {
        if (this.state !== 'playing') return;
        this.spawnTimer += dt;
        if (this.spawnTimer > 800) {
            this.spawnTimer = 0;
            this.arrows.push({ dir: Math.floor(Math.random() * 4), y: 160, hit: false });
        }

        // Move arrows up
        for (const a of this.arrows) {
            a.y -= dt * 0.05;
        }

        // Remove missed arrows
        this.arrows = this.arrows.filter(a => {
            if (a.y < -10 && !a.hit) {
                this.misses++;
                return false;
            }
            return true;
        });

        // Check win/lose
        if (this.hits + this.misses >= this.targetHits) {
            if (this.hits >= 7) this.end('win');
            else if (this.hits >= 4) this.end('draw');
            else this.end('lose');
        }
    }

    onKey(keyCode) {
        if (this.state !== 'playing') return;
        let dir = -1;
        if (keyCode === UP_ARROW) dir = 0;
        else if (keyCode === DOWN_ARROW) dir = 1;
        else if (keyCode === LEFT_ARROW) dir = 2;
        else if (keyCode === RIGHT_ARROW) dir = 3;
        if (dir >= 0) {
            // Hit nearest arrow in hit zone
            for (const a of this.arrows) {
                if (!a.hit && a.dir === dir && Math.abs(a.y - 40) < 20) {
                    a.hit = true;
                    this.hits++;
                    this.score += 100;
                    return;
                }
            }
        }
    }

    render() {
        // Panel centered on width/2 so it lines up with the arrows/hit-zone
        // (which are all drawn relative to width/2). ponytail: centering, not 160.
        fill(20, 14, 10, 240);
        stroke(180, 160, 120);
        rect(width / 2 - 80, 20, 160, 160);
        noStroke();

        fill(255, 255, 200);
        textAlign(CENTER, TOP);
        textSize(10);
        textFont('Courier New');
        text(this.opponent ? 'Rhythm vs ' + this.opponent.name : 'Dance-Off!', width / 2, 24);

        // Hit zone
        stroke(255, 255, 100);
        strokeWeight(1);
        line(width / 2 - 75, 40, width / 2 + 75, 40);
        noStroke();

        // Arrows
        const dirs = ['\u2191', '\u2193', '\u2190', '\u2192'];
        for (const a of this.arrows) {
            if (a.hit) continue;
            const ax = width / 2 - 40 + a.dir * 30;
            fill(a.dir === 0 ? '#4CAF50' : a.dir === 1 ? '#FF5722' : a.dir === 2 ? '#2196F3' : '#FFC107');
            textSize(16);
            textAlign(CENTER, CENTER);
            text(dirs[a.dir], ax, a.y);
        }

        // Score
        fill(200);
        textSize(8);
        textAlign(CENTER, BOTTOM);
        text('Score: ' + this.score + '  Hits: ' + this.hits + '/' + this.targetHits, width / 2, 170);
    }
}

function startMinigameVs(opponent, type) {
    if (type === 'rhythm') {
        activeMinigame = new RhythmGame(opponent);
    } else {
        activeMinigame = new TicTacToe(opponent);
    }
    gameState = STATE.MINIGAME;
}

function updateMinigame(dt) {
    if (activeMinigame) activeMinigame.update(dt);
}

function drawMinigame() {
    if (activeMinigame) activeMinigame.render();
}

function handleMinigameKey(keyCode) {
    if (activeMinigame) {
        activeMinigame.onKey(keyCode);
        return true;
    }
    return false;
}
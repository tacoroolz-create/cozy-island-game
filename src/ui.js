// ===== UI HELPERS =====
// Reusable UI components: panels, buttons, context menus, tooltips

function drawPanel(x, y, w, h) {
    fill(30, 20, 15, 230);
    stroke(180, 160, 120);
    strokeWeight(1);
    rect(x, y, w, h);
    noStroke();
}

function drawButton(x, y, w, h, label, hovered, pressed) {
    if (pressed) {
        fill(80, 70, 50);
    } else if (hovered) {
        fill(60, 50, 35);
    } else {
        fill(40, 30, 20);
    }
    stroke(180, 160, 120);
    strokeWeight(1);
    rect(x, y, w, h);
    noStroke();

    fill(hovered ? 255 : 200);
    textAlign(CENTER, CENTER);
    textSize(10);
    textFont('Courier New');
    text(label, x + w / 2, y + h / 2);
}

// Context menu system
let contextMenu = {
    active: false,
    x: 0,
    y: 0,
    options: [],
    selected: 0
};

function openContextMenu(x, y, options) {
    contextMenu.active = true;
    contextMenu.x = x;
    contextMenu.y = y;
    contextMenu.options = options;
    contextMenu.selected = 0;
}

function closeContextMenu() {
    contextMenu.active = false;
}

function drawContextMenu() {
    if (!contextMenu.active) return;

    const mw = 100;
    const mh = contextMenu.options.length * 14 + 8;
    const mx = constrain(contextMenu.x, 0, width - mw);
    const my = constrain(contextMenu.y, 0, height - mh);

    fill(20, 14, 10, 240);
    stroke(180, 160, 120);
    strokeWeight(1);
    rect(mx, my, mw, mh);
    noStroke();

    for (let i = 0; i < contextMenu.options.length; i++) {
        const opt = contextMenu.options[i];
        const oy = my + 4 + i * 14;
        if (i === contextMenu.selected) {
            fill(255, 255, 100);
            text('\u25B6 ' + opt.text, mx + 6, oy);
        } else {
            fill(200);
            text('  ' + opt.text, mx + 6, oy);
        }
        textAlign(LEFT, TOP);
        textSize(9);
        textFont('Courier New');
    }
}

function handleContextMenuKey(keyCode) {
    if (!contextMenu.active) return false;
    if (keyCode === UP_ARROW) {
        contextMenu.selected = (contextMenu.selected - 1 + contextMenu.options.length) % contextMenu.options.length;
        return true;
    } else if (keyCode === DOWN_ARROW) {
        contextMenu.selected = (contextMenu.selected + 1) % contextMenu.options.length;
        return true;
    } else if (keyCode === ENTER || keyCode === RETURN) {
        const opt = contextMenu.options[contextMenu.selected];
        if (opt.action) opt.action();
        closeContextMenu();
        return true;
    } else if (keyCode === ESCAPE) {
        closeContextMenu();
        return true;
    }
    return false;
}

function drawTooltip(x, y, text_) {
    textSize(8);
    textFont('Courier New');
    const tw = textWidth(text_) + 8;
    fill(0, 0, 0, 220);
    noStroke();
    rect(x, y, tw, 14);
    fill(255);
    textAlign(LEFT, TOP);
    text(text_, x + 4, y + 2);
}
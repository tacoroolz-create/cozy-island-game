# Sprite Tween

In-betweens between two hand-drawn poses. Open `tools/sprite-tween/index.html` (double-click it, or use the game server at `tools/sprite-tween/`).

Pixsplat stays the drawing tool. Export the start pose and the end pose as PNG from the same canvas, at 1× scale. The page slides each pixel toward the pixel of the same color in the other pose, then snaps to the grid. Paint any frame that looks wrong. That frame stays put, and the open frames around it recalculate.

## Hand-off

- **Sprite strip** — one horizontal PNG, frames left to right, for the game.
- **Frames zip** — one PNG per frame, for bringing the poses back into Pixsplat.

## How the match behaves

Pixels of one color only travel to pixels of that same color, so the palette stays the colors you drew. A color used more in the end pose grows in. A color used less shrinks away. Leave a little empty margin around the pose so a moving part is not clipped.

A move of N pixels needs about N − 1 in-betweens to land on every pixel along the way. Fewer frames means some steps jump. More frames repeats a picture once the step is already one pixel.

An upscaled PNG made of solid blocks (a 16×16 drawing saved at 128×128) is read back down to the real pixels. Check **Pixels are already 1×** when the file is already at game size and happens to contain flat blocks.

[[SPRITE_MAP]]

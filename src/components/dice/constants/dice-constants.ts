export const FACE_COORDS: Record<number, { x: number; y: number }> = {
  1: { x: 8, y: 7 },
  2: { x: 4, y: 15 },
  3: { x: 0, y: 11 },
  4: { x: 0, y: 3 },
  5: { x: 4, y: 7 },
  6: { x: 0, y: 7 },
};

// Animation timings
export const FRAME_SPEED_MS = 120;
export const TOTAL_ROLL_TIME_MS = 1500;

// Dice properties
export const DICE_SIDES = 6;

// Sprite sheet properties
// The sprite sheet is a 16x16 grid of images.
export const SPRITE_SHEET_DIMENSION = 16;
// For calculations, we often need dimension - 1 for 0-based indexing.
export const SPRITE_SHEET_MAX_INDEX = SPRITE_SHEET_DIMENSION - 1;

// UI Text
export const ROLLING_TEXT = "Rolling...";
export const ROLL_DICE_TEXT = "Roll Dice";

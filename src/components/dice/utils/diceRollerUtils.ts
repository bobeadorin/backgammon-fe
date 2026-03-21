import { SPRITE_SHEET_MAX_INDEX } from "../constants/dice-constants";

export const getPosition = (x: number, y: number) => {
  return `${(x / SPRITE_SHEET_MAX_INDEX) * 100}% ${(y / SPRITE_SHEET_MAX_INDEX) * 100}%`;
};

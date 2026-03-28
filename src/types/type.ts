import { Color } from "../enums/PieceColor";

export type PieceFormat = { id: string; color: Color, position:number }

export interface Player {
  color: Color;
  name: string;
  diceRoll: number[];
}
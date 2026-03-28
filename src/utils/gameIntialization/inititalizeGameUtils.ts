import { v4 as uuidv4 } from "uuid";
import { Color } from "../../enums/PieceColor";
import type { GameBoard } from "../../context/gameContext/GameContext";
import type { PieceFormat } from "../../types/type";
import { STARTING_POSITIONS } from "./intializationConstants";

export const generateRow = (numberOfPieces: number, color: Color, position:number): PieceFormat[] => {
  return Array.from({ length: numberOfPieces }, () => ({ id: uuidv4(), color,position }) as PieceFormat);
};

export const generateStandardBoard = (): GameBoard => {
  const board: GameBoard = Array.from({ length: 24 }, (_, index) => ({
    id: index,
    pieces: [],
  }));

  STARTING_POSITIONS.forEach(({ index, count, color }) => {
    board[index].pieces = generateRow(count, color,index);
  });

  return board;
};


import { STARTING_POSITIONS } from "../../constants.ts/gameConstants";
import { Color } from "../../enums/PieceColor";
import { PieceFormat, GameBoard } from "../../types/gameTypes";
import { v4 as uuidv4 } from "uuid";

export const generateRow = (numberOfPieces: number, color: Color, position: number): PieceFormat[] => {
  return Array.from({ length: numberOfPieces }, () => ({
    id: uuidv4(),
    color,
    position,
  }));
};

export const generateStandardBoard = (): GameBoard => {
  const board: GameBoard = Array.from({ length: 24 }, (_, index) => ({
    id: index,
    pieces: [],
    possibleMoves: [],
  }));

  STARTING_POSITIONS.forEach(({ index, count, color }) => {
    board[index].pieces = generateRow(count, color, index);
  });

  return board;
};

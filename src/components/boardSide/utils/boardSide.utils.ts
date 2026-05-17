import { GameStateType, PieceFormat } from "../../../types/gameTypes";
import { SIDES } from "../../boardSection/boardSection.types";

export const boardMapping = (
  side: SIDES,
  state: GameStateType,
): {
  topPieces: {
    id: number;
    pieces: PieceFormat[];
    possibleMoves: number[];
  }[];
  bottomPieces: {
    id: number;
    pieces: PieceFormat[];
    possibleMoves: number[];
  }[];
} => {
  const topPieces = side === SIDES.LEFT ? state.boardPieces.slice(7, 13).reverse() : state.boardPieces.slice(1, 7).reverse();

  const bottomPieces = side === SIDES.LEFT ? state.boardPieces.slice(13, 19) : state.boardPieces.slice(19, 25);
  return { topPieces, bottomPieces };
};

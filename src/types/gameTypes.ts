import { GAME_STATE } from "../enums/GameState";
import { Color } from "../enums/PieceColor";
import { GAME_MODE } from "../game/gameReducer/gameActionTypes";

export type PieceFormat = { id: string; color: Color; position: number };

export interface Player {
  color: Color;
  name: string;
  diceRoll: number[];
}

export type GameStateType = {
  gameMode: GAME_MODE | null;
  gameState: GAME_STATE;
  currentPlayer: Player | null;
  whitePlayer: Player;
  blackPlayer: Player;
  diceRoll: number[];
  initialDiceRoll: { white: number[]; black: number[] };
  boardPieces: GameBoard;
  selectedPiece: PieceFormat | null;
  hitPiece: PieceFormat | null;
  isRolling: boolean;
  possibleMoves: number[];
};

export type GameBoard = {
  id: number;
  pieces: PieceFormat[];
  possibleMoves: number[];
}[];


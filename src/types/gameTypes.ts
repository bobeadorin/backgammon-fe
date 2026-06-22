import { GAME_PHASE, TURN_PHASE } from "../enums/GameState";
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
  gamePhase: GAME_PHASE;
  turnPhase: TURN_PHASE;
  currentPlayer: Player | null;
  whitePlayer: Player;
  blackPlayer: Player;
  diceRoll: DiceRoll[];
  initialDiceRoll: { white: DiceRoll[]; black: DiceRoll[] };
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

export type DiceRoll = {
  value: number;
  isUsed: boolean;
};

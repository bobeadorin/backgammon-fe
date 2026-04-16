import { createContext } from "react";
import { PieceFormat, Player } from "../../types/type";
import { GameState } from "../../enums/GameState";

// ------------------- TYPES -------------------

export type GameBoard = {
  id: number;
  pieces: PieceFormat[];
}[];

interface GameContextInterface {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  currentPlayer: { name: string; color: string; diceRoll: number[] } | null;
  setCurrentPlayer: (player: Player) => void;
  possibleMoves: number[];
  setPossibleMoves: (moves: number[]) => void;
  isRolling: boolean;
  setIsRolling: (isRolling: boolean) => void;
  whitePlayer: Player;
  setWhitePlayer: (player: Player) => void;
  blackPlayer: Player;
  setBlackPlayer: (player: Player) => void;
  rollForFirstPlayer: () => void;
  initialDiceRoll: { white: number[]; black: number[] };
  rollDice: () => number[];
  diceRoll: number[];
  setDiceRoll: (dice: number[]) => void;
  boardPieces: GameBoard;
  setBoardPieces: (board: GameBoard) => void;
  selectedPiece: PieceFormat | null;
  setSelectedPiece: (piece: PieceFormat | null) => void;
  hitPiece: PieceFormat | null;
  setHitPiece: (piece: PieceFormat | null) => void;
  handleTriangleOnClick: (id: number, pieces: PieceFormat[]) => void;
  handleSetPossibleMoves: (pieceToPick: PieceFormat) => void;
  clearPossibleMoves: () => void;
}

// ------------------- CONTEXT -------------------
const GameContext = createContext<GameContextInterface | null>(null);

export default GameContext;

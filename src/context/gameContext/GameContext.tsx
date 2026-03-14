import { createContext } from "react";
import type { PieceFormat } from "../../types/type";

// ------------------- TYPES -------------------



export type GameBoard = {
  id: number;
  pieces: PieceFormat[];
}[];

interface GameContextInterface {
  currentPlayer: string;
  setCurrentPlayer: (player: string) => void;
  whitePlayer: string;
  setWhitePlayer: (player: string) => void;
  blackPlayer: string;
  setBlackPlayer: (player: string) => void;
  diceRoll: number[];
  setDiceRoll: (dice: number[]) => void;
  boardPieces: GameBoard;
  setBoardPieces: (board: GameBoard) => void;
  selectedPiece: PieceFormat | null;
  setSelectedPiece: (piece: PieceFormat | null) => void;
  hitPiece: PieceFormat | null;
  setHitPiece: (piece: PieceFormat | null) => void;
  initGame: () => void;
}

// ------------------- CONTEXT -------------------
const GameContext = createContext<GameContextInterface | null>(null);

export default GameContext;

import { createContext } from "react";
import { PieceFormat } from "../../types/type";
import { GameState } from "../../enums/GameState";


// ------------------- TYPES -------------------

export type GameBoard = {
  id: number;
  pieces: PieceFormat[];
}[];

interface GameContextInterface {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  currentPlayer: string | null;
  setCurrentPlayer: (player: string) => void;
  whitePlayer: string;
  setWhitePlayer: (player: string) => void;
  blackPlayer: string;
  setBlackPlayer: (player: string) => void;
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
  initGame: () => void;
}

// ------------------- CONTEXT -------------------
const GameContext = createContext<GameContextInterface | null>(null);

export default GameContext;

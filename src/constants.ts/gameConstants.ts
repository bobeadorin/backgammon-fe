import { GAME_STATE } from "../enums/GameState";
import { Color } from "../enums/PieceColor";
import { generateStandardBoard } from "../game/gameInitialization/gameInitialization";
import { GameStateType } from "../types/gameTypes";

export const STARTING_POSITIONS_WHITE = [
  { index: 0, count: 2, color: Color.WHITE },
  { index: 5, count: 5, color: Color.BLACK },
  { index: 7, count: 3, color: Color.BLACK },
  { index: 11, count: 5, color: Color.WHITE },
  { index: 12, count: 5, color: Color.BLACK },
  { index: 16, count: 3, color: Color.WHITE },
  { index: 18, count: 5, color: Color.WHITE },
  { index: 23, count: 2, color: Color.BLACK },
];

export const STARTING_POSITIONS = [
  { index: 0, count: 2, color: Color.BLACK },
  { index: 5, count: 5, color: Color.WHITE },
  { index: 7, count: 3, color: Color.WHITE },
  { index: 11, count: 5, color: Color.BLACK },
  { index: 12, count: 5, color: Color.WHITE },
  { index: 16, count: 3, color: Color.BLACK },
  { index: 18, count: 5, color: Color.BLACK },
  { index: 23, count: 2, color: Color.WHITE },
];

export const initialGameState: GameStateType = {
  gameMode: null,
  gameState: GAME_STATE.WAITING_FOR_GAMEMODE,
  currentPlayer: null,
  whitePlayer: { name: "white", color: Color.WHITE, diceRoll: [] },
  blackPlayer: { name: "black", color: Color.BLACK, diceRoll: [] },
  diceRoll: [],
  initialDiceRoll: { white: [], black: [] },
  boardPieces: generateStandardBoard(),
  selectedPiece: null,
  hitPiece: null,
  isRolling: false,
  possibleMoves: [],
};

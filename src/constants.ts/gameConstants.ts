import { GAME_PHASE } from "../enums/GameState";
import { Color } from "../enums/PieceColor";
import { generateStandardBoard } from "../game/gameInitialization/gameInitialization";
import { GameStateType } from "../types/gameTypes";

export const BOARD_BAR_INDEX = 26;
export const WHITE_BEAR_OFF_TRAY_INDEX = 0;
export const BLACK_BEAR_OFF_TRAY_INDEX = 25;

export const STARTING_POSITIONS_WHITE = [
  { index: 1, count: 2, color: Color.WHITE },
  { index: 6, count: 5, color: Color.BLACK },
  { index: 8, count: 3, color: Color.BLACK },
  { index: 12, count: 5, color: Color.WHITE },
  { index: 13, count: 5, color: Color.BLACK },
  { index: 17, count: 3, color: Color.WHITE },
  { index: 19, count: 5, color: Color.WHITE },
  { index: 24, count: 2, color: Color.BLACK },
];

export const STARTING_POSITIONS = [
  { index: 1, count: 2, color: Color.BLACK },
  { index: 6, count: 5, color: Color.WHITE },
  { index: 8, count: 3, color: Color.WHITE },
  { index: 12, count: 5, color: Color.BLACK },
  { index: 13, count: 5, color: Color.WHITE },
  { index: 17, count: 3, color: Color.BLACK },
  { index: 19, count: 5, color: Color.BLACK },
  { index: 24, count: 2, color: Color.WHITE },
];

export const initialGameState: GameStateType = {
  gameMode: null,
  gamePhase: GAME_PHASE.SETUP,
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

console.log(initialGameState);

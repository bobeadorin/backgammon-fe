import { GAME_STATE } from "../../enums/GameState";
import { PieceFormat, Player } from "../../types/gameTypes";

export enum ACTIONS {
  SET_GAMEMODE = "SET_GAMEMODE",
  ROLL_DICE = "ROLL_DICE",
  SELECT_PIECE = "SELECT_PIECE",
  MOVE_PIECE = "MOVE_PIECE",
  CONSUME_DICE = "CONSUME_DICE",
  SET_INTIAL_PLAYERS = "SET_INTIAL_PLAYERS",
  SET_INITAL_ROLL = "SET_INITAL_ROLL",
  SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER",
  END_TURN = "END_TURN",
  SET_BOARD = "SET_BOARD",
  SET_POSSIBLE_MOVES = "SET_POSSIBLE_MOVES",
  SET_HIT_PIECE = "SET_HIT_PIECE",
  SET_IS_ROLLING = "SET_IS_ROLLING",
  SET_GAME_STATE = "SET_GAME_STATE",
  WAITING_FOR_INITIAL_ROLL = "WAITING_FOR_INITIAL_ROLL",
  START_INTIAL_DICE_ROLL = "GET_INTIAL_DICE_ROLL",
}

export type GameAction =
  | { type: ACTIONS.ROLL_DICE }
  | { type: ACTIONS.SELECT_PIECE; payload: PieceFormat }
  | { type: ACTIONS.MOVE_PIECE; payload: { from: number; to: number } }
  | { type: ACTIONS.CONSUME_DICE; payload: number }
  | { type: ACTIONS.SET_INTIAL_PLAYERS; payload: { whitePlayer: Player; blackPlayer: Player } }
  | { type: ACTIONS.SET_GAMEMODE; payload: GAME_MODE }
  | { type: ACTIONS.SET_GAME_STATE; payload: GAME_STATE }
  | { type: ACTIONS.START_INTIAL_DICE_ROLL };

export enum GAME_MODE {
  SINGLEPLAYER = "SINGLEPLAYER",
  COMPUTER = "COMPUTER",
  MULTIPLAYER = "MULTIPLAYER",
}

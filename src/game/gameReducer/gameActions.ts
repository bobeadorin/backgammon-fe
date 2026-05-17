import { Player } from "../../types/gameTypes";
import { ACTIONS, GAME_MODE, GameAction } from "./gameActionTypes";
import { GAME_STATE } from "../../enums/GameState";
import { PieceFormat } from "../../types/gameTypes";

export class GameActionsService {
  static setGameMode(mode: GAME_MODE): GameAction {
    return {
      type: ACTIONS.SET_GAMEMODE,
      payload: mode,
    };
  }

  static setInitialPlayers(whitePlayer: Player, blackPlayer: Player): GameAction {
    return {
      type: ACTIONS.SET_INITIAL_PLAYERS,
      payload: { whitePlayer, blackPlayer },
    };
  }

  static setGameState(gameState: GAME_STATE): GameAction {
    return {
      type: ACTIONS.SET_GAME_STATE,
      payload: gameState,
    };
  }

  static rollDice(): GameAction {
    return {
      type: ACTIONS.ROLL_DICE,
    };
  }

  static selectPiece(piece: PieceFormat): GameAction {
    return {
      type: ACTIONS.SELECT_PIECE,
      payload: piece,
    };
  }

  static movePiece(from: number, to: number): GameAction {
    return {
      type: ACTIONS.MOVE_PIECE,
      payload: { from, to },
    };
  }

  static consumeDice(diceValue: number): GameAction {
    return {
      type: ACTIONS.CONSUME_DICE,
      payload: diceValue,
    };
  }
}

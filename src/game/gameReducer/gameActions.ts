import { Player } from "../../types/gameTypes";
import { ACTIONS, GAME_MODE, GameAction } from "./gameActionTypes";
import { GAME_PHASE } from "../../enums/GameState";
import { PieceFormat } from "../../types/gameTypes";

export class GameActionCreator {
  public static setGameMode(gameMode: GAME_MODE): GameAction {
    return {
      type: ACTIONS.SET_GAMEMODE,
      payload: gameMode,
    };
  }

  public static setInitialPlayers(whitePlayer: Player, blackPlayer: Player): GameAction {
    return {
      type: ACTIONS.SET_INITIAL_PLAYERS,
      payload: { whitePlayer, blackPlayer },
    };
  }

  public static setGameState(gameState: GAME_PHASE): GameAction {
    return {
      type: ACTIONS.SET_GAME_PHASE,
      payload: gameState,
    };
  }

  public static rollDice(): GameAction {
    return {
      type: ACTIONS.ROLL_DICE,
    };
  }

  public static selectPiece(piece: PieceFormat): GameAction {
    return {
      type: ACTIONS.SELECT_PIECE,
      payload: piece,
    };
  }

  public static movePiece(from: number, to: number): GameAction {
    return {
      type: ACTIONS.MOVE_PIECE,
      payload: { from, to },
    };
  }

  public static startRollingAnimation(): GameAction {
    return {
      type: ACTIONS.START_ROLLING_ANIMATION,
    };
  }
  public static stopRollingAnimation(): GameAction {
    return {
      type: ACTIONS.STOP_ROLLING_ANIMATION,
    };
  }

  public static resetGame(): GameAction {
    return {
      type: ACTIONS.RESET_GAME,
    };
  }

  public static rollInitialDice(): GameAction {
    return {
      type: ACTIONS.START_INITIAL_DICE_ROLL,
    };
  }

  public static setCurrentPlayer(): GameAction {
    return {
      type: ACTIONS.SET_CURRENT_PLAYER,
    };
  }
}

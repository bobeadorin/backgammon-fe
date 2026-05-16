import { GAME_STATE } from "../../enums/GameState";
import { GameStateType } from "../../types/gameTypes";
import { ACTIONS, GAME_MODE, GameAction } from "./gameActionTypes";
import LocalStorageManager from "../../utils/LocalStorageManager/LocalStorageManager";
import { GameEngine } from "../../engine/gameEngine";
import { Color } from "../../enums/PieceColor";

export function gameReducer(state: GameStateType, action: GameAction): GameStateType {
  const newState = computeNextState(state, action);

  if (newState !== state) {
    LocalStorageManager.setGameSnapshot(newState);
  }

  return newState;
}

function computeNextState(state: GameStateType, action: GameAction): GameStateType {
  switch (action.type) {
    case ACTIONS.SET_GAME_STATE:
      return setGameState(state, action.payload);
    case ACTIONS.SET_GAMEMODE:
      return setGameMode(state, action.payload);
    case ACTIONS.ROLL_DICE:
      return rollDice(state);
    case ACTIONS.START_INTIAL_DICE_ROLL:
      return startInitialRoll(state);
    case ACTIONS.SELECT_PIECE:
      //
      break;
    case ACTIONS.SET_INTIAL_PLAYERS:
      return setInitialPlayers(state);
    default:
      return state;
  }
  return state;
}

function startInitialRoll(state: GameStateType): GameStateType {
  const initialRoll = GameEngine.getInitialRoll();

  return {
    ...state,
    initialDiceRoll: {
      white: initialRoll.white,
      black: initialRoll.black,
    },
    gameState: GAME_STATE.WAITING_FOR_INITIAL_ROLL,
  };
}

function rollDice(state: GameStateType): GameStateType {
  return {
    ...state,
    diceRoll: [GameEngine.rand(), GameEngine.rand()],
  };
}

function setInitialPlayers(state: GameStateType): GameStateType {
  const initialRolls = state.initialDiceRoll;

  const winner = GameEngine.getInitialRollWinner(initialRolls.black, initialRolls.white);

  const winnerName = winner.winnerColor === Color.WHITE ? state.whitePlayer.name : state.blackPlayer.name;

  if (winner.isDouble) {
    return {
      ...state,
      currentPlayer: { name: winnerName, color: winner.winnerColor, diceRoll: winner.diceRoll },
      gameState: GAME_STATE.GAME_RUNNING,
    };
  }

  return {
    ...state,
    currentPlayer: {
      name: winnerName,
      color: winner.winnerColor,
      diceRoll: [],
    },
    gameState: GAME_STATE.WAITING_FOR_INITIAL_ROLL,
  };
}

function setGameMode(state: GameStateType, payload: GAME_MODE) {
  return {
    ...state,
    GAME_MODE: payload,
    gameState: GAME_STATE.WAITING_FOR_PLAYER_CONFIGURATION,
  };
}

function setGameState(state: GameStateType, payload: GAME_STATE) {
  return {
    ...state,
    gameState: payload,
  };
}

import { GAME_PHASE, TURN_PHASE } from "../../enums/GameState";
import { GameStateType, PieceFormat, DiceRoll } from "../../types/gameTypes";
import { ACTIONS, GAME_MODE, GameAction } from "./gameActionTypes";
import LocalStorageManager from "../../utils/LocalStorageManager/LocalStorageManager";
import { GameEngine } from "../../engine/gameEngine";
import { Color } from "../../enums/PieceColor";
import { initialGameState } from "../../constants.ts/gameConstants";

export class GameStateManager {
  public static computeNextState(state: GameStateType, action: GameAction): GameStateType {
    switch (action.type) {
      case ACTIONS.SET_GAME_PHASE:
        return GameStateManager.setGameState(state, action.payload);
      case ACTIONS.SET_GAMEMODE:
        return GameStateManager.setGameMode(state, action.payload);
      case ACTIONS.ROLL_DICE:
        return GameStateManager.rollDice(state);
      case ACTIONS.START_INITIAL_DICE_ROLL:
        return GameStateManager.startInitialRoll(state);
      case ACTIONS.START_ROLLING_ANIMATION:
        return GameStateManager.setStartRollingAnimation(state);
      case ACTIONS.STOP_ROLLING_ANIMATION:
        return GameStateManager.setStopRollingAnimation(state);

      case ACTIONS.SELECT_PIECE:
        return GameStateManager.setSelectedPiece(state, action.payload);
      case ACTIONS.MOVE_PIECE:
        return GameStateManager.moveSelectedPiece(state, action.payload);
      case ACTIONS.SET_INITIAL_PLAYERS:
        return {
          ...state,
          whitePlayer: action.payload.whitePlayer,
          blackPlayer: action.payload.blackPlayer,
        };
      case ACTIONS.RESET_GAME:
        return GameStateManager.resetGame(state);
      case ACTIONS.SET_CURRENT_PLAYER:
        return GameStateManager.setInitialPlayers(state);
      default:
        return state;
    }
  }

  public static setSelectedPiece(state: GameStateType, selectedPiece: PieceFormat | null) {
    if (selectedPiece?.color !== state.currentPlayer?.color) return state;

    const possibleMoves = GameEngine.getValidBoardSpaces(state.boardPieces, state.diceRoll, selectedPiece);
    return {
      ...state,
      possibleMoves,
      selectedPiece,
    };
  }

  public static moveSelectedPiece(state: GameStateType, movingPlaces: { from: number; to: number }) {
    if (state.possibleMoves.includes(movingPlaces.to)) {
      const diceUsed = Math.abs(movingPlaces.to - movingPlaces.from);

      const updatedBoardPieces = GameEngine.updateBoardPieces(state.boardPieces, movingPlaces);
      const remainingDice = GameStateManager.markFirstUnusedDieAsUsed(state.diceRoll, diceUsed);

      //check if all dice are used
      const allDiceUsed = remainingDice.every((die) => die.isUsed);
      console.log(allDiceUsed);
      if (allDiceUsed) {
        const nextPlayer = allDiceUsed ? GameStateManager.switchPlayer(state) : state.currentPlayer;

        return {
          ...state,
          selectedPiece: null,
          possibleMoves: [],
          boardPieces: updatedBoardPieces,
          diceRoll: remainingDice,
          turnPhase: TURN_PHASE.WAITING_FOR_ROLL,
          currentPlayer: nextPlayer,
        };
      }

      return {
        ...state,
        selectedPiece: null,
        possibleMoves: [],
        boardPieces: updatedBoardPieces,
        diceRoll: remainingDice,
        turnPhase: TURN_PHASE.MOVING,
      };
    }

    return {
      ...state,
      selectedPiece: null,
      possibleMoves: [],
    };
  }

  public static markFirstUnusedDieAsUsed(diceRoll: DiceRoll[], diceValue: number): DiceRoll[] {
    let found = false;

    return diceRoll.map((die) => {
      if (!found && die.value === diceValue && !die.isUsed) {
        found = true;
        return { ...die, isUsed: true };
      }

      return die;
    });
  }

  public static switchPlayer(state: GameStateType) {
    const nextPlayerColor = state.currentPlayer?.color === Color.WHITE ? Color.BLACK : Color.WHITE;
    const nextPlayer = nextPlayerColor === Color.WHITE ? state.whitePlayer : state.blackPlayer;

    return {
      ...nextPlayer,
      diceRoll: [],
    };
  }

  public static setStartRollingAnimation(state: GameStateType) {
    return {
      ...state,
      isRolling: true,
    };
  }

  public static setStopRollingAnimation(state: GameStateType) {
    return {
      ...state,
      isRolling: false,
    };
  }

  public static resetGame(state: GameStateType) {
    state = initialGameState;

    LocalStorageManager.setGameSnapshot(state);

    return state;
  }

  public static startInitialRoll(state: GameStateType): GameStateType {
    const initialRoll = GameEngine.getInitialRoll();
    console.log(initialRoll);
    return {
      ...state,
      initialDiceRoll: {
        white: initialRoll.white,
        black: initialRoll.black,
      },
      gamePhase: GAME_PHASE.INITIAL_ROLL,
    };
  }

  public static rollDice(state: GameStateType): GameStateType {
    const newDiceRoll: DiceRoll[] = GameEngine.getDiceRoll();
    return {
      ...state,
      diceRoll: newDiceRoll,
      turnPhase: TURN_PHASE.MOVING,
    };
  }

  public static setInitialPlayers(state: GameStateType): GameStateType {
    const initialRolls = state.initialDiceRoll;

    const winner = GameEngine.getInitialRollWinner(initialRolls.black, initialRolls.white);

    const winnerName = winner.winnerColor === Color.WHITE ? state.whitePlayer.name : state.blackPlayer.name;

    if (winner.isDouble) {
      console.log(winnerName);

      return {
        ...state,
        diceRoll: winner.diceRoll,
        currentPlayer: { name: winnerName, color: winner.winnerColor, diceRoll: [] },
        gamePhase: GAME_PHASE.PLAYING,
        turnPhase: TURN_PHASE.MOVING,
      };
    }
    console.log(winnerName);
    return {
      ...state,
      diceRoll: [],
      currentPlayer: {
        name: winnerName,
        color: winner.winnerColor,
        diceRoll: [],
      },
      gamePhase: GAME_PHASE.PLAYING,
      turnPhase: TURN_PHASE.WAITING_FOR_ROLL,
    };
  }

  public static setGameMode(state: GameStateType, payload: GAME_MODE) {
    return {
      ...state,
      gameMode: payload,
      gamePhase: GAME_PHASE.SETUP,
    };
  }

  public static setGameState(state: GameStateType, payload: GAME_PHASE) {
    return {
      ...state,
      gamePhase: payload,
    };
  }
}

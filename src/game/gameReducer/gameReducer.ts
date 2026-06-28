import { GameStateType } from "../../types/gameTypes";
import { GameAction } from "./gameActionTypes";
import LocalStorageManager from "../../utils/LocalStorageManager/LocalStorageManager";
import { GameStateManager } from "./gameStateManager";

export function gameReducer(state: GameStateType, action: GameAction): GameStateType {
  const newState = GameStateManager.computeNextState(state, action);

  if (newState !== state) {
    LocalStorageManager.setGameSnapshot(newState);
  }

  return newState;
}

import { initialGameState } from "../../constants.ts/gameConstants";
import { GameStateType } from "../../types/gameTypes";
import { GAME_STATE } from "./types/storageTypes";

export default class LocalStorageManager {
  public static getGameState(): GameStateType {
    const storedGameState = localStorage.getItem(GAME_STATE);

    if (!storedGameState) return initialGameState;

    return JSON.parse(storedGameState) as GameStateType;
  }

  public static setGameSnapshot(gameState: GameStateType): void {
    if (!gameState) return;

    localStorage.setItem(GAME_STATE, JSON.stringify(gameState));
  }
}

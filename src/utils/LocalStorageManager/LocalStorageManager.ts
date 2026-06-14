import { initialGameState } from "../../constants.ts/gameConstants";
import { GameStateType } from "../../types/gameTypes";
import { GAME_STATE_KEY } from "./types/storageTypes";

export default class LocalStorageManager {
  public static getGameState(): GameStateType {
    const storedGameState = localStorage.getItem(GAME_STATE_KEY);

    if (!storedGameState) return initialGameState;

    return JSON.parse(storedGameState) as GameStateType;
  }

  public static setGameSnapshot(gameState: GameStateType): void {
    if (!gameState) return;

    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }

  public static clearGameSnapshot(): void {
    localStorage.removeItem(GAME_STATE_KEY);
  }

  public static hasPreviousGameData() {
    const storageData = JSON.parse(localStorage.getItem(GAME_STATE_KEY) ?? "{}") as GameStateType;
    const isEqual = storageData.isEqual(initialGameState);
    if (isEqual) return false;

    return true;
  }
}

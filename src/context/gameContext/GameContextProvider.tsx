import { ReactNode, useReducer } from "react";
import { gameReducer } from "../../game/gameReducer/gameReducer";
import LocalStorageManager from "../../utils/LocalStorageManager/LocalStorageManager";
import GameContext from "./GameContext";

interface GameContextProviderProps {
  children: ReactNode;
}

export default function GameContextProvider({ children }: GameContextProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, LocalStorageManager.getGameState());

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

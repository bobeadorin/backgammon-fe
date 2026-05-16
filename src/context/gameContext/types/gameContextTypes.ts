import { GameAction } from "../../../game/gameReducer/gameActionTypes";
import { GameStateType } from "../../../types/gameTypes";

export interface GameContextType {
  state: GameStateType;
  dispatch: React.Dispatch<GameAction>;
}

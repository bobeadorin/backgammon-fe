import { Player } from "../../types/gameTypes";
import { ACTIONS, GameAction } from "./gameActionTypes";

export const gameActions = {
  setInitialPlayers: (whitePlayer: Player, blackPlayer: Player): GameAction => ({
    type: ACTIONS.SET_INTIAL_PLAYERS,
    payload: { whitePlayer, blackPlayer },
  }),
};
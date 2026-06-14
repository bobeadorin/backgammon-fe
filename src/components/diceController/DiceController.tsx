import { GAME_PHASE } from "../../enums/GameState";
import { useGameContext } from "../../hooks/UseGameContext";
import DiceRoller from "../dice/DiceRoller/DiceRoller";

export default function DiceController() {
  const { state } = useGameContext();

  if (state.gamePhase === GAME_PHASE.INITIAL_ROLL) {
    return (
      <>
        <DiceRoller values={state.initialDiceRoll.black} isLeft={true} />
        <DiceRoller values={state.initialDiceRoll.white} />
      </>
    );
  }
  if (state.gamePhase === GAME_PHASE.PLAYING) {
    <DiceRoller values={state.currentPlayer?.diceRoll ?? []} />;
  }
}

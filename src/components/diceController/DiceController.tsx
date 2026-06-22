import { GAME_PHASE } from "../../enums/GameState";
import { GameActionsService } from "../../game/gameReducer/gameActions";
import { useGameContext } from "../../hooks/UseGameContext";
import { ROLL_DICE_TEXT } from "../dice/constants/dice-constants";
import DiceRoller from "../dice/DiceRoller/DiceRoller";

export default function DiceController() {
  const { state, dispatch } = useGameContext();

  const handleIntialRoll = () => {
    dispatch(GameActionsService.startRollingAnimation());
    dispatch(GameActionsService.rollInitialDice());

    setTimeout(() => {
      dispatch(GameActionsService.stopRollingAnimation());
      dispatch(GameActionsService.setCurrentPlayer());
    }, 4000);
  };

  if (state.gamePhase === GAME_PHASE.INITIAL_ROLL) {
    return state.initialDiceRoll.black.length > 0 ? (
      <>
        <DiceRoller diceRoll={state.initialDiceRoll.black} isLeft={true} showButton={false} />
        <DiceRoller diceRoll={state.initialDiceRoll.white} showButton={false} />
      </>
    ) : (
      <button onClick={handleIntialRoll} className="roll-btn">
        {ROLL_DICE_TEXT}
      </button>
    );
  }

  if (state.gamePhase === GAME_PHASE.PLAYING) {
    return <DiceRoller diceRoll={state.diceRoll} isLeft={false} />;
  }
}

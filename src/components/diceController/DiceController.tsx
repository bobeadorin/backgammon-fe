import { GAME_STATE } from "../../enums/GameState";
import { useGameContext } from "../../hooks/UseGameContext";
import { ROLL_DICE_TEXT } from "../dice/constants/dice-constants";
import DiceRoller from "../dice/DiceRoller/DiceRoller";
import { GameActionsService } from "../../game/gameReducer/gameActions";

export default function DiceController() {
  const { state, dispatch } = useGameContext();

  const handleFirstRoll = () => {
    dispatch(GameActionsService.setGameState(GAME_STATE.INITIAL_ROLL));
    dispatch(GameActionsService.rollDice());

    setTimeout(() => {
      dispatch(GameActionsService.setGameState(GAME_STATE.WAITING_FOR_INITIAL_ROLL));
    }, 3000);
  };

  if (state.gameState === GAME_STATE.WAITING_FOR_INITIAL_ROLL) {
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <button onClick={handleFirstRoll} className="roll-btn">
          {ROLL_DICE_TEXT}
        </button>
      </div>
    );
  }
  if (state.gameState === GAME_STATE.INITIAL_ROLL) {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "40px",
          zIndex: 1000,
        }}
      >
        <DiceRoller showButton={false} values={state.initialDiceRoll.black} isLeft={true} />

        <DiceRoller showButton={false} values={state.initialDiceRoll.white} isLeft={false} />
      </div>
    );
  }

  return <>{<DiceRoller showButton={true} values={state.diceRoll} isLeft={false} />}</>;
}

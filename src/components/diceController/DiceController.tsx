import { GameState } from "../../enums/GameState";
import { useGameContext } from "../../hooks/UseGameContext";
import { ROLL_DICE_TEXT } from "../dice/constants/dice-constants";
import DiceRoller from "../dice/DiceRoller/DiceRoller";

export default function DiceController() {
  const { gameState, initialDiceRoll, diceRoll, setGameState, rollForFirstPlayer } =
    useGameContext();

  const handleFirstRoll = () => {
    rollForFirstPlayer();
    setGameState(GameState.INITIAL_ROLL);

    setTimeout(() => {
      setGameState(GameState.GAME_RUNNING);
    }, 3000);
  };

  if (gameState === GameState.WAITING_FOR_INITIAL_ROLL) {
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <button onClick={handleFirstRoll} className="roll-btn">
          {ROLL_DICE_TEXT}
        </button>
      </div>
    );
  }
  if (gameState === GameState.INITIAL_ROLL) {
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
        <DiceRoller
          showButton={false}
          values={initialDiceRoll.black}
          isLeft={true}
        />

        <DiceRoller showButton={false} values={initialDiceRoll.white} isLeft={false} />
      </div>
    );
  }

  return <>{<DiceRoller showButton={true} values={diceRoll} isLeft={false} />}</>;
}

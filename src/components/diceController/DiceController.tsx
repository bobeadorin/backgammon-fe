import { GameState } from "../../enums/GameState";
import { Color } from "../../enums/PieceColor";
import { useGameContext } from "../../hooks/UseGameContext";
import { Player } from "../../types/type";
import { ROLL_DICE_TEXT } from "../dice/constants/dice-constants";
import DiceRoller from "../dice/DiceRoller/DiceRoller";

export default function DiceController() {
  const { gameState, initialDiceRoll, diceRoll, currentPlayer, setGameState, rollForFirstPlayer, setCurrentPlayer } =
    useGameContext();

  const handleFirstRoll = () => {
    rollForFirstPlayer();
    setGameState(GameState.INITIAL_ROLL);
  };

  const handleWinnerAfterAnimation = () => {
    console.log(initialDiceRoll);
    const blackDice = initialDiceRoll.black;
    const whiteDice = initialDiceRoll.white;

    const blackSum = blackDice[0] + blackDice[1];
    const whiteSum = whiteDice[0] + whiteDice[1];

    const blackIsDouble = blackDice[0] === blackDice[1];
    const whiteIsDouble = whiteDice[0] === whiteDice[1];

    let winner: Player;

    if (blackIsDouble && !whiteIsDouble) {
      winner = { color: Color.BLACK, name: "black", diceRoll: [] };
    } else if (whiteIsDouble && !blackIsDouble) {
      winner = { color: Color.WHITE, name: "white", diceRoll: [] };
    } else {
      winner =
        blackSum > whiteSum
          ? { color: Color.BLACK, name: "black", diceRoll: [] }
          : { color: Color.WHITE, name: "white", diceRoll: [] };
    }

    setCurrentPlayer(winner);
    console.log("Winner:", winner, currentPlayer);

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
          onAnimationFinished={handleWinnerAfterAnimation}
        />

        <DiceRoller showButton={false} values={initialDiceRoll.white} isLeft={false} />
      </div>
    );
  }

  return <>{<DiceRoller showButton={true} values={diceRoll} isLeft={false} />}</>;
}

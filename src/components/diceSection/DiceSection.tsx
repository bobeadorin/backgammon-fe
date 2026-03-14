import Dice3D from "react-3d-dice";
import "./DiceSectionStyles.css";
import { useState } from "react";
// import { useGameContext } from "../../hooks/UseGameContext";
export default function DiceSection() {
  // const {currentPlayer, diceRoll, setDiceRoll} = useGameContext()

  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const roll = () => {
    setIsVisible(true);
    setIsRolling(true);
    const newResults = Array.from({ length: 2 }, () => Math.floor(Math.random() * 6) + 1);
    setResults(newResults);
    setTrigger((t) => t + 1);
    setTimeout(() => {setIsRolling(false)}, 2000);
    setTimeout(() => {setIsVisible(false)}, 3000);

  };

  return (
    <section className="dice-section">
      <div  className={`dice-wrapper ${isVisible ? "visible" : "notVisable"}`}>
        <Dice3D
          sides={6}
          color={0x3b82f6}
          results={results}
          isRolling={isRolling} 
          rollTrigger={trigger}
          style={{ width: "30rem" }}
          height={300}
          animationMode="full"
          d6Style="dots"
        />
      </div>

      <button className="roll-btn" onClick={roll}>
        Roll
      </button>
      <div>
        {!isRolling ? results[0] : ""} {!isRolling ? results[1] : ""}
      </div>
    </section>
  );
}

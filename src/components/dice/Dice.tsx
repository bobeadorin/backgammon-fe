import { useState, useRef } from "react";
import "./DiceStyles.css";
import { FACE_COORDS } from "./constants/dice-constants";

export default function DiceRoller() {
  const [die1, setDie1] = useState({ x: 8, y: 7, value: 1 });
  const [die2, setDie2] = useState({ x: 4, y: 15, value: 2 });
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    const frameSpeed = 100; // Slightly faster frame swaps for energy

    rollInterval.current = setInterval(() => {
      // Randomize both dice frames independently
      setDie1((prev) => ({ ...prev, x: Math.floor(Math.random() * 16), y: Math.floor(Math.random() * 16) }));
      setDie2((prev) => ({ ...prev, x: Math.floor(Math.random() * 16), y: Math.floor(Math.random() * 16) }));
    }, frameSpeed);

    const totalRollTime = 1000;

    setTimeout(() => {
      if (rollInterval.current) clearInterval(rollInterval.current);

      const val1 = Math.floor(Math.random() * 6) + 1;
      const val2 = Math.floor(Math.random() * 6) + 1;

      setDie1({ ...FACE_COORDS[val1], value: val1 });
      setDie2({ ...FACE_COORDS[val2], value: val2 });
      setIsRolling(false);
    }, totalRollTime);
  };

  const getPosition = (x: number, y: number) => {
    return `${(x / 15) * 100}% ${(y / 15) * 100}%`;
  };

  return (
    <div className="dice-container">
      <div className="dice-row">
        <div className="dice-wrapper">
          <div
            className={`dice-sprite ${isRolling ? "rolling-blur" : ""}`}
            style={{ backgroundPosition: getPosition(die1.x, die1.y) }}
          />
          <div className="result-badge">{isRolling ? "Rolling..." : die1.value}</div>
        </div>

        <div className="dice-wrapper">
          <div
            className={`dice-sprite ${isRolling ? "rolling-blur" : ""}`}
            style={{ backgroundPosition: getPosition(die2.x, die2.y) }}
          />
          <div className="result-badge">{isRolling ? "Rolling..." : die2.value}</div>
        </div>
      </div>
      {die1.value === die2.value && !isRolling && (
        <>
          <div className="dice-wrapper">
            <div
              className={`dice-sprite ${isRolling ? "rolling-blur" : ""}`}
              style={{ backgroundPosition: getPosition(die2.x, die2.y) }}
            />
            <div className="result-badge">{isRolling ? "Rolling..." : die2.value}</div>
          </div>
          <div className="dice-wrapper">
            <div
              className={`dice-sprite ${isRolling ? "rolling-blur" : ""}`}
              style={{ backgroundPosition: getPosition(die2.x, die2.y) }}
            />
            <div className="result-badge">{isRolling ? "Rolling..." : die2.value}</div>
          </div>
        </>
      )}

      <div className="total-display">
        <span>Total: {isRolling ? "Rolling..." : die1.value + die2.value}</span>
      </div>

      <button className="roll-btn" onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
    </div>
  );
}

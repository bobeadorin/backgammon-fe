import "./DiceStyles.css";

import { getPosition } from "./utils/diceRollerUtils";

type DiceProps = {
  isRolling: boolean;
  coordonates: { x: number; y: number };
};

export default function Dice({ isRolling, coordonates }: DiceProps) {
  return (
    <>
      <div className="dice-row">
        <div className="dice-wrapper">
          <div
            className={`dice-sprite ${isRolling ? "rolling-blur" : ""}`}
            style={{ backgroundPosition: getPosition(coordonates.x, coordonates.y) }}
          />
        </div>
      </div>
    </>
  );
}

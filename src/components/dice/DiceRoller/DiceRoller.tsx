/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useGameContext } from "../../../hooks/UseGameContext";
import {
  SPRITE_SHEET_DIMENSION,
  FRAME_SPEED_MS,
  FACE_COORDS,
  TOTAL_ROLL_TIME_MS,
  ROLLING_TEXT,
  ROLL_DICE_TEXT,
} from "../constants/dice-constants";
import Dice from "../Dice";
import "./DiceRollerStyles.css";
import { GAME_STATE } from "../../../enums/GameState";

type DiceRollerProps = {
  values: number[];
  showButton?: boolean;
  isLeft?: boolean;
  onAnimationFinished?: () => void;
  buttonCallback?: () => void;
};
export default function DiceRoller({
  showButton = true,
  values,
  isLeft = false,
  onAnimationFinished,
  buttonCallback,
}: DiceRollerProps) {
  const { state, dispatch } = useGameContext();

  const [die1, setDie1] = useState<{ x: number; y: number; value?: number } | null>(null);
  const [die2, setDie2] = useState<{ x: number; y: number; value?: number } | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // useEffect(() => {
  //   if (!values.length) return;

  //   setTimeout(() => {
  //     setIsRolling(true);
  //   }, 0);

  //   intervalRef.current = setInterval(startDiceIntervalAnimation, FRAME_SPEED_MS);

  //   const timeout = setTimeout(finishAndSetDiceRoll, TOTAL_ROLL_TIME_MS);

  //   return () => {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //     clearTimeout(timeout);
  //   };
  // }, [values]);

  const startDiceIntervalAnimation = () => {
    setDie1({
      x: Math.floor(Math.random() * SPRITE_SHEET_DIMENSION),
      y: Math.floor(Math.random() * SPRITE_SHEET_DIMENSION),
    });

    setDie2({
      x: Math.floor(Math.random() * SPRITE_SHEET_DIMENSION),
      y: Math.floor(Math.random() * SPRITE_SHEET_DIMENSION),
    });
  };

  const finishAndSetDiceRoll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const [v1, v2] = values;

    setDie1({ ...FACE_COORDS[v1], value: v1 });
    setDie2({ ...FACE_COORDS[v2], value: v2 });

    // setIsRolling(false);
    if (onAnimationFinished) {
      onAnimationFinished();
    }
  };

  return (
    <div className={isLeft ? "dice-container-left" : "dice-container"}>
      {/* {die1 && <Dice isRolling={state.isRolling} coordonates={die1} />}
      {die2 && <Dice isRolling={state.isRolling} coordonates={die2} />}
      {!state.isRolling && die1 && die2 && die1?.value == die2?.value && (
        <>
          <Dice isRolling={state.isRolling} coordonates={die1} />
          <Dice isRolling={state.isRolling} coordonates={die1} />
        </>
      )}

      {showButton && (
        <button
          onClick={buttonCallback ?? rollDice}
          className="roll-btn"
          disabled={isRolling || (diceRoll.length > 0 && gameState === GameState.GAME_RUNNING)}
        >
          {isRolling ? ROLLING_TEXT : ROLL_DICE_TEXT}
        </button>
      )} */}
    </div>
  );
}

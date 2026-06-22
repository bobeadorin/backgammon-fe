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
import { TURN_PHASE } from "../../../enums/GameState";
import "./DiceRollerStyles.css";
import { GameActionsService } from "../../../game/gameReducer/gameActions";
import { DiceRoll } from "../../../types/gameTypes";

type DiceRollerProps = {
  diceRoll: DiceRoll[];
  showButton?: boolean;
  isLeft?: boolean;
  onAnimationFinished?: () => void;
  buttonCallback?: () => void;
};
export default function DiceRoller({
  showButton = true,
  diceRoll,
  isLeft = false,
  onAnimationFinished,
  buttonCallback,
}: DiceRollerProps) {
  const { state, dispatch } = useGameContext();

  type DiceState = { x: number; y: number; value?: number; isUsed: boolean };
  const [dices, setDices] = useState<DiceState[]>([]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Only depend on dice values, not isUsed flag
  const diceValues = diceRoll.map((d) => d.value).join(",");

  useEffect(() => {
    if (!diceRoll || diceRoll.length === 0) {
      setDices([]);
      return;
    }

    // Initialize dices state with isUsed flag from diceRoll
    const initialDices = diceRoll.map((die) => ({
      x: 0,
      y: 0,
      value: undefined,
      isUsed: die.isUsed,
    }));
    setDices(initialDices);

    intervalRef.current = setInterval(startDiceIntervalAnimation, FRAME_SPEED_MS);

    const timeout = setTimeout(finishAndSetDiceRoll, TOTAL_ROLL_TIME_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, [diceValues]);

  // Separate effect to handle isUsed changes without animation
  useEffect(() => {
    setDices((prevDices) =>
      prevDices.map((die, index) => ({
        ...die,
        isUsed: diceRoll[index]?.isUsed ?? false,
      })),
    );
  }, [diceRoll.map((d) => d.isUsed).join(",")]);

  const startDiceIntervalAnimation = () => {
    setDices((prevDices) =>
      prevDices.map((die) => ({
        ...die,
        x: Math.floor(Math.random() * SPRITE_SHEET_DIMENSION),
        y: Math.floor(Math.random() * SPRITE_SHEET_DIMENSION),
      })),
    );
  };

  const finishAndSetDiceRoll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setDices((prevDices) =>
      prevDices.map((die, index) => ({
        ...die,
        ...FACE_COORDS[diceRoll[index]?.value || 1],
        value: diceRoll[index]?.value || 1,
      })),
    );

    if (onAnimationFinished) onAnimationFinished();
  };

  const rollDice = () => {
    dispatch(GameActionsService.rollDice());
  };

  return (
    <div className={isLeft ? "dice-container-left" : "dice-container"}>
      {state.turnPhase !== TURN_PHASE.WAITING_FOR_ROLL &&
        dices.length > 0 &&
        dices.map((die, index) => <Dice key={index} isRolling={state.isRolling || !die.value} coordonates={die} />)}

      {state.turnPhase === TURN_PHASE.WAITING_FOR_ROLL && showButton && (
        <button
          onClick={buttonCallback ?? rollDice}
          className="roll-btn"
          // disabled={state.isRolling || (state.diceRoll.length > 0 && state.gamePhase === GAME_PHASE.PLAYING)}
        >
          {state.isRolling ? ROLLING_TEXT : ROLL_DICE_TEXT}
        </button>
      )}
    </div>
  );
}

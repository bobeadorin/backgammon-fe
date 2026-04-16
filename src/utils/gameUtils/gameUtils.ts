import { DICE_SIDES } from "../../components/dice/constants/dice-constants";
import { GameBoard } from "../../context/gameContext/GameContext";
import { Color } from "../../enums/PieceColor";
import { PieceFormat } from "../../types/type";

export type FirstRollResult = "firstPlayer" | "secondPlayer" | "draw";

export function validateFirstRoll(firstPlayerRoll: number[], secondPlayerRoll: number[]): FirstRollResult {
  if (firstPlayerRoll.length !== 2 || secondPlayerRoll.length !== 2) {
    throw new Error("Initial roll must be exactly 2 dice per player.");
  }

  const [f1, f2] = firstPlayerRoll;
  const [s1, s2] = secondPlayerRoll;
  const firstIsDouble = f1 === f2;
  const secondIsDouble = s1 === s2;

  if (firstIsDouble && !secondIsDouble) return "firstPlayer";
  if (secondIsDouble && !firstIsDouble) return "secondPlayer";

  const firstSum = f1 + f2;
  const secondSum = s1 + s2;

  if (firstSum > secondSum) return "firstPlayer";
  if (secondSum > firstSum) return "secondPlayer";
  return "draw";
}

export function getValidBoardSpaces(
  board: GameBoard,
  diceRoll: number[],
  selectedPiece: PieceFormat | null,
): number[] {
  const possibleMoves = [];

  if (diceRoll.length === 0 || selectedPiece === null) return [];

  for (const roll of diceRoll) {
    const newPosition =selectedPiece.color === Color.BLACK ? selectedPiece.position + roll : selectedPiece.position - roll;

    if (newPosition < 0 || newPosition > 23) continue
    else if(board[newPosition].pieces.length > 1 && board[newPosition].pieces[0].color !== selectedPiece.color) continue
    else{
      possibleMoves.push(newPosition);
    }
  }

  return possibleMoves;
}


export const rand = () => Math.floor(Math.random() * DICE_SIDES) + 1

export const isTie = (white: number[], black: number[]) => {
  return (
    (white[0] === white[1] && white[0] === black[1]) ||
    (white[0] === black[0] && white[1] === black[1])
  );
};
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
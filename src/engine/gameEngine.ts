import { DICE_SIDES } from "../components/dice/constants/dice-constants";
import { Color } from "../enums/PieceColor";
import { GameBoard, PieceFormat, DiceRoll, GameStateType } from "../types/gameTypes";

export class GameEngine {
  public static updateBoardPieces(boardPieces: GameStateType["boardPieces"], movingPlaces: { from: number; to: number }) {
    const updatedBoard = [...boardPieces];

    // Get the piece and UPDATE its position
    const movedPiece = {
      ...boardPieces[movingPlaces.from].pieces[boardPieces[movingPlaces.from].pieces.length - 1],
      position: movingPlaces.to, // ← Update the position
    };

    // Update source point
    updatedBoard[movingPlaces.from] = {
      ...boardPieces[movingPlaces.from],
      pieces: boardPieces[movingPlaces.from].pieces.slice(0, -1),
    };

    // Update destination point
    updatedBoard[movingPlaces.to] = {
      ...boardPieces[movingPlaces.to],
      pieces: [...boardPieces[movingPlaces.to].pieces, movedPiece],
    };

    return updatedBoard;
  }

  public static getDiceRoll(): DiceRoll[] {
    const firstRoll = { value: GameEngine.rand(), isUsed: false };
    const secondRoll = { value: GameEngine.rand(), isUsed: false };

    const diceRoll: DiceRoll[] =
      firstRoll.value === secondRoll.value ? Array.from({ length: 4 }, () => ({ ...firstRoll })) : [firstRoll, secondRoll];

    return diceRoll;
  }

  public static getValidBoardSpaces(board: GameBoard, diceRoll: DiceRoll[], selectedPiece: PieceFormat | null): number[] {
    const filteredDiceRolls = diceRoll.filter((dice) => !dice.isUsed);

    const possibleMoves = [];
    if (filteredDiceRolls.length === 0 || selectedPiece === null) return [];

    for (const roll of filteredDiceRolls) {
      const newPosition =
        selectedPiece.color === Color.BLACK ? selectedPiece.position + roll.value : selectedPiece.position - roll.value;
      if (newPosition < 1 || newPosition > 24) continue;
      if (board[newPosition].pieces.length > 1 && board[newPosition].pieces[0].color !== selectedPiece.color) continue;
      else {
        possibleMoves.push(newPosition);
      }
    }
    console.log(possibleMoves);
    return possibleMoves;
  }

  public static getInitialRoll(): { white: DiceRoll[]; black: DiceRoll[] } {
    const white = [GameEngine.rand(), GameEngine.rand()];
    const black = [GameEngine.rand(), GameEngine.rand()];

    if (GameEngine.isTie(white, black)) return this.getInitialRoll();

    const finalWhite = white[0] === white[1] ? [...white, ...white] : white;
    const finalBlack = black[0] === black[1] ? [...black, ...black] : black;

    return {
      white: finalWhite.map((val) => ({ value: val, isUsed: false })),
      black: finalBlack.map((val) => ({ value: val, isUsed: false })),
    };
  }

  public static getInitialRollWinner(
    blackRoll: DiceRoll[],
    whiteRoll: DiceRoll[],
  ): { winnerColor: Color; isDouble: boolean; diceRoll: DiceRoll[] } {
    const whiteDouble = whiteRoll.length === 4;
    const blackDouble = blackRoll.length === 4;

    if (whiteDouble && blackDouble) {
      return whiteRoll[0].value > blackRoll[0].value
        ? { winnerColor: Color.WHITE, isDouble: true, diceRoll: whiteRoll }
        : { winnerColor: Color.BLACK, isDouble: true, diceRoll: blackRoll };
    }

    if (whiteDouble) return { winnerColor: Color.WHITE, isDouble: true, diceRoll: whiteRoll };
    if (blackDouble) return { winnerColor: Color.BLACK, isDouble: true, diceRoll: blackRoll };

    const whiteSum = whiteRoll.reduce((acc, die) => acc + die.value, 0);
    const blackSum = blackRoll.reduce((acc, die) => acc + die.value, 0);

    return whiteSum > blackSum
      ? { winnerColor: Color.WHITE, isDouble: false, diceRoll: whiteRoll }
      : { winnerColor: Color.BLACK, isDouble: false, diceRoll: blackRoll };
  }

  public static rand(): number {
    return Math.floor(Math.random() * DICE_SIDES) + 1;
  }

  public static isTie(white: number[], black: number[]) {
    const whiteDouble = white[0] === white[1];
    const blackDouble = black[0] === black[1];

    if (whiteDouble && blackDouble) {
      return white[0] === black[0]; // Tie if they both rolled the exact same double
    }

    if (whiteDouble || blackDouble) {
      return false; // Only one player rolled a double, so someone clearly won
    }

    const whiteSum = white[0] + white[1];
    const blackSum = black[0] + black[1];

    return whiteSum === blackSum;
  }
}

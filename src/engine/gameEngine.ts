import { DICE_SIDES } from "../components/dice/constants/dice-constants";
import { Color } from "../enums/PieceColor";
import { GameBoard, PieceFormat } from "../types/gameTypes";

export class GameEngine {
  public static getValidBoardSpaces(board: GameBoard, diceRoll: number[], selectedPiece: PieceFormat | null): number[] {
    const possibleMoves = [];

    if (diceRoll.length === 0 || selectedPiece === null) return [];

    for (const roll of diceRoll) {
      const newPosition = selectedPiece.color === Color.BLACK ? selectedPiece.position + roll : selectedPiece.position - roll;

      if (newPosition < 0 || newPosition > 23) continue;
      else if (board[newPosition].pieces.length > 1 && board[newPosition].pieces[0].color !== selectedPiece.color) continue;
      else {
        possibleMoves.push(newPosition);
      }
    }

    return possibleMoves;
  }

  public static getInitialRoll(): { white: number[]; black: number[] } {
    const white = [GameEngine.rand(), GameEngine.rand()];
    const black = [GameEngine.rand(), GameEngine.rand()];

    if (GameEngine.isTie(white, black)) return this.getInitialRoll();

    const finalWhite = white[0] === white[1] ? [...white, ...white] : white;
    const finalBlack = black[0] === black[1] ? [...black, ...black] : black;

    return {
      white: finalWhite,
      black: finalBlack,
    };
  }

  public static getInitialRollWinner(
    blackRoll: number[],
    whiteRoll: number[],
  ): { winnerColor: Color; isDouble: boolean; diceRoll: number[] } {
    const whiteDouble = whiteRoll.length === 4;
    const blackDouble = blackRoll.length === 4;

    if (whiteDouble && blackDouble) {
      return whiteRoll[0] > blackRoll[0]
        ? { winnerColor: Color.WHITE, isDouble: true, diceRoll: whiteRoll }
        : { winnerColor: Color.BLACK, isDouble: true, diceRoll: blackRoll };
    }

    if (whiteDouble) return { winnerColor: Color.WHITE, isDouble: true, diceRoll: whiteRoll };
    if (blackDouble) return { winnerColor: Color.BLACK, isDouble: true, diceRoll: blackRoll };

    const whiteSum = whiteRoll.reduce((acc, num) => acc + num, 0);
    const blackSum = blackRoll.reduce((acc, num) => acc + num, 0);

    return whiteSum > blackSum
      ? { winnerColor: Color.WHITE, isDouble: false, diceRoll: whiteRoll }
      : { winnerColor: Color.BLACK, isDouble: false, diceRoll: blackRoll };
  }

  public static validateMove(board: GameBoard, diceRoll: number[]): boolean {
    //TODO: add logic after implementing reducers
    console.log(board, diceRoll);
    return true;
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

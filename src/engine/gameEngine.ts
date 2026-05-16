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

    if (white[0] === white[1]) return { white: [...white, ...white], black };
    if (black[0] === black[1]) return { black: [...black, ...black], white };

    return {
      white,
      black,
    };
  }

  public static getInitialRollWinner(
    blackRoll: number[],
    whiteRoll: number[],
  ): { winnerColor: Color; isDouble: boolean; diceRoll: number[] } {
    if (blackRoll.length === 4) return { winnerColor: Color.BLACK, isDouble: true, diceRoll: blackRoll };
    if (whiteRoll.length === 4) return { winnerColor: Color.WHITE, isDouble: true, diceRoll: whiteRoll };

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
    return (white[0] === white[1] && white[0] === black[1]) || (white[0] === black[0] && white[1] === black[1]);
  }
}

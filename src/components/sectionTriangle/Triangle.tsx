import "./TriangleStyles.css";
import Piece from "../piece/Piece";
import type { PieceFormat } from "../../types/type";
import { useGameContext } from "../../hooks/UseGameContext";
import { getValidBoardSpaces } from "../../utils/gameUtils/gameUtils";
import { Color } from "../../enums/PieceColor";

type TriangleProps = {
  isDown: boolean;
  pieces: PieceFormat[];
  id: number;
  isPossibleMove?: boolean;
};

export default function Triangle({ isDown, pieces, id, isPossibleMove = false }: TriangleProps) {
  const { possibleMoves, diceRoll, selectedPiece, boardPieces, currentPlayer, setSelectedPiece, setBoardPieces, setPossibleMoves } =
    useGameContext();

  const handleIsPieceSelected = () => {
    if (selectedPiece) {
      // Can't place on opponent's stack if more than one piece
      if (pieces.length > 0 && pieces[0].color !== selectedPiece.color) return;

  
      if(!possibleMoves.includes(id)){
        return;
      }

      // Place the selected piece on this triangle
      setBoardPieces(
        boardPieces.map((point) => {
          if (point.id === id) {
            return {
              ...point,
              pieces: [...point.pieces, { ...selectedPiece, position: id }], // update position
            };
          }
          return point;
        }),
      );



      setSelectedPiece(null); // clear selected piece after placing
      return;
    }
  };

  const handleNotSelectedPiece = () => {
    if (!selectedPiece) {
      if (pieces.length === 0) return;

      if (currentPlayer !== pieces[pieces.length - 1].color) return;

      const pieceToPick = pieces[pieces.length - 1]; // pick last piece immutably
      setSelectedPiece(pieceToPick);

      // Immediately log valid moves for the piece we just picked
      setPossibleMoves(getValidBoardSpaces(boardPieces, diceRoll, pieceToPick));

      // Remove the piece from the board immutably
      setBoardPieces(
        boardPieces.map((point) => {
          if (point.id === id) {
            return {
              ...point,
              pieces: point.pieces.slice(0, point.pieces.length - 1),
            };
          }
          return point;
        }),
      );
    }
  };

  const handleOnClick = () => {
    if (diceRoll.length === 0 || !currentPlayer) return;

    if (selectedPiece) handleIsPieceSelected();
    else handleNotSelectedPiece();
  };

  return (
    <div className={isPossibleMove ? "triangle-wrapper-selected" : "triangle-wrapper"} onClick={handleOnClick}>
      {/* debuggView */}
      <div
        style={
          isDown
            ? { position: "absolute", left: "40%", top: "20px", zIndex: 100000, color: "white" }
            : { position: "absolute", left: "40%", bottom: "10px", zIndex: 100000, color: "white" }
        }
      >
        {id}
      </div>
      {/* debuggView */}
      <div className={isDown ? "triangle down" : "triangle up"}></div>
      {pieces.map((value, index) => (
        <Piece key={index} isDown={isDown} pieceId={index} data={value} />
      ))}
    </div>
  );
}

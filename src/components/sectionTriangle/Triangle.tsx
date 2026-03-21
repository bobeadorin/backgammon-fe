import "./TriangleStyles.css";
import Piece from "../piece/Piece";
import type { PieceFormat } from "../../types/type";
import { useGameContext } from "../../hooks/UseGameContext";

type TriangleProps = {
  isDown: boolean;
  pieces: PieceFormat[];
  id: number;
};

export default function Triangle({ isDown, pieces, id }: TriangleProps) {
  const { selectedPiece, boardPieces, setSelectedPiece, setBoardPieces } = useGameContext();

  const handleOnClick = () => {

    if (selectedPiece) {
      if (pieces.length > 0 && pieces[0].color !== selectedPiece?.color) {
        return; // continue
      }

      setBoardPieces(
        boardPieces.map((point) => {
          if (point.id === id) {
            return {
              ...point,
              pieces: [...point.pieces, selectedPiece],
            };
          }
          return point;
        }),
      );
      setSelectedPiece(null);
      return;
    }

    if (!selectedPiece) {
      const removedPiece = pieces.pop() ?? null;
      setSelectedPiece(removedPiece);
      return;
    } else {
      const removedPiece = pieces.pop() ?? null;
      setSelectedPiece(removedPiece);

      return;
    }
  };


  return (
    <div className="triangle-wrapper" onClick={handleOnClick}>
      <div className={isDown ? "triangle down" : "triangle up"}></div>
      {pieces.map((value, index) => (
        <Piece key={index} isDown={isDown} pieceId={index} data={value}/>
      ))}
    </div>
  );
}


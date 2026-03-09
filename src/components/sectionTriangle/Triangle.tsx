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
    console.log(id)
    if (selectedPiece) {
      if (pieces.length === 1 && pieces[0].color !== selectedPiece?.color) {
        return; // continue
      }

      if (pieces.length > 1 && pieces[0].color !== selectedPiece?.color) {
        return;
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
      console.log("Clicked point:", id);
      console.log("Pieces:", pieces);
      return;
    }
  };

  return (
    <div className="triangle-wrapper" onClick={handleOnClick}>
      <div className={isDown ? "triangle down" : "triangle up"}></div>
      {pieces.map((value, index) => (
        <Piece key={index} isDown={isDown} pieceId={index} data={value} />
      ))}
    </div>
  );
}

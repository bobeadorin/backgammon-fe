import "./TriangleStyles.css";
import Piece from "../piece/Piece";
import type { PieceFormat } from "../../types/type";
import { useGameContext } from "../../hooks/UseGameContext";

type TriangleProps = {
  isDown: boolean;
  pieces: PieceFormat[];
  id: number;
  isPossibleMove?: boolean;
};

export default function Triangle({ isDown, pieces, id, isPossibleMove = false }: TriangleProps) {
  const { handleTriangleOnClick, handleSetPossibleMoves, clearPossibleMoves } = useGameContext();

  return (
    <div
      className={isPossibleMove ? "triangle-wrapper-selected" : "triangle-wrapper"}
      onClick={() => handleTriangleOnClick(id, pieces)}
      onMouseEnter={() => handleSetPossibleMoves(pieces[pieces.length - 1])}
      onMouseLeave={() => clearPossibleMoves()}
    >
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
        <Piece key={index} isDown={isDown} pieceId={index} data={value} />// TODO: Fix the css for this
      ))}
    </div>
  );
}

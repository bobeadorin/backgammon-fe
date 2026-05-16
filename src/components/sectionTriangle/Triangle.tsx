import "./TriangleStyles.css";
import Piece from "../piece/Piece";
import type { PieceFormat } from "../../types/gameTypes";
import { useGameContext } from "../../hooks/UseGameContext";

type TriangleProps = {
  isDown: boolean;
  pieces: PieceFormat[];
  id: number;
  hasPossibleMove?: boolean;
  isPossibleMove?: boolean;
};

export default function Triangle({ isDown, pieces, id, hasPossibleMove = false, isPossibleMove = false }: TriangleProps) {
  const { state, dispatch } = useGameContext();

  return (
    <div className={isPossibleMove ? "triangle-wrapper-selected" : "triangle-wrapper"}>
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
        <Piece
          shouldHighlight={hasPossibleMove && index === pieces.length - 1}
          key={index}
          isDown={isDown}
          pieceId={index}
          data={value}
          offset={pieces.length}
        />
      ))}
    </div>
  );
}

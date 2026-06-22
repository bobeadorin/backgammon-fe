import "./TriangleStyles.css";
import Piece from "../piece/Piece";
import type { PieceFormat } from "../../types/gameTypes";
import { useGameContext } from "../../hooks/UseGameContext";
import { GameActionsService } from "../../game/gameReducer/gameActions";

type TriangleProps = {
  isDown: boolean;
  pieces: PieceFormat[];
  id: number;
};

export default function Triangle({ isDown, pieces, id }: TriangleProps) {
  const { state, dispatch } = useGameContext();
  const hasPotentialMove = state.possibleMoves.includes(id);

  const handleTriangleClick = () => {
    if(!state.selectedPiece && pieces.length === 0 ) return;

    if (!state.selectedPiece) {
      dispatch(GameActionsService.selectPiece(pieces[pieces.length - 1]));
      return;
    }
    dispatch(GameActionsService.movePiece(state.selectedPiece.position, id));
  };

  return (
    <div onClick={handleTriangleClick} className={hasPotentialMove ? "triangle-wrapper-selected" : "triangle-wrapper"}>
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
          shouldHighlight={hasPotentialMove && index === pieces.length - 1}
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

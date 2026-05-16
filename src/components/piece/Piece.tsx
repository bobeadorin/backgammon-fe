import type { PieceFormat } from "../../types/gameTypes";
import "./PieceStyles.css";
import { getPieceComposedClass, getPieceOffset } from "./utils/boardPiece.utils";

type PieceProps = {
  isDown: boolean;
  pieceId: number;
  data: PieceFormat;
  shouldHighlight: boolean;
  offset: number;
};

export default function Piece({ isDown, pieceId, data, shouldHighlight = false, offset }: PieceProps) {
  const pieceClass = getPieceComposedClass(data, shouldHighlight);
  const { scale, position } = getPieceOffset(offset, pieceId);

  return (
    <div
      className={pieceClass}
      style={{
        top: isDown ? position : undefined,
        bottom: isDown ? undefined : position,
        zIndex: 10 + pieceId,
        transform: `translateX(-50%) scale(${scale})`,
      }}
    ></div>
  );
}

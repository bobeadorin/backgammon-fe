import { PieceColor } from "../../enums/PieceColor";
import type { PieceFormat } from "../../types/type";
import "./PieceStyles.css";

type PieceProps = {
  isDown: boolean;
  pieceId: number;
  data: PieceFormat;
};

export default function Piece({ isDown, pieceId, data }: PieceProps) {
  return (
    <div
      className={data.color === PieceColor.BLACK ? "piece black" : "piece white"}
      style={{
        top: isDown ? pieceId * 80 : undefined,
        bottom: isDown ? undefined : pieceId * 80,
      }}
    ></div>
  );
}

import { Color } from "../../enums/PieceColor";
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
      className={data.color === Color.BLACK ? "piece black" : "piece white"}
      style={{
        top: isDown ? pieceId * 65 : undefined,
        bottom: isDown ? undefined : pieceId * 65,
      }}
    ></div>
  );
}
import { Color } from "../../../enums/PieceColor";
import { PieceFormat } from "../../../types/gameTypes";

export function getPieceComposedClass(data: PieceFormat, shouldHighlight: boolean) {
  const pieceClass = `${data.color === Color.BLACK ? "piece black" : "piece white"} ${shouldHighlight ? "highlight" : ""}`;
  return pieceClass;
}

export function getPieceOffset(offset: number, pieceId: number) {
  const baseSpacing = 65;
  let spacing: number;
  let scale: number;

  if (offset <= 6) {
    spacing = baseSpacing;
    scale = 1;
  } else {
    spacing = (baseSpacing + 200) / (offset - 2);
    scale = 1;
  }

  const position = pieceId * spacing;

  return { scale, position };
}

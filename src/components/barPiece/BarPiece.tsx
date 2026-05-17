import './BarPieceStyles.css'
import { Color } from "../../enums/PieceColor";


interface BarPieceProps {
  color: Color;
}

export default function BarPiece({ color }: BarPieceProps) {
  return <div className={`bar-piece ${color === Color.BLACK ? "black" : "white"}`}></div>;
}

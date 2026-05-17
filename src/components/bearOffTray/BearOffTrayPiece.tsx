import "./BearOffTrayPieceStyles.css";
import { Color } from "../../enums/PieceColor";

interface BearOffTrayPieceProps {
  color: Color;
  index: number;
}

export default function BearOffTrayPiece({ color, index }: BearOffTrayPieceProps) {
  return (
    <div className={`bear-off-piece bear-off-piece--${color.toLowerCase()}`} style={{ "--stack-index": index } as React.CSSProperties}>
      <div className="bear-off-piece__inner">
        <div className="bear-off-piece__shine"></div>
      </div>
    </div>
  );
}

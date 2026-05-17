import { useGameContext } from "../../hooks/UseGameContext";
import { Color } from "../../enums/PieceColor";
import BearOffTrayPiece from "./BearOffTrayPiece";
import "./BearOffTrayStyles.css";

export default function BearOffTray() {
  const { state } = useGameContext();

  // Count pieces for each color in bear off tray
  // const whitePiecesCount = state.bearOffTray?.white || 0;
  // const blackPiecesCount = state.bearOffTray?.black || 0;

  return (
    <div className="bearOffTray-container">
      {/* White pieces tray */}
      <div className="bearOffTray-piece-container">
        {Array.from({ length: 2 }).map((_, index) => (
          <BearOffTrayPiece key={`white-${index}`} color={Color.WHITE} index={index} />
        ))}
      </div>

      {/* Black pieces tray */}
      <div className="bearOffTray-piece-container">
        {Array.from({ length: 7 }).map((_, index) => (
          <BearOffTrayPiece key={`black-${index}`} color={Color.BLACK} index={index} />
        ))}
      </div>
    </div>
  );
}

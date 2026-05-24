import { useGameContext } from "../../hooks/UseGameContext";
import { Color } from "../../enums/PieceColor";
import BearOffTrayPiece from "./BearOffTrayPiece";
import "./BearOffTrayStyles.css";
import { BLACK_BEAR_OFF_TRAY_INDEX, WHITE_BEAR_OFF_TRAY_INDEX } from "../../constants.ts/gameConstants";

export default function BearOffTray() {
  const { state } = useGameContext();

  const whitePieces = state.boardPieces[WHITE_BEAR_OFF_TRAY_INDEX]?.pieces;
  const blackPieces = state.boardPieces[BLACK_BEAR_OFF_TRAY_INDEX]?.pieces;

  return (
    <div className="bearOffTray-container">
      <div className="bearOffTray-piece-container">
        {whitePieces.map((_, index) => (
          <BearOffTrayPiece key={`white-${index}`} color={Color.WHITE} index={index} />
        ))}
      </div>

      <div className="bearOffTray-piece-container">
        {blackPieces.map((_, index) => (
          <BearOffTrayPiece key={`black-${index}`} color={Color.BLACK} index={index} />
        ))}
      </div>
    </div>
  );
}

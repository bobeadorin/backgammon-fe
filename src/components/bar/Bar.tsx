import { Color } from "../../enums/PieceColor";
import { useGameContext } from "../../hooks/UseGameContext";
import BarPiece from "../displayPieces/barPiece/BarPiece";
import "./BarStyles.css";

export default function Bar() {
  const { state } = useGameContext();

  return (
    <section className="bar-container">
      <div className="bar-container-piece-holder">
        {state.boardPieces[26]?.pieces
          ?.filter((piece) => piece.color === Color.WHITE)
          .map((_, index) => (
            <BarPiece key={index} color={Color.WHITE} />
          ))}
      </div>
      <div className="bar-container-piece-holder">
        {state.boardPieces[26]?.pieces
          ?.filter((piece) => piece.color === Color.BLACK)
          .map((_, index) => (
            <BarPiece key={index} color={Color.BLACK} />
          ))}
      </div>
    </section>
  );
}

import { useGameContext } from "../../hooks/UseGameContext";
import BoardSection from "../boardSection/BoardSection";
import { SIDES } from "../boardSection/boardSection.types";
import "./BoardSideStyles.css";

type BoardSideProps = {
  side: SIDES;
};

export default function BoardSide({ side }: BoardSideProps) {
  const { state } = useGameContext();

  const topPieces = side === SIDES.LEFT ? state.boardPieces.slice(6, 12).reverse() : state.boardPieces.slice(0, 6).reverse();

  const bottomPieces = side === SIDES.LEFT ? state.boardPieces.slice(12, 18) : state.boardPieces.slice(18, 24);
  return (
    <>
      <section className={`board-side ${side}`}>
        <BoardSection isDown={true} points={topPieces} />
        <BoardSection isDown={false} points={bottomPieces} />
      </section>
    </>
  );
}

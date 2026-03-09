import { useGameContext } from "../../hooks/UseGameContext";
import BoardSection from "../boardSection/BoardSection";
import { BoardSideType } from "../boardSection/boardSection.types";
import "./BoardSideStyles.css";

type BoardSideProps = {
  side: BoardSideType;
};

export default function BoardSide({ side }: BoardSideProps) {
  const { boardPieces } = useGameContext();

  const topPieces = side === BoardSideType.LEFT ? boardPieces.slice(6, 12).reverse() : boardPieces.slice(0, 6).reverse();

  const bottomPieces = side === BoardSideType.LEFT ? boardPieces.slice(12, 18) : boardPieces.slice(18, 24);

  return (
    <section className="board-side">
      <BoardSection isDown={true} points={topPieces} />
      <BoardSection isDown={false} points={bottomPieces} />
    </section>
  );
}

import { useGameContext } from "../../hooks/UseGameContext";
import BoardSection from "../boardSection/BoardSection";
import { SIDES } from "../boardSection/boardSection.types";
import "./BoardSideStyles.css";
import { boardMapping } from "./utils/boardSide.utils";

type BoardSideProps = {
  side: SIDES;
};

export default function BoardSide({ side }: BoardSideProps) {
  const { state } = useGameContext();
  const { topPieces, bottomPieces } = boardMapping(side, state);

  return (
    <>
      <section className={`board-side ${side}`}>
        <BoardSection isDown={true} points={topPieces} />
        <BoardSection isDown={false} points={bottomPieces} />
      </section>
    </>
  );
}
